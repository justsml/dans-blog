# Translation Candidate
- Slug: javascript-promises-quiz
- Locale: ja
- Model: openrouter/openai/gpt-oss-120b:nitro
- Target: src/content/posts/2019-11-26--javascript-promises-quiz/ja/index.mdx
- Validation: passed
- Runtime seconds: 8.19
- Input tokens: 8606
- Output tokens: 5776
- Thinking tokens: unknown
- Cached input tokens: 2176
- Estimated cost: $0.001375
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
social_image: ../desktop-social.webp
title: 'クイズ: JavaScript Promise 9問'
subTitle: Promise を落とさない。
label: Promise Gotchas
date: '2019-11-26'
modified: '2024-11-28'
tags:
  - promises
  - programming
  - async
  - javascript
  - guides
  - quiz
  - intermediate
related:
  - intro-to-promises
  - promise-gotchas
  - visualizing-promises
  - stop-trying-to-make-async-await-happen
category: Quiz
unlisted: false
subCategory: JavaScript
cover: ../olav-ahrens-rotne-jvBXiynINGE-resized.webp
cover_mobile: ../w300_olav-ahrens-rotne-jvBXiynINGE-resized.webp
cover_icon: ../icon_olav-ahrens-rotne-jvBXiynINGE-resized.webp
---
import Challenge from '../../../../../components/QuizUI/Challenge';
import QuizUI from '../../../../../components/QuizUI/QuizUI';


## JavaScript の Promise を知っていますか？

> * **JavaScript スキルを証明しよう！** 🚀

