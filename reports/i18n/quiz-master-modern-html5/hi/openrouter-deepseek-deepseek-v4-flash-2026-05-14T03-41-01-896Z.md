# Translation Candidate
- Slug: quiz-master-modern-html5
- Locale: hi
- Model: openrouter/deepseek/deepseek-v4-flash
- Target: src/content/posts/2024-11-01--quiz-master-modern-html5/hi/index.mdx
- Validation: rejected: direct AI SDK translation failed
- Runtime seconds: 158.01
- Input tokens: 13884
- Output tokens: 22293
- Thinking tokens: unknown
- Cached input tokens: 1024
- Cache write tokens: 0
- Estimated cost: $0.008300
- Pricing source: local-openrouter-estimate
- Note: Command failed: bun run i18n:validate --slug quiz-master-modern-html5 --locale hi --skip-global (code 1)
## Raw Output

````mdx
---
unlisted: false
title: 'क्विज़: क्या HTML अब भी आपके रिज़्यूमे में शामिल है?'
subTitle: खुद को साबित करें!
label: Semantic HTML5
social_image: ../desktop-social.webp
category: Quiz
subCategory: HTML
date: '2024-10-31'
modified: '2024-11-06'
tags:
  - quiz
  - web
  - quiz
  - semantic
  - html5
  - web
  - beginner
  - intermediate
cover_full_width: ../jakob-owens-FBih1nqPi0w-unsplash-wide.webp
cover_mobile: ../jakob-owens-FBih1nqPi0w-unsplash-square.webp
cover_icon: ../jakob-owens-FBih1nqPi0w-unsplash-square.webp
---
---
import Challenge from '../../../../components/QuizUI/Challenge';
import QuizUI from '../../../../components/QuizUI/QuizUI';


## तो, आपको लगता है कि आपके पास HTML5 कौशल हैं?

आखिरकार, आप अपने `<div>` को अपने `<span>` से अलग पहचानते हैं, है ना? लेकिन आप HTML5 के अधिक उन्नत, सिमैंटिक तत्वों को कितनी अच्छी तरह जानते हैं?

> नोट: यदि आप यह परीक्षा पास नहीं कर सकते, तो आपको कानूनी रूप से अपने रिज्यूमे से `HTML Skills` हटाना होगा।

### शुरू करें!

<QuizUI>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={0}
  group="वार्मअप"
  title="`<ul>` की भूमिका"
  options={[
    {text: 'अक्रमित सूची', isAnswer: true},
    {text: 'अनोखी सूची'},
    {text: 'सार्वभौमिक सूची'},
    {text: 'उपयोगकर्ता सूची'},
  ]}
>
  <slot name="question">
  <div className="question">
    HTML में `<ul>` एलिमेंट की प्राथमिक भूमिका क्या है?
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    `<ul>` टैग एक अक्रमित सूची बनाता है, जिसमें आइटम आमतौर पर बुलेट से चिह्नित होते हैं।
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={1}
  group="उन्नत सिमैंटिक HTML"
  title="`<dd>` का उपयोग"
  options={[
    {text: 'विवरण परिभाषा'},
    {text: 'विवरण शब्द'},
    {text: 'डेटा प्रदर्शन'},
    {text: 'विवरण विवरण', isAnswer: true},
  ]}
>
  <slot name="question">
  <div className="question">
    HTML में `<dd>` एलिमेंट क्या दर्शाता है?
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    [`<dd>` एलिमेंट](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dd) एक विवरण सूची में विवरण, परिभाषा या मान को परिभाषित करता है, जिसका उपयोग `<dl>` टैग के अंदर `<dt>` (_Description Term_) के साथ जोड़ी बनाने के लिए किया जाता है।

    यह की-वैल्यू डेटा दिखाने में उपयोगी है। प्रोफ़ाइल जानकारी, सेटिंग्स और स्टैट्स सामान्य उदाहरण हैं।
    ```html
        <dl>
        <dt>JS</dt>
        <dd>Client-side</dd>
        <dd>Server-side</dd>

        <dt>HTML</dt>
        <dd>Client-side</dd>
        </dl>
    ```
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={2}
  group="उन्नत सिमैंटिक HTML"
  title="`<figure>/<figcaption>` का उपयोग"
  options={[
    {text: 'कॉपीराइट जानकारी वाली छवियों को प्रदर्शित करने के लिए'},
    {text: 'छवियों, चार्ट आदि का वर्णन करने के लिए', isAnswer: true},
    {text: 'तालिकाओं, गणनाओं आदि को एनोटेट करने के लिए'},
    {text: 'वीडियो को कैप्शन देने के लिए उपयोग किया जाता है'},
  ]}
