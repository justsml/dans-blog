# Translation Candidate
- Slug: serverless-database-magic
- Locale: hi
- Model: deepseek/deepseek-v4-flash
- Target: src/content/posts/2025-09-15--serverless-database-magic/hi/index.mdx
- Validation: deferred
- Runtime seconds: 142.56
- Input tokens: 4353
- Output tokens: 10648
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- Estimated cost: $0.003591
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
title: 2025 की डेटाबेस नवाचार लहर
subTitle: आप AI का शुक्रिया कर सकते हैं।
date: '2025-09-10'
modified: '2025-09-17'
tags:
  - serverless
  - databases
  - ai
  - innovation
  - chroma
  - lancedb
  - pagefind
  - orama
  - duckdb
category: Search
subCategory: Databases
social_image: ../desktop-social.webp
cover_full_width: ../data-city-wide.webp
cover_mobile: ../data-city-square-200.webp
cover_icon: ../data-city-square-200.webp
cover_credit: ©️ 2025 Dan Levy
---
## कोई और वेक्टर DB लेख नहीं

यहाँ वह निर्णय नियम है जो मैं चाहता हूँ कि मैंने पहले इस्तेमाल किया होता:

<p class="inset">यदि आपका डेटा फ़ाइलों से पुनर्निर्मित किया जा सकता है और उपयोगकर्ता इसे ज़्यादातर पढ़ते हैं, तो पहले ऑब्जेक्ट-स्टोरेज डेटाबेस आज़माएँ। यदि उपयोगकर्ता पूरे दिन इसमें लिख रहे हैं, तो एक वास्तविक डेटाबेस से शुरू करें और S3 को उसका रूप देने की कोशिश करना बंद करें।</p>

यही उपयोगी रेखा है। "सर्वरलेस भविष्य है" नहीं। "वेक्टर डेटाबेस ने सब कुछ बदल दिया" नहीं। वे वाक्य पहले ही काफी सम्मेलन लैनियार्ड पर छप चुके हैं।

AI ने वास्तव में कई खोज समस्याओं का आकार बदल दिया। अचानक छोटी टीमें सिमैंटिक सर्च, हाइब्रिड रैंकिंग, डॉक्यूमेंट चैट, मल्टीमॉडल लुकअप, और ऑब्जेक्ट स्टोरेज में पड़ी फ़ाइलों पर एनालिटिक्स चाहती थीं। पुराना जवाब था "pgvector के साथ Postgres चलाएँ" या "OpenSearch/Elasticsearch संचालित करें" या "एक प्रबंधित सर्च सेवा खरीदें।" ये अभी भी अच्छे जवाब हैं जब वर्कलोड उनके लायक हो।

लेकिन कई वर्कलोड ऐसे नहीं हैं। वे रीड-हैवी, रीबिल्डेबल, और कंटेंट बदलने और सर्च के पकड़ने के बीच थोड़ी देरी को सहन करने वाले हैं। दस्तावेज़ीकरण। कैटलॉग स्नैपशॉट। स्टैटिक एक्सपोर्ट। आंतरिक ज्ञानकोष। स्थानीय एनालिटिक्स। प्रोटोटाइप RAG सिस्टम। इनके लिए, उपकरणों के एक नए वर्ग ने उबाऊ आर्किटेक्चर को असामान्य रूप से शक्तिशाली बना दिया है: एक इंडेक्स बनाएँ, इसे फ़ाइलों के रूप में स्टोर करें, इसे HTTP पर सर्व करें।

स्नैपशॉट नोट: इकोसिस्टम तेज़ी से बदल रहा है। नीचे दिए गए स्टार काउंट, फ़ीचर लेबल और प्रदर्शन संख्याएँ सितंबर 2025 के स्नैपशॉट हैं, कोई कालातीत स्कोरबोर्ड नहीं। उन्हें अभिविन्यास के रूप में लें, फिर किसी एक सेल पर प्रोडक्शन माइग्रेशन का दांव लगाने से पहले वर्तमान डॉक्स जाँचें।

## किसी भी नाम का डेटाबेस

ये सर्वरलेस और CDN-सक्षम डेटास्टोर मध्यम-पैमाने के मामलों के लिए उपयोगी हैं, मोटे तौर पर 1,000 से 1,000,000 रिकॉर्ड या कुछ GB, जहाँ पारंपरिक डेटाबेस इंफ्रास्ट्रक्चर मूल्य से अधिक औपचारिकता हो सकती है:

