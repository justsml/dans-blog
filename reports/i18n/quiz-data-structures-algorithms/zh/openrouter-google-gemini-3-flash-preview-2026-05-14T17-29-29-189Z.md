# Translation Candidate
- Slug: quiz-data-structures-algorithms
- Locale: zh
- Model: openrouter/google/gemini-3-flash-preview
- Target: src/content/posts/2024-10-31--quiz-data-structures-algorithms/zh/index.mdx
- Validation: deferred
- Runtime seconds: 80.94
- Input tokens: 17302
- Output tokens: 5664
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- Estimated cost: $0.025643
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
title: 测验：数据结构与算法
subTitle: 你能手撕二叉树吗？
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
  欢迎参加我的数据结构与算法测验！
</section>

本测验将考察你对数据结构（栈、列表、树等）、算法以及时间复杂度的掌握程度。

### 20 道题……开始！

<QuizUI>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={0}
  group="数据结构"
  title="栈与队列"
  options={[
    {text: '两者都是'},
    {text: '队列 (Queues)'},
    {text: '栈 (Stacks)', isAnswer: true},
    {text: '两者都不是'},
  ]}
>
  <slot name="question">
  <div className="question">
    哪种数据结构最适合 LIFO（后进先出）访问模式？
  </div>
  </slot>

  <slot name="hints">
  <div className="hint">
    关注访问模式，而不是结构的名称。正确答案通常取决于哪个元素必须最先或最后被处理。
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    栈 (Stacks) 最适合 LIFO 访问模式。队列 (Queues) 则最适合 FIFO（先进先出）访问模式。
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={1}
  group="算法"
  title="Big O 表示法"
  options={[
    {text: 'O(1)', isAnswer: true},
    {text: 'O(n)'},
    {text: 'O(log n)'},
    {text: 'O(n^2)'},
  ]}
>
  <slot name="question">
  <div className="question">
    无论输入规模如何，运行时间始终保持不变的算法，其时间复杂度是多少？
  </div>
  </slot>

  <slot name="hints">
  <div className="hint">
    关注访问模式，而不是数据结构的名称。正确答案通常取决于必须最先或最后发生的操作。
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    `O(1)` 代表常数时间复杂度。这意味着无论输入规模多大，算法运行所需的时间始终保持不变。
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={2}
  group="数据结构"
  title="链表长度计算"
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
    计算一个单链表的长度，其时间复杂度是多少？
  </div>
  </slot>

  <slot name="hints">
  <div className="hint">
    关注访问模式，而不是结构的名称。正确答案通常取决于必须首先或最后执行的操作。
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    要计算单链表的长度，你必须从头到尾遍历每一个节点，因此其时间复杂度为 O(n)。
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={3}
  group="数据结构"
  title="二叉搜索树查找"
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
    在平衡二叉搜索树（BST）中查找一个元素的平均时间复杂度是多少？
  </div>
  </slot>

  <slot name="hints">
  <div className="hint">
    关注访问模式，而不仅仅是结构的名称。正确答案通常取决于搜索过程中每一步发生了什么。
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    在平衡二叉搜索树中，查找的平均时间复杂度是 O(log n)，因为树的每一层都允许将搜索范围缩小一半。
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={4}
  group="排序算法"
  title="归并排序复杂度"
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
    归并排序（Merge Sort）算法在最坏情况下的时间复杂度是多少？
  </div>
  </slot>

  <slot name="hints">
  <div className="hint">
    观察访问模式，而不仅仅是结构的名称。正确答案通常取决于必须首先或最后发生的操作。
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    归并排序的最坏情况复杂度始终为 O(n log n)，因为它会不断地将数组对半拆分，然后合并已排序的子数组。
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={5}
  group="图论"
  title="DFS 与 BFS"
  options={[
    {text: '队列 (Queue)', isAnswer: true},
    {text: '栈 (Stack)'},
    {text: '优先队列 (Priority Queue)'},
    {text: '哈希表 (Hash Map)'},
    {text: '集合 (Set)'},
  ]}
>
  <slot name="question">
  <div className="question">
    实现广度优先搜索 (BFS) 通常使用哪种数据结构？
  </div>
  </slot>

  <slot name="hints">
  <div className="hint">
    观察访问模式，而不是结构的名称。正确答案通常取决于哪些节点必须先处理，哪些后处理。
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    BFS 使用队列 (Queue) 来逐层探索节点，按照广度优先的方式（按“行”）处理节点。
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={6}
  group="图"
  title="图中的环检测"
  options={[
    {text: '快速排序 (Quick Sort)'},
    {text: '广度优先搜索 (Breadth-First Search)'},
    {text: '归并排序 (Merge Sort)'},
    {text: '深度优先搜索 (Depth-First Search)', isAnswer: true},
    {text: '冒泡排序 (Bubble Sort)'},
  ]}
