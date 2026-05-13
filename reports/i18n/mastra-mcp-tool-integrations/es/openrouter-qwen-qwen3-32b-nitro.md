# Translation Candidate
- Slug: mastra-mcp-tool-integrations
- Locale: es
- Model: openrouter/qwen/qwen3-32b:nitro
- Target: src/content/posts/2026-01-04--mastra-mcp-tool-integrations/es/index.mdx
- Validation: passed
- Runtime seconds: 18.02
- Input tokens: 7644
- Output tokens: 7930
- Thinking tokens: unknown
- Cached input tokens: 2560
- Cache write tokens: 0
- Estimated cost: $0.002515
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
title: ''
subTitle: Por qué MCP es el USB-C de la Inteligencia Artificial
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
Has construido un agente de IA. Tal vez incluso sea bueno. Los prompts son concisos, el modelo es rápido y las respuestas parecen naturales.

Pero luego alguien le pide que verifique un registro de cliente en Salesforce. O que obtenga los tickets más recientes de Jira. O que busque en su documentación interna.

Y su agente tan bien construido simplemente... no puede.

Este es el problema de integración que cada plataforma de IA eventualmente enfrenta. Su agente necesita manos. Necesita ojos sobre sus sistemas empresariales reales. Sin ellos, solo está ejecutando un chatbot costoso.

¿La solución tradicional? Escribir un envoltorio de API personalizado para cada servicio que desee conectar. Lea sus documentaciones, maneje su autenticación, lidiar con sus límites de tasa, rezar para que no cambien sus puntos finales el próximo mes. Luego repita el proceso para el siguiente servicio. Y el siguiente.

El Protocolo de Contexto del Modelo (MCP) cambia completamente este cálculo.

## ¿Qué resuelve realmente el MCP?

Piense en el USB antes del USB-C. Tenía Mini-USB, Micro-USB, conectores propietarios de Apple y un cajón lleno de cables que solo funcionaban con dispositivos específicos. El USB-C no solo agregó un nuevo conector, sino que estableció un estándar que significaba que cualquier cable podría funcionar con cualquier dispositivo.

El MCP está haciendo lo mismo para las integraciones de herramientas de IA.

En lugar de escribir código personalizado para conectar su agente a Salesforce, HubSpot, GitHub o cualquier otro servicio, implementa el protocolo una vez (o descarga un servidor preconstruido), y cualquier agente compatible con MCP podrá comunicarse con él de inmediato.

El protocolo maneja la capa de comunicación. Solo define qué hacen sus herramientas y qué datos necesitan.

## Configuración de múltiples integraciones

