# Translation Candidate
- Slug: one-weird-trick-to-speed-up-feature-teams
- Locale: he
- Model: openrouter/deepseek/deepseek-v4-flash
- Target: src/content/posts/2024-09-29--one-weird-trick-to-speed-up-feature-teams/he/index.mdx
- Validation: deferred
- Runtime seconds: 51.36
- Input tokens: 6363
- Output tokens: 6958
- Thinking tokens: unknown
- Cached input tokens: 1152
- Cache write tokens: 0
- Estimated cost: $0.002681
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
title: טריק מוזר אחד להאצת צוותי פיצ'רים!
subTitle: מהנדסים בכירים שונאים את זה!
date: '2024-09-29'
modified: '2024-09-30'
tags:
  - agile
  - teams
category: Engineering
social_image: ../desktop-social.webp
cover_full_width: ../wide_danny-howe-98KlbUsOO_w-unsplash.webp
cover_mobile: ../danny-howe-98KlbUsOO_w-unsplash__w200.webp
cover_icon: ../danny-howe-98KlbUsOO_w-unsplash__w200.webp
cover_credit: >-
  Photo by <a
  href="https://unsplash.com/@dannyhowe?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Danny
  Howe</a> on <a
  href="https://unsplash.com/photos/red-and-white-neon-light-signage-98KlbUsOO_w?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Unsplash</a>
---
{/* Add html5 toggle element */}

<details>
<summary>תוכן עניינים</summary>

