# Translation Candidate
- Slug: javascript-promises-quiz
- Locale: ja
- Model: openrouter/qwen/qwen3-32b:nitro
- Target: src/content/posts/2019-11-26--javascript-promises-quiz/ja/index.mdx
- Validation: rejected: direct AI SDK translation failed
- Runtime seconds: 21.34
- Input tokens: 7810
- Output tokens: 6884
- Thinking tokens: unknown
- Cached input tokens: 0
- Estimated cost: $0.002277
- Note: Command failed: bun run i18n:validate --slug javascript-promises-quiz --locale ja
## Raw Output

````mdx
---
social_image: ../desktop-social.webp
title: ''
subTitle: ''
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
```jsx
import Challenge from '../../../../../components/QuizUI/Challenge';
import QuizUI from '../../../../../components/QuizUI/QuizUI';


## JavaScriptのPromiseを知っていますか？

> * **JavaScriptのスキルを証明しましょう！** 🚀

1. **ヒントの確認** (右下の角にある大きなボタン)
2. ブラウザのコンソールでコードを試す (ショートカットキー `F12` または検索してみましょう) または [repl.it](https://repl.it)* を使用してください。
3. ぜひ [私にツイートしてみてください @justsml](https://x.com/intent/tweet?text=Hey%20Dan%2C%20I%20was%20taking%20your%20promises%20quiz%2E%2E%2E&url=https://danlevy.net/)。**感想を聞かせてくれると嬉しいです！**

### 👇 以下の9問を解答してください👇
```

<QuizUI>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={0}
  group="エラーの処理"
  title="複数の `.catch` #1"
  options={[
    {text: 'メッセージが1回出力される'},
    {text: 'メッセージが2回出力される', isAnswer: true},
    {text: 'UnhandledPromiseRejectionWarning'},
    {text: 'プロセスが終了する'},
  ]}
>
  <slot name="question">
  <div className="question">
    以下のコードの出力は何になるか？
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
    Promiseコンストラクタを使ってPromiseを作成し、直ちに`reject`コールバックでエラーを発生させます。

    その後の`.catch`ハンドラはDOMの`.addEventListener(event, callback)`やEvent Emitterの`.on(event, callback)`のように、**複数のハンドラーコールバックを追加できる**仕組みです。それぞれが同じ引数で呼ばれます。
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={1}
  group="エラーの処理"
  title="複数の `.catch` #2"
  options={[
    {text: 'メッセージが1回表示される'},
    {text: 'メッセージが2回表示される'},
    {text: '処理されていない拒否されたPromise', isAnswer: true},
    {text: 'プロセスが終了する'},
  ]}
>
  <slot name="question">
  <div className="question">
    次のコードの出力は何になりますか？
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
    Promiseコンストラクタを使用する際は、必ず`resolve()`または`reject()`コールバックを呼び出す必要があります。Promiseコンストラクタは実行関数の戻り値を無視するため、`Promise.reject()`で作成された追加のPromiseは`p`にチェーンされません。2つのハンドラが`p`にアタッチされますが、`p`は未処理のままとなり、戻された拒否されたPromiseはホスト環境によって未処理として報告されます。
  </div>
  </slot>
</Challenge>

<Challenge
  client:only="react"
  index={2}
  group="エラーの処理"
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
    次のコードの出力は何になるか？
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
    `.then` と `.catch` のチェーンを扱う際には、それらが一連のステップであると考えると役立ちます。各 `.then` は前の `.then` が返した値（引数として）を受け取ります。ただし、ステップでエラーが発生した場合、その後の `.then` のステップは `.catch` に出会うまでスキップされます。エラーを上書きしたい場合は、エラーでない値を返すだけで済み、その後の `.then` でアクセス可能です。
  </div>
  </slot>
</Challenge>

<Challenge
  client:only="react"
  index={3}
  group="エラーの処理"
  title="`.catch`のチェーン"
  options={[
    {text: 'エラーメッセージが1回表示される', isAnswer: true},
    {text: 'エラーメッセージが2回表示される'},
    {text: 'UnhandledPromiseRejectionWarning'},
    {text: 'プロセスが終了する'},
  ]}
>
  <slot name="question">
  <div className="question">
    以下のコードの出力は何になりますか？
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
    `.catch`をチェーンする場合、それぞれの`.catch`は前の`.then`または`.catch`の"ステップ"で発生したエラーのみを処理します。この例では最初の`.catch`が`console.log`を返していますが、この値にアクセスするには両方の`.catch`の後に`.then()`を追加する必要があります。
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={4}
  group="エラーの処理"
  title="複数の`.catch`"
  options={[
    {text: 'メッセージが1回表示される'},
    {text: 'メッセージが2回表示される'},
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
    **ヒント:** `.catch`は、単純に値を返すことでエラーを無視（または上書き）するために使用できます。

    このテクニックは、値を受け取る次の`.then`がある場合にのみ機能します。
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={5}
  group="データの処理"
  title="`.then`間のフロー"
  options={[
    {text: '「Success!」と「SUCCESS!」を出力する'},
    {text: '「Success!」を出力する'},
    {text: '「SUCCESS!」を出力する', isAnswer: true},
    {text: '何も出力しない'},
  ]}
>
  <slot name="question">
  <div className="question">
    次のコードの出力は何になるか？
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
    **ヒント:** `.then`は`return value`から次の`.then(value => /* valueの処理 */)`にデータを順番に渡します。

    値を次の`.then`に渡すには`return`が必須です。
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={6}
  group="データの処理"
  title="`.then`間のフロー"
  options={[
    {text: '「SUCCESS!」を出力'},
    {text: '「Success!」を出力'},
    {text: '「SUCCESS!」を2回出力', isAnswer: true},
    {text: '何も出力しない'},
  ]}
>
  <slot name="question">
  <div className="question">
    次のコードの出力は何になりますか？
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
    2つの`console.log`呼び出しが実行されます。
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={7}
  group="データの処理"
  title="`.then`間のフロー"
  options={[
    {text: '「SUCCESS!」を出力'},
    {text: '「Success!」を出力'},
    {text: '「SUCCESS!」と「SUCCESS!」を出力'},
    {text: '`undefined`を出力', isAnswer: true},
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
    **ヒント:** `.then`は`return value`から次の`.then(value => /* handle value */)`にデータを順番に渡します。

    `return`が次の`.then`に値を渡すために重要です。
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={8}
  group="データの処理"
  title="`.then`と`.catch`間のフロー"
  options={[
    {text: '「Oh noes!」と「The fails!」を出力'},
    {text: '「Oh noes!」を出力'},
    {text: '「The fails!」を出力', isAnswer: true},
    {text: '「actually, that worked」を出力'},
    {text: '何も出力しない'},
  ]}
>
  <slot name="question">
  <div className="question">
    次のコードの出力はどれですか？
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
