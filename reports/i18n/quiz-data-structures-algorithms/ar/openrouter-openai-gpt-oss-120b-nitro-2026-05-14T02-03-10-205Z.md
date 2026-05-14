# Translation Candidate
- Slug: quiz-data-structures-algorithms
- Locale: ar
- Model: openrouter/openai/gpt-oss-120b:nitro
- Target: src/content/posts/2024-10-31--quiz-data-structures-algorithms/ar/index.mdx
- Validation: deferred
- Runtime seconds: 35.77
- Input tokens: 18401
- Output tokens: 10276
- Thinking tokens: unknown
- Cached input tokens: 6784
- Cache write tokens: 0
- Estimated cost: $0.002700
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
title: 'اختبار: هياكل البيانات والخوارزميات'
subTitle: هل يمكنك خداع شجرة ثنائية؟
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
  مرحبًا بك في اختبار هياكل البيانات والخوارزميات الخاص بي!
</section>

هذا الاختبار سيقيس معرفتك بهياكل البيانات (المكدسات، القوائم، الأشجار، إلخ) والخوارزميات، بالإضافة إلى تحليل التعقيد الزمني.

### 20 سؤالًا... ابدأ!

<QuizUI>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={0}
  group="هياكل البيانات"
  title="المكدسات مقابل قوائم الانتظار"
  options={[
    {text: 'كلاهما'},
    {text: 'قوائم الانتظار'},
    {text: 'المكدسات', isAnswer: true},
    {text: 'لا شيء'},
  ]}
>
  <slot name="question">
  <div className="question">
    أي بنية بيانات هي الأنسب لنمط الوصول LIFO (الأخير يدخل، الأول يخرج)؟
  </div>
  </slot>

  <slot name="hints">
  <div className="hint">
    انظر إلى نمط الوصول، لا إلى اسم البنية. عادةً ما يتبع الجواب الصحيح ما يجب أن يحدث أولاً أو أخيراً.
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    المكدسات هي الأنسب لنمط الوصول LIFO. قوائم الانتظار هي الأنسب لنمط الوصول FIFO (الأول يدخل، الأول يخرج).
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={1}
  group="الخوارزميات"
  title="دلالة Big O"
  options={[
    {text: 'O(1)', isAnswer: true},
    {text: 'O(n)'},
    {text: 'O(log n)'},
    {text: 'O(n^2)'},
  ]}
>
  <slot name="question">
  <div className="question">
    ما هو تعقيد الزمن لخوارزمية دائمًا تستغرق نفس الوقت للتنفيذ بغض النظر عن حجم الإدخال؟
  </div>
  </slot>

  <slot name="hints">
  <div className="hint">
    انظر إلى نمط الوصول، وليس اسم البنية. عادةً ما يكون الجواب الصحيح مستنتجًا من ما يجب أن يحدث أولًا أو آخرًا.
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    O(1) تمثل تعقيد زمن ثابت. يعني أن الخوارزمية دائمًا تستغرق نفس الوقت للتنفيذ بغض النظر عن حجم الإدخال.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={2}
  group="هياكل البيانات"
  title="حساب طول القائمة المرتبطة"
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
    ما هو تعقيد الوقت لحساب طول قائمة مرتبطة أحادية الاتجاه؟
  </div>
  </slot>

  <slot name="hints">
  <div className="hint">
    انظر إلى نمط الوصول، وليس اسم الهيكل. عادةً ما يتبع الجواب الصحيح ما يجب أن يحدث أولاً أو أخيراً.
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    لحساب طول قائمة مرتبطة أحادية الاتجاه، يجب عليك المرور عبر كل عقدة من الرأس إلى الذيل، مما ينتج تعقيد وقت O(n).
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={3}
  group="هياكل البيانات"
  title="البحث في شجرة البحث الثنائية"
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
    ما هو التعقيد الزمني المتوسط للبحث عن عنصر في شجرة بحث ثنائية متوازنة؟
  </div>
  </slot>

  <slot name="hints">
  <div className="hint">
    انظر إلى نمط الوصول، وليس اسم البنية. عادةً ما يتبع الجواب الصحيح مما يجب أن يحدث أولاً أو أخيراً.
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    في شجرة بحث ثنائية متوازنة، التعقيد الزمني المتوسط للبحث هو O(log n) لأن كل مستوى ي halve مساحة البحث.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={4}
  group="خوارزميات الفرز"
  title="تعقيد خوارزمية الدمج"
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
    ما هو تعقيد الوقت لخوارزمية Merge Sort في أسوأ حالة؟
  </div>
  </slot>

  <slot name="hints">
  <div className="hint">
    انظر إلى نمط الوصول، لا إلى اسم البنية. عادةً ما يتبع الجواب الصحيح ما يجب أن يحدث أولاً أو أخيراً.
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    Merge Sort دائمًا يعمل بتعقيد أسوأ حالة هو O(n log n) لأنه يقسم المصفوفة إلى نصفين بشكل متكرر ويدمج المصفوفات الفرعية المرتبة.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={5}
  group="الرسوم البيانية"
  title="DFS مقابل BFS"
  options={[
    {text: 'قائمة انتظار', isAnswer: true},
    {text: 'مكدس'},
    {text: 'قائمة انتظار ذات أولوية'},
    {text: 'خريطة تجزئة'},
    {text: 'مجموعة'},
  ]}
