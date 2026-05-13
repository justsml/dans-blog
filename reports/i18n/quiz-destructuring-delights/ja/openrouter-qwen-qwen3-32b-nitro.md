# Translation Candidate
- Slug: quiz-destructuring-delights
- Locale: ja
- Model: openrouter/qwen/qwen3-32b:nitro
- Target: src/content/posts/2024-11-12--quiz-destructuring-delights/ja/index.mdx
- Validation: rejected: direct AI SDK translation failed
- Runtime seconds: 6.26
- Input tokens: unknown
- Output tokens: unknown
- Thinking tokens: unknown
- Cached input tokens: unknown
- Cache write tokens: unknown
- Estimated cost: unknown
- Pricing source: unknown
- Note: Command failed: bun run i18n:translate:chunked -- --slug quiz-destructuring-delights --locale ja --model openrouter/qwen/qwen3-32b:nitro --chunk 6p --quiz-concurrency 20
## Raw Output

````mdx
---
unlisted: false
title: 'クイズ: デストラクチャリングの魅力'
subTitle: 分割代入の達人ですか？
label: Destructuring
social_image: ../desktop-social.webp
category: Quiz
subCategory: JavaScript
date: '2024-11-12'
modified: '2024-11-16'
tags:
  - quiz
  - intro
  - javascript
  - es2015
  - destructuring
  - beginner
  - intermediate
cover_full_width: ../boxes-of-nesting-dolls.webp
cover_mobile: ../boxes-of-nesting-dolls-square.webp
cover_icon: ../boxes-of-nesting-dolls-square.webp
---
import Challenge from '../../../../../components/QuizUI/Challenge';
import QuizUI from '../../../../../components/QuizUI/QuizUI';

{/* デストラクチャリングの達人ですか？<br/> */}
<p class="inset">それとも、あなたの<em>破壊の交響曲</em>ですか？</p>

このクイズは JavaScript のデストラクチャリングに関する知識を測ります。基本的なオブジェクト構文から入れ子のデストラクチャ、デフォルト値まで網羅します。さらに TypeScript のインライン型に関するボーナス問題もあります。

まずはウォームアップから――デストラクチャリングスキルを証明してください！ 👇

<QuizUI>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={0}
  group="ウォームアップ: オブジェクト"
  title="基本的なオブジェクト分割代入"
  options={[
    {text: '名前: Dan Levy, 年齢: 20'},
    {text: '名前: Dan Levy, 年齢: 40'},
    {text: '名前: Dan Levy, 年齢: Infinity'},
    {text: '名前: Dan Levy, 年齢: undefined', isAnswer: true},
    {text: 'エラー: プロパティ \'age\' を読み取れません'},
    {text: '名前: undefined, 年齢: 40'},
  ]}
>
  <slot name="question">
  <div className="question">
    このコードは何を出力しますか？
    ```js
        const person = {
          name: 'Dan Levy',
          location: 'Cape Town',
        };
        const { name, age } = person;
        console.log(`Name: ${name}, Age: ${age}`);
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    `person` に `age` プロパティが存在しないので、`age` は `undefined` になります。絶対に `Infinity` ではありません 😅

    これにより次のようになります:
    ```plaintext
        Name: Dan Levy, Age: undefined
    ```
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={1}
  group="ウォームアップ: 配列"
  title="オブジェクトのデストラクチャリングにおけるデフォルト値"
  options={[
    {text: '名前: Dan Levy, 年齢: NaN'},
    {text: '名前: Dan Levy, 年齢: null'},
    {text: '名前: Dan Levy, 年齢: undefined', isAnswer: true},
    {text: '名前: Dan Levy, 年齢: 40'},
    {text: 'エラー: プロパティ \'age\' をデストラクトできません'},
    {text: 'SyntaxError: 予期しないトークン \',\''},
  ]}
>
  <slot name="question">
  <div className="question">
    このコードは何をしますか？
    ```js
        const person = [ 'Dan Levy', 'Cape Town' ];
        const [ name, origin, age ] = person;
        console.log(`Name: ${name}, Age: ${age}`);
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    `age` 変数は `tuple` 配列に存在しないので、`undefined` になります。

    これにより次のようになります:
    ```plaintext
        Name: Dan Levy, Age: undefined
    ```
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={2}
  group="入れ子のデストラクチャリング"
  title="入れ子のデストラクチャリング"
  options={[
    {text: 'First: Dan, City: Denver'},
    {text: 'First: undefined, City: Denver'},
    {text: 'Error: Cannot read property \'first\''},
    {text: 'First: Dan, City: undefined'},
    {text: 'エラー', isAnswer: true},
  ]}
