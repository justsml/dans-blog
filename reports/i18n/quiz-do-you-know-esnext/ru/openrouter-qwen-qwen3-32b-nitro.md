# Translation Candidate
- Slug: quiz-do-you-know-esnext
- Locale: ru
- Model: openrouter/qwen/qwen3-32b:nitro
- Target: src/content/posts/2024-10-31--quiz-do-you-know-esnext/ru/index.mdx
- Validation: deferred
- Runtime seconds: 103.96
- Input tokens: 9254
- Output tokens: 9916
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- Estimated cost: $0.003120
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
title: 'Тест: Знаете ли вы современный JavaScript?'
subTitle: Докажите свои превосходные навыки JavaScript!
label: ES2019+ Features
social_image: ../desktop-social.webp
category: Quiz
subCategory: JavaScript
unlisted: false
date: '2024-10-31'
modified: '2024-11-08'
tags:
  - quiz
  - javascript
  - intro
  - esnext
  - features
  - intermediate
cover_full_width: ../christopher-burns-8KfCR12oeUM-unsplash-wide.webp
cover_mobile: ../christopher-burns-8KfCR12oeUM-unsplash-square.webp
cover_icon: ../christopher-burns-8KfCR12oeUM-unsplash-square.webp
---
import Challenge from '../../../../../components/QuizUI/Challenge';
import QuizUI from '../../../../../components/QuizUI/QuizUI';


### Знакомы ли вы с ES2015 и ES2022?

* **Докажите свои навыки JavaScript!** 🚀
* Не требуется регистрация или вход. ✨
* Вопросы с множественным выбором. 🤖 ... _Насколько это может быть сложно, а?_

<QuizUI>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={0}
  group="ES2020"
  title="Оператор объединения с null"
  options={[
    {text: '42'},
    {text: 'null'},
    {text: 'undefined'},
    {text: '100', isAnswer: true},
  ]}
>
  <slot name="question">
  <div className="question">
    Какое значение у `result`?
    ```js
        console.log(null ?? 100);
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Оператор объединения с null (`??`) возвращает правый операнд (`b`), если левый операнд (`a`) равен `null` или `undefined`. В данном случае `a` равно `null`, поэтому `result` равно `100`.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={1}
  group="ES2020"
  title="Оператор объединения с null"
  options={[
    {text: 'false', isAnswer: true},
    {text: '42'},
    {text: 'null'},
    {text: 'undefined'},
    {text: '100'},
  ]}
>
  <slot name="question">
  <div className="question">
    Каким будет результат выполнения следующего кода?
    ```js
        const value = false;
        const defaultVal = 42;
        console.log(value ?? defaultVal);
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Оператор объединения с null (`??`) считает значения, такие как `false`, допустимыми. Поскольку `value` равно `false`, оно считается допустимым и возвращается.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={2}
  group="Опциональная цепочка"
  title="Опциональная цепочка"
  options={[
    {text: 'undefined', isAnswer: true},
    {text: 'Ошибка: Невозможно прочитать свойство неопределенного значения'},
    {text: 'null'},
    {text: '100'},
  ]}
>
  <slot name="question">
  <div className="question">
    Какой будет результат выполнения следующего кода?
    ```js
        const obj = { foo: null };
        const result = obj.foo?.bar;
        console.log(result);
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Оператор опциональной цепочки (`?.`) останавливает оценку, если левая часть является `null` или `undefined`. Поскольку `obj.foo` равно `null`, `obj.foo?.bar` оценивается как `undefined`.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={3}
  group="BigInt"
  title="Использование BigInt"
  options={[
    {text: 'TypeError: Нельзя смешивать BigInt и число'},
    {text: '42n'},
    {text: '84n', isAnswer: true},
    {text: 'не определено'},
  ]}
>
  <slot name="question">
  <div className="question">
    Какой результат выполнения следующего кода?
    ```js
        const a = 42n;
        const result = a * 2n;
        console.log(result);
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Значения BigInt создаются приписыванием `n` к числу. Смешивать BigInt с обычными числами в арифметических операциях нельзя. Здесь оба значения являются BigInt, поэтому умножение работает, результат — `84n`.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={4}
  group="Динамический импорт"
  title="Динамический импорт (синтаксис)"
  options={[
    {text: 'SyntaxError', hint: 'import() не может быть вызвана в выражении'},
    {text: 'Promise', hint: 'Динамический импорт возвращает Promise'},
    {text: 'Module', hint: 'Модуль разрешается через Promise'},
    {text: 'object', isAnswer: true, hint: 'typeof для Promise возвращает \'object\''},
    {text: 'undefined', hint: 'Модуль не загружен синхронно'},
  ]}
