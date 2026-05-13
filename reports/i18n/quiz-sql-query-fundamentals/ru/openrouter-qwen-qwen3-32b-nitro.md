# Translation Candidate
- Slug: quiz-sql-query-fundamentals
- Locale: ru
- Model: openrouter/qwen/qwen3-32b:nitro
- Target: src/content/posts/2024-11-08--quiz-sql-query-fundamentals/ru/index.mdx
- Validation: rejected: direct AI SDK translation failed
- Runtime seconds: 98.64
- Input tokens: 8771
- Output tokens: 8617
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- Estimated cost: $0.002770
- Pricing source: local-openrouter-estimate
- Note: Command failed: git add src/content/posts/2024-11-08--quiz-sql-query-fundamentals/ru/index.mdx reports/i18n/quiz-sql-query-fundamentals/ru
## Raw Output

````mdx
---
unlisted: false
title: 'Тест: Докажите свои навыки SQL!'
subTitle: Вы сторонник SQL? Или NoSQL?
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
```mdx
import Challenge from '../../../../../components/QuizUI/Challenge';
import QuizUI from '../../../../../components/QuizUI/QuizUI';


## Проверьте свои базовые знания SQL-запросов

Использование ORM делает вас менее подготовленными в плане навыков? Не волнуйтесь, это случается с множеством разработчиков. 

Проверьте свои базовые знания SQL-запросов прямо сейчас! 👇
```

