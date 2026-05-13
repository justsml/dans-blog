# Translation Candidate
- Slug: you-might-not-need-algolia
- Locale: es
- Model: openrouter/qwen/qwen3-32b:nitro
- Target: src/content/posts/2025-03-01--you-might-not-need-algolia/es/index.mdx
- Validation: passed
- Runtime seconds: 12.51
- Input tokens: 5696
- Output tokens: 5104
- Thinking tokens: unknown
- Cached input tokens: 512
- Cache write tokens: 0
- Estimated cost: $0.001681
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
title: Tal vez no necesitas Algolia™
social_image: ../desktop-social.webp
subTitle: Los sitios estáticos probablemente no necesiten búsqueda alojada
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
La mayoría de las decisiones sobre búsqueda en sitios comienzan demasiado tarde.  

Cuando alguien dice "deberíamos usar Algolia", el equipo ha saltado ya la pregunta útil: ¿qué tipo de contenido estamos buscando?  

Si la respuesta es "páginas HTML que ya construimos", [Pagefind](https://pagefind.app/) debería ser lo primero que intentes. No porque Algolia sea malo. Algolia resuelve muy bien un montón de problemas difíciles. Pero si tu índice de búsqueda cambia cuando tu sitio se despliega, un servicio de búsqueda alojado podría ser infraestructura cosplay.  

<p class="inset">Usa Pagefind cuando tu contenido buscable esté generado en tiempo de compilación. Opta por Algolia cuando la búsqueda necesite aceptar escrituras en vivo, reglas de negocio, clasificación específica del usuario o garantías operativas que tu compilación estática no pueda proporcionar.</p>  

Esta regla abarca más sitios de los que la gente espera: blogs, documentación, sitios de marketing, manuales internos, guías de productos, catálogos de cursos y un número sorprendente de "aplicaciones" que principalmente publican páginas.  

## La estructura del problema

Algolia ofrece un sistema de búsqueda externo. Creas registros, los empujas a un índice, configuras el ranking, conectas una interfaz de usuario y mantienes sincronizado todo con tu fuente de verdad.  

Pagefind analiza el HTML que ya has enviado y construye un índice de búsqueda estático al lado de él.  

Esa diferencia parece aburrida hasta que mantienes la integración.  

Con Algolia, tu sitio tiene una segunda copia de tu contenido. Ahora debes responder preguntas como:  

- ¿Se terminó el despliegue pero falló la actualización del índice?  
- ¿Qué campos son canónicos: los del CMS, la página renderizada o el registro de búsqueda?  
- ¿Quién se encarga de ajustes en el ranking cuando dejan de coincidir con la página?  
- ¿Qué ocurre cuando la capa gratuita resulta no ser la forma real de tu tráfico?  

A veces esas preguntas valen la pena. Para un marketplace, portal de soporte o catálogo de comercio electrónico grande, probablemente sí. Para un sitio de documentación estática, suelen ser complejidad autoinfligida.

## Pagefind funciona porque rechaza el sistema adicional

El truco de Pagefind no es magia. Es criterio.

Espera a que tus páginas existan, indexa el HTML terminado y escribe una colección de activos estáticos que puedes colocar en el mismo CDN que el resto de tu sitio. El navegador descarga solo los fragmentos que necesita. No hay servidor de búsqueda que mantener activo, no hay cuota de crawler que supervisar y no hay pipeline de webhooks intentando recordar qué cambió.

Esto hace que el modo de fallo sea mucho más fácil de entender:

- Si la página se desplegó, el contenido indexado provino de esa página.
- Si la página no se desplegó, los usuarios no pueden verla de todas formas.
- Si la búsqueda está mal, el problema suele estar en tu markup renderizado o en la configuración de Pagefind, no en un trabajo de sincronización remoto.

Este es el motivo por el que lo prefiero para sitios de contenido. El índice sigue al artefacto.

## Qué implica la configuración realmente  

Para un sitio estático simple, el flujo de trabajo es bastante sencillo:  

- **CLI**: Escanea los archivos HTML de tu sitio, genera un índice y despliega el resultado en un CDN global—todo en minutos.  
- **Generadores de Sitios Estáticos**: Usa los plugins de PageFind para Astro o Hugo para automatizar el proceso de indexación.  
- **Soluciones personalizadas**: Utiliza la API de PageFind para construir experiencias de búsqueda adaptadas a tus requisitos específicos.  

<figure>  
  <figcaption>Indexando mi sitio con la CLI de PageFind</figcaption>  
  ![Indexando mi sitio con PageFind](../PageFind-Cleaner-better-15fps-720p2.webp "Indexando mi sitio con PageFind")  
</figure>  

La [Guía de inicio](https://pagefind.app/docs/) es suficiente para comenzar. La prueba más reveladora es operativa: ¿puedes reconstruir el índice en la integración continua, desplegar la salida y explicar cada fallo en la búsqueda inspeccionando el HTML renderizado?  

## ¿Dónde aún gana Algolia?

Pagefind no es un Algolia diminuto disfrazado de otra manera. Es una respuesta diferente.  

Usa Algolia, OpenSearch, Postgres search o cualquier otro sistema dinámico cuando tu índice de búsqueda necesite cambiar de forma independiente a los despliegues del sitio.  

Eso incluye:  

- cantidades de inventario que cambian cada pocos minutos  
- permisos por usuario o resultados privados  
- clasificación personalizada basada en ingresos, frescura, popularidad o experimentos  
- búsqueda federada entre sistemas que no se pueden integrar en un sitio estático único  
- soporte analítico y operativo que una empresa exige de un proveedor gestionado  

Esas son necesidades reales. Pretender que Pagefind las maneja solo porque es rápido sería caer en el otro tipo de tono de blogs de proveedores.  

## La decisión que uso yo  
---

Hazte una pregunta primero:  

> ¿Puede el índice de búsqueda reconstruirse desde la misma salida estática que los usuarios están navegando?  

Si sí, empieza con Pagefind. Obtienes búsqueda privada por defecto, activos compatibles con CDN y un servicio menos con cuentas de usuario y opiniones.  

Si no, nombra la característica que hace que el índice sea dinámico: inventario, permisos, personalización, análisis, clasificación o frecuencia de escritura. Luego elige la base de datos o servicio de búsqueda que explícitamente se encargue de esa tarea.  

Algolia no es el villano aquí. El villano es adoptar un segundo sistema antes de demostrar que el primer artefacto era insuficiente.
````
