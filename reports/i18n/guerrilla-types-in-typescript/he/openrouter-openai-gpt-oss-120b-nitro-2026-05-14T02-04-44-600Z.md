# Translation Candidate
- Slug: guerrilla-types-in-typescript
- Locale: he
- Model: openrouter/openai/gpt-oss-120b:nitro
- Target: src/content/posts/2023-09-06--guerrilla-types-in-typescript/he/index.mdx
- Validation: deferred
- Runtime seconds: 9.93
- Input tokens: 8588
- Output tokens: 3390
- Thinking tokens: unknown
- Cached input tokens: 2048
- Cache write tokens: 0
- Estimated cost: $0.000945
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
social_image: ../desktop-social.webp
title: סוגי גרילה ב‑TypeScript
subTitle: עיצוב טיפוגרפיה מרדנית
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
## סוגי גרילה ב‑TypeScript

במאמר הזה נחקור שלוש טכניקות מעניינות (אולי נוראות?) שיעזרו בתכנון טיפוסים!

המטרה העיקרית היא ממשקים של **מודל/ישות/מחלקה** שהם **עקביים** ו‑**צפויים**.

- [גישות לתכנון טיפוסים](#approaches-to-designing-types)
  - [אובייקט גדול יחיד](#single-large-object)
  - [מספר טיפוסים בשם](#multiple-named-types)
- [טכניקה #1: למה לא את כולם](#technique-1-why-not-all)
- [טכניקה #2: Mix‑ins](#technique-2-mix-ins)
  - [דוגמאות Mix‑in](#mix-in-examples)
  - [דוגמת `User`](#example-user)
- [טכניקה #3: ארגון עם Namespaces](#technique-3-organizing-with-namespaces)
  - [שימוש בעולם האמיתי](#real-world-usage)
- [סיכום](#summary)

<!--
1.  ייצוג לוגי ברמה גבוהה של טיפוסים – בצורה משמעותית למפתחים ולבעלי העסק.
2.  דרך עמידה למידול שילובים של שדות קשורים לוגית.
    1.  דוגמה: **מופעי אובייקט** כוללים לעיתים קרובות שדות משותפים `id`, `createdDate`, `createdById`, וכו׳.
    2.  מודל שדות בקשה ותגובה ממודלים נפרדים של מסד הנתונים. (למשל `_version`, `_v`)
    3.  כלי הרכבה, עטיפת Paging/Payload, וכו׳: `pageNumber`, `sortBy`, `impersonateSession`, `token`, `_version`, וכו׳.
3.  למנוע שונות בלתי מכוונת בשם ובטיפוס (`id`, `Id`, `ID`, `created_at`, `date_created`, אוי לא!)
4.  להרכיב טיפוסים ברמה גבוהה עם ממשקים וטיפוסים קטנים רב‑פעמיים.
5.  להשתמש ב‑[Unions](https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes-func.html#discriminated-unions) כדי 'להתאים' באופן אוטומטי גרסאות של טיפוס. -->

### גישות לתכנון טיפוסים

כנראה שנתקלת או כתבת תבניות שונות סביב "מימושי טיפוסים". במיוחד כשצורכים נתונים מ‑APIs של צד שלישי.

**הערה:** אני מתעלם בכוונה מתהליכים "מסורתיים" של בניית דיאגרמות יחסים ישויות (ERD) או היררכיות ירושה בתכנות מונחה‑אובייקטים (OOP). כאן אנחנו בונים טיפוסים לייצוג נתוני API חצי‑מובנים.

בואו נבחן שתי גישות ברמה גבוהה: **אובייקט גדול יחיד** (מ‑למעלה למטה) מול **מספר טיפוסים בשם** (מתחת למעלה).

מעדיף להיות מפורש על פני שימוש חוזר ו‑DRY‑ness.

**בונוס:** חוויית IDE/פיתוח מצוינת, מכיוון שה‑tooltips כוללים תצוגה מקדימה מלאה יותר – בלי בלאגן.

```tsx
interface ProductDetails {
  name: string;
  seller: { name: string };
  availability: Array<{ warehouseId: string; quantity: number }>;
  reviews: Array<{ authorId: number; stars: number }>;
}
```

מאחר שאנחנו מעדיפים קריאות מפורשת, זה מקובל להתפנק במעט חזרה (במסגרת ההגיונית). כשקבוצות של מאפיינים חוזרות **הרבה** פעמים, אפשר לחלץ את השדות החוזרים לטיפוס בעל שם.

#### מספר טיפוסים בשם

מעדיף שימוש חוזר ו‑DRY‑ness.

<!-- קריאות היא מדד משעשע. מכיוון שלרוב קריאות היא טובה או **מצוינת כשיש מעט טיפוסים/קבצים.** **בלא ספק טיפוסים נוטים להתפשט,** עם יותר ויותר מאפיינים. **הקריאות נפגעת.** -->

גישה זו היא ככל הנראה המועדפת ברוב המקרים.

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

בכללותו, גישה זו מצוינת. אך היא לא חסרת חסרונות.

- **קריאות** מצוינת בתחילה; עם זאת, היא _יכולה_ להיפגע ככל שמספר וגודל הטיפוסים גדלים.
- DRY באופן בלתי פוסק, אבל באיזו מחיר? (נרחיב על כך בהמשך.)
- חוויית המפתח יכולה להיפגע מכיוון שה‑tooltips פחות אינפורמטיביים.

> ⚠️ מאז (בקירוב) TypeScript v3, שרת השפה קוצר את ה‑tooltips, ומשמיט מאפיינים מקוננים.
> 💡 יש תחבולות לשפר את המצב במקצת. נסו להחזיק `Cmd` או `Ctrl`, ואז לרחף מעל שמות טיפוסים שונים – אמור להופיע לפחות שכבה נוספת של מאפיינים ב‑tooltip.

למה אנחנו צריכים לבחור בין שני הגישות האלה? (טיפוס ענק מול טיפוסים משניים עם שם.)

### טכניקה #1: למה לא הכול

האם אפשר לקבל את הכל?

- בהירות של טיפוסים “תמונה כוללת”?
- בנוסף, טיפוסים משניים עם שם?
- בלי שכפול?

> ✅ כן! 🎉

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

1.  צור טיפוסים מובנים גדולים “Primary”.
2.  ייצא טיפוסים משניים שמופקים מהטיפוס Primary.

הגישה הזו באמת מצטיינת במערכות שבהן אובייקטים “בעלי‑רמה גבוהה” מרוויחים מתיעוד במקום אחד. בנוסף, הטכניקה תומכת בשימוש חוזר בין מקרים שונים: מודלים, שירותים, תוצאות שאילתות, וכו׳.

### טכניקה #2: Mix‑ins

האסטרטגיה הזו מתמקדת בהרכבת **השדות הנכונים**, עם **השם הנכון**, כדי **לייצג אובייקטים לוגיים יחידים**. המטרה היא לטפל ביעילות במקרים מרובים באמצעות כלי‑עזר של TypeScript ואיחוד טיפוסים.

הגישה שונה מהירושה המסורתית של OOP וההיררכיות, שמטרתן ליצור שכבות של אובייקטים בטקסונומיות קשוחות. **ה‑mix‑in מתמקד בטיפוסים שטוחים וקשרים רופפים**, מקבץ שדות קשורים תוך הפחתת שכפול.

#### דוגמאות Mix‑in

```tsx
interface TodoModel {
  text: string;
  complete: boolean;
}
interface InstanceMixin {
  id: number;
}
/** TodoDraft מייצג את מצב הטופס, אפשר שכל השדות יהיו undefined */
export type TodoDraft = Partial<TodoModel>;
/** Todo מייצג רשומת Todo ממסד הנתונים */
export type Todo = TodoModel & InstanceMixin;
```

#### דוגמה `User`

```tsx
interface User {
  id: number;
  name: string;
  bio: string;
  social: Record<"facebook" | "instagram" | "github", URL>;
}
```

נציג את ה‑`User` לפני ואחרי שמירתו למסד הנתונים.

```tsx
// שדות הליבה של User (לדוגמה עבור <form>)
interface UserBase {
  name: string;
  bio: string;
  social: Record<"facebook" | "instagram" | "github", URL>;
}
// שדות ממסד הנתונים
interface InstanceMixin {
  id: number;
  createdAt: Date;
  updatedAt: Date;
}
// מופע User **שלם** – עם כל השדות
type UserInstance = InstanceMixin & UserBase;
```

כעת אפשר לעצב בדיוק את השדות הדרושים (כמו `password` ליצירה/עדכון, אך לא לכלול אותו בשאילתות של `UserInstance`).

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
/** Payload של משתמש להרשמה, כולל שדה `password` */
export type UserPayload = UserBase & { password: string };
/** מייצג את טיפוס ה‑User שמוחזר מהשרת. */
export type UserInstance = UserBase & InstanceMixin;
```

1.  “האם זהו נוהל טוב?”
2.  “האם כדאי לי לנסות זאת?”

אין מושג. בואו נמשיך!

### טכניקה #3: ארגון עם Namespaces

כאן אנו מצהירים על מרחב שם `ModelMixins`. זה מספק קצת סדר וגם תבנית שימוש חוזר ברורה יותר.

**צורות סטנדרטיות**

- `createdAt` ו‑`updatedAt` קיימים יחד.
- `id`, לא `ID` או `_id`.

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

**שימוש באיחוד טיפוסים**

```tsx
// `../src/types/user.d.ts`
export interface UserBase {
  name: string;
  bio: string;
  social: Record<"facebook" | "instagram" | "github", URL>;
}
// טיפוס `User` יחיד, משתמש באיחוד טיפוסים כדי לייצג דינמית
// את מצבי לפני‑אחרי יצירה.
export type User =
  | (UserBase & ModelMixins.Instance & ModelMixins.HashedPassword)
  | (UserBase & ModelMixins.InputPassword);
```

אם תרצו, אפשר גם לייצא טיפוסים בשם נפרד:

```tsx
/** מטען משתמש להרשמה, כולל שדה `password` */
export type UserPayload = UserBase & ModelMixins.Instance & ModelMixins.HashedPassword;
/** מייצג את טיפוס ה‑User שמוחזר מהשרת. */
export type UserInstance = UserBase & ModelMixins.InputPassword;
```

#### שימוש בעולם האמיתי

הנה פונקציית `upsert()` שמשתמשת באופרטור `in` כדי להבדיל בין טיפוסי `UserInstance` ו‑`UserPayload`.

```tsx
function upsert(user: User) {
  if ("id" in user) {
    // TypeScript יודע שה‑`user` כאן כולל שדות מ‑Instance (id, createdAt, וכו')
    return updateUser(user.id, user);
  } else {
    // TypeScript יודע שזה חייב להיות הגרסה `UserBase & ModelMixins.InputPassword` של המשתמש.
    return createUser(user);
  }
}
```

### סיכום

כיסינו שלוש טכניקות וכמה רעיונות תומכים קשורים.

אולי אתם תוהים, האם אלו תבניות טובות? האם כדאי לאמץ חלק מהרעיונות האלה?

## משאבים

- [טיפים ל‑TypeScript בפרויקטים ישנים: הקלד רק מה שאתה צריך](https://sergiocarracedo.es/typescript-tips/)
- [הספר החדש והמדהים של מאט פוקוק](https://www.totaltypescript.com/books/total-typescript-essentials)
- [טיפים ל‑Total TypeScript](https://www.totaltypescript.com/tips)
````
