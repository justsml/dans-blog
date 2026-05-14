# Translation Candidate
- Slug: quiz-destructuring-delights
- Locale: he
- Model: openrouter/openai/gpt-oss-120b:nitro
- Target: src/content/posts/2024-11-12--quiz-destructuring-delights/he/index.mdx
- Validation: deferred
- Runtime seconds: 27.47
- Input tokens: 13044
- Output tokens: 9554
- Thinking tokens: unknown
- Cached input tokens: 5376
- Cache write tokens: 0
- Estimated cost: $0.002815
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
unlisted: false
title: 'חידון: תענוגות הפירוק'
subTitle: האם אתה מומחה לפירוק מבנים?
label: Destructuring
social_image: ../desktop-social.webp
category: Quiz
subCategory: JavaScript
date: '2024-11-12'
modified: '2024-11-16'
tags:
  - quiz
  - intro
  - javascript
  - es2015
  - destructuring
  - beginner
  - intermediate
cover_full_width: ../boxes-of-nesting-dolls.webp
cover_mobile: ../boxes-of-nesting-dolls-square.webp
cover_icon: ../boxes-of-nesting-dolls-square.webp
---
import Challenge from '../../../../components/QuizUI/Challenge';
import QuizUI from '../../../../components/QuizUI/QuizUI';

/*{ Are you a maestero of Destructuring?<br/> }*/ 
<p class="inset">או שזה ה<em>סימפוניה של הרס?</em></p>

הקוויז הזה בודק את הידע שלך בפירוק (Destructuring) ב‑JavaScript: מהסינטקס הבסיסי של אובייקטים, דרך פירוק מקונן ועד ערכי ברירת מחדל. בנוסף, יש שאלות בונוס על TypeScript וסוגים inline!

קפוץ ישר לחימום – הוכח את המיומנויות שלך בפירוק! 👇

<QuizUI>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={0}
  group="חימום: אובייקטים"
  title="פירוק אובייקט בסיסי"
  options={[
    {text: 'שם: Dan Levy, גיל: 20'},
    {text: 'שם: Dan Levy, גיל: 40'},
    {text: 'שם: Dan Levy, גיל: אינסוף'},
    {text: 'שם: Dan Levy, גיל: undefined', isAnswer: true},
    {text: 'שגיאה: לא ניתן לקרוא את המאפיין \'age\''},
    {text: 'שם: undefined, גיל: 40'},
  ]}
>
  <slot name="question">
  <div className="question">
    מה הקוד הזה ידפיס?
    ```js
        const person = {
          name: 'Dan Levy',
          location: 'Cape Town',
        };
        const { name, age } = person;
        console.log(`Name: ${name}, Age: ${age}`);
    ```
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    המאפיין `age` אינו קיים ב-`person`, ולכן `age` יהיה `undefined`. בהחלט לא `Infinity` 😅

    זה מניב:
    ```plaintext
        Name: Dan Levy, Age: undefined
    ```
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={1}
  group="חימום: מערכים"
  title="ערך ברירת מחדל בפירוק אובייקט"
  options={[
    {text: 'שם: Dan Levy, גיל: NaN'},
    {text: 'שם: Dan Levy, גיל: null'},
    {text: 'שם: Dan Levy, גיל: undefined', isAnswer: true},
    {text: 'שם: Dan Levy, גיל: 40'},
    {text: 'שגיאה: לא ניתן לפרק את המאפיין \'age\''},
    {text: 'SyntaxError: Unexpected token \',\''},
  ]}
>
  <slot name="question">
  <div className="question">
    מה הקוד הזה יעשה?
    ```js
        const person = [ 'Dan Levy', 'Cape Town' ];
        const [ name, origin, age ] = person;
        console.log(`Name: ${name}, Age: ${age}`);
    ```
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    המשתנה `age` אינו קיים במערך `tuple`, ולכן יהיה `undefined`.

    זה מוביל ל:
    ```plaintext
        Name: Dan Levy, Age: undefined
    ```
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={2}
  group="פירוק מקונן"
  title="פירוק מקונן"
  options={[
    {text: 'ראשון: Dan, עיר: Denver'},
    {text: 'ראשון: undefined, עיר: Denver'},
    {text: 'שגיאה: לא ניתן לקרוא את המאפיין \'first\''},
    {text: 'ראשון: Dan, עיר: undefined'},
    {text: 'שגיאה', isAnswer: true},
  ]}
