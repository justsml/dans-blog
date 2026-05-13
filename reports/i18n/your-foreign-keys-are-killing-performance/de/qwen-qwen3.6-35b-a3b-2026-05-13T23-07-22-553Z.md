# Translation Candidate
- Slug: your-foreign-keys-are-killing-performance
- Locale: de
- Model: qwen/qwen3.6-35b-a3b
- Target: src/content/posts/2025-12-29--your-foreign-keys-are-killing-performance/de/index.mdx
- Validation: deferred
- Runtime seconds: 133.61
- Input tokens: 7696
- Output tokens: 29323
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- Estimated cost: $0.030477
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
title: 'Fremdschlüssel: Hör auf, nach ihrer Geschwindigkeit zu fragen'
subTitle: 'Frage, worauf du eigentlich optimierst.'
date: '2025-12-29'
modified: '2026-01-10'
tags:
  - postgres
  - postgresql
  - databases
  - performance
  - foreign-keys
  - constraints
  - indexing
category: Code
subCategory: Databases
cover_full_width: ../wide.webp
cover_mobile: ../square.webp
cover_icon: ../square.webp
---
Die teuerste Datenbankoptimierung, die ich je gesehen habe, begann damit, dass jemand alle Foreign Keys entfernte.

Nicht, weil sie ein Bottleneck gemessen hätten. Nicht, weil Writes tatsächlich langsam waren. Sondern weil sie irgendwo gelesen hatten, dass „Foreign Keys nicht skalieren." Sechs Monate später hatten sie 2 Milliarden verwaiste Datensätze, ein Abrechnungssystem, das gelöschte Nutzer in Rechnung stellte, und Analysen, die um 40 % danebenlagen.

Als sie versuchten, die Constraints wieder hinzuzufügen? Die Datenbank kam ins Stocken, als sie versuchte, bereits korrupte Bestandsdaten zu validieren.

In der Webentwicklung hält sich hartnäckig die Idee, Foreign Keys seien inhärent langsam, Trainingsräder also, die man entfernt, sobald man zu „echten" Systemen aufsteigt. Aber das verfehlt den eigentlichen Zweck eines Constraints komplett. Man wählt nicht zwischen schnell und langsam. Man wählt zwischen verschiedenen Fehlermodi.

Stellen Sie es sich so vor: Sicherheitsglas, Gurte und Airbags erhöhen alle das Gewicht Ihres Autos. Sie machen Ihr Fahrzeug definitiv langsamer und verbrauchen mehr Kraftstoff. Aber man reißt sie nicht raus, um die 0-60-Zeit zu optimieren, weil man auf etwas völlig anderes optimiert.

Die Frage ist nicht, ob Foreign Keys Sie verlangsamen. Das tun sie natürlich. Die Frage ist, was Sie dafür bekommen und ob Sie das wirklich brauchen.

## Was Sie wirklich eintauschen

Lassen Sie mich ein konkretes Beispiel bringen. Sie bauen ein Wetterüberwachungssystem mit Tabellen für Wetterstationen, Sensorgäte, Sensorwerte und US-Bundesstaaten.

Verknüpfen Sie alles mit Foreign Keys? Überlegen wir, was sich tatsächlich ändert und welche Konsequenzen das hat:

US-Bundesstaaten ändern sich wahrscheinlich nicht. Wyoming wird sich in absehbarer Zeit nicht umbenennen. Sie brauchen keinen Foreign Key, um State-Codes bei jedem INSERT zu validieren, wenn Sie wissen, dass die Referenzdaten statisch sind. Das ist sinnloser Overhead.

Wetterstationen werden hinzugefügt, verlegt und stillgelegt. Doch hier eine Frage: Sollen historische Messwerte ihre Station „verlieren“, wenn jemand versehentlich einen Stationsdatensatz löscht? Vielleicht wollen Sie genau das Gegenteil: dass die Daten auch dann intakt bleiben, wenn die Station nicht mehr existiert. Das bedeutet, Sie behandeln Messwerte als historischen Schnappschuss statt als Live-Referenz. Das ändert grundlegend, ob ein Foreign Key in diesem Fall überhaupt Sinn ergibt.