>
  <slot name="question">
  <div className="question">
    Что будет выведено этим кодом?
    ```js
        const modulePromise = import('./myModule.js');
        console.log(typeof modulePromise);
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Функция `import()` возвращает `Promise`, который разрешается в объект модуля. Поскольку экземпляры `Promise` являются объектами, `typeof modulePromise` выводит `'object'`.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={5}
  group="Promise.allSettled"
  title="Promise.allSettled"
  options={[
    {text: 'fulfilled: успех', isAnswer: true},
    {text: 'Rejected: ошибка'},
    {text: 'Pending'},
    {text: 'null'},
  ]}
>
  <slot name="question">
  <div className="question">
    Каким будет результат следующего кода?
    ```js
        const promises = [
          Promise.resolve('success'),
          Promise.reject('error')
        ];
        Promise.allSettled(promises).then(results => {
          console.log(results[0].status + ': ' + results[0].value);
        });
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    `Promise.allSettled` возвращает массив объектов, описывающих результат каждого промиса. Первый промис `fulfilled` со значением 'success', поэтому оператор лога выведет `fulfilled: success`.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={6}
  group="String.matchAll"
  title="Использование String.matchAll"
  options={[
    {text: 'Массив совпадений'},
    {text: 'Итератор совпадений', isAnswer: true},
    {text: 'Ошибка: Неверный вызов'},
    {text: 'null'},
  ]}
>
  <slot name="question">
  <div className="question">
    Что возвращает `str.matchAll()`?
    ```js
        const str = 'foo1bar2baz3';
        const matches = str.matchAll(/\d/g);
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    `String.matchAll` возвращает итератор совпадений, а не массив. Этот итератор можно использовать для получения всех групп совпадений из строки.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={7}
  group="Import Meta"
  title="Использование import.meta"
  options={[
    {text: 'URL текущего модуля', isAnswer: true},
    {text: 'Текущее время'},
    {text: 'undefined'},
    {text: 'SyntaxError'},
  ]}
>
  <slot name="question">
  <div className="question">
    Что представляет собой `import.meta.url`?
    ```js
        console.log(import.meta.url);
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    `import.meta` — это объект, содержащий метаданные о текущем модуле. Свойство `import.meta.url` представляет собой URL текущего модуля, который можно использовать для получения информации о том, где выполняется скрипт.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={8}
  group="Логическое присваивание"
  title="Логическое присваивание"
  options={[
    {text: '5'},
    {text: '10', isAnswer: true},
    {text: 'не определено'},
    {text: 'null'},
  ]}
>
  <slot name="question">
  <div className="question">
    Какое значение у `a` после логического присваивания?
    ```js
        let a = null;
        a ||= 10;
        console.log(a);
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Логическое ИЛИ-присваивание (`||=`) присваивает значение справа, если левое значение ложно (`null`, `undefined`, `0`, `false` и т.д.). Поскольку `a` равно `null`, ему присваивается значение `10`.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={9}
  group="Логическое нулевое присвоение"
  title="Логическое нулевое присвоение"
  options={[
    {text: '5'},
    {text: '10', isAnswer: true},
    {text: 'undefined'},
    {text: 'null'},
  ]}
>
  <slot name="question">
  <div className="question">
    Какое значение переменной `b` после нулевого присвоения?
    ```js
        let b = null;
        b ??= 10;
        console.log(b);
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Оператор нулевого слияния (`??=`) присваивает значение справа, если значение слева является `null` или `undefined`. Поскольку `b` равно `null`, ему присваивается значение `10`.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={10}
  group="WeakRef"
  title="Использование WeakRef"
  options={[
    {text: 'ReferenceError'},
    {text: '{ data: \'important\' }', isAnswer: true},
    {text: 'null'},
    {text: 'undefined'},
  ]}
>
  <slot name="question">
  <div className="question">
    Что предоставляет `WeakRef`?
    ```js
        const obj = { data: 'important' };
        const ref = new WeakRef(obj);
        console.log(ref.deref());
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    `WeakRef` предоставляет слабую ссылку на объект, что позволяет объекту быть собраным сборщиком мусора, если других ссылок на него нет. Поскольку `obj` всё ещё имеет сильную ссылку, `deref()` возвращает оригинальный объект. Если бы цель была собрана, `deref()` вернула бы `undefined`.
  </div>
  </slot>
</Challenge>

</QuizUI>
````
