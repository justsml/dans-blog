# Translation Candidate
- Slug: llm-generative-ui-landscape
- Locale: de
- Model: openrouter/openai/gpt-oss-120b:nitro
- Target: src/content/posts/2026-05-06--llm-generative-ui-landscape/de/index.mdx
- Validation: passed
- Runtime seconds: 28.49
- Input tokens: 20483
- Output tokens: 7996
- Thinking tokens: unknown
- Cached input tokens: 3328
- Cache write tokens: 0
- Estimated cost: $0.002238
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
title: LLM‑generative UI‑Landschaft
subTitle: >-
  Von Tool‑zu‑Komponente‑Rendering bis offener Generierung – eine Übersicht
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

Die erste Generation von LLM‑Apps sah meist aus wie ein Textfeld, das an ein Produkt geheftet war. Das Modell gab Fließtext zurück. Das Frontend renderte Markdown. Wenn der Nutzer eine Aktion ausführen musste, beschrieb der Assistent den Button, den der Nutzer irgendwo anders anklicken sollte.

Das war für Demos in Ordnung. So wird es nicht weitergehen.

Der nächste sinnvolle Schritt ist **generative UI**: Das Modell liefert nicht nur Text als Antwort; es hilft zu entscheiden, welche Benutzeroberfläche der Nutzer gerade benötigt. Manchmal bedeutet das, ein Tool aufzurufen und eine vorgefertigte Karte zu rendern. Manchmal bedeutet es, eine bekannte Workflow‑Komponente mit frischen Daten zu füllen. Manchmal bedeutet es, ein temporäres Dashboard, Formular, Vergleichstabelle, Diagramm oder interaktives Widget zusammenzustellen.

Leider ist „generative UI“ zu einem dieser Begriffe geworden, der vor dem Frühstück bereits fünf verschiedene Bedeutungen hat.

Menschen benutzen es, um zu beschreiben:

- a model choosing from developer-defined React components  
- a JSON spec that the frontend renders into native components  
- an iframe app returned from an MCP tool  
- a chat UI library that supports tool calls  
- an agent protocol that streams state between backend and frontend  
- a design-time code generator like v0, Lovable, Bolt, or Cursor  
- a model literally writing HTML, SVG, Canvas, or React at runtime  

Diese Punkte hängen zusammen, gehören aber nicht zur selben Schicht. Wenn man sie verwischt, wird jedes Architektur‑Gespräch zu einer undurchsichtigen Suppe.

Das ist die Karte, die ich gerne gehabt hätte, als ich das aktuelle Stack‑Setup zum ersten Mal verglich.

![Eine geschichtete Karte der LLM‑generativen UI‑Landschaft](../landscape-map.webp)

## Das Kernmissverständnis

Der größte Fehler besteht darin, „generative UI“ als eine einzige Technologieentscheidung zu behandeln.

Es ist sinnvoller, das Problem in vier Schichten zu zerlegen:

1. **Produkt‑Shell**: das, was die Nutzer berühren. Das kann ein Chat, ein Seiten‑Leisten‑Copilot, ein Dashboard, ein Workflow‑Builder, ein IDE‑Panel, eine ChatGPT‑App, ein mobiler Bildschirm oder eine Support‑Konsole sein.  
2. **UI‑Kompositionsmodell**: die Grammatik, die dem Modell erlaubt ist zu sprechen. Das können Tool‑Aufrufe, JSON, A2UI, json‑render, OpenUI Lang, Hashbrown‑Komponentenauswahl oder sandboxed HTML sein.  
3. **Runtime und Transport**: wie Nachrichten, Tool‑Aufrufe, Zustands‑Deltas, Nutzer‑Aktionen und UI‑Artefakte zwischen Agent und Frontend fließen. AG‑UI, MCP Apps, Apps SDK, A2A, SSE, WebSockets und das gute alte HTTP gehören hierher.  
4. **Agent‑ und Tool‑Backend**: LangGraph, Google ADK, CrewAI, Mastra, LlamaIndex, Pydantic AI, Agno, OpenAI Agents SDK, benutzerdefinierte Funktionen, Datenbanken, Retrieval und die ganze langweilige Business‑Logik, die trotzdem korrekt sein muss.

Sobald man die Schichten getrennt hat, wirkt das Ökosystem viel weniger mystisch.