Sensormesswerte werden tausendfach pro Minute eingefügt. Jeder Foreign-Key-Check bedeutet eine Lookup-Abfrage. Jeder Lookup erzeugt Contention auf Ihren Tabellen. Wenn langsame Validierung dazu führt, dass Ihre Insert-Warteschlange sich staut und Echtzeitdaten verloren gehen, ist das eine völlig andere Form von Datenverlust als ein verwaister Datensatz.

Sie ahnen, wohin die Reise geht. Die Entscheidung dreht sich nicht um abstrakte Konzepte wie Performance versus Korrektheit. Es geht darum, welchen konkreten Ausfall Sie angesichts Ihrer tatsächlichen Constraints und Konsequenzen eher in Kauf nehmen.

Wenn falsche Referenzen korrupte Abrechnungsdaten oder regulatorische Verstöße bedeuten, wollen Sie wahrscheinlich Foreign Keys als Schutz, unabhängig von den Performance-Kosten. Wenn langsame Validierung dazu führt, dass Sie Echtzeit-Sensordaten für immer verlieren, weil Ihre Warteschlange überläuft, ist die Validierung vielleicht der falsche Tradeoff.

## Wenn schnelle Writes tatsächlich zählen

Sie haben sich also entschieden, dass Sie maximale Schreibgeschwindigkeit benötigen. Ihre Warteschlange stapelt sich, Transaktionen timeouten, und Foreign-Key-Checks verursachen tatsächlich messbare Probleme (und nicht nur theoretische).

Sie haben ein paar Optionen. Sie könnten Ihre Transaktions-Isolationsebene von `SERIALIZABLE` auf `READ COMMITTED` ändern, was schneller ist, aber einige Konsistenzgarantien opfert. Sie könnten Commits bündeln und 1000 Zeilen pro Transaktion statt einzeln einfügen, um den FK-Overhead zu amortisieren. Oder Sie denormalisieren in eine Append-Only-Logstruktur, in der Sie Referenzen gar nicht erst validieren.

Diese dritte Option ist übrigens kein Cheat. Es ist einfach ein anderes Design:

```sql
CREATE TABLE sensor_log (
  id BIGSERIAL PRIMARY KEY,
  recorded_at TIMESTAMPTZ NOT NULL,
  data JSONB NOT NULL  -- { station_id, sensor_id, temp, humidity, ... }
);

CREATE INDEX ON sensor_log USING GIN (data);
CREATE INDEX ON sensor_log (recorded_at);
```

Keine Joins. Keine Foreign-Key-Checks. Einfach Daten anhängen und per Zeitbereich oder GIN-Index auf dem JSONB-Blob abfragen. Ist das „Best Practice“? Wahrscheinlich nicht in dem Sinne, wie Datenbank-Lehrbücher es lehren. Funktioniert es, wenn Sie 50.000 Zeilen pro Minute auf einem Raspberry Pi einfügen? Absolut.

Die Kluft entsteht, wenn man „Best Practice“ als moralisches Gebot behandelt, statt es als Muster zu sehen, das in gängigen Szenarien gut funktioniert, aber vielleicht nicht zu Ihrem passt.

## Die Normalisierungs-Falle

Datenbank-Kurse lieben es, Normalisierung beizubringen. Duplikate um jeden Preis vermeiden. Dritte Normalform oder gar nichts.

So landest du am Ende bei so etwas: `Orders` → `OrderItems` → `Products` → `Variants` → `Colors` → `Sizes`

Sechs Table Joins, nur um zu beantworten: „Habe ich letzten Weihnachten das rote oder das blaue Shirt bestellt?“ Und Gott bewahre, du musst den Produktnamen mit einbeziehen, denn der liegt in der Kataloghierarchie nochmal drei Joins entfernt.

