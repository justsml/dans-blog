# Translation Candidate
- Slug: quiz-modern-css-2025
- Locale: ru
- Model: openrouter/openai/gpt-oss-120b:nitro
- Target: src/content/posts/2024-11-07--quiz-modern-css-2025/ru/index.mdx
- Validation: rejected: direct AI SDK translation failed
- Runtime seconds: 10.03
- Input tokens: 10298
- Output tokens: 7063
- Thinking tokens: unknown
- Cached input tokens: 3968
- Cache write tokens: 0
- Estimated cost: $0.001673
- Pricing source: local-openrouter-estimate
- Note: Command failed: git add src/content/posts/2024-11-07--quiz-modern-css-2025/ru/index.mdx reports/i18n/quiz-modern-css-2025/ru
## Raw Output

````mdx
---
unlisted: false
title: 'Викторина: Знаете современный CSS? (2025)'
subTitle: Вы достаточнофронтендер?
label: Advanced CSS
social_image: ../desktop-social.webp
category: Quiz
subCategory: CSS
minReleaseDate: '2024-10-31'
date: '2024-10-31'
modified: '2024-11-09'
tags:
  - quiz
  - css
  - advanced
  - intermediate
cover_full_width: ../dan-levy-downtown-denver-at-night-wide.webp
cover_mobile: ../dan-levy-downtown-denver-at-night-square-200.webp
cover_icon: ../dan-levy-downtown-denver-at-night-square-200.webp
---
import Challenge from '../../../../../components/QuizUI/Challenge';
import QuizUI from '../../../../../components/QuizUI/QuizUI';


## Викторина: Вы знаете CSS?

* Современный CSS? 🤔
* **Нужен ли CSS в вашем резюме???** 🚀
* Выбор из нескольких вариантов. 🤖 … _Насколько это может быть сложным, а?_

<QuizUI>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={0}
  group="Разминка"
  title="Использование CSS‑переменных"
  options={[
    {text: 'background-color: blue;'},
    {text: 'background-color: --main-color;'},
    {text: 'background-color: var(--main-color);', isAnswer: true},
    {text: 'background-color: $main-color;'},
    {text: 'background-color: @main-color;'},
  ]}
>
  <slot name="question">
  <div className="question">
    Как правильно использовать CSS‑переменную `--main-color`, чтобы задать цвет фона элемента?
    ```css
        :root {
          --main-color: blue;
        }
        div {
          /* How do we use --main-color here? */
        }
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    CSS‑переменные используются с функцией `var`, поэтому правильный ответ — `background-color: var(--main-color);`. Этот синтаксис получает значение `--main-color` и применяет его.

    Другие варианты могут быть знакомы из других языков или синтаксисов препроцессоров, а именно Sass или Less.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={1}
  group="CSS функции"
  title="CSS функция min()"
  options={[
    {text: 'width: 50%;'},
    {text: 'width: 200px;', isAnswer: true},
    {text: 'width: 250px;'},
    {text: 'width: 500px;'},
    {text: 'width: max(50%, 200px);'},
    {text: 'Неверный синтаксис'},
  ]}
>
  <slot name="question">
  <div className="question">
    Если ширина родителя/контейнера 400 px, какова будет вычисленная ширина следующего элемента?
    ```css
        div {
          width: min(250px, 50%);
        }
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Функция `min()` выберет наименьшее значение между 250 px и 50 % ширины её родителя.

    Чтобы понять вычисленное значение, нам нужно преобразовать относительные единицы в пиксели:

    - `50%` от `400px` равно `200px`
    - `250px` уже в пикселях
    ```css
        /* This gets computed to */
        width: min(250px, 200px);
        /* -> 200px wins */
    ```
    Функция `min()` особенно полезна в адаптивном дизайне, где вы можете гарантировать, что компонент (или размер шрифта) не превысит определённый предел.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={2}
  group="CSS функции"
  title="CSS функцияmax()"
  options={[
    {text: 'width: 6em;'},
    {text: 'width: 10%;'},
    {text: 'width: 10px;'},
    {text: 'width: 50px;'},
    {text: 'width: 96px;', isAnswer: true},
    {text: 'Invalid syntax'},
  ]}
