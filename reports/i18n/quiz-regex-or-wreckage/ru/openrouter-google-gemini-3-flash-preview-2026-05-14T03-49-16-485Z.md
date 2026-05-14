# Translation Candidate
- Slug: quiz-regex-or-wreckage
- Locale: ru
- Model: openrouter/google/gemini-3-flash-preview
- Target: src/content/posts/2024-11-15--quiz-regex-or-wreckage/ru/index.mdx
- Validation: passed: local checks only
- Runtime seconds: 105.02
- Input tokens: 17197
- Output tokens: 7882
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- Estimated cost: $0.032244
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
unlisted: false
title: 'Квиз: Мастерство регулярных выражений'
subTitle: Сможете укротить дикие регулярки?
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
import Challenge from '../../../../components/QuizUI/Challenge';
import QuizUI from '../../../../components/QuizUI/QuizUI';

<p class="inset">Готовы побороться с регулярными выражениями? 🤼‍♂️</p>

Проверьте свои знания RegEx: от базовых паттернов, квантификаторов и групп до коварных look-around проверок. От простого поиска подстрок до сложной валидации — сможете ли вы найти верное выражение?

<QuizUI>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={0}
  group="Разминка"
  title="Регистрозависимый поиск"
  options={[
    {text: '["Cat"]'},
    {text: '["cat", "CAT", "Cat"]'},
    {text: '["cat"]', isAnswer: true},
    {text: '[]'},
  ]}
