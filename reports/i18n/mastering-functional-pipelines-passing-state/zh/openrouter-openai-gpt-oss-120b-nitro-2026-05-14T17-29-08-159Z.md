# Translation Candidate
- Slug: mastering-functional-pipelines-passing-state
- Locale: zh
- Model: openrouter/openai/gpt-oss-120b:nitro
- Target: src/content/posts/2023-08-13--mastering-functional-pipelines-passing-state/zh/index.mdx
- Validation: deferred
- Runtime seconds: 6.55
- Input tokens: 4996
- Output tokens: 2178
- Thinking tokens: unknown
- Cached input tokens: 1536
- Cache write tokens: 0
- Estimated cost: $0.000587
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
social_image: ../desktop-social.webp
title: 管道大师：传递状态
subTitle: 你好，Closure，我的老朋友。
date: '2023-08-09'
modified: '2024-07-30'
tags:
  - typescript
  - closure
  - stateful
  - scoping
  - hoisting
  - functional
  - pipeline
category: Guides
subCategory: JavaScript
cover: ../sven-kucinic-LxYxC6jdjcA-unsplash-cropped-1200.webp
cover_mobile: ../w300_sven-kucinic-LxYxC6jdjcA-unsplash-cropped-1200.webp
cover_icon: ../icon_sven-kucinic-LxYxC6jdjcA-unsplash-cropped-1200.webp
---
## 管道大师：传递状态

在使用函数式管道时，你是否遇到过传递状态的挑战？

代码的组织（或缺乏组织）直接影响状态传递的便利程度。

本文将探讨一种在管道中传递状态的有效技巧，并在此过程中提升代码的组织性和可读性。

下面这段“真实”代码片段是本文的核心示例：一个 checkout 函数，接受 `userId` 和 `products` 数组，并返回一个执行四个函数的 Promise 链。

```tsx
const checkout = (userId: number, products: number[]) => {
  return getProductsSubtotal(userId, products)
    .then(subTotal => applyTaxes(userId, subTotal))
    .then(total => purchaseProducts(userId, total))
    .then(result => sendReceipt(userId, result));
};
```

等一下，这段代码在 JS 管道层面上其实相当不错！

不过它仍然存在一些细微问题，这些问题可能会累积成更大的隐患。

一个问题是我们在每个（逻辑上相关的）函数之间反复传递 `userId`。再加上另一个容易被开发者和 TypeScript 忽视的问题：数值参数的顺序容易写反，导致静默错误。（参见 `applyTaxes` 和 `purchaseProducts`。_是 `userId` 先传，还是 `amount` 先传？_）

在决定如何改进这段代码之前，先来看看它的优缺点。

### 优缺点

#### 优点

- 很好地利用了闭包！只传入一次 `userId` 与 `products`！
- 参数命名保持一致。
- 对 checkout 的四个关键函数进行相对高效且简洁的组合。
- “免费”的错误流控制。（任意嵌套函数抛出的错误都会冒泡，导致 `checkout()` 返回的 Promise 被 reject。）

#### 缺点

