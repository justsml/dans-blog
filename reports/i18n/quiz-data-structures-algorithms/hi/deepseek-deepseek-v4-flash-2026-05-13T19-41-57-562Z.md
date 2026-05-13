# Translation Candidate
- Slug: quiz-data-structures-algorithms
- Locale: hi
- Model: deepseek/deepseek-v4-flash
- Target: src/content/posts/2024-10-31--quiz-data-structures-algorithms/hi/index.mdx
- Validation: deferred
- Runtime seconds: 342.88
- Input tokens: 14168
- Output tokens: 17619
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- Estimated cost: $0.006917
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
title: 'प्रश्नोत्तरी: डेटा संरचनाएं और एल्गोरिदम'
subTitle: क्या तुम बाइनरी ट्री पर बकवास कर सकते हो?
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
import Challenge from '../../../../components/QuizUI/Challenge';
import QuizUI from '../../../../components/QuizUI/QuizUI';

<section class="inset">
  मेरे डेटा संरचनाओं और एल्गोरिदम क्विज़ में आपका स्वागत है!
</section>

यह क्विज़ डेटा संरचनाओं (स्टैक, लिस्ट, ट्री, आदि), एल्गोरिदम (), और समय जटिलता के आपके ज्ञान का परीक्षण करेगा।

### 20 प्रश्न... शुरू करें!

<QuizUI>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={0}
  group="डेटा संरचनाएँ"
  title="स्टैक बनाम क्यू"
  options={[
    {text: 'दोनों'},
    {text: 'क्यू'},
    {text: 'स्टैक', isAnswer: true},
    {text: 'कोई नहीं'},
  ]}
>
  <slot name="question">
  <div className="question">
    LIFO (अंतिम में, पहले बाहर) एक्सेस पैटर्न के लिए कौन सी डेटा संरचना सबसे उपयुक्त है?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    स्टैक LIFO एक्सेस पैटर्न के लिए सबसे उपयुक्त हैं। क्यू FIFO (पहले में, पहले बाहर) एक्सेस पैटर्न के लिए सबसे उपयुक्त हैं।
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
    उस एल्गोरिदम की समय जटिलता क्या है जो इनपुट आकार की परवाह किए बिना चलने में हमेशा समान समय लेता है?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    O(1) स्थिर समय जटिलता को दर्शाता है। इसका मतलब है कि एल्गोरिदम इनपुट आकार की परवाह किए बिना चलने में हमेशा समान समय लेता है।
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={2}
  group="डेटा संरचनाएँ"
  title="लिंक्ड लिस्ट की लंबाई की गणना"
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
    एक सिंगली लिंक्ड लिस्ट की लंबाई की गणना करने की समय जटिलता क्या है?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    एक सिंगली लिंक्ड लिस्ट की लंबाई की गणना करने के लिए, आपको हेड से टेल तक हर नोड को ट्रैवर्स करना होगा, जिसके परिणामस्वरूप O(n) समय जटिलता होती है।
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={3}
  group="डेटा संरचनाएँ"
  title="बाइनरी सर्च ट्री लुकअप"
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
    एक संतुलित बाइनरी सर्च ट्री में किसी तत्व को खोजने की औसत समय जटिलता क्या है?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    एक संतुलित BST में, लुकअप की औसत समय जटिलता O(log n) होती है क्योंकि प्रत्येक स्तर पर खोज स्थान आधा हो जाता है।
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
    सबसे खराब स्थिति में मर्ज सॉर्ट एल्गोरिदम की समय जटिलता क्या है?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    मर्ज सॉर्ट हमेशा सबसे खराब स्थिति में O(n log n) की जटिलता के साथ काम करता है, क्योंकि यह बार-बार ऐरे को आधा विभाजित करता है और सॉर्ट किए गए उप-ऐरे को मर्ज करता है।
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={5}
  group="ग्राफ़"
  title="DFS बनाम BFS"
  options={[
    {text: 'क्यू', isAnswer: true},
    {text: 'स्टैक'},
    {text: 'प्राथमिकता क्यू'},
    {text: 'हैश मैप'},
    {text: 'सेट'},
  ]}
