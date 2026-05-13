# Translation Candidate
- Slug: love-computer-languages
- Locale: ja
- Model: openrouter/qwen/qwen3-32b:nitro
- Target: src/content/posts/2015-06-12--love-computer-languages/ja/index.mdx
- Validation: passed
- Runtime seconds: 16.02
- Input tokens: 6972
- Output tokens: 6045
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- Estimated cost: $0.002009
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
title: コンピュータ言語への愛
date: '2015-06-12'
modified: '2017-02-28'
category: Code
subCategory: languages
draft: true
hidden: true
publish: true
tags:
  - programming
  - languages
  - lua
  - haskell
  - scala
  - rust
  - smalltalk
  - go
  - javascript
  - python
cover: ../rawpixel-602144-unsplash.webp
cover_mobile: ../w300_rawpixel-602144-unsplash.webp
cover_icon: ../icon_rawpixel-602144-unsplash.webp
---
import Gist from '../../../../../components/Gist/index.astro'

## プログラミング言語に関するメモ

#### 私の雑多な観察はきっと誰かが既に述べたことと思いますが、以下が最も興味深い言語のリストです：

### JavaScript

私の「唯一の真の愛」。圧倒的な汎用性と無限の可能性を備えた、総合力が抜群で驚くほど強力なチャンピオンです！
GitHub.comで何年もわたって最もアクティブで人気のある言語第1位を維持しています。

認めたくないですが、何年もの間私は今では**最も好きな言語**であるこの言語に対して、ただ軽蔑と嘲笑しか持っていなかったことに気づきました。

**ES6** は私の愛をさらに深めました。純粋な ES5 は心に特別な場所を常に占めていますが、**ES6** を使用するたびに、放射性のクモの刺咬のような感覚を感じます。

私を**ES6派**に押し込んだ要因は4つあります：

1.  楽しいんです。本気で。美しさ、明確さ、生産性に実質的な向上があります。

- 主観的な主張だ、と？ いくつかの ES6 の例を見てみましょう：
- `let expired = users.filter(u => Date.now() > u.trialDate)`
- 今や `Object.create` や `Object.defineProperty` の使い方を偽装する必要はありません
- 下記の例を参照

