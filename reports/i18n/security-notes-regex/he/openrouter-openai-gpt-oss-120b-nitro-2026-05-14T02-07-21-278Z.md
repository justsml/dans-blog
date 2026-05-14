# Translation Candidate
- Slug: security-notes-regex
- Locale: he
- Model: openrouter/openai/gpt-oss-120b:nitro
- Target: src/content/posts/2015-02-24--security-notes-regex/he/index.mdx
- Validation: deferred
- Runtime seconds: 1.43
- Input tokens: 1218
- Output tokens: 579
- Thinking tokens: unknown
- Cached input tokens: 512
- Cache write tokens: 0
- Estimated cost: $0.000152
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
title: 'הערות אבטחה: ביטויים רגולריים'
subTitle: האם רגקס יכול להיות פגיע?
date: '2015-02-24'
modified: '2018-07-30'
category: Security
subCategory: RegEx
tags:
  - security
  - regex
  - dos
  - remote-exploit
cover_credit: Photo by Markus Spiske on Unsplash
cover: ../markus-spiske-666905-unsplash.webp
cover_mobile: ../w300_markus-spiske-666905-unsplash.webp
cover_icon: ../icon_markus-spiske-666905-unsplash.webp
social_image: ../desktop-social.webp
---
## דחיית שירות עם רג'קס: ReDOS

אחת הפגיעויות המפתיעות, ולעיתים הקשות לזיהוי, שמצאתי קשורה לביטויים רגולריים.  
או שהם נכתבים בצורה גרועה או שמיושמים בצורה גרועה.

זיכרון/CPU יכולים להתקלקל עם קלט משתמש גדול או מתוכנן במיוחד.

> זו פגיעות של דחיית שירות, לא רק ריח של ביצועים. אם קלט עוין יכול לתפוס את ה‑CPU זמן מספיק כדי לרעב משתמשים אמיתיים, היא חייבת להיכנס למודל האיום האבטחוני שלכם.

### סימני אזהרה

1. כמותיות מקוננות, קבוצות חוזרות, או אלטרנטיבות חופפות  
2. מנועים עם חיפוש חזרה אינטנסיבי ללא timeout או מגבלת אורך קלט  
3. הביטוי משמש עם קלט משתמש שלא נבדק  
4. אימות רג'קס רץ על נתיב בקשה חם

### הפחתה / פתרון

1. רג'קס קשה.  
    1. לדוגמה, כך ממליצים האנשים החכמים ב‑[OWASP על טיפול באימות IP][owasp]: `^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$`  
    2. זה ארוך יותר מציוץ (ישן) עבור כתובת IP של 4 בתים!!!
2. הגבל את אורך הקלט לפני הערכת הרג'קס.  
3. הוסף timeout, ניתוח סטטי, או מנוע ללא חיפוש חזרה כאשר הפלטפורמה תומכת בכך.  
4. זה משפיע כמעט על כל שפה ופלטפורמה: .NET/Node/Python/PERL/Java.

### מקורות

- [OWASP ReDoS](https://owasp.org/www-community/attacks/Regular_expression_Denial_of_Service_-_ReDoS)
````
