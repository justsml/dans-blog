# Translation Candidate
- Slug: quiz-can-you-count-to-bigint
- Locale: ru
- Model: openrouter/openai/gpt-oss-120b:nitro
- Target: src/content/posts/2024-11-06--quiz-can-you-count-to-bigint/ru/index.mdx
- Validation: deferred
- Runtime seconds: 9.84
- Input tokens: 13381
- Output tokens: 7830
- Thinking tokens: unknown
- Cached input tokens: 5760
- Cache write tokens: 0
- Estimated cost: $0.001931
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
unlisted: false
title: 'Тест: Можно ли доверять JavaScript?'
subTitle: Различаете `parseInt` и `parseFloat`?
label: Numbers
date: '2024-10-31'
modified: '2024-11-09'
social_image: ../desktop-social.webp
category: Quiz
subCategory: JavaScript
tags:
  - quiz
  - data-structures
  - algorithms
cover: ../victor-freitas-hOuJYX2K5DA-unsplash-square.webp
cover_full_width: ../victor-freitas-hOuJYX2K5DA-unsplash-wide.webp
cover_mobile: ../victor-freitas-hOuJYX2K5DA-unsplash-square.webp
cover_icon: ../victor-freitas-hOuJYX2K5DA-unsplash-square.webp
---
import Challenge from '../../../../../components/QuizUI/Challenge';
import QuizUI from '../../../../../components/QuizUI/QuizUI';

<QuizUI>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={0}
  group="Разминка"
  title="Парсинг с `parseInt`"
  options={[
    {text: '123456', isAnswer: true},
    {text: '123'},
    {text: '12345600'},
    {text: '456.00'},
    {text: 'Ошибка'},
    {text: 'NaN'},
  ]}
>
  <slot name="question">
  <div className="question">
    ```tsx
        parseInt(" 123456.00")
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    `parseInt` игнорирует пробелы и парсит начальную последовательность цифр как целое число. Здесь он останавливается на десятичной точке, поэтому возвращается только `123456`.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={1}
  group="Парсинг"
  title="Обработка запятой"
  options={[
    {text: '123', isAnswer: true},
    {text: '12345600'},
    {text: '123456.00'},
    {text: '456.00'},
    {text: 'Error'},
  ]}
>
  <slot name="question">
  <div className="question">
    ```tsx
        parseInt("123,456.00")
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Как правило, `parseInt` прекращает разбор, когда встречает нечисловой символ. Здесь он останавливается на запятой, поэтому возвращается только `123`.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={2}
  group="Математика"
  title="Точность с плавающей запятой"
  options={[
    {text: '0.1 + 0.2 === 0.3'},
    {text: 'false', isAnswer: true},
    {text: 'true'},
    {text: 'NaN'},
  ]}
>
  <slot name="question">
  <div className="question">
    ```tsx
        0.1 + 0.2 === 0.3
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Из‑за ошибок точности плавающих точек, `0.1 + 0.2` не равно точно `0.3`. Из‑за того, как числа с плавающей запятой хранятся в памяти, результат равен `0.30000000000000004`. Виноват стандарт IEEE 754 для работы с плавающей арифметикой — он не может точно представить некоторые числа. Это распространённая проблема во всех языках программирования. В конце концов вы столкнётесь с бесконечно повторяющейся десятичной дробью, и независимо от языка компьютер просто прекращает бесконечно генерировать цифры.

    Некоторые языки, такие как Python и Java, имеют `Decimal` или `BigDecimal` для решения этой задачи, но в JavaScript их нет. Можно использовать библиотеки вроде `big.js` или `decimal.js`.

    (Примечание: Некоторые языки предназначены для работы с дробями, мнимыми числами и т.п. на более высоком логическом уровне, сохраняя буквальные выражения. Но они всё равно сталкиваются с теми же проблемами точности плавающих точек на уровне аппаратуры.)
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={3}
  group="Переполняющие числа"
  title="Обработка бесконечности"
  options={[
    {text: 'Infinity', isAnswer: true},
    {text: 'NaN'},
    {text: 'Error'},
    {text: 'undefined'},
  ]}
>
  <slot name="question">
  <div className="question">
    ```tsx
        Number.MAX_VALUE * 2
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Поскольку `Number.MAX_VALUE` — самое большое **представимое** обычное число в JavaScript, превышение его предела быстро приводит к переполнению — в результате получаются бессмысленные значения. Умножив его на `2`, получаем `Infinity`.

    *Знаете, JavaScript иногда таков.*
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={4}
  group="Форматирование"
  title="Преобразование строки с помощью `.toFixed()`"
  options={[
    {text: 'TypeError'},
    {text: 'SyntaxError'},
    {text: '"5"'},
    {text: '5'},
    {text: '"5.00"', isAnswer: true},
    {text: '5.0'},
  ]}