- **Pagefind** (2022, ~4.5K ⭐): शुद्ध स्थैतिक दृष्टिकोण - एक बार कंपाइल करें, हमेशा के लिए खोजें, शून्य बैकएंड आवश्यकताएँ
- **Orama** (2023, ~8K ⭐): ब्राउज़र से लेकर सर्वरलेस फ़ंक्शन तक हर जगह चलने वाला सार्वभौमिक समाधान
- **Chroma** (2022, ~14K ⭐): AI-नेटिव, RAG अनुप्रयोगों के लिए उद्देश्य-निर्मित
- **LanceDB** (2023, ~4K ⭐): डिस्क-आधारित आर्किटेक्चर के साथ एंटरप्राइज़ मल्टीमॉडल क्षमताएँ
- **DuckDB-WASM** (2019, ~23K ⭐): WebAssembly के माध्यम से ब्राउज़रों में चलने वाला पूर्ण SQL एनालिटिक्स डेटाबेस

सामान्य तरीका सरल है: स्थायी डेटा को फ़ाइलों या ऑब्जेक्ट स्टोरेज में रखें, फिर उसे ब्राउज़र, एज फ़ंक्शन, वर्कर या हल्की सेवा से क्वेरी करें। यह जटिलता को खत्म नहीं करता। यह जटिलता को बिल्ड पाइपलाइनों, इंडेक्स ताजगी, कैश अमान्यकरण और क्लाइंट क्षमताओं में स्थानांतरित करता है। जब रीड हावी होते हैं तो यह एक पूरी तरह से अच्छा व्यापार है।

### चेकबॉक्स की लड़ाई

