# Translation Candidate
- Slug: one-weird-trick-to-speed-up-feature-teams
- Locale: he
- Model: openrouter/openai/gpt-oss-120b:nitro
- Target: src/content/posts/2024-09-29--one-weird-trick-to-speed-up-feature-teams/he/index.mdx
- Validation: deferred
- Runtime seconds: 6.91
- Input tokens: 6694
- Output tokens: 2715
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- Estimated cost: $0.000750
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
title: טריק משונה להאצת צוותי פיתוח!
subTitle: מהנדסי הצוות שונאים את זה!
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

- [Thinking in Keys](#thinking-in-keys)
  - [Designing with Keys](#designing-with-keys)
  - [KVs as Graphs & Trees?](#kvs-as-graphs--trees)
  - [When to Use KV Patterns](#when-to-use-kv-patterns)
  - [When to Avoid KV Patterns](#when-to-avoid-kv-patterns)
  - [When you need more than KV](#when-you-need-more-than-kv)
- [Next Steps](#next-steps)
  - [Fact Service - Reference Project](#fact-service---reference-project)
- [Conclusion](#conclusion)
  - [Further Reading](#further-reading)

</details>

כאשר מתכננים מערכת או תכונה חדשה, קל להיתקע בעיצוב הסכמה. במאמר זה אשתף בטכניקה חכמה שהניבה תוצאות לאורך הקריירה שלי.

<section class="breakout">
  _נסה_ את אחסון הנתונים הפשוט ביותר כשאתה מתכנן מערכת או תכונה חדשה.
</section>

לעיתים קרובות מדי אני רואה צוותים פונים ל‑SQL או MongoDB כאופציה היחידה לאחסון נתונים. ברור, אף אחד לא יפוטר על בחירת SQL. אבל מה אם אגיד לך שיש דרך פשוטה, מהירה וזולה יותר להתחיל?

חנות KV (Key‑value) עשויה להיות כל מה שאתה צריך. משהו כמו Redis או S3.

זה לא תמיד הבחירה הנכונה, אבל אולי **יותר מתדמיתך**.

שכבת אחסון פשוטה יכולה לזרז באופן משמעותי את הפיתוח *המוקדם* על‑ידי שימוש חוזר בקוד שכבת הנתונים והימנעות מהעלויות הקשורות לשינויים בתכנון הסכמה והגירות. שינויי סכמה יתרחשו בכל מקרה; תן לקוד להתמודד איתם כמה שיותר זמן. עדיף להימנע מטיפול בשינויים בשניים מקומות.

רווחי ביצועים צפויים מכיוון שחיפושי `key` מותאמים מאוד, והכתבות יכולות ליהנות מעדכונים במקבצים.

{/* Avoid KV patterns if you need JOINs or to query by properties in your dataset. Or in cases where you have an unbounded/infinitely growing datasets. (`Logs`, `Signups`, etc.) */}

## לחשוב במפתחות

זה יכול להרגיש מוזר לתכנן תחילה עם תבנית מפתח‑ערך, במיוחד אם אתה רגיל לתכנן מערכות עם היררכיות אובייקטים או דיאגרמות ישות‑קשר וליישם אותן ישירות ב‑SQL.

סביר להניח שכבר ***השתמשת*** בתבניות מפתח‑ערך! הן בכל מקום, מהגדרות ו‑URL‑ים עד אחסון אובייקטים בסגנון S3! בכל פעם שאתה מתעסק בנתונים דרך ערך `ID` ייחודי, נחש מה? תבנית מפתח‑ערך נוספת! (אף שלא בהכרח מדובר בחנות KV.)

### תכנון עם מפתחות

מעצם היותם, כמעט כל נתון _יכול_ להיות מיוצג באמצעות תבניות KV. (למעשה, רבות ממערכות מסדי הנתונים ברמה גבוהה בנויות על תבניות KV ברמה נמוכה.) בואו נבחן כמה דוגמאות:

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

אולי שמתם לב, אבל ה‑`ID` הוא לעיתים קרובות מפתח בפני עצמו! זהו דפוס נפוץ בחנויות KV. המפתח מורכב לרוב מסוג הישות והמזהה הייחודי. (לדוגמה `user/123`, `user:456`)

### KV כגרפים ועצים?

לעיתים זה מועיל לייצג מבני נתונים מורכבים כמו גרפים או עצים באמצעות תבניות KV. (שוב, URL‑ים של REST הם דוגמה מצוינת לכך.)

היררכיית המפתחות (`user/420` -> `user/420/friends`) מקודדת באופן טבעי קשר גרפי בין ה‑`user` ל‑`friends` שלו.

זו דרך מהירה וזולה לסריאליזציה של מבני גרף. במיוחד אם אינכם זקוקים למורכבות של מסד נתונים גרפי (כמו Neo4j).

<figure>
![גרף של user/123](.././KVsCanBeGraphs.webp)
<figcaption>גרף של user/123</figcaption>
</figure>

### מתי להשתמש בתבניות KV

- כשאתם צריכים קנה מידה עצום. (מיליארדי ואף טריליוני זוגות KV.)
- כשאתם ניגשים לנתונים בעיקר דרך מפתח ייחודי.
- כשאתם זקוקים למבני נתונים פשוטים.
- כשיש לכם נתונים עם היררכיה, גרף או מבנה עץ.

### מתי להימנע מתבניות KV

אל תאחסנו דברים כמו תגובות בלוג ב‑_**זוג KV יחיד**_. לדוגמה, `post/666 -> {comments: [...too many...]}`. במקום זאת אפשר להשתמש ב‑`post/666/comments/1`, או `post/666/comments/<UUID>` וכד’. או לעבור לטבלת SQL.

- כשצריך לחפש לפי תכונות (לא מפתח או מזהה) במאגר שלכם.
- כשצריך לבצע JOIN בין ישויות מרובות.
- כשצריך לאכוף מגבלות או יחסים מורכבים.

### כשאתם צריכים יותר מ‑KV

ככל שהדרישות של הפרויקט מתפתחות באופן טבעי, ייתכן שתצטרכו לעשות יותר ממה שחנות KV שלכם תומכת. בנקודה זו תצטרכו לשקול migration לחנות נתונים מורכבת יותר.

{/* The good news is that you can often start with a KV pattern and evolve it into a more complex system as needed. S3 has features beyond simple storage, from Athena for searching files, Glacier, and Expire policies there's a lot you can do with it. Also, Redis has added many high-level features (like Pub/Sub, Geo-spatial, Streams, and Sorted Sets) that can help you meet some requirements. */}

החדשות הטובות הן שמעבר מחנות KV יחידה ל‑SQL הוא יחסית קל יותר מאשר להעביר סכמת SQL מורכבת לחנות KV. (עם טבלאות מרובות, אינדקסים, מגבלות, וכו’). עשיתי זאת פעמים רבות עם סקריפט של 50 שורות.

אנקדוטלית, מצאתי שהאיכות של עיצובי SQL גבוהה יותר כשמתחילים עם תבנית KV קודם. זה מכריח לחשוב על הנתונים בצורה שונה, ולהבין בדיוק מה באמת נדרש מ‑SQL.

## צעדים הבאים

הדרך הטובה ביותר ללמוד היא לנסות בעצמכם! אם אתם רוצים לחקור את התבנית הזו יותר, אני ממליץ **לבנות דברים** עם Redis, DynamoDB או S3. כולם חנויות KV מצוינות עם פשרות שונות.

### שירות עובדות – פרויקט רפרנס

הסתכלו על הפרויקט הקוד הפתוח שלי ["Fact Service," פרויקט רפרנס ב‑GitHub](https://github.com/justsml/fact-service).

זה API RESTful נפרד שמיישם שירות נתוני KV.

הוא כולל הרבה [מתאמי נתונים](https://github.com/justsml/fact-service/tree/main/lib/providers), כולל עבור Postgres, Redis, DynamoDB, Firestore ו‑Cassandra! (כולל [פקודות Docker](https://github.com/justsml/fact-service/tree/main/lib/providers) להתחלה מהירה.)

Fact Service נועד להיות פרויקט התחלה ולמידה; פצלו ובנו את שירות הנתונים KV שלכם!

## סיכום

מקווה שהמאמר היה מועיל! אם יש לכם שאלות או משוב, אל תהססו להגיב או `@` אותי ב‑[Twitter](https://x.com/justsml).

### תודות

- [מודלינג של נתוני עץ היררכי ב‑PostgreSQL](https://leonardqmarcq.com/posts/modeling-hierarchical-tree-data)
- [מה לעשות ומה לא לעשות באחסון עצים גדולים ב‑PostgreSQL](https://leonardqmarcq.com/posts/dos-and-donts-of-modeling-hierarchical-trees-in-postgres)

### קריאה נוספת

- [Fact Service](https://github.com/justsml/fact-service)
- [Postgres](https://www.postgresql.org/)
- [Redis](https://redis.io/)
- [DynamoDB](https://aws.amazon.com/dynamodb/)
- [S3](https://aws.amazon.com/s3/)
- [Cassandra](https://cassandra.apache.org/)
- [Firestore](https://firebase.google.com/docs/firestore)
````
