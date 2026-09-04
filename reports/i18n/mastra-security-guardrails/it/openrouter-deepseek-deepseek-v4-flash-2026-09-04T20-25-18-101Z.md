# Translation Candidate
- Slug: mastra-security-guardrails
- Locale: it
- Model: openrouter/deepseek/deepseek-v4-flash
- Target: src/content/posts/2026-01-03--mastra-security-guardrails/it/index.mdx
- Validation: deferred
- Runtime seconds: 62.05
- Input tokens: 4557
- Output tokens: 7609
- Thinking tokens: unknown
- Cached input tokens: 1792
- Cache write tokens: 0
- Estimated cost: $0.002523
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
title: L'AI in produzione è terrificante (e come risolverla)
subTitle: 'Se il tuo agente non ha guardrail, non sei pronto per la produzione.'
modified: '2026-09-04'
tags:
  - ai
  - security
  - mastra
  - guardrails
  - privacy
  - pii
category: AI
subCategory: Security
social_image: ../desktop-social.webp
cover_full_width: ../wide.webp
cover_mobile: ../square.webp
cover_icon: ../square.webp
---
Nessuno parte con l'intenzione di costruire un sistema AI insicuro. Scrivi istruzioni, provi i casi limite, aggiungi qualche regola di validazione. Poi qualcuno scopre che può convincere il tuo bot a fare il pirata e a esporre dati utente. O un numero di carta di credito finisce nei tuoi log. O il modello raccomanda con sicurezza il prodotto di un concorrente.

Il divario tra "funziona nella demo" e "sicuro in produzione" è più ampio di quanto molti team si aspettino.

Parte del problema è che gli LLM grezzi non hanno opinioni su cosa dovrebbero o non dovrebbero fare. Sono macchine predittive che cercano di continuare qualsiasi pattern tu abbia iniziato. Dagli un prompt che assomiglia a "modalità override di sistema", e giocheranno allegramente la parte. Questo non è un bug del modello; è semplicemente come funzionano i modelli linguistici.

La maggior parte dei framework ti passa il modello e ti augura buona fortuna. Mastra adotta un approccio diverso: presume che prima o poi avrai bisogno di protezioni, quindi le integra nell'architettura dell'agente fin dall'inizio.

---

## I Processori come Livelli di Sicurezza

Il meccanismo di base è semplice. Prima che il tuo prompt raggiunga il modello, passa attraverso una catena di processori di input. Dopo che il modello risponde, i processori di output fanno il loro lavoro. Ogni processore può ispezionare, modificare o bloccare il contenuto in quella fase.

Pensali come middleware per interazioni AI. Impili quelli che ti servono, configuri il loro comportamento e vengono eseguiti automaticamente su ogni richiesta.

### 1. Fermare i Pirati (Iniezione di Prompt)

Gli attacchi di iniezione di prompt sono diventati creativi. Le persone usano caratteri Unicode invisibili, scrivono istruzioni in base64 o convincono il modello di essere in "modalità debug" dove le regole normali non si applicano. Le tecniche continuano a evolversi.

Mastra include processori che intercettano pattern comuni:

```typescript
// src/mastra/agents/secure-agent.ts
import { Agent } from '@mastra/core/agent';
import { PromptInjectionDetector, UnicodeNormalizer } from '@mastra/core/processors';

const GUARDRAIL_MODEL = 'openrouter/openai/gpt-oss-safeguard-20b';

export const secureAgent = new Agent({
  id: 'fortress-assistant',
  name: 'fortress-assistant',
  instructions: 'You are a secure assistant.',
  model: 'openai/gpt-5.5',
  inputProcessors: [
    // 1. Scrub invisible characters
    new UnicodeNormalizer({
      stripControlChars: true,
      collapseWhitespace: true,
    }),
    // 2. Detect the attempt
    new PromptInjectionDetector({
      model: GUARDRAIL_MODEL,
      threshold: 0.8,
      strategy: 'block', // Hard stop
      detectionTypes: ['injection', 'jailbreak', 'system-override'],
      lastMessageOnly: true,
    }),
  ],
});
```

