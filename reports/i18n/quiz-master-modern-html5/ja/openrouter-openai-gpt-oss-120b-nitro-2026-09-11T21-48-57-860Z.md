# Translation Candidate
- Slug: quiz-master-modern-html5
- Locale: ja
- Model: openrouter/openai/gpt-oss-120b:nitro
- Target: src/content/posts/2024-11-01--quiz-master-modern-html5/ja/index.mdx
- Validation: deferred
- Runtime seconds: 18.10
- Input tokens: 13141
- Output tokens: 7313
- Thinking tokens: unknown
- Cached input tokens: 5248
- Cache write tokens: 0
- Estimated cost: $0.001829
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
title: クイズ：HTMLはまだ履歴書に書くべきか？
subTitle: 実力を証明しろ！
label: Semantic HTML5
social_image: ../desktop-social.webp
category: Quiz
subCategory: HTML
modified: '2024-11-06'
tags:
  - quiz
  - web
  - quiz
  - semantic
  - html5
  - web
  - beginner
  - intermediate
cover_full_width: ../jakob-owens-FBih1nqPi0w-unsplash-wide.webp
cover_mobile: ../jakob-owens-FBih1nqPi0w-unsplash-square.webp
cover_icon: ../jakob-owens-FBih1nqPi0w-unsplash-square.webp
---
import Challenge from '../../../../components/QuizUI/Challenge';
import QuizUI from '../../../../components/QuizUI/QuizUI';


## で、HTML5のスキルがあると思ってるのか？

After all, you know your `<div>` from your `<span>`, right? But how well do you know the more advanced, semantic elements in HTML5?

> Note: If you can't pass this test, you legally have to remove `HTML Skills` from your Resume.

### 開始！

<QuizUI>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={0}
  group="ウォームアップ"
  title="`<ul>` の役割"
  options={[
    {text: '順序なしリスト', isAnswer: true},
    {text: 'ユニークリスト'},
    {text: 'ユニバーサルリスト'},
    {text: 'ユーザーリスト'},
  ]}
>
  <slot name="question">
  <div className="question">
    HTMLで `<ul>` 要素の主な役割は何ですか？
  </div>
  </slot>

  <slot name="explanation">
  <div className="explanation">
    `<ul>` タグは順序なしリストを作成し、項目は通常箇条書きの丸印で示されます。
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={1}
  group="高度なセマンティック HTML"
  title="`<dd>` の使い方"
  options={[
    {text: '説明の定義'},
    {text: '説明用語'},
    {text: 'データ表示'},
    {text: '説明の詳細', isAnswer: true},
  ]}
>
  <slot name="question">
  <div className="question">
    `<dd>` 要素は HTML で何を表しますか？
  </div>
  </slot>

  <slot name="explanation">
  <div className="explanation">
    The [`<dd>` element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dd) defines a description, definition, or value in a description list, used within `<dl>` tags to pair with `<dt>` (_Description Term_).

    This is useful when showing key-value data. Profile information, Settings, and Stats are a common examples.
    ```html
        <dl>
        <dt>JS</dt>
        <dd>Client-side</dd>
        <dd>Server-side</dd>

        <dt>HTML</dt>
        <dd>Client-side</dd>
        </dl>
    ```
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={2}
  group="高度なセマンティック HTML"
  title="`<figure>` と `<figcaption>` の使い方"
  options={[
    {text: '著作権情報を表示する画像の場合'},
    {text: '画像やチャートなどを説明する場合', isAnswer: true},
    {text: '表や計算結果などに注釈を付ける場合'},
    {text: '動画にキャプションを付ける場合'},
  ]}
>
  <slot name="question">
  <div className="question">
    `<figure>` と `<figcaption>` 要素はいつ使うべきですか？
  </div>
  </slot>

  <slot name="explanation">
  <div className="explanation">
    `<figure>`（[MDN リファレンス](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/figure)）は、画像やチャートなどの自己完結型メディアコンテンツをラップし、`<figcaption>`（[MDN リファレンス](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/figcaption)）でキャプションを提供するために通常使用されます。

    画像、図、コードスニペットなどに便利です。
    ```html
        <figure>
        <img src="image.jpg" alt="Description of image">
        <figcaption>Image caption</figcaption>
        </figure>
    ```
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={3}
  group="高度なセマンティックHTML"
  title="`<article>` の使用方法"
  options={[
    {text: 'For content, sidebars & copyright info'},
    {text: '独立したコンテンツセクション', isAnswer: true},
    {text: 'Part of a <newsletter>'},
    {text: 'ニュース記事を定義する'},
  ]}
