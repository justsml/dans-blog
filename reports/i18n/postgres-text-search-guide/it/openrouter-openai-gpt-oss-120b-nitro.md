# Translation Candidate
- Slug: postgres-text-search-guide
- Locale: it
- Model: openrouter/openai/gpt-oss-120b:nitro
- Target: src/content/posts/2026-05-02--postgres-text-search-guide/it/index.mdx
- Validation: deferred
- Runtime seconds: 5.67
- Input tokens: 16176
- Output tokens: 7987
- Thinking tokens: unknown
- Cached input tokens: 5376
- Cache write tokens: 0
- Estimated cost: $0.002069
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
title: Guida alla ricerca testuale in Postgres 2026
subTitle: Gli strumentidi ricerca nel tuo database e quando ciascuno è utile.
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
La maggiorparte dei team utilizza un unico strumento di ricerca in Postgres. I team che conoscono tutti e tre gli strumenti realizzano ricerche migliori con meno complessità — e evitano la costosa deviazione verso un servizio di ricerca dedicato che non era ancora necessario.

Questa guida copre l’intero set di opzioni native di Postgres: cosa fa ciascuna, quando è la scelta giusta e come combinarle.

---

## I Tre Strumenti

**Full‑text search** (`tsvector` / `GIN` index) è lessicale. Tokenizza il testo in lemmi, ne applica lo stemming e confronta le query con l’indice. “Running” e “runs” si riducono allo stesso lemma. Lo stesso vale per “dog” e “dogs”. La funzione di ranking (`ts_rank`) premia i documenti in cui i termini della query compaiono frequentemente o in posizioni di rilievo.

**Trigrammi** (`pg_trgm`) suddividono le stringhe in sequenze sovrapposte di 3 caratteri e misurano quante di queste sequenze due stringhe condividono. “Dan” → `" da"`, `"dan"`, `"an "`. “Micheal” e “Michael” condividono la maggior parte dei loro trigrammi, quindi la similarità è alta. Questo rende `pg_trgm` eccellente per il matching fuzzy di nomi, la tolleranza ai typo e l’autocompletamento — lo spazio in cui il FTS performa male.

**Exact-match indexes** (B‑tree, hash) gestiscono chiavi primarie, indirizzi email, ID, SKU e qualsiasi campo in cui la risposta è binaria: corrisponde o non corrisponde. Non sembrano “ricerca”, ma rientrano nella discussione perché il peggior errore è usare una ricerca fuzzy o semantica per problemi che hanno risposte corrette.

La scelta non riguarda la sofisticazione. Riguarda l’abbinamento dello strumento alla forma della query.

