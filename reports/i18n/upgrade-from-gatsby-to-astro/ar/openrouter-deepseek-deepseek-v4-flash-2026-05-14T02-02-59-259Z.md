# Translation Candidate
- Slug: upgrade-from-gatsby-to-astro
- Locale: ar
- Model: openrouter/deepseek/deepseek-v4-flash
- Target: src/content/posts/2024-08-22--upgrade-from-gatsby-to-astro/ar/index.mdx
- Validation: deferred
- Runtime seconds: 74.13
- Input tokens: 6573
- Output tokens: 10191
- Thinking tokens: unknown
- Cached input tokens: 768
- Cache write tokens: 0
- Estimated cost: $0.003668
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
social_image: ../desktop-social.webp
title: دروس مستفادة من ترقية مدونتي
subTitle: Astro، Tailwind، MDX، Pagefind، والمزيد!
date: '2024-08-21'
modified: '2024-08-23'
category: Guides
tags:
  - astro
  - tailwind
  - mdx
  - pagefind
  - gatsby
cover: ../galaxy-contribution-mode.webp
cover_full_width: ../galaxy-contribution-banner.webp
cover_mobile: ../w300_galaxy-contribution-mode.webp
cover_icon: ../icon_galaxy-contribution-mode.webp
---
مؤخرًا، شرعت في رحلة لترقية موقعي القديم الذي يعمل بـ Gatsby v1 والذي يبلغ من العمر أكثر من 8 سنوات.

ستشارك هذه التدوينة بعض الدروس التي تعلمتها خلال هذه العملية والتقنيات الممتعة التي استكشفتها.

## جدول المحتويات

