# Translation Candidate
- Slug: llm-generative-ui-landscape
- Locale: de
- Model: qwen/qwen3.6-plus
- Target: src/content/posts/2026-05-06--llm-generative-ui-landscape/de/index.mdx
- Validation: rejected: direct AI SDK translation failed
- Runtime seconds: 240.09
- Input tokens: unknown
- Output tokens: unknown
- Thinking tokens: unknown
- Cached input tokens: unknown
- Cache write tokens: unknown
- Estimated cost: unknown
- Pricing source: unknown
- Note: Command failed after 240000ms: bun run i18n:translate:chunked -- --slug llm-generative-ui-landscape --locale de --model qwen/qwen3.6-plus --chunk 6p --run-id 2026-05-13T19-05-13-381Z-80623 --run-lock-path /Users/dan/code/oss/dans-blog/.git/codex-i18n-translation-run.json --quiz-concurrency 24
## Raw Output

````mdx
---
title: Die LLM Generative UI Landschaft
subTitle: >-
  Vom Tool-zu-Komponenten-Rendering bis zur offenen Generierung – eine Landkarte
  aller Ansätze und wann jeder seine Komplexität rechtfertigt.
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
Chat war das Stützrad.

Die erste Generation von LLM-Apps sah meist aus wie ein Textfeld, das an ein Produkt geheftet war. Das Modell lieferte Prosa. Das Frontend rendete Markdown. Wenn der Benutzer eine Aktion ausführen musste, beschrieb der Assistent den Button, den der Benutzer woanders klicken sollte.

Das war in Ordnung für Demos. Aber dahin geht es nicht.

Der nächste sinnvolle Schritt ist **generative UI**: Das Modell antwortet nicht nur mit Text; es hilft zu entscheiden, welche Schnittstelle der Benutzer gerade braucht. Manchmal bedeutet das, ein Tool aufzurufen und eine vorgefertigte Karte zu rendern. Manchmal bedeutet es, eine bekannte Workflow-Komponente mit neuen Daten zu füllen. Manchmal bedeutet es, ein temporäres Dashboard, ein Formular, eine Vergleichstabelle, ein Diagramm oder ein interaktives Widget zusammenzustellen.

Leider ist „generative UI“ zu einem dieser Schlagworte geworden, die fünf verschiedene Dinge bedeuten, bevor man überhaupt gefrühstückt hat.

Leute verwenden es, um zu beschreiben:

- ein Modell, das aus entwicklerdefinierten React-Komponenten auswählt
- eine JSON-Spezifikation, die das Frontend in native Komponenten rendert
- eine iframe-App, die von einem MCP-Tool zurückgegeben wird
- eine Chat-UI-Bibliothek, die Tool-Aufrufe unterstützt
- ein Agentenprotokoll, das Zustand zwischen Backend und Frontend streamt
- ein Code-Generator zur Entwurfszeit wie v0, Lovable, Bolt oder Cursor
- ein Modell, das buchstäblich HTML, SVG, Canvas oder React zur Laufzeit schreibt

Diese Dinge hängen zusammen, aber sie liegen nicht auf derselben Ebene. Wenn man sie vermischt, wird jede Architekturdiskussion zu einer undurchsichtigen Suppe.

Das ist die Karte, die ich gerne gehabt hätte, als ich anfing, den aktuellen Stack zu vergleichen.

![Eine geschichtete Karte der generativen UI-Landschaft von LLMs](../landscape-map.webp)

## Das Kernmissverständnis

Der größte Fehler ist, „generative UI“ als eine einzige Technologieentscheidung zu behandeln.

Es ist besser, das Problem in vier Schichten zu unterteilen:

1.  **Produkthülle**: das, was Benutzer berühren. Das kann ein Chat, ein Sidebar-Copilot, ein Dashboard, ein Workflow-Builder, ein IDE-Panel, eine ChatGPT-App, ein mobiler Bildschirm oder eine Support-Konsole sein.
2.  **UI-Kompositionsmodell**: die Grammatik, die das Modell verwenden darf. Das können Tool-Aufrufe, JSON, A2UI, json-render, OpenUI Lang, Hashbrown-Komponentenauswahl oder sandboxed HTML sein.
3.  **Laufzeit und Transport**: wie Nachrichten, Tool-Aufrufe, Zustandsdeltas, Benutzeraktionen und UI-Artefakte zwischen Agent und Frontend bewegt werden. AG-UI, MCP Apps, Apps SDK, A2A, SSE, WebSockets und einfaches altes HTTP leben hier.
4.  **Agent- und Tool-Backend**: LangGraph, Google ADK, CrewAI, Mastra, LlamaIndex, Pydantic AI, Agno, OpenAI Agents SDK, benutzerdefinierte Funktionen, Datenbanken, Retrieval und all die langweilige Geschäftslogik, die trotzdem korrekt sein muss.

