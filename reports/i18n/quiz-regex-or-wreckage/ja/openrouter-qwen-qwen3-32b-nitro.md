# Translation Candidate
- Slug: quiz-regex-or-wreckage
- Locale: ja
- Model: openrouter/qwen/qwen3-32b:nitro
- Target: src/content/posts/2024-11-15--quiz-regex-or-wreckage/ja/index.mdx
- Validation: deferred
- Runtime seconds: 140.83
- Input tokens: 14564
- Output tokens: 14925
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- Estimated cost: $0.004747
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
unlisted: false
title: 'クイズ: 正規表現マスター'
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

<p class="inset">正規表現の腕試し、準備はできましたか？🤼‍♂️</p>

基本パターン、数量子、グループ、そして厄介な前後検査アサーションに関する問題で、あなたのRegEx知識をテストしましょう。単純な文字列マッチングから複雑なパターン検証まで - 正しい正規表現が見つけられますか？

<QuizUI>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={0}
  group="ウォームアップ"
  title="大文字小文字を区別したマッチング"
  options={[
    {text: '["Cat"]'},
    {text: '["cat", "CAT", "Cat"]'},
    {text: '["cat"]', isAnswer: true},
    {text: '[]'},
  ]}
>
  <slot name="question">
  <div className="question">
    何がマッチしますか？
    ```js
        'cat CAT Cat'.match(/cat/g)
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    このパターンは`g`は使用していますが`i`は使っていません：
    - `g`はすべてのマッチを検索
    - `i`がないと、大文字小文字を区別してマッチ

    `i`フラグがなければ、小文字の"cat"だけがマッチします。

    ユーザー入力やHTMLで大文字小文字が変化する場合に特に役立ちます。

    [RegExpフラグについてさらに学ぶ](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions#advanced_searching_with_flags)
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={1}
  group="ウォームアップ"
  title="単純な文字のマッチング"
  options={[
    {text: '["cat", "hat"]', isAnswer: true},
    {text: '["cat", "hat", "what"]'},
    {text: '["cat"]'},
    {text: '[]'},
  ]}
>
  <slot name="question">
  <div className="question">
    このコードは何を返すか？
    ```js
        const words = ['cat', 'hat', 'what', 'bat'];
        words.filter(word => word.match(/^[ch]at/))
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    パターン`/^[ch]at/`は以下の条件を満たす文字列をマッチします：
    - 開始文字(^)が'c'または'h'（[ch]は文字クラスを表し、1文字をマッチします）
    - 後ろに'at'が続く

    したがって'cat'と'hat'のみがマッチします。`filter()`メソッドはマッチした要素のみを保持します。

    [MDNで文字クラスについてさらに学ぶ](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions/Character_Classes)
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={2}
  group="基本マッチング"
  title="貪欲 (Greedy) と非貪欲 (Non-Greedy) の違い"
  options={[
  ]}
