# Translation Candidate
- Slug: ai-sdk-math-tool
- Locale: fr
- Model: openrouter/qwen/qwen3-32b:nitro
- Target: src/content/posts/2026-01-06--ai-sdk-math-tool/fr/index.mdx
- Validation: passed
- Runtime seconds: 14.42
- Input tokens: 6302
- Output tokens: 6625
- Thinking tokens: unknown
- Cached input tokens: 2048
- Cache write tokens: 0
- Estimated cost: $0.002094
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
title: ''
subTitle: ''
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
Saviez-vous ce qui est étrange chez les modèles de langage ? Ils peuvent expliquer la mécanique quantique, écrire de la poésie et déboguer votre TypeScript... mais leur demander de multiplier 18472 par 9347, il y a de fortes chances qu'ils vous donnent un résultat erroné de plusieurs milliers.  

Cela m'a longtemps intrigué jusqu'à ce que je comprenne réellement ce que nous leur demandons. On demande à un moteur de correspondance de motifs d'être une calculatrice. C'est comme demander à un gymnaste de gérer votre compte en banque parce qu'ils comprennent le concept de « solde ».  

Le problème, c'est que les LLM n'effectuent aucun calcul. Quand vous demandez à GPT ou Claude ce que vaut 2 + 2, ils n'ajoutent pas. Ils prédit que « 4 » est le jeton le plus susceptible d'apparaître après « 2 + 2 = ». La plupart du temps, cela fonctionne bien car ces motifs existent dans leurs données d'entraînement. Mais poussez-vous au-delà des opérations arithmétiques simples vers des calculs multi-étapes ou des nombres rares dans l'entraînement, et vous lancez essentiellement des dés.  

J'ai récemment rencontré ce problème en examinant un code utilisant un modèle de premier plan pour calculer des paiements hypothécaires. Le modèle a répondu avec une confiance totale. Il était aussi erroné de 400 $ par mois. C'est le genre d'erreur qui compte.  

Même si les modèles s'améliorent en raisonnement (GPT-5 supposément montre des améliorations), ils effectuent toujours un appariement de motifs sophistiqué, pas un calcul symbolique. Pour les tâches créatives et le langage naturel, cette nature probabiliste est précisément ce qui les rend magiques. Pour les mathématiques ? Pas tant que ça.  

## Quel est la Vraie Solution ?

La réponse n'est pas d'attendre des modèles plus intelligents. C'est de donner au modèle l'outil adapté à la tâche.  

Pensez à la manière dont vous résoudriez ce problème si vous construisiez un système non basé sur l'IA. Vous ne rédigeriez pas de la logique mathématique personnalisée, vous utiliseriez une bibliothèque. Le même principe s'applique ici, sauf qu'aujourd'hui nous enseignons à l'LLM quand et comment utiliser cette bibliothèque.  

L'appel de fonctions dans les SDK IA modernes nous permet de fournir au modèle des fonctions structurées qu'il peut invoquer. Au lieu de forcer l'LLM à feindre de savoir faire des maths, on lui donne quelque chose qui le fait vraiment : un moteur de calcul symbolique.  

J'utilise le [SDK IA v5 et v6](../ai-sdk.vercel.ai/) pour cela, couplé au CortexJS Compute Engine. Le SDK gère l'orchestration et le routage des outils, tandis que CortexJS s'occupe de tout, de l'arithmétique de base jusqu'au calcul différentiel. C'est une séparation des préoccupations étonnamment claire.  

```bash
bun add ai @ai-sdk/anthropic @cortex-js/compute-engine zod
```  

## Créer l'Outil Mathématique  

L'implémentation est plus directe que vous ne pourriez l'imaginer. Ce que nous construisons est un pont entre la compréhension du langage naturel de l'LLM et le calcul mathématique réel.

