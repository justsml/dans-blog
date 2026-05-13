# Translation Candidate
- Slug: upgrade-from-gatsby-to-astro
- Locale: hi
- Model: openrouter/openai/gpt-oss-120b:nitro
- Target: src/content/posts/2024-08-22--upgrade-from-gatsby-to-astro/hi/index.mdx
- Validation: rejected: direct AI SDK translation failed
- Runtime seconds: 12.88
- Input tokens: 10133
- Output tokens: 3314
- Thinking tokens: unknown
- Cached input tokens: 1536
- Cache write tokens: 0
- Estimated cost: $0.000992
- Pricing source: local-openrouter-estimate
- Note: Command failed: git commit --only -m i18n candidate(hi): upgrade-from-gatsby-to-astro via openrouter/openai/gpt-oss-120b:nitro -- src/content/posts/2024-08-22--upgrade-from-gatsby-to-astro/hi/index.mdx reports/i18n/upgrade-from-gatsby-to-astro/hi
## Raw Output

````mdx
---
social_image: ../desktop-social.webp
title: मेरे ब्लॉग को अपग्रेड करने के सबक
subTitle: 'Astro, Tailwind, MDX, Pagefind और अधिक!'
date: '2024-08-21'
modified: '2024-08-23'
category: Guides
tags:
  - astro
  - tailwind
  - mdx
  - pagefind
  - gatsby
cover: ../galaxy-contribution-mode.webp
cover_full_width: ../galaxy-contribution-banner.webp
cover_mobile: ../w300_galaxy-contribution-mode.webp
cover_icon: ../icon_galaxy-contribution-mode.webp
---
हाल ही में, मैंने अपने 8‑साल से अधिक पुराने Gatsby v1 साइट को अपग्रेड करने की यात्रा शुरू की।

यह ब्लॉग पोस्ट इस प्रक्रिया में मैंने जो सबक सीखे और किन मज़ेदार तकनीकों का परीक्षण किया, उन्हें साझा करेगी।

## Table of Contents

