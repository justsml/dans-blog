# Translation Candidate
- Slug: stop-trying-to-make-async-await-happen
- Locale: he
- Model: openrouter/openai/gpt-oss-120b:nitro
- Target: src/content/posts/2018-10-03--stop-trying-to-make-async-await-happen/he/index.mdx
- Validation: deferred
- Runtime seconds: 7.21
- Input tokens: 7908
- Output tokens: 2626
- Thinking tokens: unknown
- Cached input tokens: 3584
- Cache write tokens: 0
- Estimated cost: $0.000781
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
social_image: ../desktop-social.webp
title: הפסיקו לנסות לגרום ל‑async/await לעבוד
subTitle: ההבטחות ממש מגניבות עכשיו
date: '2018-10-03'
modified: '2024-08-03'
category: Guides
subCategory: promises
tags:
  - promises
  - async
  - await
  - async-await
  - javascript
  - composition
related:
  - intro-to-promises
  - promise-gotchas
  - visualizing-promises
  - you-may-not-need-axios
cover: ../matt-nelson-414464-unsplash.webp
cover_mobile: ../w300_matt-nelson-414464-unsplash.webp
cover_icon: ../icon_matt-nelson-414464-unsplash.webp
---
מאז תחילת הזמן, מפתחים נלחמו בהרבה קרבות טיפשיים. מהקלאסיקה _"טאבים נגד רווחים"_ ועד הוויכוח הנצחי _"מק נגד PC"_, אנחנו טובים במציאת ויכוחים שמסיחים את הדעת.

<br />
<small>_תשובות:_ לינוקס ורווחים.</small>

<!-- אנחנו נסקור 2 כללים לשיפור החיים שלכם עם Promises. -->

## הקרב...?

### Promises נגד Async/Await!

חכו, זה קרב? חייב להיות, נכון? אנחנו כבר לא מדברים על callbacks?

לא, זה לא קרב. בסופו של דבר זה רק כלי נוסף בארגז הכלים שלכם. עם זאת, מכיוון ש‑`async`/`await` לא מחליף את כל הפונקציונליות של Promise (בפרט `Promise.all`, `.race`) **זה מטעה להציגו כהחלפה.**

