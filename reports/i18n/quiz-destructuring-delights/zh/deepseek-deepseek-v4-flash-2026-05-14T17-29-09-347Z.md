# Translation Candidate
- Slug: quiz-destructuring-delights
- Locale: zh
- Model: deepseek/deepseek-v4-flash
- Target: src/content/posts/2024-11-12--quiz-destructuring-delights/zh/index.mdx
- Validation: deferred
- Runtime seconds: 130.65
- Input tokens: 11644
- Output tokens: 20596
- Thinking tokens: unknown
- Cached input tokens: 640
- Cache write tokens: 0
- Estimated cost: $0.007508
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
unlisted: false
title: 测验：解构之趣
subTitle: 你是解构大师吗？
label: Destructuring
social_image: ../desktop-social.webp
category: Quiz
subCategory: JavaScript
date: '2024-11-12'
modified: '2024-11-16'
tags:
  - quiz
  - intro
  - javascript
  - es2015
  - destructuring
  - beginner
  - intermediate
cover_full_width: ../boxes-of-nesting-dolls.webp
cover_mobile: ../boxes-of-nesting-dolls-square.webp
cover_icon: ../boxes-of-nesting-dolls-square.webp
---
---
import Challenge from '../../../../components/QuizUI/Challenge';
import QuizUI from '../../../../components/QuizUI/QuizUI';

{/* 你是解构大师吗？<br/> */}
<p class="inset">还是说这是你的<em>毁灭交响曲？</em></p>

本测验将测试你对 JavaScript 解构的掌握程度：从“基础”对象语法到嵌套解构和默认值。还有关于 TypeScript 和内联类型的附加题！

直接进入热身环节——证明你的解构技能吧！👇

<QuizUI>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={0}
  group="热身：对象"
  title="基础对象解构"
  options={[
    {text: 'Name: Dan Levy, Age: 20'},
    {text: 'Name: Dan Levy, Age: 40'},
    {text: 'Name: Dan Levy, Age: Infinity'},
    {text: 'Name: Dan Levy, Age: undefined', isAnswer: true},
    {text: 'Error: Cannot read property \'age\''},
    {text: 'Name: undefined, Age: 40'},
  ]}
>
  <slot name="question">
  <div className="question">
    这段代码会打印什么？
    ```js
        const person = {
          name: 'Dan Levy',
          location: 'Cape Town',
        };
        const { name, age } = person;
        console.log(`Name: ${name}, Age: ${age}`);
    ```
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    `age` 属性在 `person` 上不存在，所以 `age` 会是 `undefined`。绝对不是 `Infinity` 😅

    结果是：
    ```plaintext
        Name: Dan Levy, Age: undefined
    ```
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={1}
  group="热身：数组"
  title="对象解构中的默认值"
  options={[
    {text: '姓名：Dan Levy，年龄：NaN'},
    {text: '姓名：Dan Levy，年龄：null'},
    {text: '姓名：Dan Levy，年龄：undefined', isAnswer: true},
    {text: '姓名：Dan Levy，年龄：40'},
    {text: '错误：无法解构属性 \'age\''},
    {text: '语法错误：意外的标记 \',\''},
  ]}
>
  <slot name="question">
  <div className="question">
    这段代码会做什么？
    ```js
        const person = [ 'Dan Levy', 'Cape Town' ];
        const [ name, origin, age ] = person;
        console.log(`Name: ${name}, Age: ${age}`);
    ```
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    `age` 变量不存在于 `tuple` 数组中，因此它将是 `undefined`。

    结果是：
    ```plaintext
        Name: Dan Levy, Age: undefined
    ```
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={2}
  group="嵌套解构"
  title="嵌套解构"
  options={[
    {text: 'First: Dan, City: Denver'},
    {text: 'First: undefined, City: Denver'},
    {text: 'Error: Cannot read property \'first\''},
    {text: 'First: Dan, City: undefined'},
    {text: 'Error', isAnswer: true},
  ]}
