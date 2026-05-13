# Translation Candidate
- Slug: stop-the-angularjs-hate
- Locale: hi
- Model: openrouter/openai/gpt-oss-120b:nitro
- Target: src/content/posts/2015-03-10--stop-the-angularjs-hate/hi/index.mdx
- Validation: passed
- Runtime seconds: 2.28
- Input tokens: 5471
- Output tokens: 1676
- Thinking tokens: unknown
- Cached input tokens: 2048
- Cache write tokens: 0
- Estimated cost: $0.000515
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
social_image: ../desktop-social.webp
title: AngularJS ट्रिक्स
subTitle: AngularJS मज़ेदार हो सकता है!
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
## AngularJS मज़ेदार बन सकता है!

> For: AngularJS v1.x

1.  AngularJS डेवलपर्स जल्दी ही पाते हैं कि उनके मध्यम‑से‑बड़े ऐप्स बिखरे हुए `$watch` और अक्सर फ़ूल‑फ़ुल्ला सहारा `$scope` के वजन के नीचे झुक रहे हैं।
2.  अपने `$scope` को अतिरिक्त UI स्टेट से मुक्त रखें, अपनी समग्र हाइरार्की का आकार और गहराई सीमित करने की कोशिश करें।

### 2‑way डेटा बाइंडिंग: 2‑way Sword

सिर्फ 2‑way बाइंडिंग ही अन्य फ्रेमवर्क जैसे Backbone से आए लोगों को **फ्रिकिन अमेज़बॉल्स** बना देती है।

समस्या यह है: कई साइटें **क्रोनिकली ओवरयूज़** करती हैं Angular के डिज़ाइन पैटर्न को।  
यह डायरेक्टिव स्प्रॉल और एक `$scope/rootScope` की ओर ले जाता है जिसके हजारों इंस्टेंस हो सकते हैं, और यह बड़े ऑब्जेक्ट्स से चिपक कर प्रभावी गार्बेज कलेक्शन की कोई आशा नहीं छोड़ता।

आप जानते हैंकि इसका परिणाम क्या होगा: एक थका‑हुआ ब्राउज़र! लगातार **उतावले गति** से काम करने को मजबूर, अनंत और दोहराव वाले UI/DOM पुनः‑संकलन को चलाते हुए।

### OVER‑Angular.JSification को रोकें

> “यदि आपका एकमात्र उपकरण हथौड़ा है, तो हर समस्या को एक कील जैसा दिखता है।”
> 
> – पुरानी कहावत

क्या आपके ऐप में डायरेक्टिव्स की समस्या है?

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

चलिए एक लचीला यूज़र‑विजेट डिज़ाइन करते हैं जो मदद करे:

1.  DRY Angular कोड के साथ बहुमुखी घटक‑निर्माण  
2.  समझने योग्य डायरेक्टिव्स, न्यूनतम आकार/गहराई (अपने ng‑repeat का ध्यान रखें)  
3.  सरल सर्विस लेयर  
4.  लागू करने के लिए बहुत कम कोड – केवल HTML/View कोड ही पर्याप्त है

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

### Angular टिप्स

1.  1‑तरफ़ा बाइंडिंग उपयोग करें (उदा. `{ :: title }` )
2.  निर्देशकों की पुनरावर्ती नेस्टिंग को सीमित रखें
3.  यदि निर्देशकों को नेस्ट करना ही पड़े, तो उन्हें `ng-repeat` के अंदर **कभी भी** न रखें – प्रदर्शन `O(n^2)^3` जैसा बिगड़ सकता है ;)
    I. बेसिक DOM/UI फ्रैगमेंट बनाने के लिए फ़ैक्टरी पैटर्न में नेटिव JS/DOM कोड लिखें, उदाहरण: मोडल मैसेज बॉक्स, स्टेटस बार। UI फ़ैक्टरी को निर्देशकों या कंट्रोलर्स से कॉल करें।
4.  **बोनस:** [ब्राउज़र रेंडर लाइफ़साइकल](https://developers.google.com/web/fundamentals/performance/rendering/index?hl=en) के लागत और ट्रिगर को समझें: एनीमेशन, कॉम्पोज़िट रेंडरिंग, रीफ़्लो

### प्रोजेक्ट को व्यवस्थित करने के लिए Browserify का उपयोग करें

यह विशेष रूप से Angular के लिए नहीं है, लेकिन सरल डिपेंडेंसी रिज़ॉल्यूशन के लिए आवश्यक है।

[Browserify](https://github.com/substack/browserify-handbook/blob/master/readme.markdown#exports) जावास्क्रिप्ट प्रोजेक्ट को लगभग बिना अतिरिक्त कोड ओवरहेड के प्रबंधनीय बनाता है (ठीक है, कुछ सौ अक्षर)।

[Just read this section](https://github.com/substack/browserify-handbook/blob/master/readme.markdown#exports) of the [Browserify Handbook](https://github.com/substack/browserify-handbook/).

## विकल्प

### [ReactJS](https://facebook.github.io/react/) (फ़ेसबुक)

यदि आपके पास बहुत सारे छोटे पुन: उपयोग योग्य UI घटक हैं – ReactJS बेहतर विकल्प हो सकता है:

- यदि आपका प्रोजेक्ट...?:
  - UI/DOM कार्यान्वयन के लिए Angular से अलग दर्शन रखता है
  - पहले से ही कोई न कोई ‘फ़्रेमवर्क’ मौजूद है – आप **ReactJS को AngularJS, Ember, Backbone के साथ उपयोग** कर सकते हैं। (संभव हो तो इससे बचें)।
  - अपने कोड में बार‑बार डेटा मॉडल परिवर्तन संभालता है, तो आप Angular के डाइजेस्ट/लूप पैटर्न की ADHD‑जैसी जटिलता से बचकर लाभ उठाएंगे

### [Polymer Project](http://www.Polymer-Project.org/) (गूगल)

### Pure-er JS Approach

- वैसे, यहाँ मैं फ्रेमवर्क‑अज्ञेय कोड लिखने की कोशिश करता हूँ (+1 टेस्टेबिलिटी, +1 री‑यूज़)
  1.  डेटा लोड करने के लिए साधारण जावास्क्रिप्ट क्लास का उपयोग करें (AJAX/JSONP/पेज में एम्बेडेड, आदि)
  1.  Mustache टेम्प्लेटिंग से HTML स्ट्रिंग बनाएं (या सीधे DOM)
  1.  यदि संभव हो तो रेंडर किया गया कंटेंट `localStorage` में कैश करें
  1.  (वैकल्पिक) अब कंटेंट को फिर से रेंडर करने के लिए एक इवेंट लिस्नर जोड़ें। मैंने इवेंट नाम `refresh.<class-name>` को मानकीकृत किया है।
````