יש הרבה אנשים משפיעים שמקדמים את ההבנה השגויה ש‑`async`/`await` הוא ה‑[החלפה של Promises](https://developers.google.com/web/fundamentals/primers/async-functions) [שכולם](https://hackernoon.com/6-reasons-why-javascripts-async-await-blows-promises-away-tutorial-c7ec10518dd9) [מחכים](https://x.com/umaar/status/1045655069478334464) [לה](http://2ality.com/2017/08/promise-try.html#why-not-just-use-async-functions) [להיות](https://dzone.com/articles/javascript-promises-and-why-asyncawait-wins-the-ba).

> **רמז: לא, לא, ואף לא במקצת.**

הוספה אחרונה ל‑VS Code מחזקת את ההטייה הזו. כפי שטוויטר של [@umaar](https://x.com/umaar) כתב:

<blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">Visual Studio Code can now convert your long chains of Promise.then()&#39;s into async/await! 🎊 Works very well in both JavaScript and TypeScript files. .catch() is also correctly converted to try/catch ✅ <a href="https://t.co/xb39Lsp84V">pic.x.com/xb39Lsp84V</a></p>&mdash; Umar Hansa (@umaar) <a href="https://x.com/umaar/status/1045655069478334464?ref_src=twsrc%5Etfw">September 28, 2018</a></blockquote>

<!-- Sure, it's an impressive addition to an already amazing list of features. -->

אם אתה שונא Promises ומחפש את תכונת הריפקטורינג הזו, אני לא מאשים אותך.

<br />

_אני מבין. אני מרגיש את זה._

<br />

הייתי שם. 🤗

<br />

הייתי שונא Promises. היום חזרתי אליהם במלואם. **Promises מדהימים.** הם מאפשרים/מעודדים אותך **להשתמש בהרכבת פונקציות.**

יש שני תחומים שאני ממליץ להתמקד בהם תחילה כדי לשפר את הטכניקה שלך עם Promises.

1. [פונקציות בשם (בלי אנונימיות)](#rule-1)
1. [פונקציות למטרה יחידה](#rule-2)

<h2 id="rule-1">#1: פונקציות בשם!</h2>

השליכו את השיטות האנונימיות שלכם. שימוש **בפונקציות בשם** גורם לקוד לקרוא כמו שירה של הדרישות שלכם.

נבחן דוגמה נפוצה:

ביצוע בקשת HTTP GET באמצעות `fetch`:

<!-- the fetch specification states [HTTP status codes](https://http.cat/) over 400 or 500 **do not automatically trigger an error.** The default in many AJAX libraries (jQuery, axios). -->

<!-- Before we see the solution, look over a common "recommended" implementation: -->

### תבנית נגדית

```js
// ❌ שימוש בפונקציות אנונימיות משולבות 💩
fetch(url)
  .then(response => response.status < 400
    ? response
    : Promise.reject(new Error('Request Failed: ' + response.ststus)))
  .then(response => response.text())
```

### פתרון: פונקציות בשם

```js
// ✅ בהירות מתהווה: פונקציות בשם
fetch(url)
  .then(checkResponse)
  .then(getText)


// פונקציות כלליות לשימוש חוזר
function checkResponse(response) {
  return response.status < 400
    ? response
    : Promise.reject(new Error('Request Failed: ' + response.ststus))
}
function getText(response) {
  return response.text()
}
```

> היתרונות של גישה זו מתבהרים יותר ויותר ככל שהקוד שלכם נעשה יותר DRY.

**משאבים נוספים:** צפו ב**סרטונים של דקה אחת** שלי על [רישום בסיסי](https://youtu.be/xR_MZE1SIkk) ו[ניפוי באגים מתקדם](https://youtu.be/P_tghqWj72M) באמצעות טכניקה זו.

<h2 id="rule-2">#2: מטרה יחידה (פונקציות)</h2>

זה נשמע _מדויק במרמה_: מטרה יחידה.

ואף על כן זה כל כך סובייקטיבי, שרירותי, ולעיתים אפילו חסר משמעות.

<!-- במקום להתווכח אם פונקציה מסוימת ממוקדת מספיק.

הגעתי למדד גס לכך: `Purpose Cost`. ככל שהציון גבוה יותר, הסבירות שהיא עושה יותר מדי.

```js
// 1 נקודה: החזרה והטרנרי הם למעשה שורה אחת
function checkResponse(response) {
  return response.status < 400
    ? response
    : Promise.reject(new Error('Request Failed: ' + response.ststus))
}
// 1 נקודה: החזרה והביטוי הם גם למעשה שורה אחת
function getText(response) {
  return response.text()
}
```

בהתאם לקוד של פונקציה, מוסיפים נקודה אחת לכל שורה שמכילה כל אחד מהבאים: `if`, `return`, טרנרי, `for`, `const`, `let`, `var`, `switch`, `while`, `[].map/filter/reduce/etc`. מוסיפים נקודה אחת לכל פקודה (מתעלמים משורות ריקות). רצף של ביטויים או קריאות שיטה נספר רק כנקודה אחת.

אף, זה היה קצת ג'רגון.
 -->

מעניין, רוב המפתחים מדווחים שהם _בדיוק טובים_ ביישום **מטרה יחידה** בקוד שלהם. לא במקרה: הם מדווחים שגם נהגים מצוין!

<!-- זה **אינו נושא ייחודי ל-Promises**, שיטות מערך וכל שאר ה-API המבוססים על פונקציות מסדר גבוה (Higher Order Function) חולקים את אותה ארגונומיה. -->

בואו נבחן דוגמה שה‑[Jake Archibald](https://x.com/jaffathecake) (הכשרון שלו מדהים) מציג במאמרו על async/await באתר Google Developers (הערה: 2024, הקישור הוסר).

```js
// source: https://developers.google.com/web/fundamentals/primers/async-functions
function logInOrder(urls) {
  // fetch all the URLs
  const textPromises = urls.map(url => {
    return fetch(url).then(response => response.text());
  });

  // log them in order
  textPromises.reduce((chain, textPromise) => {
    return chain.then(() => textPromise)
      .then(text => console.log(text));
  }, Promise.resolve());
}
```

### מטרה יחידה?

הייתי אומר שלא. מה עושה `logInOrder`?

1. עוברת על רשימת `urls`
2. מבצעת על כל אחת קריאת HTTP GET משולבת:
   1. `fetch` של HTTP
   2. מחזירה את גוף הטקסט של התגובה
3. מוסיפה `.then(text => console.log(text))` אחרי כל הבטחה ב‑`textPromise`
   1. מדפיסה את התוצאות סדרתית

בפונקציה הזאת מוגדרים חמישה מתודות אנונימיות. כפי ש‑Jake מציין, ה‑`.reduce` מורכב מדי. אין טעם לכתוב מנגנונים מתוחכמים ידנית בכל מקום בקוד. במילים אחרות, אנחנו לא כותבים קוד יצירת DOM עם `document.createElement()`, `element.setAttribute()` וכדומה ללא סוף. במקום זאת בוחרים בכלי המתאים ביותר מתוך מגוון אפשרויות: פונקציות עזר/ספריות, או מסגרות עבודה.

#### פתרון: פונקציות בעלות מטרה יחידה

### התחילו ב**הוצאת מתודות**...

![VS Code refactor extracting async methods from Promise code](../async-refactor-google-extract-methods-resized-75.webp "Extracting methods")

### המשיכו בהחלפת `.reduce()` ו‑`logPromise()` ב‑`Promise.all` וב‑`..map()`...

![Refactored Promise chain using Promise all and map for readability](../async-refactor-google-chain-methods-resized-75.webp "Improving readability")

### סיכום

נסו ליישם את הטכניקות האלה בקוד שלכם! ואז [שלחו לי ציוץ](https://x.com/justsml) ותספרו איך זה הלך. אם יש לכם שאלות או תגובות, פנו גם כן!

עזרו להפיץ את #PromiseTruth ושתפו את המאמר הזה. ❤️

![credit: matt-nelson-414464-unsplash.webp](../matt-nelson-414464-unsplash.webp)

#### קריאה קשורה

* [Daniel Brain](https://medium.com/@bluepnume/even-with-async-await-you-probably-still-need-promises-9b259854c161)
* [Eric Elliott](https://x.com/_ericelliott?lang=en)
````
