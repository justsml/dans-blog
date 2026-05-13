# Translation Candidate
- Slug: quiz-sql-query-fundamentals
- Locale: es
- Model: openrouter/openai/gpt-oss-120b:nitro
- Target: src/content/posts/2024-11-08--quiz-sql-query-fundamentals/es/index.mdx
- Validation: passed
- Runtime seconds: 10.71
- Input tokens: 9748
- Output tokens: 5868
- Thinking tokens: unknown
- Cached input tokens: 3712
- Cache write tokens: 0
- Estimated cost: $0.001436
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
unlisted: false
title: 'Quiz: ¡Demuestra tus habilidades en SQL!'
subTitle: ¿Eres del equipo SQL o NoSQL?
label: SQL 101
social_image: ../desktop-social.webp
category: Quiz
subCategory: Database
date: '2024-11-08'
modified: '2024-11-08'
tags:
  - quiz
  - intro
  - sql
  - core
  - fundamentals
  - beginner
  - intermediate
cover_full_width: ../peter-thomas-os14nsuXdI4-unsplash-wide.webp
cover_mobile: ../peter-thomas-os14nsuXdI4-unsplash-square.webp
cover_icon: ../peter-thomas-os14nsuXdI4-unsplash-square.webp
---
import Challenge from '../../../../../components/QuizUI/Challenge';
import QuizUI from '../../../../../components/QuizUI/QuizUI';


## Pon a prueba tus fundamentos de consultas SQL

¿Te ha ablandado el uso de un ORM en el departamento de habilidades?  
No te preocupes, le pasa a un montón de devs.

¡Sumérgete de una vez y demuestra tus fundamentos de consultas SQL! 👇

