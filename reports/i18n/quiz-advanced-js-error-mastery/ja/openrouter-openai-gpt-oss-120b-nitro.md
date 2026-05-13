# Translation Candidate
- Slug: quiz-advanced-js-error-mastery
- Locale: ja
- Model: openrouter/openai/gpt-oss-120b:nitro
- Target: src/content/posts/2025-11-04--quiz-advanced-js-error-mastery/ja/index.mdx
- Validation: deferred
- Runtime seconds: 10.70
- Input tokens: 13150
- Output tokens: 8436
- Thinking tokens: unknown
- Cached input tokens: 3456
- Cache write tokens: 0
- Estimated cost: $0.002031
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
title: 'クイズ: 高度なJSエラーマスター'
subTitle: 例外は本当に例外的ですか？
label: Errors
category: Quiz
subCategory: JavaScript
unlisted: false
date: '2025-11-03'
modified: '2025-11-04'
tags:
  - quiz
  - javascript
  - error-handling
  - debugging
  - advanced
cover_full_width: ../ahmed-slimene-c09hZthLq_s-unsplash-wide.webp
cover_mobile: ../ahmed-slimene-c09hZthLq_s-unsplash-square-300px.webp
cover_icon: ../ahmed-slimene-c09hZthLq_s-unsplash-square-300px.webp
cover_credit: >-
  Photo by <a
  href="https://unsplash.com/@assl?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Ahmed
  Slimene</a> on <a
  href="https://unsplash.com/photos/a-tall-white-building-with-balconies-on-top-of-it-c09hZthLq_s?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>
---
import Challenge from '../../../../../components/QuizUI/Challenge';
import QuizUI from '../../../../../components/QuizUI/QuizUI';


### JavaScript のエラー、全部把握してると思う？

* **エラーハンドリングの腕前を試そう！** 💥
* ログインやサインアップは不要です。 ✨
* 選択式問題です。 🤖 … _普通の try‑catch 問題とは違います！_

<QuizUI>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={0}
  group="シリアライズの驚き"
  title="空オブジェクトの謎"
  options={[
    {text: '{"message":"Oops","name":"Error"}'},
    {text: '{}', isAnswer: true},
    {text: '{"error":"Oops"}'},
    {text: 'null'},
  ]}
>
  <slot name="question">
  <div className="question">
    `JSON.stringify(error)` は何を返す？
    ```js
        const error = new Error('Oops');
        console.log(JSON.stringify(error));
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Error オブジェクトは列挙できないプロパティ（`message`、`name`、`stack`）を持つため、`JSON.stringify()` は `{}` を返します。これは API 応答でエラーを送る際の典型的な落とし穴です。`JSON.stringify(error, Object.getOwnPropertyNames(error))` を使うか、代わりにプレーンオブジェクトを作成してください。
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={1}
  group="シリアライズの驚き"
  title="コンソール vs JSON"
  options={[
    {text: 'どちらも同じ出力を表示する'},
    {text: 'console.log はより多くの情報を表示する', isAnswer: true},
    {text: 'JSON.stringify はより多くの情報を表示する'},
    {text: 'どちらも空オブジェクトを表示する'},
  ]}
>
  <slot name="question">
  <div className="question">
    この二つの違いは何ですか？
    ```js
        const err = new Error('Test');
        console.log(err);
        console.log(JSON.stringify(err));
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    `console.log(err)` はエラーメッセージとスタックトレースを表示する。コンソールは Error オブジェクトを特別に扱うからだ。`JSON.stringify(err)` は `'{}'` を返す。Error のプロパティは列挙可能ではないためだ。この違いで API デバッグ中に多くの開発者がつまずく。
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={2}
  group="型チェックのトリック"
  title="instanceof 継承"
  options={[
    {text: 'true, true, true', isAnswer: true},
    {text: 'true, false, false'},
    {text: 'false, true, true'},
    {text: 'true, true, false'},
  ]}
>
  <slot name="question">
  <div className="question">
    これらのチェックの結果は？
    ```js
        class CustomError extends Error {}
        const err = new CustomError('test');
    
        console.log(err instanceof CustomError);
        console.log(err instanceof Error);
        console.log(err instanceof Object);
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    すべてのチェックは `true` を返します。`CustomError` は `Error` を継承し、`Error` は `Object` を継承しています。`instanceof` 演算子はプロトタイプチェーン全体を確認するので、`CustomError` のインスタンスは `Error` と `Object` のインスタンスでもあります。
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={3}
  group="型チェックの裏技"
  title="クロスフレーム instanceof"
  options={[
    {text: '常に true'},
    {text: '常に false'},
    {text: 'フレーム間では false になることがある', isAnswer: true},
    {text: 'エラーがスローされる'},
  ]}
>
  <slot name="question">
  <div className="question">
    iframe 間で `instanceof Error` はどうなる？
    ```js
        // In iframe:
        const iframeError = new Error('test');
        // In parent window:
        console.log(iframeError instanceof Error);
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    `instanceof` は異なる実行コンテキスト（iframe や worker）間では `false` を返すことがあります。各コンテキストは独自の `Error` コンストラクタを持っているためです。コンテキストを超えて確実にエラーを判定したい場合は `Object.prototype.toString.call(obj) === '[object Error]'` を使いましょう。
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={4}
  group="非Errorのスロー"
  title="文字列スロー"
  options={[
    {text: 'TypeError: 文字列はErrorではありません'},
    {text: 'false, "string"', isAnswer: true},
    {text: '自動的にErrorオブジェクトを作成する'},
    {text: '未定義の動作'},
  ]}
