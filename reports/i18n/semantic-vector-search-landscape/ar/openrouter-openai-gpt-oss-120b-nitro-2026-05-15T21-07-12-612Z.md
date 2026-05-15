# Translation Candidate
- Slug: semantic-vector-search-landscape
- Locale: ar
- Model: openrouter/openai/gpt-oss-120b:nitro
- Target: src/content/posts/2026-05-01--semantic-vector-search-landscape/ar/index.mdx
- Validation: deferred
- Runtime seconds: 7.02
- Input tokens: 12661
- Output tokens: 7804
- Thinking tokens: unknown
- Cached input tokens: 3072
- Cache write tokens: 0
- Estimated cost: $0.001898
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
title: البحث المتجه الدلالي ومواضيع أخرى لكسب الأصدقاء والعشاق
subTitle: 'مشهد البحث الكامل: الدقيق، الضبابي، الدلالي، المختلط — ومتى ندمجهم جميعًا.'
modified: '2026-05-04'
tags:
  - postgres
  - postgresql
  - pgvector
  - vector-search
  - semantic-search
  - hybrid-search
  - rag
  - ai
  - databases
  - search
  - embeddings
category: Code
subCategory: Databases
social_image: ../desktop-social.webp
cover_full_width: ../wide.webp
cover_mobile: ../square.webp
cover_icon: ../square.webp
---
البحث ليس شيئًا واحدًا، والبحث الدلالي ليس بديلاً لبقية الأنواع.

"العثور على مستخدم بالبريد الإلكتروني `dan@example.com`" و"ابحث عن مقالات حول تصحيح الأخطاء كمهندس جديد" يُوصفان كلاهما على أنه بحث، لكنهما لا يشتركان تقريبًا في أي شيء من منظور المشكلات الهندسية. الأول لديه إجابة صحيحة وعمليات بحث في الفهرس بـ `O(log n)`. الثاني لا يملك إجابة صحيحة — فقط صلة — ويتطلب فهم اللغة والنية والمعنى.

المهندسون الذين يملكون أقوى الحجج حول قرارات البحث — الذين يفوزون بالمناقشات ويطلقون النظام الصحيح — يدركون المشهد بالكامل. هم يعرفون أي أداة يجب أن يلجأوا إليها ولماذا، ويمكنهم شرح ذلك بوضوح.

هذه المقالة تغطي الطبقة الدلالية: ما يفعله البحث المتجه فعليًا، ومتى يبرز، وأين يجب أن يبقى بعيدًا عن الطريق. النسخة المفيدة ليست "تضمين كل شيء". بل هي معرفة متى تنتمي المتجهات إلى جانب البحث اللغوي، والبحث الضبابي، والبحث بالتطابق الدقيق في بنية هجينة.

الجزء اللغوي والضبابي من الصورة — `tsvector`، `pg_trgm`، `pg_search` — موجود في [دليل البحث النصي في Postgres 2026](/postgres-text-search-guide).

---

## مصطلحات سريعة

**Embedding** — قائمة كثيفة من الأعداد العائمة التي ينتجها نموذج، تمثل قطعة من النص (أو الصورة، الصوت، إلخ) كنقطة في فضاء عالي الأبعاد. المحتوى المتعلق دلاليًا يهبط قريبًا؛ المحتوى غير المتعلق يبتعد كثيرًا.

**Lexical search** — بحث يعتمد على مطابقة الكلمات والرموز الدقيقة. سريع، حتمي، وصحيح للمصطلحات المعروفة. لا يفهم المرادفات أو الصياغات البديلة أو المكافئات عبر اللغات.

**Semantic search** — بحث يعتمد على المعنى بدلاً من الرموز. يمكن لاستعلام مثل "كيف أتعامل مع مهلات الوقت" أن يطابق مستندًا بعنوان "تكوين سياسات إعادة المحاولة" دون وجود كلمات مشتركة، لأن تمثيلهما المتجهي قريب هندسيًا.

**Vector** — قائمة من الأعداد. في سياق البحث، هو ناتج نموذج التضمين. "البحث المتجهي" يجد المتجهات الأقرب إلى متجه الاستعلام عبر المسافة الهندسية.

**FTS (Full-Text Search)** — البحث اللغوي المدمج في Postgres، المدعوم بـ `tsvector` / `tsquery`. يقوم بتقطيع النص، وتجذيره، وفهرسة الكلمات للبحث بالكلمات المفتاحية. قوي للنصوص والبحث بالتطابق الدقيق؛ غير مدرك للمعنى.

**BM25** — خوارزمية ترتيب للبحث اللغوي (تُستخدم في Elasticsearch، Qdrant، وغيرها). تُحسب النقاط بناءً على تكرار المصطلح مقارنةً لندرة المصطلح عبر المجموعة. أفضل من المطابقة الخام للكلمات المفتاحية؛ لا يزال لغويًا.

