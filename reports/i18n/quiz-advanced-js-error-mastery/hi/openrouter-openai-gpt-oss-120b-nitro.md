# Translation Candidate
- Slug: quiz-advanced-js-error-mastery
- Locale: hi
- Model: openrouter/openai/gpt-oss-120b:nitro
- Target: src/content/posts/2025-11-04--quiz-advanced-js-error-mastery/hi/index.mdx
- Validation: deferred
- Runtime seconds: 13.31
- Input tokens: 13152
- Output tokens: 8520
- Thinking tokens: unknown
- Cached input tokens: 3584
- Cache write tokens: 0
- Estimated cost: $0.002047
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
title: 'प्रश्नोत्तरी: उन्नत JS त्रुटि महारत'
subTitle: क्या आपके अपवाद वास्तव में विशिष्ट हैं?
label: Errors
category: Quiz
subCategory: JavaScript
unlisted: false
date: '2025-11-03'
modified: '2025-11-04'
tags:
  - quiz
  - javascript
  - error-handling
  - debugging
  - advanced
cover_full_width: ../ahmed-slimene-c09hZthLq_s-unsplash-wide.webp
cover_mobile: ../ahmed-slimene-c09hZthLq_s-unsplash-square-300px.webp
cover_icon: ../ahmed-slimene-c09hZthLq_s-unsplash-square-300px.webp
cover_credit: >-
  Photo by <a
  href="https://unsplash.com/@assl?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Ahmed
  Slimene</a> on <a
  href="https://unsplash.com/photos/a-tall-white-building-with-balconies-on-top-of-it-c09hZthLq_s?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>
---
import Challenge from '../../../../../components/QuizUI/Challenge';
import QuizUI from '../../../../../components/QuizUI/QuizUI';


### क्या आप जावास्क्रिप्ट एरर्स को पूरी तरह समझते हैं?

* **अपनी एरर‑हैंडलिंग विशेषज्ञता को आज़माएँ!** 💥
* लॉगिन या साइन‑अप की कोई ज़रूरत नहीं। ✨
* मल्टीपल चॉइस. 🤖 ... _ये आपके सामान्य try‑catch सवाल नहीं हैं!_

<QuizUI>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={0}
  group="सीरियलाइज़ेशन आश्चर्य"
  title="खाली ऑब्जेक्ट रहस्य"
  options={[
    {text: '{"message":"Oops","name":"Error"}'},
    {text: '{}', isAnswer: true},
    {text: '{"error":"Oops"}'},
    {text: 'null'},
  ]}
>
  <slot name="question">
  <div className="question">
    `JSON.stringify(error)` क्या लौटाता है?
    ```js
        const error = new Error('Oops');
        console.log(JSON.stringify(error));
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Error ऑब्जेक्ट में गैर‑enumerable प्रॉपर्टी (`message`, `name`, `stack`) होती हैं, इसलिए `JSON.stringify()` `{}` लौटाता है। यह API प्रतिक्रियाओं में एरर भेजते समय अक्सर होने वाला गड़बड़ है। `JSON.stringify(error, Object.getOwnPropertyNames(error))` का उपयोग करें या सीधे एक साधारण ऑब्जेक्ट बनाएं।
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={1}
  group="सीरियलाइज़ेशन आश्चर्य"
  title="कंसोल बनाम JSON"
  options={[
    {text: 'दोनों एक ही आउटपुट दिखाते हैं'},
    {text: 'console.log अधिक जानकारी दिखाता है', isAnswer: true},
    {text: 'JSON.stringify अधिक जानकारी दिखाता है'},
    {text: 'दोनों खाली ऑब्जेक्ट दिखाते हैं'},
  ]}
>
  <slot name="question">
  <div className="question">
    इन दोनों में क्या अंतर है?
    ```js
        const err = new Error('Test');
        console.log(err);
        console.log(JSON.stringify(err));
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    `console.log(err)` त्रुटि को उसके संदेश और स्टैक ट्रेस के साथ दिखाता है क्योंकि कंसोल में Error ऑब्जेक्ट्स के लिए विशेष हैंडलिंग होती है। `JSON.stringify(err)` `'{}'` लौटाता है क्योंकि Error की प्रॉपर्टीज़ enumerable नहीं होतीं। यह अंतर कई डेवलपर्स को API डिबग करते समय फँसाता है।
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={2}
  group="टाइप जांच ट्रिक्स"
  title="instanceof विरासत"
  options={[
    {text: 'true, true, true', isAnswer: true},
    {text: 'true, false, false'},
    {text: 'false, true, true'},
    {text: 'true, true, false'},
  ]}