- [חשיבה במפתחות](#thinking-in-keys)
  - [עיצוב עם מפתחות](#designing-with-keys)
  - [KV כגרפים ועצים?](#kvs-as-graphs--trees)
  - [מתי להשתמש בתבניות KV](#when-to-use-kv-patterns)
  - [מתי להימנע מתבניות KV](#when-to-avoid-kv-patterns)
  - [כשצריך יותר מ-KV](#when-you-need-more-than-kv)
- [צעדים הבאים](#next-steps)
  - [שירות עובדות - פרויקט עזר](#fact-service---reference-project)
- [סיכום](#conclusion)
  - [קריאה נוספת](#further-reading)

</details>

כשמתכננים מערכת או תכונה חדשה, קל להיתקע בעיצוב הסכֵמה. במאמר זה אשתף טריק נחמד שהשתלם לאורך הקריירה שלי.

<section class="breakout">
  _נסו_ את התמדת הנתונים הפשוטה ביותר האפשרית כשמתכנים מערכת או תכונה חדשה.
</section>

לעתים קרובות מדי, אני רואה צוותים שבוחרים ב-SQL או MongoDB כאפשרות היחידה לאחסון נתונים. ברור, אף אחד לא מפוטר על בחירה ב-SQL. אבל מה אם אגיד לכם שיש דרך פשוטה, מהירה וזולה יותר להתחיל?

ייתכן שחנות KV (מפתח-ערך) היא כל מה שצריך. משהו כמו Redis או S3.

זו לא תמיד הבחירה הנכונה, אבל אולי **לעתים קרובות יותר ממה שאתם חושבים.**

שכבת אחסון פשוטה יכולה להאיץ במידה מתונה את הפיתוח *המוקדם* על ידי שימוש חוזר בקוד שכבת הנתונים והימנעות מעלויות הקשורות לשינויים בעיצוב הסכֵמה ובהגירות. שינויים יקרו בכל מקרה; תנו לקוד להתמודד איתם כמה שיותר זמן. עדיף להימנע מטיפול בשינויים בשני מקומות.

רווחי ביצועים סבירים מכיוון שחיפושי `key` מותאמים היטב, וכתיבות יכולות להרוויח מעדכונים מצטברים.

{/* Avoid KV patterns if you need JOINs or to query by properties in your dataset. Or in cases where you have an unbounded/infinitely growing datasets. (`Logs`, `Signups`, etc.) */}

## חשיבה במפתחות

זה עלול להרגיש מוזר לתכנן עם תבנית מפתח-ערך קודם, במיוחד אם אתה רגיל לתכנן מערכות עם היררכיות אובייקטים או דיאגרמות ישויות-קשרים וליישם אותן ישירות ב-SQL.

כנראה ***השתמשת*** בתבניות מפתח-ערך בעבר! הן נמצאות בכל מקום, מקובצי תצורה וכתובות URL ועד לאחסון אובייקטים בסגנון S3! בכל פעם שאתה מתמודד עם נתונים דרך ערך `ID` ייחודי, נחש מה? עוד תבנית מפתח-ערך! (אם כי לא בהכרח מאגר מפתח-ערך.)

### תכנון עם מפתחות

למעשה, ניתן לייצג כמעט את כל הנתונים באמצעות תבניות מפתח-ערך. (למעשה, מאגרי נתונים רבים מסדר גבוה יותר בנויים על תבניות מפתח-ערך ברמה נמוכה יותר.) בואו נסתכל על כמה דוגמאות:

```markdown
user/123          {id: 123, ...}
user/123/block    ['user/456', 'user/789']
user/123/groups   ['admin', 'staff']
user/420/friends  ['user/456', 'user/789']

group/admin       {user: '*:rw'}
group/default     {user: '*:r'}

product/42/discount/<UUID>	{percentOff: '10%'}
product/42/discount/<UUID>	{percentOff: '20%', minTotal: 100.0}
```

אולי שמתם לב, אבל ה-`ID` הוא לעתים קרובות מפתח בפני עצמו! זוהי תבנית נפוצה במאגרי מפתח-ערך. המפתח הוא לעתים קרובות מורכב מסוג הישות ומהמזהה הייחודי. (למשל `user/123`, `user:456`)

### KVs כגרפים ועצים?

זה יכול להיות מועיל לייצג מבני נתונים מורכבים כמו גרפים או עצים באמצעות תבניות מפתח-ערך. (שוב, כתובות REST URL הן דוגמה מצוינת לכך.)

היררכיית המפתחות (`user/420` -> `user/420/friends`) מקודדת באופן טבעי קשר גרפי בין ה-`user` לבין ה-`friends` שלו.

זוהי דרך מהירה וזולה לסריאליזציה של מבני נתונים גרפיים. במיוחד אם אינך זקוק למורכבות של מסד נתונים גרפי (כמו Neo4j).

<figure>
![גרף של user/123](../KVsCanBeGraphs.webp)
<figcaption>גרף של user/123</figcaption>
</figure>

### מתי להשתמש בתבניות KV

- כשאתה זקוק לקנה מידה עצום. (מיליארדי או אפילו טריליוני זוגות KV.)
- כשאתה ניגש לנתונים בעיקר דרך מפתח ייחודי.
- כשאתה זקוק למבני נתונים פשוטים.
- כשהנתונים שלך בעלי היררכיה, מבנה גרף או עץ.

### מתי להימנע מתבניות KV

אל תאחסן דברים כמו תגובות בבלוג בזוג KV _**בודד**_. לדוגמה, `post/666 -> {comments: [...יותר מדי...]}`. במקום זאת, השתמש ב-`post/666/comments/1`, או `post/666/comments/<UUID>` וכו'. או עבור לטבלת SQL.

- כשאתה צריך לחפש לפי מאפיינים (לא מפתח או מזהה) במערך הנתונים שלך.
- כשאתה צריך לבצע JOIN בין מספר ישויות.
- כשאתה צריך לאכוף אילוצים או קשרים מורכבים.

### כשאתה צריך יותר מ-KV

כשדרישות הפרויקט מתפתחות באופן טבעי, ייתכן שתצטרך לעשות יותר ממה שמאגר ה-KV שלך תומך בו. בשלב זה תצטרך לשקול מעבר למאגר נתונים מורכב יותר.

{/* החדשות הטובות הן שלעיתים קרובות אפשר להתחיל עם תבנית KV ולפתח אותה למערכת מורכבת יותר לפי הצורך. ל-S3 יש תכונות מעבר לאחסון פשוט, מ-Athena לחיפוש קבצים, Glacier ומדיניות Expire – יש הרבה מה לעשות איתו. כמו כן, Redis הוסיפה תכונות מתקדמות רבות (כמו Pub/Sub, Geo-spatial, Streams ו-Sorted Sets) שיכולות לעזור לך לעמוד בדרישות מסוימות. */}

החדשות הטובות הן שהעברה של מאגר KV יחיד ל-SQL קלה יחסית יותר מאשר העברת סכמת SQL מורכבת לתוך מאגר KV. (עם טבלאות מרובות, אינדקסים, אילוצים וכו'). עשיתי זאת פעמים רבות עם סקריפט בן 50 שורות.

מניסיון אישי, גיליתי שאיכות עיצובי SQL גבוהה יותר אם מתחילים תחילה עם תבנית KV. זה מאלץ אותך לחשוב על הנתונים בצורה שונה, ולהבין טוב יותר _בדיוק_ מה אתה באמת צריך מ-SQL.

## צעדים הבאים

הדרך הטובה ביותר ללמוד היא לנסות! אם אתה מעוניין לחקור תבנית זו עוד, אני ממליץ **לבנות דברים** עם Redis, DynamoDB או S3. כולם מאגרי KV מצוינים עם פשרות שונות.

### Fact Service - פרויקט עזר

בדוק את ["Fact Service," פרויקט עזר בקוד פתוח ב-GitHub](https://github.com/justsml/fact-service).

זהו API RESTful עצמאי המיישם שירות נתוני KV.

הוא כולל [מתאמי נתונים](https://github.com/justsml/fact-service/tree/main/lib/providers) רבים. כולל עבור Postgres, Redis, DynamoDB, Firestore ו-Cassandra! (עם [פקודות Docker](https://github.com/justsml/fact-service/tree/main/lib/providers) כדי להתחיל במהירות.)

Fact Service נועד להיות פרויקט התחלתי ולימוד, תפצלו אותו ובנו שירות נתוני KV משלכם!

## סיכום

אני מקווה שמצאת מאמר זה מועיל! אם יש לך שאלות או משוב, אל תהסס להגיב או `@` אותי ב-[Twitter](https://x.com/justsml).

### קרדיטים

- [מידול נתוני עצים היררכיים ב-PostgreSQL](https://leonardqmarcq.com/posts/modeling-hierarchical-tree-data)
- [עשה ואל תעשה באחסון עצים גדולים ב-PostgreSQL](https://leonardqmarcq.com/posts/dos-and-donts-of-modeling-hierarchical-trees-in-postgres)

### קריאה נוספת

- [Fact Service](https://github.com/justsml/fact-service)
- [Postgres](https://www.postgresql.org/)
- [Redis](https://redis.io/)
- [DynamoDB](https://aws.amazon.com/dynamodb/)
- [S3](https://aws.amazon.com/s3/)
- [Cassandra](https://cassandra.apache.org/)
- [Firestore](https://firebase.google.com/docs/firestore)
````
