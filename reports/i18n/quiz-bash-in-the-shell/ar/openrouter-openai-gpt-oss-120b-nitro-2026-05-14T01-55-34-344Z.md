# Translation Candidate
- Slug: quiz-bash-in-the-shell
- Locale: ar
- Model: openrouter/openai/gpt-oss-120b:nitro
- Target: src/content/posts/2024-11-20--quiz-bash-in-the-shell/ar/index.mdx
- Validation: deferred
- Runtime seconds: 47.49
- Input tokens: 17996
- Output tokens: 11840
- Thinking tokens: unknown
- Cached input tokens: 4992
- Cache write tokens: 0
- Estimated cost: $0.003397
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
unlisted: false
title: 'اختبار: إتقان Bash وShell'
subTitle: هل يمكنك التحدث إلى الحواسيب؟ بجدية؟
label: Bash
category: Quiz
subCategory: Bash
date: '2024-11-20'
modified: '2024-11-21'
tags:
  - quiz
  - bash
  - scripting
  - shell
  - linux
  - beginner
  - intermediate
  - advanced
social_image: ../desktop-social.webp
cover_full_width: ../psychedelic-shell-wide.webp
cover_mobile: ../psychedelic-shell-square-200.webp
cover_icon: ../psychedelic-shell-square-200.webp
---
import Challenge from '../../../../components/QuizUI/Challenge';
import QuizUI from '../../../../components/QuizUI/QuizUI';

<p class="inset">اختبر مهاراتك في كتابة سكريبتات Bash مع هذه الـ 16 سؤالًا!</p>

يشمل المتغيّرات، الحلقات، العبارات الشرطية، معالجة السلاسل، الدوال، ومشكلات الصياغة من الأساسية إلى الصعبة.

صقل (أو إثبات) **مهاراتك** في كتابة سكريبتات الشل!

<QuizUI>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={0}
  group="تمهيد"
  title="إعلان المتغير"
  options={[
    {text: '$name=Dan'},
    {text: 'name=Dan', isAnswer: true},
    {text: 'name =Dan'},
    {text: 'name == Dan'},
    {text: 'name : Dan'},
  ]}
>
  <slot name="question">
  <div className="question">
    كيف يتم تعريف المتغيرات في Bash؟
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    يتم إعلان المتغيرات في Bash بدون مسافات حول علامة `=`. على سبيل المثال:
    ```bash
        name=Alice
    ```
    هذا يعيّن القيمة `"Alice"` للمتغير `name`.

    ملاحظة: `$name` يُستخدم **للإشارة** أو قراءة قيمة المتغير.

    إضافة مسافات تجعل القشرة تفسّر الأمر كبرنامج للتنفيذ، وهذا ليس ما تريد عند ضبط المتغير.

    أيضًا، Bash حسّاسة لحالة الأحرف، لذا `name` و `NAME` و `Name` هي متغيرات مختلفة.

    أخيرًا، لا يمكن أن تحتوي أسماء المتغيرات على مسافات أو شرطات (`-`). استخدم الشرطات السفلية (`_`) أو camelCase بدلاً من ذلك.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={1}
  group="تمهيد: الهروب"
  title="الهروب من علامات الاقتباس"
  options={[
    {text: 'echo \'It\'s 🔨 Time!\''},
    {text: 'echo \'It\\\'s 🔨 Time!\''},
    {text: 'echo \'It\'\\\'\'s 🔨 Time!\'', isAnswer: true},
    {text: 'echo \'It\'\'s 🔨 Time!\''},
    {text: 'Error'},
  ]}
