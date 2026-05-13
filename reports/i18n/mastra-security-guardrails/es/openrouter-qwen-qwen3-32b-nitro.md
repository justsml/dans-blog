# Translation Candidate
- Slug: mastra-security-guardrails
- Locale: es
- Model: openrouter/qwen/qwen3-32b:nitro
- Target: src/content/posts/2026-01-03--mastra-security-guardrails/es/index.mdx
- Validation: passed
- Runtime seconds: 59.72
- Input tokens: 6460
- Output tokens: 5730
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- Estimated cost: $0.001892
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
title: La IA en producción es aterradora (Y cómo solucionarlo)
subTitle: 'Si tu agente no tiene barreras de seguridad, no estás listo para producción.'
date: '2026-01-03'
modified: '2026-01-08'
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
Nadie se propone construir un sistema de IA inseguro. Escribe instrucciones, pruebas casos extremos, agrega unas pocas reglas de validación. Luego alguien descubre que puede engañar a tu bot para que interprete el papel de un pirata y exponga datos de usuario. O un número de tarjeta de crédito acaba en tus registros. O el modelo recomienda con confianza un producto de un competidor.

La brecha entre "funciona en la demostración" y "es seguro en producción" es más amplia de lo que la mayoría de los equipos espera.

Parte del problema es que las LLMs en bruto no tienen opiniones sobre lo que deberían o no deberían hacer. Son máquinas de predicción que intentan continuar cualquier patrón que hayas iniciado. Dales un prompt que parezca "modo de anulación del sistema", y estarán encantados de seguir el juego. Esto no es un error en el modelo; simplemente es así como funcionan los modelos de lenguaje.

La mayoría de los marcos te entregan el modelo y te desean suerte. Mastra toma un enfoque diferente: asume que necesitarás límites de seguridad eventualmente, por lo que los integra en la arquitectura del agente desde el principio.

## Procesadores como capas de seguridad

El mecanismo principal es sencillo. Antes de que tu prompt llegue al modelo, pasa por una cadena de procesadores de entrada. Después de que el modelo responde, los procesadores de salida toman su turno. Cada procesador puede inspeccionar, modificar o bloquear el contenido en esa etapa.

Piensa en ellos como middleware para interacciones con IA. Apilas los que necesites, configuras su comportamiento y se ejecutan automáticamente en cada solicitud.

### 1. Deteniendo a los piratas (inyección de prompts)

Los ataques de inyección de prompts han evolucionado. Las personas usan caracteres Unicode invisibles, escriben instrucciones en base64 o convencen al modelo de que está en "modo depuración" donde las reglas normales no aplican. Las técnicas siguen evolucionando.

Mastra incluye procesadores que detectan patrones comunes:

```typescript
// src/mastra/agents/secure-agent.ts
import { Agent } from '@mastra/core/agent';
import { PromptInjectionDetector, UnicodeNormalizer } from '@mastra/core/processors';
import { openai } from '@ai-sdk/openai';

export const secureAgent = new Agent({
  id: 'fortress-assistant',
  name: 'fortress-assistant',
  instructions: 'You are a secure assistant.',
  model: openai('gpt-5'),
  inputProcessors: [
    // 1. Eliminar caracteres de control
    new UnicodeNormalizer({
      id: 'unicode-normalizer',
      stripControlChars: true,
      collapseWhitespace: true,
    }),
    // 2. Detectar el intento
    new PromptInjectionDetector({
      id: 'prompt-injection-detector',
      model: openai('gpt-5-nano'), // Barato, rápido
      threshold: 0.8,
      strategy: 'block', // Detenerse firmemente
      detectionTypes: ['injection', 'jailbreak', 'system-override'],
    }),
  ],
});
```

El [`UnicodeNormalizer`](../docs/processors) elimina caracteres de control y colapsa espacios en blanco. El [`PromptInjectionDetector`](../docs/processors) analiza la entrada limpia en busca de patrones que sugieran que alguien intenta anular tus instrucciones.

Especifica qué tan agresiva quieres que sea la detección (el parámetro `threshold`) y qué debe ocurrir cuando se active (bloquear, registrar o simplemente marcarlo).

### 2. Manejo de PII

Números de tarjeta de crédito en los registros, números de Seguro Social en bases de datos vectoriales, direcciones de correo electrónico almacenadas más tiempo del necesario. Estos son los tipos de problemas que derivan en complicaciones regulatorias. El desafío es que los usuarios no siempre se dan cuenta de que están pegando datos sensibles en una ventana de chat.

El [`PIIDetector`](../docs/processors) escanea patrones comunes antes de que lleguen a tu modelo o se escriban en el almacenamiento:

