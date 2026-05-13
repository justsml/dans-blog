# Translation Candidate
- Slug: from-zero-to-regex-hero-extract-url-like-strings
- Locale: es
- Model: deepseek/deepseek-v4-flash
- Target: src/content/posts/2024-12-29--from-zero-to-regex-hero-extract-url-like-strings/es/index.mdx
- Validation: deferred
- Runtime seconds: 79.60
- Input tokens: 10534
- Output tokens: 8982
- Thinking tokens: unknown
- Cached input tokens: 384
- Cache write tokens: 0
- Estimated cost: $0.003937
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
title: De cero a héroe en regex
subTitle: Extraer y analizar cadenas tipo URL con una sola regex
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
import { CodeTabs } from '../../../../../components/CodeTabs';

**Tabla de contenidos**

- 🚀 [Introducción](#-introduction)
- 🔍 [Extraer URLs de texto](#-extracting-urls-from-text)
- 🛳️ [La regex de 120+ bytes](#️-the-120-byte-regex)
- 🧩 [Desglose paso a paso](#-breaking-it-down-step-by-step)
- 🛠️ [Ejemplo de análisis](#-pa)
- ☑️ [Próximos pasos](#-next-steps)
- 📝 [Resumen](#-summary)
- 📚 [Más aprendizaje](#-further-learning)

**TL;DR:** Salta directamente a la [regex de 120+ bytes](#️-the-120-byte-regex).

## 🚀 Introducción

Extraer URLs de texto sin formato a veces puede sentirse como jugar un tedioso juego de golpear topos. La puntuación, los paréntesis y el formato ambiguo conspiran para frustrar tus esfuerzos. Ya sea que estés construyendo un raspador web, un analizador de datos o una aplicación de chat, extraer URLs con precisión es esencial.

En este artículo, abordaremos el problema de frente con un enfoque flexible de dos pasos. Nuestro objetivo es **capturar primero todas las cadenas _potencialmente_ similares a URLs** y luego manejar la validación en un proceso posterior.

> 💡 **Nota:** ¡Este patrón no es para **_validar_** URLs! Es intencionalmente permisivo con la puntuación y la ortografía incorrecta.

## 🔍 Objetivo: Extraer URLs de Texto

Al extraer URLs de texto sin formato, un enfoque de dos pasos es efectivo:

1. **Capturar todo lo que parezca una URL**: Lanza una red amplia para atrapar todas las cadenas que *podrían* ser URLs. Aquí es donde brilla nuestra "regex de 120+ bytes".
2. **Validar**: Una vez capturados estos candidatos, usa comprobaciones secundarias (por ejemplo, resolución DNS, comparación contra dominios conocidos) para eliminar entradas inválidas.

### Visualizando el Desafío

Términos como `extract` y `parse` suelen usarse indistintamente, pero se refieren a procesos distintos. Extraer URLs implica identificar y capturar posibles URLs de un cuerpo de texto más grande. Analizar (parsear), en cambio, implica descomponer esas URLs en sus partes constituyentes.

Cuando menciono el análisis o las 'partes de una URL', me refiero a los siguientes componentes:

<figure>
  <figcaption>Las 5 partes de toda URL</figcaption>
![Anatomía de una URL, visualizada](../WhatUrlsAreMadeOf-ColorMatched.svg "Anatomía de una URL, visualizada")
</figure>

<details class="inset breakout">
  <summary>Haz clic para ver una captura de pantalla del emparejamiento de subcadenas en RegEx101.</summary>

  Antes de meternos de lleno en la expresión regular, usemos una herramienta visual para ver qué tan bien captura mi patrón múltiples coincidencias:

  <figure>
    <figcaption>Usando [RegEx101.com](https://regex101.com/r/jO8bC4/69) para visualizar coincidencias multilínea</figcaption>
    ![Vista previa de coincidencias multilínea 'en bloque'](../RegEx101-Matches-Screenshot.webp "Vista previa de resultados multilínea 'en bloque'")
  </figure>
</details>

## La regex de 120+ bytes

A continuación se muestra una expresión regular concisa diseñada para extraer y analizar URLs de una sola pasada. Soporta varios protocolos, dominios, rutas y secciones opcionales de consulta/fragmento.

No te preocupes, lo desglosaremos paso a paso.

```js title="Regex de URL de 120+ bytes" frame="code"
const urlRegex = /([-.a-z0-9]+:\/{1,3})([^-\/\.[\](|)\s?][^`\/\s\]?]+)([-_a-z0-9!@$%^&*()=+;/~\.]*)[?]?([^#\s`?]*)[#]?([^#\s'"`\.,!]*)/gi;
// Compatibility: ES5+

// Same pattern, split on newlines for readability:
([-.a-z0-9]+:\/{1,3})
([^-\/\.[\](|)\s?][^`\/\s\]?]+)
([-_a-z0-9!@$%^&*()=+;/~\.]*)
[?]?([^#\s`?]*)
[#]?([^#\s'"`\.,!]*)

```

<blockquote class="inset">Comparte las regex más salvajes que hayas encontrado (o creado) en los <a href="../#post-comments">comentarios abajo</a> 🚀</blockquote>

## 🧩 Desglosándolo paso a paso

Desglosemos la regex en sus componentes para entender cómo funciona:

<h3>1. Protocolo (Grupo 1): <code>{`([-.a-z0-9]+:\/{1,3})`}</code></h3>

<ul>
  <li>**Propósito:** Captura la parte del protocolo de la URL (p. ej., `http://`, `ftp://`, `custom-scheme://`).</li>
  <li>
    **Explicación:**
    <ul>
      <li><code>[-.a-z0-9]+</code>: Coincide con una o más letras minúsculas, dígitos, guiones o puntos (comunes en esquemas de protocolo).</li>
      <li><code>{`:\/{1,3}`}</code>: Coincide con dos puntos seguidos de una a tres barras inclinadas (<code>:/</code>, <code>://</code> o <code>:///</code>).</li>
    </ul>
  </li>
</ul>

<h3>2. Dominio (Grupo 2): <code>{`([^-\/\.[\](|)\s?][^\`\/\s\]?]+)`}</code></h3>

<ul>
  <li>**Propósito:** Captura la parte del dominio o host de la URL.</li>
  <li>
    **Explicación:**
    <ul>
      <li><code>[^-\/\.[\](|)\s?]</code>: Coincide con cualquier carácter excepto los caracteres especiales especificados y espacios en blanco.</li>
      <li><code>[^`\/\s\]?]+</code>: Coincide con uno o más caracteres excepto acentos graves, barras inclinadas, espacios en blanco o corchetes de cierre.</li>
    </ul>
  </li>
</ul>

<h3>3. Ruta (Grupo 3): <code>{`([-_a-z0-9!@$%^&*()=+;/~\\.]*)`}</code></h3>

<ul>
  <li><strong>Propósito:</strong> Coincide con el componente de ruta de la URL.</li>
  <li>
    <strong>Explicación:</strong>
    <ul>
      <li><code>[-_a-z0-9!@$%^&*()=+;/~\.]*</code>: Coincide con cero o más caracteres seguros para URL que se encuentran comúnmente en rutas.</li>
    </ul>
  </li>
</ul>

<h3>4. Consulta (Grupo 4): <code>[?]?([^#\s`?]*)</code></h3>

<ul>
  <li><strong>Propósito:</strong> Coincide opcionalmente con una cadena de consulta, comenzando con cualquier carácter <code>?</code>.</li>
  <li>
    <strong>Explicación:</strong>
    <ul>
      <li><code>[?]?</code>: Coincide opcionalmente con un <code>?</code>. (Los corchetes no son estrictamente necesarios, sin embargo son ligeramente más claros que el doble <code>??</code> ultra conciso. También proporciona un paralelo visual para el (similar) siguiente grupo de coincidencia <code>[#]?</code>.)</li>
      <li><code>([^#\s`?]*)</code>: Coincide con cero o más caracteres que no sean una almohadilla, espacio en blanco, acento grave o signo de interrogación.</li>
    </ul>
  </li>
</ul>

<h3>5. Fragmento (Grupo 5): <code>[#]?([^#\s'"`\.,!]*)</code></h3>

<ul>
  <li><strong>Propósito:</strong> Coincide opcionalmente con el identificador de fragmento que comienza con un <code>#</code>.</li>
  <li>
    <strong>Explicación:</strong>
    <ul>
      <li><code>[#]?</code>: Coincide opcionalmente con un <code>#</code>.</li>
      <li><code>([^#\s'"`\.,!]*)</code>: Coincide con cero o más caracteres que no sean puntuación prohibida o espacios en blanco.</li>
    </ul>
  </li>
</ul>

<h2>🛠️ Ejemplo de análisis</h2>

Así es como puedes poner a trabajar esta expresión regular monstruosa, con un poco de JavaScript:

<CodeTabs client:only
 tabs={[
    "Código: Extraer URLs",
    "Resultados: URLs extraídas",
    "Resultados: Partes de URL",
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

## ☑️ Próximos pasos

Dependiendo de tu caso de uso, es posible que necesites refinar esta expresión regular o agregar más pasos de validación y post-procesamiento.

### Proyectos diferentes, necesidades diferentes

Los proyectos tienen requisitos y preocupaciones de seguridad variados:

1. **Web Scraping**: Valida las URLs para asegurarte de que sean accesibles y confiables.
2. **Procesamiento de Datos**: Extrae URLs de contenido generado por usuarios garantizando la seguridad.
3. **Análisis de Datos**: Filtra duplicados o enlaces irrelevantes para investigación o marketing.
4. **Aplicaciones Orientadas al Usuario**: Hipervincula automáticamente URLs en aplicaciones de chat o foros.

### Post-Procesamiento y Validación

Después de recolectar URLs potenciales, aplica verificaciones adicionales:

- **Resolución DNS**: Verifica que los dominios resuelvan.
- **Verificaciones de Seguridad**: Usa servicios para detectar sitios maliciosos o de phishing.
- **Reglas Personalizadas**: Aplica filtros específicos del proyecto (por ejemplo, TLDs permitidos, longitud máxima de URL).

## 📝 Resumen

Extraer datos de cadenas semi-estructuradas podría ser la parte más satisfactoria del dominio de las expresiones regulares.

Aquí tienes un resumen de los puntos clave:

- **Usa una herramienta visual para escribir, probar** y entender tus [patrones de Regex.](https://regex101.com/r/jO8bC4/69)
- **Divide el desafío en partes** y resuelve cada parte por separado. En cierto sentido, los grupos de captura nos proporcionan 'marcas de ruta' figurativas para nuestra regex.
- **Usa expresiones de coincidencia 'flexibles', evita el cumplimiento estricto de especificaciones** al hacer ingesta de datos.
- **Aplicar pasos de validación** después de la extracción inicial es esencial: considera siempre la seguridad y las necesidades específicas de tu proyecto.

Siguiendo estos pasos, puedes extraer eficazmente cualquier dato de cadena semi-estructurada, sentando las bases para un procesamiento y validación posteriores.

## 📚 Aprendizaje Adicional

- ¡Recuerda jugar con una [demo en vivo en RegEx101.com](https://regex101.com/r/jO8bC4/69)!
- Pregunta original en StackOverflow, y un [enlace a mi respuesta aquí mismo](https://stackoverflow.com/a/34669019/369727).
- [Documentación de MDN sobre Expresiones Regulares](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions)
- [Técnicas Avanzadas de Regex](https://www.regular-expressions.info/): Explora lookaheads, lookbehinds y otros patrones avanzados para coincidencias más precisas.
- [RFC 3986 - Sintaxis Genérica de URI](https://datatracker.ietf.org/doc/html/rfc3986)
````
