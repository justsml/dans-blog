# Translation Candidate
- Slug: js-quiz-14-date-time-questions-test-your-knowledge
- Locale: he
- Model: openrouter/openai/gpt-oss-120b:nitro
- Target: src/content/posts/2020-01-02--js-quiz-14-date-time-questions-test-your-knowledge/he/index.mdx
- Validation: deferred
- Runtime seconds: 34.95
- Input tokens: 14712
- Output tokens: 10119
- Thinking tokens: unknown
- Cached input tokens: 5248
- Cache write tokens: 0
- Estimated cost: $0.002984
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
unlisted: false
title: 'חידון: 14 שאלות על Date ב‑JavaScript'
subTitle: לרשים בחברות עם חידושי JavaScript! ✨
label: Dates & Times
date: '2020-01-02'
modified: '2024-11-27'
tags:
  - quiz
  - javascript
  - date
  - date
  - gotchas
  - challenge
  - intermediate
social_image: ../desktop-social.webp
category: Quiz
subCategory: JavaScript
cover: ../pocket-watch.webp
cover_mobile: ../w300_pocket-watch.webp
cover_icon: ../icon_pocket-watch.webp
---
import Challenge from '../../../../components/QuizUI/Challenge';

importChallenge from '../../../../components/QuizUI/Challenge';
import QuizUI from '../../../../components/QuizUI/QuizUI';

## כמה טוב אתה מכיר את המחלקה `Date`?

> * **הוכח את המיומנות שלך ב‑JavaScript!** 🚀  
> * אין צורך בהרשמה או בכניסה. ✨  
> * בחירה מרובה. 🤖 … _כמה זה יכול להיות קשה, נכון?_

### מתווה

ה‑API של המחלקה `Date` ב‑JavaScript ידוע בקשיותו. הוא ירש מה‑Java, ואני מניח שהשראה שלו נלקחה משיטות מדידה ניאוליתיות עתיקות.

הקושי בעבודה עם `Date` גורם לרבים למפתחים לפנות לספריות צד שלישי ללא היסוס. למרות שלרוב הן בחירה בטוחה ואמינה, ספריות אלו כמעט ולא נדרשות לעיצוב תאריכים או להתאמה לשפה!

הקוויז הזה נועד לבדוק (ולחזק) את הידע שלך ב‑API המקורי של `Date`. השתמש בכפתורים הירוקים לקבלת רמזים והסברים! בתקווה שבסוף האתגר תצא עם הבנה מוצקה של `Date` ב‑JavaScript.

#### **הערה:** כל הדוגמאות מניחות שעון מקומי GMT‑7.

### 👇 14 שאלות למטה 👇

<QuizUI>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={0}
  group="טיפול בתאריכים"
  title="בונה תאריך חלק 1"
  options={[
    {text: 'Jan 01 2020'},
    {text: 'Feb 01 2020', isAnswer: true},
    {text: 'RangeError: Invalid argument.'},
  ]}
>
  <slot name="question">
  <div className="question">
    מה יכלול הפלט?
    ```js
        const d1 = new Date(2020, 1, 1)
        console.log(d1)
    ```
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    הפרמטר של החודש הוא מבוסס על אינדקס אפס. בטווח 0‑11 (במערכות לוח שנה מערביות).

    ל'פברואר' ערך אינדקס של אחד. (תחשוב על זה כמו חיפוש במערך.)
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={1}
  group="טיפול בתאריכים"
  title="בונה תאריך חלק 2"
  options={[
    {text: 'Jan 01 2020', isAnswer: true},
    {text: 'Feb 01 2020'},
    {text: 'RangeError: Invalid argument.'},
  ]}
>
  <slot name="question">
  <div className="question">
    מה יכלול הפלט?
    ```js
        const d2 = new Date(2020, 0, 1)
        console.log(d2)
    ```
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    הפרמטר של החודש הוא מבוסס על אינדקס אפס. בטווח 0‑11 (בקלנדרים המערביים).

    ל'January' יש ערך אינדקס של אפס. (תחשוב על זה כמו חיפוש במערך.)
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={2}
  group="טיפול בתאריכים"
  title="בונה תאריך חלק 3"
  options={[
    {text: '01 Jan 1970'},
    {text: 'אפס של אפוק Unix'},
    {text: 'תאריך נוכחי, ב‑UTC/GMT'},
    {text: 'תאריך נוכחי', isAnswer: true},
    {text: 'NaN'},
    {text: 'RangeError: ארגומנט לא תקין.'},
  ]}
