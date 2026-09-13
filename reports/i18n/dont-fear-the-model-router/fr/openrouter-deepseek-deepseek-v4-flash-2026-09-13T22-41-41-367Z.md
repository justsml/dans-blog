# Translation Candidate
- Slug: dont-fear-the-model-router
- Locale: fr
- Model: openrouter/deepseek/deepseek-v4-flash
- Target: src/content/posts/2026-07-03--dont-fear-the-model-router/fr/index.mdx
- Validation: deferred
- Runtime seconds: 142.62
- Input tokens: 12272
- Output tokens: 32997
- Thinking tokens: unknown
- Cached input tokens: 2560
- Cache write tokens: 0
- Estimated cost: $0.003478
- Pricing source: openrouter-2026-09-13
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
title: N'ayez pas peur du Model Router
subTitle: La voie vers le meilleur modèle en toute confiance.
modified: '2026-09-04'
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
sourceHash: 9599850328a0
---
[Ne mariez pas votre modèle](/llm-routing-mastra-ai) a défendu l'argument simple : arrêtez d'envoyer chaque tâche au même modèle parce qu'il a gagné le dernier comparatif.

Utilisez un modèle bon marché pour les tâches simples. Utilisez un modèle plus performant là où le travail est vraiment difficile. Gardez la couche de routage suffisamment flexible pour que le changement de fournisseur ne transforme pas votre codebase en temple.

C'était juste.

Mais c'était aussi incomplet.

Dès que vous ajoutez un routeur, vous avez un nouveau comportement système à tester. La question n'est plus « quel est le meilleur modèle ? » mais « le système a-t-il choisi la bonne route, utilisé les bons outils, conservé les bonnes preuves et s'est-il arrêté au bon moment ? »

Si vous ne mesurez pas cela, votre routeur de modèle n'est que des vibes avec une table de répartition.

<p class="inset">
Le routeur n'est pas la réponse. Le routeur est une hypothèse sur le comportement attendu de votre système.
</p>

