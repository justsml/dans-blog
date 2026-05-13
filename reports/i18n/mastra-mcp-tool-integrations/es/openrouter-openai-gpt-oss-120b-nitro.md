# Translation Candidate
- Slug: mastra-mcp-tool-integrations
- Locale: es
- Model: openrouter/openai/gpt-oss-120b:nitro
- Target: src/content/posts/2026-01-04--mastra-mcp-tool-integrations/es/index.mdx
- Validation: passed
- Runtime seconds: 9.45
- Input tokens: 8324
- Output tokens: 2444
- Thinking tokens: unknown
- Cached input tokens: 2304
- Cache write tokens: 0
- Estimated cost: $0.000765
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
title: Tu agente de IA es inútil sin esto
subTitle: Por qué MCP es el USB‑C de la inteligencia artificial.
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
Has construido un agente de IA. Tal vez incluso sea bueno. Los prompts son precisos, el modelo es rápido y las respuestas suenan naturales.

Pero entonces alguien le pide que consulte Salesforce para buscar un registro de cliente. O que extraiga los tickets más recientes de Jira. O que busque en tu documentación interna.

Y tu agente impecable simplemente… no puede.

Ese es el problema de integración al que se enfrenta cualquier plataforma de IA. Tu agente necesita manos. Necesita ojos dentro de tus sistemas empresariales reales. Sin ellos, solo estás ejecutando un chatbot costoso.

¿La solución tradicional? Escribir un wrapper de API personalizado para cada servicio al que quieras conectarte. Leer su documentación, manejar su autenticación, lidiar con sus límites de velocidad y rezar para que no cambien sus endpoints el próximo mes. Luego repetir el proceso para el siguiente servicio. Y el siguiente.

El Model Context Protocol cambia este cálculo por completo.

---

## Qué Resuelve Realmente MCP

Piensa en el USB antes del USB‑C. Tenías Mini‑USB, Micro‑USB, conectores propietarios de Apple y un cajón lleno de cables que solo funcionaban con dispositivos específicos. USB‑C no solo añadió un conector nuevo; estableció un estándar que hacía que cualquier cable pudiera usarse con cualquier dispositivo.

MCP hace lo mismo para la integración de herramientas de IA.

En lugar de escribir código a medida para conectar tu agente a Salesforce, HubSpot, GitHub o cualquier otro servicio, implementas el protocolo una sola vez (o descargas un servidor preconstruido), y cualquier agente compatible con MCP puede comunicarse con él de inmediato.

El protocolo se encarga de la capa de comunicación. Tú solo defines qué hacen tus herramientas y qué datos necesitan.

---

## Configuración de Múltiples Integraciones

