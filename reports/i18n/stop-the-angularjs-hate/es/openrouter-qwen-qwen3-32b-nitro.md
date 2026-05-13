# Translation Candidate
- Slug: stop-the-angularjs-hate
- Locale: es
- Model: openrouter/qwen/qwen3-32b:nitro
- Target: src/content/posts/2015-03-10--stop-the-angularjs-hate/es/index.mdx
- Validation: passed
- Runtime seconds: 12.60
- Input tokens: 4942
- Output tokens: 4577
- Thinking tokens: unknown
- Cached input tokens: 512
- Cache write tokens: 0
- Estimated cost: $0.001494
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
social_image: ../desktop-social.webp
title: Trucos de AngularJS
subTitle: ''
date: '2015-02-26'
modified: '2016-02-01'
category: Code
subCategory: angularjs
tags:
  - angularjs
  - development
  - performance
  - programming
cover: ../sharon-mccutcheon-522851-unsplash.webp
cover_mobile: ../w300_sharon-mccutcheon-522851-unsplash.webp
cover_icon: ../icon_sharon-mccutcheon-522851-unsplash.webp
---
## AngularJS PUEDE SER Divertido!

> Para: AngularJS v1.x

1.  Los desarrolladores de AngularJS descubren rápidamente que sus aplicaciones medianas y grandes se ven abrumadas por el peso de los disparos de `$watch` y el bastón engordado conocido como `$scope`.
2.  Mantén tu `$scope` libre de estado UI excesivo, intenta limitar el tamaño y la profundidad de tu jerarquía general.

### Enlace de datos de dos vías: Espada de doble filo

El enlace de datos de dos vías solo hace que venir desde otros marcos como Backbone sea, bien, **una auténtica maravilla**.

El problema es: muchos sitios **abusan crónicamente** de los patrones de diseño de Angular. Esto lleva a una proliferación de directivas y un `$scope/rootScope` que fácilmente tiene miles de instancias, y pueden aferrarse a objetos enormes, impidiendo cualquier posibilidad de recolección de basura efectiva.

Sabes adónde va esto: ¡un navegador agotado! Condenado para siempre a trabajar a un **ritmo frenético** ejecutando recompilaciones interminables e redundantes de la interfaz de usuario/DOM.

### Deja de sobre-Angularizar

> "Si tu única herramienta es un martillo, entonces todo problema parece un clavo."
>
> - antigua frase

¿Tu aplicación tiene problemas con directivas?

```jade
current-user-status-label
  div(ng-if='loggedIn')
    view-user-surplusage(ng-if='!editMode')
      .head: contact-details(user='user')
      .tool: contact-buttons(loggedIn='loggedIn')
      a.edit-icon(ng-click='editMode = true')
    edit-user-surplusage(ng-if='editMode')
      .head: avatar-edit(user='user')
      .body: edit-contact-details(user='user')
      a.save-icon(ng-click='editMode = false')
```

Diseñemos un widget de usuario flexible que ayude:

1. Componentización versátil con código Angular DRY  
1. Directivas comprensibles, con tamaño y profundidad mínimos de directiva (cuida tus ng-repeats)  
1. Capa de servicio simple  
1. Poco código real para implementar, solo código HTML/Vista

```jade
// jade
user-widget
  div(ng-if='loggedIn')
    div.edit(ng-if='editMode')
      h4.email-icon: input(type='email', ng-model='user.email')
      h4.phone-icon: input(type='email', ng-model='user.phone')
      a.save-icon(ng-click='editMode = false')
    div.show(ng-if='!editMode')
      h1.users-icon {{ user.name  }}
      h4.email-icon {{ user.email }}
      h4.phone-icon {{ user.phone }}
      a.edit-icon(ng-click='editMode = true')
  div(ng-if='!loggedIn')
    h5: i Bienvenido usuario
    a.btn(href='/login') Iniciar sesión
```

## Soluciones

### Consejos de Angular

1.  Usa enlace de una vía (ej. `{:: title}` )
1.  Limita el anidamiento recursivo de directivas
1.  Y si debes anidar directivas, _NUNCA_ lo hagas dentro de un `ng-repeat` - El rendimiento empeorará de manera exponencial ;)
    I. Usa código JS/DOM nativo en un patrón de fábrica para crear fragmentos básicos de DOM/UI, ejemplos: Cuadro de mensaje modal, barra de estado. Llama a fábricas de UI desde directivas o controladores.
1.  _Bonus:_ Comprende el costo y los disparadores del [ciclo de renderizado del navegador](https://developers.google.com/web/fundamentals/performance/rendering/index?hl=es): animación, renderizado compuesto, reflujos

### Usa Browserify para organizar el proyecto

No específicamente para Angular, pero esencial para la resolución simple de dependencias.

[Browserify](../browserify-handbook/readme.markdown#exports) hace que los proyectos JS sean manejables con virtualmente ninguna sobrecarga de código adicional (bueno, unos cientos de caracteres más).

[Lee solo esta sección](https://github.com/substack/browserify-handbook/blob/master/readme.markdown#exports) del [Manual de Browserify](https://github.com/substack/browserify-handbook/).

## Alternativas

### [ReactJS](https://facebook.github.io/react/) de Facebook

Si tienes muchos componentes UI reutilizables pequeños - ReactJS podría ser una mejor opción:

- Si tu proyecto...?:
  - Tiene una filosofía diferente para la implementación de UI/DOM que Angular
  - Ya tiene algún tipo de 'framework' - Puedes **usar ReactJS junto con** AngularJS, Ember, Backbone. (Evítalo si es posible).
  - Maneja cambios frecuentes en el modelo de datos en su propio código, obtendrás beneficios al evitar la naturaleza hiperactiva del patrón digest/loop en Angular

### [Proyecto Polymer](http://www.Polymer-Project.org/) de Google

### Enfoque más puro de JavaScript

- Por cierto, aquí es donde intento crear código independiente de framework (+1 testabilidad, +1 reutilización)
  1. Usar una clase de JavaScript puro para cargar datos (AJAX/JSONP/Incrustado en página, etc.)
  1. Usar plantillas Mustache para crear cadenas HTML (o DOM directamente)
  1. Cachear el contenido renderizado en localStorage si es posible
  1. (Opcional) Ahora agregar un oyente de eventos para re-renderizar el contenido. He estandarizado el nombre del evento `refresh.<class-name>`
````