>
  <slot name="question">
  <div className="question">
    ब्रेड्थ-फर्स्ट सर्च (BFS) को लागू करने के लिए आमतौर पर किस डेटा संरचना का उपयोग किया जाता है?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    BFS नोड्स को स्तर दर स्तर खोजने के लिए क्यू का उपयोग करता है, नोड्स को ब्रेड्थ-फर्स्ट तरीके से (पंक्ति द्वारा) प्रोसेस करता है।
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={6}
  group="ग्राफ़"
  title="ग्राफ़ में चक्र का पता लगाना"
  options={[
    {text: 'क्विक सॉर्ट'},
    {text: 'चौड़ाई-प्रथम खोज'},
    {text: 'मर्ज सॉर्ट'},
    {text: 'गहराई-प्रथम खोज', isAnswer: true},
    {text: 'बबल सॉर्ट'},
  ]}
>
  <slot name="question">
  <div className="question">
    निर्देशित ग्राफ़ में चक्र का पता लगाने के लिए आमतौर पर किस एल्गोरिदम का उपयोग किया जाता है?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    गहराई-प्रथम खोज (DFS) का उपयोग आमतौर पर ग्राफ़ में चक्र का पता लगाने के लिए किया जाता है, जिसमें विज़िट किए गए नोड्स को ट्रैक करने के लिए एक रिकर्सन स्टैक बनाए रखा जाता है।
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
    सबसे खराब स्थिति में हीप सॉर्ट की समय जटिलता क्या है?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    हीप सॉर्ट सबसे खराब स्थिति में O(n log n) की समय जटिलता बनाए रखता है, क्योंकि यह एक हीप बनाता है और बार-बार अधिकतम तत्व निकालता है।
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={8}
  group="डेटा संरचनाएँ"
  title="हैश तालिका समय जटिलता"
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
    हैश तालिका में किसी तत्व तक पहुँचने की औसत समय जटिलता क्या है?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    हैश तालिकाओं में तत्वों तक पहुँचने की औसत समय जटिलता O(1) होती है, बशर्ते एक अच्छा हैश फलन हो जो टकराव को कम करता है।
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={9}
  group="डेटा संरचनाएँ"
  title="स्टैक संचालन"
  options={[
    {text: 'पुश, पॉप, पीक', isAnswer: true},
    {text: 'एनक्यू, डीक्यू, पीक'},
    {text: 'इन्सर्ट, सर्च, डिलीट'},
    {text: 'ट्रैवर्स, विज़िट, सॉर्ट'},
  ]}
>
  <slot name="question">
  <div className="question">
    कौन सा सेट स्टैक पर किए जाने वाले सामान्य संचालन को दर्शाता है?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    स्टैक के प्राथमिक संचालन पुश (तत्व जोड़ना), पॉप (तत्व हटाना), और पीक (शीर्ष तत्व को हटाए बिना देखना) हैं।
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={10}
  group="ग्राफ एल्गोरिदम"
  title="लघुतम पथ एल्गोरिथ्म"
  options={[
    {text: 'Kruskal\'s Algorithm'},
    {text: 'Prim\'s Algorithm'},
    {text: 'Bellman-Ford Algorithm'},
    {text: 'Dijkstra\'s Algorithm', isAnswer: true},
    {text: 'Floyd-Warshall Algorithm'},
  ]}
