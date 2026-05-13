# Translation Candidate
- Slug: quiz-css-core-fundamentals
- Locale: ru
- Model: openrouter/openai/gpt-oss-120b:nitro
- Target: src/content/posts/2024-11-08--quiz-css-core-fundamentals/ru/index.mdx
- Validation: rejected: direct AI SDK translation failed
- Runtime seconds: 17.63
- Input tokens: 12387
- Output tokens: 7819
- Thinking tokens: unknown
- Cached input tokens: 3712
- Cache write tokens: 0
- Estimated cost: $0.001891
- Pricing source: local-openrouter-estimate
- Note: Command failed: git add src/content/posts/2024-11-08--quiz-css-core-fundamentals/ru/index.mdx reports/i18n/quiz-css-core-fundamentals/ru
## Raw Output

````mdx
---
unlisted: false
title: 'Тест: Знаете основы CSS? (2025)'
subTitle: Вы достаточно фронтендер?
label: CSS Fundamentals
social_image: ../desktop-social.webp
category: Quiz
subCategory: CSS
date: '2024-11-08'
modified: '2024-11-10'
tags:
  - quiz
  - intro
  - css
  - styles
  - beginner
  - intermediate
cover_full_width: ../yeshi-kangrang-Qq7A85iCzhQ-unsplash-wide.webp
cover_mobile: ../yeshi-kangrang-Qq7A85iCzhQ-unsplash-square.webp
cover_icon: ../yeshi-kangrang-Qq7A85iCzhQ-unsplash-square.webp
---
import Challenge from '../../../../../components/QuizUI/Challenge';
import QuizUI from '../../../../../components/QuizUI/QuizUI';


## Викторина: Вы знаете CSS?

* Современный CSS? 🤔
* **CSS стоит указывать в _вашем_ резюме???** 🚀
* Выбор из нескольких вариантов. 🤖 ... _Насколько это может быть сложным, а?_

<QuizUI>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={0}
  group="Разминка: Шрифты"
  title="Недействительная CSS‑единица для размера шрифта"
  options={[
    {text: '10cx', isAnswer: true},
    {text: '10mm'},
    {text: '10pt'},
    {text: '10px'},
    {text: '10vmin'},
  ]}
>
  <slot name="question">
  <div className="question">
    Выберите <em class="highlight">ОДИН НЕВЕРНЫЙ</em> ❌ `font-size`:
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    `10cx` неверен, потому что `cx` не является реальной CSS‑единицей. (По крайней мере на момент написания.)

    Популярные единицы включают знакомые `px`, `rem`, `em`.

    Новые единицы полезны для динамических, адаптивных макетов.

    - `ch` — ширина символа `0`
    - `vmin` — минимум вьюпорта
    - `vmax` — максимум вьюпорта
    - `vh` — высота вьюпорта
    - `vw` — ширина вьюпорта

    Есть также несколько единиц, которые существуют давно, но редко используются, например `cm` для сантиметров, `mm`, `in` для дюймов, `pt` для пунктов
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={1}
  group="Разминка: Цвета"
  title="Шестнадцатеричные коды"
  options={[
    {text: '#A'},
    {text: '#AB'},
    {text: '#ABCD', isAnswer: true},
    {text: '#ABCDE'},
  ]}
>
  <slot name="question">
  <div className="question">
    Можете найти <em class="highlight">ЕДИНСТВЕННЫЙ</em> корректный 👍 hex‑код?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Hex‑коды используются для представления цветов в CSS. Они начинаются с `#` и должны содержать 3, 4, 6 или 8 шестнадцатеричных цифр.

    Трёхсимвольный hex‑код — это сокращённая форма шестсимвольного, где каждый символ повторяется. Четырёхсимвольный код включает альфа‑канал для прозрачности.

    Например, `#ABC` эквивалентен `#AABBCC`, а `#ABCD` — `#AABBCCDD`. Чтобы узнать больше о работе с hex‑значениями, загляните в мой [JavaScript numbers quiz.](/quiz-can-you-count-to-bigint/)
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={2}
  group="Разминка: Единицы"
  title="Ой, все единицы!"
  options={[
    {text: 'em'},
    {text: 'rem'},
    {text: 'cm'},
    {text: 'mm'},
    {text: 'in'},
    {text: 'pt'},
    {text: 'pc'},
    {text: 'px'},
    {text: 'ex'},
    {text: 'ch'},
    {text: 'vmin'},
    {text: 'vmax'},
    {text: 'vh'},
    {text: 'rel', isAnswer: true},
    {text: 'vw'},
  ]}
