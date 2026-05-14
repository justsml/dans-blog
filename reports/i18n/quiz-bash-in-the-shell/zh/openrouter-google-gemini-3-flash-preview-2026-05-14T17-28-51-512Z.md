# Translation Candidate
- Slug: quiz-bash-in-the-shell
- Locale: zh
- Model: openrouter/google/gemini-3-flash-preview
- Target: src/content/posts/2024-11-20--quiz-bash-in-the-shell/zh/index.mdx
- Validation: deferred
- Runtime seconds: 78.39
- Input tokens: 16879
- Output tokens: 6766
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- Estimated cost: $0.028738
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
unlisted: false
title: 测验：Bash 与 Shell 精通之路
subTitle: 你能和计算机交流吗？我是说，交流得顺畅吗？
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

<p class="inset">通过这 16 道题测试你的 Bash 脚本功底！</p>

内容涵盖变量、循环、条件判断、字符串操作、函数，以及从基础到进阶的各种语法“坑”。

精进（或证明）你的 Shell 脚本**实战能力**！

<QuizUI>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={0}
  group="热身"
  title="变量声明"
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
    在 Bash 中如何定义变量？
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    在 Bash 中声明变量时，`=` 等号两边不能有空格。例如：
    ```bash
        name=Alice
    ```
    这会将值 `"Alice"` 赋给变量 `name`。

    注意：`$name` 是用来**引用**或读取变量值的。

    添加空格会导致 Shell 将该命令解释为要运行的程序，这在你设置变量时显然不是你想要的结果。

    此外，Bash 是区分大小写的，因此 `name`、`NAME` 和 `Name` 是不同的变量。

    最后，变量名中不能包含空格或连字符（`-`）。请使用下划线（`_`）或小驼峰式命名法（camelCase）。
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={1}
  group="热身：转义"
  title="转义引号"
  options={[
    {text: 'echo \'It\'s 🔨 Time!\''},
    {text: 'echo \'It\\\'s 🔨 Time!\''},
    {text: 'echo \'It\'\\\'\'s 🔨 Time!\'', isAnswer: true},
    {text: 'echo \'It\'\'s 🔨 Time!\''},
    {text: '报错'},
  ]}
>
  <slot name="question">
  <div className="question">
    _哪条命令会打印出 `It's 🔨 Time!`？_
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    我知道。转义会让字符串解析变得异常复杂，这确实很离谱。想象一下在 Bash 字符串中转义其他语言——那些引号、单引号和 `$` 符号能把你搞得晕头转向。🫠

    在单引号字符串内部，单引号本身需要转义。这种“闭合引号、转义引号、重新开启引号”的序列（`'\''`）允许输出：
    ```plaintext
        It's 🔨 Time!
    ```
    处理这个问题还有其他方法，但这是最常见的一种。
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={2}
  group="热身：展开 (Expansion)"
  title="Echo 命令"
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
    这条命令会输出什么？
    ```bash
        echo c{a,b}t
    ```
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    `{}` 花括号展开会根据其字符串上下文生成多个版本，每个逗号分隔的值或模式都会生成一个（或多个）结果。

    在这里，`c{a,b}t` 会展开为：
    ```plaintext
        cat cbt
    ```
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={3}
  group="变量"
  title="转义字符"
  options={[
    {text: 'Cost: $$100'},
    {text: 'Cost: $100'},
    {text: 'Cost: 100'},
    {text: 'Cost: 00', isAnswer: true},
    {text: 'Cost:'},
    {text: 'Error'},
  ]}
