# Translation Candidate
- Slug: lancedb-wasm-browser-client
- Locale: es
- Model: openrouter/openai/gpt-oss-120b:nitro
- Target: src/content/posts/2026-04-16--lancedb-wasm-browser-client/es/index.mdx
- Validation: passed
- Runtime seconds: 11.29
- Input tokens: 9164
- Output tokens: 2535
- Thinking tokens: unknown
- Cached input tokens: 2048
- Cache write tokens: 0
- Estimated cost: $0.000814
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
title: Búsqueda Vectorial Serverless
subTitle: >-
  Construyendo un cliente de búsqueda vectorial para el navegador con Rust, WASM
  y TypeScript
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
## El problema: no puedes buscar en una tabla de Lance desde un navegador

LanceDB es una base de datos vectorial fantástica. Es mucho más simple y barata que las bases de datos tradicionales. Puedes publicar tablas con columnas vectoriales, columnas de búsqueda de texto completo (FTS), alojar los archivos en S3 o en una CDN, y consultar los datos directamente sobre S3 desde un servidor Node.js. No se necesita daemon.

Lo que *no podías* hacer — antes de este PR — era abrir esa tabla directamente desde un navegador y ejecutar una búsqueda. Necesitabas un servidor intermedio: una Lambda, un contenedor, *algo* que pudiera ejecutar Rust, Node.js/WASM o Python.

El objetivo era ambicioso, pero centrado en un resultado útil: **índices vectoriales de solo lectura, alojados por HTTP y buscables directamente**.

---

## La arquitectura

Hay tres capas en la implementación:

### 1. Artefactos de publicación en Rust (`web_publish.rs`)

Antes de que un navegador pueda buscar en una tabla de Lance, necesita saber qué es seguro buscar. El formato interno de Lance incluye algunas características que no son portables al navegador: archivos delta, bases externas, tipos de índices que el runtime WASM no puede ejecutar. En lugar de que el navegador descubra esto en tiempo de búsqueda (lo cual es problemático), el paso de publicación genera archivos side‑car explícitos:

- `_web.json` — anuncia el esquema y qué columnas son buscables desde el navegador (columnas vectoriales con tipos de distancia compatibles, columnas FTS)
- `_snapshot.json` — una vista puntual del conjunto de datos que el cliente del navegador puede consumir sin necesidad de entender todo el protocolo de evolución del dataset
- `_latest.manifest` / `_latest.version` — punteros estables que el navegador consulta para detectar obsolescencia

La bandera `isComplete` en el snapshot actúa como válvula de seguridad. Si el dataset depende de bases externas o archivos de datos que la ruta del navegador no puede leer de forma segura, `isComplete=false` y el navegador lo rechaza de inmediato con un error claro, en lugar de producir resultados sutilmente incorrectos.

Esta es la parte de la que más me alegra haberla implementado en Rust en lugar de JavaScript. El juicio sobre qué es seguro para el navegador vive donde realmente reside la metadata de la tabla.

### 2. `lancedb-wasm` Rust crate

Este es el runtime WebAssembly: un almacén de objetos respaldado por `fetch`, un motor de búsqueda del lado del navegador y un evaluador de expresiones para predicados de filtro.

El almacén de objetos `fetch` (`fetch_object_store.rs`) implementa el trait `ObjectStore` de Lance sobre peticiones HTTP de rango. Las lecturas internas de Lance ya están estructuradas como fetches de rangos de bytes, lo que se traduce limpiamente a encabezados `Range: bytes=N-M`. Esta fue la parte más satisfactoria del proyecto — la arquitectura existente estaba casi perfectamente diseñada para esto, solo tuve que conectarla.

El motor del navegador (`browser.rs`) gestiona la búsqueda: vecino más cercano vectorial, búsqueda de texto completo y híbrida (vector + FTS con fusión RRF). Las expresiones de filtro (`browser_expr.rs`) evalúan los predicados de filtro de Lance del lado del cliente en Rust puro, compilado a WASM.

El rechazo de funcionalidades es estricto e intencional. ¿Distancia `hamming`? Rechazada de inmediato con un mensaje claro — no es un error silencioso, no es un pánico en tiempo de ejecución. ¿`fastSearch` sobre un snapshot incompleto? Rechazada. ¿Diseños de ruta base no soportados? Rechazados. El objetivo era fallar cerrado: si la ruta del navegador no puede cumplir el contrato, lo indica.

### 3. `@lancedb/lancedb-web` TypeScript package

La superficie pública de la API es intencionalmente pequeña:

```typescript
import { searchTable } from "@lancedb/lancedb-web";

const results = await searchTable("https://my-cdn.example.com/my-table", "semantic search query", {
  select: ["title", "url", "score"],
  limit: 10,
});
```

En su interior, `searchTable()` prefiere una ruta de ejecución respaldada por un Worker para que la búsqueda no bloquee el hilo principal. El módulo WASM se ejecuta dentro del Worker; los resultados vuelven a través de un protocolo tipado (`worker_protocol.ts`). También existe una exportación opcional `./transformers` que envuelve `@xenova/transformers` para generar incrustaciones de consulta del lado del cliente, de modo que puedas pasar de una consulta de texto sin procesar a resultados de búsqueda vectorial sin salir nunca del navegador.

---

## Las partes difíciles

### Las lecturas con rango sobre HTTP no son gratuitas

