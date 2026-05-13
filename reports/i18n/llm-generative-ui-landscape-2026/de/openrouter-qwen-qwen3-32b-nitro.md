# Translation Candidate
- Slug: llm-generative-ui-landscape-2026
- Locale: de
- Model: openrouter/qwen/qwen3-32b:nitro
- Target: src/content/posts/2026-05-10--llm-generative-ui-landscape-2026/de/index.mdx
- Validation: passed
- Runtime seconds: 112.97
- Input tokens: 48181
- Output tokens: 47217
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- Estimated cost: $0.015187
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
title: ''
subTitle: ''
date: '2026-05-10'
modified: '2026-05-10'
tags:
  - ai
  - llm
  - generative-ui
  - agents
  - frontend
  - protocols
  - react
  - ag-ui
  - a2ui
  - copilotkit
  - json-render
  - mcp
category: AI
subCategory: Frontend
draft: true
unlisted: true
hidden: true
publish: false
popularity: 0.9
---
„Generative UI“ bezeichnet mindestens fünf unterschiedliche Konzepte, je nachdem, wer den Begriff verwendet.  

- Chat-Schnittstellen, die Produktkarten über Modell-Tool-Aufrufe einbetten  
- Laufzeit-JSON-Spezifikationen, die der Frontend-Code als Komponentenbäume rendert  
- Sandboxede Iframes, die von MCP-Tools in Host-Apps zurückgegeben werden (von Ticketbestellungen über Hotelbuchungen bis hin zu Kartenrendering und Checkout-Widgets)  
- Ereignisprotokolle, die den Agentenzustand als Stream an den Frontend weiterleiten  
- v0, Lovable und Bolt: AI-Tools, die React zur Entwurfszeit schreiben  

Diese Konzepte sind verwandt, leben aber in unterschiedlichen Schichten der Architektur und tragen unterschiedliche Risikoprofile, Implementierungskosten und angemessene Anwendungsfälle. Die Verwechslung dieser Konzepte verwandelt jede Architekturdiskussion in ein Chaos.

Dies ist die Karte, die ich benötige, wenn ich entscheide, wo in der Architektur ich ansetzen soll.

## Was Generative UI nicht ist

Bevor wir definieren, was es ist, drei Dinge, die wir beiseitelegen sollten:  

**Design-time Code-Generierung** – v0, Lovable, Bolt, Cursor, die React-Komponenten zusammenstellen. Diese Tools generieren Code, den Entwickler überprüfen und committen. Die KI läuft zur Entwicklungszeit. Was auch immer ausgeliefert wird, ist aus der Sicht des Benutzers statisch. Dies ist eine großartige Kategorie von Tools. Es ist jedoch nicht das, was „generative UI zur Laufzeit“ bedeutet.  

**KI-gestützte Formular-Autofüllung** – das Modell füllt Feldwerte basierend auf dem Kontext aus. Die Struktur der Benutzeroberfläche ist weiterhin fest; nur der Inhalt ändert sich. Dies ist ein nützliches Muster. Es ist keine generative UI.

**KI schreibt rohen HTML-Code in eine Seite** — das Modell generiert `<div>`- und `<button>`-Strings, die über `innerHTML` oder `dangerouslySetInnerHTML` eingefügt werden. Dies *ist* Laufzeit-generierte Benutzeroberfläche im strengsten technischen Sinne. Es ist auch die gefährlichste Version und die, vor der jedes etablierte Framework in diesem Bereich schützt. Roher, von KI generierter Markup-Code bedeutet XSS-Risiko, nicht barrierefreie Attribute, uneinheitliche Gestaltung und halluzinierte Struktur. Der Rest dieses Artikels beschäftigt sich damit, dies zu verbessern.

## Eine funktionale Definition

Generative UI in der Laufzeit bedeutet: **Das Modell bestimmt, welche Benutzeroberflächenelemente oder -komposition der Benutzer sieht, basierend auf dem Zustand der Konversation oder Aufgabe.**

Nicht die Wörter. Die Benutzeroberfläche.

Der einfachste Fall: Ihr Flugbuchungs-Assistent ruft ein `search_flights`-Tool auf. Anstatt rohen Text zurückzugeben ("Hier sind drei Optionen..."), rendert es ein `<FlightResultsCard>`-Komponent mit auswählbaren Flügen, Auswahlschaltern für Sitzklasse und einem "Buchen"-Button. Das Modell entschied, dass eine strukturierte Karte die richtige Antwort in diesem Fall ist. Der Entwickler entschied, wie diese Karte aussieht und was „Buchen“ tut.

Der komplexere Fall: Ein Finanzanalyse-Agent erhält eine Frage zu einem Portfolio und entscheidet, eine Antwort mit einem `MetricGroup`-Komponentenblock, der Schlüsselzahlen anzeigt, einem `RiskBreakdown`-Diagramm, einer `ScenarioComparison`-Tabelle und einem `PolicyNotice` zusammenzustellen. Das Modell hat diese Anordnung aus einem Katalog vorab genehmigter Komponenten zusammengestellt. Der Entwickler hat jede Komponente definiert. Das Modell hat entschieden, welche davon verwendet werden und welche Daten sie enthalten.

Beide Fälle sind generative UI. Sie unterscheiden sich darin, wie viel Gestaltungsfreiheit das Modell hat, was sowohl die Reichhaltigkeit der möglichen Ausgaben als auch die Komplexität dessen bestimmt, was schiefgehen kann.

## Die drei Muster

Der gesamte Raum kondensiert sich in drei Muster, wobei jedes eine andere Ausgabegrammatik hat.

![Schaubild einer Skala mit drei Mustern: Nur Tool-Aufrufe links (sicherste), Komponentenkatalog in der Mitte und offene Generierung rechts (ausdrucksstärkste).](../output-grammar-spectrum.svg)

Jede Entscheidung für generative UI ist ein Punkt auf diesem Spektrum. Beginnen Sie links.

### Muster 1: Tool-zu-Komponente-Rendern

