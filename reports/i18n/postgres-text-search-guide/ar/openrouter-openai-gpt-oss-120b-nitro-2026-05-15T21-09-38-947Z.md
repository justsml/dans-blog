# Translation Candidate
- Slug: postgres-text-search-guide
- Locale: ar
- Model: openrouter/openai/gpt-oss-120b:nitro
- Target: src/content/posts/2026-05-02--postgres-text-search-guide/ar/index.mdx
- Validation: deferred
- Runtime seconds: 21.70
- Input tokens: 11790
- Output tokens: 7720
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- Estimated cost: $0.001849
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
title: دليل البحث النصي في PostgreSQL 2026
subTitle: أدوات البحث الموجودة في قاعدة بياناتك، ومتى تثبت كل منها جدواه.
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
social_image: ../desktop-social.webp
cover_full_width: ../wide.webp
cover_mobile: ../square.webp
cover_icon: ../square.webp
---
معظم الفرق تستخدم أداة بحث واحدة في PostgreSQL. الفرق التي تعرف الثلاثة أدوات تُقدِّم بحثًا أفضل مع تعقيد أقل — وتتفادى التحويل المكلف إلى خدمة بحث مخصصة لم يكونوا بحاجة إليها بعد.

هذا الدليل يغطي مجموعة الخيارات الأصلية في PostgreSQL: ما تفعله كل أداة، متى تكون مناسبة، وكيفية دمجها.

## الأدوات الثلاث

**البحث النصي الكامل** (`tsvector` / فهرس `GIN`) هو لغوي. يقوم بتقسيم النص إلى صيغ لغوية (lexemes)، ويجذره، ويطابق الاستعلامات مع الفهرس. “Running” و “runs” يتحولان إلى نفس الصيغة اللغوية. وكذلك “dog” و “dogs”. دالة الترتيب (`ts_rank`) تُعطي أولوية للوثائق التي تظهر فيها مصطلحات الاستعلام كثيرًا أو بشكل بارز.

**المثلثات** (`pg_trgm`) تقسم السلاسل إلى قطع متداخلة من 3 أحرف وتقيس عدد القطع المشتركة بين سلسلتين. “Dan” → `" da"`, `"dan"`, `"an "`. “Micheal” و “Michael” تشتركان في معظم المثلثات، لذا تكون التشابهة عالية. هذا يجعل `pg_trgm` ممتازًا في مطابقة الأسماء غير الدقيقة، وتحمل الأخطاء المطبعية، والإكمال التلقائي — المجال الذي يضعف فيه البحث النصي الكامل.

**فهارس التطابق الدقيق** (B‑tree، hash) تتعامل مع المفاتيح الأساسية، عناوين البريد الإلكتروني، المعرفات، رموز المخزون، وأي شيء تكون الإجابة فيه ثنائية: إما يطابق أو لا يطابق. هذه الفهارس لا تشعر بأنها “بحث”، لكنها تُدرج في هذا النقاش لأن أسوأ نمط هو استخدام بحث غير دقيق أو دلالي لمشكلات لها إجابات صحيحة.

الاختيار ليس مسألة تعقٍّ. إنه مسألة مطابقة الأداة مع شكل الاستعلام.

