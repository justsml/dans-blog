# Translation Candidate
- Slug: stop-the-angularjs-hate
- Locale: hi
- Model: openrouter/qwen/qwen3-32b:nitro
- Target: src/content/posts/2015-03-10--stop-the-angularjs-hate/hi/index.mdx
- Validation: rejected: direct AI SDK translation failed
- Runtime seconds: 14.94
- Input tokens: 5337
- Output tokens: 6459
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- Estimated cost: $0.001977
- Pricing source: local-openrouter-estimate
- Note: Command failed: bun run i18n:validate --slug stop-the-angularjs-hate --locale hi
## Raw Output

````mdx
---
social_image: ../desktop-social.webp
title: AngularJS ट्रिक्स
subTitle: ''
date: '2015-02-26'
modified: '2016-02-01'
category: Code
subCategory: angularjs
tags:
  - angularjs
  - development
  - performance
  - programming
cover: ../sharon-mccutcheon-522851-unsplash.webp
cover_mobile: ../w300_sharon-mccutcheon-522851-unsplash.webp
cover_icon: ../icon_sharon-mccutcheon-522851-unsplash.webp
---
## AngularJS मज़ेदार हो सकता है!

> लिए: AngularJS v1.x

1. AngularJS विकासकर्ता जल्दी से जान जाते हैं कि उनके मध्यम-बड़े एप्लिकेशन `$watch` के फैले हुए उपयोग और `$scope` जैसे बोझिल सहायक के कारण भार के तहत टूट रहे हैं।  
2. अपने `$scope` को अतिरिक्त UI स्थिति से मुक्त रखें, पूरे हिरार्की के आकार और गहराई को सीमित करने की कोशिश करें।  

### द्विदिश संबंध: द्वितीयक तलवार  

द्विदिश बाइंडिंग के कारण अन्य फ्रेमवर्क जैसे Backbone से आना, ठीक है, **अमेजिंग** हो जाता है।  

समस्या यह है: कई साइटें Angular के डिज़ाइन पैटर्न का **अत्यधिक उपयोग** करती हैं।  
इसके परिणामस्वरूप डायरेक्टिव फैलाव और `$scope/rootScope` होता है, जिसमें आसानी से हजारों उदाहरण हो सकते हैं, और यह बड़े ऑब्जेक्ट्स के साथ जुड़ा रह सकता है, जिससे प्रभावी गारबेज कलेक्शन के कोई भी उम्मीद नहीं रह जाती।

आप जानते हैं कि यह कहाँ जा रहा है: एक थके हुए ब्राउज़र! हमेशा के लिए बेजान गति से काम करने के लिए निर्धारित, अंतहीन और पुनरावृत्ति युक्त UI/DOM के पुनर्कम्पाइल करने के लिए।

### अत्यधिक एंगुलर.जेएसी करना बंद करें

> “अगर आपका केवल उपकरण एक मुट्ठी है, तो हर समस्या एक कील लगती है।”
>
> - पुरानी कहावत

क्या आपके एप्लिकेशन में डायरेक्टिव की समस्या है?

```jade
current-user-status-label
  div(ng-if='loggedIn')
    view-user-surplusage(ng-if='!editMode')
      .head: contact-details(user='user')
      .tool: contact-buttons(loggedIn='loggedIn')
      a.edit-icon(ng-click='editMode = true')
    edit-user-surplusage(ng-if='editMode')
      .head: avatar-edit(user='user')
      .body: edit-contact-details(user='user')
      a.save-icon(ng-click='editMode = false')
```

एक लचीला उपयोगकर्ता-विजेट डिज़ाइन करें जो इन्हें सहायता प्रदान करे:

1.  विविध घटकीकरण सूखे एंगुलर कोड के साथ  
1.  समझदार डायरेक्टिव, न्यूनतम डायरेक्टिव आकार/गहराई के साथ (आपके ng-repeats का ध्यान रखें)  
1.  सरल सेवा परत  
1.  लागू करने के लिए वास्तविक कोडिंग कम हो - केवल HTML/विचार कोड

