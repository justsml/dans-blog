# Translation Candidate
- Slug: semantic-vector-search-landscape
- Locale: de
- Model: openrouter/openai/gpt-oss-120b:nitro
- Target: src/content/posts/2026-05-01--semantic-vector-search-landscape/de/index.mdx
- Validation: passed
- Runtime seconds: 24.52
- Input tokens: 19031
- Output tokens: 8068
- Thinking tokens: unknown
- Cached input tokens: 4224
- Cache write tokens: 0
- Estimated cost: $0.002194
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
title: >-
  Semantische Vektorsuche und weitere Themen, um Freunde und Liebende zu
  gewinnen
subTitle: >-
  Die komplette Suchlandschaft: exakt, unscharf, semantisch, hybrid – und wann
  man sie kombiniert.
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
Suche ist nicht ein einziges Ding, und semantische Suche ist kein Ersatz für den Rest.

„Finde Benutzer mit der E‑Mail `dan@example.com`“ und „Zeig mir Artikel zum Debuggen als neuer Entwickler“ werden beide als Suche bezeichnet, aber sie haben als technische Probleme fast nichts gemeinsam. Das erste hat eine eindeutige Antwort und einen `O(log n)` Index‑Lookup. Das zweite hat keine eindeutige Antwort – nur Relevanz – und erfordert das Verstehen von Sprache, Intent und Bedeutung.

Die Ingenieure, die bei Suchentscheidungen am überzeugendsten sind – diejenigen, die die Argumente gewinnen und das richtige System ausliefern – verstehen das gesamte Spektrum. Sie wissen, welches Werkzeug wann zu greifen ist, warum und können es klar erklären.

Dieser Artikel behandelt die semantische Schicht: was Vektorsuche tatsächlich leistet, wann sie die Oberhand gewinnt und wo sie sich zurückhalten sollte. Die sinnvolle Variante ist nicht „alles einbetten“. Es geht darum zu wissen, wann Vektoren neben lexikalischer, fuzzy‑ und exakter Suche in einer hybriden Architektur eingesetzt werden.

Der lexikalische und fuzzy Teil des Bildes – `tsvector`, `pg_trgm`, `pg_search` – findet sich im [Postgres Text Searching Guide 2026](/postgres-text-search-guide).

## Begriffe auf einen Blick

**Embedding** — Eine dichte Liste von Gleitkommazahlen, die von einem Modell erzeugt wird und ein Textstück (oder Bild, Audio usw.) als Punkt im hochdimensionalen Raum repräsentiert. Semantisch verwandte Inhalte liegen nahe beieinander; nicht verwandte Inhalte liegen weit auseinander.

**Lexikalische Suche** — Suche, die auf exaktem Wort‑ und Token‑Abgleich beruht. Schnell, deterministisch und korrekt für bekannte Begriffe. Versteht weder Synonyme, Paraphrasen noch sprachübergreifende Entsprechungen.

**Semantische Suche** — Suche, die auf Bedeutung statt auf Tokens basiert. Eine Anfrage nach „wie gehe ich mit Timeouts um“ kann ein Dokument mit dem Titel „Konfiguration von Retry‑Richtlinien“ treffen, obwohl keine gemeinsamen Wörter vorkommen, weil deren Embeddings geometrisch nah beieinander liegen.

**Vektor** — Eine Zahlenliste. Im Suchkontext das Ergebnis eines Embedding‑Modells. „Vektorsuche“ findet die Vektoren, die einem Abfragevektor am nächsten liegen, gemessen an der geometrischen Distanz.

**FTS (Full‑Text Search)** — Postgres‑interne lexikalische Suche, betrieben von `tsvector` / `tsquery`. Tokenisiert, stemmt und indexiert Text für Stichwortabfragen. Stark bei Fließtext und exakter Begriffssuche; blind gegenüber Bedeutung.

**BM25** — Ein Ranking‑Algorithmus für lexikalische Suche (verwendet von Elasticsearch, Qdrant und anderen). Bewertet Ergebnisse anhand der Term‑Häufigkeit, gewichtet nach der Seltenheit des Terms im Korpus. Besser als reines Stichwort‑Matching; bleibt jedoch lexikalisch.

