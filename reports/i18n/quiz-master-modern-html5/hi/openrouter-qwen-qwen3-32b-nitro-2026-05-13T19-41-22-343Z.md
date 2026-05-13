# Translation Candidate
- Slug: quiz-master-modern-html5
- Locale: hi
- Model: openrouter/qwen/qwen3-32b:nitro
- Target: src/content/posts/2024-11-01--quiz-master-modern-html5/hi/index.mdx
- Validation: deferred
- Runtime seconds: 217.63
- Input tokens: 11633
- Output tokens: 15284
- Thinking tokens: unknown
- Cached input tokens: 512
- Cache write tokens: 0
- Estimated cost: $0.004599
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
unlisted: false
title: 'प्रश्नोत्तरी: अभी भी आपके रिज्यूम में HTML शामिल होना चाहिए?'
subTitle: अपने आप को साबित करें!
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
```mdx
import Challenge from '../../../../components/QuizUI/Challenge';
import QuizUI from '../../../../components/QuizUI/QuizUI';


## तो, आपको लगता है कि आपके पास HTML5 कौशल हैं?

अंत में, आप अपने `<div>` और `<span>` के बारे में जानते हैं, ठीक है? लेकिन आपको HTML5 में अधिक उन्नत, सेमांटिक एलिमेंट कितना अच्छी तरह जानते हैं?

> नोट: यदि आप इस परीक्षा को पास नहीं कर सकते हैं, तो आपको अपने रिज्यूमे से `HTML कौशल` हटाने की आवश्यकता होगी।

### शुरू करें!
```

<QuizUI>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={0}
  group="तैयारी"
  title=""
  options={[
  ]}
>
  <slot name="question">
  <div className="question">
    HTML में `<ul>` तत्व का मुख्य भूमिका क्या है?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    `<ul>` टैग एक अनुक्रमित सूची बनाता है, जिसमें आइटम आमतौर पर बुलेट द्वारा चिह्नित होते हैं।
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={1}
  group="उन्नत सेमांटिक HTML"
  title="HTML में `<dd>` एलिमेंट किसका प्रतिनिधित्व करता है?"
  options={[
  ]}
>
  <slot name="question">
  <div className="question">
    HTML में `<dd>` एलिमेंट किसका प्रतिनिधित्व करता है?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    HTML में [`<dd>` एलिमेंट](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dd) एक विवरण, परिभाषा या मान को एक विवरण सूची में परिभाषित करता है, जो `<dl>` टैग के भीतर `<dt>` (_विवरण पद) के साथ जोड़ा जाता है।

    यह कुंजी-मान डेटा दिखाने के लिए उपयोगी होता है। प्रोफ़ाइल जानकारी, सेटिंग्स और स्टैट्स इसके आम उदाहरण हैं।
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
  group="उन्नत सेमेंटिक HTML"
  title=""
  options={[
  ]}
>
  <slot name="question">
  <div className="question">
    कब `<figure>` और `<figcaption>` तत्वों का उपयोग करना चाहिए?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    HTML में [`<figure>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/figure) टैग आमतौर पर स्व-निहित (मीडिया) सामग्री को लपेटने के लिए होता है, जैसे एक चित्र या चार्ट, और [`<figcaption>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/figcaption) को एक उपस्पष्टीकरण प्रदान करने के लिए।

    यह चित्रों, आरेखों, कोड अंशों आदि के लिए उपयोगी होता है।
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
  group="उन्नत सेमेंटिक HTML"
  title=""
  options={[
  ]}