Aber Moment. Die Rechtfertigung lautet meist: „Was, wenn die Marke die Bezeichnung für Blau ändert?“ Wenn das passiert, willst du wirklich historische Bestellungen nachträglich die Farbe ändern lassen? Natürlich nicht. Als jemand diese Bestellung aufgab, kaufte er ein „Blaues T-Shirt, Größe M“, so wie es zu diesem Zeitpunkt existierte, nicht als abstrakte Referenz auf einen Katalogeintrag, der später vielleicht aktualisiert wird.

Das ist es wert, genauer betrachtet zu werden, weil es subtil ist. Manche Daten sind fundamental ein Snapshot, keine Referenz. Wenn du Snapshot-Daten wie eine Live-Referenz behandelst, landest du bei dieser absurden Vermehrung von Joins, um etwas zu rekonstruieren, das beim Schreiben eigentlich einfach denormalisiert hätte werden sollen.

Speichere `{"color": "blue", "size": "M"}` direkt in der Bestellung. Fertig.

### Snapshot-Daten erkennen

Wie weißt du, wann etwas ein Snapshot sein sollte? Frage dich, ob es sich um einen Punkt-in-Zeit-Datensatz handelt:

Bestellungen erfassen Produktdetails so, wie sie zum Kaufzeitpunkt existierten. Audit-Logs dokumentieren den Benutzerzustand, als er eine Aktion ausführte. History-Tables bewahren den Datensatzzustand vor einer Aktualisierung. Event-Streams halten fest, was passiert ist, wann, mit welchen Daten.

Wenn die Antwort lautet „Ja, hier wird ein bestimmter Zeitpunkt festgehalten“, hör auf, es zu normalisieren. Starte stattdessen mit Snapshots.

### Undurchsichtige Blobs

Jenseits von Snapshots gibt es eine weitere Kategorie: Daten, die du nie einzeln abfragst. Du speicherst sie einfach und rufst sie im Ganzen ab.

LLM-Modellkonfigurationen wie `{"model": "gpt-4", "temperature": 0.7, "max_tokens": 2000}` sind kein Fall für Abfragen nach der Temperatur. Du lädst die komplette Konfiguration über die Request-ID, sobald du sie brauchst. Decodierte JWT-Payloads, API-Request-/Response-Logs zum Debuggen, Benutzerpräferenz-Objekte mit Theme-Einstellungen und Benachrichtigungsflags. Das sind alles undurchsichtige Blobs. Du brauchst keine Normalisierung. Du brauchst keine Foreign Keys. Pack sie in JSONB und mach weiter.

Der Join über sechs Tabellen, um herauszufinden, welche Farbe das bestellte Shirt hatte? Das ist keine saubere Normalisierung. Das ist verwirrtes Denken darüber, ob du eine Referenz oder einen Wert speicherst.

(Aber Vorsicht: Das kann spektakulär nach hinten losgehen, wenn du diese Daten später abfragen musst. Siehe [Die JSONB-Seduction](../the-jsonb-seduction) für Fälle, in denen dieser Ansatz sein eigenes Albtraum erschafft.)

## Skalierung ist Kontext

Du wirst oft hören: „Foreign Keys skalieren nicht.“ Doch Skalierung ist immer relativ zu deiner Hardware und Architektur.

Ein Raspberry Pi, der 10.000 Sensorlesungen pro Minute auf eine microSD-Karte schreibt? Das ist für diese Hardware tatsächlich hohe Skalierung. AWS Aurora mit provisionierten IOPS, die Milliarden von Zeilen verarbeitet? Da kannst du dich mit Foreign Keys durchkämpfen, ohne ins Schwitzen zu kommen.

Das eigentliche harte Limit betrifft weder die Zeilenanzahl noch das Schreibvolumen. Es ist Sharding.

Wenn deine `Users`-Tabelle auf Server A liegt und deine `Orders`-Tabelle auf Server B, können Foreign Keys physikalisch nicht funktionieren. Die Datenbank verfügt über keinen Mechanismus, um eine Constraint über Netzwerkgrenzen hinweg durchzusetzen. In diesem Moment führst du bereits Hintergrund-Jobs aus, um Orphans zu finden, und implementierst eventual-consistency-Muster.

