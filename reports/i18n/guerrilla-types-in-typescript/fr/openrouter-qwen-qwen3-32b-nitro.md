# Translation Candidate
- Slug: guerrilla-types-in-typescript
- Locale: fr
- Model: openrouter/qwen/qwen3-32b:nitro
- Target: src/content/posts/2023-09-06--guerrilla-types-in-typescript/fr/index.mdx
- Validation: passed
- Runtime seconds: 21.81
- Input tokens: 9423
- Output tokens: 9348
- Thinking tokens: unknown
- Cached input tokens: 2048
- Cache write tokens: 0
- Estimated cost: $0.002997
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
social_image: ../desktop-social.webp
title: Types de guérilla dans TypeScript
subTitle: Design de police rebelle
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
## Types de guérilla en TypeScript

Dans cet article, nous explorerons trois techniques (intéressantes, voire désastreuses ?) pour aider à la conception de types !

L'objectif principal est d'obtenir des interfaces de modèle/entité/classe **cohérentes** et **prévisibles**.

- [Approches pour la conception des types](#approches-pour-la-conception-des-types)
  - [Objet unique de grande taille](#objet-unique-de-grande-taille)
  - [Types nommés multiples](#types-nommés-multiples)
- [Technique #1 : Pourquoi pas tout ?](#technique-1-pourquoi-pas-tout)
- [Technique #2 : Mix-ins](#technique-2-mix-ins)
  - [Exemples de mix-in](#exemples-de-mix-in)
  - [Exemple `User`](#exemple-user)
- [Technique #3 : Organisation avec des espaces de noms](#technique-3-organisation-avec-des-espaces-de-noms)
  - [Utilisation concrète](#utilisation-concrète)
- [Résumé](#résumé)

<!--
1.  Représentation logique de haut niveau des types - de manière pertinente à la fois pour les développeurs et les parties prenantes métier.
2.  Modélisation durable de combinaisons de champs logiquement liés.
    1.  Exemple : les **instances d'objet** contiennent souvent des champs communs `id`, `createdDate`, `createdById`, etc.
    2.  Modéliser les champs de requête et de réponse à partir de vos modèles de base de données discrets. (ex. `_version`, `_v`)
    3.  Utilitaires composites, enveloppe de pagination/charge utile, etc. : `pageNumber`, `sortBy`, `impersonateSession`, `token`, `_version`, etc.
3.  Éviter les variations non intentionnelles dans les noms et les types (`id`, `Id`, `ID`, `created_at`, `date_created`, oh non !)
4.  Composer des types de haut niveau à partir d'interfaces et de types plus petits réutilisables.
5.  Utiliser les [Unions](https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes-func.html#discriminated-unions) pour 'automatiquement' faire correspondre les variantes d'un type. -->

### Approches pour la conception des types

Vous avez probablement rencontré ou rédigé divers modèles concernant les « implémentations de types ». Surtout lorsqu'il s'agit de consommer des données provenant d'API tierces.

**Remarque** : Je mets délibérément de côté les processus « traditionnels » comme la création de diagrammes Entité-Relation (ERD) ou les hiérarchies d'héritage orienté objet (OOP). Ici, nous créons des types pour représenter des données d'API semi-structurées.

Explorons deux approches de haut niveau : **Objet unique et volumineux** (Top-down) vs. **Types nommés multiples** (Bottom-up).

#### Objet unique et volumineux

Privilégie l'explicitisme par rapport à la réutilisabilité et à l'absence de redondance (DRY).

**Avantage** : L'expérience IDE/éditeur est excellente, car les infobulles affichent un aperçu plus complet – sans complication.

```tsx
interface ProductDetails {
  name: string;
  seller: { name: string };
  availability: Array<{ warehouseId: string; quantity: number }>;
  reviews: Array<{ authorId: number; stars: number }>;
}
```

Puisque nous privilégions l'explicitisme, il est acceptable d'accepter _une certaine_ répétition (dans des limites raisonnables). Quand des groupes de propriétés se répètent _fréquemment_, n'hésitez pas à extraire ces champs répétés vers un type nommé.

#### Types nommés multiples

Privilégie la réutilisabilité et l'absence de répétition.

<!-- La lisibilité est une mesure curieuse. La lisibilité est souvent bonne ou **excellente quand il y a peu de types/fichiers.** **Les types ont inévitablement tendance à se multiplier,** avec de plus en plus de propriétés. **La lisibilité souffre.** -->

Cette approche est probablement la plus adoptée.

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

Dans l'ensemble, cette approche est excellente. Mais elle n'est pas sans inconvénients.

- **Lisibilité** excellente au départ ; cependant, elle _peut_ se dégrader à mesure que la taille et le nombre de types augmentent.  
- Extrêmement DRY, mais au prix de quel coût ? (Plus de détails plus loin.)  
- L'expérience développeur peut souffrir car les infobulles sont moins informatives.  

> ⚠️ Depuis (environ) la version 3 de TypeScript, le Serveur de langage tronque les infobulles, omettant les propriétés imbriquées.  
> 💡 Il existe des astuces pour améliorer un peu les choses. Essayez de maintenir appuyé sur `Cmd ou Ctrl`, puis de passer le curseur sur différents noms de types – vous devriez voir au moins une couche supplémentaire de propriétés dans l'infobulle.  

Pourquoi devons-nous choisir entre ces deux approches ? (Grand type vs. sous-types nommés.)  

### Technique #1 : Pourquoi pas tout ?  

Pouvons-nous tout avoir ?  

- Clarté des types « à vue d'ensemble » ?  
- Plus de sous-types nommés ?  
- Sans duplication ?

> ✅ OUI ! 🎉

<!-- ### Quelques points à considérer

- Comment représentez-vous une relation `one-to-one` comme `Product` -> `Seller` ?
- Et les relations `one-to-many` ? Par exemple `Reviews`, ou `Photos` ?
- Laissez-vous Prisma s'en charger ? (Ce n'est pas une mauvaise idée, mais cet article vise secrètement à apprendre un peu de TypeScript...) -->

<!-- Cette approche est un exercice de JAMAIS dupliquer les noms de champs des modèles. En chemin, je pense que le « grand tableau » devient plus évident (en un seul endroit). En commençant par le type le plus vaste, le plus haut niveau, puis en dérivant les types plus simples à partir de celui-ci. -->

<!-- Lorsqu'on est confronté à un tableau ou un objet structuré, de nombreux développeurs TypeScript ressentent le besoin de créer des types. Beaucoup de types. Finalement, une cascade de couches se forme, composée de types simples construisant des types de plus en plus complexes.

Ou peut-être êtes-vous du genre à commencer par le type de plus haut niveau, à établir un squelette suffisant pour écrire le sous-type suivant dans l'arbre ? -->

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

1. Créer des types structurés « principaux » de grande taille.
2. Exporter des sous-types dérivés du type principal.

Cette approche se révèle particulièrement efficace dans les systèmes où les objets « haut niveau » bénéficient d'une documentation centralisée. De plus, cette technique favorise la réutilisation entre de nombreux cas d'utilisation : Modèles, Services, Résultats de requêtes, etc.

### Technique #2 : Mix-ins

Cette stratégie consiste à regrouper **les bons champs**, avec **les bons noms**, pour **représenter des objets logiques uniques**. L'objectif est d'aborder efficacement plusieurs cas d'utilisation en utilisant les utilitaires TypeScript et les unions de types.

Cette approche diffère de l'héritage et des hiérarchies traditionnels de l'OOA, qui visent à créer des couches d'objets organisées en taxonomies étroitement liées. **L'approche mix-in repose sur des types plats et faiblement liés**, regroupant des champs associés tout en réduisant les redondances.

#### Exemples de mix-in

```tsx
interface TodoModel {
  text: string;
  complete: boolean;
}
interface InstanceMixin {
  id: number;
}
/** TodoDraft représente l'état du formulaire, tous les champs pouvant être indéfinis */
export type TodoDraft = Partial<TodoModel>;
/** Todo représente un enregistrement d'instance Todo depuis la base de données */
export type Todo = TodoModel & InstanceMixin;
```

#### Exemple `User`

```tsx
interface User {
  id: number;
  name: string;
  bio: string;
  social: Record<"facebook" | "instagram" | "github", URL>;
}
```

Représentons l'`User` avant et après l'enregistrement dans la base de données.

```tsx
// Champs de base de l'utilisateur (par exemple pour un <form>)
interface UserBase {
  name: string;
  bio: string;
  social: Record<"facebook" | "instagram" | "github", URL>;
}
// Champs provenant de la base de données
interface InstanceMixin {
  id: number;
  createdAt: Date;
  updatedAt: Date;
}
// Un **instance** User - avec tous les champs
type UserInstance = InstanceMixin & UserBase;
```

Maintenant, nous pouvons définir précisément les champs requis (comme `password` pour la création/mise à jour, mais non inclus dans les requêtes de `UserInstance`).

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
/** Type de données utilisateur pour l'inscription, incluant le champ `password` */
export type UserPayload = UserBase & { password: string };
/** Représente le type User renvoyé par le serveur. */
export type UserInstance = UserBase & InstanceMixin;
```

1.  "Est-ce une bonne pratique ?"
2.  "Devrais-je l'essayer ?"

Aucune idée. Continuons !

### Technique #3 : Organisation avec les espaces de noms

Ici, nous déclarons un espace de noms `ModelMixins`. Cela apporte une certaine organisation ainsi qu'un schéma de réutilisation plus clair.

**Formes standardisées**

- `createdAt` et `updatedAt` existent ensemble.
- `id`, et non `ID` ou `_id`.

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

**Utilisation de l'Union de types**

```tsx
// `src/types/user.d.ts`
export interface UserBase {
  name: string;
  bio: string;
  social: Record<"facebook" | "instagram" | "github", URL>;
}
// Type unique `User`, utilisant l'Union de types pour représenter
// dynamiquement les états avant et après création.
export type User =
  | (UserBase & ModelMixins.Instance & ModelMixins.HashedPassword)
  | (UserBase & ModelMixins.InputPassword);
```

Si souhaité, vous pouvez également exporter des types nommés individuellement :

```tsx
/** Données utilisateur pour l'inscription, incluant le champ `password` */
export type UserPayload = UserBase & ModelMixins.Instance & ModelMixins.HashedPassword;
/** Représente le type User renvoyé par le serveur. */
export type UserInstance = UserBase & ModelMixins.InputPassword;
```

#### Utilisation dans le monde réel

Voici une fonction `upsert()` qui utilise l'opérateur `in` pour distinguer les types `UserInstance` et `UserPayload`.

```tsx
function upsert(user: User) {
  if ("id" in user) {
    // TypeScript sait que `user` ici possède les champs de Instance (id, createdAt, etc)
    return updateUser(user.id, user);
  } else {
    // TypeScript sait que cette version de user est `UserBase & ModelMixins.InputPassword`
    return createUser(user);
  }
}
```

### Résumé

Nous avons couvert trois techniques et quelques idées connexes.

Vous vous demandez peut-être, s'agit-il de bonnes pratiques ? Devriez-vous adopter certaines de ces idées ?

## Ressources

- [Conseils TypeScript pour les projets hérités : N'utilisez que les types dont vous avez besoin](https://sergiocarracedo.es/typescript-tips/)
- [L'excellente nouvelle livre de Matt Pocock](https://www.totaltypescript.com/books/total-typescript-essentials)
- [Conseils Total TypeScript](https://www.totaltypescript.com/tips)
````
