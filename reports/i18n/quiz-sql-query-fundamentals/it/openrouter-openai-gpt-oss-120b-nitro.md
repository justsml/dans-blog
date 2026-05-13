# Translation Candidate
- Slug: quiz-sql-query-fundamentals
- Locale: it
- Model: openrouter/openai/gpt-oss-120b:nitro
- Target: src/content/posts/2024-11-08--quiz-sql-query-fundamentals/it/index.mdx
- Validation: rejected: direct AI SDK translation failed
- Runtime seconds: 12.76
- Input tokens: 10000
- Output tokens: 6336
- Thinking tokens: unknown
- Cached input tokens: 3456
- Cache write tokens: 0
- Estimated cost: $0.001530
- Pricing source: local-openrouter-estimate
- Note: Command failed: git add src/content/posts/2024-11-08--quiz-sql-query-fundamentals/it/index.mdx reports/i18n/quiz-sql-query-fundamentals/it
## Raw Output

````mdx
---
unlisted: false
title: 'Quiz: Metti alla prova le tue competenze SQL!'
subTitle: Sei del team SQL? O noSQL?
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


## Metti alla prova le tue basi di SQL

Usare un ORM ti ha ammorbidito le competenze?  
Nessun problema, succede a un sacco di sviluppatori.  

Tuffati subito per dimostrare le tue basi di query SQL! 👇

