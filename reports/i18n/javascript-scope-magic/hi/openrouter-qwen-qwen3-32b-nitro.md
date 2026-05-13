# Translation Candidate
- Slug: javascript-scope-magic
- Locale: hi
- Model: openrouter/qwen/qwen3-32b:nitro
- Target: src/content/posts/2015-06-06--javascript-scope-magic/hi/index.mdx
- Validation: passed
- Runtime seconds: 6.40
- Input tokens: 2331
- Output tokens: 3010
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- Estimated cost: $0.000909
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
title: जावास्क्रिप्ट जादू
subTitle: ''
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
## आज्ञातमक vs. पुनरावर्ती vs. कार्यात्मक

> [ कार्यरत विकास ]

```javascript
// आज्ञातमक: सबसे तेज़ ( + बहुत सरल, कोई नए पॉइंटर या अतिरिक्त आवंटन नहीं ):
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

// पुनरावर्ती: (केवल FIREFOX या BABELJS में) ES6 फ़ंक्शन परिभाषा जिसमें
//  पैरामीटर डिफ़ॉल्ट का उपयोग आंतरिक (पुनरावर्ती) मानों को सेट करने के लिए किया गया है
function fib(n, current = 0, a = 1, b = 1, c = 0) {
  current++;
  c = a + b;
  a = b;
  b = c;
  return current >= n ? b : fib(n, current, a, b, c);
}

// पाठ्यक्रम-बुरा उदाहरण - खराब फ़ंक्शन स्कोप और कई परिवर्तनीय बाहरी मानों के साथ
function fib(n) {
  if (!arr) {
    var arr = [1, 1];
    n = n - 2;
  } // खराब
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
    // खराब: आंतरिक पुनरावर्ती फ़ंक्शन की आवश्यकता नहीं है, संकेत: उपयोग किए गए चर अपने अभिभावक फ़ंक्शन स्कोप से हैं
  };
  var ans = proc();
  return ans[ans.length - 1];
}
```

## प्रमिसें: शानदार!

```js
// उदाहरण Bluebird प्रमिसें का उपयोग करके और इसका
var Promise = require("bluebird"),
  fs = Promise.promisifyAll(require("fs")),
  less = Promise.promisifyAll(require("less"));

function writeFileData(data) {
  return fs.writeFileAsync("/tmp/output.css", data);
}
// Bluebird ऐसा कुछ शायद असहज रूप से सरल और संक्षिप्त बनाता है:
fs.readFileAsync("./style.less") // promisified readFile() को कॉल करें
  .then(less.renderAsync) // less.render को हैंड ऑफ़ करें
  .then(writeFileData); // CSS सामग्रि प्राप्त करने वाला फ़ंक्शन (पहला पैरामीटर)
```

1.  जबकि, प्राकृतिक ES6 प्रमिसें शानदार हैं, मैं [Bluebird Promise Library](https://github.com/petkaantonov/bluebird/blob/master/API.md) का उपयोग करना पसंद करता हूँ।
1.  लाइब्रेरी के साथ या बिना, आधुनिक ब्राउज़रों में प्रमिसें वर्षों से समर्थित हैं।
1.  प्रमिसें बिना बेतुके पैटर्न के उपयोग किए जा सकती हैं - अनिवार्य `deferred` अधिक उपयुक्त है।
1.  **$q बिल्कुल खराब है**, बस bluebird का उपयोग करें, ऊपर देखें।
1.  ध्यान देने योग्य: Bluebirds के बेंचमार्क उत्कृष्ट मामले के परीक्षण हैं, इसलिए अगर आप बेतुके प्रमिस चेन कर रहे हैं तो ध्यान दें

## जावा vs जावास्क्रिप्ट

### रेट लिमिटिंग / डीबाउंसिंग / थ्रॉटलिंग

1.  जावास्क्रिप्ट में [डेविड वॉल्श ने डीबाउंस को](http://davidwalsh.name/essential-javascript-functions) 20 लाइनों से कम में लागू किया है!
1.  जावा में, JDebounce, एक लाइब्रेरी जो बहुत अधिक जटिल है, लगभग 500+ लाइनों में है।
1.  _ दोनों की तुलना: _
1.  जावास्क्रिप्ट तेज़ है और प्रथम श्रेणी के फ़ंक्शन का उपयोग करके उत्कृष्ट सरलता प्राप्त करता है।
1.  जबकि जावा में कई अधिक चल भाग हैं, एनोटेशन का उपयोग कम्पाइल-टाइम पर व्यवहार लागू करने के लिए किया जाता है, और बिना किसी विशेष कारण के बस मज़ा के लिए एक बड़ी मात्रा में XML है!

<!--
## नियंत्रण की उलटी तकनीकें

कार्यरत अवस्था में
-->

[fuck_this]: https://res.cloudinary.com/ddd/image/upload/panda-rampage__tumblr_nq7srwTXqr1stn6klo1_500_gm2som.gif
````
