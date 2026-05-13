# Translation Candidate
- Slug: mastra-workflows-memory
- Locale: es
- Model: openrouter/openai/gpt-oss-120b:nitro
- Target: src/content/posts/2026-01-05--mastra-workflows-memory/es/index.mdx
- Validation: passed
- Runtime seconds: 4.44
- Input tokens: 8275
- Output tokens: 2906
- Thinking tokens: unknown
- Cached input tokens: 4224
- Cache write tokens: 0
- Estimated cost: $0.000846
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
title: 'Deja de crear agentes frágiles: usa flujos de trabajo y memoria'
subTitle: Patrones determinísticos para modelos no determinísticos.
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
Los LLM tienen una propiedad extraña: son brillantes para comprender matices pero terribles para seguir recetas. Si le das a GPT‑4 un problema vago, razonará sobre distintas posibilidades. Si le das una secuencia precisa de pasos, puede saltarse el paso 3 porque el paso 5 “le pareció más relevante”.

Esto no es un error del modelo. Es una característica fundamental de los sistemas probabilísticos que intentan resolver problemas determinísticos.

He visto a equipos luchar contra este desajuste. Construyen un agente para gestionar reembolsos a clientes, le dan una docena de herramientas y esperan que ejecute de forma fiable un proceso de negocio. A veces funciona perfectamente. A veces alucina aprobaciones que nunca ocurrieron. A veces se queda atascado pidiendo la misma información tres veces.

La solución no son mejores prompts. Es saber cuándo dejar de pedirle al LLM que “piense” y empezar a indicarle que “obedezca”.

---

## Cuando lo determinista supera lo creativo

Piense en lo que ocurre cuando necesita procesar un ticket de soporte. La lógica empresarial real se parece a esto:

1. Obtener los detalles del ticket de la base de datos
2. Verificar si el usuario es elegible para un reembolso (reglas de política)
3. Confirmar que la transacción exista y que no se haya reembolsado ya
4. Calcular el monto del reembolso
5. Procesar la reversión del pago
6. Actualizar el estado del ticket
7. Enviar el correo de confirmación

Podría delegar esto a un LLM como un ejercicio de llamada a herramientas. En mi experiencia, eso es pedir problemas. El modelo podría decidir que los pasos 2 y 3 son “básicamente lo mismo” y omitir uno. O podría procesar el reembolso antes de comprobar la elegibilidad porque el usuario parecía molesto.

Los flujos de trabajo existen precisamente para este escenario. No son emocionantes, pero ese es el objetivo.

### Construyendo un Planificador de Actividades basado en el Clima

A continuación se muestra un ejemplo práctico que ilustra el patrón. Necesitamos datos meteorológicos duros y fácticos combinados con sugerencias creativas de actividades. La obtención del clima nunca debe ser creativa, pero las sugerencias sí deben ser.

