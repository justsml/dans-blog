# Translation Candidate
- Slug: quiz-master-modern-html5
- Locale: ru
- Model: openrouter/openai/gpt-oss-120b:nitro
- Target: src/content/posts/2024-11-01--quiz-master-modern-html5/ru/index.mdx
- Validation: rejected: direct AI SDK translation failed
- Runtime seconds: 25.80
- Input tokens: 12933
- Output tokens: 6614
- Thinking tokens: unknown
- Cached input tokens: 5248
- Cache write tokens: 0
- Estimated cost: $0.001695
- Pricing source: local-openrouter-estimate
- Note: Command failed: git add src/content/posts/2024-11-01--quiz-master-modern-html5/ru/index.mdx reports/i18n/quiz-master-modern-html5/ru
## Raw Output

````mdx
---
unlisted: false
title: 'Тест: Стоит ли указывать HTML в резюме?'
subTitle: Докажите себя!
label: Semantic HTML5
social_image: ../desktop-social.webp
category: Quiz
subCategory: HTML
date: '2024-10-31'
modified: '2024-11-06'
tags:
  - quiz
  - web
  - quiz
  - semantic
  - html5
  - web
  - beginner
  - intermediate
cover_full_width: ../jakob-owens-FBih1nqPi0w-unsplash-wide.webp
cover_mobile: ../jakob-owens-FBih1nqPi0w-unsplash-square.webp
cover_icon: ../jakob-owens-FBih1nqPi0w-unsplash-square.webp
---
import Challenge from '../../../../../components/QuizUI/Challenge';
import QuizUI from '../../../../../components/QuizUI/QuizUI';


## Итак, вы считаете, что владеете навыками HTML5?

В конце концов, вы различаете `<div>` и `<span>`, верно? А насколько хорошо вы знакомы с более продвинутыми семантическими элементами HTML5?

> **Примечание:** Если вы не пройдёте этот тест, вы обязаны убрать «HTML Skills» из своего резюме.

### Начать!

<QuizUI>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={0}
  group="Разминка"
  title=""
  options={[
  ]}
>
  <slot name="question">
  <div className="question">
    Какова основная роль элемента `<ul>` в HTML?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Тег `<ul>` создает неупорядоченный список, элементы которого обычно помечаются маркерами.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={1}
  group="Продвинутый семантический HTML"
  title=""
  options={[
  ]}
>
  <slot name="question">
  <div className="question">
    Что представляет собой элемент `<dd>` в HTML?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Элемент [`<dd>` элемент](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dd) определяет описание, определение или значение в списке описаний, используется внутри тегов `<dl>` в паре с `<dt>` (_Description Term_).

    Это полезно при отображении данных в виде «ключ‑значение». Информация профиля, настройки и статистика — типичные примеры.
    ```html
        <dl>
        <dt>JS</dt>
        <dd>Client-side</dd>
        <dd>Server-side</dd>

        <dt>HTML</dt>
        <dd>Client-side</dd>
        </dl>
    ```
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={2}
  group="Продвинутый семантический HTML"
  title=""
  options={[
  ]}
>
  <slot name="question">
  <div className="question">
    Когда следует использовать элементы `<figure>` и `<figcaption>`?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Тег [`<figure>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/figure) обычно используется для обёртывания автономного (медийного) контента, например изображения или диаграммы, вместе с [`<figcaption>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/figcaption) для подписи.

    Это полезно для изображений, схем, фрагментов кода и прочего.
    ```html
        <figure>
        <img src="image.jpg" alt="Description of image">
        <figcaption>Image caption</figcaption>
        </figure>
    ```
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={3}
  group="Продвинутая семантическая HTML"
  title=""
  options={[
  ]}
>
  <slot name="question">
  <div className="question">
    Какова цель элемента `<article>` в HTML?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    The [`<article>` элемент](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/article) используется для определения автономного фрагмента контента, который может быть независимо распространён или переиспользован.

    Чаще всего его применяют для блог‑постов, новостных статей, сообщений на форумах или пользовательских комментариев.

    Вы можете разместить несколько `<article>` на одной странице (например, для бесконечной прокрутки). Или вложить их друг в друга, создавая иерархию «автономного контента».
    ```html
        <article>
        <h2>Article Title</h2>
        <p>Article content...</p>
        <article class="discussion">
        <h3>Comment by User</h3>
        <p>Comment content...</p>
        </article>
        </article>
    ```
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={4}
  group="Продвинутый семантический HTML"
  title=""
  options={[
  ]}
>
  <slot name="question">
  <div className="question">
    Какова цель элементов `<fieldset>` и `<legend>` в форме?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    [`<fieldset>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/fieldset) используется для группировки связанных элементов формы, а `<legend>` предоставляет заголовок/метку для группы, улучшая доступность.

    Это полезно для группировки связанных элементов формы, например, секции для адреса доставки или данных оплаты.
    ```html
        <fieldset>
        <legend>Shipping Address</legend>
        <label for="name">Name:</label>
        <input type="text" id="name" name="name">
        ...
        </fieldset>
        <fieldset>
        <legend>Payment Details</legend>
        <label for="card">Card Number:</label>
        <input type="text" id="card" name="card">
        ...
        </fieldset>
    ```
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={5}
  group="Продвинутый семантический HTML"
  title=""
  options={[
  ]}
>
  <slot name="question">
  <div className="question">
    Какова цель элемента `<meter>`?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Элемент [`<meter>` элемент](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/meter) используется для представления скалярного (одиночного) измерения в заданном диапазоне, например температуры, использования диска или подсчёта голосов.

    Он может показаться похожим на полосу [`<progress>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/progress), однако индикаторы прогресса **ВСЕГДА** начинаются с нуля. Поэтому элементы `<progress>` показывают `процент завершения`, а `<meter>` отображает любое значение внутри определяемого диапазона.
    ```html
        <meter min="-60" max="130" value="75" /> 75°F
        <meter min="0" max="100" value="75" /> 75%
    ```
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={6}
  group="Семантический HTML"
  title=""
  options={[
  ]}