>
  <slot name="question">
  <div className="question">
    ما هي بنية البيانات التي تُستخدم عادةً لتنفيذ البحث بالعرض (BFS)؟
  </div>
  </slot>

  <slot name="hints">
  <div className="hint">
    انظر إلى نمط الوصول، لا إلى اسم البنية. الجواب الصحيح عادةً يُستنتج من ما يجب أن يحدث أولاً أو أخيراً.
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    يستخدم BFS قائمة انتظار لاستكشاف العقد مستوىً بمستوى، مع معالجة العقد بطريقة عرضية (حسب "الصف").
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={6}
  group="الرسوم البيانية"
  title="اكتشاف الدورات في الرسوم البيانية"
  options={[
    {text: 'Quick Sort'},
    {text: 'Breadth-First Search'},
    {text: 'Merge Sort'},
    {text: 'Depth-First Search', isAnswer: true},
    {text: 'Bubble Sort'},
  ]}
>
  <slot name="question">
  <div className="question">
    ما الخوارزمية التي تُستخدم عادةً لاكتشاف الدورات في رسم بياني موجه؟
  </div>
  </slot>

  <slot name="hints">
  <div className="hint">
    انظر إلى نمط الوصول، وليس اسم البنية. عادةً ما يتبع الجواب الصحيح ما يجب أن يحدث أولاً أو أخيراً.
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    عادةً ما تُستخدم بحث العمق أولاً (DFS) لاكتشاف الدورات في الرسم البياني عن طريق الحفاظ على مكدس الاستدعاءات لتتبع العقد التي تم زيارتها.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={7}
  group="خوارزميات الفرز"
  title="تعقيد Heap Sort"
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
    ما هو تعقيد الوقت لخوارزمية Heap Sort في أسوأ حالة؟
  </div>
  </slot>

  <slot name="hints">
  <div className="hint">
    انظر إلى نمط الوصول، وليس اسم البنية. عادةً ما يتبع الجواب الصحيح ما يجب أن يحدث أولاً أو أخيراً.
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    تحافظ خوارزمية Heap Sort على تعقيد وقت أسوأ حالة يبلغ O(n log n)، لأنها تُنشئ كومة وتستخرج العنصر الأقصى بشكل متكرر.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={8}
  group="هياكل البيانات"
  title="تعقيد الزمن لجدول التجزئة"
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
    ما هو تعقيد الزمن المتوسط للوصول إلى عنصر في جدول التجزئة؟
  </div>
  </slot>

  <slot name="hints">
  <div className="hint">
    انظر إلى نمط الوصول، وليس إلى اسم البنية. عادةً ما يتبع الجواب الصحيح ما يجب أن يحدث أولاً أو أخيراً.
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    جداول التجزئة لديها تعقيد زمن متوسط O(1) للوصول إلى العناصر، بشرط وجود دالة تجزئة جيدة تقلل التصادمات.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={9}
  group="هياكل البيانات"
  title="عمليات المكدس"
  options={[
    {text: 'Push, Pop, Peek', isAnswer: true},
    {text: 'Enqueue, Dequeue, Peek'},
    {text: 'Insert, Search, Delete'},
    {text: 'Traverse, Visit, Sort'},
  ]}
