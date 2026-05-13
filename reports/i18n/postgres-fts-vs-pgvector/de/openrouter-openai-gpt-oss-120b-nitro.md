# Translation Candidate
- Slug: postgres-fts-vs-pgvector
- Locale: de
- Model: openrouter/openai/gpt-oss-120b:nitro
- Target: src/content/posts/2026-05-08--postgres-fts-vs-pgvector/de/index.mdx
- Validation: rejected: direct AI SDK translation failed
- Runtime seconds: 26.55
- Input tokens: 34022
- Output tokens: 8565
- Thinking tokens: unknown
- Cached input tokens: 9984
- Cache write tokens: 0
- Estimated cost: $0.002869
- Pricing source: local-openrouter-estimate
- Note: Command failed: bun run i18n:validate --slug postgres-fts-vs-pgvector --locale de
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
Teams, die KI‑Funktionen hinzufügen, greifen häufig zuerst zu einer dedizierten Vektordatenbank.

Pinecone, Weaviate, Qdrant, Chroma. Neuer Service, neue Abhängigkeit, neuer Connection‑Pool, neue Rechnung und jetzt zwei Wahrheitsquellen, die konsistent gehalten werden müssen.

Unterdessen haben sie bereits PostgreSQL. PostgreSQL verfügt bereits über `pgvector`. Außerdem gibt es seit 2008 eine ausgezeichnete Volltextsuche, die integriert ist.

Dedizierte Vektorspeicher rechtfertigen sich erst bei großem Umfang und hohem Abfragevolumen. In den meisten Anwendungen wird jedoch das zweite Suchsystem gewählt, bevor das erste wirklich an seine Grenzen gestoßen ist. So verwandelt sich ein zukünftiges Skalierungsproblem in ein heutiges Synchronisations‑Bug.

Kurz gesagt: Wann nutzt man die Volltextsuche, wann pgvector und wann beide zusammen?

## Was jedes Tool tatsächlich leistet

Volltextsuche (`tsvector` / `GIN`‑Index) ist lexical. Sie zerlegt Text in Lexeme, stemmt sie und vergleicht Anfragen mit dem Index. „Running“ und „runs“ kollabieren zum selben Lexem. Gleiches gilt für „dog“ und „dogs“. Die Ranking‑Funktion (`ts_rank`) belohnt Dokumente, in denen die Abfragebegriffe häufig oder prominent vorkommen.

`pgvector` ist semantisch. Es speichert einen dichten Vektor — eine Zahlenliste — die die *Bedeutung* eines Textabschnitts gemäß einem Einbettungsmodell repräsentiert. Ähnlichkeitssuche findet nahegelegene Vektoren in diesem hochdimensionalen Raum. „Dog“ und „canine“ liegen nahe beieinander. „Running“ im sportlichen Sinne und „running“ als Prozess können dagegen weit auseinander liegen.

Der praktische Unterschied: FTS beantwortet „Welche Dokumente enthalten diese Wörter?“, während die Vektorsuche beantwortet „Welche Dokumente bedeuten ungefähr das hier?“

![Eine Karte der Suchwerkzeuge, die pg_trgm für kurze unscharfe Zeichenketten, Full‑Text‑Search für exakte Fließtext‑Abfragen, pgvector für semantisches Matching und hybride Suche für lange Inhalte, die sowohl exakte als auch semantische Signale benötigen, zeigt.](../search-tool-map.svg)

_Die erste Unterscheidung ist nicht „alte Suche vs. KI‑Suche“. Es geht um die Form des Textes und welche Art von Antwort korrekt wäre._

---

## Wenn Full‑Text‑Search gewinnt

**Sie suchen nach Begriffen, die exakt zählen.** Produkt‑SKUs, Fehlercodes, Modellnummern, Benutzernamen, Verweis­stellen in Rechtsklauseln. `SKU-AX-44192` ist zu keinem anderen semantisch ähnlich. Es stimmt entweder überein oder nicht. Eine Vektor‑Suche könnte selbstbewusst `SKU-AX-44193` zurückliefern. Das ist nicht das gewünschte Ergebnis.

**Ihre Abfragen sind schlüsselwortbasiert.** Benutzer tippen in ein Suchfeld, filtern nach Tag oder durchsuchen Blog‑Beiträge nach Stichwort. FTS wurde für diese Art von Intent entwickelt.