- [متطلبات المشروع](#project-requirements)
- [اختيار مجموعة التقنيات المناسبة](#choosing-my-right-technology-stack)
- [Astro: منحنى التعلم والميزات الرئيسية](#astro-learning-curve-and-key-features)
- [CSS الحديث: واو](#modern-css-wow)
- [البحث: Pagefind](#search-pagefind)
- [التعليقات: Utterances](#comments-utterances)
- [Tailwind: الندم](#tailwind-regrets)
- [الخاتمة](#conclusion)

## متطلبات المشروع

قبل الغوص في الترقية، وضعت مجموعة من المتطلبات:

نظرًا لأن مدونتي تحصل على عدد متغير جدًا من مشاهدات الصفحات اليومية، شعرت أن الموقع المُنشأ مسبقًا بشكل ثابت سيعطي الأداء الذي أريده دون تعقيد إضافي.

أيضًا، كنت بحاجة إلى الاحتفاظ بالمحتوى والميزات الحالية للموقع، بما في ذلك:

- تمييز الكود
- التعليقات
- البحث في الموقع
- مكونات React الموجودة مسبقًا: واجهة الاختبار، تضمينات Gist
- نموذج الاتصال
- الصور المتجاوبة
- وقت تحميل أقل من ثانية واحدة
- توافق المتصفح: 2018+
- النشر الآلي والقائم على طلبات السحب (PR)

## اختيار مجموعة التقنيات المناسبة

على مر السنين، عملت مع العديد من أدوات المواقع الثابتة، بدءًا من Jekyll و Hugo و Slate و Gatsby. وكذلك مع العديد من أطر العمل الأمامية: Ember و Knockout و Angular و Vue وبالطبع React.

لذا، كان لدي خيارات كثيرة جدًا، والتي قمت في النهاية بتضييقها إلى **Remix** و **Next.js** و **Astro**.

يمكنني كتابة سلسلة كاملة من المقالات حول عملية التقييم، لكنني سألخصها هنا:

<p class="breakout">اخترت [Astro](https://astro.build) لأنني تمكنت بسرعة من _القيام بأشياء ذات معنى_.</p>

تصميم واجهة برمجة التطبيقات (API) الخاص به بسيط بشكل منعش. إنه [توازن رائع بين المرونة وآراء التصميم الجيدة.](https://docs.astro.build/en/concepts/why-astro/)

كان من المطمئن بعض الشيء أن Astro يفتقر إلى أي تحيز واضح تجاه سحابة معينة أو أجندة إطار عمل.

لم يكن Astro هو التقنية الوحيدة التي استخدمتها، إليك تفصيل كامل للمكدس:

- [Astro](https://astro.build): مولد مواقع ثابتة حديث.
- [ShadcnUI](https://ui.shadcn.com): مجموعة من المكونات القابلة لإعادة الاستخدام.
- [Tailwind CSS](https://tailwindcss.com): إطار عمل CSS قائم على المنفعة.
- [MDX](https://mdxjs.com): محتوى Markdown + مكونات مضمنة.
- [Pagefind](https://pagefind.app): مكتبة بحث سريعة وثابتة وغير متصلة بالإنترنت. لا حاجة لـ Algolia!
- [Utterances](https://utteranc.es): نظام تعليقات يعتمد على مشكلات GitHub.
- [Netlify](https://www.netlify.com): نشر تلقائي، نموذج اتصال مع كابتشا.

## Astro: منحنى التعلم والميزات الرئيسية

<p class="breakout quote">سرعان ما أصبح Astro حجر الزاوية في ترقيتي.</p>

فيما يلي بعض الميزات الرئيسية التي وجدتها مفيدة بشكل خاص:

- ملفات `.astro`: للوهلة الأولى، قد تبدو مكونات Astro مثل مكونات React JSX، لكنها مختلفة تمامًا وتخدم مجموعة مختلفة من الأهداف. (انظر جدول المقارنة أدناه.)
- مدعوم بأدوات البناء الخاصة به بلغة Golang [build tools](https://github.com/withastro/compiler) وVite: يعمل فورًا. يتعامل بسلاسة مع ESM/CJS وTypeScript وتجميع الكود والأنماط والصور وغيرها.
- [لا تحيز لإطار عمل](https://docs.astro.build/en/guides/framework-components/#official-ui-framework-integrations) أو [تحيز للسحابة](https://docs.astro.build/en/guides/deploy/). (*سعال* Next.js، OpenNext)
- العرض [الثابت مقابل الهجين](https://docs.astro.build/en/basics/rendering-modes/): يوفر Astro [مرونة لاستهداف معظم منصات السحابة](https://docs.astro.build/en/guides/deploy/): AWS، GCP، Firebase، Netlify، Vercel، Cloudflare Pages، Azure، Fly.io، وغيرها الكثير.
- مجموعات المحتوى: تعمل واجهة برمجة التطبيقات [`getCollection`](https://docs.astro.build/en/reference/api-reference/#getcollection) على تبسيط العمل مع ملفات المحتوى كمصدر بيانات.
- التوجيه القائم على الملفات: نظام التوجيه القائم على الملفات في Astro، مع `getStaticPaths`، يجعل إنشاء الصفحات أمرًا سهلاً.
- تحسين محركات البحث: [لا يعيقك Astro](https://github.com/justsml/dans-blog/blob/010c5cb58bb327adb8c8fff608594daa612ad9d5/src/components/BaseHead.astro#L43-L63)، ويصدر فقط قدرًا ضئيلًا من ~~الحطام~~ النموذج الأساسي (`astro-island`) عند الضرورة.

كانت بعض الأمور مفاجئة بعض الشيء، مثل التنسيق حول علامات Astro المحقونة، وتأثير `display:contents`.

```tsx

<style>astro-island,astro-slot,astro-static-slot{display:contents}</style>

```

### مقارنة مكونات `.astro` مقابل مكونات العميل

مكونات Astro هي في الأساس قوالب HTML بنمط قوي للمكونات والخصائص. يمكنها جلب البيانات في وقت البناء، والوصول إلى موارد الخلفية، وإبقاء بعض المعلومات الحساسة مخفية.

أفضل طريقة لفهم مكونات `.astro` في Astro هي المقارنة والتباين مع مكونات جانب العميل. (React، Vue، Svelte، إلخ.)

<section className="scroll-x">
| ما الذي تحتاج إلى فعله؟                                                            | مكون .astro    | مكون العميل    |
| ---------------------------------------------------------------------------------- | ------------------- | ------------------- |
| إنشاء HTML بنمط قالب+مكون قوي                             | ✅ | ❌ |
| جلب البيانات في وقت البناء                                                           | ✅ | ❌ |
| الوصول إلى موارد الخلفية (مباشرة)                                                | ✅ | ❌ |
| إبقاء المعلومات الحساسة مخفية (رموز الوصول، مفاتيح API، إلخ)                   | ✅ | ❌ |
| تقليل JavaScript من جانب العميل                                                      | ✅ | ❌ |
| استخدام مكونات العميل (React، Vue، Svelte، إلخ)                                    | ✅ | ✅ |
| إضافة التفاعلية ومستمعي الأحداث (`onClick()`، `onChange()`، إلخ)             | ❌ | ✅ |
| استخدام الحالة وتأثيرات دورة الحياة (`useState()`، `useReducer()`، `useEffect()`، إلخ) | ❌ | ✅ |
| استخدام واجهات برمجة التطبيقات الخاصة بالمتصفح فقط                                                              | ❌ | ✅ |
| استخدام الخطافات المخصصة التي تعتمد على الحالة أو التأثيرات أو واجهات برمجة التطبيقات الخاصة بالمتصفح فقط               | ❌ | ✅ |
</section>

## CSS الحديثة: واو

بالعودة إلى تطوير الواجهة الأمامية، كنت مسرورًا بالتقدم في CSS الأصلي:

- متغيرات CSS: متاحة منذ فترة، ومستقرة جدًا عبر المتصفحات منذ 202\*.
- التداخل (Nesting): أخيرًا في المواصفات، وبدون الصيغة المحرجة السابقة. الآن يشبه Less أو SCSS.
- محددات جديدة: [`:is()`، `:where()`، و `:has()`](https://www.youtube.com/watch?v=3ncFpP8GP4g) توفر استهدافًا أكثر دقة للعناصر.
- الوحدات الحديثة مثل `ch` و `vw`، والدوال مثل `clamp()` توفر تحكمًا أفضل في التخطيطات والطباعة.
- ضبط التباعد بشكل أكثر طبيعية باستخدام سمات `-inline` و `-block`. ضبط الحشو أو الهامش على المحور الأفقي أو الرأسي. بدلاً من `margin: 0 1rem 0 1rem` → `margin-inline: 1rem`.
- تخطيطات متقدمة: إعادة تعلم CSS Grid. واو، هناك الكثير من الهراء فيه. قد يكون شاقًا مع طرق استخدام لا نهائية على ما يبدو. ضع في اعتبارك أنه يمكنك الاكتفاء بمعرفة طريقة أو اثنتين. تحقق من هذه الموارد الرائعة التي ساعدتني في عمل حيل مع grid: [فيديو Kevin Powell: تعلم CSS Grid بالطريقة السهلة](https://www.youtube.com/watch?v=rg7Fvvl3taU)، [استجابة بدون استعلامات وسائط](https://ardilamorin.com/responsive-no-media-queries/)، [عشرة تخطيطات حديثة في سطر واحد من CSS](https://web.dev/articles/one-line-layouts).

## البحث: Pagefind

بدا تنفيذ **بحث الموقع** بدون خدمات طرف ثالث أو استضافة قاعدة بيانات تحديًا ممتعًا. بعد كل شيء، ليس لدي 10,000 مشاركة لأفهرسها (حتى الآن).

أثناء تصفح [تكاملات مجتمع Astro](https://astro.build/integrations/?search=find) عثرت على أداة رائعة كنت أتمنى لو عرفتها مبكرًا: [Pagefind](https://pagefind.app/).

<p class="breakout quote">قليل من الأدوات تحل أي مشكلة بقدر ما يحل Pagefind بحث الموقع المحلي.</p>

بساطة تنفيذ Pagefind هي متعة. يمكن دمجه مع أي محتوى موقع ثابت، ويمكنك اختيار ما إذا كنت تريد واجهة مستخدم افتراضية، أو يمكنك بناء أي شيء مخصص إذا اخترت.

لقد حل بشكل أنيق كل ما أردته. استغرق التكامل دقائق فقط، وكان معظم العمل يتضمن إضافة وسم `<div id="search"></div>` وبعض التنسيق!

## التعليقات: Utterances

لسوء الحظ، كان علي أن أودع Disqus والتعليقات التي تراكمت لدي على مدى سنوات عديدة.

أردت تحكمًا/رؤية أفضل في البرامج النصية للجهات الخارجية على موقعي.

أيضًا، يجب أن يكون بسيطًا وقابلًا للصيانة.

قادني هذا لاختيار خدمة [Utterances](https://utteranc.es/) الرائعة. نظام التعليقات الخاص بها (القائم على GitHub Issues) يتوافق جيدًا مع جمهوري. بالإضافة إلى ذلك، فهو سهل الإعداد ومجاني.

## Tailwind: ندم

هناك تقنية واحدة فقط أندم بشكل متزايد على استخدامها: Tailwind.

بمرور الوقت، أشعر بفارق التكلفة بين الكتابة والصيانة. Tailwind سريع جدًا في الكتابة، ولكن بمجرد أن يصبح معقدًا بما يكفي، قد يصبح مملًا في القراءة والتوسيع.

## الخاتمة

كانت ترقية موقع Gatsby v1 القديم إلى مجموعة تقنيات حديثة مبنية حول Astro تجربة ممتعة. 10/10 أوصي بها.

إذا كنت تفكر في ترقية موقع قديم أو بناء موقع ثابت (أو هجين) جديد، فإنني أوصي بشدة بالنظر إلى Astro. قد يكون منحنى التعلم حادًا في بعض الأحيان، لكن الفوائد من حيث الأداء وتجربة المطور وتأمين مشروعك للمستقبل تستحق الجهد المبذول.
````
