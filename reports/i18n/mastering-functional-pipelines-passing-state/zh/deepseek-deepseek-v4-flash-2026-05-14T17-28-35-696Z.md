# Translation Candidate
- Slug: mastering-functional-pipelines-passing-state
- Locale: zh
- Model: deepseek/deepseek-v4-flash
- Target: src/content/posts/2023-08-13--mastering-functional-pipelines-passing-state/zh/index.mdx
- Validation: deferred
- Runtime seconds: 23.63
- Input tokens: 4819
- Output tokens: 2734
- Thinking tokens: unknown
- Cached input tokens: 384
- Cache write tokens: 0
- Estimated cost: $0.001387
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
social_image: ../desktop-social.webp
title: 管道大师：状态传递
subTitle: 你好，闭包，我的老朋友。
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
## 管道大师：状态传递

你是否在使用函数式管道传递状态时遇到过挑战？

代码的组织方式（或缺乏组织）直接影响状态传递的难易程度。

在本文中，我们将探索一种在管道中传递状态的有效技巧。在此过程中，我们会改进代码的组织与可读性。

下面这段“真实”代码将是本文的重点：一个结账函数，它接受一个 `userId` 和一个 `products` 数组，返回一个按顺序执行 4 个函数的 Promise 链。

```tsx
const checkout = (userId: number, products: number[]) => {
  return getProductsSubtotal(userId, products)
    .then(subTotal => applyTaxes(userId, subTotal))
    .then(total => purchaseProducts(userId, total))
    .then(result => sendReceipt(userId, result));
};
```

等等，就 JS 管道而言，这段代码其实已经相当不错了！

但它确实存在一些细微问题，这些问题叠加起来可能演变成更严重的麻烦。

一个问题是我们反复将 `userId` 传递给每个（逻辑上相关的）函数。再结合另一个容易被开发者以及 TypeScript 遗漏的问题：数字参数顺序颠倒很容易造成静默错误。（看看 `applyTaxes` 和 `purchaseProducts`。到底是 `userId` 在前还是 `amount` 在前？）

在决定如何改进这段代码之前，我们先列出一些优缺点。

### 优缺点

#### 优点

- 很好地利用了闭包！`userId` 和 `products` 只传入一次！
- 参数命名一致。
- 相对高效且简洁地组合了结账所需的 4 个关键函数。
- “免费”的错误流控制。（错误会从任何嵌套函数向上冒泡，导致 `checkout()` 返回的 Promise 被拒绝。）

#### 缺点

