# Translation Candidate
- Slug: postgres-text-search-guide
- Locale: it
- Model: openrouter/qwen/qwen3-32b:nitro
- Target: src/content/posts/2026-05-02--postgres-text-search-guide/it/index.mdx
- Validation: deferred
- Runtime seconds: 36.88
- Input tokens: 16504
- Output tokens: 16106
- Thinking tokens: unknown
- Cached input tokens: 2560
- Cache write tokens: 0
- Estimated cost: $0.005186
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
title: Guida alla ricerca di testo in Postgres 2026
subTitle: >-
  Gli strumenti di ricerca già presenti nel tuo database e quando ognuno si
  giustifica.
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
La maggior parte delle squadre utilizza uno strumento di ricerca Postgres. Le squadre che conoscono tutti e tre gli strumenti implementano una ricerca migliore con meno complessità e evitano il costo di un servizio di ricerca dedicato che non avevano ancora bisogno.

Questa guida copre l'intero set di opzioni native di Postgres: cosa fa ciascuna, quando è la scelta giusta e come sovrapporle.

---

## I Tre Strumenti

**Ricerca testuale completa** (`tsvector` / indice `GIN`) è lessicale. Tokenizza il testo in lexemi, li riduce alle radici e confronta le query con l'indice. "Running" e "runs" vengono ridotti allo stesso lexema. Lo stesso vale per "dog" e "dogs". La funzione di ranking (`ts_rank`) premia i documenti in cui i termini di query appaiono frequentemente o in modo prominente.

**Trigrammi** (`pg_trgm`) suddividono le stringhe in segmenti sovrapposti di 3 caratteri e misurano quanti segmenti condividono due stringhe. "Dan" → `" da"`, `"dan"`, `"an "`. "Micheal" e "Michael" condividono la maggior parte dei loro trigrammi, quindi la similarità è alta. Questo rende `pg_trgm` eccellente per l'abbinamento di nomi con tolleranza agli errori, la correzione di battitura e l'autocompletamento – l'ambito in cui la ricerca testuale completa (FTS) si distingue poco.

**Indici per corrispondenza esatta** (B-tree, hash) gestiscono chiavi primarie, indirizzi email, ID, codici SKU e qualsiasi cosa abbia una risposta binaria: corrisponde o non corrisponde. Questi non sembrano "ricerca", ma devono essere inclusi in questa discussione perché il peggior schema è utilizzare una ricerca approssimativa o semantica per problemi che hanno risposte corrette.

La scelta non riguarda la sofisticazione. Si tratta di abbinare lo strumento alla forma della query.

<figure>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1120 720" role="img" aria-labelledby="stm-title stm-desc">
  <title id="stm-title">Mappa degli strumenti di ricerca di Postgres</title>
  <desc id="stm-desc">Confronto tra pg_trgm, ricerca testuale completa, pgvector e ricerca ibrida in base alla forma dell'input e all'intento della query.</desc>
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
  <text class="stm-title-text" x="64" y="70">Scegli la primitiva di ricerca in base alla forma dell'input</text>
  <text class="stm-subtitle" x="64" y="103">La stessa tabella Postgres può supportare tutte e quattro. La chiave è abbinare la query al testo.</text>

  <line class="stm-line" x1="560" y1="150" x2="560" y2="640"/>
  <line class="stm-line" x1="76" y1="395" x2="1044" y2="395"/>

  <text class="stm-axis" x="360" y="142">Parole esatte importanti</text>
  <text class="stm-axis" x="650" y="142">Il significato importa</text>
  <text class="stm-axis" x="78" y="388" transform="rotate(-90 78 388)">Testo breve / strutturato</text>
  <text class="stm-axis" x="78" y="628" transform="rotate(-90 78 628)">Testo lungo / blocchi</text>

  <rect class="stm-card" x="112" y="168" width="408" height="186" rx="20"/>
  <rect x="136" y="192" width="100" height="28" rx="14" fill="#f59e0b"/>
  <text class="stm-label" x="154" y="212">simile</text>
  <text class="stm-tool" x="136" y="256">pg_trgm</text>
  <text class="stm-body" x="136" y="294">Nomi, indirizzi, titoli, errori di battitura,</text>
  <text class="stm-body" x="136" y="320">autocompletamento, stringhe parziali.</text>
  <text class="stm-small" x="136" y="344">Similarità ortografica: distanza lessicale.</text>

  <rect class="stm-card" x="600" y="168" width="408" height="186" rx="20"/>
  <rect x="624" y="192" width="116" height="28" rx="14" fill="#22c55e"/>
  <text class="stm-label" x="644" y="212">simile</text>
  <text class="stm-tool" x="624" y="256">pgvector</text>
  <text class="stm-body" x="624" y="294">Oggetti correlati, ticket duplicati,</text>
  <text class="stm-body" x="624" y="320">raccomandazioni da descrizioni brevi.</text>
  <text class="stm-small" x="624" y="344">Similarità embedding: distanza semantica.</text>

  <rect class="stm-card" x="112" y="436" width="408" height="186" rx="20"/>
  <rect x="136" y="460" width="102" height="28" rx="14" fill="#38bdf8"/>
  <text class="stm-label" x="158" y="480">lessicale</text>
  <text class="stm-tool" x="136" y="524">Ricerca testuale completa</text>
  <text class="stm-body" x="136" y="562">Articoli, documenti, log, contenuti di supporto</text>
  <text class="stm-body" x="136" y="588">dove le parole della query devono apparire.</text>
  <text class="stm-small" x="136" y="612">Lessemi, stemming, ranking, filtri booleani.</text>

  <rect class="stm-card" x="600" y="436" width="408" height="186" rx="20"/>
  <rect x="624" y="460" width="102" height="28" rx="14" fill="#f472b6"/>
  <text class="stm-label" x="645" y="480">ibrido</text>
  <text class="stm-tool" x="624" y="524">Ricerca testuale + pgvector</text>
  <text class="stm-body" x="624" y="562">Documentazione tecnica e RAG dove gli utenti chiedono</text>
  <text class="stm-body" x="624" y="588">domande concettuali più simboli esatti.</text>
  <text class="stm-small" x="624" y="612">Esegui entrambi, fonde i ranking con RRF.</text>

  <rect x="396" y="658" width="328" height="36" rx="18" fill="url(#header)"/>
  <text class="stm-chip" x="429" y="681">Inizia con l'intento della query, poi verifica la forma del testo</text>
