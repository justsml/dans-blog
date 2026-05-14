# Translation Candidate
- Slug: quiz-nodejs-files-streams-buffers-oh-my
- Locale: ar
- Model: openrouter/deepseek/deepseek-v4-flash
- Target: src/content/posts/2024-11-15--quiz-nodejs-files-streams-buffers-oh-my/ar/index.mdx
- Validation: deferred
- Runtime seconds: 225.31
- Input tokens: 14615
- Output tokens: 25105
- Thinking tokens: unknown
- Cached input tokens: 1280
- Cache write tokens: 0
- Estimated cost: $0.009191
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
unlisted: false
title: 'اختبار: إتقان NodeJS IO'
subTitle: اختبر معرفتك بالملفات والتدفقات والمخازن المؤقتة
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
import Challenge from '../../../../components/QuizUI/Challenge';
import QuizUI from '../../../../components/QuizUI/QuizUI';

<p class="inset">جاهز للغوص في عالم الإدخال/الإخراج في NodeJS؟ 🌊</p>

سيختبر هذا الاختبار فهمك لعمليات الإدخال/الإخراج في Node، من عمليات نظام الملفات الأساسية إلى مفاهيم التدفق المتقدمة. سنغطي المخازن المؤقتة (buffers)، الترميز (encoding)، وأفضل الممارسات للتعامل مع البيانات بكفاءة.

لنرى مدى معرفتك بالتدفقات (streams) مقابل المخازن المؤقتة (buffers)! 🚀

<QuizUI>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={0}
  group="إحماء: Buffers"
  title="تخصيص Buffer"
  options={[
    {text: 'ينشئ Buffer بحجم 5 مع أصفار', isAnswer: true},
    {text: 'ينشئ Buffer بحجم 5 مع بيانات عشوائية'},
    {text: 'يرمي خطأ'},
    {text: 'ينشئ Buffer فارغًا'},
  ]}
