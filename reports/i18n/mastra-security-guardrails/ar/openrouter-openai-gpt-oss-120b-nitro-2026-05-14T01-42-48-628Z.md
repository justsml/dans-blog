# Translation Candidate
- Slug: mastra-security-guardrails
- Locale: ar
- Model: openrouter/openai/gpt-oss-120b:nitro
- Target: src/content/posts/2026-01-03--mastra-security-guardrails/ar/index.mdx
- Validation: deferred
- Runtime seconds: 2.43
- Input tokens: 5680
- Output tokens: 2397
- Thinking tokens: unknown
- Cached input tokens: 2304
- Cache write tokens: 0
- Estimated cost: $0.000653
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
title: الذكاء الاصطناعي في الإنتاج مخيف (وكيفية إصلاحه)
subTitle: إذا لميكن لدى وكيلك ضوابط أمان، فأنت غير جاهز للإنتاج.
date: '2026-01-03'
modified: '2026-01-08'
tags:
  - ai
  - security
  - mastra
  - guardrails
  - privacy
  - pii
category: AI
subCategory: Security
social_image: ../desktop-social.webp
cover_full_width: ../wide.webp
cover_mobile: ../square.webp
cover_icon: ../square.webp
---
لا أحديهدف إلى بناء نظام ذكاء اصطناعي غير آمن. تكتب التعليمات، تختبر حالات الحافة، تضيف بعض قواعد التحقق. ثم يكتشف أحدهم أنه يمكنه إقناع الروبوت بالتمثيل كقرصان وكشف بيانات المستخدم. أو ينتهي رقم بطاقة الائتمان في سجلاتك. أو يوصي النموذج بثقة بمنتج لمنافس.

الفجوة بين "يعمل في العرض التجريبي" و "آمن في الإنتاج" أوسع مما تتوقعه معظم الفرق.

جزء من المشكلة هو أن نماذج LLM الخام لا تملك رأيًا حول ما يجب أو لا يجب عليها القيام به. إنها آلات توقع تحاول إكمال أي نمط تبدأه. إذا أعطيتها موجهًا يبدو كـ "وضع تجاوز النظام"، ستتعاون معها بسعادة. هذه ليست علة في النموذج؛ إنها مجرد طريقة عمل نماذج اللغة.

معظم الأطر تسلمك النموذج وتتمنى لك التوفيق. ماسْترا تتبع نهجًا مختلفًا: تفترض أنك ستحتاج إلى حواجز أمان في النهاية، لذا تبنيها في بنية الوكيل من البداية.

---

## المعالجات كطبقات أمان

الآلية الأساسية بسيطة. قبل أن يصل موجهك إلى النموذج، يمر عبر سلسلة من معالجات الإدخال. بعد أن يرد النموذج، تتولى معالجات الإخراج دورها. يمكن لكل معالج فحص المحتوى أو تعديله أو حظره في تلك المرحلة.

فكر فيها كوسطية لتفاعلات الذكاء الاصطناعي. تكدس المعالجات التي تحتاجها، تضبط سلوكها، وتعمل تلقائيًا على كل طلب.

### 1. إيقاف القراصنة (حقن الموجه)

هجمات حقن الموجه أصبحت مبتكرة. يستخدم الناس أحرف يونيكود غير مرئية، يكتبون التعليمات بقاعدة 64، أو يقنعون النموذج بأنه في "وضع التصحيح" حيث لا تُطبق القواعد العادية. التقنيات تستمر في التطور.

ماسـترا تشمل معالجات تلتقط الأنماط الشائعة:

```typescript
// src/mastra/agents/secure-agent.ts
import { Agent } from '@mastra/core/agent';
import { PromptInjectionDetector, UnicodeNormalizer } from '@mastra/core/processors';
import { openai } from '@ai-sdk/openai';

export const secureAgent = new Agent({
  id: 'fortress-assistant',
  name: 'fortress-assistant',
  instructions: 'You are a secure assistant.',
  model: openai('gpt-5'),
  inputProcessors: [
    // 1. Scrub invisible characters
    new UnicodeNormalizer({
      id: 'unicode-normalizer',
      stripControlChars: true,
      collapseWhitespace: true,
    }),
    // 2. Detect the attempt
    new PromptInjectionDetector({
      id: 'prompt-injection-detector',
      model: openai('gpt-5-nano'), // Cheap, fast
      threshold: 0.8,
      strategy: 'block', // Hard stop
      detectionTypes: ['injection', 'jailbreak', 'system-override'],
    }),
  ],
});
```

