# Translation Candidate
- Slug: quiz-modern-css-2025
- Locale: hi
- Model: openrouter/qwen/qwen3-32b:nitro
- Target: src/content/posts/2024-11-07--quiz-modern-css-2025/hi/index.mdx
- Validation: rejected: direct AI SDK translation failed
- Runtime seconds: 5.01
- Input tokens: unknown
- Output tokens: unknown
- Thinking tokens: unknown
- Cached input tokens: unknown
- Cache write tokens: unknown
- Estimated cost: unknown
- Pricing source: unknown
- Note: Command failed: bun run i18n:translate:chunked -- --slug quiz-modern-css-2025 --locale hi --model openrouter/qwen/qwen3-32b:nitro --chunk 6p --quiz-concurrency 20
## Raw Output

````mdx
---
unlisted: false
title: 'प्रश्नोत्तरी: क्या आप आधुनिक CSS जानते हैं? (2025 के लिए)'
subTitle: क्या आप फ्रंट‑एंड के काबिल हैं?
label: Advanced CSS
social_image: ../desktop-social.webp
category: Quiz
subCategory: CSS
minReleaseDate: '2024-10-31'
date: '2024-10-31'
modified: '2024-11-09'
tags:
  - quiz
  - css
  - advanced
  - intermediate
cover_full_width: ../dan-levy-downtown-denver-at-night-wide.webp
cover_mobile: ../dan-levy-downtown-denver-at-night-square-200.webp
cover_icon: ../dan-levy-downtown-denver-at-night-square-200.webp
---
import Challenge from '../../../../../components/QuizUI/Challenge';

import Challengefrom '../../../../components/QuizUI/Challenge';
import QuizUI from '../../../../../components/QuizUI/QuizUI';


## क्विज़: क्या आप CSS जानते हैं?

* आधुनिक CSS? 🤔
* **क्या CSS आपके रिज़्यूमे में होना चाहिए???** 🚀
* बहुविकल्पीय. 🤖 ... _कितना मुश्किल हो सकता है, है ना?_

<QuizUI>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={0}
  group="वार्म‑अप"
  title="CSS वेरिएबल्स का उपयोग"
  options={[
    {text: 'background-color: blue;'},
    {text: 'background-color: --main-color;'},
    {text: 'background-color: var(--main-color);', isAnswer: true},
    {text: 'background-color: $main-color;'},
    {text: 'background-color: @main-color;'},
  ]}
>
  <slot name="question">
  <div className="question">
    `--main-color` नामक CSS वेरिएबल का उपयोग करके किसी तत्व की पृष्ठभूमि रंग सेट करने का सही तरीका क्या है?
    ```css
        :root {
          --main-color: blue;
        }
        div {
          /* How do we use --main-color here? */
        }
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    CSS वेरिएबल्स को `var` फ़ंक्शन के साथ उपयोग किया जाता है, इसलिए सही उत्तर है `background-color: var(--main-color);`। यह सिंटैक्स `--main-color` का मान प्राप्त करता है और लागू करता है।

    अन्य विकल्प अन्य भाषाओं या प्री‑प्रोसेसर सिंटैक्स, जैसे Sass या Less, से परिचित हो सकते हैं।
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={1}
  group="CSS फ़ंक्शन"
  title="CSSmin() फ़ंक्शन"
  options={[
    {text: 'width: 50%;'},
    {text: 'width: 200px;', isAnswer: true},
    {text: 'width: 250px;'},
    {text: 'width: 500px;'},
    {text: 'width: max(50%, 200px);'},
    {text: 'अमान्य सिंटैक्स'},
  ]}
>
  <slot name="question">
  <div className="question">
    यदि पैरेंट/कंटेनर की चौड़ाई 400px है, तो नीचे दिए गए तत्व की गणना की गई चौड़ाई क्या होगी?
    ```css
        div {
          width: min(250px, 50%);
        }
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    `min()` फ़ंक्शन 250px और पैरेंट की चौड़ाई के 50% में से सबसे छोटा मान चुनेगा।

    गणना किए गए मान को समझने के लिए हमें सापेक्ष इकाइयों को पिक्सल में बदलना होगा:

    - `400px` का `50%` `200px` है
    - `250px` पहले से ही पिक्सल में है
    ```css
        /* This gets computed to */
        width: min(250px, 200px);
        /* -> 200px wins */
    ```
    `min()` फ़ंक्शन रिस्पॉन्सिव डिज़ाइन में विशेष रूप से उपयोगी है, जहाँ आप सुनिश्चित कर सकते हैं कि कोई घटक (या फ़ॉन्ट आकार) किसी निश्चित सीमा से अधिक न हो।
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={2}
  group="CSS फ़ंक्शन"
  title="CSS max() फ़ंक्शन"
  options={[
    {text: 'width: 6em;'},
    {text: 'width: 10%;'},
    {text: 'width: 10px;'},
    {text: 'width: 50px;'},
    {text: 'width: 96px;', isAnswer: true},
    {text: 'Invalid syntax'},
  ]}
