# Translation Candidate
- Slug: quiz-css-core-fundamentals
- Locale: hi
- Model: openrouter/openai/gpt-oss-120b:nitro
- Target: src/content/posts/2024-11-08--quiz-css-core-fundamentals/hi/index.mdx
- Validation: deferred
- Runtime seconds: 20.69
- Input tokens: 12313
- Output tokens: 8461
- Thinking tokens: unknown
- Cached input tokens: 2560
- Cache write tokens: 0
- Estimated cost: $0.002003
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
unlisted: false
title: 'प्रश्नोत्तरी: क्या आप CSS मूल बातें जानते हैं? (2025)'
subTitle: क्या आप फ्रंट‑एंड में पर्याप्त हैं?
label: CSS Fundamentals
social_image: ../desktop-social.webp
category: Quiz
subCategory: CSS
date: '2024-11-08'
modified: '2024-11-10'
tags:
  - quiz
  - intro
  - css
  - styles
  - beginner
  - intermediate
cover_full_width: ../yeshi-kangrang-Qq7A85iCzhQ-unsplash-wide.webp
cover_mobile: ../yeshi-kangrang-Qq7A85iCzhQ-unsplash-square.webp
cover_icon: ../yeshi-kangrang-Qq7A85iCzhQ-unsplash-square.webp
---
import Challenge from '../../../../../components/QuizUI/Challenge';

import Challengefrom '../../../../components/QuizUI/Challenge';
import QuizUI from '../../../../../components/QuizUI/QuizUI';


## क्विज़: क्या आप CSS जानते हैं?

* आधुनिक CSS? 🤔  
* **क्या CSS आपके रिज़्यूमे में होना चाहिए???** 🚀  
* बहुविकल्पीय प्रश्न। 🤖 … _कितना कठिन हो सकता है, है ना?_

<QuizUI>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={0}
  group="वार्म‑अप: फ़ॉन्ट्स"
  title="फ़ॉन्ट आकार के लिए अमान्य CSS इकाई"
  options={[
    {text: '10cx', isAnswer: true},
    {text: '10mm'},
    {text: '10pt'},
    {text: '10px'},
    {text: '10vmin'},
  ]}
>
  <slot name="question">
  <div className="question">
    एक <em class="highlight">अमान्य</em> ❌ `font-size` चुनें:
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    `10cx` गलत है क्योंकि `cx` कोई वास्तविक CSS इकाई नहीं है। (कम से कम लेखन के समय तक.)

    लोकप्रिय इकाइयों में परिचित `px`, `rem`, `em` शामिल हैं।

    नई इकाइयाँ गतिशील, उत्तरदायी लेआउट के लिए उपयोगी हैं।

    - `ch` - `0` अक्षर की चौड़ाई
    - `vmin` - viewport न्यूनतम
    - `vmax` - viewport अधिकतम
    - `vh` - viewport ऊँचाई
    - `vw` - viewport चौड़ाई

    कुछ इकाइयाँ हमेशा से मौजूद हैं लेकिन कम उपयोग होती हैं, जैसे सेंटीमीटर के लिए `cm`, `mm`, इंच के लिए `in`, पॉइंट्स के लिए `pt`
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={1}
  group="वार्म‑अप: रंग"
  title="हेक्स कोड"
  options={[
    {text: '#A'},
    {text: '#AB'},
    {text: '#ABCD', isAnswer: true},
    {text: '#ABCDE'},
  ]}
