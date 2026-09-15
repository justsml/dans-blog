# German quiz corpus review

Reviewed 2026-09-14: all 19 German quiz translations, 267 questions. Review covered question meaning, choices, correct-answer mapping, explanations, hints, and technical literals against the current English files. Final localized MDX was edited directly. No external AI judge was called and no historical quality score or sourceHash frontmatter was relabeled as current.

## Changes

- Restored exact program outputs in Bash, destructuring, Rust, Node streams, ESNext and Error.cause; localized explanatory prose stays German. Kept S3's English expansion so its acronym remains understandable.
- Propagated source corrections for Node Buffer allocation/object mode, correlated SQL and indexing, DynamoDB UpdateItem and capacity, S3 consistency, HTML dd/figure choices, DSA ambiguity, CSS text alignment, and Promise recovery.
- Clarified Date function versus constructor, NaN from Date.UTC, timezone assumptions on individual slides, and variable console formatting.
- Corrected cross-realm Error recognition and spoofable toStringTag; distinguished missing destructuring objects from missing properties.
- Restored 44 difficulty/objective sets for Rust/AWS with German objectives, missing hint slots, BigInt introduction, and the TypeScript heading and final quiz-collection link. Filled all omitted source hints: 11 ESNext and 20 DSA hints are now specific to each question; all 14 Errors hints are translated.
- Replaced incomplete or generic AWS hints with explanations tied to the selected option. Standardized lifetime as Lebensdauer, SQL clauses as Klausel, BFS/DFS as Breitensuche/Tiefensuche with English identifiers. Corrected backup data protection from Datenschutz to Datensicherung and point-in-time recovery to Wiederherstellung zu einem bestimmten Zeitpunkt.

## Terminology evidence

The existing German [Visualizing Promises article](../../../src/content/posts/2018-09-30--visualizing-promises/de/index.mdx) uses Promises, Callback and .then unchanged (lines 24–36, 84–105); these identifiers remain English, while fulfillment/rejection behavior is explained in German. The German [foreign-key article](../../../src/content/posts/2025-12-29--your-foreign-keys-are-killing-performance/de/index.mdx) uses Fremdschlüssel and GIN-Index (line 61), supporting Index/Fremdschlüssel instead of forced word-for-word translations. Across the German SQL quizzes, Abfrage, Klausel, Bezeichner and Zeichenkettenliteral identify distinct concepts. Across the JS interfaces/errors quizzes, Eigenschaft and aufzählbar consistently describe property/enumerable; API names and literal output tokens remain untouched. Rust's lifetime vocabulary was consolidated to Lebensdauer, matching its existing struct and RefCell explanations, while Rc/Arc/Box/Send/Sync remain API names.

## Verification boundary

A fresh parser comparison confirms all 267 questions have the same number of options and same correct-answer positions as their English sources, and every question/explanation/hint code fence matches modulo whitespace. All offered choices were read for meaning and literal-output consistency. Actual browser selection and rendering are covered by the parent task's corpus-wide Playwright run; this ledger does not claim a separate German browser run.

Final source alignment: all 19 English sources were rechecked against frozen commit 35c81f213. Late changes to BigInt parsing/table, CSS standards-mode ID matching, the destructuring TypeError example, and the Error prototype/tag hint are incorporated. All 19 scoped i18n validators pass. The strengthened corpus regression suite also passes all 19 German cases (2,296 assertions), including preservation of nonempty source hints. The hashes below identify exactly the reviewed final English and German texts.

## Per-question answer audit

Numbers are one-based choice positions, not proof of independent program execution. Each question's full option list, question, explanation and present hints was reviewed; the correct choice below is the retained semantic answer.

### javascript-promises-quiz

- Questions: 9
- English SHA-256: `ead6cb486ce9cef02d253b30715e77820dde44c9a310546a0532e7164078dd5a`
- German SHA-256: `177fe224bdddd01a00149d26ffb3b3ba472c551cba40a64bf3c3ec8f8016d7d3`

| Question | Correct choice | Reviewed answer |
|---|---:|---|
| 1: Mehrere .catch-Aufrufe #1 | 2 | Nachricht zweimal ausgeben |
| 2: Mehrere .catch's #2 | 3 | unbehandelte abgelehnte Promise |
| 3: Verkettung von .then und .catch | 1 | gibt Fehler und undefined aus |
| 4: Verkettung von .catchs | 1 | Fehlermeldung einmal ausgeben |
| 5: Mehrere .catchs | 4 | nichts wird ausgegeben |
| 6: Ablauf zwischen .thens | 3 | gibt "SUCCESS!" aus |
| 7: Ablauf zwischen .then's | 3 | gib "SUCCESS!" und "SUCCESS!" aus |
| 8: Ablauf zwischen .then-Aufrufen | 4 | gibt undefined aus |
| 9: Ablauf zwischen .then- und .catch-Blöcken | 3 | gib "The fails!" aus |

