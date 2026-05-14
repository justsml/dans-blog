# Translation Candidate
- Slug: quiz-css-core-fundamentals
- Locale: zh
- Model: deepseek/deepseek-v4-flash
- Target: src/content/posts/2024-11-08--quiz-css-core-fundamentals/zh/index.mdx
- Validation: deferred
- Runtime seconds: 101.93
- Input tokens: 12530
- Output tokens: 15184
- Thinking tokens: unknown
- Cached input tokens: 3712
- Cache write tokens: 0
- Estimated cost: $0.005617
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
unlisted: false
title: 测验：你了解CSS基础知识吗？(2025)
subTitle: 你的前端功力够吗？
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
import Challenge from '../../../../components/QuizUI/Challenge';
import QuizUI from '../../../../components/QuizUI/QuizUI';


## 测验：你了解CSS吗？

* 现代CSS？🤔
* **CSS应该出现在你的简历上吗？？？** 🚀
* 选择题。🤖 ... _能有多难呢，嗯？_

<QuizUI>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={0}
  group="热身：字体"
  title="字体大小的无效CSS单位"
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
    选择<em class="highlight">一个无效的</em> ❌ `font-size`：
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    `10cx` 是错误的，因为 `cx` 不是一个真正的 CSS 单位。（至少在撰写本文时是这样。）

    常用的单位包括熟悉的 `px`、`rem`、`em`。

    较新的单位对于动态、响应式布局非常有用。

    - `ch` - 字符 `0` 的宽度
    - `vmin` - 视口最小值
    - `vmax` - 视口最大值
    - `vh` - 视口高度
    - `vw` - 视口宽度

    还有一些单位一直存在但很少使用，比如 `cm`（厘米）、`mm`、`in`（英寸）、`pt`（点）
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={1}
  group="热身：颜色"
  title="十六进制颜色码"
  options={[
    {text: '#A'},
    {text: '#AB'},
    {text: '#ABCD', isAnswer: true},
    {text: '#ABCDE'},
  ]}
>
  <slot name="question">
  <div className="question">
    你能找出那<em class="highlight">一个</em>有效的 👍 十六进制颜色码吗？
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    十六进制颜色码可用于在 CSS 中表示颜色。它们以 `#` 开头，并且必须包含 3、4、6 或 8 个十六进制数字。

    3 字符的十六进制码是 6 字符码的简写，其中每个字符重复一次。4 字符码包含一个用于透明度的 alpha 通道。

    例如，`#ABC` 等同于 `#AABBCC`，`#ABCD` 等同于 `#AABBCCDD`。要了解更多关于处理十六进制值的内容，请查看我的 [JavaScript 数字测验。](/quiz-can-you-count-to-bigint/)
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={2}
  group="热身：单位"
  title="哎呀，全是单位！"
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
    这些单位中，哪一个<em class="highlight">不是</em>有效的 ❌ CSS 单位？
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    像 `ch`、`vmin`、`vmax`、`vh`、`vw` 这样的新单位对于动态/响应式布局非常有用。

    还有一些单位一直存在但很少使用，比如 `cm`（厘米）、`mm`（毫米）、`in`（英寸）、`pt`（点）、`pc`（派卡）、`cap`（大写字母高度）以及 `ex`（等于字母 'x' 的高度）。

    常用的单位包括熟悉的 `px`（像素）、相对于元素字体大小的 `em`，而 `rem` 其实是对 90 年代被遗忘的乐队 R.E.M. 的致敬（好吧，并不是，它只是一个相对于根元素的 `em` 单位）。
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={3}
  group="选择器：基础"
  title="匹配选择器与HTML元素"
  options={[
    {text: '#Home'},
    {text: 'a [id=\'home\']'},
    {text: 'a:contains(home)'},
    {text: 'a#home[name=\'home\']', isAnswer: true},
  ]}