</svg>
<figcaption>Le quattro primitive di ricerca Postgres mappate in base all'intento della query (esatto vs. semantico) e alla forma del testo (strutturato vs. prosa). La stessa tabella può ospitare tutti e quattro gli indici — la scelta è per query, non per tabella.</figcaption>
</figure>

---

## Quando vince la ricerca testuale completa

**Ricerca di parole chiave nella prosa.** Articoli di blog, documentazione, descrizioni prodotto, ticket di supporto, documenti legali. La ricerca testuale completa (FTS) è stata progettata per questo tipo di contenuto: recupero indicizzato e classificato su testo in linguaggio naturale.

**Query degli utenti basate su parole chiave.** Gli utenti digitano un termine di ricerca, filtrano per tag o navigano per parola chiave. FTS gestisce questo intento in modo nativo senza alcuna infrastruttura di embedding.

**Risultati ordinati senza dipendenze esterne.** Gli indici FTS sono veloci, deterministici e non richiedono chiamate API. Il segnale di rilevanza deriva dalla frequenza dei termini pesata in base alla posizione del campo.

**Filtraggio booleano insieme alla ricerca.** FTS si combina naturalmente con la logica di query esistente:

```sql
SELECT * FROM posts
WHERE search_vector @@ to_tsquery('english', 'postgres & performance')
  AND category = 'tutorial'
  AND published_at > NOW() - INTERVAL '6 months';
```

### Configurazione di FTS

```sql
-- Colonna generata che mantiene aggiornato l'indice automaticamente
ALTER TABLE posts ADD COLUMN search_vector tsvector
  GENERATED ALWAYS AS (
    setweight(to_tsvector('english', coalesce(title, '')), 'A') ||
    setweight(to_tsvector('english', coalesce(body,  '')), 'B')
  ) STORED;

CREATE INDEX posts_search_idx ON posts USING GIN (search_vector);

-- Query
SELECT title, ts_rank(search_vector, query) AS rank
FROM posts, to_tsquery('english', 'postgres & performance') query
WHERE search_vector @@ query
ORDER BY rank DESC
LIMIT 10;
```

`setweight` assegna importanza: `A` (titolo) ha priorità su `B` (corpo del testo). Questo è il modello di rilevanza completo per la maggior parte dei casi d'uso di ricerca su contenuti.

### Cosa FTS non gestisce bene

- Errori di battitura nelle query — "javascipt" non corrisponderà a "javascript"  
- Nomi di persone, indirizzi, nomi propri che non seguono un'analisi lessicale prevedibile  
- Ricerca per prefisso/autocompletamento senza configurazione specifica  
- Query in cui l'utente descrive un concetto invece di nominarlo  

---

## Quando vincono i trigrammi (`pg_trgm`)  

