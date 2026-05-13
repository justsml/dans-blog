# Translation Candidate
- Slug: async-stack-traces-why-error-stack-lies-in-production
- Locale: es
- Model: openrouter/openai/gpt-oss-120b:nitro
- Target: src/content/posts/2025-12-29--async-stack-traces-why-error-stack-lies-in-production/es/index.mdx
- Validation: passed
- Runtime seconds: 5.25
- Input tokens: 4621
- Output tokens: 879
- Thinking tokens: unknown
- Cached input tokens: 1280
- Cache write tokens: 0
- Estimated cost: $0.000338
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
title: 'Rastros de pila asíncronos: por qué `Error.stack` te miente'
subTitle: La cola de microtareas se comió mi tarea (y mi contexto de depuración).
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
Son las 2 a.m. La alarma de PagerDuty está sonando.

Abres los registros y ves esto:

```
Error: Cannot read properties of undefined (reading 'id')
    at processTicksAndRejections (node:internal/process/task_queues:96:5)
```

Eso es todo. No hay nombre de función. No hay número de línea. No hay ruta de archivo. Sólo “processTicksAndRejections”.

Bienvenido a JavaScript asíncrono, donde los rastros de pila son inventados y los números de línea no importan.

---

## Por qué se rompen los rastros de pila

En el código sincrónico, la pila de llamadas es una genealogía clara: A llama a B, B llama a C. Cuando C falla, puedes ver exactamente cómo llegaste allí.

En el código asíncrono (`async/await`), cada palabra clave `await` es un punto de suspensión.

Al hacer `await`, tu función se separa de la pila. Se coloca en un congelador criogénico llamado Cola de Microtareas. La pila queda vacía (o ejecutando otra cosa).

Cuando la promesa se resuelve, tu función se descongela y se vuelve a colocar en la pila. Pero el historial se ha perdido.

El motor no tiene idea de quién llamó a `await` hace 500 milisegundos. Sólo sabe que tiene una tarea que ejecutar.

## Los intentos de V8 de arreglarlo

Node.js intenta ayudar. Tenemos:

1. `Error.captureStackTrace()`: Captura la pila *en el momento de la creación*. Es inútil si el error se lanza después.
2. `--async-stack-traces`: Una bandera que hace que Node.js mantenga una “pila sombra” de cadenas de promesas.  
   * **Costo:** Hace que tu aplicación sea un 30 % más lenta.  
   * **Resultado:** Ayuda, pero el ruido crece rápido.

---

## La solución real: AsyncLocalStorage

Si quieres sobrevivir en producción, deja de mirar los rastros de pila. Observa la causalidad.

Necesitamos adjuntar contexto (ID de usuario, ID de solicitud) al “hilo” de ejecución, incluso cuando salta entre la pila y la cola de micro‑tareas.

Node.js incluye una herramienta nativa para esto: `AsyncLocalStorage`.

```javascript
import { AsyncLocalStorage } from 'async_hooks';

const context = new AsyncLocalStorage();

// 1. Envuelve la solicitud
context.run({ requestId: '123' }, () => {
  // 2. Llama a código async profundo
  await processOrder();
});

// 3. Muy dentro de processOrder:
async function processOrder() {
  await db.query();
  
  // ¡Magia! Todavía podemos ver el requestId
  const { requestId } = context.getStore();
  console.log(`[${requestId}] Failed to process order`);
}
```

No importa cuántos `await` haya entre medio. El contexto sobrevive.

---

## Guía de producción

1. Deja de confiar en `err.stack`. Está incompleto por diseño.  
2. Usa registro estructurado. Adjunta `requestId` a cada línea de log mediante `AsyncLocalStorage`.  
3. Traza, no apiles. Usa OpenTelemetry. Visualiza la cadena causal entre servicios, que es lo que realmente te importa.

Tu código es async. Tu contexto de depuración no debería serlo.
````
