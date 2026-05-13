# Translation Candidate
- Slug: postgres-text-search-guide
- Locale: ru
- Model: openrouter/openai/gpt-oss-120b:nitro
- Target: src/content/posts/2026-05-02--postgres-text-search-guide/ru/index.mdx
- Validation: rejected: direct AI SDK translation failed
- Runtime seconds: 10.99
- Input tokens: 17324
- Output tokens: 8009
- Thinking tokens: unknown
- Cached input tokens: 3840
- Cache write tokens: 0
- Estimated cost: $0.002117
- Pricing source: local-openrouter-estimate
- Note: Command failed: git add src/content/posts/2026-05-02--postgres-text-search-guide/ru/index.mdx reports/i18n/postgres-text-search-guide/ru reports/i18n/postgres-text-search-guide/candidates.jsonl
## Raw Output

````mdx
---
title: "Руководство по полнотекстовому поиску в Postgres\_2026"
subTitle: >-
  Поисковые инструменты в вашей базе данных и когда каждый из них оправдывает
  себя.
date: '2026-05-02'
modified: '2026-05-03'
tags:
  - postgres
  - postgresql
  - full-text-search
  - trigrams
  - pg_trgm
  - databases
  - search
  - sql
  - pg_search
category: Code
subCategory: Databases
popularity: 0.8
social_image: ../desktop-social.webp
cover_full_width: ../wide.webp
cover_mobile: ../square.webp
cover_icon: ../square.webp
---
Большинство команд используют один инструмент поиска в Postgres. Команды, знакомые со всеми тремя, доставляют более качественный поиск с меньшей сложностью — и избегают дорогостоящего обхода к выделенному поисковому сервису, который им ещё не нужен.

Это руководство охватывает полный набор нативных возможностей Postgres: что делает каждый вариант, когда он уместен и как их комбинировать.

---

## Три инструмента

**Полнотекстовый поиск** (`tsvector` / `GIN` index) — лексический. Он разбивает текст на лексемы, приводит их к основе и сопоставляет запросы с индексом. «Running» и «runs» сводятся к одной лексеме. То же самое с «dog» и «dogs». Функция ранжирования (`ts_rank`) отдаёт преимущество документам, где термины запроса встречаются часто или находятся в заметных позициях.

**Триграммы** (`pg_trgm`) делят строки на перекрывающиеся 3‑символьные фрагменты и измеряют, сколько фрагментов две строки имеют общих. «Dan» → `" da"`, `"dan"`, `"an "`. «Micheal» и «Michael» имеют почти одинаковый набор триграмм, поэтому сходство высоко. Это делает `pg_trgm` отличным для нечеткого сопоставления имён, толерантности к опечаткам и автодополнения — область, где FTS работает слабо.

**Точные индексы** (B‑tree, hash) обслуживают первичные ключи, электронные адреса, идентификаторы, SKU и любые поля, где ответ бинарный: совпадает — или не совпадает. Это не выглядит как «поиск», но обсуждать это необходимо, потому что наихудший паттерн — использовать нечеткий или семантический поиск там, где есть однозначные ответы.

Выбор не о «сложности». Это о том, чтобы подобрать инструмент под форму запроса.

