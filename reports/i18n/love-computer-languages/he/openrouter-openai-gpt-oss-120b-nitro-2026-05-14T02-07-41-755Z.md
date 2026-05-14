# Translation Candidate
- Slug: love-computer-languages
- Locale: he
- Model: openrouter/openai/gpt-oss-120b:nitro
- Target: src/content/posts/2015-06-12--love-computer-languages/he/index.mdx
- Validation: deferred
- Runtime seconds: 7.64
- Input tokens: 6177
- Output tokens: 2661
- Thinking tokens: unknown
- Cached input tokens: 2304
- Cache write tokens: 0
- Estimated cost: $0.000720
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
title: אהבה (שפות מחשב)
date: '2015-06-12'
modified: '2017-02-28'
category: Code
subCategory: languages
draft: true
hidden: true
publish: true
tags:
  - programming
  - languages
  - lua
  - haskell
  - scala
  - rust
  - smalltalk
  - go
  - javascript
  - python
cover: ../rawpixel-602144-unsplash.webp
cover_mobile: ../w300_rawpixel-602144-unsplash.webp
cover_icon: ../icon_rawpixel-602144-unsplash.webp
---
import Gist from '../../../../components/Gist/index.astro'

## הערות על שפות תכנות

#### אני בטוח שהתצפיות המגוונות שלי נכתבו לפני, אבל הנה רשימת השפות שהכי מעניינות אותי:

### JavaScript

אהבת חיי האחת, גמישה באופן על‑הכל וחד‑גונית – האלופה הרב‑תחומית, המדהימה בכוחה!  
זו השפה הפעילה/פופולרית מספר 1 ב‑GitHub.com במשך _שנים_ ברציפות.

אני שונא להודות בזה, אבל במשך שנים חיבבתי רק בזלזול ובבוז את מה שהיום הוא, **השפה האהובה עלי**.

**ES6** רק הגביר את ה~~~התמכרות~~~ האהבה. בעוד ש‑ES5 טהור תמיד יחזיק מקום מיוחד בלבי, בכל פעם שאני משתמש ב‑**ES6**, מרגישים כמו עקיצה של עכביש רדיואקטיבי...

היו 4 גורמים שדחפו אותי ל‑**מחנה ES6**:

1.  זה כיף. ברצינות. יש רווחים מוחשיים ביופי, בהירות ובפרודוקטיביות.

- טענות סובייקטיביות, אתם אומרים? תנו לי להראות לכם קטע מ‑ES6:
- `let expired = users.filter(u => Date.now() > u.trialDate)`
- עכשיו לא צריך להתיימר לדעת איך להשתמש ב‑`Object.create` או ב‑`Object.defineProperty`
- ראו דוגמאות למטה

