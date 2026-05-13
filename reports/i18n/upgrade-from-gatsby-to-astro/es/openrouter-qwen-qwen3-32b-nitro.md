# Translation Candidate
- Slug: upgrade-from-gatsby-to-astro
- Locale: es
- Model: openrouter/qwen/qwen3-32b:nitro
- Target: src/content/posts/2024-08-22--upgrade-from-gatsby-to-astro/es/index.mdx
- Validation: rejected: direct AI SDK translation failed
- Runtime seconds: 23.81
- Input tokens: 9144
- Output tokens: 9377
- Thinking tokens: unknown
- Cached input tokens: 1024
- Cache write tokens: 0
- Estimated cost: $0.002982
- Pricing source: local-openrouter-estimate
- Note: Command failed: bun run i18n:validate --slug upgrade-from-gatsby-to-astro --locale es
## Raw Output

````mdx
---
social_image: ../desktop-social.webp
title: Lecciones aprendidas al actualizar mi blog
subTitle: 'Astro, Tailwind, MDX, Pagefind y más!'
date: '2024-08-21'
modified: '2024-08-23'
category: Guides
tags:
  - astro
  - tailwind
  - mdx
  - pagefind
  - gatsby
cover: ../galaxy-contribution-mode.webp
cover_full_width: ../galaxy-contribution-banner.webp
cover_mobile: ../w300_galaxy-contribution-mode.webp
cover_icon: ../icon_galaxy-contribution-mode.webp
---
Recientemente, emprendí un viaje para actualizar mi sitio web Gatsby v1 de más de 8 años.  

Este artículo compartirá algunas lecciones que aprendí durante este proceso y las tecnologías interesantes que exploré.  

## Contenido  

