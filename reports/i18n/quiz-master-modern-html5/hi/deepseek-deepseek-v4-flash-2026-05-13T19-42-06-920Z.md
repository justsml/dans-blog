# Translation Candidate
- Slug: quiz-master-modern-html5
- Locale: hi
- Model: deepseek/deepseek-v4-flash
- Target: src/content/posts/2024-11-01--quiz-master-modern-html5/hi/index.mdx
- Validation: deferred
- Runtime seconds: 166.63
- Input tokens: 11393
- Output tokens: 19198
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- Estimated cost: $0.006970
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
unlisted: false
title: 'क्विज़: क्या HTML अब भी आपके बायोडाटा में शामिल होना चाहिए?'
subTitle: खुद को साबित करो
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

आखिरकार, आप अपने `<div>` को `<span>` से अलग पहचानते हैं, है ना? लेकिन HTML5 के अधिक उन्नत, सिमैंटिक एलिमेंट्स को आप कितनी अच्छी तरह जानते हैं?

> नोट: यदि आप यह परीक्षा पास नहीं कर सकते, तो आपको कानूनी रूप से अपने रिज़्यूमे से `HTML Skills` हटाना होगा।

### शुरू करें!

<QuizUI>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={0}
  group="वार्म-अप"
  title=""
  options={[
  ]}
>
  <slot name="question">
  <div className="question">
    HTML में `<ul>` एलिमेंट की प्राथमिक भूमिका क्या है?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    `<ul>` टैग एक अनऑर्डर्ड लिस्ट बनाता है, जिसमें आइटम आमतौर पर बुलेट्स से चिह्नित होते हैं।
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={1}
  group="उन्नत सिमैंटिक HTML"
  title=""
  options={[
  ]}
>
  <slot name="question">
  <div className="question">
    HTML में `<dd>` एलिमेंट क्या दर्शाता है?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    [`<dd>` एलिमेंट](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dd) एक विवरण सूची में विवरण, परिभाषा या मान को परिभाषित करता है, जिसका उपयोग `<dl>` टैग के अंदर `<dt>` (_विवरण शब्द_) के साथ जोड़ी बनाने के लिए किया जाता है।

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
  title=""
  options={[
  ]}
>
  <slot name="question">
  <div className="question">
    `<figure>` और `<figcaption>` एलिमेंट्स का उपयोग कब करना चाहिए?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    `<figure>` टैग का उपयोग आमतौर पर स्व-निहित (मीडिया) सामग्री, जैसे कि एक छवि या चार्ट, को लपेटने के लिए किया जाता है, साथ ही [`<figcaption>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/figcaption) का उपयोग कैप्शन प्रदान करने के लिए किया जाता है।

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
    [`<article>` तत्व](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/article) का उपयोग एक स्वतंत्र सामग्री को परिभाषित करने के लिए किया जाता है जिसे स्वतंत्र रूप से वितरित या पुन: उपयोग किया जा सकता है।

    इसका उपयोग अक्सर ब्लॉग पोस्ट, समाचार लेख, फोरम पोस्ट या उपयोगकर्ता टिप्पणियों के लिए किया जाता है।

    आप एक पेज पर कई articles का उपयोग कर सकते हैं (उदाहरण के लिए, अनंत स्क्रॉलिंग पेजों के लिए)। या, आप उन्हें एक-दूसरे के अंदर नेस्ट करके "स्वतंत्र सामग्री" का एक पदानुक्रम बना सकते हैं।
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
  title=""
  options={[
  ]}
>
  <slot name="question">
  <div className="question">
    फॉर्म में `<fieldset>` और `<legend>` एलिमेंट का उद्देश्य क्या है?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    [`<fieldset>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/fieldset) का उपयोग संबंधित फॉर्म नियंत्रणों को समूहित करने के लिए किया जाता है, और `<legend>` समूह के लिए एक शीर्षक/लेबल प्रदान करता है, जिससे पहुँच में सुधार होता है।

    यह संबंधित फॉर्म एलिमेंट्स को समूहित करने के लिए उपयोगी है, जैसे शिपिंग पता या भुगतान विवरण के लिए एक अनुभाग।
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
  title=""
  options={[
  ]}
