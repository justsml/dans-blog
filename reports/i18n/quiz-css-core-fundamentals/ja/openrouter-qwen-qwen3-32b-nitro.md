# Translation Candidate
- Slug: quiz-css-core-fundamentals
- Locale: ja
- Model: openrouter/qwen/qwen3-32b:nitro
- Target: src/content/posts/2024-11-08--quiz-css-core-fundamentals/ja/index.mdx
- Validation: rejected: direct AI SDK translation failed
- Runtime seconds: 4.25
- Input tokens: unknown
- Output tokens: unknown
- Thinking tokens: unknown
- Cached input tokens: unknown
- Cache write tokens: unknown
- Estimated cost: unknown
- Pricing source: unknown
- Note: Command failed: bun run i18n:translate:chunked -- --slug quiz-css-core-fundamentals --locale ja --model openrouter/qwen/qwen3-32b:nitro --chunk 6p --quiz-concurrency 20
## Raw Output

````mdx
---
unlisted: false
title: 'クイズ: CSSの基礎は知ってる？（2025）'
subTitle: フロントエンドだけど大丈夫？
label: CSS Fundamentals
social_image: ../desktop-social.webp
category: Quiz
subCategory: CSS
date: '2024-11-08'
modified: '2024-11-10'
tags:
  - quiz
  - intro
  - css
  - styles
  - beginner
  - intermediate
cover_full_width: ../yeshi-kangrang-Qq7A85iCzhQ-unsplash-wide.webp
cover_mobile: ../yeshi-kangrang-Qq7A85iCzhQ-unsplash-square.webp
cover_icon: ../yeshi-kangrang-Qq7A85iCzhQ-unsplash-square.webp
---
import Challenge from '../../../../../components/QuizUI/Challenge';
import QuizUI from '../../../../../components/QuizUI/QuizUI';


## クイズ: CSSを知っているか？

* Modern CSS?  🤔
* **CSSを_あなたの_履歴書に載せるべきか???** 🚀
* 選択式。 🤖 … _どれだけ簡単だろう、ってね？_

<QuizUI>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={0}
  group="ウォームアップ: フォント"
  title="フォントサイズに無効なCSS単位"
  options={[
    {text: '10cx', isAnswer: true},
    {text: '10mm'},
    {text: '10pt'},
    {text: '10px'},
    {text: '10vmin'},
  ]}
>
  <slot name="question">
  <div className="question">
    次の <em class="highlight">唯一の無効な</em> ❌ `font-size` を選択してください:
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    `10cx` は無効です。`cx` は実在しない CSS 単位です。（執筆時点では。）

    よく使われる単位にはおなじみの `px`、`rem`、`em` があります。

    新しい単位は動的でレスポンシブなレイアウトに便利です。

    - `ch` - `0` 文字の幅
    - `vmin` - ビューポートの最小値
    - `vmax` - ビューポートの最大値
    - `vh` - ビューポートの高さ
    - `vw` - ビューポートの幅

    さらに、常に存在しているもののあまり使われない単位もあります。例えばセンチメートルの `cm`、ミリメートルの `mm`、インチの `in`、ポイントの `pt` などです
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={1}
  group="ウォームアップ: 色"
  title="16進数コード"
  options={[
    {text: '#A'},
    {text: '#AB'},
    {text: '#ABCD', isAnswer: true},
    {text: '#ABCDE'},
  ]}
>
  <slot name="question">
  <div className="question">
    有効な👍 16進数コードを<em class="highlight">1つ</em>見つけられますか？
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    16進数コードは CSS で色を表すのに使えます。`#` で始まり、3、4、6、または 8 桁の十六進数が必要です。

    3 桁のコードは 6 桁コードの省略形で、各文字が 2 回繰り返されます。4 桁コードは透明度用のアルファチャンネルを含みます。

    例えば `#ABC` は `#AABBCC` と同じで、`#ABCD` は `#AABBCCDD` と同じです。16進数の扱い方をもっと知りたい場合は、私の[JavaScript numbers quiz.](/quiz-can-you-count-to-bigint/)をご覧ください。
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={2}
  group="ウォームアップ: 単位"
  title="おっと、すべての単位！"
  options={[
    {text: 'em'},
    {text: 'rem'},
    {text: 'cm'},
    {text: 'mm'},
    {text: 'in'},
    {text: 'pt'},
    {text: 'pc'},
    {text: 'px'},
    {text: 'ex'},
    {text: 'ch'},
    {text: 'vmin'},
    {text: 'vmax'},
    {text: 'vh'},
    {text: 'rel', isAnswer: true},
    {text: 'vw'},
  ]}