**HNSW (Hierarchical Navigable Small World)** — الفهرس القياسي للبحث المتقارب التقريبي للمتجهات. يبني رسمًا بيانيًا طبقيًا للجوار لتسريع استعلامات التشابه ذات الاسترجاع العالي. يستخدمه pgvector، Qdrant، Weaviate، ومعظم الآخرين.

**RRF (Reciprocal Rank Fusion)** — خوارزمية لدمج قوائم النتائج المرتبة من أنظمة استرجاع متعددة. تستخدم موضع الترتيب فقط — لا حاجة لتطبيع الدرجات. النتيجة التي تحتل مرتبة عالية في كل من قوائم FTS والمتجهات تحصل على درجة مركبة أقوى من تلك التي تتفوق في واحدة فقط.

---

## ما يفعله البحث الدلالي فعليًا

تحويل التضمينات المتجهية للنص (أو الصور، الصوت، إلخ) إلى قائمة من الأعداد — نقطة في فضاء عالي الأبعاد. يتم تدريب نموذج التضمين بحيث يهبط النص المتعلق دلاليًا قريبًا في ذلك الفضاء. "Dog" و"canine" يقتربان. "Running a marathon" و"running a Python script" يبتعدان رغم وجود كلمة مشتركة.

البحث عن التشابه في ذلك الفضاء يحدد المستندات التي *معناها* أقرب إلى معنى الاستعلام، بغض النظر عن تداخل الكلمات الفعلية.

هذا يعني:
- “كيف أُكوّن مهلات الطلب؟” يمكن أن يطابق مقالًا بعنوان “تحديد حدود الاتصال وسياسات إعادة المحاولة” — لا توجد كلمات مشتركة، لكن الصلة المفهومية عالية
- “شيء خفيف لسهرة صيفية” يمكن أن يطابق توصية بنبيذ دون أي كلمة مفتاحية تظهر في وصف المنتج
- استعلام باللغة الإنجليزية يمكن أن يطابق مستندات ذات صلة بالفرنسية أو الإسبانية أو اليابانية إذا كان نموذج التضمين مدربًا متعدد اللغات

البحث المعجمي (`tsvector`، `pg_trgm`) لا يستطيع فعل أي من ذلك. فهو يعمل على الكلمات والحروف، لا على المعنى. الأدوات ليست قابلة للتبادل — كل منها يحل مشكلة مختلفة.

## متى يتفوق pgvector

**بناء RAG.** استرجاع‑معزز‑توليد (Retrieval‑Augmented Generation) يجلب أجزاء المستند التي يكون معناها أقرب إلى سؤال المستخدم، ثم يمررها إلى نموذج لغة كسياق. خطوة الاسترجاع هذه هي عملية متجهية. البحث النصي سيفوت الصيغ المتنوعة، والمرادفات، والمطابقات المفهومية التي قد يعبر عنها الجزء ذي الصلة بصياغة مختلفة. ميزة pgvector مقارنةً بمخزن متجهات مستقل هي أنه يعمل داخل قاعدة Postgres الحالية — لا حاجة لخدمة منفصلة للنشر أو التشغيل أو مزامنة البيانات.

**المستخدمون يصفون ما يريدون، لا ما يبحثون عنه.** “مقالات عن بناء الثقة كمدير جديد” لا تحتوي على كلمات مفتاحية تظهر بانتظام في المشاركات ذات الصلة. “إطار عمل خفيف لمعالجة الآثار الجانبية” قد لا يستخدم تلك الكلمات الدقيقة في الوثائق. البحث المتجه يطابق النية، لا الإملاء.

**العثور على عناصر مشابهة.** منتجات ذات صلة، تذاكر دعم مماثلة، تقارير أخطاء مكررة، مقالات قد تعجبك أيضًا. “ابحث عن القضايا المشابهة لهذه” هو بحث أقرب‑جارٍ — يتم تضمين العنصر، ثم إيجاد جيرانه الهندسيين. تحذير مهم: البحث المتجه دائمًا يُعيد نتائج، حتى عندما لا يكون هناك تشابه حقيقي. لحالات الاستنساخ والتوصية، يجب تصفية النتائج بحد أدنى للتشابه (مثلاً، تشابه جيبي ≥ 0.80) لتجنب إظهار مطابقات منخفضة الثقة كأنها ذات معنى.