>
  <slot name="question">
  <div className="question">
    来点嵌套解构怎么样？
    ```js
        'use strict';
        const person = {
          name: { first: 'Dan' },
          address: { city: 'Denver' },
        };
        const {
          name: { first },
          address: { city },
          birth: { place },
        } = person;
        console.log(
          `First: ${first}, City: ${place}`,
        );
    ```
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    `person` 对象上不存在 `birth: { place }` 属性，因此会抛出错误。
    一种解决方案是为嵌套属性提供默认值。

    访问嵌套属性时要小心，因为错误可能很难发现。而且不同浏览器和其他平台的错误信息各不相同，使得调试更具挑战性。

    在最新版 Chrome 中：`TypeError: Cannot read properties of undefined (reading 'place')`

    在 Node 中，这也是一个 `TypeError`，因为 JavaScript 在读取 `place` 之前就尝试从 `undefined` 解构 `place`。

    具体措辞因浏览器和运行时而异。
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={3}
  group="默认值"
  title="对象解构中的默认值"
  options={[
    {text: '你好，来自未知的Dan'},
    {text: '你好，来自丹佛的Dan'},
    {text: '你好，来自未知的未知'},
    {text: '你好，来自丹佛的未知'},
    {text: '错误', isAnswer: true},
  ]}
>
  <slot name="question">
  <div className="question">
    现在加上一些默认值，这段代码会输出什么？
    ```js
        'use strict';
        const person = {
          name: { first: 'Dan' },
          address: { city: 'Denver' },
        };
        const {
          name: { first = 'Unknown' },
          birth: { place = 'Unknown' },
        } = person;
        console.log(
          `Hi ${first} from ${place}`,
        );
    ```
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    `birth` 属性在 `person` 上不存在，所以整个对象仍然需要一个默认值，而不仅仅是嵌套属性。基本上，它缺少一个 ` = {}` 默认值。

    这样写的意思是：“如果 `person.birth` 是 `undefined`，那么 `place` 就是 `Unknown`”。但 `person.birth` 是 `undefined`，所以它试图解构 `undefined`，这会导致错误。
    ```plaintext
        In modern Chrome: `TypeError: Cannot read properties of undefined (reading 'place')`

        In Node, this is also a `TypeError` because JavaScript tries to destructure `place` from `undefined`.

        Exact wording varies between browsers and runtimes.
    ```
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={4}
  group="默认值"
  title="对象解构中的默认值"
  options={[
    {text: '你好，来自丹佛的Dan'},
    {text: '你好，来自约翰内斯堡的Dan'},
    {text: '你好，来自未知的Dan', isAnswer: true},
    {text: '你好，来自未知的未知'},
    {text: '你好，来自丹佛的未知'},
    {text: '错误'},
  ]}
>
  <slot name="question">
  <div className="question">
    这段代码会输出什么？
    ```js
        const person = {
          name: { first: 'Dan' },
          address: { city: 'Denver' },
        };
        const {
          name: { first = 'Unknown' },
          birth: { place = 'Unknown' } = {},
        } = person;

        console.log(
          `Hi ${first} from ${place}`,
        );
    ```
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    `birth` 属性在 `person` 上不存在，因此它会回退到一个空对象 ` = {}`。这使得默认值得以使用。
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={5}
  group="函数参数"
  title="带默认值的函数参数解构"
  options={[
    {text: 'Hi Dan from undefined'},
    {text: 'Hi Dan from Unknown'},
    {text: 'Hi Dan from Denver'},
    {text: 'Hi Unknown from Unknown'},
    {text: 'Hi Unknown from Denver'},
    {text: 'Error', isAnswer: true},
  ]}
