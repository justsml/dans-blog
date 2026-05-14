# Translation Candidate
- Slug: naming-things-real-good
- Locale: he
- Model: openrouter/openai/gpt-oss-120b:nitro
- Target: src/content/posts/2016-06-01--naming-things-real-good/he/index.mdx
- Validation: deferred
- Runtime seconds: 4.30
- Input tokens: 3914
- Output tokens: 1517
- Thinking tokens: unknown
- Cached input tokens: 1536
- Cache write tokens: 0
- Estimated cost: $0.000426
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
social_image: ../desktop-social.webp
title: מתן שמות טובים
subTitle: 'מתן שמות: יסודות תכנות מונחה‑עצמים'
date: '2016-06-01'
modified: '2024-08-10'
category: Guides
subCategory: programming
tags:
  - programming
  - patterns
  - naming
  - source-code
  - organization
cover: ../rawpixel-652639-unsplash.webp
cover_mobile: ../w300_rawpixel-652639-unsplash.webp
cover_icon: ../icon_rawpixel-652639-unsplash.webp
---
## שם דברים: יסודות תכנות מונחה‑אובייקטים

בואו נבחן תכנון אובייקט/מחלקה דרך דוגמה...

### המצב

האם אי‑פעם תכננתם `data model` (בקוד, ב‑SQL או בגיליונות Excel)?
האם הקטע הבא נראה מוכר?

```
*** anti-pattern - don't copy-paste ***
* User
  - id
  - avatarUrl
  - name
  - email
  - password

* Agent
  - id
  - primaryPhoto
  - name
  - email
  - agentEmail
  - agentPhoneMain
  - agentEmailPrimary
  - agentPhonePrimary
  - agentAddressFull
  - agentCompanyName
  - agentCompanyAddress
  - *userEmail* - 'Pointer' to User table ^^^
```

### איפה הבאג?

טכנית אין באג, רק נתונים שזקוקים לארגון מחדש.

**האם הקטע הבא נשמע מוכר?**

1.  כל שינוי באפליקציה ידרוש שעות של ניפוי באגים מעיק.
1.  דרישות משתנות יגרמו ל‑:

![schema refactor][schema_refactor]

למה קריאת שדה בשם `agentEmailPrimary` היא _כל כך_ רעה?

להתחלה, אתה **לא** יוצר דבר חדש לחלוטין ביקום. יתר‑מפרטיות מביאה כמה מלכודות:

1.  “נעול” לשם ספציפי מאוד, משמעותו ש‑`agentEmailPrimary` כנראה יהפוך את התצוגות והקוד הקשור **ל‑0 % שימוש חוזר**, ויגרום לבאגים מציקים שחוזרים על עצמם כמו:

- נתונים שלא מסתנכרנים בין הטבלאות (לא ברור אם `user.email` צריך להתפשט ל‑`agent.agentEmail` או להפך – ואל תזכיר את המורכבות של מימוש ידני של ה‑“לוגיקה” הזאת ...)
- חוקי/לוגיקת אימות כנראה משוכפלים ולא עקביים.
- עם הזמן הפרויקט שלך יראה כמו מגדל ג׳נגה רועש.
- השבריריות מצטברת עם כל קובץ חדש, מכיוון שנדרשת תשומת לב קיצונית לפרטים אפילו לשינויים טריוויאליים.

2.  `agentEmailPrimary` יכול להתפרש בכמה דרכים. הימנע מאמביגוּטיות עם **שמות קצרים**.

- שים לב למילים מיותרות משעממות. `Primary`? זה רק מעלה עוד שאלות: האם יש `Secondary`? האם זה עבור הקשר קרוב ראשי שלהם?

מספיק מילים, דן, איך זה צריך להיראות במקום זאת?

### פתרון

```
// Consolidated Schema:

User
  - id
  - role: ['agent', 'lead', 'admin']
  - name
  - phone
  - address
  - email
  - password
  - company
    - name
    - address
```

הסרתי את טבלת `Agent`, מכיוון שלא היו בה שדות ייחודיים לסוכנים. והאובייקט `User.company` (עם `.name`, `.address`) נוצר ברגע שניקינו את השמות.

כמה עקרונות מנחים:

1.  מחק טבלאות מיותרות. האם באמת צריך טבלת `statuses`? אפשר פשוט להוסיף שדה `status::VARCHAR(8)` בטבלת `User`. זה בסדר, השתמש בבייטים הנוספים לכל שורה.
2.  נסה למזג טבלאות קשורות. **Data**
3.  מחק איסוף נתונים מיותר (למשל, הסר את טבלת `ActivityLogs` אם היא מוחלפת בפתרון אנליטיקה).
4.  שמור **את כל שמות השדות** למילה **אחת/שם עצם/כינוי**. זה בסדר להסתמך על ההקשר שמספקת הטבלה. (למשל `PersonalAccount.email` מול `BusinessAccount.email` – ההקשר נובע משם הטבלה.)
5.  אין **כלום** בשם `Agent.agentEmail` או `Agent.agentPhonePrimary`. נקודה. אמור איתי: “זה `email` ו‑`phone`.”
6.  כשאתה משתמש בשמות גבוהים‑מפרטים, אתה קובע במרקם קוד רמת **שימוש חוזר** ו‑**עמידות** של **0 %**.
7.  אתה לא עושה לעצמך טובה עם זבל כמו `User.profileSummaryEmail`. 💞

**קריאה מומלצת כוללת:**

1. [אולי נורמליזציה אינה נורמלית](https://blog.codinghorror.com/maybe-normalizing-isnt-normal/)
1.  [הסחר בין נורמליזציית מסד נתונים לדינורמליזציה](https://dev.to/er_dward/the-trade-offs-between-database-normalization-and-denormalization-4kdo)
2.  [http://phlonx.com/resources/nf3/](http://phlonx.com/resources/nf3/)
3.  [נורמליזציית מסד נתונים](https://en.wikipedia.org/wiki/Database_normalization)

[schema_refactor]: https://res.cloudinary.com/ddd/image/upload/bldg-collapse__wsZKhIc_kafcha.gif
````