1.  2015年7月現在、ES6は公式に確定された標準です！
1.  有効なサポート率は実質100％\*！... ただし、コードをES5互換にするためにBabelJSが必要です。歴史的にJSトランスパイラは否定的に見られていましたが、最近（2014-15年）では状況が変わり、BabelJSは言語進化の鍵となるエネーブラ/ドライバーとなっています。マイクロソフトやフェイスブックを含む多くの企業が、最大規模のサイトで使用しています。
1.  [最新版のNode](https://nodejs.org/en/blog/release/v4.0.0/) はChrome v45と同じV8 JSエンジンを含んでおり、v4.5です

#### 例

> ついに私がES6の「クールエイド」を飲むことを始めた決定的な理由をお見せしましょう。

私の最近の経験では、ES6はコードを書く速度を上げてくれます。その理由は明白で、コードが簡潔になるため、過去のコード（あるいはチームメンバーのコード）を読み解くために必要な脳力が大幅に減少するからです。

KLOC（千行単位）の削減率は定期的に20〜50%に達しており、これはケイト・モス並みの引き締め効果です！

**_欠損画像:_ EcmaScript 5 vs ES 2016 - デモ: クラス、デストラクチャリング、スリック**
{/* ](/images/screenshots/Diff-ES6-vs-ES5-Head-to-Head.png) */}

```js
// /services/users.js
class Users {
  constructor(data) {
    this.users = data || [];
  }
  expired() {
    return this.users.filter(u => Date.now() > u.trialDate);
  }
}
```

- 関数に渡されたフィールドを「抽出」したり「チェック」したりするための面倒なコードが不要になります。`add()`の例を見てみましょう：

```js
// /services/users.js
class Users {
  constructor(data) {
    this.users = data || [];
  }
  add({ name, email, password }) {
    // パスワードのハッシュを保存。明示的に定義する必要があるのは1つの`var/let`だけです。他の変数は上記の`{fields}`の魔法によって定義されています。
    let hash = getSha256(password);
    return http
      .post("/users", {
        name: name,
        email: email,
        passwordHash: hash
      })
      .then(usr => this.users.push(usr)); // サービスの応答後にユーザーを追加
  }
}
```

<Gist path='justsml/aaddc9852c1624d61cf3'></Gist>

#### ES6に乗り換えることは、以下のような感覚に似ています：

<div class="anigif top">
  <img alt='huh' title="Huh?" src="../ddd/image/upload/v1441143891/wtf__tumblr_inline_n7ygqh6Y0C1svcdm1_igeqey.gif" />
</div>
<h3>から</h3>
<div class="anigif">
  <img alt='wtf' title="WTF?!?!" src="../ddd/image/upload/v1443133148/cat-wtf-trap.gif" />
</div>
<h3>へ</h3>
<div class="anigif end">
  <img alt='#winning' title='#winning' src="../ddd/image/upload/v1443133141/full-throttle.gif" />
</div>

新機能を地道に掘り下げてください。文字列テンプレート、自動`this`バインディング、より合理的な継承などの特徴を確認してみましょう...

##### [ノードJS](http://nodejs.org/)

### ルスト

##### [公式サイト](http://www.rust-lang.org/)

- **メリット**

- Cの速度とPython/C++のパワフルさを備えながら、通常は熟練開発者でさえ陥りがちな複雑さ/罠を排除した言語を想像してみてください。
  - 実際、Rustの複雑さはES6仕様とほぼ同等だと推測できます。
  - 以下の豊富な機能が含まれます：
    1. 半動的な構文を**純粋なCコード**にトランスパイルします！
    1. Cで間違いがちな**すべてのベストプラクティス**が自動的に適用されます（私は最終的にいつも間違えますが）。
    - 自動で得られる機能：
    - 自動メモリ管理（遅いガベージコレクターは不要！）
    - 完璧なスコープのオブジェクト所有権/ロック（ミューテックスとコンテキストスイッチの最小化）
    - オブジェクトのライフタイム（自動実装\*、すべてのエッジケースを考慮して自動生成）
    - ほぼすべてのランタイムエラーを防止（本気で、コードパスが明示的になります：コードパスを無視することはできません）
  - さらに、合理的な「マクロ」機能で真の言語拡張性を提供します。
    - コンプリヘンションが必要？[Scalaスタイル？](https://gist.github.com/hanny24/5749688) [Pythonスタイル？](https://gist.github.com/JeffBelgum/5e762761cd63c796e803) どちらも可能です。
    1. あまりにも良く感じられる？いや、もっと良いことがあります：
    - 最新の指標（github.comの統計）では、RustはGo（Googleの新興言語）と競合し、場合によっては上回っています。
      - スター数はGoより約4,000多い（現在12,200程度）
      - コントリビュータ総数は2倍（1,071 vs. Goの479）
      - フォーク数は3倍（2,343 vs. 765）
      - 開いているIssue数は僅差で負け（2,000 vs. Goの1,730）
      - プルリクエスト数（Rust 70+ vs. Goの1）
    - 私もその数値を3回確認しました。
  - Rustの構造とルールにより、他のライブラリは非常に安定しています。
  - 普通の人が扱えるスレッドモデル

- **デメリット**
  - 良質な**Webフレームワーク**は比較的新しく、未検証でドキュメントが不足しています（ただし2015年3月時点では非常に印象的な進展があります）。
  - 1.0リリース前には多くの破壊的変更があります。

### Python

- **メリット**
  - 既にPythonには圧倒的に網羅的なアルゴリズムが実装されています（例：scikit-learn、numpy、matplotlib、pil/pillowなど）。
  - 書くのが非常に楽しい！コンプリヘンションと分解機能は素晴らしい機能で、他の言語がただの肥大化に感じられます！
  - 配列、'シーケンス'、タプルなどは比較的単純です。

```python
## dummy code: defines a color + pixel-coord -
def pixel(x, y, r, g, b): return dict(x=x, y=y, r=r, g=g, b=b)
## Create a new pixel object and apply to set of vars
x, y, r, g, b = pixel(10, 20, 255, 255, 255)
## Now we can call pixel
```

- **デメリット**
  - 面倒なことに、Python 2.xと3.xは互換性がありません。何年も経った今も「大分裂」は続いています。
  - 一部の重要なライブラリ（例：numpy）は、一部の開発者にとって必ずしも理解しやすいものではありません。

### Haskell

- **メリット**
  - 最終的に十分な構文を覚えてから、コンプリヘンションベースの表現パターンを素早く作成できるようになると非常に報酬が大きいです。
  - 頭の使い方が複雑なコードパターンを学ぶことになります。これらは他の言語にもある程度適用可能です。
- **デメリット**
  - 構文やパターンが使い慣れるまで難しいです。

<div class="anigif end">
  <img alt='endless loop' src="https://res.cloudinary.com/ddd/image/upload/v1441143881/endless-loop.gif" />
</div>

### SmallTalk-80

- **メリット**
  - 信じられないほど単純なコンパイラ（特にオリジナル）。
  - 優れたリソース: [Smalltalk MVC Translated to JavaScript](http://peter.michaux.ca/articles/smalltalk-mvc-translated-to-javascript)
- **デメリット**
  - この言語を何かに使うことはおそらくありません。プロジェクト数はゼロです。ただし、他の関数型言語よりも早くコーディングスタイルに大きな影響を与えるでしょう…。これはメリットリストに含めるべきです。

#### 進行中の作業（2015年12月更新）
````
