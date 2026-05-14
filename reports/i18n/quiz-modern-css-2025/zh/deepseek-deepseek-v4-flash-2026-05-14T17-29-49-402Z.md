# Translation Candidate
- Slug: quiz-modern-css-2025
- Locale: zh
- Model: deepseek/deepseek-v4-flash
- Target: src/content/posts/2024-11-07--quiz-modern-css-2025/zh/index.mdx
- Validation: deferred
- Runtime seconds: 76.11
- Input tokens: 10231
- Output tokens: 11014
- Thinking tokens: unknown
- Cached input tokens: 640
- Cache write tokens: 0
- Estimated cost: $0.004522
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
unlisted: false
title: 测验：你了解现代CSS吗？（2025版）
subTitle: 你的前端功力够吗？
label: Advanced CSS
social_image: ../desktop-social.webp
category: Quiz
subCategory: CSS
minReleaseDate: '2024-10-31'
date: '2024-10-31'
modified: '2024-11-09'
tags:
  - quiz
  - css
  - advanced
  - intermediate
cover_full_width: ../dan-levy-downtown-denver-at-night-wide.webp
cover_mobile: ../dan-levy-downtown-denver-at-night-square-200.webp
cover_icon: ../dan-levy-downtown-denver-at-night-square-200.webp
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
  group="热身"
  title="使用CSS变量"
  options={[
    {text: 'background-color: blue;'},
    {text: 'background-color: --main-color;'},
    {text: 'background-color: var(--main-color);', isAnswer: true},
    {text: 'background-color: $main-color;'},
    {text: 'background-color: @main-color;'},
  ]}
>
  <slot name="question">
  <div className="question">
    使用名为 `--main-color` 的 CSS 变量来设置元素背景颜色的正确方法是什么？
    ```css
        :root {
          --main-color: blue;
        }
        div {
          /* How do we use --main-color here? */
        }
    ```
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    CSS 变量通过 `var` 函数使用，因此正确答案是 `background-color: var(--main-color);`。此语法会获取 `--main-color` 的值并应用它。

    其他选项可能来自其他语言或预处理器语法，例如 Sass 或 Less。
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={1}
  group="CSS 函数"
  title="CSS min() 函数"
  options={[
    {text: 'width: 50%;'},
    {text: 'width: 200px;', isAnswer: true},
    {text: 'width: 250px;'},
    {text: 'width: 500px;'},
    {text: 'width: max(50%, 200px);'},
    {text: 'Invalid syntax'},
  ]}
>
  <slot name="question">
  <div className="question">
    如果父容器宽度为 400px，以下元素的计算宽度是多少？
    ```css
        div {
          width: min(250px, 50%);
        }
    ```
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    `min()` 函数会选择 250px 和父容器宽度 50% 中的最小值。

    要理解计算值，我们需要将相对单位转换为像素：

    - `400px` 的 `50%` 是 `200px`
    - `250px` 已经是像素值
    ```css
        /* This gets computed to */
        width: min(250px, 200px);
        /* -> 200px wins */
    ```
    `min()` 函数在响应式设计中特别有用，可以确保组件（或字体大小）不超过某个限制。
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={2}
  group="CSS 函数"
  title="CSS max() 函数"
  options={[
    {text: 'width: 6em;'},
    {text: 'width: 10%;'},
    {text: 'width: 10px;'},
    {text: 'width: 50px;'},
    {text: 'width: 96px;', isAnswer: true},
    {text: 'Invalid syntax'},
  ]}
>
  <slot name="question">
  <div className="question">
    假设一个容器的宽度为 200px，那么 `<div>` 的计算宽度是多少？
    ```css
        div {
          width: max(50px, 10%, 6rem);
        }
    ```
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    `max()` 函数接受两个或更多输入，并自动使用最大值。假设根字体大小为浏览器默认的 `16px`，则宽度计算结果为 `96px`。

    要理解计算值，我们需要将相对单位转换为像素：

    - `50px` 已经是像素单位
    - `200px` 的 `10%` 是 `20px`
    - `6rem` 是 `6 * 16px`（默认字体大小），即 `96px`
    ```css
        /* This gets computed to */
        width: max(50px, 20px, 96px);
        /* -> 96px wins */
    ```
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={3}
  group="CSS 网格函数"
  title="CSS minmax() 函数"
  options={[
    {text: '所有列宽在 100px 到 200px 之间'},
    {text: '将列设为 100px，行设为 200px'},
    {text: '第一列将在 100px 到 200px 之间', isAnswer: true},
    {text: '递归应用范围，包括子网格'},
  ]}
>
  <slot name="question">
  <div className="question">
    在 CSS 网格轨道中使用 `minmax(100px, 200px)` 的效果是什么？
    ```css
        grid-template-columns: minmax(100px, 200px);
    ```
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    使用 `minmax(100px, 200px)` 允许网格轨道在 `100px` 和 `200px` 之间调整大小，适应可用空间，但绝不会低于 `100px` 或高于 `200px`。

    你可以创建自动调整的布局，其中容器和子元素各自在计算布局中发挥作用。当与 `repeat()` 和 `auto-fill` 或 `auto-fit` 结合使用时，这非常强大，它会在约束条件下创建尽可能多的轨道。
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={4}
  group="CSS 变量"
  title="CSS 变量回退值"
  options={[
    {text: 'blue'},
    {text: 'red'},
    {text: 'system default'},
    {text: '#6b8e23', isAnswer: true},
    {text: 'var(--secondary-color)'},
  ]}
