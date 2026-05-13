# Translation Candidate
- Slug: quiz-data-structures-algorithms
- Locale: hi
- Model: openrouter/qwen/qwen3-32b:nitro
- Target: src/content/posts/2024-10-31--quiz-data-structures-algorithms/hi/index.mdx
- Validation: rejected: direct AI SDK translation failed
- Runtime seconds: 145.47
- Input tokens: 14438
- Output tokens: 25735
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- Estimated cost: $0.007331
- Pricing source: local-openrouter-estimate
- Note: Command failed: git add src/content/posts/2024-10-31--quiz-data-structures-algorithms/hi/index.mdx reports/i18n/quiz-data-structures-algorithms/hi
## Raw Output

````mdx
---
title: ''
subTitle: ''
label: Algorithms & DS
unlisted: true
date: '2024-10-31'
modified: '2024-11-08'
social_image: ../desktop-social.webp
category: Quiz
subCategory: Data Structures
tags:
  - quiz
  - data-structures
  - algorithms
  - intermediate
  - advanced
cover: ../redcharlie-mugDbuNnbd0-unsplash-square.webp
cover_full_width: ../redcharlie-mugDbuNnbd0-unsplash-wide.webp
cover_mobile: ../redcharlie-mugDbuNnbd0-unsplash-square.webp
cover_icon: ../redcharlie-mugDbuNnbd0-unsplash-square.webp
---
```jsx
import Challenge from '../../../../../components/QuizUI/Challenge';
import QuizUI from '../../../../../components/QuizUI/QuizUI';

<section class="inset">
  मेरे डेटा संरचनाओं और एल्गोरिदम क्विज़ में स्वागत है!
</section>

यह क्विज़ आपके डेटा संरचनाओं (स्टैक, सूचियाँ, पेड़, आदि), एल्गोरिदम, और समय जटिलता के ज्ञान का परीक्षण करेगा।

### 20 प्रश्न... शुरू करें!
```

<QuizUI>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={0}
  group="डेटा संरचनाएँ"
  title="स्टैक्स बनाम कताई"
  options={[
    {text: 'दोनों'},
    {text: 'कताई'},
    {text: 'स्टैक्स', isAnswer: true},
    {text: 'कोई नहीं'},
  ]}
>
  <slot name="question">
  <div className="question">
    एलआईएफओ (अंतिम प्रवेश, पहला बाहर) एक्सेस पैटर्न के लिए कौन सी डेटा संरचना सबसे उपयुक्त है?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    स्टैक एलआईएफओ एक्सेस पैटर्न के लिए सबसे उपयुक्त होते हैं। कताई एफआईएफओ (पहले प्रवेश, पहला बाहर) एक्सेस पैटर्न के लिए सबसे उपयुक्त होते हैं।
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={1}
  group="एल्गोरिदम"
  title="बिग ओ नोटेशन"
  options={[
    {text: 'O(1)', isAnswer: true},
    {text: 'O(n)'},
    {text: 'O(log n)'},
    {text: 'O(n^2)'},
  ]}
>
  <slot name="question">
  <div className="question">
    एक एल्गोरिदम की समय जटिलता क्या होती है जो हमेशा चलने में समान समय लेता है, इनपुट आकार के आकार के बावजूद?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    O(1) स्थिर समय जटिलता का प्रतिनिधित्व करता है। इसका अर्थ है कि एल्गोरिदम हमेशा चलने में समान समय लेता है, इनपुट आकार के आकार के बावजूद।
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={2}
  group="डेटा संरचनाएँ"
  title="लिंक्ड सूची की लंबाई की गणना"
  options={[
    {text: 'O(1)'},
    {text: 'O(log n)'},
    {text: 'O(n^2)'},
    {text: 'O(n)', isAnswer: true},
    {text: 'O(n log n)'},
  ]}
