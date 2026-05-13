# Translation Candidate
- Slug: llm-generative-ui-landscape-2026
- Locale: de
- Model: openrouter/openai/gpt-oss-120b:nitro
- Target: src/content/posts/2026-05-10--llm-generative-ui-landscape-2026/de/index.mdx
- Validation: passed
- Runtime seconds: 16.92
- Input tokens: 61382
- Output tokens: 12316
- Thinking tokens: unknown
- Cached input tokens: 33920
- Cache write tokens: 0
- Estimated cost: $0.004611
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
title: LLM‑GenUI‑Übersicht v2
subTitle: >-
  Vom Tool‑zu‑Komponente‑Rendering bis zur offenen Generierung – eine Übersicht
  aller Ansätze und wann jeder seine Komplexität rechtfertigt.
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
„Generative UI“ bedeutet je nach Sprecher mindestens fünf unterschiedliche Dinge.

- Chat‑Interfaces, die Produkt‑Karten aus Modell‑Tool‑Aufrufen einbetten  
- Laufzeit‑JSON‑Spezifikationen, die das Frontend als Komponenten‑Bäume rendert  
- Sandgeboxte IFrames, die von MCP‑Tools an Host‑Apps zurückgegeben werden (von Ticket‑Bestellungen, Hotelbuchungen bis hin zu Karten‑Rendering, Checkout‑Widgets)  
- Ereignis‑Protokolle, die Agenten‑Zustand zum Frontend streamen  
- v0, Lovable und Bolt: KI‑Tools, die React zur Design‑Zeit schreiben  

Das sind verwandte Konzepte, aber sie existieren auf unterschiedlichen Ebenen des Stacks und haben unterschiedliche Risikoprofile, Implementierungskosten und passende Anwendungsfälle. Sie zu vermischen macht jede Architekturdiskussion zu einem Chaos.

Das ist die Karte, die ich brauche, wenn ich entscheide, wo im Stack ich ansetzen will.

## Was Generative UI nicht ist

Bevor wir definieren, was es ist, drei Dinge beiseitelegen:

**Design‑time‑Code‑Generierung** — v0, Lovable, Bolt, Cursor, die React‑Komponenten zusammensetzen. Diese Werkzeuge erzeugen Code, den Entwickler prüfen und einchecken. Die KI läuft zur Entwicklungszeit. Was ausgeliefert wird, ist aus Sicht des Nutzers statisch. Das ist eine hervorragende Kategorie von Tools. Es ist nicht das, was „generative UI zur Laufzeit“ bedeutet.

**KI‑unterstützte Formular‑Autovervollständigung** — das Modell füllt Feldwerte aus dem Kontext aus. Die Struktur der Oberfläche bleibt fest; nur der Inhalt ändert sich. Das ist ein nützliches Muster. Es ist keine generative UI.

**KI schreibtrohes HTML in eine Seite** — das Modell gibt `<div>`‑ und `<button>`‑Zeichenketten aus, die über `innerHTML` oder `dangerouslySetInnerHTML` eingefügt werden. Das *ist* Laufzeit‑generative UI im strengsten technischen Sinn. Gleichzeitig ist es die gefährlichste Variante und genau der Grund, warum jedes ausgereifte Framework in diesem Bereich darauf ausgelegt ist, sie zu vermeiden. Rohes, von KI erzeugtes Markup bedeutet XSS‑Risiko, nicht‑barrierefreie Attribute, inkonsistentes Styling und halluzinierte Struktur. Der Rest dieses Artikels zeigt, wie man es besser macht.

---

## Eine funktionierende Definition

Generative UI zurLaufzeit bedeutet: **das Modell bestimmt, welche Schnittstellen‑Komponente oder Komponenten‑Zusammensetzung dem Nutzer angezeigt wird, basierend auf dem Zustand der Konversation oder Aufgabe**.

Nicht die Worte. Die Oberfläche.

Der einfachste Fall: Ihr Flugbuchungs‑Assistent ruft ein `search_flights`‑Tool auf. Anstatt reinen Text zurückzugeben („Hier sind drei Optionen …“), rendert er eine `<FlightResultsCard>`‑Komponente mit auswählbaren Flügen, Sitzklassen‑Umschaltern und einem „Buchen“-Button. Das Modell hat entschieden, dass eine strukturierte Karte hier die richtige Antwort ist. Der Entwickler hat festgelegt, wie diese Karte aussieht und was „Buchen“ bewirkt.

Der komplexere Fall: Ein Finanzanalyse‑Agent erhält eine Frage zu einem Portfolio und entscheidet sich, eine Antwort zusammenzusetzen, die ein `MetricGroup`‑Element mit Schlüsseldaten, ein `RiskBreakdown`‑Diagramm, eine `ScenarioComparison`‑Tabelle und einen `PolicyNotice` enthält. Das Modell hat dieses Layout aus einem Katalog vorab genehmigter Komponenten zusammengestellt. Der Entwickler hat jede Komponente definiert. Das Modell wählte, welche Komponenten verwendet werden und welche Daten in ihnen angezeigt werden.

Beide Fälle sind generative UI. Sie unterscheiden sich darin, wie viel Kompositionsfreiheit das Modell hat, was sowohl den möglichen Ausgabe‑Reichtum als auch die Komplexität potenzieller Fehler bestimmt.

## Die drei Muster

Der gesamte Raum lässt sich auf drei Muster reduzieren, von denen jedes eine eigene Ausgabesyntax hat.

![Ein Spektraldiagramm, das drei Muster zeigt: Werkzeugaufrufe nur links (am sichersten), Komponenten‑Katalog in der Mitte und offene Generierung rechts (am ausdrucksstärksten).](../output-grammar-spectrum.svg)

_Every generative UI decision is a point on this spectrum. Start left._

### Pattern 1: Tool-to-component rendering

The model calls a named tool. Your application has a map from tool names to components. The tool call triggers a component render.

