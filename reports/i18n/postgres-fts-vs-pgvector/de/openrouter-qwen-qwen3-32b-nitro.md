# Translation Candidate
- Slug: postgres-fts-vs-pgvector
- Locale: de
- Model: openrouter/qwen/qwen3-32b:nitro
- Target: src/content/posts/2026-05-08--postgres-fts-vs-pgvector/de/index.mdx
- Validation: passed
- Runtime seconds: 45.47
- Input tokens: 18254
- Output tokens: 20786
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- Estimated cost: $0.006449
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
title: 'Postgres Suche: FTS, Trigramme und pgvector'
subTitle: ''
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
Teams, die AI-Funktionen hinzufügen, greifen oft zuerst auf eine dedizierte Vektor-Datenbank zurück.  

Pinecone, Weaviate, Qdrant, Chroma. Neuer Dienst, neue Abhängigkeit, neuer Connection-Pool, neue Rechnung und jetzt zwei Quellen der Wahrheit, die konsistent gehalten werden müssen.  

In der Zwischenzeit haben sie bereits PostgreSQL. PostgreSQL hat bereits `pgvector`. Es hat seit 2008 auch eine ausgezeichnete Volltextsuche eingebaut.  

Dedizierte Vektor-Speicher beweisen ihren Nutzen bei großer Skalierung und hohem Abfragenvolumen. Aber die meisten Anwendungen greifen zum zweiten Suchsystem, bevor das erste überhaupt stark beansprucht wurde. So wird ein zukünftiges Skalierungsproblem zu einem heutigen Synchronisationsfehler.  

Also: Wann verwendet man FTS, wann `pgvector` und wann beides?

## Was jede Technik tatsächlich macht  

Volltextsuche (`tsvector` / `GIN`-Index) ist lexikalisch. Sie unterteilt Text in Lexeme, reduziert sie auf Stammformen und vergleicht Abfragen mit dem Index. „Running“ und „runs“ werden zum gleichen Lexem zusammengefasst. Ebenso „dog“ und „dogs“. Die Relevanzberechnung (`ts_rank`) belohnt Dokumente, in denen Suchbegriffe häufig oder prominent vorkommen.  

`pgvector` ist semantisch. Er speichert einen dichten Vektor – eine Liste von Zahlen –, der die *Bedeutung* eines Textabschnitts nach Auffassung eines Embedding-Modells darstellt. Die Ähnlichkeitssuche findet nahe beieinanderliegende Vektoren in diesem hochdimensionalen Raum. „Dog“ und „canine“ landen nah beieinander. „Running“ als Sportart und „running“ als Prozessausführung möglicherweise nicht.  

Der praktische Unterschied: Volltextsuche beantwortet „Welche Dokumente enthalten diese Wörter?“. Vektor-Suche beantwortet „Welche Dokumente meinen ungefähr dieses Thema?“.  

![Eine Suchwerkzeug-Karte, die `pg_trgm` für kurze unscharfe Zeichenketten, Volltextsuche für exakte Textabfragen, `pgvector` für semantische Übereinstimmungen und hybride Suche für langen Inhalt, der sowohl exakte als auch semantische Signale benötigt, zeigt.](../search-tool-map.svg)  

_Die erste Aufteilung ist nicht „alter Suchalgorithmus vs. AI-Suche“. Es geht um die Textform und welche Art von Antwort korrekt ist._

## Wenn Volltextsuche gewinnt

**Sie suchen nach Begriffen, die exakt übereinstimmen müssen.** Produkt-SKUs, Fehlercodes, Modellnummern, Benutzernamen, Verweis auf Rechtsvorschriften. `SKU-AX-44192` ist semantisch nicht ähnlich zu irgendetwas. Es stimmt entweder überein oder nicht. Vektor-Suche gibt möglicherweise sicherheitshalber `SKU-AX-44193` zurück. Das ist nicht, was Sie wollen.

**Ihre Abfragen sind wortbasiert.** Nutzer tippen in ein Suchfeld, filtern nach Tag oder suchen Blogbeiträge nach Schlüsselwort. FTS wurde für diese Art von Suchintention entwickelt.

**Sie benötigen sortierte Ergebnisse ohne GPU oder Embedding-Infrastruktur.** FTS-Indizes sind schnell, deterministisch und benötigen keine externen API-Aufrufe. Fügen Sie eine `tsvector`-Spalte hinzu, erstellen Sie einen GIN-Index, und Sie sind fertig.