<figure>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1120 720" role="img" aria-labelledby="stm-title stm-desc">
  <title id="stm-title">خريطة أدوات البحث في Postgres</title>
  <desc id="stm-desc">مقارنة بين pg_trgm، البحث النصي الكامل، pgvector، والبحث المختلط حسب شكل الإدخال ونية الاستعلام.</desc>
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
  <text class="stm-title-text" x="64" y="70">اختر primitive البحث حسب شكل الإدخال</text>
  <text class="stm-subtitle" x="64" y="103">نفس جدول Postgres يمكنه دعم الأربعة. الحيلة هي مطابقة الاستعلام مع النص.</text>

  <line class="stm-line" x1="560" y1="150" x2="560" y2="640"/>
  <line class="stm-line" x1="76" y1="395" x2="1044" y2="395"/>

  <text class="stm-axis" x="360" y="142">الكلمات الدقيقة مهمة</text>
  <text class="stm-axis" x="650" y="142">المعنى مهم</text>
  <text class="stm-axis" x="78" y="388" transform="rotate(-90 78 388)">نص قصير / منظم</text>
  <text class="stm-axis" x="78" y="628" transform="rotate(-90 78 628)">نص سردي طويل / مقاطع</text>

  <rect class="stm-card" x="112" y="168" width="408" height="186" rx="20"/>
  <rect x="136" y="192" width="100" height="28" rx="14" fill="#f59e0b"/>
  <text class="stm-label" x="154" y="212">غامض</text>
  <text class="stm-tool" x="136" y="256">pg_trgm</text>
  <text class="stm-body" x="136" y="294">أسماء، عناوين، ألقاب، أخطاء إملائية،</text>
  <text class="stm-body" x="136" y="320">إكمال تلقائي، سلاسل جزئية.</text>
  <text class="stm-small" x="136" y="344">تشابه إملائي: مسافة التهجئة.</text>

  <rect class="stm-card" x="600" y="168" width="408" height="186" rx="20"/>
  <rect x="624" y="192" width="116" height="28" rx="14" fill="#22c55e"/>
  <text class="stm-label" x="644" y="212">مشابه</text>
  <text class="stm-tool" x="624" y="256">pgvector</text>
  <text class="stm-body" x="624" y="294">عناصر مرتبطة، تذاكر مكررة،</text>
  <text class="stm-body" x="624" y="320">توصيات من أوصاف قصيرة.</text>
  <text class="stm-small" x="624" y="344">تشابه التضمين: مسافة المعنى.</text>

  <rect class="stm-card" x="112" y="436" width="408" height="186" rx="20"/>
  <rect x="136" y="460" width="102" height="28" rx="14" fill="#38bdf8"/>
  <text class="stm-label" x="158" y="480">لغوي</text>
  <text class="stm-tool" x="136" y="524">البحث النصي الكامل</text>
  <text class="stm-body" x="136" y="562">مقالات، وثائق، سجلات، محتوى دعم</text>
  <text class="stm-body" x="136" y="588">حيث يجب ظهور كلمات الاستعلام.</text>
  <text class="stm-small" x="136" y="612">صيغ لغوية، تجذير، ترتيب، فلاتر منطقية.</text>

  <rect class="stm-card" x="600" y="436" width="408" height="186" rx="20"/>
  <rect x="624" y="460" width="102" height="28" rx="14" fill="#f472b6"/>
  <text class="stm-label" x="645" y="480">مختلط</text>
  <text class="stm-tool" x="624" y="524">FTS + pgvector</text>
  <text class="stm-body" x="624" y="562">وثائق تقنية وRAG حيث يسأل المستخدمون</text>
  <text class="stm-body" x="624" y="588">أسئلة مفهومية بالإضافة إلى رموز دقيقة.</text>
  <text class="stm-small" x="624" y="612">تشغيل كلاهما، دمج الترتيب بـRRF.</text>

  <rect x="396" y="658" width="328" height="36" rx="18" fill="url(#header)"/>
  <text class="stm-chip" x="429" y="681">ابدأ بنية نية الاستعلام، ثم افحص شكل النص</text>
</svg>
<figcaption>الأربعة primitives للبحث في Postgres مُصنَّفة حسب نية الاستعلام (دقيق مقابل دلالي) وشكل النص (منظم مقابل سردي). يمكن لنفس الجدول حمل جميع الفهارس الأربعة — الاختيار يكون لكل استعلام، لا لكل جدول.</figcaption>
</figure>

## متى ينجح البحث النصي الكامل

**البحث في النصوص السردية عن كلمات مفتاحية.** مشاركات المدونات، الوثائق، أوصاف المنتجات، تذاكر الدعم، المستندات القانونية. صُمم FTS لهذا الشكل من المحتوى: استرجاع مفهرس ومرتب على النص الطبيعي.

**استعلامات المستخدم القائمة على الكلمات المفتاحية.** يكتب المستخدمون مصطلح بحث، يفلترون حسب الوسم، أو يتصفحون حسب كلمة مفتاحية. يتعامل FTS مع هذه النية أصلاً دون أي بنية تضمين.

**نتائج مرتبة دون تبعيات خارجية.** فهارس FTS سريعة، حتمية، ولا تحتاج إلى استدعاءات API. إشارة الصلة تأتي من تكرار المصطلح مع وزن موقع الحقل.

