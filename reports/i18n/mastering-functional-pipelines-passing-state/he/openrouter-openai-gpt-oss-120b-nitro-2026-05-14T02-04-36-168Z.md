# Translation Candidate
- Slug: mastering-functional-pipelines-passing-state
- Locale: he
- Model: openrouter/openai/gpt-oss-120b:nitro
- Target: src/content/posts/2023-08-13--mastering-functional-pipelines-passing-state/he/index.mdx
- Validation: deferred
- Runtime seconds: 9.13
- Input tokens: 7664
- Output tokens: 2706
- Thinking tokens: unknown
- Cached input tokens: 3328
- Cache write tokens: 0
- Estimated cost: $0.000786
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
social_image: ../desktop-social.webp
title: 'מאסטר של צינורות: העברת מצב'
subTitle: 'שלום, Closure, ידידי הישן.'
date: '2023-08-09'
modified: '2024-07-30'
tags:
  - typescript
  - closure
  - stateful
  - scoping
  - hoisting
  - functional
  - pipeline
category: Guides
subCategory: JavaScript
cover: ../sven-kucinic-LxYxC6jdjcA-unsplash-cropped-1200.webp
cover_mobile: ../w300_sven-kucinic-LxYxC6jdjcA-unsplash-cropped-1200.webp
cover_icon: ../icon_sven-kucinic-LxYxC6jdjcA-unsplash-cropped-1200.webp
---
## מאסטר של צינורות: העברת מצב  

האם נתקלתם באתגרים של העברת מצב באמצעות צינורות פונקציונליים?  

הארגון (או חוסר הארגון) של הקוד שלכם משפיע ישירות על הקלות שבה מעבירים מצב סביב.  

במאמר זה נחקור טכניקה יעילה להעברת מצב דרך צינור. בדרך נשפר את הארגון והקריאות של הקוד שלנו.  

הקטע "אמיתי" הבא יהיה מוקד ההתמקדות שלנו: פונקציית קופה, שמקבלת `userId` ומערך של `products`. היא מחזירה שרשרת של הבטחות שמבצעת 4 פונקציות ברצף.  

```tsx
const checkout = (userId: number, products: number[]) => {
  return getProductsSubtotal(userId, products)
    .then(subTotal => applyTaxes(userId, subTotal))
    .then(total => purchaseProducts(userId, total))
    .then(result => sendReceipt(userId, result));
};
```

רגע, הקוד הזה די טוב, אם מדברים על צינורות ב‑JS!  

עם זאת, יש בו כמה בעיות עדינות שיכולות להתמזג לבעיות משמעותיות יותר.  

אחת הבעיות היא שאנחנו מעבירים שוב ושוב את `userId` לכל פונקציה (שקשורה לוגית).  
כעת, שלבו זאת עם בעיה נוספת שקל לפספס על ידי מפתחים וגם TypeScript: החלפת סדר הפרמטרים המספריים בקלות יוצרת באג שקט. (ראו `applyTaxes` ו‑`purchaseProducts`. _האם `userId` או `amount` צריך להיות ראשון?_)  

לפני שנחליט איך לשפר קוד זה, נזהה כמה יתרונות וחסרונות.  

### יתרונות וחסרונות

#### יתרונות

- שימוש טוב בסגירה! מעבירים את `userId` ו‑`products` פעם אחת בלבד!
- שמות ארגומנטים עקביים.
- הרכבה יחסית יעילה ותמציתית של 4 הפונקציות המרכזיות לתהליך הקנייה.
- שליטה “חינמית” בזרימת השגיאות. (שגיאות מתפשטות מכל פונקציה מקוננת, ומחזירות דחייה על ה‑Promise שמוחזר על‑ידי `checkout()`.)

#### חסרונות

