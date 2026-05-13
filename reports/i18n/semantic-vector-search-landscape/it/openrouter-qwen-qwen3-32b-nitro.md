# Translation Candidate
- Slug: semantic-vector-search-landscape
- Locale: it
- Model: openrouter/qwen/qwen3-32b:nitro
- Target: src/content/posts/2026-05-01--semantic-vector-search-landscape/it/index.mdx
- Validation: rejected: direct AI SDK translation failed
- Runtime seconds: 41.64
- Input tokens: 19055
- Output tokens: 18864
- Thinking tokens: unknown
- Cached input tokens: 4608
- Cache write tokens: 0
- Estimated cost: $0.006052
- Pricing source: local-openrouter-estimate
- Note: Command failed: git commit --only -m i18n candidate(it): semantic-vector-search-landscape via openrouter/qwen/qwen3-32b:nitro -- src/content/posts/2026-05-01--semantic-vector-search-landscape/it/index.mdx reports/i18n/semantic-vector-search-landscape/it
## Raw Output

````mdx
---
title: ''
subTitle: ''
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
La ricerca non è una cosa sola, e la ricerca semantica non è un sostituto del resto.

"Trova l'utente con email `dan@example.com`" e "trova articoli su il debug come nuovo ingegnere" vengono entrambi descritti come ricerca, ma come problemi di ingegneria hanno quasi niente in comune. Il primo ha una risposta corretta e un lookup di indice `O(log n)`. Il secondo non ha una risposta corretta — solo rilevanza — e richiede di comprendere linguaggio, intento e significato.

Gli ingegneri più persuasivi sulle decisioni di ricerca — quelli che vincono gli argomenti e implementano il sistema giusto — conoscono l'intero panorama. Sanno quale strumento utilizzare e perché, e sanno spiegarlo chiaramente.

Questo articolo copre il livello semantico: cosa fa effettivamente la ricerca vettoriale, quando vince e dove dovrebbe stare fuori strada. La versione utile non è "embed tutto". È conoscere quando i vettori appartengono accanto alla ricerca lessicale, sfocata e a corrispondenza esatta in un'architettura ibrida.

La metà lessicale e sfocata del problema — `tsvector`, `pg_trgm`, `pg_search` — è trattata in [Guida alla Ricerca Testuale in Postgres 2026](../postgres-text-search-guide).

## Termini in un'occhiata

**Embedding** — Un elenco denso di numeri in virgola mobile prodotto da un modello, che rappresenta un pezzo di testo (o immagine, audio, ecc.) come un punto in uno spazio ad alta dimensione. Contenuti semanticamente correlati si trovano vicini; contenuti non correlati si trovano lontani.

**Ricerca lessicale** — Ricerca basata su corrispondenza esatta di parole e token. Veloce, deterministica e corretta per termini noti. Non capisce sinonimi, riformulazioni o equivalenti tra lingue.

**Ricerca semantica** — Ricerca basata sul significato piuttosto che sui token. Una query per "come gestire i timeout" può corrispondere a un documento intitolato "configurazione delle politiche di retry" senza parole condivise, perché i loro embedding sono geometricamente vicini.

**Vettore** — Un elenco di numeri. Nel contesto della ricerca, l'output di un modello di embedding. "Ricerca vettoriale" trova i vettori più vicini al vettore di query in base alla distanza geometrica.

**FTS (Ricerca Testuale Completa)** — La ricerca lessicale integrata in Postgres, alimentata da `tsvector` / `tsquery`. Tokenizza, stemma e indice il testo per query a parole chiave. Forte per testi narrativi e lookup di termini esatti; cieca al significato.

**BM25** — Un algoritmo di ordinamento per la ricerca lessicale (utilizzato da Elasticsearch, Qdrant e altri). Assegna punteggi ai risultati in base alla frequenza dei termini pesata in base alla rarezza del termine all'interno del corpus. Migliore del confronto diretto delle parole chiave; rimane comunque lessicale.

**HNSW (Hierarchical Navigable Small World)** — L'indice standard per la ricerca vettoriale approssimativa dei vicini più prossimi. Costruisce un grafo di prossimità gerarchico per query di similarità rapide e con alta ricchezza. pgvector, Qdrant, Weaviate e la maggior parte degli altri lo utilizzano.

