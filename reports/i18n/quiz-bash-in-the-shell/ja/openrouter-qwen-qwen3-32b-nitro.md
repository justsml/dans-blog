# Translation Candidate
- Slug: quiz-bash-in-the-shell
- Locale: ja
- Model: openrouter/qwen/qwen3-32b:nitro
- Target: src/content/posts/2024-11-20--quiz-bash-in-the-shell/ja/index.mdx
- Validation: deferred
- Runtime seconds: 144.35
- Input tokens: 14376
- Output tokens: 13023
- Thinking tokens: unknown
- Cached input tokens: 512
- Cache write tokens: 0
- Estimated cost: $0.004276
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
unlisted: false
title: 'クイズ: Bash & Shell マスター'
subTitle: コンピュータとちゃんと話せますか？
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

<p class="inset">この16問のクイズでBashスクリプトスキルをテストしてみましょう！</p>

変数、ループ、条件分岐、文字列操作、関数、そして基本からやや複雑な構文の落とし穴までをカバーします。

シェルスクリプトの**スキル**を磨く（または証明する）！

<QuizUI>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={0}
  group="ウォームアップ"
  title="変数の宣言"
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
    Bashで変数はどのように定義されますか？
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Bashでの変数宣言は`=`の前後にスペースを付けません。例えば：
    ```bash
        name=Alice
    ```
    これは`name`変数に`"Alice"`を代入します。

    注：`$name`は変数の**参照**や値の読み取りに使用されます。

    スペースを追加するとシェルがコマンドとして解釈してしまい、変数設定の意図に反します。

    また、Bashは大文字小文字を区別するため、`name`、`NAME`、`Name`は別の変数になります。

    最後に、変数名にスペースやハイフン(`-`)は使用できません。アンダースコア(`_`)やcamelCaseを使用してください。
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={1}
  group="ウォームアップ: エスケープ"
  title="クォートのエスケープ"
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
    「It's 🔨 Time!」を出力するコマンドはどれですか？
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    クォートのエスケープは本当にややこしいですよね。Bash文字列内で他の言語をエスケープする想像してみてください。クォートやアポストロフ、`$`記号が邪魔になります。🫠

    シングルクォート内ではシングルクォートをエスケープする必要があります。`'\''`というクォート→エスケープ→クォートのシーケンスで出力できます：
    ```plaintext
        It's 🔨 Time!
    ```
    他の方法もありますが、これは最も一般的な方法です。
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={2}
  group="ウォームアップ: 拡張"
  title="echoコマンド"
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
    このコマンドは何を出力しますか？
    ```bash
        echo c{a,b}t
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    大括弧`{}`による拡張は、コンマ区切りの値やパターンごとに、文字列コンテキストの複数バージョンを生成します。

    ここでは`c{a,b}t`は次のように展開されます：
    ```plaintext
        cat cbt
    ```
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={3}
  group="変数"
  title="エスケープ文字"
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
    では、これは何を出力するでしょうか？
    ```bash
        price="$100"
        echo "Cost: $price"
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    番号付きの変数は特殊な意味を持ちます。このケースでは、`$1`はスクリプトまたは関数に渡された最初の引数を保持する特殊な変数です。

    REPL環境でスクリプトを実行しているため、引数が存在しないため`$1`は空になります。残りの文字`00`はそのまま出力されます。

    リテラルの`$`文字を出力するには、シングルクォートを使用するか、バックスラッシュでエスケープしてください（`\`）：
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
  group="部分文字列の置換"
  title="部分文字列の置換"
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
    ここでは何が起こっている？
    ```bash
        str="Bark bark"
        echo ${str/bark/meow}
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    `${var/pattern/replacement}` 構文は、`pattern` の最初の出現を `replacement` で置換します。ここでの出力は:
    ```plaintext
        Bark meow
    ```
    これは大文字小文字を区別します。`bark` と `Bark` の両方を処理するには、`${var/[Bb]ark/Bark}` のようなパターンを使用するか、置換前に文字列を正規化してください。

    すべての出現を置換するには `${var//pattern/replacement}` を、
    文字列の先頭から置換するには `${var/#pattern/replacement}` を、
    文字列の末尾から置換するには `${var/%pattern/replacement}` を使用します。
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={5}
  group="文字列の長さ"
  title="文字列の長さ"
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
    Bashで変数の長さを取得する方法は？
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    `${#username}`構文は`username`の長さを返します。

    例:
    ```bash
        username="@justsml"
        echo ${#username} # => 8
    ```
    `wc`は機能しますが、これは厳密にBashの一部ではありません。

    `wc`ユーティリティは古くからあるジョークで「water closet（トイレ）」を指していました。
    ジョークです！誰かこれらを読んでいるのでしょうか？

    実際には`wc`はPosix（およびAT&T Unix時代）からの古いコマンドで、ファイルや入力ストリームの行数・単語数・文字数をカウントします。
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={6}
  group="条件分岐"
  title="基本的なif-else"
  options={[
    {text: 'ファイルが存在する場合'},
    {text: 'ファイルが存在しないが、テスト診断後に処理される', isAnswer: true},
    {text: 'エラーのみ'},
    {text: '二重括弧が不足している'},
    {text: '何も出力しない'},
  ]}
