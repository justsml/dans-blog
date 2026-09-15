# Italian quiz review

Reviewed 19 quizzes, 267 questions and 1,231 answer choices against the current English sources. The answer ledger below records the result of the content review; automated parity checks separately verify counts, positions and distinct choices.

## Changes

- Restored literal output in Destructuring (Name/Age, Hi, Unknown, N/A), Bash (Cost, Hi, good cat), Node (HELLO WORLD/undefined), Rust and JavaScript error questions. Literal strings stay in the language actually printed by the code; explanations are Italian.
- Repaired PostgreSQL’s truncated timestamp distractor, translated remaining English Rust choices/hints and interface distractors, and localized navigation labels.
- Aligned the corrected English assumptions for Promise recovery, fixed GMT−7 dates, DSA traversal and Bubble Sort stability, HTML dd/figure, CSS max/root font/selectors/alignment, SQL correlation/index use, DynamoDB limits/capacity, S3 consistency, RefCell borrowing and error type checks.
- Restored 44 translated learning-objective sets and their difficulty metadata; restored 34 missing substantive DSA/Error hints and seven source-present empty Symbols hint slots. Replaced repeated generic ESNext hints with question-specific guidance.
- Restored the BigInt introduction and corrected prefix support in its comparison table; restored the Destructuring closing section and PostgreSQL heading/links. Added Italian prose explaining the English annotation image in Promise question 9.

## Terminology

Compared the Italian quizzes with the Italian articles `intro-to-promises`, `the-unassuming-power-of-multiple-choice-questions` and `llm-connection-strings`. Retained Promise, API names, SQL clauses, stream, backpressure and lifetime where they identify technical constructs. Italian prose uses “risolvere/rifiutare”, “destrutturazione”, “proprietà condivisa”, “prestito”, “riferimento”, “coda” and “indice parziale”. The multiple-choice article supports treating each distractor as a distinct misconception; translated output strings that erased that distinction were restored. This is a local editorial comparison, not a claim of universal terminology consensus.

## Validation

- 19 Italian corpus tests passed, 2,296 assertions: all questions/choices present, nonempty and distinct, one correct answer in the source position, source-required hints represented.
- All 19 localized MDX files compiled directly.
- All 19 structural comparisons scored 1.0; final integrity output is recorded during this review.
- Question code is compared with English in the JSON evidence; whitespace is ignored for this comparison.
- Runtime/browser verification belongs to the parent’s full-corpus Playwright run. This language review did not execute live AWS, PostgreSQL, Node filesystem operations or Rust code, and did not request external AI scoring.

## Answer ledger

Option numbers are one-based. Source SHA-256 hashes bind the review to the exact English inputs; translation hashes and every choice are in [it-evidence.json](./it-evidence.json).

### javascript-promises-quiz

Source SHA-256: `ead6cb486ce9cef02d253b30715e77820dde44c9a310546a0532e7164078dd5a`

| Question | Correct option | Answer |
|---|---:|---|
| 1 | 2 | stampa il messaggio due volte |
| 2 | 3 | promessa rifiutata non gestita |
| 3 | 1 | stampa l'errore e `undefined` |
| 4 | 1 | stampa il messaggio di errore una volta |
| 5 | 4 | non stampa nulla |
| 6 | 3 | stampa "SUCCESS!" |
| 7 | 3 | stampa "SUCCESS!" e "SUCCESS!" |
| 8 | 4 | stampa `undefined` |
| 9 | 3 | stampa "The fails!" |

### js-quiz-14-date-time-questions-test-your-knowledge

Source SHA-256: `ec43802cb19367d4f6404bcba2d9de192622f887999917d08f48645c5e3bd04d`

| Question | Correct option | Answer |
|---|---:|---|
| 1 | 2 | Feb 01 2020 |
| 2 | 1 | Jan 01 2020 |
| 3 | 4 | Data corrente |
| 4 | 1 | 1969 |
| 5 | 1 | 2019 2020 |
| 6 | 2 | date.toLocaleFormat('en-US') |
| 7 | 3 | TypeError |
| 8 | 3 | Millisecondi dal 1° gennaio 1970 GMT |
| 9 | 2 | 420 |
| 10 | 1 | Jan 01 2020 |
| 11 | 2 | Feb 01 2020 |
| 12 | 2 | Jan 01 2021 |
| 13 | 4 | Feb 01 2021 |
| 14 | 4 | Dec 01 2019 |