Los patrones de lectura de Lance asumen un almacén de objetos que pueda manejar eficientemente muchas peticiones pequeñas con rangos. S3 y GCS están diseñados para eso. Los navegadores… en su mayor parte también, pero `fetch` con encabezados `Range` tiene algunas peculiaridades que las abstracciones actuales del almacén de objetos en Rust no necesitan considerar.

El problema principal es que los navegadores a veces almacenan en búfer o vuelven a solicitar de forma agresiva, y no puedes controlar el agrupamiento de conexiones TCP como lo haces en un proceso nativo. Para índices de vectores grandes esto importa. La implementación actual es correcta; si es lo suficientemente rápida para uso en producción con tablas grandes es algo que se confirmará durante la revisión.

### La cuestión de la generación del sidecar

El PR plantea esto explícitamente como una pregunta para los mantenedores, porque existe un verdadero intercambio de diseño: ¿deben los archivos sidecar del navegador (`_web.json`, `_snapshot.json`) emitirse *automáticamente* en cada confirmación de tabla, o debería haber una llamada explícita a `publish()`?

La generación automática es más ergonómica — obtienes soporte del navegador sin esfuerzo. Pero implica que cada escritura local tenga un pequeño sobrecosto adicional, y acopla el contrato del navegador al camino central de confirmación de maneras que podrían complicar cambios futuros en cualquiera de los dos.

La publicación explícita es más correcta desde el punto de vista del contrato — estás diciendo “esta versión está lista para el navegador” — pero es fácil olvidarla, lo que significa que las tablas que *deberían* ser buscables desde el navegador quedan silenciosamente inaccesibles.

Yo me inclino por la generación automática, con fallos del sidecar registrando una advertencia en lugar de abortar la confirmación. Pero realmente no estoy seguro, y lo señalé en el PR.

### ¿Qué cuenta como “seguro para el navegador”?

La bandera `isComplete` y la lógica de filtrado de columnas en `web_publish.rs` codifican un juicio sobre lo que el navegador puede manejar. Ese juicio debe mantenerse sincronizado con las capacidades reales del runtime WASM. Si alguien añade un nuevo tipo de índice a Lance que el navegador no pueda ejecutar, el código de publicación necesita saber excluirlo — de lo contrario estarás anunciando una capacidad que el navegador no podrá cumplir en tiempo de búsqueda.

La solución correcta aquí probablemente sea un registro de capacidades compartido entre la ruta de publicación y el runtime, de modo que no puedan desincronizarse. Lo implementé como constantes paralelas por ahora, lo cual es expedito pero frágil. Probablemente eso sea lo que quiera mejorar a continuación.

---

## El dilema del wrapper de Transformers

La exportación `./transformers` es una característica de comodidad: toma una consulta de texto, la procesa mediante un modelo de incrustación local usando `@xenova/transformers`, y entrega el vector resultante al motor de búsqueda de LanceDB. Búsqueda semántica sin servidor desde una página HTML estática.

También es lo que menos seguro estoy de que deba incluirse en este PR. Es realmente útil y ya está implementado, pero es una dependencia y una superficie de API que está separada de la cuestión central de búsqueda en el navegador. Los mantenedores podrían, con razón, querer aterrizar primero la API base `searchTable()` y luego iterar sobre los embeddings por separado.

Lo pregunté. Ya veremos.

---

## Qué haría diferente

**Delimitar el alcance antes.** El PR tiene 14 500 líneas. Eso es mucho para revisar de una sola vez. Podría haber entregado primero el formato del artefacto de publicación, luego el runtime WASM y, por último, el paquete TypeScript. Tres PRs más pequeños habrían sido más fáciles de fusionar. No lo hice porque quería validar la historia completa de extremo a extremo antes de proponer cualquiera de los componentes — lo cual tenía sentido para la confianza, pero aumenta considerablemente la carga de revisión.

**Escribir primero el registro de capacidades.** El riesgo de desalineación entre `web_publish.rs` y `browser.rs` es real. Comenzar con un tipo de capacidad compartido que ambas partes referencien habría sido más limpio que mantener listas de constantes paralelas que tengo que recordar sincronizar.

**Nombra las cosas de forma menos ingeniosa.** `_web.json` es un nombre aceptable para un formato interno. Se vuelve un nombre estructural en el momento en que alguien lo cachea o construye herramientas alrededor de él. Debería haber dedicado más tiempo al nombrado antes de enviarlo; es una de esas cosas que resulta mucho más barato cambiar antes de que otros dependan de ello.

---

## El punto más amplio

Lo que hizo que este proyecto fuera manejable es que la arquitectura interna de Lance ya estaba bien estructurada para lecturas por rangos. La abstracción del almacén de objetos es limpia. El formato de metadatos es explícito. El concepto de snapshot me dio un lugar natural para expresar “esta es una vista segura para el navegador de este conjunto de datos”.

Los límites de abstracción adecuados no solo facilitan razonar sobre el código interno, sino que permiten que alguien como yo aparezca desde fuera del proyecto y conecte un nuevo entorno de ejecución sin tocar el núcleo. Esa es una verdadera virtud de diseño, y hizo que las 14 000 líneas se sintieran más como rellenar una forma que como luchar contra la base de código.

El PR está [aquí](https://github.com/lancedb/lancedb/pull/3247) si quieres ver los detalles. Todavía estoy a la espera de la revisión. Los mantenedores han sido amables y soy cautelosamente optimista.
````