**تصفية منطقية إلى جانب البحث.** يتكامل FTS طبيعيًا مع منطق الاستعلام الحالي لديك:

```sql
SELECT * FROM posts
WHERE search_vector @@ to_tsquery('english', 'postgres & performance')
  AND category = 'tutorial'
  AND published_at > NOW() - INTERVAL '6 months';
```

### إعداد FTS

```sql
-- العمود المولد يحافظ على الفهرس محدثًا تلقائيًا
ALTER TABLE posts ADD COLUMN search_vector tsvector
  GENERATED ALWAYS AS (
    setweight(to_tsvector('english', coalesce(title, '')), 'A') ||
    setweight(to_tsvector('english', coalesce(body,  '')), 'B')
  ) STORED;

CREATE INDEX posts_search_idx ON posts USING GIN (search_vector);

-- الاستعلام
SELECT title, ts_rank(search_vector, query) AS rank
FROM posts, to_tsquery('english', 'postgres & performance') query
WHERE search_vector @@ query
ORDER BY rank DESC
LIMIT 10;
```

`setweight` يحدد الأهمية: `A` (العنوان) يتفوق على `B` (المحتوى). هذا هو نموذج الصلة الكامل لمعظم حالات استخدام البحث في المحتوى.

### ما لا يتعامل معه FTS جيدًا

- الأخطاء الإملائية في الاستعلامات — "javascipt" لن يتطابق مع "javascript"
- أسماء الأشخاص، العناوين، الأسماء الخاصة التي لا تُشتق بشكل متوقع
- البحث بالبادئة/الإكمال التلقائي دون إعداد خاص
- الاستعلامات التي يصف فيها المستخدم مفهومًا بدلاً من تسميته

---

## متى تتفوق الـ Trigrams (`pg_trgm`)

`pg_trgm` يغطي الفجوة المحرجة التي يخطئ فيها الـ FTS باستمرار.

يقوم الـ FTS بتقسيم النص إلى صيغ أساسية (lexemes) ويشتقها. هذا صحيح للنصوص السردية، لكنه غالبًا غير مناسب للأسماء والمعرفات القصيرة:

- أسماء الأشخاص ("Dan Levy" → تُشتق بطرق مختلفة حسب القاموس وإعداد اللغة)
- أسماء الشركات، العناوين، عناوين المنتجات حيث يهم التهجئة الدقيقة
- الاستعلامات التي تحتوي أخطاء إملائية — "Micheal Jordan"، "Amaon"، "javascipt"
- الإكمال التلقائي / البحث بالبادئة
- مطابقة سلاسل جزئية ("son" تتطابق مع "Johnson"، "Anderson")

`pg_trgm` لا يعتمد على اللغة، وهو ما يهم عند التعامل مع أسماء من خلفيات لغوية متنوعة. الـ FTS يتطلب تكوين قواميس لكل لغة.

### بحث أسماء غير دقيقة

```sql
CREATE EXTENSION IF NOT EXISTS pg_trgm;

CREATE INDEX users_name_trgm_idx ON users USING GIN (name gin_trgm_ops);

-- يجد "Micheal Jordan" عند البحث عن "Michael Jordan"
SELECT id, name, similarity(name, $1) AS score
FROM users
WHERE name % $1          -- عامل % = عتبة التشابه (الافتراضي 0.3)
ORDER BY score DESC
LIMIT 10;
```

عامل `%` يستخدم `pg_trgm.similarity_threshold` (الافتراضي 0.3، النطاق 0–1). للبحث عن الأسماء، 0.3–0.4 يلتقط الأخطاء الإملائية مع الحفاظ على الضوضاء منخفضة.

### الإكمال التلقائي، البحث بالبادئة، والبحث داخل السلاسل

```sql
-- مطابقة البادئة للإكمال التلقائي. فهرس GIN للـ trigram يمكن أن يساعد،
-- لكن فهرس B-tree للأنماط قد يكون أفضل للبادئات اليسارية الصرفة.
SELECT name FROM users
WHERE name ILIKE $1 || '%'
ORDER BY name
LIMIT 10;

-- word_similarity للمطابقات الجزئية داخل سلاسل أطول
-- ("Johnson" داخل "Andrew Johnson III")
SELECT id, name, word_similarity($1, name) AS score
FROM users
WHERE $1 <% name
ORDER BY score DESC
LIMIT 10;
```

