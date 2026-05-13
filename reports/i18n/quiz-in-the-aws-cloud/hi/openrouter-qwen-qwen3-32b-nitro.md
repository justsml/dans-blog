# Translation Candidate
- Slug: quiz-in-the-aws-cloud
- Locale: hi
- Model: openrouter/qwen/qwen3-32b:nitro
- Target: src/content/posts/2024-12-28--quiz-in-the-aws-cloud/hi/index.mdx
- Validation: deferred
- Runtime seconds: 449.56
- Input tokens: 22057
- Output tokens: 39687
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- Estimated cost: $0.011289
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
unlisted: false
title: ''
subTitle: क्लाउड के लेबिरिंथ में नेविगेट कर सकते हैं?
label: AWS Storage
category: Quiz
subCategory: Cloud
date: '2024-12-28'
modified: '2024-12-29'
tags:
  - quiz
  - aws
  - cloud
  - storage
  - databases
  - s3
  - dynamodb
  - rds
  - elasticache
social_image: ../mobile.webp
cover_full_width: ../aws-cloud--city-focus-wide.webp
cover_mobile: ../aws-cloud--city-focus-square.webp
cover_icon: ../aws-cloud--city-focus-square.webp
---
import Challenge from '../../../../../components/QuizUI/Challenge';
import QuizUI from '../../../../../components/QuizUI/QuizUI';


```html
<p class="inset">क्लाउड में डूबने को तैयार हैं? 🤡</p>

AWS स्टोरेज सेवाओं में गहराई से जाने! इस क्विज़ में S3, DynamoDB, Aurora, RDS, ElastiCache आदि पर आपके ज्ञान का परीक्षण होगा। सर्वोत्तम प्रथाओं से लेकर कठिन चुनौतियों तक, हम क्लाउड स्टोरेज लैंडस्केप की ओर अग्रसर होंगे।

अपनी क्लाउड एक्सपर्टिस साबित करने के लिए तैयार हो जाओ! 🚀
```

<QuizUI>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={0}
  group="तैयारी"
  title="S3 ट्रिविया"
  options={[
    {text: 'सर्वर स्टोरेज v3'},
    {text: 'स्टोरेज एज़ अ सर्विस'},
    {text: 'सिम्पल स्टोरेज सर्विस', isAnswer: true},
    {text: 'सैसी स्टोरेज सर्विस'},
    {text: 'सिम्पल सिंक्रोनाइज्ड स्टोर'},
  ]}
