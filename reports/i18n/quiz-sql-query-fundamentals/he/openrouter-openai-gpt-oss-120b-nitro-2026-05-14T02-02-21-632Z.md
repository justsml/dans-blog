# Translation Candidate
- Slug: quiz-sql-query-fundamentals
- Locale: he
- Model: openrouter/openai/gpt-oss-120b:nitro
- Target: src/content/posts/2024-11-08--quiz-sql-query-fundamentals/he/index.mdx
- Validation: deferred
- Runtime seconds: 26.37
- Input tokens: 11055
- Output tokens: 7065
- Thinking tokens: unknown
- Cached input tokens: 3968
- Cache write tokens: 0
- Estimated cost: $0.002180
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
unlisted: false
title: 'חידון: הוכיחו את כישורי ה‑SQL שלכם!'
subTitle: אתה בצוות SQL? או noSQL?
label: SQL 101
social_image: ../desktop-social.webp
category: Quiz
subCategory: Database
date: '2024-11-08'
modified: '2024-11-08'
tags:
  - quiz
  - intro
  - sql
  - core
  - fundamentals
  - beginner
  - intermediate
cover_full_width: ../peter-thomas-os14nsuXdI4-unsplash-wide.webp
cover_mobile: ../peter-thomas-os14nsuXdI4-unsplash-square.webp
cover_icon: ../peter-thomas-os14nsuXdI4-unsplash-square.webp
---
import Challenge from '../../../../components/QuizUI/Challenge';
import QuizUI from '../../../../components/QuizUI/QuizUI';


## בדוק את יסודות השאילתות ב‑SQL

האם שימוש ב‑ORM הפך אותך לרך – במאגר הכישורים?  
אל דאגה, זה קורה להרבה מפתחים.

קפוץ פנימה והוכח את שליטתך ב‑SQL! 👇

