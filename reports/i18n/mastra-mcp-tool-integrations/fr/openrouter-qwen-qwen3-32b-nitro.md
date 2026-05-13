# Translation Candidate
- Slug: mastra-mcp-tool-integrations
- Locale: fr
- Model: openrouter/qwen/qwen3-32b:nitro
- Target: src/content/posts/2026-01-04--mastra-mcp-tool-integrations/fr/index.mdx
- Validation: passed
- Runtime seconds: 20.47
- Input tokens: 7630
- Output tokens: 7736
- Thinking tokens: unknown
- Cached input tokens: 1536
- Cache write tokens: 0
- Estimated cost: $0.002467
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
title: Votre agent IA est inutile sans cela
subTitle: Pourquoi MCP est le USB-C de l'Intelligence Artificielle.
date: '2026-01-04'
modified: '2026-01-08'
tags:
  - ai
  - mcp
  - tools
  - integrations
  - mastra
  - salesforce
  - apis
category: AI
subCategory: Integration
social_image: ../desktop-social.webp
cover_full_width: ../wide.webp
cover_mobile: ../square.webp
cover_icon: ../square.webp
---
Vous avez construit un agent IA. Peut-être même un bon. Les prompts sont bien calibrés, le modèle est rapide, et les réponses semblent naturelles.  

Mais ensuite, quelqu'un lui demande de vérifier Salesforce pour un enregistrement client. Ou de récupérer les derniers tickets Jira. Ou de rechercher dans votre documentation interne.  

Et votre agent si bien conçu ne peut tout simplement pas.  

C'est le problème d'intégration auquel chaque plateforme IA se heurte tôt ou tard. Votre agent a besoin de mains. Il a besoin d'yeux sur vos systèmes métier réels. Sans eux, vous n'êtes qu'en train de faire tourner un chatbot coûteux.  

La solution traditionnelle ? Écrire un wrapper API personnalisé pour chaque service auquel vous souhaitez vous connecter. Lire leurs documents, gérer leur authentification, faire face à leurs limites de débit, prier qu'ils ne modifient pas leurs points de terminaison le mois prochain. Puis refaire tout cela pour le service suivant. Et le suivant.  

Le Model Context Protocol change entièrement cette équation.

## Ce que MCP résout réellement  

Pensez au USB avant le USB-C. Vous aviez le Mini-USB, le Micro-USB, les connecteurs propriétaires Apple, et une corbeille pleine de câbles fonctionnant uniquement avec des appareils spécifiques. Le USB-C n’a pas simplement ajouté un nouveau connecteur — il a établi une norme signifiant qu’un câble pouvait fonctionner avec n’importe quel appareil.  

MCP fait de même pour les intégrations d’outils d’IA.  

Au lieu d’écrire du code personnalisé pour connecter votre agent à Salesforce, HubSpot, GitHub ou tout autre service, vous implémentez le protocole une fois (ou téléchargez un serveur prédéfini), et n’importe quel agent compatible avec MCP peut immédiatement communiquer avec lui.  

Le protocole gère la couche de communication. Vous définissez simplement ce que vos outils font et quelles données ils nécessitent.

---

## Configuration de plusieurs intégrations

