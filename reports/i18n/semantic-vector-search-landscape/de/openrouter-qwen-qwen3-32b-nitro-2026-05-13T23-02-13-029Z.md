# Translation Candidate
- Slug: semantic-vector-search-landscape
- Locale: de
- Model: openrouter/qwen/qwen3-32b:nitro
- Target: src/content/posts/2026-05-01--semantic-vector-search-landscape/de/index.mdx
- Validation: deferred
- Runtime seconds: 43.00
- Input tokens: 16122
- Output tokens: 19152
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- Estimated cost: $0.005886
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
title: >-
  Semantische Vektorsuche und andere Themen, um Freunde und Liebhaber zu
  gewinnen
subTitle: >-
  Die gesamte Suchlandschaft: exakt, Fuzzy, semantisch, hybrid – und wann man
  sie alle kombinieren kann.
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
Suche ist nicht eine Sache, und semantische Suche ersetzt nicht den Rest.  

„Finde Benutzer mit E-Mail `dan@example.com`“ und „finde mir Artikel über Debugging als neuer Ingenieur“ werden beide als Suche beschrieben, haben aber als Ingenieursprobleme fast nichts gemeinsam. Die erste hat eine korrekte Antwort und eine `O(log n)`-Indexsuche. Die zweite hat keine korrekte Antwort – nur Relevanz – und erfordert das Verständnis von Sprache, Absicht und Bedeutung.  

Die Ingenieure, die sich in Suchentscheidungen am überzeugendsten argumentieren – diejenigen, die die Diskussionen gewinnen und das richtige System implementieren –, verstehen das gesamte Landschaftsbild. Sie wissen, welches Tool sie greifen und warum, und können es klar erklären.  

Dieser Artikel behandelt die semantische Ebene: Was macht Vektor-Suche tatsächlich, wann gewinnt sie und wo sollte sie sich aus dem Weg halten. Die nützliche Version ist nicht „alles einbetten“. Es ist das Wissen, wann Vektoren in eine hybride Architektur neben lexikalische, unscharfe und exakte Suchen gehören.  

Die lexikalische und unscharfe Hälfte des Bildes – `tsvector`, `pg_trgm`, `pg_search` – ist im [Postgres-Textsuchleitfaden 2026](../postgres-text-search-guide).  

---

## Begriffe im Überblick  

**Einbettung** – Eine dichte Liste von Fließkommazahlen, die von einem Modell erzeugt wird, um einen Text (oder Bild, Audio usw.) als Punkt im hochdimensionalen Raum darzustellen. Semantisch verwandte Inhalte liegen in der Nähe; unverwandte Inhalte liegen weit auseinander.  

**Lexikalische Suche** – Suche basierend auf exakter Wort- und Tokenübereinstimmung. Schnell, deterministisch und korrekt für bekannte Begriffe. Versteht keine Synonyme, Paraphrasen oder übersprichtsprachlichen Äquivalente.  

**Semantische Suche** – Suche basierend auf Bedeutung statt Tokens. Eine Abfrage für „Wie behandle ich Timeouts?“ kann ein Dokument mit dem Titel „Konfiguration von Wiederholungspolitiken“ ohne gemeinsame Wörter finden, weil ihre Einbettungen geometrisch nahe beieinander liegen.

**Vektor** – Eine Liste von Zahlen. In Suchkontexten ist das Ergebnis eines Einbettungsmodells. „Vektorsuche“ findet die Vektoren, die am nächsten zum Abfragevektor liegen, basierend auf geometrischer Distanz.  

**FTS (Full-Text Search)** – Die eingebaute lexikalische Suche von Postgres, angetrieben von `tsvector` / `tsquery`. Tokenisiert, stammt und indiziert Text für Schlüsselwortabfragen. Stark bei Prosa und exakter Begriffssuche; blind gegenüber Bedeutung.  

**BM25** – Ein Rangieralgorithmus für lexikalische Suche (verwendet von Elasticsearch, Qdrant und anderen). Bewertet Ergebnisse basierend auf Begriffshäufigkeit, gewichtet gegen die Seltenheit des Begriffs im Korpus. Besser als rohe Schlüsselwortübereinstimmung; immer noch lexikalisch.  

**HNSW (Hierarchical Navigable Small World)** – Der Standard-approximative nächstgelegene-Nachbarn-Index für Vektorsuche. Erstellt ein geschichteten Nähe-Graphen für schnelle, hohe-Rückruf-Ähnlichkeitsabfragen. pgvector, Qdrant, Weaviate und die meisten anderen verwenden es.  