**إزالة التكرار الدلالي.** قبل فهرسة المحتوى لـ RAG أو البحث، غالبًا ما تحتاج إلى تحديد النسخ القريبة في المجموعة — مقالات تم تعديلها عدة مرات، تذاكر دعم مكررة، مدخلات قاعدة معرفة تتقاطع بشكل كبير. قم بتضمين المستندات واستخدم تصفية بالحد الجيبي لتعليم أو دمج النسخ القريبة قبل أن تلوث الفهرس. هذا يمنع الاسترجاع من إرجاع عدة أجزاء شبه متطابقة وتخفيف نافذة السياق.

**البحث متعدد اللغات.** نماذج التضمين متعددة اللغات تُخرّج محتوى مكافئ دلاليًا عبر اللغات إلى متجهات متقاربة. استعلام بالإسبانية عن “perder peso” يمكن أن يطابق مقالًا إنجليزيًا حول “عادات فقدان الوزن المستدامة” — لا توجد رموز مشتركة، لكن المعنى الأساسي واحد. البحث المعجمي يتطلب تكوين قواميس لكل لغة ويتعامل مع الاستعلامات عبر اللغات بصورة ضعيفة. `pg_trgm` لا يهمه اللغة لكنه يعتمد على الشكل الكتابي، لا على الدلالة.

### إعداد pgvector

من تثبيت الامتداد إلى استعلام التشابه، الإعداد يتكون من عدد قليل من عبارات SQL:

```sql
CREATE EXTENSION IF NOT EXISTS vector;

ALTER TABLE documents ADD COLUMN embedding vector(1536);

-- HNSW هو عادةً الفهرس الأول لتجربته على مجموعات بيانات متوسطة الحجم
CREATE INDEX documents_embedding_idx
  ON documents USING hnsw (embedding vector_cosine_ops);

-- استعلام البحث الدلالي
SELECT id, title, 1 - (embedding <=> $1::vector) AS similarity
FROM documents
ORDER BY embedding <=> $1::vector
LIMIT 10;
```

`<=>` هو مسافة جيبية. `1 - cosine_distance` يعطي تشابه جيبي (1.0 = متطابق، 0.0 = متعامد). بالنسبة إلى `ivfflat` (البديل الأقدم الأسرع في الإنشاء)، استخدم `lists = sqrt(row_count)` كنقطة بداية.

### ما لا يتقنه pgvector جيدًا

- المطابقة الدقيقة للرموز — رموز المنتجات، رموز الأخطاء، أسماء الدوال. `ORD-12345` ليس له تشابه دلالي مع أي شيء. قد يُعيد بحث مبني على التضمين `ORD-12344` أو لا يُعيد أي نتيجة ذات صلة. استخدم FTS أو فهرس B‑tree.
- الأسماء والأسماء الخاصة. مساحة التضمين تُنظم حسب المعنى، لا حسب الإملاء. سجل المستخدم “Micheal Jordan” لا يقترب بالضرورة من “Michael Jordan” في الفضاء المتجه.
- السلاسل القصيرة حيث تكون التشابه على مستوى الحرف أهم من المعنى. `pg_trgm` يتعامل مع هذا.
- الاستعلامات التي يجب أن يظهر فيها المصطلح الدقيق. BM25 وFTS أكثر موثوقية للمطابقة المعروفة للمصطلحات.

## البحث المختلط: الحالة للدمج بينهما

التوثيق التقني هو المثال الأكثر وضوحًا حيث لا تكفي أي أداة بمفردها.

المستخدمون الذين يبحثون عن "how to configure timeouts" يحتاجون إلى مطابقة مفهومية: مقالة بعنوان "Setting retry policies and connection limits" لا تحتوي على كلمات مفتاحية متداخلة لكنها بالضبط ما يحتاجونه.

نفس هؤلاء المستخدمون يبحثون أيضًا عن `withRetry()`, `ECONNRESET`, و `ERR_SOCKET_TIMEOUT`. يجب أن تظهر هذه السلاسل الدقيقة — المطابقة الدلالية قد لا تعثر عليها بشكل موثوق، وإيجاد نتيجة إيجابية زائفة (مشابهة من حيث المفهوم ولكن ليست الـ API الصحيح) يُعد مضللًا فعليًا.

بحث المتجهات يتعامل مع الاستعلامات المفهومية. FTS يتعامل مع المصطلحات الدقيقة. لا أحد منهما يتعامل مع كليهما بشكل جيد بمفرده.

الحل هو البحث المختلط: تشغيل كلاهما ودمج النتائج.

### دمج الترتيب العكسي (Reciprocal Rank Fusion)

**دمج الترتيب العكسي (RRF)** هو الخوارزمية القياسية لدمج قوائم مرتبة من أنظمة استرجاع مختلفة. لا يتطلب تطبيع الدرجات بين الأنظمة — فهو يستخدم فقط مواضع الترتيب. النتيجة التي تظهر مرتبة عالية في *كلا* القائمتين تحصل على درجة مركبة أقوى من تلك التي تهيمن على واحدة فقط.

