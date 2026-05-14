# Translation Candidate
- Slug: quiz-nodejs-files-streams-buffers-oh-my
- Locale: he
- Model: openrouter/deepseek/deepseek-v4-flash
- Target: src/content/posts/2024-11-15--quiz-nodejs-files-streams-buffers-oh-my/he/index.mdx
- Validation: deferred
- Runtime seconds: 140.08
- Input tokens: 14598
- Output tokens: 20324
- Thinking tokens: unknown
- Cached input tokens: 1664
- Cache write tokens: 0
- Estimated cost: $0.007675
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
unlisted: false
title: 'חידון: שליטה ב-IO של NodeJS'
subTitle: 'בחן את הידע שלך על קבצים, זרמים ומאגרים'
label: NodeJS
social_image: ../desktop-social.webp
category: Quiz
subCategory: NodeJS
date: '2024-11-15'
modified: '2024-11-15'
tags:
  - quiz
  - nodejs
  - io
  - streams
  - buffers
  - filesystem
  - intermediate
cover_full_width: ../data-streaming-wide.webp
cover_mobile: ../data-streaming-square.webp
cover_icon: ../data-streaming-square.webp
---
---
import Challenge from '../../../../components/QuizUI/Challenge';
import QuizUI from '../../../../components/QuizUI/QuizUI';

<p class="inset">מוכן לצלול לעולם ה-IO של NodeJS? 🌊</p>

החידון הזה יבחן את ההבנה שלך בפעולות ה-IO של Node, החל מפעולות בסיסיות של מערכת הקבצים ועד למושגים מתקדמים של סטרימינג. נכסה באפרים, קידודים ושיטות עבודה מומלצות לטיפול יעיל בנתונים.

בוא נראה עד כמה אתה מכיר את הזרמים והבאפרים שלך! 🚀

<QuizUI>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={0}
  group="חימום: Buffers"
  title="הקצאת Buffer"
  options={[
    {text: 'יוצר Buffer בגודל 5 עם אפסים', isAnswer: true},
    {text: 'יוצר Buffer בגודל 5 עם נתונים אקראיים'},
    {text: 'זורק שגיאה'},
    {text: 'יוצר Buffer ריק'},
  ]}