>
  <slot name="question">
  <div className="question">
    מה לגבי פירוק מקונן?
    ```js
        'use strict';
        const person = {
          name: { first: 'Dan' },
          address: { city: 'Denver' },
        };
        const {
          name: { first },
          address: { city },
          birth: { place },
        } = person;
        console.log(
          `First: ${first}, City: ${place}`,
        );
    ```
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    `birth: { place }` אינו קיים ב‑`person`, ולכן ייזרק שגיאה.
    פתרון אחד הוא לספק ערכי ברירת מחדל לתכונות מקוננות.

    כשמחפשים תכונות מקוננות – היו זהירים – כי השגיאות יכולות להיות קשות לזיהוי. והודעות השגיאה משתנות בין דפדפנים ופלטפורמות, מה שמקשה על ניפוי באגים.

    ב‑Chrome מודרני: `TypeError: Cannot read properties of undefined (reading 'place')`

    ב‑Node זה גם `TypeError` מכיוון ש‑JavaScript מנסה לפרק את `place` מ‑`undefined` לפני שה‑`place` נקרא.

    הניסוח המדויק משתנה בין דפדפנים וסביבות ריצה.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={3}
  group="ברירות מחדל"
  title="ערכי ברירת מחדל בפירוק אובייקטים"
  options={[
    {text: 'היי דן מ‑לא ידוע'},
    {text: 'היי דן מדנבר'},
    {text: 'היי לא ידוע מ‑לא ידוע'},
    {text: 'היי לא ידוע מדנבר'},
    {text: 'שגיאה', isAnswer: true},
  ]}
>
  <slot name="question">
  <div className="question">
    עכשיו עם כמה ברירות מחדל, מה זה יעשה?
    ```js
        'use strict';
        const person = {
          name: { first: 'Dan' },
          address: { city: 'Denver' },
        };
        const {
          name: { first = 'Unknown' },
          birth: { place = 'Unknown' },
        } = person;
        console.log(
          `Hi ${first} from ${place}`,
        );
    ```
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    המאפיין `birth` אינו קיים ב‑`person`, ולכן כל האובייקט עדיין צריך ערך ברירת מחדל, לא רק המאפיין הפנימי. בעצם חסר ברירת מחדל ` = {}` שם.

    הצורה הזו אומרת "אם `person.birth` הוא `undefined`, אז `place` הוא `Unknown`". אבל `person.birth` הוא `undefined`, ולכן מנסים לפרק `undefined`, מה שמוביל לשגיאה.
    ```plaintext
        In modern Chrome: `TypeError: Cannot read properties of undefined (reading 'place')`

        In Node, this is also a `TypeError` because JavaScript tries to destructure `place` from `undefined`.

        Exact wording varies between browsers and runtimes.
    ```
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={4}
  group="ברירות מחדל"
  title="ערכי ברירת מחדל בפירוק אובייקטים"
  options={[
    {text: 'היי דן מדנבר'},
    {text: 'היי דן מג\'והנסבורג'},
    {text: 'היי דן מבלתי ידוע', isAnswer: true},
    {text: 'היי בלתי ידוע מבלתי ידוע'},
    {text: 'היי בלתי ידוע מדנבר'},
    {text: 'שגיאה'},
  ]}
>
  <slot name="question">
  <div className="question">
    מה זה יעשה?
    ```js
        const person = {
          name: { first: 'Dan' },
          address: { city: 'Denver' },
        };
        const {
          name: { first = 'Unknown' },
          birth: { place = 'Unknown' } = {},
        } = person;

        console.log(
          `Hi ${first} from ${place}`,
        );
    ```
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    המאפיין `birth` אינו קיים ב-`person`, ולכן הוא חוזר לאובייקט ריק ` = {}`. זה מאפשר להשתמש בערך ברירת המחדל.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={5}
  group="ארגומנטים של פונקציה"
  title="פירוק פרמטרי פונקציה עם ערכי ברירת מחדל"
  options={[
    {text: 'היי Dan מ‑undefined'},
    {text: 'היי Dan מ‑Unknown'},
    {text: 'היי Dan מ‑Denver'},
    {text: 'היי Unknown מ‑Unknown'},
    {text: 'היי Unknown מ‑Denver'},
    {text: 'שגיאה', isAnswer: true},
  ]}