>
  <slot name="question">
  <div className="question">
    एकल लिंक्ड सूची की लंबाई की गणना करने के लिए समय जटिलता क्या है?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    एकल लिंक्ड सूची की लंबाई की गणना करने के लिए, आपको प्रत्येक नोड को हेड से टेल तक तय करना होगा, जिससे O(n) समय जटिलता होती है।
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={3}
  group="डेटा संरचनाएँ"
  title="बाइनरी सर्च ट्री में खोज की औसत समय जटिलता"
  options={[
    {text: 'O(1)'},
    {text: 'O(log n)', isAnswer: true},
    {text: 'O(n)'},
    {text: 'O(n^2)'},
    {text: 'O(n log n)'},
  ]}
>
  <slot name="question">
  <div className="question">
    एक संतुलित बाइनरी सर्च ट्री में तत्व की खोज के लिए औसत समय जटिलता क्या है?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    एक संतुलित BST में, खोज के लिए औसत समय जटिलता O(log n) होती है क्योंकि प्रत्येक स्तर खोज अंतराल को आधा करने की अनुमति देता है।
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={4}
  group="सॉर्टिंग एल्गोरिदम"
  title="मर्ज सॉर्ट की समय जटिलता"
  options={[
    {text: 'O(n^2)'},
    {text: 'O(log n)'},
    {text: 'O(n log n)', isAnswer: true},
    {text: 'O(n)'},
    {text: 'O(1)'},
  ]}
>
  <slot name="question">
  <div className="question">
    मर्ज सॉर्ट एल्गोरिदम की सबसे खराब मामले में समय जटिलता क्या है?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    मर्ज सॉर्ट हमेशा सबसे खराब मामले में O(n log n) की जटिलता के साथ काम करता है क्योंकि यह लगातार सरणी को आधा करता है और लगातार विलय करता है।
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={5}
  group="ग्राफ़्स"
  title="DFS बनाम BFS"
  options={[
    {text: 'क्यू (Queue)', isAnswer: true},
    {text: 'स्टैक (Stack)'},
    {text: 'प्राथमिकता क्यू (Priority Queue)'},
    {text: 'हैश मैप (Hash Map)'},
    {text: 'सेट (Set)'},
  ]}
>
  <slot name="question">
  <div className="question">
    ब्रॉडथ-फर्स्ट सर्च (BFS) को लागू करने के लिए आमतौर पर कौन-सी डेटा संरचना का उपयोग किया जाता है?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    BFS एक क्यू का उपयोग करता है जो स्तर-दर-स्तर नोड्स को एक्सप्लोर करता है, ब्रॉडथ-फर्स्ट तरीके से नोड्स को प्रोसेस करके ("रो" के आधार पर)।
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={6}
  group="ग्राफ"
  title="ग्राफ में साइकिल पहचान"
  options={[
    {text: 'क्विक सॉर्ट'},
    {text: 'ब्रैड-फर्स्ट सर्च'},
    {text: 'मर्ज सॉर्ट'},
    {text: 'डेप्थ-फर्स्ट सर्च', isAnswer: true},
    {text: 'बुबल सॉर्ट'},
  ]}
>
  <slot name="question">
  <div className="question">
    एक डायरेक्टेड ग्राफ में साइकिल पहचाने के लिए कौन सा एल्गोरिथ्म आमतौर पर उपयोग किया जाता है?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    डेप्थ-फर्स्ट सर्च (DFS) आमतौर पर एक ग्राफ में साइकिल पहचाने के लिए उपयोग किया जाता है, जिसमें एक रिकर्सन स्टैक का उपयोग करके विजिटेड नोड्स की ट्रैकिंग की जाती है।
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={7}
  group="सॉर्टिंग एल्गोरिदम"
  title="हीप सॉर्ट की समय जटिलता"
  options={[
    {text: 'O(n^2)'},
    {text: 'O(n log n)', isAnswer: true},
    {text: 'O(n)'},
    {text: 'O(log n)'},
    {text: 'O(1)'},
  ]}
