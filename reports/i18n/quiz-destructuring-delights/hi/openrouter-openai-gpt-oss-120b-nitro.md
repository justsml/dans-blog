# Translation Candidate
- Slug: quiz-destructuring-delights
- Locale: hi
- Model: openrouter/openai/gpt-oss-120b:nitro
- Target: src/content/posts/2024-11-12--quiz-destructuring-delights/hi/index.mdx
- Validation: deferred
- Runtime seconds: 10.26
- Input tokens: 11749
- Output tokens: 9289
- Thinking tokens: unknown
- Cached input tokens: 4480
- Cache write tokens: 0
- Estimated cost: $0.002130
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
unlisted: false
title: 'क्विज़: डीस्ट्रक्चरिंग का आनंद'
subTitle: क्या आप डीस्ट्रक्चरिंग में माहिर हैं?
label: Destructuring
social_image: ../desktop-social.webp
category: Quiz
subCategory: JavaScript
date: '2024-11-12'
modified: '2024-11-16'
tags:
  - quiz
  - intro
  - javascript
  - es2015
  - destructuring
  - beginner
  - intermediate
cover_full_width: ../boxes-of-nesting-dolls.webp
cover_mobile: ../boxes-of-nesting-dolls-square.webp
cover_icon: ../boxes-of-nesting-dolls-square.webp
---
import Challenge from '../../../../../components/QuizUI/Challenge';
import QuizUI from '../../../../../components/QuizUI/QuizUI';

{/* Are you a maestero of Destructuring?<br/> */}
<p class="inset">या यह आपका <em>विनाश का सिम्फनी</em> है?</p>

यह क्विज़ जावास्क्रिप्ट में डेस्ट्रक्चरिंग की आपकी समझ का परीक्षण करेगा: “बेसिक” ऑब्जेक्ट सिंटैक्स से लेकर नेस्टेड डेस्ट्रक्चरिंग और डिफ़ॉल्ट वैल्यूज़ तक। साथ ही टाइपस्क्रिप्ट और इनलाइन टाइप्स पर बोनस प्रश्न भी शामिल हैं!

सीधे वार्म‑अप पर जाएँ – अपनी डेस्ट्रक्चरिंग कौशल साबित करें! 👇

<QuizUI>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={0}
  group="वार्मअप: ऑब्जेक्ट्स"
  title="बेसिक ऑब्जेक्ट डिस्ट्रक्चरिंग"
  options={[
    {text: 'नाम: Dan Levy, आयु: 20'},
    {text: 'नाम: Dan Levy, आयु: 40'},
    {text: 'नाम: Dan Levy, आयु: Infinity'},
    {text: 'नाम: Dan Levy, आयु: undefined', isAnswer: true},
    {text: 'त्रुटि: Cannot read property \'age\''},
    {text: 'नाम: undefined, आयु: 40'},
  ]}
>
  <slot name="question">
  <div className="question">
    इस कोड का आउटपुट क्या होगा?
    ```js
        const person = {
          name: 'Dan Levy',
          location: 'Cape Town',
        };
        const { name, age } = person;
        console.log(`Name: ${name}, Age: ${age}`);
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    `age` प्रॉपर्टी `person` में मौजूद नहीं है, इसलिए `age` `undefined` रहेगा। निश्चित रूप से `Infinity` नहीं 😅

    इसका परिणाम है:
    ```plaintext
        Name: Dan Levy, Age: undefined
    ```
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={1}
  group="वार्मअप: एरेज़"
  title="ऑब्जेक्ट डीस्ट्रक्चरिंग में डिफ़ॉल्ट वैल्यू"
  options={[
    {text: 'नाम: Dan Levy, आयु: NaN'},
    {text: 'नाम: Dan Levy, आयु: null'},
    {text: 'नाम: Dan Levy, आयु: undefined', isAnswer: true},
    {text: 'नाम: Dan Levy, आयु: 40'},
    {text: 'त्रुटि: प्रॉपर्टी \'age\' को डीस्ट्रक्चर नहीं किया जा सकता'},
    {text: 'SyntaxError: अप्रत्याशित टोकन \',\''},
  ]}
>
  <slot name="question">
  <div className="question">
    यह कोड क्या करेगा?
    ```js
        const person = [ 'Dan Levy', 'Cape Town' ];
        const [ name, origin, age ] = person;
        console.log(`Name: ${name}, Age: ${age}`);
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    `age` वेरिएबल `tuple` एरे में मौजूद नहीं है, इसलिए यह `undefined` होगा।

    इसका परिणाम है:
    ```plaintext
        Name: Dan Levy, Age: undefined
    ```
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={2}
  group="नेस्टेड डीस्ट्रक्चरिंग"
  title="नेस्टेड डीस्ट्रक्चरिंग"
  options={[
    {text: 'पहला: Dan, शहर: Denver'},
    {text: 'पहला: undefined, शहर: Denver'},
    {text: 'त्रुटि: Cannot read property \'first\''},
    {text: 'पहला: Dan, शहर: undefined'},
    {text: 'त्रुटि', isAnswer: true},
  ]}
