# Translation Candidate
- Slug: quiz-modern-css-2025
- Locale: zh
- Model: openrouter/openai/gpt-oss-120b:nitro
- Target: src/content/posts/2024-11-07--quiz-modern-css-2025/zh/index.mdx
- Validation: deferred
- Runtime seconds: 21.70
- Input tokens: 11366
- Output tokens: 7101
- Thinking tokens: unknown
- Cached input tokens: 3584
- Cache write tokens: 0
- Estimated cost: $0.002201
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
unlisted: false
title: 测验：你了解现代 CSS 吗？（2025）
subTitle: 你够前端吗？
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


## 测验：你了解 CSS 吗？

* 现代 CSS？  🤔
* **CSS 应该出现在 _你的_ 简历上吗???** 🚀
* 多项选择。 🤖 ... _这能有多难呢？_

<QuizUI>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={0}
  group="热身"
  title="使用 CSS 变量"
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
    使用名为 `--main-color` 的 CSS 变量为元素设置背景颜色的正确方式是什么？
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
    CSS 变量使用 `var` 函数，所以正确答案是 `background-color: var(--main-color);`。此语法会获取 `--main-color` 的值并应用它。

    其他选项可能来源于其他语言或预处理器语法，例如 Sass 或 Less。
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
    如果父容器宽度为 400px，下面元素的计算宽度会是多少？
    ```css
        div {
          width: min(250px, 50%);
        }
    ```
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    `min()` 函数将在 250px 与其父元素宽度的 50% 之间选择较小的值。

    要了解计算后的值，需要将相对单位转换为像素：

    - `50%` 的 `400px` 是 `200px`
    - `250px` 已经是像素
    ```css
        /* This gets computed to */
        width: min(250px, 200px);
        /* -> 200px wins */
    ```
    `min()` 函数在响应式设计中特别有用，能够确保组件（或字体大小）不会超过某个上限。
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
    假设容器宽度为 200px，`<div>` 的计算宽度会是多少？
    ```css
        div {
          width: max(50px, 10%, 6rem);
        }
    ```
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    `max()` 函数接受 2 个或更多输入，并会自动使用最大的值。假设根字体大小是浏览器默认的 `16px`，宽度计算结果为 `96px`。

    要理解计算值，需要把相对单位转换为像素：

    - `50px` 已经是像素
    - `10%` 的 `200px` 是 `20px`
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
    {text: '将列设置为 100px，行设置为 200px'},
    {text: '第一列的宽度将在 100px 到 200px 之间', isAnswer: true},
    {text: '递归应用范围，包括子网格'},
  ]}
>
  <slot name="question">
  <div className="question">
    在 CSS 网格轨道中使用 `minmax(100px, 200px)` 有什么效果？
    ```css
        grid-template-columns: minmax(100px, 200px);
    ```
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    使用 `minmax(100px, 200px)` 使网格轨道的尺寸可以在 `100px` 到 `200px` 之间变化，依据可用空间进行适配，但永远不会小于 `100px` 或大于 `200px`。

    你可以创建自动调整的布局，让容器和子元素共同参与布局计算。当与 `repeat()` 以及 `auto-fill` 或 `auto-fit` 结合使用时，这非常强大，它们会在约束范围内尽可能创建更多轨道。
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={4}
  group="CSS 变量"
  title="CSS 变量回退"
  options={[
    {text: '蓝色'},
    {text: '红色'},
    {text: '系统默认'},
    {text: '#6b8e23', isAnswer: true},
    {text: 'var(--secondary-color)'},
  ]}
>
  <slot name="question">
  <div className="question">
    以下 CSS 的背景颜色会是什么？
    ```css
        div {
          background: var(--primary, olivedrab);
        }
    ```
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    `var()` 函数允许在变量未定义时提供回退值。在本例中，背景会是 `olivedrab`（`#6b8e23`），因为 `--primary` 未定义。

    这是一种确保在变量缺失或不被支持时样式仍能正常工作的好办法。
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={5}
  group="CSS 函数"
  title="在响应式设计中使用 clamp()"
  options={[
    {text: '可能不受支持单位的后备方案'},
    {text: '确保 `vw` 单位在 20px 到 50px 之间'},
    {text: '在 200px 到 500px 之间的线性比例', isAnswer: true},
    {text: '在 200px 到 500px 之间的对数₂比例'},
    {text: '失败！不支持 IE 11'},
  ]}
