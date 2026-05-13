# Translation Candidate
- Slug: llm-routing-mastra-ai
- Locale: it
- Model: openrouter/openai/gpt-oss-120b:nitro
- Target: src/content/posts/2026-01-02--llm-routing-mastra-ai/it/index.mdx
- Validation: deferred
- Runtime seconds: 4.18
- Input tokens: 4501
- Output tokens: 1710
- Thinking tokens: unknown
- Cached input tokens: 1792
- Cache write tokens: 0
- Estimated cost: $0.000483
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
title: Non sposare il tuo modello
subTitle: 'Routing LLM, molto di moda'
date: '2026-01-02'
modified: '2026-01-08'
tags:
  - ai
  - llm
  - typescript
  - mastra
  - agent-orchestration
category: AI
subCategory: Engineering
social_image: ../mobile-social.webp
cover_full_width: ../wide.webp
cover_mobile: ../square.webp
cover_icon: ../square.webp
---
La maggior parte dei team di ingegneria sceglie un modello linguistico e vi rimane fedele. Un provider, un modello, tutti i compiti. È come assumere una sola persona per fare il tuo codice, la tua scrittura pubblicitaria e le tue tasse solo perché è stata brava al primo colloquio.

In qualsiasi momento, un modello è migliore per il codice, un altro gestisce meglio contesti lunghi e disordinati, e un altro è il cavallo di battaglia più economico per le attività di classificazione. I nomi cambiano. La natura del problema rimane la stessa. Trattare un unico modello come se eccellesse in tutto porta a pagare troppo per compiti semplici o a ottenere risultati scadenti su quelli specializzati.

Ho visto un team consumare migliaia di dollari eseguendo analisi del sentiment con un modello da 30 $ per milione di token, quando un modello da 0,50 $ avrebbe svolto il lavoro altrettanto bene. Formattazione JSON semplice, compiti di classificazione di base, tutto passato attraverso il loro provider premium. L’unica cosa che si scalda è la bolletta AWS.

C’è un modo migliore, e non è particolarmente complicato.

## Delegazione anziché devozione

E se potessi instradare le richieste al modello davvero più adatto a quel compito specifico? Usa il tuo potente modello costoso per le operazioni difficili, ma delega l’analisi e la formattazione semplici a qualcosa di più economico. Ottieni i vantaggi di più provider senza doverli gestire manualmente nel tuo codice.

Mastra ti consente di costruire esattamente questo tipo di sistema. Configuri agenti specialisti per diversi tipi di lavoro, poi crei un agente router che individua quale specialista dovrebbe gestire ogni richiesta. Gli ID modello mostrati sotto sono esempi, non una classifica. Sostituiscili con i modelli attuali che superano le tue valutazioni e rientrano nel tuo budget.

Pensalo così: hai tre specialisti nel tuo team.

```typescript
// ./src/mastra/index.ts
import { Mastra } from '@mastra/core';
import { Agent } from '@mastra/core/agent';
import { openai } from '@ai-sdk/openai';
import { anthropic } from '@ai-sdk/anthropic';
import { google } from '@ai-sdk/google';

export const claudeAgent = new Agent({
  id: 'claude-agent',
  instructions: 'You are an expert engineer. Write bugs? You are fired.',
  model: anthropic(process.env.CODE_MODEL ?? 'claude-sonnet-4-5'),
});

export const geminiAgent = new Agent({
  id: 'gemini-agent',
  instructions: 'You are a creative writer. Be weird.',
  model: google(process.env.LONG_CONTEXT_MODEL ?? 'gemini-3-pro-preview'),
});

export const gptAgent = new Agent({
  id: 'gpt-agent',
  instructions: 'You are a helpful assistant. Be boring.',
  model: openai(process.env.GENERAL_MODEL ?? 'gpt-5.2'),
});
```

Ognuno ha un compito. Il tuo agente codice dovrebbe essere il modello che supera le valutazioni di codifica specifiche del tuo repository. L'agente a lungo contesto dovrebbe essere quello che riesce a gestire i tuoi documenti reali senza trasformare il mezzo in una zuppa. L'agente generale dovrebbe essere economico, affidabile e noioso nel modo migliore possibile.

Ecco dove diventa interessante. Aggiungi un router che funge da proxy intelligente:

```typescript
export const routerAgent = new Agent({
  id: 'router-agent',
  name: 'The Boss',
  instructions: `You are an intelligent router.
  - Coding -> Claude
  - Poetry -> Gemini
  - Facts -> GPT

  Do not do the work yourself. Delegate.`,
  model: openai(process.env.ROUTER_MODEL ?? 'gpt-5-mini'), // Use a cheap model for routing!
  agents: {
    claudeAgent,
    geminiAgent,
    gptAgent,
  },
});

export const mastra = new Mastra({
  agents: { routerAgent, claudeAgent, geminiAgent, gptAgent },
});
```

Il router stesso gira su un modello leggero perché si limita a decidere dove inviare il traffico. Non paghi tariffe premium per capire quale altro modello premium utilizzare. Misura anche questo; un router scadente trasforma silenziosamente i risparmi in errate instradamenti.

Quando qualcuno richiede un'implementazione di bubble sort, il router lo riconosce come lavoro di codifica e lo passa al tuo specialista del codice. Un prompt di scrittura creativa? Viene indirizzato al modello che hai scelto per voce e ampiezza. Una domanda fattuale su eventi storici? Viene instradata all'agente generale, idealmente con recupero quando la freschezza o la citazione sono importanti.

## I Vantaggi Pratici

**L'efficienza dei costi conta più di quanto pensi.** Un piccolo modello di routing che prende decisioni di delega costa una frazione rispetto all'esecuzione di ogni singola richiesta sul tuo provider più costoso. Nel tempo, soprattutto su larga scala, questo si traduce in denaro reale. Paghi l'intelligenza pesante solo quando ne hai realmente bisogno.

**La qualità migliora quando abbini i modelli ai compiti.** Il vincitore varia di mese in mese, a seconda del compito e della forma del prompt. Per questo il livello di routing dovrebbe basarsi sui tuoi benchmark, non su qualunque modello fosse di moda su Twitter nella settimana in cui hai scritto l'integrazione.

**La resilienza diventa un beneficio collaterale.** Quando OpenAI subisce uno dei suoi outage periodici (e succedono), il tuo router può reindirizzare il traffico verso altri provider. Non sei bloccato in attesa che una specifica API torni online.

Non si tratta di essere furbi per il gusto di esserlo. È questione di costruire sistemi che abbiano senso sia dal punto di vista finanziario sia tecnico. Non useresti lo stesso martello per ogni lavoro di costruzione, e probabilmente non dovresti usare lo stesso modello linguistico per ogni compito di IA.

Il bello di questo approccio è che il tuo codice applicativo non cambia. Continui a chiamare il tuo agente router. La complessità di decidere quale modello usare per quale compito rimane in un unico posto, configurata una volta, invece di essere sparsa nel codice in una miriade di logiche condizionali.

### Risorse

- [Documentazione Mastra.ai](https://mastra.ai/docs)
- [Repository GitHub di Mastra](https://github.com/mastra-ai/mastra)

## Leggi la Serie

1. **Routing LLM** (Questo post)
2. [Sicurezza e Guardrails](../mastra-security-guardrails)
3. [MCP e Integrazioni di Strumenti](../mastra-mcp-tool-integrations)
4. [Workflow e Memoria](../mastra-workflows-memory)
````