### quiz-data-structures-algorithms

Source SHA-256: `bbe16f991f17d61caaf6a3d510caa7d4dd771d1113bbbdd157319831abc66dd7`

| Question | Correct option | Answer |
|---|---:|---|
| 1 | 3 | Stack |
| 2 | 1 | O(1) |
| 3 | 4 | O(n) |
| 4 | 2 | O(log n) |
| 5 | 3 | O(n log n) |
| 6 | 1 | Coda |
| 7 | 4 | Ricerca in profondità |
| 8 | 2 | O(n log n) |
| 9 | 3 | O(1) |
| 10 | 1 | Push, Pop, Peek |
| 11 | 4 | Algoritmo di Dijkstra |
| 12 | 2 | Albero AVL e Albero Rosso-Nero |
| 13 | 3 | Caso Base |
| 14 | 1 | Enqueue e Dequeue |
| 15 | 4 | Il grafo deve essere orientato e aciclico |
| 16 | 2 | O(2^n) |
| 17 | 3 | Heap |
| 18 | 1 | In-order, Pre-order, Post-order |
| 19 | 4 | La radice è l'elemento più piccolo e l'altezza è O(log n) |
| 20 | 2 | Stabile |

### quiz-do-you-know-esnext

Source SHA-256: `63cd3ddef63907f8281b7060db5b8004bf7bac2067f84fcdf01ca8bd8b18c3fb`

| Question | Correct option | Answer |
|---|---:|---|
| 1 | 4 | 100 |
| 2 | 1 | false |
| 3 | 1 | undefined |
| 4 | 3 | 84n |
| 5 | 4 | object |
| 6 | 1 | fulfilled: success |
| 7 | 2 | Un iteratore di corrispondenze |
| 8 | 1 | URL del modulo corrente |
| 9 | 2 | 10 |
| 10 | 2 | 10 |
| 11 | 2 | { data: 'important' } |

### quiz-js-interfaces-symbols-and-enumerables

Source SHA-256: `c31ed61019199a9690cb1c1f02182365a0ddb2c7c99eb9ad49da340c96dd83f9`

| Question | Correct option | Answer |
|---|---:|---|
| 1 | 3 | Accedi al valore direttamente |
| 2 | 1 | Usare un Symbol |
| 3 | 4 | Sì, verrà elencata |
| 4 | 2 | false |
| 5 | 3 | false |
| 6 | 1 | No, non lo farà |
| 7 | 4 | Object.getOwnPropertySymbols() |

### quiz-master-modern-html5

Source SHA-256: `9320d673f59fafb3da0b9c01736b3b54a103301210b176a3e5c5c78e771b7b74`

| Question | Correct option | Answer |
|---|---:|---|
| 1 | 1 | Lista non ordinata |
| 2 | 4 | Una descrizione, definizione o valore per un termine in una lista di descrizioni |
| 3 | 2 | Raggruppare contenuto autonomo con la sua didascalia |
| 4 | 2 | Una sezione di contenuto indipendente |
| 5 | 1 | Raggruppare elementi di un form sotto un titolo |
| 6 | 2 | Rappresentare un valore numerico all'interno di un intervallo |
| 7 | 2 | Dichiarare i formati di file multimediali disponibili |
| 8 | 4 | Per raggruppare un'intestazione con il suo sottotitolo |
| 9 | 2 | Per elencare comandi o controlli di una barra degli strumenti |
| 10 | 1 | Contenuto collassabile nativo |
| 11 | 2 | Dichiarare un modale o un popup |
| 12 | 1 | Per rappresentare date e orari |
| 13 | 2 | Migliorare l'accessibilità |
| 14 | 2 | Per descrivere lo scopo dell'elemento |

### quiz-can-you-count-to-bigint

Source SHA-256: `f7af3ca5f8ef55272d24882cc3612f0492277f3ce73ad21ddc7a952a7f4d6a8e`

| Question | Correct option | Answer |
|---|---:|---|
| 1 | 1 | 123456 |
| 2 | 1 | 123 |
| 3 | 2 | false |
| 4 | 1 | Infinity |
| 5 | 5 | "5.00" |
| 6 | 1 | true |
| 7 | 3 | false |
| 8 | 1 | true |
| 9 | 1 | 255 |
| 10 | 1 | [24, NaN, NaN] |
| 11 | 1 | [24, NaN, 34] |
| 12 | 4 | NaN 0 |
| 13 | 5 | 1112745 |

