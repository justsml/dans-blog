# Translation Candidate
- Slug: you-might-not-need-algolia
- Locale: es
- Model: openrouter/openai/gpt-oss-120b:nitro
- Target: src/content/posts/2025-03-01--you-might-not-need-algolia/es/index.mdx
- Validation: passed
- Runtime seconds: 2.57
- Input tokens: 5879
- Output tokens: 1495
- Thinking tokens: unknown
- Cached input tokens: 3584
- Cache write tokens: 0
- Estimated cost: $0.000498
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
title: Puede que no necesites Algolia™
social_image: ../desktop-social.webp
subTitle: Los sitios estáticos probablemente no requieran búsqueda alojada.
tags:
  - search
  - algolia
  - pagefind
  - cdn
date: '2025-03-01'
modified: '2025-03-05'
category: Search
cover_full_width: ../synth-wave-city-wide.webp
cover_mobile: ../synth-wave-city-200-square.webp
cover_icon: ../synth-wave-city-200-square.webp
cover_credit: Image by Dan Levy
---
La mayoría delas decisiones sobre la búsqueda en sitios se toman demasiado tarde.

Cuando alguien dice “deberíamos usar Algolia”, el equipo normalmente ya ha omitido la pregunta útil: ¿qué tipo de contenido estamos buscando?

Si la respuesta es “páginas HTML que ya generamos”, [Pagefind](https://pagefind.app/) debería ser lo primero que pruebes. No porque Algolia sea malo. Algolia es muy buena en un montón de problemas difíciles. Pero si tu índice de búsqueda cambia cuando despliegas el sitio, un servicio de búsqueda alojado puede ser solo un disfraz de infraestructura.

<p class="inset">Usa Pagefind cuando tu contenido buscable se genera en tiempo de compilación. Recurre a Algolia cuando la búsqueda necesita aceptar escrituras en tiempo real, reglas de negocio, clasificación específica por usuario o garantías operativas que tu compilación estática no puede ofrecer.</p>

Esa regla cubre más sitios de lo que la gente espera: blogs, documentación, sitios de marketing, manuales internos, guías de producto, catálogos de cursos y una sorprendente cantidad de “apps” que mayormente publican páginas.

## La forma del problema

Algoliate proporciona un sistema de búsqueda externo. Creas registros, los envías a un índice, configuras la clasificación, conectas una interfaz y mantienes todo sincronizado con tu fuente de verdad.

Pagefind observa el HTML que ya has publicado y genera un índice de búsqueda estático junto a él.

Esa distinción parece aburrida hasta que tienes que mantener la integración.

Con Algolia, tu sitio tiene una segunda copia de tu contenido. Ahora debes responder preguntas como:

- ¿Terminó el despliegue pero falló la actualización del índice?
- ¿Qué campos son canónicos: los del CMS, la página renderizada o el registro de búsqueda?
- ¿Quién es responsable de los ajustes de clasificación cuando dejan de coincidir con la página?
- ¿Qué ocurre cuando el nivel gratuito resulta no ser suficiente para el volumen real de tu tráfico?

A veces esas preguntas valen la pena. Para un marketplace, un portal de soporte o un catálogo de comercio electrónico grande, probablemente sí. Para un sitio de documentación estática, suelen ser complejidad auto‑infligida.

## Pagefind funciona porque rechaza el sistema extra

El truco de Pagefind no es magia. Es sentido común.

Espera a que tus páginas existan, indexa el HTML final y escribe una colección de activos estáticos que puedes colocar en el mismo CDN que el resto de tu sitio. El navegador descarga solo los fragmentos que necesita. No hay un servidor de búsqueda que mantener activo, ni una cuota de rastreador que vigilar, y tampoco una canalización de webhook intentando recordar qué cambió.

Eso hace que el modo de falla sea mucho más fácil de entender:

- Si la página se desplegó, el contenido indexado proviene de esa página.
- Si la página no se desplegó, los usuarios no pueden verla de todos modos.
- Si la búsqueda es incorrecta, el problema suele estar en tu marcado renderizado o en la configuración de Pagefind, no en un trabajo de sincronización distante.

Por eso me gusta para sitios de contenido. El índice sigue al artefacto.

## Qué aspecto tiene realmente la configuración

Para un sitio estático simple, el flujo de trabajo es agradablemente monótono:

- **CLI**: escanea los archivos HTML de tu sitio, genera un índice y lo despliega en una CDN global—todo en minutos.  
- **Generadores de sitios estáticos**: usa los plugins de PageFind para Astro o Hugo para automatizar el proceso de indexación.  
- **Soluciones personalizadas**: aprovecha la API de PageFind para construir experiencias de búsqueda a medida que se ajusten a tus requisitos únicos.

<figure>
  <figcaption>Indexando mi sitio con la CLI de PageFind</figcaption>
  ![Indexing my site with PageFind](PageFind-Cleaner-better-15fps-720p2.webp "Indexing my site with PageFind")
</figure>

La guía de [Getting Started](https://pagefind.app/docs/) basta para ponerse en marcha. La prueba más reveladora es operativa: ¿puedes reconstruir el índice en CI, desplegar la salida y explicar cada fallo de búsqueda inspeccionando el HTML renderizado?

## Dónde Algolia sigue ganando

Pagefind no es una versión diminuta de Algolia disfrazada de gabardina. Es una respuesta distinta.

Utiliza Algolia, OpenSearch, la búsqueda de Postgres u otro sistema en tiempo real cuando tu índice de búsqueda debe cambiar de forma independiente a un despliegue del sitio.

Eso incluye:

- recuentos de inventario que varían cada pocos minutos
- permisos por usuario o resultados privados
- ranking personalizado impulsado por ingresos, frescura, popularidad o experimentos
- búsqueda federada entre sistemas que no se renderizan en un sitio estático único
- soporte de analítica y operaciones que una empresa espera de un proveedor gestionado

Son necesidades reales. Fingir que Pagefind las cubre solo porque es rápido sería el típico tono de blog de proveedor.

## La decisión que utilizo

Haz una pregunta primero:

> ¿Puede el índice de búsqueda reconstruirse a partir del mismo output estático que los usuarios están navegando?

Si la respuesta es sí, comienza con Pagefind. Obtienes búsqueda privada por defecto, activos compatibles con CDN y una cuenta de servicio menos con opiniones.

Si la respuesta es no, nombra lo que hace que el índice sea “en vivo”: inventario, permisos, personalización, analítica, ranking o frecuencia de escritura. Luego elige la base de datos o el servicio de búsqueda que gestione esa tarea de forma explícita.

Algolia no es el villano aquí. El villano es adoptar un segundo sistema antes de demostrar que el primer artefacto era insuficiente.
````