>
  <slot name="question">
  <div className="question">
    HTML में `<article>` तत्व का उद्देश्य क्या है?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    HTML में [`<article>` तत्व](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/article) का उपयोग स्वतंत्र रूप से वितरित या पुन: उपयोग किया जा सके ऐसे सामग्री को परिभाषित करने के लिए किया जाता है।

    इसका उपयोग ब्लॉग पोस्ट, खबरों, फोरम पोस्ट या उपयोगकर्ता कमेंट में किया जाता है।

    एक पेज पर कई आर्टिकल (अनंत रूप से स्क्रॉल करने वाले पेज के उदाहरण में) या एक-दूसरे के भीतर नेस्ट किए जा सकते हैं ताकि "स्वतंत्र सामग्री" के अंतर्गत एक पदानुक्रम बनाया जा सके।
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
  group="उन्नत सेमांटिक HTML"
  title=""
  options={[
  ]}
>
  <slot name="question">
  <div className="question">
    फॉर्म में `<fieldset>` और `<legend>` तत्वों का उद्देश्य क्या है?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    [`<fieldset>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/fieldset) का उपयोग संबंधित फॉर्म नियंत्रणों के समूह के लिए किया जाता है, और `<legend>` समूह के लिए एक शीर्षक/लेबल प्रदान करता है, जो उपलब्धता को सुधारता है।

    यह फॉर्म तत्वों के संबंधित सेक्शन के लिए समूहीकरण के लिए उपयोगी है, जैसे शिपिंग पता या भुगतान विवरण के लिए।
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
  group="उन्नत सेमांटिक HTML"
  title="HTML5 के `<meter>` तत्व का उद्देश्य क्या है?"
  options={[
  ]}
>
  <slot name="question">
  <div className="question">
    HTML5 के `<meter>` तत्व का उद्देश्य क्या है?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    तत्व [`<meter>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/meter) का उपयोग एकल (एकल) माप को एक निश्चित रेंज के भीतर प्रदरशित करने के लिए किया जाता है, जैसे तापमान, डिस्क उपयोग या वोट की संख्या।

    यह [`<progress>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/progress) बार के समान प्रतीत हो सकता है, हालांकि प्रगति बार **हमेशा** शून्य से शुरू होते हैं। इसलिए `<progress>` तत्व पूर्णता का प्रतिशत दिखाते हैं, जबकि `<meter>` एक परिभाषित रेंज के भीतर कोई भी मान दिखाता है।
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
  group="सेमांटिक HTML"
  title=""
  options={[
  ]}
>
  <slot name="question">
  <div className="question">
    क्या `<source>` तत्व का उपयोग क्यों किया जाता है?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    तत्व का उपयोग उपलब्ध मीडिया प्रारूपों को निर्दिष्ट करने के लिए किया जाता है।

    विशेष रूप से [`<video>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/video), [`<audio>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/audio), और [`<picture>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/picture) तत्वों के साथ उपयोग किया जाता है, जिससे ब्राउज़र सबसे उपयुक्त प्रारूप का चयन कर सकता है।
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
  group="उन्नत सेमांटिक HTML"
  title=""
  options={[
  ]}
>
  <slot name="question">
  <div className="question">
    आप `<hgroup>` तत्व का उपयोग कैसे करना चाहिए?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    तत्व [`<hgroup>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/hgroup) एक हेडिंग के साथ संबंधित द्वितीयक सामग्री के समूह को समूह करता है, आमतौर पर एक या अधिक `<p>` तत्व।

    यह तब उपयोगी हो सकता है जब एक हेडिंग में उपशीर्षक, टैगलाइन, या वैकल्पिक शीर्षक हो जो दस्तावेज़ के प्रारूप में एक अन्य हेडिंग बन जाएगा नहीं।
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
  group="उन्नत सेमांटिक HTML"
  title=""
  options={[
  ]}
>
  <slot name="question">
  <div className="question">
    HTML में `<menu>` एलिमेंट का उपयोग क्या है?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    HTML में [`<menu>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/menu) एलिमेंट कमांड या इंटरैक्टिव नियंत्रणों की सूची को दर्शाता है।

    अगर आपकी सूची नेविगेशन लिंक है, तो `<nav>` के साथ `<ul>` का उपयोग करें। `<menu>` का उपयोग टूलबार-जैसे नियंत्रणों या कमांड सूचियों के लिए करें।
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
  group="उन्नत सेमांटिक HTML"
  title=""
  options={[
  ]}
