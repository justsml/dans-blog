# Translation Candidate
- Slug: quiz-postgres-sql-mastery-pt1
- Locale: de
- Model: openrouter/qwen/qwen3-32b:nitro
- Target: src/content/posts/2024-11-27--quiz-postgres-sql-mastery-pt1/de/index.mdx
- Validation: rejected: direct AI SDK translation failed
- Runtime seconds: 5.13
- Input tokens: unknown
- Output tokens: unknown
- Thinking tokens: unknown
- Cached input tokens: unknown
- Cache write tokens: unknown
- Estimated cost: unknown
- Pricing source: unknown
- Note: Command failed: bun run i18n:translate:chunked -- --slug quiz-postgres-sql-mastery-pt1 --locale de --model openrouter/qwen/qwen3-32b:nitro --chunk 6p --quiz-concurrency 20
## Raw Output

````mdx
---
unlisted: false
social_image: ../mobile.webp
title: 'Quiz: Deep Postgres: Teil 1'
subTitle: Lässt SQL Sie kreischen?
label: 'Deep PostgreSQL #1'
category: Quiz
subCategory: Database
date: '2024-11-27'
modified: '2024-12-03'
tags:
  - quiz
  - postgresql
  - sql
  - database
  - intermediate
  - advanced
cover_full_width: ../elephant-synthwave-gym-wide.webp
cover_mobile: ../elephant-synthwave-gym-square-200.webp
cover_icon: ../elephant-synthwave-gym-square-200.webp
---
import Challenge from '../../../../../components/QuizUI/Challenge';
import QuizUI from '../../../../../components/QuizUI/QuizUI';

> **Teil 1 von 2.** [Weiter zu Teil 2](/quiz-postgres-sql-mastery-pt2/)

<p class="inset">PostgreSQL 🐘 ist eindeutig meine Lieblingsdatenbank! Ich lerne ständig neue Tricks und Fallstricke, also habe ich sie in einem neuen Quiz zusammengefasst.</p>

Dieses Quiz deckt eine Mischung aus bekannten und weniger bekannten PostgreSQL‑Features und Fallstricken ab: von eingebauten Aggregaten über Typumwandlungen, Constraints und mehr.

Viel Erfolg! 🍀

<QuizUI>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={0}
  group="Aufwärmen: Funktionen"
  title="Eingebaute Aggregate"
  options={[
    {text: 'MIN'},
    {text: 'MAX'},
    {text: 'AVG'},
    {text: 'MEDIAN', isAnswer: true},
  ]}
>
  <slot name="question">
  <div className="question">
    Welche ist KEINE eingebaute Aggregatfunktion in PostgreSQL?
    ```sql
    SELECT 
      MIN(grade) as lowest,
      MAX(grade) as highest,
      AVG(grade) as average,
      MEDIAN(grade) as middle
    FROM grades;
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    `MEDIAN` ist nicht eingebaut! Du brauchst:
    ```sql
    PERCENTILE_CONT(0.5) 
    WITHIN GROUP (ORDER BY grade)
    ```
    Übliche eingebaute Aggregate:
    - `MIN`, `MAX`, `COUNT`
    - `AVG`, `SUM`
    - `ARRAY_AGG`, `STRING_AGG`
    - Verschiedene statistische Funktionen
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={1}
  group="Aufwärmen: Typumwandlung"
  title="Varianten der Cast‑Syntax"
  options={[
    {text: '\'95\'::INTEGER'},
    {text: 'INTEGER \'95\''},
    {text: 'CAST(\'95\', INTEGER)', isAnswer: true},
    {text: 'CAST(\'95\' AS INTEGER)'},
  ]}
>
  <slot name="question">
  <div className="question">
    Welche dieser Typumwandlungen ist **ungültig** ❌?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    PostgreSQL unterstützt drei Cast‑Syntaxen:

    1. ANSI‑SQL: `CAST(expression AS type)`.
    2. PostgreSQL: `expression::type`.
    3. Typfunktion: `type 'literal'`.

    Alle sind funktional äquivalent, aber:
    - `CAST()` ist am portabelsten.
    - `::` ist PostgreSQL‑spezifisch, wird aber häufig verwendet.
    - Der infix‑artige `type 'literal'` ist weniger verbreitet, aber dennoch gültig.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={2}
  group="Einschränkungen"
  title="UNIQUE‑Constraints und NULL"
  options={[
    {text: 'Keine NULLs erlaubt'},
    {text: 'Ein NULL erlaubt'},
    {text: 'Mehrere NULLs erlaubt', isAnswer: true},
    {text: 'Hängt von der PostgreSQL‑Version ab'},
  ]}
>
  <slot name="question">
  <div className="question">
    Wie viele NULL‑Werte sind hier erlaubt?
    ```sql
    CREATE TABLE student_emails (
      student_id INTEGER,
      email VARCHAR(255),
      UNIQUE(email)
    );
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    UNIQUE‑Constraints in PostgreSQL:
    - Erlauben mehrere NULL‑Werte.
    - `NULL` ≠ `NULL` bei Unique‑Prüfungen.

    Um `NULL`‑Werte zu verhindern, füge `NOT NULL` hinzu:
    ```sql
    CREATE TABLE student_emails (
      student_id INTEGER,
      email VARCHAR(255) NOT NULL,
      UNIQUE(email)
    );
    ```
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={3}
  group="Datum/Uhrzeit"
  title="Datumsarithmetik"
  options={[
    {text: '2024-11-27'},
    {text: '2024-11-27 00:00:00'},
    {text: '2024-11-28'},
    {text: '2024-11-28 00:00:00', isAnswer: true},
    {text: 'Fehler: ungültige Zeit'},
  ]}