>
  <slot name="question">
  <div className="question">
    `<figure>` और `<figcaption>` एलिमेंट का उपयोग कब किया जाना चाहिए?
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    `<figure>` टैग का उपयोग आमतौर पर स्व-निहित (मीडिया) सामग्री, जैसे कि एक छवि या चार्ट, को [`<figcaption>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/figcaption) के साथ लपेटने के लिए किया जाता है ताकि एक कैप्शन प्रदान किया जा सके।

    यह छवियों, आरेखों, कोड स्निपेट्स और अधिक के लिए उपयोगी है।
    ```html
        <figure>
        <img src="image.jpg" alt="Description of image">
        <figcaption>Image caption</figcaption>
        </figure>
    ```
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={3}
  group="उन्नत सिमैंटिक HTML"
  title="`<article>` का उपयोग"
  options={[
    {text: 'सामग्री, साइडबार और कॉपीराइट जानकारी के लिए'},
    {text: 'एक स्वतंत्र सामग्री अनुभाग', isAnswer: true},
    {text: '<newsletter> का हिस्सा'},
    {text: 'एक समाचार लेख को परिभाषित करता है'},
  ]}
>
  <slot name="question">
  <div className="question">
    HTML में `<article>` तत्व का उद्देश्य क्या है?
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    The [`<article>` तत्व](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/article) का उपयोग एक स्वतंत्र सामग्री टुकड़े को परिभाषित करने के लिए किया जाता है जिसे स्वतंत्र रूप से वितरित या पुन: उपयोग किया जा सकता है।

    इसका उपयोग अक्सर ब्लॉग पोस्ट, समाचार लेख, फोरम पोस्ट या उपयोगकर्ता टिप्पणियों के लिए किया जाता है।

    आप एक पेज पर कई articles का उपयोग कर सकते हैं (उदाहरण के लिए, अनंत स्क्रॉलिंग पेजों के लिए)। या, आप उन्हें एक-दूसरे के अंदर नेस्ट करके 'स्वतंत्र सामग्री' का एक पदानुक्रम बना सकते हैं।
    ```html
        <article>
        <h2>Article Title</h2>
        <p>Article content...</p>
        <article class="discussion">
        <h3>Comment by User</h3>
        <p>Comment content...</p>
        </article>
        </article>
    ```
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={4}
  group="उन्नत सिमैंटिक HTML"
  title="`<fieldset>` और `<legend>` का उपयोग"
  options={[
    {text: 'फॉर्म तत्वों को एक शीर्षक के अंतर्गत समूहित करना', isAnswer: true},
    {text: 'फॉर्म फ़ील्ड के लिए निर्देश परिभाषित करना'},
    {text: '<legend> का वैध उपयोग नहीं'},
    {text: 'विस्तार योग्य अनुभाग परिभाषित करता है'},
  ]}
>
  <slot name="question">
  <div className="question">
    फॉर्म में `<fieldset>` और `<legend>` तत्वों का उद्देश्य क्या है?
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    [`<fieldset>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/fieldset) का उपयोग संबंधित फॉर्म नियंत्रणों को समूहित करने के लिए किया जाता है, और `<legend>` समूह के लिए एक शीर्षक/लेबल प्रदान करता है, जिससे पहुँच में सुधार होता है।

    यह संबंधित फॉर्म तत्वों को समूहित करने के लिए उपयोगी है, जैसे शिपिंग पता या भुगतान विवरण के लिए एक अनुभाग।
    ```html
        <fieldset>
        <legend>Shipping Address</legend>
        <label for="name">Name:</label>
        <input type="text" id="name" name="name">
        ...
        </fieldset>
        <fieldset>
        <legend>Payment Details</legend>
        <label for="card">Card Number:</label>
        <input type="text" id="card" name="card">
        ...
        </fieldset>
    ```
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={5}
  group="उन्नत सिमैंटिक HTML"
  title="`<meter>` का उद्देश्य"
  options={[
    {text: 'मीट्रिक इकाइयों में एक प्रगति पट्टी'},
    {text: 'एक सीमा के भीतर एक संख्यात्मक मान दर्शाना', isAnswer: true},
    {text: 'दूरी को मीटर में बदलता है'},
    {text: 'विशेष प्रदर्शन से संबंधित टैग'},
  ]}
