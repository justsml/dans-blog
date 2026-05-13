# Translation Candidate
- Slug: guerrilla-types-in-typescript
- Locale: ru
- Model: openrouter/qwen/qwen3-32b:nitro
- Target: src/content/posts/2023-09-06--guerrilla-types-in-typescript/ru/index.mdx
- Validation: deferred
- Runtime seconds: 54.61
- Input tokens: 9539
- Output tokens: 8420
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- Estimated cost: $0.002784
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
social_image: ../desktop-social.webp
title: Дикая типизация в TypeScript
subTitle: ''
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
## Гуэrrильные типы в TypeScript

В этой статье мы рассмотрим три интересных (возможно, ужасных?) техники, которые помогут в проектировании типов!

Основная цель — **согласованные** и **предсказуемые** интерфейсы Модели/Сущности/Класса.

- [Подходы к проектированию типов](#подходы-к-проектированию-типов)
  - [Единый большой объект](#единый-большой-объект)
  - [Несколько именованных типов](#несколько-именованных-типов)
- [Техника #1: Почему не все](#техника-1-почему-не-все)
- [Техника #2: Mix-in](#техника-2-mix-in)
  - [Примеры Mix-in](#примеры-mix-in)
  - [Пример `User`](#пример-user)
- [Техника #3: Организация с помощью пространств имен](#техника-3-организация-с-помощью-пространств-имен)
  - [Практическое применение](#практическое-применение)
- [Резюме](#резюме)

<!--

1.  Высокоуровневое логическое представление типов — в виде, значимом как для разработчиков, так и для бизнес-заинтересованных сторон.
2.  Устойчивый способ моделирования комбинаций логически связанных полей.
    1.  Пример: **Объекты экземпляров** часто включают общие поля `id`, `createdDate`, `createdById` и т.д.
    2.  Модель запроса и ответа для полей из дискретных моделей баз данных. (например, `_version`, `_v`)
    3.  Составляемые утилиты, оболочка для пагинации/нагрузки и т.д.: `pageNumber`, `sortBy`, `impersonateSession`, `token`, `_version` и т.д.
3.  Избегайте непреднамеренных вариаций в именовании и типах (`id`, `Id`, `ID`, `created_at`, `date_created`, ай-ай-ай!)
4.  Составляйте более высокие уровни типов из нескольких мелких переиспользуемых интерфейсов и типов.
5.  Используйте [Объединения](https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes-func.html#discriminated-unions), чтобы «автоматически» сопоставлять варианты типа. -->

### Подходы к проектированию типов

Вероятно, вы сталкивались или писали различные паттерны для «реализации типов». Особенно при использовании данных из сторонних API.  

**Примечание:** Я намеренно игнорирую «традиционные» процессы построения диаграмм сущности-связь (ERD) или иерархий наследования объектно-ориентированного программирования (ООП). Здесь мы создаём типы для представления полуструктурированных данных API.  

Рассмотрим два основных подхода: **Единый крупный объект** (сверху вниз) против **Нескольких именованных типов** (снизу вверх).  

#### Единый крупный объект  

Приоритет — явность над переиспользованием и DRY-принципом.  

**Плюс:** Опыт работы с IDE отличный, так как подсказки содержат более полный предварительный просмотр — без лишних усилий.

```tsx
interface ProductDetails {
  name: string;
  seller: { name: string };
  availability: Array<{ warehouseId: string; quantity: number }>;
  reviews: Array<{ authorId: number; stars: number }>;
}
```

Поскольку мы приоритет отдаем явной читаемости, некоторое повторение допустимо (в разумных пределах). Когда группы свойств повторяются _многократно_, вы можете извлечь повторяющиеся поля в именованный тип.

#### Несколько именованных типов

Приоритет — переиспользование и DRY-принцип.

<!-- Читаемость — странная мера. Читаемость часто хороша или **отлична, когда типов/файлов немного.** **Неизбежно типы начинают размножаться,** добавляя все больше свойств. **Читаемость страдает.** -->

Этот подход, вероятно, является предпочтительным с большим отрывом.

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

В целом, этот подход отличный. Но у него есть и недостатки.

- **Читаемость** отлична изначально; однако, она _может_ ухудшаться с ростом количества и размера типов.  
- Строгое соблюдение DRY, но за какой ценой? (Об этом подробнее позже.)  
- Опыт разработчика может страдать, так как подсказки становятся менее информативными.  

> ⚠️ Начиная примерно с TypeScript v3, Language Server обрезает подсказки, опуская вложенные свойства.  
> 💡 Существуют хитрости, чтобы немного улучшить ситуацию. Попробуйте нажать `Cmd или Ctrl`, а затем наведите указатель на различные имена типов — вы должны увидеть как минимум ещё один "слой" свойств в подсказке.  

Почему мы должны выбирать между этими двумя подходами? (Большой тип vs. Именованные подтипы)  

### Техника #1: Почему бы не всё сразу  

Можно ли совместить всё?  

- Четкость "обзорных" типов?  
- Плюс именованные подтипы?  
- Без дублирования?

✅ ДА! 🎉

<!-- ### Некоторые моменты для рассмотрения

- Как представить связь `один-к-одному`, например `Product` -> `Seller`?
- А как быть с связями `один-ко-многим`? Например, `Reviews` или `Photos`?
- Доверить это Prisma? (Хорошая идея, но на самом деле статья о том, чтобы научиться чему-то в TypeScript...) -->

<!-- Этот подход — упражнение в НИКОГДА не дублировать имена полей модели. По пути я думаю, что "общая картина" становится более очевидной (в одном месте). Начать с самого крупного, высокого уровня типа и производить из него более простые типы. -->

<!-- При наличии структурированных данных массива/объекта, многие разработчики на TypeScript чувствуют потребность создать типы. Массу типов. Со временем формируется каскад слоёв, состоящий из более простых типов, строящихся в более сложные типы.

Или, может быть, вы тот тип, кто начинает с самого высокого уровня типа, создавая достаточно структуры, чтобы написать следующий подтип в дереве? -->

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

1. Создание крупных "основных" структурированных типов.
2. Экспорт подтипов, производных от основного типа.

Этот подход особенно эффективен в системах, где "высокоуровневые" объекты выигрывают от документации в одном месте.
Кроме того, эта техника поддерживает повторное использование в различных сценариях: модели, сервисы, результаты запросов и т.д.

### Техника #2: Миксины

Эта стратегия заключается в объединении **правильных полей**, с **правильными именами**, чтобы **представить единственный логический объект**. Цель — эффективно решать множество сценариев с помощью утилит TypeScript и объединений типов.

Этот подход отличается от традиционной объектно-ориентированной инкапсуляции и иерархий, которые стремятся создать слои объектов в строго связанные таксономии. **Миксиновый подход ориентирован на плоские и слабо связанные типы**, группируя связанные поля, одновременно уменьшая дублирование.

#### Примеры миксинов

```tsx
interface TodoModel {
  text: string;
  complete: boolean;
}
interface InstanceMixin {
  id: number;
}
/** TodoDraft представляет состояние формы, возможно, со всеми неопределенными полями */
export type TodoDraft = Partial<TodoModel>;
/** Todo представляет запись экземпляра Todo из базы данных */
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

Представим `User` до и после сохранения в базу данных.

```tsx
// Основные поля User (например, для <form>)
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
// Экземпляр User - со всеми полями
type UserInstance = InstanceMixin & UserBase;
```

Теперь мы можем точно определить нужные поля (например, `password` для создания/обновления, но не включающийся в запросы `UserInstance`).

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
/** Тип данных пользователя для регистрации, включая поле `password` */
export type UserPayload = UserBase & { password: string };
/** Представляет тип User, возвращаемый сервером */
export type UserInstance = UserBase & InstanceMixin;
```

1.  "Это хорошая практика?"
2.  "Стоит ли пробовать это?"

Нет понятия. Давайте продолжим!

### Техника #3: Организация с помощью пространств имен

Здесь мы объявляем пространство имен `ModelMixins`. Это обеспечивает некоторую организацию и более четкий паттерн повторного использования.

**Стандартизованные формы**

- `createdAt` и `updatedAt` существуют вместе.
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
// Единый тип `User`, использующий объединение типов для динамического
// представления состояний до и после создания.
export type User =
  | (UserBase & ModelMixins.Instance & Model:Mixins.HashedPassword)
  | (UserBase & ModelMixins.InputPassword);
```

Если нужно, можно также экспортировать отдельные именованные типы:

```tsx
/** Тип данных пользователя для регистрации, включая поле `password` */
export type UserPayload = UserBase & ModelMixins.Instance & ModelMixins.HashedPassword;
/** Представляет тип User, возвращаемый сервером. */
export type UserInstance = UserBase & ModelMixins.InputPassword;
```

#### Реальное применение

Вот функция `upsert()`, которая использует оператор `in` для различения типов `UserInstance` и `UserPayload`.

```tsx
function upsert(user: User) {
  if ("id" in user) {
    // TypeScript знает, что `user` здесь содержит поля из Instance (id, createdAt и т.д.)
    return updateUser(user.id, user);
  } else {
    // TypeScript знает, что это обязательно версия `UserBase & ModelMixins.InputPassword` пользователя.
    return createUser(user);
  }
}
```

### Резюме

Мы рассмотрели три техники и несколько связанных с ними идей.

Вы, возможно, спрашиваете: являются ли эти паттерны хорошими? Следует ли вам принять некоторые из этих идей?

## Ресурсы

- [Советы по TypeScript для устаревших проектов: Типы, которые вам нужны](https://sergiocarracedo.es/typescript-tips/)
- [Отличная новая книга Мэтта Покока](https://www.totaltypescript.com/books/total-typescript-essentials)
- [Советы по Total TypeScript](https://www.totaltypescript.com/tips)
````
