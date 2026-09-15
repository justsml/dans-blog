# Spanish quiz corpus review

Reviewed all 19 Spanish quizzes: 267 questions and 1,231 selectable choices, against the current English source. Review covered question meaning, every correct answer and distractor, explanations, per-option hints, learning objectives, and reader-facing introductory/closing text. Literal program outputs remain in the program's language; explanatory prose is Spanish. This is a local editorial review, not a new external model score.

## Changes

- Restored output literals in Bash, Promises, ESNext, Node streams, destructuring and Error quizzes, including punctuation, capitalization, `undefined`, `N/A`, `Unknown`, and `fulfilled: success`. Preserved S3's English expansion so its initials remain understandable.
- Translated missing Rust choices/hints, AWS read-capacity choices and the truncated Streams hint; restored translated learning objectives and difficulty metadata for all 44 Rust/AWS questions.
- Propagated source accuracy fixes: Promise rejection handling, Date local-date assumptions and UTC numeric behavior, CSS selector specificity/case/descendants and max(), SQL correlation/planner semantics, PostgreSQL standards and timestamp precision, DSA question disambiguation, Buffer allocation, Rust borrowing and iterator caveats, AWS operation limits/consistency and service tradeoffs, HTML semantically distinct choices, and destructuring defaults.
- Restored missing sections/hint slots and the BigInt introduction; translated its comparison table and corrected its hexadecimal-only parseInt inference. Repaired its closing link and translated quiz labels.

## Terminology consensus

Existing related Spanish articles provide evidence for terminology, not automatic proof that every technical claim in them is correct:

| Concept | Wording applied | Related evidence |
|---|---|---|
| Promise fulfillment/rejection | promesa, se cumple, rechazo; keep literal status `fulfilled` | `src/content/posts/2018-08-01--intro-to-promises/es/index.mdx`:47–87; `2018-09-26--promise-gotchas/es/index.mdx`:16–28 |
| Object lifetime and weak references | tiempo de vida; retain “lifetime” in Rust contexts with Spanish first-use definition | `src/content/posts/2025-12-29--weakmap-the-javascript-feature-you-dont-use/es/index.mdx`:111 |
| Timestamp semantics | instante absoluto versus fecha/hora local; keep SQL identifiers | `src/content/posts/2025-12-29--the-8-byte-timestamp-that-destroyed-our-database/es/index.mdx`:41 |
| Stream backpressure | contrapresión (backpressure); stream/flujo paired with API names | Spanish Node quiz Q6/Q11; no unrelated Spanish article with this term found |
| Rust concepts | propiedad, préstamo, mutabilidad interior, tiempo de vida | Spanish Rust quiz Q1–Q18, internally consistent; code/traits unchanged |
| Algorithms | búsqueda en anchura/profundidad plus BFS/DFS; standard algorithm names retained | Spanish DSA Q6/Q7/Q11/Q18 |

## Verification and limits

- All19 local integrity checks: zero issues.
- Spanish corpus unit checks: 19 pass, 0 fail, 1,621 assertions. Checks cover count, index sequence, one correct choice, answer-position parity, and nonempty distinct choices.
- Full locale validation output: `es-validation.txt`.
- Browser interaction across the full corpus is owned by the parent task's shared Playwright suite; this report does not claim independent Spanish browser execution.
- No paid or external AI judging was performed.
- Historical frontmatter sourceHash values were not fabricated as fresh model provenance. The SHA256 values below bind this manual review to exact current source and translation bytes.

## Complete answer ledger

Each row lists every Spanish choice in display order; the correct choice is **bold**. This records the editorial review, while automated selection evidence is reported separately.

### javascript-promises-quiz

Source SHA256: `ead6cb486ce9cef02d253b30715e77820dde44c9a310546a0532e7164078dd5a`

Spanish SHA256: `66e69103eaa72f14612271ddceb39b7a6b0feece42e32adaaf93e7a8c4a1a182`

| Q | Title | Choices in order |
|---|---|---|
| 1 | Múltiples `.catch`'s #1 | 1. imprimir mensaje una vez · 2. **imprimir mensaje dos veces** · 3. UnhandledPromiseRejectionWarning · 4. el proceso termina |
| 2 | Múltiples `.catch`'s #2 | 1. imprimir mensaje una vez · 2. imprimir mensaje dos veces · 3. **promesa rechazada sin manejar** · 4. el proceso termina |
| 3 | Encadenando `.then` y `.catch` | 1. **imprimir error y `undefined`** · 2. imprimir error dos veces · 3. UnhandledPromiseRejectionWarning · 4. undefined |
| 4 | Encadenando `.catch`'s | 1. **imprimir mensaje de error una vez** · 2. imprimir mensaje de error dos veces · 3. UnhandledPromiseRejectionWarning · 4. el proceso termina |
| 5 | Múltiples `.catch`'s | 1. imprimir mensaje una vez · 2. imprimir mensaje dos veces · 3. UnhandledPromiseRejectionWarning · 4. **no se imprime nada** |
| 6 | Flujo entre `.then`'s | 1. imprimir "Success!" y "SUCCESS!" · 2. imprimir "Success!" · 3. **imprimir "SUCCESS!"** · 4. no se imprime nada |
| 7 | Flujo entre `.then`'s | 1. imprimir "SUCCESS!" · 2. imprimir "Success!" · 3. **imprimir "SUCCESS!" y "SUCCESS!"** · 4. no se imprime nada |
| 8 | Flujo entre `.then`'s | 1. imprimir "SUCCESS!" · 2. imprimir "Success!" · 3. imprimir "SUCCESS!" y "SUCCESS!" · 4. **imprime `undefined`** |
| 9 | Flujo entre `.then` y `.catch` | 1. imprimir "Oh noes!" y "The fails!" · 2. imprimir "Oh noes!" · 3. **imprimir "The fails!"** · 4. imprimir "actually, that worked" · 5. no se imprime nada |

### js-quiz-14-date-time-questions-test-your-knowledge

Source SHA256: `989751b2ad3098d09729710992be6df598d713b5e494fbb8a539c85cf39cc780`

Spanish SHA256: `384a8db2750e838d78e04e699f08521a380fe1326be47fffec5a7c6a3b05b2ea`

| Q | Title | Choices in order |
|---|---|---|
| 1 | Constructor de Date Parte 1 | 1. Jan 01 2020 · 2. **Feb 01 2020** · 3. RangeError: Invalid argument. |
| 2 | Constructor de Date Parte 2 | 1. **Jan 01 2020** · 2. Feb 01 2020 · 3. RangeError: Invalid argument. |
| 3 | Constructor de Date Parte 3 | 1. 01 Jan 1970 · 2. Unix Epoch de 0 · 3. Fecha actual, en UTC/GMT · 4. **Fecha actual** · 5. NaN · 6. RangeError: Invalid argument. |
| 4 | Constructor de Date Parte 4 | 1. **1969** · 2. 1970 · 3. 2019 · 4. 2020 · 5. 2021 · 6. RangeError: Invalid argument. |
| 5 | Análisis de Cadenas de Fecha | 1. **2019 2020** · 2. 2020 2021 · 3. 2020 2020 · 4. 2020 2019 |
| 6 | Formateo Parte 1 | 1. new Intl.DateTimeFormat('en-US').format(date) · 2. **date.toLocaleFormat('en-US')** · 3. date.toLocaleString('en-GB', { timeZone: 'UTC' }) · 4. date.toLocaleDateString('en-US', { timeZone: 'UTC', timeZoneName: 'short' }) |
| 7 | Fechas UTC Parte 1 | 1. Wed, 01 Jan 2020 00:00:00 GMT · 2. Thu, 02 Jan 2020 00:00:00 GMT · 3. **TypeError** · 4. NaN |
| 8 | Fechas UTC Parte 2 | 1. Una instancia de fecha basada en UTC · 2. Una instancia de fecha ajustada a la zona horaria local · 3. **Milisegundos transcurridos desde el 1 de enero de 1970 GMT** · 4. Un error |
| 9 | Fechas UTC Parte 3 | 1. 0 · 2. **420** · 3. 700 · 4. 1400 · 5. null |
| 10 | Setters de Fecha Parte 1 | 1. **Jan 01 2020** · 2. Feb 01 2020 · 3. RangeError: Invalid argument. |
| 11 | Setters de Fecha Parte 2 | 1. Jan 01 2020 · 2. **Feb 01 2020** · 3. RangeError: Invalid argument. |
| 12 | Setters de Fecha Parte 3 | 1. Jan 01 2020 · 2. **Jan 01 2021** · 3. Feb 01 2020 · 4. RangeError: Invalid argument. |
| 13 | Setters de Fecha Parte 4 | 1. Jan 01 2020 · 2. Feb 01 2020 · 3. Jan 01 2021 · 4. **Feb 01 2021** · 5. RangeError: Invalid argument. |
| 14 | Setters de Fecha Parte 5 | 1. Jan 01 2020 · 2. Feb 01 2020 · 3. Jan 01 2019 · 4. **Dec 01 2019** · 5. RangeError: Invalid argument. |