>
  <slot name="question">
  <div className="question">
    _ما الذي سيطبع `It's 🔨 Time!`؟_
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    أعلم. من الغريب مدى سرعة جعل الهروب السلاسل صعبة التحليل. تخيّل هروب لغات أخرى داخل سلاسل Bash - مع كل تلك الاقتباسات والفواصل العليا ورموز `$` التي تحاول إفسادك. 🫠

    تحتاج الاقتباسات المفردة إلى هروب داخل سلاسل محاطة باقتباسات مفردة. تسلسل إغلاق الاقتباس، هروب الاقتباس، وإعادة فتح الاقتباس (`'\''`) يسمح بإخراج:
    ```plaintext
        It's 🔨 Time!
    ```
    هناك طرق أخرى للتعامل مع هذا، لكن هذه هي الأكثر شيوعًا.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={2}
  group="تمهيد: التوسيع"
  title="أمر Echo"
  options={[
    {text: 'cat cab'},
    {text: 'cat cbt', isAnswer: true},
    {text: 'ca bt'},
    {text: 'cat'},
    {text: 'cbd'},
    {text: 'Error'},
  ]}
>
  <slot name="question">
  <div className="question">
    ماذا سيطبع هذا الأمر؟
    ```bash
        echo c{a,b}t
    ```
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    توسيع الأقواس `{}` يولد إصدارات متعددة من النص داخلها، واحدة (أو أكثر) لكل قيمة مفصولة بفواصل أو نمط.

    هنا، `c{a,b}t` يتوسع إلى:
    ```plaintext
        cat cbt
    ```
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={3}
  group="المتغيرات"
  title="هروب الأحرف"
  options={[
    {text: 'التكلفة: $$100'},
    {text: 'التكلفة: $100'},
    {text: 'التكلفة: 100'},
    {text: 'التكلفة: 00', isAnswer: true},
    {text: 'التكلفة:'},
    {text: 'خطأ'},
  ]}
