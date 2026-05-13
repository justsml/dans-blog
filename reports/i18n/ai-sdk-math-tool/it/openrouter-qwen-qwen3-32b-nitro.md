# Translation Candidate
- Slug: ai-sdk-math-tool
- Locale: it
- Model: openrouter/qwen/qwen3-32b:nitro
- Target: src/content/posts/2026-01-06--ai-sdk-math-tool/it/index.mdx
- Validation: deferred
- Runtime seconds: 86.69
- Input tokens: 6213
- Output tokens: 5445
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- Estimated cost: $0.001804
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
title: Smetti di chiedere alle LLMs di fare matematica
subTitle: Non ci sanno fare. Ecco come risolverlo.
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
C'è qualcosa di strano nei modelli linguistici? Possono spiegare la meccanica quantistica, scrivere poesie e debuggare il tuo TypeScript... ma chiedendo loro di moltiplicare 18472 per 9347 c'è una buona probabilità che ti fornisca con convinzione un risultato sbagliato di migliaia.

Questo mi lasciava perplesso finché non ho capito davvero cosa stiamo chiedendo loro. Stiamo chiedendo a un motore di riconoscimento di pattern di funzionare come una calcolatrice. È come chiedere a un ginnasta di bilanciare il tuo libretto bancario perché capisce il concetto di "bilancio".

Il problema è che i LLM non eseguono alcuna computazione. Quando chiedi a GPT o a Claude quanto fa 2 + 2, non stanno sommando. Stanno prediccendo che "4" è il token più probabile a seguire "2 + 2 =". La maggior parte delle volte funziona bene perché questi pattern esistono nei loro dati di addestramento. Ma vai oltre l'aritmetica semplice verso calcoli a più passaggi o numeri non comuni nell'addestramento e stai essenzialmente lanciando un dado.

L'ho sperimentato di persona recentemente esaminando del codice che usava un modello di alto livello per calcolare pagamenti ipotecari. Il modello rispondeva con completa convinzione. Era anche sbagliato di 400 dollari al mese. Questo è il tipo di errore che conta.

Anche se i modelli migliorano nella capacità di ragionamento (GPT-5 mostrerebbe miglioramenti), stanno comunque eseguendo un pattern matching sofisticato, non una computazione simbolica. Per compiti creativi e linguistici, questa natura probabilistica è esattamente ciò che li rende magici. Per la matematica? Non tanto.

La risposta non è aspettare modelli più intelligenti. È fornire al modello gli strumenti giusti per il lavoro.

Pensate a come risolvereste questo problema se steste costruendo un sistema non-AI. Non scrivereste logica matematica personalizzata, ma vi rivolgereste a una libreria. Lo stesso principio si applica qui, ma ora stiamo insegnando all'LLM quando e come utilizzare quella libreria.

Le chiamate a strumenti negli SDK AI moderni ci permettono di fornire al modello funzioni strutturate che può invocare. Invece di costringere l'LLM a fingere di sapere matematica, gli diamo qualcosa che lo fa davvero: un motore matematico simbolico.