>
  <slot name="question">
  <div className="question">
    `clamp()` 是干什么的？
    ```css
        .card {
          width: clamp(200px, 50vw, 500px);
        }
    ```
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    `clamp()` 函数允许宽度基于 `50vw` 进行缩放，但将其限制在 200px 到 500px 的范围内。

    这意味着当 `50vw` 小于 200px 时宽度为 200px，`50vw` 大于 500px 时宽度为 500px，介于两者之间时线性变化。

    它让你自动神奇地实现响应式！需要了解的是 `clamp` 将 **固定单位** 与 **响应式或计算单位** 结合。

    通常不建议对字体大小使用视口单位，但使用 `clamp()` 可以确保字体大小既不会太小也不会太大。
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={6}
  group="CSS 嵌套"
  title="原生 CSS 嵌套"
  options={[
    {text: '仅限 SCSS'},
    {text: '技术上使用 PostCSS'},
    {text: '是', isAnswer: true},
    {text: '否'},
  ]}
>
  <slot name="question">
  <div className="question">
    CSS 原生支持嵌套吗？
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    是的！我们终于拥有原生 CSS 嵌套了！CSS 在近几年（2023）引入了原生嵌套语法，直接在 CSS 中实现层级样式。
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
    {text: '必须在属性如 `color` 前写 `.title`'},
    {text: '仅在 PostCSS 中可用'},
    {text: '完美。没有备注。', isAnswer: true},
  ]}
>
  <slot name="question">
  <div className="question">
    这算是对原生 CSS 嵌套的正确使用吗？
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
    `.title` 类嵌套在 `.container` 类内部，属性会如预期那样生效。

    这是一种很好的方式，可以把相关样式放在一起，避免冗长的选择器。
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={8}
  group="CSS 嵌套"
  title="带嵌套的直接子选择器"
  options={[
    {text: 'background-color: red'},
    {text: 'background-color: white', isAnswer: true},
    {text: 'background-color: blue'},
    {text: 'Invalid syntax'},
  ]}
>
  <slot name="question">
  <div className="question">
    直接子 `div`（属于 `.container`）会应用什么背景颜色？
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
    `>` 选择器在嵌套规则中仅把 `background-color: white` 应用于 `.container` 内的直接子 `div` 元素。

    最后的规则 `background-color: blue !important;` 有点干扰。它位于 **嵌套规则之外**，会作用于所有 `.container` 元素。
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={9}
  group="CSS 变量"
  title="运行时更改 CSS 变量"
  options={[
    {text: 'CSS 变量是不可变的'},
    {text: '使用 JavaScript', isAnswer: true},
    {text: '仅限 SCSS'},
    {text: '仅限内联样式'},
    {text: '使用响应式单位'},
  ]}
>
  <slot name="question">
  <div className="question">
    如何在运行时更改 CSS 变量的值？
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    CSS 变量可以通过类和 JavaScript 设置，甚至可以在技术上已经使用之后再定义。
    ```js
        document.documentElement.style.setProperty('--main-color', 'blue');
    ```
    这将把整个文档中 `--main-color` 的值改为 `blue`。

    CSS 变量是可变的，可以使用 JavaScript 在运行时更改。

    它们也可以通过添加或移除类来更改，这是主题化的常见模式。
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={10}
  group="CSS 变量"
  title="在 CSS 变量中使用 calc()"
  options={[
    {text: '宽度：50px'},
    {text: '宽度：100px'},
    {text: '宽度：110px', isAnswer: true},
    {text: '宽度：120px'},
  ]}
>
  <slot name="question">
  <div className="question">
    该元素的计算宽度会是多少？
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
    `calc()` 函数将 `--base-width`（100px）的值与额外的 10px 相加，得到宽度 110px。
  </div>
  </slot>
</Challenge>

</QuizUI>
````