- 反复传递 `userId` 很繁琐。
- 函数不是单参数（即一元）。_这会影响可组合性。参见[最终示例](#checkout-with-further-improvements)了解原因？_
- 每个函数返回什么可能不直观。（是邮件发送结果，还是那个 `result` 变量？还是其他？）
- 不清楚如何添加功能（例如，假设我们需要加载客户折扣/信用/积分等）。
- 有时“临时”参数名（比如每个 `.then(param => {})` 中的参数）会提供上下文。但随着时间的推移，它们很可能成为命名垃圾的温床。

### 解决方案，第一部分：创建一个模块！

这个技巧是将相关函数组织到单个模块中（例如 `CartHelpers`）。它并不要求特定的模式。可以探索[工厂函数](#carthelpers-factory)、[类](#carthelpers-class)、闭包、混入等。找到适合你的项目和团队的方式。

#### CartHelpers 工厂

下面是一个 `CartHelpers` 模块的示例，其中 `userId` 只传入一次，所有方法都是单参数。

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

如果你偏爱类，也很容易适配：

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

一些立竿见影的好处：

- 消除重复的变量传递。
  - DRY：`CartHelpers` 抽象掉了重复的参数 `userId`。
  - 每个方法只接受 **_必需的_** 参数。这让 `cart.applyTaxes(subTotal)` 读起来毫无意外。
- `CartHelpers` 中的单参数函数可读性更强，意图更清晰。

通过将相关函数分组，我们有机会减少暴露的表面积（例如 `checkout()`、`CartHelpers` 的“公开”方法）。

> 表面积越小 === 认知负荷越低，测试与可维护性越好。
> _有意图、有重点地设计系统。✨_

#### Checkout 与 CartHelpers 的使用

现在来看看 `checkout()` 函数的样子：

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

##### 进一步改进后的 Checkout

> 还能进一步改进吗？能！我们根本不需要重复参数！

当函数的参数直接由前一个函数的输出提供时，你可以进一步简化代码。

```tsx
export const checkout = ({ userId, products }) => {
  const cart = CartHelpers(userId);

  // 🌈 函数像乐高一样堆叠，读起来就像正常的“人话”！💅
  return Promise.resolve(products)
    .then(cart.getProductsSubtotal)
    .then(cart.applyTaxes)
    .then(cart.purchaseProducts)
    .then(cart.sendReceipt);
};
```

**如果觉得将参数合并成单个（对象）参数不自然，** 可以考虑拆分函数，**或者**将它们组合成作用域更合适的模块。

#### 从何入手？

找到相关的函数，将它们分组在一起（例如 `CartHelpers`）。

在寻找可能的逻辑模块时，挑战之一就是首先识别出相关的代码。

##### 什么让函数相关？

一个巧妙的技巧：寻找函数参数中的重复。问问自己是否存在某种关系？或者底层职责？

- ✅ 具有重复、公共参数的函数。（例如，如果 4 个方法都接受 `userRewards`，很可能你需要一个 `Rewards` 或其他模块。）
- ✅ 参数直接由前一个函数输出提供的函数。（步骤序列。例如 `提取`、`转换`、`加载`。）
- ❌ 任何与功能区域“产品购买”模糊相关的东西？
- ❌ 具有公共前缀或后缀命名的函数？
- ❌ 需要大对象作为参数，却只使用其中少数几个值的函数。（例如 `applyTaxes({ user, business, rewards, kitchenSink })` 对比 `applyTaxes({ subTotal })`）
```

虽然设计模块没有唯一的“正确答案”，但找出 2-3 种组织方案会有所帮助——画个草图、写段“幻想”代码，问问自己“这能带来愉悦吗？”

<aside>
📌 领域模型往往需要多次调整模块组织才能成型。不必纠结于一步到位。
</aside>

> 你可能会觉得 `cart.sendReceipt()` 不适合放在支付相关方法中。也许 `customerNotifications.sendReceipt()` 更适合作为客户消息的归宿。如果 `CartHelper` 的重要性足够高，它可以充当一个**_控制器_**，在内部调用所有必要的**_服务_**，比如 `customerNotifications`。

#### 如何判断你的改进是否有效？

如果在消除临时参数的同时可读性没有下降，**恭喜你！！！** 你很可能构建了一个范围清晰且持久的模块！

- 移除中间参数往往会迫使“分层”自然浮现。
- 把临时代码塞到错误的地方应该变得困难！

那么问题来了：功能应该加在哪里？

根据我的经验，添加功能时有两种主要策略可供评估：

1.  扩展现有方法/重构。（当新代码与现有代码足够接近时。）
2.  在链中期望的位置创建一个新的（第 5 个）函数。（假设新代码与现有函数无关。）

最终，这能让你更容易决定新功能属于哪里。（例如 `cart.applyDiscounts()`、`cart.applyTaxes()`、`rewards.getBalance()`。）

### 结论

在复杂管道中传递状态可能很棘手。然而，稍加重构练习，你就会发现自己能写出可读性更高、认知负荷更低的代码。

有问题？评论？顾虑？欢迎联系 [@justsml](https://x.com/justsml) 或 [发送邮件](mailto:dan@danlevy.net)。

#### 敬请期待本系列下一部分

我们将探讨外部化状态以及扩展模块功能！

#### 相关阅读

- [组件驱动的 React 世界也存在类似的困境。](https://kyleshevlin.com/quit-your-yapping)
````
