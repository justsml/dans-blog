# Translation Candidate
- Slug: guerrilla-types-in-typescript
- Locale: it
- Model: deepseek/deepseek-v4-flash
- Target: src/content/posts/2023-09-06--guerrilla-types-in-typescript/it/index.mdx
- Validation: deferred
- Runtime seconds: 57.08
- Input tokens: 7615
- Output tokens: 10112
- Thinking tokens: unknown
- Cached input tokens: 1152
- Cache write tokens: 0
- Estimated cost: $0.003739
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
social_image: ../desktop-social.webp
title: Tipi Guerriglia in TypeScript
subTitle: Design Tipografico Renegade
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
## Tipi Guerrilla in TypeScript

In questo articolo esploreremo tre tecniche intriganti (possibilmente terribili?) per aiutare nella progettazione dei tipi!

L'obiettivo principale è avere interfacce **coerenti** e **prevedibili** per Modelli/Entità/Classi.

- [Approcci alla progettazione dei tipi](#approaches-to-designing-types)
  - [Singolo grande oggetto](#single-large-object)
  - [Tipi multipli nominati](#multiple-named-types)
- [Tecnica #1: Perché non tutti](#technique-1-why-not-all)
- [Tecnica #2: Mix-in](#technique-2-mix-ins)
  - [Esempi di Mix-in](#mix-in-examples)
  - [Esempio `User`](#example-user)
- [Tecnica #3: Organizzare con Namespace](#technique-3-organizing-with-namespaces)
  - [Utilizzo nel mondo reale](#real-world-usage)
- [Riepilogo](#summary)

<!--
1.  High-level logical representation of types - in a way meaningful to both devs and business stakeholders.
2.  Durable way to model combinations of logically related fields.
    1.  Example: **Object instances** often include common fields `id`, `createdDate`, `createdById`, etc.
    2.  Model Request & Response fields from your discrete database models. (e.g. `_version`, `_v`)
    3.  Composable utilities, Paging/Payload wrapper, etc: `pageNumber`, `sortBy`, `impersonateSession`, `token`, `_version`, etc.
3.  Avoid unintended variances in naming and typing (`id`, `Id`, `ID`, `created_at`, `date_created`, oh noes!)
4.  Compose higher level types with multiple smaller reusable interfaces & types.
5.  Utilize [Unions](https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes-func.html#discriminated-unions) to 'automatically' match variants of a type. -->

### Approcci alla progettazione dei tipi

Probabilmente hai incontrato o scritto vari pattern riguardanti "implementazioni di tipi". Soprattutto quando si consumano dati da API di terze parti.

**Nota:** Sto intenzionalmente ignorando i processi "tradizionali" di creazione di diagrammi ER (Entity Relationship) o gerarchie di ereditarietà della programmazione orientata agli oggetti (OOP). Qui stiamo costruendo tipi per rappresentare dati API semi-strutturati.

Esploriamo due approcci di alto livello: **Singolo grande oggetto** (Top-down) vs. **Tipi multipli nominati** (Bottom-up).

#### Singolo grande oggetto

Dà priorità all'esplicitazione rispetto alla riusabilità e al principio DRY.

**Vantaggio:** L'esperienza IDE/Dev è ottima, poiché i tooltip includono un'anteprima più completa - senza problemi.

```tsx
interface ProductDetails {
  name: string;
  seller: { name: string };
  availability: Array<{ warehouseId: string; quantity: number }>;
  reviews: Array<{ authorId: number; stars: number }>;
}
```

Poiché stiamo dando priorità alla leggibilità esplicita, è lecito concedersi _un po'_ di ripetizione (entro limiti ragionevoli). Quando gruppi di proprietà si ripetono _molte_ volte, sentiti libero di estrarre i campi ripetuti in un tipo nominato.

#### Tipi multipli nominati

Dà priorità alla riusabilità e al principio DRY.

<!-- La leggibilità è una misura strana. Poiché la leggibilità è spesso buona o **ottima quando ci sono pochi tipi/file.** **Inevitabilmente i tipi tendono a proliferare,** presentando sempre più proprietà. **La leggibilità ne risente.** -->

Questo approccio è probabilmente quello preferito con un ampio margine.

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

Nel complesso, questo approccio è ottimo. Ma non è privo di inconvenienti.

- **Leggibilità** è eccellente all'inizio; tuttavia, _può_ risentirne man mano che la dimensione e il numero dei tipi crescono.
- Implacabilmente DRY, ma a quale costo? (Ne parleremo più avanti.)
- L'esperienza dello sviluppatore può risentirne poiché i tooltip sono meno informativi.

> ⚠️ A partire (approssimativamente) da TypeScript v3, il Language Server tronca i tooltip, omettendo le proprietà annidate.
> 💡 Ci sono trucchi per migliorare le cose un po'. Prova a tenere premuto `Cmd o Ctrl`, poi passa il mouse su vari nomi di tipo - dovresti vedere almeno un 'livello' extra di proprietà nel tooltip.

Perché dobbiamo scegliere tra questi due approcci? (Tipo enorme vs. Sotto-tipi nominati.)

### Tecnica #1: Perché non tutto?

Possiamo avere tutto?

- Chiarezza dei tipi "a livello generale"?
- Più sotto-tipi nominati?
- Senza duplicazione?

> ✅ SÌ! 🎉

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

1.  Crea tipi strutturati "Primari" grandi.
2.  Esporta sottotipi derivati dal tipo Primario.

Questo approccio brilla nei sistemi in cui gli oggetti "di alto livello" beneficiano di una documentazione centralizzata.
Inoltre, questa tecnica supporta il riutilizzo tra molti casi d'uso: Modelli, Servizi, Risultati di Query, ecc.

### Tecnica #2: Mix-in

Questa strategia consiste nel mettere insieme i **campi giusti**, con i **nomi giusti**, per **rappresentare singoli oggetti logici.** L'obiettivo è affrontare efficientemente molteplici casi d'uso con Utility TypeScript e Unioni di Tipi.

Questo approccio differisce dall'ereditarietà e dalle gerarchie OOP tradizionali, che mirano a creare strati di oggetti in tassonomie strettamente legate. **L'approccio mix-in riguarda tipi piatti e debolmente correlati**, raggruppando campi correlati riducendo la duplicazione.

#### Esempi di Mix-in

```tsx
interface TodoModel {
  text: string;
  complete: boolean;
}
interface InstanceMixin {
  id: number;
}
/** TodoDraft rappresenta lo stato del Form, possibilmente tutto undefined */
export type TodoDraft = Partial<TodoModel>;
/** Todo rappresenta un record istanza Todo dal database */
export type Todo = TodoModel & InstanceMixin;
```

#### Esempio `User`

```tsx
interface User {
  id: number;
  name: string;
  bio: string;
  social: Record<"facebook" | "instagram" | "github", URL>;
}
```

Rappresentiamo l'`User` prima e dopo il salvataggio nel database.

```tsx
// Campi core di User (ad esempio per un <form>)
interface UserBase {
  name: string;
  bio: string;
  social: Record<"facebook" | "instagram" | "github", URL>;
}
// Campi dal database
interface InstanceMixin {
  id: number;
  createdAt: Date;
  updatedAt: Date;
}
// Un'**istanza** User - con tutti i campi
type UserInstance = InstanceMixin & UserBase;
```

Ora possiamo modellare i campi esatti di cui abbiamo bisogno (come `password` per creazione/aggiornamento, ma non inclusi nelle query di `UserInstance`).

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
/** Payload User per la registrazione, include il campo `password` */
export type UserPayload = UserBase & { password: string };
/** Rappresenta il tipo User restituito dal server. */
export type UserInstance = UserBase & InstanceMixin;
```

1.  "È una buona pratica?"
2.  "Dovrei provarlo?"

Nessuna idea. Andiamo avanti!

### Tecnica #3: Organizzare con i Namespace

Qui dichiariamo un namespace `ModelMixins`. Questo fornisce un po' di organizzazione e un pattern di riutilizzo più chiaro.

**Forme Standardizzate**

- `createdAt` e `updatedAt` esistono insieme.
- `id`, non `ID` o `_id`.

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

**Utilizzo delle Type Union**

```tsx
// `src/types/user.d.ts`
export interface UserBase {
  name: string;
  bio: string;
  social: Record<"facebook" | "instagram" | "github", URL>;
}
// Singolo tipo `User`, che usa una Type Union per rappresentare
//  dinamicamente gli stati pre e post creazione.
export type User =
  | (UserBase & ModelMixins.Instance & ModelMixins.HashedPassword)
  | (UserBase & ModelMixins.InputPassword);
```

Se desiderato, puoi anche esportare singoli tipi nominati:

```tsx
/** Payload User per la registrazione, incluso il campo `password` */
export type UserPayload = UserBase & ModelMixins.Instance & ModelMixins.HashedPassword;
/** Rappresenta il tipo User restituito dal server. */
export type UserInstance = UserBase & ModelMixins.InputPassword;
```

#### Utilizzo nel mondo reale

Ecco una funzione `upsert()` che usa l'operatore `in` per distinguere tra i tipi `UserInstance` e `UserPayload`.

```tsx
function upsert(user: User) {
  if ("id" in user) {
    // TypeScript sa che `user` qui ha i campi di Instance (id, createdAt, ecc.)
    return updateUser(user.id, user);
  } else {
    // TypeScript sa che questa deve essere la versione `UserBase & ModelMixins.InputPassword` di user.
    return createUser(user);
  }
}
```

### Riepilogo

Abbiamo esplorato tre tecniche e alcune idee di supporto correlate.

Potresti chiederti: sono buoni pattern? Dovrei adottare alcune di queste idee?

## Risorse

- [Suggerimenti TypeScript per progetti legacy: solo il tipo di cui hai bisogno](https://sergiocarracedo.es/typescript-tips/)
- [L'eccellente nuovo libro di Matt Pocock](https://www.totaltypescript.com/books/total-typescript-essentials)
- [Suggerimenti Total TypeScript](https://www.totaltypescript.com/tips)
````
