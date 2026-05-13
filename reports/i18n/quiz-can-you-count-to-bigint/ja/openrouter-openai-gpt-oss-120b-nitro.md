# Translation Candidate
- Slug: quiz-can-you-count-to-bigint
- Locale: ja
- Model: openrouter/openai/gpt-oss-120b:nitro
- Target: src/content/posts/2024-11-06--quiz-can-you-count-to-bigint/ja/index.mdx
- Validation: rejected: direct AI SDK translation failed
- Runtime seconds: 11.50
- Input tokens: 13306
- Output tokens: 8606
- Thinking tokens: unknown
- Cached input tokens: 5888
- Cache write tokens: 0
- Estimated cost: $0.002068
- Pricing source: local-openrouter-estimate
- Note: Command failed: git add src/content/posts/2024-11-06--quiz-can-you-count-to-bigint/ja/index.mdx reports/i18n/quiz-can-you-count-to-bigint/ja
## Raw Output

````mdx
---
unlisted: false
title: 'クイズ: JavaScriptで数えることはできますか？'
subTitle: '`parseInt` と `parseFloat` の違い、わかってますか？'
label: Numbers
date: '2024-10-31'
modified: '2024-11-09'
social_image: ../desktop-social.webp
category: Quiz
subCategory: JavaScript
tags:
  - quiz
  - data-structures
  - algorithms
cover: ../victor-freitas-hOuJYX2K5DA-unsplash-square.webp
cover_full_width: ../victor-freitas-hOuJYX2K5DA-unsplash-wide.webp
cover_mobile: ../victor-freitas-hOuJYX2K5DA-unsplash-square.webp
cover_icon: ../victor-freitas-hOuJYX2K5DA-unsplash-square.webp
---
このクイズは JavaScript の数値変換関数に関する知識を評価します。受験者は各関数の挙動、エッジケース、適切な使用方法を区別できるかが問われます。難易度は中程度で、比較や一般的な落とし穴を案内する指導的なトーンで構成されています。重点は、文字列から数値へのパース、型変換、数値リテラルの取り扱いに関する実践的な理解です。

対象トピック: JavaScript の `parseInt`、`parseFloat`、`Number` コンストラクタ、`BigInt`、基数（radix）引数、2 進・8 進・16 進リテラル、空白文字の処理、数値変換におけるエラー処理  
対象読者: JavaScript を学習中の開発者や学生、特に面接対策や数値型変換の理解を深めたい人向け

```javascript
import Challenge from '../../../../../components/QuizUI/Challenge';
import QuizUI from '../../../../../components/QuizUI/QuizUI';
```

<QuizUI>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={0}
  group="ウォームアップ"
  title="`parseInt`でのパース"
  options={[
    {text: '123456', isAnswer: true},
    {text: '123'},
    {text: '12345600'},
    {text: '456.00'},
    {text: 'Error'},
    {text: 'NaN'},
  ]}
>
  <slot name="question">
  <div className="question">
    ```tsx
        parseInt(" 123456.00")
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    `parseInt` 関数は空白を無視し、最初の数字列を整数として解析します。ここでは小数点で止まるので、`123456` のみが返されます。
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={1}
  group="パース"
  title="カンマの扱い"
  options={[
    {text: '123', isAnswer: true},
    {text: '12345600'},
    {text: '123456.00'},
    {text: '456.00'},
    {text: 'エラー'},
  ]}
>
  <slot name="question">
  <div className="question">
    ```tsx
        parseInt("123,456.00")
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    一般的に、`parseInt` は数値でない文字に遭遇すると解析を停止します。ここではカンマで止まるので、`123` だけが返されます。
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={2}
  group="数学"
  title="浮動小数点の精度"
  options={[
    {text: '0.1 + 0.2 === 0.3'},
    {text: 'false', isAnswer: true},
    {text: 'true'},
    {text: 'NaN'},
  ]}