`pg_trgm` copre la fascia intermedia problematica che la ricerca testuale completa (FTS) gestisce male.  

La FTS suddivide il testo in *lexeme* e li riduce alla forma radice. Per il testo narrativo è corretto. Per i nomi e gli identificatori brevi spesso non lo è:  

- Nomi di persone ("Dan Levy" → ridotto in modo diverso a seconda del dizionario e della configurazione linguistica)  
- Nomi di aziende, indirizzi, titoli di prodotti dove la scrittura esatta è cruciale  
- Query con errori di battitura — "Micheal Jordan", "Amaon", "javascipt"  
- Autocompletamento / ricerca per prefisso  
- Corrispondenza parziale di stringhe ("son" che corrisponde a "Johnson", "Anderson")

`pg_trgm` è anche indipendente dal linguaggio, un aspetto cruciale per i nomi provenienti da contesti linguistici diversi. La FTS richiede una configurazione del dizionario per ogni linguaggio.

### Ricerca Fuzzy sui Nomi

```sql
CREATE EXTENSION IF NOT EXISTS pg_trgm;

CREATE INDEX users_name_trgm_idx ON users USING GIN (name gin_trgm_ops);

-- Trova "Micheal Jordan" cercando "Michael Jordan"
SELECT id, name, similarity(name, $1) AS score
FROM users
WHERE name % $1          -- Operatore % = soglia di similarità (default 0.3)
ORDER BY score DESC
LIMIT 10;
```

L'operatore `%` utilizza `pg_trgm.similarity_threshold` (valore predefinito 0.3, intervallo 0–1). Per la ricerca di nomi, 0.3–0.4 rileva gli errori di battitura mantenendo basso il rumore.

### Autocompletamento, Prefisso e Ricerca Contenente

```sql
-- Corrispondenza di prefisso per l'autocompletamento. Un indice GIN a trigrammi può aiutare,
-- ma un indice B-tree a pattern potrebbe essere migliore per prefissi sinistra-ancorati puri.
SELECT name FROM users
WHERE name ILIKE $1 || '%'
ORDER BY name
LIMIT 10;

-- word_similarity per corrispondenze parziali all'interno di stringhe più lunghe
-- ("Johnson" all'interno di "Andrew Johnson III")
SELECT id, name, word_similarity($1, name) AS score
FROM users
WHERE $1 <% name
ORDER BY score DESC
LIMIT 10;
```

L'indice GIN a trigrammi è particolarmente utile per le query `ILIKE '%pattern%'` e per la corrispondenza tollerante agli errori di battitura - schemi che senza un indice a trigrammi richiederebbero di scandire l'intera tabella.

### Quando Scegliere `pg_trgm` Invece della FTS

| Scenario | Use |
|---|---|
| Ricerca di nomi di persone/aziende con errori di battitura | `pg_trgm` |
| Autocompletamento / ricerca per prefisso | `pg_trgm` (o FTS con query per prefisso) |
| Stringhe corte, identificatori, codici | `pg_trgm` |
| Articoli, documentazione, ticket | FTS |
| Messaggi di log per parole chiave | FTS |
| Ricerca multilingua di nomi | `pg_trgm` (indipendente dalla lingua) |

---

## Quando Vincere con SQL a Corrispondenza Esatta

Alcuni "problemi di ricerca" non sono affatto ricerca.

"Trova l'utente con email `dan@example.com`" è un controllo di uguaglianza. "Trova l'ordine `ORD-12345`" è una ricerca della chiave primaria. "Elenca i post nella categoria `tutorial` ordinati per data" è una query filtrata. Questi casi sono adatti agli indici B-tree o hash.

Usare FTS o trigrammi qui aggiunge complessità senza migliorare la correttezza — e per identificatori esatti, un'approssimazione è peggiore dell'assenza di corrispondenza.

La lezione più ampia: la ricerca approssimativa per problemi con risposte corrette è un errore di categoria. Restituisce *qualcosa* — che potrebbe essere chiaramente errato.

---

## Combinare questi strumenti

Questi strumenti si compongono in modo pulito. Non si sceglie esattamente uno solo.

**FTS + pg_trgm per una casella di ricerca che tollera errori di digitazione nei termini chiave:**

```sql
-- La similarità tramite trigrammi sul titolo cattura gli errori di digitazione; ts_rank gestisce la rilevanza del corpo del testo
SELECT id, title,
  ts_rank(search_vector, to_tsquery('simple', $1)) AS fts_rank,
  similarity(title, $1) AS trgm_score
FROM posts
WHERE search_vector @@ to_tsquery('simple', $1)
   OR title % $1
ORDER BY (ts_rank(search_vector, to_tsquery('simple', $1)) + similarity(title, $1)) DESC
LIMIT 10;
```

