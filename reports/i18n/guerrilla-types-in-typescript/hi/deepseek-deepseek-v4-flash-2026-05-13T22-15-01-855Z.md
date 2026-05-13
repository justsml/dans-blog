# Translation Candidate
- Slug: guerrilla-types-in-typescript
- Locale: hi
- Model: deepseek/deepseek-v4-flash
- Target: src/content/posts/2023-09-06--guerrilla-types-in-typescript/hi/index.mdx
- Validation: deferred
- Runtime seconds: 109.58
- Input tokens: 7968
- Output tokens: 11195
- Thinking tokens: unknown
- Cached input tokens: 384
- Cache write tokens: 0
- Estimated cost: $0.004197
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
social_image: ../desktop-social.webp
title: TypeScript में गुरिल्ला टाइप्स
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
## TypeScript में गुरिल्ला प्रकार

इस लेख में, हम टाइप डिज़ाइन में सहायता के लिए तीन दिलचस्प (संभवतः भयानक?) तकनीकों का पता लगाएंगे!

मुख्य लक्ष्य **सुसंगत** और **पूर्वानुमानित** मॉडल/एंटिटी/क्लास इंटरफ़ेस है।

- [टाइप डिज़ाइन करने के तरीके](#approaches-to-designing-types)
  - [एकल बड़ा ऑब्जेक्ट](#single-large-object)
  - [एकाधिक नामित प्रकार](#multiple-named-types)
- [तकनीक #1: सब क्यों नहीं](#technique-1-why-not-all)
- [तकनीक #2: मिक्स-इन्स](#technique-2-mix-ins)
  - [मिक्स-इन उदाहरण](#mix-in-examples)
  - [उदाहरण `User`](#example-user)
- [तकनीक #3: नेमस्पेस के साथ संगठन](#technique-3-organizing-with-namespaces)
  - [वास्तविक दुनिया का उपयोग](#real-world-usage)
- [सारांश](#summary)

<!--
1.  प्रकारों का उच्च-स्तरीय तार्किक प्रतिनिधित्व - डेवलपर्स और व्यावसायिक हितधारकों दोनों के लिए सार्थक तरीके से।
2.  तार्किक रूप से संबंधित फ़ील्ड के संयोजन को मॉडल करने का टिकाऊ तरीका।
    1.  उदाहरण: **ऑब्जेक्ट इंस्टेंस** में अक्सर सामान्य फ़ील्ड `id`, `createdDate`, `createdById`, आदि शामिल होते हैं।
    2.  अपने अलग-अलग डेटाबेस मॉडल से अनुरोध और प्रतिक्रिया फ़ील्ड मॉडल करें। (जैसे `_version`, `_v`)
    3.  कम्पोज़ेबल उपयोगिताएँ, पेजिंग/पेलोड रैपर, आदि: `pageNumber`, `sortBy`, `impersonateSession`, `token`, `_version`, आदि।
3.  नामकरण और टाइपिंग में अनपेक्षित भिन्नताओं से बचें (`id`, `Id`, `ID`, `created_at`, `date_created`, ओह नहीं!)
4.  कई छोटे पुन: प्रयोज्य इंटरफ़ेस और प्रकारों के साथ उच्च स्तरीय प्रकारों की रचना करें।
5.  किसी प्रकार के वेरिएंट को 'स्वचालित रूप से' मिलान करने के लिए [यूनियनों](https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes-func.html#discriminated-unions) का उपयोग करें। -->

### टाइप डिज़ाइन करने के तरीके

आपने शायद "टाइप इम्प्लीमेंटेशन" के आसपास विभिन्न पैटर्न देखे या लिखे होंगे। खासकर जब तीसरे पक्ष के API से डेटा का उपभोग कर रहे हों।

**नोट:** मैं जानबूझकर एंटिटी रिलेशनशिप डायग्राम (ERD) या ऑब्जेक्ट ओरिएंटेड प्रोग्रामिंग (OOP) इनहेरिटेंस पदानुक्रम बनाने की "पारंपरिक" प्रक्रियाओं को अनदेखा कर रहा हूँ। यहाँ, हम अर्ध-संरचित API डेटा का प्रतिनिधित्व करने के लिए प्रकार बना रहे हैं।

आइए दो उच्च-स्तरीय दृष्टिकोणों का पता लगाएं: **एकल बड़ा ऑब्जेक्ट** (ऊपर-से-नीचे) बनाम **एकाधिक नामित प्रकार** (नीचे-से-ऊपर)।

#### एकल बड़ा ऑब्जेक्ट

#### एकल बड़ा ऑब्जेक्ट

स्पष्टता को पुन: प्रयोज्यता और DRY-ness से ऊपर रखता है।

**बोनस:** IDE/डेवलपर अनुभव शानदार है, क्योंकि टूलटिप्स बिना किसी झंझट के अधिक पूर्ण पूर्वावलोकन दिखाते हैं।

```tsx
interface ProductDetails {
  name: string;
  seller: { name: string };
  availability: Array<{ warehouseId: string; quantity: number }>;
  reviews: Array<{ authorId: number; stars: number }>;
}
```

चूंकि हम स्पष्ट पठनीयता को प्राथमिकता दे रहे हैं, इसलिए उचित सीमा में कुछ पुनरावृत्ति करना ठीक है। जब गुणों के समूह कई बार दोहराए जाते हैं, तो बेझिझक उन दोहराए गए फ़ील्ड को एक नामित प्रकार में निकाल लें।

#### एकाधिक नामित प्रकार

पुन: प्रयोज्यता और DRY-ness को प्राथमिकता देना।

<!-- पठनीयता एक अजीब मापदंड है। पठनीयता अक्सर तब अच्छी या बहुत अच्छी होती है जब कुछ प्रकार/फ़ाइलें हों। अनिवार्य रूप से प्रकार बढ़ते जाते हैं, और अधिक गुण जोड़ते जाते हैं। पठनीयता प्रभावित होती है। -->

यह दृष्टिकोण संभवतः बड़े अंतर से पसंदीदा दृष्टिकोण है।

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

कुल मिलाकर, यह दृष्टिकोण बहुत अच्छा है। लेकिन इसकी कमियां भी हैं।

- **पठनीयता** शुरू में उत्कृष्ट होती है; हालांकि, जैसे-जैसे प्रकारों का आकार और संख्या बढ़ती है, यह प्रभावित हो सकती है।
- बेरहमी से DRY, लेकिन किस कीमत पर? (इस पर बाद में और अधिक।)
- डेवलपर अनुभव प्रभावित हो सकता है क्योंकि टूलटिप्स कम जानकारीपूर्ण होते हैं।

> ⚠️ (लगभग) TypeScript v3 से, Language Server टूलटिप्स को काट देता है, नेस्टेड गुणों को छोड़ देता है।
> 💡 चीजों को थोड़ा बेहतर बनाने के लिए कुछ ट्रिक्स हैं। `Cmd या Ctrl` दबाकर रखें, फिर विभिन्न प्रकार के नामों पर होवर करें - आपको टूलटिप में गुणों की कम से कम एक अतिरिक्त 'परत' दिखनी चाहिए।

हमें इन दोनों दृष्टिकोणों के बीच चुनाव क्यों करना पड़ता है? (बड़ा प्रकार बनाम नामित उप-प्रकार।)

### तकनीक #1: सब क्यों नहीं

क्या हम सब कुछ पा सकते हैं?

- "बड़ी तस्वीर" प्रकारों की स्पष्टता?
- साथ ही नामित उप-प्रकार?
- बिना दोहराव के?

> ✅ हाँ! 🎉

<!-- ### Some things to consider

- How do you represent a `one-to-one` relationship like `Product` -> `Seller`?
- What about `one-to-many` relationships? Say `Reviews`, or `Photos`?
- Let Prisma handle it? (Not a bad idea, but this article is secretly about learning some TypeScript...) -->

<!-- This approach is an exercise in NEVER duplicating Model field names. Along the way, I think the "big picture" more obvious (in one spot). starting with the largest, highest-level type, and deriving the simpler types from it. -->

<!-- When provided with some structured array/object data, many TypeScript coders feel the urge to create types. Loads of types. Eventually a cascade of layers forms, made up of simpler types building ever more complex types.

Or maybe you are the type to start at the highest-level type, scaffolding enough to write the next sub-type in the tree? -->

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

1.  बड़े "प्राथमिक" संरचित प्रकार बनाएं।
2.  प्राथमिक प्रकार से व्युत्पन्न उप-प्रकार निर्यात करें।

यह दृष्टिकोण उन प्रणालियों में वास्तव में चमकता है जहां "उच्च-स्तरीय" ऑब्जेक्ट एक स्थान पर दस्तावेज़ीकरण से लाभान्वित होते हैं। साथ ही, यह तकनीक कई उपयोग मामलों के बीच पुन: उपयोग का समर्थन करती है: मॉडल, सेवाएं, क्वेरी परिणाम, आदि।

### तकनीक #2: मिक्स-इन्स

यह रणनीति **सही फ़ील्ड्स** को **सही नामों** के साथ जोड़कर **एकल तार्किक ऑब्जेक्ट्स** का प्रतिनिधित्व करने के बारे में है। लक्ष्य TypeScript यूटिलिटीज़ और टाइप यूनियनों के साथ कई उपयोग मामलों को कुशलतापूर्वक संबोधित करना है।

यह दृष्टिकोण पारंपरिक OOP इनहेरिटेंस और पदानुक्रमों से भिन्न है, जिसका उद्देश्य ऑब्जेक्ट्स की परतों को कसकर बंधे वर्गीकरण में बनाना है। **मिक्स-इन दृष्टिकोण सपाट और ढीले-संबंधित प्रकारों** के बारे में है, संबंधित फ़ील्ड्स को समूहित करते हुए दोहराव को कम करना।

#### मिक्स-इन उदाहरण

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

आइए डेटाबेस में सहेजने से पहले और बाद में `User` का प्रतिनिधित्व करें।

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

अब हम अपनी आवश्यकता के अनुसार सटीक फ़ील्ड्स को गढ़ सकते हैं (जैसे कि `password` create/update के लिए, लेकिन `UserInstance` की क्वेरी में शामिल नहीं)।

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

1.  "क्या यह एक अच्छा अभ्यास है?"
2.  "क्या मुझे इसे आज़माना चाहिए?"

पता नहीं। चलिए आगे बढ़ते हैं!

### तकनीक #3: नेमस्पेस के साथ संगठन

यहाँ, हम एक `ModelMixins` नेमस्पेस घोषित करते हैं। यह कुछ संगठन और एक स्पष्ट पुन: उपयोग पैटर्न प्रदान करता है।

**मानकीकृत आकार**

- `createdAt` और `updatedAt` एक साथ मौजूद हैं।
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

**टाइप यूनियन का उपयोग**

```tsx
// `src/types/user.d.ts`
export interface UserBase {
  name: string;
  bio: string;
  social: Record<"facebook" | "instagram" | "github", URL>;
}
// Single `User` type, using Type Union to dynamically
//  represent the pre- & post-creation states.
export type User =
  | (UserBase & ModelMixins.Instance & ModelMixins.HashedPassword)
  | (UserBase & ModelMixins.InputPassword);
```

यदि चाहें, तो आप अलग-अलग नामित प्रकारों को भी निर्यात कर सकते हैं:

```tsx
/** User payload for signup, including `password` field */
export type UserPayload = UserBase & ModelMixins.Instance & ModelMixins.HashedPassword;
/** Represents User type returned from server. */
export type UserInstance = UserBase & ModelMixins.InputPassword;
```

#### वास्तविक दुनिया में उपयोग

यहाँ एक `upsert()` फ़ंक्शन है जो `UserInstance` और `UserPayload` प्रकारों के बीच अंतर करने के लिए `in` ऑपरेटर का उपयोग करता है।

```tsx
function upsert(user: User) {
  if ("id" in user) {
    // TypeScript knows `user` here has fields from Instance (id, createdAt, etc)
    return updateUser(user.id, user);
  } else {
    // TypeScript knows this must be the `UserBase & ModelMixins.InputPassword` version of user.
    return createUser(user);
  }
}
```

### सारांश

हमने तीन तकनीकों और कुछ संबंधित सहायक विचारों को कवर किया।

आप पूछ सकते हैं, क्या ये अच्छे पैटर्न हैं? क्या मुझे इनमें से कुछ विचारों को अपनाना चाहिए?

## संसाधन

- [लेगसी प्रोजेक्ट्स के लिए TypeScript टिप्स: केवल वही टाइप करें जिसकी आवश्यकता है](https://sergiocarracedo.es/typescript-tips/)
- [मैट पोकॉक की उत्कृष्ट नई पुस्तक](https://www.totaltypescript.com/books/total-typescript-essentials)
- [Total TypeScript टिप्स](https://www.totaltypescript.com/tips)
````
