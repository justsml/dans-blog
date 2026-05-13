# Translation Candidate
- Slug: from-zero-to-regex-hero-extract-url-like-strings
- Locale: es
- Model: openrouter/qwen/qwen3-32b:nitro
- Target: src/content/posts/2024-12-29--from-zero-to-regex-hero-extract-url-like-strings/es/index.mdx
- Validation: passed
- Runtime seconds: 23.93
- Input tokens: 9195
- Output tokens: 10187
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- Estimated cost: $0.003180
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
title: De cero a héroe de Regex
subTitle: >-
  Extraer y analizar cadenas con apariencia de URL con una sola expresión
  regular
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

- 🚀 [Introducción](#-introducción)
- 🔍 [Extracción de URLs de texto](#-extracción-de-urls-de-texto)
- 🛳️ [La expresión regular de 120+ bytes](#️-la-expresión-regular-de-120-bytes)
- 🧩 [Análisis paso a paso](#-análisis-paso-a-paso)
- 🛠️ [Ejemplo de análisis](#-ejemplo-de-análisis)
- ☑️ [Pasos siguientes](#-pasos-siguientes)
- 📝 [Resumen](#-resumen)
- 📚 [Aprendizaje adicional](#-aprendizaje-adicional)

**TL;DR:** Salta directamente a la [expresión regular de 120+ bytes](#️-la-expresión-regular-de-120-bytes).

## 🚀 Introducción

Extraer URLs de texto crudo a veces se siente como jugar a un tedioso juego de golpear moluscos. La puntuación, los envoltorios parentéticos y el formato ambiguo conspiran para frustrar tus esfuerzos. Ya sea que estés construyendo un rastreador web, un analizador de datos o una aplicación de chat, extraer URLs con precisión es esencial.

En este artículo, abordaremos el problema directamente con un enfoque flexible y en dos pasos. Nuestro objetivo es **capturar todas las _posibles_ cadenas que se parezcan a URLs primero** y luego manejar la validación en un proceso posterior.

> 💡 **Nota:** Este patrón no es para **_validar_** URLs. ¡Es intencionalmente permisivo con la puntuación y los errores de escritura!

## 🔍 Objetivo: Extraer URLs de texto

Al extraer URLs de texto crudo, un enfoque en dos pasos es efectivo:

1. **Capturar todo lo que se parezca a una URL**: Lanza una red amplia para capturar todas las cadenas que *podrían* ser URLs. Aquí es donde destaca nuestra "expresión regular de 120+ bytes".
2. **Validar**: Una vez que hayas capturado estos candidatos, utiliza verificaciones secundarias (por ejemplo, resolución DNS, comparación contra dominios conocidos) para eliminar las entradas inválidas.

### Visualizando el desafío

Términos como `extraer` y `analizar` suelen usarse indistintamente, aunque se refieren a procesos distintos. Extraer URLs implica identificar y capturar cadenas potencialmente URL dentro de un cuerpo más amplio de texto. Analizar, por otro lado, consiste en descomponer estas URLs en sus componentes individuales.

Cuando menciono "análisis" o "partes de una URL", me refiero a los siguientes componentes:

<figure>
  <figcaption>Las 5 Partes de todas las URLs</figcaption>
![Anatomía de una URL, visualizada](../WhatUrlsAreMadeOf-ColorMatched.svg "Anatomía de una URL, visualizada")
</figure>

<details class="inset breakout">
  <summary>Haga clic para ver una captura de pantalla de la coincidencia de subcadenas de RegEx101.</summary>

  Antes de sumergirnos demasiado en la expresión regular, usemos una herramienta visual para ver qué tan bien captura mi patrón múltiples coincidencias:

  <figure>
    <figcaption>Usando [RegEx101.com](https://regex101.com/r/jO8bC4/69) para visualizar coincidencias multilínea</figcaption>
    ![Vista previa de coincidencias multilínea en masa](../RegEx101-Matches-Screenshot.webp "Vista previa de resultados multilínea en masa")
  </figure>
</details>

## La expresión regular de 120+ bytes

A continuación se muestra una expresión regular concisa diseñada para extraer y analizar URLs en un solo paso. Soporta diversos protocolos, dominios, rutas y secciones de consulta/fragmento opcionales.

No te preocupes—lo desglosaremos paso a paso.

```js title="Expresión regular de URL de 120+ bytes" frame="code"
const urlRegex = /([-.a-z0-9]+:\/{1,3})([^-\/\.[\](|)\s?][^`\/\s\]?]+)([-_a-z0-9!@$%^&*()=+;/~\.]*)[?]?([^#\s`?]*[#]?([^#\s'"`\.,!]*)/gi;
// Compatibilidad: ES5+

// Mismo patrón, dividido en líneas para mayor legibilidad:
([-.a-z0-9]+:\/{1,3})
([^-\/\.[\](|)\s?][^`\/\s\]?]+)
([-_a-z0-9!@$%^&*()=+;/~\.]*)
[?]?([^#\s`?]*)
[#]?([^#\s'"`\.,!]*)

```

<blockquote class="inset">¡Comparte las expresiones regulares más locas que hayas encontrado (O escrito) en los <a href="#post-comments">comentarios de abajo!</a> 🚀</blockquote>

## 🧩 Desglosándolo paso a paso

Vamos a desglosar la expresión regular en sus componentes para entender cómo funciona:

<h3>1. Protocolo (Grupo 1): <code>{`([-.a-z0-9]+:\/{1,3})`}</code></h3>

<ul>
  <li>**Propósito:** Coincide con la parte del protocolo de la URL (por ejemplo, `http://`, `ftp://`, `custom-scheme://`).</li>
  <li>
    **Explicación:**
    <ul>
      <li><code>[-.a-z0-9]+</code>: Coincide con uno o más letras minúsculas, dígitos, guiones o puntos (comunes en esquemas de protocolo).</li>
      <li><code>{`:\/{1,3}`}</code>: Coincide con dos puntos seguidos de uno a tres slashes (<code>:/</code>, <code>://</code> o <code>:///</code>).</li>
    </ul>
  </li>
</ul>

<h3>2. Dominio (Grupo 2): <code>{`([^-\/\.[\](|)\s?][^\`\/\s\]?]+)`}</code></h3>

<ul>
  <li>**Propósito:** Captura la parte de dominio o host de la URL.</li>
  <li>
    **Explicación:**
    <ul>
      <li><code>[^-\/\.[\](|)\s?]</code>: Coincide con cualquier carácter excepto los caracteres especiales especificados y el espacio en blanco.</li>
      <li><code>[^`\/\s\]?]+</code>: Coincide con uno o más caracteres excepto comillas inversas, slashes, espacio en blanco o corchetes cerrados.</li>
    </ul>
  </li>
</ul>

<h3>3. Ruta (Grupo 3): <code>{`([-_a-z0-9!@$%^&*()=+;/~\\.]*)`}</code></h3>

<ul>
  <li>**Propósito:** Coincide con el componente de ruta de la URL.</li>
  <li>
    **Explicación:**
    <ul>
      <li><code>[-_a-z0-9!@$%^&*()=+;/~\.]*</code>: Coincide con cero o más caracteres seguros para URL comúnmente encontrados en rutas.</li>
    </ul>
  </li>
</ul>

<h3>4. Consulta (Grupo 4): <code>[?]?([^#\s`?]*)</code></h3>

<ul>
  <li>**Propósito:** Coincide opcionalmente con una cadena de consulta, comenzando con cualquier carácter <code>?</code>.</li>
  <li>
    **Explicación:**
    <ul>
      <li><code>[?]?</code>: Coincide opcionalmente con un <code>?</code>. (Los corchetes no son estrictamente necesarios, sin embargo son ligeramente más claros que la forma ultra concisa <code>??</code>. También proporcionan un paralelo visual para el (similar) grupo de coincidencia siguiente <code>[#]?</code>.)</li>
      <li><code>([^#\s`?]*)</code>: Coincide con cero o más caracteres que no sean un hash, espacio en blanco, comilla inversa o signo de interrogación.</li>
    </ul>
  </li>
</ul>

<h3>5. Fragmento (Grupo 5): <code>[#]?([^#\s'"`\.,!]*)</code></h3>

<ul>
  <li>**Propósito:** Coincide opcionalmente con el identificador de fragmento que comienza con un <code>#</code>.</li>
  <li>
    **Explicación:**
    <ul>
      <li><code>[#]?</code>: Coincide opcionalmente con un <code>#</code>.</li>
      <li><code>([^#\s'"`\.,!]*)</code>: Coincide con cero o más caracteres que no sean puntuación prohibida o espacio en blanco.</li>
    </ul>
  </li>
</ul>

## 🛠️ Ejemplo de análisis

Aquí está cómo puedes poner en marcha esta expresión regular compleja con un poco de JavaScript:

<CodeTabs client:only
 tabs={[
    "Código: Extraer URLs",
    "Resultados: URLs extraídas",
    "Resultados: Partes de la URL",
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

## ☑️ Pasos siguientes

Según tu caso de uso, es posible que necesites refinar esta expresión regular o agregar más validaciones y pasos de postprocesamiento.

### Diferentes proyectos, diferentes necesidades

Los proyectos tienen requisitos y preocupaciones de seguridad variados:

1. **Web Scraping**: Valide URLs para asegurar que sean accesibles y seguras.  
2. **Procesamiento de datos**: Extraiga URLs de contenido generado por usuarios garantizando la seguridad.  
3. **Análisis de datos**: Filtre enlaces duplicados o irrelevantes para investigación o marketing.  
4. **Aplicaciones orientadas al usuario**: Hiperenlazar automáticamente URLs en aplicaciones de chat o foros.  

### Postprocesamiento y validación  

Después de recopilar URLs potenciales, aplique comprobaciones adicionales:  

- **Búsqueda DNS**: Verificar que los dominios se resuelvan.  
- **Verificaciones de seguridad**: Usar servicios para comprobar sitios maliciosos o de phishing.  
- **Reglas personalizadas**: Aplicar filtros específicos del proyecto (ej. TLD permitidos, longitud máxima de URL).  

## 📝 Resumen  

Extraer datos de cadenas semiestructuradas podría ser la parte más satisfactoria de dominar las expresiones regulares.

Aquí tienes un resumen de las conclusiones clave:

- **Usa una herramienta visual para escribir, probar y comprender tus patrones de expresiones regulares.** [Regex patterns.](https://regex101.com/r/jO8bC4/69)
- **Divide el desafío en partes y resuelve cada una por separado.** En cierto sentido, los grupos de captura nos proporcionan marcadores figurativos para nuestras expresiones regulares.
- **Usa expresiones de coincidencia sueltas y evita la conformidad estricta con las especificaciones** cuando realices la ingesta de datos.
- **Aplicar pasos de validación** después de la extracción inicial es esencial: siempre considera la seguridad y las necesidades específicas de tu proyecto.

Siguiendo estos pasos, podrás extraer eficazmente cualquier tipo de datos de cadenas semiestructuradas, sentando las bases para un procesamiento y validación posteriores.

## 📚 Aprendizaje adicional

- Recuerda probar el [demo en vivo en RegEx101.com](https://regex101.com/r/jO8bC4/69)!
- Pregunta original en StackOverflow y [un enlace a mi respuesta aquí](https://stackoverflow.com/a/34669019/369727).
- [Documentación de MDN sobre Expresiones Regulares](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions)
- [Técnicas avanzadas de expresiones regulares](https://www.regular-expressions.info/): Explora lookaheads, lookbehinds y otros patrones avanzados para coincidencias más precisas.
- [RFC 3986 - Sintaxis genérica de URI](https://datatracker.ietf.org/doc/html/rfc3986)
````