>
  <slot name="question">
  <div className="question">
    入れ子のデストラクチャリングはどうですか？
    ```js
        'use strict';
        const person = {
          name: { first: 'Dan' },
          address: { city: 'Denver' },
        };
        const {
          name: { first },
          address: { city },
          birth: { place },
        } = person;
        console.log(
          `First: ${first}, City: ${place}`,
        );
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    `birth: { place }` プロパティは `person` に存在しないため、エラーがスローされます。
    1つの解決策は、入れ子のプロパティにデフォルト値を提供することです。

    入れ子のプロパティにアクセスする際は注意が必要です。エラーが見つけにくく、ブラウザやプラットフォームによってエラーメッセージが異なるため、デバッグがやや難しくなります。

    最新の Chrome では: `TypeError: Cannot read properties of undefined (reading 'place')`

    Node でも同様に `TypeError` になります。JavaScript が `place` を読み取る前に `undefined` から `place` をデストラクトしようとするためです。

    正確な文言はブラウザやランタイムによって異なります。
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={3}
  group="デフォルト"
  title="オブジェクトのデストラクチャリングにおけるデフォルト値"
  options={[
    {text: 'こんにちは Dan、出身は Unknown'},
    {text: 'こんにちは Dan、出身は Denver'},
    {text: 'こんにちは Unknown、出身は Unknown'},
    {text: 'こんにちは Unknown、出身は Denver'},
    {text: 'エラー', isAnswer: true},
  ]}
>
  <slot name="question">
  <div className="question">
    デフォルトをいくつか入れたら、これどうなる？
    ```js
        'use strict';
        const person = {
          name: { first: 'Dan' },
          address: { city: 'Denver' },
        };
        const {
          name: { first = 'Unknown' },
          birth: { place = 'Unknown' },
        } = person;
        console.log(
          `Hi ${first} from ${place}`,
        );
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    `birth` プロパティは `person` に存在しないので、ネストされたプロパティだけでなくオブジェクト全体にデフォルトが必要です。実質的に ` = {}` のデフォルトが抜けています。

    この書き方は「`person.birth` が `undefined` の場合、`place` は `Unknown`」という意味になります。しかし `person.birth` は `undefined` なので、`undefined` をデストラクトしようとしてエラーになります。
    ```plaintext
        In modern Chrome: `TypeError: Cannot read properties of undefined (reading 'place')`

        In Node, this is also a `TypeError` because JavaScript tries to destructure `place` from `undefined`.

        Exact wording varies between browsers and runtimes.
    ```
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={4}
  group="デフォルト"
  title="オブジェクトのデストラクチャリングにおけるデフォルト値"
  options={[
    {text: 'こんにちは Dan さん、Denver から'},
    {text: 'こんにちは Dan さん、Johannesburg から'},
    {text: 'こんにちは Dan さん、Unknown から', isAnswer: true},
    {text: 'こんにちは Unknown さん、Unknown から'},
    {text: 'こんにちは Unknown さん、Denver から'},
    {text: 'エラー'},
  ]}
