# Translation Candidate
- Slug: ai-sdk-math-tool
- Locale: fr
- Model: qwen/qwen3.6-35b-a3b
- Target: src/content/posts/2026-01-06--ai-sdk-math-tool/fr/index.mdx
- Validation: deferred
- Runtime seconds: 92.41
- Input tokens: 5215
- Output tokens: 18048
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- Estimated cost: $0.018830
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
title: Cesser de demander aux LLM de faire des calculs
subTitle: Ils s'y prennent mal. Voici comment y remédier.
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
Vous savez ce qui est étrange avec les modèles de langage ? Ils peuvent expliquer la mécanique quantique, écrire de la poésie et déboguer votre TypeScript... mais demandez-leur de multiplier 18472 par 9347 et il y a de fortes chances qu'ils vous donnent avec assurance un résultat faux de plusieurs milliers.

Cela me laissait perplexe jusqu'à ce que je réalise ce que nous leur demandons vraiment. Nous demandons à un moteur de reconnaissance de motifs de tenir lieu de calculatrice. C'est comme demander à un gymnaste de tenir vos comptes en banque parce qu'il comprend le concept d'« équilibre ».

Le problème, c'est que les LLM ne calculent rien. Lorsque vous demandez à GPT ou Claude ce que vaut 2 + 2, ils n'effectuent pas une addition. Ils prédisent simplement que « 4 » est le jeton le plus susceptible d'apparaître après « 2 + 2 = ». La plupart du temps, ça fonctionne parfaitement car ces motifs existent dans leurs données d'entraînement. Mais dès que vous dépassez l'arithmétique de base pour entrer dans des calculs multi-étapes ou manipuler des nombres peu fréquents dans l'entraînement, vous lancez essentiellement les dés.

J'ai fait face à ce problème en pleine figure récemment en examinant du code qui utilisait un modèle de pointe pour calculer des mensualités de prêt immobilier. Le modèle a répondu avec une assurance totale. Il se trompait aussi de 400 $/mois. C'est le genre d'erreur qui a des conséquences.

Même si les modèles s'améliorent dans le raisonnement (GPT-5 montrerait des progrès selon les annonces), ils continuent d'effectuer de la reconnaissance de motifs sophistiquée, et non du calcul symbolique. Pour les tâches créatives et le traitement du langage naturel, cette nature probabiliste est précisément ce qui rend leur fonctionnement remarquable. Pour les maths ? Moins beaucoup.

## Qu'est-ce qui résout vraiment ce problème ?

La réponse n'est pas d'attendre des modèles plus intelligents. Il s'agit de fournir au modèle l'outil adapté à la tâche.

Réfléchissez à la façon dont vous résoudriez ce problème en développant un système hors IA. Vous n'écririez pas de logique mathématique sur mesure ; vous utiliseriez une bibliothèque existante. Le même principe s'applique ici, sauf que nous apprenons désormais au LLM quand et comment utiliser cette bibliothèque.

L'appel d'outils dans les SDK IA modernes nous permet de fournir au modèle des fonctions structurées qu'il peut invoquer. Au lieu de forcer le LLM à faire semblant de connaître les maths, nous lui donnons quelque chose qui le fait réellement : un moteur de calcul symbolique.

J'utilise [AI SDK v5 et v6](https://ai-sdk.vercel.ai/) à cette fin, couplé à CortexJS Compute Engine. Le SDK gère l'orchestration et le routage des outils, tandis que CortexJS prend en charge tout, de l'arithmétique de base jusqu'au calcul intégral. C'est une séparation des responsabilités étonnamment propre.

```bash
bun add ai @ai-sdk/anthropic @cortex-js/compute-engine zod
```

## Développement de l'outil mathématique

L'implémentation est plus simple que ce que l'on pourrait attendre. Ce que nous construisons est un pont entre la compréhension du langage naturel du LLM et le calcul mathématique réel.

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

Quelques points à retenir à ce sujet :

