# Translation Candidate
- Slug: quiz-css-core-fundamentals
- Locale: he
- Model: openrouter/openai/gpt-oss-120b:nitro
- Target: src/content/posts/2024-11-08--quiz-css-core-fundamentals/he/index.mdx
- Validation: deferred
- Runtime seconds: 27.55
- Input tokens: 14094
- Output tokens: 8405
- Thinking tokens: unknown
- Cached input tokens: 4736
- Cache write tokens: 0
- Estimated cost: $0.002553
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
unlisted: false
title: 'חידון: האם אתה יודע יסודות CSS? (2025)'
subTitle: האם אתה מספיק Front‑End?
label: CSS Fundamentals
social_image: ../desktop-social.webp
category: Quiz
subCategory: CSS
date: '2024-11-08'
modified: '2024-11-10'
tags:
  - quiz
  - intro
  - css
  - styles
  - beginner
  - intermediate
cover_full_width: ../yeshi-kangrang-Qq7A85iCzhQ-unsplash-wide.webp
cover_mobile: ../yeshi-kangrang-Qq7A85iCzhQ-unsplash-square.webp
cover_icon: ../yeshi-kangrang-Qq7A85iCzhQ-unsplash-square.webp
---
import Challenge from '../../../../components/QuizUI/Challenge';
import QuizUI from '../../../../components/QuizUI/QuizUI';


## חידון: האם אתה יודע CSS?

* CSS מודרני? 🤔
* **האם CSS שייך לקו"ח שלך???** 🚀
* בחירה מרובה. 🤖 ... _כמה קשה זה יכול להיות, אה?_

<QuizUI>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={0}
  group="חימום: גופנים"
  title="יחידת CSS לא תקפה לגודל גופן"
  options={[
    {text: '10cx', isAnswer: true},
    {text: '10mm'},
    {text: '10pt'},
    {text: '10px'},
    {text: '10vmin'},
  ]}
>
  <slot name="question">
  <div className="question">
    בחר את <em class="highlight">הלא תקף האחד</em> ❌ `font-size`:
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    `10cx` שגוי מכיוון ש-`cx` איננה יחידת CSS אמיתית. (לפחות בזמן כתיבת השאלה.)

    יחידות פופולריות כוללות את המוכרות `px`, `rem`, `em`.

    יחידות חדשות שימושיות לפריסות דינמיות ותגובתיות.

    - `ch` - רוחב התו `0`
    - `vmin` - מינימום של תצוגה
    - `vmax` - מקסימום של תצוגה
    - `vh` - גובה תצוגה
    - `vw` - רוחב תצוגה

    יש גם כמה יחידות שהיו קיימות תמיד אך נדירות בשימוש, כמו `cm` לסנטימטרים, `mm`, `in` לאינצ'ים, `pt` לנקודות
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={1}
  group="חימום: צבעים"
  title="קודי הקס"
  options={[
    {text: '#A'},
    {text: '#AB'},
    {text: '#ABCD', isAnswer: true},
    {text: '#ABCDE'},
  ]}
>
  <slot name="question">
  <div className="question">
    האם אתה רואה את <em class="highlight">האחד</em> קוד הקס 👍 תקין?
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    הקודים הקסדצימליים משמשים לייצוג צבעים ב‑CSS. הם מתחילים ב‑`#` וחייבים להכיל 3, 4, 6 או 8 ספרות הקסדצימליות.

    קוד הקס של 3 תווים הוא קיצור לקוד של 6 תווים, כאשר כל תו מוכפל. קוד של 4 תווים כולל ערוץ אלפא לשקיפות.

    לדוגמה `#ABC` זהה ל‑`#AABBCC`, ו‑`#ABCD` זהה ל‑`#AABBCCDD`. כדי ללמוד עוד על טיפול בערכי הקס, בדוק את ה‑[חידת מספרי JavaScript.](/quiz-can-you-count-to-bigint/)
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={2}
  group="חימום: יחידות"
  title="אופס, כל היחידות!"
  options={[
    {text: 'em'},
    {text: 'rem'},
    {text: 'cm'},
    {text: 'mm'},
    {text: 'in'},
    {text: 'pt'},
    {text: 'pc'},
    {text: 'px'},
    {text: 'ex'},
    {text: 'ch'},
    {text: 'vmin'},
    {text: 'vmax'},
    {text: 'vh'},
    {text: 'rel', isAnswer: true},
    {text: 'vw'},
  ]}
