# Translation Candidate
- Slug: quiz-js-interfaces-symbols-and-enumerables
- Locale: fr
- Model: openrouter/openai/gpt-oss-120b:nitro
- Target: src/content/posts/2024-10-31--quiz-js-interfaces-symbols-and-enumerables/fr/index.mdx
- Validation: passed
- Runtime seconds: 17.81
- Input tokens: 6742
- Output tokens: 3315
- Thinking tokens: unknown
- Cached input tokens: 1472
- Cache write tokens: 0
- Estimated cost: $0.000860
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
unlisted: false
title: "Quiz\_: Symboles et énumérables"
subTitle: Connaissez‑vous les aspects moins connus d’ES2015 ?
label: Symbols
social_image: ../desktop-social.webp
category: Quiz
subCategory: JavaScript
date: '2024-10-31'
modified: '2024-11-07'
tags:
  - quiz
  - javascript
  - interfaces
  - symbols
  - enumerables
cover_full_width: ../logan-weaver-lgnwvr-96ES9AOLRzQ-unsplash.webp
cover_mobile: ../logan-weaver-lgnwvr-96ES9AOLRzQ-unsplash_w300.webp
cover_icon: ../logan-weaver-lgnwvr-96ES9AOLRzQ-unsplash_w300.webp
---
## Quiz : Interfaces JavaScript, Symboles et Énumérables

> * **Prouvez votre maîtrise de JavaScript !** 🚀  
> * Aucun login ou inscription requis. ✨  
> * Choix multiples. 🤖 … _À quel point cela peut‑il être difficile, hein ?_  

import Challenge from '../../../../../components/QuizUI/Challenge';
import QuizUI from '../../../../../components/QuizUI/QuizUI';

<QuizUI>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={0}
  group="Interfaces Avancées"
  title="Accesseur vs Accès Direct à la Propriété"
  options={[
    {text: 'Utiliser une boucle'},
    {text: 'Appeler une méthode pour accéder à la valeur'},
    {text: 'Accéder directement à la valeur', isAnswer: true},
    {text: 'Lancer une erreur'},
  ]}
>
  <slot name="question">
  <div className="question">
    Comment devez‑vous accéder à une propriété d’un objet JavaScript qui utilise un accesseur ?
    ```js
    const obj = {
      get val() {
        return 'got it!';
      }
    };
    console.log(obj.val);
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    En JavaScript, un accesseur peut être accédé comme une propriété normale. Il n’est pas nécessaire de l’appeler comme une fonction.
    Dans cet exemple, accéder à `obj.val` invoque directement la méthode d’accesseur et affiche `got it!`.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={1}
  group="Interfaces Avancées"
  title="Utilisation des Symboles comme Clés d'Objet"
  options={[
    {text: 'Utiliser un Symbol', isAnswer: true},
    {text: 'Utiliser une chaîne'},
    {text: 'Utiliser un nombre'},
    {text: 'Utiliser un objet comme clé'},
  ]}
>
  <slot name="question">
  <div className="question">
    Quelle est la bonne façon de créer une clé de propriété réellement unique pour un objet JavaScript ?
    ```js
    const uniqueKey = Symbol('myUniqueKey');
    const obj = {
      [uniqueKey]: 'unique value'
    };
    console.log(obj[uniqueKey]);
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Les Symboles sont un type primitif unique et immuable qui peut être utilisé comme clés pour les propriétés d’un objet. Cela permet d’éviter les collisions de noms, notamment dans les grands bases de code ou lors de l’écriture de bibliothèques réutilisables.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={2}
  group="Interfaces avancées"
  title="Propriétés énumérables"
  options={[
    {text: 'Lance une erreur'},
    {text: 'Non, il ne le fera pas'},
    {text: 'Cela dépend du type de valeur'},
    {text: 'Oui, il sera listé', isAnswer: true},
  ]}