>
  <slot name="question">
  <div className="question">
    Какая из этих единиц <em class="highlight">НЕ</em> является допустимой ❌ CSS‑единицей?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Новые единицы, такие как `ch`, `vmin`, `vmax`, `vh`, `vw`, довольно полезны для динамических/адаптивных макетов.

    Также существуют несколько единиц, которые всегда были, но редко используются, например `cm` для сантиметров, `mm`, `in` для дюймов, `pt` для пунктов, `pc`, `cap` для размера заглавных букв и `ex`, равный высоте буквы `x`.

    Популярные единицы включают знакомый `px` для пикселей, `em`, относительный к размеру шрифта элемента, и `rem` — тайно дань забытой группе 90‑х годов R.E.M. (ладно, на самом деле это просто относительная единица `em`, ссылающаяся на корневой элемент).
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={3}
  group="Селектор: Основы"
  title="Соответствие селекторов HTML‑элементам"
  options={[
    {text: '#Home'},
    {text: 'a [id=\'home\']'},
    {text: 'a:contains(home)'},
    {text: 'a#home[name=\'home\']', isAnswer: true},
  ]}
>
  <slot name="question">
  <div className="question">
    Какой селектор лучше всего соответствует следующему HTML?
    ```html
          <a id="home" name="home" href="/home">Home</a>
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Правильный ответ — `a#home[name='home']`, который соответствует одновременно атрибутам `id` и `name`. Селекторы CSS чувствительны к регистру, поэтому `#Home` не сработает, а пробелы означают дочерние элементы, что здесь не применимо.

    Селектор `:contains()` не является стандартным CSS‑селектором, но доступен в некоторых JS‑библиотеках.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={4}
  group="Селектор: Основы"
  title="Селектор атрибута для кнопки"
  options={[
    {text: 'button:link'},
    {text: 'button::click'},
    {text: 'button:focus'},
    {text: 'button[onclick]', isAnswer: true},
    {text: 'button[on-click]'},
  ]}
>
  <slot name="question">
  <div className="question">
    Какой селектор соответствует следующей HTML‑кнопке?
    ```html
          <button onclick="openModal()">Contact</button>
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Правильный ответ — `button[onclick]`, который выбирает наличие атрибута `onclick`.

    Обратите внимание, что `:link` выбирает только непосещённые ссылки с `href`, `::click` не является валидным псевдоэлементом, а `:focus` выбирает только сфокусированный элемент.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={5}
  group="Селектор: Основы"
  title="Недопустимый CSS‑селектор"
  options={[
  ]}
>
  <slot name="question">
  <div className="question">
    Какой из этих селекторов недопустим?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Селектор `c > > d {}` недействителен, потому что комбинатор потомка повторяется без селектора между двумя символами `>`.

    Остальные селекторы валидны. Селектор типа, например `c {}`, синтаксически корректный CSS, даже если `c` не является стандартным HTML‑элементом.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={6}
  group="Селектор: Основы"
  title="Выбор последней ссылки"
  options={[
    {text: 'a :nth-child(3)'},
    {text: 'a:last-item'},
    {text: 'nav:last-of-type(a)'},
    {text: 'nav:nth-child(3)'},
    {text: 'a:last-child', isAnswer: true},
  ]}
>
  <slot name="question">
  <div className="question">
    Какой селектор соответствует последней ссылке в приведённом ниже HTML?
    ```html
          <nav>
            <a name="home" href="/home">Home</a>
            <a name="login" href="/login">Login</a>
            <a name="help" href="/help">Help</a>
          </nav>
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Правильный селектор — `a:last-child`, он выбирает последний `<a>`, когда он также является последним дочерним элементом своего родителя. `nav:nth-child(3)` выберет элемент `<nav>`, который является третьим дочерним элементом своего родителя.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={7}
  group="Селектор: Специфичность"
  title="Приоритет селектора"
  options={[
    {text: 'main article section blockquote a'},
    {text: 'blockquote a'},
    {text: 'a#quote', isAnswer: true},
    {text: 'a.quote'},
  ]}
>
  <slot name="question">
  <div className="question">
    Какой селектор получит приоритет?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Селектор `a#quote` получает приоритет из‑за ID, который имеет более высокую специфичность, чем селекторы на основе тегов или классов.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={8}
  group="Макеты: Выравнивание"
  title="Выравнивание текста в блочном элементе"
  options={[
    {text: 'align: center;'},
    {text: 'margin: 0 auto;'},
    {text: 'align-content: center;'},
    {text: 'text-align: center;', isAnswer: true},
    {text: 'text-content: center;'},
  ]}