>
  <slot name="question">
  <div className="question">
    מה יכלול הפלט?
    ```js
        const d3 = Date('Thu, 01 Jan 1970 00:00:00 GMT')
        console.log(d3)
    ```
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    אל תשכחו את מילת המפתח `new`! `Date` היא מחלקה, ויש לקרוא לה עם `new`.

    `Date('...')` ללא `new` מתעלמת ממה שאתם מעבירים. זה נראה שתמיד מחזיר את התאריך והשעה הנוכחיים עם `new Date()` (בלי ארגומנטים).

    זהו **קפיצה נפוצה** שקל **להתעלם ממנה**, אפילו בביקורת קוד.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={3}
  group="טיפול בתאריכים"
  title="בונה תאריך חלק 4"
  options={[
    {text: '1969', isAnswer: true},
    {text: '1970'},
    {text: '2019'},
    {text: '2020'},
    {text: '2021'},
    {text: 'RangeError: Invalid argument.'},
  ]}
>
  <slot name="question">
  <div className="question">
    מה יכלול הפלט?
    ```js
          const date = new Date(2020)
          console.log(date.getFullYear())
    ```
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    מופע Date שנוצר עם ארגומנט של מספר שלם יחיד מתפרש כערך `Epoch` של יוניקס. `Epoch` הוא ספירה של מילישניות מאז Jan 1st, 1970.

    ערך של `2020` (מילישניות) מתורגם ל‑2 שניות אחרי Jan 1st, 1970.

    מאחר שהאזור זמן המקומי שלנו הוא עם היסט של -7 שעות, אנחנו מקבלים `Wed Dec 31 1969 17:00:02 GMT-0700 (Mountain Standard Time)`.

    אפשר לעקוף את היסט אזור הזמן המקומי בעזרת [`.getUTCFullYear()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/getUTCFullYear).
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={4}
  group="טיפול בתאריכים"
  title="פענוח מחרוזת תאריך"
  options={[
    {text: '2019 2020', isAnswer: true},
    {text: '2020 2021'},
    {text: '2020 2020'},
    {text: '2020 2019'},
  ]}
>
  <slot name="question">
  <div className="question">
    איזה ערך יודפס לקונסול?
    ```js
          const d1 = new Date('2020-01-01')
          const d2 = new Date('2020-01-01T00:00')
          console.log(d1.getFullYear(), d2.getFullYear())
    ```
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    המחרוזת ללא ערך זמן `T` עשויה להיראות כ-1 בינואר 2020 - אך מחרוזות תאריך בלבד מתפרשות כ-UTC, וכאשר מתאימות לאזור הזמן המקומי שלנו (GMT-7) אנו עדיין בשנת 2019.

    מחרוזות תאריך‑זמן ללא אזור זמן מפורש מתפרשות בזמן המקומי.

    הצורה `T00:00` גורמת לערך השני להתפרש כחצות מקומי.

    התאריך הראשון מתפרש כ-`Tue Dec 31 2019 17:00:00 GMT-0700 (Mountain Standard Time)`.
    התאריך השני מתפרש כ-`Wed Jan 01 2020 00:00:00 GMT-0700 (Mountain Standard Time)`.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={5}
  group="טיפול בתאריכים"
  title="עיצוב חלק 1"
  options={[
    {text: 'new Intl.DateTimeFormat(\'},
    {text: 'date.toLocaleFormat(\', isAnswer: true},
    {text: 'date.toLocaleString(\'},
    {text: 'date.toLocaleDateString(\'},
  ]}
>
  <slot name="question">
  <div className="question">
    בחר שיטה _לא נכונה_ לעיצוב:
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    המתודה `toLocaleFormat()` אינה סטנדרטית! היא עשויה להיראות מוכרת מכיוון שהיא מהספרייה הישנה של צד שלישי.

    בדוק את תיעוד המתודה [`toLocaleDateString`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleDateString). ההתנהגות שלה מתועדת תחת [`Intl.DateTimeFormat`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DateTimeFormat).
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={6}
  group="טיפול בתאריכים"
  title="תאריכי UTC חלק 1"
  options={[
    {text: 'Wed, 01 Jan 2020 00:00:00 GMT'},
    {text: 'Thu, 02 Jan 2020 00:00:00 GMT'},
    {text: 'TypeError', isAnswer: true},
    {text: 'NaN'},
  ]}
>
  <slot name="question">
  <div className="question">
    מה יכלול הפלט?
    ```js
          var date = Date.UTC('2020-01-02T00:00')
          console.log(date.toUTCString())
    ```
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    תקבלו `TypeError: date.toUTCString is not a function`, מכיוון ש[`Date.UTC()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/UTC) מחזיר מספר של מילישניות, ולא מופע של Date.

    {/* השיטה [`getFullYear()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/getFullYear) משתמשת בהיסט המקומי שלכם (נניח GMT-07:00 עבור השאלות האלו.)
    משמעות הדבר שהיא תחזיר את השנה הקודמת (NYE -7 שעות).
    השיטה [`getUTCFullYear()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/getUTCFullYear) תחזיר את השנה כפי שסיפקנו ל-`Date.UTC()`, 2020.
    */}
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={7}
  group="טיפול בתאריכים"
  title="תאריכים ב‑UTC חלק 2"
  options={[
    {text: 'אובייקט Date מבוסס UTC'},
    {text: 'אובייקט Date מותאם לאזור זמן מקומי'},
    {text: 'מילישניות מאז 1 בינואר 1970 GMT', isAnswer: true},
    {text: 'שגיאה'},
  ]}
