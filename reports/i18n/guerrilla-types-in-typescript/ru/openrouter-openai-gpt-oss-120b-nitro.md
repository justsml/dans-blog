# Translation Candidate
- Slug: guerrilla-types-in-typescript
- Locale: ru
- Model: openrouter/openai/gpt-oss-120b:nitro
- Target: src/content/posts/2023-09-06--guerrilla-types-in-typescript/ru/index.mdx
- Validation: deferred
- Runtime seconds: 3.60
- Input tokens: 9685
- Output tokens: 3054
- Thinking tokens: unknown
- Cached input tokens: 4352
- Cache write tokens: 0
- Estimated cost: $0.000927
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
social_image: ../desktop-social.webp
title: Гуэррилья‑типы в TypeScript
subTitle: Бунтарский дизайн шрифтов
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
## Guerrilla Types in TypeScript

В этой статье мы рассмотрим три интересных (возможно, ужасных?) приёма, помогающих в проектировании типов!

Главная цель — **последовательные** и **предсказуемые** интерфейсы моделей/сущностей/классов.

- [Подходы к проектированию типов](#approaches-to-designing-types)
  - [Один большой объект](#single-large-object)
  - [Несколько именованных типов](#multiple-named-types)
- [Техника #1: Почему бы не всё](#technique-1-why-not-all)
- [Техника #2: Mix‑ins](#technique-2-mix-ins)
  - [Примеры mix‑in](#mix-in-examples)
  - [Пример `User`](#example-user)
- [Техника #3: Организация с помощью пространств имён](#technique-3-organizing-with-namespaces)
  - [Реальное применение](#real-world-usage)
- [Итоги](#summary)

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

Вы, вероятно, уже сталкивались с различными шаблонами «реализаций типов» или писали их сами, особенно при работе с данными сторонних API.

**Примечание:** Я намеренно игнорирую «традиционные» подходы построения диаграмм «сущность‑связь» (ERD) или иерархий наследования объектно‑ориентированного программирования (OOP). Здесь мы создаём типы для представления полуструктурированных данных API.

Рассмотрим два высокоуровневых подхода: **один большой объект** (сверху‑вниз) против **множества именованных типов** (снизу‑вверх).

#### Один большой объект

Отдаёт предпочтение явности над переиспользуемостью и DRY‑принципом.

**Бонус:** опыт разработки в IDE отличен, поскольку подсказки показывают более полное превью — без лишних хлопот.

```tsxinterface ProductDetails {
  name: string;
  seller: { name: string };
  availability: Array<{ warehouseId: string; quantity: number }>;
  reviews: Array<{ authorId: number; stars: number }>;
}
```

Поскольку мы ставим в приоритет явную читаемость, небольшое дублирование (в разумных пределах) допустимо. Когда группы свойств повторяются **много** раз, смело выносьте повторяющиеся поля в отдельный именованный тип.

#### Несколько именованных типов

Ставим в приоритет переиспользуемость и DRY‑принцип.

<!-- Читаемость — странная метрика. Обычно читаемость хороша или **отлична, когда типов/файлов мало**. **Неизбежно типы начинают размножаться**, добавляя всё больше свойств. **Читаемость страдает.** -->

Этот подход, скорее всего, будет предпочтительным большинством.

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

В целом, такой подход хорош. Но у него есть свои недостатки.

- **Читаемость** изначально отличная; однако она _может_ пострадать по мере роста количества и размеров типов.  
- Неустанно DRY, но какой ценой? (Подробнее об этом позже.)  
- Опыт разработчика может ухудшиться, поскольку подсказки становятся менее информативными.  

> ⚠️ Начиная примерно с TypeScript v3, Language Server обрезает подсказки, опуская вложенные свойства.  
> 💡 Есть приёмы, которые немного улучшают ситуацию. Удерживая `Cmd` или `Ctrl`, наведите курсор на различные имена типов — вы должны увидеть хотя бы один дополнительный «слой» свойств в подсказке.  

Почему нам приходится выбирать между этими двумя подходами? (Огромный тип vs. именованные подтипы.)  

### Техника #1: Почему бы не всё

Можно ли иметь всё?

- Ясность «общей картины» типов?  
- Плюс именованные подтипы?  
- Без дублирования?

>✅ ДА! 🎉

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

1.  Создайте крупные «основные» структурированные типы.  
2.  Экспортируйте подтипы, полученные из основного типа.

Этот приём особенно полезен в системах, где «высокоуровневые» объекты выигрывают от единой документации.  
Кроме того, техника облегчает повторное использование в разных сценариях: модели, сервисы, результаты запросов и т.д.

### Техника №2: Mix‑ins

Суть стратегии — собрать **правильные поля** с **правильными именами**, чтобы **представлять единичные логические объекты**. Цель — эффективно покрыть несколько вариантов использования с помощью утилит TypeScript и объединений типов.

Подход отличается от традиционного ООП‑наследования и иерархий, где пытаются построить слои объектов в жёстко связанные таксономии. **Mix‑in‑подход ориентирован на плоские и слабо связанные типы**, группируя связанные поля и уменьшая дублирование.

#### Примеры mix‑in


```tsx
interface TodoModel {
  text: string;
  complete: boolean;
}
interface InstanceMixin {
  id: number;
}
/** TodoDraft представляет состояние формы, возможно полностью неопределённое */
export type TodoDraft = Partial<TodoModel>;
/** Todo представляет запись Todo‑экземпляра из базы данных */
export type Todo = TodoModel & InstanceMixin;
```

#### Пример `User`

```tsx
interface User {
  id: number;
  name: string;
  bio: string;
  social: Record<"facebook" | "instagram" | "github", URL>;
}
```

Представим `User` до и после сохранения в базе данных.

```tsx
// Основные поля пользователя (например, для <form>)
interface UserBase {
  name: string;
  bio: string;
  social: Record<"facebook" | "instagram" | "github", URL>;
}
// Поля из базы данных
interface InstanceMixin {
  id: number;
  createdAt: Date;
  updatedAt: Date;
}
// Экземпляр пользователя — со всеми полями
type UserInstance = InstanceMixin & UserBase;
```

Теперь можно вырезать только те поля, которые нужны (например, `password` для создания/обновления, но не включать его в запросы `UserInstance`).

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
/** Полезная нагрузка пользователя при регистрации, включая поле `password` */
export type UserPayload = UserBase & { password: string };
/** Представляет тип User, возвращаемый сервером. */
export type UserInstance = UserBase & InstanceMixin;
```

1.  «Это хорошая практика?»
2.  «Стоит ли пробовать?»

Не знаю. Давайте продолжим!

### Техника #3: Организация с помощью пространств имён

Здесь мы объявляем пространство имён `ModelMixins`. Это добавляет некоторую структуру и делает шаблон повторного использования более очевидным.

**Стандартизированные формы**

- `createdAt` и `updatedAt` всегда идут парой.  
- `id`, а не `ID` или `_id`.

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

**Использование объединений типов**

```tsx
// `src/types/user.d.ts`
export interface UserBase {
  name: string;
  bio: string;
  social: Record<"facebook" | "instagram" | "github", URL>;
}
// Один тип `User`, использующий объединение типов для динамического
// представления состояний до и после создания.
export type User =
  | (UserBase & ModelMixins.Instance & ModelMixins.HashedPassword)
  | (UserBase & ModelMixins.InputPassword);
```

При желании можно также экспортировать отдельные именованные типы:

```tsx
/** Полезная нагрузка пользователя при регистрации, включающая поле `password` */
export type UserPayload = UserBase & ModelMixins.Instance & ModelMixins.HashedPassword;
/** Представляет тип User, возвращаемый сервером. */
export type UserInstance = UserBase & ModelMixins.InputPassword;
```

#### Реальное применение

Вот функция `upsert()`, использующая оператор `in` для различения типов `UserInstance` и `UserPayload`.

```tsx
function upsert(user: User) {
  if ("id" in user) {
    // TypeScript знает, что у `user` здесь есть поля из Instance (id, createdAt и т.д.)
    return updateUser(user.id, user);
  } else {
    // TypeScript знает, что это версия пользователя `UserBase & ModelMixins.InputPassword`.
    return createUser(user);
  }
}
```

### Итоги

Мы рассмотрели три приёма и несколько сопутствующих идей.

Возможно, вы задаётесь вопросом: «Это хорошие паттерны? Стоит ли принимать их в своём коде?»

## Полезные ссылки

- [TypeScript‑советы для наследуемых проектов: типизировать только то, что нужно](https://sergiocarracedo.es/typescript-tips/)
- [Отличная новая книга Мэтта Поко́ка](https://www.totaltypescript.com/books/total-typescript-essentials)
- [Total TypeScript Tips](https://www.totaltypescript.com/tips)
````
