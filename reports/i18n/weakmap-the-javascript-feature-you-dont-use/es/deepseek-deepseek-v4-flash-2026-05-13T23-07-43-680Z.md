# Translation Candidate
- Slug: weakmap-the-javascript-feature-you-dont-use
- Locale: es
- Model: deepseek/deepseek-v4-flash
- Target: src/content/posts/2025-12-29--weakmap-the-javascript-feature-you-dont-use/es/index.mdx
- Validation: deferred
- Runtime seconds: 22.68
- Input tokens: 4042
- Output tokens: 3571
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- Estimated cost: $0.001566
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
title: Deja de perder memoria con WeakMap
subTitle: Arreglando código débil con referencias débiles
date: '2025-12-29'
modified: '2026-01-12'
tags:
  - javascript
  - memory
  - garbage-collection
  - performance
  - patterns
category: Code
subCategory: Best Practices
cover_full_width: ../wide.webp
cover_mobile: ../square.webp
cover_icon: ../square.webp
---
Sabes esa sensación cuando cambias una línea de código y ves que el uso de memoria cae un 50%? Tuve ese momento viendo el Monitor de Rendimiento de las DevTools de Chrome mientras una aplicación de dashboard pasaba de perder 100 MB por hora a funcionar limpia toda una tarde.

El cambio de una línea: `new Map()` se convirtió en `new WeakMap()`.

Eso es todo. Misma superficie de API, mismo patrón de uso, comportamiento completamente diferente bajo el capó. Pero entender por qué funciona implica entender algo en lo que la mayoría de los desarrolladores de JavaScript nunca piensan: qué sucede cuando nadie está mirando tus datos.

## Cuando las Referencias se Convierten en Anclas

Un Map normal en JavaScript trata sus claves como carga preciosa. Una vez que pones algo ahí, el Map lo agarra con mano de hierro. El Recolector de Basura ve esta relación y piensa: "Claramente todavía necesitan este objeto, mejor no lo toques".

Este instinto protector se convierte en un problema cuando almacenas metadatos sobre cosas temporales. Nodos del DOM que se eliminan. Sesiones de usuario que expiran. Instancias de componentes que se desmontan. El Map no sabe que estos objetos ya no son útiles. Solo sabe que tiene una referencia, así que los mantiene vivos.

```javascript
const cache = new Map();

function trackClick(element) {
  cache.set(element, { clicks: 0 });
}

document.body.removeChild(element);
// El elemento desapareció del DOM, pero cache lo mantiene en memoria
```

El Recolector de Basura no puede limpiar `element` porque `cache` todavía lo está señalando. Esto se llama una "referencia fuerte", y en aplicaciones de una sola página de larga duración, se convierte en una fuga que eventualmente colapsa el navegador.

## WeakMap Cambia las Reglas

Un WeakMap funciona de manera diferente. Trata sus claves como ciudadanos temporales en lugar de residentes permanentes. Cuando almacenas algo en un WeakMap, básicamente estás diciendo: "Quiero asociar estos datos con este objeto, pero no quiero ser la razón por la que se mantenga vivo".

Si lo único que mantiene un objeto en memoria es un WeakMap, el Recolector de Basura tiene permiso para llevárselo. Cuando el objeto desaparece, la entrada del WeakMap desaparece con él. Sin necesidad de limpieza manual.

```javascript
const cache = new WeakMap();

function trackClick(element) {
  cache.set(element, { clicks: 0 });
}

document.body.removeChild(element);
// El elemento es recolectado por el Garbage Collector
// La entrada del caché desaparece automáticamente
```

Ejecuté un benchmark creando 100.000 nodos DOM, almacenando metadatos sobre cada uno y luego eliminándolos todos. Con un Map, el navegador retenía entre 150 y 200 MB. Con un WeakMap, bajó a 70-80 MB. Mismo código, misma funcionalidad, la mitad del consumo de memoria.

## Lo que sacrificas

WeakMap tiene restricciones que parecen limitaciones hasta que te das cuenta de que son lo que hace funcionar la magia.