>
  <slot name="question">
  <div className="question">
    Was gibt das zurück?
    ```sql
    SELECT '2024-11-27'::date + interval '24 hours';
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Intervalle sind ein mächtiges Werkzeug, um Datumsbereichs‑Operationen zu vereinfachen!

    Datumsarithmetik in PostgreSQL:
    - `+ interval '24 hours'` fügt 24 Stunden hinzu
    - `+ interval '1 day'` fügt 1 Tag hinzu
    - `+ interval '1 month'` fügt 1 Monat hinzu
    - `+ interval '1 year'` fügt 1 Jahr hinzu

    Das Ergebnis ist `2024-11-28 00:00:00`.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={4}
  group="Zeitstempel"
  title="timestamptz vs timestamp"
  options={[
    {text: 'Beide belegen 8 Byte, repräsentieren aber unterschiedliche Zeitstempel‑Semantiken', isAnswer: true},
    {text: 'They"'},
    {text: '`timestamptz` bewahrt jede eingegebene Zeitzone'},
    {text: '`timestamptz` speichert den ursprünglichen Zeitzonennamen oder Offset'},
    {text: '`timestamptz` speichert einen 2‑Byte‑Wert für die Zeitzone'},
    {text: '`timestamptz` ist der Nachfolger von `timestamp`'},
  ]}
>
  <slot name="question">
  <div className="question">
    Was ist die **genaueste** Aussage zu `timestamptz` und `timestamp`?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Sie sind beide 8 Byte groß, aber sie speichern nicht denselben Werttyp.

    Also, was ist der Unterschied? Er liegt beim Parsen der Eingabe.

    **`timestamptz`**
    - Normalisiert die Eingabe zu einem absoluten Zeitpunkt.
    - Berücksichtigt die Server‑/Verbindungseinstellung `TimeZone`, wenn Eingaben ohne expliziten Offset geparst werden und bei der Ausgabe.

    **`timestamp`**
    - Speichert Datum und Uhrzeit ohne Zeitzonen‑Konvertierung.
    - Bewahrt keine Zeitzoneninformationen und normalisiert sie nicht.


    **`timestamp`**

    - Speichert Datum & Uhrzeit ohne Zeitzonenangabe.
    - Praktisch, wenn standardisierte Daten explizit gespeichert werden sollen, sei es in UTC oder einer bestimmten Zeitzone.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={5}
  group="Postgres-Typen"
  title="Ungültige Typen identifizieren"
  options={[
    {text: 'VARCHAR(100)'},
    {text: 'CHAR(100)'},
    {text: 'TEXT'},
    {text: 'STRING(100)', isAnswer: true},
    {text: 'CHARACTER VARYING(100)'},
  ]}
>
  <slot name="question">
  <div className="question">
    Welche dieser ist ❌ kein gültiger PostgreSQL‑Typ?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    PostgreSQL bietet eine umfangreiche Palette an Datentypen, aber `STRING(100)` gehört nicht dazu.

    Die korrekten String‑Typen sind:
    - `VARCHAR(100)` (variable Länge)
    - `CHAR(100)` (feste Länge)
    - `TEXT` (unbegrenzte Länge)
    - `CHARACTER VARYING(100)` (gleichbedeutend mit `VARCHAR(100)`)
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={6}
  group="Postgres-Typen"
  title="Ungültige Typen identifizieren"
  options={[
    {text: 'int'},
    {text: 'real'},
    {text: 'bigint'},
    {text: 'bigserial'},
    {text: 'smallserial'},
    {text: 'decimal128', isAnswer: true},
    {text: 'double precision'},
  ]}
>
  <slot name="question">
  <div className="question">
    Welche dieser ist ❌ kein gültiger PostgreSQL‑Typ?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Es könnte vertraut wirken, da `decimal128` in vielen Systemen (z. B. Mongo und Java) vorkommt. Es ist kein gültiger PostgreSQL‑Typ, `decimal` ist es.

    Die korrekten numerischen Typen sind:
    - `int` (4‑Byte‑Integer)
    - `bigint` (8‑Byte‑Integer)
    - `real` (4‑Byte‑Gleitkomma)
    - `double precision` (8‑Byte‑Gleitkomma)
    - `bigserial` (auto‑inkrementierender 8‑Byte‑Integer)
    - `smallserial` (auto‑inkrementierender 2‑Byte‑Integer)
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={7}
  group="Postgres-Typen"
  title="Ungültige Typen identifizieren"
  options={[
    {text: 'cidr'},
    {text: 'inet'},
    {text: 'ipv4', isAnswer: true},
    {text: 'macaddr'},
    {text: 'macaddr8'},
    {text: 'interval'},
  ]}
>
  <slot name="question">
  <div className="question">
    Welcher dieser ist ❌ kein gültiger PostgreSQL‑Typ?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Hat dich das frustriert, sogar _wütend_? Du bist nicht allein! Wie ein namenloser "Core"‑Datenbank‑Mitwirkender sagte: "Was zum Teufel, Dan?! Ich bin bei den Typ‑Fragen abgestürzt! Das ist gewalttätig, Sir! Teile meine Punktzahl nicht, haha." 😈 Bitte sehr.

    PostgreSQLs umfangreiche Sammlung von Netzwerk‑Typen enthält kein `ipv4`. Jedes Mal, wenn ich versuche, es ohne zu googeln zu benutzen, liege ich falsch. Vielleicht lässt mich `macaddr8` denken, dass es _muss_ `ipv4`‑ und `ipv6`‑Typen geben muss. Nein, `inet` deckt beides ab. Außerdem deckt `cidr` Netzwerk‑Masken für beide ab.

    Gültige Netzwerk‑Typen sind:
    - `cidr` (IPv4/IPv6‑Netzwerkadresse)
    - `inet` (IPv4/IPv6‑Hostadresse)
    - `macaddr` (MAC‑Adresse)
    - `macaddr8` (EUI‑64‑MAC‑Adresse)
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={8}
  group="Postgres-Typen"
  title="Ungültige Typen identifizieren"
  options={[
    {text: 'xml'},
    {text: 'uuid'},
    {text: 'money'},
    {text: 'currency', isAnswer: true},
    {text: 'interval'},
  ]}
>
  <slot name="question">
  <div className="question">
    Welche dieser ist ❌ kein gültiger PostgreSQL‑Typ?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    PostgreSQL verfügt über eine umfangreiche Menge spezialisierter Typen, aber `currency` gehört nicht dazu!

    Die gültigen Typen sind:
    - `xml` (XML‑Daten)
    - `uuid` (UUID)
    - `money` (Währungsbetrag)
    - `interval` (Zeitintervall)
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={9}
  group="Postgres-Typen"
  title="Ungültige Typen identifizieren"
  options={[
    {text: 'box'},
    {text: 'line'},
    {text: 'point'},
    {text: 'circle'},
    {text: 'polygon'},
    {text: 'triangle', isAnswer: true},
  ]}
>
  <slot name="question">
  <div className="question">
    Welcher dieser ist ❌ kein gültiger PostgreSQL‑Typ?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    PostgreSQL verfügt über eine umfangreiche Menge spezialisierter Typen, aber `triangle` ist keiner davon.

    Ich glaube, dass kommende Versionen von [GEOS](https://libgeos.org/) `Triangle`‑Unterstützung für OGC/WKT enthalten werden, was bedeutet, dass es irgendwann in PostGIS aufgenommen werden sollte. (Im Grunde könnte diese Antwort in Zukunft falsch sein.)

    Die korrekten spezialisierten Typen umfassen:
    - `box` (rechteckige Box)
    - `line` (unendliche Linie)
    - `point` (2D‑Punkt)
    - `circle` (2D‑Kreis)
    - `polygon` (2D‑Polygon)
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={10}
  group="Ganzzahlarithmetik"
  title="Ganzzahlüberlauf"
  options={[
    {text: '4294967296'},
    {text: 'Fehler: Ganzzahl außerhalb des Bereichs', isAnswer: true},
    {text: '0'},
    {text: '2147483647'},
  ]}
>
  <slot name="question">
  <div className="question">
    Was passiert bei der Berechnung der insgesamt möglichen Student‑IDs?
    ```sql
    SELECT 256 * 256 * 256 * 256;
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Der `integer`‑Typ von PostgreSQL ist 32‑Bit vorzeichenbehaftet und reicht von `-2,147,483,648` bis `2,147,483,647`.

    Die Berechnung `256^4` = `4,294,967,296` überschreitet diesen Bereich.

    Um größere Zahlen zu verarbeiten:
    ```sql
    -- Use BIGINT
    SELECT 256::bigint * 256 * 256 * 256;

    -- Or numeric for arbitrary precision
    SELECT 256::numeric * 256 * 256 * 256;
    ```
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={11}
  group="Datum/Uhrzeit"
  title="Zeitstempel‑Präzision"
  options={[
    {text: '2024-01-08 13:30:00+00'},
    {text: '2024-01-08 13:30:00.123456+00'},
    {text: '2024-01-08 13:30:00.123456789+00'},
    {text: '2024-01-08 13:30:00.1234567', isAnswer: true},
  ]}
