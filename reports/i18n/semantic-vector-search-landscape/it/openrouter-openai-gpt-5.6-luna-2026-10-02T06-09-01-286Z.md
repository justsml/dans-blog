# Translation Candidate
- Slug: semantic-vector-search-landscape
- Locale: it
- Model: openrouter/openai/gpt-5.6-luna
- Target: src/content/posts/2026-05-01--semantic-vector-search-landscape/it/index.mdx
- Validation: deferred
- Runtime seconds: 82.19
- Input tokens: 12698
- Output tokens: 8014
- Thinking tokens: unknown
- Cached input tokens: 3213
- Cache write tokens: 9470
- Estimated cost: $0.011578
- Pricing source: openrouter-2026-09-22
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
title: Ricerca vettoriale semantica e altri argomenti per conquistare amici e amanti
subTitle: >-
  Il panorama completo della ricerca: esatta, fuzzy, semantica, ibrida — e
  quando combinarle tutte.
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
La ricerca non è una cosa sola, e la ricerca semantica non sostituisce tutto il resto.

## Panoramica della ricerca vettoriale: confronto tra 16 opzioni

Confronta modalità di deployment, licenza, capacità di ricerca e adeguatezza ai diversi workload. Le spiegazioni delle colonne e gli esempi SQL seguono più avanti.