>
  <slot name="question">
  <div className="question">
    ما المجموعة التي تحتوي على العمليات النموذجية التي تُجرى على المكدس؟
  </div>
  </slot>

  <slot name="hints">
  <div className="hint">
    انظر إلى نمط الوصول، وليس إلى اسم البنية. عادةً ما يتضح الجواب الصحيح من خلال ما يجب أن يحدث أولاً أو أخيراً.
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    العمليات الأساسية للمكدس هي Push (إضافة عنصر)، Pop (إزالة عنصر)، و Peek (عرض العنصر الأعلى دون إزالته).
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={10}
  group="خوارزميات الرسم البياني"
  title="خوارزمية أقصر مسار"
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
    أي خوارزمية تُستخدم عادةً لإيجاد أقصر مسار في رسم بياني موزون ذو حواف غير سالبة؟
  </div>
  </slot>

  <slot name="hints">
  <div className="hint">
    انظر إلى نمط الوصول، لا إلى اسم البنية. عادةً ما يتبع الجواب الصحيح ما يجب أن يحدث أولاً أو أخيراً.
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    تُستخدم خوارزمية ديكسترا بشكل شائع لإيجاد أقصر مسار في الرسوم البيانية ذات أوزان الحواف غير السالبة. فهي تستعين بصفّ أولوية لتحديد أقصر مسافة بكفاءة.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={11}
  group="هياكل البيانات الشجرية"
  title="أشجار البحث ذات التوازن الذاتي"
  options={[
    {text: 'شجرة البحث الثنائية وكمّة الحد الأدنى'},
    {text: 'شجرة AVL وشجرة Red-Black', isAnswer: true},
    {text: 'كمّة الحد الأدنى وكمّة الحد الأقصى'},
    {text: 'المكدس والطابور'},
  ]}
>
  <slot name="question">
  <div className="question">
    أي مجموعة تحتوي على أمثلة لهياكل بيانات شجرة البحث الثنائية ذات التوازن الذاتي؟
  </div>
  </slot>

  <slot name="hints">
  <div className="hint">
    انظر إلى نمط الوصول، لا إلى اسم البنية. عادةً ما يتبع الجواب الصحيح ما يجب أن يحدث أولاً أو أخيراً.
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    شجرات AVL وشجرات Red-Black هي أنواع من الأشجار ذات التوازن الذاتي، التي تضمن بقاء الشجرة متوازنة بعد كل عملية إدخال أو حذف.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={12}
  group="العودية"
  title="حالة الأساس للعودة"
  options={[
    {text: 'حلقة لا نهائية'},
    {text: 'تجاوز مكدس'},
    {text: 'حالة أساسية', isAnswer: true},
    {text: 'متغير عالمي'},
    {text: 'قيد النطاق'},
  ]}
>
  <slot name="question">
  <div className="question">
    ما الذي يجب تعريفه في الدالة العودية لمنع التكرار اللانهائي؟
  </div>
  </slot>

  <slot name="hints">
  <div className="hint">
    انظر إلى نمط الوصول، وليس اسم البنية. عادةً ما يتبع الجواب الصحيح ما يجب أن يحدث أولاً أو أخيراً.
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    الحالة الأساسية ضرورية في الدالة العودية لإيقاف الاستدعاءات المتكررة عندما يتحقق شرط معين، مما يمنع التكرار اللانهائي.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={13}
  group="هياكل البيانات"
  title="عمليات الطابور"
  options={[
    {text: 'الإدراج والإزالة', isAnswer: true},
    {text: 'الدفع والإزالة'},
    {text: 'المعاينة والعلوي'},
    {text: 'التجوال والفرز'},
  ]}
>
  <slot name="question">
  <div className="question">
    ما هما العمليتان الأساسيتان للصف?
  </div>
  </slot>

  <slot name="hints">
  <div className="hint">
    انظر إلى نمط الوصول، ليس إلى اسم البنية. عادةً ما تكون الإجابة الصحيحة مستنتجة من ما يجب أن يحدث أولاً أو أخيراً.
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    العمليتان الرئيسيتان في الطابور هما الإضافة (Enqueue) إلى الخلف والإزالة (Dequeue) من الأمام.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={14}
  group="خوارزميات الرسوم البيانية"
  title="الترتيب الطوبولوجي"
  options={[
    {text: 'يجب أن يحتوي الرسم البياني على دورات'},
    {text: 'يجب أن يكون الرسم البياني مرجّحًا ومتصلاً'},
    {text: 'يجب أن يكون الرسم البياني غير موجه ولا يحتوي على دورات'},
    {text: 'يجب أن يكون الرسم البياني موجهًا ولا يحتوي على دورات', isAnswer: true},
  ]}