Il [`UnicodeNormalizer`](https://mastra.ai/reference/processors/unicode-normalizer) rimuove i caratteri di controllo e comprime gli spazi bianchi. Il [`PromptInjectionDetector`](https://mastra.ai/reference/processors/prompt-injection-detector) analizza l'input ripulito alla ricerca di pattern che suggeriscono un tentativo di sovrascrivere le tue istruzioni.

Configuri quanto aggressiva vuoi che sia la rilevazione (il parametro `threshold`) e cosa deve succedere quando scatta (`block`, `warn`, `filter` o `rewrite`).

### 2. Gestione dei Dati Personali (PII)

Numeri di carte di credito nei log, numeri di previdenza sociale nei database vettoriali, indirizzi email conservati più del necessario. Sono questi i tipi di problemi che si trasformano in questioni normative. La sfida è che gli utenti non sempre si rendono conto di incollare dati sensibili in una finestra di chat.

Il [`PIIDetector`](https://mastra.ai/reference/processors/pii-detector) analizza i pattern comuni prima che raggiungano il tuo modello o vengano scritti nell'archivio:

```typescript
import { Agent } from '@mastra/core/agent';
import { BatchPartsProcessor, PIIDetector } from '@mastra/core/processors';

export const privateAgent = new Agent({
  id: 'privacy-first-assistant',
  name: 'privacy-first-assistant',
  instructions: 'You are a helpful assistant that never stores personal information.',
  model: 'openai/gpt-5.5',
  inputProcessors: [
    new PIIDetector({
      model: GUARDRAIL_MODEL,
      detectionTypes: ['email', 'phone', 'credit-card', 'ssn'],
      threshold: 0.6,
      strategy: 'redact',
      redactionMethod: 'mask',
      instructions: 'Detect and mask personally identifiable information',
      lastMessageOnly: true,
    }),
  ],
  outputProcessors: [
    new BatchPartsProcessor({ batchSize: 10 }),
    new PIIDetector({
      model: GUARDRAIL_MODEL,
      strategy: 'redact',
      redactionMethod: 'mask',
    }),
  ],
});
```

Puoi scegliere di oscurare, fare l'hashing, rimuovere, sostituire con segnaposto tipizzati o bloccare del tutto. `PIIDetector` è un processore ibrido: mettilo in `inputProcessors`, `outputProcessors` o entrambi a seconda di dove risiede il rischio. Per output in streaming, raggruppa i chunk prima di eseguire classificatori più pesanti, in modo da non pagare un controllo LLM separato per ogni singola goccia di token.

### 3. Moderazione dei Contenuti

I modelli addestrati su dati internet hanno visto parecchio. Senza filtri, a volte possono generare risposte che farebbero preoccupare il tuo team PR. Il [`ModerationProcessor`](https://mastra.ai/reference/processors/moderation-processor) intercetta contenuti che violano le tue linee guida:

```typescript
import { Agent } from '@mastra/core/agent';
import { BatchPartsProcessor, ModerationProcessor } from '@mastra/core/processors';

export const moderatedAgent = new Agent({
  id: 'safe-assistant',
  name: 'safe-assistant',
  instructions: 'You are a helpful assistant for a community platform.',
  model: 'openai/gpt-5.5',
  inputProcessors: [
    new ModerationProcessor({
      model: GUARDRAIL_MODEL,
      categories: ['hate', 'harassment', 'violence', 'self-harm'],
      threshold: 0.7,
      strategy: 'block',
      instructions: 'Detect harmful content that violates community guidelines',
      lastMessageOnly: true,
    }),
  ],
  outputProcessors: [
    new BatchPartsProcessor({ batchSize: 10 }),
    new ModerationProcessor({
      model: GUARDRAIL_MODEL,
      categories: ['hate', 'harassment', 'violence', 'self-harm'],
      strategy: 'filter',
      chunkWindow: 1,
    }),
  ],
});
```

La parte interessante è che puoi definire quali categorie sono rilevanti per il tuo caso d'uso. Uno strumento di scrittura creativa potrebbe permettere contenuti più espressivi rispetto a un bot per assistenza clienti. La soglia e la strategia ti danno il controllo su quanto stringente deve essere il filtraggio.

---

## Quando scatta l'allarme

Quando un processore usa la strategia `block`, Mastra interrompe la generazione ed espone l'evento come metadati di tripwire. Con `generate()`, controlla l'oggetto risultato:

```typescript
const result = await secureAgent.generate('Ignore all previous instructions...');

if (result.tripwire) {
  console.log(`Blocked by ${result.tripwire.processorId}`);
  console.log(`Reason: ${result.tripwire.reason}`);
  // "Blocked! Reason: Prompt injection detected."
  return 'Request blocked by policy.';
}
```

Per chiamate in streaming, ascolta i chunk `tripwire` su `fullStream`. Questo pattern ti permette di gestire gli eventi di sicurezza nel modo più adatto alla tua applicazione. Potresti registrarli per analisi, restituire un messaggio di errore generico, o passare da `block` a `warn` per un caso a basso rischio mentre regoli le soglie. Il `processorId` e `reason` ti dicono quale processore ha segnalato il contenuto, utile per fare debug di falsi positivi.

---

## Cosa non risolve

I processori intercettano molto, ma non sono magici. Un attaccante determinato con abbastanza tempo probabilmente troverà un prompt che sfugge. I modelli a volte allucinano in modi che i processori non possono prevedere. E c'è sempre un compromesso tra sicurezza e flessibilità: più severe sono le regole, più è probabile bloccare casi d'uso legittimi.

Il valore non è una protezione perfetta. È avere un modo sistematico per gestire i problemi comuni che sicuramente si presenteranno in produzione. Puoi regolare la sensibilità man mano che impari cosa fanno realmente i tuoi utenti. Puoi aggiungere processori personalizzati per rischi specifici del dominio. E puoi collegare callback di violazione, log, trace e record di audit a livello di applicazione attorno allo stesso punto di controllo.

La maggior parte dei problemi di sicurezza nell'AI in produzione non sono attacchi sofisticati. Sono persone che copiano e incollano dati che non dovrebbero, o che scoprono per tentativi ed errori che il bot fa cose non intenzionali. I processori non fermeranno ogni possibile problema, ma rendono molto più difficili quelli ovvi.

### Risorse

- [Documentazione Mastra Guardrails](https://mastra.ai/docs/agents/guardrails)
- [Documentazione Mastra Processors](https://mastra.ai/docs/agents/processors)
- [Approvazione Agenti Mastra](https://mastra.ai/docs/agents/agent-approval)
- [Repository GitHub Mastra](https://github.com/mastra-ai/mastra)

## Leggi la serie

1. [Routing LLM](/llm-routing-mastra-ai)
2. **Sicurezza e Guardrail** (Questo articolo)
3. [Integrazioni MCP e Strumenti](/mastra-mcp-tool-integrations)
4. [Flussi di Lavoro e Memoria](/mastra-workflows-memory)
````