**HNSW (Hierarchical Navigable Small World)** — Der Standard‑Approximate‑Nearest‑Neighbor‑Index für Vektorsuche. Baut einen geschichteten Proximitäts‑Graphen für schnelle, hoch‑Recall‑Ähnlichkeitsabfragen. pgvector, Qdrant, Weaviate und die meisten anderen nutzen ihn.

**RRF (Reciprocal Rank Fusion)** — Ein Algorithmus zum Zusammenführen von Ranglisten aus mehreren Retrieval‑Systemen. Verwendet ausschließlich die Rangposition — keine Score‑Normalisierung nötig. Ein Ergebnis, das sowohl in FTS‑ als auch in Vektor‑Listen hoch rangiert, erhält eine stärkere kombinierte Bewertung als eines, das nur in einer Liste dominiert.

---

## Was semantische Suche tatsächlich leistet

Vektor‑Embeddings wandeln Text (oder Bilder, Audio usw.) in eine Zahlenliste um — einen Punkt im hochdimensionalen Raum. Ein Embedding‑Modell wird so trainiert, dass semantisch verwandte Texte im Raum nahe beieinander liegen. „Dog“ und „canine“ landen nahe beieinander. „Running a marathon“ und „running a Python script“ liegen weit auseinander, obwohl sie ein Wort teilen.

Similarity‑Suche in diesem Raum findet Dokumente, deren *Bedeutung* der Bedeutung der Anfrage am nächsten ist, unabhängig vom genauen Wort‑Overlap.

Das bedeutet:
- „How do I configure request timeouts?“ kann zu einem Artikel mit dem Titel „Setting connection limits and retry policies“ passen — keine gemeinsamen Schlüsselwörter, aber hohe konzeptuelle Relevanz
- „Something light for a summer evening“ kann zu einer Weinempfehlung passen, ohne dass ein einziges Schlüsselwort in der Produktbeschreibung vorkommt
- Eine Anfrage auf Englisch kann relevante Dokumente auf Französisch, Spanisch oder Japanisch treffen, sofern das Embedding‑Modell multilingual trainiert wurde

Lexikalische Suche (`tsvector`, `pg_trgm`) kann das nicht. Sie arbeitet auf Basis von Wörtern und Zeichen, nicht auf Bedeutung. Die Werkzeuge sind nicht austauschbar — sie lösen unterschiedliche Probleme.

---

## When pgvector Wins

**Building RAG.** Retrieval‑Augmented Generation holt die Dokument‑Chunks, deren Bedeutung der Frage des Benutzers am nächsten liegt, und übergibt sie einem Sprachmodell als Kontext. Dieser Retrieval‑Schritt ist ein Vektor‑Operation. FTS verpasst Paraphrasen, Synonyme und konzeptuelle Treffer, die ein relevanter Chunk anders ausdrücken könnte. Der Vorteil von pgvector gegenüber einem eigenständigen Vektor‑Store: Es läuft innerhalb Ihrer bestehenden Postgres‑Instanz — kein separater Dienst, den man bereitstellen, betreiben oder mit Daten synchronisieren muss.

**Benutzer beschreiben, was sie wollen, nicht wonach sie suchen sollen.** „Artikel über den Aufbau von Selbstvertrauen als neuer Manager“ enthält keine Schlüsselwörter, die zuverlässig in den relevanten Beiträgen auftauchen. „Ein leichtgewichtiges Framework zur Handhabung von Seiteneffekten“ verwendet diese genauen Wörter möglicherweise nicht in der Dokumentation. Die Vektorsuche trifft die Intention, nicht die Schreibweise.

**Ähnliche Elemente finden.** Verwandte Produkte, ähnliche Support‑Tickets, doppelte Bug‑Reports, Artikel, die Ihnen ebenfalls gefallen könnten. „Finde Issues, die diesem ähnlich sind“ ist eine Nearest‑Neighbor‑Suche — ein Element einbetten und seine geometrischen Nachbarn finden. Eine wichtige Einschränkung: Die Vektorsuche liefert immer Ergebnisse, selbst wenn nichts wirklich Ähnliches vorhanden ist. Für Dedup‑ und Empfehlungsszenarien sollte man nach einem Mindest‑Ähnlichkeitsschwellenwert filtern (z. B. Kosinus‑Ähnlichkeit ≥ 0,80), um niedrig‑vertrauenswürdige Treffer nicht als bedeutungsvoll auszugeben.

