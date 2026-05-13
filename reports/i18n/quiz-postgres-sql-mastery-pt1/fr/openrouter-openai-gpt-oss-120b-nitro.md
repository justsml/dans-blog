# Translation Candidate
- Slug: quiz-postgres-sql-mastery-pt1
- Locale: fr
- Model: openrouter/openai/gpt-oss-120b:nitro
- Target: src/content/posts/2024-11-27--quiz-postgres-sql-mastery-pt1/fr/index.mdx
- Validation: passed
- Runtime seconds: 44.33
- Input tokens: 13951
- Output tokens: 9705
- Thinking tokens: unknown
- Cached input tokens: 3456
- Cache write tokens: 0
- Estimated cost: $0.002291
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
unlisted: false
social_image: ../mobile.webp
title: 'Quiz : Deep Postgres : Pt. 1'
subTitle: SQL vous fait-il pousserun cri ?
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

> **Partie 1 sur 2.** [Passer à la partie 2](../quiz-postgres-sql-mastery-pt2/)

<p class="inset">PostgreSQL 🐘 est sans conteste ma base de données préférée ! J’apprends constamment de nouvelles astuces et pièges, alors j’ai décidé d’en faire le sujet d’un nouveau quiz !</p>

Ce quiz mélange des fonctionnalités PostgreSQL bien connues et des subtilités moins répandues : agrégats intégrés, cast de types, contraintes, et bien plus encore.

Bonne chance ! 🍀

<QuizUI>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={0}
  group="Échauffement : Fonctions"
  title="Agrégats intégrés"
  options={[
    {text: 'MIN'},
    {text: 'MAX'},
    {text: 'AVG'},
    {text: 'MEDIAN', isAnswer: true},
  ]}
>
  <slot name="question">
  <div className="question">
    Quel n’est PAS une fonction d’agrégat intégrée dans PostgreSQL ?
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
    `MEDIAN` n’est pas intégré ! Vous avez besoin :
    ```sql
    PERCENTILE_CONT(0.5) 
    WITHIN GROUP (ORDER BY grade)
    ```
    Agrégats intégrés courants :
    - `MIN`, `MAX`, `COUNT`
    - `AVG`, `SUM`
    - `ARRAY_AGG`, `STRING_AGG`
    - Diverses fonctions statistiques
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={1}
  group="Échauffement : Conversion de type"
  title="Variations de la syntaxe de cast"
  options={[
    {text: '\'95\'::INTEGER'},
    {text: 'INTEGER \'95\''},
    {text: 'CAST(\'95\', INTEGER)', isAnswer: true},
    {text: 'CAST(\'95\' AS INTEGER)'},
  ]}
>
  <slot name="question">
  <div className="question">
    Laquelle de ces conversions de type est **non valide** ❌ ?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    PostgreSQL prend en charge trois syntaxes de cast :

    1. ANSI SQL : `CAST(expression AS type)`.
    2. PostgreSQL : `expression::type`.
    3. Fonction de type : `type 'literal'`.

    Toutes sont fonctionnellement équivalentes, mais :
    - `CAST()` est la plus portable.
    - `::` est spécifique à PostgreSQL mais couramment utilisé.
    - Le style infixe `type 'literal'` est moins répandu mais reste valide.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={2}
  group="Contraintes"
  title="Contraintes UNIQUE et NULL"
  options={[
    {text: 'Aucun NULL autorisé'},
    {text: 'Un NULL autorisé'},
    {text: 'Plusieurs NULL autorisés', isAnswer: true},
    {text: 'Dépend de la version de PostgreSQL'},
  ]}
>
  <slot name="question">
  <div className="question">
    Combien de valeurs NULL sont autorisées ici ?
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
    Contraintes UNIQUE dans PostgreSQL :
    - Autorisent plusieurs valeurs NULL.
    - `NULL` ≠ `NULL` dans les vérifications d'unicité.

    Pour empêcher les valeurs `NULL`, ajoutez `NOT NULL` :
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
  group="Date/Heure"
  title="Arithmétique de dates"
  options={[
    {text: '2024-11-27'},
    {text: '2024-11-27 00:00:00'},
    {text: '2024-11-28'},
    {text: '2024-11-28 00:00:00', isAnswer: true},
    {text: 'Erreur : heure invalide'},
  ]}
