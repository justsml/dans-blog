# Translation Candidate
- Slug: js-quiz-14-date-time-questions-test-your-knowledge
- Locale: ja
- Model: openrouter/z-ai/glm-5.1
- Target: src/content/posts/2020-01-02--js-quiz-14-date-time-questions-test-your-knowledge/ja/index.mdx
- Validation: rejected: direct AI SDK translation failed
- Runtime seconds: 7.08
- Input tokens: unknown
- Output tokens: unknown
- Thinking tokens: unknown
- Cached input tokens: unknown
- Cache write tokens: unknown
- Estimated cost: unknown
- Pricing source: unknown
- Note: Command failed: bun run i18n:translate:chunked -- --slug js-quiz-14-date-time-questions-test-your-knowledge --locale ja --model openrouter/z-ai/glm-5.1 --chunk 18p --run-id 2026-07-08T17-29-05-902Z-69635 --run-lock-path /Users/dan/code/oss/dans-blog/.git/codex-i18n-translation-run.json (code 1)
## Raw Output

````mdx
---
title: クイズ：JavaScript 日付問題 14問
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

## `Date` クラスはどれだけ知っていますか？

> * **JavaScript の腕前を証明しよう！** 🚀  
> * ログインやサインアップは不要です。 ✨  
> * 選択式クイズです。 🤖 … _どれだけ簡単だと思う？_

### アウトライン

JavaScript の `Date` クラスは非常に扱いにくい API です。Java から継承されたもので、古代の新石器時代の時間計測手法をヒントにしたとしか考えられません。

`Date` の扱いに苦労すると、多くの開発者が疑問もなくサードパーティのライブラリに走ります。安全で信頼できる選択肢であることが多いですが、日付のフォーマットやローカライズだけならほとんどの場合不要です。

このクイズは、ネイティブ `Date` API の知識をテストし（さらに深め）るために作られました。緑のボタンでヒントや解説を確認してください！チャレンジの最後までに、JavaScript の `Date` に対する理解が確実に固まっているはずです。

#### **NOTE:** すべての例は GMT‑7 のローカルタイムゾーンを前提としています。


### 👇 以下 14 問 👇