```sql
WITH fts_results AS (
  SELECT id,
    ROW_NUMBER() OVER (ORDER BY ts_rank(search_vector, query) DESC) AS rank
  FROM documents, to_tsquery('english', $1) query
  WHERE search_vector @@ query
  LIMIT 50
),
vector_results AS (
  SELECT id,
    ROW_NUMBER() OVER (ORDER BY embedding <=> $2::vector) AS rank
  FROM documents
  ORDER BY embedding <=> $2::vector
  LIMIT 50
),
rrf AS (
  SELECT
    COALESCE(f.id, v.id) AS id,
    COALESCE(1.0 / (60 + f.rank), 0) +
    COALESCE(1.0 / (60 + v.rank), 0) AS rrf_score
  FROM fts_results f
  FULL OUTER JOIN vector_results v ON f.id = v.id
)
SELECT d.id, d.title, rrf.rrf_score
FROM rrf
JOIN documents d ON d.id = rrf.id
ORDER BY rrf_score DESC
LIMIT 10;
```

العدد `60` في المقام هو ثابت RRF. القيم الأعلى تخفّف من اختلافات موضع الترتيب؛ القيم الأقل تضخمها. القيمة الافتراضية 60 تعمل جيدًا عبر معظم أنواع المحتوى.

RRF يتجنب المشكلة الأصعب المتمثلة في تطبيع `ts_rank` (درجة تكرار لوغاريتمي) مقابل مسافة جيبية (مقياس هندسي). هذان المقياسان غير قابلين للمقارنة. RRF يطرح سؤالًا بسيطًا: "ما مدى ارتفاع ظهور هذه النتيجة في كل قائمة؟"

### البحث المختلط مع الـ Trigrams أيضًا

للبحث الموجه للمستخدم على محتوى مختلط — حيث قد يبحث المستخدمون عن اسم شخص، مفهوم، أو مصطلح دقيق في نفس الجلسة — الدمج الثلاثي يعالج جميع هذه الحالات:

```sql
WITH trgm_results AS (
  SELECT id,
    ROW_NUMBER() OVER (ORDER BY similarity(title, $1) DESC) AS rank
  FROM documents
  WHERE title % $1
  LIMIT 50
),
fts_results AS (
  SELECT id,
    ROW_NUMBER() OVER (ORDER BY ts_rank(search_vector, to_tsquery('english', $1)) DESC) AS rank
  FROM documents
  WHERE search_vector @@ to_tsquery('english', $1)
  LIMIT 50
),
vector_results AS (
  SELECT id,
    ROW_NUMBER() OVER (ORDER BY embedding <=> $2::vector) AS rank
  FROM documents
  ORDER BY embedding <=> $2::vector
  LIMIT 50
),
rrf AS (
  SELECT
    COALESCE(t.id, f.id, v.id) AS id,
    COALESCE(1.0 / (60 + t.rank), 0) +
    COALESCE(1.0 / (60 + f.rank), 0) +
    COALESCE(1.0 / (60 + v.rank), 0) AS rrf_score
  FROM trgm_results t
  FULL OUTER JOIN fts_results f ON t.id = f.id
  FULL OUTER JOIN vector_results v ON COALESCE(t.id, f.id) = v.id
)
SELECT d.id, d.title, rrf.rrf_score
FROM rrf
JOIN documents d ON d.id = rrf.id
ORDER BY rrf_score DESC
LIMIT 10;
```

هذا يعالج: مطابقة الأسماء غير الدقيقة (trigrams)، مطابقة الكلمات المفتاحية الدقيقة (FTS)، والاستعلامات المفهومية (vector). صندوق بحث واحد يمكنه خدمة جميع نوايا المستخدم الثلاث.

---

## بنى هجينة متعددة الطبقات

التطبيقات الواقعية نادرًا ما تملك سطح بحث واحد. لديها عدة أسطح، كل منها يحتاج إلى شيء مختلف:

| السطح | ما يستعلم عنه المستخدمون | الطبقات الموصى بها |
|---|---|---|
| بحث المدونة / الوثائق | كلمات مفتاحية + مفاهيم | FTS + pgvector (RRF) |
| البحث عن اسم المستخدم / العميل | أسماء مع أخطاء إملائية | `pg_trgm` |
| بحث المنتج | أسماء، أوصاف، "مشابه لـ" | `pg_trgm` + FTS + pgvector |
| كشف التكرار في تذاكر الدعم | "قضايا مشابهة لهذه" | pgvector فقط |
| بحث SKU/طلب داخلي | معرفات دقيقة | فهرس B-tree |
| RAG على قاعدة معرفة كبيرة | أسئلة بلغة طبيعية | pgvector (مستندات مقسمة) |
| "قد يعجبك أيضًا" في التجارة الإلكترونية | سلوك + تشابه دلالي | pgvector |
| الإكمال التلقائي | بادئة، تحمل تسامحًا إملائيًا | `pg_trgm` |

