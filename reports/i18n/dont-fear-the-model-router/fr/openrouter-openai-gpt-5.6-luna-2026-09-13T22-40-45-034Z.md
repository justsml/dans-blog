# Translation Candidate
- Slug: dont-fear-the-model-router
- Locale: fr
- Model: openrouter/openai/gpt-5.6-luna
- Target: src/content/posts/2026-07-03--dont-fear-the-model-router/fr/index.mdx
- Validation: deferred
- Runtime seconds: 43.85
- Input tokens: 11204
- Output tokens: 5829
- Thinking tokens: unknown
- Cached input tokens: 4336
- Cache write tokens: 6853
- Estimated cost: $0.008455
- Pricing source: openrouter-2026-09-13
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
title: N’ayez pas peur du routeur de modèles
subTitle: Acheminez la requête vers le meilleur modèle avec assurance.
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
[Ne vous mariez pas avec votre modèle](/llm-routing-mastra-ai) avançait l’argument simple : arrêtez d’envoyer chaque tâche au même modèle simplement parce qu’il a remporté le dernier benchmark.

Utilisez un modèle peu coûteux pour les tâches peu coûteuses. Utilisez un modèle plus puissant là où le travail est réellement difficile. Gardez la couche de routage suffisamment souple pour que changer de fournisseur ne transforme pas votre codebase en sanctuaire.

C’était juste.

C’était aussi incomplet.

Dès que vous ajoutez un routeur, vous introduisez un nouveau comportement système à tester. La question n’est plus « quel modèle est le meilleur ? », mais « le système a-t-il choisi la bonne route, utilisé les bons outils, conservé les bonnes preuves et arrêté son traitement au bon moment ? »

Si vous ne mesurez pas cela, votre routeur de modèles n’est que de l’intuition avec une table de dispatch.

<p class="inset">
Le routeur n’est pas la réponse. Le routeur est une hypothèse sur la façon dont votre système devrait se comporter.
</p>

