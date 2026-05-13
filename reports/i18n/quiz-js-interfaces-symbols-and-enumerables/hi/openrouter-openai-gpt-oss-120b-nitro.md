# Translation Candidate
- Slug: quiz-js-interfaces-symbols-and-enumerables
- Locale: hi
- Model: openrouter/openai/gpt-oss-120b:nitro
- Target: src/content/posts/2024-10-31--quiz-js-interfaces-symbols-and-enumerables/hi/index.mdx
- Validation: deferred
- Runtime seconds: 7.16
- Input tokens: 6953
- Output tokens: 4078
- Thinking tokens: unknown
- Cached input tokens: 2816
- Cache write tokens: 0
- Estimated cost: $0.001005
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
unlisted: false
title: 'प्रश्नोत्तरी: प्रतीक और एन्यूमेरेबल्स'
subTitle: क्या आप ES2015 के कम‑प्रसिद्ध पहलुओं से परिचित हैं?
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
## Quiz: JavaScript Interfaces, Symbols, and Enumerables

> * **अपनी JavaScript कौशल साबित करें!** 🚀  
> * लॉगिन या साइन‑अप की ज़रूरत नहीं। ✨  
> * बहुविकल्पीय प्रश्न। 🤖 … _कितना मुश्किल हो सकता है, है ना?_

import Challenge from '../../../../../components/QuizUI/Challenge';
import QuizUI from '../../../../../components/QuizUI/QuizUI';

<QuizUI>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={0}
  group="उन्नत इंटरफ़ेस"
  title="गेटर बनाम प्रत्यक्ष प्रॉपर्टी एक्सेस"
  options={[
    {text: 'लूप का उपयोग करें'},
    {text: 'मान तक पहुँचने के लिए मेथड को कॉल करें'},
    {text: 'मान को सीधे एक्सेस करें', isAnswer: true},
    {text: 'त्रुटि फेंके'},
  ]}
>
  <slot name="question">
  <div className="question">
    आपको एक जावास्क्रिप्ट ऑब्जेक्ट प्रॉपर्टी जिसे गेटर मेथड का उपयोग करता है, कैसे एक्सेस करना चाहिए?
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
    जावास्क्रिप्ट में, गेटर को सामान्य प्रॉपर्टी की तरह एक्सेस किया जा सकता है। इसे फ़ंक्शन की तरह कॉल करने की ज़रूरत नहीं है।
    इस उदाहरण में, `obj.val` को सीधे एक्सेस करने से गेटर मेथड कॉल हो जाता है और `got it!` आउटपुट मिलता है।
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={1}
  group="उन्नत इंटरफ़ेस"
  title="ऑब्जेक्ट कुंजियों में Symbol का उपयोग"
  options={[
    {text: 'Symbol का उपयोग', isAnswer: true},
    {text: 'स्ट्रिंग का उपयोग'},
    {text: 'नंबर का उपयोग'},
    {text: 'ऑब्जेक्ट को कुंजी के रूप में उपयोग'},
  ]}
>
  <slot name="question">
  <div className="question">
    जावास्क्रिप्ट ऑब्जेक्ट के लिए वास्तव में अद्वितीय प्रॉपर्टी कुंजी बनाने का सही तरीका क्या है?
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
    Symbols अद्वितीय और अपरिवर्तनीय प्रिमिटिव टाइप हैं जिन्हें ऑब्जेक्ट प्रॉपर्टियों की कुंजियों के रूप में उपयोग किया जा सकता है। यह नाम टकराव से बचने में मदद करता है, विशेष रूप से बड़े कोडबेस में या पुन: उपयोग योग्य लाइब्रेरी लिखते समय।
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={2}
  group="उन्नत इंटरफ़ेस"
  title="गणनीय गुण"
  options={[
    {text: 'एक त्रुटि फेंकेगा'},
    {text: 'नहीं, यह नहीं होगा'},
    {text: 'यह मान के प्रकार पर निर्भर करता है'},
    {text: 'हाँ, यह सूचीबद्ध होगा', isAnswer: true},
  ]}