**Sie führen boolesche Filterung neben der Suche durch.** `WHERE to_tsvector(body) @@ to_tsquery('postgres') AND category = 'tutorial' AND published_at > NOW() - INTERVAL '6 months'` – das setzt sich natürlicherweise mit Ihrer bestehenden Abfrage-Logik zusammen.

```sql
-- Erstellen Sie den Index
ALTER TABLE posts ADD COLUMN search_vector tsvector
  GENERATED ALWAYS AS (
    setweight(to_tsvector('english', coalesce(title, '')), 'A') ||
    setweight(to_tsvector('english', coalesce(body, '')), 'B')
  ) STORED;

CREATE INDEX posts_search_idx ON posts USING GIN (search_vector);

-- Abfrage
SELECT title, ts_rank(search_vector, query) AS rank
FROM posts, to_tsquery('english', 'postgres & performance') query
WHERE search_vector @@ query
ORDER BY rank DESC
LIMIT 10;
```

Die `GENERATED ALWAYS AS`-Spalte aktualisiert den Index automatisch. Die `setweight`-Funktion gibt Treffern in Titeln eine höhere Relevanz als Treffern im Textkörper. Das ist die komplette Einrichtung.

---

## Wenn Trigramme gewinnen (pg_trgm)

Es gibt ein drittes Postgres-Tool, das oft übersehen wird: `pg_trgm`. Es ist weder Volltextsuche noch Vektorsuche. Es handelt sich um Fuzzy-String-Matching und deckt den unbeholfenen Zwischenbereich ab, den beide Tools schlecht bewältigen.

**Use Case: Namen, Adressen, Identifikatoren und kurze Zeichenketten mit Tippfehlern.**

FTS tokenisiert Text in Lexeme und stemmt sie. Das funktioniert für Prosa, ist aber ungeeignet für:
- Personennamen ("Dan Levy" → gestemmt zu "dan levi", "leiv", abhängig von der Sprachkonfiguration)
- Firmennamen, Adressen, Produkttitel, bei denen die genaue Rechtschreibung entscheidend ist
- Abfragen mit Tippfehlern – "Micheal Jordan", "Amaon", "javascipt"
- Autocomplete-/Präfixsuche
- Teilzeichenketten-Matching ("son" passt zu "Johnson", "Anderson")

pgvector ist hier ebenfalls eine schlechte Wahl. Sie können „Micheal Jordan“ einbetten und den nächsten Vektor finden, doch der Einbettungsraum ordnet Namen nach Bedeutung, nicht nach Schreibweise. Der nächste Nachbar könnte „basketball legend“ oder „Michael B. Jordan“ sein, nicht der Benutzer mit der Rechtschreibfehler.

`pg_trgm` zerlegt Zeichenketten in überlappende 3-Zeichen-Schnitte und misst, wie viele Trigramme zwei Strings gemeinsam haben. „Dan“ → „ da“, „dan“, „an “. „Micheal“ und „Michael“ teilen sich die meisten ihrer Trigramme, weshalb die Ähnlichkeit hoch ist.

```sql
-- Erweitere die Erweiterung (meist bereits vorhanden)
CREATE EXTENSION IF NOT EXISTS pg_trgm;

-- GIN-Index für die Spalte names – ermöglicht schnelle Trigramm-Ähnlichkeitssuche
CREATE INDEX users_name_trgm_idx ON users USING GIN (name gin_trgm_ops);

-- Fuzzy-Namen-Suche: Findet „Micheal Jordan“, wenn „Michael Jordan“ gesucht wird
SELECT id, name, similarity(name, $1) AS score
FROM users
WHERE name % $1          -- % Operator = Ähnlichkeitsschwellenwert (Standard 0,3)
ORDER BY score DESC
LIMIT 10;

-- Oder ILIKE mit Trigramm-Index für Enthält-Suche nutzen
SELECT id, name
FROM users
WHERE name ILIKE '%johnson%'   -- GIN-Index macht dies schnell
LIMIT 10;
```

Der `%`-Operator nutzt `pg_trgm.similarity_threshold` (Standard 0,3, Bereich 0–1). Höhere Werte erfordern engere Übereinstimmungen. Für Namen-Suche ist 0,3–0,4 meist passend: ausreichend großzügig, um Rechtschreibfehler aufzufangen, aber streng genug, um Rauschen zu vermeiden.

**Trigramme helfen auch bei Präfixsuche und Autocomplete, besonders wenn Autocomplete Rechtschreibfehler tolerieren oder Enthält-Suche benötigt:**