>
  <slot name="question">
  <div className="question">
    हीप सॉर्ट की सबसे खराब मामले में समय जटिलता क्या है?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    हीप सॉर्ट O(n log n) की सबसे खराब मामले की समय जटिलता बनाए रखता है, क्योंकि यह एक हीप बनाता है और बार-बार अधिकतम तत्व को निकालता है।
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={8}
  group="डेटा संरचनाएँ"
  title="हैश टेबल समय जटिलता"
  options={[
    {text: 'O(n)'},
    {text: 'O(log n)'},
    {text: 'O(1)', isAnswer: true},
    {text: 'O(n^2)'},
    {text: 'O(n log n)'},
  ]}
>
  <slot name="question">
  <div className="question">
    हैश टेबल में एक तत्व तक पहुंचने के लिए औसत समय जटिलता क्या है?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    हैश टेबल में तत्वों तक पहुंचने की औसत समय जटिलता O(1) होती है, धारणा लगाते हुए कि एक अच्छा हैश फ़ंक्शन है जो टकराव को न्यूनतम करता है।
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={9}
  group="डेटा संरचनाएँ"
  title="स्टैक ऑपरेशन्स"
  options={[
    {text: 'Push, Pop, Peek', isAnswer: true},
    {text: 'Enqueue, Dequeue, Peek'},
    {text: 'Insert, Search, Delete'},
    {text: 'Traverse, Visit, Sort'},
  ]}
>
  <slot name="question">
  <div className="question">
    कौन सा सेट स्टैक पर किए जाने वाले आम ऑपरेशन्स को शामिल करता है?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    एक स्टैक के मुख्य ऑपरेशन्स Push (तत्व जोड़ें), Pop (तत्व हटाएं), और Peek (शीर्ष तत्व देखें बिना हटाए) होते हैं।
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={10}
  group="ग्राफ एल्गोरिथ्म"
  title="लघुतम पथ एल्गोरिथ्म"
  options={[
    {text: 'क्रुस्कल का एल्गोरिथम'},
    {text: 'प्रिम का एल्गोरिथम'},
    {text: 'बेलमैन-फोर्ड एल्गोरिथम'},
    {text: 'डिज्कस्ट्रा का एल्गोरिथम', isAnswer: true},
    {text: 'फ्लॉयड-वॉरशॉल एल्गोरिथम'},
  ]}
>
  <slot name="question">
  <div className="question">
    ऋणात्मक नहीं होने वाले किनारों वाले भारित ग्राफ में लघुतम पथ खोजने के लिए कौन-सा एल्गोरिथम अक्सर उपयोग किया जाता है?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    डिज्कस्ट्रा का एल्गोरिथम ऋणात्मक नहीं होने वाले किनारा भारों वाले ग्राफ में लघुतम पथ खोजने के लिए अक्सर उपयोग किया जाता है। यह एक उच्चतम अनुक्रम कतार का उपयोग करता है ताकि लघुतम दूरी कुशलता से निर्धारित की जा सके।
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={11}
  group="वृक्ष डेटा संरचनाएँ"
  title="स्व-संतुलित खोज वृक्ष"
  options={[
    {text: 'बाइनरी खोज वृक्ष और मिन हीप'},
    {text: 'एएवीएल वृक्ष और रेड-ब्लैक वृक्ष', isAnswer: true},
    {text: 'मिन हीप और मैक्स हीप'},
    {text: 'स्टैक और कताई'},
  ]}
>
  <slot name="question">
  <div className="question">
    कौन सा सेट स्व-संतुलित बाइनरी खोज वृक्ष डेटा संरचनाओं के उदाहरण शामिल करता है?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    एएवीएल वृक्ष और रेड-ब्लैक वृक्ष स्व-संतुलित वृक्षों के प्रकार हैं, जो प्रत्येक इन्सर्शन या डिलीशन के बाद वृक्ष के संतुलित रहने की गारंटी देते हैं।
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={12}
  group="पुनरावृत्ति"
  title="पुनरावृत्ति केस (बेस केस)"
  options={[
    {text: 'अनंत लूप'},
    {text: 'स्टैक ओवरफ्लो'},
    {text: 'बेस केस', isAnswer: true},
    {text: 'ग्लोबल वेरिएबल'},
    {text: 'स्कोप सीमा'},
  ]}