- [Project Requirements](#project-requirements)
- [Choosing my Right Technology Stack](#choosing-my-right-technology-stack)
- [Astro: Learning Curve and Key Features](#astro-learning-curve-and-key-features)
- [Modern CSS: Wow](#modern-css-wow)
- [Search: Pagefind](#search-pagefind)
- [Comments: Utterances](#comments-utterances)
- [Tailwind: Regrets](#tailwind-regrets)
- [Conclusion](#conclusion)

## Project Requirements

अपग्रेड शुरू करने से पहले, मैंने कुछ आवश्यकताओं को निर्धारित किया:

चूँकि मेरे ब्लॉग पर दैनिक पेज व्यूज़ की संख्या बहुत बदलती रहती है, मैंने महसूस किया कि एक स्थैतिक रूप से पूर्व‑निर्मित साइट वह प्रदर्शन देगी जिसकी मुझे आवश्यकता है, बिना अतिरिक्त जटिलता के।

साथ ही, मुझे इस साइट की मौजूदा सामग्री और सुविधाओं को बरकरार रखना था, जिसमें शामिल हैं:

- कोड हाइलाइटिंग
- कमेंट्स
- साइट सर्च
- पूर्व‑निर्मित React कंपोनेंट्स: क्विज UI, Gist एम्बेड्स
- संपर्क फ़ॉर्म
- रिस्पॉन्सिव इमेजेज
- 1 सेकंड से कम लोड टाइम
- ब्राउज़र संगतता: 2018+
- ऑटोमेटेड + PR‑आधारित डिप्लॉयमेंट्स

## सही तकनीकी स्टैक का चयन

सालों में मैंने कई स्थैतिक साइट टूल्स के साथ काम किया है, जैसे Jekyll, Hugo, Slate, और Gatsby। साथ ही कई फ्रंट‑एंड फ्रेमवर्क: Ember, Knockout, Angular, Vue और बेशक React।

इसलिए मेरे पास विकल्पों की भरमार थी, जिसे मैंने अंततः **Remix**, **Next.js** और **Astro** तक सीमित किया।

मैं अपनी मूल्यांकन प्रक्रिया पर पूरी ब्लॉग श्रृंखला लिख सकता था, लेकिन यहाँ संक्षेप में प्रस्तुत करता हूँ:

<p class="breakout">मैंने [Astro](https://astro.build) को इसलिए चुना क्योंकि मैं _अर्थपूर्ण चीज़ें_ जल्दी कर सकता था।</p>

उनका API डिज़ाइन ताज़ा सरल है। यह [लचीलापन और अच्छे डिज़ाइन सिद्धांतों के बीच एक शानदार संतुलन](https://docs.astro.build/en/concepts/why-astro/) प्रदान करता है।

यह थोड़ा आश्वस्त करने वाला था कि Astro में कोई स्पष्ट क्लाउड पक्षपात या फ्रेमवर्क एजेंडा नहीं है।

Astro ही एकमात्र तकनीक नहीं थी जो मैंने इस्तेमाल की, नीचे पूरी स्टैक की सूची है:

- [Astro](https://astro.build): एक आधुनिक स्थैतिक साइट जेनरेटर।
- [ShadcnUI](https://ui.shadcn.com): पुन: उपयोग योग्य घटकों का संग्रह।
- [Tailwind CSS](https://tailwindcss.com): यूटिलिटी‑फ़र्स्ट CSS फ्रेमवर्क।
- [MDX](https://mdxjs.com): मार्कडाउन कंटेंट + इनलाइन घटक।
- [Pagefind](https://pagefind.app): तेज़, स्थैतिक और ऑफ़लाइन साइट सर्च लाइब्रेरी। Algolia की जरूरत नहीं!
- [Utterances](https://utteranc.es): GitHub इश्यूज़ पर आधारित टिप्पणी प्रणाली।
- [Netlify](https://www.netlify.com): स्वचालित डिप्लॉयमेंट, कैप्चा के साथ संपर्क फ़ॉर्म।

## Astro: सीखने की वक्रता और मुख्य विशेषताएँ

<p class="breakout quote">Astro जल्दी ही मेरे अपग्रेड का मुख्य आधार बन गया।</p>

यहाँ कुछ मुख्य विशेषताएँ हैं जो मुझे विशेष रूप से उपयोगी लगीं:

- `.astro` फ़ाइलें: पहली नज़र में, Astro घटक React JSX घटकों जैसे दिख सकते हैं, लेकिन वे काफी अलग हैं और अलग लक्ष्य समूह को पूरा करते हैं। (नीचे तुलना तालिका देखें।)
- अपने स्वयं के Golang [बिल्ड टूल्स](https://github.com/withastro/compiler) और Vite द्वारा संचालित: यह बस काम करता है। ESM/CJS, TypeScript, कोड बंडलिंग, स्टाइल्स, इमेज आदि को सहजता से संभालता है।
- [कोई फ्रेमवर्क पक्षपात नहीं](https://docs.astro.build/en/guides/framework-components/#official-ui-framework-integrations) या [क्लाउड पक्षपात नहीं।](https://docs.astro.build/en/guides/deploy/) (*खाँस* Next.js, OpenNext)
- [स्थैतिक बनाम हाइब्रिड](https://docs.astro.build/en/basics/rendering-modes/) रेंडरिंग: Astro अधिकांश क्लाउड प्लेटफ़ॉर्म को लक्षित करने की [लचीलापन](https://docs.astro.build/en/guides/deploy/) प्रदान करता है: AWS, GCP, Firebase, Netlify, Vercel, Cloudflare Pages, Azure, Fly.io, और कई अन्य।
- कंटेंट कलेक्शन्स: [`getCollection`](https://docs.astro.build/en/reference/api-reference/#getcollection) API कंटेंट फ़ाइलों को डेटा स्रोत के रूप में काम करना सरल बनाती है।
- फ़ाइल‑आधारित रूटिंग: Astro की फ़ाइल‑आधारित रूटिंग प्रणाली, `getStaticPaths` के साथ मिलकर, पेज जनरेट करना आसान बनाती है।
- SEO: [Astro आपके रास्ते में नहीं आता](https://github.com/justsml/dans-blog/blob/010c5cb58bb327adb8c8fff608594daa612ad9d5/src/components/BaseHead.astro#L43-L63), और केवल आवश्यक होने पर न्यूनतम मात्रा में ~~डिट्रिटस~~ बायलरप्लेट (`astro‑island`) उत्पन्न करता है।

कुछ चीज़ें थोड़ी आश्चर्यजनक थीं, जैसे Astro द्वारा इंजेक्ट किए गए मार्कअप के आसपास स्टाइलिंग, और `display:contents` का प्रभाव।

```tsx
```

<style>astro-island,astro-slot,astro-static-slot{display:contents}</style>

### `.astro` बनाम क्लाइंट कंपोनेंट्स की तुलना

Astro कंपोनेंट मूलतः HTML टेम्प्लेट होते हैं जिनमें एक शक्तिशाली कंपोनेंट & प्रॉप्स पैटर्न होता है। वे बिल्ड‑टाइम पर डेटा फ़ेच कर सकते हैं, बैकएंड संसाधनों तक पहुँच सकते हैं, और कुछ संवेदनशील जानकारी को छिपा कर रख सकते हैं।

Astro के `.astro` कंपोनेंट को समझने का सबसे अच्छा तरीका है उन्हें क्लाइंट‑साइड कंपोनेंट्स (React, Vue, Svelte आदि) से तुलना‑और‑विरोध करना।

<section className="scroll-x">
| आपको क्या करना है?                                                                   | `.astro` कंपोनेंट | क्लाइंट कंपोनेंट |
| ----------------------------------------------------------------------------------- | ----------------- | ---------------- |
| शक्तिशाली टेम्प्लेट + कंपोनेंट पैटर्न के साथ HTML जनरेट करना                         | ✅ | ❌ |
| बिल्ड‑टाइम पर डेटा फ़ेच करना                                                       | ✅ | ❌ |
| सीधे बैकएंड संसाधनों तक पहुँचना                                                    | ✅ | ❌ |
| संवेदनशील जानकारी को छिपा कर रखना (एक्सेस टोकन, API कुंजियाँ आदि)                | ✅ | ❌ |
| क्लाइंट‑साइड जावास्क्रिप्ट को कम करना                                               | ✅ | ❌ |
| क्लाइंट कंपोनेंट्स (React, Vue, Svelte आदि) का उपयोग करना                         | ✅ | ✅ |
| इंटरैक्टिविटी और इवेंट लिसनर जोड़ना (`onClick()`, `onChange()` आदि)               | ❌ | ✅ |
| स्टेट और लाइफ़साइकल इफ़ेक्ट्स का उपयोग (`useState()`, `useReducer()`, `useEffect()` आदि) | ❌ | ✅ |
| केवल ब्राउज़र‑केवल API का उपयोग करना                                               | ❌ | ✅ |
| स्टेट, इफ़ेक्ट्स या ब्राउज़र‑केवल API पर निर्भर कस्टम हुक्स का उपयोग करना           | ❌ | ✅ |
</section>

## आधुनिक CSS: वाह

फ्रंट‑एंड विकास की बात फिर से उठाते हुए, मैं नेटीव CSS में हुए प्रगति से काफी उत्साहित हुआ:

- **CSS वेरिएबल्स**: कुछ समय से उपलब्ध हैं, और 202* के बाद ब्राउज़रों में काफी स्थिर हो गए हैं।  
- **नेस्टिंग**: अंततः स्पेसिफिकेशन में शामिल, और पहले की अजीब सिंटैक्स नहीं रही। अब यह Less या SCSS जैसा दिखता है।  
- **नए सिलेक्टर्स**: [`:is()`, `:where()`, और `:has()`](https://www.youtube.com/watch?v=3ncFpP8GP4g) अधिक सटीक एलिमेंट टार्गेटिंग की सुविधा देते हैं।  
- **आधुनिक यूनिट्स** जैसे `ch`, `vw`, और `clamp()` जैसी फ़ंक्शन लेआउट और टाइपोग्राफी पर बेहतर नियंत्रण प्रदान करती हैं।  
- **स्पेसिंग को स्वाभाविक रूप से सेट करें** `-inline` और `-block` एट्रिब्यूट्स के साथ। क्षैतिज या लंबवत अक्ष पर पैडिंग या मार्जिन सेट करें। उदाहरण: `margin: 0 1rem 0 1rem` → `margin-inline: 1rem`।  
- **एडवांस्ड लेआउट्स**: CSS Grid को फिर से सीखना। हाँ, इसमें बहुत सारी जटिलता है और अनगिनत उपयोग के तरीके हैं। लेकिन आप 1‑2 तरीके समझ कर भी काम चला सकते हैं। नीचे कुछ बेहतरीन संसाधन हैं जिन्होंने मुझे ग्रिड ट्रिक्स करने में मदद की:  
  - [Kevin Powell का वीडियो: Learn CSS Grid the easy way](https://www.youtube.com/watch?v=rg7Fvvl3taU)  
  - [Responsive w/o media queries](https://ardilamorin.com/responsive-no-media-queries/)  
  - [Ten modern layouts in one line of CSS](https://web.dev/articles/one-line-layouts)

## Search: Pagefind

**साइट सर्च** को थर्ड‑पार्टी सर्विस या डेटाबेस होस्टिंग के बिना लागू करना एक मज़ेदार चुनौती लगती थी। आखिर, मेरे पास अभी 10,000 पोस्ट नहीं हैं जिन्हें इंडेक्स करना पड़े (अभी तक)।

जब मैं [Astro की कम्युनिटी इंटीग्रेशन्स](https://astro.build/integrations/?search=find) देख रहा था, तो मुझे एक शानदार टूल मिला जिसका मैं पहले से जानता तो अच्छा होता: [Pagefind](https://pagefind.app/)।

<p class="breakout quote">कुछ टूल्स ही ऐसे होते हैं जो लोकल साइट सर्च की समस्या को Pagefind जितना अच्छा हल कर पाते हैं।</p>

Pagefind को लागू करने की सरलता एक खुशी है। इसे किसी भी स्थैतिक साइट सामग्री के साथ एकीकृत किया जा सकता है, और आप तय कर सकते हैं कि आप डिफ़ॉल्ट UI चाहते हैं या यदि आप चाहें तो पूरी तरह कस्टम कुछ बना सकते हैं।

इसने वह सब ठीक‑ठाक हल कर दिया जो मैं चाहता था। एकीकरण में केवल कुछ मिनट लगे, और अधिकांश काम सिर्फ एक `<div id="search"></div>` टैग जोड़ने और कुछ स्टाइलिंग करने में था!

## टिप्पणियाँ: Utterances

दुर्भाग्य से, मुझे कई वर्षों में जमा किए गए Disqus और उसकी टिप्पणियों को अलविदा कहना पड़ा।

मैं अपनी साइट पर तृतीय‑पक्ष स्क्रिप्ट्स पर बेहतर नियंत्रण/दृश्यता चाहता था।

साथ ही, इसे सरल और रख‑रखाव योग्य होना चाहिए।

यह मुझे शानदार [Utterances](https://utteranc.es/) सेवा चुनने पर ले गया। इसका GitHub (issues‑आधारित) टिप्पणी प्रणाली मेरे दर्शकों के साथ अच्छी तरह मेल खाती है। साथ ही, इसे सेट‑अप करना आसान है, और यह मुफ्त है।

## Tailwind: पछतावा

एक ही तकनीक है जिसे मैं अब अधिकतर पछता रहा हूँ: Tailwind।

समय के साथ, मैं लिखने और रख‑रखाव के बीच लागत अंतर महसूस करने लगा हूँ। Tailwind लिखने में बहुत तेज़ है, लेकिन जब यह पर्याप्त जटिल हो जाता है, तो इसे पढ़ना और विस्तारित करना थकाऊ हो सकता है।

## निष्कर्ष

अपने पुराने Gatsby v1 साइट को Astro के आसपास निर्मित आधुनिक स्टैक में अपग्रेड करना एक मज़ेदार अनुभव रहा। 10/10 मैं सिफ़ारिश करूँगा।

यदि आप किसी पुराने साइट को अपग्रेड करने या नई स्थैतिक (या हाइब्रिड) साइट बनाने पर विचार कर रहे हैं, तो मैं दृढ़ता से Astro को देखने की सलाह देता हूँ। सीखने की वक्र कभी‑कभी तीखी हो सकती है, लेकिन प्रदर्शन, डेवलपर अनुभव, और आपके प्रोजेक्ट को भविष्य‑सुरक्षित बनाने के लाभ इस प्रयास के लायक हैं।
````
