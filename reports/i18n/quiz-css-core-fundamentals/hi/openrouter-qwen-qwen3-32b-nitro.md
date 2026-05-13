# Translation Candidate
- Slug: quiz-css-core-fundamentals
- Locale: hi
- Model: openrouter/qwen/qwen3-32b:nitro
- Target: src/content/posts/2024-11-08--quiz-css-core-fundamentals/hi/index.mdx
- Validation: rejected: direct AI SDK translation failed
- Runtime seconds: 117.26
- Input tokens: 11431
- Output tokens: 16202
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- Estimated cost: $0.004803
- Pricing source: local-openrouter-estimate
- Note: Command failed: git add src/content/posts/2024-11-08--quiz-css-core-fundamentals/hi/index.mdx reports/i18n/quiz-css-core-fundamentals/hi
## Raw Output

````mdx
---
unlisted: false
title: ''
subTitle: क्या आप फ्रंट-एंड के लायक हैं?
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
```jsx
import Challenge from '../../../../../components/QuizUI/Challenge';
import QuizUI from '../../../../../components/QuizUI/QuizUI';


## क्विज़: क्या आप CSS जानते हैं?

* आधुनिक CSS? 🤔
* **क्या CSS आपके रिज्यूम पर होना चाहिए???** 🚀
* बहुविकल्पीय। 🤖 ... _कितना मुश्किल हो सकता है, ना?_
```

<QuizUI>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={0}
  group="तैयारी: फॉन्ट्स"
  title="फॉन्ट साइज़ के लिए अमान्य CSS इकाई"
  options={[
    {text: '10cx', isAnswer: true},
    {text: '1.0mm'},
    {text: '10pt'},
    {text: '10px'},
    {text: '10vmin'},
  ]}
>
  <slot name="question">
  <div className="question">
    निम्नलिखित में से <em class="highlight">एक अमान्य</em> ❌ `font-size` चुनें:
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    `10cx` गलत है क्योंकि `cx` एक वैध CSS इकाई नहीं है (कम से कम लिखने के समय तक)।

    लोकप्रिय इकाइयाँ `px`, `rem`, `em` जैसी हैं।

    नई इकाइयाँ डाइनामिक, रिस्पॉन्सिव लेआउट में उपयोगी हैं।

    - `ch` - `0` अक्षर की चौड़ाई
    - `vmin` - विउपोर्ट का न्यूनतम
    - `vmax` - विउपोर्ट का अधिकतम
    - `vh` - विउपोर्ट की ऊंचाई
    - `vw` - विउपोर्ट की चौड़ाई

    कुछ इकाइयाँ हमेशा से मौजूद रही हैं लेकिन लगभग उपयोग नहीं हुई, जैसे `cm` सेंटीमीटर के लिए, `mm`, `in` इंच के लिए, `pt` पॉइंट के लिए।
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={1}
  group="वार्मअप: रंग"
  title="हेक्स कोड"
  options={[
    {text: '#A', hint: 'अवैध: 1 अंक वाला हेक्स कोड नहीं हो सकता।'},
    {text: '#AB', hint: 'अवैध: 2 अंक वाला हेक्स कोड नहीं हो सकता।'},
    {text: '#ABCD', isAnswer: true, hint: 'सही है: 4 अंकों वाला हेक्स कोड अल्फा चैनल के साथ होता है।'},
    {text: '#ABCDE', hint: 'अवैध: 5 अंक वाला हेक्स कोड नहीं हो सकता।'},
  ]}
