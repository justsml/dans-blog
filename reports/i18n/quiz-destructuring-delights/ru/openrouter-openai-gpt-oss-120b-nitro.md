# Translation Candidate
- Slug: quiz-destructuring-delights
- Locale: ru
- Model: openrouter/openai/gpt-oss-120b:nitro
- Target: src/content/posts/2024-11-12--quiz-destructuring-delights/ru/index.mdx
- Validation: deferred
- Runtime seconds: 25.71
- Input tokens: 11605
- Output tokens: 8170
- Thinking tokens: unknown
- Cached input tokens: 2560
- Cache write tokens: 0
- Estimated cost: $0.001923
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
unlisted: false
title: 'Тест: Прелести деструктуризации'
subTitle: Вы мастер деструктуризации?
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

{/* Вы мастер деструктуризации?<br/> */}
<p class="inset">Или это ваша <em>Симфония разрушения?</em></p>

Этот тест проверит ваши знания деструктуризации в JavaScript: от «базового» синтаксиса объектов до вложенной деструктуризации и значений по умолчанию. Плюс бонусные вопросы по TypeScript и inline‑типам!

Перейдите сразу к разогреву — продемонстрируйте свои навыки деструктуризации! 👇

<QuizUI>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={0}
  group="Разминка: Объекты"
  title="Базовое деструктурирование объектов"
  options={[
    {text: 'Имя: Dan Levy, Возраст: 20'},
    {text: 'Имя: Dan Levy, Возраст: 40'},
    {text: 'Имя: Dan Levy, Возраст: Infinity'},
    {text: 'Имя: Dan Levy, Возраст: undefined', isAnswer: true},
    {text: 'Ошибка: Невозможно прочитать свойство \'age\''},
    {text: 'Имя: undefined, Возраст: 40'},
  ]}
>
  <slot name="question">
  <div className="question">
    Что выведет этот код?
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
    Свойство `age` отсутствует в объекте `person`, поэтому `age` будет `undefined`. Точно не `Infinity` 😅

    В результате получаем:
    ```plaintext
        Name: Dan Levy, Age: undefined
    ```
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={1}
  group="Разминка: Массивы"
  title="Значение по умолчанию в деструктуризации объекта"
  options={[
    {text: 'Имя: Dan Levy, Возраст: NaN'},
    {text: 'Имя: Dan Levy, Возраст: null'},
    {text: 'Имя: Dan Levy, Возраст: undefined', isAnswer: true},
    {text: 'Имя: Dan Levy, Возраст: 40'},
    {text: 'Ошибка: Невозможно деструктурировать свойство \'age\''},
    {text: 'SyntaxError: Неожиданный токен \',\''},
  ]}
