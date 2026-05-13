# Translation Candidate
- Slug: llm-routing-mastra-ai
- Locale: es
- Model: openrouter/qwen/qwen3-32b:nitro
- Target: src/content/posts/2026-01-02--llm-routing-mastra-ai/es/index.mdx
- Validation: passed
- Runtime seconds: 11.93
- Input tokens: 4519
- Output tokens: 4195
- Thinking tokens: unknown
- Cached input tokens: 1536
- Cache write tokens: 0
- Estimated cost: $0.001368
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
title: No te comprometas con Tu Modelo
subTitle: 'Ruteo de LLM, tan de moda'
date: '2026-01-02'
modified: '2026-01-08'
tags:
  - ai
  - llm
  - typescript
  - mastra
  - agent-orchestration
category: AI
subCategory: Engineering
social_image: ../mobile-social.webp
cover_full_width: ../wide.webp
cover_mobile: ../square.webp
cover_icon: ../square.webp
---
La mayoría de los equipos de ingeniería eligen un modelo de lenguaje y se aferran a él. Un proveedor, un modelo, todas las tareas. Es como contratar a una sola persona para que haga tu codificación, tu redacción y tus impuestos porque resultó bueno en la primera entrevista.

En cualquier momento dado, un modelo es mejor para código, otro maneja mejor contextos largos y desordenados, y otro es el caballo de batalla económico para clasificaciones simples. Los nombres cambian, pero la forma del problema no. Tratar a un modelo como si fuera excelente en todo significa que estás pagando de más por tareas sencillas o obteniendo resultados inferiores en las especializadas.

Vi a un equipo gastar miles de dólares ejecutando análisis de sentimiento a través de un modelo de $30 por millón de tokens cuando un modelo de $0.50 habría hecho el trabajo igual de bien. Formateo básico de JSON, tareas de clasificación elemental, todo pasando por su proveedor premium. Lo único que se calentaba era su factura de AWS.

Hay una mejor manera, y no es particularmente complicada.

## Delegación sobre lealtad

¿Y si pudieras enrutar solicitudes al modelo que realmente es el mejor para esa tarea específica? Usa tu modelo caro y potente para lo difícil, pero delega el parsing y formateo sencillo a algo más barato. Obten los beneficios de múltiples proveedores sin tener que manejarlos manualmente en tu base de código.

Mastra te permite construir exactamente este tipo de sistema. Configuras agentes especialistas para diferentes tipos de trabajo, y luego creas un agente enrutador que determine qué especialista debe manejar cada solicitud. Los IDs de modelo que aparecen a continuación son ejemplos, no una clasificación. Cámbialos por los modelos actuales que ganen tus evaluaciones y se ajusten a tu presupuesto.

Piénsalo así: tienes tres especialistas en tu equipo.

```typescript
// ./src/mastra/index.ts
import { Mastra } from '@mastra/core';
import { Agent } from '@mastra/core/agent';
import { openai } from '@ai-sdk/openai';
import { anthropic } from '@ai-sdk/anthropic';
import { google } from '@ai-sdk/google';

export const claudeAgent = new Agent({
  id: 'claude-agent',
  instructions: 'Eres un ingeniero experto. ¿Escribir bugs? Te despedimos.',
  model: anthropic(process.env.CODE_MODEL ?? 'claude-sonnet-4-5'),
});

export const geminiAgent = new Agent({
  id: 'gemini-agent',
  instructions: 'Eres un escritor creativo. Sé extraño.',
  model: google(process.env.LONG_CONTEXT_MODEL ?? 'gemini-3-pro-preview'),
});

export const gptAgent = new Agent({
  id: 'gpt-agent',
  instructions: 'Eres un asistente útil. Sé aburrido.',
  model: openai(process.env.GENERAL_MODEL ?? 'gpt-5.2'),
});
```

Cada uno tiene un trabajo específico. Tu agente de código debe ser el modelo que pase tus evaluaciones de codificación específicas para el repositorio. Tu agente de contexto largo debe ser el que procese tus documentos reales sin convertir su contenido en un amasijo. Tu agente general debe ser barato, confiable y aburrido de la mejor manera posible.

Aquí es donde se pone interesante. Añades un enrutador que actúe como un proxy inteligente:

```typescript
export const routerAgent = new Agent({
  id: 'router-agent',
  name: 'El Jefe',
  instructions: `Eres un enrutador inteligente.
  - Codificación -> Claude
  - Poesía -> Gemini
  - Hechos -> GPT

  No hagas el trabajo tú mismo. Delega.`,
  model: openai(process.env.ROUTER_MODEL ?? 'gpt-5-mini'), // ¡Usa un modelo barato para el enrutamiento!
  agents: {
    claudeAgent,
    geminiAgent,
    gptAgent,
  },
});

export const mastra = new Mastra({
  agents: { routerAgent, claudeAgent, geminiAgent, gptAgent },
});
```

El enrutador mismo funciona con un modelo ligero porque solo toma decisiones sobre a dónde enviar el tráfico. No estás pagando tarifas premium para decidir qué otro modelo premium usar. Mide esto también: un mal enrutador convierte silenciosamente los ahorros en rutas equivocadas.

Cuando alguien pide una implementación de ordenamiento por burbuja, el enrutador lo reconoce como un trabajo de código y se lo pasa a tu especialista en codificación. ¿Un prompt de escritura creativa? Eso va al modelo que elegiste por su voz y rango. ¿Una pregunta fáctica sobre eventos históricos? Enrútelo al agente general, idealmente con recuperación cuando la frescura o la citación sean importantes.

## Los Beneficios Prácticos

**La eficiencia en costos importa más de lo que piensas.** Un modelo de enrutamiento pequeño que toma decisiones de delegación cuesta una fracción de ejecutar cada solicitud a través de tu proveedor más caro. Con el tiempo, especialmente a gran escala, esto se traduce en ahorros reales. Solo pagas por la inteligencia de alto rendimiento cuando realmente la necesitas.

**La calidad mejora cuando emparejas modelos con tareas.** El ganador cambia cada mes, tarea y forma del prompt. Ese es el motivo por el que la capa de enrutamiento debe depender de tus evaluaciones, no de cualquier modelo que haya ganado Twitter la semana que escribiste la integración.

**La resiliencia se convierte en un beneficio secundario.** Cuando OpenAI tiene uno de sus apagones periódicos (y lo hacen), tu enrutador puede redirigir el tráfico a otros proveedores. No estás paralizado esperando a que una API específica se recupere.

Esto no es cuestión de ser ingenioso por el mero hecho de hacerlo. Se trata de construir sistemas que tengan sentido tanto financieramente como técnicamente. No usarías el mismo martillo para cada tarea de construcción, y probablemente tampoco deberías usar el mismo modelo de lenguaje para cada tarea de IA.

La belleza de este enfoque es que tu código de aplicación no cambia. Tú sigues llamando a tu agente de enrutamiento. La complejidad de decidir qué modelo usar para cada tarea vive en un solo lugar, configurado una vez, en lugar de estar dispersa por todo tu código base en un montón de lógica condicional.

### Recursos

- [Documentación de Mastra.ai](https://mastra.ai/docs)
- [Repositorio de GitHub de Mastra](https://github.com/mastra-ai/mastra)

## Lee la serie

1. **Enrutamiento de LLM** (Este post)  
2. [Seguridad y Guardarreles](../mastra-security-guardrails)  
3. [MCP e Integraciones de Herramientas](../mastra-mcp-tool-integrations)  
4. [Flujos de Trabajo y Memoria](../mastra-workflows-memory)
````