<figure>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1120 720" role="img" aria-labelledby="stm-title stm-desc">
  <title id="stm-title">Postgres search tool map</title>
  <desc id="stm-desc">A comparison of pg_trgm, full-text search, pgvector, and hybrid search by input shape and query intent.</desc>
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
  <text class="stm-title-text" x="64" y="70">Pick the search primitive by input shape</text>
  <text class="stm-subtitle" x="64" y="103">The same Postgres table can support all four. The trick is matching the query to the text.</text>

  <line class="stm-line" x1="560" y1="150" x2="560" y2="640"/>
  <line class="stm-line" x1="76" y1="395" x2="1044" y2="395"/>

  <text class="stm-axis" x="360" y="142">Exact words matter</text>
  <text class="stm-axis" x="650" y="142">Meaning matters</text>
  <text class="stm-axis" x="78" y="388" transform="rotate(-90 78 388)">Short / structured text</text>
  <text class="stm-axis" x="78" y="628" transform="rotate(-90 78 628)">Long prose / chunks</text>

  <rect class="stm-card" x="112" y="168" width="408" height="186" rx="20"/>
  <rect x="136" y="192" width="100" height="28" rx="14" fill="#f59e0b"/>
  <text class="stm-label" x="154" y="212">fuzzy</text>
  <text class="stm-tool" x="136" y="256">pg_trgm</text>
  <text class="stm-body" x="136" y="294">Names, addresses, titles, typos,</text>
  <text class="stm-body" x="136" y="320">autocomplete, partial strings.</text>
  <text class="stm-small" x="136" y="344">Orthographic similarity: spelling distance.</text>

  <rect class="stm-card" x="600" y="168" width="408" height="186" rx="20"/>
  <rect x="624" y="192" width="116" height="28" rx="14" fill="#22c55e"/>
  <text class="stm-label" x="644" y="212">similar</text>
  <text class="stm-tool" x="624" y="256">pgvector</text>
  <text class="stm-body" x="624" y="294">Related items, duplicate tickets,</text>
  <text class="stm-body" x="624" y="320">recommendations from short descriptions.</text>
  <text class="stm-small" x="624" y="344">Embedding similarity: meaning distance.</text>

  <rect class="stm-card" x="112" y="436" width="408" height="186" rx="20"/>
  <rect x="136" y="460" width="102" height="28" rx="14" fill="#38bdf8"/>
  <text class="stm-label" x="158" y="480">lexical</text>
  <text class="stm-tool" x="136" y="524">Full-text search</text>
  <text class="stm-body" x="136" y="562">Articles, docs, logs, support content</text>
  <text class="stm-body" x="136" y="588">where query words should appear.</text>
  <text class="stm-small" x="136" y="612">Lexemes, stemming, ranking, boolean filters.</text>

  <rect class="stm-card" x="600" y="436" width="408" height="186" rx="20"/>
  <rect x="624" y="460" width="102" height="28" rx="14" fill="#f472b6"/>
  <text class="stm-label" x="645" y="480">hybrid</text>
  <text class="stm-tool" x="624" y="524">FTS + pgvector</text>
  <text class="stm-body" x="624" y="562">Technical docs and RAG where users ask</text>
  <text class="stm-body" x="624" y="588">conceptual questions plus exact symbols.</text>
  <text class="stm-small" x="624" y="612">Run both, fuse ranks with RRF.</text>

  <rect x="396" y="658" width="328" height="36" rx="18" fill="url(#header)"/>
  <text class="stm-chip" x="429" y="681">Start with query intent, then check text shape</text>
</svg>
<figcaption>Le quattro primitive di ricerca di Postgres mappate per intento della query (esatto vs. semantico) e forma del testo (strutturato vs. prosa). La stessa tabella può contenere tutti e quattro gli indici — la scelta è per query, non per tabella.</figcaption>
</figure>

---

## Quando vince il Full‑Text Search

**Ricerca di parole chiave in prosa.** Post dei blog, documentazione, descrizioni di prodotto, ticket di supporto, documenti legali. Il FTS è stato progettato per questo tipo di contenuto: recupero indicizzato e classificato su testo in linguaggio naturale.

**Query utente basate su parole chiave.** Gli utenti digitano un termine di ricerca, filtrano per tag o navigano per parola chiave. Il FTS gestisce nativamente questa intenzione senza alcuna infrastruttura di embedding.

**Risultati ordinati senza dipendenze esterne.** Gli indici FTS sono veloci, deterministici e non richiedono chiamate API. Il segnale di rilevanza proviene dalla frequenza del termine ponderata dalla posizione del campo.

**Filtraggio booleano insieme alla ricerca.** Il FTS si compone naturalmente con la logica di query esistente:

```sql
SELECT * FROM posts
WHERE search_vector @@ to_tsquery('english', 'postgres & performance')
  AND category = 'tutorial'
  AND published_at > NOW() - INTERVAL '6 months';
```

### Configurare il FTS