>
  <slot name="question">
  <div className="question">
    文字列をthrowしたらどうなる？
    ```js
        try {
          throw "Oops!";
        } catch (e) {
          console.log(e instanceof Error);
          console.log(typeof e);
        }
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    JavaScriptでは任意の値をthrowできる。ここでは `e instanceof Error` は `false` で、`typeof e` は `"string"` になる。これにより、捕捉した例外がすべてErrorオブジェクトであると想定したエラーハンドリングコードが壊れる可能性がある。デバッグしやすくするため、常にErrorインスタンスをthrowしよう。
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={5}
  group="カスタムエラー"
  title="エラー名プロパティ"
  options={[
    {text: '"Error"'},
    {text: '"CustomError"', isAnswer: true},
    {text: 'undefined'},
    {text: 'ブラウザ次第'},
  ]}
>
  <slot name="question">
  <div className="question">
    `err.name` の値は何ですか？
    ```js
        class CustomError extends Error {
          constructor(message) {
            super(message);
            this.name = this.constructor.name;
          }
        }
        const err = new CustomError('test');
        console.log(err.name);
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    `err.name` は `"CustomError"` です。なぜなら `this.constructor.name` がクラス名を返すからです。`this.name = this.constructor.name` を設定するのは、カスタムエラークラスがスタックトレースやエラーメッセージで正しい名前を表示するようにする一般的なパターンです。
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={6}
  group="カスタムエラー"
  title="コンストラクタ名の罠"
  options={[
    {text: '"MyError"'},
    {text: '"Error"', isAnswer: true},
    {text: 'undefined'},
    {text: 'TypeError'},
  ]}
>
  <slot name="question">
  <div className="question">
    `name` を設定しない場合の出力は？
    ```js
        class MyError extends Error {
          // No constructor or name setting
        }
        const err = new MyError('test');
        console.log(err.name);
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    `this.name` を明示的に設定しないと、エラーは `Error` クラスからデフォルトの `name` プロパティ（`"Error"`）を継承します。だからカスタムエラークラスではコンストラクタ内で必ず `this.name = this.constructor.name` を設定すべきです。
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={7}
  group="エラー原因"
  title="モダン Error.cause"
  options={[
    {text: '"Original error"', isAnswer: true},
    {text: 'undefined'},
    {text: 'ラップされたエラー'},
    {text: 'SyntaxError'},
  ]}
>
  <slot name="question">
  <div className="question">
    `wrapper.cause.message` は何を返す？
    ```js
        const original = new Error('Original error');
        const wrapper = new Error('Wrapper', 
          { cause: original }
        );
        console.log(wrapper.cause.message);
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    `Error.cause`（ES2022）はエラーをチェーンさせ、元のエラーコンテキストを保持できる。`wrapper.cause` は元のエラーを指すので、`wrapper.cause.message` は `"Original error"` を返す。これは下位レベルのエラーを上位コンテキストでラップする際に便利だ。
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={8}
  group="スタックトレース"
  title="スタック操作"
  options={[
    {text: 'スタックから createError を削除する', isAnswer: true},
    {text: 'スタック全体をクリアする'},
    {text: '何もしない'},
    {text: 'TypeError をスローする'},
  ]}