>
  <slot name="question">
  <div className="question">
    ```tsx
        0.1 + 0.2 === 0.3
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    浮動小数点の精度誤差のため、`0.1 + 0.2` は `0.3` と正確には等しくありません。浮動小数点数がメモリに格納される方式のせいで、結果は `0.30000000000000004` になります。IEEE 754 標準が原因で、いくつかの数値を正確に表現できません。これはすべてのプログラミング言語で共通の問題です。最終的に無限に続く小数に直面し、言語に関係なくコンピュータは無限に続く桁を追い続けるのをやめるしかありません。

    Python や Java などの言語には `Decimal` や `BigDecimal` があり、この問題に対処できますが、JavaScript には組み込まれていません。`big.js` や `decimal.js` といったライブラリを使って対処できます。

    （注：一部の言語は分数や虚数などをより高い論理レベルで扱うよう設計されていますが、ハードウェアレベルの浮動小数点精度問題からは逃れられません。）
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={3}
  group="オーバーフローする数"
  title="Infinity の扱い"
  options={[
    {text: 'Infinity', isAnswer: true},
    {text: 'NaN'},
    {text: 'Error'},
    {text: 'undefined'},
  ]}
>
  <slot name="question">
  <div className="question">
    ```tsx
        Number.MAX_VALUE * 2
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    JavaScript で表現可能な最大の **表現可能な** 通常数は `Number.MAX_VALUE` です。その上限を超えるとすぐにオーバーフローし、意味のない結果になることがあります。`2` を掛けると `Infinity` になります。

    *JavaScript は時々そういうものです。*
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={4}
  group="フォーマット"
  title="`.toFixed()` を使った文字列変換"
  options={[
    {text: 'TypeError'},
    {text: 'SyntaxError'},
    {text: '"5"'},
    {text: '5'},
    {text: '"5.00"', isAnswer: true},
    {text: '5.0'},
  ]}
>
  <slot name="question">
  <div className="question">
    これは何をする可能性がありますか？
    ```tsx
        5..toFixed(2)
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    `.toFixed(2)` は `5` を小数点以下2桁の文字列に変換し、結果は `"5.00"` になる。

    二重ドット (`5..toFixed(2)`) は Number リテラルのオブジェクトモデルにアクセスするための「トリック」です。
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={5}
  group="型の比較"
  title="`parseInt` と `parseFloat` の等価比較"
  options={[
    {text: 'true', isAnswer: true},
    {text: 'false'},
    {text: 'NaN'},
  ]}
>
  <slot name="question">
  <div className="question">
    ```jsx
        parseInt("42") === parseFloat("42")
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    JavaScript では、`parseInt` と `parseFloat` は文字列 `"42"` を数値 42 として解釈します。したがって比較 `parseInt("42") === parseFloat("42")` は `true` になります。`parseInt` は最初の非数字文字で解析を止めますが、`parseFloat` は浮動小数点数の一部でない文字が出るまで解析を続けます。しかし `"42"` には小数点や他の非数値文字がないので、両関数とも同じ値を返します。
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={6}
  group="等価比較"
  title="BigIntによる等価比較"
  options={[
    {text: 'TypeError'},
    {text: 'true'},
    {text: 'false', isAnswer: true},
    {text: 'NaN'},
  ]}
>
  <slot name="question">
  <div className="question">
    ```jsx
        BigInt("42") === parseInt("42")
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    [`BigInt`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt) は `number` とは異なる型なので、`parseInt("42")`（通常の数値）は `BigInt("42")` と厳密に等しくありません。比較するには、両方を同じ型に変換する必要があります: `BigInt(parseInt("42")) === BigInt("42")`.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={7}
  group="ベース"
  title="16進数パース"
  options={[
    {text: 'true', isAnswer: true},
    {text: 'false'},
    {text: 'NaN'},
    {text: '大文字である必要があります: 2A'},
    {text: 'エラー'},
  ]}
>
  <slot name="question">
  <div className="question">
    結果はどうなるでしょうか？
    ```jsx
        parseInt("0x2A") === parseInt("2a", 16)
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    先頭が `0x` で始まる文字列は自動的に16進数（基数 `16`）として扱われます。
    したがって基数16を渡すのと同じです。つまり、`parseInt("0x2A")` は `parseInt("2a", 16)` と同等です。（大文字小文字は区別しません。）
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={8}
  group="ベース"
  title="基数でのパース"
  options={[
    {text: '255', isAnswer: true},
    {text: '0'},
    {text: '16'},
    {text: '0.16'},
  ]}