[AG-UI](https://github.com/ag-ui-protocol/ag-ui) ist nicht wirklich ein Konkurrent zu [A2UI](https://github.com/google/A2UI). AG-UI ist ein Ereignis‑Protokoll für die Interaktion Agent‑zu‑Anwendung. A2UI ist ein deklaratives UI‑Format, das der Agent senden kann. Man kann A2UI über AG-UI legen. Man kann auch benutzerdefinierte, vom Tool gerenderte Komponenten über AG-UI legen.

[json-render](https://github.com/vercel-labs/json-render) ist kein Chat‑Produkt. Es ist ein Komponenten‑Katalog und eine Renderer‑Architektur: definiere die Komponenten, die das Modell verwenden darf, lasse das Modell einen gültigen JSON‑Baum ausgeben und rendere diesen Baum sicher.

[CopilotKit](https://github.com/CopilotKit/CopilotKit) ist nicht nur eine Chat‑Blase. Es ist ein Frontend‑Stack für agent‑native Apps: Chat‑UI, generative UI, geteilten Zustand, Frontend‑Tools und Human‑in‑the‑Loop‑Flows.

[OpenAI Apps SDK](https://developers.openai.com/apps-sdk) und [MCP Apps](https://github.com/MCP-UI-Org/mcp-ui) sind keine „mach meine React‑App dynamisch“‑Werkzeuge. Sie sind Host‑Integrationsmodelle zum Rendern von Widgets innerhalb von ChatGPT oder anderen MCP‑kompatiblen Hosts.

Die Namen sind verwirrend, weil das Feld noch jung ist. Die Schichten bleiben das nützliche Gerüst.

## Das Kontroll‑Spektrum

Generative UI ist ein Kompromiss zwischen **Entwicklerkontrolle** und **Agenten‑Freiheit**.

Zu viel Kontrolle und der Assistent wirkt wie eine Befehls‑Palette im Kostüm. Zu viel Freiheit und das Modell beginnt, seltsame Layouts, vage Buttons, kaputte visuelle Hierarchien, unmögliche Zustände und Sicherheitsprobleme mit einem selbstsicheren Grinsen zu erfinden.

Der Trick besteht darin, die kleinste Menge an Freiheit zu wählen, die das Nutzerproblem löst.

![Ein Spektrum von tool-gerenderten Komponenten bis hin zu offen generiertem HTML](.././control-spectrum.webp)

Ich betrachte das Spektrum so:

**Tool‑zu‑Komponente‑Rendering** ist die sicherste Voreinstellung. Das Modell ruft `get_weather`, `search_products`, `compare_plans` oder `draft_invoice` auf. Die App mappt das Tool‑Ergebnis auf eine Komponente, die Sie bereits besitzen: `WeatherCard`, `ProductGrid`, `PlanComparison`, `InvoiceReview`. Das Modell entscheidet *wann* die UI nützlich ist. Entwickler behalten Layout, Styling, Barrierefreiheit, Lade‑ und Leerezustände sowie riskante Aktionen.

Dieses Muster ist in der [generative UI‑Anleitung des Vercel AI SDK](https://ai-sdk.dev/docs/ai-sdk-ui/generative-user-interfaces) dokumentiert: Das Modell ruft ein Tool auf, das Tool liefert Daten, und die UI rendert aus dem Ergebnis eine Komponente. Es ist auch das mentale Modell hinter vielen CopilotKit‑ und assistant‑ui‑Implementierungen.

**Deklarative Komponenten‑Kataloge** geben dem Modell mehr Spielraum. Anstatt eine einzelne Komponente zu wählen, komponiert das Modell einen Baum aus erlaubten Teilen. Ein Katalog könnte `Metric`, `Table`, `Chart`, `FilterBar`, `ApprovalPanel` und `Timeline` enthalten. Das Modell kann ein Dashboard oder einen Workflow‑Schritt zusammenstellen, aber es kann keinen beliebigen Code ausführen. Hier finden sich [A2UI](https://github.com/google/A2UI), [json‑render](https://github.com/vercel-labs/json-render), [Hashbrown](https://github.com/liveloveapp/hashbrown) und [OpenUI](https://github.com/thesysdev/openui).

**Iframe‑Mini‑Apps** machen Sinn, wenn die UI reicher sein muss als ein Komponenten‑Baum oder wenn ein entfernter Tool‑Anbieter die Erfahrung besitzt. MCP‑Apps und das OpenAI Apps SDK lassen ein Tool strukturierte Daten plus eine Widget‑Ressource zurückgeben, die der Host in einem iframe rendert. Das ist leistungsfähig für Karten, Warenkörbe, Buchungsabläufe, Diagramme und externe Produkt‑Oberflächen. Gleichzeitig entsteht eine härtere Grenze zwischen Host‑App und Widget.

**Open-ended‑Generierung** ist das äußerste Ende: Der Agent gibt HTML, SVG, Canvas, WebGL oder andere code‑ähnliche Artefakte in eine Sandbox aus. [OpenGenerativeUI](https://github.com/CopilotKit/OpenGenerativeUI) ist das derzeit beste Beispiel: Der Agent kann Algorithmus‑Visualisierungen, 3D‑Szenen, Diagramme und Simulationen innerhalb sandbox‑basierter iframes erzeugen. Das ist ideal für einmalige visuelle Erklärungen, aber nicht der Einstiegspunkt für einen unternehmensweiten Genehmigungs‑Workflow.

Es hilft, die zentrale Unterscheidung zu benennen: **iframe‑HTML** (das Modell schreibt Code in eine Sandbox) vs. **JSON‑Katalog** (das Modell gibt eine strukturierte Spezifikation aus und Ihr Renderer mappt sie auf vorgefertigte Komponenten). Diese Begriffe klingen verwandt, haben aber sehr unterschiedliche Risiko‑ und Komplexitätsprofile. Iframe‑HTML ist maximal ausdrucksstark; die iframe‑Grenze übernimmt die Sicherheitsarbeit. JSON‑Katalog lässt dem Modell keinerlei ausführbare Freiheit – es kann nur auf von Ihnen im Voraus definierte Komponententypen verweisen. Die meisten Frameworks in diesem Bereich lassen sich klar einem der beiden Lager zuordnen.

**Jenseits der Sandbox**: Sehr aktuelle Demos deuten an, dass ein vierter Modus entsteht – LLMs steuern spiel‑ähnliche oder immersive Erlebnisse, indem sie die visuelle Ausgabe direkter beeinflussen als jeder Komponentenkatalog es zulässt. Projekte, die erkundbare 3D‑Welten aus Prompt‑Eingaben generieren, LLM‑gesteuertes NPC‑Verhalten zur Laufzeit, und In‑Browser‑Modell‑Inference via WebGPU ([WebLLM](https://mlc.ai/web-llm/)) sind frühe Anzeichen. Es gibt noch keine stabilen Frameworks, mit denen man produktiv arbeiten könnte. Ich werde diese Richtung in einem eigenen Artikel behandeln, sobald sich das ändert.

## High‑Level‑Komponenten vs. Granulare Komponenten

Dies ist die wichtigste Design‑Entscheidung.

Wenn Ihr Katalog zu granular ist, muss das Modell zum Front‑End‑Ingenieur werden:

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

Das wirkt flexibel, aber jetzt muss das Modell Abstand, Hierarchie, Gruppierung, leere Zustände, Button‑Beschriftungen, Fehlermanagement und responsives Verhalten entscheiden. Außerdem wird der Prompt größer und die Ausgabe leichter zu zerlegen.

Wenn Ihr Katalog zu abstrakt ist, steckt das Modell fest:

```tsx
WeatherCard
StockCard
HotelCard
```

Das ist sicher, funktioniert aber nur für bekannte Szenarien. Das Modell kann keine Vergleichsmatrix erstellen, fehlende Eingaben anfordern oder die Informationsarchitektur anpassen, wenn sich die Nutzerfrage ändert.

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

Diese Komponenten kodieren Produktgeschmack und geschäftliche Vorgaben. Das Modell entscheidet, *was angezeigt werden soll*, nicht jedoch jede CSS‑Entscheidung.

Zum Beispiel braucht ein Reisebüro nicht `div`, `span` und `button`. Es braucht:

- `TripSummary`  
- `FlightOptionList`  
- `HotelComparison`  
- `TravelerForm`  
- `PolicyNotice`  
- `BookingConfirmation`

Ein Finanz‑Agent benötigt keinen generischen Chart‑Playground. Er braucht:

- `PortfolioSnapshot`  
- `TransactionTable`  
- `RiskBreakdown`  
- `ScenarioComparison`  
- `ApprovalGate`

Der Katalog sollte nach Ihrem Produkt klingen, nicht nach HTML.

## Feature‑Tabelle

Diese Tabelle ist bewusst meinungsstark. Sie betrachtet jedes Projekt als ein Werkzeug im Stack, nicht als ein Alles‑oder‑Nichts‑Plattform.

| Technologie | Schicht | Am besten geeignet | UI‑Modell | Streaming / Zustand | Hinweise und Beispiele |
| --- | --- | --- | --- | --- | --- |
| [AG-UI](https://github.com/ag-ui-protocol/ag-ui) | Laufzeit‑Protokoll | Verbindung von Agent‑Backends mit Frontend‑Apps | Ereignisse für Nachrichten, Werkzeuge, Zustand, Aktivität, Unterbrechungen | Ja; Ereignis‑Stream plus Zustands‑Snapshots/Deltas | Verwenden, wenn ein standardisierter Agent‑zu‑App‑Kanal nötig ist. Ergänzt MCP und A2A, ersetzt sie nicht. |
| [A2UI](https://github.com/google/A2UI) | Deklaratives UI‑Protokoll | Plattformübergreifende, vom Agenten erzeugte native UI | JSON‑Payload, das Komponenten, Datenmodell und Updates beschreibt | Für inkrementelle Updates konzipiert | Starke Wahl für Remote‑Agenten und Vertrauensgrenzen. Frühe öffentliche Vorschau, aber konzeptionell sauber. |
| [json-render](https://github.com/vercel-labs/json-render) | Komponenten‑Katalog und Renderer | Das Modell komponiert genehmigte Komponenten | JSON‑Baum, eingeschränkt durch einen typisierten Katalog | Unterstützt progressives Rendering | Geeignet für React, Vue, Svelte, Solid, React Native, E‑Mail, PDF, Remotion, Terminal und mehr. |
| [CopilotKit](https://github.com/CopilotKit/CopilotKit) | Produktschale und Agent‑UI‑Framework | In‑App‑Copiloten, geteilter Zustand, Frontend‑Werkzeuge, HITL | Werkzeug‑Rendering, AG-UI, A2UI, MCP‑Apps‑Muster | Ja | Einer der umfassendsten Stacks zum „Build agent‑native apps“. Siehe [generative‑ui examples](https://github.com/CopilotKit/generative-ui). |
| [OpenGenerativeUI](https://github.com/CopilotKit/OpenGenerativeUI) | Offene UI‑Generierung‑Showcase | Visuelle Erklärungen, Diagramme, Simulationen, Charts | Agent gibt HTML / SVG / Canvas in sandboxed Iframes aus | Progressives visuelles Rendering | Nutzen, wenn dynamische Artefakte benötigt werden und ein fester Komponenten‑Katalog zu einschränkend ist. |
| [MCP Apps / mcp-ui](https://github.com/MCP-UI-Org/mcp-ui) | Host/Widget‑Standard | Werkzeug‑Anbieter liefern interaktive UI über MCP | HTML‑Ressource, verlinkt aus Werkzeug‑Metadaten | Host‑Bridge und Widget‑Aktionen | Am besten, wenn die UI einem Werkzeug‑Anbieter gehört oder iframe‑Isolation erfordert. |
| [OpenAI Apps SDK](https://developers.openai.com/apps-sdk) | ChatGPT‑App‑Host‑Integration | Eigene ChatGPT‑App‑Widgets bauen | MCP‑Server‑Tools plus iframe UI‑Komponenten | Werkzeug‑Eingabe/Ergebnis, Widget‑Zustand, Folge‑Nachrichten | Neue ChatGPT‑Apps sollten MCP‑Apps‑Felder und die `ui/*`‑Bridge bevorzugen, mit `window.openai` für Kompatibilität/Erweiterungen. |
| [Vercel AI SDK UI](https://ai-sdk.dev/docs/ai-sdk-ui/generative-user-interfaces) | App‑SDK und Chat‑Zustand | Benutzerdefinierter App‑Chat, Werkzeug‑Aufrufe, Streaming‑Nachrichtenteile | Werkzeug‑Ergebnisse als React‑Komponenten rendern | Ja, via `useChat` und UI‑Nachrichten‑Streams | Solider Ausgangspunkt, wenn Sie bereits die App besitzen und tiefere Kontrolle wollen. Kombinieren Sie es mit [AI Elements](https://elements.ai-sdk.dev/) für UI‑Primitiven. |
| [assistant-ui](https://github.com/assistant-ui/assistant-ui) | React‑Chat‑Primitives | Produktions‑Chat‑UX mit eigenem Rendering | Zusammensetzbare Chat‑Primitives, Werkzeug‑Aufruf‑Rendering, JSON als Komponenten | Ja | Starke Wahl, wenn Sie ein poliertes Chat‑Erlebnis benötigen, aber das Backend selbst bereitstellen wollen. |
| [LangGraph Generative UI](https://docs.langchain.com/langgraph-platform/generative-ui-react) | Agent‑Plattform‑Integration | UI‑Komponenten zusammen mit Graph‑Code lokalisieren | Graph sendet benannte UI‑Nachrichten, die von React‑Komponenten gerendert werden | Ja, inkl. benutzerdefinierter Stream‑Events | Natürliche Passform für LangGraph‑Deployments und graph‑eigene UI‑Komponenten. |
| [Hashbrown](https://github.com/liveloveapp/hashbrown) | Frontend‑GenUI‑Framework | React/Angular‑Apps, die Komponenten und client‑seitige Werkzeuge bereitstellen | LLM wählt und rendert erlaubte App‑Komponenten | Unterstützt Streaming‑Muster | Gut geeignet, um Intelligenz direkt in Produkt‑Oberflächen einzubetten, nicht nur im Chat. |
| [OpenUI](https://github.com/thesysdev/openui) | Kompakte UI‑Sprache und Runtime | Streambare, modellgenerierte UI mit weniger Tokens als JSON | OpenUI‑Sprache plus React‑Runtime und Komponenten‑Bibliotheken | Für Token‑Streaming konzipiert | Interessant, wenn JSON‑Verbosity zum Engpass wird. Noch jung, aber Beobachtungswert. |
| [Tambo](https://github.com/tambo-ai/tambo) | React‑generative UI‑SDK | Komponenten‑Auswahl, zustandsbehaftete Komponenten, client‑seitige Werkzeug‑Ausführung | KI wählt Komponenten und interagiert mit Client‑Werkzeugen | Zustands‑orientiert | Populäre OSS‑React‑Option, fokussiert auf automatische Komponenten‑Orchestrierung. |
| [llm-ui](https://llm-ui.com/) | Ausgabe‑Renderer | Glattere LLM‑Textausgabe mit benutzerdefinierten Inline‑Komponenten | Parsen von Modell‑Ausgabe‑Strings zu React‑Rendering | Glattes Token‑Rendering | Nützlich für leichte, benutzerdefinierte Komponenten innerhalb von Text‑Streams; kein vollständiges Agent‑UI‑Protokoll. |
| AI SDK RSC / React Server Components | Älteres Muster / Framework‑Feature | Server‑gerenderte Komponenten‑Streams in Next.js | Modell/Werkzeug‑Flow liefert server‑gerenderte UI | Ja, aber frameworkspezifisch | Entwicklung im Okt 2024 pausiert ([Discussion #3251](https://github.com/vercel/ai/discussions/3251)); nicht der empfohlene Weg. Auf `useObject` oder json-render migrieren. |

## Was für welches Produkt verwenden

Hier ist die Empfehlungsmatrix, die ich tatsächlich mit einem Team einsetzen würde.

**Sie fügen einem bestehenden SaaS‑Produkt einen Assistenten hinzu.**

Beginnen Sie mit Werkzeug‑zu‑Komponente‑Rendering. Nutzen Sie [Vercel AI SDK UI](https://ai-sdk.dev/docs/ai-sdk-ui/generative-user-interfaces), [assistant‑ui](https://github.com/assistant-ui/assistant-ui) oder [CopilotKit](https://github.com/CopilotKit/CopilotKit), je nachdem, wie viel Agent‑Zustand und Frontend‑Werkzeug‑Integration Sie benötigen. Halten Sie den Katalog anfangs klein. Rendern Sie Produkt‑Komponenten, denen Sie bereits vertrauen.

**Sie bauen einen ernsthaften In‑App‑Copilot, der geteilten Zustand benötigt.**

Schauen Sie sich CopilotKit zusammen mit AG‑UI genau an. Das entscheidende Merkmal ist nicht „Chat“, sondern geteilter Zustand und bidirektionale Interaktion: Der Agent kann Eingaben anfordern, UI rendern, den Zustand aktualisieren und auf Genehmigung warten.

**Sie haben entfernte Agenten, die UI über eine Grenze senden müssen.**

Verwenden Sie A2UI oder ein A2UI‑ähnliches deklaratives Protokoll. Der Kernpunkt ist, dass ein entfernter Agent UI als Daten beschreiben kann, während der Host die Kontrolle über native Darstellung, Sicherheit und Stil behält. Wenn Sie zudem eine Live‑Interaktion zwischen Agent und Anwendung benötigen, betreiben Sie sie über AG‑UI oder das Transport‑Protokoll, das Ihre Umgebung standardisiert.

**Sie entwickeln innerhalb von ChatGPT oder einem MCP‑kompatiblen Host.**

Nutzen Sie MCP‑Apps und den Apps‑SDK‑Pfad. Die aktuellen OpenAI‑Dokumente empfehlen die MCP‑Apps‑Brücke `ui/*` für neue Entwicklungen, während `window.openai` als Kompatibilitätsschicht und optionale Erweiterungsfläche erhalten bleibt. Kopieren Sie außerdem die Aufteilung zwischen Daten‑Tools und Render‑Tools: Lassen Sie das Modell Daten abrufen und verarbeiten, bevor es entscheidet, ein Widget zu rendern.

**Sie wollen natürlichsprachliche Dashboards, Berichte oder Formulare in Ihrer eigenen Anwendung.**

Versuchen Sie es mit **json-render**, **Hashbrown** oder **OpenUI**. Der entscheidende Faktor ist der Katalog. Wenn Sie `LineChart`, `DataTable`, `MetricGroup`, `FilterControl` und `InsightCallout` bereitstellen, kann das Modell nützliche Reporting‑Oberflächen zusammenstellen, ohne an beliebigen Code zu geraten.

**Sie benötigen pädagogische, visuelle oder stark maßgeschneiderte Artefakte.**

Verwenden Sie eine offene Sandbox wie **OpenGenerativeUI**. Lassen Sie das Modell SVG, Canvas, WebGL oder eigenständiges HTML erzeugen, behandeln Sie die Ausgabe jedoch wie untrusted User‑Content. Sandboxing, Größenbegrenzung, Entfernen von Berechtigungen und das Fernhalten von privilegierten Anwendungs‑State sind Pflicht.

**Sie brauchen hauptsächlich hübsches, gestreamtes Markdown mit wenigen Inline‑Erweiterungen.**

Überbauen Sie nicht. Werkzeuge wie **llm-ui** oder **assistant-ui** für das Rendering können ausreichen.

## Die Fehler, die ich vermeiden würde

**Fehler 1: Das Modell zur Laufzeit Produktions‑React schreiben lassen.**

Es gibt Ausnahmen, aber für Produkt‑UIs ist das in der Regel die falsche Vorgabe. Das Generieren von Code zur Laufzeit ist schwer zu sichern, schwer zu testen, schwer zu thematisieren und schwer barrierefrei zu halten. Wenn das Modell die Aufgabe erledigen kann, indem es aus vertrauenswürdigen Komponenten wählt, tun Sie das.

**Fehler 2: Design‑Primitiven statt Produkt‑Primitiven aussetzen.**

Wenn Sie dem Modell `Row`, `Column`, `Text` und `Button` geben, verlangen Sie, dass es Ihr Design‑System wird. Es wird ein mittelmäßiges werden. Geben Sie ihm höherstufige Produkt‑Nomen.

**Fehler 3: Denken, dass gültiges JSON sichere UI bedeutet.**

Ein Payload kann die Schemainvalidierung bestehen und dennoch manipulativ oder gefährlich sein. Das Label kann „Rechnung anzeigen“ sagen, während die Aktion das Konto archiviert. Betrachten Sie UI‑Spezifikationen als Verhalten, nicht als Dekoration. Sie benötigen Richtlinien‑Tests, semantische Prüfungen und menschliche Bestätigung für folgenschwere Aktionen.

**Fehler 4: Geschäftslogik in Render‑Tools verlagern.**

Render‑Tools sollten rendern. Daten‑Tools sollten abrufen, berechnen, mutieren und validieren. Die OpenAI‑Apps‑SDK‑Dokumentation weist aus gutem Grund auf diese Trennung hin: Wenn jedes Daten‑Tool gleichzeitig ein Widget mitzieht, bleibt dem Modell weniger Spielraum zum Nachdenken, bevor es etwas präsentiert.

**Fehler 5: Auf Neuheit optimieren statt auf Aufgabenerfüllung.**

Ziel ist nicht, jede Antwort zu einer Schneeflocken‑Oberfläche zu machen. Ziel ist, Reibung zu reduzieren. Ein stabiles, langweiliges Genehmigungs‑Panel, das dem Nutzer vier Minuten spart, ist besser als ein funkelndes, generiertes Dashboard, dem man nicht zweimal vertrauen kann.

## Eine praxisnahe Architektur

Würde ich heute ein neues Produkt starten, würde ich einen gestuften Ansatz wählen:

1.  **Zuerst eine gesteuerte Tool‑UI ausliefern.** Bekannte Werkzeuge bekannten Komponenten zuordnen. Jeden Tool‑Aufruf, jedes UI‑Rendern und jede Nutzeraktion protokollieren.  
2.  **Ein Domänen‑Katalog hinzufügen.** Sobald Muster wiederkehren, `ComparisonTable`, `DecisionPanel`, `DataCollectionForm`, `Timeline` und andere produktspezifische Komponenten bereitstellen.  
3.  **Transport‑Standardisierung nur bei Bedarf einführen.** Wenn Sie sowohl Front‑ als auch Backend besitzen, kann einfaches Streaming ausreichen. Haben Sie mehrere Agent‑Frameworks, nutzen Sie AG‑UI. Wenn Werkzeuge Produktgrenzen überschreiten, verwenden Sie MCP. Wenn Agenten Organisationsgrenzen überschreiten, achten Sie auf A2A und A2UI.  
4.  **Iframe‑Widgets für fremde oder komplexe Oberflächen einsetzen.** Karten, Warenkörbe, Buchungsabläufe und Drittanbieter‑Mini‑Apps gehören hinter eine Grenze.  
5.  **Offene Generierung für Artefakte reservieren.** Diagramme, Simulationen, temporäre Erklärungen und visuelle Notizblöcke passen gut. Kern‑Workflows nicht.

Die Architektur sieht dann folgendermaßen aus:

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

Diese Schleife ist das eigentliche Produkt. Das Chat‑Fenster ist lediglich ein mögliches Eingabegerät.

## Bewertung muss die UI einschließen

LLM‑Teams lernen langsam, Prompt‑ und Model‑Ausgaben zu evaluieren. Generative UI fügt eine weitere Angriffsfläche hinzu: Die Schnittstelle selbst kann fehlerhaft sein.

Mindestens sollten diese Artefakte für jede generierte UI gespeichert werden:

- Prompt‑ und Tool‑Kontext  
- Tool‑Aufrufe und Tool‑Ergebnisse  
- Generierte UI‑Spezifikation oder Komponenten‑Auswahl  
- Gerenderter Komponenten‑Name und Props  
- Nutzer‑sichtbare Beschriftungen  
- Aktionen, die an Buttons/Formularen hängen  
- Vom Modell sichtbare Zustands‑Updates aus der UI  
- Verlauf der Nutzeraktionen  

Dann Prüfungen formulieren, etwa:

- Jede destruktive Aktion muss eine Bestätigungs‑Komponente besitzen  
- Button‑Beschriftungen müssen zur Semantik der Aktion passen  
- Render‑Spezifikationen dürfen nur zulässige Komponenten referenzieren  
- Nutzer‑sichtbare Summen müssen mit den Summen aus den Tool‑Ergebnissen übereinstimmen  
- Formulare dürfen keine Felder anfordern, die außerhalb des Aufgaben‑Scopes liegen  
- Widgets dürfen keine Geheimnisse erhalten, die nur das Modell benötigt hat  
- Versteckte Metadaten dürfen nicht den sichtbaren Beschriftungen widersprechen  

Das klingt mühsam. Genau hier entsteht das Vertrauen in die Produktion.

## Die Links, mit denen ich beginnen würde

Wenn Sie vom Artikel zum Code springen wollen, sind dies die besten Einstiegspunkte, die ich gefunden habe:

- [AG-UI‑Repo](https://github.com/ag-ui-protocol/ag-ui) und [AG-UI‑Docs](https://docs.ag-ui.com/introduction) zum Laufzeit‑Ereignismodell.  
- [A2UI‑Repo](https://github.com/google/A2UI) und [A2UI‑Spezifikation](https://a2ui.org/specification/v0.9-a2ui/) für deklarative Agent‑zu‑UI‑Payloads.  
- [json‑render‑Repo](https://github.com/vercel-labs/json-render) und [json‑render‑Docs](https://json-render.dev/) für katalog‑gesteuerte JSON‑UI‑Generierung.  
- [CopilotKit‑Repo](https://github.com/CopilotKit/CopilotKit) und [generative‑ui‑Beispiele](https://github.com/CopilotKit/generative-ui) für AG‑UI, A2UI, Open‑JSON‑UI und MCP‑Apps‑Muster.  
- [OpenGenerativeUI](https://github.com/CopilotKit/OpenGenerativeUI) für sandboxed HTML/SVG/Canvas‑Visuelle Artefakte.  
- [MCP‑UI / MCP Apps SDK](https://github.com/MCP-UI-Org/mcp-ui) für UI‑Ressourcen über MCP.  
- [OpenAI Apps SDK‑Docs](https://developers.openai.com/apps-sdk) und [Apps SDK‑Beispiele](https://github.com/openai/openai-apps-sdk-examples) für ChatGPT‑App‑Widgets.  
- [Vercel AI SDK generative UI‑Leitfaden](https://ai-sdk.dev/docs/ai-sdk-ui/generative-user-interfaces) und [AI Elements](https://elements.ai-sdk.dev/) für app‑eigene Chat/Tool‑Renderings.  
- [assistant‑ui](https://github.com/assistant-ui/assistant-ui) für komponierbare React‑Chat‑Primitives.  
- [LangGraph generative UI‑Docs](https://docs.langchain.com/langgraph-platform/generative-ui-react) für vom Graphen ausgesendete UI‑Komponenten.  
- [Hashbrown](https://github.com/liveloveapp/hashbrown) für React/Angular‑Komponentenauswahl und client‑seitige Werkzeuge.  
- [OpenUI](https://github.com/thesysdev/openui) für kompakte, streaming‑first, modell‑generierte UI.  
- [Tambo](https://github.com/tambo-ai/tambo) für React‑generative UI mit zustandsbehafteten Komponenten.  
- [llm‑ui](https://llm-ui.com/) für flüssige Text‑Streams mit benutzerdefinierten Inline‑Komponenten.

## Hinweis zur Projektstabilität

Jedes größere Protokoll in diesem Bereich befindet sich noch vor Version 1.0. Zuletzt geprüft am 8. Mai 2026; rechnen Sie mit Änderungen und prüfen Sie die aktuelle Dokumentation, bevor Sie eine Plattform‑Entscheidung treffen.

**Vercel AI SDK RSC** — das ursprüngliche „Generative UI“ Headline‑Feature — wurde im Oktober 2024 pausiert ([Discussion #3251](https://github.com/vercel/ai/discussions/3251)) wegen architektonischer Beschränkungen, für die es keine kurzfristige Lösung gab. **json‑render** (Vercel Labs) ist als Ersatz‑Richtung entstanden: katalog‑basiert, framework‑agnostisch, ohne RSC‑Kopplung. Es hat seit dem Launch Anfang 2026 schnell die Aufmerksamkeit von Web‑Entwicklern gewonnen. Der wahrscheinliche Grund ist die Entwickler‑Erfahrung: json‑render funktioniert sofort in einem Standard‑React‑Projekt; A2UIs plattformübergreifender Anspruch erzeugt zusätzlichen Setup‑Aufwand.

**A2UI** (Google) ist ebenfalls vor Version 1.0, mit breaking changes zwischen Minor‑Versionen und inkonsistenter Roadmap‑Kommunikation. Sein Vorteil liegt im echten plattformübergreifenden Reach (Web, Flutter, SwiftUI), den json‑render nicht abdeckt. Für reine Web‑Anwendungsfälle heute scheint json‑render eine bessere Tool‑Abdeckung zu bieten; für plattformübergreifende oder Remote‑Agent‑Szenarien ist das Design von A2UI geeigneter. Eine Konvergenz der beiden Spezifikationen ist möglich — Vercel hat bereits experimentell A2UI‑kompatible Ausgaben aus json‑render erzeugt.

**AG‑UI** (CopilotKit) ist ebenfalls vor Version 1.0. Die häufigste Verwirrung betrifft den Namen: AG‑UI ist ein Transport‑Protokoll, kein UI‑Framework. Es definiert *wie* Ereignisse zwischen Agent und Frontend fließen; was Sie rendern, bleibt Ihre Entscheidung. Das Konzept ist solide und wird breit angenommen. Die Spezifikation befindet sich noch in der Weiterentwicklung.

## My Take

Generative UI wird sorgfältig gestaltete Produktoberflächen nicht ersetzen. Sie wird die faule Annahme verdrängen, dass ein Chat‑Transkript die universelle Schnittstelle für KI ist.

Die besten Systeme lassen das Modell nicht alles frei improvisieren. Sie geben ihm ein kleines, präzises Set produkt­eigener Bausteine; eine zuverlässige Runtime‑Verbindung; klare Sicherheitsgrenzen; und genug Freiheit, die Oberfläche an die jeweilige Aufgabe anzupassen.

Die Zukunft ist nicht „das Modell schreibt dein Frontend“.

Die Zukunft nähert sich eher: **Dein Frontend wird zu einem Instrument, das der Agent spielen kann, aber du entscheidest, wie das Instrument klingen darf.**
````
