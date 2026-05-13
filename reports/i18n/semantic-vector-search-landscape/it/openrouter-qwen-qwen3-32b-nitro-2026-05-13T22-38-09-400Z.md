# Translation Candidate
- Slug: semantic-vector-search-landscape
- Locale: it
- Model: openrouter/qwen/qwen3-32b:nitro
- Target: src/content/posts/2026-05-01--semantic-vector-search-landscape/it/index.mdx
- Validation: deferred
- Runtime seconds: 31.60
- Input tokens: 14815
- Output tokens: 14479
- Thinking tokens: unknown
- Cached input tokens: 2048
- Cache write tokens: 0
- Estimated cost: $0.004660
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
title: Ricerca vettoriale semantica e altri argomenti per farsi amici e conquistare
subTitle: >-
  Il panorama completo delle ricerche: esatto, fuzzy, semantico, ibrido — e
  quando sovrapporli tutti.
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
La ricerca non è una cosa sola, e la ricerca semantica non è un sostituto per il resto.  

"Trova l'utente con email `dan@example.com`" e "trova articoli su come risolvere problemi come un nuovo ingegnere" vengono entrambi descritti come ricerca, ma come problemi di ingegneria hanno quasi niente in comune. La prima ha una risposta corretta e un'operazione di ricerca su indice in `O(log n)`. La seconda non ha una risposta corretta — solo rilevanza — e richiede di comprendere linguaggio, intento e significato.  

Gli ingegneri più persuasivi sulle decisioni di ricerca — quelli che vincono gli scontri e implementano il sistema giusto — comprendono l'intero panorama. Sanno quale strumento utilizzare e perché, e sanno spiegarlo chiaramente.  

Questo articolo copre il livello semantico: cosa fa effettivamente la ricerca vettoriale, quando vince e dove dovrebbe stare fuori. La versione utile non è "incapsula tutto". È conoscere quando i vettori appartengono accanto alla ricerca lessicale, fuzzy ed esatta in un'architettura ibrida.  

La metà lessicale e fuzzy del problema — `tsvector`, `pg_trgm`, `pg_search` — è trattata nella [Guida alla Ricerca Testuale in Postgres 2026](../postgres-text-search-guide).  

## Terminologia di riferimento  

**Embedding** — Una lista densa di numeri in virgola mobile prodotti da un modello, che rappresenta un pezzo di testo (o immagine, audio, ecc.) come un punto in uno spazio ad alta dimensione. Il contenuto semanticamente correlato si trova vicino; il contenuto non correlato si trova lontano.  

**Ricerca lessicale** — Ricerca basata su corrispondenza esatta di parole e token. Veloce, deterministica e corretta per termini noti. Non comprende sinonimi, riformulazioni o equivalenti tra lingue.  

**Ricerca semantica** — Ricerca basata su significato piuttosto che su token. Una query come "come gestisco i timeout" può corrispondere a un documento intitolato "configurare politiche di retry" senza parole in comune, perché i loro embedding sono geometricamente vicini.

**Vettore** — Una lista di numeri. Nel contesto della ricerca, l'output di un modello di embedding. "Ricerca vettoriale" trova i vettori più vicini a un vettore di query in base alla distanza geometrica.

**FTS (Full-Text Search)** — La ricerca lessicale integrata in Postgres, alimentata da `tsvector` / `tsquery`. Tokenizza, stemma e indice il testo per query a parole chiave. Efficace per testi narrativi e ricerche esatte; cieco al significato.

**BM25** — Un algoritmo di ranking per la ricerca lessicale (utilizzato da Elasticsearch, Qdrant e altri). Valuta i risultati in base alla frequenza dei termini pesata in base alla rarità del termine nel corpus. Migliore del confronto diretto di parole chiave; rimane lessicale.

**HNSW (Hierarchical Navigable Small World)** — L'indice standard di nearest-neighbor approssimato per la ricerca vettoriale. Costruisce un grafico di prossimità gerarchico per query di similarità veloci e ad alta ricchezza. pgvector, Qdrant, Weaviate e quasi tutti gli altri lo utilizzano.

**RRF (Reciprocal Rank Fusion)** — Un algoritmo per unire liste di risultati ordinati da diversi sistemi di recupero. Usa solo la posizione del ranking — non è richiesta normalizzazione dei punteggi. Un risultato che si posiziona alto sia in FTS che nella lista vettoriale ottiene un punteggio combinato più forte rispetto a uno che domina solo uno.