>
  <slot name="question">
  <div className="question">
    この正規表現はどの部分とマッチしますか？
    ```js
        '<div>Hello</div><div>World</div>'.match(/<div>.*?<\/div>/g)
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    パターン `/<div>.*?<\/div>/g` は `*?` による非貪欲マッチを使っています。これは以下を意味します：
    - `<div>` とマッチ
    - 任意の文字 (`.*`) を、できるだけ少ない回数 (`?`) でマッチ
    - `</div>` が見つかるまで
    - `g` フラグにより、すべての出現をマッチ

    `?` を使わなければ、貪欲な `.*` は最初の `<div>` から最後の `</div>` までを1つの大きなマッチとしてしまう。`?` を使うと、それぞれのペアを個別にマッチします。

    [貪欲と非貪欲マッチの詳細](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions/Quantifiers#greedy_versus_non-greedy_lazy_matching)
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={3}
  group="一般的な落とし穴"
  title="ドットメタ文字"
  options={[
    {text: '["hello\nworld"]'},
    {text: '["hello", "world"]', isAnswer: true},
    {text: '["hello\n", "world"]'},
    {text: 'null'},
  ]}
>
  <slot name="question">
  <div className="question">
    このコードは何を返すか？
    ```js
        'hello\nworld'.match(/\w+/g)
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    `\w+` パターンは1つ以上の単語文字にマッチします。文字列内に改行があったとしても、`\w` は以下にマッチします：
    - アルファベット (a-z, A-Z)
    - 数字 (0-9)
    - アンダースコア (_)

    よって改行は単語境界として機能し、2つのマッチが得られます。`.*` を使っていたらデフォルトでは改行にマッチしなかったでしょう（`s` フラグが必要です）。

    [メタ文字についてもっと学ぶ](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions/Character_Classes#types)
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={4}
  group="ルックアヘッド"
  title="ポジティブ・ルックアヘッド"
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
    これは何にマッチしますか？
    ```js
        '$100 and €50'.match(/\d+(?=[\$€])/g)
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    このパターンは何もマッチしません。ルックアヘッドが逆になっているからです！ `$` または `€` で**始まる**数字を検索したいなら、ルックビハインドを使いましょう: `/(?<=[\$€])\d+/g`。

    ルックアヘッドは現在位置の**後ろ**をチェックします。このパターンは以下を検索しています:
    - 1つ以上の数字 (`\d+`)
    - その後ろに (`(?=...)`) `$` または `€` (`[\$€]`)

    数字の後に通貨記号がある文字列は存在しないため、マッチしません。

    [ルックアヘッドのアサーションについて詳しくはこちら](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions/Assertions)
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={5}
  group="基本的な一致"
  title="単語境界"
  options={[
    {text: '["cat", "cats"]'},
    {text: '["cat"]', isAnswer: true},
    {text: '["cats"]'},
    {text: '[]'},
  ]}
>
  <slot name="question">
  <div className="question">
    何が一致するか？
    ```js
        'cat cats category'.match(/\bcat\b/g)
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    `\b` は単語境界を表し、次を一致させます：
    - 単語文字と非単語文字の間
    - 文字列の開始/終了位置に単語文字がある場合

    したがって、`/\bcat\b/` は "cat" が完全な単語として存在する場合のみ一致します。
    - ✅ "cat"（スペースで囲まれた場合）
    - ❌ "cats"（"cat" の後ろに境界がない）
    - ❌ "category"（"cat" の後ろに境界がない）

    [単語境界についてさらに学ぶ](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions/Assertions#other_assertions)
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={6}
  group="よくある落とし穴"
  title="グローバルフラグの挙動"
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
    出力結果は？
    ```js
        'banana'.match(/a/g)
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    グローバルフラグ（g）は`match()`の挙動を変える：
    - フラグなし：最初のマッチとキャプチャグループを返す
    - フラグあり：マッチした文字列の配列を返す

    このケースでは、「banana」内の「a」のすべての出現を検出します。

    注：すべてのマッチとキャプチャグループが必要な場合は、`matchAll()`や`exec()`メソッドのループを使用してください。

    [グローバルフラグの詳細](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/global)
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={7}
  group="後方参照"
  title="否定的後方参照"
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
    このパターンに一致するのは？
    ```js
        'abc123 def456'.match(/(?<!abc)\d+/g)
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    否定的後方参照 `(?<!abc)` は、数字が "abc" で終わっていないことを確認します：
    - ❌ "123"（"abc" で終わる）
    - ✅ "23"（"abc1" で終わる）
    - ✅ "456"（"def" で終わる）

    現代のJavaScriptエンジンでは後方参照がサポートされています。この例は固定長の後方参照（`abc` は常に3文字）を使用しています。可変長の後方参照はエンジン依存の複雑なエッジケースです。

    注：後方参照のサポートはJavaScriptで比較的新しく、古いブラウザをサポートする必要がある場合は[ブラウザの互換性](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions#browser_compatibility)を確認してください。
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={8}
  group="基本的なマッチング"
  title="キャプチャリンググループ"
  options={[
    {text: '["2029-12-31"]'},
    {text: '["2029", "12", "31"]', isAnswer: true},
    {text: '["20", "29", "12", "31"]'},
    {text: 'null'},
  ]}
>
  <slot name="question">
  <div className="question">
    このコードは何を返す？
    ```js
        '2029-12-31'.match(/(\d{4})-(\d{2})-(\d{2})/).slice(1)
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    このパターンは3つのキャプチャグループを使用しています：
    1. `(\d{4})` は年をキャプチャ
    2. `(\d{2})` は月をキャプチャ
    3. `(\d{2})` は日をキャプチャ

    `match()` メソッドはグローバルフラグが指定されていない場合：
    - インデックス0: 完全なマッチ
    - インデックス1+: キャプチャグループ

    `slice(1)` はキャプチャグループだけを取得するためのよく使われるテクニックです。

    [グループとキャプチャの詳細](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions/Groups_and_Backreferences)
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={9}
  group="先行検査"
  title="否定の先行検査"
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
    この結果はどれになるでしょうか？
    ```js
        "123aBc".match(/^\d+(?![a-z])/ig)
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    否定の先行検査`(?![a-z])`は、数字の後に小文字アルファベットが含まれていないことを確認します。`"3aBc"`部分には数字の後に小文字が含まれているためマッチしません。そのため先頭の`"12"`のみがマッチします。

    [否定の先行検査について詳しく学ぶ](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions/Assertions)
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={10}
  group="Look-behind"
  title="Look-behind（後方検索）による分割"
  options={[
    {text: '["a,", "b,", "c"]', isAnswer: true},
    {text: '["a,b,c"]'},
    {text: '["a", ",", "b", ",", "c"]'},
    {text: '["a,b,c", ""]'},
  ]}
>
  <slot name="question">
  <div className="question">
    返される値は？
    ```js
        'a,b,c'.split(/(?<=,)/)
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    パターン `/(?<=,)/` はコンマの後にマッチする後方検索です：
    - `a,`（コンマの直後）
    - `b,`（コンマの直後）
    - `c`（コンマがない）

    後方検索はコンマを消費しないため、`split` の結果にコンマが含まれた状態で保持されます。

    これは**分割文字自体を保持したまま文字列を分割**したい場合に役立ちます。

    [後方検索アサーションの詳細はこちら](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions/Assertions)
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={11}
  group="よくある落とし穴"
  title="特殊文字のエスケープ"
  options={[
    {text: '["$100"]', hint: '特殊文字をエスケープしていないパターンです'},
    {text: '["100"]'},
    {text: '[]'},
    {text: 'null', isAnswer: true},
    {text: 'Error'},
  ]}
>
  <slot name="question">
  <div className="question">
    何がマッチしますか？
    ```js
        '$100'.match(/$\d+/)
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    特殊文字をリテラルとしてマッチさせるには`\`でエスケープする必要があります:
    - `$`は特殊文字（文字列の終わりを表す）
    - リテラルのドル記号をマッチさせるにはエスケープ: `\$`

    エスケープが必要なよくある特殊文字:
    ```js
        . * + ? ^ $ [ ] \ ( ) { } |
    ```
    エスケープしないと、多くの特殊文字が正規表現での特殊な意味を持つため、意図しないマッチが起こることがあります。

    [特殊文字のエスケープについて詳しくは](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions#escaping)
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={12}
  group="後方参照"
  title="肯定的な後方参照"
  options={[
    {text: '["$100"]'},
    {text: '["100"]', isAnswer: true},
    {text: '["$"]'},
    {text: '[]'},
  ]}
>
  <slot name="question">
  <div className="question">
    何がマッチしますか？
    ```js
        '$100'.match(/(?<=\$)\d+/)
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    肯定的な後方参照`(?<=\$)`により、ドル記号の後に続く数字がマッチします：
    - `(?<=\$)`: ドル記号の後方参照
    - `\d+`: 1つ以上の数字をマッチ

    後方参照のアサーションは文字を消費しません。単に文字の前が何であるかをチェックするだけです。
    これは、文字列の前部分を含めずに特定のパターンをマッチさせたいときに役立ちます。

    [後方参照のアサーションについてさらに学ぶ](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions/Assertions)
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={13}
  group="基本的なマッチング"
  title="遅延と貪欲な量指定子"
  options={[
  ]}
>
  <slot name="question">
  <div className="question">
    何がマッチしますか？
    ```js
        '<b>bold</b>'.match(/<b>(.*?)<\/b>/).slice(1)
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    このパターンは`*?`を使用した遅延マッチングを行います：
    - `<b>`: 開始タグをマッチ
    - `(.*?)`: 任意の文字をキャプチャ（遅延）
    - `</b>`: 終了タグをマッチ

    `*`の後に`?`がつくことで遅延マッチングとなり、できるだけ少ない文字数をマッチします。
    `?`がなければ貪欲マッチングとなり、できるだけ多くの文字をマッチします。

    `slice(1)`はキャプチャされたグループのみを返します。

    [貪欲と非貪欲（遅延）マッチングについて詳しく](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions/Quantifiers#greedy_versus_non-greedy_lazy_matching)
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={14}
  group="基本的な一致"
  title="ユニコードフラグ"
  options={[
    {text: '["🙂"]'},
    {text: '["😀", "🙂"]', isAnswer: true},
    {text: 'null'},
    {text: 'Error'},
  ]}
>
  <slot name="question">
  <div className="question">
    何が一致する？
    ```js
        '😀 🙂'.match(/\p{Emoji}/gu)
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    `u`フラグは次を有効化します：
    - ユニコードプロパティエスケープ(`\p{...}`)
    - サロゲートペアの正しい処理

    `u`フラグがないと、絵文字や他のユニコード文字が正しく一致しない可能性があります。
    パターン`\p{Emoji}`はユニコード`Emoji`プロパティを持つ文字に一致します。この文字列では、2つの絵文字絵文字が該当します。

    注：ユニコードプロパティエスケープは`u`フラグが必要です。

    [ユニコードモードの詳細はこちら](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions/Unicode_Property_Escapes)
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={15}
  group="地獄を見よ"
  title="パスワードの検証"
  options={[
    {text: '"sassword123"'},
    {text: '"Sass123!"', isAnswer: true},
    {text: '"SASSWORD123"'},
    {text: '"Sass word123"'},
  ]}
>
  <slot name="question">
  <div className="question">
    ごめんね！😈<br />
    どのパスワードがこのパターンに一致しますか？
    ```js
        /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    本番環境でこんな書き方をしないでね！😅

    このパターンは複数の肯定の先行断定を使って以下を強制しています：
    - 大文字を1文字以上含む：`(?=.*[A-Z])`
    - 小文字を1文字以上含む：`(?=.*[a-z])`
    - 数字を1文字以上含む：`(?=.*\d)`
    - 特殊文字を1文字以上含む：`(?=.*[!@#$%^&*])`
    - 最小文字数8文字：`.{8,}`

    パスワード検証には先行断定が最適です。複数の条件を文字を消費することなくチェックできるからです。

    [パスワード検証パターンについてもっと学ぶ](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions/Assertions)
  </div>
  </slot>
</Challenge>

</QuizUI>

<h2>どうでしたか？🧐</h2>

正規表現は馴染みにくい存在ですが、使いこなせると非常に強力です（特に新しい構文を習得すれば）。継続的に練習していれば、すぐに正規表現のマスターになれますよ！🧙‍♂️

<p class="inset">これだけの正規表現で疲れた？<br />Pftt、スキルを身につけた後に休憩しましょう！<br /><br />[私のジム](/challenges/)に突撃して、さらにチャレンジを倒しましょう！💪</p>
````
