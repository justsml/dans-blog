# Translation Candidate
- Slug: intro-to-promises
- Locale: hi
- Model: openrouter/qwen/qwen3-32b:nitro
- Target: src/content/posts/2018-08-01--intro-to-promises/hi/index.mdx
- Validation: deferred
- Runtime seconds: 11.43
- Input tokens: 3892
- Output tokens: 4598
- Thinking tokens: unknown
- Cached input tokens: 512
- Cache write tokens: 0
- Estimated cost: $0.001415
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
social_image: ../desktop-social.webp
title: ''
subTitle: जावास्क्रिप्ट प्रमिस मज़ाकिला हैं!
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
## प्रमिसेज... ये क्या हैं?

जब आप कोई कंप्यूटर कोड निष्पादित करते हैं, तो दो संभावित परिणाम हो सकते हैं: सफलता या असफलता।

अगर वह कोड एसिंक्रोनस प्रकृति का है, तो उस परिणाम पर निम्नलिखित रूप से निर्भर करना मुश्किल हो सकता है।

**`Promises`** इस समस्या को निपटाने का एक उपयोगी तरीका प्रदान करते हैं।

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

> साइड नोट: जबकि प्रमिसेज को या तो समाप्त करना चाहिए या अस्वीकृत करना चाहिए, वे दोनों में से कोई भी करने में विफल रह सकते हैं। यह एप्लिकेशन्स को रूक जाने का कारण बन सकता है और डीबग करना बहुत मुश्किल हो सकता है।

### प्रमिसेज कहाँ से आते हैं?

अक्सर आपको स्वयं एक प्रमिस बनाने की आवश्यकता नहीं होगी। प्राकृतिक API जैसे `fetch` और लोकप्रिय पुस्तकालय जैसे `axios` पहले से ही प्रमिस लौटा देते हैं।

हालाँकि अगर आपको आवश्यकता हो तो, प्रमिस बनाने के 2 तरीके हैं:

### प्रमिस बनाना #1/2:

प्रमिस बनाने का सबसे सरल तरीका सहायक विधि के साथ है: `Promise.resolve()`।

आप `Promise.resolve(value)` का उपयोग करके कोई भी मान (लपेटकर या "परिवर्तित" करके) एक प्रमिस में बदल सकते हैं।

```js
// प्रमिस के बिना:
function add10(num) {
  return num + 10
}

// प्रमिस के साथ:
function add10Promised(num) {
  return Promise.resolve(num + 10)
}

console.log(add10(10)) //=> 20

add10Promised(10)
  .then(x => console.log(x)) //=> 20
```

### प्रमिस बनाना #2/2:

एक और अधिक लचीला तरीका: `Promise` कंस्ट्रक्टर का उपयोग करें।

`new Promise(callback)` एक `callback` फ़ंक्शन लेता है जिसका निम्नलिखित इंटरफ़ेस होता है:

```js
new Promise(function(resolve, reject) {
  // तर्क `resolve` और `reject` दोनों फ़ंक्शन हैं।
  // typeof resolve === 'function'
  // typeof reject === 'function'

  // `resolve(result)` फ़ंक्शन को तब निष्पादित करना होगा जब प्रमिस पूरा हो जाए
  // `reject(Error)` फ़ंक्शन को तब निष्पादित करना होगा अगर प्रमिस अस्वीकृत हो जाए
})
```

### प्रमिसेज़ API

प्रमिसेज़ API वास्तव में कुछ ही विधियाँ हैं।

2 इंस्टैंस फ़ंक्शन, और 4 स्थैतिक/उपयोगिता फ़ंक्शन।

#### प्रमिस इंस्टैंस विधियाँ

प्रमिस से मान प्राप्त करना सामान्य तरीकों से काम नहीं करेगा (जैसे `console.log(promise)`।

सभी प्रमिसेज़ या तो सफलता (`.then(fn)` के माध्यम से) या विफलता (`.catch(fn)` के माध्यम से) लौटाते हैं।

#### प्रमिस उपयोगिता विधियाँ

* `Promise.resolve(value)` - कोई भी मान प्रमिस में परिवर्तित करें  
* `Promise.reject(Error)` - विफलता प्रमिस मान बनाता है, अगले `.catch()` को ट्रिगर करता है  
* `Promise.all([...promises])` - प्रमिसेज़ के सभी अरे को पूरा होने के लिए इंतजार करें  
* `Promise.race([...promises])` - जैसे ही पहला प्रमिस सुलझ जाए तत्काल निर्णय लेता है
````