>
  <slot name="question">
  <div className="question">
    これは何をするでしょうか？
    ```js
        const person = {
          name: { first: 'Dan' },
          address: { city: 'Denver' },
        };
        const {
          name: { first = 'Unknown' },
          birth: { place = 'Unknown' } = {},
        } = person;

        console.log(
          `Hi ${first} from ${place}`,
        );
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    `person` に `birth` プロパティが存在しないため、空オブジェクト ` = {}` にフォールバックします。これによりデフォルト値が使用されます。
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={5}
  group="関数引数"
  title="デフォルト付き関数パラメータの分割代入"
  options={[
    {text: 'Hi Dan from undefined'},
    {text: 'Hi Dan from Unknown'},
    {text: 'Hi Dan from Denver'},
    {text: 'Hi Unknown from Unknown'},
    {text: 'Hi Unknown from Denver'},
    {text: 'Error', isAnswer: true},
  ]}
>
  <slot name="question">
  <div className="question">
    関数パラメータとして、これが何をするか？
    ```js
        'use strict';
        function displayUser({
          name = "Unknown",
          age = -1,
        } = { place: "Unknown" }) {
          console.log(`Hi ${name} from ${place}`);
        }
        displayUser({ name: "Dan" });
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    この関数は `name` と `age` プロパティを抽出し、必要に応じてデフォルトを使用します。この場合、デフォルトオブジェクトの `place` キーは単なるノイズで、`displayUser()` 内では使用されていません。

    strict モードでも挙動は変わりません: 宣言されていない `place` バインディングを読み取ると `ReferenceError` がスローされます。
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={6}
  group="関数引数"
  title="ネストされたデフォルト値を使った分割代入"
  options={[
    {text: '不明, 不明, Joburg'},
    {text: '不明, 不明, 不明'},
    {text: '不明, `undefined`, Joburg'},
    {text: 'N/A, `undefined`, Joburg'},
    {text: 'N/A, 不明, Joburg'},
    {text: 'N/A, N/A, Joburg', isAnswer: true},
    {text: '不明, N/A, Joburg'},
    {text: 'エラー'},
  ]}
>
  <slot name="question">
  <div className="question">
    `undefined` 値はどのように扱われますか？
    ```js
        'use strict';
        function displayPlace({
          name = "N/A",
          place = "N/A",
          age = -1,
        } = { place: "Unknown" }) {
          console.log(`${place}`);
        }
        displayPlace({ name: "Dan" });
        displayPlace({ name: "Dan", place: undefined });
        displayPlace({ name: "Dan", place: "Joburg" });
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    `displayPlace` 関数は、オブジェクトが渡されない場合にのみデフォルトオブジェクトを使用します。したがって、`{ place: "Unknown" }` のデフォルトを取得できるのは引数なしで `displayPlace()` を呼び出したときだけです。

    もう一つ注目すべきは、`place` に `undefined` を渡すとデフォルト値が使用される点で、`JSON.stringify` の挙動（`undefined` を無視し `null` を認識する）に少し似ています。

    その結果は次の通りです:
    ```js
        displayPlace() // Unknown
        displayPlace({ name: "Dan" }) // N/A
        displayPlace({ name: "Dan", place: undefined }) // N/A
    ```
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={7}
  group="関数引数"
  title="ネストされたデフォルト値を使った分割代入"
  options={[
    {text: 'N/A, N/A'},
    {text: 'N/A, undefined'},
    {text: 'Unknown, N/A'},
    {text: 'Unknown, Unknown'},
    {text: 'Unknown, undefined'},
    {text: 'null, N/A', isAnswer: true},
    {text: 'null, Unknown'},
    {text: 'null, undefined'},
    {text: 'Error'},
  ]}
>
  <slot name="question">
  <div className="question">
    前の問題と似ているけど… `null` はどう扱われる？_
    ```js
        function displayPlace({
          name = "N/A",
          place = "N/A",
          age = -1,
        } = { place: "Unknown" }) {
          console.log(`${place}`);
        }
        displayPlace({ name: "Dan", place: null });
        displayPlace({ name: "Dan", place: undefined });
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    この場合、最初の呼び出しでは `place` プロパティが `null` に設定され、2 回目の呼び出しでは `undefined` になります。`place` のデフォルト値はオブジェクト全体が存在しない **または** `undefined` のときだけ使用されます。`null` はそのまま `null` として渡されます。
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={8}
  group="TypeScript インライン型"
  title="入れ子デフォルト値を使った分割代入"
  options={[
    {text: 'N/A'},
    {text: 'undefined'},
    {text: '不明'},
    {text: '\'null\''},
    {text: 'TypeScript エラー', isAnswer: true},
  ]}
