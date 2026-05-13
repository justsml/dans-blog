# Translation Candidate
- Slug: mastering-functional-pipelines-passing-state
- Locale: hi
- Model: qwen/qwen3.6-plus
- Target: src/content/posts/2023-08-13--mastering-functional-pipelines-passing-state/hi/index.mdx
- Validation: rejected: direct AI SDK translation failed
- Runtime seconds: 240.02
- Input tokens: unknown
- Output tokens: unknown
- Thinking tokens: unknown
- Cached input tokens: unknown
- Cache write tokens: unknown
- Estimated cost: unknown
- Pricing source: unknown
- Note: Command failed after 240000ms: bun run i18n:translate:chunked -- --slug mastering-functional-pipelines-passing-state --locale hi --model qwen/qwen3.6-plus --chunk 6p --run-id 2026-05-13T19-05-13-381Z-80623 --run-lock-path /Users/dan/code/oss/dans-blog/.git/codex-i18n-translation-run.json --quiz-concurrency 24
## Raw Output

````mdx
---
social_image: ../desktop-social.webp
title: 'पाइपलाइनों के मास्टर: स्थिति पारित करना'
subTitle: 'हैलो क्लोज़र, मेरे पुराने दोस्त।'
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
## पाइपलाइनों के मास्टर: स्टेट पास करना

क्या आपने फंक्शनल पाइपलाइनों का उपयोग करके स्टेट पास करने में चुनौतियों का सामना किया है?

आपके कोड का संगठन (या उसकी कमी) सीधे तौर पर प्रभावित करता है कि स्टेट को कितनी आसानी से पास किया जा सकता है।

इस लेख में हम पाइपलाइन के माध्यम से स्टेट पास करने की एक प्रभावी तकनीक का पता लगाएंगे। इस दौरान हम अपने कोड के संगठन और पठनीयता में सुधार करेंगे।

निम्नलिखित "वास्तविक" स्निपेट इस लेख का फोकस होगा: एक checkout फंक्शन, जो `userId` और `products` की एक array स्वीकार करता है। यह एक Promise-chain लौटाता है जो क्रम में 4 फंक्शन निष्पादित करता है।

```tsx
const checkout = (userId: number, products: number[]) => {
  return getProductsSubtotal(userId, products)
    .then(subTotal => applyTaxes(userId, subTotal))
    .then(total => purchaseProducts(userId, total))
    .then(result => sendReceipt(userId, result));
};
```

एक सेकंड रुकिए, यह कोड वास्तव में काफी अच्छा है, जहाँ तक JS में पाइपलाइनों की बात है!

हालांकि, इसमें कुछ सूक्ष्म समस्याएँ हैं जो मिलकर बड़ी समस्याएँ बन सकती हैं।

एक समस्या यह है कि हम बार-बार `userId` को प्रत्येक (तार्किक रूप से संबंधित) फंक्शन में पास कर रहे हैं।
अब इसे एक और समस्या के साथ जोड़ें जो डेवलपर्स और TypeScript दोनों के लिए आसानी से छूट जाती है: संख्यात्मक आर्गुमेंट्स को पलटने से एक साइलेंट बग बनता है। (`applyTaxes` और `purchaseProducts` देखें। _क्या पहले `userId` आता है या `amount`?_)

इस कोड को बेहतर बनाने का तरीका तय करने से पहले, आइए कुछ पक्ष/विपक्ष पहचानें।

### पक्ष और विपक्ष

#### पक्ष

- क्लोज़र का अच्छा उपयोग! `userId` और `products` को एक बार पास करना!
- आर्गुमेंट नामकरण में एकरूपता।
- चेकआउट के लिए 4 मुख्य फंक्शनों की अपेक्षाकृत प्रभावी और संक्षिप्त रचना।
- "मुफ़्त" एरर फ़्लो कंट्रोल। (त्रुटियाँ किसी भी नेस्टेड फंक्शन से ऊपर आती हैं, `checkout()` द्वारा लौटाए गए Promise को रिजेक्ट करते हुए।)

#### नुकसान