Mastra incluye soporte nativo para MCP a través de su [`MCPClient`](https://mastra.ai/docs/mcp/overview). Puedes conectar tanto herramientas locales (ejecutándose como procesos hijos) como servicios remotos (ejecutándose en su propia infraestructura).

A continuación se muestra una configuración de producción real que conecta Google Maps para enrutamiento, un servicio meteorológico y una búsqueda local en Wikipedia:

```typescript
// src/mastra/mcp/index.ts
import { MCPClient } from '@mastra/mcp';

export const mcpClient = new MCPClient({
  servers: {
    // Herramienta local (Stdio)
    wikipedia: {
      command: 'npx',
      args: ['-y', 'wikipedia-mcp'],
    },
    // Maps y Navegación (Remoto/HTTP)
    googleMaps: {
      url: new URL(process.env.GOOGLE_MAPS_MCP_URL!),
      requestInit: {
        headers: {
          Authorization: `Bearer ${process.env.GOOGLE_MAPS_API_KEY}`,
        },
      },
    },
    // Integración del Servicio Meteorológico
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

El cliente gestiona el ciclo de vida de la conexión, controla el lanzamiento de procesos para herramientas locales y mantiene las conexiones HTTP para servidores remotos. No necesitas manipular sockets ni stdio directamente.

---

## Conexión de Herramientas a los Agentes

Una vez que tienes tu cliente MCP configurado, proporcionar esas herramientas a un agente es directo:

```typescript
// src/mastra/agents/navigation-agent.ts
import { Agent } from '@mastra/core/agent';
import { openai } from '@ai-sdk/openai';
import { mcpClient } from '../mcp';

export const navigationDirectionsAgent = new Agent({
  id: 'navigation-directions-agent',
  name: 'Asistente de Navegación y Direcciones',
  instructions: `Eres un asistente de navegación útil que brinda planificación de rutas y consejos de viaje.
    - Siempre confirma los lugares de origen y destino
    - Usa las herramientas de Google Maps para encontrar rutas óptimas
    - Verifica las condiciones meteorológicas a lo largo de la ruta
    - Proporciona tiempos de viaje estimados y sugiere alternativas si el clima es adverso
    - Incluye detalles relevantes como tráfico, condiciones de la carretera y puntos de interés
    - Mantén las respuestas claras y accionables`,
  model: openai('gpt-5'),
  tools: await mcpClient.getTools(), // <--- Esta es la línea mágica
});
```

Cuando un usuario pregunta: *"¿Cuál es la mejor ruta de San Francisco a Lake Tahoe, y debería preocuparme por el clima?"*

El agente lee las definiciones de herramientas disponibles, se da cuenta de que tiene acceso a las herramientas de enrutamiento de Google Maps y de pronóstico del tiempo, las ejecuta con los parámetros correctos y responde con una ruta óptima más las condiciones meteorológicas actuales a lo largo del camino.

No escribiste ni una sola línea de código de la API de Google Maps ni de integración con el servicio meteorológico.

## Autenticación por Usuario

Hay un error de seguridad que es fácil cometer aquí: codificar credenciales en el código.

Si colocas una única clave de API de Google Maps en tus variables de entorno y das por terminado el proceso, todos los usuarios comparten la misma cuota y los mismos límites de velocidad. Más importante aún, si utilizas servicios que almacenan preferencias de usuario (como ubicaciones guardadas o rutas favoritas), todos verían los mismos datos. Esto funciona bien para demostraciones, pero es una responsabilidad en producción.

Mastra lo gestiona permitiéndote crear clientes MCP de forma dinámica con credenciales específicas de cada usuario:

```typescript
async function handleUserRequest(userPrompt: string, userCredentials: UserCreds) {
  // Crear un cliente para ESTE usuario específico
  const userMcp = new MCPClient({
    servers: {
      googleMaps: {
        url: new URL(process.env.GOOGLE_MAPS_MCP_URL!),
        requestInit: {
          headers: {
            // Clave de API o token específico del usuario
            Authorization: `Bearer ${userCredentials.mapsApiKey}`,
            'X-User-ID': userCredentials.userId,
          },
        },
      },
    },
  });

  const agent = mastra.getAgent('navigationDirectionsAgent');
  
  // Inyectar herramientas en tiempo de ejecución
  const response = await agent.generate(userPrompt, {
    toolsets: await userMcp.getToolsets(),
  });

  return response;
}
```

Cada usuario obtiene su propio conjunto de herramientas aislado, con sus cuotas de API y preferencias individuales. Las ubicaciones guardadas del Usuario A permanecen privadas, el historial de rutas del Usuario B está separado. Así es como los agentes SaaS multi‑inquilino funcionan en la práctica.

## Construcción de Herramientas Compuestas

A veces es necesario combinar varias herramientas MCP en una única operación. Tal vez quieras planificar una ruta que tenga en cuenta tanto el tráfico en tiempo real como las condiciones meteorológicas a lo largo del camino.

Puedes envolver las herramientas MCP en definiciones de herramienta personalizadas:

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

Esto te brinda un control granular sobre cómo interactúan exactamente las herramientas, sin dejar de aprovechar el protocolo MCP para la mayor parte del trabajo pesado.

---

## Hacia Dónde Conduce Esto

Escribir clientes API personalizados para cada servicio con el que tu agente de IA necesita comunicarse nunca fue sostenible. Escala mal, se rompe con frecuencia y ata tu plataforma a implementaciones específicas.

MCP no resuelve todos los retos de integración: la autenticación sigue siendo compleja, la limitación de velocidad sigue siendo relevante y no todos los servicios disponen aún de un servidor MCP. Pero establece una base que hace que construir plataformas de agentes sea considerablemente menos doloroso.

Si estás diseñando un sistema de IA que debe interactuar con servicios externos, comprender MCP probablemente valga tu tiempo.

### Recursos

- [Mastra MCP Documentation](https://mastra.ai/docs/mcp/overview)
- [MCP Registry](https://registry.modelcontextprotocol.io)
- [Klavis AI (Enterprise MCP)](https://klavis.ai)
- [Mastra GitHub Repository](https://github.com/mastra-ai/mastra)

## Lee la serie

1. [Enrutamiento LLM](../llm-routing-mastra-ai)  
2. [Seguridad y Guardrails](../mastra-security-guardrails)  
3. **MCP y Integraciones de Herramientas** (Esta publicación)  
4. [Flujos de trabajo y Memoria](../mastra-workflows-memory)
````
