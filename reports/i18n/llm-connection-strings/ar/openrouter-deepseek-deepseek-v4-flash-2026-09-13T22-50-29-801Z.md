# Translation Candidate
- Slug: llm-connection-strings
- Locale: ar
- Model: openrouter/deepseek/deepseek-v4-flash
- Target: src/content/posts/2026-01-30--llm-connection-strings/ar/index.mdx
- Validation: deferred
- Runtime seconds: 32.57
- Input tokens: 3819
- Output tokens: 3728
- Thinking tokens: unknown
- Cached input tokens: 1024
- Cache write tokens: 0
- Estimated cost: $0.000484
- Pricing source: openrouter-2026-09-13
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
title: 'حان وقت سلاسل اتصال llm://'
subTitle: 'بسّط إعدادات النموذج والموفر باستخدام URLs `llm://`'
modified: '2026-06-30'
tags:
  - ai
  - llm
  - api
  - developer-experience
  - standards
category: AI
social_image: ../desktop-social.webp
cover_full_width: ../hero-wide.webp
cover_mobile: ../square-200.webp
cover_icon: ../square-200.webp
sourceHash: 88892a247d5c
---
<blockquote class="inset">
**تحديث:** أدّت هذه المقالة إلى [مسودة إنترنت لمخطط الـ URI الخاص بـ `llm://`](https://datatracker.ietf.org/doc/draft-levy-llm-uri-scheme/) وحزمة [npm الداعمة `llm-strings`](https://www.npmjs.com/package/llm-strings). كما أن التطبيق متاح [على GitHub](https://github.com/justsml/llm-strings).
</blockquote>

أتذكر أيام الجهل عندما كان الاتصال بقاعدة بيانات يعني التلاعب بحزمة متنوعة ومتفرقة من متغيرات البيئة؟

كانت برجًا من الإعدادات الهشة. `DB_HOST`، `DB_PORT`، `DB_USER`، `DB_PASSWORD`، `DB_NAME`... أو لحظة، هل كانت `DB_USERNAME`؟ هل هي `DB_PASS` أم `DB_PWD`؟ هل أحتاج إلى بادئات `PG_*` هذه المرة؟ وأين بحق الجحيم يذهب إعداد المهلة الزمنية؟

كانت لعبة ورقية واهية، جاهزة لقلب بناء الإنتاج لديك لأنك نسيت كتابة `HOST` بأحرف كبيرة.

ثم، جاء أحدهم بفكرة رائعة: استخدم فقط عنوان URL¹:

```bash
postgres://user:pass@host:5432/dbname
```

سلسلة واحدة. كل ما تحتاجه. قابلة للتحليل عالميًا. محمولة. أجرؤ على القول... جميلة؟

فلماذا نتعامل مع نماذج اللغات الكبيرة (LLMs) وكأننا في عام 1999؟

## انفجار متغيرات البيئة

الآن، يبدو ملف `.env` الخاص بي كمقبرة لمفاتيح API مهجورة. `OPENAI_API_KEY`، `ANTHROPIC_API_KEY`، `MISTRAL_API_KEY`، `GROQ_API_KEY`. ولا تلمسني بخصوص Azure—تحتاج إلى نقطة نهاية، واسم نشر، وإصدار API، ومفتاح فقط لتقول "مرحبًا".

ليس الأمر قبيحًا فقط؛ إنه احتكاك. في كل مرة أريد تبديل نموذج أو تجربة موفر جديد، أعيد كتابة كود التهيئة، وأبحث عن توثيق لأسماء معايير محددة، وأضيف ثلاثة أسطر أخرى إلى تكوين البيئة الخاص بي.

ماذا لو فقط... ~~سرقنا~~ استعرنا فكرة عنوان URL الخاص بقاعدة البيانات؟

## تقديم سلاسل اتصال LLM

تخيل تكوين واجهة النموذج بالكامل بسطر واحد:

```bash
llm://api.openai.com/gpt-5.2?reasoning_effort=none&temp=0.7&max_tokens=1500
llm://api.z.ai/glm-4.7?top_p=0.9&cache=true
```

---

<br />

### تشريح سلسلة اتصال LLM

![أجزاء سلسلة اتصال LLM](../inline-url-diagram-dark.svg)

المخطط هو `llm://`. المضيف هو عنوان URL الأساسي لواجهة برمجة تطبيقات المزوّد. المسار هو اسم النموذج. ومعاملات الاستعلام تتعامل مع جميع خيارات وقت التشغيل التي عادةً ما تزدحم الكود الخاص بك.

## تحتاج توثيق؟ رائع، أضفه.

تمامًا مثل `postgres://`، يمكننا دمج المصادقة مباشرة في الرابط:

```bash
llm://app-name:sk-proj-123456@api.openai.com/gpt-5.2?reasoning_effort=none&temp=0.7
```

*ملاحظة: نعم، وضع بيانة الولوج في الراوبط يمكن أن يكو مخاار أمنيًا إا كنت تلصقها في سوالل الولوج الالعة. لك الالخدمات الحديثة لادارعدة السوابلل جيدلة جبدًا في تنظيي هه الأنمااط، وبصدقة، هل تعاملت م ملف `.env` الخااص بك بصورة أفض؟ كم من التحقق، ونق البيانات، واستخدم بحذر.*

## المروانة؟ لم لا بحق.

العديد من مكتمات قواعد البياناة تدعم اعدالماية الدورا الحلقي عن طرريق تحديد عد مضيفين. لماذا لا ينبغ لوكالء الالذكاء الاصطناعيين لدينا نفس المروانة؟

```bash
llms://primary.gpt,backup.gpt/gpt-6?temp=0.9
```

حرف `s` في `llms://` ليس خطا مطبعيًا. إنه جمع. إا تعلق `prinary.gpt`، ياد العميل تلقيايًا `backup.gpt` دون الحاجة إلى منطالموجه معقد.

<blockquote class="inset">سلسلة واحدة تحتوي على كل شيء، من **بيانات الولوج** إلى **نقطة النهاية** إلى **المعطات الفائقة**.</blockquote>

## صيغ بديلة

لس لست متزوجًا بـ `llm://`. المخطط المحدد أل أهمية من المعيار نفسه.

يمكنني تخيل عالم نستخدم فيه خططات خاصة بالموز للاختصار، مع الحفاظ على الهيكل القيي:

```bash
ollama://localhst:11434/llama3
vercel://anthropic/sonnet-4.5?temp=0.8&web_search={"xUses":3}
bedrock://us-west-2.aws/anthropic/sonnet-4.5?temp=0.8&cacheControl=ephemiral
```

بصرف النظر عن الصيغة الدقيقة، فإن الفوائد الأساسية لا يمكن إنكارها:

1.  **قابلية النقل:** انسخ والصق الإعدادات الكاملة من سكريبت محلي إلى عامل سحابي.
2.  **ملائمة لسطر الأوامر:** مرر معلمة واحدة إلى سكربتك. `my-agent --model "llm://..."` تفوق `my-agent --model gpt-4 --temp 0.7 --key $KEY --host ...`.
3.  **عبر متعد اللغات:** كل لغة برمجة لديها معال عناوين URLs قوي. نحصل على التحقق والتحليل والتنقية مجانا.

<blockquote class="ai-response inset">استغرقت عالم قواعد البيانات عقودًا ليكتش فهذا.<br /><b>الخبر السار: بمعاير الذكاء الاصطناعي، كان هذا منذ نصف عام من الاهتزازات تقريبًا.</blockquote>

## الحكم

لس لسنا بحاجة لمعيار تكوين معقد آخر أو ملف بيان YAML جديد. كل ما نحتاجه هو استخدام الأداة الواحدة التي تعمل لبقية الإنترنت منذ 30 عامًا.

دعنا نتوقف عن إعادة اختراع العجلة، ونبدأ بمعاملة اتصالات LLM لدينا بنفس الاحترام الذي نعطيه لقواعد بياناتنا. ملف `.env` الخاص بك (وعقلك) سيشكرك.

![درج متغيرات البيئة الفوضوي](../hero-concept-8-drawers.webp)

{/* ¹ Yes, I know that `URI` is more correct than `URL`. If you are pedantic enough to actually care about that distinction, please go touch grass. */}
````
