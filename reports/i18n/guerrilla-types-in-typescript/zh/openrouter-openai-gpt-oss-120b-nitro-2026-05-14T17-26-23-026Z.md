# Translation Candidate
- Slug: guerrilla-types-in-typescript
- Locale: zh
- Model: openrouter/openai/gpt-oss-120b:nitro
- Target: src/content/posts/2023-09-06--guerrilla-types-in-typescript/zh/index.mdx
- Validation: deferred
- Runtime seconds: 4.42
- Input tokens: 5262
- Output tokens: 2518
- Thinking tokens: unknown
- Cached input tokens: 1536
- Cache write tokens: 0
- Estimated cost: $0.000658
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
## TypeScript 中的游击类型

在本文中，我们将探讨三种有趣（可能糟糕？）的技术来帮助进行类型设计！

核心目标是 **一致** 且 **可预测** 的模型/实体/类接口。

- [设计类型的方式](#approaches-to-designing-types)
  - [单一大对象](#single-large-object)
  - [多个具名类型](#multiple-named-types)
- [技术 #1：为何不全都这样](#technique-1-why-not-all)
- [技术 #2：Mix‑ins](#technique-2-mix-ins)
  - [Mix‑in 示例](#mix-in-examples)
  - [示例 `User`](#example-user)
- [技术 #3：使用命名空间组织](#technique-3-organizing-with-namespaces)
  - [真实场景使用](#real-world-usage)
- [总结](#summary)

<!--
1.  High-level logical representation of types - in a way meaningful to both devs and business stakeholders.
2.  Durable way to model combinations of logically related fields.
    1.  Example: **Object instances** often include common fields `id`, `createdDate`, `createdById`, etc.
    2.  Model Request & Response fields from your discrete database models. (e.g. `_version`, `_v`)
    3.  Composable utilities, Paging/Payload wrapper, etc: `pageNumber`, `sortBy`, `impersonateSession`, `token`, `_version`, etc.
3.  Avoid unintended variances in naming and typing (`id`, `Id`, `ID`, `created_at`, `date_created`, oh noes!)
4.  Compose higher level types with multiple smaller reusable interfaces & types.
5.  Utilize [Unions](https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes-func.html#discriminated-unions) to 'automatically' match variants of a type. -->

### 设计类型的方式

你可能已经在“类型实现”上遇到或编写过各种模式，尤其是在消费第三方 API 数据时。

**注意：** 我有意忽略“传统”流程——构建实体关系图（ERD）或面向对象编程（OOP）继承层次。在这里，我们构建的类型是用来表示半结构化的 API 数据。

下面对两种宏观思路做一下对比：**单一大对象**（自上而下） vs. **多个具名类型**（自下而上）。

#### 单一大对象

强调显式而非可复用性与 DRY。

**额外好处：** IDE/开发体验极佳，因为工具提示会展示更完整的预览——无需额外操作。

```tsx
interface ProductDetails {
  name: string;
  seller: { name: string };
  availability: Array<{ warehouseId: string; quantity: number }>;
  reviews: Array<{ authorId: number; stars: number }>;
}
```

因为我们优先考虑显式可读性，适度的重复是可以接受的（在合理范围内）。当属性组出现 **大量** 重复时，完全可以把重复的字段抽取到具名类型中。

#### 多个具名类型

强调可复用性与 DRY。

<!-- Readability is a funny measure. Since Readability is often good or **great when there are few types/files.** **Inevitably types tend to proliferate,** featuring ever more properties. **Readability suffers.** -->

这种方式几乎是大多数人首选的做法。

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

总体而言，这种方式很好。但它也并非没有缺点。

- **可读性** 起初非常好；但随着类型数量和规模的增长，_可能_会受到影响。  
- 极度 DRY，但代价是什么？（后面会详细说明。）  
- 开发者体验可能受损，因为工具提示信息变得不够详细。

> ⚠️ 自（大约）TypeScript v3 起，语言服务器会截断工具提示，省略嵌套属性。  
> 💡 有一些技巧可以稍微改善。按住 `Cmd` 或 `Ctrl`，然后将鼠标悬停在不同的类型名称上——你应该能在工具提示中看到至少一层额外的属性。

为什么必须在这两种方案之间做选择？（大块类型 vs. 命名子类型。）

### 技术 #1：为什么不能两全

我们能两者兼得吗？

- “全局视图” 类型的清晰度？  
- 加上命名子类型？  
- 并且不产生重复？

> ✅ 可以！ 🎉

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

1. 创建大型 “主” 结构化类型。  
2. 从主类型导出派生的子类型。

这种做法在“高层”对象需要统一文档的系统中表现尤为出色。  
同时，这一技巧支持在多个使用场景之间复用：模型、服务、查询结果等。

### 技术 #2：Mix-in

此策略的核心是组合 **正确的字段**、**正确的名称**，以 **表示单一逻辑对象**。目标是利用 TypeScript 实用工具和类型联合，高效地覆盖多种使用场景。

它区别于传统面向对象的继承与层级结构——后者旨在将对象层层堆叠成紧耦合的分类体系。**Mix-in 方法强调扁平且松散关联的类型**，在保持相关字段分组的同时降低重复。

#### Mix-in 示例

```tsx
interface TodoModel {
  text: string;
  complete: boolean;
}
interface InstanceMixin {
  id: number;
}
/** TodoDraft 表示表单状态，可能全部为 undefined */
export type TodoDraft = Partial<TodoModel>;
/** Todo 表示来自数据库的 Todo 实例记录 */
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

下面展示 `User` 在保存前后数据库中的形态。

```tsx
// 核心 User 字段（例如用于 <form>）
interface UserBase {
  name: string;
  bio: string;
  social: Record<"facebook" | "instagram" | "github", URL>;
}
// 来自数据库的字段
interface InstanceMixin {
  id: number;
  createdAt: Date;
  updatedAt: Date;
}
// 完整的 User **实例**——包含所有字段
type UserInstance = InstanceMixin & UserBase;
```

现在我们可以雕刻出恰好需要的字段（比如创建/更新时的 `password`，但查询 `UserInstance` 时不包含）。

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
/** 注册时的 User payload，包含 `password` 字段 */
export type UserPayload = UserBase & { password: string };
/** 服务器返回的 User 类型 */
export type UserInstance = UserBase & InstanceMixin;
```

1.  “这算是好实践吗？”
2.  “我应该尝试一下吗？”

不知道。继续往下看吧！

### 技巧 #3：使用命名空间组织

这里我们声明一个 `ModelMixins` 命名空间，既提供组织结构，又让复用模式更清晰。

**标准化形状**

- `createdAt` 与 `updatedAt` 必须一起出现。
- 使用 `id`，而不是 `ID` 或 `_id`。

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
// 单一 `User` 类型，利用类型联合动态表示创建前后两种状态。
export type User =
  | (UserBase & ModelMixins.Instance & ModelMixins.HashedPassword)
  | (UserBase & ModelMixins.InputPassword);
```

如果需要，也可以单独导出命名类型：

```tsx
/** 注册时的 User payload，包含 `password` 字段 */
export type UserPayload = UserBase & ModelMixins.Instance & ModelMixins.HashedPassword;
/** 服务器返回的 User 类型 */
export type UserInstance = UserBase & ModelMixins.InputPassword;
```

#### 实际使用

下面是一个 `upsert()` 函数，使用 `in` 操作符区分 `UserInstance` 与 `UserPayload`。

```tsx
function upsert(user: User) {
  if ("id" in user) {
    // TypeScript 知道此处的 `user` 包含 Instance 的字段（id、createdAt 等）
    return updateUser(user.id, user);
  } else {
    // TypeScript 知道这里一定是 `UserBase & ModelMixins.InputPassword` 版本的 user
    return createUser(user);
  }
}
```

### 小结

我们回顾了三种技巧以及若干配套思路。

你可能在想，这些模式到底好不好？我该采纳哪些想法？

## 资源

- [TypeScript tips for legacy projects: Type only you need](https://sergiocarracedo.es/typescript-tips/)
- [Matt Pocock's Excellent new book](https://www.totaltypescript.com/books/total-typescript-essentials)
- [Total TypeScript Tips](https://www.totaltypescript.com/tips)
````
