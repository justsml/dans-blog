# Translation Candidate
- Slug: js-quiz-14-date-time-questions-test-your-knowledge
- Locale: ja
- Model: openrouter/deepseek/deepseek-v4-flash
- Target: src/content/posts/2020-01-02--js-quiz-14-date-time-questions-test-your-knowledge/ja/index.mdx
- Validation: deferred
- Runtime seconds: 406.70
- Input tokens: 15761
- Output tokens: 27785
- Thinking tokens: unknown
- Cached input tokens: 768
- Cache write tokens: 0
- Estimated cost: $0.009881
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
title: クイズ：JavaScript Date 14問
subTitle: JSトリビアでパーティーを盛り上げよう！✨
label: Dates & Times
modified: '2024-11-27'
tags:
  - quiz
  - javascript
  - date
  - date
  - gotchas
  - challenge
  - intermediate
social_image: ../desktop-social.webp
category: Quiz
subCategory: JavaScript
cover: ../pocket-watch.webp
cover_mobile: ../w300_pocket-watch.webp
cover_icon: ../icon_pocket-watch.webp
---
import Challenge from '../../../../components/QuizUI/Challenge';
import QuizUI from '../../../../components/QuizUI/QuizUI';

## `Date`クラスについてどれだけ知っていますか？

> * **JavaScriptのスキルを証明せよ！** 🚀
> * ログインやサインアップは不要。 ✨
> * 選択問題。 🤖 …… _どれほど難しいっていうの？_

### 概要

JavaScriptの`Date`クラスは、悪名高いほど扱いづらいAPIを持つ。これはJavaから継承されたもので、たぶん古代新石器時代の時間計測方法に触発されたとしか思えない。

`Date`を扱う苦労から、多くの開発者は何の疑問も持たずにサードパーティライブラリを使うようになる。多くの場合それは安全で信頼できる選択だが、日付のフォーマットやローカライゼーションにこれらのライブラリが必要になることはほとんどない。

このクイズは、ネイティブの`Date` APIに関する知識を試し、深めるために作られている。ヒントや解説が必要なときは緑色のボタンを使おう！このチャレンジを終える頃には、JavaScriptの`Date`に対する理解が確かなものになっているはずだ。

#### **注:** すべての例はGMT-7のローカルタイムゾーンを想定しています。

### 👇 以下の14問 👇

<QuizUI>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={0}
  group="日付の扱い"
  title="Dateコンストラクタ パート1"
  options={[
    {text: '2020年1月1日'},
    {text: '2020年2月1日', isAnswer: true},
    {text: 'RangeError: Invalid argument.'},
  ]}
>
  <slot name="question">
  <div className="question">
    出力には何が含まれますか？
    ```js
        const d1 = new Date(2020, 1, 1)
        console.log(d1)
    ```
  </div>
  </slot>

  <slot name="explanation">
  <div className="explanation">
    月の引数は0から始まります。西暦では0〜11の範囲です。

    '2月' のインデックス値は1です（配列のルックアップと考えてください）。
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={1}
  group="日付の扱い"
  title="Dateコンストラクタ パート2"
  options={[
    {text: 'Jan 01 2020', isAnswer: true},
    {text: 'Feb 01 2020'},
    {text: 'RangeError: Invalid argument.'},
  ]}
>
  <slot name="question">
  <div className="question">
    出力には何が含まれますか？
    ```js
        const d2 = new Date(2020, 0, 1)
        console.log(d2)
    ```
  </div>
  </slot>

  <slot name="explanation">
  <div className="explanation">
    月の引数はゼロベースです。範囲は0〜11（西暦を使用）。

    'January' のインデックス値は0です。（配列のルックアップのように考えてください。）
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={2}
  group="日付の操作"
  title="Dateコンストラクタ パート3"
  options={[
    {text: '1970年1月1日'},
    {text: 'Unixエポック（0）'},
    {text: '現在の日付（UTC/GMT）'},
    {text: '現在の日付', isAnswer: true},
    {text: 'NaN'},
    {text: 'RangeError: Invalid argument.'},
  ]}
