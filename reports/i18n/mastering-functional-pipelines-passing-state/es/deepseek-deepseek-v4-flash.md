# Translation Candidate
- Slug: mastering-functional-pipelines-passing-state
- Locale: es
- Model: deepseek/deepseek-v4-flash
- Target: src/content/posts/2023-08-13--mastering-functional-pipelines-passing-state/es/index.mdx
- Validation: deferred
- Runtime seconds: 79.43
- Input tokens: 9576
- Output tokens: 7710
- Thinking tokens: unknown
- Cached input tokens: 1920
- Cache write tokens: 0
- Estimated cost: $0.003236
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
social_image: ../desktop-social.webp
title: 'Maestro de Pipelines: Transmisión de Estado'
subTitle: 'Hola Closure, mi viejo amigo.'
date: '2023-08-09'
modified: '2024-07-30'
tags:
  - typescript
  - closure
  - stateful
  - scoping
  - hoisting
  - functional
  - pipeline
category: Guides
subCategory: JavaScript
cover: ../sven-kucinic-LxYxC6jdjcA-unsplash-cropped-1200.webp
cover_mobile: ../w300_sven-kucinic-LxYxC6jdjcA-unsplash-cropped-1200.webp
cover_icon: ../icon_sven-kucinic-LxYxC6jdjcA-unsplash-cropped-1200.webp
---
## Maestro de Pipelines: Pasando Estado

¿Te has encontrado con desafíos al pasar estado usando Pipelines Funcionales?

La organización (o la falta de ella) de tu código impacta directamente en la facilidad con la que se pasa el estado.

En este artículo exploraremos una técnica efectiva para pasar estado a través de un pipeline. En el camino mejoraremos la organización y legibilidad de nuestro código.

El siguiente fragmento "real" será nuestro enfoque en este artículo: Una función de checkout, que acepta un `userId` y un array de `products`. Devuelve una cadena de Promesas que ejecuta 4 funciones en secuencia.

```tsx
const checkout = (userId: number, products: number[]) => {
  return getProductsSubtotal(userId, products)
    .then(subTotal => applyTaxes(userId, subTotal))
    .then(total => purchaseProducts(userId, total))
    .then(result => sendReceipt(userId, result));
};
```

Espera un momento, este código es bastante decente, en lo que respecta a pipelines en JS.

Sí que sufre de algunos problemas sutiles que pueden combinarse para formar problemas más sustanciales.

Un problema es que estamos pasando repetidamente `userId` a cada función (lógicamente relacionada). Ahora combina eso con otro problema que pasa fácilmente desapercibido para los desarrolladores y también para TypeScript: intercambiar los argumentos numéricos crea fácilmente un bug silencioso. (Mira `applyTaxes` y `purchaseProducts`. _¿Era `userId` o `amount` el que va primero?_)

Antes de decidir cómo mejorar este código, identifiquemos algunas ventajas e inconvenientes.

### Pros y contras

#### Ventajas

- ¡Buen uso de un closure! ¡Pasar `userId` y `products` una sola vez!
- Nomenclatura de argumentos consistente.
- Composición relativamente efectiva y sucinta de 4 funciones clave para el checkout.
- Control de flujo de errores “gratuito”. (Los errores se propagan desde cualquier función anidada, rechazando la Promise devuelta por `checkout()`.)

#### Contras