>
  <slot name="question">
  <div className="question">
    एक पुनरावृत्तिक फंक्शन में क्या परिभाषित करना आवश्यक है अनंत पुनरावृत्ति को रोकने के लिए?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    एक पुनरावृत्तिक फंक्शन में बेस केस आवश्यक है जब एक विशिष्ट शर्त पूरी हो जाती है तो पुनरावृत्तिक कॉल्स को रोकने के लिए, अनंत पुनरावृत्ति को रोकते हुए।
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={13}
  group="डेटा संरचनाएं"
  title="कतार कार्यों"
  options={[
    {text: 'Enqueue (एक तत्व को पीछे जोड़ें) और Dequeue (आगे से एक तत्व हटाएं)', isAnswer: true, hint: 'कतार के लिए मुख्य कार्य हैं'},
    {text: 'Push और Pop (एक स्टैक के लिए कार्य)', hint: 'ये स्टैक के लिए होते हैं'},
    {text: 'Peek (सामने वाला तत्व देखें) और Top (एक स्टैक के शीर्ष को देखें)', hint: 'ये स्टैक या अन्य संरचनाओं के लिए उपयोग होते हैं'},
    {text: 'Traverse और Sort (कतार के लिए मुख्य कार्य नहीं हैं)', hint: 'ये सामान्य संरचनाओं के लिए अधिक उपयुक्त हैं'},
  ]}
>
  <slot name="question">
  <div className="question">
    एक कतार के लिए दो मुख्य कार्य क्या हैं?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    एक कतार में दो मुख्य कार्य होते हैं: Enqueue (एक तत्व को पीछे जोड़ें) और Dequeue (आगे से एक तत्व हटाएं)।
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={14}
  group="ग्राफ एल्गोरिदम"
  title="टॉपोलॉजिकल सॉर्टिंग"
  options={[
    {text: 'ग्राफ में चक्र होने चाहिए', hint: 'टॉपोलॉजिकल सॉर्टिंग चक्र वाले ग्राफ पर संभव नहीं है।'},
    {text: 'ग्राफ भारित और जुड़ा हुआ होना चाहिए', hint: 'भार या संपूर्णता टॉपोलॉजिकल सॉर्टिंग के लिए आवश्यक नहीं है।'},
    {text: 'ग्राफ अनिर्देशित और चक्ररहित होना चाहिए', hint: 'टॉपोलॉजिकल सॉर्टिंग के लिए दिशा आवश्यक है।'},
    {text: 'ग्राफ निर्देशित और चक्ररहित होना चाहिए', isAnswer: true, hint: 'यह सही शर्त है - टॉपोलॉजिकल सॉर्टिंग केवल DAG पर काम करता है।'},
  ]}
>
  <slot name="question">
  <div className="question">
    किसी ग्राफ पर टॉपोलॉजिकल सॉर्टिंग करने के लिए क्या शर्तें हैं?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    टॉपोलॉजिकल सॉर्टिंग किसी ग्राफ पर केवल तभी किया जा सकता है जब यह निर्देशित और चक्ररहित (DAG) हो। ऐसा क्रम अनुसूचीकरण समस्याओं में उपयोगी होता है।
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={15}
  group="डाइनेमिक प्रोग्रामिंग"
  title="फिबोनैकि पुनरावृत्ति जटिलता"
  options={[
    {text: 'O(1)'},
    {text: 'O(2^n)', isAnswer: true},
    {text: 'O(n)'},
    {text: 'O(log n)'},
    {text: 'O(n^2)'},
  ]}
