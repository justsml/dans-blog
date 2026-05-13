# Translation Candidate
- Slug: postgres-fts-vs-pgvector
- Locale: de
- Model: openrouter/openai/gpt-oss-120b:nitro
- Target: src/content/posts/2026-05-08--postgres-fts-vs-pgvector/de/index.mdx
- Validation: passed
- Runtime seconds: 16.30
- Input tokens: 21345
- Output tokens: 8179
- Thinking tokens: unknown
- Cached input tokens: 4736
- Cache write tokens: 0
- Estimated cost: $0.002305
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
title: 'Postgres‑Suche: FTS, Trigramme und pgvector'
subTitle: Sie haben die Werkzeuge bereits. Wählen Sie das passende zur Anfrage.
date: '2026-05-08'
modified: '2026-05-08'
tags:
  - postgres
  - postgresql
  - pgvector
  - full-text-search
  - vector-search
  - trigrams
  - pg_trgm
  - databases
  - ai
  - search
category: Code
subCategory: Databases
draft: true
unlisted: true
hidden: true
publish: false
popularity: 0.8
social_image: ../desktop-social.webp
cover_full_width: ../wide.webp
cover_mobile: ../square.webp
cover_icon: ../square.webp
---
Teams, die KI‑Funktionen hinzufügen, greifen häufig zuerst zu einer dedizierten Vektor‑Datenbank.

Pinecone, Weaviate, Qdrant, Chroma. Neuer Service, neue Abhängigkeit, neuer Connection‑Pool, neue Rechnung und jetzt zwei Wahrheitsquellen, die man ehrlich halten muss.

Unterdessen haben sie bereits PostgreSQL. PostgreSQL hat bereits `pgvector`. Außerdem gibt es seit 2008 einen ausgezeichneten integrierten Full‑Text‑Search.

Dedizierte Vektor‑Stores rechtfertigen sich bei großem Maßstab und hohem Abfragevolumen. Doch die meisten Anwendungen greifen auf das zweite Suchsystem, bevor das erste wirklich stark beansprucht wurde. So wird ein zukünftiges Skalierungsproblem zu einem heutigen Synchronisations‑Bug.

Also: Wann nutzt man FTS, wann pgvector und wann beides?

## Was jedes Werkzeug tatsächlich tut

Full‑Text‑Search (`tsvector` / `GIN`‑Index) ist lexical. Es zerlegt Text in Lexeme, stemmt sie und vergleicht Abfragen mit dem Index. „Running“ und „runs“ kollabieren zum selben Lexem. Gleiches gilt für „dog“ und „dogs“. Die Ranking‑Funktion (`ts_rank`) belohnt Dokumente, in denen die Abfragebegriffe häufig oder prominent vorkommen.

`pgvector` ist semantisch. Es speichert einen dichten Vektor – eine Zahlenliste – die den *Bedeutungsgehalt* eines Abschnitts gemäß einem Embedding‑Modell repräsentiert. Ähnlichkeitssuche findet nahe Vektoren in diesem hochdimensionalen Raum. „Dog“ und „canine“ liegen nahe beieinander. „Running“ im sportlichen Sinne und „running“ als Prozess können dagegen weit auseinander liegen.

Der praktische Unterschied: FTS beantwortet „welche Dokumente enthalten diese Wörter?“, während die Vektorsuche beantwortet „welche Dokumente bedeuten ungefähr das Folgende?“.

![Eine Suchwerkzeug‑Karte, die pg_trgm für kurze unscharfe Zeichenketten, Full‑Text‑Search für exakte Prosa‑Abfragen, pgvector für semantisches Matching und hybride Suche für langen Inhalt, der sowohl exakte als auch semantische Signale benötigt.](../search-tool-map.svg)

_Die erste Trennung ist nicht „alte Suche vs. KI‑Suche“. Sie richtet sich nach der Form des Textes und welcher Art von Antwort korrekt wäre._

---

## Wenn Full‑Text‑Search gewinnt

**Sie suchen exakt nach den relevanten Begriffen.** Produkt‑SKUs, Fehlercodes, Modell‑Nummern, Benutzernamen, Verweis‑auf‑Gesetzesparagraphen. `SKU-AX-44192` ist zu keinem anderen Begriff semantisch ähnlich. Es stimmt entweder oder nicht. Eine Vektor‑Suche könnte fälschlicherweise `SKU-AX-44193` zurückliefern. Das ist nicht gewünscht.

**Ihre Abfragen basieren auf Schlüsselwörtern.** Nutzer tippen in ein Suchfeld, filtern nach Tag oder durchsuchen Blog‑Beiträge nach Stichwort. FTS wurde für diese Intent‑Form gebaut.