>
  <slot name="question">
  <div className="question">
    الآن، ماذا سيطبع هذا؟
    ```bash
        price="$100"
        echo "Cost: $price"
    ```
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    المتغيرات المرقمة لها معنى خاص. في هذه الحالة، `$1` هو متغير خاص يحمل الوسيط الأول الممرّر إلى السكريبت أو الدالة.

    بما أننا نشغّل السكريبت في REPL، لا توجد وسائط، لذا `$1` يكون فارغًا. النص المتبقّي `00` يُطبع كما هو.

    لطباعة حرف `$` حرفيًا، استخدم علامات اقتباس مفردة، أو هربه باستخدام الشرطة المائلة العكسية (`\`):
    ```bash
        price="\$100"
        echo "Cost: $price"
    ```
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={4}
  group="استبدال الأجزاء الفرعية"
  title="استبدال الجزء الفرعي"
  options={[
    {text: 'مو مو'},
    {text: 'مو مو'},
    {text: 'عواء مو', isAnswer: true},
    {text: 'عواء عواء'},
    {text: 'خطأ'},
  ]}
>
  <slot name="question">
  <div className="question">
    ما الذي يحدث هنا؟
    ```bash
        str="Bark bark"
        echo ${str/bark/meow}
    ```
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    تستبدل الصيغة `${var/pattern/replacement}` أول ظهور لـ `pattern` بـ `replacement`. هنا، النتيجة هي:
    ```plaintext
        Bark meow
    ```
    إنها حساسة لحالة الأحرف. للتعامل مع كل من `bark` و `Bark`، استخدم نمطًا مثل `${var/[Bb]ark/Bark}` أو قم بتوحيد السلسلة قبل الاستبدال.

    لاستبدال كل الظهورات، استخدم `${var//pattern/replacement}`.

    لاستبدال من بداية السلسلة، استخدم `${var/#pattern/replacement}`.

    لاستبدال من نهاية السلسلة، استخدم `${var/%pattern/replacement}`.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={5}
  group="طول السلسلة"
  title="طول السلسلة"
  options={[
    {text: '$#username'},
    {text: '#$username'},
    {text: '${#username}', isAnswer: true},
    {text: '${username#}'},
    {text: 'echo $username | wc -c'},
  ]}
>
  <slot name="question">
  <div className="question">
    كيف يمكنك الحصول على طول متغير في Bash؟
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    الصيغة `${#username}` تُعيد طول `username`.

    على سبيل المثال:
    ```bash
        username="@justsml"
        echo ${#username} # => 8
    ```
    بينما `wc` قد يعمل، فهو تقنياً ليس جزءاً من Bash.

    الأداة `wc` هي نكتة قديمة داخلية تشير إلى "water closet"، أي المرحاض.
    أمزح! هل يقرأ أحد هذه؟

    في الواقع `wc` أمر قديم من Posix (وأيام AT&T Unix). اختصاره "word count" ويمكنه عد الأسطر والكلمات والأحرف في ملف أو تدفق إدخال.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={6}
  group="الشرطيات"
  title="If-Else الأساسي"
  options={[
    {text: 'الملف موجود'},
    {text: 'الملف غير موجود، بعد تشخيص الاختبار', isAnswer: true},
    {text: 'خطأ فقط'},
    {text: 'نقص الأقواس المزدوجة'},
    {text: 'لا شيء'},
  ]}
>
  <slot name="question">
  <div className="question">
    ماذا سيطبع هذا السكربت إذا كان الملف `cats.txt` موجودًا؟
    ```bash
        if [ -e cats.txt]; then
          echo "File exists"
        else
          echo "File does not exist"
        fi
    ```
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    هل لاحظت المسافة المفقودة قبل القوس المغلق؟

    Bash حساس جدًا هنا: المسافات مطلوبة داخل تعبيرات الأقواس.

    بسبب عدم وجود المسافة، يرى أمر `[` عدم وجود `]` مغلق، فيطبع Bash تشخيصًا، يعتبر الاختبار فاشلًا، ويستمر إلى فرع `else`.

    الصيغة الصحيحة هي:
    ```bash
        if [ -e example.txt ]; then
          echo "File exists"
        else
          echo "File does not exist"
        fi
    ```
    ملاحظة: الأقواس المزدوجة `[[ ]]` **مُوصى بها** لتعبيرات الشرط. [انظر BashFAQ.](https://mywiki.wooledge.org/BashFAQ/031)
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={7}
  group="الشرطيات"
  title="مقارنة السلاسل"
  options={[
    {text: 'نفس القطة'},
    {text: 'قطط مختلفة، بعد خطأ اختبار في الصياغة', isAnswer: true},
    {text: 'Zalgo'},
    {text: 'خطأ فقط'},
  ]}
>
  <slot name="question">
  <div className="question">
    كيف يمكننا مقارنة السلاسل في Bash؟
    ```bash
        cat1="Rosie"
        cat2="Sunflower"
        if [ "$cat1" === "$cat2" ]; then
          echo "Same cat"
        else
          echo "Different cats"
        fi
    ```
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    خطأ اختبار آخر في الصياغة!

    هل لاحظت المشغل غير الصالح `===`؟

    ربما كنت تفكر في JavaScript...

    باستخدام `[ ... ]`، يقوم Bash بإصدار تشخيص وتكون النتيجة خاطئة، لذا فرع `else` يطبع `Different cats`. في Bash، استخدم `=` أو `==` لمقارنات المساواة.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={8}
  group="الدوال"
  title="إعلان الدالة"
  options={[
    {text: 'مرحبا', isAnswer: true},
    {text: 'دان'},
    {text: 'مرحبا دان'},
    {text: 'greet'},
    {text: 'خطأ'},
    {text: 'خطأ في الصياغة'},
  ]}
>
  <slot name="question">
  <div className="question">
    ماذا سيطبع هذا السكريبت؟
    ```bash
        function greet () {
          echo "$1"
        }
        greet Hi Dan
    ```
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    يمكن للدوال في Bash قبول وسائط. المتغيّر `$1` يحمل أول وسيلة تُمرَّر إلى الدالة.

    تذكّر أن `$0` هو اسم السكريبت، `$1` هو أول وسيلة، `$2` هو الثاني، وهكذا. **المسافات تفصل بين الوسائط.** لذا، `greet Hi Dan` يمرّر `"Hi"` كأول وسيلة. لكي تمرّر `"Hi Dan"` كوسيلة واحدة، تحتاج إلى وضعها بين علامات اقتباس: `greet "Hi Dan"`.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={9}
  group="Composition"
  title="Using Piping"
  options={[
    {text: '>'},
    {text: '>>'},
    {text: '|', isAnswer: true},
    {text: '||'},
    {text: '|>'},
    {text: 'Error'},
  ]}
>
  <slot name="question">
  <div className="question">
    ما العامل الذي يربط **output** لأمر ما بـ **input** للأمر التالي؟
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    عامل الـ `|` pipe يربط ناتج أمر بمدخل أمر آخر. على سبيل المثال:
    ```bash
        echo "Mr. Levy 👨🏻‍🔬" | wc -m
        # => 14
    ```
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={10}
  group="الرياضيات"
  title="الرياضيات الأساسية"
  options={[
    {text: 'echo 2 + 2'},
    {text: 'echo ${2 + 2}'},
    {text: 'echo %(2 + 2)'},
    {text: 'echo $(( 2 + 2 ))', isAnswer: true},
    {text: 'خطأ'},
  ]}
>
  <slot name="question">
  <div className="question">
    كيف يعمل الحساب في Bash؟
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    تُجري الصيغة `(( ))` حسابًا صحيحًا في Bash.

    يمكن استخدامها للعمليات الحسابية البسيطة:
    ```bash
        ((result = 2 + 2))
        echo $result # => 4
    ```
    أو لتعبيرات شرطية:
    ```bash
        if (( 2 > 1 )); then
          echo "2 is greater than 1"
        fi
    ```
    للحسابات ذات الفاصلة العائمة، فكر في استخدام [`bc`](https://www.gnu.org/software/bc/manual/html_mono/bc.html) أو [`awk`](https://www.gnu.org/software/gawk/manual/gawk.html).
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={11}
  group="الضرب"
  title="الرياضيات الأساسية"
  options={[
    {text: 'echo 10 * 0.5'},
    {text: 'echo (10 * 0.5)'},
    {text: 'echo ${ 10 * 0.5 }'},
    {text: 'echo %( 10 * 0.5 )'},
    {text: 'echo $(( 10 * 0.5 ))'},
    {text: 'echo \'10 * 0.5\' | bc', isAnswer: true},
    {text: 'Error'},
  ]}
>
  <slot name="question">
  <div className="question">
    أي من هذه يضرب 10 في 0.5 بشكل صحيح، ويطبع 5؟
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    صيغة `(( ))` تقوم فقط بالعمليات الحسابية **عددية**. تعلم، أعداد صحيحة، بدون نقاط عائمة!

    Bash (ربما بشكل مفاجئ) يفتقر إلى دعم **مضمن** للعمليات الحسابية ذات النقطة العائمة.

    الحل الأكثر شيوعًا هو استخدام أدوات GNU مثل [`bc`](https://www.gnu.org/software/bc/manual/html_mono/bc.html) أو [`awk`](https://www.gnu.org/software/gawk/manual/gawk.html).
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={12}
  group="معالجة السلاسل"
  title="استخراج الجزء الفرعي"
  options={[
    {text: 'قطة سيئة'},
    {text: 'قطة سيئة، قطة جيدة:9'},
    {text: 'قطة جيدة', isAnswer: true},
    {text: 'خطأ'},
  ]}
>
  <slot name="question">
  <div className="question">
    ماذا يفعل `:` في هذا السكربت؟
    ```bash
        rosie="Bad cat, good cat"
        echo ${rosie:9}
    ```
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    الصيغة `${var:offset}` تستخرج جزءًا من السلسلة يبدأ من `offset`. هنا، الناتج هو:
    ```plaintext
        good cat
    ```
    لاستخراج جزء فرعي بطول محدد، استخدم `${var:offset:length}`.

    لاستخراج من نهاية السلسلة، استخدم `${var: -offset}`. (لاحظ المسافة قبل `-`!)
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={13}
  group="الحلقات"
  title="الحلقات في Bash"
  options={[
    {text: 'do'},
    {text: 'each', isAnswer: true},
    {text: 'for'},
    {text: 'until'},
    {text: 'while'},
  ]}
>
  <slot name="question">
  <div className="question">
    ما هي الكلمة التي ليست ❌ كلمة مفتاحية للتكرار في Bash؟
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    `each` ليست كلمة مفتاحية للحلقات في Bash. الكلمات المفتاحية الرئيسية للحلقات هي `for` و `while` و `until`.

    بينما `do` ليست كلمة مفتاحية تقنياً، فهي جزء أساسي من بنية الحلقة.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={14}
  group="فخاخ"
  title="استبدال الأمر"
  options={[
    {text: '\'ls -l\''},
    {text: '% ls -l'},
    {text: '$ ls -l'},
    {text: '$(ls -l)', isAnswer: true},
    {text: '${ls -l}'},
  ]}
>
  <slot name="question">
  <div className="question">
    أي خيار سيُنفّذ الأمر `ls -l` ويعيد الناتج؟
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    تُنفّذ الصيغة `$(ls -l)` الأمر داخل **الأقواس** وتستبدل الناتج. على سبيل المثال:
    ```bash
        echo "Today is $(date +%F)"
        # => Today is 2029-12-31
    ```
    الخيار الأول يستخدم علامات اقتباس مفردة `'`، **ليس علامات اقتباس عكسية**. هذا يمنع التوسيع، لذا `'$(date +%F)'` سيطبع ببساطة السلسلة الحرفية `$(date +%F)`.

    بينما لا يزال من المدعوم استخدام علامات الاقتباس العكسية (`` `ls -l` ``) لتنفيذ الأوامر، فقد أصبحت مؤخرًا نمطًا غير مفضَّل (في بعض السياقات). يفضّل معظم الناس استخدام `$(command)` لقراءة أفضل وتوافق أكبر مع مختلف القواقع والإصدارات.

    الأقواس المعقوفة `${}` تُستخدم لتوسيع المتغيّر، ليست لاستبدال الأمر.

    حرف `%` لا يُستخدم لاستبدال الأمر.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={15}
  group="الإدخال/الإخراج القياسي"
  title="القيم الافتراضية"
  options={[
    {text: '1>&2'},
    {text: '&2>&1'},
    {text: '2>&1', isAnswer: true},
    {text: '2>1'},
    {text: '&2>1'},
  ]}
>
  <slot name="question">
  <div className="question">
    أي عامل يُستخدم لدمج مخرجات الأخطاء مع مخرجات القياسية؟
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    `2>&1` هو العامل الذي يعيد توجيه الخطأ القياسي (وصف الملف 2) إلى الإخراج القياسي (وصف الملف 1). هذا مفيد لالتقاط رسائل الأخطاء في نفس تدفق الإخراج مع الإخراج العادي.

    `1>&2` يعيد توجيه الإخراج القياسي إلى الخطأ القياسي، لكن السؤال كان عن كيفية إعادة توجيه الخطأ القياسي إلى الإخراج القياسي.

    للتعرف أكثر على ما يحدث خلف الكواليس، راجع [FAQ إعادة التوجيه الممتاز من غريغ](https://mywiki.wooledge.org/BashFAQ/055).

    كما نشكر مستخدم Reddit [u/OneTurnMore](https://www.reddit.com/user/OneTurnMore/) على اقتراح تحسينات النص.
  </div>
  </slot>
</Challenge>

</QuizUI>

<p className="inset">هل تركك اختبار Bash في حالة فوضى؟</p>

أخبرني في التعليقات أدناه!

### قراءة إضافية

حسّن مهاراتك في Bash باستخدام الموارد التالية:

- [دليل Bash](https://www.gnu.org/software/bash/manual/bash.html)
- [BashFAQ](http://mywiki.wooledge.org/BashFAQ)
- [ShellCheck](https://www.shellcheck.net/)
- [أكاديمية Bash](https://guide.bash.academy/)
- [دروس برمجة Bash](https://ryanstutorials.net/bash-scripting-tutorial/)
- [دليل Bash المرجعي](https://www.gnu.org/software/bash/manual/bash.html)
- [ويكي Bash Hackers](http://wiki.bash-hackers.org/)
- [دليل Bash للمبتدئين](http://tldp.org/LDP/Bash-Beginners-Guide/html/index.html)
- [بطاقة مرجعية Bash](http://www.tldp.org/LDP/Bash-Beginners-Guide/html/Bash-Beginners-Guide.html)
````