>
  <slot name="question">
  <div className="question">
    Welches ist das kleinste `timestamp`‑Literal, das die maximale `time`‑Präzision in Postgres überschreitet?
    ```sql
    CREATE TABLE class_sessions (
      id INT GENERATED BY DEFAULT AS IDENTITY,
      start_time timestamptz,
      end_time timestamptz
    );
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    PostgreSQL‑Zeitstempel haben eine Mikrosekunden‑Präzision (6 Dezimalstellen).

    - Maximum: `.123456` (6 Ziffern)
    - Nanosekunden (9 Ziffern) werden auf die unterstützte Präzision gerundet oder abgeschnitten
    - Zeitzonen‑Offsets werden für `timestamptz` akzeptiert, sind aber nicht zwingend erforderlich

    **Nicht so häufiges Gotcha:** Einige Sprachen/Frameworks senden Nanosekunden‑Präzision, aber PostgreSQL speichert Zeitstempel mit Mikrosekunden‑Präzision.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={12}
  group="Postgres-Typen"
  title="Ungültige Typen identifizieren"
  options={[
    {text: 'lseg'},
    {text: 'bytea'},
    {text: 'tsquery'},
    {text: 'tsvector'},
    {text: 'tsrank', isAnswer: true},
  ]}
>
  <slot name="question">
  <div className="question">
    Welcher dieser ist ❌ kein gültiger PostgreSQL‑Typ?

    (Im Ernst, das sind (meist) echte Typen.)
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    PostgreSQL hat mehrere geometrische und Volltext‑Suchtypen eingebaut, aber `tsrank` gehört nicht dazu.

    Die korrekten geometrischen und Volltext‑Suchtypen sind:
    - `lseg` (Liniensegment)
    - `bytea` (Binärdaten)
    - `tsquery` (Volltext‑Suchanfrage)
    - `tsvector` (Volltext‑Dokument)
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={13}
  group="Einschränkungen"
  title="Zeitpunkt der Check-Constraint"
  options={[
    {text: 'Sofort für neue oder geänderte Zeilen', isAnswer: true},
    {text: 'Beim Transaktionsabschluss'},
    {text: 'Bei der nächsten Abfrage'},
    {text: 'Niemals – Constraints werden nur bei INSERT geprüft'},
  ]}
>
  <slot name="question">
  <div className="question">
    Wann wird diese Grade-Constraint geprüft?
    ```sql
    ALTER TABLE students 
    ADD CONSTRAINT valid_grade 
    CHECK (
      (grade >= 0 AND grade <= 100) OR 
      grade IS NULL
    ) NOT VALID;
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    `NOT VALID`-Constraints:
    - Werden sofort für neue Inserts und Updates geprüft
    - Validieren nicht vorhandene Zeilen
    - Können vorhandene Zeilen später mit `VALIDATE CONSTRAINT` validieren
    - Sind nützlich für große Tabellen

    Ohne `NOT VALID`:
    - Constraint wird sofort geprüft
    - Alle vorhandenen Zeilen werden validiert
    - Kann bei großen Tabellen langsam sein
  </div>
  </slot>
</Challenge>

</QuizUI>

Gut gemacht! Du hast inmehreren Bereichen von PostgreSQL tief gegraben! 🐘

Ich hoffe, du hast etwas Neues gelernt oder zumindest eine Punktzahl, mit der du prahlen kannst! 🏆

<p class="inset">Sieh dir [Teil 2](../quiz-postgres-sql-mastery-pt2/) für mehr Postgres‑Spaß an! 🚀</p>

Willst du mehr Nervenkitzel im Leben? Schau dir meine [Quiz‑Sammlung](../challenges/) für endlosen* Spaß an!
````
