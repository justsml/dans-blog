# Translation Candidate
- Slug: the-jsonb-seduction
- Locale: de
- Model: openrouter/qwen/qwen3-32b:nitro
- Target: src/content/posts/2025-12-29--the-jsonb-seduction/de/index.mdx
- Validation: passed
- Runtime seconds: 23.57
- Input tokens: 9188
- Output tokens: 9628
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- Estimated cost: $0.003046
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
title: 'JSONB: Der beste Weg, um Ihre Datenbank zu ruinieren'
subTitle: ''
date: '2025-12-29'
modified: '2025-12-30'
tags:
  - postgres
  - postgresql
  - databases
  - jsonb
  - json
  - schema-design
  - technical-debt
category: Code
subCategory: Databases
social_image: ../desktop-social.webp
cover_full_width: ../wide.webp
cover_mobile: ../square.webp
cover_icon: ../square.webp
---
PostgreSQL fügte JSONB hinzu, um semi-strukturierte Daten zu speichern, ohne vorab starre Schemas definieren zu müssen. Die Idee war sinnvoll: Manchmal weiß man einfach nicht, wie die Daten aussehen werden, oder sie ändern sich zu schnell, als dass traditionelle Spalten Sinn ergeben würden.

Das ist wichtig, denn JSONB ist keine Fehlentscheidung. In vielen Systemen ist es die sauberste Darstellung des Problems. Wenn du Webhook-Nachrichten von Drittanbietern, versionierte Ereignis-Inhalte, Feature-Flags oder LLM-Konfigurationsobjekte speicherst, wobei jeder Anbieter und jedes Modell leicht unterschiedliche und ständig wechselnde Optionen bereitstellt, kann es unpraktischer sein, alles in erste-Klasse-Spalten zu zwingen.

Das Problem ist jedoch, dass JSONB die einfachste Methode ist, um Schema-Entscheidungen hinauszuschieben, ohne zuzugeben, dass man sie hinauszuschiebt. Irgwo zwischen Absicht und Umsetzung wurde es zum Datenbank-Äquivalent von „Ich räume mein Zimmer später auf“. Die vorübergehende Lösung, die du vor sechs Monaten eingeführt hast? Sie ist immer noch da, und nun hängt die Produktion davon ab.

Ich sehe immer wieder denselben Muster. Ein Team fügt eine JSONB-Spalte hinzu, weil es sich unsicher ist, was die Anforderungen betreffen. Es verspricht sich, sie zu normalisieren, sobald sich die Dinge beruhigt haben. Drei Jahre später enthält diese Spalte vierzig verschiedene Versionen dessen, was ursprünglich ein Benutzerprofil sein sollte, und wird von fünfzehn Diensten abgefragt, die jeweils andere Annahmen über den Inhalt treffen.

Die technische Schuldenlast liegt nicht an der JSONB-Spalte selbst. Sie entsteht aus der Lücke zwischen dem, was du dir selbst sagst, du baust, und dem, was du tatsächlich baust: ein nicht dokumentiertes Schema-on-Read-System.

## Was normalerweise passiert

Sie fügen eine Funktion hinzu und sind unsicher, ob die Benutzer einen `twitter_handle` oder einen `bluesky_handle` oder etwas ganz anderes benötigen. Statt das Schema durchzudenken, tun Sie dies:

```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  profile JSONB
);
```

Es funktioniert. Sie implementieren die Funktion, wechseln zur nächsten, dann zur nächsten. Die JSONB-Spalte wächst still im Hintergrund.

Dies ist der entscheidende Punkt. Wenn `profile` eine undurchsichtige Datenblase bleibt, die über `user.id` abgerufen wird, sind Sie wahrscheinlich in Ordnung. Wenn sie jedoch zur primären Speicherstelle für Geschäftsdaten wird, ändern sich die Kompromisse rasch.

Produkt fragt: *"Wie viele Benutzer befinden sich in New York?"*

Sie schreiben:

```sql
SELECT count(*) FROM users WHERE profile->>'location' = 'New York';
```

PostgreSQL führt eine vollständige Tabellenscan durch. Jede einzelne Zeile.

Sie fügen also einen GIN-Index hinzu. Vielleicht ist das immer noch akzeptabel. Manchmal ist es das. Doch nun zahlen Sie echte Komplexität und Speicherkosten, weil ein Feld, das sich wie erstklassige relationale Daten verhält, niemals eine erstklassige Spalte wurde.  

### Jahr 1: Schema-Drift  

Sie haben drei Datenversionen in derselben Spalte.  

*   Zeile 1: `{"city": "NYC"}`  
*   Zeile 1000: `{"location": "NYC"}`  
*   Zeile 5000: `{"address": {"city": "New York"}}`  

