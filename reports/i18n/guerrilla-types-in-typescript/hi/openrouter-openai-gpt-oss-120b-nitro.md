# Translation Candidate
- Slug: guerrilla-types-in-typescript
- Locale: hi
- Model: openrouter/openai/gpt-oss-120b:nitro
- Target: src/content/posts/2023-09-06--guerrilla-types-in-typescript/hi/index.mdx
- Validation: deferred
- Runtime seconds: 3.44
- Input tokens: 10185
- Output tokens: 3441
- Thinking tokens: unknown
- Cached input tokens: 5248
- Cache write tokens: 0
- Estimated cost: $0.001017
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
social_image: ../desktop-social.webp
title: टाइपस्क्रिप्ट में गेरिला टाइप्स
subTitle: बागी टाइप डिज़ाइन
date: '2023-09-05'
modified: '2024-07-30'
tags:
  - engineering
  - typescript
  - composition
  - types
category: Guides
subCategory: TypeScript
cover: ../gorilla-types_dall-e.webp
cover_mobile: ../w300_gorilla-types_dall-e.webp
cover_icon: ../icon_gorilla-types_dall-e.webp
---
## Guerrilla Types in TypeScript

इस लेख में, हम तीन रोचक (शायद ख़राब?) तकनीकों का अन्वेषण करेंगे जो टाइप डिज़ाइन में मदद करती हैं!

मुख्य लक्ष्य **सुसंगत** और **पूर्वानुमेय** Model/Entity/Class इंटरफ़ेस बनाना है।