Mastra dispose des surfaces pour transformer cette hypothèse en quelque chose de testable : [scorers](https://mastra.ai/docs/evals/overview), [`runEvals`](https://mastra.ai/reference/evals/run-evals), [datasets](https://mastra.ai/docs/evals/datasets/overview) et [experiments](https://mastra.ai/docs/evals/datasets/running-experiments). Les noms ressemblent à de l'infrastructure d'évaluation, et ils le sont. La vraie valeur est plus simple : ils rendent le comportement des agents suffisamment visible pour qu'on puisse en discuter.

## Que testons-nous ?

Le routeur du billet précédent propose trois routes spécialisées :

| Route | Ce qui doit y aller | Ce qui serait une mauvaise route |
|---|---|---|
| `code` | implémentation, refactoring, débogage, revue de code | résumé de longs contextes, classification simple |
| `long-context` | documents désordonnés, transcriptions, synthèse de politiques, nombreux fichiers | formatage mécanique court |
| `general` | classification, formatage, questions-réponses simples, extraction banale | code difficile ou analyse nécessitant beaucoup de preuves |

Ce tableau est un début. Ce n'est pas une évaluation.

Une évaluation a besoin d'exemples et de scorers :

| Élément | Rôle |
|---|---|
| Élément de jeu de données | « Voici une requête représentative. » |
| Vérité terrain | « Voici la route ou le comportement attendu. » |
| Scorer | « Voici comment nous décidons si la sortie est acceptable. » |
| Expérience | « Voici l'exécution que nous pourrons comparer aux exécutions futures. » |

La démarche importante est de tester le comportement, pas seulement la qualité de la prose.

Un modèle peut écrire une belle réponse après avoir choisi le mauvais spécialiste. Un agent de sécurité peut produire un rapport plausible sans préserver les preuves. Un agent de support peut sembler empathique tout en ignorant la vérification de la politique de remboursement. Le paragraphe est la partie visible. La trajectoire est là où se cachent les bugs.

Pour un routeur, je commence par quatre axes :

| Axe | Question | Exemple de scorer |
|---|---|---|
| Qualité | A-t-il choisi la bonne route et produit un résultat utile ? | précision de la route, complétude de la réponse, fidélité |
| Coût | A-t-il évité les modèles premium pour les tâches ennuyeuses ? | classe de coût de la route sélectionnée, budget de tokens |
| Rapidité | A-t-il terminé dans le budget de latence du produit ? | scorer de temps d'exécution ou de délai d'attente |
| Autre | A-t-il respecté les contraintes de sécurité, de confidentialité et d'observabilité ? | liste blanche d'outils, préservation des preuves, comportement de refus |

Cette dernière ligne compte. « Autre » est l'endroit où vit le tissu cicatriciel de la production.

## Rendre la décision du routeur évaluable

Si le routeur ne produit qu'une réponse finale, vous devinez la décision. Vous pouvez évaluer la sortie, mais vous ne pouvez pas dire si la route était correcte.

Donc donnez à l'étape de routage un petit contrat structuré :

```typescript
type RouterDecision = {
  route: "code" | "long-context" | "general";
  confidence: number;
  reason: string;
};
```

Les utilisateurs n'ont jamais besoin de voir ce JSON. Il peut s'agir d'une étape interne, d'un transfert de workflow ou d'une span de trace. Le scorer a seulement besoin d'y accéder.

Voici un agent Mastra délibérément petit qui ne fait que choisir une route :

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

Oui, c'est un peu artificiel. Bien. Les evals récompensent les coutures ennuyeuses.

Avec la décision explicite, vous pouvez tester la route avant que le spécialiste aval ne s'exécute. Les échecs du routeur cessent de se cacher derrière des échecs du modèle sélectionné, de son prompt, de ses outils ou du scorer de réponse finale.

## Écrire un scorer qui détecte l'échec ennuyeux

Le [`createScorer`](https://mastra.ai/reference/evals/create-scorer) de Mastra accepte des fonctions JavaScript pures, des prompts de juge LLM, ou les deux. Commencez par des fonctions quand l'échec est déterministe. Elles sont moins chères, plus rapides et moins mystérieuses.

La précision de la route n'a pas besoin d'un modèle juge. Elle a besoin d'analyser JSON et de comparer un champ.

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

Ce scorer n'est pas glamour. C'est le but.

Si le routeur ne peut pas produire de manière fiable du JSON valide et choisir le spécialiste évident sur un petit ensemble de test, il n'y a aucune raison de lui faire confiance en production. Vous n'avez pas besoin d'un modèle philosophe notant une ontologie. Vous avez besoin d'un détecteur de fumée avec une pile dedans.

## Exécuter d'abord la petite boucle d'évaluation

[`runEvals`](https://mastra.ai/reference/evals/run-evals) est la boucle rapide. Donnez-lui une cible, des cas de test, des scorers et une limite de concurrence. Elle exécute la cible sur les données et renvoie les scores agrégés.

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

C'est la boucle que vous exécutez en modifiant le prompt, en ajoutant une route ou en essayant un modèle de routeur moins cher.

Ce n'est pas suffisant pour un système mature. C'est suffisant pour empêcher la régression la plus embarrassante : « nous avons changé le prompt du routeur et il a commencé à envoyer des tâches de classification au modèle de code premium. »

Gardez les axes séparés. La précision de la route et la qualité de la réponse finale sont des scores différents. La validité JSON, les outils autorisés et la traçabilité ont leurs propres vérifications. Ne les fusionnez pas en un seul nombre de « qualité ». Les moyennes sont l'endroit où les échecs utiles vont prendre leur retraite.

## N'ajoutez un juge LLM que là où il en vaut la peine

Certaines décisions de routage sont légitimement ambiguës :

```text
Read these logs and tell me why the deploy failed.
```

Est-ce du `code` parce qu'il s'agit de débogage ? `long-context` à cause des logs ? `general` parce que l'utilisateur demande un résumé ? La bonne route dépend des outils disponibles et de ce que promet votre produit.

C'est là qu'un juge LLM est utile, mais seulement avec une grille d'évaluation stricte. Les scorers Mastra peuvent mélanger des étapes de fonctions et des étapes de prompt-objet. Utilisez des fonctions pour la structure, puis un juge pour la partie qui nécessite réellement un jugement.

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

Ce scorer coûte de l'argent car il appelle un modèle juge. C'est acceptable lorsque le jugement en vaut la peine.

Ne l'utilisez pas pour vérifier si le JSON parse.

## Promouvez les bons cas dans un jeu de données

Les tableaux d'évaluation codés en dur sont acceptables au début. Avec le temps, vos exemples deviennent des actifs produit : le ticket client qui a échoué, la conversation de support étrange, la tentative d'injection de prompt, la requête qui s'est routée correctement jusqu'à jeudi dernier.

Ceux-ci ont leur place dans un jeu de données.

Les jeux de données Mastra sont des collections versionnées de cas de test. Chaque mutation crée une nouvelle version, afin que vous puissiez relancer une expérience sur l'ensemble exact de cas qui existait lorsque vous avez pris une décision de modèle.

Les jeux de données nécessitent de la persistance, donc configurez d'abord le stockage :

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

Créez ensuite le jeu de données et ajoutez des cas :

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

Une fois que vous avez un jeu de données, les cas d'évaluation cessent d'être des données de script jetables. Ils ont des ID, des versions, un historique et des résultats d'expériences.

C'est alors que les évaluations cessent d'être perçues comme des « fichiers de test pour prompts » et commencent à ressembler à une mémoire produit.

## Lancez des expériences sur le routeur

Une fois le jeu de données en place, [`dataset.startExperiment()`](https://mastra.ai/reference/datasets/startExperiment) l'exécute sur un agent, un workflow ou un scorer enregistré.

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

Maintenant, le discours change.

Au lieu de « le nouveau routeur semble meilleur », vous pouvez dire :

- Le routeur original a obtenu 0,94 de précision de routage.
- Le nouveau routeur a obtenu 0,98.
- Il a amélioré le routage long contexte.
- Il a régressé sur deux cas de revue de code.
- Il a réduit les transferts de 18 % vers les modèles premium.
- Il a ajouté 300 ms de latence au routeur.

C'est une conversation d'ingénierie. Il y a des compromis sur la table, et vous pouvez décider si l'échange en vaut la peine.

## Évaluer le comportement en production, sans le confondre avec la vérité terrain

Mastra peut également attacher des scoreurs directement aux agents et aux étapes de workflow. Les scoreurs en production s'exécutent de manière asynchrone, stockent les résultats dans votre base de données configurée et supportent l'échantillonnage, de sorte que vous n'évaluez pas chaque réponse en production sauf si vous le souhaitez.

Utile. Et un boulot différent.

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

Le scoring en production vous indique que le routeur émet toujours des décisions valides. Il détecte les sorties malformées, le contenu toxique, les appels d'outils interdits, les marqueurs de preuve manquants et une confiance anormalement basse.

Il ne peut généralement pas vous renseigner sur la précision du routage, car le trafic de production n'arrive pas avec une vérité terrain attachée.

Le scoring en production, c'est du monitoring. Les expériences sur jeux de données sont des tests contrôlés. Vous avez besoin des deux. Ils répondent à des questions différentes.

## Que mesurer après la précision du routage

La précision du routage est le premier barreau. Elle vous indique que la requête a atteint le spécialiste attendu. Elle ne dit rien sur la qualité du travail de ce spécialiste.

Une fois que le routeur passe les basiques, évaluez le système par couches :

| Couche | Que scorer | Pourquoi c'est important |
|---|---|---|
| Décision du routeur | route sélectionnée, confiance, raison | Détecte les mauvaises classifications et les mauvaises règles d'escalade |
| Trajectoire | séquence d'outil ou d'agent attendue | Détecte le comportement « bonne réponse, mauvais chemin » |
| Sortie du spécialiste | exactitude, fidélité, utilité | Détecte un travail de faible qualité après un routage correct |
| Coût et latence | choix du modèle, tokens, temps d'exécution | Détecte les victoires coûteuses ou lentes |
| Sécurité et périmètre | outils autorisés, limites de refus, preuves | Détecte les échecs à risque produit |

`runEvals` supporte les configurations de scoreur au niveau agent, workflow, étape et trajectoire, vous n'avez donc pas à faire comme si la réponse finale était le seul artefact.

Pour un workflow, la structure ressemble à ceci :

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

C'est le modèle mental que je veux pour les agents en production :

- Scorer la décision.
- Scorer le chemin.
- Scorer la réponse.

Si vous ne scorez que la réponse, le modèle peut passer par accident.

## Le routeur devrait devenir plus ennuyeux avec le temps

## Le routeur devrait devenir plus ennuyeux avec le temps

Le premier prompt de routage est généralement un paragraphe de jugements. Idéal pour un prototype.

À mesure que les évaluations vous apprennent des choses, certaines parties du routeur devraient devenir moins magiques :

- Les cas lexicaux clairs deviennent des règles déterministes.
- Les tâches risquées nécessitent une approbation explicite ou une branche de workflow.
- Les tâches ambiguës posent une question de clarification au lieu de deviner.
- Les routes coûteuses exigent une confiance plus élevée ou un deuxième signal.
- Les cas d'échec connus deviennent des éléments de jeu de données.

Le but n'est pas de rendre le routeur « plus intelligent » indéfiniment. Le but est de rendre le système plus facile à raisonner.

Parfois, cela signifie un meilleur modèle. Parfois un prompt plus serré. Parfois une étape de workflow, un scorer, une limite stricte, ou une ennuyeuse instruction `if` qui vous économise quatre chiffres par mois.

C'est tout l'intérêt de mesurer le comportement. Vous arrêtez de débattre à partir de goûts et commencez à débattre à partir de preuves.

## Une liste de contrôle pratique pour démarrer

Si vous construisez un routeur Mastra aujourd'hui, commencez ici :

1. Rendre la décision de routage structurée, même si les utilisateurs ne la voient jamais.
2. Écrire des scorers déterministes pour le JSON valide, la route attendue et les routes interdites.
3. Utiliser `runEvals` avec 10 à 20 cas avant de modifier les prompts ou les modèles du routeur.
4. Promouvoir les échecs réels dans un jeu de données versionné.
5. Exécuter des expériences de jeu de données pour les modifications significatives de prompt, modèle, route ou workflow.
6. Ajouter des scorers en direct pour les invariants peu coûteux en production.
7. Comparer les expériences par route, pas seulement par score moyen.

La moyenne importe moins que le cluster d'échecs.

Si chaque régression se trouve dans la synthèse de politique de long contexte, vous n'avez pas « un moins bon routeur ». Vous avez un problème de limite de route. Si chaque cas d'échec utilise un outil spécifique, vous avez un problème de contrat d'outil. Si chaque modèle bon marché échoue sur les deux mêmes cas ambigus, vous avez besoin d'une logique d'escalade, pas d'un défaut plus coûteux.

C'est là que les évaluations deviennent utiles. Ce n'est pas une cérémonie, ou un tableau de bord qui fait que tout le monde se sent temporairement adulte. Elles vous montrent quelle partie du système échoue, afin que vous puissiez réparer cette partie au lieu de tout.

## Ressources

- [Aperçu des scorers Mastra](https://mastra.ai/docs/evals/overview)
- [Référence `createScorer` de Mastra](https://mastra.ai/reference/evals/create-scorer)
- [Référence `runEvals` de Mastra](https://mastra.ai/reference/evals/run-evals)
- [Aperçu des jeux de données Mastra](https://mastra.ai/docs/evals/datasets/overview)
- [Expériences de jeux de données Mastra](https://mastra.ai/docs/evals/datasets/running-experiments)
- [Ne mariez pas votre modèle](../llm-routing-mastra-ai)
- [Combattez les maux avec les évaluations !](../llm-evals-are-broken)
````
