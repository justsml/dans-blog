# Translation Candidate
- Slug: guerrilla-types-in-typescript
- Locale: it
- Model: openrouter/qwen/qwen3-32b:nitro
- Target: src/content/posts/2023-09-06--guerrilla-types-in-typescript/it/index.mdx
- Validation: deferred
- Runtime seconds: 21.58
- Input tokens: 7506
- Output tokens: 9738
- Thinking tokens: unknown
- Cached input tokens: 512
- Cache write tokens: 0
- Estimated cost: $0.002938
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
social_image: ../desktop-social.webp
title: Tipi di guerriglia in TypeScript
subTitle: Design dei caratteri ribelli
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

In questo articolo, esploreremo tre tecniche interessanti (forse terribili?) per aiutare nella progettazione dei tipi!

L'obiettivo principale è ottenere interfacce Model/Entity/Class **consistenti** e **prevedibili**.

- [Approcci per la Progettazione dei Tipi](#approcci-per-la-progettazione-dei-tipi)
  - [Singolo oggetto grande](#singolo-oggetto-grande)
  - [Tipi denominati multipli](#tipi-denominati-multipli)
- [Tecnica #1: Perché non tutti](#tecnica-1-perch-Non-tutti)
- [Tecnica #2: Mix-in](#tecnica-2-mix-in)
  - [Esempi di Mix-in](#esempi-di-mix-in)
  - [Esempio `User`](#esempio-user)
- [Tecnica #3: Organizzazione con Namespaces](#tecnica-3-organizzazione-con-namespaces)
  - [Utilizzo reale](#utilizzo-reale)
- [Riepilogo](#riepilogo)

<!--
1.  Rappresentazione logica di alto livello dei tipi - in un modo significativo sia per sviluppatori che stakeholder aziendali.
2.  Modo duraturo per modellare combinazioni di campi logicamente correlati.
    1.  Esempio: **Istanze di oggetti** spesso includono campi comuni `id`, `createdDate`, `createdById`, ecc.
    2.  Modella i campi Request & Response in base ai tuoi modelli di database discreti. (es. `_version`, `_v`)
    3.  Utilità componibili, wrapper di Paginazione/Payload, ecc: `pageNumber`, `sortBy`, `impersonateSession`, `token`, `_version`, ecc.
3.  Evita variazioni non intenzionali nei nomi e nei tipi (`id`, `Id`, `ID`, `created_at`, `date_created`, oh no!)
4.  Componi tipi di livello superiore con interfacce e tipi riutilizzabili più piccoli.
5.  Utilizza le [Unioni](https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes-func.html#discriminated-unions) per 'automaticamente' abbinare varianti di un tipo. -->

### Approcci per la Progettazione dei Tipi

Hai probabilmente incontrato o scritto modelli diversi intorno alle "implementazioni dei tipi". Soprattutto quando si consumano dati da API di terze parti.

**Nota:** Sto ignorando appositamente i processi "tradizionali" per costruire Diagrammi delle Relazioni Entità (ERD) o gerarchie di ereditarietà Object Oriented Programming (OOP). Qui stiamo creando tipi per rappresentare dati API semi-strutturati.

Esaminiamo due approcci di alto livello: **Singolo oggetto grande** (Top-down) vs. **Tipi denominati multipli** (Bottom-up).

#### Singolo oggetto grande

Prioritizza l'esplicito rispetto alla riutilizzabilità e alla DRY-ness.

**Bonus:** L'esperienza con l'IDE è ottima, poiché le descrizioni includono un'anteprima più completa - senza complicazioni.

```tsx
interface ProductDetails {
  name: string;
  seller: { name: string };
  availability: Array<{ warehouseId: string; quantity: number }>;
  reviews: Array<{ authorId: number; stars: number }>;
}
```

Poiché stiamo priorizzando la leggibilità esplicita, è accettabile indulgere in _alcuna_ ripetizione (entro limiti ragionevoli). Quando gruppi di proprietà si ripetono _molte_ volte, sentiti libero di estrarre i campi ripetuti in un tipo denominato.

#### Tipi denominati multipli

Prioritizza la riutilizzabilità e la DRY-ness.

<!-- La leggibilità è una misura curiosa. Poiché la leggibilità è spesso buona o **eccellente quando ci sono pochi tipi/file.** **Inevitabilmente i tipi tendono a proliferare,** aggiungendo sempre più proprietà. **La leggibilità ne soffre.** -->

Questo approccio è probabilmente l'approccio preferito da gran parte.

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

In generale, questo approccio è ottimo. Tuttavia, non è privo di svantaggi.

- **Leggibilità** è eccellente all'inizio; tuttavia, può soffrire man mano che aumenta la dimensione e il numero dei tipi.
- Estremamente DRY, ma a che costo? (Ne parleremo più avanti.)
- L'esperienza dello sviluppatore può soffrire poiché le descrizioni sono meno informative.

> ⚠️ Dal momento che (approssimativamente) TypeScript v3, il Language Server tronca le descrizioni, omettendo le proprietà annidate.
> 💡 Ci sono trucchi per migliorare un po'. Prova a tenere premuto `Cmd o Ctrl`, quindi passa il mouse sui vari nomi dei tipi - dovresti vedere almeno un'ulteriore 'livello' di proprietà nella descrizione.

Perché dobbiamo scegliere tra questi due approcci? (Tipo grande vs. Sottotipi denominati)

### Tecnica #1: Perché non tutti

Possiamo avere entrambi?

- Chiarezza dei tipi "panoramica"?
- Più sottotipi denominati?
- Senza duplicazione?

> ✅ SÌ! 🎉

<!-- ### Alcune considerazioni

- Come rappresenti una relazione `uno-a-uno` come `Product` -> `Seller`?
- E le relazioni `uno-a-molti`? Ad esempio `Reviews`, o `Photos`?
- Lascia che Prisma lo gestisca? (Non è un brutto idea, ma questo articolo parla in realtà di imparare un po' di TypeScript...) -->

<!-- Questo approccio è un esercizio nel NON duplicare mai i nomi dei campi del Model. Lungo il percorso, credo che il "quadro generale" diventi più evidente (in un unico punto). Inizia con il tipo più grande e di alto livello, e deriva i tipi più semplici da esso. -->

<!-- Quando vengono forniti con dati strutturati in array/oggetti, molti sviluppatori TypeScript sentono l'impulso di creare tipi. Molti tipi. Alla fine si forma una cascata di strati, costituiti da tipi semplici che costruiscono tipi sempre più complessi.

Oppure forse sei tu il tipo che inizia dal tipo di alto livello, creando abbastanza scaffolding per scrivere il prossimo sottotipo nell'albero? -->

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

1. Creare tipi strutturati di grandi dimensioni ("Primary").
2. Esportare sottotipi derivati dal tipo "Primary".

Questo approccio si distingue particolarmente nei sistemi in cui gli oggetti "di alto livello" beneficiano di documentazione centralizzata. Inoltre, questa tecnica supporta il riutilizzo tra molti casi d'uso: Modelli, Servizi, Risultati delle Query, ecc.

### Tecnica #2: Mix-in

Questa strategia si basa sull'unire i **campi corretti**, con i **nomi corretti**, per **rappresentare singoli oggetti logici**. L'obiettivo è affrontare in modo efficiente diversi casi d'uso utilizzando Utilities di TypeScript e Unioni di Tipi.

Questo approccio differisce dall'ereditarietà e gerarchie tradizionali di OOP, che mirano a creare strati di oggetti in tassonomie strettamente legate. L'**approccio con mix-in si basa su tipi piatti e debolmente correlati**, raggruppando campi correlati mentre si riduce la duplicazione.

#### Esempi di Mix-in

```tsx
interface TodoModel {
  text: string;
  complete: boolean;
}
interface InstanceMixin {
  id: number;
}
/** TodoDraft rappresenta lo stato del Form, eventualmente tutti indefiniti */
export type TodoDraft = Partial<TodoModel>;
/** Todo rappresenta un record di istanza di Todo dal database */
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

Rappresentiamo l'utente prima e dopo il salvataggio nel database.

```tsx
// Campi base dell'utente (ad esempio per un <form>)
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
// Un'istanza di Utente - con tutti i campi
type UserInstance = InstanceMixin & UserBase;
```

Ora possiamo modellare esattamente i campi di cui abbiamo bisogno (come `password` per la creazione/aggiornamento, ma non inclusi nelle query di `UserInstance`).

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
/** Tipo payload utente per la registrazione, incluso il campo `password` */
export type UserPayload = UserBase & { password: string };
/** Rappresenta il tipo Utente restituito dal server. */
export type UserInstance = UserBase & InstanceMixin;
```

1. "È una buona pratica?"
2. "Dovrei provarla?"

Non lo so. Continuiamo!  

### Tecnica #3: Organizzazione con Namespaces  

Qui dichiariamo uno spazio dei nomi `ModelMixins`. Questo fornisce un'organizzazione più chiara e un modello di riutilizzo esplicito.  

**Forme Standardizzate**  

- `createdAt` e `updatedAt` esistono insieme.  
- `id`, non `ID` né `_id`.  

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

**Utilizzo di Unioni di Tipi**  

```tsx
// `src/types/user.d.ts`
export interface UserBase {
  name: string;
  bio: string;
  social: Record<"facebook" | "instagram" | "github", URL>;
}
// Singolo tipo `User`, che utilizza l'unione di tipi per rappresentare
// dinamicamente gli stati pre- e post-creazione.
export type User =
  | (UserBase & ModelMixins.Instance & ModelMixins.HashedPassword)
  | (UserBase & ModelMixins.InputPassword);
```

Se necessario, è possibile esportare anche tipi denominati singolarmente:  

```tsx
/** Payload utente per la registrazione, incluso il campo `password` */
export type UserPayload = UserBase & ModelMixins.Instance & ModelMixins.HashedPassword;
/** Rappresenta il tipo Utente restituito dal server. */
export type UserInstance = UserBase & ModelMixins.InputPassword;
```

#### Utilizzo nel mondo reale  

Ecco una funzione `upsert()` che utilizza l'operatore `in` per distinguere tra i tipi `UserInstance` e `UserPayload`.  

```tsx
function upsert(user: User) {
  if ("id" in user) {
    // TypeScript sa che qui `user` include i campi di Instance (id, createdAt, ecc.)
    return updateUser(user.id, user);
  } else {
    // TypeScript sa che qui deve trattarsi della versione `UserBase & ModelMixins.InputPassword` di user.
    return createUser(user);
  }
}
```

### Riepilogo

Abbiamo trattato tre tecniche e alcune idee di supporto correlate.  

Ti starai chiedendo: queste sono buone pratiche? Dovresti adottarne alcune?  

## Risorse  

- [Consigli TypeScript per progetti legacy: Usa solo i tipi che ti servono](https://sergiocarracedo.es/typescript-tips/)  
- [Un eccellente nuovo libro di Matt Pocock](https://www.totaltypescript.com/books/total-typescript-essentials)  
- [Consigli completi su TypeScript](https://www.totaltypescript.com/tips)
````