```tsx
// The model calls: { name: "show_flight_results", args: { flights: [...] } }

useCopilotAction({
  name: "show_flight_results",
  render: ({ args }) => <FlightResultsCard flights={args.flights} />,
});
```

Dies ist das sicherste Muster, weil das Layout niemals vom Modell stammt. Das Modell entscheidet *wann* eine Komponente angezeigt wird und *welche Daten* sie füllen. Ihre Entwickler behalten die Verantwortung für den Komponenten‑Code, das visuelle Design, die Barrierefreiheits‑Implementierung und jede Randbedingung in der Render‑Logik.

Das `useChat`‑API des Vercel AI‑SDK mit `tool`‑Handlern funktioniert genau so. Auch die Tool‑Render‑Funktion von assistant‑ui und CopilotKit’s „Static Generative UI“ basieren auf diesem Muster. Die meisten produktiven Copilot‑UIs, die zuverlässig laufen, setzen darauf.

**Passend, wenn**: die Menge der Dinge, die Sie anzeigen möchten, zur Entwicklungszeit bekannt ist. Buchungsbestätigungen, Suchergebnisse, Kontozusammenfassungen, Genehmigungs‑Widgets. Wenn Sie die Szenarien aufzählen können, deckt dieses Muster sie ab.

### Pattern 2: Component‑Katalog‑Komposition

Das Modell gibt einen typisierten JSON‑Baum aus, der Komponenten aus einem vom Entwickler definierten Katalog referenziert. Ihr Front‑End besitzt einen Renderer, der den Baum traversiert und jede Komponente instanziiert.

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

Das Modell hat dieses Layout zusammengesetzt: ein `MetricGroup`, ein `LineChart`, ein `InsightCallout`. Aber Sie haben definiert, was jeder Komponententyp bedeutet, welche Props er akzeptiert und wie er gerendert wird. Versucht das Modell, `{ "type": "custom_untested_thing" }` auszugeben, fängt Ihre Schema‑Validierung das ab und der Renderer ignoriert oder verwirft es.

Dies ist das Muster hinter `json-render`, `A2UI`, `Hashbrown`, `OpenUI` und `Tambo`. Die zentrale ingenieurtechnische Aufgabe ist **Katalogdesign** — zu bestimmen, welche Komponententypen existieren, wie ihre Schemata aussehen und was das Modell dürfen bzw. nicht dürfen zusammensetzen.

**Passend, wenn**: die Struktur dessen, was Sie anzeigen möchten, legitim anhand der Daten oder der Benutzeranfrage variiert. Dashboards, die sich an das Wesentliche in den Zahlen anpassen. Berichte, die je nach Kontext unterschiedliche Abschnitte zeigen. Workflow‑Panels, die sich ändern, je nachdem, in welchem Schritt sich ein Agent befindet.

### Muster 3: Offene Generierung

Das Modell erzeugt HTML, SVG, Canvas oder WebGL, das innerhalb eines sandboxed iframes mit einer strengen Content‑Security‑Policy gerendert wird.

Dies ist geeignet für Fälle, in denen kein fester Komponenten‑Katalog ausreicht: Algorithmus‑Visualisierungen, Architektur‑Diagramme, ad‑hoc‑Charts, generative Kunst, edukative Simulationen. Die iframe‑Grenze übernimmt hier die Sicherheitsarbeit; wird sie entfernt, kehrt man zum Roh‑HTML‑Injektionsproblem zurück, das zu Beginn dieses Artikels beschrieben wurde.

`CopilotKit/OpenGenerativeUI` ist die derzeit beste Referenzimplementierung dieses Musters. Die Sandbox entfernt Skripte, begrenzt den Nachrichtenaustausch und hält das erzeugte Artefakt von dem privilegierten Zustand Ihrer Anwendung fern.

**Passend, wenn**: Sie tatsächlich beliebige visuelle Ausgaben benötigen — einmalige erklärende Diagramme, dynamische Simulationen, kreative Artefakte. Verwenden Sie das nicht für transaktionale Oberflächen. Eine Bestellbestätigung braucht keinen sandboxed iframe.

### Über die drei Muster hinaus: LLMs steuern Pixel direkt

Es zeichnet sich ein vierter Ansatz ab, der in keines der bestehenden Muster passt: LLMs erzeugen **immersive, spielähnliche Erlebnisse**, indem sie die visuelle Ausgabe direkter steuern als ein sandboxed iframe.

Die kanonische Unterscheidung im generativen UI lautet **iframe‑HTML vs. JSON‑Katalog**:

- **iframe‑HTML** — das Modell schreibt HTML, SVG, Canvas oder WebGL, das in einem isolierten Sandbox‑Kontext gerendert wird. Maximale Ausdrucksfreiheit; die Sicherheit beruht ausschließlich auf der iframe‑Grenze. Beispiele: Anthropic Artifacts, OpenGenerativeUI.  
- **JSON‑Katalog** — das Modell gibt ein strukturiertes Payload aus, das auf einen vom Entwickler definierten Komponenten‑Katalog beschränkt ist; Ihr Renderer instanziiert vertrauenswürdige, vorgefertigte Komponenten aus dieser Spezifikation. Das Modell entscheidet *was* angezeigt wird; Sie entscheiden *wie* es gerendert wird. Beispiele: json‑render, A2UI.

