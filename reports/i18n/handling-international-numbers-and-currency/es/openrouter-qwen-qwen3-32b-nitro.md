# Translation Candidate
- Slug: handling-international-numbers-and-currency
- Locale: es
- Model: openrouter/qwen/qwen3-32b:nitro
- Target: src/content/posts/2024-08-29--handling-international-numbers-and-currency/es/index.mdx
- Validation: rejected: direct AI SDK translation failed
- Runtime seconds: 14.29
- Input tokens: 5986
- Output tokens: 5639
- Thinking tokens: unknown
- Cached input tokens: 1024
- Cache write tokens: 0
- Estimated cost: $0.001832
- Pricing source: local-openrouter-estimate
- Note: Command failed: git add src/content/posts/2024-08-29--handling-international-numbers-and-currency/es/index.mdx reports/i18n/handling-international-numbers-and-currency/es
## Raw Output

````mdx
---
social_image: ../desktop-social.webp
title: Comprensión de Números y Moneda Internacionales
subTitle: ''
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
- [Dinero: Localización (L10n) e internacionalización (i18n)](#dinero-localización-l10n-e-internacionalización-i18n)  
- [Conceptos clave](#conceptos-clave)  
  - [Los números son locales 🏘️](#los-números-son-locales-️)  
  - [La moneda es global 🌎](#la-moneda-es-global-️)  
  - [Cuándo importa el idioma](#cuándo-importa-el-idioma)  
- [Una solución](#una-solución)  
- [Pasos siguientes](#pasos-siguientes)  

## Dinero: Localización (L10n) e internacionalización (i18n)  

No son solo para dominar en una partida de Scrabble, la *localización* y la *internacionalización* se refieren al proceso de hacer que un producto **se sienta en casa en un país diferente**.  

<p class="breakout quote">Mostrar una moneda en el formato local incorrecto es un indicador evidente: no has invertido ningún esfuerzo.<br/>Si no puedes formatear un precio, ¿cómo manejarías el envío?</p>  

La internacionalización es un tema amplio, que abarca desde la traducción de textos hasta el formateo de fechas. En este artículo nos enfocaremos en un subtema específico: **formatear números y monedas**.  

Exploraremos el formateo entre tres países de la Zona Euro, Estados Unidos e India:

- `€1,234,567.89` Irlanda 🇮🇪  
- `1.234.567,89 €` Alemania 🇩🇪  
- `1 234 567,89 €` Francia 🇫🇷  
- `$1,234,567.89` Estados Unidos 🇺🇸  
- `₹12,34,567.89` India 🇮🇳  

¡Caos! ¿Verdad? ¡Hay símbolos, espacios en blanco y puntuación por todas partes! Es asombroso cómo la UE puede ponerse de acuerdo en algo. 😅  

## Conceptos críticos  

Antes de sumergirnos en soluciones, ¿qué queremos decir con "Los números son locales"?  

### Los números son locales 🏘️  

Cada región ([País según ISO 3166](https://en.wikipedia.org/wiki/List_of_ISO_3166_country_codes)) define reglas para formatear números.

Las reglas de formateo de números incluyen:

- Decimal: coma, punto.
- Miles: coma, punto, espacio.
- Posición y espaciado del símbolo de moneda.

### La moneda es global 🌎

Una `moneda` se refiere a una unidad específica de dinero. (Ver [ISO 4217](https://en.wikipedia.org/wiki/ISO_4217#Active_codes_(list_one)) para la lista.)

- Especifica un símbolo: `$`, `€`, `£`, `¥`. (A menudo se reutiliza.)
- Siempre tiene un código de tres letras: `USD`, `EUR`, `GBP`, `JPY`.
- Puede usarse/cambiarse en "cualquier" país. En teoría.
- Convertir entre monedas requiere datos de tipo de cambio.
- El valor no cambia según la configuración regional.

### Cuando importa la configuración regional

La mayoría de las APIs REST de comercio electrónico/pagos trabajan con `price` + `currencyCode`. ¿Por qué no usan locales?

Los locales suelen configurarse a nivel del sistema operativo/dispositivo, y los navegadores los exponen mediante `navigator.language`. Dado que cada uno de tus usuarios podría tener un locale diferente, tiene sentido formatear números y monedas del lado del cliente.

## Una solución

¡Buena noticia! Los lenguajes de programación modernos tienen soporte integrado para esto. En JavaScript, contamos con la clase [`Intl`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl) y `Intl.NumberFormat`:

Veamos un ejemplo de código:

```javascript
const number = 1_234_567.89;

/**
 * Formatea un número en moneda local.
 * @param {number} amount - El monto a formatear.
 * @param {string} currency - El código de moneda de tres letras.
 * @param {string} [locale] - El locale del usuario.
 */
const formatMoney = (amount, currency, locale = navigator.language) =>
  new Intl.NumberFormat(locale, { currency, style: 'currency' })
    .format(amount);

console.log('🇩🇪 ' + formatMoney(number, 'EUR', 'de-DE'));
console.log('🇮🇪 ' + formatMoney(number, 'EUR', 'ga-IE'));
console.log('🇫🇷 ' + formatMoney(number, 'EUR', 'fr-FR'));
```

Si necesitas operaciones más avanzadas, como calcular impuestos, aplicar descuentos o convertir entre monedas, deberías usar una biblioteca como [dinero.js](https://v2.dinerojs.com/).

## Pasos siguientes

Según sus necesidades específicas, puede explorar conceptos relacionados:

- Mejores prácticas con el idioma del usuario. Detectar + permitir anulaciones. (p. ej., un menú desplegable de países.)
- Almacenamiento de enteros completos (almacenar céntimos, no dólares.)
- Matemáticas con dinero. (p. ej., aplicar un cupón de `20% de descuento`, calcular `subtotal + impuestos`, etc.)
- Tasas de cambio en vivo. (Para compras minoristas, cambios de divisas/forex.)

<p class="breakout quote">¡Hágamelo saber si le gustaría ver un artículo futuro sobre estos temas!</p>

**JavaScript / TypeScript**

- [dinero.js](https://v2.dinerojs.com/) admite matemáticas con dinero, tasas de cambio, formato y análisis!

**Rust**

- [rusty_money](https://crates.io/crates/rusty_money) es mi biblioteca preferida de Rust.

**Go**

- [currency](https://github.com/bojanz/currency) es mi elección actual en Golang.
`}}`
````