```sql
-- La colonna generata mantiene l'indice aggiornato automaticamente
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

`setweight` assegna importanza: `A` (titolo) supera `B` (corpo). Questo è l’intero modello di rilevanza per la maggior parte dei casi d’uso di ricerca di contenuti.

### Cosa il FTS non gestisce bene

- Errori di battitura nelle query — “javascipt” non corrisponderà a “javascript”
- Nomi di persone, indirizzi, nomi propri che non subiscono una riduzione prevedibile
- Prefisso/autocompletamento senza configurazione speciale
- Query in cui l'utente descrive un concetto anziché nominarlo

---

## Quando vincono i Trigrammi (`pg_trgm`)

`pg_trgm` copre il fastidioso punto intermedio che il FTS gestisce costantemente male.

Il FTS tokenizza il testo in lemmi e ne esegue lo stemming. Per la prosa questo è corretto. Per i nomi e gli identificatori brevi spesso non lo è:

- Nomi di persone (“Dan Levy” → ridotto diversamente a seconda del dizionario e della configurazione linguistica)
- Nomi di aziende, indirizzi, titoli di prodotto dove l'ortografia esatta è importante
- Query con errori di battitura — “Micheal Jordan”, “Amaon”, “javascipt”
- Autocompletamento / ricerca per prefisso
- Corrispondenza parziale di stringhe (“son” che corrisponde a “Johnson”, “Anderson”)

`pg_trgm` è anche indipendentedalla lingua, un aspetto importante quando si gestiscono nomi provenienti da contesti linguistici diversi. FTS richiede la configurazione di dizionari per ogni lingua.

### Ricerca Fuzzy di Nomi

```sql
CREATE EXTENSION IF NOT EXISTS pg_trgm;

CREATE INDEX users_name_trgm_idx ON users USING GIN (name gin_trgm_ops);

-- Trova "Micheal Jordan" quando si cerca "Michael Jordan"
SELECT id, name, similarity(name, $1) AS score
FROM users
WHERE name % $1          -- operatore % = soglia di similarità (default 0.3)
ORDER BY score DESC
LIMIT 10;
```

L'operatore `%` utilizza `pg_trgm.similarity_threshold` (default 0.3, intervallo 0–1). Per la ricerca di nomi, una soglia tra 0.3 e 0.4 intercetta gli errori di battitura mantenendo basso il rumore.

### Autocompletamento, Prefisso e Ricerca di Contenuto

```sql
-- Matching di prefisso per autocompletamento. Un indice GIN trigram può aiutare,
-- ma un indice B‑tree su pattern potrebbe essere più efficace per prefissi puramente ancorati a sinistra.
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

L'indice GIN trigram è particolarmente utile per query `ILIKE '%pattern%'` di tipo contains e per matching tollerante agli errori di battitura — pattern che altrimenti richiederebbero scansioni complete della tabella senza un indice trigram.

### Quando Preferire pg_trgm rispetto a FTS

| Scenario | Uso |
|---|---|
| Ricerca di nome persona/azienda con errori di battitura | `pg_trgm` |
| Autocompletamento / ricerca per prefisso | `pg_trgm` (o FTS con query di prefisso) |
| Stringhe brevi, identificatori, codici | `pg_trgm` |
| Articoli di prosa, documentazione, ticket | FTS |
| Messaggi di log per parole chiave | FTS |
| Ricerca di nomi multilingue | `pg_trgm` (indipendente dalla lingua) |

---

## Quando vince la ricerca esatta in SQL

Alcuni problemi di “ricerca” non sono affatto ricerca.

“Trova l’utente con email `dan@example.com`” è un controllo di uguaglianza. “Trova l’ordine `ORD-12345`” è una ricerca per chiave primaria. “Elenca i post nella categoria `tutorial` ordinati per data” è una query filtrata. Questi casi appartengono a indici B‑tree o hash.

Usare FTS o trigrammi in questi contesti aggiunge complessità senza migliorare la correttezza — e per identificatori esatti, una corrispondenza approssimativa è peggiore di nessuna corrispondenza.

```sqlCREATE INDEX users_email_idx ON users (email);

-- Ricerca esatta: veloce e univoca
SELECT id, name FROM users WHERE email = $1;
```

La lezione più ampia: usare una ricerca approssimativa per problemi che hanno risposte corrette è un errore di categoria. Restituisce *qualcosa* — che può essere decisamente sbagliato.

---

## Combinare questi strumenti

Questi strumenti si integrano senza problemi. Non si sceglie un solo.

**FTS + pg_trgm per una casella di ricerca che tollera errori di battitura nelle parole chiave:**