>
  <slot name="question">
  <div className="question">
    ماذا يفعل هذا الكود؟
    ```js
        const buf = Buffer.alloc(5);
        console.log(buf);
    ```
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    `Buffer.alloc(size)` ينشئ Buffer جديدًا بالحجم المحدد مملوءًا بالأصفار.
    سيكون الناتج: `<Buffer 00 00 00 00 00>`

    إذا كنت تريد إنشاء Buffer ببيانات عشوائية، استخدم `Buffer.allocUnsafe(5)`.

    [تعلم المزيد عن تخصيص Buffer](https://nodejs.org/api/buffer.html#static-method-bufferalloc)
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={1}
  group="تمهيد: المخازن المؤقتة"
  title="تحويل المخزن المؤقت إلى سلسلة نصية"
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
    ماذا سيطبع هذا؟
    ```js
        const buf = Buffer.from([65]);
        console.log(buf.toString());
    ```
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    الأرقام في المصفوفة تمثل رموز ASCII:

    - 65: 'A'

    `toString()` يحول هذه البايتات إلى تمثيلها النصي باستخدام ترميز UTF-8 افتراضيًا.

    [تعلم المزيد عن ترميز المخزن المؤقت](https://nodejs.org/api/buffer.html#buffers-and-character-encodings)
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={2}
  group="إحماء: نظام الملفات"
  title="عمليات الملفات غير المتزامنة"
  options={[
    {text: 'يطبع محتوى الملف ثم "تم"'},
    {text: 'يطبع "تم" ثم محتوى الملف', isAnswer: true},
    {text: 'يطبع محتوى الملف فقط'},
    {text: 'يرمي خطأ'},
  ]}
>
  <slot name="question">
  <div className="question">
    ما هو ترتيب الإخراج؟
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
    بما أن `readFile` غير متزامن، يستمر تنفيذ الكود أثناء قراءة الملف.
    لذلك، سيتم طباعة "تم" قبل محتوى الملف.

    لانتظار قراءة الملف أولاً، يمكنك استخدام النسخة المعتمدة على الوعود (Promise):
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
  group="أساسيات نظام الملفات"
  title="قراءة الملفات بشكل متزامن"
  options={[
    {text: 'يعيد Buffer', isAnswer: true},
    {text: 'يعيد string'},
    {text: 'يعيد undefined'},
    {text: 'يعيد Promise'},
  ]}
>
  <slot name="question">
  <div className="question">
    ما الذي يعيده `fs.readFileSync()` افتراضيًا؟
    ```js
        import fs from 'fs';
        const content = fs.readFileSync('test.txt');
    ```
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    `fs.readFileSync()` يعيد Buffer افتراضيًا عندما لا يتم تحديد ترميز. إذا كنت تريد string، فأنت بحاجة إما إلى:
    1. تحديد ترميز: `fs.readFileSync('test.txt', 'utf8')`
    2. تحويل Buffer: `content.toString()`

    [تعلم المزيد عن fs.readFileSync في وثائق Node.js](https://nodejs.org/api/fs.html#fsreadfilesyncpath-options)
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={4}
  group="التدفقات"
  title="أحداث التدفق"
  options={[
    {text: '\'data\', \'end\', \'error\', \'close\'', isAnswer: true},
    {text: '\'finish\', \'drain\', \'pipe\''},
    {text: '\'read\', \'write\', \'end\''},
    {text: '\'open\', \'close\', \'data\''},
  ]}
>
  <slot name="question">
  <div className="question">
    ما مجموعة الأحداث التي تُستخدم عادةً مع التدفقات القابلة للقراءة؟
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    تصدر التدفقات القابلة للقراءة عدة أحداث مهمة:
    - 'data': عند توفر البيانات للقراءة
    - 'end': عندما لا توجد بيانات أخرى للقراءة
    - 'error': عند حدوث خطأ
    - 'close': عند إغلاق التدفق والمورد الأساسي
    ```js
        const readable = fs.createReadStream('file.txt');
        readable.on('data', chunk => console.log(chunk));
        readable.on('end', () => console.log('Done!'));
    ```
    [تعلم المزيد عن أحداث التدفق](https://nodejs.org/api/stream.html#class-streamreadable)
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={5}
  group="التدفقات"
  title="ربط التدفقات"
  options={[
    {text: 'ينسخ الملف مع الضغط'},
    {text: 'ينسخ الملف دون تخزين مؤقت في الذاكرة', isAnswer: true},
    {text: 'يحمل الملف بأكمله في الذاكرة'},
    {text: 'ينشئ رابطًا رمزيًا'},
  ]}
>
  <slot name="question">
  <div className="question">
    ماذا يفعل هذا الكود؟
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
    `pipe()` يربط تدفقًا قابلًا للقراءة بتدفق قابل للكتابة، ويدير الضغط الخلفي تلقائيًا وينسخ البيانات على شكل أجزاء دون تحميل الملف بأكمله في الذاكرة.

    هذا أكثر كفاءة في استخدام الذاكرة للملفات الكبيرة مقارنة بـ `fs.readFile()` متبوعًا بـ `fs.writeFile()`.

    [تعلم المزيد عن pipe()](https://nodejs.org/api/stream.html#readablepipedestination-options)
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={6}
  group="نظام الملفات"
  title="عمليات الدليل"
  options={[
    {text: 'ينشئ أدلة متداخلة إذا لزم الأمر', isAnswer: true},
    {text: 'ينشئ الدليل الأخير فقط'},
    {text: 'يرمي خطأ'},
    {text: 'ينشئ روابط رمزية'},
  ]}
>
  <slot name="question">
  <div className="question">
    ماذا يفعل الخيار recursive؟
    ```js
        import fs from 'fs';
        fs.mkdirSync('./a/b/c', { recursive: true });
    ```
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    الخيار `recursive: true` ينشئ الأدلة الأم إذا لم تكن موجودة.
    بدون هذا الخيار، محاولة إنشاء './a/b/c' ستؤدي إلى خطأ إذا كان './a' أو './a/b' غير موجودين.

    هذا مشابه لأمر الصدفة `mkdir -p`.

    [تعلم المزيد عن mkdir](https://nodejs.org/api/fs.html#fsmkdirsyncpath-options)
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={7}
  group="التدفقات"
  title="تيارات التحويل"
  options={[
    {text: 'hello world'},
    {text: 'HELLO WORLD', isAnswer: true},
    {text: 'Error'},
    {text: 'undefined'},
  ]}
>
  <slot name="question">
  <div className="question">
    ماذا سيكون الناتج؟
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
    تيارات التحويل تعدل البيانات أثناء مرورها. هنا، كل جزء (chunk) يتم:
    1. تحويله إلى نص (string)
    2. تحويله إلى أحرف كبيرة (uppercase)
    3. تمريره إلى stdout

    هذا ينشئ خط أنابيب (pipeline) يحول كل المدخلات إلى أحرف كبيرة.

    [تعلم المزيد عن تيارات التحويل](https://nodejs.org/api/stream.html#class-streamtransform)
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={8}
  group="نظام الملفات"
  title="مراقبة الملفات"
  options={[
    {text: 'مرة واحدة لكل تغيير في الملف'},
    {text: 'غير مضمون؛ قد يتم التشغيل عدة مرات', isAnswer: true},
    {text: 'أبدًا'},
    {text: 'فقط عند حذف الملف'},
  ]}
>
  <slot name="question">
  <div className="question">
    كم مرة يتم ضمان تشغيل `fs.watch()` عند تعديل ملف؟
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
    `fs.watch()` غير مضمون للتشغيل مرة واحدة بالضبط لكل تغيير منطقي في الملف. غالبًا ما يتم تشغيله عدة مرات لأن العديد من محررات النصوص:
    1. تحفظ في ملف مؤقت
    2. تعيد تسميته إلى الملف الهدف

    للحصول على مراقبة أكثر موثوقية، فكر في استخدام:
    - حزمة `chokidar`
    - إزالة الارتداد (debouncing) من رد النداء
    - استخدام `fs.watchFile()` (على الرغم من أنها أقل كفاءة)

    [تعلم المزيد عن fs.watch()](https://nodejs.org/api/fs.html#fswatchfilename-options-listener)
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={9}
  group="البفرات"
  title="مقارنة البفرات"
  options={[
    {text: 'true'},
    {text: 'false', isAnswer: true},
    {text: 'undefined'},
    {text: 'Error'},
  ]}
>
  <slot name="question">
  <div className="question">
    ما هو الناتج؟
    ```js
        const buf1 = Buffer.from('Hello');
        const buf2 = Buffer.from('Hello');
        console.log(buf1 === buf2);
    ```
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    تتم مقارنة البفرات حسب المرجع وليس القيمة. على الرغم من أنها تحتوي على نفس البيانات، إلا أنها كائنات مختلفة.

    لمقارنة محتويات البفر، استخدم:
    ```js
        buf1.equals(buf2)  // true
        // or
        Buffer.compare(buf1, buf2) === 0  // true
    ```
    [تعلم المزيد عن مقارنة البفرات](https://nodejs.org/api/buffer.html#bufequalsotherbuffer)
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={10}
  group="التدفقات"
  title="الضغط العكسي للتدفق"
  options={[
    {text: 'يمنع تجاوز الذاكرة', isAnswer: true},
    {text: 'يزيد سرعة القراءة'},
    {text: 'يضغط البيانات'},
    {text: 'يشفر البيانات'},
  ]}
>
  <slot name="question">
  <div className="question">
    ما هو الهدف الرئيسي للضغط العكسي للتدفق؟
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    الضغط العكسي هو آلية تمنع تجاوز الذاكرة عن طريق إيقاف القراءة مؤقتًا عندما لا يستطيع طرف الكتابة مواكبة السرعة.

    مثال على الضغط العكسي اليدوي:
    ```js
        readable.on('data', (chunk) => {
          const canContinue = writable.write(chunk);
          if (!canContinue) {
            readable.pause();
            writable.once('drain', () => readable.resume());
          }
        });
    ```
    `pipe()` يتعامل مع هذا تلقائيًا!

    [تعرف على المزيد حول الضغط العكسي](https://nodejs.org/en/learn/modules/backpressuring-in-streams#backpressuring-in-streams)
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={11}
  group="نظام الملفات"
  title="الروابط الرمزية"
  options={[
    {text: 'ينشئ رابطًا صلبًا'},
    {text: 'ينشئ نسخة'},
    {text: 'ينشئ رابطًا رمزيًا', isAnswer: true},
    {text: 'ينقل الملف'},
  ]}
>
  <slot name="question">
  <div className="question">
    ماذا يفعل هذا الكود؟
    ```js
        import fs from 'fs';
        fs.symlinkSync('target.txt', 'link.txt');
    ```
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    `symlinkSync` ينشئ رابطًا رمزيًا (مثل اختصار) للملف الهدف.

    الاختلافات الرئيسية عن الروابط الصلبة:
    - يمكن الربط بالمجلدات
    - يمكن أن يمتد عبر أنظمة الملفات
    - ينكسر إذا تم حذف الهدف

    لإنشاء رابط صلب بدلاً من ذلك:
    ```js
        fs.linkSync('target.txt', 'hardlink.txt');
    ```
    [تعلم المزيد عن الروابط الرمزية](https://nodejs.org/api/fs.html#fssymlinksync-target-path-type)
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={12}
  group="التدفقات"
  title="أنماط التدفق"
  options={[
    {text: 'وضع ثنائي فقط'},
    {text: 'وضع كائن فقط'},
    {text: 'كلا الوضعين', isAnswer: true},
    {text: 'لا أحد'},
    {text: 'أوضاع الإدخال والإخراج'},
    {text: 'أوضاع القراءة والكتابة'},
  ]}
>
  <slot name="question">
  <div className="question">
    ما هي الأوضاع التي يمكن أن تعمل بها تدفقات Node.js؟
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    يمكن أن تعمل التدفقات في:
    1. الوضع الثنائي (الافتراضي): للمخازن المؤقتة والسلاسل النصية
    2. وضع الكائن: لأي قيمة JavaScript

    مثال على وضع الكائن:
    ```js
        import { Transform } from 'stream';
        const objectStream = new Transform({
          objectMode: true,
          transform(chunk, encoding, callback) {
            callback(null, { value: chunk });
          }
        });
    ```
    [تعلم المزيد عن أنماط التدفق](https://nodejs.org/api/stream.html#object-mode)
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={13}
  group="نظام الملفات"
  title="مؤشرات الملفات"
  options={[
    {text: 'رقم', isAnswer: true},
    {text: 'سلسلة نصية'},
    {text: 'كائن'},
    {text: 'مخزن مؤقت'},
  ]}
>
  <slot name="question">
  <div className="question">
    ما نوع المعامل `fd` في هذه الدالة الاستدعائية؟
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
    مؤشرات الملفات هي أرقام تحدد بشكل فريد الملفات المفتوحة في نظام التشغيل.

    أول ثلاثة مؤشرات ملفات محجوزة:
    - 0: stdin
    - 1: stdout
    - 2: stderr

    تذكر دائمًا إغلاق مؤشرات الملفات:
    ```js
        fs.close(fd, (err) => {
          if (err) throw err;
        });
    ```
    [تعلم المزيد عن مؤشرات الملفات](https://nodejs.org/api/fs.html#file-descriptors)
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={14}
  group="الترميز"
  title="ترميز Buffer"
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
    كم عدد البايتات التي ستستهلكها هذه السلسلة في UTF-8؟
    ```js
        const str = "Hello 🌍";
        const buf = Buffer.from(str);
        console.log(buf.length);
    ```
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    في UTF-8:
    - الأحرف ASCII (مثل 'Hello ') تأخذ 1 بايت لكل منها
    - إيموجي الأرض 🌍 يأخذ 4 بايتات

    إذًا: 5 (Hello) + 1 (مسافة) + 4 (🌍) = 10 بايتات

    لرؤية البايتات:
    ```js
        console.log(buf);  // <Buffer 48 65 6c 6c 6f 20 f0 9f 8c 8d>
    ```
    [تعلم المزيد عن ترميز UTF-8](https://nodejs.org/api/buffer.html#buffers-and-character-encodings)
  </div>
  </slot>
</Challenge>

</QuizUI>

أتمنى أن تكون قد استمتعت باختبار معرفتك بـ NodeJS IO! تريد المزيد؟ اطّلع على [مجموعة الاختبارات](../challenges/) لمزيد من التحديات!
````
