# Translation Candidate
- Slug: quiz-master-modern-html5
- Locale: ja
- Model: openrouter/deepseek/deepseek-v4-flash
- Target: src/content/posts/2024-11-01--quiz-master-modern-html5/ja/index.mdx
- Validation: deferred
- Runtime seconds: 222.11
- Input tokens: 11016
- Output tokens: 14722
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- Estimated cost: $0.005664
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
title: クイズ：HTMLはまだ履歴書に載せるべき？
subTitle: 実力を示せ
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
---
import Challenge from '../../../../components/QuizUI/Challenge';
import QuizUI from '../../../../components/QuizUI/QuizUI';


## さて、あなたはHTML5のスキルがあると思っている？

もちろん、`<div>`と`<span>`の違いはわかりますよね？ でも、HTML5のより高度なセマンティック要素をどれだけ知っていますか？

> 注意：このテストに合格できない場合、履歴書から「HTMLスキル」を削除することが法的に義務付けられます。

### スタート！

<QuizUI>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={0}
  group="ウォームアップ"
  title="`<ul>` の役割"
  options={[
    {text: '順序なしリスト', isAnswer: true},
    {text: 'ユニークリスト'},
    {text: '汎用リスト'},
    {text: 'ユーザーリスト'},
  ]}
>
  <slot name="question">
  <div className="question">
    HTMLにおける `<ul>` 要素の主な役割は何ですか？
  </div>
  </slot>

  <slot name="explanation">
  <div className="explanation">
    `<ul>` タグは順序なしリストを作成し、項目は通常箇条書きで表示されます。
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={1}
  group="高度なセマンティックHTML"
  title="`<dd>`の使い方"
  options={[
    {text: '説明の定義'},
    {text: '説明の用語'},
    {text: 'データ表示'},
    {text: '説明の詳細', isAnswer: true},
  ]}
>
  <slot name="question">
  <div className="question">
    HTMLにおいて、`<dd>`要素は何を表しますか？
  </div>
  </slot>

  <slot name="explanation">
  <div className="explanation">
    [`<dd>`要素](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dd)は、説明リスト内の説明、定義、または値を定義し、`<dl>`タグ内で`<dt>`（説明用語）と組み合わせて使用されます。

    これは、キーと値のデータを表示する場合に便利です。プロフィール情報、設定、統計などが一般的な例です。
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
  group="高度なセマンティックHTML"
  title="`<figure>`/`<figcaption>`の使い方"
  options={[
    {text: '著作権情報を表示する画像に対して'},
    {text: '画像やチャートなどの説明に', isAnswer: true},
    {text: '表や計算結果などに注釈を付けるために'},
    {text: '動画にキャプションを付けるために'},
  ]}
>
  <slot name="question">
  <div className="question">
    `<figure>`要素と`<figcaption>`要素はいつ使うべきですか？
  </div>
  </slot>

  <slot name="explanation">
  <div className="explanation">
    `<figure>`タグは、画像やチャートなどの自己完結型の（メディア）コンテンツをラップし、`<figcaption>`と共にキャプションを提供するために使用されます。画像、図表、コードスニペットなどに便利です。
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
  group="上級セマンティックHTML"
  title="`<article>`要素の使い方"
  options={[
    {text: 'For content, sidebars & copyright info'},
    {text: '独立したコンテンツセクション', isAnswer: true},
    {text: 'Part of a <newsletter>'},
    {text: 'ニュース記事を定義する'},
  ]}
