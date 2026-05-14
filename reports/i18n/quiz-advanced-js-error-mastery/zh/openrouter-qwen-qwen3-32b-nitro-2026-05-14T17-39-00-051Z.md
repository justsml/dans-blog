# Translation Candidate
- Slug: quiz-advanced-js-error-mastery
- Locale: zh
- Model: openrouter/qwen/qwen3-32b:nitro
- Target: src/content/posts/2025-11-04--quiz-advanced-js-error-mastery/zh/index.mdx
- Validation: deferred
- Runtime seconds: 35.51
- Input tokens: 13321
- Output tokens: 11695
- Thinking tokens: unknown
- Cached input tokens: 5120
- Cache write tokens: 0
- Estimated cost: $0.004686
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
title: 测验：高级 JavaScript 错误处理
subTitle: 你的异常是否真的罕见？
label: Errors
category: Quiz
subCategory: JavaScript
unlisted: false
date: '2025-11-03'
modified: '2025-11-04'
tags:
  - quiz
  - javascript
  - error-handling
  - debugging
  - advanced
cover_full_width: ../ahmed-slimene-c09hZthLq_s-unsplash-wide.webp
cover_mobile: ../ahmed-slimene-c09hZthLq_s-unsplash-square-300px.webp
cover_icon: ../ahmed-slimene-c09hZthLq_s-unsplash-square-300px.webp
cover_credit: >-
  Photo by <a
  href="https://unsplash.com/@assl?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Ahmed
  Slimene</a> on <a
  href="https://unsplash.com/photos/a-tall-white-building-with-balconies-on-top-of-it-c09hZthLq_s?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>
---
import Challenge from '../../../../components/QuizUI/Challenge';
import QuizUI from '../../../../components/QuizUI/QuizUI';


### 以为自己精通 JavaScript 错误处理？

* **测试你的错误处理能力！** 💥
* 无需登录或注册。✨
* 多项选择题。🤖 ... _这些问题可不是普通的 try-catch 用法！_

<QuizUI>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={0}
  group="序列化中的意外"
  title="空对象之谜"
  options={[
    {text: '{"message":"Oops","name":"Error"}'},
    {text: '{}', isAnswer: true},
    {text: '{"error":"Oops"}'},
    {text: 'null'},
  ]}
>
  <slot name="question">
  <div className="question">
    `JSON.stringify(error)`会返回什么？
    ```js
        const error = new Error('Oops');
        console.log(JSON.stringify(error));
    ```
  </div>
  </slot>

  <slot name="hints">
  <div className="hint">
    考虑Error对象上的可枚举属性。
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    Error对象具有非可枚举属性（`message`、`name`、`stack`），因此`JSON.stringify()`返回`{}`。这是在API响应中发送错误时常见的陷阱。使用`JSON.stringify(error, Object.getOwnPropertyNames(error))`或创建一个普通对象代替。
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={1}
  group="序列化陷阱"
  title="控制台与JSON"
  options={[
    {text: '两者输出相同'},
    {text: 'console.log显示更多信息', isAnswer: true},
    {text: 'JSON.stringify显示更多信息'},
    {text: '两者都显示空对象'},
  ]}
>
  <slot name="question">
  <div className="question">
    这两者有什么区别？
    ```js
        const err = new Error('Test');
        console.log(err);
        console.log(JSON.stringify(err));
    ```
  </div>
  </slot>

  <slot name="hints">
  <div className="hint">
    考虑console.log如何处理对象与JSON序列化的区别。
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    `console.log(err)`会显示错误对象的message和stack trace，因为控制台对Error对象有特殊处理。`JSON.stringify(err)`返回`'{}'`，因为Error对象的属性不可枚举。这种差异让很多调试API的开发者踩坑。
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={2}
  group="类型检查技巧"
  title="instanceof 继承"
  options={[
    {text: 'true, true, true', isAnswer: true},
    {text: 'true, false, false'},
    {text: 'false, true, true'},
    {text: 'true, true, false'},
  ]}
>
  <slot name="question">
  <div className="question">
    这些检查的结果是什么？
    ```js
        class CustomError extends Error {}
        const err = new CustomError('test');
    
        console.log(err instanceof CustomError);
        console.log(err instanceof Error);
        console.log(err instanceof Object);
    ```
  </div>
  </slot>

  <slot name="hints">
  <div className="hint">
    记住JavaScript继承中的原型链。
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    三个都返回`true`。`CustomError`继承自`Error`，而`Error`又继承自`Object`。`instanceof`运算符会检查整个原型链，因此`CustomError`实例同时也是`Error`和`Object`的实例。
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={3}
  group="类型检查技巧"
  title="跨框架的instanceof"
  options={[
    {text: '始终为真'},
    {text: '始终为假'},
    {text: '在不同框架中可能为假', isAnswer: true},
    {text: '抛出错误'},
  ]}
