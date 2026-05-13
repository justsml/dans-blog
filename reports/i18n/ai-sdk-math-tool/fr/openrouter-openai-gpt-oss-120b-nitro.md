# Translation Candidate
- Slug: ai-sdk-math-tool
- Locale: fr
- Model: openrouter/openai/gpt-oss-120b:nitro
- Target: src/content/posts/2026-01-06--ai-sdk-math-tool/fr/index.mdx
- Validation: passed
- Runtime seconds: 4.29
- Input tokens: 6912
- Output tokens: 2331
- Thinking tokens: unknown
- Cached input tokens: 2176
- Cache write tokens: 0
- Estimated cost: $0.000689
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
title: Ne demandez plus aux LLM de faire des maths
subTitle: Ils sont mauvais à ça. Voici comment y remédier.
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
Vous savez ce qui est étrange avec les modèles de langage ? Ils peuvent expliquer la mécanique quantique, écrire de la poésie et déboguer votre TypeScript… mais demandez‑leur de multiplier 18 472 par 9 347 et il y a de fortes chances qu’ils vous donnent, en toute confiance, un résultat qui diffère de plusieurs milliers.

Cela me laissait perplexe jusqu’à ce que je réalise ce que nous leur demandons réellement. Nous demandons à un moteur de correspondance de motifs d’être une calculatrice. C’est comme demander à un gymnaste de tenir votre registre de comptes parce qu’il comprend le concept d’« équilibre ».

Le problème, c’est que les LLM ne calculent rien. Quand vous demandez à GPT ou à Claude ce que vaut 2 + 2, ils n’ajoutent pas. Ils prédisent que le token « 4 » est le plus susceptible d’apparaître après « 2 + 2 = ». La plupart du temps, cela fonctionne très bien parce que ces motifs existent dans leurs données d’entraînement. Mais si vous dépassez l’arithmétique simple, enchaînez plusieurs étapes de calcul ou utilisez des nombres qui n’étaient pas courants dans l’entraînement, vous ne faites en fait que lancer des dés.

Je suis tombé dessus de plein fouet récemment en examinant du code qui utilisait un modèle de pointe pour calculer des paiements hypothécaires. Le modèle a répondu avec une confiance totale. Il s’est avéré qu’il se trompait de 400 $ / mois. C’est le type d’erreur qui compte.

Même lorsque les modèles s’améliorent en raisonnement (GPT‑5 prétend montrer des progrès), ils restent des moteurs de correspondance de motifs sophistiqués, pas des calculateurs symboliques. Pour le travail créatif et les tâches de langage naturel, cette nature probabiliste est exactement ce qui les rend magiques. Pour les maths ? Pas vraiment.

## Ce qui résout réellement le problème ?

La réponsen’attend pas que les modèles deviennent plus intelligents. Il s’agit de fournir au modèle l’outil adéquat pour la tâche.

Imaginez comment vous résoudriez ce problème si vous construisiez un système non‑IA. Vous n’écririez pas de logique mathématique maison, vous vous tourneriez vers une bibliothèque. Le même principe s’applique ici, sauf que nous apprenons maintenant au LLM quand et comment utiliser cette bibliothèque.

L’appel d’outils dans les SDK AI modernes nous permet de fournir au modèle des fonctions structurées qu’il peut invoquer. Au lieu de forcer le LLM à faire semblant de connaître les maths, nous lui donnons ce qui le fait réellement : un moteur de calcul symbolique.

