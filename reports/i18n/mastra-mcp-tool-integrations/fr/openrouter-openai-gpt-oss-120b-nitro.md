# Translation Candidate
- Slug: mastra-mcp-tool-integrations
- Locale: fr
- Model: openrouter/openai/gpt-oss-120b:nitro
- Target: src/content/posts/2026-01-04--mastra-mcp-tool-integrations/fr/index.mdx
- Validation: passed
- Runtime seconds: 8.34
- Input tokens: 8177
- Output tokens: 2458
- Thinking tokens: unknown
- Cached input tokens: 3200
- Cache write tokens: 0
- Estimated cost: $0.000761
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
title: Votre agent IA est inutile sans cela
subTitle: Pourquoi le MCP est le USB‑C de l’intelligence artificielle.
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
Vous avez construit un agent IA. Peut‑être même un bon. Les invites sont précises, le modèle est rapide, et les réponses semblent naturelles.  

Mais ensuite quelqu’un lui demande de vérifier Salesforce pour un enregistrement client. Ou de récupérer les tickets Jira les plus récents. Ou de rechercher dans votre documentation interne.  

Et votre bel agent ne peut tout simplement pas le faire.  

C’est le problème d’intégration auquel toutes les plateformes IA finissent par être confrontées. Votre agent a besoin de mains. Il a besoin d’yeux dans vos véritables systèmes d’entreprise. Sans cela, vous ne faites que faire tourner un chatbot coûteux.  

La solution traditionnelle ? Écrire un wrapper API personnalisé pour chaque service que vous souhaitez connecter. Lire leur documentation, gérer leur authentification, composer avec leurs limites de débit, espérer qu’ils ne changent pas leurs points d’accès le mois prochain. Puis recommencer pour le service suivant. Et le suivant.  

Le Model Context Protocol change complètement ce calcul.

---

## Ce que résout réellement le MCP

Imaginez l’USB avant l’arrivée de l’USB‑C. Vous aviez le Mini‑USB, le Micro‑USB, des connecteurs propriétaires Apple, et un tiroir rempli de câbles qui ne fonctionnaient qu’avec des appareils spécifiques. L’USB‑C n’a pas seulement ajouté un nouveau connecteur — il a instauré une norme qui permet à n’importe quel câble de fonctionner avec n’importe quel appareil.

Le MCP fait exactement la même chose pour les intégrations d’outils d’IA.

Au lieu d’écrire du code sur‑mesure pour connecter votre agent à Salesforce, HubSpot, GitHub ou tout autre service, vous implémentez le protocole une fois (ou téléchargez un serveur pré‑construit), et tout agent compatible MCP peut s’y brancher immédiatement.

Le protocole gère la couche de communication. Vous vous contentez de définir ce que font vos outils et quelles données ils nécessitent.

---

## Configurer plusieurs intégrations

