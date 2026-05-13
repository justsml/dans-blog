# Translation Candidate
- Slug: semantic-vector-search-landscape
- Locale: it
- Model: deepseek/deepseek-v4-flash
- Target: src/content/posts/2026-05-01--semantic-vector-search-landscape/it/index.mdx
- Validation: deferred
- Runtime seconds: 226.29
- Input tokens: 14290
- Output tokens: 16092
- Thinking tokens: unknown
- Cached input tokens: 768
- Cache write tokens: 0
- Estimated cost: $0.006401
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
title: Ricerca vettoriale semantica e altri argomenti per conquistare amici e amanti
subTitle: >-
  L'intero panorama della ricerca: esatta, fuzzy, semantica, ibrida — e quando
  stratificarle tutte.
date: '2026-05-01'
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
popularity: 0.8
social_image: ../desktop-social.webp
cover_full_width: ../wide.webp
cover_mobile: ../square.webp
cover_icon: ../square.webp
---
La ricerca non è una cosa sola, e la ricerca semantica non sostituisce tutto il resto.

"Trova l'utente con email `dan@example.com`" e "trovami articoli sul debugging per un nuovo ingegnere" sono entrambi descritti come ricerca, ma non hanno quasi nulla in comune come problemi ingegneristici. Il primo ha una risposta corretta e una ricerca su indice `O(log n)`. Il secondo non ha una risposta corretta — solo rilevanza — e richiede comprensione del linguaggio, dell'intento e del significato.

Gli ingegneri più persuasivi nelle decisioni sulla ricerca — quelli che vincono le discussioni e rilasciano il sistema giusto — comprendono l'intero panorama. Sanno quale strumento usare e perché, e sanno spiegarlo chiaramente.

Questo articolo copre il livello semantico: cosa fa realmente la ricerca vettoriale, quando vince e dove dovrebbe stare fuori dai piedi. La versione utile non è "embedda tutto". È sapere quando i vettori devono affiancare la ricerca lessicale, fuzzy e per corrispondenza esatta in un'architettura ibrida.

La metà lessicale e fuzzy del quadro — `tsvector`, `pg_trgm`, `pg_search` — si trova in [Postgres Text Searching Guide 2026](../postgres-text-search-guide).

---

## Termini in sintesi

**Embedding** — Un elenco denso di numeri a virgola mobile prodotto da un modello, che rappresenta un pezzo di testo (o immagine, audio, ecc.) come un punto in uno spazio ad alta dimensionalità. Contenuti semanticamente correlati si trovano vicini; contenuti non correlati si trovano lontani.

**Ricerca lessicale** — Ricerca basata sulla corrispondenza esatta di parole e token. Veloce, deterministica e corretta per termini noti. Non comprende sinonimi, parafrasi o equivalenti interlinguistici.

**Ricerca semantica** — Ricerca basata sul significato piuttosto che sui token. Una query per "come gestisco i timeout" può corrispondere a un documento intitolato "configurazione delle politiche di retry" senza parole in comune, perché i loro embedding sono geometricamente vicini.

**Vettore** — Un elenco di numeri. In contesti di ricerca, l'output di un modello di embedding. "Ricerca vettoriale" trova i vettori più vicini a un vettore query tramite distanza geometrica.

**FTS (Full-Text Search)** — La ricerca lessicale integrata di Postgres, basata su `tsvector` / `tsquery`. Tokenizza, applica stemming e indicizza il testo per query su parole chiave. Efficace per testi in prosa e ricerca di termini esatti; cieca al significato.

**BM25** — Un algoritmo di ranking per la ricerca lessicale (usato da Elasticsearch, Qdrant e altri). Assegna punteggi ai risultati in base alla frequenza del termine ponderata rispetto alla sua rarità nell'intero corpus. Meglio della corrispondenza esatta di parole chiave; comunque lessicale.

**HNSW (Hierarchical Navigable Small World)** — L'indice standard di approssimazione del vicino più prossimo per la ricerca vettoriale. Costruisce un grafo di prossimità a strati per query di similarità veloci e con alto richiamo. pgvector, Qdrant, Weaviate e la maggior parte degli altri lo utilizzano.

**RRF (Reciprocal Rank Fusion)** — Un algoritmo per unire liste di risultati ordinati provenienti da più sistemi di recupero. Utilizza solo la posizione in classifica — nessuna normalizzazione del punteggio necessaria. Un risultato che si classifica in alto sia nelle liste FTS che in quelle vettoriali ottiene un punteggio combinato più forte di uno che domina in una sola.