>
  <slot name="question">
  <div className="question">
    नेस्टेड डीस्ट्रक्चरिंग के बारे में क्या ख्याल है?
    ```js
        'use strict';
        const person = {
          name: { first: 'Dan' },
          address: { city: 'Denver' },
        };
        const {
          name: { first },
          address: { city },
          birth: { place },
        } = person;
        console.log(
          `First: ${first}, City: ${place}`,
        );
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    `birth: { place }` प्रॉपर्टी `person` पर मौजूद नहीं है, इसलिए यह त्रुटि फेंकेगा।
    एक समाधान है नेस्टेड प्रॉपर्टीज़ के लिए डिफ़ॉल्ट मान प्रदान करना।

    नेस्टेड प्रॉपर्टीज़ तक पहुँचते समय सावधान रहें—त्रुटियाँ पकड़ना मुश्किल हो सकता है। और त्रुटि संदेश ब्राउज़र और प्लेटफ़ॉर्म के अनुसार बदलते हैं, जिससे डिबग करना थोड़ा कठिन हो जाता है।

    आधुनिक Chrome में: `TypeError: Cannot read properties of undefined (reading 'place')`

    Node में भी यह `TypeError` है क्योंकि JavaScript `place` को `undefined` से डीस्ट्रक्चर करने की कोशिश करता है, इससे पहले कि `place` पढ़ा जाए।

    सटीक शब्दावली ब्राउज़र और रनटाइम के अनुसार बदलती है।
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={3}
  group="डिफ़ॉल्ट्स"
  title="ऑब्जेक्ट डीस्ट्रक्चरिंग में डिफ़ॉल्ट मान"
  options={[
    {text: 'हाय डैन अनजान से'},
    {text: 'हाय डैन डेनवर से'},
    {text: 'हाय अनजान अनजान से'},
    {text: 'हाय अनजान डेनवर से'},
    {text: 'त्रुटि', isAnswer: true},
  ]}
>
  <slot name="question">
  <div className="question">
    अब कुछ डिफ़ॉल्ट्स के साथ, यह क्या करेगा?
    ```js
        'use strict';
        const person = {
          name: { first: 'Dan' },
          address: { city: 'Denver' },
        };
        const {
          name: { first = 'Unknown' },
          birth: { place = 'Unknown' },
        } = person;
        console.log(
          `Hi ${first} from ${place}`,
        );
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    `birth` प्रॉपर्टी `person` पर मौजूद नहीं है, इसलिए पूरी ऑब्जेक्ट को डिफ़ॉल्ट चाहिए, सिर्फ नेस्टेड प्रॉपर्टी को नहीं। मूल रूप से यहाँ ` = {}` डिफ़ॉल्ट गायब है।

    जैसा लिखा है, इसका मतलब है "यदि `person.birth` `undefined` है, तो `place` `Unknown` होगा"। लेकिन `person.birth` `undefined` है, इसलिए यह `undefined` को डीस्ट्रक्चर करने की कोशिश कर रहा है, जिससे त्रुटि आती है।
    ```plaintext
        In modern Chrome: `TypeError: Cannot read properties of undefined (reading 'place')`

        In Node, this is also a `TypeError` because JavaScript tries to destructure `place` from `undefined`.

        Exact wording varies between browsers and runtimes.
    ```
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={4}
  group="डिफ़ॉल्ट्स"
  title="ऑब्जेक्ट डीस्ट्रक्चरिंग में डिफ़ॉल्ट मान"
  options={[
    {text: 'हाय डैन डेनवर से'},
    {text: 'हाय डैन जोहानेसबर्ग से'},
    {text: 'हाय डैन अनजान से', isAnswer: true},
    {text: 'हाय अनजान अनजान से'},
    {text: 'हाय अनजान डेनवर से'},
    {text: 'त्रुटि'},
  ]}
