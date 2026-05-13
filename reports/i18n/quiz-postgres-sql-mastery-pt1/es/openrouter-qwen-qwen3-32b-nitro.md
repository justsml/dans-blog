# Translation Candidate
- Slug: quiz-postgres-sql-mastery-pt1
- Locale: es
- Model: openrouter/qwen/qwen3-32b:nitro
- Target: src/content/posts/2024-11-27--quiz-postgres-sql-mastery-pt1/es/index.mdx
- Validation: rejected: direct AI SDK translation failed
- Runtime seconds: 39.56
- Input tokens: 12935
- Output tokens: 12144
- Thinking tokens: unknown
- Cached input tokens: 512
- Cache write tokens: 0
- Estimated cost: $0.003949
- Pricing source: local-openrouter-estimate
- Note: Command failed: bun run i18n:validate --slug quiz-postgres-sql-mastery-pt1 --locale es
## Raw Output

````mdx
---
unlisted: false
social_image: ../mobile.webp
title: 'Cuestionario: Postgres Profundo: Parte 1'
subTitle: ¿SQL te hace chillar?
label: 'Deep PostgreSQL #1'
category: Quiz
subCategory: Database
date: '2024-11-27'
modified: '2024-12-03'
tags:
  - quiz
  - postgresql
  - sql
  - database
  - intermediate
  - advanced
cover_full_width: ../elephant-synthwave-gym-wide.webp
cover_mobile: ../elephant-synthwave-gym-square-200.webp
cover_icon: ../elephant-synthwave-gym-square-200.webp
---
```jsx
import Challenge from '../../../../../components/QuizUI/Challenge';
import QuizUI from '../../../../../components/QuizUI/QuizUI';

> **Parte 1 de 2.** [Ir a la Parte 2](/quiz-postgres-sql-mastery-pt2/)

<p class="inset">PostgreSQL 🐘 Es fácilmente mi base de datos favorita. Siempre estoy aprendiendo nuevos trucos y trampas, así que decidí crear un nuevo cuestionario para compartirlas.</p>

Este cuestionario cubre una mezcla de características conocidas y menos conocidas de PostgreSQL, desde agregados integrados hasta conversión de tipos, restricciones y más.

¡Buena suerte! 🍀
```

<QuizUI>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={0}
  group="Calentamiento: Funciones"
  title="Funciones de agregado integradas"
  options={[
    {text: 'MIN'},
    {text: 'MAX'},
    {text: 'AVG'},
    {text: 'MEDIAN', isAnswer: true},
  ]}
>
  <slot name="question">
  <div className="question">
    ¿Cuál NO es una función de agregado integrada en PostgreSQL?
    ```sql
    SELECT 
      MIN(grade) as lowest,
      MAX(grade) as highest,
      AVG(grade) as average,
      MEDIAN(grade) as middle
    FROM grades;
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    `MEDIAN` no está integrada ¡Necesitas:
    ```sql
    PERCENTILE_CONT(0.5) 
    WITHIN GROUP (ORDER BY grade)
    ```
    Funciones de agregado integradas comunes:
    - `MIN`, `MAX`, `COUNT`
    - `AVG`, `SUM`
    - `ARRAY_AGG`, `STRING_AGG`
    - Diversas funciones estadísticas
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={1}
  group="Calentamiento: Conversión de Tipos"
  title="Variaciones de Sintaxis de Conversión de Tipos"
  options={[
    {text: '\'95\'::INTEGER'},
    {text: 'INTEGER \'95\''},
    {text: 'CAST(\'95\', INTEGER)', isAnswer: true},
    {text: 'CAST(\'95\' AS INTEGER)'},
  ]}
>
  <slot name="question">
  <div className="question">
    ¿Cuál de estas conversiones de tipo es **inválida** ❌?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    PostgreSQL soporta tres sintaxis de conversión:

    1. ANSI SQL: `CAST(expresión AS tipo)`.
    2. PostgreSQL: `expresión::tipo`.
    3. Función de tipo: `tipo 'literal'`.

    Todas son funcionalmente equivalentes, pero:
    - `CAST()` es más portable.
    - `::` es específico de PostgreSQL pero comúnmente usado.
    - La notación infija `tipo 'literal'` es menos común pero válida.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={2}
  group="Restricciones"
  title="Restricciones UNIQUE y NULL"
  options={[
    {text: 'No se permiten NULLs'},
    {text: 'Se permite un NULL'},
    {text: 'Se permiten múltiples NULLs', isAnswer: true},
    {text: 'Depende de la versión de PostgreSQL'},
  ]}
>
  <slot name="question">
  <div className="question">
    ¿Cuántos valores NULL se permiten aquí?
    ```sql
    CREATE TABLE student_emails (
      student_id INTEGER,
      email VARCHAR(255),
      UNIQUE(email)
    );
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Restricciones UNIQUE en PostgreSQL:
    - Permiten múltiples valores NULL.
    - `NULL` ≠ `NULL` en las comprobaciones de unicidad.

    Para evitar valores NULL, agrega `NOT NULL`:
    ```sql
    CREATE TABLE student_emails (
      student_id INTEGER,
      email VARCHAR(255) NOT NULL,
      UNIQUE(email)
    );
    ```
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={3}
  group="Fecha/Hora"
  title="Aritmética de fechas"
  options={[
    {text: '2024-11-27'},
    {text: '2024-11-27 00:00:00'},
    {text: '2024-11-28'},
    {text: '2024-11-28 00:00:00', isAnswer: true},
    {text: 'Error: invalid time'},
  ]}
