# Translation Candidate
- Slug: javascript-scope-magic
- Locale: ar
- Model: openrouter/openai/gpt-oss-120b:nitro
- Target: src/content/posts/2015-06-06--javascript-scope-magic/ar/index.mdx
- Validation: deferred
- Runtime seconds: 2.71
- Input tokens: 1648
- Output tokens: 993
- Thinking tokens: unknown
- Cached input tokens: 512
- Cache write tokens: 0
- Estimated cost: $0.000243
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
title: سحر جافاسكريبت
subTitle: '[مسودة] إلزامي مقابل تكراري مقابل وظيفي'
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
## الإمبراطورية مقابل العودية مقابل الوظيفية

> [ قيد الإنجاز ]

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

## الوعود: رائعة!

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

1.  بينما الوعود الأصلية في ES6 جيدة، أفضّل مكتبة [Bluebird Promise Library](https://github.com/petkaantonov/bluebird/blob/master/API.md) الأكثر صلابة.
1.  سواء استخدمتها أم لا، المتصفحات الحديثة تدعم الوعود منذ سنوات.
1.  يمكن استعمال الوعود دون أنماط معقدة – `deferred` الضمني هو المفضَّل.
1.  **$q سيء** استخدم Bluebird فقط، كما هو موضح أعلاه.
1.  جدير بالذكر: معايير Bluebird هي اختبارات أفضل حالة، لذا خذ ذلك في الاعتبار إذا كنت تبني سلاسل وعود معقدة.

## جافا مقابل جافاسكريبت

### تحديد المعدل / إلغاء الضوضاء / التثبيت

1.  في جافاسكريبت [ديفيد والش نفّذ إلغاء الضوضاء](http://davidwalsh.name/essential-javascript-functions) بأقل من 20 سطرًا!
1.  في جافا، JDebounce، مكتبة أكثر تعقيدًا، تتجاوز 500 سطر.
1.  _ مقارنة بينهما: _
1.  جافاسكريبت سريع ويستخدم الدوال من الدرجة الأولى لتحقيق بساطة مذهلة.
1.  بينما جافا تحتوي على أجزاء متحركة أكثر، تُستَخدم التعليقات التوضيحية لتطبيق السلوك أثناء التجميع، وهناك الكثير من XML، فقط للمتعة!

<!--
## Inversion of Control Techniques

Work-in-progress
-->

[fuck_this]: https://res.cloudinary.com/ddd/image/upload/panda-rampage__tumblr_nq7srwTXqr1stn6klo1_500_gm2som.gif
````
