# Translation Candidate
- Slug: lancedb-wasm-browser-client
- Locale: es
- Model: deepseek/deepseek-v4-flash
- Target: src/content/posts/2026-04-16--lancedb-wasm-browser-client/es/index.mdx
- Validation: deferred
- Runtime seconds: 61.55
- Input tokens: 6506
- Output tokens: 5515
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- Estimated cost: $0.002455
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
title: Búsqueda vectorial sin servidor
subTitle: >-
  Construyendo un Cliente de Búsqueda Vectorial para Navegador con Rust, WASM y
  TypeScript
date: '2026-04-16'
modified: '2026-04-16'
tags:
  - rust
  - wasm
  - lancedb
  - vector-search
  - open-source
  - webassembly
  - typescript
  - ai
category: AI
subCategory: Open Source
draft: false
hidden: true
publish: false
popularity: 0.75
social_image: ../desktop-social.webp
cover_full_width: ../wide.webp
cover_mobile: ../square.webp
cover_icon: ../square.webp
---
## El problema: No se puede buscar en una tabla Lance desde un navegador

LanceDB es una base de datos vectorial fantástica. Es enormemente más simple y barata que las bases de datos tradicionales. Puedes publicar tablas con columnas vectoriales, columnas de búsqueda de texto completo (FTS), alojar los archivos en S3 o un CDN, y consultar datos directamente desde S3 desde un servidor Node.js. No se necesita un demonio.

Lo que *no* se podía hacer — antes de este PR — era abrir esa tabla directamente desde un navegador y ejecutar una búsqueda. Necesitabas un servidor intermediario: una Lambda, un contenedor, *algo* que pudiera ejecutar Rust, Node.js/WASM o Python.

El objetivo era ambicioso, pero centrado en un resultado final significativo: **índices vectoriales alojados en HTTP, directamente consultables y de solo lectura.**

---

## La arquitectura

Hay tres capas en la implementación:

### 1. Artefactos de publicación en Rust (`web_publish.rs`)

Antes de que un navegador pueda buscar en una tabla Lance, necesita saber qué es seguro buscar. El formato interno de Lance tiene algunas características que no son portables al navegador — archivos delta, bases externas, tipos de índice que el runtime WASM no puede ejecutar. En lugar de que el navegador descubra esto en tiempo de búsqueda (mal), el paso de publicación produce archivos sidecar explícitos:

- `_web.json` — anuncia el esquema y qué columnas se pueden buscar desde el navegador (columnas vectoriales con tipos de distancia compatibles, columnas FTS)
- `_snapshot.json` — una vista puntual del conjunto de datos que el cliente del navegador puede consumir sin entender el protocolo completo de evolución del conjunto de datos
- `_latest.manifest` / `_latest.version` — punteros estables que el navegador consulta para detectar obsolescencia

El flag `isComplete` en el snapshot es la válvula de seguridad. Si el conjunto de datos depende de bases externas o archivos de datos que la ruta del navegador no puede leer de forma segura, `isComplete=false` y el navegador lo rechaza de inmediato con un error claro en lugar de producir resultados sutilmente incorrectos.

Esta es la parte que más me alegra haber implementado en Rust en lugar de JavaScript. El juicio sobre lo que es seguro para el navegador reside donde realmente vive la metadatos de la tabla.

### 2. Crate Rust `lancedb-wasm`

Este es el runtime de WebAssembly: un almacén de objetos respaldado por `fetch`, un motor de búsqueda del lado del navegador y un evaluador de expresiones para predicados de filtro.

El almacén de objetos fetch (`fetch_object_store.rs`) implementa el trait `ObjectStore` de Lance sobre solicitudes de rango HTTP. Las lecturas internas de Lance ya están estructuradas como recuperaciones de rangos de bytes, lo que se asigna limpiamente a los encabezados `Range: bytes=N-M`. Esta fue la parte más satisfactoria del proyecto: la arquitectura existente estaba casi perfectamente diseñada para esto, solo tuve que cablearlo.

El motor del navegador (`browser.rs`) maneja la búsqueda: vecino más cercano vectorial, texto completo e híbrida (vectorial + FTS con fusión RRF). Las expresiones de filtro (`browser_expr.rs`) evalúan los predicados de filtro de Lance del lado del cliente en Rust puro, compilado a WASM.

El rechazo de características es estricto e intencional. ¿Distancia `hamming`? Rechazada de inmediato con un mensaje claro — no silenciosamente incorrecta, no un pánico en tiempo de ejecución. ¿`fastSearch` en un snapshot incompleto? Rechazado. ¿Diseños de ruta base no soportados? Rechazado. El objetivo era fallar de forma cerrada: si la ruta del navegador no puede cumplir el contrato, lo dice.

### 3. Paquete TypeScript `@lancedb/lancedb-web`

La superficie de la API pública es intencionalmente pequeña:

```typescript
import { searchTable } from "@lancedb/lancedb-web";

const results = await searchTable("https://my-cdn.example.com/my-table", "semantic search query", {
  select: ["title", "url", "score"],
  limit: 10,
});
```

Bajo el capó, `searchTable()` prefiere una ruta de ejecución respaldada por un Worker para que la búsqueda no bloquee el hilo principal. El módulo WASM se ejecuta en el Worker; los resultados fluyen de vuelta a través de un protocolo tipado (`worker_protocol.ts`). También hay una exportación opcional `./transformers` que envuelve `@xenova/transformers` para generar embeddings de consulta del lado del cliente — de modo que puedas pasar de una consulta de texto sin procesar a resultados de búsqueda vectorial sin salir nunca del navegador.

