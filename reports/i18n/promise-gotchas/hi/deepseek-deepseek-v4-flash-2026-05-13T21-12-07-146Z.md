# Translation Candidate
- Slug: promise-gotchas
- Locale: hi
- Model: deepseek/deepseek-v4-flash
- Target: src/content/posts/2018-09-26--promise-gotchas/hi/index.mdx
- Validation: deferred
- Runtime seconds: 8.87
- Input tokens: 2057
- Output tokens: 1506
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- Estimated cost: $0.000710
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
social_image: ../desktop-social.webp
title: Promise के फंदे
subTitle: सामान्य गलतियों से बचना
date: '2018-09-26'
modified: '2024-07-30'
category: Code
subCategory: promises
tags:
  - promises
  - async
  - debugging
  - errors
  - javascript
  - composition
related:
  - intro-to-promises
  - visualizing-promises
  - are-promises-broken
  - javascript-promises-quiz
cover: ../michal-parzuchowski-224092-unsplash.webp
cover_mobile: ../w300_michal-parzuchowski-224092-unsplash.webp
cover_icon: ../icon_michal-parzuchowski-224092-unsplash.webp
---
### प्रॉमिस अन्य मानों की तरह काम नहीं करते

आप उनका मान अधिकांश मानों की तरह प्रिंट नहीं कर सकते:

```js
// प्रॉमिस के साथ यह समझ में नहीं आता:
console.log(Promise.resolve(42));

// हमें `.then` इंटरफ़ेस का उपयोग करना होगा:
Promise.resolve(42).then(value => console.log(value));
```

### प्रॉमिस गलती करने पर चेतावनी नहीं देते

खैर, एक संभावित गलती।

कई कारणों से, TC39 ने तय किया कि `.then` और `.catch` को `null` पास किया जा सकता है। उदाहरण के लिए, `.then(null, null)` मान्य है और अपेक्षित व्यवहार श्रृंखला में उस 'चरण' को छोड़ देना है।

इसका दुर्भाग्यपूर्ण परिणाम यह है कि चीज़ों को गड़बड़ करना बहुत आसान है।

##### उदाहरण द्वारा

आइए एक छोटी चुनौती देखें: निम्नलिखित में से कौन सा विकल्प `console.log` को 42 प्रिंट करेगा?

```js
// विकल्प #1:
Promise.resolve(42).then(console.log());

// विकल्प #2:
Promise.resolve(42).then(console.log);

// विकल्प #3:
Promise.resolve(42).then(value => console.log(value));

// विकल्प #4:
Promise.resolve(42)
  .then(console.log())
  .then(console.log);
```

##### उत्तर

उत्तर #2, #3 और #4 हैं।

क्यों? आइए देखें कि `.then()` को किस **प्रकार** का मान दिया गया था:

```js
var arg1 = console.log();
var arg2 = console.log;
var arg3 = value => console.log(value);

typeof arg1 === "undefined";
typeof arg2 === "function";
typeof arg3 === "function";
```

अब भी सोच रहे हैं कि चौथा विकल्प कैसे काम करता है?

यह प्रभावी रूप से इस प्रकार चलता है:

```js
// Option #4 - effectively
Promise.resolve(42)
  .then(undefined) // इसका मान पर कोई प्रभाव नहीं पड़ता, यह अगले `.then(fn)` को सौंप दिया जाएगा
  .then(console.log);
```
````
