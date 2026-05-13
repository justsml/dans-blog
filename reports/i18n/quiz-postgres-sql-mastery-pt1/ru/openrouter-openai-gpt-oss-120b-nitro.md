# Translation Candidate
- Slug: quiz-postgres-sql-mastery-pt1
- Locale: ru
- Model: openrouter/openai/gpt-oss-120b:nitro
- Target: src/content/posts/2024-11-27--quiz-postgres-sql-mastery-pt1/ru/index.mdx
- Validation: deferred
- Runtime seconds: 25.13
- Input tokens: 14303
- Output tokens: 9799
- Thinking tokens: unknown
- Cached input tokens: 4608
- Cache write tokens: 0
- Estimated cost: $0.002322
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
unlisted: false
social_image: ../mobile.webp
title: 'Викторина: Глубокий Postgres: Часть 1'
subTitle: SQL заставляет вас визжать?
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
import Challenge from '../../../../../components/QuizUI/Challenge';
import QuizUI from '../../../../../components/QuizUI/QuizUI';

> **Часть 1 из 2.** [Перейти к Части 2](/quiz-postgres-sql-mastery-pt2/)

<p class="inset">PostgreSQL 🐘 — безусловно мой любимый СУБД! Я постоянно открываю новые приёмы и подводные камни, поэтому решил собрать их в новом викторине!</p>

Этот тест охватывает как привычные, так и менее известные возможности и подводные камни PostgreSQL: от встроенных агрегатов до приведения типов, ограничений и прочего.

Удачи! 🍀

<QuizUI>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={0}
  group="Разминка: Функции"
  title="Встроенные агрегаты"
  options={[
    {text: 'MIN'},
    {text: 'MAX'},
    {text: 'AVG'},
    {text: 'MEDIAN', isAnswer: true},
  ]}
>
  <slot name="question">
  <div className="question">
    Какая функция НЕ является встроенной агрегатной функцией в PostgreSQL?
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
    `MEDIAN` не встроена! Нужно:
    ```sql
        PERCENTILE_CONT(0.5) 
        WITHIN GROUP (ORDER BY grade)
    ```
    Распространённые встроенные агрегаты:
    - `MIN`, `MAX`, `COUNT`
    - `AVG`, `SUM`
    - `ARRAY_AGG`, `STRING_AGG`
    - Различные статистические функции
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={1}
  group="Разминка: Приведение типов"
  title="Вариации синтаксиса приведения"
  options={[
    {text: '\'95\'::INTEGER'},
    {text: 'INTEGER \'95\''},
    {text: 'CAST(\'95\', INTEGER)', isAnswer: true},
    {text: 'CAST(\'95\' AS INTEGER)'},
  ]}
>
  <slot name="question">
  <div className="question">
    Какое из этих преобразований типов **некорректно** ❌?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    PostgreSQL поддерживает три синтаксиса приведения типов:

    1. ANSI SQL: `CAST(expression AS type)`.
    2. PostgreSQL: `expression::type`.
    3. Функция типа: `type 'literal'`.

    Все они функционально эквивалентны, но:
    - `CAST()` наиболее переносим.
    - `::` специфичен для PostgreSQL, но широко используется.
    - Инфиксный стиль `type 'literal'` реже встречается, но тоже валиден.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={2}
  group="Ограничения"
  title="UNIQUE‑ограничения и NULL"
  options={[
    {text: 'NULL не допускаются'},
    {text: 'Разрешён один NULL'},
    {text: 'Разрешено несколько NULL', isAnswer: true},
    {text: 'Зависит от версии PostgreSQL'},
  ]}
>
  <slot name="question">
  <div className="question">
    Сколько значений NULL разрешено здесь?
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
    UNIQUE‑ограничения в PostgreSQL:
    - Позволяют несколько значений NULL.
    - `NULL` ≠ `NULL` при проверке уникальности.

    Чтобы запретить значения `NULL`, добавьте `NOT NULL`:
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
  group="Дата/Время"
  title="Арифметика дат"
  options={[
    {text: '2024-11-27'},
    {text: '2024-11-27 00:00:00'},
    {text: '2024-11-28'},
    {text: '2024-11-28 00:00:00', isAnswer: true},
    {text: 'Ошибка: недопустимое время'},
  ]}