<QuizUI>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={0}
  group="Fundamentos de SQL"
  title="Cláusula WHERE básica"
  options={[
    {text: 'SELECT * FROM users WHERE name LIKE(John);'},
    {text: 'SELECT * FROM users WHERE name = \', isAnswer: true},
    {text: 'SELECT * FROM users WHERE name == "John";'},
    {text: 'SELECT * FROM users WHERE name === "John";'},
  ]}
>
  <slot name="question">
  <div className="question">
    ¿Cuál de las siguientes consultas SQL recupera correctamente las filas donde el nombre es "John"?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    En SQL, se usa un solo signo igual (`=`) para las comparaciones de igualdad en la cláusula `WHERE`, no `==` o `===`, que son operadores de JavaScript.

    La sintaxis correcta es `SELECT * FROM users WHERE name = 'John';`.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={1}
  group="Conceptos básicos de SQL"
  title="Función de agregación COUNT"
  options={[
    {text: 'Cuenta todas las filas, incluidos los valores NULL'},
    {text: 'Cuenta solo los valores no NULL en una columna', isAnswer: true},
    {text: 'Cuenta los valores NULL como un valor único'},
    {text: 'Trata cada valor NULL como único, similar a NaN !== NaN'},
  ]}
>
  <slot name="question">
  <div className="question">
    ¿Qué hace `COUNT(column_name)` en SQL?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    `COUNT(column_name)` cuenta el número de valores no NULL en una columna especificada. Para contar todas las filas, incluidos los NULL, usa `COUNT(*)`.

    También puedes usar `COALESCE` para asegurar que los NULL tengan un valor no NULL por defecto. Algo así: `COUNT(COALESCE(column_name, 0))`.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={2}
  group="Uniones SQL"
  title="Conceptos básicos de LEFT JOIN"
  options={[
    {text: 'Devuelve una fila por cada coincidencia, ignora las filas sin coincidencia'},
    {text: 'Devuelve todas las filas de la tabla izquierda, más las filas coincidentes de la derecha', isAnswer: true},
    {text: 'Devuelve todas las filas, coincidentes o no, donde NULL indica que no hay coincidencia'},
    {text: 'Devuelve todas las filas de la tabla derecha, con las filas coincidentes de la izquierda'},
  ]}
>
  <slot name="question">
  <div className="question">
    ¿Qué hace un `LEFT JOIN` en SQL?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Un `LEFT JOIN` devuelve todas las filas de la tabla izquierda y las filas coincidentes de la tabla derecha, con NULL para las filas sin coincidencia en la tabla derecha.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={3}
  group="Uniones SQL"
  title="Usando INNER JOIN"
  options={[
    {text: 'Devuelve filas no coincidentes de ambas tablas'},
    {text: 'Devuelve todas las filas de ambas tablas, con NULLs para las filas no coincidentes'},
    {text: 'Devuelve filas que cumplen la condición de unión en ambas tablas', isAnswer: true},
    {text: 'Devuelve filas no coincidentes de la tabla derecha'},
  ]}
>
  <slot name="question">
  <div className="question">
    ¿Qué hace un `INNER JOIN` en SQL?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Un `INNER JOIN` devuelve filas donde la condición de unión coincide con filas de ambas tablas. Las filas no coincidentes no se incluyen en el conjunto de resultados.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={4}
  group="Subconsultas SQL"
  title="Subconsulta Correlacionada"
  options={[
    {text: 'Una subconsulta que se ejecuta una sola vez en total'},
    {text: 'Una subconsulta usada solo en sentencias JOIN'},
    {text: 'Una subconsulta que solo devuelve múltiples columnas'},
    {text: 'Una subconsulta que se ejecuta una vez por cada fila de la consulta externa', isAnswer: true},
  ]}
>
  <slot name="question">
  <div className="question">
    ¿Qué es una subconsulta correlacionada en SQL?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Una subconsulta correlacionada se evalúa una vez por cada fila de la consulta externa. Hace referencia a columnas de la consulta externa, lo que la vuelve dependiente de cada fila.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={5}
  group="CTEs de SQL"
  title="Sintaxis de la cláusula WITH"
  options={[
    {text: 'Solo permitido en sentencias DELETE'},
    {text: 'Se usa para funciones de agregación'},
    {text: 'Se usa solo para definir vistas'},
    {text: 'Definir un conjunto de resultados temporal para usar en una sentencia SQL más grande', isAnswer: true},
  ]}
>
  <slot name="question">
  <div className="question">
    ¿Cuál es el propósito de la cláusula `WITH` (Expresión de Tabla Común) en SQL?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    La cláusula `WITH`, o Expresión de Tabla Común (CTE), se usa para definir un conjunto de resultados temporal que puede ser referenciado dentro de la consulta principal. En PostgreSQL, `WITH` puede adjuntarse a sentencias como `SELECT`, `INSERT`, `UPDATE`, `DELETE` o `MERGE`.

    Esto puede ayudar a mejorar la legibilidad y mantenibilidad de consultas complejas.

    La sintaxis es:
    ```sql
    WITH cte_name AS (
    SELECT column_name
    FROM table_name
    )
    SELECT *
    FROM cte_name;
    ```
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={6}
  group="Fundamentos de SQL"
  title="IS NULL vs IS NOT NULL"
  options={[
    {text: 'Comprueba si un valor es NULL', isAnswer: true},
    {text: 'Comprueba si un valor está vacío'},
    {text: 'Comprueba si un valor es una cadena'},
    {text: 'Comprueba si un valor es numérico'},
  ]}
>
  <slot name="question">
  <div className="question">
    ¿Qué hace el operador `IS NULL` en SQL?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    `IS NULL` verifica si una columna especificada contiene un valor NULL. `IS NOT NULL` verifica lo contrario.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={7}
  group="Operadores SQL"
  title="Uso del operador IN"
  options={[
    {text: 'Devuelve filas únicas'},
    {text: 'Requiere una columna indexada'},
    {text: 'Se aplica solo a columnas numéricas'},
    {text: 'Devuelve filas que coinciden con los valores de una lista especificada', isAnswer: true},
  ]}
>
  <slot name="question">
  <div className="question">
    ¿Qué hace el operador `IN` en SQL?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    El operador `IN` filtra filas para que coincidan con cualquiera de los valores de una lista especificada, a menudo como alternativa a múltiples condiciones OR.

    Aunque *puede* devolver "filas únicas" (y a menudo lo hace), no es necesariamente su objetivo principal.

    No se requiere indexación aquí, aunque ciertamente es una buena práctica usar `IN` sobre una columna con índice, preferiblemente un índice `UNIQUE`, ya que puede mejorar el rendimiento.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={8}
  group="Funciones SQL"
  title="Usando la función COALESCE"
  options={[
    {text: 'Cuenta valores NULL'},
    {text: 'Devuelve el último argumento no NULL'},
    {text: 'Devuelve el primer argumento no NULL', isAnswer: true},
    {text: 'Limitado a columnas IDENTITY'},
    {text: 'Originalmente de Printer Coalation'},
  ]}
>
  <slot name="question">
  <div className="question">
    ¿Qué hace la función `COALESCE` en SQL?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    La función `COALESCE` devuelve el primer valor no NULL de una lista especificada, útil para sustituir valores predeterminados cuando se encuentran NULLs.

    Por ejemplo, `COALESCE(column_name, 0)` devolvería `0` si `column_name` es `NULL`.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={9}
  group="Funciones de agregación SQL"
  title="Uso de GROUP BY"
  options={[
    {text: 'Oculta duplicados'},
    {text: 'Solo se usa en joins'},
    {text: 'Ordena filas en orden ascendente'},
    {text: 'Agrupa filas por la(s) columna(s) especificada(s)', isAnswer: true},
    {text: 'La sintaxis debería ser GROUP WITH/USING'},
  ]}
>
  <slot name="question">
  <div className="question">
    ¿Cuál es el propósito de la cláusula `GROUP BY` en SQL?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    La cláusula `GROUP BY` agrupa filas que tienen los mismos valores en las columnas especificadas, permitiendo que se apliquen funciones de agregación a cada grupo.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={10}
  group="Uniones SQL"
  title="Conceptos básicos de FULL OUTER JOIN"
  options={[
    {text: 'Devuelve solo filas coincidentes'},
    {text: 'Devuelve solo filas con valores no nulos'},
    {text: 'Devuelve solo filas no coincidentes de la tabla izquierda'},
    {text: 'Devuelve solo filas no coincidentes de la tabla derecha'},
    {text: 'Devuelve todas las filas de ambas tablas, con NULLs para las filas no coincidentes', isAnswer: true},
  ]}
>
  <slot name="question">
  <div className="question">
    ¿Qué hace un `FULL OUTER JOIN` en SQL?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Un `FULL OUTER JOIN` devuelve todas las filas de ambas tablas, rellenando las filas no coincidentes con NULLs para los valores faltantes.

    Esto es útil para comparar dos tablas y encontrar diferencias entre ellas.
  </div>
  </slot>
</Challenge>

</QuizUI>
````
