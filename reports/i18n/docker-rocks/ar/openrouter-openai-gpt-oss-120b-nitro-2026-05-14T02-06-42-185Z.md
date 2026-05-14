# Translation Candidate
- Slug: docker-rocks
- Locale: ar
- Model: openrouter/openai/gpt-oss-120b:nitro
- Target: src/content/posts/2015-06-11--docker-rocks/ar/index.mdx
- Validation: deferred
- Runtime seconds: 1.41
- Input tokens: 2128
- Output tokens: 392
- Thinking tokens: unknown
- Cached input tokens: 1024
- Cache write tokens: 0
- Estimated cost: $0.000154
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
social_image: ../desktop-social.webp
title: دوكر رائع الآن يعمل على macOS
subTitle: Docker رائع، سريع، ومرن
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
## Docker Rocks

> Updates September 2016, 2018  
> تم استبدال Boot2Docker بـ Docker for Mac

> ملاحظة تاريخية: تم الحفاظ على هذه المشاركة عن قصد كلقطة من Docker‑for‑Mac لعام 2015. نصائح الأداء وأسماء الأدوات تعكس ذلك الوقت؛ سير عمل Docker Desktop وCompose الحاليين قد تطورا منذ ذلك الحين.

1. Docker رائع، سريع، ومرن.  
1. الأدوات السابقة، وخاصة boot2docker، كانت بطيئة وعرضة للتعطل.

يمكن الآن تشغيل Docker أصلاً على نواة لينكس v3.4+ — والـ boot2docker VM الحالي يعمل فعلياً على v4.

أفضل استغلال لمواردك: ثبّت أحدث إصداري Debian أو Ubuntu على جهازك Mac/Windows،

... هيا، تلك الألعاب لا تساعد كودك ...

### Check your setup

راجع مخرجات أمر `docker info`.

1. Security: تحقق من الخادم بحثاً عن منافذ مفتوحة غير متوقعة (باستخدام `nmap` من شبكة بعيدة)  
1. DNS: استخدم ذاكرة تخزين مؤقت محلية أو خادم DNS منخفض الكمون.  
1. Storage: استخدم برنامج تشغيل التخزين الصحيح (`overlay2` هو الأكثر احتمالاً)

محدّث 2024:

- Docker Desktop هو برنامج مملوك، لكنه مجاني للاستخدام الشخصي. يُعد طريقة ممتازة للبدء مع Docker على macOS أو Windows.  
- إذا كنت تبحث عن حل أكثر مفتوح المصدر، تفقد [Rancher Desktop](https://rancherdesktop.io/).
````
