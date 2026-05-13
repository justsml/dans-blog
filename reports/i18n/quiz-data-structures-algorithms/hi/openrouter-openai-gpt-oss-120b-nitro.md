# Translation Candidate
- Slug: quiz-data-structures-algorithms
- Locale: hi
- Model: openrouter/openai/gpt-oss-120b:nitro
- Target: src/content/posts/2024-10-31--quiz-data-structures-algorithms/hi/index.mdx
- Validation: rejected: direct AI SDK translation failed
- Runtime seconds: 21.14
- Input tokens: 16158
- Output tokens: 9419
- Thinking tokens: unknown
- Cached input tokens: 4608
- Cache write tokens: 0
- Estimated cost: $0.002326
- Pricing source: local-openrouter-estimate
- Note: Command failed: git commit --only -m i18n candidate(hi): quiz-data-structures-algorithms via openrouter/openai/gpt-oss-120b:nitro -- src/content/posts/2024-10-31--quiz-data-structures-algorithms/hi/index.mdx reports/i18n/quiz-data-structures-algorithms/hi
## Raw Output

````mdx
---
title: 'प्रश्नोत्तरी: डेटा संरचनाएँ और एल्गोरिदम'
subTitle: क्या आप बाइनरी ट्री को बीएस कर सकते हैं?
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
import Challenge from '../../../../../components/QuizUI/Challenge';
import QuizUI from '../../../../../components/QuizUI/QuizUI';

<section class="inset">
  मेरे डेटा स्ट्रक्चर और एल्गोरिद्म क्विज़ में आपका स्वागत है!
</section>

यह क्विज़ आपके डेटा स्ट्रक्चर (स्टैक्स, लिस्ट्स, ट्रीज़ आदि) और एल्गोरिद्म, तथा टाइम कॉम्प्लेक्सिटी की समझ का परीक्षण करेगा।

### 20 प्रश्न... शुरू करें!

<QuizUI>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={0}
  group="डेटा संरचनाएँ"
  title="स्टैक्स बनाम क्यूज़"
  options={[
    {text: 'दोनों'},
    {text: 'क्यूज़'},
    {text: 'स्टैक्स', isAnswer: true},
    {text: 'कोई नहीं'},
  ]}
>
  <slot name="question">
  <div className="question">
    कौन सी डेटा संरचना LIFO (Last In, First Out) एक्सेस पैटर्न के लिए सबसे उपयुक्त है?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    स्टैक्स LIFO एक्सेस पैटर्न के लिए सबसे उपयुक्त होते हैं। क्यूज़ FIFO (First In, First Out) एक्सेस पैटर्न के लिए सबसे उपयुक्त होते हैं।
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={1}
  group="एल्गोरिदम"
  title="बिग O नोटेशन"
  options={[
    {text: 'O(1)', isAnswer: true},
    {text: 'O(n)'},
    {text: 'O(log n)'},
    {text: 'O(n^2)'},
  ]}