>
  <slot name="question">
  <div className="question">
    `<article>`要素の目的は何ですか？
  </div>
  </slot>

  <slot name="explanation">
  <div className="explanation">
    [`<article>` 要素](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/article) は、独立して配布または再利用できるスタンドアロンのコンテンツを定義するために使用されます。

    ブログ投稿、ニュース記事、フォーラムの投稿、ユーザーコメントによく使用されます。

    ページ上で複数の`<article>`要素を使用できます（例：無限スクロールページ）。または、それらを互いにネストして「スタンドアロンコンテンツ」の階層を作成することもできます。
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
  title="`<fieldset>/<legend>` の使い方"
  options={[
    {text: 'フォーム要素をタイトルでグループ化する', isAnswer: true},
    {text: 'フォームフィールドの指示を定義する'},
    {text: 'Not a valid use of <legend>'},
    {text: '展開可能なセクションを定義する'},
  ]}
>
  <slot name="question">
  <div className="question">
    フォームにおける `<fieldset>` と `<legend>` 要素の目的は何ですか？
  </div>
  </slot>

  <slot name="explanation">
  <div className="explanation">
    [`<fieldset>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/fieldset) は関連するフォームコントロールをグループ化するために使用され、`<legend>` はグループにタイトル/ラベルを提供し、アクセシビリティを向上させます。

    これは、配送先住所や支払い詳細のようなセクションなど、関連するフォーム要素をグループ化するのに便利です。
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
  title="`<meter>`要素の目的"
  options={[
    {text: 'メートル単位のプログレスバー'},
    {text: '範囲内の数値を表す', isAnswer: true},
    {text: '距離をメートルに変換する'},
    {text: '特殊なパフォーマンス関連タグ'},
  ]}
>
  <slot name="question">
  <div className="question">
    `<meter>`要素の目的は何ですか？
  </div>
  </slot>

  <slot name="explanation">
  <div className="explanation">
    `<meter>`要素は、設定された範囲内のスカラー（単一の）測定値を表すために使用されます。例えば、温度、ディスク使用量、投票数などです。

    [`<progress>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/progress)バーに似ているように見えるかもしれませんが、プログレスバーは**常に**ゼロから始まります。したがって、`<progress>`要素は`percent of completion`を示すのに対し、`<meter>`は定義可能な範囲内の任意の値を示します。
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
  group="セマンティックHTML"
  title="`<source>`の使い方"
  options={[
    {text: 'データソースを定義するために使われる'},
    {text: 'Declare available media file format(s)', isAnswer: true},
    {text: 'APAやMLA形式でソースを引用する'},
    {text: 'ソースコードブロックを定義する'},
  ]}
>
  <slot name="question">
  <div className="question">
    `<source>`要素はなぜ使われますか？
  </div>
  </slot>

  <slot name="explanation">
  <div className="explanation">
    [`<source>`要素は利用可能なメディアフォーマットを指定するために使われます](https://developer.mozilla.org/en-us/docs/web/html/element/source)。

    特に[`<video>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/video)、[`<audio>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/audio)、[`<picture>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/picture)要素と共に使われ、ブラウザが最も適切なフォーマットを選択できるようにします。
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
  title="`<hgroup>`の使い方"
  options={[
    {text: 'レガシー要素であり、現在は使用されていない'},
    {text: '見出しをグループ化するため'},
    {text: '目次を定義する'},
    {text: '見出しとそのサブタイトルをグループ化する', isAnswer: true},
  ]}
>
  <slot name="question">
  <div className="question">
    `<hgroup>`要素はどのように使用すべきですか？
  </div>
  </slot>

  <slot name="explanation">
  <div className="explanation">
    `<hgroup>`要素は、見出しと関連する二次的なコンテンツ（通常は1つ以上の`<p>`要素）をグループ化します。

    見出しにサブタイトル、タグライン、または文書アウトラインに別の見出しとして表示されるべきではない代替タイトルがある場合に便利です。
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
  title="`<menu>`の使い方"
  options={[
    {text: '順序付きリストを定義する'},
    {text: 'コマンドやツールバーコントロールをリストする', isAnswer: true},
    {text: 'ナビゲーションバーを表す'},
    {text: 'ボタングループを定義する'},
  ]}
>
  <slot name="question">
  <div className="question">
    HTMLで`<menu>`要素は何に使われますか？
  </div>
  </slot>

  <slot name="explanation">
  <div className="explanation">
    [`<menu>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/menu) は、コマンドやインタラクティブなコントロールのリストを表します。

    リストがナビゲーションリンクの場合は、`<nav>`と`<ul>`を使用してください。`<menu>`はツールバーのようなコントロールやコマンドリストに使います。
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
    {text: 'ネイティブの折りたたみ可能なコンテンツ', isAnswer: true},
    {text: 'ネイティブのツールチップ'},
    {text: 'Add context to <section>'},
    {text: '構造化データを表示するため'},
  ]}
