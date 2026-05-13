# Translation Candidate
- Slug: llm-evals-are-broken
- Locale: fr
- Model: openrouter/openai/gpt-oss-120b:nitro
- Target: src/content/posts/2026-05-06--llm-evals-are-broken/fr/index.mdx
- Validation: passed
- Runtime seconds: 12.24
- Input tokens: 11595
- Output tokens: 3787
- Thinking tokens: unknown
- Cached input tokens: 1536
- Cache write tokens: 0
- Estimated cost: $0.001134
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
title: Combattez le mal avec Evals!
subTitle: >-
  Les benchmarks mesurent les benchmarks. Votre système a besoin de ses propres
  mesures.
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
Chaque nouveau modèle arrive vêtu d’un smoking de benchmarks.  

MMLU : 92,4 %. HumanEval : 87,2 %. LLeMU : 88,7 %. MATH : 73,6 %. AGI : 127 % !  

Pourtant, pour 99 % des entreprises qui construisent des processus et des produits avec l’IA, **cela n’a aucune importance**.  

Ce qui compte ? Comment vos charges de travail se comportent‑elles ? S’améliorent‑elles ou se détériorent‑elles ? La seule façon sensée de le savoir est d’écrire des Evals (tests pour LLM) qui reflètent les tâches, les données et les modes de défaillance spécifiques de votre système.  

<blockquote class="breakout">
  <p>Les benchmarks ne mentent pas. Ils répondent à la question de quelqu’un d’autre.</p>
</blockquote>

## Ce que « Évaluation basée sur les vibes » coûte réellement

L’approche standard : déployer un changement de modèle, surveiller les canaux de plaintes, revenir en arrière si le bruit monte.

Cela laisse passer presque tout ce qui est intéressant :

**Vous ne captez que les échecs bruyants.** Les utilisateurs qui reçoivent une réponse manifestement erronée sans s’en rendre compte ? Silencieux. Ceux qui obtiennent une réponse pire et abandonnent la fonctionnalité ? Silencieux. Les tickets de support et les taux d’erreur ne saisissent qu’une fraction de la régression de qualité.

**Vous ne pouvez pas distinguer régressions et améliorations.** Si le nouveau modèle est meilleur sur la tâche A et pire sur la tâche B, les plaintes concernant B ressemblent à un retour générique « l’IA a empiré ». Vous ne savez pas quoi corriger.

**Vous utilisez vos utilisateurs comme infrastructure de test.** Ils ne se sont pas inscrits à ce rôle.

---

## Le spectre des évaluations (et où la plupart des équipes se trompent)

Les approches d’évaluation se situent sur un spectre allant de « rapide mais fragile » à « coûteux mais valide ».

<figure class="breakout">

![Un diagramme de spectre comparant les contrôles déterministes, LLM‑as‑judge et l’évaluation humaine selon la vitesse, le coût et la validité.](.././eval-spectrum.svg)

<figcaption>Utilisez la méthode d’évaluation la moins chère capable de détecter honnêtement la défaillance.</figcaption>
</figure>

**LLM‑as‑judge** est le chouchou du moment : demander à un modèle puissant de noter les sorties d’un autre modèle. Rapide, évolutif, bon marché. Le problème : cela intègre les biais du modèle évaluateur, peut être manipulé et crée une dépendance circulaire. Si vous utilisez GPT‑5 pour noter les sorties de GPT‑5, vous mesurez quelque chose comme « dans quelle mesure GPT‑5 s’accorde avec GPT‑5 ». Ce n’est pas rien, mais ce n’est pas ce que vous croyez.

**L’évaluation humaine** est le standard d’or que tout le monde essaie d’éviter. Faire évaluer les sorties par des humains est coûteux, lent, incohérent d’un évaluateur à l’autre, et pénible à planifier. Mais c’est le seul moyen de valider que votre système est réellement utile aux humains.

**Les contrôles automatisés spécifiques à la tâche** sont l’endroit où la plupart des équipes devraient investir davantage de temps. Ce n’est pas glamour, mais c’est rapide, déterministe et directement lié à ce qui compte dans votre système.

---

## Ce qui fonctionne réellement

### 1. Définir l’échec avant de livrer

Avant de modifier un modèle ou un prompt, consignez ce à quoi ressemble le mauvais résultat. De façon précise.

