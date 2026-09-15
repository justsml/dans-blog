# Russian quiz corpus review

Reviewed 2026-09-14: all 19 Russian quiz translations, 267 questions and 1,231 choices. Reviewed every question, answer set, explanation and hint against the current English source. Final Russian MDX was edited directly; historical translation scores and sourceHash frontmatter were not relabeled. No external AI judge was called.

## Changes

Final source alignment: Date Q6 now describes `toLocaleFormat` as nonstandard without inventing library history; Regex Q15 accepts Unicode-aware `u` or `v` mode.

- Restored literal program outputs in Bash, Node Transform, destructuring, ESNext and Error.cause/template strings. Preserved case-sensitive distractors and JavaScript tokens. Replaced HTML entities inside Rust code with the source's real braces; these entities had changed the programs.
- Applied source corrections for Buffer allocation and object mode, SQL correlation and partial indexes, DynamoDB batching/capacity, S3 consistency, Promise recovery, HTML dd/figure, DSA uniqueness, CSS alignment and root-font assumptions, Date formatting/timezone assumptions, and Rust RefCell behavior.
- Fixed non-NULL being translated as nonzero: COUNT counts zero but ignores NULL. Corrected look-ahead/look-behind direction, BigInt base-36 wording, and the parseInt prefix comparison table.
- Restored 44 difficulty/objective sets (118 Russian objectives), missing hint slots, article introductions/headings and references. Replaced missing generic ESNext/DSA hints with concise question-specific Russian hints. Added Russian prose explaining the Promise diagram.
- Standardized Rust lifetime to время жизни, borrowing to заимствование and ownership to владение. Corrected failover to переключение при сбое and encryption at rest/in transit to при хранении/передаче.

## Terminology evidence

The Russian [Visualizing Promises article](../../../src/content/posts/2018-09-30--visualizing-promises/ru/index.mdx) uses промис and колбэк (lines 16–28), retaining Promise and .then as identifiers. This review follows that distinction. The Russian [foreign-key article](../../../src/content/posts/2025-12-29--your-foreign-keys-are-killing-performance/ru/index.mdx) uses внешние ключи, индекс and ограничения (lines 14–40, 61), matching the SQL quiz terminology. Within the Rust corpus, время жизни consistently describes lifetime; жизненный цикл remains appropriate for S3 lifecycle, a different concept. Literal outputs remain in the language printed by the unchanged example, with Russian explanations surrounding them.

## Verification

All 19 files compile directly with MDX. The scoped corpus regression test passes 19/19 tests (including nonempty source-slot and per-option-hint coverage). All 267 questions have distinct, nonempty choices, unchanged option counts and correct-answer positions. Current structural comparison and translation-integrity checks report zero issues for all 19 files. Code fences match current sources modulo whitespace. Lazy hydration remains intact. Source and target SHA-256 hashes and per-question answers are retained in ru-evidence.json.

This is a semantic/source review plus local parsing/compilation verification. It does not claim execution of AWS/PostgreSQL operations or a separate Russian browser run. The parent task owns the full Playwright selection/rendering regression suite.

## Per-question answer audit

Choice positions are one-based. The ledger records the reviewed semantic answer, not independent execution of every example.

### javascript-promises-quiz

English SHA-256: `ead6cb486ce9cef02d253b30715e77820dde44c9a310546a0532e7164078dd5a`

Russian SHA-256: `2f5cf8f05fa2b8def186aee85ad88a4eedc79602ff97ba23f8e9e489bf61e7d5`

| Question | Correct choice | Reviewed answer |
|---|---:|---|
| 1: Несколько `.catch`'ов #1 | 2 | вывести сообщение два раза |
| 2: Несколько `.catch`'ов #2 | 3 | необработанный отклонённый промис |
| 3: Цепочка `.then` и `.catch` | 1 | вывести ошибку и `undefined` |
| 4: Цепочка `.catch`'ов | 1 | вывести сообщение об ошибке один раз |
| 5: Несколько `.catch`'s | 4 | ничего не выводится |
| 6: Поток между `.then`'s | 3 | вывести "SUCCESS!" |
| 7: Поток между `.then`'s | 3 | вывести "SUCCESS!" и "SUCCESS!" |
| 8: Поток между `.then`'s | 4 | выводит `undefined` |
| 9: Поток между `.then` и `.catch` | 3 | вывести "The fails!" |