>
  <slot name="question">
  <div className="question">
    מה הקוד הזה עושה?
    ```js
        const buf = Buffer.alloc(5);
        console.log(buf);
    ```
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    `Buffer.alloc(size)` יוצר Buffer חדש בגודל שצוין ומלא באפסים.
    הפלט יהיה: `<Buffer 00 00 00 00 00>`

    אם ברצונך ליצור Buffer עם נתונים אקראיים, השתמש ב-`Buffer.allocUnsafe(5)`.

    [למידע נוסף על הקצאת Buffer](https://nodejs.org/api/buffer.html#static-method-bufferalloc)
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={1}
  group="חימום: Buffers"
  title="המרת Buffer למחרוזת"
  options={[
    {text: 'A', isAnswer: true},
    {text: '65'},
    {text: '[Object object]'},
    {text: 'Undefined'},
    {text: 'Binary data'},
  ]}
>
  <slot name="question">
  <div className="question">
    מה יודפס?
    ```js
        const buf = Buffer.from([65]);
        console.log(buf.toString());
    ```
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    המספרים במערך מייצגים קודי ASCII:

    - 65: 'A'

    `toString()` ממיר את הבתים האלה לייצוג מחרוזתי באמצעות קידוד UTF-8 כברירת מחדל.

    [למד עוד על קידוד Buffer](https://nodejs.org/api/buffer.html#buffers-and-character-encodings)
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={2}
  group="חימום: מערכת קבצים"
  title="פעולות קבצים אסינכרוניות"
  options={[
    {text: 'מדפיס תוכן הקובץ ואז "Done"'},
    {text: 'מדפיס "Done" ואז תוכן הקובץ', isAnswer: true},
    {text: 'מדפיס רק תוכן הקובץ'},
    {text: 'זורק שגיאה'},
  ]}
>
  <slot name="question">
  <div className="question">
    מה סדר הפלט?
    ```js
        import fs from 'fs';
        fs.readFile('test.txt', 'utf8', (err, data) => {
          console.log(data);
        });
        console.log('Done');
    ```
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    מכיוון ש-`readFile` הוא אסינכרוני, הקוד ממשיך להתבצע בזמן שהקובץ נקרא.
    לכן, "Done" יודפס לפני תוכן הקובץ.

    כדי לחכות שהקובץ ייקרא קודם, תוכל להשתמש בגרסה מבוססת Promise:
    ```js
        import { promises as fs } from 'fs';
    
        async function read() {
          const data = await fs.readFile('test.txt', 'utf8');
          console.log(data);
          console.log('Done');
        }
    ```
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={3}
  group="יסודות מערכת הקבצים"
  title="קריאת קבצים באופן סינכרוני"
  options={[
    {text: 'מחזיר Buffer', isAnswer: true},
    {text: 'מחזיר מחרוזת'},
    {text: 'מחזיר undefined'},
    {text: 'מחזיר Promise'},
  ]}
>
  <slot name="question">
  <div className="question">
    מה `fs.readFileSync()` מחזיר כברירת מחדל?
    ```js
        import fs from 'fs';
        const content = fs.readFileSync('test.txt');
    ```
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    `fs.readFileSync()` מחזיר Buffer כברירת מחדל כאשר לא צוין קידוד. אם אתה רוצה מחרוזת, עליך לבצע אחת מהאפשרויות הבאות:
    1. לציין קידוד: `fs.readFileSync('test.txt', 'utf8')`
    2. להמיר את ה-Buffer: `content.toString()`

    [למידע נוסף על fs.readFileSync במסמכי Node.js](https://nodejs.org/api/fs.html#fsreadfilesyncpath-options)
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={4}
  group="זרמים"
  title="אירועי Stream"
  options={[
    {text: '\'data\', \'end\', \'error\', \'close\'', isAnswer: true},
    {text: '\'finish\', \'drain\', \'pipe\''},
    {text: '\'read\', \'write\', \'end\''},
    {text: '\'open\', \'close\', \'data\''},
  ]}
>
  <slot name="question">
  <div className="question">
    איזו קבוצת אירועים נפוצה בשימוש עם זרמי Readable?
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    זרמי Readable פולטים מספר אירועים חשובים:
    - 'data': כאשר נתונים זמינים לקריאה
    - 'end': כאשר אין עוד נתונים לקריאה
    - 'error': כאשר מתרחשת שגיאה
    - 'close': כאשר הזרם והמשאב הבסיסי נסגרו
    ```js
        const readable = fs.createReadStream('file.txt');
        readable.on('data', chunk => console.log(chunk));
        readable.on('end', () => console.log('Done!'));
    ```
    [למד עוד על אירועי Stream](https://nodejs.org/api/stream.html#class-streamreadable)
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={5}
  group="זרמים"
  title="צנרת זרמים"
  options={[
    {text: 'מעתיק קובץ עם דחיסה'},
    {text: 'מעתיק קובץ ללא חציצה בזיכרון', isAnswer: true},
    {text: 'טוען את כל הקובץ לזיכרון'},
    {text: 'יוצר קישור סימבולי'},
  ]}
>
  <slot name="question">
  <div className="question">
    מה הקוד הזה עושה?
    ```js
        import fs from 'fs';
        const readable = fs.createReadStream('source.txt');
        const writable = fs.createWriteStream('dest.txt');
        readable.pipe(writable);
    ```
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    `pipe()` מחבר זרם קריא לזרם בר-כתיבה, מנהל אוטומטית לחץ אחורי (backpressure) ומעתיק נתונים בנתחים מבלי לטעון את כל הקובץ לזיכרון.

    זה חסכוני בזיכרון עבור קבצים גדולים בהשוואה ל-`fs.readFile()` ואחריו `fs.writeFile()`.

    [למד עוד על pipe()](https://nodejs.org/api/stream.html#readablepipedestination-options)
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={6}
  group="מערכת קבצים"
  title="פעולות תיקייה"
  options={[
    {text: 'יוצר תיקיות משנה במידת הצורך', isAnswer: true},
    {text: 'יוצר רק את התיקייה האחרונה'},
    {text: 'זורק שגיאה'},
    {text: 'יוצר קישורים סימבוליים'},
  ]}
>
  <slot name="question">
  <div className="question">
    מה עושה האופציה recursive?
    ```js
        import fs from 'fs';
        fs.mkdirSync('./a/b/c', { recursive: true });
    ```
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    האופציה `recursive: true` יוצרת תיקיות אב אם הן לא קיימות.
    ללא אופציה זו, ניסיון ליצור './a/b/c' יזרוק שגיאה אם './a' או './a/b' לא קיימים.

    זה דומה לפקודת shell `mkdir -p`.

    [למד עוד על mkdir](https://nodejs.org/api/fs.html#fsmkdirsyncpath-options)
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={7}
  group="זרמים"
  title="זרמי טרנספורמציה"
  options={[
    {text: 'hello world'},
    {text: 'HELLO WORLD', isAnswer: true},
    {text: 'Error'},
    {text: 'undefined'},
  ]}
>
  <slot name="question">
  <div className="question">
    מה הפלט?
    ```js
        import { Transform } from 'stream';
        const upperCase = new Transform({
          transform(chunk, encoding, callback) {
            callback(null, chunk.toString().toUpperCase());
          }
        });
        process.stdin
          .pipe(upperCase)
          .pipe(process.stdout);
        // Input: "hello world"
    ```
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    זרמי טרנספורמציה משנים את הנתונים כשהם עוברים דרכם. כאן, כל נתח (chunk):
    1. מומר למחרוזת
    2. מומר לאותיות גדולות
    3. מועבר ל-stdout

    זה יוצר צינור (pipeline) שהופך את כל הקלט לאותיות גדולות.

    [למידע נוסף על זרמי טרנספורמציה](https://nodejs.org/api/stream.html#class-streamtransform)
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={8}
  group="מערכת קבצים"
  title="צפייה בקבצים"
  options={[
    {text: 'פעם אחת לכל שינוי בקובץ'},
    {text: 'לא מובטח; עלול להיפתח מספר פעמים', isAnswer: true},
    {text: 'אף פעם'},
    {text: 'רק בעת מחיקת קובץ'},
  ]}
>
  <slot name="question">
  <div className="question">
    כמה פעמים מובטח ש-`fs.watch()` יופעל כאשר קובץ משתנה?
    ```js
        import fs from 'fs';
        fs.watch('test.txt', (eventType, filename) => {
          console.log(`${filename} was changed`);
        });
        // Then modify test.txt once
    ```
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    `fs.watch()` אינו מובטח להיפתח בדיוק פעם אחת לכל שינוי לוגי בקובץ. לעתים קרובות הוא מופעל מספר פעמים מכיוון שעורכי טקסט רבים:
    1. שומרים לקובץ זמני
    2. משנים את שמו לקובץ היעד

    לצפייה אמינה יותר, שקול להשתמש ב:
    - החבילה `chokidar`
    - דיבואונס (debouncing) של הקריאה החוזרת
    - שימוש ב-`fs.watchFile()` (אם כי זה פחות יעיל)

    [למידע נוסף על fs.watch()](https://nodejs.org/api/fs.html#fswatchfilename-options-listener)
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={9}
  group="Buffers"
  title="השוואת Buffer"
  options={[
    {text: 'true'},
    {text: 'false', isAnswer: true},
    {text: 'undefined'},
    {text: 'Error'},
  ]}
>
  <slot name="question">
  <div className="question">
    מה הפלט?
    ```js
        const buf1 = Buffer.from('Hello');
        const buf2 = Buffer.from('Hello');
        console.log(buf1 === buf2);
    ```
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    Buffers מושווים לפי הפניה, לא לפי ערך. למרות שהם מכילים את אותם נתונים, הם אובייקטים שונים.

    כדי להשוות תוכן של Buffer, השתמש ב:
    ```js
        buf1.equals(buf2)  // true
        // or
        Buffer.compare(buf1, buf2) === 0  // true
    ```
    [למד עוד על השוואת Buffer](https://nodejs.org/api/buffer.html#bufequalsotherbuffer)
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={10}
  group="זרמים"
  title="Backpressure בזרמים"
  options={[
    {text: 'מונע גלישת זיכרון', isAnswer: true},
    {text: 'מגביר מהירות קריאה'},
    {text: 'דוחס נתונים'},
    {text: 'מצפין נתונים'},
  ]}
>
  <slot name="question">
  <div className="question">
    מה המטרה העיקרית של backpressure בזרמים?
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    Backpressure הוא מנגנון שמונע גלישת זיכרון על ידי השהיית הקריאה כאשר צד הכתיבה לא יכול לעמוד בקצב.

    דוגמה ל-backpressure ידני:
    ```js
        readable.on('data', (chunk) => {
          const canContinue = writable.write(chunk);
          if (!canContinue) {
            readable.pause();
            writable.once('drain', () => readable.resume());
          }
        });
    ```
    `pipe()` מטפל בזה אוטומטית!

    [למד עוד על backpressure](https://nodejs.org/en/learn/modules/backpressuring-in-streams#backpressuring-in-streams)
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={11}
  group="מערכת קבצים"
  title="קישורים סימבוליים"
  options={[
    {text: 'יוצר קישור קשיח'},
    {text: 'יוצר עותק'},
    {text: 'יוצר קישור סימבולי', isAnswer: true},
    {text: 'מעביר את הקובץ'},
  ]}
>
  <slot name="question">
  <div className="question">
    מה הקוד הזה עושה?
    ```js
        import fs from 'fs';
        fs.symlinkSync('target.txt', 'link.txt');
    ```
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    `symlinkSync` יוצר קישור סימבולי (כמו קיצור דרך) לקובץ היעד.

    הבדלים עיקריים מקישורים קשיחים:
    - יכול לקשר לתיקיות
    - יכול לחצות מערכות קבצים
    - נשבר אם היעד נמחק

    כדי ליצור קישור קשיח במקום:
    ```js
        fs.linkSync('target.txt', 'hardlink.txt');
    ```
    [למד עוד על קישורים סימבוליים](https://nodejs.org/api/fs.html#fssymlinksync-target-path-type)
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={12}
  group="זרמים"
  title="מצבי זרם"
  options={[
    {text: 'מצב בינארי בלבד'},
    {text: 'מצב אובייקט בלבד'},
    {text: 'שני המצבים', isAnswer: true},
    {text: 'אף מצב'},
    {text: 'מצבי קלט ופלט'},
    {text: 'מצבי קריאה וכתיבה'},
  ]}
>
  <slot name="question">
  <div className="question">
    באילו מצבים יכולים לפעול זרמי Node.js?
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    זרמים יכולים לפעול ב:
    1. מצב בינארי (ברירת מחדל): עבור buffers ומחרוזות
    2. מצב אובייקט: עבור כל ערך JavaScript

    דוגמה למצב אובייקט:
    ```js
        import { Transform } from 'stream';
        const objectStream = new Transform({
          objectMode: true,
          transform(chunk, encoding, callback) {
            callback(null, { value: chunk });
          }
        });
    ```
    [למידע נוסף על מצבי זרם](https://nodejs.org/api/stream.html#object-mode)
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={13}
  group="מערכת קבצים"
  title="מתארי קבצים"
  options={[
    {text: 'מספר', isAnswer: true},
    {text: 'מחרוזת'},
    {text: 'אובייקט'},
    {text: 'בופר'},
  ]}
>
  <slot name="question">
  <div className="question">
    איזה סוג הוא הפרמטר `fd` בקולבק הזה?
    ```js
        import fs from 'fs';
        fs.open('test.txt', 'r', (err, fd) => {
          console.log(typeof fd);
        });
    ```
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    מתארי קבצים הם מספרים המזהים באופן ייחודי קבצים פתוחים במערכת ההפעלה.

    שלושת מתארי הקבצים הראשונים שמורים:
    - 0: stdin
    - 1: stdout
    - 2: stderr

    תמיד זכור לסגור מתארי קבצים:
    ```js
        fs.close(fd, (err) => {
          if (err) throw err;
        });
    ```
    [למד עוד על מתארי קבצים](https://nodejs.org/api/fs.html#file-descriptors)
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={14}
  group="קידוד"
  title="קידוד Buffer"
  options={[
    {text: '3'},
    {text: '4'},
    {text: '6'},
    {text: '8'},
    {text: '10', isAnswer: true},
  ]}
>
  <slot name="question">
  <div className="question">
    כמה בתים יתפוס המחרוזת הזו ב-UTF-8?
    ```js
        const str = "Hello 🌍";
        const buf = Buffer.from(str);
        console.log(buf.length);
    ```
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    ב-UTF-8:
    - תווים ASCII (כמו 'Hello ') תופסים בית אחד כל אחד
    - האימוג'י של כדור הארץ 🌍 תופס 4 בתים

    אז: 5 (Hello) + 1 (רווח) + 4 (🌍) = 10 בתים

    כדי לראות את הבתים:
    ```js
        console.log(buf);  // <Buffer 48 65 6c 6c 6f 20 f0 9f 8c 8d>
    ```
    [למד עוד על קידוד UTF-8](https://nodejs.org/api/buffer.html#buffers-and-character-encodings)
  </div>
  </slot>
</Challenge>

</QuizUI>

אני מקווה שנהניתם לבדוק את הידע שלכם ב-NodeJS IO! רוצים עוד? בדקו את [אוסף החידונים](../challenges/) שלי לאתגרים נוספים!
````
