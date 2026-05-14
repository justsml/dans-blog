# Translation Candidate
- Slug: quiz-modern-css-2025
- Locale: he
- Model: openrouter/openai/gpt-oss-120b:nitro
- Target: src/content/posts/2024-11-07--quiz-modern-css-2025/he/index.mdx
- Validation: deferred
- Runtime seconds: 27.00
- Input tokens: 11258
- Output tokens: 8212
- Thinking tokens: unknown
- Cached input tokens: 3584
- Cache write tokens: 0
- Estimated cost: $0.002088
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
unlisted: false
title: 'חידון: האם אתה מכיר CSS מודרני? (ל‑2025)'
subTitle: האם אתה מספיק Front‑End?
label: Advanced CSS
social_image: ../desktop-social.webp
category: Quiz
subCategory: CSS
minReleaseDate: '2024-10-31'
date: '2024-10-31'
modified: '2024-11-09'
tags:
  - quiz
  - css
  - advanced
  - intermediate
cover_full_width: ../dan-levy-downtown-denver-at-night-wide.webp
cover_mobile: ../dan-levy-downtown-denver-at-night-square-200.webp
cover_icon: ../dan-levy-downtown-denver-at-night-square-200.webp
---
import Challenge from '../../../../components/QuizUI/Challenge';
import QuizUI from '../../../../components/QuizUI/QuizUI';


## חידון: האם אתה יודע CSS?

* CSS מודרני? 🤔
* **האם CSS שייך לקו"ח שלך???** 🚀
* בחירה מרובה. 🤖 ... _כמה זה יכול להיות קשה, נכון?_

<QuizUI>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={0}
  group="חימום"
  title="שימוש במשתני CSS"
  options={[
    {text: 'background-color: blue;'},
    {text: 'background-color: --main-color;'},
    {text: 'background-color: var(--main-color);', isAnswer: true},
    {text: 'background-color: $main-color;'},
    {text: 'background-color: @main-color;'},
  ]}
>
  <slot name="question">
  <div className="question">
    מה הדרך הנכונה להשתמש במשתנה CSS בשם `--main-color` כדי להגדיר את צבע הרקע של אלמנט?
    ```css
        :root {
          --main-color: blue;
        }
        div {
          /* How do we use --main-color here? */
        }
    ```
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    משתני CSS משמשים עם הפונקציה `var`, ולכן התשובה הנכונה היא `background-color: var(--main-color);`. תחביר זה מחזיר את הערך של `--main-color` ומיישם אותו.

    האפשרויות האחרות עשויות להיות מוכרות משפות אחרות או תחביר של קדם‑מעבדים, כגון Sass או Less.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={1}
  group="פונקציות CSS"
  title="פונקציית min() ב‑CSS"
  options={[
    {text: 'width: 50%;'},
    {text: 'width: 200px;', isAnswer: true},
    {text: 'width: 250px;'},
    {text: 'width: 500px;'},
    {text: 'width: max(50%, 200px);'},
    {text: 'תחביר לא חוקי'},
  ]}
>
  <slot name="question">
  <div className="question">
    אם רוחב ההורה/המכולה הוא 400px, מה יהיה הרוחב המחושב של האלמנט הזה?
    ```css
        div {
          width: min(250px, 50%);
        }
    ```
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    הפונקציה `min()` תבחר את הערך הקטן ביותר בין 250px ל‑`50%` מרוחב ההורה שלה.

    כדי להבין את הערך המחושב, צריך להמיר את היחידות היחסיות לפיקסלים:

    - `50%` של `400px` הוא `200px`
    - `250px` כבר בפיקסלים
    ```css
        /* This gets computed to */
        width: min(250px, 200px);
        /* -> 200px wins */
    ```
    הפונקציה `min()` שימושית במיוחד בעיצוב רספונסיבי, שבה ניתן להבטיח שהרכיב (או גודל הגופן) לא יעבור גבול מסוים.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={2}
  group="פונקציות CSS"
  title="פונקציית max() ב‑CSS"
  options={[
    {text: 'width: 6em;'},
    {text: 'width: 10%;'},
    {text: 'width: 10px;'},
    {text: 'width: 50px;'},
    {text: 'width: 96px;', isAnswer: true},
    {text: 'Invalid syntax'},
  ]}