Ihr Anwendungscodes sieht nun so aus:  

```javascript  
const city = user.location || user.city || user.address?.city || "Unknown";  
```  

Sie haben das Schema nicht entfernt. Sie haben lediglich Validierung und Konsistenzprüfung von der Datenbank in verstreuten Anwendungscode verschoben.

## Wann JSONB tatsächlich verwendet werden sollte

JSONB hat durchaus legitime Anwendungsfälle. Häufig ist es vollkommen in Ordnung, und manchmal sogar die beste verfügbare Option.

Der entscheidende Unterschied liegt nicht darin, dass strukturierte Daten gut und JSON schlecht wären. Es geht vielmehr um folgende Fragen:  

- Wird die Daten hauptsächlich anhand eines stabilen Primärschlüssels als Ganzes abgerufen?  
- Variieren die Schlüssel erheblich zwischen Anbietern, Versionen, Mieter oder im Zeitverlauf?  
- Fragt die Anwendung einige bekannte Felder ab, oder erfindet sie jedes Sprint neue Pfadabfragen?  
- Führt die Anwendung die Versionsverwaltung und Validierung gezielt durch, oder improvisiert sie einfach?

### Legitimierte JSONB-Anwendungsfälle

1.  **Webhook-Nutzlasten**: Sie erhalten Daten von Stripe, Slack oder GitHub. Sie haben keinerlei Einfluss auf das Schema. Sie werden es möglicherweise nie abfragen. Sie müssen es nur zum Debuggen oder erneuten Senden speichern. **Ideal für JSONB.**

2.  **Protokollierung & Ereignisströme**: Anwendungslaufverfolgungen, Audit-Protokolle, Fehlerkontexte. Diese sind schreibintensiv, selten nach spezifischen Feldern abgefragt und oft in Massen analysiert oder in Analyseplattformen exportiert. **JSONB ist hier akzeptabel.**

3.  **Benutzereinstellungen & Präferenzen**: Einstellungsobjekte mit 100+ Booleschen Flags, wobei die meisten falsch sind und Sie stets den gesamten Blob nach Benutzer-ID abrufen. Sie führen keine Abfragen wie `WHERE preferences->>'theme' = 'dark'` durch. **JSONB eignet sich.**

4.  **LLM-Anbieter-/Modellkonfiguration**: Dies ist eines der klarsten modernen Beispiele. OpenAI, Anthropic, Gemini, open-weight lokale Modelle und anbieterabhängige Gateways verfügen über überlappende, aber unterschiedliche Parameter. Selbst bei einem Anbieter entwickeln sich Modellfunktionen und Optionennamen weiter. Ein JSONB-Konfigurationsblob ist oft ehrlicher als die Illusion, dass `temperature`, `top_p`, `reasoning_effort`, `json_schema`, `tool_choice` und zwanzig weitere Einstellungen universelle Spalten sein sollten. **JSONB ist hier oft die richtige Abstraktion.**

5.  **API-Antwort-Caching**: Sie zwischenspeichern gesamte API-Antworten. Die Datenbank ist nur ein schnellerer Redis. Sie rufen nach Cache-Schlüssel ab, nie nach verschachtelten Eigenschaften. **JSONB ist hier angemessen.**

6.  **Event Sourcing**: Sie speichern unveränderliche Ereignisnutzlasten. Ihre Abfragen sind stets „Gib mir alle Ereignisse für Aggregat X“ in zeitlicher Reihenfolge. Sie führen nie `WHERE`-Klauseln auf Ereigniseigenschaften aus. **JSONB passt hier.**

7. **Erweiterbarkeitsoberflächen**: Integrationen, Plugineinstellungen, mieterübergreifende Überschreibungen, Marktplatzmetadaten, Anbieterkapazitäten oder „Extras“-Felder, bei denen Sie explizit erwarten, dass sich die Struktur nach Untertypen unterscheidet. **JSONB kann der richtige Vertrag sein, nicht ein Kompromiss.**

Faustregel: Wenn die Anwendung das Dokument über einen bekannten Schlüssel abruft und weiß, wie es validiert/verwaltet wird, kann JSONB hervorragend sein. Wenn das Unternehmen immer wieder relationale Fragen zu verschachtelten Schlüsseln stellt, versuchen diese Felder, zu Spalten zu werden.

## Das beste Muster ist oft hybrid

Viele reife Systeme landen hier:

```sql
CREATE TABLE llm_requests (
  id UUID PRIMARY KEY,
  provider TEXT NOT NULL,
  model TEXT NOT NULL,
  status TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  config JSONB NOT NULL
);
```

Dies ist in der Regel besser als jeder Extremfall.

