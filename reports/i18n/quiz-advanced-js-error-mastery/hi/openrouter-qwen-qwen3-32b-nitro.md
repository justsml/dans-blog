# Translation Candidate
- Slug: quiz-advanced-js-error-mastery
- Locale: hi
- Model: openrouter/qwen/qwen3-32b:nitro
- Target: src/content/posts/2025-11-04--quiz-advanced-js-error-mastery/hi/index.mdx
- Validation: rejected: direct AI SDK translation failed
- Runtime seconds: 134.92
- Input tokens: 12037
- Output tokens: 14516
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- Estimated cost: $0.004447
- Pricing source: local-openrouter-estimate
- Note: Command failed: git add src/content/posts/2025-11-04--quiz-advanced-js-error-mastery/hi/index.mdx reports/i18n/quiz-advanced-js-error-mastery/hi
## Raw Output

````mdx
---
title: ''
subTitle: ''
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
```
import Challenge from '../../../../../components/QuizUI/Challenge';
import QuizUI from '../../../../../components/QuizUI/QuizUI';


### क्या आपको जावास्क्रिप्ट त्रुटियां पूरी तरह से परिचित हैं?

* **अपनी त्रुटि नियंत्रण क्षमता का परीक्षण करें!** 💥
* कोई लॉगिन या साइनअप आवश्यक नहीं है। ✨
* बहुविकल्पीय विकल्प। 🤖 ... _ये आपके सामान्य try-catch प्रश्न नहीं हैं!_
```

<QuizUI>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={0}
  group="सीरियलाइज़ेशन अजीबो-गरीब"
  title="खाली ऑब्जेक्ट की रहस्यमयी समस्या"
  options={[
    {text: '{"message":"Oops","name":"Error"}'},
    {text: '{}', isAnswer: true},
    {text: '{"error":"Oops"}'},
    {text: 'null'},
  ]}
