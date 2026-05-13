# Translation Candidate
- Slug: quiz-modern-css-2025
- Locale: fr
- Model: openrouter/qwen/qwen3-32b:nitro
- Target: src/content/posts/2024-11-07--quiz-modern-css-2025/fr/index.mdx
- Validation: rejected: direct AI SDK translation failed
- Runtime seconds: 32.47
- Input tokens: 9536
- Output tokens: 9654
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- Estimated cost: $0.003080
- Pricing source: local-openrouter-estimate
- Note: Command failed: bun run i18n:validate --slug quiz-modern-css-2025 --locale fr
## Raw Output

````mdx
---
unlisted: false
title: 'Quiz : Savez-vous le CSS moderne ? (pour 2025)'
subTitle: Êtes-vous assez front-end ?
label: Advanced CSS
social_image: ../desktop-social.webp
category: Quiz
subCategory: CSS
minReleaseDate: '2024-10-31'
date: '2024-10-31'
modified: '2024-11-09'
tags:
  - quiz
  - css
  - advanced
  - intermediate
cover_full_width: ../dan-levy-downtown-denver-at-night-wide.webp
cover_mobile: ../dan-levy-downtown-denver-at-night-square-200.webp
cover_icon: ../dan-levy-downtown-denver-at-night-square-200.webp
---
```mdx
import Challenge from '../../../../../components/QuizUI/Challenge';
import QuizUI from '../../../../../components/QuizUI/QuizUI';


## Quiz : Maîtrisez-vous le CSS ?

* CSS moderne ? 🤔
* **Le CSS mérite-t-il d’être sur _votre_ CV ???** 🚀
* Choix multiples. 🤖 ... _Ça peut être si difficile que ça, hein ?_
```

<QuizUI>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={0}
  group="Échauffement"
  title="Utilisation des variables CSS"
  options={[
    {text: 'background-color: blue;'},
    {text: 'background-color: --main-color;'},
    {text: 'background-color: var(--main-color);', isAnswer: true},
    {text: 'background-color: $main-color;'},
    {text: 'background-color: @main-color;'},
  ]}
>
  <slot name="question">
  <div className="question">
    Quelle est la bonne façon d'utiliser une variable CSS nommée `--main-color` pour définir la couleur d'arrière-plan d'un élément ?
    ```css
    :root {
      --main-color: blue;
    }
    div {
      /* How do we use --main-color here? */
    }
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Les variables CSS s'utilisent avec la fonction `var`, donc la bonne réponse est `background-color: var(--main-color);`. Cette syntaxe récupère la valeur de `--main-color` et l'applique.

    Les autres options proviennent probablement de syntaxes de préprocesseurs comme Sass ou Less.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={1}
  group="Fonctions CSS"
  title="Fonction CSS min()"
  options={[
    {text: 'width: 50%;'},
    {text: 'width: 200px;', isAnswer: true},
    {text: 'width: 250px;'},
    {text: 'width: 500px;'},
    {text: 'width: max(50%, 200px);'},
    {text: 'Invalid syntax'},
  ]}
>
  <slot name="question">
  <div className="question">
    Si la largeur du parent/conteneur est de 400px, quelle sera la largeur calculée de l'élément suivant ?
    ```css
    div {
      width: min(250px, 50%);
    }
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    La fonction `min()` choisit la plus petite valeur entre 250px et 50 % de la largeur de son parent.

    Pour comprendre la valeur calculée, convertissons les unités relatives en pixels :

    - `50 %` de `400px` est `200px`
    - `250px` est déjà en pixels
    ```css
    /* This gets computed to */
    width: min(250px, 200px);
    /* -> 200px wins */
    ```
    La fonction `min()` est particulièrement utile pour le design réactif, car elle permet d'assurer qu'un composant (ou une taille de police) ne dépasse pas une certaine limite.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={2}
  group="Fonctions CSS"
  title="Fonction CSS max()"
  options={[
    {text: 'width: 6em;'},
    {text: 'width: 10%;'},
    {text: 'width: 10px;'},
    {text: 'width: 50px;'},
    {text: 'width: 96px;', isAnswer: true},
    {text: 'Syntaxe invalide'},
  ]}
