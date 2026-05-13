# Translation Candidate
- Slug: should-you-use-named-or-default-exports
- Locale: es
- Model: openrouter/qwen/qwen3-32b:nitro
- Target: src/content/posts/2023-08-18--should-you-use-named-or-default-exports/es/index.mdx
- Validation: passed
- Runtime seconds: 8.34
- Input tokens: 4039
- Output tokens: 3427
- Thinking tokens: unknown
- Cached input tokens: 512
- Cache write tokens: 0
- Estimated cost: $0.001146
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
social_image: ../desktop-social.webp
title: ''
subTitle: Dar nombre o no darlo
date: '2023-08-10'
modified: '2024-08-01'
tags:
  - typescript
  - javascript
  - modules
category: Guides
subCategory: JavaScript
cover: ../austin-kirk-cHX_Eih2hkY-unsplash-cropped.webp
cover_mobile: ../w300_austin-kirk-cHX_Eih2hkY-unsplash-cropped.webp
cover_icon: ../icon_austin-kirk-cHX_Eih2hkY-unsplash-cropped.webp
---
## ¿Deberías usar `named` o `default` exports en JavaScript?

No falta de artículos con opiniones firmes sobre este tema.

La mayoría juzga a `default export` como "terrible". Otros sostienen que `default` debería ganar (por ejemplo, el estilo de AirBnb).

Muchas veces culpan a **problemas completamente temporales**: errores de auto-importación en IDEs, la capacidad de un bundler específico para hacer tree-shaking, o la simple posibilidad de errores tipográficos al nombrar una importación.

¿Hemos perdido de vista el punto principal de las `exportaciones` desde un principio?

**El código es comunicación. ✨**

> Estamos enviando una señal a los que importan _sobre cómo usar algo_.

### Entonces, ¿qué estamos diciendo?

En términos generales, hay 2 formas de exportar cosas en JavaScript moderno:

- Una `export default` declara claramente: "Este es **_EL ELEMENTO MÁS IMPORTANTE_**". Además, "cualquier exportación con nombre solo desempeña un papel secundario".
- Una `exportación con nombre` afirma que es "definitivamente **_¡UNA COSA!_**". También plantea preguntas: "¿Tienes otros compañeros allí?". Seguido de: "¿Están invitados o son obligatorios?".

Por supuesto, puedes combinar ambos enfoques o usar diferentes métodos para distintas partes de tu base de código. [Ver más ejemplos al final del artículo](#summary).

### Argumentos Débiles, Tío

Vamos a abordar algunos de los "problemas temporales" comunes que la gente encuentra.

- Arg #1: Las exportaciones con nombre garantizan la coherencia de los nombres. [fuente](https://blog.neufund.org/why-we-have-banned-default-exports-and-you-should-do-the-same-d51fdc2cf2ad)
  - No lo hacen. ¿Buscas quizás una regla de linting?
  - (Odio tener que decirte esto, pero espera hasta que aprendas lo que pueden hacer las variables).

```tsx
// ¡Puedes usar alias con ambos!
import { Knife as Handle } from "./knife.js"; // 🔪
import { default as Handle } from "./knife.js"; // 🔪
import Handle from "./knife.js"; // 🔪
```

- Arg #2: Usa `import * as soManyKnives from './kinves.js'` para combinar exportaciones con nombre. (No vinculado, autor retirado.)
  - Característica interesante. No es el punto.
  - Ahora dime, ¿cómo sostengo tu invento de nuevo? No hay intención del autor.
- Arg #3: Las exportaciones con nombre tienen mejor soporte de importación o renombrado en el IDE. [fuente](https://www.bundleapps.io/blog/use-named-exports-over-default-exports-in-javascript)

- Incorrecto (hoy en día). Configura o actualiza tus herramientas.
  - El soporte ha existido durante 3+ años en [VS Code](https://github.com/microsoft/vscode/pull/94480), IntelliJ, etc.
  - Aun así, hay algunas "mejores prácticas" al usar `exportaciones por defecto` para obtener la mejor experiencia de IDE y refactorización.
  - ✅ `export default function UserService() {}` - siempre prefiere funciones con nombre.
  - ❌ `export default function() { }` - las funciones anónimas no están implícitamente vinculadas a su nombre de archivo. Si no nombras la cosa, es difícil pedirle al computador que la cambie.
  - **Nota:** Por razones históricas no puedes combinar `export default` con una expresión `const`.

    ```tsx
    export default const Knife = () => {...blade, ...handle}
    // ^ ❌ No Soportado ❌ ^
    // No se puede exportar por defecto una constante...
    // ==========================

    // Sin embargo, una vez declarada puedes exportar una variable const como defecto.
    const Knife = () => {...blade, ...handle}
    export default Knife;
    // ^ ✅ Válido

    // Para completar:
    export default class anyoneStillUseThese {}
    // ^ ✅ También válido exportar una clase como defecto
    ```

<section className="scroll-x">
## Resumen

Hay muchas combinaciones posibles de formas en que podríamos exportar cosas, cada una cuenta una historia diferente:

| Exportación por defecto | Exportaciones con nombre | Funciones privadas | Patrón                                                   | Significado                                                       |
| ----------------------- | ------------------------ | ------------------ | --------------------------------------------------------- | ----------------------------------------------------------------- |
| ✅                     | ❌                      | ❌                | Una exportación por defecto.                              | "¡Presento UNA función con Propósito Único!"                    |
| ❌                     | ✅                      | ❌                | Una exportación con nombre.                               | "Por favor, no me renombres."                                   |
| ✅                     | ✅                      | ✅                | Exportación por defecto + múltiples funciones privadas    | "Aquí hay algo de lógica relacionada. También, espera un comportamiento tipo clase." |
| ❌                     | ❌                      | ✅                | Múltiples exportaciones con nombre, nombre de archivo genérico. | "Un conjunto de cosas débilmente relacionadas, sin jerarquía implícita." |
| ✅                     | ✅                      | ❌                | Una exportación con nombre también exportada por defecto.   | "No puedes equivocarte al importarme."                          |
</section>

**Algo a considerar:** ¿Qué estamos diciendo cuando el nombre del archivo coincide o no con alguna de sus exportaciones? (Por ejemplo, un `utils.js` con muchas funciones).

### Conclusión

Si el código es comunicación, por favor `export` como si realmente lo quisieras. 💞
````