Mastra tiene soporte nativo de MCP a través de su [`MCPClient`](https://mastra.ai/docs/mcp/overview). Puede conectar tanto herramientas locales (ejecutándose como procesos secundarios) como servicios remotos (ejecutándose en su propia infraestructura).

Aquí hay un ejemplo realista de configuración de producción que conecta Google Maps para rutas, un servicio meteorológico y una búsqueda local de Wikipedia:

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
    // Mapas y Navegación (Remoto/HTTP)
    googleMaps: {
      url: new URL(process.env.GOOGLE_MAPS_MCP_URL!),
      requestInit: {
        headers: {
          Authorization: `Bearer ${process.env.GOOGLE_MAPS_API_KEY}`,
        },
      },
    },
    // Integración del servicio meteorológico
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

El cliente gestiona el ciclo de vida de la conexión, maneja la generación de procesos para herramientas locales y mantiene conexiones HTTP para servidores remotos. No manipula directamente sockets ni stdio.

## Conexión de herramientas a agentes

Una vez que tienes configurado tu cliente MCP, darle esas herramientas a un agente es sencillo:

```typescript
// src/mastra/agents/navigation-agent.ts
import { Agent } from '@mastra/core/agent';
import { openai } from '@ai-sdk/openai';
import { mcpClient } from '../mcp';

export const navigationDirectionsAgent = new Agent({
  id: 'navigation-directions-agent',
  name: 'Assistant de Navegación y Direcciones',
  instructions: `Eres un asistente de navegación útil que proporciona planificación de rutas y consejos de viaje.
    - Siempre confirma el punto de inicio y el destino
    - Usa herramientas de Google Maps para encontrar rutas óptimas
    - Verifica las condiciones climáticas a lo largo de la ruta
    - Proporciona tiempos estimados de viaje y sugiere alternativas si el clima es malo
    - Incluye detalles relevantes como tráfico, condiciones de la carretera y puntos de interés
    - Mantén las respuestas claras y accionables`,
  model: openai('gpt-5'),
  tools: await mcpClient.getTools(), // <--- Esta es la línea mágica
});
```

Cuando un usuario pregunta: *"¿Cuál es la mejor ruta desde San Francisco a Lake Tahoe y debo preocuparme por el clima?"*

El agente lee las definiciones de herramientas disponibles, reconoce que tiene acceso a herramientas de enrutamiento de Google Maps y pronóstico del tiempo, las ejecuta con los parámetros correctos y responde con una ruta óptima más las condiciones climáticas actuales a lo largo del camino.

No escribiste una sola línea de código de la API de Google Maps ni integración del servicio meteorológico.

## Autenticación por usuario

Hay un error de seguridad fácil de cometer aquí: codificar credenciales de forma rígida.

Si colocas una clave de API de Google Maps en tus variables de entorno y das por terminado, cada usuario comparte el mismo límite de cuota y límite de velocidad. Más importante aún, si usas servicios que almacenan preferencias del usuario (como ubicaciones guardadas o rutas favoritas), todos verían los mismos datos. Esto funciona bien para demostraciones. Es una amenaza en producción.

Mastra maneja esto permitiéndote crear clientes MCP dinámicamente con credenciales específicas del usuario:

```typescript
async function handleUserRequest(userPrompt: string, userCredentials: UserCreds) {
  // Crea un cliente PARA ESTE usuario específico
  const userMcp = new MCPClient({
    servers: {
      googleMaps: {
        url: new URL(process.env.GOOGLE_MAPS_MCP_URL!),
        requestInit: {
          headers: {
            // API key o token específico del usuario
            Authorization: `Bearer ${userCredentials.mapsApiKey}`,
            'X-User-ID': userCredentials.userId,
          },
        },
      },
    },
  });

  const agent = mastra.getAgent('navigationDirectionsAgent');
  
  // Inyecta herramientas en tiempo de ejecución
  const response = await agent.generate(userPrompt, {
    toolsets: await userMcp.getToolsets(),
  });

  return response;
}
```

Cada usuario obtiene su propio conjunto de herramientas aislado con sus propios límites de cuota y preferencias. Las ubicaciones guardadas de Usuario A permanecen privadas, el historial de rutas de Usuario B es independiente. Este es el funcionamiento práctico de los agentes SaaS multiinquilinos.

## Construyendo herramientas compuestas

A veces necesitas combinar múltiples herramientas MCP en una sola operación. Quizás desees planificar una ruta que tenga en cuenta tanto el tráfico en tiempo real como las condiciones climáticas a lo largo del camino.

Puedes envolver las herramientas MCP en definiciones de herramientas personalizadas:

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

Esto te da un control detallado sobre cómo exactamente interactúan las herramientas, mientras aún aprovechas el protocolo MCP para las tareas más complejas.

---

## Hacia dónde conduce esto

Escribir clientes de API personalizados para cada servicio con el que tu agente de IA necesita comunicarse nunca fue sostenible. No se escala bien, tiene muchos fallos y ata tu plataforma a implementaciones específicas.

MCP no resuelve cada desafío de integración: la autenticación sigue siendo compleja, la limitación de velocidad sigue siendo relevante y no todos los servicios tienen un servidor MCP aún. Pero establece una base que hace que construir plataformas de agentes sea significativamente menos doloroso.

Si estás diseñando un sistema de IA que necesite interactuar con servicios externos, entender MCP probablemente valga tu tiempo.

### Recursos

- [Documentación de Mastra MCP](https://mastra.ai/docs/mcp/overview)
- [Registro de MCP](https://registry.modelcontextprotocol.io)
- [Klavis AI (MCP Empresarial)](https://klavis.ai)
- [Repositorio de GitHub de Mastra](https://github.com/mastra-ai/mastra)

## Leer la serie

1. [Enrutamiento de LLM](/llm-routing-mastra-ai)  
2. [Seguridad y guardarrails](/mastra-security-guardrails)  
3. **MCP y integraciones de herramientas** (Este post)  
4. [Flujos de trabajo y memoria](/mastra-workflows-memory)
````
