# Translation Candidate
- Slug: from-zero-to-regex-hero-extract-url-like-strings
- Locale: es
- Model: qwen/qwen3.5-9b
- Target: src/content/posts/2024-12-29--from-zero-to-regex-hero-extract-url-like-strings/es/index.mdx
- Validation: rejected: direct AI SDK translation failed
- Runtime seconds: 216.50
- Input tokens: unknown
- Output tokens: unknown
- Thinking tokens: unknown
- Cached input tokens: unknown
- Cache write tokens: unknown
- Estimated cost: unknown
- Pricing source: unknown
- Note: Command failed: bun run i18n:translate:chunked -- --slug from-zero-to-regex-hero-extract-url-like-strings --locale es --model qwen/qwen3.5-9b --chunk 6p --run-id 2026-05-13T18-15-57-947Z-61322 --run-lock-path /Users/dan/code/oss/dans-blog/.git/codex-i18n-translation-run.json --quiz-concurrency 24 (code 1)
## Raw Output

````mdx
---
title: De cero a héroe del Regex
subTitle: Extraer y analizar cadenas tipo URL con una sola expresión regular
category: Regex
subCategory: Data Extraction
date: '2024-12-29'
modified: '2025-01-06'
tags:
  - regex
  - url
  - data-extraction
  - data-processing
social_image: ../desktop-social.webp
cover_full_width: ../regex-url-parsing-wide.webp
cover_mobile: ../regex-url-parsing-square-200.webp
cover_icon: ../regex-url-parsing-square-200.webp
---
import { CodeTabs } from '../../../../components/CodeTabs';

**Tabla de Contenidos**

