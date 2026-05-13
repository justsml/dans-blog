# Translation Candidate
- Slug: postgres-text-search-guide
- Locale: hi
- Model: openrouter/qwen/qwen3-32b:nitro
- Target: src/content/posts/2026-05-02--postgres-text-search-guide/hi/index.mdx
- Validation: deferred
- Runtime seconds: 193.86
- Input tokens: 18690
- Output tokens: 22908
- Thinking tokens: unknown
- Cached input tokens: 512
- Cache write tokens: 0
- Estimated cost: $0.006993
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
title: Postgres पाठ खोज गाइड 2026
subTitle: ''
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
अधिकांश टीमें एक ही पोस्टग्रेस खोज उपकरण का उपयोग करती हैं। वे टीमें जो तीनों को जानती हैं, अधिक बेहतर खोज के साथ कम जटिलता के साथ लॉन्च करती हैं — और उन विशिष्ट खोज सेवाओं के महंगे रास्ते से बच जाती हैं जिनकी उन्हें अभी तक आवश्यकता नहीं है।

इस मार्गदर्शिका में पोस्टग्रेस-स्वामित्व विकल्पों का पूरा सेट शामिल है: प्रत्येक का कार्य, जब यह सही फिट होता है, और उन्हें कैसे परतबद्ध किया जाए।

---

## तीन उपकरण

**पूर्ण-पाठ खोज** (`tsvector` / `GIN` इंडेक्स) भाषाई है। यह पाठ को लेक्सेम में टॉकनीकरण करता है, उन्हें मूल रूप में लाता है, और प्रश्न को इंडेक्स के साथ मैच करता है। "Running" और "runs" एक ही लेक्सेम में संकुचित हो जाते हैं। "Dog" और "dogs" भी इसी तरह होते हैं। रैंकिंग फंक्शन (`ts_rank`) उन दस्तावेजों को प्रोत्साहित करता है जहां प्रश्न शब्द अक्सर या प्रमुख रूप से प्रकट होते हैं।

**त्रिकोणीय अक्षर** (`pg_trgm`) स्ट्रिंग्स को ओवरलैपिंग 3-अक्षर टुकड़ों में तोड़ देता है और दो स्ट्रिंग्स के बीच साझा टुकड़ों की संख्या मापता है। "Dan" → `" da"`, `"dan"`, `"an "`। "Micheal" और "Michael" अपने अधिकांश त्रिकोणीय अक्षरों को साझा करते हैं, इसलिए समानता उच्च होती है। यह `pg_trgm` को गैर-स्पष्ट नाम मैचिंग, टाइपो टॉलरेंस, और ऑटोकंप्लीट के लिए उत्कृष्ट बनाता है — जहां FTS का प्रदर्शन कमजोर होता है।

**अच्छा मिलान वाले इंडेक्स** (B-tree, hash) प्राथमिक कुंजियाँ, ईमेल पता, IDs, SKUs, और कोई भी जगह नियंत्रित करते हैं जहां उत्तर द्विआधारी होता है: यह मिलान करता है या नहीं। ये "खोज" नहीं लगते, लेकिन इन्हें इस बातचीन में शामिल किया जाता है क्योंकि सबसे खराब पैटर्न अच्छा उत्तर वाले समस्याओं के लिए गैर-स्पष्ट या अर्थपूर्ण खोज का उपयोग करना है।

चुनाव संकीर्णता के बारे में नहीं है। यह प्रश्न के आकार के अनुरूप उपकरण के मिलान के बारे में है।