>
  <slot name="question">
  <div className="question">
    Имея контейнер шириной 200px, какова будет вычисленная ширина `<div>`?
    ```css
        div {
          width: max(50px, 10%, 6rem);
        }
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    The `max()` function accepts 2 or more inputs, and will use the largest value automatically. Assuming the root font size is the browser default `16px`, the width works out to `96px`.

    To understand the computed value, we need to convert the relative units to pixels:

    - `50px` is already in pixels
    - `10%` of `200px` is `20px`
    - `6rem` is `6 * 16px` (the default font size) which is `96px`
    ```css
        /* This gets computed to */
        width: max(50px, 20px, 96px);
        /* -> 96px wins */
    ```
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={3}
  group="Функции CSS Grid"
  title="CSS функция minmax()"
  options={[
    {text: 'Все ширины колонок от 100px до 200px'},
    {text: 'Установить колонки в 100px, строки в 200px'},
    {text: 'Первая колонка будет от 100px до 200px', isAnswer: true},
    {text: 'Применять диапазон рекурсивно, включая субгриды'},
  ]}
>
  <slot name="question">
  <div className="question">
    Каков эффект использования `minmax(100px, 200px)` для трека CSS‑grid?
    ```css
        grid-template-columns: minmax(100px, 200px);
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Использование `minmax(100px, 200px)` позволяет треку grid изменять размер от `100px` до `200px`, подстраиваясь под доступное пространство, но никогда не становясь меньше `100px` и не превышая `200px`.

    Вы можете создавать автоматически подстраивающиеся макеты, где контейнер и дочерние элементы участвуют в расчёте расположения. Это особенно мощно в сочетании с `repeat()` и `auto-fill` или `auto-fit`, которые создадут столько треков, сколько возможно в заданных ограничениях.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={4}
  group="CSS переменные"
  title="Запасные значения CSS переменных"
  options={[
    {text: 'синий'},
    {text: 'красный'},
    {text: 'системный по умолчанию'},
    {text: '#6b8e23', isAnswer: true},
    {text: 'var(--secondary-color)'},
  ]}
>
  <slot name="question">
  <div className="question">
    Какой цвет будет у фона для следующего CSS?
    ```css
        div {
          background: var(--primary, olivedrab);
        }
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Функция `var()` позволяет задать запасное значение, если переменная не определена. В данном случае фон будет `olivedrab` (`#6b8e23`), потому что `--primary` не определён.

    Это отличный способ гарантировать, что ваши стили не сломаются, если переменная отсутствует или не поддерживается.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={5}
  group="CSS функции"
  title="Использование clamp() для адаптивного дизайна"
  options={[
    {text: 'Запасной вариант для возможно неподдерживаемых единиц'},
    {text: 'Гарантировать, что единицы `vw` находятся между 20px и 50px'},
    {text: 'Линейный масштаб между 200px и 500px', isAnswer: true},
    {text: 'Логарифмический масштаб (Log₂) между 200px и 500px'},
    {text: 'Провал! Нет поддержки в IE 11'},
  ]}