>
  <slot name="question">
  <div className="question">
    कौन सा एल्गोरिदम सामान्यतः गैर-ऋणात्मक भार वाले ग्राफ में लघुतम पथ खोजने के लिए उपयोग किया जाता है?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    डिज्क्स्ट्रा का एल्गोरिदम गैर-ऋणात्मक किनारे भार वाले ग्राफ में लघुतम पथ खोजने के लिए अक्सर उपयोग किया जाता है। यह कुशलतापूर्वक लघुतम दूरी निर्धारित करने के लिए प्राथमिकता कतार का उपयोग करता है।
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={11}
  group="वृक्ष डेटा संरचनाएँ"
  title="स्व-संतुलन खोज वृक्ष"
  options={[
    {text: 'बाइनरी सर्च ट्री और मिन हीप'},
    {text: 'AVL ट्री और रेड-ब्लैक ट्री', isAnswer: true},
    {text: 'मिन हीप और मैक्स हीप'},
    {text: 'स्टैक और क्यू'},
  ]}
>
  <slot name="question">
  <div className="question">
    किस सेट में स्व-संतुलन बाइनरी सर्च ट्री डेटा संरचनाओं के उदाहरण हैं?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    AVL ट्री और रेड-ब्लैक ट्री स्व-संतुलन वृक्षों के प्रकार हैं, जो यह सुनिश्चित करते हैं कि प्रत्येक सम्मिलन या विलोपन के बाद वृक्ष संतुलित रहे।
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={12}
  group="पुनरावृत्ति"
  title="पुनरावृत्ति का आधार मामला"
  options={[
    {text: 'अनंत लूप'},
    {text: 'स्टैक ओवरफ्लो'},
    {text: 'आधार मामला', isAnswer: true},
    {text: 'ग्लोबल वेरिएबल'},
    {text: 'स्कोप सीमा'},
  ]}
>
  <slot name="question">
  <div className="question">
    पुनरावृत्त फ़ंक्शन में अनंत पुनरावृत्ति को रोकने के लिए क्या परिभाषित होना चाहिए?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    पुनरावृत्त फ़ंक्शन में एक आधार मामला आवश्यक है ताकि जब कोई विशेष शर्त पूरी हो जाए तो पुनरावृत्त कॉल को रोका जा सके, जिससे अनंत पुनरावृत्ति को रोका जा सके।
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={13}
  group="डेटा संरचनाएँ"
  title="क्यू संचालन"
  options={[
    {text: 'Enqueue and Dequeue', isAnswer: true},
    {text: 'Push and Pop'},
    {text: 'Peek and Top'},
    {text: 'Traverse and Sort'},
  ]}
>
  <slot name="question">
  <div className="question">
    क्यू के दो प्रमुख संचालन क्या हैं?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    क्यू में दो प्रमुख संचालन हैं: Enqueue (पीछे से एक तत्व जोड़ना) और Dequeue (सामने से एक तत्व हटाना)।
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={14}
  group="ग्राफ एल्गोरिदम"
  title="टोपोलॉजिकल सॉर्टिंग"
  options={[
    {text: 'ग्राफ में चक्र होने चाहिए'},
    {text: 'ग्राफ भारित और जुड़ा होना चाहिए'},
    {text: 'ग्राफ अनिर्देशित और अचक्रीय होना चाहिए'},
    {text: 'ग्राफ निर्देशित और अचक्रीय होना चाहिए', isAnswer: true},
  ]}
>
  <slot name="question">
  <div className="question">
    ग्राफ पर टोपोलॉजिकल सॉर्टिंग करने के लिए क्या शर्तें हैं?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    टोपोलॉजिकल सॉर्टिंग एक ग्राफ पर तब की जा सकती है जब वह निर्देशित और अचक्रीय (DAG) हो। इस प्रकार का क्रम कार्य शेड्यूलिंग समस्याओं में उपयोगी होता है।
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={15}
  group="डायनामिक प्रोग्रामिंग"
  title="फाइबोनैचि पुनरावृत्ति जटिलता"
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
    फाइबोनैचि श्रृंखला के एक सामान्य पुनरावर्ती कार्यान्वयन की समय जटिलता क्या है?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    फाइबोनैचि श्रृंखला के सामान्य पुनरावर्ती कार्यान्वयन की समय जटिलता O(2^n) है, क्योंकि प्रत्येक फाइबोनैचि संख्या के लिए बार-बार गणनाएँ होती हैं।
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={16}
  group="डेटा संरचनाएँ"
  title="प्राथमिकता कतार कार्यान्वयन"
  options={[
    {text: 'सरणी'},
    {text: 'स्टैक'},
    {text: 'हीप', isAnswer: true},
    {text: 'कतार'},
    {text: 'लिंक्ड सूची'},
  ]}