- [टाइप डिज़ाइन के दृष्टिकोण](#approaches-to-designing-types)
  - [एकल बड़ा ऑब्जेक्ट](#single-large-object)
  - [कई नामित टाइप्स](#multiple-named-types)
- [तकनीक #1: Why not all](#technique-1-why-not-all)
- [तकनीक #2: Mix-ins](#technique-2-mix-ins)
  - [Mix-in उदाहरण](#mix-in-examples)
  - [उदाहरण `User`](#example-user)
- [तकनीक #3: Namespaces के साथ आयोजन](#technique-3-organizing-with-namespaces)
  - [वास्तविक‑दुनिया उपयोग](#real-world-usage)
- [सारांश](#summary)

<!--
1.  हाई‑लेवल लॉजिकल प्रतिनिधित्व टाइप्स का – ऐसा जो डेवलपर्स और बिज़नेस स्टेकहोल्डर्स दोनों के लिए अर्थपूर्ण हो।
2.  लॉजिकल रूप से संबंधित फ़ील्ड्स के संयोजन को मॉडल करने का टिकाऊ तरीका।
    1.  उदाहरण: **ऑब्जेक्ट इंस्टेंस** अक्सर सामान्य फ़ील्ड्स `id`, `createdDate`, `createdById`, आदि शामिल करते हैं।
    2.  आपके डिस्क्रीट डेटाबेस मॉडलों से Request & Response फ़ील्ड्स मॉडल करें। (जैसे `_version`, `_v`)
    3.  संयोज्य यूटिलिटीज़, Paging/Payload रैपर, आदि: `pageNumber`, `sortBy`, `impersonateSession`, `token`, `_version`, आदि।
3.  नामकरण और टाइपिंग में अनपेक्षित विविधताओं से बचें (`id`, `Id`, `ID`, `created_at`, `date_created`, ओह नहीं!)
4.  कई छोटे पुन: उपयोग योग्य इंटरफ़ेस और टाइप्स के साथ उच्च स्तर के टाइप्स को संयोजित करें।
5.  टाइप के वैरिएंट्स को ‘स्वचालित’ रूप से मिलाने के लिए [Unions](https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes-func.html#discriminated-unions) का उपयोग करें। -->

### टाइप डिज़ाइन के दृष्टिकोण

आपनेशायद “टाइप इम्प्लीमेंटेशन” के विभिन्न पैटर्न देखे या लिखे हों, विशेष रूप से जब आप थर्ड‑पार्टी API से डेटा उपभोग कर रहे हों।

**ध्यान दें:** मैं जानबूझकर “पारंपरिक” प्रक्रियाओं जैसे एंटिटी रिलेशनशिप डायग्राम (ERD) बनाना या ऑब्जेक्ट‑ओरिएंटेड प्रोग्रामिंग (OOP) इनहेरिटेंस हायरार्की को नज़रअंदाज़ कर रहा हूँ। यहाँ हम टाइप्स को सेमी‑स्ट्रक्चर्ड API डेटा का प्रतिनिधित्व करने के लिए बना रहे हैं।

आइए दो उच्च‑स्तरीय दृष्टिकोण देखें: **एक बड़ा ऑब्जेक्ट** (टॉप‑डाउन) बनाम **कई नामित टाइप्स** (बॉटम‑अप)।

#### एक बड़ा ऑब्जेक्ट

पुन: उपयोगिता और DRY‑नेस से अधिक स्पष्टता को प्राथमिकता देता है।

**बोनस:** IDE/डेव अनुभव उत्कृष्ट रहता है, क्योंकि टूलटिप्स में अधिक पूर्ण प्रीव्यू शामिल होता है—बिना किसी झंझट के।

```tsx
interface ProductDetails {
  name: string;
  seller: { name: string };
  availability: Array<{ warehouseId: string; quantity: number }>;
  reviews: Array<{ authorId: number; stars: number }>;
}
```

चूँकि हम स्पष्ट पठनीयता को प्राथमिकता दे रहे हैं, इसलिए _कुछ_ दोहराव (उचित सीमा में) को सहन किया जा सकता है। जब प्रॉपर्टी समूह कई बार दोहराते हैं, तो दोहराए गए फ़ील्ड को एक नामित टाइप में निकालना उचित है।

#### कई नामित टाइप्स

पुन: उपयोगिता और DRY‑नेस को प्राथमिकता देना।

<!-- Readability is a funny measure. Since Readability is often good or **great when there are few types/files.** **Inevitably types tend to proliferate,** featuring ever more properties. **Readability suffers.** -->

यह दृष्टिकोण व्यापक रूप से सबसे पसंद किया गया तरीका है।

```ts
interface ProductDetails {
  name: string;
  seller: Seller;
  reviews: Reviews[];
  availability: Availability[];
}
interface Seller { name: string; }
interface Availability { warehouseId: string; quantity: number; }
interface Reviews { authorId: number; stars: number; }
```

कुल मिलाकर, यह तरीका अच्छा है। लेकिन इसमें भी कुछ कमियां हैं।

- **पढ़ने में आसानी** शुरू में बहुत अच्छी होती है; लेकिन जैसे-जैसे प्रकारों का आकार और संख्या बढ़ती है, यह _कमज़ोर_ हो सकती है।  
- लगातार DRY रहने की कोशिश, लेकिन किस कीमत पर? (इस पर बाद में विस्तार से)।  
- डेवलपर अनुभव घट सकता है क्योंकि टूलटिप्स कम जानकारीपूर्ण होते हैं।

> ⚠️ लगभग TypeScript v3 से, भाषा सर्वर टूलटिप्स को काट देता है, जिससे नेस्टेड प्रॉपर्टीज़ नहीं दिखतीं।  
> 💡 इसे थोड़ा बेहतर बनाने के लिए कुछ तरकीबें हैं। `Cmd` या `Ctrl` दबाकर विभिन्न प्रकार के नामों पर होवर करें — आपको टूलटिप में कम से कम एक अतिरिक्त 'लेयर' प्रॉपर्टीज़ दिखनी चाहिए।

हमें इन दो तरीकों में से एक चुनना क्यों पड़ता है? (बड़ा “बिग पिक्चर” टाइप बनाम नामित सब‑टाइप्स।)

### Technique #1: Why not all

क्या हम सब कुछ पा सकते हैं?

- “बिग‑पिक्चर” टाइप की स्पष्टता?  
- साथ में नामित सब‑टाइप्स?  
- बिना डुप्लिकेशन के?

> ✅ हाँ! 🎉

```tsx
export interface ProductDetails {
  name: string;
  seller: { name: string };
  reviews: Array<{ authorId: number; stars: number }>;
  availability: Array<{ warehouseId: string; quantity: number }>;
}
export type Seller = ProductDetails["seller"];
export type Review = ProductDetails["reviews"][number];
export type Availability = ProductDetails["availability"][number];
```

1.  बड़े “Primary” संरचित प्रकार बनाएं।  
2.  Primary प्रकार से व्युत्पन्न उप‑प्रकार निर्यात करें।

यह तरीका उन सिस्टमों में विशेष रूप से काम करता है जहाँ “उच्च‑स्तरीय” ऑब्जेक्ट्स की दस्तावेज़ीकरण एक ही जगह पर रखी जाती है।  
इसके अलावा, यह तकनीक कई उपयोग‑केसों के बीच पुन: उपयोग का समर्थन करती है: मॉडल, सर्विसेज, क्वेरी परिणाम, आदि।

### Technique #2: Mix-ins

यह रणनीति **सही फ़ील्ड्स**, **सही नामों** को एक साथ जोड़कर **एकल तार्किक ऑब्जेक्ट** को दर्शाने के बारे में है। लक्ष्य टाइपस्क्रिप्ट यूटिलिटीज़ और टाइप यूनियन्स के साथ कई उपयोग‑केसों को कुशलता से संभालना है।

यह दृष्टिकोण पारंपरिक OOP विरासत & हायरार्की से अलग है, जहाँ वस्तुओं की परतें घनी बंधी वर्गीकरण बनाती हैं। **मिक्स‑इन दृष्टिकोण सपाट और ढीले‑संबंधित प्रकारों** के बारे में है, संबंधित फ़ील्ड्स को समूहित करते हुए डुप्लिकेशन को कम करता है।

#### Mix-in Examples

```tsx
interface TodoModel {
  text: string;
  complete: boolean;
}
interface InstanceMixin {
  id: number;
}
/** TodoDraft represents Form state, possibly all undefined */
export type TodoDraft = Partial<TodoModel>;
/** Todo represents a Todo instance record from the database */
export type Todo = TodoModel & InstanceMixin;
```

#### उदाहरण `User`

```tsx
interface User {
  id: number;
  name: string;
  bio: string;
  social: Record<"facebook" | "instagram" | "github", URL>;
}
```

डेटाबेस में सहेजने से पहले और बाद `User` को कैसे दर्शाएँ, देखें।

```tsx
// Core User fields (say for a <form>)
interface UserBase {
  name: string;
  bio: string;
  social: Record<"facebook" | "instagram" | "github", URL>;
}
// Fields from the database
interface InstanceMixin {
  id: number;
  createdAt: Date;
  updatedAt: Date;
}
// A User **instance** - with all fields
type UserInstance = InstanceMixin & UserBase;
```

अब हम ठीक‑वही फ़ील्ड्स को आकार दे सकते हैं (जैसे `password` बनाने/अपडेट करने के लिये, लेकिन `UserInstance` क्वेरी में शामिल नहीं)।

```tsx
interface UserBase {
  name: string;
  bio: string;
  social: Record<"facebook" | "instagram" | "github", URL>;
}
interface InstanceMixin {
  id: number;
  createdAt: Date;
  updatedAt: Date;
}
/** User payload for signup, including `password` field */
export type UserPayload = UserBase & { password: string };
/** Represents User type returned from server. */
export type UserInstance = UserBase & InstanceMixin;
```

1.  “क्या यह अच्छा अभ्यास है?”
2.  “क्या मुझे इसे आज़माना चाहिए?”

पता नहीं। चलिए आगे बढ़ते हैं!

### तकनीक #3: नेमस्पेस के साथ व्यवस्थित करना

यहाँ हम एक `ModelMixins` नेमस्पेस घोषित करते हैं। यह कुछ संगठन प्रदान करता है और पुन: उपयोग पैटर्न को स्पष्ट बनाता है।

**मानकीकृत आकार**

- `createdAt` और `updatedAt` साथ में मौजूद होते हैं।
- `id`, न कि `ID` या `_id`।

```tsx
// `src/types/mixins.d.ts`
namespace ModelMixins {
  interface Identity {
    id: number;
  }
  interface Timestamp {
    createdAt: Date;
    updatedAt: Date;
  }
  type Instance = ModelMixins.Identity & ModelMixins.Timestamp;
  interface HashedPassword {
    passwordHash: string;
  }
  interface InputPassword {
    password: string;
  }
}
```

**टाइप यूनियन्स का उपयोग**

```tsx
// `src/types/user.d.ts`
export interface UserBase {
  name: string;
  bio: string;
  social: Record<"facebook" | "instagram" | "github", URL>;
}
// एकल `User` टाइप, टाइप यूनियन का उपयोग करके
// पूर्व‑और‑पश्च‑सृजन स्थितियों को गतिशील रूप से दर्शाता है।
export type User =
  | (UserBase & ModelMixins.Instance & ModelMixins.HashedPassword)
  | (UserBase & ModelMixins.InputPassword);
```

यदि आवश्यक हो, तो आप व्यक्तिगत नामित टाइप भी निर्यात कर सकते हैं:

```tsx
/** User payload for signup, including `password` field */
export type UserPayload = UserBase & ModelMixins.Instance & ModelMixins.HashedPassword;
/** Represents User type returned from server. */
export type UserInstance = UserBase & ModelMixins.InputPassword;
```

#### वास्तविक‑दुनिया उपयोग


यहाँ एक `upsert()` फ़ंक्शन है जो `in` ऑपरेटर का उपयोग करके `UserInstance` और `UserPayload` टाइप्स में अंतर करता है।

```tsx
function upsert(user: User) {
  if ("id" in user) {
    // TypeScript को यहाँ पता है कि `user` में Instance (id, createdAt, आदि) के फ़ील्ड हैं
    return updateUser(user.id, user);
  } else {
    // TypeScript को यहाँ पता है कि यह `UserBase & ModelMixins.InputPassword` संस्करण का उपयोगकर्ता है
    return createUser(user);
  }
}
```

### सारांश

हमने तीन तकनीकों और कुछ संबंधित सहायक विचारों को कवर किया।

आप सोच रहे होंगे, क्या ये अच्छे पैटर्न हैं? क्या मुझे इन विचारों में से कुछ अपनाने चाहिए?

## संसाधन

- [TypeScript tips for legacy projects: Type only you need](https://sergiocarracedo.es/typescript-tips/)
- [Matt Pocock's Excellent new book](https://www.totaltypescript.com/books/total-typescript-essentials)
- [Total TypeScript Tips](https://www.totaltypescript.com/tips)
````
