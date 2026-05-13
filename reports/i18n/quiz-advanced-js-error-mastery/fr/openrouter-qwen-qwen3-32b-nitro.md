# Translation Candidate
- Slug: quiz-advanced-js-error-mastery
- Locale: fr
- Model: openrouter/qwen/qwen3-32b:nitro
- Target: src/content/posts/2025-11-04--quiz-advanced-js-error-mastery/fr/index.mdx
- Validation: rejected: direct AI SDK translation failed
- Runtime seconds: 48.64
- Input tokens: 11801
- Output tokens: 12312
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- Estimated cost: $0.003899
- Pricing source: local-openrouter-estimate
- Note: Command failed: bun run i18n:validate --slug quiz-advanced-js-error-mastery --locale fr
## Raw Output

````mdx
---
title: 'Quiz : Maîtrise avancée des erreurs JS'
subTitle: Vos exceptions sont-elles vraiment exceptionnelles ?
label: Errors
category: Quiz
subCategory: JavaScript
unlisted: false
date: '2025-11-03'
modified: '2025-11-04'
tags:
  - quiz
  - javascript
  - error-handling
  - debugging
  - advanced
cover_full_width: ../ahmed-slimene-c09hZthLq_s-unsplash-wide.webp
cover_mobile: ../ahmed-slimene-c09hZthLq_s-unsplash-square-300px.webp
cover_icon: ../ahmed-slimene-c09hZthLq_s-unsplash-square-300px.webp
cover_credit: >-
  Photo by <a
  href="https://unsplash.com/@assl?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Ahmed
  Slimene</a> on <a
  href="https://unsplash.com/photos/a-tall-white-building-with-balconies-on-top-of-it-c09hZthLq_s?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>
---
```mdx
import Challenge from '../../../../../components/QuizUI/Challenge';
import QuizUI from '../../../../../components/QuizUI/QuizUI';


### Pensez-vous connaître les erreurs JavaScript par cœur ?

* **Testez vos connaissances en gestion des erreurs !** 💥
* Aucune inscription ou connexion requise. ✨
* Choix multiples. 🤖 ... _Ce ne sont pas vos questions classiques sur try-catch !_ 
```

<QuizUI>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={0}
  group="Surprises de Sérialisation"
  title="L'Énigme de l'Objet Vide"
  options={[
    {text: '{"message":"Oops","name":"Error"}'},
    {text: '{}', isAnswer: true},
    {text: '{"error":"Oops"}'},
    {text: 'null'},
  ]}
>
  <slot name="question">
  <div className="question">
    Quel est le retour de `JSON.stringify(error)` ?
    ```js
    const error = new Error('Oops');
    console.log(JSON.stringify(error));
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Les objets Error possèdent des propriétés non énumérables (`message`, `name`, `stack`), donc `JSON.stringify()` retourne `{}`. C'est un piège courant lors de l'envoi d'erreurs dans les réponses d'API. Utilisez `JSON.stringify(error, Object.getOwnPropertyNames(error))` ou créez un objet simple à la place.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={1}
  group="Surprises de sérialisation"
  title="Console par rapport à JSON"
  options={[
    {text: 'Les deux affichent la même sortie'},
    {text: 'console.log affiche plus d\'info', isAnswer: true},
    {text: 'JSON.stringify affiche plus d\'info'},
    {text: 'Les deux affichent des objets vides'},
  ]}
>
  <slot name="question">
  <div className="question">
    Quelle est la différence entre ces deux-là ?
    ```js
    const err = new Error('Test');
    console.log(err);
    console.log(JSON.stringify(err));
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    `console.log(err)` affiche l'erreur avec son message et la trace d'empilement car la console traite spécialement les objets Error. `JSON.stringify(err)` renvoie `'{}'` car les propriétés d'Error ne sont pas énumérables. Cette différence piège de nombreux développeurs en débogage d'APIs.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={2}
  group="Astuces de vérification des types"
  title="Héritage instanceof"
  options={[
    {text: 'true, true, true', isAnswer: true},
    {text: 'true, false, false'},
    {text: 'false, true, true'},
    {text: 'true, true, false'},
  ]}
>
  <slot name="question">
  <div className="question">
    Quels sont les résultats de ces vérifications ?
    ```js
    class CustomError extends Error {}
    const err = new CustomError('test');
    
    console.log(err instanceof CustomError);
    console.log(err instanceof Error);
    console.log(err instanceof Object);
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Les trois retournent `true`. `CustomError` étend `Error`, qui étend `Object`. L'opérateur `instanceof` vérifie toute la chaîne de prototype, donc une instance de `CustomError` est aussi une instance de `Error` et `Object`.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={3}
  group="Astuce de vérification de type"
  title="instanceof transversal entre frames"
  options={[
    {text: 'Toujours vrai'},
    {text: 'Toujours faux'},
    {text: 'Peut être faux entre les frames', isAnswer: true},
    {text: 'Lève une erreur'},
  ]}
>
  <slot name="question">
  <div className="question">
    Que se passe-t-il avec `instanceof Error` entre les iframes ?
    ```js
    // In iframe:
    const iframeError = new Error('test');
    // In parent window:
    console.log(iframeError instanceof Error);
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    `instanceof` peut retourner `false` entre différents contextes d'exécution (iframes, workers) car chaque contexte a son propre constructeur `Error`. Utilisez `Object.prototype.toString.call(obj) === '[object Error]'` pour une détection fiable des erreurs entre contextes.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={4}
  group="Lancer des non-erreurs"
  title="Lancers de chaînes"
  options={[
    {text: 'TypeError: la chaîne n\'est pas une Erreur'},
    {text: 'false, "string"', isAnswer: true},
    {text: 'Crée automatiquement un objet Erreur'},
    {text: 'Comportement non défini'},
  ]}