**Sie benötigen gerankte Ergebnisse ohne GPU‑ oder Embedding‑Infrastruktur.** FTS‑Indizes sind schnell, deterministisch und benötigen keine externen API‑Aufrufe. Fügen Sie eine `tsvector`‑Spalte hinzu, bauen Sie einen GIN‑Index, und fertig.

**Sie führen neben der Suche boolesche Filterungen durch.** `WHERE to_tsvector(body) @@ to_tsquery('postgres') AND category = 'tutorial' AND published_at > NOW() - INTERVAL '6 months'` — dies lässt sich natürlich in Ihre bestehende Abfragelogik einbinden.

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

Die `GENERATED ALWAYS AS`‑Spalte hält den Index automatisch aktuell. Mit `setweight` erhalten Treffer im Titel ein höheres Gewicht als Treffer im Textkörper. Das ist die komplette Konfiguration.

---

## Wenn Trigramme gewinnen (pg_trgm)

Es gibt ein drittes PostgreSQL‑Werkzeug, das oft übersehen wird: `pg_trgm`. Es ist weder Volltextsuche noch Vektorsuche. Es handelt sich um unscharfe String‑Vergleiche und deckt die unbequeme Mitte ab, die beide anderen Werkzeuge nur schlecht bedienen.

**Anwendungsfall: Namen, Adressen, Kennungen und kurze Zeichenketten mit Tippfehlern.**

FTS zerlegt Text in Lexeme und stemmt sie. Das funktioniert für Fließtext, ist aber für folgende Fälle ungeeignet:
- Personennamen („Dan Levy“ → gestemmt zu „dan levi“, „leiv“, je nach Sprachkonfiguration)
- Firmennamen, Adressen, Produkttitel, bei denen die exakte Schreibweise entscheidend ist
- Abfragen mit Tippfehlern — „Micheal Jordan“, „Amaon“, „javascipt“
- Autovervollständigung / Präfixsuche
- Teilstring‑Abgleich („son“ findet „Johnson“, „Anderson“)

pgvector ist hier ebenfalls eine schlechte Wahl. Man kann „Micheal Jordan“ einbetten und den nächsten Vektor finden, aber der Einbettungsraum ordnet Namen nach Bedeutung, nicht nach Schreibweise. Der nächste Nachbar könnte „basketball legend“ oder „Michael B. Jordan“ sein, nicht der Benutzerdatensatz mit dem Tippfehler.

`pg_trgm` zerlegt Zeichenketten in überlappende 3‑Zeichen‑Slices und misst, wie viele Trigramme zwei Zeichenketten gemeinsam haben. „Dan“ → `" da"`, `"dan"`, `"an "`. „Micheal“ und „Michael“ teilen die meisten ihrer Trigramme, sodass die Ähnlichkeit hoch ist.

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

Der `%`‑Operator verwendet `pg_trgm.similarity_threshold` (Standard 0.3, Bereich 0‑1). Höhere Werte verlangen engere Übereinstimmungen. Für die Namenssuche liegt 0.3‑0.4 in der Regel im richtigen Bereich: permissiv genug, um Tippfehler zu erfassen, streng genug, um Rauschen zu vermeiden.

**Trigramme unterstützen auch die Präfixsuche und Autovervollständigung, besonders wenn dabei Tippfehler‑Toleranz oder enthaltene Übereinstimmungen nötig sind:**

```sql
-- Autocomplete: Präfix‑Matching. Für reine links‑verankerte Präfixe,
-- vergleiche das Trigram‑GIN mit einem B‑Tree‑Pattern‑Index auf deinen Daten.
SELECT name FROM users
WHERE name ILIKE $1 || '%'
ORDER BY name
LIMIT 10;

-- Mehr Kontrolle: word_similarity für Teilübereinstimmungen innerhalb längerer Zeichenketten
-- (nützlich, wenn nach „Johnson“ in „Andrew Johnson III“ gesucht wird)
SELECT id, name, word_similarity($1, name) AS score
FROM users
WHERE $1 <% name          -- <%‑Operator = word_similarity‑Schwelle
ORDER BY score DESC
LIMIT 10;
```

**Wann `pg_trgm` statt FTS verwendet werden sollte:**