>
  <slot name="question">
  <div className="question">
    出力には何が含まれますか？
    ```js
        const d3 = Date('Thu, 01 Jan 1970 00:00:00 GMT')
        console.log(d3)
    ```
  </div>
  </slot>

  <slot name="explanation">
  <div className="explanation">
    `new`キーワードを忘れないでください！`Date`はクラスなので、`new`を付けて呼び出す必要があります。

    `new`なしの`Date('...')`は引数を無視します。`new Date()`（引数なし）で現在の日時を常に生成するように見えます。

    これは**よくある落とし穴**で、コードレビューでも**見落としがち**です。
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={3}
  group="日付の取り扱い"
  title="Dateコンストラクタ その4"
  options={[
    {text: '1969', isAnswer: true},
    {text: '1970'},
    {text: '2019'},
    {text: '2020'},
    {text: '2021'},
    {text: 'RangeError: Invalid argument.'},
  ]}
>
  <slot name="question">
  <div className="question">
    出力に含まれるのはどれですか？
    ```js
          const date = new Date(2020)
          console.log(date.getFullYear())
    ```
  </div>
  </slot>

  <slot name="explanation">
  <div className="explanation">
    単一の整数引数で作成されたDateインスタンスは、Unixの`Epoch`値として解釈されます。`Epoch`は1970年1月1日からの経過ミリ秒です。

    `2020`ミリ秒の値は、1970年1月1日から2秒後を意味します。

    そして、ローカルタイムゾーンが-7時間のオフセットであるため、`Wed Dec 31 1969 17:00:02 GMT-0700 (Mountain Standard Time)`となります。

    ローカルタイムゾーンのオフセットを回避するには、[`.getUTCFullYear()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/getUTCFullYear)を使用します。
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={4}
  group="日付の扱い"
  title="日付文字列の解析"
  options={[
    {text: '2019 2020', isAnswer: true},
    {text: '2020 2021'},
    {text: '2020 2020'},
    {text: '2020 2019'},
  ]}
>
  <slot name="question">
  <div className="question">
    コンソールに出力される値は？
    ```js
          const d1 = new Date('2020-01-01')
          const d2 = new Date('2020-01-01T00:00')
          console.log(d1.getFullYear(), d2.getFullYear())
    ```
  </div>
  </slot>

  <slot name="explanation">
  <div className="explanation">
    `T` 時刻値のない文字列は一見 2020年1月1日のように見えますが、日付のみの文字列はUTCとして解釈され、現地のタイムゾーン（GMT-7）に調整すると2019年のままであることがわかります。

    タイムゾーンが明示されていない日時文字列は現地時間として解釈されます。

    `T00:00` 形式の場合、2番目の値は現地の真夜中として解釈されます。

    1番目の日付は `Tue Dec 31 2019 17:00:00 GMT-0700 (Mountain Standard Time)` として解釈されます。
    2番目の日付は `Wed Jan 01 2020 00:00:00 GMT-0700 (Mountain Standard Time)` として解釈されます。
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={5}
  group="日付の扱い"
  title="書式設定 パート1"
  options={[
    {text: 'new Intl.DateTimeFormat(\'},
    {text: 'date.toLocaleFormat(\', isAnswer: true},
    {text: 'date.toLocaleString(\'},
    {text: 'date.toLocaleDateString(\'},
  ]}
>
  <slot name="question">
  <div className="question">
    _誤った_書式設定メソッドを選択してください:
  </div>
  </slot>

  <slot name="explanation">
  <div className="explanation">
    `toLocaleFormat()` メソッドは標準ではありません！古いサードパーティライブラリ由来のものなので、見覚えがあるかもしれません。

    [`toLocaleDateString` ドキュメント](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleDateString) メソッドをチェックしてみてください。その動作は [`Intl.DateTimeFormat`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DateTimeFormat) に文書化されています。
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={6}
  group="日付の処理"
  title="UTC日付 パート1"
  options={[
    {text: 'Wed, 01 Jan 2020 00:00:00 GMT'},
    {text: 'Thu, 02 Jan 2020 00:00:00 GMT'},
    {text: 'TypeError', isAnswer: true},
    {text: 'NaN'},
  ]}
>
  <slot name="question">
  <div className="question">
    出力には何が含まれますか？
    ```js
          var date = Date.UTC('2020-01-02T00:00')
          console.log(date.toUTCString())
    ```
  </div>
  </slot>

  <slot name="explanation">
  <div className="explanation">
    `TypeError: date.toUTCString is not a function` となります。なぜなら、[`Date.UTC()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/UTC) はミリ秒単位の整数を返し、日付インスタンスではないからです。

    {/* [`getFullYear()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/getFullYear) メソッドはローカルのオフセット（これらの問題では GMT-07:00 と仮定）を使用します。そのため、前の年（NYE -7時間）が返されます。 [`getUTCFullYear()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/getUTCFullYear) メソッドは、`Date.UTC()` に指定した年である2020年を返します。 */}
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={7}
  group="日付の扱い"
  title="UTC日付 パート2"
  options={[
    {text: 'UTC基準の日付インスタンス'},
    {text: 'ローカルタイムゾーンに調整された日付インスタンス'},
    {text: '1970年1月1日GMTからのミリ秒', isAnswer: true},
    {text: 'エラー'},
  ]}