**RRF (Reciprocal Rank Fusion)** — Un algoritmo per fondere liste di risultati ordinati da diversi sistemi di recupero. Usa solo la posizione di classifica — non richiede normalizzazione dei punteggi. Un risultato che si classifica alto sia nella ricerca FTS che nella lista vettoriale ottiene un punteggio combinato più forte rispetto a uno che domina solo uno dei due.

---

## Cosa fa effettivamente la ricerca semantica

Gli embedding vettoriali convertono testi (o immagini, audio, ecc.) in una lista di numeri — un punto nello spazio ad alta dimensione. Un modello di embedding viene addestrato affinché testi semanticamente correlati si trovino vicini in questo spazio. "Cane" e "canino" finiscono vicini. "Correre un maratona" e "eseguire uno script Python" restano distanti nonostante condividano una parola.

La ricerca per similarità in questo spazio trova documenti il cui *significato* è più vicino a quello della query, indipendentemente dall'overlap esatto delle parole.

Questo significa:
- "Come configuro i timeout delle richieste?" può corrispondere a un articolo intitolato "Impostare i limiti di connessione e le politiche di ripetizione" – nessun keyword in comune, alta rilevanza concettuale
- "Qualcosa di leggero per una sera estiva" può corrispondere a una raccomandazione di vino senza che nessun keyword appaia nella descrizione del prodotto
- Una query in inglese può corrispondere a documenti rilevanti in francese, spagnolo o giapponese se il modello di embedding è stato addestrato in modo multilingue

La ricerca lessicale (`tsvector`, `pg_trgm`) non può fare nulla di questo. Opera su parole e caratteri, non su significato. Gli strumenti non sono intercambiabili – risolvono problemi diversi.

---

## Quando vince pgvector

**Costruzione di RAG.** La Generazione con Ampliamento della Recupero (Retrieval-Augmented Generation) recupera i frammenti di documento il cui significato è più vicino alla domanda dell'utente, quindi li passa a un modello linguistico come contesto. Questo passo di recupero è un'operazione vettoriale. La ricerca full-text (FTS) manca di corrispondenze per riformulazioni, sinonimi e corrispondenze concettuali che un frammento rilevante potrebbe esprimere in modo diverso. Il vantaggio di pgvector rispetto a un archivio vettoriale standalone: funziona all'interno della tua istanza Postgres esistente – nessun servizio separato da distribuire, operare o sincronizzare.

**Gli utenti descrivono ciò che vogliono, non ciò per cui cercare.** "Articoli su come costruire la fiducia come nuovo manager" non contiene parole chiave che appaiono in modo affidabile nei post rilevanti. "Un framework leggero per gestire effetti collaterali" potrebbe non utilizzare esattamente quelle parole nella documentazione. La ricerca vettoriale corrisponde all'intento, non all'ortografia.

**Trovare elementi simili.** Prodotti correlati, ticket di supporto simili, segnalazioni di bug duplicate, articoli che potresti anche apprezzare. "Trova problemi simili a questo" è una ricerca dei vicini più prossimi — incorpora l'elemento, trova i suoi vicini geometrici. Un'importante avvertenza: la ricerca vettoriale restituisce sempre risultati, anche quando non esiste una reale somiglianza. Per casi d'uso come deduplicazione e raccomandazioni, filtra con una soglia minima di similarità (es. similarità al coseno ≥ 0,80) per evitare di mostrare corrispondenze a bassa confidenza come se fossero significative.

**Deduplicazione semantica.** Prima di indicizzare contenuti per RAG o ricerca, spesso è necessario identificare quasi-duplicati nel corpus — articoli rivisti più volte, ticket di supporto inoltrati due volte, voci della knowledge base con sovrapposizioni significative. Incorpora i documenti e applica un filtro a soglia sulla similarità al coseno per segnalare o unire quasi-duplicati prima che inquinino il tuo indice. Questo impedisce che la ricerca restituisca più frammenti quasi identici e diluisca la finestra di contesto.

**Ricerca multilingua.** I modelli di embedding multilingua mappano contenuti semanticamente equivalenti tra lingue in vettori vicini. Una query in spagnolo su "perder peso" può corrispondere a un articolo inglese su "abitudini per perdere peso in modo sostenibile" — nessun token condiviso, stesso significato sottostante. La ricerca full-text richiede configurazioni di dizionario per ogni lingua e gestisce male le query trans-lingua. `pg_trgm` è indipendente dalla lingua ma ortografico, non semantico.

### Configurazione di pgvector