>
  <slot name="question">
  <div className="question">
    ऐसे एल्गोरिदम की समय जटिलता क्या है जो इनपुट आकार की परवाह किए बिना हमेशा समान समय लेता है?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    O(1) स्थिर समय जटिलता को दर्शाता है। इसका मतलब है कि एल्गोरिदम हमेशा समान समय लेता है, इनपुट आकार की परवाह किए बिना।
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={2}
  group="डेटा संरचनाएँ"
  title="लिंक्ड लिस्ट लंबाई गणना"
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
    एक सिंगली लिंक्ड लिस्ट की लंबाई गणना करने की समय जटिलता क्या है?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    एक सिंगली लिंक्ड लिस्ट की लंबाई गणना करने के लिए आपको हेड से टेल तक हर नोड को पार करना पड़ता है, जिससे O(n) समय जटिलता प्राप्त होती है।
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
    संतुलित बाइनरी सर्च ट्री में किसी तत्व को खोजने की औसत समय जटिलता क्या है?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    संतुलित BST में, लुकअप की औसत समय जटिलता O(log n) है क्योंकि प्रत्येक स्तर पर खोज स्थान को आधा किया जा सकता है।
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={4}
  group="सॉर्टिंग एल्गोरिदम"
  title="मर्ज सॉर्ट जटिलता"
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
    मर्ज सॉर्ट एल्गोरिदम की सबसे खराब स्थिति में समय जटिलता क्या है?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    मर्ज सॉर्ट हमेशा सबसे खराब स्थिति में O(n log n) जटिलता के साथ काम करता है क्योंकि यह बार‑बार एरे को आधा विभाजित करता है और क्रमबद्ध उपएरे को मिलाता है।
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={5}
  group="ग्राफ"
  title="DFS बनाम BFS"
  options={[
    {text: 'क्यू', isAnswer: true},
    {text: 'स्टैक'},
    {text: 'प्रायोरिटी क्यू'},
    {text: 'हैश मैप'},
    {text: 'सेट'},
  ]}
>
  <slot name="question">
  <div className="question">
    ब्रेड्थ‑फ़र्स्ट सर्च (BFS) को लागू करने के लिए सामान्यतः कौन सा डेटा स्ट्रक्चर उपयोग किया जाता है?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    BFS स्तर‑दर‑स्तर नोड्स को खोजने के लिए क्यू का उपयोग करता है, नोड्स को ब्रेड्थ‑फ़र्स्ट तरीके से ("पंक्ति" द्वारा) प्रोसेस करता है।
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={6}
  group="ग्राफ़"
  title="ग्राफ़ में चक्र पहचान"
  options={[
    {text: 'Quick Sort'},
    {text: 'Breadth-First Search'},
    {text: 'Merge Sort'},
    {text: 'Depth-First Search', isAnswer: true},
    {text: 'Bubble Sort'},
  ]}
>
  <slot name="question">
  <div className="question">
    कौन सा एल्गोरिदम आमतौर पर निर्देशित ग्राफ़ में चक्रों का पता लगाने के लिए उपयोग किया जाता है?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    डैप्थ-फ़र्स्ट सर्च (DFS) आमतौर पर ग्राफ़ में चक्रों का पता लगाने के लिए उपयोग किया जाता है, जहाँ यह विज़िट किए गए नोड्स को ट्रैक करने के लिए एक रिकर्शन स्टैक बनाए रखता है।
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={7}
  group="सॉर्टिंग एल्गोरिदम"
  title="हीप सॉर्ट जटिलता"
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
    हीप सॉर्ट की सबसे खराब स्थिति में समय जटिलता क्या है?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    हीप सॉर्ट सबसे खराब स्थिति में O(n log n) समय जटिलता बनाए रखता है, क्योंकि यह एक हीप बनाता है और बार‑बार अधिकतम तत्व को निकालता है।
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
    हैश टेबल में किसी तत्व तक पहुँचने के लिए औसत समय जटिलता क्या है?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    हैश टेबल में तत्वों तक पहुँचने के लिए औसत समय जटिलता O(1) होती है, बशर्ते एक अच्छा हैश फ़ंक्शन हो जो टकराव को कम करता हो।
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={9}
  group="डेटा संरचनाएँ"
  title="स्टैक संचालन"
  options={[
    {text: 'Push, Pop, Peek', isAnswer: true},
    {text: 'Enqueue, Dequeue, Peek'},
    {text: 'Insert, Search, Delete'},
    {text: 'Traverse, Visit, Sort'},
  ]}
