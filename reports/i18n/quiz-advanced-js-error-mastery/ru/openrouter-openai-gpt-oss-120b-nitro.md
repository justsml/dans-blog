# Translation Candidate
- Slug: quiz-advanced-js-error-mastery
- Locale: ru
- Model: openrouter/openai/gpt-oss-120b:nitro
- Target: src/content/posts/2025-11-04--quiz-advanced-js-error-mastery/ru/index.mdx
- Validation: deferred
- Runtime seconds: 10.92
- Input tokens: 13134
- Output tokens: 7440
- Thinking tokens: unknown
- Cached input tokens: 3584
- Cache write tokens: 0
- Estimated cost: $0.001851
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
title: 'Тест: Продвинутое владение ошибками JS'
subTitle: Ваши исключения действительно исключительные?
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
import Challenge from '../../../../../components/QuizUI/Challenge';
import QuizUI from '../../../../../components/QuizUI/QuizUI';


### Считаешь, что знаешь ошибки JavaScript досконально?

* **Проверь свои навыки обработки ошибок!** 💥
* Регистрация не нужна. ✨
* Выбор из нескольких вариантов. 🤖 … _Это не обычные вопросы про try‑catch!_

<QuizUI>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={0}
  group="Сюрпризы сериализации"
  title="Тайна пустого объекта"
  options={[
    {text: '{"message":"Oops","name":"Error"}'},
    {text: '{}', isAnswer: true},
    {text: '{"error":"Oops"}'},
    {text: 'null'},
  ]}
>
  <slot name="question">
  <div className="question">
    Что возвращает `JSON.stringify(error)`?
    ```js
        const error = new Error('Oops');
        console.log(JSON.stringify(error));
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Объекты Error имеют неперечислимые свойства (`message`, `name`, `stack`), поэтому `JSON.stringify()` возвращает `{}`. Это распространённый подводный камень при отправке ошибок в ответах API. Используйте `JSON.stringify(error, Object.getOwnPropertyNames(error))` или создайте обычный объект вместо него.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={1}
  group="Сюрпризы сериализации"
  title="Консоль vs JSON"
  options={[
    {text: 'Оба показывают одинаковый вывод'},
    {text: 'console.log показывает больше информации', isAnswer: true},
    {text: 'JSON.stringify показывает больше информации'},
    {text: 'Оба показывают пустые объекты'},
  ]}
>
  <slot name="question">
  <div className="question">
    В чём разница между этими двумя?
    ```js
        const err = new Error('Test');
        console.log(err);
        console.log(JSON.stringify(err));
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    `console.log(err)` показывает ошибку с её сообщением и трассировкой стека, потому что консоль имеет специальную обработку объектов Error. `JSON.stringify(err)` возвращает `'{}'`, так как свойства Error не перечисляемы. Эта разница сбивает с толку многих разработчиков, отлаживающих API.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={2}
  group="Трюки проверки типов"
  title="Наследование instanceof"
  options={[
    {text: 'true, true, true', isAnswer: true},
    {text: 'true, false, false'},
    {text: 'false, true, true'},
    {text: 'true, true, false'},
  ]}
>
  <slot name="question">
  <div className="question">
    Каковы результаты этих проверок?
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
    Все три возвращают `true`. `CustomError` наследует `Error`, который наследует `Object`. Оператор `instanceof` проверяет всю цепочку прототипов, поэтому экземпляр `CustomError` также является экземпляром `Error` и `Object`.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={3}
  group="Трюки проверки типов"
  title="instanceof между фреймами"
  options={[
    {text: 'Всегда true'},
    {text: 'Всегда false'},
    {text: 'Может быть false между фреймами', isAnswer: true},
    {text: 'Выбрасывает ошибку'},
  ]}
>
  <slot name="question">
  <div className="question">
    Что происходит с `instanceof Error` между iframe‑ами?
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
    `instanceof` может возвращать `false` в разных контекстах выполнения (iframe‑ы, воркеры), потому что каждый контекст имеет собственный конструктор `Error`. Используйте `Object.prototype.toString.call(obj) === '[object Error]'` для надёжного определения ошибки в разных контекстах.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={4}
  group="Бросание не‑Error"
  title="Бросок строки"
  options={[
    {text: 'TypeError: строка не является объектом Error'},
    {text: 'false, "string"', isAnswer: true},
    {text: 'Создаёт объект Error автоматически'},
    {text: 'неопределённое поведение'},
  ]}
>
  <slot name="question">
  <div className="question">
    Что происходит, когда вы бросаете строку?
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
    JavaScript позволяет бросать любое значение. Здесь `e instanceof Error` равно `false`, а `typeof e` — `"string"`. Это может сломать код обработки ошибок, который предполагает, что все пойманные исключения являются объектами Error. Всегда бросайте экземпляры Error для лучшей отладки.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={5}
  group="Пользовательские ошибки"
  title="Свойство name ошибки"
  options={[
    {text: '"Error"'},
    {text: '"CustomError"', isAnswer: true},
    {text: 'undefined'},
    {text: 'Зависит от браузера'},
  ]}
>
  <slot name="question">
  <div className="question">
    Каково значение `err.name`?
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
    `err.name` равно `"CustomError"`, потому что `this.constructor.name` возвращает имя класса. Установка `this.name = this.constructor.name` — распространённый приём, чтобы пользовательские классы ошибок показывали правильное имя в трассировках стека и сообщениях об ошибке.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={6}
  group="Пользовательские ошибки"
  title="Подводный камень имени конструктора"
  options={[
    {text: '"MyError"'},
    {text: '"Error"', isAnswer: true},
    {text: 'undefined'},
    {text: 'TypeError'},
  ]}