هذه ليست فرضيات. معظم التطبيقات التي تستهلك محتوى كثيف تحتاج إلى سطحين بحثيين على الأقل بأشكال استعلام مختلفة. الإغراء هو اختيار نهج واحد واستخدامه في كل مكان — عادةً البحث المتجهي الآن، لأنه الخيار العصري. هذا يؤدي إلى إنشاء تمثيلات embedding مكلفة لمشكلات كان من الممكن أن يُستَخدم فيها فهرس trigram أسرع، أرخص، وأكثر دقة.

### القاعدة العامة

أضف طبقة عندما تظهر حالة فشل لا تستطيع الطبقة الحالية معالجتها.

- Users complain about typos not matching → add `pg_trgm`
- Users search by concept and miss relevant results → add pgvector
- Users search for exact symbols or codes and get conceptual results instead → add FTS or check if you're over-relying on vector search
- Latency becomes a problem → evaluate pre-filtering, approximate indexes, or a dedicated store

---

## إذا كنت بحاجة إلى مخزن متجه مخصص

يتعامل pgvector مع الكثير من بحث التطبيقات قبل أن تحتاج إلى قاعدة بيانات أخرى. يعتمد الحد التقريبي على عدد المتجهات، إعدادات الفهرس، معدل الكتابة، الفلاتر، العتاد، والتزامن، لذا اعتبر أي قاعدة “أقل من 10 مليون متجه” مجرد افتراض مبدئي للقياس، وليس حدًا للمنتج. عندما تتجاوز ذلك فعليًا — تزامن عالي جدًا، متطلبات زمن استجابة p99 منخفضة جدًا، مليارات المتجهات، أو احتياجات عزل متعددة المستأجرين جدية — يصبح مشهد قواعد البيانات المتجهة المخصصة واسعًا ويستحق الفهم.

### ما تعنيه أعمدة المصفوفة فعليًا

**البحث المختلط** يعني بحث كلمات مفتاحية BM25 وبحث تشابه المتجهات يُنفّذ في استعلام واحد، يُدمج عبر RRF. بدون ذلك، إما تختار وضع بحث واحد أو تدمج استعلامين بنفسك.

**المتجهات المتناثرة** تتجاوز BM25. المتجه المتناثر SPLADE يحتوي على ~30 000 بُعد (واحد لكل مصطلح في المفردات)، ~98 % أصفار. المواقع غير الصفرية تخبرك أي المصطلحات مهمة وكم مقدارها. استعلام “dogs” يوزن أيضاً “canine” و “pet” — دقة على مستوى BM25 مع توسيع المصطلحات داخل فهرس المتجهات. إذا كان هذا العمود خاطئًا، تحتاج إلى طبقة FTS منفصلة لاستعلامات المصطلحات الدقيقة.

```python
# SPLADE: ~30,000 dims, ~60 non-zero — only relevant vocabulary positions fire
def encode_splade(text: str) -> dict:
    tokens = tokenizer(text, return_tensors="pt", truncation=True, max_length=512)
    with torch.no_grad():
        output = model(**tokens)
    vec = torch.log1p(torch.relu(output.logits)).max(dim=1).values.squeeze()
    return {"indices": vec.nonzero().squeeze().tolist(), "values": vec[vec != 0].tolist()}
```

**SQL / شبيهة SQL** تتعلق فعليًا بالفلاتر. البحث المتجه بدون فلاتر هو عرض توضيحي. ما زلت بحاجة إلى نطاق المستأجر، نطاقات التاريخ، الأذونات، وفلاتر الفئات. SQL الكامل (pgvector، LanceDB) يعبر عن ذلك إلى جانب عمليات الانضمام الحالية. قواعد البيانات المصممة خصيصًا تستخدم كائنات فلتر JSON (Qdrant، Pinecone)، لغة استعلام DSL (Elasticsearch، Milvus)، أو GraphQL (Weaviate). كلها تعمل؛ يصبح SQL أكثر جاذبية عندما يزداد تعقيد منطق الفلاتر.

```sql
-- pgvector: vector similarity is just another expression
SELECT id, title, 1 - (embedding <=> $1) AS score
FROM documents
WHERE tenant_id = $2
  AND category = ANY($3::text[])
  AND created_at > NOW() - INTERVAL '90 days'
ORDER BY embedding <=> $1
LIMIT 10;
```