>
  <slot name="question">
  <div className="question">
    עכשיו כפרמטרים של פונקציה, מה זה יעשה?
    ```js
        'use strict';
        function displayUser({
          name = "Unknown",
          age = -1,
        } = { place: "Unknown" }) {
          console.log(`Hi ${name} from ${place}`);
        }
        displayUser({ name: "Dan" });
    ```
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    הפונקציה הזו מחלצת את המאפיינים `name` ו‑`age`, ומשתמשת בערכי ברירת מחדל במידת הצורך. במקרה הזה, המפתח `place` באובייקט ברירת המחדל הוא רק רעש, והוא לא משמש בתוך `displayUser()`.

    מצב קפדני (strict mode) לא משנה כאן: קריאת הקישור הלא מוכר `place` גוררת `ReferenceError`.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={6}
  group="ארגומנטים של פונקציה"
  title="פירוק עם ערכי ברירת מחדל מקוננים"
  options={[
    {text: 'לא ידוע, לא ידוע, Joburg'},
    {text: 'לא ידוע, לא ידוע, לא ידוע'},
    {text: 'לא ידוע, `undefined`, Joburg'},
    {text: 'לא זמין, `undefined`, Joburg'},
    {text: 'לא זמין, לא ידוע, Joburg'},
    {text: 'לא זמין, לא זמין, Joburb', isAnswer: true},
    {text: 'לא ידוע, לא זמין, Joburg'},
    {text: 'שגיאה'},
  ]}
>
  <slot name="question">
  <div className="question">
    איך מתמודדים עם ערכי `undefined`?
    ```js
        'use strict';
        function displayPlace({
          name = "N/A",
          place = "N/A",
          age = -1,
        } = { place: "Unknown" }) {
          console.log(`${place}`);
        }
        displayPlace({ name: "Dan" });
        displayPlace({ name: "Dan", place: undefined });
        displayPlace({ name: "Dan", place: "Joburg" });
    ```
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    הפונקציה `displayPlace` תשתמש ב‑אובייקט ברירת מחדל רק אם לא מועבר אובייקט. לכן, הדרך היחידה לקבל את ברירת המחדל `{ place: "Unknown" }` היא ללא ארגומנטים `displayPlace()`.

    התנהגות נוספת חשובה כאן היא שמעבר `undefined` עבור `place` יגרום לשימוש בערך ברירת המחדל, בדומה במקצת להתנהגות של `JSON.stringify` (מתעלם מ‑`undefined`, מזהה `null`).

    זה מוביל ל‑:
    ```js
        displayPlace() // Unknown
        displayPlace({ name: "Dan" }) // N/A
        displayPlace({ name: "Dan", place: undefined }) // N/A
    ```
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={7}
  group="ארגומנטים של פונקציה"
  title="פירוק עם ערכי ברירת מחדל מקוננים"
  options={[
    {text: 'N/A, N/A'},
    {text: 'N/A, undefined'},
    {text: 'Unknown, N/A'},
    {text: 'Unknown, Unknown'},
    {text: 'Unknown, undefined'},
    {text: 'null, N/A', isAnswer: true},
    {text: 'null, Unknown'},
    {text: 'null, undefined'},
    {text: 'Error'},
  ]}
>
  <slot name="question">
  <div className="question">
    בדומה לקודם... איך מתמודדים עם `null`?_
    ```js
        function displayPlace({
          name = "N/A",
          place = "N/A",
          age = -1,
        } = { place: "Unknown" }) {
          console.log(`${place}`);
        }
        displayPlace({ name: "Dan", place: null });
        displayPlace({ name: "Dan", place: undefined });
    ```
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    במקרה הזה, המאפיין `place` מוגדר ל-`null` בקריאה הראשונה, ול-`undefined` בשנייה. ערך ברירת המחדל עבור `place` משמש רק אם האובייקט כולו חסר **או** `undefined`. ערכי `null` יעברו כ-`null`.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={8}
  group="סוגים פנימיים ב‑TypeScript"
  title="פירוק עם ערכי ברירת מחדל מקוננים"
  options={[
    {text: 'N/A'},
    {text: 'undefined'},
    {text: 'לא ידוע'},
    {text: '\'null\''},
    {text: 'שגיאת TypeScript', isAnswer: true},
  ]}
>
  <slot name="question">
  <div className="question">
    עכשיו ב‑TypeScript... _מה זה יעשה?_
    ```ts
        'use strict';
        function displayPlace(
          {
            name = 'N/A',
            place = 'N/A',
          }: {
            name: string;
            place: string;
            age: number;
          },
        ) {
          console.log(`${place}`);
        }
        displayPlace({ name: 'Dan', place: null });
    ```
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    TypeScript מדווחת על שגיאה מכיוון שה‑`place` מוגדר כ‑`string`, אבל הקריאה מעבירה `null`. הקריאה גם משאירה את המאפיין הדרוש `age`.

    אם תתעלם משגיאות סוג, הרצת הקוד תדפיס `null` למסוף.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={9}
  group="TypeScript: עם השמה"
  title="פירוק עם ערכי ברירת מחדל מקוננים"
  options={[
    {text: 'undefined'},
    {text: 'null'},
    {text: 'N/A'},
    {text: 'לא ידוע'},
    {text: 'Denver', isAnswer: true},
    {text: 'SyntaxError'},
    {text: 'Error: סוג לא תקין'},
    {text: 'Error: ארגומנטים לא תקינים'},
  ]}