>
  <slot name="question">
  <div className="question">
    בהינתן מכולה ברוחב של 200px, מה יהיה הרוחב המחושב של ה‑<div>?
    ```css
        div {
          width: max(50px, 10%, 6rem);
        }
    ```
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    הפונקציה `max()` מקבלת 2 או יותר קלטים, והיא תשתמש בערך הגדול ביותר אוטומטית. בהנחה שהגודל הבסיסי של הפונט הוא ברירת המחדל של הדפדפן `16px`, הרוחב יוצא `96px`.

    כדי להבין את הערך המחושב, צריך להמיר את היחידות היחסיות לפיקסלים:

    - `50px` כבר בפיקסלים
    - `10%` של `200px` הוא `20px`
    - `6rem` הוא `6 * 16px` (גודל הפונט ברירת המחדל) שהוא `96px`
    ```css
        /* This gets computed to */
        width: max(50px, 20px, 96px);
        /* -> 96px wins */
    ```
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={3}
  group="פונקציות גריד ב‑CSS"
  title="פונקציית CSS minmax()"
  options={[
    {text: 'כל רוחבי העמודות בין 100px ל‑200px'},
    {text: 'הגדר עמודות ל‑100px, שורות ל‑200px'},
    {text: 'העמודה הראשונה תהיה בין 100px ל‑200px', isAnswer: true},
    {text: 'החל טווח באופן רקורסיבי, כולל תתי‑גרידים'},
  ]}
>
  <slot name="question">
  <div className="question">
    מה ההשפעה של שימוש ב‑`minmax(100px, 200px)` עבור מסלול גריד ב‑CSS?
    ```css
        grid-template-columns: minmax(100px, 200px);
    ```
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    שימוש ב‑`minmax(100px, 200px)` מאפשר למסלול הגריד לשנות גודל בין `100px` ל‑`200px`, להתאים למרחב הזמין אך לעולם לא לרדת מתחת ל‑`100px` או לעלות מעל `200px`.

    אתה יכול ליצור פריסות שמסתגלות אוטומטית שבהן המכולה והילדים משמשים יחד בחישוב הפריסה. זה חזק במיוחד כשמשלבים עם `repeat()` ו‑`auto-fill` או `auto-fit`, שייצרו כמה שיותר מסלולים במסגרת המגבלות.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={4}
  group="משתני CSS"
  title="גיבויים למשתני CSS"
  options={[
    {text: 'כחול'},
    {text: 'אדום'},
    {text: 'ברירת מחדל של המערכת'},
    {text: '#6b8e23', isAnswer: true},
    {text: 'var(--secondary-color)'},
  ]}
>
  <slot name="question">
  <div className="question">
    איזה צבע יהיה לרקע עבור ה‑CSS הבא?
    ```css
        div {
          background: var(--primary, olivedrab);
        }
    ```
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    הפונקציה `var()` מאפשרת לך להגדיר ערך גיבוי אם המשתנה לא מוגדר. במקרה זה, הרקע יהיה `olivedrab` (`#6b8e23`) מכיוון ש‑`--primary` אינו מוגדר.

    זו דרך מצוינת לוודא שהסגנונות שלך לא יישברו אם משתנה חסר או לא נתמך.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={5}
  group="פונקציות CSS"
  title="שימוש ב‑clamp() לעיצוב רספונסיבי"
  options={[
    {text: 'פתרון גיבוי ליחידות שעשויות לא להיות נתמכות'},
    {text: 'להבטיח שיחידות `vw` יהיו בין 20px ל‑50px'},
    {text: 'סולם ליניארי בין 200px ל‑500px', isAnswer: true},
    {text: 'סולם Log₂ בין 200px ל‑500px'},
    {text: 'כשל! אין תמיכה ב‑IE 11'},
  ]}
>
  <slot name="question">
  <div className="question">
    מה עושה הפונקציה `clamp()`?
    ```css
        .card {
          width: clamp(200px, 50vw, 500px);
        }
    ```
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    הפונקציה `clamp()` מאפשרת לרוחב לגדול בהתבסס על `50vw`, אך שומרת אותו בטווח של 200px עד 500px.

    משמעות הדבר שהרוחב יהיה 200px כאשר `50vw` היה פחות מ‑200px, 500px כאשר `50vw` היה יותר מ‑500px, ובין הגבולות יהיה ליניארי.

    זה עושה אותך רספונסיבי באופן אוטומאגי! מה שצריך לדעת על `clamp` הוא שהיא משלבת **יחידות קבועות** עם **יחידות רספונסיביות או מחושבות**.

    בדרך כלל לא תרצו להשתמש ביחידות תצוגה (viewport) עבור גודל גופנים, אך עם `clamp()` אפשר להבטיח שהגודל לא יהיה קטן מדי או גדול מדי.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={6}
  group="קינון CSS"
  title="קינון CSS מקורי"
  options={[
    {text: 'רק עם SCSS'},
    {text: 'טכנית עם PostCSS'},
    {text: 'כן', isAnswer: true},
    {text: 'לא'},
  ]}