>
  <slot name="question">
  <div className="question">
    Что это возвращает?
    ```sql
        SELECT '2024-11-27'::date + interval '24 hours';
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Интервалы — мощный инструмент для упрощения операций с диапазонами дат!

    Арифметика дат в PostgreSQL:
    - `+ interval '24 hours'` добавляет 24 часа
    - `+ interval '1 day'` добавляет 1 день
    - `+ interval '1 month'` добавляет 1 месяц
    - `+ interval '1 year'` добавляет 1 год

    Результат — `2024-11-28 00:00:00`.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={4}
  group="Метки времени"
  title="timestamptz против timestamp"
  options={[
    {text: 'Они оба занимают 8 байт, но представляют разные семантики меток времени', isAnswer: true},
    {text: 'They"'},
    {text: 'timestamptz сохраняет любой входной часовой пояс'},
    {text: 'timestamptz сохраняет оригинальное название часового пояса или смещение'},
    {text: 'timestamptz хранит 2‑байтовое значение для TZ'},
    {text: 'timestamptz является преемником timestamp'},
  ]}
>
  <slot name="question">
  <div className="question">
    Какое **самое точное** утверждение о `timestamptz` и `timestamp`?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Они оба занимают 8 байт, но хранят разные типы значений.

    Так в чём разница? Всё в разборе ввода.

    **`timestamptz`**
    - Нормализует ввод к абсолютному моменту времени.
    - Учитывает настройку `TimeZone` сервера/соединения при разборе ввода без явного смещения и при выводе.

    **`timestamp`**
    - Хранит дату и время без преобразования часового пояса.
    - Не сохраняет и не нормализует информацию о часовом поясе.


    **`timestamp`**

    - Хранит дату и время без информации о часовом поясе.
    - Полезен для явного хранения стандартизированных дат, либо в UTC, либо в конкретном часовом поясе.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={5}
  group="Типы Postgres"
  title="Определите недопустимый тип"
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
    Какой из этих вариантов ❌ не является допустимым типом PostgreSQL?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    PostgreSQL имеет богатый набор типов данных, но `STRING(100)` не относится к ним.

    Правильные строковые типы включают:
    - `VARCHAR(100)` (строка переменной длины)
    - `CHAR(100)` (строка фиксированной длины)
    - `TEXT` (неограниченная длина)
    - `CHARACTER VARYING(100)` (то же, что `VARCHAR(100)`)
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={6}
  group="Типы Postgres"
  title="Определите недопустимый тип"
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
    Какой из этих вариантов ❌ не является допустимым типом PostgreSQL?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Это может показаться знакомым, поскольку `decimal128` используется во многих системах (включая Mongo и Java). Это не допустимый тип PostgreSQL, правильный — `decimal`.

    Правильные числовые типы включают:
    - `int` (4‑байтовое целое)
    - `bigint` (8‑байтовое целое)
    - `real` (4‑байтовый плавающий)
    - `double precision` (8‑байтовый плавающий)
    - `bigserial` (автоинкрементное 8‑байтовое целое)
    - `smallserial` (автоинкрементное 2‑байтовое целое)
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={7}
  group="Типы Postgres"
  title="Определите недействительный тип"
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
    Какой из этих типов ❌ не является действительным типом PostgreSQL?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Сделало ли это вас разочарованным, даже _злым_? Вы не одни! Как сказал безымянный "core" разработчик базы данных, "what the hell, Dan?! I crashed on the type questions! Thats violent sir! Not sharing my score, hah." 😈 Пожалуйста.

    PostgreSQL's rich set of network types do not include `ipv4`. Every single time I attempt to use it without googling, I get it wrong. Perhaps `macaddr8` makes me feel there _must_ be `ipv4` and `ipv6` types. Nope, `inet` covers both. Also, `cidr` covers network masks for both.

    Valid network types include:
    - `cidr` (IPv4/IPv6 network address)
    - `inet` (IPv4/IPv6 host address)
    - `macaddr` (MAC address)
    - `macaddr8` (EUI-64 MAC address)
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={8}
  group="Типы Postgres"
  title="Определите недействительные типы"
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
    Какой из этих типов ❌ не является допустимым типом PostgreSQL?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    PostgreSQL имеет богатый набор специализированных типов, но `currency` не относится к ним!

    Доступные типы включают:
    - `xml` (XML‑данные)
    - `uuid` (UUID)
    - `money` (сумма в валюте)
    - `interval` (временной интервал)
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={9}
  group="Типы Postgres"
  title="Определите недействительный тип"
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
    Какой из этих типов ❌ не является действительным типом PostgreSQL?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    PostgreSQL обладает богатым набором специализированных типов, но `triangle` не относится к ним.

    Я считаю, что в будущих версиях [GEOS](https://libgeos.org/) будет поддержка `Triangle` в формате OGC/WKT, что значит, что он со временем появится в PostGIS. (По сути, этот ответ может стать неверным в будущем.)

    Правильные специализированные типы включают:
    - `box` (прямоугольный ящик)
    - `line` (бесконечная линия)
    - `point` (2‑мерная точка)
    - `circle` (2‑мерный круг)
    - `polygon` (2‑мерный многоугольник)
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={10}
  group="Целочисленная ариметика"
  title="Переполнение целого числа"
  options={[
    {text: '4294967296'},
    {text: 'Ошибка: целое число вне диапазона', isAnswer: true},
    {text: '0'},
    {text: '2147483647'},
  ]}
>
  <slot name="question">
  <div className="question">
    Что происходит при вычислении общего количества возможных идентификаторов студентов?
    ```sql
        SELECT 256 * 256 * 256 * 256;
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Тип `integer` в PostgreSQL — 32‑битный знаковый, диапазон от `-2,147,483,648` до `2,147,483,647`.

    Вычисление `256^4` = `4,294,967,296` превышает этот диапазон.

    Чтобы работать с большими числами:
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
  group="Дата/Время"
  title="Точность timestamp"
  options={[
    {text: '2024-01-08 13:30:00+00'},
    {text: '2024-01-08 13:30:00.123456+00'},
    {text: '2024-01-08 13:30:00.123456789+00'},
    {text: '2024-01-08 13:30:00.1234567', isAnswer: true},
  ]}