>
  <slot name="question">
  <div className="question">
    ここは何が起きているの？
    ```jsx
        parseInt('0xFF', 16)
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    `parseInt` を 16 進数（`16`）の基数で使用すると、`"FF"` を十進数の `255` に変換します。CSS の RGB/Hex カラーコードで見たことがあるかもしれません。
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={9}
  group="Number[]"
  title="`.map(parseInt)` を使う"
  options={[
    {text: '[24, NaN, NaN]', isAnswer: true},
    {text: '[24, NaN, 42]'},
    {text: '[24, 42]'},
    {text: 'NaN'},
  ]}
>
  <slot name="question">
  <div className="question">
    ```jsx
        [24, 'One', 42].map(parseInt)
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    `parseInt` の第2引数（基数）は配列メソッドの `index` 引数と一致します。これにより予期せぬ結果になり、`parseInt("One", 1)` は無効な入力のため `NaN` を返します。

    最初の要素 `24` は基数 0（自動検出）で `24` と解析され、そのまま `24` です。2番目の要素 `'One'` は基数 1 で解析され `NaN` になります。3番目の要素 `42` は基数 2 で解析されますが、基数 2 では `'42'` は `NaN` になるので結果は `[24, NaN, NaN]` です。

    これは `parseInt` と `map` の典型的な落とし穴です。文字列の配列を数値に変換したい場合、安全な「組み込み」メソッドは `.map(Number)` か、`.map(x => parseInt(x, 10))` のようにコールバックでラップする方法だけです。
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={10}
  group="Number[]"
  title="`.map(Number)` を使用する"
  options={[
    {text: '[24, NaN, 34]', isAnswer: true},
    {text: '[24, NaN, 42]'},
    {text: '[24, 1, 42]'},
    {text: '[24, 42]'},
    {text: 'NaN'},
    {text: 'TypeError'},
  ]}
>
  <slot name="question">
  <div className="question">
    ```jsx
        [24, 'Twenty1', 0o42].map(Number)
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    `Number` は `parseInt` より厳密に数値型へ変換します。ここでは、`'Twenty1'` は `NaN` になり、`0o42` は8進リテラルとして認識され `34` に変換されます。
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={11}
  group="パース"
  title="null の取り扱い"
  options={[
    {text: '0 NaN'},
    {text: '0 0'},
    {text: 'NaN NaN'},
    {text: 'NaN 0', isAnswer: true},
    {text: 'null null'},
    {text: 'TypeError'},
  ]}
>
  <slot name="question">
  <div className="question">
    このコードの結果は何ですか？
    ```jsx
        console.log(parseInt(null), Number(null))
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    `parseInt` は入力を文字列に強制変換するので、`null` は `"null"` になる。`"null"` には有効な10進数字がないので `NaN` を返す。

    `Number(null)` は `0` を返す。JS は気を抜かせないからだ。
    なぜか？興味があればさらに掘り下げるよ。
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={12}
  group="パース"
  title="基数でのパース"
  options={[
    {text: 'NaN'},
    {text: 'null'},
    {text: 'undefined'},
    {text: '36'},
    {text: '1112745', isAnswer: true},
    {text: '01001001'},
  ]}
>
  <slot name="question">
  <div className="question">
    この呪文の結果は何ですか？
    ```jsx
        parseInt(null, 36)
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    `parseInt` は常に入力を文字列に変換するので、`null` は文字列 `"null"` になる。

    base 36（ヘキサトリゲシマル、覚えているなら）では、文字列 `"null"` は `1112745` を表す。

    `nulk`、`null`、`nulm` の連続した値は、base 36 でそれぞれ `1112744`、`1112745`、`1112746` になる。
  </div>
  </slot>
</Challenge>

</QuizUI>

<section className="scroll-x">
## 比較表

| Function | `parseInt` | `parseFloat` | `Number` | `BigInt` |
| --- | --- | --- | --- | --- |
| Ignores Whitespace | ✅ | ✅ | ✅ | ✅ |
| .map(FN)  | ❌ | ☑️ | ✅ | ✅ |
| Supports Radix Arg | ✅ | ❌ | ❌ | ❌ |
| Binary/Octal/Hex literals | ✅ | ❌ | ✅ | ✅ |
| Invalid chars `42 oh no` | `42` | `42`  | `NaN` | `SyntaxError` |
</section>

<h2>結果はどうですか？ 🧐</h2>

{/* <h4>Are you ok?</h4> */}

<p class="inset">大量のバイナリの後、休みが欲しいですか？<br />ふん、覚えておいて: スキルの*後*に休憩を！ <br /><br />[my gym](/challenges/) を叩いて、もっとチャレンジを潰そう！ 💪</p>
````
