# Translation Candidate
- Slug: mastra-security-guardrails
- Locale: it
- Model: openrouter/openai/gpt-oss-120b:nitro
- Target: src/content/posts/2026-01-03--mastra-security-guardrails/it/index.mdx
- Validation: deferred
- Runtime seconds: 2.74
- Input tokens: 6854
- Output tokens: 2560
- Thinking tokens: unknown
- Cached input tokens: 3584
- Cache write tokens: 0
- Estimated cost: $0.000728
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
title: L'IA di produzione è spaventosa (e come rimediare)
subTitle: 'Se iltuo agente non ha guardrail, non sei pronto per la produzione.'
date: '2026-01-03'
modified: '2026-01-08'
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
Nessuno parte con l’intento di costruire un sistema IA non sicuro. Scrivi le istruzioni, testi i casi limite, aggiungi qualche regola di validazione. Poi qualcuno scopre come ingannare il tuo bot facendolo recitare il ruolo di un pirata e rivelare dati utente. Oppure un numero di carta di credito finisce nei tuoi log. O il modello consiglia con sicurezza il prodotto di un concorrente.

Il divario tra “funziona nella demo” e “è sicuro in produzione” è più ampio di quanto la maggior parte dei team si aspetti.

Una parte del problema è che i LLM grezzi non hanno opinioni su ciò che dovrebbero o non dovrebbero fare. Sono macchine di previsione che cercano di continuare qualsiasi schema tu abbia avviato. Se gli dai un prompt che assomiglia a “modalità override di sistema”, loro seguiranno volentieri il gioco. Non è un bug del modello; è semplicemente il modo in cui funzionano i modelli di linguaggio.

La maggior parte dei framework ti consegna il modello e ti augura buona fortuna. Mastra adotta un approccio diverso: parte dal presupposto che avrai bisogno di guardrail, quindi li integra nell’architettura dell’agente fin dall’inizio.

---

## I processori come livelli di sicurezza

Il meccanismo di base è semplice. Prima che il tuo prompt raggiunga il modello, passa attraverso una catena di processori di input. Dopo che il modello risponde, entrano in gioco i processori di output. Ogni processore può ispezionare, modificare o bloccare il contenuto in quella fase.

Pensali come middleware per le interazioni AI. Accateni quelli di cui hai bisogno, configuri il loro comportamento e verranno eseguiti automaticamente ad ogni richiesta.

### 1. Fermare i pirati (Prompt Injection)

Gli attacchi di prompt injection sono diventati sempre più creativi. Gli aggressori usano caratteri Unicode invisibili, scrivono istruzioni in base64 o convincono il modello di essere in “modalità debug”, dove le regole normali non si applicano. Le tecniche continuano a evolversi.

Mastra include processori che intercettano i pattern più comuni:

```typescript
// src/mastra/agents/secure-agent.ts
import { Agent } from '@mastra/core/agent';
import { PromptInjectionDetector, UnicodeNormalizer } from '@mastra/core/processors';
import { openai } from '@ai-sdk/openai';

export const secureAgent = new Agent({
  id: 'fortress-assistant',
  name: 'fortress-assistant',
  instructions: 'You are a secure assistant.',
  model: openai('gpt-5'),
  inputProcessors: [
    // 1. Scrub invisible characters
    new UnicodeNormalizer({
      id: 'unicode-normalizer',
      stripControlChars: true,
      collapseWhitespace: true,
    }),
    // 2. Detect the attempt
    new PromptInjectionDetector({
      id: 'prompt-injection-detector',
      model: openai('gpt-5-nano'), // Cheap, fast
      threshold: 0.8,
      strategy: 'block', // Hard stop
      detectionTypes: ['injection', 'jailbreak', 'system-override'],
    }),
  ],
});
```