>
  <slot name="question">
  <div className="question">
    さて、TypeScriptで... _何が起こるでしょうか？_
    ```ts
        'use strict';
        function displayPlace(
          {
            name = 'N/A',
            place = 'N/A',
          }: {
            name: string;
            place: string;
            age: number;
          },
        ) {
          console.log(`${place}`);
        }
        displayPlace({ name: 'Dan', place: null });
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    TypeScript は `place` が `string` と型付けされているのに、呼び出しで `null` を渡しているためエラーを報告します。また、必須の `age` プロパティが省略されています。

    型エラーを無視すれば、コードを実行するとコンソールに `null` が出力されます。
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={9}
  group="TypeScript: 代入付き"
  title="ネストされたデフォルト値を使った分割代入"
  options={[
    {text: '未定義'},
    {text: 'null'},
    {text: '該当なし'},
    {text: '不明'},
    {text: 'デンバー', isAnswer: true},
    {text: 'SyntaxError'},
    {text: 'エラー: 無効な型'},
    {text: 'エラー: 無効な引数'},
  ]}
>
  <slot name="question">
  <div className="question">
    リネーム/代入を試してみよう…
    ```ts
        'use strict';
        function displayPlace({
          name = 'N/A',
          place: location = 'N/A',
        }: {
          name: string;
          place: string;
          age?: number;
        }) {
          console.log(`${location}`);
        }
        displayPlace({ name: 'Dan', place: 'Denver' });
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    これによりコンソールに `Denver` が出力されます。関数シグネチャで `place` プロパティが `location` にリネームされています。サードパーティのデータ構造に合わせる際の一般的なパターン（分割代入時のプロパティ名変更）です。
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={10}
  group="TS におけるネストされた分割代入"
  title="ネストされたデフォルト値を使った分割代入"
  options={[
    {text: 'エラー: プロパティ \'first\' がありません'},
    {text: 'エラー: プロパティ \'last\' がありません'},
    {text: 'エラー: プロパティ \'birth\' と \'age\' がありません', isAnswer: true},
    {text: 'エラー: プロパティ \'place\' がありません'},
    {text: 'エラー: \'string\' には {...} 内にプロパティがありません'},
  ]}
>
  <slot name="question">
  <div className="question">
    型エラーを見つけてください:
    ```ts
        function greet({
          name: {first = "N/A", last = "N/A"},
          birth: {place = "N/A"} = {},
          age = -1,
        }: {
          name: {first?: string, last?: string};
          birth: {place?: string};
          age: number;
        }) {
          console.log(`Hi ${first} ${last} from ${place}`);
        }
        greet({ name: {first: 'Dan'} });
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    `greet` 関数のシグネチャにエラーがあります。渡されたオブジェクトに `age` と `birth` プロパティがないので、型定義ではそれらをオプションにすべきです。

    `birth` プロパティはデフォルト値で分割代入されていますが、型定義では存在することが要求されています。TypeScript でプロパティをオプションにするには `?` 演算子を使います。

    `birth?: { place?: string }` は `birth: { place?: string } | undefined` と同じではないことに注意してください。
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={11}
  group="TypeScript + 代入"
  title="ネストされた値、代入、型を使った分割代入"
  options={[
    {text: 'こんにちは Dan Levy from N/A'},
    {text: 'こんにちは Dan Levy from Cape Town'},
    {text: 'こんにちは N/A N/A from N/A'},
    {text: 'こんにちは N/A N/A from Cape Town'},
    {text: 'エラー', isAnswer: true},
  ]}
>
  <slot name="question">
  <div className="question">
    今度は **代入**（`f`、`l`、`p` 変数に注目）
    ```ts
        'use strict';
        function greet(
          {
            name: {first: f = "N/A", last: l = "N/A"},
            birth: {place: p = "N/A"} = {},
            age = -1,
          }: {
            name: {first?: string, last?: string};
            birth?: {place?: string};
            age?: number;
          }
        ) {
          console.log(`Hi ${f} ${l} from ${place}`);
          // What will 👆 do?
        }
        greet({
          name: {first: 'Dan', last: 'Levy'},
          birth: {place: 'Cape Town'},
        });
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    別のエラー！もう推測し始めましたか？！

    デフォルトや代入、型が絡む分割代入の階層は読みにくいです！

    `place` を `p` 変数に再代入すると、`console.log` 文のスコープ内ではもはや定義されていません。
    ```ts
        console.log(`Hi ${f} ${l} from ${place}`); // ❌
        // to:
        console.log(`Hi ${f} ${l} from ${p}`); // ✅
    ```
  </div>
  </slot>
</Challenge>

</QuizUI>
````
