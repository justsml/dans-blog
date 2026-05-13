# Translation Candidate
- Slug: quiz-destructuring-delights
- Locale: fr
- Model: openrouter/openai/gpt-oss-120b:nitro
- Target: src/content/posts/2024-11-12--quiz-destructuring-delights/fr/index.mdx
- Validation: passed
- Runtime seconds: 26.13
- Input tokens: 11772
- Output tokens: 7838
- Thinking tokens: unknown
- Cached input tokens: 2944
- Cache write tokens: 0
- Estimated cost: $0.001870
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
unlisted: false
title: 'Quiz : Délices de la déstructuration'
subTitle: Êtes‑vous un maestro du destructuring ?
label: Destructuring
social_image: ../desktop-social.webp
category: Quiz
subCategory: JavaScript
date: '2024-11-12'
modified: '2024-11-16'
tags:
  - quiz
  - intro
  - javascript
  - es2015
  - destructuring
  - beginner
  - intermediate
cover_full_width: ../boxes-of-nesting-dolls.webp
cover_mobile: ../boxes-of-nesting-dolls-square.webp
cover_icon: ../boxes-of-nesting-dolls-square.webp
---
import Challenge from '../../../../../components/QuizUI/Challenge';
import QuizUI from '../../../../../components/QuizUI/QuizUI';

{/* Êtes‑vous un maître du destructuring ?<br/> */}
<p class="inset">Ou bien votre <em>Symphonie de la Destruction ?</em></p>

Ce quiz évaluera votre maîtrise du destructuring en JavaScript : des syntaxes d’objet « basique » au destructuring imbriqué et aux valeurs par défaut. Bonus : questions sur TypeScript et les types inline !

Plongez directement dans l’échauffement – prouvez vos compétences en destructuring ! 👇

<QuizUI>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={0}
  group="Échauffement : Objets"
  title="Destructuration d'objet basique"
  options={[
    {text: 'Nom : Dan Levy, Âge : 20'},
    {text: 'Nom : Dan Levy, Âge : 40'},
    {text: 'Nom : Dan Levy, Âge : Infinity'},
    {text: 'Nom : Dan Levy, Âge : undefined', isAnswer: true},
    {text: 'Erreur : Impossible de lire la propriété \'age\''},
    {text: 'Nom : undefined, Âge : 40'},
  ]}
>
  <slot name="question">
  <div className="question">
    Que affichera ce code ?
    ```js
    const person = {
      name: 'Dan Levy',
      location: 'Cape Town',
    };
    const { name, age } = person;
    console.log(`Name: ${name}, Age: ${age}`);
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    La propriété `age` n'existe pas sur `person`, donc `age` sera `undefined`. Ce n'est certainement pas `Infinity` 😅

    Cela donne :
    ```plaintext
    Name: Dan Levy, Age: undefined
    ```
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={1}
  group="Échauffement : Tableaux"
  title="Valeur par défaut dans la destructuration d'objet"
  options={[
    {text: 'Nom : Dan Levy, Âge : NaN'},
    {text: 'Nom : Dan Levy, Âge : null'},
    {text: 'Nom : Dan Levy, Âge : undefined', isAnswer: true},
    {text: 'Nom : Dan Levy, Âge : 40'},
    {text: 'Erreur : Impossible de déstructurer la propriété \'age\''},
    {text: 'SyntaxError : Jeton inattendu \',\''},
  ]}
>
  <slot name="question">
  <div className="question">
    Que fera ce code ?
    ```js
    const person = [ 'Dan Levy', 'Cape Town' ];
    const [ name, origin, age ] = person;
    console.log(`Name: ${name}, Age: ${age}`);
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    La variable `age` n'est pas présente dans le tableau `tuple`, donc elle sera `undefined`.

    Cela donne :
    ```plaintext
    Name: Dan Levy, Age: undefined
    ```
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={2}
  group="Destructuration imbriquée"
  title="Destructuration imbriquée"
  options={[
    {text: 'Prénom : Dan, Ville : Denver'},
    {text: 'Prénom : undefined, Ville : Denver'},
    {text: 'Erreur : Impossible de lire la propriété \'first\''},
    {text: 'Prénom : Dan, Ville : undefined'},
    {text: 'Erreur', isAnswer: true},
  ]}