**Sie benötigen gerankte Ergebnisse ohne GPU‑ oder Embedding‑Infrastruktur.** FTS‑Indizes sind schnell, deterministisch und benötigen keine externen API‑Aufrufe. Fügen Sie eine `tsvector`‑Spalte hinzu, erstellen Sie einen GIN‑Index, und fertig.

**Sie führen boolesche Filterungen zusammen mit der Suche aus.** `WHERE to_tsvector(body) @@ to_tsquery('postgres') AND category = 'tutorial' AND published_at > NOW() - INTERVAL '6 months'` — dies lässt sich natürlich in Ihre bestehende Abfragelogik einbinden.

```sql
-- Create the index
ALTER TABLE posts ADD COLUMN search_vector tsvector
  GENERATED ALWAYS AS (
    setweight(to_tsvector('english', coalesce(title, '')), 'A') ||
    setweight(to_tsvector('english', coalesce(body, '')), 'B')
  ) STORED;

CREATE INDEX posts_search_idx ON posts USING GIN (search_vector);

-- Query
SELECT title, ts_rank(search_vector, query) AS rank
FROM posts, to_tsquery('english', 'postgres & performance') query
WHERE search_vector @@ query
ORDER BY rank DESC
LIMIT 10;
```

Die `GENERATED ALWAYS AS`‑Spalte hält den Index automatisch aktuell. `setweight` gibt Titeltreffer höheres Ranking als Treffer im Body. Das ist die komplette Einrichtung.

---

## Wenn Trigramme gewinnen (pg_trgm)

Ein drittes PostgreSQL‑Werkzeug, das oft übersehen wird, ist `pg_trgm`. Es ist weder Volltext‑ noch Vektorsuche. Es handelt sich um fuzzy String‑Matching und es deckt den unbequemen Mittelbereich ab, den beide anderen Werkzeuge nur schlecht bedienen.

**Anwendungsfall: Namen, Adressen, Kennungen und kurze Zeichenketten mit Tippfehlern.**

FTS zerlegt Text in Lexeme und stemmt sie. Das funktioniert für Fließtext, ist aber ungeeignet für:
- Personennamen („Dan Levy“ → gestemmt zu „dan levi“, „leiv“, abhängig von der Sprachkonfiguration)
- Firmennamen, Adressen, Produkttitel, bei denen die genaue Schreibweise zählt
- Abfragen mit Tippfehlern – „Micheal Jordan“, „Amaon“, „javascipt“
- Autovervollständigung / Präfixsuche
- Teilstring‑Matching („son“ passend zu „Johnson“, „Anderson“)

pgvector ist hier ebenfalls eine schlechte Wahl. Man kann „Micheal Jordan“ einbetten und den nächsten Vektor finden, aber der Einbettungsraum ordnet Namen nach Bedeutung, nicht nach Rechtschreibung. Der nächste Nachbar könnte „basketball legend“ oder „Michael B. Jordan“ sein, nicht der Benutzerdatensatz mit dem Tippfehler.

`pg_trgm` zerlegt Zeichenketten in überlappende 3‑Zeichen‑Slices und misst, wie viele Trigramme zwei Zeichenketten gemeinsam haben. „Dan“ → `" da"`, `"dan"`, `"an "`. „Micheal“ und „Michael“ teilen die meisten Trigramme, daher ist die Ähnlichkeit hoch.

```sql
-- Enable the extension (usually already available)
CREATE EXTENSION IF NOT EXISTS pg_trgm;

-- GIN index on names column — enables fast trigram similarity search
CREATE INDEX users_name_trgm_idx ON users USING GIN (name gin_trgm_ops);

-- Fuzzy name search: finds "Micheal Jordan" when searching "Michael Jordan"
SELECT id, name, similarity(name, $1) AS score
FROM users
WHERE name % $1          -- % operator = similarity threshold (default 0.3)
ORDER BY score DESC
LIMIT 10;

-- Or use ILIKE with trigram index support for contains matching
SELECT id, name
FROM users
WHERE name ILIKE '%johnson%'   -- GIN index makes this fast
LIMIT 10;
```

Der `%`‑Operator verwendet `pg_trgm.similarity_threshold` (Standard 0.3, Bereich 0‑1). Höhere Werte verlangen engere Übereinstimmungen. Für die Namenssuche liegt der optimale Bereich bei 0.3‑0.4: permissiv genug, um Tippfehler zu erfassen, streng genug, um Rauschen zu vermeiden.

**Trigramme helfen auch bei Präfixsuche und Autovervollständigung, besonders wenn Autocomplete Tippfehler tolerieren oder Teilstrings finden muss:**

