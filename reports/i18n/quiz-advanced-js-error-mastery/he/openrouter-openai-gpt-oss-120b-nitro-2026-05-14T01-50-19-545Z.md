# Translation Candidate
- Slug: quiz-advanced-js-error-mastery
- Locale: he
- Model: openrouter/openai/gpt-oss-120b:nitro
- Target: src/content/posts/2025-11-04--quiz-advanced-js-error-mastery/he/index.mdx
- Validation: deferred
- Runtime seconds: 14.13
- Input tokens: 14994
- Output tokens: 9441
- Thinking tokens: unknown
- Cached input tokens: 1408
- Cache write tokens: 0
- Estimated cost: $0.002948
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
title: 'חידון: שליטה מתקדמת בשגיאות JS'
subTitle: האם החריגות שלכם באמת יוצאות מן הכלל?
label: Errors
category: Quiz
subCategory: JavaScript
unlisted: false
date: '2025-11-03'
modified: '2025-11-04'
tags:
  - quiz
  - javascript
  - error-handling
  - debugging
  - advanced
cover_full_width: ../ahmed-slimene-c09hZthLq_s-unsplash-wide.webp
cover_mobile: ../ahmed-slimene-c09hZthLq_s-unsplash-square-300px.webp
cover_icon: ../ahmed-slimene-c09hZthLq_s-unsplash-square-300px.webp
cover_credit: >-
  Photo by <a
  href="https://unsplash.com/@assl?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Ahmed
  Slimene</a> on <a
  href="https://unsplash.com/photos/a-tall-white-building-with-balconies-on-top-of-it-c09hZthLq_s?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>
---
import Challenge from '../../../../components/QuizUI/Challenge';
import QuizUI from '../../../../components/QuizUI/QuizUI';


### חושבים שאתם מכירים את שגיאות JavaScript על כל רבדיה?

* **בדקו את המומחיות שלכם בטיפול בשגיאות!** 💥
* אין צורך להתחבר או להירשם. ✨
* בחירה מרובה. 🤖 … _אלו לא שאלות ה‑try‑catch הרגילות שלכם!_

<QuizUI>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={0}
  group="הפתעות סיריאליזציה"
  title="החידה של האובייקט הריק"
  options={[
    {text: '{"message":"Oops","name":"Error"}'},
    {text: '{}', isAnswer: true},
    {text: '{"error":"Oops"}'},
    {text: 'null'},
  ]}
>
  <slot name="question">
  <div className="question">
    מה מחזירה `JSON.stringify(error)`?
    ```js
        const error = new Error('Oops');
        console.log(JSON.stringify(error));
    ```
  </div>
  </slot>

  <slot name="hints">
  <div className="hint">
    חשוב על תכונות ניתנות לה enumeration באובייקטים מסוג Error.
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    לאובייקטי Error יש תכונות שאינן ניתנות לה enumeration (`message`, `name`, `stack`), ולכן `JSON.stringify()` מחזירה `{}`. זה תופעה נפוצה כששולחים שגיאות בתגובות API. השתמשו ב‑`JSON.stringify(error, Object.getOwnPropertyNames(error))` או צרו אובייקט פשוט במקום.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={1}
  group="הפתעות סיריאליזציה"
  title="קונסול מול JSON"
  options={[
    {text: 'שניהם מציגים את אותו פלט'},
    {text: 'console.log מציג מידע נוסף', isAnswer: true},
    {text: 'JSON.stringify מציג מידע נוסף'},
    {text: 'שניהם מציגים אובייקטים ריקים'},
  ]}
>
  <slot name="question">
  <div className="question">
    מה ההבדל בין השניים?
    ```js
        const err = new Error('Test');
        console.log(err);
        console.log(JSON.stringify(err));
    ```
  </div>
  </slot>

  <slot name="hints">
  <div className="hint">
    חשבו איך console.log מתמודד עם אובייקטים מול סיריאליזציית JSON.
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    `console.log(err)` מציג את השגיאה עם ההודעה וה‑stack trace שלה מכיוון שהקונסול מטפל באופן מיוחד באובייקטי Error. `JSON.stringify(err)` מחזיר `'{}'` מכיוון שהמאפיינים של Error אינם enumerable. הבדל זה מבלבל רבים מפתחים שמבצעים דיבוג של API‑ים.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={2}
  group="טריקים לבדיקת סוגים"
  title="ירושה עם instanceof"
  options={[
    {text: 'true, true, true', isAnswer: true},
    {text: 'true, false, false'},
    {text: 'false, true, true'},
    {text: 'true, true, false'},
  ]}