```sql
-- La similarità trigramma sul titolo cattura gli errori di battitura; ts_rank gestisce la rilevanza del corpo
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
-- Rimuove i segni diacritici così "José" corrisponde a "Jose"
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

**`unaccent` + `pg_trgm` per la ricerca di nomi internazionali:**

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

Gli esempi di trigger evitano di usare `unaccent()` all’interno di colonne generate o di espressioni di indice, dove le regole di immutabilità di PostgreSQL sono decisive. Se avvolgi `unaccent()` in una tua funzione immutabile, documenta che stai accettando un rischio di upgrade/configurazione.

---

## Estensioni Degne di Nota

**`pg_trgm`** è incluso nella maggior parte delle distribuzioni di Postgres ma richiede l’attivazione esplicita. È la base per il matching fuzzy di stringhe in Postgres.

**`unaccent`** rimuove i segni diacritici prima dell’indicizzazione e della ricerca. Si abbina bene sia a `pg_trgm` sia a FTS per contenuti in lingue europee. È fornito con Postgres.

**`pg_bigm`** estende l'approccio trigramma ai bigrammi (fette di 2 caratteri), migliorando notevolmente i risultati per le lingue CJK (cinese, giapponese, coreano) dove `pg_trgm` è poco efficace. Deve essere installato separatamente; non è incluso nel pacchetto.

**`pg_search`** (da [ParadeDB](https://www.paradedb.com/)) sostituisce lo stack standard `GIN` / `tsvector` con un indice BM25 basato su Tantivy. Questo fornisce punteggio BM25 (spesso migliore di `ts_rank`), matching fuzzy all'interno delle query FTS, ricerca facetata e indicizzazione notevolmente più veloce su tabelle di grandi dimensioni. È una via di aggiornamento drop‑in quando la FTS standard inizia a mostrare limiti di ranking o di performance.

```sql
-- pg_search: BM25 full-text search with fuzzy matching
CREATE INDEX posts_bm25_idx ON posts
  USING bm25 (id, title, body)
  WITH (key_field = 'id', text_fields = '{"title": {}, "body": {}}');