>
  <slot name="question">
  <div className="question">
    `<meter>` एलिमेंट का उद्देश्य क्या है?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    [`<meter>` एलिमेंट](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/meter) का उपयोग एक निर्धारित सीमा के भीतर एक अदिश (एकल) माप को दर्शाने के लिए किया जाता है, जैसे तापमान, डिस्क उपयोग या वोट गणना।

    यह [`<progress>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/progress) बार के समान लग सकता है, लेकिन प्रोग्रेस बार **हमेशा** शून्य से शुरू होते हैं। इसलिए `<progress>` एलिमेंट `percent of completion` दिखाते हैं, जबकि `<meter>` एक परिभाषित सीमा के भीतर कोई भी मान दिखाता है।
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
  group="सिमैंटिक HTML"
  title=""
  options={[
  ]}
>
  <slot name="question">
  <div className="question">
    `<source>` तत्व का उपयोग क्यों किया जाता है?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    [`<source>` तत्व का उपयोग उपलब्ध मीडिया प्रारूपों को निर्दिष्ट करने के लिए किया जाता है](https://developer.mozilla.org/en-us/docs/web/html/element/source).

    विशेष रूप से [`<video>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/video), [`<audio>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/audio), और [`<picture>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/picture) तत्वों के साथ उपयोग किया जाता है, जिससे ब्राउज़र सबसे उपयुक्त प्रारूप चुन सके।
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
  title=""
  options={[
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
  title=""
  options={[
  ]}
>
  <slot name="question">
  <div className="question">
    HTML में `<menu>` एलिमेंट का उपयोग किसके लिए किया जाता है?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    [`<menu>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/menu) कमांड्स या इंटरैक्टिव कंट्रोल्स की एक सूची को दर्शाता है।

    यदि आपकी सूची नेविगेशन लिंक्स की है, तो `<ul>` के साथ `<nav>` का उपयोग करें। टूलबार जैसे कंट्रोल्स या कमांड लिस्ट के लिए `<menu>` का उपयोग करें।
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
  title=""
  options={[
  ]}
>
  <slot name="question">
  <div className="question">
    HTML में `<details>` और `<summary>` की क्या भूमिका है?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    [`<details>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/details) संक्षिप्त करने योग्य सामग्री की अनुमति देता है, और [`<summary>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/summary) सामग्री के लिए एक दृश्य शीर्षक निर्दिष्ट करता है।

    यह FAQ, संक्षिप्त करने योग्य अनुभागों, या किसी भी ऐसी सामग्री के लिए उपयोगी है जिसे टॉगल किया जा सकता है।
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
  title=""
  options={[
  ]}
>
  <slot name="question">
  <div className="question">
    आपको `<dialog>` एलिमेंट का उपयोग क्यों करना चाहिए?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    The [`<dialog>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dialog) एलिमेंट का उपयोग पॉप-अप या मॉडल के लिए किया जाता है, और यह इन इंटरैक्शन के लिए सिमैंटिक मार्कअप, विस्तारित CSS और एक नेटिव API प्रदान करता है।

    इसे खोलने के लिए JavaScript का उपयोग करें: मॉडल डायलॉग के लिए `.showModal()` या नॉन-मॉडल डायलॉग के लिए `.show()` का उपयोग करें, और इसे `.close()` या `method="dialog"` का उपयोग करके फॉर्म सबमिशन के माध्यम से बंद करें।
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
  title=""
  options={[
  ]}
>
  <slot name="question">
  <div className="question">
    HTML में `<time>` एलिमेंट का उपयोग कैसे किया जाता है?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    `<time>` एलिमेंट का उपयोग तिथियों, समयों या अवधियों के लिए किया जाता है। इसमें मानव-पठनीय सामग्री और मशीन-पठनीय `datetime` विशेषता शामिल हो सकती है। HTML में कोई `<date>` एलिमेंट नहीं है।
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={12}
  group="उन्नत सिमैंटिक HTML"
  title="ARIA विशेषताओं का उद्देश्य"
  options={[
  ]}
>
  <slot name="question">
  <div className="question">
    ARIA विशेषताओं का उद्देश्य क्या है?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    ARIA (Accessible Rich Internet Applications) विशेषताएँ वेब पहुँच को बढ़ाती हैं, स्क्रीन रीडर और अन्य सहायक तकनीकों के लिए अतिरिक्त संदर्भ प्रदान करके।

    ऐसे रोल, स्थितियाँ और गुण हैं जिनका उपयोग तत्वों का वर्णन करने के लिए किया जा सकता है।
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
    {text: 'कंपोनेंट व्यवहार को परिभाषित करने के लिए'},
    {text: 'एलिमेंट के उद्देश्य का वर्णन करने के लिए', isAnswer: true},
    {text: 'एलिमेंट तक पहुंच को प्रतिबंधित करना'},
    {text: 'केवल वेब कंपोनेंट के लिए'},
  ]}
>
  <slot name="question">
  <div className="question">
    HTML में `role` विशेषता का उपयोग क्या है?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    `role` विशेषता सहायक तकनीकों को एलिमेंट के उद्देश्य का वर्णन करती है,

    जिससे पहुंच में सुधार होता है।
  </div>
  </slot>
</Challenge>

</QuizUI>

तो, आपका प्रदर्शन कैसा रहा? अपने अगले प्रोजेक्ट में और अधिक सिमैंटिक HTML एलिमेंट्स का उपयोग करने के लिए उत्साहित हैं? 🚀

या, जीवन भर `<div>` और `<span>` से ही काम चलाने का फैसला किया? 😅

नीचे कमेंट में बताएं! 👇
````