>
  <slot name="question">
  <div className="question">
    `<meter>` एलिमेंट का उद्देश्य क्या है?
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    The [`<meter>` element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/meter) is used to represent a scalar (single) measurement within a set range, such as temperature, disk usage or a vote tally.

    It may seem similar to a [`<progress>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/progress) bar, however progress bars **ALWAYS** start at zero. Therefore `<progress>` elements show a `percent of completion`, while a `<meter>` shows any value within a definable range.
    ```html
        <meter min="-60" max="130" value="75" /> 75°F
        <meter min="0" max="100" value="75" /> 75%
    ```
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={6}
  group="उन्नत सिमैंटिक HTML"
  title="`<source>` का उपयोग"
  options={[
    {text: 'डेटा स्रोत को परिभाषित करने के लिए उपयोग किया जाता है'},
    {text: 'उपलब्ध मीडिया फ़ाइल प्रारूप(ों) की घोषणा करें', isAnswer: true},
    {text: 'APA या MLA प्रारूप में स्रोतों का हवाला दें'},
    {text: 'स्रोत कोड ब्लॉक को परिभाषित करें'},
  ]}
>
  <slot name="question">
  <div className="question">
    `<source>` एलिमेंट का उपयोग क्यों किया जाता है?
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    [`<source>` एलिमेंट का उपयोग उपलब्ध मीडिया प्रारूपों को निर्दिष्ट करने के लिए किया जाता है](https://developer.mozilla.org/en-us/docs/web/html/element/source)।

    विशेष रूप से [`<video>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/video), [`<audio>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/audio), और [`<picture>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/picture) एलिमेंट के साथ उपयोग किया जाता है, जिससे ब्राउज़र सबसे उपयुक्त प्रारूप चुन सके।
    ```html
        <video controls>
        <source src="movie.mp4" type="video/mp4">
        <source src="movie.ogg" type="video/ogg">
        </video>
    ```
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={7}
  group="उन्नत सिमैंटिक HTML"
  title="`<hgroup>` का उपयोग"
  options={[
    {text: 'पुराना एलिमेंट, अब उपयोग में नहीं है'},
    {text: 'शीर्षकों को एक साथ समूहित करने के लिए'},
    {text: 'सामग्री तालिका परिभाषित करना'},
    {text: 'एक शीर्षक को उसके उपशीर्षक के साथ समूहित करना', isAnswer: true},
  ]}
>
  <slot name="question">
  <div className="question">
    आपको `<hgroup>` एलिमेंट का उपयोग कैसे करना चाहिए?
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    The [`<hgroup>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/hgroup) एलिमेंट एक शीर्षक को संबंधित द्वितीयक सामग्री के साथ समूहित करता है, आमतौर पर एक या अधिक `<p>` एलिमेंट।

    यह तब उपयोगी हो सकता है जब किसी शीर्षक में उपशीर्षक, टैगलाइन, या वैकल्पिक शीर्षक हो जो दस्तावेज़ की रूपरेखा में एक और शीर्षक नहीं बनना चाहिए।
    ```html
        <article>
        <hgroup>
        <h1>Frankenstein</h1>
        <p>Or: The Modern Prometheus</p>
        </hgroup>
        <section>
        <h2>Chapter 1</h2>
        <p>...</p>
        </section>
        </article>
    ```
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={8}
  group="उन्नत सिमैंटिक HTML"
  title="<menu> का उपयोग"
  options={[
    {text: 'एक क्रमबद्ध सूची परिभाषित करने के लिए'},
    {text: 'कमांड या टूलबार नियंत्रणों की सूची बनाने के लिए', isAnswer: true},
    {text: 'नेविगेशन बार को प्रदर्शित करने के लिए'},
    {text: 'बटन समूह को परिभाषित करने के लिए'},
  ]}
>
  <slot name="question">
  <div className="question">
    HTML में `<menu>` एलिमेंट का उपयोग किसके लिए किया जाता है?
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    [`<menu>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/menu) कमांड या इंटरैक्टिव नियंत्रणों की एक सूची को दर्शाता है।

    यदि आपकी सूची नेविगेशन लिंक है, तो `<nav>` का उपयोग `<ul>` के साथ करें। टूलबार जैसे नियंत्रणों या कमांड सूचियों के लिए `<menu>` का उपयोग करें।
    ```html
        <menu>
        <li><button type="button">Copy</button></li>
        <li><button type="button">Paste</button></li>
        </menu>
    ```
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={9}
  group="उन्नत सिमैंटिक HTML"
  title="`<details>` और `<summary>` की भूमिका"
  options={[
    {text: 'मूल संक्षिप्त सामग्री', isAnswer: true},
    {text: 'मूल टूलटिप्स'},
    {text: '<section> में संदर्भ जोड़ना'},
    {text: 'संरचित डेटा प्रदर्शित करने के लिए'},
  ]}
