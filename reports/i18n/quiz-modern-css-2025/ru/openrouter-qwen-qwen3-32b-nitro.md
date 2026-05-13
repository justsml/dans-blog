# Translation Candidate
- Slug: quiz-modern-css-2025
- Locale: ru
- Model: openrouter/qwen/qwen3-32b:nitro
- Target: src/content/posts/2024-11-07--quiz-modern-css-2025/ru/index.mdx
- Validation: rejected: direct AI SDK translation failed
- Runtime seconds: 114.10
- Input tokens: 9401
- Output tokens: 9360
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- Estimated cost: $0.002998
- Pricing source: local-openrouter-estimate
- Note: Command failed: git add src/content/posts/2024-11-07--quiz-modern-css-2025/ru/index.mdx reports/i18n/quiz-modern-css-2025/ru
## Raw Output

````mdx
---
unlisted: false
title: 'Тест: Вы знаете современный CSS? (для 2025)'
subTitle: Достаточно ли вы фронтенд?
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
```jsx
import Challenge from '../../../../../components/QuizUI/Challenge';
import QuizUI from '../../../../../components/QuizUI/QuizUI';


## Тест: Знакомы ли вы с CSS?

* Современный CSS? 🤔
* **Стоит ли включать CSS в _ваши_ резюме???** 🚀
* Множественный выбор. 🤖 ... _Как сложно может быть, правда?_
```

<QuizUI>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={0}
  group="Разминка"
  title="Использование переменных CSS"
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
    Какой правильный способ использования переменной CSS под названием `--main-color`, чтобы установить цвет фона элемента?
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
    Переменные CSS используются через функцию `var`, поэтому правильный ответ — `background-color: var(--main-color);`. Эта синтаксическая конструкция извлекает значение `--main-color` и применяет его.

    Остальные варианты могут быть знакомы из других языков или синтаксиса препроцессоров, таких как Sass или Less.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={1}
  group="Функции CSS"
  title="Функция min() в CSS"
  options={[
    {text: 'width: 50%;'},
    {text: 'width: 200px;', isAnswer: true},
    {text: 'width: 250px;'},
    {text: 'width: 500px;'},
    {text: 'width: max(50%, 200px);'},
    {text: 'Invalid syntax'},
  ]}
>
  <slot name="question">
  <div className="question">
    Если ширина родительского контейнера равна 400px, какова будет вычисленная ширина следующего элемента?
    ```css
        div {
          width: min(250px, 50%);
        }
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Функция `min()` выберет наименьшее значение между 250px и 50% ширины родительского элемента.

    Чтобы понять вычисленное значение, нужно перевести относительные единицы в пиксели:

    - 50% от 400px = 200px
    - 250px уже в пикселях
    ```css
        /* This gets computed to */
        width: min(250px, 200px);
        /* -> 200px wins */
    ```
    Функция `min()` особенно полезна в адаптивном дизайне, где можно гарантировать, что компонент (или размер шрифта) не превысит определённый предел.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={2}
  group="Функции CSS"
  title="Функция CSS max()"
  options={[
    {text: 'width: 6em;'},
    {text: 'width: 10%;'},
    {text: 'width: 10px;'},
    {text: 'width: 50px;'},
    {text: 'width: 96px;', isAnswer: true},
    {text: 'Некорректный синтаксис'},
  ]}
>
  <slot name="question">
  <div className="question">
    Учитывая контейнер с шириной 200px, какова будет вычисленная ширина элемента `<div>`?
    ```css
        div {
          width: max(50px, 10%, 6rem);
        }
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Функция `max()` принимает 2 или более значения и автоматически выбирает наибольшее. При условии, что размер корневого шрифта по умолчанию `16px`, ширина составит `96px`.

    Чтобы понять вычисленное значение, переведём относительные единицы в пиксели:

    - `50px` уже в пикселях
    - `10%` от `200px` это `20px`
    - `6rem` это `6 * 16px` (стандартный размер шрифта) или `96px`
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
  group="Функции CSS-сетки"
  title="Функция minmax() в CSS"
  options={[
    {text: 'Все ширины столбцов между 100px и 200px'},
    {text: 'Установить столбцы в 100px, строки в 200px'},
    {text: 'Первый столбец будет между 100px и 200px', isAnswer: true},
    {text: 'Применить диапазон рекурсивно, включая подсетки'},
  ]}