<figure>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1120 720" role="img" aria-labelledby="stm-title stm-desc">
  <title id="stm-title">Postgres खोज उपकरण मानचित्र</title>
  <desc id="stm-desc">pg_trgm, पूर्ण-पाठ खोज, pgvector, और हाइब्रिड खोज के द्वारा इनपुट आकार और प्रश्न इंटेंट की तुलना।</desc>
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
  <text class="stm-title-text" x="64" y="70">इनपुट आकार द्वारा खोज उपकरण का चयन करें</text>
  <text class="stm-subtitle" x="64" y="103">एक ही Postgres तालिका चारों का समर्थन कर सकती है। ट्रिक पाठ के साथ प्रश्न के मिलान में है।</text>

  <line class="stm-line" x1="560" y1="150" x2="560" y2="640"/>
  <line class="stm-line" x1="76" y1="395" x2="1044" y2="395"/>

  <text class="stm-axis" x="360" y="142">ठीक शब्द महत्वपूर्ण हैं</text>
  <text class="stm-axis" x="650" y="142">अर्थ महत्वपूर्ण हैं</text>
  <text class="stm-axis" x="78" y="388" transform="rotate(-90 78 388)">छोटा / संरचित पाठ</text>
  <text class="stm-axis" x="78" y="628" transform="rotate(-90 78 628)">लंबा निबंध / खंड</text>

  <rect class="stm-card" x="112" y="168" width="408" height="186" rx="20"/>
  <rect x="136" y="192" width="100" height="28" rx="14" fill="#f59e0b"/>
  <text class="stm-label" x="154" y="212">फजी</text>
  <text class="stm-tool" x="136" y="256">pg_trgm</text>
  <text class="stm-body" x="136" y="294">नाम, पता, शीर्षक, टाइपो,</text>
  <text class="stm-body" x="136" y="320">ऑटोकंप्लीट, आंशिक स्ट्रिंग्स।</text>
  <text class="stm-small" x="136" y="344">लिप्यंतर तुलना: वर्ण दूरी।</text>

  <rect class="stm-card" x="600" y="168" width="408" height="186" rx="20"/>
  <rect x="624" y="192" width="116" height="28" rx="14" fill="#22c55e"/>
  <text class="stm-label" x="644" y="212">समान</text>
  <text class="stm-tool" x="624" y="256">pgvector</text>
  <text class="stm-body" x="624" y="294">संबंधित आइटम, डुप्लिकेट टिकट,</text>
  <text class="stm-body" x="624" y="320">लघु विवरण से अनुशंसा।</text>
  <text class="stm-small" x="624" y="344">एम्बेडिंग तुलना: अर्थ दूरी।</text>

  <rect class="stm-card" x="112" y="436" width="408" height="186" rx="20"/>
  <rect x="136" y="460" width="102" height="28" rx="14" fill="#38bdf8"/>
  <text class="stm-label" x="158" y="480">लेक्सिकल</text>
  <text class="stm-tool" x="136" y="524">पूर्ण-पाठ खोज</text>
  <text class="stm-body" x="136" y="562">लेख, दस्तावेज़, लॉग, समर्थन सामग्री</text>
  <text class="stm-body" x="136" y="588">जहां प्रश्न शब्द दिखाई देने चाहिए।</text>
  <text class="stm-small" x="136" y="612">लेक्सीम, स्टेमिंग, रैंकिंग, बूलियन फ़िल्टर।</text>

  <rect class="stm-card" x="600" y="436" width="408" height="186" rx="20"/>
  <rect x="624" y="460" width="102" height="28" rx="14" fill="#f472b6"/>
  <text class="stm-label" x="645" y="480">हाइब्रिड</text>
  <text class="stm-tool" x="624" y="524">FTS + pgvector</text>
  <text class="stm-body" x="624" y="562">तकनीकी दस्तावेज़ और RAG जहां उपयोगकर्ता पूछते हैं</text>
  <text class="stm-body" x="624" y="588">अवधारणात्मक प्रश्न और ठीक संकेतक।</text>
  <text class="stm-small" x="624" y="612">दोनों चलाएं, RRF के साथ रैंक फ़्यूज करें।</text>

  <rect x="396" y="658" width="328" height="36" rx="18" fill="url(#header)"/>
  <text class="stm-chip" x="429" y="681">प्रश्न इंटेंट से शुरू करें, फिर पाठ आकार चेक करें</text>
</svg>
<figcaption>चार Postgres खोज उपकरण जिन्हें प्रश्न इंटेंट (ठीक vs अर्थ) और पाठ आकार (संरचित vs निबंध) द्वारा मानचित्रित किया गया है। एक ही तालिका सभी चार इंडेक्स ले सकती है — चयन प्रश्न पर निर्भर करता है, तालिका पर नहीं।</figcaption>
</figure>

---

## जब पूर्ण-पाठ खोज जीतती है

