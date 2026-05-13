# Translation Candidate
- Slug: love-computer-languages
- Locale: hi
- Model: openrouter/openai/gpt-oss-120b:nitro
- Target: src/content/posts/2015-06-12--love-computer-languages/hi/index.mdx
- Validation: rejected: direct AI SDK translation failed
- Runtime seconds: 8.25
- Input tokens: 8432
- Output tokens: 2981
- Thinking tokens: unknown
- Cached input tokens: 512
- Cache write tokens: 0
- Estimated cost: $0.000865
- Pricing source: local-openrouter-estimate
- Note: Command failed: git add src/content/posts/2015-06-12--love-computer-languages/hi/index.mdx reports/i18n/love-computer-languages/hi
## Raw Output

````mdx
---
title: प्रेम (कंप्यूटर) भाषाएँ
date: '2015-06-12'
modified: '2017-02-28'
category: Code
subCategory: languages
draft: true
hidden: true
publish: true
tags:
  - programming
  - languages
  - lua
  - haskell
  - scala
  - rust
  - smalltalk
  - go
  - javascript
  - python
cover: ../rawpixel-602144-unsplash.webp
cover_mobile: ../w300_rawpixel-602144-unsplash.webp
cover_icon: ../icon_rawpixel-602144-unsplash.webp
---
import Gist from '../../../../../components/Gist/index.astro'

## Programming Languages Notes

#### मुझे यकीन है कि मेरी विविध टिप्पणियाँ पहले भी कही जा चुकी हैं, लेकिन यहाँ मेरी सबसे रोचक भाषाओं की सूची है:

### JavaScript

मेरी एकमात्र सच्ची मोहब्बत, अत्यधिक बहुमुखी और सर्वव्यापी – सब‑में‑सब, अद्भुत‑शक्तिशाली चैंपियन!  
यह GitHub.com पर लगातार _सालों_ से #1 सबसे सक्रिय/लोकप्रिय भाषा है।

मुझे यह स्वीकार करना नापसंद है, लेकिन कई सालों तक मैं सिर्फ़ तिरस्कार और उपहास ही करता रहा, जबकि अब यह **मेरी पसंदीदा भाषा** बन गई है।

**ES6** ने मेरी ~~~आदी~~~ मोहब्बत को और बढ़ा दिया है। जबकि शुद्ध ES5 हमेशा मेरे दिल में एक खास जगह रखेगा, हर बार जब मैं कुछ **ES6** इस्तेमाल करता हूँ, मुझे वह रेडियोधर्मी मकड़ी के काटने जैसा एहसास होता है...

ऐसे 4 कारण थे जिन्होंने मुझे **ES6 कैंप** की ओर धकेला:

1.  यह मज़ेदार है। गंभीरता से। सुंदरता, स्पष्टता और उत्पादकता में ठोस लाभ मिलते हैं।

- आप कहेंगे कि यह सब व्यक्तिगत राय है? तो मैं आपको ES6 का एक छोटा नमूना दिखाता हूँ:
- `let expired = users.filter(u => Date.now() > u.trialDate)`
- अब आपको `Object.create` या `Object.defineProperty` का ढोंग करने की ज़रूरत नहीं है
- नीचे उदाहरण देखें

