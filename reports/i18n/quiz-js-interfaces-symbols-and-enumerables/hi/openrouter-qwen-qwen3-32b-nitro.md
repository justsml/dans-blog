# Translation Candidate
- Slug: quiz-js-interfaces-symbols-and-enumerables
- Locale: hi
- Model: openrouter/qwen/qwen3-32b:nitro
- Target: src/content/posts/2024-10-31--quiz-js-interfaces-symbols-and-enumerables/hi/index.mdx
- Validation: rejected: direct AI SDK translation failed
- Runtime seconds: 55.83
- Input tokens: 6007
- Output tokens: 9066
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- Estimated cost: $0.002656
- Pricing source: local-openrouter-estimate
- Note: Command failed: git add src/content/posts/2024-10-31--quiz-js-interfaces-symbols-and-enumerables/hi/index.mdx reports/i18n/quiz-js-interfaces-symbols-and-enumerables/hi
## Raw Output

````mdx
---
unlisted: false
title: 'क्विज़: प्रतीक और गणनीय'
subTitle: ''
label: Symbols
social_image: ../desktop-social.webp
category: Quiz
subCategory: JavaScript
date: '2024-10-31'
modified: '2024-11-07'
tags:
  - quiz
  - javascript
  - interfaces
  - symbols
  - enumerables
cover_full_width: ../logan-weaver-lgnwvr-96ES9AOLRzQ-unsplash.webp
cover_mobile: ../logan-weaver-lgnwvr-96ES9AOLRzQ-unsplash_w300.webp
cover_icon: ../logan-weaver-lgnwvr-96ES9AOLRzQ-unsplash_w300.webp
---
---
## क्विज़: JavaScript इंटरफेस, सिम्बल्स, और एन्यूमरेबल्स

> * **अपने JavaScript कौशल को साबित करें!** 🚀  
> * कोई लॉगिन या साइनअप की आवश्यकता नहीं है। ✨  
> * बहुविकल्पीय। 🤖 ... _कितना मुश्किल हो सकता है, ना?_  

import Challenge from '../../../../../components/QuizUI/Challenge';  
import QuizUI from '../../../../../components/QuizUI/QuizUI';  
---

<QuizUI>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={0}
  group="उन्नत इंटरफेस"
  title="गेटर बनाम सीधे संपत्ति एक्सेस"
  options={[
    {text: 'एक लूप का उपयोग करें'},
    {text: 'मान तक पहुँचने के लिए एक मेथड़ कॉल करें'},
    {text: 'मान को सीधे एक्सेस करें', isAnswer: true},
    {text: 'एक त्रुटि फेंक दें'},
  ]}
>
  <slot name="question">
  <div className="question">
    जावास्क्रिप्ट ऑब्जेक्ट संपत्ति जो एक गेटर मेथड़ का उपयोग करती है, उसे आप कैसे एक्सेस करना चाहिए?
    ```js
        const obj = {
          get val() {
            return 'got it!';
          }
        };
        console.log(obj.val);
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    जावास्क्रिप्ट में, एक गेटर को सामान्य संपत्ति की तरह एक्सेस किया जा सकता है। इसे फंक्शन की तरह कॉल करने की आवश्यकता नहीं है।
    इस उदाहरण में, `obj.val` को सीधे एक्सेस करना गेटर मेथड़ को बुलाता है और `got it!` आउटपुट करता है।
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={1}
  group="उन्नत इंटरफेस"
  title="ऑब्जेक्ट की में सिम्बल का उपयोग"
  options={[
    {text: 'एक सिम्बल का उपयोग करना', isAnswer: true},
    {text: 'एक स्ट्रिंग का उपयोग करना'},
    {text: 'एक संख्या का उपयोग करना'},
    {text: 'एक ऑब्जेक्ट को की के रूप में उपयोग करना'},
  ]}
>
  <slot name="question">
  <div className="question">
    जावास्क्रिप्ट ऑब्जेक्ट के लिए एक वास्तविक रूप से अद्वितीय प्रॉपर्टी की बनाने का सही तरीका क्या है?
    ```js
        const uniqueKey = Symbol('myUniqueKey');
        const obj = {
          [uniqueKey]: 'unique value'
        };
        console.log(obj[uniqueKey]);
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    सिम्बल एक अद्वितीय और अपरिवर्तनीय मूल प्रकार है जिसे ऑब्जेक्ट प्रॉपर्टी के रूप में उपयोग किया जा सकता है। यह बड़े कोडबेस या पुनः प्रयोज्य पुस्तकालयों के लिए नाम संघर्ष से बचने में मदद करता है।
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={2}
  group="उन्नत इंटरफेस"
  title="गणनीय गुणधर्म"
  options={[
    {text: 'त्रुटि फेंकता है'},
    {text: 'नहीं, यह सूचीबद्ध नहीं होगा'},
    {text: 'मान प्रकार पर निर्भर करता है'},
    {text: 'हां, यह सूचीबद्ध होगा', isAnswer: true},
  ]}