### js-quiz-14-date-time-questions-test-your-knowledge

- Questions: 14
- English SHA-256: `989751b2ad3098d09729710992be6df598d713b5e494fbb8a539c85cf39cc780`
- German SHA-256: `920330f58b5f829a5be6a9d47482641de544d3be45118affc0cee4c2b7508151`

| Question | Correct choice | Reviewed answer |
|---|---:|---|
| 1: Date-Konstruktor Teil 1 | 2 | Feb 01 2020 |
| 2: Date-Konstruktor Teil 2 | 1 | Jan 01 2020 |
| 3: Date-Konstruktor Teil 3 | 4 | Aktuelles Datum |
| 4: Date-Konstruktor Teil 4 | 1 | 1969 |
| 5: Parsen von Datums-Strings | 1 | 2019 2020 |
| 6: Formatierung Teil 1 | 2 | date.toLocaleFormat('en-US') |
| 7: UTC-Daten Teil 1 | 3 | TypeError |
| 8: UTC-Daten Teil 2 | 3 | Millisekunden seit dem 1. Januar 1970 GMT |
| 9: UTC-Daten Teil 3 | 2 | 420 |
| 10: Date Setters Teil 1 | 1 | Jan 01 2020 |
| 11: Datum-Setter Teil 2 | 2 | Feb 01 2020 |
| 12: Datum-Setter Teil 3 | 2 | Jan 01 2021 |
| 13: Date Setters Teil 4 | 4 | Feb 01 2021 |
| 14: Datum-Setter Teil 5 | 4 | Dec 01 2019 |

### quiz-data-structures-algorithms

- Questions: 20
- English SHA-256: `bbe16f991f17d61caaf6a3d510caa7d4dd771d1113bbbdd157319831abc66dd7`
- German SHA-256: `f8273f9fad188f66f626f822b045b245c450f438326520e3d216a5d0570ded0d`

| Question | Correct choice | Reviewed answer |
|---|---:|---|
| 1: Stapel vs Warteschlangen | 3 | Stapel |
| 2: Big-O-Notation | 1 | O(1) |
| 3: Längenberechnung einer verketteten Liste | 4 | O(n) |
| 4: Suche im Binären Suchbaum | 2 | O(log n) |
| 5: Merge‑Sort‑Komplexität | 3 | O(n log n) |
| 6: DFS vs BFS | 1 | Warteschlange |
| 7: Zykluserkennung in Graphen | 4 | Tiefensuche (DFS) |
| 8: Heap‑Sort‑Komplexität | 2 | O(n log n) |
| 9: Hash-Tabellen-Zeitkomplexität | 3 | O(1) |
| 10: Stack-Operationen | 1 | Push, Pop, Peek |
| 11: Algorithmus für den kürzesten Pfad | 4 | Dijkstra-Algorithmus |
| 12: Selbstbalancierende Suchbäume | 2 | AVL‑Baum und Rot-Schwarz‑Baum |
| 13: Rekursions-Basisfall | 3 | Basisfall |
| 14: Warteschlangen-Operationen | 1 | Enqueue und Dequeue |
| 15: Topologische Sortierung | 4 | Der Graph muss gerichtet und azyklisch sein |
| 16: Fibonacci-Rekursionskomplexität | 2 | O(2^n) |
| 17: Implementierung einer Prioritätswarteschlange | 3 | Heap |
| 18: Binärbaum-Traversierungen | 1 | In-order, Pre-order, Post-order |
| 19: Heap-Eigenschaft | 4 | Die Wurzel ist das kleinste Element und die Höhe ist O(log n) |
| 20: Stabilität von Bubble Sort | 2 | Stabil |

### quiz-do-you-know-esnext

- Questions: 11
- English SHA-256: `63cd3ddef63907f8281b7060db5b8004bf7bac2067f84fcdf01ca8bd8b18c3fb`
- German SHA-256: `f596242342d406f2504241f54aeee107e53fedbcaf784eae19da4bebbcac61dc`

