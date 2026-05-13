# Translation Candidate
- Slug: postgres-text-search-guide
- Locale: de
- Model: openrouter/openai/gpt-oss-120b:nitro
- Target: src/content/posts/2026-05-02--postgres-text-search-guide/de/index.mdx
- Validation: passed
- Runtime seconds: 21.94
- Input tokens: 16265
- Output tokens: 7848
- Thinking tokens: unknown
- Cached input tokens: 3328
- Cache write tokens: 0
- Estimated cost: $0.002047
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
title: Postgres-Textsuche‑Leitfaden 2026
subTitle: >-
  Die bereits in Ihrer Datenbank vorhandenen Suchwerkzeuge und wann jedes von
  ihnen sich bewährt.
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
Die meisten Teams setzen ein einziges PostgreSQL‑Suchwerkzeug ein. Teams, die alle drei kennen, liefern bessere Suche bei weniger Komplexität — und vermeiden den teuren Umweg zu einem dedizierten Suchservice, den sie noch nicht benötigen.

Dieser Leitfaden behandelt das komplette Set an PostgreSQL‑nativen Optionen: was jede einzelne leistet, wann sie passend ist und wie man sie schichtet.

---

## Die drei Werkzeuge

**Volltextsuche** (`tsvector` / `GIN`‑Index) ist lexical. Sie zerlegt Text in Lexeme, reduziert sie auf ihre Wortstämme und vergleicht Anfragen gegen den Index. „Running“ und „runs“ kollabieren zum selben Lexem. Gleiches gilt für „dog“ und „dogs“. Die Ranking‑Funktion (`ts_rank`) belohnt Dokumente, in denen die Abfragebegriffe häufig oder prominent vorkommen.

**Trigramme** (`pg_trgm`) zerlegen Zeichenketten in überlappende 3‑Zeichen‑Slices und messen, wie viele dieser Slices zwei Zeichenketten gemeinsam haben. „Dan“ → `" da"`, `"dan"`, `"an "`. „Micheal“ und „Michael“ teilen die meisten ihrer Trigramme, sodass die Ähnlichkeit hoch ist. Das macht `pg_trgm` hervorragend für unscharfe Namensabgleiche, Tipp‑Toleranz und Autovervollständigung — genau dort, wo die Volltextsuche schwächelt.

**Exact‑Match‑Indizes** (B‑Tree, Hash) bedienen Primärschlüssel, E‑Mail‑Adressen, IDs, SKUs und alles, wo das Ergebnis binär ist: es stimmt überein oder nicht. Das fühlt sich nicht nach „Suche“ an, gehört aber in die Diskussion, weil das schlimmste Muster darin besteht, unscharfe oder semantische Suche für Probleme zu verwenden, die eindeutige Antworten haben.

Die Entscheidung hängt nicht von Raffinesse ab. Sie beruht darauf, das Werkzeug zur Form der Anfrage zu passen.

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
<figcaption>Die vier PostgreSQL‑Suchprimitive, abgebildet nach Abfrage‑Intent (exakt vs. semantisch) und Textform (strukturiert vs. Prosa). Die gleiche Tabelle kann alle vier Indizes tragen — die Wahl erfolgt pro Abfrage, nicht pro Tabelle.</figcaption>
</figure>

---

## Wenn Volltextsuche gewinnt

**Prosa nach Schlüsselwörtern durchsuchen.** Blog‑Posts, Dokumentation, Produktbeschreibungen, Support‑Tickets, Rechtsdokumente. FTS wurde für diese Art von Inhalt konzipiert: indizierte, rangbasierte Retrieval‑Operationen über natürlichsprachlichen Text.

**Keyword-basierte Benutzerabfragen.** Nutzer geben einen Suchbegriff ein, filtern nach Tag oder browsen nach Stichwort. FTS deckt diese Intention nativ ab, ohne dass eine Embedding‑Infrastruktur nötig ist.

**Rangierte Ergebnisse ohne externe Abhängigkeiten.** FTS‑Indizes sind schnell, deterministisch und benötigen keine API‑Aufrufe. Das Relevanz‑Signal stammt aus der Term‑Häufigkeit, gewichtet nach Feldposition.