**Semantische Duplikaterkennung.** Bevor Inhalte für RAG oder Suche indexiert werden, muss man häufig Near‑Duplicates im Korpus identifizieren — Artikel, die mehrfach überarbeitet wurden, Support‑Tickets, die doppelt eingereicht wurden, Wissensdatenbank‑Einträge mit erheblicher Überschneidung. Dokumente einbetten und nach Kosinus‑Ähnlichkeit mit einem Schwellenwert filtern, um Near‑Duplicates zu markieren oder zu zusammenführen, bevor sie den Index verschmutzen. Das verhindert, dass die Retrieval‑Phase mehrere nahezu identische Chunks zurückliefert und das Kontextfenster verwässert.

**Mehrsprachige Suche.** Mehrsprachige Einbettungsmodelle projizieren semantisch äquivalente Inhalte über Sprachgrenzen hinweg in nahe beieinander liegende Vektoren. Eine spanische Anfrage nach „perder peso“ kann einen englischen Artikel zu „sustainable weight loss habits“ treffen — keine gemeinsamen Tokens, aber dieselbe zugrundeliegende Bedeutung. FTS erfordert für jede Sprache eine eigene Wörterbuch‑Konfiguration und bewältigt Cross‑Language‑Abfragen schlecht. `pg_trgm` ist sprachagnostisch, aber orthografisch, nicht semantisch.

### Einrichtung von pgvector

Von der Extension‑Installation bis zur Ähnlichkeits‑Abfrage besteht die Einrichtung aus wenigen SQL‑Anweisungen:

```sql
CREATE EXTENSION IF NOT EXISTS vector;

ALTER TABLE documents ADD COLUMN embedding vector(1536);

-- HNSW ist in der Regel der erste Index, den man bei mittelgroßen Datensätzen ausprobiert
CREATE INDEX documents_embedding_idx
  ON documents USING hnsw (embedding vector_cosine_ops);

-- Semantische Suchabfrage
SELECT id, title, 1 - (embedding <=> $1::vector) AS similarity
FROM documents
ORDER BY embedding <=> $1::vector
LIMIT 10;
```

`<=>` ist der Kosinus‑Abstand. `1 - cosine_distance` liefert die Kosinus‑Ähnlichkeit (1,0 = identisch, 0,0 = orthogonal). Für `ivfflat` (die ältere, schneller zu erstellende Alternative) kann man als Ausgangspunkt `lists = sqrt(row_count)` verwenden.

### Was pgvector nicht gut kann

- Exakte Token‑Übereinstimmung — Produkt‑SKUs, Fehlercodes, Funktionsnamen. `ORD-12345` ist semantisch zu nichts Ähnlichem. Eine auf Embeddings basierende Suche kann `ORD-12344` oder gar nichts Relevantes zurückliefern. Verwenden Sie FTS oder einen B‑Tree‑Index.
- Namen und Eigennamen. Der Embedding‑Raum ordnet nach Bedeutung, nicht nach Schreibweise. Der Datensatz „Micheal Jordan“ landet nicht zwingend in der Nähe von „Michael Jordan“ im Vektorraum.
- Kurze Zeichenketten, bei denen die Ähnlichkeit auf Zeichenebene wichtiger ist als die Bedeutung. `pg_trgm` übernimmt das.
- Abfragen, bei denen der exakte Begriff vorkommen muss. BM25 und FTS sind hier zuverlässiger für bekannte Term‑Übereinstimmungen.

---

## Hybride Suche: Das Argument für beide

Technische Dokumentation ist das eindeutigste Beispiel, bei dem kein einzelnes Werkzeug ausreicht.

Benutzer, die nach „how to configure timeouts“ suchen, benötigen konzeptuelles Matching: Ein Artikel mit dem Titel „Setting retry policies and connection limits“ enthält keine überlappenden Schlüsselwörter, ist aber exakt das, was sie brauchen.

Dieselben Benutzer suchen auch nach `withRetry()`, `ECONNRESET` und `ERR_SOCKET_TIMEOUT`. Diese exakten Zeichenketten müssen vorkommen – semantisches Matching findet sie nicht zuverlässig, und ein Fehlalarm (konzeptuell ähnlich, aber nicht die richtige API) ist aktiv irreführend.

