---
title: "Guerrilla Types in TypeScript"
subTitle: Renegade Type Design
date: 2023-09-05
modified: 2024-07-30
tags: [engineering,typescript,composition,types]
category: Guides
subCategory: TypeScript
cover: DALL-E 2023-09-06 00.20.58 - A rebellious gorilla wearing camo and a red bandana typing on an Apple macbook oil painting-60q.jpg
cover_mobile: w300_DALL-E 2023-09-06 00.20.58 - A rebellious gorilla wearing camo and a red bandana typing on an Apple macbook oil painting-60q.jpg
cover_tablet: w600_DALL-E 2023-09-06 00.20.58 - A rebellious gorilla wearing camo and a red bandana typing on an Apple macbook oil painting-60q.jpg
cover_desktop: w900_DALL-E 2023-09-06 00.20.58 - A rebellious gorilla wearing camo and a red bandana typing on an Apple macbook oil painting-60q.jpg
cover_icon: icon_DALL-E 2023-09-06 00.20.58 - A rebellious gorilla wearing camo and a red bandana typing on an Apple macbook oil painting-60q.jpg
---

## Guerrilla Types in TypeScript

In this article, we’ll explore three intriguing (possibly terrible?) techniques to assist in type design!

The main goal is **consistent** and **predictable** Model/Entity/Class interfaces.