Mastra fournit les interfaces nécessaires pour rendre cette hypothèse testable : [scorers](https://mastra.ai/docs/evals/overview), [`runEvals`](https://mastra.ai/reference/evals/run-evals), [datasets](https://mastra.ai/docs/evals/datasets/overview) et [experiments](https://mastra.ai/docs/evals/datasets/running-experiments). Les noms évoquent l’infrastructure d’évaluation — c’est bien ce qu’ils sont. Leur vraie valeur est plus simple : ils rendent le comportement des agents suffisamment visible pour qu’on puisse le confronter aux faits.

## Que testons-nous ?

Le routeur du billet précédent comporte trois routes spécialisées :

| Route | Ce qui doit y être envoyé | Ce qui constituerait une mauvaise route |
|---|---|---|
| `code` | implémentation, refactorisation, débogage, revue de code | synthèse de contextes longs, classification simple |
| `long-context` | documents désordonnés, transcriptions, synthèse de politiques, nombreux fichiers | formatage mécanique court |
| `general` | classification, formatage, questions-réponses simples, extraction sans difficulté | code complexe ou analyse nécessitant beaucoup de preuves |

Ce tableau est un début. Ce n’est pas une évaluation.

Une évaluation a besoin d’exemples et de scorers :

| Élément | Rôle |
|---|---|
| Élément du dataset | « Voici une requête représentative. » |
| Vérité terrain | « Voici la route ou le comportement attendu. » |
| Scorer | « Voici comment nous déterminons si la sortie est validée. » |
| Expérience | « Voici l’exécution que nous pouvons comparer aux prochaines. » |

Le point essentiel consiste à tester le comportement, pas seulement la qualité de la prose.

Un modèle peut rédiger une réponse remarquable après avoir choisi le mauvais spécialiste. Un agent de sécurité peut produire un rapport plausible sans conserver les preuves. Un agent de support peut sembler empathique tout en ignorant la vérification de la politique de remboursement. Le paragraphe est la partie visible. Les bugs se trouvent dans la trajectoire.

Pour un routeur, je commence par quatre axes :

| Axe | Question | Exemple de scorer |
|---|---|---|
| Qualité | A-t-il choisi la bonne route et produit un résultat utile ? | exactitude du routage, exhaustivité de la réponse, fidélité |
| Coût | A-t-il évité les modèles premium pour les tâches sans intérêt ? | classe de coût de la route sélectionnée, budget de tokens |
| Vitesse | A-t-il terminé dans le budget de latence du produit ? | scorer de durée d’exécution ou de timeout |
| Autre | A-t-il respecté les contraintes de sécurité, de confidentialité et d’observabilité ? | liste d’autorisation des outils, conservation des preuves, comportement de refus |

Cette dernière ligne compte. C’est là que se trouve le vécu douloureux de la production.

## Rendre la décision du routeur évaluable

Si le routeur ne produit qu’une réponse finale, vous ne faites que deviner sa décision. Vous pouvez évaluer la sortie, mais vous ne pouvez pas déterminer si la route était la bonne.

Donnez donc à l’étape de routage un petit contrat structuré :

```typescript
type RouterDecision = {
  route: "code" | "long-context" | "general";
  confidence: number;
  reason: string;
};
```

Les utilisateurs n’ont jamais besoin de voir ce JSON. Il peut s’agir d’une étape interne, d’un transfert dans un workflow ou d’un span de trace. Le scorer doit simplement pouvoir y accéder.

Voici un agent Mastra volontairement minimal, qui ne fait rien d’autre que choisir une route :

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

Oui, c’est un peu artificiel. Tant mieux. Les évaluations récompensent les interfaces ennuyeuses.

Une fois la décision explicitée, vous pouvez tester la route avant l’exécution du spécialiste en aval. Les défaillances du routeur cessent de se cacher derrière celles du modèle sélectionné, de son prompt, de ses outils ou du scorer de réponse finale.

## Écrire un scorer qui détecte la défaillance basique

[`createScorer`](https://mastra.ai/reference/evals/create-scorer) de Mastra accepte de simples fonctions JavaScript, des prompts pour un juge LLM, ou les deux. Commencez par des fonctions dès que la défaillance est déterministe. Elles sont moins chères, plus rapides et moins mystérieuses.

La précision du routage n’a pas besoin d’un modèle juge. Elle doit parser du JSON et comparer un champ.

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

Ce scorer n’a rien de glamour. C’est précisément le but.

Si le routeur n’arrive pas à produire systématiquement du JSON valide et à choisir le spécialiste évident sur un petit jeu de tests, rien ne justifie de lui confier du trafic de production. Vous n’avez pas besoin d’un modèle philosophe pour noter une ontologie. Vous avez besoin d’un détecteur de fumée avec une pile.

## Commencer par la petite boucle d’évaluation

[`runEvals`](https://mastra.ai/reference/evals/run-evals) constitue la boucle rapide. Donnez-lui une cible, des cas de test, des scorers et une limite de concurrence. Il exécute la cible sur les données et renvoie des scores agrégés.

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

C’est la boucle à exécuter lorsque vous modifiez le prompt, ajoutez une route ou essayez un modèle de routage moins cher.

Elle ne suffit pas pour un système mature. Elle suffit à éviter la régression la plus embarrassante : « nous avons modifié le prompt du routeur et il a commencé à envoyer les tâches de classification au modèle de code premium ».

Gardez les axes séparés. La précision du routage et la qualité de la réponse finale sont deux scores différents. La validité du JSON, les outils autorisés et la traçabilité doivent avoir leurs propres contrôles. Ne les fusionnez pas en un seul nombre de « qualité ». C’est dans les moyennes que les défaillances utiles vont prendre leur retraite.

## N’ajoutez un juge LLM que là où il est réellement utile

Certains routages sont légitimement ambigus :

```text
Read these logs and tell me why the deploy failed.
```

Est-ce `code` parce qu’il s’agit de débogage ? `long-context` à cause des logs ? `general` parce que l’utilisateur demande un résumé ? La bonne route dépend des outils disponibles et de ce que votre produit promet.

C’est là qu’un juge LLM peut aider, mais uniquement avec une grille d’évaluation stricte. Les scorers Mastra peuvent combiner des étapes fonctionnelles et des étapes basées sur des objets de prompt. Utilisez des fonctions pour la structure, puis un juge pour la partie qui nécessite réellement un jugement.

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

Ce scorer coûte de l’argent, puisqu’il appelle un modèle juge. Ce n’est pas un problème lorsque le jugement le justifie.

Ne l’utilisez pas pour vérifier que le JSON est valide.

## Faites des bons cas un dataset

Au début, des tableaux d’evals codés en dur font très bien l’affaire. Avec le temps, vos exemples deviennent des actifs produit : le ticket client qui a échoué, la conversation de support bizarre, la tentative d’injection de prompt, la requête qui était correctement routée jusqu’à jeudi dernier.

Ces cas doivent aller dans un dataset.

Les datasets Mastra sont des collections versionnées de cas de test. Chaque modification crée une nouvelle version, ce qui vous permet de relancer une expérience sur exactement l’ensemble de cas qui existait lorsque vous avez pris une décision concernant le modèle.

Les datasets nécessitent une couche de persistance ; configurez donc d’abord le stockage :

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

Créez ensuite le dataset et ajoutez les cas :

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

Une fois que vous avez un dataset, les cas d’eval cessent d’être des données jetables dans un script. Ils ont des identifiants, des versions, un historique et des résultats d’expérience.

C’est à ce moment que les evals cessent de ressembler à des « fichiers de test pour les prompts » et commencent à ressembler à la mémoire du produit.

## Lancez des expériences sur le routeur

Une fois le dataset en place, [`dataset.startExperiment()`](https://mastra.ai/reference/datasets/startExperiment) l’exécute sur un agent, un workflow ou un scorer enregistré.

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

La conversation change alors.

Au lieu de dire « le nouveau routeur semble meilleur », vous pouvez dire :

- L’ancien routeur obtenait `0.94` en précision de routage.
- Le nouveau routeur obtenait `0.98`.
- Il améliorait le routage des requêtes à long contexte.
- Il régressait sur deux cas de revue de code.
- Il réduisait de 18 % les transferts vers des modèles premium.
- Il ajoutait 300 ms de latence au routeur.

C’est une vraie conversation d’ingénierie. Les compromis sont explicites, et vous pouvez décider si l’échange en vaut la peine.

## Mesurez le comportement en production, sans le confondre avec la vérité terrain

Mastra peut également associer des scorers directement aux agents et aux étapes de workflow. Les scorers en production s’exécutent de manière asynchrone, enregistrent leurs résultats dans la base de données que vous avez configurée et prennent en charge l’échantillonnage : vous n’avez donc pas à évaluer chaque réponse de production, sauf si c’est réellement ce que vous voulez.

Utile. Mais leur rôle est différent.

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

L’évaluation en production vous indique que le routeur continue à produire des décisions valides. Elle détecte les sorties malformées, les contenus toxiques, les appels d’outils interdits, les marqueurs de preuve manquants et les niveaux de confiance anormalement faibles.

Elle ne peut généralement pas déterminer la précision du routage, car les requêtes de production n’arrivent pas avec une vérité terrain agrafée dessus.

L’évaluation en production relève de la supervision. Les expériences sur des jeux de données sont des tests contrôlés. Il vous faut les deux. Ils répondent à des questions différentes.

## Que mesurer après la précision du routage

La précision du routage est le premier échelon. Elle indique que la requête est arrivée chez le spécialiste attendu. Elle ne dit rien de la qualité du travail réalisé par ce spécialiste.

Une fois que le routeur passe les contrôles de base, évaluez le système par couches :

| Couche | Élément à évaluer | Pourquoi c’est important |
|---|---|---|
| Décision du routeur | route sélectionnée, niveau de confiance, justification | Détecte les erreurs de classification et les mauvaises règles d’escalade |
| Trajectoire | séquence attendue d’outils ou d’agents | Détecte les comportements du type « bonne réponse, mauvais chemin » |
| Sortie du spécialiste | exactitude, fidélité, utilité | Détecte le travail de mauvaise qualité après un routage correct |
| Coût et latence | choix du modèle, tokens, durée d’exécution | Détecte les victoires coûteuses ou lentes |
| Sécurité et périmètre | outils autorisés, limites de refus, éléments probants | Détecte les défaillances présentant un risque produit |

`runEvals` prend en charge les configurations de scorers au niveau de l’agent, du workflow, de l’étape et de la trajectoire. Vous n’avez donc pas à faire semblant que la réponse finale est le seul artefact qui compte.

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

Voici le modèle mental que je recommande pour les agents en production :

Évaluez la décision. Évaluez le chemin. Évaluez la réponse.

Si vous n’évaluez que la réponse, le modèle peut réussir par accident.

## Le routeur devrait devenir de plus en plus ennuyeux avec le temps

Le premier prompt de routage est généralement un paragraphe rempli de choix à faire au jugé. Très bien pour un prototype.

À mesure que les évaluations vous apprennent des choses, certaines parties du routeur devraient devenir moins magiques :

- Les cas lexicaux évidents deviennent des règles déterministes.
- Les tâches risquées exigent une approbation explicite ou une branche de workflow.
- Les tâches ambiguës posent une question de clarification au lieu de deviner.
- Les routes coûteuses exigent un niveau de confiance plus élevé ou un second signal.
- Les cas d’échec connus deviennent des éléments du dataset.

L’objectif n’est pas de rendre le routeur « plus intelligent » indéfiniment. L’objectif est de rendre le système plus facile à raisonner.

Parfois, cela signifie un meilleur modèle. Parfois, un prompt plus strict. Parfois, une étape de workflow, un scorer, un plafond strict ou un banal `if` qui vous fait économiser plusieurs milliers par mois.

C’est tout l’intérêt de mesurer le comportement. Vous cessez de vous disputer sur les préférences et commencez à vous appuyer sur les faits.

## Une checklist pratique pour commencer

Si vous construisez aujourd’hui un routeur Mastra, commencez ici :

1. Structurez la décision de routage, même si les utilisateurs ne la voient jamais.
2. Écrivez des scorers déterministes pour vérifier le JSON valide, la route attendue et les routes interdites.
3. Utilisez `runEvals` avec 10 à 20 cas avant de modifier les prompts ou les modèles du routeur.
4. Transformez les échecs réels en dataset versionné.
5. Lancez des expériences sur le dataset pour tout changement significatif de prompt, de modèle, de route ou de workflow.
6. Ajoutez des scorers en production pour vérifier les invariants peu coûteux.
7. Comparez les expériences par route, et pas uniquement sur la base du score moyen.

La moyenne compte moins que le regroupement des échecs.

Si toutes les régressions concernent la synthèse de politiques avec un long contexte, vous n’avez pas « un routeur moins bon ». Vous avez un problème de frontière entre les routes. Si chaque cas en échec utilise un outil spécifique, vous avez un problème de contrat d’outil. Si le modèle bon marché échoue toujours sur les deux mêmes cas ambigus, il vous faut une logique d’escalade, pas un modèle par défaut plus coûteux.

C’est là que les évaluations deviennent utiles. Elles ne sont ni une cérémonie ni un tableau de bord destiné à donner à tout le monde, temporairement, l’impression d’être devenu adulte. Elles vous montrent quelle partie du système échoue, afin que vous puissiez corriger cette partie plutôt que tout refaire.

## Ressources

- [Vue d’ensemble des scorers Mastra](https://mastra.ai/docs/evals/overview)
- [Référence de `createScorer` de Mastra](https://mastra.ai/reference/evals/create-scorer)
- [Référence de `runEvals` de Mastra](https://mastra.ai/reference/evals/run-evals)
- [Vue d’ensemble des datasets Mastra](https://mastra.ai/docs/evals/datasets/overview)
- [Expériences sur les datasets Mastra](https://mastra.ai/docs/evals/datasets/running-experiments)
- [Ne vous mariez pas avec votre modèle](../llm-routing-mastra-ai)
- [Combattez les démons avec des évaluations !](../llm-evals-are-broken)
````
