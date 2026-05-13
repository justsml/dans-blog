# Translation Candidate
- Slug: the-jsonb-seduction
- Locale: de
- Model: openrouter/qwen/qwen3-32b:nitro
- Target: src/content/posts/2025-12-29--the-jsonb-seduction/de/index.mdx
- Validation: deferred
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
subTitle: >-
  JSONB ist leistungsfähig, nützlich und sehr leicht falsch anzuwenden, wenn Sie
  ein Blob zu Ihrem echten Schema werden lassen.
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
PostgreSQL hat JSONB eingeführt, um halbstrukturierte Daten zu speichern, ohne vorab starre Schemas zu definieren. Die Idee war gut: Manchmal weiß man einfach nicht, wie die Daten aussehen werden, oder sie ändern sich zu schnell, als dass traditionelle Spalten Sinn ergeben würden.

Das ist wichtig, denn JSONB ist keine Fehlentscheidung. In vielen Systemen ist es die sauberste Darstellung des Problems. Wenn man Drittanbieter-Webhook-Nutzlasten, versionierte Ereignis-Inhalte, Feature-Flags oder LLM-Konfigurationsobjekte speichert, bei denen jeder Anbieter und jedes Modell leicht unterschiedliche und ständig wechselnde Optionen anbietet, kann man es oft unpraktischer finden, alles in eigene Spalten zu zwängen.

Das Problem ist jedoch, dass JSONB der einfachste Weg ist, um Schema-Entscheidungen hinauszuschieben, ohne zuzugeben, dass man sie verschiebt. Irgwo zwischen Absicht und Umsetzung ist es zum Datenbank-Äquivalent von „Ich putze mein Zimmer später“ geworden. Die vorübergehende Lösung, die du vor sechs Monaten eingeschlagen hast? Sie ist immer noch da, und nun hängt die Produktion davon ab.

Ich sehe immer wieder das gleiche Muster. Ein Team fügt eine JSONB-Spalte hinzu, weil es unsicher ist, welche Anforderungen bestehen. Es verspricht sich selbst, alles zu normalisieren, sobald sich die Dinge beruhigen. Drei Jahre später enthält diese Spalte vierzig verschiedene Versionen dessen, was ursprünglich ein Benutzerprofil sein sollte, und wird von fünfzehn Diensten abgefragt, die jeweils andere Annahmen über den Inhalt treffen.

Die technische Schulden entsteht nicht aus dem JSONB selbst. Sie entsteht aus der Lücke zwischen dem, was du dir vorgenommen hast, und dem, was du tatsächlich gebaut hast: ein nicht dokumentiertes Schema-on-Read-System.

## Was normalerweise passiert

Du fügst eine Funktion hinzu und bist dir unsicher, ob die Nutzer einen `twitter_handle`, einen `bluesky_handle` oder etwas anderes benötigen. Anstatt das Schema durchzudenken, tust du dies:

```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  profile JSONB
);
```

Es funktioniert. Du bringst die Funktion raus, gehst zur nächsten über, dann zur nächsten. Die JSONB-Spalte wächst still im Hintergrund.

Das ist der entscheidende Verzweigungspunkt. Wenn `profile` eine undurchsichtige Datenmasse bleibt, die über `user.id` abgerufen wird, bist du wahrscheinlich in Ordnung. Wenn sie jedoch zur primären Stelle wird, an der Geschäftsdaten gespeichert werden, ändern sich die Abwägungen rasch.

Produkt fragt: *Wie viele Nutzer befinden sich in New York?*

Sie schreiben:

```sql
SELECT count(*) FROM users WHERE profile->>'location' = 'New York';
```

PostgreSQL führt eine vollständige Tabellenscan durch. Jede einzelne Zeile.

Also fügen Sie einen GIN-Index hinzu. Vielleicht ist das immer noch akzeptabel. Manchmal ist es so. Aber jetzt zahlen Sie echte Komplexität und Speicherkosten, weil ein Feld, das sich wie eine erste Klasse relationaler Daten verhält, nie eine erste Klasse Spalte wurde.

### Jahr 1: Schema Drift

Sie haben drei Versionen der Daten in der gleichen Spalte.

*   Zeile 1: `{"city": "NYC"}`
*   Zeile 1000: `{"location": "NYC"}`
*   Zeile 5000: `{"address": {"city": "New York"}}`

Ihr Anwendungscode sieht jetzt so aus:

```javascript
const city = user.location || user.city || user.address?.city || "Unknown";
```

Sie haben das Schema nicht entfernt. Sie haben nur Validierung und Konsistenzprüfung von der Datenbank in verstreuten Anwendungscode verschoben.

JSONB hat gültige Anwendungsfälle. In vielen Fällen ist es vollkommen in Ordnung, und manchmal ist es sogar die beste verfügbare Wahl.

Der entscheidende Unterschied ist nicht „strukturiert gut, JSON schlecht“. Es ist eher so:

- Wird die Daten hauptsächlich als Ganzes anhand eines stabilen Primärschlüssels abgerufen?
- Variieren die Schlüssel erheblich zwischen Anbietern, Versionen, Mandanten oder über die Zeit?
- Suchen Sie nach wenigen bekannten Feldern, oder entwickeln Sie ständig neue Pfadabfragen in jedem Sprint?
- Verwaltet die Anwendung Versionierung und Validierung gezielt, oder improvisiert sie einfach?

### Geltende JSONB-Anwendungsfälle

1.  **Webhook-Nutzlasten**: Sie erhalten Daten von Stripe, Slack oder GitHub. Sie haben keinerlei Einfluss auf das Schema. Sie könnten es nie abfragen. Sie benötigen es nur zum Speichern für Debugging oder Wiedergabe. **Ideal für JSONB.**

2.  **Protokollierung & Ereignisströme**: Anwendungsprotokolle, Audit-Trail, Fehlerkontexte. Diese sind schreibintensiv, selten nach spezifischen Feldern abgefragt und werden oft in Massen analysiert oder an Analyseplattformen exportiert. **JSONB ist hier akzeptabel.**

3.  **Benutzereinstellungen & Präferenzen**: Einstellungsobjekte mit 100+ booleschen Flags, wobei die meisten falsch sind, und Sie immer das gesamte Blob anhand der Benutzer-ID abrufen. Sie führen keine Abfragen wie `WHERE preferences->>'theme' = 'dark'` aus. **JSONB funktioniert.**

4.  **LLM-Anbieter-/Modellkonfiguration**: Dies ist eines der klarsten modernen Beispiele. OpenAI, Anthropic, Gemini, open-weight lokale Modelle und anbieterabhängige Gateways verfügen über überlappende, aber unterschiedliche Parameter. Selbst bei einem Anbieter entwickeln sich Modellfunktionen und Optionennamen weiter. Ein JSONB-Konfigurationsblob ist oft ehrlicher, als vorzutäuschen, dass `temperature`, `top_p`, `reasoning_effort`, `json_schema`, `tool_choice` und zwanzig weitere Einstellungen universelle Spalten sein sollten. **JSONB ist hier oft die richtige Abstraktion.**

5.  **API-Antwort-Caching**: Sie zwischenspeichern gesamte API-Antworten. Die Datenbank ist nur ein schnellerer Redis. Sie rufen anhand des Cache-Schlüssels ab, nie nach verschachtelten Eigenschaften. **JSONB ist angemessen.**

6.  **Event Sourcing**: Sie speichern unveränderliche Ereignisnutzlasten. Ihre Abfragen sind immer „gib mir alle Ereignisse für Aggregat X“ in zeitlicher Reihenfolge. Sie führen nie `WHERE`-Klauseln auf Ereigniseigenschaften aus. **JSONB passt.**

7. **Erweiterbarkeitsoberflächen**: Integrationen, Plugin-Einstellungen, pro-Tenant-Überschreibungen, Marktplatz-Metadaten, Anbieterkapazitäten oder „Extras“-Felder, bei denen Sie explizit erwarten, dass sich die Struktur nach Untertypen unterscheidet. **JSONB kann der richtige Vertrag sein, kein Kompromiss.**

Faustregel: Wenn die Anwendung das Dokument anhand eines bekannten Schlüssels abruft und weiß, wie es validiert/versionsverwaltet wird, kann JSONB hervorragend sein. Wenn das Unternehmen weiterhin relationale Fragen zu verschachtelten Schlüsseln stellt, versuchen diese Felder, Spalten zu werden.

## Der Beste Muster Ist Oft Hybrid

Viele etablierte Systeme landen hier:

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

Das ist in der Regel besser als jeder Extremfall.

- `provider`, `model`, `status` und `created_at` sind erste-Klasse-Spalten, weil Sie sie filtern, verknüpfen, aggregieren und indizieren werden.
- `config` bleibt JSONB, weil die genaue Optionsoberfläche modellspezifisch, anbieterspezifisch und sich wahrscheinlich weiterentwickeln wird.