>
  <slot name="question">
  <div className="question">
    Что это может сделать?
    ```tsx
        5..toFixed(2)
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    `.toFixed(2)` возвращает строковое представление `5` с двумя знаками после запятой, поэтому результат — `"5.00"`.

    Двойная точка (`5..toFixed(2)`) — это «трюк», позволяющий обратиться к объектной модели числовых литералов.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={5}
  group="Сравнение типов"
  title="Сравнение равенства `parseInt` и `parseFloat`"
  options={[
    {text: 'true', isAnswer: true},
    {text: 'false'},
    {text: 'NaN'},
  ]}
>
  <slot name="question">
  <div className="question">
    ```jsx
        parseInt("42") === parseFloat("42")
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    В JavaScript оба `parseInt` и `parseFloat` интерпретируют строку "42" как число `42`. Поэтому сравнение `parseInt("42") === parseFloat("42")` дает `true`. `parseInt` прекращает разбор при первом недвоичным символе, тогда как `parseFloat` продолжает, пока не встретит символ, не являющийся частью числа с плавающей точкой. Однако в строке "42" нет десятичной точки или других недопустимых символов, поэтому обе функции возвращают одинаковое значение.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={6}
  group="Сравнение"
  title="Сравнение на равенство с BigInt"
  options={[
    {text: 'TypeError'},
    {text: 'true'},
    {text: 'false', isAnswer: true},
    {text: 'NaN'},
  ]}
>
  <slot name="question">
  <div className="question">
    ```jsx
        BigInt("42") === parseInt("42")
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    [`BigInt`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt) — это другой тип, отличающийся от `number`, поэтому `parseInt("42")` (обычное число) не строго равно `BigInt("42")`. Чтобы сравнить, нужно привести оба к одному типу: `BigInt(parseInt("42")) === BigInt("42")`.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={7}
  group="Базовый"
  title="Разбор шестнадцатеричных чисел"
  options={[
    {text: 'true', isAnswer: true},
    {text: 'false'},
    {text: 'NaN'},
    {text: 'Должно быть в верхнем регистре: 2A'},
    {text: 'Ошибка'},
  ]}
>
  <slot name="question">
  <div className="question">
    Что получится?
    ```jsx
        parseInt("0x2A") === parseInt("2a", 16)
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Любая входная строка, начинающаяся с `0x`, автоматически рассматривается как шестнадцатеричная (основание `16`).
    Поэтому это эквивалентно передаче radix 16. Таким образом, `parseInt("0x2A")` то же самое, что `parseInt("2a", 16)`. (Регистронезависимо.)
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={8}
  group="Базовый"
  title="Парсинг с основанием"
  options={[
    {text: '255', isAnswer: true},
    {text: '0'},
    {text: '16'},
    {text: '0.16'},
  ]}