>
  <slot name="question">
  <div className="question">
    在iframe中使用`instanceof Error`会发生什么？
    ```js
        // In iframe:
        const iframeError = new Error('test');
        // In parent window:
        console.log(iframeError instanceof Error);
    ```
  </div>
  </slot>

  <slot name="hints">
  <div className="hint">
    不同的上下文有不同的Error构造函数。
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    `instanceof`在不同执行上下文（iframe、worker线程）中可能返回`false`，因为每个上下文都有独立的`Error`构造函数。使用`Object.prototype.toString.call(obj) === '[object Error]'`可以跨上下文可靠检测错误类型。
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={4}
  group="抛出非错误对象"
  title="抛出字符串"
  options={[
    {text: 'TypeError: 字符串不是错误对象'},
    {text: 'false，字符串类型', isAnswer: true},
    {text: '自动创建错误对象'},
    {text: '未定义行为'},
  ]}
>
  <slot name="question">
  <div className="question">
    抛出字符串会发生什么？
    ```js
        try {
          throw "Oops!";
        } catch (e) {
          console.log(e instanceof Error);
          console.log(typeof e);
        }
    ```
  </div>
  </slot>

  <slot name="hints">
  <div className="hint">
    JavaScript允许抛出任何值，而不仅仅是错误对象。
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    JavaScript允许抛出任何值。此处，`e instanceof Error`为`false`，而`typeof e`为`"string"`。这可能会破坏假设所有捕获的异常都是错误对象的错误处理代码。始终抛出错误实例以获得更好的调试体验。
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={5}
  group="自定义错误"
  title="错误名称属性"
  options={[
    {text: '"错误"'},
    {text: '"CustomError"', isAnswer: true},
    {text: 'undefined'},
    {text: '取决于浏览器'},
  ]}
>
  <slot name="question">
  <div className="question">
    `err.name` 的值是什么？
    ```js
        class CustomError extends Error {
          constructor(message) {
            super(message);
            this.name = this.constructor.name;
          }
        }
        const err = new CustomError('test');
        console.log(err.name);
    ```
  </div>
  </slot>

  <slot name="hints">
  <div className="hint">
    查看 `this.constructor.name` 的值。
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    `err.name` 是 "CustomError"，因为 `this.constructor.name` 返回类名。设置 `this.name = this.constructor.name` 是一种常见模式，以确保自定义错误类在堆栈跟踪和错误消息中显示正确的名称。
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={6}
  group="自定义错误"
  title="构造函数名称陷阱"
  options={[
    {text: '"MyError"'},
    {text: '"Error"', isAnswer: true},
    {text: 'undefined'},
    {text: 'TypeError'},
  ]}
>
  <slot name="question">
  <div className="question">
    不设置 `name` 时输出是什么？
    ```js
        class MyError extends Error {
          // No constructor or name setting
        }
        const err = new MyError('test');
        console.log(err.name);
    ```
  </div>
  </slot>

  <slot name="hints">
  <div className="hint">
    Error 默认的 name 属性包含什么？
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    未显式设置 `this.name` 时，错误会从 `Error` 类继承默认的 `name` 属性，即 `"Error"`。这就是为什么自定义错误类应在构造函数中始终设置 `this.name = this.constructor.name`。
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={7}
  group="错误原因"
  title="现代 Error.cause"
  options={[
    {text: '"原始错误"', isAnswer: true},
    {text: 'undefined'},
    {text: '包装错误'},
    {text: 'SyntaxError'},
  ]}
>
  <slot name="question">
  <div className="question">
    执行 `wrapper.cause.message` 会返回什么？
    ```js
        const original = new Error('Original error');
        const wrapper = new Error('Wrapper', 
          { cause: original }
        );
        console.log(wrapper.cause.message);
    ```
  </div>
  </slot>

  <slot name="hints">
  <div className="hint">
    Error.cause 是现代 JavaScript 中用于错误链的功能。
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    `Error.cause`（ES2022）允许通过链式错误保留原始错误上下文。`wrapper.cause` 引用原始错误，因此 `wrapper.cause.message` 返回 `"原始错误"`。这种机制在将底层错误包装到更高层次上下文时非常有用。
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={8}
  group="堆栈跟踪"
  title="堆栈操作"
  options={[
    {text: '从堆栈中移除createError', isAnswer: true},
    {text: '清除整个堆栈'},
    {text: '无任何操作'},
    {text: '抛出TypeError'},
  ]}
>
  <slot name="question">
  <div className="question">
    `Error.captureStackTrace`的作用是什么？
    ```js
        function createError(msg) {
          const err = new Error(msg);
          Error.captureStackTrace(err, createError);
          return err;
        }
        const error = createError('test');
    ```
  </div>
  </slot>

  <slot name="hints">
  <div className="hint">
    这是V8特有的功能，用于清理堆栈跟踪。
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    `Error.captureStackTrace`（V8/Node.js）会从堆栈跟踪中移除指定的函数（`createError`），使错误工厂函数对最终用户不可见。这会创建更清晰的堆栈跟踪，指向工厂函数被调用的位置，而不是工厂函数本身。
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={9}
  group="消息模板"
  title="错误中的模板字面量"
  options={[
    {text: '"Value ${value} is invalid"'},
    {text: '"Value undefined is invalid"', isAnswer: true},
    {text: 'ReferenceError: value is not defined'},
    {text: '"Value  is invalid"'},
  ]}