**RRF (Reciprocal Rank Fusion)** – Ein Algorithmus zur Zusammenführung von rangierten Ergebnislisten aus mehreren Retrieval-Systemen. Verwendet nur die Rangposition – keine Score-Normalisierung erforderlich. Ein Ergebnis, das in beiden FTS- und Vektorlisten hoch rangiert, erhält einen stärkeren kombinierten Score als eines, das nur eine Liste dominiert.  

## Was semantische Suche tatsächlich tut  

Vektoreinbettungen wandeln Text (oder Bilder, Audio usw.) in eine Liste von Zahlen um – einen Punkt im hochdimensionalen Raum. Ein Einbettungsmodell wird so trainiert, dass semantisch verwandter Text in diesem Raum nahe beieinander liegt. „Hund“ und „canin“ enden nahe beieinander. „Ein Marathon laufen“ und „ein Python-Skript ausführen“ enden weit auseinander, obwohl sie ein Wort teilen.  

Ähnlichkeitssuche in diesem Raum findet Dokumente, deren *Bedeutung* der Abfragebedeutung am nächsten ist, unabhängig von exakter Wortübereinstimmung.  

Das bedeutet:  
- „Wie konfiguriere ich Anforderungszeitüberschreitungen?“ kann ein Artikel mit dem Titel „Einrichten von Verbindungsbeschränkungen und Wiederholungsrichtlinien“ treffen – keine überlappenden Schlüsselwörter, hohe konzeptionelle Relevanz  
- „Etwas Leichtes für einen Sommerabend“ kann einer Weinempfehlung entsprechen, ohne dass Schlüsselwörter in der Produktbeschreibung erscheinen  
- Eine Abfrage auf Englisch kann relevante Dokumente auf Französisch, Spanisch oder Japanisch finden, wenn das Einbettungsmodell multilingual trainiert wurde

Lexikalische Suche (`tsvector`, `pg_trgm`) kann nichts davon. Sie arbeitet mit Wörtern und Zeichen, nicht mit Bedeutung. Die Tools sind nicht austauschbar – sie lösen unterschiedliche Probleme.

---

## Wenn pgvector gewinnt

**RAG aufbauen.** Retrieval-Augmented Generation ruft die Dokumententeile ab, deren Bedeutung der Frage des Benutzers am nächsten kommt, und übergibt sie anschließend einem Sprachmodell als Kontext. Dieser Abruf-Schritt ist eine Vektoroperation. Volltextsuche (FTS) verfehlt Paraphrasen, Synonyme und konzeptionelle Übereinstimmungen, die ein relevanter Abschnitt anders ausdrücken könnte. Der Vorteil von pgvector gegenüber einem eigenständigen Vektor-Speicher: Es läuft in Ihrer bestehenden Postgres-Instanz – kein separates Service zur Bereitstellung, Operation oder Datensynchronisierung erforderlich.

**Benutzer beschreiben, was sie wollen, nicht, wonach gesucht werden soll.** „Artikel über Selbstvertrauenaufbau als neuer Manager“ enthält keine Keywords, die zuverlässig in den relevanten Beiträgen vorkommen. „Ein leichtgewichtiges Framework zur Verwaltung von Seiteneffekten“ enthält möglicherweise nicht exakt diese Wörter in der Dokumentation. Vektor-Suche trifft die Absicht, nicht die Schreibweise.

**Ähnliche Elemente finden.** Verwandte Produkte, ähnliche Support-Tickets, doppelte Fehlerberichte, Artikel, die Ihnen auch gefallen könnten. „Finde Probleme, die diesem ähnlich sind“ ist eine Nächste-Nachbarn-Suche – füge das Element ein, finde seine geometrischen Nachbarn. Eine wichtige Einschränkung: Vektor-Suche liefert immer Ergebnisse, auch wenn nichts wirklich ähnlich ist. Für Deduplizierung und Empfehlungen filtere nach einem Mindest-Ähnlichkeits-Schwellenwert (z. B. Cosinus-Ähnlichkeit ≥ 0,80), um geringe Treffer nicht wie bedeutungsvolle Ergebnisse anzuzeigen.

