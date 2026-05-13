# Translation Candidate
- Slug: llm-generative-ui-landscape
- Locale: de
- Model: openrouter/qwen/qwen3-32b:nitro
- Target: src/content/posts/2026-05-06--llm-generative-ui-landscape/de/index.mdx
- Validation: passed
- Runtime seconds: 49.45
- Input tokens: 17915
- Output tokens: 20830
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- Estimated cost: $0.006432
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
title: ''
subTitle: ''
date: '2026-05-06'
modified: '2026-05-06'
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
social_image: ../desktop-social.webp
cover_full_width: ../wide.webp
cover_mobile: ../square.webp
cover_icon: ../square.webp
---
Chat war das Lernrad.  

Die erste Generation von LLM-Anwendungen sah meistens aus wie ein Textfeld, das an ein Produkt angeheftet war. Das Modell lieferte Prosa. Das Frontend renderte Markdown. Wenn der Benutzer eine Aktion ausführen musste, beschrieb der Assistent den Button, den der Benutzer woanders klicken sollte.  

Das war für Demos in Ordnung. Es ist nicht der Weg, den dies einschlägt.  

Der nächste sinnvolle Schritt ist **generative UI**: Das Modell antwortet nicht nur mit Text; es hilft dabei, zu entscheiden, welche Benutzeroberfläche der Benutzer gerade benötigt. Manchmal bedeutet das, ein Tool aufzurufen und eine vorgefertigte Karte zu rendern. Manchmal bedeutet das, einen bekannten Workflow-Komponenten mit frischen Daten zu füllen. Manchmal bedeutet das, eine temporäre Dashboard, Formular, Vergleichstabelle, Diagramm oder interaktives Widget zu erstellen.  

Leider ist „generative UI“ zu einem dieser Begriffe geworden, die vor dem Frühstück fünf verschiedene Dinge bedeuten.  

Menschen verwenden ihn, um zu beschreiben:

- ein Modell, das aus developerdefinierten React-Komponenten auswählt  
- eine JSON-Spezifikation, die die Frontend-Software in native Komponenten rendert  
- eine iframe-basierte App, die von einem MCP-Tool zurückgegeben wird  
- eine Chat-UI-Bibliothek, die Tool-Aufrufe unterstützt  
- ein Agent-Protokoll, das Zustand zwischen Backend und Frontend streamt  
- ein Design-time-Code-Generator wie v0, Lovable, Bolt oder Cursor  
- ein Modell, das wörtlich HTML, SVG, Canvas oder React zur Laufzeit schreibt  

Diese Aspekte hängen zusammen, sind aber nicht dieselbe Schicht. Wenn man sie zusammenwirft, wird jede Architektur-Diskussion zu einer unübersichtlichen Masse.  

Dies ist die Karte, die ich mir gewünscht hätte, als ich begann, den aktuellen Stack zu vergleichen.  

![Eine Schichten-karte des LLM-generativen UI-Landschafts](../landscape-map.webp)  

## Der Kernfehler  

Der größte Fehler ist, „generative UI“ als eine Technologieentscheidung zu betrachten.

Es ist besser, das Problem in vier Schichten zu trennen:

1. **Produkt-Hülle**: Das, mit dem die Benutzer interagieren. Das könnte ein Chat, ein Sidebar-Copilot, ein Dashboard, ein Workflow-Baustein, ein IDE-Panee, die ChatGPT-App, ein Mobilbildschirm oder eine Support-Konsole sein.
2. **UI-Zusammensetzungsmuster**: Die Grammatik, die der Modell verwendet. Es könnte Tool-Aufrufe, JSON, A2UI, json-render, OpenUI Lang, Hashbrown-Komponentenauswahl oder gesicherten HTML sein.
3. **Laufzeit und Transport**: Wie Nachrichten, Tool-Aufrufe, Zustandsdeltas, Benutzeraktionen und UI-Objekte zwischen dem Agenten und der Frontend bewegen. AG-UI, MCP Apps, Apps SDK, A2A, SSE, WebSockets und einfacher HTTP gehören hierher.
4. **Agenten- und Tool-Backend**: LangGraph, Google ADK, CrewAI, Mastra, LlamaIndex, Pydantic AI, Agno, OpenAI Agents SDK, benutzerdefinierte Funktionen, Datenbanken, Retrieval und all der langweilige Geschäftslogik, der dennoch korrekt sein muss.

Sobald du die Schichten trennst, wird das Ökosystem viel weniger mystisch.