>
  <slot name="question">
  <div className="question">
    क्या आप <em class="highlight">एक</em> वैध 👍 हेक्स कोड ढूंढ सकते हैं?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Hex codes को CSS में रंग दर्शाने के लिये इस्तेमाल किया जा सकता है। इन्हें `#` से शुरू किया जाता है और इनमें 3, 4, 6, या 8 हेक्साडेसिमल अंक होने चाहिए।

    3‑अक्षर वाला हेक्स कोड 6‑अक्षर कोड का शॉर्टहैंड है, जहाँ प्रत्येक अक्षर दोहराया जाता है। 4‑अक्षर वाला कोड अल्फा चैनल (पारदर्शिता) शामिल करता है।

    उदाहरण के लिये `#ABC` वही है जो `#AABBCC` और `#ABCD` वही है जो `#AABBCCDD`। हेक्स मानों को संभालने के बारे में अधिक जानने के लिये, मेरे [जावास्क्रिप्ट नंबर क्विज़.](/quiz-can-you-count-to-bigint/) को देखें।
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={2}
  group="वार्म‑अप: इकाइयाँ"
  title="अरे, सभी इकाइयाँ!"
  options={[
    {text: 'em'},
    {text: 'rem'},
    {text: 'cm'},
    {text: 'mm'},
    {text: 'in'},
    {text: 'pt'},
    {text: 'pc'},
    {text: 'px'},
    {text: 'ex'},
    {text: 'ch'},
    {text: 'vmin'},
    {text: 'vmax'},
    {text: 'vh'},
    {text: 'rel', isAnswer: true},
    {text: 'vw'},
  ]}
>
  <slot name="question">
  <div className="question">
    इनमें से कौन सी इकाई <em class="highlight">NOT</em> एक वैध ❌ CSS इकाई है?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    `ch`, `vmin`, `vmax`, `vh`, `vw` जैसी नई इकाइयाँ डायनेमिक/रिस्पॉन्सिव लेआउट के लिए काफी उपयोगी हैं।
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={3}
  group="सेलेक्टर: मूल बातें"
  title="सेलेक्टर्स को HTML एलिमेंट्स से मिलाना"
  options={[
    {text: '#Home'},
    {text: 'a [id=\'home\']'},
    {text: 'a:contains(home)'},
    {text: 'a#home[name=\'home\']', isAnswer: true},
  ]}
>
  <slot name="question">
  <div className="question">
    निम्नलिखित HTML से कौन‑सा सेलेक्टर सबसे अच्छा मेल खाता है?
    ```html
          <a id="home" name="home" href="/home">Home</a>
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    सही उत्तर है `a#home[name='home']`, जो `id` और `name` दोनों एट्रिब्यूट्स से मेल खाता है। CSS सेलेक्टर्स केस‑सेंसिटिव होते हैं, इसलिए `#Home` काम नहीं करेगा, और स्पेस का मतलब चाइल्ड एलिमेंट्स होता है, जो यहाँ लागू नहीं होता।

    `:contains()` सेलेक्टर मानक CSS सेलेक्टर नहीं है, लेकिन कुछ JS लाइब्रेरीज़ में उपलब्ध है।
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={4}
  group="सेलेक्टर: मूलभूत"
  title="बटन के लिए एट्रिब्यूट सेलेक्टर"
  options={[
    {text: 'button:link'},
    {text: 'button::click'},
    {text: 'button:focus'},
    {text: 'button[onclick]', isAnswer: true},
    {text: 'button[on-click]'},
  ]}