Mastra prend en charge nativement MCP via son [`MCPClient`](https://mastra.ai/docs/mcp/overview). Vous pouvez connecter à la fois des outils locaux (exécutés en tant que processus enfant) et des services distants (exécutés sur leur propre infrastructure).

Voici un exemple de configuration de production réelle connectant Google Maps pour la navigation, un service météo et une recherche Wikipedia locale :

```typescript
// src/mastra/mcp/index.ts
import { MCPClient } from '@mastra/mcp';

export const mcpClient = new MCPClient({
  servers: {
    // Outil local (Stdio)
    wikipedia: {
      command: 'npx',
      args: ['-y', 'wikipedia-mcp'],
    },
    // Cartes & Navigation (Distant/HTTP)
    googleMaps: {
      url: new URL(process.env.GOOGLE_MAPS_MCP_URL!),
      requestInit: {
        headers: {
          Authorization: `Bearer ${process.env.GOOGLE_MAPS_API_KEY}`,
        },
      },
    },
    // Intégration du service météo
    weather: {
      url: new URL('https://mcp.weatherapi.dev/v1'),
      requestInit: {
        headers: {
          'X-API-Key': process.env.WEATHER_API_KEY!,
        },
      },
    },
  },
});
```

Le client gère le cycle de vie des connexions, lance les processus pour les outils locaux et maintient les connexions HTTP pour les serveurs distants. Vous n'avez pas à manipuler les sockets ou le stdio directement.

---

## Connexion des outils aux agents

Une fois votre client MCP configuré, il suffit de transmettre ces outils à un agent :

```typescript
// src/mastra/agents/navigation-agent.ts
import { Agent } from '@mastra/core/agent';
import { openai } from '@ai-sdk/openai';
import { mcpClient } from '../mcp';

export const navigationDirectionsAgent = new Agent({
  id: 'navigation-directions-agent',
  name: 'Navigation & Directions Assistant',
  instructions: `You are a helpful navigation assistant that provides route planning and travel advice.
    - Always confirm the start and destination locations
    - Use Google Maps tools to find optimal routes
    - Check weather conditions along the route
    - Provide estimated travel times and suggest alternatives if weather is poor
    - Include relevant details like traffic, road conditions, and points of interest
    - Keep responses clear and actionable`,
  model: openai('gpt-5'),
  tools: await mcpClient.getTools(), // <--- This is the magic line
});
```

Quand un utilisateur demande : *"What's the best route from San Francisco to Lake Tahoe, and should I be worried about weather?"*

L'agent lit les définitions des outils disponibles, constate qu'il a accès aux outils de routage Google Maps et de prévisions météo, les exécute avec les bons paramètres, puis répond avec l'itinéraire optimal et les conditions météo actuelles le long du trajet.

Vous n'avez pas écrit une seule ligne de code d'API Google Maps ou d'intégration du service météo.

## Authentification par utilisateur

Il existe une erreur de sécurité facile à commettre ici : coder en dur les identifiants.

Si vous placez une clé API Google Maps dans vos variables d'environnement et que vous considérez le problème résolu, tous les utilisateurs partagent la même cote et les mêmes limites de débit. Plus important encore, si vous utilisez des services stockant les préférences utilisateur (comme les emplacements sauvegardés ou les itinéraires favoris), tout le monde verrait les mêmes données. Cela fonctionne bien pour les démos. C'est un risque en production.

Mastra gère cela en vous permettant de créer dynamiquement des clients MCP avec des identifiants spécifiques à l'utilisateur :

```typescript
async function handleUserRequest(userPrompt: string, userCredentials: UserCreds) {
  // Créer un client pour CET utilisateur spécifique
  const userMcp = new MCPClient({
    servers: {
      googleMaps: {
        url: new URL(process.env.GOOGLE_MAPS_MCP_URL!),
        requestInit: {
          headers: {
            // Clé API ou jeton spécifique à l'utilisateur
            Authorization: `Bearer ${userCredentials.mapsApiKey}`,
            'X-User-ID': userCredentials.userId,
          },
        },
      },
    },
  });

  const agent = mastra.getAgent('navigationDirectionsAgent');
  
  // Injecter des outils au moment de l'exécution
  const response = await agent.generate(userPrompt, {
    toolsets: await userMcp.getToolsets(),
  });

  return response;
}
```

Chaque utilisateur obtient son propre ensemble d'outils isolé, avec ses propres quotas API et préférences. Les emplacements sauvegardés de l'utilisateur A restent privés, l'historique des itinéraires de l'utilisateur B est séparé. C'est ainsi que fonctionnent en pratique les agents SaaS multilocataires.

## Création d'outils composites

Parfois, vous devez combiner plusieurs outils MCP en une seule opération. Peut-être souhaitez-vous planifier une route qui tient compte à la fois du trafic en temps réel et des conditions météorologiques le long du trajet.

Vous pouvez envelopper les outils MCP dans des définitions d'outils personnalisées :

```typescript
export const smartRouteTool = createTool({
  id: 'smart-route-planner',
  description: 'Plans optimal route considering traffic and weather conditions',
  execute: async ({ context, mastra }) => {
    // Get the raw tools
    const tools = await mcpClient.getTools();
    
    // 1. Get base route from Google Maps
    const routeData = await tools.googleMaps_getDirections.execute({ 
      context: { 
        origin: context.origin,
        destination: context.destination 
      } 
    });
    
    // 2. Check weather along the route
    const weatherData = await tools.weather_getForecast.execute({
      context: { coordinates: routeData.waypoints }
    });
    
    // 3. Return enhanced route with weather warnings
    return { 
      ...routeData, 
      weatherAlerts: weatherData.alerts,
      recommendation: weatherData.severe ? 'Consider delaying trip' : 'Safe to travel'
    };
  },
});
```

Cela vous donne un contrôle granulaire sur la manière exacte dont les outils interagissent, tout en tirant parti du protocole MCP pour le travail lourd.

---

## Où cela mène

---

Écrire des clients API personnalisés pour chaque service dont votre agent IA doit communiquer n'était pas durable. Cela échelle mal, se casse souvent et lie votre plateforme à des implémentations spécifiques.

MCP ne résout pas tous les défis d'intégration — l'authentification reste complexe, la limitation de débit reste importante, et tous les services n'ont pas encore un serveur MCP. Mais il établit une base qui rend la construction de plateformes d'agents significativement moins douloureuse.

Si vous concevez un système d'IA qui doit interagir avec des services externes, comprendre le MCP vaut probablement le coup.

### Ressources

- [Documentation MCP de Mastra](https://mastra.ai/docs/mcp/overview)
- [Registre MCP](https://registry.modelcontextprotocol.io)
- [Klavis AI (MCP Entreprise)](https://klavis.ai)
- [Dépôt GitHub de Mastra](https://github.com/mastra-ai/mastra)

## Lire la série

## Lire la série

1. [Acheminement des modèles LLM](/llm-routing-mastra-ai)
2. [Sécurité et barrières de protection](/mastra-security-guardrails)
3. **MCP et intégrations d'outils** (Cet article)
4. [Flux de travail et mémoire](/mastra-workflows-memory)
````