| Szenario | Verwendung |
|---|---|
| Personen‑/Firmennamensuche mit Tippfehlern | `pg_trgm` |
| Autovervollständigung / Präfixsuche | `pg_trgm` (oder FTS mit Präfix‑Abfragen) |
| Suche nach kurzen Zeichenketten, Codes, Identifiern | `pg_trgm` |
| Suche in Fließtexten, Dokumentation | FTS |
| Suche in Log‑Nachrichten nach Schlüsselwörtern | FTS |
| Mehrsprachige Namenssuche | `pg_trgm` (sprachunabhängig) |

`pg_trgm` lässt sich ebenfalls mit FTS kombinieren. Verwenden Sie Trigramme als unscharfen Vorfilter und bewerten Sie mit `ts_rank`, oder kombinieren Sie die Trigram‑Ähnlichkeit mit einem Vektor‑Score.

---

## Wenn pgvector die Oberhand gewinnt

**Sie bauen RAG.** RAG beruht auf semantischer Retrieval: Finden Sie Dokument‑*Chunks*, deren Bedeutung der Frage des Benutzers am nächsten kommt, selbst wenn die Formulierung abweicht. Die Vektorsuche ist dafür gezielt gebaut. FTS verpasst Paraphrasen, Synonyme und konzeptuelle Übereinstimmungen.

**Benutzer beschreiben, was sie wollen, nicht, wonach sie suchen sollen.** „Etwas Leichtes für einen Sommerabend“ enthält keine offensichtlichen Wein‑Keywords. „Artikel darüber, Selbstvertrauen als neuer Manager aufzubauen“ erfordert semantisches Verständnis, das FTS nicht liefern kann.

**Sie suchen nach ähnlichen Elementen.** Verwandte Produkte, ähnliche Support‑Tickets, doppelte Bug‑Reports. „Zeig mir Issues, die diesem ähnlich sind“ ist eine Vektor‑Operation. Sie betten das neue Issue ein und finden seine nächsten Nachbarn.

**Mehrsprachiger Inhalt.** Vektor‑Einbettungen, die auf mehrsprachigen Daten trainiert wurden, können über Sprachgrenzen hinweg matchen. FTS benötigt sprachspezifische Konfigurationen und bewältigt abteilungsübergreifende Abfragen nur schlecht.

## Wenn Sie beides benötigen

Technische Dokumentation ist dort, wo die einfache Aufteilung versagt. Nutzer suchen nach „how to configure timeouts“, aber sie suchen auch nach Funktionsnamen wie `withRetry()` und Fehlercodes wie `ECONNRESET`.

Die Vektorsuche bearbeitet konzeptuelle Anfragen. Die Volltextsuche bearbeitet exakte Begriffe. Keine der beiden löst beide Fälle allein zufriedenstellend.

Die Lösung ist hybride Suche: beide Verfahren ausführen und die Ergebnisse zusammenführen.

**Reciprocal Rank Fusion (RRF)** ist dafür der gängige Algorithmus. Er verlangt keine Normalisierung der Scores beider Systeme; er kombiniert die Rangpositionen.

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

Die `60` im Nenner ist die RRF‑Konstante — höhere Werte verringern den Einfluss von Rangunterschieden, niedrigere Werte verstärken ihn. Der Standardwert 60 funktioniert in den meisten Fällen gut.

Dies führt zwei Suchen in einer Abfrage aus, kombiniert die Ranglisten und belohnt Ergebnisse, bei denen Schlüsselwort‑ und semantische Signale übereinstimmen.

![Ein hybrider Such‑Pipeline, bei der eine Abfrage sowohl die Volltextsuche als auch pgvector ansteuert, jede erzeugt eine sortierte Ergebnisliste, und Reciprocal Rank Fusion kombiniert die beiden Listen.](../hybrid-rrf-pipeline.svg)

_RRF ist nützlich, weil es vermeidet, `ts_rank` und den Kosinus‑Abstand als direkt vergleichbare Rohwerte zu behandeln. Es fragt lediglich: „Wie hoch erschien dieses Ergebnis in jeder Liste?“_

---

## Der praktische Entscheidungsbaum

Beim Auswählen einer Suchstrategie beginnt man mit der **Form des Eingabetextes** und fragt anschließend **welche Art von Abfrage der Nutzer stellt**. „Kurze Zeichenkette mit Rechtschreibvariationen“ ist ein anderes Problem als „langer Fließtext, bei dem exakte Begriffe wichtig sind“, und beide unterscheiden sich von „Fragen zu Dokument‑Abschnitten“.