>
  <slot name="question">
  <div className="question">
    क्या आप एकमात्र <em class="highlight">वैध</em> हेक्स कोड 👍 को पहचान सकते हैं?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    हेक्स कोड का उपयोग CSS में रंगों को प्रतिनिधित्व करने के लिए किया जाता है। वे एक `#` से प्रारंभ होते हैं और 3, 4, 6, या 8 हेक्साडेसिमल अंकों के साथ होने चाहिए।

    3-अक्षर वाला हेक्स कोड 6-अक्षर वाले कोड के लिए एक छोटा रूप है, जहाँ प्रत्येक अक्षर दोहराया जाता है। 4-अक्षर वाला कोड अपारदर्शीता के लिए अल्फा चैनल शामिल करता है।

    उदाहरण के लिए `#ABC` के बराबर है `#AABBCC`, और `#ABCD` के बराबर है `#AABBCCDD`। हेक्स मान के संसाधन के बारे में अधिक जानने के लिए, मेरी [जावास्क्रिप्ट संख्याएँ क्विज़](/quiz-can-you-count-to-bigint/) देखें।
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={2}
  group="तापमान: इकाइयाँ"
  title="अपसेट, सभी इकाइयाँ!"
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
    इनमें से कौन सी इकाई <em class="highlight">नहीं</em> है एक वैध ❌ CSS इकाई?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    नई इकाइयाँ जैसे `ch`, `vmin`, `vmax`, `vh`, `vw` प्रतिक्रियाशील लेआउट में बहुत उपयोगी हैं।

    इनके अलावा कई ऐसी इकाइयाँ भी हैं जो हमेशा से मौजूद रही हैं लेकिन बरी तरह उपयोग नहीं की गई हैं, जैसे `cm` सेंटीमीटर के लिए, `mm`, `in` इंच के लिए, `pt` पॉइंट के लिए, `pc`, `cap` बड़े अक्षरों के आकार के लिए, और `ex` जो अक्षर `x` की ऊँचाई के बराबर है।

    लोकप्रिय इकाइयाँ `px` पिक्सल के लिए, `em` तत्व के फॉन्ट आकार के संबंध में, और `rem` जो वास्तव में भूले गए 90 के दशक के बैंड R.E.M. के लिए एक श्रद्धांजलि है (ठीक नहीं, वास्तव में यह बस एक आपेक्षिक `em` इकाई है जो जड़ तत्व को संदर्भित करती है)।
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={3}
  group="सिलेक्टर: मूल बातें"
  title="एचटीएमएल तत्वों के लिए सिलेक्टर मिलान"
  options={[
    {text: '#होम'},
    {text: 'a [id=\'home\']'},
    {text: 'a:contains(home)'},
    {text: 'a#home[name=\'home\']', isAnswer: true},
  ]}
>
  <slot name="question">
  <div className="question">
    निम्नलिखित एचटीएमएल के लिए कौन सा सिलेक्टर सबसे अच्छा मेल खाता है?
    ```html
          <a id="home" name="home" href="/home">Home</a>
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    सही उत्तर `a#home[name='home']` है, जो `id` और `name` दोनों गुणों के मेल को सुनिश्चित करता है। CSS सिलेक्टर में बड़े-छोटे अक्षर महत्वपूर्ण होते हैं, इसलिए `#Home` काम नहीं करेगा, और स्पेस से बच्चे तत्वों का अर्थ होता है, जो यहाँ लागू नहीं होता।

    `:contains()` सिलेक्टर CSS में मानक नहीं है, लेकिन कुछ जावास्क्रिप्ट लाइब्रेरी में उपलब्ध है।
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={4}
  group="सिलेक्टर: मूल बातें"
  title="बटन के लिए एट्रिब्यूट सिलेक्टर"
  options={[
    {text: 'बटन:लिंक'},
    {text: 'बटन::क्लिक'},
    {text: 'बटन:फोकस'},
    {text: 'बटन[ओंक्लिक]', isAnswer: true},
    {text: 'बटन[ओन-क्लिक]'},
  ]}
