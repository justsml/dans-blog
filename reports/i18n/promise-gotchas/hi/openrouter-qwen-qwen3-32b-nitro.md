# Translation Candidate
- Slug: promise-gotchas
- Locale: hi
- Model: openrouter/qwen/qwen3-32b:nitro
- Target: src/content/posts/2018-09-26--promise-gotchas/hi/index.mdx
- Validation: rejected: direct AI SDK translation failed
- Runtime seconds: 6.49
- Input tokens: 2896
- Output tokens: 2411
- Thinking tokens: unknown
- Cached input tokens: 512
- Cache write tokens: 0
- Estimated cost: $0.000810
- Pricing source: local-openrouter-estimate
- Note: Command failed: git add src/content/posts/2018-09-26--promise-gotchas/hi/index.mdx reports/i18n/promise-gotchas/hi
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
### प्रमिसें अन्य मानों के तरह काम नहीं करती हैं

आपके मान को अधिकांश मानों के तरह प्रिंट नहीं किया जा सकता:

```js
// यह प्रमिसें के साथ बेवकूफी भरी हुई है:
console.log(Promise.resolve(42));

// हमें `.then` इंटरफ़ेस का उपयोग करना होगा:
Promise.resolve(42).then(value => console.log(value));
```

### प्रमिसें आपके गलतियों को चेतावनी नहीं देती हैं

ठीक है, एक संभावित गलती।

विभिन्न कारणों से, TC39 द्वारा यह निर्णय लिया गया कि `.then` और `.catch` को `null` पास करने की अनुमति है। उदाहरण के लिए, `.then(null, null)` वैध है और आवश्यक व्यवहार इस श्रृंखला में उस 'चरण' को छोड़ देना है।

इसका दुर्भाग्यपूर्ण परिणाम यह है कि चीजों को गलत करना बहुत आसान है।

##### उदाहरण द्वारा

एक छोटी चुनौती देखें: निम्नलिखित में से कौन सा विकल्प(स) 42 को console.log करेगा?

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

उत्तर #2, #3 और #4 है।

क्यों? चलिए देखते हैं कि `.then()` में क्या पास किया गया था, इसके **प्रकार** का विश्लेषण करके:

```js
var arg1 = console.log();
var arg2 = console.log;
var arg3 = value => console.log(value);

typeof arg1 === "undefined";
typeof arg2 === "function";
typeof arg3 === "function";
```

अभी भी यह जानकर आश्चर्यचकित है कि चौथा विकल्प कैसे काम करता है?

यह असल में इस तरह से चल रहा है:

```js
// विकल्प #4 - असल में
Promise.resolve(42)
  .then(undefined) // यह मूल्य पर कोई प्रभाव नहीं पड़ता है, यह अगले `.then(fn)` में हाथ डाला जाएगा
  .then(console.log);
```
````
