# Translation Candidate
- Slug: guerrilla-types-in-typescript
- Locale: ja
- Model: openrouter/qwen/qwen3-32b:nitro
- Target: src/content/posts/2023-09-06--guerrilla-types-in-typescript/ja/index.mdx
- Validation: deferred
- Runtime seconds: 26.80
- Input tokens: 10003
- Output tokens: 8329
- Thinking tokens: unknown
- Cached input tokens: 1024
- Cache write tokens: 0
- Estimated cost: $0.002799
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
social_image: ../desktop-social.webp
title: ''
subTitle: 反骨のフォントデザイン
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
## TypeScriptにおけるゲリラ型

この記事では、型設計を助ける3つの興味深い（あるいはひどい？）テクニックを紹介します！

主な目標は、**一貫性**と**予測可能性**のあるModel/Entity/Classインターフェースの構築です。

- [型設計へのアプローチ](#型設計へのアプローチ)
  - [単一の大きなオブジェクト](#単一の大きなオブジェクト)
  - [複数の名前付き型](#複数の名前付き型)
- [テクニック#1: すべてを含めるべきではない理由](#テクニック1-すべてを含めるべきではない理由)
- [テクニック#2: Mix-in](#テクニック2-mix-in)
  - [Mix-inの例](#mix-inの例)
  - [例: `User`](#例-user)
- [テクニック#3: 名前空間による整理](#テクニック3-名前空間による整理)
  - [実際の使用例](#実際の使用例)
- [まとめ](#まとめ)

<!--
1. 開発者とビジネスステークホルダーの両方に意味のある、高レベルの論理的型表現。
2. 論理的に関連するフィールドの組み合わせをモデル化する持続可能な方法。
    1. 例: **オブジェクトインスタンス**はよく`id`、`createdDate`、`createdById`などの共通フィールドを含む。
    2. 離散的なデータベースモデルからリクエスト/レスポンスフィールドをモデル化する。(例: `_version`、`_v`)
    3. 組み立て可能なユーティリティ、ページング/ペイロードラッパーなど: `pageNumber`、`sortBy`、`impersonateSession`、`token`、`_version`など。
3. 命名や型の意図しない変異を避ける(`id`、`Id`、`ID`、`created_at`、`date_created`、ああもう嫌だ！)
4. 複数の小さな再利用可能なインターフェースと型から高レベルの型を構成する。
5. [Unions](https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes-func.html#discriminated-unions) を活用して、型のバリアントを「自動的に」マッチさせる。 -->

### 型設計へのアプローチ

「型の実装」周りでさまざまなパターンに遭遇したり、自分で書いた経験があるでしょう。特に3rdパーティAPIからデータを消費する際にはそうです。  

**注意:** エンティティリレーションシップ図(ERD)やオブジェクト指向プログラミング(OOP)の継承階層といった「伝統的」なプロセスは意図的に無視します。ここでは、半構造化されたAPIデータを表現するための型を構築しています。  

2つの高レベルアプローチを探ってみましょう: **単一の大きなオブジェクト**(トップダウン) vs **複数の名前付き型**(ボトムアップ)。  

#### 単一の大きなオブジェクト  

再利用性やDRY原則よりも明示性を優先します。  

**ボーナス:** IDE/開発体験が良いです。ツールチップにより完全なプレビューが含まれるため、手間がありません。

```tsx
interface ProductDetails {
  name: string;
  seller: { name: string };
  availability: Array<{ warehouseId: string; quantity: number }>;
  reviews: Array<{ authorId: number; stars: number }>;
}
```

明示的な可読性を優先するため、ある程度の繰り返しは許容されます（ただし合理的な範囲内）。プロパティのグループが頻繁に繰り返される場合は、繰り返されるフィールドを名前付き型に抽出することをためらわないでください。

#### 複数の名前付き型

再利用性とDRY原則を優先します。

<!-- 可読性は面白い測定方法です。タイプやファイルが少ない場合は、可読性がよく**あるいは****非常に良い**傾向があります。**タイプが必然的に増殖する**と、プロパティがさらに増えていきます。**可読性は低下します**。 -->

このアプローチはおそらく、はるかに広く支持されているでしょう。

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

全体的に見ると、このアプローチは優れたものです。ただし、欠点がないわけではありません。

- **可読性**は初期には優れていますが、型のサイズや数が増えると低下する可能性があります。
- DRY（Don't Repeat Yourself）を徹底的に追求しますが、そのコストはどのくらいでしょうか？（後で詳しく説明します。）
- ツールチップが情報提供性に欠けるため、開発者体験が低下する可能性があります。

> ⚠️ TypeScript v3以降、Language Server（言語サーバー）はツールチップを短縮し、ネストされたプロパティを省略します。
> 💡 いくつかのテクニックで改善できます。`Cmd`または`Ctrl`キーを押しながら、さまざまな型名にマウスをホバーしてみてください。ツールチップに少なくとも1層分の追加プロパティが表示されるはずです。

なぜこの2つのアプローチ（巨大な型 vs. 名前付きサブタイプ）の間で選ばなければならないのでしょうか？

### テクニック #1: なぜ全部使えないのか

これらすべてを統合することはできないのでしょうか？

- 大規模な型の「全体像」の明確さ？
- 名前付きサブタイプの利便性？
- 重複なしで？

✅ はい！🎉

<!-- ### 考えるべきポイント

- `Product` -> `Seller` といった `1対1` の関係をどう表現しますか？
- `Reviews` や `Photos` のような `1対多` の関係は？
- Prismaに任せますか？（悪い考えではありませんが、この記事はTypeScriptの学習が目的です...） -->

<!-- このアプローチは、決してモデルのフィールド名を重複させないことを目的とした練習です。その過程で、「全体像」を1か所に集約する（大きな型から始めて、シンプルな型を派生させる）方法が明らかになります。 -->

<!-- 構造化された配列/オブジェクトデータが提供されたとき、多くのTypeScript開発者は型を作成したくなります。大量の型です。最終的には、単純な型がより複雑な型を構築する層のカスケードが形成されます。

または、あなたは最初に最高レベルの型から始めて、ツリー内の次のサブタイプをスキャフォールディングするタイプですか？ -->

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

1. 複数の「プライマリータイプ」を構造化して作成する  
2. プライマリータイプからサブタイプを導出して再利用する  

このアプローチは、「ハイレベルな」オブジェクトが1か所にドキュメント化されるシステムで特に効果を発揮します。また、モデル、サービス、クエリ結果など多くのユースケースにわたって再利用をサポートします。  

### テクニック #2: Mix-in  

この戦略は、**正しいフィールド** と **正しい名前** を組み合わせて **単一の論理的オブジェクトを表現する** ことに焦点を当てています。目的は、TypeScriptユーティリティと型ユニオンを用いて複数のユースケースを効率的に扱うこと。  

伝統的なOOPの継承や階層構造とは異なり、このアプローチはオブジェクトをきつく述語の分類体系に層状化することを目指しません。**Mix-inのアプローチは、フラットで緩く関連する型をグループ化し、重複を減らす** ことに注力しています。  

#### Mix-inの例

```tsx
interface TodoModel {
  text: string;
  complete: boolean;
}
interface InstanceMixin {
  id: number;
}
/** TodoDraftはフォームの状態を表し、すべてのフィールドがundefinedの可能性があります */
export type TodoDraft = Partial<TodoModel>;
/** Todoはデータベースから取得されたTodoインスタンスレコードを表します */
export type Todo = TodoModel & InstanceMixin;
```

#### 例: `User`

```tsx
interface User {
  id: number;
  name: string;
  bio: string;
  social: Record<"facebook" | "instagram" | "github", URL>;
}
```

データベースに保存する前後の`User`を表現してみましょう。

```tsx
// コアなUserフィールド（たとえば<form>用）
interface UserBase {
  name: string;
  bio: string;
  social: Record<"facebook" | "instagram" | "github", URL>;
}
// データベースからのフィールド
interface InstanceMixin {
  id: number;
  createdAt: Date;
  updatedAt: Date;
}
// Userの**インスタンス** - すべてのフィールドを含む
type UserInstance = InstanceMixin & UserBase;
```

これにより、必要なフィールドを正確に構築できます（例: `password`は作成/更新用だが、`UserInstance`のクエリには含まれません）。

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
/** サインアップ用のUserペイロード、`password`フィールドを含む */
export type UserPayload = UserBase & { password: string };
/** サーバーから返されるUser型を表します */
export type UserInstance = UserBase & InstanceMixin;
```

1.  "これは良い実践でしょうか？"
2.  "試してみるべきでしょうか？"

わかりません。では続きましょう！

### テクニック #3: 名前空間による整理

ここで、`ModelMixins`名前空間を宣言しています。これは整理を加えるだけでなく、明確な再利用パターンを提供します。

**標準化された形状**

- `createdAt` と `updatedAt` は一緒に存在します。
- `id` は `ID` や `_id` ではなく使用されます。

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

**型のユニオンの使用**

```tsx
// `src/types/user.d.ts`
export interface UserBase {
  name: string;
  bio: string;
  social: Record<"facebook" | "instagram" | "github", URL>;
}
// 単一の `User` 型で、型のユニオンを使って
// 作成前と作成後の状態を動的に表現します。
export type User =
  | (UserBase & ModelMixins.Instance & ModelMixins.HashedPassword)
  | (UserBase & ModelMixins.InputPassword);
```

必要に応じて、個別の名前付き型もエクスポートできます：

```tsx
/** サインアップ用のUserペイロード、`password`フィールドを含む */
export type UserPayload = UserBase & ModelMixins.Instance & ModelMixins.HashedPassword;
/** サーバーから返されるUser型を表します。 */
export type UserInstance = UserBase & ModelMixins.InputPassword;
```

#### 現実世界での使用例

`in` 演算子を使用して `UserInstance` と `UserPayload` の型を区別する `upsert()` 関数の例です。

```tsx
function upsert(user: User) {
  if ("id" in user) {
    // TypeScript knows `user` here has fields from Instance (id, createdAt, etc)
    return updateUser(user.id, user);
  } else {
    // TypeScript knows this must be the `UserBase & ModelMixins.InputPassword` version of user.
    return createUser(user);
  }
}
```

### 要点

3つの技法と関連する補助的なアイデアを紹介しました。

あなたはこれらのパターンが良いものなのか、これらのアイデアを採用すべきか疑問に思うかもしれません。

## 参考資料

- [TypeScript tips for legacy projects: Type only you need](https://sergiocarracedo.es/typescript-tips/)
- [Matt Pocock's Excellent new book](https://www.totaltypescript.com/books/total-typescript-essentials)
- [Total TypeScript Tips](https://www.totaltypescript.com/tips)
````
