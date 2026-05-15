# Translation Candidate
- Slug: ai-sdk-math-tool
- Locale: he
- Model: openrouter/openai/gpt-oss-120b:nitro
- Target: src/content/posts/2026-01-06--ai-sdk-math-tool/he/index.mdx
- Validation: deferred
- Runtime seconds: 2.48
- Input tokens: 3994
- Output tokens: 2233
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- Estimated cost: $0.000558
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
title: הפסיקו לבקש מ‑LLM לעשותמתמטיקה
subTitle: הם לא מצליחים בזה. הנה איך לתקן זאת.
modified: '2026-01-07'
tags:
  - ai
  - ai-sdk
  - typescript
  - math
  - tools
  - patterns
category: AI
subCategory: Engineering
social_image: ../desktop-social.webp
cover_full_width: ../wide.webp
cover_mobile: ../square.webp
cover_icon: ../square.webp
---
אתם יודעים מה מוזר במודלים של שפה? הם יכולים להסביר מכניקת קוונטום, לכתוב שירה, ולתקן את ה‑TypeScript שלכם... אבל אם תבקשו מהם להכפיל 18472 ב‑9347 יש סבירות גבוהה שהם יענו בביטחון עם תוצאה שגויה באלפי יחידות.

זה היה מבלבל אותי עד שהבנתי מה בעצם אנחנו מבקשים מהם לעשות. אנחנו מבקשים ממנוע תואם תבניות להיות מחשבון. זה כמו לבקש ממאמן גימסטיקה לאזן את ספר החשבונות שלכם כי הוא מבין את המושג "איזון".

העניין הוא, LLM‑ים אינם מחשבים דבר. כשאתם שואלים את GPT או Claude מהו 2 + 2, הם לא מחברים. הם מנבאים שהטוקן "4" הוא הסביר ביותר שיופיע אחרי "2 + 2 =". רוב הזמן זה עובד מצוין כי דפוסים כאלה קיימים בנתוני האימון שלהם. אבל אם תדחפו מעבר לחישוב פשוט למספר שלבים או לכל דבר עם מספרים שלא היו נפוצים באימון, אתם בעצם מזמינים קובייה.

נתקלתי בזה באופן ישיר לאחרונה כשבדקתי קוד שהשתמש במודל ברמה עליונה כדי לחשב תשלומי משכנתא. המודל השיב בביטחון מלא. הוא היה גם שגוי ב‑400 $ לחודש. זה הסוג של טעות שחשובה.

גם כשמודלים משתפרים ביכולת ההיסק (GPT‑5 לכאורה מציג שיפורים), הם עדיין מבצעים התאמת תבניות מתוחכמת, לא חישוב סימבולי. עבור עבודות יצירתיות ומשימות שפה טבעית, האופי ההסתברותי הזה הוא בדיוק מה שהופך אותם לקסומים. עבור מתמטיקה? לא כל כך.

## מה באמת פותר את זה?

התשובה אינה לחכות למודלים חכמים יותר. היא לתת למודל את הכלי המתאים למשימה.

תחשבו איך הייתם פותרים את הבעיה אם הייתם בונים מערכת ללא AI. לא הייתם כותבים לוגיקה מתמטית מותאמת, אלא תשתמשו בספרייה. אותו עיקרון חל כאן, רק שהפעם אנחנו מלמדים את ה‑LLM מתי ואיך להשתמש בספרייה הזאת.

קריאת כלי (tool calling) ב‑SDK‑ים מודרניים של AI מאפשרת לנו להעביר למודל פונקציות מובנות שהוא יכול לקרוא. במקום לכפות על ה‑LLM להעמיד פנים שהוא יודע מתמטיקה, אנחנו נותנים לו משהו שעושה זאת באמת: מנוע מתמטיקה סימבולי.