Die Vektorsuche übernimmt die konzeptuellen Anfragen. Die Volltextsuche (FTS) übernimmt die exakten Begriffe. Keines von beiden kann beide Anforderungen allein gut bedienen.

Die Lösung ist hybride Suche: Beide Verfahren ausführen und die Ergebnisse zusammenführen.

### Reciprocal Rank Fusion

**Reciprocal Rank Fusion (RRF)** ist der Standard‑Algorithmus zum Kombinieren von Ranglisten verschiedener Retrieval‑Systeme. Er erfordert keine Normalisierung der Scores zwischen den Systemen – es werden ausschließlich die Rangpositionen verwendet. Ein Ergebnis, das in *beiden* Listen hoch erscheint, erhält einen stärkeren kombinierten Score als ein Ergebnis, das nur in einer Liste dominiert.

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

Die `60` im Nenner ist die RRF‑Konstante. Höhere Werte dämpfen Unterschiede in den Rangpositionen; niedrigere Werte verstärken sie. Der Standardwert 60 funktioniert bei den meisten Inhaltstypen gut.

RRF umgeht das schwierige Problem, `ts_rank` (ein log‑frequenz‑basiertes Score) gegen den Kosinusabstand (ein geometrisches Maß) zu normalisieren. Die beiden Werte sind nicht vergleichbar. RRF fragt lediglich: „Wie hoch stand dieses Ergebnis in jeder Liste?“

### Hybrid‑Suche mit Trigrammen ebenfalls

Für benutzerorientierte Suche über gemischte Inhalte – bei denen Nutzer im selben Sitzungsablauf nach einem Personennamen, einem Konzept oder einem exakten Begriff suchen können – bewältigt eine dreifache Fusion alle Fälle:

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

Damit werden fuzzy Namensübereinstimmungen (Trigramme), exakte Stichworttreffer (FTS) und konzeptuelle Anfragen (Vektoren) abgedeckt. Ein einziges Suchfeld kann so alle drei Nutzerintentionen bedienen.

## Multi‑Layer‑Hybrid‑Architekturen

Echte Anwendungen besitzen selten nur eine einzige Suchfläche. Sie haben mehrere, jede mit einem anderen Bedarf:

| Oberfläche | Was die Nutzer abfragen | Empfohlene Schichten |
|---|---|---|
| Blog‑/Dokumentationssuche | Stichwörter + Konzepte | FTS + pgvector (RRF) |
| Nutzer‑/Kunden‑Namenssuche | Namen mit Tippfehlern | `pg_trgm` |
| Produktsuche | Namen, Beschreibungen, „ähnlich wie“ | `pg_trgm` + FTS + pgvector |
| Support‑Ticket‑Deduplication | „Probleme ähnlich zu diesem“ | nur pgvector |
| Interne SKU/Bestell‑Suche | Exakte Kennungen | B‑Tree‑Index |
| RAG über große Wissensbasis | Fragen in natürlicher Sprache | pgvector (aufgeteilte Dokumente) |
| E‑Commerce „Vielleicht gefällt Ihnen auch“ | Verhaltens‑ + semantische Ähnlichkeit | pgvector |
| Autovervollständigung | Präfix, Rechtschreib‑tolerant | `pg_trgm` |

Das sind keine hypothetischen Beispiele. Die meisten inhaltsintensiven Anwendungen benötigen mindestens zwei unterschiedliche Suchflächen mit verschiedenen Abfragestrukturen. Die Versuchung ist groß, einen Ansatz zu wählen und überall zu verwenden — meistens heute Vektorsuche, weil sie gerade im Trend liegt. Das führt zu teuren Embeddings für Probleme, bei denen ein Trigram‑Index schneller, günstiger und zutreffender gewesen wäre.

### Daumenregel

Füge eine Schicht hinzu, sobald ein Fehlermodus auftritt, den die aktuelle Schicht nicht beheben kann.

- Nutzer beschweren sich, dass Tippfehler nicht gefunden werden → `pg_trgm` hinzufügen  
- Nutzer suchen nach Konzepten und verpassen relevante Ergebnisse → pgvector hinzufügen  
- Nutzer suchen nach exakten Symbolen oder Codes und erhalten stattdessen konzeptuelle Treffer → FTS hinzufügen oder prüfen, ob Sie zu stark auf Vektorsuche setzen  
- Latenz wird zum Problem → Vorfilterung, approximative Indizes oder einen dedizierten Store evaluieren  

