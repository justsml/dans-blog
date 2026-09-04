# Translation Candidate
- Slug: mastra-security-guardrails
- Locale: es
- Model: openrouter/deepseek/deepseek-v4-flash
- Target: src/content/posts/2026-01-03--mastra-security-guardrails/es/index.mdx
- Validation: deferred
- Runtime seconds: 49.73
- Input tokens: 4865
- Output tokens: 5833
- Thinking tokens: unknown
- Cached input tokens: 2048
- Cache write tokens: 0
- Estimated cost: $0.002033
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
title: La IA en producción es aterradora (y cómo solucionarlo)
subTitle: 'Si tu agente no tiene barreras de seguridad, no estás listo para producción.'
modified: '2026-09-04'
tags:
  - ai
  - security
  - mastra
  - guardrails
  - privacy
  - pii
category: AI
subCategory: Security
social_image: ../desktop-social.webp
cover_full_width: ../wide.webp
cover_mobile: ../square.webp
cover_icon: ../square.webp
---
Nadie se propone construir un sistema de IA inseguro. Escribes instrucciones, pruebas casos extremos, añades algunas reglas de validación. Luego alguien descubre que puede engañar a tu bot para que interprete el papel de un pirata y exponga datos de usuarios. O un número de tarjeta de crédito termina en tus registros. O el modelo recomienda con confianza un producto de la competencia.

La brecha entre "funciona en el demo" y "es seguro en producción" es más amplia de lo que la mayoría de los equipos esperan.

Parte del problema es que los LLM en bruto no tienen opiniones sobre lo que deberían o no deberían hacer. Son máquinas de predicción que intentan continuar cualquier patrón que hayas iniciado. Dales un prompt que parezca "modo de anulación del sistema" y felizmente seguirán el juego. Esto no es un error del modelo; es simplemente cómo funcionan los modelos de lenguaje.

La mayoría de los frameworks te entregan el modelo y te desean suerte. Mastra adopta un enfoque diferente: asume que eventualmente necesitarás barreras de seguridad, así que las incorpora en la arquitectura del agente desde el principio.

---

## Procesadores como capas de seguridad

El mecanismo central es directo. Antes de que tu prompt llegue al modelo, pasa por una cadena de procesadores de entrada. Después de que el modelo responde, los procesadores de salida toman su turno. Cada procesador puede inspeccionar, modificar o bloquear el contenido en esa etapa.

Piénsalo como middleware para interacciones con IA. Apilas los que necesitas, configuras su comportamiento y se ejecutan automáticamente en cada solicitud.

### 1. Deteniendo a los piratas (Inyección de instrucciones)

Los ataques de inyección de instrucciones se han vuelto creativos. La gente usa caracteres Unicode invisibles, escribe instrucciones en base64 o convence al modelo de que está en "modo depuración" donde las reglas normales no aplican. Las técnicas siguen evolucionando.

Mastra incluye procesadores que detectan patrones comunes:

```typescript
// src/mastra/agents/secure-agent.ts
import { Agent } from '@mastra/core/agent';
import { PromptInjectionDetector, UnicodeNormalizer } from '@mastra/core/processors';

const GUARDRAIL_MODEL = 'openrouter/openai/gpt-oss-safeguard-20b';

export const secureAgent = new Agent({
  id: 'fortress-assistant',
  name: 'fortress-assistant',
  instructions: 'Eres un asistente seguro.',
  model: 'openai/gpt-5.5',
  inputProcessors: [
    // 1. Scrub invisible characters
    new UnicodeNormalizer({
      stripControlChars: true,
      collapseWhitespace: true,
    }),
    // 2. Detect the attempt
    new PromptInjectionDetector({
      model: GUARDRAIL_MODEL,
      threshold: 0.8,
      strategy: 'block', // Hard stop
      detectionTypes: ['injection', 'jailbreak', 'system-override'],
      lastMessageOnly: true,
    }),
  ],
});
```

