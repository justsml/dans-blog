# Translation Candidate
- Slug: you-may-not-need-axios
- Locale: he
- Model: openrouter/openai/gpt-oss-120b:nitro
- Target: src/content/posts/2018-11-15--you-may-not-need-axios/he/index.mdx
- Validation: deferred
- Runtime seconds: 9.55
- Input tokens: 10568
- Output tokens: 3145
- Thinking tokens: unknown
- Cached input tokens: 4096
- Cache write tokens: 0
- Estimated cost: $0.000978
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
social_image: ../desktop-social.webp
title: (no translation provided)
subTitle: API של Fetch להצלה!
date: '2018-11-14'
modified: '2024-08-21'
tags:
  - programming
  - patterns
  - examples
  - nodejs
  - javascript
  - promises
  - axios
  - fetch
category: Guides
subCategory: fetch
cover: ../brock-dupont-575648-unsplash.webp
cover_mobile: ../w300_brock-dupont-575648-unsplash.webp
cover_icon: ../icon_brock-dupont-575648-unsplash.webp
---
import Gist from '../../../../components/Gist/index.astro'

## אולי לא תזדקקו ל‑Axios

<p class="breakout call-to-action">זה **אינו התקפה** על [Axios](https://www.npmjs.com/package/axios). <br />

במקום זאת, זה **תמיכה ב‑API `fetch` שהפך למאוד חזק.** 🦄</p>

### סקירה כללית

המאמר הוא אוסף של קטעי קוד “חסרים” של `fetch` ומקרים נפוצים שהייתי רוצה שיהיו קלים יותר למציאה.

- [סקירה כללית](#overview)
- [השוואת תכונות](#feature-comparison)
- [מתכוני Fetch](#fetch-recipes)
  - [קבלת JSON מכתובת URL](#get-json-from-a-url)
  - [כותרות מותאמות](#custom-headers)
  - [טיפול בשגיאות HTTP](#http-error-handling)
  - [דוגמת CORS](#cors-example)
  - [שליחת JSON](#posting-json)
  - [שליחת `<form>` HTML](#posting-an-html-form)
  - [נתונים מקודדים בטופס](#form-encoded-data)
  - [העלאת קובץ](#uploading-a-file)
  - [העלאת קבצים מרובים](#uploading-multiple-files)
  - [זמני קצוב (Timeouts)](#timeouts)
  - [עוזר התקדמות הורדה](#download-progress-helper)
  - [עוזר נסיונות חוזרים רקורסיביים](#recursive-retry-helper)
  - [טיפול בהפניות HTTP](#handling-http-redirects)
  - [ביטול בקשת fetch](#canceling-a-fetch-request) ✨new✨
- [תאימות](#compatibility)

> מקרה השימוש שלכם לא מופיע ברשימה? [הודיעו לי ✉️](/contact/)

<br />

### השוואת תכונות

|                                                 | fetch    | axios    | request |
|-------------------------------------------------|:--------:|:--------:|:-------:|
| ליירוט בקשות ותשובות                              |✅        |✅         |✅       |
| שינוי (טרנספורם) של נתוני בקשה ותשובה               |✅        |✅         |✅       |
| ביטול בקשות                                      |✅        |✅         |❌       |
| המרות אוטומטיות ל‑JSON                           |עוזרים ידניים |✅         |✅       |
| תמיכה בצד הלקוח להגנה מפני XSRF                    |✅        |✅         |✅       |
| התקדמות                                          |✅        |✅         |✅       |
| סטרימינג                                         |✅        |✅         |✅       |
| הפניות (Redirects)                               |✅        |✅         |✅       |

<br /><br />

כאשר התחלתי לכתוב את המאמר (סוף 2018, עדכון 2024) הנחתי שאסיים בטבלה של תיבות סימון מעורבות. בוודאי קיימים _מקרי שימוש_ מיוחדים שהצדיקו את השימוש ב‑[`axios`](https://www.npmjs.com/package/axios), [`request`](https://www.npmjs.com/package/request), [`r2`](https://www.npmjs.com/package/r2), [`superagent`](https://www.npmjs.com/package/superagent), [`got`](https://www.npmjs.com/package/got) ועוד.

אבל, כפי שמתגלה, **הערכת הצורך בספריות HTTP צד שלישי הייתה מופרזת.**

למרות שהשתמשתי ב‑`fetch` במשך כמה שנים (כולל משימות לא טריוויאליות: העלאת קבצים ותמיכה בשגיאות/נסיונות חוזרים) עדיין היו לי תפיסות מוטעות לגבי היכולות והמגבלות של `fetch`.

`fetch` המקורי אינו מפענח תגובות JSON אוטומטית ולא ממיר אובייקטים ל‑JSON בבקשות. צריך לקרוא `response.json()` כשמקבלים את התשובה ולקרוא `JSON.stringify()` לפני שליחת הבקשה. כאן Axios עדיין מנצח מבחינת נוחות; הטיעון ל‑`fetch` הוא שעוזר קטן לרוב ממלא את הפער.

בואו נבדוק מה `fetch` מסוגל לעשות...

## מתכונים ל‑Fetch

### קבלת JSON מכתובת URL

<Gist path='justsml/de941bd61cc86e30beedbb8a3a646f81'></Gist>

### כותרות מותאמות

<Gist path='../justsml/fca7cd72ec1ebc07d994eac13a665ddf' />

### טיפול בשגיאות HTTP

<Gist path='../justsml/81919a72897ebc503c6b34a556a9bde2' />

### דוגמת CORS

CORS נבדק בעיקר בצד השרת – ולכן יש לוודא שההגדרות נכונות בצד השרת.

האפשרות `credentials` שולטת האם העוגיות שלך נכללות אוטומטית.

<Gist path='../justsml/3ddd9ed8705f48cdf45d313d1e57aa2a' />

### שליחת JSON

<Gist path='../justsml/13915347d6c8413c73f4bd7240c68e51' />

### פרסום `<form>` HTML

<Gist path='../justsml/ef2e356bec0ef7c6e528d84a5f75ba7e' />

### נתונים מקודדים בטופס

כדי לפרסם נתונים עם `Content-Type` של `application/x-www-form-urlencoded` נשתמש ב‑`URLSearchParams` כדי לקודד את הנתונים כמו מחרוזת שאילתה.

לדוגמה, `new URLSearchParams({a: 1, b: 2})` מחזיר `a=1&b=2`.

<Gist path='../justsml/716c4534ef4afb22f65d4fc4367c7136' />

### העלאת קובץ

<Gist path='../justsml/301f22aa37df565ba3051bd5f95b4df1' />

### העלאת קבצים מרובים

הגדר אלמנט העלאת קבצים עם המאפיין `multiple`:

<Gist path='../justsml/37836357041d8ca4d1b32e12638cb0ba' />

לאחר מכן השתמשו במשהו כמו:

<Gist path='../justsml/d17f50c36a5ddb70f584c0aa6de94237' />

### פקיעת זמן

הנה דוגמת Timeout גנרית ל‑Promise, המשתמשת בתבנית “Partial Application”. היא עובדת עם כל ממשק של Promise. אל תבצעו יותר מדי עבודה בשרשרת ה‑Promise שסופקה – היא תמשיך לרוץ, וכל כשלון עלול ליצור דליפות זיכרון ארוכות טווח.

<Gist path='../justsml/f93b2ef6457b3e52eb995831b67cab85' />

ודוגמה מורכבת יותר, הכוללת דגל מעקב `__timeout` כך שניתן **ליירט כל עבודה יקרה**.

<Gist path='../justsml/5e492db8997a4f7e22e61b7486cbf273' />

### עוזר התקדמות הורדה

התקדמות העלאה עדיין פגומה במעט מחוץ ל‑Chrome.

המתודולוגיה של מנהל ההתקדמות [הטכניקה המוצגת למטה נמנעת מלעטוף](#source-progress-helper) את קריאת `fetch` בסגירה. 👍  

ל‑`progressHelper` יש את הממשק הבא (המקור זמין למטה)

<Gist path='../justsml/db5ccc55ffb93c75e04e014d1f553cfb' />

נבחן דוגמת שימוש:

<Gist path='../justsml/9bec219590ff50688972c1caff67c14b' />

מאפשר הורדת תמונות שניתן לשוב להשתמש בו עשוי להיראות כך `getBlob()`:

<Gist path='../justsml/bef2dd7e630eb7642beb3e2be29489b2' />

אגב, `Blob` הוא Binary Large Object.

חשוב לבחור באחת משתי תבניות השימוש שלהלן (הן שוות פונקציונלית):

<Gist path='../justsml/6ad9e37a96ad1f3a75ca509038510a5b' />

העדפה שלי היא `Option #1`. עם זאת, תכנון התחום שלכם עשוי לכפות שימוש ב‑`Option #2`.

ולבסוף, החלק האחרון של המתכון הזה, ה‑`progressHelper` שלנו:

##### מקור: Progress Helper

<Gist path='../justsml/a8ffd810fc7e5a5295dfc898302ddbfc' />

_קרדיט:_ תודה מיוחדת ל‑Anthum Chris ול‑[ה‑PoC המדהים של Progress+Fetch המוצג כאן](https://github.com/AnthumChris/fetch-progress-indicators)

### עוזר נסיונות חוזרים רקורסיבי

<Gist path='../justsml/7e52521a0af50fa590be57d5b4593120' />

### טיפול בהפניות HTTP

<Gist path='../justsml/3dd0a799ada8da7cd15943ff254266de' />

### ביטול בקשת fetch

<Gist path='../justsml/7f257ac3de3c7792db8485588c54e938' />

### תאימות

מאז 2022, ממשק ה‑`fetch` נתמך [במגוון רחב של דפדפנים מודרניים](https://caniuse.com/#feat=fetch) וגם בגרסאות החדשות של NodeJS v18+.

אם אתה חייב לתמוך ב‑IE, ניתן [להוסיף polyfill ל‑fetch](https://github.com/github/fetch#browser-support) באמצעות חבילת `github/fetch` (מתוחזקת על‑ידי צוות מצוין ב‑GitHub). אפשר לחזור אפילו עד [IE8](https://github.com/camsong/fetch-ie8) – _התוצאות תלויות במצב הספציפי שלך_.

ב‑NodeJS גרסאות קודמות ניתן לנצל את ממשק ה‑`fetch` בעזרת חבילת [`node-fetch`](https://www.npmjs.com/package/node-fetch):

```sh
npm install node-fetch
```

_לאחר שילוב polyfill + node-fetch: תאימות של 99.99%_ ✅

> אנא [שלח לי ציוץ](https://x.com/justsml) אם יש לך מקרי שימוש אחרים שתרצה לראות. ❤️
````