[AG-UI](https://github.com/ag-ui-protocol/ag-ui) ist nicht wirklich ein Konkurrent von [A2UI](https://github.com/google/A2UI). AG-UI ist ein Ereignisprotokoll für Agent-zu-Anwendung-Interaktion. A2UI ist ein deklarativer UI-Format, den der Agent senden kann. Du kannst A2UI über AG-UI legen. Du kannst auch benutzerdefinierte Tool-generierte Komponenten über AG-UI legen.

[json-render](https://github.com/vercel-labs/json-render) ist kein Chat-Produkt. Es ist ein Komponentenkatalog und Renderer-Architektur: Definiere die Komponenten, die das Modell verwenden darf, lasse das Modell einen gültigen JSON-Baum ausgeben und rendere diesen Baum sicher.

[CopilotKit](https://github.com/CopilotKit/CopilotKit) ist nicht nur ein Chat-Bläschen. Es ist ein Frontend-Stack für agentennahe Apps: Chat-Benutzeroberfläche, generative UI, gemeinsamer Zustand, Frontend-Tools und Mensch-im-Teilfluss-Prozesse.

[OpenAI Apps SDK](https://developers.openai.com/apps-sdk) und [MCP Apps](https://github.com/MCP-UI-Org/mcp-ui) sind keine „mache mein React-App dynamisch“-Tools. Sie sind Host-Integration-Modelle für die Darstellung von Widgets innerhalb von ChatGPT oder anderen MCP-kompatiblen Hosts.  

Die Bezeichnungen sind verwirrend, weil der Bereich jung ist. Die Schichten sind der Teil, der nützlich bleibt.  

## Das Kontroll-Spektrum  

Generative UI ist eine Gewichtung zwischen **Entwicklerkontrolle** und **Agentenfreiheit**.  

Zu viel Kontrolle und der Assistent fühlt sich wie eine Befehlsleiste in Kostümierung an. Zu viel Freiheit und das Modell erfindet seltsame Layouts, vage Buttons, verwackelte visuelle Hierarchien, unmögliche Zustände und Sicherheitsprobleme mit einem selbstsicheren Grinsen.  

Der Trick besteht darin, die kleinste Menge an Freiheit zu wählen, die das Benutzerproblem löst.

![Ein Spektrum von toolbasiertem Rendering bis hin zu offenen generierten HTML](../control-spectrum.webp)

Ich denke über das Spektrum so nach:  

**Tool-basiertes Komponenten-Rendering** ist die sicherste Standardvorgehensweise. Das Modell ruft `get_weather`, `search_products`, `compare_plans` oder `draft_invoice` auf. Die App ordnet das Ergebnis einer bereits vorhandenen Komponente zu: `WeatherCard`, `ProductGrid`, `PlanComparison`, `InvoiceReview`. Das Modell entscheidet *wann* die Benutzeroberfläche nützlich ist. Entwickler behalten weiterhin die Kontrolle über Layout, Stil, Barrierefreiheit, Ladezustände, leere Zustände und gefährliche Aktionen.  

Dies ist das Muster, das im [Leitfaden für generative Benutzeroberflächen des Vercel AI SDKs](https://ai-sdk.dev/docs/ai-sdk-ui/generative-user-interfaces) beschrieben wird: Das Modell ruft ein Tool auf, das Tool gibt Daten zurück, und die Benutzeroberfläche rendert eine Komponente basierend auf dem Ergebnis. Es ist auch das Konzept hinter vielen CopilotKit- und assistant-ui-Implementierungen.  

**Deklarative Komponentenkataloge** geben dem Modell mehr Freiraum. Anstelle einer einzelnen Komponente komponiert das Modell einen Baum aus erlaubten Teilen. Ein Katalog könnte `Metric`, `Table`, `Chart`, `FilterBar`, `ApprovalPanel` und `Timeline` enthalten. Das Modell kann ein Dashboard oder einen Workflow-Schritt zusammenstellen, aber keine beliebigen Code-Ausführungen durchführen. Dies ist der Bereich, in dem [A2UI](https://github.com/google/A2UI), [json-render](https://github.com/vercel-labs/json-render), [Hashbrown](https://github.com/liveloveapp/hashbrown) und [OpenUI](https://github.com/thesysdev/openui) angesiedelt sind.  

**Mini-Apps in Iframes** sind sinnvoll, wenn die Benutzeroberfläche reicher sein muss als ein Komponentenbaum oder wenn ein externer Tool-Anbieter die Erfahrung steuert. MCP Apps und OpenAI Apps SDK erlauben es einem Tool, strukturierte Daten plus eine Widget-Ressource zurückzugeben, die der Host in einem Iframe rendert. Dies ist mächtig für Karten, Einkaufswagen, Buchungsflows, Diagramme und externe Produktoberflächen. Es schafft jedoch auch eine härtere Grenze zwischen der Host-App und dem Widget.

**Offene Generierung** ist das extreme Ende: Der Agent generiert HTML, SVG, Canvas, WebGL oder andere code-ähnliche Artefakte in einer Sandbox. [OpenGenerativeUI](https://github.com/CopilotKit/OpenGenerativeUI) ist das beste aktuelle Beispiel: Der Agent kann Algorithmenvisualisierungen, 3D-Szenen, Diagramme und Simulationen in gesicherten Iframes erzeugen. Dies ist hervorragend für einmalige visuelle Erklärungen geeignet. Für einen Unternehmensgenehmigungsprozess würde ich hier nicht anfangen.

Es hilft, den entscheidenden Unterschied hier zu benennen: **Ifrahm-HTML** (das Modell schreibt Code in eine Sandbox) vs. **JSON-Katalog** (das Modell generiert eine strukturierte Spezifikation und Ihr Renderer bildet sie auf vordefinierte Komponenten ab). Diese klingen verwandt, tragen aber sehr unterschiedliche Risiken und Komplexitätsprofile. Ifrahm-HTML ist maximal ausdrucksstark; die Ifrahm-Grenze übernimmt die Sicherheitsarbeit. Der JSON-Katalog gibt dem Modell keine ausführbaren Freiheiten – es kann nur auf Komponententypen verweisen, die Sie im Voraus definiert haben. Die meisten Frameworks in diesem Bereich fallen klar in eine der beiden Kategorien.

**Jenseits der Sandbox**: Sehr aktuelle Demos deuten darauf hin, dass sich ein vierter Modus bildet – LLMs steuern spielartige oder immersive Erfahrungen, indem sie die visuelle Ausgabe direkter als jeder Komponentenkatalog zulässt. Projekte, die erkundbare 3D-Welten aus Prompts generieren, LLM-gesteuertes NPC-Verhalten zur Laufzeit und in-browser-Modellinferenz über WebGPU ([WebLLM](https://mlc.ai/web-llm/)) sind frühe Indikatoren. Es gibt noch keine stabilen Frameworks, um damit produktive Arbeit zu betreiben. Ich werde diese Richtung in einem separaten Artikel behandeln, sobald sich das ändert.

## Hochgradig abstrakte Komponenten vs. Granulare Komponenten

Dies ist die wichtigste Gestaltungsentscheidung.

Wenn Ihr Katalog zu granular ist, muss das Modell zum Frontend-Entwickler werden:

```tsx
Container
Row
Column
Text
Button
Icon
Spacer
Divider
```

Das sieht flexibel aus, aber das Modell muss nun Abstände, Hierarchie, Gruppierung, leere Zustände, Beschriftungen von Schaltflächen, Fehlerbehandlung und responsives Verhalten entscheiden. Sie haben außerdem den Prompt größer gemacht und die Ausgabe anfälliger für Fehler gemacht.

Wenn Ihr Katalog zu abstrakt ist, ist das Modell eingeschränkt:

```tsx
WeatherCard
StockCard
HotelCard
```

Das ist sicher, funktioniert aber nur für bekannte Szenarien. Das Modell kann keine Vergleichsmatrizen erstellen, fehlende Eingaben anfordern oder die Informationsarchitektur anpassen, wenn sich die Frage des Benutzers ändert.

Die nützliche Mitte besteht aus **Domänen-Komponenten mit eingeschränkten Slots**:

```tsx
SearchResults
ComparisonTable
MetricGroup
EditablePlan
ApprovalRequest
Timeline
DataCollectionForm
CheckoutReview
```

Diese Komponenten kodieren Produktstil und Geschäftsbeschränkungen. Das Modell entscheidet, *was angezeigt werden soll*, aber nicht jede CSS-Entscheidung.

Zum Beispiel benötigt ein Reiseagent nicht `div`, `span` und `button`. Es benötigt:

- `TripSummary`  
- `FlightOptionList`  
- `HotelComparison`  
- `TravelerForm`  
- `PolicyNotice`  
- `BookingConfirmation`  

Ein Finanzagent benötigt kein generisches Charting-Playground. Er benötigt:  

- `PortfolioSnapshot`  
- `TransactionTable`  
- `RiskBreakdown`  
- `ScenarioComparison`  
- `ApprovalGate`  

Der Katalog sollte sich wie Ihr Produkt anfühlen, nicht wie HTML.  

## Funktionsübersicht  

Diese Tabelle ist absichtlich subjektiv. Sie betrachtet jedes Projekt als Werkzeug in einem Stapel, nicht als Winner-takes-all-Plattform.

| Technologie | Schicht | Bestes Einsatzgebiet | UI-Modell | Streaming / Zustand | Hinweise und Beispiele |
| --- | --- | --- | --- | --- | --- |
| [AG-UI](https://github.com/ag-ui-protocol/ag-ui) | Runtime-Protokoll | Verbindung von Agent-Backends zu Frontend-Apps | Ereignisse für Nachrichten, Tools, Zustand, Aktivität, Unterbrechungen | Ja; Ereignisstrom plus Zustands Snapshots/Deltas | Verwenden Sie dies, wenn Sie eine Standard-Verbindung zwischen Agent und App benötigen. Es ergänzt MCP und A2A, ersetzt sie jedoch nicht. |
| [A2UI](https://github.com/google/A2UI) | Deklaratives UI-Protokoll | Plattformübergreifend, agentengenerierte native UI | JSON-Nutzlast, die Komponenten, Datenmodell und Aktualisierungen beschreibt | Für inkrementelle Aktualisierungen ausgelegt | Starke Wahl für entfernte Agenten und Vertrauensgrenzen. Frühe öffentliche Vorschau, aber konzeptionell sauber. |
| [json-render](https://github.com/vercel-labs/json-render) | Komponentenkatalog und Renderer | Erlaubt dem Modell, genehmigte Komponenten zu komponieren | JSON-Baum, eingeschränkt durch einen typisierten Katalog | Unterstützt progressives Rendern | Gutes Werkzeug für React, Vue, Svelte, Solid, React Native, E-Mail, PDF, Remotion, Terminal und mehr. |
| [CopilotKit](https://github.com/CopilotKit/CopilotKit) | Produkt-Hülle und Agent-UI-Framework | In-App-Copilots, geteilter Zustand, Frontend-Tools, HITL | Tool-Rendern, AG-UI, A2UI, MCP Apps-Muster | Ja | Eines der umfassendsten Stacks für "Agent-native Apps". Siehe [generative-ui Beispiele](https://github.com/CopilotKit/generative-ui). |
| [OpenGenerativeUI](https://github.com/CopilotKit/OpenGenerativeUI) | Offenes UI-Generierungsbeispiel | Visuelle Erklärungen, Diagramme, Simulationen, Charts | Agent generiert HTML/SVG/Canvas in isolierten iframes | Progressives visuelles Rendern | Verwenden Sie dies für dynamische Artefakte, bei denen ein fester Komponentenkatalog zu eingeschränkt ist. |
| [MCP Apps / mcp-ui](https://github.com/MCP-UI-Org/mcp-ui) | Host/widget-Standard | Tool-Anbieter, die interaktive UI über MCP zurückgeben | HTML-Ressource, verlinkt aus Tool-Metadaten | Host-Brücke und Widget-Aktionen | Am besten, wenn die UI einem Tool-Anbieter gehört oder iframe-Isolation benötigt. |
| [OpenAI Apps SDK](https://developers.openai.com/apps-sdk) | ChatGPT-App-Host-Integration | Erstellen von benutzerdefinierten ChatGPT-App-Widgets | MCP-Server-Tools plus iframe-UI-Komponenten | Tool-Eingabe/Ergebnis, Widget-Zustand, Folgenachrichten | Neue ChatGPT-Apps sollten MCP Apps-Felder und die `ui/*`-Brücke bevorzugen, mit `window.openai` für Kompatibilität/Erweiterungen. |
| [Vercel AI SDK UI](https://ai-sdk.dev/docs/ai-sdk-ui/generative-user-interfaces) | App-SDK und Chat-Zustand | Benutzerdefinierter App-Chat, Tool-Aufrufe, streamende Nachrichtenteile | Rendert Tool-Ergebnisse als React-Komponenten | Ja, über `useChat` und UI-Nachrichtenströme | Gute Grundlage, wenn Sie bereits die App besitzen und niedrigere Steuerung benötigen. Kombinieren Sie mit [AI Elements](https://elements.ai-sdk.dev/) für UI-Primitiven. |
| [assistant-ui](https://github.com/assistant-ui/assistant-ui) | React-Chat-Primitiven | Produktiver Chat-UX mit benutzerdefiniertem Rendern | Komponierbare Chat-Primitiven, Tool-Aufruf-Rendern, JSON als Komponenten | Ja | Stark, wenn Sie polierte Chat-Ergonomie benötigen, aber Ihren eigenen Backend verwenden möchten. |
| [LangGraph Generative UI](https://docs.langchain.com/langgraph-platform/generative-ui-react) | Agent-Plattform-Integration | UI-Komponenten mit Graph-Code kombinieren | Graph sendet benannte UI-Nachrichten, die von React-Komponenten gerendert werden | Ja, einschließlich benutzerdefinierter Stream-Ereignisse | Natürliche Passform für LangGraph-Implementierungen und graph-eigene UI-Komponenten. |
| [Hashbrown](https://github.com/liveloveapp/hashbrown) | Frontend-GenUI-Framework | React/Angular-Apps, die Komponenten und clientseitige Tools exponieren | LLM wählt und rendert erlaubte App-Komponenten | Unterstützt Streaming-Muster | Gut für Einbettung von Intelligenz direkt in Produktoberflächen, nicht nur Chat. |
| [OpenUI](https://github.com/thesysdev/openui) | Kompaktes UI-Sprache und Runtime | Streambare, modellgenerierte UI mit weniger Token als JSON | OpenUI Lang plus React Runtime und Komponentenbibliotheken | Für Token-Streaming ausgelegt | Interessant, wenn JSON-Verbreitung ein Flaschenhals wird. Noch jung, aber wertvoll im Auge zu behalten. |
| [Tambo](https://github.com/tambo-ai/tambo) | React-generatives UI-SDK | Komponentenauswahl, zustandsbehaftete Komponenten, clientseitige Tool-Ausführung | AI wählt Komponenten und interagiert mit clientseitigen Tools | Zustandsorientiert | Beliebte OSS React-Option, fokussiert auf automatische Komponentenorchestrierung. |
| [llm-ui](https://llm-ui.com/) | Ausgaberenderer | Glatter LLM-Textausgang mit benutzerdefinierten Inline-Komponenten | Parsiert Modellausgabestrings in React-Rendern | Glattes Token-Rendern | Nützlich für leichte benutzerdefinierte Komponenten innerhalb von Textströmen; kein vollständiges Agent-UI-Protokoll. |
| AI SDK RSC / React Server Components | Älteres Muster / Framework-Funktion | Servergerenderte Komponentenströme in Next.js | Modell/Tool-Fluss gibt servergerenderte UI zurück | Ja, aber frameworkspezifisch | Entwicklung pausiert im Oktober 2024 ([Diskussion #3251](https://github.com/vercel/ai/discussions/3251)); nicht der empfohlene Weg. Migrieren Sie zu `useObject` oder json-render. |

## Was für welches Produkt verwendet werden sollte

Hier ist die Empfehlungsmatrix, die ich tatsächlich mit einem Team verwenden würde.

**Sie fügen einem bestehenden SaaS-App einen Assistenten hinzu.**

Beginnen Sie mit Tool-zu-Komponenten-Rendern. Verwenden Sie [Vercel AI SDK UI](https://ai-sdk.dev/docs/ai-sdk-ui/generative-user-interfaces), [assistant-ui](https://github.com/assistant-ui/assistant-ui) oder [CopilotKit](https://github.com/CopilotKit/CopilotKit), abhängig davon, wie viel Agent-Zustand und Frontend-Tool-Integration Sie benötigen. Halten Sie den Katalog zunächst klein. Rendern Sie Produktkomponenten, in denen Sie bereits vertrauen.

**Sie bauen einen ernsthaften In-App-Copilot, der geteilten Zustand benötigt.**

Betrachten Sie genau CopilotKit plus AG-UI. Das wichtige Feature ist nicht „Chat“. Es ist geteilter Zustand und zweidirektionale Interaktion: Der Agent kann nach Eingaben fragen, UI rendern, den Zustand aktualisieren und zur Genehmigung pausieren.  

**Sie haben ferne Agenten, die UI über eine Grenze hinweg senden müssen.**  

Verwenden Sie A2UI oder ein A2UI-ähnliches deklaratives Protokoll. Der ganze Punkt ist, dass ein ferner Agent UI als Daten beschreiben kann, während der Host die Kontrolle über native Rendering, Sicherheit und Stil behält. Wenn Sie auch lebendige Agenten/App-Interaktion benötigen, führen Sie sie über AG-UI oder das von Ihrem Umfeld standardisierte Transportprotokoll aus.  

**Sie bauen in ChatGPT oder einem MCP-kompatiblen Host.**  

Verwenden Sie MCP Apps und den Apps SDK-Pfad. Die aktuellen Dokumentationen von OpenAI empfehlen den MCP Apps `ui/*`-Bridge für neue Arbeiten, während `window.openai` als Kompatibilitätsschicht und optionale Erweiterungsfläche bleibt. Kopieren Sie auch ihre Aufteilung zwischen Datenwerkzeugen und Renderwerkzeugen: Lassen Sie das Modell Daten abrufen und über sie nachdenken, bevor es eine Komponente rendert.  

**Sie benötigen natürlichsprachige Dashboards, Berichte oder Formulare in Ihrer eigenen App.**

Versuchen Sie json-render, Hashbrown oder OpenUI. Entscheidend ist der Katalog. Wenn Sie `LineChart`, `DataTable`, `MetricGroup`, `FilterControl` und `InsightCallout` bereitstellen, kann das Modell nützliche Berichte erstellen, ohne je in die Nähe beliebigen Codes zu kommen.

**Sie benötigen pädagogische, visuelle oder stark individuelle Artefakte.**

Verwenden Sie eine offene Sandbox wie OpenGenerativeUI. Lassen Sie das Modell SVG, Canvas, WebGL oder eigenständigen HTML-Code schreiben, behandeln Sie die Ausgabe jedoch wie unvertrauenswürdigen Benutzerinhalt. Isolieren Sie die Sandbox, begrenzen Sie ihre Größe, entfernen Sie Berechtigungen und halten Sie sie von privilegiertem App-Zustand fern.

**Sie benötigen hauptsächlich einen ästhetischeren Markdown-Stream mit einigen Inline-Funktionen.**

Überbauen Sie nicht. llm-ui oder assistant-ui-Rendering-Tools könnten ausreichen.

## Fehler, die ich vermeiden würde

**Mistake 1: Die Modell-Codegenerierung für Produktions-React in der Laufzeit zulassen.**  

Es gibt Ausnahmen, aber für Produkt-UI ist dies in der Regel die falsche Voreinstellung. Laufzeit-Codegenerierung ist schwer zu sichern, schwer zu testen, schwer zu themen und schwer zugänglich zu halten. Wenn das Modell die Aufgabe erledigen kann, indem es vertrauenswürdige Komponenten auswählt, dann tun Sie das.  

**Mistake 2: Design-Primitiven anstelle von Produkt-Primitiven preiszugeben.**  

Wenn Sie dem Modell `Row`, `Column`, `Text` und `Button` zur Verfügung stellen, fordern Sie es auf, zu Ihrem Designsystem zu werden. Es wird ein durchschnittliches werden. Geben Sie ihm höhere Produkt-Nomen.  

**Mistake 3: Denken, dass gültiges JSON eine sichere UI bedeutet.**  

Ein Payload kann eine Schema-Validierung bestehen und dennoch manipulativ oder gefährlich sein. Der Label kann „Rechnung ansehen“ sagen, während die Aktion das Konto archiviert. Behandeln Sie UI-Spezifikationen als Verhalten, nicht als Dekoration. Sie benötigen Richtlinientests, semantische Prüfungen und menschliche Bestätigung für wichtige Aktionen.

**Fehler 4: Geschäftslogik in Rendertools zu platzieren.**  

Rendertools sollten ausschließlich zum Rendern verwendet werden. Datenwerkzeuge sollten Daten abrufen, berechnen, mutieren und validieren. Die OpenAI Apps SDK-Dokumentation weist ausdrücklich auf diese Trennung hin: Wenn jedes Datenwerkzeug ein Widget mit sich führt, verliert das Modell Platz, um vor der Darstellung zu überlegen.  

**Fehler 5: Innovation statt Aufgabenabschluss zu priorisieren.**  

Es geht nicht darum, jede Antwort zu einem einzigartigen Interface zu machen. Es geht darum, Reibung zu reduzieren. Ein stabiles, „langweiliges“ Genehmigungspanel, das dem Benutzer vier Minuten spart, ist besser als ein beeindruckendes generiertes Dashboard, das nicht zweimal vertrauenswürdig ist.  

## Eine praktische Architektur  

Wenn ich heute ein neues Produkt starten würde, würde ich einen schrittweisen Ansatz verfolgen:

1. **Stellen Sie zunächst eine kontrollierte Tool-UI bereit.** Ordnen Sie bekannte Tools bekannten Komponenten zu. Protokollieren Sie jeden Tool-Aufruf, jede UI-Rendierung und jede Benutzeraktion.  
2. **Fügen Sie einen Domänenkatalog hinzu.** Sobald sich Muster wiederholen, stellen Sie `ComparisonTable`, `DecisionPanel`, `DataCollectionForm`, `Timeline` und andere produktspezifische Komponenten bereit.  
3. **Fügen Sie Transportstandardisierung nur bei Bedarf hinzu.** Wenn Sie Frontend und Backend besitzen, ist einfaches Streaming ausreichend. Bei mehreren Agenten-Frameworks verwenden Sie AG-UI. Wenn Tools Produktgrenzen überschreiten, verwenden Sie MCP. Wenn Agenten organisatorische Grenzen überschreiten, beachten Sie A2A und A2UI.  
4. **Verwenden Sie iframe-Widgets für fremde oder komplexe Oberflächen.** Karten, Warenkörbe, Buchungsabläufe und Drittanbieter-Mini-Apps gehören hinter eine Grenze.  
5. **Reservieren Sie offene Generierung für Artefakte.** Diagramme, Simulationen, vorübergehende Erklärungen und visuelle Notizen eignen sich hervorragend. Kernworkflows nicht.  

Die Architektur sieht letztendlich so aus:  

```txt
User intent
  -> agent runtime
  -> tool/data calls
  -> structured result
  -> UI decision
  -> trusted component, declarative spec, or sandboxed widget
  -> user action
  -> state/event stream back to the agent
```  

Dieser Kreislauf ist das echte Produkt. Das Chatfenster ist nur ein möglicher Eingabegerät.  

## Die Bewertung sollte die UI einbeziehen  

LLM-Teams lernen langsam, Prompts und Modellausgaben zu bewerten. Generative UI fügt eine weitere Oberfläche hinzu: Die Schnittstelle selbst kann falsch sein.  

Mindestens speichern Sie diese Artefakte für jede generierte UI:

- Prompt und Tool-Kontext  
- Tool-Aufrufe und Tool-Ergebnisse  
- generierte UI-Spezifikation oder Komponentenauswahl  
- gerenderte Komponentenname und Props  
- Benutzer-sichtbare Beschriftungen  
- Aktionen, die auf Buttons/Formularen befestigt sind  
- Modell-sichtbare Zustandsaktualisierungen von der UI  
- Benutzer-Aktionshistorie  

Dann schreiben Sie Überprüfungen wie:  

- jede zerstörerische Aktion muss eine Bestätigungskomponente haben  
- Button-Beschriftungen müssen der Aktionssemantik entsprechen  
- Rendervorgaben dürfen nur erlaubte Komponenten referenzieren  
- Benutzer-sichtbare Gesamtwerte müssen mit Tool-Ergebnis-Gesamtwerten übereinstimmen  
- Formulare dürfen keine Felder außerhalb des Aufgabenbereichs anfordern  
- Widgets dürfen keine Geheimnisse empfangen, die nur das Modell benötigt  
- versteckte Metadaten dürfen nicht mit sichtbaren Beschriftungen widersprechen  

Das klingt aufwendig. Es ist auch der Ursprung des Vertrauens in die Produktionsumgebung.  

## Die Links, mit denen ich anfangen würde  

Wenn Sie von diesem Artikel zum Code wechseln möchten, sind diese die besten Startpunkte, die ich gefunden habe:

- [AG-UI-Repository](https://github.com/ag-ui-protocol/ag-ui) und [AG-UI-Dokumentation](https://docs.ag-ui.com/introduction) für das Runtime-Ereignismodell.  
- [A2UI-Repository](https://github.com/google/A2UI) und [A2UI-Spezifikation](https://a2ui.org/specification/v0.9-a2ui/) für deklarative Agenten-zu-UI-Nutzlasten.  
- [json-render-Repository](https://github.com/vercel-labs/json-render) und [json-render-Dokumentation](https://json-render.dev/) für katalogbasierte JSON-UI-Generierung.  
- [CopilotKit-Repository](https://github.com/CopilotKit/CopilotKit) und [generative-ui-Beispiele](https://github.com/CopilotKit/generative-ui) für AG-UI, A2UI, Open-JSON-UI und MCP Apps Patterns.  
- [OpenGenerativeUI](https://github.com/CopilotKit/OpenGenerativeUI) für isolierte HTML/SVG/Canvas-Visualisierungen.  
- [MCP-UI / MCP Apps SDK](https://github.com/MCP-UI-Org/mcp-ui) für UI-Ressourcen über MCP.  
- [OpenAI Apps SDK-Dokumentation](https://developers.openai.com/apps-sdk) und [Apps SDK-Beispiele](https://github.com/openai/openai-apps-sdk-examples) für ChatGPT-App-Widgets.  
- [Vercel AI SDK generative UI-Leitfaden](https://ai-sdk.dev/docs/ai-sdk-ui/generative-user-interfaces) und [AI Elements](https://elements.ai-sdk.dev/) für appbasierte Chat/Tool-Rendern.  
- [assistant-ui](https://github.com/assistant-ui/assistant-ui) für komponierbare React-Chat-Primitiven.  
- [LangGraph generative UI-Dokumentation](https://docs.langchain.com/langgraph-platform/generative-ui-react) für graphbasierte UI-Komponenten.  
- [Hashbrown](https://github.com/liveloveapp/hashbrown) für React/Angular-Komponentenauswahl und Client-Tools.  
- [OpenUI](https://github.com/thesysdev/openui) für kompakte, stream-first UIs von Modellen.  
- [Tambo](https://github.com/tambo-ai/tambo) für React-basierte generative UI mit stateful Komponenten.  
- [llm-ui](https://llm-ui.com/) für flüssige Textströme mit benutzerdefinierten Inline-Komponenten.  

## Hinweis zur Projektstabilität  

Jeder große Protokollstandard in diesem Bereich ist vor der 1.0-Version. Letzte Überprüfung am 8. Mai 2026; planen Sie Änderungen ein und prüfen Sie die aktuellsten Dokumentationen, bevor Sie sich für eine Plattform entscheiden.  

**Vercel AI SDK RSC** – das ursprüngliche "Generative UI"-Schwerpunktfeature – wurde im Oktober 2024 ([Diskussion #3251](https://github.com/vercel/ai/discussions/3251)) aufgrund architektonischer Einschränkungen eingestellt, die keine kurzfristige Lösung zuließen. **json-render** (Vercel Labs) trat als Ersatzrichtung auf: katalogbasiert, framework-agnostisch, keine RSC-Abhängigkeit. Es scheint seit seiner Veröffentlichung im frühen Jahr 2026 schnell Aufmerksamkeit in der Webentwicklergemeinschaft gewonnen zu haben. Der wahrscheinliche Grund ist die DX: json-render funktioniert sofort in einem Standard-React-Projekt; A2UIs cross-platform-Bereich erhöht die Setup-Komplexität.  

**A2UI** (Google) ist vor der 1.0-Version und weist zwischen Minor-Versionen bruchreiche Änderungen sowie inkonsistente Roadmap-Kommunikation auf. Sein Vorteil ist die echte Cross-Platform-Reichweite (Web, Flutter, SwiftUI), die json-render nicht abdeckt. Für reine Webanwendungen scheint json-render heute eine bessere Tooling-Abdeckung zu haben; für Cross-Platform- oder Remote-Agent-Szenarien ist das A2UI-Design angemessener. Eine Konvergenz der beiden Spezifikationen ist möglich – Vercel hat bereits Experimente mit A2UI-kompatibler Ausgabe von json-render durchgeführt.  

**AG-UI** (CopilotKit) ist ebenfalls vor der 1.0-Version. Der häufigste Verwechslungsgrund ist der Name: AG-UI ist ein Transportprotokoll, kein UI-Framework. Es definiert *wie* Ereignisse zwischen Agent und Frontend fließen; was Sie rendern, bleibt Ihre Entscheidung. Das Konzept ist solide und weit verbreitet. Die Spezifikation entwickelt sich weiter.

## Meine Einschätzung

Generative UI wird sorgfältig gestaltete Produktinterfaces nicht ersetzen. Sie wird die faule Annahme ersetzen, dass ein Chat-Transkript die universelle Schnittstelle für KI ist.

Die besten Systeme werden nicht zulassen, dass das Modell alles im Freestyle-Modus erledigt. Sie werden ihm stattdessen eine kleine, präzise Menge an produkt-eigenen Bausteinen bieten; eine verlässliche Laufzeitverbindung; klare Sicherheitsgrenzen; und genügend Freiheit, um die Schnittstelle an die Aufgabe anzupassen.

Die Zukunft ist nicht "Das Modell schreibt Ihr Frontend."

Die Zukunft ist vielmehr: **Ihr Frontend wird ein Instrument, das der Agent spielen kann, aber Sie entscheiden nach wie vor, wie das Instrument klingen darf.**
````
