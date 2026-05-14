# Translation Candidate
- Slug: handling-international-numbers-and-currency
- Locale: zh
- Model: openrouter/qwen/qwen3-32b:nitro
- Target: src/content/posts/2024-08-29--handling-international-numbers-and-currency/zh/index.mdx
- Validation: deferred
- Runtime seconds: 7.83
- Input tokens: 3057
- Output tokens: 2650
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- Estimated cost: $0.000881
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
social_image: ../desktop-social.webp
title: 理解国际数字与货币
subTitle: 本地货币解析！
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
- [金钱：本地化 (L10n) 与国际化 (i18n)](#money-localization-l10n-and-internationalization-i18n)
- [关键概念](#critical-concepts)
  - [数字是本地的 🏘️](#numbers-are-local-️)
  - [货币是全球的 🌎](#currency-is-global-️)
  - [何时需要本地化](#when-locale-matters)
- [解决方案](#a-solution)
- [下一步](#next-steps)

## 金钱：本地化 (L10n) 与国际化 (i18n)

它们不仅仅是赢得拼字游戏的工具，_本地化_ 和 _国际化_ 指的是让产品**在不同国家都能如鱼得水**的过程。

<p class="breakout quote">用错误的本地格式展示货币是个明显的破绽：这说明你根本没下功夫。<br/>如果你连价格格式都搞不定，怎么处理物流？</p>

国际化是个庞大的话题，涵盖从文本翻译到日期格式的方方面面。在本文中，我们将聚焦于一个子主题：**数字和货币的格式化**。

让我们看看欧元区三个国家、美国和印度的格式差异：

- `€1,234,567.89` 爱尔兰 🇮🇪
- `1.234.567,89 €` 德国 🇩🇪
- `1 234 567,89 €` 法国 🇫🇷
- `$1,234,567.89` 美国 🇺🇸
- `₹12,34,567.89` 印度 🇮🇳

一团糟，对吧？各种符号、空格和标点到处飞！欧盟居然能就任何事达成一致真是奇迹！😅

## 关键概念

在深入解决方案之前，我们先明确“数字是本地的”是什么意思。

### 数字是本地的 🏘️

每个本地（[ISO 3166 国家代码](https://en.wikipedia.org/wiki/List_of_ISO_3166_country_codes)）都定义了数字格式的规则。

数字格式规则包括：

- 小数点：逗号、句点。
- 千位分隔符：逗号、句点、空格。
- 货币符号的位置和间距。

### 货币是全球的 🌎

`货币` 指的是特定的货币单位。（详见 [ISO 4217](https://en.wikipedia.org/wiki/ISO_4217#Active_codes_(list_one))）

- 定义符号：`$`、`€`、`£`、`¥`（通常复用）。
- 始终使用三位字母代码：`USD`、`EUR`、`GBP`、`JPY`。
- 理论上可在“任何”国家使用/兑换。
- 货币兑换需要汇率数据。
- 货币价值不会因本地而改变。

### 何时需要本地化

大多数电商/支付REST API处理的是`价格` + `货币代码`。为什么没有本地化？

本地化通常是在操作系统/设备级别设置的，浏览器通过`navigator.language`提供该信息。由于每位用户的本地化设置可能不同，因此在客户端格式化数字和货币是合理的。

## 解决方案

好消息！现代编程语言内置了对此的支持。在JavaScript中，我们有[`Intl`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl)类和`Intl.NumberFormat`！

来看一些代码示例：

```javascript
const number = 1_234_567.89;

/**
 * 以本地货币格式化数字。
 * @param {number} amount - 要格式化的金额。
 * @param {string} currency - 三位字母的货币代码。
 * @param {string} [locale] - 用户的本地化字符串。
 */
const formatMoney = (amount, currency, locale = navigator.language) =>
  new Intl.NumberFormat(locale, { currency, style: 'currency' })
    .format(amount);

console.log('🇩🇪 ' + formatMoney(number, 'EUR', 'de-DE'));
console.log('🇮🇪 ' + formatMoney(number, 'EUR', 'ga-IE'));
console.log('🇫🇷 ' + formatMoney(number, 'EUR', 'fr-FR'));
```

如果需要执行更复杂的操作（如计算税费、应用折扣或货币兑换），建议使用库如[dinero.js](https://v2.dinerojs.com/)。

## 下一步

根据具体需求，可以探索以下相关概念：

- 用户本地化的最佳实践。检测+允许覆盖（例如国家下拉菜单）。
- 存储整数（存储分，而非美元）。
- 货币计算（例如应用`20% off`优惠券、计算`小计+税费`等）。
- 实时汇率（针对零售购买、外汇/货币兑换）。

<p class="breakout quote">如果希望看到关于这些主题的后续文章，请告诉我！</p>

{/* ## 推荐

以下库可以帮助完成这些任务：

**JavaScript / TypeScript**

- [dinero.js](https://v2.dinerojs.com/) 支持货币计算、汇率、格式化和解析！

**Rust**

- [rusty_money](https://crates.io/crates/rusty_money) 是我首选的Rust库。

**Go**

- [currency](https://github.com/bojanz/currency) 是我目前的Golang选择。
 */}
````