- 🚀 [Introducción](#-introduction)
- 🔍 [Extracción de URLs a partir de texto](#-extracting-urls-from-text)
- 🛳️ [La expresión regular de más de 120 bytes](#️-the-120-byte-regex)
- 🧩 [Desglose paso a paso](#-breaking-it-down-step-by-step)
- 🛠️ [Ejemplo de análisis](#-pa)
- ☑️ [Próximos pasos](#-next-steps)
- 📝 [Resumen](#-summary)
- 📚 [Aprendizaje adicional](#-further-learning)

**TL;DR:** Salta directamente a la [expresión regular de más de 120 bytes](#️-the-120-byte-regex).

## 🚀 Introducción

Extraer URLs de texto sin procesar a veces se siente como jugar a un tedioso juego de matar topos. La puntuación, los delimitadores entre paréntesis y el formato ambiguo conspiran para complicar el proceso. Ya sea que estés desarrollando un scraper web, un analizador de datos o una aplicación de chat, garantizar la precisión en la extracción de URLs es un requisito fundamental.

En esta publicación, abordaremos el problema de frente con un enfoque flexible de dos pasos. Nuestro objetivo es **capturar primero todas las cadenas con aspecto de URL _potenciales_** y luego gestionar la validación en un proceso posterior.

> 💡 **Nota:** ¡Este patrón no sirve para **_validar_** URLs! Es intencionalmente permisivo con la puntuación y los errores ortográficos.

## 🔍 Objetivo: Extraer URLs del texto

Al extraer URLs de texto sin procesar, un enfoque de dos pasos es efectivo:

1. **Capturar todo lo que parezca URL**: Extender una red amplia para atrapar todas las cadenas que *podrían* ser URLs. Aquí es donde destaca nuestra "expresión regular de más de 120 bytes".
2. **Validar**: Una vez capturados estos candidatos, utiliza comprobaciones secundarias (p. ej., resolución DNS, comparación con dominios conocidos) para descartar las entradas inválidas.

### Visualizar el desafío

Los términos `extract` y `parse` suelen emplearse de forma indistinta, aunque denotan procesos distintos. Extraer URLs implica identificar y capturar cadenas candidatas a partir de un texto más extenso. Por el contrario, el `parse` consiste en descomponer esas URLs en sus componentes.

Cuando menciono `parse` o "partes de una URL", me refiero a los siguientes componentes:

<figure>
  <figcaption>Las 5 partes de cualquier URL</figcaption>
![Anatomía de una URL, visualizada](../WhatUrlsAreMadeOf-ColorMatched.svg "Anatomía de una URL, visualizada")
</figure>

<details class="inset breakout">
  <summary>Haz clic para ver una captura de pantalla de la coincidencia de subcadenas en RegEx101.</summary>

  Antes de profundizar demasiado en la expresión regular, utilicemos una herramienta visual para verificar qué tan bien captura coincidencias múltiples nuestro patrón:

  <figure>
    <figcaption>Uso de [RegEx101.com](https://regex101.com/r/jO8bC4/69) para visualizar coincidencias en varias líneas</figcaption>
    ![Vista previa de coincidencias masivas en varias líneas](../RegEx101-Matches-Screenshot.webp "Vista previa de resultados masivos en varias líneas")
  </figure>
</details>

## La expresión regular de más de 120 bytes

A continuación se presenta una expresión regular compacta, diseñada para extraer y analizar URLs en un solo paso. Soporta diversos protocolos, dominios, rutas y secciones opcionales de consulta (query) y fragmento.

No te preocupes, lo desglosaremos paso a paso.

```js title="Regex de URL de más de 120 bytes" frame="code"
const urlRegex = /([-.a-z0-9]+:\/{1,3})([^-\/\.[\](|)\s?][^`\/\s\]?]+)([-_a-z0-9!@$%^&*()=+;/~\.]*)[?]?([^#\s`?]*)[#]?([^#\s'"`\.,!]*)/gi;
// Compatibilidad: ES5+

// Mismo patrón, dividido en líneas para mayor legibilidad:
([-.a-z0-9]+:\/{1,3})
([^-\/\.[\](|)\s?][^`\/\s\]?]+)
([-_a-z0-9!@$%^&*()=+;/~\.]*)
[?]?([^#\s`?]*)
[#]?([^#\s'"`\.,!]*)

```

<blockquote class="inset">Comparte las expresiones regulares más salvajes que hayas encontrado (o creado) en los <a href="#post-comments">comentarios a continuación!</a> 🚀</blockquote>

## 🧩 Desglosando paso a paso

Diseccionamos la expresión regular en sus componentes para entender cómo opera:

<h3>1. Protocolo (Grupo 1): <code>{`([-.a-z0-9]+:\/{1,3})`}</code></h3>

<ul>
  <li>**Propósito:** Coincide con la sección del protocolo de la URL (p. ej., `http://`, `ftp://`, `custom-scheme://`).</li>
  <li>
    **Explicación:**
    <ul>
      <li><code>[-.a-z0-9]+</code>: Coincide con una o más letras minúsculas, dígitos, guiones o puntos (frecuentes en esquemas de protocolo).</li>
      <li><code>{`:\/{1,3}`}</code>: Coincide con dos puntos seguidos de una a tres barras (<code>:/</code>, <code>://</code> o <code>:///</code>).</li>
    </ul>
  </li>
</ul>

<h3>2. Dominio (Grupo 2): <code>{`([^-\/\.[\](|)\s?][^\`\/\s\]?]+)`}</code></h3>

<ul>
  <li>**Propósito:** Captura la parte del dominio o host de la URL.</li>
  <li>
    **Explicación:**
    <ul>
      <li><code>[^-\/\.[\](|)\s?]</code>: Coincide con cualquier carácter salvo los caracteres especiales y espacios en blanco especificados.</li>
      <li><code>[^`\/\s\]?]+</code>: Coincide con uno o más caracteres salvo comillas invertidas, barras, espacios en blanco o corchetes de cierre.</li>
    </ul>
  </li>
</ul>

<h3>3. Ruta (Grupo 3): <code>{`([-_a-z0-9!@$%^&*()=+;/~\\.]*)`}</code></h3>

<ul>
  <li>**Propósito:** Coincide con el componente de ruta de la URL.</li>
  <li>
    **Explicación:**
    <ul>
      <li><code>[-_a-z0-9!@$%^&*()=+;/~\.]*</code>: Coincide con cero o más caracteres seguros para URL, comunes en las rutas.</li>
    </ul>
  </li>
</ul>

<h3>4. Query (Grupo 4): <code>[?]?([^#\s`?]*)</code></h3>

<ul>
  <li>**Propósito:** Coincide opcionalmente con una cadena de consulta, que comienza con cualquier carácter <code>?</code>.</li>
  <li>
    **Explicación:**
    <ul>
      <li><code>[?]?</code>: Coincide opcionalmente con un <code>?</code>. (Los corchetes no son estrictamente necesarios, pero resultan un poco más claros que el ultraconciso doble <code>??</code>. Además, establecen un paralelismo visual con el siguiente grupo de coincidencia (similar) <code>[#]?</code>.)</li>
      <li><code>([^#\s`?]*)</code>: Coincide con cero o más caracteres que no sean hash, espacio en blanco, acento invertido o signo de interrogación.</li>
    </ul>
  </li>
</ul>

<h3>5. Fragmento (Grupo 5): <code>[#]?([^#\s'"`\.,!]*)</code></h3>

<ul>
  <li>**Propósito:** Coincide opcionalmente con el identificador de fragmento, que comienza con un <code>#</code>.</li>
  <li>
    **Explicación:**
    <ul>
      <li><code>[#]?</code>: Coincide opcionalmente con un <code>#</code>.</li>
      <li><code>([^#\s'"`\.,!]*)</code>: Coincide con cero o más caracteres que no sean puntuación prohibida ni espacio en blanco.</li>
    </ul>
  </li>
</ul>

## 🛠️ Ejemplo de análisis

Así es como puedes ejecutar este regex con un poco de JavaScript:

<CodeTabs client:only
 tabs={[
    "Código: Extraer URLs",
    "Resultados: URLs extraídas",
    "Resultados: Componentes de la URL",
  ]} >
```js title="extract-urls.js" frame="code"
const text = `
Check this out: https://example.com/path?query=123#section
And also (ftp://files.server.org/index).
Plus a weird one: custom-scheme://host/param;weird^stuff
`;

const urlRegex =
  /([-.a-z0-9]+:\/{1,3})([^-\/\.[\](|)\s?][^`\/\s\]?]+)([-_a-z0-9!@$%^&*()=+;/~\.]*)[?]?([^#\s`?]*)[#]?([^#\s'"`\.,!]*)/gi;

const matches = [
  ...text.matchAll(urlRegex),
].map((match) => match[0]);
console.log("Extracted URLs:", matches);

const parts = [
  ...text.matchAll(urlRegex),
].map((match) => match.slice(1));
console.log("Extracted Parts:", parts);
```

```json title="extracted-urls.json"
[
  "https://example.com/path?query=123#section",
  "ftp://files.server.org/index",
  "custom-scheme://host/param;weird^stuff"
]
```

```json title="urls-parts.json"
[
  [
    "https://",    // Protocol
    "example.com", // Domain
    "/path",       // Path
    "query=123",   // Query
    "section"      // Fragment
  ],
  [
    "ftp://",           // Protocol
    "files.server.org", // Domain
    "/index",           // Path
    "",                 // Query
    ""                  // Fragment
  ],
  [
    "custom-scheme://",   // Protocol
    "host",               // Domain
    "/param;weird^stuff", // Path
    "",                   // Query
    ""                    // Fragment
  ]
]
```

</CodeTabs>

## ☑️ Siguientes pasos

Dependiendo de tu caso de uso, podrías necesitar ajustar este regex o agregar más pasos de validación y postprocesamiento.

### Diferentes proyectos, diferentes necesidades

Los proyectos presentan requisitos y preocupaciones de seguridad diversos:

1. **Web Scraping**: Validar URLs para garantizar accesibilidad y confianza.
2. **Procesamiento de datos**: Extraer URLs de contenido generado por usuarios manteniendo controles de seguridad.
3. **Análisis de datos**: Filtrar duplicados o enlaces irrelevantes para investigación o marketing.
4. **Aplicaciones para el usuario**: Generar hipervínculos automáticos en chats o foros.

### Postprocesamiento y validación

Una vez recopiladas las URLs candidatas, aplicar verificaciones adicionales:

- **Consulta DNS**: Verificar resolución de dominios.
- **Verificaciones de seguridad**: Utilizar servicios para detectar sitios maliciosos o de phishing.
- **Reglas personalizadas**: Aplicar filtros específicos del proyecto (p. ej., TLDs permitidos, longitud máxima de URL).

## 📝 Resumen

Extraer datos de cadenas semiestructuradas suele ser la parte más satisfactoria del dominio de las expresiones regulares.

Aquí tienes un resumen de los puntos clave:

- **Usa una herramienta visual para escribir, probar** y comprender tus [patrones de regex.](https://regex101.com/r/jO8bC4/69)
- **Divide el desafío en partes** y resuélvelas por separado. En cierto sentido, los grupos de captura actúan como 'marcadores de ruta' figurativos para nuestra regex.
- **Utiliza expresiones de coincidencia 'flexibles', evita la conformidad estricta con la especificación** durante la ingestión de datos.
- **Aplicar pasos de validación** tras la extracción inicial es imprescindible; considera siempre la seguridad de tu proyecto y sus requisitos específicos.

Al seguir estos pasos, podrás extraer de manera efectiva cualquier dato en cadena semiestructurada, sentando las bases para un posterior procesamiento y validación.

## 📚 Recursos para profundizar

- No olvides probar el [demo en vivo en RegEx101.com](https://regex101.com/r/jO8bC4/69)!
- Pregunta original en StackOverflow y un [enlace a mi respuesta aquí](https://stackoverflow.com/a/34669019/369727).
- [Documentación de MDN sobre Expresiones Regulares](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions)
- [Técnicas avanzadas de regex](https://www.regular-expressions.info/): Explora lookahead, lookbehind y otros patrones avanzados para lograr coincidencias más precisas.
- [RFC 3986 - Sintaxis genérica de URI](https://datatracker.ietf.org/doc/html/rfc3986)
````