>
  <slot name="question">
  <div className="question">
    क्या `age` गुणधर्म `for...in` लूप में सूचीबद्ध होगा?
    ```js
        const person = {};
        Object.defineProperty(person, 'age', {
          value: 25,
          enumerable: true
        });
        for (let key in person) {
          console.log(key);
        }
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    वस्तु के `Object.defineProperty()` में `enumerable` गुणधर्म नियंत्रित करता है कि गुणधर्म `for...in` जैसी गणना विधियों में दिखाई देगा या नहीं। इस उदाहरण में, चूंकि `enumerable: true` है, `age` गुणधर्म लूप में सूचीबद्ध होगा।
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={3}
  group="ऑब्जेक्ट्स के साथ काम करना"
  title="ऑब्जेक्ट.डिफ़ॉल्टप्रॉपर्टी() में डिफ़ॉल्ट एन्यूमरेबिलिटी"
  options={[
    {text: 'सच', hint: 'गलत! डिफ़ॉल्ट वैल्यू असच होती है।'},
    {text: 'असच', isAnswer: true, hint: 'सही! जब आप एन्यूमरेबल निर्दिष्ट नहीं करते हैं तो डिफ़ॉल्ट असच होता है।'},
    {text: 'अपरिभाषित', hint: 'गलत! डिफ़ॉल्ट वैल्यू असच होती है, अपरिभाषित नहीं।'},
    {text: 'संदर्भ पर निर्भर करता है', hint: 'गलत! यह हमेशा असच होता है।'},
  ]}
>
  <slot name="question">
  <div className="question">
    जब आप `Object.defineProperty()` का उपयोग करते हैं और `enumerable` निर्दिष्ट नहीं करते हैं, तो एक गुण की डिफ़ॉल्ट एन्यूमरेबिलिटी क्या होती है?
    ```js
        const car = {};
        Object.defineProperty(car, 'make', {
          value: 'Toyota'
        });
        console.log(Object.keys(car));
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    जब आप `Object.defineProperty()` का उपयोग करते हैं और `enumerable` निर्दिष्ट नहीं करते हैं, तो इसका डिफ़ॉल्ट मूल्य `false` होता है। इसका मतलब है कि `make` गुण `Object.keys()` या अन्य एन्यूमरेशन विधियों में दिखाई नहीं देगा।
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={4}
  group="उन्नत इंटरफेस"
  title="अद्वितीय सिम्बल्स"
  options={[
    {text: 'इनके विवरण पर निर्भर करता है'},
    {text: 'सच'},
    {text: 'गलत', isAnswer: true},
    {text: 'एक त्रुटि फेंकता है'},
  ]}
>
  <slot name="question">
  <div className="question">
    निम्नलिखित तुलना का परिणाम क्या होगा?
    ```js
        const sym1 = Symbol('id');
        const sym2 = Symbol('id');
        console.log(sym1 === sym2);
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    प्रत्येक `Symbol()` कॉल एक अद्वितीय और अपरिवर्तनीय मान बनाती है, यहां तक कि वर्णन समान होने पर भी। इस मामले में, `sym1` और `sym2` अलग-अलग सिम्बल हैं, इसलिए तुलना `गलत` लौटाती है।
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={5}
  group="उन्नत इंटरफ़ेस"
  title="गैर-गणनीय कुंजियों के रूप में संकेतक"
  options={[
    {text: 'नहीं, यह सूचीबद्ध नहीं होगा', isAnswer: true, hint: 'संकेतक-कुंजी वाले संपत्ति गणनीय नहीं होते हैं'},
    {text: 'हां, यह सूचीबद्ध होगा', hint: '`for...in` संकेतक-कुंजी वाले संपत्ति को नजरअंदाज करता है'},
    {text: 'निर्भर करता है कि अनुक्रमण विधि क्या है', hint: 'कुछ विधियां संकेतक-कुंजी को समावेशित कर सकती हैं'},
    {text: 'त्रुटि फेंक देता है', hint: 'संकेतक-कुंजी के साथ त्रुटि नहीं होती'},
  ]}
>
  <slot name="question">
  <div className="question">
    क्या संकेतक-कुंजी वाली संपत्ति `for...in` अनुक्रमण के दौरान सूचीबद्ध होगी?
    ```js
        const sym = Symbol('uniqueKey');
        const obj = {
          [sym]: 'symbol value',
          regularKey: 'regular value'
        };
        for (let key in obj) {
          console.log(key);
        }
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    संकेतक-कुंजी वाली संपत्तियाँ अपने स्वयं के `गणनीय` झंडे रख सकती हैं, लेकिन `for...in` और `Object.keys()` केवल तार-कुंजी वाली गणनीय संपत्तियों का दौरा करते हैं। इस उदाहरण में, केवल `regularKey` सूचीबद्ध होगा, संकेतक-कुंजी वाली संपत्ति नहीं।
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={6}
  group="उन्नत इंटरफ़ेस"
  title="सभी सिम्बल कुंजियाँ प्राप्त करें"
  options={[
    {text: 'Object.keys()'},
    {text: 'Symbol.keys()'},
    {text: 'Object.symbols()'},
    {text: 'Object.getOwnPropertySymbols()', isAnswer: true},
    {text: 'Object.entries()'},
  ]}
>
  <slot name="question">
  <div className="question">
    किस विधि का उपयोग ऑब्जेक्ट की सभी सिम्बल कुंजियाँ प्राप्त करने के लिए किया जा सकता है?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    `Object.getOwnPropertySymbols()` विधि का उपयोग ऑब्जेक्ट की स्वयं की सिम्बल संपत्ति कुंजियाँ प्राप्त करने के लिए किया जाता है।
    ```js
        const sym1 = Symbol('id');
        const sym2 = Symbol('name');
        const obj = {
          [sym1]: 'symbol value',
          [sym2]: 'another symbol value'
        };
        console.log(Object.getOwnPropertySymbols(obj));
        // [Symbol(id), Symbol(name)]
    ```
  </div>
  </slot>
</Challenge>

</QuizUI>
````