>
  <slot name="question">
  <div className="question">
    哪种算法通常用于检测有向图中的环？
  </div>
  </slot>

  <slot name="hints">
  <div className="hint">
    观察访问模式，而不是结构的名称。正确答案通常取决于必须先发生什么或最后发生什么。
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    深度优先搜索 (DFS) 通常用于检测图中的环，它通过维护一个递归栈来跟踪已访问的节点。
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={7}
  group="排序算法"
  title="堆排序复杂度"
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
    堆排序（Heap Sort）在最坏情况下的时间复杂度是多少？
  </div>
  </slot>

  <slot name="hints">
  <div className="hint">
    关注访问模式，而不是数据结构的名称。正确答案通常取决于最先或最后必须执行的操作。
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    堆排序在最坏情况下的时间复杂度保持在 O(n log n)，因为它需要先构建一个堆，然后重复提取最大元素并进行堆调整。
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={8}
  group="数据结构"
  title="哈希表时间复杂度"
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
    在哈希表中访问元素的平均时间复杂度是多少？
  </div>
  </slot>

  <slot name="hints">
  <div className="hint">
    关注访问模式，而不仅仅是数据结构的名称。正确答案通常取决于最先或最后必须执行的操作。
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    假设有一个能够最小化冲突的优秀哈希函数，哈希表访问元素的平均时间复杂度为 `O(1)`。
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={9}
  group="数据结构"
  title="栈操作"
  options={[
    {text: 'Push, Pop, Peek', isAnswer: true},
    {text: 'Enqueue, Dequeue, Peek'},
    {text: 'Insert, Search, Delete'},
    {text: 'Traverse, Visit, Sort'},
  ]}
>
  <slot name="question">
  <div className="question">
    哪一组包含通常在栈（stack）上执行的操作？
  </div>
  </slot>

  <slot name="hints">
  <div className="hint">
    观察访问模式，而不是结构的名称。正确答案通常取决于必须最先或最后发生的操作。
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    栈的主要操作是 Push（添加元素）、Pop（移除元素）和 Peek（在不移除的情况下查看顶部元素）。
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={10}
  group="图算法"
  title="最短路径算法"
  options={[
    {text: 'Kruskal 算法'},
    {text: 'Prim 算法'},
    {text: 'Bellman-Ford 算法'},
    {text: 'Dijkstra 算法', isAnswer: true},
    {text: 'Floyd-Warshall 算法'},
  ]}
>
  <slot name="question">
  <div className="question">
    哪种算法通常用于在具有非负权重边的图中查找最短路径？
  </div>
  </slot>

  <slot name="hints">
  <div className="hint">
    关注访问模式，而不是结构的名称。正确答案通常取决于必须首先或最后发生的操作。
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    Dijkstra 算法常用于在具有非负边权的图中查找最短路径。它利用优先队列来高效地确定最短距离。
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={11}
  group="树形数据结构"
  title="自平衡搜索树"
  options={[
    {text: '二叉搜索树和最小堆'},
    {text: 'AVL 树和红黑树', isAnswer: true},
    {text: '最小堆和最大堆'},
    {text: '栈和队列'},
  ]}
>
  <slot name="question">
  <div className="question">
    下列哪组包含自平衡二叉搜索树数据结构的示例？
  </div>
  </slot>

  <slot name="hints">
  <div className="hint">
    观察访问模式，而不仅仅是结构的名称。正确答案通常取决于必须最先或最后发生的操作。
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    AVL 树和红黑树都是自平衡树的类型，它们能确保在每次插入或删除操作后，树依然保持平衡状态。
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={12}
  group="递归"
  title="递归基准情况"
  options={[
    {text: '无限循环'},
    {text: '栈溢出 (Stack Overflow)'},
    {text: '基准情况 (Base Case)', isAnswer: true},
    {text: '全局变量'},
    {text: '作用域限制'},
  ]}
>
  <slot name="question">
  <div className="question">
    在递归函数中，必须定义什么来防止无限递归？
  </div>
  </slot>

  <slot name="hints">
  <div className="hint">
    观察访问模式，而不是结构的名称。正确答案通常取决于必须最先或最后发生的操作。
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    递归函数中必须包含**基准情况 (base case)**，以便在满足特定条件时停止递归调用，从而防止无限递归。
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={13}
  group="数据结构"
  title="队列操作"
  options={[
    {text: 'Enqueue 和 Dequeue', isAnswer: true},
    {text: 'Push 和 Pop'},
    {text: 'Peek 和 Top'},
    {text: 'Traverse 和 Sort'},
  ]}