>
  <slot name="question">
  <div className="question">
    यह क्या करेगा?
    ```js
        const person = {
          name: { first: 'Dan' },
          address: { city: 'Denver' },
        };
        const {
          name: { first = 'Unknown' },
          birth: { place = 'Unknown' } = {},
        } = person;

        console.log(
          `Hi ${first} from ${place}`,
        );
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    `birth` प्रॉपर्टी `person` में मौजूद नहीं है, इसलिए यह खाली ऑब्जेक्ट ` = {}` पर फॉल्ट करता है। इससे डिफ़ॉल्ट मान उपयोग में आता है।
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={5}
  group="फ़ंक्शन आर्ग्युमेंट्स"
  title="डिफ़ॉल्ट्स के साथ फ़ंक्शन पैरामीटर का डीस्ट्रक्चरिंग"
  options={[
    {text: 'हाय डैन से undefined'},
    {text: 'हाय डैन से Unknown'},
    {text: 'हाय डैन से Denver'},
    {text: 'हाय Unknown से Unknown'},
    {text: 'हाय Unknown से Denver'},
    {text: 'Error', isAnswer: true},
  ]}
>
  <slot name="question">
  <div className="question">
    अब फ़ंक्शन पैरामीटर के रूप में, यह क्या करेगा?
    ```js
        'use strict';
        function displayUser({
          name = "Unknown",
          age = -1,
        } = { place: "Unknown" }) {
          console.log(`Hi ${name} from ${place}`);
        }
        displayUser({ name: "Dan" });
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    यह फ़ंक्शन `name` और `age` प्रॉपर्टीज़ को निकालता है, आवश्यक होने पर डिफ़ॉल्ट्स का उपयोग करता है। इस मामले में, डिफ़ॉल्ट ऑब्जेक्ट पर `place` कुंजी सिर्फ शोर है, यह `displayUser()` के अंदर उपयोग नहीं होती।

    स्ट्रिक्ट मोड इसको नहीं बदलता: अनडिक्लेयर्ड `place` बाइंडिंग को पढ़ने से `ReferenceError` फेंकता है।
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={6}
  group="फ़ंक्शन आर्ग्यूमेंट्स"
  title="नेस्टेड डिफ़ॉल्ट मानों के साथ डीस्ट्रक्चरिंग"
  options={[
    {text: 'अज्ञात, अज्ञात, Joburg'},
    {text: 'अज्ञात, अज्ञात, अज्ञात'},
    {text: 'अज्ञात, `undefined`, Joburg'},
    {text: 'लागू नहीं, `undefined`, Joburg'},
    {text: 'लागू नहीं, अज्ञात, Joburg'},
    {text: 'लागू नहीं, लागू नहीं, Joburg', isAnswer: true},
    {text: 'अज्ञात, लागू नहीं, Joburg'},
    {text: 'त्रुटि'},
  ]}
