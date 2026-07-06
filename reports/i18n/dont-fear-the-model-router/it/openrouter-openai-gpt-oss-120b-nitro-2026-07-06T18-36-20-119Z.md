# Translation Candidate
- Slug: dont-fear-the-model-router
- Locale: it
- Model: openrouter/openai/gpt-oss-120b:nitro
- Target: src/content/posts/2026-07-03--dont-fear-the-model-router/it/index.mdx
- Validation: rejected: direct AI SDK translation failed
- Runtime seconds: 6.81
- Input tokens: 11605
- Output tokens: 6480
- Thinking tokens: unknown
- Cached input tokens: 2176
- Cache write tokens: 0
- Estimated cost: $0.001619
- Pricing source: local-openrouter-estimate
- Note: Command failed: bun run i18n:validate --slug dont-fear-the-model-router --locale it --skip-global (code 1)
## Raw Output

````mdx
---
title: Non temere il router del modello
subTitle: Indirizza al modello migliore con sicurezza.
modified: '2026-07-03'
tags:
  - ai
  - llm
  - agents
  - mastra
  - evals
  - model-routing
  - testing
  - observability
  - production
category: AI
subCategory: AI Infrastructure
cover_full_width: ../wide.webp
cover_mobile: ../square.webp
cover_icon: ../square.webp
related:
  - llm-routing-mastra-ai
  - llm-evals-are-broken
  - mastra-workflows-memory
---
La prima versione di [Non Sposare il Tuo Modello](/llm-routing-mastra-ai) presentava l’argomento semplice: smettere di inviare ogni compito allo stesso modello solo perché aveva vinto l’ultimo bake‑off.

Usa un modello economico per lavori poco impegnativi. Usa un modello più potente dove il lavoro è davvero difficile. Mantieni lo strato di routing sufficientemente flessibile da poter cambiare provider senza trasformare il tuo codice in un santuario.

Era corretto.

Era anche incompleto.

Perché una volta aggiunto un router, hai un nuovo comportamento di sistema da testare. La domanda non è più “qual è il modello migliore?” La domanda è “il sistema ha scelto il percorso giusto, ha usato gli strumenti corretti, ha preservato le prove adeguate e si è fermato al momento opportuno?”

Se non misuri questo, il tuo router di modello è solo vibrazioni con una tabella di dispatch.

<p class="inset">
Il router non è la risposta. Il router è un’ipotesi su come dovrebbe comportarsi il tuo sistema.
</p>

