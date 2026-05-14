# Translation Candidate
- Slug: mastra-security-guardrails
- Locale: he
- Model: openrouter/openai/gpt-oss-120b:nitro
- Target: src/content/posts/2026-01-03--mastra-security-guardrails/he/index.mdx
- Validation: deferred
- Runtime seconds: 2.83
- Input tokens: 5681
- Output tokens: 2537
- Thinking tokens: unknown
- Cached input tokens: 1536
- Cache write tokens: 0
- Estimated cost: $0.000678
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
title: בינה מלאכותית בתפעול מפחידה (ואיך לתקן זאת)
subTitle: 'אם לסוכן שלך אין מגבלות, אתה לא מוכן לייצור.'
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
אף אחד לא מתחיל לבנות מערכת AI לא בטוחה. אתה כותב הוראות, בודק מקרים קיצוניים, מוסיף כמה כללי אימות. ואז מישהו מגלה איך להטעות את הבוט שלך לשחק תפקיד של פיראט ולחשוף נתוני משתמש. או שמספר כרטיס האשראי מסתיים ברשומות שלך. או שהמודל בטוח ממליץ על מוצר של המתחרה.

הפער בין „עובד בהדגמה” ל‑„בטוח בייצור” רחב יותר מרוב הציפיות של הצוותים.

חלק מהבעיה נובע מהעובדה שמודלים גולמיים של LLM אין להם דעה מה מותר להם או אסור להם לעשות. הם מכונות חיזוי שמנסות להמשיך את הדפוס שהתחלתם. תנו להם פקודה שנראית כמו „מצב עקיפת מערכת”, והם ישתתפו בשמחה. זה לא באג במודל; זה פשוט איך מודלי שפה פועלים.

רוב המסגרות מספקות לכם את המודל ומאחלים לכם הצלחה. Mastra נוקטת בגישה שונה: היא מניחה שתצטרכו מעקבים בטיחותיים בסופו של דבר, ולכן בונה אותם במבנה הסוכן מההתחלה.

## מעבדים כשכבות בטיחות

המנגנון המרכזי הוא פשוט. לפני שהפרומפט שלכם מגיע למודל, הוא עובר דרך שרשרת של מעבדי קלט. אחרי שהמודל משיב, מעבדי פלט מקבלים את תורם. כל מעבד יכול לבדוק, לשנות או לחסום את התוכן באותו שלב.

חשבו עליהם כ‑middleware לאינטראקציות AI. אתם מציבים את אלו שאתם צריכים, מגדירים את ההתנהגות שלהם, והם פועלים אוטומטית על כל בקשה.

### 1. עצירת הפיראטים (הזרקת פרומפט)

התקפות של הזרקת פרומפט הפכו ליצירתיות. אנשים משתמשים בתווים בלתי נראים של Unicode, כותבים הוראות ב‑base64, או משכנעים את המודל שהם במצב „debug” שבו הכללים הרגילים אינם חלים. הטכניקות ממשיכות להתפתח.

Mastra כוללת מעבדים שתופסים תבניות נפוצות:

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