<figure>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1120 720" role="img" aria-labelledby="stm-title stm-desc">
  <title id="stm-title">Postgres search tool map</title>
  <desc id="stm-desc">A comparison of pg_trgm, full-text search, pgvector, and hybrid search by input shape and query intent.</desc>
  <defs>
    <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="10" stdDeviation="12" flood-color="#111827" flood-opacity="0.14"/>
    </filter>
    <linearGradient id="header" x1="0" x2="1" y1="0" y2="1">
      <stop offset="0" stop-color="#0f172a"/>
      <stop offset="1" stop-color="#25324a"/>
    </linearGradient>
    <style>{`
      .stm-bg { fill: #f7f3ea; }
      .stm-card { fill: #fffdf8; stroke: #d9cdb6; stroke-width: 2; filter: url(#shadow); }
      .stm-title-text { font: 800 34px ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; fill: #111827; }
      .stm-subtitle { font: 500 18px ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; fill: #4b5563; }
      .stm-label { font: 800 14px ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; letter-spacing: .08em; text-transform: uppercase; fill: #ffffff; }
      .stm-tool { font: 800 27px ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; fill: #111827; }
      .stm-body { font: 500 18px ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; fill: #374151; }
      .stm-small { font: 600 15px ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; fill: #4b5563; }
      .stm-axis { font: 800 15px ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; fill: #111827; letter-spacing: .06em; text-transform: uppercase; }
      .stm-chip { font: 800 14px ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; fill: #ffffff; }
      .stm-line { stroke: #9ca3af; stroke-width: 2; stroke-dasharray: 8 8; }
    `}</style>
  </defs>

  <rect class="stm-bg" width="1120" height="720" rx="0"/>
  <text class="stm-title-text" x="64" y="70">Pick the search primitive by input shape</text>
  <text class="stm-subtitle" x="64" y="103">The same Postgres table can support all four. The trick is matching the query to the text.</text>

  <line class="stm-line" x1="560" y1="150" x2="560" y2="640"/>
  <line class="stm-line" x1="76" y1="395" x2="1044" y2="395"/>

  <text class="stm-axis" x="360" y="142">Exact words matter</text>
  <text class="stm-axis" x="650" y="142">Meaning matters</text>
  <text class="stm-axis" x="78" y="388" transform="rotate(-90 78 388)">Short / structured text</text>
  <text class="stm-axis" x="78" y="628" transform="rotate(-90 78 628)">Long prose / chunks</text>

  <rect class="stm-card" x="112" y="168" width="408" height="186" rx="20"/>
  <rect x="136" y="192" width="100" height="28" rx="14" fill="#f59e0b"/>
  <text class="stm-label" x="154" y="212">fuzzy</text>
  <text class="stm-tool" x="136" y="256">pg_trgm</text>
  <text class="stm-body" x="136" y="294">Names, addresses, titles, typos,</text>
  <text class="stm-body" x="136" y="320">autocomplete, partial strings.</text>
  <text class="stm-small" x="136" y="344">Orthographic similarity: spelling distance.</text>

  <rect class="stm-card" x="600" y="168" width="408" height="186" rx="20"/>
  <rect x="624" y="192" width="116" height="28" rx="14" fill="#22c55e"/>
  <text class="stm-label" x="644" y="212">similar</text>
  <text class="stm-tool" x="624" y="256">pgvector</text>
  <text class="stm-body" x="624" y="294">Related items, duplicate tickets,</text>
  <text class="stm-body" x="624" y="320">recommendations from short descriptions.</text>
  <text class="stm-small" x="624" y="344">Embedding similarity: meaning distance.</text>

  <rect class="stm-card" x="112" y="436" width="408" height="186" rx="20"/>
  <rect x="136" y="460" width="102" height="28" rx="14" fill="#38bdf8"/>
  <text class="stm-label" x="158" y="480">lexical</text>
  <text class="stm-tool" x="136" y="524">Full-text search</text>
  <text class="stm-body" x="136" y="562">Articles, docs, logs, support content</text>
  <text class="stm-body" x="136" y="588">where query words should appear.</text>
  <text class="stm-small" x="136" y="612">Lexemes, stemming, ranking, boolean filters.</text>

  <rect class="stm-card" x="600" y="436" width="408" height="186" rx="20"/>
  <rect x="624" y="460" width="102" height="28" rx="14" fill="#f472b6"/>
  <text class="stm-label" x="645" y="480">hybrid</text>
  <text class="stm-tool" x="624" y="524">FTS + pgvector</text>
  <text class="stm-body" x="624" y="562">Technical docs and RAG where users ask</text>
  <text class="stm-body" x="624" y="588">conceptual questions plus exact symbols.</text>
  <text class="stm-small" x="624" y="612">Run both, fuse ranks with RRF.</text>

  <rect x="396" y="658" width="328" height="36" rx="18" fill="url(#header)"/>
  <text class="stm-chip" x="429" y="681">Start with query intent, then check text shape</text>
