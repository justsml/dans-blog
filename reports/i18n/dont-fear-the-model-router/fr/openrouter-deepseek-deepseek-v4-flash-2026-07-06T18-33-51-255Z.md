# Translation Candidate
- Slug: dont-fear-the-model-router
- Locale: fr
- Model: openrouter/deepseek/deepseek-v4-flash
- Target: src/content/posts/2026-07-03--dont-fear-the-model-router/fr/index.mdx
- Validation: rejected: direct AI SDK translation failed
- Runtime seconds: 93.81
- Input tokens: 11466
- Output tokens: 11420
- Thinking tokens: unknown
- Cached input tokens: 2048
- Cache write tokens: 0
- Estimated cost: $0.004522
- Pricing source: local-openrouter-estimate
- Note: Command failed: bun run i18n:validate --slug dont-fear-the-model-router --locale fr --skip-global (code 1)
## Raw Output

````mdx
---
title: N'ayez pas peur du routeur de modèle
subTitle: Choisissez le meilleur modèle en toute confiance.
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
La première version de [Don't Marry Your Model](/llm-routing-mastra-ai) défendait une thèse simple : arrêtez d'envoyer chaque tâche au même modèle juste parce qu'il a gagné le dernier comparatif.

Utilisez un modèle économique pour les tâches simples. Réservez un modèle plus puissant pour les tâches réellement complexes. Gardez la couche d'acheminement assez flexible pour changer de fournisseur sans transformer votre codebase en sanctuaire.

C'était juste.

C'était aussi incomplet.

Parce qu'une fois que vous ajoutez un routeur, vous avez un nouveau comportement système à tester. La question n'est plus « quel modèle est le meilleur ? » La question est « le système a-t-il choisi la bonne route, utilisé les bons outils, conservé les bonnes preuves et s'est-il arrêté au bon moment ? »

Si vous ne mesurez pas cela, votre routeur de modèle n'est que des vibes avec une table de routage.

<p class="inset">
Le routeur n'est pas la réponse. Le routeur est une hypothèse sur la façon dont votre système devrait se comporter.
</p>

Mastra nous offre des surfaces utiles pour transformer cette hypothèse en quelque chose de testable : les [scorers](https://mastra.ai/docs/evals/overview), [`runEvals`](https://mastra.ai/reference/evals/run-evals), les [jeux de données](https://mastra.ai/docs/evals/datasets/overview) et les [expériences](https://mastra.ai/docs/evals/datasets/running-experiments). Les noms d'API ressemblent à de l'infrastructure d'évaluation, ce qu'ils sont, mais la vraie valeur est plus simple :

Ils rendent le comportement de l'agent suffisamment visible pour qu'on puisse le discuter.

## Que testons-nous ?

Le routeur de modèle du précédent article a trois routes spécialisées évidentes :

| Route | Ce qui devrait y aller | Ce qui serait une mauvaise route |
|---|---|---|
| `code` | implémentation, refactorisation, débogage, revue de code | résumé de longs contextes, classification simple |
| `long-context` | documents complexes, transcriptions, synthèse de politiques, nombreux fichiers | mise en forme mécanique courte |
| `general` | classification, mise en forme, Q&A simple, extraction basique | code difficile ou analyse riche en preuves |

Ce tableau est un début, mais ce n'est pas une évaluation.

Une évaluation a besoin d'exemples et de scorers :

| Élément | Rôle |
|---|---|
| Élément du jeu de données | « Voici une requête représentative. » |
| Vérité terrain | « Voici la route ou le comportement attendu. » |
| Scorer | « Voici comment nous décidons si la sortie est valide. » |
| Expérience | « Voici l'exécution que nous pourrons comparer aux futures exécutions. » |

La démarche importante est de tester le comportement, pas seulement la qualité de la prose.

Un modèle peut produire une réponse magnifique après avoir choisi le mauvais spécialiste. Un agent de sécurité peut fournir un rapport plausible sans conserver les preuves. Un agent de support peut sembler empathique tout en sautant la vérification de la politique de remboursement. Le paragraphe est la partie visible. La trajectoire est l'endroit où vivent les bugs.

Pour un routeur, je commence généralement par quatre axes :

| Axe | Question | Exemple d'évaluateur |
|---|---|---|
| Qualité | A-t-il choisi le bon itinéraire et produit un résultat utile ? | précision de l'itinéraire, exhaustivité de la réponse, fidélité |
| Coût | A-t-il évité les modèles premium pour un travail banal ? | classe de coût de l'itinéraire sélectionné, budget de tokens |
| Vitesse | A-t-il terminé dans le budget de latence du produit ? | évaluateur de temps d'exécution ou de timeout |
| Autre | A-t-il respecté les contraintes de sécurité, de confidentialité et d'observabilité ? | liste d'autorisation d'outils, préservation des preuves, comportement de refus |

Cette dernière colonne compte. « Autre » est l'endroit où la cicatrice de production se trouve.

## Rendre la décision du routeur évaluable

Si le routeur ne produit qu'une réponse finale, il est difficile de savoir pourquoi il a agi ainsi. Vous pouvez toujours noter la sortie, mais vous devinez la décision.

Pour les évaluations, donnez à l'étape de routage un petit contrat structuré :

```typescript
type RouterDecision = {
  route: "code" | "long-context" | "general";
  confidence: number;
  reason: string;
};
```

Le système de production n'a pas besoin d'afficher ce JSON aux utilisateurs. Il peut s'agir d'une étape interne, d'un transfert de workflow ou d'une trace. L'évaluateur a juste besoin d'une surface.

Voici un agent Mastra délibérément petit qui choisit un itinéraire :

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

Oui, c'est un peu artificiel. Bien. Les évaluations récompensent les coutures ennuyeuses.

Lorsque la décision du routeur est explicite, vous pouvez tester l'itinéraire avant de tester le spécialiste en aval. C'est ainsi que vous découvrez si le problème vient du routeur, du modèle sélectionné, du prompt, de la surface d'outils ou de l'évaluateur de réponse finale.

## Écrire un évaluateur qui attrape l'échec ennuyeux

[`createScorer`](https://mastra.ai/reference/evals/create-scorer) de Mastra peut utiliser des fonctions JavaScript, des prompts de juge LLM, ou les deux. Commencez par les fonctions chaque fois que l'échec est déterministe. Elles sont moins chères, plus rapides et moins mystérieuses.

Pour la précision de l'itinéraire, nous n'avons pas besoin d'un modèle juge. Nous avons besoin d'analyser le JSON et de comparer un champ.

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

Cet évaluateur n'est pas glamour. C'est le but.

Si le routeur ne peut pas produire systématiquement du JSON valide et choisir le spécialiste évident sur un petit ensemble de tests, il n'y a aucune raison de lui faire confiance en production. Vous n'avez pas besoin d'un modèle philosophe pour noter une ontologie. Vous avez besoin de l'équivalent d'un détecteur de fumée avec une pile dedans.

## Exécuter d'abord la petite boucle d'évaluation

[`runEvals`](https://mastra.ai/reference/evals/run-evals) de Mastra est la boucle rapide. Donnez-lui une cible, des cas de test, des évaluateurs et une limite de concurrence. Il exécute la cible sur les données et renvoie des scores agrégés.

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

C'est la boucle que vous exécutez en modifiant le prompt, en ajoutant un nouvel itinéraire ou en essayant un modèle de routeur moins cher.

Ce n'est pas suffisant pour un système mature, mais c'est suffisant pour éviter la régression la plus embarrassante : « nous avons changé le prompt du routeur et il a commencé à envoyer des tâches de classification au modèle de code premium ».

Coût, vitesse, qualité et autres apparaissent ici :

- Coût : le modèle de routeur peut rester économique si la précision se maintient.
- Vitesse : l'évaluation peut imposer des timeouts ou enregistrer la latence dans le harnais.
- Qualité : la précision de l'itinéraire et la qualité de la réponse finale sont des scores distincts.
- Autre : la validité JSON, les outils autorisés, la sécurité et la traçabilité ont leurs propres vérifications.

Ne mettez pas tout cela dans un seul score de « qualité ». Les moyennes sont l'endroit où les échecs utiles vont se retirer.

## N’ajouter un juge LLM que là où il justifie son coût

Certains comportements du routeur sont subjectifs. Une requête peut être légitimement ambiguë :

```text
Read these logs and tell me why the deploy failed.
```

Est-ce du `code` parce qu’il s’agit de débogage ? `long-context` à cause des logs ? `general` pour un résumé ? Le bon itinéraire dépend de la surface d’outils et de votre promesse produit.

C’est là qu’un juge LLM peut aider, mais seulement avec une grille d’évaluation stricte. Les scorers de Mastra peuvent mélanger des étapes de fonction et des étapes de prompt-objet. Utilisez des fonctions pour la structure, puis un juge pour la partie qui nécessite réellement un jugement.

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

Ce scorer coûte de l’argent car il appelle un modèle juge. C’est acceptable quand le jugement en vaut la peine.

Ne l’utilisez pas pour vérifier si du JSON s’analyse.

## Promouvoir les bons cas dans un ensemble de données

Les tableaux d’évaluation codés en dur conviennent au début. Avec le temps, vos exemples deviennent des actifs produit. Le ticket client non résolu, la conversation de support étrange, la tentative d’injection de prompt, la requête qui s’acheminait correctement avant jeudi dernier.

Tout cela a sa place dans un ensemble de données.

Les ensembles de données de Mastra sont des collections versionnées de cas de test. Chaque mutation crée une nouvelle version, ce qui signifie que vous pouvez relancer une expérience sur l’ensemble exact de cas qui existait lorsque vous avez pris une décision de modèle.

Configurez d’abord le stockage, car les ensembles de données nécessitent de la persistance :

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

Créez ensuite un ensemble de données et ajoutez des cas :

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

Dès que vous avez un ensemble de données, vous pouvez cesser de traiter les cas d’évaluation comme des données jetables de script. Ils ont désormais des identifiants, des versions, un historique et des résultats d’expérience.

C’est à ce moment que les évaluations commencent à ressembler moins à des « fichiers de test pour prompts » et plus à une mémoire produit.

## Exécuter des expériences sur le routeur

Une fois le jeu de données existant, utilisez [`dataset.startExperiment()`](https://mastra.ai/reference/datasets/startExperiment) pour l’exécuter contre un agent, un workflow ou un évaluateur enregistré.

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

Maintenant, la conversation change.

Au lieu de « le nouveau routeur semble meilleur », vous pouvez dire :

- L’ancien routeur a obtenu `0,94` en précision de routage.
- Le nouveau routeur a obtenu `0,98` au global.
- Il a amélioré le routage des longs contextes.
- Il a régressé sur deux cas de revue de code.
- Il a réduit de 18 % les transferts vers les modèles premium.
- Il a ajouté 300 ms de latence au routeur.

C’est une conversation d’ingénierie. Il y a des compromis. Vous pouvez décider si l’échange en vaut la peine.

## Évaluer le comportement en production, mais ne pas le confondre avec la vérité terrain

Mastra peut également attacher des évaluateurs directement aux agents et aux étapes de workflow. Les évaluateurs en production s’exécutent de manière asynchrone et stockent les résultats dans votre base de données configurée, avec des contrôles d’échantillonnage pour ne pas noter chaque réponse en production sauf si vous le souhaitez.

C’est utile, mais c’est un travail différent.

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

L’évaluation en production peut vous dire que le routeur émet encore des décisions valides. Elle peut détecter une sortie malformée, du contenu toxique, des appels d’outils interdits, des marqueurs de preuve manquants ou une confiance anormalement basse.

Elle ne peut généralement pas vous dire la précision du routage, car le trafic de production n’arrive pas avec la vérité terrain attachée.

Cette distinction compte. L’évaluation en production, c’est de la supervision. Les expériences sur jeu de données, ce sont des tests contrôlés. Vous voulez les deux, mais ils répondent à des questions différentes.

## Que mesurer après la précision du routage

La précision du routage est la première étape. Elle vous dit si la requête est allée vers le spécialiste attendu. Elle ne vous dit pas si le spécialiste a bien fait son travail.

Une fois que le routeur passe les bases, évaluez le système par couches :

| Couche | Que mesurer | Pourquoi c’est important |
|---|---|---|
| Décision du routeur | route sélectionnée, confiance, raison | Capture les erreurs de classification et les mauvaises règles d’escalade |
| Trajectoire | séquence d’outils ou d’agents attendue | Capture le comportement « bonne réponse, mauvais chemin » |
| Sortie du spécialiste | exactitude, fidélité, utilité | Capture un travail de faible qualité après un routage correct |
| Coût et latence | choix du modèle, jetons, temps d’exécution | Capture les gains coûteux ou lents |
| Sécurité et périmètre | outils autorisés, limites de refus, preuves | Capture les défaillances à risque produit |

L’API `runEvals` de Mastra prend en charge les configurations d’évaluateurs au niveau agent, workflow, étape et trajectoire. Cela signifie que vous n’avez pas à faire comme si la réponse finale était le seul artefact.

Pour un workflow, la forme peut ressembler à ceci :

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

Voilà le modèle mental que je souhaite pour les agents en production :

Scorer la décision. Scorer le chemin. Scorer la réponse.

Si vous ne scorez que la réponse, le modèle peut réussir par accident.

## Le routeur devrait devenir plus ennuyeux au fil du temps

La première invite de routage est généralement un paragraphe de jugements subjectifs. C'est acceptable pour un prototype.

Au fur et à mesure que vous apprenez des évaluations, certaines parties du routeur devraient perdre leur magie :

- Les cas lexicaux clairs peuvent devenir des règles déterministes.
- Les tâches risquées peuvent nécessiter une approbation explicite ou une branche de workflow.
- Les tâches ambiguës peuvent poser une question de clarification plutôt que de deviner.
- Les routes coûteuses peuvent exiger une confiance plus élevée ou un second signal.
- Les cas d'échec connus peuvent devenir des éléments de jeux de données.

Le but n'est pas de rendre le routeur « plus intelligent » à l'infini. Le but est de rendre le système plus facile à raisonner.

Parfois, cela signifie un meilleur modèle. Parfois, une invite plus serrée. Parfois, une étape de workflow, un scorer, une limite stricte, ou une ennuyeuse instruction `if` qui vous fait économiser quatre chiffres par mois.

C'est tout l'intérêt de mesurer le comportement. Vous cessez de débattre par goût et commencez à débattre par preuves.

## Une liste de vérification pratique pour démarrer

Si vous construisez un routeur Mastra aujourd'hui, je commencerais ici :

1. Rendre la décision de routage structurée, même si les utilisateurs ne la voient jamais.
2. Écrire des scorers déterministes pour le JSON valide, la route attendue et les routes interdites.
3. Utiliser `runEvals` avec 10 à 20 cas avant de modifier les invites ou les modèles du routeur.
4. Promouvoir les échecs réels dans un jeu de données versionné.
5. Exécuter des expériences sur le jeu de données pour des modifications significatives d'invite, de modèle, de route ou de workflow.
6. Ajouter des scorers en direct pour les invariants de production peu coûteux.
7. Comparer les expériences par route, pas seulement par score moyen.

La moyenne importe moins que le cluster d'échecs.

Si chaque régression concerne la synthèse de politique en contexte long, vous n'avez pas « un moins bon routeur ». Vous avez un problème de frontière de route. Si chaque cas échoué utilise un outil spécifique, vous avez un problème de contrat d'outil. Si chaque modèle bon marché échoue sur les deux mêmes cas ambigus, vous avez peut-être besoin d'une logique d'escalade au lieu d'un défaut plus coûteux.

C'est là que les évaluations deviennent utiles. Pas comme une cérémonie. Pas comme un tableau de bord qui donne à tout le monde l'impression d'être temporairement adulte.

Mais comme un moyen de trouver la forme du système.

## Ressources

- [Vue d'ensemble des scorers Mastra](https://mastra.ai/docs/evals/overview)
- [Référence `createScorer` de Mastra](https://mastra.ai/reference/evals/create-scorer)
- [Référence `runEvals` de Mastra](https://mastra.ai/reference/evals/run-evals)
- [Vue d'ensemble des jeux de données Mastra](https://mastra.ai/docs/evals/datasets/overview)
- [Expériences de jeux de données Mastra](https://mastra.ai/docs/evals/datasets/running-experiments)
- [N'épousez pas votre modèle](../llm-routing-mastra-ai)
- [Combattez les maux avec les évals !](../llm-evals-are-broken)
````