ה‑[`UnicodeNormalizer`](https://mastra.ai/docs/processors) מסיר תווי שליטה ומכווץ רווחים. ה‑[`PromptInjectionDetector`](https://mastra.ai/docs/processors) מנתח את הקלט המנורמל עבור תבניות שמרמזות שמישהו מנסה לעקוף את ההוראות שלך.

אתה מגדיר כמה אגרסיבית תהיה הזיהוי (הפרמטר `threshold`) ומה קורה כשמתרחשת ההתראה (חסימה, רישום, או סימון בלבד).

### 2. טיפול ב‑PII

מספרי כרטיסי אשראי בלוגים, מספרי תעודת זהות בבסיסי וקטורים, כתובות אימייל שנשמרות יותר מהנדרש. אלו סוגי בעיות שמסתיימות בבעיות רגולטוריות. האתגר הוא שמשתמשים לא תמיד מודעים שהם מדביקים נתונים רגישים לחלון צ'אט.

ה‑[`PIIDetector`](https://mastra.ai/docs/processors) סורק תבניות נפוצות לפני שהן מגיעות למודל או נכתבות לאחסון:

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

אתה יכול לבחור למחוק (להחליף ב‑`[REDACTED]`), לחשב hash, או לחסום לחלוטין. המעבד פועל על קלט וגם על פלט, כך שאתה מכוסה גם אם המודל באופן בלתי צפוי מייצר נתונים רגישים בתשובה שלו.

### 3. מודרציה של תוכן

מודלים שאומנו על נתוני אינטרנט ראו כבר כמה דברים. ללא סינון, הם עלולים לעיתים להפיק תגובות שיגרמו לצוות ה‑PR שלך להרגיש לא נוח. ה‑[`ModerationProcessor`](https://mastra.ai/docs/processors) תופס תוכן שמפר את הקווים המנחים שלך:

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

החלק המעניין הוא שאתה מגדיר אילו קטגוריות חשובות למקרה השימוש שלך. כלי כתיבה יצירתית עשוי לאפשר תוכן יותר חופשי מאשר בוט שירות לקוחות. הפרמטר `threshold` וה‑`strategy` נותנים לך שליטה על רמת הקפדנות של הסינון.

---
## כשדברים נתקעים

מעבדים לא זורקים שגיאות כשמזהים בעיה. במקום זאת, הם מציבים דגל על אובייקט התוצאה:

```typescript
const result = await secureAgent.generate('Ignore all previous instructions...');

if (result.tripwire) {
  console.log(`Blocked! Reason: ${result.tripwireReason}`);
  // "Blocked! Reason: Prompt injection detected."
  return "Nice try, script kiddie.";
}
```

דפוס זה מאפשר לך לטפל באירועי אבטחה כפי שהכי מתאים לאפליקציה שלך. אפשר לתעד אותם לניתוח, להחזיר הודעת שגיאה כללית, או אפילו לאפשר הפרות מסוימות בהקשרים ספציפיים. השדה `tripwireReason` מציין בדיוק איזה מעבד סימן את התוכן, מה שמסייע כאשר אתה מנתח חיובי שווא או מכוונן את הספים שלך.

---
## מה זה לא פותר

מעבדים תופסים הרבה, אך הם אינם קסם. תוקף נחוש עם מספיק זמן יוכל ככל הנראה למצוא פרומפט שחולף דרך המסנן. מודלים מדי פעם משקרים בצורה שהמעבדים אינם יכולים לחזות. ותמיד קיימת איזון בין אבטחה לגמישות: ככל שהכללים שלך קפדניים יותר, כך הסבירות לחסום מקרים לגיטימיים עולה.

הערך אינו הגנה מושלמת. מדובר ביכולת שיטתית להתמודד עם הבעיות השגרתיות שוודאי יופיעו בייצור. ניתן לכוונן את הרגישות ככל שאתה לומד מה המשתמשים שלך באמת עושים. אפשר להוסיף מעבדים מותאמים לסיכונים ספציפיים לתחום. ויש לך מסלולי ביקורת שמציגים מה נחסם ולמה.

רוב הבעיות באבטחת AI בייצור אינן מתקפות מתוחכמות. מדובר באנשים שמעתיקים ומדביקים נתונים שלא צריכים, או מגלים דרך ניסוי וטעייה שהבוט עושה דברים שלא התכוונו. מעבדים לא יפסיקו כל בעיה אפשרית, אך הם מקשים משמעותית על הבעיות הברורות.

### משאבים
---

- [תיעוד מסילות האבטחה של Mastra](https://mastra.ai/docs/agents/guardrails)
- [המלצות לאבטחה מיטבית](https://mastra.ai/docs/security)
- [מאגר הקוד של Mastra ב‑GitHub](https://github.com/mastra-ai/mastra)

## קרא את הסדרה

1. [ניתוב LLM](../llm-routing-mastra-ai)
2. **אבטחה & מסילות** (פוסט זה)
3. [MCP ואינטגרציות כלי עבודה](../mastra-mcp-tool-integrations)
4. [זרימות עבודה וזיכרון](../mastra-workflows-memory)
````