- 反复传递 `userId` 很繁琐。
- 函数不是单参数（即一元函数）。_这会影响可组合性。参见[最终示例](#checkout-with-further-improvements)了解原因。_
- 每个函数返回什么并不直观。（是邮件发送结果，还是那个 `result` 变量？）
- 不易看出如何添加新功能（例如需要加载客户折扣/信用/积分等）。
- 有时 `.then(param => {})` 中的“临时”参数名会提供上下文，但随着时间推移，它们往往会沦为命名垃圾。

### 方案第一步：创建模块！

此技巧旨在将相关函数组织到同一个模块（例如 `CartHelpers`）中。它并不强制使用特定模式。可以探索[工厂函数](#carthelpers-factory)、[类](#carthelpers-class)、闭包、Mixin 等，找到最适合你项目和团队的方案。

#### CartHelpers 工厂

下面是一个 `CartHelpers` 模块的示例，其中 `userId` 只传入一次，所有方法均为单参数。

```tsx
const CartHelpers = (userId: number) => {
  return {
    getProductsSubtotal: products => getProductsSubtotal(userId, products),
    applyTaxes: subTotal => applyTaxes(userId, subTotal),
    purchaseProducts: total => purchaseProducts(userId, total),
    sendReceipt: invoice => sendReceipt(userId, invoice)
  };
};
```

#### CartHelpers 类

如果你更喜欢类，也可以轻松改写：

```tsx
class CartHelpers {
  constructor(userId) {
    this.userId = userId;
  }
  getProductsSubtotal = products => getProductsSubtotal(this.userId, products);
  applyTaxes = subTotal => applyTaxes(this.userId, subTotal);
  purchaseProducts = total => purchaseProducts(this.userId, total);
  sendReceipt = invoice => sendReceipt(this.userId, invoice);
}
```

一些直接的好处：

- 消除重复的变量传递。
  - DRY：`CartHelpers` 把重复的 `userId` 参数抽象掉。
  - 每个方法只接受**唯一**必需的参数。`cart.applyTaxes(subTotal)` 的阅读体验完全不出意外。
- `CartHelpers` 中的单参数函数更易读，意图更明确。

通过把相关函数归组，我们可以缩小公开的表面（例如 `checkout()`、`CartHelpers` 的公开方法）。

> 表面越小 === 认知负担越低，测试和可维护性更好。  
> _有意图、有焦点地设计系统。✨_

#### Checkout 与 CartHelpers 的使用

来看一下现在的 `checkout()` 函数长什么样：

```tsx
export const checkout = ({ userId, products }) => {
  const cart = CartHelpers(userId);

  return Promise.resolve(products)
    .then(products => cart.getProductsSubtotal(products))
    .then(subTotal => cart.applyTaxes(subTotal))
    .then(total => cart.purchaseProducts(total))
    .then(result => cart.sendReceipt(result));
};
```

##### 进一步改进的 Checkout

> 还能再改进吗？可以！根本不必重复传参！

当函数的参数由前一个函数的输出提供时，代码可以进一步简化。

```tsx
export const checkout = ({ userId, products }) => {
  const cart = CartHelpers(userId);

  // 🌈 函数像乐高块一样堆叠，读起来像普通的“人类语言！” 💅
  return Promise.resolve(products)
    .then(cart.getProductsSubtotal)
    .then(cart.applyTaxes)
    .then(cart.purchaseProducts)
    .then(cart.sendReceipt);
};
```

**如果把多个参数合并为单个（对象）参数让你感觉不自然，**可以考虑拆分函数**或**把它们归入更合适的作用域模块。

#### 从哪里开始？

找出相关函数并把它们放在一起（例如 `CartHelpers`）。

在寻找潜在逻辑模块时，首先要识别出哪些代码是相关的，这本身就是个挑战。

##### 什么样的函数算是相关的？

一个小技巧：观察函数参数的重复性。问自己是否存在某种关联？或是背后有共同的职责？

- ✅ 参数重复且相同的函数。（例如 4 个方法都接受 `userRewards`，那么很可能需要一个 `Rewards` 模块。）
- ✅ 函数的参数直接来源于前一个函数的输出。（步骤序列，如 `Extract`、`Transform`、`Load`。）
- ❌ 仅在特性域上模糊相关的函数，例如“商品购买？”  
- ❌ 仅名字上有相同前缀或后缀的函数？  
- ❌ 函数接受的大对象却只使用其中少数字段。（例如 `applyTaxes({ user, business, rewards, kitchenSink })` 与 `applyTaxes({ subTotal })`）

虽然没有唯一的“正确答案”来设计模块，但确定 2‑3 种组织方案会有帮助——先画个大纲，写点“幻想”代码，问自己“这会让人愉悦吗？”

<aside>
📌 通常需要几次尝试才能让你的领域模型（Domain Model）成形。别纠结要做到完美。
</aside>

> 你可能会觉得 `cart.sendReceipt()` 不该和支付相关的方法放在一起。也许 `customerNotifications.sendReceipt()` 更适合作为客户消息的归宿。如果 `CartHelper` 的重要性足够高，它可以在内部充当 **_controller_**，调用所有必需的 **_services_**，比如 `customerNotifications`。

#### 如何判断自己是否在帮忙？

如果在消除临时参数的过程中可读性没有下降，**恭喜！！！** 你很可能已经构建了一个范围清晰、经得起时间考验的模块！

- 去掉中间参数往往会迫使“层次”自然浮现。
- 应该很难把临时代码随意丢进错误的地方！

于是问题来了，功能该加在哪里？

根据我的经验，评估新增功能时主要有两种策略：

1.  扩展/重构已有方法。（当新代码与现有代码足够接近时。）
2.  在链中合适的位置创建一个新（第 5）函数。（假设新代码与现有函数无关。）

最终，这可以帮助你更容易决定新功能的归属。（例如 `cart.applyDiscounts()`、`cart.applyTaxes()`、`rewards.getBalance()`。）

### 结论

在复杂的流水线中传递状态可能很棘手。但只要多练习重构，你会发现自己写出的代码更易读，认知负担更轻。

有问题？有评论？有顾虑？欢迎通过 [@justsml](https://x.com/justsml) 或 [email](mailto:dan@danlevy.net) 与我联系。

#### 敬请期待系列的下一篇

我们将探讨如何将状态外部化，以及在模块中扩展功能！

#### 相关阅读

- [类似的困境也出现在面向组件的 React 世界。](https://kyleshevlin.com/quit-your-yapping)
````
