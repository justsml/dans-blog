# Translation Candidate
- Slug: mastra-mcp-tool-integrations
- Locale: fr
- Model: deepseek/deepseek-v4-flash
- Target: src/content/posts/2026-01-04--mastra-mcp-tool-integrations/fr/index.mdx
- Validation: deferred
- Runtime seconds: 28.34
- Input tokens: 5997
- Output tokens: 4852
- Thinking tokens: unknown
- Cached input tokens: 1152
- Cache write tokens: 0
- Estimated cost: $0.002040
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
title: Votre agent IA est inutile sans cela
subTitle: Pourquoi MCP est l'USB-C de l'Intelligence Artificielle.
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
Vous avez construit un agent IA. Peut-être même un bon. Les prompts sont précis, le modèle est rapide, et les réponses semblent naturelles.

Mais ensuite, quelqu'un lui demande de vérifier Salesforce pour un enregistrement client. Ou de récupérer les derniers tickets Jira. Ou de fouiller votre documentation interne.

Et votre magnifique agent... ne peut pas.

C'est le problème d'intégration que toute plateforme IA rencontre tôt ou tard. Votre agent a besoin de mains. Il a besoin d'yeux dans vos systèmes métier réels. Sans eux, vous ne faites que faire tourner un chatbot coûteux.

La solution traditionnelle ? Écrire un wrapper API personnalisé pour chaque service que vous voulez connecter. Lire leur documentation, gérer leur authentification, composer avec leurs limites de débit, prier pour qu'ils ne changent pas leurs endpoints le mois prochain. Puis recommencer pour le service suivant. Et encore le suivant.

Le Model Context Protocol change complètement cette équation.

---

## Ce que MCP résout réellement

Pensez à l'USB avant l'USB-C. Vous aviez du Mini-USB, du Micro-USB, des connecteurs propriétaires Apple, et un tiroir plein de câbles qui ne fonctionnaient qu'avec des appareils spécifiques. L'USB-C n'a pas simplement ajouté un nouveau connecteur — il a établi une norme qui signifiait que n'importe quel câble pouvait fonctionner avec n'importe quel appareil.

MCP fait la même chose pour les intégrations d'outils IA.

Au lieu d'écrire du code personnalisé pour connecter votre agent à Salesforce, HubSpot, GitHub ou tout autre service, vous implémentez le protocole une fois (ou téléchargez un serveur pré-construit), et tout agent compatible MCP peut y communiquer immédiatement.

Le protocole gère la couche de communication. Vous définissez simplement ce que vos outils font et les données dont ils ont besoin.

---

## Configuration de plusieurs intégrations

Mastra prend en charge MCP nativement via son [`MCPClient`](https://mastra.ai/docs/mcp/overview). Vous pouvez connecter à la fois des outils locaux (s'exécutant en tant que processus enfants) et des services distants (tournant sur leur propre infrastructure).

Voici une configuration de production réaliste reliant Google Maps pour le routage, un service météo et une recherche locale sur Wikipedia :

```typescript
// src/mastra/mcp/index.ts
import { MCPClient } from '@mastra/mcp';

export const mcpClient = new MCPClient({
  servers: {
    // Local tool (Stdio)
    wikipedia: {
      command: 'npx',
      args: ['-y', 'wikipedia-mcp'],
    },
    // Maps & Navigation (Remote/HTTP)
    googleMaps: {
      url: new URL(process.env.GOOGLE_MAPS_MCP_URL!),
      requestInit: {
        headers: {
          Authorization: `Bearer ${process.env.GOOGLE_MAPS_API_KEY}`,
        },
      },
    },
    // Weather Service Integration
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

Le client gère le cycle de vie des connexions, le lancement des processus pour les outils locaux et le maintien des connexions HTTP pour les serveurs distants. Vous ne touchez ni aux sockets ni à stdio directement.

---

## Connecter les outils aux agents

Une fois votre client MCP configuré, donner ces outils à un agent est simple :

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

Quand un utilisateur demande : *« Quel est le meilleur itinéraire de San Francisco au lac Tahoe, et dois-je m’inquiéter de la météo ? »*

L’agent lit les définitions d’outils disponibles, comprend qu’il a accès aux outils de routage Google Maps et de prévisions météo, les exécute avec les bons paramètres, et répond avec un itinéraire optimal ainsi que les conditions météo actuelles le long du trajet.

Vous n’avez pas écrit une seule ligne de code d’API Google Maps ni d’intégration météo.

---

## Authentification par utilisateur

Il y a une erreur de sécurité facile à commettre ici : coder en dur les identifiants.

Si vous mettez une seule clé API Google Maps dans vos variables d’environnement et que vous en restez là, tous les utilisateurs partagent le même quota et les mêmes limites de débit. Plus important encore, si vous utilisez des services qui stockent les préférences des utilisateurs (comme des lieux sauvegardés ou des itinéraires favoris), tout le monde verrait les mêmes données. Cela fonctionne bien pour des démos. C’est un risque en production.

Mastra gère cela en vous permettant de créer des clients MCP dynamiquement avec des identifiants propres à chaque utilisateur :

```typescript
async function handleUserRequest(userPrompt: string, userCredentials: UserCreds) {
  // Crée un client pour CET utilisateur spécifique
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
  
  // Injecte les outils à l'exécution
  const response = await agent.generate(userPrompt, {
    toolsets: await userMcp.getToolsets(),
  });

  return response;
}
```

Chaque utilisateur obtient son propre ensemble d’outils isolé, avec ses propres quotas API et préférences. Les lieux sauvegardés de l’utilisateur A restent privés, l’historique des itinéraires de l’utilisateur B est séparé. C’est ainsi que fonctionnent les agents SaaS multi‑tenants en pratique.

---

## Construire des outils composites

Parfois, vous devez combiner plusieurs outils MCP en une seule opération. Peut-être voulez-vous planifier un itinéraire qui tient compte à la fois du trafic en temps réel et des conditions météorologiques sur le trajet.

Vous pouvez encapsuler les outils MCP dans des définitions d'outils personnalisées :

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

Cela vous donne un contrôle fin sur la manière dont les outils interagissent, tout en tirant parti du protocole MCP pour le gros du travail.

---

## Où cela mène

Écrire des clients API personnalisés pour chaque service avec lequel votre agent IA doit communiquer n'a jamais été viable. Cela passe mal à l'échelle, casse souvent, et lie votre plateforme à des implémentations spécifiques.

MCP ne résout pas tous les défis d'intégration — l'authentification reste complexe, la limitation de débit compte toujours, et tous les services n'ont pas encore de serveur MCP. Mais il établit une base qui rend la construction de plateformes d'agents nettement moins pénible.

Si vous concevez un système IA qui doit interagir avec des services externes, comprendre MCP vaut probablement votre temps.

### Ressources

- [Documentation MCP de Mastra](https://mastra.ai/docs/mcp/overview)
- [Registre MCP](https://registry.modelcontextprotocol.io)
- [Klavis AI (MCP Entreprise)](https://klavis.ai)
- [Dépôt GitHub de Mastra](https://github.com/mastra-ai/mastra)

## Lire la série

1. [Routage LLM](/llm-routing-mastra-ai)
2. [Sécurité et garde-fous](/mastra-security-guardrails)
3. **Intégrations MCP et d'outils** (Cet article)
4. [Workflows et mémoire](/mastra-workflows-memory)
````
