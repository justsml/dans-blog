# Translation Candidate
- Slug: llm-evals-are-broken
- Locale: fr
- Model: qwen/qwen3.6-35b-a3b
- Target: src/content/posts/2026-05-06--llm-evals-are-broken/fr/index.mdx
- Validation: deferred
- Runtime seconds: 129.82
- Input tokens: 8230
- Output tokens: 29078
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- Estimated cost: $0.030312
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
title: Combattez les maux avec les Evals !
subTitle: >-
  Les benchmarks ne mesurent que les benchmarks. Votre système a besoin de ses
  propres indicateurs.
date: '2026-05-01'
modified: '2026-05-06'
tags:
  - ai
  - llm
  - evals
  - testing
  - production
  - quality
  - observability
category: AI
subCategory: Engineering
popularity: 0.85
social_image: ../desktop-social.webp
cover_full_width: ../wide.webp
cover_mobile: ../square.webp
cover_icon: ../square.webp
---
Chaque nouveau modèle débarque vêtu d'un smoking de benchmarks.

MMLU : 92,4 %. HumanEval : 87,2 %. LLeMU : 88,7 %. MATH : 73,6 %. AGI : 127 % !

Pourtant, pour 99 % des entreprises qui construisent processus et produits avec l'IA, **rien de tout cela ne compte.**

Ce qui compte, c'est quoi ? Comment se comportent VOS charges de travail ? Elles s'améliorent ou se dégradent ? Le seul moyen raisonnable de le savoir est d'écrire des évaluations (tests pour LLM) qui reflètent les tâches, les données et les modes de défaillance spécifiques de votre système.

<blockquote class="breakout">
  <p>Les benchmarks ne mentent pas. Ils répondent à la question de quelqu'un d'autre.</p>
</blockquote>

---

## Ce que coûte réellement l'évaluation « basée sur les vibes »

L'approche standard : déployer une mise à jour du modèle, surveiller les canaux de plainte, revenir en arrière si la salle s'agite.

Cette méthode passe à côté de presque tout ce qui compte :

**Vous ne repérez que les échecs bruyants.** Les utilisateurs qui reçoivent une réponse faussement assurée sans s'en rendre compte ? Silencieux. Ceux qui obtiennent une réponse moins bonne et abandonnent la fonctionnalité ? Silencieux. Les tickets de support et les taux d'erreur ne capturent qu'une fraction de la régression de qualité.

**Vous ne pouvez pas distinguer les régressions des améliorations.** Si le nouveau modèle excelle sur la tâche A mais échoue sur la tâche B, les plaintes liées à B se confondent avec les retours génériques du type « l'IA s'est dégradée ». Vous ne savez pas quoi corriger.

**Vous utilisez vos utilisateurs comme infrastructure de test.** Ils ne se sont pas inscrits pour ça.

---

## Le spectre des évaluations (et où la plupart des équipes se trompent)

Les approches d'évaluation s'inscrivent sur un spectre allant du « rapide mais fragile » au « coûteux mais valide ».

<figure class="breakout">

![Un diagramme de spectre comparant les vérifications déterministes, l'approche LLM-as-judge et l'évaluation humaine selon la vitesse, le coût et la validité.](../eval-spectrum.svg)

<figcaption>Utilisez la méthode d'évaluation la moins chère capable de détecter honnêtement l'échec.</figcaption>
</figure>

**LLM-as-judge** est la coqueluche du moment : demander à un modèle puissant de noter les sorties d'un autre modèle. Rapide, évolutif, bon marché. Le problème : cela intègre les biais du modèle évaluateur, peut être manipulé et crée une dépendance circulaire. Si vous utilisez GPT-5 pour noter les sorties de GPT-5, vous mesurez quelque chose comme « à quel point GPT-5 est d'accord avec lui-même ». Ce n'est pas rien, mais ce n'est pas ce que vous croyez.

**L'évaluation humaine** est la référence absolue que tout le monde essaie de contourner. Faire évaluer des sorties par des humains est coûteux, lent, sujet à des variations entre évaluateurs et fastidieux à planifier. Mais c'est la seule méthode qui valide si votre système est réellement utile pour des humains.

**Les vérifications automatisées spécifiques à la tâche** sont là où la plupart des équipes devraient investir plus de temps. Elles ne sont pas glamour, mais elles sont rapides, déterministes et directement liées à ce qui compte dans votre système.

---

## Ce qui fonctionne réellement

### 1. Définir l'échec avant la mise en production

Avant de modifier un modèle ou un prompt, notez à quoi ressemble un échec. Précisément.

Pas "la sortie doit être précise". Ce n'est pas un test. Plutôt :

- La sortie JSON structurée doit être analysée sans erreur
- Toutes les citations de la réponse doivent apparaître textuellement dans le contexte récupéré
- Les réponses ne doivent pas mentionner de noms de produits concurrents
- Les requêtes SQL doivent être syntaxiquement valides et ne référencer que des tables existant dans le schéma
- La classification des sentiments ne doit pas basculer du positif au négatif plus de 3 % du temps sur l'ensemble de test existant