>
  <slot name="question">
  <div className="question">
    那么，这段代码会打印出什么？
    ```bash
        price="$100"
        echo "Cost: $price"
    ```
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    带数字的变量具有特殊含义。在这种情况下，`$1` 是一个特殊变量，它保存传递给脚本或函数的第一个参数。

    由于我们是在 REPL 中运行脚本，没有任何参数，因此 `$1` 为空。剩余的文本 `00` 则按原样打印。

    要打印字面量 `$` 字符，请使用单引号，或使用反斜杠 (`\`) 进行转义：
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
  group="子字符串替换"
  title="替换子字符串"
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
    这段代码的输出结果是什么？
    ```bash
        str="Bark bark"
        echo ${str/bark/meow}
    ```
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    `${var/pattern/replacement}` 语法会将第一个匹配到的 `pattern` 替换为 `replacement`。在这里，输出结果为：
    ```plaintext
        Bark meow
    ```
    这种替换是区分大小写的。如果要同时处理 `bark` 和 `Bark`，可以使用类似 `${var/[Bb]ark/Bark}` 的模式，或者在替换前先对字符串进行标准化处理。

    若要替换所有匹配项，请使用 `${var//pattern/replacement}`。

    若要从字符串开头开始匹配替换，请使用 `${var/#pattern/replacement}`。

    若要从字符串末尾开始匹配替换，请使用 `${var/%pattern/replacement}`。
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={5}
  group="字符串长度"
  title="字符串长度"
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
    在 Bash 中如何获取变量的长度？
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    `${#username}` 语法会返回 `username` 的长度。

    例如：
    ```bash
        username="@justsml"
        echo ${#username} # => 8
    ```
    虽然 `wc` 也能奏效，但从技术上讲它并不属于 Bash 的内置功能。

    `wc` 这个工具常被当作一个老掉牙的内部笑话，指代 “water closet”（厕所）。
    开玩笑的！真的有人在看这些说明吗？

    实际上，`wc` 是一个来自 Posix（以及早期的 AT&T Unix 时代）的古老命令。它是 “word count” 的缩写，可以统计文件或输入流中的行数、单词数和字符数。
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={6}
  group="条件判断"
  title="基础 If-Else"
  options={[
    {text: 'File exists'},
    {text: 'File does not exist, 伴随一条测试诊断信息', isAnswer: true},
    {text: '仅输出错误信息'},
    {text: '缺少双括号'},
    {text: '无输出'},
  ]}
>
  <slot name="question">
  <div className="question">
    如果文件 `cats.txt` 确实存在，这段脚本会输出什么？
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
    你注意到闭合方括号前的空格缺失了吗？

    Bash 在这里非常挑剔：方括号表达式内部必须有空格。

    由于缺少空格，导致 `[` 命令找不到对应的闭合 `]`，Bash 会打印一条诊断信息，将测试视为失败，并继续执行 `else` 分支。

    正确的语法应该是：
    ```bash
        if [ -e example.txt ]; then
          echo "File exists"
        else
          echo "File does not exist"
        fi
    ```
    注意：在进行条件表达式判断时，**推荐**使用双括号 `[[ ]]`。[参见 BashFAQ。](https://mywiki.wooledge.org/BashFAQ/031)
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={7}
  group="条件判断"
  title="字符串比较"
  options={[
    {text: 'Same cat'},
    {text: 'Different cats，且伴随一个测试语法错误', isAnswer: true},
    {text: 'Zalgo'},
    {text: '仅报错'},
  ]}
>
  <slot name="question">
  <div className="question">
    在 Bash 中我们该如何比较字符串？
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
    又是一个测试语法错误！

    你发现那个无效的 `===` 运算符了吗？

    你可能是在想 JavaScript...

    在使用 `[ ... ]` 时，Bash 会报告一个诊断错误且条件判定为假，因此 `else` 分支会打印 `Different cats`。在 Bash 中，请使用 `=` 或 `==` 进行相等性比较。
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={8}
  group="函数"
  title="函数声明"
  options={[
    {text: 'Hi', isAnswer: true},
    {text: 'Dan'},
    {text: 'Hi Dan'},
    {text: 'greet'},
    {text: 'Error'},
    {text: 'Syntax Error'},
  ]}
>
  <slot name="question">
  <div className="question">
    这段脚本的输出是什么？
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
    Bash 中的函数可以接收参数。`$1` 变量保存传递给函数的第一个参数。

    记住，`$0` 是脚本名称，`$1` 是第一个参数，`$2` 是第二个，依此类推。**空格用于分隔参数。** 因此，`greet Hi Dan` 将 `"Hi"` 作为第一个参数传递。为了将 `"Hi Dan"` 作为一个参数传递，你需要给它加上引号：`greet "Hi Dan"`。
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={9}
  group="组合"
  title="使用管道"
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
    哪个运算符可以将一个命令的 **输出** 连接到下一个命令的 **输入**？
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    `|` 管道运算符用于将一个命令的输出连接到另一个命令的输入。例如：
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
  group="算术运算"
  title="基础算术"
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
    在 Bash 中数学运算是如何工作的？
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    `(( ))` 语法在 Bash 中用于执行整数数学运算。

    它可以用于简单的计算：
    ```bash
        ((result = 2 + 2))
        echo $result # => 4
    ```
    或者用于条件表达式：
    ```bash
        if (( 2 > 1 )); then
          echo "2 is greater than 1"
        fi
    ```
    对于浮点数算术运算，请考虑使用 [`bc`](https://www.gnu.org/software/bc/manual/html_mono/bc.html) 或 [`awk`](https://www.gnu.org/software/gawk/manual/gawk.html)。
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={11}
  group="乘法"
  title="基础算术"
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
    以下哪项能正确计算 10 乘以 0.5 并打印出 5？
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    `(( ))` 语法仅执行 **整数** 算术。也就是那些没有小数点的整数！

    Bash（可能让你感到意外）缺乏对浮点数运算的 **内置** 支持。

    最常见的解决方案是使用 GNU 工具 [`bc`](https://www.gnu.org/software/bc/manual/html_mono/bc.html) 或 [`awk`](https://www.gnu.org/software/gawk/manual/gawk.html)。
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={12}
  group="字符串操作"
  title="子字符串提取"
  options={[
    {text: 'Bad cat'},
    {text: 'Bad cat, good cat:9'},
    {text: 'good cat', isAnswer: true},
    {text: 'Error'},
  ]}
>
  <slot name="question">
  <div className="question">
    在这个脚本中，`:` 的作用是什么？
    ```bash
        rosie="Bad cat, good cat"
        echo ${rosie:9}
    ```
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    `${var:offset}` 语法用于从 `offset` 位置开始提取子字符串。在这里，输出结果为：
    ```plaintext
        good cat
    ```
    若要提取特定长度的子字符串，请使用 `${var:offset:length}`。

    若要从字符串末尾开始提取，请使用 `${var: -offset}`。（注意 `-` 前面的空格！）
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={13}
  group="循环"
  title="Bash 中的循环"
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
    以下哪项 **不是** ❌ Bash 中的循环关键字？
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    `each` 不是 Bash 中的循环关键字。主要的循环关键字是 `for`、`while` 和 `until`。

    虽然从技术层面讲 `do` 本身不是一个独立的循环关键字，但它是循环语法中不可或缺的一部分。
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={14}
  group="易错点"
  title="命令替换"
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
    哪一个选项会执行 `ls -l` 命令并返回其输出结果？
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    `$(ls -l)` 语法会执行 **括号** 内部的命令并替换为输出结果。例如：
    ```bash
        echo "Today is $(date +%F)"
        # => Today is 2029-12-31
    ```
    第一个选项使用的是单引号 `'`，**而不是反引号**。这会阻止扩展，因此 `'$(date +%F)'` 只会简单地打印字面字符串 `$(date +%F)`。

    虽然目前仍然支持使用反引号 (`` `ls -l` ``) 来执行命令，但在某些语境下它已经变成了一种反模式。大多数情况下推荐使用 `$(command)`，因为它具有更好的可读性，并且在不同的 shell 类型和版本中保持了一致性。

    花括号 `${}` 用于变量扩展，而不是命令替换。

    `%` 字符不用于命令替换。
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={15}
  group="标准输入/输出"
  title="默认值"
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
    哪个操作符用于将错误输出合并到标准输出中？
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    `2>&1` 操作符将标准错误（文件描述符 2）重定向到标准输出（文件描述符 1）。这在需要将错误消息与常规输出捕获到同一个输出流时非常有用。

    `1>&2` 操作符是将标准输出重定向到标准错误，但题目要求的是如何将标准错误重定向到标准输出。

    想要深入了解底层原理，请查看 [Greg 编写的优秀重定向 FAQ](https://mywiki.wooledge.org/BashFAQ/055)。

    另外，感谢 Reddit 用户 [u/OneTurnMore](https://www.reddit.com/user/OneTurnMore/) 提供的文案改进建议。
  </div>
  </slot>
</Challenge>

</QuizUI>

---
<p className="inset">这套 Bash 测验把你考倒了吗？</p>

在下方评论区告诉我你的战绩！

### 延伸阅读

通过以下资源进一步提升你的 Bash 技能：

- [Bash 指南](https://www.gnu.org/software/bash/manual/bash.html)
- [Bash 常见问题解答 (BashFAQ)](http://mywiki.wooledge.org/BashFAQ)
- [ShellCheck](https://www.shellcheck.net/)
- [Bash 学院](https://guide.bash.academy/)
- [Bash 脚本教程](https://ryanstutorials.net/bash-scripting-tutorial/)
- [Bash 参考手册](https://www.gnu.org/software/bash/manual/bash.html)
- [Bash 黑客维基](http://wiki.bash-hackers.org/)
- [Bash 初学者指南](http://tldp.org/LDP/Bash-Beginners-Guide/html/index.html)
- [Bash 速查卡](http://www.tldp.org/LDP/Bash-Beginners-Guide/html/Bash-Beginners-Guide.html)
---
````