>
  <slot name="question">
  <div className="question">
    В чём тут дело?
    ```jsx
        parseInt('0xFF', 16)
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    `parseInt` с шестнадцатеричным основанием (`16`) преобразует `"FF"` в `255` в десятичной системе. Вы могли видеть это в CSS‑цветах RGB/Hex.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={9}
  group="Number[]"
  title="Использование `.map(parseInt)`"
  options={[
    {text: '[24, NaN, NaN]', isAnswer: true},
    {text: '[24, NaN, 42]'},
    {text: '[24, 42]'},
    {text: 'NaN'},
  ]}
>
  <slot name="question">
  <div className="question">
    ```jsx
        [24, 'One', 42].map(parseInt)
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Второй аргумент `parseInt` (radix) совпадает с аргументом `index`, который передаёт метод массива. Это приводит к неожиданным результатам, так как `parseInt("One", 1)` возвращает `NaN` из‑за недопустимого ввода.

    Первый элемент, `24`, парсится как `24` в базе 0 (авто‑детект), поэтому остаётся `24`. Второй элемент, `'One'`, парсится как `NaN` в базе 1. Третий элемент, `42`, парсится в базе 2. В базе 2 строка `'42'` даёт `NaN`, так что результат `[24, NaN, NaN]`.

    Это распространённая ловушка при использовании `parseInt` с `map`. Если нужно превратить массив строк в числа, единственный безопасный «встроенный» способ — `.map(Number)` или явно указать колбэк, например `.map(x => parseInt(x, 10))`.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={10}
  group="Number[]"
  title="Использование `.map(Number)`"
  options={[
    {text: '[24, NaN, 34]', isAnswer: true},
    {text: '[24, NaN, 42]'},
    {text: '[24, 1, 42]'},
    {text: '[24, 42]'},
    {text: 'NaN'},
    {text: 'TypeError'},
  ]}
>
  <slot name="question">
  <div className="question">
    ```jsx
        [24, 'Twenty1', 0o42].map(Number)
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    `Number` преобразует значения в числовой тип строже, чем `parseInt`. Здесь `'Twenty1'` превращается в `NaN`, а `0o42` распознаётся как восьмеричный литерал и преобразуется в `34`.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={11}
  group="Парсинг"
  title="Обработка null"
  options={[
    {text: '0 NaN'},
    {text: '0 0'},
    {text: 'NaN NaN'},
    {text: 'NaN 0', isAnswer: true},
    {text: 'null null'},
    {text: 'TypeError'},
  ]}
>
  <slot name="question">
  <div className="question">
    Каков будет результат этого кода?
    ```jsx
        console.log(parseInt(null), Number(null))
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    `parseInt` приводит ввод к строке, поэтому `null` становится `"null"`. Поскольку у `"null"` нет валидных десятичных символов (обычных цифр), он вернёт `NaN`.

    `Number(null)` возвращает `0`. потому что JS любит держать вас в напряжении.
    Почему? Ну, могу углубиться, если есть интерес.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={12}
  group="Парсинг"
  title="Парсинг в системе счисления"
  options={[
    {text: 'NaN'},
    {text: 'null'},
    {text: 'undefined'},
    {text: '36'},
    {text: '1112745', isAnswer: true},
    {text: '01001001'},
  ]}
>
  <slot name="question">
  <div className="question">
    Каков будет результат этого заклинания?
    ```jsx
        parseInt(null, 36)
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Поскольку `parseInt` всегда приводит ввод к строке, `null` превращается в строку `"null"`.

    В системе счисления base 36 (шестнадцатерично‑тридцатишестиричная, если вам интересно), строка `"null"` представляет `1112745`.

    Последовательные значения `nulk`, `null` и `nulm` соответственно `1112744`, `1112745` и `1112746` в системе base 36.
  </div>
  </slot>
</Challenge>

</QuizUI>

<section className="scroll-x">
## Таблица сравнения

| Функция | `parseInt` | `parseFloat` | `Number` | `BigInt` |
| --- | --- | --- | --- | --- |
| Игнорирует пробелы | ✅ | ✅ | ✅ | ✅ |
| `.map(FN)`  | ❌ | ☑️ | ✅ | ✅ |
| Поддерживает аргумент radix | ✅ | ❌ | ❌ | ❌ |
| Бинарные/восьмеричные/шестнадцатеричные литералы | ✅ | ❌ | ✅ | ✅ |
| Недопустимые символы `42 oh no` | `42` | `42`  | `NaN` | `SyntaxError` |
</section>

<h2>Как у вас получилось? 🧐</h2>

{/* <h4>Вы в порядке?</h4> */}

<p class="inset">Нужен перерыв после такой дозы бинарных данных?<br />Пфф, помните: делайте перерыв *после* навыков! <br /><br />Загляните [в мой зал](/challenges/) и разберите ещё несколько задач! 💪</p>
````
