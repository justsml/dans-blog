# Translation Candidate
- Slug: quiz-postgres-sql-mastery-pt1
- Locale: ru
- Model: openrouter/qwen/qwen3-32b:nitro
- Target: src/content/posts/2024-11-27--quiz-postgres-sql-mastery-pt1/ru/index.mdx
- Validation: deferred
- Runtime seconds: 134.17
- Input tokens: 12943
- Output tokens: 13607
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- Estimated cost: $0.004301
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
unlisted: false
social_image: ../mobile.webp
title: 'Тест: Глубокий Postgres: Часть 1'
subTitle: ''
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
```mdx
import Challenge from '../../../../../components/QuizUI/Challenge';
import QuizUI from '../../../../../components/QuizUI/QuizUI';

> **Часть 1 из 2.** [Перейти к Части 2](../quiz-postgres-sql-mastery-pt2/)

<p class="inset">PostgreSQL 🐘 — это, безусловно, моя любимая СУБД! Я постоянно учусь новым трюкам и нюансам, поэтому решил собрать их в новом квизе!</p>

Этот квиз охватывает сочетание знакомых и менее известных особенностей PostgreSQL: от встроенных агрегатных функций до приведения типов, ограничений и других подводных камней.

Удачи! 🍀
```

<QuizUI>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={0}
  group="Разминка: Функции"
  title="Встроенные агрегатные функции"
  options={[
    {text: 'MIN'},
    {text: 'MAX'},
    {text: 'AVG'},
    {text: 'MEDIAN', isAnswer: true},
  ]}
>
  <slot name="question">
  <div className="question">
    Какая из следующих функций НЕ является встроенной агрегатной функцией в PostgreSQL?
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
    `MEDIAN` не является встроенной! Вам нужно:
    ```sql
        PERCENTILE_CONT(0.5) 
        WITHIN GROUP (ORDER BY grade)
    ```
    Часто используемые встроенные агрегаты:
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
  title="Вариации синтаксиса приведения типов"
  options={[
    {text: '\'95\'::INTEGER'},
    {text: 'INTEGER \'95\''},
    {text: 'CAST(\'95\', INTEGER)', isAnswer: true},
    {text: 'CAST(\'95\' AS INTEGER)'},
  ]}