```python
# Qdrant: equivalent filter as a Python object — same result, more ceremony
results = client.query_points(
    collection_name="documents", query=query_embedding,
    query_filter=models.Filter(must=[
        models.FieldCondition(key="tenant_id", match=models.MatchValue(value=tenant_id)),
        models.FieldCondition(key="category",  match=models.MatchAny(any=categories)),
        models.FieldCondition(key="created_at", range=models.DatetimeRange(gte=cutoff)),
    ]),
    limit=10,
)
```

**المتعدد الوسائط الأصلي** يعني أن قاعدة البيانات تُرفق نماذج embedding للمحتوى غير النصي. تُعطيها عنوان صورة خام؛ تتولى تحويلها إلى متجه. معظم القواعد غير معتمدة على embedding — أنت تمتلك خط أنابيب الـ embedding. Marqo و Weaviate (عبر وحدات CLIP/ImageBind) يغلقان هذه الحلقة.

```python
# Marqo: POST raw images, query with text — no external embedding step
mq.index("products").add_documents(
    [{"id": "shoe-001", "image": "https://cdn.example.com/shoes/001.jpg"}],
    tensor_fields=["image"]
)
results = mq.index("products").search(q="lightweight shoes for summer")
# Returns shoe-001 despite zero keyword overlap — CLIP handles the cross-modal match
```

**فهرس قائم على القرص** هو رافعة تكلفة. فهارس HNSW المقيمة في الذاكرة قد تحتاج إلى عدة جيجابايت من RAM لكل مليون متجه بأبعاد 1536 عندما تُحسب المتجهات الخام، وإجهاد الرسم البياني، والبيانات الوصفية. البدائل القائمة على القرص (Milvus DiskANN، Elasticsearch DiskBBQ، صيغة Lance في LanceDB، طبقة التخزين الكائني في Turbopuffer) غالبًا ما تُقايض بعض زمن الاستجابة مقابل خفض تكلفة البنية التحتية. لأعباء عمل RAG حيث يهيمن زمن نموذج الـ inference بالفعل، غالبًا ما يكون هذا التبادل جديرًا بالقياس.

**الحد الأقصى للأبعاد** هو ترحيل مخفي في بنية نظامك. `text-embedding-3-large` يستخدم 3072 بُعدًا، Jina v3 يمكنه إنتاج embeddings أكبر، والنماذج البحثية تستمر في دفع الأبعاد أعلى. بعض الخدمات المدارة تنشر حدودًا صريحة للأبعاد؛ أخرى توثق حدودًا عالية أو لا حد عملي للنماذج الشائعة. تحقق من الوثائق الحالية قبل الالتزام. اختر شيئًا يترك مساحة للنمو؛ ترحيل فهرس المتجهات لأنك وصلت إلى سقف الأبعاد هو سباق مؤلم.

### المشهد

