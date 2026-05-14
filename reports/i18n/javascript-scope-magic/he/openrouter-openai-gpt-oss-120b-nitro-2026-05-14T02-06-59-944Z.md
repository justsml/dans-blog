# Translation Candidate
- Slug: javascript-scope-magic
- Locale: he
- Model: openrouter/openai/gpt-oss-120b:nitro
- Target: src/content/posts/2015-06-06--javascript-scope-magic/he/index.mdx
- Validation: deferred
- Runtime seconds: 2.83
- Input tokens: 1672
- Output tokens: 948
- Thinking tokens: unknown
- Cached input tokens: 512
- Cache write tokens: 0
- Estimated cost: $0.000236
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
title: קסם JavaScript
subTitle: '[טיוטה] אימפרטיבי מול רקורסיבי מול פונקציונלי'
date: '2015-06-06'
modified: '2024-07-30'
category: Code
subCategory: javascript
draft: true
publish: true
tags:
  - javascript
  - programming
  - performance
  - patterns
cover: ../markus-spiske-197281-unsplash.webp
cover_mobile: ../w300_markus-spiske-197281-unsplash.webp
cover_icon: ../icon_markus-spiske-197281-unsplash.webp
---
## אימפרטיבי vs. רקורסיבי vs. פונקציונלי

> [ בתהליך עבודה ]

```javascript
// Imperative: The Fastest ( + very simple, no new pointers or excess allocs ):
function fib(n) {
  var a = 1,
    b = 1,
    c = 0;
  for (var i = 1; i < n - 1; ++i) {
    c = a + b;
    a = b;
    b = c;
  }
  return b;
}

// Recursive: (FIREFOX or BABELJS Only) ES6 function definition with
//  parameter defaults used to set initial (internal/recursive) values
function fib(n, current = 0, a = 1, b = 1, c = 0) {
  current++;
  c = a + b;
  a = b;
  b = c;
  return current >= n ? b : fib(n, current, a, b, c);
}

// Text-book-Bad Example - poor function scope w/ multiple mutable external values
function fib(n) {
  if (!arr) {
    var arr = [1, 1];
    n = n - 2;
  } // Bad
  if (n === -1) {
    return [arr[0]];
  }
  if (n === 0) {
    return arr;
  }
  var proc = function() {
    --n;
    arr.push(arr[arr.length - 1] + arr[arr.length - 2]);
    return n === 0 ? arr : proc();
    // Bad: inner recursive function not needed, hint: variables used are from parent function scope
  };
  var ans = proc();
  return ans[ans.length - 1];
}
``` 

## הבטחות: מדהים!

```js
// Example Using bluebird Promises and it's
var Promise = require("bluebird"),
  fs = Promise.promisifyAll(require("fs")),
  less = Promise.promisifyAll(require("less"));

function writeFileData(data) {
  return fs.writeFileAsync("/tmp/output.css", data);
}
// Bluebird makes something like this perhaps uncomfortably simple and succinct:
fs.readFileAsync("./style.less") // Call promisified readFile()
  .then(less.renderAsync) // Hand off to less.render
  .then(writeFileData); // Function to recieve the css contents (1st parameter)
``` 

1.  בעוד שההבטחות המובנות של ES6 מצוינות, אני מעדיף את ספריית [Bluebird Promise Library](https://github.com/petkaantonov/bluebird/blob/master/API.md) העמידה.
2.  ספרייה או לא, דפדפנים מודרניים תומכים בהבטחות כבר שנים.
3.  ניתן להשתמש בהבטחות בלי תבניות משוגעות – `deferred` מפורש הוא העדיף.
4.  **$q פשוט גרוע** – השתמשו ב‑bluebird, ראו למעלה.
5.  שווה לציין: המדדים של Bluebird הם מבחנים בתרחיש הטוב ביותר, אז קחו זאת בחשבון כשבונים שרשראות הבטחה מורכבות.

## Java vs JavaScript

### הגבלת קצב / דיבאונסינג / תיווך

1.  ב‑JavaScript [דיוויד וולש מימש debounce](http://davidwalsh.name/essential-javascript-functions) בפחות מ‑20 שורות!
2.  ב‑Java, JDebounce, ספרייה הרבה יותר מסובכת, בכ‑500+ שורות.
3.  _השוואה בין השניים:_
4.  ב‑JavaScript הקוד מהיר ומשתמש בפונקציות ברמת‑הראשון כדי להגיע לפשטות מבריקה.
5.  בעוד שב‑Java יש הרבה יותר חלקים נעים, אנוטציות משמשות ליישום התנהגות בזמן הקומפילציה, ויש שפע של XML – רק בשביל הכיף!

<!--
## Inversion of Control Techniques

Work-in-progress
-->

[fuck_this]: ../res.cloudinary.com/ddd/image/upload/panda-rampage__tumblr_nq7srwTXqr1stn6klo1_500_gm2som.gif
````