1.  החל מיולי 2015, ES6 הוא תקן סופי מאושר רשמית!  
2.  התמיכה היא למעשה 100 %*! … טוב, צריך BabelJS כדי לתקן את הקוד כך שיתאים ל‑ES5. בעבר מתרגמי‑JS נחשבו למשהו שלילי. עם זאת, לאחרונה (2014‑15) המצב השתנה ו‑BabelJS הפך למניע מרכזי של התקדמות השפה. חברות רבות כולל Microsoft ו‑Facebook משתמשות בו באתרים הגדולים שלהם.  
3.  [גרסאות חדשות של Node](https://nodejs.org/en/blog/release/v4.0.0/) כוללות את מנוע ה‑V8 של Chrome v45, זה v4.5  

#### דוגמאות

> אני עומד להראות לכם מה סוף סוף גרם לי _להתחיל_ לשתות את הקול‑אייד בטעם ES6.

בנסיון האחרון שלי, ES6 מאפשר לכתוב קוד מהר יותר. בקיצור.  
מאחר שהקוד תמציתי יותר, נדרש פחות כוח מוח כדי לעבור עליו ולהבין אותו (או של חבר צוות).

בדרך כלל אני רואה חיסכון של 20‑50 % בקוֹד KLOC. זה כמו קיצוץ של קייט מוס!

**_תמונה חסרה:_ EcmaScript 5 מול ES 2016 – הדגמה: מחלקות, פירוק, חינניות**  
{/* ](../images/screenshots/Diff-ES6-vs-ES5-Head-to-Head.png) */}  

```js
// /services/users.js
class Users {
  constructor(data) {
    this.users = data || [];
  }
  expired() {
    return this.users.filter(u => Date.now() > u.trialDate);
  }
}
```  

- אין צורך בקוד משעמם ל‑'לחלץ' ו‑'לבדוק' שדות שמועברים לפונקציה. נחתוך לדוגמה `add()`:

```js
// /services/users.js
class Users {
  constructor(data) {
    this.users = data || [];
  }
  add({ name, email, password }) {
    // שמירת hash של הסיסמה, אנחנו צריכים רק משתנה `var/let` אחד – השאר 'מוגדרים' עם הקסם של `{fields}` למעלה ^^^
    let hash = getSha256(password);
    return http
      .post("/users", {
        name: name,
        email: email,
        passwordHash: hash
      })
      .then(usr => this.users.push(usr)); // הוספת משתמש עם תגובת השירות
  }
}
```  

<Gist path='justsml/aaddc9852c1624d61cf3'></Gist>  

<p>&#160;</p>  

#### קפיצה ל‑ES6 יכולה להרגיש כמו מעבר מ‑:

<div class="anigif top">
  <img alt='huh' title="Huh?" src="https://res.cloudinary.com/ddd/image/upload/v1441143891/wtf__tumblr_inline_n7ygqh6Y0C1svcdm1_igeqey.gif" />
</div>
<h3>ל‑</h3>
<div class="anigif">
  <img alt='wtf' title="WTF?!?!" src="https://res.cloudinary.com/ddd/image/upload/v1443133148/cat-wtf-trap.gif" />
</div>
<h3>ל‑</h3>
<div class="anigif end">
  <img alt='#winning' title='#winning' src="https://res.cloudinary.com/ddd/image/upload/v1443133141/full-throttle.gif" />
</div>

פשוט ממשיכים לחפור את החידושים. תסתכלו על תבניות מחרוזות, קישור אוטומטי של `this`, ירושה יותר שפויה...

##### [Node.JS](http://nodejs.org/)

### Rust

##### [Official Site](http://www.rust-lang.org/)

- **Pros**

- תארו לעצמכם שפה מהירה כמו C ועוצמתית כמו Python/C++, אבל בלי המורכבות/פחיות שמלכדות אפילו את המפתחים המיומנים ביותר.  
  - למעשה, אני מניח ש‑Rust מורכבת בערך כמו המפרט של ES6.  
  - היא כוללת שפע של תוספות:  
    1. באופן עקרוני Rust מתורגמת מסינטקס חצי‑דינמי ל‑**קוד C טהור**!  
    1. כולל \***\*את כל הפרקטיקות הטובות\*\*** ב‑C שהייתם עלולים לטעות בהן, ואני ~~בסופו של דבר~~ תמיד עושה.  
    - באופן אוטומטי אתם מקבלים:  
    - ניהול זיכרון אוטומטי (בלי צורך במפח אשפה איטי!)  
    - בעלות/נעילה של אובייקטים במרחב מדויק (הפחתת mutex ו‑context switching)  
    - חיי אובייקטים (מומש אוטומטית\*, וקוד אוטומטי כאילו ידעתם כל קצה קצה)  
    - מניעת כמעט כל שגיאות זמן ריצה (באמת, נתיבי הקוד שלכם הופכים למפורשים: אי אפשר להתעלם מהם)  
  - אה, ויש גם הרחבות שפה אמיתיות עם תכונת 'macro' משכללת.  
    - צריכים Comprehensions? [ב‑סגנון Scala? בוצע](https://gist.github.com/hanny24/5749688), ו‑[ב‑סגנון Python? בוצע](https://gist.github.com/JeffBelgum/5e762761cd63c796e803).  
    1. טוב מדיי להיות אמיתי? לא, זה רק משתפר:  
    - אינדיקטורים קצה‑קצה (סטטיסטיקות github.com) מראים ש‑Rust תחרותית מאוד ואף מתעלה על Go (השפה החדשה של Google)  
      - כ‑4 000 כוכבים יותר מ‑Go (כיום סביב 12,200)  
      - יותר תורמים כוללים (2×! – 1,071 מול 479 של Go)  
      - יותר Forks (3×! – 2,343 מול 765)  
      - מספר ה‑Open Issues, מפספס במעט (2,000 מול 1,730 של Go)  
      - Pull Requests (Rust 70+ מול 1 של Go)  
    - גם אני נאלצתי לבדוק את המספרים שלוש פעמים.  
  - ספריות אחרות יציבות מאוד בזכות המבנים והכללים של Rust.  
  - מודל תהליכים (threading) שמיש למתכנתים רגילים  

- **Cons**  
  - מסגרות **web** מכובדות יחסית חדשות, לא מבוססות עדיין ולעיתים חסרות תיעוד (אף על פי שהן **מתקדמות** מאוד – מרשימות מרק מרץ 2015).  
  - הרבה שינויים שבורים לפני גרסה 1.0  

### Python

- **Pros**  
  - מגוון עצום של אלגוריתמים כבר ממומש ב‑Python (ראו: scilearnkit, numpy, matplotlib, pil/pillow, וכו').  
  - כיף מאוד לכתוב! Comprehensions ו‑Decomposition תכונות מצוינות שהופכות שפות אחרות לבלתי נוחות.  
  - מערכים, 'Sequences', Tuples וכו' יחסית פשוטים.

```python
## dummy code: defines a color + pixel-coord -
def pixel(x, y, r, g, b): return dict(x=x, y=y, r=r, g=g, b=b)
## Create a new pixel object and apply to set of vars
x, y, r, g, b = pixel(10, 20, 255, 255, 255)
## Now we can call pixel
```

- **Cons**
  - למרבה הצער, Python 2.x ו‑3.x אינם תואמים. הפיצול הגדול נמשך, גם אחרי כל השנים האלה.
  - חלק מהספריות החיוניות אינן מובנות במלואן על ידי חלק מהמפתחים (numpy)

### Haskell

- **Pros**
  - מספקת מאוד כשבסופו של דבר זוכרים מספיק תחביר כדי להרכיב תבניות מבוססות comprehensions
  - תלמדו תבניות קוד משגעות – שלעיתים ניתנות ליישום בשפות אחרות.
- **Cons**
  - התחביר והתבניות יכולים להיות קשים להתרגל אליהם.

<div class="anigif end">
  <img alt='endless loop' src="https://res.cloudinary.com/ddd/image/upload/v1441143881/endless-loop.gif" />
</div>

### SmallTalk-80

- **Pros**
  - מהדרים פשוטים באופן מדהים (במקור במיוחד)
  - משאבים מצוינים: [Smalltalk MVC Translated to JavaScript](http://peter.michaux.ca/articles/smalltalk-mvc-translated-to-javascript)
- **Cons**
  - סביר להניח שלא תשתמשו בשפה הזו לשום דבר. אפס פרויקטים. עם זאת היא תשפיע על סגנון הקוד שלכם יותר משפות פונקציונליות אחרות... זה צריך להיות ברשימת ה‑Pros)

#### _Work-in-progress (updated Dec. 2015)_
````
