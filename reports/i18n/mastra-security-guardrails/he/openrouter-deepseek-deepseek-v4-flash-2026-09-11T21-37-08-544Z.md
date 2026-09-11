# Translation Candidate
- Slug: mastra-security-guardrails
- Locale: he
- Model: openrouter/deepseek/deepseek-v4-flash
- Target: src/content/posts/2026-01-03--mastra-security-guardrails/he/index.mdx
- Validation: deferred
- Runtime seconds: 55.60
- Input tokens: 4576
- Output tokens: 6581
- Thinking tokens: unknown
- Cached input tokens: 1024
- Cache write tokens: 0
- Estimated cost: $0.002343
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
title: ''
subTitle: 'אם לסוכן שלך אין מעקות בטיחות, אתה לא מוכן לייצור.'
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
אף אחד לא מתכוון לבנות מערכת AI לא בטוחה. אתה כותב הוראות, בודק מקרי קצה, מוסיף כמה חוקי ולידציה. ואז מישהו מבין שהוא יכול לרמות את הבוט שלך שיתחזה לפיראט ויחשוף נתוני משתמשים. או שמספר כרטיס אשראי מופיע בלוגים שלך. או שהמודל ממליץ בביטחון על מוצר של מתחרה.

הפער בין "עובד בהדגמה" ל"בטוח בייצור" רחב יותר ממה שרוב הצוותים מצפים.

חלק מהבעיה הוא של‑LLM גולמיים אין דעות על מה הם צריכים או לא צריכים לעשות. הם מכונות חיזוי שמנסות להמשיך כל תבנית שהתחלת. תן להם הנחיה שנראית כמו "מצב עקיפת מערכת", והם ישתפו פעולה בשמחה. זו לא תקלה במודל; זה פשוט איך שמודלי שפה עובדים.

רוב המסגרות נותנות לך את המודל ומאחלות לך בהצלחה. מאסטרה נוקטת בגישה אחרת: היא מניחה שבסופו של דבר תזדקק למעקי בטיחות, אז היא בונה אותם לתוך ארכיטקטורת הסוכן מההתחלה.

---

## מעבדים כשכבות בטיחות

המנגנון המרכזי פשוט. לפני שההנחיה שלך מגיעה למודל, היא עוברת בשרשרת של מעבדי קלט. אחרי שהמודל מגיב, מעבדי פלט מקבלים את תורם. כל מעבד יכול לבדוק, לשנות או לחסום את התוכן בשלב הזה.

חשוב עליהם כתוכנת ביניים לאינטראקציות AI. אתה מכניס את אלה שאתה צריך, מגדיר את ההתנהגות שלהם, והם רצים אוטומטית על כל בקשה.

### 1. עצירת הפיראטים (הזרקת הנחיות)

התקפות הזרקת הנחיות הפכו ליצירתיות. אנשים משתמשים בתווי Unicode בלתי נראים, כותבים הוראות ב‑base64, או משכנעים את המודל שהם במצב "דיבאג" שבו חוקים רגילים לא חלים. הטכניקות ממשיכות להתפתח.

מאסטרה כוללת מעבדים שתופסים תבניות נפוצות:

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