Mastra ci fornisce superfici utili per trasformare quell’ipotesi in qualcosa di verificabile: [scorers](https://mastra.ai/docs/evals/overview), [`runEvals`](https://mastra.ai/reference/evals/run-evals), [datasets](https://mastra.ai/docs/evals/datasets/overview) e [experiments](https://mastra.ai/docs/evals/datasets/running-experiments). I nomi delle API suonano come infrastruttura di valutazione, e lo sono, ma il valore reale è più semplice:

Rendono il comportamento dell’agente sufficientemente visibile da poter discutere.

## Cosa Stiamo Testando?

Il router di modello del post precedente ha tre percorsi specialistici evidenti:

| Percorso | Cosa dovrebbe andare lì | Cosa sarebbe un percorso sbagliato |
|---|---|---|
| `code` | implementazione, refactoring, debugging, revisione del codice | sintesi a lungo contesto, classificazione semplice |
| `long-context` | documenti disordinati, trascrizioni, sintesi di policy, molti file | formattazione meccanica breve |
| `general` | classificazione, formattazione, Q&A semplice, estrazione noiosa | codice complesso o analisi pesante di prove |

Quella tabella è un inizio, ma non è una valutazione.

Una valutazione richiede esempi e scorer:

| Elemento | Compito |
|---|---|
| Elemento del dataset | “Ecco una richiesta rappresentativa.” |
| Verità di base | “Ecco il percorso o il comportamento che ci aspettavamo.” |
| Scorer | “Ecco come decidiamo se l’output è passato.” |
| Esperimento | “Ecco l’esecuzione che possiamo confrontare con le esecuzioni future.” |

Il passo importante è testare il comportamento, non solo la qualità del prose.

Un modello può scrivere una risposta splendida dopo aver scelto lo specialista sbagliato. Un agente di sicurezza può produrre un rapporto plausibile senza preservare le prove. Un agente di supporto può suonare empatico mentre salta il controllo della policy di rimborso. Il paragrafo è la parte visibile. La traiettoria è dove vivono i bug.

Per un router, di solito inizio con quattro assi:

| Asse | Domanda | Esempio di scorer |
|---|---|---|
| Qualità | Ha scelto il percorso giusto e prodotto un risultato utile? | accuratezza del percorso, completezza della risposta, fedeltà |
| Costo | Ha evitato modelli premium per lavori noiosi? | classe di costo del percorso selezionato, budget token |
| Velocità | Ha terminato entro il budget di latenza del prodotto? | runtime o scorer di timeout |
| Altro | Ha rispettato vincoli di sicurezza, privacy e osservabilità? | lista consentita di tool, preservazione delle prove, comportamento di rifiuto |

Questa ultima colonna è importante. “Altro” è dove vive il tessuto cicatriziale della produzione.

## Rendi la Decisione del Router Valutabile

Se il router produce solo una risposta finale, è difficile capire perché si è comportato in quel modo. Puoi comunque valutare l’output, ma stai indovinando sulla decisione.

Per le valutazioni, fornisci al passaggio di routing un piccolo contratto strutturato:

```typescript
type RouterDecision = {
  route: "code" | "long-context" | "general";
  confidence: number;
  reason: string;
};
```

Il sistema di produzione non ha bisogno di mostrare questo JSON agli utenti. Può essere un passaggio interno, un handoff di workflow o uno span di tracciamento. Lo scorer ha solo bisogno di una superficie.

Ecco un agente Mastra deliberatamente piccolo che sceglie un percorso:

```typescript
// src/mastra/agents/router-decision-agent.ts
import { Agent } from "@mastra/core/agent";

export const routerDecisionAgent = new Agent({
  id: "router-decision-agent",
  name: "Router Decision Agent",
  instructions: `Choose the best specialist route for the user request.

Return ONLY JSON:
{
  "route": "code" | "long-context" | "general",
  "confidence": number,
  "reason": string
}

Routing rules:
- code: implementation, refactoring, debugging, code review, APIs, tests
- long-context: large documents, transcripts, policy synthesis, many files
- general: classification, formatting, extraction, simple Q&A

Do not answer the user request. Only choose the route.`,
  model: process.env.ROUTER_MODEL ?? "openai/gpt-5-mini",
});
```

Sì, è un po’ artificiale. Bene. Le valutazioni premiano le giunzioni noiose.

Quando la decisione del router è esplicita, puoi testare il percorso prima di testare lo specialista a valle. È così che scopri se il problema è il router, il modello selezionato, il prompt, l’interfaccia dello strumento o lo scorer della risposta finale.

## Scrivi uno Scorer che Cattura il Fallimento Noioso

`createScorer` di Mastra (<https://mastra.ai/reference/evals/create-scorer>) può usare funzioni JavaScript, prompt di giudizio LLM o entrambi. Inizia con le funzioni quando il fallimento è deterministico. Sono più economiche, più veloci e meno misteriose.

Per l’accuratezza del percorso, non ci serve un modello giudice. Dobbiamo solo analizzare il JSON e confrontare un campo.

```typescript
// src/mastra/scorers/route-accuracy.ts
import { createScorer } from "@mastra/core/evals";

type Route = "code" | "long-context" | "general";
type RouteGroundTruth = {
  route: Route;
  mustMention?: string[];
};

function textFromAgentOutput(output: Array<{ content?: unknown }>) {
  const content = output[0]?.content;
  return typeof content === "string" ? content : JSON.stringify(content ?? "");
}

function parseDecision(output: Array<{ content?: unknown }>) {
  try {
    return JSON.parse(textFromAgentOutput(output)) as {
      route?: string;
      confidence?: number;
      reason?: string;
    };
  } catch {
    return {};
  }
}

export const validRouterJsonScorer = createScorer({
  id: "valid-router-json",
  description: "Checks that the router emits a valid decision object.",
  type: "agent",
})
  .generateScore(({ run }) => {
    const decision = parseDecision(run.output);
    const validRoute = ["code", "long-context", "general"].includes(
      decision.route ?? "",
    );
    const validConfidence =
      typeof decision.confidence === "number" &&
      decision.confidence >= 0 &&
      decision.confidence <= 1;

    return validRoute && validConfidence && decision.reason ? 1 : 0;
  })
  .generateReason(({ score }) =>
    score === 1 ? "Valid router decision." : "Router output was not valid JSON.",
  );

export const routeAccuracyScorer = createScorer({
  id: "route-accuracy",
  description: "Checks whether the selected route matches ground truth.",
  type: "agent",
})
  .generateScore(({ run }) => {
    const expected = run.groundTruth as RouteGroundTruth;
    const decision = parseDecision(run.output);
    return decision.route === expected.route ? 1 : 0;
  })
  .generateReason(({ run, score }) => {
    const expected = run.groundTruth as RouteGroundTruth;
    const decision = parseDecision(run.output);

    return score === 1
      ? `Selected expected route: ${expected.route}.`
      : `Expected ${expected.route}, got ${decision.route ?? "nothing"}.`;
  });
```

Questo scorer non è glamour. È proprio questo il punto.

Se il router non riesce costantemente a produrre JSON valido e a scegliere lo specialista ovvio su un piccolo set di test, non c’è motivo di fidarsi di esso con traffico di produzione. Non ti serve un’ontologia filosofica di valutazione. Hai bisogno dell’equivalente di un rilevatore di fumo con la batteria inserita.

## Esegui Prima il Piccolo Loop di Valutazione

`runEvals` di Mastra (<https://mastra.ai/reference/evals/run-evals>) è il ciclo veloce. Fornisci un target, casi di test, scorer e un limite di concorrenza. Esegue il target sui dati e restituisce punteggi aggregati.

```typescript
// src/mastra/evals/router.eval.ts
import { runEvals } from "@mastra/core/evals";
import { routerDecisionAgent } from "../agents/router-decision-agent";
import {
  routeAccuracyScorer,
  validRouterJsonScorer,
} from "../scorers/route-accuracy";

const routingCases = [
  {
    input: "Refactor this React component to remove duplicated state.",
    groundTruth: { route: "code" },
  },
  {
    input: "Summarize these 14 interview transcripts and find recurring objections.",
    groundTruth: { route: "long-context" },
  },
  {
    input: "Classify this ticket as billing, technical, account, or other.",
    groundTruth: { route: "general" },
  },
  {
    input: "Debug a failing Playwright test that only breaks in CI.",
    groundTruth: { route: "code" },
  },
  {
    input: "Extract the renewal date and contract value from this short paragraph.",
    groundTruth: { route: "general" },
  },
];

const result = await runEvals({
  target: routerDecisionAgent,
  data: routingCases,
  scorers: [validRouterJsonScorer, routeAccuracyScorer],
  targetOptions: {
    modelSettings: { temperature: 0 },
  },
  concurrency: 3,
});

console.log(result.scores);
console.log(result.summary.totalItems);

if (result.scores["valid-router-json"] < 1) {
  throw new Error("Router emitted invalid decision JSON.");
}

if (result.scores["route-accuracy"] < 0.9) {
  throw new Error("Router route accuracy fell below 90%.");
}
```

Questo è il ciclo che esegui mentre modifichi il prompt, aggiungi un nuovo percorso o provi un modello router più economico.

Non è sufficiente per un sistema maturo, ma è abbastanza per evitare la regressione più imbarazzante: “abbiamo cambiato il prompt del router e ha iniziato a inviare compiti di classificazione al modello premium di codice”.

Costo, velocità, qualità e altri compaiono tutti qui:

- **Costo**: il modello del router può rimanere economico se la precisione si mantiene.
- **Velocità**: la valutazione può imporre timeout o registrare la latenza nel harness.
- **Qualità**: la precisione del percorso e la qualità della risposta finale sono punteggi separati.
- **Altro**: la validità del JSON, gli strumenti consentiti, la sicurezza e la tracciabilità hanno i propri controlli.

Non raggruppare tutto in un unico punteggio di “qualità”. Le medie sono dove finiscono i fallimenti utili da ritirare.

## Aggiungi un Giudice LLM Solo Quando Vale la Pena

Alcuni comportamenti del router sono soggettivi. Una richiesta può essere legittimamente ambigua:

```text
Read these logs and tell me why the deploy failed.
```

È `code` perché debugging? `long-context` perché i log? `general` perché un riepilogo? Il percorso corretto dipende dalla superficie degli strumenti e dalla promessa del tuo prodotto.

È qui che un giudice LLM può aiutare, ma solo con una rubrica stretta. Gli scorer Mastra possono mescolare passaggi di funzione e passaggi di prompt‑object. Usa le funzioni per la struttura, poi usa un giudice per la parte che richiede realmente una valutazione.

```typescript
// src/mastra/scorers/route-reasonableness.ts
import { createScorer } from "@mastra/core/evals";
import { z } from "zod";

export const routeReasonablenessScorer = createScorer({
  id: "route-reasonableness",
  description: "Judges whether the route explanation matches the request.",
  type: "agent",
  judge: {
    model: process.env.JUDGE_MODEL ?? "openai/gpt-5-mini",
    instructions: "You are a strict evaluator for model-routing decisions.",
  },
})
  .analyze({
    description: "Evaluate the router's decision rationale.",
    outputSchema: z.object({
      score: z.number().min(0).max(1),
      rationale: z.string(),
    }),
    createPrompt: ({ run }) => `
User request:
${JSON.stringify(run.input)}

Router output:
${JSON.stringify(run.output)}

Score from 0 to 1.

1.0 = route is clearly appropriate and the reason cites the right task signals
0.5 = route is defensible but underspecified or ambiguous
0.0 = route is wrong, unsupported, or the reason is unrelated

Return JSON with { "score": number, "rationale": string }.
`,
  })
  .generateScore(({ results }) => results.analyzeStepResult.score)
  .generateReason(({ results }) => results.analyzeStepResult.rationale);
```

Questo scorer costa denaro perché chiama un modello giudice. Va bene quando il giudizio ne vale la pena.

Non usarlo per verificare se il JSON è parsabile.

## Promuovi i Buoni Casi in un Dataset

Gli array di valutazione hard‑coded vanno bene all’inizio. Col tempo, i tuoi esempi diventano risorse di prodotto: il ticket cliente fallito, la conversazione di supporto strana, il tentativo di injection del prompt, la richiesta che prima veniva instradata correttamente prima di giovedì scorso.

Quello appartiene a un dataset.

I dataset Mastra sono collezioni versionate di casi di test. Ogni mutazione crea una nuova versione, il che significa che puoi rieseguire un esperimento contro l’esatto set di casi che esisteva quando hai preso una decisione sul modello.

Prima configura lo storage, perché i dataset hanno bisogno di persistenza:

```typescript
// src/mastra/index.ts
import { Mastra } from "@mastra/core";
import { LibSQLStore } from "@mastra/libsql";
import { routerDecisionAgent } from "./agents/router-decision-agent";
import {
  routeAccuracyScorer,
  validRouterJsonScorer,
} from "./scorers/route-accuracy";

export const mastra = new Mastra({
  storage: new LibSQLStore({
    id: "router-evals",
    url: "file:./mastra.db",
  }),
  agents: {
    routerDecisionAgent,
  },
  scorers: {
    validRouterJson: validRouterJsonScorer,
    routeAccuracy: routeAccuracyScorer,
  },
});
```

Poi crea un dataset e aggiungi i casi:

```typescript
// src/mastra/evals/create-router-dataset.ts
import { z } from "zod";
import { mastra } from "../index";

const dataset = await mastra.datasets.create({
  name: "router-decisions-v1",
  description: "Representative model-router decisions for CI and experiments.",
  inputSchema: z.string(),
  groundTruthSchema: z.object({
    route: z.enum(["code", "long-context", "general"]),
    source: z.string().optional(),
  }),
});

await dataset.addItems({
  items: [
    {
      input: "Refactor this React component to remove duplicated state.",
      groundTruth: { route: "code", source: "synthetic:happy-path" },
    },
    {
      input: "Summarize these 14 interview transcripts and find recurring objections.",
      groundTruth: { route: "long-context", source: "synthetic:happy-path" },
    },
    {
      input: "Classify this ticket as billing, technical, account, or other.",
      groundTruth: { route: "general", source: "synthetic:happy-path" },
    },
  ],
});
```

Nel momento in cui hai un dataset, puoi smettere di trattare i casi di valutazione come dati di script usa e getta. Ora hanno ID, versioni, cronologia e risultati di esperimenti.

È allora che le valutazioni cominciano a sembrare meno “file di test per prompt” e più memoria di prodotto.

## Esegui Esperimenti Contro il Router

Una volta che il dataset esiste, usa [`dataset.startExperiment()`](https://mastra.ai/reference/datasets/startExperiment) per eseguirlo contro un agente, workflow o scorer registrato.

```typescript
// src/mastra/evals/run-router-experiment.ts
import { mastra } from "../index";

const dataset = await mastra.datasets.get({ id: process.env.ROUTER_DATASET_ID! });

const summary = await dataset.startExperiment({
  name: "router-gpt-5-mini-baseline",
  description: "Baseline router decision run before adding security route.",
  targetType: "agent",
  targetId: "router-decision-agent",
  scorers: ["validRouterJson", "routeAccuracy"],
  metadata: {
    routerModel: process.env.ROUTER_MODEL ?? "openai/gpt-5-mini",
    promptVersion: "router-2026-07-03",
  },
  maxConcurrency: 5,
  itemTimeout: 30_000,
  maxRetries: 1,
});

console.log(`${summary.succeededCount}/${summary.totalItems} items succeeded`);

for (const item of summary.results) {
  const scores = Object.fromEntries(
    item.scores.map((score) => [score.scorerId, score.score]),
  );

  console.log(item.itemId, item.output, scores);
}
```

Ora la conversazione cambia.

Invece di “il nuovo router sembra migliore”, puoi dire:

- Il router vecchio ha ottenuto `0.94` in accuratezza del percorso.
- Il nuovo router ha ottenuto `0.98` complessivamente.
- Ha migliorato il routing a lungo contesto.
- Ha peggiorato due casi di revisione del codice.
- Ha ridotto le consegne al modello premium del 18 %.
- Ha aggiunto 300 ms di latenza al router.

Questa è una conversazione ingegneristica. Ci sono trade‑off. Puoi decidere se il compromesso vale la pena.

## Valuta il comportamento in tempo reale, ma non confonderlo con la verità di riferimento

Mastra può anche collegare i scorer direttamente ad agenti e passaggi di workflow. I scorer in tempo reale vengono eseguiti in modo asincrono e memorizzano i risultati nel database configurato, con controlli di campionamento così da non valutare ogni risposta di produzione a meno che non lo desideri.

È utile, ma è un compito diverso.

```typescript
import { Agent } from "@mastra/core/agent";
import { validRouterJsonScorer } from "../scorers/route-accuracy";

export const routerDecisionAgent = new Agent({
  id: "router-decision-agent",
  instructions: "Choose the best specialist route...",
  model: process.env.ROUTER_MODEL ?? "openai/gpt-5-mini",
  scorers: {
    validRouterJson: {
      scorer: validRouterJsonScorer,
      sampling: { type: "ratio", rate: 1 },
    },
  },
});
```

Il punteggio in tempo reale può dirti che il router sta ancora emettendo decisioni valide. Può intercettare output malformati, contenuti tossici, chiamate a tool proibite, marcatori di evidenza mancanti o una confidenza sospettosamente bassa.

Di solito non può dirti l'accuratezza del percorso, perché il traffico di produzione non arriva con la verità di riferimento allegata.

Questa distinzione è importante. Il punteggio in tempo reale è monitoraggio. Gli esperimenti sui dataset sono test controllati. Vuoi entrambi, ma rispondono a domande diverse.

## Cosa misurare dopo l'accuratezza del percorso

L'accuratezza del percorso è il primo gradino. Indica se la richiesta è stata indirizzata allo specialista previsto. Non indica se lo specialista ha svolto un buon lavoro.

Dopo che il router ha superato le basi, valuta il sistema a più livelli:

| Livello | Cosa valutare | Perché è importante |
|---|---|---|
| Decisione del router | percorso selezionato, confidenza, ragione | Individua errori di classificazione e regole di escalation sbagliate |
| Traiettoria | sequenza prevista di tool o agente | Individua comportamenti “risposta corretta, percorso sbagliato” |
| Output dello specialista | correttezza, fedeltà, utilità | Individua lavoro di bassa qualità dopo un routing corretto |
| Costo e latenza | scelta del modello, token, tempo di esecuzione | Individua vincite costose o lente |
| Sicurezza e ambito | tool consentiti, limiti di rifiuto, evidenze | Individua fallimenti a rischio di prodotto |

L'API `runEvals` di Mastra supporta configurazioni di scorer a livello di agente, workflow, step e traiettoria. Questo significa che non devi fingere che la risposta finale sia l'unico artefatto.

Per un workflow, la forma può essere così:

```typescript
const result = await runEvals({
  target: supportWorkflow,
  data: supportCases,
  scorers: {
    workflow: [finalAnswerQualityScorer],
    steps: {
      "route-request": [routeAccuracyScorer],
      "check-policy": [policyGroundingScorer],
    },
    trajectory: [expectedPathScorer],
  },
});
```

Questo è il modello mentale che voglio per gli agenti in produzione.

Score ladecisione. Score il percorso. Score la risposta.

Se valuti solo la risposta, il modello può passare per caso.

## Il router dovrebbe diventare più noioso col tempo

Il primo prompt di routing è solitamente un paragrafo di giudizi. Va bene per un prototipo.

Man mano che impari dalle valutazioni, parti del router dovrebbero perdere il loro aspetto magico:

- I casi lessicali chiari possono diventare regole deterministiche.  
- I compiti rischiosi possono richiedere un'approvazione esplicita o un ramo del workflow.  
- I compiti ambigui possono porre una domanda di chiarimento invece di indovinare.  
- I percorsi costosi possono richiedere una maggiore confidenza o un secondo segnale.  
- I casi di fallimento noti possono diventare voci del dataset.

L’obiettivo non è rendere il router “più intelligente” per sempre. L’obiettivo è rendere il sistema più facile da ragionare.

A volte ciò significa un modello migliore. A volte significa un prompt più stretto. A volte significa un passaggio del workflow, uno scorer, un limite rigido o un noioso `if` che ti fa risparmiare quattro cifre al mese.

Questo è il motivo per cui misuriamo il comportamento. Smetti di discutere basandoti sul gusto e inizi a discutere basandoti sui dati.

## Una checklist pratica di partenza

Se stai costruendo un router Mastra oggi, inizierei così:

1. Rendi la decisione di routing strutturata, anche se gli utenti non la vedono.  
2. Scrivi scorer deterministici per JSON valido, percorso previsto e percorsi proibiti.  
3. Usa `runEvals` con 10‑20 casi prima di modificare i prompt o i modelli del router.  
4. Promuovi i veri fallimenti in un dataset versionato.  
5. Esegui esperimenti sul dataset per modifiche significative a prompt, modello, percorso o workflow.  
6. Aggiungi scorer in tempo reale per invarianti di produzione a basso costo.  
7. Confronta gli esperimenti per percorso, non solo per punteggio medio.

La media conta meno del cluster di fallimenti.

Se ogni regressione riguarda la sintesi di policy a lungo contesto, non hai “un router peggiore”. Hai un problema di confine del percorso. Se ogni caso fallito utilizza uno strumento specifico, hai un problema di contratto dello strumento. Se ogni modello economico fallisce gli stessi due casi ambigui, potresti aver bisogno di una logica di escalation invece di un default più costoso.

È qui che le valutazioni diventano utili. Non come una cerimonia. Non come una dashboard che fa sentire tutti temporaneamente adulti.

Come modo per scoprire la forma del sistema.

## Risorse

- [Panoramica degli scorer Mastra](https://mastra.ai/docs/evals/overview)  
- [Riferimento `createScorer` di Mastra](https://mastra.ai/reference/evals/create-scorer)  
- [Riferimento `runEvals` di Mastra](https://mastra.ai/reference/evals/run-evals)  
- [Panoramica dei dataset Mastra](https://mastra.ai/docs/evals/datasets/overview)  
- [Esperimenti sui dataset Mastra](https://mastra.ai/docs/evals/datasets/running-experiments)  
- [Non sposare il tuo modello](/llm-routing-mastra-ai)  
- [Combatti il male con le valutazioni!](/llm-evals-are-broken)
````
