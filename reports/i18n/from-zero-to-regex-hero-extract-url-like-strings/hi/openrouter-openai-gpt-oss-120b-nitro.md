# Translation Candidate
- Slug: from-zero-to-regex-hero-extract-url-like-strings
- Locale: hi
- Model: openrouter/openai/gpt-oss-120b:nitro
- Target: src/content/posts/2024-12-29--from-zero-to-regex-hero-extract-url-like-strings/hi/index.mdx
- Validation: passed
- Runtime seconds: 10.34
- Input tokens: 10514
- Output tokens: 4026
- Thinking tokens: unknown
- Cached input tokens: 2176
- Cache write tokens: 0
- Estimated cost: $0.001135
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
title: शून्य से रेगेक्स हीरो तक
subTitle: एकल रेगेक्स से URL‑समान स्ट्रिंग्स निकालें और पार्स करें
category: Regex
subCategory: Data Extraction
date: '2024-12-29'
modified: '2025-01-06'
tags:
  - regex
  - url
  - data-extraction
  - data-processing
social_image: ../desktop-social.webp
cover_full_width: ../regex-url-parsing-wide.webp
cover_mobile: ../regex-url-parsing-square-200.webp
cover_icon: ../regex-url-parsing-square-200.webp
---
import { CodeTabs } from '../../../../../components/CodeTabs';

**सामग्री तालिका**