![Ein Entscheidungsbaum, der basierend auf der Form des Textes und der Art, wie Nutzer abfragen, zwischen pg_trgm, Volltextsuche, pgvector, hybrider Suche oder einer dedizierten Vektordatenbank wählt.](../search-decision-tree.svg)

Der gleiche Baum in Worten:

- **Namen, Adressen, Titel, Autovervollständigung oder fehleranfällige kurze Zeichenketten** → `pg_trgm`
- **Bekannte Wörter, Fehlercodes, SKUs, Funktionsnamen, Tags, Kategorien, Filter** → FTS
- **Fragen, Paraphrasen, Empfehlungen, verwandte Artikel, mehrsprachige Übereinstimmungen, RAG‑Chunks** → pgvector
- **Technischer Inhalt, bei dem Nutzer sowohl exakte Symbole als auch konzeptuelle Antworten benötigen** → Hybrid mit RRF
- **Primärschlüssel, exakte IDs, Berechtigungsfilter, Datumsbereiche, sortierte Listen** → normale SQL‑Indizes
- **Enormes Vektor‑Volumen, sehr hohe Parallelität oder Latenzziele, die PostgreSQL in Ihren Benchmarks nicht erreichen kann** → dedizierte Vektorspeicher evaluieren

### FTS vs. Semantic: Die Kurzfassung

Die Frage „Soll ich FTS oder Vektorsuche verwenden?“ reduziert sich meist auf Folgendes: **kennen Sie die Wörter, die in den relevanten Dokumenten vorkommen werden?**

Falls ja – Nutzer suchen nach bekannten Begriffen, Kategorien, Funktionsnamen, Produktcodes – ist FTS schneller, günstiger und vorhersehbarer. Es zeigt Ihnen, warum ein Ergebnis übereinstimmt.

Wenn nein – Nutzer beschreiben ein Konzept, stellen eine Frage oder suchen in einer anderen Sprache – ist die Vektorsuche das richtige Werkzeug. Sie gleicht Bedeutungen ab, nicht einzelne Wörter.

Der knifflige Mittelteil sind natürlichsprachliche Abfragen über technische Inhalte. Jemand, der nach „how do I handle connection drops“ sucht, könnte einen Artikel mit dem Titel „implementing retry logic for network failures“ benötigen – keine überlappenden Wörter, aber hohe semantische Relevanz. Genau hier rechtfertigt die Vektorsuche ihren Einsatz.

Ein weiterer schwieriger Fall sind **Namen und Eigennamen**. Weder FTS noch Vektorsuche sind dafür besonders geeignet:
- FTS verpasst „Micheal“, wenn nach „Michael“ gesucht wird – unterschiedliche Tokens
- Vektorsuche verpasst den Namen komplett, wenn er nicht häufig im Trainingsdatensatz vorkommt
- `pg_trgm` löst das korrekt: orthografische Ähnlichkeit, nicht semantisch oder lexikalisch

In der Praxis benötigen die meisten inhaltsintensiven Suchfelder FTS für Geschwindigkeit und Stichwörter und ggf. ein hybrides Vorgehen oder `pg_trgm`, je nachdem, ob Nutzer nach Namen suchen. Ein echtes semantisches Suchfeature bedeutet in der Regel pgvector. RAG bedeutet immer pgvector.

---

## Wenn Sie einen dedizierten Vektor‑Store benötigen

Einige Systeme wachsen tatsächlich über die Grenzen von pgvector hinaus. Wenn das eintritt, ist der Markt laut. Entscheidend sind dabei die folgenden Punkte bei den führenden Optionen.

### Die Funktionsmatrix

Einige Spalten müssen erklärt werden, bevor die Tabelle Sinn ergibt.

