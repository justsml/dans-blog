# Translation Candidate
- Slug: mastra-workflows-memory
- Locale: fr
- Model: openrouter/qwen/qwen3-32b:nitro
- Target: src/content/posts/2026-01-05--mastra-workflows-memory/fr/index.mdx
- Validation: passed
- Runtime seconds: 17.45
- Input tokens: 7687
- Output tokens: 7541
- Thinking tokens: unknown
- Cached input tokens: 1024
- Cache write tokens: 0
- Estimated cost: $0.002425
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
title: >-
  Cessez de créer des agents instables : utilisez des flux de travail et de la
  mémoire
subTitle: Schémas déterministes pour
date: '2026-01-05'
modified: '2026-01-08'
tags:
  - ai
  - workflows
  - memory
  - mastra
  - agent-networks
  - orchestration
category: AI
subCategory: Architecture
social_image: ../desktop-social.webp
cover_full_width: ../wide.webp
cover_mobile: ../square.webp
cover_icon: ../square.webp
---
Les LLM ont cette propriété étrange : ils sont excellents pour comprendre les nuances mais terriblement mauvais pour suivre des recettes. Donnez à GPT-4 un problème vague et il analysera les possibilités. Donnez-lui une séquence précise d'étapes, et il pourrait sauter l'étape 3 parce que l'étape 5 « semblait plus pertinente ».

Ce n'est pas un bug du modèle. C'est une caractéristique fondamentale des systèmes probabilistes tentant de résoudre des problèmes déterministes.

J'ai observé des équipes se battre contre cette incompatibilité. Elles construisent un agent pour gérer des remboursements clients, lui donnent une douzaine d'outils et s'attendent à ce qu'il exécute fiablement un processus métier. Parfois, cela fonctionne parfaitement. Parfois, il hallucine des approbations qui n'ont jamais eu lieu. Parfois, il se bloque en demandant trois fois la même information.

La solution n'est pas d'améliorer les prompts. Il s'agit de savoir quand arrêter de demander au LLM de « penser » et de commencer à lui dire d'obéir.

---

## Quand le déterministe l'emporte sur le créatif

Pensez à ce qui se passe lorsqu'il faut traiter un ticket de support. La logique métier réelle ressemble à ceci :

1. Récupérer les détails du ticket depuis la base de données
2. Vérifier si l'utilisateur est éligible au remboursement (règles de politique)
3. Vérifier que la transaction existe et n'a pas déjà été remboursée
4. Calculer le montant du remboursement
5. Traiter l'annulation du paiement
6. Mettre à jour le statut du ticket
7. Envoyer un email de confirmation

Vous pourriez confier cela à un LLM en tant qu'exercice d'appel d'outils. D'après mon expérience, c'est demander des ennuis. Le modèle pourrait décider que les étapes 2 et 3 sont "fondamentalement la même chose" et en passer une. Ou il pourrait traiter le remboursement avant de vérifier l'éligibilité parce que l'utilisateur semblait contrarié.

Les workflows existent précisément pour ce type de scénario. Ce n'est pas passionnant, mais c'est l'objectif.

### Création d'un planificateur d'activités météo

Voici un exemple concret illustrant cette approche. Nous avons besoin de données météorologiques factuelles associées à des suggestions d'activités créatives. La récupération de données météorologiques ne doit jamais être créative, mais les suggestions devraient l'être.

```typescript
// src/mastra/workflows/activity-planner.ts
import { createWorkflow, createStep } from '@mastra/core/workflows';
import { Agent } from '@mastra/core/agent';
import { openai } from '@ai-sdk/openai';
import { z } from 'zod';

// Étape 1 : Récupérer les données météorologiques (Déterministe)
const fetchWeather = createStep({
  id: 'fetch-weather',
  description: 'Récupère la météo d\'une ville donnée',
  inputSchema: z.object({
    city: z.string(),
  }),
  outputSchema: z.object({
    location: z.string(),
    temperature: z.number(),
    conditions: z.string(),
    precipitationChance: z.number(),
  }),
  execute: async ({ inputData }) => {
    // ... (logique de récupération) ...
    const weather = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&current=temperature_2m,weather_code&daily=precipitation_probability_mean`).then(r => r.json());
    
    return {
      location: inputData.city,
      temperature: weather.current.temperature_2m,
      conditions: getWeatherCondition(weather.current.weather_code),
      precipitationChance: weather.daily.precipitation_probability_mean[0],
    };
  },
});