```jade
// jade
user-widget
  div(ng-if='loggedIn')
    div.edit(ng-if='editMode')
      h4.email-icon: input(type='email', ng-model='user.email')
      h4.phone-icon: input(type='email', ng-model='user.phone')
      a.save-icon(ng-click='editMode = false')
    div.show(ng-if='!editMode')
      h1.users-icon {{ user.name  }}
      h4.email-icon {{ user.email }}
      h4.phone-icon {{ user.phone }}
      a.edit-icon(ng-click='editMode = true')
  div(ng-if='!loggedIn')
    h5: i Welcome User
    a.btn(href='/login') Login
```

## समाधान

### एंगुलर सुझाव

1.  एकल दिशा बाइंडिंग का उपयोग करें (उदाहरण: `{ :: title }` )
1.  डायरेक्टिव के पुनरावृत्ति नेस्टिंग को सीमित करें
1.  और अगर आपको डायरेक्टिव को नेस्ट करना ही है, तो कभी भी `ng-repeat` के अंदर ऐसा न करें - प्रदरसन प्रदरसन की गति `O(n^2)^3` जैसी होने लगेगी ;)
    I. फैक्टरी पैटर्न का उपयोग करके प्राकृतिक JS/DOM कोड के साथ बुनियादी DOM/UI अंश बनाएं, उदाहरण: मॉडल संदेश बॉक्स, स्टेटस बार। UI फैक्टरी को या तो डायरेक्टिव या कंट्रोलर से कॉल करें।
1.  _बोनस:_ [ब्राउज़र रेंडर लाइफसाइकल](https://developers.google.com/web/fundamentals/performance/rendering/index?hl=en) के लागत और ट्रिगर को समझें: एनिमेशन, कॉम्पोजिट रेंडरिंग, रिफ्लो

### परियोजना को संगठित करने के लिए ब्राउज़रीफ़ि का उपयोग करें

एंगुलर के लिए विशेष रूप से नहीं, लेकिन सरल निर्भरता निर्णय के लिए आवश्यक है।

[ब्राउज़रीफ़ि](https://github.com/substack/browserify-handbook/blob/master/readme.markdown#exports) जेएस परियोजनाओं को लगभग कोई अतिरिक्त कोड ओवरहेड के साथ प्रबंधनीय बनाता है (ठीक है, कुछ सौ अक्षर)।
```

[ब्राउज़रीफ़ि हैंडबुक](https://github.com/substack/browserify-handbook/) के [इस अनुभाग](https://github.com/substack/browserify-handbook/blob/master/readme.markdown#exports) को पढ़ें।

## वैकल्पिक विकल्प

### [फेसबुक का ReactJS](https://facebook.github.io/react/)

अगर आपके पास बहुत सारे छोटे पुनः उपयोगी UI कंपोनेंट हैं - ReactJS शायद एक बेहतर विकल्प होगा:

- अगर आपका परियोजना...?:
  - UI/DOM के कार्यान्वयन में एंगुलर से अलग दर्शन है
  - पहले से किसी प्रकार का 'फ्रेमवर्क' है - आप **ReactJS का उपयोग AngularJS, Ember, Backbone के साथ** कर सकते हैं। (हालांकि, यद्यपि संभव हो तो इसे टालें।)
  - अपने कोड में बार-बार डेटा मॉडल परिवर्तन करता है, तो आपको एंगुलर में digest/loop पैटर्न की ADHD की तरह प्रकृति से बचकर लाभ होगा

### [गूगल का पॉलिमर प्रोजेक्ट](http://www.Polymer-Project.org/)

### शुद्ध JS दृष्टिकोण

- बता दें कि यहां मैं फ्रेमवर्क-अनिर्भर कोड बनाने की कोशिश कर रहा हूं (+1 परीक्षण योग्यता, +1 पुनः उपयोग)
  1.  डेटा लोड करने के लिए सामान्य जावास्क्रिप्ट कक्षा का उपयोग करें (एएजीएक्स/जेएसओएनपी/पृष्ठ में अंतर्निहित, आदि।)
  1.  एचटीएमएल स्ट्रिंग्स बनाने के लिए मस्तीश टेम्पलेटिंग का उपयोग करें (या डोम अनुक्रमित रूप से)
  1.  यदि आप सक्षम हैं तो स्थानीय भंडारण में रेंडर किए गए सामग्री को कैश करें
  1.  (वैकल्पिक) अब एक घटना सुनवाईकर्ता जोड़ें जो सामग्री को पुनः रेंडर करे। मैंने घटना नाम `refresh.<class-name>` पर मानकीकृत कर लिया है।
````
