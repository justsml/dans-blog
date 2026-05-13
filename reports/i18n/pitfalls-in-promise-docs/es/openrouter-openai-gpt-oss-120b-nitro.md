# Translation Candidate
- Slug: pitfalls-in-promise-docs
- Locale: es
- Model: openrouter/openai/gpt-oss-120b:nitro
- Target: src/content/posts/2017-05-10--pitfalls-in-promise-docs/es/index.mdx
- Validation: passed
- Runtime seconds: 1.79
- Input tokens: 2956
- Output tokens: 860
- Thinking tokens: unknown
- Cached input tokens: 512
- Cache write tokens: 0
- Estimated cost: $0.000270
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
social_image: ../desktop-social.webp
title: Trampas en la documentación de Promise
subTitle: Evitando problemas de la documentación popular
date: '2017-05-10'
modified: '2024-07-30'
category: Code
subCategory: promises
tags:
  - programming
  - patterns
  - promises
  - functional-programming
cover: ../craig-whitehead-433328-unsplash.webp
cover_mobile: ../w300_craig-whitehead-433328-unsplash.webp
cover_icon: ../icon_craig-whitehead-433328-unsplash.webp
---
> Detectando anti‑patrones de Promesas en resultados de búsqueda de Google y bibliotecas populares.

![craig-whitehead-433328-unsplash.webp](../craig-whitehead-433328-unsplash.webp)

Comienzo con una confesión: soy culpable de escribir los mismos “anti‑patrones” que critico a continuación, al igual que muchos desarrolladores de JS. Nada de lo expuesto pretende ser personal ni dirigido a los autores originales. Simplemente estoy haciendo una revisión de código sobre patrones comunes; espero transmitir mi forma de priorizar y mi proceso de pensamiento crítico.

> Con suerte podrás identificar las señales de alerta de Promesas mal diseñadas después de analizar este proyecto.

1. [CallbackHell.com](#callbackhellcom)
1. [StrongLoop](#strongloop)
1. [RisingStack](#risingstack)
1. [Q Library](#qlibrary)

--------------------------
### CallbackHell.com
> **CREDIT:** http://callbackhell.com/
![CallbackHell.com](../callbackhell.webp)

---  
### StrongLoop  
> **CRÉDITO:** `https://strongloop.com/strongblog/node-js-callback-hell-promises-generators/`  
![strong loop](../strongloop.webp)  

---  
### RisingStack  
> **CRÉDITO:** https://blog.risingstack.com/node-js-async-best-practices-avoiding-callback-hell-node-js-at-scale/  
Este artículo está bastante sólido. Sólo tengo una observación:  

![Rising Stack](../risingstack.webp)  

---  
### Q Library  
> **CRÉDITO:** https://github.com/kriskowal/q  

La biblioteca Q es una de las más usadas y antiguas asociadas a “Promesas”. Por eso padece ejemplos desactualizados y la necesidad de mantener compatibilidad retroactiva.  
**Digo “asociada a ‘Promesas’” porque considero que Q trata realmente del patrón `deferred`.**  

Puede parecerse a Promesas, sin embargo insisto en que no lo es. Tiene una superficie de API excesivamente grande por todas las razones equivocadas. Además, la convención de nombres abrevia de forma inconsistente, lo que dificulta memorizar la interfaz. Métodos como `when` y `done` son innecesarios.

Conclusión: el patrón `deferred` es un anti‑patrón doloroso; apenas mejora algo respecto al enfoque típico de callbacks.

![q first example](../qlibrary-1.webp)

![q xmlHTTP deferred anti-pattern](../qlibrary-2.webp)

> Por favor, revisa (& estrella) el proyecto complementario en Github de este artículo, [Escape From Callback Mountain](https://github.com/justsml/escape-from-callback-mountain)

> Objetivo del proyecto: investigar y desarrollar mejores patrones funcionales en JavaScript.
````