>
  <slot name="question">
  <div className="question">
    איזו מהיחידות האלה <em class="highlight">אינה</em> יחידת CSS חוקית ❌?
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    יחידות חדשות כמו `ch`, `vmin`, `vmax`, `vh`, `vw` שימושיות מאוד לעיצובים דינמיים/ריספונסיביים.

    יש גם כמה יחידות שהיו קיימות מאז אך נדירות בשימוש, כגון `cm` לסנטימטרים, `mm`, `in` לאינצ'ים, `pt` לנקודות, `pc`, `cap` לגודל האותיות הגדולות, ו‑`ex` השווה לגובה האות `x`.

    היחידות הפופולריות כוללות את המוכרת `px` לפיקסלים, `em` יחסית לגודל הפונט של האלמנט, ו‑`rem` שהיא בעצם יחידת `em` יחסית לשורש המסמך.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={3}
  group="סלקטור: יסודות"
  title="התאמת סלקטורים לאלמנטים ב‑HTML"
  options={[
    {text: '#Home'},
    {text: 'a [id=\'home\']'},
    {text: 'a:contains(home)'},
    {text: 'a#home[name=\'home\']', isAnswer: true},
  ]}
>
  <slot name="question">
  <div className="question">
    איזה סלקטור מתאים בצורה הטובה ביותר ל‑HTML הבא?
    ```html
          <a id="home" name="home" href="/home">Home</a>
    ```
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    התשובה הנכונה היא `a#home[name='home']`, שמתאים גם למאפייני `id` וגם ל‑`name`. סלקטורים ב‑CSS רגישים לרישיות, ולכן `#Home` לא יעבוד, ורווחים מרמזים על אלמנטים צאצאים, מה שלא חל כאן.

    הסלקטור `:contains()` אינו סלקטור CSS סטנדרטי, אך הוא קיים בחלק מספריות JavaScript.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={4}
  group="בוחר: יסודות"
  title="בוחר תכונה לכפתור"
  options={[
    {text: 'button:link'},
    {text: 'button::click'},
    {text: 'button:focus'},
    {text: 'button[onclick]', isAnswer: true},
    {text: 'button[on-click]'},
  ]}
>
  <slot name="question">
  <div className="question">
    איזה בוחר תואם את כפתור ה‑HTML הבא?
    ```html
          <button onclick="openModal()">Contact</button>
    ```
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    ההתשובה הנכונה היא `button[onclick]`, שמכוונת לקיום של התכונה `onclick`.

    שימו לב ש-`:link` מתמקד רק בקישורים `href` שלא בוקרו, `::click` אינו pseudo‑element תקף, ו-`:focus` מתמקד רק באלמנט שמקבל פוקוס.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={5}
  group="סלקטור: יסודות"
  title="סלקטור CSS לא תקין"
  options={[
    {text: 'a {}'},
    {text: 'b.b {}'},
    {text: 'c > > d {}', isAnswer: true},
    {text: '#d {}'},
  ]}
>
  <slot name="question">
  <div className="question">
    איזה מהסלקטורים האלה אינו תקין?
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    הסלקטור `c > > d {}` אינו תקין מכיוון שמפעיל הצאצא (`>`) חוזר ללא סלקטור בין שני תווי `>`.

    השאר תקינים. סלקטור מסוג כמו `c {}` הוא תחבירית תקין ב‑CSS אפילו אם `c` אינו אלמנט HTML סטנדרטי.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={6}
  group="סלקטור: יסודות"
  title="בחירת הקישור האחרון"
  options={[
    {text: 'a :nth-child(3)'},
    {text: 'a:last-item'},
    {text: 'nav:last-of-type(a)'},
    {text: 'nav:nth-child(3)'},
    {text: 'a:last-child', isAnswer: true},
  ]}
>
  <slot name="question">
  <div className="question">
    איזה סלקטור תופס את הקישור האחרון ב‑HTML הבא?
    ```html
          <nav>
            <a name="home" href="/home">Home</a>
            <a name="login" href="/login">Login</a>
            <a name="help" href="/help">Help</a>
          </nav>
    ```
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    הסלקטור הנכון הוא `a:last-child`, שמתאים ל‑`<a>` האחרון כאשר הוא גם הילד האחרון של ההורה שלו. `nav:nth-child(3)` היה תופס אלמנט `<nav>` שהוא הילד השלישי של ההורה שלו.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={7}
  group="סלקטור: ספציפיות"
  title="עדיפות סלקטור"
  options={[
    {text: 'main article section blockquote a'},
    {text: 'blockquote a'},
    {text: 'a#quote', isAnswer: true},
    {text: 'a.quote'},
  ]}
>
  <slot name="question">
  <div className="question">
    איזה סלקטור יקבל עדיפות?
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    הסלקטור `a#quote` מקבל עדיפות בגלל ה‑ID, שיש לו ספציפיות גבוהה יותר משסלקטורים מבוססי תגיות או מחלקות.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={8}
  group="פריסות: מרכוז"
  title="מרכוז טקסט באלמנט בלוק"
  options={[
    {text: 'align: center;'},
    {text: 'margin: 0 auto;'},
    {text: 'align-content: center;'},
    {text: 'text-align: center;', isAnswer: true},
    {text: 'text-content: center;'},
  ]}
