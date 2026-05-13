# Translation Candidate
- Slug: js-quiz-14-date-time-questions-test-your-knowledge
- Locale: fr
- Model: openrouter/qwen/qwen3-32b:nitro
- Target: src/content/posts/2020-01-02--js-quiz-14-date-time-questions-test-your-knowledge/fr/index.mdx
- Validation: passed
- Runtime seconds: 47.27
- Input tokens: 12205
- Output tokens: 12292
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- Estimated cost: $0.003926
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
unlisted: false
title: 'Quiz : 14 questions sur l''objet Date en JavaScript'
subTitle: ''
label: Dates & Times
date: '2020-01-02'
modified: '2024-11-27'
tags:
  - quiz
  - javascript
  - date
  - date
  - gotchas
  - challenge
  - intermediate
social_image: ../desktop-social.webp
category: Quiz
subCategory: JavaScript
cover: ../pocket-watch.webp
cover_mobile: ../w300_pocket-watch.webp
cover_icon: ../icon_pocket-watch.webp
---
import Challenge from '../../../../../components/QuizUI/Challenge';
import QuizUI from '../../../../../components/QuizUI/QuizUI';

## À quel point connaissez-vous la classe `Date` ?

> * **Prouvez vos compétences en JavaScript !** 🚀  
> * Aucune inscription ou connexion requise. ✨  
> * Choix multiples. 🤖 ... _Quelle difficulté peut-il y avoir, hein ?_

### Plan

L'API de la classe `Date` en JavaScript est réputée difficile. Elle a été héritée de Java, et je ne peux qu'imaginer qu'elle a été inspirée par des méthodes archaïques de mesure du temps.

La difficulté à maîtriser `Date` pousse de nombreux développeurs à utiliser des bibliothèques tierces sans hésiter. Bien que souvent fiables, ces bibliothèques sont rarement nécessaires pour le formatage des dates ou la localisation !

