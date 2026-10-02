# Translation Candidate
- Slug: semantic-vector-search-landscape
- Locale: hi
- Model: openrouter/deepseek/deepseek-v4.1-flash
- Target: src/content/posts/2026-05-01--semantic-vector-search-landscape/hi/index.mdx
- Validation: rejected: direct AI SDK translation failed
- Runtime seconds: 107.04
- Input tokens: 12797
- Output tokens: 42140
- Thinking tokens: unknown
- Cached input tokens: 3584
- Cache write tokens: 0
- Estimated cost: $0.031797
- Pricing source: openrouter-2026-10-02
- Note: Command failed: bun run i18n:validate --slug semantic-vector-search-landscape --locale hi --skip-global (code 1)
## Raw Output

````mdx
---
title: सिमैंटिक वेक्टर सर्च और दोस्त व प्रेमी जीतने के अन्य विषय
subTitle: >-
  संपूर्ण सर्च परिदृश्य: exact, fuzzy, semantic, hybrid — और इन सभी को कब परतों
  में इस्तेमाल करना है।
modified: '2026-10-02'
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
sourceHash: 16001f2ff247
---
## वेक्टर सर्च परिदृश्य: 16 विकल्पों की तुलना करें

डिप्लॉयमेंट, लाइसेंसिंग, सर्च क्षमताओं, और वर्कलोड फिट की तुलना करें। कॉलम के स्पष्टीकरण और SQL उदाहरण नीचे दिए गए हैं।