>
  <slot name="question">
  <div className="question">
    האם CSS תומך בקינון באופן מקורי?
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    כן! סוף סוף יש לנו קינון CSS מקורי! CSS הציג תחביר קינון מקורי בשנים האחרונות (2023), שמאפשר סגנון היררכי ישירות ב‑CSS.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={7}
  group="קידוד CSS מקונן"
  title="קידוד CSS מקונן"
  options={[
    {text: 'שם הקובץ חייב להסתיים ב‑.scss'},
    {text: 'צריך שה‑`.title` יופיע לפני מאפיינים כמו `color`'},
    {text: 'רק עם PostCSS'},
    {text: 'מושלם. אין הערות.', isAnswer: true},
  ]}
>
  <slot name="question">
  <div className="question">
    האם זה שימוש נכון ב‑nesting של CSS מקורי?
    ```css
        .container {
          color: black;
          .title {
            color: white;
            background: black;
          }
        }
    ```
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    המחלקה `.title` מקוננת בתוך המחלקה `.container`, והמאפיינים מוחלים כצפוי.

    זו דרך מצוינת לשמור על סגנונות קשורים יחד ולהימנע מבחירות ארוכות.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={8}
  group="קינון CSS"
  title="בוחר ילד ישיר עם קינון"
  options={[
    {text: 'background-color: red'},
    {text: 'background-color: white', isAnswer: true},
    {text: 'background-color: blue'},
    {text: 'Invalid syntax'},
  ]}
>
  <slot name="question">
  <div className="question">
    איזה צבע רקע יוחל על `div` הילד הישיר של `.container`?
    ```css
        .container {
          background-color: red;
          > div {
            background-color: white;
          }
          background-color: blue !important;
        }
    ```
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    הבוחר `>` בכלל המקונן מיישם `background-color: white` רק על אלמנטים `div` ילדים ישירים בתוך `.container`.

    הכלל האחרון, `background-color: blue !important;`, הוא הסחת דעת קטנה. הוא **מחוץ לכלל המקונן** וייושם על כל האלמנטים של `.container`.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={9}
  group="משתני CSS"
  title="שינוי משתנה CSS בזמן ריצה"
  options={[
    {text: 'משתני CSS הם בלתי ניתנים לשינוי'},
    {text: 'באמצעות JavaScript', isAnswer: true},
    {text: 'רק עם SCSS'},
    {text: 'רק עם סגנונות inline'},
    {text: 'באמצעות יחידות רספונסיביות'},
  ]}
>
  <slot name="question">
  <div className="question">
    איך אפשר לשנות את ערך משתנה CSS בזמן ריצה?
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    ניתן להגדיר משתני CSS באמצעות מחלקות & JavaScript. הם אפילו יכולים להיות מוגדרים 'לאחר' שהם משמשים מבחינה טכנית.
    ```js
        document.documentElement.style.setProperty('--main-color', 'blue');
    ```
    זה ישנה את הערך של `--main-color` ל-`blue` עבור כל המסמך.

    משתני CSS ניתנים לשינוי, וניתן לשנותם בזמן ריצה באמצעות JavaScript.

    הם גם יכולים להשתנות על ידי הוספה או הסרה של מחלקות, שזה תבנית נפוצה לתמות.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={10}
  group="משתני CSS"
  title="שימוש ב‑calc() עם משתני CSS"
  options={[
    {text: 'רוחב: 50px'},
    {text: 'רוחב: 100px'},
    {text: 'רוחב: 110px', isAnswer: true},
    {text: 'רוחב: 120px'},
  ]}
>
  <slot name="question">
  <div className="question">
    מה יהיה הרוחב המחושב של האלמנט?
    ```css
        :root {
          --base-width: 100px;
        }
        div {
          width: calc(var(--base-width) + 10px);
        }
    ```
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    הפונקציה `calc()` משלבת את הערך של `--base-width` (100px) עם 10px נוספים, מה שמוביל לרוחב של 110px.
  </div>
  </slot>
</Challenge>

</QuizUI>
````
