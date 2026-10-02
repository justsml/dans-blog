# Translation Candidate
- Slug: semantic-vector-search-landscape
- Locale: it
- Model: openrouter/deepseek/deepseek-v4.1-flash
- Target: src/content/posts/2026-05-01--semantic-vector-search-landscape/it/index.mdx
- Validation: rejected: direct AI SDK translation failed
- Runtime seconds: 69.93
- Input tokens: 12454
- Output tokens: 28207
- Thinking tokens: unknown
- Cached input tokens: 3584
- Cache write tokens: 0
- Estimated cost: $0.021342
- Pricing source: openrouter-2026-10-02
- Note: Command failed: bun run i18n:validate --slug semantic-vector-search-landscape --locale it --skip-global (code 1)
## Raw Output

````mdx
---
title: Ricerca vettoriale semantica e altri argomenti per conquistare amici e amanti
subTitle: ''
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
La ricerca non è una cosa sola, e la ricerca semantica non è un sostituto per tutto il resto.

## Panorama della ricerca vettoriale: confronta 16 opzioni

Confronta deployment, licenze, capacità di ricerca e adattamento ai carichi di lavoro. Le spiegazioni delle colonne e gli esempi SQL seguono sotto.

[Come leggere questo confronto](#come-leggere-questo-confronto)

| Database | Deployment | Licenza | Ricerca ibrida | Vettori sparsi | Interfaccia di query | Embedding multimodale integrato | Indice su disco | Limiti dimensionali dei vettori | Ideale per |
|---|---|---|---|---|---|---|---|---|---|
| **[pgvector](https://github.com/pgvector/pgvector)** | Self-host / gestito (Supabase, Neon, RDS) | OSS (PostgreSQL) | Manuale (RRF via SQL) | ❌ | ✅ SQL completo | ❌ | ✅ HNSW su disco | 16.000 in archiviazione; 2.000 indicizzati `vector` | Già su Postgres; conteggi vettoriali moderati |
| **[Qdrant](https://github.com/qdrant/qdrant)** | Self-host / Cloud | Apache 2.0 | ✅ BM25 nativo | ✅ Supporto maturo | ❌ (REST/gRPC) | ❌ | ✅ | 65.535 | Query filtrate su larga scala; metadati complessi |
| **[Weaviate](https://github.com/weaviate/weaviate)** | Self-host / Cloud | BSD 3 | ✅ BM25 nativo + RRF | ✅ | ❌ (GraphQL / gRPC) | ✅ tramite moduli | ✅ | 65.535 | Pattern di accesso GraphQL; vettorizzazione integrata |
| **[Pinecone](https://www.pinecone.io/)** | Solo cloud | Proprietario | ✅ (aggiunto nel 2024) | ✅ | ❌ | ❌ | ✅ (serverless) | 20.000 | Semplicità gestita; nessun team ops |
| **[Milvus](https://github.com/milvus-io/milvus) / [Zilliz](https://zilliz.com/)** | Self-host / Cloud (Zilliz) | Apache 2.0 | ✅ Nativo | ✅ | ✅ Simile a SQL (Milvus Query Language) | ✅ | ✅ DiskANN | 32.768 | Scala miliardaria; enterprise on-prem |
| **[Chroma](https://github.com/chroma-core/chroma)** | Embedded / self-host | Apache 2.0 | ❌ | ❌ | ❌ | ❌ | ❌ | 65.535 | Solo sviluppo locale e prototipazione |
| **[LanceDB](https://github.com/lancedb/lancedb)** | Embedded / Cloud | Apache 2.0 | ✅ | ❌ | ✅ SQL tramite DataFusion | ✅ Nativo | ✅ (formato Lance) | Illimitato | Edge / serverless; lakehouse multimodale |
| **[Orama](https://github.com/oramasearch/orama)** | Embedded / Cloud | Apache 2.0 | ✅ Full-text + vettoriale | ❌ | ❌ | ❌ | ❌ | Variabile | App JS/edge; ricerca leggera per siti/app |
| **[Turbopuffer](https://turbopuffer.com/)** | Solo cloud (serverless) | Proprietario | ✅ BM25 + vettoriale | ❌ | ❌ | ❌ | ✅ (object storage) | 16.000 | SaaS multi-tenant; milioni di namespace |
| **[Elasticsearch](https://github.com/elastic/elasticsearch)** | Self-host / Elastic Cloud | SSPL / AGPLv3 | ✅ RRF + ELSER sparse | ✅ (ELSER) | ✅ Query DSL | ❌ | ✅ DiskBBQ | 4.096 | Già sullo stack Elastic; ricerca enterprise ibrida |
| **[OpenSearch](https://github.com/opensearch-project/OpenSearch)** | Self-host / gestito AWS | Apache 2.0 | ✅ RRF + Neural Search | ✅ | ✅ Query DSL | ❌ | ✅ FAISS + HNSW | 16.000 | Nativo AWS; alternativa open source a Elastic |
| **[Vespa](https://github.com/vespa-engine/vespa)** | Self-host / Cloud | Apache 2.0 | ✅ Nativo | ✅ Tensori / ranking lessicale | ✅ YQL | ✅ Tensori | ✅ | Di fatto illimitato | Ricerca + ranking + sistemi di raccomandazione |
| **[ClickHouse](https://github.com/ClickHouse/ClickHouse)** | Self-host / Cloud | Apache 2.0 | Manuale | ❌ | ✅ SQL completo | ❌ | ✅ Colonnare + HNSW | Variabile | Analytics/log con ricerca vettoriale accanto a OLAP |
| **[MongoDB Atlas](https://github.com/mongodb/mongo)** | Cloud / self-host | SSPL | ✅ Integrato | ❌ | ✅ MQL + aggregazione | ❌ | ✅ HNSW | 8.192 | Già su MongoDB; documento + vettore in uno |
| **[Redis (VSS)](https://github.com/redis/redis)** | Self-host / Redis Cloud | RSALv2 / SSPL | ✅ (RediSearch) | ✅ | ❌ | ❌ | ❌ Solo RAM | 32.768 | Latenza ultra-bassa; ricerca vettoriale a livello di cache |
| **[Marqo](https://github.com/marqo-ai/marqo)** | Cloud / self-host | Apache 2.0 | ✅ | ❌ | ❌ | ✅ Focus nativo | ✅ | Variabile | Multimodale end-to-end: immagine + testo + video |

"Trova l'utente con email `dan@example.com`" e "trovami articoli sul debugging per un nuovo ingegnere" sono entrambe descritte come ricerca, ma come problemi di ingegneria non hanno quasi nulla in comune. La prima ha una risposta corretta e una ricerca in indice `O(log n)`. La seconda non ha una risposta corretta — solo rilevanza — e richiede di comprendere linguaggio, intento e significato.

Gli ingegneri più persuasivi sulle decisioni di ricerca — quelli che vincono le discussioni e spediscono il sistema giusto — comprendono l'intero panorama. Sanno quale strumento usare e perché, e riescono a spiegarlo chiaramente.

Questo articolo copre il livello semantico: cosa fa davvero la ricerca vettoriale, quando vince e dove dovrebbe stare fuori dai piedi. La versione utile non è "fai l'embedding di tutto". È sapere quando i vettori hanno senso accanto a ricerca lessicale, fuzzy ed exact-match in un'architettura ibrida.

La metà lessicale e fuzzy del quadro — `tsvector`, `pg_trgm`, `pg_search` — è in [Guida alla ricerca testuale in Postgres 2026](/postgres-text-search-guide).

---

## Termini usati in questa guida

**Embedding** — Una lista densa di numeri in virgola mobile prodotta da un modello, che rappresenta un pezzo di testo (o immagine, audio, ecc.) come un punto in uno spazio ad alta dimensionalità. Il contenuto semanticamente correlato finisce vicino; il contenuto non correlato finisce lontano.

**Ricerca lessicale** — Ricerca basata sulla corrispondenza esatta di parole e token. Veloce, deterministica e corretta per termini noti. Non comprende sinonimi, parafrasi o equivalenti in altre lingue.

**Ricerca semantica** — Ricerca basata sul significato anziché sui token. Una query per "come gestisco i timeout" può corrispondere a un documento intitolato "configurare le policy di retry" senza parole in comune, perché i loro embedding sono geometricamente vicini.

**Vettore** — Una lista di numeri. Nei contesti di ricerca, l'output di un modello di embedding. La "ricerca vettoriale" trova i vettori più vicini a un vettore di query in base alla distanza geometrica.

**FTS (Full-Text Search)** — La ricerca lessicale integrata di Postgres, basata su `tsvector` / `tsquery`. Tokenizza, applica lo stemming e indicizza il testo per query per parole chiave. Forte per prosa e ricerca di termini esatti; cieca al significato.

**BM25** — Un algoritmo di ranking per la ricerca lessicale (usato da Elasticsearch, Qdrant e altri). Assegna un punteggio ai risultati in base alla frequenza del termine ponderata rispetto a quanto è raro il termine nel corpus. Meglio della semplice corrispondenza per parole chiave; comunque lessicale.

**HNSW (Hierarchical Navigable Small World)** — L'indice standard per la ricerca approssimata del vicino più prossimo per la ricerca vettoriale. Costruisce un grafo di prossimità a livelli per query di similarità veloci e ad alto recall. pgvector, Qdrant, Weaviate e la maggior parte degli altri lo usano.

**RRF (Reciprocal Rank Fusion)** — Un algoritmo per unire liste di risultati classificate provenienti da più sistemi di recupero. Usa solo la posizione in classifica — nessuna normalizzazione del punteggio necessaria. Un risultato che si classifica in alto sia nelle liste FTS che in quelle vettoriali ottiene un punteggio combinato più forte di uno che domina solo una delle due.

---

## Come gli embedding trovano contenuti correlati

Gli embedding vettoriali convertono testo (o immagini, audio, ecc.) in una lista di numeri — un punto in uno spazio ad alta dimensionalità. Un modello di embedding è addestrato in modo che testo semanticamente correlato finisca vicino in quello spazio. "Dog" e "canine" finiscono vicini. "Running a marathon" e "running a Python script" finiscono lontani nonostante condividano una parola.

La ricerca di similarità in quello spazio trova documenti il cui *significato* è più vicino al significato della query, indipendentemente dalla sovrapposizione esatta delle parole.

Questo significa:
- "How do I configure request timeouts?" può corrispondere a un articolo intitolato "Setting connection limits and retry policies" — nessuna parola chiave in comune, alta rilevanza concettuale
- "Something light for a summer evening" può corrispondere a una raccomandazione di vino senza che nessuna parola chiave compaia nella descrizione del prodotto
- Una query in inglese può corrispondere a documenti rilevanti in francese, spagnolo o giapponese se il modello di embedding è stato addestrato multilingue

La ricerca lessicale (`tsvector`, `pg_trgm`) non può fare nulla di tutto ciò. Opera su parole e caratteri, non sul significato. Gli strumenti non sono intercambiabili — risolvono problemi diversi.

---

## Quando pgvector vince

**Costruire RAG.** La Retrieval-Augmented Generation recupera i chunk di documenti il cui significato è più vicino alla domanda dell'utente, poi li passa a un modello linguistico come contesto. Questo passo di recupero è un'operazione vettoriale. FTS perderà parafrasi, sinonimi e corrispondenze concettuali che un chunk rilevante potrebbe esprimere diversamente. Il vantaggio di pgvector rispetto a un vector store autonomo: gira all'interno della tua istanza Postgres esistente — nessun servizio separato da distribuire, gestire o in cui sincronizzare i dati.

**Gli utenti descrivono ciò che vogliono, non ciò che cercano.** "Articles about building confidence as a new manager" non ha parole chiave che compaiono in modo affidabile nei post rilevanti. "A lightweight framework for handling side effects" potrebbe non usare quelle parole esatte nella documentazione. La ricerca vettoriale corrisponde all'intento, non all'ortografia.

**Trovare elementi simili.** Prodotti correlati, ticket di supporto simili, segnalazioni di bug duplicate, articoli che potrebbero interessarti. "Find issues similar to this one" è una ricerca del vicino più prossimo — incorpora l'elemento, trova i suoi vicini geometrici. Un'avvertenza importante: la ricerca vettoriale restituisce sempre risultati, anche quando nulla è realmente simile. Per casi d'uso di deduplicazione e raccomandazione, filtra con una soglia di similarità minima (es. similarità coseno ≥ 0.80) per evitare di far emergere corrispondenze a bassa confidenza come se fossero significative.

**Deduplicazione semantica.** Prima di indicizzare contenuti per RAG o ricerca, spesso devi identificare quasi-duplicati nel corpus — articoli revisionati più volte, ticket di supporto presentati due volte, voci della knowledge base che si sovrappongono in modo significativo. Incorpora i documenti e filtra per soglia usando la similarità coseno per segnalare o unire quasi-duplicati prima che inquinino il tuo indice. Questo impedisce al recupero di restituire più chunk quasi identici e di diluire la finestra di contesto.

**Ricerca multilingue.** I modelli di embedding multilingue mappano contenuti semanticamente equivalenti tra lingue in vettori vicini. Una query in spagnolo per "perder peso" può corrispondere a un articolo in inglese su "sustainable weight loss habits" — nessun token condiviso, stesso significato di fondo. FTS richiede una configurazione del dizionario per lingua e gestisce male le query cross-lingua. `pg_trgm` è agnostico rispetto alla lingua ma ortografico, non semantico.

### Configurare pgvector

Dall'installazione dell'estensione alla query di similarità, la configurazione è un pugno di istruzioni SQL:

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

`<=>` è la distanza coseno. `1 - cosine_distance` dà la similarità coseno (1.0 = identico, 0.0 = ortogonale). Per `ivfflat` (l'alternativa più vecchia e più veloce da costruire), usa `lists = sqrt(row_count)` come punto di partenza.

### Dove la ricerca vettoriale restituisce la risposta sbagliata

- Corrispondenza esatta dei token — SKU di prodotto, codici di errore, nomi di funzioni. `ORD-12345` non è semanticamente simile a nulla. Una ricerca basata su embedding può restituire `ORD-12344` o nulla di rilevante. Usa FTS o un indice B-tree.
- Nomi e nomi propri. Lo spazio degli embedding organizza per significato, non per ortografia. Il record utente "Micheal Jordan" non necessariamente si colloca vicino a "Michael Jordan" nello spazio vettoriale.
- Stringhe brevi dove la similarità a livello di caratteri conta più del significato. `pg_trgm` gestisce questo.
- Query in cui il termine esatto deve apparire. BM25 e FTS sono più affidabili per la corrispondenza di termini noti.

---

## Combinare parole chiave e vettori per query miste

La documentazione tecnica è l'esempio più chiaro in cui nessuno dei due strumenti è sufficiente da solo.

Gli utenti che cercano "come configurare i timeout" hanno bisogno di una corrispondenza concettuale: un articolo intitolato "Impostare policy di retry e limiti di connessione" non ha parole chiave in comune ma è esattamente ciò di cui hanno bisogno.

Gli stessi utenti cercano anche `withRetry()`, `ECONNRESET` e `ERR_SOCKET_TIMEOUT`. Queste stringhe esatte devono apparire — la corrispondenza semantica potrebbe non trovarle in modo affidabile, e un falso positivo (concettualmente simile ma non l'API giusta) è attivamente fuorviante.

La ricerca vettoriale gestisce le query concettuali. FTS gestisce i termini esatti. Nessuno dei due gestisce bene entrambi da solo.

La soluzione è la ricerca ibrida: eseguire entrambi e fondere i risultati.

### Unire i risultati classificati con RRF

**Reciprocal Rank Fusion (RRF)** è l'algoritmo standard per combinare liste classificate provenienti da sistemi di recupero diversi. Non richiede di normalizzare i punteggi tra sistemi — utilizza solo le posizioni in classifica. Un risultato che appare in alto in *entrambe* le liste ottiene un punteggio combinato più forte di uno che domina solo una.

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

Il `60` al denominatore è la costante RRF. Valori più alti attenuano le differenze di posizione in classifica; valori più bassi le amplificano. Il valore predefinito di 60 funziona bene per la maggior parte dei tipi di contenuto.

RRF evita il problema più difficile di normalizzare `ts_rank` (un punteggio di frequenza logaritmica) rispetto alla distanza coseno (una misura geometrica). Non sono comparabili. RRF chiede solo: "quanto in alto è apparso questo risultato in ciascuna lista?"

### Aggiungere trigrammi per errori di battitura e nomi

Per la ricerca rivolta all'utente su contenuti misti — dove gli utenti potrebbero cercare il nome di una persona, un concetto o un termine esatto nella stessa sessione — la fusione a tre vie li gestisce tutti:

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

Questo gestisce: corrispondenze fuzzy di nomi (trigrammi), corrispondenze esatte di parole chiave (FTS) e query concettuali (vettoriale). Una singola casella di ricerca può servire tutti e tre gli intenti dell'utente.

---

## Abbinare ogni superficie di ricerca ai suoi tipi di query

Le applicazioni reali raramente hanno un'unica superficie di ricerca. Ne hanno multiple, ciascuna con un'esigenza diversa:

| Superficie | Cosa cercano gli utenti | Livelli consigliati |
|---|---|---|
| Ricerca su blog / documentazione | Parole chiave + concetti | FTS + pgvector (RRF) |
| Ricerca per nome utente/cliente | Nomi con errori di battitura | `pg_trgm` |
| Ricerca prodotti | Nomi, descrizioni, "simile a" | `pg_trgm` + FTS + pgvector |
| Deduplicazione ticket di supporto | "Problemi simili a questo" | solo pgvector |
| Ricerca interna SKU/ordini | Identificatori esatti | Indice B-tree |
| RAG su una grande base di conoscenza | Domande in linguaggio naturale | pgvector (documenti suddivisi in chunk) |
| E-commerce "potrebbe piacerti anche" | Similarità comportamentale + semantica | pgvector |
| Completamento automatico | Prefisso, tollerante agli errori di ortografia | `pg_trgm` |

Non sono ipotetici. La maggior parte delle applicazioni ricche di contenuti necessita di almeno due superfici di ricerca distinte con forme di query diverse. La tentazione è scegliere un approccio e usarlo ovunque — di solito ora la ricerca vettoriale, dato che è la scelta di moda. Questo porta a embedding costosi per problemi in cui un indice a trigrammi sarebbe stato più veloce, più economico e più corretto.

### Aggiungere un livello di ricerca quando un tipo di query fallisce

Aggiungi un livello quando compare una modalità di errore che il livello attuale non può correggere:

- Gli utenti si lamentano che gli errori di battitura non corrispondono → aggiungi `pg_trgm`
- Gli utenti cercano per concetto e perdono risultati rilevanti → aggiungi pgvector
- Gli utenti cercano simboli o codici esatti e ottengono invece risultati concettuali → aggiungi FTS o verifica se stai facendo troppo affidamento sulla ricerca vettoriale
- La latenza diventa un problema → valuta il pre-filtraggio, indici approssimati o un archivio dedicato

---

## Quando andare oltre pgvector

pgvector gestisce molta ricerca applicativa prima che tu abbia bisogno di un altro database. Il limite approssimativo dipende dal numero di vettori, dalle impostazioni dell'indice, dalla frequenza di scrittura, dai filtri, dall'hardware e dalla concorrenza, quindi considera qualsiasi regola "sotto i 10 milioni di vettori" come un'ipotesi di partenza da testare con benchmark, non come un limite di prodotto. Quando lo superi davvero — concorrenza molto elevata, requisiti di latenza p99 molto bassi, miliardi di vettori o serie esigenze di isolamento multi-tenant — il panorama dei database vettoriali dedicati è ampio e vale la pena comprenderlo.

### Come leggere il confronto

**Ricerca ibrida** significa che la ricerca per parole chiave BM25 e la similarità vettoriale vengono eseguite in un'unica query, unite tramite RRF. Senza di essa, o scegli un solo modalità di ricerca o fondi tu stesso due query.

**Vettori sparsi** vanno oltre BM25. Un vettore sparso SPLADE ha ~30.000 dimensioni (una per termine del vocabolario), ~98% zeri. Le posizioni non nulle ti dicono quali termini contano e quanto. Una query per "dogs" pesa anche "canine" e "pet" — precisione a livello BM25 più espansione dei termini all'interno di un indice vettoriale. Se questa colonna è falsa, hai bisogno di un livello FTS separato per query su termini esatti.

```python
# SPLADE: ~30,000 dims, ~60 non-zero — only relevant vocabulary positions fire
def encode_splade(text: str) -> dict:
    tokens = tokenizer(text, return_tensors="pt", truncation=True, max_length=512)
    with torch.no_grad():
        output = model(**tokens)
    vec = torch.log1p(torch.relu(output.logits)).max(dim=1).values.squeeze()
    return {"indices": vec.nonzero().squeeze().tolist(), "values": vec[vec != 0].tolist()}
```

**SQL / SQL-like** riguarda in realtà il filtraggio. La ricerca vettoriale senza filtri è una demo. Hai comunque bisogno di ambito tenant, intervalli di date, permessi e filtri per categoria. SQL completo (pgvector, LanceDB) esprime questo accanto ai tuoi join esistenti. I database specializzati usano oggetti filtro JSON (Qdrant, Pinecone), un DSL di query (Elasticsearch, Milvus) o GraphQL (Weaviate). Funzionano; SQL diventa più attraente man mano che la logica di filtro si complica.

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

**Multimodale nativo** significa che il database include modelli di embedding per contenuti non testuali. Gli passi un URL di immagine grezzo; gestisce la vettorizzazione. La maggior parte dei database è agnostica rispetto agli embedding — possiedi tu la pipeline di embedding. Marqo e Weaviate (tramite moduli CLIP/ImageBind) chiudono questo ciclo.

```python
# Marqo: POST raw images, query with text — no external embedding step
mq.index("products").add_documents(
    [{"id": "shoe-001", "image": "https://cdn.example.com/shoes/001.jpg"}],
    tensor_fields=["image"]
)
results = mq.index("products").search(q="lightweight shoes for summer")
# Returns shoe-001 despite zero keyword overlap — CLIP handles the cross-modal match
```

**Indice basato su disco** è una leva di costo. Gli indici HNSW residenti in RAM possono richiedere diversi GB di RAM per milione di vettori a 1536 dimensioni una volta contati vettori grezzi, overhead del grafo e metadati. Le alternative native su disco (Milvus DiskANN, Elasticsearch DiskBBQ, il formato Lance di LanceDB, il tier object storage di Turbopuffer) spesso scambiano un po' di latenza delle query con un costo infrastrutturale inferiore. Per carichi di lavoro RAG dove la latenza del modello domina già, questo compromesso vale spesso la pena di essere testato con benchmark.

**Dimensioni massime** è una migrazione nascosta nella tua architettura. `text-embedding-3-large` usa 3072 dimensioni, Jina v3 può emettere embedding più grandi, e i modelli di ricerca continuano a spingere verso l'alto. Alcuni servizi gestiti pubblicano limiti massimi di dimensioni; altri documentano limiti elevati o nessun limite pratico per i tipici modelli di embedding. Controlla la documentazione attuale prima di impegnarti. Scegli qualcosa con margine; migrare un indice vettoriale perché hai raggiunto un tetto di dimensioni è uno sprint doloroso.

### Compromessi operativi che la tabella non può mostrare

**Il multi-tenancy di Turbopuffer** è costruito attorno a un numero molto elevato di namespace. Il suo posizionamento pubblico e le storie dei clienti enfatizzano carichi di lavoro come il corpus ampio e ricco di namespace di Notion. Se ogni utente o organizzazione necessita di ricerca vettoriale isolata, quell'architettura può cambiare l'economia, ma testa comunque con benchmark la forma del tuo tenant.

**La modalità embedded di LanceDB** è la cosa più vicina a "SQLite per la ricerca vettoriale". Funziona in-process, non richiede un server e opera in Lambda, Cloudflare Workers e ambienti edge. Il formato colonnare Lance rende l'operazione embedded pratica su scala reale.

**Chroma è più forte in dev/test e piccoli deployment di app.** Se punti a corpora molto grandi, HA, operazioni ad alto utilizzo di disco o ricerca ibrida di prim'ordine, valuta uno store orientato alla produzione prima di promuovere il prototipo in infrastruttura.

**Vespa è ciò a cui ricorri quando il retrieval è solo metà del prodotto.** Combina retrieval lessicale, ricerca nearest-neighbor, tensori, espressioni di ranking, raggruppamento e serving online. Quel potere è reale, ma lo è anche la complessità operativa e di modellazione. Si adatta più a team di search/recommendation che a "aggiungi ricerca semantica alla mia app CRUD".

**ClickHouse entra nella conversazione quando la ricerca è legata all'analytics.** Se la tua fonte di verità sono eventi, log, tracce o metriche, ClickHouse mantiene distanza vettoriale, filtraggio, aggregazione e indicizzazione full-text seria in un unico motore SQL. Non è un database vettoriale purpose-built, ma spesso è la risposta noiosa e giusta per il retrieval analitico.

**I vettori sparsi sono il modo per ottenere un matching di parole chiave di qualità BM25 all'interno di un indice vettoriale** — senza eseguire un motore full-text separato. Qdrant ed Elasticsearch hanno implementazioni particolarmente mature in questo. Se la ricerca ibrida è critica e un'architettura a due sistemi è un ostacolo insormontabile, il supporto ai vettori sparsi è ciò che devi cercare.

### Scegli uno Store in base al Carico di Lavoro

- **Prodotto SaaS con isolamento per tenant** → Turbopuffer
- **Filtraggio complesso di metadati su larga scala** → Qdrant
- **Già su stack Elastic/ELK** → Elasticsearch con DiskBBQ
- **Realtà AWS che vuole open-source** → OpenSearch
- **Piattaforma di search/recommendation con serie esigenze di ranking** → Vespa
- **Analytics, observability, ricerca su log/eventi** → ClickHouse
- **Scala miliardaria on-prem / self-hosted** → Milvus
- **Edge / serverless / multimodale** → LanceDB
- **Piccola app JS, sito di documentazione o UX di ricerca edge-native** → Orama
- **Zero ops, il costo è secondario** → Pinecone
- **Multimodale-first (immagini, video, audio)** → Marqo
- **Già su MongoDB** → Atlas Vector Search
- **Già su Postgres, serve più margine** → Supabase Vector o Neon (entrambi pgvector gestito, con tooling migliore)

---

## Non incorporare ID e aspettarti corrispondenze esatte

Non usare la ricerca vettoriale come ricerca testuale fuzzy per cose che hanno risposte corrette.

"Trovami l'utente con email `dan@example.com`" non è un problema di ricerca vettoriale. "Trova l'ordine con ID `ORD-12345`" non lo è nemmeno. Incorporare `ORD-12345` e cercare per similarità coseno restituirà *qualcosa* — ma potrebbe essere sbagliato. Un identificatore ha una risposta corretta. Una corrispondenza approssimativa su un identificatore è un bug.

La ricerca vettoriale restituisce la cosa *più simile* nel tuo dataset, anche quando nulla è effettivamente rilevante. Non sa quando non esiste una buona risposta. Va bene per documenti correlati. È un problema serio per la ricerca esatta di record, dove una risposta sbagliata ma sicura è peggio di un risultato vuoto.

Lo stesso vale nella direzione opposta: non usare FTS per query in cui l'utente sta descrivendo un concetto. "articoli su come prendere decisioni difficili in condizioni di incertezza" non contiene parole chiave affidabili. FTS restituirà rumore o nulla. Usa lo strumento giusto per la forma della query.

---

## Costruisci la ricerca intorno alla forma della query

La maggior parte dei sistemi di ricerca in produzione ha bisogno di più di un livello:

- **`pg_trgm`** per nomi, refusi, autocomplete
- **FTS / `pg_search`** per ricerca testuale basata su parole chiave
- **pgvector** per query semantiche e concettuali
- **Fusione RRF** per superfici in cui gli utenti mescolano tipi di query
- **Indici regolari** per identificatori esatti, filtri ed elenchi ordinati

Non sono strumenti in competizione. Sono complementari. Un sistema di ricerca ben costruito sceglie il livello giusto per ogni forma di query — e quando le forme di query si sovrappongono, esegue più livelli e fonde i risultati.

I team che rilasciano buone funzionalità di ricerca comprendono l'intero stack. Quelli che non lo fanno si rivolgono a un database vettoriale, incorporano tutto e si chiedono perché le ricerche esatte a volte restituiscono il record sbagliato.
````
