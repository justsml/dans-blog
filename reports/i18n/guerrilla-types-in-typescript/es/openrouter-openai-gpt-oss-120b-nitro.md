# Translation Candidate
- Slug: guerrilla-types-in-typescript
- Locale: es
- Model: openrouter/openai/gpt-oss-120b:nitro
- Target: src/content/posts/2023-09-06--guerrilla-types-in-typescript/es/index.mdx
- Validation: passed
- Runtime seconds: 20.13
- Input tokens: 9801
- Output tokens: 3140
- Thinking tokens: unknown
- Cached input tokens: 1152
- Cache write tokens: 0
- Estimated cost: $0.000947
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
social_image: ../desktop-social.webp
title: Tipos guerrilla en TypeScript
subTitle: Diseño tipográfico rebelde
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
## Guerrilla Types en TypeScript

En este artículo exploraremos tres técnicas intrigantes (¿posiblemente terribles?) para ayudar en el diseño de tipos.

El objetivo principal es **consistente** y **predecible** en las interfaces de Modelo/Entidad/Clase.

- [Enfoques para diseñar tipos](#approaches-to-designing-types)
  - [Objeto grande único](#single-large-object)
  - [Múltiples tipos nombrados](#multiple-named-types)
- [Técnica #1: ¿Por qué no todos?](#technique-1-why-not-all)
- [Técnica #2: Mix-ins](#technique-2-mix-ins)
  - [Ejemplos de mix-in](#mix-in-examples)
  - [Ejemplo `User`](#example-user)
- [Técnica #3: Organización con namespaces](#technique-3-organizing-with-namespaces)
  - [Uso en el mundo real](#real-world-usage)
- [Resumen](#summary)

<!--
1.  Representación lógica de alto nivel de los tipos, de forma que tenga sentido tanto para desarrolladores como para interesados del negocio.
2.  Forma durable de modelar combinaciones de campos lógicamente relacionados.
    1.  Ejemplo: **Instancias de objetos** suelen incluir campos comunes `id`, `createdDate`, `createdById`, etc.
    2.  Modelar campos de solicitud y respuesta a partir de tus modelos de base de datos discretos. (p. ej., `_version`, `_v`)
    3.  Utilidades composables, wrapper de paginación/carga, etc.: `pageNumber`, `sortBy`, `impersonateSession`, `token`, `_version`, etc.
3.  Evitar variaciones no deseadas en nombres y tipado (`id`, `Id`, `ID`, `created_at`, `date_created`, ¡oh no!).
4.  Componer tipos de nivel superior con múltiples interfaces y tipos reutilizables más pequeños.
5.  Utilizar [Uniones](https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes-func.html#discriminated-unions) para 'automáticamente' coincidir variantes de un tipo. -->

### Enfoques para diseñar tipos

Probablemente hayas encontrado o escrito distintos patrones alrededor de “implementaciones de tipos”, sobre todo al consumir datos de APIs de terceros.

**Nota:** Ignoro intencionalmente los procesos “tradicionales” de construir diagramas de entidad‑relación (ERD) o jerarquías de herencia de programación orientada a objetos (OOP). Aquí, estamos creando tipos para representar datos de API semiestructurados.

Exploremos dos enfoques de alto nivel: **Objeto grande único** (de arriba hacia abajo) vs. **Múltiples tipos nombrados** (de abajo hacia arriba).

#### Objeto grande único

Prioriza ser explícito sobre la reutilización y el DRY.

**Bonus:** La experiencia en el IDE/Desarrollo es excelente, ya que los tooltips incluyen una vista previa más completa, sin complicaciones.

```tsx
interface ProductDetails {
  name: string;
  seller: { name: string };
  availability: Array<{ warehouseId: string; quantity: number }>;
  reviews: Array<{ authorId: number; stars: number }>;
}
```

Como estamos priorizando la legibilidad explícita, está bien permitir algo de _repetición_ (dentro de lo razonable). Cuando los grupos de propiedades se repiten _muchas_ veces, siéntete libre de extraer los campos repetidos a un tipo con nombre.

#### Múltiples tipos nombrados

Prioriza la reutilización y el DRY.

<!-- Readability is a funny measure. Since Readability is often good or **great when there are few types/files.** **Inevitably types tend to proliferate,** featuring ever more properties. **Readability suffers.** -->

Este enfoque es probablemente el preferido por un amplio margen.

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

En general, este enfoque es excelente. Pero no está exento de inconvenientes.

- **La legibilidad** es excelente al principio; sin embargo, puede deteriorarse a medida que aumenta el tamaño y la cantidad de tipos.  
- Relentemente DRY, pero ¿a qué precio? (Más sobre esto más adelante.)  
- La experiencia del desarrollador puede resentirse porque los tooltips son menos informativos.  

> ⚠️ Desde (aproximadamente) TypeScript v3, el Language Server trunca los tooltips, omitiendo propiedades anidadas.  
> 💡 Hay trucos para mejorar un poco las cosas. Mantén presionado `Cmd` o `Ctrl` y pasa el cursor sobre varios nombres de tipo; deberías ver al menos una capa extra de propiedades en el tooltip.  

¿Por qué tenemos que elegir entre estos dos enfoques? (Tipo grande vs. Sub‑tipos nombrados.)  

### Técnica #1: ¿Por qué no todo?  

¿Podemos tenerlo todo?  

- ¿Claridad de los tipos de “gran panorama”?  
- ¿Más sub‑tipos nombrados?  
- ¿Sin duplicación?

> ✅ ¡SÍ! 🎉

<!-- ### Algunas cosas a considerar

- ¿Cómo representas una relación `uno a uno` como `Product` → `Seller`?
- ¿Qué pasa con relaciones `uno a muchos`? Por ejemplo `Reviews` o `Photos`?
- ¿Dejar que Prisma lo maneje? (No es una mala idea, pero este artículo trata secretamente de aprender un poco de TypeScript…) -->

<!-- Este enfoque es un ejercicio para NUNCA duplicar los nombres de los campos del Modelo. En el proceso, creo que la “gran visión” se vuelve más evidente (en un solo lugar), comenzando con el tipo más grande y de más alto nivel, y derivando los tipos más simples a partir de él. -->

<!-- Cuando se dispone de datos estructurados en forma de array/objeto, muchos programadores de TypeScript sienten la necesidad de crear tipos. Montones de tipos. Eventualmente se forma una cascada de capas, compuesta por tipos más simples que construyen tipos cada vez más complejos.

¿O tal vez eres del tipo que empieza por el tipo de nivel más alto, preparando lo suficiente para escribir el siguiente subtipo en el árbol? -->

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

1.  Crear tipos estructurados “Primarios” grandes.  
2.  Exportar sub‑tipos derivados del tipo Primario.

Este enfoque realmente brilla en sistemas donde los objetos “de alto nivel” se benefician de una documentación centralizada.  
Además, la técnica permite reutilizar los tipos en numerosos casos de uso: modelos, servicios, resultados de consultas, etc.

### Técnica #2: Mix‑ins

Esta estrategia se trata de combinar los **campos correctos**, con los **nombres correctos**, para **representar objetos lógicos únicos**. El objetivo es atender eficientemente múltiples casos de uso usando utilidades y uniones de tipos de TypeScript.

Este enfoque difiere de la herencia tradicional de OOP y de jerarquías, que buscan crear capas de objetos dentro de taxonomías fuertemente vinculadas. El **enfoque mix‑in se basa en tipos planos y poco relacionados**, agrupando campos relacionados mientras se reduce la duplicación.

#### Ejemplos de Mix‑ins

```tsx
interface TodoModel {
  text: string;
  complete: boolean;
}
interface InstanceMixin {
  id: number;
}
/** TodoDraft representa el estado del formulario, posiblemente con todo indefinido */
export type TodoDraft = Partial<TodoModel>;
/** Todo representa un registro de instancia de Todo proveniente de la base de datos */
export type Todo = TodoModel & InstanceMixin;
```

#### Ejemplo `User`

```tsx
interface User {
  id: number;
  name: string;
  bio: string;
  social: Record<"facebook" | "instagram" | "github", URL>;
}
```

Representemos el `User` antes y después de guardarlo en la base de datos.

```tsx
// Campos principales del usuario (por ejemplo para un <form>)
interface UserBase {
  name: string;
  bio: string;
  social: Record<"facebook" | "instagram" | "github", URL>;
}
// Campos provenientes de la base de datos
interface InstanceMixin {
  id: number;
  createdAt: Date;
  updatedAt: Date;
}
// Una **instancia** de User - con todos los campos
type UserInstance = InstanceMixin & UserBase;
```

Ahora podemos esculpir exactamente los campos que necesitamos (como `password` para crear/actualizar, pero sin incluirlo en consultas de `UserInstance`).

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
/** Payload de User para registro, incluye el campo `password` */
export type UserPayload = UserBase & { password: string };
/** Representa el tipo User devuelto por el servidor. */
export type UserInstance = UserBase & InstanceMixin;
```

1.  "¿Es una buena práctica?"
2.  "¿Debería probarlo?"

Sin idea. ¡Sigamos!

### Técnica #3: Organización con Namespaces

Aquí declaramos un espacio de nombres `ModelMixins`. Esto aporta algo de organización y un patrón de reutilización más claro.

**Formas estandarizadas**

- `createdAt` y `updatedAt` siempre aparecen juntos.  
- `id`, no `ID` ni `_id`.

```tsx
// `../src/types/mixins.d.ts`
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

**Uso de uniones de tipos**

```tsx
// `../src/types/user.d.ts`
export interface UserBase {
  name: string;
  bio: string;
  social: Record<"facebook" | "instagram" | "github", URL>;
}
// Tipo único `User`, usando unión de tipos para representar
// dinámicamente los estados antes y después de la creación.
export type User =
  | (UserBase & ModelMixins.Instance & ModelMixins.HashedPassword)
  | (UserBase & ModelMixins.InputPassword);
```

Si lo prefieres, también puedes exportar tipos nombrados individuales:

```tsx
/** Payload de usuario para registro, incluye el campo `password` */
export type UserPayload = UserBase & ModelMixins.Instance & ModelMixins.HashedPassword;
/** Representa el tipo User devuelto por el servidor. */
export type UserInstance = UserBase & ModelMixins.InputPassword;
```

#### Uso en el mundo real

Aquí tienes una función `upsert()` que usa el operador `in` para distinguir entre los tipos `UserInstance` y `UserPayload`.

```tsx
function upsert(user: User) {
  if ("id" in user) {
    // TypeScript sabe que `user` aquí tiene los campos de Instance (id, createdAt, etc.)
    return updateUser(user.id, user);
  } else {
    // TypeScript sabe que esto debe ser la versión `UserBase & ModelMixins.InputPassword` del usuario.
    return createUser(user);
  }
}
```

### Resumen

Cubimos tres técnicas y algunas ideas de apoyo relacionadas.

Quizás te estés preguntando, ¿son buenos estos patrones? ¿Debería adoptar alguna de estas ideas?

## Recursos

- [TypeScript tips for legacy projects: Type only you need](https://sergiocarracedo.es/typescript-tips/)
- [Matt Pocock's Excellent new book](https://www.totaltypescript.com/books/total-typescript-essentials)
- [Total TypeScript Tips](https://www.totaltypescript.com/tips)
````
