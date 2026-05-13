# Translation Candidate
- Slug: quiz-postgres-sql-mastery-pt1
- Locale: it
- Model: openrouter/qwen/qwen3-32b:nitro
- Target: src/content/posts/2024-11-27--quiz-postgres-sql-mastery-pt1/it/index.mdx
- Validation: rejected: direct AI SDK translation failed
- Runtime seconds: 114.92
- Input tokens: 12939
- Output tokens: 12751
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- Estimated cost: $0.004095
- Pricing source: local-openrouter-estimate
- Note: Command failed: git add src/content/posts/2024-11-27--quiz-postgres-sql-mastery-pt1/it/index.mdx reports/i18n/quiz-postgres-sql-mastery-pt1/it
## Raw Output

````mdx
---
unlisted: false
social_image: ../mobile.webp
title: 'Quiz: Profondo Postgres: Parte 1'
subTitle: SQL ti fa impazzire?
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

> **Parte 1 di 2.** [Vai alla Parte 2](../quiz-postgres-sql-mastery-pt2/)

<p class="inset">PostgreSQL 🐘 è facilmente il mio database preferito! Sono sempre in apprendimento di nuovi trucchi e insidie, quindi ho deciso di raccoglierli in un nuovo Quiz!</p>

Questo quiz copre una miscela di funzionalità e insidie PostgreSQL note e meno note: dagli aggregati integrati al cast dei tipi, ai vincoli e altro ancora.

Buona fortuna! 🍀

<QuizUI>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={0}
  group="Riscaldamento: Funzioni"
  title="Aggregazioni integrate"
  options={[
    {text: 'MIN'},
    {text: 'MAX'},
    {text: 'AVG'},
    {text: 'MEDIAN', isAnswer: true},
  ]}
>
  <slot name="question">
  <div className="question">
    Quale NON è una funzione di aggregazione integrata in PostgreSQL?
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
    `MEDIAN` non è integrato! Devi usare:
    ```sql
        PERCENTILE_CONT(0.5) 
        WITHIN GROUP (ORDER BY grade)
    ```
    Aggregazioni integrate comuni:
    - `MIN`, `MAX`, `COUNT`
    - `AVG`, `SUM`
    - `ARRAY_AGG`, `STRING_AGG`
    - Diverse funzioni statistiche
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={1}
  group="Riscaldamento: Casting dei tipi"
  title="Variazioni della sintassi di cast"
  options={[
    {text: '\'95\'::INTEGER'},
    {text: 'INTEGER \'95\''},
    {text: 'CAST(\'95\', INTEGER)', isAnswer: true},
    {text: 'CAST(\'95\' AS INTEGER)'},
  ]}
>
  <slot name="question">
  <div className="question">
    Quale di queste conversioni di tipo è **invalida** ❌?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    PostgreSQL supporta tre sintassi per il cast:

    1. ANSI SQL: `CAST(espressione AS tipo)`.
    2. PostgreSQL: `espressione::tipo`.
    3. Funzione di tipo: `tipo 'letterale'`.

    Sono tutte funzionalmente equivalenti, ma:
    - `CAST()` è più portabile.
    - `::` è specifico di PostgreSQL ma comunemente utilizzato.
    - Lo stile infisso `tipo 'letterale'` è meno comune ma ancora valido.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={2}
  group="Vincoli"
  title="Vincoli UNIQUE e NULL"
  options={[
    {text: 'Non sono ammessi NULL'},
    {text: 'Un solo NULL ammesso'},
    {text: 'Più NULL ammessi', isAnswer: true},
    {text: 'Dipende dalla versione di PostgreSQL'},
  ]}
>
  <slot name="question">
  <div className="question">
    Quanti valori NULL sono ammessi qui?
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
    I vincoli UNIQUE in PostgreSQL:
    - Consentono più valori NULL.
    - `NULL` ≠ `NULL` nei controlli di unicità.

    Per vietare i valori NULL, aggiungi `NOT NULL`:
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
  group="Data/Ora"
  title="Aritmetica delle date"
  options={[
    {text: '2024-11-27'},
    {text: '2024-11-27 00:00:00'},
    {text: '2024-11-28'},
    {text: '2024-11-28 00:00:00', isAnswer: true},
    {text: 'Errore: orario non valido'},
  ]}
