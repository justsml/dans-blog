# Translation Candidate
- Slug: llm-generative-ui-landscape-2026
- Locale: de
- Model: openrouter/qwen/qwen3-32b:nitro
- Target: src/content/posts/2026-05-10--llm-generative-ui-landscape-2026/de/index.mdx
- Validation: deferred
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
title: Die LLM-GenUI-Landschaft v2
subTitle: >-
  Von der Werkzeug-zu-Komponente-Rendertechnik bis zur offenen Generierung —
  eine Übersicht aller Ansätze und wann sich ihre Komplexität lohnt.
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
"Generative UI" bezeichnet mindestens fünf verschiedene Konzepte, je nachdem, wer es sagt.  

- Chat-Schnittstellen, die Produktkarten aus Modell-Tool-Aufrufen einbetten  
- Laufzeit-JSON-Spezifikationen, die der Frontend als Komponentenbäume rendert  
- Isolierte iframes, die von MCP-Tools in Host-Apps eingefügt werden (von Ticketbestellungen über Hotelbuchungen bis zu Kartenrendering und Checkout-Widgets)  
- Ereignisprotokolle, die den Agentenzustand an den Frontend streamen  
- v0, Lovable und Bolt: KI-Tools, die React zur Entwurfszeit schreiben  

Diese Konzepte sind verwandt, leben aber in verschiedenen Schichten der Architektur, tragen unterschiedliche Risikoprofile, haben unterschiedliche Implementierungskosten und eignen sich für unterschiedliche Use Cases. Die Verwechslung dieser Begriffe verwandelt jede Architekturdiskussion in ein Chaos.  

Dies ist die Karte, die ich brauche, um zu entscheiden, an welcher Stelle der Schichtung ich ansetze.  

## Was Generative UI nicht ist  

Bevor wir definieren, was es ist, drei Dinge, die wir beiseitelegen sollten:  

**Entwurfszeit-Codegenerierung** – v0, Lovable, Bolt, Cursor, die React-Komponenten zusammensetzen. Diese Tools generieren Code, den Entwickler überprüfen und committen. Die KI läuft zur Entwicklungszeit. Alles, was am Ende ausgeliefert wird, ist aus Sicht des Nutzers statisch. Dies ist eine hervorragende Kategorie von Tools. Es ist jedoch nicht das, was „Generative UI zur Laufzeit“ bedeutet.  

**KI-gestützte Formular-Vorausfüllung** – das Modell füllt Feldwerte aus dem Kontext. Die Struktur der Schnittstelle ist weiterhin fest; nur der Inhalt ändert sich. Dies ist ein nützliches Muster. Es ist aber keine Generative UI.  

**KI, die rohen HTML-Code in eine Seite schreibt** – das Modell generiert `<div>`- und `<button>`-Strings, die über `innerHTML` oder `dangerouslySetInnerHTML` eingefügt werden. Dies ist *technisch gesehen* Laufzeit-Generative UI. Es ist aber auch die gefährlichste Variante, und genau aus diesem Grund existieren alle etablierten Frameworks in diesem Bereich, um dies zu vermeiden. Roh generierter Markup-Code aus der KI bedeutet XSS-Risiken, nicht barrierefreie Attribute, inkonsistente Styling-Regeln und halluzinierte Struktur. Der Rest dieses Artikels beschäftigt sich damit, wie man bessere Alternativen schafft.

## Eine funktionale Definition

Generative UI in der Laufzeit bedeutet: **Das Modell bestimmt, welche Schnittstellenkomponente oder welche Komponentenzusammensetzung der Benutzer sieht, basierend auf dem Zustand der Konversation oder Aufgabe.**

Nicht die Wörter. Die Schnittstelle.

Der einfachste Fall: Ihr Flugbuchungs-Assistent ruft ein `search_flights`-Tool auf. Statt rohen Text zurückzugeben ("Hier sind drei Optionen..."), rendert es eine `<FlightResultsCard>`-Komponente mit auswählbaren Flügen, Sitzklasse-Umschaltern und einer "Buchen"-Schaltfläche. Das Modell hat entschieden, dass eine strukturierte Karte die richtige Antwort hier ist. Der Entwickler hat entschieden, wie diese Karte aussieht und was "Buchen" tut.

Der komplexere Fall: Ein Finanzanalyse-Agent erhält eine Frage zu einem Portfolio und entscheidet, eine Antwort mit einer `MetricGroup`, die Schlüsselzahlen anzeigt, einem `RiskBreakdown`-Diagramm, einer `ScenarioComparison`-Tabelle und einem `PolicyNotice` zusammenzustellen. Das Modell hat diese Layoutstruktur aus einem Katalog vorab genehmigter Komponenten zusammengestellt. Der Entwickler hat jede Komponente definiert. Das Modell hat entschieden, welche Komponenten zu verwenden und welche Daten in sie einzutragen sind.

Beide Fälle sind generative UI. Sie unterscheiden sich darin, wie viel Kompositions-Freiheit das Modell hat, was sowohl die Reichhaltigkeit möglicher Ausgaben als auch die Komplexität dessen bestimmt, was schiefgehen kann.

---

## Die drei Muster

Der gesamte Raum fasst sich in drei Muster zusammen, wobei jedes ein anderes Ausgabegrammatik-Modell hat.

![Ein Spectrum-Diagramm, das drei Muster zeigt: Nur Tool-Aufrufe links (sicherste), Komponentenkatalog in der Mitte und offene Generierung rechts (ausdrucksstärkste).](../output-grammar-spectrum.svg)

*Jede Entscheidung zu generativer UI ist ein Punkt auf diesem Spectrum. Starten Sie links.*

### Muster 1: Tool-to-Component-Rendern

Das Modell ruft ein benanntes Tool auf. Ihre Anwendung hat eine Zuordnung von Tool-Namen zu Komponenten. Der Tool-Aufruf löst ein Komponenten-Rendern aus.

