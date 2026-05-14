# Translation Candidate
- Slug: weakmap-the-javascript-feature-you-dont-use
- Locale: zh
- Model: openrouter/openai/gpt-oss-120b:nitro
- Target: src/content/posts/2025-12-29--weakmap-the-javascript-feature-you-dont-use/zh/index.mdx
- Validation: deferred
- Runtime seconds: 1.70
- Input tokens: 4394
- Output tokens: 1682
- Thinking tokens: unknown
- Cached input tokens: 1920
- Cache write tokens: 0
- Estimated cost: $0.000474
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
title: 使用 WeakMap 防止内存泄漏
subTitle: 用弱引用修复脆弱代码！
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
你是否有过这样一种体验：改动一行代码，内存使用率骤降 50%？我就在 Chrome DevTools 性能监视器里看到，一个仪表盘应用从每小时泄漏 100 MB 的内存，瞬间变得可以整整一个下午都保持干净。

这唯一的改动是：`new Map()` 换成 `new WeakMap()`。

仅此而已。API 表面相同，使用模式相同，底层行为却截然不同。但要弄清楚为何有效，需要了解大多数 JavaScript 开发者从未思考的东西：当没有任何东西再关注你的数据时会发生什么。

## 当引用变成锚点

普通的 Map 在 JavaScript 中把键当作贵重货物。一旦把某个对象放进去，Map 就会死死抓住它。垃圾回收器看到这层关系会想：“显然他们仍然需要这个对象，不能动它。”

这种保护本能在你为临时事物存储元数据时会成为问题。被删除的 DOM 节点、过期的用户会话、已卸载的组件实例。Map 并不知道这些对象已经不再有用，它只知道自己还有一个引用，于是把它们一直保活。

```javascript
const cache = new Map();

function trackClick(element) {
  cache.set(element, { clicks: 0 });
}

document.body.removeChild(element);
// 元素已经从 DOM 中移除，但 cache 仍然把它留在内存中
```

垃圾回收器无法回收 `element`，因为 `cache` 仍在指向它。这是一种 **强引用**，在长期运行的单页应用中会导致内存泄漏，最终让浏览器崩溃。

## WeakMap 改变规则

WeakMap 的工作方式不同。它把键当作临时公民，而不是永久居民。当你在 WeakMap 中存入某个对象时，实际上是在说：“我想把这份数据关联到这个对象上，但我不想成为它存活的原因。”

如果唯一让对象保持在内存中的只有 WeakMap，垃圾回收器就可以将其回收。对象一旦消失，WeakMap 条目也随之消失。无需手动清理。

```javascriptconst cache = new WeakMap();

function trackClick(element) {
  cache.set(element, { clicks: 0 });
}

document.body.removeChild(element);
// The element gets Garbage Collected
// The cache entry vanishes automatically
```

我做了一个基准测试：创建 100,000 个 DOM 节点，为每个节点存储元数据，然后全部移除。使用 `Map` 时，浏览器会保留约 150‑200 MB；换成 `WeakMap` 后降到 70‑80 MB。代码和功能完全相同，却只占了一半的内存。

## 你失去的东西

`WeakMap` 有一些限制，乍看像是缺点，实际上正是它能发挥魔力的原因。

**不能遍历 `WeakMap`。** 没有 `forEach`、没有 `keys()`、没有 `values()`。这在逻辑上是合理的：垃圾回收器可能在循环进行时就删除条目，你真的想处理这种情况吗？

**无法检查大小。** 没有 `.size` 属性，也没有 `.length`。这同样是个“移动的目标”，查询时的数量可能在你得到答案之前就已经改变。

**键必须是对象。** 不能是字符串、数字或其他原始值。这是弱引用的根本要求：原始值没有可以单独追踪的身份。

这些都不是 bug，而是设计本身。`WeakMap` 只为一种特定任务而生：在不阻止对象被回收的前提下为对象附加元数据。如果你需要遍历、原始键或条目计数，说明你在解决的是另一类问题，应该使用普通的 `Map`。

## 真正有用的场景

“私有数据”模式是 `WeakMap` 最初的用例，早在 JavaScript 引入 `#private` 字段之前。库会在类外部创建一个 `WeakMap`，用它来保存不应在实例上直接访问的数据。

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

当 `User` 实例被垃圾回收时，关联的私有数据也随之消失，无需额外的清理代码。

记忆化是另一个天然适配场景，尤其是当你基于对象输入而不是原始值来缓存结果时。如果你的耗时计算接受一个配置对象作为输入，使用 `WeakMap` 便无需担心缓存会比配置对象存活得更久。

```javascript
const cache = new WeakMap();

function expensiveCalc(obj) {
  if (cache.has(obj)) return cache.get(obj);
  
  const result = heavyMath(obj);
  cache.set(obj, result);
  return result;
}
```

缓存的生命周期与被缓存的对象相同。一旦 `obj` 在其他地方不再被引用，缓存的结果和对应的条目会一起消失。

## 何时使用

现代 Web 应用的内存泄漏通常来源于对本应被清理的对象的陈旧引用。如果你在构建长期运行的系统——整天保持打开的仪表盘、运行数小时的聊天应用、从不刷新的管理后台——就必须考虑旧数据的去向。

`WeakMap` 在以下场景特别有价值：为 DOM 节点、组件实例或任何你无法控制其生命周期的对象关联数据。如果你基于引用存储信息，而该引用可能会消失，`WeakMap` 能让清理工作变得极其简洁。

普通 `Map` 仍然是正确的选择，当你需要实现带有淘汰策略的真实缓存、需要遍历条目、使用原始类型键，或者数据本身而非其与对象的关联才是重点时。

`WeakMap` 的好处在于它的适用场景往往很直观。如果你发现自己必须编写清理代码来在对象销毁时移除 map 条目，那就是一个信号。如果你担心内存无限增长却不确定何时删除数据，那也是另一个信号。

有时最好的特性就是那种无需思考、直接可用的特性。

## 资源

- [MDN: WeakMap](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakMap)
- [MDN: Memory Management](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Memory_management)
- [V8 Blog: Weak References and Finalizers](https://v8.dev/features/weak-references)
- [JavaScript.info: WeakMap and WeakSet](https://javascript.info/weakmap-weakset)
````