>
  <slot name="question">
  <div className="question">
    इन जाँचों के परिणाम क्या हैं?
    ```js
        class CustomError extends Error {}
        const err = new CustomError('test');
    
        console.log(err instanceof CustomError);
        console.log(err instanceof Error);
        console.log(err instanceof Object);
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    तीनों `true` लौटाते हैं। `CustomError` `Error` को विस्तारित करता है, जो `Object` को विस्तारित करता है। `instanceof` ऑपरेटर पूरी प्रोटोटाइप चेन को जांचता है, इसलिए `CustomError` का एक इंस्टेंस भी `Error` और `Object` का इंस्टेंस होता है।
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={3}
  group="टाइप चेकिंग ट्रिक्स"
  title="क्रॉस‑फ़्रेम instanceof"
  options={[
    {text: 'हमेशा सत्य'},
    {text: 'हमेशा असत्य'},
    {text: 'फ़्रेमों के बीच में असत्य हो सकता है', isAnswer: true},
    {text: 'एक त्रुटि फेंकता है'},
  ]}
>
  <slot name="question">
  <div className="question">
    यदिफ़्रेम्स के बीच `instanceof Error` के साथ क्या होता है?
    ```js
        // In iframe:
        const iframeError = new Error('test');
        // In parent window:
        console.log(iframeError instanceof Error);
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    `instanceof` विभिन्न निष्पादन संदर्भों (iframes, workers) के बीच `false` लौटा सकता है क्योंकि प्रत्येक संदर्भ का अपना `Error` कंस्ट्रक्टर होता है। संदर्भों के बीच विश्वसनीय त्रुटि पहचान के लिए `Object.prototype.toString.call(obj) === '[object Error]'` का उपयोग करें।
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={4}
  group="गैर‑त्रुटियों को थ्रो करना"
  title="स्ट्रिंग थ्रोज़"
  options={[
    {text: 'TypeError: स्ट्रिंग एक Error नहीं है'},
    {text: 'false, "string"', isAnswer: true},
    {text: 'स्वतः एक Error ऑब्जेक्ट बनाता है'},
    {text: 'अपरिभाषित व्यवहार'},
  ]}
>
  <slot name="question">
  <div className="question">
    जब आप स्ट्रिंग थ्रो करते हैं तो क्या होता है?
    ```js
        try {
          throw "Oops!";
        } catch (e) {
          console.log(e instanceof Error);
          console.log(typeof e);
        }
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    JavaScript किसी भी मान को थ्रो करने की अनुमति देता है। यहाँ, `e instanceof Error` `false` है और `typeof e` `"string"` है। यह उन त्रुटि‑हैंडलिंग कोड को तोड़ सकता है जो मानते हैं कि सभी पकड़ी गई अपवाद Error ऑब्जेक्ट हैं। बेहतर डिबगिंग के लिए हमेशा Error इंस्टेंस थ्रो करें।
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={5}
  group="कस्टम त्रुटियाँ"
  title="त्रुटि नाम गुण"
  options={[
    {text: '"Error"'},
    {text: '"CustomError"', isAnswer: true},
    {text: 'undefined'},
    {text: 'Depends on the browser'},
  ]}
>
  <slot name="question">
  <div className="question">
    `err.name` का मान क्या है?
    ```js
        class CustomError extends Error {
          constructor(message) {
            super(message);
            this.name = this.constructor.name;
          }
        }
        const err = new CustomError('test');
        console.log(err.name);
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    `err.name` `"CustomError"` है क्योंकि `this.constructor.name` क्लास का नाम लौटाता है। `this.name = this.constructor.name` सेट करना एक सामान्य पैटर्न है जिससे कस्टम एरर क्लासेस स्टैक ट्रेस और एरर मैसेज में सही नाम दिखाते हैं।
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={6}
  group="कस्टम एरर्स"
  title="कंस्ट्रक्टर नाम गोटचा"
  options={[
    {text: '"MyError"'},
    {text: '"Error"', isAnswer: true},
    {text: 'undefined'},
    {text: 'TypeError'},
  ]}
