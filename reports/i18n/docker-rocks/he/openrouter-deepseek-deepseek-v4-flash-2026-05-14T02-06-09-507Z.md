# Translation Candidate
- Slug: docker-rocks
- Locale: he
- Model: openrouter/deepseek/deepseek-v4-flash
- Target: src/content/posts/2015-06-11--docker-rocks/he/index.mdx
- Validation: deferred
- Runtime seconds: 19.19
- Input tokens: 2060
- Output tokens: 2068
- Thinking tokens: unknown
- Cached input tokens: 768
- Cache write tokens: 0
- Estimated cost: $0.000762
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
social_image: ../desktop-social.webp
title: Docker מעולה ועכשיו עובד על OSX
subTitle: 'Docker מדהים, מהיר וגמיש'
date: '2015-06-11'
modified: '2024-08-10'
category: DevOps
subCategory: docker
tags:
  - docker
  - boot2docker
  - devops
related:
  - docker-makes-everything-better
  - docker-server-setup-notes
  - docker-security-tips-for-self-hosting
cover: ../guillaume-bolduc-259596-unsplash.webp
cover_mobile: ../w300_guillaume-bolduc-259596-unsplash.webp
cover_icon: ../icon_guillaume-bolduc-259596-unsplash.webp
---
## דוקר רוקס

> עדכונים ספטמבר 2016, 2018  
> Boot2Docker הוחלף על ידי Docker for Mac

> הערה היסטורית: פוסט זה נשמר בכוונה כצילום מתקופת 2015 של Docker-for-Mac. עצות הביצועים ושמות הכלים משקפים את הרגע ההוא; זרימות העבודה הנוכחיות של Docker Desktop ו-Compose התקדמו.

1. דוקר מדהים, מהיר וגמיש.  
1. כלים קודמים, במיוחד boot2docker, היו איטיים ונטויים לקרוס.

דוקר יכול כרגע לרוץ באופן טבעי על ליבת לינוקס v3.4+ - וה-VM הנוכחי של boot2docker למעשה מריץ v4.

השימוש הטוב ביותר בחומרה שלך: התקן את דביאן או אובונטו העדכניים ביותר על מחשב ה-Mac/Windows שלך,

... קדימה, המשחקים האלה לא עוזרים לקוד שלך...

### בדוק את ההגדרות שלך

סקור את הפלט של הפקודה `docker info`.

1. אבטחה: בדוק את השרת לפורטים פתוחים באופן בלתי צפוי (עם `nmap` מרשת מרוחקת)  
1. DNS: השתמש במטמון מקומי או בשרת DNS בעל השהיה נמוכה.  
1. אחסון: השתמש בדרייבר האחסון הנכון (`overlay2` כנראה)

עודכן 2024:

- Docker Desktop הוא קנייני, אך חינמי לשימוש אישי. זוהי דרך מצוינת להתחיל עם Docker ב-OSX או Windows.
- אם אתה מחפש פתרון קוד פתוח יותר, בדוק את [Rancher Desktop](https://rancherdesktop.io/).
````