Ce quiz a pour objectif de tester (et d'approfondir) vos connaissances sur l'API native `Date`. Utilisez les boutons verts pour obtenir des indices et des explications ! J'espère que, à la fin de ce défi, vous aurez consolidé votre compréhension des `Date` en JavaScript.

#### **NOTE :** Tous les exemples supposent un fuseau horaire local GMT-7.

### 👇 14 Questions ci-dessous 👇

<QuizUI>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={0}
  group="Gestion des dates"
  title="Constructeur Date Partie 1"
  options={[
    {text: '1er janvier 2020'},
    {text: '1er février 2020', isAnswer: true},
    {text: 'RangeError: Argument invalide.'},
  ]}
>
  <slot name="question">
  <div className="question">
    Quel sera le résultat affiché ?
    ```js
    const d1 = new Date(2020, 1, 1)
    console.log(d1)
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    L'argument Mois est basé sur zéro. Avec une plage de 0 à 11 (en utilisant les calendriers occidentaux).

    'Février' a une valeur d'indice de un. (Pensez-y comme une recherche dans un tableau.)
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={1}
  group="Gestion des dates"
  title="Constructeur Date Partie 2"
  options={[
    {text: 'Jan 01 2020', isAnswer: true},
    {text: 'Feb 01 2020'},
    {text: 'RangeError : Argument invalide.'},
  ]}
>
  <slot name="question">
  <div className="question">
    Quelle sortie inclura-t-elle ?
    ```js
    const d2 = new Date(2020, 0, 1)
    console.log(d2)
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    L'argument Mois est basé sur zéro. Avec une plage de 0 à 11 (en utilisant les calendriers occidentaux).

    « janvier » a une valeur d'indice de zéro. (Pensez-y comme à une recherche dans un tableau.)
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={2}
  group="Gestion des dates"
  title="Constructeur Date Partie 3"
  options={[
    {text: '01 Jan 1970'},
    {text: 'Époque Unix de 0'},
    {text: 'Date actuelle, en UTC/GMT'},
    {text: 'Date actuelle', isAnswer: true},
    {text: 'NaN'},
    {text: 'RangeError: Invalid argument.'},
  ]}
>
  <slot name="question">
  <div className="question">
    Quelle sortie inclura-t-elle ?
    ```js
    const d3 = Date('Thu, 01 Jan 1970 00:00:00 GMT')
    console.log(d3)
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    N'oubliez pas le mot-clé `new` ! `Date` est une classe et doit être appelée avec `new`.

    `Date('...')` sans `new` ignore ce que vous lui transmettez. Cela semble toujours produire la date et l'heure actuelles avec `new Date()` (sans arguments).

    C'est un **piège courant** facile à **sous-estimer**, même lors des revues de code.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={3}
  group="Gestion des dates"
  title="Constructeur Date Partie 4"
  options={[
    {text: '1969', isAnswer: true},
    {text: '1970'},
    {text: '2019'},
    {text: '2020'},
    {text: '2021'},
    {text: 'RangeError: Argument invalide.'},
  ]}
>
  <slot name="question">
  <div className="question">
    Quelle sortie inclura-t-elle ?
    ```js
    const date = new Date(2020)
    console.log(date.getFullYear())
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Une instance Date créée avec un seul argument entier est interprétée comme une valeur Unix `Époque`. L'`Époque` est un compte des millisecondes depuis le 1er janvier 1970.

    Une valeur de `2020` (millisecondes) correspond à 2 secondes après le 1er janvier 1970.

    Ensuite, comme notre fuseau horaire local a un décalage négatif de -7 heures, nous obtenons `mer. 31 déc. 1969 17:00:02 GMT-0700 (Mountain Standard Time)`.

    Vous pouvez contourner le décalage du fuseau horaire local en utilisant [`.getUTCFullYear()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/getUTCFullYear).
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={4}
  group="Gestion des dates"
  title="Analyse des chaînes de dates"
  options={[
    {text: '2019 2020', isAnswer: true},
    {text: '2020 2021'},
    {text: '2020 2020'},
    {text: '2020 2019'},
  ]}
>
  <slot name="question">
  <div className="question">
    Quelle valeur s'affichera dans la console ?
    ```js
    const d1 = new Date('2020-01-01')
    const d2 = new Date('2020-01-01T00:00')
    console.log(d1.getFullYear(), d2.getFullYear())
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    La chaîne sans la valeur horaire `T` peut sembler être le 1er janvier 2020 - mais les chaînes de date seule sont interprétées en UTC, et une fois ajustées à notre fuseau horaire local (GMT-7), on constate que nous sommes toujours en 2019.

    Les chaînes date-heure sans fuseau horaire explicite sont interprétées en temps local.

    La forme `T00:00` fait en sorte que la deuxième valeur soit interprétée comme minuit local.

    La première date est interprétée comme `Tue Dec 31 2019 17:00:00 GMT-0700 (Mountain Standard Time)`.
    La deuxième date est interprétée comme `Wed Jan 01 2020 00:00:00 GMT-0700 (Mountain Standard Time)`.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={5}
  group="Gestion des dates"
  title="Formatage Partie 1"
  options={[
    {text: 'new Intl.DateTimeFormat(\'},
    {text: 'date.toLocaleFormat(\', isAnswer: true},
    {text: 'date.toLocaleString(\'},
    {text: 'date.toLocaleDateString(\'},
  ]}
>
  <slot name="question">
  <div className="question">
    Sélectionnez une méthode de formatage _incorrecte_ :
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    La méthode `toLocaleFormat()` n'est pas standard ! Elle peut sembler familière car elle provient d'une ancienne bibliothèque tierce.

    Consultez la documentation sur [`toLocaleDateString`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleDateString). Son comportement est documenté sous [`Intl.DateTimeFormat`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DateTimeFormat).
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={6}
  group="Manipulation des dates"
  title="Dates UTC Partie 1"
  options={[
    {text: 'Mercredi 1er janv. 2020 00:00:00 GMT'},
    {text: 'Jeudi 2 janv. 2020 00:00:00 GMT'},
    {text: 'TypeError', isAnswer: true},
    {text: 'NaN'},
  ]}
>
  <slot name="question">
  <div className="question">
    Quelle sortie inclura-t-on ?
    ```js
    var date = Date.UTC('2020-01-02T00:00')
    console.log(date.toUTCString())
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Vous obtenez `TypeError: date.toUTCString n'est pas une fonction`, car [`Date.UTC()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/UTC) retourne un entier en millisecondes, et non une instance de date.

    {/* La méthode [`getFullYear()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/getFullYear) utilise votre décalage local (supposons GMT-07:00 pour ces questions).
    Cela signifie qu'elle affichera l'année précédente (Réveillon -7 heures).
    La méthode [`getUTCFullYear()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/getUTCFullYear) affichera l'année que nous avons fournie à `Date.UTC()`, soit 2020.
    */}
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={7}
  group="Gestion des dates"
  title="Dates UTC Partie 2"
  options={[
    {text: 'Une instance de date basée sur UTC'},
    {text: 'Une instance de date ajustée pour le fuseau horaire local'},
    {text: 'Millisecondes depuis le 1er janvier 1970 GMT', isAnswer: true},
    {text: 'Une erreur'},
  ]}
>
  <slot name="question">
  <div className="question">
    Quel résultat inclura la sortie ?
    ```js
    const d = Date.UTC(2020, 0, 1)
    console.log(d)
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    La méthode d'aide [`Date.UTC`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/UTC) ne retourne pas une instance de date. Elle retourne un entier en millisecondes.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={8}
  group="Gestion des dates"
  title="Dates UTC Partie 3"
  options={[
    {text: '0'},
    {text: '420', isAnswer: true},
    {text: '700'},
    {text: '1400'},
    {text: 'null'},
  ]}
>
  <slot name="question">
  <div className="question">
    Quelle sortie sera incluse ?
    ```js
    // Assume local TZ is -07:00
    const d = new Date(Date.UTC(2020, 0, 1))
    console.log(d.getTimezoneOffset())
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Les dates seront implicitement affichées en temps local, avec un [`.getTimezoneOffset()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/getTimezoneOffset) (effectivement) constant.

    Les instances `Date` n'enregistrent pas les données de fuseau horaire. Elles stockent le nombre de millisecondes depuis l'époque Unix (1er janvier 1970). Le fuseau horaire est pris en compte lors de l'analyse et de l'affichage des chaînes de date. Le comportement d'affichage par défaut est automatiquement déterminé en fonction des paramètres de langue du système ou du navigateur.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={9}
  group="Gestion des dates"
  title="Date Setters Partie 1"
  options={[
    {text: 'Jan 01 2020', isAnswer: true},
    {text: 'Feb 01 2020'},
    {text: 'RangeError: Invalid argument.'},
  ]}
>
  <slot name="question">
  <div className="question">
    Quelle sortie inclura-t-elle ?
    ```js
    const d = new Date(2020, 0, 1)
    d.setDate(1)
    console.log(d)
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    La méthode [`.setDate()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/setDate) définit le jour du mois, en fonction du mois courant de l'instance donnée.

    Si une valeur est fournie en dehors du nombre de jours disponibles, la valeur du mois de l'instance date sera ajustée (par exemple, un `setDate(32)` en janvier sera calculé comme le 1er février.)

    <aside class="hint">`setDate` définit le jour du mois, généralement dans la plage 1-31.</aside>
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={10}
  group="Gestion des dates"
  title="Date Setters Partie 2"
  options={[
    {text: 'Jan 01 2020'},
    {text: 'Fév 01 2020', isAnswer: true},
    {text: 'RangeError: Invalid argument.', hint: 'setMonth() accepte 0-11 pour les mois'},
  ]}
>
  <slot name="question">
  <div className="question">
    Quelle sortie inclura-t-elle ?
    ```js
    const d = new Date(2020, 0, 1)
    d.setMonth(1)
    console.log(d)
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    La méthode [`.setMonth()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/setMonth) définit le mois de l'instance de date donnée.

    L'argument mois est basé sur zéro, avec une plage de 0 à 11 (en utilisant les calendriers occidentaux.)
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={11}
  group="Gestion des dates"
  title="Les setters de Date – Partie 3"
  options={[
    {text: 'Jan 01 2020'},
    {text: 'Jan 01 2021', isAnswer: true},
    {text: 'Feb 01 2020'},
    {text: 'RangeError: Invalid argument.'},
  ]}
>
  <slot name="question">
  <div className="question">
    Quelle date sera incluse dans la sortie ?
    ```js
    const d = new Date(2020, 0, 1)
    d.setMonth(12)
    console.log(d)
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    La méthode [`.setMonth()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/setMonth) définit le mois de l'instance de date donnée.

    L'argument `month` est indexé à partir de zéro, avec 12 valeurs comprises entre 0 et 11 (selon les calendriers occidentaux).

    Ici, l'année est ajustée à 2021 car `setMonth(12)` dépasse de 1 la valeur maximale (11 = décembre).
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={12}
  group="Manipulation des dates"
  title="Date Setters Partie 4"
  options={[
    {text: '1er janv. 2020'},
    {text: '1er févr. 2020'},
    {text: '1er janv. 2021'},
    {text: '1er févr. 2021', isAnswer: true},
    {text: 'RangeError: Invalid argument.'},
  ]}
>
  <slot name="question">
  <div className="question">
    Quelle date sera incluse dans la sortie ?
    ```js
    const d = new Date(2020, 0, 1)
    d.setMonth(13)
    console.log(d)
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    La méthode [`.setMonth()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/setMonth) définit le mois de l'instance de date donnée.

    L'argument mois est basé sur zéro, avec une plage de 0 à 11 (selon les calendriers occidentaux).

    Ici, le mois et l'année sont ajustés à février 2021, car `setMonth(13)` est supérieur de 2 à 11 (décembre).

    <aside class="hint">`setMonth` définit le mois par index, les 12 mois sont indexés de 0 à 11.</aside>
    <aside class="hint">
    Les nombres en dehors de la plage 0-11 provoqueront un débordement ou un sous-débordement d'année. Par exemple, `setMonth(13)` ajustera l'année à 2021 (en février car 13 est supérieur de 2 à 11).
    </aside>
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={13}
  group="Gestion des dates"
  title="Gestion des dates partie 5"
  options={[
    {text: '1er janv. 2020'},
    {text: '1er févr. 2020'},
    {text: '1er janv. 2019'},
    {text: '1er déc. 2019', isAnswer: true},
    {text: 'RangeError: Argument invalide.'},
  ]}
>
  <slot name="question">
  <div className="question">
    Quelle date sera incluse dans la sortie ?
    ```js
    const d = new Date(2020, 0, 1)
    d.setMonth(-1)
    console.log(d)
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    La méthode [`.setMonth()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/setMonth) définit le mois de l'instance de date donnée.

    L'argument mois est basé sur zéro, avec une plage de 0 à 11 (selon les calendriers occidentaux).

    Ici, on voit que le mois et l'année reviennent en arrière à décembre 2019, car `setMonth(-1)` est inférieur à 0 (janvier).
  </div>
  </slot>
</Challenge>

</QuizUI>
````
