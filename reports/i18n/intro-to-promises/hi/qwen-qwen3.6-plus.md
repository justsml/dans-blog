# Translation Candidate
- Slug: intro-to-promises
- Locale: hi
- Model: qwen/qwen3.6-plus
- Target: src/content/posts/2018-08-01--intro-to-promises/hi/index.mdx
- Validation: rejected: direct AI SDK translation failed
- Runtime seconds: 240.06
- Input tokens: unknown
- Output tokens: unknown
- Thinking tokens: unknown
- Cached input tokens: unknown
- Cache write tokens: unknown
- Estimated cost: unknown
- Pricing source: unknown
- Note: Command failed after 240000ms: bun run i18n:translate:chunked -- --slug intro-to-promises --locale hi --model qwen/qwen3.6-plus --chunk 6p --run-id 2026-05-13T18-15-57-947Z-61322 --run-lock-path /Users/dan/code/oss/dans-blog/.git/codex-i18n-translation-run.json --quiz-concurrency 24
## Raw Output

````mdx
---
social_image: ../desktop-social.webp
title: प्रॉमिसेस का परिचय
subTitle: JavaScript Promises मज़ेदार हैं!
date: '2018-08-01'
modified: '2024-07-31'
category: Code
subCategory: promises
tags:
  - promises
  - async
  - javascript
  - composition
related:
  - promise-gotchas
  - visualizing-promises
  - stop-trying-to-make-async-await-happen
  - javascript-promises-quiz
cover: ../joe-yates-480485-unsplash.webp
cover_mobile: ../w300_joe-yates-480485-unsplash.webp
cover_icon: ../icon_joe-yates-480485-unsplash.webp
---
## Promises... क्या है इनका मामला?

जब भी आप कोई कंप्यूटर कोड निष्पादित करते हैं, तो 2 संभावित परिणाम होते हैं: **सफलता** या **विफलता**।

यदि वह कोड प्रकृति में एसिंक्रोनस है, तो उस परिणाम पर विश्वसनीय रूप से निर्भर होना कठिन हो सकता है।

**`Promises`** इससे निपटने का एक सुविधाजनक तरीका प्रदान करते हैं।

```
                        +--Promise---+
                        |            |
                        | <-either-> |
                        |            |
                <-------+            +-------->
                |Failure?             Success?|
                |                             |
                v                             v
                (Rejected)           (Resolved)
```

> पार्श्व टिप्पणी: जबकि Promises को resolve या reject होना चाहिए, वे ऐसा करने में विफल हो सकते हैं। इससे ऐप्स हैंग हो जाते हैं, और डीबग करना बहुत कठिन हो सकता है।

### Promises कहाँ से आते हैं?

कई बार आपको स्वयं Promise बनाने की आवश्यकता नहीं होगी। `fetch` जैसे नेटिव APIs और `axios` जैसी लोकप्रिय लाइब्रेरीज़ पहले से ही Promises लौटाती हैं।

हालांकि, यदि आपको Promise बनाना ही है, तो ऐसा करने के 2 तरीके हैं:

### Promises बनाना #1/2:

Promise बनाने का सबसे सरल तरीका हेल्पर मेथड `Promise.resolve()` का उपयोग करना है।

आप `Promise.resolve(value)` का उपयोग करके किसी भी मान को Promise में लपेट (या "रूपांतरित") कर सकते हैं।

```js
// Without Promises:
function add10(num) {
  return num + 10
}

// With Promises:
function add10Promised(num) {
  return Promise.resolve(num + 10)
}

console.log(add10(10)) //=> 20

add10Promised(10)
  .then(x => console.log(x)) //=> 20
```

### Promises बनाना #2/2:

एक और अधिक लचीली विधि: `Promise` कंस्ट्रक्टर का उपयोग करें।

`new Promise(callback)` निम्नलिखित इंटरफ़ेस वाले `callback` फ़ंक्शन को स्वीकार करता है:

```js
new Promise(function(resolve, reject) {
  // The arguments `resolve` and `reject` are both functions.
  // typeof resolve === 'function'
  // typeof reject === 'function'

  // `resolve(result)` must get executed when the promise is fulfilled
  // `reject(Error)` must get executed if the promise is rejected
})
```

### Promises API

Promises API वास्तव में विधियों का एक छोटा समूह है।

2 इंस्टेंस फ़ंक्शन, और 4 स्टैटिक/उपयोगिता फ़ंक्शन।

#### Promise इंस्टेंस विधियाँ

Accessing values from a promise will not work using usual tricks (i.e. `console.log(promise)`).

All Promises return either success (via `.then(fn)`) or failure (via `.catch(fn)`).

#### Promise उपयोगिता विधियाँ

* `Promise.resolve(value)` - किसी भी मान को प्रॉमिस में बदलें
* `Promise.reject(Error)` - एक विफलता प्रॉमिस मान बनाता है, बाद के `.catch()` को ट्रिगर करता है
* `Promise.all([...promises])` - सभी प्रॉमिस के पूरा होने तक प्रतीक्षा करें
* `Promise.race([...promises])` - जैसे ही पहला प्रॉमिस हल होता है, हल हो जाता है
````
