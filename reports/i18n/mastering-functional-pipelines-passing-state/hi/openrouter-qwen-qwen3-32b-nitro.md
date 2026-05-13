# Translation Candidate
- Slug: mastering-functional-pipelines-passing-state
- Locale: hi
- Model: openrouter/qwen/qwen3-32b:nitro
- Target: src/content/posts/2023-08-13--mastering-functional-pipelines-passing-state/hi/index.mdx
- Validation: rejected: direct AI SDK translation failed
- Runtime seconds: 78.15
- Input tokens: 10452
- Output tokens: 12539
- Thinking tokens: unknown
- Cached input tokens: 512
- Cache write tokens: 0
- Estimated cost: $0.003846
- Pricing source: local-openrouter-estimate
- Note: Command failed: git add src/content/posts/2023-08-13--mastering-functional-pipelines-passing-state/hi/index.mdx reports/i18n/mastering-functional-pipelines-passing-state/hi
## Raw Output

````mdx
---
social_image: ../desktop-social.webp
title: 'मास्टर ऑफ़ पाइपलाइन: स्थिति स्थानांतरण'
subTitle: 'नमस्ते क्लोजर, मेरे पुराने साथी।'
date: '2023-08-09'
modified: '2024-07-30'
tags:
  - typescript
  - closure
  - stateful
  - scoping
  - hoisting
  - functional
  - pipeline
category: Guides
subCategory: JavaScript
cover: ../sven-kucinic-LxYxC6jdjcA-unsplash-cropped-1200.webp
cover_mobile: ../w300_sven-kucinic-LxYxC6jdjcA-unsplash-cropped-1200.webp
cover_icon: ../icon_sven-kucinic-LxYxC6jdjcA-unsplash-cropped-1200.webp
---
## पाइपलाइन्स के मास्टर: स्टेट पास करना  

क्या आपने फंक्शनल पाइपलाइन्स का उपयोग करके स्टेट पास करने में कठिनाइयों का अनुभव किया है?  

आपके कोड का संगठन (या उसकी कमी) सीधे तौर पर इस बात पर प्रभाव डालता है कि स्टेट को पास करना कितना सुगम है।  

इस लेख में हम एक प्रभावी तकनीक का अन्वेषण करेंगे जो पाइपलाइन में स्टेट पास करने में मदद करती है। इस रास्ते में हम अपने कोड के संगठन और पठनीयता को भी सुधारेंगे।  

निम्नलिखित 'वास्तविक' स्निपेट हमारे लेख का ध्यान केंद्र होगा: एक चेकआउट फंक्शन, जो एक `userId` और एक `products` के सरणी को स्वीकृत करता है। यह एक प्रमिस-चेन लौटाता है जो अनुक्रम में 4 फंक्शन को निष्पादित करता है।  

```tsx
const checkout = (userId: number, products: number[]) => {
  return getProductsSubtotal(userId, products)
    .then(subTotal => applyTaxes(userId, subTotal))
    .then(total => purchaseProducts(userId, total))
    .then(result => sendReceipt(userId, result));
};
```  

रुको, यह कोड वास्तव में बेहद अच्छा है, जितना कि JS में पाइपलाइन हो सकती है!

इसमें कुछ छोटी समस्याएँ हैं जो एक साथ आकर बड़ी समस्याओं में बदल सकती हैं।  

एक समस्या यह है कि हम `userId` को प्रत्येक (तार्किक रूप से संबंधित) फंक्शन में दोहराकर पास कर रहे हैं।  
अब इसके साथ एक और समस्या जो विकासकर्ताओं और यहां तक कि TypeScript द्वारा भी आसानी से नजर अंदाज की जाती है: संख्यात्मक आर्ग्यूमेंट्स को बदलना चुपचाप बग बना देता है। (देखें `applyTaxes` और `purchaseProducts`। _क्या पहले `userId` था या `amount`?_)  