Darüber hinaus deuten sehr aktuelle Demos auf einen dritten Modus hin, bei dem das Modell weder Komponenten auswählt noch sandboxed HTML schreibt — es steuert das Canvas direkter. Projekte wie [Tencent's HunyuanWorld](https://arxiv.org/abs/2502.01999), das erkundbare 3‑D‑Umgebungen aus einem einzigen Bild erzeugt, und Spiel‑Architekturen, bei denen LLMs zur Laufzeit Karten, NPCs und Quests generieren, anstatt einen Komponenten‑Katalog aufzurufen, weisen auf eine Zukunft hin, in der das Modell eher einem Spieldirektor als einem Formular‑Renderer ähnelt. In‑Browser‑LLM‑Inference via WebGPU ([WebLLM](https://mlc.ai/web-llm/)) treibt dieselbe Grenze lokal voran.

Dieses Gebiet ist wirklich spannend und gleichzeitig noch ganz am Anfang. Es gibt noch keine stabilen Frameworks, mit denen man Produktions‑produkte bauen kann. Sobald sich das ändert, werde ich diesen Ansatz in einem eigenen Artikel behandeln.

---

## Das gesamte Ökosystem

![Ein vier‑schichtiges Diagramm, das jedes wichtige Generative‑UI‑Tool abbildet: Protokolle (AG‑UI, A2UI, MCP Apps) oben, JavaScript‑App‑Shells darunter (CopilotKit, Vercel AI SDK, assistant‑ui, LangGraph), dann JavaScript‑Katalog‑Tools (json‑render, Hashbrown, OpenUI, Tambo) und schließlich Python‑Tools unten (Gradio, Streamlit, LangChain, Haystack).](../full-stack-map.svg)

_Vier Schichten. Protokolle definieren das Wire‑Format. App‑Shells verwalten Zustand und Rendering. Katalog‑Tools begrenzen, was das Modell erzeugen darf. Python‑Tools bilden eine parallele Spur für Daten‑ und ML‑Workflows._

## Die Protokolle: AG-UI und A2UI

AG-UI und A2UI sind die beiden Hauptstandards in der Protokoll‑Schicht. Sie lösen unterschiedliche Probleme und stehen nicht in Konkurrenz zueinander.

### AG-UI

**GitHub**: [ag-ui-protocol/ag-ui](https://github.com/ag-ui-protocol/ag-ui)

AG-UI ist ein ereignisbasiertes Protokoll für die Kommunikation zwischen KI‑Agenten und Frontend‑Anwendungen. Es definiert etwa 16 Ereignistypen: `TEXT_MESSAGE_START`, `TEXT_MESSAGE_CONTENT`, `TOOL_CALL_START`, `TOOL_CALL_END`, `STATE_SNAPSHOT`, `STATE_DELTA` und weitere. Der Transport bleibt Ihnen überlassen — SSE, WebSockets, Webhooks funktionieren alle. Das Format ist bewusst locker gehalten, um eine breite Akzeptanz zu ermöglichen.

AG-UI legt nicht fest, wie Ihre UI aussieht. Es definiert, wie der Agent *mit* Ihrem Frontend kommuniziert. Betrachten Sie es als die Wire‑Protocol‑Schicht, die es Ihrer React‑App erlaubt, sich auf einen LangGraph‑Agenten genauso zu abonnieren wie auf einen CrewAI‑Agenten, ohne den Frontend‑Code anzupassen.

CopilotKit hat AG‑UI aus ihrer Arbeit mit LangGraph und CrewAI hervorgebracht. Es wird von LangChain, Mastra, PydanticAI und anderen übernommen. Microsoft hat einen Integrations‑Guide für AG‑UI veröffentlicht. Wenn Sie ein Multi‑Agent‑Frontend bauen und die Backend‑Frameworks vom Frontend‑Code entkoppeln müssen, ist AG‑UI die Lösung.

**Ein Hinweis, der häufig missverstanden wird**: AG‑UI ist kein UI‑Framework. Es sagt nicht, was gerendert werden soll. Es signalisiert *dass* der Agent etwas gesagt, ein Tool aufgerufen oder den geteilten Zustand aktualisiert hat. Was Sie daraufhin rendern, bleibt Ihre Entscheidung.

### A2UI

**GitHub**: [google/A2UI](https://github.com/google/A2UI) · Spec: [a2ui.org](https://a2ui.org/)

A2UI ist Googles deklarative Spezifikation dafür, was Agenten senden, wenn sie UI anzeigen wollen. Während AG‑UI beantwortet „wie kommuniziert der Agent?“, beantwortet A2UI „welches Format verwendet der Agent, um ein Komponenten‑Layout zu beschreiben?“.

A2UI verwendet ein flaches JSONL‑Format: einen Komponenten‑Deskriptor pro Zeile, jeweils mit einer ID, einem Typ und Daten. Flach ist beabsichtigt. Verschachtelte Bäume erfordern, dass das Modell die gesamte Struktur kennt, bevor es mit dem Streamen beginnen kann. Eine flache Liste erlaubt dem Modell, jede Komponente zu emitieren, sobald es „darüber nachdenkt“, was bedeutet, dass Ihr Frontend bereits die erste Metrik‑Karte rendern kann, während das Modell noch entscheidet, ob ein Diagramm hinzugefügt werden soll.

```jsonl
{"id":"h1","type":"kpi_card","title":"MRR","value":"$82,400","delta":"+12%"}
{"id":"h2","type":"kpi_card","title":"Churn","value":"2.1%","delta":"-0.4%"}
{"id":"c1","type":"line_chart","title":"30-day MRR","data_ref":"mrr_series"}
{"id":"t1","type":"data_table","cols":["Month","MRR","Net New"],"data_ref":"monthly"}
```

A2UI ist sicherheitsbewusst: Die Spezifikation ist ein Datenformat, kein ausführbarer Code. Der Komponenten‑Katalog wird vom Entwickler vorab definiert; der Agent kann nur Typen aus diesem Katalog referenzieren. Ein A2UI‑Renderer, der einen unbekannten Typnamen erhält, ignoriert ihn.

CopilotKits „Open-JSON-UI“-Format ist mit A2UI kompatibel. Wenn Sie heute ein Spezifikationsformat für einen Komponenten‑Katalog auswählen, ist A2UI das mit der breitesten plattformübergreifenden Unterstützung.

**Ein Hinweis zur Stabilität**: A2UI befindet sich noch vor 1.0 – v0.9 beim letzten Check am 8. Mai 2026 – und hat zwischen Minor‑Versionen breaking changes eingeführt. Googles Kommunikation zum Fahrplan ist unregelmäßig, und einige Renderer (Lit, Flutter) hinken bei Spezifikations‑Updates hinterher. Planen Sie Zeit für Spezifikations‑Drift ein, wenn Sie heute darauf aufbauen. Für reine Web‑Anwendungsfälle scheint json‑render derzeit über umfangreichere Tool‑Unterstützung zu verfügen. Der langfristige Vorteil von A2UI liegt in der plattformübergreifenden Reichweite (Web, Flutter, SwiftUI, Android), die json‑render nicht bietet.

### MCP‑Apps

**GitHub**: [modelcontextprotocol](https://github.com/modelcontextprotocol) · Verwandt: [mcp-ui](https://github.com/MCP-UI-Org/mcp-ui)

MCP begann als Protokoll, um LLMs mit Werkzeugen und Daten zu verbinden. Die Apps‑Erweiterung ermöglicht es MCP‑Tools, nicht nur Daten, sondern interaktive UI‑Artefakte zurückzugeben: React‑Komponenten, Formulare, Dashboards, Karten.

Das Sicherheitsmodell ist bewusst streng: Alles wird in einem sandboxed iframe mit reduzierten Berechtigungen gerendert, Vorlagen sind vorab deklariert, sodass die Host‑App sie prüfen kann, und sämtliche Kommunikation erfolgt über auditierbares JSON‑RPC. Dieses Modell ist für Tool‑Provider exakt richtig — ein Shopify‑MCP‑Server kann ein Checkout‑Widget zurückgeben; ein Mapping‑Dienst kann eine einbettbare Karte liefern. Die Host‑App besitzt den Code des Widgets nicht und vertraut ihm nicht.

MCP Apps ist die geeignete Wahl, wenn die UI dem Tool‑Provider gehört und nicht Ihrer Anwendung. Für UI, die im Kontext Ihrer Anwendung läuft, sollten Sie Muster 1 oder 2 verwenden.

## Die JavaScript/TypeScript‑Frameworks

### CopilotKit

**GitHub**: [CopilotKit/CopilotKit](https://github.com/CopilotKit/CopilotKit) · Beispiele: [CopilotKit/generative-ui](https://github.com/CopilotKit/generative-ui)

CopilotKit ist das umfassendste Framework für agenten‑native Frontend‑Anwendungen. Es übernimmt den gesamten Lebenszyklus: Verbindung zu Agent‑Backends über AG‑UI, Verwaltung des bidirektionalen Konversationszustands, Rendering generativer UI‑Komponenten und Bereitstellung der gemeinsam genutzten Zustands‑Infrastruktur, die es Agenten und Nutzern ermöglicht, dieselben Daten zu lesen und zu verändern.

Das Drei‑Muster‑Modell lässt sich sauber auf die CopilotKit‑APIs abbilden:
- `useCopilotAction` mit einem `render`‑Callback → Muster 1
- A2UI/Open-JSON-UI Rendering → Muster 2
- `OpenGenerativeUI` sandboxed‑Artefakte → Muster 3

Das wichtige CopilotKit‑Feature, das zu wenig diskutiert wird, ist **gemeinsamer Zustand und Human‑in‑the‑Loop**: Der Agent kann Anwendungszustand lesen und schreiben, der Nutzer kann ihn lesen und schreiben, und Änderungen fließen bidirektional. Genau das lässt Copilot‑artige Oberflächen wie eine echte Zusammenarbeit wirken, anstatt nur ein Chat‑Fenster, das an ein Produkt geheftet ist.

### Vercel AI SDK

**GitHub**: [vercel/ai](https://github.com/vercel/ai) · Docs: [ai-sdk.dev](https://ai-sdk.dev/)

Das Vercel AI SDK ist die de‑facto TypeScript‑Grundlage für KI‑Anwendungen. Für generative UI im Besonderen:

**`useObject`** streamt ein strukturiertes JSON‑Objekt vom Server, während es erzeugt wird. Sie definieren ein Zod‑Schema; das SDK parsed das Teil‑JSON und löst Re‑Renders aus, sobald Felder ankommen. Das ist der unkomplizierteste Weg zu Muster 2 in einer Next.js‑App.

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

**`useChat` mit Tool‑Handlern** → Muster 1. Das Modell ruft Werkzeuge auf; Sie ordnen Werkzeugnamen Komponenten zu.

**AI Elements** ([elements.ai-sdk.dev](https://elements.ai-sdk.dev/)) stellt gebrauchsfertige UI‑Primitiven bereit, die Sie mit dem SDK kombinieren können.

**Ein Hinweis zur verwirrenden Entwicklung**: Im Oktober 2024 kündigte Vercel in [GitHub Discussion #3251](https://github.com/vercel/ai/discussions/3251) an, dass das AI‑SDK‑RSC — das React‑Server‑Components‑Streaming‑Muster, das im SDK 3.0 als zentrale „Generative UI“-Funktion beworben wurde — auf unbestimmte Zeit pausiert wurde, weil „mehrere langjährige Einschränkungen“ ohne absehbare Kurzzeitlösung bestehen. Teams, die ihre Produktstrategie auf RSC‑Streaming aufgebaut hatten, wurden dadurch überrascht. Die `generateObject`/`streamObject`‑APIs wurden später ebenfalls in SDK 6.0 veraltet. Die empfohlene Migration vom AI‑SDK‑RSC ist das oben gezeigte `useObject`‑Muster oder `json‑render` für katalogbasierte Generierung.

### assistant‑ui

**GitHub**: [assistant-ui/assistant-ui](https://github.com/assistant-ui/assistant-ui)

assistant-ui ist ein Set aus zusammensetzbaren React‑Primitiven zum Aufbau von Chat‑Interfaces in Produktionsqualität. Es ist die richtige Wahl, wenn Sie ein ausgereiftes Chat‑UX benötigen — Nachrichtenblasen, gestreamte Tokens, Kopier‑/Bearbeitungs‑/Neugenerierungs‑Aktionen, Denk‑Zustände — und gleichzeitig Ihr eigenes Backend sowie Ihre eigene Tool‑Darstellung einbinden wollen.

Es lässt sich problemlos mit jedem Backend kombinieren (OpenAI, Anthropic, lokale Modelle, benutzerdefinierte Endpunkte) und übernimmt die Darstellung von Tool‑Aufrufen über ein vertrautes Slot‑/Render‑Prop‑Modell.

### json-render

**GitHub**: [vercel-labs/json-render](https://github.com/vercel-labs/json-render) · Docs: [json-render.dev](https://json-render.dev/)

json-render setzt Pattern 2 mit einem meinungsstarken, alles‑inklusive‑Ansatz um. Sie erhalten einen vorgefertigten Komponenten‑Katalog (shadcn/ui‑Komponenten mit Zod‑Schemas), einen Renderer und einen engen Generierungs‑Loop, bei dem das Modell durch das Schema an den Katalog gebunden ist.

Die Unterscheidungsmerkmale:
- **Mehrziel‑Rendering**: dieselbe JSON‑Spezifikation kann zu einer React‑Web‑App, einer React‑Native‑Mobile‑App, einem PDF, einer HTML‑E‑Mail oder einem Remotion‑Video gerendert werden. Das ist für Berichte wirklich nützlich.
- **Progressives Rendering**: Komponenten erscheinen, sobald das Modell sie streamt, nicht erst, nachdem die komplette Spezifikation eingetroffen ist.
- **Strenge Schema‑Beschränkungen**: Der Katalog ist so gestaltet, dass das Modell keine gültigen, aber unbekannten Komponententypen halluzinieren kann.

Wenn Sie ein Dashboard‑ oder Berichtsgenerierungs‑Feature bauen und die Infrastruktur für einen eigenen Katalog überspringen wollen, ist **json‑render** der schnellste Weg für Web‑Apps.

**Zum Momentum**: json‑render wurde Anfang 2026 von Vercel Labs gestartet und hat schnell die Aufmerksamkeit von Web‑Entwicklern gewonnen, weil es sofort in üblichen React/Next.js‑Projekten einsetzbar ist. Trotzdem befindet sich json‑render noch in der Vor‑1.0‑Phase und die Beziehung zu A2UI wird noch geklärt – Vercel hat bereits A2UI‑kompatible Ausgaben ausprobiert, sodass eine Konvergenz möglich ist. Für plattformübergreifende Szenarien (native Mobile, mehrere Frameworks) ist A2UI die langfristig bessere Wahl.

### Hashbrown

**GitHub**: [liveloveapp/hashbrown](../https://github.com/liveloveapp/hashbrown)

Hashbrown verfolgt einen besonderen Ansatz: Anstatt eine separate KI‑Schnittstellenschicht aufzubauen, bettet es die Auswahl von KI‑Komponenten direkt in Ihre bestehende React‑ oder Angular‑App ein. Sie stellen dem LLM die Komponenten Ihrer Anwendung zur Verfügung; das LLM entscheidet, welche davon gerendert werden und kann clientseitige Werkzeuge aufrufen.

Das ist das passende Werkzeug, wenn Sie Intelligenz in Produktoberflächen einbringen wollen, die kein „Chat“ sind – etwa eine Produktseite, deren Layout sich dynamisch anpasst, ein Einstellungs‑Panel, das die richtigen Optionen hervorhebt, oder ein Workflow‑Editor, der den nächsten Schritt vorschlägt.

### OpenUI

**GitHub**: [thesysdev/openui](https://github.com/thesysdev/openui) · Docs: [openui.com](https://www.openui.com/)

OpenUI ersetzt JSON durch ein zeilenorientiertes, code‑ähnliches Format („OpenUI Lang“), das für progressives Rendering und Token‑Effizienz konzipiert ist. Die Behauptung lautet, dass es bei komplexen Layouts etwa 67 % weniger Tokens verbraucht als das entsprechende JSON.

Der Kompromiss liegt in der Reife des Ökosystems – OpenUI ist neuer und das Tooling ist dünner als bei JSON‑basierten Ansätzen. Aber wenn Token‑Kosten ein relevanter Faktor sind und Sie komplexe Layouts häufig generieren, ist die Format‑Effizienz tatsächlich spürbar.

### Tambo

**GitHub**: [tambo-ai/tambo](https://github.com/tambo-ai/tambo)

Tambo konzentriert sich auf zustandsbehaftete Komponenten­auswahl: Die KI wählt Komponenten aus und kann über clientseitige Werkzeuge mit ihnen interagieren, wobei der Komponenten‑Zustand über die gesamte Unterhaltung hinweg erhalten bleibt. Geeignet für Anwendungsfälle, bei denen UI‑Elemente über mehrere Runden hinweg bestehen bleiben – etwa ein Filter‑Komponent, den der Nutzer anpasst, während die KI weiterhin über die gefilterten Daten nachdenkt.

## Die Python‑Ebene

Das Python‑Ökosystem geht AI‑Schnittstellen anders an. Diese Werkzeuge sind für ML‑Modelldemos, Daten‑Applikationen und interne Tools optimiert – nicht für produktive Verbraucher‑Apps mit agentengesteuerter Layout‑Zusammensetzung.

Das ist kein Vorwurf. Für die passenden Anwendungsfälle sind Gradio und Streamlit die einzigen Werkzeuge, die Sie benötigen.

### Gradio

**GitHub**: [gradio-app/gradio](https://github.com/gradio-app/gradio) · PyPI: `gradio`

Der Kernnutzen von Gradio: Sie schreiben eine Python‑Funktion; Gradio verpackt sie in eine Web‑UI. Die `Interface`‑Klasse besteht aus 3 Zeilen für einen Bildklassifikator. `ChatInterface` benötigt 10 Zeilen für einen Chatbot. `Blocks` gibt Ihnen feinkörnige Layout‑Kontrolle, wenn Sie sie benötigen.

Das „generative UI“ in Gradio wird vom Python‑Entwickler definiert, nicht vom Modell. Die Sichtbarkeit und Konfiguration von Komponenten kann dynamisch anhand von Modellausgaben geändert werden, aber der Komponenten‑Katalog ist statisch – Sie bitten das Modell nicht, Layouts zu komponieren.

Gradio ist der Standard für HuggingFace Spaces und das ML‑Demo‑Ökosystem. Es hat Millionen monatlicher Downloads und treibt einen großen Teil der KI‑Demo‑Landschaft an.

**Greifen Sie zu Gradio, wenn**: Sie ein Python‑Entwickler sind, der ein ML‑Modell‑Demo, einen Forschung‑Prototyp oder ein internes Tool erstellt, und Sie JavaScript nicht berühren wollen.

### Streamlit

**GitHub**: [streamlit/streamlit](https://github.com/streamlit/streamlit)

Das Modell von Streamlit ist stärker vordefiniert: Ein Python‑Skript wird bei jeder Interaktion von Anfang bis Ende ausgeführt. Sie rufen `st.chat_message()`, `st.dataframe()`, `st.plotly_chart()` auf. Das Framework übernimmt das Layout.

Das Vollskript‑Neuausführungs‑Modell wirkt ineffizient, erweist sich aber überraschend ergonomisch für KI‑Chatbots, die den Gesprächsverlauf akkumulieren – das gesamte Skript wird neu gestartet, der Chat‑Verlauf befindet sich im Session‑State, und die Ausgabe ist deterministisch. Streamlit bietet jetzt erstklassige Unterstützung für die meisten großen LLM‑Anbieter und integriert sich nativ in Snowflake Cortex.

**Reach for Streamlit when**: you’re building an AI‑powered data app, internal reporting tool, or ML‑backed dashboard in Python and want the simplest possible deployment path.

### LangChain and Haystack

These are backend orchestration frameworks, not UI frameworks. They appear in any honest generative UI stack map because they’re typically the layer where structured outputs get generated before being sent to a frontend.

**LangChain** ([langchain-ai/langchain](https://github.com/langchain-ai/langchain)): `.with_structured_output()` auf jedem LLM liefert Pydantic‑geprüfte JSON‑Generierung. Der `@tool`‑Decorator mit automatischer Schema‑Erzeugung ist der sauberste Weg, um zu definieren, welche Werkzeuge das Modell aufrufen darf. LangChain leitet strukturierte Ergebnisse an die von Ihnen genutzte Frontend‑Schicht weiter.

**Haystack** ([deepset-ai/haystack](https://github.com/deepset-ai/haystack)): modulare Pipeline‑Architektur mit starkem RAG‑Support. Hayhooks verpackt Haystack‑Pipelines als HTTP‑Endpoints — einschließlich MCP‑kompatibler Endpunkte. Wenn Ihre generative UI einen Retrieval‑Rückgrat benötigt, übernimmt die Pipeline‑Architektur von Haystack das sauber.

Keines der beiden Frameworks besitzt die UI‑Schicht. Sie erzeugen die Daten, die Ihr Frontend (Pattern 1, 2 oder 3) rendert.

## Funktionsreferenz

Verwenden Sie den obigen Katalog als Orientierung, nicht als Einkaufsliste. Der Stack reduziert sich in der Regel auf eine Auswahl pro Schicht.

| Bedarf | Hier starten |
|------|------------|
| Agent‑zu‑Frontend‑Ereignis‑Stream | [AG-UI](https://github.com/ag-ui-protocol/ag-ui) |
| Deklarative UI‑Payload über eine Vertrauensgrenze hinweg | [A2UI](https://github.com/google/A2UI) oder [MCP Apps](https://github.com/MCP-UI-Org/mcp-ui) |
| Vom Anwendungsteam verwaltete Chat‑/Tool‑Darstellung | [Vercel AI SDK](https://github.com/vercel/ai), [assistant‑ui](https://github.com/assistant-ui/assistant-ui) oder [CopilotKit](https://github.com/CopilotKit/CopilotKit) |
| Katalog‑basierte Dashboards, Reports und Formulare | [json‑render](https://github.com/vercel-labs/json-render), [Hashbrown](https://github.com/liveloveapp/hashbrown), [OpenUI](https://github.com/thesysdev/openui) oder [Tambo](https://github.com/tambo-ai/tambo) |
| Sandgeboxte visuelle Artefakte | [OpenGenerativeUI](https://github.com/CopilotKit/OpenGenerativeUI) |
| Python‑Demos und Daten‑Apps | [Gradio](https://github.com/gradio-app/gradio) oder [Streamlit](https://github.com/streamlit/streamlit) |

---

## Ecosystem‑Geschwindigkeit und instabiler Untergrund

Dieser Bereich entwickelt sich rasant, und mehrere Projekte haben zusammen mit ihrem Code verwirrende Mitteilungen veröffentlicht. Zuletzt geprüft am 8. Mai 2026; betrachte die Projekt‑Status‑Hinweise hier als einen mit Zeitstempel versehenen Überblick, nicht als endgültiges Urteil.

**Vercel AI SDK RSC** war das Vorzeige‑Feature für Generative UI, als SDK 3.0 veröffentlicht wurde. Vercel hat die Weiterentwicklung im Oktober 2024 pausiert ([Discussion #3251](https://github.com/vercel/ai/discussions/3251)) und dabei architektonische Beschränkungen bei React Server Components genannt, für die es keine kurzfristige Lösung gab. Teams, die darauf aufgebaut hatten, waren verständlicherweise frustriert. Es steht noch in der Dokumentation, wird aber nicht mehr empfohlen; stattdessen sollte `useObject` verwendet werden.

**json-render** (Vercel Labs) ist die neue Richtung — eine katalogbasierte, framework‑agnostische Alternative, die die Kopplungsprobleme mit RSC umgeht. Das Projekt befindet sich noch vor Version 1.0 und scheint bei React‑/Web‑Entwicklern starkes frühes Interesse zu wecken. Der wahrscheinliche Grund für die bessere Entwickler‑Erfahrung: json-render lässt sich sofort in einem Standard‑React/Next.js‑Projekt einsetzen, während der plattformübergreifende Ansatz von A2UI zusätzlichen Setup‑Aufwand verursacht. Wie sich das entwickelt, wenn beide Spezifikationen reifen, ist derzeit wirklich unklar. Vercel hat die Kompatibilität von A2UI in json-render sondiert, was auf eine mögliche Konvergenz hindeutet.

**A2UI** (Google) befindet sich noch vor Version 1.0 (v0.9 beim letzten Check) und weist zwischen Minor‑Releases breaking changes sowie inkonsistente Google‑Kommunikation zum Fahrplan auf. Es ist die richtige Wahl für plattformübergreifende Reichweite (Web + Flutter + SwiftUI), die json-render nicht abdeckt, und es hat substanzielle Unternehmensunterstützung. Für reine Web‑Projekte ist die Entwickler‑Erfahrung derzeit noch rauer.

**AG-UI** (CopilotKit) ist ebenfalls vor Version 1.0. Die häufigste Verwirrung: Der Name lässt vermuten, es handle sich um ein UI‑Framework. Das ist es nicht — es ist ein Transport‑Protokoll. AG-UI definiert, wie Ereignisse zwischen Agent‑Backends und Ihrem Frontend fließen; was Sie als Reaktion rendern, bleibt Ihre Entscheidung. Dieses mentale Modell ist solide und wird breit angenommen, aber die pre‑1.0‑Spezifikation bedeutet, dass Randfälle noch ausgearbeitet werden.

Der praktische Schluss: **Alle wichtigen Akteure hier befinden sich noch vor Version 1.0**. Planen Sie API‑Änderungen ein. Die Muster — tool‑to‑component, Katalog‑Komposition, sandboxed‑Generation — sind stabil genug, um darauf aufzubauen. Die konkreten Protokoll‑Entscheidungen sind es nicht.

---

## Komponenten‑Katalog‑Design: Die eigentliche Ingenieursarbeit

Der Großteil der interessanten Komplexität in Muster 2 liegt nicht im Renderer — sondern im Katalog.

Der Katalog ist eine **Produktentscheidung, kodiert als Schema**. Er beantwortet: Welche UI‑Objekte sind in diesem Fachgebiet sinnvoll? Nicht „welche React‑Komponenten existieren?“, sondern „was muss ein Nutzer in diesem Kontext tatsächlich sehen und bedienen?“.

**Der zu feinkörnige Fehlermodus**: Sie stellen `Row`, `Column`, `Text`, `Button`, `Icon` bereit. Jetzt muss das Modell ein Frontend‑Ingenieur sein. Es erzeugt mittelmäßige Layouts, die nicht zu Ihrem Design‑System passen, vernachlässigt leere Zustände, produziert nicht‑barrierefreie Markup und ändert sein Vorgehen von Antwort zu Antwort, weil im Katalog nichts die Ausgabe an die visuelle Sprache Ihres Produkts bindet.

**Der zu grobkörnige Fehlermodus**: Sie stellen `WeatherCard`, `FlightCard`, `HotelCard` bereit. Das Modell kann sich nicht anpassen, wenn der Nutzer etwas verlangt, das nicht auf eine vorgefertigte Karte abgebildet werden kann. Es fällt zurück auf reinen Text.

**Der nützliche Mittelweg**: domänenspezifische Komponenten mit eingeschränkten Slots.

Ein Katalog für eine Reise‑App könnte so aussehen:

```
TripSummary         — itinerary at a glance
FlightOptionList    — selectable flight options with pricing
HotelComparison     — side-by-side hotel cards
TravelerForm        — collect traveler details
PolicyNotice        — regulatory/fare rule callout
BookingConfirmation — final confirmation with action button
```

Ein Katalog für eine Finanz‑App könnte so aussehen:

```
PortfolioSnapshot   — key positions and P&L
TransactionTable    — filterable, paginated transactions
RiskBreakdown       — allocation and volatility metrics
ScenarioComparison  — side-by-side scenario modeling
ApprovalGate        — action requiring human confirmation
```

Der Katalog bildet das Vokabular Ihres Produkts ab. Er kodiert Ihre UX‑Entscheidungen, Ihre Barrierefrei‑Anforderungen, das Verhalten bei leeren Zuständen und gefährliche Aktionsmuster im Komponenten‑Code. Das Modell darf diese Bausteine anordnen. Sie bestimmen weiterhin, wie jeder Baustein aussieht und welche Aktionen er ausführen darf.

**Schema‑Design‑Regeln, die Halluzinationen reduzieren**:

1. Halten Sie Enum‑Werte kurz und eindeutig. `"type": "bar_chart"` statt `"type": "data-visualization-bar-type-vertical"`.
2. Machen Sie ungültige Zusammensetzungen unmöglich. Wenn ein `PolicyNotice` nur am Ende eines Layouts erscheinen darf, platzieren Sie ihn nicht auf derselben Schema‑Ebene wie Elemente, die überall vorkommen können.
3. Verwenden Sie Pflichtfelder großzügig. Ein optionales Feld ist ein Feld, das das Modell weglassen könnte, und Ihr Renderer muss dann mit `null` umgehen können.
4. Testen Sie den Katalog mit realen Eingabeaufforderungen, bevor Sie ihn ausliefern. Speichern Sie die generierten Spezifikationen; prüfen Sie sie auf Schema‑Verstöße, halluzinierte Feldwerte und Zusammensetzungen, die technisch zulässig, aber semantisch falsch sind.

---

## Häufige Fallen

**Falle: gültiges JSON als sicheres Verhalten zu betrachten.** Die Schema‑Validierung prüft nur die Struktur. Sie sagt nichts darüber aus, ob die an einen Button gebundene Aktion zu seiner Beschriftung passt, ob ein Gesamtsumme zu den zugrunde liegenden Daten passt oder ob eine UI‑Komponente etwas tut, das der Nutzer nicht erwartet. Generierte UI‑Spezifikationen benötigen eine semantische Prüfung, nicht nur eine Schema‑Validierung. Mindestens sollten destruktive Aktionen eine Bestätigungs‑Komponente erfordern, und die Beschriftungen dieser Komponenten sollten gegen die Aktionen, die sie auslösen, getestet werden.

**Trap: exposing design primitives instead of product primitives.** Wenn das Modell entscheiden muss, ob 16 px oder 20 px Abstand verwendet werden, haben Sie die falsche Abstraktionsebene gewählt. Domänen‑Komponenten sollten das Produkt‑Feeling kodieren. Das Modell sollte Verhalten zusammensetzen, nicht Präsentationsdetails verwalten.

**Trap: using generative UI where static UI will do.** Wenn die Struktur dessen, was Sie anzeigen wollen, zur Entwicklungszeit bekannt ist — und das ist meistens der Fall — ist Muster 1 mit vorgefertigten Komponenten schneller, sicherer und konsistenter. Generative UI rechtfertigt ihre Komplexität nur, wenn die Struktur tatsächlich aufgrund von Daten‑ oder Aufgabenkontext variiert.

**Trap: skipping accessibility.** LLMs halluzinieren WCAG‑Verstöße. Sie geben `role="region"` bei interaktiven Elementen aus, erzeugen Formulare ohne Beschriftungen und produzieren Kontrastwerte, die WCAG AA nicht bestehen. Ihre Komponentenbibliothek mag vollständig barrierefrei sein; KI‑generierte Zusammensetzungen dieser Komponenten sind nicht automatisch barrierefrei. Testen Sie den gesamten Render‑Pfad, nicht nur die einzelnen Komponenten isoliert.

**Falle: Protokoll und Framework verwechseln.** AG‑UI ist kein Frontend‑Framework. A2UI ist keine React‑Bibliothek. Es handelt sich um Wire‑Formate und Ereignis‑Protokolle. Sie benötigen weiterhin ein Frontend‑Framework, um sie zu implementieren. CopilotKit implementiert AG‑UI und A2UI. `json-render` implementiert das A2UI/Open‑JSON‑UI‑Katalog‑Muster. Das sind unterschiedliche Schichten.

---

## Empfehlungen nach Anwendungsfall
---

**Hinzufügen eines Copiloten zu einer bestehenden SaaS‑App**: Beginnen Sie mit Muster 1 (Tool‑zu‑Komponente). Nutzen Sie das Vercel AI SDK `useChat` oder CopilotKit. Ordnen Sie Ihre Top‑5‑bis‑10‑Agenten‑Aktionen vorgefertigten Komponenten zu. Liefern Sie das aus, messen Sie die Ergebnisse und erweitern Sie den Katalog nur dann, wenn die Nutzer nachweislich komplexere Zusammensetzungen benötigen.

**Dashboard‑Generierung aus natürlicher Sprache**: Verwenden Sie Muster 2 mit json‑render oder einem eigenen A2UI‑Katalog. Definieren Sie einen Katalog von 8‑15 Komponententypen, die Ihre Diagramm‑Typen, Metrik‑Karten und Tabellen‑Varianten abdecken. Geben Sie das Schema an das Modell weiter; lassen Sie es das Layout zusammenstellen. Implementieren Sie eine Validierung, die unbekannte Typen abfängt, bevor sie den Renderer erreichen.

**Multi‑Agent‑Frontend**: Nutzen Sie CopilotKit mit AG‑UI. Der Ereignis‑Stream verarbeitet Echtzeit‑Streaming über mehrere Agent‑Backends; gemeinsam genutzter Zustand übernimmt die Übergabe zwischen Agenten; das HITL‑Muster sorgt für Genehmigungsschranken.

**Einbettung in ChatGPT oder einen anderen MCP‑Host**: Verwenden Sie MCP‑Apps. Definieren Sie Ihr Tool als Datentool, das abruft und schlussfolgert, und ein separates Render‑Tool, das ein Widget anfordert. Halten Sie die Geschäftslogik aus der Widget‑Vorlage heraus.

**ML‑Modell‑Demos und Daten‑Apps (Python‑Team)**: Gradio für Demos und HuggingFace Spaces. Streamlit für Daten‑Apps mit komplexerer Interaktion. Beide benötigen kein JavaScript.

**Visuelle Artefakte, Simulationen, Diagramme**: Nutzen Sie Muster 3 (OpenGenerativeUI oder Äquivalent). Setzen Sie eine strenge iframe‑CSP durch. Behandeln Sie die Ausgabe aus Sicherheitsperspektive wie unzuverlässigen Benutzergenerator‑Content.

---

Die Frameworks reifen rasch. Die Protokollkonvergenz (AG‑UI für Streaming, A2UI/Open‑JSON‑UI für Katalog‑Spezifikationen) ist noch im Gange, aber die Form ist bereits klar genug, um darauf aufzubauen.

Die engineering‑relevanten Herausforderungen sind derzeit nicht die Auswahl des Frameworks. Es geht um das Katalogdesign – also zu bestimmen, was das Modell überhaupt ausgeben darf, was mehr Produktklarheit erfordert als technisches Können. Es geht um semantische Validierung – zu prüfen, dass die generierte UI das tut, was sie behauptet, und nicht nur das Schema besteht. Und es geht um die Barrierefreiheitslücke – Kataloge zu bauen, bei denen jede Komponente und jede Zusammensetzung von Komponenten die Barrierefreiheitsanforderungen erfüllt, die man an handgeschriebene UI stellt.

Das Modell tut, was Sie ihm sagen, innerhalb der Grammatik, die Sie ihm vorgeben. Gestalten Sie die Grammatik bewusst.
````
