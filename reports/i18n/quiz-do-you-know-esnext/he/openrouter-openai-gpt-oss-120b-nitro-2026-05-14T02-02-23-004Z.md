# Translation Candidate
- Slug: quiz-do-you-know-esnext
- Locale: he
- Model: openrouter/openai/gpt-oss-120b:nitro
- Target: src/content/posts/2024-10-31--quiz-do-you-know-esnext/he/index.mdx
- Validation: deferred
- Runtime seconds: 25.60
- Input tokens: 11327
- Output tokens: 6927
- Thinking tokens: unknown
- Cached input tokens: 3328
- Cache write tokens: 0
- Estimated cost: $0.002161
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
title: 'חידון: האם אתה מכיר את JavaScript המודרני?'
subTitle: הוכיחו את כישורי ה‑JavaScript המוערכים שלכם!
label: ES2019+ Features
social_image: ../desktop-social.webp
category: Quiz
subCategory: JavaScript
unlisted: false
date: '2024-10-31'
modified: '2024-11-08'
tags:
  - quiz
  - javascript
  - intro
  - esnext
  - features
  - intermediate
cover_full_width: ../christopher-burns-8KfCR12oeUM-unsplash-wide.webp
cover_mobile: ../christopher-burns-8KfCR12oeUM-unsplash-square.webp
cover_icon: ../christopher-burns-8KfCR12oeUM-unsplash-square.webp
---
import Challenge from '../../../../components/QuizUI/Challenge';
import QuizUI from '../../../../components/QuizUI/QuizUI';


### אתה יודע להבדיל בין ES2015 ל‑ES2022?

* **הוכח את המיומנות שלך ב‑JavaScript!** 🚀
* אין צורך בכניסה או הרשמה. ✨
* בחירה מרובה. 🤖 … _כמה זה יכול להיות קשה, נכון?_

<QuizUI>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={0}
  group="ES2020"
  title="איחוד null"
  options={[
    {text: '42'},
    {text: 'null'},
    {text: 'undefined'},
    {text: '100', isAnswer: true},
  ]}
>
  <slot name="question">
  <div className="question">
    מה הערך של `result`?
    ```js
        console.log(null ?? 100);
    ```
  </div>
  </slot>

  <slot name="hints">
  <div className="hint">
    בדוק את המשמעות המדויקת של האופרטור ב‑JavaScript. התשובה הפיתית היא לעיתים מה שהסינטקס הישן היה עושה, ולא מה שהפיצ'ר הזה עושה.
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    אופרטור האיחוד null (`??`) מחזיר את האופרנד בצד ימין (`b`) אם האופרנד בצד שמאל (`a`) הוא `null` או `undefined`. במקרה הזה, `a` הוא `null`, ולכן `result` הוא `100`.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={1}
  group="ES2020"
  title="איחוד נול"
  options={[
    {text: 'false', isAnswer: true},
    {text: '42'},
    {text: 'null'},
    {text: 'undefined'},
    {text: '100'},
  ]}
>
  <slot name="question">
  <div className="question">
    מה יהיה הפלט של הקוד הבא?
    ```js
        const value = false;
        const defaultVal = 42;
        console.log(value ?? defaultVal);
    ```
  </div>
  </slot>

  <slot name="hints">
  <div className="hint">
    בדוק את המשמעות המדויקת של האופרטור ב‑JavaScript. התשובה המפתה היא לרוב מה שהסינטקס הישן היה עושה, ולא מה שהפיצ'ר הזה עושה.
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    אופרטור האיחוד נול (`??`) מתייחס לערכים ש‑falsey כמו `false` כערכים תקינים. מכיוון שה‑`value` הוא `false`, הוא נחשב לערך תקין ומוחזר.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={2}
  group="שרשרת אופציונלית"
  title="שרשרת אופציונלית"
  options={[
    {text: 'undefined', isAnswer: true},
    {text: 'Error: Cannot read property of undefined'},
    {text: 'null'},
    {text: '100'},
  ]}
