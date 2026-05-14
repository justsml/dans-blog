# Translation Candidate
- Slug: javascript-scope-magic
- Locale: he
- Model: openrouter/deepseek/deepseek-v4-flash
- Target: src/content/posts/2015-06-06--javascript-scope-magic/he/index.mdx
- Validation: deferred
- Runtime seconds: 19.54
- Input tokens: 1658
- Output tokens: 2764
- Thinking tokens: unknown
- Cached input tokens: 384
- Cache write tokens: 0
- Estimated cost: $0.000953
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
title: קסם JavaScript
subTitle: אימפרטיבי לעומת רקורסיבי לעומת פונקציונלי
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
## אימפרטיבי לעומת רקורסיבי לעומת פונקציונלי

> [ עבודה בתהליך ]

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

1.  אמנם, ההבטחות המקוריות של ES6 נהדרות, אני מעדיף את [ספריית Bluebird Promise](https://github.com/petkaantonov/bluebird/blob/master/API.md) החזקה.
1.  ספרייה או לא, דפדפנים מודרניים תומכים ב-Promise כבר שנים.
1.  ניתן להשתמש בהבטחות ללא תבניות מטורפות - `deferred` מרומז עדיף.
1.  **$q פשוט גרוע** פשוט תשתמש ב-bluebird, ראה לעיל.
1.  כדאי לציין: ה-Benchmarks של Bluebird הם מבחני מקרה מיטבי, אז שים לב אם אתה עושה שרשראות הבטחות מפוארות ומטורפות

## Java לעומת JavaScript

### הגבלת קצב / דיבונסינג / תרוטלינג

1.  ב-JavaScript [דייוויד וולש יישם debounce](http://davidwalsh.name/essential-javascript-functions) בפחות מ-20 שורות!
1.  ב-Java, JDebounce, ספרייה שהיא הרבה יותר מסובכת, בכ-500+ שורות.
1.  _ השוואה בין השניים: _
1.  ה-JavaScript מהיר ומשתמש בפונקציות ממחלקה ראשונה כדי להשיג פשטות מבריקה.
1.  בעוד של-Java יש הרבה יותר חלקים נעים, הערות (annotations) משמשות להחלת התנהגות בזמן קומפילציה, ויש טונות של XML, רק בשביל הכיף!

<!--
## Inversion of Control Techniques

Work-in-progress
-->

[fuck_this]: https://res.cloudinary.com/ddd/image/upload/panda-rampage__tumblr_nq7srwTXqr1stn6klo1_500_gm2som.gif
````