```sql
-- Autocomplete: Präfix-Matching. Für reine links-angefügte Präfixe
-- vergleiche Trigramm-GIN mit einem B-Tree-Musterindex deiner Daten.
SELECT name FROM users
WHERE name ILIKE $1 || '%'
ORDER BY name
LIMIT 10;

-- Mehr Kontrolle: word_similarity für Teilzeichenketten-Matching innerhalb längerer Strings
-- (nützlich, wenn „Johnson“ in „Andrew Johnson III“ gesucht wird)
SELECT id, name, word_similarity($1, name) AS score
FROM users
WHERE $1 <% name          -- <% Operator = word_similarity-Schwellenwert
ORDER BY score DESC
LIMIT 10;
```

**Wann `pg_trgm` statt FTS nutzen:**

| Szenario | Verwenden |
|---|---|
| Suche nach Personen-/Firmennamen mit Tippfehlern | `pg_trgm` |
| Autocomplete / Präfixsuche | `pg_trgm` (oder FTS mit Präfix-Abfragen) |
| Suche nach kurzen Zeichenketten, Codes, Identifiern | `pg_trgm` |
| Suche nach Prosa-Artikeln, Dokumentation | FTS |
| Suche nach Schlüsselwörtern in Log-Meldungen | FTS |
| Multilinguale Namen-Suche | `pg_trgm` (sprachunabhängig) |

`pg_trgm` lässt sich auch mit FTS kombinieren. Nutzen Sie Trigramme für eine unscharfe Vorfilterung und Rangierung mit `ts_rank`, oder kombinieren Sie Trigramm-Ähnlichkeit mit einem Vektor-Score.  

---

## Wenn pgvector gewinnt  

**Sie bauen RAG auf.** RAG basiert auf semantischem Retrieval: Finden Sie Dokument-*Abschnitte*, deren Bedeutung der des Benutzerfragens am nächsten kommt, auch wenn die Formulierung abweicht. Vektor-Suche ist dafür explizit konzipiert. FTS verpasst Paraphrasen, Synonyme und konzeptionelle Übereinstimmungen.  

**Benutzer beschreiben, was sie wollen, nicht wonach sie suchen.** „Etwas Leichtes für einen Sommerabend“ enthält keine offensichtlichen Wein-Schlüsselwörter. „Artikel über Selbstvertrauen aufbauen als neuer Manager“ erfordert eine semantische Verständnisfähigkeit, die FTS nicht bietet.  

**Sie finden ähnliche Elemente.** Verwandte Produkte, ähnliche Support-Tickets, doppelte Fehlerberichte. „Finden Sie mir Probleme, die diesem ähneln“ ist eine Vektoroperation. Sie kodieren das neue Problem und suchen nach seinen nächsten Nachbarn.

**Mehrsprachige Inhalte.** Vektor-Embeddings, die auf mehrsprachigen Daten trainiert wurden, können über Sprachen hinweg übereinstimmen. FTS erfordert sprachspezifische Konfigurationen und verarbeitet über-sprachliche Abfragen schlecht.

```sql
-- Einrichtung
CREATE EXTENSION IF NOT EXISTS vector;

ALTER TABLE documents ADD COLUMN embedding vector(1536);
CREATE INDEX documents_embedding_idx
  ON documents USING ivfflat (embedding vector_cosine_ops)
  WITH (lists = 100);

-- Abfrage: semantische Suche
SELECT id, title, 1 - (embedding <=> $1::vector) AS similarity
FROM documents
ORDER BY embedding <=> $1::vector
LIMIT 10;
```

Hinweis: `ivfflat` ist näherungsweise — es ist schnell, opfert aber etwas Recall für Geschwindigkeit. Für kleinere Datensätze (unter ~1 Mio. Zeilen) ist `hnsw` oft besser:

```sql
CREATE INDEX documents_embedding_idx
  ON documents USING hnsw (embedding vector_cosine_ops);
```

---

## Wenn Sie beides benötigen

Technische Dokumentation ist der Bereich, in dem die einfache Aufteilung versagt. Nutzer suchen nach „how to configure timeouts“, suchen aber auch nach Funktionsnamen wie `withRetry()` und Fehlercodes wie `ECONNRESET`.

Vektor-Suche verarbeitet konzeptionelle Abfragen. FTS verarbeitet genaue Begriffe. Keine der beiden allein verarbeitet beides gut.

Die Lösung ist eine hybride Suche: Beide Suchmethoden ausführen und die Ergebnisse zusammenführen.

**Reciprocal Rank Fusion (RRF)** ist der Standard-Algorithmus hier. Es erfordert nicht, dass Sie die Scores aus beiden Systemen normalisieren; es kombiniert die Rangpositionen.

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

Die `60` im Nenner ist die RRF-Konstante — höhere Werte verringern die Einflusskraft von Rangunterschieden, niedrigere Werte verstärken sie. Der Standardwert von 60 funktioniert in den meisten Fällen gut.