| Question | Correct choice | Reviewed answer |
|---|---:|---|
| 1: Null‑Koaleszenz | 4 | 100 |
| 2: Null-Koaleszenz | 1 | false |
| 3: Optionale Verkettung | 1 | undefined |
| 4: BigInt-Verwendung | 3 | 84n |
| 5: Dynamische Import‑Syntax | 4 | object |
| 6: Promise.allSettled | 1 | fulfilled: success |
| 7: String.matchAll Verwendung | 2 | Iterator von Treffern |
| 8: Import-Meta-Verwendung | 1 | URL des aktuellen Moduls |
| 9: Logische Zuweisung | 2 | 10 |
| 10: Logische Nullish-Zuweisung | 2 | 10 |
| 11: WeakRef-Verwendung | 2 | { data: 'important' } |

### quiz-js-interfaces-symbols-and-enumerables

- Questions: 7
- English SHA-256: `c31ed61019199a9690cb1c1f02182365a0ddb2c7c99eb9ad49da340c96dd83f9`
- German SHA-256: `221138832c901ce667c989d576b841ba076efbfd9d85859c2653dbe3d32383d6`

| Question | Correct choice | Reviewed answer |
|---|---:|---|
| 1: Getter vs Direkter Property-Zugriff | 3 | Greife direkt auf den Wert zu |
| 2: Verwendung von Symbolen in Objektschlüsseln | 1 | Verwendung eines Symbols |
| 3: Aufzählbare Eigenschaften | 4 | Ja, es wird aufgelistet |
| 4: Standard‑Enumerierbarkeit mit Object.defineProperty() | 2 | false |
| 5: Einzigartige Symbole | 3 | false |
| 6: Symbol-Schlüssel bei for...in | 1 | Nein, es wird nicht aufgelistet |
| 7: Alle Symbol-Schlüssel abrufen | 4 | Object.getOwnPropertySymbols() |

### quiz-master-modern-html5

- Questions: 14
- English SHA-256: `9320d673f59fafb3da0b9c01736b3b54a103301210b176a3e5c5c78e771b7b74`
- German SHA-256: `68c4d1a4c2ff7ff1e2bca6b00927a948b9ac37f78dd99724ec6175743ad1dcd5`

| Question | Correct choice | Reviewed answer |
|---|---:|---|
| 1: Rolle von <ul> | 1 | Ungeordnete Liste |
| 2: Verwendung von <dd> | 4 | Eine Beschreibung, Definition oder ein Wert zu einem Begriff in einer Beschreibungsliste |
| 3: Verwendung von <figure>/<figcaption> | 2 | Eigenständige Inhalte mit ihrer Beschriftung gruppieren |
| 4: Verwendung von <article> | 2 | Ein eigenständiger Inhaltsabschnitt |
| 5: Verwendung von <fieldset>/<legend> | 1 | Gruppieren von Formularelementen unter einer Überschrift |
| 6: Zweck von <meter> | 2 | Stellt einen numerischen Wert innerhalb eines Bereichs dar |
| 7: Verwendung von <source> | 2 | Deklariert verfügbare Medienformate |
| 8: Verwendung von <hgroup> | 4 | Eine Überschrift mit ihrem Untertitel gruppieren |
| 9: Verwendung von <menu> | 2 | Um Befehle oder Toolbar-Steuerelemente aufzulisten |
| 10: Rolle von <details>/<summary> | 1 | Native einklappbare Inhalte |
| 11: Zweck von <dialog> | 2 | Ein modales Fenster oder Popup deklarieren |
| 12: Verwendung von <time> | 1 | Um Datum und Uhrzeit darzustellen |
| 13: Zweck von ARIA-Attributen | 2 | Verbessern der Barrierefreiheit |
| 14: Verwendung des role-Attributs | 2 | Um den Zweck eines Elements zu beschreiben |

### quiz-can-you-count-to-bigint

- Questions: 13
- English SHA-256: `f7af3ca5f8ef55272d24882cc3612f0492277f3ce73ad21ddc7a952a7f4d6a8e`
- German SHA-256: `5f999fa4175d33c7b896f8f20c103e13d8c7d038274a675147e5ba8f5a9abb00`

