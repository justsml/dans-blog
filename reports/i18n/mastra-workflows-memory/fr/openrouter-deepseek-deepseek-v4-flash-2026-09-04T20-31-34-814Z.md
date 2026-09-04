# Translation Candidate
- Slug: mastra-workflows-memory
- Locale: fr
- Model: openrouter/deepseek/deepseek-v4-flash
- Target: src/content/posts/2026-01-05--mastra-workflows-memory/fr/index.mdx
- Validation: deferred
- Runtime seconds: 62.58
- Input tokens: 6578
- Output tokens: 7381
- Thinking tokens: unknown
- Cached input tokens: 2048
- Cache write tokens: 0
- Estimated cost: $0.002707
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
title: ''
subTitle: Patterns déterministes pour modèles non déterministes.
modified: '2026-09-04'
tags:
  - ai
  - workflows
  - memory
  - mastra
  - supervisor-agents
  - orchestration
category: AI
subCategory: Architecture
social_image: ../desktop-social.webp
cover_full_width: ../wide.webp
cover_mobile: ../square.webp
cover_icon: ../square.webp
---
Les LLM ont cette propriété étrange : ils sont brillants pour comprendre les nuances, mais terribles pour suivre des recettes. Donnez à un modèle puissant un problème vague, il raisonnera sur les possibilités. Donnez-lui une séquence précise d'étapes, et il risque de sauter l'étape 3 parce que l'étape 5 « semblait plus pertinente ».

Ce n'est pas un bug du modèle. C'est une caractéristique fondamentale des systèmes probabilistes qui tentent de résoudre des problèmes déterministes.

J'ai vu des équipes se débattre avec ce décalage. Elles construisent un agent pour gérer les remboursements clients, lui donnent une douzaine d'outils, et s'attendent à ce qu'il exécute de manière fiable un processus métier. Parfois ça fonctionne parfaitement. Parfois il hallucine des approbations qui n'ont jamais eu lieu. Parfois il reste bloqué à demander la même information trois fois.

La solution n'est pas de meilleurs prompts. C'est de savoir quand arrêter de demander au LLM de « réfléchir » et commencer à lui dire d'« obéir ».

---

## Quand le déterministe bat le créatif

Pensez à ce qui se passe quand vous devez traiter un ticket de support. La logique métier réelle ressemble à peu près à :

1. Récupérer les détails du ticket dans la base de données
2. Vérifier si l'utilisateur est éligible à un remboursement (règles de politique)
3. Vérifier que la transaction existe et n'a pas déjà été remboursée
4. Calculer le montant du remboursement
5. Traiter le reversement du paiement
6. Mettre à jour le statut du ticket
7. Envoyer l'e-mail de confirmation

Vous pourriez confier cela à un LLM sous forme d'exercice d'appel d'outils. Dans mon expérience, c'est chercher des ennuis. Le modèle pourrait décider que les étapes 2 et 3 sont « fondamentalement la même chose » et en sauter une. Ou il pourrait traiter le remboursement avant de vérifier l'éligibilité parce que l'utilisateur semblait contrarié.

Les workflows existent exactement pour ce scénario. Ce n'est pas excitant, mais c'est justement le but.

### Construire un planificateur d'activités météo

Voici un exemple pratique qui illustre le motif. Nous avons besoin de données météorologiques concrètes et factuelles associées à des suggestions d'activités créatives. La récupération météo ne doit jamais être créative, mais les suggestions doivent l'être.

```typescript
// src/mastra/workflows/activity-planner.ts
import { createWorkflow, createStep } from '@mastra/core/workflows';
import { Agent } from '@mastra/core/agent';
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
    const coordinates = await geocodeCity(inputData.city);
    const params = new URLSearchParams({
      latitude: String(coordinates.latitude),
      longitude: String(coordinates.longitude),
      current: 'temperature_2m,weather_code',
      daily: 'precipitation_probability_mean',
      timezone: 'auto',
    });

    const weather = await fetch(`https://api.open-meteo.com/v1/forecast?${params}`)
      .then(r => r.json());
    
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
  model: 'openai/gpt-5.5',
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
  .then(planActivities)
  .commit();