אני משתמש ב‑[AI SDK גרסאות 5 ו‑6](https://ai-sdk.vercel.ai/) לשם כך, יחד עם CortexJS Compute Engine. ה‑SDK מטפל בתזמור ובניתוב הכלים, בעוד CortexJS מטפל בכל דבר מהחישוב הבסיסי ועד לקלוקולוס. ההפרדה בין תחומי האחריות היא מפתיעה ונקייה.

```bash
bun add ai @ai-sdk/anthropic @cortex-js/compute-engine zod
```

## בניית כלי המתמטיקה

היישום פשוט יותר ממה שציפיתם. מה שאנחנו בונים הוא גשר בין הבנת השפה הטבעית של ה‑LLM לבין חישוב מתמטי ממשי.

```typescript
import { generateText, stepCountIs, tool } from 'ai';
import { ComputeEngine } from '@cortex-js/compute-engine';
import { z } from 'zod';

// Initialize the engine once
const ce = new ComputeEngine();

const mathTool = tool({
  description: 'Evaluate mathematical expressions and solve equations with guaranteed accuracy. MUST be used for all mathematical operations to verify correctness - do not attempt mental math. Supports arithmetic, algebra, calculus, and complex operations. Can process multiple expressions at once.',
  parameters: z.object({
    expressions: z.array(z.string()).describe(
      'Array of mathematical expressions in LaTeX or plain notation, e.g. ["2 + 2", "\\frac{x^2 + 1}{x - 1}", "\\int x^2 dx"]'
    ),
  }),
  execute: async ({ expressions }) => {
    // Process all expressions in parallel (or detailed batch)
    return expressions.map(expression => {
      try {
        const result = ce.parse(expression).evaluate();
        return {
          expression,
          result: result.toString(),
          latex: result.latex,
        };
      } catch (error) {
        return { 
          expression,
          error: (error as Error).message 
        };
      }
    });
  },
});
```

כמה נקודות שכדאי לשים לב אליהן:

התיאור עושה את רוב העבודה. הביטוי "MUST be used" עשוי להיראות תוקפני, אך מניסיוני, להיות מפורש עם המודל לגבי מתי להשתמש בכלי הוא ההבדל בין תפקוד מזדמן לתפקוד אמין. אפשר לראות זאת כהנדסת פקודות ברמת הכלי.

עיבוד באצוות דרך מערך `expressions` חשוב יותר ממה שנדמה. לכל קריאה למודל יש השהייה. אם אתם פותרים מערכת משוואות או מבצעים חישוב מרובה שלבים, עיבוד נפרד של כל משוואה יוצר חוויית משתמש גרועה. אצווה משמעותה קריאה אחת בלבד כדי לפתור עשר בעיות.

שימוש במנוע סימבולי במקום `eval()` (בבקשה אל תשתמשו ב‑`eval()`) מספק לנו הבנה מתמטית אמיתית. המנוע מנתח כוונה, מטפל בפורמט LaTeX, ויכול לעבוד עם נגזרות ואינטגרלים. אנחנו לא רק מבצעים חישובים, אנחנו עושים מתמטיקה.

טיפול בשגיאות מוגבל לכל ביטוי. אם חישוב אחד נכשל, אנו מחזירים את השגיאה אך ממשיכים עם השאר. זה מאפשר למודל לראות מה עבד ומה לא, ולפעמים לתקן את עצמו בשלב הבא.

## Putting It to Work

בואו נזרוק עליו משהו שבדרך כלל יגרום למודל גולמי להלהיב:

```typescript
import { anthropic } from '@ai-sdk/anthropic';

const { text } = await generateText({
  model: anthropic('claude-sonnet-4-5'),
  prompt: 'Calculate 18472 × 9347, divide by 127, then take the square root of the result.',
  tools: { mathTool },
  stopWhen: stepCountIs(5), // Allow up to five model/tool steps
});

console.log(text);
```

המודל רואה את המתמטיקה, מזהה שהדיוק נדרש, קורא לכלי, מקבל את התוצאה המדויקת, ואז מסביר זאת בשפה טבעית. כל רכיב עושה את מה שהוא עושה הכי טוב.

## מעבר לחישובים בסיסיים

מאחר ואנחנו משתמשים במנוע סימבולי, הגישה הזו מתמודדת עם משימות שכלי מחשבון פשוט לא יכול לטפל בהן.

רוצים לפתור משוואות אלגבריות? `"Solve these equations: 3x + 7 = 22 and 2y - 5 = 13"` עובד מצוין.

צריך חשבון דיפרנציאלי? `"Find the derivative of x^3 + 2x^2 and evaluate it at x = 2"` הוא רק קריאה נוספת לכלי.

תמיכת LaTeX היא במיוחד מועילה אם אתם בונים אפליקציות חינוכיות. המנוע מבין קלט LaTeX באופן מובנה ויכול להחזיר תוצאות בפורמט שמיועד להצגה. אין צורך בניתוח נוסף.

## התמונה הגדולה יותר

אני חושב שהדפוס הזה רלוונטי מעבר למתמטיקה. מה שאנחנו באמת עושים הוא להכיר במגבלות של מודלים גדולים בעוד שאנחנו מנצלים את החוזקות שלהם. הם מצוינים בהבנת כוונה, בניתוח שפה טבעית ובתזמור זרימות עבודה. הם אינם מחשבונים, מסדי נתונים או מערכות קבצים.

בכל פעם שאנחנו מנסים לגרום למודל לבצע משימה דטרמיניסטית, אנחנו מתנגשים בטבעם. אבל כשמשלבים את ההבנה של השפה הטבעית עם כלים מיוחדים שמטפלים בחלקים הדטרמיניסטיים? כאן הדברים הופכים למעניינים.

כלי המתמטיקה הוא רק דוגמה אחת. אותו עיקרון חל על מניפולציית תאריכים, חישובים פיננסיים, עיבוד תמונות, שאילתות מסד נתונים… בכל מקום שהדיוק חשוב יותר מהיצירתיות. תנו למודל להבין מה המשתמש רוצה, ואז העבירו את העבודה האמיתית למשהו שנבנה במיוחד למטרה הזו.

זה שינוי באופן החשיבה על בנייה עם AI. לא „האם המודל יכול לעשות זאת?“ אלא „האם המודל יכול לתזמור זאת?“ שינוי קטן בניסוח, הבדל משמעותי באמינות.

## משאבים

- [Vercel AI SDK Documentation](https://sdk.vercel.ai/docs)
- [CortexJS Compute Engine](https://cortexjs.io/compute-engine/)
- [Tool Calling Guide](https://sdk.vercel.ai/docs/ai-sdk-core/tools-and-tool-calling)
- [AI SDK Examples Repository](https://github.com/vercel/ai/tree/main/examples)
````