>
  <slot name="question">
  <div className="question">
    HTML में `<details>` और `<summary>` की भूमिका क्या है?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    [`<details>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/details) प्रसारित करने योग्य सामग्री की अनुमति देता है, और [`<summary>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/summary) सामग्री के लिए दृश्य शीर्षक निर्दिष्ट करता है।

    यह एफएक्यू, प्रसारित करने योग्य अनुभागों या किसी भी बदले जा सके वाले सामग्री के लिए उपयोगी है।
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
  group="उन्नत सेमांटिक HTML"
  title=""
  options={[
  ]}
>
  <slot name="question">
  <div className="question">
    एक `<dialog>` तत्व का उपयोग क्यों करना चाहिए?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    तत्व [`<dialog>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dialog) का उपयोग पॉप-अप या मॉडल के लिए किया जाता है, और इसमें सेमांटिक मार्कअप, विस्तारित CSS, और इन अंतरक्रियाओं के लिए निवेशी API होता है।

    जावास्क्रिप्ट का उपयोग करके इसे `.showModal()` से मॉडल डायलॉग के लिए या `.show()` से गैर-मॉडल डायलॉग के लिए खोलें, और इसे `.close()` या `method="dialog"` के साथ एक फॉर्म जमा करके बंद करें।
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
  group="उन्नत सेमांटिक HTML"
  title=""
  options={[
  ]}
>
  <slot name="question">
  <div className="question">
    HTML में `<time>` तत्व का उपयोग कैसे किया जाता है?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    `<time>` तत्व तारीखों, समय या अवधि के लिए उपयोग किया जाता है। यह मानव-पाठ्य उत्पाद और एक मशीन-पाठ्य `datetime` गुण के साथ हो सकता है। HTML में `<date>` तत्व नहीं होता है।
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={12}
  group="उन्नत सेमेंटिक HTML"
  title="ARIA गुणों का उद्देश्य क्या है?"
  options={[
  ]}
>
  <slot name="question">
  <div className="question">
    ARIA गुणों का उद्देश्य क्या है?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    ARIA (Accessible Rich Internet Applications) गुण वेब की उपलब्धता को बढ़ाते हैं द्वारा स्क्रीन रीडर और अन्य सहायक तकनीकों के लिए अतिरिक्त संदर्भ प्रदान करके।

    यहां भूमिकाएं, अवस्थाएं और गुण होते हैं जिनका उपयोग तत्वों का वर्णन करने के लिए किया जा सकता है।
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
  group="उन्नत सेमांटिक HTML"
  title="``role`` गुण का उपयोग"
  options={[
    {text: 'कंपोनेंट व्यवहार को परिभाषित करने के लिए'},
    {text: 'तत्व के उद्देश्य का वर्णन करने के लिए', isAnswer: true},
    {text: 'तत्वों के एक्सेस को सीमित करने के लिए'},
    {text: 'केवल वेब कंपोनेंट्स के लिए'},
  ]}
>
  <slot name="question">
  <div className="question">
    HTML में ``role`` गुण का उपयोग क्या है?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    ``role`` गुण अटैचमेंट तकनीकों के लिए तत्व के उद्देश्य का वर्णन करता है, जो उभरती उपलब्धता को सुधारता है।
  </div>
  </slot>
</Challenge>

</QuizUI>

तो, आप कैसे कर रहे हैं? अपने अगले परियोजना में अधिक अर्थपूर्ण HTML तत्वों का उपयोग करने में उत्सुक हैं? 🚀

या, `<div>` और `<span>` के साथ जीवन भर रहने के लिए तैयार हैं? 😅

टिप्पणियों में बताएं! 👇
````