>
  <slot name="question">
  <div className="question">
    Какой наименьший литерал `timestamp` превышает максимальную точность `time` в Postgres?
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
    У timestamps в PostgreSQL микросекундная точность (6 знаков после запятой).

    - Максимум: `.123456` (6 цифр)
    - Наносекунды (9 цифр) округляются или отбрасываются до поддерживаемой точности
    - Смещения часового пояса принимаются для `timestamptz`, но не обязательны

    **Неочевидный нюанс:** Некоторые языки/фреймворки передают наносекундную точность, однако PostgreSQL хранит timestamps с микросекундной точностью.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={12}
  group="Типы Postgres"
  title="Определите недействительный тип"
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
    Какой из этих типов ❌ не является действительным типом PostgreSQL?

    (Серьёзно, это (в основном) реальные типы.)
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    PostgreSQL имеет несколько встроенных геометрических и типов полнотекстового поиска, но `tsrank` не относится к ним.

    Правильные геометрические и типы полнотекстового поиска включают:
    - `lseg` (отрезок линии)
    - `bytea` (двоичные данные)
    - `tsquery` (запрос полнотекстового поиска)
    - `tsvector` (документ полнотекстового поиска)
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={13}
  group="Ограничения"
  title="Время проверки ограничения"
  options={[
    {text: 'Сразу для новых или изменённых строк', isAnswer: true},
    {text: 'При фиксации транзакции'},
    {text: 'При следующем запросе'},
    {text: 'Никогда — ограничения проверяются только при INSERT'},
  ]}
>
  <slot name="question">
  <div className="question">
    Когда проверяется это ограничение оценки?
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
    `NOT VALID` ограничения:
    - Проверяются сразу для новых вставок и обновлений
    - Не проверяют существующие строки
    - Могут проверить существующие строки позже с помощью `VALIDATE CONSTRAINT`
    - Полезны для больших таблиц

    Без `NOT VALID`:
    - Ограничение проверяется сразу
    - Все существующие строки проверяются
    - Может быть медленно на больших таблицах
  </div>
  </slot>
</Challenge>

</QuizUI>

Отлично! Вы углубились в несколько областей PostgreSQL! 🐘  

Надеюсь, вы узнали что‑то новое или хотя бы получили результат, которым можно похвастаться! 🏆  

<p class="inset">Посмотрите [Часть 2](/quiz-postgres-sql-mastery-pt2/) для продолжения PostgreSQL‑забавы! 🚀</p>  

Хотите больше острых ощущений? Загляните в мою [Коллекцию викторин](/challenges/) — бесконечное* развлечение!
````
