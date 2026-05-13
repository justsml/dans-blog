# Translation Candidate
- Slug: serverless-database-magic
- Locale: it
- Model: openrouter/qwen/qwen3-32b:nitro
- Target: src/content/posts/2025-09-15--serverless-database-magic/it/index.mdx
- Validation: deferred
- Runtime seconds: 46.69
- Input tokens: 6125
- Output tokens: 6833
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- Estimated cost: $0.002130
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
title: L'onda dell'innovazione nei database nel 2025
subTitle: Puoi farci grazie.
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
## Non un altro articolo sui database vettoriali

Ecco la regola decisionale che avrei voluto usare prima:

<p class="inset">Se i tuoi dati possono essere rigenerati da file e gli utenti li leggono principalmente, prova un database di archiviazione su oggetti. Se gli utenti ci scrivono tutto il giorno, inizia con un vero database e smettila di cercare di far finta che S3 sia uno.</p>

Questa è la frase utile. Non "il serverless è il futuro". Non "i database vettoriali hanno cambiato tutto". Queste frasi sono già state stampate su abbastanza badge di conferenze.

L'intelligenza artificiale ha effettivamente cambiato la forma di molti problemi di ricerca. Improvvisamente, squadre piccole volevano ricerca semantica, classifica ibrida, chat su documenti, ricerca multimodale e analisi su file che stavano in archiviazione su oggetti. La vecchia risposta era "esegui Postgres con pgvector" o "gestisci OpenSearch/Elasticsearch" o "acquista un servizio di ricerca gestito". Queste sono comunque buone risposte quando il carico di lavoro lo richiede.

Ma molti carichi di lavoro non lo richiedono. Sono leggeri in lettura, rigenerabili e tollerano un breve ritardo tra il cambiamento del contenuto e l'aggiornamento della ricerca. Documentazione. Snapshot di cataloghi. Esportazioni statiche. Basi di conoscenza interne. Analisi locali. Prototipi di sistemi RAG. Per questi, una nuova classe di strumenti ha reso l'architettura "banale" straordinariamente potente: genera un indice, memorizzalo come file, e servilo via HTTP.

**Nota sullo snapshot**: l'ecosistema si evolve rapidamente. Le stelle, le etichette delle funzionalità e i numeri delle prestazioni riportati di seguito rappresentano uno snapshot di settembre 2025, non un quadro definitivo. Trattateli come riferimenti orientativi, quindi verificate le documentazioni aggiornate prima di affidarvi a un'unica cella per una migrazione in produzione.

## Un database con qualsiasi altro nome

Questi datastores serverless e compatibili con CDN sono utili per casi di medio livello, circa 1.000 a 1.000.000 di record o alcuni GB, dove l'infrastruttura tradizionale dei database può risultare più cerimonia che valore:

- **Pagefind** (2022, ~4.5K ⭐): Approccio puramente statico - compila una volta, cerca per sempre, senza requisiti backend
- **Orama** (2023, ~8K ⭐): Soluzione universale eseguibile ovunque, dai browser alle funzioni serverless
- **Chroma** (2022, ~14K ⭐): Native AI, progettato appositamente per applicazioni RAG
- **LanceDB** (2023, ~4K ⭐): Capacità multimodali enterprise con architettura basata su disco
- **DuckDB-WASM** (2019, ~23K ⭐): Database analitico SQL completo eseguibile nei browser tramite WebAssembly

Il movimento comune è semplice: mantenere i dati duraturi nei file o nell'object storage, quindi interrogarli da un browser, una funzione edge, un worker o un servizio leggero. Questo non elimina la complessità, ma la sposta nei pipeline di costruzione, nella freschezza degli indici, nell'invalidazione della cache e nelle capacità del client. Che è un compromesso perfettamente accettabile quando le letture dominano.

### Battaglia delle caselle di controllo