>
  <slot name="question">
  <div className="question">
    प्राथमिकता कतार को लागू करने के लिए आमतौर पर किस डेटा संरचना का उपयोग किया जाता है?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    प्राथमिकता कतार को अक्सर हीप का उपयोग करके कार्यान्वित किया जाता है क्योंकि यह उच्चतम या निम्नतम प्राथमिकता वाले तत्व को कुशलतापूर्वक निकालने की अनुमति देता है।
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={17}
  group="डेटा संरचनाएँ"
  title="बाइनरी ट्री ट्रैवर्सल्स"
  options={[
    {text: 'इन-ऑर्डर, प्री-ऑर्डर, पोस्ट-ऑर्डर', isAnswer: true},
    {text: 'ब्रेड्थ-फर्स्ट, डेप्थ-फर्स्ट, हीपिफाई'},
    {text: 'सॉर्ट, सर्च, रोटेट'},
    {text: 'पुश, पॉप, पीक'},
  ]}
>
  <slot name="question">
  <div className="question">
    कौन सा सेट बाइनरी ट्री के सामान्य डेप्थ-फर्स्ट ट्रैवर्सल ऑर्डर को सूचीबद्ध करता है?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    इन-ऑर्डर, प्री-ऑर्डर और पोस्ट-ऑर्डर बाइनरी ट्री के तीन सामान्य डेप्थ-फर्स्ट ट्रैवर्सल ऑर्डर हैं, प्रत्येक नोड्स को विजिट करने के अलग-अलग क्रम के साथ। ब्रेड्थ-फर्स्ट ट्रैवर्सल भी सामान्य है, लेकिन यह एक अलग ट्रैवर्सल श्रेणी है।
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={18}
  group="ट्री डेटा संरचनाएं"
  title="हीप गुण"
  options={[
    {text: 'सभी नोड बाएं से दाएं क्रमबद्ध होते हैं'},
    {text: 'रूट हमेशा सबसे बड़ा तत्व होता है'},
    {text: 'सभी पत्ते समान स्तर पर होते हैं'},
    {text: 'रूट सबसे छोटा तत्व है और ऊंचाई O(log n) है', isAnswer: true},
  ]}
>
  <slot name="question">
  <div className="question">
    न्यूनतम-हीप के लिए निम्नलिखित में से कौन से गुण सत्य हैं?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    न्यूनतम-हीप में, रूट हमेशा सबसे छोटा तत्व होता है, और ट्री की ऊंचाई O(log n) होती है, जिससे सम्मिलन और निष्कर्षण कुशल हो जाता है।
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={19}
  group="सॉर्टिंग एल्गोरिदम"
  title="बबल सॉर्ट की स्थिरता"
  options={[
    {text: 'अस्थिर'},
    {text: 'स्थिर', isAnswer: true},
    {text: 'कार्यान्वयन पर निर्भर करता है'},
    {text: 'कोई नहीं'},
    {text: 'जटिलता स्थिरता निर्धारित करती है'},
  ]}
>
  <slot name="question">
  <div className="question">
    क्या बबल सॉर्ट एल्गोरिदम स्थिर है?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    बबल सॉर्ट एक स्थिर सॉर्टिंग एल्गोरिदम है क्योंकि यह सॉर्टिंग के दौरान समान तत्वों के सापेक्ष क्रम को संरक्षित करता है।
  </div>
  </slot>
</Challenge>

</QuizUI>
````
