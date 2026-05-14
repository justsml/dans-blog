# Translation Candidate
- Slug: quiz-js-interfaces-symbols-and-enumerables
- Locale: zh
- Model: openrouter/google/gemini-3-flash-preview
- Target: src/content/posts/2024-10-31--quiz-js-interfaces-symbols-and-enumerables/zh/index.mdx
- Validation: deferred
- Runtime seconds: 67.37
- Input tokens: 6929
- Output tokens: 2764
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- Estimated cost: $0.011757
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
unlisted: false
title: 测验：Symbol 与可枚举性
subTitle: ES2015 那些冷门特性，你了解多少？
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
## 测验：JavaScript 接口、Symbol 与可枚举性

> * **证明你的 JavaScript 实力！** 🚀
> * 无需登录或注册。 ✨
> * 多选题。 🤖 ……能有多难，对吧？

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
    {text: '调用方法来访问该值'},
    {text: '直接访问该值', isAnswer: true},
    {text: '抛出错误'},
  ]}
>
  <slot name="question">
  <div className="question">
    你应该如何访问一个使用了 getter 方法的 JavaScript 对象属性？
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
    在 JavaScript 中，getter 可以像普通属性一样被访问。不需要像函数那样调用它。
    在这个例子中，直接访问 `obj.val` 就会触发 getter 方法并输出 `got it!`。
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={1}
  group="高级接口"
  title="在对象键中使用 Symbol"
  options={[
    {text: '使用 Symbol', isAnswer: true},
    {text: '使用字符串'},
    {text: '使用数字'},
    {text: '使用对象作为键'},
  ]}
>
  <slot name="question">
  <div className="question">
    为 JavaScript 对象创建一个真正唯一的属性键，正确的方法是什么？
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
    Symbol 是一种唯一且不可变的原始类型，可用作对象属性的键。这有助于避免命名冲突，特别是在大型代码库或编写可重用库时。
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
    {text: '不，它不会被列出'},
    {text: '取决于值的类型'},
    {text: '是的，它会被列出', isAnswer: true},
  ]}
>
  <slot name="question">
  <div className="question">
    在 `for...in` 循环迭代期间，`age` 属性会被列出来吗？
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
    `Object.defineProperty()` 中的 `enumerable` 属性控制该属性是否会出现在 `for...in` 等枚举方法中。在这个例子中，由于 `enumerable: true`，`age` 属性在迭代期间会被列出。
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
    在使用 `Object.defineProperty()` 且未明确指定 `enumerable` 时，该属性的默认可枚举性是什么？
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
  title="唯一 Symbol"
  options={[
    {text: '取决于它们的描述内容'},
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
    每次调用 `Symbol()` 都会创建一个唯一且不可变的值，即使描述内容相同也是如此。在这个例子中，`sym1` 和 `sym2` 是两个不同的 symbol，因此比较结果返回 `false`。
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={5}
  group="高级接口"
  title="Symbol 作为不可枚举键"
  options={[
    {text: '不，它不会被列出', isAnswer: true},
    {text: '是的，它会被列出'},
    {text: '取决于迭代方法'},
    {text: '抛出错误'},
  ]}
>
  <slot name="question">
  <div className="question">
    在 `for...in` 迭代期间，以 Symbol 作为键的属性会被列出吗？
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
    虽然 Symbol 键属性可以拥有自己的 `enumerable` 标志，但 `for...in` 和 `Object.keys()` 只会访问字符串键的可枚举属性。在这个例子中，只有 `regularKey` 会被列出，而 Symbol 键属性则不会。
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={6}
  group="高级接口"
  title="获取所有 Symbol 键名"
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
    哪种方法可以用来获取一个对象的所有 Symbol 键名？
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    `Object.getOwnPropertySymbols()` 方法专门用于获取对象自身的所有 Symbol 属性键。
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
