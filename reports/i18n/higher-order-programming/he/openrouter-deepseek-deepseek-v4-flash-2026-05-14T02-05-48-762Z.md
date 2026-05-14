# Translation Candidate
- Slug: higher-order-programming
- Locale: he
- Model: openrouter/deepseek/deepseek-v4-flash
- Target: src/content/posts/2015-10-05--higher-order-programming/he/index.mdx
- Validation: deferred
- Runtime seconds: 18.63
- Input tokens: 1250
- Output tokens: 2607
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- Estimated cost: $0.000905
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
social_image: ../desktop-social.webp
title: תכנות מסדר גבוה
subTitle: בחינת טכניקות צנרת מבוססות מערכים וקבוצות
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
## חקירת טכניקות צנרת מבוססות מערכים וקבוצות

### אנטי-תבנית?

זוהי חקירה של יתרונות שמושגים כאשר **מקודדים הכל כמערך.** (באמצעות מושגי ג'דאי מ-SmallTalk)

הנה כמה עקרונות מנחים:

1.  כל הקלט דמוי-מערך. אפילו מערך של 1.
1.  פונקציות ברמה גבוהה צריכות בדרך כלל לקבל ולהחזיר מערכים. (למעט שיטות callback ללולאות: map/reduce/each/filter)
1.  99 מתוך 100 קוד של מפתחים סובל ממה שאני מכנה תסמונת `עודף סכמה חריף`.
1.  היזהרו ממודלים מנופחים `מגובי מחלקה` - עם כל המלכודות הצפויות: `מצב מופע` שביר עם כל כך הרבה מנופים וכפתורים להתעסק איתם, טרנזקציות DB, נעילות SQL, async/mutexing (שתמיד עובד בפעם הראשונה), שימוש ב-`property getter/setters` אידיומטיים, והשימוש שלך ב-`public/private/final/etc` מוצק, נכון?

1.  אז תן לי לקחת בעיה נפוצה ו-_להכניס בכוח_ ~~~להוסיף~~~ כמה הרהורים מבוססי קבוצות.
1.  אתר בלוג היפותטי יש בו הרבה מאמרים, ויש אפילו יותר פוסטים (תגובות).
1.  בוא נוסיף מתודת `delete` (להלן) - אבל עם תמיכה גם ביחיד וגם במערכים.

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

> סלח לי אם הג'אווה שלי קצת חלודה.
````
