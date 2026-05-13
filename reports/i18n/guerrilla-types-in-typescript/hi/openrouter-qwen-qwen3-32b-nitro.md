# Translation Candidate
- Slug: guerrilla-types-in-typescript
- Locale: hi
- Model: openrouter/qwen/qwen3-32b:nitro
- Target: src/content/posts/2023-09-06--guerrilla-types-in-typescript/hi/index.mdx
- Validation: rejected: direct AI SDK translation failed
- Runtime seconds: 55.51
- Input tokens: 10740
- Output tokens: 12389
- Thinking tokens: unknown
- Cached input tokens: 512
- Cache write tokens: 0
- Estimated cost: $0.003833
- Pricing source: local-openrouter-estimate
- Note: Command failed: git add src/content/posts/2023-09-06--guerrilla-types-in-typescript/hi/index.mdx reports/i18n/guerrilla-types-in-typescript/hi
## Raw Output

````mdx
---
social_image: ../desktop-social.webp
title: ''
subTitle: विद्रोही टाइप डिज़ाइन
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
## टाइपस्क्रिप्ट में गुरिल्ला टाइप्स

इस आर्टिकल में, हम टाइप डिज़ाइन में सहायता के लिए तीन रोचक (शायद खराब?) तकनीकों का अन्वेषण करेंगे!

मुख्य लक्ष्य **संगत** और **अनुमानित** मॉडल/एंटिटी/क्लास इंटरफ़ेस हैं।

