# Translation Candidate
- Slug: guerrilla-types-in-typescript
- Locale: de
- Model: openrouter/qwen/qwen3-32b:nitro
- Target: src/content/posts/2023-09-06--guerrilla-types-in-typescript/de/index.mdx
- Validation: passed
- Runtime seconds: 23.96
- Input tokens: 9346
- Output tokens: 9620
- Thinking tokens: unknown
- Cached input tokens: 2048
- Cache write tokens: 0
- Estimated cost: $0.003056
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
social_image: ../desktop-social.webp
title: Guerilla-Typen in TypeScript
subTitle: Radikale Schriftgestaltung
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

In diesem Artikel untersuchen wir drei faszinierende (möglicherweise katastrophal?) Techniken, um bei der Typgestaltung zu helfen!

Das Hauptziel sind **konsistente** und **vorhersagbare** Model-/Entity-/Klassenschnittstellen.

- [Ansätze für die Gestaltung von Typen](#ansätze-für-die-gestaltung-von-typen)
  - [Ein großes Objekt](#ein-größes-objekt)
  - [Mehrere benannte Typen](#mehrere-benannte-typen)
- [Technik #1: Warum nicht alle](#technik-1-warum-nicht-alle)
- [Technik #2: Mix-ins](#technik-2-mix-ins)
  - [Mix-in-Beispiele](#mix-in-beispiele)
  - [Beispiel `User`](#beispiel-user)
- [Technik #3: Organisation mit Namespaces](#technik-3-organisation-mit-namespaces)
  - [Echte Anwendung](#echte-anwendung)
- [Zusammenfassung](#zusammenfassung)

<!--
1.  Hochgradige logische Repräsentation von Typen – in einer Weise, die sowohl für Entwickler als auch für Geschäftsakteure sinnvoll ist.
2.  Dauerhafte Modellierung von Kombinationen logisch verwandter Felder.
    1.  Beispiel: **Objektinstanzen** enthalten oft gemeinsame Felder wie `id`, `createdDate`, `createdById`, usw.
    2.  Modellieren Sie Anfrag- und Antwortfelder basierend auf Ihren diskreten Datenbankmodellen. (z. B. `_version`, `_v`)
    3.  Komponierbare Hilfsmittel, Seitenaufteilung/Payload-Wrapper usw.: `pageNumber`, `sortBy`, `impersonateSession`, `token`, `_version`, usw.
3.  Vermeiden Sie unbeabsichtigte Abweichungen bei der Benennung und Typisierung (`id`, `Id`, `ID`, `created_at`, `date_created`, oh weh!)
4.  Komponieren Sie höhere Typen aus mehreren kleineren, wiederverwendbaren Schnittstellen und Typen.
5.  Nutzen Sie [Unions](https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes-func.html#discriminated-unions), um 'automatisch' Varianten eines Typs abzugleichen. -->

### Ansätze für die Gestaltung von Typen

Sie haben wahrscheinlich bereits unterschiedliche Muster bei der "Typimplementierung" erlebt oder selbst geschrieben. Insbesondere wenn Sie Daten aus 3rd Party APIs verarbeiten.  

**Hinweis:** Ich ignoriere absichtlich "traditionelle" Prozesse wie die Erstellung von Entity-Relationship-Diagrammen (ERD) oder Objekt-Orientierten Programmierungs-Vererbungshierarchien (OOP). Hier bauen wir Typen, um semi-strukturierte API-Daten darzustellen.  

Lassen Sie uns zwei hochrangige Ansätze untersuchen: **Einzelnes großes Objekt** (Top-down) vs. **Mehrere benannte Typen** (Bottom-up).  

#### Einzelnes großes Objekt  

Setzt den Fokus auf Klarheit statt Wiederverwendung und DRY-Prinzip.  

**Bonus:** Die IDE/Entwicklererfahrung ist großartig, da Tooltipps eine umfassendere Vorschau bieten – ohne Umstände.

```tsx
interface ProductDetails {
  name: string;
  seller: { name: string };
  availability: Array<{ warehouseId: string; quantity: number }>;
  reviews: Array<{ authorId: number; stars: number }>;
}
```

Da wir explizite Lesbarkeit priorisieren, ist es in Ordnung, _einige_ Wiederholungen zuzulassen (solange es im Rahmen bleibt). Wenn Gruppen von Eigenschaften _häufig_ wiederholt werden, können Sie die wiederholten Felder gerne in einen benannten Typ extrahieren.

#### Mehrere benannte Typen

Wiederverwendung und DRY-Prinzip werden priorisiert.

<!-- Lesbarkeit ist eine seltsame Metrik. Da Lesbarkeit oft gut oder **exzellent ist, wenn es wenige Typen/Dateien gibt.** **Typen vermehren sich zwangsläufig**, wodurch immer mehr Eigenschaften hinzugefügt werden. **Lesbarkeit leidet.** -->

Dieser Ansatz ist vermutlich der deutlich bevorzugte.

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

Insgesamt ist dieser Ansatz großartig. Doch er hat auch Nachteile.

- **Lesbarkeit** ist zunächst ausgezeichnet; kann jedoch leiden, wenn die Größe und Anzahl der Typen zunehmen.  
- Unerbittlich DRY, aber zu welchem Preis? (Mehr dazu später.)  
- Die Entwicklererfahrung kann leiden, da Tooltips weniger informativ sind.  

> ⚠️ Seit (ungefähr) TypeScript v3 kürzt der Language Server Tooltips und lässt geschachtelte Eigenschaften weg.  
> 💡 Es gibt Tricks, um die Situation etwas zu verbessern. Halten Sie `Cmd oder Ctrl` gedrückt und fahren Sie mit dem Mauszeiger über verschiedene Typnamen – Sie sollten mindestens eine zusätzliche „Ebene“ von Eigenschaften in der Tooltip sehen.  

Warum müssen wir zwischen diesen beiden Ansätzen wählen? (Großer Typ vs. Benannte Untertypen.)  

### Technik #1: Warum nicht alles?  

Können wir beides haben?  

- Klarheit der „Gesamtsicht“-Typen?  
- Plus benannte Untertypen?  
- Ohne Duplizierung?

> ✅ JA! 🎉

<!-- ### Einige Dinge, die zu bedenken sind

- Wie stellen Sie eine `eins-zu-eins`-Beziehung wie `Product` -> `Seller` dar?
- Was bei `eins-zu-viele`-Beziehungen? Sagen wir `Reviews`, oder `Photos`?
- Lassen Sie Prisma das übernehmen? (Nicht eine schlechte Idee, aber dieser Artikel handelt geheimnisvoll über das Erlernen einiger TypeScript...) -->

<!-- Dieser Ansatz ist ein Übung im NIEMALS Duplizieren von Modell-Feldnamen. Unterwegs denke ich, dass das „Gesamtbild“ offensichtlicher wird (an einem Ort). Beginnen Sie mit dem größten, höchstrangigen Typ und leiten Sie die einfacheren Typen daraus ab. -->

<!-- Wenn man mit strukturierten Array-/Objekt-Daten konfrontiert wird, fühlen sich viele TypeScript-Entwickler dazu verpflichtet, Typen zu erstellen. Eine Menge an Typen. Schließlich bildet sich eine Kaskade von Schichten, bestehend aus einfacheren Typen, die immer komplexere Typen aufbauen.

Oder vielleicht sind Sie der Typ, der am höchstrangigen Typ beginnt, genügend Scaffold erstellt, um den nächsten Untertyp im Baum zu schreiben? -->

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

1.  Erstellen Sie große, strukturierte „Primär“-Typen.
2.  Leiten Sie Untertypen ab, die vom Primärtyp abgeleitet sind.

Dieser Ansatz eignet sich besonders gut in Systemen, in denen „hochrangige“ Objekte von zentraler Dokumentation profitieren. Zudem unterstützt diese Technik die Wiederverwendung zwischen verschiedenen Use Cases: Modelle, Dienste, Abfrageergebnisse usw.

### Technik #2: Mix-ins

Diese Strategie dreht sich darum, **die richtigen Felder** mit **den richtigen Namen** zusammenzustellen, um **einzelne logische Objekte** darzustellen. Das Ziel ist, mit TypeScript-Utilities und Type-Unions effizient mehrere Use Cases abzudecken.

Dieser Ansatz unterscheidet sich von herkömmlicher OOP-Vererbung & Hierarchien, die darauf abzielen, Objekte in eng gebundene Taxonomien zu strukturieren. Der **Mix-in-Ansatz basiert auf flachen, lose verbundenen Typen**, gruppiert verwandte Felder und reduziert dabei Duplikate.

#### Mix-in-Beispiele

```tsx
interface TodoModel {
  text: string;
  complete: boolean;
}
interface InstanceMixin {
  id: number;
}
/** TodoDraft stellt den Formularzustand dar, bei dem alle Felder möglicherweise undefiniert sind */
export type TodoDraft = Partial<TodoModel>;
/** Todo stellt einen Todo-Instanzdatensatz aus der Datenbank dar */
export type Todo = TodoModel & InstanceMixin;
```

#### Beispiel `User`

```tsx
interface User {
  id: number;
  name: string;
  bio: string;
  social: Record<"facebook" | "instagram" | "github", URL>;
}
```

Stellen wir den `User` vor und nach dem Speichern in der Datenbank dar.

```tsx
// Kern-User-Felder (z. B. für ein <form>)
interface UserBase {
  name: string;
  bio: string;
  social: Record<"facebook" | "instagram" | "github", URL>;
}
// Felder aus der Datenbank
interface InstanceMixin {
  id: number;
  createdAt: Date;
  updatedAt: Date;
}
// Ein User **Instanz** - mit allen Feldern
type UserInstance = InstanceMixin & UserBase;
```

Jetzt können wir die exakten Felder gestalten, die wir benötigen (z. B. `password` für Erstellung/Aktualisierung, aber nicht in Abfragen von `UserInstance` enthalten).

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
/** User-Payload für Registrierung, einschließlich des `password`-Felds */
export type UserPayload = UserBase & { password: string };
/** Stellt den vom Server zurückgegebenen User-Typ dar. */
export type UserInstance = UserBase & InstanceMixin;
```

1.  "Ist das eine gute Praxis?"
2.  "Sollte ich es ausprobieren?"

Keine Ahnung. Machen wir weiter!

### Technik #3: Organisation mit Namespaces

Hier deklarieren wir einen `ModelMixins`-Namespace. Dies bietet eine gewisse Organisation und ein klareres Wiederverwendungsmuster.

**Standardisierte Formen**

- `createdAt` und `updatedAt` existieren gemeinsam.
- `id`, nicht `ID` oder `_id`.

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

**Verwendung von Typ-Unionen**

```tsx
// `src/types/user.d.ts`
export interface UserBase {
  name: string;
  bio: string;
  social: Record<"facebook" | "instagram" | "github", URL>;
}
// Ein einzelner `User`-Typ, der eine Typ-Union verwendet, um
// dynamisch die Vor- und Nach-Erstellungs-Zustände darzustellen.
export type User =
  | (UserBase & ModelMixins.Instance & ModelMixins.HashedPassword)
  | (UserBase & ModelMixins.InputPassword);
```

Wenn gewünscht, können Sie auch einzelne benannte Typen exportieren:

```tsx
/** User-Payload für Registrierung, einschließlich des `password`-Felds */
export type UserPayload = UserBase & ModelMixins.Instance & ModelMixins.HashedPassword;
/** Stellt den vom Server zurückgegebenen User-Typ dar. */
export type UserInstance = UserBase & ModelMixins.InputPassword;
```

#### Real-world Usage

Hier ist eine `upsert()`-Funktion, die den `in`-Operator verwendet, um zwischen `UserInstance` und `UserPayload`-Typen zu unterscheiden.

```tsx
function upsert(user: User) {
  if ("id" in user) {
    // TypeScript weiß, dass `user` hier Felder von Instance (id, createdAt usw.) enthält
    return updateUser(user.id, user);
  } else {
    // TypeScript weiß, dass dies die Version `UserBase & ModelMixins.InputPassword` von user sein muss.
    return createUser(user);
  }
}
```

### Zusammenfassung

Wir haben drei Techniken und einige unterstützende Ideen behandelt.

Sie fragen sich vielleicht: Sind das gute Muster? Sollte ich einige dieser Ideen übernehmen?

## Ressourcen

- [TypeScript-Tipps für Legacy-Projekte: Nur die benötigten Typen verwenden](https://sergiocarracedo.es/typescript-tips/)
- [Hervorragendes neues Buch von Matt Pocock](https://www.totaltypescript.com/books/total-typescript-essentials)
- [Total TypeScript Tipps](https://www.totaltypescript.com/tips)
````
