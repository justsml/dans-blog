# Translation Candidate
- Slug: you-may-not-need-axios
- Locale: es
- Model: openrouter/openai/gpt-oss-120b:nitro
- Target: src/content/posts/2018-11-15--you-may-not-need-axios/es/index.mdx
- Validation: passed
- Runtime seconds: 15.45
- Input tokens: 13729
- Output tokens: 3515
- Thinking tokens: unknown
- Cached input tokens: 3968
- Cache write tokens: 0
- Estimated cost: $0.001168
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
social_image: ../desktop-social.webp
title: Quizás no necesites Axios
subTitle: ¡Fetch API al rescate!
date: '2018-11-14'
modified: '2024-08-21'
tags:
  - programming
  - patterns
  - examples
  - nodejs
  - javascript
  - promises
  - axios
  - fetch
category: Guides
subCategory: fetch
cover: ../brock-dupont-575648-unsplash.webp
cover_mobile: ../w300_brock-dupont-575648-unsplash.webp
cover_icon: ../icon_brock-dupont-575648-unsplash.webp
---
import Gist from '../../../../../components/Gist/index.astro'

## Puede que no necesites Axios

<p class="breakout call-to-action">Esto **no es un ataque** a [Axios](https://www.npmjs.com/package/axios). <br />

Más bien, es **defensa del API `fetch`, que ya se ha vuelto bastante capaz**. 🦄</p>

### Visión general

Este artículo es una recopilación de los fragmentos de código “faltantes” de `fetch` y de casos de uso comunes que desearía fueran más fáciles de encontrar.

- [Visión general](#overview)
- [Comparación de características](#feature-comparison)
- [Recetas de fetch](#fetch-recipes)
  - [Obtener JSON desde una URL](#get-json-from-a-url)
  - [Encabezados personalizados](#custom-headers)
  - [Manejo de errores HTTP](#http-error-handling)
  - [Ejemplo CORS](#cors-example)
  - [Publicar JSON](#posting-json)
  - [Publicar un `<form>` HTML](#posting-an-html-form)
  - [Datos codificados en formulario](#form-encoded-data)
  - [Subir un archivo](#uploading-a-file)
  - [Subir varios archivos](#uploading-multiple-files)
  - [Tiempos de espera (timeouts)](#timeouts)
  - [Helper de progreso de descarga](#download-progress-helper)
  - [Helper de reintentos recursivos](#recursive-retry-helper)
  - [Manejo de redirecciones HTTP](#handling-http-redirects)
  - [Cancelar una solicitud fetch](#canceling-a-fetch-request) ✨nuevo✨
- [Compatibilidad](#compatibility)

> ¿Tu caso de uso no está listado? [Déjame saber ✉️](../contact/)

<br />

### Comparación de características

|                                                 | fetch    | axios    | request |
|-------------------------------------------------|:--------:|:--------:|:-------:|
| Interceptar solicitud y respuesta               |✅        |✅         |✅       |
| Transformar datos de solicitud y respuesta      |✅        |✅         |✅       |
| Cancelar solicitudes                            |✅        |✅         |❌       |
| Transformaciones automáticas para datos JSON   |helpers manuales |✅         |✅       |
| Soporte del lado cliente para proteger contra XSRF |✅        |✅         |✅       |
| Progreso                                        |✅        |✅         |✅       |
| Transmisión                                     |✅        |✅         |✅       |
| Redirecciones                                   |✅        |✅         |✅       |

<br /><br />

Al iniciar este artículo (finales de 2018, actualizado en 2024) asumí que terminaría con una tabla de casillas mixtas. Seguramente existen casos de uso especiales que justifican [`axios`](https://www.npmjs.com/package/axios), [`request`](https://www.npmjs.com/package/request), [`r2`](https://www.npmjs.com/package/r2), [`superagent`](https://www.npmjs.com/package/superagent), [`got`](https://www.npmjs.com/package/got), etc.

Pues bien, al final, **sobreestimé la necesidad de bibliotecas HTTP de terceros**.

A pesar de haber usado `fetch` durante varios años (incluyendo tareas no triviales: cargas de archivos y soporte de errores/reintentos) todavía tenía ideas equivocadas sobre las capacidades y limitaciones de `fetch`.

El `fetch` nativo no analiza automáticamente respuestas JSON ni serializa cuerpos de solicitud JSON. Se llama a `response.json()` al volver y a `JSON.stringify()` al salir. Axios sigue ganando en esa ergonomía; el argumento a favor de `fetch` es que un pequeño helper suele cubrir esa brecha.

Bien, veamos qué puede hacer `fetch`...

## Recetas con fetch

### Obtener JSON de una URL

<Gist path='justsml/de941bd61cc86e30beedbb8a3a646f81'></Gist>

### Encabezados personalizados

<Gist path='justsml/fca7cd72ec1ebc07d994eac13a665ddf' />

### Manejo de errores HTTP

<Gist path='justsml/81919a72897ebc503c6b34a556a9bde2' />

### Ejemplo de CORS

CORS se verifica principalmente en el servidor, así que asegúrate de que la configuración sea correcta del lado del servidor.

La opción `credentials` controla si tus cookies se incluyen automáticamente.

<Gist path='justsml/3ddd9ed8705f48cdf45d313d1e57aa2a' />

### Envío de JSON

<Gist path='justsml/13915347d6c8413c73f4bd7240c68e51' />

### Envío de un `<form>` HTML

<Gist path='../justsml/ef2e356bec0ef7c6e528d84a5f75ba7e' />

### Datos codificados de formulario

Para enviar datos con un **Content-Type** de `application/x-www-form-urlencoded` utilizaremos `URLSearchParams` para codificar la información como una cadena de consulta.

Por ejemplo, `new URLSearchParams({a: 1, b: 2})` produce `a=1&b=2`.

<Gist path='../justsml/716c4534ef4afb22f65d4fc4367c7136' />

### Subiendo un archivo

<Gist path='../justsml/301f22aa37df565ba3051bd5f95b4df1' />

### Subiendo varios archivos

Configura un elemento de carga de archivos con el atributo `multiple`:

<Gist path='../justsml/37836357041d8ca4d1b32e12638cb0ba' />

Luego úsalo con algo como:

<Gist path='../justsml/d17f50c36a5ddb70f584c0aa6de94237' />

### Timeouts

Aquí tienes un timeout genérico basado en Promise, usando el patrón de **Aplicación Parcial**. Funciona con cualquier interfaz Promise. No cargues demasiado trabajo en la cadena de promesas suministrada; seguirá ejecutándose y cualquier error puede generar fugas de memoria a largo plazo.

<Gist path='../justsml/f93b2ef6457b3e52eb995831b67cab85' />

Y un ejemplo más elaborado, que incluye una bandera de seguimiento `__timeout` para que puedas **interceptar cualquier operación costosa**.

<Gist path='../justsml/5e492db8997a4f7e22e61b7486cbf273' />

### Helper de Progreso de Descarga

El progreso de carga todavía presenta algunos fallos fuera de Chrome.

La técnica del **Manejador de Progreso** mostrada a continuación evita envolver la llamada a `fetch` en un cierre. 👍

`progressHelper` tiene la siguiente interfaz (código fuente disponible más abajo)

<Gist path='../justsml/db5ccc55ffb93c75e04e014d1f553cfb' />

Veamos un ejemplo de uso:

<Gist path='../justsml/9bec219590ff50688972c1caff67c14b' />

Un descargador de imágenes reutilizable podría ser `getBlob()`:

<Gist path='../justsml/bef2dd7e630eb7642beb3e2be29489b2' />

Por cierto, un `Blob` es un Binary Large Object.

Es importante elegir UNA de las 2 patrones de uso a continuación (son funcionalmente equivalentes):

<Gist path='../justsml/6ad9e37a96ad1f3a75ca509038510a5b' />

Mi preferencia es `Option #1`. Sin embargo, el diseño de tu alcance podría obligarte a usar `Option #2`.

Finalmente, aquí está la última parte de esta receta, nuestro `progressHelper`:

##### Source: Progress Helper

<Gist path='../justsml/a8ffd810fc7e5a5295dfc898302ddbfc' />

_credit:_ Agradecimientos especiales a Anthum Chris y su [fantástico PoC de Progress+Fetch mostrado aquí](https://github.com/AnthumChris/fetch-progress-indicators)

### Recursive Retry Helper

<Gist path='../justsml/7e52521a0af50fa590be57d5b4593120' />

### Manejo de redirecciones HTTP

<Gist path='../justsml/3dd0a799ada8da7cd15943ff254266de' />

### Cancelar una solicitud fetch

<Gist path='../justsml/7f257ac3de3c7792db8485588c54e938' />

### Compatibilidad

A partir de 2022, la API `fetch` está [ampliamente soportada](https://caniuse.com/#feat=fetch) en todos los navegadores modernos y en versiones más recientes de NodeJS v18+.

Si necesitas compatibilidad con IE, puedes [polyfill fetch](https://github.com/github/fetch#browser-support) usando el paquete `github/fetch` (mantenido por un equipo excelente en GitHub). Es posible retroceder hasta [IE8](https://github.com/camsong/fetch-ie8) — _los resultados pueden variar_.

Las versiones anteriores de NodeJS pueden aprovechar la API `fetch` con el paquete [`node-fetch`](https://www.npmjs.com/package/node-fetch):

```sh
npm install node-fetch
```

_Después de polyfill + node-fetch: 99.99 % compatible_ ✅

> Por favor, [tuitea a mí](https://x.com/justsml) si tienes otros _Casos de Uso_ que te gustaría ver. ❤️
````