Dies führt zwei Suchvorgänge in einer Abfrage aus, kombiniert die Ränge und favorisiert Ergebnisse, bei denen Schlüsselwörter und semantische Signale übereinstimmen.

![Ein hybrider Suchpipeline, bei der eine Abfrage sich auf Full-Text-Suche und pgvector aufteilt, beide jeweils sortierte Ergebnisse liefern und Reciprocal Rank Fusion die beiden Listen kombiniert.](../hybrid-rrf-pipeline.svg)

_RRF ist wertvoll, weil es vermeidet, `ts_rank` und Kosinus-Abstand als vergleichbare Rohwerte darzustellen. Es fragt nur: „Wie hoch erschien dieses Ergebnis in jeder Liste?“_

## Der praktische Entscheidungsbaum  

Bei der Wahl einer Suchstrategie beginnt man mit der **Form der Eingabe**, gefolgt von der Frage **welcher Art die Benutzerabfrage ist**. „Kurze Zeichenketten mit Rechtschreibvarianten“ ist ein anderes Problem als „lange Texte, bei denen exakte Begriffe wichtig sind“, und beides unterscheidet sich von „Fragen zu Dokumentenabschnitten“.  

![Ein Entscheidungsbaum, der je nach Textform und Abfragetyp der Benutzer `pg_trgm`, Volltextsuche, `pgvector`, hybride Suche oder dedizierte Vektor-Datenbanken auswählt.](../search-decision-tree.svg)  

Der gleiche Baum in Worten:  

- **Namen, Adressen, Titel, Autocomplete oder fehleranfällige kurze Zeichenketten** → `pg_trgm`  
- **Bekannte Wörter, Fehlercodes, SKUs, Funktionsnamen, Tags, Kategorien, Filter** → FTS  
- **Fragen, Paraphrasen, Empfehlungen, ähnliche Artikel, multilinguale Übereinstimmungen, RAG-Abschnitte** → `pgvector`  
- **Technischer Inhalt, bei dem Benutzer sowohl exakte Symbole als auch konzeptionelle Antworten benötigen** → Hybrid mit RRF  
- **Primärschlüssel, exakte IDs, Berechtigungsfilter, Datumsbereiche, sortierte Listen** → normale SQL-Indizes  
- **Sehr große Vektormengen, hohe Konkurrenz oder Latenzziele, die Postgres in Ihren Benchmarks nicht erreicht** → bewerten Sie dedizierte Vektor-Datenbanken

### FTS vs. Semantische Suche: Die Kurzfassung

Die Frage „Sollte ich FTS oder Vektorsuche verwenden?“ reduziert sich normalerweise auf diese: **Wissen Sie, welche Wörter in den relevanten Dokumenten vorkommen?**

Wenn ja – Benutzer suchen nach bekannten Begriffen, Kategorien, Funktionsnamen, Produktcodes – FTS ist schneller, günstiger und vorhersagbarer. Es erklärt Ihnen, warum ein Ergebnis übereinstimmt.

Wenn nein – Benutzer beschreiben ein Konzept, stellen eine Frage oder suchen in einer anderen Sprache – Vektorsuche ist das richtige Werkzeug. Sie passt Bedeutung an, nicht Wörter.

Die knifflige Mitte sind natürlichsprachliche Abfragen über technischen Inhalt. Jemand, der nach „how do I handle connection drops“ sucht, benötigt möglicherweise einen Artikel mit dem Titel „Implementierung von Wiederholungslogik für Netzwerkfehler“ – keine übereinstimmenden Wörter, hohe semantische Relevanz. Das ist der Bereich, in dem Vektorsuche sich lohnt.

Der andere knifflige Fall sind **Namen und Eigennamen**. Weder FTS noch Vektorsuche sind hier besonders gut:  
- FTS wird „Micheal“ verpassen, wenn nach „Michael“ gesucht wird – verschiedene Token  
- Vektorsuche wird den Namen komplett verpassen, wenn er nicht häufig in den Trainingsdaten vorkommt  
- `pg_trgm` löst das korrekt: orthografische Ähnlichkeit, nicht semantisch oder lexikalisch

In der Praxis benötigen die meisten inhaltsschweren Suchfelder FTS für Geschwindigkeit und Schlüsselwörter und benötigen möglicherweise hybrid oder `pg_trgm`, abhängig davon, ob Benutzer nach Namen suchen. Eine echte semantische Suchfunktion bedeutet in der Regel pgvector. RAG bedeutet immer pgvector.  

---