>
  <slot name="question">
  <div className="question">
    Что сделает этот код?
    ```js
        const person = [ 'Dan Levy', 'Cape Town' ];
        const [ name, origin, age ] = person;
        console.log(`Name: ${name}, Age: ${age}`);
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Переменная `age` отсутствует в массиве `tuple`, поэтому её значение будет `undefined`.

    Это приводит к:
    ```plaintext
        Name: Dan Levy, Age: undefined
    ```
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={2}
  group="Вложенная деструктуризация"
  title="Вложенная деструктуризация"
  options={[
    {text: 'Имя: Dan, Город: Denver'},
    {text: 'Имя: undefined, Город: Denver'},
    {text: 'Ошибка: Cannot read property \'first\''},
    {text: 'Имя: Dan, Город: undefined'},
    {text: 'Ошибка', isAnswer: true},
  ]}
>
  <slot name="question">
  <div className="question">
    Как насчёт вложенной деструктуризации?
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
    Свойство `birth: { place }` отсутствует у `person`, поэтому будет выброшена ошибка.
    Одно из решений — задать значения по умолчанию для вложенных свойств.

    При доступе к вложенным свойствам будьте осторожны — ошибки могут быть трудно заметны. Текст сообщений об ошибках различается в разных браузерах и платформах, что усложняет отладку.

    В современном Chrome: `TypeError: Cannot read properties of undefined (reading 'place')`

    В Node это тоже `TypeError`, потому что JavaScript пытается деструктурировать `place` из `undefined`, прежде чем `place` будет прочитан.

    Точный формулировка зависит от браузера и среды выполнения.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={3}
  group="Значения по умолчанию"
  title="Значения по умолчанию в деструктуризации объектов"
  options={[
    {text: 'Привет, Дэн из Неизвестного'},
    {text: 'Привет, Дэн из Денвера'},
    {text: 'Привет, Неизвестный из Неизвестного'},
    {text: 'Привет, Неизвестный из Денвера'},
    {text: 'Ошибка', isAnswer: true},
  ]}
>
  <slot name="question">
  <div className="question">
    Теперь с некоторыми значениями по умолчанию, что это сделает?
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
    Свойство `birth` отсутствует в `person`, поэтому всему объекту всё равно нужен дефолт, а не только вложенному свойству. По сути здесь не хватает дефолта ` = {}`.

    Такая запись говорит: «если `person.birth` равно `undefined`, то `place` будет `Unknown`». Но `person.birth` равно `undefined`, и происходит попытка деструктурировать `undefined`, что приводит к ошибке.
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
  group="Значения по умолчанию"
  title="Значения по умолчанию в деструктуризации объектов"
  options={[
    {text: 'Привет, Дэн из Денвера'},
    {text: 'Привет, Дэн из Йоханнесбурга'},
    {text: 'Привет, Дэн из неизвестного', isAnswer: true},
    {text: 'Привет, Неизвестный из неизвестного'},
    {text: 'Привет, Неизвестный из Денвера'},
    {text: 'Ошибка'},
  ]}
>
  <slot name="question">
  <div className="question">
    Что это сделает?
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
    Свойство `birth` отсутствует в объекте `person`, поэтому используется пустой объект ` = {}`. Это позволяет применить значение по умолчанию.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={5}
  group="Аргументы функции"
  title="Деструктуризация параметров функции с значениями по умолчанию"
  options={[
    {text: 'Привет, Дэн, из undefined'},
    {text: 'Привет, Дэн, из Unknown'},
    {text: 'Привет, Дэн, из Denver'},
    {text: 'Привет, Unknown, из Unknown'},
    {text: 'Привет, Unknown, из Denver'},
    {text: 'Ошибка', isAnswer: true},
  ]}
>
  <slot name="question">
  <div className="question">
    А теперь в параметрах функции, что это сделает?
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
    Эта функция извлекает свойства `name` и `age`, используя значения по умолчанию при необходимости. В данном случае ключ `place` в объекте по умолчанию — просто шум, он не используется внутри `displayUser()`.

    Стричный режим не меняет ситуацию: попытка чтения необъявленной привязки `place` бросает `ReferenceError`.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={6}
  group="Аргументы функции"
  title="Деструктуризация с вложенными значениями по умолчанию"
  options={[
    {text: 'Неизвестно, Неизвестно, Джобург'},
    {text: 'Неизвестно, Неизвестно, Неизвестно'},
    {text: 'Неизвестно, `undefined`, Джобург'},
    {text: 'Н/Д, `undefined`, Джобург'},
    {text: 'Н/Д, Неизвестно, Джобург'},
    {text: 'Н/Д, Н/Д, Джобург', isAnswer: true},
    {text: 'Неизвестно, Н/Д, Джобург'},
    {text: 'Ошибка'},
  ]}
>
  <slot name="question">
  <div className="question">
    Как обрабатываются значения `undefined`?
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
    Функция `displayPlace` будет ИСПОЛЬЗОВАТЬ объект по умолчанию ТОЛЬКО если не передан объект. Поэтому единственный способ получить значение по умолчанию `{ place: "Unknown" }` — вызвать её без аргументов `displayPlace()`.

    Ещё одна примечательная особенность: передача `undefined` для `place` заставит использовать значение по умолчанию, что немного напоминает поведение `JSON.stringify` (игнорирует `undefined`, учитывает `null`).

    В результате получается:
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
  group="Аргументы функции"
  title="Деструктуризация с вложенными значениями по умолчанию"
  options={[
    {text: 'N/A, N/A'},
    {text: 'N/A, undefined'},
    {text: 'Неизвестно, N/A'},
    {text: 'Неизвестно, Неизвестно'},
    {text: 'Неизвестно, undefined'},
    {text: 'null, N/A', isAnswer: true},
    {text: 'null, Неизвестно'},
    {text: 'null, undefined'},
    {text: 'Ошибка'},
  ]}
>
  <slot name="question">
  <div className="question">
    Похожим образом на предыдущий пример… как обрабатывается `null`?_
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
    В этом случае свойство `place` устанавливается в `null` при первом вызове и в `undefined` при втором. Значение по умолчанию для `place` используется только если весь объект отсутствует **или** `undefined`. `null` будет передаваться как `null`.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={8}
  group="Встроенные типы TypeScript"
  title="Деструктуризация с вложенными значениями по умолчанию"
  options={[
    {text: 'Н/Д'},
    {text: 'undefined'},
    {text: 'Неизвестно'},
    {text: '\'null\''},
    {text: 'Ошибка TypeScript', isAnswer: true},
  ]}
>
  <slot name="question">
  <div className="question">
    Теперь в TypeScript... _что это сделает?_
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
    TypeScript сообщает об ошибке, потому что `place` имеет тип `string`, а вызов передаёт `null`. Кроме того, вызов опускает обязательное свойство `age`.

    Если игнорировать ошибки типов, выполнение кода выведет `null` в консоль.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={9}
  group="TypeScript: С присваиванием"
  title="Деструктуризация с вложенными значениями по умолчанию"
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
    Попробуем немного переименования/присваивания...
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
    Это выведет `Denver` в консоль. Свойство `place` переименовано в `location` в сигнатуре функции. Это распространённый приём (переименование свойств при деструктуризации) при адаптации сторонних структур данных.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={10}
  group="Вложенная деструктуризация в TS"
  title="Деструктуризация с вложенными значениями по умолчанию"
  options={[
    {text: 'Ошибка: Свойство \'first\' отсутствует'},
    {text: 'Ошибка: Свойство \'last\' отсутствует'},
    {text: 'Ошибка: Свойства \'birth\' и \'age\' отсутствуют', isAnswer: true},
    {text: 'Ошибка: Свойство \'place\' отсутствует'},
    {text: 'Ошибка: у \'string\' нет свойств в {...}'},
  ]}
>
  <slot name="question">
  <div className="question">
    Найдите ошибку типов:
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
    Ошибка находится в сигнатуре функции `greet`. Свойства `age` и `birth` отсутствуют в переданном объекте, поэтому они должны быть опциональными в определении типа.

    Хотя свойство `birth` деструктурируется с значением по умолчанию, определение типа требует его присутствия. Чтобы пометить свойство как опциональное в TypeScript, следует использовать оператор `?`.

    Обратите внимание, что `birth?: { place?: string }` не то же самое, что `birth: { place?: string } | undefined`.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={11}
  group="TypeScript + Присваивание"
  title="Деструктуризация с вложенными значениями, присваиванием и типами"
  options={[
    {text: 'Привет, Dan Levy из N/A'},
    {text: 'Привет, Dan Levy из Кейптауна'},
    {text: 'Привет, N/A N/A из N/A'},
    {text: 'Привет, N/A N/A из Кейптауна'},
    {text: 'Ошибка', isAnswer: true},
  ]}
>
  <slot name="question">
  <div className="question">
    Теперь с **присваиванием** (обратите внимание на переменные `f`, `l` и `p`)
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
    Еще одна ошибка! Вы начинаете угадывать, не так ли?!

    Трудно читать слои деструктуризации с дефолтами, присваиванием и типами!

    Как только `place` переназначается в переменную `p`, она больше не определена в области видимости оператора `console.log`.
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