>
  <slot name="question">
  <div className="question">
    Et si on faisait de la destructuration imbriquée ?
    ```js
    'use strict';
    const person = {
      name: { first: 'Dan' },
      address: { city: 'Denver' },
    };
    const {
      name: { first },
      address: { city },
      birth: { place },
    } = person;
    console.log(
      `First: ${first}, City: ${place}`,
    );
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    La propriété `birth: { place }` n'existe pas sur `person`, donc elle lèvera une erreur.
    Une solution consiste à fournir des valeurs par défaut pour les propriétés imbriquées.

    Lors de l'accès aux propriétés imbriquées, soyez prudent, car les erreurs peuvent être difficiles à repérer. De plus, les messages d'erreur varient selon les navigateurs et les plateformes, ce qui complique le débogage.

    Dans Chrome moderne : `TypeError: Cannot read properties of undefined (reading 'place')`

    Dans Node, c'est aussi un `TypeError` parce que JavaScript tente de destructurer `place` depuis `undefined` avant même que `place` ne soit lu.

    La formulation exacte varie selon les navigateurs et les environnements d'exécution.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={3}
  group="Valeurs par défaut"
  title="Valeurs par défaut dans la déstructuration d'objets"
  options={[
    {text: 'Salut Dan de Inconnu'},
    {text: 'Salut Dan de Denver'},
    {text: 'Salut Inconnu de Inconnu'},
    {text: 'Salut Inconnu de Denver'},
    {text: 'Erreur', isAnswer: true},
  ]}
>
  <slot name="question">
  <div className="question">
    Avec quelques valeurs par défaut, que va‑t‑il faire ?
    ```js
    'use strict';
    const person = {
      name: { first: 'Dan' },
      address: { city: 'Denver' },
    };
    const {
      name: { first = 'Unknown' },
      birth: { place = 'Unknown' },
    } = person;
    console.log(
      `Hi ${first} from ${place}`,
    );
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    La propriété `birth` n'existe pas sur `person`, donc l'ensemble de l'objet a encore besoin d'une valeur par défaut, pas seulement la propriété imbriquée. En gros, il manque un ` = {}` par défaut là‑dedans.

    La façon dont c'est écrit indique « si `person.birth` est `undefined`, alors `place` vaut `Unknown` ». Mais `person.birth` est `undefined`, donc il essaie de déstructurer `undefined`, ce qui provoque une erreur.
    ```plaintext
    In modern Chrome: `TypeError: Cannot read properties of undefined (reading 'place')`

    In Node, this is also a `TypeError` because JavaScript tries to destructure `place` from `undefined`.

    Exact wording varies between browsers and runtimes.
    ```
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={4}
  group="Valeurs par défaut"
  title="Valeurs par défaut dans la déstructuration d'objet"
  options={[
    {text: 'Salut Dan de Denver'},
    {text: 'Salut Dan de Johannesburg'},
    {text: 'Salut Dan d\'Inconnu', isAnswer: true},
    {text: 'Salut Inconnu d\'Inconnu'},
    {text: 'Salut Inconnu de Denver'},
    {text: 'Erreur'},
  ]}
>
  <slot name="question">
  <div className="question">
    Que fera ce code ?
    ```js
    const person = {
      name: { first: 'Dan' },
      address: { city: 'Denver' },
    };
    const {
      name: { first = 'Unknown' },
      birth: { place = 'Unknown' } = {},
    } = person;

    console.log(
      `Hi ${first} from ${place}`,
    );
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    La propriété `birth` n'existe pas sur `person`, donc elle retombe sur un objet vide ` = {}`. Cela permet d'utiliser la valeur par défaut.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={5}
  group="Arguments de fonction"
  title="Déstructuration des paramètres de fonction avec valeurs par défaut"
  options={[
    {text: 'Salut Dan de undefined'},
    {text: 'Salut Dan de Unknown'},
    {text: 'Salut Dan de Denver'},
    {text: 'Salut Unknown de Unknown'},
    {text: 'Salut Unknown de Denver'},
    {text: 'Erreur', isAnswer: true},
  ]}
>
  <slot name="question">
  <div className="question">
    Maintenant, en tant que paramètres de fonction, que fera-t-elle ?
    ```js
    'use strict';
    function displayUser({
      name = "Unknown",
      age = -1,
    } = { place: "Unknown" }) {
      console.log(`Hi ${name} from ${place}`);
    }
    displayUser({ name: "Dan" });
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Cette fonction extrait les propriétés `name` et `age`, en utilisant des valeurs par défaut si nécessaire. Dans ce cas, la clé `place` de l'objet par défaut n'est qu'un bruit, elle n'est pas utilisée dans `displayUser()`.

    Le mode strict ne change rien ici : lire la liaison non déclarée `place` lève une `ReferenceError`.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={6}
  group="Arguments de fonction"
  title="Destructuration avec valeurs par défaut imbriquées"
  options={[
    {text: 'Inconnu, Inconnu, Joburg'},
    {text: 'Inconnu, Inconnu, Inconnu'},
    {text: 'Inconnu, `undefined`, Joburg'},
    {text: 'N/D, `undefined`, Joburg'},
    {text: 'N/D, Inconnu, Joburg'},
    {text: 'N/D, N/D, Joburg', isAnswer: true},
    {text: 'Inconnu, N/D, Joburg'},
    {text: 'Erreur'},
  ]}