>
  <slot name="question">
  <div className="question">
    La propriété `age` sera-t-elle listée lors d'une itération `for...in` ?
    ```js
    const person = {};
    Object.defineProperty(person, 'age', {
      value: 25,
      enumerable: true
    });
    for (let key in person) {
      console.log(key);
    }
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    La propriété `enumerable` dans `Object.defineProperty()` détermine si la propriété apparaîtra dans les méthodes d'énumération comme `for...in`. Dans cet exemple, comme `enumerable: true`, la propriété `age` sera listée lors de l'itération.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={3}
  group="Travailler avec les objets"
  title="Énumérabilité par défaut avec Object.defineProperty()"
  options={[
    {text: 'vrai'},
    {text: 'faux', isAnswer: true},
    {text: 'indéfini'},
    {text: 'Dépend du contexte'},
  ]}
>
  <slot name="question">
  <div className="question">
    Quelle est l'énumérabilité par défaut d'une propriété lorsqu'on utilise `Object.defineProperty()` sans spécifier `enumerable` ?
    ```js
    const car = {};
    Object.defineProperty(car, 'make', {
      value: 'Toyota'
    });
    console.log(Object.keys(car));
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Lorsque vous utilisez `Object.defineProperty()` sans spécifier `enumerable`, sa valeur par défaut est `false`. Cela signifie que la propriété `make` n'apparaîtra pas dans `Object.keys()` ni dans d'autres méthodes d'énumération.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={4}
  group="Interfaces avancées"
  title="Symboles uniques"
  options={[
    {text: 'Dépend de leurs descriptions'},
    {text: 'true'},
    {text: 'false', isAnswer: true},
    {text: 'Lance une erreur'},
  ]}
>
  <slot name="question">
  <div className="question">
    Quel sera le résultat de la comparaison suivante ?
    ```js
    const sym1 = Symbol('id');
    const sym2 = Symbol('id');
    console.log(sym1 === sym2);
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Chaque appel à `Symbol()` crée une valeur unique et immuable, même si la description est identique. Dans ce cas, `sym1` et `sym2` sont des symboles différents, donc la comparaison renvoie `false`.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={5}
  group="Interfaces avancées"
  title="Symboles comme clés non‑énumérables"
  options={[
    {text: 'Non, ça ne le fera pas', isAnswer: true},
    {text: 'Oui, il sera listé'},
    {text: 'Cela dépend de la méthode d\'itération'},
    {text: 'Lance une erreur'},
  ]}
>
  <slot name="question">
  <div className="question">
    La propriété à clé Symbol sera‑t‑elle listée lors d’une itération `for...in` ?
    ```js
    const sym = Symbol('uniqueKey');
    const obj = {
      [sym]: 'symbol value',
      regularKey: 'regular value'
    };
    for (let key in obj) {
      console.log(key);
    }
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Les propriétés à clé Symbol peuvent posséder leur propre drapeau `enumerable`, mais `for...in` et `Object.keys()` ne parcourent que les propriétés énumérables à clé chaîne. Dans cet exemple, seule `regularKey` sera listée, pas la propriété à clé Symbol.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={6}
  group="Interfaces avancées"
  title="Récupérer toutes les clés Symbol"
  options={[
    {text: 'Object.keys()'},
    {text: 'Symbol.keys()'},
    {text: 'Object.symbols()'},
    {text: 'Object.getOwnPropertySymbols()', isAnswer: true},
    {text: 'Object.entries()'},
  ]}
>
  <slot name="question">
  <div className="question">
    Quelle méthode peut être utilisée pour récupérer toutes les clés Symbol d'un objet ?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    La méthode `Object.getOwnPropertySymbols()` est utilisée pour récupérer les clés de propriétés Symbol propres à un objet.
    ```js
    const sym1 = Symbol('id');
    const sym2 = Symbol('name');
    const obj = {
      [sym1]: 'symbol value',
      [sym2]: 'another symbol value'
    };
    console.log(Object.getOwnPropertySymbols(obj));
    // [Symbol(id), Symbol(name)]
    ```
  </div>
  </slot>
</Challenge>

</QuizUI>
````