### quiz-modern-css-2025

Source SHA-256: `7254e27e26db35a72ca971a9fce8ae96d3cba30163bc6958ec3118e52e39704b`

| Question | Correct option | Answer |
|---|---:|---|
| 1 | 3 | background-color: var(--main-color); |
| 2 | 2 | width: 200px; |
| 3 | 5 | width: 96px; |
| 4 | 3 | La prima colonna sarà tra 100px e 200px |
| 5 | 4 | #6b8e23 |
| 6 | 3 | Scala lineare tra 200px e 500px |
| 7 | 3 | Sì |
| 8 | 4 | Perfetto. Nessuna nota. |
| 9 | 2 | background-color: white |
| 10 | 2 | Usando JavaScript |
| 11 | 3 | Larghezza: 110px |

### quiz-css-core-fundamentals

Source SHA-256: `ee5866dcab74b29fcaf99765c78fd8c474d51fbd357ed07af1c02059c59d81c7`

| Question | Correct option | Answer |
|---|---:|---|
| 1 | 1 | 10cx |
| 2 | 3 | #ABCD |
| 3 | 14 | rel |
| 4 | 4 | a#home[name='home'] |
| 5 | 4 | button[onclick] |
| 6 | 3 | c > > d {} |
| 7 | 5 | a:last-child |
| 8 | 3 | a#quote |
| 9 | 4 | text-align: center; |
| 10 | 3 | align-content: center; |
| 11 | 2 | 5px |
| 12 | 2 | 12px |
| 13 | 5 | 24px |
| 14 | 1 | :where(.card) .title |

### quiz-sql-query-fundamentals

Source SHA-256: `4788ec9e33c53b4fb819c0e7e472f3a737b497b83add5049de127d7dcc4b32ad`

| Question | Correct option | Answer |
|---|---:|---|
| 1 | 2 | SELECT * FROM users WHERE name = 'John'; |
| 2 | 2 | Conta solo i valori non NULL in una colonna |
| 3 | 2 | Restituisce tutte le righe della tabella di sinistra, più le righe corrispondenti della tabella di destra |
| 4 | 3 | Restituisce le righe che soddisfano la condizione di join in entrambe le tabelle |
| 5 | 4 | Una sottoquery che fa riferimento a colonne della query esterna |
| 6 | 4 | Definire un insieme di risultati temporaneo da utilizzare in un'istruzione SQL più grande |
| 7 | 1 | Verifica se un valore è NULL |
| 8 | 4 | Restituisce righe che corrispondono a valori in un elenco specificato |
| 9 | 3 | Restituisce il primo argomento non NULL |
| 10 | 4 | Raggruppa le righe per la/e colonna/e specificata/e |
| 11 | 5 | Restituisce tutte le righe di entrambe le tabelle, con NULL per le righe non corrispondenti |

### quiz-destructuring-delights

Source SHA-256: `0aa930822ea8a6b38914c30bcdb73e22de3e8910a0f92e5f0f6ab8c090fabd4d`

| Question | Correct option | Answer |
|---|---:|---|
| 1 | 4 | Name: Dan Levy, Age: undefined |
| 2 | 3 | Name: Dan Levy, Age: undefined |
| 3 | 5 | Errore |
| 4 | 5 | Errore |
| 5 | 3 | Hi Dan from Unknown |
| 6 | 6 | Errore |
| 7 | 6 | N/A, N/A, Joburg |
| 8 | 6 | null, N/A |
| 9 | 5 | Errore TypeScript |
| 10 | 5 | Denver |
| 11 | 3 | Errore: le proprietà 'birth' e 'age' sono mancanti |
| 12 | 5 | Errore |

### quiz-nodejs-files-streams-buffers-oh-my

Source SHA-256: `77b0246b9c8275d11d3ca3108732512ae203d0d5f45f379aeb5166c248928930`

