# Translation Candidate
- Slug: mastra-workflows-memory
- Locale: it
- Model: openrouter/deepseek/deepseek-v4-flash
- Target: src/content/posts/2026-01-05--mastra-workflows-memory/it/index.mdx
- Validation: deferred
- Runtime seconds: 56.06
- Input tokens: 6569
- Output tokens: 6253
- Thinking tokens: unknown
- Cached input tokens: 2816
- Cache write tokens: 0
- Estimated cost: $0.002284
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
title: 'Basta agenti inaffidabili: usa workflow e memoria'
subTitle: Pattern deterministici per modelli non deterministici.
modified: '2026-09-04'
tags:
  - ai
  - workflows
  - memory
  - mastra
  - supervisor-agents
  - orchestration
category: AI
subCategory: Architecture
social_image: ../desktop-social.webp
cover_full_width: ../wide.webp
cover_mobile: ../square.webp
cover_icon: ../square.webp
---
Gli LLM hanno questa proprietà bizzarra: sono brillanti nel cogliere le sfumature, ma terribili nel seguire ricette. Dai a un modello potente un problema vago e ragionerà tra le possibilità. Dagli una sequenza precisa di passaggi, e potrebbe saltare il passaggio 3 perché il passaggio 5 "sembrava più rilevante".

Non è un bug del modello. È una caratteristica fondamentale dei sistemi probabilistici che cercano di risolvere problemi deterministici.

Ho visto team lottare con questo disallineamento. Costruiscono un agente per gestire i rimborsi clienti, gli danno una dozzina di strumenti e si aspettano che esegua in modo affidabile un processo aziendale. A volte funziona perfettamente. A volte allucina approvazioni mai avvenute. A volte si blocca chiedendo le stesse informazioni tre volte.

La soluzione non sono prompt migliori. È sapere quando smettere di chiedere all'LLM di "pensare" e iniziare a dirgli di "obbedire".

---

## Quando il deterministico supera il creativo

Pensa a cosa succede quando devi elaborare un ticket di supporto. La logica aziendale del mondo reale assomiglia a:

1. Recupera i dettagli del ticket dal database
2. Verifica se l'utente ha diritto a un rimborso (regole delle policy)
3. Controlla che la transazione esista e non sia già stata rimborsata
4. Calcola l'importo del rimborso
5. Processa lo storno del pagamento
6. Aggiorna lo stato del ticket
7. Invia email di conferma

Potresti affidare questo a un LLM come esercizio di chiamata di strumenti. Per la mia esperienza, è chiedere guai. Il modello potrebbe decidere che i passaggi 2 e 3 sono "praticamente la stessa cosa" e saltarne uno. Oppure potrebbe processare il rimborso prima di verificare l'idoneità perché l'utente sembrava arrabbiato.

I workflow esistono esattamente per questo scenario. Non sono entusiasmanti, ma è proprio questo il punto.

### Costruire un pianificatore di attività meteo

Ecco un esempio pratico che mostra lo schema. Abbiamo bisogno di dati meteorologici concreti e fattuali abbinati a suggerimenti creativi di attività. Il recupero del meteo non dovrebbe mai essere creativo, ma i suggerimenti sì.

```typescript
// src/mastra/workflows/activity-planner.ts
import { createWorkflow, createStep } from '@mastra/core/workflows';
import { Agent } from '@mastra/core/agent';
import { z } from 'zod';

// Step 1: Fetch weather data (Deterministic)
const fetchWeather = createStep({
  id: 'fetch-weather',
  description: 'Fetches weather forecast for a given city',
  inputSchema: z.object({
    city: z.string(),
  }),
  outputSchema: z.object({
    location: z.string(),
    temperature: z.number(),
    conditions: z.string(),
    precipitationChance: z.number(),
  }),
  execute: async ({ inputData }) => {
    const coordinates = await geocodeCity(inputData.city);
    const params = new URLSearchParams({
      latitude: String(coordinates.latitude),
      longitude: String(coordinates.longitude),
      current: 'temperature_2m,weather_code',
      daily: 'precipitation_probability_mean',
      timezone: 'auto',
    });

    const weather = await fetch(`https://api.open-meteo.com/v1/forecast?${params}`)
      .then(r => r.json());
    
    return {
      location: inputData.city,
      temperature: weather.current.temperature_2m,
      conditions: getWeatherCondition(weather.current.weather_code),
      precipitationChance: weather.daily.precipitation_probability_mean[0],
    };
  },
});

// Step 2: Agent suggests activities (Creative)
const activityPlanner = new Agent({
  id: 'activity-planner-agent',
  name: 'Activity Planner',
  instructions: `You are a local activities expert. Based on weather conditions, suggest 3-5 appropriate activities.
    - For rain (>50% precipitation), prioritize indoor activities
    - For extreme temperatures, consider climate-appropriate options
    - Always include one adventurous and one relaxing option`,
  model: 'openai/gpt-5.5',
});