Sobald man die Schichten trennt, wird das Ökosystem viel weniger mystisch.

[AG-UI](https://github.com/ag-ui-protocol/ag-ui) ist kein echter Konkurrent von [A2UI](https://github.com/google/A2UI). AG-UI ist ein Ereignisprotokoll für die Agent-zu-Anwendung-Interaktion. A2UI ist ein deklaratives UI-Format, das der Agent senden kann. Man kann A2UI über AG-UI legen. Man kann auch benutzerdefinierte, per Tool gerenderte Komponenten über AG-UI legen.

[json-render](https://github.com/vercel-labs/json-render) ist kein Chat-Produkt. Es ist eine Komponentenkatalog- und Renderer-Architektur: Definiere die Komponenten, die das Modell verwenden darf, lasse das Modell einen gültigen JSON-Baum ausgeben und rendere diesen Baum sicher.

[CopilotKit](https://github.com/CopilotKit/CopilotKit) ist nicht nur eine Chat-Blase. Es ist ein Frontend-Stack für agenten-native Apps: Chat-UI, generative UI, gemeinsamer Zustand, Frontend-Tools und Human-in-the-Loop-Abläufe.

[OpenAI Apps SDK](https://developers.openai.com/apps-sdk) und [MCP Apps](https://github.com/MCP-UI-Org/mcp-ui) sind keine Werkzeuge, um „meine React-App dynamisch zu machen“. Sie sind Host-Integrationsmodelle zum Rendern von Widgets innerhalb von ChatGPT oder anderen MCP-kompatiblen Hosts.

Die Namen sind verwirrend, weil der Bereich jung ist. Die Schichten sind der Teil, der nützlich bleibt.

## Das Kontrollspektrum

Generative UI ist ein Kompromiss zwischen **Entwicklerkontrolle** und **Agentenfreiheit**.

Zu viel Kontrolle und der Assistent fühlt sich an wie eine Befehlspalette im Kostüm. Zu viel Freiheit und das Modell beginnt, seltsame Layouts, vage Schaltflächen, kaputte visuelle Hierarchien, unmögliche Zustände und Sicherheitsprobleme mit einem selbstbewussten kleinen Grinsen zu erfinden.

Der Trick ist, die kleinste Menge an Freiheit zu wählen, die das Benutzerproblem löst.

![Ein Spektrum von tool-gerenderten Komponenten bis zu frei generiertem HTML](../control-spectrum.webp)

Ich betrachte das Spektrum wie folgt:

**Tool-zu-Komponenten-Rendering** ist der sicherste Standard. Das Modell ruft `get_weather`, `search_products`, `compare_plans` oder `draft_invoice` auf. Die App bildet dieses Tool-Ergebnis auf eine bereits vorhandene Komponente ab: `WeatherCard`, `ProductGrid`, `PlanComparison`, `InvoiceReview`. Das Modell entscheidet, *wann* die UI nützlich ist. Entwickler behalten die Kontrolle über Layout, Styling, Barrierefreiheit, Ladezustände, Leerzustände und gefährliche Aktionen.

Dies ist das Muster, das im [Vercel AI SDK Leitfaden für generative UI](https://ai-sdk.dev/docs/ai-sdk-ui/generative-user-interfaces) dokumentiert ist: Das Modell ruft ein Tool auf, das Tool gibt Daten zurück, und die UI rendert eine Komponente aus dem Ergebnis. Es ist auch das mentale Modell hinter vielen CopilotKit- und assistant-ui-Implementierungen.

**Deklarative Komponentenkataloge** geben dem Modell mehr Spielraum. Anstatt eine einzelne Komponente auszuwählen, setzt das Modell einen Baum aus erlaubten Teilen zusammen. Ein Katalog könnte `Metric`, `Table`, `Chart`, `FilterBar`, `ApprovalPanel` und `Timeline` enthalten. Das Modell kann ein Dashboard oder einen Workflow-Schritt zusammenstellen, aber keinen beliebigen Code ausführen. Hier liegen [A2UI](https://github.com/google/A2UI), [json-render](https://github.com/vercel-labs/json-render), [Hashbrown](https://github.com/liveloveapp/hashbrown) und [OpenUI](https://github.com/thesysdev/openui).

**Iframe-Mini-Apps** sind sinnvoll, wenn die UI reichhaltiger als ein Komponentenbaum sein muss oder wenn ein entfernter Tool-Anbieter die Erfahrung besitzt. MCP Apps und das OpenAI Apps SDK erlauben es einem Tool, strukturierte Daten plus eine Widget-Ressource zurückzugeben, die der Host in einem Iframe rendert. Das ist leistungsstark für Karten, Warenkörbe, Buchungsabläufe, Diagramme und externe Produktoberflächen. Es schafft auch eine härtere Grenze zwischen der Host-App und dem Widget.

**Offene Generierung** ist das äußerste Ende: Der Agent gibt HTML, SVG, Canvas, WebGL oder andere codeähnliche Artefakte in einer Sandbox aus. [OpenGenerativeUI](https://github.com/CopilotKit/OpenGenerativeUI) ist das beste aktuelle Beispiel: Der Agent kann Algorithmusvisualisierungen, 3D-Szenen, Diagramme und Simulationen in gesandboxten Iframes erzeugen. Das ist großartig für einmalige visuelle Erklärungen. Es ist nicht der Ort, an dem ich für einen unternehmenseigenen Genehmigungsablauf beginnen würde.

Es hilft, die entscheidende Unterscheidung hier zu benennen: **Iframe-HTML** (das Modell schreibt Code in eine Sandbox) vs. **JSON-Katalog** (das Modell gibt eine strukturierte Spezifikation aus und dein Renderer bildet sie auf vorgefertigte Komponenten ab). Das klingt verwandt, trägt aber sehr unterschiedliche Risiko- und Komplexitätsprofile. Iframe-HTML ist maximal ausdrucksstark; die Iframe-Grenze übernimmt die Sicherheitsarbeit. Der JSON-Katalog gibt dem Modell keine ausführbare Freiheit – es kann nur auf Komponententypen verweisen, die du im Voraus definiert hast. Die meisten Frameworks in diesem Bereich fallen eindeutig in das eine oder andere Lager.

**Jenseits der Sandbox**: Sehr aktuelle Demos deuten darauf hin, dass sich eine vierte Art formiert – LLMs, die spielähnliche oder immersive Erlebnisse steuern, indem sie die visuelle Ausgabe direkter kontrollieren, als es jeder Komponentenkatalog erlaubt. Projekte, die aus Prompts erkundbare 3D-Welten generieren, LLM-gesteuertes NPC-Verhalten zur Laufzeit und browserinterne Modellinferenz via WebGPU ([WebLLM](https://mlc.ai/web-llm/)) sind frühe Anzeichen. Es gibt hier noch keine stabilen Frameworks, um damit Produktionsarbeit zu leisten. Ich werde diese Richtung in einem eigenen Artikel behandeln, sobald sich das ändert.

## Hochrangige Komponenten vs. Granulare Komponenten

Das ist die wichtigste Designentscheidung.

Wenn dein Katalog zu granular ist, muss das Modell zum Frontend-Ingenieur werden:

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

Das sieht flexibel aus, aber jetzt muss das Modell Abstände, Hierarchie, Gruppierung, Leerzustände, Button-Beschriftungen, Fehlerbehandlung und responsives Verhalten entscheiden. Du hast außerdem den Prompt vergrößert und die Ausgabe anfälliger gemacht.

Wenn dein Katalog zu hochrangig ist, ist das Modell eingeschränkt:

```tsx
WeatherCard
StockCard
HotelCard
```

Das ist sicher, funktioniert aber nur für bekannte Szenarien. Das Modell kann keine Vergleichsmatrix erstellen, nach fehlenden Eingaben fragen oder die Informationsarchitektur anpassen, wenn sich die Frage des Nutzers ändert.

Der nützliche Mittelweg sind **domänenspezifische Komponenten mit eingeschränkten Slots**:

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

Diese Komponenten kodieren Produktgeschmack und Geschäftslogik. Das Modell darf entscheiden, *was gezeigt werden soll*, aber nicht jede CSS-Entscheidung.

Ein Reiseagent braucht zum Beispiel kein `div`, `span` und `button`. Er braucht:

- `TripSummary`
- `FlightOptionList`
- `HotelComparison`
- `TravelerForm`
- `PolicyNotice`
- `BookingConfirmation`

Ein Finanzagent braucht keinen generischen Diagramm-Spielplatz. Er braucht:

- `PortfolioSnapshot`
- `TransactionTable`
- `RiskBreakdown`
- `ScenarioComparison`
- `ApprovalGate`

Der Katalog sollte sich wie Ihr Produkt anhören, nicht wie HTML.

## Funktionstabelle

Diese Tabelle ist bewusst subjektiv. Sie behandelt jedes Projekt als Werkzeug in einem Stack, nicht als eine Plattform, die alles gewinnt.

| Technologie | Ebene | Beste Verwendung | UI-Modell | Streaming / Zustand | Anmerkungen und Beispiele |
| --- | --- | --- | --- | --- | --- |
| [AG-UI](https://github.com/ag-ui-protocol/ag-ui) | Laufzeitprotokoll | Verbindung von Agent-Backends mit Frontend-Apps | Events für Nachrichten, Tools, Zustand, Aktivität, Unterbrechungen | Ja; Event-Stream plus Zustands-Snapshots/Deltas | Verwenden, wenn du eine standardisierte Agent-zu-App-Pipe brauchst. Ergänzt MCP und A2A, ersetzt sie nicht. |
| [A2UI](https://github.com/google/A2UI) | Deklaratives UI-Protokoll | Plattformübergreifende, agentengenerierte native UI | JSON-Payload, das Komponenten, Datenmodell und Updates beschreibt | Für inkrementelle Updates ausgelegt | Starke Wahl für Remote-Agenten und Vertrauensgrenzen. Frühe öffentliche Vorschau, aber konzeptionell sauber. |
| [json-render](https://github.com/vercel-labs/json-render) | Komponentenkatalog und Renderer | Das Modell darf zugelassene Komponenten komponieren | JSON-Baum, eingeschränkt durch einen typisierten Katalog | Unterstützt progressives Rendering | Gut für React, Vue, Svelte, Solid, React Native, E-Mail, PDF, Remotion, Terminal und mehr. |
| [CopilotKit](https://github.com/CopilotKit/CopilotKit) | Produkthülle und Agent-UI-Framework | In-App-Copiloten, gemeinsamer Zustand, Frontend-Tools, HITL | Tool-Rendering, AG-UI, A2UI, MCP Apps-Muster | Ja | Einer der breitesten „Build agent-native Apps“-Stacks. Siehe [generative-ui Beispiele](https://github.com/CopilotKit/generative-ui). |
| [OpenGenerativeUI](https://github.com/CopilotKit/OpenGenerativeUI) | Offene UI-Generierungs-Demo | Visuelle Erklärungen, Diagramme, Simulationen, Charts | Agent emittiert HTML / SVG / Canvas in sandboxed Iframes | Progressives visuelles Rendering | Verwenden für dynamische Artefakte, bei denen ein fester Komponentenkatalog zu einschränkend ist. |
| [MCP Apps / mcp-ui](https://github.com/MCP-UI-Org/mcp-ui) | Host/Widget-Standard | Tool-Anbieter liefern interaktive UI über MCP | HTML-Ressource, verknüpft aus Tool-Metadaten | Host-Bridge und Widget-Aktionen | Am besten, wenn die UI zu einem Tool-Anbieter gehört oder Iframe-Isolation benötigt. |
| [OpenAI Apps SDK](https://developers.openai.com/apps-sdk) | ChatGPT-App-Host-Integration | Erstellen benutzerdefinierter ChatGPT-App-Widgets | MCP-Server-Tools plus Iframe-UI-Komponenten | Tool-Eingabe/Ergebnis, Widget-Zustand, Folgenachrichten | Neue ChatGPT-Apps sollten MCP Apps-Felder und die `ui/*`-Bridge bevorzugen, mit `window.openai` für Kompatibilität/Erweiterungen. |
| [Vercel AI SDK UI](https://ai-sdk.dev/docs/ai-sdk-ui/generative-user-interfaces) | App-SDK und Chat-Zustand | Benutzerdefinierte App-Chats, Tool-Aufrufe, Streaming-Nachrichtenteile | Tool-Ergebnisse als React-Komponenten rendern | Ja, über `useChat` und UI-Nachrichten-Streams | Gute Basis, wenn du die App bereits besitzt und mehr Kontrolle auf niedrigerer Ebene möchtest. Kombinieren mit [AI Elements](https://elements.ai-sdk.dev/) für UI-Primitive. |
| [assistant-ui](https://github.com/assistant-ui/assistant-ui) | React-Chat-Primitive | Produktionsreife Chat-UX mit benutzerdefiniertem Rendering | Komponierbare Chat-Primitive, Tool-Call-Rendering, JSON als Komponenten | Ja | Starke Wahl, wenn du polierte Chat-Ergonomie brauchst, aber dein eigenes Backend mitbringen möchtest. |
| [LangGraph Generative UI](https://docs.langchain.com/langgraph-platform/generative-ui-react) | Agent-Plattform-Integration | UI-Komponenten gemeinsam mit Graph-Code platzieren | Graph emittiert benannte UI-Nachrichten, die von React-Komponenten gerendert werden | Ja, inklusive benutzerdefinierter Stream-Events | Natürliche Wahl für LangGraph-Deployments und graph-eigene UI-Komponenten. |
| [Hashbrown](https://github.com/liveloveapp/hashbrown) | Frontend-GenUI-Framework | React/Angular-Apps, die Komponenten und Client-seitige Tools bereitstellen | LLM wählt aus und rendert erlaubte App-Komponenten | Unterstützt Streaming-Muster | Gut, um Intelligenz direkt in Produktoberflächen einzubetten, nicht nur in Chat. |
| [OpenUI](https://github.com/thesysdev/openui) | Kompakte UI-Sprache und Laufzeit | Streamable, modellgenerierte UI mit weniger Tokens als JSON | OpenUI Lang plus React-Laufzeit und Komponentenbibliotheken | Für Token-Streaming ausgelegt | Interessant, wenn JSON-Ausführlichkeit zum Engpass wird. Noch jung, aber beobachtenswert. |
| [Tambo](https://github.com/tambo-ai/tambo) | React Generative UI SDK | Komponentenauswahl, zustandsbehaftete Komponenten, Client-seitige Tool-Ausführung | KI wählt Komponenten aus und interagiert mit Client-Tools | Zustandsorientiert | Beliebte OSS-React-Option mit Fokus auf automatische Komponentenorchestrierung. |
| [llm-ui](https://llm-ui.com/) | Ausgabe-Renderer | Glattere LLM-Textausgabe mit benutzerdefinierten Inline-Komponenten | Parst Modellausgabe-Strings in React-Rendering | Glattes Token-Rendering | Nützlich für leichte benutzerdefinierte Komponenten in Text-Streams; kein vollständiges Agent-UI-Protokoll. |
| AI SDK RSC / React Server Components | Älteres Muster / Framework-Feature | Server-gerenderte Komponenten-Streams in Next.js | Modell/Tool-Flow gibt server-gerenderte UI zurück | Ja, aber frameworkspezifisch | Entwicklung im Okt. 2024 pausiert ([Diskussion #3251](https://github.com/vercel/ai/discussions/3251)); nicht der empfohlene Weg. Migriere zu `useObject` oder json-render. |

## Was für welches Produkt verwenden

Hier ist die Empfehlungsmatrix, die ich tatsächlich mit einem Team nutzen würde.

**Du fügst einem bestehenden SaaS einen Assistenten hinzu.**

Starte mit Tool-zu-Komponenten-Rendering. Verwende [Vercel AI SDK UI](https://ai-sdk.dev/docs/ai-sdk-ui/generative-user-interfaces), [assistant-ui](https://github.com/assistant-ui/assistant-ui) oder [CopilotKit](https://github.com/CopilotKit/CopilotKit), je nachdem, wie viel Agent-Zustand und Frontend-Tool-Integration du brauchst. Halte den Katalog anfangs klein. Rendere Produktkomponenten, denen du bereits vertraust.

**Du baust einen ernsthaften In-App-Copiloten, der gemeinsamen Zustand benötigt.**

Sieh dir CopilotKit plus AG-UI genau an. Das wichtige Feature ist nicht „Chat“. Es sind gemeinsamer Zustand und bidirektionale Interaktion: Der Agent kann nach Eingabe fragen, UI rendern, Zustand aktualisieren und zur Genehmigung pausieren.

**Du hast entfernte Agents, die UI über eine Grenze hinweg senden müssen.**

Nutze A2UI oder ein A2UI-ähnliches deklaratives Protokoll. Der ganze Sinn ist, dass ein entfernter Agent UI als Daten beschreiben kann, während der Host die Kontrolle über natives Rendering, Sicherheit und Stil behält. Wenn du auch Live-Agent/App-Interaktion brauchst, führe sie über AG-UI oder den Transport aus, den deine Umgebung standardisiert.

**Du baust innerhalb von ChatGPT oder einem MCP-kompatiblen Host.**

Nutze MCP Apps und den Apps SDK-Pfad. OpenAIs aktuelle Dokumentation empfiehlt die MCP Apps `ui/*`-Brücke für neue Arbeiten, während `window.openai` als Kompatibilitätsschicht und optionale Erweiterungsoberfläche erhalten bleibt. Kopiere auch ihre Trennung zwischen Daten-Tools und Render-Tools: Lass das Modell Daten abrufen und darüber nachdenken, bevor es sich entscheidet, ein Widget zu rendern.

**Du willst natürlichsprachliche Dashboards, Berichte oder Formulare in deiner eigenen App.**

Probier json-render, Hashbrown oder OpenUI aus. Der Schlüssel ist der Katalog. Wenn du `LineChart`, `DataTable`, `MetricGroup`, `FilterControl` und `InsightCallout` bereitstellst, kann das Modell nützliche Reporting-Oberflächen zusammenstellen, ohne in die Nähe von beliebigem Code zu kommen.

**Du willst pädagogische, visuelle oder hochgradig maßgeschneiderte Artefakte.**

Verwende eine offene Sandbox wie OpenGenerativeUI. Lass das Modell SVG, Canvas, WebGL oder eigenständiges HTML schreiben, behandle die Ausgabe aber wie nicht vertrauenswürdigen Benutzerinhalt. Sandboxe es, dimensioniere es, entferne Berechtigungen und halte es fern von privilegiertem App-Zustand.

**Du brauchst hauptsächlich hübscheres Streaming-Markdown mit ein paar Inline-Möglichkeiten.**

Überbaue nicht. Das Tool-Rendering von llm-ui oder assistant-ui könnte ausreichen.

## Die Fehler, die ich vermeiden würde

**Fehler 1: Das Modell zur Laufzeit produktiven React-Code schreiben lassen.**

Es gibt Ausnahmen, aber für Produkt-UI ist das normalerweise die falsche Standardeinstellung. Laufzeit-Codegenerierung ist schwer zu sichern, schwer zu testen, schwer zu thematisieren und schwer barrierefrei zu halten. Wenn das Modell die Aufgabe durch Auswahl vertrauenswürdiger Komponenten erledigen kann, dann tun Sie das.

**Fehler 2: Design-Primitive statt Produkt-Primitive bereitstellen.**

Wenn Sie dem Modell `Row`, `Column`, `Text` und `Button` geben, bitten Sie es, Ihr Designsystem zu werden. Es wird ein mittelmäßiges werden. Geben Sie ihm Produktnomen auf höherer Ebene.

**Fehler 3: Glauben, dass gültiges JSON sichere UI bedeutet.**

Ein Payload kann die Schema-Validierung bestehen und dennoch manipulativ oder gefährlich sein. Das Label kann 'Rechnung anzeigen' sagen, während die Aktion das Konto archiviert. Behandeln Sie UI-Spezifikationen als Verhalten, nicht als Dekoration. Sie benötigen Richtlinientests, semantische Prüfungen und menschliche Bestätigung für folgenreiche Aktionen.

**Fehler 4: Geschäftslogik in Render-Tools unterbringen.**

Render-Tools sollten rendern. Daten-Tools sollten abrufen, berechnen, mutieren und validieren. Die OpenAI Apps SDK-Dokumentation hebt diese Trennung aus gutem Grund hervor: Wenn jedes Daten-Tool ein Widget mit sich zieht, verliert das Modell Raum zum Nachdenken, bevor es präsentiert.

**Fehler 5: Optimierung auf Neuheit statt auf Aufgabenerfüllung.**

Es geht nicht darum, jede Antwort zu einer einzigartigen Oberfläche zu machen. Es geht darum, Reibung zu reduzieren. Ein stabiles, langweiliges Genehmigungsfeld, das dem Benutzer vier Minuten spart, ist besser als ein blendendes generiertes Dashboard, dem man nicht zweimal vertrauen kann.

## Eine praktische Architektur

Wenn ich heute ein neues Produkt starten würde, würde ich einen gestaffelten Ansatz verwenden:
--- CHUNK END ---

1.  **Zuerst kontrollierte Tool-UI ausliefern.** Bekannte Tools auf bekannte Komponenten abbilden. Jeden Tool-Aufruf, jede UI-Renderung und jede Benutzeraktion protokollieren.
2.  **Ein Domänenkatalog hinzufügen.** Sobald sich Muster wiederholen, `ComparisonTable`, `DecisionPanel`, `DataCollectionForm`, `Timeline` und andere produktspezifische Komponenten bereitstellen.
3.  **Transportstandardisierung nur bei Bedarf hinzufügen.** Wenn man sowohl Frontend als auch Backend besitzt, reicht einfaches Streaming möglicherweise aus. Bei mehreren Agent-Frameworks AG-UI verwenden. Wenn Tools Produktgrenzen überschreiten, MCP verwenden. Wenn Agenten Organisationsgrenzen überschreiten, A2A und A2UI im Auge behalten.
4.  **Iframe-Widgets für fremde oder komplexe Oberflächen verwenden.** Karten, Warenkörbe, Buchungsabläufe und Drittanbieter-Mini-Apps gehören hinter eine Grenze.
5.  **Offene Generierung für Artefakte reservieren.** Diagramme, Simulationen, temporäre Erklärungen und visuelle Notizblöcke sind ideal geeignet. Kern-Workflows nicht.

Die Architektur sieht dann so aus:

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

Diese Schleife ist das eigentliche Produkt. Die Chat-Box ist nur ein mögliches Eingabegerät.

## Evaluierung sollte die UI einbeziehen

LLM-Teams lernen langsam, Prompts und Modellausgaben zu evaluieren. Generative UI fügt eine weitere Oberfläche hinzu: Die Schnittstelle selbst kann falsch sein.

Mindestens sollten diese Artefakte für jede generierte UI gespeichert werden:
- Prompt und Tool-Kontext
- Tool-Aufrufe und Tool-Ergebnisse
- Generierte UI-Spezifikation oder Komponentenauswahl
- Gerenderter Komponentenname und Props
- Für den Benutzer sichtbare Labels
- Aktionen, die an Buttons/Formulare gebunden sind
- Für das Modell sichtbare Statusaktualisierungen von der UI
- Benutzeraktionsverlauf

- Prompt- und Tool-Kontext
- Tool-Aufrufe und Tool-Ergebnisse
- Generierte UI-Spezifikation oder Komponentenauswahl
- Gerenderter Komponentenname und Props
- Für den Benutzer sichtbare Labels
- Aktionen, die an Buttons/Formulare gebunden sind
- Für das Modell sichtbare Statusaktualisierungen von der UI
- Benutzeraktionsverlauf

Dann schreibt man Prüfungen wie:

- Jede destruktive Aktion muss eine Bestätigungskomponente haben
- Button-Beschriftungen müssen der Aktionssemantik entsprechen
- Render-Spezifikationen dürfen nur erlaubte Komponenten referenzieren
- Für den Benutzer sichtbare Summen müssen mit den Tool-Ergebnis-Summen übereinstimmen
- Formulare dürfen keine Felder außerhalb des Aufgabenbereichs anfordern
- Widgets dürfen keine Geheimnisse erhalten, die nur das Modell benötigte
- Versteckte Metadaten dürfen nicht im Widerspruch zu sichtbaren Labels stehen

Das klingt mühsam. Aber genau hier entsteht das Vertrauen für die Produktion.

## Die Links, mit denen ich beginnen würde

Wenn Sie vom Artikel zum Code übergehen möchten, sind dies die besten Ausgangspunkte, die ich gefunden habe:

- [AG-UI Repo](https://github.com/ag-ui-protocol/ag-ui) und [AG-UI Docs](https://docs.ag-ui.com/introduction) für das Runtime-Event-Modell.
- [A2UI Repo](https://github.com/google/A2UI) und [A2UI Spezifikation](https://a2ui.org/specification/v0.9-a2ui/) für deklarative Agent-zu-UI-Payloads.
- [json-render Repo](https://github.com/vercel-labs/json-render) und [json-render Docs](https://json-render.dev/) für kataloggesteuerte JSON-UI-Generierung.
- [CopilotKit Repo](https://github.com/CopilotKit/CopilotKit) und [generative-ui Beispiele](https://github.com/CopilotKit/generative-ui) für AG-UI-, A2UI-, Open-JSON-UI- und MCP-Apps-Patterns.
- [OpenGenerativeUI](https://github.com/CopilotKit/OpenGenerativeUI) für sandboxed HTML/SVG/Canvas-Visualisierungen.
- [MCP-UI / MCP Apps SDK](https://github.com/MCP-UI-Org/mcp-ui) für UI-Ressourcen über MCP.
- [OpenAI Apps SDK Docs](https://developers.openai.com/apps-sdk) und [Apps SDK Beispiele](https://github.com/openai/openai-apps-sdk-examples) für ChatGPT-App-Widgets.
- [Vercel AI SDK Generative UI Guide](https://ai-sdk.dev/docs/ai-sdk-ui/generative-user-interfaces) und [AI Elements](https://elements.ai-sdk.dev/) für app-eigenes Chat/Tool-Rendering.
- [assistant-ui](https://github.com/assistant-ui/assistant-ui) für komponierbare React-Chat-Primitive.
- [LangGraph Generative UI Docs](https://docs.langchain.com/langgraph-platform/generative-ui-react) für graph-emittierte UI-Komponenten.
- [Hashbrown](https://github.com/liveloveapp/hashbrown) für React/Angular-Komponentenauswahl und clientseitige Tools.
- [OpenUI](https://github.com/thesysdev/openui) für kompakte, streaming-first modellgenerierte UI.
- [Tambo](https://github.com/tambo-ai/tambo) für React Generative UI mit zustandsbehafteten Komponenten.
- [llm-ui](https://llm-ui.com/) für flüssige Textstreams mit benutzerdefinierten Inline-Komponenten.

## Eine Anmerkung zur Projektstabilität

Jedes größere Protokoll in diesem Bereich ist Pre-1.0. Zuletzt überprüft am 8. Mai 2026; planen Sie Änderungen ein und prüfen Sie die aktuellen Docs, bevor Sie eine Plattformentscheidung treffen.

**Vercel AI SDK RSC** – die ursprüngliche „Generative UI“-Hauptfunktion – wurde im Oktober 2024 aufgrund architektonischer Einschränkungen ohne kurzfristige Lösung pausiert ([Discussion #3251](https://github.com/vercel/ai/discussions/3251)). **json-render** (Vercel Labs) hat sich als Ersatzrichtung herauskristallisiert: katalogbasiert, framework-agnostisch, keine RSC-Kopplung. Es scheint seit seinem Launch Anfang 2026 schnell die Aufmerksamkeit von Webentwicklern gewonnen zu haben. Der wahrscheinliche Grund ist die Developer Experience: json-render funktioniert sofort in einem Standard-React-Projekt; A2UIs plattformübergreifender Umfang bringt zusätzlichen Setup-Aufwand mit sich.

**A2UI** (Google) ist Pre-1.0 mit Breaking Changes zwischen Minor-Versionen und inkonsistenter Roadmap-Kommunikation. Sein Vorteil ist die echte plattformübergreifende Reichweite (Web, Flutter, SwiftUI), die json-render nicht abdeckt. Für reine Web-Anwendungsfälle scheint json-render derzeit eine bessere Tooling-Abdeckung zu haben; für plattformübergreifende oder Remote-Agent-Szenarien ist A2UIs Design besser geeignet. Eine Konvergenz der beiden Spezifikationen ist möglich – Vercel hat mit A2UI-kompatiblen Ausgaben von json-render experimentiert.

**AG-UI** (CopilotKit) ist ebenfalls Pre-1.0. Die häufigste Verwirrung betrifft den Namen: AG-UI ist ein Transportprotokoll, kein UI-Framework. Es definiert, *wie* Ereignisse zwischen Agent und Frontend fließen; was Sie rendern, bleibt Ihre Entscheidung. Das Konzept ist solide und weit verbreitet. Die Spezifikation entwickelt sich noch weiter.

## Meine Einschätzung

Generative UI wird sorgfältig designte Produktoberflächen nicht ersetzen. Stattdessen wird es die bequeme Annahme ersetzen, dass ein Chat-Transkript die universelle Schnittstelle für KI sei.

Die besten Systeme werden dem Modell nicht erlauben, alles frei zu improvisieren. Stattdessen geben sie ihm einen kleinen, präzisen Satz produktnativer Bausteine; eine zuverlässige Laufzeitverbindung; klare Sicherheitsgrenzen; und genug Freiheit, um die Oberfläche an die jeweilige Aufgabe anzupassen.

Die Zukunft ist nicht, dass das Modell Ihr Frontend schreibt – ganz im Gegenteil.

Die Zukunft ist eher: **Ihr Frontend wird zu einem Instrument, das der Agent spielen kann, aber Sie entscheiden weiterhin, wie das Instrument klingen darf.**
````