**Boolesches Filtern zusammen mit Suche.** FTS lässt sich nahtlos in die bestehende Abfragelogik einbinden:

```sql
SELECT * FROM posts
WHERE search_vector @@ to_tsquery('english', 'postgres & performance')
  AND category = 'tutorial'
  AND published_at > NOW() - INTERVAL '6 months';
```

### Einrichtung von FTS

```sql
-- Generierte Spalte hält den Index automatisch aktuell
ALTER TABLE posts ADD COLUMN search_vector tsvector
  GENERATED ALWAYS AS (
    setweight(to_tsvector('english', coalesce(title, '')), 'A') ||
    setweight(to_tsvector('english', coalesce(body,  '')), 'B')
  ) STORED;

CREATE INDEX posts_search_idx ON posts USING GIN (search_vector);

-- Abfrage
SELECT title, ts_rank(search_vector, query) AS rank
FROM posts, to_tsquery('english', 'postgres & performance') query
WHERE search_vector @@ query
ORDER BY rank DESC
LIMIT 10;
```

`setweight` weist Gewichtungen zu: `A` (Titel) hat Vorrang vor `B` (Inhalt). Das ist das komplette Relevanzmodell für die meisten Content‑Suche‑Szenarien.

### Was FTS nicht gut abdeckt


- Tippfehler in Anfragen — „javascipt“ wird nicht mit „javascript“ übereinstimmen  
- Personennamen, Adressen, Eigennamen, die sich nicht vorhersehbar stämmen lassen  
- Präfix‑/Autocomplete‑Suche ohne spezielle Konfiguration  
- Anfragen, bei denen der Nutzer ein Konzept beschreibt statt es zu benennen  

## Wenn Trigramme gewinnen (`pg_trgm`)

`pg_trgm` deckt das unbequeme Mittelfeld ab, das FTS konsequent verpatzt.

FTS zerlegt Text in Lexeme und führt Stemming durch. Für Fließtext ist das korrekt. Für Namen und kurze Bezeichner ist es häufig nicht passend:

- Personennamen („Dan Levy“ → je nach Wörterbuch und Sprachkonfiguration unterschiedlich gestemmt)  
- Firmennamen, Adressen, Produkttitel, bei denen die exakte Schreibweise entscheidend ist  
- Anfragen mit Tippfehlern — „Micheal Jordan“, „Amaon“, „javascipt“  
- Autocomplete‑/Präfixsuche  
- Teilstring‑Abgleich („son“ findet „Johnson“, „Anderson“)

`pg_trgm` ist zudem sprachunabhängig, was bei Namen aus unterschiedlichen linguistischen Hintergründen wichtig ist. FTS erfordert für jede Sprache eine eigene Wörterbuchkonfiguration.

### Fuzzy‑Namenssuche

```sql
CREATE EXTENSION IF NOT EXISTS pg_trgm;

CREATE INDEX users_name_trgm_idx ON users USING GIN (name gin_trgm_ops);

-- Findet "Micheal Jordan", wenn nach "Michael Jordan" gesucht wird
SELECT id, name, similarity(name, $1) AS score
FROM users
WHERE name % $1          -- %‑Operator = Ähnlichkeitsschwelle (Standard 0.3)
ORDER BY score DESC
LIMIT 10;
```

Der `%`‑Operator verwendet `pg_trgm.similarity_threshold` (Standard 0.3, Wertebereich 0–1). Für die Namenssuche fängt eine Schwelle von 0.3–0.4 Tippfehler ab, während das Rauschen gering bleibt.

### Autocomplete, Präfix‑ und Contains‑Suche

```sql
-- Präfix‑Abgleich für Autocomplete. Ein Trigram‑GIN‑Index kann helfen,
-- aber ein B‑Tree‑Pattern‑Index ist bei rein linksbündigen Präfixen oft besser.
SELECT name FROM users
WHERE name ILIKE $1 || '%'
ORDER BY name
LIMIT 10;

-- word_similarity für Teilübereinstimmungen innerhalb längerer Zeichenketten
-- ("Johnson" innerhalb von "Andrew Johnson III")
SELECT id, name, word_similarity($1, name) AS score
FROM users
WHERE $1 <% name
ORDER BY score DESC
LIMIT 10;
```