### quiz-data-structures-algorithms

Source SHA256: `bbe16f991f17d61caaf6a3d510caa7d4dd771d1113bbbdd157319831abc66dd7`

Spanish SHA256: `12979e4f1f5bb1cc8bf02258fccc8b6dfb77c7ffbb6c87a88d368457fc195a20`

| Q | Title | Choices in order |
|---|---|---|
| 1 | Pilas vs Colas | 1. Ambas · 2. Colas · 3. **Pilas** · 4. Ninguna |
| 2 | Notación Big O | 1. **O(1)** · 2. O(n) · 3. O(log n) · 4. O(n^2) |
| 3 | Cálculo de la longitud de una lista enlazada | 1. O(1) · 2. O(log n) · 3. O(n^2) · 4. **O(n)** · 5. O(n log n) |
| 4 | Búsqueda en Árbol Binario de Búsqueda | 1. O(1) · 2. **O(log n)** · 3. O(n) · 4. O(n^2) · 5. O(n log n) |
| 5 | Complejidad de Merge Sort | 1. O(n^2) · 2. O(log n) · 3. **O(n log n)** · 4. O(n) · 5. O(1) |
| 6 | DFS vs BFS | 1. **Cola** · 2. Pila · 3. Cola de prioridad · 4. Mapa hash · 5. Conjunto |
| 7 | Detección de ciclos en grafos | 1. Ordenación rápida (Quick Sort) · 2. Búsqueda en anchura (BFS) · 3. Ordenación por mezcla (Merge Sort) · 4. **Búsqueda en profundidad (DFS)** · 5. Ordenación burbuja (Bubble Sort) |
| 8 | Complejidad de Heap Sort | 1. O(n^2) · 2. **O(n log n)** · 3. O(n) · 4. O(log n) · 5. O(1) |
| 9 | Complejidad de Tiempo de la Tabla Hash | 1. O(n) · 2. O(log n) · 3. **O(1)** · 4. O(n^2) · 5. O(n log n) |
| 10 | Operaciones de pila | 1. **Push, Pop, Peek** · 2. Enqueue, Dequeue, Peek · 3. Insert, Search, Delete · 4. Traverse, Visit, Sort |
| 11 | Algoritmo de Ruta Más Corta | 1. Algoritmo de Kruskal · 2. Algoritmo de Prim · 3. Algoritmo de Bellman-Ford · 4. **Algoritmo de Dijkstra** · 5. Algoritmo de Floyd-Warshall |
| 12 | Árboles de Búsqueda Autobalanceados | 1. Árbol de Búsqueda Binario y Montículo Mínimo · 2. **Árbol AVL y Árbol Rojo-Negro** · 3. Montículo Mínimo y Montículo Máximo · 4. Pila y Cola |
| 13 | Caso Base de Recursión | 1. Bucle Infinito · 2. Desbordamiento de Pila · 3. **Caso Base** · 4. Variable Global · 5. Limitación de Alcance |
| 14 | Operaciones de Cola | 1. **Encolar y Desencolar** · 2. Push y Pop · 3. Peek y Top · 4. Recorrer y Ordenar |
| 15 | Ordenamiento topológico | 1. El grafo debe contener ciclos · 2. El grafo debe ser ponderado y conectado · 3. El grafo debe ser no dirigido y acíclico · 4. **El grafo debe ser dirigido y acíclico** |
| 16 | Complejidad de la Recursión de Fibonacci | 1. O(1) · 2. **O(2^n)** · 3. O(n) · 4. O(log n) · 5. O(n^2) |
| 17 | Implementación de Cola de Prioridad | 1. Array · 2. Pila · 3. **Montículo** · 4. Cola · 5. Lista Enlazada |
| 18 | Recorridos de Árbol Binario | 1. **En orden, Preorden, Postorden** · 2. Anchura primero, Profundidad primero, Heapify · 3. Ordenar, Buscar, Rotar · 4. Push, Pop, Peek |
| 19 | Propiedad del Heap | 1. Todos los nodos están ordenados de izquierda a derecha · 2. La raíz siempre es el elemento más grande · 3. Todas las hojas están al mismo nivel · 4. **La raíz es el elemento más pequeño y la altura es O(log n)** |
| 20 | Estabilidad de Bubble Sort | 1. Inestable · 2. **Estable** · 3. Depende de la implementación · 4. Ninguno · 5. La complejidad determina la estabilidad |

### quiz-do-you-know-esnext

Source SHA256: `63cd3ddef63907f8281b7060db5b8004bf7bac2067f84fcdf01ca8bd8b18c3fb`

Spanish SHA256: `0538fef6f596ed7628dc0bead2bfc2468fa3e341ddb71dd4e9698c7394acf6e3`

| Q | Title | Choices in order |
|---|---|---|
| 1 | Coalescencia Nula | 1. 42 · 2. null · 3. undefined · 4. **100** |
| 2 | Coalescencia Nula | 1. **false** · 2. 42 · 3. null · 4. undefined · 5. 100 |
| 3 | Encadenamiento Opcional | 1. **undefined** · 2. Error: No se puede leer la propiedad de undefined · 3. null · 4. 100 |
| 4 | Uso de BigInt | 1. TypeError: Cannot mix BigInt and number · 2. 42n · 3. **84n** · 4. undefined |
| 5 | Sintaxis de Importación Dinámica | 1. SyntaxError · 2. Promise · 3. Module · 4. **object** · 5. undefined |
| 6 | Promise.allSettled | 1. **fulfilled: success** · 2. Rejected: error · 3. Pending · 4. null |
| 7 | Uso de String.matchAll | 1. Arreglo de coincidencias · 2. **Iterador de coincidencias** · 3. Error: Llamada inválida · 4. null |
| 8 | Uso de import.meta | 1. **URL del módulo actual** · 2. Marca de tiempo actual · 3. undefined · 4. SyntaxError |
| 9 | Asignación lógica | 1. 5 · 2. **10** · 3. undefined · 4. null |
| 10 | Asignación Nula Lógica | 1. 5 · 2. **10** · 3. undefined · 4. null |
| 11 | Uso de WeakRef | 1. ReferenceError · 2. **{ data: 'important' }** · 3. null · 4. undefined |

### quiz-js-interfaces-symbols-and-enumerables

Source SHA256: `c31ed61019199a9690cb1c1f02182365a0ddb2c7c99eb9ad49da340c96dd83f9`

Spanish SHA256: `bba3ccdd305ab06ae5db7e13aab3b5af469505509145c31d0396567734c67951`

| Q | Title | Choices in order |
|---|---|---|
| 1 | Getter vs Acceso Directo a la Propiedad | 1. Usar un bucle · 2. Llamar a un método para acceder al valor · 3. **Acceder al valor directamente** · 4. Lanzar un error |
| 2 | Uso de Symbol en claves de objetos | 1. **Usar un Symbol** · 2. Usar una cadena · 3. Usar un número · 4. Usar un objeto como clave |
| 3 | Propiedades Enumerables | 1. Lanza un error · 2. No, no lo hará · 3. Depende del tipo de valor · 4. **Sí, será listado** |
| 4 | Enumerabilidad predeterminada con Object.defineProperty() | 1. true · 2. **false** · 3. undefined · 4. Depende del contexto |
| 5 | Símbolos Únicos | 1. Depende de sus descripciones · 2. true · 3. **false** · 4. Lanza un error |
| 6 | Símbolos como claves no enumerables | 1. **No, no lo hará** · 2. Sí, aparecerá en la lista · 3. Depende del método de iteración · 4. Lanza un error |
| 7 | Obtener todas las claves Symbol | 1. Object.keys() · 2. Symbol.keys() · 3. Object.symbols() · 4. **Object.getOwnPropertySymbols()** · 5. Object.entries() |