>
  <slot name="question">
  <div className="question">
    ¿Qué devuelve esto?
    ```sql
    SELECT '2024-11-27'::date + interval '24 hours';
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    ¡Los intervalos son una herramienta poderosa para simplificar operaciones con rangos de fechas!

    Aritmética de fechas en PostgreSQL:
    - `+ interval '24 hours'` suma 24 horas
    - `+ interval '1 day'` suma 1 día
    - `+ interval '1 month'` suma 1 mes
    - `+ interval '1 year'` suma 1 año

    El resultado es `2024-11-28 00:00:00`.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={4}
  group="Marcas de tiempo"
  title="timestamptz vs timestamp"
  options={[
    {text: 'Ambos ocupan 8 bytes, pero representan diferentes semánticas de marca de tiempo', isAnswer: true},
    {text: 'Ellos\'},
    {text: 'timestamptz preserva cualquier zona horaria de entrada'},
    {text: 'timestamptz almacena el nombre o desplazamiento original de la zona horaria'},
    {text: 'timestamptz almacena un valor de 2 bytes para TZ'},
    {text: 'timestamptz es el sucesor de timestamp'},
  ]}
>
  <slot name="question">
  <div className="question">
    ¿Cuál es la afirmación **más precisa** sobre `timestamptz` y `timestamp`?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Ambos son de 8 bytes, pero no almacenan el mismo tipo de valor.

    ¿Entonces qué diferencia hay? Está en el análisis de la entrada.

    **`timestamptz`**
    - Normaliza la entrada a un punto absoluto en el tiempo.
    - Toma en cuenta la configuración de `TimeZone` del servidor/conexión al analizar entradas sin desplazamiento explícito y al mostrar la salida.

    **`timestamp`**
    - Almacena fecha y hora sin conversión de zonas horarias.
    - No preserva ni normaliza información de zonas horarias.


    **`timestamp`**

    - Almacena fecha y hora sin información de zona horaria.
    - Útil para almacenar fechas estandarizadas explícitamente, ya sea en UTC o una zona horaria específica.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={5}
  group="Tipos de Postgres"
  title="Identificar tipos no válidos"
  options={[
    {text: 'VARCHAR(100)'},
    {text: 'CHAR(100)'},
    {text: 'TEXT'},
    {text: 'STRING(100)', isAnswer: true},
    {text: 'CHARACTER VARYING(100)'},
  ]}
>
  <slot name="question">
  <div className="question">
    ¿Cuál de estos NO ❌ es un tipo válido de PostgreSQL?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    PostgreSQL tiene un conjunto rico de tipos de datos, pero `STRING(100)` no es uno de ellos.

    Los tipos de cadena válidos incluyen:
    - `VARCHAR(100)` (cadena de longitud variable)
    - `CHAR(100)` (cadena de longitud fija)
    - `TEXT` (longitud ilimitada)
    - `CHARACTER VARYING(100)` (equivalente a `VARCHAR(100)`)
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={6}
  group="Tipos de Postgres"
  title="Identificar tipos no válidos"
  options={[
    {text: 'int'},
    {text: 'real'},
    {text: 'bigint'},
    {text: 'bigserial'},
    {text: 'smallserial'},
    {text: 'decimal128', isAnswer: true},
    {text: 'double precision'},
  ]}
>
  <slot name="question">
  <div className="question">
    ¿Cuál de estos NO ✅ es un tipo válido de PostgreSQL?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Puede parecer familiar porque `decimal128` es un tipo en muchos lugares (incluidos Mongo y Java). No es un tipo válido de PostgreSQL, el correcto es `decimal`.

    Los tipos numéricos válidos incluyen:
    - `int` (entero de 4 bytes)
    - `bigint` (entero de 8 bytes)
    - `real` (punto flotante de 4 bytes)
    - `double precision` (punto flotante de 8 bytes)
    - `bigserial` (entero autoincremental de 8 bytes)
    - `smallserial` (entero autoincremental de 2 bytes)
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={7}
  group="Tipos de Postgres"
  title="Identificar tipos no válidos"
  options={[
    {text: 'cidr'},
    {text: 'inet'},
    {text: 'ipv4', isAnswer: true},
    {text: 'macaddr'},
    {text: 'macaddr8'},
    {text: 'interval'},
  ]}
>
  <slot name="question">
  <div className="question">
    ¿Cuál de estos NO ❌ es un tipo válido de PostgreSQL?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    ¿Te hizo sentir frustrado, incluso _enfadado_? No estás solo. Para citar a un contribuyente "clave" de bases de datos, "¿qué carajo, Dan?! Me caí en las preguntas de tipos. ¡Violento, señor! No compartiré mi puntuación, jaja." 😈 ¡De nada!

    El conjunto rico de tipos de red de PostgreSQL _no_ incluye `ipv4`. Cada vez que intento usarlo sin buscar en Google, me equivoco. Quizás `macaddr8` me hace pensar que _debería existir_ tipos `ipv4` y `ipv6`. No, `inet` cubre ambos. Además, `cidr` cubre las máscaras de red para ambos.

    Los tipos de red válidos incluyen:
    - `cidr` (dirección de red IPv4/IPv6)
    - `inet` (dirección de host IPv4/IPv6)
    - `macaddr` (dirección MAC)
    - `macaddr8` (dirección MAC EUI-64)
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={8}
  group="Tipos de Postgres"
  title="Identificar tipos no válidos"
  options={[
    {text: 'xml'},
    {text: 'uuid'},
    {text: 'money'},
    {text: 'currency', isAnswer: true},
    {text: 'interval'},
  ]}
>
  <slot name="question">
  <div className="question">
    ¿Cuál de estos NO ❌ es un tipo válido de PostgreSQL?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    PostgreSQL tiene un conjunto rico de tipos especializados, pero `currency` no es uno de ellos!

    Los tipos válidos incluyen:
    - `xml` (datos XML)
    - `uuid` (UUID)
    - `money` (cantidad de moneda)
    - `interval` (intervalo de tiempo)
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={9}
  group="Tipos de Postgres"
  title="Identificar tipos no válidos"
  options={[
    {text: 'box'},
    {text: 'line'},
    {text: 'point'},
    {text: 'circle'},
    {text: 'polygon'},
    {text: 'triangle', isAnswer: true},
  ]}
>
  <slot name="question">
  <div className="question">
    ¿Cuál de estos NO ❌ es un tipo válido de PostgreSQL?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    PostgreSQL tiene un conjunto rico de tipos especializados, pero `triangle` no es uno de ellos.

    Creo que las versiones futuras de [GEOS](https://libgeos.org/) incluirán soporte `Triangle` OGC/WKT, lo que significa que eventualmente debería ser incluido en Postgis. (Básicamente, esta respuesta podría estar equivocada en el futuro.)

    Los tipos especializados correctos incluyen:
    - `box` (caja rectangular)
    - `line` (línea infinita)
    - `point` (punto 2D)
    - `circle` (círculo 2D)
    - `polygon` (polígono 2D)
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={10}
  group="Aritmética de Enteros"
  title="Desbordamiento de Entero"
  options={[
    {text: '4294967296'},
    {text: 'Error: entero fuera de rango', isAnswer: true},
    {text: '0'},
    {text: '2147483647'},
  ]}
>
  <slot name="question">
  <div className="question">
    ¿Qué ocurre al calcular el total de posibles IDs de estudiantes?
    ```sql
    SELECT 256 * 256 * 256 * 256;
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    El tipo `integer` de PostgreSQL es de 32 bits con signo, con un rango de `-2,147,483,648` a `2,147,483,647`.

    El cálculo `256^4` = `4,294,967,296` excede este rango.

    Para manejar números más grandes:
    ```sql
    -- Use BIGINT
    SELECT 256::bigint * 256 * 256 * 256;

    -- Or numeric for arbitrary precision
    SELECT 256::numeric * 256 * 256 * 256;
    ```
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={11}
  group="Fecha/Hora"
  title="Precisión de marca de tiempo"
  options={[
    {text: '2024-01-08 13:30:00+00'},
    {text: '2024-01-08 13:30:00.123456+00'},
    {text: '2024-01-08 13:30:00.123456789+00'},
    {text: '2024-01-08 13:30:00.1234567', isAnswer: true},
  ]}