```tsx
// Das Modell ruft auf: { name: "show_flight_results", args: { flights: [...] } }

useCopilotAction({
  name: "show_flight_results",
  render: ({ args }) => <FlightResultsCard flights={args.flights} />,
});
```

Dies ist das sicherste Muster, da die Layout-Entscheidung nie vom Modell kommt. Das Modell entscheidet *wann* eine Komponente angezeigt wird und *welche Daten* sie befüllt. Ihre Entwickler behalten weiterhin die Kontrolle über den Komponenten-Code, die visuelle Gestaltung, die Barrierefreiheitsimplementierung und jede Randbedingung in der Rendern-Logik.

Das `useChat` mit `tool`-Handlern des Vercel AI SDK macht das. Die Tool-Rendern-Funktion von assistant-ui macht das. Das "Static Generative UI" von CopilotKit ist dieses Muster. Die meisten produktiven Copilot-UIs, die zuverlässig funktionieren, nutzen dieses Muster.

**Angemessen, wenn**: Die Menge an Dingen, die angezeigt werden könnten, zur Entwicklungszeit bekannt ist. Buchungsbestätigungen, Suchergebnisse, Kontoumfragen, Genehmigungs-Widgets. Wenn Sie die Szenarien auflisten können, deckt dieses Muster sie ab.

### Muster 2: Komponentenkatalog-Komposition

Das Modell emittiert einen typisierten JSON-Baum, der Komponenten aus einem vom Entwickler definierten Katalog referenziert. Ihr Frontend besitzt einen Renderer, der den Baum durchläuft und jede Komponente instanziert.

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

Das Modell hat diese Layout-Struktur zusammengestellt. Ein `MetricGroup`, ein `LineChart`, ein `InsightCallout`. Aber *Sie* haben definiert, was jeder Komponententyp bedeutet, welche Props er akzeptiert und wie er gerendert wird. Wenn das Modell versucht, `{ "type": "custom_untested_thing" }` zu emittieren, erwischt Sie die Schema-Validierung das und der Renderer ignoriert oder weist es ab.

Dieses Muster liegt bei `json-render`, `A2UI`, `Hashbrown`, `OpenUI` und `Tambo` zugrunde. Die entscheidende ingenieurstechnische Arbeit ist der **Katalogentwurf** – die Entscheidung, welche Komponententypen existieren, wie ihre Schemas aussehen und was das Modell zusammensetzen darf und was nicht.  

**Einsatzberechtigt, wenn**: die Struktur dessen, was Sie anzeigen möchten, sich tatsächlich nach den Daten oder der Anfrage des Benutzers richtet. Dashboards, die sich an die auffälligsten Daten anpassen. Berichte, die je nach Kontext unterschiedliche Abschnitte zeigen. Workflow-Panels, die sich nach dem Schritt richten, in dem sich ein Agent befindet.  

### Muster 3: Offene Generierung  

Das Modell erzeugt HTML, SVG, Canvas oder WebGL, das in einem gesandboxten iframe mit strenger Content-Sicherheitsrichtlinie gerendert wird.  

Dies ist für Anwendungen geeignet, bei denen kein fester Komponentenkatalog ausreicht: Visualisierungen von Algorithmen, Architekturdiagramme, ad hoc Charts, generative Kunst, Bildungs-Simulationen. Die Sicherheit wird hier durch die iframe-Grenze gewährleistet; entfernen Sie diese, und Sie kehren zum Problem der rohen HTML-Injektion zurück, das am Anfang dieses Artikels beschrieben wird.  

`CopilotKit/OpenGenerativeUI` ist die beste aktuelle Referenzimplementierung dieses Musters. Der Sandbox-Mechanismus entfernt Skripte, beschränkt die Nachrichtenübertragung und hält das generierte Ergebnis von privilegierten Zuständen Ihrer Anwendung fern.  

**Einsatzberechtigt, wenn**: Sie tatsächlich beliebige visuelle Ausgaben benötigen – einmalige Erklärungsdarstellungen, dynamische Simulationen, kreative Artefakte. Verwenden Sie dies nicht für Transaktions-UI. Eine Bestätigungsseite für eine Zahlung benötigt keinen gesandboxten iframe.  

### Jenseits der drei Muster: LLMs, die Pixel direkt steuern  

Es gibt eine sich entwickelnde vierte Richtung, die nicht sauber in eines dieser Muster passt: LLMs, die **immersive, computerspielartige Erfahrungen** erzeugen, indem sie die visuelle Ausgabe direkter als ein gesandboxter iframe steuern.  

Die kanonische Unterscheidung innerhalb der generativen UI ist **iframe HTML vs. JSON-Katalog**:

- **Iframe HTML** — Das Modell generiert HTML, SVG, Canvas oder WebGL, die in einem isolierten Sandbox-Fenster gerendert werden. Maximale Ausdrucksfreiheit; die Sicherheit hängt vollständig vom Sandbox-Modell ab. Beispiele: Anthropic Artifacts, OpenGenerativeUI.  
- **JSON-Katalog** — Das Modell erzeugt eine strukturierte Nutzlast, die auf einen von Entwicklern definierten Komponentenkatalog beschränkt ist; Ihr Renderer instanziiert vertrauenswürdige, vordefinierte Komponenten basierend auf dieser Spezifikation. Das Modell entscheidet *was* angezeigt wird; Sie entscheiden *wie* es gerendert wird. Beispiele: json-render, A2UI.  