- [Approaches to Designing Types](#approaches-to-designing-types)
  - [Single large object](#single-large-object)
  - [Multiple named types](#multiple-named-types)
- [Technique #1: Why not all](#technique-1-why-not-all)
- [Technique #2: Mix-ins](#technique-2-mix-ins)
  - [Mix-in Examples](#mix-in-examples)
  - [Example `User`](#example-user)
- [Technique #3: Organizing with Namespaces](#technique-3-organizing-with-namespaces)
  - [Real-world Usage](#real-world-usage)
- [Summary](#summary)

<!--
1.  High-level logical representation of types - in a way meaningful to both devs and business stakeholders.
2.  Durable way to model combinations of logically related fields.
    1.  Example: **Object instances** often include common fields `id`, `createdDate`, `createdById`, etc.
    2.  Model Request & Response fields from your discrete database models. (e.g. `_version`, `_v`)
    3.  Composable utilities, Paging/Payload wrapper, etc: `pageNumber`, `sortBy`, `impersonateSession`, `token`, `_version`, etc.
3.  Avoid unintended variances in naming and typing (`id`, `Id`, `ID`, `created_at`, `date_created`, oh noes!)
4.  Compose higher level types with multiple smaller reusable interfaces & types.
5.  Utilize [Unions](https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes-func.html#discriminated-unions) to 'automatically' match variants of a type. -->

### Approaches to Designing Types

You've probably encountered or written varying patterns around "type implementations." Especially when consuming data from 3rd party APIs.

**Note:** I'm intentionally ignoring "traditional" processes building Entity Relationship Diagrams (ERD) or Object Oriented Programming (OOP) inheritance hierarchies. Here, we're building types to represent semi-structured API data.

Let's explore two high-level approaches: **Single large object** (Top-down) vs. **Multiple named types** (Bottom-up.)

#### Single large object

Prioritizes being explicit over reusability & DRY-ness.

**Bonus:** IDE/Dev Experience is great, since tooltips include a more complete preview - without fuss.

```tsx
interface ProductDetails {
  name: string;
  seller: { name: string };
  availability: Array<{ warehouseId: string; quantity: number }>;
  reviews: Array<{ authorId: number; stars: number }>;
}
```

Since we are prioritizing explicit readability, it's okay to indulge in _some_ repetition (within reason.) When groups of properties repeat _many_ times, feel free to extract the repeated fields to a named type.

#### Multiple named types

Prioritizing reusability & DRY-ness.

<!-- Readability is a funny measure. Since Readability is often good or **great when there are few types/files.** **Inevitably types tend to proliferate,** featuring ever more properties. **Readability suffers.** -->

This approach is likely the favored approach by a wide margin.

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

Overall, this approach is great. But it's not without drawbacks.

- **Readability** is excellent at first; however, it _can_ suffer as the size & number of types grows.
- Relentlessly DRY, but at what cost? (More on this later.)
- Developer experience can suffer since tooltips are less informative.

> ⚠️ Since (approximately) TypeScript v3, the Language Server truncates tooltips, omitting nested properties.
> 💡 There are tricks to improve things a bit. Try holding `Cmd or Ctrl`, then hover over various type names - you should see at least one extra 'layer' of properties in the tooltip.

Why do we have to choose between these two approaches? (Big ol' type vs. Named sub-types.)

### Technique #1: Why not all

Can we have it all?

- Clarity of "big-picture" types?
- Plus named sub-types?
- Without duplication?

> ✅ YES! 🎉

<!-- ### Some things to consider

- How do you represent a `one-to-one` relationship like `Product` -> `Seller`?
- What about `one-to-many` relationships? Say `Reviews`, or `Photos`?
- Let Prisma handle it? (Not a bad idea, but this article is secretly about learning some TypeScript...) -->

<!-- This approach is an exercise in NEVER duplicating Model field names. Along the way, I think the "big picture" more obvious (in one spot). starting with the largest, highest-level type, and deriving the simpler types from it. -->

<!-- When provided with some structured array/object data, many TypeScript coders feel the urge to create types. Loads of types. Eventually a cascade of layers forms, made up of simpler types building ever more complex types.

Or maybe you are the type to start at the highest-level type, scaffolding enough to write the next sub-type in the tree? -->

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

1.  Create large "Primary" structured types.
2.  Export sub-types derived from the Primary type.

This approach really shines in systems where "high-level" objects benefit from documentation in one place.
Also, this technique supports re-use between many use cases: Models, Services, Query Results, etc.

### Technique #2: Mix-ins

This strategy is all about putting together the **right fields**, with the **right names**, to **represent single logical objects.** The goal is to efficiently address multiple use cases with TypeScript Utilities and Type Unions.

This approach differs from traditional OOP inheritance & hierarchies, which aims to create layers of objects into tightly bound taxonomies. The **mix-in approach is about flat and loosely-related types**, grouping related fields while reducing duplication.

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

Let's represent the `User` before & after saving to the database.

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

Now we can sculpt the exact fields we need (like `password` for create/update, but not included in queries of `UserInstance`).

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

1.  "Is this a good practice?"
2.  "Should I try it out?"

No idea. Let's keep going!

### Technique #3: Organizing with Namespaces

Here, we declare a `ModelMixins` namespace. This provides some organization plus a clearer reuse pattern.

**Standardized Shapes**

- `createdAt` & `updatedAt` exist together.
- `id`, not `ID` or `_id`.

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

**Using Type Unions**

```tsx
// `src/types/user.d.ts`
export interface UserBase {
  name: string;
  bio: string;
  social: Record<"facebook" | "instagram" | "github", URL>;
}
// Single `User` type, using Type Union to dynamically
//  represent the pre- & post-creation states.
export type User =
  | (UserBase & ModelMixins.Instance & ModelMixins.HashedPassword)
  | (UserBase & ModelMixins.InputPassword);
```

If desired, you can also export individual named types:

```tsx
/** User payload for signup, including `password` field */
export type UserPayload = UserBase & ModelMixins.Instance & ModelMixins.HashedPassword;
/** Represents User type returned from server. */
export type UserInstance = UserBase & ModelMixins.InputPassword;
```

#### Real-world Usage

Here's an `upsert()` function that uses `in` operator to distinguish between `UserInstance` and `UserPayload` types.

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

### Summary

We covered three techniques and a few related supporting ideas.

You may be asking, are these good patterns? Should I adopt some of these ideas?

**Answer:** Try them out. Find what works for you, your team, and your project. 🌈✨

Let me know what you think on [Twitter](https://twitter.com/justsml) or
[GitHub](https://github.com/justsml/dans-blog/issues/new).
