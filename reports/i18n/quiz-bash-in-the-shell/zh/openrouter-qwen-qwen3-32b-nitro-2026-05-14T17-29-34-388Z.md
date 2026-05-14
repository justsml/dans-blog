# Translation Candidate
- Slug: quiz-bash-in-the-shell
- Locale: zh
- Model: openrouter/qwen/qwen3-32b:nitro
- Target: src/content/posts/2024-11-20--quiz-bash-in-the-shell/zh/index.mdx
- Validation: deferred
- Runtime seconds: 57.79
- Input tokens: 16040
- Output tokens: 15947
- Thinking tokens: unknown
- Cached input tokens: 6656
- Cache write tokens: 0
- Estimated cost: $0.005911
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
unlisted: false
title: 测验：Bash 和 Shell 技能
subTitle: 你能与计算机对话吗？而且很擅长？
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
```jsx
import Challenge from '../../../../components/QuizUI/Challenge';
import QuizUI from '../../../../components/QuizUI/QuizUI';

<p class="inset">用这16个问题测试你的Bash脚本技能吧！</p>

涵盖变量、循环、条件语句、字符串操作、函数以及基础到棘手的语法陷阱。

磨练（或证明）你的shell脚本**技能**！
```

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
    Bash中如何定义变量？
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    Bash中的变量在声明时等号`=`周围不能有空格。例如：
    ```bash
        name=Alice
    ```
    这会将值`"Alice"`赋给变量`name`。

    注意：`$name`用于**引用**或读取变量的值。

    添加空格会导致shell将命令解释为要运行的程序，这在设置变量时并不是你想要的。

    此外，Bash是区分大小写的，因此`name`、`NAME`和`Name`是不同的变量。

    最后，变量名中不能包含空格或连字符（`-`）。请改用下划线（`_`）或驼峰命名法。
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
    {text: 'Error'},
  ]}
>
  <slot name="question">
  <div className="question">
    _哪个命令会输出 `It's 🔨 Time!`？_
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    我知道。转义符号让字符串变得难以解析。想象一下在Bash字符串中转义其他语言——所有这些引号、撇号和`$`符号都会让你崩溃。🫠

    单引号需要在单引号字符串中转义。闭合引号、转义引号、重新打开引号的序列（`'\''`）可以输出：
    ```plaintext
        It's 🔨 Time!
    ```
    还有其他处理方法，但这是最常见的方式。
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={2}
  group="热身：扩展"
  title="回声命令"
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
    这个命令会输出什么？
    ```bash
        echo c{a,b}t
    ```
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    花括号 `{}` 扩展会生成其字符串上下文的多个版本，每个逗号分隔的值或模式对应一个（或多个）版本。

    在这里，`c{a,b}t` 扩展为：
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
    {text: '成本：$$100'},
    {text: '成本：$100'},
    {text: '成本：100'},
    {text: '成本：00', isAnswer: true},
    {text: '成本：'},
    {text: '错误'},
  ]}