Dall'installazione dell'estensione alla query di similarità, la configurazione richiede una manciata di istruzioni SQL:

```sql
CREATE EXTENSION IF NOT EXISTS vector;

ALTER TABLE documents ADD COLUMN embedding vector(1536);

-- HNSW è generalmente l'indice da provare per primo sui dataset di dimensioni moderate
CREATE INDEX documents_embedding_idx
  ON documents USING hnsw (embedding vector_cosine_ops);

-- Query di ricerca semantica
SELECT id, title, 1 - (embedding <=> $1::vector) AS similarity
FROM documents
ORDER BY embedding <=> $1::vector
LIMIT 10;
```

`<=>` rappresenta la distanza del coseno. `1 - distanza_coseno` restituisce la similarità del coseno (1,0 = identici, 0,0 = ortogonali). Per `ivfflat` (l'alternativa più vecchia e veloce da costruire), utilizzare `lists = sqrt(row_count)` come punto di partenza.

### Cosa pgvector Gestisce Male

- **Corrispondenza esatta dei token** — codici SKU, codici di errore, nomi di funzioni. `ORD-12345` non è semanticamente simile a nulla. Una ricerca basata su embedding potrebbe restituire `ORD-12344` o niente di rilevante. Usare FTS o un indice B-tree.
- **Nomina e nomi propri**. Lo spazio embedding organizza in base al significato, non all'ortografia. Il record utente "Micheal Jordan" non si colloca necessariamente vicino a "Michael Jordan" nello spazio vettoriale.
- **Stringhe corte dove la similarità a livello di caratteri è più rilevante del significato**. `pg_trgm` gestisce questo scenario.
- **Query dove il termine esatto deve apparire**. BM25 e FTS sono più affidabili per la corrispondenza di termini noti.

---

## Ricerca Ibrida: Il Caso per Entrambi

La documentazione tecnica è l'esempio più chiaro dove nessun singolo strumento è sufficiente da solo.

Gli utenti che cercano "come configurare i timeout" hanno bisogno di un abbinamento concettuale: un articolo intitolato "Impostare le politiche di retry e i limiti di connessione" non ha parole chiave sovrapposte ma è esattamente ciò di cui hanno bisogno.

Gli stessi utenti cercano anche `withRetry()`, `ECONNRESET` e `ERR_SOCKET_TIMEOUT`. Queste stringhe esatte devono apparire — il matching semantico potrebbe non trovarle in modo affidabile, e un falso positivo (concettualmente simile ma non l'API corretta) è attivamente fuorviante.

La ricerca vettoriale gestisce le query concettuali. La Ricerca Testo Intero (FTS) gestisce i termini esatti. Nessuna delle due gestisce entrambi bene da sola.

La soluzione è la ricerca ibrida: eseguire entrambe e fondere i risultati.

### Fusione Reciproca del Rango (RRF)

**La Fusione Reciproca del Rango (RRF)** è l'algoritmo standard per combinare liste ordinate da diversi sistemi di recupero. Non richiede la normalizzazione dei punteggi tra i sistemi — utilizza solo le posizioni di rango. Un risultato che appare in alto in *entrambe* le liste ottiene un punteggio combinato più forte rispetto a uno che domina solo una.

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

Il `60` nel denominatore è la costante RRF. Valori più alti smorzano le differenze di posizione; valori più bassi le amplificano. Il valore predefinito di 60 funziona bene per la maggior parte dei tipi di contenuto.

RRF evita il problema più complesso di normalizzare `ts_rank` (un punteggio basato su frequenza logaritmica) rispetto alla distanza al coseno (una misura geometrica). Questi non sono confrontabili. RRF si chiede solo: "quanto in alto è apparso questo risultato in ciascuna lista?"

### Ricerca ibrida con trigrammi

Per la ricerca utente su contenuti misti — dove gli utenti potrebbero cercare un nome, un concetto o un termine esatto nella stessa sessione — la fusione a tre vie gestisce tutti e tre:

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

Questo gestisce: corrispondenze approssimate di nomi (trigrammi), corrispondenze esatte di parole chiave (FTS) e query concettuali (vettori). Una singola casella di ricerca può servire tutti e tre gli intenti utente.

## Architetture ibride a più strati

Le applicazioni reali raramente hanno una singola superficie di ricerca. Hanno molteplici, ciascuna con un'esigenza diversa:

| Superficie | Cosa cercano gli utenti | Strati consigliati |
|---|---|---|
| Ricerca blog / documentazione | Parole chiave + concetti | FTS + pgvector (RRF) |
| Ricerca nome utente/cliente | Nomi con errori di battitura | `pg_trgm` |
| Ricerca prodotti | Nomi, descrizioni, "simili a" | `pg_trgm` + FTS + pgvector |
| Deduplicazione ticket di supporto | "Problemi simili a questo" | Solo pgvector |
| Ricerca SKU/ordine interna | Identificatori esatti | Indice B-tree |
| RAG su base di conoscenza estesa | Domande in linguaggio naturale | pgvector (documenti suddivisi) |
| E-commerce "potresti anche voler" | Similitudine comportamentale + semantica | pgvector |
| Autocomplete | Prefissi, tolleranza agli errori di ortografia | `pg_trgm` |

Questi non sono ipotetici. La maggior parte delle applicazioni con contenuti estesi necessita di almeno due superfici di ricerca distinte con forme di query diverse. La tentazione è scegliere un'unica soluzione e utilizzarla ovunque - di solito la ricerca vettoriale ora, poiché è la scelta di moda. Questo porta a embeddings costosi per problemi in cui un indice a trigrammi sarebbe stato più veloce, economico e corretto.

### La regola empirica

Aggiungi uno strato quando si presenta una modalità di fallimento che lo strato corrente non può risolvere:

- Gli utenti lamentano errori di battitura che non corrispondono → aggiungi `pg_trgm`  
- Gli utenti cercano per concetto e mancano risultati rilevanti → aggiungi `pgvector`  
- Gli utenti cercano simboli o codici esatti e ricevono risultati concettuali → aggiungi FTS o verifica se ti stai affidando troppo alla ricerca vettoriale  
- La latenza diventa un problema → valuta il pre-filtraggio, gli indici approssimativi o un database dedicato  

---

## Se Hai Bisogno di un Database Vettoriale Dedicato  

`pgvector` gestisce molte esigenze di ricerca applicativa prima di richiedere un altro database. La soglia approssimativa dipende dal numero di vettori, dalle impostazioni dell'indice, dal tasso di scrittura, dai filtri, dall'hardware e dalla concorrenza, quindi considera qualsiasi regola tipo "sotto i 10 milioni di vettori" come un punto di partenza da testare, non un limite prodotto. Quando superi davvero le sue capacità — concorrenza estremamente alta, requisiti di latenza p99 molto bassi, miliardi di vettori o esigenze di isolamento multi-tenant significative — il panorama dei database vettoriali dedicati è ampio e degno di attenzione.  

### Cosa Significano Realmente le Colonne della Matrice  

**Ricerca ibrida** significa che la ricerca BM25 per parole chiave e la similarità vettoriale vengono eseguite in una singola query, fuse tramite RRF. Senza questa funzionalità, devi scegliere un solo tipo di ricerca o fondere manualmente due query.

**I vettori sparsi** vanno oltre il BM25. Un vettore sparsa SPLADE ha ~30.000 dimensioni (una per termine del vocabolario), ~98% di zeri. Le posizioni non nulle ti dicono quali termini sono rilevanti e quanto. Una query per "dogs" pesa anche "canine" e "pet" — precisione BM25 più espansione termini all'interno di un indice vettoriale. Se questa colonna è falsa, hai bisogno di uno strato FTS separato per query su termini esatti.

```python
# SPLADE: ~30.000 dimensioni, ~60 non-zero — solo le posizioni rilevanti del vocabolario vengono attivate
def encode_splade(text: str) -> dict:
    tokens = tokenizer(text, return_tensors="pt", truncation=True, max_length=512)
    with torch.no_grad():
        output = model(**tokens)
    vec = torch.log1p(torch.relu(output.logits)).max(dim=1).values.squeeze()
    return {"indices": vec.nonzero().squeeze().tolist(), "values": vec[vec != 0].tolist()}
```

**SQL / SQL-like** è davvero questione di filtraggio. La ricerca vettoriale senza filtraggio è una demo. Hai comunque bisogno di ambito tenant, intervalli di date, permessi e filtri per categoria. SQL completo (pgvector, LanceDB) esprime questo insieme ai tuoi join esistenti. Database specializzati usano oggetti filtro JSON (Qdrant, Pinecone), un DSL per query (Elasticsearch, Milvus) o GraphQL (Weaviate). Funzionano; SQL diventa più attraente man mano che la logica di filtraggio si complica.

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

**Multimodale nativo** significa che il database include modelli di embedding per contenuti non testuali. Gli passi un URL di immagine grezza; lui gestisce la vettorizzazione. La maggior parte dei database è agnostica sugli embedding — tu gestisci la pipeline di embedding. Marqo e Weaviate (tramite moduli CLIP/ImageBind) chiudono questo ciclo.

```python
# Marqo: POST immagini grezze, query con testo — nessun passo esterno per embedding
mq.index("products").add_documents(
    [{"id": "shoe-001", "image": "https://cdn.example.com/shoes/001.jpg"}],
    tensor_fields=["image"]
)
results = mq.index("products").search(q="lightweight shoes for summer")
# Restituisce shoe-001 nonostante zero sovrapposizione di parole chiave — CLIP gestisce il match multimodale
```

**Indice su disco** è una leva di costo. Gli indici HNSW residenti in RAM possono richiedere diversi GB di RAM per milione di vettori 1536-dimensionali una volta contati i vettori grezzi, l'overhead del grafo e i metadati. Alternative native su disco (Milvus DiskANN, Elasticsearch DiskBBQ, formato Lance di LanceDB, livello di archiviazione oggetti di Turbopuffer) spesso scambiano parte della latenza di query per costi infrastrutturali inferiori. Per carichi di lavoro RAG dove la latenza del modello domina già, questa tradeoff è spesso degna di benchmarking.

**Numero massimo di dimensioni** è una migrazione nascosta nella tua architettura. `text-embedding-3-large` utilizza 3072 dimensioni, Jina v3 può emettere embedding più grandi, e i modelli di ricerca continuano a spingere verso dimensioni superiori. Alcuni servizi gestiti pubblicano limiti rigidi sulle dimensioni; altri documentano limiti elevati o nessun limite pratico per modelli di embedding comuni. Controlla le documentazioni aggiornate prima di impegnarti. Scegli qualcosa con margine di crescita; migrare un indice vettoriale perché hai raggiunto il soffitto dimensionale è uno sprint doloroso.

_Ultima verifica effettuata in base alle documentazioni e pagine prodotto pubbliche il 8 maggio 2026. Tratta la tabella sottostante come un ausilio decisionale, non come sostituto per verificare i limiti attuali, i prezzi e le feature flag dei servizi gestiti._

### Il panorama

| Database | Distribuzione | Licenza | Ricerca ibrida | Vettori sparsi | SQL / SQL-like | Multimodale | Indice su disco | Max Dims | Punto forte |
|---|---|---|---|---|---|---|---|---|---|
| **[pgvector](../https://github.com/pgvector/pgvector)** | Auto-ospitato / gestito (Supabase, Neon, RDS) | OSS (PostgreSQL) | Manuale (RRF tramite SQL) | ❌ | ✅ SQL completo | ❌ | ✅ HNSW su disco | 16.000 storage; 2.000 indiciati `vector` | Già su Postgres; conteggio vettori moderato |
| **[Qdrant](../https://github.com/qdrant/qdrant)** | Auto-ospitato / Cloud | Apache 2.0 | ✅ BM25 nativo | ✅ Supporto maturo | ❌ (REST/gRPC) | ❌ | ✅ | 65.535 | Query filtrate su larga scala; metadata complessi |
| **[Weaviate](../https://github.com/weaviate/weaviate)** | Auto-ospitato / Cloud | BSD 3 | ✅ BM25 + RRF nativo | ✅ | ❌ (GraphQL / gRPC) | ✅ tramite moduli | ✅ | 65.535 | Pattern GraphQL; vettorizzazione integrata |
| **[Pinecone](../https://www.pinecone.io/)** | Solo Cloud | Proprietaria | ✅ (aggiunto nel 2024) | ✅ | ❌ | ❌ | ✅ (serverless) | 20.000 | Semplificazione gestita; nessun team operativo |
| **[Milvus](../https://github.com/milvus-io/milvus) / [Zilliz](../https://zilliz.com/)** | Auto-ospitato / Cloud (Zilliz) | Apache 2.0 | ✅ Nativo | ✅ | ✅ SQL-like (Milvus Query Language) | ✅ | ✅ DiskANN | 32.768 | Scala miliardaria; on-prem enterprise |
| **[Chroma](../https://github.com/chroma-core/chroma)** | Embedded / auto-ospitato | Apache 2.0 | ❌ | ❌ | ❌ | ❌ | ❌ | 65.535 | Solo sviluppo locale e prototipazione |
| **[LanceDB](../https://github.com/lancedb/lancedb)** | Embedded / Cloud | Apache 2.0 | ✅ | ❌ | ✅ SQL tramite DataFusion | ✅ Nativo | ✅ (formato Lance) | Illimitato | Edge/serverless; lakehouse multimodale |
| **[Orama](../https://github.com/oramasearch/orama)** | Embedded / Cloud | Apache 2.0 | ✅ Testo completo + vettore | ❌ | ❌ | ❌ | ❌ | Varia | Applicazioni JS/edge; ricerca leggera per sito/app |
| **[Turbopuffer](../https://turbopuffer.com/)** | Solo Cloud (serverless) | Proprietaria | ✅ BM25 + vettore | ❌ | ❌ | ❌ | ✅ (storage oggetti) | 16.000 | SaaS multi-tenant; milioni di namespace |
| **[Elasticsearch](../https://github.com/elastic/elasticsearch)** | Auto-ospitato / Elastic Cloud | SSPL / AGPLv3 | ✅ RRF + ELSER sparsi | ✅ (ELSER) | ✅ DSL Query | ❌ | ✅ DiskBBQ | 4.096 | Già su stack Elastic; ricerca ibrida enterprise |
| **[OpenSearch](../https://github.com/opensearch-project/OpenSearch)** | Auto-ospitato / gestito da AWS | Apache 2.0 | ✅ RRF + Neural Search | ✅ | ✅ DSL Query | ❌ | ✅ FAISS + HNSW | 16.000 | Native AWS; alternativa open-source a Elastic |
| **[Vespa](../https://github.com/vespa-engine/vespa)** | Auto-ospitato / Cloud | Apache 2.0 | ✅ Nativo | ✅ Tensore / ranking lessicale | ✅ YQL | ✅ Tensore | ✅ | Effettivamente illimitato | Ricerca + ranking + sistemi di raccomandazione |
| **[ClickHouse](../https://github.com/ClickHouse/ClickHouse)** | Auto-ospitato / Cloud | Apache 2.0 | Manuale | ❌ | ✅ SQL completo | ❌ | ✅ Colonna + HNSW | Varia | Analytics/log con ricerca vettoriale accanto all'OLAP |
| **[MongoDB Atlas](../https://github.com/mongodb/mongo)** | Cloud / auto-ospitato | SSPL | ✅ Integrato | ❌ | ✅ MQL + aggregazione | ❌ | ✅ HNSW | 8.192 | Già su MongoDB; documento + vettore in uno |
| **[Redis (VSS)](../https://github.com/redis/redis)** | Auto-ospitato / Redis Cloud | RSALv2 / SSPL | ✅ (RediSearch) | ✅ | ❌ | ❌ | ❌ RAM-only | 32.768 | Latenza ultra-bassa; cache-layer ricerca vettoriale |
| **[Marqo](../https://github.com/marqo-ai/marqo)** | Cloud / auto-ospitato | Apache 2.0 | ✅ | ❌ | ❌ | ✅ Focalizzazione nativa | ✅ | Varia | Multimodale end-to-end: immagine + testo + video |

### Alcune cose che non entrano nella tabella

**Il multi-tenant di Turbopuffer** è progettato per un numero estremamente elevato di namespace. La sua posizione pubblicitaria e le storie clienti enfatizzano carichi di lavoro simili a quelli di Notion, con un corpus pesante su namespace. Se ogni utente o organizzazione necessita di una ricerca vettoriale isolata, questa architettura può modificare l'economia, ma effettua comunque benchmark sulla forma specifica del tuo tenant.

**La modalità embedded di LanceDB** è la più vicina a "SQLite per la ricerca vettoriale". Funziona in-process, non richiede server e funziona in Lambda, Cloudflare Workers e ambienti edge. Il formato Lance columnar rende praticabile l'operazione embedded su larga scala.

**Chroma è più adatto a sviluppo/test e piccole distribuzioni di app.** Se il tuo obiettivo è un corpus molto esteso, alta disponibilità, operazioni su disco pesanti o ricerca ibrida di primo livello, valuta un archivio orientato alla produzione prima di promuovere il prototipo nell'infrastruttura.

**Vespa è ciò a cui ricorsi quando la ricerca è solo metà del prodotto.** Combina ricerca lessicale, ricerca per vicinanza, tensori, espressioni di classifica, raggruppamento e servizio online. Quella potenza esiste davvero, così come la complessità operativa e di modellazione. Si adatta a team di ricerca/recommendation più che a "aggiungi ricerca semantica alla mia app CRUD".

**ClickHouse entra in gioco quando la ricerca è legata all'analisi.** Se la tua fonte di verità sono eventi, log, tracce o metriche, ClickHouse gestisce distanza vettoriale, filtraggio, aggregazione e indicizzazione testuale avanzata in un'unica engine SQL. Non è un database vettoriale su misura, ma spesso la risposta noiosa-ma-corretta per la ricerca analitica.

**I vettori sparsi sono il modo per ottenere corrispondenze di parole chiave a livello BM25 all'interno di un indice vettoriale** — senza eseguire un motore testuale separato. Qdrant ed Elasticsearch hanno implementazioni particolarmente mature qui. Se la ricerca ibrida è critica e un'architettura a due sistemi è un problema insormontabile, cerca il supporto per vettori sparsi.

### Quando hai superato pgvector

- **Prodotto SaaS con isolamento per tenant** → Turbopuffer  
- **Filtraggio metadati complesso su larga scala** → Qdrant  
- **Già su stack Elastic/ELK** → Elasticsearch con DiskBBQ  
- **Azienda AWS che vuole open-source** → OpenSearch  
- **Piattaforma ricerca/recommendation con esigenze di classifica avanzate** → Vespa  
- **Analisi, osservabilità, ricerca log/eventi** → ClickHouse  
- **Scala miliardaria on-prem/self-hosted** → Milvus  
- **Edge/serverless/multimodale** → LanceDB  
- **App JS piccola, sito documentazione, UX ricerca edge-native** → Orama  
- **Zero operazioni, costo secondario** → Pinecone  
- **Multimodale-first (immagini, video, audio)** → Marqo  
- **Già su MongoDB** → Atlas Vector Search  
- **Già su Postgres, bisogno di più capacità** → Supabase Vector o Neon (entrambi pgvector gestiti, con strumenti migliorati)

## Una cosa da non fare  

Non utilizzare la ricerca vettoriale come ricerca testuale approssimativa per cose che hanno una risposta corretta.  

"Trova l'utente con email `dan@example.com`" non è un problema di ricerca vettoriale. "Trova l'ordine con ID `ORD-12345`" non lo è nemmeno. Inserire `ORD-12345` in un embedding e cercare per similarità coseno restituirà *qualcosa* — ma potrebbe essere sbagliato. Un identificatore ha una risposta corretta. Un'approssimazione su un identificatore è un errore.  

La ricerca vettoriale restituisce *l'elemento più simile* nel tuo dataset, anche quando niente è effettivamente rilevante. Non sa quando non esiste una buona risposta. Questo va bene per documenti correlati. È un problema serio per la ricerca esatta di record, dove una risposta sbagliata con alta confidenza è peggiore di un risultato vuoto.  

Lo stesso vale in direzione opposta: non utilizzare la ricerca testuale (FTS) per query in cui l'utente descrive un concetto. "Articoli su come prendere decisioni difficili in condizioni di incertezza" non contiene parole chiave affidabili. La FTS restituirà rumore o niente. Usa lo strumento giusto per la forma della query.

## La visione completa

La maggior parte dei sistemi di ricerca in produzione necessita di più di uno strato:

- **`pg_trgm`** per nomi, errori di battitura, autocompletamento
- **FTS / `pg_search`** per la ricerca testuale basata su parole chiave
- **pgvector** per query semantiche e concettuali
- **Fusione RRF** per interfacce dove gli utenti mescolano tipi di query
- **Indici standard** per identificatori esatti, filtri e liste ordinate

Questi non sono strumenti concorrenti. Sono complementari. Un sistema di ricerca ben progettato sceglie lo strato giusto per ogni forma di query — e quando le forme delle query si sovrappongono, esegue più strati e fonde i risultati.

Le squadre che implementano buone funzionalità di ricerca comprendono l'intera stack. Quelle che non lo fanno si affidano a un database vettoriale, embeddano tutto e si chiedono perché le ricerche esatte a volte restituiscono il record sbagliato.
````