>
  <slot name="question">
  <div className="question">
    以下 CSS 的背景颜色是什么？
    ```css
        div {
          background: var(--primary, olivedrab);
        }
    ```
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    `var()` 函数允许你在变量未定义时设置一个回退值。在这个例子中，背景色将是 `olivedrab`（`#6b8e23`），因为 `--primary` 未定义。

    这是确保你的样式在变量缺失或不支持时不会出错的好方法。
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={5}
  group="CSS 函数"
  title="使用 clamp() 实现响应式设计"
  options={[
    {text: '对可能不支持的单位的回退'},
    {text: '确保 `vw` 单位在 20px 到 50px 之间'},
    {text: '在 200px 到 500px 之间线性缩放', isAnswer: true},
    {text: '在 200px 到 500px 之间以 Log₂ 缩放'},
    {text: '失败！不支持 IE 11'},
  ]}
>
  <slot name="question">
  <div className="question">
    `clamp()` 的作用是什么？
    ```css
        .card {
          width: clamp(200px, 50vw, 500px);
        }
    ```
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    `clamp()` 函数允许宽度基于 `50vw` 缩放，但将其保持在 200px 到 500px 的范围内。

    这意味着当 50vw 小于 200px 时，宽度为 200px；当 50vw 大于 500px 时，宽度为 500px；在这两个限制之间则为线性变化。

    它让你实现自动魔法般的响应式设计！关于 `clamp` 需要知道的是，它结合了**固定单位**与**响应式或计算单位**。

    通常你不会想对字体大小使用视口单位，但使用 `clamp()` 可以确保字体大小不会变得太小或太大。
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={6}
  group="CSS嵌套"
  title="原生CSS嵌套"
  options={[
    {text: '仅限SCSS'},
    {text: '技术上可用PostCSS'},
    {text: '是', isAnswer: true},
    {text: '否'},
  ]}
>
  <slot name="question">
  <div className="question">
    CSS原生支持嵌套吗？
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    是的！我们终于有了原生CSS嵌套！CSS在近年（2023年）引入了原生嵌套语法，允许直接在CSS中进行层级样式设置。
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={7}
  group="CSS 嵌套"
  title="CSS 嵌套"
  options={[
    {text: '文件名必须以 .scss 结尾'},
    {text: '`.title` 必须位于 `color` 等属性之前'},
    {text: '仅限使用 PostCSS'},
    {text: '完美，无需备注。', isAnswer: true},
  ]}
>
  <slot name="question">
  <div className="question">
    这是原生 CSS 嵌套的正确用法吗？
    ```css
        .container {
          color: black;
          .title {
            color: white;
            background: black;
          }
        }
    ```
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    `.title` 类嵌套在 `.container` 类中，属性按预期应用。

    这是一种将相关样式保持在一起并避免长选择器的好方法。
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={8}
  group="CSS 嵌套"
  title="嵌套中的直接子选择器"
  options={[
    {text: 'background-color: red'},
    {text: 'background-color: white', isAnswer: true},
    {text: 'background-color: blue'},
    {text: 'Invalid syntax'},
  ]}
>
  <slot name="question">
  <div className="question">
    `.container` 的直接子元素 `div` 会应用什么背景颜色？
    ```css
        .container {
          background-color: red;
          > div {
            background-color: white;
          }
          background-color: blue !important;
        }
    ```
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    嵌套规则中的 `>` 选择器仅对 `.container` 内的直接子元素 `div` 应用 `background-color: white`。

    最后一条规则 `background-color: blue !important;` 是个小干扰。它**在嵌套规则之外**，将应用于所有 `.container` 元素。
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={9}
  group="CSS变量"
  title="在运行时更改CSS变量"
  options={[
    {text: 'CSS变量是不可变的'},
    {text: '使用JavaScript', isAnswer: true},
    {text: '仅使用SCSS'},
    {text: '仅使用内联样式'},
    {text: '使用响应式单位'},
  ]}
>
  <slot name="question">
  <div className="question">
    如何在运行时更改CSS变量的值？
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    CSS变量可以通过类和JavaScript设置。它们甚至可以在技术上被使用'之后'才定义。
    ```js
        document.documentElement.style.setProperty('--main-color', 'blue');
    ```
    这将把整个文档的`--main-color`的值改为`blue`。

    CSS变量是可变的，可以在运行时通过JavaScript更改。

    它们也可以通过添加或删除类来更改，这是主题化的常见模式。
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={10}
  group="CSS 变量"
  title="使用 calc() 与 CSS 变量"
  options={[
    {text: '宽度：50px'},
    {text: '宽度：100px'},
    {text: '宽度：110px', isAnswer: true},
    {text: '宽度：120px'},
  ]}
>
  <slot name="question">
  <div className="question">
    该元素的计算宽度是多少？
    ```css
        :root {
          --base-width: 100px;
        }
        div {
          width: calc(var(--base-width) + 10px);
        }
    ```
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    `calc()` 函数将 `--base-width` 的值（100px）与额外的 10px 相结合，最终宽度为 110px。
  </div>
  </slot>
</Challenge>

</QuizUI>
````