Das passiert in Multi-Tenant-SaaS, wo jeder Tenant für Compliance seine eigene isolierte Datenbank bekommt, oder in IoT-Deployments, wo du 50.000 Edge-Geräte hast, die jeweils lokal SQLite ausführen. Sobald du dort angelangt bist, sind Foreign Keys vom Tisch (im wörtlichen Sinne), unabhängig von Performance-Überlegungen.

Aber bis du diese architektonische Grenze erreichst, optimiere vielleicht nicht voreilig für Netflix-Probleme, während du ein internes Tool für 10 Benutzer baust.

## Was das in der Praxis tatsächlich bedeutet

Statt zu fragen „Soll ich Foreign Keys verwenden“, versuche, diese drei Dinge zu klären:

Was passiert, wenn diese Referenz falsch ist? Droht eine Klage, korrupte Abrechnungen, regulatorische Verstöße? Oder ist es lediglich ein fehlender Join, der im Analytics-Dashboard null zurückliefert?

Was passiert, wenn die Validierung langsam ist? Verlierst du unersetzliche Echtzeitdaten? Oder verlängern sich deine Queries lediglich um 50 Millisekunden?

Handelt es sich bei diesen Daten um einen Snapshot oder eine Referenz? Hältst du fest, wie etwas zu einem bestimmten Zeitpunkt aussah, oder verweist du auf den autoritativen aktuellen Wert?

Daraus leiten sich die Muster ziemlich natürlich ab:

Finanztransaktionen, Authentifizierungssessions, alles, wo Datenkorruption rechtliche Haftung nach sich zieht, sollte wahrscheinlich auf Foreign Keys setzen – unabhängig vom Performance-Overhead.

Hohe Log-Durchsätze, append-only Time-Series-Daten, alles, wo du pro Minute eine Million Events schreibst, braucht wahrscheinlich keinen Validierungs-Overhead bei jedem Write-Vorgang.

Historische Snapshots wie Bestellungen oder Audit-Logs, Daten, die du stets als kompletten Blob abfragst, etwa Benutzerpräferenzen, sowie Schemas, die du nicht kontrollierst, wie Webhook-Payloads externer APIs… diese lassen sich oft besser denormalisiert abbilden.

Aber achte darauf, dass ich „wahrscheinlich“ und „oft“ gesagt habe. Der Kontext entscheidet, und deiner unterscheidet sich von meinem.

## Fazit

Foreign Keys sind kein Performance-Problem. Sie stellen einen Tradeoff zwischen Schreibgeschwindigkeit und Datenintegrität dar, und ob sich dieser Tradeoff für dich lohnt, hängt ausschließlich von deinen konkreten Engpässen und den konkreten Konsequenzen ab.

Das eigentliche Problem entsteht, wenn Entwickler Foreign Keys entfernen, nur weil sie irgendwo über „Web Scale“ gelesen haben – ohne tatsächlich zu messen, ob ein Write-Performance-Engpass vorliegt, oder ohne abzuwägen, was sie dabei opfern. Am Ende betreibst du Cargo-Culting mit der Netflix-Architektur auf einem Greenfield-Projekt, das 100 Transaktionen am Tag abwickelt.

Vielleicht rechtfertigt der Performance-Overhead den Einsatz in deinem Use Case. Vielleicht nicht. Aber triff diese Entscheidung zumindest auf Basis dessen, was du tatsächlich optimieren willst, und nicht auf Basis dessen, was du denkst, optimieren zu müssen.

Worauf optimierst du?

## Ressourcen

- [Dokumentation zu PostgreSQL Foreign-Key-Constraints](https://www.postgresql.org/docs/current/ddl-constraints.html#DDL-CONSTRAINTS-FK)
- [PostgreSQL-Performance-Tipps](https://www.postgresql.org/docs/current/performance-tips.html)
- [Use The Index, Luke! – Fremdschlüssel](https://use-the-index-luke.com/sql/clustering/data-clustering)
- [Datenbanknormalisierung vs. Denormalisierung](https://www.postgresql.org/docs/current/tutorial-concepts.html)
````
