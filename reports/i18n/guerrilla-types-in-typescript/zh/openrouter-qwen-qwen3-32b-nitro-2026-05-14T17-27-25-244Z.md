# Translation Candidate
- Slug: guerrilla-types-in-typescript
- Locale: zh
- Model: openrouter/qwen/qwen3-32b:nitro
- Target: src/content/posts/2023-09-06--guerrilla-types-in-typescript/zh/index.mdx
- Validation: deferred
- Runtime seconds: 10.17
- Input tokens: 5111
- Output tokens: 4125
- Thinking tokens: unknown
- Cached input tokens: 512
- Cache write tokens: 0
- Estimated cost: $0.001399
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
social_image: ../desktop-social.webp
title: TypeScript 中的游击类型
subTitle: 叛逆字体设计
date: '2023-09-05'
modified: '2024-07-30'
tags:
  - engineering
  - typescript
  - composition
  - types
category: Guides
subCategory: TypeScript
cover: ../gorilla-types_dall-e.webp
cover_mobile: ../w300_gorilla-types_dall-e.webp
cover_icon: ../icon_gorilla-types_dall-e.webp
---
## TypeScript中的游击类型

在本文中，我们将探讨三种有趣（可能很糟糕？）的类型设计技巧！

主要目标是**一致**且**可预测**的Model/Entity/Class接口。

