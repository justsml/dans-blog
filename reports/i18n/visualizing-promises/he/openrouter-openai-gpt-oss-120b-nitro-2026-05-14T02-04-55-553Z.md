# Translation Candidate
- Slug: visualizing-promises
- Locale: he
- Model: openrouter/openai/gpt-oss-120b:nitro
- Target: src/content/posts/2018-09-30--visualizing-promises/he/index.mdx
- Validation: deferred
- Runtime seconds: 4.45
- Input tokens: 3551
- Output tokens: 1254
- Thinking tokens: unknown
- Cached input tokens: 1536
- Cache write tokens: 0
- Estimated cost: $0.000364
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
social_image: ../desktop-social.webp
title: המחשת הבטחות
subTitle: פרוץ דרך…
date: '2018-09-30'
modified: '2024-07-30'
category: Guides
subCategory: promises
cover: ../junior-ferreira-735237-unsplash.webp
cover_mobile: ../w300_junior-ferreira-735237-unsplash.webp
cover_icon: ../icon_junior-ferreira-735237-unsplash.webp
tags:
  - promises
  - async
  - visualizing
  - javascript
  - composition
related:
  - intro-to-promises
  - promise-gotchas
  - stop-trying-to-make-async-await-happen
  - javascript-promises-quiz
---
כדי לראות איך הבטחות (Promises) מתבצעות, נגדיר שיטה חדשה `delay(millisecs)`.

```js
function delay(millisecs) {
  return new Promise(resolve => {
    setTimeout(() => resolve(millisecs), millisecs);
  });
}
```

זוהי שיטה עזרית שתפתור את ההבטחה ברגע שה‑timeout יסתיים.

ה‑delay במילישניות יועבר כפרמטר לקריאת‑החזרה של `.then`.

נבחן 4 דוגמאות (עם צירי זמן מונפשים).

## דוגמה #1/4

הדוגמה מציגה איך ביצוע של `console.log()` מתוזמן על‑ידי `delay(msec)`.

```js
delay(1000).then(() => console.log("done"));
```

![Timeline showing delay 1000 then console log running after one second](../N_1000ms_log.webp)

<!-- ```
delay(1000) --------|.then(fn)
                    | console.log('done')
|-------------------|--------------------|--------------------|-----------------
0msec             1sec                 2sec                 3sec
``` -->

## דוגמה #2/4

_זוהי דוגמה לשגיאה נפוצה._

ה‑`console.log` מתבצע מיד כש‑`delay(1000)` **מתחיל**. לא **אחרי** ההמתנה כפי שסביר להניח שרצית.

מאחר שה‑`console.log` מחזיר `undefined`, ה‑`.then()` שלנו נזנח בשקט.

שימו לב להבדל בין `typeof console.log === 'function'` לעומת `typeof console.log() === undefined`.

בדרך כלל השימוש הרצוי עבור `console.log` מוצג בדוגמה #1. ודאו שאתם מעבירים פונקציות ל‑`.then` ול‑`.catch`.

```js
delay(1000).then(console.log("done"));
```

![Timeline showing console log running immediately before the delay finishes](../N_1000ms_!log.webp)

<!-- ```
delay(1000) --------|.then(null)
console.log('done')
|-------------------|--------------------|--------------------|-----------------
0msec             1sec                 2sec                 3sec
``` -->

## דוגמה #3/4

שלוש הבטחות מתבצעות במקביל.

```js
delay(1000).then(console.log);
delay(2000).then(console.log);
delay(3000).then(console.log);
```

![Timeline showing three delay promises resolving after one two and three seconds](../N_3000ms.webp)

<!-- ```
delay(1000) ------|.then(console.log)
delay(2000) ------|--------------------|.then(console.log)
delay(3000) ------|--------------------|--------------------|.then(console.log)
|-----------------|--------------------|--------------------|-------------------
|                 |                    |                    |
0msec           1sec                 2sec                 3sec
``` -->

## דוגמה #4/4

`Promise.all` עם 3 הבטחות `delay`. הן יתבצעו במקביל.

```js
Promise.all([delay(1000), delay(2000), delay(3000)]).then(console.log);
```

![Timeline showing Promise all waiting for all three delay promises](../N_3000ms_PromiseAll.webp)

<!--

```
delay(1000) ---| [resolved]------------------v
delay(2000) ---|--------------| [resolved]---v
delay(3000) ---|--------------|--------------v [resolved]
Promise.all()  |--------------|-------------- > console.log([1000, 2000, 3000])
|--------------|--------------|--------------|--------------------------------
|              |              |              |
0msec        1sec           2sec           3sec
```

-->

> קרדיטים:
> 
> - דיאגרמות async מונפשות מאת [Patrick Biffle](https://github.com/Piglacquer)
> - השראה למאמר זה: https://pouchdb.com/2015/05/18/we-have-a-problem-with-promises.html

<!-- <div class="challenge" title="Question #1: Meaning of life:">

  <ul class="options">
    <li>1</li>
    <li>2</li>
    <li class="answer">42</li>
    <li>3</li>
  </ul>
  <div class="description">What is the meaning of life?</div>

</div> -->
````