>
  <slot name="question">
  <div className="question">
    哪个选择器最能匹配以下HTML？
    ```html
          <a id="home" name="home" href="/home">Home</a>
    ```
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    正确答案是 `a#home[name='home']`，它同时匹配了 `id` 和 `name` 属性。CSS 选择器是区分大小写的，所以 `#Home` 不会生效，而空格表示子元素，这里并不适用。

    `:contains()` 选择器不是标准的 CSS 选择器，但在某些 JS 库中可用。
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={4}
  group="选择器：基础"
  title="按钮的属性选择器"
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
    哪个选择器匹配以下HTML按钮？
    ```html
          <button onclick="openModal()">Contact</button>
    ```
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    正确答案是 `button[onclick]`，它针对的是 `onclick` 属性的存在。

    注意，`:link` 只针对未访问的 `href` 链接，`::click` 不是有效的伪元素，而 `:focus` 只针对聚焦的元素。
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={5}
  group="选择器：基础"
  title="无效的CSS选择器"
  options={[
    {text: 'a {}'},
    {text: 'b.b {}'},
    {text: 'c > > d {}', isAnswer: true},
    {text: '#d {}'},
  ]}
>
  <slot name="question">
  <div className="question">
    以下哪个选择器是无效的？
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    选择器 `c > > d {}` 是无效的，因为子组合器重复了，两个 `>` 字符之间没有选择器。

    其他选择器都是有效的。像 `c {}` 这样的类型选择器在语法上是有效的 CSS，即使 `c` 不是标准的 HTML 元素。
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={6}
  group="选择器：基础"
  title="选择最后一个链接"
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
    以下哪个选择器能匹配HTML中的最后一个链接？
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
    正确的选择器是 `a:last-child`，它匹配作为其父元素最后一个子元素的最后一个 `<a>`。`nav:nth-child(3)` 会匹配一个作为其父元素第三个子元素的 `<nav>` 元素。
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={7}
  group="选择器：特异性"
  title="选择器优先级"
  options={[
    {text: 'main article section blockquote a'},
    {text: 'blockquote a'},
    {text: 'a#quote', isAnswer: true},
    {text: 'a.quote'},
  ]}
>
  <slot name="question">
  <div className="question">
    哪个选择器优先级最高？
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    `a#quote` 选择器由于包含 ID 而优先级最高，ID 的特异性高于标签或类选择器。
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={8}
  group="布局：居中"
  title="在块级元素中居中文本"
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
    如何在一个盒子中居中“破玩意儿”？
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    使用 `text-align: center;` 是在块级元素中居中文本的正确方法。`align` 属性用于 flexbox 布局，而 `margin: 0 auto;` 用于水平居中块级元素。

    `align-content` 属性用于 grid 布局，而 `text-content` 不是有效的 CSS 属性。
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={9}
  group="布局：居中"
  title="垂直居中块级元素"
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
    在现代流式布局中，如何垂直居中块容器内的内容？
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    使用 `align-content` 是现代流式布局中垂直居中块容器内容的正确方式。

    `align-items` 和 `justify-content` 属性用于 flexbox 和 grid 布局，而非流式布局。

    `margin: 0 auto;` 和 `margin: auto;` 都只能水平居中块级元素，无法实现垂直居中。
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={10}
  group="布局：单位"
  title="计算嵌套字体大小的像素值"
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
    以下HTML中`<a>`链接文本的像素大小是多少？
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
    `<a>`的`font-size`计算为5px：40px（body）* 50%（nav）= 20px，然后20px * 25% = 5px。
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={11}
  group="单位：REM"
  title="使用 REM 计算像素大小"
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
    在以下 HTML 中，“HOME”链接的 `1.2rem` 对应的像素大小是多少？
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
    `1.2rem` 转换为 12px，因为 `rem` 单位引用根元素或 `<html>` 的字体大小，此处设置为 10px。
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={12}
  group="单位：EM"
  title="使用EM计算像素大小"
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
    与上一个问题类似，在以下HTML中，“HOME”链接的 `1.2em` 的像素大小是多少？
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
    `1.2em` 转换为24px，因为 `em` 单位引用继承的字体大小，此处设置为20px。
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={13}
  group="选择器：特异性"
  title="零特异性选择器"
  options={[
    {text: ':where(.card) .title', isAnswer: true},
    {text: '.card .title'},
    {text: ':is(.card) .title'},
    {text: '#card .title'},
  ]}
>
  <slot name="question">
  <div className="question">
    哪个选择器的特异性最低？
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    `:where(.card) .title` 的特异性最低。`:where()` 伪类及其内部的所有内容贡献 `0-0-0`，因此只有 `.title` 计入。`:is(.card) .title` 保留了 `.card` 的特异性，`.card .title` 有两个类，而 `#card .title` 包含一个 ID。
  </div>
  </slot>
</Challenge>

</QuizUI>
````
