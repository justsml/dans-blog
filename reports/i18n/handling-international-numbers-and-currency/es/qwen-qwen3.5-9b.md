# Translation Candidate
- Slug: handling-international-numbers-and-currency
- Locale: es
- Model: qwen/qwen3.5-9b
- Target: src/content/posts/2024-08-29--handling-international-numbers-and-currency/es/index.mdx
- Validation: rejected: direct AI SDK translation failed
- Runtime seconds: 240.02
- Input tokens: unknown
- Output tokens: unknown
- Thinking tokens: unknown
- Cached input tokens: unknown
- Cache write tokens: unknown
- Estimated cost: unknown
- Pricing source: unknown
- Note: Command failed after 240000ms: bun run i18n:translate:chunked -- --slug handling-international-numbers-and-currency --locale es --model qwen/qwen3.5-9b --chunk 6p --run-id 2026-05-13T18-15-57-947Z-61322 --run-lock-path /Users/dan/code/oss/dans-blog/.git/codex-i18n-translation-run.json --quiz-concurrency 24
## Raw Output

````mdx
---
social_image: ../desktop-social.webp
title: Entender números y monedas internacionales
subTitle: Dinero localizado explicado
draft: false
date: '2024-08-28'
modified: '2024-09-03'
tags:
  - engineering
  - internationalization
  - localization
  - currency
  - numbers
category: HowTo
subCategory: Internationalization
cover_full_width: ../currency-banner-wide.webp
cover_mobile: ../currency-banner-pic__w200.webp
cover_icon: ../currency-banner-pic__w200.webp
---
- [Dinero: Localización (L10n) e Internacionalización (i18n)](#money-localization-l10n-and-internationalization-i18n)
- [Conceptos Críticos](#critical-concepts)
  - [Los números son locales 🏘️](#numbers-are-local-️)
  - [La moneda es global 🌎](#currency-is-global-️)
  - [Cuándo importa la configuración regional](#when-locale-matters)
- [Una solución](#a-solution)
- [Próximos pasos](#next-steps)

## Dinero: Localización (L10n) e Internacionalización (i18n)

No son solo para dominar una partida de Scrabble; _localización_ e _internacionalización_ se refieren al proceso de hacer que un producto **se sienta en casa en otro país.**

<p class="breakout quote">Mostrar una moneda con un formato local incorrecto es una señal inequívoca: no has hecho ningún esfuerzo.<br/>Si no sabes formatear un precio, ¿cómo podrías gestionar el envío?</p>

La internacionalización es un tema amplio que abarca desde la traducción de texto hasta el formato de fechas. En este artículo nos centraremos en un subtema concreto: **el formato de números y monedas.**

Analicemos el formato entre tres países de la zona euro, Estados Unidos e India:

- `€1,234,567.89` Irlanda 🇮🇪
- `1.234.567,89 €` Alemania 🇩🇪
- `1 234 567,89 €` Francia 🇫🇷
- `$1,234,567.89` EE. UU. 🇺🇸
- `₹12,34,567.89` India 🇮🇳

¡Caos! ¿Verdad? Símbolos, espacios en blanco y puntuación por todos lados. Es impresionante cómo la UE logra ponerse de acuerdo en algo. 😅

## Conceptos Críticos

Antes de entrar en las soluciones, ¿qué significa exactamente "Los números son locales"?

### Los números son locales 🏘️

Cada configuración regional ([Códigos de país ISO 3166](https://en.wikipedia.org/wiki/List_of_ISO_3166_country_codes)) define las reglas para dar formato a los números.

Las reglas de formato numérico incluyen:

- Decimal: coma, punto.
- Miles: coma, punto, espacio.
- Posición y espaciado del símbolo de moneda.

### La moneda es global 🌎

Una `currency` hace referencia a una unidad monetaria específica. (Consulta [ISO 4217](https://en.wikipedia.org/wiki/ISO_4217#Active_codes_(list_one)) para ver la lista.)

- Define un símbolo: `$`, `€`, `£`, `¥`. (A menudo reutilizado.)
- Siempre cuenta con un código de tres letras: `USD`, `EUR`, `GBP`, `JPY`.
- Puede utilizarse o intercambiarse en "cualquier" país. En teoría.
- La conversión entre monedas requiere datos de tipos de cambio.
- El valor no se modifica según la configuración regional.

### Cuándo importa la configuración regional

La mayoría de las APIs REST de e-commerce o pagos manejan `price` + `currencyCode`. ¿Por qué no se incluyen los locales?

Los locales se definen (por lo general) a nivel del sistema operativo o dispositivo, y los navegadores los exponen mediante `navigator.language`. Dado que cada usuario puede tener una configuración regional distinta, formatear números y monedas en el cliente es la única opción sensata.

## Una solución

Buena noticia: los lenguajes de programación modernos incluyen soporte nativo para esto. En JavaScript, contamos con la clase [`Intl`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl) y `Intl.NumberFormat`.

Veamos el código:

```javascript
const number = 1_234_567.89;

/**
 * Format a number in local currency.
 * @param {number} amount - The amount to format.
 * @param {string} currency - The 3-letter currency code.
 * @param {string} [locale] - The users locale string.
 */
const formatMoney = (amount, currency, locale = navigator.language) =>
  new Intl.NumberFormat(locale, { currency, style: 'currency' })
    .format(amount);

console.log('🇩🇪 ' + formatMoney(number, 'EUR', 'de-DE'));
console.log('🇮🇪 ' + formatMoney(number, 'EUR', 'ga-IE'));
console.log('🇫🇷 ' + formatMoney(number, 'EUR', 'fr-FR'));
```

Si necesitas operaciones más complejas, como calcular impuestos, aplicar descuentos o convertir entre monedas, te convendrá usar una librería como [dinero.js](https://v2.dinerojs.com/).

## Próximos pasos

Según tus necesidades específicas, te convendrá explorar conceptos relacionados:

- Buenas prácticas con la configuración regional del usuario. Detectar + permitir anulaciones. (p. ej., un selector de país.)
- Persistencia de enteros (almacenar centavos, no dólares.)
- Operaciones monetarias. (p. ej., aplicar un cupón de `20% de descuento`, calcular `subTotal + impuestos`, etc.)
- Tasas de cambio en tiempo real. (Para compras minoristas, divisas o intercambios de moneda.)

<p class="breakout quote">¡Avísame si te gustaría ver un artículo futuro sobre estos temas!</p>

{/* ## Recomendaciones

Algunas librerías pueden ayudarte con estas tareas:

**JavaScript / TypeScript**

- [dinero.js](https://v2.dinerojs.com/) soporta cálculos monetarios, tasas de cambio, formato y análisis de cadenas.

**Rust**

- [rusty_money](https://crates.io/crates/rusty_money) es mi librería preferida para Rust.

**Go**

- [currency](https://github.com/bojanz/currency) es mi opción actual para Golang.
 */}
````