| Question | Correct option | Answer |
|---|---:|---|
| 1 | 1 | Crea un Buffer di dimensione 5 con zeri |
| 2 | 1 | A |
| 3 | 2 | Stampa "Done" poi il contenuto del file |
| 4 | 1 | Restituisce un Buffer |
| 5 | 1 | 'data', 'end', 'error', 'close' |
| 6 | 2 | Copia il file a blocchi senza caricarlo interamente in memoria |
| 7 | 1 | Crea directory annidate se necessario |
| 8 | 2 | HELLO WORLD |
| 9 | 2 | Non garantito; può attivarsi più volte |
| 10 | 2 | false |
| 11 | 1 | Previene il sovraccarico di memoria |
| 12 | 3 | Crea un collegamento simbolico |
| 13 | 3 | Entrambe le modalità |
| 14 | 1 | Un numero |
| 15 | 5 | 10 |

### quiz-regex-or-wreckage

Source SHA-256: `0b087416a4feeb151ae3aaa3f19d785b8edc4860522fe150845f43141d7444e9`

| Question | Correct option | Answer |
|---|---:|---|
| 1 | 3 | ["cat"] |
| 2 | 1 | ["cat", "hat"] |
| 3 | 4 | ["<div>Hello</div>", "<div>World</div>"] |
| 4 | 2 | ["hello", "world"] |
| 5 | 5 | null |
| 6 | 2 | ["cat"] |
| 7 | 3 | ["a", "a", "a"] |
| 8 | 3 | ["23", "456"] |
| 9 | 2 | ["2029", "12", "31"] |
| 10 | 4 | ["12"] |
| 11 | 1 | ["a,", "b,", "c"] |
| 12 | 4 | null |
| 13 | 2 | ["100"] |
| 14 | 2 | ["bold"] |
| 15 | 2 | ["😀", "🙂"] |
| 16 | 2 | "Sass123!" |

### quiz-bash-in-the-shell

Source SHA-256: `ea4b4440293b28444b461e783c6f33db1a9d797e64fa8a5987034d8dada9f631`

