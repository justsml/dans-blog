# Translation Candidate
- Slug: quiz-regex-or-wreckage
- Locale: ru
- Model: openrouter/qwen/qwen3-32b:nitro
- Target: src/content/posts/2024-11-15--quiz-regex-or-wreckage/ru/index.mdx
- Validation: rejected: direct AI SDK translation failed
- Runtime seconds: 143.34
- Input tokens: 14742
- Output tokens: 17101
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- Estimated cost: $0.005284
- Pricing source: local-openrouter-estimate
- Note: Command failed: git add src/content/posts/2024-11-15--quiz-regex-or-wreckage/ru/index.mdx reports/i18n/quiz-regex-or-wreckage/ru
## Raw Output

````mdx
---
unlisted: false
title: 'Тест: Мастерство регулярных выражений'
subTitle: ''
label: RegEx
social_image: ../desktop-social.webp
category: Quiz
subCategory: RegEx
date: '2024-11-15'
modified: '2024-11-16'
tags:
  - quiz
  - regex
  - javascript
  - intermediate
  - patterns
cover_full_width: ../dan-lounsbury-uHZ2-nzYuIs-unsplash-wide.webp
cover_mobile: ../dan-lounsbury-uHZ2-nzYuIs-unsplash-square-200.webp
cover_icon: ../dan-lounsbury-uHZ2-nzYuIs-unsplash-square-200.webp
---
import Challenge from '../../../../../components/QuizUI/Challenge';
import QuizUI from '../../../../../components/QuizUI/QuizUI';

<p class="inset">Готовы бороться с регулярными выражениями? 🤼‍♂️</p>

Проверьте свои знания RegEx с вопросами о базовых паттернах, квантификаторах, группах и сложных утверждениях смотрящих вокруг. От простого сопоставления строк до сложной валидации паттернов — сможете ли вы определить правильное регулярное выражение?

<QuizUI>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={0}
  group="Разминка"
  title="Сопоставление с учетом регистра"
  options={[
    {text: '[«Cat»]'},
    {text: '[«cat», «CAT», «Cat»]'},
    {text: '[«cat»]', isAnswer: true},
    {text: '[]'},
  ]}
>
  <slot name="question">
  <div className="question">
    Что совпадает?
    ```js
        'cat CAT Cat'.match(/cat/g)
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Этот шаблон использует `g`, но не `i`:
    - `g` находит все совпадения
    - Без `i` сопоставление чувствительно к регистру

    Без флага `i` совпадает только строчное "cat".

    Это особенно полезно при работе с пользовательским вводом или HTML, где регистр может варьироваться.

    [Узнайте больше о флагах RegExp](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions#advanced_searching_with_flags)
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={1}
  group="Разминка"
  title="Простое сопоставление символов"
  options={[
    {text: '["cat", "hat"]', isAnswer: true},
    {text: '["cat", "hat", "what"]'},
    {text: '["cat"]'},
    {text: '[]'},
  ]}
>
  <slot name="question">
  <div className="question">
    Что вернет этот код?
    ```js
        const words = ['cat', 'hat', 'what', 'bat'];
        words.filter(word => word.match(/^[ch]at/))
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Паттерн `/^[ch]at/` соответствует строкам, которые:
    - Начинаются (`^`) с 'c' или 'h' (это `[ch]` — класс символов, совпадающий с одним символом)
    - Следом содержит 'at'

    Таким образом, только "cat" и "hat" соответствуют этому паттерну. Метод `filter()` оставляет только совпадающие элементы.

    [Узнайте больше о классах символов на MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions/Character_Classes)
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={2}
  group="Базовое Совпадение"
  title="Жадные vs Нежадные"
  options={[
  ]}
