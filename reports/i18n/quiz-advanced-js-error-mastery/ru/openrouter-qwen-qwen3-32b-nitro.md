# Translation Candidate
- Slug: quiz-advanced-js-error-mastery
- Locale: ru
- Model: openrouter/qwen/qwen3-32b:nitro
- Target: src/content/posts/2025-11-04--quiz-advanced-js-error-mastery/ru/index.mdx
- Validation: rejected: direct AI SDK translation failed
- Runtime seconds: 115.36
- Input tokens: 11755
- Output tokens: 11459
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- Estimated cost: $0.003691
- Pricing source: local-openrouter-estimate
- Note: Command failed: git add src/content/posts/2025-11-04--quiz-advanced-js-error-mastery/ru/index.mdx reports/i18n/quiz-advanced-js-error-mastery/ru
## Raw Output

````mdx
---
title: 'Тест: Продвинутые ошибки JS. Мастерство'
subTitle: Ваши исключения действительно исключительны?
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


### Думаете, вы знаете ошибки JavaScript как свои пять пальцев?

* **Проверьте свои навыки обработки ошибок!** 💥
* Нет необходимости в регистрации или входе. ✨
* Множественный выбор. 🤖 ... _Это не обычные вопросы по try-catch!_

<QuizUI>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={0}
  group="Неожиданности сериализации"
  title="Загадка пустого объекта"
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
    Объекты Error содержат не перечисляемые свойства (`message`, `name`, `stack`), поэтому `JSON.stringify()` возвращает `{}`. Это распространённая ошибка при отправке ошибок в ответах API. Используйте `JSON.stringify(error, Object.getOwnPropertyNames(error))` или создавайте plain-объекты вместо Error.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={1}
  group="Неожиданности сериализации"
  title="Консоль против JSON"
  options={[
    {text: 'Оба выводят одинаковый результат', hint: 'Консоль имеет специальное представление для объектов ошибок'},
    {text: 'console.log показывает больше информации', isAnswer: true, hint: 'Проверьте, какие свойства перечисляемы'},
    {text: 'JSON.stringify показывает больше информации', hint: 'Ошибка — это особый тип объекта'},
    {text: 'Оба выводят пустые объекты', hint: 'console.log ведёт себя иначе'},
  ]}