- `userId` को बार-बार पास करना थकाऊ है।
- फंक्शन एकल-पैरामीटर (उर्फ यूनरी) नहीं हैं। _यह संयोजन क्षमता को प्रभावित करता है। क्यों, यह जानने के लिए [अंतिम उदाहरण](#checkout-with-further-improvements) देखें।_
- यह स्पष्ट नहीं होता कि प्रत्येक फंक्शन क्या लौटाता है। (क्या यह ईमेल भेजने का परिणाम है, या वह `result` वेरिएबल? या कुछ और?)
- कार्यक्षमता जोड़ने का तरीका स्पष्ट नहीं है (जैसे, मान लें हमें ग्राहक छूट/क्रेडिट/पॉइंट्स आदि लोड करने की आवश्यकता है।)
- कभी-कभी "अस्थायी" पैरामीटर नाम (जैसे प्रत्येक `.then(param => {})` में) संदर्भ जोड़ते हैं। हालांकि समय के साथ, वे संभवतः नामकरण की गंदगी का घर बन जाएंगे।

### समाधान, भाग 1: एक मॉड्यूल बनाएं!

यह तकनीक संबंधित फंक्शनों को एक एकल मॉड्यूल (जैसे `CartHelpers`) में व्यवस्थित करने के बारे में है। यह किसी विशिष्ट पैटर्न की मांग नहीं करती। [फैक्ट्री फंक्शन](#carthelpers-factory), [क्लासेज़](#carthelpers-class), क्लोज़र, मिक्सिन आदि का अन्वेषण करें। अपने प्रोजेक्ट और टीम के लिए जो उपयुक्त लगे, वह चुनें।

#### CartHelpers फैक्ट्री

`CartHelpers` मॉड्यूल का एक उदाहरण, जहाँ `userId` एक बार पास किया जाता है, और सभी विधियाँ एकल-आर्गुमेंट हैं।

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

#### CartHelpers क्लास

अगर क्लासेज़ आपकी पसंद हैं, तो इसे अपनाना आसान है:

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

कुछ तत्काल लाभ:

- बार-बार वेरिएबल पास करने की आवश्यकता समाप्त होती है।
  - DRY: `CartHelpers` बार-बार आने वाले आर्गुमेंट `userId` को एब्स्ट्रैक्ट कर देता है।
  - प्रत्येक विधि केवल आवश्यक आर्गुमेंट स्वीकार करती है। जिससे `cart.applyTaxes(subTotal)` पढ़ने में पूरी तरह से अपेक्षित हो जाता है।
- `CartHelpers` में एकल-आर्गुमेंट फंक्शन अधिक पठनीय होते हैं, जिनका उद्देश्य स्पष्ट होता है।

संबंधित फंक्शनों को समूहित करके, हम एक्सपोज़्ड सरफेस एरिया को कम करने का अवसर बनाते हैं (जैसे `checkout()`, `CartHelpers` की 'पब्लिक' विधियाँ)।

> कम सरफेस एरिया === कम संज्ञानात्मक भार, बेहतर परीक्षण और रखरखाव।
> _सिस्टम को इरादे और फोकस के साथ डिज़ाइन करें। ✨_

#### चेकआउट और CartHelpers का उपयोग

आइए देखें कि `checkout()` फंक्शन अब कैसा दिखता है:

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

##### और सुधारों के साथ चेकआउट

> क्या इसे और बेहतर बनाया जा सकता है? हाँ! हमें तर्कों को बिल्कुल दोहराने की ज़रूरत नहीं है!

जब किसी फंक्शन के तर्क पिछले फंक्शनों के आउटपुट द्वारा प्रदान किए जाते हैं, तो आप कोड को और भी सरल बना सकते हैं।

```tsx
export const checkout = ({ userId, products }) => {
  const cart = CartHelpers(userId);

  // 🌈 फंक्शन लेगो की तरह स्टैक होते हैं और सामान्य "मानव शब्दों" की तरह पढ़े जाते हैं! 💅
  return Promise.resolve(products)
    .then(cart.getProductsSubtotal)
    .then(cart.applyTaxes)
    .then(cart.purchaseProducts)
    .then(cart.sendReceipt);
};
```

**यदि पैरामीटरों को एकल (ऑब्जेक्ट) तर्कों में संयोजित करना अप्राकृतिक लगता है,** तो अपने फंक्शनों को तोड़ने **या** उन्हें अधिक उपयुक्त रूप से स्कोप किए गए मॉड्यूल में संयोजित करने पर विचार करें।

#### कहाँ से शुरू करें?

संबंधित फंक्शन खोजें, और उन्हें एक साथ समूहित करें। (जैसे `CartHelpers`।)

संभावित तार्किक मॉड्यूल खोजने की चुनौती का एक हिस्सा पहले स्थान पर संबंधित कोड की पहचान करना है।

##### फंक्शनों को संबंधित क्या बनाता है?

एक साफ-सुथरी तरकीब: फंक्शन पैरामीटरों में दोहराव खोजें। पूछें कि क्या कोई संबंध काम कर रहा है? या कोई अंतर्निहित जिम्मेदारी?

- ✅ बार-बार आने वाले सामान्य तर्कों वाले फंक्शन। (जैसे यदि 4 विधियाँ `userRewards` स्वीकार करती हैं, तो संभावना है कि आपको `Rewards` या कोई अन्य मॉड्यूल चाहिए।)
- ✅ ऐसे फंक्शन जिनके तर्क सीधे पिछले फंक्शनों के आउटपुट द्वारा प्रदान किए जाते हैं। (चरणों का क्रम। जैसे `Extract`, `Transform`, `Load`।)
- ❌ फीचर क्षेत्र से अस्पष्ट रूप से संबंधित कोई भी चीज़, "उत्पाद खरीदना?"
- ❌ सामान्य उपसर्ग या प्रत्यय नामकरण वाले फंक्शन?
- ❌ ऐसे फंक्शन जिन्हें तर्क के रूप में बड़ी ऑब्जेक्ट की आवश्यकता होती है, जबकि वे उन ऑब्जेक्ट के अंदर से केवल कुछ मानों का उपयोग करते हैं। (जैसे `applyTaxes({ user, business, rewards, kitchenSink })` बनाम `applyTaxes({ subTotal })`)

मॉड्यूल डिज़ाइन करने का कोई एक "सही उत्तर" नहीं है, लेकिन संगठन के 2-3 विकल्पों की पहचान करना मददगार होता है - एक रूपरेखा बनाएं, "काल्पनिक" कोड लिखें, पूछें "क्या यह खुशी देता है?"

<aside>
📌 आपके डोमेन मॉडल को आकार लेने से पहले मॉड्यूल संगठन के कई प्रयास लगते हैं। इसे पूर्ण बनाने के लिए परेशान न हों।
</aside>

> आपको लग सकता है कि `cart.sendReceipt()` भुगतान-संबंधित विधियों के साथ नहीं आता। शायद `customerNotifications.sendReceipt()` ग्राहक संदेशों के लिए बेहतर स्थान है। यदि `CartHelper` पर्याप्त महत्वपूर्ण है, तो यह एक **_नियंत्रक_** के रूप में कार्य कर सकता है जो आंतरिक रूप से सभी आवश्यक **_सेवाओं_** को कॉल करता है, जैसे `customerNotifications`।

#### कैसे पता चलेगा कि आप मदद कर रहे हैं?

यदि पठनीयता में कोई कमी नहीं आती जब आप तदर्थ तर्कों को हटाते हैं, तो **बधाई हो!!!** आपने संभवतः एक स्पष्ट और टिकाऊ दायरे वाला मॉड्यूल बनाया है!

- मध्यवर्ती तर्कों को हटाने से 'परतों' को उभरने के लिए मजबूर करने का एक तरीका है।
- तदर्थ कोड को गलत जगह डालना _मुश्किल_ होना चाहिए!

तो, यह सवाल उठता है कि हम कार्यक्षमता कहाँ जोड़ें?

मेरे अनुभव में, कार्यक्षमता जोड़ते समय मूल्यांकन करने के लिए 2 मुख्य रणनीतियाँ हैं:

1.  मौजूदा विधि का विस्तार/रीफैक्टर करें। (जब नया कोड मौजूदा कोड के काफी करीब हो।)
2.  चेन में वांछित स्थान पर एक नया (5वां) फंक्शन बनाएं। (मान लें कि नया कोड मौजूदा फंक्शन से असंबंधित है।)

अंततः यह तय करना आसान हो जाता है कि नई कार्यक्षमता कहाँ आती है। (जैसे `cart.applyDiscounts()`, `cart.applyTaxes()`, `rewards.getBalance()`।)

### निष्कर्ष

एक जटिल पाइपलाइन के माध्यम से स्टेट पास करना मुश्किल हो सकता है। हालांकि, थोड़े से रीफैक्टर अभ्यास से, आप खुद को कम संज्ञानात्मक भार के साथ अधिक पठनीय कोड लिखते हुए पाएंगे।

सवाल? टिप्पणियाँ? चिंताएँ? बेझिझक [@justsml](https://x.com/justsml) या [ईमेल](mailto:dan@danlevy.net) पर संपर्क करें।

#### श्रृंखला के अगले भाग के लिए बने रहें

हम स्टेट को बाहरी बनाने और अपने मॉड्यूल में कार्यक्षमता बढ़ाने का पता लगाएंगे!

#### संबंधित पठन

- [कम्पोनेंट-संचालित React दुनिया में भी ऐसी ही चुनौतियाँ मौजूद हैं।](https://kyleshevlin.com/quit-your-yapping)
````