>
  <slot name="question">
  <div className="question">
    HTML の `<article>` 要素の目的は何ですか？
  </div>
  </slot>

  <slot name="explanation">
  <div className="explanation">
    `<article>` 要素は、独立して配布または再利用できるコンテンツの単位を定義するために使用されます。

    これはブログ投稿、ニュース記事、フォーラム投稿、ユーザーコメントなどによく使われます。

    ページ上に複数の article を使用できます（例えば無限スクロールページなど）。また、互いに入れ子にして「独立したコンテンツ」の階層を作ることもできます。
    ```html
        <article>
        <h2>Article Title</h2>
        <p>Article content...</p>
        <article class="discussion">
        <h3>Comment by User</h3>
        <p>Comment content...</p>
        </article>
        </article>
    ```
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={4}
  group="高度なセマンティックHTML"
  title="「<fieldset>/<legend>」の使い方"
  options={[
    {text: 'タイトル付きでフォーム要素をグループ化する', isAnswer: true},
    {text: 'フォームフィールドの指示を定義する'},
    {text: 'Not a valid use of <legend>'},
    {text: '展開可能なセクションを定義する'},
  ]}
>
  <slot name="question">
  <div className="question">
    フォーム内で `<fieldset>` と `<legend>` 要素は何のために使うのですか？
  </div>
  </slot>

  <slot name="explanation">
  <div className="explanation">
    [`<fieldset>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/fieldset) は関連するフォームコントロールをまとめるために使用され、`<legend>` はそのグループにタイトル/ラベルを付けてアクセシビリティを向上させます。

    例えば、配送先住所や支払い情報といった関連するフォーム要素をひとつのセクションにまとめる際に便利です。
    ```html
        <fieldset>
        <legend>Shipping Address</legend>
        <label for="name">Name:</label>
        <input type="text" id="name" name="name">
        ...
        </fieldset>
        <fieldset>
        <legend>Payment Details</legend>
        <label for="card">Card Number:</label>
        <input type="text" id="card" name="card">
        ...
        </fieldset>
    ```
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={5}
  group="高度なセマンティックHTML"
  title="`<meter>` の目的"
  options={[
    {text: 'メートル単位のプログレスバー'},
    {text: '範囲内の数値を表す', isAnswer: true},
    {text: '距離をメートルに変換する'},
    {text: '特殊なパフォーマンス関連タグ'},
  ]}
>
  <slot name="question">
  <div className="question">
    `<meter>` 要素の目的は何ですか？
  </div>
  </slot>

  <slot name="explanation">
  <div className="explanation">
    The [`<meter>` element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/meter) は、温度、ディスク使用量、投票集計など、設定された範囲内のスカラー（単一）測定値を表すために使用されます。

    It may seem similar to a [`<progress>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/progress) bar, however progress bars **常に** start at zero. Therefore `<progress>` elements show a `percent of completion`, while a `<meter>` shows any value within a definable range.
    ```html
        <meter min="-60" max="130" value="75" /> 75°F
        <meter min="0" max="100" value="75" /> 75%
    ```
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={6}
  group="セマンティック HTML"
  title="`<source>` の使用方法"
  options={[
    {text: 'データソースを定義するために使用されます'},
    {text: 'Declare available media file format(s)', isAnswer: true},
    {text: 'APA または MLA 形式で情報源を引用する'},
    {text: 'ソースコードブロックを定義する'},
  ]}