فهرس GIN للـ trigram مفيد بشكل خاص لاستعلامات `ILIKE '%pattern%'` التي تبحث داخل النصوص ومطابقة الأخطاء الإملائية — وهي أنماط عادةً ما تتطلب مسح كامل للجدول بدون فهرس الـ trigram.

### متى نختار pg_trgm على الـ FTS

| السيناريو | الاستخدام |
|---|---|
| بحث عن اسم شخص/شركة مع أخطاء إملائية | `pg_trgm` |
| الإكمال التلقائي / البحث بالبادئة | `pg_trgm` (أو FTS مع استعلامات البادئة) |
| سلاسل قصيرة، معرفات، أكواد | `pg_trgm` |
| مقالات نصية، وثائق، تذاكر | FTS |
| رسائل سجل للكلمات المفتاحية | FTS |
| بحث متعدد اللغات عن الأسماء | `pg_trgm` (لا يعتمد على اللغة) |

---

## متى ينتصر البحث بالتطابق الدقيق في SQL

بعض مشكلات "البحث" ليست بحثًا أصلاً.

"العثور على المستخدم بالبريد `dan@example.com`" هو فحص مساواة. "العثور على الطلب `ORD-12345`" هو استعلام مفتاح أساسي. "قائمة المشاركات في فئة `tutorial` مرتبة حسب التاريخ" هو استعلام مُفلتر. هذه الحالات تُعالج بفهارس B-tree أو hash.

استخدام الـ FTS أو الـ trigrams هنا يضيف تعقيدًا دون تحسين الدقة — وللمعرفات الدقيقة، التطابق القريب أسوأ من عدم وجود تطابق على الإطلاق.

```sql
CREATE INDEX users_email_idx ON users (email);

-- Exact lookup: fast and unambiguous
SELECT id, name FROM users WHERE email = $1;
```

الدرس الأوسع: البحث التقريبي للمشكلات التي لها إجابات صحيحة هو خطأ تصنيفي. فهو يُعيد *شيئًا* — قد يكون خاطئًا بثقة.

---

## دمج هذه الأدوات

هذه الأدوات تتكامل بسلاسة. لا تختار أداة واحدة فقط.

**FTS + pg_trgm لصندوق البحث الذي يتحمل الأخطاء الإملائية في الكلمات المفتاحية:**

```sql
-- Trigram similarity on title catches typos; ts_rank handles body relevance
SELECT id, title,
  ts_rank(search_vector, to_tsquery('simple', $1)) AS fts_rank,
  similarity(title, $1) AS trgm_score
FROM posts
WHERE search_vector @@ to_tsquery('simple', $1)
   OR title % $1
ORDER BY (ts_rank(search_vector, to_tsquery('simple', $1)) + similarity(title, $1)) DESC
LIMIT 10;
```

**FTS + `unaccent` للمحتوى الدولي:**