>
  <slot name="question">
  <div className="question">
    कौन सा सेट स्टैक पर किए जाने वाले सामान्य संचालन शामिल करता है?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    स्टैक के मुख्य संचालन हैं Push (तत्व जोड़ना), Pop (तत्व हटाना), और Peek (ऊपर का तत्व हटाए बिना देखना)।
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={10}
  group="ग्राफ एल्गोरिद्म"
  title="सबसे छोटा पथ एल्गोरिद्म"
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
    कौन सा एल्गोरिद्म आमतौर पर गैर-नकारात्मक किनारों वाले वज़नित ग्राफ में सबसे छोटा पथ खोजने के लिए उपयोग किया जाता है?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    डिज्क्स्ट्रा एल्गोरिद्म अक्सर गैर-नकारात्मक किनारा वज़न वाले ग्राफ में सबसे छोटा पथ खोजने के लिए उपयोग किया जाता है। यह प्राथमिकता कतार (priority queue) का उपयोग करके सबसे छोटा दूरी कुशलता से निर्धारित करता है।
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={11}
  group="वृक्ष डेटा संरचनाएँ"
  title="स्व-समतुल्य खोज वृक्ष"
  options={[
    {text: 'बाइनरी सर्च ट्री और मिन हीप'},
    {text: 'एवीएल ट्री और रेड-ब्लैक ट्री', isAnswer: true},
    {text: 'मिन हीप और मैक्स हीप'},
    {text: 'स्टैक और क्यू'},
  ]}
>
  <slot name="question">
  <div className="question">
    कौन सा सेट स्व-समतुल्य बाइनरी सर्च ट्री डेटा संरचनाओं के उदाहरण शामिल करता है?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    एवीएल ट्री और रेड-ब्लैक ट्री स्व-समतुल्य वृक्षों के प्रकार हैं, जो प्रत्येक इन्सर्शन या डिलीशन के बाद वृक्ष को संतुलित रखती हैं।
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={12}
  group="पुनरावृत्ति"
  title="पुनरावृत्ति बेस केस"
  options={[
    {text: 'अनंत लूप'},
    {text: 'स्टैक ओवरफ़्लो'},
    {text: 'बेस केस', isAnswer: true},
    {text: 'ग्लोबल वेरिएबल'},
    {text: 'स्कोप सीमा'},
  ]}
>
  <slot name="question">
  <div className="question">
    अनंत पुनरावृत्ति को रोकने के लिए एक पुनरावर्ती फ़ंक्शन में क्या परिभाषित होना चाहिए?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    जब कोई विशिष्ट शर्त पूरी हो जाए तो पुनरावर्ती कॉल को रोकने के लिए एक पुनरावर्ती फ़ंक्शन में बेस केस आवश्यक होता है, जिससे अनंत पुनरावृत्ति नहीं होती।
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={13}
  group="डेटा संरचनाएँ"
  title="क्यू संचालन"
  options={[
    {text: 'एन्क्यू और डीएनक्यू', isAnswer: true},
    {text: 'पुश और पॉप'},
    {text: 'पीक और टॉप'},
    {text: 'ट्रैवर्स और सॉर्ट'},
  ]}
>
  <slot name="question">
  <div className="question">
    क्यू के दो मुख्य संचालन क्या हैं?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    क्यू में दो मुख्य संचालन एन्क्यू (पीछे एक तत्व जोड़ना) और डीएनक्यू (सामने से एक तत्व हटाना) हैं।
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
    {text: 'ग्राफ वज़नयुक्त और जुड़ा हुआ होना चाहिए'},
    {text: 'ग्राफ अनडायरेक्टेड और चक्ररहित होना चाहिए'},
    {text: 'ग्राफ डायरेक्टेड और चक्ररहित होना चाहिए', isAnswer: true},
  ]}
