# Translation Candidate
- Slug: stop-the-angularjs-hate
- Locale: he
- Model: openrouter/deepseek/deepseek-v4-flash
- Target: src/content/posts/2015-03-10--stop-the-angularjs-hate/he/index.mdx
- Validation: deferred
- Runtime seconds: 25.51
- Input tokens: 3728
- Output tokens: 4129
- Thinking tokens: unknown
- Cached input tokens: 768
- Cache write tokens: 0
- Estimated cost: $0.001573
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
social_image: ../desktop-social.webp
title: טריקי AngularJS
subTitle: AngularJS יכול להיות כיף!
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
## AngularJS יכול להיות כיף!

> עבור: AngularJS v1.x

1.  מפתחי AngularJS מגלים במהירות שהיישומים הבינוניים-גדולים שלהם קורסים תחת משקל ה-`$watch's` המפוזרים והקביים המנופחים המכונים `$scope`.
2.  שמור על `$scope` שלך נקי ממצב UI מיותר, נסה להגביל את הגודל והעומק של ההיררכיה הכוללת.

### קישור דו-כיווני: חרב פיפיות

קישור דו-כיווני לבדו הופך את המעבר מפריימוורקים אחרים כמו Backbone, ובכן, **למדהים ברמות**.

הבעיה היא: אתרים רבים **משתמשים יתר על המידה** בדפוסי העיצוב של Angular.
זה מוביל להתפשטות דירקטיבות ול-`$scope/rootScope` שיש לו בקלות אלפי מופעים, ויכול להיצמד לאובייקטים ענקיים ולמנוע כל תקווה לאיסוף זבל יעיל.

אתה יודע לאן זה הולך: דפדפן מותש! נידון לנצח לעבוד ב**קצב מטורף** בביצוע הידורים חוזרים ונשנים של UI/DOM.

### תפסיקו עם OVER-Angular.JSification

> “אם הכלי היחיד שלך הוא פטיש, אז כל בעיה נראית כמו מסמר.”
>
> - פתגם ישן

האם לאפליקציה שלך יש בעיה עם דירקטיבות?

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

בואו נעצב ווידג׳ט משתמש גמיש שיעזור:

1.  קומפוננטיזציה רב-תכליתית עם קוד אנגולר יבש (DRY)
1.  דירקטיבות מובנות, עם גודל/עומק מינימלי (שימו לב ל-ng-repeats שלכם)
1.  שכבת שירות פשוטה
1.  מעט קידוד בפועל ליישום – רק קוד HTML/View

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

### טיפים לאנגולר

1.  השתמשו בקישור חד-כיווני (למשל `{ :: title }`)
1.  הגבילו קינון רקורסיבי של דירקטיבות
1.  ואם חייבים לקנן דירקטיבות, **לעולם אל** תעשו זאת בתוך `ng-repeat` – הביצועים יתחילו להידמות למשהו כמו `O(n^2)^3` ;)
    I. השתמשו בקוד JS/DOM מקורי בתבנית factory ליצירת מקטעי DOM/UI בסיסיים, למשל: תיבת Modal, שורת מצב. קראו ל-factories של ה-UI מתוך דירקטיבות או בקרים.
1.  _בונוס:_ הבינו את העלות והטריגרים של [מחזור החיים של רינדור הדפדפן](https://developers.google.com/web/fundamentals/performance/rendering/index?hl=en): אנימציה, רינדור מורכב, reflows

### השתמשו ב-Browserify לארגון הפרויקט

לא ספציפית לאנגולר כשלעצמו, אבל חיוני לפתרון תלויות פשוט.

[Browserify](https://github.com/substack/browserify-handbook/blob/master/readme.markdown#exports) הופך פרויקטי JS לניתנים לניהול כמעט ללא תוספת תקורה של קוד (אוקיי, כמה מאות תווים).

[רק קראו את הסעיף הזה](https://github.com/substack/browserify-handbook/blob/master/readme.markdown#exports) מתוך [המדריך ל-Browserify](https://github.com/substack/browserify-handbook/).

## חלופות

### [ReactJS](https://facebook.github.io/react/) מפייסבוק

אם יש לכם המון רכיבי UI קטנים לשימוש חוזר – ReactJS עשויה להיות בחירה טובה יותר:

- אם הפרויקט שלכם...?:
  - בעל פילוסופיה שונה למימוש UI/DOM מאשר Angular
  - כבר יש איזשהו 'מסגרת' – אתם יכולים **להשתמש ב-ReactJS לצד** AngularJS, Ember, Backbone. (אבל הימנעו מכך אם אפשר).
  - מטפל בשינויים תכופים במודל הנתונים בקוד שלו, תרוויחו מהימנעות מהאופי ההיפראקטיבי של תבנית digest/loop ב-Angular

### [Polymer Project](http://www.Polymer-Project.org/) מגוגל

### גישת JS טהורה יותר

- דרך אגב, כאן אני מנסה ליצור קוד אגנוסטי למסגרת (+1 לבדיקות, +1 לשימוש חוזר)
  1.  השתמשו במחלקת javascript פשוטה לטעינת נתונים (AJAX/JSONP/מוטמע בדף וכו')
  1.  השתמשו בתבניות mustache ליצירת מחרוזות HTML (או DOM ישירות)
  1.  שמרו תוכן מעובד במטמון ב-localStorage אם אפשר
  1.  (אופציונלי) כעת הוסיפו מאזין אירועים לעיבוד מחדש של התוכן. סטנדרטיזתי את שם האירוע `refresh.<class-name>`
````