>
  <slot name="question">
  <div className="question">
    Cosa restituisce questo?
    ```sql
        SELECT '2024-11-27'::date + interval '24 hours';
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Gli intervalli sono uno strumento potente per semplificare le operazioni su intervalli di date!

    Aritmetica delle date in PostgreSQL:
    - `+ interval '24 hours'` aggiunge 24 ore
    - `+ interval '1 day'` aggiunge 1 giorno
    - `+ interval '1 month'` aggiunge 1 mese
    - `+ interval '1 year'` aggiunge 1 anno

    Il risultato è `2024-11-28 00:00:00`.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={4}
  group="Ora"
  title="timestamptz vs timestamp"
  options={[
    {text: 'Occupano entrambi 8 byte, ma rappresentano semantiche diverse per i timestamp', isAnswer: true},
    {text: 'timestamptz preserva qualsiasi timezone di input'},
    {text: 'timestamptz memorizza il nome o l\'offset originale del timezone'},
    {text: 'timestamptz memorizza un valore da 2 byte per il fuso orario (TZ)'},
    {text: 'timestamptz è il successore di timestamp'},
    {text: 'timestamptz is the successor to timestamp'},
  ]}
>
  <slot name="question">
  <div className="question">
    Qual è l'affermazione **più precisa** riguardo a `timestamptz` e `timestamp`?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Entrambi occupano 8 byte, ma non memorizzano lo stesso tipo di valore.

    Qual è la differenza? Sta nella parsing degli input.

    **`timestamptz`**
    - Normalizza l'input in un punto assoluto nel tempo.
    - Considera l'impostazione `TimeZone` del server/connessione durante il parsing degli input senza offset esplicito e durante l'output.

    **`timestamp`**
    - Memorizza una data e un orario senza conversione del fuso orario.
    - Non preserva o normalizza informazioni sui fusi orari.


    **`timestamp`**

    - Memorizza la data e l'orario senza informazioni sul fuso orario.
    - Utile per memorizzare in modo esplicito date standardizzate, in UTC o in un fuso orario specifico.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={5}
  group="Tipi Postgres"
  title="Identifica i tipi non validi"
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
    Quale di questi NON è ✖ un tipo PostgreSQL valido?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    PostgreSQL ha un ricco insieme di tipi di dati, ma `STRING(100)` non è uno di essi.

    I tipi stringa validi includono:
    - `VARCHAR(100)` (stringa di lunghezza variabile)
    - `CHAR(100)` (stringa di lunghezza fissa)
    - `TEXT` (lunghezza illimitata)
    - `CHARACTER VARYING(100)` (equivalente a `VARCHAR(100)`)
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={6}
  group="Tipi di Postgres"
  title="Identifica i tipi non validi"
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
    Quale di questi NON è ✅ un tipo valido di PostgreSQL?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Potrebbe sembrare familiare poiché `decimal128` è un tipo in molti luoghi (inclusi Mongo e Java). Non è un tipo valido in PostgreSQL, `decimal` lo è.

    I tipi numerici corretti includono:
    - `int` (intero a 4 byte)
    - `bigint` (intero a 8 byte)
    - `real` (virgola mobile a 4 byte)
    - `double precision` (virgola mobile a 8 byte)
    - `bigserial` (intero a 8 byte incrementabile automaticamente)
    - `smallserial` (intero a 2 byte incrementabile automaticamente)
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={7}
  group="Tipi di Postgres"
  title="Identifica i tipi non validi"
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
    Quale di questi NON è un tipo valido di PostgreSQL?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Ti ha fatto arrabbiare? Anche a me! Per citare un contributore "core" anonimo: "ma che diavolo, Dan?! Ho sbagliato le domande sui tipi! È violento, signore! Non condividerò il mio punteggio, hah." 😈 Benvenuto nel club.

    I ricchi tipi di rete di PostgreSQL non includono `ipv4`. Ogni volta che provo a usarlo senza cercare su Google, mi sbaglio. Forse `macaddr8` mi fa pensare che debbano esistere i tipi `ipv4` e `ipv6`. No, `inet` copre entrambi. Anche `cidr` copre le maschere di rete per entrambi.

    I tipi di rete validi includono:
    - `cidr` (indirizzo di rete IPv4/IPv6)
    - `inet` (indirizzo host IPv4/IPv6)
    - `macaddr` (indirizzo MAC)
    - `macaddr8` (indirizzo MAC EUI-64)
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={8}
  group="Tipi di Postgres"
  title="Identifica i tipi non validi"
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
    Quale di questi NON è ✅ un tipo valido di PostgreSQL?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    PostgreSQL ha un ricco set di tipi specializzati, ma `currency` non è uno di essi!

    I tipi validi includono:
    - `xml` (dati XML)
    - `uuid` (UUID)
    - `money` (importo in valuta)
    - `interval` (intervallo di tempo)
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={9}
  group="Tipi di Postgres"
  title="Identifica i tipi non validi"
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
    Quale di questi NON è ❌ un tipo PostgreSQL valido?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    PostgreSQL ha un ricco insieme di tipi specializzati, ma `triangle` non è tra questi.

    Credo che nelle prossime versioni di [GEOS](https://libgeos.org/) verrà aggiunto il supporto per `Triangle` OGC/WKT, il che significa che probabilmente verrà incluso in futuro in Postgis. (In pratica, questa risposta potrebbe essere sbagliata in futuro.)

    I tipi specializzati corretti includono:
    - `box` (rettangolo)
    - `line` (linea infinita)
    - `point` (punto 2D)
    - `circle` (cerchio 2D)
    - `polygon` (poligono 2D)
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={10}
  group="Aritmetica degli interi"
  title="Overflow degli interi"
  options={[
    {text: '4294967296'},
    {text: 'Errore: intero fuori intervallo', isAnswer: true},
    {text: '0'},
    {text: '2147483647'},
  ]}
>
  <slot name="question">
  <div className="question">
    Cosa succede quando si calcola il numero totale di ID studenti possibili?
    ```sql
        SELECT 256 * 256 * 256 * 256;
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Il tipo `integer` di PostgreSQL è a 32 bit con segno, con range da `-2.147.483.648` a `2.147.483.647`.

    Il calcolo `256^4` = `4.294.967.296` supera questo range.

    Per gestire numeri più grandi:
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
  group="Data/Ora"
  title="Precisione del timestamp"
  options={[
    {text: '2024-01-08 13:30:00+00'},
    {text: '2024-01-08 13:30:00.123456+00'},
    {text: '2024-01-08 13:30:00.123456789+00'},
    {text: '2024-01-08 13:30:00.1234567', isAnswer: true},
  ]}