```

`geocodeCity()` est du code applicatif classique ou un appel à une API de cartographie ; ce n'est pas une décision du modèle. Le LLM ne touche jamais à l'API météo. Il reçoit des données de référence en entrée, puis fait ce pour quoi il est vraiment bon : proposer des suggestions contextuelles. Si vous inversez ce mécanisme et laissez l'agent récupérer les données météo, vous finirez par obtenir des prévisions ensoleillées alors qu'il pleut réellement.

**Quand envisager les workflows :**
- Vous avez une séquence d'étapes connue qui doit s'exécuter dans l'ordre
- Vous avez besoin d'observabilité à chaque étape (logs, métriques, timing)
- Vous avez besoin de logique de nouvelle tentative pour les API externes instables
- Les règles métier ne peuvent pas être « interprétées » - elles doivent être suivies à la lettre

---

## Le problème de fenêtre de contexte dont personne ne parle

Il y a un motif que je vois sans cesse. Quelqu'un construit un chatbot. Ça marche parfaitement pendant les tests. Puis en production, les utilisateurs ont des conversations plus longues et soudain le bot se perd.

Le développeur regarde les logs et se rend compte qu'il envoie tout l'historique de la conversation à chaque requête. Les 47 messages. Ils brûlent des tokens et de l'espace de contexte pour des informations majoritairement non pertinentes.

Pire, il existe un phénomène que les chercheurs appellent « perdu au milieu » où les modèles performent moins bien lorsque les informations pertinentes sont noyées dans un long contexte. Le modèle est littéralement incapable de voir la forêt à cause des arbres.

Envoyer l'historique complet de la conversation semble sûr. Vous donnez au modèle « toutes les informations. » Mais en réalité, vous rendez plus difficile pour le modèle de se concentrer sur ce qui importe.

### Messages récents, mémoire de travail et rappel

Le système de mémoire de Mastra sépare plusieurs tâches que les équipes mélangent souvent. L'historique des messages récents garde les derniers échanges disponibles avec `lastMessages`. La mémoire de travail stocke des faits structurés persistants comme les préférences utilisateur, les objectifs et l'état du projet. Le rappel sémantique recherche les messages plus anciens par leur sens lorsque la requête actuelle semble liée. La mémoire observationnelle va un cran plus loin pour les longues conversations en compressant l'historique brut ancien en observations denses.

```typescript
// src/mastra/agents/memory-agent.ts
import { Agent } from '@mastra/core/agent';
import { ModelRouterEmbeddingModel } from '@mastra/core/llm';
import { Memory } from '@mastra/memory';
import { LibSQLStore, LibSQLVector } from '@mastra/libsql';

export const memoryAgent = new Agent({
  id: 'memory-agent',
  name: 'Memory Agent',
  instructions: 'You are a helpful assistant with perfect recall of our conversations.',
  model: 'openai/gpt-5.5',
  memory: new Memory({
    storage: new LibSQLStore({
      id: 'memory-agent-store',
      url: 'file:./mastra.db',
    }),
    vector: new LibSQLVector({
      id: 'memory-agent-vector',
      url: 'file:./mastra.db',
    }),
    embedder: new ModelRouterEmbeddingModel('openai/text-embedding-3-small'),
    options: {
      lastMessages: 20,
      workingMemory: {
        enabled: true,
      },
      semanticRecall: {
        topK: 5,
        messageRange: 2,
        scope: 'resource',
      },
      observationalMemory: true,
    },
  }),
});
```

Une note opérationnelle : `observationalMemory: true` utilise actuellement `google/gemini-2.5-flash` comme modèle d'observation par défaut. Cela signifie que cet agent, par ailleurs basé sur OpenAI, nécessite également un accès au modèle Google, engendre une utilisation de modèle distincte et peut envoyer l'historique des conversations via un second fournisseur. En production, configurez explicitement le modèle de mémoire observationnelle et soumettez ce choix à la même revue de credentials, coûts, résidence et conservation des données que le modèle d'agent principal.

Voici comment cela se traduit en pratique. Un utilisateur demande : « Quel était ce restaurant italien que vous avez recommandé le mois dernier ? »

Sans rappel sémantique ni observations, l'agent voit les 20 derniers messages. La recommandation du restaurant était le message 487 sur 506. Elle a disparu. L'agent répond : « Je n'ai pas cette information. »

Avec le rappel sémantique :
1. La requête est intégrée : `[0.234, -0.567, 0.891, ...]`
2. L'intégration est comparée aux messages historiques
3. Le message 487 (« Je recommanderais Trattoria Bella – leur carbonara est incroyable ») obtient une similarité de 0.89
4. Ce message est injecté dans le contexte actuel
5. L'agent répond : « J'ai recommandé Trattoria Bella. C'est leur carbonara qui a retenu mon attention. »

L'agent semble avoir une mémoire parfaite tout en n'utilisant qu'une fraction de la fenêtre de contexte. Ce n'est pas seulement une ingénierie astucieuse – c'est fonctionnellement nécessaire dès que les conversations dépassent quelques dizaines de messages.

---

## Coordination via des agents superviseurs

Parfois, vous avez besoin à la fois de structure et de flexibilité. Les workflows purs sont trop rigides. Les agents purs sont trop imprévisibles.

Les agents superviseurs vous offrent un coordinateur qui décide quel agent spécialisé, workflow ou outil doit prendre le relais. Considérez-le comme un équilibreur de charge intelligent pour les capacités IA.

```typescript
const researchAgent = new Agent({
  id: 'research-agent',
  description: 'Gathers facts and returns sourced research notes.',
  model: 'openai/gpt-5-mini',
});