Jenseits dieser beiden Formate zeigen sehr neue Demos an, dass es eine dritte Richtung gibt, bei der das Modell weder Komponenten auswählt noch gesandboxten HTML-Code schreibt – es steuert den Canvas direkt. Projekte wie [Tencent's HunyuanWorld](https://arxiv.org/abs/2502.01999), die aus einem einzelnen Bild durchsuchbare 3D-Umgebungen generieren, und Spielarchitekturen, bei denen LLMs Karten, NPCs und Quests zur Laufzeit erzeugen, anstatt auf einen Komponentenkatalog zurückzugreifen, deuten auf eine Zukunft hin, in der das Modell eher wie ein Spielregisseur denn wie ein Formular-Renderer agiert. Lokale LLM-Verarbeitung im Browser über WebGPU ([WebLLM](https://mlc.ai/web-llm/)) treibt dieselbe Frontier lokal voran.  

Dieses Terrain ist wirklich spannend und wirklich noch in den Anfängen. Es gibt noch keine stabilen Frameworks, um damit produktive Produkte zu bauen. Ich werde diesen Ansatz in einem dedizierten Artikel behandeln, sobald sich das ändert.  

---

## Das gesamte Ökosystem  

![Ein vierstöckiges Diagramm, das jedes wichtige generative UI-Tool abbildet: Protokolle (AG-UI, A2UI, MCP Apps) oben, JavaScript-App-Shell-Tools darunter (CopilotKit, Vercel AI SDK, assistant-ui, LangGraph), gefolgt von JavaScript-Katalog-Tools (json-render, Hashbrown, OpenUI, Tambo) und schließlich Python-Tools (Gradio, Streamlit, LangChain, Haystack) unten.](../full-stack-map.svg)  

_Vier Schichten. Protokolle definieren den Wire-Format. App-Shell-Tools verwalten Zustand und Rendering. Katalog-Tools beschränken, was das Modell generieren kann. Python-Tools bilden eine parallele Spur für Daten- und ML-Workflows._  

---

## Die Protokolle: AG-UI und A2UI  

AG-UI und A2UI sind die beiden Hauptstandards in der Protokollschicht. Sie lösen unterschiedliche Probleme und sind keine Konkurrenten.

### AG-UI

**GitHub**: [ag-ui-protocol/ag-ui](https://github.com/ag-ui-protocol/ag-ui)

AG-UI ist ein ereignisbasiertes Protokoll für die Kommunikation zwischen KI-Agenten und Frontend-Anwendungen. Es definiert etwa 16 Ereignistypen: `TEXT_MESSAGE_START`, `TEXT_MESSAGE_CONTENT`, `TOOL_CALL_START`, `TOOL_CALL_END`, `STATE_SNAPSHOT`, `STATE_DELTA` und so weiter. Der Transport ist Ihnen überlassen – SSE, WebSockets und Webhooks funktionieren alle. Der Format ist absichtlich locker, um eine breite Anwendbarkeit zu ermöglichen.

AG-UI definiert nicht, wie Ihre Benutzeroberfläche aussieht. Es definiert, wie der Agent mit Ihrem Frontend kommuniziert. Denken Sie daran als Protokollschicht, die es Ihrem React-App ermöglicht, sich auf einen LangGraph-Agenten genauso abonnieren zu können wie auf einen CrewAI-Agenten, ohne den Frontend-Code zu ändern.

CopilotKit hat AG-UI aus ihrer Arbeit mit LangGraph und CrewAI entwickelt. Es wurde von LangChain, Mastra, PydanticAI und anderen übernommen. Microsoft hat eine AG-UI-Integrationsanleitung veröffentlicht. Wenn Sie eine Multi-Agent-Frontend-Lösung bauen und Backend-Frameworks von Frontend-Code entkoppeln müssen, ist AG-UI die Antwort.

**Eine Klärung, die Leute oft stört**: AG-UI ist kein UI-Framework. Es sagt Ihnen nicht, was gerendert werden soll. Es sagt Ihnen *nur*, dass der Agent etwas gesagt, ein Tool aufgerufen oder den gemeinsamen Zustand aktualisiert hat. Was Sie daraufhin rendern, bleibt Ihre Entscheidung.

### A2UI

**GitHub**: [google/A2UI](https://github.com/google/A2UI) · Spezifikation: [a2ui.org](https://a2ui.org/)

A2UI ist Googles deklarative Spezifikation dafür, was Agenten senden, wenn sie eine Benutzeroberfläche anzeigen möchten. Während AG-UI die Frage „Wie kommuniziert der Agent?“ beantwortet, beantwortet A2UI die Frage „In welchem Format beschreibt der Agent eine Komponentenlayout?“.

A2UI verwendet ein flaches JSONL-Format: Eine Komponentenbeschreibung pro Zeile, jeweils mit einer ID, einem Typ und Daten. Das Flache ist bewusst gewählt. Verschachtelte Bäume erfordern, dass das Modell die vollständige Struktur kennt, bevor es mit dem Streamen beginnen kann. Eine flache Liste ermöglicht es dem Modell, jede Komponente zu streamen, sobald es sie „denkt“, was bedeutet, dass Ihr Frontend bereits die erste Metrik-Karte rendert, während das Modell noch entscheidet, ob eine Grafik hinzugefügt werden soll.

```jsonl
{"id":"h1","type":"kpi_card","title":"MRR","value":"$82,400","delta":"+12%"}
{"id":"h2","type":"kpi_card","title":"Churn","value":"2.1%","delta":"-0.4%"}
{"id":"c1","type":"line_chart","title":"30-day MRR","data_ref":"mrr_series"}
{"id":"t1","type":"data_table","cols":["Month","MRR","Net New"],"data_ref":"monthly"}
```

A2UI ist sicherheitsorientiert: Die Spezifikation ist ein Datenformat, kein ausführbarer Code. Der Komponentenkatalog wird vom Entwickler vorab definiert; das Agentenmodell kann nur Typen aus diesem Katalog referenzieren. Ein A2UI-Renderer ignoriert unbekannte Typnamen.

CopilotKits "Open-JSON-UI"-Format ist mit A2UI kompatibel. Wenn Sie heute ein Spezifikationsformat für einen Komponentenkatalog auswählen, ist A2UI das mit der breitesten Plattformunterstützung.

**Hinweis zur Stabilität**: A2UI ist vor der Version 1.0 – v0.9 beim letzten Check am 8. Mai 2026 – und weist zwischen Minor-Versionen unterbrechende Spezifikationsänderungen auf. Googles Kommunikation zum Roadmap ist unregelmäßig, und einige Renderer (Lit, Flutter) haben Spezifikationsaktualisierungen nachgezogen. Budgetieren Sie Zeit für Spezifikationsdrift, wenn Sie heute darauf aufbauen. Für reine Webanwendungsfälle erscheint json-render aktuell über umfassendere Tooling zu verfügen. Der langfristige Vorteil von A2UI liegt in der plattformübergreifenden Reichweite (Web, Flutter, SwiftUI, Android), die json-render nicht hat.

### MCP Apps

**GitHub**: [modelcontextprotocol](https://github.com/modelcontextprotocol) · Verwandt: [mcp-ui](https://github.com/MCP-UI-Org/mcp-ui)

MCP begann als Protokoll zur Verbindung von LLMs mit Tools und Daten. Die Apps-Erweiterung ermöglicht es MCP-Tools, nicht nur Daten, sondern auch interaktive UI-Artefakte zurückzugeben: React-Komponenten, Formulare, Dashboards, Karten.

Das Sicherheitsmodell ist strikt – und das ist der Punkt: Alles wird in einem gesandboxten iframe mit entzogenen Berechtigungen gerendert, Vorlagen sind vorab deklariert, damit die Host-App sie prüfen kann, und alle Kommunikation erfolgt über überprüfbares JSON-RPC. Dies ist das richtige Modell für Tool-Anbieter – ein Shopify-MCP-Server kann ein Checkout-Widget zurückgeben; ein Kartendienst kann eine einbettbare Karte liefern. Die Host-App besitzt oder vertraut nicht auf den Code dieses Widgets.

MCP Apps ist die richtige Wahl, wenn die UI *dem Tool-Anbieter* gehört, nicht Ihrer Anwendung. Für UI-Elemente, die in Ihrem Anwendungsdomäne liegen, bleiben Sie bei Muster 1 oder 2.

---

## Die JavaScript/TypeScript-Frameworks

### CopilotKit

**GitHub**: [CopilotKit/CopilotKit](https://github.com/CopilotKit/CopilotKit) · Beispiele: [CopilotKit/generative-ui](https://github.com/CopilotKit/generative-ui)

CopilotKit ist das umfassendste Framework für agentennative Frontend-Anwendungen. Es verwaltet den gesamten Lebenszyklus: Verbindung zu Agenten-Backends über AG-UI, Verwaltung des bidirektionalen Konversationszustands, Rendering von generativen UI-Komponenten und Bereitstellung der gemeinsamen Zustandsverkabelung, die Agenten und Benutzer ermöglicht, denselben Datenbestand zu ändern.

Das Dreimustermodell passt sauber zu den CopilotKit-APIs:
- `useCopilotAction` mit einem `render`-Callback → Muster 1
- A2UI/Open-JSON-UI-Rendern → Muster 2
- `OpenGenerativeUI`-gesandte Artefakte → Muster 3

Die wichtige CopilotKit-Funktion, die unterdiskutiert wird, ist **gemeinsamer Zustand und menschlicher Eingriff**: Der Agent kann den Anwendungszustand lesen und schreiben, der Benutzer kann ihn ebenfalls lesen und schreiben, und Änderungen fließen bidirektional. Dies ist der Grund, warum Copilot-artige UIs sich wie eine echte Zusammenarbeit anfühlen und nicht wie ein Chatfenster, das an ein Produkt angeheftet ist.

### Vercel AI SDK

**GitHub**: [vercel/ai](https://github.com/vercel/ai) · Docs: [ai-sdk.dev](https://ai-sdk.dev/)

Das Vercel AI SDK ist der de facto TypeScript-Standard für AI-Anwendungen. Für generative UI speziell:

**`useObject`** streamt ein strukturiertes JSON-Objekt vom Server, während es generiert wird. Sie definieren ein Zod-Schema; das SDK analysiert das teilweise generierte JSON und löst Neurenderungen aus, sobald Felder eintreffen. Dies ist der glatteste Weg, um Muster 2 in einer Next.js-App umzusetzen.

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

**`useChat` mit Tool-Handlern** → Muster 1. Das Modell ruft Tools auf; Sie ordnen Tool-Namen Komponenten zu.

**AI Elements** ([elements.ai-sdk.dev](https://elements.ai-sdk.dev/)) bietet vorgefertigte UI-Primitiven, die mit dem SDK kombiniert werden können.

**Ein Hinweis zur verwirrenden Entwicklung hier**: Im Oktober 2024 kündigte Vercel in der [GitHub Discussion #3251](https://github.com/vercel/ai/discussions/3251) an, dass das AI SDK RSC – der React Server Components-Streaming-Modus, der als Hauptmerkmal „Generative UI“ in SDK 3.0 beworben wurde – aufgrund „mehrerer langer bestehender Einschränkungen“ mit keinen guten kurzfristigen Lösungen endgültig ausgesetzt wurde. Teams, die Produktstrategien um RSC-Streaming aufgebaut hatten, waren überrascht. Die APIs `generateObject`/`streamObject` wurden später in SDK 6.0 als veraltet markiert. Die empfohlene Migration von AI SDK RSC ist das oben beschriebene `useObject`-Muster oder json-render für katalogbasierte Generierung.

### assistant-ui

**GitHub**: [assistant-ui/assistant-ui](https://github.com/assistant-ui/assistant-ui)

assistant-ui ist ein Satz von komponierbaren React-Primitiven zur Erstellung produktionsreifer Chat-Schnittstellen. Es ist die richtige Wahl, wenn Sie eine geschliffene Chat-UX benötigen – Nachrichtenblasen, Streaming-Tokens, Kopieren/Bearbeiten/Neu-Generieren-Aktionen, Denkzustände – und Ihren eigenen Backend-Service sowie eigene Tool-Rendern implementieren möchten.

Es funktioniert gut mit jedem Backend (OpenAI, Anthropic, lokale Modelle, benutzerdefinierte Endpunkte) und behandelt Tool-Aufruf-Rendern über ein bekanntes Slot/Render-Prop-Modell.

### json-render

**GitHub**: [vercel-labs/json-render](https://github.com/vercel-labs/json-render) · Docs: [json-render.dev](https://json-render.dev/)

json-render operationalisiert Muster 2 mit einem eindeutigen, umfassenden Ansatz. Sie erhalten ein vordefiniertes Komponentenkatalog (shadcn/ui-Komponenten mit Zod-Schemata), einen Renderer und einen engen Generierungskreislauf, in dem das Modell durch das Schema auf den Katalog beschränkt ist.

Die herausragenden Merkmale:
- **Multi-Ziel-Rendering**: Die gleiche JSON-Spezifikation kann in eine React-Web-App, eine React Native-App, ein PDF, eine HTML-E-Mail oder ein Remotion-Video gerendert werden. Dies ist wirklich nützlich für Berichte.
- **Progressives Rendering**: Komponenten erscheinen, während das Modell sie streamt, nicht erst nachdem die vollständige Spezifikation eingetroffen ist.
- **Enge Schema-Beschränkungen**: Der Katalog ist so gestaltet, dass das Modell keine gültigen, aber unbekannten Komponententypen fälschlicherweise erzeugen kann.

Wenn Sie ein Dashboard oder eine Berichtserstellungsfunktion entwickeln und die Infrastrukturarbeit für den eigenen Katalog umgehen möchten, ist **json-render** die schnellste Möglichkeit für Webanwendungen.  

**Zur Dynamik**: json-render wurde 2026 von Vercel Labs veröffentlicht und scheint schnell Aufmerksamkeit bei Webentwicklern gewonnen zu haben, da es sofort in Standard-React/Next.js-Projekten nützlich ist. Allerdings ist json-render immer noch in der Vorversion 1.0 und die Beziehung zwischen json-render und A2UI wird noch ausgearbeitet – Vercel hat bereits mit A2UI-kompatibler Ausgabe experimentiert, sodass eine Konvergenz möglich ist. Für plattformübergreifende Anwendungen (nativer Mobile, mehrere Frameworks) ist A2UI die bessere langfristige Option.  

### Hashbrown  

**GitHub**: [liveloveapp/hashbrown](https://github.com/liveloveapp/hashbrown)  

Hashbrown verfolgt einen eigenständigen Ansatz: Anstatt eine separate AI-Schnittstelle zu erstellen, integriert es die AI-Komponentenauswahl direkt in Ihre bestehende React- oder Angular-App. Sie stellen Ihre Apps-Komponenten dem LLM zur Verfügung; das LLM wählt aus, welche gerendert werden sollen, und kann clientseitige Tools aufrufen.  

Dies ist die richtige Wahl, wenn Sie Intelligenz in Produktoberflächen einbringen möchten, die nicht "Chat" sind – eine Produktseite, die ihren Layout anpasst, ein Einstellungspaneel, das die richtigen Optionen anzeigt, oder ein Workflow-Editor, der den nächsten Schritt vorschlägt.  

### OpenUI  

**GitHub**: [thesysdev/openui](https://github.com/thesysdev/openui) · Docs: [openui.com](https://www.openui.com/)  

OpenUI ersetzt JSON durch ein zeilenbasiertes, code-ähnliches Format ("OpenUI Lang"), das für progressives Rendering und Token-Effizienz konzipiert ist. Der Anspruch ist etwa 67 % weniger Token als bei vergleichbarem JSON für komplexe Layouts.  

Der Kompromiss ist die Ökosystemreife – OpenUI ist neu und das Tooling ist dünner als bei JSON-basierten Ansätzen. Wenn die Token-Kosten jedoch eine bedeutende Einschränkung darstellen und Sie komplexe Layouts häufig generieren, ist die Format-Effizienz real.

### Tambo

**GitHub**: [tambo-ai/tambo](https://github.com/tambo-ai/tambo)

Tambo konzentriert sich auf die Auswahl von Zustandskomponenten: Die KI wählt Komponenten aus und kann sie über clientseitige Tools interagieren, wobei der Komponentenzustand über den gesamten Gesprächsverlauf beibehalten wird. Gut für Anwendungsfälle, bei denen UI-Elemente über mehrere Turns hinweg bestehen bleiben – eine Filterkomponente, die der Benutzer anpasst, während die KI weiterhin über die gefilterten Daten nachdenkt.

---

## Die Python-Schicht

Die Python-Ökosysteme nähern sich AI-Schnittstellen anders. Diese Tools sind für ML-Modell-Demos, Datenanwendungen und interne Tools optimiert – nicht für Produktionsanwendungen mit agentengetriebener Layoutzusammensetzung.

Das ist keine Kritik. Für die richtigen Anwendungsfälle sind Gradio und Streamlit die einzigen Tools, die Sie benötigen.

### Gradio

**GitHub**: [gradio-app/gradio](https://github.com/gradio-app/gradio) · PyPI: `gradio`

Der Kernwert von Gradio: Sie schreiben eine Python-Funktion; Gradio verpackt sie in eine Web-UI. Die `Interface`-Klasse benötigt 3 Zeilen für einen Bildklassifizierer. `ChatInterface` benötigt 10 Zeilen für einen Chatbot. `Blocks` gibt Ihnen feingranulare Layoutkontrolle, wenn Sie sie benötigen.

Die "generative UI" in Gradio wird vom Python-Entwickler definiert, nicht vom Modell. Die Sichtbarkeit und Konfiguration von Komponenten können sich dynamisch anhand der Modellausgaben ändern, der Komponentenkatalog ist jedoch statisch – Sie bitten das Modell nicht, Layouts zusammenzusetzen.  

Gradio ist der Standard für HuggingFace Spaces und das ML-Demo-Ekosystem. Es hat Millionen von monatlichen Downloads und treibt einen großen Teil der AI-Demo-Landschaft an.  

**Greifen Sie zu Gradio, wenn**: Sie ein Python-Entwickler sind, der ein ML-Modell-Demo, ein Forschungsprototyp oder ein internes Tool erstellt und JavaScript nicht berühren möchte.  

### Streamlit  

**GitHub**: [streamlit/streamlit](https://github.com/streamlit/streamlit)  

Das Modell von Streamlit ist stärker vorgegeben: Ein Python-Skript läuft bei jeder Interaktion vollständig durch. Sie rufen `st.chat_message()`, `st.dataframe()`, `st.plotly_chart()` auf. Das Framework übernimmt das Layout.  

Das Full-Script-Rerun-Modell klingt ineffizient, ist für AI-Chatbots, die Konversationsverlauf sammeln, jedoch überraschend ergonomisch – das gesamte Skript wird erneut ausgeführt, der Chatverlauf ist im Sitzungszustand gespeichert, und die Ausgabe ist deterministisch. Streamlit bietet nun für die meisten größten LLM-Anbieter direkte Unterstützung und integriert sich nativ mit Snowflake Cortex.  

**Greifen Sie zu Streamlit, wenn**: Sie eine AI-gestützte Datenanwendung, ein internes Berichtstool oder ein ML-basiertes Dashboard in Python erstellen und den einfachsten möglichen Bereitstellungsprozess wünschen.  

### LangChain und Haystack  

Diese sind Backend-Orchestrierungsframeworks, keine UI-Frameworks. Sie erscheinen in jeder ehrlichen Karte von generativen UI-Stacks, da sie typischerweise die Schicht darstellen, in der strukturierte Ausgaben generiert werden, bevor sie an eine Frontend-Schicht weitergeleitet werden.

**LangChain** ([langchain-ai/langchain](https://github.com/langchain-ai/langchain)): `.with_structured_output()` auf jedem LLM ermöglicht Pydantic-gesteuerte JSON-Generierung. Der `@tool`-Decorator mit automatischer Schemaerstellung ist die sauberste Methode, um zu definieren, welche Tools das Modell aufrufen kann. LangChain übergibt strukturierte Ergebnisse an die von Ihnen verwendete Frontend-Schicht.  

**Haystack** ([deepset-ai/haystack](https://github.com/deepset-ai/haystack)): modulare Pipeline-Architektur mit starker RAG-Unterstützung. Hayhooks verpackt Haystack-Pipelines als HTTP-Endpunkte – einschließlich MCP-kompatibler Endpunkte. Wenn Ihre generative UI eine Retrieval-Infrastruktur benötigt, bewältigt Haystacks Pipeline-Architektur dies sauber.  

Kein Framework besitzt die UI-Schicht. Sie generieren die Daten, die Ihre Frontend-Schicht (Muster 1, 2 oder 3) darstellt.  

---

## Feature-Referenz  

Nehmen Sie das oben stehende Katalog als Orientierung, nicht als Einkaufsliste. Der Stack reduziert sich normalerweise auf eine Wahl pro Schicht:  

| Braucht | Starten hier |  
|---------|--------------|  
| Agenten-zu-Frontend Ereignisstrom | [AG-UI](https://github.com/ag-ui-protocol/ag-ui) |  
| Deklarativer UI-Inhalt über eine Vertrauensgrenze | [A2UI](https://github.com/google/A2UI) oder [MCP Apps](https://github.com/MCP-UI-Org/mcp-ui) |  
| Chat-/Tool-Darstellung im App-Besitz | [Vercel AI SDK](https://github.com/vercel/ai), [assistant-ui](https://github.com/assistant-ui/assistant-ui) oder [CopilotKit](https://github.com/CopilotKit/CopilotKit) |  
| Dashboards, Berichte und Formulare aus Katalog-Komponenten | [json-render](https://github.com/vercel-labs/json-render), [Hashbrown](https://github.com/liveloveapp/hashbrown), [OpenUI](https://github.com/thesysdev/openui) oder [Tambo](https://github.com/tambo-ai/tambo) |  
| Sandboxed visuelle Artefakte | [OpenGenerativeUI](https://github.com/CopilotKit/OpenGenerativeUI) |  
| Python-Demos und Daten-Apps | [Gradio](https://github.com/gradio-app/gradio) oder [Streamlit](https://github.com/streamlit/streamlit) |  

---

## Ökosystemgeschwindigkeit und instabiles Terrain  

Dieser Bereich entwickelt sich schnell, und mehrere Projekte haben verwirrende Kommunikation mit ihren Code-Veröffentlichungen verbunden. Letzte Überprüfung am 8. Mai 2026; betrachten Sie die hier genannten Projektstatus-Hinweise als zeitstempelbasierte Leseinformation, nicht als dauerhafte Bewertung.

**Vercel AI SDK RSC** war die Kernfunktion für Generative UI, als SDK 3.0 veröffentlicht wurde. Vercel pausierte die Entwicklung im Oktober 2024 ([Diskussion #3251](https://github.com/vercel/ai/discussions/3251)), da React Server Components architektonische Einschränkungen aufwiesen, für die keine kurzfristige Lösung existierte. Teams, die darauf aufbauten, waren nachvollziehbar frustriert. Es ist weiterhin in der Dokumentation enthalten, wird aber nicht mehr als empfohlener Ansatz beworben; `useObject` ist der neue Standard.

**json-render** (Vercel Labs) ist der neue Ansatz – eine katalogbasierte, framework-agnostische Alternative, die die RSC-Kopplungsprobleme umgeht. Es ist vor der 1.0-Version und zeigt bereits starkes Interesse unter React/web-Entwicklern. Der wahrscheinliche DX-Grund: json-render ist sofort einsetzbar in einem Standard-React/Next.js-Projekt, während A2UIs Querplattformumfang Setup-Friction hinzufügt. Wie sich dies bei Reifung beider Spezifikationen entwickelt, ist unklar. Vercel hat A2UI-Kompatibilität in json-render untersucht, was Konvergenz möglich erscheinen lässt.

**A2UI** (Google) ist vor der 1.0-Version (v0.9 bei letzter Prüfung) mit Breaking Changes zwischen Minor-Versionen und inkonsistenten Google-Kommunikationen zu seiner Roadmap. Es ist die richtige Wahl für Querplattformreichtum (Web + Flutter + SwiftUI), den json-render nicht abdeckt, und hat bedeutende Unternehmensunterstützung. Für reine Webprojekte ist die DX derzeit rauer.

**AG-UI** (CopilotKit) ist ebenfalls vor der 1.0-Version. Der häufigste Verwirrungsgrund: Der Name lässt es wie ein UI-Framework wirken. Ist es nicht – es ist ein Transportprotokoll. AG-UI definiert, wie Ereignisse zwischen Agent-Backends und deiner Frontend-Komponente fließen; was du daraufhin renderst, bleibt deine Entscheidung. Dieses Denkmodell ist solide und weit verbreitet, die vor-1.0-Spezifikation bedeutet aber, dass Randfälle noch ausgearbeitet werden.

Die praktischen Konsequenzen: **Jeder große Akteur hier ist vor der 1.0-Version**. Plane API-Änderungen ein. Die Muster – tool-to-component, katalogbasierte Komposition, gesicherte Generierung – sind stabil genug, um darauf aufzubauen. Die konkreten Protokollauswahl sind es nicht.

---

## Komponentenkatalog-Design: Die echte Ingenieursarbeit

Die meisten interessanten Komplexitäten im Muster 2 befinden sich nicht im Renderer – sondern im Katalog.

Der Katalog ist eine **Produktentscheidung, kodiert als Schema**. Er beantwortet: Welche bedeutungsvollen UI-Objekte existieren in diesem Bereich? Nicht „Welche React-Komponenten gibt es?“, sondern „Was benötigt ein Benutzer in diesem Kontext tatsächlich, um zu sehen und zu interagieren?“

**Der zu feinkörnige Fehlermodus**: Du stellst `Row`, `Column`, `Text`, `Button`, `Icon` bereit. Nun muss das Modell ein Frontend-Entwickler sein. Es generiert durchschnittliche Layouts, die nicht zu deinem Design-System passen, ignoriert leere Zustände, produziert inkonsistenten Markup-Code und ändert ständig seinen Ansatz, da nichts im Katalog die Ausgabe an dein Produktsprache bindet.

**Der zu grobe Fehlermodus**: Du bereitstellst `WeatherCard`, `FlightCard`, `HotelCard`. Das Modell kann nicht anpassen, wenn der Benutzer etwas anfordert, das nicht auf eine vorgefertigte Karte abbildet. Es fällt zurück auf Text.

**Die nützliche Mitte**: Domänenkomponenten mit eingeschränkten Slots.

Ein Komponentenkatalog für eine Reise-App könnte so aussehen:

```
TripSummary         — itinerary at a glance
FlightOptionList    — selectable flight options with pricing
HotelComparison     — side-by-side hotel cards
TravelerForm        — collect traveler details
PolicyNotice        — regulatory/fare rule callout
BookingConfirmation — final confirmation with action button
```

Ein Komponentenkatalog für eine Finanz-App könnte so aussehen:

```
PortfolioSnapshot   — key positions and P&L
TransactionTable    — filterable, paginated transactions
RiskBreakdown       — allocation and volatility metrics
ScenarioComparison  — side-by-side scenario modeling
ApprovalGate        — action requiring human confirmation
```

Der Katalog klingt wie das Vokabular deines Produkts. Er kodiert deine UX-Entscheidungen, deine Barrierefreiheitsanforderungen, deine Umgang mit leeren Zuständen und deine Muster für gefährliche Aktionen in Komponenten-Code. Das Modell darf diese Bausteine anordnen. Du entscheidest weiterhin, wie jeder Baustein aussieht und was er darf.

**Schema-Entwurfsregeln, die Halluzinationen reduzieren**:

1. Halte Enum-Werte kurz und offensichtlich. `"type": "bar_chart"` statt `"type": "data-visualization-bar-type-vertical"`.
2. Mach ungültige Zusammensetzung unmöglich. Wenn eine `PolicyNotice` nur am Ende eines Layouts erscheinen darf, stelle sie nicht auf derselben Schemaebene wie Elemente, die überall erscheinen dürfen.
3. Verwende required-Felder großzügig. Ein optionales Feld ist ein Feld, das das Modell weglassen könnte, und das Renderer als null behandeln muss.
4. Teste den Katalog gegen reale Prompts, bevor du ihn auslieferst. Speichere die generierten Spezifikationen; prüfe sie auf Schema-Verletzungen, halluzinierte Feldwerte und Zusammensetzungen, die zwar technisch gültig, aber semantisch falsch sind.

---

## Häufige Fallstricke

**Falle: Gültigen JSON als sicheres Verhalten betrachten.** Schema-Validierung bestätigt die Struktur. Sie sagt nichts darüber aus, ob die Aktion, die an einen Button angehängt ist, mit seiner Beschriftung übereinstimmt, ob ein Gesamtwert mit den Daten übereinstimmt, aus denen er abgeleitet wird, oder ob ein UI-Komponente etwas tut, was der Benutzer nicht erwartet. Generierte UI-Spezifikationen benötigen eine semantische Prüfung, nicht nur eine Schema-Validierung. Mindestens sollten zerstörerische Aktionen eine Bestätigungskomponente erfordern, und die Beschriftungen dieser Komponenten sollten gegen die Aktionen getestet werden, die sie auslösen.

**Falle: Design-Primitiven statt Produkt-Primitiven preiszugeben.** Wenn das Modell entscheiden muss, ob 16px oder 20px Padding verwendet wird, haben Sie ihm die falsche Abstraktionsebene gegeben. Domänenkomponenten sollten Produktstil und -ästhetik kodieren. Das Modell sollte Verhalten zusammensetzen, nicht Präsentationsdetails verwalten.  

**Falle: Generative UI dort einzusetzen, wo statische UI ausreicht.** Wenn die Struktur dessen, was Sie anzeigen möchten, zur Entwicklungszeit bekannt ist – und das ist sie in den meisten Fällen –, ist Muster 1 mit vordefinierten Komponenten schneller, sicherer und konsistenter. Generative UI rechtfertigt ihre Komplexität erst dann, wenn die Struktur tatsächlich auf Daten oder Aufgabenkontext variiert.  

**Falle: Barrierefreiheit zu ignorieren.** LLMs erfinden WCAG-Verstöße. Sie weisen interaktiven Elementen `role="region"` zu, generieren Formulare ohne Beschriftungen und produzieren Kontrastverhältnisse, die WCAG AA nicht erfüllen. Ihre Komponentenbibliothek kann vollständig barrierefrei sein; Kombinationen dieser Komponenten durch KI sind nicht automatisch barrierefrei. Testen Sie den gesamten Render-Path, nicht nur die isolierten Komponenten.  

**Falle: Protokoll und Framework zu verwechseln.** AG-UI ist kein Frontend-Framework. A2UI ist keine React-Bibliothek. Beide sind Wire-Formate und Ereignisprotokolle. Sie benötigen weiterhin ein Frontend-Framework, um sie umzusetzen. CopilotKit implementiert AG-UI und A2UI. json-render implementiert das A2UI/Open-JSON-UI-Katalogmuster. Das sind unterschiedliche Schichten.  

---  

## Empfehlungen nach Anwendungsfällen  

**Hinzufügen eines Copilots zu einer bestehenden SaaS-App**: Beginnen Sie mit Muster 1 (Tool-to-Komponente). Nutzen Sie Vercel AI SDK `useChat` oder CopilotKit. Mappen Sie Ihre Top-5–10-Agentenaktionen auf vordefinierte Komponenten. Implementieren Sie das, messen Sie die Auswirkungen und erweitern Sie den Katalog nur, wenn Benutzer nachweislich reichere Kompositionen benötigen.  

**Dashboarderstellung aus natürlicher Sprache**: Nutzen Sie Muster 2 mit json-render oder einem benutzerdefinierten A2UI-Katalog. Definieren Sie einen Katalog mit 8–15 Komponententypen, die Ihre Diagrammtypen, Metrik-Karten und Tabellenvarianten abdecken. Füttern Sie das Schema dem Modell; lassen Sie es die Layouts zusammensetzen. Erstellen Sie Validierungen, die unbekannte Typen vor dem Renderer abfangen.  

**Mult-Agenten-Frontend**: Nutzen Sie CopilotKit mit AG-UI. Der Ereignis-Stream behandelt Echtzeit-Streaming über Agenten-Backends; geteilter Zustand verwaltet den Übergang zwischen Agenten; das HITL-Muster behandelt Genehmigungsschranken.  

**Entwicklung innerhalb von ChatGPT oder einem anderen MCP-Host**: Nutzen Sie MCP-Apps. Definieren Sie Ihr Tool als Daten-Tool, das Daten abruft und analysiert, und ein separates Render-Tool, das ein Widget anfordert. Halten Sie Geschäftslogik aus dem Widget-Template heraus.

**ML-Modell-Demos und Daten-Apps (Python-Team)**: Gradio für Demos und HuggingFace Spaces. Streamlit für Daten-Apps mit komplexeren Interaktionen. Keiner benötigt JavaScript.  

**Visuelle Artefakte, Simulationen, Diagramme**: Nutzen Sie Muster 3 (OpenGenerativeUI oder Äquivalent). Legen Sie eine strikte iframe-CSP fest. Behandeln Sie die Ausgabe wie unvertrauenswürdige Benutzerinhalte aus Sicht der Sicherheit.  

Die Frameworks entwickeln sich rasch weiter. Die Protokollkonvergenz (AG-UI für Streaming, A2UI/Open-JSON-UI für Katalogspezifikationen) ist noch in Bearbeitung, aber die Form ist bereits klar genug, um darauf aufzubauen.  

Die wichtigsten ingenieurstechnischen Herausforderungen sind derzeit nicht die Wahl des Frameworks. Sie sind Katalogdesign – Entscheidungen darüber, was das Modell sagen darf, was mehr Produktklarheit als technische Fähigkeit erfordert. Sie sind semantische Validierung – Tests, ob die generierte Benutzeroberfläche das tut, was sie verspricht, nicht nur, dass sie die Schema-Validierung besteht. Und sie sind die Barrierefreiheitslücke – Kataloge zu erstellen, bei denen jeder Komponente und jede Kombination von Komponenten die gleichen Barrierefreiheitsanforderungen erfüllt, die Sie auch für manuell erstellte Benutzeroberflächen ansetzen würden.  

Das Modell wird tun, was Sie ihm innerhalb der Grammatik befehlen, die Sie ihm geben. Machen Sie die Grammatik bewusst.
````