>
  <slot name="question">
  <div className="question">
    מה התוצאות של הבדיקות האלה?
    ```js
        class CustomError extends Error {}
        const err = new CustomError('test');
    
        console.log(err instanceof CustomError);
        console.log(err instanceof Error);
        console.log(err instanceof Object);
    ```
  </div>
  </slot>

  <slot name="hints">
  <div className="hint">
    זכור את שרשרת הפרוטוטייפ בירושה של JavaScript.
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    השלוש מחזירות `true`. `CustomError` מרחיב את `Error`, שמרחיב את `Object`. האופרטור `instanceof` בודק את כל שרשרת הפרוטוטייפ, ולכן מופע של `CustomError` הוא גם מופע של `Error` וגם של `Object`.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={3}
  group="טריקים לבדיקת סוגים"
  title="instanceof בין‑מסגרות"
  options={[
    {text: 'תמיד נכון'},
    {text: 'תמיד שגוי'},
    {text: 'יכול להיות שגוי בין מסגרות', isAnswer: true},
    {text: 'זורק שגיאה'},
  ]}
>
  <slot name="question">
  <div className="question">
    מה קורה עם `instanceof Error` בין iframes?
    ```js
        // In iframe:
        const iframeError = new Error('test');
        // In parent window:
        console.log(iframeError instanceof Error);
    ```
  </div>
  </slot>

  <slot name="hints">
  <div className="hint">
    הקשרים שונים משתמשים בבוני Error שונים.
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    `instanceof` יכול להחזיר `false` בין הקשרים שונים של ביצוע (iframes, workers) מכיוון שלכל הקשר יש בונה `Error` משלו. השתמש ב‑`Object.prototype.toString.call(obj) === '[object Error]'` לזיהוי שגיאות אמין בין הקשרים.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={4}
  group="הטלת ערכים שאינם שגיאות"
  title="הטלת מחרוזת"
  options={[
    {text: 'TypeError: מחרוזת אינה Error'},
    {text: 'false, "string"', isAnswer: true},
    {text: 'יוצר אובייקט Error אוטומטית'},
    {text: 'התנהגות לא מוגדרת'},
  ]}
>
  <slot name="question">
  <div className="question">
    מה קורה כשאתה זורק מחרוזת?
    ```js
        try {
          throw "Oops!";
        } catch (e) {
          console.log(e instanceof Error);
          console.log(typeof e);
        }
    ```
  </div>
  </slot>

  <slot name="hints">
  <div className="hint">
    JavaScript מאפשר לזרוק כל ערך, לא רק אובייקטי Error.
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    JavaScript מאפשר לזרוק כל ערך. כאן, `e instanceof Error` הוא `false` ו‑`typeof e` הוא "string". זה יכול לשבור קוד טיפול בשגיאות שמניח שכל החריגות שנתפסות הן אובייקטי Error. תמיד זרוק מופעי Error לשיפור ניפוי תקלות.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={5}
  group="שגיאות מותאמות"
  title="מאפיין שם השגיאה"
  options={[
    {text: '"Error"'},
    {text: '"CustomError"', isAnswer: true},
    {text: 'undefined'},
    {text: 'Depends on the browser'},
  ]}
>
  <slot name="question">
  <div className="question">
    מה הערך של `err.name`?
    ```js
        class CustomError extends Error {
          constructor(message) {
            super(message);
            this.name = this.constructor.name;
          }
        }
        const err = new CustomError('test');
        console.log(err.name);
    ```
  </div>
  </slot>

  <slot name="hints">
  <div className="hint">
    הסתכל על מה שמחזירה `this.constructor.name`.
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    `err.name` הוא `"CustomError"` מכיוון ש-`this.constructor.name` מחזיר את שם המחלקה. הגדרת `this.name = this.constructor.name` היא תבנית נפוצה כדי להבטיח שמחלקות שגיאה מותאמות יציגו את השם הנכון במעקבות המחסנית ובמסרי השגיאה.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={6}
  group="שגיאות מותאמות"
  title="קונסטרוקטור שם תפסיק"
  options={[
    {text: '"MyError"'},
    {text: '"Error"', isAnswer: true},
    {text: 'undefined'},
    {text: 'TypeError'},
  ]}
