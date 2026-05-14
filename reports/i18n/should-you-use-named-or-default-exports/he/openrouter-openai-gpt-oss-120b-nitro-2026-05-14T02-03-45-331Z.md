# Translation Candidate
- Slug: should-you-use-named-or-default-exports
- Locale: he
- Model: openrouter/openai/gpt-oss-120b:nitro
- Target: src/content/posts/2023-08-18--should-you-use-named-or-default-exports/he/index.mdx
- Validation: deferred
- Runtime seconds: 3.57
- Input tokens: 3016
- Output tokens: 1499
- Thinking tokens: unknown
- Cached input tokens: 1280
- Cache write tokens: 0
- Estimated cost: $0.000387
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
social_image: ../desktop-social.webp
title: 'ייצוא ב‑ESM: בשם מול ברירת מחדל?'
subTitle: 'לקרוא שם, או לא?'
date: '2023-08-10'
modified: '2024-08-01'
tags:
  - typescript
  - javascript
  - modules
category: Guides
subCategory: JavaScript
cover: ../austin-kirk-cHX_Eih2hkY-unsplash-cropped.webp
cover_mobile: ../w300_austin-kirk-cHX_Eih2hkY-unsplash-cropped.webp
cover_icon: ../icon_austin-kirk-cHX_Eih2hkY-unsplash-cropped.webp
---
## האם להשתמש ב‑`named` או `default` ב‑JavaScript?

אין מחסור במאמרים נוקבים בנושא הזה.

הרוב משפטים את `default export` כ„נורא“. אחרים טוענים שה‑`default` צריך לנצח (למשל, מדריך הסגנון של AirBnb).

הם לעיתים מאשימים **דברים זמניים לחלוטין**: באגים של ייבוא אוטומטי ב‑IDE, יכולות ה‑tree‑shaking של בונדלר מסוים, או האפשרות הטעונה של שגיאות כתיב בעת מתן שם ל‑import.

האם הפסקנו להבין את המשמעות של `export` מלכתחילה?

**קוד הוא תקשורת. ✨**

> אנחנו שולחים אות ל‑`import`ers _איך להשתמש בדבר._

### אז, מה אנחנו אומרים?

בגדול, יש 2 דרכים לייצא דברים ב‑JavaScript מודרני:

- `export default` מודיע בביטחון „זה **_הדבר החשוב ביותר_**”. בנוסף, „כל ה‑named exports משמשים רק כתמיכה”.
- `named export` אומר „זה **_דבר!_**” וגם מעלה כמה שאלות: „יש עוד חברים שם?“ והמשך: „האם הם מוזמנים או נדרשים?”

כמובן שניתן לשלב את שניהם, או להשתמש בגישות שונות עבור חלקים שונים בקוד שלכם. [ראו עוד דוגמאות בסוף המאמר.](../#summary)

### טיעונים חלשים, אחי

בואו נענה על כמה מה„בעיות הזמניות” הנפוצות שאנשים נתקלים בהן.

- טיעון #1: ייצוא בשם מבטיח עקביות שמות. [מקור](https://blog.neufund.org/why-we-have-banned-default-exports-and-you-should-do-the-same-d51fdc2cf2ad)
  - לא, זה לא נכון. אולי אתם מחפשים כלל לינט?
  - (אני שונא לשבור לכם את האשלייה, אבל חכו עד שתלמדו מה משתנים יכולים לעשות!)

```tsx
// אפשר ליצור שם חלופי עם שניהם!
import { Knife as Handle } from "./knife.js"; // 🔪
import { default as Handle } from "./knife.js"; // 🔪
import Handle from "./knife.js"; // 🔪
```

- טיעון #2: השתמשו ב‑`import * as soManyKnives from './kinves.js'` כדי לשלב ייצואיים בשם. (לא מקושר, המחבר משיכה את ההצהרה.)
  - תכונה נחמדה. לא העיקר.
  - עכשיו תגידו לי, איך אני מחזיק שוב במכשיר שלכם? אין כוונת מחבר.
- טיעון #3: ייצואיים בשם מציעים תמיכה טובה יותר ב‑IDE לייבוא או שינוי שם. [מקור](https://www.bundleapps.io/blog/use-named-exports-over-default-exports-in-javascript)

- לא נכון (עוד). קבעו/עדכנו את הכלים שלכם.
  - תמיכה קיימת כבר יותר מ‑3 שנים ב‑[VS Code](https://github.com/microsoft/vscode/pull/94480), IntelliJ ועוד.
  - עם זאת, יש כמה „best practices” לשימוש ב‑`export default` כדי לקבל חוויית IDE ו‑refactor מיטבית.
  - ✅ `export default function UserService() {}` – תמיד עדיף להשתמש בפונקציות בעלות שם.
  - ❌ `export default function() { }` – פונקציות אנונימיות אינן קשורות באופן מרומז לשם הקובץ. אם לא תתנו שם, קשה לבקש מהמחשב לשנות אותה.
  - **הערה:** מסיבות היסטוריות אי‑אפשר לשלב `export default` עם ביטוי `const`.

    ```tsx
    export default const Knife = () => {...blade, ...handle}
    // ^ ❌ לא נתמך ❌ ^
    // לא ניתן ל‑export default const ....
    // ==========================

    // עם זאת, לאחר הכרזה אפשר לייצא קבוע כ‑default.
    const Knife = () => {...blade, ...handle}
    export default Knife;
    // ^ ✅ תקין

    // להשלמת התמונה:
    export default class anyoneStillUseThese {}
    // ^ ✅ גם זה תקין לייצא מחלקה כ‑default
    ```

<section className="scroll-x">
## סיכום

בפועל קיימות שילובים רבים של דרכי ייצוא, ולכל אחד יש סיפור משלו:

| Default (Exports) | Named (Exports) | Private Fns | Pattern                                                   | Meaning                                                       |
| ----------------- | --------------- | ----------- | --------------------------------------------------------- | ------------------------------------------------------------- |
| ✅                | ❌              | ❌          | ייצוא default יחיד.                                       | “מציגים פונקציה אחת עם מטרה יחידה!”                         |
| ❌                | ✅              | ❌          | ייצוא named יחיד.                                         | “בבקשה אל תשנו את שמי.”                                      |
| ✅                | ✅              | ✅          | ייצוא default + מספר פונקציות ‘פרטיות’ שלא מיוצאות       | “הנה כמה לוגיקה קשורה. בנוסף, צפו להתנהגות דמו‑מחלקה.”      |
| ❌                | ❌              | ✅          | ייצואיים named מרובים, שם קובץ גנרי.                     | “תיקייה של דברים קשורים בקצת, ללא היררכיה מובחנת.”          |
| ✅                | ✅              | ❌          | ייצוא named יחיד שמיוצא גם כ‑default.                     | “לא תטעה בייבוא שלי.”                                        |
</section>

**מחשבה לשקילה:** מה אנחנו אומרים כששם הקובץ תואם או לא תואם לאחד מהייצואיים שלו? (לדוגמה, `utils.js` עם פונקציות מרובות.)

### מסקנה

אם קוד הוא תקשורת, אז ייצאו כמו שאתם באמת מתכוונים. 💞
````