>
  <slot name="question">
  <div className="question">
    Étant donné un conteneur dont la largeur est de 200px, quelle serait la largeur calculée du `<div>` ?
    ```css
    div {
      width: max(50px, 10%, 6rem);
    }
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    La fonction `max()` accepte 2 ou plus d'entrées, et utilise automatiquement la valeur la plus grande. En supposant que la taille de police racine est la valeur par défaut du navigateur `16px`, la largeur se calcule à `96px`.

    Pour comprendre la valeur calculée, convertissons les unités relatives en pixels :

    - `50px` est déjà en pixels
    - `10%` de `200px` est `20px`
    - `6rem` est `6 * 16px` (la taille de police par défaut) ce qui donne `96px`
    ```css
    /* This gets computed to */
    width: max(50px, 20px, 96px);
    /* -> 96px wins */
    ```
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={3}
  group="Fonctions CSS Grid"
  title="Fonction CSS minmax()"
  options={[
    {text: 'Toutes les largeurs de colonnes entre 100px et 200px'},
    {text: 'Définir les colonnes à 100px, les lignes à 200px'},
    {text: 'La colonne 1 sera entre 100px et 200px', isAnswer: true},
    {text: 'Appliquer la plage de manière récursive, y compris les sous-grilles'},
  ]}
>
  <slot name="question">
  <div className="question">
    Quel est l'effet d'utiliser `minmax(100px, 200px)` pour une piste CSS Grid ?
    ```css
    grid-template-columns: minmax(100px, 200px);
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    L'utilisation de `minmax(100px, 200px)` permet à la piste de la grille de redimensionner entre `100px` et `200px`, s'adaptant à l'espace disponible sans descendre en dessous de `100px` ou dépasser `200px`.

    Vous pouvez créer des mises en page s'ajustant automatiquement où le conteneur et ses enfants interagissent pour calculer les mises en page. C'est puissant lorsqu'on le combine avec `repeat()` et `auto-fill` ou `auto-fit`, qui créent autant de pistes que possible dans les contraintes.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={4}
  group="Variables CSS"
  title="Fiches de secours pour les variables CSS"
  options={[
    {text: 'blue'},
    {text: 'red'},
    {text: 'valeur par défaut du système'},
    {text: '#6b8e23', isAnswer: true},
    {text: 'var(--secondary-color)'},
  ]}
>
  <slot name="question">
  <div className="question">
    Quelle couleur aura l'arrière-plan pour le CSS suivant ?
    ```css
    div {
      background: var(--primary, olivedrab);
    }
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    La fonction `var()` permet de définir une valeur de secours si la variable n'est pas définie. Ici, l'arrière-plan sera `olivedrab` (`#6b8e23`) car `--primary` n'est pas défini.

    C'est une excellente pratique pour éviter que vos styles ne cassent si une variable manque ou n'est pas supportée.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={5}
  group="Fonctions CSS"
  title="Utilisation de clamp() pour le design réactif"
  options={[
    {text: 'Valeur par défaut pour des unités possiblement non prises en charge'},
    {text: 'Assurer que les unités `vw` restent comprises entre 20px et 50px'},
    {text: 'Échelle linéaire entre 200px et 500px', isAnswer: true},
    {text: 'Échelle logarithmique en base 2 entre 200px et 500px'},
    {text: 'Échec ! Pas de prise en charge par IE 11'},
  ]}