</svg>
<figcaption>The four Postgres search primitives mapped by query intent (exact vs. semantic) and text shape (structured vs. prose). The same table can carry all four indexes — the choice is per query, not per table.</figcaption>
</figure>

---

## Когда Full‑Text Search выигрывает

**Поиск по прозе по ключевым словам.** Блог‑посты, документация, описания продуктов, тикеты поддержки, юридические документы. FTS изначально задуман для такого типа контента: индексированный, ранжированный поиск по естественному языку.

**Запросы пользователей по ключевым словам.** Пользователи вводят поисковый термин, фильтруют по тегу или просматривают по ключевому слову. FTS реализует такой намеренный поиск «из коробки», без какой‑либо инфраструктуры эмбеддингов.

**Ранжированные результаты без внешних зависимостей.** Индексы FTS быстры, детерминированы и не требуют вызовов API. Сигнал релевантности исходит из частоты терма, взвешенной позицией поля.

**Булевое фильтрование вместе с поиском.** FTS естественно сочетается с вашей текущей логикой запросов:

```sql
SELECT * FROM posts
WHERE search_vector @@ to_tsquery('english', 'postgres & performance')
  AND category = 'tutorial'
  AND published_at > NOW() - INTERVAL '6 months';
```

### Настройка FTS

```sql
-- Сгенерированный столбец поддерживает актуальность индекса автоматически
ALTER TABLE posts ADD COLUMN search_vector tsvector
  GENERATED ALWAYS AS (
    setweight(to_tsvector('english', coalesce(title, '')), 'A') ||
    setweight(to_tsvector('english', coalesce(body,  '')), 'B')
  ) STORED;

CREATE INDEX posts_search_idx ON posts USING GIN (search_vector);

-- Запрос
SELECT title, ts_rank(search_vector, query) AS rank
FROM posts, to_tsquery('english', 'postgres & performance') query
WHERE search_vector @@ query
ORDER BY rank DESC
LIMIT 10;
```

`setweight` задаёт важность: `A` (заголовок) имеет больший вес, чем `B` (тело). Это полностью покрывает модель релевантности для большинства сценариев поиска по контенту.

### Что FTS обрабатывает плохо

- Ошибки в запросах — «javascipt» не будет совпадать с «javascript»
- Имена людей, адреса, собственные имена, которые не стеммятся предсказуемо
- Префиксный/автодополняющий поиск без специальной настройки
- Запросы, где пользователь описывает концепцию, а не называет её

---

## Когда выигрывают триграммы (`pg_trgm`)

`pg_trgm` покрывает неудобный промежуток, с которым FTS постоянно справляется плохо.

FTS разбивает текст на лексемы и стеммирует их. Для прозы это правильно. Для имён и коротких идентификаторов часто нет:

- Имена людей («Dan Levy» → стеммируется по‑разному в зависимости от словаря и языковой конфигурации)
- Названия компаний, адреса, названия продуктов, где важна точная орфография
- Запросы с опечатками — «Micheal Jordan», «Amaon», «javascipt»
- Автодополнение / поиск по префиксу
- Частичное совпадение строк («son» совпадает с «Johnson», «Anderson»)

`pg_trgm` также не зависит от языка, что важно для имён из разных лингвистических сред. FTS требует настройки словаря для каждого языка.

### Нечеткий поиск имён

```sql
CREATE EXTENSION IF NOT EXISTS pg_trgm;

CREATE INDEX users_name_trgm_idx ON users USING GIN (name gin_trgm_ops);

-- Находит "Micheal Jordan", когда ищут "Michael Jordan"
SELECT id, name, similarity(name, $1) AS score
FROM users
WHERE name % $1          -- оператор % = порог сходства (по умолчанию 0.3)
ORDER BY score DESC
LIMIT 10;
```

Оператор `%` использует `pg_trgm.similarity_threshold` (по умолчанию 0.3, диапазон 0–1). Для поиска имён значение 0.3–0.4 улавливает опечатки, при этом шум остаётся низким.