## Wenn Sie doch eine dedizierte Vektor-Datenbank benötigen  

Einige Systeme wachsen tatsächlich über pgvector hinaus. Wenn das der Fall ist, ist der Markt überfüllt. Hier ist das Wichtige bei den führenden Optionen.  

### Die Funktionsmatrix  

Einige Spalten müssen erläutert werden, bevor die Tabelle Sinn macht.

**Hybriden Suchen** bedeutet, dass BM25-Schlüsselwortsuche und Vektorsimilarität in einer Abfrage ausgeführt werden, zusammengeführt über Reciprocal Rank Fusion. „withRetry timeout“ kann den Funktionsnamen exakt *und* Dokumente zu „retry logic for network failures“ semantisch abdecken. Ohne Hybrid-Suche wählt man einen Suchmodus aus oder fusioniert zwei Abfragen selbst. pgvectors „Manuell (RRF über SQL)“ ist [der oben gezeigte Ansatz](#wenn-sie-doch-beides-brauchen): Es funktioniert, aber Sie schreiben es selbst.

**Sparvektoren** gehen über BM25 hinaus. Ein SPLADE-Sparvektor hat ~30.000 Dimensionen (eine pro Vokabularbegriff), ~98 % Nullen. Die Nicht-Null-Positionen zeigen an, welche Begriffe relevant sind und wie stark. Eine Abfrage für „dogs“ gewichtet auch „canine“ und „pet“: BM25-Präzision für Schlüsselwörter plus Begriffserweiterung innerhalb eines Vektorindex. Wenn diese Spalte falsch ist, brauchen Sie eine externe FTS-Schicht für exakte Begriffsanfragen.

```python
# SPLADE: ~30.000 Dimensionen insgesamt, ~60 Nicht-Null-Werte – nur relevante Vokabularpositionen aktivieren
def encode_splade(text: str) -> dict:
    tokens = tokenizer(text, return_tensors="pt", truncation=True, max_length=512)
    with torch.no_grad():
        output = model(**tokens)
    vec = torch.log1p(torch.relu(output.logits)).max(dim=1).values.squeeze()
    return {"indices": vec.nonzero().squeeze().tolist(), "values": vec[vec != 0].tolist()}
```

**SQL / SQL-ähnlich** bezieht sich wirklich auf Filterung. Vektorsuche ohne Filterung ist ein Demo, keine Anwendung: Sie brauchen immer noch Mandantenbereich, Datumsbereiche, Berechtigungen und Kategorien. Vollständiges SQL (pgvector) drückt das neben Ihren bestehenden Joins aus. Spezialisierte Datenbanken nutzen JSON-Filterobjekte (Qdrant, Pinecone), eine Abfragesprache (Elasticsearch, Milvus) oder GraphQL (Weaviate). Sie funktionieren; SQL wird attraktiver, je komplexer die Filterlogik wird.

```sql
-- pgvector: Vektorsimilarität ist einfach ein weiterer Ausdruck in WHERE
SELECT id, title, 1 - (embedding <=> $1) AS score
FROM documents
WHERE tenant_id = $2 AND category = ANY($3::text[]) AND created_at > NOW() - INTERVAL '90 days'
ORDER BY embedding <=> $1 LIMIT 10;
```

```python
# Qdrant: Äquivalenter Filter als Python-Objekt – funktioniert, mehr Zeremonie
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

**Multimodal native** bedeutet nicht „kann Bildvektoren speichern“; jede Datenbank speichert Float-Arrays. Es bedeutet, dass die Datenbank Embedding-Modelle für nicht-textuelle Inhalte mitliefert, also geben Sie eine Rohbild-URL und sie kümmert sich um die Vektorisierung. Die meisten Datenbanken hier sind embedding-agnostisch, also übernehmen Sie diesen Pipeline-Teil. Marqo und Weaviate (über CLIP/ImageBind-Module) schließen die Schleife.

```python
# Marqo: POST Rohbilder, Abfragen mit Text – kein externer Embedding-Schritt notwendig
mq.index("products").add_documents(
    [{"id": "shoe-001", "image": "https://cdn.example.com/shoes/001.jpg"}],
    tensor_fields=["image"]
)
results = mq.index("products").search(q="lightweight shoes for summer")
# Gibt shoe-001 zurück, obwohl keine Schlüsselwortüberlappung – CLIP übernimmt die Cross-Modalität
```

**Index auf Festplatte** ist eine Kostenfrage. RAM-residentes HNSW kann mehrere GB RAM pro Million 1536-Dimensional-Vektoren beanspruchen, sobald Rohvektoren, Graph-Overhead und Metadaten gezählt werden. Festplatten-native Alternativen (Milvus DiskANN, Elasticsearch DiskBBQ, LanceDBs Lance-Format, Turbopuffers Object-Storage-Tier) tauschen oft etwas Abfrage-Latenz gegen günstigere Infrastruktur ein. Für RAG-Arbeitsbelastungen, bei denen die Modellanfrage-Latenz ohnehin dominiert, lohnt sich das Benchmarken oft. Redis VSS ist die harte Einschränkung: Nur RAM, kein Festplattenpfad.

**Maximale Dimensionen** ist eine Migration von morgen, versteckt in der heutigen Wahl. `text-embedding-3-large` nutzt 3072 Dimensionen, Jina v3 kann größere Embeddings erzeugen, und Forschungsmodelle drücken immer weiter nach oben. Einige Managed-Services veröffentlichen harte Dimensionen-Obergrenzen; andere dokumentieren hohe Grenzen oder keine praktischen Grenzen für typische Embedding-Modelle. Überprüfen Sie aktuelle Dokumentation vor der Verpflichtung. Wählen Sie etwas mit Spielraum; eine Vektorindex-Migration, weil Sie die Dimensionsobergrenze erreicht haben, ist ein miserabler Sprint.

Letztes Verifizierungsdatum anhand öffentlicher Projekt-Dokumentation und Produktseiten: 8. Mai 2026. Behandeln Sie die Matrix als Momentaufnahme: Begrenzungen bei Managed-Services, Preismodelle, Hybrid-Suchfunktionen und Festplatten-Index-Optionen ändern sich schnell.

| Datenbank | Bereitstellung | Lizenz | Hybrid-Suche | Sparse Vektoren | SQL / SQL-ähnlich | Multimodal | Festplatten-Index | Max. Dims | Sweet Spot |
|---|---|---|---|---|---|---|---|---|---|
| **[pgvector](https://github.com/pgvector/pgvector)** | Eigenhosting / managed (Supabase, Neon, RDS) | OSS (PostgreSQL) | Manuell (RRF über SQL) | ❌ | ✅ Vollständiges SQL | ❌ | ✅ HNSW auf Festplatte | 16.000 Speicher; 2.000 indizierte `vector` | Bereits auf Postgres; moderate Vektoranzahl |
| **[Qdrant](https://github.com/qdrant/qdrant)** | Eigenhosting / Cloud | Apache 2.0 | ✅ Native BM25 | ✅ Reife Unterstützung | ❌ (REST/gRPC) | ❌ | ✅ | 65.535 | Skalierbare gefilterte Abfragen; komplexe Metadaten |
| **[Weaviate](https://github.com/weaviate/weaviate)** | Eigenhosting / Cloud | BSD 3 | ✅ Native BM25 + RRF | ✅ | ❌ (GraphQL / gRPC) | ✅ über Module | ✅ | 65.535 | GraphQL-Zugriffsweisen; eingebaute Vektorisierung |
| **[Pinecone](https://www.pinecone.io/)** | Nur Cloud | Proprietär | ✅ (hinzugefügt 2024) | ✅ | ❌ | ❌ | ✅ (serverlos) | 20.000 | Managed-Einfachheit; keine Ops-Abteilung |
| **[Milvus](https://github.com/milvus-io/milvus) / [Zilliz](https://zilliz.com/)** | Eigenhosting / Cloud (Zilliz) | Apache 2.0 | ✅ Native | ✅ | ✅ SQL-ähnlich (Milvus Query Language) | ✅ | ✅ DiskANN | 32.768 | Milliarden-Skala; Enterprise On-Premise |
| **[Chroma](https://github.com/chroma-core/chroma)** | Embedded / Eigenhosting | Apache 2.0 | ❌ | ❌ | ❌ | ❌ | ❌ | 65.535 | Nur lokale Entwicklung und Prototypen |
| **[LanceDB](https://github.com/lancedb/lancedb)** | Embedded / Cloud | Apache 2.0 | ✅ | ❌ | ✅ SQL über DataFusion | ✅ Native | ✅ (Lance-Format) | Unbegrenzt | Edge / serverlos; multimodales Lakehouse |
| **[Orama](https://github.com/oramasearch/orama)** | Embedded / Cloud | Apache 2.0 | ✅ Volltext + Vektor | ❌ | ❌ | ❌ | ❌ | Varies | JS/Edge-Apps; leichtgewichtige Site/App-Suche |
| **[Turbopuffer](https://turbopuffer.com/)** | Nur Cloud (serverlos) | Proprietär | ✅ BM25 + Vektor | ❌ | ❌ | ❌ | ✅ (Objekt-Speicher) | 16.000 | Multi-Tenant SaaS; Millionen von Namespaces |
| **[Elasticsearch](https://github.com/elastic/elasticsearch)** | Eigenhosting / Elastic Cloud | SSPL / AGPLv3 | ✅ RRF + ELSER sparse | ✅ (ELSER) | ✅ Query DSL | ❌ | ✅ DiskBBQ | 4.096 | Bereits auf Elastic Stack; Hybrid-Enterprise-Suche |
| **[OpenSearch](https://github.com/opensearch-project/OpenSearch)** | Eigenhosting / AWS managed | Apache 2.0 | ✅ RRF + Neural Search | ✅ | ✅ Query DSL | ❌ | ✅ FAISS + HNSW | 16.000 | AWS-native; Open-Source-Alternative zu Elastic |
| **[Vespa](https://github.com/vespa-engine/vespa)** | Eigenhosting / Cloud | Apache 2.0 | ✅ Native | ✅ Tensoren / lexikalisches Ranking | ✅ YQL | ✅ Tensoren | ✅ | Effektiv unbegrenzt | Suche + Ranking + Empfehlungssysteme |
| **[ClickHouse](https://github.com/ClickHouse/ClickHouse)** | Eigenhosting / Cloud | Apache 2.0 | Manuell | ❌ | ✅ Vollständiges SQL | ❌ | ✅ Spaltenorientiert + HNSW | Varies | Analytics/Protokolle mit Vektor-Suche neben OLAP |
| **[MongoDB Atlas](https://github.com/mongodb/mongo)** | Cloud / Eigenhosting | SSPL | ✅ Eingebaut | ❌ | ✅ MQL + Aggregation | ❌ | ✅ HNSW | 8.192 | Bereits auf MongoDB; Dokument + Vektor in einem |
| **[Redis (VSS)](https://github.com/redis/redis)** | Eigenhosting / Redis Cloud | RSALv2 / SSPL | ✅ (RediSearch) | ✅ | ❌ | ❌ | ❌ RAM-only | 32.768 | Ultra-niedrige Latenz; Cache-Schicht-Vektor-Suche |
| **[Marqo](https://github.com/marqo-ai/marqo)** | Cloud / Eigenhosting | Apache 2.0 | ✅ | ❌ | ❌ | ✅ Native Fokus | ✅ | Varies | End-to-End-Multimodal: Bild + Text + Video |

### Matrix interpretieren

Einige Aspekte passen nicht sauber in eine Tabelle:

**Sparse Vektoren** ermöglichen BM25-qualitatives Schlüsselwortmatching innerhalb eines Vektor-Index, ohne einen separaten Volltext-Engine zu benötigen. Qdrant und Elasticsearch haben besonders reife Implementierungen hier. Weaviate unterstützt sie über BM25F. Wenn Hybrid-Suche kritisch ist und Sie zwei Systeme nicht betreiben können, achten Sie auf Unterstützung für sparse Vektoren.

**Indexe auf Festplatten** sind ein Kostenhebel, nicht nur ein Implementierungsdetail. RAM-residente HNSW-Indexe sind schnell, können aber teuer werden, wenn Vektoranzahl, Dimensionenanzahl, Metadaten und Graph-Overhead anwachsen. Alternativen auf Festplatten (Milvus DiskANN, Elasticsearch DiskBBQ, Turbopuffer Objekt-Speicher, LanceDBs Lance-Format) tauschen Abfrage-Latenz gegen geringere Infrastrukturkosten ein. Für große RAG-Indexe lohnt sich dieser Tradeoff oft.

**Turbopuffers Multi-Tenancy** ist auf sehr hohe Namensraumanzahlen ausgelegt. Seine öffentliche Positionierung und Kundenbeispiele betonen Workloads wie Notions großes, namensraumlastiges Korpus. Wenn jede Benutzer- oder Organisationseinheit eine isolierte Vektorsuche benötigt, kann diese Architektur die Wirtschaftlichkeit verändern, aber benchmarken Sie dennoch Ihre eigene Tenant-Form.

**LanceDB eingebetteter Modus** ist das, was "SQLite für Vektorsuche" am nächsten kommt. Es läuft im Prozess, erfordert keinen Server und funktioniert in Lambda, Cloudflare Workers und Edge-Umgebungen. Das Lance-Columnar-Format macht eingebettete Operationen in realer Skalierung praktikabel.

**Orama ist Such-UX-Infrastruktur, kein Data Warehouse.** Es ist hervorragend geeignet, wenn man eine kleine Volltext-/Vektor-/Hybrid-Suchmaschine in einer JavaScript-Anwendung, am Edge oder als verwaltete Site/App-Suchschicht benötigt. Es ist nicht das Tool, das ich für die Abfrage von Milliarden-Vektoren, schwere Analysen oder komplexe gefilterte Joins auswählen würde.

**Vespa ist das Tool, das man verwendet, wenn die Abfrage nur die Hälfte des Produkts ist.** Es kombiniert lexikalische Retrieval, nearest-neighbor-Suche, Tensoren, Rangfolgeausdrücke, Gruppierung und Online-Server. Diese Leistung ist real, aber auch die Betriebs- und Modellierungskomplexität ist es. Es eignet sich besser für Such-/Empfehlungsteams als für "semantische Suche in meiner CRUD-App hinzufügen".

**ClickHouse gehört ins Gespräch, wenn Suchfunktionen mit Analysen verbunden sind.** Wenn Ihre Quelle die Ereignisse, Protokolle, Spuren, Metriken oder großen Fakten-Tabellen sind, kann ClickHouse Vektordistanz, Filterung, Aggregation und jetzt auch ernsthafte Volltext-Indexierung in einem SQL-Engine bewältigen. Es ist kein spezifisch entwickeltes Vektordatenbank-System, aber für analytische Retrieval-Aufgaben kann es die langweilige Antwort auf die beste Weise sein.

**Chroma ist stärksten bei Dev/Test und kleinen App-Einsätzen.** Wenn Sie sehr große Korpora, HA, disklastige Operationen oder erste Klasse Hybrid-Suche anstreben, bewerten Sie vor der Promotion des Prototypen in die Infrastruktur eine produktionsorientierte Speicherung.

### Die vereinfachte Entscheidung

Wenn Sie pgvector tatsächlich überwachsen haben – üblicherweise, weil Benchmarks zeigen, dass die Vektorenanzahl, Filterung, Schreibrate oder Latenz bei hoher Konkurrenz Postgres-Grenzen überschreiten – entscheiden Sie sich nach Einschränkungen:

- **SaaS-Produkt mit pro-Tenant-Isolation** → Turbopuffer  
- **Rust-Niveau-Leistung + komplexe Metadaten-Filterung benötigt** → Qdrant  
- **Bereits auf Elastic/ELK-Stack** → Elasticsearch mit DiskBBQ  
- **AWS-Unternehmen, das Open-Source will** → OpenSearch  
- **Suche/Rekomendations-Plattform mit ernsthaften Rangierungsanforderungen** → Vespa  
- **Analytik, Observabilität oder Log/Event-Suche** → ClickHouse  
- **Milliarde-Skalierung on-prem / self-hosted** → Milvus  
- **Edge / serverlos / multimodal** → LanceDB  
- **Kleine JS-App, Dokumentationswebsite oder edge-native Such-UX** → Orama  
- **Null-Operationen, einfach funktioniert, Kosten sind sekundär** → Pinecone  
- **Multimodal-first (Bilder, Video, Audio)** → Marqo  
- **Bereits auf MongoDB** → Atlas Vector Search  
- **Bereits auf Postgres, benötigt mehr Leistung** → Supabase Vector oder Neon (beide pgvector-gestützt, mit besserer Tooling-Unterstützung)  

---

## Eine Sache, die man nicht tun sollte

Verwenden Sie Vektorsuche nicht als unscharfe Textsuche für Dinge, bei denen es richtige Antworten gibt.

„Finden Sie den Benutzer mit der E-Mail-Adresse `dan@example.com`“ ist kein Vektorsucheproblem. Ebenso wenig ist „Finden Sie die Bestellung mit der ID `ORD-12345`“. Das Einbetten von `ORD-12345` und das Durchführen einer Kosinus-Ähnlichkeit mit Ihrer Bestelltabelle wird *etwas* zurückgeben, aber es könnte falsch sein. Das sind exakte Übereinstimmungsprobleme. Verwenden Sie Ihren Primärschlüssel oder einen regulären Index.  

Vektorsuche gibt das *Ähnlichste* in Ihrem Datensatz zurück, selbst wenn nichts relevant ist. Sie weiß nicht, dass es keine gute Antwort gibt. Das ist in Ordnung für verwandte Dokumente. Bei der Suche nach spezifischen Datensätzen ist es katastrophal, wenn ein falsches, fast passendes Ergebnis besser ist als ein leeres Resultat.  

Wissen Sie, wofür jedes Tool gedacht ist. Die meisten davon sind bereits in Ihre Postgres-Installation integriert. Verwenden Sie sie dort, wo sie passen.
````