// Étape 2 : L'agent suggère des activités (Créatif)
const activityPlanner = new Agent({
  id: 'activity-planner-agent',
  name: 'Activity Planner',
  instructions: `Vous êtes un expert en activités locales. En fonction des conditions météorologiques, suggérez 3 à 5 activités appropriées.
    - En cas de pluie (>50 % de précipitations), privilégiez les activités intérieures
    - En cas de températures extrêmes, proposez des options adaptées au climat
    - Incluez toujours une activité aventureuse et une activité relaxante`,
  model: openai('gpt-5'),
});

const planActivities = createStep({
  id: 'plan-activities',
  description: 'Utilise l\'IA pour suggérer des activités en fonction de la météo',
  inputSchema: z.object({
    location: z.string(),
    temperature: z.number(),
    conditions: z.string(),
    precipitationChance: z.number(),
  }),
  outputSchema: z.object({
    activities: z.string(),
  }),
  execute: async ({ inputData }) => {
    const prompt = `Météo à ${inputData.location} : ${inputData.temperature}°C...`;
    const response = await activityPlanner.generate(prompt);
    return { activities: response.text };
  },
});

// Le Pipeline
export const activityPlannerWorkflow = createWorkflow({
  id: 'activity-planner',
  inputSchema: z.object({ city: z.string() }),
  outputSchema: z.object({ activities: z.string() }),
})
  .then(fetchWeather)
  .then(planActivities);

activityPlannerWorkflow.commit();
```

Le modèle LLM n'a jamais accès à l'API météo. Il reçoit des données factuelles en entrée, puis effectue ce pour quoi il est réellement adapté : faire des suggestions contextuelles. Si vous inversez ce schéma et laissez l'agent récupérer les données météo, vous obtiendrez finalement une prévision ensoleillée alors qu'il pleut réellement.

**Quand envisager d'utiliser des workflows :**
- Vous avez une séquence d'étapes connue qui doit s'exécuter dans un ordre précis
- Vous avez besoin d'observabilité à chaque étape (journaux, métriques, chronométrage)
- Vous avez besoin de logique de réessai pour des APIs externes instables
- Les règles métier ne peuvent pas être « interprétées » - elles doivent être suivies exactement

---

## Le problème de la fenêtre de contexte dont personne ne parle

Il y a un schéma que je vois constamment. Quelqu'un construit un chatbot. Ça fonctionne bien en test. Puis en production, les utilisateurs ont des conversations plus longues et soudainement le bot se perd.

Le développeur consulte les journaux et réalise qu'il envoie l'intégralité de l'historique de conversation à chaque requête. Toutes les 47 messages. Il consomme des tokens et de l'espace de contexte pour des informations largement non pertinentes.

Pire encore, il existe un phénomène que les chercheurs appellent "perdu au milieu", où les modèles performent moins bien lorsque des informations pertinentes sont enterrées dans un contexte long. Le modèle ne voit littéralement pas la forêt pour les arbres.

Envoyer l'intégralité de l'historique de conversation semble sécurisé. Vous donnez au modèle "toutes les informations". Mais vous rendez en réalité plus difficile pour lui de se concentrer sur ce qui compte.

### Mémoire à court terme vs. stockage à long terme

Le système de mémoire de Mastra vous offre les deux. La mémoire à court terme conserve les messages récents dans la fenêtre de contexte. Le rappel sémantique recherche les messages historiques lorsque la requête actuelle semble liée.

```typescript
// src/mastra/agents/memory-agent.ts
import { Agent } from '@mastra/core/agent';
import { Memory } from '@mastra/memory';
import { LibSQLStore } from '@mastra/libsql';