>
  <slot name="question">
  <div className="question">
    现在，这会输出什么？
    ```bash
        price="$100"
        echo "Cost: $price"
    ```
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    编号变量有特殊含义。在这种情况下，`$1`是特殊变量，用于存储传递给脚本或函数的第一个参数。

    由于我们在REPL中运行脚本，没有参数，因此`$1`为空。剩余文本`00`按原样打印。

    要打印字面意义上的`$`字符，请使用单引号，或用反斜杠(`\`)转义：
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
  group="替换子字符串"
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
    这里发生了什么？
    ```bash
        str="Bark bark"
        echo ${str/bark/meow}
    ```
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    语法 `${var/pattern/replacement}` 会将第一个匹配的 `pattern` 替换为 `replacement`。此处输出为：
    ```plaintext
        Bark meow
    ```
    该操作区分大小写。若需同时替换 `bark` 和 `Bark`，可使用类似 `${var/[Bb]ark/Bark}` 的模式，或在替换前先标准化字符串。

    要替换所有匹配项，使用 `${var//pattern/replacement}`。

    要从字符串开头替换，使用 `${var/#pattern/replacement}`。

    要从字符串末尾替换，使用 `${var/%pattern/replacement}`。
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
    如何在 Bash 中获取变量的长度？
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    语法 `${#username}` 会返回 `username` 的长度。

    例如：
    ```bash
        username="@justsml"
        echo ${#username} # => 8
    ```
    虽然 `wc` 也能实现，但它严格来说不属于 Bash 本身。

    `wc` 是一个古老的命令，源自 Posix（以及 AT&T Unix 时代）。它原本是 "word count" 的缩写，可以统计文件或输入流中的行数、单词数和字符数。
    顺便说一句，`wc` 的名字其实是个老梗——字面意思是 "water closet"（厕所）。
    开玩笑的！真有人看这些说明吗？
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={6}
  group="条件语句"
  title="基本的If-Else"
  options={[
    {text: '文件存在'},
    {text: '文件不存在，且在诊断后', isAnswer: true},
    {text: '仅错误'},
    {text: '缺少双括号'},
    {text: '无输出'},
  ]}
>
  <slot name="question">
  <div className="question">
    如果文件 `cats.txt` 存在，此脚本输出什么？
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
    你发现闭合括号前缺少空格了吗？

    Bash 对此非常敏感：括号表达式内部需要空格。

    缺少空格导致 `[` 命令看不到闭合的 `]`，Bash 会打印诊断信息，将测试视为失败，并继续执行 `else` 分支。

    正确语法是：
    ```bash
        if [ -e example.txt ]; then
          echo "File exists"
        else
          echo "File does not exist"
        fi
    ```
    注意：双括号 `[[ ]]` 是**推荐**用于条件表达式的。[参见 BashFAQ。](https://mywiki.wooledge.org/BashFAQ/031)
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={7}
  group="条件语句"
  title="字符串比较"
  options={[
    {text: '相同的猫'},
    {text: '不同的猫，在测试语法错误之后', isAnswer: true},
    {text: 'Zalgo'},
    {text: '仅错误'},
  ]}
>
  <slot name="question">
  <div className="question">
    如何在Bash中比较字符串？
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
    另一个测试语法错误！

    你发现无效的`===`操作符了吗？

    你可能在想JavaScript的语法...

    使用`[ ... ]`时，Bash会报告诊断信息并让条件为假，因此`else`分支会打印`不同的猫`。在Bash中，使用`=`或`==`进行等值比较。
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={8}
  group="函数"
  title="函数声明"
  options={[
    {text: '嗨', isAnswer: true},
    {text: '丹'},
    {text: '嗨 丹'},
    {text: 'greet'},
    {text: '错误'},
    {text: '语法错误'},
  ]}
>
  <slot name="question">
  <div className="question">
    此脚本将输出什么？
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
    Bash中的函数可以接受参数。`$1`变量保存传递给函数的第一个参数。

    记住，`$0`是脚本名称，`$1`是第一个参数，`$2`是第二个参数，依此类推。**空格分隔参数。** 因此，`greet Hi Dan`会将`"Hi"`作为第一个参数传递。若要将`"Hi Dan"`作为单个参数传递，需要加上引号：`greet "Hi Dan"`。
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
    哪个操作符将**一个命令的输出**连接到**下一个命令的输入**？
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    `|` 管道操作符将一个命令的输出连接到另一个命令的输入。例如：
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
    Bash中的数学运算如何工作？
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    Bash中使用`(( ))`语法执行整数运算。

    可以用于简单计算：
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
    对于浮点运算，考虑使用 [`bc`](https://www.gnu.org/software/bc/manual/html_mono/bc.html) 或 [`awk`](https://www.gnu.org/software/gawk/manual/gawk.html)。
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={11}
  group="乘法"
  title="基本算术运算"
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
    以下哪项正确地将10和0.5相乘并输出5？
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    `(( ))`语法**仅**执行**整数**运算。是的，就是没有小数点的整数！

    Bash（或许令人惊讶地）**没有内置**的浮点数运算支持。

    最常见的解决方案是使用GNU工具 [`bc`](https://www.gnu.org/software/bc/manual/html_mono/bc.html) 或 [`awk`](https://www.gnu.org/software/gawk/manual/gawk.html)。
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={12}
  group="字符串操作"
  title="子字符串提取"
  options={[
    {text: '坏猫'},
    {text: '坏猫，好猫:9'},
    {text: '好猫', isAnswer: true},
    {text: '错误'},
  ]}
>
  <slot name="question">
  <div className="question">
    在这个脚本中，`:`的作用是什么？
    ```bash
        rosie="Bad cat, good cat"
        echo ${rosie:9}
    ```
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    `${var:offset}`语法从`offset`位置开始提取子字符串。输出结果为：
    ```plaintext
        good cat
    ```
    要提取特定长度的子字符串，使用`${var:offset:length}`。

    要从字符串末尾开始提取，使用`${var: -offset}`。（注意`-`前的空格！）
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={13}
  group="循环"
  title="Bash中的循环"
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
    以下哪个不是❌ Bash中循环的关键字？
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    `each`不是Bash中的循环关键字。主要的循环关键字是`for`、`while`和`until`。

    虽然`do`不是技术意义上的循环关键字，但它是循环语法的重要组成部分。
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={14}
  group="常见陷阱"
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
    哪个选项会执行命令 `ls -l` 并返回输出？
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    `$(ls -l)` 语法会在 **括号** 中执行命令并替换输出。例如：
    ```bash
        echo "Today is $(date +%F)"
        # => Today is 2029-12-31
    ```
    第一个选项使用单引号 `'`，**不是反引号**。这会阻止展开，因此 `'$(date +%F)'` 会直接打印字面字符串 `$(date +%F)`。

    虽然反引号 (`` `ls -l` ``) 仍可用于命令执行，但在某些上下文中已逐渐被视为反模式。大多数推荐使用 `$(command)` 以获得更好的可读性，并与不同 shell 和版本保持一致。

    大括号 `${}` 用于变量展开，而非命令替换。

    `%` 符号不用于命令替换。
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
    哪个操作符用于将错误输出合并到标准输出？
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    `2>&1` 操作符将标准错误（文件描述符2）重定向到标准输出（文件描述符1）。这在需要将错误消息与常规输出合并到同一输出流时非常有用。

    `1>&2` 操作符会将标准输出重定向到标准错误，但问题要求的是将标准错误重定向到标准输出。

    要深入了解底层原理，可以查阅 [Greg的优秀重定向FAQ](https://mywiki.wooledge.org/BashFAQ/055)。

    另外，感谢Reddit用户 [u/OneTurnMore](https://www.reddit.com/user/OneTurnMore/) 提供的文本改进建议。
  </div>
  </slot>
</Challenge>

</QuizUI>

<p className="inset">我的Bash测验让你感到困惑了吗？</p>

在下方评论区告诉我！

### 拓展阅读

通过以下资源提升你的Bash技能：

- [Bash指南](https://www.gnu.org/software/bash/manual/bash.html)
- [Bash常见问题](http://mywiki.wooledge.org/BashFAQ)
- [ShellCheck](https://www.shellcheck.net/)
- [Bash学院](https://guide.bash.academy/)
- [Bash脚本教程](https://ryanstutorials.net/bash-scripting-tutorial/)
- [Bash参考手册](https://www.gnu.org/software/bash/manual/bash.html)
- [Bash黑客维基](http://wiki.bash-hackers.org/)
- [Bash初学者指南](http://tldp.org/LDP/Bash-Beginners-Guide/html/index.html)
- [Bash参考卡片](http://www.tldp.org/LDP/Bash-Beginners-Guide/html/Bash-Beginners-Guide.html)
````