>
  <slot name="question">
  <div className="question">
    `undefined` मानों को कैसे संभाला जाता है?
    ```js
        'use strict';
        function displayPlace({
          name = "N/A",
          place = "N/A",
          age = -1,
        } = { place: "Unknown" }) {
          console.log(`${place}`);
        }
        displayPlace({ name: "Dan" });
        displayPlace({ name: "Dan", place: undefined });
        displayPlace({ name: "Dan", place: "Joburg" });
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    `displayPlace` फ़ंक्शन केवल तब ही डिफ़ॉल्ट ऑब्जेक्ट का उपयोग करेगा जब कोई ऑब्जेक्ट पास नहीं किया गया हो। इसलिए `{ place: "Unknown" }` डिफ़ॉल्ट प्राप्त करने का एक ही तरीका है जब आप शून्य आर्ग्यूमेंट्स के साथ `displayPlace()` कॉल करते हैं।

    यहाँ एक और उल्लेखनीय व्यवहार यह है कि `place` के लिए `undefined` पास करने पर डिफ़ॉल्ट मान इस्तेमाल होगा, जो `JSON.stringify` के व्यवहार जैसा है (`undefined` को अनदेखा करता है, `null` को पहचानता है)।

    इसका परिणाम है:
    ```js
        displayPlace() // Unknown
        displayPlace({ name: "Dan" }) // N/A
        displayPlace({ name: "Dan", place: undefined }) // N/A
    ```
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={7}
  group="फ़ंक्शन आर्ग्यूमेंट्स"
  title="नेस्टेड डिफ़ॉल्ट मानों के साथ डीस्ट्रक्चरिंग"
  options={[
    {text: 'N/A, N/A'},
    {text: 'N/A, undefined'},
    {text: 'अज्ञात, N/A'},
    {text: 'अज्ञात, अज्ञात'},
    {text: 'अज्ञात, undefined'},
    {text: 'null, N/A', isAnswer: true},
    {text: 'null, अज्ञात'},
    {text: 'null, undefined'},
    {text: 'त्रुटि'},
  ]}
>
  <slot name="question">
  <div className="question">
    पिछले वाले जैसा... `null` को कैसे संभालते हैं?_
    ```js
        function displayPlace({
          name = "N/A",
          place = "N/A",
          age = -1,
        } = { place: "Unknown" }) {
          console.log(`${place}`);
        }
        displayPlace({ name: "Dan", place: null });
        displayPlace({ name: "Dan", place: undefined });
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    इस केस में, पहली कॉल में `place` प्रॉपर्टी `null` पर सेट होती है, और दूसरी में `undefined`। `place` के लिए डिफ़ॉल्ट मान केवल तब उपयोग होता है जब पूरा ऑब्जेक्ट गायब **या** `undefined` हो। `null` मान 그대로 `null` रहेगा।
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={8}
  group="टाइपस्क्रिप्ट इनलाइन टाइप्स"
  title="नेस्टेड डिफ़ॉल्ट मानों के साथ डीस्ट्रक्चरिंग"
  options={[
    {text: 'N/A'},
    {text: 'undefined'},
    {text: 'Unknown'},
    {text: '\'null\''},
    {text: 'TypeScript Error', isAnswer: true},
  ]}
>
  <slot name="question">
  <div className="question">
    अब टाइपस्क्रिप्ट में... _यह क्या करेगा?_
    ```ts
        'use strict';
        function displayPlace(
          {
            name = 'N/A',
            place = 'N/A',
          }: {
            name: string;
            place: string;
            age: number;
          },
        ) {
          console.log(`${place}`);
        }
        displayPlace({ name: 'Dan', place: null });
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    टाइपस्क्रिप्ट एक त्रुटि रिपोर्ट करता है क्योंकि `place` को `string` के रूप में टाइप किया गया है, लेकिन कॉल `null` पास करता है। कॉल आवश्यक `age` प्रॉपर्टी को भी छोड़ देता है।

    यदि आप टाइप त्रुटियों को अनदेखा करते हैं, तो कोड चलाने पर कंसोल में `null` प्रिंट होगा।
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={9}
  group="TypeScript: असाइनमेंट के साथ"
  title="नेस्टेड डिफॉल्ट मानों के साथ डीस्ट्रक्चरिंग"
  options={[
    {text: 'अपरिभाषित'},
    {text: 'शून्य'},
    {text: 'लागू नहीं'},
    {text: 'अज्ञात'},
    {text: 'Denver', isAnswer: true},
    {text: 'SyntaxError'},
    {text: 'Error: अमान्य प्रकार'},
    {text: 'Error: अमान्य तर्क'},
  ]}
>
  <slot name="question">
  <div className="question">
    चलो कुछ रीनेमिंग/असाइनमेंट आज़माते हैं...
    ```ts
        'use strict';
        function displayPlace({
          name = 'N/A',
          place: location = 'N/A',
        }: {
          name: string;
          place: string;
          age?: number;
        }) {
          console.log(`${location}`);
        }
        displayPlace({ name: 'Dan', place: 'Denver' });
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    यह कंसोल में `Denver` प्रिंट करेगा। फ़ंक्शन सिग्नेचर में `place` प्रॉपर्टी को `location` में रीनेम किया गया है। यह एक सामान्य पैटर्न है (डिस्ट्रक्चरिंग के दौरान प्रॉपर्टी का नाम बदलना) जब आप थर्ड‑पार्टी डेटा स्ट्रक्चर को अनुकूलित कर रहे हों।
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={10}
  group="TS में नेस्टेड डीस्ट्रक्चरिंग"
  title="नेस्टेड डिफॉल्ट वैल्यूज़ के साथ डीस्ट्रक्चरिंग"
  options={[
    {text: 'त्रुटि: प्रॉपर्टी \'first\' गायब है'},
    {text: 'त्रुटि: प्रॉपर्टी \'last\' गायब है'},
    {text: 'त्रुटि: प्रॉपर्टी \'birth\' और \'age\' गायब हैं', isAnswer: true},
    {text: 'त्रुटि: प्रॉपर्टी \'place\' गायब है'},
    {text: 'त्रुटि: \'string\' में {...} में कोई प्रॉपर्टी नहीं है'},
  ]}
