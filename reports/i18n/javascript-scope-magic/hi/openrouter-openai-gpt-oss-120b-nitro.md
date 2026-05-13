# Translation Candidate
- Slug: javascript-scope-magic
- Locale: hi
- Model: openrouter/openai/gpt-oss-120b:nitro
- Target: src/content/posts/2015-06-06--javascript-scope-magic/hi/index.mdx
- Validation: passed
- Runtime seconds: 2.49
- Input tokens: 2522
- Output tokens: 967
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- Estimated cost: $0.000272
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
title: जावास्क्रिप्ट जादू
subTitle: '[draft] इम्पेरेटिव बनाम रीकर्सिव बनाम फ़ंक्शनल'
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
## Imperative vs. Recursive vs. Functional

> [ कार्य‑प्रगति में ]

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

## Promises: Awesome!

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

1.  जबकि, नेटिव ES6 Promises बढ़िया हैं, मैं मजबूत [Bluebird Promise Library](https://github.com/petkaantonov/bluebird/blob/master/API.md) को प्राथमिकता देता हूँ।
2.  लाइब्रेरी हो या न हो, आधुनिक ब्राउज़र कई सालों से Promise को सपोर्ट करते हैं।
3.  Promises को पागलपन भरे पैटर्न के बिना इस्तेमाल किया जा सकता है – implicit `deferred` अधिक पसंदीदा है।
4.  **$q बस बेकार है** – बस bluebird इस्तेमाल करें, ऊपर देखें।
5.  उल्लेखनीय: Bluebird के बेंचमार्क सर्वश्रेष्ठ‑केस टेस्ट हैं, इसलिए अगर आप जटिल promise चेन बना रहे हैं तो ध्यान रखें।

## Java vs JavaScript

### Rate Limiting / Debouncing / Throttling

1.  JavaScript में [David Walsh ने डेबाउंस लागू किया](http://davidwalsh.name/essential-javascript-functions) केवल 20 पंक्तियों से कम में!  
2.  Java में, JDebounce, एक लाइब्रेरी जो लगभग 500+ पंक्तियों में काफी जटिल है।  
3.  _ दोनों की तुलना: _  
4.  JavaScript तेज़ है और प्रथम‑श्रेणी फ़ंक्शनों का उपयोग करके शानदार सरलता हासिल करता है।  
5.  जबकि Java में कई अतिरिक्त घटक होते हैं, व्यवहार को कंपाइल‑टाइम पर लागू करने के लिए एनोटेशन का उपयोग किया जाता है, और सिर्फ मज़े के लिए बहुत सारा XML भी शामिल होता है!
````