>
  <slot name="question">
  <div className="question">
    Qu'advient-il lorsque vous lancez une chaîne ?
    ```js
    try {
      throw "Oops!";
    } catch (e) {
      console.log(e instanceof Error);
      console.log(typeof e);
    }
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    JavaScript permet de lancer n'importe quelle valeur. Ici, `e instanceof Error` est `false` et `typeof e` est `"string"`. Cela peut casser le code de gestion des erreurs qui suppose que toutes les exceptions capturées sont des objets Error. Toujours lancer des instances Error pour un débogage plus efficace.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={5}
  group="Erreurs personnalisées"
  title="Propriété de nom d'erreur"
  options={[
    {text: '« Error »'},
    {text: '« CustomError »', isAnswer: true},
    {text: 'non défini'},
    {text: 'Dépend du navigateur'},
  ]}
>
  <slot name="question">
  <div className="question">
    Quelle est la valeur de `err.name` ?
    ```js
    class CustomError extends Error {
      constructor(message) {
        super(message);
        this.name = this.constructor.name;
      }
    }
    const err = new CustomError('test');
    console.log(err.name);
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    `err.name` est `« CustomError »` car `this.constructor.name` retourne le nom de la classe. Affecter `this.name = this.constructor.name` est un modèle courant pour garantir que les classes d'erreur personnalisées affichent le bon nom dans les traces d'empilement et les messages d'erreur.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={6}
  group="Erreurs personnalisées"
  title="Piège du nom du constructeur"
  options={[
    {text: '"MyError"'},
    {text: '"Error"', isAnswer: true},
    {text: 'undefined'},
    {text: 'TypeError'},
  ]}
>
  <slot name="question">
  <div className="question">
    Quelle est la sortie sans définir `name` ?
    ```js
    class MyError extends Error {
      // No constructor or name setting
    }
    const err = new MyError('test');
    console.log(err.name);
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    En ne définissant pas explicitement `this.name`, l'erreur hérite de la propriété `name` par défaut de la classe `Error`, qui est `"Error"`. C'est pourquoi les classes d'erreur personnalisées devraient toujours définir `this.name = this.constructor.name` dans leur constructeur.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={7}
  group="Cause d'erreur"
  title="Error.cause moderne"
  options={[
    {text: '"Original error"', isAnswer: true},
    {text: 'undefined'},
    {text: 'The wrapping error'},
    {text: 'SyntaxError'},
  ]}
>
  <slot name="question">
  <div className="question">
    Quelle valeur retourne `wrapper.cause.message` ?
    ```js
    const original = new Error('Original error');
    const wrapper = new Error('Wrapper', 
      { cause: original }
    );
    console.log(wrapper.cause.message);
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    `Error.cause` (ES2022) permet de chaîner les erreurs pour préserver le contexte de l'erreur originale. `wrapper.cause` fait référence à l'erreur originale, donc `wrapper.cause.message` retourne `"Original error"`. Cela est utile pour envelopper des erreurs de bas niveau avec un contexte de haut niveau.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={8}
  group="Traces de pile"
  title="Manipulation de la trace de pile"
  options={[
    {text: 'Supprime createError de la trace de pile', isAnswer: true},
    {text: 'Efface toute la trace de pile'},
    {text: 'Ne fait rien'},
    {text: 'Lance un TypeError'},
  ]}