| Question | Correct choice | Reviewed answer |
|---|---:|---|
| 1: Parsing mit parseInt | 1 | 123456 |
| 2: Umgang mit Komma | 1 | 123 |
| 3: Präzision bei Gleitkommazahlen | 2 | false |
| 4: Umgang mit Infinity | 1 | Infinity |
| 5: String-Konvertierung mit .toFixed() | 5 | "5.00" |
| 6: Gleichheitsvergleich zwischen parseInt und parseFloat | 1 | true |
| 7: Gleichheitsvergleich mit BigInt | 3 | false |
| 8: Hexadezimal‑Parsing | 1 | true |
| 9: Parsen mit Basis | 1 | 255 |
| 10: Verwendung von .map(parseInt) | 1 | [24, NaN, NaN] |
| 11: Verwendung von .map(Number) | 1 | [24, NaN, 34] |
| 12: Umgang mit null | 4 | NaN 0 |
| 13: Parsing mit Basis | 5 | 1112745 |

### quiz-modern-css-2025

- Questions: 11
- English SHA-256: `7254e27e26db35a72ca971a9fce8ae96d3cba30163bc6958ec3118e52e39704b`
- German SHA-256: `454704bebf0f8e9de0510d7a53604e58d1976f27797a54be293ce76f7f590d64`

| Question | Correct choice | Reviewed answer |
|---|---:|---|
| 1: Verwendung von CSS-Variablen | 3 | background-color: var(--main-color); |
| 2: CSS min()-Funktion | 2 | width: 200px; |
| 3: CSS max()-Funktion | 5 | width: 96px; |
| 4: CSS minmax()-Funktion | 3 | Spalte 1 wird zwischen 100 px und 200 px liegen |
| 5: CSS-Variablen-Fallbacks | 4 | #6b8e23 |
| 6: Verwendung von clamp() für responsives Design | 3 | Lineare Skalierung zwischen 200 px und 500 px |
| 7: Natives CSS-Nesting | 3 | Ja |
| 8: CSS-Nesting | 4 | Perfekt. Keine Anmerkungen. |
| 9: Direkter Kind-Selektor mit Verschachtelung | 2 | background-color: white |
| 10: CSS-Variable zur Laufzeit ändern | 2 | Mit JavaScript |
| 11: Verwendung von calc() mit CSS-Variablen | 3 | Breite: 110px |

### quiz-css-core-fundamentals

- Questions: 14
- English SHA-256: `ee5866dcab74b29fcaf99765c78fd8c474d51fbd357ed07af1c02059c59d81c7`
- German SHA-256: `430bb4ecf8ffc095b06226251ccdb96287ad255ced3fa268aab489f334f62d5e`

| Question | Correct choice | Reviewed answer |
|---|---:|---|
| 1: Ungültige CSS-Einheit für Schriftgröße | 1 | 10cx |
| 2: Hex-Codes | 3 | #ABCD |
| 3: Ups, alle Einheiten! | 14 | rel |
| 4: Selektoren den HTML-Elementen zuordnen | 4 | a#home[name='home'] |
| 5: Attribut-Selektor für einen Button | 4 | button[onclick] |
| 6: Ungültiger CSS-Selektor | 3 | c > > d {} |
| 7: Auswahl des letzten Links | 5 | a:last-child |
| 8: Selektor-Priorität | 3 | a#quote |
| 9: Text in einem Block-Element zentrieren | 4 | text-align: center; |
| 10: Vertikales Zentrieren eines Blockelements | 3 | align-content: center; |
| 11: Berechnung der Pixelgröße verschachtelter Schriftgrößen | 2 | 5px |
| 12: Pixelgröße mit REMs berechnen | 2 | 12px |
| 13: Pixelgröße mit EMs berechnen | 5 | 24px |
| 14: Selektoren mit Null-Spezifität | 1 | :where(.card) .title |

### quiz-sql-query-fundamentals

- Questions: 11
- English SHA-256: `4788ec9e33c53b4fb819c0e7e472f3a737b497b83add5049de127d7dcc4b32ad`
- German SHA-256: `af8b62f181a6d7cbc33e4f2197056e5d08ee1d3f16e88dedf37cd2589645a52c`