| Funzionalità | [Pagefind](https://pagefind.app) | [Orama](https://orama.com) | [Chroma](https://www.trychroma.com/) | [LanceDB](https://lancedb.com) | [DuckDB-WASM](https://duckdb.org/docs/api/wasm) |
|---------------|----------|--------|---------|----------|----------|
| **Ricerca testuale completa** | ✅ Stemming avanzato | ✅ BM25, 30 lingue | ✅ SQLite FTS | ✅ Tantivy | ✅ SQL completo |
| **Ricerca vettoriale** | ❌ | ✅ Similarità al coseno | ✅ HNSW | ✅ IVF_PQ, HNSW, GPU | ⚠️ Estensioni |
| **Integrazioni AI/RAG** | Nessuna | ✅ Pipeline integrata | ✅ LangChain, LlamaIndex | ✅ Riordinamento avanzato | ⚠️ Configurazione manuale |
| **Archiviazione** | JSON/WASM statico | Memoria + plugin S3 | Basato su server* | Lance compatibile con S3 | WASM + S3/HTTP |
| **Supporto scritture** | Solo in fase di costruzione | CRUD completo | CRUD completo | CRUD completo | CRUD completo SQL |
| **Prestazioni** | <100ms | 0,0001ms - 100ms | <100ms | 3-5ms vettore, 50ms FTS | 10ms-1s (SQL complesso) |

*Snapshot settembre 2025: Chroma richiede un runtime server e non supporta l'archiviazione diretta in S3 come fanno gli strumenti a file oggetto ([issue #1736](https://github.com/chroma-core/chroma/issues/1736)).

### Esempi di implementazione

Le differenze sintattiche rivelano la divisione reale: la ricerca in fase di costruzione, la ricerca in memoria, l'archiviazione vettoriale nativa, le tabelle multimodali e l'SQL nel browser non sono la stessa categoria di prodotto solo perché appaiono in dimostrazioni AI.

#### Ricerca su sito statico con Pagefind

```html
```

<link href="../pagefind/pagefind-ui.css" rel="stylesheet">
<script src="../pagefind/pagefind-ui.js"></script>
<div id="search"></div>
<script>new PagefindUI({ element: "#search" });</script>
```

#### Multimodale enterprise-grade con LanceDB

**Codice per creare una tabella LanceDB con embedding automatici di OpenAI:**
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

**Esempio di query su una tabella LanceDB:**
```typescript
import * as lancedb from "@lancedb/lancedb";
import "@lancedb/lancedb/embedding/openai";
// "Connetti" a un percorso URL
const db = await lancedb.connect("data/multimodal-db");
const table = db.getTable("documents");

// Combinazione SQL + ricerca vettoriale
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
  mode: 'hybrid' // Combinazione testo + ricerca vettoriale
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
// Opzionale full-text:
await conn.query(`install fts; load fts; select * from t where match_bm25(txt, 'hybrid');`);
```

#### Ricerca nativa AI con Chroma  
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

## Guida ai Casi d'Uso

**Scegli Pagefind quando:**
- Stai costruendo documentazione, blog o banche dati conoscenza
- Gli aggiornamenti del contenuto avvengono settimanalmente o con meno frequenza
- Hai bisogno di zero overhead operativo e caching CDN ottimale
- *Esempio: Documentazione aziendale con 10K+ pagine aggiornate mensilmente*

**Scegli Orama quando:**
- Stai sviluppando dashboard, e-commerce o applicazioni dinamiche
- Hai bisogno di aggiornamenti in tempo reale e prestazioni <100ms
- Vuoi flessibilità di distribuzione da browser a funzioni edge
- *Esempio: SaaS con cataloghi prodotto dinamici*

**Scegli Chroma quando:**
- Stai costruendo applicazioni RAG o banche dati AI
- Hai bisogno di integrazioni LangChain/LlamaIndex
- La ricerca semantica è funzionalità centrale
- *Esempio: Bot di supporto clienti AI*

**Scegli LanceDB quando:**
- Lavori con dati multimodali (immagini, audio, video)
- Hai bisogno di prestazioni enterprise su larga scala
- Sono richieste analisi complesse e riordinamento
- *Esempio: Piattaforma media con ricerca semantica video*

**Scegli DuckDB-WASM quando:**
- Hai bisogno di capacità SQL complete in browser o funzioni edge
- Lavori con carichi analitici e query complesse
- Vuoi processare file CSV/Parquet direttamente da S3
- *Esempio: Dashboard di intelligence aziendale con query SQL ad hoc*

## La Regola Decisionale

La domanda pratica non è "quale database è migliore?"

La domanda pratica è: che tipo di cambiamento deve assorbire il sistema?

- **Contenuti ricostruibili:** Pagefind, snapshot Orama, file Lance, DuckDB su Parquet. Mantieni il tutto statico finché non fa male.
- **Scritture frequenti:** Postgres, server Chroma, servizio di ricerca gestito, o pipeline di indicizzazione a coda. Hai bisogno di coordinamento, non vibrazioni.
- **Risultati specifici per utente:** usa un backend reale. L'archiviazione oggetti non è un modello di autorizzazione.
- **Analisi su file:** DuckDB è straordinariamente utile. Lascia che SQL faccia le cose tipiche di SQL.
- **Ricerca multimodale o pesata sui vettori:** LanceDB e Chroma meritano test con i tuoi dati reali, non con benchmark di README.

Il percorso felice è economico. I casi limite decidono l'architettura.

## Il Quadro Più Ampio

Questi strumenti riducono l'infrastruttura minima necessaria per una ricerca utile. Questo conta. Nel 2020, "ricerca semantica" spesso implicava un insieme di servizi, molto codice collante, e qualcuno che spiegava gli indici vettoriali in una riunione dove la metà della stanza voleva pranzo. Nel 2025, un piccolo team può prototipare lo stesso prodotto con file, embedding e un weekend.

Questo non significa che ogni casella di ricerca debba diventare un sistema RAG. Significa che la prima versione non deve ereditare infrastruttura produttiva prima di avere prove di produzione.

Anche AWS si sta muovendo in questa direzione con la ricerca vettoriale vicina a S3, che è un segnale utile: l'archiviazione oggetti non è più solo l'attico dove finiscono i vecchi file. Sta diventando una superficie di query.

## Inizia a sperimentare

1. **Scegli prima il pattern di aggiornamento**: costruzione, batch orario, scritture in tempo reale, o risultati per utente.
2. **Prototipa con lo strumento più piccolo e onesto**: Pagefind per HTML statico, DuckDB per file analitici, Orama per ricerca app leggera, LanceDB o Chroma per carichi vettoriali.
3. **Misura la parte brutta**: tempo di indicizzazione, freschezza, dimensione bundle, permessi, e la prima query dopo un avvio freddo.
4. **Promuovi solo quando il dolore è reale**: un database gestito è più facile da giustificare dopo che la versione basata su file mostra esattamente dove si piega.

*Consulta la mia [guida pratica a Pagefind][1] per un'implementazione concreta, o esplora l'ecosistema crescente dei database nativi edge che ridisegnano i dati su larga scala.*

> **Disclaimer:** Ho usato Pagefind per anni e sono diventato contributore nel 2025. Ho sperimentato Orama e Chroma per progetti più piccoli e sto esplorando LanceDB per applicazioni AI più grandi. Nessun legame finanziario con questi progetti—solo interesse per l'evoluzione del panorama dei database.

[1]: https://danlevy.net/you-might-not-need-algolia/
````