<QuizUI>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={0}
  group="Nozioni dibase SQL"
  title="Clausola WHERE di base"
  options={[
    {text: 'SELECT * FROM users WHERE name LIKE(John);'},
    {text: 'SELECT * FROM users WHERE name = \', isAnswer: true},
    {text: 'SELECT * FROM users WHERE name == "John";'},
    {text: 'SELECT * FROM users WHERE name === "John";'},
  ]}
>
  <slot name="question">
  <div className="question">
    Quale delle seguenti query SQL recupera correttamente le righe in cui il nome è "John"?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    In SQL, il segno di uguale singolo (`=`) è usato per i confronti di uguaglianza nella clausola `WHERE`, non `==` o `===`, che sono operatori JavaScript.

    La sintassi corretta è `SELECT * FROM users WHERE name = 'John';`.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={1}
  group="Nozioni di base SQL"
  title="Funzione di aggregazione COUNT"
  options={[
    {text: 'Conta tutte le righe includendo i valori NULL'},
    {text: 'Conta solo i valori non-NULL in una colonna', isAnswer: true},
    {text: 'Conta i valori NULL come un unico valore'},
    {text: 'Considera ogni valore NULL come unico, simile a NaN !== NaN'},
  ]}
>
  <slot name="question">
  <div className="question">
    Cosa fa `COUNT(column_name)` in SQL?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    `COUNT(column_name)` conta il numero di valori non-NULL in una colonna specificata. Per contare tutte le righe, inclusi i NULL, usa `COUNT(*)`.

    Puoi anche usare `COALESCE` per far sì che i NULL assumano un valore non-NULL di default. Qualcosa del tipo: `COUNT(COALESCE(column_name, 0))`.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={2}
  group="JOIN SQL"
  title="Nozionidi base su LEFT JOIN"
  options={[
    {text: 'Restituisce una riga per ogni corrispondenza, ignora le righe non corrispondenti'},
    {text: 'Restituisce tutte le righe della tabella sinistra, più le righe corrispondenti della destra', isAnswer: true},
    {text: 'Restituisce tutte le righe, corrispondenti o meno, dove i NULL indicano nessuna corrispondenza'},
    {text: 'Restituisce tutte le righe della tabella destra, con le eventuali righe corrispondenti della sinistra'},
  ]}
>
  <slot name="question">
  <div className="question">
    Cosa fa un `LEFT JOIN` in SQL?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    `LEFT JOIN` restituisce tutte le righe della tabella sinistra e le righe corrispondenti della tabella destra, con NULL per le righe non corrispondenti nella tabella destra.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={3}
  group="Join SQL"
  title="Utilizzo di INNER JOIN"
  options={[
    {text: 'Restituisce le righe non corrispondenti da entrambe le tabelle'},
    {text: 'Restituisce tutte le righe da entrambe le tabelle, con NULL per le righe non corrispondenti'},
    {text: 'Restituisce le righe che soddisfano la condizione di join in entrambe le tabelle', isAnswer: true},
    {text: 'Restituisce le righe non corrispondenti dalla tabella di destra'},
  ]}
>
  <slot name="question">
  <div className="question">
    Cosa fa un `INNER JOIN` in SQL?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Un `INNER JOIN` restituisce le righe in cui la condizione di join corrisponde a righe di entrambe le tabelle. Le righe non corrispondenti non sono incluse nel risultato.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={4}
  group="Sottoquery SQL"
  title="Sottoquery correlata"
  options={[
    {text: 'Una sottoquery che viene eseguita una sola volta in totale'},
    {text: 'Una sottoquery usata solo nelle istruzioni JOIN'},
    {text: 'Una sottoquery che restituisce solo più colonne'},
    {text: 'Una sottoquery che viene eseguita una volta per ogni riga della query esterna', isAnswer: true},
  ]}
>
  <slot name="question">
  <div className="question">
    Cos'è una sottoquery correlata in SQL?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Una sottoquery correlata viene valutata una volta per ogni riga della query esterna. Fa riferimento a colonne della query esterna, rendendola dipendente da ciascuna riga.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={5}
  group="CTE SQL"
  title="Sintassi della clausola WITH"
  options={[
    {text: 'Consentita solo nelle istruzioni DELETE'},
    {text: 'Usata per le funzioni di aggregazione'},
    {text: 'Usata solo per definire viste'},
    {text: 'Definisce un set di risultati temporaneo da usare in una query SQL più grande', isAnswer: true},
  ]}
>
  <slot name="question">
  <div className="question">
    Qual è lo scopo della clausola `WITH` (Common Table Expression) in SQL?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    La clausola `WITH`, o Common Table Expression (CTE), è usata per definire un set di risultati temporaneo che può essere referenziato nella query principale. In PostgreSQL, `WITH` può essere allegata a istruzioni come `SELECT`, `INSERT`, `UPDATE`, `DELETE` o `MERGE`.

    Questo può aiutare a migliorare la leggibilità e la manutenibilità delle query complesse.

    La sintassi è:
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
  group="Nozioni di base SQL"
  title="IS NULL vs IS NOT NULL"
  options={[
    {text: 'Verifica se un valore è NULL', isAnswer: true},
    {text: 'Verifica se un valore è vuoto'},
    {text: 'Verifica se un valore è una stringa'},
    {text: 'Verifica se un valore è numerico'},
  ]}
>
  <slot name="question">
  <div className="question">
    Cosa fa l'operatore `IS NULL` in SQL?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    `IS NULL` verifica se una colonna specificata contiene un valore NULL. `IS NOT NULL` verifica il contrario.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={7}
  group="Operatori SQL"
  title="Uso dell'operatore IN"
  options={[
    {text: 'Restituisce righe uniche'},
    {text: 'Richiede una colonna indicizzata'},
    {text: 'Si applica solo a colonne numeriche'},
    {text: 'Restituisce le righe che corrispondono ai valori in un elenco specificato', isAnswer: true},
  ]}
>
  <slot name="question">
  <div className="question">
    Cosa fa l'operatore `IN` in SQL?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    L'operatore `IN` filtra le righe per far corrispondere qualsiasi valore in un elenco specificato, spesso come alternativa a più condizioni OR.

    Sebbene *potrebbe* restituire "righe uniche" (e spesso lo fa), non è necessariamente lo scopo principale.

    L'indicizzazione non è obbligatoria qui, anche se è sicuramente una buona pratica usare `IN` su una colonna indicizzata, preferibilmente con un indice `UNIQUE`, poiché può migliorare le prestazioni.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={8}
  group="Funzioni SQL"
  title="Utilizzare la funzione COALESCE"
  options={[
    {text: 'Conta i valori NULL'},
    {text: 'Restituisce l\'ultimo argomento non NULL'},
    {text: 'Restituisce il primo argomento non NULL', isAnswer: true},
    {text: 'Limitata alle colonne IDENTITY'},
    {text: 'Originariamente da Printer Coalation'},
  ]}
>
  <slot name="question">
  <div className="question">
    Cosa fa la funzione `COALESCE` in SQL?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    La funzione `COALESCE` restituisce il primo valore non NULL in una lista specificata, utile per sostituire valori di default quando si incontrano NULL.

    Ad esempio, `COALESCE(column_name, 0)` restituirebbe `0` se `column_name` è `NULL`.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={9}
  group="Funzioni di aggregazione SQL"
  title="Uso di GROUP BY"
  options={[
    {text: 'Nasconde i duplicati'},
    {text: 'Usato solo nei join'},
    {text: 'Ordina le righe in ordine crescente'},
    {text: 'Raggruppa le righe per le colonne specificate', isAnswer: true},
    {text: 'La sintassi dovrebbe essere GROUP WITH/USING'},
  ]}
>
  <slot name="question">
  <div className="question">
    Qual è lo scopo della clausola `GROUP BY` in SQL?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    La clausola `GROUP BY` raggruppa le righe che hanno gli stessi valori nelle colonne specificate, consentendo l'applicazione di funzioni di aggregazione su ciascun gruppo.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={10}
  group="Join SQL"
  title="Nozioni di base su FULL OUTER JOIN"
  options={[
    {text: 'Restituisce solo le righe corrispondenti'},
    {text: 'Restituisce solo le righe con valori non NULL'},
    {text: 'Restituisce solo le righe non corrispondenti dalla tabella sinistra'},
    {text: 'Restituisce solo le righe non corrispondenti dalla tabella destra'},
    {text: 'Restituisce tutte le righe di entrambe le tabelle, con NULL per le righe non corrispondenti', isAnswer: true},
  ]}
>
  <slot name="question">
  <div className="question">
    Cosa fa un `FULL OUTER JOIN` in SQL?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Un `FULL OUTER JOIN` restituisce tutte le righe di entrambe le tabelle, riempiendo le righe non corrispondenti con NULL per i valori mancanti.

    Questo è utile per confrontare due tabelle e trovare le differenze tra di esse.
  </div>
  </slot>
</Challenge>

</QuizUI>
````