Der Trigram‑GIN‑Index ist besonders nützlich für `ILIKE '%pattern%'`‑Contains‑Abfragen und tippen‑tolerante Vergleiche – Muster, die ohne Trigram‑Index normalerweise Volltabellenscans erfordern.

### Wann `pg_trgm` gegenüber FTS bevorzugen


| Szenario | Einsatz |
|---|---|
| Personen‑/Firmennamen‑Suche mit Tippfehlern | `pg_trgm` |
| Autovervollständigung / Präfixsuche | `pg_trgm` (oder FTS mit Präfix‑Abfragen) |
| Kurze Zeichenketten, Bezeichner, Codes | `pg_trgm` |
| Fließtext‑Artikel, Dokumentation, Tickets | FTS |
| Log‑Nachrichten für Stichwörter | FTS |
| Mehrsprachige Namenssuche | `pg_trgm` (sprachunabhängig) |

---

## Wenn exakte SQL‑Abfragen gewinnen

Einige „Such“-Probleme sind überhaupt keine Suche.

„Finde den Nutzer mit der E‑Mail `dan@example.com`“ ist ein Gleichheits‑Check. „Finde Bestellung `ORD-12345`“ ist ein Primärschlüssel‑Lookup. „Liste Beiträge in der Kategorie `tutorial` sortiert nach Datum“ ist eine gefilterte Abfrage. Diese Fälle gehören auf B‑Tree‑ oder Hash‑Indizes.

Der Einsatz von FTS oder Trigrammen hier erhöht die Komplexität, ohne die Korrektheit zu verbessern — und bei exakten Kennungen ist ein Näherungs‑Match schlechter als kein Treffer.

```sql
CREATE INDEX users_email_idx ON users (email);

-- Exakter Lookup: schnell und eindeutig
SELECT id, name FROM users WHERE email = $1;
```

Die übergeordnete Lehre: Eine approximative Suche für Probleme, bei denen es eine eindeutige richtige Antwort gibt, ist ein Kategoriewiderspruch. Sie liefert *etwas* — das mit hoher Sicherheit falsch sein kann.

---

## Kombination dieser Werkzeuge

Diese Werkzeuge lassen sich sauber kombinieren. Man wählt nicht strikt nur eines aus.

**FTS + pg_trgm für ein Suchfeld, das Tippfehler bei Schlüsselwörtern toleriert:**

```sql
-- Trigram‑Ähnlichkeit im Titel fängt Tippfehler ab; ts_rank bewertet die Relevanz des Inhalts
SELECT id, title,
  ts_rank(search_vector, to_tsquery('simple', $1)) AS fts_rank,
  similarity(title, $1) AS trgm_score
FROM posts
WHERE search_vector @@ to_tsquery('simple', $1)
   OR title % $1
ORDER BY (ts_rank(search_vector, to_tsquery('simple', $1)) + similarity(title, $1)) DESC
LIMIT 10;
```

**FTS + `unaccent` für internationalen Inhalt:**