---

## Cosa Fa Realmente la Ricerca Semantica

Gli embedding vettoriali convertono il testo (o immagini, audio, ecc.) in un elenco di numeri — un punto in uno spazio ad alta dimensionalità. Un modello di embedding è addestrato in modo che testi semanticamente correlati si trovino vicini in quello spazio. "Cane" e "canino" finiscono vicini. "Correre una maratona" e "eseguire uno script Python" finiscono lontani nonostante condividano una parola.

La ricerca di similarità in quello spazio trova documenti il cui *significato* è più vicino al significato della query, indipendentemente dalla sovrapposizione esatta di parole.

Questo significa:
- "Come configuro i timeout delle richieste?" può corrispondere a un articolo intitolato "Impostazione dei limiti di connessione e delle politiche di retry" — nessuna parola chiave in comune, alta rilevanza concettuale
- "Qualcosa di leggero per una sera d'estate" può corrispondere a un consiglio sul vino senza che alcuna parola chiave appaia nella descrizione del prodotto
- Una query in inglese può corrispondere a documenti pertinenti in francese, spagnolo o giapponese se il modello di embedding è stato addestrato in modo multilingue

La ricerca lessicale (`tsvector`, `pg_trgm`) non può fare nulla di tutto ciò. Opera su parole e caratteri, non sul significato. Gli strumenti non sono intercambiabili: risolvono problemi diversi.

---

## Quando pgvector Vince

**Costruire RAG.** La Retrieval-Augmented Generation recupera i chunk di documento il cui significato è più vicino alla domanda dell'utente, poi li passa a un modello linguistico come contesto. Questo passo di recupero è un'operazione vettoriale. La FTS (full-text search) perderà parafrasi, sinonimi e corrispondenze concettuali che un chunk rilevante potrebbe esprimere diversamente. Il vantaggio di pgvector rispetto a un archivio vettoriale autonomo: funziona all'interno della tua istanza Postgres esistente — nessun servizio separato da distribuire, gestire o con cui sincronizzare i dati.

**Gli utenti descrivono cosa vogliono, non cosa cercare.** "Articoli su come costruire fiducia come nuovo manager" non ha parole chiave che appaiano in modo affidabile nei post pertinenti. "Un framework leggero per gestire gli effetti collaterali" potrebbe non usare quelle parole esatte nella documentazione. La ricerca vettoriale corrisponde all'intento, non all'ortografia.

**Trovare elementi simili.** Prodotti correlati, ticket di supporto simili, segnalazioni di bug duplicate, articoli che potrebbero piacerti. "Trova problemi simili a questo" è una ricerca del vicino più prossimo: incorpora l'elemento, trova i suoi vicini geometrici. Un avvertimento importante: la ricerca vettoriale restituisce sempre risultati, anche quando nulla è realmente simile. Per i casi d'uso di deduplicazione e raccomandazione, filtra con una soglia minima di similarità (ad esempio, similarità coseno ≥ 0,80) per evitare di presentare corrispondenze a bassa confidenza come se fossero significative.

**Deduplicazione semantica.** Prima di indicizzare contenuti per RAG o ricerca, spesso è necessario identificare quasi-duplicati nel corpus — articoli rivisti più volte, ticket di supporto presentati due volte, voci della knowledge base che si sovrappongono significativamente. Incorpora i documenti e filtra per soglia di similarità coseno per segnalare o unire i quasi-duplicati prima che inquinino il tuo indice. Questo impedisce al recupero di restituire più chunk quasi identici e di diluire la finestra di contesto.

**Ricerca multilingue.** I modelli di embedding multilingue mappano contenuti semanticamente equivalenti tra lingue diverse in vettori vicini. Una query in spagnolo per "perder peso" può corrispondere a un articolo inglese su "sustainable weight loss habits" — nessun token condiviso, stesso significato sottostante. La FTS richiede configurazioni di dizionario per lingua e gestisce male le query cross-lingua. `pg_trgm` è indipendente dalla lingua ma ortografico, non semantico.

### Configurare pgvector

Dall'installazione dell'estensione alla query di similarità, la configurazione è una manciata di istruzioni SQL:

```sql
CREATE EXTENSION IF NOT EXISTS vector;

ALTER TABLE documents ADD COLUMN embedding vector(1536);

-- HNSW è di solito il primo indice da provare per dataset di dimensioni moderate
CREATE INDEX documents_embedding_idx
  ON documents USING hnsw (embedding vector_cosine_ops);

-- Query di ricerca semantica
SELECT id, title, 1 - (embedding <=> $1::vector) AS similarity
FROM documents
ORDER BY embedding <=> $1::vector
LIMIT 10;
```

`<=>` è la distanza coseno. `1 - distanza_coseno` restituisce la similarità coseno (1.0 = identico, 0.0 = ortogonale). Per `ivfflat` (l'alternativa più vecchia e più veloce da costruire), usa `lists = sqrt(numero_righe)` come punto di partenza.

### Cosa pgvector non gestisce bene

- Matching esatto di token — SKU di prodotto, codici errore, nomi di funzione. `ORD-12345` non è semanticamente simile a nulla. Una ricerca basata su embedding potrebbe restituire `ORD-12344` o niente di rilevante. Usa FTS o un indice B-tree.
- Nomi e nomi propri. Lo spazio degli embedding organizza per significato, non per ortografia. Il record utente "Micheal Jordan" non cade necessariamente vicino a "Michael Jordan" nello spazio vettoriale.
- Stringhe corte dove la similarità a livello di carattere conta più del significato. `pg_trgm` gestisce questo caso.
- Query in cui il termine esatto deve apparire. BM25 e FTS sono più affidabili per il matching di termini noti.

---

## Ricerca ibrida: il caso per entrambi

La documentazione tecnica è l'esempio più chiaro in cui nessuno dei due strumenti basta da solo.

Gli utenti che cercano "come configurare i timeout" hanno bisogno di un matching concettuale: un articolo intitolato "Impostare politiche di retry e limiti di connessione" non ha parole chiave sovrapposte, ma è esattamente ciò di cui hanno bisogno.

Gli stessi utenti cercano anche `withRetry()`, `ECONNRESET` e `ERR_SOCKET_TIMEOUT`. Queste stringhe esatte devono apparire — il matching semantico potrebbe non trovarle in modo affidabile, e un falso positivo (concettualmente simile ma non l'API giusta) è attivamente fuorviante.

La ricerca vettoriale gestisce le query concettuali. La FTS gestisce i termini esatti. Nessuno dei due gestisce bene entrambi da solo.

La soluzione è la ricerca ibrida: esegui entrambe e fonde i risultati.

### Fusione a Rango Reciproco

**La Fusione a Rango Reciproco (RRF)** è l'algoritmo standard per combinare liste ordinate provenienti da diversi sistemi di recupero. Non richiede la normalizzazione dei punteggi tra i sistemi — utilizza solo le posizioni in classifica. Un risultato che appare in alto in *entrambe* le liste ottiene un punteggio combinato più forte di uno che domina solo una lista.

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

Il `60` al denominatore è la costante RRF. Valori più alti attenuano le differenze di posizione; valori più bassi le amplificano. Il valore predefinito di 60 funziona bene per la maggior parte dei tipi di contenuto.

RRF evita il problema più complesso di normalizzare `ts_rank` (un punteggio log-frequenza) rispetto alla distanza coseno (una misura geometrica). Non sono confrontabili. RRF chiede solo: "quanto in alto è apparso questo risultato in ciascuna lista?"

### Ricerca Ibrida anche con Trigrammi

Per la ricerca rivolta all'utente su contenuti misti — dove gli utenti potrebbero cercare un nome di persona, un concetto o un termine esatto nella stessa sessione — la fusione a tre vie gestisce tutto:

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

Questo gestisce: corrispondenze approssimative di nomi (trigrammi), corrispondenze esatte di parole chiave (FTS) e query concettuali (vettore). Una singola casella di ricerca può servire tutti e tre gli intenti dell'utente.

---

## Architetture Ibride a Più Strati

Le applicazioni reali raramente hanno un'unica superficie di ricerca. Ne hanno molteplici, ciascuna con esigenze diverse:

| Superficie | Cosa cercano gli utenti | Livelli consigliati |
|---|---|---|
| Blog / documentazione | Parole chiave + concetti | FTS + pgvector (RRF) |
| Ricerca utenti/clienti per nome | Nomi con errori di battitura | `pg_trgm` |
| Ricerca prodotti | Nomi, descrizioni, "simile a" | `pg_trgm` + FTS + pgvector |
| Deduplicazione ticket di supporto | "Problemi simili a questo" | Solo pgvector |
| Ricerca SKU/ordini interni | Identificatori esatti | Indice B-tree |
| RAG su knowledge base estesa | Domande in linguaggio naturale | pgvector (documenti chunked) |
| E-commerce "potrebbe piacerti anche" | Similarità comportamentale + semantica | pgvector |
| Autocompletamento | Prefisso, tolleranza ortografica | `pg_trgm` |

Non sono ipotesi. La maggior parte delle applicazioni con molti contenuti necessita di almeno due superfici di ricerca distinte con forme di query differenti. La tentazione è scegliere un approccio e usarlo ovunque — di solito ora la ricerca vettoriale, perché è la scelta di moda. Questo porta a embedding costosi per problemi in cui un indice trigramma sarebbe stato più veloce, più economico e più corretto.

### La Regola Pratica

Aggiungi un livello quando appare una modalità di fallimento che il livello corrente non può risolvere:

- Gli utenti si lamentano che gli errori di battitura non vengono riconosciuti → aggiungi `pg_trgm`
- Gli utenti cercano per concetto e perdono risultati rilevanti → aggiungi pgvector
- Gli utenti cercano simboli o codici esatti e ottengono invece risultati concettuali → aggiungi FTS o verifica se stai abusando della ricerca vettoriale
- La latenza diventa un problema → valuta pre-filtraggio, indici approssimati o un archivio dedicato

---

## Se Ti Serve Davvero un Archivio Vettoriale Dedicato

pgvector gestisce molta ricerca applicativa prima che tu abbia bisogno di un altro database. Il limite approssimativo dipende dal numero di vettori, dalle impostazioni dell'indice, dal tasso di scrittura, dai filtri, dall'hardware e dalla concorrenza, quindi tratta qualsiasi regola del tipo "sotto i 10M vettori" come un'ipotesi di partenza da verificare con benchmark, non come un limite di prodotto. Quando lo superi davvero — concorrenza molto alta, requisiti di latenza p99 molto bassi, miliardi di vettori o esigenze serie di isolamento multi-tenant — il panorama dei database vettoriali dedicati è ampio e vale la pena comprenderlo.

### Cosa Significano Realmente le Colonne della Matrice

**Ricerca ibrida** significa che la ricerca per parole chiave BM25 e la similarità vettoriale vengono eseguite in un'unica query, unite tramite RRF. Senza di essa, o scegli una modalità di ricerca o fondi tu stesso due query.

**Vettori sparsi** vanno oltre BM25. Un vettore sparso SPLADE ha circa 30.000 dimensioni (una per termine del vocabolario), con circa il 98% di zeri. Le posizioni non nulle indicano quali termini contano e quanto. Una query per "cani" pesa anche "canino" e "animale domestico" — precisione a livello BM25 più espansione dei termini all'interno di un indice vettoriale. Se questa colonna è falsa, hai bisogno di un layer FTS separato per le query a termini esatti.

```python
# SPLADE: ~30.000 dim, ~60 non nulli — solo le posizioni del vocabolario rilevanti si attivano
def encode_splade(text: str) -> dict:
    tokens = tokenizer(text, return_tensors="pt", truncation=True, max_length=512)
    with torch.no_grad():
        output = model(**tokens)
    vec = torch.log1p(torch.relu(output.logits)).max(dim=1).values.squeeze()
    return {"indices": vec.nonzero().squeeze().tolist(), "values": vec[vec != 0].tolist()}
```

**SQL / simile a SQL** riguarda essenzialmente il filtraggio. La ricerca vettoriale senza filtri è una demo. Hai ancora bisogno di ambito tenant, intervalli di date, permessi e filtri per categoria. SQL completo (pgvector, LanceDB) esprime questo accanto ai tuoi join esistenti. I database specializzati usano oggetti JSON per i filtri (Qdrant, Pinecone), un DSL di query (Elasticsearch, Milvus) o GraphQL (Weaviate). Funzionano; SQL diventa più interessante man mano che la logica di filtro si complica.

```sql
-- pgvector: la similarità vettoriale è solo un'altra espressione
SELECT id, title, 1 - (embedding <=> $1) AS score
FROM documents
WHERE tenant_id = $2
  AND category = ANY($3::text[])
  AND created_at > NOW() - INTERVAL '90 days'
ORDER BY embedding <=> $1
LIMIT 10;
```

```python
# Qdrant: filtro equivalente come oggetto Python — stesso risultato, più cerimonia
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

**Multimodale nativo** significa che il database include modelli di embedding per contenuti non testuali. Gli passi un URL di immagine grezzo; gestisce la vettorizzazione. La maggior parte dei database è agnostica rispetto agli embedding — gestisci tu la pipeline di embedding. Marqo e Weaviate (tramite moduli CLIP/ImageBind) chiudono questo ciclo.

```python
# Marqo: POST immagini grezze, query con testo — nessun passaggio di embedding esterno
mq.index("products").add_documents(
    [{"id": "shoe-001", "image": "https://cdn.example.com/shoes/001.jpg"}],
    tensor_fields=["image"]
)
results = mq.index("products").search(q="scarpe leggere per l'estate")
# Restituisce shoe-001 nonostante zero sovrapposizione di parole chiave — CLIP gestisce la corrispondenza cross-modale
```

**Indice su disco** è una leva di costo. Gli indici HNSW residenti in RAM possono richiedere diversi GB di RAM per milione di vettori a 1536 dimensioni, una volta contati vettori grezzi, overhead del grafo e metadati. Le alternative native su disco (Milvus DiskANN, Elasticsearch DiskBBQ, formato Lance di LanceDB, tier di object storage di Turbopuffer) spesso scambiano un po' di latenza di query per un costo infrastrutturale inferiore. Per carichi di lavoro RAG dove la latenza del modello domina già, questo compromesso vale spesso la pena di essere benchmarkato.

**Dimensioni massime** è una migrazione nascosta nella tua architettura. `text-embedding-3-large` usa 3072 dim, Jina v3 può emettere embedding più grandi, e i modelli di ricerca continuano a spingere più in alto. Alcuni servizi gestiti pubblicano limiti di dimensione rigidi; altri documentano limiti alti o nessun limite pratico per i modelli di embedding tipici. Controlla la documentazione corrente prima di impegnarti. Scegli qualcosa con margine; migrare un indice vettoriale perché hai raggiunto un tetto dimensionale è uno sprint doloroso.

_Ultima verifica rispetto alla documentazione pubblica dei progetti e alle pagine dei prodotti il 8 maggio 2026. Considera la tabella seguente come un aiuto decisionale, non un sostituto per verificare limiti correnti, prezzi e flag di funzionalità dei servizi gestiti._

### Il Panorama

| Database | Distribuzione | Licenza | Ricerca Ibrida | Vettori Sparsi | SQL / simile a SQL | Multimodale | Indice su Disco | Dim Max | Punto di Forza |
|---|---|---|---|---|---|---|---|---|---|
| **[pgvector](https://github.com/pgvector/pgvector)** | Self-host / gestito (Supabase, Neon, RDS) | OSS (PostgreSQL) | Manuale (RRF via SQL) | ❌ | ✅ SQL completo | ❌ | ✅ HNSW su disco | 16.000 storage; 2.000 indicizzati `vector` | Già su Postgres; conteggi vettoriali moderati |
| **[Qdrant](https://github.com/qdrant/qdrant)** | Self-host / Cloud | Apache 2.0 | ✅ BM25 nativo | ✅ Supporto maturo | ❌ (REST/gRPC) | ❌ | ✅ | 65.535 | Query filtrate su larga scala; metadati complessi |
| **[Weaviate](https://github.com/weaviate/weaviate)** | Self-host / Cloud | BSD 3 | ✅ BM25 nativo + RRF | ✅ | ❌ (GraphQL / gRPC) | ✅ tramite moduli | ✅ | 65.535 | Pattern di accesso GraphQL; vettorizzazione integrata |
| **[Pinecone](https://www.pinecone.io/)** | Solo Cloud | Proprietario | ✅ (aggiunto 2024) | ✅ | ❌ | ❌ | ✅ (serverless) | 20.000 | Semplicità gestita; nessun team operativo |
| **[Milvus](https://github.com/milvus-io/milvus) / [Zilliz](https://zilliz.com/)** | Self-host / Cloud (Zilliz) | Apache 2.0 | ✅ Nativo | ✅ | ✅ Simile a SQL (Milvus Query Language) | ✅ | ✅ DiskANN | 32.768 | Scala miliardaria; enterprise on-prem |
| **[Chroma](https://github.com/chroma-core/chroma)** | Embedded / self-host | Apache 2.0 | ❌ | ❌ | ❌ | ❌ | ❌ | 65.535 | Solo sviluppo locale e prototipazione |
| **[LanceDB](https://github.com/lancedb/lancedb)** | Embedded / Cloud | Apache 2.0 | ✅ | ❌ | ✅ SQL via DataFusion | ✅ Nativo | ✅ (formato Lance) | Illimitato | Edge / serverless; lakehouse multimodale |
| **[Orama](https://github.com/oramasearch/orama)** | Embedded / Cloud | Apache 2.0 | ✅ Testo completo + vettore | ❌ | ❌ | ❌ | ❌ | Variabile | App JS/edge; ricerca leggera su sito/app |
| **[Turbopuffer](https://turbopuffer.com/)** | Solo Cloud (serverless) | Proprietario | ✅ BM25 + vettore | ❌ | ❌ | ❌ | ✅ (object storage) | 16.000 | SaaS multi-tenant; milioni di namespace |
| **[Elasticsearch](https://github.com/elastic/elasticsearch)** | Self-host / Elastic Cloud | SSPL / AGPLv3 | ✅ RRF + ELSER sparso | ✅ (ELSER) | ✅ Query DSL | ❌ | ✅ DiskBBQ | 4.096 | Già su stack Elastic; ricerca enterprise ibrida |
| **[OpenSearch](https://github.com/opensearch-project/OpenSearch)** | Self-host / AWS gestito | Apache 2.0 | ✅ RRF + Neural Search | ✅ | ✅ Query DSL | ❌ | ✅ FAISS + HNSW | 16.000 | Nativo AWS; alternativa open-source a Elastic |
| **[Vespa](https://github.com/vespa-engine/vespa)** | Self-host / Cloud | Apache 2.0 | ✅ Nativo | ✅ Tensori / ranking lessicale | ✅ YQL | ✅ Tensori | ✅ | Effettivamente illimitato | Sistemi di ricerca + ranking + raccomandazione |
| **[ClickHouse](https://github.com/ClickHouse/ClickHouse)** | Self-host / Cloud | Apache 2.0 | Manuale | ❌ | ✅ SQL completo | ❌ | ✅ Columnar + HNSW | Variabile | Analytics/log con ricerca vettoriale accanto a OLAP |
| **[MongoDB Atlas](https://github.com/mongodb/mongo)** | Cloud / self-host | SSPL | ✅ Integrato | ❌ | ✅ MQL + aggregazione | ❌ | ✅ HNSW | 8.192 | Già su MongoDB; documento + vettore in uno |
| **[Redis (VSS)](https://github.com/redis/redis)** | Self-host / Redis Cloud | RSALv2 / SSPL | ✅ (RediSearch) | ✅ | ❌ | ❌ | ❌ Solo RAM | 32.768 | Latenza ultra-bassa; ricerca vettoriale a livello cache |
| **[Marqo](https://github.com/marqo-ai/marqo)** | Cloud / self-host | Apache 2.0 | ✅ | ❌ | ❌ | ✅ Focus nativo | ✅ | Variabile | Multimodale end-to-end: immagine + testo + video |

### Alcune Cose che Non Entrano nella Tabella

**La multi-tenancy di Turbopuffer** è costruita attorno a conteggi di namespace molto elevati. Il suo posizionamento pubblico e le storie dei clienti enfatizzano carichi di lavoro come il corpus ricco di namespace di Notion. Se ogni utente o organizzazione necessita di ricerca vettoriale isolata, quell'architettura può cambiare l'economia, ma fai comunque benchmark sulla tua forma tenant specifica.

**La modalità embedded di LanceDB** è la cosa più vicina a "SQLite per la ricerca vettoriale." Funziona in-process, non richiede server, e funziona in Lambda, Cloudflare Workers e ambienti edge. Il formato colonnare Lance rende pratica l'operatività embedded su scala reale.

**Chroma è più forte in ambienti di sviluppo/test e distribuzioni di piccole app.** Se punti a corpora molto grandi, alta disponibilità, operatività pesante su disco o ricerca ibrida di prima classe, valuta un database orientato alla produzione prima di promuovere il prototipo a infrastruttura.

**Vespa è ciò a cui ricorri quando il recupero è solo metà del prodotto.** Combina recupero lessicale, ricerca nearest-neighbor, tensori, espressioni di ranking, raggruppamento e serving online. Quel potere è reale, ma lo è anche la complessità operativa e di modellazione. Si adatta più a team di ricerca/raccomandazione che a "aggiungi ricerca semantica alla mia app CRUD."

**ClickHouse entra in gioco quando la ricerca è legata all'analisi.** Se la tua fonte di verità sono eventi, log, trace o metriche, ClickHouse mantiene distanza vettoriale, filtraggio, aggregazione e indicizzazione full-text seria in un unico motore SQL. Non è un database vettoriale specializzato, ma spesso la risposta noiosa ma giusta per il recupero analitico.

**I vettori sparsi sono il modo per ottenere un matching per parole chiave di qualità BM25 all'interno di un indice vettoriale** — senza eseguire un motore full-text separato. Qdrant ed Elasticsearch hanno implementazioni particolarmente mature qui. Se la ricerca ibrida è critica e un'architettura a due sistemi è un problema, il supporto per vettori sparsi è ciò da cercare.

### Scegliere quando pgvector non basta più

- **Prodotto SaaS con isolamento per tenant** → Turbopuffer
- **Filtraggio complesso di metadati su larga scala** → Qdrant
- **Già su stack Elastic/ELK** → Elasticsearch con DiskBBQ
- **Azienda AWS che vuole open-source** → OpenSearch
- **Piattaforma di ricerca/raccomandazione con esigenze di ranking serie** → Vespa
- **Analisi, osservabilità, ricerca log/eventi** → ClickHouse
- **On-prem/self-hosted su scala miliardaria** → Milvus
- **Edge/serverless/multimodale** → LanceDB
- **Piccola app JS, sito di documentazione o UX di ricerca edge-native** → Orama
- **Zero operazioni, costo secondario** → Pinecone
- **Primariamente multimodale (immagini, video, audio)** → Marqo
- **Già su MongoDB** → Atlas Vector Search
- **Già su Postgres, bisogno di più margine** → Supabase Vector o Neon (entrambi pgvector gestiti, con migliori strumenti)

---

## L'unica cosa da non fare

Non usare la ricerca vettoriale come ricerca testuale fuzzy per cose che hanno risposte corrette.

"Trovami l'utente con email `dan@example.com`" non è un problema di ricerca vettoriale. "Trova l'ordine con ID `ORD-12345`" non lo è nemmeno. Incorporare `ORD-12345` e cercare per similarità coseno restituirà *qualcosa* — ma potrebbe essere sbagliato. Un identificatore ha una risposta corretta. Una corrispondenza approssimativa su un identificatore è un bug.

La ricerca vettoriale restituisce la cosa *più simile* nel tuo dataset, anche quando nulla è effettivamente rilevante. Non sa quando non esiste una buona risposta. Va bene per documenti correlati. È un problema serio per la ricerca esatta di record, dove una risposta sbagliata con sicurezza è peggiore di un risultato vuoto.

Lo stesso vale nella direzione opposta: non usare FTS per query in cui l'utente descrive un concetto. "articoli su come prendere decisioni difficili in condizioni di incertezza" non contiene parole chiave affidabili. FTS restituirà rumore o nulla. Usa lo strumento giusto per la forma della query.

---

## Il Quadro Completo

La maggior parte dei sistemi di ricerca in produzione necessita di più di un livello:

- **`pg_trgm`** per nomi, errori di battitura, completamento automatico
- **FTS / `pg_search`** per la ricerca testuale basata su parole chiave
- **pgvector** per query semantiche e concettuali
- **Fusione RRF** per superfici in cui gli utenti mescolano tipi di query
- **Indici regolari** per identificatori esatti, filtri e liste ordinate

Questi non sono strumenti in competizione. Sono complementari. Un sistema di ricerca ben costruito sceglie il livello giusto per ogni forma di query — e quando le forme di query si sovrappongono, esegue più livelli e fonde i risultati.

I team che rilasciano buone funzionalità di ricerca comprendono l'intero stack. Quelli che non lo fanno prendono un database vettoriale, incorporano tutto, e si chiedono perché le ricerche esatte a volte restituiscono il record sbagliato.
````