>
  <slot name="question">
  <div className="question">
    现在作为函数参数，这段代码会输出什么？
    ```js
        'use strict';
        function displayUser({
          name = "Unknown",
          age = -1,
        } = { place: "Unknown" }) {
          console.log(`Hi ${name} from ${place}`);
        }
        displayUser({ name: "Dan" });
    ```
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    这个函数解构了 `name` 和 `age` 属性，必要时使用默认值。在这个例子中，默认对象中的 `place` 键只是干扰项，它并没有在 `displayUser()` 内部使用。

    严格模式对此没有影响：读取未声明的 `place` 绑定会抛出 `ReferenceError`。
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={6}
  group="函数参数"
  title="嵌套默认值的解构"
  options={[
    {text: 'Unknown, Unknown, Joburg'},
    {text: 'Unknown, Unknown, Unknown'},
    {text: 'Unknown, `undefined`, Joburg'},
    {text: 'N/A, `undefined`, Joburg'},
    {text: 'N/A, Unknown, Joburg'},
    {text: 'N/A, N/A, Joburg', isAnswer: true},
    {text: 'Unknown, N/A, Joburg'},
    {text: 'Error'},
  ]}
>
  <slot name="question">
  <div className="question">
    `undefined` 值是如何处理的？
    ```js
        'use strict';
        function displayPlace({
          name = "N/A",
          place = "N/A",
          age = -1,
        } = { place: "Unknown" }) {
          console.log(`${place}`);
        }
        displayPlace({ name: "Dan" });
        displayPlace({ name: "Dan", place: undefined });
        displayPlace({ name: "Dan", place: "Joburg" });
    ```
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    函数 `displayPlace` 只有在没有传入对象时才会使用默认对象。因此，获得 `{ place: "Unknown" }` 默认值的唯一方法是不传参数调用 `displayPlace()`。

    另一个值得注意的行为是，为 `place` 传入 `undefined` 会导致使用默认值，这有点像 `JSON.stringify` 的行为（忽略 `undefined`，识别 `null`）。

    结果是：
    ```js
        displayPlace() // Unknown
        displayPlace({ name: "Dan" }) // N/A
        displayPlace({ name: "Dan", place: undefined }) // N/A
    ```
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={7}
  group="函数参数"
  title="嵌套默认值的解构"
  options={[
    {text: 'N/A, N/A'},
    {text: 'N/A, undefined'},
    {text: '未知, N/A'},
    {text: '未知, 未知'},
    {text: '未知, undefined'},
    {text: 'null, N/A', isAnswer: true},
    {text: 'null, 未知'},
    {text: 'null, undefined'},
    {text: '错误'},
  ]}
>
  <slot name="question">
  <div className="question">
    与上一个类似... 如何处理 `null`？
    ```js
        function displayPlace({
          name = "N/A",
          place = "N/A",
          age = -1,
        } = { place: "Unknown" }) {
          console.log(`${place}`);
        }
        displayPlace({ name: "Dan", place: null });
        displayPlace({ name: "Dan", place: undefined });
    ```
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    在这种情况下，第一次调用时 `place` 属性被设置为 `null`，第二次调用时设置为 `undefined`。`place` 的默认值仅在整个对象缺失 **或** 为 `undefined` 时使用。`null` 值会原样传递为 `null`。
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={8}
  group="TypeScript 内联类型"
  title="嵌套默认值的解构"
  options={[
    {text: 'N/A'},
    {text: 'undefined'},
    {text: '未知'},
    {text: '\'null\''},
    {text: 'TypeScript 错误', isAnswer: true},
  ]}
>
  <slot name="question">
  <div className="question">
    现在在 TypeScript 中... _这会发生什么？_
    ```ts
        'use strict';
        function displayPlace(
          {
            name = 'N/A',
            place = 'N/A',
          }: {
            name: string;
            place: string;
            age: number;
          },
        ) {
          console.log(`${place}`);
        }
        displayPlace({ name: 'Dan', place: null });
    ```
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    TypeScript 报告一个错误，因为 `place` 被类型化为 `string`，但调用传入了 `null`。该调用还省略了必需的 `age` 属性。

    如果忽略类型错误，运行代码将在控制台打印 `null`。
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={9}
  group="TypeScript：带赋值"
  title="嵌套默认值的解构"
  options={[
    {text: 'undefined'},
    {text: 'null'},
    {text: 'N/A'},
    {text: 'Unknown'},
    {text: 'Denver', isAnswer: true},
    {text: 'SyntaxError'},
    {text: 'Error: Invalid type'},
    {text: 'Error: Invalid Arguments'},
  ]}