>
  <slot name="question">
  <div className="question">
    निम्नलिखित HTML बटन से मेल खाने वाला सेलेक्टर कौन सा है?
    ```html
          <button onclick="openModal()">Contact</button>
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    सही उत्तर `button[onclick]` है, जो attribute `onclick` की मौजूदगी को लक्षित करता है।

    ध्यान दें कि `:link` केवल अनदेखे `href` लिंक को लक्षित करता है, `::click` एक वैध pseudo-element नहीं है, और `:focus` केवल फोकस किए गए तत्व को लक्षित करता है।
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={5}
  group="चयनकर्ता: मूलभूत"
  title="अमान्य CSS चयनकर्ता"
  options={[
  ]}
>
  <slot name="question">
  <div className="question">
    इनमें से कौन सा चयनकर्ता अमान्य है?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    सेलेक्टर `c > > d {}` अमान्य है क्योंकि चाइल्ड कॉम्बिनेटर दो `>` अक्षरों के बीच कोई चयनकर्ता न होने के कारण दोहराया गया है।

    अन्य चयनकर्ता मान्य हैं। `c {}` जैसा टाइप चयनकर्ता सिंटैक्टिक रूप से वैध CSS है, भले ही `c` एक मानक HTML तत्व न हो।
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={6}
  group="सेलेक्टर: मूलभूत"
  title="आखिरी लिंक का चयन"
  options={[
    {text: 'a :nth-child(3)'},
    {text: 'a:last-item'},
    {text: 'nav:last-of-type(a)'},
    {text: 'nav:nth-child(3)'},
    {text: 'a:last-child', isAnswer: true},
  ]}
>
  <slot name="question">
  <div className="question">
    निम्नलिखित HTML में आखिरी लिंक से मेल खाने वाला सेलेक्टर कौन सा है?
    ```html
          <nav>
            <a name="home" href="/home">Home</a>
            <a name="login" href="/login">Login</a>
            <a name="help" href="/help">Help</a>
          </nav>
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    सही सेलेक्टर `a:last-child` है, जो तब आखिरी `<a>` से मेल खाता है जब वह अपने पैरेंट का भी आखिरी चाइल्ड हो। `nav:nth-child(3)` एक `<nav>` एलिमेंट से मेल खाएगा जो अपने पैरेंट का तीसरा चाइल्ड हो।
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={7}
  group="सेलेक्टर: विशिष्टता"
  title="सेलेक्टर प्राथमिकता"
  options={[
    {text: 'main article section blockquote a'},
    {text: 'blockquote a'},
    {text: 'a#quote', isAnswer: true},
    {text: 'a.quote'},
  ]}
>
  <slot name="question">
  <div className="question">
    कौन सा सेलेक्टर प्राथमिकता लेगा?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    ID के कारण `a#quote` सेलेक्टर को प्राथमिकता मिलती है, क्योंकि इसका विशिष्टता टैग या क्लास-आधारित सेलेक्टर्स से अधिक होती है।
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={8}
  group="लेआउट: केंद्रित करना"
  title="ब्लॉक तत्व में टेक्स्ट को केंद्रित करना"
  options={[
    {text: 'align: center;'},
    {text: 'margin: 0 auto;'},
    {text: 'align-content: center;'},
    {text: 'text-align: center;', isAnswer: true},
    {text: 'text-content: center;'},
  ]}
>
  <slot name="question">
  <div className="question">
    आप बॉक्स में "shit" को कैसे केंद्रित करेंगे?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    ब्लॉक तत्व में टेक्स्ट को केंद्रित करने का सही तरीका `text-align: center;` का उपयोग करना है। `align` प्रॉपर्टी flexbox लेआउट के लिए उपयोग होती हैं, और `margin: 0 auto;` ब्लॉक तत्वों को क्षैतिज रूप से केंद्रित करने के लिए प्रयोग होता है।

    `align-content` प्रॉपर्टी grid लेआउट के लिए उपयोग होती है, और `text-content` कोई वैध CSS प्रॉपर्टी नहीं है।
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={9}
  group="लेआउट: केंद्रित करना"
  title="ब्लॉक एलिमेंट को लंबवत केंद्रित करना"
  options={[
    {text: 'align-items: center;'},
    {text: 'justify-content: center;'},
    {text: 'align-content: center;', isAnswer: true},
    {text: 'margin: auto;'},
    {text: 'margin: 0 auto;'},
  ]}