---

## Las Partes Difíciles

### Las lecturas por rangos sobre HTTP no son gratuitas

Los patrones de lectura de Lance asumen un almacén de objetos que pueda manejar muchas solicitudes pequeñas por rangos de manera eficiente. S3 y GCS están diseñados para esto. Los navegadores... también lo están en su mayoría, pero `fetch` con cabeceras `Range` tiene algunas peculiaridades que las abstracciones existentes de almacén de objetos en Rust no tienen que considerar.

El problema principal es que los navegadores a veces almacenan en búfer o re-solicitan agresivamente, y no puedes controlar la agrupación de conexiones TCP como lo harías en un proceso nativo. Para índices vectoriales grandes, esto importa. La implementación actual es correcta; si es lo suficientemente rápida para uso en producción con tablas grandes es algo que se resolverá durante la revisión.

### La cuestión de la generación de sidecars

El PR plantea esto explícitamente como una pregunta para los mantenedores, porque existe una compensación de diseño real: ¿los archivos sidecar del navegador (`_web.json`, `_snapshot.json`) deberían generarse *automáticamente* en cada commit de la tabla, o debería haber una llamada explícita `publish()`?

Automático es más ergonómico: obtienes soporte para el navegador de forma gratuita. Pero significa que cada escritura local tiene un pequeño costo adicional, y acopla el contrato del navegador a la ruta principal de commit de maneras que podrían complicar cambios futuros en cualquiera de los dos.

Explícito es más correcto desde el punto de vista del contrato — estás diciendo "esta versión está lista para el navegador" — pero es fácil olvidarlo, lo que significa que las tablas que *deberían* ser buscables desde el navegador silenciosamente no lo son.

Me incliné por lo automático, con fallos de sidecar registrando una advertencia en lugar de fallar el commit. Pero estoy genuinamente inseguro, y lo señalé en el PR.

### ¿Qué cuenta como "seguro para el navegador"?

La bandera `isComplete` y la lógica de filtrado de columnas en `web_publish.rs` codifican un juicio sobre lo que el navegador puede manejar. Ese juicio debe mantenerse sincronizado con las capacidades reales del runtime WASM. Si alguien añade un nuevo tipo de índice a Lance que el navegador no pueda ejecutar, el código de publicación debe saber excluirlo; de lo contrario, anunciarás una capacidad que el navegador no podrá cumplir en el momento de la búsqueda.

La solución correcta aquí es probablemente un registro de capacidades compartido entre la ruta de publicación y el runtime, para que no puedan desviarse. Por ahora lo implementé como constantes paralelas, lo cual es expeditivo pero frágil. Esto es probablemente lo que me gustaría mejorar a continuación.

---

## El dilema del envoltorio de Transformers

La exportación `./transformers` es una característica de calidad de vida: toma una consulta de texto, la procesa con un modelo de embeddings local mediante `@xenova/transformers` y entrega el vector resultante al motor de búsqueda de LanceDB. Búsqueda semántica sin servidor desde una página HTML estática.

También es lo que menos estoy seguro de que deba estar en este PR. Es genuinamente útil y ya está implementado, pero es una dependencia y una superficie de API separada de la pregunta central de búsqueda en el navegador. Los mantenedores podrían razonablemente querer aterrizar primero la API base `searchTable()` e iterar sobre los embeddings por separado.

Pregunté. Ya veremos.

---

## Qué haría diferente

**Alcance más temprano.** El PR tiene 14.500 líneas. Es mucho para revisar de una sola vez. Podría haber publicado primero el formato del artefacto de publicación, luego el runtime WASM y luego el paquete TypeScript. Tres PRs más pequeños habrían sido más fáciles de fusionar. No lo hice porque quería validar la historia completa de extremo a extremo antes de proponer cualquiera de las piezas, lo cual tenía sentido para la confianza, pero hace que la carga de revisión sea alta.

**Escribir el registro de capacidades primero.** El riesgo de desviación entre `web_publish.rs` y `browser.rs` es real. Empezar con un tipo de capacidad compartida al que ambas partes hicieran referencia habría sido más limpio que listas de constantes paralelas que tengo que recordar mantener sincronizadas.

**Nombrar las cosas con menos ingenio.** `_web.json` es un nombre aceptable para un formato interno. Se convierte en un nombre con carga en el momento en que alguien lo almacena en caché o construye herramientas sobre él. Debería haber dedicado más tiempo a los nombres antes de enviarlo; es una de esas cosas que es mucho más barato cambiar antes de que alguien más dependa de ello.

---

## El punto más amplio

Lo que hizo que este proyecto fuera manejable es que la arquitectura interna de Lance ya estaba bien estructurada para lecturas por rangos. La abstracción del almacén de objetos es limpia. El formato de metadatos es explícito. El concepto de snapshot me dio un lugar natural para expresar "esta es una vista segura para el navegador de este conjunto de datos".

Los buenos límites de abstracción no solo hacen que el código interno sea más fácil de razonar, sino que permiten que alguien como yo llegue desde fuera del proyecto y conecte un nuevo entorno de ejecución sin tocar el núcleo. Esa es una verdadera virtud de diseño, e hizo que las 14.000 líneas se sintieran más como rellenar una forma que como luchar contra el código base.

El PR está [aquí](https://github.com/lancedb/lancedb/pull/3247) si quieres ver los detalles. Todavía esperando la revisión. Los mantenedores han sido cálidos y estoy cautelosamente optimista.
````