| Question | Correct choice | Reviewed answer |
|---|---:|---|
| 1: Einfacher WHERE-Klausel | 2 | SELECT * FROM users WHERE name = 'John'; |
| 2: Aggregatfunktion COUNT | 2 | Zählt nur Nicht-NULL-Werte in einer Spalte |
| 3: LEFT JOIN Grundlagen | 2 | Gibt alle Zeilen der linken Tabelle zurück, plus die passenden Zeilen der rechten Tabelle |
| 4: Verwendung von INNER JOIN | 3 | Gibt Zeilen zurück, die die Join‑Bedingung in beiden Tabellen erfüllen |
| 5: Korrelierte Unterabfrage | 4 | Eine Unterabfrage, die auf Spalten der äußeren Abfrage verweist |
| 6: WITH‑Klausel‑Syntax | 4 | Definiert ein temporäres Resultat‑Set zur Verwendung in einer größeren SQL‑Anweisung |
| 7: IS NULL vs IS NOT NULL | 1 | Überprüft, ob ein Wert NULL ist |
| 8: Verwendung des IN-Operators | 4 | Gibt Zeilen zurück, die den Werten in einer angegebenen Liste entsprechen |
| 9: Verwendung der COALESCE-Funktion | 3 | Gibt das erste Nicht-NULL-Argument zurück |
| 10: Verwendung von GROUP BY | 4 | Gruppiert Zeilen nach den angegebenen Spalten |
| 11: FULL OUTER JOIN Grundlagen | 5 | Gibt alle Zeilen beider Tabellen zurück, mit NULLs für nicht passende Zeilen |

### quiz-destructuring-delights

- Questions: 12
- English SHA-256: `0aa930822ea8a6b38914c30bcdb73e22de3e8910a0f92e5f0f6ab8c090fabd4d`
- German SHA-256: `f6fc5d446d539dfb8923ad03bf4d7692e679b88f8ff8e2e106ad2ec39fad37d0`

| Question | Correct choice | Reviewed answer |
|---|---:|---|
| 1: Grundlegendes Objekt-Destructuring | 4 | Name: Dan Levy, Age: undefined |
| 2: Standardwert bei Objekt-Destrukturierung | 3 | Name: Dan Levy, Age: undefined |
| 3: Verschachteltes Destructuring | 5 | Fehler |
| 4: Standardwerte bei Objekt-Destrukturierung | 5 | Fehler |
| 5: Standardwerte bei Objekt-Destrukturierung | 3 | Hi Dan from Unknown |
| 6: Destrukturieren von Funktionsparametern mit Standardwerten | 6 | Fehler |
| 7: Destrukturierung mit verschachtelten Standardwerten | 6 | N/A, N/A, Joburg |
| 8: Destrukturierung mit verschachtelten Standardwerten | 6 | null, N/A |
| 9: Destrukturierung mit verschachtelten Standardwerten | 5 | TypeScript-Fehler |
| 10: Destrukturierung mit verschachtelten Standardwerten | 5 | Denver |
| 11: Destrukturierung mit verschachtelten Standardwerten | 3 | Fehler: Eigenschaften 'birth' und 'age' fehlen |
| 12: Destrukturierung mit verschachtelten Werten, Zuweisung und Typen | 5 | Fehler |

### quiz-nodejs-files-streams-buffers-oh-my

- Questions: 15
- English SHA-256: `77b0246b9c8275d11d3ca3108732512ae203d0d5f45f379aeb5166c248928930`
- German SHA-256: `dfeb99cc0fec08bed34861837207b09987c61853fae627fd48d27e7b9ed9ff78`

| Question | Correct choice | Reviewed answer |
|---|---:|---|
| 1: Pufferzuweisung | 1 | Erstellt einen Puffer der Größe 5 mit Nullen |
| 2: Buffer-zu-String-Konvertierung | 1 | A |
| 3: Asynchrone Dateioperationen | 2 | Gibt "Done" aus, dann den Dateinhalt |
| 4: Dateien synchron lesen | 1 | Gibt einen Buffer zurück |
| 5: Stream‑Ereignisse | 1 | 'data', 'end', 'error', 'close' |
| 6: Stream-Piping | 2 | Kopiert die Datei in Blöcken, ohne sie vollständig zu puffern |
| 7: Verzeichnisoperationen | 1 | Erstellt bei Bedarf verschachtelte Verzeichnisse |
| 8: Transform-Streams | 2 | HELLO WORLD |
| 9: Dateiüberwachung | 2 | Nicht garantiert; kann mehrfach ausgelöst werden |
| 10: Buffer-Vergleich | 2 | false |
| 11: Stream-Backpressure | 1 | Verhindert Speicherüberlauf |
| 12: Symbolische Links | 3 | Erstellt einen symbolischen Link |
| 13: Stream‑Modi | 3 | Beide Modi |
| 14: Dateideskriptoren | 1 | Eine Zahl |
| 15: Pufferkodierung | 5 | 10 |

### quiz-regex-or-wreckage