>
  <slot name="question">
  <div className="question">
    次の単位のうち、<em class="highlight">無効な</em> ❌ CSS 単位はどれですか？
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    `ch`、`vmin`、`vmax`、`vh`、`vw` のような新しい単位は、動的/レスポンシブなレイアウトに非常に便利です。

    また、常に存在しているもののほとんど使われない単位もあります。たとえばセンチメートルの `cm`、`mm`、インチの `in`、ポイントの `pt`、`pc`、大文字のサイズを表す `cap`、そして文字 `x` の高さに相当する `ex` などです。

    一般的に使われる単位には、ピクセルの `px`、要素のフォントサイズに対する相対単位の `em`、そして `rem` があります。`rem` は90年代のバンド R.E.M. への隠れたオマージュだと言われますが（実際は単にルート要素を基準にした相対 `em` 単位です）。
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={3}
  group="セレクタ: 基礎"
  title="HTML要素にマッチするセレクタ"
  options={[
    {text: '#Home'},
    {text: 'a [id=\'home\']'},
    {text: 'a:contains(home)'},
    {text: 'a#home[name=\'home\']', isAnswer: true},
  ]}
>
  <slot name="question">
  <div className="question">
    次のHTMLに最も適合するセレクタはどれですか？
    ```html
          <a id="home" name="home" href="/home">Home</a>
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    正解は `a#home[name='home']` で、`id` と `name` の両方にマッチします。CSS セレクタは大文字小文字を区別するので `#Home` は機能せず、スペースは子要素を意味しますが、ここでは該当しません。

    `:contains()` セレクタは標準の CSS セレクタではありませんが、いくつかの JS ライブラリで利用可能です。
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={4}
  group="セレクタ: 基礎"
  title="ボタンの属性セレクタ"
  options={[
    {text: 'button:link'},
    {text: 'button::click'},
    {text: 'button:focus'},
    {text: 'button[onclick]', isAnswer: true},
    {text: 'button[on-click]'},
  ]}
>
  <slot name="question">
  <div className="question">
    次のHTMLボタンにマッチするセレクタはどれですか？
    ```html
          <button onclick="openModal()">Contact</button>
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    正解は `button[onclick]` で、属性 `onclick` が存在することを対象とします。

    なお、`:link` は未訪問の `href` リンクのみを対象とし、`::click` は有効な疑似要素ではなく、`:focus` はフォーカスされている要素だけを対象とします。
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={5}
  group="セレクタ: 基礎"
  title="無効な CSS セレクタ"
  options={[
  ]}
>
  <slot name="question">
  <div className="question">
    これらのセレクタのうち、どれが無効ですか？
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    セレクタ `c > > d {}` は、2つの `>` 記号の間にセレクタがなく子コンビネータが連続しているため無効です。

    他のセレクタは有効です。`c {}` のようなタイプセレクタは、たとえ `c` が標準の HTML 要素でなくても構文的に有効な CSS です。
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={6}
  group="セレクタ: 基礎"
  title="最後のリンクを選択する"
  options={[
    {text: 'a :nth-child(3)'},
    {text: 'a:last-item'},
    {text: 'nav:last-of-type(a)'},
    {text: 'nav:nth-child(3)'},
    {text: 'a:last-child', isAnswer: true},
  ]}
>
  <slot name="question">
  <div className="question">
    次のHTMLで最後のリンクにマッチするセレクタはどれですか？
    ```html
          <nav>
            <a name="home" href="/home">Home</a>
            <a name="login" href="/login">Login</a>
            <a name="help" href="/help">Help</a>
          </nav>
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    正しいセレクタは `a:last-child` で、これは親要素の最後の子要素である `<a>` にマッチします。`nav:nth-child(3)` は、親要素の3番目の子である `<nav>` 要素にマッチします。
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={7}
  group="セレクタ: 特異性"
  title="セレクタの優先度"
  options={[
    {text: 'main article section blockquote a'},
    {text: 'blockquote a'},
    {text: 'a#quote', isAnswer: true},
    {text: 'a.quote'},
  ]}
>
  <slot name="question">
  <div className="question">
    どのセレクタが優先されますか？
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    ID がタグやクラスベースのセレクタよりも特異性が高いため、`a#quote` セレクタが優先されます。
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={8}
  group="レイアウト: 中央揃え"
  title="ブロック要素内のテキストを中央揃え"
  options={[
    {text: 'align: center;'},
    {text: 'margin: 0 auto;'},
    {text: 'align-content: center;'},
    {text: 'text-align: center;', isAnswer: true},
    {text: 'text-content: center;'},
  ]}