>
  <slot name="question">
  <div className="question">
    Que renvoie-t‑il ?
    ```sql
    SELECT '2024-11-27'::date + interval '24 hours';
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Les intervalles sont un outil puissant pour simplifier les opérations sur les plages de dates !

    Arithmétique de dates dans PostgreSQL :
    - `+ interval '24 hours'` ajoute 24 heures
    - `+ interval '1 day'` ajoute 1 jour
    - `+ interval '1 month'` ajoute 1 mois
    - `+ interval '1 year'` ajoute 1 an

    Le résultat est `2024-11-28 00:00:00`.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={4}
  group="Horodatages"
  title="timestamptz vs timestamp"
  options={[
    {text: 'Ils occupent tous les deux 8 octets, mais représentent des sémantiques d\'horodatage différentes', isAnswer: true},
    {text: 'They"'},
    {text: 'timestamptz conserve n\'importe quel fuseau horaire d\'entrée'},
    {text: 'timestamptz stocke le nom ou le décalage du fuseau horaire d\'origine'},
    {text: 'timestamptz stocke une valeur de 2 octets pour le fuseau horaire'},
    {text: 'timestamptz est le successeur de timestamp'},
  ]}
>
  <slot name="question">
  <div className="question">
    Quelle est l'affirmation **la plus précise** concernant `timestamptz` et `timestamp` ?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Ils sont tous les deux de 8 octets, mais ils ne stockent pas le même type de valeur.

    Alors, quelle est la différence ? Elle se situe au niveau de l'analyse de l'entrée.

    **`timestamptz`**
    - Normalise l'entrée vers un point absolu dans le temps.
    - Prend en compte le paramètre `TimeZone` du serveur/connexion lors de l'analyse d'une entrée sans décalage explicite et lors de l'affichage du résultat.

    **`timestamp`**
    - Stocke une date et une heure sans conversion de fuseau horaire.
    - Ne préserve ni ne normalise les informations de fuseau horaire.


    **`timestamp`**

    - Stocke la date & l'heure sans information de fuseau horaire.
    - Utile pour enregistrer explicitement des dates standardisées, soit en UTC soit dans un fuseau horaire spécifique.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={5}
  group="Types Postgres"
  title="Identifier les types invalides"
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
    Lequel de ceux‑ci n’est pas ❌ un type PostgreSQL valide ?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    PostgreSQL possède un ensemble riche de types de données, mais `STRING(100)` n’en fait pas partie.

    Les types de chaîne corrects sont :
    - `VARCHAR(100)` (chaîne de longueur variable)
    - `CHAR(100)` (chaîne de longueur fixe)
    - `TEXT` (longueur illimitée)
    - `CHARACTER VARYING(100)` (identique à `VARCHAR(100)`)
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={6}
  group="Types Postgres"
  title="Identifier les types invalides"
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
    Lequel de ceux‑ci n’est pas ❌ un type PostgreSQL valide ?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Il peut sembler familier car `decimal128` est un type dans de nombreux environnements (y compris Mongo et Java). Ce n’est pas un type PostgreSQL valide, c’est `decimal` qui l’est.

    Les types numériques corrects sont :
    - `int` (entier sur 4 octets)
    - `bigint` (entier sur 8 octets)
    - `real` (virgule flottante sur 4 octets)
    - `double precision` (virgule flottante sur 8 octets)
    - `bigserial` (entier auto‑incrémenté sur 8 octets)
    - `smallserial` (entier auto‑incrémenté sur 2 octets)
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={7}
  group="Types Postgres"
  title="Identifier les types invalides"
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
    Lequel de ceux‑ci n’est pas ❌ un type PostgreSQL valide ?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Cela vous a-t-il frustré, voire _en colère_ ? Vous n’êtes pas seul ! Pour citer un contributeur « core » anonyme de la base de données, « what the hell, Dan?! I crashed on the type questions! Thats violent sir! Not sharing my score, hah. » 😈 De rien.

    L’ensemble riche de types réseau de PostgreSQL n’inclut pas `ipv4`. Chaque fois que j’essaie de l’utiliser sans chercher, je me trompe. Peut‑être que `macaddr8` me fait penser qu’il _doit_ exister les types `ipv4` et `ipv6`. Non, `inet` couvre les deux. De plus, `cidr` couvre les masques réseau pour les deux.

    Les types réseau valides incluent :
    - `cidr` (adresse réseau IPv4/IPv6)
    - `inet` (adresse hôte IPv4/IPv6)
    - `macaddr` (adresse MAC)
    - `macaddr8` (adresse MAC EUI‑64)
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={8}
  group="Types Postgres"
  title="Identifier les types invalides"
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
    Lequel de ceux‑ci n’est pas ❌ un type PostgreSQL valide ?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    PostgreSQL possède un ensemble riche de types spécialisés, mais `currency` n’en fait pas partie !

    Les types valides sont :
    - `xml` (données XML)
    - `uuid` (UUID)
    - `money` (montant monétaire)
    - `interval` (intervalle de temps)
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={9}
  group="Types Postgres"
  title="Identifier les types invalides"
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
    Lequel de ceux‑ci n’est pas ❌ un type PostgreSQL valide ?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    PostgreSQL possède un ensemble riche de types spécialisés, mais `triangle` n’en fait pas partie.

    Je pense que les versions à venir de [GEOS](https://libgeos.org/) incluront le support `Triangle` OGC/WKT, ce qui signifie qu’il devrait éventuellement être intégré à PostGIS. (En gros, cette réponse pourrait être erronée à l’avenir.)

    Les types spécialisés corrects incluent :
    - `box` (boîte rectangulaire)
    - `line` (ligne infinie)
    - `point` (point 2D)
    - `circle` (cercle 2D)
    - `polygon` (polygone 2D)
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={10}
  group="Arithmétique des entiers"
  title="Débordement d'entier"
  options={[
    {text: '4294967296'},
    {text: 'Error: integer out of range', isAnswer: true},
    {text: '0'},
    {text: '2147483647'},
  ]}
>
  <slot name="question">
  <div className="question">
    Que se passe-t-il lors du calcul du nombre total d'ID étudiants ?
    ```sql
    SELECT 256 * 256 * 256 * 256;
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Le type `integer` de PostgreSQL est signé sur 32 bits, allant de `-2,147,483,648` à `2,147,483,647`.

    Le calcul `256^4` = `4,294,967,296` dépasse cette plage.

    Pour gérer des nombres plus grands :
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
  group="Date/Heure"
  title="Précision du timestamp"
  options={[
    {text: '2024-01-08 13:30:00+00'},
    {text: '2024-01-08 13:30:00.123456+00'},
    {text: '2024-01-08 13:30:00.123456789+00'},
    {text: '2024-01-08 13:30:00.1234567', isAnswer: true},
  ]}