>
  <slot name="question">
  <div className="question">
    מה הפלט של הקוד הבא?
    ```js
        const obj = { foo: null };
        const result = obj.foo?.bar;
        console.log(result);
    ```
  </div>
  </slot>

  <slot name="hints">
  <div className="hint">
    בדוק את המשמעות המדויקת של האופרטור ב‑JavaScript. התשובה המפתה היא לעיתים מה שהסינטקס הישן היה עושה, ולא מה שהפיצ'ר הזה עושה.
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    האופרטור של שרשרת אופציונלית (`?.`) עוצר את ההערכה אם הצד השמאלי הוא `null` או `undefined`. מכיוון ש‑`obj.foo` הוא `null`, `obj.foo?.bar` מחזיר `undefined`.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={3}
  group="BigInt"
  title="שימוש ב‑BigInt"
  options={[
    {text: 'TypeError: אי אפשר לערבב BigInt עם מספר'},
    {text: '42n'},
    {text: '84n', isAnswer: true},
    {text: 'undefined'},
  ]}
>
  <slot name="question">
  <div className="question">
    מה הפלט של הקוד הבא?
    ```js
        const a = 42n;
        const result = a * 2n;
        console.log(result);
    ```
  </div>
  </slot>

  <slot name="hints">
  <div className="hint">
    בדוק את תחביר האופרטורים המדויק של JavaScript. התשובה המפתה היא לעיתים מה שהסינטקס הישן היה עושה, ולא מה שהמאפיין החדש עושה.
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    ערכי BigInt נוצרים על‑ידי הוספת `n` למספר. אי אפשר לערבב BigInt עם מספרים רגילים בפעולות חשבון. כאן, שני הערכים הם BigInt, ולכן הכפל עובד, והתוצאה היא `84n`.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={4}
  group="ייבוא דינמי"
  title="תחביר ייבוא דינמי"
  options={[
    {text: 'SyntaxError'},
    {text: 'Promise'},
    {text: 'Module'},
    {text: 'object', isAnswer: true},
    {text: 'undefined'},
  ]}
>
  <slot name="question">
  <div className="question">
    מה זה מדפיס?
    ```js
        const modulePromise = import('./myModule.js');
        console.log(typeof modulePromise);
    ```
  </div>
  </slot>

  <slot name="hints">
  <div className="hint">
    בדוק את המשמעות המדויקת של האופרטור ב‑JavaScript. התשובה הפיתית היא לרוב מה שהסינטקס הישן היה עושה, ולא מה שהפונקציה הזו עושה.
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    הפונקציה `import()` מחזירה `Promise` שמתממש למען אובייקט המודול. מכיוון שמופעי `Promise` הם אובייקטים, `typeof modulePromise` מדפיס `'object'`.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={5}
  group="Promise.allSettled"
  title="Promise.allSettled"
  options={[
    {text: 'הושג: success', isAnswer: true},
    {text: 'נדחה: error'},
    {text: 'ממתין'},
    {text: 'null'},
  ]}
>
  <slot name="question">
  <div className="question">
    מה יהיה התוצאה של הקוד הבא?
    ```js
        const promises = [
          Promise.resolve('success'),
          Promise.reject('error')
        ];
        Promise.allSettled(promises).then(results => {
          console.log(results[0].status + ': ' + results[0].value);
        });
    ```
  </div>
  </slot>

  <slot name="hints">
  <div className="hint">
    בדוק את תחביר האופרטור המדויק ב‑JavaScript. התשובה המפתה היא לעיתים מה שהסינטקס הישן היה עושה, ולא מה שהפיצ'ר הזה עושה.
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    `Promise.allSettled` מחזיר מערך של אובייקטים המתארים את תוצאת כל הבטחה. ההבטחה הראשונה היא `fulfilled` עם הערך `'success'`, ולכן משפט ה‑log ידפיס `fulfilled: success`.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={6}
  group="String.matchAll"
  title="שימוש ב‑String.matchAll"
  options={[
    {text: 'מערך של התאמות'},
    {text: 'איטרטור של התאמות', isAnswer: true},
    {text: 'שגיאה: קריאה לא חוקית'},
    {text: 'null'},
  ]}
>
  <slot name="question">
  <div className="question">
    מה מחזירה הפונקציה `str.matchAll()`?
    ```js
        const str = 'foo1bar2baz3';
        const matches = str.matchAll(/\d/g);
    ```
  </div>
  </slot>

  <slot name="hints">
  <div className="hint">
    בדוק את המשמעות המדויקת של האופרטור ב‑JavaScript. התשובה המפתה היא לעיתים מה שהסינטקס הישן היה עושה, ולא מה שהפונקציה הזו עושה.
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    `String.matchAll` מחזירה איטרטור של התאמות, ולא מערך. ניתן להשתמש באיטרטור הזה כדי לקבל את כל קבוצות ההתאמה ממחרוזת.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={7}
  group="מטא ייבוא"
  title="שימוש ב‑import.meta"
  options={[
    {text: 'כתובת ה‑URL של המודול הנוכחי', isAnswer: true},
    {text: 'חותמת זמן נוכחית'},
    {text: 'undefined'},
    {text: 'SyntaxError'},
  ]}