>
  <slot name="question">
  <div className="question">
    ボックス内の「shit」をどうやって中央に配置しますか？
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    ブロック要素内のテキストを中央揃えにする正しい方法は `text-align: center;` を使うことです。`align` プロパティはフレックスボックスレイアウトで使用され、`margin: 0 auto;` はブロック要素を水平方向に中央に配置するために使います。

    `align-content` プロパティはグリッドレイアウトで使用され、`text-content` は有効な CSS プロパティではありません。
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={9}
  group="レイアウト: 中央揃え"
  title="ブロック要素を垂直方向に中央揃えする"
  options={[
    {text: 'align-items: center;'},
    {text: 'justify-content: center;'},
    {text: 'align-content: center;', isAnswer: true},
    {text: 'margin: auto;'},
    {text: 'margin: 0 auto;'},
  ]}
>
  <slot name="question">
  <div className="question">
    モダンなフロー レイアウトで、ブロック コンテナ内のコンテンツを垂直方向に中央揃えするにはどうすればいいですか？
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    `align-content` を使うのが、フロー レイアウトでブロック コンテナの内容を垂直方向に中央揃えするモダンな方法です。

    `align-items` と `justify-content` プロパティはフレックスボックスやグリッド レイアウトで使用され、フローでは使いません。

    `margin: 0 auto;` と `margin: auto;` はブロック要素を水平方向に中央揃えしますが、垂直方向には揃えません。
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={10}
  group="レイアウト: 単位"
  title="入れ子になったフォントサイズのピクセルサイズ計算"
  options={[
    {text: '!40px'},
    {text: '5px', isAnswer: true},
    {text: '20px'},
    {text: '25px'},
    {text: '40px'},
  ]}
>
  <slot name="question">
  <div className="question">
    以下のHTMLにおける `<a>` リンクのテキストのピクセルサイズは何ですか？
    ```html
          <body style="font-size: 40px !important;">
            <nav style="font-size: 50%;">
              <a style="font-size: 25%;">HOME</a>
            </nav>
          </body>
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    `<a>` の `font-size` は 5px と計算されます: 40px（body）* 50%（nav）= 20px、次に 20px * 25% = 5px。
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={11}
  group="単位: REM"
  title="REMでピクセルサイズを計算する"
  options={[
    {text: '10px'},
    {text: '12px', isAnswer: true},
    {text: '14px'},
    {text: '20px'},
    {text: '24px'},
    {text: '34px'},
  ]}
>
  <slot name="question">
  <div className="question">
    以下のHTMLで「HOME」リンクの `1.2rem` は何ピクセルになるでしょうか？
    ```html
          <html style="font-size: 10px;">
            <body style="font-size: 20px;">
              <a style="font-size: 1.2rem;">HOME</a>
            </body>
          </html>
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    `1.2rem` は12pxになります。なぜなら `rem` 単位はルート（`<html>`）のフォントサイズを基準にしており、ここでは10pxに設定されているからです。
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={12}
  group="単位: EM"
  title="EMでピクセルサイズを計算"
  options={[
    {text: '10px'},
    {text: '12px'},
    {text: '14px'},
    {text: '20px'},
    {text: '24px', isAnswer: true},
    {text: '34px'},
  ]}
>
  <slot name="question">
  <div className="question">
    前の質問と同様に、以下のHTMLで「HOME」リンクの `1.2em` のピクセルサイズは何ピクセルになりますか？
    ```html
          <html style="font-size: 10px;">
            <body style="font-size: 20px;">
              <a style="font-size: 1.2em;">HOME</a>
            </body>
          </html>
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    `1.2em` は 24px に相当します。なぜなら `em` 単位は継承されたフォントサイズ（ここでは 20px）を基準にするからです。
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={13}
  group="セレクタ: 特異性"
  title="ゼロ特異性セレクタ"
  options={[
    {text: ':where(.card) .title', isAnswer: true},
    {text: '.card .title'},
    {text: ':is(.card) .title'},
    {text: '#card .title'},
  ]}
>
  <slot name="question">
  <div className="question">
    どのセレクタが最も特異性が低いですか？
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    `:where(.card) .title` が最も特異性が低いです。`:where()` 疑似クラスとその中身はすべて `0-0-0` とみなされるので、`.title` だけがカウントされます。`:is(.card) .title` は `.card` の特異性を保持し、`.card .title` はクラスが2つ、`#card .title` は ID を含みます。
  </div>
  </slot>
</Challenge>

</QuizUI>
````
