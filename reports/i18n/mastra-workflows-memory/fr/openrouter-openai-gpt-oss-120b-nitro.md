# Translation Candidate
- Slug: mastra-workflows-memory
- Locale: fr
- Model: openrouter/openai/gpt-oss-120b:nitro
- Target: src/content/posts/2026-01-05--mastra-workflows-memory/fr/index.mdx
- Validation: passed
- Runtime seconds: 3.97
- Input tokens: 8298
- Output tokens: 3114
- Thinking tokens: unknown
- Cached input tokens: 3968
- Cache write tokens: 0
- Estimated cost: $0.000884
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
title: >-
  Arrêtez de créer des agents instables : utilisez les flux de travail et la
  mémoire
subTitle: Motifs déterministes pour modèles non déterministes.
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
Les LLM ont cette propriété étrange : ils excellent à saisir les nuances mais sont catastrophiques pour suivre des recettes. Donnez à GPT‑4 un problème vague et il explorera les possibilités. Donnez‑lui une séquence précise d’étapes, et il pourra sauter l’étape 3 parce que l’étape 5 « lui semblait plus pertinente ».

Ce n’est pas un bug du modèle. C’est une caractéristique fondamentale des systèmes probabilistes qui tentent de résoudre des problèmes déterministes.

J’ai vu des équipes se débattre avec ce décalage. Elles construisent un agent pour gérer les remboursements clients, lui donnent une douzaine d’outils, et s’attendent à ce qu’il exécute de façon fiable un processus métier. Parfois, cela fonctionne parfaitement. Parfois, il hallucine des approbations qui n’ont jamais eu lieu. Parfois, il reste bloqué en demandant la même information trois fois.

La solution n’est pas de meilleurs prompts. C’est de savoir quand arrêter de demander au LLM de « penser » et commencer à lui dire d’« obéir ».

---

## Quand le déterministe l’emporte sur le créatif

Pensez à ce qui se passe lorsque vous devez traiter un ticket de support. La logique métier réelle ressemble à ceci :

1. Récupérer les détails du ticket depuis la base de données  
2. Vérifier si l’utilisateur est éligible à un remboursement (règles de politique)  
3. Confirmer que la transaction existe et n’a pas déjà été remboursée  
4. Calculer le montant du remboursement  
5. Effectuer l’inversion du paiement  
6. Mettre à jour le statut du ticket  
7. Envoyer l’e‑mail de confirmation  

Vous pourriez confier cela à un LLM sous forme d’appel d’outils. D’après mon expérience, c’est une invitation à l’échec. Le modèle pourrait considérer les étapes 2 et 3 comme « pratiquement la même chose » et en omettre une. Ou il pourrait traiter le remboursement avant de vérifier l’éligibilité parce que l’utilisateur semble contrarié.

Les workflows existent précisément pour ce scénario. Ils ne sont pas excitants, mais c’est le but.

### Construire un planificateur d’activités météo

Voici un exemple concret qui illustre le schéma. Nous avons besoin de données météo dures et factuelles associées à des suggestions d’activités créatives. La récupération météo ne doit jamais être créative, mais les suggestions le doivent.

```typescript// src/mastra/workflows/activity-planner.ts
import { createWorkflow, createStep } from '@mastra/core/workflows';
import { Agent } from '@mastra/core/agent';
import { openai } from '@ai-sdk/openai';
import { z } from 'zod';

// Step 1: Fetch weather data (Deterministic)
const fetchWeather = createStep({
  id: 'fetch-weather',
  description: 'Fetches weather forecast for a given city',
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
    // ... (fetch logic) ...
    const weather = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&current=temperature_2m,weather_code&daily=precipitation_probability_mean`).then(r => r.json());
    
    return {
      location: inputData.city,
      temperature: weather.current.temperature_2m,
      conditions: getWeatherCondition(weather.current.weather_code),
      precipitationChance: weather.daily.precipitation_probability_mean[0],
    };
  },
});

// Step 2: Agent suggests activities (Creative)
const activityPlanner = new Agent({
  id: 'activity-planner-agent',
  name: 'Activity Planner',
  instructions: `You are a local activities expert. Based on weather conditions, suggest 3-5 appropriate activities.
    - For rain (>50% precipitation), prioritize indoor activities
    - For extreme temperatures, consider climate-appropriate options
    - Always include one adventurous and one relaxing option`,
  model: openai('gpt-5'),
});

const planActivities = createStep({
  id: 'plan-activities',
  description: 'Uses AI to suggest activities based on weather',
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
    const prompt = `Weather in ${inputData.location}: ${inputData.temperature}°C...`;
    const response = await activityPlanner.generate(prompt);
    return { activities: response.text };
  },
});

// The Pipeline
export const activityPlannerWorkflow = createWorkflow({
  id: 'activity-planner',
  inputSchema: z.object({ city: z.string() }),
  outputSchema: z.object({ activities: z.string() }),
})
  .then(fetchWeather)
  .then(planActivities);

