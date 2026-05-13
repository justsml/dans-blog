# Translation Candidate
- Slug: serverless-database-magic
- Locale: it
- Model: openrouter/openai/gpt-oss-120b:nitro
- Target: src/content/posts/2025-09-15--serverless-database-magic/it/index.mdx
- Validation: deferred
- Runtime seconds: 9.77
- Input tokens: 6153
- Output tokens: 3297
- Thinking tokens: unknown
- Cached input tokens: 1024
- Cache write tokens: 0
- Estimated cost: $0.000833
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
title: L’ondata di innovazione dei database 2025
subTitle: Puoi ringraziare l'IA.
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
## Not another Vector DB article

Here is the decision rule I wish I had used earlier:

<p class="inset">Se i tuoi dati possono essere ricostruiti da file e gli utenti li leggono per lo più, prova prima un database basato su object‑storage. Se gli utenti scrivono continuamente, parti con un vero database e smetti di far passare S3 per uno.</p>

That is the useful line. Not "serverless is the future." Not "vector databases changed everything." Those sentences have already been printed on enough conference lanyards.

AI did change the shape of a lot of search problems. Suddenly small teams wanted semantic search, hybrid ranking, document chat, multimodal lookup, and analytics over files sitting in object storage. The old answer was "run Postgres with pgvector" or "operate OpenSearch/Elasticsearch" or "buy a managed search service." Those are still good answers when the workload deserves them.

But many workloads do not. They are read‑heavy, rebuildable, and tolerant of a short delay between content changing and search catching up. Documentation. Catalog snapshots. Static exports. Internal knowledge bases. Local analytics. Prototype RAG systems. For those, a new class of tools has made the boring architecture unusually powerful: build an index, store it as files, serve it over HTTP.

Nota sullo snapshot: l'ecosistema si sta muovendo rapidamente. I conteggi delle stelle, le etichette delle funzionalità e i numeri di prestazione qui sotto sono uno snapshot di settembre 2025, non una classifica eterna. Considerateli come indicazioni di orientamento e verificate la documentazione corrente prima di puntare una migrazione in produzione su una singola cella.

## Un database con un altro nome

Questi datastore serverless e compatibili con CDN sono utili per casi di media scala, circa 1 000‑1 000 000 di record o qualche GB, dove l'infrastruttura tradizionale di database può risultare più burocrazia che valore:

- **Pagefind** (2022, ~4,5 K ⭐): approccio puramente statico – compila una volta, ricerca per sempre, nessun requisito di backend
- **Orama** (2023, ~8 K ⭐): soluzione universale che gira ovunque, dai browser alle funzioni serverless
- **Chroma** (2022, ~14 K ⭐): nativo AI, progettato specificamente per applicazioni RAG
- **LanceDB** (2023, ~4 K ⭐): capacità multimodali enterprise con architettura basata su disco
- **DuckDB‑WASM** (2019, ~23 K ⭐): database analitico SQL completo che gira nei browser via WebAssembly

Il movimento comune è semplice: mantenere i dati persistenti in file o storage a oggetti, per poi interrogarli da un browser, una funzione edge, un worker o un servizio leggero. Questo non elimina la complessità. La sposta nei pipeline di build, nella freschezza dell’indice, nell’invalidazione della cache e nelle capacità del client. Un compromesso perfettamente valido quando le letture dominano.

### Battaglia delle caselle di controllo

| Feature | [Pagefind](../pagefind.app) | [Orama](../orama.com) | [Chroma](../www.trychroma.com/) | [LanceDB](../lancedb.com) | [DuckDB-WASM](../duckdb.org/docs/api/wasm) |
|---------|----------|--------|---------|----------|----------|
| **Full-Text Search** | ✅ Stemming avanzato | ✅ BM25, 30 lingue | ✅ SQLite FTS | ✅ Tantivy | ✅ SQL completo |
| **Vector Search** | ❌ | ✅ Similarità coseno | ✅ HNSW | ✅ IVF_PQ, HNSW, GPU | ⚠️ Estensioni |
| **AI/RAG Integrations** | Nessuna | ✅ Pipeline integrata | ✅ LangChain, LlamaIndex | ✅ Reranking avanzato | ⚠️ Configurazione manuale |
| **Storage** | JSON/WASM statici | Memoria + plugin S3 | Basato su server* | Lance compatibile S3 | WASM + S3/HTTP |
| **Write Support** | Solo a build-time | CRUD completo | CRUD completo | CRUD completo | CRUD SQL completo |
| **Performance** | < 100 ms | 0,0001 ms – 100 ms | < 100 ms | 3‑5 ms per vettore, 50 ms FTS | 10 ms – 1 s (SQL complesso) |

