# Translation Candidate
- Slug: higher-order-programming
- Locale: he
- Model: openrouter/openai/gpt-oss-120b:nitro
- Target: src/content/posts/2015-10-05--higher-order-programming/he/index.mdx
- Validation: deferred
- Runtime seconds: 1.84
- Input tokens: 1291
- Output tokens: 585
- Thinking tokens: unknown
- Cached input tokens: 512
- Cache write tokens: 0
- Estimated cost: $0.000156
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
social_image: ../desktop-social.webp
title: תכנות ברמה גבוהה
subTitle: חקר טכניקות צינור מבוססות מערך וקבוצה
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
## חקירת טכניקות צינור מבוססות מערכים וקבוצות

### תבנית נגדית?

זהו חקירה של היתרונות שמקבלים כשאתם **כותבים הכל כמערך**. (בהשראת קונספטי ג'דיי מ‑SmallTalk)

הנה כמה עקרונות מנחים:

1.  כל הקלט הוא דמוי‑מערך. אפילו אם מדובר במערך של 1.
2.  פונקציות ברמה גבוהה צריכות בדרך כלל לקבל **ולחזור** מערכים. (למעט שיטות‑callback ללולאות: map/reduce/each/filter)
3.  99 מתוך 100 מפתחים סובלים ממה שאני קורא לו תסמונת `acute schema surplusage`.
4.  היזהרו מ‑`class-backed models` תפוסים – עם כל הלכידות הצפויות: `instance state` שביר עם כל כך הרבה ידיות וכפתורים לשחק איתם, טרנזקציות DB, נעילות sql, async/mutexing (שמתפקד תמיד בפעם הראשונה), שימוש ב‑`property getter/setters` אידיאומטיים, והשימוש שלכם ב‑`public/private/final/etc` הוא מוצק, נכון?

5.  אז תנו לי לקחת בעיה נפוצה ול_להכניס_ ~~~להוסיף~~~ כמה מחשבות מבוססות‑קבוצה.
6.  אתר בלוג היפותטי מכיל המון Articles, ויש אפילו יותר Posts (תגובות).
7.  נוסיף שיטת `delete` (להלן) – עם תמיכה הן ב‑singular והן במערכים.

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

> סליחה אם הקוד ב‑Java שלי קצת חלוד.
````