Das ist kein „Fehlschlagen der Normalisierung“. Das ist die Linie am richtigen Ort zu ziehen.

### In Der Skalierung: Objektversionsverwaltung > Normalisierung

Hier wird es interessant. Bei ausreichend großer Skalierung ist die „richtige“ Lösung nicht die Normalisierung – es ist die Objektversionsverwaltung.

Wenn Sie Milliarden von Zeilen und häufige Schema-Evolution haben, wird das Migrieren von Spalten teuer. Unternehmen wie Stripe, GitHub und Netflix normalisieren nicht alles. Stattdessen:

```sql
CREATE TABLE entities (
  id UUID PRIMARY KEY,
  version INT NOT NULL,
  data JSONB NOT NULL
);
```

Ihr Anwendungscode weiß, wie er `version: 1`, `version: 2`, `version: 3` liest. Keine Datenbankmigrationen für neue Felder. Der Code übernimmt die rückwärtskompatible Abwärtskompatibilität.

Das ist eine architektonische Entscheidung, keine Lethargie. Sie tauscht Datenbankkomplexität gegen Anwendungscode-Komplexität. Manchmal ist das genau die richtige Wahl, besonders wenn das Dokument natürlicherweise versioniert wird und die Anwendung die kanonische Interpretationsquelle ist.

Der Ausfallmodus ist nicht „JSONB verwenden“. Der Ausfallmodus ist, JSONB ohne Versionierung, Validierung, Promotionsregeln oder eine klare Grenze zwischen Dokumentdaten und relationalen Daten zu verwenden.

## Die wirklich wichtigen Fragen

Bevor Sie eine JSONB-Spalte hinzufügen, fragen Sie:

1.  Werden wir verschachtelte Felder in `WHERE`, `JOIN`, `GROUP BY` oder `ORDER BY` regelmäßig abfragen?
2.  Stehen wir im Kontrollschema, oder ist es extern definiert und instabil?
3.  Ist die Struktur absichtlich heterogen zwischen den Datensätzen?
4.  Haben wir Validierung und Versionierung auf Anwendungsebene?
5.  Welche Felder könnten später zu operativen Dimensionen werden?

Wenn die Antwort auf #1 „Ja, ständig“ lautet, ist das ein starker Hinweis für reguläre Spalten.

Wenn die Antworten auf #2 und #3 „Ja“ sind, tut JSONB wahrscheinlich echte Arbeit für Sie.

---
## Aus der Falle entkommen

Wenn Sie bereits in dieser Situation sind, graben Sie nicht weiter.

1. Audit: Führen Sie `jsonb_object_keys` aus und untersuchen Sie die tatsächliche Form der Drift, nicht die Form, die Sie annehmen.  
2. Promote: Identifizieren Sie die Felder, nach denen Sie am häufigsten filtern, verknüpfen, sortieren oder Berichte erstellen. Machen Sie diese zu echten Spalten.  
3. Validate: Fügen Sie Validierung auf Anwendungsebene oder Datenbankebene für alles hinzu, was in JSONB verbleibt.  
4. Version: Wenn der Blob echte Domänen-Daten ist, versionieren Sie ihn explizit.  
5. Trim: Entfernen Sie duplizierte Schlüssel aus dem Blob, sobald die geförderten Spalten etabliert sind.  

Sagen Sie sich nicht, dass jeder Blob normalisiert werden muss. Sagen Sie sich auch nicht, dass ein Blob mit dauerhaften Geschäftssemantiken „vorübergehend“ ist.  

JSONB ist großartig, wenn das Dokument tatsächlich dokumentenförmig ist. Es ist gefährlich, wenn es ein relationales Schema ist, das sich eine falsche Schnauzbart trägt.  

## Ressourcen  

- [PostgreSQL JSONB-Dokumentation](https://www.postgresql.org/docs/current/datatype-json.html)  
- [JSONB-Indizierungsstrategien](https://www.postgresql.org/docs/current/datatype-json.html#JSON-INDEXING)  
- [Wann JSONB vs. relationale Spalten verwenden](https://www.citusdata.com/blog/2016/07/14/choosing-nosql-hstore-json-jsonb/)  
- [PostgreSQL-Schema-Design-Best Practices](https://www.postgresql.org/docs/current/ddl.html)
````