const planActivities = createStep({
  id: 'plan-activities',
  description: 'Uses AI to suggest activities based on weather',
  inputSchema: z.object({
    location: z.string(),
    temperature: z.number(),
    conditions: z.string(),
    precipitationChance: z.number(),
  }),
  outputSchema: z.object({
    activities: z.string(),
  }),
  execute: async ({ inputData }) => {
    const prompt = `Weather in ${inputData.location}: ${inputData.temperature}°C...`;
    const response = await activityPlanner.generate(prompt);
    return { activities: response.text };
  },
});

// The Pipeline
export const activityPlannerWorkflow = createWorkflow({
  id: 'activity-planner',
  inputSchema: z.object({ city: z.string() }),
  outputSchema: z.object({ activities: z.string() }),
})
  .then(fetchWeather)
  .then(planActivities)
  .commit();
```

`geocodeCity()` è codice applicativo ordinario o una chiamata API Maps; non è una decisione del modello. L'LLM non tocca mai l'API del meteo. Riceve dati reali come input, poi fa ciò per cui è effettivamente bravo: fornire suggerimenti contestuali. Se capovolgi tutto e lasci che sia l'agente a recuperare i dati meteo, prima o poi otterrai una previsione di sole quando in realtà piove.

**Quando considerare i workflow:**
- Hai una sequenza nota di passaggi che devono avvenire in ordine
- Hai bisogno di osservabilità in ogni fase (log, metriche, tempi)
- Hai bisogno di logiche di retry per API esterne instabili
- Le regole aziendali non possono essere "interpretate" – vanno seguite esattamente

---

## Il problema della finestra di contesto di cui nessuno parla

C'è uno schema che continuo a vedere. Qualcuno costruisce un chatbot. Funziona benissimo durante i test. Poi in produzione, gli utenti hanno conversazioni più lunghe e all'improvviso il bot si perde.

Lo sviluppatore guarda i log e si rende conto che stanno inviando l'intera cronologia della conversazione con ogni richiesta. Tutti e 47 i messaggi. Stanno bruciando token e spazio di contesto per informazioni per lo più irrilevanti.

Peggio ancora, esiste un fenomeno che i ricercatori chiamano "persi nel mezzo", in cui i modelli performano peggio quando le informazioni rilevanti sono sepolte in un contesto lungo. Il modello letteralmente non vede la foresta per gli alberi.

Inviare l'intera cronologia della conversazione sembra sicuro. Stai dando al modello "tutte le informazioni". Ma in realtà gli stai rendendo più difficile concentrarsi su ciò che conta.

### Messaggi recenti, memoria di lavoro e richiamo

Il sistema di memoria di Mastra separa alcuni compiti che i team spesso accorpano. La cronologia dei messaggi recenti tiene a disposizione gli ultimi scambi con `lastMessages`. La memoria di lavoro memorizza fatti strutturati persistenti come preferenze dell'utente, obiettivi e stato del progetto. Il richiamo semantico cerca messaggi più vecchi in base al significato quando la richiesta corrente sembra correlata. La memoria osservazionale fa un ulteriore passo avanti per conversazioni lunghe, comprimendo la cronologia grezza vecchia in osservazioni dense.

```typescript
// src/mastra/agents/memory-agent.ts
import { Agent } from '@mastra/core/agent';
import { ModelRouterEmbeddingModel } from '@mastra/core/llm';
import { Memory } from '@mastra/memory';
import { LibSQLStore, LibSQLVector } from '@mastra/libsql';