>
  <slot name="question">
  <div className="question">
    यदि कंटेनर की चौड़ाई 200px है, तो `<div>` की गणना की गई चौड़ाई क्या होगी?
    ```css
        div {
          width: max(50px, 10%, 6rem);
        }
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    `max()` फ़ंक्शन 2 या अधिक इनपुट लेता है, और स्वचालित रूप से सबसे बड़ा मान उपयोग करता है। मान लेते हैं कि रूट फ़ॉन्ट आकार ब्राउज़र का डिफ़ॉल्ट `16px` है, तो चौड़ाई `96px` निकलती है।

    गणना किए गए मान को समझने के लिए हमें सापेक्ष इकाइयों को पिक्सेल में बदलना होगा:

    - `50px` पहले से ही पिक्सेल में है
    - `200px` का `10%` `20px` है
    - `6rem` `6 * 16px` (डिफ़ॉल्ट फ़ॉन्ट आकार) है, जो `96px` है
    ```css
        /* This gets computed to */
        width: max(50px, 20px, 96px);
        /* -> 96px wins */
    ```
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={3}
  group="CSS ग्रिड फ़ंक्शन"
  title="CSS minmax() फ़ंक्शन"
  options={[
    {text: 'सभी कॉलम की चौड़ाई 100px और 200px के बीच'},
    {text: 'कॉलम को 100px, पंक्तियों को 200px सेट करें'},
    {text: 'पहला कॉलम 100px और 200px के बीच रहेगा', isAnswer: true},
    {text: 'रेंज को पुनरावर्ती रूप से लागू करें, सबग्रिड सहित'},
  ]}
>
  <slot name="question">
  <div className="question">
    CSS ग्रिड ट्रैक के लिए `minmax(100px, 200px)` उपयोग करने का प्रभाव क्या है?
    ```css
        grid-template-columns: minmax(100px, 200px);
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    `minmax(100px, 200px)` का उपयोग करके ग्रिड ट्रैक को `100px` से `200px` के बीच रिसाइज़ किया जा सकता है, उपलब्ध स्थान के अनुसार ढलता है लेकिन कभी भी `100px` से नीचे या `200px` से ऊपर नहीं जाता।

    आप ऑटो‑एडजस्टिंग लेआउट बना सकते हैं जहाँ कंटेनर और चाइल्ड दोनों लेआउट गणना में भूमिका निभाते हैं। यह `repeat()` और `auto-fill` या `auto-fit` के साथ मिलाकर बहुत शक्तिशाली बन जाता है, जो प्रतिबंधों के भीतर जितने संभव हो ट्रैक बनाता है।
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={4}
  group="CSS वेरिएबल्स"
  title="CSS वेरिएबल फ़ॉलबैक"
  options={[
    {text: 'नीला'},
    {text: 'लाल'},
    {text: 'सिस्टम डिफ़ॉल्ट'},
    {text: '#6b8e23', isAnswer: true},
    {text: 'var(--secondary-color)'},
  ]}