>
  <slot name="question">
  <div className="question">
    出力には何が含まれますか？
    ```js
          const d = Date.UTC(2020, 0, 1)
          console.log(d)
    ```
  </div>
  </slot>

  <slot name="explanation">
  <div className="explanation">
    ヘルパーメソッド [`Date.UTC`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/UTC) は日付インスタンスを返しません。ミリ秒単位の整数を返します。
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={8}
  group="日付の扱い方"
  title="UTC日付 パート3"
  options={[
    {text: '0'},
    {text: '420', isAnswer: true},
    {text: '700'},
    {text: '1400'},
    {text: 'null'},
  ]}
>
  <slot name="question">
  <div className="question">
    出力には何が含まれますか？
    ```js
          // Assume local TZ is -07:00
          const d = new Date(Date.UTC(2020, 0, 1))
          console.log(d.getTimezoneOffset())
    ```
  </div>
  </slot>

  <slot name="explanation">
  <div className="explanation">
    Dateの値は暗黙的にローカルタイムで表示され、（実質的に）変化しない[`.getTimezoneOffset()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/getTimezoneOffset)を持ちます。

    `Date`インスタンスはタイムゾーンデータを保存しません。Unixエポック（1970年1月1日）からのミリ秒数を保存します。タイムゾーンはDate文字列の解析と表示の際に考慮されます。デフォルトの表示動作は、システムまたはブラウザのロケール設定に基づいて自動的に決定されます。
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={9}
  group="日付の扱い"
  title="日付セッター パート1"
  options={[
    {text: '2020年1月1日', isAnswer: true},
    {text: '2020年2月1日'},
    {text: 'RangeError: Invalid argument.'},
  ]}
>
  <slot name="question">
  <div className="question">
    出力には何が含まれるでしょうか？
    ```js
          const d = new Date(2020, 0, 1)
          d.setDate(1)
          console.log(d)
    ```
  </div>
  </slot>

  <slot name="explanation">
  <div className="explanation">
    The [`.setDate()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/setDate) メソッドは、指定されたインスタンスの現在の月に基づいて、日（日付）を設定します。

    値が月の日数範囲外の場合、日付インスタンスの月が調整されます（例: 1月に `setDate(32)` を実行すると、2月1日として計算されます）。

    <aside class="hint">`setDate` は、通常1～31の範囲で月の日を設定します。</aside>
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={10}
  group="日付の操作"
  title="日付セッター パート2"
  options={[
    {text: '1月 01 2020'},
    {text: '2月 01 2020', isAnswer: true},
    {text: 'RangeError: Invalid argument.'},
  ]}
