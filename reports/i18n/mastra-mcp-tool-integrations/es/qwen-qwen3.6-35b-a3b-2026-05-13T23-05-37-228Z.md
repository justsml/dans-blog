# Translation Candidate
- Slug: mastra-mcp-tool-integrations
- Locale: es
- Model: qwen/qwen3.6-35b-a3b
- Target: src/content/posts/2026-01-04--mastra-mcp-tool-integrations/es/index.mdx
- Validation: deferred
- Runtime seconds: 77.05
- Input tokens: 6181
- Output tokens: 16415
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- Estimated cost: $0.017342
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
title: Tu agente de IA es inútil sin esto
subTitle: Por qué MCP es el USB-C de la Inteligencia Artificial.
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
Has construido un agente de IA. Quizá incluso sea bueno. Los prompts están bien calibrados, el modelo es rápido y las respuestas se sienten naturales.

Pero entonces alguien le pide que consulte Salesforce para buscar un registro de cliente. O que extraiga los últimos tickets de Jira. O que busque en tu documentación interna.

Y tu agente, que parecía tan sólido, simplemente... no puede.

Este es el problema de integración que toda plataforma de IA termina enfrentando. Tu agente necesita manos. Necesita ojos dentro de tus sistemas empresariales reales. Sin ellos, solo estás ejecutando un chatbot caro.

¿La solución tradicional? Escribir un wrapper de API personalizado para cada servicio al que quieras conectarte. Leer su documentación, gestionar su autenticación, lidiar con sus límites de tasa, y rezar para que no cambien sus endpoints el próximo mes. Luego repites el proceso para el siguiente servicio. Y para el siguiente.

El Model Context Protocol cambia por completo esta ecuación.

---

## Qué resuelve realmente MCP

Piensa en el USB antes de USB-C. Tenías Mini-USB, Micro-USB, conectores propietarios de Apple y un cajón lleno de cables que solo funcionaban con dispositivos específicos. USB-C no solo añadió un nuevo conector: estableció un estándar que permitía que cualquier cable funcionara con cualquier dispositivo.

MCP está haciendo exactamente lo mismo con las integraciones de herramientas para IA.

En lugar de escribir código personalizado para conectar tu agente a Salesforce, HubSpot, GitHub o cualquier otro servicio, implementas el protocolo una vez (o descargas un servidor preconstruido) y cualquier agente compatible con MCP puede comunicarse con él de inmediato.

El protocolo se encarga de la capa de comunicación. Tú solo defines qué hacen tus herramientas y qué datos necesitan.

---

## Configurar múltiples integraciones

Mastra incluye soporte nativo para MCP a través de su [`MCPClient`](https://mastra.ai/docs/mcp/overview). Puedes conectar tanto herramientas locales (que se ejecutan como procesos hijos) como servicios remotos (que funcionan en su propia infraestructura).

Esta es una configuración de producción realista que conecta Google Maps para enrutamiento, un servicio meteorológico y una búsqueda local de Wikipedia:

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

El cliente gestiona el ciclo de vida de la conexión, se encarga de la creación de procesos para las herramientas locales y mantiene las conexiones HTTP para los servidores remotos. No tocas sockets ni stdio directamente.

---

## Conectar herramientas a agentes

Una vez que tengas configurado tu cliente MCP, asignar esas herramientas a un agente es directo:

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

Cuando un usuario pregunta: *"¿Cuál es la mejor ruta desde San Francisco hasta Lake Tahoe y debería preocuparme por el clima?"*

El agente lee las definiciones de herramientas disponibles, detecta que tiene acceso a las herramientas de enrutamiento de Google Maps y de pronóstico del clima, las ejecuta con los parámetros correctos y responde con una ruta óptima junto con las condiciones climáticas actuales en el trayecto.

No escribiste ni una sola línea de código para la API de Google Maps ni para la integración del servicio de clima.

---

## Autenticación por usuario

Hay un error de seguridad fácil de cometer aquí: codificar las credenciales.

Si colocas una única clave de API de Google Maps en tus variables de entorno y das por terminado el trabajo, todos los usuarios comparten la misma cuota y los mismos límites de tasa. Más importante aún, si utilizas servicios que almacenan preferencias del usuario (como ubicaciones guardadas o rutas favoritas), todos verían los mismos datos. Esto funciona para demos. En producción es un riesgo operativo.

Mastra resuelve esto permitiéndote crear clientes MCP de forma dinámica con credenciales específicas por usuario:

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

Cada usuario obtiene su propio conjunto de herramientas aislado, con sus propias cuotas de API y preferencias. Las ubicaciones guardadas del usuario A permanecen privadas, el historial de rutas del usuario B es independiente. Así es como funcionan en la práctica los agentes SaaS multiinquilino.

## Creación de herramientas compuestas

A veces es necesario combinar varias herramientas MCP en una sola operación. Quizás quieras planificar una ruta que tenga en cuenta tanto el tráfico en tiempo real como las condiciones meteorológicas a lo largo del trayecto.

Puedes encapsular herramientas MCP en definiciones personalizadas:

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

Esto te otorga un control fino sobre la interacción exacta entre herramientas, mientras el protocolo MCP se encarga de la parte más pesada.

---

## Hacia dónde nos lleva esto

Escribir clientes de API personalizados para cada servicio con el que tu agente de IA necesite comunicarse nunca fue sostenible. Escala mal, se rompe con frecuencia y ata tu plataforma a implementaciones específicas.

MCP no resuelve todos los desafíos de integración: la autenticación sigue siendo compleja, la limitación de tasa sigue siendo relevante y aún no todos los servicios cuentan con un servidor MCP. Sin embargo, establece una base que hace que construir plataformas de agentes sea significativamente menos doloroso.

Si estás diseñando un sistema de IA que deba interactuar con servicios externos, entender MCP probablemente valga la pena.

### Recursos

- [Documentación de Mastra MCP](https://mastra.ai/docs/mcp/overview)
- [Registro de MCP](https://registry.modelcontextprotocol.io)
- [Klavis AI (MCP Empresarial)](https://klavis.ai)
- [Repositorio de Mastra en GitHub](https://github.com/mastra-ai/mastra)

## Lee la serie

1. [Enrutamiento de LLM](../llm-routing-mastra-ai)
2. [Seguridad y guardrails](../mastra-security-guardrails)
3. **Integraciones de MCP y herramientas** (Este artículo)
4. [Flujos de trabajo y memoria](../mastra-workflows-memory)
````