>
  <slot name="question">
  <div className="question">
    Что делает `clamp()`?
    ```css
        .card {
          width: clamp(200px, 50vw, 500px);
        }
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    `clamp()` функция позволяет ширине масштабироваться на основе `50vw`, но удерживает её в диапазоне от 200px до 500px.

    Это значит, что ширина будет 200px, когда `50vw` меньше 200px, 500px, когда `50vw` больше 500px, и будет линейно изменяться между этими пределами.

    Это делает ваш дизайн автоматически адаптивным! Главное, что нужно знать о `clamp` — он комбинирует **фиксированные единицы** с **адаптивными или вычисляемыми единицами**.

    Обычно не рекомендуется использовать единицы viewport для размеров шрифтов, но с `clamp()` мы можем гарантировать, что размер шрифта не станет слишком маленьким или слишком большим.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={6}
  group="Вложение CSS"
  title="Нативное вложение CSS"
  options={[
    {text: 'Только с SCSS'},
    {text: 'Технически с PostCSS'},
    {text: 'Да', isAnswer: true},
    {text: 'Нет'},
  ]}
>
  <slot name="question">
  <div className="question">
    Поддерживает ли CSS вложение нативно?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Да! Мы наконец‑то получили нативное вложение CSS! CSS внедрил синтаксис нативного вложения в последние годы (2023), позволяя задавать иерархические стили напрямую в CSS.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={7}
  group="Вложенный CSS"
  title="Вложенный CSS"
  options={[
    {text: 'Имя файла должно заканчиваться на .scss'},
    {text: '`.title` должен предшествовать свойствам, таким как `color`'},
    {text: 'Только с PostCSS'},
    {text: 'Отлично. Замечаний нет.', isAnswer: true},
  ]}
>
  <slot name="question">
  <div className="question">
    Это правильное использование нативного вложения CSS?
    ```css
        .container {
          color: black;
          .title {
            color: white;
            background: black;
          }
        }
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Класс `.title` вложен в класс `.container`, и свойства применяются как ожидается.

    Это отличный способ держать связанные стили вместе и избегать длинных селекторов.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={8}
  group="CSS вложение"
  title="Селектор прямого потомка с вложением"
  options={[
    {text: 'background-color: red'},
    {text: 'background-color: white', isAnswer: true},
    {text: 'background-color: blue'},
    {text: 'Invalid syntax'},
  ]}
>
  <slot name="question">
  <div className="question">
    Какой цвет фона будет применён к прямым дочерним `div` элементов `.container`?
    ```css
        .container {
          background-color: red;
          > div {
            background-color: white;
          }
          background-color: blue !important;
        }
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    `>` селектор во вложенном правиле применяет `background-color: white` только к прямым дочерним элементам `div` внутри `.container`.

    Последнее правило, `background-color: blue !important;`, немного отвлекает. Оно **вне вложенного правила** и будет применено ко всем элементам `.container`.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={9}
  group="CSS‑переменные"
  title="Изменение CSS‑переменной во время выполнения"
  options={[
    {text: 'CSS‑переменные неизменяемы'},
    {text: 'С помощью JavaScript', isAnswer: true},
    {text: 'Только с SCSS'},
    {text: 'Только через встроенные стили'},
    {text: 'С использованием адаптивных единиц'},
  ]}
>
  <slot name="question">
  <div className="question">
    Как изменить значение CSS‑переменной во время выполнения?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    CSS‑переменные можно задавать с помощью классов и JavaScript. Их даже можно определить «после», когда они уже технически используются.
    ```js
        document.documentElement.style.setProperty('--main-color', 'blue');
    ```
    Это изменит значение `--main-color` на `blue` во всём документе.

    CSS‑переменные изменяемы и их можно менять во время выполнения с помощью JavaScript.

    Их также можно менять, добавляя или удаляя классы — распространённый приём для темизации.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={10}
  group="CSS‑переменные"
  title="Использование calc() с CSS‑переменными"
  options={[
    {text: 'Ширина: 50px'},
    {text: 'Ширина: 100px'},
    {text: 'Ширина: 110px', isAnswer: true},
    {text: 'Ширина: 120px'},
  ]}
>
  <slot name="question">
  <div className="question">
    Какова будет вычисленная ширина элемента?
    ```css
        :root {
          --base-width: 100px;
        }
        div {
          width: calc(var(--base-width) + 10px);
        }
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Функция `calc()` объединяет значение `--base-width` (100px) с дополнительными 10px, в результате получаем ширину 110px.
  </div>
  </slot>
</Challenge>

</QuizUI>
````