इस कोड को सुधारने का तरीका निर्धारित करने से पहले, चलिए कुछ लाभ/अलाभों की पहचान करते हैं।  

### लाभ और अलाभ  

#### लाभ  

- क्लोजर का अच्छा उपयोग! `userId` और `products` को एक बार पास करना!  
- आर्ग्यूमेंट्स का नामकरण संगत है।  
- चेकआउट के लिए 4 मुख्य फंक्शन की अपेक्षाकृत प्रभावी और संक्षिप्त संयोजन।  
- "मुफ्त" त्रुटि प्रवाह नियंत्रण। (कोई भी नेस्टेड फंक्शन से त्रुटि `checkout()` द्वारा लौटाए गए Promise में बाधा डालती है।)

#### अलाभ  

- पुनः पुनः `userId` को पास करना बोरिंग हो सकता है।  
- फंक्शन एकल-पैरामीटर (अर्थात् यूनरी) नहीं हैं। _यह संयोज्यता को प्रभावित करता है। [अंतिम उदाहरण](#checkout-with-further-improvements) क्यों? के लिए देखें।_  
- प्रत्येक फंक्शन द्वारा क्या लौटाया जाता है यह अक्सर स्पष्ट नहीं होता। (क्या ईमेल भेजने का परिणाम है, या वह `result` वैरिएबल? या कुछ और?)  
- सुविधा जोड़ने का तरीका स्पष्ट नहीं है (उदाहरण के लिए, मान लीजिए हमें ग्राहक छूट/क्रेडिट/बिंदु आदि लोड करने की आवश्यकता है।)  
- कभी-कभी “अस्थायी” पैरामीटर नाम (जैसे कि प्रत्येक `.then(param => {})` में) संदर्भ प्रदान करते हैं। हालांकि समय के साथ, वे संभवतः नामकरण के अपवाह का आवास बन जाएंगे।  

### हल, भाग 1: एक मॉड्यूल बनाएँ!  

यह तकनीक जुड़े हुए फंक्शनों को एकल मॉड्यूल (जैसे `CartHelpers`) में संगठित करने के बारे में है। इसके लिए एक विशिष्ट पैटर्न की आवश्यकता नहीं है। [फैक्टरी फंक्शन](#carthelpers-factory), [क्लासेस](#carthelpers-class), क्लोजर्स, मिक्सिन आदि का अन्वेषण करें। अपने प्रोजेक्ट और टीम के लिए क्या बनता है उसे खोजें।  

#### `CartHelpers` फैक्टरी  

`CartHelpers` मॉड्यूल का उदाहरण, जहाँ `userId` एक बार पास किया जाता है, और सभी मेथड्स एकल-पैरामीटर होते हैं।

```tsx
const CartHelpers = (userId: number) => {
  return {
    getProductsSubtotal: products => getProductsSubtotal(userId, products),
    applyTaxes: subTotal => applyTaxes(userId, subTotal),
    purchaseProducts: total => purchaseProducts(userId, total),
    sendReceipt: invoice => sendReceipt(userId, invoice)
  };
};
```

#### `CartHelpers` क्लासेस  

अगर आपको क्लासेस अधिक पसंद हैं, तो यह बनाना आसान है:  

```tsx
class CartHelpers {
  constructor(userId) {
    this.userId = userId;
  }
  getProductsSubtotal = products => getProductsSubtotal(this.userId, products);
  applyTaxes = subTotal => applyTaxes(this.userId, subTotal);
  purchaseProducts = total => purchaseProducts(this.userId, total);
  sendReceipt = invoice => sendReceipt(this.userId, invoice);
}
```

कुछ तुरंत लाभ:  

- अनावश्यक चर पासिंग को खत्म करें।  
  - DRY: `CartHelpers` में `userId` के पुनरावृत्ति को छिपाता है।  
  - प्रत्येक मेथड केवल आवश्यक तर्कों को स्वीकार करता है। `cart.applyTaxes(subTotal)` पढ़ने में पूरी तरह से स्पष्ट है।  
- `CartHelpers` में एकल-तर्क फंक्शन अधिक पठनीय होते हैं, और उद्देश्य स्पष्ट होता है।  

संबंधित फंक्शनों के समूहन द्वारा, हम बाहरी सतह को कम करने का अवसर बनाते हैं (उदाहरण के लिए `checkout()`, `CartHelpers` के 'पब्लिक' मेथड्स।)  

> कम सतह क्षेत्र === कम बुद्धिमान भार, बेहतर टेस्टिंग और रखरखाव।  
> _इंटेंशन और फोकस के साथ डिज़ाइन सिस्टम। ✨_

#### चेकआउट और कार्टहेल्पर्स का उपयोग

चलिए देखते हैं कि `checkout()` फंक्शन अब कैसा दिखता है:

```tsx
export const checkout = ({ userId, products }) => {
  const cart = CartHelpers(userId);

  return Promise.resolve(products)
    .then(products => cart.getProductsSubtotal(products))
    .then(subTotal => cart.applyTaxes(subTotal))
    .then(total => cart.purchaseProducts(total))
    .then(result => cart.sendReceipt(result));
};
```

##### आगे के सुधार के साथ चेकआउट

> क्या इसे आगे सुधारा जा सकता है? निश्चित रूप से! हमें तर्कों को दोहराने की आवश्यकता भी नहीं है!

जब फंक्शन के तर्क पिछले फंक्शनों के आउटपुट द्वारा प्रदान किए जाते हैं, तो आप कोड को और अधिक सरल बना सकते हैं।

```tsx
export const checkout = ({ userId, products }) => {
  const cart = CartHelpers(userId);

  // 🌈 फंक्शन लेगो की तरह एक साथ रहते हैं और सामान्य 'मानव शब्दों' की तरह पढ़े जाते हैं 💅
  return Promise.resolve(products)
    .then(cart.getProductsSubtotal)
    .then(cart.applyTaxes)
    .then(cart.purchaseProducts)
    .then(cart.sendReceipt);
};
```

**अगर आपको तर्कों को एकल (वस्तु) तर्कों में जोड़ने का अहसास प्राकृतिक नहीं हो रहा है,** तो अपने फंक्शनों को तोड़ने की बजाय उन्हें अधिक उचित रूप से सीमित मॉड्यूल में जोड़ने पर विचार करें।

#### कहाँ से शुरू करें?

संबंधित फंक्शन ढूंढें, और उन्हें एक साथ समूहित करें। (उदाहरण: `CartHelpers`।)

मॉड्यूल के संभावित तार्किक समूहों की खोज करते समय चुनौतियों में से एक पहले से ही संबंधित कोड की पहचान करना है।

##### फंक्शनों के संबंध को क्या बनाता है?

एक अच्छा टिप: फंक्शन पैरामीटर में पुनरावृत्ति ढूंढें। क्या कोई संबंध या एक मूल जिम्मेदारी है?

- ✅ पुनरावृत्ति वाले, सामान्य तर्क वाले फंक्शन। (उदाहरण: अगर 4 विधियाँ `userRewards` स्वीकार करती हैं, तो संभावना है कि आपको `Rewards` या अन्य मॉड्यूल की आवश्यकता है।)
- ✅ ऐसे फंक्शन जिनके तर्क पिछले फंक्शन के आउटपुट द्वारा सीधे प्रदान किए जाते हैं। (कदमों की अनुक्रम। उदाहरण: `Extract`, `Transform`, `Load`।)
- ❌ फीचर क्षेत्र से गैर-विशिष्ट रूप से संबंधित कोई भी चीज, "उत्पाद खरीदारी?"
- ❌ ऐसे फंक्शन जिनमें सामान्य प्रीफिक्स या सुरुचि वाले नाम हों?
- ❌ ऐसे फंक्शन जिन्हें बड़े ऑब्जेक्ट्स के तर्क की आवश्यकता होती है, हालांकि वे उन ऑब्जेक्ट्स के अंदर केवल कुछ मानों का उपयोग करते हैं। (उदाहरण: `applyTaxes({ user, business, rewards, kitchenSink })` vs `applyTaxes({ subTotal })`)

हालांकि मॉड्यूल डिज़ाइन के लिए कोई एकल "सही उत्तर" नहीं है, लेकि:न यह पहचानना उपयोगी होता है कि संगठन के लिए 2-3 विकल्प हैं - एक आउटलाइन बनाएं, "कल्पना" कोड लिखें, "क्या यह खुशी उत्पन्न करता है?" पूछें।

<aside>
📌 अक्सर आपके डोमेन मॉडल को तैयार होने तक मॉड्यूल संगठन के कुछ प्रयास लगते हैं। इसे परफेक्ट बनाने पर ज्यादा ध्यान न दें।
</aside>

> आपको `cart.sendReceipt()` के भुगतान-संबंधित मेथड्स के साथ रहने का भाव नहीं हो सकता। शायद `customerNotifications.sendReceipt()` ग्राहक संदेश के लिए बेहतर स्थान है। अगर `CartHelper` काफी महत्वपूर्ण है, तो यह सभी आवश्यक **_सर्विसेस_** को आंतरिक रूप से कॉल करने वाला एक **_कंट्रोलर_** के रूप में काम कर सकता है, जैसे `customerNotifications`।

#### आप कैसे जानेंगे कि आप मदद कर रहे हैं?

अगर आप अनौपचारिक तर्कों को हटाते हुए पढ़ने की सुविधा कम नहीं होती, तो **बधाई हो!!!** आपने संभवतः एक स्पष्ट और दीर्घकालिक दायरा वाला मॉड्यूल बनाया है!

- बीच के तर्कों को हटाने से कुछ तहों को बलपूर्वक उत्पन्न करने की ओर धकेल देता है।
- अनौपचारिक कोड को गलत जगह पर डंप करने में कठिनाई होनी चाहिए!

तो, यह हमें एक सवाल पूछने के लिए मजबूर करता है, हम कहां फ़ंक्शनलिटी जोड़ते हैं?

मेरे अनुभव में फ़ंक्शनलिटी जोड़ते समय आमतौर पर मूल्यांकन करने वाली 2 प्राथमिक रणनीतियां होती हैं:

1.  मौजूदा विधि का विस्तार/पुनर्गठन करें। (जब नया कोड मौजूदा कोड से काफी निकट हो।)  
2.  श्रृंखला में वांछित स्थान पर एक नई (5वीं) फ़ंक्शन बनाएं। (मान लेते हुए कि नया कोड मौजूदा फ़ंक्शन से संबंधित नहीं है।)

अंततः, यह नए कार्यक्षमता के स्थान का निर्णय करने में आसानी लाता है। (जैसे `cart.applyDiscounts()`, `cart.applyTaxes()`, `rewards.getBalance()`।)

### निष्कर्ष

एक जटिल पाइपलाइन में स्टेट पास करना कठिन हो सकता है। हालांकि, थोड़ी पुनर्गठन अभ्यास के साथ, आप अधिक पठनीय कोड लिखते हुए खुद को पाएंगे, जिसमें कम मानसिक भार होगा।

सवाल? टिप्पणियाँ? चिंताएँ? कृपया [@justsml](https://x.com/justsml) या [ईमेल](mailto:dan@danlevy.net) पर संपर्क करें।

#### श्रृंखला के अगले हिस्से के लिए रुको रहें

हम बाहरी रूप से स्टेट का उपयोग करने और हमारे मॉड्यूल में कार्यक्षमता का विस्तार करने की जांच करेंगे!

#### संबंधित पठनीय

- [कंपोनेंट-ड्राइव्ड रिएक्ट दुनिया में भी ऐसी ही परेशानियाँ मौजूद हैं।](https://kyleshevlin.com/quit-your-yapping)
````