### quiz-master-modern-html5

Source SHA256: `9320d673f59fafb3da0b9c01736b3b54a103301210b176a3e5c5c78e771b7b74`

Spanish SHA256: `a21e1b35b29b49feaaf90d8a57883c02633a9ce9e2f603b5f5a95397834557ed`

| Q | Title | Choices in order |
|---|---|---|
| 1 | Rol de `<ul>` | 1. **Lista desordenada** · 2. Lista única · 3. Lista universal · 4. Lista de usuarios |
| 2 | Uso de `<dd>` | 1. Una declaración que define un campo de base de datos · 2. Término de descripción · 3. Visualización de datos · 4. **Una descripción, definición o valor de un término en una lista de descripciones** |
| 3 | Uso de `<figure>/<figcaption>` | 1. Solo para imágenes con información de derechos de autor · 2. **Agrupar contenido independiente con su leyenda** · 3. Exclusivamente para tablas y cálculos matemáticos · 4. Solo para añadir subtítulos a la reproducción de vídeo |
| 4 | Uso de `<article>` | 1. Para contenido, barras laterales e información de copyright · 2. **Una sección de contenido independiente** · 3. Parte de un <newsletter> · 4. Define un artículo de noticias |
| 5 | Uso de `<fieldset>/<legend>` | 1. **Agrupar elementos de formulario bajo un título** · 2. Definir instrucciones para los campos del formulario · 3. No es un uso válido de <legend> · 4. Define una sección expandible |
| 6 | Propósito de `<meter>` | 1. Una barra de progreso en unidades métricas · 2. **Representar un valor numérico dentro de un rango** · 3. Convierte una distancia a metros · 4. Etiqueta especial relacionada con el rendimiento |
| 7 | Uso de `<source>` | 1. Usado para definir una fuente de datos · 2. **Declarar formato(s) de archivo multimedia disponibles** · 3. Citar fuentes usando formato APA o MLA · 4. Definir un bloque de código fuente |
| 8 | Uso de `<hgroup>` | 1. Elemento heredado, ya no se usa · 2. Para agrupar encabezados · 3. Definir una tabla de contenidos · 4. **Agrupar un encabezado con su subtítulo** |
| 9 | Uso de `<menu>` | 1. Para definir una lista ordenada · 2. **Para listar comandos o controles de barra de herramientas** · 3. Para representar una barra de navegación · 4. Para definir un grupo de botones |
| 10 | Rol de `<details>/<summary>` | 1. **Contenido colapsable nativo** · 2. Tooltips nativos · 3. Añadir contexto a <section> · 4. Para mostrar datos estructurados |
| 11 | Propósito de `<dialog>` | 1. Formato para guionistas · 2. **Declarar un modal o ventana emergente** · 3. Declarar una discusión de chat estilo ChatGPT · 4. Obsoleto en favor de <wizard> |
| 12 | Uso de `<time>` | 1. **Para representar fecha y hora** · 2. Para definir una marca de tiempo · 3. Para formatear solo fechas · 4. Para hacer que las entradas de fecha sean arrastrables |
| 13 | Propósito de los atributos ARIA | 1. Ayudantes para dispositivos táctiles · 2. **Mejorar la accesibilidad** · 3. Controlar sonidos y reproducción · 4. Para usar solo <div>s |
| 14 | Uso del atributo `role` | 1. Para definir el comportamiento del componente · 2. **Para describir el propósito del elemento** · 3. Restringir el acceso a los elementos · 4. Solo para Web Components |

### quiz-can-you-count-to-bigint

Source SHA256: `f7af3ca5f8ef55272d24882cc3612f0492277f3ce73ad21ddc7a952a7f4d6a8e`

Spanish SHA256: `8f4376b6ff66b5eedabd306e558f556ae6bbea96e1e641b6d86dbfdd372bbd90`

| Q | Title | Choices in order |
|---|---|---|
| 1 | Analizando con `parseInt` | 1. **123456** · 2. 123 · 3. 12345600 · 4. 456.00 · 5. Error · 6. NaN |
| 2 | Manejo de comas | 1. **123** · 2. 12345600 · 3. 123456.00 · 4. 456.00 · 5. Error |
| 3 | Precisión con puntos flotantes | 1. 0.1 + 0.2 === 0.3 · 2. **false** · 3. true · 4. NaN |
| 4 | Manejo de Infinity | 1. **Infinity** · 2. NaN · 3. Error · 4. undefined |
| 5 | Conversión de cadena con `.toFixed()` | 1. TypeError · 2. SyntaxError · 3. "5" · 4. 5 · 5. **"5.00"** · 6. 5.0 |
| 6 | Comparación de igualdad entre `parseInt` y `parseFloat` | 1. **true** · 2. false · 3. NaN |
| 7 | Comparación de igualdad con BigInt | 1. TypeError · 2. true · 3. **false** · 4. NaN |
| 8 | Análisis Hexadecimal | 1. **true** · 2. false · 3. NaN · 4. Debe estar en mayúsculas: 2A · 5. Error |
| 9 | Parseando con Radix | 1. **255** · 2. 0 · 3. 16 · 4. 0.16 |
| 10 | Usando `.map(parseInt)` | 1. **[24, NaN, NaN]** · 2. [24, NaN, 42] · 3. [24, 42] · 4. NaN |
| 11 | Usando `.map(Number)` | 1. **[24, NaN, 34]** · 2. [24, NaN, 42] · 3. [24, 1, 42] · 4. [24, 42] · 5. NaN · 6. TypeError |
| 12 | Manejo de nulls | 1. 0 NaN · 2. 0 0 · 3. NaN NaN · 4. **NaN 0** · 5. null null · 6. TypeError |
| 13 | Análisis en base | 1. NaN · 2. null · 3. undefined · 4. 36 · 5. **1112745** · 6. 01001001 |

### quiz-modern-css-2025

Source SHA256: `7254e27e26db35a72ca971a9fce8ae96d3cba30163bc6958ec3118e52e39704b`

Spanish SHA256: `4ed09b96a070477e6e24c2f3da2b9db792bc3ab03cebcaa7294815fdb6ea81b5`

| Q | Title | Choices in order |
|---|---|---|
| 1 | Uso de Variables CSS | 1. background-color: blue; · 2. background-color: --main-color; · 3. **background-color: var(--main-color);** · 4. background-color: $main-color; · 5. background-color: @main-color; |
| 2 | Función min() de CSS | 1. width: 50%; · 2. **width: 200px;** · 3. width: 250px; · 4. width: 500px; · 5. width: max(50%, 200px); · 6. Sintaxis inválida |
| 3 | Función max() de CSS | 1. width: 6em; · 2. width: 10%; · 3. width: 10px; · 4. width: 50px; · 5. **width: 96px;** · 6. Sintaxis inválida |
| 4 | Función minmax() de CSS | 1. Todas las anchuras de columna entre 100px y 200px · 2. Establecer columnas a 100px, filas a 200px · 3. **La primera columna estará entre 100px y 200px** · 4. Aplicar rango recursivamente, incl. subcuadrículas |
| 5 | Respaldo de Variables CSS | 1. azul · 2. rojo · 3. predeterminado del sistema · 4. **#6b8e23** · 5. var(--secondary-color) |
| 6 | Uso de clamp() para diseño responsivo | 1. Alternativa para unidades posiblemente no compatibles · 2. Asegura que las unidades `vw` estén entre 20px y 50px · 3. **Escala lineal entre 200px y 500px** · 4. Escala log₂ entre 200px y 500px · 5. ¡Falla! No hay soporte en IE 11 |
| 7 | Anidamiento CSS Nativo | 1. Solo con SCSS · 2. Técnicamente con PostCSS · 3. **Sí** · 4. No |
| 8 | Anidamiento CSS | 1. El nombre de archivo debe terminar con .scss · 2. `.title` debe preceder a propiedades como `color` · 3. Solo con PostCSS · 4. **Perfecto. Sin notas.** |
| 9 | Selector de hijo directo con anidamiento | 1. background-color: red · 2. **background-color: white** · 3. background-color: blue · 4. Sintaxis inválida |
| 10 | Cambiar variable CSS en tiempo de ejecución | 1. Las variables CSS son inmutables · 2. **Usando JavaScript** · 3. Solo con SCSS · 4. Solo con estilos en línea · 5. Usando unidades responsivas |
| 11 | Uso de calc() con Variables CSS | 1. Ancho: 50px · 2. Ancho: 100px · 3. **Ancho: 110px** · 4. Ancho: 120px |