>
  <slot name="question">
  <div className="question">
    Quel est le rôle de la fonction `clamp()` ?
    ```css
    .card {
      width: clamp(200px, 50vw, 500px);
    }
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    La fonction `clamp()` permet à la largeur de s'adapter en fonction de `50vw`, tout en restant comprise entre 200px et 500px.

    Cela signifie que la largeur sera de 200px lorsque `50vw` serait inférieur à 200px, de 500px lorsqu'il serait supérieur à 500px, et linéaire entre ces limites.

    Cela vous permet d'être automatiquement réactif ! Il faut savoir que `clamp` combine les **unités fixes** avec les **unités réactives ou calculées.**

    Normalement, on évite d'utiliser les unités de viewport pour les tailles de police, mais avec `clamp()` on peut s'assurer qu'elles ne deviennent ni trop petites ni trop grandes.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={6}
  group="Imbrication CSS"
  title="CSS imbriqué natif"
  options={[
    {text: 'Uniquement avec SCSS'},
    {text: 'Techniquement avec PostCSS'},
    {text: 'Oui', isAnswer: true},
    {text: 'Non'},
  ]}
>
  <slot name="question">
  <div className="question">
    Le CSS supporte-t-il l'imbrication de manière native ?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Oui ! Nous avons enfin l'imbrication CSS native ! Le CSS a introduit une syntaxe d'imbrication native ces dernières années (2023), permettant de styliser hiérarchiquement directement en CSS.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={7}
  group="Imbrication CSS"
  title="CSS imbriqué"
  options={[
    {text: 'Le nom du fichier doit se terminer par .scss'},
    {text: '`.title` doit précéder les propriétés comme `color`'},
    {text: 'Uniquement avec PostCSS'},
    {text: 'Parfait. Aucune note.', isAnswer: true},
  ]}
>
  <slot name="question">
  <div className="question">
    Est-ce une utilisation correcte de l'imbrication CSS native ? ❓
    ```css
    .container {
      color: black;
      .title {
        color: white;
        background: black;
      }
    }
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    La classe `.title` est imbriquée dans la classe `.container`, et les propriétés sont appliquées comme prévu.

    C'est un excellent moyen de regrouper les styles liés et d'éviter les sélecteurs longs.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={8}
  group="Imbriquage CSS"
  title="Sélecteur d'enfant direct avec imbriquage"
  options={[
    {text: 'background-color: red'},
    {text: 'background-color: white', isAnswer: true},
    {text: 'background-color: blue'},
    {text: 'Syntaxe invalide'},
  ]}
>
  <slot name="question">
  <div className="question">
    Quelle couleur de fond sera appliquée aux `div`s enfants directs de `.container` ?
    ```css
    .container {
      background-color: red;
      > div {
        background-color: white;
      }
      background-color: blue !important;
    }
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Le sélecteur `>` dans la règle imbriquée applique `background-color: white` uniquement aux éléments `div` enfants directs de `.container`.

    La dernière règle, `background-color: blue !important;`, est un peu de distraction. Elle est **hors de la règle imbriquée** et sera appliquée à tous les éléments `.container`.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={9}
  group="Variables CSS"
  title="Modifier une variable CSS au moment de l'exécution"
  options={[
    {text: 'Les variables CSS sont immuables'},
    {text: 'En utilisant JavaScript', isAnswer: true},
    {text: 'Uniquement avec SCSS'},
    {text: 'Uniquement avec les styles en ligne'},
    {text: 'En utilisant des unités réactives'},
  ]}
>
  <slot name="question">
  <div className="question">
    Comment pouvez-vous modifier la valeur d'une variable CSS au moment de l'exécution ?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Les variables CSS peuvent être définies à l'aide de classes et de JavaScript. Elles peuvent même être définies 'après' qu'elles soient techniquement utilisées.
    ```js
    document.documentElement.style.setProperty('--main-color', 'blue');
    ```
    Cela changera la valeur de `--main-color` en `blue` pour l'ensemble du document.

    Les variables CSS sont mutables et peuvent être modifiées au moment de l'exécution en utilisant JavaScript.

    Elles peuvent également être modifiées en ajoutant ou en supprimant des classes, ce qui est un modèle courant pour le thémage.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={10}
  group="Variables CSS"
  title="Utilisation de calc() avec les variables CSS"
  options={[
    {text: 'Largeur : 50px'},
    {text: 'Largeur : 100px'},
    {text: 'Largeur : 110px', isAnswer: true},
    {text: 'Largeur : 120px'},
  ]}
>
  <slot name="question">
  <div className="question">
    Quelle sera la largeur calculée de l'élément ?
    ```css
    :root {
      --base-width: 100px;
    }
    div {
      width: calc(var(--base-width) + 10px);
    }
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    La fonction `calc()` combine la valeur de `--base-width` (100px) avec un supplément de 10px, ce qui donne une largeur de 110px.
  </div>
  </slot>
</Challenge>

</QuizUI>
````