[Come leggere questo confronto](#come-leggere-questo-confronto)

| Database | Deployment | Licenza | Ricerca ibrida | Vettori sparsi | Interfaccia di query | Embedding multimodale integrato | Indice su disco | Limiti sulla dimensionalità dei vettori | Ideale per |
|---|---|---|---|---|---|---|---|---|---|
| **[pgvector](https://github.com/pgvector/pgvector)** | Self-host / gestito (Supabase, Neon, RDS) | OSS (PostgreSQL) | Manuale (RRF via SQL) | ❌ | ✅ SQL completo | ❌ | ✅ HNSW su disco | 16.000 per lo storage; 2.000 indicizzati con `vector` | Chi è già su Postgres; quantità moderate di vettori |
| **[Qdrant](https://github.com/qdrant/qdrant)** | Self-host / Cloud | Apache 2.0 | ✅ BM25 nativo | ✅ Supporto maturo | ❌ (REST/gRPC) | ❌ | ✅ | 65.535 | Query filtrate su larga scala; metadati complessi |
| **[Weaviate](https://github.com/weaviate/weaviate)** | Self-host / Cloud | BSD 3 | ✅ BM25 nativo + RRF | ✅ | ❌ (GraphQL / gRPC) | ✅ tramite moduli | ✅ | 65.535 | Pattern di accesso GraphQL; vettorializzazione integrata |
| **[Pinecone](https://www.pinecone.io/)** | Solo Cloud | Proprietaria | ✅ (aggiunta nel 2024) | ✅ | ❌ | ❌ | ✅ (serverless) | 20.000 | Semplicità gestita; nessun team operations |
| **[Milvus](https://github.com/milvus-io/milvus) / [Zilliz](https://zilliz.com/)** | Self-host / Cloud (Zilliz) | Apache 2.0 | ✅ Nativa | ✅ | ✅ Simile a SQL (Milvus Query Language) | ✅ | ✅ DiskANN | 32.768 | Scala di miliardi di elementi; on-prem enterprise |
| **[Chroma](https://github.com/chroma-core/chroma)** | Embedded / self-host | Apache 2.0 | ❌ | ❌ | ❌ | ❌ | ❌ | 65.535 | Solo sviluppo locale e prototipazione |
| **[LanceDB](https://github.com/lancedb/lancedb)** | Embedded / Cloud | Apache 2.0 | ✅ | ❌ | ✅ SQL tramite DataFusion | ✅ Nativa | ✅ (formato Lance) | Illimitata | Edge / serverless; lakehouse multimodale |
| **[Orama](https://github.com/oramasearch/orama)** | Embedded / Cloud | Apache 2.0 | ✅ Full-text + vettoriale | ❌ | ❌ | ❌ | ❌ | Variabile | App JavaScript/edge; ricerca leggera per siti e app |
| **[Turbopuffer](https://turbopuffer.com/)** | Solo Cloud (serverless) | Proprietaria | ✅ BM25 + vettoriale | ❌ | ❌ | ❌ | ✅ (object storage) | 16.000 | SaaS multi-tenant; milioni di namespace |
| **[Elasticsearch](https://github.com/elastic/elasticsearch)** | Self-host / Elastic Cloud | SSPL / AGPLv3 | ✅ RRF + ELSER sparso | ✅ (ELSER) | ✅ Query DSL | ❌ | ✅ DiskBBQ | 4.096 | Chi è già sullo stack Elastic; ricerca enterprise ibrida |
| **[OpenSearch](https://github.com/opensearch-project/OpenSearch)** | Self-host / gestito da AWS | Apache 2.0 | ✅ RRF + Neural Search | ✅ | ✅ Query DSL | ❌ | ✅ FAISS + HNSW | 16.000 | Ambienti AWS-native; alternativa open source a Elastic |
| **[Vespa](https://github.com/vespa-engine/vespa)** | Self-host / Cloud | Apache 2.0 | ✅ Nativa | ✅ Tensor / ranking lessicale | ✅ YQL | ✅ Tensor | ✅ | Di fatto illimitata | Sistemi di ricerca + ranking + raccomandazione |
| **[ClickHouse](https://github.com/ClickHouse/ClickHouse)** | Self-host / Cloud | Apache 2.0 | Manuale | ❌ | ✅ SQL completo | ❌ | ✅ Colonnare + HNSW | Variabile | Analytics/log con ricerca vettoriale accanto all'OLAP |
| **[MongoDB Atlas](https://github.com/mongodb/mongo)** | Cloud / self-host | SSPL | ✅ Integrata | ❌ | ✅ MQL + aggregazione | ❌ | ✅ HNSW | 8.192 | Chi è già su MongoDB; documenti + vettori in un unico sistema |
| **[Redis (VSS)](https://github.com/redis/redis)** | Self-host / Redis Cloud | RSALv2 / SSPL | ✅ (RediSearch) | ✅ | ❌ | ❌ | ❌ Solo RAM | 32.768 | Latenza ultra-bassa; ricerca vettoriale nel livello cache |
| **[Marqo](https://github.com/marqo-ai/marqo)** | Cloud / self-host | Apache 2.0 | ✅ | ❌ | ❌ | ✅ Focus nativo | ✅ | Variabile | Multimodale end-to-end: immagini + testo + video |

“Trova l'utente con l'email `dan@example.com`” e “trovami articoli sul debugging per chi è un ingegnere alle prime armi” vengono entrambi descritti come ricerca, ma come problemi ingegneristici hanno ben poco in comune. Nel primo caso esiste una risposta corretta e una ricerca su indice `O(log n)`. Nel secondo non esiste una risposta corretta: esiste solo la rilevanza, e serve comprendere linguaggio, intento e significato.

Gli ingegneri più convincenti quando si prendono decisioni sulla ricerca — quelli che vincono le discussioni e realizzano il sistema giusto — conoscono l'intero panorama. Sanno quale strumento usare e perché, e sanno spiegarlo con chiarezza.

Questo articolo tratta il livello semantico: cosa fa davvero la ricerca vettoriale, quando è la scelta migliore e quando dovrebbe restare fuori dai piedi. La versione utile non è “fare l'embedding di tutto”. È sapere quando i vettori devono affiancare la ricerca lessicale, fuzzy ed exact-match in un'architettura ibrida.

La metà lessicale e fuzzy del problema — `tsvector`, `pg_trgm`, `pg_search` — è trattata nella [Guida alla ricerca testuale in Postgres 2026](/postgres-text-search-guide).

---

## Termini usati in questa guida

**Embedding** — Un elenco denso di numeri in virgola mobile prodotto da un modello, che rappresenta un testo (o un'immagine, un audio e così via) come un punto in uno spazio ad alta dimensionalità. I contenuti semanticamente correlati finiscono vicini; quelli non correlati finiscono lontani.

**Ricerca lessicale** — Ricerca basata sulla corrispondenza esatta di parole e token. È veloce, deterministica e corretta per i termini noti. Non comprende sinonimi, parafrasi o equivalenti tra lingue diverse.

**Ricerca semantica** — Ricerca basata sul significato anziché sui token. Una query come “come gestisco i timeout” può trovare un documento intitolato “configurazione delle policy di retry” senza alcuna parola in comune, perché i rispettivi embedding sono geometricamente vicini.

**Vettore** — Un elenco di numeri. Nel contesto della ricerca, è l'output di un modello di embedding. La “ricerca vettoriale” trova i vettori più vicini a un vettore di query in base alla distanza geometrica.

**FTS (Full-Text Search)** — La ricerca lessicale integrata di Postgres, basata su `tsvector` / `tsquery`. Tokenizza, riconduce le parole alla radice e indicizza il testo per le query basate su keyword. È efficace per la prosa e la ricerca di termini esatti; non sa nulla del significato.

**BM25** — Un algoritmo di ranking per la ricerca lessicale (usato da Elasticsearch, Qdrant e altri). Assegna un punteggio ai risultati in base alla frequenza del termine, pesata rispetto alla sua rarità nell'intero corpus. È migliore della semplice corrispondenza di keyword; resta comunque lessicale.

**HNSW (Hierarchical Navigable Small World)** — L'indice standard per la ricerca approssimata dei vicini più prossimi nei vettori. Costruisce un grafo di prossimità a livelli per eseguire rapidamente query di similarità con alta probabilità di recupero. Lo usano pgvector, Qdrant, Weaviate e quasi tutti gli altri.

**RRF (Reciprocal Rank Fusion)** — Un algoritmo per combinare liste di risultati ordinate provenienti da più sistemi di retrieval. Usa solo la posizione in classifica: non serve normalizzare i punteggi. Un risultato che si trova in alto sia nella lista FTS sia in quella vettoriale riceve un punteggio combinato più alto rispetto a uno che prevale nettamente in una sola delle due.

---

## Come gli embedding trovano contenuti correlati

Gli embedding vettoriali convertono il testo (o immagini, audio e così via) in una lista di numeri: un punto in uno spazio ad alta dimensionalità. Un modello di embedding viene addestrato in modo che i testi semanticamente correlati finiscano vicini in quello spazio. "Dog" e "canine" finiscono vicini. "Running a marathon" e "running a Python script" finiscono lontani, nonostante condividano una parola.

La ricerca per similarità in quello spazio individua i documenti il cui *significato* è più vicino a quello della query, indipendentemente dalla sovrapposizione esatta delle parole.

Questo significa che:
- "Come configuro i timeout delle richieste?" può trovare un articolo intitolato "Impostazione dei limiti di connessione e delle policy di retry": nessuna keyword in comune, ma alta rilevanza concettuale
- "Qualcosa di leggero per una sera d'estate" può trovare una raccomandazione di vini anche se nella descrizione del prodotto non compare nessuna delle keyword
- Una query in inglese può trovare documenti rilevanti in francese, spagnolo o giapponese, se il modello di embedding è stato addestrato su più lingue

La ricerca lessicale (`tsvector`, `pg_trgm`) non può fare nulla di tutto questo. Opera su parole e caratteri, non sul significato. Gli strumenti non sono intercambiabili: risolvono problemi diversi.

---

## Quando pgvector è la scelta giusta

**Per costruire sistemi RAG.** La Retrieval-Augmented Generation recupera i chunk di documenti il cui significato è più vicino alla domanda dell'utente, poi li passa a un modello linguistico come contesto. Questo passaggio di retrieval è un'operazione vettoriale. FTS non trova parafrasi, sinonimi e corrispondenze concettuali che un chunk rilevante potrebbe esprimere in modo diverso. Il vantaggio di pgvector rispetto a un vector store separato: gira dentro l'istanza Postgres che già usi; non devi fare il deploy, gestire o sincronizzare i dati con un servizio aggiuntivo.

**Quando gli utenti descrivono ciò che vogliono, non cosa cercare.** "Articoli su come costruire la fiducia in sé come nuovo manager" non contiene keyword che compaiano in modo affidabile nei post pertinenti. "Un framework leggero per gestire gli effetti collaterali" potrebbe non usare quelle parole esatte nella documentazione. La ricerca vettoriale cerca l'intento, non l'ortografia.

**Per trovare elementi simili.** Prodotti correlati, ticket di supporto simili, segnalazioni di bug duplicate, articoli che potrebbero interessarti. "Trova issue simili a questa" è una ricerca dei vicini più prossimi: incorpori l'elemento e trovi i suoi vicini geometrici. Una precisazione importante: la ricerca vettoriale restituisce sempre dei risultati, anche quando nulla è davvero simile. Nei casi d'uso di deduplicazione e raccomandazione, filtra in base a una soglia minima di similarità (ad esempio, similarità coseno ≥ 0,80) per evitare di presentare corrispondenze poco affidabili come se avessero un significato.

**Deduplicazione semantica.** Prima di indicizzare contenuti per RAG o ricerca, spesso devi identificare i quasi-duplicati nel corpus: articoli revisionati più volte, ticket di supporto aperti due volte, voci della knowledge base con una sovrapposizione significativa. Genera gli embedding dei documenti e applica una soglia sulla similarità coseno per segnalare o unire i quasi-duplicati prima che contaminino l'indice. In questo modo eviti che il retrieval restituisca più chunk quasi identici e diluisca il contesto disponibile.

**Ricerca multilingue.** I modelli di embedding multilingue mappano contenuti semanticamente equivalenti in lingue diverse su vettori vicini. Una query in spagnolo per "perder peso" può trovare un articolo in inglese sulle "abitudini sostenibili per perdere peso": nessun token condiviso, stesso significato di fondo. FTS richiede una configurazione del dizionario per ogni lingua e gestisce male le query cross-language. `pg_trgm` è indipendente dalla lingua, ma opera sull'ortografia, non sulla semantica.

### Configurare pgvector

Dall'installazione dell'estensione alla query di similarità, la configurazione richiede una manciata di istruzioni SQL:

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

`<=>` è la distanza coseno. `1 - cosine_distance` restituisce la similarità coseno (1,0 = identico, 0,0 = ortogonale). Per `ivfflat` (l'alternativa più vecchia e più rapida da costruire), usa `lists = sqrt(row_count)` come punto di partenza.

### Dove la ricerca vettoriale restituisce la risposta sbagliata

- Corrispondenza esatta dei token: SKU di prodotto, codici di errore, nomi di funzione. `ORD-12345` non è semanticamente simile a nulla. Una ricerca basata su embedding potrebbe restituire `ORD-12344` oppure niente di rilevante. Usa FTS o un indice B-tree.
- Nomi e nomi propri. Lo spazio degli embedding si organizza in base al significato, non all'ortografia. Il record dell'utente "Micheal Jordan" non finisce necessariamente vicino a "Michael Jordan" nello spazio vettoriale.
- Stringhe brevi, per le quali la somiglianza a livello di caratteri conta più del significato. `pg_trgm` gestisce bene questo caso.
- Query in cui il termine esatto deve comparire. BM25 e FTS sono più affidabili per la corrispondenza di termini noti.

---

## Combina parole chiave e vettori per le query miste

La documentazione tecnica è l'esempio più chiaro di un caso in cui nessuno dei due strumenti è sufficiente da solo.

Chi cerca "come configurare i timeout" ha bisogno di una corrispondenza concettuale: un articolo intitolato "Configurare le policy di retry e i limiti di connessione" non contiene parole chiave in comune, ma è esattamente quello che serve.

Gli stessi utenti cercano anche `withRetry()`, `ECONNRESET` ed `ERR_SOCKET_TIMEOUT`. Queste stringhe esatte devono comparire: la corrispondenza semantica potrebbe non trovarle in modo affidabile e un falso positivo — concettualmente simile, ma riferito all'API sbagliata — è fuorviante in modo concreto.

La ricerca vettoriale gestisce le query concettuali. FTS gestisce i termini esatti. Nessuno dei due, da solo, gestisce bene entrambi i casi.

La soluzione è la ricerca ibrida: esegui entrambe le ricerche e combina i risultati.

### Unisci i risultati classificati con RRF

La **Reciprocal Rank Fusion (RRF)** è l'algoritmo standard per combinare liste classificate provenienti da sistemi di retrieval diversi. Non richiede di normalizzare i punteggi tra i sistemi: usa soltanto le posizioni in classifica. Un risultato che compare in alto in *entrambe* le liste riceve un punteggio combinato maggiore rispetto a uno che domina in una sola.

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

Il `60` al denominatore è la costante RRF. Valori più alti attenuano le differenze tra le posizioni in classifica; valori più bassi le amplificano. Il valore predefinito, 60, funziona bene per la maggior parte dei tipi di contenuto.

RRF evita il problema più difficile di normalizzare `ts_rank` — un punteggio basato sulla frequenza logaritmica — rispetto alla distanza coseno, una misura geometrica. Non sono confrontabili. RRF chiede soltanto: "quanto in alto è comparso questo risultato in ciascuna lista?"

### Aggiungi i trigrammi per refusi e nomi

Per la ricerca rivolta agli utenti su contenuti misti — in cui, nella stessa sessione, si può cercare il nome di una persona, un concetto o un termine esatto — la fusione a tre vie gestisce tutti i casi:

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

Gestisce corrispondenze fuzzy dei nomi (trigrammi), corrispondenze esatte delle parole chiave (FTS) e query concettuali (vettori). Una singola casella di ricerca può servire tutti e tre gli intenti degli utenti.

---

## Associa ogni superficie di ricerca ai relativi tipi di query

Le applicazioni reali hanno raramente una sola superficie di ricerca. Ne hanno diverse, ciascuna con esigenze differenti:

| Superficie | Cosa cercano gli utenti | Livelli consigliati |
|---|---|---|
| Ricerca in blog / documentazione | Parole chiave + concetti | FTS + pgvector (RRF) |
| Ricerca di nomi di utenti/clienti | Nomi con refusi | `pg_trgm` |
| Ricerca prodotti | Nomi, descrizioni, "simile a" | `pg_trgm` + FTS + pgvector |
| Deduplicazione dei ticket di supporto | "Problemi simili a questo" | Solo pgvector |
| Ricerca interna di SKU/ordini | Identificatori esatti | Indice B-tree |
| RAG su una knowledge base ampia | Domande in linguaggio naturale | pgvector (documenti suddivisi in chunk) |
| "Potrebbe piacerti anche" nell'e-commerce | Similarità comportamentale + semantica | pgvector |
| Autocomplete | Prefisso, tolleranza agli errori ortografici | `pg_trgm` |

Non sono casi ipotetici. La maggior parte delle applicazioni ricche di contenuti ha almeno due superfici di ricerca distinte, con forme di query differenti. La tentazione è scegliere un unico approccio e usarlo ovunque — di solito oggi la ricerca vettoriale, perché è la scelta di moda. Il risultato sono embedding costosi per problemi in cui un indice trigram sarebbe stato più veloce, più economico e più corretto.

### Aggiungi un livello di ricerca quando un tipo di query fallisce

Aggiungi un livello quando compare una modalità di errore che quello attuale non può risolvere:

- Gli utenti lamentano che i refusi non producono corrispondenze → aggiungi `pg_trgm`
- Gli utenti cercano per concetto e non trovano risultati pertinenti → aggiungi pgvector
- Gli utenti cercano simboli o codici esatti e ricevono invece risultati concettuali → aggiungi FTS o verifica se stai facendo eccessivo affidamento sulla ricerca vettoriale
- La latenza diventa un problema → valuta il pre-filtering, gli indici approssimati o un datastore dedicato

---

## Quando andare oltre pgvector

pgvector copre gran parte delle esigenze di ricerca applicativa prima che serva un altro database. La soglia indicativa dipende dal numero di vettori, dalle impostazioni dell'indice, dalla frequenza di scrittura, dai filtri, dall'hardware e dalla concorrenza; quindi considera qualunque regola del tipo "meno di 10 milioni di vettori" come un'ipotesi iniziale da verificare con benchmark, non come un limite del prodotto. Quando lo superi davvero — concorrenza molto elevata, requisiti di latenza p99 molto bassa, miliardi di vettori o esigenze serie di isolamento tra tenant — il panorama dei database vettoriali dedicati è ampio e vale la pena conoscerlo.

### Come leggere il confronto

**Ricerca ibrida** significa eseguire la ricerca per parole chiave BM25 e la similarità vettoriale in un'unica query, combinandole tramite RRF. Senza questa funzione, devi scegliere una sola modalità di ricerca oppure fondere manualmente due query.

**I vettori sparsi** vanno oltre BM25. Un vettore sparso SPLADE ha circa 30.000 dimensioni (una per ogni termine del vocabolario), di cui circa il 98% è composto da zeri. Le posizioni non nulle indicano quali termini contano e in quale misura. Una query per "dogs" assegna peso anche a "canine" e "pet": precisione a livello BM25 più espansione dei termini all'interno di un indice vettoriale. Se questa colonna è false, ti serve un livello FTS separato per le query basate sui termini esatti.

```python
# SPLADE: ~30,000 dims, ~60 non-zero — only relevant vocabulary positions fire
def encode_splade(text: str) -> dict:
    tokens = tokenizer(text, return_tensors="pt", truncation=True, max_length=512)
    with torch.no_grad():
        output = model(**tokens)
    vec = torch.log1p(torch.relu(output.logits)).max(dim=1).values.squeeze()
    return {"indices": vec.nonzero().squeeze().tolist(), "values": vec[vec != 0].tolist()}
```

**SQL / simile a SQL** riguarda in realtà il filtraggio. La ricerca vettoriale senza filtri è una demo. Servono comunque l'ambito del tenant, gli intervalli di date, i permessi e i filtri per categoria. Il SQL completo (pgvector, LanceDB) permette di esprimere tutto questo accanto alle join già esistenti. I database progettati per questo scopo usano oggetti filtro JSON (Qdrant, Pinecone), una query DSL (Elasticsearch, Milvus) o GraphQL (Weaviate). Funzionano; il SQL diventa più interessante quando la logica dei filtri si fa complessa.

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

**Multimodale nativo** significa che il database include modelli di embedding per contenuti non testuali. Gli passi l'URL di un'immagine grezza e si occupa della vettorizzazione. La maggior parte dei database è agnostica rispetto agli embedding: la pipeline di embedding resta a tuo carico. Marqo e Weaviate (tramite i moduli CLIP/ImageBind) chiudono questo anello.

```python
# Marqo: POST raw images, query with text — no external embedding step
mq.index("products").add_documents(
    [{"id": "shoe-001", "image": "https://cdn.example.com/shoes/001.jpg"}],
    tensor_fields=["image"]
)
results = mq.index("products").search(q="lightweight shoes for summer")
# Returns shoe-001 despite zero keyword overlap — CLIP handles the cross-modal match
```

**L'indice basato su disco** è una leva per i costi. Gli indici HNSW residenti in RAM possono richiedere diversi GB di RAM per ogni milione di vettori a 1536 dimensioni, una volta conteggiati i vettori grezzi, l'overhead del grafo e i metadati. Le alternative native su disco (Milvus DiskANN, Elasticsearch DiskBBQ, il formato Lance di LanceDB, il livello di object storage di Turbopuffer) spesso scambiano una parte della latenza di query con costi infrastrutturali inferiori. Per i workload RAG, in cui la latenza del modello domina già il tempo totale, questo compromesso merita spesso un benchmark.

**Il numero massimo di dimensioni** nasconde una migrazione nella tua architettura. `text-embedding-3-large` usa 3072 dimensioni, Jina v3 può produrre embedding più grandi e i modelli di ricerca continuano a spingere verso valori superiori. Alcuni servizi gestiti pubblicano limiti rigidi sulle dimensioni; altri documentano limiti elevati o nessun limite pratico per i modelli di embedding più comuni. Controlla la documentazione aggiornata prima di impegnarti. Scegli qualcosa che lasci margine: migrare un indice vettoriale perché hai raggiunto il limite dimensionale è uno sprint doloroso.

### Compromessi operativi che la tabella non mostra

**Il multi-tenancy di Turbopuffer** è progettato attorno a un numero molto elevato di namespace. Il suo posizionamento pubblico e le storie dei clienti mettono in evidenza workload come il corpus ampio e ricco di namespace di Notion. Se ogni utente o organizzazione ha bisogno di una ricerca vettoriale isolata, quell'architettura può cambiare l'economia del sistema, ma devi comunque fare benchmark sulla forma reale dei tuoi tenant.

**La modalità embedded di LanceDB** è la cosa più vicina a "SQLite per la ricerca vettoriale". Viene eseguita in-process, non richiede un server e funziona in Lambda, Cloudflare Workers e negli ambienti edge. Il formato colonnare Lance rende praticabile l'esecuzione embedded anche a una scala reale.

**Chroma dà il meglio di sé nello sviluppo, nei test e nei deployment di piccole applicazioni.** Se punti a corpus molto grandi, alta disponibilità, un funzionamento fortemente basato su disco o una ricerca ibrida di primo livello, valuta un motore orientato alla produzione prima di trasformare il prototipo in infrastruttura.

**Vespa è la scelta giusta quando il retrieval è solo metà del prodotto.** Combina retrieval lessicale, ricerca dei vicini più prossimi, tensori, espressioni di ranking, raggruppamento e serving online. Questa potenza è reale, ma lo sono anche la complessità operativa e quella della modellazione. È più adatto ai team che si occupano di ricerca e recommendation che a chi vuole semplicemente "aggiungere la ricerca semantica alla propria app CRUD".

**ClickHouse entra in gioco quando la ricerca è legata all'analisi.** Se la tua source of truth è costituita da eventi, log, trace o metriche, ClickHouse riunisce distanza vettoriale, filtri, aggregazioni e indicizzazione full-text seria in un unico motore SQL. Non è un database vettoriale specializzato, ma spesso è la risposta banalmente corretta per il retrieval analitico.

**I vettori sparsi sono il modo per ottenere un keyword matching di qualità BM25 all'interno di un indice vettoriale**, senza gestire un motore full-text separato. Qdrant ed Elasticsearch offrono implementazioni particolarmente mature in questo ambito. Se la ricerca ibrida è fondamentale e un'architettura a due sistemi è fuori discussione, il supporto ai vettori sparsi è ciò che devi cercare.

### Scegliere un motore in base al workload

- **Prodotto SaaS con isolamento per tenant** → Turbopuffer
- **Filtri complessi sui metadati su larga scala** → Qdrant
- **Stack Elastic/ELK già in uso** → Elasticsearch con DiskBBQ
- **Azienda AWS che vuole l'open source** → OpenSearch
- **Piattaforma di ricerca/recommendation con esigenze serie di ranking** → Vespa
- **Analytics, observability, ricerca di log/eventi** → ClickHouse
- **Scala da miliardi di elementi on-prem / self-hosted** → Milvus
- **Edge / serverless / multimodale** → LanceDB
- **Piccola app JS, sito di documentazione o UX di ricerca edge-native** → Orama
- **Zero operazioni, il costo è secondario** → Pinecone
- **Multimodale per impostazione (immagini, video, audio)** → Marqo
- **MongoDB già in uso** → Atlas Vector Search
- **Postgres già in uso, ma serve più margine di crescita** → Supabase Vector o Neon (entrambi gestiti con pgvector e dotati di strumenti migliori)

---

## Non fare l'embedding degli ID aspettandoti match esatti

Non usare la ricerca vettoriale come ricerca testuale fuzzy per dati che hanno una risposta corretta.

"Trova l'utente con l'email `dan@example.com`" non è un problema di ricerca vettoriale. Neppure "Trova l'ordine con ID `ORD-12345`". Fare l'embedding di `ORD-12345` e cercare per similarità coseno restituirà *qualcosa*, ma potrebbe essere sbagliato. Un identificatore ha una risposta corretta. Un match approssimato su un identificatore è un bug.

La ricerca vettoriale restituisce l'elemento *più simile* nel dataset, anche quando nulla è davvero pertinente. Non sa riconoscere quando non esiste una buona risposta. Per i documenti correlati va bene. È un problema serio per il lookup esatto dei record, dove una risposta sbagliata ma sicura di sé è peggiore di un risultato vuoto.

Lo stesso vale nella direzione opposta: non usare FTS per query in cui l'utente sta descrivendo un concetto. "Articoli su come prendere decisioni difficili in condizioni di incertezza" non contiene keyword affidabili. FTS restituirà rumore oppure nulla. Usa lo strumento adatto alla forma della query.

---

## Costruisci la ricerca attorno alla forma della query

La maggior parte dei sistemi di ricerca in produzione richiede più di un livello:

- **`pg_trgm`** per nomi, refusi e autocompletamento
- **FTS / `pg_search`** per la ricerca di prosa basata su keyword
- **pgvector** per query semantiche e concettuali
- **Fusione RRF** per le superfici in cui gli utenti combinano tipi diversi di query
- **Indici normali** per identificatori esatti, filtri ed elenchi ordinati

Non sono strumenti concorrenti. Sono complementari. Un sistema di ricerca ben progettato sceglie il livello giusto per ogni forma di query e, quando le forme si sovrappongono, esegue più livelli e fonde i risultati.

I team che rilasciano buone funzionalità di ricerca comprendono l'intero stack. Gli altri scelgono un database vettoriale, fanno l'embedding di tutto e poi si chiedono perché i lookup esatti restituiscano a volte il record sbagliato.
````
