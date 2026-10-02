# Translation Candidate
- Slug: semantic-vector-search-landscape
- Locale: de
- Model: openrouter/deepseek/deepseek-v4.1-flash
- Target: src/content/posts/2026-05-01--semantic-vector-search-landscape/de/index.mdx
- Validation: rejected: direct AI SDK translation failed
- Runtime seconds: 64.91
- Input tokens: 12441
- Output tokens: 26830
- Thinking tokens: unknown
- Cached input tokens: 3584
- Cache write tokens: 0
- Estimated cost: $0.020309
- Pricing source: openrouter-2026-10-02
- Note: Command failed: bun run i18n:validate --slug semantic-vector-search-landscape --locale de --skip-global (code 1)
## Raw Output

````mdx
---
title: >-
  Semantische Vektorsuche und andere Themen, um Freunde und Liebhaber zu
  gewinnen
subTitle: >-
  Die gesamte Suchlandschaft: exakt, fuzzy, semantisch, hybrid – und wann man
  alle kombinieren sollte.
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
Suche ist nicht eine einzige Sache, und semantische Suche ist kein Ersatz für den Rest davon.

## Vector-Search-Landschaft: 16 Optionen im Vergleich

Vergleichen Sie Deployment, Lizenzierung, Suchfunktionen und Workload-Eignung. Spaltenerklärungen und SQL-Beispiele folgen unten.