### js-quiz-14-date-time-questions-test-your-knowledge

English SHA-256: `ec43802cb19367d4f6404bcba2d9de192622f887999917d08f48645c5e3bd04d`

Russian SHA-256: `635c3af0808a8ebcecc1100e24678402038af39bfa87fed77e5d402c9415a556`

| Question | Correct choice | Reviewed answer |
|---|---:|---|
| 1: Конструктор Date Часть 1 | 2 | Feb 01 2020 |
| 2: Конструктор Date Часть 2 | 1 | Jan 01 2020 |
| 3: Конструктор Date Часть 3 | 4 | Текущая дата |
| 4: Конструктор Date Часть 4 | 1 | 1969 |
| 5: Разбор строк даты | 1 | 2019 2020 |
| 6: Форматирование Часть 1 | 2 | date.toLocaleFormat('en-US') |
| 7: UTC‑даты Часть 1 | 3 | TypeError |
| 8: UTC‑даты Часть 2 | 3 | Миллисекунды с 1 января 1970 г. GMT |
| 9: UTC‑даты Часть 3 | 2 | 420 |
| 10: Установщики даты Часть 1 | 1 | Jan 01 2020 |
| 11: Установщики даты Часть 2 | 2 | Feb 01 2020 |
| 12: Сеттеры даты Часть 3 | 2 | 01 янв 2021 |
| 13: Установщики даты Часть 4 | 4 | 01 фев 2021 |
| 14: Сеттеры даты Часть 5 | 4 | 01 дек 2019 |

### quiz-advanced-js-error-mastery

English SHA-256: `e00c048b44ae6dec4bee8aedf31356a8c002564399f9e3525175ace3b2fe3bbb`

Russian SHA-256: `2b7c1e3f06ca410e9c75453400991dee529889c68c885f43a825bfac79bde16e`

| Question | Correct choice | Reviewed answer |
|---|---:|---|
| 1: Тайна пустого объекта | 2 | {} |
| 2: Консоль vs JSON | 2 | console.log показывает больше информации |
| 3: Наследование instanceof | 1 | true, true, true |
| 4: instanceof между фреймами | 3 | Может быть false между фреймами |
| 5: Бросок строки | 2 | false, "string" |
| 6: Свойство name ошибки | 2 | "CustomError" |
| 7: Подводный камень имени конструктора | 2 | "Error" |
| 8: Современный Error.cause | 1 | "Original error" |
| 9: Манипуляция стеком | 1 | Удаляет createError из стека |
| 10: Шаблонные строки в ошибках | 2 | "Value undefined is invalid" |
| 11: Ошибка ответа Express | 2 | Отправляет {"error":{}} |
| 12: Значения отклонения Promise | 2 | Любое значение может быть отклонением |
| 13: Нестандартные свойства | 2 | Может отсутствовать в некоторых средах |
| 14: Объект vs Обнаружение Ошибки | 2 | false, false |

### quiz-bash-in-the-shell

English SHA-256: `ea4b4440293b28444b461e783c6f33db1a9d797e64fa8a5987034d8dada9f631`

Russian SHA-256: `8e497f8017826015403c87407436a3ffa1a2e44b844027ea96c11a6561d478a7`

