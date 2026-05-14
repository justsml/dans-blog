# Translation Candidate
- Slug: quiz-data-structures-algorithms
- Locale: he
- Model: openrouter/openai/gpt-oss-120b:nitro
- Target: src/content/posts/2024-10-31--quiz-data-structures-algorithms/he/index.mdx
- Validation: deferred
- Runtime seconds: 36.85
- Input tokens: 18380
- Output tokens: 11612
- Thinking tokens: unknown
- Cached input tokens: 7168
- Cache write tokens: 0
- Estimated cost: $0.003266
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
title: 'חידון: מבני נתונים ואלגוריתמים'
subTitle: האם אתה יכול לבצע BS על עץ בינארי?
label: Algorithms & DS
unlisted: true
date: '2024-10-31'
modified: '2024-11-08'
social_image: ../desktop-social.webp
category: Quiz
subCategory: Data Structures
tags:
  - quiz
  - data-structures
  - algorithms
  - intermediate
  - advanced
cover: ../redcharlie-mugDbuNnbd0-unsplash-square.webp
cover_full_width: ../redcharlie-mugDbuNnbd0-unsplash-wide.webp
cover_mobile: ../redcharlie-mugDbuNnbd0-unsplash-square.webp
cover_icon: ../redcharlie-mugDbuNnbd0-unsplash-square.webp
---
import Challenge from '../../../../components/QuizUI/Challenge';
import QuizUI from '../../../../components/QuizUI/QuizUI';

<section class="inset">
  ברוכים הבאים למבחן מבני הנתונים והאלגוריתמים שלי!
</section>

