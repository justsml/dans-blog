# Translation Candidate
- Slug: quiz-sql-query-fundamentals
- Locale: ru
- Model: openrouter/openai/gpt-oss-120b:nitro
- Target: src/content/posts/2024-11-08--quiz-sql-query-fundamentals/ru/index.mdx
- Validation: deferred
- Runtime seconds: 16.22
- Input tokens: 9939
- Output tokens: 5996
- Thinking tokens: unknown
- Cached input tokens: 3072
- Cache write tokens: 0
- Estimated cost: $0.001467
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
unlisted: false
title: 'Тест: докажите свои навыки SQL!'
subTitle: Вы за SQL? Или за NoSQL?
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


## Проверьте свои базовые навыки SQL‑запросов

Слишком полагаетесь на ORM и чувствуете упадок навыков?  
Не переживайте, с этим сталкивается множество разработчиков.  

Погрузитесь сразу и продемонстрируйте свои фундаментальные знания SQL‑запросов! 👇

<QuizUI>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={0}
  group="Основы SQL"
  title="Базовый оператор WHERE"
  options={[
    {text: 'SELECT * FROM users WHERE name LIKE(John);'},
    {text: 'SELECT * FROM users WHERE name = \', isAnswer: true},
    {text: 'SELECT * FROM users WHERE name == "John";'},
    {text: 'SELECT * FROM users WHERE name === "John";'},
  ]}
>
  <slot name="question">
  <div className="question">
    Какой из следующих SQL‑запросов правильно извлекает строки, где имя равно "John"?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    В SQL для проверки равенства в операторе `WHERE` используется один знак равенства (`=`), а не `==` или `===`, которые являются операторами JavaScript.

    Правильный синтаксис: `SELECT * FROM users WHERE name = 'John';`.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={1}
  group="Основы SQL"
  title="Агрегатная функция COUNT"
  options={[
    {text: 'Считает все строки, включая NULL'},
    {text: 'Считает только ненулевые значения в столбце', isAnswer: true},
    {text: 'Считает NULL как одно уникальное значение'},
    {text: 'Считает каждый NULL как уникальный, как NaN !== NaN'},
  ]}
>
  <slot name="question">
  <div className="question">
    Что делает `COUNT(column_name)` в SQL?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    `COUNT(column_name)` считает количество ненулевых значений в указанном столбце. Чтобы посчитать все строки, включая NULL, используйте `COUNT(*)`.

    Вы также можете использовать `COALESCE`, чтобы NULL заменялись на ненулевое значение. Например: `COUNT(COALESCE(column_name, 0))`.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={2}
  group="SQL JOIN'ы"
  title="Основы LEFT JOIN"
  options={[
    {text: 'Возвращает одну строку для каждой совпадающей строки, игнорируя несовпадающие'},
    {text: 'Возвращает все строки из левой таблицы и совпадающие строки из правой', isAnswer: true},
    {text: 'Возвращает все совпавшие и несовпавшие строки, где NULL указывает на отсутствие совпадения'},
    {text: 'Возвращает все строки из правой таблицы и любые совпадающие строки из левой'},
  ]}
>
  <slot name="question">
  <div className="question">
    Что делает `LEFT JOIN` в SQL?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    `LEFT JOIN` возвращает все строки из левой таблицы и совпадающие строки из правой таблицы, а для несовпадающих строк правой таблицы ставит NULL.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={3}
  group="SQL JOIN'ы"
  title="Использование INNER JOIN"
  options={[
    {text: 'Возвращает несоответствующие строки из обеих таблиц'},
    {text: 'Возвращает все строки из обеих таблиц, с NULL для несоответствующих строк'},
    {text: 'Возвращает строки, удовлетворяющие условию соединения в обеих таблицах', isAnswer: true},
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
    `INNER JOIN` возвращает строки, где условие соединения совпадает в обеих таблицах. Несоответствующие строки не включаются в результирующий набор.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={4}
  group="SQL подзапросы"
  title="Коррелированный подзапрос"
  options={[
    {text: 'Подзапрос, который выполняется один раз в целом'},
    {text: 'Подзапрос, используемый только в операторах JOIN'},
    {text: 'Подзапрос, который возвращает только несколько столбцов'},
    {text: 'Подзапрос, который выполняется один раз для каждой строки внешнего запроса', isAnswer: true},
  ]}
>
  <slot name="question">
  <div className="question">
    Что такое коррелированный подзапрос в SQL?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Коррелированный подзапрос оценивается один раз для каждой строки внешнего запроса. Он ссылается на столбцы внешнего запроса, что делает его зависимым от каждой строки.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={5}
  group="SQL CTE"
  title="Синтаксис предложения WITH"
  options={[
    {text: 'Разрешено только в операторах DELETE'},
    {text: 'Используется для агрегатных функций'},
    {text: 'Используется только для определения представлений'},
    {text: 'Определение временного набора результатов для использования в более крупном SQL‑запросе', isAnswer: true},
  ]}
>
  <slot name="question">
  <div className="question">
    Какова цель предложения `WITH` (Common Table Expression) в SQL?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    `WITH`‑предложение, или Common Table Expression (CTE), используется для определения временного набора результатов, который можно ссылаться в основном запросе. В PostgreSQL `WITH` может быть прикреплён к таким операторам, как `SELECT`, `INSERT`, `UPDATE`, `DELETE` или `MERGE`.

    Это помогает улучшить читаемость и поддерживаемость сложных запросов.

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
  title="IS NULL vs IS NOT NULL"
  options={[
    {text: 'Проверяет, является ли значение NULL', isAnswer: true},
    {text: 'Проверяет, является ли значение пустым'},
    {text: 'Проверяет, является ли значение строкой'},
    {text: 'Проверяет, является ли значение числом'},
  ]}
>
  <slot name="question">
  <div className="question">
    Что делает оператор `IS NULL` в SQL?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    `IS NULL` проверяет, содержит ли указанный столбец значение NULL. `IS NOT NULL` проверяет обратное.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={7}
  group="SQL Операторы"
  title="Использование оператора IN"
  options={[
    {text: 'Возвращает уникальные строки'},
    {text: 'Требует индексированный столбец'},
    {text: 'Применяется только к числовым столбцам'},
    {text: 'Возвращает строки, соответствующие значениям в указанном списке', isAnswer: true},
  ]}
>
  <slot name="question">
  <div className="question">
    Что делает оператор `IN` в SQL?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    `IN` оператор фильтрует строки, выбирая те, значение которых присутствует в указанном списке, часто как альтернатива множественным условиям OR.

    Хотя он *может* возвращать «уникальные строки» (и часто так происходит), это не его основная цель.

    Индексация здесь не обязательна, хотя рекомендуется использовать `IN` на столбце с индексом, желательно `UNIQUE` индексом, так как это может повысить производительность.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={8}
  group="SQL функции"
  title="Использование функции COALESCE"
  options={[
    {text: 'Считает NULL‑значения'},
    {text: 'Возвращает последний не‑NULL аргумент'},
    {text: 'Возвращает первый не‑NULL аргумент', isAnswer: true},
    {text: 'Ограничено столбцами IDENTITY'},
    {text: 'Изначально из Printer Coalation'},
  ]}
>
  <slot name="question">
  <div className="question">
    Что делает функция `COALESCE` в SQL?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    `COALESCE` функция возвращает первое не‑NULL значение из указанного списка, что удобно для подстановки значений по умолчанию, когда встречаются NULL.

    Например, `COALESCE(column_name, 0)` вернёт `0`, если `column_name` равно `NULL`.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={9}
  group="Агрегатные функции SQL"
  title="Использование GROUP BY"
  options={[
    {text: 'Скрывает дубликаты'},
    {text: 'Используется только в соединениях'},
    {text: 'Сортирует строки по возрастанию'},
    {text: 'Группирует строки по указанным столбцам', isAnswer: true},
    {text: 'Синтаксис должен быть GROUP WITH/USING'},
  ]}
>
  <slot name="question">
  <div className="question">
    Какова цель использования конструкции `GROUP BY` в SQL?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Конструкция `GROUP BY` группирует строки, имеющие одинаковые значения в указанных столбцах, позволяя применять агрегатные функции к каждой группе.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={10}
  group="SQL соединения"
  title="Основы FULL OUTER JOIN"
  options={[
    {text: 'Возвращает только совпадающие строки'},
    {text: 'Возвращает только строки с ненулевыми значениями'},
    {text: 'Возвращает только несоответствующие строки из левой таблицы'},
    {text: 'Возвращает только несоответствующие строки из правой таблицы'},
    {text: 'Возвращает все строки из обеих таблиц, заполняя NULL для несоответствующих строк', isAnswer: true},
  ]}
>
  <slot name="question">
  <div className="question">
    Что делает `FULL OUTER JOIN` в SQL?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    `FULL OUTER JOIN` возвращает все строки из обеих таблиц, заполняя несоответствующие строки NULL для недостающих значений.

    Это полезно для сравнения двух таблиц и поиска различий между ними.
  </div>
  </slot>
</Challenge>

</QuizUI>
````