Vous pouvez les vérifier programmatiquement. Aucun modèle juge n'est requis.

**Framework d'évaluation : vérifications déterministes**

```typescript
type EvalResult = { passed: boolean; reason?: string };

const evals: Record<string, (output: string, context: EvalContext) => EvalResult> = {
  // JSON must parse
  validJson: (output) => {
    try {
      JSON.parse(output);
      return { passed: true };
    } catch (e) {
      return { passed: false, reason: `Invalid JSON: ${e.message}` };
    }
  },

  // No hallucinated citations — every claim must appear in context
  groundedCitations: (output, { retrievedChunks }) => {
    const claims = extractCitations(output);
    const ungrounded = claims.filter(
      (claim) => !retrievedChunks.some((chunk) => chunk.includes(claim))
    );
    return ungrounded.length === 0
      ? { passed: true }
      : { passed: false, reason: `Ungrounded claims: ${ungrounded.join(', ')}` };
  },

  // Response length sanity check — catch truncation or runaway generation
  reasonableLength: (output) => {
    const words = output.split(/\s+/).length;
    return words >= 10 && words <= 2000
      ? { passed: true }
      : { passed: false, reason: `Word count ${words} out of bounds` };
  },
};
```

### 2. Constituer un jeu de référence à partir de vos pires journées

Vos meilleures données d'évaluation sont les cas embarrassants : les sorties qui ont conduit à l'ouverture d'un ticket, à la capture d'une hallucination, ou à l'abandon silencieux de la fonctionnalité.

Chaque fois qu'un utilisateur signale une sortie erronée, signale une hallucination, ou que vous détectez manuellement un échec, ajoutez-le à votre jeu de référence : l'entrée, le contexte et le comportement attendu. Maintenez un ensemble de 50 à 100 cas et exécutez-les à chaque modification de modèle.

Au début, ça semble manuel. Après six mois, vous disposez d'une suite de tests qu'aucun benchmark public ne peut truquer, car chaque cas provient de votre propre historique d'échecs.

<figure class="breakout">

