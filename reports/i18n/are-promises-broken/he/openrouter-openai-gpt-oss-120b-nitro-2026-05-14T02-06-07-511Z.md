# Translation Candidate
- Slug: are-promises-broken
- Locale: he
- Model: openrouter/openai/gpt-oss-120b:nitro
- Target: src/content/posts/2018-10-06--are-promises-broken/he/index.mdx
- Validation: deferred
- Runtime seconds: 9.10
- Input tokens: 8028
- Output tokens: 2813
- Thinking tokens: unknown
- Cached input tokens: 3328
- Cache write tokens: 0
- Estimated cost: $0.000819
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
social_image: ../desktop-social.webp
title: הבטחות שבורות?
unlisted: true
subTitle: 'מתעלמים משגיאות, מאבדים תוצאות...'
date: '2018-10-06'
modified: '2024-12-11'
tags:
  - promises
  - javascript
  - errors
  - programming
category: Code
subCategory: promises
cover: ../lennart-heim-766366-unsplash.webp
cover_mobile: ../w300_lennart-heim-766366-unsplash.webp
cover_icon: ../icon_lennart-heim-766366-unsplash.webp
---
## האם הבטחות JavaScript שבורות?

### בתקופות הקודמות

אחד המיתוסים השכיחים ביותר לגבי הבטחות הוא הטענה **המדומיינת** שלהן בחוסר טיפול בשגיאות.

**לפני כמה שנים** הבטחות _היו_ באמת גרועות עם שגיאות. **הרבה עבודה הושקעה בתיקון הבעיה.**

> ואז, **הדבר תוקן**, אפילו **הופץ ברבים**.

#### אנשים שמחו

ולצערנו, חלק לא שמו לב.

### זמננו

