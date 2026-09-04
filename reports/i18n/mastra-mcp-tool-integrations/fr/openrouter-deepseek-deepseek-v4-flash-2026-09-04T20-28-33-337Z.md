# Translation Candidate
- Slug: mastra-mcp-tool-integrations
- Locale: fr
- Model: openrouter/deepseek/deepseek-v4-flash
- Target: src/content/posts/2026-01-04--mastra-mcp-tool-integrations/fr/index.mdx
- Validation: deferred
- Runtime seconds: 44.56
- Input tokens: 6062
- Output tokens: 5070
- Thinking tokens: unknown
- Cached input tokens: 2816
- Cache write tokens: 0
- Estimated cost: $0.001882
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
title: Votre agent IA est inutile sans ceci
subTitle: ''
modified: '2026-09-04'
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
Vous avez construit un agent IA. Peut-être même un bon. Les prompts sont précis, le modèle est rapide, et les réponses paraissent naturelles.

Mais ensuite, quelqu'un lui demande de vérifier Salesforce pour un enregistrement client. Ou de récupérer les derniers tickets Jira. Ou de fouiller votre documentation interne.

Et votre bel agent... ne peut pas.

C'est le problème d'intégration que toute plateforme IA finit par rencontrer. Votre agent a besoin de mains. Il a besoin d'un œil sur vos systèmes métier réels. Sans ça, vous ne faites que faire tourner un chatbot coûteux.

La solution traditionnelle ? Écrire un wrapper API sur mesure pour chaque service que vous voulez connecter. Lire leur documentation, gérer leur auth, composer avec leurs limites de taux, prier pour qu'ils ne changent pas leurs endpoints le mois prochain. Puis recommencer pour le service suivant. Et encore un autre.

Le Model Context Protocol change complètement cette équation.

---

## Ce que résout réellement MCP

Pensez à l'USB avant l'USB-C. Vous aviez du Mini-USB, du Micro-USB, les connecteurs propriétaires Apple, et un tiroir plein de câbles qui ne fonctionnaient qu'avec certains appareils. L'USB-C n'a pas seulement ajouté un nouveau connecteur : il a établi une norme qui permet à n'importe quel câble de fonctionner avec n'importe quel appareil.

MCP fait la même chose pour les intégrations d'outils IA.

Au lieu d'écrire du code sur mesure pour connecter votre agent à Salesforce, HubSpot, GitHub ou tout autre service, vous implémentez le protocole une fois (ou téléchargez un serveur préconstruit), et n'importe quel agent compatible MCP peut lui parler immédiatement.

Le protocole gère la couche de communication. Vous définissez simplement ce que vos outils font et les données dont ils ont besoin.

---

## Configurer plusieurs intégrations

