# Translation Candidate
- Slug: are-promises-broken
- Locale: hi
- Model: openrouter/openai/gpt-oss-120b:nitro
- Target: src/content/posts/2018-10-06--are-promises-broken/hi/index.mdx
- Validation: passed
- Runtime seconds: 6.99
- Input tokens: 9366
- Output tokens: 2852
- Thinking tokens: unknown
- Cached input tokens: 3968
- Cache write tokens: 0
- Estimated cost: $0.000879
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
social_image: ../desktop-social.webp
title: टूटे वादे?
unlisted: true
subTitle: 'त्रुटियों को हटाते हुए, परिणाम खो रहे हैं...'
date: '2018-10-06'
modified: '2024-12-11'
tags:
  - promises
  - javascript
  - errors
  - programming
category: Code
subCategory: promises
cover: ../lennart-heim-766366-unsplash.webp
cover_mobile: ../w300_lennart-heim-766366-unsplash.webp
cover_icon: ../icon_lennart-heim-766366-unsplash.webp
---
## क्या जावास्क्रिप्ट प्रॉमिस टूटे हैं?

### पुराने ज़माने में

प्रॉमिसेज़ के बारे में सबसे आम मिथकों में से एक है उनकी **कथित** त्रुटि‑संबंधी कमियाँ।

**कई साल पहले** प्रॉमिसेज़ _त्रुटियों_ के साथ वास्तव में बेतुके थे। **इसे ठीक करने में बहुत काम किया गया**।

> और फिर, **यह ठीक हो गया**, यहाँ तक कि **व्यापक रूप से तैनात**।

#### लोग खुश हुए

और दुर्भाग्य से, कुछ ने इसे नोट नहीं किया।

### वर्तमान समय