>
  <slot name="question">
  <div className="question">
    Quel est le plus petit littéral `timestamp` qui dépasse la précision maximale du `time` dans Postgres ?
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
    Les timestamps PostgreSQL ont une précision microseconde (6 décimales).

    - Maximum : `.123456` (6 chiffres)
    - Les nanosecondes (9 chiffres) sont arrondies ou tronquées à la précision prise en charge
    - Les décalages de fuseau horaire sont acceptés pour `timestamptz`, mais ne sont pas obligatoires

    **Astuce peu courante :** Certaines langues/cadres envoient une précision en nanosecondes, mais PostgreSQL stocke les timestamps avec une précision microseconde.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={12}
  group="Types Postgres"
  title="Identifier les types invalides"
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
    Lequel de ceux‑ci n’est pas ❌ un type PostgreSQL valide ?

    (Sérieusement, ce sont (pour la plupart) de vrais types.)
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    PostgreSQL possède plusieurs types géométriques et de recherche texte intégrés, mais `tsrank` n’en fait pas partie.

    Les types géométriques et de recherche texte corrects sont :
    - `lseg` (segment de ligne)
    - `bytea` (données binaires)
    - `tsquery` (requête de recherche texte)
    - `tsvector` (document de recherche texte)
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={13}
  group="Contraintes"
  title="Moment de la vérification de contrainte"
  options={[
    {text: 'Immédiatement pour les nouvelles lignes ou les lignes modifiées', isAnswer: true},
    {text: 'Lors du commit de la transaction'},
    {text: 'Lors de la prochaine requête'},
    {text: 'Jamais - les contraintes ne sont vérifiées qu\'à l\'INSERT'},
  ]}
>
  <slot name="question">
  <div className="question">
    Quand cette contrainte de note est‑elle vérifiée ?
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
    `NOT VALID` contraintes :
    - Sont vérifiées immédiatement pour les nouvelles insertions et mises à jour
    - Ne valident pas les lignes existantes
    - Peuvent valider les lignes existantes plus tard avec `VALIDATE CONSTRAINT`
    - Sont utiles pour les grandes tables

    Sans `NOT VALID` :
    - La contrainte est vérifiée immédiatement
    - Toutes les lignes existantes sont validées
    - Peut être lent sur les grandes tables
  </div>
  </slot>
</Challenge>

</QuizUI>

Bien joué ! Vous avez creusé plusieurs aspects de PostgreSQL ! 🐘  

J’espère que vous avez appris quelque chose de nouveau, ou au moins obtenu un score dont vous pouvez vous vanter ! 🏆  

<p class="inset">Découvrez la <a href="../quiz-postgres-sql-mastery-pt2/">Partie 2</a> pour plus de fun PostgreSQL ! 🚀</p>  

Envie de plus d’adrénaline dans la vie ? Consultez ma <a href="../challenges/">Collection de Quiz</a> pour un plaisir sans fin* !
````