>
  <slot name="question">
  <div className="question">
    מה מייצג `import.meta.url`?
    ```js
        console.log(import.meta.url);
    ```
  </div>
  </slot>

  <slot name="hints">
  <div className="hint">
    בדוק את המשמעות המדויקת של האופרטור ב‑JavaScript. התשובה הפיתית היא לעיתים מה שהסינטקס הישן היה עושה, ולא מה שהמאפיין הזה עושה.
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    `import.meta` הוא אובייקט שמכיל מטא‑נתונים על המודול הנוכחי. המאפיין `import.meta.url` מייצג את כתובת ה‑URL של המודול הנוכחי, וניתן להשתמש בו כדי לקבל מידע על מיקום הרצת הסקריפט.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={8}
  group="הקצאה לוגית"
  title="הקצאה לוגית"
  options={[
    {text: '5'},
    {text: '10', isAnswer: true},
    {text: 'undefined'},
    {text: 'null'},
  ]}
>
  <slot name="question">
  <div className="question">
    מה הערך של `a` אחרי ההקצאה הלוגית?
    ```js
        let a = null;
        a ||= 10;
        console.log(a);
    ```
  </div>
  </slot>

  <slot name="hints">
  <div className="hint">
    בדוק את המשמעות המדויקת של האופרטור ב‑JavaScript. התשובה המפתה היא לעיתים מה שהסינטקס הישן היה עושה, ולא מה שהפיצ'ר הזה עושה.
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    הקצאת OR לוגית (`||=`) משייכת את הערך מימין אם הערך משמאל הוא falsy (`null`, `undefined`, `0`, `false`, וכו'). מכיוון ש‑`a` הוא `null`, הוא מקבל את הערך `10`.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={9}
  group="הקצאת Nullish לוגית"
  title="הקצאת Nullish לוגית"
  options={[
    {text: '5'},
    {text: '10', isAnswer: true},
    {text: 'undefined'},
    {text: 'null'},
  ]}
>
  <slot name="question">
  <div className="question">
    מה הערך של `b` אחרי הקצאת ה‑nullish?
    ```js
        let b = null;
        b ??= 10;
        console.log(b);
    ```
  </div>
  </slot>

  <slot name="hints">
  <div className="hint">
    בדוק את המשמעות המדויקת של האופרטור ב‑JavaScript. התשובה המפתה היא לעיתים מה שהסינטקס הישן היה עושה, ולא מה שהפיצ'ר הזה עושה.
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    הקצאת האיחוד ה‑nullish (`??=`) משייכת את הערך מימין אם הערך משמאל הוא `null` או `undefined`. מכיוון ש‑`b` הוא `null`, הוא מקבל את הערך `10`.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={10}
  group="WeakRef"
  title="שימוש ב‑WeakRef"
  options={[
    {text: 'ReferenceError'},
    {text: '{ data: \'important\' }', isAnswer: true},
    {text: 'null'},
    {text: 'undefined'},
  ]}
>
  <slot name="question">
  <div className="question">
    מה `WeakRef` מספק?
    ```js
        const obj = { data: 'important' };
        const ref = new WeakRef(obj);
        console.log(ref.deref());
    ```
  </div>
  </slot>

  <slot name="hints">
  <div className="hint">
    בדוק את המשמעות המדויקת של האופרטור ב‑JavaScript. התשובה המפתה היא לעיתים מה שהסינטקס הישן היה עושה, ולא מה שהפיצ'ר הזה עושה.
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    `WeakRef` מספק הפנייה חלשה לאובייקט, שמאפשרת לאובייקט להימחק על ידי מנגנון איסוף הזבל אם אין הפניות אחרות. מכיוון ש‑`obj` עדיין מקבל הפנייה חזקה כאן, `deref()` מחזיר את האובייקט המקורי. אם המטרה הייתה נגררת, `deref()` היה מחזיר `undefined`.
  </div>
  </slot>
</Challenge>

</QuizUI>
````