המבחן הזה יבדוק את הידע שלכם במבני נתונים (מחסנים, רשימות, עצים וכו'), ובאלגוריתמים, וכן במורכבות זמן ריצה.

### 20 שאלות… בואו נתחיל!

<QuizUI>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={0}
  group="מבני נתונים"
  title="מחסנים מול תורים"
  options={[
    {text: 'שניהם'},
    {text: 'תורים'},
    {text: 'מחסנים', isAnswer: true},
    {text: 'אף אחד'},
  ]}
>
  <slot name="question">
  <div className="question">
    איזו מבנה נתונים מתאים ביותר לדפוס גישה LIFO (האחרון נכנס, הראשון יוצא)?
  </div>
  </slot>

  <slot name="hints">
  <div className="hint">
    הסתכל על דפוס הגישה, לא על שם המבנה. התשובה הנכונה נגזרת ממה שצריך לקרות ראשון או אחרון.
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    מחסנים הם המתאימים ביותר לדפוס גישה LIFO. תורים מתאימים לדפוס גישה FIFO (הראשון נכנס, הראשון יוצא).
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={1}
  group="אלגוריתמים"
  title="סימון O גדול"
  options={[
    {text: 'O(1)', isAnswer: true},
    {text: 'O(n)'},
    {text: 'O(log n)'},
    {text: 'O(n^2)'},
  ]}
>
  <slot name="question">
  <div className="question">
    מהי סיבוכיות הזמן של אלגוריתם שתמיד לוקח את אותו זמן ריצה, ללא קשר לגודל הקלט?
  </div>
  </slot>

  <slot name="hints">
  <div className="hint">
    הסתכל על תבנית הגישה, לא על שם המבנה. התשובה הנכונה בדרך כלל נובעת ממה שצריך לקרות ראשון או אחרון.
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    O(1) מייצג סיבוכיות זמן קבועה. זה אומר שהאלגוריתם תמיד לוקח את אותו זמן ריצה, ללא קשר לגודל הקלט.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={2}
  group="מבני נתונים"
  title="חישוב אורך של רשימת קשורה"
  options={[
    {text: 'O(1)'},
    {text: 'O(log n)'},
    {text: 'O(n^2)'},
    {text: 'O(n)', isAnswer: true},
    {text: 'O(n log n)'},
  ]}
>
  <slot name="question">
  <div className="question">
    מהי הסיבוכיות בזמן לחישוב האורך של רשימה קשורה חד-כיוונית?
  </div>
  </slot>

  <slot name="hints">
  <div className="hint">
    הסתכל על תבנית הגישה, לא על שם המבנה. התשובה הנכונה בדרך כלל נובעת ממה שצריך לקרות ראשון או אחרון.
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    כדי לחשב את האורך של רשימה קשורה חד-כיוונית, עליך לעבור על כל הצמתים מראש עד לזנב, מה שמוביל לסיבוכיות של O(n).
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={3}
  group="מבני נתונים"
  title="חיפוש בעץ חיפוש בינארי"
  options={[
    {text: 'O(1)'},
    {text: 'O(log n)', isAnswer: true},
    {text: 'O(n)'},
    {text: 'O(n^2)'},
    {text: 'O(n log n)'},
  ]}
>
  <slot name="question">
  <div className="question">
    מהי הסיבוכיות הממוצעת של זמן חיפוש אלמנט בעץ חיפוש בינארי מאוזן?
  </div>
  </slot>

  <slot name="hints">
  <div className="hint">
    הסתכל על דפוס הגישה, לא על שם המבנה. התשובה הנכונה בדרך כלל נובעת ממה שצריך לקרות ראשון או אחרון.
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    ב‑BST מאוזן, הסיבוכיות הממוצעת של חיפוש היא O(log n) מכיוון שכל רמה מצמצמת את מרחב החיפוש בחצי.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={4}
  group="אלגוריתמי מיון"
  title="סיבוכיות מיזוג מיון"
  options={[
    {text: 'O(n^2)'},
    {text: 'O(log n)'},
    {text: 'O(n log n)', isAnswer: true},
    {text: 'O(n)'},
    {text: 'O(1)'},
  ]}
>
  <slot name="question">
  <div className="question">
    מהי סיבוכיות הזמן של אלגוריתם מיזוג מיון במצב הגרוע ביותר?
  </div>
  </slot>

  <slot name="hints">
  <div className="hint">
    הסתכל על דפוס הגישה, לא על שם המבנה. התשובה הנכונה בדרך כלל נובעת ממה שצריך לקרות ראשון או אחרון.
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    מיזוג מיון תמיד פועל עם סיבוכיות במצב הגרוע של O(n log n) מכיוון שהוא מחלק את המערך לחצי באופן חוזר וממזג את תתי‑המערכים הממוינים.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={5}
  group="גרפים"
  title="DFS נגד BFS"
  options={[
    {text: 'Queue', isAnswer: true},
    {text: 'Stack'},
    {text: 'Priority Queue'},
    {text: 'Hash Map'},
    {text: 'Set'},
  ]}
>
  <slot name="question">
  <div className="question">
    איזו מבנה נתונים משמש בדרך כלל ליישום חיפוש ברוחב (BFS)?
  </div>
  </slot>

  <slot name="hints">
  <div className="hint">
    הסתכל על תבנית הגישה, לא על שם המבנה. התשובה הנכונה נובעת בדרך כלל ממה שצריך לקרות ראשון או אחרון.
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    BFS משתמש בתור (Queue) כדי לחקור צמתים רמה אחרי רמה, ומעבד צמתים באופן רוחב‑ראשוני (לפי "שורה").
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={6}
  group="גרפים"
  title="זיהוי מחזורים בגרפים"
  options={[
    {text: 'מיון מהיר'},
    {text: 'חיפוש ברוחב'},
    {text: 'מיון מיזוג'},
    {text: 'חיפוש בעומק', isAnswer: true},
    {text: 'מיון בועות'},
  ]}
>
  <slot name="question">
  <div className="question">
    איזה אלגוריתם משמש בדרך כלל לזיהוי מחזורים בגרף מכוון?
  </div>
  </slot>

  <slot name="hints">
  <div className="hint">
    הסתכל על תבנית הגישה, לא על שם המבנה. התשובה הנכונה בדרך כלל נובעת ממה שחייב לקרות ראשון או אחרון.
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    חיפוש בעומק (DFS) משמש בדרך כלל לזיהוי מחזורים בגרף על‑ידי שמירת מחסנית רקורסיה למעקב אחרי צמתים שבוקרו.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={7}
  group="אלגוריתמי מיון"
  title="סיבוכיות של מיון ערימה"
  options={[
    {text: 'O(n^2)'},
    {text: 'O(n log n)', isAnswer: true},
    {text: 'O(n)'},
    {text: 'O(log n)'},
    {text: 'O(1)'},
  ]}
>
  <slot name="question">
  <div className="question">
    מהי סיבוכיות הזמן של מיון ערימה במקרה הגרוע ביותר?
  </div>
  </slot>

  <slot name="hints">
  <div className="hint">
    הסתכל על דפוס הגישה, לא על שם המבנה. התשובה הנכונה בדרך כלל נובעת ממה שצריך לקרות ראשון או אחרון.
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    מיון ערימה שומר על סיבוכיות זמן גרועה של O(n log n), מכיוון שהוא בונה ערימה ומוציא את האלמנט המקסימלי באופן חוזר.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={8}
  group="מבני נתונים"
  title="זמן ריצה של טבלת גיבוב"
  options={[
    {text: 'O(n)'},
    {text: 'O(log n)'},
    {text: 'O(1)', isAnswer: true},
    {text: 'O(n^2)'},
    {text: 'O(n log n)'},
  ]}
>
  <slot name="question">
  <div className="question">
    מהי סיבוכיות הזמן הממוצעת לגישה לאיבר בטבלת גיבוב?
  </div>
  </slot>

  <slot name="hints">
  <div className="hint">
    הסתכל על תבנית הגישה, לא על שם המבנה. התשובה הנכונה בדרך כלל נובעת ממה שצריך לקרות ראשון או אחרון.
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    לטבלאות גיבוב יש סיבוכיות זמן ממוצעת של O(1) לגישה לאיברים, בהנחה שפונקציית הגיבוב טובה ומפחיתה התנגשויות.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={9}
  group="מבני נתונים"
  title="פעולות מחסנית"
  options={[
    {text: 'Push, Pop, Peek', isAnswer: true},
    {text: 'Enqueue, Dequeue, Peek'},
    {text: 'Insert, Search, Delete'},
    {text: 'Traverse, Visit, Sort'},
  ]}
>
  <slot name="question">
  <div className="question">
    איזה קבוצה מכילה את הפעולות השגרתיות המבוצעות על מחסנית?
  </div>
  </slot>

  <slot name="hints">
  <div className="hint">
    הסתכל על דפוס הגישה, לא על שם המבנה. התשובה הנכונה בדרך כלל נגזרת ממה שצריך לקרות ראשון או אחרון.
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    הפעולות העיקריות של מחסנית הן Push (הוספת אלמנט), Pop (הסרת אלמנט), ו‑Peek (צפייה באלמנט העליון מבלי להסירו).
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={10}
  group="אלגוריתמים על גרפים"
  title="אלגוריתם המסלול הקצר ביותר"
  options={[
    {text: 'Kruskal\'s Algorithm'},
    {text: 'Prim\'s Algorithm'},
    {text: 'Bellman-Ford Algorithm'},
    {text: 'Dijkstra\'s Algorithm', isAnswer: true},
    {text: 'Floyd-Warshall Algorithm'},
  ]}
>
  <slot name="question">
  <div className="question">
    איזה אלגוריתם משמש בדרך כלל למציאת המסלול הקצר ביותר בגרף משוקלל עם קשתות לא שליליות?
  </div>
  </slot>

  <slot name="hints">
  <div className="hint">
    הסתכל על תבנית הגישה, לא על שם המבנה. התשובה הנכונה בדרך כלל נובעת ממה שצריך לקרות ראשון או אחרון.
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    אלגוריתם Dijkstra משמש לעיתים קרובות למציאת המסלול הקצר ביותר בגרפים עם משקלים של קשתות שאינם שליליים. הוא משתמש בתור עדיפות כדי לקבוע את המרחק הקצר ביותר ביעילות.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={11}
  group="מבני נתונים של עצים"
  title="עצים מחפשי איזון עצמי"
  options={[
    {text: 'עץ חיפוש בינארי ו‑Min Heap'},
    {text: 'עץ AVL ועץ Red-Black', isAnswer: true},
    {text: 'Min Heap ו‑Max Heap'},
    {text: 'Stack ו‑Queue'},
  ]}
>
  <slot name="question">
  <div className="question">
    איזה קבוצה מכילה דוגמאות למבני נתונים של עצי חיפוש בינאריים עם איזון עצמי?
  </div>
  </slot>

  <slot name="hints">
  <div className="hint">
    הסתכל על תבנית הגישה, לא על שם המבנה. התשובה הנכונה בדרך כלל נובעת ממה שצריך לקרות ראשון או אחרון.
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    עצים מסוג AVL ועצים מסוג Red-Black הם סוגי עצים עם איזון עצמי, המבטיחים שהעץ יישאר מאוזן אחרי כל הוספה או מחיקה.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={12}
  group="רקורסיה"
  title="מקרה בסיס של רקורסיה"
  options={[
    {text: 'לולאה אינסופית'},
    {text: 'חריגת מחסנית'},
    {text: 'מקרה בסיס', isAnswer: true},
    {text: 'משתנה גלובלי'},
    {text: 'הגבלת תחום'},
  ]}
>
  <slot name="question">
  <div className="question">
    מה חייב להיות מוגדר בפונקציה רקורסיבית כדי למנוע רקורסיה אינסופית?
  </div>
  </slot>

  <slot name="hints">
  <div className="hint">
    הסתכל על דפוס הגישה, לא על שם המבנה. התשובה הנכונה בדרך כלל נובעת ממה שצריך לקרות ראשון או אחרון.
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    מקרה בסיס נדרש בפונקציה רקורסיבית כדי לעצור את הקריאות הרקורסיביות כאשר תנאי מסוים מתקיים, ובכך למנוע רקורסיה אינסופית.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={13}
  group="מבני נתונים"
  title="פעולות תור"
  options={[
    {text: 'הוספה והסרה', isAnswer: true},
    {text: 'דחיפה והוצאה'},
    {text: 'הצצה ו‑ראש'},
    {text: 'מעבר ומיון'},
  ]}
>
  <slot name="question">
  <div className="question">
    מהן שתי הפעולות העיקריות של תור?
  </div>
  </slot>

  <slot name="hints">
  <div className="hint">
    הסתכל על דפוס הגישה, לא על שם המבנה. התשובה הנכונה נובעת בדרך כלל ממה שצריך לקרות ראשון או אחרון.
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    שתי הפעולות העיקריות בתור הן Enqueue (הוספת אלמנט לסוף) ו‑Dequeue (הסרת אלמנט מההתחלה).
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={14}
  group="אלגוריתמי גרפים"
  title="מיון טופולוגי"
  options={[
    {text: 'הגרף חייב להכיל מחזורים'},
    {text: 'הגרף חייב להיות משוקלל ומחובר'},
    {text: 'הגרף חייב להיות בלתי מכוון ובלתי מחזורי'},
    {text: 'הגרף חייב להיות מכוון ובלתי מחזורי', isAnswer: true},
  ]}
>
  <slot name="question">
  <div className="question">
    מהן התנאים לביצוע מיון טופולוגי על גרף?
  </div>
  </slot>

  <slot name="hints">
  <div className="hint">
    הסתכל על תבנית הגישה, לא על שם המבנה. התשובה הנכונה בדרך כלל נובעת ממה שצריך לקרות ראשון או אחרון.
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    ניתן לבצע מיון טופולוגי על גרף אם הוא מכוון ובלתי מחזורי (DAG). סוג סדר זה שימושי בבעיות תזמון משימות.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={15}
  group="תכנות דינמי"
  title="סיבוכיות רקורסיה של פיבונאצ'י"
  options={[
    {text: 'O(1)'},
    {text: 'O(2^n)', isAnswer: true},
    {text: 'O(n)'},
    {text: 'O(log n)'},
    {text: 'O(n^2)'},
  ]}
>
  <slot name="question">
  <div className="question">
    מהי סיבוכיות הזמן של מימוש רקורסיבי תמים של סדרת פיבונאצ'י?
  </div>
  </slot>

  <slot name="hints">
  <div className="hint">
    הסתכל על תבנית הגישה, לא על שם המבנה. התשובה הנכונה בדרך כלל נובעת ממה שצריך לקרות ראשון או אחרון.
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    למימוש הרקורסיבי התם של סדרת פיבונאצ'י יש סיבוכיות זמן של O(2^n) עקב החישובים החוזרים המרובים עבור כל מספר פיבונאצ'י.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={16}
  group="מבני נתונים"
  title="מימוש תור עדיפויות"
  options={[
    {text: 'מערך'},
    {text: 'מחסנית'},
    {text: 'ערימה', isAnswer: true},
    {text: 'תור'},
    {text: 'רשימה מקושרת'},
  ]}
>
  <slot name="question">
  <div className="question">
    איזה מבנה נתונים משמש בדרך כלל למימוש תור עדיפויות?
  </div>
  </slot>

  <slot name="hints">
  <div className="hint">
    הסתכל על דפוס הגישה, לא על שם המבנה. התשובה הנכונה נובעת בדרך כלל ממה שצריך לקרות ראשון או אחרון.
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    תור עדיפויות ממומש לרוב באמצעות ערימה מכיוון שהיא מאפשרת חילוץ יעיל של האלמנט בעל העדיפות הגבוהה או הנמוכה ביותר.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={17}
  group="מבני נתונים"
  title="מעברי עץ בינארי"
  options={[
    {text: 'In-order, Pre-order, Post-order', isAnswer: true},
    {text: 'Breadth-First, Depth-First, Heapify'},
    {text: 'Sort, Search, Rotate'},
    {text: 'Push, Pop, Peek'},
  ]}
>
  <slot name="question">
  <div className="question">
    איזה קבוצה מציינת את סדרי המעבר העמוקים הנפוצים לעץ בינארי?
  </div>
  </slot>

  <slot name="hints">
  <div className="hint">
    הסתכל על דפוס הגישה, לא על שם המבנה. התשובה הנכונה בדרך כלל נובעת ממה שצריך לקרות ראשון או אחרון.
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    In-order, Pre-order, ו‑Post-order הם שלושת סדרי המעבר העמוקים הנפוצים לעצי בינארי, כאשר כל אחד מציג סדר שונה לביקור בצמתים. מעבר ברוחב (Breadth‑first) גם הוא נפוץ, אך הוא שייך לקטגוריית מעבר שונה.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={18}
  group="מבני נתונים של עצים"
  title="תכונת ערמה"
  options={[
    {text: 'כל הצמתים ממוינים משמאל לימין'},
    {text: 'השורש הוא תמיד האלמנט הגדול ביותר'},
    {text: 'כל העלים נמצאים באותו רמה'},
    {text: 'השורש הוא האלמנט הקטן ביותר והגובה הוא O(log n)', isAnswer: true},
  ]}
>
  <slot name="question">
  <div className="question">
    אילו מהתכונות הבאות נכונות עבור ערמת מינימום?
  </div>
  </slot>

  <slot name="hints">
  <div className="hint">
    הסתכל על תבנית הגישה, לא על שם המבנה. התשובה הנכונה בדרך כלל נובעת ממה שצריך לקרות ראשון או אחרון.
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    ב‑ערמת מינימום, השורש הוא תמיד האלמנט הקטן ביותר, והגובה של העץ הוא O(log n), מה שהופך את ההוספה וההוצאה ליעילות.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={19}
  group="אלגוריתמי מיון"
  title="יציבות מיון בועות"
  options={[
    {text: 'לא יציב'},
    {text: 'יציב', isAnswer: true},
    {text: 'תלוי במימוש'},
    {text: 'אף אחד'},
    {text: 'הסיבוכיות קובעת יציבות'},
  ]}
>
  <slot name="question">
  <div className="question">
    האם אלגוריתם מיון בועות יציב?
  </div>
  </slot>

  <slot name="hints">
  <div className="hint">
    הסתכל על תבנית הגישה, לא על שם המבנה. התשובה הנכונה בדרך כלל נובעת ממה שצריך לקרות ראשון או אחרון.
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    מיון בועות הוא אלגוריתם מיון יציב מכיוון שהוא שומר על סדר יחסי של אלמנטים שווים במהלך המיון.
  </div>
  </slot>
</Challenge>

</QuizUI>
````
