# Translation Candidate
- Slug: semantic-vector-search-landscape
- Locale: he
- Model: openrouter/openai/gpt-oss-120b:nitro
- Target: src/content/posts/2026-05-01--semantic-vector-search-landscape/he/index.mdx
- Validation: deferred
- Runtime seconds: 7.87
- Input tokens: 12721
- Output tokens: 8341
- Thinking tokens: unknown
- Cached input tokens: 4864
- Cache write tokens: 0
- Estimated cost: $0.001997
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
title: חיפוש וקטורי סמנטי ונושאים נוספים לזכות בחברים ובאהבות
subTitle: 'הנוף המלא של החיפוש: מדויק, מעורפל, סמנטי, משולב — ומתי לשלב ביניהם.'
modified: '2026-05-04'
tags:
  - postgres
  - postgresql
  - pgvector
  - vector-search
  - semantic-search
  - hybrid-search
  - rag
  - ai
  - databases
  - search
  - embeddings
category: Code
subCategory: Databases
social_image: ../desktop-social.webp
cover_full_width: ../wide.webp
cover_mobile: ../square.webp
cover_icon: ../square.webp
---
החיפוש אינו דבר יחיד, והחיפוש הסמנטי אינו תחליף לשאר סוגי החיפוש.

„מצא משתמש עם המייל `dan@example.com`” ו‑„מצא לי מאמרים על ניפוי באגים כמהנדס חדש” משותפים רק בשם שהם חיפוש, אך כמעט ואין להם מה משותף מבחינת בעיות הנדסיות. הראשון מחזיר תשובה נכונה עם חיפוש באינדקס `O(log n)`. השני אינו בעל תשובה נכונה — רק רלוונטיות — ודורש הבנת השפה, הכוונה והמשמעות.

המהנדסים המשכנעים ביותר בהחלטות חיפוש — אלו שמנצחים את הוויכוחים ומשחררים את המערכת המתאימה — מבינים את כל הנוף. הם יודעים איזו כלי לשים לב אליו ולמה, ויכולים להסביר זאת בבירור.

מאמר זה מתמקד בשכבה הסמנטית: מה עושה חיפוש וקטורי בפועל, מתי הוא מנצח, ואיפה הוא צריך להישאר בצד. הגרסה המועילה אינה „להטביע הכל”. היא לדעת מתי וקטורים שייכים לצד חיפוש לקסיקלי, פוזי ו‑exact‑match בארכיטקטורה היברידית.

החלק הלכסיקלי והפוזי של התמונה — `tsvector`, `pg_trgm`, `pg_search` — נמצא במדריך [Postgres Text Searching Guide 2026](/postgres-text-search-guide).

---

## מונחים במבט מהיר

