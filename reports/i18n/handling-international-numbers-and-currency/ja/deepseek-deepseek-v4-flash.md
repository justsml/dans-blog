# Translation Candidate
- Slug: handling-international-numbers-and-currency
- Locale: ja
- Model: deepseek/deepseek-v4-flash
- Target: src/content/posts/2024-08-29--handling-international-numbers-and-currency/ja/index.mdx
- Validation: deferred
- Runtime seconds: 90.41
- Input tokens: 6623
- Output tokens: 5317
- Thinking tokens: unknown
- Cached input tokens: 768
- Cache write tokens: 0
- Estimated cost: $0.002311
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
social_image: ../desktop-social.webp
title: 国際数字と通貨の理解
subTitle: ローカライズされたお金の解説！
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
- [お金：ローカライゼーション（L10n）とインターナショナリゼーション（i18n）](#money-localization-l10n-and-internationalization-i18n)
- [重要な概念](#critical-concepts)
  - [数字はローカル 🏘️](#numbers-are-local-️)
  - [通貨はグローバル 🌎](#currency-is-global-️)
  - [ロケールが重要な場面](#when-locale-matters)
- [解決策](#a-solution)
- [次のステップ](#next-steps)

## お金：ローカライゼーション（L10n）とインターナショナリゼーション（i18n）

スクラブルで勝つためだけにあるわけではありません。_ローカライゼーション_と_インターナショナリゼーション_は、製品を**別の国でも違和感なく使えるようにする**プロセスを指します。

<p class="breakout quote">間違ったローカル形式で通貨を表示すると、努力をしていないことが一目瞭然です。<br/>価格のフォーマットすらできないのに、どうやって配送を処理できるでしょうか？</p>

インターナショナリゼーションは広大なトピックで、テキスト翻訳から日付フォーマットまで多岐にわたります。この記事では、特に**数字と通貨のフォーマット**というサブトピックに焦点を当てます。

ユーロ圏の3カ国、アメリカ、インドの間でのフォーマットの違いを見てみましょう：

- `€1,234,567.89` アイルランド 🇮🇪
- `1.234.567,89 €` ドイツ 🇩🇪
- `1 234 567,89 €` フランス 🇫🇷
- `$1,234,567.89` アメリカ 🇺🇸
- `₹12,34,567.89` インド 🇮🇳

カオスだ！ そうだろう？ 記号、空白、句読点が飛び交っている！ EUが何かで合意できるなんて驚きだ！ 😅

## 重要な概念

解決策に飛び込む前に、「数字はローカル」とはどういう意味かを理解しよう。

### 数字はローカル 🏘️

すべてのロケール（[ISO 3166 による国コード](https://en.wikipedia.org/wiki/List_of_ISO_3166_country_codes)）は、数字のフォーマットに関するルールを定義している。

数値フォーマットのルールには以下が含まれる：

- 小数点：カンマ、ピリオド。
- 桁区切り：カンマ、ピリオド、スペース。
- 通貨記号の位置とスペース。

### 通貨はグローバル 🌎

`currency`（通貨）は特定の貨幣単位を指す。（一覧は[ISO 4217](https://en.wikipedia.org/wiki/ISO_4217#Active_codes_(list_one))を参照。）

- 記号を指定：`$`、`€`、`£`、`¥`。（しばしば再利用される。）
- 常に3文字のコードを持つ：`USD`、`EUR`、`GBP`、`JPY`。
- 「どの」国でも使用・交換可能。理論上は。
- 通貨間の変換には為替レートデータが必要。
- 値はロケールに基づいて変わらない。

### ロケールが重要になる場面

ほとんどのEC・決済系REST APIは `price` + `currencyCode` を扱う。なぜロケールが含まれないのか？

ロケールは（通常）OS/デバイスレベルで設定され、ブラウザは `navigator.language` でそれを利用可能にする。ユーザーごとに異なるロケールを持ちうる以上、数値や通貨のフォーマットはクライアント側で行うのが筋である。

## 解決策

さて、朗報だ。現代のプログラミング言語にはこのための組み込みサポートがある。JavaScript では [`Intl`](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Intl) クラスと `Intl.NumberFormat` が使える！

実際のコードを見てみよう。

```javascript
const number = 1_234_567.89;

/**
 * 数値を現地通貨でフォーマットする。
 * @param {number} amount - フォーマットする金額。
 * @param {string} currency - 3文字の通貨コード。
 * @param {string} [locale] - ユーザーのロケール文字列。
 */
const formatMoney = (amount, currency, locale = navigator.language) =>
  new Intl.NumberFormat(locale, { currency, style: 'currency' })
    .format(amount);

console.log('🇩🇪 ' + formatMoney(number, 'EUR', 'de-DE'));
console.log('🇮🇪 ' + formatMoney(number, 'EUR', 'ga-IE'));
console.log('🇫🇷 ' + formatMoney(number, 'EUR', 'fr-FR'));
```

税金の計算、割引の適用、通貨間の変換など、より高度な処理が必要なら、[dinero.js](https://v2.dinerojs.com/) のようなライブラリを使うとよい。

## 次のステップ

具体的なニーズに応じて、以下の関連概念を掘り下げるとよいでしょう。

- ユーザーロケールのベストプラクティス。自動検出と手動オーバーライド（例：国ドロップダウン）の両方を用意する。
- 整数値での永続化（ドルではなくセント単位で保存する）。
- 金額計算（例：20%オフクーポンの適用、小計＋税の計算など）。
- リアルタイム為替レート（小売購入や外貨両替の場合）。

<p class="breakout quote">これらのトピックに関する今後の記事をご希望でしたら、お知らせください！</p>

{/* ## 推奨ライブラリ

これらのタスクを支援するライブラリもあります：
*/}

**JavaScript / TypeScript**

- [dinero.js](https://v2.dinerojs.com/) は金額計算、為替レート、フォーマット、パースをサポートしています。

**Rust**

- [rusty_money](https://crates.io/crates/rusty_money) は私が好んで使うRustライブラリです。

**Go**

- [currency](https://github.com/bojanz/currency) は現在のGolangでの選択肢です。
*/}
````