---

## Wenn Sie doch einen dedizierten Vektor‑Store benötigen

pgvector deckt einen Großteil der Anwendungssuche ab, bevor ein weiteres Datenbanksystem nötig wird. Der ungefähre Cut‑off hängt von Vektor‑Anzahl, Index‑Einstellungen, Schreibrate, Filtern, Hardware und Parallelität ab, daher sollte jede „unter 10 M Vektoren“‑Regel als Ausgangspunkt für Benchmarks verstanden werden, nicht als Produktgrenze. Wenn Sie wirklich darüber hinauswachsen – sehr hohe Parallelität, sehr niedrige p99‑Latenz‑Anforderungen, Milliarden von Vektoren oder ernsthafte Multi‑Tenant‑Isolation – ist das Spektrum dedizierter Vektordatenbanken breit und es lohnt sich, es zu verstehen.  

### Was die Spalten der Matrix tatsächlich bedeuten

**Hybrid‑Suche** bedeutet, dass BM25‑Keyword‑Suche und Vektor‑Ähnlichkeit in einer Abfrage ausgeführt und per RRF zusammengeführt werden. Ohne das wählen Sie entweder einen Suchmodus oder fusionieren zwei Abfragen selbst.

**Sparse Vektoren** gehen über BM25 hinaus. Ein SPLADE‑Sparse‑Vektor hat ~30 000 Dimensionen (eine pro Vokabel‑Term), ~98 % Nullen. Nicht‑null‑Positionen zeigen, welche Begriffe wichtig sind und wie stark. Eine Abfrage nach „dogs“ gewichtet zudem „canine“ und „pet“ — BM25‑Präzision plus Term‑Erweiterung innerhalb eines Vektor‑Indexes. Wenn diese Spalte false ist, benötigen Sie eine separate FTS‑Ebene für exakte Term‑Abfragen.

```python
# SPLADE: ~30,000 dims, ~60 non-zero — only relevant vocabulary positions fire
def encode_splade(text: str) -> dict:
    tokens = tokenizer(text, return_tensors="pt", truncation=True, max_length=512)
    with torch.no_grad():
        output = model(**tokens)
    vec = torch.log1p(torch.relu(output.logits)).max(dim=1).values.squeeze()
    return {"indices": vec.nonzero().squeeze().tolist(), "values": vec[vec != 0].tolist()}
```

**SQL / SQL‑ähnlich** dreht sich im Wesentlichen um Filterung. Vektorsuche ohne Filter ist nur eine Demo. Sie benötigen weiterhin Tenant‑Scope, Datumsbereiche, Berechtigungen und Kategoriefilter. Vollständiges SQL (pgvector, LanceDB) lässt das neben Ihren bestehenden Joins ausdrücken. Zweck‑gebaute Datenbanken verwenden JSON‑Filterobjekte (Qdrant, Pinecone), eine Query‑DSL (Elasticsearch, Milvus) oder GraphQL (Weaviate). Sie funktionieren; SQL wird attraktiver, sobald die Filterlogik komplexer wird.

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

**Multimodal nativ** bedeutet, dass die Datenbank Einbettungs‑Modelle für Nicht‑Text‑Inhalte mitliefert. Sie übergeben ihr eine rohe Bild‑URL; sie übernimmt die Vektorisierung. Die meisten Datenbanken sind Einbettungs‑agnostisch — Sie besitzen die Einbettungspipeline. Marqo und Weaviate (via CLIP/ImageBind‑Module) schließen diesen Loop.

```python
# Marqo: POST raw images, query with text — no external embedding step
mq.index("products").add_documents(
    [{"id": "shoe-001", "image": "https://cdn.example.com/shoes/001.jpg"}],
    tensor_fields=["image"]
)
results = mq.index("products").search(q="lightweight shoes for summer")
# Returns shoe-001 despite zero keyword overlap — CLIP handles the cross-modal match
```

