# Translation Candidate
- Slug: stop-the-angularjs-hate
- Locale: he
- Model: openrouter/openai/gpt-oss-120b:nitro
- Target: src/content/posts/2015-03-10--stop-the-angularjs-hate/he/index.mdx
- Validation: deferred
- Runtime seconds: 4.41
- Input tokens: 3941
- Output tokens: 1526
- Thinking tokens: unknown
- Cached input tokens: 1536
- Cache write tokens: 0
- Estimated cost: $0.000428
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
social_image: ../desktop-social.webp
title: טריקים ב‑AngularJS
subTitle: AngularJS יכול להיות מהנה!
date: '2015-02-26'
modified: '2016-02-01'
category: Code
subCategory: angularjs
tags:
  - angularjs
  - development
  - performance
  - programming
cover: ../sharon-mccutcheon-522851-unsplash.webp
cover_mobile: ../w300_sharon-mccutcheon-522851-unsplash.webp
cover_icon: ../icon_sharon-mccutcheon-522851-unsplash.webp
---
## AngularJS יכול להיות מהנה!

> עבור: AngularJS v1.x

1. מפתחים ב‑AngularJS מגלים מהר שהאפליקציות בינוניות‑גדולות שלהם מתרסקות תחת משקל ה‑`$watch` המפוזרים והקבען המוגזם הידוע בשם `$scope`.
2. שמרו את ה‑`$scope` שלכם חופשי ממצב UI מיותר, נסו להגביל את הגודל והעומק של ההיררכיה הכוללת.

### קשירת נתונים דו‑כיוונית: חרב דו‑כיוונית

קשירה דו‑כיוונית לבדה עושה מעבר ממסגרות אחרות כמו Backbone, ובכן, **מדהים עד כדי פרצוף**.

הבעיה היא: אתרים רבים **מנצלים יתר על המידה** את תבניות העיצוב של Angular.
זה מוביל להתפשטות של Directives ו‑`$scope/rootScope` שיכולים להכיל בקלות אלפי מופעים, ולהידבק לאובייקטים גדולים שמונעים כל תקווה לאיסוף זבל יעיל.

אתם יודעים לאן זה מוביל: דפדפן מותש! נידון לנצח לעבוד בקצב **מטורף** תוך ביצוע קומפילציות חוזרות ונשנות של UI/DOM מיותרות.

### הפסקו את ה‑OVER‑Angular.JSification

> “אם הכלי היחיד שלכם הוא פטיש, אז כל בעיה נראית כמו מסמר.”
>
> – פתגם ישן

האם לאפליקציה שלכם יש בעיה עם Directives?

```jade
current-user-status-label
  div(ng-if='loggedIn')
    view-user-surplusage(ng-if='!editMode')
      .head: contact-details(user='user')
      .tool: contact-buttons(loggedIn='loggedIn')
      a.edit-icon(ng-click='editMode = true')
    edit-user-surplusage(ng-if='editMode')
      .head: avatar-edit(user='user')
      .body: edit-contact-details(user='user')
      a.save-icon(ng-click='editMode = false')
```

בואו נבנה widget משתמש גמיש שמסייע:

1.  רכיביות רב‑גונית עם קוד Angular ללא חזרות מיותרות  
2.  Directives ברורים, עם מינימום גודל/עומק (שימו לב ל‑ng‑repeat)  
3.  שכבת שירות פשוטה  
4.  מעט קוד ממשי ליישום – רק HTML/קוד תצוגה

```jade
// jade
user-widget
  div(ng-if='loggedIn')
    div.edit(ng-if='editMode')
      h4.email-icon: input(type='email', ng-model='user.email')
      h4.phone-icon: input(type='email', ng-model='user.phone')
      a.save-icon(ng-click='editMode = false')
    div.show(ng-if='!editMode')
      h1.users-icon {{ user.name  }}
      h4.email-icon {{ user.email }}
      h4.phone-icon {{ user.phone }}
      a.edit-icon(ng-click='editMode = true')
  div(ng-if='!loggedIn')
    h5: i Welcome User
    a.btn(href='/login') Login
```

## פתרונות

### טיפים ל‑Angular

1.  השתמשו בקשירה חד‑כיוונית (למשל `{ :: title }`)  
2.  הגבילו קידוד רקורסיבי של Directives  
3.  ואם חייבים לקנן Directives, *לעולם* אל תעשו זאת בתוך `ng-repeat` – הביצועים יתחילו להיראות כמו `O(n^2)^3` ;)  
   I. השתמשו בקוד JS/DOM מקורי בתבנית factory ליצירת קטעי UI/DOM בסיסיים, לדוגמה: תיבת מודאל, סרגל מצב. קראו לפקטוריות UI מה‑Directives או מה‑Controllers.  
4.  _בונוס:_ הבינו את העלות והטריגרים של [מחזור רינדור הדפדפן](https://developers.google.com/web/fundamentals/performance/rendering/index?hl=en): אנימציה, רינדור משולב, ריפלואים  

### השתמשו ב‑Browserify לארגון הפרויקט

לא ספציפי ל‑Angular, אבל חיוני לפתרון תלותים פשוט.

[Browserify](https://github.com/substack/browserify-handbook/blob/master/readme.markdown#exports) מאפשר לנהל פרויקטים ב‑JS עם כמעט ללא עלות קוד נוספת (אוקיי, כמה מאות תווים).

[קראו רק את הקטע הזה](https://github.com/substack/browserify-handbook/blob/master/readme.markdown#exports) של [מדריך Browserify](https://github.com/substack/browserify-handbook/).

## אלטרנטיבות

### [ReactJS](https://facebook.github.io/react/) מ‑Facebook

אם יש לכם המון רכיבי UI קטנים שניתן לשחזר – ReactJS עשוי להיות בחירה טובה יותר:

- אם הפרויקט שלכם...?:
  - נוקט בפילוסופיה שונה מ‑Angular לגבי יישום UI/DOM
  - כבר משתמש ב‑'framework' כלשהו – ניתן **להשתמש ב‑ReactJS לצד** AngularJS, Ember, Backbone. (עדיף להימנע אם אפשר).
  - מטפל בשינויים תכופים במודל הנתונים בקוד שלו, תרוויחו מהימנעות מהאופי ADHD של תבנית ה‑digest/loop ב‑Angular

### [Polymer Project](http://www.Polymer-Project.org/) מ‑Google

### גישה יותר טהורה ב‑JS

- דרך אגב, כאן אני מנסה ליצור קוד שאינו תלוי במסגרת (+1 מבחינת בדיקות, +1 שימוש חוזר)
  1.  השתמשו במחלקת JavaScript רגילה לטעינת נתונים (AJAX/JSONP/Embedded in page, וכו׳)
  1.  השתמשו בתבנית mustache ליצירת מחרוזות HTML (או DOM ישירות)
  1.  שמרו את התוכן המוצג במטמון ב‑localStorage אם אפשר
  1.  (אופציונלי) הוסיפו מאזין אירועים כדי לרנדר מחדש את התוכן. אני משתמש בשם האירוע `refresh.<class-name>`
````
