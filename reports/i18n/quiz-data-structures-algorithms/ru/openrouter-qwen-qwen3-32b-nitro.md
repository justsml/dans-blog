# Translation Candidate
- Slug: quiz-data-structures-algorithms
- Locale: ru
- Model: openrouter/qwen/qwen3-32b:nitro
- Target: src/content/posts/2024-10-31--quiz-data-structures-algorithms/ru/index.mdx
- Validation: rejected: direct AI SDK translation failed
- Runtime seconds: 4.61
- Input tokens: unknown
- Output tokens: unknown
- Thinking tokens: unknown
- Cached input tokens: unknown
- Cache write tokens: unknown
- Estimated cost: unknown
- Pricing source: unknown
- Note: Command failed: bun run i18n:translate:chunked -- --slug quiz-data-structures-algorithms --locale ru --model openrouter/qwen/qwen3-32b:nitro --chunk 6p --quiz-concurrency 20
## Raw Output

````mdx
---
title: 'Тест: Структуры данных и алгоритмы'
subTitle: Сможете ли вы выполнить BS над бинарным деревом?
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
import Challenge from '../../../../../components/QuizUI/Challenge';
import QuizUI from '../../../../../components/QuizUI/QuizUI';

<section class="inset">
  Добро пожаловать на мой тест по структурам данных и алгоритмам!
</section>

Этот тест проверит ваши знания о структурах данных (стек, списки, деревья и т.д.), алгоритмах и оценке временной сложности.

### 20 вопросов… Начинаем!

<QuizUI>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={0}
  group="Структуры данных"
  title="Стек vs Очереди"
  options={[
    {text: 'Оба'},
    {text: 'Очереди'},
    {text: 'Стек', isAnswer: true},
    {text: 'Ни то, ни другое'},
  ]}
>
  <slot name="question">
  <div className="question">
    Какая структура данных лучше всего подходит для доступа LIFO (Last In, First Out)?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Стек лучше всего подходит для доступа LIFO. Очереди лучше всего подходят для доступа FIFO (First In, First Out).
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={1}
  group="Алгоритмы"
  title="Нотация Большого О"
  options={[
    {text: 'O(1)', isAnswer: true},
    {text: 'O(n)'},
    {text: 'O(log n)'},
    {text: 'O(n^2)'},
  ]}
>
  <slot name="question">
  <div className="question">
    Какова временная сложность алгоритма, который всегда занимает одинаковое время выполнения, независимо от размера входных данных?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    O(1) представляет собой постоянную временную сложность. Это означает, что алгоритм всегда занимает одинаковое время выполнения, независимо от размера входных данных.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={2}
  group="Структуры данных"
  title="Вычисление длины связного списка"
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
    Какова временная сложность вычисления длины односвязного списка?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Чтобы вычислить длину односвязного списка, необходимо пройти каждый узел от головы до хвоста, что приводит к временной сложности O(n).
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={3}
  group="Структуры данных"
  title="Поиск в бинарном дереве поиска"
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
    Какова средняя временная сложность поиска элемента в сбалансированном бинарном дереве поиска?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    В сбалансированном BST средняя временная сложность поиска составляет O(log n), потому что на каждом уровне пространство поиска уменьшается вдвое.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={4}
  group="Алгоритмы сортировки"
  title="Сложность Merge Sort"
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
    Какова временная сложность алгоритма Merge Sort в худшем случае?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Merge Sort всегда работает с худшей сложностью O(n log n), так как он неоднократно делит массив пополам и объединяет отсортированные подмассивы.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={5}
  group="Графы"
  title="DFS vs BFS"
  options={[
    {text: 'Очередь', isAnswer: true},
    {text: 'Стек'},
    {text: 'Приоритетная очередь'},
    {text: 'Хеш‑карта'},
    {text: 'Множество'},
  ]}
>
  <slot name="question">
  <div className="question">
    Какая структура данных обычно используется для реализации поиска в ширину (BFS)?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    BFS использует очередь для обхода узлов уровень за уровнем, обрабатывая их в порядке ширины (по "строке").
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={6}
  group="Графы"
  title="Обнаружение циклов в графах"
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
    Какой алгоритм обычно используется для обнаружения циклов в ориентированном графе?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Поиск в глубину (DFS) обычно используется для обнаружения циклов в графе, поддерживая стек рекурсии для отслеживания посещённых узлов.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={7}
  group="Алгоритмы сортировки"
  title="Сложность сортировки кучей"
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
    Какова временная сложность сортировки кучей в худшем случае?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Сортировка кучей сохраняет худшую временную сложность O(n log n), так как она строит кучу и многократно извлекает максимальный элемент.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={8}
  group="Структуры данных"
  title="Временная сложность хеш‑таблицы"
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
    Какова средняя временная сложность доступа к элементу в хеш‑таблице?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Хеш‑таблицы имеют среднюю временную сложность O(1) при доступе к элементам, при условии хорошей хеш‑функции, минимизирующей коллизии.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={9}
  group="Структуры данных"
  title="Операции со стеком"
  options={[
    {text: 'Push, Pop, Peek', isAnswer: true},
    {text: 'Enqueue, Dequeue, Peek'},
    {text: 'Insert, Search, Delete'},
    {text: 'Traverse, Visit, Sort'},
  ]}