>
  <slot name="question">
  <div className="question">
    בואו ננסה קצת שינוי שם/השמה...
    ```ts
        'use strict';
        function displayPlace({
          name = 'N/A',
          place: location = 'N/A',
        }: {
          name: string;
          place: string;
          age?: number;
        }) {
          console.log(`${location}`);
        }
        displayPlace({ name: 'Dan', place: 'Denver' });
    ```
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    זה ידפיס `Denver` למסוף. המאפיין `place` משונה לשם `location` בחתימת הפונקציה. זה תבנית נפוצה (שינוי שם של מאפיינים במהלך פירוק) כשמתאימים מבני נתונים של צד שלישי.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={10}
  group="פירוק מקונן ב‑TS"
  title="פירוק עם ערכי ברירת מחדל מקוננים"
  options={[
    {text: 'שגיאה: המאפיין \'first\' חסר'},
    {text: 'שגיאה: המאפיין \'last\' חסר'},
    {text: 'שגיאה: המאפיינים \'birth\' ו‑\'age\' חסרים', isAnswer: true},
    {text: 'שגיאה: המאפיין \'place\' חסר'},
    {text: 'שגיאה: ל‑\'string\' אין מאפיינים ב‑{...}'},
  ]}
>
  <slot name="question">
  <div className="question">
    אתרו את שגיאת הטיפוס:
    ```ts
        function greet({
          name: {first = "N/A", last = "N/A"},
          birth: {place = "N/A"} = {},
          age = -1,
        }: {
          name: {first?: string, last?: string};
          birth: {place?: string};
          age: number;
        }) {
          console.log(`Hi ${first} ${last} from ${place}`);
        }
        greet({ name: {first: 'Dan'} });
    ```
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    השגיאה בחתימת הפונקציה `greet`. המאפיינים `age` ו‑`birth` חסרים באובייקט שהועבר, ולכן הם צריכים להיות אופציונליים בהגדרת הטיפוס.

    למרות שהמאפיין `birth` מפורק עם ערך ברירת מחדל, הגדרת הטיפוס דורשת שהוא יהיה קיים. כדי לסמן מאפיין כאופציונלי ב‑TypeScript, יש להשתמש באופרטור `?`.

    שים לב ש‑`birth?: { place?: string }` אינו זהה ל‑`birth: { place?: string } | undefined`.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={11}
  group="TypeScript + השמה"
  title="פירוק עם ערכים מקוננים, השמה וסוגים"
  options={[
    {text: 'היי Dan Levy מ- N/A'},
    {text: 'היי Dan Levy מ‑Cape Town'},
    {text: 'היי N/A N/A מ- N/A'},
    {text: 'היי N/A N/A מ‑Cape Town'},
    {text: 'שגיאה', isAnswer: true},
  ]}
>
  <slot name="question">
  <div className="question">
    עכשיו עם **השמה** (שימו לב למשתנים `f`, `l` ו‑`p`)
    ```ts
        'use strict';
        function greet(
          {
            name: {first: f = "N/A", last: l = "N/A"},
            birth: {place: p = "N/A"} = {},
            age = -1,
          }: {
            name: {first?: string, last?: string};
            birth?: {place?: string};
            age?: number;
          }
        ) {
          console.log(`Hi ${f} ${l} from ${place}`);
          // What will 👆 do?
        }
        greet({
          name: {first: 'Dan', last: 'Levy'},
          birth: {place: 'Cape Town'},
        });
    ```
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    שגיאה נוספת! אתה מתחיל לנחש, נכון?!

    זה קשה לקרוא שכבות של פירוק, עם ערכי ברירת מחדל, השמה וסוגים!

    ברגע ש‑`place` משוייכת מחדש למשתנה `p` היא כבר לא מוגדרת בטווח של משפט `console.log`.
    ```ts
        console.log(`Hi ${f} ${l} from ${place}`); // ❌
        // to:
        console.log(`Hi ${f} ${l} from ${p}`); // ✅
    ```
  </div>
  </slot>
</Challenge>

</QuizUI>
````