>
  <slot name="question">
  <div className="question">
    ファイル`cats.txt`が存在する場合、このスクリプトは何を出力しますか？
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
    閉じ括弧の前のスペースが不足していることに気づけましたか？

    Bashはここでは非常に敏感です: 括弧内にスペースが必要です。

    スペースの不足により`[`コマンドが閉じ` ]`を見逃し、Bashは診断メッセージを表示し、テストを失敗扱いにしてelseブランチに進みます。

    正しい構文は次の通りです:
    ```bash
        if [ -e example.txt ]; then
          echo "File exists"
        else
          echo "File does not exist"
        fi
    ```
    注: 条件式には**二重括弧`[[ ]]`**の使用を推奨します。[BashFAQを参照してください。](https://mywiki.wooledge.org/BashFAQ/031)
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={7}
  group="条件分岐"
  title="文字列の比較"
  options={[
    {text: '同じ猫'},
    {text: 'テスト構文エラー後の異なる猫', isAnswer: true},
    {text: 'ザルゴ'},
    {text: 'エラーのみ'},
  ]}
>
  <slot name="question">
  <div className="question">
    Bashで文字列を比較する方法は？
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
    別のテスト構文エラー！

    無効な`===`演算子に気づきましたか？

    JavaScriptを思い出したかもしれませんね…

    `[ ... ]`ではBashは診断情報を報告し、条件がfalseになるため`else`分岐で`Different cats`を出力します。Bashでは等価比較に`=`または`==`を使用してください。
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={8}
  group="関数"
  title="関数の宣言"
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
    このスクリプトは何を出力しますか？
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
    Bashの関数は引数を受け取ることができます。`$1`変数は関数に渡された最初の引数を保持します。

    覚えておきましょう。`$0`はスクリプト名、`$1`は最初の引数、`$2`は2番目の引数であり、スペースで引数が区切られます。したがって、`greet Hi Dan`は`"Hi"`を最初の引数として渡します。`"Hi Dan"`を単一の引数として渡すには、クォートが必要です：`greet "Hi Dan"`。
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={9}
  group="構成"
  title="パイピングの使用"
  options={[
  ]}
>
  <slot name="question">
  <div className="question">
    コマンドの**出力**を次のコマンドの**入力**に接続する演算子は何ですか？
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    パイプ演算子`|`は、1つのコマンドの出力を別のコマンドの入力に接続します。例えば:
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
  group="算術"
  title="基本的な算術"
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
    Bashで算術はどのように扱いますか？
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    `(( ))`の構文はBashで整数算術を実行します。

    簡単な計算に使用できます:
    ```bash
        ((result = 2 + 2))
        echo $result # => 4
    ```
    条件式にも利用可能です:
    ```bash
        if (( 2 > 1 )); then
          echo "2 is greater than 1"
        fi
    ```
    浮動小数点演算が必要な場合は、[`bc`](https://www.gnu.org/software/bc/manual/html_mono/bc.html)や[`awk`](https://www.gnu.org/software/gawk/manual/gawk.html)の利用を検討してください。
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={11}
  group="乗算"
  title="基本的な算術"
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
    これらのうち、10と0.5を掛けて5を出力するのはどれですか？
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    `(( ))`の構文は**整数**算術のみを実行します。小数点を含む浮動小数点計算はサポートされていません！

    Bashは（驚くべきことに）**組み込みの**浮動小数点算術サポートを持っていません。

    最も一般的な解決策は、GNUユーティリティ[`bc`](https://www.gnu.org/software/bc/manual/html_mono/bc.html)や[`awk`](https://www.gnu.org/software/gawk/manual/gawk.html)を使うことです。
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={12}
  group="文字列操作"
  title="部分文字列の抽出"
  options={[
    {text: '悪い猫'},
    {text: '悪い猫、良い猫:9'},
    {text: '良い猫', isAnswer: true},
    {text: 'エラー'},
  ]}
>
  <slot name="question">
  <div className="question">
    このスクリプトで`:`はどのような働きをするか？
    ```bash
        rosie="Bad cat, good cat"
        echo ${rosie:9}
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    `${var:offset}`という構文は、`offset`から始まる部分文字列を抽出します。ここでは、出力は次のようになります：
    ```plaintext
        good cat
    ```
    特定の長さの部分文字列を抽出するには`${var:offset:length}`を使用します。

    文字列の末尾から抽出するには`${var: -offset}`を使います。（`-`の前にスペースがあることに注意！）
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={13}
  group="ループ"
  title="Bashでのループ"
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
    Bashでルーピングのキーワードでないのはどれですか？❌
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    `each`はBashのループキーワードではありません。主なループキーワードは`for`、`while`、`until`です。

    `do`は厳密にはループキーワードではありませんが、ループ構文の重要な一部です。
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={14}
  group="落とし穴"
  title="コマンド置換"
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
    どのオプションがコマンド `ls -l` を実行して出力を返しますか？
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    `$(ls -l)` の構文は**括弧内**のコマンドを実行し、出力を置換します。例えば：
    ```bash
        echo "Today is $(date +%F)"
        # => Today is 2029-12-31
    ```
    1番目のオプションは**シングルクォート** `'` を使用しています。これは展開を防ぎ、`'$(date +%F)'` は単に文字列 `$(date +%F)` を出力します。

    バッククォート（`` `ls -l` ``）によるコマンド実行は依然サポートされていますが、最近は一部の文脈では**アンチパターン**とされています。より読みやすく、シェルのバージョンや種類に一貫性を持たせるために `$(command)` の使用が推奨されます。

    **中括弧** `${}` は変数展開用で、コマンド置換には使われません。

    `%` 文字はコマンド置換には使用されません。
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={15}
  group="標準入出力"
  title="デフォルト値"
  options={[
  ]}
>
  <slot name="question">
  <div className="question">
    エラー出力を標準出力に結合するためには、どの演算子を使用しますか？
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    `2>&1` 演算子は、標準エラー出力（ファイル記述子2）を標準出力（ファイル記述子1）にリダイレクトします。これは、通常の出力と同じストリームにエラーメッセージをキャプチャするのに役立ちます。
  </div>
  </slot>
</Challenge>

</QuizUI>

<p className="inset">私のBashクイズで混乱しましたか？</p>

コメントで教えてください！

### 補足資料

Bashスキルをブラッシュアップするための以下のリソースをご覧ください:

- [Bashガイド](https://www.gnu.org/software/bash/manual/bash.html)
- [BashFAQ](http://mywiki.wooledge.org/BashFAQ)
- [ShellCheck](https://www.shellcheck.net/)
- [Bashアカデミー](https://guide.bash.academy/)
- [Bashスクリプティングチュートリアル](https://ryanstutorials.net/bash-scripting-tutorial/)
- [Bashリファレンスマニュアル](https://www.gnu.org/software/bash/manual/bash.html)
- [Bashハッカーズウィキ](http://wiki.bash-hackers.org/)
- [Bash初心者向けガイド](http://tldp.org/LDP/Bash-Beginners-Guide/html/index.html)
- [Bashリファレンスカード](http://www.tldp.org/LDP/Bash-Beginners-Guide/html/Bash-Beginners-Guide.html)
````