![Un diagramme de flux montrant comment les incidents de production deviennent des cas de référence, puis des exécutions d'évaluation CI, puis des régressions bloquées ou des releases approuvées.](../golden-set-lifecycle.svg)

<figcaption>Un jeu de référence transforme les problèmes embarrassants en suite de régression.</figcaption>
</figure>

**Format d'un cas de référence**

```typescript
interface GoldenCase {
  id: string;
  input: string;
  context: Record<string, unknown>;
  expectedBehavior: {
    mustContain?: string[];
    mustNotContain?: string[];
    structureCheck?: (output: string) => boolean;
    minSimilarityToReference?: number; // cosine similarity to a reference answer
  };
  sourceIncident?: string; // link back to the bug report or ticket
}
```

### 3. Tests de régression, et pas seulement tests d'acceptation

La plupart des équipes n'exécutent des évaluations que lors d'un changement de modèle. C'est du test d'acceptation : « cette nouvelle version est-elle suffisamment bonne ? »

Vous avez aussi besoin de tests de régression : « est-ce qu'on a cassé quelque chose qui fonctionnait avant ? »

Exécutez votre jeu de référence à chaque modification de prompt, pas seulement lors des changements de modèle. Un prompt qui fonctionnait bien peut se dégrader silencieusement si vous ajoutez un nouvel outil, modifiez une stratégie de récupération RAG ou mettez à jour votre template de contexte. Sans une référence, vous ne le saurez pas. Des outils comme [Langfuse](https://langfuse.com/) attachent les scores d'évaluation aux traces de production, de sorte que les régressions apparaissent dans les tableaux de bord et pas seulement dans les rapports d'incidents.

<details>
<summary>Framework d'évaluation : comparaison baseline vs candidat</summary>

```typescript
async function compareModelVersions(
  goldenCases: GoldenCase[],
  baselinePipeline: Pipeline,
  candidatePipeline: Pipeline
) {
  const results = await Promise.all(
    goldenCases.map(async (tc) => {
      const [baseline, candidate] = await Promise.all([
        baselinePipeline.run(tc.input, tc.context),
        candidatePipeline.run(tc.input, tc.context),
      ]);

      return {
        id: tc.id,
        baselinePassed: runEvals(baseline, tc.expectedBehavior),
        candidatePassed: runEvals(candidate, tc.expectedBehavior),
        regression: /* baseline passed */ && /* candidate failed */,
        improvement: /* baseline failed */ && /* candidate passed */,
      };
    })
  );

  const regressions = results.filter((r) => r.regression);
  const improvements = results.filter((r) => r.improvement);

  console.log(`Regressions: ${regressions.length} / ${goldenCases.length}`);
  console.log(`Improvements: ${improvements.length} / ${goldenCases.length}`);

  if (regressions.length > 0) {
    console.error('Blocking regressions found:');
    regressions.forEach((r) => console.error(` - ${r.id}`));
  }

  return { regressions, improvements };
}
```

</details>

Si un candidat régresse sur des échecs connus, la discussion sur la mise à jour devient d'une précision redoutable : quels cas se sont améliorés, quels cas ont été cassés, et si le compromis en vaut la peine.

### 4. Utiliser LLM-as-Judge pour une seule chose

LLM-as-judge est utile pour les sorties ouvertes où il n'existe pas de réponse déterministe : « cette réponse est-elle utile ? », « ce résumé conserve-t-il les points clés ? », « cette explication convient-elle à un débutant ? »

Utilisez-le à cet usage. Pas pour des réponses déterministes. Quand vous l'employez, explicitez le barème d'évaluation :

**Cadre d'évaluation : juge basé sur un barème**

```typescript
async function judgeHelpfulness(
  userQuery: string,
  modelResponse: string
): Promise<{ score: number; reasoning: string }> {
  const judgePrompt = `
You are evaluating a customer support response.

User question: ${userQuery}
Response: ${modelResponse}

Rate the response on a scale of 1-5:
5 = Directly answers the question with accurate, actionable information
4 = Answers the question but could be more specific or actionable
3 = Partially addresses the question; key information is missing
2 = Tangentially related but doesn't answer the question
1 = Off-topic, factually wrong, or harmful

Respond with JSON: {"score": <number>, "reasoning": "<one sentence>"}
`;

  const result = await judgeModel.generate(judgePrompt);
  return JSON.parse(result);
}
```

Un barème explicite réduit la variance de l'évaluateur, fournit une sortie interprétable et simplifie l'audit quand le juge se trompe. Des bibliothèques comme [Autoevals](https://github.com/braintrustdata/autoevals) et [Braintrust](https://www.braintrust.dev/) livrent des barèmes préconçus pour des tâches courantes — à piquer sans hésiter avant de tout réécrire de zéro.

---

## Des outils à connaître

Inutile de tout reconstruire depuis zéro. Plusieurs outils ont fait des progrès sérieux sur le problème de l'infrastructure d'évaluation :

**[Braintrust](https://www.braintrust.dev/)** — Plateforme d'évaluation complète avec suivi des expériences, gestion de jeux de données et fonctions de notation. Organise les exécutions d'évaluation par prompt, modèle et déploiement, ce qui permet de comparer les différences de qualité dans le temps, et pas seulement entre les versions. S'intègre bien avec leur bibliothèque open-source **[Autoevals](https://github.com/braintrustdata/autoevals)**, qui fournit des fonctions de notation par modèle pour des tâches courantes (exactitude factuelle, utilité, toxicité, similarité sémantique).

**[Langfuse](https://langfuse.com/)** — Outil d'observabilité LLM open-source se plaçant entre votre application et vos modèles. Trace chaque appel, attache les scores d'évaluation (humains ou automatisés) à des spans individuelles et met en lumière les tendances de qualité sur le trafic de production. Bon choix si vous souhaitez observabilité et évaluations dans un seul outil, plutôt que dans un cadre d'évaluation séparé.

**[Evalite](https://www.evalite.dev/)** — Framework d'évaluation natif TypeScript par Matt Pocock. Pas de cérémonial : définissez une tâche, définissez un scoreur, exécutez-le dans votre configuration de tests existante. S'adresse aux équipes qui veulent des évaluations qui ressemblent à des tests unitaires, plutôt qu'à une plateforme d'expériences ML séparée.

**[promptfoo](https://www.promptfoo.dev/)** — Exécuteur d'évaluations orienté CLI, axé sur la comparaison de prompts et le red-teaming. Configuration facile via YAML, s'intègre à la plupart des fournisseurs de modèles et dispose d'un support intégré pour détecter les injections de prompt et autres entrées adverses.

**[deepeval](https://docs.confident-ai.com/)** — Framework d'évaluation Python disposant d'une vaste bibliothèque de métriques intégrées (G-Eval, fidélité RAG, pertinence des réponses, détection d'hallucinations). Utile pour les pipelines RAG où vous souhaitez une évaluation spécifique de la qualité de la récupération, et pas seulement de la génération.

Le bon outil dépend de votre pile technique et de votre point de départ. Ce qui prime sur le choix du framework, c'est la discipline d'exécuter des évaluations — de façon constante, à chaque modification significative.

---

## La partie inconfortable

La plupart des équipes passent à côté parce que cela pose une question irritante dès le départ : à quoi ressemblerait le « bon » ici ?

C'est franchement difficile à définir pour une nouvelle fonctionnalité IA. C'est aussi indispensable si vous tenez à la fiabilité. Les équipes qui déploient une IA fiable font exactement ce qu'elles feraient pour n'importe quel chemin critique : définir le comportement attendu, le valider, et exécuter ces tests en continu.

Les benchmarks ne mentent pas. Ils répondent à la question de quelqu'un d'autre. Arrêtez de les interpréter comme des feuilles de route produit et commencez à écrire des tests adaptés à votre système.

Vos utilisateurs s'en apercevront avant vos tableaux de bord. Construisez d'abord la suite de tests.
````
