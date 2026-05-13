# Translation Candidate
- Slug: js-quiz-14-date-time-questions-test-your-knowledge
- Locale: ru
- Model: openrouter/qwen/qwen3-32b:nitro
- Target: src/content/posts/2020-01-02--js-quiz-14-date-time-questions-test-your-knowledge/ru/index.mdx
- Validation: deferred
- Runtime seconds: 112.56
- Input tokens: 12460
- Output tokens: 13077
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- Estimated cost: $0.004135
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
unlisted: false
title: 'Тест: 14 вопросов о датах на JavaScript'
subTitle: Научитесь впечатлять на вечеринках с помощью JS-викторин! ✨
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
```jsx
import Challenge from '../../../../../components/QuizUI/Challenge';
import QuizUI from '../../../../../components/QuizUI/QuizUI';

## Как хорошо вы знаете класс `Date`?

> * **Докажите свои навыки JavaScript!** 🚀
> * Не требуется регистрация или вход. ✨
> * Множественный выбор. 🤖 ... _Как сложно это может быть, правда?_

### Обзор

Класс `Date` в JavaScript имеет сложный API. Он был унаследован от Java, и, судя по всему, был вдохновлён древними методами учёта времени.

Сложности работы с `Date` заставляют многих разработчиков использовать сторонние библиотеки без колебаний. Хотя это часто безопасный и надёжный выбор, эти библиотеки редко нужны для форматирования дат или локализации!

Этот тест предназначен для проверки (и углубления) ваших знаний о встроенном API `Date`. Используйте зелёные кнопки для подсказок и объяснений! Надеемся, что к концу задания вы укрепите понимание `Date` в JavaScript.

#### **ПРИМЕЧАНИЕ:** Предполагается, что все примеры используют местный часовой пояс GMT-7.
```

<QuizUI>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={0}
  group="Работа с датами"
  title="Конструктор даты. Часть 1"
  options={[
    {text: '1 января 2020'},
    {text: '1 февраля 2020', isAnswer: true},
    {text: 'RangeError: Неверный аргумент.'},
  ]}
>
  <slot name="question">
  <div className="question">
    Что будет включено в вывод?
    ```js
        const d1 = new Date(2020, 1, 1)
        console.log(d1)
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Аргумент месяца нумеруется с нуля. Диапазон 0-11 (в западных календарях).

    'Февраль' имеет индекс 1. (Можно представить как поиск в массиве.)
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={1}
  group="Работа с датами"
  title="Конструктор Date. Часть 2"
  options={[
    {text: 'Янв 01 2020', isAnswer: true},
    {text: 'Фев 01 2020'},
    {text: 'RangeError: Неверный аргумент.'},
  ]}
>
  <slot name="question">
  <div className="question">
    Что будет включать в себя вывод?
    ```js
        const d2 = new Date(2020, 0, 1)
        console.log(d2)
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Аргумент месяца является нулевым. Диапазон 0-11 (используя западные календари).

    'Январь' имеет индексное значение ноль. (Представьте это как поиск в массиве.)
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={2}
  group="Работа с датами"
  title="Конструктор Date. Часть 3"
  options={[
    {text: '01 января 1970'},
    {text: 'Эпоха Unix 0'},
    {text: 'Текущая дата, в UTC/GMT'},
    {text: 'Текущая дата', isAnswer: true},
    {text: 'NaN'},
    {text: 'RangeError: Неверный аргумент.'},
  ]}
