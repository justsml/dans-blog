# Translation Candidate
- Slug: quiz-sql-query-fundamentals
- Locale: fr
- Model: openrouter/openai/gpt-oss-120b:nitro
- Target: src/content/posts/2024-11-08--quiz-sql-query-fundamentals/fr/index.mdx
- Validation: passed
- Runtime seconds: 19.26
- Input tokens: 9753
- Output tokens: 6355
- Thinking tokens: unknown
- Cached input tokens: 3392
- Cache write tokens: 0
- Estimated cost: $0.001524
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
unlisted: false
title: 'Quiz : Prouvez vos compétences SQL!'
subTitle: Vous êtes plutôt team SQL ou NoSQL ?
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


## Testez vos bases en SQL

L’utilisation d’un ORM vous a-t-elle ramolli les compétences ?  
Pas de panique, ça arrive à beaucoup de développeurs.  

Plongez‑y directement pour prouver votre maîtrise des requêtes SQL ! 👇

<QuizUI>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={0}
  group="Bases SQL"
  title="Clause WHERE de base"
  options={[
    {text: 'SELECT * FROM users WHERE name LIKE(John);'},
    {text: 'SELECT * FROM users WHERE name = \', isAnswer: true},
    {text: 'SELECT * FROM users WHERE name == "John";'},
    {text: 'SELECT * FROM users WHERE name === "John";'},
  ]}
>
  <slot name="question">
  <div className="question">
    Quelle requête SQL parmi les suivantes récupère correctement les lignes où le nom est "John" ?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    En SQL, le signe égal simple (`=`) est utilisé pour les comparaisons d'égalité dans la clause `WHERE`, pas `==` ou `===`, qui sont des opérateurs JavaScript.

    La syntaxe correcte est `SELECT * FROM users WHERE name = 'John';`.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={1}
  group="Notions de base SQL"
  title="Fonction d'agrégation COUNT"
  options={[
    {text: 'Compte toutes les lignes, y compris les valeurs NULL'},
    {text: 'Compte uniquement les valeurs non NULL d\'une colonne', isAnswer: true},
    {text: 'Compte les valeurs NULL comme une valeur unique'},
    {text: 'Considère chaque valeur NULL comme unique, similaire à NaN !== NaN'},
  ]}
>
  <slot name="question">
  <div className="question">
    Que fait `COUNT(column_name)` en SQL ?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    `COUNT(column_name)` compte le nombre de valeurs non NULL dans une colonne spécifiée. Pour compter toutes les lignes, y compris les NULL, utilisez `COUNT(*)`.

    Vous pouvez également utiliser `COALESCE` pour que les NULL soient remplacés par une valeur non NULL. Par exemple : `COUNT(COALESCE(column_name, 0))`.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={2}
  group="Jointures SQL"
  title="Bases du LEFT JOIN"
  options={[
    {text: 'Renvoie une ligne pour chaque correspondance, ignore les lignes non correspondantes'},
    {text: 'Renvoie toutes les lignes de la table de gauche, plus les lignes correspondantes de la droite', isAnswer: true},
    {text: 'Renvoie toutes les lignes, qu\'elles soient correspondantes ou non, les NULL indiquant l\'absence de correspondance'},
    {text: 'Renvoie toutes les lignes de la table de droite, avec les lignes correspondantes de la gauche'},
  ]}
>
  <slot name="question">
  <div className="question">
    Que fait un `LEFT JOIN` en SQL ?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Un `LEFT JOIN` renvoie toutes les lignes de la table de gauche et les lignes correspondantes de la table de droite, avec NULL pour les lignes non correspondantes de la droite.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={3}
  group="Jointures SQL"
  title="Utilisation de INNER JOIN"
  options={[
    {text: 'Renvoie les lignes non correspondantes des deux tables'},
    {text: 'Renvoie toutes les lignes des deux tables, avec des NULL pour les lignes non correspondantes'},
    {text: 'Renvoie les lignes qui satisfont la condition de jointure dans les deux tables', isAnswer: true},
    {text: 'Renvoie les lignes non correspondantes de la table de droite'},
  ]}
>
  <slot name="question">
  <div className="question">
    Que fait un `INNER JOIN` en SQL ?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Un `INNER JOIN` renvoie les lignes où la condition de jointure correspond aux lignes des deux tables. Les lignes non correspondantes ne sont pas incluses dans le jeu de résultats.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={4}
  group="Sous-requêtes SQL"
  title="Sous-requête corrélée"
  options={[
    {text: 'Une sous‑requête qui s’exécute une fois au total'},
    {text: 'Une sous‑requête utilisée uniquement dans les clauses JOIN'},
    {text: 'Une sous‑requête qui ne renvoie que plusieurs colonnes'},
    {text: 'Une sous‑requête qui s’exécute une fois pour chaque ligne de la requête externe', isAnswer: true},
  ]}
>
  <slot name="question">
  <div className="question">
    Qu’est‑ce qu’une sous‑requête corrélée en SQL ?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Une sous‑requête corrélée est évaluée une fois par ligne de la requête externe. Elle fait référence aux colonnes de la requête externe, ce qui la rend dépendante de chaque ligne.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={5}
  group="CTE SQL"
  title="Syntaxe de la clause WITH"
  options={[
    {text: 'Autorisé uniquement dans les instructions DELETE'},
    {text: 'Utilisé pour les fonctions d\'agrégation'},
    {text: 'Utilisé uniquement pour définir des vues'},
    {text: 'Définir un ensemble de résultats temporaire à utiliser dans une instruction SQL plus grande', isAnswer: true},
  ]}
>
  <slot name="question">
  <div className="question">
    Quel est le but de la clause `WITH` (Expression de Table Commune) en SQL ?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    La clause `WITH`, ou Expression de Table Commune (CTE), est utilisée pour définir un ensemble de résultats temporaire qui peut être référencé dans la requête principale. Dans PostgreSQL, `WITH` peut être attachée à des instructions telles que `SELECT`, `INSERT`, `UPDATE`, `DELETE` ou `MERGE`.

    Cela peut aider à améliorer la lisibilité et la maintenabilité des requêtes complexes.

    La syntaxe est :
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
  group="Bases SQL"
  title="IS NULLvs IS NOT NULL"
  options={[
    {text: 'Vérifie si une valeur est NULL', isAnswer: true},
    {text: 'Vérifie si une valeur est vide'},
    {text: 'Vérifie si une valeur est une chaîne'},
    {text: 'Vérifie si une valeur est numérique'},
  ]}
>
  <slot name="question">
  <div className="question">
    Que fait l'opérateur `IS NULL` en SQL ?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    `IS NULL` vérifie si une colonne spécifiée contient une valeur NULL. `IS NOT NULL` vérifie le contraire.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={7}
  group="Opérateurs SQL"
  title="Utilisation de l'opérateur IN"
  options={[
    {text: 'Renvoie des lignes uniques'},
    {text: 'Nécessite une colonne indexée'},
    {text: 'S\'applique uniquement aux colonnes numériques'},
    {text: 'Renvoie les lignes correspondant aux valeurs d\'une liste spécifiée', isAnswer: true},
  ]}
>
  <slot name="question">
  <div className="question">
    Que fait l'opérateur `IN` en SQL ?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    L'opérateur `IN` filtre les lignes pour qu'elles correspondent à n'importe quelle valeur d'une liste spécifiée, souvent comme alternative à plusieurs conditions OR.

    Bien qu'il *puisse* renvoyer des "lignes uniques" (et le fait souvent), ce n'est pas forcément son objectif principal.

    L'indexation n'est pas requise ici, bien qu'il soit recommandé d'utiliser `IN` sur une colonne indexée, de préférence avec un index `UNIQUE`, car cela peut améliorer les performances.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={8}
  group="Fonctions SQL"
  title="Utilisation de la fonction COALESCE"
  options={[
    {text: 'Compte les valeurs NULL'},
    {text: 'Renvoie le dernier argument non NULL'},
    {text: 'Renvoie le premier argument non NULL', isAnswer: true},
    {text: 'Limité aux colonnes IDENTITY'},
    {text: 'À l\'origine de Printer Coalation'},
  ]}
>
  <slot name="question">
  <div className="question">
    Que fait la fonction `COALESCE` en SQL ?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    La fonction `COALESCE` renvoie la première valeur non NULL d'une liste spécifiée, ce qui est utile pour substituer des valeurs par défaut lorsqu'on rencontre des NULL.

    Par exemple, `COALESCE(column_name, 0)` renverra `0` si `column_name` est `NULL`.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={9}
  group="Fonctions d'agrégation SQL"
  title="Utilisation de GROUP BY"
  options={[
    {text: 'Masque les doublons'},
    {text: 'Utilisé uniquement dans les jointures'},
    {text: 'Trie les lignes par ordre croissant'},
    {text: 'Regroupe les lignes selon la ou les colonnes spécifiées', isAnswer: true},
    {text: 'La syntaxe devrait être GROUP WITH/USING'},
  ]}
>
  <slot name="question">
  <div className="question">
    Quel est le but de la clause `GROUP BY` en SQL ?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    La clause `GROUP BY` regroupe les lignes qui ont les mêmes valeurs dans les colonnes spécifiées, permettant d'appliquer des fonctions d'agrégation sur chaque groupe.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={10}
  group="Jointures SQL"
  title="Bases du FULL OUTER JOIN"
  options={[
    {text: 'Renvoie uniquement les lignes correspondantes'},
    {text: 'Renvoie uniquement les lignes avec des valeurs non NULL'},
    {text: 'Renvoie uniquement les lignes non correspondantes de la table de gauche'},
    {text: 'Renvoie uniquement les lignes non correspondantes de la table de droite'},
    {text: 'Renvoie toutes les lignes des deux tables, avec des NULL pour les lignes non correspondantes', isAnswer: true},
  ]}
>
  <slot name="question">
  <div className="question">
    Que fait un `FULL OUTER JOIN` en SQL ?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Un `FULL OUTER JOIN` renvoie toutes les lignes des deux tables, en remplissant les lignes non correspondantes avec des NULL pour les valeurs manquantes.

    Ceci est utile pour comparer deux tables et identifier les différences entre elles.
  </div>
  </slot>
</Challenge>

</QuizUI>
````