>
  <slot name="question">
  <div className="question">
    מה יכלול הפלט?
    ```js
          const d = Date.UTC(2020, 0, 1)
          console.log(d)
    ```
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    המתודה העזרית [`Date.UTC`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/UTC) אינה מחזירה אובייקט Date. היא מחזירה מספר שלם במילישניות.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={8}
  group="Handling Dates"
  title="UTC Dates Part 3"
  options={[
    {text: '0'},
    {text: '420', isAnswer: true},
    {text: '700'},
    {text: '1400'},
    {text: 'null'},
  ]}
>
  <slot name="question">
  <div className="question">
    מה הפלט יכלול?
    ```js
          // Assume local TZ is -07:00
          const d = new Date(Date.UTC(2020, 0, 1))
          console.log(d.getTimezoneOffset())
    ```
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    תאריכי `Date` יוצגו באופן מרומז בזמן המקומי, עם [`.getTimezoneOffset()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/getTimezoneOffset) (בפועל) שלא משתנה.

    מופעי `Date` אינם שומרים מידע על אזור זמן. הם שומרים את מספר המילישניות מאז תקופת היוניקס (1 בינואר 1970). אזור הזמן מתחשב בעת ניתוח והצגת מחרוזות תאריך. התנהגות התצוגה ברירת המחדל נקבעת אוטומטית על פי הגדרות האזור של המערכת או הדפדפן.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={9}
  group="טיפול בתאריכים"
  title="מתודות קביעת תאריך חלק 1"
  options={[
    {text: 'Jan 01 2020', isAnswer: true},
    {text: 'Feb 01 2020'},
    {text: 'RangeError: Invalid argument.'},
  ]}
>
  <slot name="question">
  <div className="question">
    מה יכלול הפלט?
    ```js
          const d = new Date(2020, 0, 1)
          d.setDate(1)
          console.log(d)
    ```
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    המתודה [`.setDate()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/setDate) מגדירה את היום בחודש, בהתבסס על החודש הנוכחי של המופע הנתון.

    אם ערך ניתן מחוץ למספר הימים הקיימים, ערך החודש של מופע התאריך יתואם (למשל `setDate(32)` בינואר ייחשב כ-1 בפברואר.)

    <aside class="hint">`setDate` מגדיר את היום בחודש, בדרך כלל בטווח 1‑31.</aside>
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={10}
  group="טיפול בתאריכים"
  title="מתודות קביעת תאריך חלק 2"
  options={[
    {text: 'Jan 01 2020'},
    {text: 'Feb 01 2020', isAnswer: true},
    {text: 'RangeError: Invalid argument.'},
  ]}