>
  <slot name="question">
  <div className="question">
    ग्राफ पर टोपोलॉजिकल सॉर्टिंग करने की शर्तें क्या हैं?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    यदि ग्राफ डायरेक्टेड और चक्ररहित (DAG) हो तो टोपोलॉजिकल सॉर्टिंग की जा सकती है। यह क्रमबद्धता कार्य शेड्यूलिंग समस्याओं में उपयोगी होती है।
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={15}
  group="डायनामिक प्रोग्रामिंग"
  title="फ़िबोनाच्ची पुनरावृत्ति जटिलता"
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
    फ़िबोनाच्ची श्रृंखला के एक साधारण पुनरावर्ती कार्यान्वयन की समय जटिलता क्या है?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    फ़िबोनाच्ची श्रृंखला का साधारण पुनरावर्ती कार्यान्वयन प्रत्येक फ़िबोनाच्ची संख्या के लिए बार‑बार गणनाओं के कारण O(2^n) समय जटिलता रखता है।
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={16}
  group="डेटा संरचनाएँ"
  title="प्रायोरिटी क्यू कार्यान्वयन"
  options={[
    {text: 'ऐरे'},
    {text: 'स्टैक'},
    {text: 'हीप', isAnswer: true},
    {text: 'क्यू'},
    {text: 'लिंक्ड लिस्ट'},
  ]}
>
  <slot name="question">
  <div className="question">
    कौन सा डेटा स्ट्रक्चर प्रायोरिटी क्यू को लागू करने के लिए आमतौर पर उपयोग किया जाता है?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    प्रायोरिटी क्यू अक्सर हीप का उपयोग करके लागू किया जाता है क्योंकि यह उच्चतम या न्यूनतम प्रायोरिटी वाले तत्व को कुशलता से निकालने की सुविधा देता है।
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
    {text: 'ब्रेड्थ-फ़र्स्ट, डेप्थ-फ़र्स्ट, हीपिफ़ाइ'},
    {text: 'सॉर्ट, सर्च, रोटेट'},
    {text: 'पुश, पॉप, पीक'},
  ]}
>
  <slot name="question">
  <div className="question">
    कौन‑सा सेट बाइनरी ट्री के सामान्य डेप्थ‑फ़र्स्ट ट्रैवर्सल क्रमों को सूचीबद्ध करता है?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    इन-ऑर्डर, प्री-ऑर्डर, और पोस्ट-ऑर्डर बाइनरी ट्री के तीन सामान्य डेप्थ‑फ़र्स्ट ट्रैवर्सल क्रम हैं, प्रत्येक नोड्स को विज़िट करने के अलग क्रम को दर्शाता है। ब्रेड्थ‑फ़र्स्ट ट्रैवर्सल भी सामान्य है, लेकिन यह एक अलग ट्रैवर्सल श्रेणी है।
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={18}
  group="ट्री डेटा संरचनाएँ"
  title="हीप गुण"
  options={[
    {text: 'सभी नोड बाएँ‑से‑दाएँ क्रमबद्ध हैं'},
    {text: 'रूट हमेशा सबसे बड़ा तत्व होता है'},
    {text: 'सभी पत्ते एक ही स्तर पर होते हैं'},
    {text: 'रूट सबसे छोटा तत्व है और ऊँचाई O(log n) है', isAnswer: true},
  ]}
>
  <slot name="question">
  <div className="question">
    निम्नलिखित में से कौन सी विशेषताएँ मिन‑हीप के लिए सत्य हैं?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    मिन‑हीप में, रूट हमेशा सबसे छोटा तत्व होता है, और ट्री की ऊँचाई O(log n) होती है, जिससे सम्मिलन और निकासी कुशल रहती है।
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={19}
  group="सॉर्टिंग एल्गोरिदम"
  title="बबल सॉर्ट स्थिरता"
  options={[
    {text: 'अस्थिर'},
    {text: 'स्थिर', isAnswer: true},
    {text: 'कार्यान्वयन पर निर्भर करता है'},
    {text: 'न तो'},
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
    बबल सॉर्ट एक स्थिर सॉर्टिंग एल्गोरिदम है क्योंकि यह सॉर्टिंग के दौरान समान तत्वों का सापेक्ष क्रम बनाए रखता है।
  </div>
  </slot>
</Challenge>

</QuizUI>
````