```typescript
import { PIIDetector } from '@mastra/core/processors';

export const privateAgent = new Agent({
  id: 'privacy-first-assistant',
  name: 'privacy-first-assistant',
  instructions: 'You are a helpful assistant that never stores personal information.',
  model: openai('gpt-5'),
  inputProcessors: [
    new PIIDetector({
      id: 'pii-detector',
      model: openai('gpt-5-nano'),
      detectionTypes: ['email', 'phone', 'credit-card', 'ssn'],
      threshold: 0.6,
      strategy: 'redact',
      redactionMethod: 'mask',  // Replace with [REDACTED]
      instructions: 'Detect and mask personally identifiable information',
    }),
  ],
});
```

Puedes elegir redactar (reemplazar con `[REDACTED]`), hashear o bloquear por completo. El procesador se ejecuta tanto en la entrada como en la salida, por lo que estás cubierto incluso si el modelo genera accidentalmente datos sensibles en su respuesta.

### 3. Moderación de contenido

Los modelos entrenados en datos de internet han visto algunas cosas. Sin filtrado, ocasionalmente pueden producir respuestas que pondrían nerviosa a tu equipo de comunicación. El [`ModerationProcessor`](../docs/processors) detecta contenido que viole tus directrices:

```typescript
import { ModerationProcessor } from '@mastra/core/processors';

export const moderatedAgent = new Agent({
  id: 'safe-assistant',
  name: 'safe-assistant',
  instructions: 'You are a helpful assistant for a community platform.',
  model: openai('gpt-5'),
  inputProcessors: [
    new ModerationProcessor({
      id: 'moderation-processor',
      model: openai('gpt-5-nano'),  // Fast, cheap model for classification
      categories: ['hate', 'harassment', 'violence', 'self-harm'],
      threshold: 0.7,  // Block if confidence > 70%
      strategy: 'block',  // Stop the request immediately
      instructions: 'Detect harmful content that violates community guidelines',
    }),
  ],
});
```

Lo interesante es que tú defines qué categorías son relevantes para tu caso de uso. Una herramienta de escritura creativa podría permitir más libertad expresiva que un bot de servicio al cliente. El umbral y la estrategia te dan control sobre qué tan estricto debe ser el filtrado.

---

## Cuando se activan los disparadores

Los procesadores no lanzan errores cuando detectan un problema. En su lugar, establecen una bandera en el objeto de resultado:

```typescript
const result = await secureAgent.generate('Ignore all previous instructions...');

if (result.tripwire) {
  console.log(`Bloqueado! Razón: ${result.tripwireReason}`);
  // "Bloqueado! Razón: Prompt injection detected."
  return "Buena prueba, novato de scripts.";
}
```

Este patrón te permite manejar los eventos de seguridad de la forma que mejor se ajuste a tu aplicación. Podrías registrarlos para análisis, devolver un mensaje de error genérico o incluso permitir ciertas violaciones en contextos específicos. El campo `tripwireReason` te indica exactamente qué procesador marcó el contenido, lo que facilita la depuración de falsos positivos o la sintonización de tus umbrales.

## Lo que esto no resuelve

Los procesadores capturan mucho, pero no son magia. Un atacante determinado con suficiente tiempo probablemente pueda encontrar un prompt que pase desapercibido. Los modelos a veces generan fantasías de maneras que los procesadores no pueden predecir. Y siempre existe un equilibrio entre seguridad y flexibilidad: mientras más estrictas sean tus reglas, más probable será que bloques casos de uso legítimos.

El valor no es una protección perfecta. Es tener un método sistemático para manejar los problemas comunes que definitivamente surgirán en producción. Puedes ajustar la sensibilidad a medida que aprendas qué hacen realmente tus usuarios. Puedes agregar procesadores personalizados para riesgos específicos de tu dominio. Y tendrás registros de auditoría mostrando qué se bloqueó y por qué.

La mayoría de los problemas de seguridad en IA de producción no son ataques sofisticados. Son personas copiando y pegando datos que no deberían, o descubriendo mediante prueba y error que el bot hará cosas que no tenías previstas. Los procesadores no detendrán cada posible problema, pero hacen que los obvios sean mucho más difíciles de explotar.	

### Recursos

- [Documentación de Guardrails de Mastra](https://mastra.ai/docs/agents/guardrails)  
- [Mejores Prácticas de Seguridad](https://mastra.ai/docs/security)  
- [Repositorio de GitHub de Mastra](https://github.com/mastra-ai/mastra)  

## Lee la serie  

1. [Enrutamiento de LLM](../llm-routing-mastra-ai)  
2. **Seguridad y Guardrails** (Este Post)  
3. [MCP e Integraciones de Herramientas](../mastra-mcp-tool-integrations)  
4. [Flujos de Trabajo y Memoria](../mastra-workflows-memory)
````