<QuizUI>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={0}
  group="日付の取り扱い"
  title="Date コンストラクタ パート 1"
  options={[
    {text: '2020年1月01日'},
    {text: '2020年2月01日', isAnswer: true},
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
    Month 引数はゼロベースです。範囲は 0‑11（西暦カレンダー使用）。

    'February' のインデックス値は 1 です。（配列の参照のように考えてください。）
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={1}
  group="日付の取り扱い"
  title="Date コンストラクタ パート 2"
  options={[
    {text: '2020年1月01日', isAnswer: true},
    {text: '2020年2月01日'},
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
    Month 引数はゼロベースです。範囲は 0‑11（西暦カレンダーを使用）です。

    'January' のインデックス値は 0 です。（配列の参照のように考えてください。）
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={2}
  group="日付の取り扱い"
  title="Date コンストラクタ パート 3"
  options={[
    {text: '1970年1月1日'},
    {text: 'Unix エポック 0'},
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
    `new` キーワードを忘れずに！ `Date` はクラスで、`new` と共に呼び出す必要があります。

    `Date('...')` を `new` なしで呼ぶと、渡した引数は無視されます。常に `new Date()`（引数なし）と同じく現在の日付と時刻を生成するように見えます。

    これは **よくある落とし穴** で、コードレビューですら **見落としやすい** です。
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={3}
  group="日付の取り扱い"
  title="Date コンストラクタ パート 4"
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
    出力には何が含まれますか？
    ```js
          const date = new Date(2020)
          console.log(date.getFullYear())
    ```
  </div>
  </slot>

  <slot name="explanation">
  <div className="explanation">
    単一の整数引数で作成された Date インスタンスは、Unix `Epoch` 値として解釈されます。`Epoch` は 1970年1月1日からのミリ秒数です。

    `2020` の値（ミリ秒）は、1970年1月1日から 2 秒後に相当します。

    さらにローカルタイムゾーンが -7 時間の負のオフセットであるため、`Wed Dec 31 1969 17:00:02 GMT-0700 (Mountain Standard Time)` となります。

    ローカルタイムゾーンのオフセットを回避するには、[`.getUTCFullYear()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/getUTCFullYear) を使用できます。
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={4}
  group="日付の取り扱い"
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
    コンソールに出力される値は何ですか？
    ```js
          const d1 = new Date('2020-01-01')
          const d2 = new Date('2020-01-01T00:00')
          console.log(d1.getFullYear(), d2.getFullYear())
    ```
  </div>
  </slot>

  <slot name="explanation">
  <div className="explanation">
    The string without a `T` time value may appear to be Jan 1st, 2020 - but date-only strings are interpreted as UTC, and when adjusted to our local timezone (GMT-7) we find we're still in 2019.

    Date-time strings without an explicit timezone are interpreted in local time.

    The `T00:00` form causes the second value to be interpreted as local midnight.

    The first date is interpreted as `Tue Dec 31 2019 17:00:00 GMT-0700 (Mountain Standard Time)`.
    The second date is interpreted as `Wed Jan 01 2020 00:00:00 GMT-0700 (Mountain Standard Time)`.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={5}
  group="日付の取り扱い"
  title="フォーマット パート 1"
  options={[
    {text: 'new Intl.DateTimeFormat(\'},
    {text: 'date.toLocaleFormat(\', isAnswer: true},
    {text: 'date.toLocaleString(\'},
    {text: 'date.toLocaleDateString(\'},
  ]}
>
  <slot name="question">
  <div className="question">
    _誤った_ フォーマット方法を選択してください:
  </div>
  </slot>

  <slot name="explanation">
  <div className="explanation">
    メソッド `toLocaleFormat()` は標準ではありません！古いサードパーティライブラリから来ているので見覚えがあるかもしれません。

    [`toLocaleDateString` ドキュメント](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleDateString) メソッドを確認してください。その挙動は [`Intl.DateTimeFormat`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DateTimeFormat) に記載されています。
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={6}
  group="Handling Dates"
  title="UTC Dates Part 1"
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
    `TypeError: date.toUTCString is not a function` が発生します。これは [`Date.UTC()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/UTC) がミリ秒の整数を返し、Date インスタンスではないためです。

    {/* The [`getFullYear()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/getFullYear) method uses your local offset (assume GMT-07:00 for these questions.)
    Which means it will give the previous year (NYE -7 hours).
    The [`getUTCFullYear()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/getUTCFullYear) method will give the year as we supplied to `Date.UTC()`, 2020.
    */}
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={7}
  group="日付の取り扱い"
  title="UTC 日付 パート 2"
  options={[
    {text: 'UTC ベースの日付インスタンス'},
    {text: 'ローカルタイムゾーンに調整された日付インスタンス'},
    {text: '1970年1月1日 GMT からのミリ秒', isAnswer: true},
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
    ヘルパーメソッド [`Date.UTC`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/UTC) は日付インスタンスを返しません。ミリ秒の整数を返します。
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={8}
  group="Handling Dates"
  title="UTC Dates Part 3"
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
    Date は暗黙的にローカル時間で表示され、（実質的に）変わらない [`.getTimezoneOffset()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/getTimezoneOffset) が使用されます。

    `Date` インスタンスはタイムゾーン情報を保持しません。Unix エポック（Jan 1, 1970）からのミリ秒数を保持しています。タイムゾーンは Date 文字列の解析や表示時に考慮されます。デフォルトの表示動作はシステムまたはブラウザのロケール設定に基づいて自動的に決定されます。
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={9}
  group="日付の取り扱い"
  title="Date セッター パート 1"
  options={[
    {text: '2020年1月01日', isAnswer: true},
    {text: '2020年2月01日'},
    {text: 'RangeError: Invalid argument.'},
  ]}
>
  <slot name="question">
  <div className="question">
    出力には何が含まれますか？
    ```js
          const d = new Date(2020, 0, 1)
          d.setDate(1)
          console.log(d)
    ```
  </div>
  </slot>

  <slot name="explanation">
  <div className="explanation">
    The [`.setDate()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/setDate) method sets the day of the month, based on the given instance's current month.

    If a value is provided outside of the number of days available, the date instance month value will be adjusted (e.g. A `setDate(32)` in January will calculate as February 1st.)

    <aside class="hint">`setDate` sets the day of the month, typically in the range 1-31.</aside>
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={10}
  group="Handling Dates"
  title="Date Setters Part 2"
  options={[
    {text: '2020年1月01日'},
    {text: '2020年2月01日', isAnswer: true},
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
    The [`.setMonth()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/setMonth) メソッドは、指定された Date インスタンスの月を設定します。

    月の引数は 0 から始まり、範囲は 0‑11 です（西暦カレンダーを使用）。
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={11}
  group="Handling Dates"
  title="Date Setters Part 3"
  options={[
    {text: '2020年1月01日'},
    {text: '2021年1月01日', isAnswer: true},
    {text: '2020年2月01日'},
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
    The [`.setMonth()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/setMonth) method sets the month of the given date instance.

    `month` 引数は 0 から始まるインデックスで、0‑11 の 12 種類があります（西暦カレンダー使用）。

    ここでは `setMonth(12)` が 11（12 月）を超えているため、年が 2021 年に繰り上げられます。
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={12}
  group="日付の取り扱い"
  title="Date Setters パート4"
  options={[
    {text: '2020年1月01日'},
    {text: '2020年2月01日'},
    {text: '2021年1月01日'},
    {text: '2021年2月01日', isAnswer: true},
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
    `.setMonth()` メソッドは、対象の Date インスタンスの月を設定します。

    月の引数は 0 から始まるインデックスで、範囲は 0‑11（西暦カレンダー使用）です。

    ここでは `setMonth(13)` が 11（12月）を超えて 2 つ進むため、月と年が 2021 年 2 月に調整されます。

    <aside class="hint">`setMonth` はインデックスで月を設定し、12 か月は 0‑11 の範囲でインデックス付けされます。</aside>
    <aside class="hint">
    0‑11 の範囲外の数値を渡すと、年がオーバーフローまたはアンダーフローします。たとえば `setMonth(13)` は 11（12月）を超える 2 か月分として、年が 2021 年に、月が 2 月に調整されます。
    </aside>
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={13}
  group="Handling Dates"
  title="Date Setters Part 5"
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
    <aside class="hint">月は均一ではなく、28〜31日です。</aside>
    <aside class="hint">`setDate` は月の日を設定します。通常は 1〜31 の範囲です。負の数や `31` を超える数は、日や月が調整され、時に驚くような結果になります。</aside>
  </div>
  </slot>

  <slot name="explanation">
  <div className="explanation">
    The [`.setMonth()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/setMonth) メソッドは、指定された Date インスタンスの月を設定します。

    月の引数は0から始まり、範囲は0-11です（西暦カレンダー使用）。

    ここでは `setMonth(-1)` が 0 未満（January）になるため、月と年が 2019年12月に戻ります。
  </div>
  </slot>
</Challenge>

</QuizUI>
````