**प्रोज़ की खोज कुंजी शब्दों के लिए।** ब्लॉग पोस्ट, दस्तावेज़, उत्पाद विवरण, समर्थन टिकट, कानूनी दस्तावेज़। FTS को इस तरह की सामग्री के लिए डिज़ाइन किया गया था: प्राकृतिक-भाषा पाठ पर सूचकांकित, रैंकित पुनर्प्राप्ति।

**शब्द-आधारित उपयोगकर्ता प्रश्न।** उपयोगकर्ता एक खोज शब्द टाइप करते हैं, टैग द्वारा फ़िल्टर करते हैं, या कीवर्ड द्वारा ब्राउज़ करते हैं। FTS इस इरादा को एम्बेडिंग बुनियादी ढांचा के बिना प्राकृतिक रूप से संभालता है।

**बाहरी निर्भरता के बिना रैंकित परिणाम।** FTS सूचकांक तेज़, निर्धारित, और कोई API कॉल नहीं चाहिए। प्रासंगिकता संकेत शब्द आवृत्ति से आता है जिसे क्षेत्र स्थिति द्वारा भारित किया गया है।

**खोज के साथ बूलियन फ़िल्टरिंग।** FTS अपनी मौजूदा प्रश्न तर्क के साथ स्वाभाविक रूप से संगठित होता है:

```sql
SELECT * FROM posts
WHERE search_vector @@ to_tsquery('english', 'postgres & performance')
  AND category = 'tutorial'
  AND published_at > NOW() - INTERVAL '6 months';
```

### FTS कैसे स्थापित करें

```sql
-- उत्पन्न स्तंभ सूचकांक को स्वचालित रूप से अपडेट रखता है
ALTER TABLE posts ADD COLUMN search_vector tsvector
  GENERATED ALWAYS AS (
    setweight(to_tsvector('english', coalesce(title, '')), 'A') ||
    setweight(to_tsvector('english', coalesce(body,  '')), 'B')
  ) STORED;

CREATE INDEX posts_search_idx ON posts USING GIN (search_vector);

-- प्रश्न
SELECT title, ts_rank(search_vector, query) AS rank
FROM posts, to_tsquery('english', 'postgres & performance') query
WHERE search_vector @@ query
ORDER BY rank DESC
LIMIT 10;
```

`setweight` महत्व निर्धारित करता है: `A` (शीर्षक) `B` (शरीर) से अधिक प्रासंगिक होता है। यह अधिकांश सामग्री-खोज उपयोग मामलों के लिए प्रासंगिकता मॉडल का पूरा हिस्सा है।

### FTS क्या अच्छी तरह से नहीं संभालता है

- प्रश्नों में त्रुटियाँ — `javascipt` `javascript` से मेल नहीं खाएगा  
- व्यक्ति के नाम, पता, ऐसे सही संज्ञाएँ जो नियमित रूप से बनती नहीं हैं  
- प्रीफिक्स/स्वचालित पूर्णता बिना विशेष विन्यास के  
- ऐसे प्रश्न जहाँ उपयोगकर्ता एक अवधारणा का वर्णन करता है बजाय नाम देने के  

---

## जब त्रिग्राम जीतते हैं (`pg_trgm`)

`pg_trgm` उस कठिन मध्य भाग को कवर करता है जिसे FTS नियमित रूप से गलती से नियंत्रित करता है।

FTS टेक्स्ट को लेक्सेम में टोकनाइज़ करता है और उन्हें रूपांतरित करता है। निबंधों के लिए यह सही है। नामों और छोटे पहचानकर्ताओं के लिए ऐसा अक्सर नहीं होता है:

- व्यक्ति के नाम (`"Dan Levy"` → जिनका रूपांतर शब्दकोश और भाषा विन्यास पर निर्भर करता है)  
- कंपनी के नाम, पता, उत्पाद शीर्षक जहाँ ठीक वर्तनी महत्वपूर्ण है  
- त्रुटियों वाले प्रश्न — `"Micheal Jordan"`, `"Amaon"`, `"javascipt"`  
- स्वचालित पूर्णता / प्रीफिक्स खोज  
- आंशिक स्ट्रिंग मिलान (`"son"` `"Johnson"`, `"Anderson"` के साथ मेल खाता है)

