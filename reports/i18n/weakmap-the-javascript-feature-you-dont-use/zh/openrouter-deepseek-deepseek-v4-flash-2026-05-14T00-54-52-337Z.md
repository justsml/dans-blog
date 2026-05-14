# Translation Candidate
- Slug: weakmap-the-javascript-feature-you-dont-use
- Locale: zh
- Model: openrouter/deepseek/deepseek-v4-flash
- Target: src/content/posts/2025-12-29--weakmap-the-javascript-feature-you-dont-use/zh/index.mdx
- Validation: deferred
- Runtime seconds: 16.72
- Input tokens: 4270
- Output tokens: 1760
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- Estimated cost: $0.001091
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
title: 使用 WeakMap 防止内存泄漏
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
你懂那种感觉吗？改了一行代码，内存占用就降了 50%。我就在 Chrome DevTools 的 Performance Monitor 里亲眼见证过：一个仪表盘应用从每小时泄漏 100MB，变成整个下午都干干净净。

那一行改动就是：`new Map()` 变成了 `new WeakMap()`。

就这。同样的 API 接口，同样的使用方式，底层行为却完全不同。但要理解为什么有效，就得先弄明白大多数 JavaScript 开发者从没想过的事：当没人再盯着你的数据时，到底发生了什么。

## 当引用变成锚点

JavaScript 里的普通 Map 会把它的键当成宝贝。一旦你把东西放进去，Map 就会死死攥住它。垃圾回收器看到这种关系，心想：“显然他们还需要这个对象，最好别碰。”

这种保护本能在你存储临时对象的元数据时就变成了问题。被移除的 DOM 节点、过期的用户会话、卸载的组件实例。Map 不知道这些对象已经没用了，它只知道手里有引用，所以一直留着它们。

```javascript
const cache = new Map();

function trackClick(element) {
  cache.set(element, { clicks: 0 });
}

document.body.removeChild(element);
// 元素已经从 DOM 中移除，但 cache 仍然把它留在内存里
```

垃圾回收器没法清理 `element`，因为 `cache` 还在指着它。这就是所谓的“强引用”，在长期运行的单页应用里，它会变成泄漏，最终让浏览器崩溃。

## WeakMap 改变规则

WeakMap 的工作方式不同。它把键当作临时居民，而不是永久住户。当你把东西存进 WeakMap 时，你实际上是在说：“我想把这个数据和这个对象关联起来，但我不想成为它存活的原因。”

如果唯一让一个对象留在内存里的东西是 WeakMap，那么垃圾回收器就可以把它带走。对象消失时，WeakMap 里的条目也跟着消失。不需要手动清理。

```javascript
const cache = new WeakMap();

function trackClick(element) {
  cache.set(element, { clicks: 0 });
}

document.body.removeChild(element);
// 元素被垃圾回收
// 缓存条目自动消失
```

我跑了一个基准测试：创建 10 万个 DOM 节点，存储每个节点的元数据，然后全部移除。用 Map 时，浏览器占用了 150-200MB；用 WeakMap 时，降到了 70-80MB。同样的代码，同样的功能，内存占用减半。

## 你放弃的东西

WeakMap 有一些约束，乍看像限制，但想明白就知道这正是它神奇之处。

**你不能遍历 WeakMap。** 没有 `forEach`，没有 `keys()`，没有 `values()`。这说得通：垃圾回收器可能在循环中途删除条目。你真的想处理那种情况吗？

你不能检查大小。没有 `.size` 属性，没有 `.length`。同样，它是一个移动靶子。你问的时候和拿到答案的时候，数量可能已经变了。

**键必须是对象。** 不能是字符串、数字或原始类型。这是弱引用工作的基础：原始值没有独立于其值之外可追踪的标识。

这些不是 bug，而是设计。WeakMap 为一项特定任务而生：将元数据附加到对象上，同时不阻止这些对象被清理。如果你需要遍历、原始键或条目计数，那你可能是在解决另一个问题，应该用普通的 Map。

## 这在实际中帮到谁

“私有数据”模式是 WeakMap 最初的用例，早在 JavaScript 有 `#private` 字段之前。库会在类外部创建一个 WeakMap，用它存储不应在实例上访问的数据。

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

记忆化是另一个天然的应用场景，尤其是当你基于对象输入（而非原始值）缓存结果时。如果你的昂贵计算接收一个配置对象作为输入，使用 WeakMap 意味着你无需担心缓存比配置对象活得更久。

```javascript
const cache = new WeakMap();

function expensiveCalc(obj) {
  if (cache.has(obj)) return cache.get(obj);
  
  const result = heavyMath(obj);
  cache.set(obj, result);
  return result;
}
```

缓存的生命周期与被缓存的对象绑定。一旦 `obj` 在其他地方不再被引用，缓存结果和缓存条目会一起消失。

## 何时使用它

现代 Web 应用中的内存泄漏通常来自对应该被清理的对象的陈旧引用。如果你在构建任何长期运行的应用——一个整天保持打开状态的面板、一个运行数小时的聊天应用、一个从不刷新的管理后台——你需要考虑旧数据会怎样。

WeakMap 特别适用于将数据与 DOM 节点、组件实例或任何你无法控制其生命周期的对象关联的场景。如果你基于某个引用存储数据，而该引用可能消失，WeakMap 能让清理变得简单得多。

普通的 Map 仍然是正确选择的情况包括：构建带有淘汰策略的实际缓存、需要遍历条目、使用原始值作为键，或者数据本身比它与对象的关联更重要时。

WeakMap 的好处在于，你通常能很明显地判断何时需要它。如果你发现自己编写清理代码来在对象销毁时移除 Map 条目，这就是一个信号。如果你担心内存无限增长，因为不确定何时删除数据，这也是一个信号。

有时候，最好的特性就是那种无需你操心就能正常工作的东西。

## 资源

- [MDN: WeakMap](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakMap)
- [MDN: 内存管理](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Memory_management)
- [V8 博客：弱引用与终结器](https://v8.dev/features/weak-references)
- [JavaScript.info: WeakMap 和 WeakSet](https://javascript.info/weakmap-weakset)
````