>
  <slot name="question">
  <div className="question">
    Comment les valeurs `undefined` sont‑elles gérées ?
    ```js
    'use strict';
    function displayPlace({
      name = "N/A",
      place = "N/A",
      age = -1,
    } = { place: "Unknown" }) {
      console.log(`${place}`);
    }
    displayPlace({ name: "Dan" });
    displayPlace({ name: "Dan", place: undefined });
    displayPlace({ name: "Dan", place: "Joburg" });
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    La fonction `displayPlace` n’utilisera UN OBJET par défaut que si aucun objet n’est fourni. Ainsi, le seul moyen d’obtenir la valeur par défaut `{ place: "Unknown" }` est d’appeler la fonction sans argument : `displayPlace()`.

    Un autre comportement notable est que passer `undefined` pour `place` déclenchera l’utilisation de la valeur par défaut, un peu comme le comportement de `JSON.stringify` (ignore `undefined`, reconnaît `null`).

    Cela donne :
    ```js
    displayPlace() // Unknown
    displayPlace({ name: "Dan" }) // N/A
    displayPlace({ name: "Dan", place: undefined }) // N/A
    ```
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={7}
  group="Arguments de fonction"
  title="Destructuration avec valeurs par défaut imbriquées"
  options={[
    {text: 'N/A, N/A'},
    {text: 'N/A, undefined'},
    {text: 'Unknown, N/A'},
    {text: 'Unknown, Unknown'},
    {text: 'Unknown, undefined'},
    {text: 'null, N/A', isAnswer: true},
    {text: 'null, Unknown'},
    {text: 'null, undefined'},
    {text: 'Error'},
  ]}
>
  <slot name="question">
  <div className="question">
    Semblable au précédent... comment `null` est‑il géré ?
    ```js
    function displayPlace({
      name = "N/A",
      place = "N/A",
      age = -1,
    } = { place: "Unknown" }) {
      console.log(`${place}`);
    }
    displayPlace({ name: "Dan", place: null });
    displayPlace({ name: "Dan", place: undefined });
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Dans ce cas, la propriété `place` est définie sur `null` lors du premier appel, et sur `undefined` lors du second. La valeur par défaut pour `place` n’est utilisée que si l’ensemble de l’objet est absent **ou** `undefined`. Les `null` passeront tels quels, c’est‑à‑dire `null`.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={8}
  group="Types inline TypeScript"
  title="Destructuration avec valeurs par défaut imbriquées"
  options={[
    {text: 'N/A'},
    {text: 'undefined'},
    {text: 'Inconnu'},
    {text: '\'null\''},
    {text: 'Erreur TypeScript', isAnswer: true},
  ]}