Pas « la sortie doit être exacte ». Ce n’est pas un test. Plutôt :

- La sortie JSON structurée doit pouvoir être analysée sans erreur  
- Toutes les citations dans la réponse doivent apparaître mot pour mot dans le contexte récupéré  
- Les réponses ne doivent pas mentionner les noms de produits concurrents  
- Les requêtes SQL doivent être syntaxiquement valides et ne référencer que des tables présentes dans le schéma  
- La classification de sentiment ne doit pas basculer de positif à négatif de plus de 3 % du temps sur le jeu de test existant  

Vous pouvez vérifier tout cela de façon programmatique. Aucun modèle jugeur n’est requis.  

**Banc d’évaluation : contrôles déterministes**

```typescript
type EvalResult = { passed: boolean; reason?: string };

const evals: Record<string, (output: string, context: EvalContext) => EvalResult> = {
  // JSON doit être analysable
  validJson: (output) => {
    try {
      JSON.parse(output);
      return { passed: true };
    } catch (e) {
      return { passed: false, reason: `Invalid JSON: ${e.message}` };
    }
  },

  // Pas de citations hallucinated — chaque affirmation doit apparaître dans le contexte
  groundedCitations: (output, { retrievedChunks }) => {
    const claims = extractCitations(output);
    const ungrounded = claims.filter(
      (claim) => !retrievedChunks.some((chunk) => chunk.includes(claim))
    );
    return ungrounded.length === 0
      ? { passed: true }
      : { passed: false, reason: `Ungrounded claims: ${ungrounded.join(', ')}` };
  },

  // Contrôle de la longueur de la réponse — détecter troncature ou génération incontrôlée
  reasonableLength: (output) => {
    const words = output.split(/\s+/).length;
    return words >= 10 && words <= 2000
      ? { passed: true }
      : { passed: false, reason: `Word count ${words} out of bounds` };
  },
};
```

### 2. Constituer un jeu « Golden » à partir de vos pires journées  

Vos meilleures données d’évaluation sont les cas embarrassants : les sorties qui ont poussé un utilisateur à ouvrir un ticket, à capturer une hallucination en capture d’écran, ou à abandonner silencieusement la fonctionnalité.  

Chaque fois qu’un utilisateur signale une mauvaise sortie, qu’une hallucination est signalée, ou que vous constatez manuellement un échec, ajoutez‑le à votre jeu golden : l’entrée, le contexte et le comportement attendu. Conservez 50 à 100 cas et exécutez‑les à chaque modification de modèle.

Cela paraît manuel au départ. Au bout de six mois, vous disposez d’une suite de tests qu’aucun benchmark public ne peut manipuler, car chaque cas provient de votre propre historique d’échecs.

<figure class="breakout">

![A workflow diagram showing how bad production incidents become golden cases, then CI eval runs, then blocked regressions or approved releases.](../golden-set-lifecycle.svg)

<figcaption>Un jeu golden transforme les incidents embarrassants en suite de régression.</figcaption>
</figure>

**Forme du cas golden**

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

### 3. Tests de régression, pas seulement tests d’acceptation

La plupart des équipes exécutent les évaluations uniquement lors d’un changement de modèle. C’est du test d’acceptation : « est‑ce que ce nouveau composant est suffisamment bon ? »

Il faut également des tests de régression : « est‑ce que cela a cassé quelque chose qui fonctionnait auparavant ? »

