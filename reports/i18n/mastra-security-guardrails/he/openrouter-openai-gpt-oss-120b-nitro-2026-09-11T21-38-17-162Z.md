# Translation Candidate
- Slug: mastra-security-guardrails
- Locale: he
- Model: openrouter/openai/gpt-oss-120b:nitro
- Target: src/content/posts/2026-01-03--mastra-security-guardrails/he/index.mdx
- Validation: deferred
- Runtime seconds: 2.28
- Input tokens: 4641
- Output tokens: 2523
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- Estimated cost: $0.000635
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
title: בינה מלאכותית בתפוקה מפחידה (ואיך לתקן זאת)
subTitle: 'אם לסוכן שלך אין מנגנוני בטחון, אתה עדיין לא מוכן לייצור.'
modified: '2026-09-04'
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
אף אחד לא מתכוון לבנות מערכת AI לא בטוחה. אתה כותב הוראות, בודק מקרי קצה, מוסיף כמה כללי אימות. ואז מישהו מגלה איך להטות את הבוט שלך לשחק תפקיד של פיראט ולחשוף נתוני משתמש. או שמספר כרטיס אשראי מסתיים ביומני הרישום שלך. או שהמודל ממליץ בביטחון על מוצר של מתחרה.

הפער בין "עובד בהדגמה" ל-"בטוח בייצור" רחב יותר ממה שרוב הצוותים מצפים.

חלק מהבעיה הוא שלמודלים גולמיים אין דעה לגבי מה הם צריכים או לא צריכים לעשות. הם מכונות חיזוי שמנסות להמשיך את הדפוס שהתחלתם. תנו להם פקודה שנראית כמו "מצב עקיפה של המערכת", והם ישתפו פעולה בשמחה. זה לא באג במודל; זה פשוט איך מודלי השפה פועלים.

רוב המסגרות מספקות לך את המודל ומאחלים לך הצלחה. Mastra נוקטת בגישה שונה: היא מניחה שתצטרכו מעגלי הגנה בסופו של דבר, ולכן בונה אותם בארכיטקטורת הסוכן מההתחלה.

## מעבדים כשכבות בטחון

המנגנון המרכזי הוא פשוט. לפני שהפרומפט שלכם מגיע למודל, הוא עובר דרך שרשרת של מעבדי קלט. אחרי שהמודל משיב, מעבדי פלט מקבלים את תורם. כל מעבד יכול לבדוק, לשנות או לחסום את התוכן באותו שלב.

חשבו עליהם כעל middleware לאינטראקציות AI. אתם מציבים את אלה שאתם צריכים, מגדירים את ההתנהגות שלהם, והם פועלים אוטומטית על כל בקשה.

### 1. עצירת הפיראטים (הזרקת פרומפט)

התקפות הזרקת פרומפט הפכו ליצירתיות. אנשים משתמשים בתווים בלתי נראים של Unicode, כותבים הוראות ב‑base64, או משכנעים את המודל שהם במצב "debug" שבו כללים רגילים אינם חלים. הטכניקות ממשיכות להתפתח.

Mastra כוללת מעבדים שתופסים תבניות נפוצות:

```typescript
// src/mastra/agents/secure-agent.ts
import { Agent } from '@mastra/core/agent';
import { PromptInjectionDetector, UnicodeNormalizer } from '@mastra/core/processors';

const GUARDRAIL_MODEL = 'openrouter/openai/gpt-oss-safeguard-20b';

export const secureAgent = new Agent({
  id: 'fortress-assistant',
  name: 'fortress-assistant',
  instructions: 'You are a secure assistant.',
  model: 'openai/gpt-5.5',
  inputProcessors: [
    // 1. Scrub invisible characters
    new UnicodeNormalizer({
      stripControlChars: true,
      collapseWhitespace: true,
    }),
    // 2. Detect the attempt
    new PromptInjectionDetector({
      model: GUARDRAIL_MODEL,
      threshold: 0.8,
      strategy: 'block', // Hard stop
      detectionTypes: ['injection', 'jailbreak', 'system-override'],
      lastMessageOnly: true,
    }),
  ],
});
```