`pg_trgm` भाषा-निर्विशेष भी है, जो विभिन्न भाषाई पृष्ठभूमि वाले नामों के लिए महत्वपूर्ण है। FTS प्रति भाषा के लिए शब्दकोश विन्यास की आवश्यकता करता है।

### गैर-ठीक नाम खोज (Fuzzy Name Search)

```sql
CREATE EXTENSION IF NOT EXISTS pg_trgm;

CREATE INDEX users_name_trgm_idx ON users USING GIN (name gin_trgm_ops);

-- "Michael Jordan" खोजने पर "Micheal Jordan" खोज लेता है
SELECT id, name, similarity(name, $1) AS score
FROM users
WHERE name % $1          -- % ऑपरेटर = समानता थ्रेशहोल्ड (डिफ़ॉल्ट 0.3)
ORDER BY score DESC
LIMIT 10;
```

`%` ऑपरेटर `pg_trgm.similarity_threshold` का उपयोग करता है (डिफ़ॉल्ट 0.3, रेंज 0–1)। नाम खोज में, 0.3–0.4 टाइपो को छोटे रखते हुए शोर कम रखता है।

### स्वचालित पूर्णता, प्रीफिक्स और शामिल खोज

```sql
-- स्वचालित पूर्णता के लिए प्रीफिक्स मिलान। एक trigram GIN इंडेक्स सहायता कर सकता है,
-- लेकिní एक बाएं-एन्कर्ड प्रीफिक्स के लिए शुद्ध B-tree पैटर्न इंडेक्स बेहतर हो सकता है।
SELECT name FROM users
WHERE name ILIKE $1 || '%'
ORDER BY name
LIMIT 10;

-- लंबी स्ट्रिंग में आंशिक मिलान के लिए word_similarity
-- ("Johnson" "Andrew Johnson III" में)
SELECT id, name, word_similarity($1, name) AS score
FROM users
WHERE $1 <% name
ORDER BY score DESC
LIMIT 10;
```

trigram GIN इंडेक्स विशेष रूप से `ILIKE '%pattern%'` शामिल प्रश्नों और टाइपो-टोलरेंट मिलान के लिए उपयोगी है — ऐसे पैटर्न जो एक trigram इंडेक्स के बिना आमतौर पर फुल-टेबल स्कैन होते हैं।

### जब pg_trgm का उपयोग FTS के बजाय करें

| हालात | उपयोग |
|---|---|
| टाइपो के साथ व्यक्ति/कंपनी नाम खोज | `pg_trgm` |
| स्वत: पूरा करना / प्रिफिक्स खोज | `pg_trgm` (या FTS के साथ प्रिफिक्स प्रश्न) |
| छोटे स्ट्रिंग्स, पहचानकर्ता, कोड | `pg_trgm` |
| प्रोज़ आर्टिकल्स, दस्तावेज़, टिकट्स | FTS |
| कीवर्ड्स के लिए लॉग संदेश | FTS |
| बहुभाषी नाम खोज | `pg_trgm` (भाषा-निरपेक्ष) |

---

## जब ठीक-ठीक मिलान एसक्यूएल जीतता है

कुछ "खोज" समस्याएँ खोज ही नहीं होतीं।

"ईमेल `dan@example.com` वाले उपयोगकर्ता को खोजें" एक समानता जाँच है। "आदेश `ORD-12345` को खोजें" एक प्राथमिक कुंजी खोज है। "तारीख द्वारा विफलता वाले पोस्ट्स की सूची" एक फ़िल्टर्ड प्रश्न है। ये B-ट्री या हैश इंडेक्स पर आते हैं।

यहाँ FTS या trigrams का उपयोग कम्प्लैक्सिटी बढ़ाते बिना सटीकता में सुधार नहीं करता — और ठीक पहचानकर्ता के लिए, लगभग मिलान खाली मिलान से खराब है।

```sql
CREATE INDEX users_email_idx ON users (email);

-- सटीक खोज: तेज़ और अस्पष्ट रहित
SELECT id, name FROM users WHERE email = $1;
```

व्यापक शिक्षा: सही उत्तर वाली समस्याओं के लिए अस्पष्ट खोज एक श्रेणी त्रुटि है। यह *कुछ* लौटाता है — जो कि निश्चित रूप से गलत हो सकता है।

---

## इन उपकरणों का संयोजन