>
  <slot name="question">
  <div className="question">
    Какой набор содержит типичные операции, выполняемые со стеком?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Основные операции стека — Push (добавление элемента), Pop (удаление элемента) и Peek (просмотр верхнего элемента без его удаления).
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={10}
  group="Алгоритмы графов"
  title="Алгоритм кратчайшего пути"
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
    Какой алгоритм обычно используется для поиска кратчайшего пути в взвешенном графе с неотрицательными ребрами?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Алгоритм Дейкстры часто применяется для нахождения кратчайшего пути в графах с неотрицательными весами ребер. Он использует приоритетную очередь для эффективного определения минимального расстояния.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={11}
  group="Структуры данных деревьев"
  title="Самобалансирующиеся поисковые деревья"
  options={[
    {text: 'Двоичное поисковое дерево и мин‑куча'},
    {text: 'AVL‑дерево и красно‑черное дерево', isAnswer: true},
    {text: 'Мин‑куча и макс‑куча'},
    {text: 'Стек и очередь'},
  ]}
>
  <slot name="question">
  <div className="question">
    Какой набор содержит примеры самобалансирующихся двоичных поисковых деревьев?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    AVL‑деревья и красно‑черные деревья являются типами самобалансирующихся деревьев, которые гарантируют, что дерево остаётся сбалансированным после каждой вставки или удаления.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={12}
  group="Рекурсия"
  title="Базовый случай рекурсии"
  options={[
    {text: 'Бесконечный цикл'},
    {text: 'Переполнение стека'},
    {text: 'Базовый случай', isAnswer: true},
    {text: 'Глобальная переменная'},
    {text: 'Ограничение области видимости'},
  ]}
>
  <slot name="question">
  <div className="question">
    Что необходимо определить в рекурсивной функции, чтобы предотвратить бесконечную рекурсию?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Базовый случай необходим в рекурсивной функции, чтобы остановить рекурсивные вызовы, когда выполнено определённое условие, предотвращая бесконечную рекурсию.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={13}
  group="Структуры данных"
  title="Операции очереди"
  options={[
    {text: 'Enqueue и Dequeue', isAnswer: true},
    {text: 'Push и Pop'},
    {text: 'Peek и Top'},
    {text: 'Traverse и Sort'},
  ]}
>
  <slot name="question">
  <div className="question">
    Какие две основные операции у очереди?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Две основные операции в очереди — Enqueue (добавление элемента в конец) и Dequeue (удаление элемента из начала).
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={14}
  group="Алгоритмы графов"
  title="Топологическая сортировка"
  options={[
    {text: 'Граф должен содержать циклы'},
    {text: 'Граф должен быть взвешенным и связным'},
    {text: 'Граф должен быть неориентированным и ациклическим'},
    {text: 'Граф должен быть ориентированным и ациклическим', isAnswer: true},
  ]}
>
  <slot name="question">
  <div className="question">
    Каковы условия выполнения топологической сортировки графа?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Топологическую сортировку можно выполнить над графом, если он ориентирован и ацикличен (DAG). Такой порядок полезен в задачах планирования выполнения.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={15}
  group="Динамическое программирование"
  title="Сложность рекурсии Фибоначчи"
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
    Какова временная сложность наивной рекурсивной реализации последовательности Фибоначчи?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Наивная рекурсивная реализация последовательности Фибоначчи имеет временную сложность O(2^n) из‑за обширных повторных вычислений для каждого числа Фибоначчи.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={16}
  group="Структуры данных"
  title="Реализация приоритетной очереди"
  options={[
    {text: 'Массив'},
    {text: 'Стек'},
    {text: 'Куча', isAnswer: true},
    {text: 'Очередь'},
    {text: 'Связный список'},
  ]}
>
  <slot name="question">
  <div className="question">
    Какая структура данных обычно используется для реализации приоритетной очереди?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Приоритетная очередь обычно реализуется с помощью кучи, потому что она обеспечивает эффективное извлечение элемента с наивысшим или наименьшим приоритетом.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={17}
  group="Структуры данных"
  title="Обходы бинарного дерева"
  options={[
    {text: 'In-order, Pre-order, Post-order', isAnswer: true},
    {text: 'Breadth-First, Depth-First, Heapify'},
    {text: 'Sort, Search, Rotate'},
    {text: 'Push, Pop, Peek'},
  ]}
>
  <slot name="question">
  <div className="question">
    Какой набор перечисляет общие порядки обхода в глубину для бинарного дерева?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    In-order, Pre-order и Post-order — это три распространённых порядка обхода в глубину для бинарных деревьев, каждый из которых отличается порядком посещения узлов. Обход в ширину также распространён, но относится к другой категории обходов.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={18}
  group="Деревья"
  title="Свойство кучи"
  options={[
    {text: 'Все узлы отсортированы слева направо'},
    {text: 'Корень всегда является наибольшим элементом'},
    {text: 'Все листы находятся на одном уровне'},
    {text: 'Корень — наименьший элемент, а высота O(log n)', isAnswer: true},
  ]}
>
  <slot name="question">
  <div className="question">
    Какие из следующих свойств верны для min-heap?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    В min-heap корень всегда является наименьшим элементом, а высота дерева O(log n), что делает вставку и извлечение эффективными.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={19}
  group="Алгоритмы сортировки"
  title="Стабильность пузырьковой сортировки"
  options={[
    {text: 'Нестабильный'},
    {text: 'Стабильный', isAnswer: true},
    {text: 'Зависит от реализации'},
    {text: 'Ни то, ни другое'},
    {text: 'Сложность определяет стабильность'},
  ]}
>
  <slot name="question">
  <div className="question">
    Алгоритм пузырьковой сортировки стабилен?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Пузырьковая сортировка — стабильный алгоритм сортировки, так как сохраняет относительный порядок равных элементов при сортировке.
  </div>
  </slot>
</Challenge>

</QuizUI>
````