```sql
-- Autocomplete: prefix matching. For pure left-anchored prefixes,
-- compare trigram GIN against a B-tree pattern index on your data.
SELECT name FROM users
WHERE name ILIKE $1 || '%'
ORDER BY name
LIMIT 10;

-- More control: word_similarity for partial matches within longer strings
-- (useful when searching "Johnson" within "Andrew Johnson III")
SELECT id, name, word_similarity($1, name) AS score
FROM users
WHERE $1 <% name          -- <% operator = word_similarity threshold
ORDER BY score DESC
LIMIT 10;
```

**Wann `pg_trgm` gegenüber FTS bevorzugen:**

| Szenario | Verwendung |
|---|---|
| Personen‑/Firmennamensuche mit Tippfehlern | `pg_trgm` |
| Autocomplete / Präfixsuche | `pg_trgm` (oder FTS mit Präfix‑Abfragen) |
| Suche nach kurzen Zeichenketten, Codes, Identifiern | `pg_trgm` |
| Suche in Fließtexten, Dokumentation | FTS |
| Suche in Log‑Nachrichten nach Schlüsselwörtern | FTS |
| Mehrsprachige Namenssuche | `pg_trgm` (sprachunabhängig) |

`pg_trgm` lässt sich auch mit FTS kombinieren. Verwende Trigramme als unscharfen Vorfilter und bewerte mit `ts_rank` oder kombiniere die Trigram‑Ähnlichkeit mit einem Vektor‑Score.

---

## Wenn pgvector gewinnt

**Du baust RAG.** RAG beruht auf semantischer Retrieval: finde Dokument‑*Chunks*, deren Bedeutung der Frage des Nutzers am nächsten kommt, selbst wenn die Formulierung abweicht. Vektorsuche ist dafür gebaut. FTS verpasst Paraphrasen, Synonyme und konzeptuelle Treffer.

**Nutzer beschreiben, was sie wollen, nicht wonach sie suchen.** „Etwas Leichtes für einen Sommerabend“ enthält keine offensichtlichen Wein‑Schlüsselwörter. „Artikel darüber, Selbstvertrauen als neuer Manager aufzubauen“ erfordert semantisches Verständnis, das FTS nicht liefern kann.

**Du suchst nach ähnlichen Elementen.** Verwandte Produkte, ähnliche Support‑Tickets, doppelte Bug‑Reports. „Zeig mir Probleme, die diesem ähneln“ ist ein Vektor‑Operation. Du bettest das neue Problem ein und findest seine nächsten Nachbarn.

**Mehrsprachiger Inhalt.** Vektor‑Einbettungen, die auf mehrsprachigen Daten trainiert wurden, können über Sprachgrenzen hinweg matchen. FTS benötigt sprachspezifische Konfigurationen und bewältigt sprachübergreifende Anfragen schlecht.

```sql
-- Setup
CREATE EXTENSION IF NOT EXISTS vector;

ALTER TABLE documents ADD COLUMN embedding vector(1536);
CREATE INDEX documents_embedding_idx
  ON documents USING ivfflat (embedding vector_cosine_ops)
  WITH (lists = 100);

-- Query: semantic search
SELECT id, title, 1 - (embedding <=> $1::vector) AS similarity
FROM documents
ORDER BY embedding <=> $1::vector
LIMIT 10;
```

Hinweis: `ivfflat` ist approximativ — es ist schnell, opfert aber etwas Recall zugunsten der Geschwindigkeit. Für kleinere Datensätze (unter ca. 1 M Zeilen) ist `hnsw` häufig die bessere Wahl:

```sql
CREATE INDEX documents_embedding_idx
  ON documents USING hnsw (embedding vector_cosine_ops);
```

---

## Wenn du beides brauchst

Technische Dokumentation ist der Fall, in dem die einfache Aufteilung versagt. Nutzer suchen nach „how to configure timeouts“, aber sie suchen auch nach Funktionsnamen wie `withRetry()` und Fehlercodes wie `ECONNRESET`.

Vektorsuche bedient konzeptuelle Anfragen. FTS bedient exakte Begriffe. Keines von beiden kann beide Anfragetypen allein gut abdecken.

Die Lösung ist die hybride Suche: beide Verfahren ausführen und die Ergebnisse zusammenführen.

**Reciprocal Rank Fusion (RRF)** ist hier der Standard‑Algorithmus. Er verlangt nicht, dass Sie Scores aus zwei Systemen normalisieren; er kombiniert Rangpositionen.

