# Translation Candidate
- Slug: promise-gotchas
- Locale: hi
- Model: qwen/qwen3.5-9b
- Target: src/content/posts/2018-09-26--promise-gotchas/hi/index.mdx
- Validation: deferred
- Runtime seconds: 199.36
- Input tokens: 1849
- Output tokens: 14390
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- Estimated cost: $0.002232
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
social_image: ../desktop-social.webp
title: ''
subTitle: ''
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
### प्रॉमिस अन्य मान्यों की तरह काम नहीं करते

आप उनका मान्यता प्रिंट नहीं कर सकते, जैसे अधिकांश मान्यों की तरह:

```js
// This doesn't make sense w/ promises:
console.log(Promise.resolve(42));

// We must use the `.then` interface:
Promise.resolve(42).then(value => console.log(value));
```

### प्रॉमिस त्रुटि करने पर आपको चेतावनी नहीं देते

हाँ, एक संभावित त्रुटि।

विभिन्न कारणों से, TC39 ने निर्णय लिया कि `.then` और `.catch` में null पारित किया जा सकता है। उदाहरण के लिए, `.then(null, null)` वैध है और आवश्यक व्यवहार है कि उस 'चरण' को श्रृंखला में छोड़ दिया जाए।

इसका दुर्भाग्यपूर्ण परिणाम यह है कि यह सब कुछ बिगाड़ने में बहुत आसान है।

##### उदाहरण द्वारा

आइए एक छोटी चुनौती पर नजर डालें: निम्नलिखित विकल्पों में से कौन सा `console.log` 42 को प्रिंट करेगा?

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

उत्तर #2, #3 और #4 है।

क्यों? आइए `.then()` में पारित किए गए **टाइप्स** को देखें:

```js
var arg1 = console.log();
var arg2 = console.log;
var arg3 = value => console.log(value);

typeof arg1 === "undefined";
typeof arg2 === "function";
typeof arg3 === "function";
```

क्या अभी भी यह समझ नहीं आ रहा कि उस 4वें विकल्प कैसे काम करता है?

यह वास्तव में इस तरह कार्य कर रहा है:

```js
// Option #4 - effectively
Promise.resolve(42)
  .then(undefined) // this has no affect on the value, it will be handed to following `.then(fn)`
  .then(console.log);
```
````
