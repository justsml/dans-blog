# Translation Candidate
- Slug: javascript-promises-quiz
- Locale: hi
- Model: openrouter/qwen/qwen3-32b:nitro
- Target: src/content/posts/2019-11-26--javascript-promises-quiz/hi/index.mdx
- Validation: rejected: direct AI SDK translation failed
- Runtime seconds: 6.34
- Input tokens: unknown
- Output tokens: unknown
- Thinking tokens: unknown
- Cached input tokens: unknown
- Cache write tokens: unknown
- Estimated cost: unknown
- Pricing source: unknown
- Note: Command failed: bun run i18n:translate:chunked -- --slug javascript-promises-quiz --locale hi --model openrouter/qwen/qwen3-32b:nitro --chunk 6p --quiz-concurrency 20
## Raw Output

````mdx
---
social_image: ../desktop-social.webp
title: 'क्विज़: 9 जावास्क्रिप्ट प्रॉमिस प्रश्न'
subTitle: वादा फिर कभी न छोड़ें!
label: Promise Gotchas
date: '2019-11-26'
modified: '2024-11-28'
tags:
  - promises
  - programming
  - async
  - javascript
  - guides
  - quiz
  - intermediate
related:
  - intro-to-promises
  - promise-gotchas
  - visualizing-promises
  - stop-trying-to-make-async-await-happen
category: Quiz
unlisted: false
subCategory: JavaScript
cover: ../olav-ahrens-rotne-jvBXiynINGE-resized.webp
cover_mobile: ../w300_olav-ahrens-rotne-jvBXiynINGE-resized.webp
cover_icon: ../icon_olav-ahrens-rotne-jvBXiynINGE-resized.webp
---
import Challenge from '../../../../../components/QuizUI/Challenge';
import QuizUI from '../../../../../components/QuizUI/QuizUI';


## क्या आप JavaScript प्रॉमिसेज़ को जानते हैं?

> * **अपनी JavaScript कौशल साबित करें!** 🚀