>
  <slot name="question">
  <div className="question">
    HTMLにおいて、`<details>` と `<summary>` はどのような役割を果たしますか？
  </div>
  </slot>

  <slot name="explanation">
  <div className="explanation">
    [`<details>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/details) は折りたたみ可能なコンテンツを可能にし、[`<summary>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/summary) はそのコンテンツの表示可能なタイトルを指定します。

    これはFAQ、折りたたみ可能なセクション、またはトグル可能なコンテンツに便利です。
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
  title="`<dialog>`の目的"
  options={[
    {text: '脚本家向けのフォーマット'},
    {text: 'モーダルまたはポップアップを宣言する', isAnswer: true},
    {text: 'ChatGPT風のチャット議論を宣言する'},
    {text: 'Deprecated in favor of <wizard>'},
  ]}
>
  <slot name="question">
  <div className="question">
    なぜ`<dialog>`要素を使うべきですか？
  </div>
  </slot>

  <slot name="explanation">
  <div className="explanation">
    The [`<dialog>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dialog) element is used for pop-ups or modals, and provides semantic markup, extended CSS, and a native API for these interactions.

    Use JavaScript to open it with `.showModal()` for modal dialogs or `.show()` for non-modal dialogs, and close it with `.close()` or a form submission using `method="dialog"`.
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
  group="高度なセマンティックHTML"
  title="`<time>`の使い方"
  options={[
    {text: '日付と時刻を表すため', isAnswer: true},
    {text: 'タイムスタンプを定義するため'},
    {text: '日付のみを整形するため'},
    {text: '日付入力フィールドをドラッグ可能にするため'},
  ]}
>
  <slot name="question">
  <div className="question">
    HTMLで`<time>`要素はどのように使われますか？
  </div>
  </slot>

  <slot name="explanation">
  <div className="explanation">
    `<time>`要素は日付、時刻、または期間を表すために使用されます。人間が読めるコンテンツと機械可読な`datetime`属性を含めることができます。HTMLには`<date>`要素はありません。
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={12}
  group="高度なセマンティックHTML"
  title="ARIA属性の目的"
  options={[
    {text: 'タッチデバイス用のヘルパー'},
    {text: 'アクセシビリティの向上', isAnswer: true},
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
    ARIA（Accessible Rich Internet Applications）属性は、スクリーンリーダーやその他の支援技術に追加のコンテキストを提供することで、ウェブアクセシビリティを向上させます。

    要素を説明するために使用できるロール、状態、プロパティがあります。
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
    {text: '要素の目的を説明するため', isAnswer: true},
    {text: '要素へのアクセスを制限する'},
    {text: 'Web Components専用'},
  ]}
>
  <slot name="question">
  <div className="question">
    HTMLにおける`role`属性の用途は何ですか？
  </div>
  </slot>

  <slot name="explanation">
  <div className="explanation">
    `role`属性は、要素の目的を支援技術に説明し、アクセシビリティの向上に役立ちます。
  </div>
  </slot>
</Challenge>

</QuizUI>

さて、結果はいかがでしたか？次のプロジェクトでもっとセマンティックなHTML要素を使うのが楽しみですか？🚀

それとも、一生`<div>`と`<span>`に甘んじる覚悟ですか？😅

コメントで教えてください！👇
````