ये उपकरण शुद्धता से संयोजित होते हैं। आपको ठीक एक उपकरण चुनने की आवश्यकता नहीं होती।

**`tsvector` + `pg_trgm` गलतियों वाले शब्दों के लिए खोज बॉक्स के लिए:**

```sql
-- शीर्षक में गलतियों को पकड़ने के लिए trigram समानता; ts_rank शरीर की प्रासंगिकता का नियंत्रण करता है
SELECT id, title,
  ts_rank(search_vector, to_tsquery('simple', $1)) AS fts_rank,
  similarity(title, $1) AS trgm_score
FROM posts
WHERE search_vector @@ to_tsquery('simple', $1)
   OR title % $1
ORDER BY (ts_rank(search_vector, to_tsquery('simple', $1)) + similarity(title, $1)) DESC
LIMIT 10;
```

**`tsvector` + `unaccent` अंतरराष्ट्रीय सामग्री के लिए:**

```sql
-- डियाक्रिटिकल चिन्हों को हटाएं ताकि "José" "Jose" के साथ मेल खाए
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

**`unaccent` + `pg_trgm` अंतरराष्ट्रीय नाम खोज के लिए:**

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

ट्रिगर उदाहरण `unaccent()` का उपयोग जनरेटेड-कॉलम या इंडेक्स अभिव्यक्तियों में नहीं करते हैं, जहां पोस्टग्रेस के अपरिवर्तनीय नियम महत्वपूर्ण होते हैं। यदि आप `unaccent()` को अपने अपरिवर्तनीय फ़ंक्शन में लपेटते हैं, तो इस बात की जांच करने के लिए डॉक्यूमेंट करें कि आप अपग्रेड/कॉन्फ़िगरेशन जोखिम को स्वीकार कर रहे हैं।

---

## महत्वपूर्ण एक्सटेंशन

**`pg_trgm`** अधिकांश पोस्टग्रेस वितरणों के साथ शामिल होता है लेकिन विशिष्ट रूप से सक्षम करने की आवश्यकता होती है। पोस्टग्रेस में फेंजी स्ट्रिंग मैचिंग के लिए आधार।

**`unaccent`** इंडेक्सिंग और क्वेरी करने से पहले डियाक्रिटिकल चिन्हों को हटाता है। यूरोपीय भाषाओं की सामग्री के लिए `pg_trgm` और FTS दोनों के साथ अच्छी तरह से जोड़ा जाता है। पोस्टग्रेस के साथ शामिल है।

**`pg_bigm`** ट्रिग्राम दृष्टिकोण को बिग्राम (2-अक्षर के टुकड़े) तक बढ़ाता है, जो चीनी, जापानी, कोरियाई (CJK) भाषाओं के लिए परिणामों को बेहतर बनाता है, जहां `pg_trgm` कम प्रदर्शन करता है। अलग से स्थापित करने की आवश्यकता होती है; बंडल नहीं होता।

**`pg_search`** ([ParadeDB](https://www.paradedb.com/) से) मानक `GIN` / `tsvector` स्टैक को Tantivy-आधारित BM25 इंडेक्स के साथ बदल देता है। यह आपको BM25 स्कोरिंग (अक्सर `ts_rank` से बेहतर), FTS क्वेरी में फजी मैचिंग, फ़ेसेटेड सर्च, और बड़ी तालिकाओं पर तेज़ इंडेक्सिंग प्रदान करता है। जब मानक FTS रैंकिंग या प्रदर्शन सीमाओं दिखाने लगे तो यह एक ड्रॉप-इन अपग्रेड पथ होता है।

```sql
-- pg_search: BM25 फुल-टेक्स्ट सर्च के साथ फजी मैचिंग
CREATE INDEX posts_bm25_idx ON posts
  USING bm25 (id, title, body)
  WITH (key_field = 'id', text_fields = '{"title": {}, "body": {}}');

