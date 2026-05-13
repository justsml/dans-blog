# Translation Candidate
- Slug: quiz-advanced-js-error-mastery
- Locale: fr
- Model: qwen/qwen3.6-35b-a3b
- Target: src/content/posts/2025-11-04--quiz-advanced-js-error-mastery/fr/index.mdx
- Validation: deferred
- Runtime seconds: 265.72
- Input tokens: 13525
- Output tokens: 45401
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- Estimated cost: $0.047254
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
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
---
import Challenge from '../../../../components/QuizUI/Challenge';
import QuizUI from '../../../../components/QuizUI/QuizUI';


### Vous pensez tout savoir sur les erreurs JavaScript ?

* **Testez votre expertise en gestion d'erreurs !** 💥
* Aucune connexion ni inscription requise. ✨
* QCM. 🤖 ... _Ces questions ne sont pas vos classiques try-catch !_
---

<QuizUI>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={0}
  group="Surprises de la sérialisation"
  title="Le mystère de l'objet vide"
  options={[
    {text: '{"message":"Oops","name":"Error"}'},
    {text: '{}', isAnswer: true},
    {text: '{"error":"Oops"}'},
    {text: 'null'},
  ]}
>
  <slot name="question">
  <div className="question">
    Que retourne `JSON.stringify(error)` ?
    ```js
        const error = new Error('Oops');
        console.log(JSON.stringify(error));
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Les objets `Error` possèdent des propriétés non énumérables (`message`, `name`, `stack`), ce qui fait que `JSON.stringify()` retourne `{}`. C'est un piège classique lorsqu'on renvoie des erreurs dans des réponses API. Utilisez plutôt `JSON.stringify(error, Object.getOwnPropertyNames(error))` ou créez un objet simple à la place.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={1}
  group="Surprises de la sérialisation"
  title="Console vs JSON"
  options={[
    {text: 'Les deux affichent la même sortie'},
    {text: 'console.log affiche plus d\'informations', isAnswer: true},
    {text: 'JSON.stringify affiche plus d\'informations'},
    {text: 'Les deux affichent des objets vides'},
  ]}
>
  <slot name="question">
  <div className="question">
    Quelle différence entre ces deux méthodes ?
    ```js
        const err = new Error('Test');
        console.log(err);
        console.log(JSON.stringify(err));
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    `console.log(err)` affiche l'erreur avec son message et sa pile d'appels, car la console possède un traitement spécial pour les objets Error. `JSON.stringify(err)` renvoie `'{}'` car les propriétés des Error ne sont pas énumérables. Cette différence fait souvent trébucher les développeurs qui déboguent des APIs.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={2}
  group="Astuces de vérification de type"
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
    Les trois retournent `true`. `CustomError` hérite de `Error`, qui hérite lui-même de `Object`. L'opérateur `instanceof` vérifie toute la chaîne de prototypes, donc une instance de `CustomError` est également une instance de `Error` et de `Object`.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={3}
  group="Astuces de vérification de type"
  title="instanceof inter-trames"
  options={[
    {text: 'Toujours vrai'},
    {text: 'Toujours faux'},
    {text: 'Peut être faux entre trames', isAnswer: true},
    {text: 'Lève une erreur'},
  ]}
>
  <slot name="question">
  <div className="question">
    Que se passe-t-il avec `instanceof Error` entre iframes ?
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
    L'opérateur `instanceof` peut retourner `false` entre différents contextes d'exécution (iframes, Web Workers) car chaque contexte possède son propre constructeur `Error`. Pour une détection fiable des erreurs, privilégiez `Object.prototype.toString.call(obj) === '[object Error]'`.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={4}
  group="Lancer des valeurs non-Error"
  title="Lancer des chaînes"
  options={[
    {text: 'TypeError: string is not an Error'},
    {text: 'false, "string"', isAnswer: true},
    {text: 'Crée automatiquement un objet Error'},
    {text: 'Comportement indéfini'},
  ]}