export const memoryAgent = new Agent({
  id: 'memory-agent',
  name: 'Memory Agent',
  instructions: 'You are a helpful assistant with perfect recall of our conversations.',
  model: openai('gpt-5'),
  memory: new Memory({
    storage: new LibSQLStore({
      id: 'memory-agent-store',
      url: 'file:../mastra.db',
    }),
    options: {
      lastMessages: 20,  // Keep last 20 messages in context
      semanticRecall: {
        enabled: true,  // Use embeddings to find old stuff
        topK: 5,
        threshold: 0.7,
      },
    },
  }),
});
```

Voici comment cela se traduit en pratique. Un utilisateur demande : "Quel était ce restaurant italien que tu avais recommandé le mois dernier ?"

Sans rappel sémantique, l'agent voit les 20 derniers messages. La recommandation de restaurant était le message 487 sur 506. C'est parti. L'agent répond "Je n'ai pas cette information."

Avec le rappel sémantique :  
1. La requête est intégrée : `[0.234, -0.567, 0.891, ...]`  
2. L'intégration est comparée aux messages historiques  
3. Le message 487 (« Je recommanderais Trattoria Bella — leur carbonara est incroyable ») obtient un score de similarité de 0,89  
4. Ce message est injecté dans le contexte actuel  
5. L'agent répond : « J'ai recommandé Trattoria Bella. C'est leur carbonara qui m'a marqué. »  

L'agent donne l'impression d'avoir une mémoire parfaite tout en n'utilisant qu'une fraction de la fenêtre de contexte. Ce n'est pas seulement une ingénierie astucieuse — c'est fonctionnellement indispensable dès que les conversations dépassent quelques dizaines de messages.  

---

## Coordination par réseaux d'agents  

Parfois, vous avez besoin à la fois de structure et de flexibilité. Les workflows purs sont trop rigides. Les agents purs sont trop imprévisibles.  

Les réseaux d'agents vous offrent un coordinateur qui décide quel agent spécialisé ou workflow invoquer en fonction de la tâche. Pensez-y comme à un équilibreur de charge intelligent pour les capacités d'IA.

```typescript
export const coordinatorAgent = new Agent({
  id: 'coordinator-agent',
  name: 'Coordinateur de recherche',
  instructions: `Vous êtes un réseau de chercheurs et d'écrivains.
    - Utilisez researchAgent pour rassembler des faits
    - Utilisez writingAgent pour produire du contenu final
    - Utilisez weatherTool pour obtenir des données météorologiques en temps réel
    - Utilisez activityPlannerWorkflow pour le planification basée sur l'emplacement
    
    Produisez toujours des réponses complètes et bien structurées.`,
  model: openai('gpt-5'),
  
  // Primitives disponibles
  agents: { researchAgent, writingAgent },
  workflows: { activityPlannerWorkflow },
  tools: { weatherTool },
  
  // Le réseau nécessite une mémoire
  memory: new Memory({
    storage: new LibSQLStore({ id: 'network-store', url: 'file:../network.db' }),
  }),
});
```

Lorsque vous interrogez ce réseau, le coordinateur analyse la demande et la route en conséquence :
- "J'ai besoin de faits sur X" déclenche l'agent de recherche
- "Planifiez un week-end à Seattle" exécute le workflow de planification d'activités
- "Rédigez un rapport sur Y" active l'agent d'écriture

Ce schéma s'échelonne mieux que d'essayer de tout comprimer dans un seul agent monstre. Les agents spécialisés développent une expertise ciblée. Le coordinateur gère le routage. Chaque composant fait ce pour quoi il est conçu.

---

## Mise en œuvre concrète

Les systèmes d'IA de production réelle ont besoin d'architecture, pas seulement de prompts. Vous construisez des systèmes distribués où certains nœuds sont des LLM.

Les workflows vous offrent des garanties lorsque vous avez besoin que des choses se passent exactement comme prévu. La mémoire vous donne du contexte sans épuiser votre budget de jetons. Les réseaux d'agents vous permettent de composer la complexité à partir de composants simples.

Rien de tout cela n’est glamour. Mais après avoir observé suffisamment d’« agents complètement autonomes » échouer en production, j’ai appris à apprécier la fiabilité banale par rapport à l'imprévisibilité excitante.  

Vos résultats peuvent varier, mais selon mon expérience, les systèmes qui sont effectivement déployés et restent opérationnels sont ceux qui considèrent les LLM comme des composants au sein d’une architecture plus vaste, plutôt que comme des boîtes noires magiques résolvant tout.  

### Ressources  

- [Documentation des Workflows de Mastra](https://mastra.ai/docs/workflows/overview)  
- [Documentation de la Mémoire de Mastra](https://mastra.ai/docs/memory/overview)  
- [Code complet de la démo](https://github.com/justsml/mastra-examples)  

## Lire la série  

1. [Acheminement des LLM](/llm-routing-mastra-ai)  
2. [Sécurité et Garde-fous](/mastra-security-guardrails)  
3. [MCP et Intégrations d’outils](/mastra-mcp-tool-integrations)  
4. **Workflows et Mémoire** (Cet article)
````