Il [`UnicodeNormalizer`](https://mastra.ai/docs/processors) rimuove i caratteri di controllo e comprime gli spazi bianchi. Il [`PromptInjectionDetector`](https://mastra.ai/docs/processors) analizza l'input pulito alla ricerca di pattern che indicano un tentativo di sovrascrivere le tue istruzioni.

Configuri quanto aggressiva deve essere la rilevazione (il parametro `threshold`) e cosa deve accadere quando scatta (bloccare, registrare o semplicemente segnalare).

### 2. Gestione dei Dati Personali Sensibili (PII)

Numeri di carte di credito nei log, numeri di previdenza sociale nei database vettoriali, indirizzi email conservati più a lungo del necessario. Sono questi i tipi di problemi che si trasformano in questioni normative. La difficoltà è che gli utenti non si rendono sempre conto di star incollando dati sensibili in una finestra di chat.

Il [`PIIDetector`](https://mastra.ai/docs/processors) esegue la scansione di pattern comuni prima che raggiungano il tuo modello o vengano scritti su storage:

```typescript
import { PIIDetector } from '@mastra/core/processors';

export const privateAgent = new Agent({
  id: 'privacy-first-assistant',
  name: 'privacy-first-assistant',
  instructions: 'You are a helpful assistant that never stores personal information.',
  model: openai('gpt-5'),
  inputProcessors: [
    new PIIDetector({
      id: 'pii-detector',
      model: openai('gpt-5-nano'),
      detectionTypes: ['email', 'phone', 'credit-card', 'ssn'],
      threshold: 0.6,
      strategy: 'redact',
      redactionMethod: 'mask',  // Replace with [REDACTED]
      instructions: 'Detect and mask personally identifiable information',
    }),
  ],
});
```

Puoi scegliere di redigere (sostituire con `[REDACTED]`), hashare o bloccare completamente. Il processore opera sia sull'input che sull'output, così sei coperto anche se il modello dovesse generare dati sensibili nella risposta.

### 3. Moderazione dei Contenuti

I modelli addestrati su dati provenienti da Internet hanno visto molte cose. Senza filtraggio, possono occasionalmente produrre risposte che metterebbero a disagio il tuo team di PR. Il [`ModerationProcessor`](https://mastra.ai/docs/processors) intercetta i contenuti che violano le tue linee guida:

```typescript
import { ModerationProcessor } from '@mastra/core/processors';

export const moderatedAgent = new Agent({
  id: 'safe-assistant',
  name: 'safe-assistant',
  instructions: 'You are a helpful assistant for a community platform.',
  model: openai('gpt-5'),
  inputProcessors: [
    new ModerationProcessor({
      id: 'moderation-processor',
      model: openai('gpt-5-nano'),  // Fast, cheap model for classification
      categories: ['hate', 'harassment', 'violence', 'self-harm'],
      threshold: 0.7,  // Block if confidence > 70%
      strategy: 'block',  // Stop the request immediately
      instructions: 'Detect harmful content that violates community guidelines',
    }),
  ],
});
```

La parte interessante è che puoi definire quali categorie sono rilevanti per il tuo caso d'uso. Uno strumento di scrittura creativa potrebbe consentire contenuti più espressivi rispetto a un bot di assistenza clienti. Soglia e strategia ti danno il controllo su quanto sia severo il filtraggio.

## Quando le cose si inceppano

I processori non generano errori quando rilevano un problema. Invece, impostano un flag sull'oggetto risultato:

```typescript
const result = await secureAgent.generate('Ignore all previous instructions...');

if (result.tripwire) {
  console.log(`Blocked! Reason: ${result.tripwireReason}`);
  // "Blocked! Reason: Prompt injection detected."
  return "Nice try, script kiddie.";
}
```

Questo schema ti consente di gestire gli eventi di sicurezza nel modo più adatto alla tua applicazione. Puoi registrarli per analisi, restituire un messaggio di errore generico, o persino consentire certe violazioni in contesti specifici. Il campo `tripwireReason` indica esattamente quale processore ha segnalato il contenuto, facilitando il debug di falsi positivi o la messa a punto delle soglie.

---

##Cosa Non Risolve

I processori intercettano molto, ma non sono una bacchetta magica. Un attaccante determinato con abbastanza tempo può probabilmente trovare un prompt che sfugge al filtro. I modelli talvolta generano allucinazioni che i processori non possono prevedere. E c’è sempre un compromesso tra sicurezza e flessibilità: più severe sono le regole, più è probabile bloccare casi d’uso legittimi.

Il valore non sta in una protezione perfetta. È avere un metodo sistematico per gestire i problemi comuni che inevitabilmente compariranno in produzione. Puoi regolare la sensibilità man mano che scopri cosa fanno realmente gli utenti. Puoi aggiungere processori personalizzati per rischi specifici del dominio. E hai tracce di audit che mostrano cosa è stato bloccato e perché.

La maggior parte dei problemi di sicurezza nelle AI in produzione non sono attacchi sofisticati. Sono persone che copiano e incollano dati che non dovrebbero, o che scoprono tramite tentativi ed errori che il bot compie azioni non previste. I processori non impediranno ogni possibile problema, ma rendono molto più difficili quelli ovvi.

### Risorse

- [Documentazione delle Guardrails di Mastra](https://mastra.ai/docs/agents/guardrails)
- [Best practice di sicurezza](https://mastra.ai/docs/security)
- [Repository GitHub di Mastra](https://github.com/mastra-ai/mastra)

## Leggi la serie

1. [Instradamento LLM](../llm-routing-mastra-ai)
2. **Sicurezza e Guardrails** (Questo post)
3. [MCP e integrazioni degli strumenti](../mastra-mcp-tool-integrations)
4. [Flussi di lavoro e memoria](../mastra-workflows-memory)
````