- [टाइप डिज़ाइन करने के दृष्टिकोण](#टाइप-डिज़ाइन-करने-के-दृष्टिकोण)
  - [एकल बड़ा ऑब्जेक्ट](#एकल-बड़ा-ऑब्जेक्ट)
  - [कई नामित टाइप्स](#कई-नामित-टाइप्स)
- [तकनीक #1: क्यों सभी नहीं](#तकनीक-1-क्यों-सभी-नहीं)
- [तकनीक #2: मिश्रण (Mix-ins)](#तकनीक-2-मिश्रण)
  - [मिश्रण उदाहरण](#मिश्रण-उदाहरण)
  - [उदाहरण `User`](#उदाहरण-user)
- [तकनीक #3: नेमस्पेस के साथ संगठन](#तकनीक-3-नेमस्पेस-के-साथ-संगठन)
  - [वास्तविक उपयोग](#वास्तविक-उपयोग)
- [सारांश](#सारांश)

### टाइप डिज़ाइन करने के दृष्टिकोण

आपने संभवतः "टाइप इम्प्लीमेंटेशन" के चारों ओर भिन्न पैटर्न देखे हैं या लिखे हैं। खासकर जब आप थर्ड पार्टी एपीआई से डेटा को कंज्यूम कर रहे होते हैं।  

**नोट:** मैं जानबूझकर "परंपरागत" प्रक्रियाओं की अनदेखी कर रहा हूँ जैसे एंटिटी रिलेशनशिप डायग्राम (ERD) बनाना या ऑब्जेक्ट ओरिएंटेड प्रोग्रामिंग (OOP) अनुवंशिकता के हिरार्की बनाना। यहाँ हम अर्द्ध-संरचित एपीआई डेटा को प्रतिनिधित्व करने वाले टाइप्स बना रहे हैं।  

चलिए दो उच्च-स्तरीय दृष्टिकोणों का अन्वेषण करते हैं: **एकल बड़ा ऑब्जेक्ट** (ऊपर से नीचे की ओर) vs. **कई नामित टाइप्स** (नीचे से ऊपर की ओर)।  

#### एकल बड़ा ऑब्जेक्ट  
पुनः उपयोगिता और DRY-नेस के बजाय स्पष्टता को प्राथमिकता देता है।  

**लाभ:** आईडीई/डेव अनुभव अच्छा होता है, क्योंकि टूलटिप्स में एक अधिक पूर्ण पूर्वावलोकन शामिल होता है - बिना किसी अड़चन के।

```tsx
interface ProductDetails {
  name: string;
  seller: { name: string };
  availability: Array<{ warehouseId: string; quantity: number }>;
  reviews: Array<{ authorId: number; stars: number }>;
}
```

चूंकि हम स्पष्ट पठनीयता को प्राथमिकता दे रहे हैं, इसलिए कुछ पुनरावृत्ति करना ठीक है (अनुमानित रूप से)। जब गुणों के समूह बार-बार प्रकट होते हैं, तो पुनरावृत्ति के क्षेत्रों को एक नामित टाइप में निकालने में स्वतंत्र महसूस करें।

#### कई नामित टाइप्स  
पुनः उपयोगिता और DRY-नेस को प्राथमिकता देता है।

<!-- पठनीयता एक मजेदार मापदंड है। क्योंकि पठनीयता अक्सर अच्छी या **अच्छी होती है जब टाइप्स/फ़ाइलों की संख्या कम होती है।** **अनिवार्य रूप से टाइप्स बढ़ते रहते हैं,** जिसमें हर बार अधिक गुण होते हैं। **पठनीयता प्रभावित होती है।** -->

यह दृष्टिकोण अधिकांशतः व्यापक रूप से पसंद किया जाता है।

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

कुल मिलाकर, यह दृष्टिकोण शानदार है। लेकिन इसमें कमियाँ भी हैं।

- **पठनीयता** प्रारंभ में शानदार होती है; हालांकि, यह _हो सकता है_ कि प्रकारों की संख्या और आकार बढ़ने पर प्रभावित हो जाए।  
- अत्यधिक DRY, लेकिन क्या कीमत? (बाद में इस पर अधिक चर्चा होगी।)  
- विकासकर्ता अनुभव प्रभावित हो सकता है क्योंकि टूलटिप्स कम सूचनापूर्ण होते हैं।  

> ⚠️ लगभग TypeScript v3 से, भाषा सर्वर टूलटिप्स काट देता है, नेस्टेड प्रॉपर्टीज को छोड़ देता है।  
> 💡 थोड़ा सुधार करने के लिए टिप्स हैं। `Cmd या Ctrl` बटन को धीरे-धीरे दबाएं, फिर विभिन्न प्रकार के नाम पर होवर करें - आपको टूलटिप में कम से कम एक अतिरिक्त 'परत' दिखाई देनी चाहिए।  

क्या हमें इन दोनों दृष्टिकोणों के बीच चुनाव करना ही है? (बड़ा प्रकार vs. नामित उप-प्रकार)  

### तकनीक #1: क्यों न सबकुछ  

क्या हमें सबकुछ मिल सकता है?  

- "बड़ी तस्वीर" प्रकार की स्पष्टता?  
- नामित उप-प्रकार के साथ?  
- पुनरावृत्ति के बिना?

✅ हां! 🎉

<!-- ### कुछ बातें ध्यान में रखने वाली हैं

- `एक-से-एक` संबंध को कैसे प्रस्तुत करेंगे? जैसे `Product` -> `Seller`?
- `एक-से-अनेक` संबंधों के बारे में क्या? मान लीजिए `Reviews`, या `Photos`?
- क्या Prisma इसे संभाल सकता है? (एक खराब विचार नहीं है, लेकिन यह लेख वास्तव में TypeScript के कुछ सिखाने के बारे में है...) -->

<!-- यह दृष्टिकोण आपके मॉडल के फील्ड नामों की पुनरावृत्ति करने का अभ्यास है। इस दृष्टिकोण में मुझे लगता है कि "बड़ी तस्वीर" अधिक स्पष्ट हो जाती है (एक ही स्थान में)। सबसे बड़े, सर्वोच्च स्तर के प्रकार से शुरू करें, और उससे सरल प्रकारों को निकालें। -->

<!-- कुछ संरचित सरणी/वस्तु डेटा प्रदान करने पर, कई TypeScript डेवलपर्स के पास प्रकार बनाने की इच्छा होती है। बहुत सारे प्रकार। अंततः एक प्रकार का प्रवाह बन जाता है, जिसमें सरल प्रकार अधिक जटिल प्रकारों को बनाते हैं।

या तो आप सर्वोच्च स्तर के प्रकार से शुरू करने वाले प्रकार हैं, जिसमें पर्याप्त स्केलिंग है ताकि वृक्ष में अगला उप-प्रकार लिखा जा सके? -->

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

1. बड़े "प्राथमिक" संरचित प्रकार बनाएं।  
2. प्राथमिक प्रकार से उप-प्रकार निर्यात करें।  

इस दृष्टिकोण की वास्तविक शक्ति उन प्रणालियों में होती है जहां "उच्च-स्तरीय" वस्तुएं एक ही स्थान पर दस्तावेजीकरण से लाभ उठाती हैं।  
इसके अलावा, यह तकनीक कई उपयोग-केसों के बीच पुन: उपयोग का समर्थन करती है: मॉडल, सेवाएं, प्रश्न परिणाम, आदि।  

### तकनीक #2: मिश्रित-इन (Mix-ins)  

यह रणनीति **सही फील्ड**, **सही नाम** के साथ एकत्र करने के बारे में है, ताकि **एकल तार्किक वस्तुएं प्रतिनिधित्व करें**। लक्ष्य TypeScript उपयोगिताएँ और प्रकार संघों का उपयोग करके कई उपयोग-केसों को कुशलता से संचालित करना है।  

यह दृष्टिकोण पारंपरिक OOP विरासत और श्रृंखला से अलग होता है, जिसका उद्देश्य वस्तुओं की परतों को करीबी बंधनों वाले वर्गीकरण में बनाना होता है। **मिश्रित-इन दृष्टिकोण फ्लैट और ढीले-ढाले संबंधित प्रकारों के बारे में है**, संबंधित फील्डों के समूह करने के बीच डुप्लिकेशन को कम करते हुए।  

#### मिश्रित-इन उदाहरण

```tsx
interface TodoModel {
  text: string;
  complete: boolean;
}
interface InstanceMixin {
  id: number;
}
/** TodoDraft फॉर्म स्थिति का प्रतिनिधित्व करता है, संभवतः सभी अपरिभाषित हो सकते हैं */
export type TodoDraft = Partial<TodoModel>;
/** Todo डेटाबेस से एक Todo उदाहरण रिकॉर्ड का प्रतिनिधित्व करता है */
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

चलिए डेटाबेस में सहेजने से पहले और बाद के उपयोगकर्ता का प्रतिनिधित्व करते हैं।

```tsx
// मूल उपयोगकर्ता फील्ड (कहीं एक <form> के लिए)
interface UserBase {
  name: string;
  bio: string;
  social: Record<"facebook" | "instagram" | "github", URL>;
}
// डेटाबेस से फील्ड
interface InstanceMixin {
  id: number;
  createdAt: Date;
  updatedAt: Date;
}
// एक उपयोगकर्ता **उदाहरण** - सभी फील्ड के साथ
type UserInstance = InstanceMixin & UserBase;
```

अब हम ठीक उस फील्ड को स्कुल्प्ट कर सकते हैं जिनकी हमें आवश्यकता है (जैसे `password` बनाने/अपडेट करने के लिए, लेकिन `UserInstance` के क्वेरी में शामिल नहीं है)।

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
/** उपयोगकर्ता पेलोड साइनअप के लिए, `password` फील्ड के साथ */
export type UserPayload = UserBase & { password: string };
/** सर्वर से लौटे उपयोगकर्ता प्रकार का प्रतिनिधित्व करता है। */
export type UserInstance = UserBase & InstanceMixin;
```

1.  "क्या यह एक अच्छी प्रथा है?"
2.  "क्या मैं इसे आज़माना चाहिए?"

कोई धारणा नहीं। चलिए आगे बढ़ते हैं!

### तकनीक #3: नेमस्पेस के साथ संगठित करना

यहाँ, हम एक `ModelMixins` नेमस्पेस को घोषित करते हैं। यह कुछ संगठन के साथ एक स्पष्ट पुनः उपयोग पैटर्न प्रदान करता है।

**मानक आकार**

- `createdAt` और `updatedAt` एक साथ मौजूद होते हैं।
- `id`, `ID` या `_id` के बजाय।

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

**प्रकार संघ का उपयोग**

```tsx
// `src/types/user.d.ts`
export interface UserBase {
  name: string;
  bio: string;
  social: Record<"facebook" | "instagram" | "github", URL>;
}
// एकल `User` प्रकार, प्रकार संघ का उपयोग करके गतिशील रूप से
//  बनाने के पूर्व- और पश्चात- अवस्थाओं का प्रतिनिधित्व करता है।
export type User =
  | (UserBase & ModelMixins.Instance & ModelMixins.HashedPassword)
  | (UserBase & ModelMixins.InputPassword);
```

अगर आवश्यक हो, तो आप व्यक्तिगत नामित प्रकार भी निर्यात कर सकते हैं:

```tsx
/** साइनअप के लिए उपयोगकर्ता पेलोड, `password` फील्ड के साथ शामिल है। */
export type UserPayload = UserBase & ModelMixins.Instance & ModelMixins.HashedPassword;
/** सर्वर से लौटे उपयोगकर्ता प्रकार का प्रतिनिधित्व करता है। */
export type UserInstance = UserBase & ModelMixins.InputPassword;
```

#### वास्तविक दुनिया का उपयोग

यहां एक `upsert()` फ़ंक्शन है जो `in` ऑपरेटर का उपयोग करके `UserInstance` और `UserPayload` प्रकार के बीच अंतर करता है।

```tsx
function upsert(user: User) {
  if ("id" in user) {
    // TypeScript जानता है कि यहां `user` में Instance के फील्ड (id, createdAt, आदि) हैं
    return updateUser(user.id, user);
  } else {
    // TypeScript जानता है कि यह `UserBase & ModelMixins.InputPassword` का उपयोगकर्ता प्रकार होना चाहिए।
    return createUser(user);
  }
}
```

### सारांश

हमने तीन तकनीकों और कुछ संबंधित समर्थन वाले विचारों को शामिल किया।

आप यह पूछ सकते हैं, क्या ये अच्छे प्रारूप हैं? क्या मैं इन विचारों में से कुछ अपनाना चाहिए?

## संसाधन

- [पुराने परियोजनाओं के लिए TypeScript सुझाव: केवल आवश्यक प्रकार का उपयोग करें](https://sergiocarracedo.es/typescript-tips/)
- [मैट पोकॉक की उत्कृष्ट नई पुस्तक](https://www.totaltypescript.com/books/total-typescript-essentials)
- [Total TypeScript Tips](https://www.totaltypescript.com/tips)
````
