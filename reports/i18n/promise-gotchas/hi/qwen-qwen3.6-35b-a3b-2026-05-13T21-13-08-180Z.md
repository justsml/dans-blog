# Translation Candidate
- Slug: promise-gotchas
- Locale: hi
- Model: qwen/qwen3.6-35b-a3b
- Target: src/content/posts/2018-09-26--promise-gotchas/hi/index.mdx
- Validation: deferred
- Runtime seconds: 36.50
- Input tokens: 2114
- Output tokens: 7410
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- Estimated cost: $0.007727
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
social_image: ../desktop-social.webp
title: Promise की छिपी जटिलताएँ
subTitle: आम त्रुटियों से बचें
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
### Promises अन्य मानों की तरह व्यवहार नहीं करते

आप इनके मान को अधिकांश मानों की तरह प्रिंट नहीं कर सकते:

```js
// This doesn't make sense w/ promises:
console.log(Promise.resolve(42));

// We must use the `.then` interface:
Promise.resolve(42).then(value => console.log(value));
```

### गलती करने पर Promises आपको चेतावनी नहीं देते

वैसे, एक संभावित गलती।

विभिन्न कारणों से, TC39 ने यह तय किया है कि `.then` और `.catch` को `null` पास किया जा सकता है। उदाहरण के लिए, `.then(null, null)` वैध है और आवश्यक व्यवहार चेन में उस 'स्टेप' को छोड़ना है।

इसका दुष्परिणाम यह है कि चीजें बिगड़ना बहुत आसान हो जाता है।

##### उदाहरण से समझें

आइए एक छोटे चैलेंज को देखें: निम्नलिखित में से कौन-सा विकल्प `console.log` के माध्यम से 42 प्रिंट करेगा?

```js
// Option #1:
Promise.resolve(42).then(console.log());

// Option #2:
Promise.resolve(42).then(console.log);

// Option #3:
Promise.resolve(42).then(value => console.log(value));

// Option #4:
Promise.resolve(42)
  .then(console.log())
  .then(console.log);
```

##### उत्तर

उत्तर है #2, #3 और #4।

क्यों? आइए `.then()` को पारित किए गए आर्गुमेंट्स के **टाइप** पर गौर करें। यह समझना ज़रूरी है कि फंक्शन कॉल और फंक्शन रेफरेंस के बीच का अंतर ही यहाँ निर्णायक भूमिका निभाता है। जब आप `console.log()` लिखते हैं, तो यह तुरंत निष्पादित होकर `undefined` लौटाता है, जबकि `console.log` केवल एक रेफरेंस पास करता है:

```js
var arg1 = console.log();
var arg2 = console.log;
var arg3 = value => console.log(value);

typeof arg1 === "undefined";
typeof arg2 === "function";
typeof arg3 === "function";
```

क्या चौथा विकल्प वास्तव में कैसे काम करता है, यह अभी भी स्पष्ट नहीं है?

यह प्रभावी रूप से इस प्रकार निष्पादित होता है:

```js
// Option #4 - effectively
Promise.resolve(42)
  .then(undefined) // this has no affect on the value, it will be handed to following `.then(fn)`
  .then(console.log);
```
````