```sql
-- Hybrid search with Reciprocal Rank Fusion
WITH fts_results AS (
  SELECT id, ROW_NUMBER() OVER (ORDER BY ts_rank(search_vector, query) DESC) AS rank
  FROM documents, to_tsquery('english', $1) query
  WHERE search_vector @@ query
  LIMIT 50
),
vector_results AS (
  SELECT id, ROW_NUMBER() OVER (ORDER BY embedding <=> $2::vector) AS rank
  FROM documents
  ORDER BY embedding <=> $2::vector
  LIMIT 50
),
rrf AS (
  SELECT
    COALESCE(f.id, v.id) AS id,
    COALESCE(1.0 / (60 + f.rank), 0) + COALESCE(1.0 / (60 + v.rank), 0) AS rrf_score
  FROM fts_results f
  FULL OUTER JOIN vector_results v ON f.id = v.id
)
SELECT d.id, d.title, rrf.rrf_score
FROM rrf
JOIN documents d ON d.id = rrf.id
ORDER BY rrf_score DESC
LIMIT 10;
```

Die `60` im Nenner ist die RRF‑Konstante — höhere Werte verringern den Einfluss von Rangunterschieden, niedrigere Werte verstärken ihn. Der Standardwert 60 funktioniert in den meisten Fällen gut.

Damit werden zwei Suchen in einer Abfrage ausgeführt, die Ränge zusammengeführt und Ergebnisse belohnt, bei denen Keyword‑ und semantische Signale übereinstimmen.

![Ein hybrider Such‑Pipeline, bei der eine Anfrage sowohl an die Volltextsuche als auch an pgvector verteilt wird, jede Liste liefert gerankte Ergebnisse, und Reciprocal Rank Fusion kombiniert die beiden Listen.](../hybrid-rrf-pipeline.svg)

_RRF ist nützlich, weil es vermeidet, `ts_rank` und Kosinus‑Distanz als direkt vergleichbare Rohscores zu behandeln. Es fragt lediglich: „Wie hoch stand dieses Ergebnis in jeder Liste?“_

---
## Der praktische Entscheidungsbaum

Bei der Wahl einer Suchstrategie beginnt man mit **der Form des Eingabewerts** und fragt anschließend **welche Art von Abfrage der Nutzer stellt**. „Kurzer String mit Rechtschreibvariationen“ ist ein anderes Problem als „langer Fließtext, bei dem exakte Begriffe zählen“, und beide unterscheiden sich von „Fragen zu Dokument‑Abschnitten“.

![Ein Entscheidungsbaum, der basierend auf der Textform und der Art der Nutzerabfrage pg_trgm, Volltextsuche, pgvector, hybride Suche oder eine dedizierte Vektordatenbank auswählt.](../search-decision-tree.svg)

Der gleiche Baum in Worten:

- **Namen, Adressen, Titel, Autovervollständigung oder fehleranfällige kurze Strings** → `pg_trgm`
- **Bekannte Wörter, Fehlermeldungen, SKUs, Funktionsnamen, Tags, Kategorien, Filter** → FTS
- **Fragen, Paraphrasen, Empfehlungen, verwandte Artikel, mehrsprachige Zuordnungen, RAG‑Chunks** → pgvector
- **Technischer Inhalt, bei dem Nutzer sowohl exakte Symbole als auch konzeptuelle Antworten benötigen** → Hybrid mit RRF
- **Primärschlüssel, exakte IDs, Berechtigung‑Filter, Datumsbereiche, sortierte Listen** → normale SQL‑Indizes
- **Enorme Vektormengen, sehr hohe Parallelität oder Latenzziele, die PostgreSQL in Ihren Benchmarks nicht erreicht** → dedizierte Vektordatenbanken evaluieren

### FTS vs. Semantic: Die Kurzfassung

Die Frage „Soll ich FTS oder Vektorsuche verwenden?“ lässt sich meist auf das Wesentliche reduzieren: **kennen Sie die Wörter, die in den relevanten Dokumenten vorkommen?**

Wenn ja – Nutzer suchen nach bekannten Begriffen, Kategorien, Funktionsnamen, Produktcodes – ist FTS schneller, günstiger und vorhersehbarer. Es zeigt Ihnen, warum ein Ergebnis getroffen hat.

Wenn nein – Nutzer beschreiben ein Konzept, stellen eine Frage oder suchen in einer anderen Sprache – ist Vektorsuche das richtige Werkzeug. Sie gleicht Bedeutungen ab, nicht Wörter.

Der knifflige Mittelweg sind natürlichsprachliche Anfragen über technischen Inhalt. Jemand, der nach „how do I handle connection drops“ sucht, könnte einen Artikel mit dem Titel „implementing retry logic for network failures“ benötigen – keine überlappenden Wörter, aber hohe semantische Relevanz. Genau hier rechtfertigt sich der Einsatz von Vektorsuche.

Ein weiterer schwieriger Fall sind **Namen und Eigennamen**. Weder FTS noch Vektorsuche sind hier besonders stark:
- FTS verpasst „Micheal“, wenn nach „Michael“ gesucht wird – unterschiedliche Tokens
- Vektorsuche verpasst den Namen komplett, wenn er im Trainingsdatensatz selten vorkommt
- `pg_trgm` löst das korrekt: orthografische Ähnlichkeit, nicht semantisch oder lexikalisch