**Semantische Deduplizierung.** Vor der Indizierung von Inhalten für RAG oder Suche muss man oft nahezu identische Dokumente im Korpus identifizieren – Artikel, die mehrfach überarbeitet wurden, Support-Tickets, die doppelt eingegeben wurden, Wissensdatensätze mit erheblicher Überschneidung. Füge die Dokumente ein und wende eine Schwellenwert-Filterung anhand der Cosinus-Ähnlichkeit an, um nahezu identische Dokumente vor der Indexverunreinigung zu kennzeichnen oder zusammenzuführen. Dies verhindert, dass der Abruf mehrere nahezu identische Abschnitte zurückgibt und den Kontextfenster-Überblick trübt.

**Multilinguale Suche.** Multilinguale Einbettungsmodelle ordnen semantisch äquivalenten Inhalt über Sprachen hinweg in nahegelegene Vektoren ab. Eine Abfrage auf Spanisch für „perder peso“ kann einen englischen Artikel zu „sustainable weight loss habits“ treffen – keine gemeinsamen Tokens, dieselbe zugrunde liegende Bedeutung. FTS erfordert eine pro-Sprache-Wörterbuch-Konfiguration und verarbeitet übersprachliche Abfragen schlecht. `pg_trgm` ist sprachagnostisch, aber orthografisch, nicht semantisch.

### Einrichtung von pgvector

Von der Erweiterungsinstallation bis zur Ähnlichkeitsabfrage umfasst die Einrichtung einige SQL-Anweisungen:

```sql
CREATE EXTENSION IF NOT EXISTS vector;

ALTER TABLE documents ADD COLUMN embedding vector(1536);

-- HNSW ist in der Regel der erste Index, den man bei mittelgroßen Datensätzen ausprobieren sollte
CREATE INDEX documents_embedding_idx
  ON documents USING hnsw (embedding vector_cosine_ops);

-- Semantische Suchabfrage
SELECT id, title, 1 - (embedding <=> $1::vector) AS similarity
FROM documents
ORDER BY embedding <=> $1::vector
LIMIT 10;
```

`<=>` ist die Kosinusdistanz. `1 - Kosinusdistanz` ergibt die Kosinusähnlichkeit (1,0 = identisch, 0,0 = orthogonal). Für `ivfflat` (die ältere, schnellere Alternative zum Aufbau) verwendet man `lists = sqrt(row_count)` als Ausgangspunkt.

### Was pgvector nicht gut bewältigt

- Exakte Tokenübereinstimmung – Produkt-Nummern, Fehlercodes, Funktionsnamen. `ORD-12345` ist semantisch nicht ähnlich zu irgendetwas. Eine Embedding-basierte Suche könnte `ORD-12344` oder nichts Relevantes zurückgeben. Verwende FTS oder einen B-Tree-Index.
- Namen und Eigennamen. Der Embedding-Raum organisiert sich nach Bedeutung, nicht nach Schreibweise. Der Benutzerdatensatz „Micheal Jordan“ landet nicht unbedingt in der Nähe von „Michael Jordan“ im Vektorraum.
- Kurze Zeichenketten, bei denen die Zeichenübereinstimmung wichtiger ist als die Bedeutung. `pg_trgm` bewältigt dies.
- Abfragen, bei denen der exakte Begriff vorkommen muss. BM25 und FTS sind zuverlässiger für exakte Begriffspaarungen.

---

## Hybride Suche: Der Fall für beides

Technische Dokumentation ist das klarste Beispiel dafür, dass kein Tool allein ausreicht.

Benutzer, die nach „how to configure timeouts“ suchen, benötigen konzeptionelle Paarungen: Ein Artikel mit dem Titel „Setting retry policies and connection limits“ enthält keine überlappenden Schlüsselwörter, ist aber genau das, was sie benötigen.

Diese Benutzer suchen gleichzeitig auch nach `withRetry()`, `ECONNRESET` und `ERR_SOCKET_TIMEOUT`. Diese exakten Zeichenketten müssen vorkommen – semantische Paarung findet sie möglicherweise nicht zuverlässig, und ein falsch positiver Treffer (konzeptionell ähnlich, aber nicht die richtige API) ist aktiv irreführend.

Die Vektor-Suche bewältigt die konzeptionellen Abfragen. Die FTS bewältigt die exakten Begriffe. Keine der beiden bewältigt beides gut allein.

Die Lösung ist eine hybride Suche: Führe beide durch und kombiniere die Ergebnisse.

### Reciprocal Rank Fusion (RRF)

