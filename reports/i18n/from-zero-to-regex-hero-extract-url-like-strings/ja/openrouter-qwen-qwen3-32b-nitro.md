# Translation Candidate
- Slug: from-zero-to-regex-hero-extract-url-like-strings
- Locale: ja
- Model: openrouter/qwen/qwen3-32b:nitro
- Target: src/content/posts/2024-12-29--from-zero-to-regex-hero-extract-url-like-strings/ja/index.mdx
- Validation: passed
- Runtime seconds: 20.76
- Input tokens: 10744
- Output tokens: 8724
- Thinking tokens: unknown
- Cached input tokens: 2048
- Cache write tokens: 0
- Estimated cost: $0.002953
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
title: ''
subTitle: ''
category: Regex
subCategory: Data Extraction
date: '2024-12-29'
modified: '2025-01-06'
tags:
  - regex
  - url
  - data-extraction
  - data-processing
social_image: ../desktop-social.webp
cover_full_width: ../regex-url-parsing-wide.webp
cover_mobile: ../regex-url-parsing-square-200.webp
cover_icon: ../regex-url-parsing-square-200.webp
---
import { CodeTabs } from '../../../../../components/CodeTabs';

**目次**

- 🚀 [導入](#-introduction)
- 🔍 [テキストからのURL抽出](#-extracting-urls-from-text)
- 🛳️ [120バイト以上の正規表現](#-the-120-byte-regex)
- 🧩 [ステップバイステップで分解](#-breaking-it-down-step-by-step)
- 🛠️ [パース例](#-pa)
- ☑️ [次のステップ](#-next-steps)
- 📝 [要約](#-summary)
- 📚 [さらなる学習](#-further-learning)

**要約:** [120バイト以上の正規表現](#-the-120-byte-regex)に直接飛ぶ。

## 🚀 導入

生のテキストからURLを抽出する作業は、ときどき面倒な「ウッカリモグラ叩き」のようなゲームに感じられるかもしれません。句読点、括弧付きのラッパー、曖昧なフォーマットがすべて、あなたの作業を妨害する陰謀を進めてきます。ウェブスクレイパー、データアナライザ、チャットアプリケーションを構築している場合でも、URLを正確に抽出することは不可欠です。

この投稿では、柔軟な二段階アプローチを用いてこの問題に直接取り組みます。**まず、すべての_可能性のある_ URLに似た文字列をキャプチャし**、その後で検証を別工程で処理します。

> 💡 **注意:** このパターンはURLの**_検証_**には使いません！句読点やスペルミスに対して意図的に緩やかな設計になっています。

## 🔍 目標: テキストからURLを抽出

生のテキストからURLを抽出する際、二段階アプローチが有効です:

1. **URLに似たすべてをキャプチャ**: 幅広いネットを張って、URLになり得るすべての文字列を捕獲します。これが「120バイト以上のレグエクス」の得意分野です。
2. **検証**: これらの候補をキャプチャした後、2次チェック（例: DNS解決、既知のドメインとの比較）を用いて無効なエントリを除外します。

### 課題の可視化

`extract`（抽出）と`parse`（解析）という用語はしばしば同義として使われますが、これらは異なるプロセスを指しています。URL抽出は、大きなテキストから潜在的なURLを識別・キャプチャすることを指します。一方、解析は、これらのURLを構成要素に分解することを意味します。

私が「解析」や「URLの構成要素」と言った場合、以下のコンポーネントを指しています:

<figure>
  <figcaption>すべてのURLの5つの構成要素</figcaption>
![URLの構造を視覚化](../WhatUrlsAreMadeOf-ColorMatched.svg "URL anatomy, visualized")
</figure>

<details class="inset breakout">
  <summary>レグエクス101の部分文字列マッチングのスクリーンショットを表示する</summary>

  レグエクスの詳細に入る前に、まず視覚ツールを使ってパターンがどれだけ多くのマッチをキャプチャできるか確認しましょう:

  <figure>
    <figcaption>[レグエクス101.com](https://regex101.com/r/jO8bC4/69) を使って複数行のマッチを視覚化</figcaption>
    ![バッチの複数行マッチのプレビュー](../RegEx101-Matches-Screenshot.webp "Preview 'bulk' multi-line results")
  </figure>
</details>

## 120バイト超のレグエクス

以下は、抽出と解析を一度に実行するための簡潔なレグエクスです。このパターンは、さまざまなプロトコル、ドメイン、パス、およびオプションのクエリ/フラグメントセクションをサポートします。

心配しないでください—順を追って詳しく説明します！

```js title="120+ Byte URL Regex" frame="code"
const urlRegex = /([-.a-z0-9]+:\/{1,3})([^-\/\.[\](|)\s?][^`\/\s\]?]+)([-_a-z0-9!@$%^&*()=+;/~\.]*)[?]?([^#\s`?]*)[#]?([^#\s'"`\.,!]*)/gi;
// Compatibility: ES5+

// Same pattern, split on newlines for readability:
([-.a-z0-9]+:\/{1,3})
([^-\/\.[\](|)\s?][^`\/\s\]?]+)
([-_a-z0-9!@$%^&*()=+;/~\.]*)
[?]?([^#\s`?]*)
[#]?([^#\s'"`\.,!]*)

```

<blockquote class="inset">下のコメントで、出会った（または自分で作成した）最も驚くべきレグエクスを共有してください！🚀</blockquote>

## 🧩 順を追って分解してみましょう

レグエクスを構成要素に分解して、その動作を理解しましょう：

<h3>1. プロトコル（グループ1）: <code>{`([-.a-z0-9]+:\/{1,3})`}</code></h3>

<ul>
  <li>**目的:** URLのプロトコル部分（例: `http://`、`ftp://`、`custom-scheme://`）を一致させます。</li>
  <li>
    **説明:**
    <ul>
      <li><code>[-.a-z0-9]+</code>: プロトコルスキームで一般的な1文字以上の小文字、数字、ハイフン、またはピリオドを一致させます。</li>
      <li><code>{`:\/{1,3}`}</code>: コロンに続く1〜3つのスラッシュ（<code>:/</code>、<code>://</code>、または<code>:///</code>）を一致させます。</li>
    </ul>
  </li>
</ul>

<h3>2. ドメイン（グループ2）: <code>{`([^-\/\.[\](|)\s?][^\`\/\s\]?]+)`}</code></h3>

<ul>
  <li>**目的:** URLのドメインまたはホスト部分をキャプチャします。</li>
  <li>
    **説明:**
    <ul>
      <li><code>[^-\/\.[\](|)\s?]</code>: 指定された特殊文字やホワイトスペース以外の任意の文字を一致させます。</li>
      <li><code>[^`\/\s\]?]+</code>: バッククォート、スラッシュ、ホワイトスペース、または閉じ角括弧以外の1文字以上の文字を一致させます。</li>
    </ul>
  </li>
</ul>

<h3>3. パス（グループ3）: <code>{`([-_a-z0-9!@$%^&*()=+;/~\\.]*)`}</code></h3>

<ul>
  <li>**目的:** URLのパスコンポーネントを一致させます。</li>
  <li>
    **説明:**
    <ul>
      <li><code>[-_a-z0-9!@$%^&*()=+;/~\.]*</code>: パスに一般的に見られるURL安全な文字を0文字以上一致させます。</li>
    </ul>
  </li>
</ul>

<h3>4. クエリ（グループ4）: <code>[?]?([^#\s`?]*)</code></h3>

<ul>
  <li>**目的:** <code>?</code>文字で始まるクエリ文字列をオプションで一致させます。</li>
  <li>
    **説明:**
    <ul>
      <li><code>[?]?</code>: <code>?</code>をオプションで一致させます。（角括弧は厳密には必要ありませんが、極端に短い<code>??</code>よりもやや明確です。また、次の類似グループ<code>[#]?</code>との視覚的な並列性を提供します。）</li>
      <li><code>([^#\s`?]*)</code>: ハッシュ、ホワイトスペース、バッククォート、または疑問符でない0文字以上の文字を一致させます。</li>
    </ul>
  </li>
</ul>

<h3>5. フラグメント（グループ5）: <code>[#]?([^#\s'"`\.,!]*)</code></h3>

<ul>
  <li>**目的:** <code>#</code>で始まるフラグメント識別子をオプションで一致させます。</li>
  <li>
    **説明:**
    <ul>
      <li><code>[#]?</code>: <code>#</code>をオプションで一致させます。</li>
      <li><code>([^#\s'"`\.,!]*)</code>: 禁止された句読点やホワイトスペースでない0文字以上の文字を一致させます。</li>
    </ul>
  </li>
</ul>

## 🛠️ パース例

これは、この巨大なレギュラーエクスプレッションをJavaScriptを使って実際に動かす方法です：

<CodeTabs client:only
 tabs={[
    "コード: URLの抽出",
    "結果: 抽出されたURL",
    "結果: URLの構成要素",
  ]} >
```js title="extract-urls.js" frame="code"
const text = `
Check this out: https://example.com/path?query=123#section
And also (ftp://files.server.org/index).
Plus a weird one: custom-scheme://host/param;weird^stuff
`;

const urlRegex =
  /([-.a-z0-9]+:\/{1,3})([^-\/\.[\](|)\s?][^`\/\s\]?]+)([-_a-z0-9!@$%^&*()=+;/~\.]*)[?]?([^#\s`?]*)[#]?([^#\s'"`\.,!]*)/gi;

const matches = [
  ...text.matchAll(urlRegex),
].map((match) => match[0]);
console.log("Extracted URLs:", matches);

const parts = [
  ...text.matchAll(urlRegex),
].map((match) => match.slice(1));
console.log("Extracted Parts:", parts);
```

```json title="extracted-urls.json"
[
  "https://example.com/path?query=123#section",
  "ftp://files.server.org/index",
  "custom-scheme://host/param;weird^stuff"
]
```

```json title="urls-parts.json"
[
  [
    "https://",    // Protocol
    "example.com", // Domain
    "/path",       // Path
    "query=123",   // Query
    "section"      // Fragment
  ],
  [
    "ftp://",           // Protocol
    "files.server.org", // Domain
    "/index",           // Path
    "",                 // Query
    ""                  // Fragment
  ],
  [
    "custom-scheme://",   // Protocol
    "host",               // Domain
    "/param;weird^stuff", // Path
    "",                   // Query
    ""                    // Fragment
  ]
]
```

</CodeTabs>

## ☑️ 次のステップ

使用ケースによっては、このレギュラーエクスプレッションを精査したり、追加の検証や後処理ステップを追加する必要があるかもしれません。

### 違うプロジェクト、違う要件

プロジェクトには多様な要件とセキュリティ上の懸念があります：

1. **Webスクレイピング**: URLが到達可能で信頼できるか確認する。
2. **データ処理**: ユーザー生成コンテンツからURLを抽出しながら安全性を確保する。
3. **データ分析**: 研究やマーケティング目的で重複や関係のないリンクをフィルタリングする。
4. **ユーザー向けアプリケーション**: チャットアプリやフォーラムでURLを自動的にハイパーリンク化する。

### 後処理と検証

潜在的なURLを収集した後は、追加のチェックを実施する：

- **DNSルックアップ**: ドメインが解決可能か確認する。
- **安全性の確認**: 悪意のあるサイトやフィッシングサイトを検出するサービスを利用する。
- **カスタムルール**: プロジェクト固有のフィルタを適用する（例: 許可されたTLD、最大URL長）。

## 📝 要点

セミ構造化された文字列データの抽出は、レギュラーエクスプレッションのマスターで最も満足感のある部分かもしれません。

ここに、重要なポイントのまとめを示します：

- **視覚的なツールを利用して、[Regexパターン](https://regex101.com/r/jO8bC4/69)を書いたりテストしたり理解しましょう。**
- **課題を部分に分解し、それぞれを個別に解決します。** キャプチャグループは、正規表現のための比喩的な『道しるべ』を提供します。
- **データのインジェクションでは、緩やかなマッチ式を使用し、厳格な仕様適合を避けてください。**
- **初期抽出後の** **検証ステップの適用は不可欠です**—プロジェクトのセキュリティと特定の要件を常に考慮してください。

これらの手順に従うことで、半構造化された文字列データを効果的に抽出し、さらに処理や検証のための基盤を築くことができます。

## 📚 補足学習

- [RegEx101.comでライブデモ](https://regex101.com/r/jO8bC4/69)を試してみてください！
- 元のStackOverflowの質問と、[私の回答へのリンク](https://stackoverflow.com/a/34669019/369727)。
- [MDNの正規表現ドキュメント](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions)
- [高度な正規表現テクニック](https://www.regular-expressions.info): 先行一致や後方一致、その他の高度なパターンを学んで、より正確なマッチングを行います。
- [RFC 3986 - URI汎用構文](https://datatracker.ietf.org/doc/html/rfc3986)
````