**Embedding** — רשימה צפופה של מספרים בנקודה צפה המיוצרת על‑ידי מודל, המייצגת קטע טקסט (או תמונה, אודיו, וכו') כנקודה במרחב בעל‑מימדים גבוהים. תוכן קשור סמנטית נוחל קרוב; תוכן בלתי קשור נוחל רחוק.

**חיפוש לקסיקלי** — חיפוש המבוסס על התאמה מדויקת של מילים וטוקנים. מהיר, דטרמיניסטי ונכון עבור מונחים ידועים. אינו מבין מילות נרדפות, פרפרזות או מקבילים בין‑שפתיים.

**חיפוש סמנטי** — חיפוש המבוסס על משמעות ולא על טוקנים. שאילתה כמו „איך אני מתמודד עם timeouts” יכולה להתאים למסמך שכותרתו „קונפיגורציית מדיניות ריטריי” ללא מילים משותפות, מכיוון שה‑embeddings שלהם קרובים גאומטרית.

**Vector** — רשימת מספרים. בהקשר של חיפוש, הפלט של מודל embedding. „חיפוש וקטורי” מוצא את הווקטורים הקרובים ביותר לווקטור השאילתה לפי מרחק גאומטרי.

**FTS (Full‑Text Search)** — חיפוש לקסיקלי מובנה של Postgres, המופעל על‑ידי `tsvector` / `tsquery`. מחלק, משורש ומאינדקס טקסט לשאילתות מילות‑מפתח. חזק עבור פרוזה וחיפוש מונחים מדויק; עיוור למובן.

**BM25** — אלגוריתם דירוג לחיפוש לקסיקלי (משמש ב‑Elasticsearch, Qdrant ואחרים). מדרג תוצאות לפי תדירות מונח משוקללת ביחס לנדירות המונח במאגר. טוב יותר מהתאמת מילות‑מפתח גולמית; עדיין לקסיקלי.

**HNSW (Hierarchical Navigable Small World)** — אינדקס ה‑approximate nearest‑neighbor הסטנדרטי לחיפוש וקטורי. בונה גרף שכבות קרבה לשאילתות דמיון מהירות עם ריקול גבוה. pgvector, Qdrant, Weaviate ורוב האחרים משתמשים בו.

**RRF (Reciprocal Rank Fusion)** — אלגוריתם למיזוג רשימות תוצאות מדורגות ממספר מערכות אחזור. משתמש רק במיקום הדירוג — ללא צורך בנרמול ציון. תוצאה שמדורגת גבוה גם ב‑FTS וגם ברשימת הווקטורים מקבלת ציון משולב חזק יותר מזו שמופיעה רק באחת מהן.

---

## מה עושה חיפוש סמנטי בפועל

ה‑embeddings של וקטורים ממירים טקסט (או תמונות, אודיו, וכו') לרשימת מספרים — נקודה במרחב בעל‑מימדים גבוהים. מודל embedding מאומן כך שהטקסט הסמנטית קשור יימצא קרוב במרחב הזה. „Dog” ו‑„canine” מסתיימים קרובים. „ריצה במרתון” ו‑„הרצת סקריפט פייתון” מסתיימים רחוקים למרות שמילה משותפת.

חיפוש דמיון במרחב זה מוצא מסמכים שה‑*משמעות* שלהם קרובה ביותר למשמעות של השאילתה, ללא תלות בחפיפה מדויקת של מילים.

זה אומר:
- „איך אני מגדיר timeout לבקשות?” יכול להתאים למאמר שכותרתו „הגדרת מגבלות חיבור ומדיניות נסיונות” — ללא מילות מפתח משותפות, רלוונטיות קונספטואלית גבוהה
- „משהו קל לערב קיץ” יכול להתאים להמלצת יין ללא מילות מפתח שמופיעות בתיאור המוצר
- שאילתה באנגלית יכולה להתאים למסמכים רלוונטיים בצרפתית, ספרדית או יפנית אם מודל ההטמעה אומן במצב רב‑לשוני

חיפוש לקסיקלי (`tsvector`, `pg_trgm`) לא יכול לעשות זאת. הוא פועל על מילים ותווים, לא על משמעות. הכלים אינם ניתנים להחלפה — הם פותרים בעיות שונות.

---

## מתי pgvector מנצח

**בניית RAG.** Retrieval‑Augmented Generation מאחזר את חלקי המסמך שהמשמעות שלהם קרובה ביותר לשאלת המשתמש, ואז מעביר אותם למודל שפה כהקשר. שלב האחזור הזה הוא פעולה וקטורית. FTS יפספס פרפרזים, נרדפים והתאמות קונספטואליות שקטע רלוונטי עשוי להביע בצורה שונה. היתרון של pgvector על פני חנות וקטורים נפרדת: הוא פועל בתוך מופע ה‑Postgres הקיים שלכם — ללא צורך בשירות נפרד לפריסה, תפעול או סינכרון נתונים.

**המשתמשים מתארים מה הם רוצים, לא מה לחפש.** „מאמרים על בניית ביטחון עצמי כמנהל חדש” אינם מכילים מילות מפתח שמופיעות באופן קבוע בפוסטים הרלוונטיים. „מסגרת קלה לטיפול בתופעות לוואי” עשויה לא להשתמש במילים המדויקות בתיעוד. חיפוש וקטורי תופס את הכוונה, לא את האיות.

**מציאת פריטים דומים.** מוצרים קשורים, כרטיסי תמיכה דומים, דוחות באגים משוכפלים, מאמרים שעשויים לעניין אותך. „מצא בעיות דומות לזו” הוא חיפוש קרוב‑שכן — הטמע את הפריט, מצא את השכנים הגאומטריים שלו. אזהרה חשובה: חיפוש וקטורי תמיד מחזיר תוצאות, גם כאשר אין דבר דומה באמת. למקרים של dedup והמלצות, סנן לפי סף מינימלי של דמיון (למשל, cosine similarity ≥ 0.80) כדי למנוע הצגת התאמות בעלות אמון נמוך כאילו הן משמעותיות.

**דדופליקציה סמנטית.** לפני אינדוקס תוכן ל‑RAG או חיפוש, לעתים קרובות יש לזהות קירוב‑שכפולים בקורפוס — מאמרים שעברו עריכה מרובה, כרטיסי תמיכה שהוגשו פעמיים, ערכי בסיס ידע שמצטלבים משמעותית. הטמע את המסמכים וסנן לפי סף cosine similarity כדי לסמן או למזג קירוב‑שכפולים לפני שהם מזהמים את האינדקס. פעולה זו מונעת שהאחזור יחזיר מספר חלקים כמעט זהים וידלל את חלון ההקשר.

**חיפוש רב‑לשוני.** מודלים רב‑לשוניים ממפים תוכן סמנטית שווה ערך בין שפות לווקטורים קרובים. שאילתה בספרדית עבור „perder peso” יכולה להתאים למאמר באנגלית על „הרגלי ירידה בת קיימא במשקל” — ללא טוקנים משותפים, עם משמעות בסיסית זהה. FTS דורש קונפיגורציית מילון לכל שפה ומטפל בשאילתות חוצות‑שפה בצורה גרועה. `pg_trgm` הוא בלתי תלוי בשפה אך אורטוגרפי, לא סמנטי.

### הקמת pgvector

מתקנת ההרחבה ועד שאילתת דמיון, ההגדרה היא כמה משפטי SQL:

```sql
CREATE EXTENSION IF NOT EXISTS vector;

ALTER TABLE documents ADD COLUMN embedding vector(1536);

-- HNSW הוא בדרך כלל האינדקס הראשון לנסות עבור מערכי נתונים בגודל בינוני
CREATE INDEX documents_embedding_idx
  ON documents USING hnsw (embedding vector_cosine_ops);

-- שאילתת חיפוש סמנטית
SELECT id, title, 1 - (embedding <=> $1::vector) AS similarity
FROM documents
ORDER BY embedding <=> $1::vector
LIMIT 10;
```

`<=>` הוא מרחק קוסינוס. `1 - cosine_distance` נותן דמיון קוסינוס (1.0 = זהה, 0.0 = אורטוגונלי). עבור `ivfflat` (החלופה הישנה, המהירה יותר לבנייה), השתמשו ב‑`lists = sqrt(row_count)` כהתחלה.

### מה pgvector לא מתמודד איתו היטב

- התאמת טוקן מדויקת — SKU של מוצר, קודי שגיאה, שמות פונקציות. `ORD-12345` אינו סמנטית דומה לשום דבר. חיפוש מבוסס הטמעה עשוי להחזיר `ORD-12344` או שום תוצאה רלוונטית. השתמשו ב‑FTS או באינדקס B‑tree.
- שמות ושמות עצם. מרחב ההטמעה מארגן לפי משמעות, לא לפי איות. רשומת המשתמש „Micheal Jordan” לא בהכרח תתמקם קרוב ל‑„Michael Jordan” במרחב הווקטורי.
- מחרוזות קצרות שבהן דמיון ברמת תו חשוב יותר מהמשמעות. `pg_trgm` מטפל בכך.
- שאילתות שבהן חייב להופיע המונח המדויק. BM25 ו‑FTS אמינים יותר להתאמת מונחים ידועים.

---

## חיפוש היברידי: המקרה לשניהם

תיעוד טכני הוא הדוגמה הברורה שבה אף כלי אינו מספיק לבדו.

משתמשים המחפשים “how to configure timeouts” זקוקים להתאמה מושגית: מאמר שכותרתו “Setting retry policies and connection limits” אינו חולק מילות מפתח משותפות, אך הוא בדיוק מה שהם צריכים.

המשתמשים האותם מחפשים גם `withRetry()`, `ECONNRESET`, ו‑`ERR_SOCKET_TIMEOUT`. מחרוזות מדויקות אלו חייבות להופיע — התאמה סמנטית לא תמיד תמצא אותן, וחיוב חיובי שגוי (דומה מושגית אך לא ה‑API הנכון) עלול להטעות.

חיפוש וקטורי מטפל בשאילתות המושגיות. FTS מטפל במונחים המדויקים. אף אחד מהם לא מצליח לשלב את שני הצרכים לבד.

הפתרון הוא חיפוש היברידי: להריץ את שניהם ולמזג את התוצאות.

### מיזוג דירוגים הדדי

**Reciprocal Rank Fusion (RRF)** הוא האלגוריתם הסטנדרטי לשילוב רשימות מדורגות ממערכות אחזור שונות. הוא אינו דורש נרמול ציון בין המערכות — הוא משתמש רק במיקומי הדירוג. תוצאה שמופיעה גבוה ב‑*שתי* הרשימות מקבלת ציון משולב חזק יותר מזו שמופיעה רק באחת.

```sql
WITH fts_results AS (
  SELECT id,
    ROW_NUMBER() OVER (ORDER BY ts_rank(search_vector, query) DESC) AS rank
  FROM documents, to_tsquery('english', $1) query
  WHERE search_vector @@ query
  LIMIT 50
),
vector_results AS (
  SELECT id,
    ROW_NUMBER() OVER (ORDER BY embedding <=> $2::vector) AS rank
  FROM documents
  ORDER BY embedding <=> $2::vector
  LIMIT 50
),
rrf AS (
  SELECT
    COALESCE(f.id, v.id) AS id,
    COALESCE(1.0 / (60 + f.rank), 0) +
    COALESCE(1.0 / (60 + v.rank), 0) AS rrf_score
  FROM fts_results f
  FULL OUTER JOIN vector_results v ON f.id = v.id
)
SELECT d.id, d.title, rrf.rrf_score
FROM rrf
JOIN documents d ON d.id = rrf.id
ORDER BY rrf_score DESC
LIMIT 10;
```

ה‑`60` במכנה הוא קבוע ה‑RRF. ערכים גבוהים מדכאים הבדלים במיקום דירוג; ערכים נמוכים מגבירים אותם. ברירת המחדל של 60 עובדת היטב ברוב סוגי התוכן.

RRF חוסך את הבעיה הקשה של נרמול `ts_rank` (ציון תדירות לוגריתמי) מול מרחק קוסינוס (מדד גאומטרי). שני המדדים אינם ניתנים להשוואה. RRF שואל רק: “כמה גבוה הופיעה תוצאה זו בכל רשימה?”

### חיפוש היברידי עם טריגרמים גם כן

בחיפוש שמוצג למשתמש על תוכן מעורב — שבו משתמשים עשויים לחפש שם של אדם, מושג, או מונח מדויק באותה סשן — מיזוג שלושה‑צדדים מטפל בכולם:

```sql
WITH trgm_results AS (
  SELECT id,
    ROW_NUMBER() OVER (ORDER BY similarity(title, $1) DESC) AS rank
  FROM documents
  WHERE title % $1
  LIMIT 50
),
fts_results AS (
  SELECT id,
    ROW_NUMBER() OVER (ORDER BY ts_rank(search_vector, to_tsquery('english', $1)) DESC) AS rank
  FROM documents
  WHERE search_vector @@ to_tsquery('english', $1)
  LIMIT 50
),
vector_results AS (
  SELECT id,
    ROW_NUMBER() OVER (ORDER BY embedding <=> $2::vector) AS rank
  FROM documents
  ORDER BY embedding <=> $2::vector
  LIMIT 50
),
rrf AS (
  SELECT
    COALESCE(t.id, f.id, v.id) AS id,
    COALESCE(1.0 / (60 + t.rank), 0) +
    COALESCE(1.0 / (60 + f.rank), 0) +
    COALESCE(1.0 / (60 + v.rank), 0) AS rrf_score
  FROM trgm_results t
  FULL OUTER JOIN fts_results f ON t.id = f.id
  FULL OUTER JOIN vector_results v ON COALESCE(t.id, f.id) = v.id
)
SELECT d.id, d.title, rrf.rrf_score
FROM rrf
JOIN documents d ON d.id = rrf.id
ORDER BY rrf_score DESC
LIMIT 10;
```

זה מטפל ב‑: התאמות שם מרוכזות (טריגרמים), התאמות מילות מפתח מדויקות (FTS), ושאילתות מושגיות (וקטור). תיבת חיפוש יחידה יכולה לשרת את שלושת כוונות המשתמש.

---

## ארכיטקטורות היברידיות מרובות‑שכבות

ביישומים אמיתיים נדיר שיש משטח חיפוש יחיד. בדרך כלל יש כמה משטחים, שלכל אחד צורך שונה:

| משטח | מה המשתמשים שואלים | שכבות מומלצות |
|---|---|---|
| חיפוש בבלוג / תיעוד | מילות מפתח + מושגים | FTS + pgvector (RRF) |
| חיפוש שם משתמש / לקוח | שמות עם שגיאות כתיב | `pg_trgm` |
| חיפוש מוצר | שמות, תיאורים, “דומה ל‑” | `pg_trgm` + FTS + pgvector |
| זיהוי כפילויות בטיקטים | “בעיות דומות לזו” | pgvector בלבד |
| חיפוש SKU/הזמנה פנימי | מזהים מדויקים | אינדקס B‑tree |
| RAG על בסיס ידע גדול | שאלות בשפה טבעית | pgvector (מסמכים מחולקים לחלקים) |
| “ייתכן שתאהב גם” באי‑קומרס | דמיון התנהגותי + סמנטי | pgvector |
| השלמת אוטומטית | קידומת, סובליות לאיות | `pg_trgm` |

אלו אינם תרחישים תיאורטיים. רוב היישומים העשירים בתוכן זקוקים לפחות לשני משטחים נפרדים עם צורות שאילתה שונות. הפיתוי הוא לבחור גישה אחת וליישמה בכל מקום — לרוב חיפוש וקטורי כעת, מכיוון שהוא נחשב למודרני. זה מוביל להטמעת אמבדינגים יקרים במקרים שבהם אינדקס טריגרמים היה מהיר, זול ונכון יותר.

### כלל אצבע

הוסיפו שכבה חדשה רק כאשר מופיע מצב כשל שהשכבה הקיימת אינה יכולה לתקן:

- משתמשים מתלוננים על טעויות כתיב שלא תואמות → הוסיפו `pg_trgm`
- משתמשים מחפשים לפי מושג ומפסידים תוצאות רלוונטיות → הוסיפו pgvector
- משתמשים מחפשים סמלים או קודים מדויקים ומקבלים תוצאות מושגיות במקום → הוסיפו FTS או בדקו אם אתם נשענים יותר מדי על חיפוש וקטורי
- השהייה הופכת לבעיה → העריכו סינון מקדים, אינדקסים משוערים, או חנות ייעודית

---

## אם אתם באמת צריכים חנות וקטורים ייעודית

pgvector מטפל בהרבה חיפושי אפליקציה לפני שתצטרכו מסד נתונים נוסף. החיתוך המשוער תלוי במספר הווקטורים, הגדרות האינדקס, קצב הכתיבה, סינונים, חומרה וקונקורנטיות, ולכן כל כלל “מתחת ל‑10M וקטורים” צריך להיחשב כהנחה התחלתית לביצוע מדידות, ולא כמגבלה מוצרית. כאשר אתם באמת חורגים ממנו — קונקורנטיות גבוהה מאוד, דרישות p99 נמוכות מאוד, מיליארדי וקטורים, או צורך בבידוד רב‑שוכר רציני — נוף החנויות הווקטוריות הייעודיות רחב ושווה להבנה.

### מה המשמעות של עמודות המטריצה

**חיפוש היברידי** משמעותו חיפוש מילות‑מפתח BM25 וחיפוש וקטורי מתבצע באותו שאילתה, ממוזג באמצעות RRF. ללא זאת, אתם בוחרים רק במצב חיפוש אחד או ממזגים שני שאילתות בעצמכם.

**ווקטורים מדוללים** הולכים מעבר ל‑BM25. וקטור SPLADE מדולל מכיל כ‑30,000 ממדים (אחד לכל מונח במילון), כ‑98 % אפסים. המיקומים הלא‑אפסיים מצביעים על המונחים החשובים וכמה משקל. שאילתה עבור “dogs” גם משקלת “canine” ו‑“pet” — דיוק ברמת BM25 בתוספת הרחבת מונחים בתוך אינדקס וקטורי. אם עמודה זו היא false, תצטרכו שכבת FTS נפרדת לשאילתות מונח‑מדויק.

```python
# SPLADE: ~30,000 dims, ~60 non-zero — only relevant vocabulary positions fire
def encode_splade(text: str) -> dict:
    tokens = tokenizer(text, return_tensors="pt", truncation=True, max_length=512)
    with torch.no_grad():
        output = model(**tokens)
    vec = torch.log1p(torch.relu(output.logits)).max(dim=1).values.squeeze()
    return {"indices": vec.nonzero().squeeze().tolist(), "values": vec[vec != 0].tolist()}
```

**SQL / SQL‑דומה** בעצם מתייחס לסינון. חיפוש וקטורי ללא סינון הוא רק הדגמה. עדיין נדרש תחום שוכר, טווחי תאריכים, הרשאות, וסינוני קטגוריות. SQL מלא (pgvector, LanceDB) מבטא זאת לצד הצטרפות קיימות. מסדי נתונים ייעודיים משתמשים באובייקטים JSON לסינון (Qdrant, Pinecone), DSL של שאילתות (Elasticsearch, Milvus), או GraphQL (Weaviate). הם עובדים; SQL נעשה מושך יותר ככל שהלוגיקה של הסינון מתסבכת.

```sql
-- pgvector: vector similarity is just another expression
SELECT id, title, 1 - (embedding <=> $1) AS score
FROM documents
WHERE tenant_id = $2
  AND category = ANY($3::text[])
  AND created_at > NOW() - INTERVAL '90 days'
ORDER BY embedding <=> $1
LIMIT 10;
```

```python
# Qdrant: equivalent filter as a Python object — same result, more ceremony
results = client.query_points(
    collection_name="documents", query=query_embedding,
    query_filter=models.Filter(must=[
        models.FieldCondition(key="tenant_id", match=models.MatchValue(value=tenant_id)),
        models.FieldCondition(key="category",  match=models.MatchAny(any=categories)),
        models.FieldCondition(key="created_at", range=models.DatetimeRange(gte=cutoff)),
    ]),
    limit=10,
)
```

**Multimodal native** משמעותו שהמסד משגר מודלי אמבדינג לתוכן שאינו טקסט. אתם נותנים לו כתובת תמונה גולמית; הוא מטפל בווקטוריזציה. רוב המסדים אינם תלויים באמבדינג — אתם מנהלים את צינור האמבדינג. Marqo ו‑Weaviate (דרך מודולי CLIP/ImageBind) סוגרים את הלולאה הזו.

```python
# Marqo: POST raw images, query with text — no external embedding step
mq.index("products").add_documents(
    [{"id": "shoe-001", "image": "https://cdn.example.com/shoes/001.jpg"}],
    tensor_fields=["image"]
)
results = mq.index("products").search(q="lightweight shoes for summer")
# Returns shoe-001 despite zero keyword overlap — CLIP handles the cross-modal match
```

**Disk‑based index** הוא גורם עלות. אינדקסי HNSW במטמון יכולים לדרוש כמה ג'יגה‑בייט RAM לכל מיליון וקטורים של 1536 ממדים, כשמתחשבים בווקטורים גולמיים, עומס גרף, ומטא‑דטה. אלטרנטיבות נייטיב‑דיסק (Milvus DiskANN, Elasticsearch DiskBBQ, פורמט Lance של LanceDB, שכבת האחסון של Turbopuffer) לעיתים מחליפות מעט זמן תגובה עבור עלות תשתית נמוכה יותר. בעומסי עבודה של RAG שבהם השהיית המודל כבר דומיננטית, פשרה זו שווה לרוב למדידה.

**Max dimensions** הוא מגבלה שמסתתרת בארכיטקטורה שלכם. `text-embedding-3-large` משתמש ב‑3072 ממדים, Jina v3 יכולה לשגר אמבדינגים גדולים יותר, ומודלים מחקריים ממשיכים לדחוף גבוה יותר. שירותים מנוהלים מפרסמים גבולות קשים לממדים; אחרים מציינים תקרות גבוהות או שאין תקרת פרקטית למודלים טיפוסיים. בדקו את התיעוד העדכני לפני שמתחייבים. בחרו משהו עם מרווח; מעבר לאינדקס וקטורי בגלל תקרת ממדים הוא ריצה כואבת.

### הנוף

| Database | Deployment | License | Hybrid Search | Sparse Vectors | SQL / SQL-like | Multimodal | Disk Index | Max Dims | Sweet Spot |
|---|---|---|---|---|---|---|---|---|---|
| **[pgvector](https://github.com/pgvector/pgvector)** | Self-host / managed (Supabase, Neon, RDS) | OSS (PostgreSQL) | Manual (RRF via SQL) | ❌ | ✅ Full SQL | ❌ | ✅ HNSW on disk | 16,000 storage; 2,000 indexed `vector` | Already on Postgres; moderate vector counts |
| **[Qdrant](https://github.com/qdrant/qdrant)** | Self-host / Cloud | Apache 2.0 | ✅ Native BM25 | ✅ Mature support | ❌ (REST/gRPC) | ❌ | ✅ | 65,535 | Filtered queries at scale; complex metadata |
| **[Weaviate](https://github.com/weaviate/weaviate)** | Self-host / Cloud | BSD 3 | ✅ Native BM25 + RRF | ✅ | ❌ (GraphQL / gRPC) | ✅ via modules | ✅ | 65,535 | GraphQL access patterns; built-in vectorization |
| **[Pinecone](https://www.pinecone.io/)** | Cloud only | Proprietary | ✅ (added 2024) | ✅ | ❌ | ❌ | ✅ (serverless) | 20,000 | Managed simplicity; no ops team |
| **[Milvus](https://github.com/milvus-io/milvus) / [Zilliz](https://zilliz.com/)** | Self-host / Cloud (Zilliz) | Apache 2.0 | ✅ Native | ✅ | ✅ SQL-like (Milvus Query Language) | ✅ | ✅ DiskANN | 32,768 | Billion-scale; enterprise on-prem |
| **[Chroma](https://github.com/chroma-core/chroma)** | Embedded / self-host | Apache 2.0 | ❌ | ❌ | ❌ | ❌ | ❌ | 65,535 | Local dev and prototyping only |
| **[LanceDB](https://github.com/lancedb/lancedb)** | Embedded / Cloud | Apache 2.0 | ✅ | ❌ | ✅ SQL via DataFusion | ✅ Native | ✅ (Lance format) | Unlimited | Edge / serverless; multimodal lakehouse |
| **[Orama](https://github.com/oramasearch/orama)** | Embedded / Cloud | Apache 2.0 | ✅ Full-text + vector | ❌ | ❌ | ❌ | ❌ | Varies | JS/edge apps; lightweight site/app search |
| **[Turbopuffer](https://turbopuffer.com/)** | Cloud only (serverless) | Proprietary | ✅ BM25 + vector | ❌ | ❌ | ❌ | ✅ (object storage) | 16,000 | Multi-tenant SaaS; millions of namespaces |
| **[Elasticsearch](https://github.com/elastic/elasticsearch)** | Self-host / Elastic Cloud | SSPL / AGPLv3 | ✅ RRF + ELSER sparse | ✅ (ELSER) | ✅ Query DSL | ❌ | ✅ DiskBBQ | 4,096 | Already on Elastic stack; hybrid enterprise search |
| **[OpenSearch](https://github.com/opensearch-project/OpenSearch)** | Self-host / AWS managed | Apache 2.0 | ✅ RRF + Neural Search | ✅ | ✅ Query DSL | ❌ | ✅ FAISS + HNSW | 16,000 | AWS-native; open-source Elastic alternative |
| **[Vespa](https://github.com/vespa-engine/vespa)** | Self-host / Cloud | Apache 2.0 | ✅ Native | ✅ Tensors / lexical ranking | ✅ YQL | ✅ Tensors | ✅ | Effectively unbounded | Search + ranking + recommendation systems |
| **[ClickHouse](https://github.com/ClickHouse/ClickHouse)** | Self-host / Cloud | Apache 2.0 | Manual | ❌ | ✅ Full SQL | ❌ | ✅ Columnar + HNSW | Varies | Analytics/logs with vector search beside OLAP |
| **[MongoDB Atlas](https://github.com/mongodb/mongo)** | Cloud / self-host | SSPL | ✅ Built-in | ❌ | ✅ MQL + aggregation | ❌ | ✅ HNSW | 8,192 | Already on MongoDB; document + vector in one |
| **[Redis (VSS)](https://github.com/redis/redis)** | Self-host / Redis Cloud | RSALv2 / SSPL | ✅ (RediSearch) | ✅ | ❌ | ❌ | ❌ RAM-only | 32,768 | Ultra-low latency; cache-layer vector search |
| **[Marqo](https://github.com/marqo-ai/marqo)** | Cloud / self-host | Apache 2.0 | ✅ | ❌ | ❌ | ✅ Native focus | ✅ | Varies | End-to-end multimodal: image + text + video |

### כמה דברים שלא מתאימים בטבלה

**ה‑multi‑tenancy של Turbopuffer** נבנה סביב ספירות מרובות של namespaces. המיצוב הציבורי והסיפורים של הלקוחות מדגישים עומסי עבודה כמו הקורפוס הגדול של Notion. אם לכל משתמש או ארגון נדרש חיפוש וקטורי מבודד, ארכיטקטורה זו יכולה לשנות את הכלכלה, אך עדיין יש למדוד את הצורה של השוכר שלכם.

**מצב משולב של LanceDB** הוא הקרוב ביותר ל‑“SQLite לחיפוש וקטורי”. הוא פועל בתהליך, לא דורש שרת, ועובד ב‑Lambda, Cloudflare Workers, וסביבות edge. פורמט Lance העמודתי מאפשר פעילות משולבת ברמת סקאלה אמיתית.

**Chroma חזק ביותר בפיתוח/בדיקה ובפריסות אפליקציות קטנות.** אם אתם מכוונים לקורפוסים גדולים מאוד, HA, פעילות דיסק‑כבדת, או חיפוש היברידי ברמה ראשונה, יש להעריך חנות ייצור לפני שמקפצים מהפרוטוטיפ לתשתית.

**Vespa הוא מה שאתם פונים אליו כשאחזור הוא רק חצי מהמוצר.** הוא משלב אחזור לקסיקלי, חיפוש שכנים קרובים, טנסורים, ביטויי דירוג, קיבוץ, והגשה מקוונת. הכוח הזה אמיתי, אך גם המורכבות התפעולית והמודלינגית. הוא מתאים יותר לצוותי חיפוש/המלצה מאשר ל‑“להוסיף חיפוש סמנטי לאפליקציית CRUD שלי”.

**ClickHouse שייך לשיחה כאשר החיפוש מצורף ל‑analytics.** אם מקור האמת שלך הוא אירועים, לוגים, טרייסים או מדדים, ClickHouse שומר מרחק וקטורי, סינון, צבירה, ו‑indexing מלא‑טקסט רציני בתוך מנוע SQL אחד. זה לא מסד נתונים וקטורי שנבנה במיוחד למטרה, אך לעיתים הוא הפתרון המשעמם‑הנכון לאחזור אנליטי.

**וקטורים מדוללים הם הדרך לקבל התאמת מילות‑מפתח ברמת BM25 בתוך אינדקס וקטורי** — ללא צורך במנוע טקסט מלא נפרד. Qdrant ו‑Elasticsearch מציעים כאן יישומים בוגרים במיוחד. אם חיפוש היברידי הוא קריטי וארכיטקטורה של שני מערכות היא מחסום, תמיכה בוקטורים מדוללים היא מה שיש לחפש.

### מתי לבחור אחרי ש‑pgvector כבר לא מספיק

- **מוצר SaaS עם בידוד לכל שוכר** → Turbopuffer  
- **סינון מטא‑דטה מורכב בקנה מידה** → Qdrant  
- **כבר על ערמת Elastic/ELK** → Elasticsearch עם DiskBBQ  
- **חנות AWS שרוצה קוד פתוח** → OpenSearch  
- **פלטפורמת חיפוש/המלצה עם דרישות דירוג רציניות** → Vespa  
- **Analytics, observability, חיפוש לוגים/אירועים** → ClickHouse  
- **קנה מידה של מיליארד‑על‑מיליארד on‑prem / self‑hosted** → Milvus  
- **Edge / serverless / multimodal** → LanceDB  
- **אפליקציית JS קטנה, אתר תיעוד, או חוויית חיפוש native‑edge** → Orama  
- **אפס תפעול, עלות משנית** → Pinecone  
- **Multimodal‑first (תמונות, וידאו, אודיו)** → Marqo  
- **כבר על MongoDB** → Atlas Vector Search  
- **כבר על Postgres, צריך יותר מקום** → Supabase Vector או Neon (שניהם pgvector מנוהלים, עם כלי עבודה משופרים)

---

## הדבר האחד שלא לעשות

אל תשתמשו בחיפוש וקטורי כחיפוש טקסטי מעורפל עבור דברים שיש להם תשובה נכונה.

„מצא לי את המשתמש עם האימייל `dan@example.com`” איננו בעיית חיפוש וקטורי. „מצא את ההזמנה עם מזהה `ORD-12345`” גם אינו. הטמעת `ORD-12345` וחיפוש לפי דמיון קוסינוס יחזיר *משהו* — אך ייתכן שזה יהיה שגוי. למזהה יש תשובה נכונה. התאמה משוערת למזהה היא באג.

חיפוש וקטורי מחזיר את הפריט *הדומה ביותר* במאגר שלך, אפילו כשאין דבר רלוונטי באמת. הוא לא יודע מתי אין תשובה טובה. זה מקובל עבור מסמכים קשורים. זה בעיה רצינית עבור חיפוש רשומה מדויק, שבו תשובה בטוחה שגויה גרועה יותר מתוצאה ריקה.

הדבר תקף גם בכיוון ההפוך: אל תשתמשו ב‑FTS לשאילתות שבהן המשתמש מתאר מושג. „מאמרים על קבלת החלטות קשות תחת אי‑ודאות” אינו מכיל מילות‑מפתח אמינות. FTS או יחזיר רעש או לא יחזיר דבר. השתמשו בכלי המתאים לצורת השאילתה.

---

## התמונה המלאה

רוב מערכות החיפוש בתפעול דורשות יותר משכבה אחת:

- **`pg_trgm`** לשמות, טעויות כתיב, השלמה אוטומטית  
- **FTS / `pg_search`** לחיפוש טקסט מבוסס מילות‑מפתח  
- **pgvector** לשאילתות סמנטיות וקונספטואליות  
- **RRF fusion** למשטחים שבהם משתמשים מערבבים סוגי שאילתות  
- **אינדקסים רגילים** למזהים מדויקים, סינונים, ורשימות ממוקדות

אלו אינם כלים מתחרים. הם משלים זה את זה. מערכת חיפוש בנויה היטב בוחרת את השכבה המתאימה לכל צורת שאילתה — וכאשר צורות השאילתה חופפות, היא מריצה כמה שכבות וממזגת את התוצאות.

הצוותים שמספקים תכונות חיפוש טובות מבינים את כל המערכת. אלו שלא, פונים למסד נתונים וקטורי, משקיעים הכל בטבעות, ותוהים מדוע חיפושי מזהים מדויקים לפעמים מחזירים רשומה שגויה.
````