Mastra intègre nativement le support MCP via son [`MCPClient`](https://mastra.ai/docs/mcp/overview). Vous pouvez connecter à la fois des outils locaux (exécutés comme processus fils) et des services distants (tournant sur leur propre infrastructure).

Voici une configuration représentative connectant cartes, météo, et recherche Wikipedia locale :

```typescript
// src/mastra/mcp/index.ts
import { MCPClient } from '@mastra/mcp';

export const mcpClient = new MCPClient({
  id: 'navigation-mcp',
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
    // Intégration service météo
    weather: {
      url: new URL(process.env.WEATHER_MCP_URL!),
      requestInit: {
        headers: {
          'X-API-Key': process.env.WEATHER_API_KEY!,
        },
      },
    },
  },
});
```

Le client gère le cycle de vie des connexions, le lancement des processus pour les outils locaux, et maintient les connexions HTTP pour les serveurs distants. Vous ne touchez ni aux sockets ni à stdio directement.

## Connecter les outils aux agents

Une fois votre client MCP configuré, donner ces outils à un agent est simple :

```typescript
// src/mastra/agents/navigation-agent.ts
import { Agent } from '@mastra/core/agent';
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
  model: 'openai/gpt-5.5',
  tools: await mcpClient.listTools(), // <--- This is the magic line
});
```

Quand un utilisateur demande : *« Quelle est la meilleure route de San Francisco au lac Tahoe, et dois-je m'inquiéter de la météo ? »*

L'agent lit les définitions d'outils disponibles, comprend qu'il a accès aux outils de routage Google Maps et de prévisions météo, les exécute avec les bons paramètres et répond avec un itinéraire optimal ainsi que les conditions météorologiques actuelles sur le parcours.

Vous n'avez pas écrit une seule ligne de code d'API Google Maps ou d'intégration de service météo.

---

## Authentification par utilisateur

Il y a une erreur de sécurité facile à commettre ici : coder en dur les identifiants.

Si vous mettez une seule clé API Google Maps dans vos variables d'environnement et que vous en restez là, tous les utilisateurs partagent le même quota et les mêmes limites de débit. Plus important encore, si vous utilisez des services qui stockent les préférences utilisateur (comme les lieux sauvegardés ou les itinéraires favoris), tout le monde verrait les mêmes données. Cela fonctionne bien pour des démos. C'est un risque en production.

Mastra prend en charge cela en vous permettant de créer des clients MCP dynamiquement avec des identifiants spécifiques à l'utilisateur et de passer leurs ensembles d'outils au moment de la requête. Vous gérez toujours la tuyauterie SaaS habituelle : stocker les jetons en toute sécurité, les rafraîchir et décider quels utilisateurs peuvent connecter quels services.

```typescript
async function handleUserRequest(userPrompt: string, userCredentials: UserCreds) {
  // Create a client for THIS specific user
  const userMcp = new MCPClient({
    id: `maps-${userCredentials.userId}`,
    servers: {
      googleMaps: {
        url: new URL(process.env.GOOGLE_MAPS_MCP_URL!),
        requestInit: {
          headers: {
            // User's specific API key or token
            Authorization: `Bearer ${userCredentials.mapsApiKey}`,
            'X-User-ID': userCredentials.userId,
          },
        },
      },
    },
  });

  try {
    const agent = mastra.getAgent('navigationDirectionsAgent');
    
    // Inject tools at runtime
    const response = await agent.generate(userPrompt, {
      toolsets: await userMcp.listToolsets(),
    });

    return response;
  } finally {
    await userMcp.disconnect();
  }
}
```

Chaque utilisateur obtient son propre ensemble d'outils isolé avec ses propres quotas API et préférences. Les lieux sauvegardés de l'Utilisateur A restent privés, l'historique des itinéraires de l'Utilisateur B est séparé. C'est ainsi que fonctionnent en pratique les agents SaaS multi-locataires.

---

## Construire des outils composites

Parfois, vous devez combiner plusieurs outils MCP en une seule opération. Peut-être voulez-vous planifier un itinéraire qui tienne compte à la fois du trafic en temps réel et des conditions météorologiques sur le parcours.

Vous pouvez encapsuler les outils MCP dans des définitions d'outils personnalisées :

```typescript
import { createTool } from '@mastra/core/tools';
import { z } from 'zod';

type DirectionsResult = {
  waypoints: Array<{ latitude: number; longitude: number }>;
  [key: string]: unknown;
};

type ForecastResult = {
  alerts?: unknown[];
  severe?: boolean;
};

export const smartRouteTool = createTool({
  id: 'smart-route-planner',
  description: 'Plans optimal route considering traffic and weather conditions',
  inputSchema: z.object({
    origin: z.string(),
    destination: z.string(),
  }),
  outputSchema: z.object({
    route: z.record(z.string(), z.unknown()),
    weatherAlerts: z.array(z.unknown()),
    recommendation: z.string(),
  }),
  execute: async ({ origin, destination }, executionContext) => {
    const tools = await mcpClient.listTools();

    // 1. Get base route from Google Maps
    const routeData = await tools.googleMaps_getDirections.execute(
      { origin, destination },
      executionContext,
    ) as DirectionsResult;

    // 2. Check weather along the route
    const weatherData = await tools.weather_getForecast.execute(
      { coordinates: routeData.waypoints },
      executionContext,
    ) as ForecastResult;

    // 3. Return enhanced route with weather warnings
    return {
      route: routeData,
      weatherAlerts: weatherData.alerts ?? [],
      recommendation: weatherData.severe
        ? 'Consider delaying trip'
        : 'Safe to travel',
    };
  },
});
```

Les outils Mastra actuels reçoivent d'abord une entrée validée, puis le contexte d'exécution. Passer ce contexte dans les outils MCP découverts préserve l'état lié à la requête, le traçage et l'annulation. Les noms et types de résultats ci-dessus sont des contrats d'exemple ; utilisez les noms et schémas annoncés par les serveurs MCP auxquels vous vous connectez réellement.

Cela vous donne un contrôle fin sur la manière exacte dont les outils interagissent tout en tirant parti du protocole MCP pour le gros du travail.

---

## L'approbation appartient à la frontière de l'outil

MCP facilite la connexion des outils. Cela ne signifie pas que chaque outil doit s'exécuter sans friction.

Le `MCPClient` de Mastra peut exiger une approbation au niveau du serveur, soit pour chaque outil de ce serveur, soit de manière dynamique par appel :

```typescript
export const githubMcp = new MCPClient({
  id: 'github-mcp',
  servers: {
    github: {
      url: new URL(process.env.GITHUB_MCP_URL!),
      requireToolApproval: ({ toolName, annotations }) => {
        if (annotations?.readOnlyHint) return false;
        if (toolName.includes('delete_')) return true;
        return annotations?.destructiveHint ?? true;
      },
    },
  },
});
```

Cette approbation doit toujours être traitée comme une politique applicative, pas comme un sortilège magique. Les annotations d'outils MCP sont des indices utiles provenant de serveurs de confiance ; elles ne constituent pas à elles seules une barrière de sécurité. Pour les serveurs tiers, optez par défaut pour le comportement le plus ennuyeux et demandez avant que l'agent ne modifie quoi que ce soit d'important.

---

## Où cela nous mène

Écrire des clients API personnalisés pour chaque service avec lequel votre agent IA doit communiquer n'a jamais été viable. Ça passe mal à l'échelle, ça casse souvent, et ça attache votre plateforme à des implémentations spécifiques.

MCP ne résout pas tous les défis d'intégration – l'authentification reste complexe, le rate limiting compte toujours, et tous les services n'ont pas encore de serveur MCP. Mais il établit une base qui rend la construction de plateformes d'agents nettement moins douloureuse.

Si vous concevez un système d'IA qui doit interagir avec des services externes, comprendre MCP vaut probablement votre temps.

### Ressources

- [Documentation Mastra MCP](https://mastra.ai/docs/mcp/overview)
- [Registre MCP](https://registry.modelcontextprotocol.io)
- [Klavis AI (MCP Entreprise)](https://klavis.ai)
- [Dépôt GitHub Mastra](https://github.com/mastra-ai/mastra)

## Lire la série

1. [Routage LLM](../llm-routing-mastra-ai)
2. [Sécurité & Garde-fous](../mastra-security-guardrails)
3. **MCP & Intégrations d'outils** (Cet article)
4. [Workflows & Mémoire](../mastra-workflows-memory)
````