>
  <slot name="question">
  <div className="question">
    क्या `JSON.stringify(error)` लौटाता है?
    ```js
        const error = new Error('Oops');
        console.log(JSON.stringify(error));
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Error ऑब्जेक्ट में गैर-गणनीय गुण (`message`, `name`, `stack`) होते हैं, इसलिए `JSON.stringify()` खाली `{}` लौटाता है। यह API रिस्पॉन्स में त्रुटियाँ भेजते समय एक आम फंसता है। `JSON.stringify(error, Object.getOwnPropertyNames(error))` या एक साधारण ऑब्जेक्ट बनाएँ।
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={1}
  group="सीरियलाइजेशन अवांछित परिणाम"
  title="कंसोल बनाम JSON"
  options={[
    {text: 'दोनों समान आउटपुट दिखाते हैं'},
    {text: '`console.log` अधिक जानकारी दिखाता है', isAnswer: true},
    {text: '`JSON.stringify` अधिक जानकारी दिखाता है'},
    {text: 'दोनों खाली ऑब्जेक्ट दिखाते हैं'},
  ]}
>
  <slot name="question">
  <div className="question">
    इन दोनों के बीच क्या अंतर है?
    ```js
        const err = new Error('Test');
        console.log(err);
        console.log(JSON.stringify(err));
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    `console.log(err)` एरर के साथ उसका संदेश और स्टैक ट्रेस दिखाता है क्योंकि कंसोल के पास एरर ऑब्जेक्ट्स के लिए विशेष हैंडलिंग होती है। `JSON.stringify(err)` `'{}'` लौटाता है क्योंकि एरर के प्रॉपर्टीज़ एन्यूमरेबल नहीं होते हैं। यह अंतर अक्सर API डीबग करने वाले डेवलपर्स को परेशान करता है।
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={2}
  group="प्रकार जाँच ट्रिक्स"
  title="instanceof अनुवंशिकता"
  options={[
    {text: 'सच, सच, सच', isAnswer: true},
    {text: 'सच, असत्य, असत्य'},
    {text: 'असत्य, सच, सच'},
    {text: 'सच, सच, असत्य'},
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
    तीनों में से सभी `सच` लौटाते हैं। `CustomError` `Error` को विस्तारित करता है, जो `Object` को विस्तारित करता है। `instanceof` ऑपरेटर पूरे प्रोटोटाइप श्रृंखला की जाँच करता है, इसलिए `CustomError` एक उदाहरण `Error` और `Object` भी होता है।
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={3}
  group="प्रकार जाँच ट्रिक्स"
  title="अलग-अलग फ्रेम में instanceof"
  options={[
    {text: 'हमेशा सच'},
    {text: 'हमेशा झूठा'},
    {text: 'फ्रेम में झूठा हो सकता है', isAnswer: true, hint: 'सही चुनाव: अलग-अलग फ्रेम में अलग-अलग संदर्भ होते हैं'},
    {text: 'एक त्रुटि उत्पन्न करता है'},
  ]}
>
  <slot name="question">
  <div className="question">
    आई-फ्रेम में `instanceof Error` के साथ क्या होता है?
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
    `instanceof` अलग-अलग कार्यकारी संदर्भों (आई-फ्रेम, वर्कर) में `false` लौटा सकता है क्योंकि प्रत्येक संदर्भ में अपना `Error` निर्माता होता है। `Object.prototype.toString.call(obj) === '[object Error]'` का उपयोग संदर्भों में त्रुटि की निर्भरपूर्वक जाँच के लिए करें।
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={4}
  group="गैर-त्रुटि फेंकना"
  title="स्ट्रिंग फेंकें"
  options={[
    {text: 'TypeError: स्ट्रिंग एक त्रुटि नहीं है'},
    {text: 'false, "string"', isAnswer: true},
    {text: 'स्वचालित रूप से एक त्रुटि वस्तु बनाता है'},
    {text: 'अपरिभाषित व्यवहार'},
  ]}
>
  <slot name="question">
  <div className="question">
    जब आप एक स्ट्रिंग फेंकते हैं तो क्या होता है?
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
    जावास्क्रिप्ट किसी भी मूल्य को फेंकने की अनुमति देता है। यहाँ `e instanceof Error` मान `false` होता है और `typeof e` का मान `"string"` होता है। यह त्रुटि हांक वाले कोड को तोड़ सकता है जो सभी पकड़े गए अपवाहनों के त्रुटि वस्तुएँ होने की धारणा रखते हैं। हमेशा बेहतर डीबगिंग के लिए त्रुटि वस्तुएँ फेंकें।
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={5}
  group="कस्टम त्रुटियाँ"
  title="त्रुटि नाम संपत्ति"
  options={[
    {text: '"त्रुटि"', hint: 'क्या आपने ध्यान दिया कि हमने एक कस्टम त्रुटि क्लास बनाई है?'},
    {text: '"कस्टमत्रुटि"', isAnswer: true, hint: 'हाँ! यह त्रुटि क्लास के नाम को लेता है।'},
    {text: 'अपरिभाषित'},
    {text: 'ब्राउज़र पर निर्भर करता है'},
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
    `err.name` का मान "कस्टमत्रुटि" है क्योंकि `this.constructor.name` क्लास नाम लौटाता है। `this.name = this.constructor.name` सेट करना एक आम पैटर्न है जो स्टैक ट्रेस और त्रुटि संदेशों में सही नाम दिखाने के लिए सुनिश्चित करता है।
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={6}
  group="कस्टम त्रुटियाँ"
  title="कंस्ट्रक्टर नाम की फंसावट"
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
    जब आप `this.name` को स्पष्ट रूप से सेट नहीं करते हैं, तो त्रुटि `Error` क्लास से डिफ़ॉल्ट `name` प्रॉपर्टी विरासत में प्राप्त करती है, जो `"Error"` होता है। यही कारण है कि कस्टम त्रुटि क्लासेस के कंस्ट्रक्टर में हमेशा `this.name = this.constructor.name` सेट करना चाहिए।
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
    {text: 'undefined', hint: 'ES2022 में नया नहीं है'},
    {text: 'लपेटकर रखी गई त्रुटि', hint: 'कारण के बजाय परिणाम देख रहे हैं?'},
    {text: 'SyntaxError', hint: 'कारण असाधारण नहीं है'},
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
    `Error.cause` (ES2022) त्रुटि श्रृंखलाओं को बनाए रखने की अनुमति देता है। `wrapper.cause` मूल त्रुटि को संदर्भित करता है, इसलिए `wrapper.cause.message` `"मूल त्रुटि"` लौटाता है। यह कम स्तरीय त्रुटियों को उच्च स्तरीय संदर्भ के साथ लपेटने में उपयोगी है।
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={8}
  group="स्टैक ट्रेस"
  title="स्टैक प्रबंधन"
  options={[
    {text: 'स्टैक से createError हटा देता है', isAnswer: true},
    {text: 'पूरा स्टैक साफ़ कर देता है'},
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
    `Error.captureStackTrace` (V8/Node.js) निर्धारित फ़ंक्शन (`createError`) को स्टैक ट्रेस से हटा देता है, जिससे त्रुटि फैक्टरी फ़ंक्शन अंतिम उपयोगकर्ता के लिए अदृश्य हो जाते हैं। यह उन स्थानों पर स्पष्ट स्टैक ट्रेस बनाता है जहाँ फैक्टरी को बुलाया गया था, न कि फैक्टरी खुद।
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={9}
  group="संदेश टेम्पलेट"
  title="त्रुटियों में टेम्पलेट लीटरल"
  options={[
    {text: 'मूल्य ${value} अमान्य है'},
    {text: 'मूल्य undefined अमान्य है', isAnswer: true},
    {text: 'ReferenceError: value परिभाषित नहीं है'},
    {text: 'मूल्य  अमान्य है'},
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
    टेम्पलेट लीटरल अंतर्स्थापन के दौरान `undefined` को स्ट्रिंग `"undefined"` में परिवर्तित कर देते हैं। त्रुटि संदेश `"मूल्य undefined अमान्य है"` बन जाता है। स्पष्ट संदेशों के लिए, अंतर्स्थापन से पहले `value ?? 'null'` या इस तरह की जाँच का उपयोग करें।
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={10}
  group="API चुनौतियाँ"
  title="एक्सप्रेस रिस्पॉन्स त्रुटि"
  options={[
    {text: 'पूर्ण त्रुटि वस्तु भेजता है'},
    {text: 'क्लाइंट को `{"error":{}}` भेजता है', isAnswer: true},
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
    `res.json()` आंतरिक रूप से `JSON.stringify()` का उपयोग करता है, इसलिए त्रुटि वस्तु `{}` बन जाती है। क्लाइंट को `{"error":{}}` प्राप्त होता है। इसे ठीक करने के लिए `res.json({ error: error.message })` या `res.json({ error: { message: error.message, name: error.name } })` का उपयोग करें।
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={11}
  group="एसिंक्रोनस त्रुटियाँ"
  title="प्रमिस अस्वीकृति मूल्य"
  options={[
    {text: 'हमेशा त्रुटि वस्तुएँ'},
    {text: 'कोई भी मूल्य अस्वीकृति हो सकता है', isAnswer: true},
    {text: 'केवल स्ट्रिंग और त्रुटि वस्तुएँ'},
    {text: 'स्वचालित रूप से त्रुटि में लपेटा गया'},
  ]}
>
  <slot name="question">
  <div className="question">
    क्या `Promise.reject()` स्वीकार कर सकता है?
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
    `throw` की तरह, `Promise.reject()` कोई भी मूल्य स्वीकार करता है - स्ट्रिंग, ऑब्जेक्ट, संख्या, आदि। यह `"string"`, `404`, और `42` प्रिंट करता है। हमेशा प्रमिस श्रृंखला में पकड़े गए मूल्यों के प्रकार की जाँच करें, खासकर तीसरे पक्ष के कोड के साथ जो गैर-त्रुटि मूल्यों के साथ अस्वीकृत कर सकता है।
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
    {text: 'सभी पर्यावरणों में नहीं हो सकते हैं', isAnswer: true},
    {text: 'केवल Node.js में'},
    {text: 'अप्रयुक्त और हटा दिए गए'},
  ]}
>
  <slot name="question">
  <div className="question">
    कितना विश्वसनीय हैं `error.code` और `error.errno`?
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
    जैसे `code` और `errno` गुण पर्यावरण-निर्भर होते हैं (इस मामले में Node.js) और मानक Error ऑब्जेक्ट का हिस्सा नहीं हैं। ब्राउज़र त्रुटियाँ इन गुणों के बिना होती हैं। हमेशा उनकी उपस्थिति जाँचें: `if (err.code === 'ENOENT')` के बजाय इनके उपलब्ध होने की धारणा छोड़ दें।
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={13}
  group="त्रुटि सीमा-प्रतिरोध"
  title="ऑब्जेक्ट बनाम त्रुि प्रकार की पहचान"
  options={[
    {text: 'true, true'},
    {text: 'false, false', isAnswer: true},
    {text: 'true, false'},
    {text: 'false, true'},
  ]}
>
  <slot name="question">
  <div className="question">
    इन जाँचों के परिणाम क्या होंगे?
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
    `instanceof Error` `false` लौटाता है क्योंकि ऑब्जेक्ट त्रुटि कंस्ट्रक्टर द्वारा बनाया नहीं गया था। `Object.prototype.toString.call()` भी `false` लौटाता है (यह `'[object Object]'` लौटाता है) क्योंकि यह आंतरिक `[[Class]]` स्लॉट जाँचता है। दोनों विधियाँ इसे सही ढंग से एक नकली त्रुटि ऑब्जेक्ट के रूप में पहचाती हैं।
  </div>
  </slot>
</Challenge>

</QuizUI>

## गलती प्रबंधन की कला को मास्टर करें

सीरियलाइजेशन के फंसावे ले कर क्रॉस-कंटेक्स्ट instanceof विफलताओं तक, ये उन्नत अवधारणाएं शुरुआती डेवलपर्स को ~अनुभवी~ क्षतिग्रस्त पेशेवरों से अलग करती हैं।

अधिक चुनौतियों के लिए तैयार हैं? हमारे [पूर्ण प्रश्नोत्तरी संग्रह](../challenges/) में जाएं जहां जावास्क्रिप्ट, एल्गोरिथम आदि पर अतिरिक्त मस्तिष्क खिलौने हैं!
````