>
  <slot name="question">
  <div className="question">
    איך אפשר למרכז "shit" בתיבה?
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    השימוש ב-`text-align: center;` הוא הדרך הנכונה למרכז טקסט בתוך אלמנט בלוק. תכונות `align` משמשות לפריסות flexbox, ו‑`margin: 0 auto;` משמשת למרכז אלמנטים בלוק אופקית.

    התכונה `align-content` משמשת לפריסות grid, ו‑`text-content` אינה תכונת CSS תקפה.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={9}
  group="פריסות: מרכוז"
  title="מרכוז אלמנט בלוק אנכי"
  options={[
    {text: 'align-items: center;'},
    {text: 'justify-content: center;'},
    {text: 'align-content: center;', isAnswer: true},
    {text: 'margin: auto;'},
    {text: 'margin: 0 auto;'},
  ]}
>
  <slot name="question">
  <div className="question">
    איך למרכז תוכן אנכית בתוך קונטיינר בלוק בפריסת זרימה מודרנית?
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    שימוש ב-`align-content` הוא הדרך המודרנית למרכז את תוכן קונטיינר הבלוק אנכית בפריסת זרימה.

    המאפיינים `align-items` ו-`justify-content` משמשים לפריסות flexbox ו‑grid, אך לא ל‑flow.

    גם `margin: 0 auto;` וגם `margin: auto;` ממקמים אלמנט בלוק אופקית, אך לא אנכית.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={10}
  group="פריסות: יחידות"
  title="חישוב גודל הפיקסלים של גופנים מקוננים"
  options={[
    {text: '!40px'},
    {text: '5px', isAnswer: true},
    {text: '20px'},
    {text: '25px'},
    {text: '40px'},
  ]}
>
  <slot name="question">
  <div className="question">
    מהו גודל הפיקסלים של הטקסט של הקישור `<a>` ב‑HTML הבא?
    ```html
          <body style="font-size: 40px !important;">
            <nav style="font-size: 50%;">
              <a style="font-size: 25%;">HOME</a>
            </nav>
          </body>
    ```
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    ה‑`font-size` עבור `<a>` מחושב כ‑5px: 40px (body) * 50% (nav) = 20px, ואז 20px * 25% = 5px.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={11}
  group="יחידות: REM"
  title="חישוב גודל פיקסלים עם REMs"
  options={[
    {text: '10px'},
    {text: '12px', isAnswer: true},
    {text: '14px'},
    {text: '20px'},
    {text: '24px'},
    {text: '34px'},
  ]}
>
  <slot name="question">
  <div className="question">
    מה יהיה גודל הפיקסלים של `1.2rem` עבור הקישור "HOME" ב‑HTML הבא?
    ```html
          <html style="font-size: 10px;">
            <body style="font-size: 20px;">
              <a style="font-size: 1.2rem;">HOME</a>
            </body>
          </html>
    ```
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    `1.2rem` מתורגם ל‑12px מכיוון שיחידות `rem` מתייחסות לגודל הפונט של השורש או `<html>`, שהוגדר כאן ל‑10px.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={12}
  group="יחידות: EM"
  title="חישוב גודל פיקסלים עם EMs"
  options={[
    {text: '10px'},
    {text: '12px'},
    {text: '14px'},
    {text: '20px'},
    {text: '24px', isAnswer: true},
    {text: '34px'},
  ]}
>
  <slot name="question">
  <div className="question">
    בדומה לשאלה הקודמת, מה יהיה גודל הפיקסלים של `1.2em` עבור הקישור "HOME" ב‑HTML הבא?
    ```html
          <html style="font-size: 10px;">
            <body style="font-size: 20px;">
              <a style="font-size: 1.2em;">HOME</a>
            </body>
          </html>
    ```
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    `1.2em` מתורגם ל‑24px מכיוון שיחידות `em` מתייחסות לגודל הפונט שהורש, כאן מוגדר ל‑20px.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={13}
  group="סלקטור: ספציפיות"
  title="סלקטורים עם ספציפיות אפס"
  options={[
    {text: ':where(.card) .title', isAnswer: true},
    {text: '.card .title'},
    {text: ':is(.card) .title'},
    {text: '#card .title'},
  ]}
>
  <slot name="question">
  <div className="question">
    איזה סלקטור בעל הספציפיות הנמוכה ביותר?
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    `:where(.card) .title` הוא בעל הספציפיות הנמוכה ביותר. המחלקה המזויפת `:where()` וכל מה שבתוכה תורמים `0-0-0`, ולכן רק `.title` נחשב. `:is(.card) .title` שומר את הספציפיות של `.card`, `.card .title` מכיל שני מחלקות, ו‑`#card .title` כולל מזהה.
  </div>
  </slot>
</Challenge>

</QuizUI>
````