### Автодополнение, поиск по префиксу и вхождению

```sql
-- Поиск по префиксу для автодополнения. Индекс GIN по триграммам может помочь,
-- но индекс B‑tree по шаблону может быть лучше для чисто левосторонних префиксов.
SELECT name FROM users
WHERE name ILIKE $1 || '%'
ORDER BY name
LIMIT 10;

-- word_similarity для частичных совпадений внутри более длинных строк
-- ("Johnson" внутри "Andrew Johnson III")
SELECT id, name, word_similarity($1, name) AS score
FROM users
WHERE $1 <% name
ORDER BY score DESC
LIMIT 10;
```

Индекс GIN по триграммам особенно полезен для запросов `ILIKE '%pattern%'` и поиска с допуском опечаток — такие шаблоны обычно приводят к полному сканированию таблицы без триграммного индекса.

### Когда стоит отдать предпочтение pg_trgm вместо FTS

| Сценарий | Использовать |
|---|---|
| Поиск имени человека/компании с опечатками | `pg_trgm` |
| Автодополнение / поиск по префиксу | `pg_trgm` (или FTS с префиксными запросами) |
| Короткие строки, идентификаторы, коды | `pg_trgm` |
| Текстовые статьи, документация, тикеты | FTS |
| Журнальные сообщения для ключевых слов | FTS |
| Многоязычный поиск имён | `pg_trgm` (не зависит от языка) |

---

## Когда выигрывает точный поиск SQL

Некоторые задачи «поиска» вовсе не являются поиском.

«Найти пользователя с e‑mail `dan@example.com`» — это проверка равенства. «Найти заказ `ORD-12345`» — это поиск по первичному ключу. «Вывести посты в категории `tutorial`, отсортированные по дате» — это отфильтрованный запрос. Такие задачи должны обслуживаться B‑tree или hash‑индексами.

Применять здесь FTS или триграммы только усложняет схему без повышения точности — а для точных идентификаторов приближённое совпадение хуже, чем отсутствие совпадения.

```sql
CREATE INDEX users_email_idx ON users (email);

-- Точный поиск: быстро и однозначно
SELECT id, name FROM users WHERE email = $1;
```

Более широкой вывод: использовать приближённый поиск там, где есть однозначный правильный ответ — это ошибка категории. Вы получаете *что‑то* — и это может быть уверенно неверным.

---

## Комбинирование этих инструментов

Эти инструменты сочетаются без конфликтов. Вы не выбираете один единственный вариант.

**FTS + pg_trgm для поисковой строки, допускающей опечатки в ключевых словах:**

```sql
-- Триграммное сходство по заголовку ловит опечатки; ts_rank учитывает релевантность тела
SELECT id, title,
  ts_rank(search_vector, to_tsquery('simple', $1)) AS fts_rank,
  similarity(title, $1) AS trgm_score
FROM posts
WHERE search_vector @@ to_tsquery('simple', $1)
   OR title % $1
ORDER BY (ts_rank(search_vector, to_tsquery('simple', $1)) + similarity(title, $1)) DESC
LIMIT 10;
```

**FTS + `unaccent` для международного контента:**

```sql
-- Удаляем диакритические знаки, чтобы «José» совпадал с «Jose»
CREATE EXTENSION IF NOT EXISTS unaccent;

CREATE TEXT SEARCH CONFIGURATION public.simple_unaccent (COPY = pg_catalog.simple);

ALTER TEXT SEARCH CONFIGURATION public.simple_unaccent
  ALTER MAPPING FOR hword, hword_part, word
  WITH unaccent, simple;

ALTER TABLE posts ADD COLUMN search_vector tsvector;

CREATE TRIGGER posts_search_vector_refresh
BEFORE INSERT OR UPDATE OF title, body ON posts
FOR EACH ROW EXECUTE FUNCTION
  tsvector_update_trigger(search_vector, 'public.simple_unaccent', title, body);
```