>
  <slot name="question">
  <div className="question">
    फिबोनैकि श्रृंखला के एक नाइव पुनरावृत्तिमूलक कार्यान्वयन की समय जटिलता क्या है?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    फिबोनैकि श्रृंखला के नाइव पुनरावृत्तिमूलक कार्यान्वयन में समय जटिलता O(2^n) होती है क्योंकि प्रत्येक फिबोनैकि संख्या के लिए बार-बार गणना की जाती है।
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={16}
  group="डेटा संरचनाएँ"
  title="प्राथमिकता कतार के निर्माण"
  options={[
    {text: 'Array'},
    {text: 'Stack'},
    {text: 'Heap', isAnswer: true},
    {text: 'Queue'},
    {text: 'Linked List'},
  ]}
>
  <slot name="question">
  <div className="question">
    कौन सी डेटा संरचना आमतौर पर एक प्राथमिकता कतार को लागू करने के लिए उपयोग की जाती है?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    एक प्राथमिकता कतार को अक्सर एक हीप का उपयोग करके लागू किया जाता है क्योंकि यह सबसे उच्च या न्यूनतम प्राथमिकता वाले तत्व को कुशलता से निकालने की अनुमति देता है।
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={17}
  group="डेटा संरचनाएँ"
  title="बाइनरी ट्री ट्रैवर्सल"
  options={[
    {text: 'इन-ऑर्डर, प्री-ऑर्डर, पोस्ट-ऑर्डर', isAnswer: true},
    {text: 'ब्रैडथ-फर्स्ट, डेप्थ-फर्स्ट, हीपिफाई'},
    {text: 'सॉर्ट, सर्च, रोटेट'},
    {text: 'पुश, पॉप, पीक'},
  ]}
>
  <slot name="question">
  <div className="question">
    एक बाइनरी ट्री के लिए सामान्य डेप्थ-फर्स्ट ट्रैवर्सल क्रमों को सूचीबद्ध करने वाला कौन सा सेट है?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    इन-ऑर्डर, प्री-ऑर्डर और पोस्ट-ऑर्डर बाइनरी ट्री के लिए तीन सामान्य डेप्थ-फर्स्ट ट्रैवर्सल क्रम हैं, प्रत्येक नोड के दौरे के क्रम में अलग होते हैं। ब्रैडथ-फर्स्ट ट्रैवर्सल भी सामान्य है, लेकिन यह एक अलग ट्रैवर्सल श्रेणी है।
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={18}
  group="वृक्ष डेटा संरचनाएँ"
  title="हीप गुणधर्म"
  options={[
    {text: 'सभी नोड्स बाएँ से दाएँ क्रमबद्ध होते हैं'},
    {text: 'मूल नोड हमेशा सबसे बड़ा तत्व होता है'},
    {text: 'सभी पत्तियाँ एक ही स्तर पर होती हैं'},
    {text: 'मूल नोड सबसे छोटा तत्व होता है और ऊँचाई O(log n) होती है', isAnswer: true},
  ]}
>
  <slot name="question">
  <div className="question">
    निम्नलिखित में से कौन-सा गुणधर्म मिन-हीप के लिए सत्य है?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    एक मिन-हीप में, मूल नोड हमेशा सबसे छोटा तत्व होता है और वृक्ष की ऊँचाई O(log n) होती है, जोकि इन्सर्शन और एग्जैक्शन को कुशल बनाता है।
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={19}
  group="सॉर्टिंग एल्गोरिदम"
  title="बुबल सॉर्ट की स्थिरता"
  options={[
    {text: 'अस्थिर'},
    {text: 'स्थिर', isAnswer: true},
    {text: 'कार्यान्वयन पर निर्भर करता है'},
    {text: 'न तो एक न दूसरा'},
    {text: 'जटिलता स्थिरता निर्धारित करती है'},
  ]}
>
  <slot name="question">
  <div className="question">
    क्या बुबल सॉर्ट एल्गोरिदम स्थिर है?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    बुबल सॉर्ट एक स्थिर सॉर्टिंग एल्गोरिदम है क्योंकि यह सॉर्टिंग के दौरान समान तत्वों के सापेक्ष क्रम को बरकरार रखता है।
  </div>
  </slot>
</Challenge>

</QuizUI>
````
