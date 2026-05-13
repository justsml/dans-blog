# Translation Candidate
- Slug: async-stack-traces-why-error-stack-lies-in-production
- Locale: es
- Model: openrouter/qwen/qwen3-32b:nitro
- Target: src/content/posts/2025-12-29--async-stack-traces-why-error-stack-lies-in-production/es/index.mdx
- Validation: deferred
- Runtime seconds: 9.61
- Input tokens: 4456
- Output tokens: 3655
- Thinking tokens: unknown
- Cached input tokens: 1024
- Cache write tokens: 0
- Estimated cost: $0.001234
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
title: 'Trazas de pila asincrónicas: Por qué `Error.stack` te miente'
subTitle: La cola de microtareas consumió mi tarea (y mi contexto de depuración).
date: '2025-12-29'
modified: '2025-12-30'
tags:
  - javascript
  - async
  - debugging
  - node.js
  - v8
  - performance
category: Code
subCategory: Best Practices
social_image: ../desktop-social.webp
cover_full_width: ../wide.webp
cover_mobile: ../square.webp
cover_icon: ../square.webp
---
Son las 2 AM. La alarma de PagerDuty suena a todo volumen.

Abres los registros y ves esto:

```
Error: Cannot read properties of undefined (reading 'id')
    at processTicksAndRejections (node:internal/process/task_queues:96:5)
```

Eso es todo. Ningún nombre de función. Ningún número de línea. Ninguna ruta de archivo. Solo "processTicksAndRejections".

Bienvenido al mundo de JavaScript asincrónico, donde las trazas de pila son inventadas y los números de línea no importan.

---

## ¿Por qué se rompen las trazas de pila?

En código sincrónico, la pila de llamadas es una genealogía elegante. A llamó a B, B llamó a C. Cuando C se cae, puedes ver exactamente cómo llegaste allí.

En código asincrónico (`async/await`), cada palabra clave `await` es un punto de suspensión.

Cuando usas `await`, tu función se arranca de la pila. Se mete en una cámara criogénica llamada Cola de Microtareas. La pila ahora está vacía (o haciendo algo else).

Cuando la Promesa se resuelve, tu función se descongela y se lanza de nuevo a la pila. Pero el historial ha desaparecido.

El motor no sabe quién llamó a `await` hace 500 milisegundos. Solo sabe que tiene una tarea por ejecutar.

---

## Intentos de V8 para solucionarlo

Node.js intenta ayudar. Tenemos:

1.  `Error.captureStackTrace()`: Captura la pila *en el momento de la creación*. Inútil si el error se lanza más tarde.
2.  `--async-stack-traces`: Una bandera que hace que Node.js mantenga una "pila sombra" de cadenas de promesas.
    *   El Costo: Hace que tu aplicación sea un 30 % más lenta.
    *   El Resultado: Ayuda, pero se vuelve ruidoso rápidamente.

---

## La solución real: AsyncLocalStorage

Si quieres sobrevivir en producción, deja de mirar las trazas de pila. Mira la causalidad.

Necesitamos adjuntar contexto (ID de usuario, ID de solicitud) al "hilo" de ejecución, incluso cuando salte entre la Pila y la Cola de Microtareas.

Node.js tiene una herramienta integrada para esto: `AsyncLocalStorage`.

```javascript
import { AsyncLocalStorage } from 'async_hooks';

const context = new AsyncLocalStorage();

// 1. Wrap the request
context.run({ requestId: '123' }, () => {
  // 2. Call deep async code
  await processOrder();
});

// 3. Deep inside processOrder:
async function processOrder() {
  await db.query();
  
  // Magic! We can still see the requestId
  const { requestId } = context.getStore();
  console.log(`[${requestId}] Failed to process order`);
}
```

No importa cuántos `await`s se produzcan en el medio. El contexto sobrevive.

---

## Guía de producción

1.  Deja de confiar en `err.stack`. Está incompleto por diseño.  
2.  Usa registro estructurado. Adjunta `requestId` a cada línea de registro usando `AsyncLocalStorage`.  
3.  Rastrea, no apiles. Usa OpenTelemetry. Visualiza la cadena causal entre servicios, lo que realmente te importa.  

Tu código es asíncrono. Tu contexto de depuración no debería serlo.
````