**`unaccent` + `pg_trgm` для международного поиска имён:**

```sql
ALTER TABLE users ADD COLUMN name_search text;

CREATE FUNCTION users_name_search_refresh()
RETURNS trigger LANGUAGE plpgsql AS $$
BEGIN
  NEW.name_search := unaccent(coalesce(NEW.name, ''));
  RETURN NEW;
END;
$$;

CREATE TRIGGER users_name_search_refresh
BEFORE INSERT OR UPDATE OF name ON users
FOR EACH ROW EXECUTE FUNCTION users_name_search_refresh();

CREATE INDEX users_name_search_trgm_idx
  ON users USING GIN (name_search gin_trgm_ops);

SELECT id, name
FROM users
WHERE name_search % unaccent($1)
ORDER BY similarity(name_search, unaccent($1)) DESC
LIMIT 10;
```

Примеры триггеров избегают использования `unaccent()` внутри вычисляемых столбцов или выражений индексов, где важны правила неизменяемости PostgreSQL. Если вы оборачиваете `unaccent()` в собственную неизменяемую функцию, укажите, что принимаете риск обновления/конфигурации.

---

## Важные расширения

**`pg_trgm`** включён в большинство дистрибутивов Postgres, но требует явного включения. Это базовый механизм нечеткого сопоставления строк в Postgres.

**`unaccent`** удаляет диакритические знаки перед индексированием и запросами. Хорошо сочетается как с `pg_trgm`, так и с полнотекстовым поиском для контента на европейских языках. Поставляется вместе с Postgres.

**`pg_bigm`** расширяет подход триграмм до биграмм (срезы из 2‑символов), что заметно повышает качество результатов для языков CJK (китайский, японский, корейский), где `pg_trgm` показывает слабость. Требует отдельной установки; не входит в пакет.