>
  <slot name="question">
  <div className="question">
    Зачем используется элемент `<source>`?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Элемент [`<source>` элемент используется для указания доступных форматов медиа](https://developer.mozilla.org/en-us/docs/web/html/element/source).

    Специфически используется с [`<video>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/video), [`<audio>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/audio) и [`<picture>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/picture) элементами, позволяя браузеру выбрать наиболее подходящий формат.
    ```html
        <video controls>
        <source src="movie.mp4" type="video/mp4">
        <source src="movie.ogg" type="video/ogg">
        </video>
    ```
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={7}
  group="Продвинутая семантическая HTML"
  title=""
  options={[
  ]}
>
  <slot name="question">
  <div className="question">
    Как правильно использовать элемент `<hgroup>`?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Элемент [`<hgroup>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/hgroup) группирует заголовок с сопутствующим вторичным содержимым, обычно одним или несколькими элементами `<p>`.

    Он может быть полезен, когда у заголовка есть подзаголовок, слоган или альтернативный титул, который не должен становиться отдельным заголовком в структуре документа.
    ```html
        <article>
        <hgroup>
        <h1>Frankenstein</h1>
        <p>Or: The Modern Prometheus</p>
        </hgroup>
        <section>
        <h2>Chapter 1</h2>
        <p>...</p>
        </section>
        </article>
    ```
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={8}
  group="Продвинутая семантическая HTML"
  title=""
  options={[
  ]}
>
  <slot name="question">
  <div className="question">
    Для чего используется элемент `<menu>` в HTML?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Элемент [`<menu>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/menu) представляет собой список команд или интерактивных элементов управления.

    Если ваш список состоит из навигационных ссылок, используйте `<nav>` с `<ul>`. Используйте `<menu>` для элементов управления в виде панели инструментов или списков команд.
    ```html
        <menu>
        <li><button type="button">Copy</button></li>
        <li><button type="button">Paste</button></li>
        </menu>
    ```
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={9}
  group="Продвинутый семантический HTML"
  title=""
  options={[
  ]}
>
  <slot name="question">
  <div className="question">
    Какую роль играют `<details>` и `<summary>` в HTML?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    [`<details>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/details) позволяет создавать сворачиваемый контент, а [`<summary>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/summary) задаёт видимый заголовок для этого контента.

    Это полезно для FAQ, сворачиваемых разделов или любого контента, который можно переключать.
    ```html
        <details>
        <summary>Click to expand 🤯</summary>
        <p>Hidden content! 💥</p>
        </details>
    ```
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={10}
  group="Продвинутый семантический HTML"
  title=""
  options={[
  ]}
>
  <slot name="question">
  <div className="question">
    Зачем использовать элемент `<dialog>`?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Элемент [`<dialog>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dialog) используется для всплывающих окон или модальных диалогов, предоставляет семантическую разметку, расширенный CSS и нативный API для этих взаимодействий.

    Используйте JavaScript, чтобы открыть его с помощью `.showModal()` для модальных диалогов или `.show()` для немодальных, и закрыть с помощью `.close()` или отправки формы с `method="dialog"`.
    ```html
        <dialog>
        <h2>Modal Title</h2>
        <p>Modal content...</p>
        <button>Close</button>
        </dialog>
    ```
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={11}
  group="Продвинутый семантический HTML"
  title=""
  options={[
  ]}
>
  <slot name="question">
  <div className="question">
    Как используется элемент `<time>` в HTML?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Элемент `<time>` используется для дат, времени или длительностей. Он может содержать человекочитаемый контент и машинно‑читаемый атрибут `datetime`. В HTML нет элемента `<date>`.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={12}
  group="Продвинутый семантический HTML"
  title="Назначение атрибутов ARIA"
  options={[
  ]}
>
  <slot name="question">
  <div className="question">
    Какова цель атрибутов ARIA?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Атрибуты ARIA (Accessible Rich Internet Applications) улучшают веб‑доступность, предоставляя дополнительный контекст для скрин‑ридеров и других вспомогательных технологий.

    Существуют роли, состояния и свойства, которые можно использовать для описания элементов.
    ```html
        <button aria-label="Close" aria-expanded="true">X</button>
        <main aria-live="polite">...</main>
        <dialog
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="dialog_label"
        aria-describedby="dialog_desc"
        ></dialog>
    ```
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={13}
  group="Продвинутый семантический HTML"
  title="Использование атрибута `role`"
  options={[
    {text: 'Для определения поведения компонента'},
    {text: 'Для описания назначения элемента', isAnswer: true},
    {text: 'Ограничить доступ к элементам'},
    {text: 'Только для Web Components'},
  ]}
>
  <slot name="question">
  <div className="question">
    Для чего используется атрибут `role` в HTML?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Атрибут `role` описывает

    назначение элемента для вспомогательных технологий, помогая улучшить доступность.
  </div>
  </slot>
</Challenge>

</QuizUI>

И как у вас получилось? Готовы применять более семантические HTML‑элементы в следующем проекте? 🚀  

Или навсегда останетесь с `<div>` и `<span>`? 😅  

Пишите в комментариях ниже! 👇
````