[Wie man diesen Vergleich liest](#wie-man-diesen-vergleich-liest)

| Datenbank | Deployment | Lizenz | Hybride Suche | Sparse Vektoren | Abfrageschnittstelle | Integriertes multimodales Embedding | Festplattenindex | Vektor-Dimensionsgrenzen | Am besten geeignet für |
|---|---|---|---|---|---|---|---|---|---|
| **[pgvector](https://github.com/pgvector/pgvector)** | Selbst gehostet / verwaltet (Supabase, Neon, RDS) | OSS (PostgreSQL) | Manuell (RRF via SQL) | ❌ | ✅ Vollständiges SQL | ❌ | ✅ HNSW auf Festplatte | 16.000 Speicher; 2.000 indizierte `vector` | Bereits auf Postgres; moderate Vektoranzahl |
| **[Qdrant](https://github.com/qdrant/qdrant)** | Selbst gehostet / Cloud | Apache 2.0 | ✅ Natives BM25 | ✅ Ausgereifte Unterstützung | ❌ (REST/gRPC) | ❌ | ✅ | 65.535 | Gefilterte Abfragen im großen Maßstab; komplexe Metadaten |
| **[Weaviate](https://github.com/weaviate/weaviate)** | Selbst gehostet / Cloud | BSD 3 | ✅ Natives BM25 + RRF | ✅ | ❌ (GraphQL / gRPC) | ✅ über Module | ✅ | 65.535 | GraphQL-Zugriffsmuster; integrierte Vektorisierung |
| **[Pinecone](https://www.pinecone.io/)** | Nur Cloud | Proprietär | ✅ (hinzugefügt 2024) | ✅ | ❌ | ❌ | ✅ (serverless) | 20.000 | Verwaltete Einfachheit; kein Ops-Team |
| **[Milvus](https://github.com/milvus-io/milvus) / [Zilliz](https://zilliz.com/)** | Selbst gehostet / Cloud (Zilliz) | Apache 2.0 | ✅ Nativ | ✅ | ✅ SQL-ähnlich (Milvus Query Language) | ✅ | ✅ DiskANN | 32.768 | Milliardenmaßstab; Enterprise On-Prem |
| **[Chroma](https://github.com/chroma-core/chroma)** | Embedded / selbst gehostet | Apache 2.0 | ❌ | ❌ | ❌ | ❌ | ❌ | 65.535 | Nur lokale Entwicklung und Prototyping |
| **[LanceDB](https://github.com/lancedb/lancedb)** | Embedded / Cloud | Apache 2.0 | ✅ | ❌ | ✅ SQL via DataFusion | ✅ Nativ | ✅ (Lance-Format) | Unbegrenzt | Edge / serverless; multimodales Lakehouse |
| **[Orama](https://github.com/oramasearch/orama)** | Embedded / Cloud | Apache 2.0 | ✅ Volltext + Vektor | ❌ | ❌ | ❌ | ❌ | Variiert | JS/Edge-Apps; leichte Website-/App-Suche |
| **[Turbopuffer](https://turbopuffer.com/)** | Nur Cloud (serverless) | Proprietär | ✅ BM25 + Vektor | ❌ | ❌ | ❌ | ✅ (Objektspeicher) | 16.000 | Multi-Tenant-SaaS; Millionen von Namespaces |
| **[Elasticsearch](https://github.com/elastic/elasticsearch)** | Selbst gehostet / Elastic Cloud | SSPL / AGPLv3 | ✅ RRF + ELSER sparse | ✅ (ELSER) | ✅ Query DSL | ❌ | ✅ DiskBBQ | 4.096 | Bereits auf Elastic Stack; hybride Unternehmenssuche |
| **[OpenSearch](https://github.com/opensearch-project/OpenSearch)** | Selbst gehostet / AWS managed | Apache 2.0 | ✅ RRF + Neural Search | ✅ | ✅ Query DSL | ❌ | ✅ FAISS + HNSW | 16.000 | AWS-nativ; Open-Source-Alternative zu Elastic |
| **[Vespa](https://github.com/vespa-engine/vespa)** | Selbst gehostet / Cloud | Apache 2.0 | ✅ Nativ | ✅ Tensoren / lexikalisches Ranking | ✅ YQL | ✅ Tensoren | ✅ | Praktisch unbegrenzt | Suche + Ranking + Empfehlungssysteme |
| **[ClickHouse](https://github.com/ClickHouse/ClickHouse)** | Selbst gehostet / Cloud | Apache 2.0 | Manuell | ❌ | ✅ Vollständiges SQL | ❌ | ✅ Spaltenbasiert + HNSW | Variiert | Analytik/Logs mit Vektorsuche neben OLAP |
| **[MongoDB Atlas](https://github.com/mongodb/mongo)** | Cloud / selbst gehostet | SSPL | ✅ Integriert | ❌ | ✅ MQL + Aggregation | ❌ | ✅ HNSW | 8.192 | Bereits auf MongoDB; Dokument + Vektor in einem |
| **[Redis (VSS)](https://github.com/redis/redis)** | Selbst gehostet / Redis Cloud | RSALv2 / SSPL | ✅ (RediSearch) | ✅ | ❌ | ❌ | ❌ Nur RAM | 32.768 | Ultra-niedrige Latenz; Vektorsuche in der Cache-Schicht |
| **[Marqo](https://github.com/marqo-ai/marqo)** | Cloud / selbst gehostet | Apache 2.0 | ✅ | ❌ | ❌ | ✅ Nativer Fokus | ✅ | Variiert | End-to-End-multimodal: Bild + Text + Video |

„Finde Benutzer mit E-Mail `dan@example.com`“ und „finde mir Artikel über Debugging als neuer Ingenieur“ werden beide als Suche bezeichnet, haben aber als technische Probleme fast nichts gemeinsam. Die erste hat eine korrekte Antwort und einen `O(log n)`-Index-Lookup. Die zweite hat keine korrekte Antwort – nur Relevanz – und erfordert das Verständnis von Sprache, Absicht und Bedeutung.

Die Ingenieure, die bei Such-Entscheidungen am überzeugendsten sind – diejenigen, die die Argumente gewinnen und das richtige System ausliefern – verstehen die gesamte Landschaft. Sie wissen, zu welchem Werkzeug sie greifen müssen und warum, und sie können es klar erklären.

Dieser Artikel behandelt die semantische Ebene: was Vektorsuche tatsächlich leistet, wann sie gewinnt und wo sie sich heraushalten sollte. Die nützliche Version ist nicht „alles einbetten“. Es geht darum zu wissen, wann Vektoren neben lexikalischer, unscharfer und exakter Suche in einer hybriden Architektur hingehören.

Die lexikalische und unscharfe Hälfte des Bildes – `tsvector`, `pg_trgm`, `pg_search` – findet sich im [Postgres Text Searching Guide 2026](/postgres-text-search-guide).

---

## In diesem Leitfaden verwendete Begriffe

**Embedding** — Eine dichte Liste von Gleitkommazahlen, die von einem Modell erzeugt wird und ein Stück Text (oder Bild, Audio usw.) als Punkt in einem hochdimensionalen Raum darstellt. Semantisch verwandte Inhalte landen in der Nähe; unverwandte Inhalte landen weit auseinander.

**Lexikalische Suche** — Suche basierend auf exakter Wort- und Token-Übereinstimmung. Schnell, deterministisch und korrekt für bekannte Begriffe. Versteht keine Synonyme, Umschreibungen oder sprachübergreifende Entsprechungen.

**Semantische Suche** — Suche basierend auf Bedeutung statt auf Tokens. Eine Abfrage nach „wie gehe ich mit Timeouts um“ kann ein Dokument mit dem Titel „Konfigurieren von Wiederholungsrichtlinien“ treffen, ohne gemeinsame Wörter, weil ihre Embeddings geometrisch nahe beieinander liegen.

**Vektor** — Eine Liste von Zahlen. Im Suchkontext die Ausgabe eines Embedding-Modells. „Vektorsuche“ findet die Vektoren, die einem Abfragevektor durch geometrische Distanz am nächsten liegen.

**FTS (Full-Text Search)** — Postgres' integrierte lexikalische Suche, angetrieben von `tsvector` / `tsquery`. Tokenisiert, stemmt und indiziert Text für Stichwortabfragen. Stark für Prosa und exakte Begriffsnachschlage; blind für Bedeutung.

**BM25** — Ein Ranking-Algorithmus für lexikalische Suche (verwendet von Elasticsearch, Qdrant und anderen). Bewertet Ergebnisse nach der Begriffshäufigkeit, gewichtet danach, wie selten der Begriff im Korpus ist. Besser als reines Stichwort-Matching; immer noch lexikalisch.

**HNSW (Hierarchical Navigable Small World)** — Der Standard-Index für approximative Nächste-Nachbarn-Suche bei der Vektorsuche. Erstellt einen geschichteten Näherungsgraphen für schnelle Ähnlichkeitsabfragen mit hohem Recall. pgvector, Qdrant, Weaviate und die meisten anderen verwenden ihn.

**RRF (Reciprocal Rank Fusion)** — Ein Algorithmus zum Zusammenführen rangbasierter Ergebnislisten aus mehreren Retrieval-Systemen. Verwendet nur die Rangposition — keine Score-Normalisierung nötig. Ein Ergebnis, das in beiden Listen (FTS und Vektor) weit oben steht, erhält einen stärkeren kombinierten Score als eines, das nur in einer dominiert.

---

## Wie Embeddings verwandte Inhalte finden

Vektor-Embeddings wandeln Text (oder Bilder, Audio usw.) in eine Liste von Zahlen um — einen Punkt in einem hochdimensionalen Raum. Ein Embedding-Modell wird so trainiert, dass semantisch verwandter Text in diesem Raum nahe beieinander liegt. "Dog" und "canine" landen nah beieinander. "Running a marathon" und "running a Python script" landen weit auseinander, obwohl sie ein Wort teilen.

Die Ähnlichkeitssuche in diesem Raum findet Dokumente, deren *Bedeutung* der Bedeutung der Anfrage am nächsten kommt, unabhängig von exakter Wortüberschneidung.

Das bedeutet:
- „How do I configure request timeouts?" kann auf einen Artikel mit dem Titel „Setting connection limits and retry policies" passen — keine überlappenden Schlüsselwörter, hohe konzeptionelle Relevanz
- „Something light for a summer evening" kann auf eine Weinempfehlung passen, ohne dass eines der Schlüsselwörter in der Produktbeschreibung vorkommt
- Eine Anfrage auf Englisch kann relevante Dokumente auf Französisch, Spanisch oder Japanisch finden, wenn das Embedding-Modell mehrsprachig trainiert wurde

Lexikalische Suche (`tsvector`, `pg_trgm`) kann nichts davon. Sie arbeitet mit Wörtern und Zeichen, nicht mit Bedeutung. Die Werkzeuge sind nicht austauschbar — sie lösen unterschiedliche Probleme.

---

## Wann pgvector gewinnt

**RAG aufbauen.** Retrieval-Augmented Generation ruft die Dokumentabschnitte ab, deren Bedeutung der Frage des Nutzers am nächsten kommt, und übergibt sie dann als Kontext an ein Sprachmodell. Dieser Abrufschritt ist eine Vektoroperation. FTS wird Paraphrasen, Synonyme und konzeptionelle Übereinstimmungen verpassen, die ein relevanter Abschnitt anders ausdrücken könnte. Der Vorteil von pgvector gegenüber einem eigenständigen Vektorspeicher: Es läuft innerhalb Ihrer bestehenden Postgres-Instanz — kein separater Dienst, der bereitgestellt, betrieben oder in den Daten synchronisiert werden müssen.

**Nutzer beschreiben, was sie wollen, nicht wonach sie suchen sollen.** „Articles about building confidence as a new manager" hat keine Schlüsselwörter, die zuverlässig in den relevanten Beiträgen vorkommen. „A lightweight framework for handling side effects" verwendet in der Dokumentation möglicherweise nicht genau diese Wörter. Die Vektorsuche passt auf die Absicht, nicht auf die Schreibweise.

**Ähnliche Elemente finden.** Verwandte Produkte, ähnliche Support-Tickets, doppelte Bug-Reports, Artikel, die Ihnen auch gefallen könnten. „Find issues similar to this one" ist eine Nächste-Nachbarn-Suche — betten Sie das Element ein, finden Sie seine geometrischen Nachbarn. Ein wichtiger Vorbehalt: Die Vektorsuche liefert immer Ergebnisse, selbst wenn nichts wirklich ähnlich ist. Für Deduplizierungs- und Empfehlungsanwendungsfälle filtern Sie nach einem Mindestähnlichkeitsschwellenwert (z. B. Kosinus-Ähnlichkeit ≥ 0,80), um zu vermeiden, dass Übereinstimmungen mit geringer Konfidenz als bedeutungsvoll präsentiert werden.

**Semantische Deduplizierung.** Bevor Sie Inhalte für RAG oder Suche indexieren, müssen Sie oft Near-Duplicates im Korpus identifizieren — mehrfach überarbeitete Artikel, zweimal eingereichte Support-Tickets, Wissensdatenbank-Einträge, die sich erheblich überschneiden. Betten Sie die Dokumente ein und filtern Sie sie nach Kosinus-Ähnlichkeit, um Near-Duplicates zu markieren oder zusammenzuführen, bevor sie Ihren Index verunreinigen. Dies verhindert, dass die Suche mehrere nahezu identische Abschnitte zurückgibt und das Kontextfenster verwässert.

**Mehrsprachige Suche.** Mehrsprachige Embedding-Modelle bilden semantisch äquivalente Inhalte über Sprachen hinweg auf nahe beieinanderliegende Vektoren ab. Eine Anfrage auf Spanisch nach „perder peso" kann auf einen englischen Artikel über „sustainable weight loss habits" passen — keine gemeinsamen Tokens, dieselbe zugrunde liegende Bedeutung. FTS erfordert eine sprachspezifische Wörterbuchkonfiguration und verarbeitet sprachübergreifende Anfragen schlecht. `pg_trgm` ist sprachunabhängig, aber orthografisch, nicht semantisch.

### pgvector einrichten

Von der Installation der Erweiterung bis zur Ähnlichkeitsabfrage sind es nur eine Handvoll SQL-Anweisungen:

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

`<=>` ist die Kosinus-Distanz. `1 - cosine_distance` ergibt die Kosinus-Ähnlichkeit (1,0 = identisch, 0,0 = orthogonal). Für `ivfflat` (die ältere, schneller zu erstellende Alternative) verwenden Sie `lists = sqrt(row_count)` als Ausgangspunkt.

### Wo die Vektorsuche die falsche Antwort liefert

- Exaktes Token-Matching — Produkt-SKUs, Fehlercodes, Funktionsnamen. `ORD-12345` ist nichts semantisch ähnlich. Eine embeddingbasierte Suche liefert möglicherweise `ORD-12344` oder nichts Relevantes. Verwenden Sie FTS oder einen B-Tree-Index.
- Namen und Eigennamen. Der Embedding-Raum organisiert nach Bedeutung, nicht nach Schreibweise. „Micheal Jordan“ – der Nutzerdatensatz – landet im Vektorraum nicht unbedingt in der Nähe von „Michael Jordan“.
- Kurze Zeichenketten, bei denen Ähnlichkeit auf Zeichenebene wichtiger ist als Bedeutung. `pg_trgm` erledigt das.
- Abfragen, bei denen der exakte Begriff vorkommen muss. BM25 und FTS sind zuverlässiger für das Matching bekannter Begriffe.

---

## Keywords und Vektoren für gemischte Abfragen kombinieren

Technische Dokumentation ist das klarste Beispiel dafür, dass keines der beiden Werkzeuge allein ausreicht.

Nutzer, die nach „how to configure timeouts“ suchen, brauchen konzeptionelles Matching: Ein Artikel mit dem Titel „Setting retry policies and connection limits“ hat keine überlappenden Keywords, ist aber genau das, was sie brauchen.

Dieselben Nutzer suchen auch nach `withRetry()`, `ECONNRESET` und `ERR_SOCKET_TIMEOUT`. Diese exakten Zeichenketten müssen vorkommen — semantisches Matching findet sie möglicherweise nicht zuverlässig, und ein falsch positives Ergebnis (konzeptionell ähnlich, aber nicht die richtige API) ist aktiv irreführend.

Die Vektorsuche übernimmt die konzeptionellen Abfragen. FTS übernimmt die exakten Begriffe. Keines von beiden kann beides allein gut abdecken.

Die Lösung ist Hybridsuche: beide ausführen und die Ergebnisse fusionieren.

### Ranglistenergebnisse mit RRF zusammenführen

**Reciprocal Rank Fusion (RRF)** ist der Standardalgorithmus zum Kombinieren von Ranglisten aus verschiedenen Retrieval-Systemen. Er erfordert keine Normalisierung der Scores über Systeme hinweg — er verwendet nur Rangpositionen. Ein Ergebnis, das in *beiden* Listen weit oben steht, erhält einen stärkeren kombinierten Score als eines, das nur eine dominiert.

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

Die `60` im Nenner ist die RRF-Konstante. Höhere Werte dämpfen Rangpositionsunterschiede; niedrigere Werte verstärken sie. Der Standardwert 60 funktioniert gut für die meisten Inhaltstypen.

RRF vermeidet das schwierigere Problem, `ts_rank` (ein Log-Frequenz-Score) gegen die Kosinus-Distanz (ein geometrisches Maß) zu normalisieren. Sie sind nicht vergleichbar. RRF fragt nur: „Wie weit oben erschien dieses Ergebnis in jeder Liste?“

### Trigrams für Tippfehler und Namen hinzufügen

Für nutzerseitige Suche über gemischte Inhalte — bei der Nutzer in derselben Sitzung nach einem Personennamen, einem Konzept oder einem exakten Begriff suchen könnten — bewältigt die Drei-Wege-Fusion alle:

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

Dies deckt ab: unscharfe Namensübereinstimmungen (Trigrams), exakte Keyword-Übereinstimmungen (FTS) und konzeptionelle Abfragen (Vektor). Ein einziges Suchfeld kann alle drei Nutzerabsichten bedienen.

---

## Jede Suchoberfläche ihren Abfragetypen zuordnen

Reale Anwendungen haben selten eine einzige Suchoberfläche. Sie haben mehrere, jede mit einem anderen Bedarf:

| Oberfläche | Was Nutzer abfragen | Empfohlene Schichten |
|---|---|---|
| Blog- / Dokumentationssuche | Keywords + Konzepte | FTS + pgvector (RRF) |
| Benutzer-/Kundennamenssuche | Namen mit Tippfehlern | `pg_trgm` |
| Produktsuche | Namen, Beschreibungen, "ähnlich wie" | `pg_trgm` + FTS + pgvector |
| Support-Ticket-Deduplizierung | "Probleme ähnlich wie dieses" | nur pgvector |
| Interne SKU-/Bestellsuche | Exakte Identifikatoren | B-Tree-Index |
| RAG über große Wissensbasis | Natürlichsprachliche Fragen | pgvector (gechunkte Dokumente) |
| E-Commerce "Das könnte Ihnen auch gefallen" | Verhaltensbasierte + semantische Ähnlichkeit | pgvector |
| Autovervollständigung | Präfix, rechtschreibtolerant | `pg_trgm` |

Diese sind nicht hypothetisch. Die meisten inhaltslastigen Anwendungen benötigen mindestens zwei unterschiedliche Suchoberflächen mit verschiedenen Abfrageformen. Die Versuchung ist, einen Ansatz zu wählen und ihn überall zu verwenden – normalerweise jetzt die Vektorsuche, da sie die modische Wahl ist. Das führt zu teuren Embeddings für Probleme, bei denen ein Trigramm-Index schneller, billiger und korrekter gewesen wäre.

### Eine Suchschicht hinzufügen, wenn ein Abfragetyp fehlschlägt

- Nutzer beschweren sich über nicht übereinstimmende Tippfehler → `pg_trgm` hinzufügen
- Nutzer suchen nach Konzepten und verpassen relevante Ergebnisse → pgvector hinzufügen
- Nutzer suchen nach exakten Symbolen oder Codes und erhalten stattdessen konzeptionelle Ergebnisse → FTS hinzufügen oder prüfen, ob Sie sich zu sehr auf die Vektorsuche verlassen
- Latenz wird zum Problem → Pre-Filtering, approximative Indizes oder einen dedizierten Store evaluieren

## Wann man über pgvector hinausgeht

### Wie man den Vergleich liest

**Hybridsuche** bedeutet, dass BM25-Keyword-Suche und Vektorähnlichkeit in einer Abfrage ausgeführt und über RRF zusammengeführt werden. Ohne sie wählen Sie entweder einen Suchmodus oder fusionieren zwei Abfragen selbst.

**Sparse Vektoren** gehen weiter als BM25. Ein SPLADE-Sparse-Vektor hat ~30.000 Dimensionen (eine pro Vokabel), ~98 % Nullen. Nicht-Null-Positionen sagen Ihnen, welche Begriffe wichtig sind und wie stark. Eine Abfrage nach "dogs" gewichtet auch "canine" und "pet" – BM25-Präzision plus Begriffserweiterung innerhalb eines Vektorindex. Wenn diese Spalte falsch ist, benötigen Sie eine separate FTS-Schicht für Abfragen mit exakten Begriffen.

```python
# SPLADE: ~30,000 dims, ~60 non-zero — only relevant vocabulary positions fire
def encode_splade(text: str) -> dict:
    tokens = tokenizer(text, return_tensors="pt", truncation=True, max_length=512)
    with torch.no_grad():
        output = model(**tokens)
    vec = torch.log1p(torch.relu(output.logits)).max(dim=1).values.squeeze()
    return {"indices": vec.nonzero().squeeze().tolist(), "values": vec[vec != 0].tolist()}
```

**SQL / SQL-ähnlich** dreht sich wirklich um Filterung. Vektorsuche ohne Filterung ist eine Demo. Sie benötigen weiterhin Mandantenbereich, Datumsbereiche, Berechtigungen und Kategoriefilter. Vollständiges SQL (pgvector, LanceDB) drückt dies neben Ihren vorhandenen Joins aus. Zweckgebundene Datenbanken verwenden JSON-Filterobjekte (Qdrant, Pinecone), eine Abfrage-DSL (Elasticsearch, Milvus) oder GraphQL (Weaviate). Sie funktionieren; SQL wird attraktiver, wenn die Filterlogik komplex wird.

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

**Multimodal nativ** bedeutet, dass die Datenbank Embedding-Modelle für Nicht-Text-Inhalte mitliefert. Sie übergeben eine rohe Bild-URL; sie übernimmt die Vektorisierung. Die meisten Datenbanken sind embedding-agnostisch – Sie besitzen die Embedding-Pipeline. Marqo und Weaviate (über CLIP/ImageBind-Module) schließen diesen Kreis.

```python
# Marqo: POST raw images, query with text — no external embedding step
mq.index("products").add_documents(
    [{"id": "shoe-001", "image": "https://cdn.example.com/shoes/001.jpg"}],
    tensor_fields=["image"]
)
results = mq.index("products").search(q="lightweight shoes for summer")
# Returns shoe-001 despite zero keyword overlap — CLIP handles the cross-modal match
```

**Plattenbasierter Index** ist ein Kostenhebel. RAM-residente HNSW-Indizes können mehrere GB RAM pro Million 1536-dimensionaler Vektoren erfordern, wenn Rohvektoren, Graph-Overhead und Metadaten gezählt werden. Plattennative Alternativen (Milvus DiskANN, Elasticsearch DiskBBQ, LanceDBs Lance-Format, Turbopuffers Object-Storage-Tier) tauschen oft etwas Abfragelatenz gegen niedrigere Infrastrukturkosten. Für RAG-Workloads, bei denen die Modelllatenz bereits dominiert, ist dieser Kompromiss häufig ein Benchmark wert.

**Maximale Dimensionen** ist eine Migration, die sich in Ihrer Architektur versteckt. `text-embedding-3-large` verwendet 3072 Dimensionen, Jina v3 kann größere Embeddings ausgeben, und Forschungsmodelle treiben die Grenzen weiter nach oben. Einige Managed Services veröffentlichen harte Dimensionsobergrenzen; andere dokumentieren hohe Obergrenzen oder keine praktische Obergrenze für typische Embedding-Modelle. Prüfen Sie die aktuellen Dokumente, bevor Sie sich festlegen. Wählen Sie etwas mit Spielraum; die Migration eines Vektorindex, weil Sie eine Dimensionsgrenze erreicht haben, ist ein schmerzhafter Sprint.

### Betriebliche Kompromisse, die die Tabelle nicht zeigen kann

**Turbopuffers Multi-Tenancy** ist auf sehr hohe Namespace-Anzahlen ausgelegt. Die öffentliche Positionierung und Kundenberichte betonen Workloads wie Notions großen, namespace-lastigen Korpus. Wenn jeder Benutzer oder jede Organisation eine isolierte Vektorsuche benötigt, kann diese Architektur die Wirtschaftlichkeit verändern, aber benchmarken Sie trotzdem Ihre eigene Mandantenform.

**LanceDB Embedded-Modus** ist das, was "SQLite für die Vektorsuche" am nächsten kommt. Es läuft im Prozess, benötigt keinen Server und funktioniert in Lambda, Cloudflare Workers und Edge-Umgebungen. Das spaltenorientierte Lance-Format macht den eingebetteten Betrieb in realem Maßstab praktikabel.

**Chroma ist am stärksten bei Dev/Test und kleinen App-Deployments.** Wenn Sie auf sehr große Korpora, HA, diskintensiven Betrieb oder erstklassige Hybridsuche abzielen, evaluieren Sie einen produktionsorientierten Store, bevor Sie den Prototyp in die Infrastruktur befördern.

**Vespa ist das, wonach Sie greifen, wenn Retrieval nur die Hälfte des Produkts ist.** Es kombiniert lexikalisches Retrieval, Nächste-Nachbarn-Suche, Tensoren, Ranking-Ausdrücke, Gruppierung und Online-Serving. Diese Leistungsfähigkeit ist real, aber die operative und Modellierungskomplexität ebenso. Es passt eher zu Search-/Recommendation-Teams als zu „semantische Suche zu meiner CRUD-App hinzufügen“.

**ClickHouse gehört ins Gespräch, wenn Suche an Analytik gekoppelt ist.** Wenn Ihre Quelle der Wahrheit Events, Logs, Traces oder Metriken sind, hält ClickHouse Vektor-Distanz, Filterung, Aggregation und ernsthaftes Volltext-Indexing in einer SQL-Engine. Keine zweckgebaute Vektordatenbank, aber oft die langweilig-richtige Antwort für analytisches Retrieval.

**Sparse Vektoren sind der Weg, um Keyword-Matching in BM25-Qualität innerhalb eines Vektorindex zu bekommen** — ohne eine separate Volltext-Engine zu betreiben. Qdrant und Elasticsearch haben hier besonders ausgereifte Implementierungen. Wenn Hybridsuche kritisch ist und eine Zwei-System-Architektur ein Ausschlusskriterium darstellt, ist Sparse-Vektor-Unterstützung das, wonach Sie suchen sollten.

### Store nach Workload auswählen

- **SaaS-Produkt mit Mandantentrennung** → Turbopuffer
- **Komplexe Metadatenfilterung in großem Maßstab** → Qdrant
- **Bereits im Elastic/ELK-Stack** → Elasticsearch mit DiskBBQ
- **AWS-Shop, der Open Source will** → OpenSearch
- **Search-/Recommendation-Plattform mit ernsthaften Ranking-Anforderungen** → Vespa
- **Analytik, Observability, Log-/Event-Suche** → ClickHouse
- **Milliardenmaßstab On-Prem / Self-Hosted** → Milvus
- **Edge / Serverless / Multimodal** → LanceDB
- **Kleine JS-App, Docs-Site oder Edge-native Search-UX** → Orama
- **Zero Ops, Kosten sind zweitrangig** → Pinecone
- **Multimodal-First (Bilder, Video, Audio)** → Marqo
- **Bereits auf MongoDB** → Atlas Vector Search
- **Bereits auf Postgres, brauchen mehr Headroom** → Supabase Vector oder Neon (beide pgvector managed, mit besserem Tooling)

---

## IDs nicht einbetten und exakte Treffer erwarten

Verwenden Sie Vektorsuche nicht als unscharfe Textsuche für Dinge, die korrekte Antworten haben.

„Finde mir den Benutzer mit E-Mail `dan@example.com`“ ist kein Vektorsuchproblem. „Finde die Bestellung mit ID `ORD-12345`“ ebenso wenig. `ORD-12345` einzubetten und per Kosinus-Ähnlichkeit zu suchen, wird *etwas* zurückgeben — aber es könnte falsch sein. Ein Identifikator hat eine korrekte Antwort. Eine ungefähre Übereinstimmung bei einem Identifikator ist ein Bug.

Vektorsuche gibt das *ähnlichste* Ding in Ihrem Datensatz zurück, selbst wenn nichts tatsächlich relevant ist. Sie weiß nicht, wann keine gute Antwort existiert. Das ist in Ordnung für verwandte Dokumente. Es ist ein ernstes Problem für exakte Datensatzsuche, wo eine selbstsichere falsche Antwort schlimmer ist als ein leeres Ergebnis.

Dasselbe gilt in die andere Richtung: Verwenden Sie FTS nicht für Abfragen, bei denen der Benutzer ein Konzept beschreibt. „Artikel über das Treffen schwieriger Entscheidungen unter Unsicherheit“ enthält keine verlässlichen Keywords. FTS wird entweder Rauschen oder nichts zurückgeben. Verwenden Sie das richtige Werkzeug für die Abfrageform.

---

## Suche um Abfrageform herum aufbauen

Die meisten Produktionssuchsysteme brauchen mehr als eine Schicht:

- **`pg_trgm`** für Namen, Tippfehler, Autovervollständigung
- **FTS / `pg_search`** für keyword-basierte Prosa-Suche
- **pgvector** für semantische und konzeptionelle Abfragen
- **RRF-Fusion** für Oberflächen, auf denen Benutzer Abfragetypen mischen
- **Reguläre Indizes** für exakte Identifikatoren, Filter und sortierte Listen

Diese sind keine konkurrierenden Werkzeuge. Sie sind komplementär. Ein gut gebautes Suchsystem wählt die richtige Schicht für jede Abfrageform — und wenn sich Abfrageformen überschneiden, führt es mehrere Schichten aus und fusioniert die Ergebnisse.

Die Teams, die gute Suchfunktionen ausliefern, verstehen den gesamten Stack. Die anderen greifen zu einer Vektordatenbank, betten alles ein und wundern sich, warum exakte Suchanfragen manchmal den falschen Datensatz zurückgeben.
````