### quiz-css-core-fundamentals

Source SHA256: `ee5866dcab74b29fcaf99765c78fd8c474d51fbd357ed07af1c02059c59d81c7`

Spanish SHA256: `5e87a9e19d92564b303b58051231d5574a7cd49b4d01ae0c288e19eeb60fa05d`

| Q | Title | Choices in order |
|---|---|---|
| 1 | Unidad CSS inválida para tamaño de fuente | 1. **10cx** · 2. 10mm · 3. 10pt · 4. 10px · 5. 10vmin |
| 2 | Códigos Hexadecimales | 1. #A · 2. #AB · 3. **#ABCD** · 4. #ABCDE |
| 3 | ¡Ups, todas las unidades! | 1. em · 2. rem · 3. cm · 4. mm · 5. in · 6. pt · 7. pc · 8. px · 9. ex · 10. ch · 11. vmin · 12. vmax · 13. vh · 14. **rel** · 15. vw |
| 4 | Emparejando selectores con elementos HTML | 1. #Home · 2. a [id='home'] · 3. a:contains(home) · 4. **a#home[name='home']** |
| 5 | Selector de atributo para un botón | 1. button:link · 2. button::click · 3. button:focus · 4. **button[onclick]** · 5. button[on-click] |
| 6 | Selector CSS no válido | 1. a {} · 2. b.b {} · 3. **c > > d {}** · 4. #d {} |
| 7 | Seleccionando el último enlace | 1. a :nth-child(3) · 2. a:last-item · 3. nav:last-of-type(a) · 4. nav:nth-child(3) · 5. **a:last-child** |
| 8 | Prioridad de selectores | 1. main article section blockquote a · 2. blockquote a · 3. **a#quote** · 4. a.quote |
| 9 | Centrar texto en un elemento de bloque | 1. align: center; · 2. margin: 0 auto; · 3. align-content: center; · 4. **text-align: center;** · 5. text-content: center; |
| 10 | Centrar un elemento de bloque verticalmente | 1. align-items: center; · 2. justify-content: center; · 3. **align-content: center;** · 4. margin: auto; · 5. margin: 0 auto; |
| 11 | Calculando el tamaño en píxeles de fuentes anidadas | 1. !40px · 2. **5px** · 3. 20px · 4. 25px · 5. 40px |
| 12 | Calculando el tamaño en píxeles con REMs | 1. 10px · 2. **12px** · 3. 14px · 4. 20px · 5. 24px · 6. 34px |
| 13 | Calculando el tamaño en píxeles con EMs | 1. 10px · 2. 12px · 3. 14px · 4. 20px · 5. **24px** · 6. 34px |
| 14 | Selectores de Cero Especificidad | 1. **:where(.card) .title** · 2. .card .title · 3. :is(.card) .title · 4. #card .title |

### quiz-sql-query-fundamentals

Source SHA256: `4788ec9e33c53b4fb819c0e7e472f3a737b497b83add5049de127d7dcc4b32ad`

Spanish SHA256: `5b2a22415121ee6452af95fd6f19d482bc6300ca101a288f12a9ac745fe44739`

| Q | Title | Choices in order |
|---|---|---|
| 1 | Cláusula WHERE básica | 1. SELECT * FROM users WHERE name LIKE(John); · 2. **SELECT * FROM users WHERE name = 'John';** · 3. SELECT * FROM users WHERE name == "John"; · 4. SELECT * FROM users WHERE name === "John"; |
| 2 | Función de agregación COUNT | 1. Cuenta todas las filas, incluidos los valores NULL · 2. **Cuenta solo los valores no NULL en una columna** · 3. Cuenta los valores NULL como un valor único · 4. Trata cada valor NULL como único, similar a NaN !== NaN |
| 3 | Conceptos básicos de LEFT JOIN | 1. Devuelve una fila por cada coincidencia, ignora las filas sin coincidencia · 2. **Devuelve todas las filas de la tabla izquierda, más las filas coincidentes de la derecha** · 3. Devuelve todas las filas, coincidentes o no, donde NULL indica que no hay coincidencia · 4. Devuelve todas las filas de la tabla derecha, con las filas coincidentes de la izquierda |
| 4 | Usando INNER JOIN | 1. Devuelve filas no coincidentes de ambas tablas · 2. Devuelve todas las filas de ambas tablas, con NULLs para las filas no coincidentes · 3. **Devuelve filas que cumplen la condición de unión en ambas tablas** · 4. Devuelve filas no coincidentes de la tabla derecha |
| 5 | Subconsulta Correlacionada | 1. Una subconsulta que se ejecuta una sola vez en total · 2. Una subconsulta usada solo en sentencias JOIN · 3. Una subconsulta que solo devuelve múltiples columnas · 4. **Una subconsulta que hace referencia a columnas de la consulta externa** |
| 6 | Sintaxis de la cláusula WITH | 1. Solo permitido en sentencias DELETE · 2. Se usa para funciones de agregación · 3. Se usa solo para definir vistas · 4. **Definir un conjunto de resultados temporal para usar en una sentencia SQL más grande** |
| 7 | IS NULL vs IS NOT NULL | 1. **Comprueba si un valor es NULL** · 2. Comprueba si un valor está vacío · 3. Comprueba si un valor es una cadena · 4. Comprueba si un valor es numérico |
| 8 | Uso del operador IN | 1. Devuelve filas únicas · 2. Requiere una columna indexada · 3. Se aplica solo a columnas numéricas · 4. **Devuelve filas que coinciden con los valores de una lista especificada** |
| 9 | Usando la función COALESCE | 1. Cuenta valores NULL · 2. Devuelve el último argumento no NULL · 3. **Devuelve el primer argumento no NULL** · 4. Limitado a columnas IDENTITY · 5. Proviene de la clasificación de hojas de impresora |
| 10 | Uso de GROUP BY | 1. Oculta duplicados · 2. Solo se usa en joins · 3. Ordena filas en orden ascendente · 4. **Agrupa filas por la(s) columna(s) especificada(s)** · 5. La sintaxis debería ser GROUP WITH/USING |
| 11 | Conceptos básicos de FULL OUTER JOIN | 1. Devuelve solo filas coincidentes · 2. Devuelve solo filas con valores no nulos · 3. Devuelve solo filas no coincidentes de la tabla izquierda · 4. Devuelve solo filas no coincidentes de la tabla derecha · 5. **Devuelve todas las filas de ambas tablas, con NULLs para las filas no coincidentes** |

### quiz-destructuring-delights

Source SHA256: `0aa930822ea8a6b38914c30bcdb73e22de3e8910a0f92e5f0f6ab8c090fabd4d`

Spanish SHA256: `7fe63b1f2d807402e12301840118182d76735092ee81a5b5e12d4f7fc9ce26ab`