>
  <slot name="question">
  <div className="question">
    Что это будет совпадать?
    ```js
        '<div>Hello</div><div>World</div>'.match(/<div>.*?<\/div>/g)
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Паттерн `/<div>.*?<\/div>/g` использует нежадное совпадение с `*?`, что означает:
    - Совпадение `<div>`
    - Совпадение любого символа (`.*`), но минимальное количество (`?`)
    - До тех пор, пока не найдётся `</div>`
    - Флаг `g` заставляет искать все совпадения

    Без `?` жадный `.*` совпадёт со всем от первого `<div>` до последнего `</div>`, создав одно большое совпадение. С `?` он находит каждую пару отдельно.

    [Узнайте больше о жадном vs нежадном совпадении](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions/Quantifiers#greedy_versus_non-greedy_lazy_matching)
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={3}
  group="Частые ошибки"
  title="Метасимвол точки"
  options={[
    {text: '["hello\nworld"]'},
    {text: '["hello", "world"]', isAnswer: true},
    {text: '["hello\n", "world"]'},
    {text: 'null'},
  ]}
>
  <slot name="question">
  <div className="question">
    Что будет возвращено?
    ```js
        'hello\nworld'.match(/\w+/g)
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Паттерн `\w+` совпадает с одним или более словесными символами. Даже если в строке есть символ новой строки, `\w` совпадает с:
    - Буквы (a-z, A-Z)
    - Цифры (0-9)
    - Символ подчёркивания (_)

    Таким образом, символ новой строки выступает в качестве границы слова, и мы получаем два совпадения. Если бы мы использовали `.*`, он не совпадал бы с символом новой строки по умолчанию (для этого потребовался бы флаг `s`).

    [Узнайте больше о метасимволах](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions/Character_Classes#types)
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={4}
  group="Просмотр вперёд"
  title="Положительный просмотр вперёд"
  options={[
    {text: '["$100", "€50"]'},
    {text: '["100", "50"]'},
    {text: '["$", "€"]'},
    {text: '[]'},
    {text: 'null', isAnswer: true},
  ]}
>
  <slot name="question">
  <div className="question">
    Что будет совпадать?
    ```js
        '$100 and €50'.match(/\d+(?=[\$€])/g)
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Этот шаблон не совпадёт с ничем, потому что просмотр вперёд работает в обратном направлении! Если нужны цифры, предшествуемые `$` или `€`, используйте обратный просмотр: `/(?<=[\$€])\d+/g`.

    Просмотр вперёд проверяет, что *следует* за текущей позицией. В исходном шаблоне ищется:
    - Одна или более цифры (`\d+`)
    - Следом (`(?=...)`) за `$` или `€` (`[\$€]`)

    Поскольку нет чисел, за которыми идут символы валюты (они предшествуют числам), совпадений не будет.

    [Узнайте больше об утверждениях просмотра вперёд](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions/Assertions)
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={5}
  group="Базовое сопоставление"
  title="Границы слов"
  options={[
    {text: '["cat", "cats"]'},
    {text: '["cat"]', isAnswer: true},
    {text: '["cats"]'},
    {text: '[]'},
  ]}
>
  <slot name="question">
  <div className="question">
    Что совпадёт?
    ```js
        'cat cats category'.match(/\bcat\b/g)
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Символ `\b` представляет собой границу слова, которая совпадает:
    - Между словесным и несловесным символом
    - В начале/конце строки, если есть словесный символ

    Таким образом, `/\bcat\b/` совпадает с "cat" только как с целым словом, а не частью другого слова.
    - ✅ "cat" (окружено пробелами)
    - ❌ "cats" (нет границы после "cat")
    - ❌ "category" (нет границы после "cat")

    [Узнайте больше о границах слов](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions/Assertions#other_assertions)
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={6}
  group="Частые ошибки"
  title="Глобальный флаг"
  options={[
    {text: 'null'},
    {text: '["a"]'},
    {text: '["a", "a", "a"]', isAnswer: true},
    {text: '["b", "n", "n"]'},
    {text: 'Error'},
  ]}
>
  <slot name="question">
  <div className="question">
    Какой будет результат?
    ```js
        'banana'.match(/a/g)
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Флаг `g` (global) изменяет поведение `match()`:
    - Без `g`: Возвращает первое совпадение с группами захвата
    - С `g`: Возвращает массив всех найденных строк

    В данном случае он находит все вхождения "a" в строке "banana".

    Важно: Если нужны и все совпадения, и группы захвата, используйте `matchAll()` или `exec()` в цикле.

    [Узнайте больше о глобальном флаге](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/global)
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={7}
  group="Взгляд назад"
  title="Негативный взгляд назад"
  options={[
    {text: '["123"]'},
    {text: '["123", "456"]'},
    {text: '["23", "456"]', isAnswer: true},
    {text: '["456"]'},
    {text: '[]'},
  ]}
>
  <slot name="question">
  <div className="question">
    Какие элементы соответствуют этой паттерне?
    ```js
        'abc123 def456'.match(/(?<!abc)\d+/g)
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Негативный взгляд назад `(?<!abc)` гарантирует, что цифры не предшествуют строка "abc":
    - ❌ "123" (предшествует "abc")
    - ✅ "23" (предшествует "abc1")
    - ✅ "456" (предшествует "def")

    Современные движки JavaScript поддерживают утверждения взглядов назад. Этот пример использует фиксированную длину взглядов назад: `abc` всегда три символа. Переменная длина взглядов назад — более сложная, специфичная для движка задача.

    Внимание: Поддержка взглядов назад появилась сравнительно недавно в JavaScript. Проверьте [совместимость браузеров](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions#browser_compatibility), если нужно поддерживать старые браузеры.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={8}
  group="Базовое сопоставление"
  title="Группы захвата"
  options={[
    {text: '["2029-12-31"]'},
    {text: '["2029", "12", "31"]', isAnswer: true},
    {text: '["20", "29", "12", "31"]'},
    {text: 'null'},
  ]}
>
  <slot name="question">
  <div className="question">
    Что будет возвращать этот код?
    ```js
        '2029-12-31'.match(/(\d{4})-(\d{2})-(\d{2})/).slice(1)
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Регулярное выражение использует три группы захвата:
    1. `(\d{4})` захватывает год
    2. `(\d{2})` захватывает месяц
    3. `(\d{2})` захватывает день

    `match()` без флага `g` возвращает:
    - Индекс 0: Полное совпадение
    - Индекс 1+: Группы захвата

    `slice(1)` — распространённый трюк для получения только групп захвата.

    [Узнайте больше о группах и обратных ссылках](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions/Groups_and_Backreferences)
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={9}
  group="Просмотр вперёд"
  title="Отрицательный просмотр вперёд"
  options={[
    {text: '["password123"]'},
    {text: '["abc123"]'},
    {text: '["123aBc"]'},
    {text: '["12"]', isAnswer: true},
    {text: '["abc"]'},
    {text: 'Ошибка'},
  ]}
>
  <slot name="question">
  <div className="question">
    Каким будет результат этого?
    ```js
        "123aBc".match(/^\d+(?![a-z])/ig)
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Отрицательный просмотр вперёд `(?![a-z])` гарантирует, что после цифр нет строчных букв. Поскольку часть "3aBc" содержит строчную букву после цифр, её часть не совпадает. Таким образом, совпадает только начало "12".

    [Узнайте больше об отрицательном просмотре вперёд](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions/Assertions)
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={10}
  group="Look-behind"
  title="Разделение с использованием look-behind"
  options={[
    {text: '["a,", "b,", "c"]', isAnswer: true},
    {text: '["a,b,c"]'},
    {text: '["a", ",", "b", ",", "c"]'},
    {text: '["a,b,c", ""]'},
  ]}
>
  <slot name="question">
  <div className="question">
    Что возвращается?
    ```js
        'a,b,c'.split(/(?<=,)/)
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Паттерн `/(?<=,)/` — это look-behind, который совпадает после запятой:
    - `a,` (после запятой)
    - `b,` (после запятой)
    - `c` (нет запятой после)

    Look-behind не потребляет запятую, поэтому запятая остаётся привязанной к предыдущему сегменту в результате разделения.

    Это полезно, когда нужно разделить строку по тому, что стоит перед разделителем, **не теряя сам разделитель**.

    [Узнайте больше о look-behind утверждениях](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions/Assertions)
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={11}
  group="Частые ошибки"
  title="Экранирование специальных символов"
  options={[
    {text: '["$100"]'},
    {text: '["100"]'},
    {text: '[]'},
    {text: 'null', isAnswer: true},
    {text: 'Error'},
  ]}
>
  <slot name="question">
  <div className="question">
    Что найдётся?
    ```js
        '$100'.match(/$\d+/)
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Специальные символы нужно экранировать с помощью `\`, чтобы они интерпретировались буквально:
    - `$` — специальный символ (конец строки)
    - Чтобы найти обычный знак доллара, экранируйте его: `\$`

    Часто требуют экранирования символы:
    ```js
        . * + ? ^ $ [ ] \ ( ) { } |
    ```
    Без экранирования многие специальные символы имеют в регулярных выражениях значения, которые могут отличаться от ваших ожиданий.

    [Узнайте больше об экранировании специальных символов](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions#escaping)
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={12}
  group="Просмотр назад"
  title="Положительный просмотр назад"
  options={[
    {text: '["$100"]'},
    {text: '["100"]', isAnswer: true},
    {text: '["$"]'},
    {text: '[]'},
  ]}
>
  <slot name="question">
  <div className="question">
    Что совпадает?
    ```js
        '$100'.match(/(?<=\$)\d+/)
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Положительный просмотр назад `(?<=$)` гарантирует, что цифры предшествует знак доллара:
    - `(?<=$)`: Проверка наличия знака доллара перед
    - `\d+`: Совпадение с одной или несколькими цифрами

    Утверждения просмотра назад не потребляют символы; они только проверяют, что находится перед совпадением.
    Это полезно, когда нужно найти совпадение на основе того, что находится перед ним, не включая предшествующую часть.

    [Узнайте больше об утверждениях просмотра назад](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions/Assertions)
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={13}
  group="Базовое сопоставление"
  title="Ленивые vs жадные квантификаторы"
  options={[
  ]}
>
  <slot name="question">
  <div className="question">
    Что найдено?
    ```js
        '<b>bold</b>'.match(/<b>(.*?)<\/b>/).slice(1)
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Шаблон использует ленивое сопоставление с `*?`:
    - `<b>`: Совпадение открывающего тега
    - `(.*?)`: Захват любого количества символов (ленивое)
    - `</b>`: Совпадение закрывающего тега

    Знак `?` после `*` делает его ленивым, совпадая с минимальным количеством символов.
    Без `?` он был бы жадным и совпадал бы с максимальным количеством.

    `slice(1)` возвращает только захваченную группу.

    [Узнайте больше о жадном и ленивом сопоставлении](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions/Quantifiers#greedy_versus_non-greedy_lazy_matching)
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={14}
  group="Базовое сопоставление"
  title="Флаг Unicode"
  options={[
    {text: '["🙂"]'},
    {text: '["😀", "🙂"]', isAnswer: true},
    {text: 'null'},
    {text: 'Error'},
  ]}
>
  <slot name="question">
  <div className="question">
    Что совпадает?
    ```js
        '😀 🙂'.match(/\p{Emoji}/gu)
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Флаг `u` включает:
    - Unicode-экранирование свойств (`\p{...}`)
    - Правильную обработку пар суррогатов

    Без `u` эмодзи и другие Unicode-символы могут не совпадать правильно.
    Паттерн `\p{Emoji}` совпадает с символами, имеющими Unicode-свойство `Emoji`. В этой строке это означает два эмодзи-изображения.

    Примечание: Unicode-экранирование свойств требует флага `u`.

    [Узнайте больше о режиме Unicode](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions/Unicode_Property_Escapes)
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={15}
  group="Взгляни в ад"
  title="Проверка пароля"
  options={[
    {text: '"sassword123"'},
    {text: '"Sass123!"', isAnswer: true},
    {text: '"SASSWORD123"'},
    {text: '"Sass word123"'},
  ]}
>
  <slot name="question">
  <div className="question">
    Извините заранее! 😈<br />
    Какой пароль соответствует этому шаблону?
    ```js
        /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Не пишите ничего подобного в продакшене! 😅

    Этот шаблон использует несколько положительных утверждений вперёд для проверки:
    - Хотя бы одна заглавная буква: `(?=.*[A-Z])`
    - Хотя бы одна строчная буква: `(?=.*[a-z])`
    - Хотя бы одна цифра: `(?=.*\d)`
    - Хотя бы один специальный символ: `(?=.*[!@#$%^&*])`
    - Минимальная длина 8: `.{8,}`

    Утверждения вперёд идеальны для проверки паролей, потому что они могут проверять несколько критериев без потребления символов.

    [Узнайте больше о шаблонах проверки паролей](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions/Assertions)
  </div>
  </slot>
</Challenge>

</QuizUI>

<h2>Как у тебя дела? 🧐</h2>  

Регулярные выражения — дикая штука, но они невероятно мощные, когда ты освоишь их (и все новые синтаксические конструкции). Продолжай тренироваться, и вскоре ты станешь мастером RegEx! 🧙‍♂️  

<p class="inset">Ищешь перерыв после всех этих регулярных выражений?<br />Пфф, помни: перерыв *после* навыков! <br /><br />Перейди в [мою тренажёрку](/challenges/), чтобы раздавить ещё больше задач! 💪</p>
````