**FTS + `unaccent` per contenuti internazionali:**

```sql
-- Rimuove gli accenti diacritici per far corrispondere "José" a "Jose"
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

**`unaccent` + `pg_trgm` per ricerche internazionali di nomi:**

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

Gli esempi di trigger evitano l'uso di `unaccent()` all'interno di espressioni di colonne generate o indici, dove contano le regole di immutabilità di PostgreSQL. Se avvolgi `unaccent()` in una propria funzione immutabile, documenta che accetti il rischio di aggiornamenti/configurazione.

---

## Estensioni notevoli

**`pg_trgm`** è inclusa nella maggior parte delle distribuzioni di Postgres ma richiede un abilitazione esplicita. Fondamento per il matching fuzzy delle stringhe in Postgres.

**`unaccent`** rimuove gli accenti diacritici prima dell'indicizzazione e della query. Si abbina bene sia a `pg_trgm` che a FTS per contenuti in lingue europee. Inclusa in Postgres.

**`pg_bigm`** estende l'approccio dei trigrammi ai bigrammi (fette di 2 caratteri), migliorando significativamente i risultati per le lingue CJK (Cinese, Giapponese, Coreano) dove `pg_trgm` non si comporta bene. Deve essere installata separatamente; non è inclusa di default.

**`pg_search`** (da [ParadeDB](https://www.paradedb.com/)) sostituisce lo stack standard `GIN` / `tsvector` con un indice BM25 basato su Tantivy. Questo ti fornisce il punteggio BM25 (spesso migliore di `ts_rank`), abbinamento approssimativo all'interno delle query di ricerca testuale, ricerca con facets e indicizzazione molto più veloce su tabelle grandi. È un percorso di aggiornamento drop-in quando la ricerca testuale standard mostra limiti di classificazione o prestazioni.

```sql
-- pg_search: Ricerca testuale completa con abbinamento approssimativo BM25
CREATE INDEX posts_bm25_idx ON posts
  USING bm25 (id, title, body)
  WITH (key_field = 'id', text_fields = '{"title": {}, "body": {}}');

