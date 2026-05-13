# Translation Candidate
- Slug: guerrilla-types-in-typescript
- Locale: it
- Model: openrouter/qwen/qwen3-32b:nitro
- Target: src/content/posts/2023-09-06--guerrilla-types-in-typescript/it/index.mdx
- Validation: rejected: direct AI SDK translation failed
- Runtime seconds: 44.05
- Input tokens: 8703
- Output tokens: 11243
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- Estimated cost: $0.003395
- Pricing source: local-openrouter-estimate
- Note: Command failed: git add src/content/posts/2023-09-06--guerrilla-types-in-typescript/it/index.mdx reports/i18n/guerrilla-types-in-typescript/it
## Raw Output

````mdx
---
social_image: ../desktop-social.webp
title: ''
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
## Tipi Guerrilla in TypeScript

In questo articolo, esploreremo tre tecniche intriganti (forse terribili?) per aiutare nella progettazione dei tipi!

L'obiettivo principale è **coerenza** e **prevedibilità** delle interfacce Modello/Entità/Classe.

- [Approcci per la progettazione dei tipi](#approcci-per-la-progettazione-dei-tipi)
  - [Oggetto singolo di grandi dimensioni](#oggetto-singolo-di-grandi-dimensioni)
  - [Tipi denominati multipli](#tipi-denominati-multipli)
- [Tecnica #1: Perché non tutti](#tecnica-1-perch-non-tutti)
- [Tecnica #2: Mix-in](#tecnica-2-mix-in)
  - [Esempi di Mix-in](#esempi-di-mix-in)
  - [Esempio `User`](#esempio-user)
- [Tecnica #3: Organizzazione con gli spazi dei nomi](#tecnica-3-organizzazione-con-gli-spazi-dei-nomi)
  - [Utilizzo nel mondo reale](#utilizzo-nel-mondo-reale)
- [Riepilogo](#riepilogo)

<!-- 
1.  Rappresentazione logica a livello alto dei tipi - in un modo significativo sia per gli sviluppatori che per i stakeholder aziendali.
2.  Modo duraturo per modellare combinazioni di campi logicamente correlati.
    1.  Esempio: **Istanze di oggetti** spesso includono campi comuni come `id`, `createdDate`, `createdById`, ecc.
    2.  Modellare i campi Request & Response dai modelli di database discreti. (es. `_version`, `_v`)
    3.  Utilità componibili, wrapper per la paginazione/payload, ecc: `pageNumber`, `sortBy`, `impersonateSession`, `token`, `_version`, ecc.
3.  Evitare variazioni non intenzionali nei nomi e nei tipi (`id`, `Id`, `ID`, `created_at`, `date_created`, oh no!).
4.  Comporre tipi di livello superiore utilizzando interfacce e tipi più piccoli e riutilizzabili.
5.  Utilizzare [Unions](https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes-func.html#discriminated-unions) per abbinare automaticamente varianti di un tipo. -->

### Approcci per la progettazione dei tipi

Hai probabilmente incontrato o scritto modelli diversi riguardo alle "implementazioni dei tipi". Soprattutto quando si consumano dati da API di terze parti.

**Nota:** Sto appositamente ignorando i processi "tradizionali" per creare Diagrammi delle relazioni tra entità (ERD) o gerarchie di ereditarietà della Programmazione Orientata agli Oggetti (OOP). Qui stiamo creando tipi per rappresentare dati API semi-strutturati.

Esploriamo due approcci di alto livello: **Oggetto unico grande** (Top-down) vs. **Tipi denominati multipli** (Bottom-up).

#### Oggetto unico grande

Prioritizza l'esplicità rispetto alla riutilizzabilità e alla non ripetizione del codice (DRY).

**Bonus:** L'esperienza con l'IDE è ottima, poiché gli strumenti di suggerimento includono un'anteprima più completa senza complicazioni.

```tsx
interface ProductDetails {
  name: string;
  seller: { name: string };
  availability: Array<{ warehouseId: string; quantity: number }>;
  reviews: Array<{ authorId: number; stars: number }>;
}
```

Poiché priorizziamo la leggibilità esplicita, è accettabile indulgere in _alcuna_ ripetizione (entro limiti ragionevoli). Quando gruppi di proprietà si ripetono _molte_ volte, sentiti libero di estrarre i campi ripetuti in un tipo denominato.

#### Tipi denominati multipli

Prioritizza la riutilizzabilità e la DRY-ness.

<!-- La leggibilità è una misura curiosa. Poiché la leggibilità è spesso buona o **ottima quando ci sono pochi tipi/file.** **Inevitabilmente i tipi tendono a proliferare,** aggiungendo sempre più proprietà. **La leggibilità ne soffre.** -->

Questo approccio è probabilmente l'approccio preferito con largo margine.

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

Complessivamente, questo approccio è ottimo. Ma non è privo di svantaggi.

- **Leggibilità** è ottima all'inizio; tuttavia, può peggiorare man mano che aumenta la dimensione e il numero dei tipi.
- Estremamente DRY, ma a che costo? (Ne parleremo più avanti.)
- L'esperienza dello sviluppatore può peggiorare poiché gli strumenti di suggerimento sono meno informativi.

> ⚠️ Dal (circa) TypeScript v3, il Language Server tronca gli strumenti di suggerimento, omettendo le proprietà annidate.
> 💡 Ci sono alcuni trucchi per migliorare un po'. Prova a tenere premuto `Cmd o Ctrl`, quindi passa il mouse su diversi nomi di tipo - dovresti vedere almeno un'ulteriore 'livello' di proprietà nel suggerimento.

Perché dobbiamo scegliere tra questi due approcci? (Tipo grande vs. Sottotipi denominati.)

### Tecnica #1: Perché non tutti

Possiamo averli tutti?

- Chiarezza dei tipi "panoramica"?
- Più sottotipi denominati?
- Senza duplicazione?

> ✅ SÌ! 🎉

<!-- ### Alcune cose da considerare

- Come rappresenti una relazione `uno-a-uno` come `Product` -> `Seller`?
- E le relazioni `uno-a-molti`? Prendiamo ad esempio `Reviews` o `Photos`?
- Lascia che Prisma si occupi di questo? (Non è un'idea male, ma questo articolo in segreto parla di imparare un po' di TypeScript...) -->

<!-- Questo approccio è un esercizio nel MAI duplicare i nomi dei campi del modello. Lungo il percorso, credo che il "quadro generale" diventi più evidente (in un unico punto). Iniziando dal tipo più grande e di alto livello, e derivando i tipi più semplici da esso. -->

<!-- Quando si ricevono dati strutturati in array/oggetti, molti sviluppatori TypeScript sentono l'impulso di creare tipi. Molti tipi. Alla fine si forma una cascata di livelli, composti da tipi semplici che costruiscono tipi sempre più complessi.

O forse sei tu il tipo che inizia dal tipo di alto livello, aggiungendo lo scaffolding necessario per scrivere il prossimo sottotipo nell'albero? -->

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

1.  Creare grandi "tipi strutturati Primary".
2.  Esportare sottotipi derivati dal tipo Primary.

Questo approccio si distingue particolarmente in sistemi dove gli oggetti "di alto livello" traggono vantaggio dalla documentazione in un unico luogo.
Inoltre, questa tecnica supporta il riutilizzo tra molteplici casi d'uso: Modelli, Servizi, Risultati delle Query, ecc.

### Tecnica #2: Mix-in

Questa strategia si basa sull'unire **i giusti campi**, con **i giusti nomi**, per **rappresentare singoli oggetti logici.** L'obiettivo è affrontare in modo efficiente molteplici casi d'uso utilizzando Utilities TypeScript e Unioni di Tipi.

Questo approccio differisce dall'ereditarietà e dalle gerarchie OOP tradizionali, che mirano a creare strati di oggetti in tassonomie strettamente legate. L'**approccio mix-in si basa su tipi piatti e debolmente correlati**, raggruppando campi correlati riducendo la duplicazione.

#### Esempi di Mix-in

```tsx
interface TodoModel {
  text: string;
  complete: boolean;
}
interface InstanceMixin {
  id: number;
}
/** TodoDraft rappresenta lo stato del modulo, eventualmente tutti indefiniti */
export type TodoDraft = Partial<TodoModel>;
/** Todo rappresenta un'istanza di Todo recuperata dal database */
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
// Campi base User (ad esempio per un <form>)
interface UserBase {
  name: string;
  bio: string;
  social: Record<"facebook" | "instagram" | "github", URL>;
}
// Campi provenienti dal database
interface InstanceMixin {
  id: number;
  createdAt: Date;
  updatedAt: Date;
}
// Un'istanza **User** - con tutti i campi
type UserInstance = InstanceMixin & UserBase;
```

Ora possiamo modellare esattamente i campi necessari (come `password` per creazione/aggiornamento, ma non inclusa in query su `UserInstance`).

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
/** Payload User per la registrazione, incluso il campo `password` */
export type UserPayload = UserBase & { password: string };
/** Rappresenta il tipo User restituito dal server. */
export type UserInstance = UserBase & InstanceMixin;
```

1.  "È una buona pratica?"
2.  "Dovrei provarlo?"

Non lo so. Continuiamo!

### Tecnica #3: Organizzazione con gli spazi dei nomi

Qui dichiariamo uno spazio dei nomi `ModelMixins`. Questo fornisce un po' di organizzazione e un modello di riutilizzo più chiaro.

**Forme Standardizzate**

- `createdAt` & `updatedAt` esistono insieme.
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

**Utilizzo delle Unioni di Tipi**

```tsx
// `src/types/user.d.ts`
export interface UserBase {
  name: string;
  bio: string;
  social: Record<"facebook" | "instagram" | "github", URL>;
}
// Singolo tipo `User`, utilizzando l'Unione di Tipi per rappresentare
//  dinamicamente gli stati pre- e post-creazione.
export type User =
  | (UserBase & ModelMixins.Instance & ModelMixins.HashedPassword)
  | (UserBase & ModelMixins.InputPassword);
```

Se necessario, è possibile esportare anche tipi denominati singolarmente:

```tsx
/** Payload User per la registrazione, incluso il campo `password` */
export type UserPayload = UserBase & ModelMixins.Instance & ModelMixins.HashedPassword;
/** Rappresenta il tipo User restituito dal server. */
export type UserInstance = UserBase & ModelMixins.InputPassword;
```

#### Utilizzo nel mondo reale

Ecco una funzione `upsert()` che utilizza l'operatore `in` per distinguere tra i tipi `UserInstance` e `UserPayload`.

```tsx
function upsert(user: User) {
  if ("id" in user) {
    // TypeScript sa che qui `user` ha i campi di Instance (id, createdAt, ecc.)
    return updateUser(user.id, user);
  } else {
    // TypeScript sa che qui deve trattarsi della versione `UserBase & ModelMixins.InputPassword` di user.
    return createUser(user);
  }
}
```

### Riepilogo

Abbiamo trattato tre tecniche e alcune idee correlate di supporto.

Potresti chiederti: questi sono buoni pattern? Dovresti adottare alcune di queste idee?

## Risorse

- [TypeScript tips for legacy projects: Type only you need](https://sergiocarracedo.es/typescript-tips/)
- [Matt Pocock's Excellent new book](https://www.totaltypescript.com/books/total-typescript-essentials)
- [Total TypeScript Tips](https://www.totaltypescript.com/tips)
````
