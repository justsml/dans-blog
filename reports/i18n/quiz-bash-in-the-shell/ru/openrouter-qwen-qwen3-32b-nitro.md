# Translation Candidate
- Slug: quiz-bash-in-the-shell
- Locale: ru
- Model: openrouter/qwen/qwen3-32b:nitro
- Target: src/content/posts/2024-11-20--quiz-bash-in-the-shell/ru/index.mdx
- Validation: deferred
- Runtime seconds: 136.15
- Input tokens: 14386
- Output tokens: 17515
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- Estimated cost: $0.005354
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
unlisted: false
title: 'Тест: Bash и Shell мастерство'
subTitle: Умеете ли вы говорить с компьютерами? Хорошо?
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
import Challenge from '../../../../../components/QuizUI/Challenge';
import QuizUI from '../../../../../components/QuizUI/QuizUI';

<p class="inset">Проверьте свои навыки написания сценариев Bash с помощью этих 16 вопросов!</p>

Включает переменные, циклы, условные конструкции, манипуляции со строками, функции и синтаксические подводные камни от простых до сложных.

Улучшите (или докажите) свои навыки написания сценариев оболочки!

<QuizUI>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={0}
  group="Разминка"
  title="Объявление переменных"
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
    Как определяются переменные в Bash?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Переменные в Bash объявляются без пробелов вокруг знака `=`. Например:
    ```bash
        name=Alice
    ```
    Это присваивает значение `"Alice"` переменной `name`.

    Примечание: `$name` используется для **ссылки** или чтения значения переменной.

    Добавление пробелов заставляет оболочку интерпретировать команду как программу для запуска, что не нужно при установке переменной.

    Также Bash чувствителен к регистру, поэтому `name`, `NAME` и `Name` — разные переменные.

    Наконец, в именах переменных не могут быть пробелы или дефисы (`-`). Используйте подчеркивания (`_`) или camelCase вместо этого.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={1}
  group="Разминка: Использование"
  title="Использование кавычек"
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
    Какая команда выведет `It's 🔨 Time!`?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Понимаю. Как быстро экранирование делает строки сложными для анализа. Представьте, как экранировать другие языки в строках Bash — там же куча кавычек, апострофов и `$`-символов, которые могут всё испортить. 🫠

    Одиночные кавычки нужно экранировать внутри одиночно-закавыченных строк. Последовательность закрытие-кавычки, экранированная-кавычка, открытие-кавычки (`'\''`) позволяет вывести:
    ```plaintext
        It's 🔨 Time!
    ```
    Существуют и другие способы, но это самый распространённый.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={2}
  group="Разминка: Расширение"
  title="Команда echo"
  options={[
    {text: 'cat cab'},
    {text: 'cat cbt', isAnswer: true},
    {text: 'ca bt'},
    {text: 'cat'},
    {text: 'cbd'},
    {text: 'Ошибка'},
  ]}