>
  <slot name="question">
  <div className="question">
    `<source>` 要素はなぜ使用されるのか？
  </div>
  </slot>

  <slot name="explanation">
  <div className="explanation">
    利用可能なメディア形式を指定するために [`<source>` 要素が使用されます](https://developer.mozilla.org/en-us/docs/web/html/element/source)。

    特に [`<video>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/video)、[`<audio>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/audio)、[`<picture>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/picture) 要素と組み合わせて使用され、ブラウザが最適な形式を選択できるようにします。
    ```html
        <video controls>
        <source src="movie.mp4" type="video/mp4">
        <source src="movie.ogg" type="video/ogg">
        </video>
    ```
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={7}
  group="高度なセマンティックHTML"
  title="`<hgroup>` の使い方"
  options={[
    {text: 'レガシー要素で、もはや使用されていません'},
    {text: '見出しをまとめるため'},
    {text: '目次を定義する'},
    {text: '見出しとそのサブタイトルをグループ化する', isAnswer: true},
  ]}
>
  <slot name="question">
  <div className="question">
    `<hgroup>` 要素はどう使うべきですか？
  </div>
  </slot>

  <slot name="explanation">
  <div className="explanation">
    `<hgroup>` 要素は見出しと関連する二次コンテンツ（通常は `<p>` 要素が1つ以上）をグループ化します。

    見出しにサブタイトルやタグライン、別名タイトルがあり、文書アウトラインで別の見出しにしたくない場合に便利です。
    ```html
        <article>
        <hgroup>
        <h1>Frankenstein</h1>
        <p>Or: The Modern Prometheus</p>
        </hgroup>
        <section>
        <h2>Chapter 1</h2>
        <p>...</p>
        </section>
        </article>
    ```
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={8}
  group="高度なセマンティックHTML"
  title="`<menu>` の使用法"
  options={[
    {text: '順序付きリストを定義するため'},
    {text: 'コマンドやツールバーのコントロールを列挙するため', isAnswer: true},
    {text: 'ナビゲーションバーを表すため'},
    {text: 'ボタンのグループを定義するため'},
  ]}
>
  <slot name="question">
  <div className="question">
    `<menu>` 要素は HTML で何に使われますか？
  </div>
  </slot>

  <slot name="explanation">
  <div className="explanation">
    The [`<menu>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/menu) はコマンドやインタラクティブなコントロールのリストを表します。

    リストがナビゲーションリンクの場合は、`<nav>` と `<ul>` を使用してください。ツールバー風のコントロールやコマンドリストには `<menu>` を使います。
    ```html
        <menu>
        <li><button type="button">Copy</button></li>
        <li><button type="button">Paste</button></li>
        </menu>
    ```
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={9}
  group="高度なセマンティックHTML"
  title="`<details>/<summary>` の役割"
  options={[
    {text: 'ネイティブな折りたたみ可能コンテンツ', isAnswer: true},
    {text: 'ネイティブツールチップ'},
    {text: 'Add context to <section>'},
    {text: '構造化データを表示するため'},
  ]}
>
  <slot name="question">
  <div className="question">
    HTMLで `<details>` と `<summary>` はどんな役割を果たしますか？
  </div>
  </slot>

  <slot name="explanation">
  <div className="explanation">
    [`<details>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/details) は折りたたみ可能なコンテンツを提供し、[`<summary>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/summary) はそのコンテンツの表示タイトルを指定します。

    これはFAQや折りたたみセクション、または切り替え可能な任意のコンテンツに便利です。
    ```html
        <details>
        <summary>Click to expand 🤯</summary>
        <p>Hidden content! 💥</p>
        </details>
    ```
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={10}
  group="高度なセマンティックHTML"
  title="`<dialog>` の目的"
  options={[
    {text: '脚本家向けのフォーマット'},
    {text: 'モーダルまたはポップアップを宣言する', isAnswer: true},
    {text: 'ChatGPTスタイルのチャットディスカッションを宣言する'},
    {text: 'Deprecated in favor of <wizard>'},
  ]}
>
  <slot name="question">
  <div className="question">
    `<dialog>` 要素はなぜ使うべきですか？
  </div>
  </slot>

  <slot name="explanation">
  <div className="explanation">
    The [`<dialog>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dialog) 要素はポップアップやモーダルに使用され、セマンティックなマークアップ、拡張CSS、そしてこれらのインタラクション用のネイティブAPIを提供します。

    JavaScriptで `.showModal()` を使ってモーダルダイアログを、 `.show()` を使って非モーダルダイアログを開き、 `.close()` または `method="dialog"` を使用したフォーム送信で閉じます。
    ```html
        <dialog>
        <h2>Modal Title</h2>
        <p>Modal content...</p>
        <button>Close</button>
        </dialog>
    ```
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={11}
  group="高度なセマンティック HTML"
  title="`<time>` の使い方"
  options={[
    {text: '日付と時刻を表すため', isAnswer: true},
    {text: 'タイムスタンプを定義するため'},
    {text: '日付のみをフォーマットするため'},
    {text: '日付入力をドラッグ可能にするため'},
  ]}
>
  <slot name="question">
  <div className="question">
    `<time>` 要素は HTML でどのように使われますか？
  </div>
  </slot>

  <slot name="explanation">
  <div className="explanation">
    `<time>` 要素は日付、時刻、または期間を表すために使用されます。人間が読めるコンテンツと、機械が解釈できる `datetime` 属性を併せて記述できます。HTML には `<date>` 要素は存在しません。
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={12}
  group="高度なセマンティックHTML"
  title="ARIA属性の目的"
  options={[
    {text: 'タッチデバイス向けのヘルパー'},
    {text: 'アクセシビリティを向上させる', isAnswer: true},
    {text: 'Control sounds & playback'},
    {text: 'To only use <div>\'},
  ]}
>
  <slot name="question">
  <div className="question">
    ARIA属性の目的は何ですか？
  </div>
  </slot>

  <slot name="explanation">
  <div className="explanation">
    ARIA（Accessible Rich Internet Applications）属性は、スクリーンリーダーやその他の支援技術に追加のコンテキストを提供することで、ウェブのアクセシビリティを向上させます。

    要素を記述するために使用できるロール、状態、プロパティがあります。
    ```html
        <button aria-label="Close" aria-expanded="true">X</button>
        <main aria-live="polite">...</main>
        <dialog
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="dialog_label"
        aria-describedby="dialog_desc"
        ></dialog>
    ```
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={13}
  group="高度なセマンティックHTML"
  title="`role`属性の使用"
  options={[
    {text: 'コンポーネントの動作を定義するため'},
    {text: '要素の目的を記述するため', isAnswer: true},
    {text: '要素へのアクセスを制限するため'},
    {text: 'Webコンポーネント専用'},
  ]}
>
  <slot name="question">
  <div className="question">
    HTMLで`role`属性は何に使われますか？
  </div>
  </slot>

  <slot name="explanation">
  <div className="explanation">
    `role`属性は

    要素の目的を支援技術に伝え、アクセシビリティ向上に役立ちます。
  </div>
  </slot>
</Challenge>

</QuizUI>

では、どうでしたか？次のプロジェクトでより多くのセマンティック HTML 要素を使うのが楽しみですか？ 🚀

それとも、永遠に `<div>` と `<span>` に甘んじるつもりですか？ 😅

コメントで教えてください！ 👇
````