>
  <slot name="question">
  <div className="question">
    निम्नलिखित CSS के लिए बैकग्राउंड का रंग क्या होगा?
    ```css
        div {
          background: var(--primary, olivedrab);
        }
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    `var()` फ़ंक्शन आपको वैरिएबल न परिभाषित होने पर फ़ॉलबैक वैल्यू सेट करने देता है। इस मामले में, बैकग्राउंड `olivedrab` (`#6b8e23`) होगा क्योंकि `--primary` परिभाषित नहीं है।

    यह एक शानदार तरीका है यह सुनिश्चित करने का कि यदि वैरिएबल गायब या असमर्थित हो तो आपके स्टाइल टूटें नहीं।
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={5}
  group="CSS फ़ंक्शन"
  title="रिस्पॉन्सिव डिज़ाइन के लिए clamp() का उपयोग"
  options={[
    {text: 'संभवतः असमर्थित इकाइयों के लिए फ़ॉलबैक'},
    {text: '`vw` इकाइयों को 20px और 50px के बीच सुनिश्चित करें'},
    {text: '200px और 500px के बीच रैखिक स्केल', isAnswer: true},
    {text: '200px और 500px के बीच Log₂ स्केल'},
    {text: 'विफल! IE 11 समर्थन नहीं'},
  ]}
>
  <slot name="question">
  <div className="question">
    `clamp()` क्या करता है?
    ```css
        .card {
          width: clamp(200px, 50vw, 500px);
        }
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    `clamp()` फ़ंक्शन चौड़ाई को `50vw` के आधार पर स्केल करने देता है, लेकिन इसे 200px से 500px की सीमा में रखता है.

    इसका मतलब है कि जब `50vw` 200px से कम होगा तो चौड़ाई 200px होगी, जब `50vw` 500px से अधिक होगा तो 500px होगी, और इन सीमाओं के बीच रैखिक रहेगा.

    यह आपको ऑटो‑मैजिकली रिस्पॉन्सिव बनाता है! `clamp` के बारे में जानने वाली बात यह है कि यह **स्थिर इकाइयों** को **रिस्पॉन्सिव या गणना की गई इकाइयों** के साथ मिलाता है.

    सामान्यतः आप फ़ॉन्ट साइज के लिए viewport इकाइयों का उपयोग नहीं करना चाहेंगे, लेकिन `clamp()` के साथ हम सुनिश्चित कर सकते हैं कि फ़ॉन्ट साइज बहुत छोटा या बहुत बड़ा न हो.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={6}
  group="CSS नेस्टिंग"
  title="नेटिव CSS नेस्टिंग"
  options={[
    {text: 'केवल SCSS के साथ'},
    {text: 'तकनीकी रूप से PostCSS के साथ'},
    {text: 'हाँ', isAnswer: true},
    {text: 'नहीं'},
  ]}
>
  <slot name="question">
  <div className="question">
    क्या CSS नेस्टिंग को नेटिव रूप से सपोर्ट करता है?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    हाँ! आखिरकार हमारे पास नेटिव CSS नेस्टिंग है! CSS ने हाल के वर्षों (2023) में नेटिव नेस्टिंग सिंटैक्स पेश किया, जिससे सीधे CSS में पदानुक्रमित स्टाइलिंग संभव हो गई।
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={7}
  group="CSS नेस्टिंग"
  title="CSS नेस्टिंग"
  options={[
    {text: 'फ़ाइलनाम .scss पर समाप्त होना चाहिए'},
    {text: '`.title` को `color` जैसी प्रॉपर्टीज़ से पहले होना चाहिए'},
    {text: 'केवल PostCSS के साथ'},
    {text: 'परफ़ेक्ट। कोई टिप्पणी नहीं।', isAnswer: true},
  ]}
>
  <slot name="question">
  <div className="question">
    क्या यह मूल CSS नेस्टिंग का सही उपयोग है?
    ```css
        .container {
          color: black;
          .title {
            color: white;
            background: black;
          }
        }
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    `.title` क्लास `.container` क्लास के भीतर नेस्टेड है, और प्रॉपर्टीज़ अपेक्षित रूप से लागू होती हैं।

    यह संबंधित स्टाइल्स को साथ रखने और लंबे सेलेक्टर्स से बचने का शानदार तरीका है।
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={8}
  group="CSS नेस्टिंग"
  title="नेस्टिंग के साथ डायरेक्ट चाइल्ड सेलेक्टर"
  options={[
    {text: 'background-color: red'},
    {text: 'background-color: white', isAnswer: true},
    {text: 'background-color: blue'},
    {text: 'Invalid syntax'},
  ]}
