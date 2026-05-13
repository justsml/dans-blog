# Translation Candidate
- Slug: quiz-sql-query-fundamentals
- Locale: de
- Model: openrouter/qwen/qwen3-32b:nitro
- Target: src/content/posts/2024-11-08--quiz-sql-query-fundamentals/de/index.mdx
- Validation: rejected: direct AI SDK translation failed
- Runtime seconds: 4.45
- Input tokens: unknown
- Output tokens: unknown
- Thinking tokens: unknown
- Cached input tokens: unknown
- Cache write tokens: unknown
- Estimated cost: unknown
- Pricing source: unknown
- Note: Command failed: bun run i18n:translate:chunked -- --slug quiz-sql-query-fundamentals --locale de --model openrouter/qwen/qwen3-32b:nitro --chunk 6p --quiz-concurrency 20
## Raw Output

````mdx
---
unlisted: false
title: 'Quiz: Beweise deine SQL‑Fähigkeiten!'
subTitle: Sind Sie Team SQL oder NoSQL?
label: SQL 101
social_image: ../desktop-social.webp
category: Quiz
subCategory: Database
date: '2024-11-08'
modified: '2024-11-08'
tags:
  - quiz
  - intro
  - sql
  - core
  - fundamentals
  - beginner
  - intermediate
cover_full_width: ../peter-thomas-os14nsuXdI4-unsplash-wide.webp
cover_mobile: ../peter-thomas-os14nsuXdI4-unsplash-square.webp
cover_icon: ../peter-thomas-os14nsuXdI4-unsplash-square.webp
---
import Challenge from '../../../../../components/QuizUI/Challenge';
import QuizUI from '../../../../../components/QuizUI/QuizUI';


## Testen Sie Ihre SQL‑Grundlagen

Macht Ihnen die Arbeit mit einem ORM das SQL‑Handwerk schwer?  
Keine Sorge, das geht vielen Entwicklern so.

Legen Sie los und beweisen Sie Ihre SQL‑Kenntnisse! 👇