---

## Cosa Fa Effettivamente la Ricerca Semantica

Gli embedding vettoriali convertono testo (o immagini, audio, ecc.) in una lista di numeri — un punto nello spazio ad alta dimensione. Un modello di embedding è addestrato affinché testi semanticamente correlati si trovino vicini in questo spazio. "Cane" e "canino" finiscono vicini. "Correre un maratona" e "eseguire uno script Python" finiscono lontani nonostante condividano una parola.

La ricerca di similarità in questo spazio trova documenti il cui *significato* è più vicino al significato della query, indipendentemente dall'overlap esatto delle parole.

Questo significa:
- "Come configurare i timeout delle richieste?" può corrispondere a un articolo intitolato "Impostare i limiti di connessione e le politiche di retry" — nessuna parola in comune, alta rilevanza concettuale
- "Qualcosa di leggero per una sera estiva" può corrispondere a una raccomandazione di vino senza che nessuna parola appaia nella descrizione del prodotto
- Una query in inglese può corrispondere a documenti rilevanti in francese, spagnolo o giapponese se il modello di embedding è stato addestrato in modo multilingue

La ricerca lessicale (`tsvector`, `pg_trgm`) non può fare nulla di questo. Opera su parole e caratteri, non su significati. Gli strumenti non sono intercambiabili — risolvono problemi diversi.

---

## Quando pgvector Vincе

**Costruzione di RAG.** La Retrieval-Augmented Generation recupera i frammenti di documento il cui significato è più vicino alla domanda dell'utente, quindi li passa a un modello linguistico come contesto. Questo passo di recupero è un'operazione vettoriale. La ricerca testuale completa (FTS) mancherà parafrasi, sinonimi e corrispondenze concettuali che un frammento rilevante potrebbe esprimere in modo diverso. Il vantaggio di pgvector rispetto a un archivio vettoriale autonomo: funziona all'interno della tua istanza esistente di Postgres — nessun servizio separato da distribuire, operare o sincronizzare.

**Gli utenti descrivono ciò che vogliono, non ciò per cui cercare.** "Articoli su come costruire la fiducia come nuovo manager" non contiene parole chiave che appaiono in modo affidabile nei post rilevanti. "Un framework leggero per gestire effetti collaterali" potrebbe non usare esattamente quelle parole nella documentazione. La ricerca vettoriale corrisponde all'intento, non all'ortografia.

**Trovare elementi simili.** Prodotti correlati, ticket di supporto simili, segnalazioni di bug duplicate, articoli che potrebbero interessarti. "Trova problemi simili a questo" è una ricerca di vicini più prossimi — genera l'embedding dell'elemento e trova i suoi vicini geometrici. Un'importante avvertenza: la ricerca vettoriale restituisce sempre risultati, anche quando niente è effettivamente simile. Per casi d'uso come deduplicazione e raccomandazioni, filtra con una soglia minima di similarità (es. similarità del coseno ≥ 0.80) per evitare di mostrare corrispondenze a bassa confidenza come se fossero significative.

**Deduplicazione semantica.** Prima di indicizzare contenuti per RAG o ricerca, spesso è necessario identificare quasi-duplicati nel corpus — articoli rivisti più volte, ticket di supporto inviati due volte, voci della knowledge base che si sovrappongono significativamente. Genera gli embedding dei documenti e filtra per soglia di similarità del coseno per contrassegnare o unire quasi-duplicati prima che inquinino l'indice. Questo impedisce al recupero di restituire più frammenti quasi identici e di diluire la finestra di contesto.

**Ricerca multilingue.** I modelli di embedding multilingue mappano contenuti semanticamente equivalenti tra lingue in vettori vicini. Una query in spagnolo su "perder peso" può corrispondere a un articolo inglese su "abitudini per perdere peso in modo sostenibile" — nessun token condiviso, stesso significato sottostante. La FTS richiede configurazioni di dizionario per ogni lingua e gestisce male le query tra lingue. `pg_trgm` è agnostico rispetto alla lingua ma ortografico, non semantico.

### Configurazione di pgvector

Dall'installazione dell'estensione alla query di similarità, la configurazione richiede poche istruzioni SQL:

