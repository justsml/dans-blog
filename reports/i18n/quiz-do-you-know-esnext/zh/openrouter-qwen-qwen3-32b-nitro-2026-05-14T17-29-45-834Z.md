# Translation Candidate
- Slug: quiz-do-you-know-esnext
- Locale: zh
- Model: openrouter/qwen/qwen3-32b:nitro
- Target: src/content/posts/2024-10-31--quiz-do-you-know-esnext/zh/index.mdx
- Validation: deferred
- Runtime seconds: 38.23
- Input tokens: 10447
- Output tokens: 11238
- Thinking tokens: unknown
- Cached input tokens: 2048
- Cache write tokens: 0
- Estimated cost: $0.003915
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
title: 测验：你了解现代 JavaScript 吗？
subTitle: 展示你的高超JavaScript技能！
label: ES2019+ Features
social_image: ../desktop-social.webp
category: Quiz
subCategory: JavaScript
unlisted: false
date: '2024-10-31'
modified: '2024-11-08'
tags:
  - quiz
  - javascript
  - intro
  - esnext
  - features
  - intermediate
cover_full_width: ../christopher-burns-8KfCR12oeUM-unsplash-wide.webp
cover_mobile: ../christopher-burns-8KfCR12oeUM-unsplash-square.webp
cover_icon: ../christopher-burns-8KfCR12oeUM-unsplash-square.webp
---
---
import Challenge from '../../../../components/QuizUI/Challenge';
import QuizUI from '../../../../components/QuizUI/QuizUI';


### 你了解从ES2015到ES2022的区别吗？

* **证明你的JavaScript技能！** 🚀
* 无需登录或注册。✨
* 多选题。🤖 ... _这有多难，嗯？_
---

<QuizUI>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={0}
  group="ES2020"
  title="空值合并运算符"
  options={[
    {text: '42'},
    {text: 'null'},
    {text: 'undefined'},
    {text: '100', isAnswer: true},
  ]}
>
  <slot name="question">
  <div className="question">
    result 的值是什么？
    ```js
        console.log(null ?? 100);
    ```
  </div>
  </slot>

  <slot name="hints">
  <div className="hint">
    检查 JavaScript 运算符的确切语义。诱人的答案往往是旧语法的行为，而不是这个新特性。
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    空值合并运算符 (`??`) 在左侧操作数 (`a`) 为 `null` 或 `undefined` 时返回右侧操作数 (`b`)。在此例中，`a` 是 `null`，因此 `result` 是 `100`。
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={1}
  group="ES2020"
  title="空值合并"
  options={[
    {text: 'false', isAnswer: true},
    {text: '42'},
    {text: 'null'},
    {text: 'undefined'},
    {text: '100'},
  ]}
>
  <slot name="question">
  <div className="question">
    以下代码的输出是什么？
    ```js
        const value = false;
        const defaultVal = 42;
        console.log(value ?? defaultVal);
    ```
  </div>
  </slot>

  <slot name="hints">
  <div className="hint">
    检查JavaScript操作符的确切语义。诱人的答案通常是旧语法会做的，而不是这个特性所做的。
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    空值合并操作符（`??`）将像`false`这样的假值视为有效值。由于`value`是`false`，它被视为有效值并被返回。
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={2}
  group="可选链操作符"
  title="可选链操作符"
  options={[
    {text: 'undefined', isAnswer: true},
    {text: 'Error: Cannot read property of undefined'},
    {text: 'null'},
    {text: '100'},
  ]}
>
  <slot name="question">
  <div className="question">
    以下代码的输出是什么？
    ```js
        const obj = { foo: null };
        const result = obj.foo?.bar;
        console.log(result);
    ```
  </div>
  </slot>

  <slot name="hints">
  <div className="hint">
    检查 JavaScript 操作符的精确语义。诱人的答案通常是旧语法的行为，而不是这个新特性的实际行为。
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    可选链操作符（`?.`）在左侧为 `null` 或 `undefined` 时会停止求值。由于 `obj.foo` 是 `null`，`obj.foo?.bar` 的结果是 `undefined`。
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={3}
  group="BigInt"
  title="BigInt 使用"
  options={[
    {text: '类型错误：不能混合 BigInt 和数字'},
    {text: '42n'},
    {text: '84n', isAnswer: true},
    {text: '未定义'},
  ]}
>
  <slot name="question">
  <div className="question">
    以下代码的输出是什么？
    ```js
        const a = 42n;
        const result = a * 2n;
        console.log(result);
    ```
  </div>
  </slot>

  <slot name="hints">
  <div className="hint">
    检查 JavaScript 操作符的确切语义。诱人的答案通常是旧语法的行为，而不是该功能的实际行为。
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    BigInt 值通过在数字后添加 `n` 来创建。你不能在算术运算中混合 BigInt 和普通数字。在这里，两个值都是 BigInt，因此乘法有效，结果为 `84n`。
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={4}
  group="动态导入"
  title="动态导入语法"
  options={[
    {text: 'SyntaxError'},
    {text: 'Promise'},
    {text: 'Module'},
    {text: 'object', isAnswer: true},
    {text: 'undefined'},
  ]}