Das Modell ruft ein benanntes Tool auf. Ihre Anwendung verfügt über eine Zuordnung von Tool-Namen zu Komponenten. Der Tool-Aufruf löst das Rendern einer Komponente aus.

```tsx
// The model calls: { name: "show_flight_results", args: { flights: [...] } }

useCopilotAction({
  name: "show_flight_results",
  render: ({ args }) => <FlightResultsCard flights={args.flights} />,
});
```

Dies ist das sicherste Muster, weil die Layout-Struktur nie vom Modell kommt. Das Modell entscheidet *wann* ein Komponente angezeigt wird und *welche Daten* sie füllt. Ihre Entwickler behalten weiterhin die Kontrolle über den Komponenten-Code, das visuelle Design, die Implementierung der Barrierefreiheit und jede Randbedingung in der Rendern-Logik.

Das Vercel AI SDKs `useChat` mit `tool`-Handlern funktioniert so. Das assistant-ui `tool`-Rendern funktioniert so. Der "Static Generative UI"-Ansatz von CopilotKit ist dieses Muster. Die meisten produktiven Copilot-UIs, die zuverlässig funktionieren, verwenden dieses Muster.

**Einsatzszenario**: Wenn die Menge der anzuzeigenden Elemente zur Entwicklungszeit bekannt ist. Buchungsbestätigungen, Suchergebnisse, Kontoumfragen, Genehmigungs-widgets. Wenn Sie die Szenarien auflisten können, deckt dieses Muster sie ab.

### Muster 2: Komponentenkatalog-Komposition

Das Modell generiert einen typisierten JSON-Baum, der Komponenten aus einem vom Entwickler definierten Katalog referenziert. Ihr Frontend verfügt über einen Renderer, der den Baum durchläuft und jede Komponente instanziiert.

```json
[
  { "type": "metric_group", "metrics": [
    { "label": "MRR", "value": "$82,400", "delta": "+12%" },
    { "label": "Churn", "value": "2.1%", "delta": "-0.4%" }
  ]},
  { "type": "line_chart", "title": "30-day growth", "data_ref": "mrr_series" },
  { "type": "insight_callout", "text": "Expansion revenue driving the delta — avg seat count up 18%." }
]
```

Das Modell hat diese Layoutstruktur zusammengestellt: Ein `MetricGroup`, ein `LineChart`, ein `InsightCallout`. Sie haben jedoch definiert, was jede Komponententyp-Kategorie bedeutet, welche Props akzeptiert werden und wie sie gerendert werden. Wenn das Modell versucht, `{ "type": "custom_untested_thing" }` auszugeben, erkennt Ihre Schema-Validierung dies und der Renderer ignoriert oder verweigert es.

Dieses Muster steckt hinter `json-render`, `A2UI`, `Hashbrown`, `OpenUI` und `Tambo`. Der entscheidende Ingenieurarbeitsschwerpunkt ist **Katalogdesign** – Entscheidungen darüber, welche Komponententypen existieren, wie ihre Schemas aussehen und was das Modell kombinieren darf und was nicht.  

**Eigenschaft**: Wenn die Struktur dessen, was angezeigt werden soll, sich tatsächlich anhand der Daten oder des Benutzeranfragenspiegelt. Dashboards, die sich an die auffälligen Aspekte der Zahlen anpassen. Berichte, die unterschiedliche Abschnitte je nach Kontext zeigen. Workflow-Panel, die sich basierend auf dem Schritt, in dem sich ein Agent befindet, ändern.  

### Muster 3: Offene Generierung

Das Modell generiert HTML, SVG, Canvas oder WebGL, die in einem gesicherten iframe mit strenger Content-Sicherheitsrichtlinie gerendert werden.  

Dies ist für Anwendungen geeignet, bei denen kein fester Komponentenkatalog ausreicht: Algorithmenvisualisierungen, Architekturdiagramme, ad-hoc-Charts, generative Kunst, Bildungs-Simulationen. Die iframe-Grenze übernimmt hier die Sicherheitsarbeit; entfernen Sie diese, und Sie kehren zum Problem der rohen HTML-Injektion zurück, das am Anfang dieses Artikels beschrieben wurde.  

`CopilotKit/OpenGenerativeUI` ist die beste aktuelle Referenzimplementierung dieses Musters. Die Sandbox entfernt Skripte, beschränkt die Nachrichtenübertragung und hält das generierte Artefakt von Ihrem Anwendungs-Privilegienzustand fern.

**Einsatzszenario**: Wenn Sie tatsächlich beliebige visuelle Ausgabe benötigen – einmalige Erklärungsdiagramme, dynamische Simulationen, kreative Artefakte. Verwenden Sie dies nicht für transaktionale Benutzeroberflächen. Eine Checkout-Bestätigung benötigt keinen gesandboxten iframe.  

### Jenseits der drei Muster: LLMs, die Pixel direkt steuern  

Es gibt eine sich abzeichnende vierte Richtung, die nicht sauber in eines dieser Muster passt: LLMs, die **immersive, spielartige Erlebnisse** durch direktere Steuerung der visuellen Ausgabe als ein gesandboxter iframe ermöglichen.

Die kanonische Unterscheidung im generativen UI ist **iframe HTML vs. JSON-Katalog**:

- **iframe HTML** – Das Modell schreibt HTML, SVG, Canvas oder WebGL, die in einem isolierten Sandbox-Bereich gerendert werden. Maximale Ausdrucksfreiheit; Sicherheit hängt vollständig vom iframe-Grenzbereich ab. Beispiele: Anthropic Artifacts, OpenGenerativeUI.
- **JSON-Katalog** – Das Modell erzeugt eine strukturierte Nutzlast, die auf einen vom Entwickler definierten Komponentenkatalog beschränkt ist; Ihr Renderer instanziert vertrauenswürdige, vordefinierte Komponenten anhand dieser Spezifikation. Das Modell entscheidet *was* angezeigt wird; Sie bestimmen *wie* es gerendert wird. Beispiele: json-render, A2UI.