```sql
CREATE EXTENSION IF NOT EXISTS vector;

ALTER TABLE documents ADD COLUMN embedding vector(1536);

-- HNSW è di solito l'indice iniziale da provare per dataset di dimensioni moderate
CREATE INDEX documents_embedding_idx
  ON documents USING hnsw (embedding vector_cosine_ops);

-- Query di ricerca semantica
SELECT id, title, 1 - (embedding <=> $1::vector) AS similarity
FROM documents
ORDER BY embedding <=> $1::vector
LIMIT 10;
```

`<=>` è la distanza del coseno. `1 - cosine_distance` fornisce la similarità del coseno (1.0 = identico, 0.0 = ortogonale). Per `ivfflat` (l'alternativa più vecchia e veloce da costruire), usare `lists = sqrt(row_count)` come punto di partenza.

### Cosa pgvector Gestisce Male

- Corrispondenza esatta dei token — codici SKU dei prodotti, codici di errore, nomi di funzioni. `ORD-12345` non è semanticamente simile a nulla. Una ricerca basata su embedding potrebbe restituire `ORD-12344` o niente di rilevante. Usare FTS o un indice B-tree.
- Nomi e nomi propri. Lo spazio degli embedding organizza per significato, non per ortografia. Il record utente "Micheal Jordan" non cade necessariamente vicino a "Michael Jordan" nello spazio vettoriale.
- Stringhe corte dove la similarità a livello di carattere è più rilevante del significato. `pg_trgm` gestisce questo.
- Query dove il termine esatto deve apparire. BM25 e FTS sono più affidabili per la corrispondenza di termini noti.

---

## Ricerca Ibrida: Il Caso per Entrambi

La documentazione tecnica è l'esempio più chiaro in cui nessuno strumento da solo è sufficiente.

Gli utenti che cercano "come configurare i timeout" necessitano di corrispondenza concettuale: un articolo intitolato "Impostare le politiche di retry e i limiti di connessione" non ha parole chiave sovrapposte ma è esattamente ciò di cui hanno bisogno.

Gli stessi utenti cercano anche `withRetry()`, `ECONNRESET` e `ERR_SOCKET_TIMEOUT`. Queste stringhe esatte devono apparire — la corrispondenza semantica potrebbe non trovarle in modo affidabile, e un falso positivo (concettualmente simile ma non l'API corretta) è attivamente fuorviante.

La ricerca vettoriale gestisce le query concettuali. La FTS gestisce i termini esatti. Nessuna gestisce entrambi bene da sola.

La soluzione è la ricerca ibrida: eseguire entrambe e fondere i risultati.

### Fusione per Reciprocal Rank

**La Fusione per Reciprocal Rank (RRF)** è l'algoritmo standard per combinare liste ordinate da sistemi di recupero diversi. Non richiede la normalizzazione dei punteggi tra i sistemi — utilizza solo le posizioni di classifica. Un risultato che appare in alto in *entrambe* le liste ottiene un punteggio combinato più forte di uno che domina solo una.

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

Il `60` nel denominatore è la costante RRF. Valori più alti smorzano le differenze di posizione di classifica; valori più bassi le amplificano. Il valore predefinito di 60 funziona bene per la maggior parte dei tipi di contenuto.

La RRF evita il problema più complesso di normalizzare `ts_rank` (un punteggio basato su frequenze logaritmiche) rispetto alla distanza coseno (una misura geometrica). Non sono confrontabili. La RRF chiede solo: "quanto in alto appare questo risultato in ciascuna lista?"

### Ricerca ibrida con trigrammi

Per ricerche utente su contenuti misti — dove gli utenti potrebbero cercare un nome di persona, un concetto o un termine esatto nella stessa sessione — la fusione a tre vie gestisce tutti e tre:

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

Questo gestisce: corrispondenze di nomi approssimative (trigrammi), corrispondenze esatte di parole chiave (FTS) e query concettuali (vettori). Una singola casella di ricerca può servire tutti e tre gli intenti utente.

---

## Architetture ibride a più livelli

Le applicazioni reali raramente hanno una singola superficie di ricerca. Ne hanno molteplici, ciascuna con un'esigenza diversa:

| Superficie | Cosa cercano gli utenti | Strati consigliati |
|---|---|---|
| Cerca blog / documentazione | Parole chiave + concetti | FTS + pgvector (RRF) |
| Ricerca nome utente/cliente | Nomi con errori di battitura | `pg_trgm` |
| Ricerca prodotti | Nomi, descrizioni, "simile a" | `pg_trgm` + FTS + pgvector |
| Deduplica ticket di supporto | "Problemi simili a questo" | Solo pgvector |
| Ricerca SKU/ordine interno | Identificatori esatti | Indice B-tree |
| RAG su base di conoscenza estesa | Domande in linguaggio naturale | pgvector (documenti suddivisi) |
| "Potresti anche piacerti" e-commerce | Similitudine comportamentale + semantica | pgvector |
| Autocomplete | Prefisso, tollerante agli errori di ortografia | `pg_trgm` |

Questi non sono ipotetici. La maggior parte delle applicazioni con contenuti estesi necessita almeno di due superfici di ricerca distinte con forme di query diverse. La tentazione è scegliere un'unica soluzione e usarla ovunque – di solito ora il ricercatore vettoriale, visto che è la scelta di moda. Questo porta a utilizzare embeddings costosi per problemi dove un indice trigramma sarebbe stato più veloce, economico e preciso.

### La regola empirica

Aggiungi uno strato quando si presenta un modo di fallire che lo strato corrente non può risolvere:

- Gli utenti lamentano errori di battitura non corrispondenti → aggiungi `pg_trgm`
- Gli utenti cercano per concetto e perdono risultati rilevanti → aggiungi pgvector
- Gli utenti cercano simboli o codici esatti e ottengono risultati concettuali → aggiungi FTS o verifica se ti stai affidando troppo al ricercatore vettoriale
- La latenza diventa un problema → valuta il pre-filtraggio, gli indici approssimativi o un database dedicato

---

## Se hai bisogno veramente di un database vettoriale dedicato

pgvector gestisce molto della ricerca applicativa prima di richiedere un altro database. La soglia approssimativa dipende dal numero di vettori, dalle impostazioni dell'indice, dal tasso di scrittura, dai filtri, dall'hardware e dalla concorrenza, quindi considera qualsiasi regola tipo "sotto i 10 milioni di vettori" come un punto di partenza da testare, non un limite prodotto. Quando superi veramente questa soglia – concorrenza molto alta, requisiti di latenza p99 molto bassi, miliardi di vettori o esigenze di isolamento multi-tenant serie – il panorama dei database vettoriali dedicati è ampio e vale la pena comprenderlo.

### Cosa significano davvero le colonne della matrice

**Ricerca ibrida** significa che la ricerca BM25 per parole chiave e la similarità vettoriale vengono eseguite in una singola query, fuse tramite RRF. Senza questa funzionalità, devi scegliere un solo modo di ricerca o fondere tu stesso due query.

**Vettori sparsi** vanno oltre il BM25. Un vettore sparso SPLADE ha ~30.000 dimensioni (~30.000 termini del vocabolario), ~98% di zeri. Le posizioni non nulle ti dicono quali termini sono rilevanti e quanto. Una query per "cani" pesa anche "canino" e "animale domestico" — precisione BM25 più espansione termini all'interno di un indice vettoriale. Se questa colonna è falsa, hai bisogno di uno strato FTS separato per query a termini esatti.

```python
# SPLADE: ~30.000 dimensioni, ~60 non-zero — solo posizioni rilevanti del vocabolario vengono attivate
def encode_splade(text: str) -> dict:
    tokens = tokenizer(text, return_tensors="pt", truncation=True, max_length=512)
    with torch.no_grad():
        output = model(**tokens)
    vec = torch.log1p(torch.relu(output.logits)).max(dim=1).values.squeeze()
    return {"indices": vec.nonzero().squeeze().tolist(), "values": vec[vec != 0].tolist()}
```

**SQL / SQL-like** è davvero una questione di filtraggio. La ricerca vettoriale senza filtraggio è una dimostrazione. Devi comunque gestire l'ambito tenant, intervalli di date, permessi e filtri di categoria. SQL completo (pgvector, LanceDB) esprime questo insieme ai tuoi join esistenti. Database specializzati usano oggetti filtro JSON (Qdrant, Pinecone), un DSL di query (Elasticsearch, Milvus) o GraphQL (Weaviate). Funzionano; SQL diventa più attraente man mano che la logica di filtraggio si complica.

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

**Multimodal native** significa che il database include modelli di embedding per contenuti non testuali. Gli passi un URL immagine grezzo; gestisce la vettorizzazione. La maggior parte dei database è agnostica sugli embedding — tu gestisci la pipeline di embedding. Marqo e Weaviate (tramite moduli CLIP/ImageBind) chiudono questo ciclo.

```python
# Marqo: POST immagini grezze, query con testo — nessun passo esterno di embedding
mq.index("products").add_documents(
    [{"id": "shoe-001", "image": "https://cdn.example.com/shoes/001.jpg"}],
    tensor_fields=["image"]
)
results = mq.index("products").search(q="lightweight shoes for summer")
# Restituisce shoe-001 nonostante zero sovrapposizione di parole chiave — CLIP gestisce il match multimodale
```

**Indice su disco** è una leva di costo. Gli indici HNSW residenti in RAM possono richiedere diversi GB di RAM per milione di vettori 1536-dimensionali una volta contati i vettori grezzi, l'overhead del grafo e i metadati. Alternative native su disco (Milvus DiskANN, Elasticsearch DiskBBQ, formato Lance di LanceDB, strato di archiviazione degli oggetti di Turbopuffer) spesso scambiano una parte della latenza delle query per un costo infrastrutturale inferiore. Per carichi di lavoro RAG dove la latenza del modello domina già, questo tradeoff è spesso degno di benchmarking.

**Massima dimensione** è una migrazione nascosta nella tua architettura. `text-embedding-3-large` usa 3072 dimensioni, Jina v3 può emettere embedding più grandi, e i modelli di ricerca spingono sempre più in alto. Alcuni servizi gestiti pubblicano limiti rigidi sulle dimensioni; altri documentano limiti elevati o nessun limite pratico per modelli di embedding comuni. Verifica le documentazioni attuali prima di impegnarti. Scegli qualcosa con margine di crescita; migrare un indice vettoriale perché hai raggiunto il soffitto dimensionale è uno sprint doloroso.

_Ultima verifica effettuata rispetto alle documentazioni e pagine prodotto pubbliche il 8 maggio 2026. Tratta la tabella sottostante come un aiuto decisionale, non come sostituto per verificare i limiti attuali, i prezzi e le funzionalità delle feature dei servizi gestiti._

### Il Paesaggio

| Database | Deployment | License | Ricerca ibrida | Vettori sparsi | SQL / SQL-like | Multimodale | Indice su disco | Massima dimensione | Punto forte |
|---|---|---|---|---|---|---|---|---|---|
| **[pgvector](https://github.com/pgvector/pgvector)** | Self-host / gestito (Supabase, Neon, RDS) | OSS (PostgreSQL) | Manuale (RRF via SQL) | ❌ | ✅ SQL completo | ❌ | ✅ HNSW su disco | 16.000 storage; 2.000 indexed `vector` | Già su Postgres; conteggio vettori moderato |
| **[Qdrant](https://github.com/qdrant/qdrant)** | Self-host / Cloud | Apache 2.0 | ✅ Native BM25 | ✅ Supporto maturo | ❌ (REST/gRPC) | ❌ | ✅ | 65.535 | Query filtrate su larga scala; metadata complessi |
| **[Weaviate](https://github.com/weaviate/weaviate)** | Self-host / Cloud | BSD 3 | ✅ Native BM25 + RRF | ✅ | ❌ (GraphQL / gRPC) | ✅ tramite moduli | ✅ | 65.535 | Pattern GraphQL; vettorizzazione integrata |
| **[Pinecone](https://www.pinecone.io/)** | Solo Cloud | Proprietario | ✅ (aggiunto nel 2024) | ✅ | ❌ | ❌ | ✅ (serverless) | 20.000 | Semplificazione gestita; nessun team di ops |
| **[Milvus](https://github.com/milvus-io/milvus) / [Zilliz](https://zilliz.com/)** | Self-host / Cloud (Zilliz) | Apache 2.0 | ✅ Native | ✅ | ✅ SQL-like (Milvus Query Language) | ✅ | ✅ DiskANN | 32.768 | Scale miliardarie; enterprise on-prem |
| **[Chroma](https://github.com/chroma-core/chroma)** | Embedded / self-host | Apache 2.0 | ❌ | ❌ | ❌ | ❌ | ❌ | 65.535 | Sviluppo locale e prototipazione solo |
| **[LanceDB](https://github.com/lancedb/lancedb)** | Embedded / Cloud | Apache 2.0 | ✅ | ❌ | ✅ SQL via DataFusion | ✅ Native | ✅ (formato Lance) | Illimitato | Edge / serverless; lakehouse multimodale |
| **[Orama](https://github.com/oramasearch/orama)** | Embedded / Cloud | Apache 2.0 | ✅ Full-text + vettore | ❌ | ❌ | ❌ | ❌ | Varia | Applicazioni JS/edge; ricerca leggera per siti/app |
| **[Turbopuffer](https://turbopuffer.com/)** | Solo Cloud (serverless) | Proprietario | ✅ BM25 + vettore | ❌ | ❌ | ❌ | ✅ (archiviazione oggetti) | 16.000 | SaaS multi-tenant; milioni di namespace |
| **[Elasticsearch](https://github.com/elastic/elasticsearch)** | Self-host / Elastic Cloud | SSPL / AGPLv3 | ✅ RRF + ELSER sparso | ✅ (ELSER) | ✅ Query DSL | ❌ | ✅ DiskBBQ | 4.096 | Già su stack Elastic; ricerca ibrida enterprise |
| **[OpenSearch](https://github.com/opensearch-project/OpenSearch)** | Self-host / AWS gestito | Apache 2.0 | ✅ RRF + Neural Search | ✅ | ✅ Query DSL | ❌ | ✅ FAISS + HNSW | 16.000 | Native AWS; alternativa open-source ad Elastic |
| **[Vespa](https://github.com/vespa-engine/vespa)** | Self-host / Cloud | Apache 2.0 | ✅ Native | ✅ Tensore / ranking lessicale | ✅ YQL | ✅ Tensore | ✅ | Praticamente illimitato | Ricerca + ranking + sistemi di raccomandazione |
| **[ClickHouse](https://github.com/ClickHouse/ClickHouse)** | Self-host / Cloud | Apache 2.0 | Manuale | ❌ | ✅ SQL completo | ❌ | ✅ Columnar + HNSW | Varia | Analytics/logs con ricerca vettoriale accanto a OLAP |
| **[MongoDB Atlas](https://github.com/mongodb/mongo)** | Cloud / self-host | SSPL | ✅ Integrato | ❌ | ✅ MQL + aggregazione | ❌ | ✅ HNSW | 8.192 | Già su MongoDB; documento + vettore in uno |
| **[Redis (VSS)](https://github.com/redis/redis)** | Self-host / Redis Cloud | RSALv2 / SSPL | ✅ (RediSearch) | ✅ | ❌ | ❌ | ❌ Solo RAM | 32.768 | Latenza ultra-bassa; cache-layer ricerca vettoriale |
| **[Marqo](https://github.com/marqo-ai/marqo)** | Cloud / self-host | Apache 2.0 | ✅ | ❌ | ❌ | ✅ Focus native | ✅ | Varia | Multimodale end-to-end: immagine + testo + video |

### Alcune Cose Che Non Rientrano nella Tabella

**Multi-tenancy di Turbopuffer** è progettata per un alto numero di namespace. La sua posizionamento pubblico e le storie clienti enfatizzano carichi di lavoro simili a quelli di Notion con un corpus pesante su namespace. Se ogni utente o organizzazione richiede ricerca vettoriale isolata, questa architettura può cambiare l'economia, ma benchmarka comunque la tua forma tenant.

**Modalità embedded di LanceDB** è il più simile a "SQLite per la ricerca vettoriale". Funziona in-processo, non richiede server e opera in Lambda, Cloudflare Workers e ambienti edge. Il formato columnar di Lance rende pratica l'operazione embedded su scala reale.

**Chroma è più forte in fase di sviluppo/test e piccole distribuzioni di app.** Se il tuo obiettivo sono corpus molto grandi, alta disponibilità, operazioni su disco pesante o ricerca ibrida di primo piano, valuta un sistema orientato alla produzione prima di promuovere il prototipo all'infrastruttura.

**Vespa è la scelta quando la ricerca è solo metà del prodotto.** Combina retrieval lessicale, ricerca nearest-neighbor, tensori, espressioni di ranking, raggruppamento e servizio online. Questa potenza esiste, ma così anche la complessità operativa e di modellazione. Si adatta a team di ricerca/recommendation più che a "aggiungere ricerca semantica al mio CRUD".

**ClickHouse merita considerazione quando la ricerca è connessa all'analisi.** Se la tua verità assoluta sono eventi, log, tracce o metriche, ClickHouse gestisce distanza vettoriale, filtraggio, aggregazione e indexing testuale avanzato in un'unica engine SQL. Non è un database vettoriale specializzato, ma spesso la soluzione "boring-right" per retrieval analitico.

**I vettori sparsi sono il modo per ottenere corrispondenze di keyword BM25-quality all'interno di un indice vettoriale** — senza eseguire un motore testuale separato. Qdrant ed Elasticsearch hanno implementazioni particolarmente mature in questo ambito. Se la ricerca ibrida è critica e un'architettura a due sistemi è un ostacolo, cerca supporto per vettori sparsi.

### Quando scegliere al di là di pgvector

- **Prodotto SaaS con isolamento per tenant** → Turbopuffer
- **Filtraggio metadata complesso su larga scala** → Qdrant
- **Già su stack Elastic/ELK** → Elasticsearch con DiskBBQ
- **Ambiente AWS che richiede open-source** → OpenSearch
- **Piattaforma ricerca/recommendation con bisogni di ranking avanzati** → Vespa
- **Analisi, osservabilità, ricerca su log/eventi** → ClickHouse
- **Scala miliardaria on-prem/self-hosted** → Milvus
- **Edge/serverless/multimodale** → LanceDB
- **Piccola app JS, sito documentazione, UX di ricerca edge-native** → Orama
- **Zero operazioni, costo secondario** → Pinecone
- **Prima di tutto multimodale (immagini, video, audio)** → Marqo
- **Già su MongoDB** → Atlas Vector Search
- **Già su Postgres, bisogno di più capacità** → Supabase Vector o Neon (entrambi pgvector gestiti, con strumenti migliorati)

---

## L'unica cosa da non fare

Non usare la ricerca vettoriale come fuzzy text search per cose che hanno risposte corrette.

"Cerca l'utente con email `dan@example.com`" non è un problema di ricerca vettoriale. "Trova l'ordine con ID `ORD-12345`" non lo è nemmeno. Inserire `ORD-12345` in un embedding e cercare tramite similarità al coseno restituirà *qualcosa* — ma potrebbe essere errato. Un identificativo ha una risposta corretta. Un match approssimativo su un identificativo è un errore.

La ricerca vettoriale restituisce l'*elemento più simile* nel tuo dataset, anche quando niente è effettivamente rilevante. Non sa quando non esiste una buona risposta. Questo va bene per documenti correlati. È un problema serio per la ricerca esatta di record, dove una risposta errata ma convincente è peggiore di un risultato vuoto.

Lo stesso vale in direzione opposta: non usare la ricerca testuale (FTS) per query in cui l'utente descrive un concetto. "Articoli su come prendere decisioni difficili in condizioni di incertezza" non contiene parole chiave affidabili. La FTS restituirà rumore o niente. Usa lo strumento giusto per la forma della query.

---

## L'immagine completa

La maggior parte dei sistemi di ricerca in produzione necessita di più di uno strato:

- **`pg_trgm`** per nomi, errori di battitura, autocompletamento
- **Ricerca testuale (FTS) / `pg_search`** per ricerche basate su parole chiave
- **pgvector** per query semantiche e concettuali
- **Fusione RRF** per interfacce dove gli utenti mescolano tipi di query
- **Indici regolari** per identificatori esatti, filtri e liste ordinate

Questi non sono strumenti concorrenti. Sono complementari. Un sistema di ricerca ben progettato sceglie lo strato giusto per ogni forma di query — e quando le forme di query si sovrappongono, esegue più strati e fonde i risultati.

Le squadre che implementano funzionalità di ricerca di qualità comprendono l'intera stack. Quelle che non lo fanno si affidano a un database vettoriale, embeddano tutto e si chiedono perché le ricerche esatte a volte restituiscono il record sbagliato.
````