- [设计类型的思路](#设计类型的思路)
  - [单一大对象](#单一大对象)
  - [多个命名类型](#多个命名类型)
- [技巧#1：为何不全部](#技巧1-为何不全部)
- [技巧#2：混入](#技巧2-混入)
  - [混入示例](#混入示例)
  - [示例 `User`](#示例-user)
- [技巧#3：使用命名空间组织](#技巧3-使用命名空间组织)
  - [实际应用](#实际应用)
- [总结](#总结)

<!-- 
1.  高层次的类型逻辑表示 - 对开发人员和业务利益相关者都有意义。
2.  模型组合逻辑相关字段的持久方式。
    1.  示例：**对象实例**通常包含通用字段 `id`、`createdDate`、`createdById` 等。
    2.  从离散的数据库模型中建模请求和响应字段。（例如 `_version`、`_v`）
    3.  可组合的实用程序，分页/负载包装器等：`pageNumber`、`sortBy`、`impersonateSession`、`token`、`_version` 等。
3.  避免命名和类型中的意外差异（`id`、`Id`、`ID`、`created_at`、`date_created`，天哪！）
4.  使用多个小型可重用的接口和类型组合更高级别的类型。
5.  利用[联合类型](https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes-func.html#discriminated-unions)来'自动'匹配类型的变体。 -->

### 设计类型的思路

你可能已经遇到过或编写过围绕“类型实现”的各种模式。尤其是在从第三方API消费数据时。

**注意**：我故意忽略了构建实体关系图（ERD）或面向对象编程（OOP）继承层次结构的“传统”流程。在这里，我们构建类型是为了表示半结构化的API数据。

让我们探讨两种高层次的思路：**单一大对象**（自上而下）vs **多个命名类型**（自下而上）。

#### 单一大对象

优先考虑明确性而非可重用性和DRY原则。

**额外优势**：IDE/开发体验很好，因为提示包含更完整的预览，无需繁琐操作。

```tsx
interface ProductDetails {
  name: string;
  seller: { name: string };
  availability: Array<{ warehouseId: string; quantity: number }>;
  reviews: Array<{ authorId: number; stars: number }>;
}
```

由于我们优先考虑明确的可读性，适度的重复是可以接受的。当属性组重复多次时，可以自由地将重复字段提取到命名类型中。

#### 多个命名类型

优先考虑可重用性和DRY原则。

<!-- 可读性是一个有趣的指标。当类型和文件较少时，可读性通常很好或**极佳**。**不可避免地，类型会不断扩展**，包含越来越多的属性。**可读性下降**。 -->

这种方法很可能被广泛采用。

```ts
interface ProductDetails {
  name: string;
  seller: Seller;
  reviews: Reviews[];
  availability: Availability[];
}
interface Seller { name: string; }
interface Availability { warehouseId: string; quantity: number; }
interface Reviews { authorId: number; stars: number; }
```

总体而言，这种方法很好。但并非没有缺点。

- **可读性**起初非常好；然而，随着类型数量和大小的增长，它_可能会_受到影响。
- 极力遵循DRY原则，但代价是什么？（稍后会详细讨论。）
- 开发者体验可能变差，因为提示信息不够详细。

> ⚠️ 从TypeScript 3版本起，语言服务器会截断提示信息，省略嵌套属性。
> 💡 有一些技巧可以稍微改善这一点。尝试按住`Cmd或Ctrl`键，然后悬停在各种类型名称上 - 你应该至少能看到提示信息中多出一层属性。

为什么我们必须在这两种方法之间做出选择？（大类型 vs 命名子类型）

### 技术 #1：为什么不全部使用

我们能否兼得？

- "大图景"类型的清晰度？
- 加上命名子类型？
- 而不产生重复？

> ✅ 可以！🎉

```tsx
export interface ProductDetails {
  name: string;
  seller: { name: string };
  reviews: Array<{ authorId: number; stars: number }>;
  availability: Array<{ warehouseId: string; quantity: number }>;
}
export type Seller = ProductDetails["seller"];
export type Review = ProductDetails["reviews"][number];
export type Availability = ProductDetails["availability"][number];
```

1. 创建大型的"主"结构化类型。
2. 导出从主类型派生的子类型。

这种方法在需要将"高层"对象文档集中在一个地方的系统中表现突出。
此外，这种技术支持在多种使用场景下复用：模型、服务、查询结果等。

### 技术 #2：混入

这种策略的核心是将**正确的字段**，以**正确的名称**组合起来，**表示单一的逻辑对象**。目标是通过TypeScript工具类型和联合类型高效应对多个使用场景。

这种方法不同于传统OOP继承和层次结构，后者旨在创建紧密绑定的分类体系。**混入方法关注的是扁平且松散相关的类型**，在减少重复的同时对相关字段进行分组。

#### 混入示例

```tsx
interface TodoModel {
  text: string;
  complete: boolean;
}
interface InstanceMixin {
  id: number;
}
/** TodoDraft 表示表单状态，可能所有字段都未定义 */
export type TodoDraft = Partial<TodoModel>;
/** Todo 表示从数据库获取的Todo实例记录 */
export type Todo = TodoModel & InstanceMixin;
```

#### 示例 `User`

```tsx
interface User {
  id: number;
  name: string;
  bio: string;
  social: Record<"facebook" | "instagram" | "github", URL>;
}
```

让我们表示保存到数据库前后的`User`。

```tsx
// 核心用户字段（例如用于<form>）
interface UserBase {
  name: string;
  bio: string;
  social: Record<"facebook" | "instagram" | "github", URL>;
}
// 数据库字段
interface InstanceMixin {
  id: number;
  createdAt: Date;
  updatedAt: Date;
}
// 用户**实例** - 包含所有字段
type UserInstance = InstanceMixin & UserBase;
```

现在我们可以精确地塑造所需的字段（如创建/更新时包含`password`字段，但不在`UserInstance`查询中包含）。

```tsx
interface UserBase {
  name: string;
  bio: string;
  social: Record<"facebook" | "instagram" | "github", URL>;
}
interface InstanceMixin {
  id: number;
  createdAt: Date;
  updatedAt: Date;
}
/** 注册用户载荷，包含`password`字段 */
export type UserPayload = UserBase & { password: string };
/** 表示从服务器返回的用户类型 */
export type UserInstance = UserBase & InstanceMixin;
```

1.  "这是个好实践吗？"
2.  "我应该尝试吗？"

不确定。继续前进吧！

### 技术 #3：使用命名空间组织

这里我们声明一个`ModelMixins`命名空间。这提供了一些组织结构并形成了更清晰的复用模式。

**标准化形状**

- `createdAt`和`updatedAt`总是成对出现
- 使用`id`而非`ID`或`_id`

```tsx
// `src/types/mixins.d.ts`
namespace ModelMixins {
  interface Identity {
    id: number;
  }
  interface Timestamp {
    createdAt: Date;
    updatedAt: Date;
  }
  type Instance = ModelMixins.Identity & ModelMixins.Timestamp;
  interface HashedPassword {
    passwordHash: string;
  }
  interface InputPassword {
    password: string;
  }
}
```

**使用类型联合**

```tsx
// `src/types/user.d.ts`
export interface UserBase {
  name: string;
  bio: string;
  social: Record<"facebook" | "instagram" | "github", URL>;
}
// 单一`User`类型，使用类型联合动态
// 表示创建前后状态
export type User =
  | (UserBase & ModelMixins.Instance & ModelMixins.HashedPassword)
  | (UserBase & ModelMixins.InputPassword);
```

如果需要，也可以导出单独的命名类型：

```tsx
/** 注册用户载荷，包含`password`字段 */
export type UserPayload = UserBase & ModelMixins.Instance & ModelMixins.HashedPassword;
/** 表示从服务器返回的用户类型 */
export type UserInstance = UserBase & ModelMixins.InputPassword;
```

#### 实际应用场景

这是一个使用`in`操作符区分`UserInstance`和`UserPayload`类型的`upsert()`函数。

```tsx
function upsert(user: User) {
  if ("id" in user) {
    // TypeScript知道此处的user包含Instance字段（id、createdAt等）
    return updateUser(user.id, user);
  } else {
    // TypeScript知道此处的user必须是`UserBase & ModelMixins.InputPassword`类型
    return createUser(user);
  }
}
```

### 总结

我们探讨了三种技术及相关支持理念。

你可能在问，这些是好模式吗？我应该采用其中一些想法吗？

## 资源

- [TypeScript遗留项目技巧：只使用你需要的类型](https://sergiocarracedo.es/typescript-tips/)
- [Matt Pocock的优秀新书](https://www.totaltypescript.com/books/total-typescript-essentials)
- [Total TypeScript技巧](https://www.totaltypescript.com/tips)
```
````