Exécutez votre jeu d’or sur chaque modification de prompt, pas seulement sur les changements de modèle. Un prompt qui fonctionnait correctement peut se dégrader silencieusement lorsque vous ajoutez un nouvel outil, modifiez une stratégie de récupération RAG ou mettez à jour votre modèle de contexte. Vous ne le saurez pas sans une référence de base. Des outils comme [Langfuse](https://langfuse.com/) attachent les scores d’évaluation aux traces de production afin que les régressions apparaissent dans les tableaux de bord, pas uniquement dans les rapports d’incident.

<details>
<summary>Harness d’évaluation : comparaison baseline vs candidat</summary>

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

Si un candidat régresse sur des échecs connus, la conversation de mise à niveau devient merveilleusement précise : quels cas se sont améliorés, quels cas se sont cassés, et si le compromis en vaut la peine.

### 4. Utilisez LLM‑as‑Judge pour UNE SEULE CHOSE

LLM‑as‑Judge est utile pour les sorties ouvertes où il n’existe pas de réponse déterministe : « cette réponse est‑elle utile ? », « ce résumé conserve‑t‑il les points clés ? », « cette explication est‑elle correcte pour un débutant ? »

Employez‑le dans ces cas. N’en faites pas usage pour des réponses déterministes. Lorsque vous l’utilisez, rendez la grille de notation explicite :

**Eval harness : juge basé sur une grille**

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

Une grille explicite réduit la variance entre évaluateurs, fournit une sortie interprétable et facilite l’audit lorsqu’un juge se trompe. Des bibliothèques comme [Autoevals](https://github.com/braintrustdata/autoevals) et [Braintrust](https://www.braintrust.dev/) livrent des grilles préconstruites pour les tâches courantes — ça vaut le détour avant d’écrire la vôtre à partir de zéro.

---

## Outils à connaître

Vous n’avez pas besoin de tout développer vous‑même. Plusieurs outils ont fait de sérieux progrès sur le problème de l’infrastructure d’évaluation :

**[Braintrust](https://www.braintrust.dev/)** — Plateforme d’évaluation complète avec suivi d’expériences, gestion de jeux de données et fonctions de scoring. Elle organise les exécutions d’évaluation par prompt, modèle et déploiement afin que vous puissiez comparer la qualité dans le temps, pas seulement entre versions. Elle se combine bien avec leur bibliothèque open‑source **[Autoevals](https://github.com/braintrustdata/autoevals)**, qui fournit des fonctions de scoring notées par le modèle pour les tâches courantes (exactitude factuelle, utilité, toxicité, similarité sémantique).

**[Langfuse](https://langfuse.com/)** — Observabilité open‑source pour LLM qui se place entre votre application et vos modèles. Il trace chaque appel, attache les scores d’évaluation (humains ou automatisés) aux spans individuels, et fait ressortir les tendances de qualité sur le trafic de production. Bon choix si vous voulez observabilité et évaluations dans le même outil plutôt que d’utiliser un harness d’éval séparé.

**[Evalite](https://www.evalite.dev/)** — Framework d’évaluation natif TypeScript créé par Matt Pocock. Peu de cérémonial : définissez une tâche, définissez un scorer, exécutez‑le dans votre configuration de tests existante. Ciblé pour les équipes qui souhaitent des évaluations qui se comportent comme des tests unitaires plutôt que comme une plateforme d’expérimentation ML distincte.

**[promptfoo](https://www.promptfoo.dev/)** — Exécuteur d’évaluations orienté CLI, centré sur la comparaison de prompts et le red‑team­ing. Simple à configurer via YAML, s’intègre à la plupart des fournisseurs de modèles, et propose un support natif pour détecter les injections de prompt et autres entrées adversariales.

**[deepeval](https://docs.confident-ai.com/)** — Framework d’évaluation Python avec une vaste bibliothèque de métriques intégrées (G‑Eval, fidélité RAG, pertinence des réponses, détection d’hallucination). Utile pour les pipelines RAG où vous avez besoin d’une notation précise de la qualité de la récupération, pas seulement de la génération.

L’outil adéquat dépend de votre stack et de votre point de départ. Ce qui importe davantage que le choix du framework, c’est la discipline d’exécuter des évaluations : de façon constante, à chaque modification significative.

## La partie inconfortable

La plupart des équipes passent à côté parce que cela pose une question irritante dès le départ : à quoi ressemble le « bon » dans ce contexte ?

C’est réellement difficile à définir pour une nouvelle fonctionnalité IA. Mais c’est incontournable si vous tenez à la fiabilité. Les équipes qui livrent une IA digne de confiance appliquent le même processus que pour n’importe quel chemin de code critique : définir le comportement attendu, le tester, et exécuter ces tests en continu.

Les benchmarks ne mentent pas. Ils répondent à la question de quelqu’un d’autre. Cessez de les lire comme des feuilles de route produit et commencez à écrire des tests qui correspondent à votre système.

Vos utilisateurs le remarqueront avant que vos tableaux de bord ne le fassent. Construisez d’abord la suite de tests.
````