<QuizUI>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={0}
  group="Основы SQL"
  title="Базовый WHERE-предикат"
  options={[
    {text: 'SELECT * FROM users WHERE name LIKE(John);'},
    {text: 'SELECT * FROM users WHERE name = \', isAnswer: true},
    {text: 'SELECT * FROM users WHERE name == "John";'},
    {text: 'SELECT * FROM users WHERE name === "John";'},
  ]}
>
  <slot name="question">
  <div className="question">
    Какой из следующих SQL-запросов корректно извлекает строки, где имя равно "John"?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    В SQL для проверки равенства в предикате WHERE используется одинарный знак равенства (=), а не == или ===, которые являются операторами JavaScript.

    Правильный синтаксис: SELECT * FROM users WHERE name = 'John';
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={1}
  group="Основы SQL"
  title="Агрегатная функция COUNT"
  options={[
    {text: 'Считает все строки, включая значения NULL'},
    {text: 'Считает только ненулевые значения в столбце', isAnswer: true},
    {text: 'Считает значения NULL как одно уникальное значение'},
    {text: 'Обрабатывает каждое значение NULL как уникальное, подобно NaN !== NaN'},
  ]}
>
  <slot name="question">
  <div className="question">
    Что делает `COUNT(column_name)` в SQL?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    `COUNT(column_name)` считает количество ненулевых значений в указанном столбце. Для подсчета всех строк, включая NULL, используйте `COUNT(*)`.

    Можно также использовать `COALESCE`, чтобы гарантировать, что NULL заменяются на ненулевое значение. Например: `COUNT(COALESCE(column_name, 0))`.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={2}
  group="Соединения SQL"
  title="Основы LEFT JOIN"
  options={[
    {text: 'Возвращает одну строку на каждую совпадающую строку, игнорирует несовпадающие строки', hint: 'Это INNER JOIN, а не LEFT JOIN'},
    {text: 'Возвращает все строки из левой таблицы, плюс совпадающие строки справа', isAnswer: true},
    {text: 'Возвращает все совпадающие или несовпадающие строки, где NULL указывают на отсутствие совпадения', hint: 'Это полное внешнее соединение (FULL JOIN)'},
    {text: 'Возвращает все строки из правой таблицы, с любыми совпадающими слева', hint: 'Это RIGHT JOIN, а не LEFT JOIN'},
  ]}
>
  <slot name="question">
  <div className="question">
    Что делает `LEFT JOIN` в SQL?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Оператор `LEFT JOIN` возвращает все строки из левой таблицы и совпадающие строки из правой таблицы, с NULL для несовпадающих строк в правой таблице.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={3}
  group="Соединения SQL"
  title="Использование INNER JOIN"
  options={[
    {text: 'Возвращает несоответствующие строки из обеих таблиц'},
    {text: 'Возвращает все строки из обеих таблиц, с NULL для несоответствующих строк'},
    {text: 'Возвращает строки, которые соответствуют условию соединения в обеих таблицах', isAnswer: true},
    {text: 'Возвращает несоответствующие строки из правой таблицы'},
  ]}
>
  <slot name="question">
  <div className="question">
    Что делает `INNER JOIN` в SQL?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    INNER JOIN возвращает строки, где условие соединения совпадает в обеих таблицах. Несоответствующие строки не включаются в результат.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={4}
  group="Подзапросы SQL"
  title="Коррелированный подзапрос"
  options={[
    {text: 'Подзапрос, который выполняется один раз в целом'},
    {text: 'Подзапрос, используемый только в инструкциях JOIN'},
    {text: 'Подзапрос, который возвращает только несколько столбцов'},
    {text: 'Подзапрос, который выполняется один раз для каждой строки во внешнем запросе', isAnswer: true},
  ]}
>
  <slot name="question">
  <div className="question">
    Что такое коррелированный подзапрос в SQL?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Коррелированный подзапрос оценивается один раз на каждую строку внешнего запроса. Он ссылается на столбцы из внешнего запроса, делая его зависимым от каждой строки.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={5}
  group="CTE в SQL"
  title="Синтаксис инструкции WITH"
  options={[
    {text: 'Допустимо только в инструкциях DELETE'},
    {text: 'Используется для агрегатных функций'},
    {text: 'Используется только для определения представлений'},
    {text: 'Определение временного набора результатов для использования в более крупном SQL-запросе', isAnswer: true},
  ]}
>
  <slot name="question">
  <div className="question">
    Какова цель инструкции `WITH` (общее табличное выражение) в SQL?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Инструкция `WITH`, или общее табличное выражение (CTE), используется для определения временного набора результатов, который может быть использован в основном запросе. В PostgreSQL `WITH` может быть привязан к инструкциям, таким как `SELECT`, `INSERT`, `UPDATE`, `DELETE` или `MERGE`.

    Это может помочь улучшить читаемость и поддерживаемость сложных запросов.

    Синтаксис:
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
  group="Основы SQL"
  title="IS NULL против IS NOT NULL"
  options={[
    {text: 'Проверяет, является ли значение NULL', isAnswer: true},
    {text: 'Проверяет, является ли значение пустым'},
    {text: 'Проверяет, является ли значение строкой'},
    {text: 'Проверяет, является ли значение числовым'},
  ]}
>
  <slot name="question">
  <div className="question">
    Что делает оператор `IS NULL` в SQL?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    `IS NULL` проверяет, содержит ли указанная колонка значение NULL. `IS NOT NULL` проверяет обратное.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={7}
  group="Операторы SQL"
  title="Использование оператора IN"
  options={[
    {text: 'Возвращает уникальные строки'},
    {text: 'Требует индексированный столбец'},
    {text: 'Применяется только к числовым столбцам'},
    {text: 'Возвращает строки, соответствующие значениям из указанного списка', isAnswer: true},
  ]}
>
  <slot name="question">
  <div className="question">
    Что делает оператор `IN` в SQL?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Оператор `IN` фильтрует строки, чтобы совпадать со значениями в указанном списке, часто являясь альтернативой нескольким условиям OR.

    Хотя он *может* возвращать "уникальные строки" (и часто это делает), это не его основная цель.

    Индексирование не требуется, хотя использование `IN` с индексированным столбцом, предпочтительно с `UNIQUE` индексом, является хорошей практикой для повышения производительности.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={8}
  group="Функции SQL"
  title="Использование функции COALESCE"
  options={[
    {text: 'Считает значения NULL'},
    {text: 'Возвращает последний не-NULL аргумент'},
    {text: 'Возвращает первый не-NULL аргумент', isAnswer: true},
    {text: 'Ограничен IDENTITY-колонками'},
    {text: 'Первоначально из Принтер Коалейшн'},
  ]}
>
  <slot name="question">
  <div className="question">
    Что делает функция `COALESCE` в SQL?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Функция `COALESCE` возвращает первый не-NULL-значение в указанном списке, что полезно для замены значений по умолчанию при обнаружении NULL.

    Например, `COALESCE(column_name, 0)` вернёт `0`, если `column_name` равен `NULL`.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={9}
  group="Агрегатные функции SQL"
  title="Использование GROUP BY"
  options={[
    {text: 'Скрывает дубликаты', hint: 'GROUP BY не удаляет дубликаты напрямую.'},
    {text: 'Используется только в joins', hint: 'GROUP BY часто используется с агрегатными функциями, а не только в joins.'},
    {text: 'Сортирует строки в порядке возрастания', hint: 'Для сортировки используется ORDER BY, а не GROUP BY.'},
    {text: 'Группирует строки по указанному(ым) столбцу(ам)', isAnswer: true},
    {text: 'Синтаксис должен быть GROUP WITH/USING', hint: 'Правильный синтаксис — GROUP BY, а не GROUP WITH/USING.'},
  ]}
>
  <slot name="question">
  <div className="question">
    Какова цель использования предложения `GROUP BY` в SQL?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Предложение `GROUP BY` группирует строки, которые имеют одинаковые значения в указанных столбцах, позволяя применять агрегатные функции к каждой группе.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={10}
  group="Соединения SQL"
  title="Основы `FULL OUTER JOIN`"
  options={[
    {text: 'Возвращает только совпадающие строки'},
    {text: 'Возвращает только строки с ненулевыми значениями'},
    {text: 'Возвращает несопоставленные строки только из левой таблицы'},
    {text: 'Возвращает несопоставленные строки только из правой таблицы'},
    {text: 'Возвращает все строки из обеих таблиц, заполняя NULL для несопоставленных строк', isAnswer: true},
  ]}
>
  <slot name="question">
  <div className="question">
    Что делает `FULL OUTER JOIN` в SQL?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Оператор `FULL OUTER JOIN` возвращает все строки из обеих таблиц, заполняя несопоставленные строки NULL для отсутствующих значений.

    Это полезно для сравнения двух таблиц и поиска различий между ними.
  </div>
  </slot>
</Challenge>

</QuizUI>
````