-- BM25 स्कोरिंग + फजी मैचिंग के साथ क्वेरी (कैच करता है "javascipt")
SELECT id, title, paradedb.score(id) AS rank
FROM posts
WHERE posts @@@ paradedb.fuzzy_phrase(field => 'title', value => 'postgres performnce')
ORDER BY rank DESC
LIMIT 10;
```

**`pgvector`** घने वेक्टर भंडारण और समानता सर्च जोड़ता है। यह उपयोगकर्ता जब विशिष्ट रूप से नाम नहीं बल्कि वर्णन करते हैं तो सही उपकरण होता है — सेमांटिक सर्च, RAG, संबंधित-सामग्री अनुशंसा, बहुभाषी क्वेरी। [Semantic Vector Search and Hybrid Strategies](/semantic-vector-search-landscape) में विस्तार से आवरित है।

---

## निर्णय सारणी

| आप क्या खोज रहे हैं | अनुशंसित |
|---|---|
| निबंध, दस्तावेज़, टिकट | FTS |
| त्रुटियों के साथ व्यक्ति/कंपनी नाम | `pg_trgm` |
| ऑटोकंप्लीट, प्रिफिक्स सर्च | `pg_trgm` |
| छोटे कोड, पहचानकर्ता | `pg_trgm` |
| कीवर्ड के लिए लॉग संदेश | FTS |
| अंतरराष्ट्रीय नाम | `pg_trgm` + `unaccent` |
| बड़ी सामग्री, बेहतर रैंकिंग | `pg_search` (ParadeDB BM25) |
| प्राथमिक कुंजी, सटीक ईमेल, आईडी | B-tree इंडेक्स |
| तारीखें, रेंज, व्यवस्थित सूचियाँ | B-tree इंडेक्स |
| अनुमति, श्रेणियाँ, फ़िल्टर | सामान्य WHERE शर्त |
| प्रश्न, पुनर्व्याख्या, अवधारणा | pgvector (अगले लेख में देखें) |

अस्पष्टता के समय: वर्तनी भिन्नता वाली छोटी स्ट्रिंग्स → त्रिकोण। शब्दार्थी प्रश्नों के लिए लंबी अनुच्छेद → FTS। संरचित पहचानकर्ता → सामान्य इंडेक्स। अवधारणात्मक या प्राकृतिक भाषा प्रश्न → pgvector।

---

## मिश्रित खोज: दो संकेत, एक रैंक

जब एक प्रश्न जैसे `"withRetry timeout errors"` खोज बॉक्स में आता है, तो यह दो प्रकार की इरादा लाता है: उपयोगकर्ता द्वारा ज्ञात ठीक संकेतक (`withRetry`) और एक अवधारणात्मक वर्णन (`timeout errors`)। कोई भी एकल मूल दोनों को कवर नहीं करता है। FTS और वेक्टर खोज को समानांतर में चलाना — फिर उनकी रैंकित सूचियों को Reciprocal Rank Fusion के साथ मर्ज करना — ऐसा करता है।

RRF प्रत्येक सूची में प्रत्येक परिणाम को `1 / (60 + रैंक)` के रूप में स्कोर करता है और सूचियों के माध्यम से योग करता है। स्थिरांक 60 शीर्ष रैंक के लाभ को कम करता है, इसलिए एक परिणाम जो दोनों सूचियों में दूसरे स्थान पर है, एक परिणाम जो एक सूची जीतता है और दूसरे को नज़रअंदाज करता है, उस पर जीत सकता है। महत्वपूर्ण बात यह है कि RRF कभी भी विधियों के माध्यम से मूल स्कोर का औसत नहीं करता है — FTS रैंक और कोसाइन दूरी अलग-अलग मुद्राएँ हैं और गणितीय रूप से जोड़े नहीं जा सकते हैं।

<figure>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1120 660" role="img" aria-labelledby="rrf-title rrf-desc">
  <title id="rrf-title">मिश्रित खोज Reciprocal Rank Fusion के साथ</title>
  <desc id="rrf-desc">एक प्रश्न फुल-टेक्स्ट खोज और वेक्टर खोज में फैल जाता है, प्रत्येक रैंक उत्पन्न करता है, और Reciprocal Rank Fusion उन्हें एक परिणाम सूची में मर्ज करता है।</desc>
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
  <text class="rrf-title-text" x="64" y="68">मिश्रित खोज दो सच्चे संकेत हैं, फिर एक मर्ज रैंक</text>
  <text class="rrf-subtitle" x="64" y="102">मूल स्कोर का औसत न करें। FTS रैंक और कोसाइन दूरी अलग-अलग मुद्राएँ हैं।</text>

  <rect class="rrf-box rrf-query" x="72" y="238" width="214" height="132" rx="20"/>
  <text class="rrf-head" x="104" y="288">उपयोगकर्ता प्रश्न</text>
  <text class="rrf-mono" x="104" y="324">"withRetry</text>
  <text class="rrf-mono" x="104" y="350">timeout errors"</text>

  <path class="rrf-arrow-line" d="M286 270 C350 270 350 188 418 188"/>
  <path class="rrf-arrow-line" d="M286 338 C350 338 350 440 418 440"/>

  <rect class="rrf-box rrf-fts" x="418" y="142" width="266" height="144" rx="20"/>
  <text class="rrf-head" x="450" y="188">FTS / BM25</text>
  <text class="rrf-body" x="450" y="224">ठीक संकेतक और शब्द</text>
  <text class="rrf-rank" x="450" y="256">1. API संदर्भ</text>
  <text class="rrf-rank" x="578" y="256">2. पुनर्प्रयास गाइड</text>

  <rect class="rrf-box rrf-vector" x="418" y="394" width="266" height="144" rx="20"/>
  <text class="rrf-head" x="450" y="440">pgvector</text>
  <text class="rrf-body" x="450" y="476">अवधारणात्मक पड़ोसी</text>
  <text class="rrf-rank" x="450" y="508">1. नेटवर्क विफलताएँ</text>
  <text class="rrf-rank" x="594" y="508">2. पुनर्प्रयास गाइड</text>

  <path class="rrf-thin" d="M684 214 C734 214 734 294 778 294"/>
  <path class="rrf-thin" d="M684 466 C734 466 734 366 778 366"/>

  <rect class="rrf-box rrf-merge" x="778" y="260" width="258" height="166" rx="22"/>
  <text class="rrf-head" x="810" y="306">RRF मर्ज</text>
  <text class="rrf-body" x="810" y="342">प्रत्येक परिणाम को दें क्रेडिट</text>
  <text class="rrf-body" x="810" y="368">प्रत्येक सूची में यह कहाँ रैंक किया गया।</text>
  <text class="rrf-mono" x="810" y="402">1 / (60 + रैंक)</text>

  <path class="rrf-arrow-line" d="M907 426 L907 492"/>

  <rect class="rrf-box rrf-result" x="736" y="492" width="342" height="110" rx="20"/>
  <text class="rrf-head" x="768" y="538">अंतिम परिणाम</text>
  <text class="rrf-body" x="768" y="574">शीर्ष हिट ठीक शब्द हैं</text>
  <text class="rrf-body" x="768" y="598">और शब्दार्थी अर्थ सहमति है।</text>
</svg>
<figcaption>एक प्रश्न FTS और pgvector में समानांतर फैल जाता है। प्रत्येक अपनी रैंकित सूचि उत्पन्न करता है। RRF प्रत्येक सूची में प्रत्येक दस्तावेज़ की स्थिति के द्वारा स्कोर करता है और स्कोर जोड़ता है — परिणाम दोनों संकेतों द्वारा सहमत दस्तावेज़ को सामने लाता है।</figcaption>
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

प्रत्येक शाखा में 60-दस्तावेज़ उम्मीदवार पूल (`LIMIT 60`) एक सामान्य प्रारंभिक बिंदु है। यदि पुनर्प्राप्ति कम है तो इसे विस्तारित करें; गति के लिए संकुचित करें।

---

## अगला क्या है

पोस्टग्रेस टेक्स्ट सर्च कई क्षेत्रों को कवर करता है, लेकिन इसकी एक सीमा है। जब उपयोगकर्ता यह बताते हैं कि वे क्या चाहते हैं बजाय नाम देने के — "कुछ जो उड़ान में सोने में मदद करे", "नए इंजीनियर के रूप में डीबग करने के आत्मविश्वास के बारे में लेख" — तो लेक्सिकल और त्रिकोणीय सर्च दोनों विफल हो जाते हैं।

यह वैक्टर एम्बेडिंग्स, सेमेंटिक सर्च और हाइब्रिड आर्किटेक्चर के क्षेत्र हैं। [सेमेंटिक वैक्टर सर्च और हाइब्रिड रणनीतियाँ](../semantic-vector-search-landscape) में इनका विस्तार से वर्णन है।
````