>
  <slot name="question">
  <div className="question">
    Что будет включать вывод?
    ```js
        const d3 = Date('Thu, 01 Jan 1970 00:00:00 GMT')
        console.log(d3)
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Не забывайте ключевое слово `new`! `Date` — это класс, и его следует вызывать с `new`.

    `Date('...')` без `new` игнорирует переданные данные. Похоже, что `new Date()` (без аргументов) всегда возвращает текущую дату и время.

    Это **типичная ошибка**, которую **легко упустить**, даже при проверке кода.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={3}
  group="Работа с датами"
  title="Конструктор даты. Часть 4"
  options={[
    {text: '1969', isAnswer: true},
    {text: '1970'},
    {text: '2019'},
    {text: '2020'},
    {text: '2021'},
    {text: 'RangeError: Invalid argument.'},
  ]}
>
  <slot name="question">
  <div className="question">
    Что будет включать вывод?
    ```js
          const date = new Date(2020)
          console.log(date.getFullYear())
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Объект `Date`, созданный с одним целочисленным аргументом, интерпретируется как значение `Unix Epoch`. `Epoch` — это количество миллисекунд с 1 января 1970 года.

    Значение `2020` (миллисекунд) соответствует 2 секундам после 1 января 1970 года.

    Поскольку наш локальный часовой пояс имеет отрицательный сдвиг на -7 часов, мы получаем `Ср Дек 31 1969 17:00:02 GMT-0700 (Горное стандартное время)`.

    Чтобы избежать смещения локального часового пояса, используйте [`.getUTCFullYear()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/getUTCFullYear).
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={4}
  group="Работа с датами"
  title="Парсинг строк даты"
  options={[
    {text: '2019 2020', isAnswer: true},
    {text: '2020 2021'},
    {text: '2020 2020'},
    {text: '2020 2019'},
  ]}
>
  <slot name="question">
  <div className="question">
    Какое значение будет выведено в консоль?
    ```js
          const d1 = new Date('2020-01-01')
          const d2 = new Date('2020-01-01T00:00')
          console.log(d1.getFullYear(), d2.getFullYear())
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Строка без значения времени `T` может казаться 1 января 2020 года, но строки только с датой интерпретируются как UTC. При корректировке на наш локальный часовой пояс (GMT-7) оказывается, что мы всё ещё в 2019 году.

    Строки даты и времени без явного часового пояса интерпретируются в локальном времени.

    Формат `T00:00` заставляет второе значение интерпретироваться как полночь по локальному времени.

    Первая дата интерпретируется как `Tue Dec 31 2019 17:00:00 GMT-0700 (Mountain Standard Time)`.
    Вторая дата интерпретируется как `Wed Jan 01 2020 00:00:00 GMT-0700 (Mountain Standard Time)`.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={5}
  group="Работа с датами"
  title="Форматирование. Часть 1"
  options={[
    {text: 'new Intl.DateTimeFormat(\'},
    {text: 'date.toLocaleFormat(\', isAnswer: true},
    {text: 'date.toLocaleString(\'},
    {text: 'date.toLocaleDateString(\'},
  ]}
>
  <slot name="question">
  <div className="question">
    Выберите _неправильный_ метод форматирования:
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Метод `toLocaleFormat()` не является стандартным! Он может показаться знакомым, так как он был в древней библиотеке.

    Ознакомьтесь с документацией метода [`toLocaleDateString`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleDateString). Его поведение описано в [`Intl.DateTimeFormat`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DateTimeFormat).
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={6}
  group="Работа с датами"
  title="UTC-даты. Часть 1"
  options={[
    {text: 'Wed, 01 Jan 2020 00:00:00 GMT'},
    {text: 'Thu, 02 Jan 2020 00:00:00 GMT'},
    {text: 'TypeError', isAnswer: true},
    {text: 'NaN'},
  ]}
>
  <slot name="question">
  <div className="question">
    Что будет включать в себя вывод?
    ```js
          var date = Date.UTC('2020-01-02T00:00')
          console.log(date.toUTCString())
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Вы получите `TypeError: date.toUTCString is not a function`, поскольку [`Date.UTC()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/UTC) возвращает целое число в миллисекундах, а не экземпляр даты.

    {/* Метод [`getFullYear()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/getFullYear) использует ваш локальный сдвиг (предположим GMT-07:00 для этих вопросов). Это означает, что он даст предыдущий год (НГ -7 часов). Метод [`getUTCFullYear()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/getUTCFullYear) даст год, который мы передали в `Date.UTC()`, 2020. */}
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={7}
  group="Работа с датами"
  title="UTC-даты. Часть 2"
  options={[
    {text: 'Объект даты, основанный на UTC'},
    {text: 'Объект даты, скорректированный для местного часового пояса'},
    {text: 'Миллисекунды с 1 января 1970 года по Гринвичу', isAnswer: true},
    {text: 'Ошибка'},
  ]}
>
  <slot name="question">
  <div className="question">
    Что будет включать в себя вывод?
    ```js
          const d = Date.UTC(2020, 0, 1)
          console.log(d)
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Вспомогательный метод [`Date.UTC`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/UTC) не возвращает экземпляр даты. Он возвращает целое число в миллисекундах.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={8}
  group="Работа с датами"
  title="UTC-даты. Часть 3"
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
    Что будет включать вывод?
    ```js
          // Assume local TZ is -07:00
          const d = new Date(Date.UTC(2020, 0, 1))
          console.log(d.getTimezoneOffset())
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Даты будут неявно отображаться в локальном времени с (эффективно) неизменным [`.getTimezoneOffset()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/getTimezoneOffset).

    Объекты `Date` не хранят данные о часовом поясе. Они хранят количество миллисекунд с Эпохи Unix (1 января 1970 г.). Часовой пояс учитывается при разборе и отображении строк дат. Поведение по умолчанию для отображения автоматически определяется на основе локальных настроек системы или браузера.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={9}
  group="Работа с датами"
  title="Установщики дат. Часть 1"
  options={[
    {text: '1 января 2020', isAnswer: true},
    {text: '1 февраля 2020'},
    {text: 'RangeError: Неверный аргумент.'},
  ]}
>
  <slot name="question">
  <div className="question">
    Что будет включено в вывод?
    ```js
          const d = new Date(2020, 0, 1)
          d.setDate(1)
          console.log(d)
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Метод [`.setDate()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/setDate) задаёт день месяца на основе текущего месяца заданного экземпляра.

    Если значение выходит за пределы доступного количества дней, значение месяца экземпляра даты будет скорректировано (например, `setDate(32)` в январе будет рассчитано как 1 февраля).

    <aside class="hint">`setDate` задаёт день месяца, обычно в диапазоне 1-31.</aside>
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={10}
  group="Работа с датами"
  title="Установщики дат. Часть 2"
  options={[
    {text: 'янв 01 2020'},
    {text: 'фев 01 2020', isAnswer: true},
    {text: 'RangeError: Invalid argument.', hint: 'Неверный аргумент для метода setMonth()'},
  ]}
>
  <slot name="question">
  <div className="question">
    Что будет включать в себя вывод?
    ```js
          const d = new Date(2020, 0, 1)
          d.setMonth(1)
          console.log(d)
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Метод [`.setMonth()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/setMonth) устанавливает месяц для заданного экземпляра даты.

    Аргумент месяца нумеруется с нуля, диапазон 0-11 (по западным календарям).
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={11}
  group="Работа с датами"
  title="Установщики дат. Часть 3"
  options={[
    {text: '1 января 2020 г.'},
    {text: '1 января 2021 г.', isAnswer: true},
    {text: '1 февраля 2020 г.'},
    {text: 'RangeError: Неверный аргумент.'},
  ]}
>
  <slot name="question">
  <div className="question">
    Что будет включать в себя вывод?
    ```js
          const d = new Date(2020, 0, 1)
          d.setMonth(12)
          console.log(d)
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Метод [`.setMonth()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/setMonth) устанавливает месяц для заданного экземпляра даты.

    Аргумент `month` является нулевой индексной, принимая 12 значений в диапазоне 0-11 (по западным календарям).

    Здесь мы видим, что год изменяется на 2021, потому что `setMonth(12)` на единицу больше 11 (декабря).
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={12}
  group="Работа с датами"
  title="Установка даты. Часть 4"
  options={[
    {text: '1 января 2020 г.'},
    {text: '1 февраля 2020 г.'},
    {text: '1 января 2021 г.'},
    {text: '1 февраля 2021 г.', isAnswer: true},
    {text: 'RangeError: Неверный аргумент.'},
  ]}
>
  <slot name="question">
  <div className="question">
    Что будет включать вывод?
    ```js
          const d = new Date(2020, 0, 1)
          d.setMonth(13)
          console.log(d)
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Метод [`.setMonth()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/setMonth) устанавливает месяц для заданного экземпляра даты.

    Аргумент месяца индексируется с нуля, диапазон 0-11 (для западных календарей).

    Здесь мы видим, что месяц и год изменены на февраль 2021, потому что `setMonth(13)` на 2 больше, чем 11 (декабрь).

    <aside class="hint">Метод `setMonth` устанавливает месяц по индексу, 12 месяцев индексируются от 0 до 11.</aside>
    <aside class="hint">
    Значения вне диапазона 0-11 вызовут переполнение или уменьшение года. Например, `setMonth(13)` изменит год на 2021 (на февраль, так как 13 на 2 больше, чем 11).
    </aside>
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={13}
  group="Работа с датами"
  title="Установка даты. Часть 5"
  options={[
    {text: 'Янв 01 2020'},
    {text: 'Фев 01 2020'},
    {text: 'Янв 01 2019'},
    {text: 'Дек 01 2019', isAnswer: true},
    {text: 'RangeError: Неверный аргумент.'},
  ]}
>
  <slot name="question">
  <div className="question">
    Что будет включать вывод?
    ```js
          const d = new Date(2020, 0, 1)
          d.setMonth(-1)
          console.log(d)
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Метод [`.setMonth()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/setMonth) устанавливает месяц для указанного экземпляра даты.

    Аргумент месяца нумеруется с нуля, диапазон 0-11 (в западных календарях).

    Здесь мы видим, что месяц и год возвращаются к декабрю 2019, потому что `setMonth(-1)` меньше 0 (январь).
  </div>
  </slot>
</Challenge>

</QuizUI>
````