>
  <slot name="question">
  <div className="question">
    让我们尝试一些重命名/赋值...
    ```ts
        'use strict';
        function displayPlace({
          name = 'N/A',
          place: location = 'N/A',
        }: {
          name: string;
          place: string;
          age?: number;
        }) {
          console.log(`${location}`);
        }
        displayPlace({ name: 'Dan', place: 'Denver' });
    ```
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    这将在控制台打印 `Denver`。`place` 属性在函数签名中被重命名为 `location`。这是在适配第三方数据结构时常见的模式（在解构过程中重命名属性）。
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={10}
  group="TS中的嵌套解构"
  title="嵌套默认值的解构"
  options={[
    {text: '错误：缺少属性 \'first\''},
    {text: '错误：缺少属性 \'last\''},
    {text: '错误：缺少属性 \'birth\' 和 \'age\'', isAnswer: true},
    {text: '错误：缺少属性 \'place\''},
    {text: '错误：\'string\' 在 {...} 中没有属性'},
  ]}
>
  <slot name="question">
  <div className="question">
    找出类型错误：
    ```ts
        function greet({
          name: {first = "N/A", last = "N/A"},
          birth: {place = "N/A"} = {},
          age = -1,
        }: {
          name: {first?: string, last?: string};
          birth: {place?: string};
          age: number;
        }) {
          console.log(`Hi ${first} ${last} from ${place}`);
        }
        greet({ name: {first: 'Dan'} });
    ```
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    错误出现在 `greet` 函数签名中。传递的对象缺少 `age` 和 `birth` 属性，因此它们在类型定义中应该是可选的。

    即使 `birth` 属性通过默认值进行解构，类型定义仍然要求它存在。要在 TypeScript 中将属性标记为可选，应使用 `?` 操作符。

    注意 `birth?: { place?: string }` 与 `birth: { place?: string } | undefined` 并不相同。
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={11}
  group="TypeScript + 赋值"
  title="嵌套值、赋值与类型的解构"
  options={[
    {text: '你好 Dan Levy 来自 N/A'},
    {text: '你好 Dan Levy 来自 Cape Town'},
    {text: '你好 N/A N/A 来自 N/A'},
    {text: '你好 N/A N/A 来自 Cape Town'},
    {text: '错误', isAnswer: true},
  ]}
>
  <slot name="question">
  <div className="question">
    现在使用**赋值**（注意变量 `f`、`l` 和 `p`）
    ```ts
        'use strict';
        function greet(
          {
            name: {first: f = "N/A", last: l = "N/A"},
            birth: {place: p = "N/A"} = {},
            age = -1,
          }: {
            name: {first?: string, last?: string};
            birth?: {place?: string};
            age?: number;
          }
        ) {
          console.log(`Hi ${f} ${l} from ${place}`);
          // What will 👆 do?
        }
        greet({
          name: {first: 'Dan', last: 'Levy'},
          birth: {place: 'Cape Town'},
        });
    ```
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    又一个错误！你开始猜了吧？！

    很难读懂层层嵌套的解构，还有默认值、赋值和类型！

    一旦 `place` 被重新赋值给变量 `p`，它就不再在 `console.log` 语句的作用域中定义了。
    ```ts
        console.log(`Hi ${f} ${l} from ${place}`); // ❌
        // to:
        console.log(`Hi ${f} ${l} from ${p}`); // ✅
    ```
  </div>
  </slot>
</Challenge>

</QuizUI>
````