```typescript
// src/mastra/workflows/activity-planner.ts
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

El LLM nunca interactúa con la API del clima. Recibe datos de verdad como entrada y luego hace lo que realmente le corresponde: ofrecer sugerencias contextuales. Si inviertes el flujo y dejas que el agente obtenga los datos meteorológicos, acabarás con un pronóstico soleado cuando en realidad está lloviendo.

**Cuándo considerar flujos de trabajo:**
- Tienes una secuencia conocida de pasos que deben ejecutarse en orden
- Necesitas observabilidad en cada etapa (registros, métricas, tiempos)
- Requieres lógica de reintentos para APIs externas poco fiables
- Las reglas de negocio no pueden “interpretarse”; deben cumplirse exactamente

---

## El Problema de la Ventana de Contexto del que Nadie Habla

Hay un patrón que sigo viendo. Alguien construye un chatbot. Funciona genial en pruebas. Luego, en producción, los usuarios mantienen conversaciones más largas y de repente el bot se pierde.

El desarrollador revisa los registros y se da cuenta de que está enviando todo el historial de la conversación con cada solicitud. Los 47 mensajes completos. Está quemando tokens y espacio de contexto con información que, en su mayor parte, es irrelevante.

Peor aún, existe un fenómeno que los investigadores denominan “perdido en el medio”, donde los modelos rinden peor cuando la información relevante está enterrada en un contexto extenso. El modelo literalmente no puede ver el bosque por los árboles.

Enviar todo el historial de la conversación parece seguro. Le das al modelo “toda la información”. Pero en realidad le estás dificultando enfocarse en lo que importa.

### Memoria de trabajo vs. almacenamiento a largo plazo

El sistema de memoria de Mastra te brinda ambos. La memoria de trabajo mantiene los mensajes recientes dentro de la ventana de contexto. La recuperación semántica busca en los mensajes históricos cuando la consulta actual parece estar relacionada.

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

Así es como se traduce en la práctica. Un usuario pregunta: “¿Cuál era el restaurante italiano que recomendaste el mes pasado?”

Sin recuperación semántica, el agente solo ve los últimos 20 mensajes. La recomendación del restaurante estaba en el mensaje 487 de 506. Ya no está. El agente responde: “No dispongo de esa información.”

Con recuperación semántica:
1. La consulta se incrusta: `[0.234, -0.567, 0.891, ...]`
2. La incrustación se compara con los mensajes históricos
3. El mensaje 487 ("Recomendaría Trattoria Bella – su carbonara es increíble") obtiene una similitud de 0.89
4. Ese mensaje se inyecta en el contexto actual
5. El agente responde: "Recomendé Trattoria Bella. Su carbonara es lo que llamó mi atención."

El agente parece tener memoria perfecta mientras solo usa una fracción de la ventana de contexto. No es solo una ingeniería ingeniosa; es funcionalmente necesario una vez que las conversaciones se extienden más allá de unas pocas docenas de mensajes.

---

## Coordinación a través de redes de agentes

A veces se necesita tanto estructura como flexibilidad. Los flujos de trabajo puros son demasiado rígidos. Los agentes puros son demasiado impredecibles.

Las redes de agentes te proporcionan un coordinador que decide qué agente especializado o flujo de trabajo invocar según la tarea. Piensa en ello como un balanceador de carga inteligente para capacidades de IA.

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

Al consultar esta red, el coordinador analiza la solicitud y la enruta según corresponda:
- “Necesito datos sobre X” activa el agente de investigación
- “Planifica un fin de semana en Seattle” ejecuta el flujo de trabajo de planificación de actividades
- “Redacta un informe sobre Y” involucra al agente de escritura

Este patrón escala mejor que intentar empaquetar todo en un único mega‑agente. Los agentes especializados desarrollan experiencia focalizada. El coordinador se encarga del enrutamiento. Cada pieza hace lo que mejor sabe hacer.

---

## Juntándolo Todo

Los sistemas de IA en producción requieren arquitectura, no solo indicaciones. Estás construyendo sistemas distribuidos donde algunos nodos resultan ser LLMs.

Los flujos de trabajo te brindan garantías cuando necesitas que las cosas ocurran exactamente como deben. La memoria te proporciona contexto sin agotar tu presupuesto de tokens. Las redes de agentes te permiten componer complejidad a partir de partes más simples.

Nadiedice que esto sea glamoroso. Pero después de ver fallar en producción suficientes “agentes totalmente autónomos”, he llegado a valorar la fiabilidad aburrida sobre la imprevisibilidad emocionante.

Los resultados pueden variar, pero en mi experiencia, los sistemas que realmente se entregan y permanecen en funcionamiento son los que tratan a los LLMs como componentes dentro de una arquitectura más amplia, en lugar de cajas mágicas que lo resuelven todo.

### Recursos

- [Documentación de Mastra Workflows](https://mastra.ai/docs/workflows/overview)
- [Documentación de Mastra Memory](https://mastra.ai/docs/memory/overview)
- [Código de la Demo Completa](https://github.com/justsml/mastra-examples)

## Lee la Serie

1. [LLM Routing](../llm-routing-mastra-ai)
2. [Seguridad y Guardrails](../mastra-security-guardrails)
3. [MCP e Integraciones de Herramientas](../mastra-mcp-tool-integrations)
4. **Workflows y Memory** (Esta publicación)
````
