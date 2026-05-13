# Translation Candidate
- Slug: async-stack-traces-why-error-stack-lies-in-production
- Locale: es
- Model: openrouter/qwen/qwen3-32b:nitro
- Target: src/content/posts/2025-12-29--async-stack-traces-why-error-stack-lies-in-production/es/index.mdx
- Validation: rejected: direct AI SDK translation failed
- Runtime seconds: 9.61
- Input tokens: 4456
- Output tokens: 3655
- Thinking tokens: unknown
- Cached input tokens: 1024
- Cache write tokens: 0
- Estimated cost: $0.001234
- Pricing source: local-openrouter-estimate
- Note: Command failed: git commit --only -m i18n candidate(es): async-stack-traces-why-error-stack-lies-in-production via openrouter/qwen/qwen3-32b:nitro -- reports/i18n/async-stack-traces-why-error-stack-lies-in-production/es reports/i18n/async-stack-traces-why-error-stack-lies-in-production/candidates.jsonl
## Raw Output

````mdx
---
title: "Stack Traces Asíncronos: Por Qué `Error.stack` Te Miente"
subTitle: "La cola de microtareas se comió mi tarea (y mi contexto de depuración)."
date: 2025-12-29
modified: 2025-12-30
tags: [javascript, async, debugging, node.js, v8, performance]
category: Code
subCategory: Best Practices
social_image: desktop-social.webp
cover_full_width: ../wide.webp
cover_mobile: ../square.webp
cover_icon: ../square.webp
---

Son las 2 de la mañana. La alarma de PagerDuty está sonando sin parar.

Abres los logs y ves esto:

```
Error: Cannot read properties of undefined (reading 'id')
    at processTicksAndRejections (node:internal/process/task_queues:96:5)
```

Eso es todo. Sin nombre de función. Sin número de línea. Sin ruta de archivo. Solo "processTicksAndRejections".

Bienvenido a JavaScript asíncrono, donde los stack traces son inventados y los números de línea no importan.

---

## Por Qué Se Rompen los Stack Traces

En código síncrono, el Call Stack es una hermosa genealogía. A llamó a B, B llamó a C. Cuando C falla, puedes ver exactamente cómo llegaste ahí.

En código asíncrono (`async/await`), cada palabra clave `await` es un punto de suspensión.

Cuando haces `await`, tu función se arranca del stack. Se mete en un congelador criogénico llamado Microtask Queue. El stack ahora está vacío (o haciendo otra cosa).

Cuando la Promise se resuelve, tu función se descongela y se lanza de vuelta al stack. Pero el historial desapareció.

El motor no tiene idea de quién llamó a `await` hace 500 milisegundos. Solo sabe que tiene una tarea que ejecutar.

---

## Los Intentos de V8 por Arreglarlo

Node.js intenta ayudar. Tenemos:

1.  `Error.captureStackTrace()`: Captura el stack *en el momento de creación*. Inútil si el error se lanza después.
2.  `--async-stack-traces`: Un flag que hace que Node.js mantenga un "shadow stack" de cadenas de promises.
    *   El Costo: Hace tu app un 30% más lenta.
    *   El Resultado: Ayuda, pero se vuelve ruidoso rápido.

---

## La Solución Real: AsyncLocalStorage

Si quieres sobrevivir en producción, deja de mirar los stack traces. Mira la causalidad.

Necesitamos adjuntar contexto (User ID, Request ID) al "hilo" de ejecución, incluso mientras salta entre el Stack y la Microtask Queue.

Node.js tiene una herramienta builtin para esto: `AsyncLocalStorage`.

```javascript
import { AsyncLocalStorage } from 'async_hooks';

const context = new AsyncLocalStorage();

// 1. Envolver la request
context.run({ requestId: '123' }, () => {
  // 2. Llamar código asíncrono profundo
  await processOrder();
});

// 3. En lo profundo de processOrder:
async function processOrder() {
  await db.query();
  
  // ¡Magia! Todavía podemos ver el requestId
  const { requestId } = context.getStore();
  console.log(`[${requestId}] Fallo al procesar la orden`);
}
```

No importa cuántos `await`s ocurran en el medio. El contexto sobrevive.

---

## Playbook para Producción

1.  Deja de confiar en `err.stack`. Es incompleto por diseño.
2.  Usa structured logging. Adjunta `requestId` a cada línea de log usando `AsyncLocalStorage`.
3.  Traza, no apiles. Usa OpenTelemetry. Visualiza la cadena causal entre servicios, que es lo que realmente te importa.

Tu código es asíncrono. Tu contexto de depuración no debería serlo.
````