**Disk‑basierter Index** ist ein Kostenhebel. RAM‑resident HNSW‑Indizes können mehrere GB RAM pro Million 1536‑Dimensional‑Vektoren benötigen, wenn rohe Vektoren, Graph‑Overhead und Metadaten mitgerechnet werden. Disk‑native Alternativen (Milvus DiskANN, Elasticsearch DiskBBQ, LanceDBs Lance‑Format, Turbopuffer‑Objektspeicher‑Tier) tauschen häufig etwas Abfrage‑Latenz gegen geringere Infrastruktur‑Kosten. Für RAG‑Workloads, bei denen die Modell‑Latenz bereits dominiert, ist dieser Trade‑off häufig einen Benchmark wert.

**Maximale Dimensionen** verbergen eine Migration in Ihrer Architektur. `text-embedding-3-large` verwendet 3072 Dims, Jina v3 kann größere Einbettungen erzeugen, und Forschungs‑Modelle treiben die Größe weiter nach oben. Einige Managed Services veröffentlichen harte Dim‑Grenzen; andere dokumentieren hohe Obergrenzen oder keine praktischen Limits für typische Einbettungs‑Modelle. Prüfen Sie die aktuelle Dokumentation, bevor Sie sich festlegen. Wählen Sie etwas mit Spielraum; einen Vektor‑Index zu migrieren, weil Sie eine Dim‑Grenze erreicht haben, ist ein schmerzhafter Sprint.

_Last verified against public project docs and product pages on May 8, 2026. Treat the table below as a decision aid, not a substitute for checking current limits, pricing, and managed-service feature flags._

### The Landscape