>
  <slot name="question">
  <div className="question">
    `Error.captureStackTrace` は何をしますか？
    ```js
        function createError(msg) {
          const err = new Error(msg);
          Error.captureStackTrace(err, createError);
          return err;
        }
        const error = createError('test');
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    `Error.captureStackTrace`（V8/Node.js）は、指定した関数（`createError`）をスタックトレースから除外し、エラーファクトリ関数をエンドユーザーに見えなくします。これにより、ファクトリが呼び出された場所を指す、よりクリーンなスタックトレースが得られます。
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={9}
  group="メッセージテンプレート"
  title="エラーでのテンプレートリテラル"
  options={[
    {text: '"Value ${value} is invalid"'},
    {text: '"Value undefined is invalid"', isAnswer: true},
    {text: 'ReferenceError: value is not defined'},
    {text: '"Value  is invalid"'},
  ]}
>
  <slot name="question">
  <div className="question">
    エラーメッセージは何ですか？
    ```js
        function validate(value) {
          if (!value) {
            throw new Error(
              `Value ${value} is invalid`
            );
          }
        }
        try {
          validate(undefined);
        } catch (e) {
          console.log(e.message);
        }
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    テンプレートリテラルは補間時に `undefined` を文字列 `"undefined"` に変換します。エラーメッセージは `"Value undefined is invalid"` になります。よりクリーンなメッセージにするには、補間前に `value ?? 'null'` などのチェックを検討してください。
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={10}
  group="API の落とし穴"
  title="Express レスポンスエラー"
  options={[
    {text: 'エラーオブジェクト全体を送信する'},
    {text: '`{"error":{}}` を送信する', isAnswer: true},
    {text: 'サーバーエラーをスローする'},
    {text: 'エラーメッセージだけを送信する'},
  ]}
>
  <slot name="question">
  <div className="question">
    クライアントに何が送られる？
    ```js
        // Express.js route
        app.get('/api/data', (req, res) => {
          const error = new Error('Database failed');
          res.json({ error });
        });
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    `res.json()` は内部で `JSON.stringify()` を使用するため、Error オブジェクトは `{}` になります。クライアントは `{"error":{}}` を受け取ります。これを修正するには、`res.json({ error: error.message })` または `res.json({ error: { message: error.message, name: error.name } })` を使用します。
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={11}
  group="非同期エラー"
  title="Promise の拒否値"
  options={[
    {text: '常に Error オブジェクト'},
    {text: '任意の値を拒否できる', isAnswer: true},
    {text: '文字列と Error オブジェクトだけ'},
    {text: '自動的に Error にラップされる'},
  ]}
>
  <slot name="question">
  <div className="question">
    `Promise.reject()` は何を受け取れる？
    ```js
        Promise.reject('string').catch(e => 
          console.log(typeof e)
        );
        Promise.reject({code: 404}).catch(e => 
          console.log(e.code)
        );
        Promise.reject(42).catch(e => 
          console.log(e)
        );
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    `throw` と同様に、`Promise.reject()` は任意の値（文字列、オブジェクト、数値など）を受け取れます。これにより `"string"`、`404`、`42` が出力されます。Promise チェーンで捕捉した値の型は常に確認しましょう。特にサードパーティのコードが Error 以外で拒否する可能性がある場合は注意が必要です。
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={12}
  group="エラー プロパティ"
  title="非標準プロパティ"
  options={[
    {text: '常に利用可能'},
    {text: 'すべての環境で存在しない可能性がある', isAnswer: true},
    {text: 'Node.js のみ'},
    {text: '非推奨で削除された'},
  ]}
>
  <slot name="question">
  <div className="question">
    `error.code` と `error.errno` の信頼性はどれくらいですか？
    ```js
        const fs = require('fs');
        fs.readFile('missing.txt', (err, data) => {
          if (err) {
            console.log(err.code);    // 'ENOENT'
            console.log(err.errno);   // -2
          }
        });
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    `code` や `errno` のようなプロパティは環境固有（この場合は Node.js）で、標準の Error オブジェクトには含まれません。ブラウザのエラーにはこれらのプロパティはありません。常に存在を確認しましょう：`if (err.code === 'ENOENT')` のように、存在すると仮定しないでください。
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={13}
  group="エラーバウンダリ"
  title="オブジェクト vs エラー検出"
  options={[
    {text: 'true, true'},
    {text: 'false, false', isAnswer: true},
    {text: 'true, false'},
    {text: 'false, true'},
  ]}
>
  <slot name="question">
  <div className="question">
    これらのチェックは何を返す？
    ```js
        const fakeError = {
          name: 'Error',
          message: 'Fake error',
          stack: 'fake stack'
        };
    
        console.log(fakeError instanceof Error);
        console.log(Object.prototype.toString.call(
          fakeError
        ) === '[object Error]');
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    `instanceof Error` はオブジェクトが Error コンストラクタで作られていないため `false` を返す。`Object.prototype.toString.call()` も `false` を返す（実際は `'[object Object]'` が返る）ので、内部の `[[Class]]` スロットをチェックしている。両方の手法ともこの偽エラーオブジェクトを正しく判別している。
  </div>
  </slot>
</Challenge>

</QuizUI>

## エラーハンドリングの極意

シリアライズの落とし穴からクロスコンテキストの `instanceof` 失敗まで、こういった高度な概念がジュニア開発者と、​すでに​傷だらけの​ベテラン​を分けます。

もっと挑戦したいですか？ 追加の JavaScript、アルゴリズム、その他の脳トレが揃った [全クイズコレクション](/challenges/) をチェックしてください。
````