>
  <slot name="question">
  <div className="question">
    出力には何が含まれますか？
    ```js
          const d = new Date(2020, 0, 1)
          d.setMonth(1)
          console.log(d)
    ```
  </div>
  </slot>

  <slot name="explanation">
  <div className="explanation">
    [`.setMonth()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/setMonth)メソッドは、指定された日付インスタンスの月を設定します。

    月の引数は0から始まり、範囲は0-11です（西洋のカレンダーを使用）。
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={11}
  group="日付の取り扱い"
  title="日付のセッター パート3"
  options={[
    {text: '1月 01 2020'},
    {text: '1月 01 2021', isAnswer: true},
    {text: '2月 01 2020'},
    {text: 'RangeError: Invalid argument.'},
  ]}
>
  <slot name="question">
  <div className="question">
    出力には何が含まれますか？
    ```js
          const d = new Date(2020, 0, 1)
          d.setMonth(12)
          console.log(d)
    ```
  </div>
  </slot>

  <slot name="explanation">
  <div className="explanation">
    [`.setMonth()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/setMonth)メソッドは、指定された日付インスタンスの月を設定します。

    `month`引数は0から始まり、西暦のカレンダーでは0〜11の範囲の12の値があります。

    ここでは、`setMonth(12)`が11（12月）よりも1多いため、年が2021に調整されていることがわかります。
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={12}
  group="日付の取り扱い"
  title="日付セッター パート4"
  options={[
    {text: 'Jan 01 2020'},
    {text: 'Feb 01 2020'},
    {text: 'Jan 01 2021'},
    {text: 'Feb 01 2021', isAnswer: true},
    {text: 'RangeError: Invalid argument.'},
  ]}
>
  <slot name="question">
  <div className="question">
    出力には何が含まれますか？
    ```js
          const d = new Date(2020, 0, 1)
          d.setMonth(13)
          console.log(d)
    ```
  </div>
  </slot>

  <slot name="explanation">
  <div className="explanation">
    The [`.setMonth()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/setMonth) method sets the month of the given date instance.

    The month argument is zero-based, with a range of 0-11 (using western calendars.)

    Here we see the month and year is adjusted to February 2021, because `setMonth(13)` is 2 more than 11 (December).

    <aside class="hint">`setMonth` sets the month by index, 12 months are indexed from 0-11. </aside>
    <aside class="hint">
    Numbers outside the range of 0-11 will cause the year to over- or under-flow. For example, `setMonth(13)` will adjust the year to 2021 (in February because 13 is 2 more than 11).
    </aside>
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={13}
  group="日付の扱い"
  title="日付セッター パート5"
  options={[
    {text: '2020年1月1日'},
    {text: '2020年2月1日'},
    {text: '2019年1月1日'},
    {text: '2019年12月1日', isAnswer: true},
    {text: 'RangeError: Invalid argument.'},
  ]}
>
  <slot name="question">
  <div className="question">
    出力には何が含まれますか？
    ```js
          const d = new Date(2020, 0, 1)
          d.setMonth(-1)
          console.log(d)
    ```
  </div>
  </slot>

  <slot name="hints">
  <div className="hint">
    <aside class="hint">月の長さは均一ではなく、28日から31日の範囲です。</aside>
    <aside class="hint">`setDate`は月の日を設定します（通常1〜31の範囲）。負の数や`31`より大きい数は、日と月を調整し、時には驚くような結果になります。</aside>
  </div>
  </slot>

  <slot name="explanation">
  <div className="explanation">
    [`.setMonth()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/setMonth) メソッドは、指定された日付インスタンスの月を設定します。

    月の引数は0から始まり、0〜11の範囲です（西洋の暦を使用）。

    ここでは、月と年が2019年12月に戻っています。これは、`setMonth(-1)` が0（1月）より小さいためです。
  </div>
  </slot>
</Challenge>

</QuizUI>
````