| Q | Title | Choices in order |
|---|---|---|
| 1 | Desestructuración Básica de Objetos | 1. Name: Dan Levy, Age: 20 · 2. Name: Dan Levy, Age: 40 · 3. Name: Dan Levy, Age: Infinity · 4. **Name: Dan Levy, Age: undefined** · 5. Error: Cannot read property 'age' · 6. Name: undefined, Age: 40 |
| 2 | Valor predeterminado en la desestructuración de objetos | 1. Name: Dan Levy, Age: NaN · 2. Name: Dan Levy, Age: null · 3. **Name: Dan Levy, Age: undefined** · 4. Name: Dan Levy, Age: 40 · 5. Error: Cannot destructure property 'age' · 6. SyntaxError: Unexpected token ',' |
| 3 | Desestructuración anidada | 1. First: Dan, City: Denver · 2. First: undefined, City: Denver · 3. Error: Cannot read property 'first' · 4. First: Dan, City: undefined · 5. **Error** |
| 4 | Valores predeterminados en la desestructuración de objetos | 1. Hi Dan from Unknown · 2. Hi Dan from Denver · 3. Hi Unknown from Unknown · 4. Hi Unknown from Denver · 5. **Error** |
| 5 | Valores predeterminados en la desestructuración de objetos | 1. Hi Dan from Denver · 2. Hi Dan from Johannesburg · 3. **Hi Dan from Unknown** · 4. Hi Unknown from Unknown · 5. Hi Unknown from Denver · 6. Error |
| 6 | Desestructuración de Parámetros de Función con Valores Predeterminados | 1. Hi Dan from undefined · 2. Hi Dan from Unknown · 3. Hi Dan from Denver · 4. Hi Unknown from Unknown · 5. Hi Unknown from Denver · 6. **Error** |
| 7 | Desestructuración con valores predeterminados anidados | 1. Unknown, Unknown, Joburg · 2. Unknown, Unknown, Unknown · 3. Unknown, `undefined`, Joburg · 4. N/A, `undefined`, Joburg · 5. N/A, Unknown, Joburg · 6. **N/A, N/A, Joburg** · 7. Unknown, N/A, Joburg · 8. Error |
| 8 | Desestructuración con valores predeterminados anidados | 1. N/A, N/A · 2. N/A, undefined · 3. Unknown, N/A · 4. Unknown, Unknown · 5. Unknown, undefined · 6. **null, N/A** · 7. null, Unknown · 8. null, undefined · 9. Error |
| 9 | Desestructuración con valores predeterminados anidados | 1. N/A · 2. undefined · 3. Unknown · 4. 'null' · 5. **Error de TypeScript** |
| 10 | Desestructuración con valores predeterminados anidados | 1. undefined · 2. null · 3. N/A · 4. Unknown · 5. **Denver** · 6. SyntaxError · 7. Error: Invalid type · 8. Error: Invalid Arguments |
| 11 | Desestructuración con valores predeterminados anidados | 1. Error: Falta la propiedad 'first' · 2. Error: Falta la propiedad 'last' · 3. **Error: Faltan las propiedades 'birth' y 'age'** · 4. Error: Falta la propiedad 'place' · 5. Error: 'string' no tiene propiedades en {...} |
| 12 | Desestructuración con Valores Anidados, Asignación y Tipos | 1. Hi Dan Levy from N/A · 2. Hi Dan Levy from Cape Town · 3. Hi N/A N/A from N/A · 4. Hi N/A N/A from Cape Town · 5. **Error** |

### quiz-nodejs-files-streams-buffers-oh-my

Source SHA256: `77b0246b9c8275d11d3ca3108732512ae203d0d5f45f379aeb5166c248928930`

Spanish SHA256: `32f633bb0fcd1827ed9b384e2bccc923e4a50f5f9d700f34a8bae169c9068f22`

| Q | Title | Choices in order |
|---|---|---|
| 1 | Asignación de Buffer | 1. **Crea un Buffer de tamaño 5 con ceros** · 2. Crea un Buffer de tamaño 5 con datos aleatorios · 3. Lanza un error · 4. Crea un Buffer vacío |
| 2 | Conversión de Buffer a Cadena | 1. **A** · 2. 65 · 3. [Object object] · 4. Undefined · 5. Datos binarios |
| 3 | Operaciones de Archivo Asíncronas | 1. Imprime el contenido del archivo y luego "Done" · 2. **Imprime "Done" y luego el contenido del archivo** · 3. Solo imprime el contenido del archivo · 4. Lanza un error |
| 4 | Leyendo archivos de forma sincrónica | 1. **Devuelve un Buffer** · 2. Devuelve una cadena · 3. Devuelve undefined · 4. Devuelve una Promesa |
| 5 | Eventos de Stream | 1. **'data', 'end', 'error', 'close'** · 2. 'finish', 'drain', 'pipe' · 3. 'read', 'write', 'end' · 4. 'open', 'close', 'data' |
| 6 | Encadenamiento de Streams | 1. Copia el archivo con compresión · 2. **Copia el archivo por fragmentos sin almacenar todo el archivo en memoria** · 3. Carga todo el archivo en memoria · 4. Crea un enlace simbólico |
| 7 | Operaciones de Directorio | 1. **Crea directorios anidados si es necesario** · 2. Crea solo el último directorio · 3. Lanza un error · 4. Crea enlaces simbólicos |
| 8 | Flujos de Transformación | 1. hello world · 2. **HELLO WORLD** · 3. Error · 4. undefined |
| 9 | Observación de Archivos | 1. Una vez por cambio de archivo · 2. **No garantizado; puede dispararse múltiples veces** · 3. Nunca · 4. Solo al eliminar el archivo |
| 10 | Comparación de Buffers | 1. true · 2. **false** · 3. undefined · 4. Error |
| 11 | Backpressure en streams | 1. **Previene desbordamiento de memoria** · 2. Aumenta la velocidad de lectura · 3. Comprime datos · 4. Cifra datos |
| 12 | Enlaces simbólicos | 1. Crea un enlace duro · 2. Crea una copia · 3. **Crea un enlace simbólico** · 4. Mueve el archivo |
| 13 | Modos de Stream | 1. Solo modo binario · 2. Solo modo objeto · 3. **Ambos modos** · 4. Ningún modo · 5. Modos de entrada y salida · 6. Modos de lectura y escritura |
| 14 | Descriptores de Archivo | 1. **Un número** · 2. Una cadena · 3. Un objeto · 4. Un búfer |
| 15 | Codificación de Buffer | 1. 3 · 2. 4 · 3. 6 · 4. 8 · 5. **10** |

### quiz-regex-or-wreckage

Source SHA256: `10ac88ad77540507d3992e3b6500e5cc1e13152dd22a82a20d0adce4ac8b4a25`

Spanish SHA256: `16457f49e539f787d082dd70eca5958e36d9c7088cf73886cd4524499f8fa25c`

| Q | Title | Choices in order |
|---|---|---|
| 1 | Coincidencia sensible a mayúsculas | 1. ["Cat"] · 2. ["cat", "CAT", "Cat"] · 3. **["cat"]** · 4. [] |
| 2 | Coincidencia Simple de Caracteres | 1. **["cat", "hat"]** · 2. ["cat", "hat", "what"] · 3. ["cat"] · 4. [] |
| 3 | Codicioso vs No codicioso | 1. ["<div>Hello</div>"] · 2. ["<div>", "</div>"] · 3. ["<div>Hello</div><div>World</div>"] · 4. **["<div>Hello</div>", "<div>World</div>"]** · 5. ["Hello", "World"] |
| 4 | El Metacaracter Punto | 1. ["hello ↵ world"] · 2. **["hello", "world"]** · 3. ["hello ↵ ", "world"] · 4. null |
| 5 | Look-ahead positivo | 1. ["$100", "€50"] · 2. ["100", "50"] · 3. ["$", "€"] · 4. [] · 5. **null** |
| 6 | Límites de Palabra | 1. ["cat", "cats"] · 2. **["cat"]** · 3. ["cats"] · 4. [] |
| 7 | El modificador global | 1. null · 2. ["a"] · 3. **["a", "a", "a"]** · 4. ["b", "n", "n"] · 5. Error |
| 8 | Look-behind negativo | 1. ["123"] · 2. ["123", "456"] · 3. **["23", "456"]** · 4. ["456"] · 5. [] |
| 9 | Grupos de captura | 1. ["2029-12-31"] · 2. **["2029", "12", "31"]** · 3. ["20", "29", "12", "31"] · 4. null |
| 10 | Lookahead negativo | 1. ["password123"] · 2. ["abc123"] · 3. ["123aBc"] · 4. **["12"]** · 5. ["abc"] · 6. Error |
| 11 | División con look-behind | 1. **["a,", "b,", "c"]** · 2. ["a,b,c"] · 3. ["a", ",", "b", ",", "c"] · 4. ["a,b,c", ""] |
| 12 | Escapando caracteres especiales | 1. ["$100"] · 2. ["100"] · 3. [] · 4. **null** · 5. Error |
| 13 | Look-behind positivo | 1. ["$100"] · 2. **["100"]** · 3. ["$"] · 4. [] |
| 14 | Cuantificadores perezosos vs codiciosos | 1. ["<b>bold</b>"] · 2. **["bold"]** · 3. ["<b>", "</b>"] · 4. [] |
| 15 | Bandera Unicode | 1. ["🙂"] · 2. **["😀", "🙂"]** · 3. null · 4. Error |
| 16 | Validación de Contraseña | 1. "sassword123" · 2. **"Sass123!"** · 3. "SASSWORD123" · 4. "Sass word123" |