>
  <slot name="question">
  <div className="question">
    这会输出什么？
    ```js
        const modulePromise = import('./myModule.js');
        console.log(typeof modulePromise);
    ```
  </div>
  </slot>

  <slot name="hints">
  <div className="hint">
    检查JavaScript运算符的确切语义。诱人的答案通常是旧语法会做的，而不是这个功能所做的。
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    `import()`函数返回一个`Promise`，该Promise解析为模块对象。由于`Promise`实例是对象，`typeof modulePromise`会记录`'object'`。
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={5}
  group="Promise.allSettled"
  title="Promise.allSettled"
  options={[
    {text: 'fulfilled: success', isAnswer: true},
    {text: 'Rejected: 错误'},
    {text: 'Pending'},
    {text: 'null'},
  ]}
>
  <slot name="question">
  <div className="question">
    以下代码的执行结果是什么？
    ```js
        const promises = [
          Promise.resolve('success'),
          Promise.reject('error')
        ];
        Promise.allSettled(promises).then(results => {
          console.log(results[0].status + ': ' + results[0].value);
        });
    ```
  </div>
  </slot>

  <slot name="hints">
  <div className="hint">
    检查JavaScript运算符的确切语义。诱人的答案通常是旧语法会做什么，而不是这个功能实际做什么。
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    `Promise.allSettled` 返回一个描述每个Promise结果的对象数组。第一个Promise是 `fulfilled`，值为 `'success'`，所以日志语句会打印 `fulfilled: success`。
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={6}
  group="String.matchAll"
  title="String.matchAll 用法"
  options={[
    {text: '匹配数组'},
    {text: '匹配的迭代器', isAnswer: true},
    {text: '错误：调用无效'},
    {text: 'null'},
  ]}
>
  <slot name="question">
  <div className="question">
    调用 `str.matchAll()` 会返回什么？
    ```js
        const str = 'foo1bar2baz3';
        const matches = str.matchAll(/\d/g);
    ```
  </div>
  </slot>

  <slot name="hints">
  <div className="hint">
    检查 JavaScript 运算符的确切语义。诱人的答案通常是旧语法的行为，而不是此功能的行为。
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    `String.matchAll` 返回的是匹配的迭代器，而不是数组。此迭代器可用于获取字符串中的所有匹配组。
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={7}
  group="导入元数据"
  title="import.meta.url的用途"
  options={[
    {text: '当前模块的URL', isAnswer: true},
    {text: '当前时间戳'},
    {text: '未定义'},
    {text: '语法错误'},
  ]}
>
  <slot name="question">
  <div className="question">
    `import.meta.url`代表什么？
    ```js
        console.log(import.meta.url);
    ```
  </div>
  </slot>

  <slot name="hints">
  <div className="hint">
    检查精确的JavaScript操作符语义。诱人的答案通常是旧语法会做什么，而不是这个特性实际做什么。
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    `import.meta`是一个包含当前模块元数据的对象。`import.meta.url`属性代表当前模块的URL，可以用来获取脚本运行位置的信息。
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={8}
  group="逻辑赋值"
  title="逻辑赋值"
  options={[
    {text: '5'},
    {text: '10', isAnswer: true},
    {text: 'undefined'},
    {text: 'null'},
  ]}
>
  <slot name="question">
  <div className="question">
    逻辑赋值后，`a` 的值是什么？
    ```js
        let a = null;
        a ||= 10;
        console.log(a);
    ```
  </div>
  </slot>

  <slot name="hints">
  <div className="hint">
    仔细检查 JavaScript 运算符的精确语义。容易被误导的答案通常是旧语法的行为，而不是这个特性的实际行为。
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    逻辑或赋值（`||=`）在左值为假值（`null`、`undefined`、`0`、`false` 等）时，会将右值赋给左值。由于 `a` 是 `null`，所以被赋值为 `10`。
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={9}
  group="逻辑空值赋值"
  title="逻辑空值赋值"
  options={[
    {text: '5'},
    {text: '10', isAnswer: true},
    {text: 'undefined'},
    {text: 'null'},
  ]}
>
  <slot name="question">
  <div className="question">
    在空值赋值后，`b` 的值是什么？
    ```js
        let b = null;
        b ??= 10;
        console.log(b);
    ```
  </div>
  </slot>

  <slot name="hints">
  <div className="hint">
    检查 JavaScript 运算符的确切语义。诱人的答案通常是旧语法会做的，而不是这个新特性。
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    空值合并赋值运算符 (`??=`) 会在左侧值为 `null` 或 `undefined` 时分配右侧的值。由于 `b` 是 `null`，所以被赋值为 `10`。
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={10}
  group="WeakRef"
  title="WeakRef 的用途"
  options={[
    {text: 'ReferenceError'},
    {text: '{ data: \'important\' }', isAnswer: true},
    {text: 'null'},
    {text: 'undefined'},
  ]}
>
  <slot name="question">
  <div className="question">
    WeakRef 提供了什么？
    ```js
        const obj = { data: 'important' };
        const ref = new WeakRef(obj);
        console.log(ref.deref());
    ```
  </div>
  </slot>

  <slot name="hints">
  <div className="hint">
    检查 JavaScript 操作符的精确语义。诱人的答案通常是旧语法的行为，而不是这个特性的实际作用。
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    WeakRef 提供对对象的弱引用，当没有其他强引用存在时，该对象可以被垃圾回收。由于此处 obj 仍有强引用，deref() 返回原始对象。如果目标已被回收，deref() 会返回 undefined。
  </div>
  </slot>
</Challenge>

</QuizUI>
````
