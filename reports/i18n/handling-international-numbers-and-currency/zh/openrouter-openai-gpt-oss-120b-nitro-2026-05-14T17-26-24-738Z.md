# Translation Candidate
- Slug: handling-international-numbers-and-currency
- Locale: zh
- Model: openrouter/openai/gpt-oss-120b:nitro
- Target: src/content/posts/2024-08-29--handling-international-numbers-and-currency/zh/index.mdx
- Validation: deferred
- Runtime seconds: 2.23
- Input tokens: 3045
- Output tokens: 1482
- Thinking tokens: unknown
- Cached input tokens: 1280
- Cache write tokens: 0
- Estimated cost: $0.000386
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
social_image: ../desktop-social.webp
title: 理解国际数字与货币
subTitle: 本地化货币详解！
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
- [Money: 本地化 (L10n) 与国际化 (i18n)](#money-localization-l10n-and-internationalization-i18n)
- [关键概念](#critical-concepts)
  - [数字是本地的 🏘️](#numbers-are-local-️)
  - [货币是全球的 🌎](#currency-is-global-️)
  - [何时本地化重要](#when-locale-matters)
- [解决方案](#a-solution)
- [后续步骤](#next-steps)

## Money: 本地化 (L10n) 与国际化 (i18n)

它们可不只是为了在拼字游戏里称王称霸，*本地化* 与 *国际化* 指的是让产品 **在不同国家也能有归属感** 的过程。

<p class="breakout quote">以错误的本地格式显示货币是最明显的失误：说明你根本没有下功夫。<br/>如果连价格都格式化不了，运费怎么算？</p>

国际化是个大话题，涵盖从文本翻译到日期格式的方方面面。在本文中我们聚焦于一个子话题——**数字和货币的格式化**。

下面来看三个欧元区国家、美国和印度的格式差异：

- `€1,234,567.89` 爱尔兰 🇮🇪
- `1.234.567,89 €` 德国 🇩🇪
- `1 234 567,89 €` 法国 🇫🇷
- `$1,234,567.89` 美国 🇺🇸
- `₹12,34,567.89` 印度 🇮🇳

一团乱！对吧？符号、空格和标点到处乱飞！欧盟竟然还能就这些达成一致，真是让人哭笑不得 😅

## 关键概念

在给出解决方案之前，先弄清楚“数字是本地的”到底指什么。

### Numbers are Local 🏘️

每个地区（[ISO 3166 中的国家列表](https://en.wikipedia.org/wiki/List_of_ISO_3166_country_codes)）都有自己的数字格式规则。

数字格式规则包括：

- 小数分隔符：逗号、句点。
- 千位分隔符：逗号、句点、空格。
- 货币符号的位置与间距。

### Currency is Global 🌎

`currency` 指的是一种特定的货币单位。（参见 [ISO 4217](https://en.wikipedia.org/wiki/ISO_4217#Active_codes_(list_one)) 获取列表。）

- 定义符号：`$`、`€`、`£`、`¥`（常被复用）。
- 必有 3 字母代码：`USD`、`EUR`、`GBP`、`JPY`。
- 理论上可以在 **任何** 国家使用/兑换。
- 货币之间的转换需要汇率数据。
- 其价值不随本地而改变。

### When Locale Matters

大多数电子商务/支付 REST API 只处理 `price` + `currencyCode`。为什么没有本地化（locale）？

本地化通常在操作系统/设备层面设置，浏览器通过 `navigator.language` 将其暴露。由于每个用户的本地化可能都不同，最合理的做法就是在客户端完成数字和货币的格式化。

## 解决方案

好消息！现代编程语言已经内置了对这类需求的支持。以 JavaScript 为例，提供了 [`Intl`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl) 类以及 `Intl.NumberFormat`！

下面看看代码示例：

```javascript
const number = 1_234_567.89;

/**
 * Format a number in local currency.
 * @param {number} amount - The amount to format.
 * @param {string} currency - The 3-letter currency code.
 * @param {string} [locale] - The users locale string.
 */
const formatMoney = (amount, currency, locale = navigator.language) =>
  new Intl.NumberFormat(locale, { currency, style: 'currency' })
    .format(amount);

console.log('🇩🇪 ' + formatMoney(number, 'EUR', 'de-DE'));
console.log('🇮🇪 ' + formatMoney(number, 'EUR', 'ga-IE'));
console.log('🇫🇷 ' + formatMoney(number, 'EUR', 'fr-FR'));
```

如果需要更高级的功能，例如计算税额、应用折扣或在不同货币之间转换，建议使用像 [dinero.js](https://v2.dinerojs.com/) 这样的库。

## 后续步骤

根据具体需求，你可能需要进一步了解以下概念：

- 用户本地化的最佳实践。检测并允许覆盖（例如提供国家下拉框）。
- 持久化整数值（存储分（cents），而不是美元）。
- 金额运算（例如应用 `20% off` 优惠券、计算 `subTotal + taxes` 等）。
- 实时汇率（零售购买、外汇/货币兑换场景）。

<p class="breakout quote">如果你希望看到关于这些主题的后续文章，请告诉我！</p>

{/* ## 推荐

一些库可以帮助完成上述任务：

**JavaScript / TypeScript**

- [dinero.js](https://v2.dinerojs.com/) 支持金额运算、汇率、格式化以及解析！

**Rust**

- [rusty_money](https://crates.io/crates/rusty_money) 是我首选的 Rust 库。

**Go**

- [currency](https://github.com/bojanz/currency) 是我当前在 Golang 中使用的方案。
 */}
````