- העברת `userId` שוב ושוב מעייפת.
- הפונקציות אינן חד‑פרמטריות (כלומר unary). _זה פוגע ברכיביות. ראו את [הדוגמה הסופית](#checkout-with-further-improvements) למה זה חשוב._
- קשה להבין מה מחזירה כל פונקציה. (האם זה תוצאת שליחת האימייל, או שה‑`result` var? או מה?)
- לא ברור איך להוסיף תכונות (למשל, נניח שאנחנו צריכים לטעון הנחה/אשראי/נקודות של הלקוח וכו’).
- לעיתים שמות פרמטרים “זמניים” (כמו בכל `.then(param => {})`) מוסיפים הקשר. עם הזמן, סביר שהם יהפכו למזבל של שמות.

### פתרון, חלק 1: ליצור מודול!

טכניקה זו מתמקדת בארגון הפונקציות הקשורות למודול יחיד (למשל `CartHelpers`). היא אינה מחייבת תבנית ספציפית. חקרו [פונקציות יצרן](#carthelpers-factory), [מחלקות](#carthelpers-class), סגירות, מיקסינים ועוד. מצאו מה שמתאים לפרויקט ולצוות שלכם.

#### CartHelpers Factory

דוגמה למודול `CartHelpers`, שבו `userId` מועבר פעם אחת, וכל השיטות מקבלות ארגומנט יחיד.

```tsx
const CartHelpers = (userId: number) => {
  return {
    getProductsSubtotal: products => getProductsSubtotal(userId, products),
    applyTaxes: subTotal => applyTaxes(userId, subTotal),
    purchaseProducts: total => purchaseProducts(userId, total),
    sendReceipt: invoice => sendReceipt(userId, invoice)
  };
};
```

#### CartHelpers Class

אם מחלקות הן הסגנון שלכם, זה קל להתאים:

```tsx
class CartHelpers {
  constructor(userId) {
    this.userId = userId;
  }
  getProductsSubtotal = products => getProductsSubtotal(this.userId, products);
  applyTaxes = subTotal => applyTaxes(this.userId, subTotal);
  purchaseProducts = total => purchaseProducts(this.userId, total);
  sendReceipt = invoice => sendReceipt(this.userId, invoice);
}
```

כמה יתרונות מיידיים:

- מבטלים העברת משתנים חוזרת.
  - DRY: `CartHelpers` מסיר את הצורך להעביר כל פעם את `userId`.
  - כל מתודה מקבלת **רק** את הפרמטרים הנחוצים. קריאת `cart.applyTaxes(subTotal)` הופכת לגוררת וברורה.
- פונקציות עם ארגומנט יחיד ב‑`CartHelpers` קריאות יותר, עם מטרה מוגדרת.

על‑ידי קיבוץ הפונקציות הקשורות, אנחנו יוצרים הזדמנות לצמצם את שטח החשיפה (למשל `checkout()`, המתודות „ציבוריות” של `CartHelpers`).

> שטח חשיפה קטן === עומס קוגניטיבי קטן יותר, בדיקות ותחזוקה משופרות.  
> _מערכות עיצוב עם כוונה ומיקוד. ✨_

#### שימוש ב‑Checkout וב‑CartHelpers

בואו נסתכל איך הפונקציה `checkout()` נראית עכשיו:

```tsx
export const checkout = ({ userId, products }) => {
  const cart = CartHelpers(userId);

  return Promise.resolve(products)
    .then(products => cart.getProductsSubtotal(products))
    .then(subTotal => cart.applyTaxes(subTotal))
    .then(total => cart.purchaseProducts(total))
    .then(result => cart.sendReceipt(result));
};
```

##### Checkout עם שיפורים נוספים

> האם אפשר לשפר עוד? כן! אין צורך לחזור על ארגומנטים בכלל!

כאשר ארגומנטים של פונקציות מתקבלים מפלט של פונקציות קודמות, אפשר לפשט את הקוד עוד יותר.

```tsx
export const checkout = ({ userId, products }) => {
  const cart = CartHelpers(userId);

  // 🌈 פונקציות נצברות כמו לגו וקוראות כמו "מילים אנושיות" רגילות! 💅
  return Promise.resolve(products)
    .then(cart.getProductsSubtotal)
    .then(cart.applyTaxes)
    .then(cart.purchaseProducts)
    .then(cart.sendReceipt);
};
```

**אם זה מרגיש לא טבעי לשלב פרמטרים לארגומנט (אובייקט) יחיד,** שקלו לפרק את הפונקציות **או** לשלב אותן במודולים ממוקדים יותר.

#### מאיפה להתחיל?

חפשו פונקציות קשורות וקבצו אותן יחד (למשל `CartHelpers`).

חלק מהאתגר במציאת מודולים לוגיים אפשריים הוא לזהות קוד קשור כבר מההתחלה.

##### מה עושה פונקציות קשורות?

טריק חכם: מצאו חזרתיות בפרמטרים של הפונקציות. שאלו האם יש קשר קיים? או אחריות בסיסית?

- ✅ פונקציות עם ארגומנטים חוזרים ונפוצים. (לדוגמה, אם 4 שיטות מקבלות `userRewards`, סביר להניח שאתם צריכים מודול `Rewards` או מודול אחר.)
- ✅ פונקציות שהארגומנטים שלהן מתקבלים ישירות מתוצאת של פונקציות קודמות. (רצפי של שלבים, לדוגמה `Extract`, `Transform`, `Load`.)
- ❌ כל דבר שמקושר באופן מעורפל לאזור הפיצ'ר, “רכישת מוצר?”
- ❌ פונקציות עם קידומת או סיומת משותפת בשם?
- ❌ פונקציות הדורשות אובייקטים גדולים כארגומנטים, למרות שהן משתמשות רק במעט ערכים מתוך האובייקט(ים). (לדוגמה `applyTaxes({ user, business, rewards, kitchenSink })` מול `applyTaxes({ subTotal })`)

אין תשובה “נכונה” יחידה לתכנון מודולים, אבל עוזר לזהות 2‑3 אפשרויות לארגון – שרטטו מתווה, כתבו קוד “פנטזיה”, שאלו “האם זה מעורר שמחה?”

<aside>
📌 לרוב נדרשות כמה ניסיונות בארגון מודולים לפני שמודל התחום שלכם מתגבש. אל תתייאשו לנסות להגיע למושלם מיד.
</aside>

> ייתכן ש‑`cart.sendReceipt()` לא מרגיש שייך לשיטות הקשורות לתשלום. אולי `customerNotifications.sendReceipt()` הוא בית טוב יותר להודעות ללקוח. אם `CartHelper` הוא בעל חשיבות גבוהה, הוא יכול לשמש **_בקר_** פנימי שמקרא לכל ה**_שירותים_** הדרושים, כמו `customerNotifications`.

#### איך יודעים אם אתם משפרים?

אם הקריאות לא נפגעת כשאתם מסירים ארגומנטים אד‑הוק, **מזל טוב!!!** סביר להניח שבניתם מודול בעל תחום ברור ועמיד!

- הסרת ארגומנטים ביניים גורמת באופן טבעי לשכבות לצוץ.
- זה _צריך_ להיות קשה לזרוק קוד אד‑הוק למקום הלא נכון!

זה מוביל לשאלה, איפה מוסיפים פונקציונליות?

בנסיוני ישנן 2 אסטרטגיות ראשיות לשקול כשמוסיפים פונקציונליות:

1.  להרחיב/לרפקטור שיטה קיימת. (כאשר הקוד החדש קרוב מספיק לקוד הקיים.)
2.  ליצור פונקציה (חמישית) חדשה במקום הרצוי בשרשרת. (בהנחה שהקוד החדש אינו קשור לפונקציות הקיימות.)

בסופו של דבר זה מקל על החלטה היכן הפונקציונליות החדשה שייכת. (למשל `cart.applyDiscounts()`, `cart.applyTaxes()`, `rewards.getBalance()`.)

### סיכום

העברת מצב דרך צינור מורכב יכולה להיות מסובכת. עם קצת תרגול רפקטור, תגלו שאתם כותבים קוד קריא יותר, עם עומס קוגניטיבי נמוך יותר.

שאלות? תגובות? חששות? אל תהססו ליצור קשר עם [@justsml](https://x.com/justsml) או ב[דוא"ל](mailto:dan@danlevy.net).

#### הישארו מעודכנים לחלק הבא בסדרה

נחקור חיצון של המצב והרחבת הפונקציונליות במודול שלנו!

#### קריאה קשורה

- [קיימים מאבקים דומים בעולם React המונחה רכיבים.](https://kyleshevlin.com/quit-your-yapping)
````