const writingAgent = new Agent({
  id: 'writing-agent',
  description: 'Turns research notes into clear, structured prose.',
  model: 'openai/gpt-5-mini',
});

export const coordinatorAgent = new Agent({
  id: 'coordinator-agent',
  name: 'Research Coordinator',
  instructions: `You coordinate researchers, writers, tools, and workflows.
    - Delegate fact gathering to research-agent
    - Delegate final prose to writing-agent
    - Use weatherTool for current weather data
    - Use activityPlannerWorkflow for location-based planning
    
    Always produce comprehensive, well-structured responses.`,
  model: 'openai/gpt-5.5',
  
  // Available primitives
  agents: { researchAgent, writingAgent },
  workflows: { activityPlannerWorkflow },
  tools: { weatherTool },
  
  // Supervisor state and delegation traces need somewhere durable to land.
  memory: new Memory({
    storage: new LibSQLStore({ id: 'supervisor-store', url: 'file:./supervisor.db' }),
  }),
});
```

Lorsque vous interrogez ce superviseur, il analyse la requête et achemine en conséquence :
- « J'ai besoin de faits sur X » déclenche l'agent de recherche
- « Planifie un week-end à Seattle » exécute le workflow planificateur d'activités
- « Rédige un rapport sur Y » engage l'agent de rédaction

Ce modèle s'adapte mieux que d'essayer de tout fourrer dans un seul méga-agent. Les agents spécialisés développent une expertise ciblée. Le coordinateur gère le routage. Chaque pièce fait ce pour quoi elle est bonne.

---

## Assembler le tout

Les systèmes d'IA de production réels ont besoin d'architecture, pas seulement de prompts. Vous construisez des systèmes distribués où certains nœuds sont des LLM.

Workflows vous offrent des garanties quand vous avez besoin que les choses se passent exactement comme prévu. La mémoire apporte du contexte sans brûler votre budget de tokens. Les agents superviseurs permettent de composer de la complexité à partir de briques plus simples.

Rien de tout cela n’est glamour. Mais après avoir vu assez d’« agents totalement autonomes » échouer en production, j’ai appris à préférer la fiabilité ennuyeuse à l’imprévisibilité excitante.

Votre expérience peut varier, mais d’après la mienne, les systèmes qui sont réellement livrés et qui restent en production sont ceux qui traitent les LLM comme des composants dans une architecture plus large, plutôt que comme des boîtes magiques qui résolvent tout.

### Ressources

- [Documentation des Workflows Mastra](https://mastra.ai/docs/workflows/overview)
- [Documentation de la Mémoire Mastra](https://mastra.ai/docs/memory/overview)
- [Agents Superviseurs Mastra](https://mastra.ai/docs/agents/supervisor-agents)
- [Rappel Sémantique Mastra](https://mastra.ai/docs/memory/semantic-recall)

## Lire la série

1. [Routage LLM](/llm-routing-mastra-ai)
2. [Sécurité & Garde-fous](/mastra-security-guardrails)
3. [Intégrations MCP & Outils](/mastra-mcp-tool-integrations)
4. **Workflows & Mémoire** (Cet article)
````