Inder Praxis benötigen die meisten inhaltsintensiven Suchfelder FTS für Geschwindigkeit und Schlüsselwörter und können je nach Bedarf nach Namen hybrid oder `pg_trgm` einsetzen. Ein echtes semantisches Suchfeature bedeutet in der Regel pgvector. RAG bedeutet immer pgvector.

---

## Wenn Sie doch einen dedizierten Vektorspeicher benötigen

Manche Systeme wachsen tatsächlich über pgvector hinaus. Dann wird der Markt laut. Wichtig sind dabei die folgenden Kriterien.

### Die Feature‑Matrix

Einige Spalten müssen erklärt werden, bevor die Tabelle Sinn ergibt.

**Hybrid‑Suche** bedeutet, dass BM25‑Keyword‑Suche und Vektor‑Ähnlichkeit in einer einzigen Abfrage laufen und über Reciprocal Rank Fusion zusammengeführt werden. „withRetry timeout“ kann sowohl den Funktionsnamen exakt *als auch* Dokumente über „Retry‑Logik für Netzwerkfehler“ semantisch treffen. Ohne Hybrid‑Modus wählen Sie einen Suchmodus oder fügen zwei Abfragen selbst zusammen. pgvector’s „Manual (RRF via SQL)“ ist [der Ansatz, der oben gezeigt wurde](#when-you-need-both): er funktioniert, aber Sie schreiben ihn selbst.

**Sparse‑Vektoren** gehen über BM25 hinaus. Ein SPLADE‑Sparse‑Vektor hat ~30 000 Dimensionen (eine pro Vokabular‑Begriff), ~98 % Nullen. Die Nicht‑Null‑Positionen zeigen, welche Begriffe wichtig sind und wie stark. Eine Abfrage nach „dogs“ gewichtet zudem „canine“ und „pet“: BM25‑Level‑Keyword‑Präzision plus Term‑Expansion innerhalb eines Vektor‑Indexes. Wenn diese Spalte false ist, benötigen Sie eine externe FTS‑Schicht für exakte Begriff‑Abfragen.

```python
# SPLADE: ~30,000 dims total, ~60 non-zero — only the relevant vocabulary positions fire
def encode_splade(text: str) -> dict:
    tokens = tokenizer(text, return_tensors="pt", truncation=True, max_length=512)
    with torch.no_grad():
        output = model(**tokens)
    vec = torch.log1p(torch.relu(output.logits)).max(dim=1).values.squeeze()
    return {"indices": vec.nonzero().squeeze().tolist(), "values": vec[vec != 0].tolist()}
```

**SQL / SQL‑ähnlich** dreht sich eigentlich um Filterung. Vektorsuche ohne Filterung ist eine Demo, keine Anwendung: Sie benötigen weiterhin Mandanten‑Scope, Datumsbereiche, Berechtigungen und Kategorien. Voll‑SQL (pgvector) drückt das neben Ihren bestehenden Joins aus. Zweck‑gebaute DBs verwenden JSON‑Filter‑Objekte (Qdrant, Pinecone), eine Query‑DSL (Elasticsearch, Milvus) oder GraphQL (Weaviate). Sie funktionieren; SQL wird attraktiver, sobald die Filterlogik verknüpft wird.

```sql
-- pgvector: vector similarity is just another expression in WHERE
SELECT id, title, 1 - (embedding <=> $1) AS score
FROM documents
WHERE tenant_id = $2 AND category = ANY($3::text[]) AND created_at > NOW() - INTERVAL '90 days'
ORDER BY embedding <=> $1 LIMIT 10;
```

```python
# Qdrant: equivalent filter as a Python object — functional, more ceremony
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

**Multimodal native** bedeutet nicht nur „kann Bild‑Embeddings speichern“; jede Datenbank kann Float‑Arrays speichern. Es bedeutet, dass die Datenbank Embedding‑Modelle für Nicht‑Text‑Inhalte mitliefert, sodass Sie ihr eine rohe Bild‑URL geben und sie die Vektorisierung übernimmt. Die meisten hier genannten Datenbanken sind embedding‑agnostisch, sodass Sie die Pipeline selbst besitzen. Marqo und Weaviate (via CLIP/ImageBind‑Module) schließen den Kreis.

```python
# Marqo: POST raw images, query with text — no external embedding step needed
mq.index("products").add_documents(
    [{"id": "shoe-001", "image": "https://cdn.example.com/shoes/001.jpg"}],
    tensor_fields=["image"]
)
results = mq.index("products").search(q="lightweight shoes for summer")
# Returns shoe-001 despite zero keyword overlap — CLIP handles the cross-modal match
```

**Disk‑basierter Index** ist eine Kostenfrage. RAM‑residentes HNSW kann mehrere GB RAM pro Million 1536‑Dimensional‑Vektoren benötigen, wenn rohe Vektoren, Graph‑Overhead und Metadaten mitgerechnet werden. Disk‑native Alternativen (Milvus DiskANN, Elasticsearch DiskBBQ, LanceDB’s Lance‑Format, Turbopuffer’s Object‑Storage‑Tier) tauschen oft etwas Abfrage‑Latenz gegen günstigere Infrastruktur. Für RAG‑Workloads, bei denen die Modell‑Latenz bereits dominiert, lohnt sich das häufig im Benchmark. Redis VSS ist die harte Einschränkung: nur RAM, kein Disk‑Pfad.

**Max‑Dimensionen** verbergen die Migration von morgen in der Wahl von heute. `text-embedding-3-large` nutzt 3072 Dims, Jina v3 kann größere Embeddings erzeugen, und Forschungs‑Modelle treiben die Größe weiter nach oben. Einige Managed‑Services veröffentlichen feste Dim‑Grenzen; andere dokumentieren hohe oder praktisch keine Obergrenze für typische Embedding‑Modelle. Prüfen Sie aktuelle Docs, bevor Sie sich festlegen. Wählen Sie etwas mit Spielraum; einen Vektor‑Index zu migrieren, weil Sie eine Dim‑Grenze erreicht haben, ist ein mühsamer Sprint.

_Last verifiziert gegen öffentliche Projektdokumentation und Produktseiten am 8. Mai 2026. Betrachten Sie die Matrix als Momentaufnahme: Limits von Managed‑Services, Preise, Hybrid‑Search‑Funktionen und Festplatten‑Index‑Optionen ändern sich schnell._

| Datenbank | Bereitstellung | Lizenz | Hybrid‑Search | Sparse‑Vektoren | SQL / SQL‑ähnlich | Multimodal | Festplatten‑Index | Max‑Dims | Sweet Spot |
|---|---|---|---|---|---|---|---|---|---|
| **[pgvector](https://github.com/pgvector/pgvector)** | Self‑host / managed (Supabase, Neon, RDS) | OSS (PostgreSQL) | Manuell (RRF via SQL) | ❌ | ✅ Voll‑SQL | ❌ | ✅ HNSW auf Festplatte | 16.000 Speicher; 2.000 indizierte `vector` | Bereits in Postgres; moderate Vektor‑Anzahl |
| **[Qdrant](https://github.com/qdrant/qdrant)** | Self‑host / Cloud | Apache 2.0 | ✅ Native BM25 | ✅ Reife Unterstützung | ❌ (REST/gRPC) | ❌ | ✅ | 65.535 | Gefilterte Abfragen in großem Maßstab; komplexe Metadaten |
| **[Weaviate](https://github.com/weaviate/weaviate)** | Self‑host / Cloud | BSD 3 | ✅ Native BM25 + RRF | ✅ | ❌ (GraphQL / gRPC) | ✅ via Module | ✅ | 65.535 | GraphQL‑Zugriffsmuster; integrierte Vektorisierung |
| **[Pinecone](https://www.pinecone.io/)** | Nur Cloud | Proprietär | ✅ (2024 hinzugefügt) | ✅ | ❌ | ❌ | ✅ (serverless) | 20.000 | Verwaltete Einfachheit; kein Ops‑Team |
| **[Milvus](https://github.com/milvus-io/milvus) / [Zilliz](https://zilliz.com/)** | Self‑host / Cloud (Zilliz) | Apache 2.0 | ✅ Native | ✅ | ✅ SQL‑ähnlich (Milvus Query Language) | ✅ | ✅ DiskANN | 32.768 | Milliarden‑Skala; Enterprise On‑Prem |
| **[Chroma](https://github.com/chroma-core/chroma)** | Embedded / self‑host | Apache 2.0 | ❌ | ❌ | ❌ | ❌ | ❌ | 65.535 | Lokale Entwicklung und Prototyping nur |
| **[LanceDB](https://github.com/lancedb/lancedb)** | Embedded / Cloud | Apache 2.0 | ✅ | ❌ | ✅ SQL via DataFusion | ✅ Native | ✅ (Lance‑Format) | Unbegrenzt | Edge / serverless; multimodales Lakehouse |
| **[Orama](https://github.com/oramasearch/orama)** | Embedded / Cloud | Apache 2.0 | ✅ Volltext + Vektor | ❌ | ❌ | ❌ | ❌ | Variabel | JS/Edge‑Apps; leichte Site/App‑Suche |
| **[Turbopuffer](https://turbopuffer.com/)** | Nur Cloud (serverless) | Proprietär | ✅ BM25 + Vektor | ❌ | ❌ | ❌ | ✅ (Objektspeicher) | 16.000 | Multi‑Tenant SaaS; Millionen Namespaces |
| **[Elasticsearch](https://github.com/elastic/elasticsearch)** | Self‑host / Elastic Cloud | SSPL / AGPLv3 | ✅ RRF + ELSER sparse | ✅ (ELSER) | ✅ Query DSL | ❌ | ✅ DiskBBQ | 4.096 | Bereits im Elastic‑Stack; hybrides Enterprise‑Search |
| **[OpenSearch](https://github.com/opensearch-project/OpenSearch)** | Self‑host / AWS managed | Apache 2.0 | ✅ RRF + Neural Search | ✅ | ✅ Query DSL | ❌ | ✅ FAISS + HNSW | 16.000 | AWS‑native; Open‑Source‑Alternative zu Elastic |
| **[Vespa](https://github.com/vespa-engine/vespa)** | Self‑host / Cloud | Apache 2.0 | ✅ Native | ✅ Tensoren / lexikalisches Ranking | ✅ YQL | ✅ Tensoren | ✅ | Praktisch unbegrenzt | Suche + Ranking + Empfehlungssysteme |
| **[ClickHouse](https://github.com/ClickHouse/ClickHouse)** | Self‑host / Cloud | Apache 2.0 | Manuell | ❌ | ✅ Voll‑SQL | ❌ | ✅ Spaltenbasiert + HNSW | Variabel | Analytik/Logs mit Vektorsuche neben OLAP |
| **[MongoDB Atlas](https://github.com/mongodb/mongo)** | Cloud / self‑host | SSPL | ✅ Eingebaut | ❌ | ✅ MQL + Aggregation | ❌ | ✅ HNSW | 8.192 | Bereits in MongoDB; Dokument + Vektor in einem |
| **[Redis (VSS)](https://github.com/redis/redis)** | Self‑host / Redis Cloud | RSALv2 / SSPL | ✅ (RediSearch) | ✅ | ❌ | ❌ | ❌ Nur RAM | 32.768 | Ultra‑niedrige Latenz; Cache‑Layer Vektorsuche |
| **[Marqo](https://github.com/marqo-ai/marqo)** | Cloud / self‑host | Apache 2.0 | ✅ | ❌ | ❌ | ✅ Native Ausrichtung | ✅ | Variabel | End‑to‑End multimodal: Bild + Text + Video |

### Das Lesen der Matrix

Einige Punkte passen nicht sauber in eine Tabelle:

**Sparse‑Vektoren** ermöglichen BM25‑Qualität bei der Stichwort‑Übereinstimmung innerhalb eines Vektor‑Indexes, ohne eine separate Volltext‑Engine. Qdrant und Elasticsearch bieten hier besonders ausgereifte Implementierungen. Weaviate unterstützt sie über BM25F. Wenn Hybrid‑Search kritisch ist und Sie nicht zwei Systeme betreiben wollen, achten Sie auf Sparse‑Vektor‑Unterstützung.

**Festplatten‑basierte Indizes** sind ein Kosten‑Hebel, kein rein technisches Detail. HNSW‑Indizes im RAM sind schnell, können aber teuer werden, wenn Vektor‑Anzahl, Dimensions‑Anzahl, Metadaten und Graph‑Overhead wachsen. Festplatten‑Alternativen (Milvus DiskANN, Elasticsearch DiskBBQ, Turbopuffer Objektspeicher, LanceDBs Lance‑Format) tauschen Abfrage‑Latenz gegen geringere Infrastruktur‑Kosten. Für große RAG‑Indizes lohnt sich dieser Kompromiss häufig zu testen.

**Turbopuffer's Multi‑Tenancy** ist um sehr hohe Namespace‑Anzahlen herum gebaut. Die öffentliche Positionierung und Kundenberichte betonen Workloads wie Notions großes, namespace‑intensives Korpus. Wenn jeder Nutzer oder jede Organisation isolierte Vektorsuche benötigt, kann diese Architektur die Wirtschaftlichkeit verändern, aber benchmarken Sie trotzdem Ihre eigene Tenant‑Form.

**LanceDB Embedded‑Modus** ist das, was „SQLite für Vektorsuche“ am nächsten kommt. Es läuft im Prozess, benötigt keinen Server und funktioniert in Lambda, Cloudflare Workers und Edge‑Umgebungen. Das spaltenbasierte Lance‑Format macht den Embedded‑Betrieb bei realem Maßstab praktikabel.

**Orama ist Such‑UX‑Infrastruktur, kein Warehouse.** Es ist hervorragend, wenn Sie eine winzige Volltext‑/Vektor‑/Hybrid‑Suchmaschine in einer JavaScript‑App, am Edge oder als verwaltete Site/App‑Suche benötigen. Es ist nicht das Werkzeug, das ich für Milliarden‑Vektor‑Abrufe, schwere Analysen oder komplexe gefilterte Joins wählen würde.

**Vespa ist das, woran Sie denken, wenn Retrieval nur die halbe Produktfunktion ist.** Es kombiniert lexikalisches Retrieval, Nearest‑Neighbor‑Suche, Tensoren, Ranking‑Ausdrücke, Gruppierung und Online‑Serving. Diese Leistungsfähigkeit ist real, ebenso wie die betriebliche und modellierende Komplexität. Es passt besser zu Such‑/Empfehlungsteams als zu „semantische Suche zu meiner CRUD‑App hinzufügen“.

**ClickHouse gehört in die Diskussion, wenn Suche an Analytik gekoppelt ist.** Wenn Ihre Wahrheitquelle Events, Logs, Traces, Metriken oder große Faktentabellen sind, kann ClickHouse Vektor‑Abstände, Filter, Aggregationen und jetzt ernsthafte Volltext‑Indizierung in einer einzigen SQL‑Engine halten. Es ist keine eigens für Vektoren konzipierte Datenbank, aber für analytische Abrufe kann es die langweiligste Antwort auf die bestmögliche Weise sein.

**Chroma ist am stärksten bei Entwicklung/Test und kleinen App‑Deployments.** Wenn Sie sehr große Korpora, HA, festplattenintensive Operationen oder erstklassige Hybrid‑Suche anstreben, evaluieren Sie einen produktionsorientierten Store, bevor Sie den Prototyp in die Infrastruktur hochstufen.

### Die vereinfachte Entscheidung

Wenn Sie PostgreSQL mit pgvector wirklich überfordert haben – typischerweise weil Benchmarks zeigen, dass Vektor‑Anzahl, Filterung, Schreibrate oder Latenz bei hoher Parallelität die Grenzen Ihrer Postgres‑Instanz überschreiten – wählen Sie nach den jeweiligen Einschränkungen:

- **SaaS‑Produkt mit Mandanten‑Isolation** → Turbopuffer  
- **Rust‑Level‑Performance + komplexe Metadaten‑Filterung** → Qdrant  
- **Bereits im Elastic/ELK‑Stack** → Elasticsearch mit DiskBBQ  
- **AWS‑Umgebung, die Open‑Source will** → OpenSearch  
- **Such‑/Empfehlungsplattform mit ernsthaften Ranking‑Ansprüchen** → Vespa  
- **Analytics, Observability oder Log‑/Event‑Suche** → ClickHouse  
- **Milliarden‑Skala on‑prem / Self‑Hosted** → Milvus  
- **Edge / Serverless / Multimodal** → LanceDB  
- **Kleine JS‑App, Dokumentations‑Site oder edge‑native Search‑UX** → Orama  
- **Zero‑Ops, funktioniert einfach, Kosten zweitrangig** → Pinecone  
- **Multimodal‑first (Bilder, Video, Audio)** → Marqo  
- **Bereits auf MongoDB** → Atlas Vector Search  
- **Bereits auf Postgres, benötigen mehr Spielraum** → Supabase Vector oder Neon (beide pgvector‑managed, mit besserem Tooling)

---

## Eine Sache, die Sie nicht tun sollten

Verwenden Sie Vektor‑Suche nicht als unscharfe Textsuche für Fragen, bei denen es eindeutige Antworten gibt.

„Find me the user with email `dan@example.com`“ ist kein Vektor‑Suchproblem. Ebenso wenig „Find me the order with ID `ORD-12345`“. Das Einbetten von `ORD-12345` und das Berechnen der Kosinus‑Ähnlichkeit gegen Ihre Auftrags‑Tabelle liefert *irgendetwas*, das aber falsch sein kann. Das sind exakte Übereinstimmungs‑Probleme. Verwenden Sie hier den Primärschlüssel oder einen normalen Index.

Vektorsuche liefert das *ähnlichste* Element in Ihrem Datensatz, selbst wenn nichts Relevantes vorhanden ist. Sie erkennt nicht, dass es keine passende Antwort gibt. Das ist in Ordnung für verwandte Dokumente, aber katastrophal bei der gezielten Suche nach einem Datensatz, bei der ein falscher Nah‑Treffer schlimmer ist als ein leeres Ergebnis.

Wissen Sie, wofür jedes Werkzeug gedacht ist. Die meisten davon sind bereits in Ihrer PostgreSQL‑Installation enthalten. Setzen Sie sie dort ein, wo sie passen.
````