*Snapshot di settembre 2025: Chroma richiede un runtime server e non supporta lo storage diretto su oggetti S3 come fanno gli strumenti basati su file ([issue #1736](../github.com/chroma-core/chroma/issues/1736)).

### Esempi di implementazione

#### Ricerca statici su sito con Pagefind

```html
--- CHUNK END ---

<link href="../pagefind/pagefind-ui.css" rel="stylesheet">
<script src="../pagefind/pagefind-ui.js"></script>
<div id="search"></div>
<script>new PagefindUI({ element: "#search" });</script>

#### Multimodale di livello enterprise con LanceDB

**Codice per creare una tabella LanceDB con embedding automatici OpenAI:**
```typescript
import * as lancedb from "@lancedb/lancedb";
import "@lancedb/lancedb/embedding/openai";
import { LanceSchema, getRegistry } from "@lancedb/lancedb/embedding";
import { Utf8 } from "apache-arrow";

const db = await lancedb.connect("data/multimodal-db");
const func = getRegistry()
  .get("openai")
  ?.create({ model: "text-embedding-ada-002" });

// Schema con generazione automatica di embedding
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

**Esempio di interrogazione di una tabella LanceDB:**
```typescript
import * as lancedb from "@lancedb/lancedb";
import "@lancedb/lancedb/embedding/openai";
// "Connect" a un percorso URL
const db = await lancedb.connect("data/multimodal-db");
const table = db.getTable("documents");

// Combinazione di ricerca SQL + vettoriale
const results = await table.search("machine learning concepts")
  .where("category = 'research'")
  .limit(10)
  .toArray();

console.log(results);
```

#### Ricerca universale con Orama
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
  mode: 'hybrid' // Combina ricerca testuale + vettoriale
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
// Facoltativo full‑text:
await conn.query(`install fts; load fts; select * from t where match_bm25(txt, 'hybrid');`);
```

#### Ricerca AI‑native con Chroma  
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

## Guida ai casi d'uso

**Scegli Pagefind quando:**
- Crei documentazione, blog o knowledge base
- Gli aggiornamenti dei contenuti sono settimanali o meno frequenti
- Hai bisogno di zero overhead operativo e di caching CDN perfetto
- *Esempio: documenti aziendali con più di 10 000 pagine aggiornati mensilmente*

**Scegli Orama quando:**
- Costruisci dashboard, e‑commerce o applicazioni dinamiche
- Hai bisogno di aggiornamenti in tempo reale e prestazioni sotto i 100 ms
- Vuoi flessibilità di deployment dal browser alle edge function
- *Esempio: SaaS con cataloghi di prodotto dinamici*

**Scegli Chroma quando:**
- Realizzi applicazioni RAG o knowledge base AI
- Necessiti integrazioni LangChain/LlamaIndex
- La ricerca semantica è la funzionalità principale
- *Esempio: bot di supporto clienti basato su AI*

**Scegli LanceDB quando:**
- Lavori con dati multimodali (immagini, audio, video)
- Hai bisogno di prestazioni enterprise su scala massiva
- Sono richieste analisi complesse e reranking
- *Esempio: piattaforma media con ricerca semantica di video*

**Scegli DuckDB-WASM quando:**
- Hai bisogno di piena capacità SQL nei browser o nelle edge function
- Lavori su carichi analitici e query complesse
- Vuoi processare file CSV/Parquet direttamente da S3
- *Esempio: dashboard di business intelligence con query SQL ad‑hoc*

## La Regola Decisionale

La domanda pratica non è “qual è il miglior database?”.

La domanda pratica è: che tipo di cambiamento deve assorbire il sistema?

- **Contenuto ricostruibile:** Pagefind, snapshot Orama, file Lance, DuckDB su Parquet. Mantienilo statico finché non diventa un problema.
- **Scritture frequenti:** Postgres, server Chroma, servizio di ricerca gestito, o pipeline di indicizzazione basata su code. Hai bisogno di coordinamento, non di vibe.
- **Risultati specifici per utente:** usa un vero backend. Lo storage su oggetti non è un modello di autorizzazione.
- **Analytics su file:** DuckDB è incredibilmente utile. Lascia che SQL faccia le cose di SQL.
- **Ricerca multimodale o vettoriale intensiva:** LanceDB e Chroma meritano test contro i tuoi dati reali, non contro un benchmark di README.

Il percorso più semplice è economico. I casi limite decidono l'architettura.

## Il Contesto più Ampio

Questi strumenti riducono l'infrastruttura minima necessaria per una ricerca utile. Questo conta. Nel 2020, “ricerca semantica” implicava una pila di servizi, molto codice di glue e qualcuno che spiegava gli indici vettoriali in una riunione dove metà della stanza voleva il pranzo. Nel 2025, un piccolo team può prototipare la stessa idea di prodotto con file, embedding e un weekend.

Ciò non significa che ogni casella di ricerca debba diventare un sistema RAG. Significa che la prima versione non deve più ereditare un’infrastruttura di produzione prima di avere evidenze di produzione.

Anche AWS sta andando in questa direzione con il lavoro di ricerca vettoriale adiacente a S3, che è un segnale utile: lo storage su oggetti non è più solo la soffitta dove finiscono i vecchi file. Sta diventando una superficie di query.

## Inizia a sperimentare

1. **Scegli prima il pattern di aggiornamento**: build‑time, batch orario, scritture live o risultati per utente.
2. **Prototipa con lo strumento più piccolo e onesto**: Pagefind per HTML statico, DuckDB per file analitici, Orama per ricerca leggera in app, LanceDB o Chroma per lavoro vettoriale intenso.
3. **Misura la parte brutta**: tempo di indicizzazione, freschezza, dimensione del bundle, permessi e la prima query dopo un cold start.
4. **Promuovi solo quando il dolore è reale**: un database gestito è più facile da giustificare dopo che la versione basata su file ha mostrato esattamente dove si piega.

*Dai un’occhiata alla mia [guida pratica su Pagefind][1] per un’implementazione passo‑passo, o esplora l’ecosistema in crescita di database nativi edge che stanno rimodellando i dati su larga scala.*

> **Disclaimer:** Uso Pagefind da anni e sono diventato un collaboratore nel 2025. Ho sperimentato Orama e Chroma per progetti più piccoli e sto esplorando LanceDB per applicazioni AI più grandi. Nessun legame finanziario con questi progetti—solo un forte interesse per il panorama in evoluzione dei database.

[1]: https://danlevy.net/you-might-not-need-algolia/
````