ה[`UnicodeNormalizer`](https://mastra.ai/reference/processors/unicode-normalizer) מסיר תווי בקרה ומכווץ רווחים לבנים. ה[`PromptInjectionDetector`](https://mastra.ai/reference/processors/prompt-injection-detector) מנתח את הקלט המנוקה לאיתור תבניות שמצביעות על ניסיון לעקוף את ההוראות שלך.

אתה מגדיר עד כמה אגרסיבית תהיה הזיהוי (פרמטר ה`threshold`) ומה צריך לקרות כשהיא מופעלת (`block`, `warn`, `filter`, או `rewrite`).

### 2. טיפול במידע מזהה אישי (PII)

מספרי כרטיסי אשראי בלוגים, מספרי ת.ז. במאגרי וקטורים, כתובות אימייל שנשמרות יותר מהנדרש. אלה סוגי הבעיות שהופכות לבעיות רגולטוריות. האתגר הוא שמשתמשים לא תמיד מבינים שהם מדביקים מידע רגיש לחלון צ'אט.

ה[`PIIDetector`](https://mastra.ai/reference/processors/pii-detector) סורק תבניות נפוצות לפני שהן מגיעות למודל שלך או נכתבות לאחסון:

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

אתה יכול לבחור להסתיר (redact), לגזוז (hash), להסיר, להחליף ב‑placeholders מסווגים, או לחסום לחלוטין. `PIIDetector` הוא מעבד היברידי: שים אותו ב‑`inputProcessors`, `outputProcessors`, או שניהם תלוי היכן הסיכון קיים. עבור פלט בזרימה, אצור (batch) את ה‑chunks לפני הרצת מסווגים כבדים יותר כדי לא לשלם על בדיקת LLM נפרדת על כל טיפת טוקן קטנה.

### 3. ניהול תוכן

## 3. ניהול תוכן

מודלים שאומנו על נתוני אינטרנט ראו דברים. ללא סינון, הם עלולים מדי פעם להפיק תגובות שיגרמו לצוות יחסי הציבור שלך להזיע. [`ModerationProcessor`](https://mastra.ai/reference/processors/moderation-processor) תופס תוכן שמפר את ההנחיות שלך:

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

החלק המעניין הוא שאתה מגדיר אילו קטגוריות רלוונטיות למקרה השימוש שלך. כלי לכתיבה יצירתית עשוי לאפשר תוכן אקספרסיבי יותר מבוט שירות לקוחות. הסף (threshold) והאסטרטגיה נותנים לך שליטה על מידת הנוקשות של הסינון.

---

## כשדברים נתקלים

כאשר מעבד משתמש באסטרטגיית `block`, Mastra מפסיקה את היצירה וחושפת את האירוע כמטא-נתונים של tripwire. עם `generate()`, בדוק את אובייקט התוצאה:

```typescript
const result = await secureAgent.generate('Ignore all previous instructions...');

if (result.tripwire) {
  console.log(`Blocked by ${result.tripwire.processorId}`);
  console.log(`Reason: ${result.tripwire.reason}`);
  // "Blocked! Reason: Prompt injection detected."
  return 'Request blocked by policy.';
}
```

לקריאות streaming, האזן ל‑chunks מסוג `tripwire` על `fullStream`. תבנית זו מאפשרת לך לטפל באירועי אבטחה באופן המתאים ליישום שלך. תוכל לתעד אותם לצורך ניתוח, להחזיר הודעת שגיאה גנרית, או להחליף מקרה בסיכון נמוך מ‑`block` ל‑`warn` תוך כדי כוונון הספים. ה‑`processorId` וה‑`reason` אומרים לך איזה מעבד סימן את התוכן, מה שעוזר בעת איתור חיובי שגוי.

---

## מה זה לא פותר

מעבדים תופסים הרבה, אבל הם לא קסם. תוקף נחוש עם מספיק זמן יכול כנראה למצוא prompt שמחליק דרך. מודלים לפעמים הזויים בדרכים שמעבדים לא יכולים לחזות. ותמיד יש פשרה בין אבטחה לגמישות: ככל שהחוקים מחמירים יותר, כך סביר יותר שתחסום מקרי שימוש לגיטימיים.

הערך אינו בהגנה מושלמת. הוא בכך שיש דרך שיטתית לטפל בבעיות הנפוצות שבוודאי יצוצו ב‑production. תוכל לכוון את הרגישות ככל שתלמד מה המשתמשים שלך עושים בפועל. תוכל להוסיף מעבדים מותאמים אישית לסיכונים ספציפיים לתחום. ותוכל לקשר התקשרויות להפרה, לוגים, עקבות ורשומות ביקורת ברמת האפליקציה סביב אותה נקודת שליטה.

רוב בעיות האבטחה ב‑production AI אינן התקפות מתוחכמות. הן אנשים שמעתיקים ומדביקים נתונים שלא אמורים, או מגלים בניסוי וטעייה שהבוט יעשה דברים שלא התכוונת אליהם. מעבדים לא יעצרו כל בעיה אפשרית, אבל הם הופכים את הברורות להרבה יותר קשות.

### משאבים

- [תיעוד מעקות הבטיחות של Mastra](https://mastra.ai/docs/agents/guardrails)
- [תיעוד המעבדים של Mastra](https://mastra.ai/docs/agents/processors)
- [אישור סוכן של Mastra](https://mastra.ai/docs/agents/agent-approval)
- [מאגר ה‑GitHub של Mastra](https://github.com/mastra-ai/mastra)

## קראו את הסדרה

1. [ניתוב LLM](../llm-routing-mastra-ai)
2. **אבטחה ומעקות בטיחות (פוסט זה)**
3. [אינטגרציות MCP וכלים](../mastra-mcp-tool-integrations)
4. [זרימות עבודה וזיכרון](../mastra-workflows-memory)
````