>
  <slot name="question">
  <div className="question">
    Какой из этих способов преобразования типов является **недопустимым** ❌?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    PostgreSQL поддерживает три синтаксиса приведения типов:

    1. ANSI SQL: `CAST(выражение AS тип)`.
    2. PostgreSQL: `выражение::тип`.
    3. Функциональный стиль: `тип 'литерал'`.

    Все они функционально эквивалентны, но:
    - `CAST()` — самый переносимый.
    - `::` — специфичен для PostgreSQL, но часто используется.
    - Инфиксный стиль `тип 'литерал'` — менее распространён, но допустим.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={2}
  group="Ограничения"
  title="UNIQUE-ограничения и NULL"
  options={[
    {text: 'Не разрешены значения NULL'},
    {text: 'Разрешено одно значение NULL'},
    {text: 'Разрешены несколько значений NULL', isAnswer: true},
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
    UNIQUE-ограничения в PostgreSQL:
    - Разрешают несколько значений NULL.
    - `NULL` ≠ `NULL` в проверках уникальности.

    Чтобы запретить значения NULL, добавьте `NOT NULL`:
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
    Что вернёт этот запрос?
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

    Результат: `2024-11-28 00:00:00`.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={4}
  group="Временные метки"
  title="timestamptz против timestamp"
  options={[
    {text: 'Оба занимают 8 байт, но представляют разные семантики временных меток', isAnswer: true},
    {text: 'Они\'},
    {text: 'timestamptz сохраняет любую входную временную зону'},
    {text: 'timestamptz хранит исходное имя временной зоны или смещение'},
    {text: 'timestamptz хранит 2-байтовое значение для TZ'},
    {text: 'timestamptz является преемником timestamp'},
  ]}
>
  <slot name="question">
  <div className="question">
    Какое утверждение **наиболее точно** описывает `timestamptz` и `timestamp`?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Оба типа занимают 8 байт, но они не хранят одинаковые значения.

    В чём разница? Всё в парсинге входных данных.

    **`timestamptz`**
    - Нормализует входные данные до абсолютной точки во времени.
    - Учитывает настройку сервера/соединения `TimeZone` при парсинге входных данных без явного смещения и при отображении выходных данных.

    **`timestamp`**
    - Хранит дату и время без конвертации временных зон.
    - Не сохраняет и не нормализует информацию о временных зонах.


    **`timestamp`**

    - Хранит дату и время без информации о временной зоне.
    - Полезен для явного хранения стандартизированных дат, либо в UTC, либо в конкретной временной зоне.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={5}
  group="Типы Postgres"
  title="Определите недопустимые типы"
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
    Какой из этих типов НЕ является ❌ допустимым типом PostgreSQL?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    PostgreSQL имеет богатый набор типов данных, но `STRING(100)` не является одним из них.

    Корректные типы для строк включают:
    - `VARCHAR(100)` (строка переменной длины)
    - `CHAR(100)` (строка фиксированной длины)
    - `TEXT` (ограниченной длины)
    - `CHARACTER VARYING(100)` (аналог `VARCHAR(100)`)
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={6}
  group="Типы Postgres"
  title="Определите недопустимые типы"
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
    Какой из этих типов НЕ ❌ является допустимым типом PostgreSQL?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    decimal128 может показаться знакомым, так как это тип в других системах (например, в MongoDB и Java). Но в PostgreSQL допустимым является только `decimal`.

    Правильные числовые типы:
    - `int` (4-байтовый integer)
    - `bigint` (8-байтовый integer)
    - `real` (4-байтовая floating-point)
    - `double precision` (8-байтовая floating-point)
    - `bigserial` (автосчетчик 8-байтовый integer)
    - `smallserial` (автосчетчик 2-байтовый integer)
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={7}
  group="Типы Postgres"
  title="Определите недопустимые типы"
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
    Какой из этих типов НЕ является ❌ допустимым типом PostgreSQL?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Сделало ли это вас злым, даже _очень злым_? Вы не один! Как сказал один анонимный участник: «Что за чертовщина, Дэн?! Я провалился на вопросах типов! Это жестоко, сэр! Не буду делиться результатом, хаха». 😈 Приятно, что вы не один.

    Широкий набор сетевых типов PostgreSQL не включает `ipv4`. Каждый раз, когда я пытаюсь использовать его без поиска в Google, я ошибаюсь. Возможно, `macaddr8` заставляет чувствовать, что _должны_ существовать `ipv4` и `ipv6`. Нет, `inet` охватывает оба. Также `cidr` охватывает сетевые маски для обоих.

    Допустимые сетевые типы:
    - `cidr` (IPv4/IPv6 сетевой адрес)
    - `inet` (IPv4/IPv6 хост-адрес)
    - `macaddr` (MAC-адрес)
    - `macaddr8` (MAC-адрес EUI-64)
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={8}
  group="Типы Postgres"
  title="Определите недопустимые типы"
  options={[
    {text: 'xml'},
    {text: 'uuid'},
    {text: 'money'},
    {text: 'currency', isAnswer: true, hint: 'Этого типа нет в PostgreSQL'},
    {text: 'interval'},
  ]}
>
  <slot name="question">
  <div className="question">
    Какой из этих типов НЕ ❌ является допустимым типом PostgreSQL?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    PostgreSQL имеет богатый набор специализированных типов, но `currency` не является одним из них!

    Допустимые типы включают:
    - `xml` (данные XML)
    - `uuid` (UUID)
    - `money` (денежная сумма)
    - `interval` (временной интервал)
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={9}
  group="Типы Postgres"
  title="Определите недопустимые типы"
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
    Какой из этих типов ❌ не является допустимым типом PostgreSQL?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    PostgreSQL имеет богатый набор специализированных типов, но `triangle` не является одним из них.

    Версии [GEOS](https://libgeos.org/) в будущем могут включить поддержку `Triangle` OGC/WKT, что означает, что он может быть добавлен в Postgis. (Скорее всего, этот ответ может стать неверным в будущем.)

    Правильные специализированные типы включают:
    - `box` (прямоугольник)
    - `line` (бесконечная линия)
    - `point` (2D точка)
    - `circle` (2D круг)
    - `polygon` (2D многоугольник)
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={10}
  group="Целочисленная арифметика"
  title="Переполнение целых чисел"
  options={[
    {text: '4294967296'},
    {text: 'Ошибка: целое число вне диапазона', isAnswer: true},
    {text: '0'},
    {text: '2147483647'},
  ]}
>
  <slot name="question">
  <div className="question">
    Что происходит при вычислении общего возможного количества идентификаторов студентов?
    ```sql
        SELECT 256 * 256 * 256 * 256;
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Тип `integer` в PostgreSQL — это 32-битное знаковое число, диапазон которого от `-2,147,483,648` до `2,147,483,647`.

    Расчёт `256^4` = `4,294,967,296` выходит за эти пределы.

    Для работы с большими числами:
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
  title="Точность временных меток"
  options={[
    {text: '2024-01-08 13:30:00+00'},
    {text: '2024-01-08 13:30:00.123456+00'},
    {text: '2024-01-08 13:30:00.123456789+00'},
    {text: '2024-01-08 13:30:00.1234567', isAnswer: true},
  ]}
>
  <slot name="question">
  <div className="question">
    Какой минимальный литерал `timestamp` превышает максимальную точность `time` в PostgreSQL?
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
    В PostgreSQL временные метки имеют точность до микросекунд (6 знаков после запятой).

    - Максимум: `.123456` (6 знаков)
    - Наносекунды (9 знаков) округляются или обрезаются до поддерживаемой точности
    - Смещения часовых поясов принимаются для `timestamptz`, но не обязательны

    **Редкий подводный камень:** Некоторые языки/фреймворки передают точность до наносекунд, но PostgreSQL хранит временные метки с точностью до микросекунд.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={12}
  group="Типы Postgres"
  title="Определите недопустимые типы"
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
    Какой из этих типов ❌ не является допустимым типом PostgreSQL?

    (Серьёзно, большинство из них — реальные типы.)
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    PostgreSQL имеет встроенные геометрические и текстовые типы, но `tsrank` к ним не относится.

    Правильные типы включают:
    - `lseg` (линейный сегмент)
    - `bytea` (бинарные данные)
    - `tsquery` (текстовый запрос)
    - `tsvector` (текстовый документ)
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={13}
  group="Ограничения"
  title="Время проверки ограничения CHECK"
  options={[
    {text: 'Сразу для новых или измененных строк', isAnswer: true},
    {text: 'При завершении транзакции'},
    {text: 'При следующем запросе'},
    {text: 'Никогда - ограничения проверяются только при INSERT'},
  ]}
>
  <slot name="question">
  <div className="question">
    Когда проверяется это ограничение на оценки?
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
    Ограничения с `NOT VALID`:
    - Проверяются сразу для новых вставок и обновлений
    - Не проверяют существующие строки
    - Позже можно проверить существующие строки с помощью `VALIDATE CONSTRAINT`
    - Полезны для больших таблиц

    Без `NOT VALID`:
    - Ограничение проверяется сразу
    - Все существующие строки проверяются
    - Может быть медленно для больших таблиц
  </div>
  </slot>
</Challenge>

</QuizUI>

Отличная работа! Вы углубились в несколько областей PostgreSQL! 🐘

Надеюсь, вы узнали что-то новое, или, по крайней мере, получили результат, о котором можно похвастаться! 🏆

<p class="inset">Посмотрите [Часть 2](/quiz-postgres-sql-mastery-pt2/) для ещё больше удовольствия от Postgres! 🚀</p>

Хотите больше адреналина в жизни? Посетите мою [Коллекцию тестов](/challenges/) для *бесконечного* удовольствия!
````
