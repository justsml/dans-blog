# Translation Candidate
- Slug: higher-order-programming
- Locale: ar
- Model: openrouter/openai/gpt-oss-120b:nitro
- Target: src/content/posts/2015-10-05--higher-order-programming/ar/index.mdx
- Validation: deferred
- Runtime seconds: 1.62
- Input tokens: 1275
- Output tokens: 596
- Thinking tokens: unknown
- Cached input tokens: 512
- Cache write tokens: 0
- Estimated cost: $0.000157
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
social_image: ../desktop-social.webp
title: البرمجة عالية المستوى
subTitle: استكشاف تقنيات خط الأنابيب القائمة على المصفوفات والمجموعات
date: '2015-09-22'
modified: '2024-07-30'
category: Code
subCategory: programming
tags:
  - programming
  - patterns
  - models
  - source-code
  - organization
cover: ../susan-holt-simpson-799094-unsplash.webp
cover_mobile: ../w300_susan-holt-simpson-799094-unsplash.webp
cover_icon: ../icon_susan-holt-simpson-799094-unsplash.webp
---
## استكشاف تقنيات خط الأنابيب القائمة على المصفوفات والمجموعات

### نمط مضاد؟

هذه محاولة لاستعراض الفوائد التي تحصل عليها عندما **تكتب كل شيء كمصفوفة**. (باستخدام مفاهيم الجيداي من SmallTalk)

إليك بعض المبادئ الإرشادية:

1.  جميع المدخلات تشبه المصفوفة. حتى وإن كانت مصفوفة من عنصر واحد.  
1.  يجب أن تقبل الدوال ذات المستوى الأعلى وتعيد عادةً مصفوفات. (باستثناء طرق الاستدعاء العكسي للحلقات: map/reduce/each/filter)  
1.  99 من كل 100 مطور يعانون من ما أسميه متلازمة `الزيادة الحادة للمخطط`.  
1.  احذر النماذج `المدعومة بالفئات` المتضخمة - مع كل المتاعب المتوقعة: حالة `مثيل` هشة مع العديد من الرافعات والأزرار التي يمكن العبث بها، معاملات قاعدة البيانات، أقفال SQL، التزامن/القفل (الذي يعمل دائمًا في المرة الأولى)، استخدام `الخصائص getter/setter` التقليدية، واستخدامك لـ `public/private/final/إلخ` يبدو ثابتًا، أليس كذلك؟

1.  لذا دعني آخذ مشكلة شائعة وأُدخل بعض الأفكار القائمة على المجموعات.  
1.  موقع مدونة افتراضي يحتوي على الكثير من المقالات، ويحتوي على المزيد من المشاركات (التعليقات).  
1.  لنضيف طريقة `delete` (أدناه) - لكن مع دعم لكل من العنصر المفرد أو المصفوفات.

```java
package net.danlevy.why.java___why.you.got.all.the.dots____it.must.be.all.the.factories;

public class Post {
  public String   title;
  public Date     created;
  public String   message;

  public Post(String title, String message) {
    this.title    = title;
    this.message  = message;
    this.created  = new Date();
  }

  public Date isArchived() {
    return this.created < new Date(2015, 0, 1);
  }

  // Post.delete` can be called w/ a singular Post or an array of Post[]
  public static int delete(Post post) {
    List<Post> posts = new List<Post>(post);
    return delete(posts)
  }

  public static int delete(List<Post> posts) {
    return posts.map(Dao.remove);
  }
}
```

> سامحني إذا كان جافا الخاص بي متآكلاً قليلاً.
````