| Database | Deployment | License | Hybrid Search | Sparse Vectors | SQL / SQL-like | Multimodal | Disk Index | Max Dims | Sweet Spot |
|---|---|---|---|---|---|---|---|---|---|
| **[pgvector](https://github.com/pgvector/pgvector)** | Self-host / managed (Supabase, Neon, RDS) | OSS (PostgreSQL) | Manual (RRF via SQL) | ❌ | ✅ Full SQL | ❌ | ✅ HNSW on disk | 16,000 storage; 2,000 indexed `vector` | Already on Postgres; moderate vector counts |
| **[Qdrant](https://github.com/qdrant/qdrant)** | Self-host / Cloud | Apache 2.0 | ✅ Native BM25 | ✅ Mature support | ❌ (REST/gRPC) | ❌ | ✅ | 65,535 | Filtered queries at scale; complex metadata |
| **[Weaviate](https://github.com/weaviate/weaviate)** | Self-host / Cloud | BSD 3 | ✅ Native BM25 + RRF | ✅ | ❌ (GraphQL / gRPC) | ✅ via modules | ✅ | 65,535 | GraphQL access patterns; built-in vectorization |
| **[Pinecone](https://www.pinecone.io/)** | Cloud only | Proprietary | ✅ (added 2024) | ✅ | ❌ | ❌ | ✅ (serverless) | 20,000 | Managed simplicity; no ops team |
| **[Milvus](https://github.com/milvus-io/milvus) / [Zilliz](https://zilliz.com/)** | Self-host / Cloud (Zilliz) | Apache 2.0 | ✅ Native | ✅ | ✅ SQL-like (Milvus Query Language) | ✅ | ✅ DiskANN | 32,768 | Billion-scale; enterprise on-prem |
| **[Chroma](https://github.com/chroma-core/chroma)** | Embedded / self-host | Apache 2.0 | ❌ | ❌ | ❌ | ❌ | ❌ | 65,535 | Local dev and prototyping only |
| **[LanceDB](https://github.com/lancedb/lancedb)** | Embedded / Cloud | Apache 2.0 | ✅ | ❌ | ✅ SQL via DataFusion | ✅ Native | ✅ (Lance format) | Unlimited | Edge / serverless; multimodal lakehouse |
| **[Orama](https://github.com/oramasearch/orama)** | Embedded / Cloud | Apache 2.0 | ✅ Full-text + vector | ❌ | ❌ | ❌ | ❌ | Varies | JS/edge apps; lightweight site/app search |
| **[Turbopuffer](https://turbopuffer.com/)** | Cloud only (serverless) | Proprietary | ✅ BM25 + vector | ❌ | ❌ | ❌ | ✅ (object storage) | 16,000 | Multi-tenant SaaS; millions of namespaces |
| **[Elasticsearch](https://github.com/elastic/elasticsearch)** | Self-host / Elastic Cloud | SSPL / AGPLv3 | ✅ RRF + ELSER sparse | ✅ (ELSER) | ✅ Query DSL | ❌ | ✅ DiskBBQ | 4,096 | Already on Elastic stack; hybrid enterprise search |
| **[OpenSearch](https://github.com/opensearch-project/OpenSearch)** | Self-host / AWS managed | Apache 2.0 | ✅ RRF + Neural Search | ✅ | ✅ Query DSL | ❌ | ✅ FAISS + HNSW | 16,000 | AWS-native; open-source Elastic alternative |
| **[Vespa](https://github.com/vespa-engine/vespa)** | Self-host / Cloud | Apache 2.0 | ✅ Native | ✅ Tensors / lexical ranking | ✅ YQL | ✅ Tensors | ✅ | Effectively unbounded | Search + ranking + recommendation systems |
| **[ClickHouse](https://github.com/ClickHouse/ClickHouse)** | Self-host / Cloud | Apache 2.0 | Manual | ❌ | ✅ Full SQL | ❌ | ✅ Columnar + HNSW | Varies | Analytics/logs with vector search beside OLAP |
| **[MongoDB Atlas](https://github.com/mongodb/mongo)** | Cloud / self-host | SSPL | ✅ Built-in | ❌ | ✅ MQL + aggregation | ❌ | ✅ HNSW | 8,192 | Already on MongoDB; document + vector in one |
| **[Redis (VSS)](https://github.com/redis/redis)** | Self-host / Redis Cloud | RSALv2 / SSPL | ✅ (RediSearch) | ✅ | ❌ | ❌ | ❌ RAM-only | 32,768 | Ultra-low latency; cache-layer vector search |
| **[Marqo](https://github.com/marqo-ai/marqo)** | Cloud / self-host | Apache 2.0 | ✅ | ❌ | ❌ | ✅ Native focus | ✅ | Varies | End-to-end multimodal: image + text + video |

### بعض الأشياء التي لا تتناسب مع الجدول

**تعدد المستأجرين في Turbopuffer** مبني حول عدد كبير جدًا من المساحات الاسمية. يبرز تموضعه العام وقصص العملاء أحمالًا مثل مجموعة Notion الضخمة ذات المساحات الاسمية الكثيفة. إذا كان كل مستخدم أو مؤسسة تحتاج إلى بحث متجه معزول، يمكن لهذا الهيكل تغيير الاقتصاديات، لكن لا يزال من الضروري قياس شكل المستأجر الخاص بك.

**وضع LanceDB المدمج** هو أقرب شيء إلى “SQLite للبحث المتجه”. يعمل داخل العملية، لا يحتاج خادم، ويعمل في Lambda، Cloudflare Workers، وبيئات الحافة. صيغة Lance العمودية تجعل التشغيل المدمج عمليًا على نطاق حقيقي.

**Chroma أقوى في التطوير/الاختبار والنشر الصغير للتطبيقات.** إذا كنت تستهدف مجموعات بيانات ضخمة جدًا، أو HA، أو تشغيل كثيف على القرص، أو بحث مختلط من الدرجة الأولى، قيّم مخزنًا موجهًا للإنتاج قبل ترقية النموذج إلى البنية التحتية.

**Vespa هو ما تلجأ إليه عندما يكون الاسترجاع مجرد نصف المنتج.** يجمع بين الاسترجاع اللغوي، البحث عن أقرب الجيران، الـ tensors، تعبيرات الترتيب، التجميع، والخدمة عبر الإنترنت. هذه القوة حقيقية، لكن تعقيد العمليات والنمذجة كذلك. يناسب فرق البحث/التوصية أكثر من “إضافة بحث دلالي إلى تطبيق CRUD الخاص بي”.

**ClickHouse ينتمي إلىالحديث عندما يكون البحث مرتبطًا بالتحليلات.** إذا كان مصدر الحقيقة لديك هو الأحداث أو السجلات أو الآثار أو المقاييس، فإن ClickHouse يحتفظ بمسافة المتجه، والتصفية، والتجميع، وفهرسة النص الكامل الجادة—all في محرك SQL واحد. ليس قاعدة بيانات متجهة مخصصة، لكنه غالبًا ما يكون الإجابة “المملة‑الصحيحة” للاسترجاع التحليلي.

**المتجهات المتناثرة هي الطريقة التي تحصل بها على مطابقة كلمات مفتاحية بجودة BM25 داخل فهرس المتجه** — دون تشغيل محرك نص كامل منفصل. Qdrant و Elasticsearch لديهما تطبيقات ناضجة جدًا هنا. إذا كان البحث المختلط أمرًا حاسمًا وكان بنية نظامين عائقًا، فإن دعم المتجهات المتناثرة هو ما يجب البحث عنه.

### اختيار الوقت الذي تجاوزت فيه قدرات pgvector

- **منتج SaaS مع عزل لكل مستأجر** → Turbopuffer  
- **تصفية بيانات وصفية معقدة على نطاق واسع** → Qdrant  
- **موجود بالفعل على مجموعة Elastic/ELK** → Elasticsearch مع DiskBBQ  
- **متجر AWS يرغب في مفتوح المصدر** → OpenSearch  
- **منصة بحث/توصية مع احتياجات ترتيب جادة** → Vespa  
- **تحليلات، مراقبة، بحث في السجلات/الأحداث** → ClickHouse  
- **مقياس المليار على البنية التحتية / ذاتية الاستضافة** → Milvus  
- **حافة / خالية من الخوادم / متعددة الوسائط** → LanceDB  
- **تطبيق JS صغير، موقع وثائق، أو تجربة بحث أصلية على الحافة** → Orama  
- **صفر عمليات، التكلفة ثانوية** → Pinecone  
- **متعدد الوسائط أولاً (صور، فيديو، صوت)** → Marqo  
- **موجود بالفعل على MongoDB** → Atlas Vector Search  
- **موجود بالفعل على Postgres، وتحتاج مساحة أكبر** → Supabase Vector أو Neon (كلاهما pgvector مُدار، مع أدوات أفضل)

---

## الشيء الوحيد الذي يجب عدم فعله

لا تستخدم البحث المتجه كبحث نصي غير دقيق للأشياء التي لها إجابات صحيحة.

"اعثر على المستخدم بالبريد الإلكتروني `dan@example.com`" ليس مشكلة بحث متجه. "اعثر على الطلب بالمعرف `ORD-12345`" ليس كذلك أيضًا. تضمين `ORD-12345` والبحث باستخدام تشابه جيبي سيعيد *شيئًا* — لكنه قد يكون خاطئًا. للمعرف إجابة صحيحة. المطابقة التقريبية لمعرف هي عيب.

البحث المتجه يعيد *الأكثر تشابهًا* في مجموعة البيانات الخاصة بك، حتى عندما لا يكون هناك شيء ذي صلة فعلًا. لا يعرف متى لا توجد إجابة جيدة. هذا مقبول للوثائق ذات الصلة. لكنه مشكلة جدية للبحث عن سجل دقيق، حيث أن إجابة خاطئة بثقة أسوأ من نتيجة فارغة.

ينطبق نفس المبدأ في الاتجاه المعاكس: لا تستخدم FTS للاستعلامات التي يصف فيها المستخدم مفهومًا. "مقالات عن اتخاذ قرارات صعبة تحت عدم اليقين" لا تحتوي على كلمات مفتاحية موثوقة. سيعيد FTS إما ضجيجًا أو لا شيء. استخدم الأداة الصحيحة لشكل الاستعلام.

---

## الصورة الكاملة

معظم أنظمة البحث الإنتاجية تحتاج إلى أكثر من طبقة واحدة:

- **`pg_trgm`** للأسماء، الأخطاء المطبعية، الإكمال التلقائي  
- **FTS / `pg_search`** للبحث النصي القائم على الكلمات المفتاحية  
- **pgvector** للاستعلامات الدلالية والمفهومية  
- **دمج RRF** للأسطح التي يخلط فيها المستخدمون أنواع الاستعلامات  
- **الفهارس العادية** للمعرفات الدقيقة، الفلاتر، والقوائم المرتبة  

هذه ليست أدوات متنافسة. إنها مكملة. نظام بحث مبني جيدًا يختار الطبقة المناسبة لكل شكل استعلام — وعندما تتقاطع أشكال الاستعلام، يشغل عدة طبقات ويدمج النتائج.

الفرق التي تُطلق ميزات بحث جيدة تفهم كامل المكدس. التي لا تفعل ذلك تلجأ إلى قاعدة بيانات متجهة، تُضمّن كل شيء، وتتساءل لماذا تُعيد عمليات البحث الدقيقة أحيانًا السجل الخاطئ.
````