>
  <slot name="question">
  <div className="question">
    ¿Cuál es el literal de `timestamp` más pequeño que excede la precisión máxima de `time` en Postgres?
    ```sql
    CREATE TABLE class_sessions (
      id INT GENERATED BY DEFAULT AS IDENTITY,
      start_time timestamptz,
      end_time timestamptz
    );
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Los timestamps de PostgreSQL tienen precisión de microsegundos (6 decimales).

    - Máximo: `.123456` (6 dígitos)
    - Nanosegundos (9 dígitos) se redondean o truncan a la precisión soportada
    - Los offsets de zona horaria son aceptados para `timestamptz`, pero no son obligatorios

    **Atrapado menos común:** Algunos lenguajes/marcos envían precisión de nanosegundos, pero PostgreSQL almacena timestamps con precisión de microsegundos.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={12}
  group="Tipos de Postgres"
  title="Identificar tipos no válidos"
  options={[
    {text: 'lseg'},
    {text: 'bytea'},
    {text: 'tsquery'},
    {text: 'tsvector'},
    {text: 'tsrank', isAnswer: true},
  ]}
>
  <slot name="question">
  <div className="question">
    ¿Cuál de estos NO es ❌ un tipo válido de PostgreSQL?

    (En serio, estos son (en su mayoría) tipos reales.)
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    PostgreSQL tiene varios tipos geométricos y de búsqueda de texto integrados, pero `tsrank` no es uno de ellos.

    Los tipos geométricos y de búsqueda de texto correctos incluyen:
    - `lseg` (segmento de línea)
    - `bytea` (datos binarios)
    - `tsquery` (consulta de búsqueda de texto)
    - `tsvector` (documento de búsqueda de texto)
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={13}
  group="Restricciones"
  title="Momento de verificación de la restricción CHECK"
  options={[
    {text: 'Inmediatamente para filas nuevas o modificadas', isAnswer: true},
    {text: 'En la confirmación de la transacción'},
    {text: 'En la siguiente consulta'},
    {text: 'Nunca - las restricciones solo se verifican en INSERT'},
  ]}
>
  <slot name="question">
  <div className="question">
    ¿Cuándo se verifica esta restricción de calificación?
    ```sql
    ALTER TABLE students 
    ADD CONSTRAINT valid_grade 
    CHECK (
      (grade >= 0 AND grade <= 100) OR 
      grade IS NULL
    ) NOT VALID;
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    `NOT VALID` constraints:
    - Se verifican inmediatamente para nuevos inserts y updates
    - No validan filas existentes
    - Pueden validar filas existentes más tarde con `VALIDATE CONSTRAINT`
    - Útiles para tablas grandes

    Sin `NOT VALID`:
    - La restricción se verifica inmediatamente
    - Todas las filas existentes se validan
    - Puede ser lento en tablas grandes
  </div>
  </slot>
</Challenge>

</QuizUI>

¡Bien hecho! Has profundizado en varias áreas de PostgreSQL. 🐘

Espero que hayas aprendido algo nuevo, o al menos hayas obtenido una puntuación de la que presumir. 🏆

<p class="inset">Echa un vistazo a [Parte 2](/quiz-postgres-sql-mastery-pt2/) para más diversión con Postgres. 🚀</p>

¿Quieres más emoción en tu vida? Echa un vistazo a mi [Colección de cuestionarios](/challenges/) para diversión interminable*!
````
