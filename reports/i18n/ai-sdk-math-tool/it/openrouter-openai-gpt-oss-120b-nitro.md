# Translation Candidate
- Slug: ai-sdk-math-tool
- Locale: it
- Model: openrouter/openai/gpt-oss-120b:nitro
- Target: src/content/posts/2026-01-06--ai-sdk-math-tool/it/index.mdx
- Validation: deferred
- Runtime seconds: 8.37
- Input tokens: 6465
- Output tokens: 2373
- Thinking tokens: unknown
- Cached input tokens: 1536
- Cache write tokens: 0
- Estimated cost: $0.000679
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
title: Smetti di far fare matematica ai LLM
subTitle: Non ci riescono. Ecco come risolvere.
date: '2026-01-06'
modified: '2026-01-07'
tags:
  - ai
  - ai-sdk
  - typescript
  - math
  - tools
  - patterns
category: AI
subCategory: Engineering
social_image: ../desktop-social.webp
cover_full_width: ../wide.webp
cover_mobile: ../square.webp
cover_icon: ../square.webp
---
Sai qual è la cosa strana dei modelli linguistici? Possono spiegare la meccanica quantistica, scrivere poesia e fare il debug del tuo TypeScript… ma se gli chiedi di moltiplicare 18472 per 9347 c’è una buona probabilità che ti diano una risposta sicura ma sbagliata di migliaia.

Mi confondeva finché non ho capito cosa gli stavamo davvero chiedendo. Stiamo chiedendo a un motore di pattern‑matching di fare da calcolatrice. È come chiedere a un ginnasta di tenere il bilancio perché capisce il concetto di “equilibrio”.

Il punto è che gli LLM non calcolano nulla. Quando chiedi a GPT o Claude quanto fa 2 + 2, non stanno sommando. Stanno prevedendo che “4” sia il token più probabile a comparire dopo “2 + 2 =”. Nella maggior parte dei casi funziona bene perché questi pattern esistono nei dati di addestramento. Ma se vai oltre l’aritmetica semplice, verso calcoli a più passi o numeri poco frequenti nel training, è come lanciare i dadi.

Mi sono imbattuto in questo problema di recente mentre revisionavo del codice che usava un modello di fascia alta per calcolare le rate di un mutuo. Il modello ha risposto con completa sicurezza. Era anche sbagliato di 400 $/mese. È il tipo di errore che conta.

Anche se i modelli migliorano nel ragionamento (si dice che GPT‑5 mostri progressi), continuano a fare un matching di pattern sofisticato, non una computazione simbolica. Per il lavoro creativo e i compiti di linguaggio naturale, questa natura probabilistica è proprio ciò che li rende magici. Per la matematica? Non molto.

## Cosa risolve davvero il problema?

La risposta non sta nell’attendere modelli più intelligenti. Sta nel fornire al modello lo strumento giusto per il compito.

Pensa a come risolveresti questo problema se stessi costruendo un sistema non basato su IA. Non scriveresti una logica matematica personalizzata, ma ricorreresti a una libreria. Lo stesso principio vale qui, solo che ora insegniamo al LLM quando e come usare quella libreria.

Il tool‑calling nei moderni AI SDK ci permette di consegnare al modello funzioni strutturate che può invocare. Invece di costringere il LLM a fingere di sapere fare matematica, gli diamo qualcosa che lo fa davvero: un motore di matematica simbolica.