>
  <slot name="question">
  <div className="question">
    बिना `name` सेट किए आउटपुट क्या होगा?
    ```js
        class MyError extends Error {
          // No constructor or name setting
        }
        const err = new MyError('test');
        console.log(err.name);
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    यदि आप स्पष्ट रूप से `this.name` सेट नहीं करते हैं, तो त्रुटि `Error` क्लास की डिफ़ॉल्ट `name` प्रॉपर्टी को विरासत में ले लेती है, जो `"Error"` है। इसलिए कस्टम एरर क्लासों को हमेशा अपने कंस्ट्रक्टर में `this.name = this.constructor.name` सेट करना चाहिए।
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={7}
  group="Error कारण"
  title="आधुनिक Error.cause"
  options={[
    {text: '"मूल त्रुटि"', isAnswer: true},
    {text: 'undefined'},
    {text: 'रैपिंग त्रुटि'},
    {text: 'SyntaxError'},
  ]}
>
  <slot name="question">
  <div className="question">
    `wrapper.cause.message` क्या लौटाता है?
    ```js
        const original = new Error('Original error');
        const wrapper = new Error('Wrapper', 
          { cause: original }
        );
        console.log(wrapper.cause.message);
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    `Error.cause` (ES2022) त्रुटियों को चेन करने की अनुमति देता है ताकि मूल त्रुटि संदर्भ संरक्षित रहे। `wrapper.cause` मूल त्रुटि को संदर्भित करता है, इसलिए `wrapper.cause.message` `"Original error"` लौटाता है। यह निचले‑स्तर की त्रुटियों को उच्च‑स्तर के संदर्भ में रैप करने में उपयोगी है।
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={8}
  group="स्टैक ट्रेसेस"
  title="स्टैक हेरफेर"
  options={[
    {text: 'स्टैक से `createError` को हटाता है', isAnswer: true},
    {text: 'पूरे स्टैक को साफ़ कर देता है'},
    {text: 'कुछ नहीं करता'},
    {text: 'एक TypeError फेंकता है'},
  ]}
>
  <slot name="question">
  <div className="question">
    `Error.captureStackTrace` क्या करता है?
    ```js
        function createError(msg) {
          const err = new Error(msg);
          Error.captureStackTrace(err, createError);
          return err;
        }
        const error = createError('test');
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    `Error.captureStackTrace` (V8/Node.js) स्टैक ट्रेस से निर्दिष्ट फ़ंक्शन (`createError`) को हटा देता है, जिससे एरर फ़ैक्टरी फ़ंक्शन उपयोगकर्ताओं को दिखाई नहीं देते। इससे साफ़ स्टैक ट्रेस मिलते हैं जो फ़ैक्टरी को कॉल किए गए स्थान को दिखाते हैं, फ़ैक्टरी खुद को नहीं।
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={9}
  group="संदेश टेम्प्लेट"
  title="त्रुटियों में टेम्प्लेट लिटेरल्स"
  options={[
    {text: '"Value ${value} अमान्य है"'},
    {text: '"Value undefined अमान्य है"', isAnswer: true},
    {text: 'ReferenceError: value परिभाषित नहीं है'},
    {text: '"Value  अमान्य है"'},
  ]}
>
  <slot name="question">
  <div className="question">
    त्रुटि संदेश क्या है?
    ```js
        function validate(value) {
          if (!value) {
            throw new Error(
              `Value ${value} is invalid`
            );
          }
        }
        try {
          validate(undefined);
        } catch (e) {
          console.log(e.message);
        }
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    टेम्प्लेट लिटेरल्स इंटरपोलेशन के दौरान `undefined` को स्ट्रिंग `"undefined"` में बदल देते हैं। त्रुटि संदेश बन जाता है `"Value undefined is invalid"`। साफ़ संदेशों के लिए, इंटरपोलेशन से पहले `value ?? 'null'` या इसी तरह की जाँचों का उपयोग करने पर विचार करें।
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={10}
  group="API गड़बड़ियाँ"
  title="एक्सप्रेस प्रतिक्रियात्रुटि"
  options={[
    {text: 'पूरा त्रुटि ऑब्जेक्ट भेजता है'},
    {text: 'भेजता है {"error":{}}', isAnswer: true},
    {text: 'सर्वर त्रुटि फेंकता है'},
    {text: 'केवल त्रुटि संदेश भेजता है'},
  ]}