Mastra prend en charge nativement le MCP via son [`MCPClient`](https://mastra.ai/docs/mcp/overview). Vous pouvez connecter à la fois des outils locaux (exécutés en tant que processus enfants) et des services distants (hébergés sur leur propre infrastructure).

Voici une configuration de production réaliste qui relie Google Maps pour le routage, un service météo et une recherche Wikipedia locale :

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
    // Cartes & Navigation (Remote/HTTP)
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

Le client gère le cycle de vie des connexions, lance les processus pour les outils locaux et maintient les connexions HTTP pour les serveurs distants. Vous n’avez jamais à toucher directement aux sockets ou aux flux stdio.

## Connexion des outils aux agents

Une fois que votre client MCP est configuré, fournir ces outils à un agent est simple :

```typescript
// src/mastra/agents/navigation-agent.ts
import { Agent } from '@mastra/core/agent';
import { openai } from '@ai-sdk/openai';
import { mcpClient } from '../mcp';

export const navigationDirectionsAgent = new Agent({
  id: 'navigation-directions-agent',
  name: 'Assistant de navigation et d’itinéraires',
  instructions: `Vous êtes un assistant de navigation utile qui fournit la planification d’itinéraires et des conseils de voyage.
    - Confirmez toujours les lieux de départ et d’arrivée
    - Utilisez les outils Google Maps pour trouver les itinéraires optimaux
    - Vérifiez les conditions météorologiques le long du trajet
    - Fournissez les temps de trajet estimés et proposez des alternatives si la météo est mauvaise
    - Incluez les détails pertinents comme le trafic, l’état des routes et les points d’intérêt
    - Gardez les réponses claires et exploitables`,
  model: openai('gpt-5'),
  tools: await mcpClient.getTools(), // <--- C’est la ligne magique
});
```

Lorsqu’un utilisateur demande : *« Quel est le meilleur itinéraire de San Francisco à Lake Tahoe, et dois‑je me préoccuper de la météo ? »*

L’agent lit les définitions d’outils disponibles, constate qu’il a accès aux outils de routage Google Maps et de prévision météo, les exécute avec les paramètres appropriés, puis répond avec un itinéraire optimal accompagné des conditions météorologiques actuelles le long du parcours.

Vous n’avez écrit aucune ligne de code d’API Google Maps ni d’intégration de service météo.

## Authentification par utilisateur

Il y a une erreur de sécurité courante : coder en dur les informations d’identification.

Si vous placez une clé d’API Google Maps dans vos variables d’environnement et que vous vous arrêtez là, tous les utilisateurs partagent le même quota et les mêmes limites de débit. Plus important encore, si vous utilisez des services qui stockent les préférences des utilisateurs (comme les emplacements enregistrés ou les itinéraires favoris), tout le monde verrait les mêmes données. Cela fonctionne pour des démonstrations, mais c’est une responsabilité en production.

Mastra gère cela en vous permettant de créer des clients MCP dynamiquement avec des informations d’identification propres à chaque utilisateur :

```typescript
async function handleUserRequest(userPrompt: string, userCredentials: UserCreds) {
  // Create a client for THIS specific user
  const userMcp = new MCPClient({
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

  const agent = mastra.getAgent('navigationDirectionsAgent');
  
  // Inject tools at runtime
  const response = await agent.generate(userPrompt, {
    toolsets: await userMcp.getToolsets(),
  });

  return response;
}
```

Chaque utilisateur obtient son propre ensemble d’outils isolé, avec ses quotas d’API et ses préférences. Les emplacements enregistrés de l’utilisateur A restent privés, l’historique d’itinéraires de l’utilisateur B est séparé. C’est ainsi que les agents SaaS multi‑locataires fonctionnent en pratique.

## Construction d’outils composites

Parfois, il faut combiner plusieurs outils MCP en une seule opération. Par exemple, vous pourriez vouloir planifier un itinéraire qui prend en compte à la fois le trafic en temps réel et les conditions météorologiques le long du trajet.

Vous pouvez encapsuler les outils MCP dans des définitions d’outils personnalisées :

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

Cela vous donne un contrôle granulaire sur la façon dont les outils interagissent, tout en continuant à exploiter le protocole MCP pour la partie lourde.

---

## Où cela mène


Écrire des clients API personnalisés pour chaque service auquel votre agent IA doit se connecter n’a jamais été viable. Cela ne se scale pas, cela casse souvent, et cela lie votre plateforme à des implémentations spécifiques.

MCP ne résout pas tous les problèmes d’intégration — l’authentification reste complexe, la limitation de débit demeure un enjeu, et tous les services ne disposent pas encore d’un serveur MCP. Mais il pose une base qui rend la construction de plateformes d’agents nettement moins pénible.

Si vous concevez un système IA qui doit interagir avec des services externes, comprendre MCP vaut probablement votre temps.

### Ressources

- [Mastra MCP Documentation](https://mastra.ai/docs/mcp/overview)
- [MCP Registry](https://registry.modelcontextprotocol.io)
- [Klavis AI (Enterprise MCP)](https://klavis.ai)
- [Mastra GitHub Repository](https://github.com/mastra-ai/mastra)

## Lire la série

1. [LLM Routing](../llm-routing-mastra-ai)  
2. [Security & Guardrails](../mastra-security-guardrails)  
3. **MCP & Intégrations d’Outils** (Ce post)  
4. [Workflows & Mémoire](../mastra-workflows-memory)
````