activityPlannerWorkflow.commit();
```

Le LLM ne touche jamais l’API météo. Il reçoit des données de vérité terrain en entrée, puis fait ce pour quoi il est réellement efficace : proposer des suggestions contextuelles. Si vous inversez le processus et laissez l’agent récupérer les données météo, vous finirez par obtenir une prévision ensoleillée alors qu’il pleut réellement.

**Quand envisager les workflows :**
- Vous disposez d’une séquence connue d’étapes qui doit s’exécuter dans un ordre précis
- Vous avez besoin d’observabilité à chaque étape (journaux, métriques, timings)
- Vous devez gérer la logique de retry pour des API externes peu fiables
- Les règles métier ne peuvent pas être « interprétées » ; elles doivent être appliquées à la lettre

---

## Le problème de la fenêtre de contexte dont personne ne parle

Il y a un schéma que je rencontre régulièrement. Quelqu’un construit un chatbot. Tout fonctionne parfaitement pendant les tests. Puis, en production, les utilisateurs tiennent des conversations plus longues et, soudain, le bot se perd.

Le développeur regarde les journaux et réalise qu’il envoie l’historique complet de la conversation à chaque requête. Les 47 messages. Il brûle des jetons et de l’espace de contexte pour des informations qui sont majoritairement inutiles.

Pireencore, il existe un phénomène que les chercheurs appellent « perdu au milieu » où les modèles se dégradent lorsque l’information pertinente est enfouie dans un contexte long. Le modèle ne voit littéralement pas la forêt à cause des arbres.

Envoyer l’historique complet de la conversation semble prudent. Vous donnez au modèle « toutes les informations ». Mais vous le rendez en réalité plus difficile à se concentrer sur ce qui compte.

### Mémoire de travail vs. stockage à long terme

Le système de mémoire de Mastra vous fournit les deux. La mémoire de travail conserve les messages récents dans la fenêtre de contexte. Le rappel sémantique parcourt les messages historiques lorsque la requête actuelle semble y être liée.

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

Voici comment cela se traduit en pratique. Un utilisateur demande : « Quel était le restaurant italien que vous avez recommandé le mois dernier ? »

Sans rappel sémantique, l’agent ne voit que les 20 derniers messages. La recommandation du restaurant se trouvait au message 487 sur 506. Elle a disparu. L’agent répond : « Je n’ai pas cette information. »

Avec rappel sémantique :
1. La requête est vectorisée : `[0.234, -0.567, 0.891, …]`
2. L’embedding est comparé aux messages historiques
3. Le message 487 (« Je recommanderais Trattoria Bella – leur carbonara est incroyable ») obtient une similarité de 0,89
4. Ce message est injecté dans le contexte actuel
5. L’agent répond : « J’ai recommandé Trattoria Bella. Leur carbonara est ce qui m’a séduit. »

L’agent donne l’impression d’avoir une mémoire parfaite tout en n’utilisant qu’une fraction de la fenêtre de contexte. Ce n’est pas seulement un tour d’ingénierie ; c’est une exigence fonctionnelle dès que les conversations dépassent quelques dizaines de messages.

## Coordination via les réseaux d’agents

Il arrive que vous ayez besoin à la fois de structure et de souplesse. Les workflows purs sont trop rigides. Les agents purs sont trop imprévisibles.

Les réseaux d’agents vous offrent un coordinateur qui décide quel agent spécialisé ou quel workflow invoquer en fonction de la tâche. Pensez-y comme à un répartiteur intelligent de charge pour les capacités d’IA.

```typescript
export const coordinatorAgent = new Agent({
  id: 'coordinator-agent',
  name: 'Research Coordinator',
  instructions: `You are a network of researchers and writers.
    - Use researchAgent for gathering facts
    - Use writingAgent for producing final content
    - Use weatherTool for current weather data
    - Use activityPlannerWorkflow for location-based planning
    
    Always produce comprehensive, well-structured responses.`,
  model: openai('gpt-5'),
  
  // Available primitives
  agents: { researchAgent, writingAgent },
  workflows: { activityPlannerWorkflow },
  tools: { weatherTool },
  
  // Network requires memory
  memory: new Memory({
    storage: new LibSQLStore({ id: 'network-store', url: 'file:../network.db' }),
  }),
});
```

Lorsque vous interrogez ce réseau, le coordinateur analyse la requête et la redirige en conséquence :
- « J’ai besoin de faits sur X » déclenche l’agent de recherche
- « Planifier un week‑end à Seattle » lance le workflow de planification d’activités
- « Rédiger un rapport sur Y » active l’agent d’écriture

Ce modèle se dimensionne mieux que d’essayer d’entasser tout dans un méga‑agent unique. Les agents spécialisés développent une expertise ciblée. Le coordinateur gère le routage. Chaque composant fait ce qu’il fait de mieux.

---

## Assembler le tout

Les systèmes d’IA en production ont besoin d’une architecture, pas seulement de prompts. Vous construisez des systèmes distribués où certains nœuds sont des LLM.

Les workflows vous offrent des garanties lorsque vous avez besoin que les étapes se déroulent exactement comme prévu. La mémoire fournit le contexte sans épuiser votre budget de tokens. Les réseaux d’agents vous permettent de composer de la complexité à partir de parties plus simples.

Rien de cela n’est glamour. Mais après avoir vu suffisamment d’« agents entièrement autonomes » échouer en production, j’ai appris à privilégier la fiabilité ennuyeuse plutôt que l’imprévisibilité excitante.

Votre expérience peut varier, mais d’après ce que j’ai constaté, les systèmes qui sont réellement déployés et qui restent opérationnels sont ceux qui traitent les LLM comme des composants d’une architecture plus large plutôt que comme des boîtes magiques qui résolvent tout.

### Ressources

- [Documentation des Workflows Mastra](https://mastra.ai/docs/workflows/overview)
- [Documentation de la Mémoire Mastra](https://mastra.ai/docs/memory/overview)
- [Code de la Démo complète](https://github.com/justsml/mastra-examples)

## Lire la série

1. [Routage LLM](../llm-routing-mastra-ai)
2. [Sécurité & garde-fous](../mastra-security-guardrails)
3. [MCP & intégrations d’outils](../mastra-mcp-tool-integrations)
4. **Workflows & Mémoire** (Cet article)
````