Jenseits davon deuten sehr aktuelle Demos auf einen dritten Modus hin, bei dem das Modell weder Komponenten auswählt noch gesandboxten HTML-Code schreibt – es steuert das Canvas direkt. Projekte wie [Tencent's HunyuanWorld](../https://arxiv.org/abs/2502.01999), das aus einem einzelnen Bild erweiterbare 3D-Umgebungen generiert, und Spielarchitekturen, bei denen LLMs Karten, NPCs und Quests zur Laufzeit generieren statt auf einen Komponentenkatalog zurückzugreifen, deuten auf eine Zukunft hin, in der das Modell eher ein **Spielregisseur** als ein Formular-Renderer ist. Die In-Browser-LLM-Verarbeitung über WebGPU ([WebLLM](../https://mlc.ai/web-llm/)) treibt dieselbe Frontlinie lokal voran.

Dieses Gebiet ist wirklich spannend und wirklich noch in den Kinderschuhen. Es gibt noch keine stabilen Frameworks, um damit produktionsreife Produkte zu bauen. Ich werde diesen Ansatz in einem separaten Artikel behandeln, sobald sich das geändert hat.

## Das gesamte Ökosystem

![Ein vierstufiges Diagramm, das alle wichtigen generativen UI-Tools abbildet: Protokolle (AG-UI, A2UI, MCP Apps) oben, JavaScript App-Shell darunter (CopilotKit, Vercel AI SDK, assistant-ui, LangGraph), gefolgt von JavaScript Katalog-Tools (json-render, Hashbrown, OpenUI, Tambo) und Python-Tools am unteren Ende (Gradio, Streamlit, LangChain, Haystack).](../full-stack-map.svg)

*Vier Schichten. Protokolle definieren das Kabelformat. App-Shell verwalten Zustand und Rendering. Katalog-Tools beschränken, was das Modell generieren kann. Python-Tools bilden eine parallele Spur für Daten- und ML-Workflows.*

## Die Protokolle: AG-UI und A2UI

AG-UI und A2UI sind die beiden Hauptstandards in der Protokollschicht. Sie lösen unterschiedliche Probleme und sind keine Konkurrenten.

### AG-UI

**GitHub**: [ag-ui-protocol/ag-ui](https://github.com/ag-ui-protocol/ag-ui)

AG-UI ist ein ereignisbasiertes Protokoll für die Kommunikation zwischen KI-Agenten und Frontend-Anwendungen. Es definiert etwa 16 Ereignistypen: `TEXT_MESSAGE_START`, `TEXT_MESSAGE_CONTENT`, `TOOL_CALL_START`, `TOOL_CALL_END`, `STATE_SNAPSHOT`, `STATE_DELTA` und so weiter. Der Transport ist Ihnen überlassen – SSE, WebSockets und Webhooks funktionieren alle. Das Format ist absichtlich lose gehalten, um eine breite Anwendbarkeit zu ermöglichen.

AG-UI definiert nicht, wie Ihre Benutzeroberfläche aussieht. Es definiert, wie der Agent mit *Ihrer* Frontend-Anwendung kommuniziert. Denken Sie daran als die Leitungsprotokollschicht, die es Ihrem React-App ermöglicht, sich auf einen LangGraph-Agenten genauso abonnieren zu können wie auf einen CrewAI-Agenten, ohne die Frontend-Codebasis ändern zu müssen.

CopilotKit hat AG-UI aus ihrer Arbeit mit LangGraph und CrewAI entwickelt. Es wurde von LangChain, Mastra, PydanticAI und anderen übernommen. Microsoft hat eine AG-UI-Integration-Anleitung veröffentlicht. Wenn Sie ein Multi-Agenten-Frontend bauen und Backend-Frameworks von Frontend-Code entkoppeln müssen, ist AG-UI die Antwort.

**Ein Klärungspunkt, der Leute verwirrt**: AG-UI ist kein UI-Framework. Es sagt Ihnen nicht, was gerendert werden soll. Es sagt Ihnen *dass* der Agent etwas gesagt hat, ein Tool aufgerufen hat oder den gemeinsamen Zustand aktualisiert hat. Was Sie daraufhin rendern, bleibt Ihre Entscheidung.

### A2UI

**GitHub**: [google/A2UI](https://github.com/google/A2UI) · Spezifikation: [a2ui.org](https://a2ui.org/)

A2UI ist Googles deklarative Spezifikation dafür, was Agenten senden, wenn sie eine Benutzeroberfläche anzeigen möchten. Während AG-UI die Frage „Wie kommuniziert der Agent?“ beantwortet, beantwortet A2UI die Frage „In welchem Format beschreibt der Agent eine Komponentenanordnung?“.

A2UI nutzt ein flaches JSONL-Format: Ein Komponenten-Deskriptor pro Zeile, jeweils mit einer ID, einem Typ und Daten. Das Flache ist absichtlich gewählt. Verschachtelte Bäume erfordern, dass das Modell die gesamte Struktur kennt, bevor es mit dem Streamen beginnen kann. Eine flache Liste erlaubt dem Modell, jede Komponente zu emittieren, sobald es „darüber nachdenkt“, was bedeutet, dass Ihr Frontend bereits die erste Metrik-Karte rendern kann, während das Modell noch entscheidet, ob ein Diagramm hinzugefügt werden soll.

```jsonl
{"id":"h1","type":"kpi_card","title":"MRR","value":"$82,400","delta":"+12%"}
{"id":"h2","type":"kpi_card","title":"Churn","value":"2.1%","delta":"-0.4%"}
{"id":"c1","type":"line_chart","title":"30-day MRR","data_ref":"mrr_series"}
{"id":"t1","type":"data_table","cols":["Month","MRR","Net New"],"data_ref":"monthly"}
```

A2UI ist sicherheitsbewusst: Die Spezifikation ist ein Datenformat, kein ausführbarer Code. Der Komponentenkatalog wird vom Entwickler vorgegeben; der Agent kann nur auf Typen in diesem Katalog verweisen. Ein A2UI-Renderer, der einen unbekannten Typennamen erhält, ignoriert diesen.

CopilotKits „Open-JSON-UI“-Format ist mit A2UI kompatibel. Wenn Sie heute ein Spezifikationsformat für einen Komponentenkatalog auswählen, ist A2UI das Format mit der breitesten Plattformunterstützung.

**Hinweis zur Stabilität**: A2UI ist vor der 1.0-Version – v0.9 bei der letzten Prüfung am 8. Mai 2026 – und hat breaking Spezifikationsänderungen zwischen Minor-Versionen ausgeliefert. Googles Kommunikationen zum Roadmap waren sporadisch, und einige Renderer (Lit, Flutter) haben Spezifikationsaktualisierungen nachgelassen. Planen Sie Zeit für Spezifikationsdrift ein, wenn Sie heute darauf aufbauen. Für reine Web-Anwendungsfälle scheint json-render derzeit über vollständigere Tooling zu verfügen. Der langfristige Vorteil von A2UI ist der Plattformumfang (Web, Flutter, SwiftUI, Android), den json-render nicht hat.

### MCP Apps

**GitHub**: [modelcontextprotocol](https://github.com/modelcontextprotocol) · Verknüpft: [mcp-ui](https://github.com/MCP-UI-Org/mcp-ui)

MCP begann als ein Protokoll zur Verbindung von LLMs mit Tools und Daten. Die Apps-Erweiterung ermöglicht es MCP-Tools, nicht nur Daten, sondern auch interaktive UI-Artefakte zurückzugeben: React-Komponenten, Formulare, Dashboards, Karten.

Das Sicherheitsmodell ist strikt – und das ist der Sinn: Alles wird in einem isolierten iframe mit entzogenen Berechtigungen gerendert, Templates sind vorab deklariert, damit die Host-App sie überprüfen kann, und alle Kommunikation erfolgt über nachvollziehbares JSON-RPC. Dies ist das richtige Modell für Tool-Provider – ein Shopify-MCP-Server kann ein Checkout-Widget zurückgeben; ein Karten-Dienst kann eine einbettbare Karte liefern. Die Host-App besitzt oder vertraut dem Code dieses Widgets nicht.  

MCP Apps ist die richtige Wahl, wenn die UI *zum Tool-Provider gehört*, nicht zu Ihrer Anwendung. Für UI-Elemente, die im Kontext Ihrer Anwendung existieren, bleibt Muster 1 oder 2 die bessere Wahl.

## JavaScript/TypeScript-Frameworks

### CopilotKit

**GitHub**: [CopilotKit/CopilotKit](https://github.com/CopilotKit/CopilotKit) · Beispiele: [CopilotKit/generative-ui](https://github.com/CopilotKit/generative-ui)

CopilotKit ist das umfassendste Framework für agentennative Frontend-Anwendungen. Es verwaltet den gesamten Lebenszyklus: Verbindung zu agentennativen Backends über AG-UI herstellen, bidirektionalen Konversationszustand verwalten, generative UI-Komponenten rendern und die gemeinsame Zustandsverwaltung bereitstellen, die es Agenten und Benutzern ermöglicht, dieselben Daten zu ändern.

Das Dreimustermodell passt sich sauber an die CopilotKit-APIs an:  
- `useCopilotAction` mit einem `render`-Callback → Muster 1  
- A2UI/Open-JSON-UI Rendern → Muster 2  
- `OpenGenerativeUI` gesandboxte Artefakte → Muster 3  

Die wichtigste CopilotKit-Funktion, die zu wenig Aufmerksamkeit erhält, ist **geteilter Zustand und human-in-the-loop**: Der Agent kann den Anwendungsstatus lesen und schreiben, der Benutzer ebenfalls, und Änderungen fließen bidirektional. Dies ist der Grund dafür, dass Copilot-Stil-Benutzeroberflächen sich wie eine echte Zusammenarbeit anfühlen und nicht wie ein Chatfenster, das an ein Produkt angeheftet ist.

### Vercel AI SDK

**GitHub**: [vercel/ai](https://github.com/vercel/ai) · Docs: [ai-sdk.dev](https://ai-sdk.dev/)

Der Vercel AI SDK ist der de facto Standard für TypeScript-basierte AI-Anwendungen. Für generative UI insbesondere:

**`useObject`** streamt ein strukturiertes JSON-Objekt vom Server, während es generiert wird. Sie definieren ein Zod-Schema; das SDK analysiert die teilweise JSON-Daten und löst Neuberechnungen aus, sobald Felder ankommen. Dies ist die einfachste Methode, um Muster 2 in einer Next.js-App umzusetzen.

```tsx
const { object: dashboard } = useObject({
  api: "/api/generate-dashboard",
  schema: z.object({
    title: z.string(),
    metrics: z.array(z.object({ label: z.string(), value: z.number() })),
    insights: z.array(z.string()),
  }),
});
```

**`useChat` mit Tool-Handlern** → Muster 1. Das Modell ruft Tools an; Sie ordnen Tool-Namen Komponenten zu.

**AI Elements** ([elements.ai-sdk.dev](https://elements.ai-sdk.dev/)) stellt fertige UI-Primitiven bereit, die mit dem SDK kombiniert werden können.

**Ein Hinweis zur verwirrenden Entwicklung hier**: Im Oktober 2024 kündigte Vercel in der [GitHub Discussion #3251](https://github.com/vercel/ai/discussions/3251) an, dass AI SDK RSC – das React Server Components Streaming-Muster, das als Hauptmerkmal „Generative UI“ in SDK 3.0 beworben wurde – unbestimmt ausgesetzt wurde, aufgrund von „mehreren lang bestehenden Einschränkungen“ ohne gute kurzfristige Lösungen. Teams, die Produktstrategien um RSC-Streaming gebaut hatten, wurden unvorbereitet getroffen. Die `generateObject`/`streamObject` APIs wurden später in SDK 6.0 als veraltet markiert. Die empfohlene Migration von AI SDK RSC ist das oben genannte `useObject`-Muster oder json-render für katalogbasierte Generierung.

### assistant-ui

**GitHub**: [assistant-ui/assistant-ui](https://github.com/assistant-ui/assistant-ui)

assistant-ui ist ein Satz komponierbarer React-Primitiven zur Erstellung von Chat-Oberflächen in Produktionsqualität. Es ist die richtige Wahl, wenn Sie eine ausgereifte Chat-Benutzeroberfläche benötigen – Nachrichtenblasen, streaming-Tokens, Kopier-/Bearbeitungs-/Neu-Generierungsaktionen, Denkzustände – und Ihren eigenen Backend-Service sowie eigenes Tool-Rendering einbringen möchten.

Es arbeitet gut mit jedem Backend (OpenAI, Anthropic, lokale Modelle, benutzerdefinierte Endpunkte) zusammen und verarbeitet Tool-Aufruf-Rendering über ein vertrautes Slot/Render-Prop-Modell.

### json-render

**GitHub**: [vercel-labs/json-render](https://github.com/vercel-labs/json-render) · Docs: [json-render.dev](https://json-render.dev/)  

json-render operationalisiert Muster 2 mit einem eindeutigen, alles-in-einem-Ansatz. Sie erhalten ein vordefiniertes Komponentenkatalog (shadcn/ui-Komponenten mit Zod-Schemas), einen Renderer und einen engen Generierungs-Loop, in dem das Modell durch das Schema auf das Katalog begrenzt wird.  

Die herausragenden Merkmale:  
- **Multi-Ziel-Rendering**: Die gleiche JSON-Spezifikation kann auf eine React-Web-App, eine React Native-App, ein PDF, eine HTML-E-Mail oder ein Remotion-Video gerendert werden. Dies ist tatsächlich nützlich für Berichte.  
- **Schrittweises Rendering**: Komponenten erscheinen, während das Modell sie streamt, nicht erst nachdem die vollständige Spezifikation eingetroffen ist.  
- **Enge Schema-Beschränkungen**: Das Katalog ist so gestaltet, dass das Modell keine gültigen, aber unbekannten Komponententypen erfinden kann.

Wenn Sie ein Dashboard oder eine Berichtserstellungsfunktion entwickeln und die Infrastrukturarbeit zur Gestaltung Ihres eigenen Katalogs umgehen möchten, ist json-render der schnellste Weg für Web-Apps.  

**Zum Aufschwung**: json-render wurde von Vercel Labs Anfang 2026 veröffentlicht und hat schnell die Aufmerksamkeit von Web-Entwicklern gewonnen, da es sich direkt in Standard-Reaktions/Next.js-Projekte einsetzen lässt. Das ist jedoch noch vor der Version 1.0 und die Beziehung zwischen json-render und A2UI wird noch ausgearbeitet – Vercel hat bereits mit A2UI-kompatibler Ausgabe experimentiert, also ist eine Konvergenz möglich. Für plattformübergreifende Anwendungen (native mobile, mehrere Frameworks) ist A2UI die bessere langfristige Option.  

### Hashbrown

**GitHub**: [liveloveapp/hashbrown](https://github.com/liveloveapp/hashbrown)

Hashbrown verfolgt eine eigene Herangehensweise: Anstelle einer separaten AI-Schnittstelle zu bauen, integriert es die AI-Komponentenauswahl direkt in Ihre bestehende React- oder Angular-Anwendung. Sie machen Ihre Anwendungs-Komponenten dem LLM zugänglich; das LLM wählt aus, welche gerendert werden, und kann clientseitige Tools aufrufen.

Dies ist das richtige Tool, wenn Sie Intelligenz in Produktseiten einfließen lassen möchten, die nicht "Chat" sind – eine Produktseite, die ihren Layout anpasst, ein Einstellungspanel, das die richtigen Optionen anzeigt, ein Workflow-Editor, der den nächsten Schritt vorschlägt.

### OpenUI

**GitHub**: [thesysdev/openui](https://github.com/thesysdev/openui) · Docs: [openui.com](https://www.openui.com/)

OpenUI ersetzt JSON durch ein zeilenbasiertes, code-ähnliches Format ("OpenUI Lang"), das für progressives Rendern und Token-Effizienz entwickelt wurde. Die Angabe lautet etwa 67 % weniger Tokens als bei äquivalentem JSON für komplexe Layouts.

Die Abwägung liegt in der Ökosystemreife — OpenUI ist neu und die Tools sind weniger ausgereift als bei JSON-basierten Ansätzen. Wenn Tokenkosten eine bedeutende Einschränkung darstellen und Sie komplexe Layouts mit hoher Frequenz generieren, ist die Format-Effizienz real.  

### Tambo  

**GitHub**: [tambo-ai/tambo](https://github.com/tambo-ai/tambo)

Tambo konzentriert sich auf die Auswahl zustandsbehafteter Komponenten: Die KI wählt Komponenten aus und kann mithilfe von Client-Tools mit ihnen interagieren, wobei der Zustand der Komponenten über den gesamten Gesprächsverlauf beibehalten wird. Ideal für Anwendungsfälle, bei denen Benutzeroberflächenelemente über mehrere Interaktionen hinweg bestehen bleiben — eine Filterkomponente, die der Benutzer anpasst, während die KI weiterhin auf die gefilterten Daten schließt.

---

## Die Python-Schicht

Der Python-Ökosystem greift AI-Schnittstellen anders an. Diese Tools sind für ML-Modell-Demos, Datenanwendungen und interne Werkzeuge optimiert – nicht für Produktions-Consumer-Apps mit agentengetriebener Layout-Komposition.  

Das ist kein Vorwurf. Für die richtigen Use-Cases sind Gradio und Streamlit die einzigen Tools, die Sie benötigen.  

### Gradio

**GitHub**: [gradio-app/gradio](https://github.com/gradio-app/gradio) · PyPI: `gradio`

Der Kernwert von Gradio: Sie schreiben eine Python-Funktion; Gradio verpackt sie in eine Web-Oberfläche. Die `Interface`-Klasse benötigt 3 Zeilen für einen Bildklassifizierer. `ChatInterface` benötigt 10 Zeilen für einen Chatbot. `Blocks` gibt Ihnen feine Layout-Kontrolle, wenn Sie sie benötigen.

Die „generative UI“ in Gradio wird vom Python-Entwickler definiert, nicht vom Modell. Die Sichtbarkeit und Konfiguration von Komponenten kann sich dynamisch an Modellausgaben anpassen, der Komponentenkatalog ist jedoch statisch – Sie bitten das Modell nicht, Layouts zu komponieren.

Gradio ist der Standard für HuggingFace Spaces und die ML-Demo-Umgebung. Es hat Millionen von monatlichen Downloads und treibt einen großen Teil der AI-Demo-Landschaft an.

**Wählen Sie Gradio, wenn**: Sie ein Python-Entwickler sind, der eine ML-Modell-Demo, ein Forschungsprototyp oder ein internes Tool erstellt, und JavaScript nicht berühren möchten.

### Streamlit

**GitHub**: [streamlit/streamlit](https://github.com/streamlit/streamlit)

Streamlits Modell ist klar definiert: Ein Python-Skript läuft bei jeder Interaktion von Anfang bis Ende. Sie rufen `st.chat_message()`, `st.dataframe()`, `st.plotly_chart()` auf. Das Framework übernimmt die Layouterstellung.

Das Modell mit vollständiger Skriptneuverarbeitung klingt ineffizient, erwiesen sich jedoch als überraschend benutzerfreundlich für AI-Chatbots, die Konversationshistorien sammeln – das gesamte Skript wird erneut ausgeführt, die Chat-Historie befindet sich im Sitzungszustand und die Ausgabe ist deterministisch. Streamlit unterstützt nun offiziell die meisten wichtigen LLM-Anbieter und integriert sich nativ mit Snowflake Cortex.

**Wenden Sie Streamlit an, wenn**: Sie eine KI-gestützte Datenanwendung, einen internen Berichts-Tool oder ein ML-gestütztes Dashboard in Python entwickeln und den einfachstmöglichen Bereitstellungspfad benötigen.

### LangChain und Haystack

Diese sind Backend-Orchestrierungsframeworks, keine UI-Frameworks. Sie erscheinen in jeder ehrlichen Karte des generativen UI-Stacks, weil sie typischerweise die Schicht darstellen, in der strukturierte Ausgaben generiert werden, bevor sie an eine Frontend-Schicht weitergeleitet werden.

**LangChain** ([langchain-ai/langchain](https://github.com/langchain-ai/langchain)): `.with_structured_output()` auf jedem LLM ermöglicht die Erzeugung von Pydantic-basiertem JSON. Der `@tool`-Decorator mit automatisch generiertem Schema ist die einfachste Methode, um zu definieren, welche Tools das Modell aufrufen kann. LangChain übergibt strukturierte Ergebnisse an die von Ihnen verwendete Frontend-Schicht.  

**Haystack** ([deepset-ai/haystack](https://github.com/deepset-ai/haystack)): modulare Pipeline-Architektur mit starker RAG-Unterstützung. Hayhooks integriert Haystack-Pipelines als HTTP-Endpunkte – einschließlich MCP-kompatibler Endpunkte. Wenn Ihre generative UI einen Retrieval-Backbone benötigt, erledigt Haystacks Pipeline-Architektur dies sauber.  

Kein Framework verantwortet die UI-Schicht. Sie erzeugen die Daten, die Ihre Frontend-Schicht (Muster 1, 2 oder 3) rendert.

---

## Funktionsübersicht

Nehmen Sie den obigen Katalog als Orientierung, nicht als Einkaufsliste. Die Stack-Architektur reduziert sich in der Regel auf eine Wahl pro Schicht:

| Anforderung | Starten Sie hier |
|-------------|------------------|
| Agent-zu-Frontend-Event-Stream | [AG-UI](https://github.com/ag-ui-protocol/ag-ui) |
| Deklarativer UI-Inhalt über eine Vertrauensgrenze | [A2UI](https://github.com/google/A2UI) oder [MCP-Apps](https://github.com/MCP-UI-Org/mcp-ui) |
| App-eigener Chat/Tool-Rendern | [Vercel AI SDK](https://github.com/vercel/ai), [assistant-ui](https://github.com/assistant-ui/assistant-ui) oder [CopilotKit](https://github.com/CopilotKit/CopilotKit) |
| Katalog-gesammelte Dashboards, Berichte und Formulare | [json-render](https://github.com/vercel-labs/json-render), [Hashbrown](https://github.com/liveloveapp/hashbrown), [OpenUI](https://github.com/thesysdev/openui) oder [Tambo](https://github.com/tambo-ai/tambo) |
| In einer Sandbox isolierte visuelle Artefakte | [OpenGenerativeUI](https://github.com/CopilotKit/OpenGenerativeUI) |
| Python-Demos und Daten-Apps | [Gradio](https://github.com/gradio-app/gradio) oder [Streamlit](https://github.com/streamlit/streamlit) |

---

## Ökosystemgeschwindigkeit und instabiler Boden

Dieser Bereich entwickelt sich schnell, und mehrere Projekte haben verwirrende Kommunikationen zusammen mit ihrem Code veröffentlicht. Zuletzt überprüft am 8. Mai 2026; betrachten Sie die hier genannten Projektstatus-Notizen als zeitstempelbasierte Information, nicht als dauerhafte Bewertung.

**Vercel AI SDK RSC** war das Hauptmerkmal für Generative UI, als SDK 3.0 veröffentlicht wurde. Vercel pausierte seine Entwicklung im Oktober 2024 ([Diskussion #3251](https://github.com/vercel/ai/discussions/3251)), wobei architektonische Einschränkungen bei React Server Components genannt wurden, für die keine kurzfristige Lösung in Sicht war. Teams, die darauf aufbauten, waren nachvollziehbar frustriert. Es ist immer noch in der Dokumentation enthalten, wird aber nicht mehr als empfohlener Ansatz beworben; `useObject` ist es.

**json-render** (Vercel Labs) ist die neue Richtung – ein katalogbasiertes, framework-unabhängiges Alternativangebot, das die RSC-Kopplungsprobleme umgeht. Es ist vor der 1.0-Version und scheint starkes frühes Interesse bei React/Web-Entwicklern zu finden. Der wahrscheinliche DX-Grund: json-render ist sofort in einem Standard-React/Next.js-Projekt einsetzbar, während der plattformübergreifende Umfang von A2UI Setup-Friction hinzufügt. Wie sich dies entwickelt, sobald beide Spezifikationen reifen, ist tatsächlich unklar. Vercel hat die A2UI-Kompatibilität in json-render untersucht, was darauf hindeutet, dass Konvergenz möglich ist.

**A2UI** (Google) ist pre-1.0 (v0.9 bei letzter Prüfung) mit brechenden Änderungen zwischen Minor-Versionen und ungenauer Google-Kommunikation zu seiner Roadmap. Es ist die richtige Wahl für die Plattformübergreifung (Web + Flutter + SwiftUI), die json-render nicht abdeckt, und es hat eine bedeutende Unternehmensunterstützung. Für reine Webprojekte ist der DX derzeit rauer.  

**AG-UI** (CopilotKit) ist ebenfalls pre-1.0. Die häufigste Verwirrung: Der Name lässt es wie ein UI-Framework klingen. Es ist keins – es ist ein Transportprotokoll. AG-UI definiert, wie Ereignisse zwischen Agenten-Backends und deiner Frontend-Anwendung fließen; was du in Reaktion darauf renderst, ist immer noch deine Entscheidung. Dieses Denkmodell ist robust und weit verbreitet, aber die pre-1.0-Spezifikation bedeutet, dass Randfälle noch ausgearbeitet werden.  

Die praktische Konsequenz: **Jeder große Akteur hier ist pre-1.0**. Plane mit API-Änderungen. Die Muster – Tool-zu-Komponente, Katalogzusammensetzung, gesandboxte Generierung – sind stabil genug, um darauf aufzubauen. Die konkreten Protokollentscheidungen nicht.

## Design des Komponentenkatalogs: Die echte Ingenieursarbeit  

Der größte Teil der interessanten Komplexität in Muster 2 befindet sich nicht im Renderer – sondern im Katalog.

Der Katalog ist eine **Produktentscheidung, kodiert als Schema**. Er beantwortet: Welche sinnvollen UI-Objekte gibt es in diesem Kontext? Nicht „Welche React-Komponenten existieren?“, sondern „Was braucht ein Benutzer in diesem Kontext tatsächlich, um etwas zu sehen und zu interagieren?“

**Der Fehlermodus mit zu grober Granularität**: Sie exponieren `Row`, `Column`, `Text`, `Button`, `Icon`. Jetzt muss das Modell Frontend-Entwickler sein. Es generiert durchschnittliche Layouts, die nicht zu Ihrem Design-System passen, verpasst leere Zustände, produziert unzugängliches Markup und ändert seine Herangehensweise von Antwort zu Antwort, weil nichts im Katalog die Ausgabe auf die visuelle Sprache Ihres Produkts beschränkt.

**Der Fehlermodus mit zu grober Abstraktion**: Sie exponieren `WeatherCard`, `FlightCard`, `HotelCard`. Das Modell kann sich nicht anpassen, wenn der Benutzer etwas anfordert, das nicht auf eine vorgefertigte Karte abbildet. Es fällt auf Text zurück.

**Der nützliche Mittelweg**: Domänenkomponenten mit eingeschränkten Slots.

Ein Reise-App-Katalog könnte so aussehen:

```
TripSummary         — Überblick über die Reiseroute
FlightOptionList    — auswählbare Flugoptionen mit Preisen
HotelComparison     — Hotelkarten nebeneinander
TravelerForm        — Reisendeninformationen sammeln
PolicyNotice        — Hinweis zu Regeln/Preisregelungen
BookingConfirmation — Endgültige Bestätigung mit Aktionstaste
```

Ein Finanz-App-Katalog könnte so aussehen:

```
PortfolioÜbersicht    — wichtige Positionen und Gewinn/Verlust
TransaktionsTabelle   — filterbare, paginierte Transaktionen
Risikoaufteilung      — Allokations- und Volatilitätskennzahlen
SzenarioVergleich     — nebeneinanderliegende Szenariomodellierung
Genehmigungsschleuse  — Aktion, die menschliche Bestätigung erfordert
```

Der Katalog klingt wie das Vokabular Ihres Produkts. Er kodiert Ihre UX-Entscheidungen, Ihre Barrierefreiheitsanforderungen, Ihr Empty-State-Handling und Ihre Muster für gefährliche Aktionen in Komponenten-Code. Das Modell darf diese Bausteine anordnen. Sie entscheiden weiterhin, wie jeder Baustein aussieht und welche Aktionen erlaubt sind.

**Schema-Design-Regeln, die Halluzinationen reduzieren**:

1. Halten Sie enum-Werte kurz und offensichtlich. `"type": "bar_chart"` statt `"type": "data-visualization-bar-type-vertical"`.
2. Machen Sie ungültige Zusammensetzungen unmöglich. Wenn eine `PolicyNotice` nur am Ende eines Layouts erscheinen darf, platzieren Sie sie nicht auf der gleichen Schemaebene wie Elemente, die überall auftreten können.
3. Nutzen Sie erforderliche Felder großzügig. Ein optionales Feld ist ein Feld, das das Modell weglassen könnte, und das Ihr Renderer als null behandeln muss.
4. Testen Sie den Katalog anhand realer Prompts, bevor Sie ihn ausliefern. Speichern Sie die generierten Spezifikationen; prüfen Sie sie auf Schema-Verstöße, halluzinierte Feldwerte und Zusammensetzungen, die technisch gesehen gültig, semantisch aber falsch sind.

## Häufige Fallstricke  

**Fallstrick: Gültigen JSON als sicheres Verhalten zu betrachten.** Schema-Validierung bestätigt die Struktur. Sie sagt nichts über die Übereinstimmung zwischen Aktion und Beschriftung eines Buttons, die Richtigkeit einer Gesamtsumme im Vergleich zu ihren zugrunde liegenden Daten oder unerwartete Verhaltensweisen einer UI-Komponente aus. Generierte UI-Spezifikationen benötigen eine semantische Prüfung, nicht nur Schema-Validierung. Mindestens sollten zerstörerische Aktionen eine Bestätigungs-Komponente erfordern, und die Beschriftungen dieser Komponenten sollten gegen die von ihnen ausgelösten Aktionen getestet werden.

**Falle: Design-Primitiven statt Produkt-Primitiven preiszugeben.** Wenn das Modell entscheiden muss, ob 16px oder 20px Padding verwendet werden sollen, haben Sie ihm die falsche Abstraktionsebene gegeben. Domänen-Komponenten sollten Produktstilrichtlinien kodieren. Das Modell sollte Verhalten zusammensetzen, nicht Präsentationsdetails verwalten.  

**Falle: Generative UI einzusetzen, obwohl statische UI ausreicht.** Wenn die Struktur dessen, was angezeigt werden soll, zur Entwicklungszeit bekannt ist – und das ist in der Regel der Fall –, ist Muster 1 mit vordefinierten Komponenten schneller, sicherer und konsistenter. Generative UI verdient ihre Komplexität erst, wenn die Struktur tatsächlich auf Daten oder Task-Kontext variiert.  

**Falle: Barrierefreiheit zu ignorieren.** LLMs erzeugen fälschlicherweise WCAG-Verletzungen. Sie weisen interaktiven Elementen `role="region"` zu, generieren Formulare ohne Beschriftungen und produzieren Kontrastverhältnisse, die WCAG AA nicht erfüllen. Ihre Komponentenbibliothek kann vollständig barrierefrei sein; Kombinationen dieser Komponenten durch KI sind nicht automatisch barrierefrei. Testen Sie den gesamten Render-Path, nicht nur einzelne Komponenten.

**Falle: Protokoll und Framework verwechseln.** AG-UI ist kein Frontend-Framework. A2UI ist keine React-Bibliothek. Sie sind Datenübertragungsformate und Ereignisprotokolle. Sie benötigen weiterhin ein Frontend-Framework, um sie zu implementieren. CopilotKit implementiert AG-UI und A2UI. json-render implementiert das A2UI/Open-JSON-UI-Komponentenkatalog-Muster. Diese sind unterschiedene Schichten.  

## Empfehlungen nach Anwendungsfällen

**Ein Copilot in eine bestehende SaaS-App integrieren**: Beginnen Sie mit Muster 1 (tool-to-component). Nutzen Sie das Vercel AI SDK `useChat` oder CopilotKit. Ordnen Sie Ihre wichtigsten 5–10 Agent-Aktionen vordefinierten Komponenten zu. Implementieren Sie das, messen Sie die Auswirkungen und erweitern Sie das Komponentenverzeichnis nur, wenn Benutzer nachweislich eine reichhaltigere Komposition benötigen.  

**Dashboard-Generierung aus natürlicher Sprache**: Nutzen Sie Muster 2 mit json-render oder einem benutzerdefinierten A2UI-Katalog. Definieren Sie einen Katalog mit 8–15 Komponententypen, die Ihre Diagrammtypen, Metrik-Karten und Tabellenvarianten abdecken. Übergeben Sie das Schema an das Modell; lassen Sie es die Layout-Komposition übernehmen. Erstellen Sie eine Validierung, die unbekannte Typen auffängt, bevor sie den Renderer erreichen.  

**Multi-Agent-Frontend**: Nutzen Sie CopilotKit mit AG-UI. Der Ereignisstrom verwaltet Echtzeit-Streaming über Agent-Backends; geteilter Zustand übernimmt die Übergabe zwischen Agents; das HITL-Muster verwaltet Genehmigungsschwellen.

**In ChatGPT oder einem anderen MCP-Host erstellen**: Verwenden Sie MCP Apps. Definieren Sie Ihr Tool als Daten-Tool, das abfragt und verarbeitet, und ein separates Renderteil-Tool, das ein Widget anfordert. Halten Sie Geschäftslogik aus der Widget-Vorlage heraus.  

**ML-Modell-Demos und Daten-Apps (Python-Team)**: Gradio für Demos und HuggingFace Spaces. Streamlit für Daten-Apps mit komplexeren Interaktionen. Beide benötigen kein JavaScript.  

**Visuelle Artefakte, Simulationen, Diagramme**: Verwenden Sie Muster 3 (OpenGenerativeUI oder äquivalent). Richten Sie eine strikte iframe CSP ein. Behandeln Sie die Ausgabe wie unvertrauenswürdigen Benutzerinhalt aus Sicherheitsgründen.

Die Frameworks entwickeln sich schnell weiter. Die Protokollkonvergenz (AG-UI für Streaming, A2UI/Open-JSON-UI für Katalogspezifikationen) ist noch im Gange, aber die Form ist klar genug, um darauf aufbauen zu können.

Die wichtigsten ingenieurstechnischen Herausforderungen derzeit sind nicht die Auswahl des Frameworks. Sie sind Katalogdesign – Entscheidung, was das Modell sagen darf, was Produktklarheit mehr als technisches Können erfordert. Sie sind semantische Validierung – Testen, ob die generierte UI das tut, was sie behauptet, und nicht nur, dass sie die Schema-Validierung besteht. Und sie sind die Barrierefreiheitslücke – Kataloge erstellen, bei denen jede Komponente und jede Kombination von Komponenten die gleichen Barrierefreiheitsanforderungen erfüllt, wie man sie von manuell geschriebener UI erwarten würde.

Das Modell wird tun, was Sie ihm befehlen, innerhalb der Grammatik, die Sie ihm geben. Gestalten Sie die Grammatik absichtlich.
````