Ho utilizzato [AI SDK v5 e v6](https://ai-sdk.vercel.ai/) per questo, abbinati a CortexJS Compute Engine. L'SDK gestisce l'orchestrazione e l'instradamento degli strumenti, mentre CortexJS si occupa da aritmetica di base fino al calcolo differenziale e integrale. È una separazione dei compiti sorprendentemente pulita.

```bash
bun add ai @ai-sdk/anthropic @cortex-js/compute-engine zod
```

## Costruzione dello strumento matematico

L'implementazione è più semplice di quanto si possa pensare. Quello che stiamo costruendo è un ponte tra la comprensione linguistica naturale dell'LLM e il calcolo matematico effettivo.

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

Qualche osservazione rilevante su questo:

La descrizione sta facendo un lavoro pesante. Quel linguaggio "MUST be used" potrebbe sembrare aggressivo, ma per esperienza personale essere espliciti con il modello su quando utilizzare uno strumento è la differenza tra funzionare occasionalmente e funzionare in modo affidabile. Consideratelo come ingegneria dei prompt al livello dello strumento.

L'elaborazione batch tramite un array `expressions` è più importante di quanto si possa pensare. Ogni chiamata al modello ha una latenza. Se state risolvendo un sistema di equazioni o eseguendo matematica a più passaggi, processarle singolarmente crea un'esperienza utente pessima. L'elaborazione batch significa un round trip per risolvere dieci problemi.

L'uso di un motore simbolico invece di semplicemente `eval()` (per favore non usate `eval()`) ci dà una vera comprensione matematica. Il motore interpreta l'intento, gestisce il formato LaTeX e può lavorare con derivate e integrali. Non stiamo facendo solo calcoli, stiamo facendo matematica.

La gestione degli errori è a livello di espressione. Se un calcolo fallisce, restituiamo quell'errore ma proseguiamo con le restanti. Questo permette al modello di vedere cosa ha funzionato e cosa no, potenzialmente autocorreggendosi nel passo successivo.

## Metterlo in pratica

Lasciamo che affronti qualcosa che normalmente indurrebbe un modello grezzo a generare risposte errate:

```typescript
import { anthropic } from '@ai-sdk/anthropic';

const { text } = await generateText({
  model: anthropic('claude-sonnet-4-5'),
  prompt: 'Calculate 18472 × 9347, divide by 127, then take the square root of the result.',
  tools: { mathTool },
  stopWhen: stepCountIs(5), // Consenti fino a cinque passaggi modello/strumento
});

console.log(text);
```

Il modello vede il calcolo, riconosce la necessità di precisione, chiama lo strumento, ottiene il risultato preciso e poi lo spiega in linguaggio naturale. Ogni componente svolge al meglio ciò per cui è specializzato.

## Oltre l'aritmetica di base

Poiché utilizziamo un motore simbolico, questo approccio gestisce cose che gli strumenti calcolatori semplici non possono affrontare.

Vuoi risolvere equazioni algebriche? "Risolvere queste equazioni: 3x + 7 = 22 e 2y - 5 = 13" funziona perfettamente.

Hai bisogno di calcolo differenziale? "Calcolare la derivata di x^3 + 2x^2 e valutarla in x = 2" è semplicemente un altro invocazione di strumento.

Il supporto LaTeX è particolarmente utile se stai costruendo applicazioni educative. L'engine comprende in modo innato gli input in LaTeX e può restituire risultati formattati per il rendering. Non è richiesto alcun parsing aggiuntivo.

## Il quadro più ampio

Penso che questo pattern abbia importanza anche al di là della matematica. Quello che stiamo realmente facendo è riconoscere i limiti degli LLM sfruttando al contempo le loro forze. Sono incredibili nel comprendere l'intento, analizzare il linguaggio naturale e orchestrare i flussi di lavoro. Non sono calcolatori, né database né sistemi di file.

Ogni volta che proviamo a far eseguire a un LLM qualcosa di deterministico, stiamo andando contro la sua natura. Ma quando abbiniamo quell'abilità di comprensione linguistica a strumenti specializzati che gestiscono le parti deterministe? È in quel momento che le cose diventano interessanti.

Lo strumento matematico è solo un esempio. Lo stesso principio si applica alla manipolazione delle date, ai calcoli finanziari, al processing delle immagini, alle query sui database... ovunque la precisione conti più della creatività. Lascia che il modello comprenda cosa l'utente vuole, quindi passa il compito effettivo a qualcosa progettato appositamente per il lavoro.

È un cambio di prospettiva su come costruiamo con l'AI. Non "il modello può farlo?" ma "il modello può orchestrare questo?". Una piccola differenza nella formulazione, una differenza significativa nella affidabilità.

## Risorse

- [Documentazione Vercel AI SDK](https://sdk.vercel.ai/docs)
- [CortexJS Compute Engine](https://cortexjs.io/compute-engine/)
- [Guida all'Utilizzo degli Strumenti](https://sdk.vercel.ai/docs/ai-sdk-core/tools-and-tool-calling)
- [Repository degli Esempi dell'AI SDK](https://github.com/vercel/ai/tree/main/examples)
````