>
  <slot name="question">
  <div className="question">
    टाइप एरर को खोजें:
    ```ts
        function greet({
          name: {first = "N/A", last = "N/A"},
          birth: {place = "N/A"} = {},
          age = -1,
        }: {
          name: {first?: string, last?: string};
          birth: {place?: string};
          age: number;
        }) {
          console.log(`Hi ${first} ${last} from ${place}`);
        }
        greet({ name: {first: 'Dan'} });
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    त्रुटि `greet` फ़ंक्शन सिग्नेचर में है। पास किए गए ऑब्जेक्ट में `age` और `birth` प्रॉपर्टी गायब हैं, इसलिए उन्हें टाइप डिफ़िनिशन में वैकल्पिक होना चाहिए।

    हालांकि `birth` प्रॉपर्टी डिफॉल्ट वैल्यू के साथ डीस्ट्रक्चर की गई है, टाइप डिफ़िनिशन इसे मौजूद होने की आवश्यकता रखता है। TypeScript में प्रॉपर्टी को वैकल्पिक बनाने के लिए आपको `?` ऑपरेटर का उपयोग करना चाहिए।

    ध्यान दें कि `birth?: { place?: string }` वही नहीं है जो `birth: { place?: string } | undefined`।
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={11}
  group="टाइपस्क्रिप्ट + असाइनमेंट"
  title="नेस्टेड मानों के साथ डीस्ट्रक्चरिंग, असाइनमेंट और टाइप्स"
  options={[
    {text: 'नमस्ते Dan Levy से N/A'},
    {text: 'नमस्ते Dan Levy से Cape Town'},
    {text: 'नमस्ते N/A N/A से N/A'},
    {text: 'नमस्ते N/A N/A से Cape Town'},
    {text: 'त्रुटि', isAnswer: true},
  ]}
>
  <slot name="question">
  <div className="question">
    अब **असाइनमेंट** के साथ (ध्यान दें `f`, `l` और `p` वेरिएबल्स)
    ```ts
        'use strict';
        function greet(
          {
            name: {first: f = "N/A", last: l = "N/A"},
            birth: {place: p = "N/A"} = {},
            age = -1,
          }: {
            name: {first?: string, last?: string};
            birth?: {place?: string};
            age?: number;
          }
        ) {
          console.log(`Hi ${f} ${l} from ${place}`);
          // What will 👆 do?
        }
        greet({
          name: {first: 'Dan', last: 'Levy'},
          birth: {place: 'Cape Town'},
        });
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    एक और त्रुटि! आप अनुमान लगाना शुरू कर रहे हैं, है ना?!

    डीस्ट्रक्चरिंग की कई परतों को पढ़ना कठिन है, जिसमें डिफॉल्ट, असाइनमेंट और टाइप्स शामिल हैं!

    जैसे ही `place` को `p` वेरिएबल को पुनः असाइन किया जाता है, वह `console.log` स्टेटमेंट के स्कोप में अब परिभाषित नहीं रहता।
    ```ts
        console.log(`Hi ${f} ${l} from ${place}`); // ❌
        // to:
        console.log(`Hi ${f} ${l} from ${p}`); // ✅
    ```
  </div>
  </slot>
</Challenge>

</QuizUI>
````