>
  <slot name="question">
  <div className="question">
    Какой эффект использования `minmax(100px, 200px)` для трека CSS-сетки?
    ```css
        grid-template-columns: minmax(100px, 200px);
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Использование `minmax(100px, 200px)` позволяет треку сетки изменять размер между `100px` и `200px`, адаптируясь к доступному пространству, но никогда не опускаясь ниже `100px` или не превышая `200px`.

    Вы можете создавать автоматически подстраивающиеся макеты, где контейнер и его дочерние элементы взаимодействуют при вычислении макета. Это особенно полезно при комбинировании с `repeat()` и `auto-fill` или `auto-fit`, которые создают столько треков, сколько возможно в рамках заданных ограничений.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={4}
  group="Переменные CSS"
  title="Фallbacks переменных CSS"
  options={[
    {text: 'голубой'},
    {text: 'красный'},
    {text: 'системный по умолчанию'},
    {text: '#6b8e23', isAnswer: true},
    {text: 'var(--secondary-color)'},
  ]}
>
  <slot name="question">
  <div className="question">
    Каким будет цвет фона для следующего CSS?
    ```css
        div {
          background: var(--primary, olivedrab);
        }
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Функция `var()` позволяет задавать резервное значение, если переменная не определена. В данном случае фон будет `olivedrab` (`#6b8e23`), потому что `--primary` не определена.

    Это отличный способ гарантировать, что ваши стили не сломаются, если переменная отсутствует или не поддерживается.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={5}
  group="Функции CSS"
  title="Использование clamp() для адаптивного дизайна"
  options={[
    {text: 'Обеспечивает резервный вариант для, возможно, неподдерживаемых единиц'},
    {text: 'Гарантирует, что единицы `vw` будут в пределах 20px и 50px'},
    {text: 'Линейный масштаб между 200px и 500px', isAnswer: true},
    {text: 'Логарифмический масштаб между 200px и 500px'},
    {text: 'Неудача! Нет поддержки IE 11'},
  ]}
>
  <slot name="question">
  <div className="question">
    Что делает функция `clamp()`?
    ```css
        .card {
          width: clamp(200px, 50vw, 500px);
        }
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Функция `clamp()` позволяет ширине масштабироваться на основе `50vw`, но сохраняет её в пределах от 200px до 500px.

    Это означает, что ширина будет 200px, когда 50vw будет меньше 200px, 500px, когда 50vw будет больше 500px, и линейно между этими пределами.

    Она позволяет автоматически адаптироваться! Важно знать, что `clamp` объединяет **фиксированные единицы** с **адаптивными или вычисленными единицами.**

    Нормально вы не хотели бы использовать единицы viewport для размеров шрифтов, но с `clamp()` мы можем гарантировать, что размер шрифта не будет слишком мал или слишком велик.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={6}
  group="Вложенное оформление CSS"
  title="Встроенное вложенное оформление CSS"
  options={[
    {text: 'Только с SCSS'},
    {text: 'Технически с PostCSS'},
    {text: 'Да', isAnswer: true},
    {text: 'Нет'},
  ]}
>
  <slot name="question">
  <div className="question">
    Поддерживает ли CSS вложенность встроенную?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Да! Теперь у нас есть встроенная вложенность CSS! CSS добавил синтаксис вложенных правил в последние годы (2023), что позволяет использовать иерархическое оформление прямо в CSS.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={7}
  group="Вложенность CSS"
  title="Вложенность CSS"
  options={[
    {text: 'Имя файла должно оканчиваться на .scss'},
    {text: '`.title` должен предшествовать свойствам, таким как `color`'},
    {text: 'Только с PostCSS'},
    {text: 'Идеально. Заметок нет.', isAnswer: true},
  ]}
>
  <slot name="question">
  <div className="question">
    Является ли это правильным использованием вложенного CSS?
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

    Это отличный способ сохранить связанные стили вместе и избежать длинных селекторов.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={8}
  group="Вложенность CSS"
  title="Прямой дочерний селектор с вложенностью"
  options={[
    {text: 'background-color: red'},
    {text: 'background-color: white', isAnswer: true},
    {text: 'background-color: blue'},
    {text: 'Invalid syntax'},
  ]}
>
  <slot name="question">
  <div className="question">
    Какой фоновый цвет будет применён к прямым дочерним `div` элементам `.container`?
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
    Селектор `>` во вложенных правилах применяет `background-color: white` только к прямым дочерним `div` элементам внутри `.container`.

    Правило `background-color: blue !important;` — это небольшая проверка. Оно **находится вне вложенного правила** и будет применено ко всем `.container` элементам.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={9}
  group="CSS-переменные"
  title="Изменение CSS-переменной во время выполнения"
  options={[
    {text: 'CSS-переменные неизменяемы'},
    {text: 'С использованием JavaScript', isAnswer: true},
    {text: 'Только с SCSS'},
    {text: 'Только с inline-стилями'},
    {text: 'С использованием респонсивных единиц'},
  ]}
>
  <slot name="question">
  <div className="question">
    Как можно изменить значение CSS-переменной во время выполнения?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    CSS-переменные можно задавать с помощью классов и JavaScript. Даже после того, как они технически используются.
    ```js
        document.documentElement.style.setProperty('--main-color', 'blue');
    ```
    Это изменит значение `--main-color` на `blue` для всего документа.

    CSS-переменные изменяемы, и их можно изменять во время выполнения с помощью JavaScript.

    Их также можно изменить, добавляя или удаляя классы — распространённый паттерн для темизации.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={10}
  group="CSS-переменные"
  title="Использование calc() с CSS-переменными"
  options={[
    {text: 'Width: 50px'},
    {text: 'Width: 100px'},
    {text: 'Width: 110px', isAnswer: true},
    {text: 'Width: 120px'},
  ]}
>
  <slot name="question">
  <div className="question">
    Какой будет вычисленная ширина элемента?
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
    Функция `calc()` комбинирует значение `--base-width` (100px) с дополнительными 10px, в результате получается ширина 110px.
  </div>
  </slot>
</Challenge>

</QuizUI>
````