<QuizUI>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={0}
  group="SQL Grundlagen"
  title="Einfacher WHERE-Abschnitt"
  options={[
    {text: 'SELECT * FROM users WHERE name LIKE(John);'},
    {text: 'SELECT * FROM users WHERE name = \', isAnswer: true},
    {text: 'SELECT * FROM users WHERE name == "John";'},
    {text: 'SELECT * FROM users WHERE name === "John";'},
  ]}
>
  <slot name="question">
  <div className="question">
    Welcher der folgenden SQL‑Abfragen ruft korrekt Zeilen ab, bei denen der Name "John" ist?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    In SQL wird das einfache Gleichheitszeichen (`=`) für Gleichheitsprüfungen im `WHERE`‑Clause verwendet, nicht `==` oder `===`, das sind JavaScript‑Operatoren.

    Die korrekte Syntax lautet `SELECT * FROM users WHERE name = 'John';`.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={1}
  group="SQL Grundlagen"
  title="Aggregatfunktion COUNT"
  options={[
    {text: 'Zählt alle Zeilen, einschließlich NULL-Werten'},
    {text: 'Zählt nur Nicht-NULL-Werte in einer Spalte', isAnswer: true},
    {text: 'Zählt NULL-Werte als einen eindeutigen Wert'},
    {text: 'Behandelt jeden NULL-Wert als eindeutig, ähnlich wie NaN !== NaN'},
  ]}
>
  <slot name="question">
  <div className="question">
    Was macht `COUNT(column_name)` in SQL?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    `COUNT(column_name)` zählt die Anzahl der Nicht-NULL-Werte in einer angegebenen Spalte. Um alle Zeilen, einschließlich NULLs, zu zählen, verwende `COUNT(*)`.

    Du kannst auch `COALESCE` benutzen, um sicherzustellen, dass NULLs zu einem Nicht-NULL-Wert defaulten. Zum Beispiel: `COUNT(COALESCE(column_name, 0))`.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={2}
  group="SQL-Joins"
  title="LEFT JOIN Grundlagen"
  options={[
    {text: 'Gibt für jede passende Zeile genau eine Zeile zurück und ignoriert nicht passende Zeilen'},
    {text: 'Gibt alle Zeilen der linken Tabelle zurück, plus die passenden Zeilen der rechten Tabelle', isAnswer: true},
    {text: 'Gibt alle passenden oder nicht passenden Zeilen zurück, wobei NULLs das Fehlen einer Übereinstimmung anzeigen'},
    {text: 'Gibt alle Zeilen der rechten Tabelle zurück, mit allen passenden Zeilen der linken Tabelle'},
  ]}
>
  <slot name="question">
  <div className="question">
    Was macht ein `LEFT JOIN` in SQL?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Ein `LEFT JOIN` gibt alle Zeilen der linken Tabelle und die passenden Zeilen der rechten Tabelle zurück, wobei nicht passende Zeilen in der rechten Tabelle mit NULL gefüllt werden.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={3}
  group="SQL Joins"
  title="Verwendung von INNER JOIN"
  options={[
    {text: 'Gibt nicht passende Zeilen aus beiden Tabellen zurück'},
    {text: 'Gibt alle Zeilen aus beiden Tabellen zurück, mit NULL für nicht passende Zeilen'},
    {text: 'Gibt Zeilen zurück, die die Join‑Bedingung in beiden Tabellen erfüllen', isAnswer: true},
    {text: 'Gibt nicht passende Zeilen aus der rechten Tabelle zurück'},
  ]}
>
  <slot name="question">
  <div className="question">
    Was macht ein `INNER JOIN` in SQL?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Ein `INNER JOIN` gibt Zeilen zurück, bei denen die Join‑Bedingung Zeilen aus beiden Tabellen entspricht. Nicht passende Zeilen werden nicht im Ergebnis enthalten.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={4}
  group="SQL-Unterabfragen"
  title="Korreliertes Unterabfrage"
  options={[
    {text: 'Eine Unterabfrage, die einmal insgesamt ausgeführt wird'},
    {text: 'Eine Unterabfrage, die nur in JOIN‑Anweisungen verwendet wird'},
    {text: 'Eine Unterabfrage, die ausschließlich mehrere Spalten zurückgibt'},
    {text: 'Eine Unterabfrage, die für jede Zeile der äußeren Abfrage einmal ausgeführt wird', isAnswer: true},
  ]}
>
  <slot name="question">
  <div className="question">
    Was ist eine korrelierte Unterabfrage in SQL?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Eine korrelierte Unterabfrage wird einmal pro Zeile der äußeren Abfrage ausgewertet. Sie bezieht sich auf Spalten der äußeren Abfrage und ist damit von jeder Zeile abhängig.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={5}
  group="SQL‑CTEs"
  title="WITH‑Klausel‑Syntax"
  options={[
    {text: 'Nur in DELETE‑Anweisungen erlaubt'},
    {text: 'Wird für Aggregationsfunktionen verwendet'},
    {text: 'Nur zur Definition von Views verwendet'},
    {text: 'Definiert ein temporäres Resultat‑Set zur Verwendung in einer größeren SQL‑Anweisung', isAnswer: true},
  ]}
>
  <slot name="question">
  <div className="question">
    Was ist der Zweck der `WITH`‑Klausel (Common Table Expression) in SQL?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Die `WITH`‑Klausel, oder Common Table Expression (CTE), wird verwendet, um ein temporäres Resultat‑Set zu definieren, das innerhalb der Hauptabfrage referenziert werden kann. In PostgreSQL kann `WITH` an Anweisungen wie `SELECT`, `INSERT`, `UPDATE`, `DELETE` oder `MERGE` angehängt werden.

    Das kann die Lesbarkeit und Wartbarkeit komplexer Abfragen verbessern.

    Die Syntax lautet:
    ```sql
    WITH cte_name AS (
    SELECT column_name
    FROM table_name
    )
    SELECT *
    FROM cte_name;
    ```
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={6}
  group="SQL Grundlagen"
  title="IS NULL vs IS NOT NULL"
  options={[
    {text: 'Überprüft, ob ein Wert NULL ist', isAnswer: true},
    {text: 'Überprüft, ob ein Wert leer ist'},
    {text: 'Überprüft, ob ein Wert ein String ist'},
    {text: 'Überprüft, ob ein Wert numerisch ist'},
  ]}
>
  <slot name="question">
  <div className="question">
    Was macht der `IS NULL`‑Operator in SQL?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    `IS NULL` prüft, ob eine angegebene Spalte einen NULL‑Wert enthält. `IS NOT NULL` prüft das Gegenteil.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={7}
  group="SQL‑Operatoren"
  title="Verwendung des IN-Operators"
  options={[
    {text: 'Gibt eindeutige Zeilen zurück'},
    {text: 'Erfordert eine indizierte Spalte'},
    {text: 'Gilt nur für numerische Spalten'},
    {text: 'Gibt Zeilen zurück, die den Werten in einer angegebenen Liste entsprechen', isAnswer: true},
  ]}
>
  <slot name="question">
  <div className="question">
    Was macht der `IN`‑Operator in SQL?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Der `IN`‑Operator filtert Zeilen, sodass sie zu irgendeinem Wert in einer angegebenen Liste passen, häufig als Alternative zu mehreren OR‑Bedingungen.

    Während er *möglicherweise* "eindeutige Zeilen" zurückgibt (und das oft tut), ist das nicht unbedingt der Hauptzweck.

    Indexierung ist hier nicht erforderlich, obwohl es durchaus eine bewährte Praxis ist, `IN` auf einer Spalte mit Index zu verwenden, vorzugsweise einem `UNIQUE`‑Index, da dies die Leistung verbessern kann.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={8}
  group="SQL-Funktionen"
  title="Verwendung der COALESCE-Funktion"
  options={[
    {text: 'Zählt NULL-Werte'},
    {text: 'Gibt das letzte Nicht-NULL-Argument zurück'},
    {text: 'Gibt das erste Nicht-NULL-Argument zurück', isAnswer: true},
    {text: 'Begrenzt auf IDENTITY-Spalten'},
    {text: 'Ursprünglich von Printer Coalation'},
  ]}
>
  <slot name="question">
  <div className="question">
    Was macht die `COALESCE`-Funktion in SQL?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Die `COALESCE`-Funktion gibt den ersten Nicht-NULL-Wert in einer angegebenen Liste zurück und ist nützlich, um Standardwerte zu substituieren, wenn NULL‑Werte auftreten.

    Zum Beispiel würde `COALESCE(column_name, 0)` `0` zurückgeben, wenn `column_name` `NULL` ist.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={9}
  group="SQL-Aggregatfunktionen"
  title="Verwendung von GROUP BY"
  options={[
    {text: 'Versteckt Duplikate'},
    {text: 'Nur in Joins verwendet'},
    {text: 'Sortiert Zeilen aufsteigend'},
    {text: 'Gruppiert Zeilen nach den angegebenen Spalten', isAnswer: true},
    {text: 'Die Syntax sollte GROUP WITH/USING sein'},
  ]}
>
  <slot name="question">
  <div className="question">
    Was ist der Zweck der `GROUP BY`-Klausel in SQL?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Die `GROUP BY`-Klausel gruppiert Zeilen, die in den angegebenen Spalten gleiche Werte haben, sodass Aggregatfunktionen auf jede Gruppe angewendet werden können.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={10}
  group="SQL-Joins"
  title="FULL OUTER JOIN Grundlagen"
  options={[
    {text: 'Gibt nur passende Zeilen zurück'},
    {text: 'Gibt nur Zeilen mit nicht-NULL-Werten zurück'},
    {text: 'Gibt nur nicht passende Zeilen der linken Tabelle zurück'},
    {text: 'Gibt nur nicht passende Zeilen der rechten Tabelle zurück'},
    {text: 'Gibt alle Zeilen beider Tabellen zurück, mit NULLs für nicht passende Zeilen', isAnswer: true},
  ]}
>
  <slot name="question">
  <div className="question">
    Was macht ein `FULL OUTER JOIN` in SQL?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Ein `FULL OUTER JOIN` gibt alle Zeilen beider Tabellen zurück und füllt nicht passende Zeilen mit NULLs für fehlende Werte.

    Das ist nützlich, um zwei Tabellen zu vergleichen und Unterschiede zwischen ihnen zu finden.
  </div>
  </slot>
</Challenge>

</QuizUI>
````