Ho usato [AI SDK v5 e v6](https://ai-sdk.vercel.ai/) per questo, accoppiato con CortexJS Compute Engine. L’SDK gestisce l’orchestrazione e il routing degli strumenti, mentre CortexJS si occupa di tutto, dall’aritmetica di base al calcolo. È una separazione delle preoccupazioni sorprendentemente pulita.

```bash
bun add ai @ai-sdk/anthropic @cortex-js/compute-engine zod
```

## Costruire lo Strumento Matematico

L’implementazione è più lineare di quanto potresti immaginare. Quello che stiamo costruendo è un ponte tra la comprensione del linguaggio naturale del LLM e la computazione matematica reale.

```typescript
import { generateText, stepCountIs, tool } from 'ai';
import { ComputeEngine } from '@cortex-js/compute-engine';
import { z } from 'zod';

// Initialize the engine once
const ce = new ComputeEngine();

const mathTool = tool({
  description: 'Evaluate mathematical expressions and solve equations with guaranteed accuracy. MUST be used for all mathematical operations to verify correctness - do not attempt mental math. Supports arithmetic, algebra, calculus, and complex operations. Can process multiple expressions at once.',
  parameters: z.object({
    expressions: z.array(z.string()).describe(
      'Array of mathematical expressions in LaTeX or plain notation, e.g. ["2 + 2", "\\frac{x^2 + 1}{x - 1}", "\\int x^2 dx"]'
    ),
  }),
  execute: async ({ expressions }) => {
    // Process all expressions in parallel (or detailed batch)
    return expressions.map(expression => {
      try {
        const result = ce.parse(expression).evaluate();
        return {
          expression,
          result: result.toString(),
          latex: result.latex,
        };
      } catch (error) {
        return { 
          expression,
          error: (error as Error).message 
        };
      }
    });
  },
});
```

Alcuni punti degni di nota:

La descrizione fa la maggior parte del lavoro. L’espressione “DEVE essere usata” può sembrare aggressiva, ma nella pratica, essere espliciti con il modello su quando invocare lo strumento è la differenza tra un funzionamento occasionale e uno affidabile. Considerala ingegneria del prompt a livello di tool.

Il batch processing tramite l’array `expressions` conta più di quanto pensi. Ogni chiamata al modello introduce latenza. Se risolvi un sistema di equazioni o esegui calcoli a più fasi, elaborare ogni espressione singolarmente genera un’esperienza utente pessima. Il batching riduce a un unico round‑trip la risoluzione di dieci problemi.

Usare un motore simbolico invece di un semplice `eval()` (per favore, non usare `eval()`) ci fornisce una vera comprensione matematica. Il motore interpreta l’intento, gestisce la formattazione LaTeX e può operare con derivate e integrali. Non stiamo solo facendo calcoli, stiamo facendo matematica.

La gestione degli errori è isolata per espressione. Se un calcolo fallisce, restituiamo quell’errore ma continuiamo con gli altri. Questo permette al modello di vedere cosa ha funzionato e cosa no, facilitando un eventuale auto‑correzione al passo successivo.

## Mettere in pratica


Lanciagliamo qualcosa che normalmente farebbe allucinare un modello grezzo:

```typescript
import { anthropic } from '@ai-sdk/anthropic';

const { text } = await generateText({
  model: anthropic('claude-sonnet-4-5'),
  prompt: 'Calculate 18472 × 9347, divide by 127, then take the square root of the result.',
  tools: { mathTool },
  stopWhen: stepCountIs(5), // Allow up to five model/tool steps
});

console.log(text);
```

Il modello individua l’operazione matematica, capisce che serve precisione, invoca lo strumento, ottiene il risultato corretto e poi lo spiega in linguaggio naturale. Ogni componente fa quello per cui è stato progettato.

## Oltre l’Aritmetica di Base

Poiché utilizziamo un motore simbolico, questo approccio gestisce situazioni che gli strumenti calcolatori semplici non possono affrontare.

Vuoi risolvere equazioni algebriche? “Solve these equations: 3x + 7 = 22 and 2y - 5 = 13” funziona senza problemi.

Serve il calcolo differenziale? “Find the derivative of x^3 + 2x^2 and evaluate it at x = 2” è solo un’altra chiamata allo strumento.

Il supporto LaTeX è particolarmente utile se si costruiscono app educative. Il motore comprende nativamente l’input LaTeX e può restituire risultati formattati per il rendering. Nessun parsing aggiuntivo è necessario.

## Il quadro più ampio

Ritengo che questo schema abbia rilevanza al di là della sola matematica. Quello che stiamo realmente facendo è riconoscere i limiti dei LLM e allo stesso tempo sfruttarne i punti di forza. Sono eccezionali nel comprendere l’intento, nell’analizzare il linguaggio naturale e nel coordinare flussi di lavoro. Non sono calcolatrici, né database, né sistemi di file.

Ogni volta che tentiamo di far eseguire a un LLM un’operazione deterministica, combattiamo la sua natura. Ma quando abbiniamo quella comprensione del linguaggio naturale a strumenti specializzati che gestiscono le parti deterministiche? È allora che le cose diventano interessanti.

Lo strumento matematico è solo un esempio. Lo stesso principio vale per la manipolazione delle date, i calcoli finanziari, l’elaborazione di immagini, le query di database… ovunque la precisione sia più importante della creatività. Lascia che il modello capisca cosa vuole l’utente, poi passa il lavoro effettivo a qualcosa costruito per quel compito.

È un cambiamento nel modo di pensare allo sviluppo con l’AI. Non “il modello può fare questo?” ma “il modello può orchestrare questo?”. Una piccola differenza nella formulazione, una differenza significativa nella affidabilità.

## Risorse

- [Documentazione Vercel AI SDK](https://sdk.vercel.ai/docs)
- [Motore di calcolo CortexJS](https://cortexjs.io/compute-engine/)
- [Guida alla chiamata di strumenti](https://sdk.vercel.ai/docs/ai-sdk-core/tools-and-tool-calling)
- [Repository di esempi AI SDK](https://github.com/vercel/ai/tree/main/examples)
````