1. **ヒントを見る**（右下の大きなボタン）。
2. ブラウザのコンソールでコードを試す（ショートカット `F12` か検索）または [repl.it](https://repl.it)* を使う。
3. 気軽に [Tweet at me @justsml](https://x.com/intent/tweet?text=Hey%20Dan%2C%20I%20was%20taking%20your%20promises%20quiz%2E%2E%2E&url=https://danlevy.net/) してください。**感想をぜひ聞かせてください！**

### 👇 以下の 9 問に答えてください 👇

<QuizUI>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={0}
  group="エラー処理"
  title="複数の `.catch` #1"
  options={[
    {text: 'メッセージを1回表示'},
    {text: 'メッセージを2回表示', isAnswer: true},
    {text: 'UnhandledPromiseRejectionWarning'},
    {text: 'プロセスが終了する'},
  ]}
>
  <slot name="question">
  <div className="question">
    次のコードの出力は何ですか？
    ```js
        var p = new Promise((resolve, reject) => {
          reject(Error('The Fails!'))
        })
        p.catch(error => console.log(error.message))
        p.catch(error => console.log(error.message))
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    コンストラクタで Promise を作成し、`reject` コールバックで即座にエラーを発生させます。

    その後、`.catch` ハンドラは DOM の `.addEventListener(event, callback)` や Event Emitter の `.on(event, callback)` と同様に、**複数のハンドラコールバックを追加でき**ます。各コールバックは同じ引数で呼び出されます。
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={1}
  group="エラーの処理"
  title="複数の `.catch` #2"
  options={[
    {text: 'メッセージを1回表示'},
    {text: 'メッセージを2回表示'},
    {text: '未処理の拒否された Promise', isAnswer: true},
    {text: 'プロセスが終了する'},
  ]}
>
  <slot name="question">
  <div className="question">
    以下のコードの出力は何ですか？
    ```js
        var p = new Promise((resolve, reject) => {
          return Promise.reject(Error('The Fails!'))
        })
        p.catch(error => console.log(error.message))
        p.catch(error => console.log(error.message))
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Promise コンストラクタを使用する場合、`resolve()` または `reject()` コールバックのいずれかを呼び出す必要があります。Promise コンストラクタは executor の戻り値を無視するため、`Promise.reject()` で作成された追加の Promise は `p` にチェーンされません。2 つのハンドラは `p` に付けられますが、`p` は保留状態のままで、返された拒否された Promise はホスト環境によって未処理として報告されます。
  </div>
  </slot>
</Challenge>

<Challenge
  client:only="react"
  index={2}
  group="エラー処理"
  title="`.then` と `.catch` のチェーン"
  options={[
    {text: 'エラーと `undefined` を出力', isAnswer: true},
    {text: 'エラーを2回出力'},
    {text: 'UnhandledPromiseRejectionWarning'},
    {text: 'undefined'},
  ]}
>
  <slot name="question">
  <div className="question">
    次のコードの出力は何ですか？
    ```js
      var p = new Promise((resolve, reject) => {
          reject(Error('The Fails!'))
        })
        .catch(error => console.log(error))
        .then(error => console.log(error))
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    `.then` と `.catch` をチェーンするときは、ステップの連続として考えると分かりやすいです。各 `.then` は前の `.then` が返した値を引数として受け取ります。ただし、ある「ステップ」でエラーが発生した場合、次の `.then` ステップはすべて `.catch` が現れるまでスキップされます。エラーを上書きしたい場合は、エラーでない値を返すだけです。その値は以降の `.then` で取得できます。
  </div>
  </slot>
</Challenge>

<Challenge
  client:only="react"
  index={3}
  group="エラー処理"
  title="`.catch` をチェーンする"
  options={[
    {text: 'エラーメッセージを1回表示する', isAnswer: true},
    {text: 'エラーメッセージを2回表示する'},
    {text: 'UnhandledPromiseRejectionWarning'},
    {text: 'プロセスが終了する'},
  ]}
>
  <slot name="question">
  <div className="question">
    次のコードの出力は何ですか？
    ```js
      var p = new Promise((resolve, reject) => {
          reject(Error('The Fails!'))
        })
        .catch(error => console.log(error.message))
        .catch(error => console.log(error.message))
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    `.catch` をチェーンする場合、各 `.catch` は前の `.then` または `.catch` の「ステップ」で投げられたエラーのみを処理します。この例では最初の `.catch` が `console.log` を返しており、両方の `.catch` の後に `.then()` を追加しないとその結果にアクセスできません。
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={4}
  group="エラーの処理"
  title="複数の `.catch`'s"
  options={[
    {text: 'メッセージを1回表示'},
    {text: 'メッセージを2回表示'},
    {text: 'UnhandledPromiseRejectionWarning'},
    {text: '何も表示されない', isAnswer: true},
  ]}
>
  <slot name="question">
  <div className="question">
    次のコードの出力は何ですか？
    ```js
        new Promise((resolve, reject) => {
            resolve('Success!')
          })
          .then(() => {
            throw Error('Oh noes!')
          })
          .catch(error => {
            return "actually, that worked"
          })
          .catch(error => console.log(error.message))
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    **ヒント:** `.catch` はエラーを無視（または上書き）するために、通常の値を返すだけで使える。

    このトリックは、その後に値を受け取る `.then` がある場合にのみ機能します。
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={5}
  group="データ処理"
  title="`.then` の流れ"
  options={[
    {text: '「Success!」と「SUCCESS!」を表示'},
    {text: '「Success!」を表示'},
    {text: '「SUCCESS!」を表示', isAnswer: true},
    {text: '何も出力されない'},
  ]}
>
  <slot name="question">
  <div className="question">
    次のコードの出力は何ですか？
    ```js
        Promise.resolve('Success!')
          .then(data => {
            return data.toUpperCase()
          })
          .then(data => {
            console.log(data)
          })
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    **Hint:** `.then` はデータを順次渡します。`return value` から次の `.then(value => /* handle value */)` へ。

    `return` は次の `.then` に値を渡すための鍵です。
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={6}
  group="データ処理"
  title="`.then` の間のフロー"
  options={[
    {text: '「SUCCESS!」を出力'},
    {text: '「Success!」を出力'},
    {text: '「SUCCESS!」と「SUCCESS!」を出力', isAnswer: true},
    {text: '何も出力されない'},
  ]}
>
  <slot name="question">
  <div className="question">
    次のコードの出力は何ですか？
    ```js
        Promise.resolve('Success!')
          .then(data => {
            return data.toUpperCase()
          })
          .then(data => {
            console.log(data)
            return data
          })
          .then(console.log)
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    `console.log` が2回呼び出されます。
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={7}
  group="データの処理"
  title="`.then` の間のフロー"
  options={[
    {text: '「SUCCESS!」を出力'},
    {text: '「Success!」を出力'},
    {text: '「SUCCESS!」と「SUCCESS!」を出力'},
    {text: '`undefined` を出力', isAnswer: true},
  ]}
>
  <slot name="question">
  <div className="question">
    次のコードの出力は何ですか？
    ```js
        Promise.resolve('Success!')
          .then(data => {
            data.toUpperCase()
          })
          .then(data => {
            console.log(data)
          })
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    **Hint:** `.then` はデータを順に渡します。`return value` から次の `.then(value => /* handle value */)` へ。

    `return` は次の `.then` に値を渡すための鍵です。
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={8}
  group="データの取り扱い"
  title="`.then` と `.catch` の間のフロー"
  options={[
    {text: '「Oh noes!」 と 「The fails!」 を出力'},
    {text: '「Oh noes!」 を出力'},
    {text: '「The fails!」 を出力', isAnswer: true},
    {text: '「actually, that worked」 を出力'},
    {text: '何も出力されない'},
  ]}
>
  <slot name="question">
  <div className="question">
    次のコードの出力は何ですか？
    ```js
        Promise.resolve('Success!')
          .then(() => {
            throw Error('Oh noes!')
          })
          .catch(error => {
            return 'actually, that worked'
          })
          .then(data => {
            throw Error('The fails!')
          })
          .catch(error => console.log(error.message))
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    ![annotated-code/question-9-4.webp](annotated-code/question-9-4.webp)
  </div>
  </slot>
</Challenge>

</QuizUI>
````