>
  <slot name="question">
  <div className="question">
    क्या `age` प्रॉपर्टी `for...in` इटरेशन के दौरान सूचीबद्ध होगी?
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
    `Object.defineProperty()` में `enumerable` प्रॉपर्टी यह नियंत्रित करती है कि प्रॉपर्टी `for...in` जैसी एनेमरेशन मेथड्स में दिखाई देगी या नहीं। इस उदाहरण में, क्योंकि `enumerable: true` है, `age` प्रॉपर्टी इटरेशन के दौरान सूचीबद्ध होगी।
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={3}
  group="ऑब्जेक्ट्स के साथ काम करना"
  title="Object.defineProperty() के साथ डिफ़ॉल्ट एनेमरेबिलिटी"
  options={[
    {text: 'सही'},
    {text: 'गलत', isAnswer: true},
    {text: 'अपरिभाषित'},
    {text: 'संदर्भ पर निर्भर'},
  ]}
>
  <slot name="question">
  <div className="question">
    `Object.defineProperty()` का उपयोग करते समय यदि `enumerable` निर्दिष्ट नहीं किया गया हो तो किसी प्रॉपर्टी की डिफ़ॉल्ट एनेमरेबिलिटी क्या होती है?
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
    जब आप `Object.defineProperty()` का उपयोग `enumerable` निर्दिष्ट किए बिना करते हैं, तो इसका डिफ़ॉल्ट मान `false` होता है। इसका मतलब है कि `make` प्रॉपर्टी `Object.keys()` या अन्य एनेमरेशन मेथड्स में दिखाई नहीं देगी।
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={4}
  group="उन्नत इंटरफ़ेस"
  title="विशिष्ट प्रतीक"
  options={[
    {text: 'उनके विवरण पर निर्भर करता है'},
    {text: 'true'},
    {text: 'false', isAnswer: true},
    {text: 'एक त्रुटि फेंकता है'},
  ]}
>
  <slot name="question">
  <div className="question">
    निम्न तुलना का परिणाम क्या होगा?
    ```js
        const sym1 = Symbol('id');
        const sym2 = Symbol('id');
        console.log(sym1 === sym2);
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    `Symbol()` का प्रत्येक कॉल एक अद्वितीय और अपरिवर्तनीय मान बनाता है, भले ही विवरण समान हो। इस मामले में, `sym1` और `sym2` अलग-अलग प्रतीक हैं, इसलिए तुलना `false` लौटाती है।
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={5}
  group="उन्नत इंटरफ़ेस"
  title="सिम्बॉल को गैर‑enumerable कुंजियों के रूप में"
  options={[
    {text: 'नहीं, यह नहीं होगा', isAnswer: true},
    {text: 'हाँ, यह सूचीबद्ध होगा'},
    {text: 'इटरेशन विधि पर निर्भर करता है'},
    {text: 'त्रुटि फेंकेगा'},
  ]}
>
  <slot name="question">
  <div className="question">
    क्या Symbol‑की वाली प्रॉपर्टी `for...in` इटरेशन के दौरान सूचीबद्ध होगी?
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
    Symbol‑की वाली प्रॉपर्टी का अपना `enumerable` फ़्लैग हो सकता है, लेकिन `for...in` और `Object.keys()` केवल स्ट्रिंग‑की वाली enumerable प्रॉपर्टी को ही देखते हैं। इस उदाहरण में केवल `regularKey` सूचीबद्ध होगा, Symbol‑की वाली प्रॉपर्टी नहीं।
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={6}
  group="उन्नत इंटरफ़ेस"
  title="सभी Symbol कुंजियों को प्राप्त करें"
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
    कौन‑सी विधि का उपयोग करके किसी वस्तु की सभी Symbol कुंजियों को प्राप्त किया जा सकता है?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    `Object.getOwnPropertySymbols()` मेथड का उपयोग वस्तु की अपनी Symbol प्रॉपर्टी कुंजियों को प्राप्त करने के लिए किया जाता है।
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