- [Requisitos del proyecto](#requisitos-del-proyecto)  
- [Elegir mi pila tecnológica adecuada](#elegir-mi-pila-tecnológica-adecuada)  
- [Astro: Curva de aprendizaje y características clave](#astro-curva-de-aprendizaje-y-características-clave)  
- [CSS moderno: ¡Sorpresa!](#css-moderno-wow)  
- [Búsqueda: Pagefind](#búsqueda-pagefind)  
- [Comentarios: Utterances](#comentarios-utterances)  
- [Tailwind: Remordimientos](#tailwind-remordimientos)  
- [Conclusión](#conclusión)  

## Requisitos del proyecto  

Antes de sumergirme en la actualización, establecí un conjunto de requisitos:

Dado que mi blog recibe un número altamente variable de visitas diarias, sentí que un sitio pregenerado estáticamente me daría el rendimiento deseado sin complejidad adicional.

También necesitaba mantener las características y contenido existentes de este sitio, incluyendo:

- Destacado de código
- Comentarios
- Búsqueda en el sitio
- Componentes React preexistentes: Interfaz de cuestionario, incrustaciones de Gist
- Formulario de contacto
- Imágenes responsivas
- Tiempo de carga inferior a 1 segundo
- Compatibilidad con navegadores: 2018+
- Despliegues automatizados + basados en PR

## Elegir mi pila de tecnología correcta

A lo largo de los años he trabajado con muchas herramientas de sitios estáticos, desde Jekyll, Hugo, Slate y Gatsby. Así como muchos marcos frontend: Ember, Knockout, Angular, Vue y, por supuesto, React.

Así que tengo precisamente demasiadas opciones, que al final reduje a **Remix**, **Next.js** y **Astro**,

Podría escribir una serie completa de blogs sobre mi proceso de evaluación, pero aquí haré un resumen:

<p class="breakout">Elegí [Astro](https://astro.build) por lo rápido que pude _hacer cosas significativas_.</p>

Su diseño de API es sorprendentemente simple. Es [un buen equilibrio entre flexibilidad y buenas opiniones de diseño.](https://docs.astro.build/en/concepts/why-astro/)

Fue un alivio que Astro no tenga ninguna clara preferencia por la nube ni agenda de marco de trabajo.

Astro no fue la única tecnología que usé, aquí está el desglose completo del stack:

- [Astro](https://astro.build): Un generador moderno de sitios estáticos.
- [ShadcnUI](https://ui.shadcn.com): Una colección de componentes reutilizables.
- [Tailwind CSS](https://tailwindcss.com): Un marco de CSS centrado en utilidades.
- [MDX](https://mdxjs.com): Contenido en Markdown + componentes en línea.
- [Pagefind](https://pagefind.app): Biblioteca rápida, estática y offline para búsqueda en sitio. ¡No necesitas Algolia!
- [Utterances](https://utteranc.es): Sistema de comentarios basado en problemas de GitHub.
- [Netlify](https://www.netlify.com): Despliegues automatizados, formulario de contacto con captcha.

## Astro: Curva de aprendizaje y características clave

<p class="breakout quote">Astro se convirtió rápidamente en el pilar fundamental de mi actualización.</p>

Estas son algunas características clave que encontré particularmente útiles:

- `.astro` archivos: A primera vista, los componentes de Astro pueden parecer componentes JSX de React, sin embargo son bastante diferentes y persiguen un conjunto distinto de objetivos. (Vea la tabla de comparación a continuación.)
- Impulsado por sus propias herramientas de compilación en Golang y Vite: simplemente funciona. Maneja sin problemas ESM/CJS, TypeScript, empaquetado de código, estilos, imágenes, etc.
- Sin sesgo hacia frameworks ni hacia la nube. (*Márchate* Next.js, OpenNext)
- Renderizado estático vs. híbrido: Astro ofrece [flexibilidad para adaptarse a la mayoría de plataformas en la nube](https://docs.astro.build/en/guides/deploy/): AWS, GCP, Firebase, Netlify, Vercel, Cloudflare Pages, Azure, Fly.io, y muchas otras.
- Colecciones de contenido: La API [`getCollection`](https://docs.astro.build/en/reference/api-reference/#getcollection) simplifica el trabajo con archivos de contenido como fuente de datos.
- Enrutamiento basado en archivos: El sistema de enrutamiento basado en archivos de Astro, combinado con `getStaticPaths`, hace que la generación de páginas sea sencilla.
- SEO: [Astro no se pone en tu camino](https://github.com/justsml/dans-blog/blob/010c5cb58bb327adb8c8fff608594daa612ad9d5/src/components/BaseHead.astro#L43-L63), y solo emite una cantidad mínima de ~~detritus~~ código esencial (`astro-island`) cuando es necesario.

Algunas cosas resultaron un poco sorprendentes, como el estilo alrededor del markup injertado por Astro y el efecto de `display:contents`.

```tsx
```

<style>astro-island,astro-slot,astro-static-slot{display:contents}</style>

```

### Comparando `.astro` vs. Componentes del cliente

Los componentes Astro son básicamente plantillas HTML con un patrón potente de componentes y props. Pueden obtener datos en tiempo de compilación, acceder a recursos del backend y ocultar cierta información sensible.

La mejor forma de entender los componentes `.astro` de Astro es compararlos y contrastarlos con componentes del cliente. (React, Vue, Svelte, etc.)

<section className="scroll-x">
| ¿Qué necesitas hacer?                                                            | Componente `.astro`    | Componente del cliente    |
| ---------------------------------------------------------------------------------- | ------------------- | ------------------- |
| Generar HTML con un patrón potente de plantilla+componente                             | ✅ | ❌ |
| Obtener datos en tiempo de compilación                                                           | ✅ | ❌ |
| Acceder a recursos del backend (directamente)                                                | ✅ | ❌ |
| Ocultar información sensible (tokens de acceso, claves API, etc)                   | ✅ | ❌ |
| Reducir JavaScript del lado del cliente                                                      | ✅ | ❌ |
| Usar componentes del cliente (React, Vue, Svelte, etc)                                    | ✅ | ✅ |
| Añadir interactividad y controladores de eventos (`onClick()`, `onChange()`, etc)             | ❌ | ✅ |
| Usar Estado y Efectos de ciclo de vida (`useState()`, `useReducer()`, `useEffect()`, etc) | ❌ | ✅ |
| Usar APIs solo del navegador                                                              | ❌ | ✅ |
| Usar hooks personalizados que dependan de estado, efectos o APIs del navegador               | ❌ | ✅ |
</section>

## CSS moderno: ¡Vaya!

Volviendo al desarrollo frontend, me sorprendieron los avances en CSS nativo:

- Variables de CSS: Disponibles desde hace un tiempo, bastante estables en todos los navegadores desde 202\*.
- Anidamiento: Finalmente en especificación, sin la sintaxis incómoda de antes. Ahora es similar a Less o SCSS.
- Nuevos selectores: [`:is()`, `:where()` y `:has()`](https://www.youtube.com/watch?v=3ncFpP8GP4g) ofrecen un targeting más preciso de elementos.
- Unidades modernas como `ch`, `vw` y funciones como `clamp()` brindan mejor control sobre layouts y tipografía.
- Establecer espaciado de forma más natural con `-inline` y `-block`. Establece padding o márgenes en el eje horizontal o vertical. En lugar de `margin: 0 1rem 0 1rem` → `margin-inline: 1rem`.
- Layouts avanzados: Volver a aprender CSS Grid. Wow, hay mucha mierda ahí dentro. Puede ser abrumador con las aparentemente infinitas formas de usarlo. Ten en cuenta que puedes salirte con aprender 1 o 2 métodos. Revisa estos excelentes recursos que me ayudaron a hacer trucos con grid: [El video de Kevin Powell: Aprende CSS Grid de forma fácil](https://www.youtube.com/watch?v=rg7Fvvl3taU), [Responsive sin consultas de medios](https://ardilamorin.com/responsive-no-media-queries/), [Diez layouts modernos en una línea de CSS](https://web.dev/articles/one-line-layouts).

## Búsqueda: Pagefind

Implementar una **búsqueda en sitio** sin servicios de terceros ni alojamiento de base de datos parecía un desafío divertido. Después de todo, no es como si tuviera 10,000 posts para indexar (todavía).

Mientras navegaba por [las integraciones de la comunidad de Astro](https://astro.build/integrations/?search=find) encontré una herramienta fantástica de la que hubiera querido saber antes: [Pagefind](https://pagefind.app/).

<p class="breakout quote">Pocas herramientas resuelven un problema tan bien como Pagefind resuelve la búsqueda en sitio local.</p>

La simplicidad de implementar Pagefind es un placer. Se puede integrar con CUALQUIER contenido de sitio estático, y puedes elegir si quieres una interfaz de usuario predeterminada o puedes construir algo personalizado si lo deseas.  

Resolvió de manera elegante todo lo que quería. Solo me tomó unos minutos integrarlo, y la mayor parte del trabajo consistió en agregar una etiqueta `<div id="search"></div>` y un poco de estilo!  

## Comentarios: Utterances  

Lamentablemente, tuve que despedirme de Disqus y de los comentarios que había acumulado a lo largo de muchos años.  

Quería un mejor control y visibilidad sobre los scripts de terceros en mi sitio.  

Además, tenía que ser simple y mantenible.

Esto me llevó a elegir el excelente servicio [Utterances](https://utteranc.es/). Su sistema de comentarios basado en GitHub (problemas) se alinea bien con mi audiencia. Además, es fácil de configurar y gratuito.

## Tailwind: Arrepentimientos

Hay solo una tecnología de la que cada vez más me arrepiento haber usado: Tailwind.

Con el tiempo, puedo sentir la diferencia en el costo entre escribir y mantener. Tailwind es muy rápido de escribir, pero una vez que es lo suficientemente complejo, puede volverse tedioso de leer y ampliar.

## Conclusión

Actualizar mi antiguo sitio de Gatsby v1 a una pila moderna construida en torno a Astro fue una experiencia divertida. 10/10 lo recomendaría.

Si estás considerando actualizar un sitio antiguo o construir un nuevo sitio estático (o híbrido), te recomiendo encarecidamente que eches un vistazo a Astro. La curva de aprendizaje puede ser empinada en algunos momentos, pero los beneficios en términos de rendimiento, experiencia del desarrollador y protección contra el futuro de tu proyecto son bien merecidos el esfuerzo.
````