>
  <slot name="question">
  <div className="question">
    Что вернет этот код?
    ```js
        'cat CAT Cat'.match(/cat/g)
    ```
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    Этот паттерн использует флаг `g`, но не использует `i`:
    - `g` находит все совпадения
    - Без флага `i` поиск чувствителен к регистру

    Без флага `i` совпадение будет найдено только для строки "cat" в нижнем регистре.

    Это особенно важно при обработке пользовательского ввода или HTML, где регистр может отличаться.

    [Узнать больше о флагах RegExp](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions#advanced_searching_with_flags)
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
    Шаблон `/^[ch]at/` находит строки, которые:
    - Начинаются (`^`) либо с 'c', либо с 'h' (именно это означает `[ch]` — символьный класс, соответствующий одному символу)
    - После которых идет буквально 'at'

    Следовательно, под этот шаблон подпадают только "cat" и "hat". Метод `filter()` оставляет только те элементы, которые прошли проверку.

    [Узнать больше о символьных классах на MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions/Character_Classes)
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={2}
  group="Базовое соответствие"
  title="Жадность против нежадности"
  options={[
    {text: '["<div>Hello</div>"]'},
    {text: '["<div>", "</div>"]'},
    {text: '["<div>Hello</div><div>World</div>"]'},
    {text: '["<div>Hello</div>", "<div>World</div>"]', isAnswer: true},
    {text: '["Hello", "World"]'},
  ]}
>
  <slot name="question">
  <div className="question">
    Что вернет этот поиск?
    ```js
        '<div>Hello</div><div>World</div>'.match(/<div>.*?<\/div>/g)
    ```
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    Паттерн `/<div>.*?<\/div>/g` использует «нежадный» (ленивый) поиск с помощью `*?`, что означает:
    - Найти `<div>`
    - Найти любой символ (`.*`), но как можно меньше раз (`?`)
    - Пока не встретится `</div>`
    - Флаг `g` заставляет найти все вхождения

    Без символа `?` «жадный» квантификатор `.*` захватил бы всё от первого `<div>` до самого последнего `</div>`, выдав одно огромное совпадение. С `?` он находит каждую пару по отдельности.

    [Узнать больше о жадном и ленивом поиске](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions/Quantifiers#greedy_versus_non-greedy_lazy_matching)
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={3}
  group="Типичные ловушки"
  title="Метасимвол точка"
  options={[
    {text: '["hello\nworld"]'},
    {text: '["hello", "world"]', isAnswer: true},
    {text: '["hello\n", "world"]'},
    {text: 'null'},
  ]}
>
  <slot name="question">
  <div className="question">
    Что вернет этот код?
    ```js
        'hello\nworld'.match(/\w+/g)
    ```
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    Шаблон `\w+` соответствует одному или нескольким словесным символам. Несмотря на наличие символа новой строки в строке, `\w` находит:
    - Буквы (a-z, A-Z)
    - Цифры (0-9)
    - Нижнее подчеркивание (_)

    Таким образом, символ новой строки выступает в роли границы слова, и мы получаем два совпадения. Если бы мы использовали `.*`, он бы по умолчанию не совпал с символом новой строки (для этого понадобился бы флаг `s`).

    [Узнать больше о метасимволах](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions/Character_Classes#types)
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={4}
  group="Look-ahead"
  title="Положительная опережающая проверка"
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
    Что вернет этот код?
    ```js
        '$100 and €50'.match(/\d+(?=[\$€])/g)
    ```
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    Этот паттерн ничего не найдет, потому что опережающая проверка (look-ahead) работает в другую сторону! Если вам нужны цифры, перед которыми стоят `$` или `€`, используйте ретроспективную проверку (look-behind): `/(?<=[\$€])\d+/g`.

    Опережающие проверки (look-aheads) проверяют то, что идет *после* текущей позиции. Написанный паттерн ищет:
    - Одну или более цифр (`\d+`)
    - За которыми следует (`(?=...)`) либо $ либо € (`[\$€]`)

    Так как в строке нет чисел, за которыми следуют символы валют (они стоят перед ними), совпадений не будет.

    [Узнать больше об утверждениях look-ahead](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions/Assertions)
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={5}
  group="Базовое соответствие"
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
    Что вернет этот код?
    ```js
        'cat cats category'.match(/\bcat\b/g)
    ```
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    `\b` представляет собой границу слова, которая срабатывает:
    - Между буквенно-цифровым символом (word character) и не буквенно-цифровым символом
    - В начале или конце строки, если там находится буквенно-цифровой символ

    Таким образом, `/\bcat\b/` соответствует "cat" только тогда, когда это отдельное слово, а не часть другого слова.
    - ✅ "cat" (окружено пробелами)
    - ❌ "cats" (после "cat" нет границы слова)
    - ❌ "category" (после "cat" нет границы слова)

    [Узнать больше о границах слов](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions/Assertions#other_assertions)
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={6}
  group="Типичные ловушки"
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
    Что выведет этот код?
    ```js
        'banana'.match(/a/g)
    ```
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    Флаг `g` (global) меняет поведение метода `match()`:
    - Без `g`: Возвращает первое совпадение вместе с группами захвата.
    - С `g`: Возвращает массив всех найденных строк.

    В данном случае метод находит все вхождения символа "a" в строке "banana".

    Примечание: Если вам нужны и все совпадения, и группы захвата, используйте `matchAll()` или вызывайте метод `exec()` в цикле.

    [Узнать больше о глобальном флаге](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/global)
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={7}
  group="Look-behind"
  title="Отрицательная ретроспективная проверка"
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
    Что совпадет с этим шаблоном?
    ```js
        'abc123 def456'.match(/(?<!abc)\d+/g)
    ```
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    Отрицательная ретроспективная проверка `(?<!abc)` гарантирует, что перед цифрами не стоит строка "abc":
    - ❌ "123" (предшествует "abc")
    - ✅ "23" (предшествует "abc1")
    - ✅ "456" (предшествует "def")

    JavaScript поддерживает ретроспективные проверки (look-behind) в современных движках. В этом примере используется проверка фиксированной длины: `abc` всегда состоит из трех символов. Ретроспективные проверки переменной длины — это более сложный нюанс, зависящий от конкретного движка.

    Примечание: Поддержка look-behind появилась в JavaScript относительно недавно. Проверьте [совместимость с браузерами](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions#browser_compatibility), если вам нужно поддерживать старые браузеры.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={8}
  group="Базовое соответствие"
  title="Захватывающие группы"
  options={[
    {text: '["2029-12-31"]'},
    {text: '["2029", "12", "31"]', isAnswer: true},
    {text: '["20", "29", "12", "31"]'},
    {text: 'null'},
  ]}
>
  <slot name="question">
  <div className="question">
    Что вернет этот код?
    ```js
        '2029-12-31'.match(/(\d{4})-(\d{2})-(\d{2})/).slice(1)
    ```
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    Шаблон использует три захватывающие группы:
    1. `(\d{4})` захватывает год
    2. `(\d{2})` захватывает месяц
    3. `(\d{2})` захватывает день

    Метод `match()` без флага `g` возвращает:
    - Индекс 0: Полное совпадение
    - Индекс 1 и далее: Содержимое захватывающих групп

    Использование `slice(1)` — это распространенный прием, позволяющий получить только значения захваченных групп.

    [Узнать больше о группах и обратных ссылках](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions/Groups_and_Backreferences)
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={9}
  group="Опережающие проверки"
  title="Отрицательная опережающая проверка"
  options={[
    {text: '["password123"]'},
    {text: '["abc123"]'},
    {text: '["123aBc"]'},
    {text: '["12"]', isAnswer: true},
    {text: '["abc"]'},
    {text: 'Error'},
  ]}
>
  <slot name="question">
  <div className="question">
    Каков будет результат выполнения этого кода?
    ```js
        "123aBc".match(/^\d+(?![a-z])/ig)
    ```
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    Отрицательная опережающая проверка `(?![a-z])` гарантирует, что после цифр не следуют строчные буквы. Поскольку в части "3aBc" после цифр идет строчная буква, эта часть не соответствует условию. В итоге совпадение находит только начальные цифры "12".

    [Узнать больше об отрицательной опережающей проверке](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions/Assertions)
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={10}
  group="Look-behind"
  title="Разделение через Look-behind"
  options={[
    {text: '["a,", "b,", "c"]', isAnswer: true},
    {text: '["a,b,c"]'},
    {text: '["a", ",", "b", ",", "c"]'},
    {text: '["a,b,c", ""]'},
  ]}
>
  <slot name="question">
  <div className="question">
    Что вернет этот код?
    ```js
        'a,b,c'.split(/(?<=,)/)
    ```
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    Паттерн `/(?<=,)/` — это ретроспективная проверка (look-behind), которая находит позицию сразу после запятой:
    - `a,` (после запятой)
    - `b,` (после запятой)
    - `c` (после неё нет запятой)

    Look-behind не «поглощает» символы (в данном случае запятую), поэтому запятая остается прикрепленной к предыдущему сегменту в результате выполнения `split`.

    Это крайне полезно, когда нужно разделить строку, ориентируясь на предшествующие символы, но при этом **сохранить сами разделители в итоговом массиве.**

    [Узнать больше о ретроспективных проверках (look-behind)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions/Assertions)
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={11}
  group="Типичные ловушки"
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
    Что вернет этот код?
    ```js
        '$100'.match(/$\d+/)
    ```
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    Специальные символы нужно экранировать с помощью `\`, чтобы они воспринимались как обычный текст:
    - `$` — это специальный символ (конец строки)
    - Чтобы найти символ доллара буквально, его нужно экранировать: `\$`

    Основные символы, требующие экранирования:
    ```js
        . * + ? ^ $ [ ] \ ( ) { } |
    ```
    Без экранирования многие спецсимволы имеют в регулярных выражениях особое значение, которое может не совпадать с вашими целями.

    [Узнать больше об экранировании специальных символов](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions#escaping)
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={12}
  group="Ретроспективная проверка"
  title="Положительная ретроспективная проверка"
  options={[
    {text: '["$100"]'},
    {text: '["100"]', isAnswer: true},
    {text: '["$"]'},
    {text: '[]'},
  ]}
>
  <slot name="question">
  <div className="question">
    Что будет найдено?
    ```js
        '$100'.match(/(?<=\$)\d+/)
    ```
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    Положительная ретроспективная проверка (positive look-behind) `(?<=\$)` гарантирует, что перед цифрами стоит знак доллара:
    - `(?<=\$)`: Проверка наличия знака доллара перед текущей позицией
    - `\d+`: Поиск одной или более цифр

    Ретроспективные проверки не «потребляют» символы; они только проверяют условие перед совпадением.
    Это полезно, когда нужно найти подстроку на основе того, что ей предшествует, не включая саму предшествующую часть в результат.

    [Узнать больше о ретроспективных проверках](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions/Assertions)
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={13}
  group="Базовое соответствие"
  title="Ленивые и жадные квантификаторы"
  options={[
    {text: '["<b>bold</b>"]'},
    {text: '["bold"]', isAnswer: true},
    {text: '["<b>", "</b>"]'},
    {text: '[]'},
  ]}
>
  <slot name="question">
  <div className="question">
    Что будет найдено?
    ```js
        '<b>bold</b>'.match(/<b>(.*?)<\/b>/).slice(1)
    ```
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    Шаблон использует ленивый поиск с помощью `*?`:
    - `<b>`: Соответствует открывающему тегу
    - `(.*?)`: Захватывает любые символы (лениво)
    - `</b>`: Соответствует закрывающему тегу

    Символ `?` после `*` делает квантификатор ленивым, заставляя его искать как можно меньше символов.
    Без `?` он был бы жадным и захватил бы максимально возможную строку.

    Метод `slice(1)` возвращает только захваченную группу.

    [Узнать больше о жадном и ленивом поиске](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions/Quantifiers#greedy_versus_non-greedy_lazy_matching)
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={14}
  group="Базовое соответствие"
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
    Что вернет этот код?
    ```js
        '😀 🙂'.match(/\p{Emoji}/gu)
    ```
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    Флаг `u` активирует:
    - Экранирование свойств Unicode (`\p{...}`)
    - Корректную обработку суррогатных пар

    Без флага `u` эмодзи и другие Unicode-символы могут обрабатываться некорректно.
    Шаблон `\p{Emoji}` ищет символы со свойством Unicode `Emoji`. В данной строке это две пиктограммы эмодзи.

    Примечание: Экранирование свойств Unicode требует обязательного наличия флага `u`.

    [Узнать больше о режиме Unicode](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions/Unicode_Property_Escapes)
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={15}
  group="Взгляд в бездну"
  title="Валидация пароля"
  options={[
    {text: '"sassword123"'},
    {text: '"Sass123!"', isAnswer: true},
    {text: '"SASSWORD123"'},
    {text: '"Sass word123"'},
  ]}
>
  <slot name="question">
  <div className="question">
    Заранее прошу прощения! 😈<br />
    Какой пароль соответствует этому паттерну?
    ```js
        /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/
    ```
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    Никогда не пишите ничего подобного в продакшене! 😅

    Этот паттерн использует несколько позитивных опережающих проверок (positive look-aheads) для обеспечения следующих условий:
    - Минимум одна заглавная буква: `(?=.*[A-Z])`
    - Минимум одна строчная буква: `(?=.*[a-z])`
    - Минимум одна цифра: `(?=.*\d)`
    - Минимум один спецсимвол: `(?=.*[!@#$%^&*])`
    - Минимальная длина 8 символов: `.{8,}`

    Опережающие проверки идеально подходят для валидации паролей, так как они позволяют проверять несколько критериев, не «потребляя» символы строки.

    [Узнать больше о паттернах валидации паролей](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions/Assertions)
  </div>
  </slot>
</Challenge>

</QuizUI>

---
<h2>Как успехи? 🧐</h2>

Регулярные выражения — зверь строптивый, но невероятно мощный, если приручить синтаксис (особенно современные фишки). Продолжайте практиковаться, и статус мастера RegEx не заставит себя ждать! 🧙‍♂️

<p class="inset">Решили сделать перерыв после такой порции RegEx?<br />Пф-ф, отдыхать будем *после* прокачки скиллов! <br /><br />Заглядывайте в [мой зал](/challenges/), чтобы разнести еще пару челенджей! 💪</p>
---
````