**Reciprocal Rank Fusion (RRF)** ist der Standardalgorithmus zur Kombination von sortierten Listen aus verschiedenen Retrieval-Systemen. Es erfordert keine Normalisierung von Scores zwischen Systemen – es nutzt lediglich die Rangpositionen. Ein Ergebnis, das in *beiden* Listen hoch rangiert, erhält einen stärkeren kombinierten Score als eines, das nur eine Liste dominiert.

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

Die `60` im Nenner ist die RRF-Konstante. Höhere Werte dämpfen Unterschiede in Rangpositionen; niedrigere Werte verstärken sie. Der Standardwert 60 funktioniert gut für die meisten Inhaltstypen.

RRF umgeht das schwierigere Problem der Normalisierung von `ts_rank` (ein logarithmischer Frequenzscore) gegenüber Kosinus-Abstand (eine geometrische Messung). Sie sind nicht vergleichbar. RRF fragt nur: „Wie hoch erschien dieses Ergebnis in jeder Liste?“

### Hybride Suche mit Trigrammen

Für die Benutzersuche über gemischten Inhalt – wo Benutzer im selben Session nach einem Namen, einem Konzept oder einem exakten Begriff suchen könnten – bewältigt die dreifache Fusion alle drei Fälle:

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

Dies bewältigt: unscharfe Namenstüfungen (Trigramme), exakte Schlüsselworttreffer (FTS) und konzeptionelle Abfragen (Vektor). Ein Suchfeld kann alle drei Benutzerintentionen bedienen.

---

## Multi-Layer Hybrid-Architekturen

Reale Anwendungen haben selten eine einzige Suchoberfläche. Sie haben mehrere, jede mit einem anderen Bedarf:

| Oberfläche | Was Benutzer abfragen | Empfohlene Schichten |
|---|---|---|
| Blog-/Dokumentationssuche | Schlüsselwörter + Konzepte | FTS + pgvector (RRF) |
| Benutzer-/Kundennamen-Suche | Namen mit Tippfehlern | `pg_trgm` |
| Produkt-Suche | Namen, Beschreibungen, „ähnlich wie“ | `pg_trgm` + FTS + pgvector |
| Support-Ticket-Deduplizierung | „Ähnliche Probleme wie dieses“ | pgvector |
| Interner SKU-/Bestell-Suche | Exakte Identifikatoren | B-Tree-Index |
| RAG über große Wissensbasis | Natürliche Sprachabfragen | pgvector (Chunked-Docs) |
| E-Commerce „Vielleicht gefällt Ihnen auch“ | Verhaltensbasierte + semantische Ähnlichkeit | pgvector |
| Vervollständigungsvorschläge | Präfixe, fehlertolerant | `pg_trgm` |

Diese sind keine hypothetischen Szenarien. Die meisten inhaltsschweren Anwendungen benötigen mindestens zwei verschiedene Suchoberflächen mit unterschiedlichen Abfrageformen. Die Versuchung ist groß, einen Ansatz zu wählen und ihn überall anzuwenden – meistens Vektor-Suche, da sie derzeit der modische Ansatz ist. Dies führt jedoch zu teuren Embeddings für Probleme, bei denen ein Trigramm-Index schneller, günstiger und genauer wäre.

### Die Faustregel

Füge eine Schicht hinzu, sobald ein Ausfallmodus auftritt, den die aktuelle Schicht nicht beheben kann:

- Benutzer reklamieren, dass Tippfehler nicht erkannt werden → füge `pg_trgm` hinzu
- Benutzer suchen nach Konzepten und verpassen relevante Ergebnisse → füge pgvector hinzu
- Benutzer suchen nach exakten Symbolen oder Codes und erhalten stattdessen konzeptionelle Ergebnisse → füge FTS hinzu oder prüfe, ob du zu stark auf Vektor-Suche angewiesen bist
- Latenz wird zum Problem → bewerte Vorfilterung, approximative Indizes oder eine dedizierte Datenbank

---

## Wenn Sie tatsächlich eine dedizierte Vektor-Datenbank benötigen