| Question | Correct choice | Reviewed answer |
|---|---:|---|
| 1: Объявление переменной | 2 | name=Dan |
| 2: Экранирование кавычек | 3 | echo 'It'\''s 🔨 Time!' |
| 3: Команда echo | 2 | cat cbt |
| 4: Экранирование символов | 4 | Cost: 00 |
| 5: Заменитьподстроку | 3 | Bark meow |
| 6: Длина строки | 3 | ${#username} |
| 7: Базовый If-Else | 2 | File does not exist, после диагностического сообщения проверки |
| 8: Сравнение строк | 2 | Different cats, после синтаксической ошибки проверки |
| 9: Объявление функции | 1 | Hi |
| 10: Использование конвейера | 3 | &#124; |
| 11: Базовая арифметика | 4 | echo $(( 2 + 2 )) |
| 12: Базовая арифметика | 6 | echo '10 * 0.5' &#124; bc |
| 13: Извлечение подстроки | 3 | good cat |
| 14: Циклы в Bash | 2 | each |
| 15: Подстановка команд | 4 | $(ls -l) |
| 16: Значения по умолчанию | 3 | 2>&1 |

### quiz-can-you-count-to-bigint

English SHA-256: `f7af3ca5f8ef55272d24882cc3612f0492277f3ce73ad21ddc7a952a7f4d6a8e`

Russian SHA-256: `72f6a7ce8d925b3ee5bcf969fa7ff56e020629d69a1f73fe6f21d66bf4c4b6a8`

| Question | Correct choice | Reviewed answer |
|---|---:|---|
| 1: Парсинг с `parseInt` | 1 | 123456 |
| 2: Обработка запятой | 1 | 123 |
| 3: Точность с плавающей запятой | 2 | false |
| 4: Обработка бесконечности | 1 | Infinity |
| 5: Преобразование строки с помощью `.toFixed()` | 5 | "5.00" |
| 6: Сравнение равенства `parseInt` и `parseFloat` | 1 | true |
| 7: Сравнение на равенство с BigInt | 3 | false |
| 8: Разбор шестнадцатеричных чисел | 1 | true |
| 9: Парсинг с основанием | 1 | 255 |
| 10: Использование `.map(parseInt)` | 1 | [24, NaN, NaN] |
| 11: Использование `.map(Number)` | 1 | [24, NaN, 34] |
| 12: Обработка null | 4 | NaN 0 |
| 13: Парсинг в системе счисления | 5 | 1112745 |

### quiz-css-core-fundamentals

English SHA-256: `ee5866dcab74b29fcaf99765c78fd8c474d51fbd357ed07af1c02059c59d81c7`

Russian SHA-256: `4f331039fd9daa8b4a1d94911fd6f4ae68d5b8b6f1c21f7fb310f0937749804c`

| Question | Correct choice | Reviewed answer |
|---|---:|---|
| 1: Недопустимая единица CSS для размера шрифта | 1 | 10cx |
| 2: Шестнадцатеричные коды | 3 | #ABCD |
| 3: Ой, все единицы! | 14 | rel |
| 4: Соответствие селекторов HTML‑элементам | 4 | a#home[name='home'] |
| 5: Селектор атрибута для кнопки | 4 | button[onclick] |
| 6: Недопустимый CSS‑селектор | 3 | c > > d {} |
| 7: Выбор последней ссылки | 5 | a:last-child |
| 8: Приоритет селекторов | 3 | a#quote |
| 9: Центрирование текста в блочном элементе | 4 | text-align: center; |
| 10: Центрирование блочного элемента по вертикали | 3 | align-content: center; |
| 11: Вычисление пиксельного размера вложенных шрифтов | 2 | 5px |
| 12: Вычисление размера в пикселях с помощью REM | 2 | 12px |
| 13: Вычисление размера в пикселях с помощью EM | 5 | 24px |
| 14: Селекторы с нулевой специфичностью | 1 | :where(.card) .title |

### quiz-data-structures-algorithms

English SHA-256: `bbe16f991f17d61caaf6a3d510caa7d4dd771d1113bbbdd157319831abc66dd7`

Russian SHA-256: `e589362dc297f523ddf9eb401016a5fba9d289562289b2fe9f2cffb74d2d329d`

| Question | Correct choice | Reviewed answer |
|---|---:|---|
| 1: Стек vs Очереди | 3 | Стек |
| 2: Нотация Большого О | 1 | O(1) |
| 3: Вычисление длины связного списка | 4 | O(n) |
| 4: Поиск в бинарном дереве поиска | 2 | O(log n) |
| 5: Сложность Merge Sort | 3 | O(n log n) |
| 6: DFS vs BFS | 1 | Очередь |
| 7: Обнаружение циклов в графах | 4 | Поиск в глубину (DFS) |
| 8: Сложность сортировки кучей | 2 | O(n log n) |
| 9: Временная сложность хеш‑таблицы | 3 | O(1) |
| 10: Операции со стеком | 1 | Push, Pop, Peek |
| 11: Алгоритм кратчайшего пути | 4 | Алгоритм Дейкстры |
| 12: Самобалансирующиеся поисковые деревья | 2 | AVL‑дерево и красно‑черное дерево |
| 13: Базовый случай рекурсии | 3 | Базовый случай |
| 14: Операции очереди | 1 | Enqueue и Dequeue |
| 15: Топологическая сортировка | 4 | Граф должен быть ориентированным и ациклическим |
| 16: Сложность рекурсии Фибоначчи | 2 | O(2^n) |
| 17: Реализация приоритетной очереди | 3 | Куча |
| 18: Обходы бинарного дерева | 1 | In-order, Pre-order, Post-order |
| 19: Свойство кучи | 4 | Корень — наименьший элемент, а высота O(log n) |
| 20: Стабильность пузырьковой сортировки | 2 | Устойчива |

### quiz-destructuring-delights

English SHA-256: `0aa930822ea8a6b38914c30bcdb73e22de3e8910a0f92e5f0f6ab8c090fabd4d`

Russian SHA-256: `64608aafc67154039c7db82c478c50a31ec96089e821e163a6cda0d869ef2561`

| Question | Correct choice | Reviewed answer |
|---|---:|---|
| 1: Базовое деструктурирование объектов | 4 | Name: Dan Levy, Age: undefined |
| 2: Значение по умолчанию в деструктуризации объекта | 3 | Name: Dan Levy, Age: undefined |
| 3: Вложенная деструктуризация | 5 | Ошибка |
| 4: Значения по умолчанию в деструктуризации объектов | 5 | Ошибка |
| 5: Значения по умолчанию в деструктуризации объектов | 3 | Hi Dan from Unknown |
| 6: Деструктуризация параметров функции с значениями по умолчанию | 6 | Ошибка |
| 7: Деструктуризация с вложенными значениями по умолчанию | 6 | N/A, N/A, Joburg |
| 8: Деструктуризация с вложенными значениями по умолчанию | 6 | null, N/A |
| 9: Деструктуризация с вложенными значениями по умолчанию | 5 | Ошибка TypeScript |
| 10: Деструктуризация с вложенными значениями по умолчанию | 5 | Denver |
| 11: Деструктуризация с вложенными значениями по умолчанию | 3 | Ошибка: Свойства 'birth' и 'age' отсутствуют |
| 12: Деструктуризация с вложенными значениями, присваиванием и типами | 5 | Ошибка |

### quiz-do-you-know-esnext

English SHA-256: `63cd3ddef63907f8281b7060db5b8004bf7bac2067f84fcdf01ca8bd8b18c3fb`

Russian SHA-256: `51dd7b3db0f8f47d99a9e3cf8af4e58c93bb66eee14796c85a305c1f613079d5`

| Question | Correct choice | Reviewed answer |
|---|---:|---|
| 1: Оператор объединения с null | 4 | 100 |
| 2: Оператор объединения с null | 1 | false |
| 3: Опциональная цепочка | 1 | undefined |
| 4: Использование BigInt | 3 | 84n |
| 5: Синтаксис динамического импорта | 4 | object |
| 6: Promise.allSettled | 1 | fulfilled: success |
| 7: Использование String.matchAll | 2 | Итератор совпадений |
| 8: Использование import.meta | 1 | URL текущего модуля |
| 9: Логическое присваивание | 2 | 10 |
| 10: Логическое присваивание nullish | 2 | 10 |
| 11: Использование WeakRef | 2 | { data: 'important' } |

### quiz-in-the-aws-cloud

English SHA-256: `8f073f151596d04141eec7cd5a1517d350fc7a7ebb7a42725eac544d8cb8dba9`

Russian SHA-256: `33ee033a6ee7d676f3a96ae5d3e0cc0d4e884e2210d0414b076ddd4c3461fde3`

| Question | Correct choice | Reviewed answer |
|---|---:|---|
| 1: Викторина S3 | 3 | Simple Storage Service |
| 2: DynamoDB | 1 | Хранить произвольные свойства |
| 3: DynamoDB | 4 | UpdateItem |
| 4: Продвинутые функции поиска | 2 | OpenSearch |
| 5: Развертывание Multi-AZ | 3 | Обеспечивает автоматическое переключение |
| 6: Мастерство WebSocket | 1 | API Gateway |
| 7: Политика корзины S3 | 4 | Применять принцип наименьших привилегий |
| 8: Aurora Serverless | 2 | Автоматически масштабирует вычислительные ресурсы |
| 9: Ограничения BatchGetItem | 3 | 100 |
| 10: Пакетные операции | 1 | 1 |
| 11: Provisioned vs On-Demand Capacity | 4 | On-demand позволяет не резервировать пропускную способность для редкого непредсказуемого трафика |
| 12: Оптимизация производительности S3 | 2 | Использовать логические префиксы; рандомизация не требуется |
| 13: Стратегия резервного копирования RDS | 3 | Автоматические резервные копии с восстановлением в конкретный момент |
| 14: Redis vs Memcached | 1 | Redis поддерживает больше структур данных и операций |
| 15: Глобальный вторичный индекс | 4 | Позволяет выполнять запросы по атрибутам, не являющимся первичными |
| 16: Управление жизненным циклом S3 | 2 | Автоматически переводить объекты между классами хранения |
| 17: Масштабирование чтения с Amazon Aurora | 3 | Поддерживает до 15 реплик чтения |
| 18: Шифрование RDS | 1 | Шифровать данные при хранении и передаче |
| 19: Назначение DynamoDB Streams | 4 | Отслеживать изменения на уровне элементов для событийно‑ориентированных архитектур |
| 20: Передача больших файлов | 2 | Использовать Multipart Upload для больших файлов |
| 21: Анализ стоимости хранения | 3 | Смешивать классы хранилища в зависимости от шаблонов доступа |
| 22: Модели согласованности | 1 | 100 чтений в секунду |
| 23: Механизм отказа Aurora | 4 | Автоматическое повышение на основе приоритета переключения при сбое |
| 24: S3 сильная согласованность | 2 | Строгая согласованность чтения после записи для объектов, удалений и списков |
| 25: Время жизни (TTL) | 3 | Фоновое удаление с попыткой соблюдения времени |
| 26: Поведение масштабирования | 1 | Скорость масштабирования зависит от текущей и настроенной емкости |

### quiz-is-your-memory-rusty

English SHA-256: `e31e6449bc819ea5691b0d41998b3052afe28378c4dbe0bab4551abe753c2f9c`

Russian SHA-256: `58feb6e87e6a76f7065522f78fdb0e5867b4d2fce3dcdf5dddff20dada4bdc67`

| Question | Correct choice | Reviewed answer |
|---|---:|---|
| 1: Основы семантики перемещения | 5 | Ошибка компиляции: значение использовано после перемещения |
| 2: Семантика перемещения с функциями | 3 | Ошибка компиляции |
| 3: Изменяемые ссылки | 2 | Ошибка: нельзя заимствовать `wisdom` как изменяемый более одного раза |
| 4: Неявные времена жизни | 1 | Успешно компилируется |
| 5: Умный указатель Box | 3 | Ошибка компиляции |
| 6: Указатель Rc | 3 | Reference count: 3 |
| 7: Жизненные циклы структур | 2 | Ошибка: отсутствует спецификатор времени жизни |
| 8: Аннотации времени жизни | 2 | Ошибка: отсутствует спецификатор времени жизни |
| 9: Поведение RefCell | 2 | Паника во время выполнения: RefCell уже заимствован |
| 10: Cell против RefCell | 1 | Выведет: 42, 43 |
| 11: Понимание Rc | 1 | Rc используется в однопоточных средах |
| 12: RefCell и потоки | 4 | RefCell не реализует Sync; RwLock обеспечивает синхронизированный доступ |
| 13: Arc и Mutex | 5 | Взаимная блокировка или паника |
| 14: Слабые ссылки | 2 | Prints: None |
| 15: RAII паттерн | 1 | Ресурс освобождается после выхода из области видимости |
| 16: Копирование vs Клонирование | 2 | Создана глубокая копия |
| 17: Оптимизация памяти | 3 | 32 байта |
| 18: Нулевые затраты абстракций | 2 | Код с итератором может быть столь же эффективным, как ручной цикл |

### quiz-js-interfaces-symbols-and-enumerables

English SHA-256: `c31ed61019199a9690cb1c1f02182365a0ddb2c7c99eb9ad49da340c96dd83f9`

Russian SHA-256: `eb229d7177e0c004bb5c7b3a26d6a4a9f36b40bca39f70805da608c842fe2121`

| Question | Correct choice | Reviewed answer |
|---|---:|---|
| 1: Геттер vs Прямой доступ к свойству | 3 | Получить значение напрямую |
| 2: Использование Symbol в ключах объектов | 1 | Использование Symbol |
| 3: Перечислимые свойства | 4 | Да, он будет перечислен |
| 4: Перечисляемость по умолчанию при использовании Object.defineProperty() | 2 | false |
| 5: Уникальные символы | 3 | false |
| 6: Символы как не‑перечислимые ключи | 1 | Нет, он не будет перечислен |
| 7: Получить все Symbol‑ключи | 4 | Object.getOwnPropertySymbols() |

### quiz-master-modern-html5

English SHA-256: `9320d673f59fafb3da0b9c01736b3b54a103301210b176a3e5c5c78e771b7b74`

Russian SHA-256: `b994188faf969c2f0349a5638b53d46ddd71d0c2bb4e642ac8a5d3d21f418439`

| Question | Correct choice | Reviewed answer |
|---|---:|---|
| 1: Роль `<ul>` | 1 | Неупорядоченный список |
| 2: Использование `<dd>` | 4 | Описание, определение или значение термина в списке описаний |
| 3: Использование `<figure>/<figcaption>` | 2 | Группировка самодостаточного содержимого с подписью |
| 4: Использование `<article>` | 2 | Самостоятельный раздел контента |
| 5: Использование `<fieldset>/<legend>` | 1 | Группировка элементов формы под общим заголовком |
| 6: Назначение `<meter>` | 2 | Отображение числового значения в заданном диапазоне |
| 7: Использование `<source>` | 2 | Объявляет доступные форматы медиафайлов |
| 8: Использование `<hgroup>` | 4 | Для группировки заголовка с его подзаголовком |
| 9: Использование `<menu>` | 2 | Для перечисления команд или элементов панели инструментов |
| 10: Роль элементов `<details>/<summary>` | 1 | Нативный сворачиваемый контент |
| 11: Назначение элемента `<dialog>` | 2 | Объявление модального или всплывающего окна |
| 12: Использование `<time>` | 1 | Для представления даты и времени |
| 13: Назначение атрибутов ARIA | 2 | Улучшение доступности |
| 14: Использование атрибута `role` | 2 | Для описания назначения элемента |

### quiz-modern-css-2025

English SHA-256: `7254e27e26db35a72ca971a9fce8ae96d3cba30163bc6958ec3118e52e39704b`

Russian SHA-256: `e6f5c543092a3789e98268136d910f1c3a59afb268cbe597fe8135517c5a1188`

| Question | Correct choice | Reviewed answer |
|---|---:|---|
| 1: Использование CSS-переменных | 3 | background-color: var(--main-color); |
| 2: Функция CSS min() | 2 | width: 200px; |
| 3: Функция CSS max() | 5 | width: 96px; |
| 4: Функция CSS minmax() | 3 | Первый столбец будет от 100px до 200px |
| 5: Резервные значения CSS-переменных | 4 | #6b8e23 |
| 6: Использование clamp() для адаптивного дизайна | 3 | Линейное масштабирование между 200px и 500px |
| 7: Нативная вложенность CSS | 3 | Да |
| 8: Вложенность CSS | 4 | Идеально. Без замечаний. |
| 9: Прямой селектор дочерних элементов с вложенностью | 2 | background-color: white |
| 10: Изменение CSS-переменной во время выполнения | 2 | С помощью JavaScript |
| 11: Использование calc() с CSS-переменными | 3 | Ширина: 110px |

### quiz-nodejs-files-streams-buffers-oh-my

English SHA-256: `77b0246b9c8275d11d3ca3108732512ae203d0d5f45f379aeb5166c248928930`

Russian SHA-256: `c03e9258cdc8c423011fb2ae98ec4fa153f9274fd8d7dfe3ed46ccfb0ba60081`

| Question | Correct choice | Reviewed answer |
|---|---:|---|
| 1: Выделение буфера | 1 | Создаёт Buffer размером 5, заполненный нулями |
| 2: Преобразование буфера в строку | 1 | A |
| 3: Асинхронные файловые операции | 2 | Сначала выводит "Done", затем содержимое файла |
| 4: Чтение файлов синхронно | 1 | Возвращает Buffer |
| 5: События потока | 1 | 'data', 'end', 'error', 'close' |
| 6: Потоковое конвейерирование | 2 | Копирует файл по частям, не буферизуя его целиком |
| 7: Операции с каталогами | 1 | Создаёт вложенные каталоги при необходимости |
| 8: Трансформирующие потоки | 2 | HELLO WORLD |
| 9: Отслеживание файлов | 2 | Не гарантировано; может сработать несколько раз |
| 10: Сравнение буферов | 2 | false |
| 11: Обратное давление в потоках | 1 | Предотвращает переполнение памяти |
| 12: Символические ссылки | 3 | Создаёт символическую ссылку |
| 13: Режимы потоков | 3 | Оба режима |
| 14: Файловые дескрипторы | 1 | Число |
| 15: Кодировка буфера | 5 | 10 |

### quiz-postgres-sql-mastery-pt1

English SHA-256: `8cb97e01f93954cd744f660f427ef83528e228aef5df6c5bdeae527f140c09b6`

Russian SHA-256: `29ae22968d647468ff6a73e48e0b31d9cfa415c372fd89cfa1ed79afdd877232`

| Question | Correct choice | Reviewed answer |
|---|---:|---|
| 1: Встроенные агрегаты | 4 | MEDIAN |
| 2: Вариации синтаксиса приведения | 3 | CAST('95', INTEGER) |
| 3: UNIQUE‑ограничения и NULL | 3 | Разрешено несколько NULL |
| 4: Арифметика дат | 4 | 2024-11-28 00:00:00 |
| 5: timestamptz против timestamp | 1 | Они оба занимают 8 байт, но представляют разные семантики меток времени |
| 6: Определите недопустимый тип | 4 | STRING(100) |
| 7: Определите недопустимый тип | 6 | decimal128 |
| 8: Определите недействительный тип | 3 | ipv4 |
| 9: Определите недействительные типы | 4 | currency |
| 10: Определите недействительный тип | 6 | triangle |
| 11: Переполнение целого числа | 2 | Ошибка: целое число вне диапазона |
| 12: Точность timestamp | 4 | 2024-01-08 13:30:00.1234567 |
| 13: Определите недействительный тип | 5 | tsrank |
| 14: Время проверки ограничения | 1 | Сразу для новых или изменённых строк |

### quiz-postgres-sql-mastery-pt2

English SHA-256: `442e06417de424ae712b9a4016865482fd1050ef479a9719f3c28d4709b2d808`

Russian SHA-256: `a61b100feed5d7e535a75e58bdccb7a1ca649a8129cda5c2436fe5daf25726af`

| Question | Correct choice | Reviewed answer |
|---|---:|---|
| 1: Множество JOIN в PostgreSQL | 1 | JOIN ALL |
| 2: Современный способ автоинкремента | 5 | id BIGINT GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY |
| 3: Соответствие стандартам | 4 | RETURNING |
| 4: Автоматический откат | 2 | Откатывает все инструкции |
| 5: Применимость Hash Join | 1 | ON a.id = b.id |
| 6: Порядок колонок в составном индексе | 1 | CREATE INDEX ON students(grade_level, last_name); |
| 7: Правильное использование кавычек | 2 | Требуются двойные кавычки |
| 8: Экранирование имен столбцов | 2 | "first.name" |
| 9: Синтаксис TABLESAMPLE | 8 | WHERE RANDOM() >= 0.9 |
| 10: Частичные индексы | 3 | Индексирует только активных студентов |
| 11: COUNT и NULL | 4 | 1 |
| 12: Ловушка EXPLAIN ANALYZE | 3 | Изменяет данные и выводит план |

### quiz-regex-or-wreckage

English SHA-256: `0b087416a4feeb151ae3aaa3f19d785b8edc4860522fe150845f43141d7444e9`

Russian SHA-256: `1974d1ec3f40fd3f9eb2098d09409c107ca9de40dff570632be2aa69c631db50`

| Question | Correct choice | Reviewed answer |
|---|---:|---|
| 1: С учётом регистра | 3 | ["cat"] |
| 2: Простое сопоставление символов | 1 | ["cat", "hat"] |
| 3: Жадный vs Нежадный | 4 | ["<div>Hello</div>", "<div>World</div>"] |
| 4: Метасимвол Точка | 2 | ["hello", "world"] |
| 5: Положительный просмотр вперёд | 5 | null |
| 6: Границы слов | 2 | ["cat"] |
| 7: Глобальный флаг | 3 | ["a", "a", "a"] |
| 8: Отрицательное обратное просмотр | 3 | ["23", "456"] |
| 9: Группы захвата | 2 | ["2029", "12", "31"] |
| 10: Отрицательное просмотр вперёд | 4 | ["12"] |
| 11: Разделение с Look-behind | 1 | ["a,", "b,", "c"] |
| 12: Экранирование специальных символов | 4 | null |
| 13: Положительный просмотр назад | 2 | ["100"] |
| 14: Жадные и ленивые квантификаторы | 2 | ["bold"] |
| 15: Unicode Flag | 2 | ["😀", "🙂"] |
| 16: Проверка пароля | 2 | "Sass123!" |

### quiz-sql-query-fundamentals

English SHA-256: `4788ec9e33c53b4fb819c0e7e472f3a737b497b83add5049de127d7dcc4b32ad`

Russian SHA-256: `81277cfe759e07b09568ffc9e77396e6c41dc6038ea36137fcbc29278f028251`

| Question | Correct choice | Reviewed answer |
|---|---:|---|
| 1: Базовый оператор WHERE | 2 | SELECT * FROM users WHERE name = 'John'; |
| 2: Агрегатная функция COUNT | 2 | Считает только значения столбца, отличные от NULL |
| 3: Основы LEFT JOIN | 2 | Возвращает все строки из левой таблицы и совпадающие строки из правой |
| 4: Использование INNER JOIN | 3 | Возвращает строки, удовлетворяющие условию соединения в обеих таблицах |
| 5: Коррелированный подзапрос | 4 | Подзапрос, ссылающийся на столбцы внешнего запроса |
| 6: Синтаксис предложения WITH | 4 | Определение временного набора результатов для использования в более крупном SQL‑запросе |
| 7: IS NULL vs IS NOT NULL | 1 | Проверяет, является ли значение NULL |
| 8: Использование оператора IN | 4 | Возвращает строки, соответствующие значениям в указанном списке |
| 9: Использование функции COALESCE | 3 | Возвращает первый не‑NULL аргумент |
| 10: Использование GROUP BY | 4 | Группирует строки по указанным столбцам |
| 11: Основы FULL OUTER JOIN | 5 | Возвращает все строки из обеих таблиц, заполняя NULL для несоответствующих строк |