**No puedes iterar sobre un WeakMap.** No hay `forEach`, ni `keys()`, ni `values()`. Tiene sentido si lo piensas: el Garbage Collector podría eliminar una entrada en medio de tu bucle. ¿De verdad quieres lidiar con eso?

No puedes consultar el tamaño. No hay propiedad `.size`, ni `.length`. De nuevo, es un objetivo móvil. El número podría cambiar entre que preguntas y recibes la respuesta.

**Las claves deben ser objetos.** Nada de strings, números ni primitivas. Esto es fundamental para cómo funcionan las referencias débiles: los valores primitivos no tienen una identidad que pueda rastrearse independientemente de su valor.

Estos no son errores. Son el diseño. WeakMap está construido para un trabajo específico: adjuntar metadatos a objetos sin impedir que esos objetos sean limpiados. Si necesitas iteración, claves primitivas o un conteo de entradas, probablemente estás resolviendo un problema diferente y deberías usar un Map normal.

## Dónde esto realmente ayuda

El patrón de "datos privados" fue el caso de uso original de WeakMap, antes de que JavaScript tuviera campos `#private`. Las bibliotecas creaban un WeakMap fuera de la clase y lo usaban para almacenar datos que no deberían ser accesibles en la instancia.

```javascript
const privateData = new WeakMap();

class User {
  constructor(name) {
    privateData.set(this, { name });
  }

  getName() {
    return privateData.get(this).name;
  }
}
```

Cuando una instancia de User es recolectada por el Garbage Collector, los datos privados se van con ella. Sin necesidad de código de limpieza.

La memoización es otro caso de uso natural, especialmente cuando se almacenan en caché resultados basados en objetos de entrada en lugar de valores primitivos. Si tu cálculo costoso recibe un objeto de configuración como entrada, un WeakMap significa que no tienes que preocuparte de que la caché sobreviva a las configuraciones.

```javascript
const cache = new WeakMap();

function expensiveCalc(obj) {
  if (cache.has(obj)) return cache.get(obj);
  
  const result = heavyMath(obj);
  cache.set(obj, result);
  return result;
}
```

La caché solo vive mientras existan los objetos que se están almacenando. Una vez que `obj` ya no es referenciado en ningún otro lugar, tanto el resultado almacenado como la entrada de la caché desaparecen juntos.

## Cuándo Recurrir a Él

Las fugas de memoria en las aplicaciones web modernas suelen provenir de referencias obsoletas a cosas que deberían haberse limpiado. Si estás construyendo algo de larga duración, un panel que permanece abierto todo el día, una aplicación de chat que funciona durante horas, un panel de administración que nunca se actualiza, necesitas pensar en qué sucede con los datos antiguos.

WeakMap es particularmente útil cuando asocias datos con nodos del DOM, instancias de componentes o cualquier objeto cuyo ciclo de vida no controlas. Si estás almacenando algo basado en una referencia y esa referencia podría desaparecer, WeakMap simplifica mucho la limpieza.

El Map normal sigue siendo la opción correcta cuando estás construyendo una caché real con políticas de desalojo, cuando necesitas iterar sobre las entradas, cuando usas claves primitivas, o cuando los datos en sí mismos son lo que importa, no su asociación con un objeto.

Lo bueno de `WeakMap` es que normalmente es obvio cuándo lo necesitas. Si te encuentras escribiendo código de limpieza para eliminar entradas del mapa cuando los objetos se destruyen, esa es una señal. Si te preocupa que la memoria crezca sin límite porque no estás seguro de cuándo eliminar cosas, esa es otra señal.

A veces la mejor característica es una que simplemente funciona sin que tengas que pensar en ello.

## Recursos

- [MDN: WeakMap](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakMap)
- [MDN: Memory Management](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Memory_management)
- [V8 Blog: Weak References and Finalizers](https://v8.dev/features/weak-references)
- [JavaScript.info: WeakMap and WeakSet](https://javascript.info/weakmap-weakset)
````