>
  <slot name="question">
  <div className="question">
    HTML में `<details>` और `<summary>` की क्या भूमिका है?
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    [`<details>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/details) संक्षिप्त सामग्री की अनुमति देता है, और [`<summary>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/summary) सामग्री के लिए एक दृश्य शीर्षक निर्दिष्ट करता है।

    यह FAQ, संक्षिप्त अनुभागों, या किसी भी ऐसी सामग्री के लिए उपयोगी है जिसे टॉगल किया जा सकता है।
    ```html
        <details>
        <summary>Click to expand 🤯</summary>
        <p>Hidden content! 💥</p>
        </details>
    ```
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={10}
  group="उन्नत सिमैंटिक HTML"
  title="`<dialog>` का उद्देश्य"
  options={[
    {text: 'स्क्रीनराइटर्स के लिए फ़ॉर्मेट'},
    {text: 'मॉडल या पॉपअप घोषित करना', isAnswer: true},
    {text: 'ChatGPT-शैली चैट चर्चा घोषित करना'},
    {text: '`<wizard>` के पक्ष में हटा दिया गया'},
  ]}
>
  <slot name="question">
  <div className="question">
    आपको `<dialog>` एलिमेंट का उपयोग क्यों करना चाहिए?
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    `<dialog>` एलिमेंट पॉप-अप या मॉडल के लिए उपयोग किया जाता है, और यह इन इंटरैक्शन के लिए सिमैंटिक मार्कअप, विस्तारित CSS, और एक नेटिव API प्रदान करता है।

    मॉडल डायलॉग के लिए `.showModal()` या गैर-मॉडल डायलॉग के लिए `.show()` के साथ इसे खोलने के लिए JavaScript का उपयोग करें, और इसे `.close()` या `method="dialog"` का उपयोग करके फॉर्म सबमिशन के साथ बंद करें।
    ```html
        <dialog>
        <h2>Modal Title</h2>
        <p>Modal content...</p>
        <button>Close</button>
        </dialog>
    ```
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={11}
  group="उन्नत सिमैंटिक HTML"
  title="`<time>` का उपयोग"
  options={[
    {text: 'तारीख और समय को दर्शाने के लिए', isAnswer: true},
    {text: 'टाइमस्टैम्प परिभाषित करने के लिए'},
    {text: 'केवल तारीखों को फॉर्मेट करने के लिए'},
    {text: 'डेट इनपुट को ड्रैग करने योग्य बनाने के लिए'},
  ]}
>
  <slot name="question">
  <div className="question">
    HTML में `<time>` एलिमेंट का उपयोग कैसे किया जाता है?
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    `<time>` एलिमेंट तारीखों, समयों या अवधियों के लिए उपयोग किया जाता है। इसमें मानव-पठनीय सामग्री और मशीन-पठनीय `datetime` विशेषता शामिल हो सकती है। HTML में `<date>` एलिमेंट नहीं है।
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={12}
  group="उन्नत सिमैंटिक HTML"
  title="ARIA विशेषताओं का उद्देश्य"
  options={[
    {text: 'टच उपकरणों के लिए सहायक'},
    {text: 'पहुंच में सुधार', isAnswer: true},
    {text: 'ध्वनि और प्लेबैक नियंत्रित करें'},
    {text: 'केवल <div> का उपयोग करने के लिए\'},
  ]}
>
  <slot name="question">
  <div className="question">
    ARIA विशेषताओं का उद्देश्य क्या है?
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    ARIA (Accessible Rich Internet Applications) विशेषताएँ स्क्रीन रीडर और अन्य सहायक प्रौद्योगिकियों के लिए अतिरिक्त संदर्भ प्रदान करके वेब पहुंच को बढ़ाती हैं।

    तत्वों का वर्णन करने के लिए भूमिकाएँ, अवस्थाएँ और गुण होते हैं जिनका उपयोग किया जा सकता है।
    ```html
        <button aria-label="Close" aria-expanded="true">X</button>
        <main aria-live="polite">...</main>
        <dialog
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="dialog_label"
        aria-describedby="dialog_desc"
        ></dialog>
    ```
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={13}
  group="उन्नत सिमैंटिक HTML"
  title="`role` विशेषता का उपयोग"
  options={[
    {text: 'घटक व्यवहार को परिभाषित करने के लिए'},
    {text: 'तत्व के उद्देश्य का वर्णन करने के लिए', isAnswer: true},
    {text: 'तत्वों तक पहुंच को प्रतिबंधित करना'},
    {text: 'केवल वेब कंपोनेंट्स के लिए'},
  ]}
>
  <slot name="question">
  <div className="question">
    HTML में `role` विशेषता का उपयोग क्या है?
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    `role` विशेषता सहायक तकनीकों को

    तत्व के उद्देश्य का वर्णन करती है, जिससे पहुंच में सुधार होता है।
  </div>
  </slot>
</Challenge>

</QuizUI>

तो, आपने कैसा प्रदर्शन किया? अपने अगले प्रोजेक्ट में और अधिक सिमैंटिक HTML एलिमेंट्स का उपयोग करने के लिए उत्साहित हैं? 🚀

या, जीवन भर `<div>` और `<span>` से ही काम चलाने को तैयार हैं? 😅

नीचे टिप्पणियों में मुझे बताएं! 👇
````
