# Translation Candidate
- Slug: weakmap-the-javascript-feature-you-dont-use
- Locale: zh
- Model: openrouter/qwen/qwen3-32b:nitro
- Target: src/content/posts/2025-12-29--weakmap-the-javascript-feature-you-dont-use/zh/index.mdx
- Validation: deferred
- Runtime seconds: 8.08
- Input tokens: 3165
- Output tokens: 3594
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- Estimated cost: $0.001116
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
你知道那种感觉吗？当你修改一行代码，看着内存使用量骤降50%。我就是在Chrome的DevTools性能监控中经历了这样的时刻：一个仪表盘应用从每小时流失100MB内存，变成整个下午都干净运行。

这行改动：`new Map()`变成了`new WeakMap()`。

仅此而已。相同的API表面，相同的使用模式，但底层行为完全不同。但要理解为什么有效，你需要了解大多数JavaScript开发者从未考虑过的事情：当没有任何东西再关注你的数据时会发生什么。

## 当引用成为锚点

JavaScript中的常规Map将键视为珍贵货物。一旦你将某物放入其中，Map会以铁腕般的力度紧握不放。垃圾回收器看到这种关系会想："显然他们还需要这个对象，最好不要动它。"

当你存储临时事物的元数据时，这种保护本能会引发问题。被移除的DOM节点。过期的用户会话。卸载的组件实例。Map不知道这些对象已经不再有用。它只知道有引用存在，因此会继续保留它们。

```javascript
const cache = new Map();

function trackClick(element) {
  cache.set(element, { clicks: 0 });
}

document.body.removeChild(element);
// 元素已从DOM中移除，但缓存仍将其保留在内存中
```

垃圾回收器无法清理`element`，因为`cache`仍在指向它。这被称为"强引用"，在长期运行的单页应用中，这种引用最终会成为导致浏览器崩溃的内存泄漏。

## WeakMap改变了规则

WeakMap的运作方式不同。它将键视为临时公民而非永久居民。当你在WeakMap中存储某物时，你实质上在说："我想将这些数据与该对象关联，但我不想成为其存活的原因。"

如果唯一保留对象在内存中的原因是WeakMap，垃圾回收器可以回收它。当对象消失时，WeakMap条目也会随之消失。无需手动清理。

```javascript
const cache = new WeakMap();

function trackClick(element) {
  cache.set(element, { clicks: 0 });
}

document.body.removeChild(element);
// 元素被垃圾回收
// 缓存条目自动消失
```

我运行了一个基准测试，创建10万个DOM节点，存储每个节点的元数据，然后全部移除。使用Map时，浏览器保留了150-200MB内存；使用WeakMap时，内存降至70-80MB。相同代码，相同功能，内存占用减半。

## 你所放弃的

WeakMap有约束条件，这些看似是限制，直到你意识到它们正是实现魔法的关键。

**你无法遍历WeakMap。** 没有`forEach`，没有`keys()`，没有`values()`。仔细想想这很有道理：垃圾回收器可能在你的循环中间删除条目。你真的想处理这种情况吗？

你无法检查大小。没有`.size`属性，没有`.length`。再次强调，这是个移动目标。数量可能在你询问和得到答案之间发生变化。

**键必须是对象。** 不能是字符串、数字或原始值。这是弱引用机制的根本：原始值的标识无法与其值分开追踪。

这些不是缺陷。这是设计。WeakMap专为一个特定任务而生：在不阻止对象被清理的情况下附加元数据。如果你需要遍历、原始键或条目计数，你可能在解决不同问题，应该使用常规Map。

## 这实际能带来帮助的场景
```

## 这实际能带来帮助的场景

"私有数据"模式是WeakMap的最初用例，在JavaScript拥有`#private`字段之前。库通常会在类外部创建WeakMap，用于存储不应在实例上访问的数据。

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

当User实例被垃圾回收时，私有数据也会随之消失。无需任何清理代码。

备忘录是另一个天然适配的场景，特别是当你需要基于对象输入而非原始值进行缓存时。如果昂贵的计算以配置对象作为输入，WeakMap意味着你不必担心缓存会比配置对象存活更久。

```javascript
const cache = new WeakMap();

function expensiveCalc(obj) {
  if (cache.has(obj)) return cache.get(obj);
  
  const result = heavyMath(obj);
  cache.set(obj, result);
  return result;
}
```

缓存的生命周期仅与被缓存的对象相同。一旦`obj`在其他任何地方都不可达，缓存结果和缓存条目会同时消失。

## 何时使用它

现代Web应用中的内存泄漏通常源于未清理的引用。如果你正在构建任何长期运行的应用——全天候打开的仪表盘、运行数小时的聊天应用、永不刷新的管理面板——都需要考虑旧数据的去向。

当需要将数据与DOM节点、组件实例或任何生命周期不受你控制的对象关联时，WeakMap特别有用。如果你基于引用存储数据，而该引用可能会消失，WeakMap会让清理变得简单得多。

当你需要构建具有驱逐策略的实际缓存、需要遍历条目、使用原始键，或者数据本身比其与对象的关联更重要时，常规Map仍然是正确选择。

`WeakMap`的优势在于，当你需要它时通常会很明显。如果你发现自己编写清理代码来在对象销毁时移除Map条目，这就是一个信号。如果你担心内存无限增长，因为不确定何时删除数据，这也是另一个信号。

有时最好的特性就是无需思考就能正常工作。

## 资源

- [MDN: WeakMap](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakMap)
- [MDN: 内存管理](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Memory_management)
- [V8博客: 弱引用和终结器](https://v8.dev/features/weak-references)
- [JavaScript.info: WeakMap和WeakSet](https://javascript.info/weakmap-weakset)
````