```sql
-- Diakritische Zeichen entfernen, sodass „José“ mit „Jose“ übereinstimmt
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

**`unaccent` + `pg_trgm` für internationale Namenssuche:**

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

Die Trigger‑Beispiele vermeiden die Verwendung von `unaccent()` innerhalb von generierten Spalten oder Index‑Ausdrücken, wo die Immutabilitätsregeln von PostgreSQL relevant sind. Wenn Sie `unaccent()` in eine eigene unveränderliche Funktion einwickeln, dokumentieren Sie, dass Sie damit ein Upgrade‑ bzw. Konfigurationsrisiko akzeptieren.

---

## Bemerkenswerte Erweiterungen

**`pg_trgm`** ist in den meisten PostgreSQL‑Distributionen enthalten, muss jedoch explizit aktiviert werden. Es bildet die Basis für unscharfe Zeichenketten‑Vergleiche in PostgreSQL.

**`unaccent`** entfernt diakritische Zeichen vor dem Indexieren und Abfragen. Es lässt sich sowohl mit `pg_trgm` als auch mit FTS für Inhalte in europäischen Sprachen gut kombinieren. Wird mit PostgreSQL ausgeliefert.

**`pg_bigm`** erweitert den Trigram‑Ansatz zu Bigrams (2‑Zeichen‑Slices), was die Ergebnisse für CJK‑Sprachen (Chinesisch, Japanisch, Koreanisch) deutlich verbessert, wo `pg_trgm` schwächelt. Muss separat installiert werden; nicht im Lieferumfang enthalten.

**`pg_search`** (von [ParadeDB](https://www.paradedb.com/)) ersetzt den Standard‑`GIN` / `tsvector`‑Stack durch einen Tantivy‑basierten BM25‑Index. Das liefert BM25‑Scoring (oft besser als `ts_rank`), unscharfe Treffer innerhalb von FTS‑Abfragen, facettierte Suche und dramatisch schnellere Indexierung großer Tabellen. Es ist ein Drop‑in‑Upgrade‑Pfad, wenn das Standard‑FTS an Ranking‑ oder Performance‑Grenzen stößt.

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

**`pgvector`** fügt dichte Vektorspeicherung und Ähnlichkeitssuche hinzu. Es ist das richtige Werkzeug, wenn Nutzer beschreiben, was sie wollen, anstatt es zu benennen — semantische Suche, RAG, Empfehlungen für verwandte Inhalte, mehrsprachige Abfragen. Ausführlich behandelt in [Semantic Vector Search and Hybrid Strategies](../semantic-vector-search-landscape).

---

## Entscheidungstabelle

| Was Sie suchen | Empfohlen |
|---|---|
| Fließtext‑Artikel, Dokumente, Tickets | FTS |
| Personen‑/Firmennamen mit Tippfehlern | `pg_trgm` |
| Autovervollständigung, Präfixsuche | `pg_trgm` |
| Kurze Codes, Bezeichner | `pg_trgm` |
| Log‑Nachrichten für Schlüsselwörter | FTS |
| Internationale Namen | `pg_trgm` + `unaccent` |
| Große Inhalte, besseres Ranking | `pg_search` (ParadeDB BM25) |
| Primärschlüssel, exakte E‑Mails, IDs | B‑Tree‑Index |
| Daten, Bereiche, sortierte Listen | B‑Tree‑Index |
| Berechtigungen, Kategorien, Filter | Regulärer WHERE‑Clause |
| Fragen, Paraphrasen, Konzepte | pgvector (siehe nächster Artikel) |

Wenn Sie unsicher sind: Kurze Zeichenketten mit Rechtschreibvariationen → Trigramme. Langer Fließtext für Stichwortabfragen → FTS. Strukturierte Bezeichner → reguläre Indizes. Konzeptuelle oder natürlichsprachliche Abfragen → pgvector.

---

## Hybrid‑Suche: Zwei Signale, ein Rang

Wenn eine Abfrage wie `"withRetry timeout errors"` in ein Suchfeld eingegeben wird, transportiert sie zwei Arten von Intent: exakte Symbolnamen, die der Nutzer kennt (`withRetry`), und eine konzeptuelle Beschreibung (`timeout errors`). Kein einzelnes Primitive deckt beides ab. Die parallele Ausführung von FTS und Vektorsuche – gefolgt von der Zusammenführung ihrer Ranglisten mittels Reciprocal Rank Fusion – erledigt das.

RRF bewertet jedes Ergebnis mit `1 / (60 + rank)` in jeder Liste und summiert über die Listen hinweg. Die Konstante 60 dämpft den Vorteil der Spitzenränge, sodass ein Ergebnis, das in beiden Listen den zweiten Platz belegt, ein Ergebnis schlagen kann, das eine Liste gewinnt und in der anderen völlig fehlt. Entscheidend: RRF bildet niemals rohe Scores verschiedener Methoden zu einem Mittelwert – FTS‑Rang und Kosinus‑Distanz sind unterschiedliche Währungen und lassen sich nicht arithmetisch kombinieren.

<figure>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1120 660" role="img" aria-labelledby="rrf-title rrf-desc">
  <title id="rrf-title">Hybrid‑Suche mit Reciprocal Rank Fusion</title>
  <desc id="rrf-desc">Eine Abfrage verzweigt zu Volltextsuche und Vektorsuche, jede erzeugt Ränge, und Reciprocal Rank Fusion kombiniert sie zu einer Ergebnisliste.</desc>
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
  <text class="rrf-title-text" x="64" y="68">Hybrid‑Suche ist zwei ehrliche Signale, dann ein zusammengeführter Rang</text>
  <text class="rrf-subtitle" x="64" y="102">Keine rohen Scores mitteln. FTS‑Rang und Kosinus‑Distanz sind unterschiedliche Währungen.</text>

  <rect class="rrf-box rrf-query" x="72" y="238" width="214" height="132" rx="20"/>
  <text class="rrf-head" x="104" y="288">Benutzer‑Abfrage</text>
  <text class="rrf-mono" x="104" y="324">"withRetry</text>
  <text class="rrf-mono" x="104" y="350">timeout errors"</text>

  <path class="rrf-arrow-line" d="M286 270 C350 270 350 188 418 188"/>
  <path class="rrf-arrow-line" d="M286 338 C350 338 350 440 418 440"/>

  <rect class="rrf-box rrf-fts" x="418" y="142" width="266" height="144" rx="20"/>
  <text class="rrf-head" x="450" y="188">FTS / BM25</text>
  <text class="rrf-body" x="450" y="224">Exakte Symbole und Wörter</text>
  <text class="rrf-rank" x="450" y="256">1. API‑Referenz</text>
  <text class="rrf-rank" x="578" y="256">2. Retry‑Leitfaden</text>

  <rect class="rrf-box rrf-vector" x="418" y="394" width="266" height="144" rx="20"/>
  <text class="rrf-head" x="450" y="440">pgvector</text>
  <text class="rrf-body" x="450" y="476">Konzeptuelle Nachbarn</text>
  <text class="rrf-rank" x="450" y="508">1. Netzwerk‑Fehler</text>
  <text class="rrf-rank" x="594" y="508">2. Retry‑Leitfaden</text>

  <path class="rrf-thin" d="M684 214 C734 214 734 294 778 294"/>
  <path class="rrf-thin" d="M684 466 C734 466 734 366 778 366"/>

  <rect class="rrf-box rrf-merge" x="778" y="260" width="258" height="166" rx="22"/>
  <text class="rrf-head" x="810" y="306">RRF‑Merge</text>
  <text class="rrf-body" x="810" y="342">Jedes Ergebnis erhält Gutschrift für</text>
  <text class="rrf-body" x="810" y="368">seine Position in jeder Liste.</text>
  <text class="rrf-mono" x="810" y="402">1 / (60 + rank)</text>

  <path class="rrf-arrow-line" d="M907 426 L907 492"/>

  <rect class="rrf-box rrf-result" x="736" y="492" width="342" height="110" rx="20"/>
  <text class="rrf-head" x="768" y="538">Endergebnis</text>
  <text class="rrf-body" x="768" y="574">Der Top‑Treffer ist dort, wo exakte Begriffe</text>
  <text class="rrf-body" x="768" y="598">und semantische Bedeutung übereinstimmen.</text>
</svg>
<figcaption>Eine Abfrage verzweigt parallel zu FTS und pgvector. Jede erzeugt ihre eigene Rangliste. RRF bewertet jedes Dokument nach seiner Position in jeder Liste und summiert die Werte – das Ergebnis stellt Dokumente heraus, bei denen beide Signale übereinstimmen.</figcaption>
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

Der Kandidaten‑Pool von 60 Dokumenten pro Zweig (`LIMIT 60`) ist ein gängiger Ausgangspunkt. Vergrößern Sie ihn, wenn die Trefferquote zu niedrig ist; verkleinern Sie ihn für mehr Geschwindigkeit.

---

## Was kommt als Nächstes

PostgreSQL‑Textsuche deckt viel ab, stößt aber an ihre Grenzen. Wenn Nutzer beschreiben, was sie wollen, anstatt es zu benennen – „etwas, das mir im Flug beim Schlafen hilft“, „Artikel über das Debuggen von Selbstvertrauen als neuer Engineer“ – versagen sowohl lexikalische Suche als auch Trigram‑Suche.

Das ist das Gebiet von Vektor‑Einbettungen, semantischer Suche und hybriden Architekturen. Weitere Informationen finden Sie in [Semantic Vector Search and Hybrid Strategies](/semantic-vector-search-landscape).
````