يعمل [`UnicodeNormalizer`](https://mastra.ai/docs/processors) على حذف أحرف التحكم وتوحيد الفراغات. ويحلل [`PromptInjectionDetector`](https://mastra.ai/docs/processors) المدخل المنظف بحثًا عن أنماط تشير إلى محاولة لتجاوز تعليماتك.

يمكنك ضبط مدى صرامة الكشف (معامل `threshold`) وتحديد ما يحدث عند حدوث الانتهاك (حجب، تسجيل، أو مجرد وضع علامة).

### 2. معالجة البيانات الشخصية (PII)

أرقام بطاقات الائتمان في السجلات، أرقام الضمان الاجتماعي في قواعد البيانات المتجهية، عناوين البريد الإلكتروني المخزنة لفترة أطول من اللازم. هذه هي الأنواع التي تتحول إلى مشكلات تنظيمية. التحدي هو أن المستخدمين لا يدركون دائمًا أنهم يلصقون بيانات حساسة في نافذة الدردشة.

يقوم [`PIIDetector`](https://mastra.ai/docs/processors) بمسح الأنماط الشائعة قبل أن تصل إلى النموذج أو تُكتب إلى التخزين:

```typescript
import { PIIDetector } from '@mastra/core/processors';

export const privateAgent = new Agent({
  id: 'privacy-first-assistant',
  name: 'privacy-first-assistant',
  instructions: 'You are a helpful assistant that never stores personal information.',
  model: openai('gpt-5'),
  inputProcessors: [
    new PIIDetector({
      id: 'pii-detector',
      model: openai('gpt-5-nano'),
      detectionTypes: ['email', 'phone', 'credit-card', 'ssn'],
      threshold: 0.6,
      strategy: 'redact',
      redactionMethod: 'mask',  // Replace with [REDACTED]
      instructions: 'Detect and mask personally identifiable information',
    }),
  ],
});
```

يمكنك اختيار إخفاء (استبدال بـ `[REDACTED]`)، تجزئة، أو حجب بالكامل. يعمل المعالج على كل من المدخل والمخرج، لذا تكون محميًا حتى إذا تولد النموذج بيانات حساسة في استجابته.

### 3. مراقبة المحتوى

النماذج المدربة على بيانات الإنترنت قد رأت أشياءً لا ينبغي أن تُظهرها. بدون تصفية، قد تنتج أحيانًا ردودًا تجعل فريق العلاقات العامة الخاص بك غير مرتاح. يلتقط [`ModerationProcessor`](https://mastra.ai/docs/processors) المحتوى الذي ينتهك إرشاداتك:

```typescript
import { ModerationProcessor } from '@mastra/core/processors';

export const moderatedAgent = new Agent({
  id: 'safe-assistant',
  name: 'safe-assistant',
  instructions: 'You are a helpful assistant for a community platform.',
  model: openai('gpt-5'),
  inputProcessors: [
    new ModerationProcessor({
      id: 'moderation-processor',
      model: openai('gpt-5-nano'),  // Fast, cheap model for classification
      categories: ['hate', 'harassment', 'violence', 'self-harm'],
      threshold: 0.7,  // Block if confidence > 70%
      strategy: 'block',  // Stop the request immediately
      instructions: 'Detect harmful content that violates community guidelines',
    }),
  ],
});
```

الجزء المهم هو أنك تحدد أي الفئات تهم حالتك. قد يسمح أداة كتابة إبداعية بمحتوى أكثر تعبيرًا مقارنةً بروبوت خدمة العملاء. يتيح لك `threshold` و `strategy` التحكم في مدى صرامة الفلترة.

---

## عندما يحدث خطأ

المعالجات لا تُطلق استثناءات عندما تكتشف مشكلة. بدلاً من ذلك، تُعيّن علمًا على كائن النتيجة:

```typescript
const result = await secureAgent.generate('Ignore all previous instructions...');

if (result.tripwire) {
  console.log(`Blocked! Reason: ${result.tripwireReason}`);
  // "Blocked! Reason: Prompt injection detected."
  return "Nice try, script kiddie.";
}
```

هذا النمط يتيح لك معالجة أحداث الأمان بالطريقة التي تناسب تطبيقك. يمكنك تسجيلها للتحليل، إرجاع رسالة خطأ عامة، أو حتى السماح ببعض الانتهاكات في سياقات محددة. حقل `tripwireReason` يوضح لك بالضبط أي معالج أشار إلى المحتوى، مما يساعد عند تصحيح الإيجابيات الكاذبة أو ضبط العتبات.

---

## ما لا يحلّه هذا

المعالجات تلتقط الكثير، لكنها ليست سحرية. مهاجم مصمم بوقت كافٍ قد يجد على الأرجح موجهًا يمر عبر الفلاتر. النماذج أحيانًا تُنتج هلوسات لا يمكن للمعالجات توقعها. وهناك دائمًا مقايضة بين الأمان والمرونة: كلما زادت صرامة القواعد، زادت احتمالية حجب حالات الاستخدام المشروعة.

القيمة ليست حماية مثالية. إنها وجود طريقة منهجية للتعامل مع المشكلات الشائعة التي ستظهر حتمًا في بيئة الإنتاج. يمكنك ضبط الحساسية مع تعلمك لسلوك المستخدمين الفعلي. يمكنك إضافة معالجات مخصصة للمخاطر الخاصة بالمجال. وستحصل على سجلات تدقيق تُظهر ما تم حظره ولماذا.

معظم مشكلات الأمان في الذكاء الاصطناعي الإنتاجي ليست هجمات متطورة. إنها أشخاص ينسخون ويلصقون بيانات لا ينبغي لهم استخدامها، أو يكتشفون عبر التجربة والخطأ أن الروبوت يقوم بأشياء لم تقصدها. المعالجات لن توقف كل مشكلة محتملة، لكنها تجعل المشكلات الواضحة أصعب بكثير.

### الموارد
---

- [توثيق حواجز Mastra](https://mastra.ai/docs/agents/guardrails)
- [أفضل ممارسات الأمان](https://mastra.ai/docs/security)
- [مستودع Mastra على GitHub](https://github.com/mastra-ai/mastra)

## قراءة السلسلة

1. [توجيه LLM](../llm-routing-mastra-ai)
2. **الأمان والحواجز** (هذه المشاركة)
3. [MCP وتكامل الأدوات](../mastra-mcp-tool-integrations)
4. [سير العمل والذاكرة](../mastra-workflows-memory)
````