1.  जुलाई 2015 तक, ES6 आधिकारिक तौर पर अंतिम मानक बन चुका है!
1.  समर्थन प्रभावी रूप से 100 % है\*! ... ठीक है, आपका कोड ES5 संगत बनाने के लिए BabelJS की जरूरत पड़ेगी। ऐतिहासिक रूप से JS ट्रांसपाइलर को नापसंद किया जाता रहा है। लेकिन हाल ही में (2014‑15) स्थिति बदल गई है, क्योंकि BabelJS भाषा की प्रगति का मुख्य सक्षम/प्रेरक बन गया है। माइक्रोसॉफ्ट और फेसबुक सहित कई बड़ी कंपनियां इसे अपने बड़े साइटों पर उपयोग करती हैं।
1.  [Node के नवीनतम संस्करण](https://nodejs.org/en/blog/release/v4.0.0/) Chrome v45 के समान V8 JS इंजन शामिल करते हैं, यह v4.5 है

#### उदाहरण

> मैं आपको दिखाने वाला हूँ कि आखिरकार क्या मुझे ES6‑स्वाद वाले कूलएड पीने पर मजबूर कर गया।

मेरे हालिया अनुभव में, ES6 कोड लिखना तेज़ बनाता है। सीधा‑सादा।
कोड अधिक संक्षिप्त होने के कारण, पुराने कोड (या टीम‑मेट के कोड) को समझने में काफी कम मस्तिष्क शक्ति लगती है।

मैं नियमित रूप से 20‑50 % KLOC बचत देखता हूँ। यह केट मॉस की कटौती जैसा है!

**_ग़ायब छवि:_ EcmaScript 5 बनाम ES 2016 – डेमो: क्लासेज, डीस्ट्रक्चरिंग, स्लिक**  
{/* ](../images/screenshots/Diff-ES6-vs-ES5-Head-to-Head.png) */}


```js
// /services/users.js
class Users {
  constructor(data) {
    this.users = data || [];
  }
  expired() {
    return this.users.filter(u => Date.now() > u.trialDate);
  }
}
```

- फ़ंक्शन को पास किए गए फ़ील्ड्स को ‘एक्सट्रैक्ट’ और ‘चेक’ करने वाला थकाऊ कोड अब नहीं। सीधे इस `add()` उदाहरण को देखें:

```js
// /services/users.js
class Users {
  constructor(data) {
    this.users = data || [];
  }
  add({ name, email, password }) {
    // pwd हैश स्टोर करें, हमें केवल 1 स्पष्ट `var/let` की जरूरत है – बाकी वेरिएबल्स ऊपर `{fields}` जादू से ‘डिफ़ाइंड’ होते हैं ^^^
    let hash = getSha256(password);
    return http
      .post("/users", {
        name: name,
        email: email,
        passwordHash: hash
      })
      .then(usr => this.users.push(usr)); // सेवा प्रतिक्रिया पर उपयोगकर्ता जोड़ें
  }
}
```

<Gist path='justsml/aaddc9852c1624d61cf3'></Gist>

<p>&#160;</p>

#### ES6 पर कूदना ऐसा लग सकता है जैसे:

<div class="anigif top">
  <img alt='हूँ?' title="हूँ?" src="https://res.cloudinary.com/ddd/image/upload/v1441143891/wtf__tumblr_inline_n7ygqh6Y0C1svcdm1_igeqey.gif" />
</div>
<h3>से</h3>
<div class="anigif">
  <img alt='क्या?!!' title="क्या?!!" src="https://res.cloudinary.com/ddd/image/upload/v1443133148/cat-wtf-trap.gif" />
</div>
<h3>से</h3>
<div class="anigif end">
  <img alt='#जीत' title='#जीत' src="https://res.cloudinary.com/ddd/image/upload/v1443133141/full-throttle.gif" />
</div>

बस नई चीज़ों को फ़िल्टर‑फ़िल्टर करते रहें। स्ट्रिंग टेम्प्लेट, ऑटो `this` बाइंडिंग, अधिक समझदार इनहेरिटेंस देखें…

##### [Node.JS](http://nodejs.org/)

### Rust

##### [Official Site](http://www.rust-lang.org/)

- **Pros**

- कल्पना कीजिए अगर कोई भाषा C जितनी तेज़ और Python/C++ जितनी शक्तिशाली हो, फिर भी उन जटिलताओं/पिटफ़ॉल्स से मुक्त हो जो आमतौर पर सबसे कुशल डेवलपर्स को भी फँसाते हैं।  
  - असल में मैं अनुमान लगाता हूँ कि Rust की जटिलता लगभग ES6 स्पेसिफ़िकेशन के बराबर है।  
  - इसमें बहुत सारे अतिरिक्त फीचर हैं:  
    1.  मूलतः Rust सेमी‑डायनामिक सिंटैक्स को **शुद्ध C कोड** में ट्रांसपाइल करता है!  
    1.  C में जो **सभी बेहतरीन प्रैक्टिसेज** आप अक्सर गड़बड़ कर देते हैं, उन्हें शामिल करता है—मैं ~~आख़िरकार~~ हमेशा करता हूँ।  
    - स्वचालित रूप से आपको मिलते हैं:  
    - ऑटो मेमोरी मैनेजमेंट (धीमे गार्बेज कलेक्टर की जरूरत नहीं!)  
    - परफेक्टली स्कोप्ड ऑब्जेक्ट ओनरशिप/लॉकिंग (म्यूटेक्सिंग और कॉन्टेक्स्ट स्विचिंग न्यूनतम)  
    - ऑब्जेक्ट लाइफ़टाइम्स (स्वचालित रूप से लागू *, और कोड ऐसा लिखा गया जैसे आप हर एज केस जानते हों)  
    - लगभग सभी रन‑टाइम एरर्स को रोकता है (सच में, आपके कोड‑पाथ स्पष्ट हो जाते हैं: आप कोई कोड‑पाथ नजरअंदाज़ नहीं कर सकते)  
  - ओह हाँ, इसमें एक समझदार ‘मैक्रो’ फीचर के साथ सच्ची भाषा विस्तारशीलता भी मिलती है।  
    - कॉम्प्रिहेंशन चाहिए? [Scala स्टाइल? हो गया](https://gist.github.com/hanny24/5749688), और [Python जैसा? हो गया](https://gist.github.com/JeffBelgum/5e762761cd63c796e803)।  
    1.  बहुत अच्छा लग रहा है? नहीं, और भी है:  
    - ब्लीडिंग‑एज इंडिकेटर्स (github.com आँकड़े) दिखाते हैं कि Rust बहुत प्रतिस्पर्धी है या यहाँ तक कि Go (Google की नई‑नई भाषा) को पीछे छोड़ रहा है  
      - Go से लगभग 4K अधिक स्टार्स (वर्तमान में लगभग 12,200)  
      - कुल योगदानकर्ता अधिक (2×! – 1,071 बनाम Go के 479)  
      - फोर्क्स अधिक (3×! – 2,343 बनाम 765)  
      - ओपन इश्यूज़ की संख्या में थोड़ा कम (2,000 बनाम Go के 1,730)  
      - पुल‑रिक्वेस्ट्स (Rust 70+ बनाम Go का 1)  
    - मुझे भी इन संख्याओं को तीन बार जांचना पड़ा।  
  - अन्य लाइब्रेरीज़ बहुत स्थिर हैं क्योंकि Rust की कंस्ट्रक्ट्स और नियमों से उन्हें मजबूती मिलती है।  
  - थ्रेडिंग मॉडल साधारण डेवलपर्स के लिए भी उपयोगी है।

- **Cons**  
  - ठीक‑ठाक **वेब फ्रेमवर्क** अभी भी अपेक्षाकृत नए, अपरिक्षित, और अक्सर अनडॉक्यूमेंटेड हैं (हालाँकि मार्च 2015 तक वे **बहुत प्रभावशाली** होते जा रहे हैं)।  
  - शुरुआती प्री‑1.0 संस्करणों में कई ब्रेकिंग बदलाव होते हैं।

### Python

- **Pros**  
  - अल्गोरिद्म का अत्यधिक पूर्ण सेट पहले से ही Python में उपलब्ध है (देखें: scilearnkit, numpy, matplotlib, pil/pillow, आदि)।  
  - लिखने में बहुत मज़ा आता है! कॉम्प्रिहेंशन और डीकम्पोज़िशन बेहतरीन फीचर हैं और अन्य भाषाओं को सिर्फ़ भरा‑भरा बनाते हैं!  
  - एरेज़, ‘सीक्वेंसेज़’, ट्यूपल्स आदि अपेक्षाकृत सरल हैं।

```python
## dummy code: defines a color + pixel-coord -
def pixel(x, y, r, g, b): return dict(x=x, y=y, r=r, g=g, b=b)
## Create a new pixel object and apply to set of vars
x, y, r, g, b = pixel(10, 20, 255, 255, 255)
## Now we can call pixel
```

- **Cons**
  - कष्टदायक बात यह है कि Python 2.x और 3.x असंगत हैं। महान विभाजन अभी भी जारी है, कई साल बाद भी।
  - कुछ आवश्यक लाइब्रेरी (जैसे numpy) सभी डेवलपर्स द्वारा पूरी तरह समझी नहीं जातीं।

### Haskell

- **Pros**
  - जब आप अंततः पर्याप्त सिंटैक्स याद कर लेते हैं और कॉम्प्रिहेंशन‑आधारित अभिव्यक्त पैटर्न बना लेते हैं, तो बहुत संतोष मिलता है
  - आप दिमाग‑हिला देने वाले कोड पैटर्न सीखेंगे—जो अक्सर अन्य भाषाओं में भी लागू होते हैं।
- **Cons**
  - सिंटैक्स और पैटर्न को अपनाने में कठिनाई हो सकती है।

<div class="anigif end">
  <img alt='endless loop' src="../https://res.cloudinary.com/ddd/image/upload/v1441143881/endless-loop.gif" />
</div>

### SmallTalk-80

- **Pros**
  - अत्यंत सरल कंपाइलर (विशेषकर मूल संस्करण)
  - बेहतरीन संसाधन: [Smalltalk MVC Translated to JavaScript](../http://peter.michaux.ca/articles/smalltalk-mvc-translated-to-javascript)
- **Cons**
  - आप शायद इस भाषा को किसी भी प्रोजेक्ट में कभी उपयोग नहीं करेंगे। शून्य प्रोजेक्ट्स। फिर भी यह आपके कोडिंग स्टाइल पर अन्य फंक्शनल भाषाओं से तेज़ प्रभाव डालेगा… इसे Pros सूची में रखना चाहिए)

#### _कार्य प्रगति में (अद्यतन दिसम्बर 2015)_
````