>
  <slot name="question">
  <div className="question">
    В чём разница между ними?
    ```js
        const err = new Error('Test');
        console.log(err);
        console.log(JSON.stringify(err));
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    `console.log(err)` показывает ошибку с её сообщением и трассировкой стека, потому что консоль имеет специальное обработку для объектов ошибок. `JSON.stringify(err)` возвращает `'{}'`, потому что свойства ошибок не перечисляемы. Эта разница сбивает с толку многих разработчиков, отлаживающих API.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={2}
  group="Уловки проверки типов"
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
    Все три возвращают `true`. `CustomError` расширяет `Error`, который расширяет `Object`. Оператор `instanceof` проверяет всю цепочку прототипов, поэтому экземпляр `CustomError` также является экземпляром `Error` и `Object`.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={3}
  group="Уловки проверки типов"
  title="Перекрестный instanceof"
  options={[
    {text: 'Всегда истинно'},
    {text: 'Всегда ложно'},
    {text: 'Может быть ложным в разных фреймах', isAnswer: true},
    {text: 'Вызывает ошибку'},
  ]}
>
  <slot name="question">
  <div className="question">
    Что происходит с `instanceof Error` при использовании в разных iframe?
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
    Оператор `instanceof` может возвращать `false` в разных контекстах выполнения (iframe, воркеры), потому что каждый контекст имеет свой конструктор `Error`. Используйте `Object.prototype.toString.call(obj) === '[object Error]'` для надежного обнаружения ошибок в разных контекстах.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={4}
  group="Бросание необъектов ошибок"
  title="Бросок строки"
  options={[
    {text: 'TypeError: string is not an Error'},
    {text: 'false, "string"', isAnswer: true},
    {text: 'Создаёт объект Error автоматически'},
    {text: 'Неопределённое поведение'},
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
    JavaScript позволяет бросать любое значение. Здесь `e instanceof Error` будет `false`, а `typeof e` вернёт `"string"`. Это может нарушить обработку ошибок, предполагающую, что все исключения — это объекты Error. Всегда бросайте экземпляры Error для улучшения отладки.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={5}
  group="Пользовательские ошибки"
  title="Свойство имени ошибки"
  options={[
    {text: '"Ошибка"'},
    {text: '"ПользовательскаяОшибка"', isAnswer: true},
    {text: 'не определено'},
    {text: 'Зависит от браузера'},
  ]}
>
  <slot name="question">
  <div className="question">
    Какое значение у `err.name`?
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
    `err.name` будет "ПользовательскаяОшибка", потому что `this.constructor.name` возвращает имя класса. Установка `this.name = this.constructor.name` — распространённый паттерн, чтобы обеспечить правильное отображение пользовательских классов ошибок в трассировках стека и сообщениях об ошибках.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={6}
  group="Пользовательские ошибки"
  title="Питка с именем конструктора"
  options={[
    {text: '"MyError"'},
    {text: '"Error"', isAnswer: true},
    {text: 'undefined'},
    {text: 'TypeError'},
  ]}
>
  <slot name="question">
  <div className="question">
    Какой результат без установки `name`?
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
    Если не задавать `this.name` явно, ошибка наследует свойство `name` по умолчанию из класса `Error`, которое равно `Error`. Именно поэтому пользовательские классы ошибок всегда должны устанавливать `this.name = this.constructor.name` в своем конструкторе.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={7}
  group="Причина ошибки"
  title="Современный Error.cause"
  options={[
    {text: 'Исходная ошибка', isAnswer: true},
    {text: 'undefined'},
    {text: 'Обертывающая ошибка'},
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
    `Error.cause` (ES2022) позволяет связывать ошибки для сохранения контекста исходной ошибки. `wrapper.cause` ссылается на исходную ошибку, поэтому `wrapper.cause.message` возвращает `"Исходная ошибка"`. Это полезно для обертывания низкоуровневых ошибок в более высокий уровень контекста.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={8}
  group="Трассировки стека"
  title="Манипуляции со стеком"
  options={[
    {text: 'Удаляет createError из стека', isAnswer: true},
    {text: 'Очищает весь стек'},
    {text: 'Ничего не делает'},
    {text: 'Вызывает TypeError'},
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
    `Error.captureStackTrace` (V8/Node.js) удаляет указанную функцию (`createError`) из трассировки стека, делая функции-фабрики ошибок невидимыми для конечных пользователей. Это создаёт более чистые трассировки стека, которые указывают на место вызова фабрики, а не на саму фабрику.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={9}
  group="Шаблоны сообщений"
  title="Шаблонные литералы в ошибках"
  options={[
    {text: 'Значение ${value} недопустимо'},
    {text: 'Значение undefined недопустимо', isAnswer: true},
    {text: 'ReferenceError: value is not defined'},
    {text: 'Значение  недопустимо'},
  ]}
>
  <slot name="question">
  <div className="question">
    Какое сообщение об ошибке?
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
    Шаблонные литералы преобразуют `undefined` в строку `"undefined"` во время интерполяции. Сообщение об ошибке становится `"Value undefined is invalid"`. Для более чистых сообщений используйте `value ?? 'null'` или аналогичные проверки перед интерполяцией.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={10}
  group="Питанья API"
  title="Ошибка ответа Express"
  options={[
    {text: 'Отправляет полный объект ошибки'},
    {text: 'Отправляет {"error":{}}', isAnswer: true},
    {text: 'Вызывает серверную ошибку'},
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
    `res.json()` использует `JSON.stringify()` внутренне, поэтому объект Error становится `{}`. Клиент получает `{"error":{}}`. Для исправления используйте `res.json({ error: error.message })` или `res.json({ error: { message: error.message, name: error.name } })`.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={11}
  group="Асинхронные ошибки"
  title="Значения отклонения Promise"
  options={[
    {text: 'Всегда объекты Error'},
    {text: 'Любое значение может быть отклонением', isAnswer: true},
    {text: 'Только строки и объекты Error'},
    {text: 'Автоматически обёрнуты в Error'},
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
    Как и `throw`, `Promise.reject()` принимает любое значение - строки, объекты, числа и т.д. Это выводит `"строка"`, `404` и `42`. Всегда проверяйте типы значений, перехватываемых в цепочках промисов, особенно при работе с чужим кодом, который может отклонять не объекты Error.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={12}
  group="Свойства ошибок"
  title="Нестандартные свойства"
  options={[
    {text: 'Всегда доступны'},
    {text: 'Могут отсутствовать в некоторых средах', isAnswer: true},
    {text: 'Только в Node.js'},
    {text: 'Устарели и удалены'},
  ]}
>
  <slot name="question">
  <div className="question">
    Как надежны свойства `error.code` и `error.errno`?
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
    Свойства, такие как `code` и `errno`, зависят от среды (например, Node.js) и не являются частью стандартного объекта Error. В браузерах эти свойства отсутствуют. Всегда проверяйте их наличие: `if (err.code === 'ENOENT')`, а не предполагайте их существование.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={13}
  group="Границы ошибок"
  title="Объект против обнаружения ошибок"
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
    `instanceof Error` возвращает `false`, потому что объект не был создан конструктором Error. `Object.prototype.toString.call()` также возвращает `false` (он возвращает `'[object Object]'`), потому что проверяет внутренний слот `[[Class]]`. Оба метода правильно определяют это как поддельный объект ошибки.
  </div>
  </slot>
</Challenge>

</QuizUI>

## Освойте искусство обработки ошибок

От подводных камней сериализации до сбоев instanceof в разных контекстах — эти продвинутые концепции разделяют начинающих разработчиков от опытных, а точнее, повреждённых профессионалов.

Готовы к новым испытаниям? Ознакомьтесь с нашим [полным сборником тестов](/challenges/) для дополнительных задач по JavaScript, алгоритмам и другим темам!
````