>
  <slot name="question">
  <div className="question">
    Quale è il più piccolo letterale `timestamp` che supera la precisione massima di `time` in Postgres?
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
    I timestamp PostgreSQL hanno una precisione in microsecondi (6 decimali).

    - Massimo: `.123456` (6 cifre)
    - I nanosecondi (9 cifre) vengono arrotondati o troncati alla precisione supportata
    - Gli offset di fuso orario sono accettati per `timestamptz`, ma non obbligatori

    **Trappola poco comune:** Alcuni linguaggi/framework inviano precisione in nanosecondi, ma PostgreSQL memorizza i timestamp con precisione in microsecondi.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={12}
  group="Tipi di Postgres"
  title="Identifica i tipi non validi"
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
    Quale di questi NON è un tipo PostgreSQL valido?

    (Seriamente, questi sono (per lo più) tipi reali.)
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    PostgreSQL ha diversi tipi geometrici e di ricerca testuale integrati, ma `tsrank` non è uno di essi.

    I tipi geometrici e di ricerca testuale corretti includono:
    - `lseg` (segmento di linea)
    - `bytea` (dati binari)
    - `tsquery` (query di ricerca testuale)
    - `tsvector` (documento di ricerca testuale)
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={13}
  group="Vincoli"
  title="Timing dei vincoli di controllo"
  options={[
    {text: 'Immediatamente per nuove o modificate righe', isAnswer: true},
    {text: 'Al commit della transazione'},
    {text: 'Alla prossima query'},
    {text: 'Mai - i vincoli vengono verificati solo su INSERT'},
  ]}
>
  <slot name="question">
  <div className="question">
    Quando viene verificato questo vincolo sui voti?
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
    `NOT VALID` constraints:
    - Vengono verificati immediatamente per nuovi inserimenti e aggiornamenti
    - Non validano le righe esistenti
    - Possono validare le righe esistenti in seguito con `VALIDATE CONSTRAINT`
    - Sono utili per tabelle molto grandi

    Senza `NOT VALID`:
    - Il vincolo viene verificato immediatamente
    - Vengono validate tutte le righe esistenti
    - Può essere lento su tabelle molto grandi
  </div>
  </slot>
</Challenge>

</QuizUI>

Bravo! Hai approfondito diverse aree di PostgreSQL! 🐘

Spero che tu abbia imparato qualcosa di nuovo, o almeno abbia ottenuto un punteggio di cui vantarti! 🏆

<p class="inset">Scopri [Parte 2](../quiz-postgres-sql-mastery-pt2/) per ulteriore divertimento con Postgres! 🚀</p>

Vuoi più emozioni nella vita? Controlla la mia [Collezione di Quiz](../challenges/) per un divertimento senza fine*!
````