| सुविधा | [Pagefind](https://pagefind.app) | [Orama](https://orama.com) | [Chroma](https://www.trychroma.com/) | [LanceDB](https://lancedb.com) | [DuckDB-WASM](https://duckdb.org/docs/api/wasm) |
|---------|----------|--------|---------|----------|----------|
| **पूर्ण-पाठ खोज** | ✅ उन्नत स्टेमिंग | ✅ BM25, 30 भाषाएँ | ✅ SQLite FTS | ✅ Tantivy | ✅ पूर्ण SQL |
| **वेक्टर खोज** | ❌ | ✅ कोसाइन समानता | ✅ HNSW | ✅ IVF_PQ, HNSW, GPU | ⚠️ एक्सटेंशन |
| **AI/RAG एकीकरण** | कोई नहीं | ✅ अंतर्निहित पाइपलाइन | ✅ LangChain, LlamaIndex | ✅ उन्नत रीरैंकिंग | ⚠️ मैन्युअल सेटअप |
| **भंडारण** | स्टैटिक JSON/WASM | मेमोरी + S3 प्लगइन्स | सर्वर-आधारित* | S3-संगत Lance | WASM + S3/HTTP |
| **लेखन समर्थन** | केवल बिल्ड-टाइम | पूर्ण CRUD | पूर्ण CRUD | पूर्ण CRUD | पूर्ण SQL CRUD |
| **प्रदर्शन** | Sub-100ms | 0.0001ms - 100ms | Sub-100ms | 3-5ms वेक्टर, 50ms FTS | 10ms-1s (जटिल SQL) |

*सितंबर 2025 स्नैपशॉट: Chroma को सर्वर रनटाइम की आवश्यकता है और यह ऑब्जेक्ट-फ़ाइल टूल्स की तरह प्रत्यक्ष S3 ऑब्जेक्ट स्टोरेज का समर्थन नहीं करता ([issue #1736](https://github.com/chroma-core/chroma/issues/1736)).

### कार्यान्वयन उदाहरण

सिंटैक्स अंतर वास्तविक विभाजन को प्रकट करते हैं: बिल्ड-टाइम खोज, इन-मेमोरी खोज, वेक्टर-नेटिव स्टोरेज, मल्टीमॉडल टेबल और ब्राउज़र SQL एक ही उत्पाद श्रेणी नहीं हैं सिर्फ इसलिए कि वे सभी AI डेमो में दिखाई देते हैं।

#### Pagefind के साथ स्टैटिक साइट खोज

```html

<link href="/pagefind/pagefind-ui.css" rel="stylesheet">
<script src="/pagefind/pagefind-ui.js"></script>
<div id="search"></div>
<script>new PagefindUI({ element: "#search" });</script>
```

#### LanceDB के साथ एंटरप्राइज़-ग्रेड मल्टीमॉडल

**स्वचालित OpenAI एम्बेडिंग के साथ LanceDB तालिका बनाने का कोड:**
```typescript
import * as lancedb from "@lancedb/lancedb";
import "@lancedb/lancedb/embedding/openai";
import { LanceSchema, getRegistry } from "@lancedb/lancedb/embedding";
import { Utf8 } from "apache-arrow";

const db = await lancedb.connect("data/multimodal-db");
const func = getRegistry()
  .get("openai")
  ?.create({ model: "text-embedding-ada-002" });

// Schema with automatic embedding generation
const documentsSchema = LanceSchema({
  text: func.sourceField(new Utf8()),
  vector: func.vectorField(),
  category: new Utf8()
});

const table = await db.createEmptyTable("documents", documentsSchema);
await table.add([
  { text: "machine learning concepts", category: "research" },
  { text: "deep learning fundamentals", category: "research" }
]);
```

**LanceDB तालिका क्वेरी करने का उदाहरण:**
```typescript
import * as lancedb from "@lancedb/lancedb";
import "@lancedb/lancedb/embedding/openai";
// "Connect" to a URL path
const db = await lancedb.connect("data/multimodal-db");
const table = db.getTable("documents");

// SQL + vector search combination
const results = await table.search("machine learning concepts")
  .where("category = 'research'")
  .limit(10)
  .toArray();

console.log(results);
```


#### Orama के साथ सार्वभौमिक खोज
```typescript
import { create, insert, search } from '@orama/orama'

const db = create({
  schema: {
    title: 'string',
    content: 'string', 
    embedding: 'vector[1536]'
  }
})

await insert(db, { 
  title: 'Getting Started',
  content: 'Learn the basics',
  embedding: await generateEmbedding('Learn the basics')
})

const results = await search(db, { 
  term: 'basics',
  mode: 'hybrid' // Combines text + vector search
})
```

**DuckDB-WASM:**
```typescript
import * as duckdb from "https://cdn.jsdelivr.net/npm/@duckdb/duckdb-wasm@latest/dist/duckdb-browser.mjs";
const bundle = await duckdb.selectBundle(duckdb.getJsDelivrBundles());
const worker = new Worker(bundle.mainWorker);
const db = new duckdb.AsyncDuckDB(new duckdb.ConsoleLogger(), worker);
await db.instantiate(bundle.mainModule, bundle.pthreadWorker);

const conn = await db.connect();
await conn.query(`create table t as select * from (values (1,'hybrid search'),(2,'edge sql')) as v(id,txt);`);
// Optional full-text:
await conn.query(`install fts; load fts; select * from t where match_bm25(txt, 'hybrid');`);
```

#### Chroma के साथ AI-नेटिव खोज  
```typescript
import { ChromaClient } from "chromadb";

const client = new ChromaClient();
const collection = await client.createCollection({ name: "knowledge-base" });

await collection.add({
  documents: ["AI will transform software development"],
  metadatas: [{ source: "tech-blog", category: "AI" }],
  ids: ["doc1"]
});

const results = await collection.query({
  queryTexts: ["future of programming"],
  where: { category: "AI" },
  nResults: 5
});
```

## उपयोग के मामले गाइड

**Pagefind चुनें जब:**
- दस्तावेज़ीकरण, ब्लॉग या ज्ञानकोष बना रहे हों
- सामग्री साप्ताहिक या उससे कम अपडेट होती हो
- शून्य परिचालन ओवरहेड और सही CDN कैशिंग की आवश्यकता हो
- *उदाहरण: मासिक अपडेट होने वाले 10K+ पेजों वाले कंपनी दस्तावेज़*

**Orama चुनें जब:**
- डैशबोर्ड, ई-कॉमर्स या गतिशील एप्लिकेशन बना रहे हों
- रीयल-टाइम अपडेट और sub-100ms प्रदर्शन की आवश्यकता हो
- ब्राउज़र से एज फ़ंक्शन तक तैनाती लचीलापन चाहते हों
- *उदाहरण: गतिशील उत्पाद कैटलॉग वाला SaaS*

**Chroma चुनें जब:**
- RAG एप्लिकेशन या AI ज्ञानकोष बना रहे हों
- LangChain/LlamaIndex एकीकरण की आवश्यकता हो
- सिमैंटिक खोज मुख्य कार्यक्षमता हो
- *उदाहरण: AI ग्राहक सहायता बॉट*

**LanceDB चुनें जब:**
- मल्टीमॉडल डेटा (चित्र, ऑडियो, वीडियो) के साथ काम कर रहे हों
- बड़े पैमाने पर एंटरप्राइज़ प्रदर्शन की आवश्यकता हो
- जटिल एनालिटिक्स और रीरैंकिंग आवश्यक हो
- *उदाहरण: सिमैंटिक वीडियो खोज वाला मीडिया प्लेटफ़ॉर्म*

**DuckDB-WASM चुनें जब:**
- ब्राउज़र या एज फ़ंक्शन में पूर्ण SQL क्षमताओं की आवश्यकता हो
- एनालिटिकल वर्कलोड और जटिल क्वेरी के साथ काम कर रहे हों
- CSV/Parquet फ़ाइलों को सीधे S3 से प्रोसेस करना चाहते हों
- *उदाहरण: एड-हॉक SQL क्वेरी वाला बिज़नेस इंटेलिजेंस डैशबोर्ड*

## निर्णय नियम

व्यावहारिक प्रश्न यह नहीं है कि "कौन सा डेटाबेस सबसे अच्छा है?"

व्यावहारिक प्रश्न यह है: सिस्टम को किस प्रकार के परिवर्तन को अवशोषित करना होगा?

- **पुनर्निर्माण योग्य सामग्री:** Pagefind, Orama स्नैपशॉट, Lance फ़ाइलें, Parquet पर DuckDB। इसे तब तक स्थिर रखें जब तक दर्द न हो।
- **बार-बार लिखना:** Postgres, Chroma सर्वर, एक प्रबंधित खोज सेवा, या क्यू-समर्थित इंडेक्सिंग पाइपलाइन। आपको समन्वय चाहिए, भावनाएँ नहीं।
- **उपयोगकर्ता-विशिष्ट परिणाम:** एक वास्तविक बैकएंड का उपयोग करें। ऑब्जेक्ट स्टोरेज एक प्राधिकरण मॉडल नहीं है।
- **फ़ाइलों पर एनालिटिक्स:** DuckDB बेतुका उपयोगी है। SQL को SQL के काम करने दें।
- **मल्टीमॉडल या वेक्टर-भारी खोज:** LanceDB और Chroma को अपने वास्तविक डेटा के विरुद्ध परीक्षण करना उचित है, न कि README बेंचमार्क के विरुद्ध।

खुशहाल रास्ता सस्ता है। किनारे के मामले आर्किटेक्चर तय करते हैं।

## बड़ी तस्वीर

ये उपकरण उपयोगी खोज के लिए न्यूनतम व्यवहार्य बुनियादी ढांचे को कम करते हैं। यह मायने रखता है। 2020 में, "सिमैंटिक खोज" का अर्थ अक्सर सेवाओं का ढेर, बहुत सारा गोंद कोड, और किसी का मीटिंग में वेक्टर इंडेक्स समझाना होता था जहाँ आधे कमरे को दोपहर का भोजन चाहिए था। 2025 में, एक छोटी टीम फ़ाइलों, एम्बेडिंग और एक सप्ताहांत के साथ उसी उत्पाद विचार का प्रोटोटाइप बना सकती है।

इसका मतलब यह नहीं है कि हर सर्च बॉक्स RAG सिस्टम बन जाना चाहिए। इसका मतलब है कि पहले संस्करण को उत्पादन साक्ष्य से पहले उत्पादन बुनियादी ढांचा विरासत में लेने की आवश्यकता नहीं है।

यहां तक कि AWS भी S3-समीपवर्ती वेक्टर खोज कार्य के साथ इस दिशा में आगे बढ़ रहा है, जो एक उपयोगी संकेत है: ऑब्जेक्ट स्टोरेज अब केवल वह अटारी नहीं है जहाँ पुरानी फ़ाइलें जाती हैं। यह एक क्वेरी सतह बन रहा है।

## प्रयोग शुरू करें

1. **पहले अपडेट पैटर्न चुनें**: बिल्ड-टाइम, प्रति घंटा बैच, लाइव राइट्स, या प्रति-उपयोगकर्ता परिणाम।
2. **सबसे छोटे ईमानदार उपकरण के साथ प्रोटोटाइप बनाएं**: स्टैटिक HTML के लिए Pagefind, एनालिटिकल फ़ाइलों के लिए DuckDB, हल्की ऐप खोज के लिए Orama, वेक्टर-भारी काम के लिए LanceDB या Chroma।
3. **बदसूरत हिस्से को मापें**: इंडेक्सिंग समय, ताजगी, बंडल आकार, अनुमतियाँ, और कोल्ड स्टार्ट के बाद पहली क्वेरी।
4. **केवल तभी प्रमोट करें जब दर्द वास्तविक हो**: एक प्रबंधित डेटाबेस को सही ठहराना आसान होता है जब फ़ाइल-आधारित संस्करण यह दिखाता है कि वह वास्तव में कहाँ झुकता है।

*हैंड्स-ऑन कार्यान्वयन के लिए मेरी [व्यावहारिक Pagefind गाइड][1] देखें, या डेटा को बड़े पैमाने पर नया आकार देने वाले एज-नेटिव डेटाबेस के बढ़ते पारिस्थितिकी तंत्र का अन्वेषण करें।*

> **अस्वीकरण:** मैंने Pagefind का वर्षों से उपयोग किया है और 2025 में योगदानकर्ता बन गया। मैंने छोटे प्रोजेक्ट्स के लिए Orama और Chroma के साथ प्रयोग किया है और बड़े AI अनुप्रयोगों के लिए LanceDB की खोज कर रहा हूँ। इन परियोजनाओं से कोई वित्तीय संबंध नहीं—बस विकसित हो रहे डेटाबेस परिदृश्य में गहरी रुचि।

[1]: https://danlevy.net/you-might-not-need-algolia/
````