| Database | Deployment | License | Hybrid Search | Sparse Vectors | SQL / SQL-like | Multimodal | Disk Index | Max Dims | Sweet Spot |
|---|---|---|---|---|---|---|---|---|---|
| **[pgvector](https://github.com/pgvector/pgvector)** | Self-host / managed (Supabase, Neon, RDS) | OSS (PostgreSQL) | Manual (RRF via SQL) | ❌ | ✅ Full SQL | ❌ | ✅ HNSW on disk | 16,000 storage; 2,000 indexed `vector` | Already on Postgres; moderate vector counts |
| **[Qdrant](https://github.com/qdrant/qdrant)** | Self-host / Cloud | Apache 2.0 | ✅ Native BM25 | ✅ Mature support | ❌ (REST/gRPC) | ❌ | ✅ | 65,535 | Filtered queries at scale; complex metadata |
| **[Weaviate](https://github.com/weaviate/weaviate)** | Self-host / Cloud | BSD 3 | ✅ Native BM25 + RRF | ✅ | ❌ (GraphQL / gRPC) | ✅ via modules | ✅ | 65,535 | GraphQL access patterns; built-in vectorization |
| **[Pinecone](https://www.pinecone.io/)** | Cloud only | Proprietary | ✅ (added 2024) | ✅ | ❌ | ❌ | ✅ (serverless) | 20,000 | Managed simplicity; no ops team |
| **[Milvus](https://github.com/milvus-io/milvus) / [Zilliz](https://zilliz.com/)** | Self-host / Cloud (Zilliz) | Apache 2.0 | ✅ Native | ✅ | ✅ SQL-like (Milvus Query Language) | ✅ | ✅ DiskANN | 32,768 | Billion-scale; enterprise on-prem |
| **[Chroma](https://github.com/chroma-core/chroma)** | Embedded / self-host | Apache 2.0 | ❌ | ❌ | ❌ | ❌ | ❌ | 65,535 | Local dev and prototyping only |
| **[LanceDB](https://github.com/lancedb/lancedb)** | Embedded / Cloud | Apache 2.0 | ✅ | ❌ | ✅ SQL via DataFusion | ✅ Native | ✅ (Lance format) | Unlimited | Edge / serverless; multimodal lakehouse |
| **[Orama](https://github.com/oramasearch/orama)** | Embedded / Cloud | Apache 2.0 | ✅ Full-text + vector | ❌ | ❌ | ❌ | ❌ | Varies | JS/edge apps; lightweight site/app search |
| **[Turbopuffer](https://turbopuffer.com/)** | Cloud only (serverless) | Proprietary | ✅ BM25 + vector | ❌ | ❌ | ❌ | ✅ (object storage) | 16,000 | Multi-tenant SaaS; millions of namespaces |
| **[Elasticsearch](https://github.com/elastic/elasticsearch)** | Self-host / Elastic Cloud | SSPL / AGPLv3 | ✅ RRF + ELSER sparse | ✅ (ELSER) | ✅ Query DSL | ❌ | ✅ DiskBBQ | 4,096 | Already on Elastic stack; hybrid enterprise search |
| **[OpenSearch](https://github.com/opensearch-project/OpenSearch)** | Self-host / AWS managed | Apache 2.0 | ✅ RRF + Neural Search | ✅ | ✅ Query DSL | ❌ | ✅ FAISS + HNSW | 16,000 | AWS-native; open-source Elastic alternative |
| **[Vespa](https://github.com/vespa-engine/vespa)** | Self-host / Cloud | Apache 2.0 | ✅ Native | ✅ Tensors / lexical ranking | ✅ YQL | ✅ Tensors | ✅ | Effectively unbounded | Search + ranking + recommendation systems |
| **[ClickHouse](https://github.com/ClickHouse/ClickHouse)** | Self-host / Cloud | Apache 2.0 | Manual | ❌ | ✅ Full SQL | ❌ | ✅ Columnar + HNSW | Varies | Analytics/logs with vector search beside OLAP |
| **[MongoDB Atlas](https://github.com/mongodb/mongo)** | Cloud / self-host | SSPL | ✅ Built-in | ❌ | ✅ MQL + aggregation | ❌ | ✅ HNSW | 8,192 | Already on MongoDB; document + vector in one |
| **[Redis (VSS)](https://github.com/redis/redis)** | Self-host / Redis Cloud | RSALv2 / SSPL | ✅ (RediSearch) | ✅ | ❌ | ❌ | ❌ RAM-only | 32,768 | Ultra-low latency; cache-layer vector search |
| **[Marqo](https://github.com/marqo-ai/marqo)** | Cloud / self-host | Apache 2.0 | ✅ | ❌ | ❌ | ✅ Native focus | ✅ | Varies | End-to-end multimodal: image + text + video |

### Ein paar Dinge, die nicht in die Tabelle passen

**Turbopuffers Multi‑Tenancy** ist um sehr hohe Namespace‑Zahlen herum gebaut. Die öffentliche Positionierung und Kundenstories betonen Workloads wie Notions großes, namespace‑intensives Korpus. Wenn jeder Nutzer oder jede Organisation isolierte Vektorsuche benötigt, kann diese Architektur die Wirtschaftlichkeit verändern – benchmarken Sie trotzdem Ihre eigene Tenant‑Struktur.

**LanceDB im Embedded‑Modus** ist das, was einem „SQLite für Vektorsuche“ am nächsten kommt. Es läuft im Prozess, benötigt keinen Server und funktioniert in Lambda, Cloudflare Workers und Edge‑Umgebungen. Das spaltenbasierte Lance‑Format macht den Embedded‑Betrieb bei realen Skalierungen praktikabel.

**Chroma ist am stärksten bei Entwicklung/Test und kleinen App‑Deployments.** Wenn Sie sehr große Korpora, Hochverfügbarkeit, speicherintensive Operationen oder erstklassige hybride Suche anstreben, sollten Sie vor dem Hochfahren eines Prototyps in die Infrastruktur ein produktionsreifes Store‑System evaluieren.

**Vespa ist die Wahl, wenn die Retrieval‑Komponente nur die Hälfte des Produkts ausmacht.** Es vereint lexikalische Suche, Nearest‑Neighbor‑Suche, Tensoren, Ranking‑Ausdrücke, Gruppierung und Online‑Serving. Diese Leistungsfähigkeit ist real, aber ebenso die operative und modelltechnische Komplexität. Es passt besser zu Such‑/Empfehlungsteams als zu „füge semantische Suche zu meiner CRUD‑App hinzu“.

**ClickHouse gehört in die Diskussion, wenn Suche mit Analytik verknüpft ist.** Wenn Ihre Wahrheitsquelle Events, Logs, Traces oder Metriken sind, hält ClickHouse Vektor‑Abstände, Filterung, Aggregation und ernsthafte Volltext‑Indizierung in einer einzigen SQL‑Engine. Kein eigens gebautes Vektor‑Datenbank‑System, aber häufig die langweilig‑richtige Antwort für analytische Retrieval‑Anforderungen.

**Sparse Vektoren ermöglichen BM25‑Qualität bei Schlüsselwort‑Matching innerhalb eines Vektor‑Indexes** – ohne einen separaten Volltext‑Engine zu betreiben. Qdrant und Elasticsearch bieten hier besonders ausgereifte Implementierungen. Wenn hybride Suche kritisch ist und eine Zwei‑System‑Architektur ein Deal‑Breaker, dann ist Sparse‑Vector‑Support das, wonach Sie suchen sollten.

### Auswahl, wenn Sie pgvector outgrown haben

- **SaaS‑Produkt mit Mandanten‑Isolation** → Turbopuffer  
- **Komplexe Metadaten‑Filterung im großen Maßstab** → Qdrant  
- **Bereits auf Elastic/ELK‑Stack** → Elasticsearch mit DiskBBQ  
- **AWS‑Umgebung, die Open‑Source will** → OpenSearch  
- **Such‑/Empfehlungsplattform mit ernsthaften Ranking‑Bedürfnissen** → Vespa  
- **Analytik, Observability, Log‑/Event‑Suche** → ClickHouse  
- **Milliarden‑Skala on‑prem / self‑hosted** → Milvus  
- **Edge / serverless / multimodal** → LanceDB  
- **Kleine JS‑App, Dokumentations‑Site oder edge‑native Search‑UX** → Orama  
- **Zero‑Ops, Kosten zweitrangig** → Pinecone  
- **Multimodal‑first (Bilder, Video, Audio)** → Marqo  
- **Bereits auf MongoDB** → Atlas Vector Search  
- **Bereits auf Postgres, mehr Spielraum nötig** → Supabase Vector oder Neon (beide pgvector‑managed, mit besserem Tooling)

##Das Eine, das man nicht tun sollte

Verwenden Sie die Vektorsuche nicht als unscharfe Textsuche für Fälle, bei denen es eindeutige Antworten gibt.

„Finde den Nutzer mit der E‑Mail `dan@example.com`“ ist kein Vektor‑Suchproblem. „Finde die Bestellung mit der ID `ORD-12345`“ ebenfalls nicht. Das Einbetten von `ORD-12345` und die Suche nach Kosinus‑Ähnlichkeit liefert *irgendetwas* – aber es kann falsch sein. Ein Identifier hat eine eindeutige Antwort. Eine approximative Übereinstimmung bei einem Identifier ist ein Bug.

Die Vektorsuche gibt das *ähnlichste* Element in Ihrem Datensatz zurück, selbst wenn nichts wirklich relevant ist. Sie erkennt nicht, wann keine passende Antwort existiert. Das ist für verwandte Dokumente akzeptabel. Für die exakte Record‑Suche ist es ein ernstes Problem, weil eine zuversichtlich falsche Antwort schlimmer ist als ein leeres Ergebnis.

Das Gleiche gilt umgekehrt: Verwenden Sie die Volltextsuche nicht für Anfragen, bei denen der Nutzer ein Konzept beschreibt. „Artikel über das Treffen harter Entscheidungen unter Unsicherheit“ enthält keine verlässlichen Schlüsselwörter. Die Volltextsuche liefert entweder Rauschen oder nichts. Nutzen Sie das passende Werkzeug für die jeweilige Abfragestruktur.

## TheFull Picture

Die meisten produktiven Suchsysteme benötigen mehr als eine Ebene:

- **`pg_trgm`** für Namen, Tippfehler, Autovervollständigung  
- **FTS / `pg_search`** für schlüsselwortbasierte Fließtextsuche  
- **pgvector** für semantische und konzeptuelle Abfragen  
- **RRF fusion** für Oberflächen, auf denen Nutzer Abfragetypen mischen  
- **Reguläre Indizes** für exakte Identifikatoren, Filter und sortierte Listen  

Dies sind keine Konkurrenzwerkzeuge. Sie ergänzen sich. Ein gut gebautes Suchsystem wählt die passende Ebene für jede Abfrageform – und wenn sich Abfrageformen überschneiden, werden mehrere Ebenen parallel ausgeführt und die Ergebnisse zusammengeführt.

Die Teams, die gute Suchfeatures ausliefern, verstehen den gesamten Stack. Die, die es nicht tun, greifen zum Vektor‑Datenbank, betten alles ein und wundern sich, warum exakte Lookups manchmal den falschen Datensatz zurückliefern.
````