המיתוס עדיין קיים, אני רואה אותו בכל מקום: [מאמרים פופולריים ב‑Medium](https://hackernoon.com/6-reasons-why-javascripts-async-await-blows-promises-away-tutorial-c7ec10518dd9), [ב‑DZone](#redacted), ו[מקורות רבים אחרים](https://medium.com/@avaq/broken-promises-2ae92780f33).

אודה, אפילו משאבים ו‑תיעוד “רשמי” מציגים בעיקר [דוגמאות חלשות והרגלים רעים](../promise-gotchas/). לעיתים קרובות משתמשים בהם כדי “להוכיח” את הטענה נגד הבטחות. חלק אפילו מציעים “תרופות” שהופכות את המצב לגרוע יותר. (הערה: הקישור הוסר)

<!-- One such tip I've seen multiple times: is to never use `.catch`, and instead use an `"unhandledRejection"` global event. **NEVER** do this. unhandledRejection is designed for cleanup of global references, like database connections, before an impending shutdown.) -->

<br />
<br />

## כללים כדי להימנע מבעיות

1. [הבטחות צריכות משהו לתלות אליו](#1-promises-need-something-to-hang-on-to)
    * **תמיד** `return` מהפונקציות שלך.
1. [השתמשו במופעי `Error` אמיתיים](#2-use-real-error-instances)
    * **תמיד** השתמשו במופעי `Error`.
1. [טפלו בשגיאות במקום שהדבר הגיוני](#3-handle-errors-where-it-makes-sense)
    * **תמיד** השתמשו ב-`.catch()`, לפחות פעם אחת.
1. [הוסיפו בהירות עם פונקציות בשם 🦄✨](#4-add-clarity-with-named-functions-)
    * __העדיפו__ פונקציות בעלות שם.

-------------------------------------------

#### #1 הבטחות צריכות משהו לתלות אליו

חשוב מאוד **תמיד `return`** מהפונקציות שלך.

פונקציות הקולבק של הבטחה פועלות לפי תבנית מסוימת ב-`.then(callback)` וב-`.catch(callback)`.

כל ערך שמוחזר מועבר לקולבק של ה-`.then()` הבא.

```js
function addTen(number) {
  return number + 10;
}

Promise.resolve(10)  // 10
  .then(addTen)      // 20
  .then(addTen)      // 30
  .then(addTen)      // 40
  .then(console.log) // logs "40"
```

> יתרון של "תמיד מחזירים": הקוד הרבה יותר קל לבדיקה יחידתית.

**שאלה:** כמה מצבי Promise שונים (resolved & rejected) נוצרו?

**שאלה:** כמה הבטחות נוצרו בדוגמה הקודמת?

#### #2 השתמש במופעי `Error` אמיתיים

ל-JavaScript יש התנהגות מעניינת סביב שגיאות (שחלה על קוד אסינכרוני **וגם** סינכרוני).

<a href="https://repl.it/@justsml/throwing-errors-in-javascript" target="_blank">[<i>ראו דוגמה ב‑repl.it: `throwing errors in javascript`</i>]</a>
<img alt="throwing errors in javascript" src="../throwing-errors-in-javascript.webp" />

כדי **לקבל פרטים שימושיים על מספר השורה** ועל מחסנית הקריאות, יש להשתמש במופעי `Error`. זריקת מחרוזות אינה פועלת כמו בפייתון או רובי.

ב‑JavaScript **נראה** שמטפלים ב‑`throw "string"`, כפי שתראו את המחרוזת במטפל `catch`. עם זאת, הנתונים הם כל מה שתראו*. לא ייכללו מסגרות מחסנית קודמות [stack frames](https://en.wikipedia.org/wiki/Call_stack#Stack_and_frame_pointers).

דוגמאות נכונות ל‑`new Error`:

```js
throw new Error('message')           // ✅
Promise.reject(new Error('message')) // ✅
throw Error('message')               // ✅
Promise.reject(Error('message'))     // ✅
```

הדפוסים השגויים הנפוצים:

```js
throw 'error message'  // ❌
Promise.reject(-42)    // ❌
```

<iframe height="400px" width="100%" src="https://repl.it/@justsml/throwing-errors-in-javascript?lite=true" scrolling="no" frameborder="no" allowtransparency="true" allowfullscreen="true" sandbox="allow-forms allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-modals"></iframe>

#### #3 טיפול בשגיאות במקום שבו זה הגיוני

ה-Promises מציעים דרך חלקה לטפל בשגיאות, באמצעות `.catch()`. זה בעצם סוג מיוחד של `.then()` – שבו כל השגיאות מה‑`.then()` הקודמים מטופלות. בואו נסתכל על דוגמה…

```js
Promise.resolve(42)
  .then(() => 'hello')
  .catch(() => console.log('will not get hit'))
  .then(() => throw new Error('totes fail'))
  .catch(() => console.log('WILL get hit'))
```

בעוד ש‑`.catch()` עשוי להיראות כמו מאזין אירועי DOM (למשל `click`, `keypress`), המיקום שלו חשוב, מכיוון שהוא יכול “לתפוס” רק שגיאות שנזרקו **מעליו**.

**החלפת שגיאות היא יחסית טריוויאלית** – החזר ערך שאינו שגיאה בפונקציית ה‑`.catch()` שלך, ושרשרת ה‑Promise תעבור להריץ את קריאות ה‑`.then()` ברצף. (בפועל.)

נסו לעקוב אחרי הרצף בדוגמה הבאה:

```js
Promise.resolve(42)
  .then(() => 'hello')
  .then(() => throw new Error('totes fail'))
  .catch(() => {
    return 99
  })
  .then(num => num + 1)
  .then(console.log) // פלט צפוי: 100
```

**החשיבות היא להבין את הרצף.**

למרות שמדובר בדוגמה משעשעת, היא נועדה **להמחיש איך שגיאות וזרימת נתונים מתנהלות** ב‑Promises.

הנה מתווה של הרצף:

1. 42 הוא הערך הראשוני.  
2. `hello` מוחזר תמיד על‑ידי המתודה הבאה.  
3. אנו מתעלמים מהערך הקודם, וזורקים שגיאה עם הודעת `'totes fail'`.  
4. `.catch()` תופס את השגיאה, ובמקום זאת מחזיר `99` שיטופל על‑ידי כל `.then()` שמגיע אחריו.  
5. מגדילים את `num`, מחזירים `100`.  
6. המתודה `console.log` מקבלת `100` ומדפיסה אותו! :tada:

**שאלה:** מה קורה כש‑2 `.catch()` נמצאים ברצף? האם השני יכול אי‑פעם לרוץ? האם אתם יכולים לחשוב על מקרה שימוש?

**שאלה:** איך `.catch()` יכול להתעלם משגיאות? איך למנוע משגיאות לגרום ליציאה מוקדמת של `Promise.all`?

#### #4 הוסיפו בהירות עם פונקציות בשם 🦄✨

השוו את **קריאות הקוד** של שני הדוגמאות הבאות:

**אנונימית:** ❌

```js
Promise.resolve(10)          // 10
  .then(x => x * 2)          // 20
  .then(x => x / 4)          // 5
  .then(x => x * x)          // 25
  .then(x => x.toFixed(2))   // "25.00"
  .then(x => console.log(x)) // expected output: "25.00"
```

**בשם:** ✅

```js
Promise.resolve(10) // 10
  .then(double)     // 20
  .then(quarter)    // 5
  .then(square)     // 25
  .then(format)     // "25.00"
  .then(log)        // expected output: "25.00"

const double = x => x * 2
const quarter = x => x / 4
const square = x => x * x
const format = x => x.toFixed(2)
const log = x => console.log(x)

```

**בונוס:** ✅

> תואם למתודות של מערכים!!!

ניתן להשתמש בפונקציות בעלות שם עם החברים שלנו מ‑`Array.prototype.` כולל `.map()`, `.filter()`, `.every()`, `.some()`, `.find()`!

צינורות איסוף #FTW:

```js
// זה כמו אותו הדבר :mindblown:

[10, 20]           // [ 10, 20 ]
  .map(double)     // [ 20, 40 ]
  .map(quarter)    // [ 5, 10 ]
  .map(square)     // [ 25, 100 ]
  .map(format)     // [ "25.00", "100.00" ]
  .map(log)        // expected 2 lines of output: "25.00", "100.00"

```

ואם אתם לא רוצים לכתוב קוד בצורה ליניארית... טוב, יש לכם פונקציות פשוטות!

אתם יכולים להשתמש בהם לפי הצורך:

```js
// Nesting patern
// ❌ please don't do this, however

const result = format(square(quarter(double(10))))

log(result)
// expected output: "25.00"
```

**למה קידוד מקונן של פונקציות הוא אנטי‑פטרן?**

1. אינו קריא למספר גדול של אנשים  
2. diff‑ים ב‑git לא מגלים בקלות מי שינה מה  
3. קשה לדיבג או ללוג מהאמצע של הפונקציות המקוננות
````