- `provider`, `model`, `status` und `created_at` sind erste-Klasse-Spalten, weil Sie sie filtern, verknüpfen, aggregieren und indizieren werden.
- `config` bleibt JSONB, weil sich die genaue Optionsoberfläche modellspezifisch, providerspezifisch und wahrscheinlich weiterentwickeln wird.

Das ist nicht „Fehlen der Normalisierung“. Es geht darum, die Grenze an der richtigen Stelle zu ziehen.

### Bei großer Skalierung: Objektversionierung > Normalisierung

Hier wird es interessant. Bei ausreichend großer Skalierung ist die „richtige“ Lösung nicht die Normalisierung – es ist die Objektversionierung.

Wenn Sie Milliarden von Zeilen und häufige Schemaevolutionen haben, wird das Migrieren von Spalten teuer. Unternehmen wie Stripe, GitHub und Netflix normalisieren nicht alles. Stattdessen:

```sql
CREATE TABLE entities (
  id UUID PRIMARY KEY,
  version INT NOT NULL,
  data JSONB NOT NULL
);
```

Ihre Anwendung weiß, wie man `version: 1`, `version: 2`, `version: 3` liest. Keine Datenbankmigrationen für neue Felder. Der Code kümmert sich um die Rückwärtskompatibilität.

Das ist eine architektonische Entscheidung, keine Faulheit. Sie tauscht Datenbankkomplexität gegen Anwendungscomplexität. Manchmal ist das genau die richtige Wahl, besonders wenn das Dokument natürlicherweise versioniert ist und die Anwendung der kanonische Interpreter ist.

Der Problemfall ist nicht „JSONB verwenden“. Der Problemfall ist, JSONB ohne Versionierung, Validierung, Promotionsregeln oder klare Grenzen zwischen Dokumentdaten und relationalen Daten zu verwenden.

## Die wirklich wichtigen Fragen

Bevor Sie eine JSONB-Spalte hinzufügen, fragen Sie:

1. Werden wir verschachtelte Felder in `WHERE`, `JOIN`, `GROUP BY` oder `ORDER BY` regelmäßig abfragen?
2. Steuern wir dieses Schema, oder ist es extern definiert und instabil?
3. Ist die Struktur absichtlich heterogen über Datensätze?
4. Haben wir Validierung und Versionierung auf Anwendungsebene?
5. Welche Felder sind später wahrscheinlich zu operativen Dimensionen geworden?

Wenn die Antwort auf #1 „ja, ständig“ ist, ist das ein starkes Signal für Spalten.

Wenn die Antworten auf #2 und #3 „ja“ sind, tut JSONB wahrscheinlich wirklich Arbeit für Sie.

## Aus dem Sumpf befreien  

Wenn Sie sich bereits in dieser Situation befinden, graben Sie nicht weiter.  

1. **Audit:** Führen Sie `jsonb_object_keys` aus und prüfen Sie, ob die tatsächliche Struktur sich von der angenommenen unterscheidet.  
2. **Promotion:** Identifizieren Sie die Felder, nach denen Sie am häufigsten filtern, verknüpfen, sortieren oder Berichte erstellen. Machen Sie diese zu echten Spalten.  
3. **Validierung:** Fügen Sie Validierungen auf Anwendungs- oder Datenbankebene für die verbleibenden Inhalte im JSONB hinzu.  
4. **Versionierung:** Wenn der Blob echte Domänendaten enthält, fügen Sie eine explizite Versionierung hinzu.  
5. **Trimmen:** Entfernen Sie duplizierte Schlüssel aus dem Blob, sobald die promovierten Spalten eingerichtet sind.  

Sagen Sie sich nicht, dass jeder Blob normalisiert werden muss. Sagen Sie sich auch nicht, dass ein Blob mit dauerhaften Geschäftssemantiken als „vorübergehend“ abgetan werden kann.  

JSONB ist großartig, wenn das Dokument tatsächlich dokumentenartig ist. Es ist gefährlich, wenn es sich um ein relationales Schema handelt, das nur vorgibt, ein Dokument zu sein.  

## Ressourcen

- [PostgreSQL JSONB-Dokumentation](https://www.postgresql.org/docs/current/datatype-json.html)  
- [JSONB-Indizierungsstrategien](https://www.postgresql.org/docs/current/datatype-json.html#JSON-INDEXING)  
- [Wann JSONB gegenüber relationalen Spalten verwendet werden sollte](https://www.citusdata.com/blog/2016/07/14/choosing-nosql-hstore-json-jsonb/)  
- [PostgreSQL-Schema-Design-Best Practices](https://www.postgresql.org/docs/current/ddl.html)
````
