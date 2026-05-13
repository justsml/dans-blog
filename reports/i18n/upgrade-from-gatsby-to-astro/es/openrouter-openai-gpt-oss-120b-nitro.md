# Translation Candidate
- Slug: upgrade-from-gatsby-to-astro
- Locale: es
- Model: openrouter/openai/gpt-oss-120b:nitro
- Target: src/content/posts/2024-08-22--upgrade-from-gatsby-to-astro/es/index.mdx
- Validation: deferred
- Runtime seconds: 9.67
- Input tokens: 10599
- Output tokens: 2796
- Thinking tokens: unknown
- Cached input tokens: 2688
- Cache write tokens: 0
- Estimated cost: $0.000917
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
social_image: ../desktop-social.webp
title: Lecciones al actualizar mi blog
subTitle: '¡Astro, Tailwind, MDX, Pagefind y más!'
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
Recientemente, me embarqué en una travesía para actualizar mi sitio Gatsby v1 de más de 8 años.

Esta publicación compartirá algunas lecciones que aprendí durante el proceso y las tecnologías divertidas que exploré.

## Tabla de contenidos

- [Requisitos del proyecto](#project-requirements)
- [Elección de la pila tecnológica adecuada](#choosing-my-right-technology-stack)
- [Astro: curva de aprendizaje y características clave](#astro-learning-curve-and-key-features)
- [CSS moderno: Wow](#modern-css-wow)
- [Búsqueda: Pagefind](#search-pagefind)
- [Comentarios: Utterances](#comments-utterances)
- [Tailwind: Lamentos](#tailwind-regrets)
- [Conclusión](#conclusion)

## Requisitos del proyecto

Antes de sumergirme en la actualización, establecí un conjunto de requisitos:

Como mi blog recibe una cantidad de visitas diarias muy variable, consideré que un sitio estáticamente pre‑generado me daría el rendimiento que buscaba sin añadir complejidad extra.

Además, necesitaba conservar el contenido y las funcionalidades existentes del sitio, entre ellas:

- Resaltado de código
- Comentarios
- Búsqueda en el sitio
- Componentes React preexistentes: UI de cuestionarios, incrustaciones de Gist
- Formulario de contacto
- Imágenes responsivas
- Tiempo de carga inferior a 1 segundo
- Compatibilidad con navegadores: 2018 en adelante
- Despliegues automáticos basados en PR

## Elegir la pila tecnológica adecuada

A lo largo de los años he trabajado con muchas herramientas de sitios estáticos, desde Jekyll, Hugo, Slate y Gatsby, así como con numerosos frameworks front‑end: Ember, Knockout, Angular, Vue y, por supuesto, React.

Así que, literalmente, tenía demasiadas opciones, que finalmente reduje a **Remix**, **Next.js** y **Astro**.

Podría escribir una serie completa de entradas sobre mi proceso de evaluación, pero lo resumiré aquí:

<p class="breakout">Elegí [Astro](https://astro.build) porque me permite _hacer cosas significativas_ rápidamente.</p>

Su diseño de API es refrescantemente simple. Es un [excelente equilibrio entre flexibilidad y buenas opiniones de diseño.](https://docs.astro.build/en/concepts/why-astro/)

Resultó tranquilizador que Astro no tenga una inclinación evidente hacia la nube ni una agenda de framework.

Astro no fue la única tecnología que utilicé; a continuación, el desglose completo de la pila:

- [Astro](https://astro.build): Un generador de sitios estáticos moderno.  
- [ShadcnUI](https://ui.shadcn.com): Una colección de componentes reutilizables.  
- [Tailwind CSS](https://tailwindcss.com): Un framework CSS orientado a utilidades.  
- [MDX](https://mdxjs.com): Contenido Markdown + componentes en línea.  
- [Pagefind](https://pagefind.app): Biblioteca de búsqueda rápida, estática y offline. ¡No necesitas Algolia!  
- [Utterances](https://utteranc.es): Sistema de comentarios basado en issues de GitHub.  
- [Netlify](https://www.netlify.com): Despliegues automatizados, formulario de contacto con captcha.

## Astro: Curva de aprendizaje y características clave

<p class="breakout quote">Astro se convirtió rápidamente en la piedra angular de mi actualización.</p>

Estas son algunas de las características que encontré particularmente útiles:

- Archivos `.astro`: A primera vista, los componentes de Astro pueden parecer componentes JSX de React, sin embargo son bastante diferentes y persiguen un conjunto distinto de objetivos. (Ver tabla comparativa más abajo.)
- Impulsado por sus propias herramientas de compilación en Golang y Vite: simplemente funciona. Maneja sin problemas ESM/CJS, TypeScript, empaquetado de código, estilos, imágenes, etc.
- [Sin sesgo de framework](https://docs.astro.build/en/guides/framework-components/#official-ui-framework-integrations) ni [sesgo de nube](https://docs.astro.build/en/guides/deploy/) (*tos* Next.js, OpenNext)
- Renderizado [estático vs. híbrido](https://docs.astro.build/en/basics/rendering-modes/): Astro brinda [flexibilidad para apuntar a la mayoría de plataformas en la nube](https://docs.astro.build/en/guides/deploy/): AWS, GCP, Firebase, Netlify, Vercel, Cloudflare Pages, Azure, Fly.io y muchas más.
- Colecciones de contenido: La API [`getCollection`](https://docs.astro.build/en/reference/api-reference/#getcollection) simplifica el trabajo con archivos de contenido como fuente de datos.
- Enrutamiento basado en archivos: El sistema de enrutamiento basado en archivos de Astro, combinado con `getStaticPaths`, hace que generar páginas sea pan comido.
- SEO: [Astro no se interpone en tu camino](https://github.com/justsml/dans-blog/blob/010c5cb58bb327adb8c8fff608594daa612ad9d5/src/components/BaseHead.astro#L43-L63) y solo emite una cantidad mínima de ~~detritos~~ código boilerplate (`astro-island`) cuando es necesario.

Algunas cosas resultaron un poco inesperadas, como el estilo alrededor del marcado inyectado por Astro y el efecto de `display:contents`.

```tsx
```

<style>astro-island,astro-slot,astro-static-slot{display:contents}</style>

```

### Comparando `.astro` vs. Componentes Cliente

Los componentes de Astro son básicamente plantillas HTML con un potente patrón de componentes y props. Pueden obtener datos en tiempo de compilación, acceder a recursos del backend y mantener cierta información sensible oculta.

La mejor forma de entender los componentes `.astro` de Astro es compararlos y contrastarlos con los componentes del lado del cliente (React, Vue, Svelte, etc.).

<section className="scroll-x">
| ¿Qué necesitas hacer?                                                               | Componente `.astro` | Componente Cliente |
| ----------------------------------------------------------------------------------- | ------------------- | ------------------- |
| Generar HTML con patrón potente de plantilla+componente                            | ✅ | ❌ |
| Obtener datos en tiempo de compilación                                             | ✅ | ❌ |
| Acceder a recursos del backend (directamente)                                      | ✅ | ❌ |
| Mantener información sensible oculta (tokens de acceso, claves API, etc.)          | ✅ | ❌ |
| Reducir JavaScript del lado del cliente                                            | ✅ | ❌ |
| Usar componentes cliente (React, Vue, Svelte, etc.)                                | ✅ | ✅ |
| Añadir interactividad y escuchas de eventos (`onClick()`, `onChange()`, etc.)      | ❌ | ✅ |
| Usar estado y efectos de ciclo de vida (`useState()`, `useReducer()`, `useEffect()`, etc.) | ❌ | ✅ |
| Usar APIs solo del navegador                                                       | ❌ | ✅ |
| Usar hooks personalizados que dependan de estado, efectos o APIs solo del navegador | ❌ | ✅ |
</section>

## CSS Moderno: Wow

Volviendo al desarrollo frontend, me entusiasmaron los avances en CSS nativo:

- Variables CSS: Disponibles desde hace tiempo y bastante estables en los navegadores desde 202\*.
- Anidamiento: Finalmente en la especificación y sin la sintaxis torpe de versiones anteriores. Ahora se parece a Less o SCSS.
- Nuevos selectores: [`:is()`, `:where()` y `:has()`](https://www.youtube.com/watch?v=3ncFpP8GP4g) permiten una focalización más precisa de los elementos.
- Unidades modernas como `ch`, `vw` y funciones como `clamp()` brindan mejor control sobre diseños y tipografía.
- Definir espaciado de forma más natural con atributos `-inline` y `-block`. Establece padding o margin en el eje horizontal o vertical. En lugar de `margin: 0 1rem 0 1rem` → `margin-inline: 1rem`.
- Layouts avanzados: Re‑aprender CSS Grid. Vaya, hay mucho material ahí. Puede resultar abrumador con la aparente infinidad de formas de usarlo. Ten en cuenta que basta con dominar una o dos técnicas. Consulta estos recursos excelentes que me ayudaron a hacer trucos con grid: [video de Kevin Powell: Learn CSS Grid the easy way](https://www.youtube.com/watch?v=rg7Fvvl3taU), [Responsive w/o media queries](https://ardilamorin.com/responsive-no-media-queries/), [Ten modern layouts in one line of CSS](https://web.dev/articles/one-line-layouts).

## Búsqueda: Pagefind

Implementar una **búsqueda en el sitio** sin servicios de terceros ni alojamiento de bases de datos parecía un reto divertido. Después de todo, no es como si ya tuviera 10 000 publicaciones para indexar (todavía).

Mientras revisaba las [integraciones de la comunidad de Astro](https://astro.build/integrations/?search=find) me topé con una herramienta fantástica que desearía haber conocido antes: [Pagefind](https://pagefind.app/).

<p class="breakout quote">Pocas herramientas resuelven un problema tan bien como Pagefind lo hace con la búsqueda local en sitios.</p>

La simplicidad de implementar Pagefind es un placer. Puede integrarse con CUALQUIER contenido estático y puedes decidir si usar la UI predeterminada o crear algo totalmente personalizado si lo prefieres.

Resolvió de forma ordenada todo lo que necesitaba. La integración tomó solo minutos, y la mayor parte del trabajo consistió en añadir una etiqueta `<div id="search"></div>` y algo de estilo.

## Comentarios: Utterances

Desafortunadamente, tuve que despedirme de Disqus y de los comentarios que había acumulado durante años.

Quería un mayor control y visibilidad sobre los scripts de terceros en mi sitio.

Además, necesitaba que fuera simple y fácil de mantener.

Esto me llevó a elegir el fantástico servicio [Utterances](https://utteranc.es/). Su sistema de comentarios basado en GitHub (issues) encaja bien con mi audiencia. Además, es fácil de configurar y gratuito.

## Tailwind: Lamentos

Hay solo un componente tecnológico del que me estoy arrepintiendo cada vez más: Tailwind.

Con el tiempo, percibo la diferencia de costo entre escribir y mantener. Tailwind es extremadamente rápido para escribir, pero una vez que se vuelve lo suficientemente complejo, puede resultar tedioso de leer y ampliar.

## Conclusión

Actualizar mi antiguo sitio Gatsby v1 a una pila moderna construida alrededor de Astro fue una experiencia divertida. 10/10 lo recomendaría.

Si estás pensando en actualizar un sitio antiguo o en crear uno estático (o híbrido) nuevo, te recomiendo encarecidamente que le eches un vistazo a Astro. La curva de aprendizaje puede ser pronunciada en algunos momentos, pero los beneficios en rendimiento, experiencia del desarrollador y la capacidad de futuro del proyecto justifican con creces el esfuerzo.
````