- Questions: 16
- English SHA-256: `10ac88ad77540507d3992e3b6500e5cc1e13152dd22a82a20d0adce4ac8b4a25`
- German SHA-256: `c2afe4be07416a38181d941772287812552ac76d2061f40216cec1ba5b2edf9c`

| Question | Correct choice | Reviewed answer |
|---|---:|---|
| 1: Groß-/Kleinschreibung beachten | 3 | ["cat"] |
| 2: Einfaches Zeichen-Matching | 1 | ["cat", "hat"] |
| 3: Gierig vs Nicht-gierig | 4 | ["<div>Hello</div>", "<div>World</div>"] |
| 4: Wortzeichen und Zeilenumbrüche | 2 | ["hello", "world"] |
| 5: Positiver Look-ahead | 5 | null |
| 6: Wortgrenzen | 2 | ["cat"] |
| 7: Das globale Flag | 3 | ["a", "a", "a"] |
| 8: Negatives Look-behind | 3 | ["23", "456"] |
| 9: Erfassende Gruppen | 2 | ["2029", "12", "31"] |
| 10: Negatives Look-ahead | 4 | ["12"] |
| 11: Look-behind Aufteilung | 1 | ["a,", "b,", "c"] |
| 12: Escapen von Sonderzeichen | 4 | null |
| 13: Positiver Look-behind | 2 | ["100"] |
| 14: Lazy‑ vs Greedy‑Quantifier | 2 | ["bold"] |
| 15: Unicode-Flag | 2 | ["😀", "🙂"] |
| 16: Passwortvalidierung | 2 | "Sass123!" |

### quiz-bash-in-the-shell

- Questions: 16
- English SHA-256: `ea4b4440293b28444b461e783c6f33db1a9d797e64fa8a5987034d8dada9f631`
- German SHA-256: `f773d8586bcb092b9a1dba51ded01fbb48b2ecb1b1f91ccdd398115f8dace52d`

