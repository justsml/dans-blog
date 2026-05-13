# Translation Candidate
- Slug: guerrilla-types-in-typescript
- Locale: ja
- Model: openrouter/openai/gpt-oss-120b:nitro
- Target: src/content/posts/2023-09-06--guerrilla-types-in-typescript/ja/index.mdx
- Validation: deferred
- Runtime seconds: 5.25
- Input tokens: 10457
- Output tokens: 3515
- Thinking tokens: unknown
- Cached input tokens: 5504
- Cache write tokens: 0
- Estimated cost: $0.001041
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
social_image: ../desktop-social.webp
title: TypeScript のゲリラ型
subTitle: 反逆的タイポグラフィ
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
## TypeScript のゲリラ型

この記事では、型設計を支援する 3 つの興味深い（場合によってはひどい？）テクニックを紹介します！

主な目的は **一貫性** と **予測可能性** を備えた Model/Entity/Class インターフェースです。

- [型設計へのアプローチ](#approaches-to-designing-types)
  - [単一の大きなオブジェクト](#single-large-object)
  - [複数の名前付き型](#multiple-named-types)
- [テクニック #1: なぜすべてではないのか](#technique-1-why-not-all)
- [テクニック #2: Mix-in](#technique-2-mix-ins)
  - [Mix-in の例](#mix-in-examples)
  - [例 `User`](#example-user)
- [テクニック #3: 名前空間で整理](#technique-3-organizing-with-namespaces)
  - [実務での使用例](#real-world-usage)
- [まとめ](#summary)

<!--
1.  High-level logical representation of types - in a way meaningful to both devs and business stakeholders.
2.  Durable way to model combinations of logically related fields.
    1.  Example: **Object instances** often include common fields `id`, `createdDate`, `createdById`, etc.
    2.  Model Request & Response fields from your discrete database models. (e.g. `_version`, `_v`)
    3.  Composable utilities, Paging/Payload wrapper, etc: `pageNumber`, `sortBy`, `impersonateSession`, `token`, `_version`, etc.
3.  Avoid unintended variances in naming and typing (`id`, `Id`, `ID`, `created_at`, `date_created`, oh noes!)
4.  Compose higher level types with multiple smaller reusable interfaces & types.
5.  Utilize [Unions](https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes-func.html#discriminated-unions) to 'automatically' match variants of a type. -->

### 型設計へのアプローチ

おそらく「型実装」に関するさまざまなパターンに出くわしたことがあるでしょう。特にサードパーティ API からデータを取得するときに顕著です。

**注:** ここでは、エンティティリレーションシップ図（ERD）やオブジェクト指向プログラミング（OOP）の継承階層といった「従来型」の手法は意図的に無視します。対象は、半構造化された API データを表す型です。

まずは二つの大枠アプローチを比較します。**単一の大きなオブジェクト**（トップダウン） と **複数の名前付き型**（ボトムアップ）。

#### 単一の大きなオブジェクト

再利用性や DRY を犠牲にしてでも、明示的であることを優先します。

**ボーナス:** IDE/開発体験が優れており、ツールチップにより完全なプレビューが表示されるので余計な手間がかかりません。

```tsx
interface ProductDetails {
  name: string;
  seller: { name: string };
  availability: Array<{ warehouseId: string; quantity: number }>;
  reviews: Array<{ authorId: number; stars: number }>;
}
```

明示的な可読性を優先するので、_ある程度_ の繰り返しは許容して構いません（合理的な範囲で）。プロパティのグループが多数回出現する場合は、繰り返しフィールドを名前付き型へ抽出するとよいでしょう。

#### 複数の名前付き型

再利用性と DRY を優先します。

<!-- Readability is a funny measure. Since Readability is often good or **great when there are few types/files.** **Inevitably types tend to proliferate,** featuring ever more properties. **Readability suffers.** -->

このアプローチは、圧倒的に好まれる選択肢です。

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

全体としてこの手法は優れています。ただし、欠点が全くないわけではありません。

- **可読性** は最初は抜群ですが、型のサイズや数が増えるにつれて _低下することがあります_。
- ひたすら DRY ですが、代償は何でしょうか？（続きは後述します。）
- ツールチップが情報不足になるため、開発者体験が損なわれることがあります。

> ⚠️ TypeScript (おおよそ) v3 以降、Language Server はツールチップを切り詰め、ネストされたプロパティを省略します。  
> 💡 多少改善するコツがあります。`Cmd` または `Ctrl` を押しながら型名にホバーすると、ツールチップに少なくとももう一層のプロパティが表示されます。

なぜこの二つのアプローチ（巨大型 vs. 名前付きサブ型）を選ばなければならないのでしょうか？

### Technique #1: Why not all

すべて手に入れることは可能でしょうか？

- 「大局」的な型の明瞭さ  
- さらに名前付きサブ型  
- 重複なしで実現できるか？

> ✅ はい！ 🎉

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

1. 大規模な「Primary」構造型を作成する。  
2. Primary 型から派生したサブ型をエクスポートする。

この手法は、**高レベル** オブジェクトのドキュメントを一元化できるシステムで特に有効だ。  
また、モデル、サービス、クエリ結果など、さまざまなユースケース間での再利用も容易になる。

### Technique #2: Mix-ins

この戦略は **適切なフィールド** と **適切な名前** を組み合わせて **単一の論理オブジェクトを表現** することに重点を置く。目的は TypeScript のユーティリティと型ユニオンを活用し、複数のユースケースに効率的に対応することだ。

従来の OOP 継承や階層構造が **オブジェクトの層を作り、密結合な分類体系** を構築しようとするのに対し、**mix‑in アプローチは平坦で緩く関連付けられた型** を目指す。関連フィールドをグルーピングしつつ、重複を削減する。

#### Mix-in Examples

```tsx
interface TodoModel {
  text: string;
  complete: boolean;
}
interface InstanceMixin {
  id: number;
}
/** TodoDraft represents Form state, possibly all undefined */
export type TodoDraft = Partial<TodoModel>;
/** Todo represents a Todo instance record from the database */
export type Todo = TodoModel & InstanceMixin;
```

#### Example `User`

```tsx
interface User {
  id: number;
  name: string;
  bio: string;
  social: Record<"facebook" | "instagram" | "github", URL>;
}
```

`User` がデータベースに保存される前後の形を示す。

```tsx
// Core User fields (say for a <form>)
interface UserBase {
  name: string;
  bio: string;
  social: Record<"facebook" | "instagram" | "github", URL>;
}
// Fields from the database
interface InstanceMixin {
  id: number;
  createdAt: Date;
  updatedAt: Date;
}
// A User **instance** - with all fields
type UserInstance = InstanceMixin & UserBase;
```

必要なフィールドだけを切り出すことができる（例: 作成/更新時に `password` が必要だが、`UserInstance` のクエリ結果には含めない）。

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
/** User payload for signup, including `password` field */
export type UserPayload = UserBase & { password: string };
/** Represents User type returned from server. */
export type UserInstance = UserBase & InstanceMixin;
```

1.  「これは良いプラクティスですか？」
2.  「試してみる価値はありますか？」

答えはない。次に進もう！

### Technique #3: Organizing with Namespaces

ここでは `ModelMixins` 名前空間を宣言します。これにより、ある程度の整理ができ、再利用パターンが明確になります。

**標準化された形状**

- `createdAt` と `updatedAt` は必ずペアで存在する。
- `id` は `ID` や `_id` ではなく、`id` を使用する。

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

**型ユニオンの利用**

```tsx
// `src/types/user.d.ts`
export interface UserBase {
  name: string;
  bio: string;
  social: Record<"facebook" | "instagram" | "github", URL>;
}
// 単一の `User` 型。型ユニオンを使って
// 作成前後の状態を動的に表現する。
export type User =
  | (UserBase & ModelMixins.Instance & ModelMixins.HashedPassword)
  | (UserBase & ModelMixins.InputPassword);
```

必要に応じて、個別の名前付き型をエクスポートすることもできます。

```tsx
/** サインアップ時のペイロード。`password` フィールドを含む */
export type UserPayload = UserBase & ModelMixins.Instance & ModelMixins.HashedPassword;
/** サーバーから返される User 型 */
export type UserInstance = UserBase & ModelMixins.InputPassword;
```

#### 実務での使用例

以下は `in` 演算子を使って `UserInstance` と `UserPayload` を判別する `upsert()` 関数です。

```tsx
function upsert(user: User) {
  if ("id" in user) {
    // TypeScript はここで `user` が Instance 系（id、createdAt など）のフィールドを持つことを推論します
    return updateUser(user.id, user);
  } else {
    // TypeScript はこのケースが `UserBase & ModelMixins.InputPassword` 版の user であることを推論します
    return createUser(user);
  }
}
```

### まとめ

ここまでで、3 つの手法とそれに付随するいくつかのアイデアを紹介しました。

これらのパターンは本当に有用か？ 取り入れる価値はあるか？ と疑問に思うかもしれません。

## 参考資料

- [TypeScript tips for legacy projects: Type only you need](https://sergiocarracedo.es/typescript-tips/)
- [Matt Pocock の優れた新書](https://www.totaltypescript.com/books/total-typescript-essentials)
- [Total TypeScript Tips](https://www.totaltypescript.com/tips)
````