### quiz-bash-in-the-shell

Source SHA256: `ea4b4440293b28444b461e783c6f33db1a9d797e64fa8a5987034d8dada9f631`

Spanish SHA256: `bd9fc1f352635a8b2ec5b57b84d26c1df2491deaa0c7c93453a3ca89f1682d3b`

| Q | Title | Choices in order |
|---|---|---|
| 1 | Declaración de Variables | 1. $name=Dan · 2. **name=Dan** · 3. name =Dan · 4. name == Dan · 5. name : Dan |
| 2 | Escapando comillas | 1. echo 'It's 🔨 Time!' · 2. echo 'It\'s 🔨 Time!' · 3. **echo 'It'\''s 🔨 Time!'** · 4. echo 'It''s 🔨 Time!' · 5. Error |
| 3 | Comando echo | 1. cat cab · 2. **cat cbt** · 3. ca bt · 4. cat · 5. cbd · 6. Error |
| 4 | Escapando Caracteres | 1. Cost: $$100 · 2. Cost: $100 · 3. Cost: 100 · 4. **Cost: 00** · 5. Cost: · 6. Error |
| 5 | Reemplazar Subcadena | 1. meow meow · 2. Meow meow · 3. **Bark meow** · 4. Bark bark · 5. Error |
| 6 | Longitud de cadena | 1. $#username · 2. #$username · 3. **${#username}** · 4. ${username#} · 5. echo $username \| wc -c |
| 7 | If-Else Básico | 1. File exists · 2. **File does not exist, después de un diagnóstico de `test`** · 3. Solo error · 4. Faltan corchetes dobles · 5. Nada |
| 8 | Comparación de Cadenas | 1. Same cat · 2. **Different cats, después de un diagnóstico de sintaxis de test** · 3. Zalgo · 4. Solo error |
| 9 | Declaración de Función | 1. **Hi** · 2. Dan · 3. Hi Dan · 4. greet · 5. Error · 6. Error de sintaxis |
| 10 | Usando tuberías | 1. > · 2. >> · 3. **\|** · 4. \|\| · 5. \|> · 6. Error |
| 11 | Aritmética Básica | 1. echo 2 + 2 · 2. echo ${2 + 2} · 3. echo %(2 + 2) · 4. **echo $(( 2 + 2 ))** · 5. Error |
| 12 | Aritmética Básica | 1. echo 10 * 0.5 · 2. echo (10 * 0.5) · 3. echo ${ 10 * 0.5 } · 4. echo %( 10 * 0.5 ) · 5. echo $(( 10 * 0.5 )) · 6. **echo '10 * 0.5' \| bc** · 7. Error |
| 13 | Extracción de Subcadenas | 1. Bad cat · 2. Bad cat, good cat:9 · 3. **good cat** · 4. Error |
| 14 | Bucles en Bash | 1. do · 2. **each** · 3. for · 4. until · 5. while |
| 15 | Sustitución de comandos | 1. 'ls -l' · 2. % ls -l · 3. $ ls -l · 4. **$(ls -l)** · 5. ${ls -l} |
| 16 | Valores predeterminados | 1. 1>&2 · 2. &2>&1 · 3. **2>&1** · 4. 2>1 · 5. &2>1 |

### quiz-postgres-sql-mastery-pt1

Source SHA256: `8cb97e01f93954cd744f660f427ef83528e228aef5df6c5bdeae527f140c09b6`

Spanish SHA256: `8eb49e21f134137a5c39482257e67019a53aa103d9d414d37f03930697d92e0c`

| Q | Title | Choices in order |
|---|---|---|
| 1 | Agregados incorporados | 1. MIN · 2. MAX · 3. AVG · 4. **MEDIAN** |
| 2 | Variaciones de Sintaxis de Cast | 1. '95'::INTEGER · 2. INTEGER '95' · 3. **CAST('95', INTEGER)** · 4. CAST('95' AS INTEGER) |
| 3 | Restricciones UNIQUE y NULL | 1. No se permiten NULLs · 2. Se permite un NULL · 3. **Se permiten múltiples NULLs** · 4. Depende de la versión de PostgreSQL |
| 4 | Aritmética de Fechas | 1. 2024-11-27 · 2. 2024-11-27 00:00:00 · 3. 2024-11-28 · 4. **2024-11-28 00:00:00** · 5. Error: hora inválida |
| 5 | timestamptz vs timestamp | 1. **Ambos ocupan 8 bytes, pero representan semánticas de timestamp diferentes** · 2. Son intercambiables desde Pg v10 · 3. timestamptz conserva cualquier zona horaria de entrada · 4. timestamptz almacena el nombre o desplazamiento original de la zona horaria · 5. timestamptz almacena un valor de 2 bytes para la zona horaria · 6. timestamptz es el sucesor de timestamp |
| 6 | Identificar tipos inválidos | 1. VARCHAR(100) · 2. CHAR(100) · 3. TEXT · 4. **STRING(100)** · 5. CHARACTER VARYING(100) |
| 7 | Identificar tipos inválidos | 1. int · 2. real · 3. bigint · 4. bigserial · 5. smallserial · 6. **decimal128** · 7. double precision |
| 8 | Identificar tipos inválidos | 1. cidr · 2. inet · 3. **ipv4** · 4. macaddr · 5. macaddr8 · 6. interval |
| 9 | Identificar tipos inválidos | 1. xml · 2. uuid · 3. money · 4. **currency** · 5. interval |
| 10 | Identificar tipos inválidos | 1. box · 2. line · 3. point · 4. circle · 5. polygon · 6. **triangle** |
| 11 | Desbordamiento de Entero | 1. 4294967296 · 2. **Error: integer out of range** · 3. 0 · 4. 2147483647 |
| 12 | Precisión de Timestamp | 1. 2024-01-08 13:30:00+00 · 2. 2024-01-08 13:30:00.123456+00 · 3. 2024-01-08 13:30:00.123456789+00 · 4. **2024-01-08 13:30:00.1234567** |
| 13 | Identificar tipos inválidos | 1. lseg · 2. bytea · 3. tsquery · 4. tsvector · 5. **tsrank** |
| 14 | Momento de la restricción CHECK | 1. **Inmediatamente para filas nuevas o modificadas** · 2. Al confirmar la transacción · 3. En la siguiente consulta · 4. Nunca - las restricciones solo se verifican en INSERT |

### quiz-postgres-sql-mastery-pt2

Source SHA256: `442e06417de424ae712b9a4016865482fd1050ef479a9719f3c28d4709b2d808`

Spanish SHA256: `cc4529d8d030a0717a62d88e3ae6d19f2f0634a60e96837b82ea34153df86252`