pgvector bewältigt viele Suchanforderungen in Anwendungen, bevor eine weitere Datenbank erforderlich ist. Die ungefähre Grenze hängt von der Vektorenanzahl, Index-Einstellungen, Schreibrate, Filtern, Hardware und Gleichzeitigkeit ab, daher gilt jede „unter 10 Mio. Vektoren“-Regel als Ausgangspunkt für Benchmarks, nicht als Produktgrenze. Wenn Sie tatsächlich diese Grenze überschreiten – sehr hohe Gleichzeitigkeit, sehr niedrige p99-Latenzanforderungen, Milliarden von Vektoren oder ernsthafte Multi-Tenant-Isolationsanforderungen – ist der Markt an dedizierten Vektor-Datenbanken breit und lohnt sich, verstanden zu werden.

### Was die Matrixspalten tatsächlich bedeuten

**Hybrid-Suche** bedeutet, dass BM25-Schlüsselwort-Suche und Vektor-Ähnlichkeit in einer Abfrage ausgeführt und über RRF zusammengeführt werden. Ohne dies wählen Sie entweder einen Suchmodus oder fusionieren zwei Abfragen selbst.

**Sparvektoren** gehen über BM25 hinaus. Ein SPLADE-Sparvektor hat ~30.000 Dimensionen (eine pro Vokabularbegriff), ~98 % Nullen. Die nicht-nullen Positionen zeigen an, welche Begriffe relevant sind und in welchem Umfang. Eine Abfrage für „Hunde“ gewichtet auch „canin“ und „Haustier“ – Präzision auf BM25-Niveau plus Begriffserweiterung innerhalb eines Vektorindex. Wenn diese Spalte falsch ist, benötigen Sie eine separate FTS-Schicht für exakte Begriffsanfragen.

```python
# SPLADE: ~30.000 Dimensionen, ~60 nicht-null – nur relevante Vokabularpositionen aktivieren
def encode_splade(text: str) -> dict:
    tokens = tokenizer(text, return_tensors="pt", truncation=True, max_length=512)
    with torch.no_grad():
        output = model(**tokens)
    vec = torch.log1p(torch.relu(output.logits)).max(dim=1).values.squeeze()
    return {"indices": vec.nonzero().squeeze().tolist(), "values": vec[vec != 0].tolist()}
```

**SQL / SQL-ähnlich** bezieht sich wirklich auf das Filtern. Vektor-Suche ohne Filterung ist ein Demo. Sie benötigen weiterhin Mietbereiche, Datumsbereiche, Berechtigungen und Kategoriefilter. Vollständiges SQL (pgvector, LanceDB) drückt dies neben Ihren bestehenden Joins aus. Spezialisierte Datenbanken verwenden JSON-Filterobjekte (Qdrant, Pinecone), eine Abfragesprache (DSL) (Elasticsearch, Milvus) oder GraphQL (Weaviate). Sie funktionieren; SQL wird attraktiver, je komplexer die Filterlogik wird.

```sql
-- pgvector: Vektor-Ähnlichkeit ist nur ein weiterer Ausdruck
SELECT id, title, 1 - (embedding <=> $1) AS score
FROM documents
WHERE tenant_id = $2
  AND category = ANY($3::text[])
  AND created_at > NOW() - INTERVAL '90 days'
ORDER BY embedding <=> $1
LIMIT 10;
```