>
  <slot name="question">
  <div className="question">
    ما هي الشروط اللازمة لإجراء الترتيب الطوبولوجي على رسم بياني؟
  </div>
  </slot>

  <slot name="hints">
  <div className="hint">
    انظر إلى نمط الوصول، لا إلى اسم البنية. عادةً ما يتبع الجواب الصحيح ما يجب أن يحدث أولاً أو أخيرًا.
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    يمكن إجراء الترتيب الطوبولوجي على رسم بياني إذا كان موجهًا ولا يحتوي على دورات (DAG). هذا النوع من الترتيب مفيد في مشاكل جدولة المهام.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={15}
  group="البرمجة الديناميكية"
  title="تعقيد تكرار فيبوناتشي"
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
    ما هو تعقيد الوقت لتطبيق تكراري ساذج لسلسلة فيبوناتشي؟
  </div>
  </slot>

  <slot name="hints">
  <div className="hint">
    انظر إلى نمط الوصول، لا إلى اسم الهيكل. عادةً ما تستند الإجابة الصحيحة إلى ما يجب أن يحدث أولاً أو أخيراً.
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    تطبيق التكرار الساذج لسلسلة فيبوناتشي له تعقيد وقت O(2^n) بسبب الحسابات المتكررة المكثفة لكل رقم فيبوناتشي.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={16}
  group="هياكل البيانات"
  title="تنفيذ طابور الأولوية"
  options={[
    {text: 'Array'},
    {text: 'Stack'},
    {text: 'Heap', isAnswer: true},
    {text: 'Queue'},
    {text: 'Linked List'},
  ]}
>
  <slot name="question">
  <div className="question">
    ما هي بنية البيانات التي تُستخدم عادةً لتنفيذ طابور الأولوية؟
  </div>
  </slot>

  <slot name="hints">
  <div className="hint">
    انظر إلى نمط الوصول، ليس إلى اسم البنية. الجواب الصحيح عادةً يُستنتج من ما يجب أن يحدث أولاً أو أخيراً.
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    عادةً ما يتم تنفيذ طابور الأولوية باستخدام heap لأنه يتيح استخراج العنصر ذو الأولوية الأعلى أو الأدنى بكفاءة.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={17}
  group="هياكل البيانات"
  title="عمليات التجوال في شجرة ثنائية"
  options={[
    {text: 'In-order, Pre-order, Post-order', isAnswer: true},
    {text: 'Breadth-First, Depth-First, Heapify'},
    {text: 'Sort, Search, Rotate'},
    {text: 'Push, Pop, Peek'},
  ]}
>
  <slot name="question">
  <div className="question">
    أي مجموعة تسرد أوامر التجوال العميق الشائعة لشجرة ثنائية؟
  </div>
  </slot>

  <slot name="hints">
  <div className="hint">
    انظر إلى نمط الوصول، لا إلى اسم البنية. عادةً ما يتبع الجواب الصحيح ما يجب أن يحدث أولاً أو أخيراً.
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    In-order و Pre-order و Post-order هي الثلاثة أوامر التجوال العميق الشائعة لشجرات ثنائية، كلٌ بترتيب مختلف لزيارة العقد. التجوال بالعرض (Breadth-first) شائع أيضاً، لكنه فئة تجوال مختلفة.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={18}
  group="هياكل البيانات الشجرية"
  title="خاصية الكومة"
  options={[
    {text: 'جميع العقد مرتبة من اليسار إلى اليمين'},
    {text: 'الجذر دائمًا هو العنصر الأكبر'},
    {text: 'جميع الأوراق في نفس المستوى'},
    {text: 'الجذر هو أصغر عنصر والارتفاع هو O(log n)', isAnswer: true},
  ]}
>
  <slot name="question">
  <div className="question">
    أي من الخصائص التالية صحيحة لكومة الحد الأدنى؟
  </div>
  </slot>

  <slot name="hints">
  <div className="hint">
    انظر إلى نمط الوصول، لا إلى اسم البنية. عادةً ما يتبع الجواب الصحيح ما يجب أن يحدث أولًا أو أخيرًا.
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    في كومة الحد الأدنى، الجذر دائمًا هو أصغر عنصر، وارتفاع الشجرة هو O(log n)، مما يجعل عمليات الإدخال والاستخراج فعّالة.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={19}
  group="خوارزميات الفرز"
  title="استقرار فرز الفقاعات"
  options={[
    {text: 'غير مستقر'},
    {text: 'مستقر', isAnswer: true},
    {text: 'يعتمد على التنفيذ'},
    {text: 'لا شيء'},
    {text: 'التعقيد يحدد الاستقرار'},
  ]}
>
  <slot name="question">
  <div className="question">
    هل خوارزمية فرز الفقاعات مستقرة؟
  </div>
  </slot>

  <slot name="hints">
  <div className="hint">
    انظر إلى نمط الوصول، ليس إلى اسم البنية. عادةً ما يتبع الجواب الصحيح ما يجب أن يحدث أولاً أو أخيراً.
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    فرز الفقاعات هو خوارزمية فرز مستقرة لأنها تحافظ على الترتيب النسبي للعناصر المتساوية أثناء الفرز.
  </div>
  </slot>
</Challenge>

</QuizUI>
````