J’utilise [AI SDK v5 et v6](https://ai-sdk.vercel.ai/) à cet effet, associé à CortexJS Compute Engine. Le SDK gère l’orchestration et le routage des outils, tandis que CortexJS prend en charge tout, de l’arithmétique de base jusqu’au calcul différentiel. C’est une séparation des responsabilités étonnamment propre.

```bash
bun add ai @ai-sdk/anthropic @cortex-js/compute-engine zod
```

## Construction de l’outil mathématique

L’implémentation est plus simple que vous ne le pensez. Ce que nous construisons, c’est un pont entre la compréhension du langage naturel du LLM et le calcul mathématique réel.

```typescript
import { generateText, stepCountIs, tool } from 'ai';
import { ComputeEngine } from '@cortex-js/compute-engine';
import { z } from 'zod';

// Initialise le moteur une fois
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

Quelques points à retenir :

La description porte la majeure partie du poids. Cette formulation « MUST be used » peut sembler agressive, mais d’après mon expérience, être explicite avec le modèle sur le moment où il doit recourir à un outil fait la différence entre un fonctionnement occasionnel et un fonctionnement fiable. Considérez‑cela comme du prompt engineering au niveau de l’outil.

Le traitement par lots via le tableau `expressions` a plus d’impact qu’on ne le croit. Chaque appel au modèle introduit de la latence. Si vous résolvez un système d’équations ou effectuez des calculs en plusieurs étapes, les traiter un par un crée une expérience utilisateur déplorable. Le batching ne nécessite qu’un aller‑retour pour résoudre dix problèmes.

Utiliser un moteur symbolique plutôt que simplement `eval()` (et, s’il vous plaît, n’utilisez pas `eval()`) nous donne une vraie compréhension mathématique. Le moteur analyse l’intention, gère le format LaTeX et peut travailler avec des dérivées et des intégrales. Nous ne faisons pas que des calculs, nous faisons des mathématiques.

La gestion des erreurs est isolée par expression. Si un calcul échoue, nous renvoyons cette erreur tout en poursuivant les autres. Cela permet au modèle de voir ce qui a fonctionné ou non, et de s’auto‑corriger éventuellement à l’étape suivante.

## Mise en pratique


Jetons‑lui un problème qui ferait typiquement halluciner un modèle brut :

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

Le modèle voit le calcul, reconnaît qu’il faut de la précision, appelle l’outil, obtient le résultat exact, puis l’explique en langage naturel. Chaque composant fait ce qu’il fait de mieux.

## Au‑delà de l’arithmétique de base

Comme nous utilisons un moteur symbolique, cette approche gère des cas que les simples outils de calcul ne peuvent pas toucher.

Vous voulez résoudre des équations algébriques ? « Solve these equations: 3x + 7 = 22 and 2y - 5 = 13 » fonctionne sans problème.

Besoin de calcul différentiel ? « Find the derivative of x^3 + 2x^2 and evaluate it at x = 2 » n’est qu’un autre appel d’outil.

Le support LaTeX est particulièrement utile si vous construisez des applications éducatives. Le moteur comprend intrinsèquement les entrées LaTeX et peut renvoyer des résultats formatés pour l’affichage. Aucun parsing supplémentaire n’est nécessaire.

## Le tableau d’ensemble

Je pense que ce schéma a une portée qui dépasse le simple calcul. Ce que nous faisons réellement, c’est reconnaître les limites des LLM tout en exploitant leurs points forts. Ils excellent à saisir l’intention, à analyser le langage naturel et à orchestrer des flux de travail. Ils ne sont pas des calculateurs, des bases de données ou des systèmes de fichiers.

Chaque fois que l’on tente de faire exécuter à un LLM une tâche déterministe, on lutte contre sa nature. Mais quand on associe cette compréhension du langage naturel à des outils spécialisés qui gèrent les parties déterministes ? C’est là que les choses deviennent intéressantes.

L’outil mathématique n’est qu’un exemple. Le même principe s’applique à la manipulation de dates, aux calculs financiers, au traitement d’images, aux requêtes de bases de données… partout où la précision prime sur la créativité. Laissez le modèle comprendre ce que l’utilisateur veut, puis confiez le travail réel à quelque chose conçu pour la tâche.

C’est un changement de perspective dans la construction avec l’IA. Pas « le modèle peut‑il faire ça ? » mais « le modèle peut‑il orchestrer cela ? ». Une petite différence de formulation, une différence majeure en termes de fiabilité.

## Ressources

- [Documentation du Vercel AI SDK](https://sdk.vercel.ai/docs)
- [Moteur de calcul CortexJS](https://cortexjs.io/compute-engine/)
- [Guide d’appel d’outils](https://sdk.vercel.ai/docs/ai-sdk-core/tools-and-tool-calling)
- [Référentiel d’exemples AI SDK](https://github.com/vercel/ai/tree/main/examples)
````