| Q | Title | Choices in order |
|---|---|---|
| 1 | Los muchos JOINs de PostgreSQL | 1. **JOIN ALL** · 2. INNER JOIN · 3. CROSS JOIN · 4. LEFT OUTER JOIN · 5. FULL OUTER JOIN |
| 2 | La forma moderna de auto‑incrementar | 1. id SERIAL PRIMARY KEY · 2. id INT IDENTITY(1,1) · 3. id INT AUTO_INCREMENT · 4. id NUMBER GENERATED ALWAYS AS IDENTITY · 5. **id BIGINT GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY** |
| 3 | Cumplimiento de Estándares | 1. INTO · 2. WITH · 3. LATERAL · 4. **RETURNING** |
| 4 | Reversión automática | 1. Depende de los efectos secundarios · 2. **Revierte todas las sentencias** · 3. Confirma solo la primera sentencia · 4. Confirma todas las sentencias exitosas |
| 5 | Elegibilidad de Hash Join | 1. **ON a.id = b.id** · 2. ON a.id > b.id · 3. ON a.id >= b.id · 4. HASH JOIN ON a.id = b.id ... |
| 6 | Orden de Índice de Múltiples Columnas | 1. **CREATE INDEX ON students(grade_level, last_name);** · 2. CREATE INDEX ON students(grade_level); · 3. CREATE INDEX ON students(last_name, age); · 4. CREATE INDEX ON students(first_name, last_name, grade_level); |
| 7 | Citación adecuada | 1. Ambas funcionan igual · 2. **Se requieren comillas dobles** · 3. Se requieren comillas simples · 4. Error de sintaxis: Literal de usuario inválido · 5. Todos los nombres DEBEN estar en minúsculas |
| 8 | Comillas de Nombre de Columna | 1. first.name · 2. **"first.name"** · 3. 'first.name' · 4. [first.name] · 5. [first].[name] |
| 9 | Sintaxis de TABLESAMPLE | 1. ...students SAMPLETABLE BERNOULLI (0.10) · 2. ...students TABLESAMPLE USER (10) · 3. ...students TABLESAMPLE RANDOM (10) · 4. ...students SAMPLE 10 PERCENT · 5. ROW_NUMBER() OVER (ORDER BY RAND()) · 6. ORDER BY RANDOM() >= 10 · 7. WHERE RANDOM() >= 0.1 · 8. **WHERE RANDOM() >= 0.9** |
| 10 | Índices parciales | 1. Sintaxis inválida · 2. Crea índices duplicados · 3. **Solo indexa a los estudiantes activos** · 4. Indexa primero a los estudiantes activos · 5. Proporciona una pista al planificador de consultas |
| 11 | COUNT y NULL | 1. 100 · 2. 90 · 3. 10 · 4. **1** · 5. 0 |
| 12 | Truco de EXPLAIN ANALYZE | 1. Estimación de plan ligera · 2. Solo funciona en SELECT · 3. **Modifica datos y genera plan** · 4. Simula la ejecución para obtener un plan |

### quiz-in-the-aws-cloud

Source SHA256: `8f073f151596d04141eec7cd5a1517d350fc7a7ebb7a42725eac544d8cb8dba9`

Spanish SHA256: `b389f729048caf19a1ad9bbddfdac97a04675bac59ede11878e2825de1aa0ca1`

| Q | Title | Choices in order |
|---|---|---|
| 1 | Trivia de S3 | 1. Server Storage v3 · 2. Storage as a Service · 3. **Simple Storage Service** · 4. Sassy Storage Service · 5. Simple Synchronized Store |
| 2 | DynamoDB | 1. **Almacenar propiedades arbitrarias** · 2. Claves de partición dinámicas · 3. Las columnas no tienen tipo · 4. Esquema JSON gestionado automáticamente · 5. Depende de RDS para soporte de esquema |
| 3 | DynamoDB | 1. PutItem · 2. BatchUpdateItem · 3. BatchWriteItem · 4. **UpdateItem** · 5. BatchUpsertItem · 6. TransactWriteItems |
| 4 | Funciones avanzadas de búsqueda | 1. ElastiCache · 2. **OpenSearch** · 3. Neptune · 4. Redshift · 5. DocumentDB |
| 5 | Despliegue Multi-AZ | 1. Reduce los costos de almacenamiento · 2. Resuelve el problema de salida · 3. **Proporciona conmutación por error automática** · 4. Aumenta el rendimiento de lectura · 5. Mejora el tráfico geo‑distribuido |
| 6 | Hechicería de WebSocket | 1. **API Gateway** · 2. EKS · 3. Lightsail · 4. AppSync · 5. EC2 |
| 7 | Política de Bucket S3 | 1. Hacer públicos los nuevos buckets · 2. Mover S3 on-premises para controlar completamente las ACLs · 3. Mover datos a una blockchain privada · 4. **Usar el principio de privilegio mínimo** · 5. Usar comodines en políticas para garantizar el acceso necesario |
| 8 | Aurora Serverless | 1. Siempre más barato que provisionado · 2. **Escala automáticamente la capacidad de cómputo** · 3. Proporciona almacenamiento ilimitado · 4. Elimina la gestión de la base de datos |
| 9 | Límites de BatchGetItem | 1. 1 · 2. 25 · 3. **100** · 4. 75 · 5. 50 · 6. 200 · 7. Sin límite |
| 10 | Operaciones por lotes | 1. **1** · 2. 10 · 3. 25 · 4. 50 · 5. 100 · 6. 100 al usar streaming · 7. Ninguna de las anteriores |
| 11 | Capacidad Provisionada vs On-Demand | 1. La capacidad provisionada siempre es mejor · 2. La capacidad On-Demand tiene capacidad ilimitada · 3. Rinden idénticamente · 4. **On-Demand evita aprovisionar capacidad para tráfico esporádico e impredecible** |
| 12 | Optimización de Rendimiento de S3 | 1. Usar prefijos aleatorios/hash · 2. **Usar prefijos lógicos; no se requiere aleatorización** · 3. Siempre usar los objetos más grandes · 4. Minimizar la cantidad de objetos |
| 13 | Estrategia de Copia de Seguridad de RDS | 1. Solo instantáneas manuales · 2. No se necesitan copias de seguridad · 3. **Copias de seguridad automatizadas con recuperación punto en el tiempo** · 4. Copias de seguridad completas semanales |
| 14 | Redis vs Memcached | 1. **Redis admite más estructuras de datos y operaciones** · 2. Idéntico en todos los aspectos · 3. Compatibilidad a nivel de API · 4. Memcached siempre es más rápido |
| 15 | Índice Secundario Global | 1. Idéntico a la clave primaria · 2. Sin costo adicional · 3. Reduce el rendimiento de escritura · 4. **Permite consultar atributos que no son clave primaria** |
| 16 | Gestión del ciclo de vida de S3 | 1. Mover objetos manualmente · 2. **Transicionar automáticamente objetos entre clases de almacenamiento** · 3. Nunca eliminar objetos antiguos · 4. Almacenar todo en la clase Standard |
| 17 | Escalando lecturas con Amazon Aurora | 1. Limitado a una sola réplica de lectura · 2. No es posible escalar lecturas · 3. **Soporta hasta 15 réplicas de lectura** · 4. Réplicas de lectura ilimitadas |
| 18 | Cifrado de RDS | 1. **Cifrar datos en reposo y en tránsito** · 2. El cifrado es opcional · 3. No hay cifrado disponible · 4. Solo cifrar columnas específicas |
| 19 | Propósito de DynamoDB Streams | 1. Almacenar copias de datos adicionales · 2. Créditos de DynamoDB para proveedores verdes · 3. Incrementar el rendimiento de escritura · 4. **Capturar cambios a nivel de ítem para arquitecturas orientadas a eventos** · 5. Alternativa a los índices secundarios globales |
| 20 | Transferencia de Archivos Grandes | 1. Siempre usar una única solicitud PUT · 2. **Usar carga multipart para archivos grandes** · 3. Comprimir antes de subir · 4. Dividir manualmente antes de subir |
| 21 | Análisis de Costos de Almacenamiento | 1. S3 Standard para todos los datos · 2. Siempre usar el almacenamiento más barato · 3. **Combinar clases de almacenamiento según los patrones de acceso** · 4. Almacenar todo en Glacier |
| 22 | Modelos de consistencia | 1. **100 lecturas por segundo** · 2. 50 lecturas por segundo · 3. 200 lecturas por segundo · 4. Lecturas ilimitadas por segundo |
| 23 | Mecanismo de conmutación por error de Aurora | 1. Se requiere intervención manual · 2. Requiere reconfiguración de la aplicación · 3. Siempre cambia a la réplica más antigua · 4. **Promoción automática basada en el nivel de prioridad de conmutación por error** |
| 24 | Consistencia fuerte de S3 | 1. Solo para objetos nuevos · 2. **Consistencia fuerte de lectura tras escritura para escrituras, eliminaciones y listados de objetos** · 3. Consistente eventual para actualizaciones · 4. Depende de la región |
| 25 | Tiempo de Vida (TTL) | 1. Elimina los ítems inmediatamente al expirar · 2. Requiere un disparador de eliminación manual · 3. **Eliminación en segundo plano con tiempo de mejor esfuerzo** · 4. Expira los ítems pero los mantiene almacenados |
| 26 | Comportamiento de Escalado | 1. **La velocidad de escalado depende de la capacidad actual y la configurada** · 2. Escala instantáneamente bajo demanda · 3. Solo escala en intervalos predefinidos · 4. Escalado manual únicamente |

