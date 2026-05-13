# Translation Candidate
- Slug: llm-generative-ui-landscape-2026
- Locale: it
- Model: openrouter/qwen/qwen3-32b:nitro
- Target: src/content/posts/2026-05-10--llm-generative-ui-landscape-2026/it/index.mdx
- Validation: deferred
- Runtime seconds: 106.11
- Input tokens: 47725
- Output tokens: 45105
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- Estimated cost: $0.014643
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
title: Panorama GenUI per modelli LLM v2
subTitle: >-
  Dal rendering dallo strumento al componente alla generazione aperta — una
  mappa di ogni approccio e quando ciascuno giustifica la sua complessità.
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
"Generative UI" significa almeno cinque concetti distinti a seconda di chi lo afferma.

- Interfacce di chat che incorporano schede prodotto da chiamate a strumenti del modello  
- Specifiche JSON in tempo di esecuzione che il frontend rende come alberi di componenti  
- Iframe isolati restituiti dagli strumenti MCP nelle app ospiti (dall'ordinazione di biglietti, prenotazione hotel fino alla visualizzazione delle mappe, widget di checkout)  
- Protocolli di eventi che trasmettono lo stato dell'agente al frontend  
- v0, Lovable e Bolt: strumenti IA che scrivono React in fase di progettazione  

Questi sono concetti correlati, ma risiedono in strati diversi dello stack e presentano profili di rischio diversi, costi di implementazione diversi e casi d'uso appropriati diversi. Confonderli trasforma ogni discussione sull'architettura in un caos.

Questo è il mappatura che desidero quando devo decidere dove intervenire nello stack.

---

## Cosa "Generative UI" Non È  

Prima di definire cosa è, tre concetti da escludere:

**Generazione di codice in fase di progettazione** — v0, Lovable, Bolt, Cursor che compongono componenti React. Questi strumenti generano codice che gli sviluppatori riesaminano e committono. L'IA opera in fase di sviluppo. Ciò che viene distribuito è statico dal punto di vista dell'utente. Si tratta di una categoria utile di strumenti. Non è ciò che si intende con "Generative UI in tempo di esecuzione".

**Compilazione automatica di moduli assistita dall'IA** — il modello che riempie i valori dei campi dal contesto. La struttura dell'interfaccia rimane fissa; solo il contenuto cambia. Si tratta di uno schema utile. Non è Generative UI.

**L'IA che scrive HTML grezzo in una pagina** — il modello genera stringhe `<div>` e `<button>` che vengono iniettate tramite `innerHTML` o `dangerouslySetInnerHTML`. Questo *è* Generative UI in tempo di esecuzione nel senso più tecnico. È anche la versione più pericolosa, e proprio per questo tutti i framework maturi in questo ambito esistono per evitarla. Il markup generato direttamente dall'IA comporta rischio XSS, attributi non accessibili, stili inconsistenti e struttura inventata. Il resto di questo articolo tratta come fare meglio di questo.

---

## Una Definizione Funzionante

Generative UI in tempo di esecuzione significa: **il modello determina quale componente o composizione di componenti l'utente vede, in base allo stato della conversazione o del compito.**

Non le parole. L'interfaccia.

Il caso più semplice: il tuo assistente per la prenotazione di voli chiama uno strumento `search_flights`. Invece di restituire testo semplice ("Ecco tre opzioni..."), rende un componente `<FlightResultsCard>` con voli selezionabili, interruttori per la classe di seduta e un pulsante "Prenota". Il modello ha deciso che una card strutturata era la risposta corretta in questo caso. Lo sviluppatore ha deciso come appare questa card e cosa fa "Prenota".

Il caso più complesso: un agente di analisi finanziaria riceve una domanda su un portafoglio e decide di comporre una risposta con un `MetricGroup` che mostra numeri chiave, un grafico `RiskBreakdown`, una tabella `ScenarioComparison` e un `PolicyNotice`. Il modello ha assemblato questa layout da un catalogo di componenti approvati. Lo sviluppatore ha definito ogni componente. Il modello ha scelto quali utilizzare e quali dati inserire.

Entrambi i casi sono Generative UI. Differiscono per la quantità di libertà di composizione che il modello ha, che determina sia la ricchezza delle possibili uscite che la complessità di ciò che può andare storto.

---

## I Tre Pattern

L'intero spettro si riduce a tre pattern, ciascuno con una grammatica di output diversa.
---

![Un diagramma che mostra lo spettro di tre pattern: solo chiamate strumento a sinistra (più sicuro), catalogo componenti al centro, e generazione aperta a destra (più espressiva).](../output-grammar-spectrum.svg)

_Ogni decisione riguardante l'interfaccia generativa corrisponde a un punto su questo spettro. Inizia a sinistra._

### Modello 1: Rendering componente a partire da chiamata strumento

Il modello effettua una chiamata a uno strumento denominato. La tua applicazione ha una mappa che associa i nomi degli strumenti ai componenti. La chiamata allo strumento attiva il rendering del componente.

```tsx
// Il modello effettua la chiamata: { name: "show_flight_results", args: { flights: [...] } }

useCopilotAction({
  name: "show_flight_results",
  render: ({ args }) => <FlightResultsCard flights={args.flights} />,
});
```

Questo è il modello più sicuro perché la struttura non proviene mai dal modello. Il modello decide *quando* mostrare un componente e *che dati* popolarlo con. I tuoi sviluppatori mantengono il controllo sul codice componente, sul design visivo, sull'implementazione dell'accessibilità e su ogni caso limite nel logico di rendering.

Il `useChat` del Vercel AI SDK con gestori `tool` implementa questo approccio. Il rendering degli strumenti in `assistant-ui` segue lo stesso modello. Il "Static Generative UI" di CopilotKit è esattamente questo schema. La maggior parte delle interfacce di copilota in produzione che funzionano affidabilmente utilizza questa strategia.

**Applicabile quando**: l'insieme delle cose che potresti voler mostrare è noto in fase di sviluppo. Conferme di prenotazione, risultati di ricerca, riepiloghi account, widget di approvazione. Se puoi elencare gli scenari, questo modello li copre tutti.

### Modello 2: Composizione tramite catalogo componenti

Il modello emette un albero JSON tipizzato che fa riferimento a componenti definiti in un catalogo sviluppato dagli sviluppatori. Il frontend ha un renderer che percorre l'albero e istanzia ciascun componente.

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

Il modello ha composto quella struttura. Un `MetricGroup`, un `LineChart`, un `InsightCallout`. Ma hai definito tu cosa significa ciascun tipo di componente, quali proprietà accetta e come si rende. Se il modello tenta di emettere `{ "type": "custom_untested_thing" }`, la validazione dello schema lo intercetta e il renderer lo ignora o lo rifiuta.

Questo è il pattern dietro a `json-render`, `A2UI`, `Hashbrown`, `OpenUI` e `Tambo`. Il lavoro ingegneristico chiave è la **progettazione del catalogo** — decidere quali tipi di componenti esistono, come appaiono i loro schemi e cosa il modello può o non può comporre.

**Appropriato quando**: la struttura di ciò che desideri mostrare varia legittimamente in base ai dati o alla richiesta dell'utente. Dashboard che si adattano a ciò che è rilevante nei dati. Report che mostrano sezioni diverse in base al contesto. Pannelli di workflow che cambiano in base a quale passo sta eseguendo un agente.

### Pattern 3: Generazione aperta

Il modello scrive HTML, SVG, Canvas o WebGL che vengono renderizzati all'interno di un iframe isolato con una Content Security Policy (CSP) rigorosa.

Questo è appropriato per cose dove nessun catalogo di componenti fisso funzionerebbe: visualizzazioni di algoritmi, diagrammi architetturali, grafici ad hoc, arte generativa, simulazioni educative. Il confine dell'iframe sta facendo il lavoro di sicurezza qui; rimuovilo e ti ritrovi con il problema dell'iniezione di HTML grezzo menzionato all'inizio di questo articolo.

`CopilotKit/OpenGenerativeUI` è l'implementazione di riferimento migliore per questo pattern. Il sandbox elimina gli script, limita il passaggio di messaggi e mantiene l'oggetto generato lontano dallo stato privilegiato della tua applicazione.

**Appropriato quando**: hai realmente bisogno di output visivo arbitrario — diagrammi esplicativi one-off, simulazioni dinamiche, arte creativa. Non usare questo per interfacce transazionali. Una conferma di acquisto non necessita di un iframe isolato.

### Oltre i tre pattern: LLM che guidano i pixel direttamente

C'è una quarta direzione emergente che non si adatta facilmente a nessuno di questi pattern: i LLM che guidano **esperienze immersive, simili a giochi**, controllando l'output visivo in modo più diretto di un iframe isolato.

La distinzione canonica all'interno dell'UI generativa è **iframe HTML vs. catalogo JSON**:

- **Iframe HTML** — il modello genera HTML, SVG, Canvas o WebGL che vengono eseguiti in un ambiente isolato. Massima libertà espressiva; la sicurezza dipende interamente dal confine dell'iframe. Esempi: Anthropic Artifacts, OpenGenerativeUI.  
- **Catalogo JSON** — il modello produce un payload strutturato vincolato a un catalogo di componenti definito dagli sviluppatori; il tuo renderer istanzia componenti attendibili, pre-costruiti da quella specifica. Il modello decide *cosa* mostrare; tu decidi *come* renderizzarlo. Esempi: json-render, A2UI.  

Oltre a questi, dimostrazioni recentissime suggeriscono una terza modalità in cui il modello non sceglie componenti né genera HTML isolato — ma guida il canvas in modo più diretto. Progetti come [Tencent's HunyuanWorld](https://arxiv.org/abs/2502.01999), che genera ambienti 3D esplorabili da un'unica immagine, e architetture di giochi in cui gli LLM generano mappe, NPC e missioni in tempo reale invece di richiamare un catalogo di componenti, suggeriscono un futuro in cui il modello funziona più come un regista di gioco che come un renderer di form. L'inferenza LLM nel browser tramite WebGPU ([WebLLM](https://mlc.ai/web-llm/)) sta spingendo lo stesso confine localmente.  

Questo territorio è effettivamente entusiasmante ed effettivamente all'inizio. Non esistono ancora framework stabili per costruire prodotti di produzione. Tratterò questo approccio in un articolo dedicato non appena cambierà questa situazione.  

---

## L'Ecosistema Completo  

![Un diagramma a quattro livelli che mappa ogni strumento principale per l'UI generativa: protocolli (AG-UI, A2UI, MCP Apps) in cima, gusci JavaScript successivi (CopilotKit, Vercel AI SDK, assistant-ui, LangGraph), quindi strumenti JavaScript per il catalogo (json-render, Hashbrown, OpenUI, Tambo), infine strumenti Python in basso (Gradio, Streamlit, LangChain, Haystack).](../full-stack-map.svg)  

_Quattro livelli. I protocolli definiscono il formato del segnale. I gusci applicativi gestiscono lo stato e il rendering. Gli strumenti del catalogo vincolano ciò che il modello può generare. Gli strumenti Python rappresentano un percorso parallelo per flussi di lavoro dati e ML._  

---

## I Protocolli: AG-UI e A2UI  

AG-UI e A2UI sono gli standard principali nel livello dei protocolli. Risolvono problemi diversi e non sono concorrenti.

### AG-UI

**GitHub**: [ag-ui-protocol/ag-ui](https://github.com/ag-ui-protocol/ag-ui)

AG-UI è un protocollo basato su eventi per la comunicazione tra agenti AI e applicazioni frontend. Definisce circa 16 tipi di evento: `TEXT_MESSAGE_START`, `TEXT_MESSAGE_CONTENT`, `TOOL_CALL_START`, `TOOL_CALL_END`, `STATE_SNAPSHOT`, `STATE_DELTA` e così via. Il trasporto è a tua scelta — SSE, WebSockets, webhooks funzionano tutti. Il formato è deliberatamente flessibile per permettere un'ampia adozione.

AG-UI non definisce come deve apparire la tua UI. Definisce *come* l'agente comunica *con* il tuo frontend. Pensalo come al livello del protocollo di rete che permette alla tua app React di sottoscrivere un agente LangGraph allo stesso modo in cui sottoscrive un agente CrewAI, senza modificare il codice frontend.

CopilotKit ha creato AG-UI grazie al loro lavoro con LangGraph e CrewAI. È stato adottato da LangChain, Mastra, PydanticAI e altri. Microsoft ha pubblicato una guida all'integrazione AG-UI. Se stai costruendo un frontend multi-agente e devi decouplingare i framework backend dal codice frontend, AG-UI è la risposta.

**Una precisazione che genera confusione**: AG-UI non è un framework UI. Non ti dice cosa rendere. Ti dice *che* l'agente ha detto qualcosa, ha chiamato uno strumento o ha aggiornato lo stato condiviso. Cosa renderi in risposta è ancora una tua decisione.

### A2UI

**GitHub**: [google/A2UI](https://github.com/google/A2UI) · Spec: [a2ui.org](https://a2ui.org/)

A2UI è la specifica dichiarativa di Google per ciò che gli agenti inviano quando desiderano mostrare una UI. Mentre AG-UI risponde a "come comunica l'agente?", A2UI risponde a "che formato usa l'agente per descrivere un layout di componenti?".

A2UI utilizza un formato JSONL piatto: un descrittore di componente per riga, ciascuno con un ID, un tipo e dati. Il formato piatto è intenzionale. Gli alberi annidati richiedono al modello di conoscere la struttura completa prima di poter iniziare a streammare. Una lista piatta permette al modello di emettere ogni componente man mano che "pensa" a esso, il che significa che il tuo frontend può iniziare a rendere la prima card metrica mentre il modello sta ancora decidendo se aggiungere un grafico.

```jsonl
{"id":"h1","type":"kpi_card","title":"MRR","value":"$82,400","delta":"+12%"}
{"id":"h2","type":"kpi_card","title":"Churn","value":"2.1%","delta":"-0.4%"}
{"id":"c1","type":"line_chart","title":"30-day MRR","data_ref":"mrr_series"}
{"id":"t1","type":"data_table","cols":["Month","MRR","Net New"],"data_ref":"monthly"}
```

A2UI è progettato con attenzione alla sicurezza: la specifica è un formato dati, non un codice eseguibile. Il catalogo dei componenti è definito in anticipo dallo sviluppatore; l'agente può riferirsi solo ai tipi presenti in quel catalogo. Un renderer A2UI che riceve un nome tipo sconosciuto lo ignora.

Il formato "Open-JSON-UI" di CopilotKit è compatibile con A2UI. Se stai scegliendo un formato specifica per un catalogo componenti oggi, A2UI è quello con il supporto più ampio tra le piattaforme.

**Nota sulla stabilità**: A2UI è pre-1.0 — v0.9 all'ultimo controllo del 8 maggio 2026 — e ha introdotto modifiche alle specifiche che rompono la compatibilità tra versioni minori. Le comunicazioni di Google sul piano di sviluppo sono state sparse e alcuni renderer (Lit, Flutter) hanno riscontrato ritardi rispetto agli aggiornamenti delle specifiche. Pianifica del tempo per le modifiche alle specifiche se stai costruendo su di esse oggi. Per casi d'uso basati esclusivamente su web, json-render sembra attualmente disporre di strumenti più completi. L'vantaggio a lungo termine di A2UI è la sua copertura multi-piattaforma (web, Flutter, SwiftUI, Android) che json-render non ha.

### App MCP

**GitHub**: [modelcontextprotocol](https://github.com/modelcontextprotocol) · Correlato: [mcp-ui](https://github.com/MCP-UI-Org/mcp-ui)

MCP è iniziato come un protocollo per connettere modelli LLM a strumenti e dati. L'estensione App permette agli strumenti MCP di restituire non solo dati, ma anche artefatti UI interattivi: componenti React, form, dashboard, mappe.

Il modello di sicurezza è rigoroso e questo è lo scopo: tutto viene eseguito in un iframe isolato con permessi ridotti, i template sono predefiniti in modo che l'app ospite possa esaminarli, e tutta la comunicazione è JSON-RPC verificabile. Questo è il modello corretto per i fornitori di strumenti — un server MCP di Shopify può restituire un widget di checkout; un servizio di mappatura può restituire una mappa incorporabile. L'app ospite non possiede né si fida del codice di quel widget.

MCP App è la scelta giusta quando l'interfaccia *appartiene al fornitore dello strumento*, non alla tua applicazione. Per l'UI che vive nel dominio della tua applicazione, attenersi al Pattern 1 o 2.

---

## I Framework JavaScript/TypeScript

### CopilotKit

**GitHub**: [CopilotKit/CopilotKit](https://github.com/CopilotKit/CopilotKit) · Esempi: [CopilotKit/generative-ui](https://github.com/CopilotKit/generative-ui)

CopilotKit è il framework più completo per applicazioni frontend native per agenti. Gestisce l'intero ciclo di vita: connessione ai backend degli agenti tramite AG-UI, gestione dello stato della conversazione bidirezionale, rendering di componenti UI generativi e fornitura della pipeline dello stato condiviso che permette agli agenti e agli utenti di modificare gli stessi dati.

Il modello a tre pattern si mappa in modo pulito sugli API di CopilotKit:
- `useCopilotAction` con un callback `render` → Modello 1
- Rendering A2UI/Open-JSON-UI → Modello 2
- Artefatti isolati in sandbox `OpenGenerativeUI` → Modello 3

La funzionalità chiave di CopilotKit meno discussa è lo **stato condiviso e l'interazione umana nel ciclo**: l'agente può leggere e scrivere lo stato dell'applicazione, l'utente può leggerlo e scriverlo, e i cambiamenti fluiscono in modo bidirezionale. Questo è ciò che rende le interfacce di tipo copilot una vera collaborazione, non solo un chatbot attaccato a un prodotto.

### Vercel AI SDK

**GitHub**: [vercel/ai](https://github.com/vercel/ai) · Docs: [ai-sdk.dev](https://ai-sdk.dev/)

Il Vercel AI SDK è lo standard de facto per TypeScript nelle applicazioni AI. Per l'UI generativa in particolare:

**`useObject`** streama un oggetto JSON strutturato dal server mentre viene generato. Defini uno schema Zod; l'SDK analizza il JSON parziale e attiva i re-render man mano che arrivano i campi. Questo è il percorso più fluido per il Modello 2 in un'app Next.js.

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

**`useChat` con handler degli strumenti** → Modello 1. Il modello chiama gli strumenti; mappi i nomi degli strumenti ai componenti.

**Elementi AI** ([elements.ai-sdk.dev](https://elements.ai-sdk.dev/)) fornisce primitive UI pronte all'uso da abbinare con l'SDK.

**Nota sul percorso confusionale**: Nel 2024, Vercel ha annunciato in [GitHub Discussion #3251](https://github.com/vercel/ai/discussions/3251) che l'SDK AI RSC — il modello di streaming React Server Components promosso come funzionalità principale "Generative UI" nell'SDK 3.0 — è stata sospesa indefinitamente a causa di "diverse limitazioni di lunga data" senza soluzioni a breve termine. Le squadre che avevano costruito strategie prodotto basate sullo streaming RSC sono state colte di sorpresa. Le API `generateObject`/`streamObject` sono state successivamente deprecati nell'SDK 6.0. La migrazione consigliata da AI SDK RSC è il modello `useObject` sopra, o json-render per la generazione basata su catalogo.

### assistant-ui

**GitHub**: [assistant-ui/assistant-ui](https://github.com/assistant-ui/assistant-ui)

assistant-ui è un insieme di primitive React componibili per costruire interfacce di chat di qualità produttiva. È la soluzione corretta quando hai bisogno di un'esperienza utente di chat raffinata — bolle di messaggio, token di streaming, azioni di copia/modifica/ri-generazione, stati di elaborazione — e desideri utilizzare il tuo backend e il tuo rendering degli strumenti.

Funziona bene con qualsiasi backend (OpenAI, Anthropic, modelli locali, endpoint personalizzati) e gestisce il rendering degli strumenti tramite un modello di slot/render prop familiare.

### json-render

**GitHub**: [vercel-labs/json-render](https://github.com/vercel-labs/json-render) · Docs: [json-render.dev](https://json-render.dev/)

json-render implementa il Modello 2 con un approccio opinato e completo. Ricevi un catalogo di componenti pre-costruito (componenti shadcn/ui con schemi Zod), un renderer e un ciclo di generazione stretto dove il modello è vincolato al catalogo tramite schema.

Le caratteristiche distintive:
- **Rendering multi-target**: lo stesso spec JSON può essere renderizzato in un'app web React, un'app mobile React Native, un PDF, un'email HTML o un video Remotion. Questo è veramente utile per i report.
- **Rendering progressivo**: i componenti appaiono man mano che il modello li streamma, non dopo che l'intera spec è arrivata.
- **Vincoli di schema stretti**: il catalogo è progettato in modo che il modello non possa generare tipi di componenti validi ma sconosciuti.

Se stai costruendo una funzionalità per dashboard o generazione di report e vuoi evitare il lavoro di infrastruttura per progettare il tuo catalogo, json-render è il percorso più veloce per le app web.

**Sul momentum**: json-render è stato lanciato da Vercel Labs all'inizio del 2026 e sembra aver attirato rapidamente l'attenzione degli sviluppatori web perché è immediatamente utile nei progetti standard su React/Next.js. Detto questo, json-render è ancora in versione pre-1.0 e la relazione tra json-render e A2UI è in corso di definizione — Vercel ha sperimentato con output compatibili con A2UI, quindi una convergenza è possibile. Per applicazioni multipiattaforma (mobile nativo, diversi framework), A2UI è la scommessa più solida a lungo termine.

### Hashbrown

**GitHub**: [liveloveapp/hashbrown](https://github.com/liveloveapp/hashbrown)

Hashbrown adotta un approccio distintivo: invece di costruire uno strato di interfaccia AI separato, inserisce direttamente la selezione dei componenti AI nella tua app esistente su React o Angular. Esponi i componenti della tua app al modello linguistico; il modello seleziona quali renderizzare e può invocare strumenti lato client.

Questo è lo strumento giusto quando desideri infondere intelligenza in superfici prodotto che non sono "chat" — una pagina prodotto che adatta il proprio layout, un pannello di impostazioni che mostra le opzioni corrette, un editor di workflow che suggerisce il passo successivo.

### OpenUI

**GitHub**: [thesysdev/openui](https://github.com/thesysdev/openui) · Docs: [openui.com](https://www.openui.com/)

OpenUI sostituisce il JSON con un formato orientato alle linee simile a codice ("OpenUI Lang") progettato per il rendering progressivo ed efficienza nei token. La pretesa è circa il 67% in meno di token rispetto a JSON equivalente per layout complessi.

L'equilibrio è la maturità dell'ecosistema — OpenUI è più recente e gli strumenti sono meno sviluppati rispetto agli approcci basati su JSON. Ma se il costo dei token è un vincolo significativo e stai generando layout complessi con alta frequenza, l'efficienza del formato è reale.

### Tambo

**GitHub**: [tambo-ai/tambo](https://github.com/tambo-ai/tambo)

Tambo si concentra sulla selezione di componenti a stato persistente: l'IA seleziona i componenti e può interagire con essi tramite strumenti lato client, mantenendo lo stato dei componenti durante la conversazione. Utile per casi d'uso in cui gli elementi dell'interfaccia persistono tra i turni — un componente di filtro che l'utente modifica mentre l'IA continua a ragionare sui dati filtrati.

---

## Il livello Python

L'ecosistema Python affronta le interfacce AI in modo diverso. Questi strumenti sono ottimizzati per demo di modelli ML, applicazioni dati e strumenti interni — non per applicazioni consumer in produzione con composizione di layout guidata da agenti.

Non è un limite. Per i casi d'uso giusti, Gradio e Streamlit sono gli unici strumenti di cui hai bisogno.

### Gradio

**GitHub**: [gradio-app/gradio](https://github.com/gradio-app/gradio) · PyPI: `gradio`

Il valore centrale di Gradio: scrivi una funzione Python; Gradio la avvolge in un'interfaccia web. La classe `Interface` richiede 3 righe per un classificatore di immagini. `ChatInterface` richiede 10 righe per un chatbot. `Blocks` ti dà il controllo fine-grained del layout quando ne hai bisogno.

L'interfaccia "generative UI" in Gradio è definita dallo sviluppatore Python, non dal modello. La visibilità e la configurazione dei componenti possono cambiare dinamicamente in base agli output del modello, ma il catalogo dei componenti è statico — non stai chiedendo al modello di comporre layout.  

Gradio è il predefinito per HuggingFace Spaces e l'ecosistema delle dimostrazioni ML. Ha milioni di download mensili e alimenta una grande parte del panorama delle dimostrazioni AI.  

**Utilizza Gradio quando**: sei uno sviluppatore Python che costruisce una dimostrazione di un modello ML, un prototipo di ricerca o uno strumento interno, e non vuoi toccare JavaScript.  

### Streamlit  

**GitHub**: [streamlit/streamlit](https://github.com/streamlit/streamlit)  

Il modello di Streamlit è più opinato: uno script Python esegue l'intera logica in ogni interazione. Chiami `st.chat_message()`, `st.dataframe()`, `st.plotly_chart()`. Il framework gestisce il layout.  

Il modello di rilancio completo dello script sembra inefficiente ma si rivela sorprendentemente ergonomico per i chatbot AI che accumulano la cronologia delle conversazioni — lo script intero si rilancia, la cronologia delle chat è nello stato della sessione e l'output è deterministico. Streamlit ora ha supporto di prima parte per la maggior parte dei principali provider LLM e si integra nativamente con Snowflake Cortex.  

**Utilizza Streamlit quando**: stai costruendo un'applicazione dati alimentata da AI, uno strumento di reporting interno o un dashboard supportato da ML in Python e desideri il percorso di distribuzione più semplice possibile.  

### LangChain e Haystack  

Questi sono framework di orchestrazione backend, non framework UI. Appaiono in qualsiasi mappa onesta dello stack generativo UI perché sono tipicamente il livello dove vengono generati gli output strutturati prima di essere inviati a un frontend.

**LangChain** ([langchain-ai/langchain](https://github.com/langchain-ai/langchain)): `.with_structured_output()` su qualsiasi LLM ti fornisce la generazione di JSON vincolata da Pydantic. Il decoratore `@tool` con generazione automatica dello schema è il modo più pulito per definire quali strumenti il modello può chiamare. LangChain invia i risultati strutturati a qualsiasi strato frontend stai utilizzando.  

**Haystack** ([deepset-ai/haystack](https://github.com/deepset-ai/haystack)): architettura modulare di pipeline con forte supporto per RAG. Hayhooks incapsula le pipeline Haystack come endpoint HTTP — incluso endpoint compatibili con MCP. Se la tua interfaccia generativa necessita di un motore di recupero, l'architettura a pipeline di Haystack gestisce questo in modo pulito.  

Nessun framework possiede lo strato UI. Essi generano i dati che il tuo frontend (Modello 1, 2 o 3) renderizza.  

---

## Riferimento Funzionale  

Utilizza il catalogo sopra come orientamento, non come elenco di acquisti. Lo stack si riduce solitamente a una scelta per ogni strato:  

| Esigenza | Parti da qui |
|----------|--------------|
| Flusso di eventi da agente a frontend | [AG-UI](https://github.com/ag-ui-protocol/ag-ui) |
| Payload UI dichiarativo che attraversa un confine di fiducia | [A2UI](https://github.com/google/A2UI) o [MCP Apps](https://github.com/MCP-UI-Org/mcp-ui) |
| Rendering chat/strumenti di proprietà dell'app | [Vercel AI SDK](https://github.com/vercel/ai), [assistant-ui](https://github.com/assistant-ui/assistant-ui) o [CopilotKit](https://github.com/CopilotKit/CopilotKit) |
| Dashboard, report e moduli composti da catalogo | [json-render](https://github.com/vercel-labs/json-render), [Hashbrown](https://github.com/liveloveapp/hashbrown), [OpenUI](https://github.com/thesysdev/openui) o [Tambo](https://github.com/tambo-ai/tambo) |
| Articoli visivi in sandbox | [OpenGenerativeUI](https://github.com/CopilotKit/OpenGenerativeUI) |
| Demo in Python e app dati | [Gradio](https://github.com/gradio-app/gradio) o [Streamlit](https://github.com/streamlit/streamlit) |

---

## Velocità dell'Ecosistema e Terreno Instabile  

Questo spazio evolve rapidamente e diversi progetti hanno rilasciato comunicazioni confuse insieme al loro codice. Ultima verifica effettuata il 8 maggio 2026; considera le note sullo stato dei progetti qui riportate come un'analisi temporizzata, non un giudizio permanente.

**Vercel AI SDK RSC** era la funzione principale di Generative UI al lancio della SDK 3.0. Vercel ha sospeso lo sviluppo a ottobre 2024 ([Discussion #3251](../github.com/vercel/ai/discussions/3251)) citando limitazioni architetturali nei React Server Components senza soluzione a breve termine. I team che vi avevano costruito sopra erano giustamente frustrati. È ancora nei documenti ma non è il percorso consigliato; lo è `useObject`.  

**json-render** (Vercel Labs) è la nuova direzione — un'alternativa basata su catalogo e indipendente dal framework che evita i problemi di accoppiamento con RSC. È pre-1.0 e sembra godere di forte interesse iniziale tra sviluppatori React/web. La probabile ragione DX: json-render è immediatamente utilizzabile in un progetto standard React/Next.js, mentre l'ambito cross-platform di A2UI aggiunge attrito alla configurazione. Come si evolverà quando entrambi gli standard matureranno è davvero incerto. Vercel ha testato la compatibilità A2UI in json-render, suggerendo che una convergenza sia possibile.  

**A2UI** (Google) è pre-1.0 (v0.9 all'ultimo controllo) con modifiche rotte tra le versioni minori e comunicazioni inconsistenti da parte di Google sul piano di sviluppo. È la scelta giusta per la portata cross-platform (web + Flutter + SwiftUI) che json-render non copre, e ha un significativo supporto enterprise. Per progetti puramente web oggi, l'esperienza utente è più ardua.  

**AG-UI** (CopilotKit) è anch'essa pre-1.0. La confusione più comune: il nome lo fa sembrare un framework UI. Non lo è — è un protocollo di trasporto. AG-UI definisce come gli eventi scorrono tra i backend degli agenti e la tua frontend; cosa renderizzare in risposta rimane comunque la tua decisione. Questo modello mentale è solido e ampiamente adottato, ma la specifica pre-1.0 significa che casi limite sono ancora in discussione.  

L'effetto pratico: **ogni giocatore principale qui è pre-1.0**. Pianifica modifiche all'API. I pattern — tool-to-component, catalog composition, sandboxed generation — sono abbastanza stabili da potervi costruire sopra. Le scelte specifiche sui protocolli non lo sono.  

---  

## Progettazione del Catalogo Componenti: Il Lavoro Ingegneristico Reale  

La maggior parte della complessità interessante nel Pattern 2 non si trova nel renderer — si trova nel catalogo.  

Il catalogo è una **decisione prodotto codificata come schema**. Risponde: quali sono gli oggetti UI significativi in questo dominio? Non "quali componenti React esistono?" ma "cosa un utente in questo contesto ha davvero bisogno di vedere e interagire?"  

**Il fallimento troppo granulare**: esponi `Row`, `Column`, `Text`, `Button`, `Icon`. Ora il modello deve essere un ingegnere frontend. Genererà layout mediocri che non rispettano il tuo sistema di design, mancherà gli stati vuoti, produrrà markup non accessibile e cambierà approccio da risposta a risposta perché niente nel catalogo limita l'output al linguaggio visivo del tuo prodotto.

**Il fallimento troppo generico**: esponi `WeatherCard`, `FlightCard`, `HotelCard`. Il modello non può adattarsi quando l'utente chiede qualcosa che non corrisponde a una card predefinita. Rientra al testo.  

**Il punto utile intermedio**: componenti a livello di dominio con slot vincolati.  

Un catalogo per un'app di viaggi potrebbe assomigliare a:  

```
TripSummary         — itinerario a colpo d'occhio  
FlightOptionList    — opzioni di volo selezionabili con prezzi  
HotelComparison     — confronto side-by-side tra hotel  
TravelerForm        — raccolta dei dettagli dei viaggiatori  
PolicyNotice        — richiamo alle regole di prenotazione  
BookingConfirmation — conferma finale con pulsante d'azione  
```  

Un catalogo per un'app finanziaria potrebbe assomigliare a:  

```
PortfolioSnapshot   — posizioni chiave e P&L  
TransactionTable    — transazioni filtrabili e paginabili  
RiskBreakdown       — metriche di allocazione e volatilità  
ScenarioComparison  — modellazione side-by-side di scenari  
ApprovalGate        — azione richiedente conferma umana  
```  

Il catalogo suona come il vocabolario del tuo prodotto. Incarna le tue decisioni UX, i tuoi requisiti di accessibilità, il tuo handling degli stati vuoti e i tuoi pattern di azioni pericolose nel codice dei componenti. Al modello è permesso disporre quei pezzi. Tu decidi comunque come appare ciascun pezzo e cosa è autorizzato a fare.  

**Regole di progettazione dello schema che riducono le hallucinazioni**:  

1. Mantieni i valori degli enum brevi ed evidenti. `"type": "bar_chart"` e non `"type": "data-visualization-bar-type-vertical"`.  
2. Rendi impossibile la composizione non valida. Se un `PolicyNotice` può apparire solo alla fine di un layout, non metterlo nello stesso livello dello schema di elementi che possono apparire ovunque.  
3. Usa campi obbligatori generosamente. Un campo opzionale è un campo che il modello potrebbe omettere e che il tuo renderer deve gestire come null.  
4. Testa il catalogo con prompt reali prima del rilascio. Salva le specifiche generate; controllale per violazioni dello schema, valori di campo hallucinati e composizioni tecnicamente valide ma semanticamente errate.  

---  

## Trappole comuni  

**Trappola: trattare JSON valido come comportamento sicuro.** La validazione dello schema conferma la struttura. Non dice nulla su se l'azione associata a un pulsante corrisponde al suo etichetta, se un totale corrisponde ai dati da cui è derivato o se un componente dell'UI sta facendo qualcosa che l'utente non si aspetta. Le specifiche dell'UI generate richiedono una revisione semantica, non solo una validazione dello schema. Almeno, le azioni distruttive dovrebbero richiedere un componente di conferma, e le etichette di questi componenti dovrebbero essere testate contro le azioni che attivano.

**Trappola: esporre primitivi di design invece di primitivi del prodotto.** Se il modello deve decidere se utilizzare un padding di 16px o 20px, hai fornito il livello di astrazione sbagliato. I componenti di dominio dovrebbero codificare il gusto del prodotto. Il modello dovrebbe comporre il comportamento, non gestire dettagli di presentazione.  

**Trappola: utilizzare UI generativa dove basterebbe una UI statica.** Se la struttura del contenuto da visualizzare è nota al momento dello sviluppo — e lo è quasi sempre — il Modello 1 con componenti pre-costruiti è più veloce, sicuro e coerente. L'UI generativa si giustifica quando la struttura varia effettivamente in base ai dati o al contesto del compito.  

**Trappola: saltare l'accessibilità.** Gli LLM generano violazioni di WCAG. Assegneranno `role="region"` a elementi interattivi, produrranno form senza etichette e genereranno rapporti di contrasto che non rispettano WCAG AA. La tua libreria di componenti potrebbe essere completamente accessibile; le composizioni generate automaticamente non lo sono. Testa l'intero percorso di rendering, non solo i componenti isolati.  

**Trappola: confondere protocollo e framework.** AG-UI non è un framework frontend. A2UI non è una libreria React. Sono formati di segnalazione e protocolli di eventi. Hai comunque bisogno di un framework frontend per implementarli. CopilotKit implementa AG-UI e A2UI. json-render implementa il pattern A2UI/Open-JSON-UI. Sono strati diversi.  

---  

## Consigli per caso d'uso  

**Aggiunta di un copilota a un'app SaaS esistente**: Inizia con il Modello 1 (tool-to-component). Usa Vercel AI SDK `useChat` o CopilotKit. Mappa le tue 5–10 azioni agenti più importanti su componenti pre-costruiti. Pubblicalo, misuralo, poi espandi il catalogo solo se gli utenti ne hanno effettivamente bisogno.  

**Generazione di dashboard da linguaggio naturale**: Usa il Modello 2 con json-render o un catalogo A2UI personalizzato. Definisci un catalogo di 8–15 tipi di componenti che coprano i tuoi grafici, le metriche e le varianti delle tabelle. Passa lo schema al modello; lascia che componga il layout. Implementa una validazione che intercetti i tipi sconosciuti prima che raggiungano il renderer.  

**Frontend multi-agente**: Usa CopilotKit con AG-UI. Lo stream di eventi gestisce lo streaming in tempo reale tra i backend degli agenti; lo stato condiviso gestisce il passaggio tra agenti; il pattern HITL gestisce i controlli di approvazione.  

**Costruzione all'interno di ChatGPT o un altro host MCP**: Usa le App MCP. Definisci il tuo strumento come un tool dati che recupera e ragiona, e un tool separato di rendering che richiede un widget. Mantieni la logica aziendale fuori dal template del widget.

**Demo di modelli ML e app dati (team Python)**: Gradio per demo e HuggingFace Spaces. Streamlit per app dati con interazione più complessa. Nessuno richiede JavaScript.  

**Artifici visivi, simulazioni, diagrammi**: Utilizza il Pattern 3 (OpenGenerativeUI o equivalente). Stabilisci un CSP iframe rigoroso. Tratta l'output come contenuto utente non attendibile da un punto di vista di sicurezza.  

I framework si stanno maturando velocemente. La convergenza dei protocolli (AG-UI per lo streaming, A2UI/Open-JSON-UI per le specifiche del catalogo) è ancora in corso, ma la forma si sta abbastanza chiara da potervi costruire sopra.  

Le sfide ingegneristiche più importanti al momento non sono la selezione dei framework. Sono la progettazione del catalogo — decidere cosa il modello è autorizzato a dire, richiedendo chiarezza del prodotto più che abilità tecnica. Sono la validazione semantica — testare che l'interfaccia generata faccia ciò che afferma, non solo che superi la validazione dello schema. E sono il divario di accessibilità — costruire cataloghi in cui ogni componente, e ogni composizione di componenti, rispetti la soglia di accessibilità che applicheresti all'UI scritta a mano.  

Il modello farà ciò che gli dici di fare all'interno della grammatica che gli fornisci. Rendi la grammatica deliberata.
````