```typescript
import { generateText, stepCountIs, tool } from 'ai';
import { ComputeEngine } from '@cortex-js/compute-engine';
import { z } from 'zod';

// Initialiser le moteur une seule fois
const ce = new ComputeEngine();

const mathTool = tool({
  description: 'Évaluer des expressions mathématiques et résoudre des équations avec une précision garantie. DOIT ÊTRE UTILISÉ pour toutes les opérations mathématiques afin de vérifier la justesse - ne tentez pas de faire le calcul mentalement. Prend en charge l\'arithmétique, l\'algèbre, le calcul différentiel/intégral et les opérations complexes. Traite plusieurs expressions simultanément.',
  parameters: z.object({
    expressions: z.array(z.string()).describe(
      'Tableau d\'expressions mathématiques en notation LaTeX ou standard, par exemple ["2 + 2", "\\frac{x^2 + 1}{x - 1}", "\\int x^2 dx"]'
    ),
  }),
  execute: async ({ expressions }) => {
    // Traiter toutes les expressions en parallèle (ou par lots détaillés)
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

Quelques points importants concernant cette implémentation :

La description effectue un travail important. Cette formulation "DOIT ÊTRE UTILISÉ" peut sembler agressive, mais mon expérience montre que préciser explicitement au modèle quand utiliser un outil fait la différence entre un fonctionnement intermittent et une fiabilité constante. Considérez cela comme de l'ingénierie des prompts au niveau de l'outil.

Le traitement par lots via le tableau `expressions` compte plus que vous ne le pensez. Chaque appel au modèle engendre une latence. Si vous résolvez un système d'équations ou effectuez des mathématiques multi-étapes, le traitement individuel crée une expérience utilisateur déplorable. Le regroupement permet un aller-retour unique pour résoudre dix problèmes.

L'utilisation d'un moteur symbolique plutôt qu'un simple `eval()` (n'utilisez surtout pas `eval()`) nous donne une compréhension mathématique réelle. Le moteur interprète l'intention, gère le format LaTeX et peut travailler avec dérivées et intégrales. Nous ne faisons pas seulement des calculs, nous faisons de la mathématique.

La gestion des erreurs est limitée à chaque expression. Si un calcul échoue, nous retournons cette erreur tout en poursuivant les autres. Cela permet au modèle de voir ce qui a fonctionné et ce qui ne l'a pas, lui permettant potentiellement de s'auto-corriger à l'étape suivante.

## Mettre en œuvre

Jetons-lui un problème qui ferait généralement halluciner un modèle brut :

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

Le modèle identifie le calcul mathématique, reconnaît qu'il a besoin de précision, appelle l'outil, obtient le résultat exact, puis l'explique en langage naturel. Chaque composant fait ce qu'il fait de mieux.

## Au-delà de l'arithmétique de base

Puisque nous utilisons un moteur symbolique, cette approche gère des tâches que les outils de calcul simples ne peuvent pas traiter.

Souhaitez-vous résoudre des équations algébriques ? "Résoudre ces équations : 3x + 7 = 22 et 2y - 5 = 13" fonctionne parfaitement.

Besoin de calcul différentiel ? "Trouver la dérivée de x^3 + 2x^2 et l'évaluer en x = 2" n'est qu'un autre appel d'outil.

Le support LaTeX est particulièrement utile si vous développez des applications éducatives. Le moteur comprend naturellement les entrées LaTeX et peut renvoyer des résultats formatés pour le rendu. Aucun analyseur supplémentaire n'est nécessaire.

## La vision d'ensemble

Je pense que ce schéma est pertinent au-delà des mathématiques. Ce que nous faisons vraiment, c'est reconnaître les limites des LLM tout en exploitant leurs forces. Ils sont incroyablement doués pour comprendre l'intention, analyser le langage naturel et orchestrer des workflows. Ce ne sont pas des calculateurs, des bases de données ou des systèmes de fichiers.

Chaque fois que nous essayons de faire effectuer quelque chose de déterministe à un LLM, nous luttions contre sa nature. Mais lorsque nous associons cette compréhension du langage naturel à des outils spécialisés capables de gérer les parties déterministes ? C'est là que les choses deviennent intéressantes.

L'outil mathématique n'est qu'un exemple. Le même principe s'applique à la manipulation de dates, aux calculs financiers, au traitement d'images, aux requêtes de base de données... partout où la précision prime sur la créativité. Laissez le modèle comprendre ce que l'utilisateur souhaite, puis déléguer le travail réel à quelque chose conçu pour ce travail.

C'est un changement dans la façon dont nous concevons les systèmes avec l'IA. Non pas « le modèle peut-il faire cela ? » mais « le modèle peut-il orchestrer cela ? ». Une petite différence de formulation, une grande différence de fiabilité.

## Ressources

- [Documentation de l'AI SDK de Vercel](https://sdk.vercel.ai/docs)
- [CortexJS Compute Engine](https://cortexjs.io/compute-engine/)
- [Guide d'appel des outils](https://sdk.vercel.ai/docs/ai-sdk-core/tools-and-tool-calling)
- [Dépôt d'exemples de l'AI SDK](https://github.com/vercel/ai/tree/main/examples)
````