>
  <slot name="question">
  <div className="question">
    Maintenant en TypeScript... _que fera-t-il ?_
    ```ts
    'use strict';
    function displayPlace(
      {
        name = 'N/A',
        place = 'N/A',
      }: {
        name: string;
        place: string;
        age: number;
      },
    ) {
      console.log(`${place}`);
    }
    displayPlace({ name: 'Dan', place: null });
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    TypeScript signale une erreur parce que `place` est typé comme `string`, mais l'appel passe `null`. L'appel omet également la propriété requise `age`.

    Si vous ignorez les erreurs de type, l'exécution du code affichera `null` dans la console.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={9}
  group="TypeScript : avec assignation"
  title="Destructuration avec valeurs par défaut imbriquées"
  options={[
    {text: 'undefined'},
    {text: 'null'},
    {text: 'N/A'},
    {text: 'Unknown'},
    {text: 'Denver', isAnswer: true},
    {text: 'SyntaxError'},
    {text: 'Error: Invalid type'},
    {text: 'Error: Invalid Arguments'},
  ]}
>
  <slot name="question">
  <div className="question">
    Essayons un peu de renommage/assignation...
    ```ts
    'use strict';
    function displayPlace({
      name = 'N/A',
      place: location = 'N/A',
    }: {
      name: string;
      place: string;
      age?: number;
    }) {
      console.log(`${location}`);
    }
    displayPlace({ name: 'Dan', place: 'Denver' });
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Cela affichera `Denver` dans la console. La propriété `place` est renommée en `location` dans la signature de la fonction. C’est un schéma courant (renommer des propriétés lors de la destructuration) lorsqu’on adapte des structures de données tierces.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={10}
  group="Destructuration imbriquée en TS"
  title="Destructuration avec valeurs par défaut imbriquées"
  options={[
    {text: 'Erreur : la propriété \'first\' est manquante'},
    {text: 'Erreur : la propriété \'last\' est manquante'},
    {text: 'Erreur : les propriétés \'birth\' et \'age\' sont manquantes', isAnswer: true},
    {text: 'Erreur : la propriété \'place\' est manquante'},
    {text: 'Erreur : \'string\' n\'a aucune propriété dans {...}'},
  ]}
>
  <slot name="question">
  <div className="question">
    Repérez l'erreur de type :
    ```ts
    function greet({
      name: {first = "N/A", last = "N/A"},
      birth: {place = "N/A"} = {},
      age = -1,
    }: {
      name: {first?: string, last?: string};
      birth: {place?: string};
      age: number;
    }) {
      console.log(`Hi ${first} ${last} from ${place}`);
    }
    greet({ name: {first: 'Dan'} });
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    L'erreur se trouve dans la signature de la fonction `greet`. Les propriétés `age` et `birth` sont absentes dans l'objet passé, elles doivent donc être optionnelles dans la définition du type.

    Même si la propriété `birth` est destructurée avec une valeur par défaut, la définition du type exige qu'elle soit présente. Pour marquer une propriété comme optionnelle en TypeScript, il faut utiliser l'opérateur `?`.

    Notez que `birth?: { place?: string }` n'est pas équivalent à `birth: { place?: string } | undefined`.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={11}
  group="TypeScript + Affectation"
  title="Destructuration avec valeurs imbriquées, affectation et types"
  options={[
    {text: 'Salut Dan Levy de N/A'},
    {text: 'Salut Dan Levy de Cape Town'},
    {text: 'Salut N/A N/A de N/A'},
    {text: 'Salut N/A N/A de Cape Town'},
    {text: 'Erreur', isAnswer: true},
  ]}
>
  <slot name="question">
  <div className="question">
    Maintenant avec **affectation** (notez les variables `f`, `l` et `p`)
    ```ts
    'use strict';
    function greet(
      {
        name: {first: f = "N/A", last: l = "N/A"},
        birth: {place: p = "N/A"} = {},
        age = -1,
      }: {
        name: {first?: string, last?: string};
        birth?: {place?: string};
        age?: number;
      }
    ) {
      console.log(`Hi ${f} ${l} from ${place}`);
      // What will 👆 do?
    }
    greet({
      name: {first: 'Dan', last: 'Levy'},
      birth: {place: 'Cape Town'},
    });
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Une autre erreur ! Vous commencez à deviner, n'est-ce pas ?!

    Il est difficile de lire les couches de destructuration, avec des valeurs par défaut, l'affectation et les types !

    Dès que `place` est réassigné à la variable `p`, il n'est plus défini dans la portée de l'instruction `console.log`.
    ```ts
    console.log(`Hi ${f} ${l} from ${place}`); // ❌
    // to:
    console.log(`Hi ${f} ${l} from ${p}`); // ✅
    ```
  </div>
  </slot>
</Challenge>

</QuizUI>
````