>
  <slot name="question">
  <div className="question">
    क्लाइंट को क्या भेजा जाता है?
    ```js
        // Express.js route
        app.get('/api/data', (req, res) => {
          const error = new Error('Database failed');
          res.json({ error });
        });
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    `res.json()` अंदर `JSON.stringify()` का उपयोग करता है, इसलिए Error ऑब्जेक्ट `{}` बन जाता है। क्लाइंट को `{"error":{}}` मिलता है। इसे ठीक करने के लिए, `res.json({ error: error.message })` या `res.json({ error: { message: error.message, name: error.name } })` का उपयोग करें।
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={11}
  group="असिंक्रोनस त्रुटियाँ"
  title="प्रॉमिस रिजेक्शन मान"
  options={[
    {text: 'हमेशा Error ऑब्जेक्ट्स'},
    {text: 'कोई भी मान रिजेक्शन हो सकता है', isAnswer: true},
    {text: 'केवल स्ट्रिंग्स और Error ऑब्जेक्ट्स'},
    {text: 'स्वतः Error में लपेटा जाता है'},
  ]}
>
  <slot name="question">
  <div className="question">
    `Promise.reject()` क्या स्वीकार कर सकता है?
    ```js
        Promise.reject('string').catch(e => 
          console.log(typeof e)
        );
        Promise.reject({code: 404}).catch(e => 
          console.log(e.code)
        );
        Promise.reject(42).catch(e => 
          console.log(e)
        );
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    `throw` की तरह, `Promise.reject()` कोई भी मान स्वीकार करता है – स्ट्रिंग्स, ऑब्जेक्ट्स, नंबर आदि। यह `"string"`, `404`, और `42` प्रिंट करता है। प्रॉमिस चेन में पकड़े गए मानों के प्रकार की हमेशा जाँच करें, खासकर जब थर्ड‑पार्टी कोड गैर‑Error मानों से रिजेक्ट कर सकता है।
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={12}
  group="त्रुटि गुण"
  title="गैर-मानक गुण"
  options={[
    {text: 'हमेशा उपलब्ध'},
    {text: 'सभी वातावरण में नहीं हो सकते', isAnswer: true},
    {text: 'केवल Node.js में'},
    {text: 'अप्रचलित और हटा दिया गया'},
  ]}
>
  <slot name="question">
  <div className="question">
    `error.code` और `error.errno` कितने भरोसेमंद हैं?
    ```js
        const fs = require('fs');
        fs.readFile('missing.txt', (err, data) => {
          if (err) {
            console.log(err.code);    // 'ENOENT'
            console.log(err.errno);   // -2
          }
        });
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    `code` और `errno` जैसे गुण पर्यावरण‑विशिष्ट हैं (इस मामले में Node.js) और मानक Error ऑब्जेक्ट का हिस्सा नहीं हैं। ब्राउज़र त्रुटियों में ये गुण नहीं होते। हमेशा इनके अस्तित्व की जाँच करें: `if (err.code === 'ENOENT')` बजाय यह मानने के कि वे मौजूद हैं।
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={13}
  group="एरर बाउंडरीज"
  title="ऑब्जेक्ट बनाम एरर डिटेक्शन"
  options={[
    {text: 'true, true'},
    {text: 'false, false', isAnswer: true},
    {text: 'true, false'},
    {text: 'false, true'},
  ]}
>
  <slot name="question">
  <div className="question">
    इन जाँचों का परिणाम क्या है?
    ```js
        const fakeError = {
          name: 'Error',
          message: 'Fake error',
          stack: 'fake stack'
        };
    
        console.log(fakeError instanceof Error);
        console.log(Object.prototype.toString.call(
          fakeError
        ) === '[object Error]');
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    `instanceof Error` `false` लौटाता है क्योंकि ऑब्जेक्ट Error कंस्ट्रक्टर से नहीं बनाया गया था। `Object.prototype.toString.call()` भी `false` लौटाता है (यह `'[object Object]'` लौटाता है) क्योंकि यह आंतरिक `[[Class]]` स्लॉट को जांचता है। दोनों मेथड सही तरीके से इसे एक नकली एरर ऑब्जेक्ट के रूप में पहचानते हैं।
  </div>
  </slot>
</Challenge>

</QuizUI>

## त्रुटि‑हैंडलिंग की कला में निपुण बनें

सीरियलाइज़ेशन के फंदों से लेकर क्रॉस‑कॉन्टेक्स्ट `instanceof` विफलताओं तक, ये उन्नत अवधारणाएँ जूनियर डेवलपर्स को ~सीज़नड~ क्षतिग्रस्त पेशेवरों से अलग करती हैं।

और अधिक चुनौतियों के लिए तैयार हैं? हमारे [पूरा क्विज़ संग्रह](/challenges/) में जाएँ और जावास्क्रिप्ट, एल्गोरिदम और अन्य विषयों पर अतिरिक्त दिमागी पहेलियों को देखें!
````