### quiz-is-your-memory-rusty

Source SHA256: `e31e6449bc819ea5691b0d41998b3052afe28378c4dbe0bab4551abe753c2f9c`

Spanish SHA256: `71e163a5c37982da0a8fdb18bc5e87f683d10dea00a4b9227e95dc4b9f84784c`

| Q | Title | Choices in order |
|---|---|---|
| 1 | Semántica Básica de Movimiento | 1. Hello, ! · 2. Hello, Zeno of Citium! · 3. Hello, Zeno of Elea! · 4. Hello, Marcus Aurelius · 5. **Error de compilación: valor prestado después del movimiento** · 6. Error de tiempo de ejecución: excepción de puntero nulo |
| 2 | Semántica de movimiento con funciones | 1. Imprime ambas líneas · 2. Imprime solo la primera línea · 3. **Error de compilación** · 4. Error en tiempo de ejecución |
| 3 | Referencias Mutables | 1. Compila con éxito · 2. **Error: no se puede prestar `wisdom` como mutable más de una vez** · 3. Error: falta especificador de lifetime · 4. Pánico en tiempo de ejecución |
| 4 | Lifetimes Implícitos | 1. **Compila con éxito** · 2. Error: falta especificador de lifetime · 3. Error: se requiere lifetime explícito · 4. Error: incompatibilidad de lifetimes |
| 5 | Puntero Inteligente Box | 1. 5 · 2. null · 3. **Error de compilación** · 4. Desbordamiento de pila |
| 6 | Puntero inteligente Rc | 1. Reference count: 1 · 2. Reference count: 2 · 3. **Reference count: 3** · 4. Error de compilación |
| 7 | Estructuras con lifetimes | 1. Compila correctamente · 2. **Error: falta especificador de lifetime** · 3. Error: incompatibilidad de lifetimes · 4. Error: referencia inválida |
| 8 | Anotaciones de lifetimes | 1. Resultado: Séneca el Joven · 2. **Error: falta especificador de lifetime** · 3. Error: no se puede devolver referencia a variable local · 4. Error: incompatibilidad de lifetimes |
| 9 | Comportamiento de RefCell | 1. Imprime: 42 · 2. **Pánico en tiempo de ejecución: RefCell ya está prestado** · 3. Error de compilación · 4. Pánico en tiempo de ejecución: mensaje diferente |
| 10 | Cell vs RefCell | 1. **Imprime: 42, 43** · 2. Imprime: 43, 43 · 3. Error de compilación · 4. Pánico en tiempo de ejecución |
| 11 | Entendiendo Rc | 1. **Rc se usa en entornos de un solo hilo** · 2. Rc se usa en entornos multihilo · 3. Rc solo se usa para datos inmutables · 4. Rc solo se usa para datos mutables · 5. Rc es para control remoto |
| 12 | RefCells y Hilos | 1. RefCell se usa para préstamos mutables, Rw para inmutables · 2. Rw se usa para préstamos mutables, RefCell para inmutables · 3. RefCell y Rw se usan para el mismo propósito · 4. **RefCell no es Sync; RwLock permite compartir con sincronización** · 5. Rw solo se usa en entornos multihilo |
| 13 | Arc y Mutex | 1. Imprime: 42 · 2. Imprime: 43 · 3. Error de compilación · 4. Retorna normalmente sin imprimir · 5. **Interbloqueo o panic** |
| 14 | Referencias débiles | 1. Imprime: Some("Wisdom") · 2. **Imprime: None** · 3. Error de compilación · 4. Panic en ejecución · 5. Pánico existencial |
| 15 | Patrón RAII | 1. **El recurso se libera después del alcance** · 2. Fugas de recursos · 3. Error de compilación · 4. Error en tiempo de ejecución |
| 16 | Copiar vs Clonar | 1. Error de compilación · 2. **Copia profunda creada** · 3. Copia superficial creada · 4. Se aplican semánticas de movimiento |
| 17 | Optimización de Memoria | 1. 16 bytes · 2. 24 bytes · 3. **32 bytes** · 4. Depende de la plataforma |
| 18 | Abstracciones de Costo Cero | 1. Sobrecarga en tiempo de ejecución del iterador · 2. **El iterador puede ser tan eficiente como un bucle manual** · 3. Más lento pero más legible · 4. Los iteradores no se pueden optimizar |

### quiz-advanced-js-error-mastery

Source SHA256: `e00c048b44ae6dec4bee8aedf31356a8c002564399f9e3525175ace3b2fe3bbb`

Spanish SHA256: `41b83c0403bf0da4ada81c535ee5c7156bfea94a25a50e1a9fed245b2a3b001c`

| Q | Title | Choices in order |
|---|---|---|
| 1 | El Misterio del Objeto Vacío | 1. {"message":"Oops","name":"Error"} · 2. **{}** · 3. {"error":"Oops"} · 4. null |
| 2 | Consola vs JSON | 1. Ambos muestran la misma salida · 2. **console.log muestra más información** · 3. JSON.stringify muestra más información · 4. Ambos muestran objetos vacíos |
| 3 | Herencia instanceof | 1. **true, true, true** · 2. true, false, false · 3. false, true, true · 4. true, true, false |
| 4 | instanceof entre marcos | 1. Siempre verdadero · 2. Siempre falso · 3. **Puede ser falso entre marcos** · 4. Lanza un error |
| 5 | Lanzar Cadenas | 1. TypeError: string is not an Error · 2. **false, "string"** · 3. Crea un objeto Error automáticamente · 4. comportamiento indefinido |
| 6 | Propiedad name del Error | 1. "Error" · 2. **"CustomError"** · 3. undefined · 4. Depende del navegador |
| 7 | Trampa del Nombre del Constructor | 1. "MyError" · 2. **"Error"** · 3. undefined · 4. TypeError |
| 8 | Error.cause moderno | 1. **"Original error"** · 2. undefined · 3. The wrapping error · 4. SyntaxError |
| 9 | Manipulación de Pilas | 1. **Elimina `createError` de la pila** · 2. Borra toda la pila · 3. No hace nada · 4. Lanza un TypeError |
| 10 | Plantillas de texto en errores | 1. "Value ${value} is invalid" · 2. **"Value undefined is invalid"** · 3. ReferenceError: value is not defined · 4. "Value  is invalid" |
| 11 | Error de respuesta de Express | 1. Envía el objeto de error completo · 2. **Envía {"error":{}}** · 3. Lanza un error del servidor · 4. Envía solo el mensaje de error |
| 12 | Valores de Rechazo de Promesas | 1. Siempre objetos Error · 2. **Cualquier valor puede ser un rechazo** · 3. Solo cadenas y objetos Error · 4. Envuelto automáticamente en Error |
| 13 | Propiedades no estándar | 1. Siempre disponible · 2. **Puede no existir en todos los entornos** · 3. Solo en Node.js · 4. Obsoleto y eliminado |
| 14 | Objeto vs Detección de Error | 1. true, true · 2. **false, false** · 3. true, false · 4. false, true |