[इस तुलना को कैसे पढ़ें](#इस-तुलना-को-कैसे-पढ़ें)

| डेटाबेस | डिप्लॉयमेंट | लाइसेंस | हाइब्रिड सर्च | स्पार्स वेक्टर्स | क्वेरी इंटरफ़ेस | बिल्ट-इन मल्टीमॉडल एम्बेडिंग | डिस्क इंडेक्स | वेक्टर डाइमेंशन सीमाएँ | बेस्ट फिट |
|---|---|---|---|---|---|---|---|---|---|
| **[pgvector](https://github.com/pgvector/pgvector)** | सेल्फ-होस्ट / मैनेज्ड (Supabase, Neon, RDS) | OSS (PostgreSQL) | मैनुअल (SQL के माध्यम से RRF) | ❌ | ✅ पूर्ण SQL | ❌ | ✅ डिस्क पर HNSW | 16,000 स्टोरेज; 2,000 इंडेक्स्ड `vector` | पहले से Postgres पर; मध्यम वेक्टर संख्या |
| **[Qdrant](https://github.com/qdrant/qdrant)** | सेल्फ-होस्ट / क्लाउड | Apache 2.0 | ✅ नेटिव BM25 | ✅ परिपक्व समर्थन | ❌ (REST/gRPC) | ❌ | ✅ | 65,535 | स्केल पर फ़िल्टर की गई क्वेरी; जटिल मेटाडेटा |
| **[Weaviate](https://github.com/weaviate/weaviate)** | सेल्फ-होस्ट / क्लाउड | BSD 3 | ✅ नेटिव BM25 + RRF | ✅ | ❌ (GraphQL / gRPC) | ✅ मॉड्यूल के माध्यम से | ✅ | 65,535 | GraphQL एक्सेस पैटर्न; बिल्ट-इन वेक्टराइज़ेशन |
| **[Pinecone](https://www.pinecone.io/)** | केवल क्लाउड | प्रोप्राइटरी | ✅ (2024 में जोड़ा गया) | ✅ | ❌ | ❌ | ✅ (सर्वरलेस) | 20,000 | प्रबंधित सरलता; कोई ऑप्स टीम नहीं |
| **[Milvus](https://github.com/milvus-io/milvus) / [Zilliz](https://zilliz.com/)** | सेल्फ-होस्ट / क्लाउड (Zilliz) | Apache 2.0 | ✅ नेटिव | ✅ | ✅ SQL-जैसा (Milvus Query Language) | ✅ | ✅ DiskANN | 32,768 | बिलियन-स्केल; एंटरप्राइज़ ऑन-प्रेम |
| **[Chroma](https://github.com/chroma-core/chroma)** | एम्बेडेड / सेल्फ-होस्ट | Apache 2.0 | ❌ | ❌ | ❌ | ❌ | ❌ | 65,535 | केवल लोकल डेव और प्रोटोटाइपिंग |
| **[LanceDB](https://github.com/lancedb/lancedb)** | एम्बेडेड / क्लाउड | Apache 2.0 | ✅ | ❌ | ✅ DataFusion के माध्यम से SQL | ✅ नेटिव | ✅ (Lance फॉर्मेट) | असीमित | एज / सर्वरलेस; मल्टीमॉडल लेकहाउस |
| **[Orama](https://github.com/oramasearch/orama)** | एम्बेडेड / क्लाउड | Apache 2.0 | ✅ फुल-टेक्स्ट + वेक्टर | ❌ | ❌ | ❌ | ❌ | भिन्न | JS/एज ऐप्स; हल्का साइट/ऐप सर्च |
| **[Turbopuffer](https://turbopuffer.com/)** | केवल क्लाउड (सर्वरलेस) | प्रोप्राइटरी | ✅ BM25 + वेक्टर | ❌ | ❌ | ❌ | ✅ (ऑब्जेक्ट स्टोरेज) | 16,000 | मल्टी-टेनेंट SaaS; लाखों नेमस्पेस |
| **[Elasticsearch](https://github.com/elastic/elasticsearch)** | सेल्फ-होस्ट / Elastic Cloud | SSPL / AGPLv3 | ✅ RRF + ELSER स्पार्स | ✅ (ELSER) | ✅ Query DSL | ❌ | ✅ DiskBBQ | 4,096 | पहले से Elastic स्टैक पर; हाइब्रिड एंटरप्राइज़ सर्च |
| **[OpenSearch](https://github.com/opensearch-project/OpenSearch)** | सेल्फ-होस्ट / AWS मैनेज्ड | Apache 2.0 | ✅ RRF + न्यूरल सर्च | ✅ | ✅ Query DSL | ❌ | ✅ FAISS + HNSW | 16,000 | AWS-नेटिव; ओपन-सोर्स Elastic विकल्प |
| **[Vespa](https://github.com/vespa-engine/vespa)** | सेल्फ-होस्ट / क्लाउड | Apache 2.0 | ✅ नेटिव | ✅ टेंसर्स / लेक्सिकल रैंकिंग | ✅ YQL | ✅ टेंसर्स | ✅ | प्रभावी रूप से असीमित | सर्च + रैंकिंग + सिफारिश प्रणाली |
| **[ClickHouse](https://github.com/ClickHouse/ClickHouse)** | सेल्फ-होस्ट / क्लाउड | Apache 

**RRF (Reciprocal Rank Fusion)** — कई रिट्रीवल सिस्टम्स की रैंक्ड रिज़ल्ट लिस्ट्स को मर्ज करने का एल्गोरिदम। सिर्फ़ रैंक पोज़िशन इस्तेमाल करता है — स्कोर नॉर्मलाइज़ेशन की ज़रूरत नहीं। जो रिज़ल्ट FTS और vector दोनों लिस्ट्स में ऊँची रैंक पाता है, उसका कंबाइंड स्कोर उस रिज़ल्ट से मज़बूत होता है जो सिर्फ़ एक में टॉप करता है।

---

## एम्बेडिंग्स संबंधित कंटेंट कैसे ढूँढती हैं

Vector embeddings टेक्स्ट (या इमेज, ऑडियो, आदि) को नंबर्स की लिस्ट में बदलती हैं — high-dimensional space में एक बिंदु। एक embedding model ऐसे ट्रेन किया जाता है कि semantically related टेक्स्ट उस space में पास-पास आ जाए। "Dog" और "canine" करीब पहुँचते हैं। "Running a marathon" और "running a Python script" एक शब्द साझा करने के बावजूद बहुत दूर पहुँचते हैं।

उस space में similarity search उन documents को ढूँढती है जिनका *meaning* query के meaning के सबसे करीब है, चाहे exact शब्दों का overlap हो या न हो।

इसका मतलब:
- "मैं request timeouts कैसे कॉन्फ़िगर करूँ?" can match "Setting connection limits and retry policies" शीर्षक वाला article — कोई overlapping keywords नहीं, high conceptual relevance
- "गर्मी की शाम के लिए कुछ हल्का" can match wine recommendation without any keywords appearing in the product description
- अंग्रेज़ी में query फ़्रेंच, स्पैनिश, या जापानी के relevant documents से match कर सकती है अगर embedding model multilingual ट्रेन किया गया हो

Lexical search (`tsvector`, `pg_trgm`) यह सब नहीं कर सकती। यह शब्दों और characters पर काम करती है, meaning पर नहीं। ये tools एक-दूसरे के विकल्प नहीं हैं — ये अलग-अलग समस्याएँ हल करते हैं।

---

## pgvector कब जीतता है

**RAG बनाना।** Retrieval-Augmented Generation उन document chunks को retrieve करता है जिनका meaning user के question के सबसे करीब है, फिर उन्हें context के तौर पर language model को pass करता है। यह retrieval step एक vector operation है। FTS paraphrases, synonyms, और conceptual matches को miss कर देगा जिन्हें कोई relevant chunk अलग तरीके से व्यक्त कर सकता है। standalone vector store के मुकाबले pgvector का फ़ायदा: यह आपके मौजूदा Postgres instance के अंदर चलता है — deploy, operate, या data sync करने के लिए अलग service नहीं चाहिए।

**Users बताते हैं कि उन्हें क्या चाहिए, यह नहीं कि क्या search करना है।** "Articles about building confidence as a new manager" में ऐसे keywords नहीं हैं जो relevant posts में भरोसे के साथ आते हों। "A lightweight framework for handling side effects" documentation में शायद वही exact शब्द इस्तेमाल न करे। Vector search intent से match करती है, spelling से नहीं।

**समान items ढूँढना।** Related products, similar support tickets, duplicate bug reports, articles you might also like। "Find issues similar to this one" एक nearest-neighbor search है — item को embed करें, उसके geometric neighbors ढूँढें। एक ज़रूरी caveat: vector search हमेशा results लौटाती है, भले ही कुछ भी genuinely similar न हो। Dedup और recommendation use cases के लिए, minimum similarity threshold (जैसे cosine similarity ≥ 0.80) से filter करें ताकि low-confidence matches को meaningful बताकर सामने न रखा जाए।

**Semantic deduplication।** RAG या search के लिए content index करने से पहले, आपको अक्सर corpus में near-duplicates पहचानने पड़ते हैं — कई बार revised articles, दो बार filed support tickets, significantly overlap करती knowledge base entries। Documents को embed करें और cosine similarity से threshold-filter करें ताकि near-duplicates को index खराब करने से पहले flag या merge किया जा सके। इससे retrieval कई near-identical chunks लौटाकर context window को dilute नहीं करता।

**Multilingual search।** Multilingual embedding models अलग-अलग भाषाओं के semantically equivalent content को पास-पास vectors में map करते हैं। "perder peso" के लिए Spanish में query "sustainable weight loss habits" पर English article से match कर सकती है — कोई shared tokens नहीं, वही underlying meaning। FTS को per-language dictionary configuration चाहिए और cross-language queries को खराब तरीके से handle करता है। `pg_trgm` language-agnostic है लेकिन orthographic, semantic नहीं।

### pgvector सेट अप करना

Extension install से similarity query तक, setup कुछ SQL statements का है:

```sql
CREATE EXTENSION IF NOT EXISTS vector;

ALTER TABLE documents ADD COLUMN embedding vector(1536);

-- HNSW is usually the first index to try for moderate-size datasets
CREATE INDEX documents_embedding_idx
  ON documents USING hnsw (embedding vector_cosine_ops);

-- Semantic search query
SELECT id, title, 1 - (embedding <=> $1::vector) AS similarity
FROM documents
ORDER BY embedding <=> $1::vector
LIMIT 10;
```

`<=>` cosine distance है। `1 - cosine_distance` cosine similarity देता है (1.0 = identical, 0.0 = orthogonal)। `ivfflat` (पुराना, जल्दी बनने वाला alternative) के लिए, शुरुआत के तौर पर `lists = sqrt(row_count)` इस्तेमाल करें।

### Vector Search गलत जवाब कहाँ देती है

- सटीक टोकन मिलान — प्रोडक्ट SKU, एरर कोड, फ़ंक्शन नाम। `ORD-12345` किसी भी चीज़ से सिमेंटिक रूप से समान नहीं है। एम्बेडिंग-आधारित सर्च `ORD-12344` या कुछ भी प्रासंगिक नहीं लौटा सकती। FTS या B-tree इंडेक्स इस्तेमाल करें।
- नाम और प्रॉपर नाउन। एम्बेडिंग स्पेस अर्थ के आधार पर व्यवस्थित होता है, स्पेलिंग के आधार पर नहीं। "Micheal Jordan" वाला यूज़र रिकॉर्ड ज़रूरी नहीं कि वेक्टर स्पेस में "Michael Jordan" के पास पड़े।
- छोटी स्ट्रिंग्स जहाँ अर्थ से ज़्यादा कैरेक्टर-लेवल समानता मायने रखती है। `pg_trgm` इसे संभालता है।
- ऐसी क्वेरीज़ जहाँ सटीक टर्म का मौजूद होना ज़रूरी है। ज्ञात-टर्म मिलान के लिए BM25 और FTS ज़्यादा भरोसेमंद हैं।

---

## मिश्रित क्वेरीज़ के लिए कीवर्ड और वेक्टर को संयोजित करें

तकनीकी डॉक्युमेंटेशन सबसे साफ़ उदाहरण है जहाँ अकेले कोई भी टूल काफ़ी नहीं है।

"how to configure timeouts" खोजने वाले यूज़र्स को कॉन्सेप्चुअल मिलान चाहिए: "Setting retry policies and connection limits" शीर्षक वाले आर्टिकल में कोई ओवरलैपिंग कीवर्ड नहीं है, लेकिन वही उन्हें चाहिए।

यही यूज़र्स `withRetry()`, `ECONNRESET`, और `ERR_SOCKET_TIMEOUT` भी खोजते हैं। ये सटीक स्ट्रिंग्स मौजूद होनी चाहिए — सिमेंटिक मिलान उन्हें भरोसे से नहीं ढूँढ पा सकता, और एक फ़ॉल्स पॉज़िटिव (कॉन्सेप्चुअली समान लेकिन सही API नहीं) सक्रिय रूप से भ्रमित करता है।

वेक्टर सर्च कॉन्सेप्चुअल क्वेरीज़ संभालती है। FTS सटीक टर्म्स संभालता है। अकेले कोई भी दोनों को अच्छे से नहीं संभालता।

समाधान हाइब्रिड सर्च है: दोनों चलाएँ और परिणामों को फ्यूज़ करें।

### RRF के साथ रैंक किए गए परिणामों को मर्ज करें

**Reciprocal Rank Fusion (RRF)** अलग-अलग रिट्रीवल सिस्टम्स की रैंक की गई लिस्ट्स को जोड़ने का मानक एल्गोरिदम है। इसके लिए सिस्टम्स के बीच स्कोर नॉर्मलाइज़ करने की ज़रूरत नहीं — यह सिर्फ़ रैंक पोज़िशन्स इस्तेमाल करता है। जो परिणाम *दोनों* लिस्ट्स में ऊपर आता है, उसे उस परिणाम से ज़्यादा मज़बूत संयुक्त स्कोर मिलता है जो सिर्फ़ एक में हावी है।

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

हरिन में `60` RRF कॉन्स्टेंट है। ज़्यादा वैल्यू रैंक-पोज़िशन अंतरों को दबाती हैं; कम वैल्यू उन्हें बढ़ाती हैं। डिफ़ॉल्ट 60 ज़्यादातर कंटेंट प्रकारों में अच्छा काम करता है।

RRF `ts_rank` (एक लॉग-फ़्रीक्वेंसी स्कोर) को cosine distance (एक ज्यामितीय माप) के खिलाफ़ नॉर्मलाइज़ करने की कठिन समस्या से बचता है। ये तुलनीय नहीं हैं। RRF सिर्फ़ पूछता है: "यह परिणाम हर लिस्ट में कितना ऊपर आया?"

### टाइपो और नामों के लिए ट्राइग्राम जोड़ें

मिश्रित कंटेंट पर यूज़र-फेसिंग सर्च के लिए — जहाँ यूज़र्स एक ही सेशन में किसी व्यक्ति का नाम, कोई कॉन्सेप्ट, या कोई सटीक टर्म खोज सकते हैं — तीन-तरफ़ा फ्यूज़न इन सबको संभालता है:

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

यह संभालता है: फ़ज़ी नाम मिलान (ट्राइग्राम), सटीक कीवर्ड मिलान (FTS), और कॉन्सेप्चुअल क्वेरीज़ (वेक्टर)। एक ही सर्च बॉक्स तीनों यूज़र इरादों की सेवा कर सकता है।

---

## प्रत्येक सर्च सरफेस को उसके क्वेरी प्रकारों से मिलाएँ

असली एप्लिकेशन्स में शायद ही कभी एक ही सर्च सरफेस होता है। उनके पास कई होते हैं, हर एक की अलग ज़रूरत होती है:

| सर्फ़ेस | यूज़र्स क्या क्वेरी करते हैं | सुझाई गई लेयर्स |
|---|---|---|
| ब्लॉग / डॉक्युमेंटेशन सर्च | कीवर्ड + कॉन्सेप्ट | FTS + pgvector (RRF) |
| यूज़र/कस्टमर नाम लुकअप | टाइपो वाले नाम | `pg_trgm` |
| प्रोडक्ट सर्च | नाम, विवरण, "इसके जैसा" | `pg_trgm` + FTS + pgvector |
| सपोर्ट टिकट डीडुप | "इससे मिलते-जुलते इश्यू" | केवल pgvector |
| आंतरिक SKU/ऑर्डर सर्च | सटीक पहचानकर्ता | B-tree इंडेक्स |
| बड़े नॉलेज बेस पर RAG | प्राकृतिक भाषा के प्रश्न | pgvector (चंक्ड दस्तावेज़) |
| ई-कॉमर्स "आपको यह भी पसंद आ सकता है" | व्यवहारिक + सिमेंटिक समानता | pgvector |
| ऑटोकम्पलीट | प्रीफ़िक्स, वर्तनी-सहिष्णु | `pg_trgm` |

ये काल्पनिक नहीं हैं। ज़्यादातर कंटेंट-भारी एप्लिकेशन्स को अलग-अलग क्वेरी शेप वाले कम से कम दो अलग सर्च सरफेस चाहिए। लालच यह होता है कि एक अप्रोच चुनकर हर जगह वही इस्तेमाल करें — अब आम तौर पर वेक्टर सर्च, क्योंकि यह फ़ैशनेबल चॉइस है। इससे ऐसी समस्याओं के लिए महँगे एम्बेडिंग्स बनते हैं जहाँ ट्राइग्राम इंडेक्स तेज़, सस्ता और ज़्यादा सही होता।

### जब कोई क्वेरी प्रकार फेल हो तब सर्च लेयर जोड़ें

जब ऐसा फेल्योर मोड दिखे जिसे मौजूदा लेयर ठीक नहीं कर सकती, तब लेयर जोड़ें:

- यूज़र्स टाइपो मैच न होने की शिकायत करें → `pg_trgm` जोड़ें
- यूज़र्स कॉन्सेप्ट से सर्च करें और प्रासंगिक नतीजे छूट जाएँ → pgvector जोड़ें
- यूज़र्स सटीक सिंबल या कोड सर्च करें और उलटे कॉन्सेप्चुअल नतीजे मिलें → FTS जोड़ें या जाँचें कि आप वेक्टर सर्च पर ज़रूरत से ज़्यादा निर्भर तो नहीं
- लेटेंसी समस्या बने → प्री-फ़िल्टरिंग, अप्रॉक्सिमेट इंडेक्स, या समर्पित स्टोर पर विचार करें

---

## pgvector से आगे कब बढ़ें

pgvector किसी दूसरे डेटाबेस की ज़रूरत पड़ने से पहले बहुत सारा एप्लिकेशन सर्च संभाल लेता है। मोटा कटऑफ़ वेक्टर काउंट, इंडेक्स सेटिंग्स, राइट रेट, फ़िल्टर, हार्डवेयर और कॉन्करेंसी पर निर्भर करता है, इसलिए किसी भी "under 10M vectors" नियम को प्रोडक्ट लिमिट नहीं, बल्कि बेंचमार्क करने के लिए शुरुआती अनुमान मानें। जब आप सचमुच इससे आगे बढ़ जाएँ — बहुत ज़्यादा कॉन्करेंसी, बहुत कम p99 लेटेंसी की ज़रूरतें, अरबों वेक्टर, या गंभीर मल्टी-टेनेंट आइसोलेशन की ज़रूरतें — तो समर्पित वेक्टर डेटाबेस का परिदृश्य काफ़ी चौड़ा है और समझने लायक है।

### तुलना को कैसे पढ़ें

**हाइब्रिड सर्च** का मतलब है कि BM25 कीवर्ड सर्च और वेक्टर समानता एक ही क्वेरी में चलें, और RRF से मर्ज हों। इसके बिना, आप या तो एक सर्च मोड चुनते हैं या दो क्वेरीज़ खुद फ्यूज़ करते हैं।

**स्पार्स वेक्टर्स** BM25 से आगे जाते हैं। एक SPLADE स्पार्स वेक्टर में ~30,000 डाइमेंशन्स होते हैं (हर वोकैबुलरी टर्म के लिए एक), ~98% ज़ीरो। नॉन-ज़ीरो पोज़िशन्स बताती हैं कि कौन-से टर्म मायने रखते हैं और कितना। "dogs" की क्वेरी "canine" और "pet" को भी वेट देती है — BM25-स्तर की प्रिसीज़न प्लस वेक्टर इंडेक्स के अंदर टर्म एक्सपैंशन। अगर यह कॉलम false है, तो सटीक-टर्म क्वेरीज़ के लिए आपको अलग FTS लेयर चाहिए।

```python
# SPLADE: ~30,000 dims, ~60 non-zero — only relevant vocabulary positions fire
def encode_splade(text: str) -> dict:
    tokens = tokenizer(text, return_tensors="pt", truncation=True, max_length=512)
    with torch.no_grad():
        output = model(**tokens)
    vec = torch.log1p(torch.relu(output.logits)).max(dim=1).values.squeeze()
    return {"indices": vec.nonzero().squeeze().tolist(), "values": vec[vec != 0].tolist()}
```

**SQL / SQL-like** असल में फ़िल्टरिंग के बारे में है। फ़िल्टरिंग के बिना वेक्टर सर्च एक डेमो है। आपको अब भी टेनेंट स्कोप, डेट रेंज, अनुमतियाँ और कैटेगरी फ़िल्टर चाहिए। पूरा SQL (pgvector, LanceDB) इसे आपके मौजूदा joins के साथ व्यक्त करता है। उद्देश्य-निर्मित डेटाबेस JSON फ़िल्टर ऑब्जेक्ट (Qdrant, Pinecone), क्वेरी DSL (Elasticsearch, Milvus), या GraphQL (Weaviate) इस्तेमाल करते हैं। ये काम करते हैं; जैसे-जैसे फ़िल्टर लॉजिक जटिल होता है, SQL ज़्यादा आकर्षक होता जाता है।

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

**मल्टीमॉडल नेटिव** का मतलब है कि डेटाबेस नॉन-टेक्स्ट कंटेंट के लिए एम्बेडिंग मॉडल्स शिप करता है। आप उसे कच्चा इमेज URL देते हैं; वह वेक्टराइज़ेशन संभालता है। ज़्यादातर डेटाबेस एम्बेडिंग-स्वतंत्र हैं — एम्बेडिंग पाइपलाइन आपकी होती है। Marqo और Weaviate (CLIP/ImageBind मॉड्यूल्स के ज़रिए) इस लूप को बंद करते हैं।

```python
# Marqo: POST raw images, query with text — no external embedding step
mq.index("products").add_documents(
    [{"id": "shoe-001", "image": "https://cdn.example.com/shoes/001.jpg"}],
    tensor_fields=["image"]
)
results = mq.index("products").search(q="lightweight shoes for summer")
# Returns shoe-001 despite zero keyword overlap — CLIP handles the cross-modal match
```

**डिस्क-आधारित इंडेक्स** लागत का लीवर है। RAM-निवासी HNSW इंडेक्स को प्रति दस लाख 1536-डाइमेंशन वेक्टर पर कई GB RAM चाहिए हो सकती है, जब कच्चे वेक्टर, ग्राफ़ ओवरहेड और मेटाडेटा गिन लिए जाएँ। डिस्क-नेटिव विकल्प (Milvus DiskANN, Elasticsearch DiskBBQ, LanceDB का Lance फ़ॉर्मेट, Turbopuffer का ऑब्जेक्ट स्टोरेज टियर) अक्सर कुछ क्वेरी लेटेंसी के बदले कम इन्फ्रास्ट्रक्चर लागत लेते हैं। जिन RAG वर्कलोड्स में मॉडल लेटेंसी पहले से हावी है, वहाँ यह ट्रेडऑफ़ अक्सर बेंचमार्क करने लायक होता है।

**मैक्स डाइमेंशन्स** आपकी आर्किटेक्चर में छिपा एक माइग्रेशन है। `text-embedding-3-large` 3072 डाइम्स इस्तेमाल करता है, Jina v3 बड़े एम्बेडिंग्स निकाल सकता है, और रिसर्च मॉडल्स और ऊपर धकेलते रहते हैं। कुछ मैनेज्ड सर्विसेज़ हार्ड डाइमेंशन कैप बताती हैं; अन्य ऊँचे कैप या आम एम्बेडिंग मॉडल्स के लिए कोई व्यावहारिक कैप नहीं बतातीं। प्रतिबद्ध होने से पहले मौजूदा डॉक्स देखें। कुछ ऐसा चुनें जिसमें हेडरूम हो; डाइमेंशन सीलिंग से टकराने पर वेक्टर इंडेक्स माइग्रेट करना दर्दभरा स्प्रिंट होता है।

### टेबल जो नहीं दिखा सकती वे ऑपरेशनल ट्रेडऑफ़

**Turbopuffer की मल्टी-टेनेंसी** बहुत ऊँचे नेमस्पेस काउंट के इर्द-गिर्द बनी है। इसकी सार्वजनिक पोज़िशनिंग और कस्टमर स्टोरीज़ Notion जैसे बड़े, नेमस्पेस-भारी कॉर्पस वाले वर्कलोड्स पर ज़ोर देती हैं। अगर हर यूज़र या ऑर्गनाइज़ेशन को आइसोलेटेड वेक्टर सर्च चाहिए, तो वह आर्किटेक्चर अर्थशास्त्र बदल सकती है, पर फिर भी अपने टेनेंट शेप को बेंचमार्क करें।

**LanceDB एम्बेडेड मोड** "वेक्टर सर्च के लिए SQLite" के सबसे करीब है। यह इन-प्रोसेस चलता है, सर्वर की ज़रूरत नहीं होती, और Lambda, Cloudflare Workers और एज एनवायरनमेंट्स में काम करता है। Lance कॉलमनर फ़ॉर्मेट एम्बेडेड ऑपरेशन को असली स्केल पर व्यावहारिक बनाता है।

**Chroma डेव/टेस्ट और छोटे ऐप डिप्लॉयमेंट्स के लिए सबसे मजबूत है।** अगर आप बहुत बड़े कॉर्पोरा, HA, डिस्क-हैवी ऑपरेशन, या फर्स्ट-क्लास हाइब्रिड सर्च पर निशाना साध रहे हैं, तो प्रोटोटाइप को इन्फ्रास्ट्रक्चर में प्रोमोट करने से पहले प्रोडक्शन-ओरिएंटेड स्टोर का मूल्यांकन करें।

**Vespa तब चुनें जब रिट्रीवल प्रोडक्ट का आधा हिस्सा ही हो।** यह लेक्सिकल रिट्रीवल, निकटतम-पड़ोसी सर्च, टेंसर, रैंकिंग एक्सप्रेशन, ग्रुपिंग, और ऑनलाइन सर्विंग को जोड़ता है। यह ताकत असली है, लेकिन ऑपरेशनल और मॉडलिंग जटिलता भी उतनी ही असली है। यह सर्च/रिकमेंडेशन टीमों के लिए अधिक उपयुक्त है, न कि "मेरे CRUD ऐप में सेमांटिक सर्च जोड़ें" के लिए।

**ClickHouse तब चर्चा में आता है जब सर्च एनालिटिक्स से जुड़ा हो।** अगर आपका सोर्स ऑफ ट्रुथ इवेंट्स, लॉग्स, ट्रेसेस, या मेट्रिक्स हैं, तो ClickHouse वेक्टर डिस्टेंस, फ़िल्टरिंग, एग्रीगेशन, और गंभीर फुल-टेक्स्ट इंडेक्सिंग को एक ही SQL इंजन में रखता है। यह उद्देश्य-निर्मित वेक्टर डेटाबेस नहीं है, लेकिन अक्सर एनालिटिकल रिट्रीवल के लिए बोरिंग-राइट जवाब होता है।

**स्पार्स वेक्टर्स के ज़रिए आप वेक्टर इंडेक्स के अंदर BM25-क्वालिटी कीवर्ड मैचिंग पा सकते हैं** — बिना अलग फुल-टेक्स्ट इंजन चलाए। Qdrant और Elasticsearch के इम्प्लीमेंटेशन यहाँ विशेष रूप से परिपक्व हैं। अगर हाइब्रिड सर्च महत्वपूर्ण है और दो-सिस्टम आर्किटेक्चर एक डील-ब्रेकर है, तो स्पार्स वेक्टर सपोर्ट ही वह चीज़ है जिसे देखना चाहिए।

### वर्कलोड के अनुसार स्टोर चुनें

- **प्रति-टेनेंट आइसोलेशन वाला SaaS प्रोडक्ट** → Turbopuffer
- **स्केल पर जटिल मेटाडेटा फ़िल्टरिंग** → Qdrant
- **पहले से Elastic/ELK स्टैक पर** → DiskBBQ के साथ Elasticsearch
- **ओपन-सोर्स चाहने वाली AWS शॉप** → OpenSearch
- **गंभीर रैंकिंग ज़रूरतों वाला सर्च/रिकमेंडेशन प्लेटफ़ॉर्म** → Vespa
- **एनालिटिक्स, ऑब्ज़र्वेबिलिटी, लॉग/इवेंट सर्च** → ClickHouse
- **बिलियन-स्केल ऑन-प्रेम / सेल्फ-होस्टेड** → Milvus
- **एज / सर्वरलेस / मल्टीमॉडल** → LanceDB
- **छोटा JS ऐप, डॉक्स साइट, या एज-नेटिव सर्च UX** → Orama
- **ज़ीरो ऑप्स, लागत गौण** → Pinecone
- **मल्टीमॉडल-फर्स्ट (इमेज, वीडियो, ऑडियो)** → Marqo
- **पहले से MongoDB पर** → Atlas Vector Search
- **पहले से Postgres पर, अधिक हेडरूम चाहिए** → Supabase Vector या Neon (दोनों pgvector मैनेज्ड, बेहतर टूलिंग के साथ)

---

## IDs को एम्बेड करके सटीक मैच की उम्मीद न करें

जिन चीज़ों के सही जवाब होते हैं, उनके लिए वेक्टर सर्च को फ़ज़ी टेक्स्ट सर्च की तरह इस्तेमाल न करें।

"मुझे ईमेल `dan@example.com` वाला यूज़र ढूंढो" वेक्टर सर्च की समस्या नहीं है। "ID `ORD-12345` वाला ऑर्डर ढूंढो" भी नहीं है। `ORD-12345` को एम्बेड करके कोसाइन सिमिलैरिटी से सर्च करने पर *कुछ* तो मिलेगा — लेकिन वह गलत हो सकता है। एक आइडेंटिफायर का एक सही जवाब होता है। आइडेंटिफायर पर अनुमानित मैच एक बग है।

वेक्टर सर्च आपके डेटासेट में *सबसे समान* चीज़ लौटाता है, भले ही कुछ भी वास्तव में प्रासंगिक न हो। यह नहीं जानता कि कब कोई अच्छा जवाब मौजूद नहीं है। यह संबंधित दस्तावेज़ों के लिए ठीक है। सटीक रिकॉर्ड लुकअप के लिए यह गंभीर समस्या है, जहाँ एक आत्मविश्वासी गलत जवाब खाली परिणाम से बदतर है।

यही बात दूसरी दिशा में भी लागू होती है: जहाँ उपयोगकर्ता किसी अवधारणा का वर्णन कर रहा हो, वहाँ FTS का उपयोग न करें। "अनिश्चितता के तहत कठिन निर्णय लेने के बारे में लेख" में कोई विश्वसनीय कीवर्ड नहीं है। FTS या तो शोर लौटाएगा या कुछ नहीं। क्वेरी शेप के लिए सही टूल का उपयोग करें।

---

## क्वेरी शेप के आसपास सर्च बनाएं

अधिकांश प्रोडक्शन सर्च सिस्टम्स को एक से अधिक लेयर की आवश्यकता होती है:

- **`pg_trgm`** नाम, टाइपो, ऑटोकम्पलीट के लिए
- **FTS / `pg_search`** कीवर्ड-आधारित प्रोज़ सर्च के लिए
- **pgvector** सेमांटिक और कॉन्सेप्चुअल क्वेरीज़ के लिए
- **RRF फ्यूज़न** उन सरफेस के लिए जहाँ उपयोगकर्ता क्वेरी प्रकार मिलाते हैं
- **रेगुलर इंडेक्स** सटीक आइडेंटिफायर्स, फ़िल्टर्स, और सॉर्टेड लिस्ट्स के लिए

ये प्रतिस्पर्धी टूल्स नहीं हैं। ये पूरक हैं। एक अच्छी तरह से बनाया गया सर्च सिस्टम प्रत्येक क्वेरी शेप के लिए सही लेयर चुनता है — और जब क्वेरी शेप ओवरलैप होते हैं, तो यह कई लेयर्स चलाता है और परिणामों को फ्यूज़ करता है।

जो टीमें अच्छे सर्च फीचर्स शिप करती हैं, वे पूरे स्टैक को समझती हैं। जो नहीं समझतीं, वे वेक्टर डेटाबेस उठाती हैं, सब कुछ एम्बेड करती हैं, और सोचती हैं कि सटीक लुकअप कभी-कभी गलत रिकॉर्ड क्यों लौटाते हैं।
````