- Pasar `userId` repetidamente es tedioso.
- Las funciones no son de un solo parámetro (unarias). _Esto afecta la componibilidad. Véase [ejemplo final](#checkout-with-further-improvements) para saber por qué._
- Puede no ser obvio qué devuelve cada función. (¿El resultado del envío de correo, o esa variable `result`? ¿O?)
- No es obvio cómo añadir funcionalidad (p. ej., si necesitáramos cargar descuento/crédito/puntos del cliente, etc.).
- A veces los nombres de parámetros “temporales” (como en cada `.then(param => {})`) aportan contexto. Sin embargo, con el tiempo probablemente se conviertan en un refugio para nombres confusos.

### Solución, Parte 1: ¡Crea un módulo!

Esta técnica consiste en organizar funciones relacionadas en un único módulo (p. ej., `CartHelpers`). No exige un patrón específico. Explora [funciones fábrica](#carthelpers-factory), [Clases](#carthelpers-class), Closures, Mixins, etc. Encuentra lo que tenga sentido para tu proyecto y equipo.

#### Fábrica de CartHelpers

Ejemplo de un módulo `CartHelpers`, donde `userId` se pasa una sola vez y todos los métodos son de un solo argumento.

```tsx
const CartHelpers = (userId: number) => {
  return {
    getProductsSubtotal: products => getProductsSubtotal(userId, products),
    applyTaxes: subTotal => applyTaxes(userId, subTotal),
    purchaseProducts: total => purchaseProducts(userId, total),
    sendReceipt: invoice => sendReceipt(userId, invoice)
  };
};
```

#### Clase CartHelpers

Si las clases son lo tuyo, es fácil adaptarlo:

```tsx
class CartHelpers {
  constructor(userId) {
    this.userId = userId;
  }
  getProductsSubtotal = products => getProductsSubtotal(this.userId, products);
  applyTaxes = subTotal => applyTaxes(this.userId, subTotal);
  purchaseProducts = total => purchaseProducts(this.userId, total);
  sendReceipt = invoice => sendReceipt(this.userId, invoice);
}
```

Algunos beneficios inmediatos:

- Eliminar el paso repetitivo de variables.
  - DRY: `CartHelpers` abstrae el argumento repetido `userId`.
  - Cada método acepta **_solo_** los argumentos necesarios. Haciendo que `cart.applyTaxes(subTotal)` sea completamente predecible de leer.
- Las funciones de un solo argumento en `CartHelpers` son más legibles, con un propósito más claro.

Al agrupar funciones relacionadas, creamos una oportunidad para reducir la superficie expuesta (p. ej., `checkout()`, los métodos 'públicos' de `CartHelpers`).

> Menos superficie === menos carga cognitiva, mejor testing y mantenibilidad.
> _Diseña sistemas con intención y enfoque. ✨_

#### Uso de Checkout y CartHelpers

Veamos cómo se ve ahora la función `checkout()`:

```tsx
export const checkout = ({ userId, products }) => {
  const cart = CartHelpers(userId);

  return Promise.resolve(products)
    .then(products => cart.getProductsSubtotal(products))
    .then(subTotal => cart.applyTaxes(subTotal))
    .then(total => cart.purchaseProducts(total))
    .then(result => cart.sendReceipt(result));
};
```

##### Checkout con mejoras adicionales

> ¿Se puede mejorar aún más? ¡Sí! ¡No tenemos que repetir argumentos en absoluto!

Cuando los argumentos de una función son proporcionados por la salida de funciones anteriores, puedes simplificar aún más el código.

```tsx
export const checkout = ({ userId, products }) => {
  const cart = CartHelpers(userId);

  // 🌈 Functions stack like Lego & read like normal "Human Words!" 💅
  return Promise.resolve(products)
    .then(cart.getProductsSubtotal)
    .then(cart.applyTaxes)
    .then(cart.purchaseProducts)
    .then(cart.sendReceipt);
};
```

**Si se siente antinatural combinar parámetros en un solo argumento (objeto),** considera dividir tus funciones **O** combinarlas en módulos con un ámbito más apropiado.

#### ¿Por dónde empezar?

Encuentra funciones relacionadas y agrúpalas. (p. ej., `CartHelpers`).

Parte del desafío al encontrar posibles módulos lógicos es identificar el código relacionado en primer lugar.

##### ¿Qué hace que las funciones estén relacionadas?

Un truco útil: busca repeticiones en los parámetros de las funciones. Pregúntate si hay una relación en juego o una responsabilidad subyacente.

- ✅ Funciones con argumentos repetidos y comunes. (p. ej., si 4 métodos aceptan `userRewards`, es probable que necesites un módulo `Rewards` u otro).
- ✅ Funciones cuyos argumentos son proporcionados directamente por la salida de funciones anteriores. (Secuencias de pasos, p. ej., `Extract`, `Transform`, `Load`).
- ❌ Cualquier cosa vagamente relacionada con el área de funcionalidad, “compra de productos”.
- ❌ Funciones que tienen prefijos o sufijos comunes en sus nombres.
- ❌ Funciones que requieren objetos grandes como argumentos, a pesar de usar solo unos pocos valores de esos objetos. (p. ej., `applyTaxes({ user, business, rewards, kitchenSink })` vs `applyTaxes({ subTotal })`)

Aunque no existe una única respuesta “correcta” para diseñar módulos, ayuda identificar 2 o 3 opciones de organización: dibuja un esquema, escribe código “de fantasía”, pregúntate “¿esto genera alegría?”

<aside>
📌 A menudo se necesitan varios intentos de organización de módulos antes de que tu Modelo de Dominio se consolide. No te obsesiones con la perfección.
</aside>

> Puede que sientas que `cart.sendReceipt()` no pertenece a los métodos relacionados con pagos. Quizás `customerNotifications.sendReceipt()` sea un mejor hogar para la mensajería al cliente. Si `CartHelper` tiene suficiente importancia, puede actuar como un **_controlador_** que internamente llama a todos los **_servicios_** necesarios, como `customerNotifications`.

#### ¿Cómo saber si estás ayudando?

Si la legibilidad no se resiente al eliminar argumentos ad-hoc, **¡FELICIDADES!!!** ¡Probablemente has construido un módulo con un alcance claro y duradero!

- Eliminar argumentos intermedios fuerza la aparición de 'capas'.
- _Debería_ ser difícil colocar código ad-hoc en el lugar equivocado.

Entonces, surge la pregunta: ¿dónde añadimos funcionalidad?

En mi experiencia, hay dos estrategias principales a evaluar al añadir funcionalidad:

1.  Extender/refactorizar el método existente. (Cuando el código nuevo es lo suficientemente cercano al código existente.)
2.  Crear una nueva (quinta) función en el lugar deseado de la cadena. (Asumiendo que el código nuevo no está relacionado con las funciones existentes.)

En última instancia, esto facilita decidir dónde pertenece la nueva funcionalidad. (Por ejemplo, `cart.applyDiscounts()`, `cart.applyTaxes()`, `rewards.getBalance()`.)

### Conclusión

Pasar estado a través de un pipeline complejo puede ser complicado. Sin embargo, con un poco de práctica de refactorización, te encontrarás escribiendo código más legible, con menos carga cognitiva.

¿Preguntas, comentarios, inquietudes? No dudes en contactarme en [@justsml](https://x.com/justsml) o por [correo electrónico](mailto:dan@danlevy.net).

#### Estén atentos a la próxima parte de la serie

Exploraremos la externalización del estado y la extensión de la funcionalidad en nuestro módulo.

#### Lecturas relacionadas

- [Existen luchas similares en el mundo de React basado en componentes.](https://kyleshevlin.com/quit-your-yapping)
````
