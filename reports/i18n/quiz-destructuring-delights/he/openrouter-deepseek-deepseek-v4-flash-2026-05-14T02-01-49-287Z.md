# Translation Candidate
- Slug: quiz-destructuring-delights
- Locale: he
- Model: openrouter/deepseek/deepseek-v4-flash
- Target: src/content/posts/2024-11-12--quiz-destructuring-delights/he/index.mdx
- Validation: deferred
- Runtime seconds: 166.15
- Input tokens: 11787
- Output tokens: 21206
- Thinking tokens: unknown
- Cached input tokens: 3712
- Cache write tokens: 0
- Estimated cost: $0.007282
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
unlisted: false
title: 'חידון: תענוגות הפירוק'
subTitle: האם אתה מומחה בדיסטרקצ'רינג?
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
---
import Challenge from '../../../../components/QuizUI/Challenge';
import QuizUI from '../../../../components/QuizUI/QuizUI';

{/* Are you a maestero of Destructuring?<br/> */}
<p class="inset">או שזו <em>Symphony of Destruction</em> שלך?</p>

החידון הזה יבחן את הידע שלך ב-Destructuring ב-JavaScript: מתחביר אובייקט "בסיסי" ועד ל-Destructuring מקונן וערכי ברירת מחדל. בתוספת שאלות בונוס על TypeScript וטיפוסים מוטבעים!

קפוץ ישר לחימום - הוכח את כישורי ה-Destructuring שלך! 👇

<QuizUI>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={0}
  group="חימום: אובייקטים"
  title="פירוק אובייקט בסיסי"
  options={[
    {text: 'שם: Dan Levy, גיל: 20'},
    {text: 'שם: Dan Levy, גיל: 40'},
    {text: 'שם: Dan Levy, גיל: Infinity'},
    {text: 'שם: Dan Levy, גיל: undefined', isAnswer: true},
    {text: 'שגיאה: לא ניתן לקרוא את המאפיין \'age\''},
    {text: 'שם: undefined, גיל: 40'},
  ]}
