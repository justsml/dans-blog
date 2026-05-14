# Translation Candidate
- Slug: guerrilla-types-in-typescript
- Locale: he
- Model: openrouter/deepseek/deepseek-v4-flash
- Target: src/content/posts/2023-09-06--guerrilla-types-in-typescript/he/index.mdx
- Validation: deferred
- Runtime seconds: 74.29
- Input tokens: 8168
- Output tokens: 10799
- Thinking tokens: unknown
- Cached input tokens: 1152
- Cache write tokens: 0
- Estimated cost: $0.004009
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
social_image: ../desktop-social.webp
title: טיפוסי גרילה ב-TypeScript
subTitle: עיצוב גופנים מורד
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
## טיפוסי גרילה ב-TypeScript

במאמר זה נחקור שלוש טכניקות מסקרנות (ואולי נוראיות?) שיסייעו בעיצוב טיפוסים!

המטרה העיקרית היא ממשקי **עקביים** ו**צפויים** של מודל/ישות/מחלקה.

- [גישות לעיצוב טיפוסים](#approaches-to-designing-types)
  - [אובייקט גדול יחיד](#single-large-object)
  - [טיפוסים מרובים בעלי שם](#multiple-named-types)
- [טכניקה #1: למה לא הכל](#technique-1-why-not-all)
- [טכניקה #2: מיקס-אין](#technique-2-mix-ins)
  - [דוגמאות למיקס-אין](#mix-in-examples)
  - [דוגמה: `User`](#example-user)
- [טכניקה #3: ארגון עם מרחבי שמות](#technique-3-organizing-with-namespaces)
  - [שימוש בעולם האמיתי](#real-world-usage)
- [סיכום](#summary)

<!--
1.  High-level logical representation of types - in a way meaningful to both devs and business stakeholders.
2.  Durable way to model combinations of logically related fields.
    1.  Example: **Object instances** often include common fields `id`, `createdDate`, `createdById`, etc.
    2.  Model Request & Response fields from your discrete database models. (e.g. `_version`, `_v`)
    3.  Composable utilities, Paging/Payload wrapper, etc: `pageNumber`, `sortBy`, `impersonateSession`, `token`, `_version`, etc.
3.  Avoid unintended variances in naming and typing (`id`, `Id`, `ID`, `created_at`, `date_created`, oh noes!)
4.  Compose higher level types with multiple smaller reusable interfaces & types.
5.  Utilize [Unions](https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes-func.html#discriminated-unions) to 'automatically' match variants of a type. -->

### גישות לעיצוב טיפוסים

סביר להניח שנתקלתם או כתבתם תבניות שונות סביב "מימושים של טיפוסים". במיוחד כשצורכים נתונים מ-API של צד שלישי.

**הערה:** אני מתעלם בכוונה מתהליכים "מסורתיים" של בניית דיאגרמות ישויות-קשרים (ERD) או היררכיות ירושה של תכנות מונחה עצמים (OOP). כאן, אנו בונים טיפוסים כדי לייצג נתוני API חצי-מובנים.

בואו נחקור שתי גישות ברמה גבוהה: **אובייקט גדול יחיד** (מלמעלה למטה) לעומת **טיפוסים מרובים בעלי שם** (מלמטה למעלה).

#### אובייקט גדול יחיד

מעניק עדיפות לבהירות מפורשת על פני שימוש חוזר ועקרון DRY.

**בונוס:** חוויית הפיתוח (IDE/Dev) מצוינת, מכיוון שתוויות העזר כוללות תצוגה מקדימה מלאה יותר – ללא טרחה.

```tsx
interface ProductDetails {
  name: string;
  seller: { name: string };
  availability: Array<{ warehouseId: string; quantity: number }>;
  reviews: Array<{ authorId: number; stars: number }>;
}
```

מכיוון שאנו נותנים עדיפות לקריאות מפורשת, מותר להתפנק בקצת חזרתיות (במידה סבירה). כאשר קבוצות של מאפיינים חוזרות פעמים רבות, אל תהסס לחלץ את השדות החוזרים לטיפוס בעל שם.

#### טיפוסים מרובים בעלי שם

מעניק עדיפות לשימוש חוזר ועקרון DRY.

<!-- קריאות היא מדד מצחיק. קריאות היא לרוב טובה או **מצוינת כשיש מעט טיפוסים/קבצים.** **באופן בלתי נמנע טיפוסים נוטים להתרבות,** עם עוד ועוד מאפיינים. **הקריאות סובלת.** -->

גישה זו היא ככל הנראה המועדפת בפער ניכר.

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

בסך הכל, גישה זו מצוינת. אבל היא לא חפה מחסרונות.

- **קריאות** מצוינת בהתחלה; עם זאת, היא _עלולה_ לסבול ככל שגודל ומספר הטיפוסים גדלים.
- DRY ללא רחמים, אבל באיזה מחיר? (עוד על כך בהמשך.)
- חוויית הפיתוח עלולה לסבול מכיוון שתוויות העזר פחות אינפורמטיביות.

> ⚠️ מאז (בערך) TypeScript v3, שרת השפה קוטע תוויות עזר, ומשמיט מאפיינים מקוננים.
> 💡 יש טריקים לשפר את המצב מעט. נסה להחזיק `Cmd או Ctrl`, ואז לרחף מעל שמות טיפוסים שונים – אתה אמור לראות לפחות 'שכבה' נוספת אחת של מאפיינים בתווית העזר.

למה אנחנו חייבים לבחור בין שתי הגישות האלה? (טיפוס גדול ומגושם לעומת תתי-טיפוס בעלי שם.)

### טכניקה מס' 1: למה לא הכל

האם אפשר לקבל הכל?

- בהירות של טיפוסים 'תמונת-על'?
- בתוספת תתי-טיפוס בעלי שם?
- ללא כפילות?

> ✅ כן! 🎉

<!-- ### כמה דברים לשקול -->

<!-- - איך מייצגים יחס `אחד-לאחד` כמו `Product` -> `Seller`? -->
<!-- - מה לגבי יחסי `אחד-לרבים`? נגיד `Reviews`, או `Photos`? -->
<!-- - לתת לפריזמה לטפל בזה? (לא רעיון רע, אבל המאמר הזה בסתר עוסק בלימוד קצת TypeScript...) -->

<!-- גישה זו היא תרגיל באי-כפילות של שמות שדות מודל. בדרך, אני חושב ש'תמונת העל' ברורה יותר (במקום אחד). מתחילים מהטיפוס הגדול ביותר ברמה הגבוהה ביותר, ומגזרים ממנו את הטיפוסים הפשוטים יותר. -->

<!-- כאשר מקבלים נתונים מובנים מסוג מערך/אובייקט, מתכנתי TypeScript רבים חשים דחף ליצור טיפוסים. המון טיפוסים. בסופו של דבר נוצרת מפל שכבות, המורכב מטיפוסים פשוטים הבונים טיפוסים מורכבים יותר ויותר. -->

<!-- או אולי אתה מהסוג שמתחיל בטיפוס ברמה הגבוהה ביותר, בונה מספיק פיגומים כדי לכתוב את תת-הטיפוס הבא בעץ? -->

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

1.  צור טיפוסים "ראשיים" גדולים ומובנים.
2.  ייצא תת-טיפוסים הנגזרים מהטיפוס הראשי.

גישה זו באמת מצטיינת במערכות שבהן אובייקטים "ברמה גבוהה" נהנים מתיעוד במקום אחד.
כמו כן, טכניקה זו תומכת בשימוש חוזר בין מקרי שימוש רבים: מודלים, שירותים, תוצאות שאילתות וכו'.

### טכניקה #2: מיקסינים

אסטרטגיה זו עוסקת כולה בהרכבה של **השדות הנכונים**, עם **השמות הנכונים**, כדי **לייצג אובייקטים לוגיים בודדים.** המטרה היא לתת מענה יעיל למספר מקרי שימוש באמצעות TypeScript Utilities ו-Type Unions.

גישה זו שונה מהיררכיות וירושה מסורתיות של OOP, שמטרתן ליצור שכבות של אובייקטים בטקסונומיות הדוקות. **גישת המיקסינים עוסקת בטיפוסים שטוחים וקשורים באופן רופף**, תוך קיבוץ שדות קשורים תוך צמצום כפילויות.

#### דוגמאות למיקסינים

```tsx
interface TodoModel {
  text: string;
  complete: boolean;
}
interface InstanceMixin {
  id: number;
}
/** TodoDraft מייצג מצב של טופס, ייתכן שהכל undefined */
export type TodoDraft = Partial<TodoModel>;
/** Todo מייצג רשומת מופע Todo ממסד הנתונים */
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

בואו נייצג את `User` לפני ואחרי שמירה למסד הנתונים.

```tsx
// שדות ליבה של User (נניח עבור <form>)
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
// **מופע** User - עם כל השדות
type UserInstance = InstanceMixin & UserBase;
```

כעת נוכל לפסל בדיוק את השדות הדרושים לנו (כמו `password` ליצירה/עדכון, אך לא נכלל בשאילתות של `UserInstance`).

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
/** מטען User להרשמה, כולל שדה `password` */
export type UserPayload = UserBase & { password: string };
/** מייצג את טיפוס User המוחזר מהשרת. */
export type UserInstance = UserBase & InstanceMixin;
```

1.  "האם זהו נוהג טוב?"
2.  "האם כדאי לי לנסות את זה?"

אין לי מושג. בואו נמשיך!

### טכניקה מס' 3: ארגון עם Namespaces

כאן, אנו מצהירים על namespace בשם `ModelMixins`. זה מספק ארגון מסוים בתוספת תבנית שימוש חוזר ברורה יותר.

**צורות סטנדרטיות**

- `createdAt` ו-`updatedAt` קיימים יחד.
- `id`, לא `ID` או `_id`.

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

**שימוש ב-Type Unions**

```tsx
// `src/types/user.d.ts`
export interface UserBase {
  name: string;
  bio: string;
  social: Record<"facebook" | "instagram" | "github", URL>;
}
// טיפוס `User` יחיד, המשתמש ב-Type Union כדי לייצג
//  באופן דינמי את המצבים לפני ואחרי היצירה.
export type User =
  | (UserBase & ModelMixins.Instance & ModelMixins.HashedPassword)
  | (UserBase & ModelMixins.InputPassword);
```

אם תרצו, תוכלו גם לייצא טיפוסים בעלי שם בנפרד:

```tsx
/** מטען User להרשמה, כולל שדה `password` */
export type UserPayload = UserBase & ModelMixins.Instance & ModelMixins.HashedPassword;
/** מייצג את טיפוס User המוחזר מהשרת. */
export type UserInstance = UserBase & ModelMixins.InputPassword;
```

#### שימוש בעולם האמיתי

הנה פונקציית `upsert()` המשתמשת באופרטור `in` כדי להבחין בין טיפוסי `UserInstance` ו-`UserPayload`.

```tsx
function upsert(user: User) {
  if ("id" in user) {
    // TypeScript יודע ש-`user` כאן מכיל שדות מ-Instance (id, createdAt, וכו')
    return updateUser(user.id, user);
  } else {
    // TypeScript יודע שזה חייב להיות הגרסה `UserBase & ModelMixins.InputPassword` של user.
    return createUser(user);
  }
}
```

### סיכום

כיסינו שלוש טכניקות וכמה רעיונות תומכים קשורים.

ייתכן שאתם שואלים, האם אלו דפוסים טובים? האם כדאי לאמץ חלק מהרעיונות האלה?

## משאבים

- [טיפים ל-TypeScript בפרויקטים מדור קודם: טיפוסים רק לפי הצורך](https://sergiocarracedo.es/typescript-tips/)
- [הספר המצוין החדש של מאט פוקוק](https://www.totaltypescript.com/books/total-typescript-essentials)
- [טיפים ל-TypeScript הכולל](https://www.totaltypescript.com/tips)
````
