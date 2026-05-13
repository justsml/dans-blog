# Translation Candidate
- Slug: handling-international-numbers-and-currency
- Locale: ja
- Model: openrouter/qwen/qwen3-32b:nitro
- Target: src/content/posts/2024-08-29--handling-international-numbers-and-currency/ja/index.mdx
- Validation: rejected: direct AI SDK translation failed
- Runtime seconds: 12.07
- Input tokens: 6285
- Output tokens: 5118
- Thinking tokens: unknown
- Cached input tokens: 1536
- Cache write tokens: 0
- Estimated cost: $0.001731
- Pricing source: local-openrouter-estimate
- Note: Command failed: git add src/content/posts/2024-08-29--handling-international-numbers-and-currency/ja/index.mdx reports/i18n/handling-international-numbers-and-currency/ja
## Raw Output

````mdx
---
social_image: ../desktop-social.webp
title: 国際的な数値と通貨の解説
subTitle: ''
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
- [通貨：ローカリゼーション (L10n) と国際化 (i18n)](#money-localization-l10n-and-internationalization-i18n)
- [重要な概念](#critical-concepts)
  - [数字はローカルである 🏘️](#numbers-are-local-️)
  - [通貨はグローバルである 🌎](#currency-is-global-️)
  - [ロケールが重要な場面](#when-locale-matters)
- [解決策](#a-solution)
- [次のステップ](#next-steps)

## 通貨：ローカリゼーション (L10n) と国際化 (i18n)

Scrabbleの勝利を狙うためだけのものではない。_ローカリゼーション_ と _国際化_ は、製品が**別の国で「自宅にいる」ように感じさせる**プロセスを指す。

<p class="breakout quote">ローカル形式に沿っていない通貨表示は、明らかに手を抜いている証拠だ。<br/>価格すらフォーマットできないのなら、配送をどう扱う？</p>

国際化はテキスト翻訳から日付フォーマットまで、幅広いトピックである。この記事では特に**数字と通貨のフォーマット**に焦点を当てる。

ヨーロッパ通貨圏の3か国、アメリカ、インドにおけるフォーマットを見てみよう：

- `€1,234,567.89` アイルランド 🇮🇪  
- `1.234.567,89 €` ドイツ 🇩🇪  
- `1 234 567,89 €` フランス 🇫🇷  
- `$1,234,567.89` アメリカ合衆国 🇺🇸  
- `₹12,34,567.89` インド 🇮🇳  

混乱していますね？記号や空白、句読点が飛び交っています！EUが何かで合意できるのが不思議なくらいです 😅  

## 重要な概念  

解決策に移る前に、「数字はローカルである」という意味を明確にしましょう。  

### 数字はローカル 🏘️  
各ロケール（[ISO 3166の国コード](https://en.wikipedia.org/wiki/List_of_ISO_3166_country_codes)）は、数字のフォーマットに関するルールを定義しています。

数値のフォーマットルールには以下が含まれます:  

- 小数点: コンマ、ピリオド。  
- 千の位の区切り: コンマ、ピリオド、スペース。  
- 通貨記号の位置とスペース。  

### 通貨はグローバル 🌎  

`currency`（通貨）とは、特定の通貨単位を指します。（[ISO 4217](https://en.wikipedia.org/wiki/ISO_4217#Active_codes_(list_one)) で有効なコード一覧を参照）  

- 通貨記号を指定します: `$`、`€`、`£`、`¥`。（再利用されることもあります。）  
- 常に3文字のコードを持ちます: `USD`、`EUR`、`GBP`、`JPY`。  
- 理論上は「どの」国でも利用・交換可能です。  
- 通貨間の変換には為替レートデータが必要です。  
- 値はロケールに依存しません。  

### ロケールが重要な場合

ほとんどのEC/決済用のREST APIは`price` + `currencyCode`で処理を行います。なぜロケールは使われないのでしょうか？

ロケールは（通常）OS/デバイスレベルで設定され、ブラウザは`navigator.language`経由でこれを提供します。すべてのユーザーが異なるロケールを持つ可能性があるため、数値や通貨の書式設定はクライアントサイドで行うのが理にかなっています。

## 解決策

よろしいニュースです！現代のプログラミング言語はこれをサポートしています。JavaScriptでは[`Intl`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl)クラスと`Intl.NumberFormat`が利用可能です！

コードを見てみましょう：

```javascript
const number = 1_234_567.89;

/**
 * 現地通貨で数値を書式設定します。
 * @param {number} amount - 書式設定する金額。
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

税金の計算や割引の適用、通貨間の変換など、より複雑な処理が必要な場合は、[dinero.js](https://v2.dinerojs.com/)などのライブラリを使用することをお勧めします。

## 次のステップ

特定のニーズに応じて、関連する概念を掘り下げることを検討してください:

- ユーザーのロケールに関するベストプラクティス。検出 + 上書きを許可する。（例: 国のドロップダウン）
- 整数の永続化（ドルではなくセントを保存）
- マネー計算（例: 20%オフのクーポン適用、小計+税額計算など）
- ライブ為替レート（小売購入、外為/通貨交換用）

<p class="breakout quote">これらのトピックに関する今後の記事をご希望でしたら、お知らせください！</p>

{/* ## 推奨事項

これらのタスクを支援するライブラリもあります: */}

**JavaScript / TypeScript**

- [dinero.js](https://v2.dinerojs.com/) はマネー計算、為替レート、フォーマット、パースをサポートします！

**Rust**

- [rusty_money](https://crates.io/crates/rusty_money) は私のおすすめのRustライブラリです。

**Go**

- [currency](https://github.com/bojanz/currency) は現在のGolangでの選択肢です。
 */}
````