>
  <slot name="question">
  <div className="question">
    מה הפלט בלי להגדיר `name`?
    ```js
        class MyError extends Error {
          // No constructor or name setting
        }
        const err = new MyError('test');
        console.log(err.name);
    ```
  </div>
  </slot>

  <slot name="hints">
  <div className="hint">
    מה מכילה תכונת `name` ברירת המחדל של Error?
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    בלי להגדיר במפורש `this.name`, השגיאה יורשת את תכונת `name` ברירת המחדל מהמחלקה `Error`, שהיא "Error". לכן מחלקות שגיאה מותאמות צריכות תמיד להגדיר `this.name = this.constructor.name` בבונה שלהן.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={7}
  group="סיבת השגיאה"
  title="Error.cause מודרני"
  options={[
    {text: '"Original error"', isAnswer: true},
    {text: 'undefined'},
    {text: 'השגיאה העוטפת'},
    {text: 'SyntaxError'},
  ]}
>
  <slot name="question">
  <div className="question">
    מה מחזיר `wrapper.cause.message`?
    ```js
        const original = new Error('Original error');
        const wrapper = new Error('Wrapper', 
          { cause: original }
        );
        console.log(wrapper.cause.message);
    ```
  </div>
  </slot>

  <slot name="hints">
  <div className="hint">
    `Error.cause` היא תכונה מודרנית של JavaScript לשרשור שגיאות.
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    `Error.cause` (ES2022) מאפשרת שרשור שגיאות כדי לשמור על הקשר השגיאה המקורי. `wrapper.cause` מתייחסת לשגיאה המקורית, ולכן `wrapper.cause.message` מחזירה `"Original error"`. זה שימושי לעטוף שגיאות ברמה נמוכה עם הקשר ברמה גבוהה.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={8}
  group="עקבות מחסנית"
  title="מניפולציית מחסנית"
  options={[
    {text: 'מסיר את createError מהמחסנית', isAnswer: true},
    {text: 'מנקה את כל המחסנית'},
    {text: 'לא עושה דבר'},
    {text: 'זורק TypeError'},
  ]}
>
  <slot name="question">
  <div className="question">
    מה עושה `Error.captureStackTrace`?
    ```js
        function createError(msg) {
          const err = new Error(msg);
          Error.captureStackTrace(err, createError);
          return err;
        }
        const error = createError('test');
    ```
  </div>
  </slot>

  <slot name="hints">
  <div className="hint">
    זהו תכונה ספציפית ל‑V8 למען עקבות מחסנית נקיים יותר.
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    `Error.captureStackTrace` (V8/Node.js) מסיר את הפונקציה שצוינה (`createError`) מעקבת המחסנית, מה שמסתיר פונקציות ייצור שגיאות מהמשתמש הקצה. כך נוצרות עקבות מחסנית נקיות יותר שמצביעות על המקום שבו הפקטורית נקראה, ולא על הפקטורית עצמה.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={9}
  group="תבניות הודעה"
  title="מחרוזות תבנית בשגיאות"
  options={[
    {text: '"Value ${value} is invalid"'},
    {text: '"Value undefined is invalid"', isAnswer: true},
    {text: 'ReferenceError: value is not defined'},
    {text: '"Value  is invalid"'},
  ]}
>
  <slot name="question">
  <div className="question">
    מה הודעת השגיאה?
    ```js
        function validate(value) {
          if (!value) {
            throw new Error(
              `Value ${value} is invalid`
            );
          }
        }
        try {
          validate(undefined);
        } catch (e) {
          console.log(e.message);
        }
    ```
  </div>
  </slot>

  <slot name="hints">
  <div className="hint">
    איך אינטרפולציית מחרוזת תבנית מתמודדת עם undefined?
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    מחרוזות תבנית ממירות `undefined` למחרוזת `"undefined"` במהלך האינטרפולציה. הודעת השגיאה הופכת ל-`"Value undefined is invalid"`. לקבלת הודעות נקיות יותר, שקול להשתמש ב-`value ?? 'null'` או בבדיקות דומות לפני האינטרפולציה.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={10}
  group="פיתויים ב‑API"
  title="שגיאת תגובה ב‑Express"
  options={[
    {text: 'שולח את אובייקט השגיאה המלא'},
    {text: 'שולח {"error":{}}', isAnswer: true},
    {text: 'זורק שגיאת שרת'},
    {text: 'שולח רק את הודעת השגיאה'},
  ]}