>
  <slot name="question">
  <div className="question">
    Que fait `Error.captureStackTrace` ?
    ```js
    function createError(msg) {
      const err = new Error(msg);
      Error.captureStackTrace(err, createError);
      return err;
    }
    const error = createError('test');
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    `Error.captureStackTrace` (V8/Node.js) supprime la fonction spécifiée (`createError`) de la trace de pile, rendant invisibles pour les utilisateurs finaux les fonctions de création d'erreurs. Cela crée des traces de pile plus propres qui pointent vers l'endroit où la factory a été appelée, et non la factory elle-même.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={9}
  group="Modèles de messages"
  title="Littéraux de gabarit dans les erreurs"
  options={[
    {text: '"Value ${value} is invalid"'},
    {text: '"Value undefined is invalid"', isAnswer: true},
    {text: 'ReferenceError: value is not defined'},
    {text: '"Value  is invalid"'},
  ]}
>
  <slot name="question">
  <div className="question">
    Quel est le message d'erreur ?
    ```js
    function validate(value) {
      if (!value) {
        throw new Error(
          `Value ${value} is invalid`
        );
      }
    }
    try {
      validate(undefined);
    } catch (e) {
      console.log(e.message);
    }
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Les littéraux de gabarit convertissent `undefined` en la chaîne `"undefined"` lors de l'interpolation. Le message d'erreur devient `"Value undefined is invalid"`. Pour des messages plus propres, envisagez d'utiliser `value ?? 'null'` ou des vérifications similaires avant l'interpolation.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={10}
  group="Pièges API"
  title="Erreur de réponse Express"
  options={[
    {text: 'Envoie l\'objet d\'erreur complet'},
    {text: 'Envoie {"error":{}}', isAnswer: true},
    {text: 'Lance une erreur serveur'},
    {text: 'Envoie uniquement le message d\'erreur'},
  ]}
>
  <slot name="question">
  <div className="question">
    Quel objet est envoyé au client ?
    ```js
    // Express.js route
    app.get('/api/data', (req, res) => {
      const error = new Error('Database failed');
      res.json({ error });
    });
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    `res.json()` utilise `JSON.stringify()` internement, donc l'objet Error devient `{}`. Le client reçoit `{"error":{}}`. Pour corriger cela, utilisez `res.json({ error: error.message })` ou `res.json({ error: { message: error.message, name: error.name } })`.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={11}
  group="Erreurs asynchrones"
  title="Valeurs de rejet des Promesses"
  options={[
    {text: 'Toujours des objets Error'},
    {text: 'N\'importe quelle valeur peut être un rejet', isAnswer: true},
    {text: 'Uniquement des chaînes et des objets Error'},
    {text: 'Automatiquement enveloppés dans Error'},
  ]}
>
  <slot name="question">
  <div className="question">
    Qu'est-ce que `Promise.reject()` peut accepter ?
    ```js
    Promise.reject('string').catch(e => 
      console.log(typeof e)
    );
    Promise.reject({code: 404}).catch(e => 
      console.log(e.code)
    );
    Promise.reject(42).catch(e => 
      console.log(e)
    );
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Comme `throw`, `Promise.reject()` accepte n'importe quelle valeur - chaînes, objets, nombres, etc. Cela affiche `"string"`, `404` et `42`. Vérifiez toujours le type des valeurs capturées dans les chaînes de promesses, surtout lorsqu'on travaille avec du code tiers qui pourrait rejeter avec des valeurs non Error.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={12}
  group="Propriétés d'erreur"
  title="Propriétés non standard"
  options={[
    {text: 'Toujours disponibles'},
    {text: 'Peuvent ne pas exister dans tous les environnements', isAnswer: true},
    {text: 'Uniquement dans Node.js'},
    {text: 'Dépréciées et supprimées'},
  ]}
>
  <slot name="question">
  <div className="question">
    Jusqu'à quel point les propriétés `error.code` et `error.errno` sont fiables ?
    ```js
    const fs = require('fs');
    fs.readFile('missing.txt', (err, data) => {
      if (err) {
        console.log(err.code);    // 'ENOENT'
        console.log(err.errno);   // -2
      }
    });
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Les propriétés `code` et `errno` sont spécifiques à l'environnement (Node.js dans ce cas) et ne font pas partie de l'objet Error standard. Les erreurs dans les navigateurs n'auront pas ces propriétés. Il faut toujours vérifier leur existence : `if (err.code === 'ENOENT')` plutôt que de supposer qu'elles existent.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={13}
  group="Limites d'erreurs"
  title="Détection d'objet vs d'erreur"
  options={[
    {text: 'true, true'},
    {text: 'false, false', isAnswer: true},
    {text: 'true, false'},
    {text: 'false, true'},
  ]}
>
  <slot name="question">
  <div className="question">
    Quel est le retour de ces vérifications ?
    ```js
    const fakeError = {
      name: 'Error',
      message: 'Fake error',
      stack: 'fake stack'
    };
    
    console.log(fakeError instanceof Error);
    console.log(Object.prototype.toString.call(
      fakeError
    ) === '[object Error]');
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    `instanceof Error` renvoie `false` car l'objet n'a pas été créé par le constructeur Error. `Object.prototype.toString.call()` renvoie aussi `false` (il retourne `'[object Object]'`) car il vérifie la propriété interne `[[Class]]`. Les deux méthodes identifient correctement cet objet comme un faux objet d'erreur.
  </div>
  </slot>
</Challenge>

</QuizUI>

## Maîtrisez l'art de la gestion des erreurs

Des pièges liés à la sérialisation aux échecs de instanceof entre contextes, ces concepts avancés séparent les développeurs juniors des professionnels ~expérimentés~ endommagés.

Prêt pour d'autres défis ? Consultez notre [collection complète de quiz](../challenges/) pour des énigmes supplémentaires sur JavaScript, les algorithmes et plus encore !
````
