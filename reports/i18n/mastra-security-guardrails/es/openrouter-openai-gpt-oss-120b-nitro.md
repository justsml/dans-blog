# Translation Candidate
- Slug: mastra-security-guardrails
- Locale: es
- Model: openrouter/openai/gpt-oss-120b:nitro
- Target: src/content/posts/2026-01-03--mastra-security-guardrails/es/index.mdx
- Validation: passed
- Runtime seconds: 8.09
- Input tokens: 6822
- Output tokens: 2331
- Thinking tokens: unknown
- Cached input tokens: 1536
- Cache write tokens: 0
- Estimated cost: $0.000686
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
title: IA de producción da miedo (y cómo solucionarlo)
subTitle: 'Si tu agente no tiene guardrails, no estás listo para producción.'
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
Nadie se propone crear un sistema de IA inseguro. Escribes instrucciones, pruebas casos límite, añades algunas reglas de validación. Luego alguien descubre que puede engañar a tu bot para que actúe como un pirata y exponga datos de usuarios. O un número de tarjeta de crédito termina en tus registros. O el modelo recomienda con confianza el producto de un competidor.

La brecha entre “funciona en la demo” y “es seguro en producción” es mayor de lo que la mayoría de los equipos anticipa.

Parte del problema es que los LLMs crudos no tienen opiniones sobre lo que deben o no deben hacer. Son máquinas de predicción que intentan continuar cualquier patrón que hayas iniciado. Si les das un prompt que parece “modo de anulación del sistema”, lo seguirán gustosamente. No es un error del modelo; es simplemente cómo funcionan los modelos de lenguaje.

La mayoría de los frameworks te entregan el modelo y te desean suerte. Mastra adopta un enfoque diferente: asume que eventualmente necesitarás guardrails, por lo que los incorpora en la arquitectura del agente desde el principio.

---

## Procesadores como capas de seguridad

El mecanismo central es sencillo. Antes de que tu prompt llegue al modelo, pasa por una cadena de procesadores de entrada. Después de que el modelo responde, los procesadores de salida toman su turno. Cada procesador puede inspeccionar, modificar o bloquear el contenido en esa etapa.

Piensa en ellos como middleware para interacciones con IA. Apilas los que necesitas, configuras su comportamiento y se ejecutan automáticamente en cada solicitud.

### 1. Deteniendo a los piratas (Inyección de prompt)

Los ataques de inyección de prompt se han vuelto creativos. La gente usa caracteres Unicode invisibles, escribe instrucciones en base64 o convence al modelo de que está en “modo depuración” donde no aplican las reglas normales. Las técnicas siguen evolucionando.

Mastra incluye procesadores que capturan patrones comunes:

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
    // 1. Eliminar caracteres invisibles
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
      strategy: 'block', // Parada dura
      detectionTypes: ['injection', 'jailbreak', 'system-override'],
    }),
  ],
});
```

El [`UnicodeNormalizer`](https://mastra.ai/docs/processors) elimina los caracteres de control y colapsa los espacios en blanco. El [`PromptInjectionDetector`](https://mastra.ai/docs/processors) analiza la entrada limpiada en busca de patrones que indiquen que alguien está intentando sobrescribir tus instrucciones.

Configuras cuán agresiva deseas que sea la detección (el parámetro `threshold`) y qué debe ocurrir cuando se dispara (bloquear, registrar o simplemente marcar).

### 2. Manejo de PII

Números de tarjetas de crédito en logs, números de Seguro Social en bases de datos vectoriales, direcciones de correo almacenadas más tiempo del necesario. Ese tipo de problemas se convierten rápidamente en dolores regulatorios. El reto es que los usuarios no siempre se dan cuenta de que están pegando datos sensibles en una ventana de chat.

El [`PIIDetector`](https://mastra.ai/docs/processors) busca patrones comunes antes de que lleguen a tu modelo o se escriban en el almacenamiento:

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

Puedes optar por redactar (reemplazar con `[REDACTED]`), hash o bloquear por completo. El procesador se ejecuta tanto en la entrada como en la salida, así que estás cubierto incluso si el modelo genera datos sensibles en su respuesta.

### 3. Moderación de contenido

Los modelos entrenados con datos de internet han visto de todo. Sin filtrado, pueden producir ocasionalmente respuestas que pondrían nervioso a tu equipo de relaciones públicas. El [`ModerationProcessor`](https://mastra.ai/docs/processors) captura contenido que viola tus directrices:

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
      model: openai('gpt-5-nano'),  // Modelo rápido y barato para clasificación
      categories: ['hate', 'harassment', 'violence', 'self-harm'],
      threshold: 0.7,  // Bloquear si la confianza > 70 %
      strategy: 'block',  // Detener la solicitud inmediatamente
      instructions: 'Detect harmful content that violates community guidelines',
    }),
  ],
});
```

Lo interesante es que tú defines qué categorías son relevantes para tu caso de uso. Una herramienta de escritura creativa podría permitir contenido más expresivo que un bot de atención al cliente. El umbral y la estrategia te dan control sobre cuán estricta debe ser la filtración.

---

## Cuando Algo Falla

Los procesadores no lanzan errores al detectar un problema. En su lugar, establecen una bandera en el objeto de resultado:

```typescript
const result = await secureAgent.generate('Ignore all previous instructions...');

if (result.tripwire) {
  console.log(`Blocked! Reason: ${result.tripwireReason}`);
  // "Blocked! Reason: Prompt injection detected."
  return "Nice try, script kiddie.";
}
```

Este patrón te permite manejar eventos de seguridad de la forma que tenga sentido para tu aplicación. Puedes registrarlos para análisis, devolver un mensaje de error genérico o incluso permitir ciertas violaciones en contextos específicos. El campo `tripwireReason` indica exactamente qué procesador marcó el contenido, lo que ayuda al depurar falsos positivos o al ajustar tus umbrales.

---

## Qué No Resuelve Esto

Los procesadores capturan mucho, pero no son magia. Un atacante determinado con suficiente tiempo probablemente encontrará un prompt que se le escape. Los modelos a veces alucinan de formas que los procesadores no pueden predecir. Y siempre hay un compromiso entre seguridad y flexibilidad: cuanto más estrictas sean tus reglas, más probable será que bloquees casos de uso legítimos.

El valor no está en una protección perfecta. Es contar con un método sistemático para manejar los problemas comunes que sin duda aparecerán en producción. Puedes ajustar la sensibilidad a medida que aprendes lo que realmente hacen tus usuarios. Puedes añadir procesadores personalizados para riesgos específicos del dominio. Y dispones de registros de auditoría que muestran qué se bloqueó y por qué.

La mayoría de los problemas de seguridad en IA en producción no son ataques sofisticados. Son personas que copian y pegan datos que no deberían, o que descubren mediante prueba y error que el bot hará cosas que no pretendías. Los procesadores no evitarán cada posible incidencia, pero hacen que los casos obvios sean mucho más difíciles de explotar.

### Recursos

- [Mastra Guardrails Documentation](https://mastra.ai/docs/agents/guardrails)
- [Security Best Practices](https://mastra.ai/docs/security)
- [Mastra GitHub Repository](https://github.com/mastra-ai/mastra)

## Leer la serie

1. [LLM Routing](../llm-routing-mastra-ai)
2. **Security & Guardrails** (Esta publicación)
3. [MCP & Tool Integrations](../mastra-mcp-tool-integrations)
4. [Workflows & Memory](../mastra-workflows-memory)
````