**`pg_search`** (от [ParadeDB](https://www.paradedb.com/)) заменяет стандартный стек `GIN` / `tsvector` на индекс на основе Tantivy с BM25. Вы получаете BM25‑оценку (часто лучше, чем `ts_rank`), нечеткое сопоставление внутри запросов FTS, фасетный поиск и существенно более быструю индексацию больших таблиц. Это путь обновления «из коробки», когда стандартный FTS начинает давать ограничения по ранжированию или производительности.

```sql
-- pg_search: BM25 full-text search with fuzzy matching
CREATE INDEX posts_bm25_idx ON posts
  USING bm25 (id, title, body)
  WITH (key_field = 'id', text_fields = '{"title": {}, "body": {}}');

-- Query with BM25 scoring + fuzzy matching (catches "javascipt")
SELECT id, title, paradedb.score(id) AS rank
FROM posts
WHERE posts @@@ paradedb.fuzzy_phrase(field => 'title', value => 'postgres performnce')
ORDER BY rank DESC
LIMIT 10;
```

**`pgvector`** добавляет хранение плотных векторов и поиск по сходству. Это правильный инструмент, когда пользователи описывают, что им нужно, а не называют это явно — семантический поиск, RAG, рекомендации похожего контента, многоязычные запросы. Подробно рассматривается в статье [Semantic Vector Search and Hybrid Strategies](../semantic-vector-search-landscape).

---

## Таблица решений

| Что ищете | Рекомендация |
|---|---|
| Текстовые статьи, документация, тикеты | FTS |
| Имена людей/компаний с опечатками | `pg_trgm` |
| Автодополнение, поиск по префиксу | `pg_trgm` |
| Короткие коды, идентификаторы | `pg_trgm` |
| Логи для поиска ключевых слов | FTS |
| Международные имена | `pg_trgm` + `unaccent` |
| Большой объём контента, лучшее ранжирование | `pg_search` (ParadeDB BM25) |
| Первичные ключи, точные email, ID | B‑tree индекс |
| Даты, диапазоны, отсортированные списки | B‑tree индекс |
| Права, категории, фильтры | Обычное условие WHERE |
| Вопросы, перефразировки, концепты | pgvector (см. следующая статья) |

Когда сомневаетесь: короткие строки с орфографическими вариациями → триграммы. Длинные тексты для поисковых запросов → FTS. Структурированные идентификаторы → обычные индексы. Концептуальные или естественноязыковые запросы → pgvector.

---

## Гибридный поиск: два сигнала, один ранг

Когда запрос вроде `"withRetry timeout errors"` попадает в строку поиска, он несёт два типа намерения: точные имена символов, которые пользователь знает (`withRetry`), и концептуальное описание (`timeout errors`). Ни один примитив не покрывает оба случая. Запуск FTS и векторного поиска параллельно — а затем объединение их ранжированных списков с помощью Reciprocal Rank Fusion — решает задачу.

RRF оценивает каждый результат как `1 / (60 + rank)` в каждом списке и суммирует значения по спискам. Константа 60 смягчает преимущество самых верхних позиций, так что результат, занявший второе место в обоих списках, может обойти результат, который победил в одном списке и полностью отсутствует в другом. Главное, RRF никогда не усредняет «сырой» балл между методами — ранк FTS и косинусное расстояние измеряются в разных единицах и их нельзя просто сложить арифметически.

<figure>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1120 660" role="img" aria-labelledby="rrf-title rrf-desc">
  <title id="rrf-title">Гибридный поиск с Reciprocal Rank Fusion</title>
  <desc id="rrf-desc">Запрос разветвляется на полнотекстовый и векторный поиск, каждый выдаёт ранги, а Reciprocal Rank Fusion объединяет их в один список результатов.</desc>
  <defs>
    <marker id="rrf-arrow" markerWidth="12" markerHeight="12" refX="10" refY="6" orient="auto">
      <path d="M2,2 L10,6 L2,10 Z" fill="#334155"/>
    </marker>
    <filter id="rrf-shadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="10" stdDeviation="11" flood-color="#0f172a" flood-opacity="0.13"/>
    </filter>
    <style>{`
      .rrf-bg { fill: #f8fafc; }
      .rrf-title-text { font: 800 34px ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; fill: #0f172a; }
      .rrf-subtitle { font: 500 18px ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; fill: #475569; }
      .rrf-box { fill: #ffffff; stroke: #cbd5e1; stroke-width: 2; filter: url(#rrf-shadow); }
      .rrf-query { fill: #fff7ed; stroke: #fdba74; }
      .rrf-fts { fill: #eff6ff; stroke: #60a5fa; }
      .rrf-vector { fill: #f0fdf4; stroke: #86efac; }
      .rrf-merge { fill: #fdf2f8; stroke: #f9a8d4; }
      .rrf-result { fill: #ecfeff; stroke: #67e8f9; }
      .rrf-head { font: 800 24px ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; fill: #111827; }
      .rrf-body { font: 550 17px ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; fill: #334155; }
      .rrf-mono { font: 800 17px ui-monospace, SFMono-Regular, Menlo, Consolas, monospace; fill: #0f172a; }
      .rrf-rank { font: 800 16px ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; fill: #475569; }
      .rrf-arrow-line { stroke: #334155; stroke-width: 3; fill: none; marker-end: url(#rrf-arrow); }
      .rrf-thin { stroke: #94a3b8; stroke-width: 2; fill: none; marker-end: url(#rrf-arrow); }
    `}</style>
  </defs>

  <rect class="rrf-bg" width="1120" height="660"/>
  <text class="rrf-title-text" x="64" y="68">Гибридный поиск — два честных сигнала, затем один объединённый ранг</text>
  <text class="rrf-subtitle" x="64" y="102">Не усредняйте «сырой» балл. Ранг FTS и косинусное расстояние — разные валюты.</text>

  <rect class="rrf-box rrf-query" x="72" y="238" width="214" height="132" rx="20"/>
  <text class="rrf-head" x="104" y="288">Запрос пользователя</text>
  <text class="rrf-mono" x="104" y="324">"withRetry</text>
  <text class="rrf-mono" x="104" y="350">timeout errors"</text>

  <path class="rrf-arrow-line" d="M286 270 C350 270 350 188 418 188"/>
  <path class="rrf-arrow-line" d="M286 338 C350 338 350 440 418 440"/>

  <rect class="rrf-box rrf-fts" x="418" y="142" width="266" height="144" rx="20"/>
  <text class="rrf-head" x="450" y="188">FTS / BM25</text>
  <text class="rrf-body" x="450" y="224">Точные символы и слова</text>
  <text class="rrf-rank" x="450" y="256">1. API reference</text>
  <text class="rrf-rank" x="578" y="256">2. Retry guide</text>

  <rect class="rrf-box rrf-vector" x="418" y="394" width="266" height="144" rx="20"/>
  <text class="rrf-head" x="450" y="440">pgvector</text>
  <text class="rrf-body" x="450" y="476">Концептуальные соседства</text>
  <text class="rrf-rank" x="450" y="508">1. Network failures</text>
  <text class="rrf-rank" x="594" y="508">2. Retry guide</text>

  <path class="rrf-thin" d="M684 214 C734 214 734 294 778 294"/>
  <path class="rrf-thin" d="M684 466 C734 466 734 366 778 366"/>

  <rect class="rrf-box rrf-merge" x="778" y="260" width="258" height="166" rx="22"/>
  <text class="rrf-head" x="810" y="306">RRF‑слияние</text>
  <text class="rrf-body" x="810" y="342">Учитываем позицию каждого результата</text>
  <text class="rrf-body" x="810" y="368">в каждом списке.</text>
  <text class="rrf-mono" x="810" y="402">1 / (60 + rank)</text>

  <path class="rrf-arrow-line" d="M907 426 L907 492"/>

  <rect class="rrf-box rrf-result" x="736" y="492" width="342" height="110" rx="20"/>
  <text class="rrf-head" x="768" y="538">Итоговые результаты</text>
  <text class="rrf-body" x="768" y="574">Лучший результат — где точные термины</text>
  <text class="rrf-body" x="768" y="598">и семантическое значение согласованы.</text>
</svg>
<figcaption>Запрос разветвляется на FTS и pgvector параллельно. Каждый формирует собственный ранжированный список. RRF оценивает каждый документ по его позиции в каждом списке и суммирует оценки — в результате появляются документы, где оба сигнала согласуются.</figcaption>
</figure>

```sql
-- Hybrid search: FTS + pgvector merged with RRF
WITH fts AS (
  SELECT id, ts_rank(search_vector, query) AS score,
         ROW_NUMBER() OVER (ORDER BY ts_rank(search_vector, query) DESC) AS rank
  FROM docs, to_tsquery('english', 'withRetry & timeout') query
  WHERE search_vector @@ query
  LIMIT 60
),
vec AS (
  SELECT id,
         ROW_NUMBER() OVER (ORDER BY embedding <=> $embedding) AS rank
  FROM docs
  ORDER BY embedding <=> $embedding
  LIMIT 60
)
SELECT COALESCE(fts.id, vec.id) AS id,
       (COALESCE(1.0 / (60 + fts.rank), 0) +
        COALESCE(1.0 / (60 + vec.rank), 0)) AS rrf_score
FROM fts FULL JOIN vec ON fts.id = vec.id
ORDER BY rrf_score DESC
LIMIT 10;
```

Пул из 60‑документов‑кандидатов на каждую ветку (`LIMIT 60`) — это типичная отправная точка. Увеличьте его, если полнота (recall) низка; сузьте для ускорения.

## Что дальше

Текстовый поиск в Postgres покрывает большую часть задач, но у него есть предел. Когда пользователи формулируют запросы описательно, а не называют конкретные термины — например, «что‑то, что поможет мне спать в самолёте», «статьи о том, как отладить уверенность новичка‑инженера» — лексический и триграммный поиск оба дают сбой.

Это зона векторных эмбеддингов, семантического поиска и гибридных архитектур. Подробнее в статье [Semantic Vector Search and Hybrid Strategies](../semantic-vector-search-landscape).
````