>
  <slot name="question">
  <div className="question">
    निम्नलिखित HTML बटन के लिए कौन सा सिलेक्टर मेल खाता है?
    ```html
          <button onclick="openModal()">Contact</button>
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    सही उत्तर `button[onclick]` है, जो `onclick` एट्रिब्यूट के अस्तित्व को लक्षित करता है।

    ध्यान दें कि `:link` केवल अनविजित `href` लिंक लक्षित करता है, `::click` एक वैध प्रतिरूप तत्व नहीं है, और `:focus` केवल फोकस तत्व लक्षित करता है।
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={5}
  group="चयनकर्ता: मूल बातें"
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
    चयनकर्ता `c > > d {}` अमान्य है क्योंकि बच्चा संयोजक दोनों `>` चिहों के बीच किसी चयनकर्ता के बिना दोहराया गया है।

    अन्य चयनकर्ता वैध हैं। एक प्रकार का चयनकर्ता जैसे `c {}` सिंटैक्स रूप से वैध CSS है भले ही `c` एक मानक HTML तत्व न हो।
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={6}
  group="चयनकर्ता: मूल बातें"
  title="अंतिम लिंक का चयन करना"
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
    निम्नलिखित HTML में अंतिम लिंक के साथ मेल खाने वाले चयनकर्ता कौन से हैं?
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
    सही चयनकर्ता `a:last-child` है, जो अंतिम `<a>` के साथ मेल खाता है जब यह अपने माता-पिता का अंतिम बच्चा भी होता है। `nav:nth-child(3)` अपने माता-पिता के तीसरे बच्चे के रूप में एक `<nav>` तत्व के साथ मेल खाएगा।
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={7}
  group="चयनक: विशिष्टता"
  title="चयनक की प्राथमिकता"
  options={[
    {text: 'main article section blockquote a'},
    {text: 'blockquote a'},
    {text: 'a#quote', isAnswer: true},
    {text: 'a.quote'},
  ]}
>
  <slot name="question">
  <div className="question">
    कौन सा चयनक प्राथमिकता प्राप्त करेगा?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    चयनक `a#quote` प्राथमिकता प्राप्त करता है क्योंकि ID की विशिष्टता टैग या कक्षा-आधारित चयनकों की तुलना में अधिक होती है।
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={8}
  group="लेआउट: केंद्रित करना"
  title="ब्लॉक एलिमेंट में टेक्स्ट को केंद्रित करना"
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
    आप एक बॉक्स में 'कोई टेक्स्ट' को कैसे केंद्रित कर सकते हैं?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    `text-align: center;` का उपयोग ब्लॉक एलिमेंट में टेक्स्ट को केंद्रित करने के लिए सही तरीका है। `align` प्रॉपर्टीज़ फ्लेक्सबॉक्स लेआउट में उपयोग होती हैं, और `margin: 0 auto;` ब्लॉक एलिमेंट को क्षैतिज रूप से केंद्रित करने के लिए उपयोग होता है।

    `align-content` ग्रिड लेआउट में उपयोग होता है, और `text-content` एक मान्य CSS प्रॉपर्टी नहीं है।
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={9}
  group="लेआउट: केंद्रित करना"
  title="ब्लॉक तत्व को ऊर्ध्वाधर रूप से केंद्रित करना"
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
    आधुनिक फ्लो लेआउट में ब्लॉक कंटेनर के अंदर कॉन्टेंट को कैसे ऊर्ध्वाधर रूप से केंद्रित करते हैं?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    `align-content` का उपयोग आधुनिक फ्लो लेआउट में ब्लॉक कंटेनर के अंदर कॉन्टेंट को ऊर्ध्वाधर रूप से केंद्रित करने का आधुनिक तरीका है।

    `align-items` और `justify-content` प्रॉपर्टीज़ फ्लेक्सबॉक्स और ग्रिड लेआउट के लिए होती हैं, लेकिन फ्लो के लिए नहीं।

    `margin: 0 auto;` और `margin: auto;` दोनों ब्लॉक तत्व को क्षैतिज रूप से केंद्रित करते हैं, लेकिन ऊर्ध्वाधर नहीं।
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={10}
  group="लेआउट: इकाइयाँ"
  title="नेस्टेड फॉनट साइज़ के पिक्सेल साइज़ की गणना"
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
    `<a>` लिंक के टेक्स्ट का पिक्सेल साइज़ निम्न HTML में क्या है?
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
    `<a>` के लिए `font-size` 5px के रूप में गणना करता है: 40px (body) * 50% (nav) = 20px, फिर 20px * 25% = 5px।
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={11}
  group="इकाइयाँ: REM"
  title="REMs के साथ पिक्सेल आकार की गणना करना"
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
    निम्नलिखित HTML में "HOME" लिंक के लिए `1.2rem` का पिक्सेल आकार क्या होगा?
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
    `1.2rem` 12px के बराबर होता है क्योंकि `rem` इकाइयाँ रूट या `<html>` फॉन्ट आकार पर आधारित होती हैं, जो यहाँ 10px तक सेट किया गया है।
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={12}
  group="इकाई: ईएम"
  title="ईएम के साथ पिक्सेल आकार की गणना करना"
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
    पिछले प्रश्न के समान, निम्न HTML में 'HOME' लिंक के लिए `1.2em` का पिक्सेल आकार क्या होगा?
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
    `1.2em` 24px के बराबर है क्योंकि `em` इकाई विरासत में मिले फॉन्ट आकार पर आधारित होती हैं, जो यहाँ 20px निर्धारित की गई है।
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={13}
  group="चयनक: विशिष्टता"
  title="शून्य-विशिष्टता चयनक"
  options={[
    {text: ':where(.card) .title', isAnswer: true},
    {text: '.card .title'},
    {text: ':is(.card) .title'},
    {text: '#card .title'},
  ]}
>
  <slot name="question">
  <div className="question">
    निम्नलिखित में से कौन-सा चयनक सबसे कम विशिष्टता रखता है?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    `:where(.card) .title` सबसे कम विशिष्टता रखता है। `:where()` छद्म-वर्ग और उसमें सब कुछ `0-0-0` के रूप में योगदान देता है, इसलिए केवल `.title` गिना जाता है। `:is(.card) .title` में `.card` की विशिष्टता बरकरार रहती है, `.card .title` में दो वर्ग होते हैं, और `#card .title` में एक आईडी शामिल है।
  </div>
  </slot>
</Challenge>

</QuizUI>
````