| Question | Correct choice | Reviewed answer |
|---|---:|---|
| 1: Variablendeklaration | 2 | name=Dan |
| 2: Escaping von Anführungszeichen | 3 | echo 'It'\''s 🔨 Time!' |
| 3: Echo-Befehl | 2 | cat cbt |
| 4: Zeichen escapen | 4 | Cost: 00 |
| 5: Teilstring ersetzen | 3 | Bark meow |
| 6: String-Länge | 3 | ${#username} |
| 7: Grundlegendes If-Else | 2 | File does not exist, nach einer Diagnose des Testbefehls |
| 8: String-Vergleich | 2 | Different cats, nach einem Syntaxfehler im Test |
| 9: Funktionsdeklaration | 1 | Hi |
| 10: Verwendung von Pipes | 3 | \| |
| 11: Grundlegende Arithmetik | 4 | echo $(( 2 + 2 )) |
| 12: Grundlegende Arithmetik | 6 | echo '10 * 0.5' \| bc |
| 13: Teilstring-Extraktion | 3 | good cat |
| 14: Schleifen in Bash | 2 | each |
| 15: Befehlsersetzung | 4 | $(ls -l) |
| 16: Standardfehlerausgabe umleiten | 3 | 2>&1 |

### quiz-postgres-sql-mastery-pt1

- Questions: 14
- English SHA-256: `8cb97e01f93954cd744f660f427ef83528e228aef5df6c5bdeae527f140c09b6`
- German SHA-256: `6a827cdac93a1bb7558a7fc396b9df66536c2c9de5ec4336a6c7a132f5f812b0`

| Question | Correct choice | Reviewed answer |
|---|---:|---|
| 1: Eingebaute Aggregate | 4 | MEDIAN |
| 2: Varianten der Cast‑Syntax | 3 | CAST('95', INTEGER) |
| 3: UNIQUE‑Constraints und NULL | 3 | Mehrere NULLs erlaubt |
| 4: Datumsarithmetik | 4 | 2024-11-28 00:00:00 |
| 5: timestamptz vs timestamp | 1 | Beide belegen 8 Byte, repräsentieren aber unterschiedliche Zeitstempel‑Semantiken |
| 6: Ungültige Typen identifizieren | 4 | STRING(100) |
| 7: Ungültige Typen identifizieren | 6 | decimal128 |
| 8: Ungültige Typen identifizieren | 3 | ipv4 |
| 9: Ungültige Typen identifizieren | 4 | currency |
| 10: Ungültige Typen identifizieren | 6 | triangle |
| 11: Ganzzahlüberlauf | 2 | Fehler: Ganzzahl außerhalb des Bereichs |
| 12: Zeitstempel‑Präzision | 4 | 2024-01-08 13:30:00.1234567 |
| 13: Ungültige Typen identifizieren | 5 | tsrank |
| 14: Zeitpunkt der Check-Constraint | 1 | Sofort für neue oder geänderte Zeilen |

### quiz-postgres-sql-mastery-pt2

- Questions: 12
- English SHA-256: `442e06417de424ae712b9a4016865482fd1050ef479a9719f3c28d4709b2d808`
- German SHA-256: `c13cf367430a1b88494368d38349e46c707dca987fe44f05a74b095a89b1a6ee`

| Question | Correct choice | Reviewed answer |
|---|---:|---|
| 1: Die vielen JOINs von PostgreSQL | 1 | JOIN ALL |
| 2: Der moderne Weg zur automatischen Inkrementierung | 5 | id BIGINT GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY |
| 3: Standardkonformität | 4 | RETURNING |
| 4: Automatischer Rollback | 2 | Setzt alle Anweisungen zurück |
| 5: Hash-Join-Eignung | 1 | ON a.id = b.id |
| 6: Mehrspaltiger Index Reihenfolge | 1 | CREATE INDEX ON students(grade_level, last_name); |
| 7: Korrektes Zitieren | 2 | Doppelte Anführungszeichen sind erforderlich |
| 8: Spaltennamen-Quotierung | 2 | "first.name" |
| 9: TABLESAMPLE‑Syntax | 8 | WHERE RANDOM() >= 0.9 |
| 10: Partielle Indizes | 3 | Indiziert nur aktive Studenten |
| 11: COUNT und NULL | 4 | 1 |
| 12: EXPLAIN ANALYZE Fallstrick | 3 | Ändert Daten & gibt Plan aus |

### quiz-in-the-aws-cloud

- Questions: 26
- English SHA-256: `8f073f151596d04141eec7cd5a1517d350fc7a7ebb7a42725eac544d8cb8dba9`
- German SHA-256: `02fe96c4ea6727417866620b0fc709b0190740e3d91b0ff745e9c3e2c49e3257`

| Question | Correct choice | Reviewed answer |
|---|---:|---|
| 1: S3 Trivia | 3 | Simple Storage Service |
| 2: DynamoDB | 1 | Beliebige Eigenschaften speichern |
| 3: DynamoDB | 4 | UpdateItem |
| 4: Erweiterte Suchfunktionen | 2 | OpenSearch |
| 5: Multi-AZ-Bereitstellung | 3 | Bietet automatisches Failover |
| 6: WebSocket-Zauberei | 1 | API Gateway |
| 7: S3-Bucket-Richtlinie | 4 | Prinzip der minimalen Rechte anwenden |
| 8: Aurora Serverless | 2 | Skaliert die Rechenkapazität automatisch |
| 9: BatchGetItem‑Grenzen | 3 | 100 |
| 10: Batch‑Operationen | 1 | 1 |
| 11: Bereitgestellt vs On-Demand Kapazität | 4 | On-Demand vermeidet vorab bereitgestellte Kapazität bei sporadischem, unvorhersehbarem Verkehr |
| 12: S3‑Performance‑Optimierung | 2 | Verwende logische Präfixe; Randomisierung ist nicht nötig |
| 13: RDS‑Backup‑Strategie | 3 | Automatisierte Backups mit Wiederherstellung zu einem bestimmten Zeitpunkt |
| 14: Redis vs Memcached | 1 | Redis unterstützt mehr Datenstrukturen und Operationen |
| 15: Globaler Sekundärindex | 4 | Ermöglicht Abfragen von Nicht‑Primärattributen |
| 16: S3-Lebenszyklusverwaltung | 2 | Objekte automatisch zwischen Speicherklassen verschieben |
| 17: Skalierung von Lesevorgängen mit Amazon Aurora | 3 | Unterstützt bis zu 15 Lesereplikate |
| 18: RDS-Verschlüsselung | 1 | Daten im Ruhezustand und während der Übertragung verschlüsseln |
| 19: Zweck von DynamoDB Streams | 4 | Item‑bezogene Änderungen für ereignisgesteuerte Architekturen erfassen |
| 20: Großer Dateitransfer | 2 | Multipart-Upload für große Dateien verwenden |
| 21: Speicherkostenanalyse | 3 | Speicherklassen basierend auf Zugriffsmustern mischen |
| 22: Konsistenzmodelle | 1 | 100 Lesevorgänge pro Sekunde |
| 23: Aurora‑Failover‑Mechanismus | 4 | Automatische Beförderung basierend auf der Failover‑Prioritätsstufe |
| 24: S3 Starke Konsistenz | 2 | Starke Read-after-Write-Konsistenz für das Schreiben, Löschen und Auflisten von Objekten |
| 25: Time‑to‑Live (TTL) | 3 | Hintergrundlöschung mit Best‑Effort‑Timing |
| 26: Skalierungsverhalten | 1 | Die Skalierungsgeschwindigkeit hängt von der aktuellen und konfigurierten Kapazität ab |

### quiz-is-your-memory-rusty

- Questions: 18
- English SHA-256: `e31e6449bc819ea5691b0d41998b3052afe28378c4dbe0bab4551abe753c2f9c`
- German SHA-256: `4ae811ce5572ea887388c7276a30a4588d6766a4a286b5f5a7346cc98e251266`

| Question | Correct choice | Reviewed answer |
|---|---:|---|
| 1: Grundlegende Move-Semantik | 5 | Kompilierungsfehler: Wert nach Move ausgeliehen |
| 2: Move-Semantik mit Funktionen | 3 | Kompilierungsfehler |
| 3: Mutable Referenzen | 2 | Fehler: wisdom kann nicht mehr als einmal mutabel geborgt werden |
| 4: Implizite Lebensdauern | 1 | Kompiliert erfolgreich |
| 5: Box Smart Pointer | 3 | Kompilierungsfehler |
| 6: Rc Smart-Zeiger | 3 | Reference count: 3 |
| 7: Struktur-Lebensdauern | 2 | Fehler: fehlender Lebensdauer‑Spezifizierer |
| 8: Lebensdauer-Anmerkungen | 2 | Fehler: fehlender Lebensdauer‑Angabe |
| 9: RefCell-Verhalten | 2 | Laufzeit-Panik: RefCell bereits geborgt |
| 10: Cell vs RefCell | 1 | Gibt aus: 42, 43 |
| 11: Verstehen von Rc | 1 | Rc wird in Single‑Thread‑Umgebungen verwendet |
| 12: RefCells und Threading | 4 | RefCell ist nicht Sync; RwLock ermöglicht synchronisierten Zugriff |
| 13: Arc und Mutex | 5 | Deadlock oder Panic |
| 14: Schwache Referenzen | 2 | Ausgabe: None |
| 15: RAII-Muster | 1 | Ressource wird nach dem Gültigkeitsbereich freigegeben |
| 16: Kopieren vs Klonen | 2 | Tiefe Kopie erstellt |
| 17: Speicheroptimierung | 3 | 32 Bytes |
| 18: Null-Kosten-Abstraktionen | 2 | Iteratorcode kann so effizient wie eine manuelle Schleife sein |

### quiz-advanced-js-error-mastery

- Questions: 14
- English SHA-256: `e00c048b44ae6dec4bee8aedf31356a8c002564399f9e3525175ace3b2fe3bbb`
- German SHA-256: `f820eea0fbd24754e2f6879d75db01637f14a4f1e63c809707b1b97b5511c6fc`

| Question | Correct choice | Reviewed answer |
|---|---:|---|
| 1: Das Geheimnis des leeren Objekts | 2 | {} |
| 2: Konsole vs. JSON | 2 | console.log zeigt mehr Infos |
| 3: instanceof Vererbung | 1 | true, true, true |
| 4: Cross-Frame instanceof | 3 | Kann über Frames hinweg falsch sein |
| 5: String-Ausnahmen | 2 | false, "string" |
| 6: Fehlername-Eigenschaft | 2 | "CustomError" |
| 7: Konstruktor-Name-Falle | 2 | "Error" |
| 8: Modernes Error.cause | 1 | "Original error" |
| 9: Stack-Trace anpassen | 1 | Entfernt createError aus dem Stack |
| 10: Template-Literale in Fehlermeldungen | 2 | "Value undefined is invalid" |
| 11: Express-Antwortfehler | 2 | Sendet {"error":{}} |
| 12: Promise‑Ablehnungswerte | 2 | Jeder Wert kann eine Ablehnung sein |
| 13: Nicht‑standardmäßige Eigenschaften | 2 | Möglicherweise nicht in allen Umgebungen vorhanden |
| 14: Objekt‑vs‑Fehler‑Erkennung | 2 | false, false |

Total option labels reviewed: **1231**.