1. **हिंट देखें** (बड़ा बटन, नीचे कोने में)।
2. कोड को अपने ब्राउज़र के कंसोल में चलाएँ (शॉर्टकट `F12` या खोजें) या [repl.it](https://repl.it)* का उपयोग करें।
3. बेझिझक [मुझे @justsml पर ट्वीट करें](https://x.com/intent/tweet?text=Hey%20Dan%2C%20I%20was%20taking%20your%20promises%20quiz%2E%2E%2E&url=https://danlevy.net/). **आपके विचार सुनकर खुशी होगी!**

### 👇 नीचे 9 प्रश्न पूर्ण करें 👇

<QuizUI>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={0}
  group="त्रुटियों को संभालना"
  title="एकाधिक `.catch`'s #1"
  options={[
    {text: 'संदेश एक बार प्रिंट करें'},
    {text: 'संदेश दो बार प्रिंट करें', isAnswer: true},
    {text: 'UnhandledPromiseRejectionWarning'},
    {text: 'प्रोसेस समाप्त होता है'},
  ]}
>
  <slot name="question">
  <div className="question">
    निम्नलिखित कोड का आउटपुट क्या होगा?
    ```js
        var p = new Promise((resolve, reject) => {
          reject(Error('The Fails!'))
        })
        p.catch(error => console.log(error.message))
        p.catch(error => console.log(error.message))
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    हम कंस्ट्रक्टर मेथड का उपयोग करके एक Promise बनाते हैं, और `reject` कॉलबैक से तुरंत एक त्रुटि उत्पन्न करते हैं।

    फिर `.catch` हैंडलर DOM के `.addEventListener(event, callback)` या Event Emitter के `.on(event, callback)` की तरह काम करते हैं जहाँ **एकाधिक हैंडलर कॉलबैक जोड़े जा सकते हैं।** प्रत्येक को समान आर्ग्युमेंट्स के साथ बुलाया जाएगा।
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={1}
  group="त्रुटियों को संभालना"
  title="एकाधिक `.catch`'s #2"
  options={[
    {text: 'संदेश एक बार प्रिंट करें'},
    {text: 'संदेश दो बार प्रिंट करें'},
    {text: 'अप्रबंधित अस्वीकृत प्रॉमिस', isAnswer: true},
    {text: 'प्रोसेस समाप्त होता है'},
  ]}
>
  <slot name="question">
  <div className="question">
    निम्नलिखित कोड का आउटपुट क्या होगा?
    ```js
        var p = new Promise((resolve, reject) => {
          return Promise.reject(Error('The Fails!'))
        })
        p.catch(error => console.log(error.message))
        p.catch(error => console.log(error.message))
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Promise कंस्ट्रक्टर का उपयोग करते समय आपको `resolve()` या `reject()` कॉलबैक में से किसी एक को कॉल करना आवश्यक है। Promise कंस्ट्रक्टर एक्जीक्यूटर के रिटर्न वैल्यू को अनदेखा करता है, इसलिए `Promise.reject()` से बनाया गया अतिरिक्त प्रॉमिस `p` से चेन नहीं होता। दो हैंडलर `p` से जुड़े होते हैं, जो पेंडिंग रहता है, जबकि लौटाया गया अस्वीकृत प्रॉमिस होस्ट वातावरण द्वारा अप्रबंधित के रूप में रिपोर्ट किया जाता है।
  </div>
  </slot>
</Challenge>

<Challenge
  client:only="react"
  index={2}
  group="त्रुटियों को संभालना"
  title="`.then` और `.catch` को चेन करना"
  options={[
    {text: 'त्रुटि और `undefined` प्रिंट करें', isAnswer: true},
    {text: 'त्रुटि दो बार प्रिंट करें'},
    {text: 'UnhandledPromiseRejectionWarning'},
    {text: 'undefined'},
  ]}
>
  <slot name="question">
  <div className="question">
    निम्नलिखित कोड का आउटपुट क्या होगा?
    ```js
        var p = new Promise((resolve, reject) => {
          reject(Error('The Fails!'))
        })
        .catch(error => console.log(error))
        .then(error => console.log(error))
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    जब आप `.then` और `.catch` को चेन करते हैं तो उन्हें चरणों की श्रृंखला की तरह सोचना उपयोगी होता है। प्रत्येक `.then` को पिछले `.then` द्वारा लौटाया गया मान (अपने तर्क के रूप में) मिलता है। लेकिन यदि आपका "step" कोई त्रुटि प्राप्त करता है, तो सभी आगे के `.then` "steps" को छोड़ दिया जाएगा जब तक कि कोई `.catch` न मिल जाए। यदि आप त्रुटि को ओवरराइड करना चाहते हैं, तो बस एक गैर‑त्रुटि मान लौटाएँ। वह किसी भी आगे के `.then` में पहुँचाया जा सकता है।
  </div>
  </slot>
</Challenge>

<Challenge
  client:only="react"
  index={3}
  group="त्रुटियों को संभालना"
  title="`.catch` को चेन करना"
  options={[
    {text: 'त्रुटि संदेश एक बार प्रिंट करें', isAnswer: true},
    {text: 'त्रुटि संदेश दो बार प्रिंट करें'},
    {text: 'UnhandledPromiseRejectionWarning'},
    {text: 'प्रोसेस समाप्त हो जाता है'},
  ]}
>
  <slot name="question">
  <div className="question">
    निम्नलिखित कोड का आउटपुट क्या होगा?
    ```js
        var p = new Promise((resolve, reject) => {
          reject(Error('The Fails!'))
        })
        .catch(error => console.log(error.message))
        .catch(error => console.log(error.message))
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    जब `.catch` को चेन किया जाता है, तो प्रत्येक केवल पिछले `.then` या `.catch` “स्टेप्स” में फेंकी गई त्रुटियों को संभालता है। इस उदाहरण में पहला `.catch` `console.log` लौटाता है जिसे केवल दोनों `.catch` के बाद एक `.then()` जोड़कर ही एक्सेस किया जा सकता है।
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={4}
  group="त्रुटियों को संभालना"
  title="एकाधिक `.catch`'s"
  options={[
    {text: 'संदेश एक बार प्रिंट करें'},
    {text: 'संदेश दो बार प्रिंट करें'},
    {text: 'UnhandledPromiseRejectionWarning'},
    {text: 'कुछ नहीं प्रिंट होता', isAnswer: true},
  ]}
>
  <slot name="question">
  <div className="question">
    निम्नलिखित कोड का आउटपुट क्या होगा?
    ```js
        new Promise((resolve, reject) => {
            resolve('Success!')
          })
          .then(() => {
            throw Error('Oh noes!')
          })
          .catch(error => {
            return "actually, that worked"
          })
          .catch(error => console.log(error.message))
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    **Hint:** `.catch`'s का उपयोग त्रुटियों को अनदेखा (या ओवरराइड) करने के लिए किया जा सकता है, बस एक सामान्य मान लौटाकर।

    यह ट्रिक तभी काम करती है जब बाद में एक `.then` हो जो उस मान को प्राप्त करे।
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={5}
  group="डेटा संभालना"
  title="`.then` के बीच प्रवाह"
  options={[
    {text: '"Success!" और "SUCCESS!" प्रिंट करें'},
    {text: '"Success!" प्रिंट करें'},
    {text: '"SUCCESS!" प्रिंट करें', isAnswer: true},
    {text: 'कुछ भी प्रिंट नहीं होता'},
  ]}
>
  <slot name="question">
  <div className="question">
    निम्नलिखित कोड का आउटपुट क्या होगा?
    ```js
        Promise.resolve('Success!')
          .then(data => {
            return data.toUpperCase()
          })
          .then(data => {
            console.log(data)
          })
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    **Hint:** `.then` डेटा को क्रमिक रूप से पास करता है, `return value` से अगले `.then(value => /* handle value */)` तक।

    एक `return` अगली `.then` को मान पास करने के लिए महत्वपूर्ण है।
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={6}
  group="डेटा संभालना"
  title="`.then` के बीच प्रवाह"
  options={[
    {text: 'प्रिंट "SUCCESS!"'},
    {text: 'प्रिंट "Success!"'},
    {text: 'प्रिंट "SUCCESS!" और "SUCCESS!"', isAnswer: true},
    {text: 'कुछ भी नहीं प्रिंट होता'},
  ]}
>
  <slot name="question">
  <div className="question">
    निम्नलिखित कोड का आउटपुट क्या होगा?
    ```js
        Promise.resolve('Success!')
          .then(data => {
            return data.toUpperCase()
          })
          .then(data => {
            console.log(data)
            return data
          })
          .then(console.log)
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    यहाँ 2 `console.log` कॉल हैं जो चलेंगे।
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={7}
  group="डेटा संभालना"
  title="`.then` के बीच प्रवाह"
  options={[
    {text: 'print "SUCCESS!"'},
    {text: 'print "Success!"'},
    {text: 'print "SUCCESS!" and "SUCCESS!"'},
    {text: 'prints `undefined`', isAnswer: true},
  ]}
>
  <slot name="question">
  <div className="question">
    निम्नलिखित कोड का आउटपुट क्या होगा?
    ```js
        Promise.resolve('Success!')
          .then(data => {
            data.toUpperCase()
          })
          .then(data => {
            console.log(data)
          })
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    **Hint:** `.then` डेटा को क्रमिक रूप से पास करते हैं, `return value` से अगले `.then(value => /* handle value */)` तक।

    अगले `.then` को मान पास करने के लिए `return` महत्वपूर्ण है।
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={8}
  group="डेटा संभालना"
  title="`.then` और `.catch` के बीच प्रवाह"
  options={[
    {text: 'प्रिंट "Oh noes!" और "The fails!"'},
    {text: 'प्रिंट "Oh noes!"'},
    {text: 'प्रिंट "The fails!"', isAnswer: true},
    {text: 'प्रिंट "actually, that worked"'},
    {text: 'कुछ भी नहीं प्रिंट होता'},
  ]}
>
  <slot name="question">
  <div className="question">
    निम्नलिखित कोड का आउटपुट क्या होगा?
    ```js
        Promise.resolve('Success!')
          .then(() => {
            throw Error('Oh noes!')
          })
          .catch(error => {
            return 'actually, that worked'
          })
          .then(data => {
            throw Error('The fails!')
          })
          .catch(error => console.log(error.message))
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    ![annotated-code/question-9-4.webp](annotated-code/question-9-4.webp)
  </div>
  </slot>
</Challenge>

</QuizUI>
````