यह मिथक अभी भी बना हुआ है, मैं इसे हर जगह देखता हूँ: [मीडियम पर लोकप्रिय लेख](https://hackernoon.com/6-reasons-why-javascripts-async-await-blows-promises-away-tutorial-c7ec10518dd9), [dzone पर](#redacted), और [कई](https://medium.com/@avaq/broken-promises-2ae92780f33) अन्य स्रोत।

मैं मानता हूँ, यहाँ‑तक कि “आधिकारिक” संसाधन और दस्तावेज़ भी अधिकांशतः [कमजोर उदाहरणों और बुरी आदतों](/promise-gotchas/) प्रदान करते हैं। इन्हें अक्सर प्रॉमिसेज़ के खिलाफ “साक्ष्य” साबित करने के लिए इस्तेमाल किया जाता है। कुछ यहाँ‑तक “उपचार” सुझाते हैं जो स्थिति को और बिगाड़ देते हैं। (नोट: लिंक हटाया गया)

<!-- One such tip I've seen multiple times: is to never use `.catch`, and instead use an `"unhandledRejection"` global event. **NEVER** do this. unhandledRejection is designed for cleanup of global references, like database connections, before an impending shutdown.) -->

<br />
<br />

## परेशानी से बचने के नियम

1. [Promises को कुछ न कुछ पकड़ना चाहिए](#1-promises-need-something-to-hang-on-to)
    * **हमेशा** अपने फ़ंक्शन से `return` करें।
1. [वास्तविक `Error` इंस्टेंस का उपयोग करें](#2-use-real-error-instances)
    * **हमेशा** `Error` इंस्टेंस का प्रयोग करें।
1. [त्रुटियों को जहाँ समझ में आए संभालें](#3-handle-errors-where-it-makes-sense)
    * **कम से कम एक बार** `.catch()` का उपयोग करें।
1. [नामित फ़ंक्शन से स्पष्टता जोड़ें 🦄✨](#4-add-clarity-with-named-functions-)
    * __प्राथमिकता__ नामित फ़ंक्शन दें।

-------------------------------------------

#### #1 Promises को कुछ न कुछ पकड़ना चाहिए

यह अत्यावश्यक है कि आप **हमेशा `return`** करें।  

Promise कॉलबैक फ़ंक्शन `.then(callback)` और `.catch(callback)` में एक निश्चित पैटर्न का पालन करते हैं।

प्रत्येक लौटाया गया मान अगले `.then()` के कॉलबैक को पास हो जाता है।

```js
function addTen(number) {
  return number + 10;
}

Promise.resolve(10)  // 10
  .then(addTen)      // 20
  .then(addTen)      // 30
  .then(addTen)      // 40
  .then(console.log) // logs "40"
```

> “हमेशा `return` करने” का बोनस: कोड को यूनिट‑टेस्ट करना बहुत आसान हो जाता है।

**प्रश्न:** कितनी अलग‑अलग Promise स्थितियाँ (resolved & rejected) बनाई गईं?

**प्रश्न:** पिछले उदाहरण में कितनी प्रॉमिसें बनाई गईं?

#### #2 वास्तविक `Error` इंस्टेंस का उपयोग करें

जावास्क्रिप्ट में त्रुटियों के संबंध में एक दिलचस्प व्यवहार है (जो असिंक्रोनस **और** सिंक्रोनस कोड दोनों पर लागू होता है)।

<a href="https://repl.it/@justsml/throwing-errors-in-javascript" target="_blank">[<i>repl.it में उदाहरण देखें: `throwing errors in javascript`</i>]</a>
<img alt="throwing errors in javascript" src="../throwing-errors-in-javascript.webp" />

**लाइन नंबर और कॉल‑स्टैक के उपयोगी विवरण प्राप्त करने के लिए** आपको `Error` इंस्टेंस का उपयोग करना होगा। स्ट्रिंग्स को थ्रो करना Python या Ruby की तरह काम नहीं करता।

जावास्क्रिप्ट **ऐसा दिखता है** कि `throw "string"` को संभालता है, क्योंकि स्ट्रिंग आपके `catch` हैंडलर में पहुँचती है। लेकिन आपको केवल वही डेटा मिलेगा*—कोई पूर्व [स्टैक फ़्रेम](https://en.wikipedia.org/wiki/Call_stack#Stack_and_frame_pointers) शामिल नहीं होगा।

सही `new Error` उदाहरण:

```js
throw new Error('message')           // ✅
Promise.reject(new Error('message')) // ✅
throw Error('message')               // ✅
Promise.reject(Error('message'))     // ✅
```

निम्नलिखित आम एंटी‑पैटर्न हैं:

```js
throw 'error message'  // ❌
Promise.reject(-42)    // ❌
```

<iframe height="400px" width="100%" src="https://repl.it/@justsml/throwing-errors-in-javascript?lite=true" scrolling="no" frameborder="no" allowtransparency="true" allowfullscreen="true" sandbox="allow-forms allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-modals"></iframe>

#### #3 जहाँ समझ में आता है वहाँ त्रुटियों को संभालें

Promises त्रुटियों को संभालने का एक चिकना तरीका प्रदान करते हैं, `.catch()` का उपयोग करके। यह मूलतः एक विशेष प्रकार का `.then()` है — जहाँ पहले के `.then()` से उत्पन्न होने वाली सभी त्रुटियों को संभाला जाता है। एक उदाहरण देखें…

```js
Promise.resolve(42)
  .then(() => 'hello')
  .catch(() => console.log('will not get hit'))
  .then(() => throw new Error('totes fail'))
  .catch(() => console.log('WILL get hit'))
```

जबकि `.catch()` को DOM इवेंट हैंडलर (जैसे `click`, `keypress`) जैसा महसूस किया जा सकता है, इसका स्थान महत्वपूर्ण है, क्योंकि यह केवल **उसे ऊपर** फेंकी गई त्रुटियों को “पकड़” सकता है।

**त्रुटियों को ओवरराइड करना अपेक्षाकृत सरल** है — अपने `.catch()` कॉलबैक में गैर‑त्रुटि मान लौटाएँ, और Promise श्रृंखला फिर से क्रमबद्ध `.then()` कॉलबैक्स चलाना शुरू कर देती है (व्यावहारिक रूप से)।

निम्न उदाहरण की क्रमबद्धता को देखें:

```js
Promise.resolve(42)
  .then(() => 'hello')
  .then(() => throw new Error('totes fail'))
  .catch(() => {
    return 99
  })
  .then(num => num + 1)
  .then(console.log) // expected output: 100
```

**क्रम ही वह बात है जिसे समझना आवश्यक है।**

जबकि यह एक बेतुका उदाहरण है, इसका उद्देश्य **त्रुटियों और डेटा के प्रवाह को** Promise में दर्शाना है।

यहाँ क्रम का रूपरेखा है:

1. 42 प्रारंभिक मान है।  
2. अगली मेथड हमेशा `hello` लौटाती है।  
3. हम पिछले मान को अनदेखा करते हैं, और `'totes fail'` संदेश के साथ एक त्रुटि फेंकते हैं।  
4. `.catch()` त्रुटि को पकड़ता है, और इसके बजाय `99` लौटाता है, जिसे बाद के किसी भी `.then()` द्वारा संभाला जाएगा।  
5. `num` को बढ़ाते हैं, जिससे `100` प्राप्त होता है।  
6. मेथड `console.log` `100` प्राप्त करता है और उसे प्रिंट करता है! :tada:

**प्रश्न:** जब क्रम में 2 `.catch()` हों तो क्या होता है? क्या दूसरा कभी चल सकता है? क्या आप कोई उपयोग केस सोच सकते हैं?

**प्रश्न:** `.catch()` कैसे त्रुटियों को अनदेखा कर सकता है? आप `Promise.all` को जल्दी समाप्त होने से कैसे रोकेंगे?

#### #4 नामित फ़ंक्शन के साथ स्पष्टता जोड़ें 🦄✨

**पढ़ने में आसानी** की तुलना नीचे दो उदाहरणों में करें:

**अनाम:** ❌

```js
Promise.resolve(10)          // 10
  .then(x => x * 2)          // 20
  .then(x => x / 4)          // 5
  .then(x => x * x)          // 25
  .then(x => x.toFixed(2))   // "25.00"
  .then(x => console.log(x)) // expected output: "25.00"
```

**नामित:** ✅

```js
Promise.resolve(10) // 10
  .then(double)     // 20
  .then(quarter)    // 5
  .then(square)     // 25
  .then(format)     // "25.00"
  .then(log)        // expected output: "25.00"

const double = x => x * 2
const quarter = x => x / 4
const square = x => x * x
const format = x => x.toFixed(2)
const log = x => console.log(x)

```

**बोनस:** ✅

> एरे मेथड संगत!!!

आप अपने नामित फ़ंक्शन को `Array.prototype` के साथ पुनः उपयोग कर सकते हैं। इसमें `.map()`, `.filter()`, `.every()`, `.some()`, `.find()` शामिल हैं!

कलेक्शन पाइपलाइन #FTW:

```js
// IT'S LIKE THE SAME THING :mindblown:

[10, 20]           // [ 10, 20 ]
  .map(double)     // [ 20, 40 ]
  .map(quarter)    // [ 5, 10 ]
  .map(square)     // [ 25, 100 ]
  .map(format)     // [ "25.00", "100.00" ]
  .map(log)        // expected 2 lines of output: "25.00", "100.00"

```

और अगर आप इस रैखिक‑शैली कोडिंग से बचना चाहते हैं… आपके पास सरल फ़ंक्शन हैं!

आप इन्हें अपनी ज़रूरत के अनुसार उपयोग कर सकते हैं:

```js
// Nesting patern
// ❌ please don't do this, however

const result = format(square(quarter(double(10))))

log(result)
// expected output: "25.00"
```

**फ़ंक्शन नेस्टिंग क्यों एंटी‑पैटर्न है?**

1. कई लोगों के लिए पढ़ना कठिन
2. गिट डिफ़्स यह नहीं दिखाते कि किसने क्या बदला
3. नेस्टेड फ़ंक्शनों के बीच से डिबग या लॉग करना मुश्किल
````