>
  <slot name="question">
  <div className="question">
    מה ידפיס הקוד הזה?
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
    המאפיין `age` לא קיים על `person`, לכן `age` יהיה `undefined`. בהחלט לא `Infinity` 😅

    התוצאה היא:
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
  title="ערך ברירת מחדל ב-Destructuring של אובייקט"
  options={[
    {text: 'שם: Dan Levy, גיל: NaN'},
    {text: 'שם: Dan Levy, גיל: null'},
    {text: 'שם: Dan Levy, גיל: undefined', isAnswer: true},
    {text: 'שם: Dan Levy, גיל: 40'},
    {text: 'שגיאה: לא ניתן לבצע destructure למאפיין \'age\''},
    {text: 'שגיאת תחביר: אסימון לא צפוי \',\''},
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
    המשתנה `age` לא קיים במערך `tuple`, ולכן הוא יהיה `undefined`.

    התוצאה תהיה:
    ```plaintext
        Name: Dan Levy, Age: undefined
    ```
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={2}
  group="פירוק מבנה מקונן"
  title="פירוק מבנה מקונן"
  options={[
    {text: 'שם פרטי: דן, עיר: דנוור'},
    {text: 'שם פרטי: undefined, עיר: דנוור'},
    {text: 'שגיאה: לא ניתן לקרוא מאפיין \'first\''},
    {text: 'שם פרטי: דן, עיר: undefined'},
    {text: 'שגיאה', isAnswer: true},
  ]}
>
  <slot name="question">
  <div className="question">
    מה לגבי פירוק מבנה מקונן?
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
    המאפיין `birth: { place }` לא קיים באובייקט `person`, לכן הוא יזרוק שגיאה.
    פתרון אחד הוא לספק ערכי ברירת מחדל למאפיינים מקוננים.

    כאשר ניגשים למאפיינים מקוננים - היזהרו - כי השגיאות יכולות להיות קשות לאיתור. והודעות השגיאה משתנות בין דפדפנים ופלטפורמות אחרות, מה שהופך את הניפוי למאתגר יותר.

    בכרום מודרני: `TypeError: Cannot read properties of undefined (reading 'place')`

    ב-Node, גם זו `TypeError` כי JavaScript מנסה לפרק את `place` מ-`undefined` לפני ש-`place` נקרא אי פעם.

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
    {text: 'היי דן מ-Unknown'},
    {text: 'היי דן מ-Denver'},
    {text: 'היי Unknown מ-Unknown'},
    {text: 'היי Unknown מ-Denver'},
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
    המאפיין `birth` לא קיים על `person`, לכן האובייקט כולו עדיין צריך ברירת מחדל, לא רק המאפיין המקונן. בעצם חסרה ברירת מחדל של ` = {}` שם.

    הדרך שבה זה כתוב, אומרת "אם `person.birth` הוא `undefined`, אז `place` הוא `Unknown`". אבל `person.birth` הוא `undefined`, אז זה מנסה לפרק `undefined`, מה שגורם לשגיאה.
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
    {text: 'היי דן מדנוור'},
    {text: 'היי דן מיוהנסבורג'},
    {text: 'היי דן מ-Unknown', isAnswer: true},
    {text: 'היי Unknown מ-Unknown'},
    {text: 'היי Unknown מדנוור'},
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
    המאפיין `birth` לא קיים על `person`, אז הוא נופל לאובייקט ריק ` = {}`. זה מאפשר להשתמש בערך ברירת המחדל.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={5}
  group="ארגומנטים של פונקציה"
  title="פירוק פרמטרים של פונקציה עם ערכי ברירת מחדל"
  options={[
    {text: 'Hi Dan from undefined'},
    {text: 'Hi Dan from Unknown'},
    {text: 'Hi Dan from Denver'},
    {text: 'Hi Unknown from Unknown'},
    {text: 'Hi Unknown from Denver'},
    {text: 'Error', isAnswer: true},
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
    פונקציה זו מחלצת את המאפיינים `name` ו-`age`, תוך שימוש בערכי ברירת מחדל במידת הצורך. במקרה זה, המפתח `place` באובייקט ברירת המחדל הוא רק רעש, הוא לא בשימוש בתוך `displayUser()`.

    מצב קפדן (strict mode) לא משנה את זה: קריאה לקישור `place` שלא הוצהר זורקת `ReferenceError`.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={6}
  group="ארגומנטים של פונקציה"
  title="פירוק מבנה עם ערכי ברירת מחדל מקוננים"
  options={[
    {text: 'לא ידוע, לא ידוע, Joburg'},
    {text: 'לא ידוע, לא ידוע, לא ידוע'},
    {text: 'לא ידוע, `undefined`, Joburg'},
    {text: 'N/A, `undefined`, Joburg'},
    {text: 'N/A, לא ידוע, Joburg'},
    {text: 'N/A, N/A, Joburg', isAnswer: true},
    {text: 'לא ידוע, N/A, Joburg'},
    {text: 'שגיאה'},
  ]}
>
  <slot name="question">
  <div className="question">
    איך מטפלים בערכים `undefined`?
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
    הפונקציה `displayPlace` תשתמש באובייקט ברירת מחדל רק אם לא הועבר אובייקט. לכן, הדרך היחידה לקבל את ברירת המחדל `{ place: "Unknown" }` היא עם אפס ארגומנטים `displayPlace()`.

    התנהגות בולטת נוספת כאן היא שהעברת `undefined` עבור `place` תגרום לשימוש בערך ברירת המחדל, בדומה להתנהגות של `JSON.stringify` (מתעלמת מ-`undefined`, מזהה `null`).

    התוצאה היא:
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
  title="פירוק מבנה עם ערכי ברירת מחדל מקוננים"
  options={[
    {text: 'לא זמין, לא זמין'},
    {text: 'לא זמין, undefined'},
    {text: 'לא ידוע, לא זמין'},
    {text: 'לא ידוע, לא ידוע'},
    {text: 'לא ידוע, undefined'},
    {text: 'null, לא זמין', isAnswer: true},
    {text: 'null, לא ידוע'},
    {text: 'null, undefined'},
    {text: 'שגיאה'},
  ]}
>
  <slot name="question">
  <div className="question">
    דומה לשאלה הקודמת... איך מטפלים ב-`null`?_
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
    במקרה זה, המאפיין `place` מוגדר ל-`null` בקריאה הראשונה, ול-`undefined` בשנייה. ערך ברירת המחדל עבור `place` משמש רק אם האובייקט כולו חסר **או** `undefined`. ערכי null יגיעו כ-`null`.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={8}
  group="טיפוסים מוטבעים ב-TypeScript"
  title="פירוק מבנה עם ערכי ברירת מחדל מקוננים"
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
    עכשיו ב-TypeScript... _מה זה יעשה?_
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
    TypeScript מדווח על שגיאה מכיוון ש-`place` מוגדר כ-`string`, אך הקריאה מעבירה `null`. הקריאה גם משמיטה את המאפיין הנדרש `age`.

    אם תתעלם משגיאות הטיפוס, הרצת הקוד תדפיס `null` לקונסולה.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={9}
  group="TypeScript: עם השמה"
  title="פירוק מבנה עם ערכי ברירת מחדל מקוננים"
  options={[
    {text: 'undefined'},
    {text: 'null'},
    {text: 'N/A'},
    {text: 'Unknown'},
    {text: 'Denver', isAnswer: true},
    {text: 'SyntaxError'},
    {text: 'Error: Invalid type'},
    {text: 'Error: Invalid Arguments'},
  ]}
>
  <slot name="question">
  <div className="question">
    בואו ננסה שינוי שם/השמה...
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
    הדבר ידפיס `Denver` לקונסולה. המאפיין `place` שונה לשם `location` בחתימת הפונקציה. זהו דפוס נפוץ (שינוי שמות מאפיינים במהלך פירוק מבנה) בעת התאמת מבני נתונים מצד שלישי.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={10}
  group="פירוק מבנה מקונן ב-TypeScript"
  title="פירוק מבנה עם ערכי ברירת מחדל מקוננים"
  options={[
    {text: 'שגיאה: חסרה התכונה \'first\''},
    {text: 'שגיאה: חסרה התכונה \'last\''},
    {text: 'שגיאה: חסרות התכונות \'birth\' ו-\'age\'', isAnswer: true},
    {text: 'שגיאה: חסרה התכונה \'place\''},
    {text: 'שגיאה: ל-\'string\' אין תכונות ב-{...}'},
  ]}
>
  <slot name="question">
  <div className="question">
    זהה את שגיאת הטיפוס:
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
    השגיאה היא בחתימת הפונקציה `greet`. התכונות `age` ו-`birth` חסרות באובייקט שהועבר, ולכן הן צריכות להיות אופציונליות בהגדרת הטיפוס.

    למרות שהתכונה `birth` מפורקת עם ערך ברירת מחדל, הגדרת הטיפוס דורשת שהיא תהיה קיימת. כדי לסמן תכונה כאופציונלית ב-TypeScript, יש להשתמש באופרטור `?`.

    שים לב ש-`birth?: { place?: string }` אינו זהה ל-`birth: { place?: string } | undefined`.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={11}
  group="TypeScript + השמה"
  title="פירוק מבנה עם ערכים מקוננים, השמה וטיפוסים"
  options={[
    {text: 'Hi Dan Levy from N/A'},
    {text: 'Hi Dan Levy from Cape Town'},
    {text: 'Hi N/A N/A from N/A'},
    {text: 'Hi N/A N/A from Cape Town'},
    {text: 'Error', isAnswer: true},
  ]}
>
  <slot name="question">
  <div className="question">
    עכשיו עם **השמה** (שימו לב למשתנים `f`, `l` ו-`p`)
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
    עוד שגיאה! אתם מתחילים לנחש, נכון?!

    קשה לקרוא שכבות של פירוק מבנה, עם ברירות מחדל, השמה וטיפוסים!

    ברגע ש-`place` מושם מחדש למשתנה `p`, הוא כבר לא מוגדר בטווח של פקודת `console.log`.
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