**Hybrid‑Suche** bedeutet, dass BM25‑Keyword‑Suche und Vektor‑Ähnlichkeit in einer Abfrage laufen und über Reciprocal Rank Fusion zusammengeführt werden. „withRetry timeout“ kann den Funktionsnamen exakt *und* Dokumente über „Retry‑Logik für Netzwerkfehler“ semantisch treffen. Ohne Hybrid wählt man einen Suchmodus oder fusioniert zwei Abfragen selbst. pgvector’s „Manual (RRF via SQL)“ ist [der oben gezeigte Ansatz](#when-you-need-both): er funktioniert, aber man muss ihn selbst implementieren.

**Sparse Vectors** gehen über BM25 hinaus. Ein SPLADE‑Sparse‑Vektor hat ~30 000 Dimensionen (eine pro Vokabular‑Begriff), ~98 % Nullen. Die Nicht‑Null‑Positionen zeigen, welche Begriffe wichtig sind und wie stark. Eine Abfrage nach „dogs“ gewichtet zudem „canine“ und „pet“: BM25‑artige Keyword‑Präzision plus Term‑Erweiterung innerhalb eines Vektor‑Indexes. Wenn diese Spalte falsch ist, benötigt man eine externe FTS‑Schicht für exakte Begriff‑Abfragen.

```python
# SPLADE: ~30,000 dims total, ~60 non-zero — only the relevant vocabulary positions fire
def encode_splade(text: str) -> dict:
    tokens = tokenizer(text, return_tensors="pt", truncation=True, max_length=512)
    with torch.no_grad():
        output = model(**tokens)
    vec = torch.log1p(torch.relu(output.logits)).max(dim=1).values.squeeze()
    return {"indices": vec.nonzero().squeeze().tolist(), "values": vec[vec != 0].tolist()}
```

**SQL / SQL‑ähnlich** dreht sich eigentlich um Filterung. Vektorsuche ohne Filterung ist eine Demo, keine Anwendung: man braucht immer noch Mandanten‑Scope, Datumsbereiche, Berechtigungen und Kategorien. Voll‑SQL (pgvector) drückt das neben den bestehenden Joins aus. Zweck‑gebaute Datenbanken verwenden JSON‑Filterobjekte (Qdrant, Pinecone), eine Query‑DSL (Elasticsearch, Milvus) oder GraphQL (Weaviate). Sie funktionieren; SQL wird attraktiver, je verworrener die Filterlogik wird.

```sql
-- pgvector: Vektor‑Ähnlichkeit ist nur ein weiterer Ausdruck in WHERE
SELECT id, title, 1 - (embedding <=> $1) AS score
FROM documents
WHERE tenant_id = $2 AND category = ANY($3::text[]) AND created_at > NOW() - INTERVAL '90 days'
ORDER BY embedding <=> $1 LIMIT 10;
```

```python
# Qdrant: äquivalenter Filter als Python‑Objekt — funktional, mehr Aufwand
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

**Multimodal native** bedeutet nicht „kann Bild‑Embeddings speichern“; jede Datenbank kann Float‑Arrays ablegen. Es bedeutet, dass die Datenbank Embedding‑Modelle für Nicht‑Text‑Inhalte mitliefert, sodass Sie ihr eine rohe Bild‑URL übergeben und sie die Vektorisierung übernimmt. Die meisten hier vorgestellten Datenbanken sind embedding‑agnostisch, d. h. Sie übernehmen die Pipeline selbst. Marqo und Weaviate (via CLIP/ImageBind‑Module) schließen den Kreis.

```python
# Marqo: POST rohe Bilder, Abfrage mit Text — kein externer Embedding‑Schritt nötig
mq.index("products").add_documents(
    [{"id": "shoe-001", "image": "https://cdn.example.com/shoes/001.jpg"}],
    tensor_fields=["image"]
)
results = mq.index("products").search(q="lightweight shoes for summer")
# Liefert shoe-001 trotz keinerlei Keyword‑Überschneidung — CLIP erledigt das cross‑modale Matching
```

**Disk‑basierter Index** ist eine Kostenfrage. RAM‑residentes HNSW kann mehrere GB RAM pro Million 1536‑dimensionaler Vektoren benötigen, wenn rohe Vektoren, Graph‑Overhead und Metadaten mitgerechnet werden. Disk‑native Alternativen (Milvus DiskANN, Elasticsearch DiskBBQ, LanceDB‑Lance‑Format, Turbopuffer‑Object‑Storage‑Tier) tauschen häufig etwas Abfrage‑Latenz gegen günstigere Infrastruktur. Bei RAG‑Workloads, bei denen die Modell‑Latenz bereits dominiert, lohnt sich das oft zu benchmarken. Redis VSS ist die harte Grenze: ausschließlich RAM, kein Disk‑Pfad.

**Maximale Dimensionen** verbergen die Migration von morgen in der heutigen Wahl. `text-embedding-3-large` verwendet 3072 Dimensionen, Jina v3 kann größere Embeddings erzeugen, und Forschungs‑Modelle treiben die Größe weiter nach oben. Einige Managed Services veröffentlichen feste Dimension‑Limits; andere geben hohe oder praktisch keine Obergrenzen für typische Embedding‑Modelle an. Prüfen Sie die aktuellen Dokumente, bevor Sie sich festlegen. Wählen Sie etwas mit Spielraum; einen Vektor‑Index zu migrieren, weil Sie eine Dimensions‑Obergrenze erreicht haben, ist ein mühsamer Sprint.

_Stand: Letzte Überprüfung anhand öffentlicher Projektdokumentation und Produktseiten am 8. Mai 2026. Betrachten Sie die Matrix als Momentaufnahme: Grenzen von Managed Services, Preisgestaltung, Hybrid‑Search‑Funktionen und Festplatten‑Index‑Optionen ändern sich schnell._

| Datenbank | Bereitstellung | Lizenz | Hybrid‑Suche | Sparse‑Vektoren | SQL / SQL‑ähnlich | Multimodal | Festplatten‑Index | Max‑Dimensionen | Sweet Spot |
|---|---|---|---|---|---|---|---|---|---|
| **[pgvector](https://github.com/pgvector/pgvector)** | Self‑host / managed (Supabase, Neon, RDS) | OSS (PostgreSQL) | Manuell (RRF via SQL) | ❌ | ✅ Voll‑SQL | ❌ | ✅ HNSW on disk | 16 000 Speicher; 2 000 indizierte `vector` | Bereits in Postgres; moderate Vektor‑Anzahlen |
| **[Qdrant](https://github.com/qdrant/qdrant)** | Self‑host / Cloud | Apache 2.0 | ✅ Native BM25 | ✅ Reife Unterstützung | ❌ (REST/gRPC) | ❌ | ✅ | 65 535 | Gefilterte Abfragen in großem Maßstab; komplexe Metadaten |
| **[Weaviate](https://github.com/weaviate/weaviate)** | Self‑host / Cloud | BSD 3 | ✅ Native BM25 + RRF | ✅ | ❌ (GraphQL / gRPC) | ✅ via Module | ✅ | 65 535 | GraphQL‑Zugriffsmuster; integrierte Vektorisierung |
| **[Pinecone](https://www.pinecone.io/)** | Nur Cloud | Proprietär | ✅ (2024 hinzugefügt) | ✅ | ❌ | ❌ | ✅ (serverless) | 20 000 | Verwaltete Einfachheit; kein Ops‑Team nötig |
| **[Milvus](https://github.com/milvus-io/milvus) / [Zilliz](https://zilliz.com/)** | Self‑host / Cloud (Zilliz) | Apache 2.0 | ✅ Native | ✅ | ✅ SQL‑ähnlich (Milvus Query Language) | ✅ | ✅ DiskANN | 32 768 | Milliard‑Skala; Enterprise‑On‑Prem |
| **[Chroma](https://github.com/chroma-core/chroma)** | Embedded / self‑host | Apache 2.0 | ❌ | ❌ | ❌ | ❌ | ❌ | 65 535 | Lokale Entwicklung und Prototyping only |
| **[LanceDB](https://github.com/lancedb/lancedb)** | Embedded / Cloud | Apache 2.0 | ✅ | ❌ | ✅ SQL via DataFusion | ✅ Native | ✅ (Lance‑Format) | Unbegrenzt | Edge / serverless; multimodaler Lakehouse |
| **[Orama](https://github.com/oramasearch/orama)** | Embedded / Cloud | Apache 2.0 | ✅ Volltext + Vektor | ❌ | ❌ | ❌ | ❌ | Variabel | JS/Edge‑Apps; leichte Site/App‑Suche |
| **[Turbopuffer](https://turbopuffer.com/)** | Nur Cloud (serverless) | Proprietär | ✅ BM25 + Vektor | ❌ | ❌ | ❌ | ✅ (Object Storage) | 16 000 | Multi‑Tenant SaaS; Millionen Namespaces |
| **[Elasticsearch](https://github.com/elastic/elasticsearch)** | Self‑host / Elastic Cloud | SSPL / AGPLv3 | ✅ RRF + ELSER sparse | ✅ (ELSER) | ✅ Query DSL | ❌ | ✅ DiskBBQ | 4 096 | Bereits im Elastic‑Stack; hybride Enterprise‑Suche |
| **[OpenSearch](https://github.com/opensearch-project/OpenSearch)** | Self‑host / AWS managed | Apache 2.0 | ✅ RRF + Neural Search | ✅ | ✅ Query DSL | ❌ | ✅ FAISS + HNSW | 16 000 | AWS‑native; Open‑Source‑Alternative zu Elastic |
| **[Vespa](https://github.com/vespa-engine/vespa)** | Self‑host / Cloud | Apache 2.0 | ✅ Native | ✅ Tensoren / lexikalisches Ranking | ✅ YQL | ✅ Tensoren | ✅ | Praktisch unbegrenzt | Suche + Ranking + Empfehlungssysteme |
| **[ClickHouse](https://github.com/ClickHouse/ClickHouse)** | Self‑host / Cloud | Apache 2.0 | Manuell | ❌ | ✅ Voll‑SQL | ❌ | ✅ Spaltenbasiert + HNSW | Variabel | Analytics/Logs mit Vektorsuche neben OLAP |
| **[MongoDB Atlas](https://github.com/mongodb/mongo)** | Cloud / self‑host | SSPL | ✅ Eingebaut | ❌ | ✅ MQL + Aggregation | ❌ | ✅ HNSW | 8 192 | Bereits in MongoDB; Dokument + Vektor in einem |
| **[Redis (VSS)](https://github.com/redis/redis)** | Self‑host / Redis Cloud | RSALv2 / SSPL | ✅ (RediSearch) | ✅ | ❌ | ❌ | ❌ Nur RAM | 32 768 | Ultra‑niedrige Latenz; Cache‑Layer Vektorsuche |
| **[Marqo](https://github.com/marqo-ai/marqo)** | Cloud / self‑host | Apache 2.0 | ✅ | ❌ | ❌ | ✅ Native Ausrichtung | ✅ | Variabel | End‑to‑End multimodal: Bild + Text + Video |

### Die Matrix lesen

Einige Punkte passen nicht sauber in eine Tabelle:

**Sparse Vectors** ermöglichen BM25‑Qualität bei Stichwort‑Abgleichen innerhalb eines Vektor‑Indexes, ohne dass ein separates Volltext‑System nötig ist. Qdrant und Elasticsearch bieten hier besonders ausgereifte Implementierungen. Weaviate unterstützt sie über BM25F. Wenn hybride Suche entscheidend ist und Sie nicht zwei Systeme betreiben können, achten Sie auf Unterstützung für Sparse Vectors.

**Disk‑basierte Indexe** sind ein Kostenhebel, kein Implementierungsdetail. Im RAM residentierte HNSW‑Indexe sind schnell, können aber teuer werden, wenn Vektor‑Anzahl, Dimensions‑Anzahl, Metadaten und Graph‑Overhead wachsen. Disk‑basierte Alternativen (Milvus DiskANN, Elasticsearch DiskBBQ, Turbopuffer Object Storage, LanceDBs Lance‑Format) tauschen Abfrage‑Latenz gegen geringere Infrastruktur‑Kosten. Für große RAG‑Indexe lohnt sich dieser Kompromiss häufig zu testen.

**Turbopuffer's Multi‑Tenancy** ist um extrem hohe Namespace‑Anzahlen herum gebaut. In der öffentlichen Positionierung und in Kunden‑Stories wird betont, dass Workloads wie Notions großes, namespace‑intensives Korpus unterstützt werden. Wenn jeder Nutzer oder jede Organisation isolierte Vektorsuche benötigt, kann diese Architektur die Wirtschaftlichkeit verändern – benchmarken Sie jedoch trotzdem Ihre eigene Tenant‑Struktur.

**LanceDB Embedded‑Modus** ist das, was „SQLite für Vektorsuche“ am nächsten kommt. Es läuft im Prozess, benötigt keinen Server und funktioniert in Lambda, Cloudflare Workers und Edge‑Umgebungen. Das spaltenbasierte Lance‑Format macht den Embedded‑Betrieb bei realen Skalierungen praktikabel.

**Orama ist UX‑Suchinfrastruktur, kein Data‑Warehouse.** Es eignet sich hervorragend, wenn Sie eine kleine Volltext‑/Vektor‑/Hybrid‑Suchmaschine in einer JavaScript‑App, am Edge oder als verwaltete Site/App‑Suche benötigen. Für die Retrieval‑Ausführung von Milliarden Vektoren, schwere Analysen oder komplexe, gefilterte Joins wäre es jedoch nicht meine Wahl.

**Vespa ist das, wozu Sie greifen, wenn die Retrieval‑Komponente nur die halbe Lösung ist.** Es vereint lexikalische Suche, Nearest‑Neighbor‑Suche, Tensoren, Ranking‑Ausdrücke, Gruppierung und Online‑Serving. Diese Leistungsfähigkeit ist real, ebenso wie die betriebliche und modelltechnische Komplexität. Es passt besser zu Such‑/Empfehlungsteams als zu „semantische Suche zu meiner CRUD‑App hinzufügen“.

**ClickHouse kommt ins Spiel, wenn die Suche an Analytik geknüpft ist.** Wenn Ihre Wahrheitsquelle Events, Logs, Traces, Metriken oder große Faktentabellen sind, kann ClickHouse Vektor‑Abstände, Filter, Aggregationen und jetzt ernsthafte Volltext‑Indizierung in einer einzigen SQL‑Engine halten. Es ist keine eigens für Vektoren konzipierte Datenbank, aber für analytisches Retrieval kann es die langweilige, aber in bester Weise passende Antwort sein.

**Chroma ist am stärksten bei Entwicklung/Test und kleinen App‑Deployments.** Wenn Sie sehr große Korpora, Hochverfügbarkeit, speicherintensive Operationen oder erstklassige hybride Suche anstreben, sollten Sie vor der Promotion des Prototyps in die Infrastruktur einen produktionsorientierten Store evaluieren.

### Die vereinfachte Entscheidung

Wenn Sie PostgreSQL mit pgvector wirklich überholt haben – typischerweise weil Benchmarks zeigen, dass die Vektor‑Anzahl, Filterungen, Schreibrate oder die Latenz bei hoher Parallelität die Grenzen Ihrer Postgres‑Instanz überschreiten – wählen Sie nach den jeweiligen Einschränkungen:

- **SaaS‑Produkt mit Mandanten‑Isolation** → Turbopuffer  
- **Rust‑Level‑Performance + komplexe Metadaten‑Filterung** → Qdrant  
- **Bereits im Elastic/ELK‑Stack** → Elasticsearch mit DiskBBQ  
- **AWS‑Umgebung, die Open‑Source will** → OpenSearch  
- **Such‑/Empfehlungsplattform mit ernsthaften Ranking‑Ansprüchen** → Vespa  
- **Analytics, Observability oder Log‑/Event‑Suche** → ClickHouse  
- **Milliarden‑Skala on‑prem / self‑hosted** → Milvus  
- **Edge / serverless / multimodal** → LanceDB  
- **Kleine JS‑App, Dokumentations‑Site oder edge‑native Such‑UX** → Orama  
- **Zero‑Ops, einfach funktionsfähig, Kosten zweitrangig** → Pinecone  
- **Multimodal‑first (Bilder, Video, Audio)** → Marqo  
- **Bereits auf MongoDB** → Atlas Vector Search  
- **Bereits auf Postgres, mehr Spielraum nötig** → Supabase Vector oder Neon (beide pgvector‑verwaltet, mit besserem Tooling)

---

## Eine Sache, die Sie nicht tun sollten

Verwenden Sie die Vektorsuche nicht als unscharfe Textsuche für Fälle, bei denen es eindeutige Antworten gibt.

„Find me the user with email `dan@example.com`“ ist kein Vektor‑Suchproblem. Ebenso wenig „Find me the order with ID `ORD-12345`“. Das Einbetten von `ORD-12345` und das Berechnen der Kosinus‑Ähnlichkeit gegen Ihre Auftrags‑Tabelle liefert *irgendetwas*, aber es kann falsch sein. Das sind exakte Übereinstimmungs‑Probleme. Verwenden Sie hier den Primärschlüssel oder einen normalen Index.

Die Vektorsuche liefert das *ähnlichste* Element in Ihrem Datensatz, selbst wenn nichts Relevantes vorhanden ist. Sie „weiß“ nicht, dass es keine passende Antwort gibt. Das ist für verwandte Dokumente akzeptabel, aber katastrophal bei der gezielten Suche nach einem Datensatz, bei der ein falscher Nah‑Treffer schlimmer ist als ein leeres Ergebnis.

Kennen Sie den Zweck jedes Werkzeugs. Die meisten sind bereits in Ihrer PostgreSQL‑Installation enthalten. Setzen Sie sie dort ein, wo sie passen.
````