>
  <slot name="question">
  <div className="question">
    מה נשלח ללקוח?
    ```js
        // Express.js route
        app.get('/api/data', (req, res) => {
          const error = new Error('Database failed');
          res.json({ error });
        });
    ```
  </div>
  </slot>

  <slot name="hints">
  <div className="hint">
    זכור איך אובייקטי Error ממוריאלים על‑ידי JSON.stringify.
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    `res.json()` משתמש ב‑`JSON.stringify()` פנימית, ולכן אובייקט ה‑Error הופך ל‑`{}`. הלקוח מקבל `{"error":{}}`. כדי לתקן זאת, השתמש ב‑`res.json({ error: error.message })` או ב‑`res.json({ error: { message: error.message, name: error.name } })`.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={11}
  group="שגיאות אסינכרוניות"
  title="ערכי דחיית Promise"
  options={[
    {text: 'תמיד אובייקטי Error'},
    {text: 'כל ערך יכול להיות דחייה', isAnswer: true},
    {text: 'רק מחרוזות ואובייקטי Error'},
    {text: 'עוטף אוטומטית ב‑Error'},
  ]}
>
  <slot name="question">
  <div className="question">
    מה `Promise.reject()` יכול לקבל?
    ```js
        Promise.reject('string').catch(e => 
          console.log(typeof e)
        );
        Promise.reject({code: 404}).catch(e => 
          console.log(e.code)
        );
        Promise.reject(42).catch(e => 
          console.log(e)
        );
    ```
  </div>
  </slot>

  <slot name="hints">
  <div className="hint">
    דחיות של Promise פועלות כמו הצהרות throw.
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    כמו `throw`, `Promise.reject()` מקבל כל ערך – מחרוזות, אובייקטים, מספרים וכו'. זה מדפיס `"string"`, `404`, ו‑`42`. תמיד יש לבדוק את סוג הערכים שנתפסים בשרשראות promise, במיוחד כשעובדים עם קוד של צד שלישי שיכול לדחות עם ערכים שאינם Error.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={12}
  group="תכונות שגיאה"
  title="תכונות לא סטנדרטיות"
  options={[
    {text: 'תמיד זמינות'},
    {text: 'ייתכן ולא קיימות בכל הסביבות', isAnswer: true},
    {text: 'רק ב‑Node.js'},
    {text: 'מיושנות והוסרו'},
  ]}
>
  <slot name="question">
  <div className="question">
    כמה אמינות יש ל‑`error.code` ול‑`error.errno`?
    ```js
        const fs = require('fs');
        fs.readFile('missing.txt', (err, data) => {
          if (err) {
            console.log(err.code);    // 'ENOENT'
            console.log(err.errno);   // -2
          }
        });
    ```
  </div>
  </slot>

  <slot name="hints">
  <div className="hint">
    קחו בחשבון סביבות JavaScript שונות וסוגי שגיאות.
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    תכונות כמו `code` ו‑`errno` תלויות בסביבה (במקרה זה Node.js) ואינן חלק מאובייקט ה‑Error הסטנדרטי. שגיאות בדפדפן לא יכילו תכונות אלו. תמיד יש לבדוק אם הן קיימות: `if (err.code === 'ENOENT')` במקום להניח שהן קיימות.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={13}
  group="גבולות שגיאה"
  title="אובייקט מול זיהוי שגיאה"
  options={[
    {text: 'true, true'},
    {text: 'false, false', isAnswer: true},
    {text: 'true, false'},
    {text: 'false, true'},
  ]}
>
  <slot name="question">
  <div className="question">
    מה מחזירות הבדיקות האלה?
    ```js
        const fakeError = {
          name: 'Error',
          message: 'Fake error',
          stack: 'fake stack'
        };
    
        console.log(fakeError instanceof Error);
        console.log(Object.prototype.toString.call(
          fakeError
        ) === '[object Error]');
    ```
  </div>
  </slot>

  <slot name="hints">
  <div className="hint">
    בדיקה אחת מסתכלת על שרשרת הפרוטוטייפ, והשנייה על סלאטים פנימיים.
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    `instanceof Error` מחזיר `false` מכיוון שהאובייקט לא נוצר על‑ידי הקונסטרוקטור Error. `Object.prototype.toString.call()` גם הוא מחזיר `false` (הוא מחזיר `'[object Object]'`) מכיוון שהוא בודק את הסלאט הפנימי `[[Class]]`. שתי השיטות מזהות נכון שזהו אובייקט שגיאה מזויף.
  </div>
  </slot>
</Challenge>

</QuizUI>

## שלוט באמנות הטיפול בשגיאות

מתוך בעיות סיריאליזציה ועד כשלי instanceof במקשרים שונים, הקונספטים המתקדמים האלה מבדילים מפתחים מתחילים מ‑~מקצוענים מנוסים~ פגועים.

מוכן לאתגרים נוספים? בדוק את ה[אוסף החידונים המלא](../challenges/) לקבלת חידות נוספות על JavaScript, אלגוריתמים ועוד!
````
