# Translation Candidate
- Slug: handling-international-numbers-and-currency
- Locale: ru
- Model: qwen/qwen3.6-plus
- Target: src/content/posts/2024-08-29--handling-international-numbers-and-currency/ru/index.mdx
- Validation: rejected: direct AI SDK translation failed
- Runtime seconds: 240.04
- Input tokens: unknown
- Output tokens: unknown
- Thinking tokens: unknown
- Cached input tokens: unknown
- Cache write tokens: unknown
- Estimated cost: unknown
- Pricing source: unknown
- Note: Command failed after 240000ms: bun run i18n:translate:chunked -- --slug handling-international-numbers-and-currency --locale ru --model qwen/qwen3.6-plus --chunk 6p --run-id 2026-05-13T18-15-57-947Z-61322 --run-lock-path /Users/dan/code/oss/dans-blog/.git/codex-i18n-translation-run.json --quiz-concurrency 24
## Raw Output

````mdx
---
social_image: ../desktop-social.webp
title: Понимание международных чисел и валют
subTitle: 'Локализованные деньги: объяснение!'
draft: false
date: '2024-08-28'
modified: '2024-09-03'
tags:
  - engineering
  - internationalization
  - localization
  - currency
  - numbers
category: HowTo
subCategory: Internationalization
cover_full_width: ../currency-banner-wide.webp
cover_mobile: ../currency-banner-pic__w200.webp
cover_icon: ../currency-banner-pic__w200.webp
---
- [Деньги: локализация (L10n) и интернационализация (i18n)](#money-localization-l10n-and-internationalization-i18n)
- [Ключевые концепции](#critical-concepts)
  - [Числа локальны 🏘️](#numbers-are-local-️)
  - [Валюта глобальна 🌎](#currency-is-global-️)
  - [Когда локаль имеет значение](#when-locale-matters)
- [Решение](#a-solution)
- [Следующие шаги](#next-steps)

## Деньги: локализация (L10n) и интернационализация (i18n)

Они не просто для того, чтобы доминировать в игре в Scrabble — _локализация_ и _интернационализация_ относятся к процессу, который делает продукт **как дома в другой стране.**

<p class="breakout quote">Показывать валюту в неправильном локальном формате — верный признак: вы не приложили усилий.<br/>Если вы не можете правильно отформатировать цену, как вы справитесь с доставкой?</p>

Интернационализация — большая тема, охватывающая всё от перевода текста до форматирования дат. В этой статье мы сосредоточимся на конкретном подразделе — **форматировании чисел и валюты.**

Давайте рассмотрим форматирование между тремя странами еврозоны, США и Индией:

- `€1,234,567.89` Ирландия 🇮🇪
- `1.234.567,89 €` Германия 🇩🇪
- `1 234 567,89 €` Франция 🇫🇷
- `$1,234,567.89` США 🇺🇸
- `₹12,34,567.89` Индия 🇮🇳

Хаос, правда? Символы, пробелы и знаки препинания разлетаются кто куда! Удивительно, как ЕС вообще может о чём-то договориться! 😅

## Ключевые понятия

Прежде чем перейти к решениям, что значит «Числа — локальны»?

### Числа — локальны 🏘️

Каждая локаль ([Страна по ISO 3166](https://en.wikipedia.org/wiki/List_of_ISO_3166_country_codes)) определяет свои правила форматирования чисел.

Правила форматирования чисел включают:

- Десятичный разделитель: запятая, точка.
- Разделитель тысяч: запятая, точка, пробел.
- Позиция и пробелы вокруг символа валюты.

### Валюта глобальна 🌎

`Валюта` — это конкретная денежная единица. (См. [ISO 4217](https://en.wikipedia.org/wiki/ISO_4217#Active_codes_(list_one)) для полного списка.)

- Указывает символ: `$`, `€`, `£`, `¥`. (Часто повторяется.)
- Всегда имеет трёхбуквенный код: `USD`, `EUR`, `GBP`, `JPY`.
- Может использоваться/обмениваться в «любой» стране. Теоретически.
- Конвертация между валютами требует данных об обменном курсе.
- Значение не меняется в зависимости от локали.

### Когда локаль имеет значение

Большинство REST API для электронной коммерции/платежей оперируют парой `price` + `currencyCode`. Почему без локалей?

Локали (как правило) задаются на уровне ОС/устройства, и браузеры предоставляют их через `navigator.language`. Поскольку у каждого из ваших пользователей может быть своя локаль, форматировать числа и валюту имеет смысл только на стороне клиента.

## Решение

Хорошие новости! Современные языки программирования имеют встроенную поддержку этого. В JavaScript есть класс [`Intl`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl) и `Intl.NumberFormat`!

Взглянем на код:

```javascript
const number = 1_234_567.89;

/**
 * Форматирует число в локальной валюте.
 * @param {number} amount - Сумма для форматирования.
 * @param {string} currency - Трёхбуквенный код валюты.
 * @param {string} [locale] - Строка локали пользователя.
 */
const formatMoney = (amount, currency, locale = navigator.language) =>
  new Intl.NumberFormat(locale, { currency, style: 'currency' })
    .format(amount);

console.log('🇩🇪 ' + formatMoney(number, 'EUR', 'de-DE'));
console.log('🇮🇪 ' + formatMoney(number, 'EUR', 'ga-IE'));
console.log('🇫🇷 ' + formatMoney(number, 'EUR', 'fr-FR'));
```

Если нужно делать более сложные вещи — расчёт налогов, применение скидок или конвертацию между валютами — стоит использовать библиотеку типа [dinero.js](https://v2.dinerojs.com/).

## Дальнейшие шаги

В зависимости от ваших конкретных потребностей, возможно, вам захочется изучить смежные концепции:

- Лучшие практики работы с локалью пользователя. Определение + возможность переопределения (например, выпадающий список стран).
- Хранение целых чисел (храните центы, а не доллары).
- Денежные расчёты (например, применение купона на `20% скидки`, вычисление `subTotal + налоги` и т.д.).
- Курсы валют в реальном времени (для розничных покупок, обмена валют).

<p class="breakout quote">Дайте знать, если хотите увидеть будущую статью на эти темы!</p>

{/* ## Рекомендации

Некоторые библиотеки могут помочь с этими задачами:

**JavaScript / TypeScript**

- [dinero.js](https://v2.dinerojs.com/) поддерживает денежные расчёты, курсы обмена, форматирование и парсинг!

**Rust**

- [rusty_money](https://crates.io/crates/rusty_money) — моя предпочитаемая библиотека для Rust.

**Go**

- [currency](https://github.com/bojanz/currency) — мой текущий выбор для Golang.
 */}
````