- 🚀 [परिचय](#-introduction)
- 🔍 [पाठ से URL निकालना](#-extracting-urls-from-text)
- 🛳️ [120+ बाइट रेगेक्स](#️-the-120-byte-regex)
- 🧩 [स्टेप बाय स्टेप विश्लेषण](#-breaking-it-down-step-by-step)
- 🛠️ [पार्सिंग उदाहरण](#-pa)
- ☑️ [आगे के कदम](#-next-steps)
- 📝 [सारांश](#-summary)
- 📚 [अधिक सीखें](#-further-learning)

**TL;DR:** सीधे [120+ बाइट रेगेक्स](#️-the-120-byte-regex) पर जाएँ।

## 🚀 परिचय

कच्चे पाठ से URL निकालना कभी‑कभी व्हैक‑ए‑मोल खेलते‑जैसा थकाऊ लग सकता है। विराम चिह्न, कोष्ठक में लिपटे भाग, और अस्पष्ट फ़ॉर्मेटिंग सभी मिलकर आपके प्रयासों को जटिल बना देते हैं। चाहे आप वेब स्क्रैपर, डेटा विश्लेषक, या चैट एप्लिकेशन बना रहे हों, URL को सटीक रूप से निकालना आवश्यक है।

इस पोस्ट में, हम इस समस्या को सीधे एक लचीले दो‑स्टेप दृष्टिकोण से निपटेंगे। हमारा लक्ष्य **पहले सभी संभावित URL‑समान स्ट्रिंग्स को पकड़ना** है, फिर वैधता को बाद की प्रक्रिया में संभालना।

> 💡 **नोट:** यह पैटर्न **URL की वैधता जाँचने** के लिए नहीं है! यह विराम चिह्न और गलत वर्तनी को जानबूझकर अनुमति देता है।

## 🔍 लक्ष्य: पाठ से URL निकालना

कच्चे पाठ से URL निकालते समय दो‑स्टेप दृष्टिकोण प्रभावी होता है:

1. **सभी URL‑समान चीज़ें पकड़ें**: एक व्यापक जाल बुनें ताकि सभी स्ट्रिंग्स जो *हो सकता* है URL हों, पकड़ ली जाएँ। यही वह जगह है जहाँ हमारा “120 बाइट रेगेक्स” काम करता है।
2. **वैधता जाँचें**: एक बार ये उम्मीदवार पकड़ लिए जाएँ, तो द्वितीयक जांच (जैसे DNS रिज़ॉल्यूशन, ज्ञात डोमेनों के खिलाफ तुलना) का उपयोग करके अमान्य प्रविष्टियों को हटाएँ।

Terms जैसे`extract` और `parse` अक्सर आपस में बदलकर उपयोग किए जाते हैं, लेकिन वे अलग प्रक्रियाओं को दर्शाते हैं। URL निकालना (extracting) का मतलब है बड़े टेक्स्ट ब्लॉक से संभावित URL को पहचानना और पकड़ना। पार्सिंग (parsing) का अर्थ है इन URLs को उनके घटक भागों में विभाजित करना।

जब मैं पार्सिंग या 'URL भागों' की बात करता हूँ, तो मैं निम्नलिखित घटकों की ओर इशारा कर रहा हूँ:

<figure>
  <figcaption>सभी URLs के 5 भाग</figcaption>
![URL anatomy, visualized](../WhatUrlsAreMadeOf-ColorMatched.svg "URL anatomy, visualized")
</figure>

<details class="inset breakout">
  <summary>RegEx101 के सबस्ट्रिंग मैचिंग का स्क्रीनशॉट देखें।</summary>

  रेगेक्स में बहुत गहराई में जाने से पहले, चलिए एक विज़ुअल टूल से देखते हैं कि हमारा पैटर्न कितनी अच्छी तरह कई मैच पकड़ता है:

  <figure>
    <figcaption>[RegEx101.com](https://regex101.com/r/jO8bC4/69) का उपयोग करके मल्टी‑लाइन मैचों को विज़ुअलाइज़ करना</figcaption>
    ![Preview 'bulk' multi-line matches](../RegEx101-Matches-Screenshot.webp "Preview 'bulk' multi-line results")
  </figure>
</details>

## 120+ बाइट रेगेक्स

नीचे एक संक्षिप्त रेगेक्स दिया गया है जो URLs को एक ही कदम में निकालने और पार्स करने के लिए बनाया गया है। यह विभिन्न प्रोटोकॉल, डोमेन्स, पाथ्स और वैकल्पिक क्वेरी/फ़्रैगमेंट सेक्शन को सपोर्ट करता है।

चिंता मत कीजिए—हम इसे चरण‑दर‑चरण तोड़‑फोड़ करेंगे!

```js title="120+ Byte URL Regex" frame="code"
const urlRegex = /([-.a-z0-9]+:\/{1,3})([^-\/\.[\](|)\s?][^`\/\s\]?]+)([-_a-z0-9!@$%^&*()=+;/~\.]*)[?]?([^#\s`?]*)[#]?([^#\s'"`\.,!]*)/gi;
// Compatibility: ES5+

// Same pattern, split on newlines for readability:
([-.a-z0-9]+:\/{1,3})
([^-\/\.[\](|)\s?][^`\/\s\]?]+)
([-_a-z0-9!@$%^&*()=+;/~\.]*)
[?]?([^#\s`?]*)
[#]?([^#\s'"`\.,!]*)

```

<blockquote class="inset">आपने अब तक जिन सबसे जंगली रेगेक्स (या खुद लिखे) देखे हैं, उन्हें <a href="#post-comments">नीचे कमेंट्स में</a> साझा करें! 🚀</blockquote>

## 🧩 चरण‑दर‑चरण विश्लेषण



आइए रेगेक्स को उसके घटकों में तोड़‑कर देखें कि यह कैसे काम करता है:

<h3>1. प्रोटोकॉल (ग्रुप 1): <code>{`([-.a-z0-9]+:\/{1,3})`}</code></h3>

<ul>
  <li>**उद्देश्य:** URL के प्रोटोकॉल भाग को मिलाता है (जैसे `http://`, `ftp://`, `custom-scheme://`).</li>
  <li>
    **व्याख्या:**
    <ul>
      <li><code>[-.a-z0-9]+</code>: एक या अधिक लोअर‑केस अक्षर, अंक, हाइफ़न या डॉट को मिलाता है (प्रोटोकॉल स्कीम में आम)।</li>
      <li><code>{`:\/{1,3}`}</code>: एक कोलन के बाद एक से तीन स्लैश मिलाता है (<code>:/</code>, <code>://</code>, या <code>:///</code>)।</li>
    </ul>
  </li>
</ul>

<h3>2. डोमेन (ग्रुप 2): <code>{`([^-\/\.[\](|)\s?][^\`\/\s\]?]+)`}</code></h3>

<ul>
  <li>**उद्देश्य:** URL के डोमेन या होस्ट भाग को कैप्चर करता है।</li>
  <li>
    **व्याख्या:**
    <ul>
      <li><code>[^-\/\.[\](|)\s?]</code>: निर्दिष्ट विशेष अक्षरों और व्हाइटस्पेस को छोड़कर किसी भी अक्षर को मिलाता है।</li>
      <li><code>[^`\/\s\]?]+</code>: बैकटिक, स्लैश, व्हाइटस्पेस या क्लोज़िंग स्क्वायर ब्रैकेट को छोड़कर एक या अधिक अक्षर मिलाता है।</li>
    </ul>
  </li>
</ul>

<h3>3. पाथ (ग्रुप 3): <code>{`([-_a-z0-9!@$%^&*()=+;/~\\.]*)`}</code></h3>

<ul>
  <li>**उद्देश्य:** URL के पाथ भाग को मिलाता है।</li>
  <li>
    **व्याख्या:**
    <ul>
      <li><code>[-_a-z0-9!@$%^&*()=+;/~\.]*</code>: पाथ में अक्सर मिलने वाले URL‑सेफ़ अक्षरों को शून्य या अधिक बार मिलाता है।</li>
    </ul>
  </li>
</ul>

<h3>4. क्वेरी (ग्रुप 4): <code>[?]?([^#\s`?]*)</code></h3>

<ul>
  <li>**उद्देश्य:** वैकल्पिक रूप से क्वेरी स्ट्रिंग को मिलाता है, जो किसी भी <code>?</code> अक्षर से शुरू होती है।</li>
  <li>
    **व्याख्या:**
    <ul>
      <li><code>[?]?</code>: वैकल्पिक रूप से एक <code>?</code> को मिलाता है। (स्क्वायर ब्रैकेट अनिवार्य नहीं हैं, लेकिन दोहरे <code>??</code> की तुलना में थोड़ा स्पष्ट दिखते हैं। यह अगले मिलते समूह <code>[#]?</code> के साथ दृश्य समानता भी देता है।)</li>
      <li><code>([^#\s`?]*)</code>: शून्य या अधिक ऐसे अक्षर मिलाता है जो हैश, व्हाइटस्पेस, बैकटिक या प्रश्नवाचक चिह्न नहीं हैं।</li>
    </ul>
  </li>
</ul>

<h3>5. फ्रैगमेंट (ग्रुप 5): <code>[#]?([^#\s'"`\.,!]*)</code></h3>

<ul>
  <li>**उद्देश्य:** वैकल्पिक रूप से फ्रैगमेंट पहचानकर्ता को मिलाता है, जो एक <code>#</code> से शुरू होता है।</li>
  <li>
    **व्याख्या:**
    <ul>
      <li><code>[#]?</code>: वैकल्पिक रूप से एक <code>#</code> को मिलाता है।</li>
      <li><code>([^#\s'"`\.,!]*)</code>: शून्य या अधिक ऐसे अक्षर मिलाता है जो प्रतिबंधित विराम चिह्न या व्हाइटस्पेस नहीं हैं।</li>
    </ul>
  </li>
</ul>

## 🛠️ Parsing Example

यहाँ बताया गया है कि आप इस विशाल रेगेक्स को जावास्क्रिप्ट के साथ कैसे उपयोग में ला सकते हैं:

<CodeTabs client:only
 tabs={[
    "Code: Extract URLs",
    "Results: Extracted URLs",
    "Results: URL Parts",
  ]} >
```js title="extract-urls.js" frame="code"
const text = `
Check this out: https://example.com/path?query=123#section
And also (ftp://files.server.org/index).
Plus a weird one: custom-scheme://host/param;weird^stuff
`;

const urlRegex =
  /([-.a-z0-9]+:\/{1,3})([^-\/\.[\](|)\s?][^`\/\s\]?]+)([-_a-z0-9!@$%^&*()=+;/~\.]*)[?]?([^#\s`?]*)[#]?([^#\s'"`\.,!]*)/gi;

const matches = [
  ...text.matchAll(urlRegex),
].map((match) => match[0]);
console.log("Extracted URLs:", matches);

const parts = [
  ...text.matchAll(urlRegex),
].map((match) => match.slice(1));
console.log("Extracted Parts:", parts);
```

```json title="extracted-urls.json"
[
  "https://example.com/path?query=123#section",
  "ftp://files.server.org/index",
  "custom-scheme://host/param;weird^stuff"
]
```

```json title="urls-parts.json"
[
  [
    "https://",    // Protocol
    "example.com", // Domain
    "/path",       // Path
    "query=123",   // Query
    "section"      // Fragment
  ],
  [
    "ftp://",           // Protocol
    "files.server.org", // Domain
    "/index",           // Path
    "",                 // Query
    ""                  // Fragment
  ],
  [
    "custom-scheme://",   // Protocol
    "host",               // Domain
    "/param;weird^stuff", // Path
    "",                   // Query
    ""                    // Fragment
  ]
]
```

</CodeTabs>

## ☑️ अगले कदम

आपके उपयोग‑केस के आधार पर आपको इस रेगेक्स को और परिष्कृत करने या अतिरिक्त वैधता व पोस्ट‑प्रोसेसिंग चरण जोड़ने की आवश्यकता हो सकती है।

### विभिन्न प्रोजेक्ट, विभिन्न आवश्यकताएँ

प्रोजेक्ट्स की आवश्यकताएँ और सुरक्षा चिंताएँ अलग‑अलग होती हैं:

1. **वेब स्क्रैपिंग**: URLs की वैधता जाँचें ताकि यह सुनिश्चित हो सके कि वे पहुँच योग्य और भरोसेमंद हैं।  
2. **डेटा प्रोसेसिंग**: उपयोगकर्ता‑जनित सामग्री से URLs निकालें और साथ ही सुरक्षा सुनिश्चित करें।  
3. **डेटा एनालिसिस**: शोध या मार्केटिंग उद्देश्यों के लिए डुप्लिकेट या अप्रासंगिक लिंक फ़िल्टर करें।  
4. **यूज़र‑फ़ेसिंग एप्लिकेशन**: चैट ऐप्स या फ़ोरम में URLs को स्वचालित रूप से हाइपरलिंक बनाएं।  

### पोस्ट‑प्रोसेसिंग और वैधता

संभावित URLs एकत्र करने के बाद अतिरिक्त जाँचें लागू करें:

- **DNS लुकअप**: डोमेनों के रिजॉल्व होने की पुष्टि करें।  
- **सुरक्षा जाँच**: दुर्भावनापूर्ण या फ़िशिंग साइटों की पहचान के लिए सेवाओं का उपयोग करें।  
- **कस्टम नियम**: प्रोजेक्ट‑विशिष्ट फ़िल्टर लागू करें (जैसे, अनुमत TLDs, अधिकतम URL लंबाई)।  

## 📝 सारांश

सेमी‑स्ट्रक्चर्ड स्ट्रिंग डेटा को निकालना शायद रेगेक्स में महारत हासिल करने का सबसे संतोषजनक हिस्सा हो सकता है।

यहाँ मुख्य बिंदुओं का सारांश है:

- **विज़ुअल टूल का उपयोग करके अपने [Regex पैटर्न लिखें, टेस्ट करें और समझें।](https://regex101.com/r/jO8bC4/69)**
- **चुनौती को भागों में बाँटें** और प्रत्येक भाग को अलग‑अलग हल करें। इस संदर्भ में, कैप्चर ग्रुप्स हमारे रेगेक्स के लिए रूपकात्मक “ट्रेल मार्कर” की तरह काम करते हैं।
- **डेटा इनजेस्ट करते समय ‘ढीले’ मैच एक्सप्रेशन इस्तेमाल करें, कड़ी स्पेसिफिकेशन अनुपालन से बचें।**
- **प्रारंभिक एक्सट्रैक्शन के बाद वैधता चरण लागू करना अनिवार्य है**—हमेशा अपने प्रोजेक्ट की सुरक्षा और विशिष्ट आवश्यकताओं को ध्यान में रखें।

इन चरणों का पालन करके आप किसी भी अर्ध‑संरचित स्ट्रिंग डेटा को प्रभावी रूप से निकाल सकते हैं, जिससे आगे की प्रोसेसिंग और वैधता के लिए ठोस आधार बनता है।

## 📚 आगे का अध्ययन

- याद रखें, **[RegEx101.com पर लाइव डेमो के साथ खेलें!](https://regex101.com/r/jO8bC4/69)**
- मूल StackOverflow प्रश्न, और **[यहाँ मेरा उत्तर देखें](https://stackoverflow.com/a/34669019/369727)**
- **[MDN Docs on Regular Expressions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions)**
- **[Advanced Regex Techniques](https://www.regular-expressions.info/)**: लुकअहेड, लुकबिहाइंड और अन्य उन्नत पैटर्न का अन्वेषण करें, जिससे मिलान अधिक सटीक हो सके।
- **[RFC 3986 - URI Generic Syntax](https://datatracker.ietf.org/doc/html/rfc3986)**
````