>
  <slot name="question">
  <div className="question">
    <p className="text-sm">पिछली पुष्टि: मई 8, 2026. AWS की सीमाएं और मूल्य तेजी से बदलते रहते हैं।</p>
    S3 के नाम का क्या अर्थ है?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    S3 का अर्थ **सिम्पल स्टोरेज सर्विस** से है। यह बड़े पैमाने पर डेटा स्टोर करने के लिए डिज़ाइन किया गया एक पैमाने वाला ऑब्जेक्ट स्टोरेज सर्विस है।

    AWS S3 में कई स्टोरेज क्लास होते हैं:
    - स्टैंडर्ड: अक्सर एक्सेस किए जाने वाले डेटा के लिए
    - निर्माण में आवश्यकता (IA): कम बार एक्सेस के लिए कम लागत
    - ग्लेशियर: लंबे समय तक, कम लागत वाली आर्काइवल स्टोरेज

    प्रत्येक क्लास अलग-अलग मूल्य और एक्सेस विशेषताएं प्रदान करता है, जो डेटा उपयोग पैटर्न के आधार पर लागत अनुकूलन की अनुमति देता है।

    [S3 स्टोरेज क्लासेस के बारे में अधिक जानें](https://aws.amazon.com/s3/storage-classes/)
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={1}
  group="स्कीमा रहित"
  title="DynamoDB"
  options={[
    {text: 'अनियमित गुणधर्मों को संग्रहित करें', isAnswer: true},
    {text: 'डाइनेमिक पार्टीशन कुंजियाँ'},
    {text: 'कॉलम प्रकारहीन होते हैं'},
    {text: 'स्वचालित रूप से प्रबंधित JSON स्कीमा'},
    {text: 'स्कीमा समर्थन के लिए RDS पर निर्भर करता है'},
  ]}
>
  <slot name="question">
  <div className="question">
    जब DynamoDB को 'स्कीमा रहित' के रूप में वर्णित किया जाता है तो इसका क्या अर्थ है?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    DynamoDB को 'स्कीमा रहित' माना जाता है क्योंकि यह आपको पूर्व-परिभाषित स्कीमा के बिना आइटम में अनियमित गुणधर्म संग्रहित करने की अनुमति देता है।

    [DynamoDB Best Practices](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/best-practices.html)
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={2}
  group="स्कीमा रहित"
  title="DynamoDB"
  options={[
    {text: 'PutItem', hint: 'एक नए आइटम को बनाता है, या एक पुराने आइटम को एक नए आइटम से बदल देता है।'},
    {text: 'BatchUpdateItem', hint: 'मौजूद नहीं है।'},
    {text: 'BatchWriteItem', hint: 'एकल कॉल में कई आइटम को पढ़े या हटाए।'},
    {text: 'UpdateItem', isAnswer: true},
    {text: 'BatchUpsertItem', hint: 'DynamoDB में?'},
    {text: 'TransactWriteItems', hint: 'एकल कॉल में कई PutItem, UpdateItem, DeleteItem, और ConditionCheck ऑपरेशन्स को जोड़ता है।'},
  ]}
>
  <slot name="question">
  <div className="question">
    कौन सा DynamoDB API एक मौजूदा आइटम पर एट्रिब्यूट्स को अपडेट करता है?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    यहां महत्वपूर्ण बात <b>अपडेट्स</b> है, न कि इंसर्ट या PUTs। अगर आप इंसर्ट कर रहे हो, तो आप `BatchWriteItem` या `TransactWriteItems` का उपयोग कर सकते हैं।

    जबकि `BatchWriteItem` कई ऑपरेशन्स को संभाल सकता है, लेकिन यह केवल PUTs और DELETES तक सीमित है। `TransactWriteItems` अधिक शक्तिशाली है, लेकिन सरल अपडेट के लिए यह थोड़ा बड़ा हथियार है।
    सरल अपडेट के लिए, `UpdateItem` सबसे अच्छा विकल्प है। यह आपको एक मौजूदा आइटम में एक या अधिक एट्रिब्यूट्स को UPDATE करने की अनुमति देता है।

    `UpdateItem` ऑपरेशन एक अनुरोध प्रति आइटम के साथ काम करता है। बड़े बैकफिल या बुल्क अपडेट के लिए आमतौर पर कई `UpdateItem` कॉल्स का नियंत्रण करना होता है या PartiQL बैच निष्पादन, Step Functions, Glue, EMR, या एक कस्टम वर्कर प्रक्रिया जैसे बड़े वर्कफ़्लो का उपयोग करना होता है।

    `UpdateItem` ऑपरेशन के फायदे हैं:
    - एक मौजूदा आइटम के एट्रिब्यूट्स को अपडेट करता है।
    - एक मौजूदा आइटम में नए एट्रिब्यूट्स जोड़ता है।
    - एक मौजूदा आइटम से एट्रिब्यूट्स हटाता है।
    - शर्तों के आधार पर अपडेट करता है अगर आइटम मौजूद है या निश्चित शर्तों को पूरा करता है।

    [DynamoDB UpdateItem](https://docs.aws.amazon.com/amazondynamodb/latest/APIReference/API_UpdateItem.html)
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={3}
  group="खोज क्षमताएँ"
  title="उन्नत खोज विशेषताएँ"
  options={[
    {text: 'ElastiCache', hint: 'मुख्य रूप से इन-मेमोरी कैश; नए Valkey संस्करण में खोज विशेषताएँ शामिल हैं।'},
    {text: 'OpenSearch', isAnswer: true},
    {text: 'Neptune', hint: 'ग्राफ़ डेटाबेस जिसमें उन्नत खोज क्षमताएँ हैं'},
    {text: 'Redshift', hint: 'जटिल विश्लेषणात्मक प्रश्न'},
    {text: 'DocumentDB', hint: 'MongoDB-संगत प्रश्न'},
  ]}
>
  <slot name="question">
  <div className="question">
    यहाँ कौन सी AWS सेवा फुल-टेक्स्ट खोज और खोज विश्लेषण के लिए बनाई गई है?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    OpenSearch, AWS की प्रबंधित सेवा है जो खोज, लॉग विश्लेषण और फुल-टेक्स्ट खोज कार्यों के लिए है।

    शेष विकल्प उपयोगी सेवाएँ हैं, लेकिन ये सूची में खोज इंजन के रूप में बनाई गई सेवा नहीं हैं:
    - ElastiCache: मुख्य रूप से इन-मेमोरी कैश। वर्तमान ElastiCache Valkey में अनुक्रमित इन-मेमोरी डेटा के लिए खोज कमांड शामिल हैं, इसलिए अब यह पूरी सेवा के बारे में कहना सटीक नहीं है कि उसमें बिल्ट-इन खोज नहीं है।
    - Neptune: ग्राफ़ डेटाबेस; यह OpenSearch के साथ फुल-टेक्सट खोज के लिए एकीकृत हो सकता है।
    - Redshift: SQL विश्लेषण के लिए डेटा वॉच हाउस।
    - DocumentDB: डॉक्यूमेंट डेटाबेस जिसमें समर्थित संस्करण में MongoDB-संगत खोज है।
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={4}
  group="RDS"
  title="मल्टी-एएज़ (Multi-AZ) तैयारी"
  options={[
    {text: 'संग्रहण लागत कम करता है'},
    {text: 'ईग्रेस समस्या को हल करता है'},
    {text: 'स्वचालित फेलओवर प्रदान करता है', isAnswer: true},
    {text: 'पढ़ने की प्रदर्शन क्षमता बढ़ाता है'},
    {text: 'भौगोलिक रूप से वितरित ट्रैफ़िक को सुधारता है'},
  ]}
>
  <slot name="question">
  <div className="question">
    RDS मल्टी-एएज़ (Multi-AZ) तैयारी का **मुख्य** लाभ क्या है?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    उपलब्धता क्षेत्र (Availability Zones) एक **क्षेत्र (region) के भीतर** अलग-अलग डेटा सेंटर होते हैं। RDS मल्टी-एएज़ तैयारी एक *निकटवर्ती* एएज़ में स्टैंडबाई रिप्लिका के लिए स्वचालित फेलओवर प्रदान करती है।

    मल्टी-एएज़ तैयारी:
    - स्वचालित फेलओवर प्रदान करती है
    - डेटाबेस उपलब्धता बढ़ाती है
    - सिंक्रोनस स्टैंडबाई रिप्लिका बनाती है
    - बुनियादी ढांचा विफलताओं के दौरान डाउनटाइम कम करती है

    मल्टी-एएज़ तैयारी को रीड रिप्लिका से भ्रमित न करें, जिनका उपयोग पढ़ने के संचालन को पैमांग करने के लिए किया जाता है।

    {/* [RDS Multi-AZ Details](https://aws.amazon.com/rds/features/multi-az/) */}
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={5}
  group="वेबसॉकेट्स"
  title="वेबसॉकेट जादू"
  options={[
    {text: 'API Gateway', isAnswer: true},
    {text: 'EKS', hint: 'EKS आपके स्वयं के लंबी अवधि के वेबसॉकेट सेवाओं को चला सकता है।'},
    {text: 'Lightsail', hint: 'Lightsail इंस्टैंस आपके स्वयं के वेबसॉकेट सर्वर को चला सकते हैं।'},
    {text: 'AppSync', hint: 'AppSync वेबसॉकेट्स पर प्रबंधित रियल-टाइम ग्राफ़क्यूएल सब्सक्रिप्शन प्रदान करता है, लेकिन अनियमित रूप से रॉ सॉकेट्स नहीं।'},
    {text: 'EC2', hint: 'EC2 आपके स्वयं के लंबी अवधि के वेबसॉकेट सर्वर प्रक्रिया को चला सकता है।'},
  ]}
>
  <slot name="question">
  <div className="question">
    👋 आशा है आपको अब तक मज़ा आ रहा है!

    अब एक कठिन सवाल है...

    कौन सी AWS सेवा प्रबंधित वेबसॉकेट एपीआई प्रदान करती है जहाँ AWS क्लाइंट कनेक्शन का स्वामित्व करता है और संगति में संदेशों को रूट करता है?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    API Gateway द्विदिशा वेबसॉकेट एपीआई का समर्थन करता है, लेकिन कार्यरति API Gateway द्वारा प्रबंधित होती है और आपके सर्वर प्रक्रिया में एक सीधा सॉकेट नहीं होता है।
    API Gateway क्लाइंट कनेक्शन को बनाए रखता है और संदेशों को Lambda, HTTP एंडपॉइंट या अन्य संगतियों को रूट करता है। संदेशों को API Gateway Management API के माध्यम से जुड़े क्लाइंट में वापस भेजा जा सकता है।

    अन्य विकल्प बहुत अधिक वेबसॉकेट-अनुकूल हैं:
    - Lightsail: सरल वेबसॉकेट सेटअप के लिए बेहतरीन 👌
    - AppSync: प्रबंधित ग्राफ़क्यूएल सब्सक्रिप्शन के लिए वेबसॉकेट्स का उपयोग करता है
    - EC2: वेबसॉकेट्स के लिए आपका प्राचीन "कुछ भी करें" विकल्प
    - EKS: पैमाने पर वेबसॉकट क्लस्टर चलाने के लिए उत्तम

    प्रो टिप: अगर आपको रॉ वेबसॉकेट शक्ति की आवश्यकता है, तो कंप्यूट विकल्पों पर जाएं!
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={6}
  group="S3 सुरक्षा"
  title="S3 बकेट नीति"
  options={[
    {text: 'नए बकेट पब्लिक करें', hint: 'पहले न्यूनतम अधिकार का उपयोग करें।'},
    {text: 'S3 को ऑन-प्रीमिस ले जाएं और ACLs पर पूरी तरह नियंत्रण करें'},
    {text: 'डेटा को प्राइवेट ब्लॉकचेन में ले जाएं', hint: 'अजीबो-गरीब, ना?'},
    {text: 'न्यूनतम अधिकार सिद्धांत का उपयोग करें', isAnswer: true},
    {text: 'नीति वाइल्डकार्ड्स का उपयोग करके आवश्यक पहुंच सुनिश्चित करें', hint: '😯 नहीं!'},
  ]}
>
  <slot name="question">
  <div className="question">
    S3 बकेट अनुमतियों के लिए अनुशंसित दृष्टिकोण क्या है?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    लगभग सभी प्रणालियों में, "न्यूनतम अधिकार" डिज़ाइन को अपनाना सुरक्षा बढ़ाने और भविष्य में सुरक्षित रखने के लिए महत्वपूर्ण है। मौजूदा प्रणाली को बंद करने की कोशिश करना एक पूरे कार्यालय भवन को नए आधार पर स्थानांतरित करने के समान कठिन होता है।

    S3 बकेट भी इसके अपवाह नहीं हैं। न्यूनतम अधिकार के सिद्धांत को लागू करने के लिए, कोई अनुमति न दें और केवल आवश्यक पहुंच दें। IAM भूमिकाओं और नीतियों का उपयोग अनुमति नियंत्रित करने के लिए करें और बकेट अनुमतियों की नियमित रूप से जांच करें।

    सुरक्षा सर्वोत्तम प्रथाएँ:
    - न्यूनतम अधिकार के सिद्धांत को लागू करें
    - कोई अनुमति न दें
    - केवल आवश्यक पहुंच दें
    - IAM भूमिकाओं और नीतियों का उपयोग करें
    - बकेट अनुमतियों की नियमित रूप से जांच करें

    अत्यधिक अनुमति वाले सेटिंग्स से बचें जो संवेदनशील डेटा को खतरे में डाल सकते हैं।

    [S3 सुरक्षा सर्वोत्तम प्रथाएँ](https://aws.amazon.com/s3/security/)
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={7}
  group="Aurora"
  title="Aurora Serverless"
  options={[
    {text: 'हमेशा प्रोवाइज़न किए गए की तुलना में सस्ता होता है'},
    {text: 'कंप्यूट क्षमता को स्वचालित रूप से पैमाइश करता है', isAnswer: true},
    {text: 'असीमित भंडारण प्रदान करता है'},
    {text: 'डेटाबेस प्रबंधन को समाप्त करता है'},
  ]}
>
  <slot name="question">
  <div className="question">
    Aurora Serverless की मुख्य विशेषता क्या है?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Aurora Serverless:
    - कंप्यूट क्षमता को स्वचालित रूप से पैमाइश करता है
    - कार्यभार पर आधारित संसाधनों के अनुकूलन करता है
    - अनुमानित कार्यभार के लिए आदर्श है
    - केवल उपयोग किए गए संसाधनों के लिए शुल्क लेता है

    चर ट्रैफ़िक पैटर्न वाले एप्लिकेशन के लिए उपयुक्त है।

    [Aurora Serverless अवलोकन](https://aws.amazon.com/rds/aurora/serverless/)
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={8}
  group="बैच, भाग 1!"
  title="बैचगेटइटम सीमाएं"
  options={[
    {text: '1', hint: 'मैं बैचिंग के लिए जोर देता हूँ।'},
    {text: '25', hint: '`BatchWriteItem` के लिए यह सीमा है।'},
    {text: '100', isAnswer: true},
    {text: '75', hint: 'करीब है, लेकिní एक गोल संख्या है।'},
    {text: '50', hint: '`BatchGetItem` के लिए थोड़ा ऊँचा है।'},
    {text: '200', hint: 'थोड़ा ज्यादा ऊँचा है...'},
    {text: 'असीमित', hint: '`BatchGetItem` के लिए एक निश्चित सीमा है।'},
  ]}
>
  <slot name="question">
  <div className="question">
    एक और डाइनामोडीबी बैच प्रश्न! <br />
    एकल डाइनामोडीबी `BatchGetItem` अनुरोध का उपयोग करके आप अधिकतम कितने आइटम प्राप्त कर सकते हैं?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    डाइनामोडीबी एसडीके एकल `BatchGetItem` अनुरोध में अधिकतम **100** आइटम प्राप्त करने की अनुमति देता है। यह `BatchWriteItem` के लिए सीमा (25 आइटम) से अधिक है।
    इसके अलावा, कुल पेलोड आकार, दस्तावेज आकार और अनुरोध दर पर भी सीमाएं हैं।

    इन सीमाओं को समझना अपने एप्लिकेशन के प्रदर्शन को अनुकूलित करने और डेटा ऑपरेशन को कुशल बनाए रखने के लिए महत्वपूर्ण है।

    **नोट:** कुछ सीमाओं को पार करना संभव है - अगर आप अपने AWS खाता प्रबंधक से बात कर सकते हैं। 😎
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={9}
  group="बैच, भाग 2!"
  title="बैच संचालन"
  options={[
    {text: '1', isAnswer: true},
    {text: '10'},
    {text: '25', hint: 'अच्छा अनुमान...'},
    {text: '50'},
    {text: '100', hint: 'क्या GetItem सीमा के बारे में सोच रहे हैं?'},
    {text: '100 जब स्ट्रीमिंग हो रही हो'},
    {text: 'उपरोक्त में से कोई नहीं', hint: 'यह थोड़ा ट्रिकी है...'},
  ]}
>
  <slot name="question">
  <div className="question">
    डाइनामोडीबी बैच प्रति कितने दस्तावेज़ `UPDATE` कर सकता है?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    डाइनामोडीबी क्लाइंट आसानी से अपने HTTP एपी के लिए लिप्तक हैं। `BatchWriteItem` संचालन `PUT` या `DELETE` प्रति HTTP अनुरोध **25** दस्तावेज़ तक कर सकता है, लेकिन यह बहुगुणा दस्तावेज़ `UPDATE` नहीं कर सकता।

    जबकि डाइनामोडीबी प्रति HTTP अनुरोध **25** दस्तावेज़ तक `INSERT` कर सकता है, यह `UPDATE` प्रति अनुरोध केवल **1** दस्तावेज़ `UpdateItem` संचालन का उपयोग करके कर सकता है।
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={10}
  group="DynamoDB"
  title="प्रोविजन क्षमता vs अनुरोध पर क्षमता"
  options={[
    {text: 'प्रोविजन हमेशा बेहतर होता है'},
    {text: 'अनुरोध पर अनंत क्षमता होती है'},
    {text: 'दोनों प्रदर्शन में एक ही होते हैं'},
    {text: 'अनुरोध पर अनुमानित नहीं होने वाले कार्यों के लिए सस्ता होता है', isAnswer: true},
  ]}
>
  <slot name="question">
  <div className="question">
    डीआरडीबी में अनुरोध पर क्षमता कब उपयोग करनी चाहिए?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    अनुरोध पर क्षमता उन अवसरों पर उपयोग करना चाहिए:
    - अनुमानित नहीं होने वाले कार्यों
    - अनियमित ट्रैफ़िक
    - अज्ञात पहुँच पैटर्न वाले एप्लिकेशन
    - ओवर-प्रोविज़निंग से बचने के लिए

    प्रोविज़न क्षमता निम्नलिखित के लिए बेहतर है:
    - नियमित और एकरूप कार्यों के लिए
    - प्रदर्शन पर अधिक नियंत्रण के लिए
    - लागत बचाने की संभावना होने पर

    [DynamoDB क्षमता मोड](https://aws.amazon.com/dynamodb/pricing/)
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={11}
  group="S3 प्रदर्शन"
  title="S3 प्रदर्शन अनुकूलन"
  options={[
    {text: 'रैंडम/हैश प्रीफिक्स का उपयोग करें'},
    {text: 'तार्किक प्रीफिक्स का उपयोग करें; रैंडमाइजेशन की आवश्यकता नहीं है', isAnswer: true},
    {text: 'हमेशा सबसे बड़े ऑब्जेक्ट्स का उपयोग करें'},
    {text: 'ऑब्जेक्ट्स की संख्या कम करें'},
  ]}
>
  <slot name="question">
  <div className="question">
    उच्च अनुरोध दरों के लिए S3 प्रदर्शन को कैसे अनुकूलित किया जाए?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    S3 प्रदर्शन टिप्स:
    - आधुनिक S3 प्रीफिक्स प्रति अनुरोध दरों को स्वचालित रूप से पैमाने पर ले जाता है
    - प्रदर्शन के लिए रैंडम/हैश प्रीफिक्स की आवश्यकता नहीं है
    - आपके एक्सेस पैटर्न के अनुरूप तार्किक की नामों का उपयोग करें
    - अगर आप बहुत उच्च अनुरोध दरों को धकेल रहे हैं तो 503 स्लो डाउन प्रतिक्रियाओं की निगरानी करें

    पुराना मार्गदर्शन हॉट पार्टिशन्स से बचने के लिए प्रीफिक्स को रैंडमाइज करने की सलाह देता था, लेकिंत AWS अब इसे डिफ़ॉल्ट प्रदर्शन आवश्यकता के रूप में सलाह नहीं देता है।

    [S3 प्रदर्शन गाइडलाइन्स](https://aws.amazon.com/s3/performance/)
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={12}
  group="RDS प्रतिलेखन"
  title="RDS प्रतिलेखन रणनीति"
  options={[
    {text: 'केवल हस्ताक्षरित प्रतिलेखन'},
    {text: 'कोई प्रतिलेखन आवश्यक नहीं'},
    {text: 'स्वचालित प्रतिलेखन और क्षण-अंतर्गत पुनर्प्राप्ति', isAnswer: true},
    {text: 'साप्ताहिक पूर्ण प्रतिलेखन'},
  ]}
>
  <slot name="question">
  <div className="question">
    आरडीएस प्रतिलेखन के लिए अनुशंसित दृष्टिकोण क्या है?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    शीर्ष प्रतिलेखन अभ्यास:
    - स्वचालित प्रतिलेखन सक्षम करें
    - क्षण-अंतर्गत पुनर्प्राप्ति का उपयोग करें
    - अनुपालन आवश्यकताओं पर आधारित प्रतिलेखन बनाए रखें
    - पुनर्स्थापन प्रक्रिया का नियमित रूप से परीक्षण करें
    - क्षेत्र-पार प्रतिलेखन पर विचार करें

    स्वचालित प्रतिलेखन प्रदान करते हैं:
    - निरंतर डेटा सुरक्षा
    - लचीले पुनर्प्राप्ति विकल्प

    [RDS प्रतिलेखन के शीर्ष अभ्यास](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/CHAP_CommonTasks.BackupRestore.html)
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={13}
  group="ElastiCache"
  title="Redis vs Memcached"
  options={[
    {text: 'Redis अधिक डेटा संरचनाओं और ऑपरेशन का समर्थन करता है', isAnswer: true},
    {text: 'सभी पहलुओं में समान'},
    {text: 'API-स्तर की अनुकूलता'},
    {text: 'Memcached हमेशा तेज होता है'},
  ]}
>
  <slot name="question">
  <div className="question">
    ElastiCache में `Redis` और `Memcached` के बीच मुख्य अंतर क्या है?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Redis के लाभ:
    - जटिल डेटा संरचनाओं का समर्थन
    - पारस्थितिकता विकल्प
    - उन्नत ऑपरेशन
    - Pub/Sub मैसेजिंग

    Memcached:
    - सरल की-वैल्यू स्टोर
    - शुद्ध कैशिंग
    - सरल उपयोग के लिए उच्च प्रदर्शन

    [Redis vs Memcached](https://aws.amazon.com/elasticache/redis-vs-memcached/)
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={14}
  group="डायनामोडीबी इंडेक्स"
  title="ग्लोबल सेकेंडरी इंडेक्स"
  options={[
    {text: 'मुख्य कुंजी के समान होता है'},
    {text: 'अतिरिक्त लागत के बिना'},
    {text: 'लिखने के प्रदर्शन को कम करता है'},
    {text: 'गैर-मुख्य गुणों पर प्रश्न पूछने की अनुमति देता है', isAnswer: true},
  ]}
>
  <slot name="question">
  <div className="question">
    डायनामोडीबी में ग्लोबल सेकेंडरी इंडेक्स का उद्देश्य क्या है?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    ग्लोबल सेकेंडरी इंडेक्स (GSI):
    - गैर-मुख्य कुंजी गुणों पर प्रश्न पूछने की अनुमति देता है
    - वैकल्पिक एक्सेस पैटर्न बनाता है
    - प्रश्न की अधिकता को बढ़ाता है
    - अतिरिक्त लिखने की क्षमता लागत के साथ आता है

    मुख्य कुंजी से आगे जटिल प्रश्न आवश्यकताओं के लिए उपयोगी है।

    [DynamoDB Indexes](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/GSI.html)
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={15}
  group="S3 लाइफसाइक्ल"
  title="S3 लाइफसाइक्ल मैनेजमेंट"
  options={[
    {text: 'हाथ से ऑब्जेक्ट्स को बदलना'},
    {text: 'स्टोरेज क्लास में ऑब्जेक्ट्स को स्वतः बदलना', isAnswer: true},
    {text: 'पुराने ऑब्जेक्ट्स को कभी नहीं हटाना'},
    {text: 'सबकुछ स्टैंडर्ड क्लास में स्टोर करना'},
  ]}
>
  <slot name="question">
  <div className="question">
    S3 लाइफसाइक्ल मैनेजमेंट क्या सक्षम बनाता है?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    लाइफसाइक्ल मैनेजमेंट:
    - स्टोरेज क्लास में ऑब्जेक्ट्स को स्वतः बदलना
    - कम उपयोग करने वाले डेटा को सस्ते स्टोरेज में शिफ्ट करना
    - ऑब्जेक्ट्स के अवधि समाप्त होने के नियम लगाना
    - स्टोरेज खरच कम करना
    - मैन्युअल प्रबंधन के बोझ को कम करना

    [S3 लाइफसाइक्ल नियम](https://docs.aws.amazon.com/AmazonS3/latest/userguide/lifecycle-configuration-examples.html)
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={16}
  group="ऑरिओला के पैमाने"
  title="अमेज़न ऑरिओला के साथ पठन क्षमता का पैमाना"
  options={[
    {text: 'एक एकल पठन प्रतिलिपि तक सीमित है', hint: 'ऑरिओला की पैमाने की विशेषताओं पर विचार करें।'},
    {text: 'कोई पठन पैमाना संभव नहीं है', hint: 'क्या यह ऑरिओला की क्षमताओं के साथ संगत है?'},
    {text: '15 पठन प्रतिलिपियों का समर्थन करता है', isAnswer: true},
    {text: 'असीमित पठन प्रतिलिपियाँ', hint: 'एक व्यावहारिक सीमा का विचार करें।'},
  ]}
>
  <slot name="question">
  <div className="question">
    अमेज़न ऑरिओला कितनी अधिकतम पठन प्रतिलिपियाँ समर्थन करता है?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    अमेज़न ऑरिओला **15 पठन प्रतिलिपियों** तक का समर्थन करता है, जो आपके पठन ऑपरेशन को बड़े पैमाने पर पैमाना करने की अनुमति देता है। ये प्रतिलिपियाँ निम्नलिखित लाभ प्रदान करती हैं:

    - **प्रतिलिपियों के बीच लगभग तत्काल प्रतिलिपि बनाना**
    - **मुख्य इंस्टेंस पर न्यूनतम प्रदर्शन प्रभाव**
    - **पठन कार्यभार का कुशल वितरण**

    यह संरचना भारी पठन आवश्यकताओं वाले एप्लिकेशनों के लिए क्षैतिज पैमाने की अनुमति देती है।

    [ऑरिओला पठन प्रतिलिपियों के बारे में अधिक जानें](https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/Aurora.Replicas.html)
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={17}
  group="RDS सुरक्षा"
  title="RDS एन्क्रिप्शन"
  options={[
    {text: 'स्थैतिक और संचरण में डेटा को एन्क्रिप्ट करें', isAnswer: true},
    {text: 'एन्क्रिप्शन वैकल्पिक है'},
    {text: 'कोई एन्क्रिप्शन उपलब्ध नहीं है'},
    {text: 'केवल विशिष्ट कॉलम को एन्क्रिप्ट करें'},
  ]}
>
  <slot name="question">
  <div className="question">
    RDS कौन-सी एन्क्रिप्शन क्षमताएँ प्रदान करता है?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    RDS एन्क्रिप्शन विशेषताएँ:
    - KMS का उपयोग करके स्थैतिक डेटा को एन्क्रिप्ट करें
    - SSL/TLS का उपयोग करके संचरण में डेटा को एन्क्रिप्ट करें
    - डेटाबेस बनाए जाते समय एन्क्रिप्शन सक्षम करें
    - संवेदनशील जानकारी की रक्षा करें
    - सुरक्षा मानकों के साथ अनुपालन

    [RDS एन्क्रिप्शन विकल्प](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/encryption-options.html)
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={18}
  group="DynamoDB Streams"
  title="डीएनडीबी स्ट्रीम्स के उद्देश्य"
  options={[
    {text: 'अतिरिक्त डेटा कॉपियाँ संग्रहित करें'},
    {text: 'ग्रीन वेंडर्स के लिए डीएनडीबी क्रेडिट्स', hint: 'वाकई?'},
    {text: 'लिखने के प्रदर्शन को बढ़ाएं', hint: 'स्ट्रीम्स होते हैं'},
    {text: 'इवेंट-ड्राइव्ड एर्किटेक्चर के लिए आइटम-लेवल परिवर्तन पकड़ें', isAnswer: true},
    {text: 'ग्लोबल सेकेंडरी इंडेक्स के विकल्प', hint: 'क्या आप अनुमान लगा रहे हैं?'},
  ]}
>
  <slot name="question">
  <div className="question">
    डीएनडीबी स्ट्रीम्स के प्राथमिक उपयोग क्या है?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    डीएनडीबी स्ट्रीम्स:
    - आइटम-लेवल परिवर्तनों को पकड़ते हैं
    - इवेंट-ड्राइव्ड एर्किटेक्चर को सक्षम करते हैं
    - लैम्ब्डा फंक्शन को ट्रिगर करते हैं
    - क्रॉस-रीजन रिप्लिकेशन का समर्थन करते हैं
    - निकट वास्तविक समय में डेटा प्रसारण प्रदान करते हैं

    [DynamoDB स्ट्रीम्स अवलोकन](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Streams.html)
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={19}
  group="S3 ट्रांसफ़र"
  title="बड़े फ़ाइल ट्रांसफ़र"
  options={[
    {text: 'हमेशा एकल PUT अनुरोध का उपयोग करें'},
    {text: 'बड़ी फ़ाइलों के लिए मल्टीपार्ट अपलोड का उपयोग करें', isAnswer: true, hint: 'S3 के लिए अनुशंसित तरीका'},
    {text: 'अपलोड करने से पहले संपीड़ित करें', hint: 'फ़ाइल आकार कम कर सकता है'},
    {text: 'अपलोड से पहले मैन्युअल रूप से विभाजित करें', hint: 'असुविधाजनक हो सकता है'},
  ]}
>
  <slot name="question">
  <div className="question">
    S3 में बड़ी फ़ाइलों को अपलोड करने का सबसे अच्छा तरीका क्या है?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    मल्टीपार्ट अपलोड लाभ:
    - बड़ी फ़ाइलों को कुशलता से हैंडल करें
    - अंतर्विरोध अपलोड को फिर से शुरू करें
    - फ़ाइल भागों का समानांतर अपलोड
    - 100MB से अधिक फ़ाइलों के लिए अनुशंसित
    - नेटवर्क विश्वसनीयता में सुधार

    [S3 मल्टीपार्ट अपलोड](https://docs.aws.amazon.com/AmazonS3/latest/userguide/mpuoverview.html)
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={20}
  group="लागत अनुकूलन"
  title="संग्रहण लागत विश्लेषण"
  options={[
    {text: 'सभी डेटा के लिए S3 मानक', hint: 'दैनिक पहुंच के लिए अच्छा, लेकिन अधिक लागत वाला'},
    {text: 'हमेशा सस्ते संग्रहण का उपयोग करें', hint: 'पुनर्प्राप्ति लागत को ध्यान में रखें'},
    {text: 'पहुंच पैटर्न के आधार पर संग्रहण वर्गों का मिश्रण करें', isAnswer: true, hint: 'अनुकूलित संतुलन के लिए सबसे अच्छा'},
    {text: 'सबकुछ Glacier में संग्रहित करें', hint: 'अत्यधिक लंबे समय तक अनुपलब्ध डेटा के लिए उपयुक्त'},
  ]}
>
  <slot name="question">
  <div className="question">
    1 पीबी डेटा के लिए सबसे लागत-प्रभावी दृष्टिकोण क्या है जिसमें 20% दैनिक, 30% मासिक और 50% वार्षिक पहुंच है?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    अनुकूलित संग्रहण रणनीति:
    - दैनिक पहुंच के लिए 20% S3 मानक में
    - मासिक पहुंच के लिए 30% S3 मानक-IA में
    - वार्षिक पहुंच के लिए 50% Glacier में

    यह दृष्टिकोण लागत को अनुकूलित करते हुए उपयुक्त पहुंच पैटर्न बनाए रखता है।

    लागत विचाराधीन:
    - जीबी प्रति संग्रहण मूल्य
    - पुनर्प्राप्ति लागत
    - पहुंच पैटर्न
    - स्थानांतरण लागत
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={21}
  group="डाइनामोडीबी संसंगति"
  title="संसंगति मॉडल"
  options={[
    {text: '100 प्रति सेकंड पठन', isAnswer: true},
    {text: '50 प्रति सेकंड पठन'},
    {text: '200 प्रति सेकंड पठन'},
    {text: 'असीमित प्रति सेकंड पठन'},
  ]}
>
  <slot name="question">
  <div className="question">
    एक डाइनामोडीबी तालिका में 100 आरसीयू की निर्धारित पठन क्षमता है। 4 केबी आइटमों के लिए प्रति सेकंड कितने मजबूत तौर पर संसंगत पठन किए जा सकते हैं?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    डाइनामोडीबी संसंगति मॉडल को समझना महत्वपूर्ण है:

    - 1 आरसीयू = 4 केबी तक के आइटमों के लिए प्रति सेकंड 1 मजबूत तौर पर संसंगत पठन
    - 1 आरसीयू = 4 केबी तक के आइटमों के लिए प्रति सेकंड 2 अंततः संसंगत पठन

    इसलिए:
    - 100 आरसीयू = 100 मजबूत तौर पर संसंगत 4 केबी पठन/सेकंड
    - 100 आरसीयू = 200 अंततः संसंगत 4 केबी पठन/सेकंड

    संसंगति मॉडल चुनते समय ध्यान दें:
    - अनुप्रयोग की आवश्यकताएँ
    - लागत विचार
    - प्रदरस्ता आवश्यकताएँ
    - डेटा ताजगी की आवश्यकताएँ
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={22}
  group="Aurora उच्च उपलब्धता"
  title="Aurora फेलओवर मैकेनिज्म"
  options={[
    {text: 'मन:रोकथाम की आवश्यकता होती है'},
    {text: 'एप्लिकेशन को पुन: निर्माण करना आवश्यक है'},
    {text: 'हमेशा सबसे पुराने रिप्लिका पर फेलओवर करता है'},
    {text: 'फेलओवर प्राथमिकता टाइर पर आधारित स्वचालित बढ़त', isAnswer: true},
  ]}
>
  <slot name="question">
  <div className="question">
    कई पढ़ने वाले रिप्लिका वाले Aurora क्लस्टर में, प्राथमिक इंस्टेंस विफल होने पर स्वचालित फेलओवर के दौरान क्या होता है?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Aurora फेलओवर प्रक्रिया:
    1. प्राथमिक इंस्टेंस विफलता का पता लगाता है
    2. मुख्य रूप से फेलओवर प्राथमिकता टाइर पर आधारित Aurora रिप्लिका का चयन करता है
    3. जब प्राथमिकताएँ मेल खाती हैं तो इंस्टेंस विशेषताओं का उपयोग बराबरी के मामलों में करता है
    4. क्लस्टर एंडपॉइंट को स्वचालित रूप से अपडेट करता है

    सर्वोत्तम अभ्यास:
    - AZs में अनेक रिप्लिका बनाए रखें
    - प्रमोशन टाइयर को उद्देश्यपूर्वक निर्धारित करें
    - एप्लिकेशन में क्लस्टर एंडपॉइंट का उपयोग करें
    - नियमित रूप से फेलओवर परिदृश्यों का परीक्षण करें
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={23}
  group="S3 एकसंगतता"
  title="S3 मजबूत एकसंगतता"
  options={[
    {text: 'केवल नए ऑब्जेक्ट्स के लिए'},
    {text: 'सभी ऑपरेशन्स के लिए मजबूत एकसंगतता', isAnswer: true},
    {text: 'अपडेट्स के लिए अंततः एकसंगत'},
    {text: 'क्षेत्र पर निर्भर करता है'},
  ]}
>
  <slot name="question">
  <div className="question">
    2020 के अंत में, सभी ऑपरेशन्स के लिए S3 किस एकसंगतता मॉडल को प्रदान करता है?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    S3 एकसंगतता मॉडल:
    - सभी ऑपरेशन्स के लिए मजबूत रीड-अफ्टर-राइट एकसंगतता
    - PUTs और DELETEs पर लागू होता है
    - पहले इस्तेमाल किए गए वर्कआराउंड की आवश्यकता नहीं होती
    - कोई अतिरिक्त लागत नहीं होती

    प्रभाव:
    - एप्लिकेशन लॉजिक कम्प्लिकेशन कम करता है
    - एकसंगतता जाँच की आवश्यकता नहीं होती
    - राइट्स के बाद तुरंत रीड करना संभव होता है
    - एप्लिकेशन की विश्वसनीयता में सुधार होता है
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={24}
  group="DynamoDB विशेषताएं"
  title="समय तक जीवित (TTL)"
  options={[
    {text: 'समाप्ति पर तुरंत आइटम हटाता है'},
    {text: 'मानव हटाने की आवश्यकता होती है'},
    {text: 'पृष्ठभूमि में सर्वोत्तम प्रयास वाला हटाना', isAnswer: true},
    {text: 'आइटम समाप्त हो जाते हैं लेकिन उन्हें संग्रहीत रखता है'},
  ]}
>
  <slot name="question">
  <div className="question">
    DynamoDB की TTL विशेषता आइटम हटाने को कैसे संभालती है?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    DynamoDB TTL विशेषताएं:
    - पृष्ठभूमि प्रक्रिया TTL गुण की निगरानी करती है
    - समाप्त आइटम सर्वोत्तम प्रयास तालिका पर हटाए जाते हैं, आमतौर पर कुछ दिनों के भीतर
    - TTL के लिए अतिरिक्त लागत नहीं होती है
    - हटाए गए आइटम स्ट्रीम में दिखाई देते हैं

    उपयोग के मामले:
    - सत्र प्रबंधन
    - लॉग समाप्ति
    - अस्थायी डेटा साफ-सफाई
    - विनियमन अनुपालन
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={25}
  group="Aurora Serverless"
  title="पैमाने का व्यवहार"
  options={[
    {text: 'पैमाने की गति वर्तमान और निर्धारित क्षमता पर निर्भर करती है', isAnswer: true},
    {text: 'आवश्यकता पर तुरंत पैमाना बढ़ाता है'},
    {text: 'केवल पूर्व-सेट अंतराल पर पैमाना बढ़ाता है'},
    {text: 'केवल मानवीय पैमाना बढ़ाता है'},
  ]}
>
  <slot name="question">
  <div className="question">
    अचानक ट्रैफ़िक बढ़ोतरी को संभालने के लिए Aurora Serverless पर निर्भर करने पर मुख्य बात क्या है?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Aurora Serverless पैमाना:
    - Aurora Serverless v2 क्षमता को ACU के बारीक-बारीक वृद्धि में पैमाना बढ़ाता है
    - पैमाने की गति वर्तमान क्षमता और न्यूनतम/अधिकतम ACU सेटिंग्स पर निर्भर करती है
    - समर्थित संस्करण ACUs के 0 पर स्वचालित रूप से रोक सकते हैं यदि निर्धारित किया गया हो
    - ACUs पर सेकंड-वार बिलिंग

    सर्वोत्तम अभ्यास:
    - महत्वपूर्ण कार्यभारों पर अचानक बढ़ोतरी के लिए न्यूनतम क्षमता उचित स्तर पर सेट करें
    - पैमाना घटनाओं की निगरानी करें
    - कनेक्शन प्रबंधन को ध्यान में रखें
  </div>
  </slot>
</Challenge>

</QuizUI>

वाह, यह खोज बहुत गहराई तक पहुंच गई! 🚀☁️  
आशा करते हैं कि आपने इस यात्रा का आनंद लिया और शायद AWS स्टोरेज सर्विसेज के बारे में कुछ चीजें सीख ली।  

[डैन के चुनौतियां](/challenges/) और देखें! 🧠  

कानूनी: यह प्रश्नोत्तरी केवल शिक्षामूलक उद्देश्यों के लिए है। सभी ट्रेडमार्क और प्रतियोगिता उनके संबंधित मालिकों की हैं, खासकर बड़े नामों की।
````