-- Query with BM25 scoring + fuzzy matching (catches "javascipt")
SELECT id, title, paradedb.score(id) AS rank
FROM posts
WHERE posts @@@ paradedb.fuzzy_phrase(field => 'title', value => 'postgres performnce')
ORDER BY rank DESC
LIMIT 10;
```

**`pgvector`** aggiunge memorizzazione di vettori densi e ricerca per similarità. È lo strumento giusto quando gli utenti descrivono ciò che vogliono anziché nominarlo — ricerca semantica, RAG, raccomandazioni di contenuti correlati, query multilingue. Approfondito in [Ricerca Vettoriale Semantica e Strategie Ibride](../semantic-vector-search-landscape).

---

## Tabella decisionale

| Cosa stai cercando | Raccomandazione |
|---|---|
| Articoli di prosa, documentazione, ticket | FTS |
| Nomi di persone/aziende con errori di battitura | `pg_trgm` |
| Autocompletamento, ricerca per prefisso | `pg_trgm` |
| Codici brevi, identificatori | `pg_trgm` |
| Messaggi di log per parole chiave | FTS |
| Nomi internazionali | `pg_trgm` + `unaccent` |
| Contenuti voluminosi, ranking migliore | `pg_search` (ParadeDB BM25) |
| Chiavi primarie, email esatte, ID | Indice B‑tree |
| Date, intervalli, elenchi ordinati | Indice B‑tree |
| Permessi, categorie, filtri | Clausola WHERE regolare |
| Domande, parafrasi, concetti | pgvector (vedi articolo successivo) |

Quando c’è dubbio: stringhe corte con variazioni ortografiche → trigrammi. Prosa lunga per query a parole chiave → FTS. Identificatori strutturati → indici regolari. Query concettuali o in linguaggio naturale → pgvector.

---

## Ricerca ibrida: due segnali, un ranking

Quando una query come `"withRetry timeout errors"` arriva in una casella di ricerca, trasporta due tipi di intento: nomi di simboli esatti che l’utente conosce (`withRetry`) e una descrizione concettuale (`timeout errors`). Nessun singolo primitivo copre entrambi. Eseguire FTS e ricerca vettoriale in parallelo — per poi fondere le loro liste ordinate con Reciprocal Rank Fusion — lo fa.

RRF assegna a ogni risultato il punteggio `1 / (60 + rank)` in ciascuna lista e somma i valori tra le liste. La costante 60 attenua il vantaggio delle posizioni più alte, così un risultato che si piazza secondo in entrambe le liste può superare un risultato che vince una lista e manca completamente nell’altra. Fondamentale, RRF non media mai i punteggi grezzi tra i metodi — il ranking FTS e la distanza coseno sono valute diverse e non possono essere combinate aritmeticamente.

<figure>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1120 660" role="img" aria-labelledby="rrf-title rrf-desc">
  <title id="rrf-title">Hybrid search with Reciprocal Rank Fusion</title>
  <desc id="rrf-desc">A query fans out to full-text search and vector search, each produces ranks, and Reciprocal Rank Fusion combines them into one result list.</desc>
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
  <text class="rrf-title-text" x="64" y="68">Hybrid search is two honest signals, then one merged rank</text>
  <text class="rrf-subtitle" x="64" y="102">Do not average raw scores. FTS rank and cosine distance are different currencies.</text>

  <rect class="rrf-box rrf-query" x="72" y="238" width="214" height="132" rx="20"/>
  <text class="rrf-head" x="104" y="288">User query</text>
  <text class="rrf-mono" x="104" y="324">"withRetry</text>
  <text class="rrf-mono" x="104" y="350">timeout errors"</text>

  <path class="rrf-arrow-line" d="M286 270 C350 270 350 188 418 188"/>
  <path class="rrf-arrow-line" d="M286 338 C350 338 350 440 418 440"/>

  <rect class="rrf-box rrf-fts" x="418" y="142" width="266" height="144" rx="20"/>
  <text class="rrf-head" x="450" y="188">FTS / BM25</text>
  <text class="rrf-body" x="450" y="224">Exact symbols and words</text>
  <text class="rrf-rank" x="450" y="256">1. API reference</text>
  <text class="rrf-rank" x="578" y="256">2. Retry guide</text>

  <rect class="rrf-box rrf-vector" x="418" y="394" width="266" height="144" rx="20"/>
  <text class="rrf-head" x="450" y="440">pgvector</text>
  <text class="rrf-body" x="450" y="476">Conceptual neighbors</text>
  <text class="rrf-rank" x="450" y="508">1. Network failures</text>
  <text class="rrf-rank" x="594" y="508">2. Retry guide</text>

  <path class="rrf-thin" d="M684 214 C734 214 734 294 778 294"/>
  <path class="rrf-thin" d="M684 466 C734 466 734 366 778 366"/>

  <rect class="rrf-box rrf-merge" x="778" y="260" width="258" height="166" rx="22"/>
  <text class="rrf-head" x="810" y="306">RRF merge</text>
  <text class="rrf-body" x="810" y="342">Give each result credit for</text>
  <text class="rrf-body" x="810" y="368">where it ranked in each list.</text>
  <text class="rrf-mono" x="810" y="402">1 / (60 + rank)</text>

  <path class="rrf-arrow-line" d="M907 426 L907 492"/>

  <rect class="rrf-box rrf-result" x="736" y="492" width="342" height="110" rx="20"/>
  <text class="rrf-head" x="768" y="538">Final results</text>
  <text class="rrf-body" x="768" y="574">The top hit is where exact terms</text>
  <text class="rrf-body" x="768" y="598">and semantic meaning agree.</text>
</svg>
<figcaption>Una query si dirama verso FTS e pgvector in parallelo. Ognuna produce la propria lista ordinata. RRF assegna a ogni documento un punteggio in base alla sua posizione in ciascuna lista e somma i punteggi — il risultato mette in evidenza i documenti su cui entrambi i segnali concordano.</figcaption>
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

Il pool di candidati di 60 documenti per ramo (`LIMIT 60`) è un punto di partenza comune. Allargalo se il richiamo è basso; restringilo per velocità.

---

## Cosa segue

La ricerca testuale di Postgres copre molto, ma ha un limite. Quando gli utenti descrivono ciò che vogliono invece di nominarlo — “qualcosa che mi aiuti a dormire su un volo”, “articoli su come aumentare la fiducia nel debugging come nuovo ingegnere” — la ricerca lessicale e a trigrammi falliscono entrambe.

Questo è il territorio degli embedding vettoriali, della ricerca semantica e delle architetture ibride. Coperto in [Ricerca Vettoriale Semantica e Strategie Ibride](../semantic-vector-search-landscape).
````