>
  <slot name="question">
  <div className="question">
    错误信息是什么？
    ```js
        function validate(value) {
          if (!value) {
            throw new Error(
              `Value ${value} is invalid`
            );
          }
        }
        try {
          validate(undefined);
        } catch (e) {
          console.log(e.message);
        }
    ```
  </div>
  </slot>

  <slot name="hints">
  <div className="hint">
    模板字面量插值如何处理undefined？
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    模板字面量在插值时会将`undefined`转换为字符串`"undefined"`。最终错误信息会变成`"Value undefined is invalid"`。为了获得更清晰的提示，建议在插值前使用`value ?? 'null'`或类似检查进行预处理。
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={10}
  group="API陷阱"
  title="Express响应错误"
  options={[
    {text: '发送完整的错误对象'},
    {text: '发送{"error":{}}', isAnswer: true},
    {text: '抛出服务器错误'},
    {text: '仅发送错误信息'},
  ]}
>
  <slot name="question">
  <div className="question">
    客户端会接收到什么？
    ```js
        // Express.js route
        app.get('/api/data', (req, res) => {
          const error = new Error('Database failed');
          res.json({ error });
        });
    ```
  </div>
  </slot>

  <slot name="hints">
  <div className="hint">
    记住Error对象如何被JSON.stringify序列化
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    `res.json()`内部使用`JSON.stringify()`，所以Error对象会变成`{}`。客户端实际接收到的是`{"error":{}}`。要修复这个问题，应该使用`res.json({ error: error.message })`或者`res.json({ error: { message: error.message, name: error.name } })`。
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={11}
  group="异步错误"
  title="Promise 拒绝值"
  options={[
    {text: '始终是 Error 对象'},
    {text: '任何值都可以作为拒绝原因', isAnswer: true},
    {text: '仅字符串和 Error 对象'},
    {text: '自动包装为 Error'},
  ]}
>
  <slot name="question">
  <div className="question">
    Promise.reject() 可以接受什么类型的参数？
    ```js
        Promise.reject('string').catch(e => 
          console.log(typeof e)
        );
        Promise.reject({code: 404}).catch(e => 
          console.log(e.code)
        );
        Promise.reject(42).catch(e => 
          console.log(e)
        );
    ```
  </div>
  </slot>

  <slot name="hints">
  <div className="hint">
    Promise 的拒绝行为与 throw 语句类似。
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    与 throw 类似，Promise.reject() 接受任何值 - 字符串、对象、数字等。这会打印出 "string"、404 和 42。在 promise 链中始终检查捕获值的类型，尤其是在处理可能用非 Error 值拒绝的第三方代码时。
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={12}
  group="错误属性"
  title="非标准属性"
  options={[
    {text: '始终可用'},
    {text: '可能在所有环境中都不存在', isAnswer: true},
    {text: '仅在 Node.js 中存在'},
    {text: '已弃用并移除'},
  ]}
>
  <slot name="question">
  <div className="question">
    error.code 和 error.errno 的可靠性如何？
    ```js
        const fs = require('fs');
        fs.readFile('missing.txt', (err, data) => {
          if (err) {
            console.log(err.code);    // 'ENOENT'
            console.log(err.errno);   // -2
          }
        });
    ```
  </div>
  </slot>

  <slot name="hints">
  <div className="hint">
    考虑不同的 JavaScript 环境和错误类型。
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    code 和 errno 属性是环境特定的（如 Node.js 中的情况），并非标准 Error 对象的一部分。浏览器错误不会包含这些属性。始终检查它们是否存在：if (err.code === 'ENOENT')，而不是假设它们一定存在。
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={13}
  group="错误边界"
  title="对象与错误检测"
  options={[
    {text: 'true, true'},
    {text: 'false, false', isAnswer: true},
    {text: 'true, false'},
    {text: 'false, true'},
  ]}
>
  <slot name="question">
  <div className="question">
    这些检查返回什么？
    ```js
        const fakeError = {
          name: 'Error',
          message: 'Fake error',
          stack: 'fake stack'
        };
    
        console.log(fakeError instanceof Error);
        console.log(Object.prototype.toString.call(
          fakeError
        ) === '[object Error]');
    ```
  </div>
  </slot>

  <slot name="hints">
  <div className="hint">
    一个检查原型链，另一个检查内部插槽
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    `instanceof Error`返回`false`因为该对象不是由Error构造函数创建的。`Object.prototype.toString.call()`也返回`false`（它返回`'[object Object]'`）因为它检查内部`[[Class]]`插槽。这两种方法都正确识别这是一个伪造的错误对象。
  </div>
  </slot>
</Challenge>

</QuizUI>

## 精通错误处理的艺术

从序列化陷阱到跨上下文的instanceof失败，这些高级概念将初级开发者与~资深~受损专业人士区分开来。

准备好迎接更多挑战了吗？查看我们的[完整测验合集](../challenges/)，获取更多关于JavaScript、算法等的脑力挑战！
````