| Question | Correct option | Answer |
|---|---:|---|
| 1 | 2 | name=Dan |
| 2 | 3 | echo 'It'\''s 🔨 Time!' |
| 3 | 2 | cat cbt |
| 4 | 4 | Cost: 00 |
| 5 | 3 | Bark meow |
| 6 | 3 | ${#username} |
| 7 | 2 | File does not exist, dopo un messaggio diagnostico del comando di test |
| 8 | 2 | Different cats, dopo un messaggio diagnostico del comando di test |
| 9 | 1 | Hi |
| 10 | 3 | \| |
| 11 | 4 | echo $(( 2 + 2 )) |
| 12 | 6 | echo '10 * 0.5' \| bc |
| 13 | 3 | good cat |
| 14 | 2 | each |
| 15 | 4 | $(ls -l) |
| 16 | 3 | 2>&1 |

### quiz-postgres-sql-mastery-pt1

Source SHA-256: `8cb97e01f93954cd744f660f427ef83528e228aef5df6c5bdeae527f140c09b6`

| Question | Correct option | Answer |
|---|---:|---|
| 1 | 4 | MEDIAN |
| 2 | 3 | CAST('95', INTEGER) |
| 3 | 3 | Molteplici NULL consentiti |
| 4 | 4 | 2024-11-28 00:00:00 |
| 5 | 1 | Entrambi occupano 8 byte, ma rappresentano semantiche di timestamp diverse |
| 6 | 4 | STRING(100) |
| 7 | 6 | decimal128 |
| 8 | 3 | ipv4 |
| 9 | 4 | currency |
| 10 | 6 | triangle |
| 11 | 2 | Errore: intero fuori intervallo |
| 12 | 4 | 2024-01-08 13:30:00.1234567 |
| 13 | 5 | tsrank |
| 14 | 1 | Immediatamente per le righe nuove o modificate |

### quiz-postgres-sql-mastery-pt2

Source SHA-256: `442e06417de424ae712b9a4016865482fd1050ef479a9719f3c28d4709b2d808`

| Question | Correct option | Answer |
|---|---:|---|
| 1 | 1 | JOIN ALL |
| 2 | 5 | id BIGINT GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY |
| 3 | 4 | RETURNING |
| 4 | 2 | Esegue il rollback di tutte le istruzioni |
| 5 | 1 | ON a.id = b.id |
| 6 | 1 | CREATE INDEX ON students(grade_level, last_name); |
| 7 | 2 | Le virgolette doppie sono obbligatorie |
| 8 | 2 | "first.name" |
| 9 | 8 | WHERE RANDOM() >= 0.9 |
| 10 | 3 | Indicizza solo gli studenti attivi |
| 11 | 4 | 1 |
| 12 | 3 | Modifica i dati ed emette il piano |

### quiz-in-the-aws-cloud

Source SHA-256: `8f073f151596d04141eec7cd5a1517d350fc7a7ebb7a42725eac544d8cb8dba9`

| Question | Correct option | Answer |
|---|---:|---|
| 1 | 3 | Simple Storage Service (servizio di archiviazione semplice) |
| 2 | 1 | Memorizza proprietà arbitrarie |
| 3 | 4 | UpdateItem |
| 4 | 2 | OpenSearch |
| 5 | 3 | Fornisce failover automatico |
| 6 | 1 | API Gateway |
| 7 | 4 | Usa il principio del minimo privilegio |
| 8 | 2 | Scala automaticamente la capacità di calcolo |
| 9 | 3 | 100 |
| 10 | 1 | 1 |
| 11 | 4 | On-Demand evita di pianificare capacità provisionata per traffico sporadico o imprevedibile |
| 12 | 2 | Usa prefissi logici; la randomizzazione non è necessaria |
| 13 | 3 | Backup automatici con ripristino point-in-time |
| 14 | 1 | Redis supporta più strutture dati e operazioni |
| 15 | 4 | Consente query su attributi non primari |
| 16 | 2 | Transizione automatica degli oggetti tra classi di storage |
| 17 | 3 | Supporta fino a 15 repliche di lettura |
| 18 | 1 | Cifra i dati a riposo e in transito |
| 19 | 4 | Catturare le modifiche a livello di elemento per architetture basate su eventi |
| 20 | 2 | Usa Multipart Upload per file di grandi dimensioni |
| 21 | 3 | Mescola le classi di storage in base ai pattern di accesso |
| 22 | 1 | 100 letture al secondo |
| 23 | 4 | Promozione automatica basata sul livello di priorità di failover |
| 24 | 2 | Coerenza forte per le successive operazioni GET e LIST sugli oggetti |
| 25 | 3 | Cancellazione in background con tempistica best‑effort |
| 26 | 1 | La velocità di scaling dipende dalla capacità corrente e configurata |

### quiz-is-your-memory-rusty

Source SHA-256: `e31e6449bc819ea5691b0d41998b3052afe28378c4dbe0bab4551abe753c2f9c`

| Question | Correct option | Answer |
|---|---:|---|
| 1 | 5 | Errore di compilazione: valore preso in prestito dopo lo spostamento |
| 2 | 3 | Errore di compilazione |
| 3 | 2 | Errore: impossibile prendere in prestito `wisdom` come mutabile più di una volta |
| 4 | 1 | Compila con successo |
| 5 | 3 | Errore di compilazione |
| 6 | 3 | Reference count: 3 |
| 7 | 2 | Errore: specificatore di lifetime mancante |
| 8 | 2 | Errore: specificatore di lifetime mancante |
| 9 | 2 | Panico a runtime: RefCell già preso in prestito |
| 10 | 1 | Stampa: 42, 43 |
| 11 | 1 | Rc è usato per ambienti single‑thread |
| 12 | 4 | RefCell non è Sync; RwLock consente la condivisione sincronizzata |
| 13 | 5 | Deadlock o panic |
| 14 | 2 | Prints: None |
| 15 | 1 | La risorsa viene liberata dopo lo scope |
| 16 | 2 | Creata copia profonda |
| 17 | 3 | 32 byte |
| 18 | 2 | Il codice con iteratori può essere efficiente quanto un ciclo manuale |

### quiz-advanced-js-error-mastery

Source SHA-256: `e00c048b44ae6dec4bee8aedf31356a8c002564399f9e3525175ace3b2fe3bbb`

| Question | Correct option | Answer |
|---|---:|---|
| 1 | 2 | {} |
| 2 | 2 | console.log mostra più informazioni |
| 3 | 1 | true, true, true |
| 4 | 3 | Può essere falso tra frame |
| 5 | 2 | false, "string" |
| 6 | 2 | "CustomError" |
| 7 | 2 | "Error" |
| 8 | 1 | "Original error" |
| 9 | 1 | Rimuove createError dallo stack |
| 10 | 2 | "Value undefined is invalid" |
| 11 | 2 | Invia {"error":{}} |
| 12 | 2 | Qualsiasi valore può essere un rifiuto |
| 13 | 2 | Potrebbe non esistere in tutti gli ambienti |
| 14 | 2 | false, false |