>
  <slot name="question">
  <div className="question">
    Какой вывод будет у этой команды?
    ```bash
        echo c{a,b}t
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Расширение фигурных скобок `{}` генерирует несколько версий строки, по одной (или больше) для каждого значения или шаблона, разделённого запятыми.

    Здесь `c{a,b}t` расширяется до:
    ```plaintext
        cat cbt
    ```
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={3}
  group="Переменные"
  title="Использование специальных символов"
  options={[
    {text: 'Стоимость: $$100'},
    {text: 'Стоимость: $100'},
    {text: 'Стоимость: 100'},
    {text: 'Стоимость: 00', isAnswer: true},
    {text: 'Стоимость: '},
    {text: 'Ошибка'},
  ]}
>
  <slot name="question">
  <div className="question">
    Теперь, что будет напечатано?
    ```bash
        price="$100"
        echo "Cost: $price"
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Нумерованные переменные имеют специальное значение. В данном случае `$1` — это специальная переменная, которая хранит первый аргумент, переданный скрипту или функции.

    Поскольку мы запускаем скрипт в REPL, аргументов нет, поэтому `$1` пуст. Оставшийся текст `00` печатается как есть.

    Чтобы вывести символ `$` в буквальном виде, используйте одинарные кавычки или экранируйте его с помощью обратного слэша (`\`):
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
  group="Замена подстрок"
  title="Замена подстроки"
  options={[
    {text: 'meow meow'},
    {text: 'Meow meow'},
    {text: 'Bark meow', isAnswer: true},
    {text: 'Bark bark'},
    {text: 'Error'},
  ]}
>
  <slot name="question">
  <div className="question">
    Что происходит здесь?
    ```bash
        str="Bark bark"
        echo ${str/bark/meow}
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Синтаксис `${var/pattern/replacement}` заменяет первое вхождение `pattern` на `replacement`. Здесь результат будет:
    ```plaintext
        Bark meow
    ```
    Это чувствительно к регистру. Чтобы заменить как `bark`, так и `Bark`, используйте шаблон вроде `${var/[Bb]ark/Bark}` или нормализуйте строку перед заменой.

    Для замены всех вхождений используйте `${var//pattern/replacement}`.

    Для замены с начала строки используйте `${var/#pattern/replacement}`.

    Для замены с конца строки используйте `${var/%pattern/replacement}`.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={5}
  group="Длина строки"
  title="Длина строки"
  options={[
    {text: '$#username'},
    {text: '#$username'},
    {text: '${#username}', isAnswer: true},
    {text: '${username#}'},
    {text: 'echo $username | wc -c', hint: 'Использует внешнюю утилиту'},
  ]}
>
  <slot name="question">
  <div className="question">
    Как можно получить длину переменной в Bash?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Синтаксис `${#username}` возвращает длину `username`.

    Например:
    ```bash
        username="@justsml"
        echo ${#username} # => 8
    ```
    Хотя `wc` тоже сработает, это не часть самого Bash.

    Утилита `wc` — древняя шутка, связанная с английским "water closet" (туалет).
    Шутка? Кто вообще читает эти примечания?

    На самом деле `wc` — это древняя команда из Posix (и времён AT&T Unix). Это аббревиатура от "word count", она подсчитывает строки, слова и символы в файле или потоке.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={6}
  group="Условия"
  title="Базовый if-else"
  options={[
    {text: 'Файл существует'},
    {text: 'Файл не существует, после диагностического теста', isAnswer: true},
    {text: 'Только ошибка'},
    {text: 'Отсутствуют двойные скобки'},
    {text: 'Ничего'},
  ]}
>
  <slot name="question">
  <div className="question">
    Что выводит этот скрипт, если файл `cats.txt` СУЩЕСТВУЕТ?
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
    Вы заметили пропущенное пространство перед закрывающей скобкой?

    Bash здесь очень чувствителен: внутри выражений в скобках требуются пробелы.

    Из-за отсутствия пробела команда `[` не видит закрывающую `]`, Bash выводит диагностическое сообщение, считает тест проваленным и переходит к ветке `else`.

    Правильный синтаксис:
    ```bash
        if [ -e example.txt ]; then
          echo "File exists"
        else
          echo "File does not exist"
        fi
    ```
    Примечание: Двойные скобки `[[ ]]` **рекомендуются** для условных выражений. [См. BashFAQ.](https://mywiki.wooledge.org/BashFAQ/031)
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={7}
  group="Условия"
  title="Сравнение строк"
  options={[
    {text: 'Тот же кот'},
    {text: 'Разные коты, после синтаксической ошибки', isAnswer: true},
    {text: 'Залго'},
    {text: 'Только ошибка'},
  ]}
>
  <slot name="question">
  <div className="question">
    Как мы можем сравнивать строки в Bash?
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
    Еще одна синтаксическая ошибка!

    Вы заметили недопустимый оператор `===`?

    Возможно, вы думали о JavaScript...

    В Bash с `[ ... ]` выводится диагностическое сообщение, а условие считается ложным, поэтому ветка `else` выводит `Разные коты`. В Bash для сравнения на равенство используйте `=` или `==`.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={8}
  group="Функции"
  title="Объявление функции"
  options={[
    {text: 'Привет', isAnswer: true},
    {text: 'Дэн'},
    {text: 'Привет Дэн'},
    {text: 'greet'},
    {text: 'Ошибка'},
    {text: 'Синтаксическая ошибка'},
  ]}
>
  <slot name="question">
  <div className="question">
    Что выведет этот скрипт?
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
    Функции в Bash могут принимать аргументы. Переменная `$1` содержит первый переданный аргумент.

    Помните: `$0` — это название скрипта, `$1` — первый аргумент, `$2` — второй и так далее. **Пробелы разделяют аргументы.** Таким образом, `greet Hi Dan` передаёт `"Hi"` как первый аргумент. Чтобы передать `"Hi Dan"` как один аргумент, нужно использовать кавычки: `greet "Hi Dan"`.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={9}
  group="Композиция"
  title="Использование конвейеров"
  options={[
  ]}
>
  <slot name="question">
  <div className="question">
    Какой оператор соединяет **выход** одной команды с **входом** следующей команды?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Оператор конвейера `|` соединяет выход одной команды с входом другой. Например:
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
  group="Арифметика"
  title="Базовая арифметика"
  options={[
    {text: 'echo 2 + 2'},
    {text: 'echo ${2 + 2}'},
    {text: 'echo %(2 + 2)'},
    {text: 'echo $(( 2 + 2 ))', isAnswer: true},
    {text: 'Error'},
  ]}
>
  <slot name="question">
  <div className="question">
    Как работает математика в Bash?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Синтаксис `(( ))` выполняет целочисленную математику в Bash.

    Его можно использовать для простых вычислений:
    ```bash
        ((result = 2 + 2))
        echo $result # => 4
    ```
    Или для условных выражений:
    ```bash
        if (( 2 > 1 )); then
          echo "2 is greater than 1"
        fi
    ```
    Для арифметики с плавающей точкой рассмотрите использование [`bc`](https://www.gnu.org/software/bc/manual/html_mono/bc.html) или [`awk`](https://www.gnu.org/software/gawk/manual/gawk.html).
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={11}
  group="Умножение"
  title="Базовая арифметика"
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
    Какой из этих вариантов правильно умножает 10 на 0,5, выводя 5?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Синтаксис `(( ))` выполняет **только целочисленную** арифметику. То есть, работает с целыми числами, без дробной части!

    Bash (возможно, неожиданно) не имеет **встроенной** поддержки арифметики с плавающей точкой.

    Самое частое решение — использовать GNU-утилиты [`bc`](https://www.gnu.org/software/bc/manual/html_mono/bc.html) или [`awk`](https://www.gnu.org/software/gawk/manual/gawk.html).
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={12}
  group="Манипуляции со строками"
  title="Извлечение подстроки"
  options={[
    {text: 'Плохой кот'},
    {text: 'Плохой кот, хороший кот:9'},
    {text: 'Хороший кот', isAnswer: true},
    {text: 'Ошибка'},
  ]}
>
  <slot name="question">
  <div className="question">
    Что делает `:` в этом сценарии?
    ```bash
        rosie="Bad cat, good cat"
        echo ${rosie:9}
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Синтаксис `${var:offset}` извлекает подстроку, начиная с `offset`. Здесь результат будет:
    ```plaintext
        good cat
    ```
    Чтобы извлечь подстроку определённой длины, используйте `${var:offset:length}`.

    Для извлечения с конца строки используйте `${var: -offset}`. (Обратите внимание на пробел перед `-`!)
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={13}
  group="Циклы"
  title="Циклы в Bash"
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
    Что НЕ ❌ является ключевым словом для циклов в Bash?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    `each` не является ключевым словом цикла в Bash. Основные ключевые слова циклов — это `for`, `while` и `until`.

    Хотя `do` технически не является ключевым словом цикла, оно является важной частью синтаксиса циклов.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={14}
  group="Питки"
  title="Подстановка команд"
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
    Какой вариант выполнит команду `ls -l` и вернет вывод?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Синтаксис `$(ls -l)` выполняет команду внутри **скобок** и подставляет вывод. Например:
    ```bash
        echo "Today is $(date +%F)"
        # => Today is 2029-12-31
    ```
    Первый вариант использует одинарные кавычки `'`, **а не обратные кавычки.** Это предотвращает расширение, поэтому `'$(date +%F)'` просто напечатает строку `$(date +%F)`.

    Хотя использование обратных кавычек (`` `ls -l` ``) все еще поддерживается, это стало антипаттерном (в некоторых контекстах). Рекомендуется использовать `$(command)` для лучшей читаемости и совместимости с различными оболочками.

    Фигурные скобки `${}` используются для расширения переменных, а не для подстановки команд.

    Символ `%` не используется для подстановки команд.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={15}
  group="Стандартный ввод/вывод"
  title="Значения по умолчанию"
  options={[
  ]}
>
  <slot name="question">
  <div className="question">
    Какой оператор используется для объединения вывода ошибок в стандартный вывод?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Оператор `2>&1` перенаправляет стандартный вывод ошибок (файловый дескриптор 2) в стандартный вывод (файловый дескриптор 1). Это полезно для захвата сообщений об ошибках в том же потоке вывода, что и обычный вывод.

    Оператор `1>&2` перенаправляет стандартный вывод в стандартный вывод ошибок, однако вопрос спрашивает, как перенаправить стандартный вывод ошибок в стандартный вывод.

    Чтобы узнать больше о том, что происходит под капотом, ознакомьтесь с [превосходной статьёй Greg о перенаправлении](https://mywiki.wooledge.org/BashFAQ/055).

    Также спасибо пользователю Reddit [u/OneTurnMore](https://www.reddit.com/user/OneTurnMore/) за улучшения формулировок.
  </div>
  </slot>
</Challenge>

</QuizUI>

<p className="inset">Оставил ли мой тест по Bash вас в замешательстве?</p>

Напишите в комментариях ниже!

### Дополнительное чтение

Повторите основы Bash с помощью следующих ресурсов:

- [Руководство по Bash](https://www.gnu.org/software/bash/manual/bash.html)
- [BashFAQ](http://mywiki.wooledge.org/BashFAQ)
- [ShellCheck](https://www.shellcheck.net/)
- [Bash Academy](https://guide.bash.academy/)
- [Руководство по скриптам Bash](https://ryanstutorials.net/bash-scripting-tutorial/)
- [Справочное руководство Bash](https://www.gnu.org/software/bash/manual/bash.html)
- [Bash Hackers Wiki](http://wiki.bash-hackers.org/)
- [Руководство для начинающих по Bash](http://tldp.org/LDP/Bash-Beginners-Guide/html/index.html)
- [Справочная карточка Bash](http://www.tldp.org/LDP/Bash-Beginners-Guide/html/Bash-Beginners-Guide.html)

<Challenge 
  index={0} 
  client:visible 
  group="Введение" 
  title="Что выводит этот скрипт?"
  options={[
    { text: '`echo "Hello World"`', isAnswer: false },
    { text: '`echo "Hello World" && echo "!"`', isAnswer: true },
    { text: '`echo "Hello World" || echo "!"`', isAnswer: false },
    { text: '`echo "Hello World" | wc -l`', isAnswer: false }
  ]}
>
  <slot name="question">
    Что выводит следующий скрипт?
    ```bash
    echo "Hello World"
    ```
  </slot>
  <slot name="explanation">
    Команда `echo` выводит текст, указанный в кавычках. В данном случае выводится строка `Hello World`. Остальные варианты либо добавляют дополнительные команды (`&&`, `||`, `|`), либо изменяют логику выполнения, что не соответствует оригинальному скрипту.
  </slot>
</Challenge>
````