>
  <slot name="question">
  <div className="question">
    מה יכלול הפלט?
    ```js
          const d = new Date(2020, 0, 1)
          d.setMonth(1)
          console.log(d)
    ```
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    המתודה [`.setMonth()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/setMonth) מגדירה את החודש של מופע התאריך הנתון.

    הפרמטר month הוא מבוסס‑אפס, בטווח 0‑11 (במערכות לוח שנה מערביות).
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={11}
  group="טיפול בתאריכים"
  title="מגדירי תאריך חלק 3"
  options={[
    {text: 'Jan 01 2020'},
    {text: 'Jan 01 2021', isAnswer: true},
    {text: 'Feb 01 2020'},
    {text: 'RangeError: Invalid argument.'},
  ]}
>
  <slot name="question">
  <div className="question">
    מה יכלול הפלט?
    ```js
          const d = new Date(2020, 0, 1)
          d.setMonth(12)
          console.log(d)
    ```
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    המתודה [.setMonth()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/setMonth) מגדירה את החודש של מופע תאריך נתון.

    הפרמטר `month` הוא מבוסס‑אפס, עם 12 ערכים בטווח 0‑11 (בלוחות השנה המערביים).

    כאן אנחנו רואים שהשנה מתעדכנת ל‑2021, מכיוון ש‑`setMonth(12)` הוא אחד יותר מ‑11 (דצמבר).
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={12}
  group="טיפול בתאריכים"
  title="מתודות קביעת תאריך חלק 4"
  options={[
    {text: 'Jan 01 2020'},
    {text: 'Feb 01 2020'},
    {text: 'Jan 01 2021'},
    {text: 'Feb 01 2021', isAnswer: true},
    {text: 'RangeError: Invalid argument.'},
  ]}
>
  <slot name="question">
  <div className="question">
    מה יכלול הפלט?
    ```js
          const d = new Date(2020, 0, 1)
          d.setMonth(13)
          console.log(d)
    ```
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    המתודה [`.setMonth()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/setMonth) מגדירה את החודש של מופע תאריך נתון.

    הפרמטר month הוא מבוסס‑אפס, בטווח 0‑11 (בלוחות השנה המערביים).

    כאן אנו רואים שהחודש והשנה מתואמים לפברואר 2021, מכיוון ש‑`setMonth(13)` הוא 2 יותר מ‑11 (דצמבר).

    <aside class="hint">`setMonth` מגדיר את החודש לפי אינדקס, 12 חודשים ממוספרים מ‑0 עד 11. </aside>
    <aside class="hint">
    מספרים מחוץ לטווח 0‑11 יגרמו לגלישה של השנה למעלה או למטה. לדוגמה, `setMonth(13)` יכוון את השנה ל‑2021 (בפברואר מכיוון ש‑13 הוא 2 יותר מ‑11).
    </aside>
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={13}
  group="טיפול בתאריכים"
  title="מתודות קביעת תאריך חלק 5"
  options={[
    {text: 'Jan 01 2020'},
    {text: 'Feb 01 2020'},
    {text: 'Jan 01 2019'},
    {text: 'Dec 01 2019', isAnswer: true},
    {text: 'RangeError: Invalid argument.'},
  ]}
>
  <slot name="question">
  <div className="question">
    מה יכלול הפלט?
    ```js
          const d = new Date(2020, 0, 1)
          d.setMonth(-1)
          console.log(d)
    ```
  </div>
  </slot>

  <slot name="hints">
  <div className="hint">
    <aside class="hint">החודשים אינם אחידים, נעים בין 28 ל‑31 ימים.</aside>
    <aside class="hint">`setDate` מגדיר את היום בחודש, בדרך כלל בטווח 1‑31. מספרים שליליים וכל מספר גדול מ‑`31` יגרמו להתאמת היום והחודש, לפעמים בצורה מפתיעה.</aside>
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    המתודה [.setMonth()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/setMonth) מגדירה את החודש של מופע ה‑Date הנתון.

    הפרמטר של החודש הוא מבוסס‑אפס, בטווח 0‑11 (במערכות לוח שנה מערביות).

    כאן אנו רואים שהחודש והשנה חוזרים לדצמבר 2019, מכיוון ש‑`setMonth(-1)` הוא פחות מ‑0 (ינואר).
  </div>
  </slot>
</Challenge>

</QuizUI>
````