El [`UnicodeNormalizer`](https://mastra.ai/reference/processors/unicode-normalizer) elimina los caracteres de control y colapsa los espacios en blanco. El [`PromptInjectionDetector`](https://mastra.ai/reference/processors/prompt-injection-detector) analiza la entrada limpia en busca de patrones que sugieran que alguien intenta anular tus instrucciones.

Configuras qué tan agresiva quieres que sea la detección (el parámetro `threshold`) y qué debería suceder cuando se active (`block`, `warn`, `filter` o `rewrite`).

### 2. Manejo de información personal identificable (PII)

Números de tarjetas de crédito en registros, números de seguro social en bases de datos vectoriales, direcciones de correo electrónico almacenadas más tiempo del necesario. Este es el tipo de problemas que se convierten en problemas regulatorios. El desafío es que los usuarios no siempre se dan cuenta de que están pegando datos sensibles en una ventana de chat.

El [`PIIDetector`](https://mastra.ai/reference/processors/pii-detector) escanea en busca de patrones comunes antes de que lleguen a tu modelo o se escriban en almacenamiento:

```typescript
import { Agent } from '@mastra/core/agent';
import { BatchPartsProcessor, PIIDetector } from '@mastra/core/processors';

export const privateAgent = new Agent({
  id: 'privacy-first-assistant',
  name: 'privacy-first-assistant',
  instructions: 'Eres un asistente servicial que nunca almacena información personal.',
  model: 'openai/gpt-5.5',
  inputProcessors: [
    new PIIDetector({
      model: GUARDRAIL_MODEL,
      detectionTypes: ['email', 'phone', 'credit-card', 'ssn'],
      threshold: 0.6,
      strategy: 'redact',
      redactionMethod: 'mask',
      instructions: 'Detectar y enmascarar información personal identificable',
      lastMessageOnly: true,
    }),
  ],
  outputProcessors: [
    new BatchPartsProcessor({ batchSize: 10 }),
    new PIIDetector({
      model: GUARDRAIL_MODEL,
      strategy: 'redact',
      redactionMethod: 'mask',
    }),
  ],
});
```

Puedes optar por eliminar, hashear, reemplazar con marcadores de posición tipificados o bloquear por completo. `PIIDetector` es un procesador híbrido: colócalo en `inputProcessors`, `outputProcessors` o ambos según dónde esté el riesgo. Para salida en streaming, agrupa fragmentos antes de ejecutar clasificadores más pesados para no pagar por una verificación LLM separada en cada pequeña gota de tokens.

### 3. Moderación de contenido

### 3. Moderación de contenido

Los modelos entrenados con datos de internet han visto de todo. Sin filtrado, pueden generar respuestas que pondrían nervioso a tu equipo de relaciones públicas. El [`ModerationProcessor`](https://mastra.ai/reference/processors/moderation-processor) detecta contenido que infringe tus directrices:

```typescript
import { Agent } from '@mastra/core/agent';
import { BatchPartsProcessor, ModerationProcessor } from '@mastra/core/processors';

export const moderatedAgent = new Agent({
  id: 'safe-assistant',
  name: 'safe-assistant',
  instructions: 'You are a helpful assistant for a community platform.',
  model: 'openai/gpt-5.5',
  inputProcessors: [
    new ModerationProcessor({
      model: GUARDRAIL_MODEL,
      categories: ['hate', 'harassment', 'violence', 'self-harm'],
      threshold: 0.7,
      strategy: 'block',
      instructions: 'Detect harmful content that violates community guidelines',
      lastMessageOnly: true,
    }),
  ],
  outputProcessors: [
    new BatchPartsProcessor({ batchSize: 10 }),
    new ModerationProcessor({
      model: GUARDRAIL_MODEL,
      categories: ['hate', 'harassment', 'violence', 'self-harm'],
      strategy: 'filter',
      chunkWindow: 1,
    }),
  ],
});
```

Lo interesante es que tú defines qué categorías importan para tu caso de uso. Una herramienta de escritura creativa podría permitir contenido más expresivo que un bot de atención al cliente. El umbral y la estrategia te dan control sobre cuán estricto debe ser el filtrado.

---

## Cuando algo se dispara

Cuando un procesador usa la estrategia `block`, Mastra aborta la generación y expone el evento como metadatos de tripwire. Con `generate()`, revisa el objeto de resultado:

```typescript
const result = await secureAgent.generate('Ignore all previous instructions...');

if (result.tripwire) {
  console.log(`Blocked by ${result.tripwire.processorId}`);
  console.log(`Reason: ${result.tripwire.reason}`);
  // "Blocked! Reason: Prompt injection detected."
  return 'Request blocked by policy.';
}
```

Para llamadas en streaming, escucha los fragmentos `tripwire` en `fullStream`. Este patrón te permite manejar los eventos de seguridad como mejor se adapte a tu aplicación. Puedes registrarlos para análisis, devolver un mensaje de error genérico o cambiar un caso de bajo riesgo de `block` a `warn` mientras ajustas los umbrales. Los campos `processorId` y `reason` te indican qué procesador marcó el contenido, lo que ayuda al depurar falsos positivos.

---

## Lo que esto no resuelve

Los procesadores detectan muchas cosas, pero no son magia. Un atacante determinado con suficiente tiempo probablemente encontrará un prompt que se cuele. Los modelos ocasionalmente alucinan de formas que los procesadores no pueden predecir. Y siempre hay un equilibrio entre seguridad y flexibilidad: cuanto más estrictas sean tus reglas, más probable es que bloquees casos de uso legítimos.

El valor no está en una protección perfecta. Está en tener una forma sistemática de manejar los problemas comunes que sin duda surgirán en producción. Puedes ajustar la sensibilidad a medida que aprendes lo que realmente hacen tus usuarios. Puedes añadir procesadores personalizados para riesgos específicos del dominio. Y puedes conectar callbacks de violaciones, logs, trazas y registros de auditoría a nivel de aplicación alrededor del mismo punto de control.

La mayoría de los problemas de seguridad en IA en producción no son ataques sofisticados. Son personas copiando y pegando datos que no deberían, o descubriendo mediante prueba y error que el bot hará cosas que no pretendías. Los procesadores no detendrán todos los problemas posibles, pero hacen que los obvios sean mucho más difíciles.

### Recursos

- [Documentación de Guardrails de Mastra](https://mastra.ai/docs/agents/guardrails)
- [Documentación de Procesadores de Mastra](https://mastra.ai/docs/agents/processors)
- [Aprobación de Agentes de Mastra](https://mastra.ai/docs/agents/agent-approval)
- [Repositorio de Mastra en GitHub](https://github.com/mastra-ai/mastra)

## Lee la serie

1. [Enrutamiento de LLM](/llm-routing-mastra-ai)
2. **Seguridad y Guardrails (Este artículo)**
3. [MCP e Integraciones de Herramientas](/mastra-mcp-tool-integrations)
4. [Flujos de Trabajo y Memoria](/mastra-workflows-memory)
````