```python
# Qdrant: äquivalenter Filter als Python-Objekt – gleicher Ergebnis, mehr Zeremonie
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

**Multimodal native** bedeutet, dass die Datenbank Einbettungsmodelle für nicht-textuelle Inhalte mitliefert. Sie übergibt einen Rohbild-URL; die Vektorisierung erfolgt intern. Die meisten Datenbanken sind embedding-agnostisch – Sie verwalten die Einbettungspipeline. Marqo und Weaviate (über CLIP/ImageBind-Module) schließen diesen Kreis.

```python
# Marqo: Rohbilder POSTen, mit Text abfragen – keine externe Einbettungsschritt
mq.index("products").add_documents(
    [{"id": "shoe-001", "image": "https://cdn.example.com/shoes/001.jpg"}],
    tensor_fields=["image"]
)
results = mq.index("products").search(q="lightweight shoes for summer")
# Gibt shoe-001 zurück, obwohl kein Begriff übereinstimmt – CLIP übernimmt die Cross-Modal-Matching
```

**Disk-basierte Indexe** sind ein Kostenhebel. RAM-residente HNSW-Indexe können mehrere GB RAM pro Million 1536-Dimensional-Vektoren beanspruchen, sobald Rohvektoren, Graph-Überlastung und Metadaten berücksichtigt werden. Disk-native Alternativen (Milvus DiskANN, Elasticsearch DiskBBQ, LanceDB's Lance-Format, Turbopuffer's Objekt-Speicherschicht) tauschen oft etwas Abfrage-Latenz gegen geringere Infrastrukturkosten. Für RAG-Arbeitsbelastungen, bei denen die Modell-Latenz bereits dominiert, ist dieser Trade-off oft wertvoll zu benchmarken.

**Max. Dimensionen** ist ein Migrationsschritt, der sich in Ihrer Architektur versteckt. `text-embedding-3-large` verwendet 3072 Dimensionen, Jina v3 kann größere Einbettungen ausgeben, und Forschungsmodelle drücken weiter nach oben. Einige verwaltete Dienste veröffentlichen harte Dimensionsobergrenzen; andere dokumentieren hohe Obergrenzen oder keine praktischen Obergrenzen für typische Einbettungsmodelle. Prüfen Sie aktuelle Dokumentation vor der Verpflichtung. Wählen Sie etwas mit Spielraum; die Migration eines Vektor-Index, weil Sie die Dimensionsobergrenze erreicht haben, ist ein schmerzhafter Sprint.

_Zuletzt überprüft anhand öffentlicher Projekt-Dokumentation und Produktseiten am 8. Mai 2026. Behandeln Sie die folgende Tabelle als Entscheidungshilfe, nicht als Ersatz für die Prüfung aktueller Grenzen, Preise und verwalteter Dienstleistungsfeatures._

### Das Landschaftsbild

| Datenbank | Bereitstellung | Lizenz | Hybrid-Suche | Sparvektoren | SQL / SQL-ähnlich | Multimodal | Disk-Index | Max. Dimensionen | Sweet Spot |
|---|---|---|---|---|---|---|---|---|---|
| **[pgvector](https://github.com/pgvector/pgvector)** | Selbsthosted / verwaltet (Supabase, Neon, RDS) | OSS (PostgreSQL) | Manuell (RRF über SQL) | ❌ | ✅ Vollständiges SQL | ❌ | ✅ HNSW auf Disk | 16.000 Speicher; 2.000 indizierte `vector` | Schon auf Postgres; moderate Vektoranzahlen |
| **[Qdrant](https://github.com/qdrant/qdrant)** | Selbsthosted / Cloud | Apache 2.0 | ✅ Native BM25 | ✅ Reife Unterstützung | ❌ (REST/gRPC) | ❌ | ✅ | 65.535 | Skalierbare gefilterte Abfragen; komplexe Metadaten |
| **[Weaviate](https://github.com/weaviate/weaviate)** | Selbsthosted / Cloud | BSD 3 | ✅ Native BM25 + RRF | ✅ | ❌ (GraphQL / gRPC) | ✅ über Module | ✅ | 65.535 | GraphQL-Zugriffsweisen; eingebaute Vektorisierung |
| **[Pinecone](https://www.pinecone.io/)** | Nur Cloud | Eigentum | ✅ (hinzugefügt 2024) | ✅ | ❌ | ❌ | ✅ (serverlos) | 20.000 | Verwaltete Einfachheit; keine Ops-Team |
| **[Milvus](https://github.com/milvus-io/milvus) / [Zilliz](https://zilliz.com/)** | Selbsthosted / Cloud (Zilliz) | Apache 2.0 | ✅ Native | ✅ | ✅ SQL-ähnlich (Milvus Query Language) | ✅ | ✅ DiskANN | 32.768 | Milliarden-Skala; Enterprise On-Prem |
| **[Chroma](https://github.com/chroma-core/chroma)** | Embedded / Selbsthosted | Apache 2.0 | ❌ | ❌ | ❌ | ❌ | ❌ | 65.535 | Nur lokale Entwicklung und Prototyping |
| **[LanceDB](https://github.com/lancedb/lancedb)** | Embedded / Cloud | Apache 2.0 | ✅ | ❌ | ✅ SQL über DataFusion | ✅ Native | ✅ (Lance-Format) | Unbegrenzt | Edge / serverlos; multimodales Lakehouse |
| **[Orama](https://github.com/oramasearch/orama)** | Embedded / Cloud | Apache 2.0 | ✅ Volltext + Vektor | ❌ | ❌ | ❌ | ❌ | Variiert | JS/Edge-Apps; leichtgewichtige Site/App-Suche |
| **[Turbopuffer](https://turbopuffer.com/)** | Nur Cloud (serverlos) | Eigentum | ✅ BM25 + Vektor | ❌ | ❌ | ❌ | ✅ (Objekt-Speicher) | 16.000 | Multitenant SaaS; Millionen von Namespaces |
| **[Elasticsearch](https://github.com/elastic/elasticsearch)** | Selbsthosted / Elastic Cloud | SSPL / AGPLv3 | ✅ RRF + ELSER spar | ✅ (ELSER) | ✅ Query DSL | ❌ | ✅ DiskBBQ | 4.096 | Schon auf Elastic-Stack; hybrides Enterprise-Suche |
| **[OpenSearch](https://github.com/opensearch-project/OpenSearch)** | Selbsthosted / AWS verwaltet | Apache 2.0 | ✅ RRF + Neural Search | ✅ | ✅ Query DSL | ❌ | ✅ FAISS + HNSW | 16.000 | AWS-native; Open-Source-Elastic-Alternative |
| **[Vespa](https://github.com/vespa-engine/vespa)** | Selbsthosted / Cloud | Apache 2.0 | ✅ Native | ✅ Tensoren / lexikalisches Ranking | ✅ YQL | ✅ Tensoren | ✅ | Effektiv unbegrenzt | Suche + Ranking + Empfehlungssysteme |
| **[ClickHouse](https://github.com/ClickHouse/ClickHouse)** | Selbsthosted / Cloud | Apache 2.0 | Manuell | ❌ | ✅ Vollständiges SQL | ❌ | ✅ Columnar + HNSW | Variiert | Analytics/Protokolle mit Vektor-Suche neben OLAP |
| **[MongoDB Atlas](https://github.com/mongodb/mongo)** | Cloud / Selbsthosted | SSPL | ✅ Einbaulösung | ❌ | ✅ MQL + Aggregation | ❌ | ✅ HNSW | 8.192 | Schon auf MongoDB; Dokument + Vektor in einem |
| **[Redis (VSS)](https://github.com/redis/redis)** | Selbsthosted / Redis Cloud | RSALv2 / SSPL | ✅ (RediSearch) | ✅ | ❌ | ❌ | ❌ RAM-only | 32.768 | Ultra-niedrige Latenz; Cache-Schicht Vektor-Suche |
| **[Marqo](https://github.com/marqo-ai/marqo)** | Cloud / Selbsthosted | Apache 2.0 | ✅ | ❌ | ❌ | ✅ Native Fokus | ✅ | Variiert | End-to-End-Multimodal: Bild + Text + Video |

### Einige Dinge, die in die Tabelle nicht passen

**Turbopuffers Multitenancy** ist auf sehr hohe Namespace-Zahlen ausgelegt. Seine öffentliche Positionierung und Kundenbeispiele betonen Workloads wie Notions großes, namespace-reiches Korpus. Wenn jede Benutzer- oder Organisation isolierte Vektor-Suche benötigt, kann diese Architektur die Ökonomie verändern, aber testen Sie weiterhin Ihre eigenen Tenant-Formen.

**LanceDB eingebetteter Modus** ist das, was am nächsten an „SQLite für Vektorsuche“ herankommt. Es läuft im Prozess, benötigt keinen Server und funktioniert in Lambda, Cloudflare Workers und Edge-Umgebungen. Das Lance-Columnar-Format macht eingebettete Operationen in realer Skalierung praktikabel.  

**Chroma ist am stärksten bei Entwicklung/Test und kleinen App-Deployments.** Wenn Sie sehr große Korpora, Hochverfügbarkeit, disklastige Operationen oder erste Klasse Hybriden-Suche anstreben, evaluieren Sie vor der Promotion des Prototyps in die Infrastruktur einen produktionsorientierten Speicher.  

**Vespa ist die Wahl, wenn Retrieval nur die Hälfte des Produkts ist.** Es kombiniert lexikales Retrieval, Nächste-Nachbarn-Suche, Tensoren, Rangfolgeausdrücke, Gruppierung und Online-Server. Diese Leistung ist real, aber auch die Betriebs- und Modellierungskomplexität. Es eignet sich besser für Such-/Empfehlungsteams als für „semantische Suche in mein CRUD-App hinzufügen“.  

**ClickHouse gehört in die Diskussion, wenn Suche mit Analyse verbunden ist.** Wenn Ihre Quelle Wahrheit Events, Logs, Traces oder Metriken sind, hält ClickHouse Vektorabstand, Filterung, Aggregation und ernsthafte Volltextindexierung in einem SQL-Engine. Kein speziell für Vektoren gebautes Datenbanksystem, aber oft die langweilig-richtige Antwort für analytisches Retrieval.  

**Sparse-Vektoren sind der Weg, BM25-Qualitäts-Schlüsselwortabgleich innerhalb eines Vektorindex zu erreichen** – ohne einen separaten Volltext-Engine zu betreiben. Qdrant und Elasticsearch haben besonders reife Implementierungen hier. Wenn Hybriden-Suche kritisch ist und eine Zweisystem-Architektur ein Dealbreaker ist, suchen Sie nach Sparse-Vektor-Unterstützung.  

### Wenn Sie pgvector überwachsen haben  

- **SaaS-Produkt mit pro-Tenant-Isolation** → Turbopuffer  
- **Komplexe Metadaten-Filterung in Skalierung** → Qdrant  
- **Bereits auf Elastic/ELK-Stack** → Elasticsearch mit DiskBBQ  
- **AWS-Shop, der Open-Source will** → OpenSearch  
- **Such-/Empfehlungsplattform mit ernsthaften Rangfolgen-Anforderungen** → Vespa  
- **Analyse, Observability, Log/Event-Suche** → ClickHouse  
- **Milliarden-Skalierung on-prem / selbstgehostet** → Milvus  
- **Edge / serverlos / multimodal** → LanceDB  
- **Kleiner JS-App, Docs-Site oder edge-nativ Such-UX** → Orama  
- **Null-Operationen, Kosten sind sekundär** → Pinecone  
- **Multimodal-first (Bilder, Video, Audio)** → Marqo  
- **Bereits auf MongoDB** → Atlas Vector Search  
- **Bereits auf Postgres, benötigen mehr Leistung** → Supabase Vector oder Neon (beide pgvector verwaltet, mit besserer Tooling)  

---  

## Das Eine, was man nicht tun sollte  

Verwenden Sie Vektorsuche nicht als unscharfe Textsuche für Dinge, bei denen es korrekte Antworten gibt.

"Finde mir den Benutzer mit der E-Mail-Adresse `dan@example.com`" ist kein Vektorsucheproblem. "Finde die Bestellung mit der ID `ORD-12345`" ist es ebenfalls nicht. Das Einbetten von `ORD-12345` und die Suche nach Kosinus-Ähnlichkeit liefert zwar *etwas* – könnte aber falsch sein. Ein Identifier hat eine korrekte Antwort. Eine ungefähre Übereinstimmung für einen Identifier ist ein Fehler.

Vektorsuche liefert das *ähnlichste* Element in Ihrem Datensatz, selbst wenn nichts wirklich relevant ist. Sie weiß nicht, wann keine gute Antwort existiert. Das ist in Ordnung für verwandte Dokumente. Bei exakten Datensuche, wo eine falsche Antwort schlimmer ist als kein Ergebnis, ist das ein ernstes Problem.

Das Gleiche gilt in umgekehrter Richtung: Verwenden Sie FTS nicht für Abfragen, bei denen der Benutzer einen Begriff beschreibt. "Artikel über Entscheidungen unter Unsicherheit" enthält keine verlässlichen Schlüsselwörter. FTS liefert entweder Rauschen oder nichts. Verwenden Sie das richtige Werkzeug für die Abfragestruktur.

---

## Das Gesamtbild

Die meisten Produktions-Suchsysteme benötigen mehr als eine Schicht:

- **`pg_trgm`** für Namen, Tippfehler, Autocomplete  
- **FTS / `pg_search`** für schlüsselwortbasierte Textsuche  
- **pgvector** für semantische und konzeptionelle Abfragen  
- **RRF-Fusion** für Oberflächen, bei denen Benutzer Abfragetypen mischen  
- **Reguläre Indizes** für exakte Identifikatoren, Filter und sortierte Listen  

Diese Tools sind nicht konkurrierend. Sie ergänzen sich. Ein gut entworfenes Suchsystem wählt die richtige Schicht für jede Abfragestruktur aus – und wenn Abfragestrukturen überschneiden, führt es mehrere Schichten aus und fusioniert die Ergebnisse.

Die Teams, die gute Suchfunktionen implementieren, verstehen die gesamte Stack. Diejenigen, die es nicht tun, greifen auf ein Vektordatenbank-System zurück, betten alles ein und wundern sich, warum exakte Suchen manchmal den falschen Datensatz zurückgeben.
````