>
  <slot name="question">
  <div className="question">
    आधुनिक फ्लो लेआउट में ब्लॉक कंटेनर के भीतर सामग्री को लंबवत कैसे केंद्रित करें?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    `align-content` का उपयोग करना आधुनिक तरीका है ब्लॉक कंटेनर की सामग्री को फ्लो लेआउट में लंबवत केंद्रित करने का।

    `align-items` और `justify-content` प्रॉपर्टी flexbox और grid लेआउट के लिए हैं, फ्लो के लिए नहीं।

    `margin: 0 auto;` और `margin: auto;` दोनों ब्लॉक एलिमेंट को क्षैतिज रूप से केंद्रित करते हैं, लेकिन लंबवत नहीं।
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={10}
  group="लेआउट: इकाइयाँ"
  title="नेस्टेड फ़ॉन्ट आकारों का पिक्सेल आकार गणना"
  options={[
    {text: '!40px'},
    {text: '5px', isAnswer: true},
    {text: '20px'},
    {text: '25px'},
    {text: '40px'},
  ]}
>
  <slot name="question">
  <div className="question">
    निम्नलिखित HTML में `<a>` लिंक के टेक्स्ट का पिक्सेल आकार क्या है?
    ```html
          <body style="font-size: 40px !important;">
            <nav style="font-size: 50%;">
              <a style="font-size: 25%;">HOME</a>
            </nav>
          </body>
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    `<a>` के लिए `font-size` 5px निकलता है: 40px (body) * 50% (nav) = 20px, फिर 20px * 25% = 5px.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={11}
  group="इकाइयाँ: REM"
  title="REM के साथ पिक्सेल आकार की गणना"
  options={[
    {text: '10px'},
    {text: '12px', isAnswer: true},
    {text: '14px'},
    {text: '20px'},
    {text: '24px'},
    {text: '34px'},
  ]}
>
  <slot name="question">
  <div className="question">
    निम्न HTML में "HOME" लिंक के लिए `1.2rem` का पिक्सेल आकार क्या होगा?
    ```html
          <html style="font-size: 10px;">
            <body style="font-size: 20px;">
              <a style="font-size: 1.2rem;">HOME</a>
            </body>
          </html>
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    `1.2rem` 12px में बदल जाता है क्योंकि `rem` इकाइयाँ रूट या `<html>` फ़ॉन्ट आकार को संदर्भित करती हैं, जो यहाँ 10px पर सेट है।
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={12}
  group="इकाइयाँ: EM"
  title="EMs के साथ पिक्सेल आकार की गणना"
  options={[
    {text: '10px'},
    {text: '12px'},
    {text: '14px'},
    {text: '20px'},
    {text: '24px', isAnswer: true},
    {text: '34px'},
  ]}
>
  <slot name="question">
  <div className="question">
    पिछले प्रश्न की तरह, नीचे दिए गए HTML में "HOME" लिंक के लिए `1.2em` का पिक्सेल आकार क्या होगा?
    ```html
          <html style="font-size: 10px;">
            <body style="font-size: 20px;">
              <a style="font-size: 1.2em;">HOME</a>
            </body>
          </html>
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    `1.2em` 24px में बदलता है क्योंकि `em` इकाइयाँ विरासत में मिली फ़ॉन्ट आकार को संदर्भित करती हैं, जो यहाँ 20px पर सेट है।
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={13}
  group="चयनकर्ता: विशिष्टता"
  title="शून्य-विशिष्टता चयनकर्ता"
  options={[
    {text: ':where(.card) .title', isAnswer: true},
    {text: '.card .title'},
    {text: ':is(.card) .title'},
    {text: '#card .title'},
  ]}
>
  <slot name="question">
  <div className="question">
    कौन सा चयनकर्ता सबसे कम विशिष्टता रखता है?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    `:where(.card) .title` सबसे कम विशिष्टता रखता है। `:where()` प्स्यूडो‑क्लास और उसके अंदर सब कुछ `0-0-0` योगदान देता है, इसलिए केवल `.title` गिना जाता है। `:is(.card) .title` `.card` की विशिष्टता रखता है, `.card .title` में दो क्लास हैं, और `#card .title` में एक ID शामिल है।
  </div>
  </slot>
</Challenge>

</QuizUI>
````