>
  <slot name="question">
  <div className="question">
    Что будет выведено, если не установить `name`?
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
    Если явно не задать `this.name`, ошибка наследует свойство `name` по умолчанию из класса `Error`, которое равно `"Error"`. Поэтому в пользовательских классах ошибок всегда следует устанавливать `this.name = this.constructor.name` в конструкторе.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={7}
  group="Причина ошибки"
  title="Современный Error.cause"
  options={[
    {text: '"Исходная ошибка"', isAnswer: true},
    {text: 'undefined'},
    {text: 'Оборачивающая ошибка'},
    {text: 'SyntaxError'},
  ]}
>
  <slot name="question">
  <div className="question">
    Что возвращает `wrapper.cause.message`?
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
    `Error.cause` (ES2022) позволяет цепочкой связывать ошибки, сохраняя исходный контекст ошибки. `wrapper.cause` ссылается на исходную ошибку, поэтому `wrapper.cause.message` возвращает `"Original error"`. Это полезно для оборачивания ошибок нижнего уровня в контекст более высокого уровня.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={8}
  group="Трассировки стека"
  title="Манипуляция стеком"
  options={[
    {text: 'Удаляет createError из стека', isAnswer: true},
    {text: 'Очищает весь стек'},
    {text: 'Ничего не делает'},
    {text: 'Выбрасывает TypeError'},
  ]}
>
  <slot name="question">
  <div className="question">
    Что делает `Error.captureStackTrace`?
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
    `Error.captureStackTrace` (V8/Node.js) удаляет указанную функцию (`createError`) из трассировки стека, делая функции‑фабрики ошибок невидимыми для конечных пользователей. Это создаёт более чистые трассировки стека, указывающие на место вызова фабрики, а не на саму фабрику.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={9}
  group="Шаблоны сообщений"
  title="Шаблонные строки в ошибках"
  options={[
    {text: '"Значение ${value} недействительно"'},
    {text: '"Значение undefined недействительно"', isAnswer: true},
    {text: 'ReferenceError: value не определено'},
    {text: '"Значение  недействительно"'},
  ]}
>
  <slot name="question">
  <div className="question">
    Каково сообщение об ошибке?
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
    Шаблонные строки преобразуют `undefined` в строку `"undefined"` при интерполяции. Сообщение об ошибке становится `"Value undefined is invalid"`. Для более чистых сообщений рекомендуется использовать `value ?? 'null'` или аналогичные проверки перед интерполяцией.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={10}
  group="Подводные камни API"
  title="Ошибка ответа Express"
  options={[
    {text: 'Отправляет полный объект ошибки'},
    {text: 'Отправляет {"error":{}}', isAnswer: true},
    {text: 'Выбрасывает ошибку сервера'},
    {text: 'Отправляет только сообщение об ошибке'},
  ]}
>
  <slot name="question">
  <div className="question">
    Что отправляется клиенту?
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
    `res.json()` использует `JSON.stringify()` внутри, поэтому объект Error превращается в `{}`. Клиент получает `{"error":{}}`. Чтобы исправить, используйте `res.json({ error: error.message })` или `res.json({ error: { message: error.message, name: error.name } })`.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={11}
  group="Асинхронные ошибки"
  title="Значения отклонения Promise"
  options={[
    {text: 'Только объекты Error'},
    {text: 'Любое значение может быть отклонением', isAnswer: true},
    {text: 'Только строки и объекты Error'},
    {text: 'Автоматически оборачивается в Error'},
  ]}
>
  <slot name="question">
  <div className="question">
    Что может принимать `Promise.reject()`?
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
    Как и `throw`, `Promise.reject()` принимает любое значение — строки, объекты, числа и т.д. Это выводит `"string"`, `404` и `42`. Всегда проверяйте тип перехваченных значений в цепочках промисов, особенно при работе с кодом сторонних библиотек, который может отклонять не объектами Error.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={12}
  group="Свойства ошибки"
  title="Нестандартные свойства"
  options={[
    {text: 'Всегда доступно'},
    {text: 'Может отсутствовать в некоторых средах', isAnswer: true},
    {text: 'Только в Node.js'},
    {text: 'Устарело и удалено'},
  ]}
>
  <slot name="question">
  <div className="question">
    Насколько надёжны `error.code` и `error.errno`?
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
    Свойства вроде `code` и `errno` зависят от среды (в данном случае Node.js) и не входят в стандартный объект Error. Ошибки в браузере этих свойств не имеют. Всегда проверяйте их наличие: `if (err.code === 'ENOENT')` вместо того, чтобы полагаться на их существование.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={13}
  group="Границы Ошибок"
  title="Объект vs Обнаружение Ошибки"
  options={[
    {text: 'true, true'},
    {text: 'false, false', isAnswer: true},
    {text: 'true, false'},
    {text: 'false, true'},
  ]}
>
  <slot name="question">
  <div className="question">
    Что возвращают эти проверки?
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
    `instanceof Error` возвращает `false`, потому что объект не был создан конструктором Error. `Object.prototype.toString.call()` также возвращает `false` (он возвращает `'[object Object]'`) потому что проверяет внутренний слот `[[Class]]`. Оба метода правильно определяют, что это поддельный объект ошибки.
  </div>
  </slot>
</Challenge>

</QuizUI>

## Овладейте искусством обработки ошибок

От подводных камней сериализации до сбоев instanceof в разных контекстах — эти продвинутые темы отделяют новичков от ~изношенных~ профессионалов.

Готовы к новым задачам? Загляните в нашу [полную коллекцию викторин](/challenges/) для дополнительных головоломок по JavaScript, алгоритмам и не только!
````
