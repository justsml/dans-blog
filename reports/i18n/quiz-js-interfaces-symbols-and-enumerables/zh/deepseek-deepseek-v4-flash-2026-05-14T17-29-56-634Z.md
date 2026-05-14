# Translation Candidate
- Slug: quiz-js-interfaces-symbols-and-enumerables
- Locale: zh
- Model: deepseek/deepseek-v4-flash
- Target: src/content/posts/2024-10-31--quiz-js-interfaces-symbols-and-enumerables/zh/index.mdx
- Validation: deferred
- Runtime seconds: 50.59
- Input tokens: 6693
- Output tokens: 7096
- Thinking tokens: unknown
- Cached input tokens: 640
- Cache write tokens: 0
- Estimated cost: $0.002937
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
unlisted: false
title: 测验：Symbol 与可枚举性
subTitle: 你了解ES2015的冷门知识点吗？
label: Symbols
social_image: ../desktop-social.webp
category: Quiz
subCategory: JavaScript
date: '2024-10-31'
modified: '2024-11-07'
tags:
  - quiz
  - javascript
  - interfaces
  - symbols
  - enumerables
cover_full_width: ../logan-weaver-lgnwvr-96ES9AOLRzQ-unsplash.webp
cover_mobile: ../logan-weaver-lgnwvr-96ES9AOLRzQ-unsplash_w300.webp
cover_icon: ../logan-weaver-lgnwvr-96ES9AOLRzQ-unsplash_w300.webp
---
---
## 测验：JavaScript 接口、Symbol 与可枚举属性

> * **证明你的 JavaScript 技能！** 🚀
> * 无需登录或注册。 ✨
> * 选择题。 🤖 ... _能有多难呢，嗯？_

import Challenge from '../../../../components/QuizUI/Challenge';
import QuizUI from '../../../../components/QuizUI/QuizUI';
---

<QuizUI>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={0}
  group="高级接口"
  title="Getter 与直接属性访问"
  options={[
    {text: '使用循环'},
    {text: '调用方法来访问值'},
    {text: '直接访问值', isAnswer: true},
    {text: '抛出错误'},
  ]}
>
  <slot name="question">
  <div className="question">
    你应该如何访问使用了 getter 方法的 JavaScript 对象属性？
    ```js
        const obj = {
          get val() {
            return 'got it!';
          }
        };
        console.log(obj.val);
    ```
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    在 JavaScript 中，getter 可以像普通属性一样访问。无需像函数一样调用它。
    在这个例子中，直接访问 `obj.val` 会调用 getter 方法并输出 `got it!`。
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={1}
  group="高级接口"
  title="Symbol在对象键中的使用"
  options={[
    {text: '使用Symbol', isAnswer: true},
    {text: '使用字符串'},
    {text: '使用数字'},
    {text: '使用对象作为键'},
  ]}
>
  <slot name="question">
  <div className="question">
    创建JavaScript对象真正唯一属性键的正确方法是什么？
    ```js
        const uniqueKey = Symbol('myUniqueKey');
        const obj = {
          [uniqueKey]: 'unique value'
        };
        console.log(obj[uniqueKey]);
    ```
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    Symbol是一种独特且不可变的原始类型，可用作对象属性的键。这有助于避免名称冲突，特别是在大型代码库或编写可重用库时。
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={2}
  group="高级接口"
  title="可枚举属性"
  options={[
    {text: '抛出错误'},
    {text: '不，它不会'},
    {text: '取决于值的类型'},
    {text: '是的，它会被列出', isAnswer: true},
  ]}
>
  <slot name="question">
  <div className="question">
    在 `for...in` 迭代中，属性 `age` 会被列出吗？
    ```js
        const person = {};
        Object.defineProperty(person, 'age', {
          value: 25,
          enumerable: true
        });
        for (let key in person) {
          console.log(key);
        }
    ```
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    `Object.defineProperty()` 中的 `enumerable` 属性控制该属性是否会出现在像 `for...in` 这样的枚举方法中。在这个例子中，由于 `enumerable: true`，`age` 属性会在迭代中被列出。
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={3}
  group="对象操作"
  title="使用 Object.defineProperty() 时的默认可枚举性"
  options={[
    {text: 'true'},
    {text: 'false', isAnswer: true},
    {text: 'undefined'},
    {text: '取决于上下文'},
  ]}
>
  <slot name="question">
  <div className="question">
    当使用 `Object.defineProperty()` 且未指定 `enumerable` 时，属性的默认可枚举性是什么？
    ```js
        const car = {};
        Object.defineProperty(car, 'make', {
          value: 'Toyota'
        });
        console.log(Object.keys(car));
    ```
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    当你使用 `Object.defineProperty()` 而不指定 `enumerable` 时，其默认值为 `false`。这意味着 `make` 属性不会出现在 `Object.keys()` 或其他枚举方法中。
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={4}
  group="高级接口"
  title="唯一符号"
  options={[
    {text: '取决于它们的描述'},
    {text: 'true'},
    {text: 'false', isAnswer: true},
    {text: '抛出错误'},
  ]}
>
  <slot name="question">
  <div className="question">
    以下比较的结果是什么？
    ```js
        const sym1 = Symbol('id');
        const sym2 = Symbol('id');
        console.log(sym1 === sym2);
    ```
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    每次调用 `Symbol()` 都会创建一个唯一且不可变的值，即使描述相同也是如此。在这种情况下，`sym1` 和 `sym2` 是不同的符号，因此比较返回 `false`。
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={5}
  group="高级接口"
  title="Symbol作为不可枚举键"
  options={[
    {text: '不，它不会', isAnswer: true},
    {text: '是的，它会被列出'},
    {text: '取决于迭代方法'},
    {text: '会抛出错误'},
  ]}
>
  <slot name="question">
  <div className="question">
    在 `for...in` 迭代中，Symbol 键的属性会被列出吗？
    ```js
        const sym = Symbol('uniqueKey');
        const obj = {
          [sym]: 'symbol value',
          regularKey: 'regular value'
        };
        for (let key in obj) {
          console.log(key);
        }
    ```
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    Symbol 键的属性可以有自己的 `enumerable` 标志，但 `for...in` 和 `Object.keys()` 只访问字符串键的可枚举属性。在这个例子中，只有 `regularKey` 会被列出，而不是 Symbol 键的属性。
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={6}
  group="高级接口"
  title="检索所有 Symbol 键"
  options={[
    {text: 'Object.keys()'},
    {text: 'Symbol.keys()'},
    {text: 'Object.symbols()'},
    {text: 'Object.getOwnPropertySymbols()', isAnswer: true},
    {text: 'Object.entries()'},
  ]}
>
  <slot name="question">
  <div className="question">
    哪种方法可以用来检索一个对象的所有 Symbol 键？
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    `Object.getOwnPropertySymbols()` 方法用于检索对象自身的 Symbol 属性键。
    ```js
        const sym1 = Symbol('id');
        const sym2 = Symbol('name');
        const obj = {
          [sym1]: 'symbol value',
          [sym2]: 'another symbol value'
        };
        console.log(Object.getOwnPropertySymbols(obj));
        // [Symbol(id), Symbol(name)]
    ```
  </div>
  </slot>
</Challenge>

</QuizUI>
````