-- Query con punteggio BM25 + abbinamento approssimativo (cattura "javascipt")
SELECT id, title, paradedb.score(id) AS rank
FROM posts
WHERE posts @@@ paradedb.fuzzy_phrase(field => 'title', value => 'postgres performnce')
ORDER BY rank DESC
LIMIT 10;
```

**`pgvector`** aggiunge archiviazione di vettori densi e ricerca per similarità. È lo strumento giusto quando gli utenti descrivono ciò che cercano piuttosto che nominarlo direttamente — ricerca semantica, RAG, raccomandazioni di contenuti correlati, query multilingue. Approfondito in [Semantic Vector Search and Hybrid Strategies](../semantic-vector-search-landscape).

---

## Tabella decisionale

| Cosa stai cercando | Consigliato |
|---|---|
| Articoli, documenti, ticket | FTS |
| Nomi di persone/aziende con errori di ortografia | `pg_trgm` |
| Autocompletamento, ricerca per prefisso | `pg_trgm` |
| Codici brevi, identificatori | `pg_trgm` |
| Messaggi di log per parole chiave | FTS |
| Nomi internazionali | `pg_trgm` + `unaccent` |
| Contenuti grandi, classificazione migliore | `pg_search` (ParadeDB BM25) |
| Primary keys, email esatte, ID | Indice B-tree |
| Date, intervalli, liste ordinate | Indice B-tree |
| Permessi, categorie, filtri | Clausola WHERE standard |
| Domande, parafrasi, concetti | pgvector (vedi prossimo articolo) |

Quando non sei sicuro: stringhe corte con variazioni di ortografia → trigrammi. Testi lunghi per query a parole chiave → FTS. Identificatori strutturati → indici regolari. Query concettuali o in linguaggio naturale → pgvector.

---

## Ricerca ibrida: due segnali, un unico ranking

Quando una query come `"withRetry timeout errors"` entra in una casella di ricerca, porta con sé due tipi di intento: nomi di simboli esatti che l'utente conosce (`withRetry`) e una descrizione concettuale (`timeout errors`). Nessun singolo strumento copre entrambi. Eseguire FTS e ricerca vettoriale in parallelo — quindi fondere le loro liste ordinate con Reciprocal Rank Fusion — lo fa.

RRF assegna a ogni risultato un punteggio `1 / (60 + rank)` in ogni lista e somma i punteggi tra le liste. La costante 60 smorza il vantaggio dei primi posti, quindi un risultato che si classifica al secondo posto in entrambe le liste può superare un risultato che vince una lista e manca completamente l'altra. Importante, RRF non mai media i punteggi grezzi tra i metodi — il ranking FTS e la distanza coseno sono valute diverse e non possono essere combinate aritmeticamente.

<figure>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1120 660" role="img" aria-labelledby="rrf-title rrf-desc">
  <title id="rrf-title">Ricerca ibrida con Fusione per Reciprocal Rank</title>
  <desc id="rrf-desc">Una query si ramifica verso la ricerca full-text e la ricerca vettoriale, ciascuna produce un ranking, e la Fusione per Reciprocal Rank li combina in una singola lista di risultati.</desc>
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
  <text class="rrf-title-text" x="64" y="68">La ricerca ibrida è due segnali onesti, quindi un unico ranking fuso</text>
  <text class="rrf-subtitle" x="64" y="102">Non mediare i punteggi grezzi. Il ranking FTS e la distanza coseno sono valute diverse.</text>

  <rect class="rrf-box rrf-query" x="72" y="238" width="214" height="132" rx="20"/>
  <text class="rrf-head" x="104" y="288">Query dell'utente</text>
  <text class="rrf-mono" x="104" y="324">"withRetry</text>
  <text class="rrf-mono" x="104" y="350">timeout errors"</text>

  <path class="rrf-arrow-line" d="M286 270 C350 270 350 188 418 188"/>
  <path class="rrf-arrow-line" d="M286 338 C350 338 350 440 418 440"/>

  <rect class="rrf-box rrf-fts" x="418" y="142" width="266" height="144" rx="20"/>
  <text class="rrf-head" x="450" y="188">FTS / BM25</text>
  <text class="rrf-body" x="450" y="224">Simboli e parole esatti</text>
  <text class="rrf-rank" x="450" y="256">1. Riferimento API</text>
  <text class="rrf-rank" x="578" y="256">2. Guida ai retry</text>

  <rect class="rrf-box rrf-vector" x="418" y="394" width="266" height="144" rx="20"/>
  <text class="rrf-head" x="450" y="440">pgvector</text>
  <text class="rrf-body" x="450" y="476">Vicini concettuali</text>
  <text class="rrf-rank" x="450" y="508">1. Fallimenti di rete</text>
  <text class="rrf-rank" x="594" y="508">2. Guida ai retry</text>

  <path class="rrf-thin" d="M684 214 C734 214 734 294 778 294"/>
  <path class="rrf-thin" d="M684 466 C734 466 734 366 778 366"/>

  <rect class="rrf-box rrf-merge" x="778" y="260" width="258" height="166" rx="22"/>
  <text class="rrf-head" x="810" y="306">Fusione RRF</text>
  <text class="rrf-body" x="810" y="342">Assegna a ogni risultato crediti</text>
  <text class="rrf-body" x="810" y="368">per la posizione in ciascuna lista.</text>
  <text class="rrf-mono" x="810" y="402">1 / (60 + rank)</text>

  <path class="rrf-arrow-line" d="M907 426 L907 492"/>

  <rect class="rrf-box rrf-result" x="736" y="492" width="342" height="110" rx="20"/>
  <text class="rrf-head" x="768" y="538">Risultati finali</text>
  <text class="rrf-body" x="768" y="574">Il risultato migliore è dove i termini esatti</text>
  <text class="rrf-body" x="768" y="598">e il significato semantico concordano.</text>
</svg>
<figcaption>Una query si ramifica verso FTS e pgvector in parallelo. Ciascuna produce una propria lista ordinata. RRF assegna a ogni documento un punteggio in base alla sua posizione in ciascuna lista e somma i punteggi — il risultato mostra i documenti su cui entrambi i segnali concordano.</figcaption>
</figure>

```sql
-- Ricerca ibrida: FTS + pgvector fusi con RRF
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

Il pool di candidati da 60 documenti per ogni ramo (`LIMIT 60`) è un punto di partenza comune. Aumentarlo se la richiamo è bassa; restringerlo per velocità.

---

## Cosa segue

La ricerca testuale in Postgres copre molto terreno, ma ha un limite. Quando gli utenti descrivono ciò che desiderano invece di nominarlo — "qualcosa per aiutarmi a dormire durante un volo", "articoli sulla risoluzione dei problemi di fiducia come nuovo ingegnere" — la ricerca lessicale e a trigrammi entrambi falliscono.

Questo è il territorio degli embedding vettoriali, della ricerca semantica e delle architetture ibride. Approfondito in [Ricerca vettoriale semantica e strategie ibride](../semantic-vector-search-landscape).
````