>
  <slot name="question">
  <div className="question">
    `.container` के डायरेक्ट चाइल्ड `div` पर कौन सा बैकग्राउंड रंग लागू होगा?
    ```css
        .container {
          background-color: red;
          > div {
            background-color: white;
          }
          background-color: blue !important;
        }
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    नेस्टेड नियम में `>` सेलेक्टर केवल `.container` के भीतर के डायरेक्ट चाइल्ड `div` तत्वों पर `background-color: white` लागू करता है।

    आखिरी नियम, `background-color: blue !important;`, थोड़ा ध्यान भटकाने वाला है। यह **नेस्टेड नियम के बाहर** है और सभी `.container` तत्वों पर लागू होगा।
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={9}
  group="CSS वेरिएबल्स"
  title="रनटाइम पर CSS वेरिएबल बदलना"
  options={[
    {text: 'CSS वेरिएबल अपरिवर्तनीय हैं'},
    {text: 'जावास्क्रिप्ट का उपयोग करके', isAnswer: true},
    {text: 'केवल SCSS के साथ'},
    {text: 'केवल इनलाइन स्टाइल्स के साथ'},
    {text: 'रिस्पॉन्सिव यूनिट्स का उपयोग करके'},
  ]}
>
  <slot name="question">
  <div className="question">
    रनटाइम पर CSS वेरिएबल का मान कैसे बदल सकते हैं?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    CSS वेरिएबल्स को क्लासेज़ और जावास्क्रिप्ट का उपयोग करके सेट किया जा सकता है। इन्हें यहाँ तक कि तकनीकी रूप से उपयोग होने के बाद भी परिभाषित किया जा सकता है।
    ```js
        document.documentElement.style.setProperty('--main-color', 'blue');
    ```
    यह पूरे दस्तावेज़ के लिए `--main-color` का मान `blue` में बदल देगा.

    CSS वेरिएबल्स परिवर्तनीय हैं, और रनटाइम पर जावास्क्रिप्ट का उपयोग करके बदले जा सकते हैं.

    इन्हें क्लासेज़ जोड़कर या हटाकर भी बदला जा सकता है, जो थीमिंग के लिए एक सामान्य पैटर्न है.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={10}
  group="CSS वेरिएबल्स"
  title="calc() के साथ CSS वेरिएबल्स का उपयोग"
  options={[
    {text: 'चौड़ाई: 50px'},
    {text: 'चौड़ाई: 100px'},
    {text: 'चौड़ाई: 110px', isAnswer: true},
    {text: 'चौड़ाई: 120px'},
  ]}
>
  <slot name="question">
  <div className="question">
    इस तत्व की गणना की गई चौड़ाई क्या होगी?
    ```css
        :root {
          --base-width: 100px;
        }
        div {
          width: calc(var(--base-width) + 10px);
        }
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    `calc()` फ़ंक्शन `--base-width` (100px) के मान को अतिरिक्त 10px के साथ जोड़ता है, जिससे चौड़ाई 110px हो जाती है।
  </div>
  </slot>
</Challenge>

</QuizUI>
````
