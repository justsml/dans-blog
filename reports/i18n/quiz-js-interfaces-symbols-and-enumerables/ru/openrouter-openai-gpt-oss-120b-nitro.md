# Translation Candidate
- Slug: quiz-js-interfaces-symbols-and-enumerables
- Locale: ru
- Model: openrouter/openai/gpt-oss-120b:nitro
- Target: src/content/posts/2024-10-31--quiz-js-interfaces-symbols-and-enumerables/ru/index.mdx
- Validation: deferred
- Runtime seconds: 9.99
- Input tokens: 6928
- Output tokens: 3493
- Thinking tokens: unknown
- Cached input tokens: 2176
- Cache write tokens: 0
- Estimated cost: $0.000899
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
unlisted: false
title: 'Тест: Symbol и перечислимые свойства'
subTitle: Вы знакомы с менее известными особенностями ES2015?
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
## Quiz: JavaScript Interfaces, Symbols, and Enumerables

> * **Докажите своё мастерство в JavaScript!** 🚀  
> * Регистрации и входа не требуется. ✨  
> * Выбор из нескольких вариантов. 🤖 … _Насколько это может быть сложным, а?_

import Challenge from '../../../../../components/QuizUI/Challenge';
import QuizUI from '../../../../../components/QuizUI/QuizUI';

<QuizUI>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={0}
  group="Продвинутые интерфейсы"
  title="Геттер vs Прямой доступ к свойству"
  options={[
    {text: 'Использовать цикл'},
    {text: 'Вызвать метод для доступа к значению'},
    {text: 'Получить значение напрямую', isAnswer: true},
    {text: 'Выбросить ошибку'},
  ]}
>
  <slot name="question">
  <div className="question">
    Как следует получать свойство объекта JavaScript, которое реализовано через геттер?
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
    В JavaScript геттер можно получать как обычное свойство. Нет необходимости вызывать его как функцию.
    В этом примере прямой доступ к `obj.val` вызывает геттер и выводит `got it!`.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={1}
  group="Продвинутые интерфейсы"
  title="Использование Symbol в ключах объектов"
  options={[
    {text: 'Использование Symbol', isAnswer: true},
    {text: 'Использование строки'},
    {text: 'Использование числа'},
    {text: 'Использование объекта в качестве ключа'},
  ]}
>
  <slot name="question">
  <div className="question">
    Как правильно создать действительно уникальный ключ свойства для объекта JavaScript?
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
    Symbol — уникальный и неизменяемый примитивный тип, который можно использовать в качестве ключей свойств объекта. Это помогает избегать конфликтов имён, особенно в больших кодовых базах или при написании переиспользуемых библиотек.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={2}
  group="Продвинутые интерфейсы"
  title="Перечислимые свойства"
  options={[
    {text: 'Вызывает ошибку'},
    {text: 'Нет, он не будет'},
    {text: 'Зависит от типа значения'},
    {text: 'Да, он будет перечислен', isAnswer: true},
  ]}
>
  <slot name="question">
  <div className="question">
    Будет ли свойство `age` перечислено при итерации `for...in`?
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
    Свойство `enumerable` в `Object.defineProperty()` определяет, будет ли свойство появляться в методах перечисления, таких как `for...in`. В этом примере, поскольку `enumerable: true`, свойство `age` будет перечислено при итерации.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={3}
  group="Работа с объектами"
  title="Перечисляемость по умолчанию при использовании Object.defineProperty()"
  options={[
    {text: 'true'},
    {text: 'false', isAnswer: true},
    {text: 'undefined'},
    {text: 'Зависит от контекста'},
  ]}
>
  <slot name="question">
  <div className="question">
    Какова перечисляемость свойства по умолчанию при использовании `Object.defineProperty()` без указания `enumerable`?
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
    Если вы вызываете `Object.defineProperty()` без указания `enumerable`, его значение по умолчанию — `false`. Это означает, что свойство `make` не появится в `Object.keys()` и других методах перечисления.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={4}
  group="Продвинутые интерфейсы"
  title="Уникальные символы"
  options={[
    {text: 'Зависит от их описаний'},
    {text: 'true'},
    {text: 'false', isAnswer: true},
    {text: 'Выдает ошибку'},
  ]}
>
  <slot name="question">
  <div className="question">
    Каков будет результат следующего сравнения?
    ```js
        const sym1 = Symbol('id');
        const sym2 = Symbol('id');
        console.log(sym1 === sym2);
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Каждый вызов `Symbol()` создаёт уникальное и неизменяемое значение, даже если описание одинаково. В данном случае `sym1` и `sym2` — разные символы, поэтому сравнение возвращает `false`.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={5}
  group="Продвинутые интерфейсы"
  title="Символы как не‑перечислимые ключи"
  options={[
    {text: 'Нет, он не будет перечислен', isAnswer: true},
    {text: 'Да, он будет в списке'},
    {text: 'Зависит от метода итерации'},
    {text: 'Вызывает ошибку'},
  ]}
>
  <slot name="question">
  <div className="question">
    Будет ли свойство с ключом‑символом перечислено при итерации `for...in`?
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
    Свойства, ключи которых являются Symbol, могут иметь собственный флаг `enumerable`, но `for...in` и `Object.keys()` обходят только перечислимые свойства с строковыми ключами. В данном примере в список попадёт лишь `regularKey`, а свойство с Symbol‑ключом — нет.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={6}
  group="Продвинутые интерфейсы"
  title="Получить все Symbol‑ключи"
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
    Какой метод можно использовать для получения всех Symbol‑ключей объекта?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Метод `Object.getOwnPropertySymbols()` используется для получения собственных Symbol‑ключей свойства объекта.
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
