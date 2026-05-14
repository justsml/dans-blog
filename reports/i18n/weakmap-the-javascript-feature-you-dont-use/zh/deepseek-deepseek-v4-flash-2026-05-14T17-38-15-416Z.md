# Translation Candidate
- Slug: weakmap-the-javascript-feature-you-dont-use
- Locale: zh
- Model: deepseek/deepseek-v4-flash
- Target: src/content/posts/2025-12-29--weakmap-the-javascript-feature-you-dont-use/zh/index.mdx
- Validation: deferred
- Runtime seconds: 21.62
- Input tokens: 3157
- Output tokens: 3334
- Thinking tokens: unknown
- Cached input tokens: 384
- Cache write tokens: 0
- Estimated cost: $0.001323
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
title: 使用 WeakMap 终结内存泄漏
subTitle: 用弱引用修复弱代码！
date: '2025-12-29'
modified: '2026-01-12'
tags:
  - javascript
  - memory
  - garbage-collection
  - performance
  - patterns
category: Code
subCategory: Best Practices
cover_full_width: ../wide.webp
cover_mobile: ../square.webp
cover_icon: ../square.webp
---
你知道那种感觉吗——只改了一行代码，内存占用就掉了一半？我就在 Chrome DevTools 的性能监视器里体会过：一个仪表盘应用从每小时狂吞 100MB，变成整个下午都干干净净。

那一行改动：`new Map()` 变成了 `new WeakMap()`。

就这。相同的 API 表面，相同的使用模式，底层行为却完全不同。但理解它为什么有效，意味着理解大多数 JavaScript 开发者从未想过的事：当你的数据不再被任何人注视时，会发生什么。

## 当引用变成锚点

JavaScript 里的普通 Map 把它的键当作珍贵货物。一旦你把东西放进去，Map 就会用铁钳般的握持死死抓住它。垃圾回收器看到这种关系，会想：“显然他们还需要这个对象，最好别碰。”

这种保护本能在你存储临时对象的元数据时就成了问题。被移除的 DOM 节点、过期的用户会话、卸载的组件实例。Map 不知道这些对象已经没用了。它只知道它有一个引用，所以它让它们活着。

```javascript
const cache = new Map();

function trackClick(element) {
  cache.set(element, { clicks: 0 });
}

document.body.removeChild(element);
// 元素已从 DOM 中移除，但 cache 仍持有它的引用
```

垃圾回收器无法清理 `element`，因为 `cache` 仍然指向它。这被称为“强引用”，在长时间运行的单页应用中，它会变成泄漏，最终导致浏览器崩溃。

## WeakMap 改变了规则

WeakMap 的工作方式不同。它把键当作临时居民，而非永久住户。当你把东西存进 WeakMap 时，你本质上是在说：“我想把这份数据和这个对象关联起来，但我不想成为它存活的原因。”

如果唯一让一个对象留在内存里的东西是 WeakMap，垃圾回收器就允许把它带走。当对象消失时，WeakMap 的条目也随之消失。无需手动清理。

```javascript
const cache = new WeakMap();

function trackClick(element) {
  cache.set(element, { clicks: 0 });
}

document.body.removeChild(element);
// 元素被垃圾回收
// cache 条目自动消失
```

我跑了一个基准测试：创建 10 万个 DOM 节点，存储每个节点的元数据，然后全部移除。用 Map 时，浏览器保留了 150-200MB。用 WeakMap 时，降到了 70-80MB。同样的代码，同样的功能，内存占用减半。

## 你放弃了什么

WeakMap 有一些约束，看起来像是限制，直到你意识到它们正是魔法生效的原因。

**你不能遍历 WeakMap。** 没有 `forEach`，没有 `keys()`，没有 `values()`。这说得通：垃圾回收器可能在你循环中间删除一个条目。你真的想处理那种情况吗？

你不能检查大小。没有 `.size` 属性，没有 `.length`。同样，这是一个移动的目标。数字在你询问和得到答案之间就可能变化。

**键必须是对象。** 不能是字符串、数字或原始值。这是弱引用工作的基础：原始值没有独立于其值的可追踪标识。

这些不是 bug。它们是设计。WeakMap 是为一个特定任务而生的：将元数据附加到对象上，同时不阻止这些对象被清理。如果你需要遍历、原始键或条目计数，你很可能在解决一个不同的问题，应该使用普通的 Map。

## 这到底在什么地方有用

## 这到底在什么地方有用

"私有数据"模式是 WeakMap 最初的用例，早在 JavaScript 拥有 `#private` 字段之前。库会在类外部创建一个 WeakMap，用它来存储不应在实例上访问的数据。

```javascript
const privateData = new WeakMap();

class User {
  constructor(name) {
    privateData.set(this, { name });
  }

  getName() {
    return privateData.get(this).name;
  }
}
```

当 User 实例被垃圾回收时，私有数据也随之消失。无需清理代码。

记忆化是另一个天然的应用场景，尤其是当你基于对象输入而非原始值缓存结果时。如果你的昂贵计算接受一个配置对象作为输入，WeakMap 意味着你无需担心缓存比配置对象活得更久。

```javascript
const cache = new WeakMap();

function expensiveCalc(obj) {
  if (cache.has(obj)) return cache.get(obj);
  
  const result = heavyMath(obj);
  cache.set(obj, result);
  return result;
}
```

缓存只与缓存的对象同寿命。一旦 `obj` 在其他地方不再被引用，缓存结果和缓存条目会一起消失。

## 什么时候该用它

现代 Web 应用中的内存泄漏通常来自本应被清理的陈旧引用。如果你在构建任何长期运行的东西——一个整天开着的仪表盘、一个运行数小时的聊天应用、一个从不刷新的管理面板——你需要考虑旧数据会怎样。

WeakMap 在将数据与 DOM 节点、组件实例或任何你无法控制生命周期的对象关联时特别有用。如果你基于某个引用存储东西，而那个引用可能消失，WeakMap 会让清理变得简单得多。

普通 Map 仍然是正确的选择：当你构建一个带有淘汰策略的实际缓存时，当你需要遍历条目时，当你使用原始值作为键时，或者当数据本身比它与对象的关联更重要时。

`WeakMap` 的好处在于，通常你很容易判断何时需要它。如果你发现自己编写清理代码来在对象销毁时删除 Map 条目，那是一个信号。如果你担心内存无限制增长，因为不确定何时删除东西，那是另一个信号。

有时候，最好的特性就是那种无需你操心就能正常工作的特性。

## 资源

- [MDN: WeakMap](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakMap)
- [MDN: 内存管理](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Memory_management)
- [V8 博客: 弱引用与终结器](https://v8.dev/features/weak-references)
- [JavaScript.info: WeakMap 和 WeakSet](https://javascript.info/weakmap-weakset)
````