```sql
-- Strip diacritical marks so "José" matches "Jose"
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

**`unaccent` + `pg_trgm` للبحث عن الأسماء الدولية:**

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

أمثلة المشغلات تتجنب استخدام `unaccent()` داخل أعمدة مُولَّدة أو تعبيرات الفهارس، حيث تهم قواعد عدم القابلية للتغيير في PostgreSQL. إذا غلفت `unaccent()` بدالة غير قابلة للتغيير خاصة بك، فوثّق أنك تقبل مخاطر الترقية/التكوين.

---

## امتدادات جديرة بالذكر

**`pg_trgm`** مدمج مع معظم توزيعات Postgres لكنه يتطلب تمكينًا صريحًا. هو الأساس للمطابقة الضبابية للسلاسل في Postgres.

**`unaccent`** يزيل العلامات الدياكريتية قبل الفهرسة والاستعلام. يتناغم جيدًا مع كل من `pg_trgm` و FTS للمحتوى باللغات الأوروبية. مدمج مع Postgres.

**`pg_bigm`** يوسّع نهج الـ trigram إلى bigrams (شرائح من حرفين)، مما يحسّن النتائج بشكل كبير للغات CJK (الصينية، اليابانية، الكورية) حيث يتراجع أداء `pg_trgm`. يجب تثبيته منفصلًا؛ ليس مدمجًا.

**`pg_search`** (من [ParadeDB](https://www.paradedb.com/)) يستبدل مجموعة `GIN` / `tsvector` القياسية بفهرس مبني على Tantivy يستخدم خوارزمية BM25. يمنحك ترتيب BM25 (غالبًا أفضل من `ts_rank`)، مطابقة ضبابية داخل استعلامات FTS، بحثًا موجهًا بالخصائص، وفهرسة أسرع بشكل ملحوظ على الجداول الكبيرة. هو مسار ترقية مباشر عندما يبدأ FTS القياسي بإظهار حدود في الترتيب أو الأداء.

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

**`pgvector`** يضيف تخزين المتجهات الكثيفة والبحث عن التشابه. هو الأداة المناسبة عندما يصف المستخدمون ما يريدون بدلاً من تسميته — البحث الدلالي، RAG، توصيات المحتوى ذات الصلة، الاستعلامات متعددة اللغات. تم تغطيته بعمق في [بحث المتجه الدلالي والاستراتيجيات الهجينة](/semantic-vector-search-landscape).

---

## جدول القرار

| ما الذي تبحث عنه | التوصية |
|---|---|
| مقالات نثرية، وثائق، تذاكر | FTS |
| أسماء أشخاص/شركات مع أخطاء إملائية | `pg_trgm` |
| إكمال تلقائي، بحث بادئة | `pg_trgm` |
| رموز قصيرة، معرفات | `pg_trgm` |
| رسائل سجل للكلمات المفتاحية | FTS |
| أسماء دولية | `pg_trgm` + `unaccent` |
| محتوى كبير، ترتيب أفضل | `pg_search` (ParadeDB BM25) |
| المفاتيح الأساسية، بريد إلكتروني دقيق، معرفات | فهرس B-tree |
| تواريخ، نطاقات، قوائم مرتبة | فهرس B-tree |
| أذونات، فئات، فلاتر | شرط WHERE عادي |
| أسئلة، صيغ موازية، مفاهيم | pgvector (انظر المقال التالي) |

عند الشك: السلاسل القصيرة مع اختلافات إملائية → ثلاثيات الحروف. النصوص الطويلة لاستعلامات الكلمات المفتاحية → البحث النصي الكامل (FTS). المعرفات المهيكلة → الفهارس العادية. الاستعلامات المفهومية أو بلغة طبيعية → pgvector.

---

## البحث المختلط: إشارتيّن، ترتيب واحد

عندما يُدخل المستخدم استعلامًا مثل `"withRetry timeout errors"` في صندوق البحث، يحمل نيتين مختلفتين: أسماء رموز دقيقة يعرفها المستخدم (`withRetry`) ووصف مفهومي (`timeout errors`). لا يغطي أي بديل أساسي كلاهما. تشغيل FTS والبحث المتجهي بالتوازي — ثم دمج قوائم الترتيب باستخدام دمج الترتيب العكسي (Reciprocal Rank Fusion) — يحقق ذلك.

تُحسب نقاط RRF لكل نتيجة كـ `1 / (60 + rank)` في كل قائمة وتُجمع عبر القوائم. الثابت 60 يخفّف ميزة المراتب العليا، لذا يمكن لنتيجة تحتل المرتبة الثانية في كلتا القائمتين أن تتفوق على نتيجة تفوز بإحدى القوائم وتغيب تمامًا عن الأخرى. الأهم أن RRF لا يُعدّل المتوسط بين الدرجات الخام للطرق — ترتيب FTS والمسافة الكوسينية عملات مختلفة ولا يمكن جمعها حسابيًا.

<figure>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1120 660" role="img" aria-labelledby="rrf-title rrf-desc">
  <title id="rrf-title">البحث المختلط مع دمج الترتيب العكسي</title>
  <desc id="rrf-desc">يتفرّع الاستعلام إلى بحث نصي كامل وبحث متجهي، كل منهما ينتج ترتيبات، ودمج الترتيب العكسي يجمعهما في قائمة نتائج واحدة.</desc>
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
  <text class="rrf-title-text" x="64" y="68">البحث المختلط هو إشارتان صادقتان، ثم ترتيب موحد</text>
  <text class="rrf-subtitle" x="64" y="102">لا تُعدّل المتوسط بين الدرجات الخام. ترتيب FTS والمسافة الكوسينية عملات مختلفة.</text>

  <rect class="rrf-box rrf-query" x="72" y="238" width="214" height="132" rx="20"/>
  <text class="rrf-head" x="104" y="288">استعلام المستخدم</text>
  <text class="rrf-mono" x="104" y="324">"withRetry</text>
  <text class="rrf-mono" x="104" y="350">timeout errors"</text>

  <path class="rrf-arrow-line" d="M286 270 C350 270 350 188 418 188"/>
  <path class="rrf-arrow-line" d="M286 338 C350 338 350 440 418 440"/>

  <rect class="rrf-box rrf-fts" x="418" y="142" width="266" height="144" rx="20"/>
  <text class="rrf-head" x="450" y="188">FTS / BM25</text>
  <text class="rrf-body" x="450" y="224">الرموز والكلمات الدقيقة</text>
  <text class="rrf-rank" x="450" y="256">1. مرجع API</text>
  <text class="rrf-rank" x="578" y="256">2. دليل إعادة المحاولة</text>

  <rect class="rrf-box rrf-vector" x="418" y="394" width="266" height="144" rx="20"/>
  <text class="rrf-head" x="450" y="440">pgvector</text>
  <text class="rrf-body" x="450" y="476">جيران مفهوميّون</text>
  <text class="rrf-rank" x="450" y="508">1. فشل الشبكة</text>
  <text class="rrf-rank" x="594" y="508">2. دليل إعادة المحاولة</text>

  <path class="rrf-thin" d="M684 214 C734 214 734 294 778 294"/>
  <path class="rrf-thin" d="M684 466 C734 466 734 366 778 366"/>

  <rect class="rrf-box rrf-merge" x="778" y="260" width="258" height="166" rx="22"/>
  <text class="rrf-head" x="810" y="306">دمج RRF</text>
  <text class="rrf-body" x="810" y="342">امنح كل نتيجة ائتمانًا</text>
  <text class="rrf-body" x="810" y="368">حسب موضعها في كل قائمة.</text>
  <text class="rrf-mono" x="810" y="402">1 / (60 + rank)</text>

  <path class="rrf-arrow-line" d="M907 426 L907 492"/>

  <rect class="rrf-box rrf-result" x="736" y="492" width="342" height="110" rx="20"/>
  <text class="rrf-head" x="768" y="538">النتائج النهائية</text>
  <text class="rrf-body" x="768" y="574">النتيجة العليا هي التي تتطابق فيها المصطلحات الدقيقة</text>
  <text class="rrf-body" x="768" y="598">مع المعنى الدلالي.</text>
</svg>
<figcaption>يتفرّع الاستعلام إلى FTS وpgvector بالتوازي. كل منهما ينتج قائمة مرتبة خاصة به. تُحسب نقاط RRF لكل مستند بناءً على موقعه في كل قائمة وتُجمع النقاط — النتيجة تُظهر المستندات التي تتفق فيها الإشارتان.</figcaption>
</figure>

```sql
-- البحث المختلط: FTS + pgvector مدمجان باستخدام RRF
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

مجموعة المرشحين المكوّنة من 60 مستندًا لكل فرع (`LIMIT 60`) تُعد نقطة انطلاق شائعة. وزّعها إذا كان الاسترجاع منخفضًا؛ قللها للسرعة.

---

## ما التالي

يغطي بحث النص في PostgreSQL مساحة واسعة، لكنه له حد أقصى. عندما يصف المستخدمون ما يريدون بدلاً من تسميته — "شيء يساعدني على النوم أثناء الرحلة"، "مقالات عن تصحيح الأخطاء بثقة كمهندس جديد" — يفشل كل من البحث اللفظي والبحث الثلاثي.

هذا هو مجال تمثيلات المتجهات، البحث الدلالي، والهياكل المختلطة. تم التغطية في [البحث الدلالي بالمتجهات والاستراتيجيات المختلطة](/semantic-vector-search-landscape).
````
