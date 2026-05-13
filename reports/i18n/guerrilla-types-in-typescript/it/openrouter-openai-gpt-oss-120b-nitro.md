# Translation Candidate
- Slug: guerrilla-types-in-typescript
- Locale: it
- Model: openrouter/openai/gpt-oss-120b:nitro
- Target: src/content/posts/2023-09-06--guerrilla-types-in-typescript/it/index.mdx
- Validation: deferred
- Runtime seconds: 3.93
- Input tokens: 10078
- Output tokens: 3231
- Thinking tokens: unknown
- Cached input tokens: 5504
- Cache write tokens: 0
- Estimated cost: $0.000975
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
social_image: ../desktop-social.webp
title: Tipi Guerrilla in TypeScript
subTitle: Design tipografico ribelle
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

In questo articolo esploreremo tre tecniche intriganti (forse terribili?) per aiutare nella progettazione dei tipi!

L’obiettivo principale è avere interfacce **coerenti** e **prevedibili** per Modelli/Entità/Classi.

- [Approcci alla Progettazione dei Tipi](#approaches-to-designing-types)
  - [Oggetto grande unico](#single-large-object)
  - [Molti tipi nominati](#multiple-named-types)
- [Tecnica #1: Perché non tutti](#technique-1-why-not-all)
- [Tecnica #2: Mix‑ins](#technique-2-mix-ins)
  - [Esempi di Mix‑in](#mix-in-examples)
  - [Esempio `User`](#example-user)
- [Tecnica #3: Organizzare con Namespace](#technique-3-organizing-with-namespaces)
  - [Uso nel mondo reale](#real-world-usage)
- [Riepilogo](#summary)

<!--
1.  Rappresentazione logica ad alto livello dei tipi – in modo significativo sia per gli sviluppatori sia per gli stakeholder di business.
2.  Metodo durevole per modellare combinazioni di campi logicamente correlati.
    1.  Esempio: **Le istanze di oggetti** includono spesso campi comuni `id`, `createdDate`, `createdById`, ecc.
    2.  Modellare i campi di Richiesta e Risposta dai tuoi modelli di database discreti. (es. `_version`, `_v`)
    3.  Utility componibili, wrapper di Paging/Payload, ecc.: `pageNumber`, `sortBy`, `impersonateSession`, `token`, `_version`, ecc.
3.  Evitare variazioni involontarie nella denominazione e tipizzazione (`id`, `Id`, `ID`, `created_at`, `date_created`, oh no!)
4.  Comporre tipi di livello superiore con più interfacce e tipi riutilizzabili più piccoli.
5.  Utilizzare le [Unioni](https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes-func.html#discriminated-unions) per 'corrispondere automaticamente' alle varianti di un tipo. -->

### Approcci alla Progettazione dei Tipi

Probabilmente hai già incontrato o scritto diversi schemi attorno alle “implementazioni di tipo”, soprattutto quando consumi dati da API di terze parti.

**Nota:** Ignoro intenzionalmente i processi “tradizionali” di costruzione di diagrammi Entity‑Relationship (ERD) o di gerarchie di ereditarietà della programmazione orientata agli oggetti (OOP). Qui stiamo creando tipi per rappresentare dati API semi‑strutturati.

Esaminiamo due approcci di alto livello: **un singolo oggetto grande** (top‑down) contro **più tipi nominati** (bottom‑up).

#### Un singolo oggetto grande

Priorità all’esplicità rispetto a riusabilità e DRY‑ness.

**Bonus:** l’esperienza IDE/Sviluppatore è eccellente, poiché i tooltip mostrano un’anteprima più completa – senza complicazioni.

```tsx
interface ProductDetails {
  name: string;
  seller: { name: string };
  availability: Array<{ warehouseId: string; quantity: number }>;
  reviews: Array<{ authorId: number; stars: number }>;
}
```

Poiché diamo priorità a una leggibilità esplicita, è accettabile indulgere in _un po'_ di ripetizione (con moderazione). Quando gruppi di proprietà si ripetono _molte_ volte, sentitevi liberi di estrarre i campi ripetuti in un tipo nominato.

#### Tipi nominati multipli

Priorità alla riusabilità e al DRY.

<!-- La leggibilità è una misura curiosa. Poiché la leggibilità è spesso buona o **eccellente quando ci sono pochi tipi/file.** **Inevitabilmente i tipi tendono a proliferare,** includendo sempre più proprietà. **La leggibilità ne risente.** -->

Questo approccio è probabilmente quello preferito di gran lunga.

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

Nel complesso, questo approccio è ottimo. Ma non è privo di svantaggi.

- **La leggibilità** è eccellente all'inizio; tuttavia, può peggiorare man mano che la dimensione e il numero dei tipi aumentano.  
- DRY in modo spietato, ma a che prezzo? (Ne parleremo più avanti.)  
- L'esperienza dello sviluppatore può risentirne perché i tooltip forniscono meno informazioni.  

> ⚠️ Da (circa) TypeScript v3, il Language Server tronca i tooltip, omettendo le proprietà annidate.  
> 💡 Esistono dei trucchi per migliorare un po' la situazione. Prova a tenere premuto `Cmd` o `Ctrl` e poi passa il mouse sopra vari nomi di tipo: dovresti vedere almeno un livello aggiuntivo di proprietà nel tooltip.  

Perché dobbiamo scegliere tra questi due approcci? (Tipo “big picture” vs. sottotipi nominati.)

### Tecnica #1: Perché non tutti

Possiamo avere tutto?

- Chiarezza dei tipi “big‑picture”?  
- Più i sottotipi nominati?  
- Senza duplicazione?

> ✅ SÌ! 🎉

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

1.  Crea tipi strutturati “Primari” di grandi dimensioni.  
2.  Esporta i sotto‑tipi derivati dal tipo Primario.

Questo approccio brilla davvero nei sistemi in cui gli oggetti “di alto livello” traggono vantaggio da una documentazione centralizzata. Inoltre, la tecnica favorisce il riuso tra molteplici casi d'uso: Modelli, Servizi, Risultati di Query, ecc.

### Tecnica #2: Mix‑ins

Questa strategia consiste nel combinare **i campi giusti**, con **i nomi giusti**, per **rappresentare oggetti logici singoli**. L’obiettivo è soddisfare efficientemente più scenari usando le Utility Types di TypeScript e le Unioni di Tipo.

Il metodo si discosta dall’eredità OOP tradizionale e dalle gerarchie, che mirano a creare strati di oggetti in tassonomie strettamente legate. L’**approccio mix‑in** riguarda tipi piatti e poco correlati, raggruppando campi affini e riducendo la duplicazione.

#### Esempi di Mix‑in

```tsx
interface TodoModel {
  text: string;
  complete: boolean;
}
interface InstanceMixin {
  id: number;
}
/** TodoDraft rappresenta lo stato del Form, possibilmente con tutti i campi undefined */
export type TodoDraft = Partial<TodoModel>;
/** Todo rappresenta un record di istanza Todo proveniente dal database */
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
// Campi core dell'utente (ad esempio per un <form>)
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
// Un'**istanza** di User - con tutti i campi
type UserInstance = InstanceMixin & UserBase;
```

Ora possiamo scolpire esattamente i campi di cui abbiamo bisogno (ad esempio `password` per create/update, ma non incluso nelle query di `UserInstance`).

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
/** Payload User per la registrazione, includendo il campo `password` */
export type UserPayload = UserBase & { password: string };
/** Rappresenta il tipo User restituito dal server. */
export type UserInstance = UserBase & InstanceMixin;
```

1.  "È una buona pratica?"
2.  "Dovrei provarla?"

Nessuna risposta definitiva. Proseguiamo!

### Tecnica #3: Organizzare con i Namespace

Qui dichiariamo uno spazio dei nomi `ModelMixins`. Questo fornisce una certa organizzazione e un modello di riuso più chiaro.

**Forme standardizzate**

- `createdAt` e `updatedAt` sono sempre presenti insieme.  
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

**Uso delle Unioni di Tipo**

```tsx
// `src/types/user.d.ts`
export interface UserBase {
  name: string;
  bio: string;
  social: Record<"facebook" | "instagram" | "github", URL>;
}
// Tipo `User` unico, usando una Unione di Tipo per rappresentare
// dinamicamente gli stati pre‑ e post‑creazione.
export type User =
  | (UserBase & ModelMixins.Instance & ModelMixins.HashedPassword)
  | (UserBase & ModelMixins.InputPassword);
```

Se lo desideri, puoi anche esportare i singoli tipi nominati:

```tsx
/** Payload dell'utente per la registrazione, includendo il campo `password` */
export type UserPayload = UserBase & ModelMixins.Instance & ModelMixins.HashedPassword;
/** Rappresenta il tipo User restituito dal server. */
export type UserInstance = UserBase & ModelMixins.InputPassword;
```

#### Uso reale


Ecco una funzione `upsert()` che utilizza l'operatore `in` per distinguere tra i tipi `UserInstance` e `UserPayload`.

```tsx
function upsert(user: User) {
  if ("id" in user) {
    // TypeScript sa che `user` qui ha i campi dell'Instance (id, createdAt, ecc.)
    return updateUser(user.id, user);
  } else {
    // TypeScript sa che questo deve essere la versione `UserBase & ModelMixins.InputPassword` dell'utente.
    return createUser(user);
  }
}
```

### Riepilogo

Abbiamo esaminato tre tecniche e alcune idee di supporto correlate.

Ti starai chiedendo se questi siano buoni pattern. Dovrei adottare alcune di queste idee?

## Risorse

- [Suggerimenti TypeScript per progetti legacy: tipa solo ciò che serve](https://sergiocarracedo.es/typescript-tips/)
- [Il nuovo eccellente libro di Matt Pocock](https://www.totaltypescript.com/books/total-typescript-essentials)
- [Suggerimenti Total TypeScript](https://www.totaltypescript.com/tips)
````