>
  <slot name="question">
  <div className="question">
    队列的两个主要操作是什么？
  </div>
  </slot>

  <slot name="hints">
  <div className="hint">
    观察访问模式，而不仅仅是结构的名称。正确答案通常取决于必须先发生或最后发生的操作。
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    队列的两个主要操作是 Enqueue（在队尾添加元素）和 Dequeue（从队头移除元素）。
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={14}
  group="图算法"
  title="拓扑排序"
  options={[
    {text: '图必须包含环'},
    {text: '图必须是有权且连通的'},
    {text: '图必须是无向且无环的'},
    {text: '图必须是有向无环图', isAnswer: true},
  ]}
>
  <slot name="question">
  <div className="question">
    对一个图进行拓扑排序的先决条件是什么？
  </div>
  </slot>

  <slot name="hints">
  <div className="hint">
    观察访问模式，而不是结构的名称。正确答案通常取决于哪些操作必须先执行或后执行。
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    只有当图是有向无环图（DAG）时，才能进行拓扑排序。这种排序在任务调度问题中非常有用。
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={15}
  group="动态规划"
  title="斐波那契递归复杂度"
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
    斐波那契数列的朴素递归实现的时间复杂度是多少？
  </div>
  </slot>

  <slot name="hints">
  <div className="hint">
    观察访问模式，而不是结构的名称。正确答案通常取决于必须先发生或最后发生的操作。
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    斐波那契数列的朴素递归实现的时间复杂度为 O(2^n)，这是因为在计算每个斐波那契数时存在大量的重复计算。
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={16}
  group="数据结构"
  title="优先队列的实现"
  options={[
    {text: '数组 (Array)'},
    {text: '栈 (Stack)'},
    {text: '堆 (Heap)', isAnswer: true},
    {text: '队列 (Queue)'},
    {text: '链表 (Linked List)'},
  ]}
>
  <slot name="question">
  <div className="question">
    哪种数据结构通常被用来实现优先队列？
  </div>
  </slot>

  <slot name="hints">
  <div className="hint">
    关注访问模式，而不是结构的名称。正确答案通常取决于必须最先或最后执行的操作。
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    优先队列最常使用堆（heap）来实现，因为它能高效地提取最高或最低优先级的元素。
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={17}
  group="数据结构"
  title="二叉树遍历"
  options={[
    {text: '中序遍历、前序遍历、后序遍历', isAnswer: true},
    {text: '广度优先、深度优先、堆化'},
    {text: '排序、搜索、旋转'},
    {text: '入栈、出栈、查看栈顶'},
  ]}
>
  <slot name="question">
  <div className="question">
    下列哪一组列出了二叉树常用的深度优先遍历顺序？
  </div>
  </slot>

  <slot name="hints">
  <div className="hint">
    观察访问模式，而不是结构的名称。正确答案通常取决于必须先执行什么或最后执行什么。
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    中序（In-order）、前序（Pre-order）和后序（Post-order）是二叉树的三种常用深度优先遍历顺序，每种方式访问节点的顺序各不相同。广度优先遍历也很常用，但它属于不同的遍历类别。
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={18}
  group="树形数据结构"
  title="堆属性"
  options={[
    {text: '所有节点从左到右排序'},
    {text: '根节点始终是最大的元素'},
    {text: '所有叶子节点都在同一层'},
    {text: '根节点是最小的元素，且高度为 O(log n)', isAnswer: true},
  ]}
>
  <slot name="question">
  <div className="question">
    下列关于最小堆（min-heap）的属性中，哪项是正确的？
  </div>
  </slot>

  <slot name="hints">
  <div className="hint">
    观察其访问模式，而不仅仅是结构的名称。正确答案通常取决于必须最先或最后发生的操作。
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    在最小堆中，根节点始终是最小的元素，且树的高度为 O(log n)，这使得插入和提取操作非常高效。
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={19}
  group="排序算法"
  title="冒泡排序的稳定性"
  options={[
    {text: '不稳定的'},
    {text: '稳定的', isAnswer: true},
    {text: '取决于具体实现'},
    {text: '都不是'},
    {text: '复杂度决定稳定性'},
  ]}
>
  <slot name="question">
  <div className="question">
    冒泡排序（Bubble Sort）算法是稳定的吗？
  </div>
  </slot>

  <slot name="hints">
  <div className="hint">
    观察访问模式，而不是结构的名称。正确答案通常取决于必须先发生什么或最后发生什么。
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    冒泡排序是一种稳定的排序算法，因为它在排序过程中会保留相等元素的相对顺序。
  </div>
  </slot>
</Challenge>

</QuizUI>
````