>
  <slot name="question">
  <div className="question">
    Que se passe-t-il si vous `throw` une chaîne ?
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
    JavaScript permet de lancer n'importe quelle valeur. Ici, `e instanceof Error` vaut `false` et `typeof e` est `"string"`. Cela peut casser les mécanismes de gestion d'erreurs qui supposent que toutes les exceptions capturées sont des objets Error. Lancez toujours des instances de `Error` pour un débogage plus efficace.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={5}
  group="Erreurs personnalisées"
  title="Propriété `name` de l'erreur"
  options={[
    {text: '"Error"'},
    {text: '"CustomError"', isAnswer: true},
    {text: 'undefined'},
    {text: 'Cela dépend du navigateur'},
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
    `err.name` vaut `"CustomError"` car `this.constructor.name` renvoie le nom de la classe. Assigner `this.name = this.constructor.name` est une pratique courante pour garantir que les classes d'erreurs personnalisées affichent le bon nom dans les traces de pile et les messages d'erreur.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={6}
  group="Erreurs personnalisées"
  title="Le piège du nom du constructeur"
  options={[
    {text: '"MyError"'},
    {text: '"Error"', isAnswer: true},
    {text: 'undefined'},
    {text: 'TypeError'},
  ]}
>
  <slot name="question">
  <div className="question">
    Quel est le résultat sans définir `name` ?
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
    Sans définir explicitement `this.name`, l'erreur hérite de la propriété `name` par défaut de la classe `Error`, qui est `"Error"`. C'est pourquoi les classes d'erreurs personnalisées doivent toujours définir `this.name = this.constructor.name` dans leur constructeur.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={7}
  group="Cause de l'erreur"
  title="Error.cause moderne"
  options={[
    {text: '"Erreur originale"', isAnswer: true},
    {text: 'undefined'},
    {text: 'L\'erreur wrapper'},
    {text: 'SyntaxError'},
  ]}
>
  <slot name="question">
  <div className="question">
    Que retourne `wrapper.cause.message` ?
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
    `Error.cause` (ES2022) permet de chaîner les erreurs afin de conserver le contexte de l'erreur initiale. `wrapper.cause` pointe vers l'erreur originale, ce qui fait que `wrapper.cause.message` renvoie `"Erreur originale"`. Cette fonctionnalité est idéale pour envelopper des erreurs de bas niveau avec un contexte applicatif de plus haut niveau.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={8}
  group="Traces de pile"
  title="Manipulation de la pile"
  options={[
    {text: 'Supprime `createError` de la pile', isAnswer: true},
    {text: 'Efface toute la pile'},
    {text: 'Ne fait rien'},
    {text: 'Lève un `TypeError`'},
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
    `Error.captureStackTrace` (V8/Node.js) retire la fonction spécifiée (`createError`) de la trace de pile, ce qui masque les fonctions créatrices d'erreurs aux utilisateurs finaux. Cela permet d'obtenir des traces de pile plus propres, qui pointent directement vers l'endroit où la factory a été appelée, et non vers la factory elle-même.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={9}
  group="Modèles de message"
  title="Les modèles de chaîne dans les erreurs"
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
    Les modèles de chaîne convertissent `undefined` en la chaîne `"undefined"` lors de l'interpolation. Le message d'erreur devient donc `"Value undefined is invalid"`. Pour des messages plus propres, pensez à utiliser `value ?? 'null'` ou des vérifications similaires avant l'interpolation.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={10}
  group="Pièges de l'API"
  title="Erreur de réponse Express"
  options={[
    {text: 'Envoie l\'objet d\'erreur complet'},
    {text: 'Envoie {"error":{}}', isAnswer: true},
    {text: 'Lève une erreur serveur'},
    {text: 'Envoie uniquement le message d\'erreur'},
  ]}
>
  <slot name="question">
  <div className="question">
    Qu'est-ce qui est envoyé au client ?
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
    `res.json()` utilise `JSON.stringify()` en interne, ce qui transforme l'objet Error en `{}`. Le client reçoit donc `{"error":{}}`. Pour corriger le tir, utilisez `res.json({ error: error.message })` ou `res.json({ error: { message: error.message, name: error.name } })`.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={11}
  group="Erreurs asynchrones"
  title="Valeurs de rejet de Promise"
  options={[
    {text: 'Toujours des objets Error'},
    {text: 'N\'importe quelle valeur peut être rejetée', isAnswer: true},
    {text: 'Uniquement des chaînes et des objets Error'},
    {text: 'Automatiquement enveloppé dans un Error'},
  ]}
>
  <slot name="question">
  <div className="question">
    Que peut bien accepter `Promise.reject()` ?
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
    Comme `throw`, `Promise.reject()` accepte n'importe quelle valeur : chaînes, objets, nombres, etc. Cela affichera `"string"`, `404` et `42`. Vérifiez systématiquement le type des valeurs interceptées dans les chaînes de promesses, surtout face à du code tiers susceptible de rejeter avec des valeurs non-Error.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={12}
  group="Propriétés des erreurs"
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
    Quelle fiabilité accorder à `error.code` et `error.errno` ?
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
    Les propriétés comme `code` et `errno` sont spécifiques à l'environnement d'exécution (Node.js ici) et ne font pas partie du standard `Error`. C'est pourquoi les navigateurs ne les incluent tout simplement pas. Ne partez jamais du principe qu'elles existent : vérifiez toujours leur présence avec `if (err.code === 'ENOENT')` avant de les manipuler.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={13}
  group="Limites d'erreur"
  title="Objet vs Détection d'Erreur"
  options={[
    {text: 'true, true'},
    {text: 'false, false', isAnswer: true},
    {text: 'true, false'},
    {text: 'false, true'},
  ]}
>
  <slot name="question">
  <div className="question">
    Que retournent ces vérifications ?
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
    `instanceof Error` retourne `false` car l'objet n'a pas été instancié via le constructeur `Error`. `Object.prototype.toString.call()` renvoie aussi `false` (il retourne `'[object Object]'`) car il inspecte le slot interne `[[Class]]`. Les deux méthodes identifient correctement qu'il s'agit d'un objet d'erreur factice.
  </div>
  </slot>
</Challenge>

</QuizUI>

## Maîtriser l'art de la gestion des erreurs

Des pièges de la sérialisation aux échecs instanceof inter-contextes, ces concepts avancés distinguent les développeurs juniors des professionnels ~expérimentés~ endommagés.

Prêt pour de nouveaux défis ? Consultez notre [collection complète de quiz](../challenges/) pour d'autres puzzles sur JavaScript, les algorithmes et bien plus !
````