La description fait le gros du travail. Le libellé "MUST be used" peut paraître agressif, mais d'après mon expérience, être explicite avec le modèle sur quand utiliser un outil fait la différence entre un fonctionnement aléatoire et un fonctionnement fiable. Considérez-le comme de l'ingénierie de prompt au niveau de l'outil.

Le traitement par lots via un tableau `expressions` a plus d'importance que ce que l'on pourrait croire. Chaque appel au modèle introduit une latence. Si vous résolvez un système d'équations ou effectuez des calculs multi-étapes, les traiter individuellement crée une expérience utilisateur détestable. Le traitement par lots se résume à un seul aller-retour pour résoudre dix problèmes.

L'utilisation d'un moteur symbolique plutôt que simplement `eval()` (s'il vous plaît, n'utilisez pas `eval()`) nous donne une véritable compréhension mathématique. Le moteur analyse l'intention, gère le formatage LaTeX et peut travailler avec des dérivées et des intégrales. Nous ne faisons pas que des calculs, nous faisons des mathématiques.

La gestion des erreurs est délimitée par expression. Si un calcul échoue, nous renvoyons cette erreur mais continuons avec les autres. Cela permet au modèle de voir ce qui a fonctionné et ce qui ne l'a pas fait, potentiellement en se corrigeant lui-même à l'étape suivante.

## Mise en pratique

Testons-le avec un cas qui ferait typiquement halluciner un modèle brut :

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

Le modèle identifie le calcul, reconnaît qu'il a besoin de précision, appelle l'outil, obtient le résultat exact, puis l'explique en langage naturel. Chaque composant fait ce qu'il fait de mieux.

## Au-delà de l'arithmétique de base

Puisque nous utilisons un moteur symbolique, cette approche traite des cas que les simples outils de calcul ne peuvent pas aborder.

Vous voulez résoudre des équations algébriques ? La requête "Résolvez ces équations : 3x + 7 = 22 et 2y - 5 = 13" fonctionne parfaitement.

Besoin de calcul différentiel ? "Trouvez la dérivée de x^3 + 2x^2 et évaluez-la en x = 2" n'est qu'un appel d'outil de plus.

Le support LaTeX est particulièrement pertinent si vous développez des applications éducatives. Le moteur comprend nativement les entrées LaTeX et peut renvoyer des résultats déjà formatés pour le rendu. Aucun traitement supplémentaire n'est requis.

## La perspective globale

Je pense que ce pattern dépasse le seul cadre des mathématiques. Ce que nous faisons réellement, c'est reconnaître les limites des LLM tout en exploitant leurs forces. Ils sont exceptionnels pour comprendre l'intention, analyser le langage naturel et orchestrer des workflows. Ils ne sont ni des calculatrices, ni des bases de données, ni des systèmes de fichiers.

Chaque fois que nous tentons de forcer un LLM à exécuter une tâche déterministe, nous luttons contre sa nature. Mais lorsqu'on associe cette compréhension du langage naturel à des outils spécialisés qui gèrent les parties déterministes ? C'est là que ça devient intéressant.

L'outil mathématique n'est qu'un exemple. Le même principe s'applique à la manipulation de dates, aux calculs financiers, au traitement d'images, aux requêtes de base de données... partout où la précision prime sur la créativité. Laissez le modèle comprendre ce que souhaite l'utilisateur, puis déléguez le travail effectif à un composant conçu pour ça.

C'est un changement de paradigme dans notre façon de concevoir des applications avec l'IA. Non pas "le modèle peut-il faire ça ?", mais "le modèle peut-il orchestrer ça ?". Une différence de formulation mineure, mais un écart de fiabilité considérable.

## Ressources

- [Documentation du SDK Vercel AI](https://sdk.vercel.ai/docs)
- [Moteur de calcul CortexJS](https://cortexjs.io/compute-engine/)
- [Guide d'appel d'outils](https://sdk.vercel.ai/docs/ai-sdk-core/tools-and-tool-calling)
- [Dépôt d'exemples du SDK IA](https://github.com/vercel/ai/tree/main/examples)
````