<QuizUI>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={0}
  group="יסודות SQL"
  title="תנאי WHERE בסיסי"
  options={[
    {text: 'SELECT * FROM users WHERE name LIKE(John);'},
    {text: 'SELECT * FROM users WHERE name = \', isAnswer: true},
    {text: 'SELECT * FROM users WHERE name == "John";'},
    {text: 'SELECT * FROM users WHERE name === "John";'},
  ]}
>
  <slot name="question">
  <div className="question">
    איזה מהשאילתות SQL הבאות מחזירות בצורה נכונה שורות שבהן השם הוא "John"?
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    ב‑SQL, סימן השווה היחיד (`=`) משמש לבדיקות שוויון ב‑`WHERE`, ולא `==` או `===`, שהם אופרטורים של JavaScript.

    התחביר הנכון הוא `SELECT * FROM users WHERE name = 'John';`.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={1}
  group="יסודות SQL"
  title="פונקציית צבירה COUNT"
  options={[
    {text: 'סופר את כל השורות כולל ערכי NULL'},
    {text: 'סופר רק ערכים שאינם NULL בעמודה', isAnswer: true},
    {text: 'סופר ערכי NULL כערך יחיד ייחודי'},
    {text: 'מתייחס לכל ערך NULL כייחודי, כמו NaN !== NaN'},
  ]}
>
  <slot name="question">
  <div className="question">
    מה עושה `COUNT(column_name)` ב‑SQL?
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    `COUNT(column_name)` סופר את מספר הערכים שאינם NULL בעמודה שצוינה. כדי לספור את כל השורות, כולל NULL, השתמש ב‑`COUNT(*)`.

    ניתן גם להשתמש ב‑`COALESCE` כדי לוודא שערכי NULL יומרו לערך שאינו NULL. משהו כמו: `COUNT(COALESCE(column_name, 0))`.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={2}
  group="JOIN‑ים ב‑SQL"
  title="יסודות LEFT JOIN"
  options={[
    {text: 'מחזיר שורה אחת לכל שורה תואמת, מתעלם משורות ללא התאמה'},
    {text: 'מחזיר את כל השורות מהטבלה השמאלית, יחד עם השורות המתאימות מהטבלה הימנית', isAnswer: true},
    {text: 'מחזיר את כל השורות, תואמות או לא תואמות, כאשר NULL מצביע על חוסר התאמה'},
    {text: 'מחזיר את כל השורות מהטבלה הימנית, עם כל השורות המתאימות מהטבלה השמאלית'},
  ]}
>
  <slot name="question">
  <div className="question">
    מה עושה `LEFT JOIN` ב‑SQL?
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    `LEFT JOIN` מחזיר את כל השורות מהטבלה השמאלית ואת השורות המתאימות מהטבלה הימנית, כאשר שורות ללא התאמה בטבלה הימנית מקבלות NULL.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={3}
  group="צירופי SQL"
  title="שימוש ב-INNER JOIN"
  options={[
    {text: 'מחזיר שורות שלא תואמות משני הטבלאות'},
    {text: 'מחזיר את כל השורות משני הטבלאות, עם NULL לשורות שלא תואמות'},
    {text: 'מחזיר שורות שמקיימות את תנאי הצירוף בשתי הטבלאות', isAnswer: true},
    {text: 'מחזיר שורות שלא תואמות מהטבלה הימנית'},
  ]}
>
  <slot name="question">
  <div className="question">
    מה עושה `INNER JOIN` ב‑SQL?
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    `INNER JOIN` מחזיר שורות שבהן תנאי הצירוף תואם בין שתי הטבלאות. שורות שלא תואמות אינן נכללות בתוצאה.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={4}
  group="תת‑שאילתות SQL"
  title="תת‑שאילתת מקושרת"
  options={[
    {text: 'תת‑שאילתה שרצה פעם אחת בסך הכל'},
    {text: 'תת‑שאילתה המשמשת רק ב‑הצהרות JOIN'},
    {text: 'תת‑שאילתה שמחזירה רק עמודות מרובות'},
    {text: 'תת‑שאילתה שרצה פעם אחת עבור כל שורה בשאילתת החיצון', isAnswer: true},
  ]}
>
  <slot name="question">
  <div className="question">
    מהי תת‑שאילתת מקושרת ב‑SQL?
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    תת‑שאילתת מקושרת מוערכת פעם אחת לכל שורה של השאילתת החיצון. היא מתייחסת לעמודות מהשאילתה החיצונית, ולכן תלויה בכל שורה.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={5}
  group="CTE של SQL"
  title="תחביר WITH"
  options={[
    {text: 'מותר רק בפקודות DELETE'},
    {text: 'משמש לפונקציות צבירה'},
    {text: 'משמש רק להגדרת תצוגות'},
    {text: 'הגדרת קבוצת תוצאות זמנית לשימוש ב‑SQL מורכב יותר', isAnswer: true},
  ]}
>
  <slot name="question">
  <div className="question">
    מה המטרה של הסעיף `WITH` (ביטוי טבלה משותפת) ב‑SQL?
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    הסעיף `WITH`, או ביטוי טבלה משותפת (CTE), משמש להגדרת קבוצת תוצאות זמנית שניתן להתייחס אליה בתוך השאילתה הראשית. ב‑PostgreSQL, ניתן לצרף `WITH` לפקודות כמו `SELECT`, `INSERT`, `UPDATE`, `DELETE` או `MERGE`.

    זה יכול לשפר את קריאות ותחזוקת השאילתות המורכבות.

    התחביר הוא:
    ```sql
        WITH cte_name AS (
        SELECT column_name
        FROM table_name
        )
        SELECT *
        FROM cte_name;
    ```
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={6}
  group="יסודות SQL"
  title="IS NULL לעומת IS NOT NULL"
  options={[
    {text: 'בודק אם ערך הוא NULL', isAnswer: true},
    {text: 'בודק אם ערך ריק'},
    {text: 'בודק אם ערך הוא מחרוזת'},
    {text: 'בודק אם ערך הוא מספרי'},
  ]}
>
  <slot name="question">
  <div className="question">
    מה עושה האופרטור `IS NULL` ב‑SQL?
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    `IS NULL` בודק אם עמודה ספציפית מכילה ערך NULL. `IS NOT NULL` בודק את ההפך.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={7}
  group="אופרטורים ב‑SQL"
  title="שימוש באופרטור IN"
  options={[
    {text: 'מחזיר שורות ייחודיות'},
    {text: 'דורש עמודה עם אינדקס'},
    {text: 'חל רק על עמודות מספריות'},
    {text: 'מחזיר שורות שתואמות ערכים ברשימה מוגדרת', isAnswer: true},
  ]}
>
  <slot name="question">
  <div className="question">
    מה עושה אופרטור `IN` ב‑SQL?
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    האופרטור `IN` מסנן שורות כך שיתאימו לכל ערך ברשימה מוגדרת, לרוב כתחליף למספר תנאי OR.

    בעוד שהוא *יכול* להחזיר "שורות ייחודיות" (ולעתים כן), זה לא המטרה העיקרית שלו.

    אינדקס אינו נדרש כאן, אם כי זה בהחלט שגרה מומלצת להשתמש ב‑`IN` על עמודה עם אינדקס, עדיף אינדקס `UNIQUE`, מכיוון שזה יכול לשפר ביצועים.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={8}
  group="פונקציות SQL"
  title="שימוש בפונקציית COALESCE"
  options={[
    {text: 'סופר ערכי NULL'},
    {text: 'מחזיר את הארגומנט הלא‑NULL האחרון'},
    {text: 'מחזיר את הארגומנט הלא‑NULL הראשון', isAnswer: true},
    {text: 'מוגבל לעמודות IDENTITY'},
    {text: 'מקורו ב‑Printer Coalation'},
  ]}
>
  <slot name="question">
  <div className="question">
    מה עושה הפונקציה `COALESCE` ב‑SQL?
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    הפונקציה `COALESCE` מחזירה את הערך הלא‑NULL הראשון ברשימה שצוינה, והיא שימושית להחלפת ערכי ברירת מחדל כאשר נתקלות ב‑NULL.

    לדוגמה, `COALESCE(column_name, 0)` תחזיר `0` אם `column_name` הוא `NULL`.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={9}
  group="פונקציות צבירה ב-SQL"
  title="שימוש ב-GROUP BY"
  options={[
    {text: 'מסתיר כפילויות'},
    {text: 'משמש רק בצירופים'},
    {text: 'ממיין שורות בסדר עולה'},
    {text: 'מקבץ שורות לפי העמודה/עמודות שצוינו', isAnswer: true},
    {text: 'התחביר צריך להיות GROUP WITH/USING'},
  ]}
>
  <slot name="question">
  <div className="question">
    מה המטרה של הפקודה `GROUP BY` ב‑SQL?
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    הפקודה `GROUP BY` מקבצת שורות שיש להן ערכים זהים בעמודות שצוינו, ומאפשרת להחיל פונקציות צבירה על כל קבוצה.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={10}
  group="JOIN‑ים ב‑SQL"
  title="יסודות FULL OUTER JOIN"
  options={[
    {text: 'מחזיר רק שורות תואמות'},
    {text: 'מחזיר רק שורות עם ערכים שאינם NULL'},
    {text: 'מחזיר רק שורות לא תואמות מהטבלה השמאלית'},
    {text: 'מחזיר רק שורות לא תואמות מהטבלה הימנית'},
    {text: 'מחזיר את כל השורות משתי הטבלאות, עם NULLs לשורות שלא תואמות', isAnswer: true},
  ]}
>
  <slot name="question">
  <div className="question">
    מה עושה `FULL OUTER JOIN` ב‑SQL?
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    `FULL OUTER JOIN` מחזיר את כל השורות משתי הטבלאות, וממלא שורות שלא תואמות עם NULLs עבור ערכים חסרים.

    זה שימושי להשוואת שתי טבלאות ולמציאת ההבדלים ביניהן.
  </div>
  </slot>
</Challenge>

</QuizUI>
````
