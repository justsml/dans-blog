# Translation Candidate
- Slug: stop-the-angularjs-hate
- Locale: ar
- Model: openrouter/deepseek/deepseek-v4-flash
- Target: src/content/posts/2015-03-10--stop-the-angularjs-hate/ar/index.mdx
- Validation: deferred
- Runtime seconds: 21.05
- Input tokens: 3721
- Output tokens: 3870
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- Estimated cost: $0.001605
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
social_image: ../desktop-social.webp
title: حيل AngularJS
subTitle: AngularJS يمكن أن يكون ممتعًا!
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
## يمكن أن يكون AngularJS ممتعًا!

> لـ: AngularJS v1.x

1.  يكتشف مطورو AngularJS بسرعة أن تطبيقاتهم المتوسطة والكبيرة تنهار تحت وطأة `$watch` المتناثرة والدعامة المنتفخة المعروفة باسم `$scope`.
2.  حافظ على `$scope` خاليًا من حالة واجهة المستخدم الزائدة، وحاول الحد من حجم وعمق التسلسل الهرمي العام.

### ربط البيانات ثنائي الاتجاه: سيف ذو حدين

الربط ثنائي الاتجاه وحده يجعل الانتقال من أطر عمل أخرى مثل Backbone، حسنًا، **شيء مذهل بشكل لا يُصدق**.

المشكلة هي: العديد من المواقع **تفرط بشكل مزمن** في استخدام أنماط تصميم Angular.
يؤدي هذا إلى انتشار التوجيهات ووجود `$scope/rootScope` يحتوي بسهولة على آلاف الحالات، ويمكنه التعلق بأشياء ضخمة مما يمنع أي أمل في جمع القمامة الفعال.

أنت تعرف إلى أين يتجه هذا: متصفح منهك! محكوم عليه بالعمل إلى الأبد **بوتيرة محمومة** لتنفيذ عمليات إعادة ترجمة لا نهائية ومكررة لواجهة المستخدم/DOM.

### توقف عن الإفراط في استخدام Angular.JS

> "إذا كانت أداتك الوحيدة هي المطرقة، فكل مشكلة تبدو وكأنها مسمار."
>
> - مثل قديم

هل تواجه تطبيقك مشكلة مع التوجيهات؟

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

لنصمم واجهة مستخدم مرنة تساعد في:

1.  تجزئة متعددة الاستخدامات مع كود Angular جاف (DRY)
1.  توجيهات مفهومة، بأقل حجم/عمق ممكن (انتبه إلى ng-repeats)
1.  طبقة خدمات بسيطة
1.  القليل من البرمجة الفعلية للتنفيذ - مجرد كود HTML/View

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

## حلول

### نصائح Angular

1.  استخدم الربط أحادي الاتجاه (مثل `{ :: title }`)
1.  حد من التداخل التكراري للتوجيهات
1.  وإذا كان لا بد من تداخل التوجيهات، فلا تفعل ذلك _أبدًا_ داخل `ng-repeat` - سيبدأ الأداء في محاكاة شيء مثل `O(n^2)^3` ;)
    I. استخدم كود JS/DOM الأصلي بنمط المصنع (factory pattern) لإنشاء أجزاء DOM/UI أساسية، أمثلة: مربع رسالة مشروط (Modal msg box)، شريط الحالة. استدعِ مصانع واجهة المستخدم إما من التوجيهات أو المتحكمات.
1.  _مكافأة:_ افهم تكلفة ومحفزات [دورة حياة عرض المتصفح](https://developers.google.com/web/fundamentals/performance/rendering/index?hl=en): الرسوم المتحركة، العرض المركب، إعادة التدفق (reflows)

### استخدم Browserify لتنظيم المشروع

ليس مخصصًا لـ Angular بحد ذاته، لكنه ضروري لحل التبعيات البسيط.

[Browserify](https://github.com/substack/browserify-handbook/blob/master/readme.markdown#exports) يجعل مشاريع JS قابلة للإدارة دون أي زيادة تذكر في الكود (حسنًا، بضع مئات من الأحرف).

[اقرأ هذا القسم فقط](https://github.com/substack/browserify-handbook/blob/master/readme.markdown#exports) من [دليل Browserify](https://github.com/substack/browserify-handbook/).

## بدائل

### [ReactJS](https://facebook.github.io/react/) من فيسبوك

إذا كان لديك الكثير من مكونات واجهة المستخدم الصغيرة القابلة لإعادة الاستخدام - فقد يكون ReactJS خيارًا أفضل:

- هل مشروعك...؟:
  - لديه فلسفة مختلفة لتنفيذ واجهة المستخدم/DOM عن Angular
  - لديه بالفعل نوع من 'الإطار' - يمكنك **استخدام ReactJS جنبًا إلى جنب** مع AngularJS، Ember، Backbone. (تجنب ذلك إن أمكن).
  - يتعامل مع تغييرات نموذج البيانات المتكررة في الكود الخاص به، ستستفيد من تجنب طبيعة فرط النشاط لنمط الحلقة/التنقيح في Angular

### [مشروع بوليمر](http://www.Polymer-Project.org/) من جوجل

### نهج جافا سكريبت أنقى

- بالمناسبة، هنا أحاول إنشاء كود غير مرتبط بإطار عمل (+1 قابلية اختبار، +1 إعادة استخدام)
  1. استخدم فئة جافا سكريبت عادية لتحميل البيانات (AJAX/JSONP/مضمنة في الصفحة، إلخ.)
  1. استخدم قوالب mustache لإنشاء سلاسل HTML (أو DOM مباشرة)
  1. خزّن المحتوى المعروض في localStorage إن أمكن
  1. (اختياري) أضف الآن مستمع حدث لإعادة عرض المحتوى. لقد وحدت اسم الحدث `refresh.<class-name>`
````