>
  <slot name="question">
  <div className="question">
    Как выровнять «shit» в коробке?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Использовать `text-align: center;` — правильный способ выровнять текст в блочном элементе. Свойства `align` применяются для flexbox‑макетов, а `margin: 0 auto;` используется для горизонтального центрирования блочных элементов.

    Свойство `align-content` применяется в grid‑макетах, а `text-content` не является допустимым CSS‑свойством.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={9}
  group="Макеты: Центрирование"
  title="Вертикальное центрирование блочного элемента"
  options={[
    {text: 'align-items: center;'},
    {text: 'justify-content: center;'},
    {text: 'align-content: center;', isAnswer: true},
    {text: 'margin: auto;'},
    {text: 'margin: 0 auto;'},
  ]}
>
  <slot name="question">
  <div className="question">
    Как центрировать содержимое по вертикали внутри блочного контейнера в современном поточном макете?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Использование `align-content` — современный способ вертикально центрировать содержимое блочного контейнера в поточном макете.

    Свойства `align-items` и `justify-content` применяются для flexbox и grid, но не для потока.

    Оба свойства `margin: 0 auto;` и `margin: auto;` центрируют блочный элемент по горизонтали, но не по вертикали.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={10}
  group="Макеты: Единицы"
  title="Вычисление размера пикселей вложенных шрифтов"
  options={[
    {text: '!40px'},
    {text: '5px', isAnswer: true},
    {text: '20px'},
    {text: '25px'},
    {text: '40px'},
  ]}
>
  <slot name="question">
  <div className="question">
    Какой размер в пикселях у текста ссылки `<a>` в приведённом ниже HTML?
    ```html
          <body style="font-size: 40px !important;">
            <nav style="font-size: 50%;">
              <a style="font-size: 25%;">HOME</a>
            </nav>
          </body>
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    `font-size` для `<a>` вычисляется как 5px: 40px (body) * 50% (nav) = 20px, затем 20px * 25% = 5px.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={11}
  group="Единицы: REM"
  title="Вычисление размера в пикселях с REM"
  options={[
    {text: '10px'},
    {text: '12px', isAnswer: true},
    {text: '14px'},
    {text: '20px'},
    {text: '24px'},
    {text: '34px'},
  ]}
>
  <slot name="question">
  <div className="question">
    Какой будет размер в пикселях у `1.2rem` для ссылки "HOME" в приведённом ниже HTML?
    ```html
          <html style="font-size: 10px;">
            <body style="font-size: 20px;">
              <a style="font-size: 1.2rem;">HOME</a>
            </body>
          </html>
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    `1.2rem` переводится в 12px, потому что единицы `rem` ссылаются на корневой размер шрифта `<html>`, установленный здесь в 10px.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={12}
  group="Единицы: EM"
  title="Вычисление размера в пикселях с помощью EM"
  options={[
    {text: '10px'},
    {text: '12px'},
    {text: '14px'},
    {text: '20px'},
    {text: '24px', isAnswer: true},
    {text: '34px'},
  ]}
>
  <slot name="question">
  <div className="question">
    Как и в предыдущем вопросе, каков будет размер в пикселях `1.2em` для ссылки «HOME» в приведённом ниже HTML?
    ```html
          <html style="font-size: 10px;">
            <body style="font-size: 20px;">
              <a style="font-size: 1.2em;">HOME</a>
            </body>
          </html>
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    `1.2em` переводится в 24px, потому что единицы `em` ссылаются на наследованный размер шрифта, установленный здесь как 20px.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={13}
  group="Селектор: Специфичность"
  title="Селекторы с нулевой специфичностью"
  options={[
    {text: ':where(.card) .title', isAnswer: true},
    {text: '.card .title'},
    {text: ':is(.card) .title'},
    {text: '#card .title'},
  ]}
>
  <slot name="question">
  <div className="question">
    Какой селектор имеет наименьшую специфичность?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    `:where(.card) .title` имеет наименьшую специфичность. Псевдокласс `:where()` и всё внутри него вносит `0-0-0`, поэтому учитывается только `.title`. `:is(.card) .title` сохраняет специфичность `.card`, `.card .title` имеет два класса, а `#card .title` включает ID.
  </div>
  </slot>
</Challenge>

</QuizUI>
````