export const memoryAgent = new Agent({
  id: 'memory-agent',
  name: 'Memory Agent',
  instructions: 'You are a helpful assistant with perfect recall of our conversations.',
  model: 'openai/gpt-5.5',
  memory: new Memory({
    storage: new LibSQLStore({
      id: 'memory-agent-store',
      url: 'file:./mastra.db',
    }),
    vector: new LibSQLVector({
      id: 'memory-agent-vector',
      url: 'file:./mastra.db',
    }),
    embedder: new ModelRouterEmbeddingModel('openai/text-embedding-3-small'),
    options: {
      lastMessages: 20,
      workingMemory: {
        enabled: true,
      },
      semanticRecall: {
        topK: 5,
        messageRange: 2,
        scope: 'resource',
      },
      observationalMemory: true,
    },
  }),
});
```

Una nota operativa: `observationalMemory: true` attualmente usa `google/gemini-2.5-flash` come modello di osservazione predefinito. Ciò significa che questo agente, altrimenti basato su OpenAI, necessita anche dell'accesso al modello Google, comporta un utilizzo separato del modello e può inviare la cronologia della conversazione attraverso un secondo fornitore. In produzione, configura il modello di memoria osservazionale esplicitamente e sottoponi la scelta alla stessa revisione di credenziali, costi, residenza e conservazione dei dati dell'agente principale.

Ecco come funziona in pratica. Un utente chiede: "Qual era quel ristorante italiano che mi hai consigliato il mese scorso?"

Senza richiamo semantico o osservazioni, l'agente vede gli ultimi 20 messaggi. La raccomandazione del ristorante era il messaggio 487 su 506. È sparita. L'agente dice: "Non ho queste informazioni."

Con il richiamo semantico:
1. La query viene trasformata in embedding: `[0.234, -0.567, 0.891, ...]`
2. L'embedding viene confrontato con i messaggi storici
3. Il messaggio 487 ("Ti consiglio Trattoria Bella – la loro carbonara è incredibile") ottiene un punteggio di similarità di 0.89
4. Quel messaggio viene iniettato nel contesto corrente
5. L'agente risponde: "Ti ho consigliato Trattoria Bella. La loro carbonara è ciò che ha attirato la mia attenzione."

L'agente sembra avere una memoria perfetta pur utilizzando solo una frazione della finestra di contesto. Non è solo ingegneria astuta: è funzionalmente necessario una volta che le conversazioni superano qualche decina di messaggi.

---

## Coordinamento tramite agenti supervisori

A volte servono sia struttura che flessibilità. I workflow puri sono troppo rigidi. Gli agenti puri sono troppo imprevedibili.

Gli agenti supervisori ti danno un coordinatore che decide quale agente specializzato, workflow o strumento dovrebbe gestire la prossima mossa. Pensalo come un bilanciatore di carico intelligente per le capacità AI.

```typescript
const researchAgent = new Agent({
  id: 'research-agent',
  description: 'Gathers facts and returns sourced research notes.',
  model: 'openai/gpt-5-mini',
});

const writingAgent = new Agent({
  id: 'writing-agent',
  description: 'Turns research notes into clear, structured prose.',
  model: 'openai/gpt-5-mini',
});

export const coordinatorAgent = new Agent({
  id: 'coordinator-agent',
  name: 'Research Coordinator',
  instructions: `You coordinate researchers, writers, tools, and workflows.
    - Delegate fact gathering to research-agent
    - Delegate final prose to writing-agent
    - Use weatherTool for current weather data
    - Use activityPlannerWorkflow for location-based planning
    
    Always produce comprehensive, well-structured responses.`,
  model: 'openai/gpt-5.5',
  
  // Available primitives
  agents: { researchAgent, writingAgent },
  workflows: { activityPlannerWorkflow },
  tools: { weatherTool },
  
  // Supervisor state and delegation traces need somewhere durable to land.
  memory: new Memory({
    storage: new LibSQLStore({ id: 'supervisor-store', url: 'file:./supervisor.db' }),
  }),
});
```

Quando interroghi questo supervisore, analizza la richiesta e la instrada di conseguenza:
- "Ho bisogno di fatti su X" attiva l'agente di ricerca
- "Pianifica un weekend a Seattle" esegue il workflow del pianificatore di attività
- "Scrivi un rapporto su Y" coinvolge l'agente di scrittura

Questo schema scala meglio che cercare di stipare tutto in un unico mega-agente. Gli agenti specializzati sviluppano competenze mirate. Il coordinatore gestisce l'instradamento. Ogni pezzo fa ciò per cui è bravo.

---

## Mettendo tutto insieme

I sistemi AI reali in produzione hanno bisogno di architettura, non solo di prompt. Stai costruendo sistemi distribuiti in cui alcuni nodi sono LLM.

Workflow ti danno garanzie quando le cose devono succedere esattamente come previsto. La memoria ti fornisce contesto senza consumare il budget di token. Gli agenti supervisori ti permettono di comporre complessità a partire da parti più semplici.

Niente di tutto ciò è affascinante. Ma dopo aver visto abbastanza "agenti completamente autonomi" fallire in produzione, ho imparato ad apprezzare l'affidabilità noiosa rispetto all'imprevedibilità emozionante.

I risultati possono variare, ma secondo la mia esperienza, i sistemi che effettivamente vengono rilasciati e restano in esecuzione sono quelli che trattano gli LLM come componenti di un'architettura più grande, piuttosto che come scatole magiche che risolvono tutto.

### Risorse

- [Documentazione di Mastra Workflows](https://mastra.ai/docs/workflows/overview)
- [Documentazione di Mastra Memory](https://mastra.ai/docs/memory/overview)
- [Agenti Supervisori di Mastra](https://mastra.ai/docs/agents/supervisor-agents)
- [Richiamo Semantico di Mastra](https://mastra.ai/docs/memory/semantic-recall)

## Leggi la Serie

1. [Routing LLM](../llm-routing-mastra-ai)
2. [Sicurezza e Guardrail](../mastra-security-guardrails)
3. [Integrazioni MCP e Strumenti](../mastra-mcp-tool-integrations)
4. **Workflow e Memoria** (Questo articolo)
````