ה‑[`UnicodeNormalizer`](https://mastra.ai/reference/processors/unicode-normalizer) מסיר תווים שליטה ומכווץ רווחים. ה‑[`PromptInjectionDetector`](https://mastra.ai/reference/processors/prompt-injection-detector) מנתח את הקלט המנוקה עבור תבניות שמרמזות שמישהו מנסה לעקוף את ההוראות שלכם.

אתם מגדירים כמה אגרסיבית תרצו שהזיהוי יהיה (פרמטר `threshold`) ומה יקרה כאשר הוא מתפצל (`block`, `warn`, `filter`, או `rewrite`).

### 2. טיפול במידע אישי (PII)

מספרי כרטיסי אשראי ביומנים, מספרי תעודת זהות בבסיסי נתונים וקטוריים, כתובות אימייל שנשמרות יותר מהנדרש. אלה סוגי הבעיות שהופכות לבעיות רגולטוריות. האתגר הוא שמשתמשים לא תמיד מודעים לכך שהם מדביקים נתונים רגישים לחלון צ'אט.

ה‑[`PIIDetector`](https://mastra.ai/reference/processors/pii-detector) סורק תבניות נפוצות לפני שהן מגיעות למודל שלכם או נכתבות לאחסון:

```typescript
import { Agent } from '@mastra/core/agent';
import { BatchPartsProcessor, PIIDetector } from '@mastra/core/processors';

export const privateAgent = new Agent({
  id: 'privacy-first-assistant',
  name: 'privacy-first-assistant',
  instructions: 'You are a helpful assistant that never stores personal information.',
  model: 'openai/gpt-5.5',
  inputProcessors: [
    new PIIDetector({
      model: GUARDRAIL_MODEL,
      detectionTypes: ['email', 'phone', 'credit-card', 'ssn'],
      threshold: 0.6,
      strategy: 'redact',
      redactionMethod: 'mask',
      instructions: 'Detect and mask personally identifiable information',
      lastMessageOnly: true,
    }),
  ],
  outputProcessors: [
    new BatchPartsProcessor({ batchSize: 10 }),
    new PIIDetector({
      model: GUARDRAIL_MODEL,
      strategy: 'redact',
      redactionMethod: 'mask',
    }),
  ],
});
```

אתם יכולים לבחור למחוק, לחשב hash, להסיר, להחליף במקומחזים טיפוסיים, או לחסום לחלוטין. `PIIDetector` הוא מעבד היברידי: ניתן למקמו ב‑`inputProcessors`, `outputProcessors`, או בשניהם בהתאם למיקום הסיכון. עבור פלט זורם, יש לאגד חלקים לפני הרצת מסווגים כבדים יותר כדי שלא תשלמו עבור בדיקת LLM נפרדת על כל טוקן קטן.

### 3. מודרציה של תוכן

מודלים שאומנו על נתוני אינטרנט ראו כבר כמה דברים. ללא סינון, הם עלולים לעיתים להפיק תגובות שיגרמו לצוות ה‑PR שלכם להרגיש אי‑נוחות. ה‑[`ModerationProcessor`](https://mastra.ai/reference/processors/moderation-processor) תופס תוכן שמפר את ההנחיות שלכם:

```typescript
import { Agent } from '@mastra/core/agent';
import { BatchPartsProcessor, ModerationProcessor } from '@mastra/core/processors';

export const moderatedAgent = new Agent({
  id: 'safe-assistant',
  name: 'safe-assistant',
  instructions: 'You are a helpful assistant for a community platform.',
  model: 'openai/gpt-5.5',
  inputProcessors: [
    new ModerationProcessor({
      model: GUARDRAIL_MODEL,
      categories: ['hate', 'harassment', 'violence', 'self-harm'],
      threshold: 0.7,
      strategy: 'block',
      instructions: 'Detect harmful content that violates community guidelines',
      lastMessageOnly: true,
    }),
  ],
  outputProcessors: [
    new BatchPartsProcessor({ batchSize: 10 }),
    new ModerationProcessor({
      model: GUARDRAIL_MODEL,
      categories: ['hate', 'harassment', 'violence', 'self-harm'],
      strategy: 'filter',
      chunkWindow: 1,
    }),
  ],
});
```

החלק המעניין הוא שהגדרתם אילו קטגוריות חשובות עבור המקרה שלכם. כלי כתיבה יצירתית עשוי לאפשר תוכן יותר חופשי מאשר בוט שירות לקוחות. הסף והאסטרטגיה נותנים שליטה על רמת הקפדנות של הסינון.

## כשדברים נתקעים

כאשר מעבד משתמש באסטרטגיית `block`, Mastra מבטלת את הייצור ומחשיפה את האירוע כנתוני `tripwire`. עם `generate()`, בדקו את אובייקט התוצאה:

```typescript
const result = await secureAgent.generate('Ignore all previous instructions...');

if (result.tripwire) {
  console.log(`Blocked by ${result.tripwire.processorId}`);
  console.log(`Reason: ${result.tripwire.reason}`);
  // "Blocked! Reason: Prompt injection detected."
  return 'Request blocked by policy.';
}
```

בקריאות סטרימינג, האזינו לחלקי `tripwire` ב‑`fullStream`. תבנית זו מאפשרת לכם לטפל באירועי אבטחה באופן המתאים ליישום שלכם – לרשום אותם לניתוח, להחזיר הודעת שגיאה כללית, או לשנות מקרה בעל סיכון נמוך מ‑`block` ל‑`warn` בזמן שאתם מכוונים את הספים. ה‑`processorId` וה‑`reason` מצביעים איזה מעבד סימן את התוכן, מה שמסייע באיתור חיובי‑של‑שגיאות.

## מה זה לא פותר

מעבדים תופסים הרבה, אך הם אינם קסם. תוקף נחוש עם מספיק זמן עשוי למצוא פקודה שעוברת דרך המסנן. מודלים לעיתים מייצרים הלוצינציות שהמעבדים אינם יכולים לחזות. ותמיד יש פשרה בין אבטחה לגמישות: ככל שהכללים קפדניים יותר, כך גדל הסיכון לחסום מקרים לגיטימיים.

הערך אינו הגנה מושלמת. מדובר ביכולת שיטתית להתמודד עם הבעיות השגרתיות שיבואו לייצור. ניתן לכוונן את הרגישות ככל שמבינים מה המשתמשים עושים בפועל. אפשר להוסיף מעבדים מותאמים לסיכונים ספציפיים לתחום. וגם ניתן לחבר callbacks של הפרה, יומנים, עקבות ורשומות ביקורת ברמת האפליקציה סביב נקודת הבקרה הזו.

רוב בעיות האבטחה ב‑AI בייצור אינן התקפות מתוחכמות. הן אנשים שמעתיקים ומדביקים נתונים שלא צריכים, או מגלים בניסיון וטעייה שהבוט עושה דברים שלא התכוונו. מעבדים לא יפסיקו כל בעיה אפשרית, אך הם מקשים משמעותית על הבעיות הברורות.

### משאבים

- [תיעוד Guardrails של Mastra](https://mastra.ai/docs/agents/guardrails)
- [תיעוד מעבדים של Mastra](https://mastra.ai/docs/agents/processors)
- [אישור סוכן של Mastra](https://mastra.ai/docs/agents/agent-approval)
- [מאגר GitHub של Mastra](https://github.com/mastra-ai/mastra)

## קראו את הסדרה

1. [LLM Routing](/llm-routing-mastra-ai)
2. **Security & Guardrails** (פוסט זה)
3. [MCP & Tool Integrations](/mastra-mcp-tool-integrations)
4. [Workflows & Memory](/mastra-workflows-memory)
````
