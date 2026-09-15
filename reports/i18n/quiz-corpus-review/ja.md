# Japanese quiz corpus review

Reviewed 2026-09-14. Scope: all 19 Japanese quiz translations, 267 questions and 1,231 options. Every question, option, explanation and available hint was compared with English. No external AI provider was called. Final content was edited directly; historical model scores/sourceHash frontmatter were not fabricated or refreshed.

## Evidence

- All 19 files compile with the MDX compiler after edits.
- All 267 question counts, option counts and correct-answer positions match the current English source. All question code matches after whitespace normalization; no question, explanation or option is empty.
- Localized browser selection is being verified by the parent task corpus Playwright suite; this language review does not independently claim browser completion.
- The per-locale validator was run for all 19. Its remaining failures include translated diagnostic descriptions treated as immutable code and regex inline text interpreted as structural HTML. These are handed to the parent task for shared-validator repairs. Compilation and answer-key parity are separate evidence, not substitutes for those repairs.

## Terminology consensus

Related Japanese articles were inspected locally. The URL regex article uses 先読み・後読み; the Docker security guide uses 最小権限; the foreign-key performance article uses 結果整合性. This review follows those forms. 分割代入, ライフタイム, 内部可変性, 詳細度, 連結リスト, 最小ヒープ, レスポンシブ are used for their respective concepts. Executable keywords, API/type names, SQL, numeric values and literal console outputs remain unchanged; surrounding explanation and descriptive error labels are Japanese.

## Review ledger

| Quiz | Questions | Options | Review and fixes |
|---|---:|---:|---|
| quiz-postgres-sql-mastery-pt1 | 14 | 69 | Q2 typed-literal terminology; Q5 distinct option meanings and UTC-vs-wall-clock explanation; Q12 precision prompt; restored heading and broken relative navigation links. |
| quiz-is-your-memory-rusty | 18 | 78 | Q1/Q6/Q8 output literals preserved; Q5/Q6/Q14 untranslated labels/hints translated; Q9 original panic distinguished from fixed example; RwLock spelling; restored difficulty/objectives. |
| quiz-bash-in-the-shell | 16 | 84 | Literal output options restored in Q7/Q8/Q13, contextual diagnostics localized; single-quote mechanism clarified; Q14 reserved-word scope; Q16 title and omitted references restored. |
| quiz-regex-or-wreckage | 16 | 71 | Lookbehind consistently 後読み (not backreference); Q5 reversed direction repaired; Q12 escaping prose repaired. Sass123! remains the valid eight-character answer. |
| quiz-css-core-fundamentals | 14 | 77 | Specificity consistently 詳細度; Q4 descendant vs child distinction; Q9 invalid align property removed and question scoped to horizontal inline text. |
| quiz-modern-css-2025 | 11 | 52 | レスポンシブ spelling; translated invalid-syntax label; CSS variable fallback distinguished from unsupported-browser fallback. |
| quiz-postgres-sql-mastery-pt2 | 12 | 58 | All 12 questions/options/explanations reviewed. Existing Japanese conceptual answers retained; shared SQL standards/performance caveats listed below. |
| quiz-sql-query-fundamentals | 11 | 47 | Q5 correlation defined semantically with optimizer caveat; Q8 IN does not deduplicate and does not require UNIQUE index. |
| javascript-promises-quiz | 9 | 37 | Q3 ordinary return including Error fulfills; Q5 catch recovery does not require a later then; Q8 broken inline code repaired; source code indentation aligned. |
| quiz-nodejs-files-streams-buffers-oh-my | 15 | 64 | allocUnsafe is uninitialized, not random data; streaming buffers chunks without whole-file buffering; undefined literals restored; watch question wording; object mode excludes null; link label translated. |
| quiz-do-you-know-esnext | 11 | 46 | All 11 answers retained; missing source hints translated and restored. |
| quiz-advanced-js-error-mastery | 14 | 56 | Q4 explicit cross-realm setup and spoofing caveat; Q9 V8 scope; Q14 precise false/false explanation; Q13 availability wording; all omitted hints translated. |
| quiz-data-structures-algorithms | 20 | 92 | Q3 no cached length; Q7 recursion-stack DFS; Q11 greedy priority-queue shortest paths; algorithm labels localized; 連結リスト/最小ヒープ consistent; hints restored. |
| quiz-destructuring-delights | 12 | 74 | Literal English output kept unchanged across Q1/Q2/Q4/Q5/Q7/Q10/Q12; 分割代入 terminology; omitted TypeScript heading and quiz navigation restored. |
| js-quiz-14-date-time-questions-test-your-knowledge | 14 | 59 | Q3 callable Date semantics; Q7 NaN then TypeError; Q4/Q5/Q9 timezone assumptions; DST-sensitive offset; Q13 entirely untranslated explanation translated; date questions ask represented date rather than console formatting. |
| quiz-can-you-count-to-bigint | 13 | 63 | parseInt ignores leading whitespace (not arbitrary internal whitespace); omitted introduction quote restored. |
| quiz-js-interfaces-symbols-and-enumerables | 7 | 29 | Untranslated context option localized; source hints slot structure restored; all seven answer keys retained. |
| quiz-in-the-aws-cloud | 26 | 119 | Restored all difficulty/objective metadata; Q9 fixed API limit; Q10 scoped UpdateItem; Q11 capacity tradeoff; Q24 object-operation consistency scope; 最小権限 and 結果整合性 terminology; mistranslated GSI cost/lifecycle prose repaired. |
| quiz-master-modern-html5 | 14 | 56 | Q2 precise dd definition and distinct distractor; Q3 general figure/caption purpose with explicitly exclusive false distractors. |

## Remaining shared-source caveats

The parent task owns source edits and final cross-language alignment. The review raised Node uninitialized buffer/stream buffering, SQL correlation and IN semantics, AWS API-limit and consistency scope, DSA ambiguous algorithms, HTML overlapping descriptions, and Promise recovery; the corresponding Japanese changes are applied. Future source changes require a fresh alignment pass. PostgreSQL part 2 still uses broad historical SQL-standard wording and index-planner generalizations; no live database execution was performed by this language reviewer. AWS service claims require the parent task official-document verification rather than treating a fluent translation as proof.

## Source snapshots and answer ledger

Hashes below identify the files inspected at report generation. Correct option numbers are one-based, and reflect the reviewed key rather than browser execution.

### quiz-postgres-sql-mastery-pt1

Source SHA-256: 8cb97e01f93954cd744f660f427ef83528e228aef5df6c5bdeae527f140c09b6

| Question | Title | Correct option | Answer |
|---:|---|---:|---|
| 1 | 組み込み集約関数 | 4 | MEDIAN |
| 2 | 型変換の構文のバリエーション | 3 | CAST('95', INTEGER) |
| 3 | UNIQUE制約とNULL値 | 3 | 複数のNULL値を許可 |
| 4 | 日付の算術演算 | 4 | 2024-11-28 00:00:00 |
| 5 | timestamptz vs timestamp | 1 | どちらも8バイトだが、表す日時の意味が異なる |
| 6 | 無効なタイプを識別する | 4 | STRING(100) |
| 7 | 無効なデータ型を特定する | 6 | decimal128 |
| 8 | 無効なタイプを特定する | 3 | ipv4 |
| 9 | 無効なタイプを特定する | 4 | currency |
| 10 | 無効な型を識別する | 6 | triangle |
| 11 | 整数のオーバーフロー | 2 | Error: integer out of range |
| 12 | タイムスタンプの精度 | 4 | 2024-01-08 13:30:00.1234567 |
| 13 | 無効なタイプを特定する | 5 | tsrank |
| 14 | チェック制約の検証タイミング | 1 | 新規または変更された行に対して即座に |

### quiz-is-your-memory-rusty

Source SHA-256: e31e6449bc819ea5691b0d41998b3052afe28378c4dbe0bab4551abe753c2f9c

| Question | Title | Correct option | Answer |
|---:|---|---:|---|
| 1 | 基本的なムーブセマンティクス | 5 | コンパイルエラー：ムーブ後に値が借用されました |
| 2 | 関数におけるムーブセマンティクス | 3 | コンパイルエラー |
| 3 | 可変参照 | 2 | エラー：`wisdom`を可変として2回以上借用できません |
| 4 | 暗黙のライフタイム | 1 | 正常にコンパイルされる |
| 5 | Boxスマートポインタ | 3 | コンパイルエラー |
| 6 | Rcスマートポインタ | 3 | Reference count: 3 |
| 7 | 構造体のライフタイム | 2 | エラー: ライフタイム指定子が不足しています |
| 8 | ライフタイム注釈 | 2 | エラー: ライフタイム指定子が不足しています |
| 9 | RefCellの動作 | 2 | 実行時パニック: RefCellは既に借用されています |
| 10 | Cell と RefCell | 1 | 出力: 42, 43 |
| 11 | Rcの理解 | 1 | Rcはシングルスレッド環境で使用される |
| 12 | RefCellとスレッディング | 4 | RefCellはSyncではなく、RwLockは同期された共有を提供する |
| 13 | ArcとMutex | 5 | デッドロックまたはパニック |
| 14 | 弱参照 | 2 | 出力: None |
| 15 | RAIIパターン | 1 | リソースはスコープ後に解放される |
| 16 | コピー vs クローン | 2 | ディープコピーが作成される |
| 17 | メモリ最適化 | 3 | 32バイト |
| 18 | ゼロコスト抽象化 | 2 | イテレータは手書きループと同程度に効率的になり得る |

### quiz-bash-in-the-shell

Source SHA-256: ea4b4440293b28444b461e783c6f33db1a9d797e64fa8a5987034d8dada9f631

| Question | Title | Correct option | Answer |
|---:|---|---:|---|
| 1 | 変数の宣言 | 2 | name=Dan |
| 2 | クォートのエスケープ | 3 | echo 'It'\''s 🔨 Time!' |
| 3 | echoコマンド | 2 | cat cbt |
| 4 | エスケープ文字 | 4 | Cost: 00 |
| 5 | 部分文字列の置換 | 3 | Bark meow |
| 6 | 文字列の長さ | 3 | ${#username} |
| 7 | 基本的なif-else | 2 | File does not exist（テストの診断メッセージの後） |
| 8 | 文字列の比較 | 2 | Different cats, （テストの構文エラーの後） |
| 9 | 関数の宣言 | 1 | Hi |
| 10 | パイピングの使用 | 3 | &#124; |
| 11 | 基本的な算術 | 4 | echo $(( 2 + 2 )) |
| 12 | 基本的な算術 | 6 | echo '10 * 0.5' &#124; bc |
| 13 | 部分文字列の抽出 | 3 | good cat |
| 14 | Bashでのループ | 2 | each |
| 15 | コマンド置換 | 4 | $(ls -l) |
| 16 | 標準エラー出力のリダイレクト | 3 | 2>&1 |

### quiz-regex-or-wreckage

Source SHA-256: 10ac88ad77540507d3992e3b6500e5cc1e13152dd22a82a20d0adce4ac8b4a25

| Question | Title | Correct option | Answer |
|---:|---|---:|---|
| 1 | 大文字小文字の区別マッチング | 3 | ["cat"] |
| 2 | シンプルな文字マッチング | 1 | ["cat", "hat"] |
| 3 | 貪欲 vs 非貪欲 | 4 | ["<div>Hello</div>", "<div>World</div>"] |
| 4 | ドットメタ文字 | 2 | ["hello", "world"] |
| 5 | 肯定先読み | 5 | null |
| 6 | 単語境界 | 2 | ["cat"] |
| 7 | グローバルフラグ | 3 | ["a", "a", "a"] |
| 8 | 否定後読み | 3 | ["23", "456"] |
| 9 | キャプチャグループ | 2 | ["2029", "12", "31"] |
| 10 | 否定先読み | 4 | ["12"] |
| 11 | 後読みで分割 | 1 | ["a,", "b,", "c"] |
| 12 | 特殊文字のエスケープ | 4 | null |
| 13 | 肯定後読み | 2 | ["100"] |
| 14 | 遅延 vs 貪欲量指定子 | 2 | ["bold"] |
| 15 | Unicode フラグ | 2 | ["😀", "🙂"] |
| 16 | パスワード検証 | 2 | "Sass123!" |

### quiz-css-core-fundamentals

Source SHA-256: 2788fc04e78db4ccdb705b06b915c55e4c625810b09885221f455cf12e3edaaf

| Question | Title | Correct option | Answer |
|---:|---|---:|---|
| 1 | フォントサイズに無効なCSS単位 | 1 | 10cx |
| 2 | 16進数コード | 3 | #ABCD |
| 3 | おっと、すべての単位！ | 14 | rel |
| 4 | HTML要素にマッチするセレクタ | 4 | a#home[name='home'] |
| 5 | ボタンの属性セレクタ | 4 | button[onclick] |
| 6 | 無効な CSS セレクタ | 3 | c > > d {} |
| 7 | 最後のリンクを選択する | 5 | a:last-child |
| 8 | セレクタの優先度 | 3 | a#quote |
| 9 | ブロック要素内のテキストを中央揃え | 4 | text-align: center; |
| 10 | ブロック要素を垂直方向に中央揃えする | 3 | align-content: center; |
| 11 | 入れ子になったフォントサイズのピクセルサイズ計算 | 2 | 5px |
| 12 | REMでピクセルサイズを計算する | 2 | 12px |
| 13 | EMでピクセルサイズを計算 | 5 | 24px |
| 14 | ゼロ詳細度セレクタ | 1 | :where(.card) .title |

### quiz-modern-css-2025

Source SHA-256: 7f302e5782ff1d262f8af1bb22cfe184f7490015bc2bf8e7becc3fc5936fdd2e

| Question | Title | Correct option | Answer |
|---:|---|---:|---|
| 1 | CSS変数の使用 | 3 | background-color: var(--main-color); |
| 2 | CSSのmin()関数 | 2 | width: 200px; |
| 3 | CSSのmax()関数 | 5 | width: 96px; |
| 4 | CSS minmax() 関数 | 3 | 1列目の幅が100pxから200pxの間になる |
| 5 | CSS変数のフォールバック | 4 | #6b8e23 |
| 6 | clamp()を使用したレスポンシブデザイン | 3 | 200px〜500pxの間で線形スケール |
| 7 | ネイティブCSSネスティング | 3 | はい |
| 8 | CSSネスティング | 4 | 完璧です。注記不要。 |
| 9 | ネスト付きの子要素セレクター | 2 | background-color: white |
| 10 | 実行時にCSS変数を変更する | 2 | JavaScriptを使用して |
| 11 | CSS変数とcalc()の使用 | 3 | Width: 110px |

### quiz-postgres-sql-mastery-pt2

Source SHA-256: b97ed535e3eced922287f21009e9b99a8a074cc2ea569e7d9e52c8572ac06cce

| Question | Title | Correct option | Answer |
|---:|---|---:|---|
| 1 | PostgreSQLの多様なJOIN | 1 | JOIN ALL |
| 2 | 自動インクリメントのモダンな手法 | 5 | id BIGINT GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY |
| 3 | 標準規格への準拠 | 4 | RETURNING |
| 4 | 自動ロールバック | 2 | すべてのステートメントをロールバックする |
| 5 | ハッシュ結合の適合性 | 1 | ON a.id = b.id |
| 6 | マルチカラムインデックスの順序 | 1 | CREATE INDEX ON students(grade_level, last_name); |
| 7 | 適切なクォーティング | 2 | ダブルクォートが必要 |
| 8 | カラム名のクォーティング | 2 | "first.name" |
| 9 | TABLESAMPLE の構文 | 8 | WHERE RANDOM() >= 0.9 |
| 10 | 部分インデックス | 3 | アクティブな生徒のみをインデックスする |
| 11 | COUNT と NULL | 4 | 1 |
| 12 | EXPLAIN ANALYZE の落とし穴 | 3 | データを更新し、実行計画を出力する |

### quiz-sql-query-fundamentals

Source SHA-256: 4788ec9e33c53b4fb819c0e7e472f3a737b497b83add5049de127d7dcc4b32ad

| Question | Title | Correct option | Answer |
|---:|---|---:|---|
| 1 | 基本的な WHERE 句 | 2 | SELECT * FROM users WHERE name = 'John'; |
| 2 | 集計関数 COUNT | 2 | 列の非 NULL 値のみをカウントする |
| 3 | LEFT JOIN の基本 | 2 | 左テーブルのすべての行と、マッチする右テーブルの行を返します |
| 4 | INNER JOIN の使用 | 3 | 結合条件を満たす両テーブルの行を返す |
| 5 | 相関サブクエリ | 4 | 外側のクエリの列を参照するサブクエリ |
| 6 | WITH句の構文 | 4 | 大きなSQL文で使用する一時的な結果セットを定義する |
| 7 | IS NULL と IS NOT NULL | 1 | 値が NULL かどうかをチェックする |
| 8 | IN 演算子の使用 | 4 | 指定リストの値に一致する行を返す |
| 9 | COALESCE 関数の使用 | 3 | 最初の非 NULL 引数を返す |
| 10 | GROUP BY の使い方 | 4 | 指定した列で行をグループ化する |
| 11 | FULL OUTER JOIN の基礎 | 5 | 両テーブルのすべての行を返し、一致しない行には NULL を入れる |

### javascript-promises-quiz

Source SHA-256: ead6cb486ce9cef02d253b30715e77820dde44c9a310546a0532e7164078dd5a

| Question | Title | Correct option | Answer |
|---:|---|---:|---|
| 1 | 複数の `.catch` #1 | 2 | メッセージが2回表示される |
| 2 | 複数の .catch #2 | 3 | 未処理の拒否済みプロミス |
| 3 | `.then`と`.catch`のチェーン | 1 | エラーと`undefined`を出力 |
| 4 | `.catch`のチェーン | 1 | エラーメッセージを一度だけ出力 |
| 5 | 複数の `.catch` | 4 | 何も表示されない |
| 6 | `.then`間のフロー | 3 | 「SUCCESS!」を出力 |
| 7 | `.then`間のフロー | 3 | 「SUCCESS!」と「SUCCESS!」の両方を出力 |
| 8 | `.then`間のフロー | 4 | undefinedを出力する |
| 9 | `.then`と`.catch`の間のフロー | 3 | 「The fails!」を出力する |

### quiz-nodejs-files-streams-buffers-oh-my

Source SHA-256: 77b0246b9c8275d11d3ca3108732512ae203d0d5f45f379aeb5166c248928930

| Question | Title | Correct option | Answer |
|---:|---|---:|---|
| 1 | バッファの割り当て | 1 | サイズ5でゼロで埋めたバッファを作成します |
| 2 | バッファから文字列への変換 | 1 | A |
| 3 | 非同期ファイル操作 | 2 | 'Done'を出力した後にファイル内容を出力する |
| 4 | ファイルの同期読み取り | 1 | バッファを返す |
| 5 | ストリームイベント | 1 | 'data', 'end', 'error', 'close' |
| 6 | ストリームのパイピング | 2 | ファイル全体をメモリに保持せず、チャンク単位でコピー |
| 7 | ディレクトリ操作 | 1 | 必要に応じてネストされたディレクトリを作成する |
| 8 | トランスフォームストリーム | 2 | HELLO WORLD |
| 9 | ファイルの監視 | 2 | 保証されていない；複数回発生する可能性あり |
| 10 | バッファの比較 | 2 | false |
| 11 | ストリームのバックプレッシャー | 1 | メモリオーバーフローを防ぐ |
| 12 | シンボリックリンク | 3 | シンボリックリンクを作成します |
| 13 | ストリームモード | 3 | 両方のモード |
| 14 | ファイルディスクリプタ | 1 | 数値 |
| 15 | バッファのエンコーディング | 5 | 10 |

### quiz-do-you-know-esnext

Source SHA-256: 63cd3ddef63907f8281b7060db5b8004bf7bac2067f84fcdf01ca8bd8b18c3fb

| Question | Title | Correct option | Answer |
|---:|---|---:|---|
| 1 | Null 合体演算子 | 4 | 100 |
| 2 | Null 合体演算子 | 1 | false |
| 3 | オプショナルチェイニング | 1 | undefined |
| 4 | BigInt の使用 | 3 | 84n |
| 5 | 動的インポート構文 | 4 | object |
| 6 | Promise.allSettled | 1 | fulfilled: success |
| 7 | String.matchAll の使い方 | 2 | マッチのイテレータ |
| 8 | Import Meta の使用 | 1 | 現在のモジュールの URL |
| 9 | 論理代入 | 2 | 10 |
| 10 | 論理 Nullish 代入 | 2 | 10 |
| 11 | WeakRef の使用 | 2 | { data: 'important' } |

### quiz-advanced-js-error-mastery

Source SHA-256: f0ef81ef5c1727d2a8a11e8a819b501a09ccb4f36e8014f758f36aa09b22961a

| Question | Title | Correct option | Answer |
|---:|---|---:|---|
| 1 | 空オブジェクトの謎 | 2 | {} |
| 2 | コンソール vs JSON | 2 | console.log はより多くの情報を表示する |
| 3 | instanceof 継承 | 1 | true, true, true |
| 4 | クロスフレーム instanceof | 3 | フレーム間では false になることがある |
| 5 | 文字列スロー | 2 | false, "string" |
| 6 | エラー名プロパティ | 2 | "CustomError" |
| 7 | コンストラクタ名の罠 | 2 | "Error" |
| 8 | モダン Error.cause | 1 | "Original error" |
| 9 | スタック操作 | 1 | スタックから createError を削除する |
| 10 | エラーでのテンプレートリテラル | 2 | "Value undefined is invalid" |
| 11 | Express レスポンスエラー | 2 | `{"error":{}}` を送信する |
| 12 | Promise の拒否値 | 2 | 任意の値を拒否できる |
| 13 | 非標準プロパティ | 2 | すべての環境で存在するとは限らない |
| 14 | オブジェクト vs エラー検出 | 2 | false, false |

### quiz-data-structures-algorithms

Source SHA-256: f258c619229805a1a020c8a04e43e9e2c1a98845a967429d069e1b53648bd1b9

| Question | Title | Correct option | Answer |
|---:|---|---:|---|
| 1 | スタック vs キュー | 3 | スタック |
| 2 | ビッグ O 表記 | 1 | O(1) |
| 3 | 連結リストの長さ計算 | 4 | O(n) |
| 4 | 二分探索木の検索 | 2 | O(log n) |
| 5 | マージソートの計算量 | 3 | O(n log n) |
| 6 | DFS vs BFS | 1 | キュー |
| 7 | グラフにおけるサイクル検出 | 4 | 深さ優先探索（DFS） |
| 8 | ヒープソートの計算量 | 2 | O(n log n) |
| 9 | ハッシュテーブルの時間計算量 | 3 | O(1) |
| 10 | スタック操作 | 1 | Push、Pop、Peek |
| 11 | 最短経路アルゴリズム | 4 | Dijkstra's Algorithm |
| 12 | 自己平衡探索木 | 2 | AVL木 と 赤黒木 |
| 13 | 再帰のベースケース | 3 | 基本ケース |
| 14 | キュー操作 | 1 | エンキューとデキュー |
| 15 | トポロジカルソート | 4 | グラフは有向で非循環である必要がある |
| 16 | フィボナッチ再帰の計算量 | 2 | O(2^n) |
| 17 | 優先度キューの実装 | 3 | ヒープ |
| 18 | 二分木の走査 | 1 | 中順、前順、後順 |
| 19 | ヒープの性質 | 4 | 根は最小要素であり高さは O(log n) である |
| 20 | バブルソートの安定性 | 2 | 安定 |

### quiz-destructuring-delights

Source SHA-256: 467e43bad93a2cacd7b0996c571584dcceb98969f924aa31ef9ba672a077ef90

| Question | Title | Correct option | Answer |
|---:|---|---:|---|
| 1 | 基本的なオブジェクト分割代入 | 4 | Name: Dan Levy, Age: undefined |
| 2 | オブジェクトの分割代入におけるデフォルト値 | 3 | Name: Dan Levy, Age: undefined |
| 3 | 入れ子の分割代入 | 5 | エラー |
| 4 | オブジェクトの分割代入におけるデフォルト値 | 5 | エラー |
| 5 | オブジェクトの分割代入におけるデフォルト値 | 3 | Hi Dan from Unknown |
| 6 | デフォルト付き関数パラメータの分割代入 | 6 | Error |
| 7 | ネストされたデフォルト値を使った分割代入 | 6 | N/A, N/A, Joburg |
| 8 | ネストされたデフォルト値を使った分割代入 | 6 | null, N/A |
| 9 | 入れ子デフォルト値を使った分割代入 | 5 | TypeScript エラー |
| 10 | ネストされたデフォルト値を使った分割代入 | 5 | Denver |
| 11 | ネストされたデフォルト値を使った分割代入 | 3 | エラー: プロパティ 'birth' と 'age' がありません |
| 12 | ネストされた値、代入、型を使った分割代入 | 5 | エラー |

### js-quiz-14-date-time-questions-test-your-knowledge

Source SHA-256: fcef89818a405467abb8281315473a211b41b4e815d14835c8264d8fc8804f29

| Question | Title | Correct option | Answer |
|---:|---|---:|---|
| 1 | Dateコンストラクタ パート1 | 2 | 2020年2月1日 |
| 2 | Dateコンストラクタ パート2 | 1 | Jan 01 2020 |
| 3 | Dateコンストラクタ パート3 | 4 | 現在の日付 |
| 4 | Dateコンストラクタ その4 | 1 | 1969 |
| 5 | 日付文字列の解析 | 1 | 2019 2020 |
| 6 | 書式設定 パート1 | 2 | date.toLocaleFormat('en-US') |
| 7 | UTC日付 パート1 | 3 | TypeError |
| 8 | UTC日付 パート2 | 3 | 1970年1月1日GMTからのミリ秒 |
| 9 | UTC日付 パート3 | 2 | 420 |
| 10 | 日付セッター パート1 | 1 | 2020年1月1日 |
| 11 | 日付セッター パート2 | 2 | 2月 01 2020 |
| 12 | 日付のセッター パート3 | 2 | 1月 01 2021 |
| 13 | 日付セッター パート4 | 4 | Feb 01 2021 |
| 14 | 日付セッター パート5 | 4 | 2019年12月1日 |

### quiz-can-you-count-to-bigint

Source SHA-256: 15d65ba75475634f5d393dbf2afecb70b7496d8a0b56b7fe7f36a9f0b32726d1

| Question | Title | Correct option | Answer |
|---:|---|---:|---|
| 1 | `parseInt` によるパース処理 | 1 | 123456 |
| 2 | カンマの処理 | 1 | 123 |
| 3 | 浮動小数点数の精度 | 2 | false |
| 4 | Infinityの扱い | 1 | Infinity |
| 5 | .toFixed() による文字列変換 | 5 | "5.00" |
| 6 | `parseInt` と `parseFloat` の等値比較 | 1 | true |
| 7 | BigInt との等値比較 | 3 | false |
| 8 | 16進数のパース | 1 | true |
| 9 | 基数指定によるパース | 1 | 255 |
| 10 | .map(parseInt) の使用 | 1 | [24, NaN, NaN] |
| 11 | `.map(Number)` の使用 | 1 | [24, NaN, 34] |
| 12 | null の扱い | 4 | NaN 0 |
| 13 | 基数指定のパース | 5 | 1112745 |

### quiz-js-interfaces-symbols-and-enumerables

Source SHA-256: c31ed61019199a9690cb1c1f02182365a0ddb2c7c99eb9ad49da340c96dd83f9

| Question | Title | Correct option | Answer |
|---:|---|---:|---|
| 1 | Getter と直接プロパティアクセス | 3 | 直接値にアクセスする |
| 2 | オブジェクトキーにおける Symbol の使用 | 1 | Symbol を使用する |
| 3 | 列挙可能なプロパティ | 4 | はい、列挙されます |
| 4 | Object.defineProperty() のデフォルト列挙可能性 | 2 | false |
| 5 | ユニークシンボル | 3 | false |
| 6 | シンボルは列挙されないキー | 1 | いいえ、列挙されません |
| 7 | すべての Symbol キーを取得 | 4 | Object.getOwnPropertySymbols() |

### quiz-in-the-aws-cloud

Source SHA-256: 9690cc0b49efc10047045e06bd765e746a16b0bb5456fa9cf8d786a3cfdc7e30

| Question | Title | Correct option | Answer |
|---:|---|---:|---|
| 1 | S3に関するクイズ | 3 | シンプル ストレージ サービス |
| 2 | DynamoDB | 1 | 任意のプロパティを保存可能 |
| 3 | DynamoDB | 4 | UpdateItem |
| 4 | 高度な検索機能 | 2 | OpenSearch |
| 5 | マルチ-AZ展開 | 3 | 自動フェールオーバーを提供 |
| 6 | WebSocketのマジック | 1 | API Gateway |
| 7 | S3バケットポリシー | 4 | 最小権限の原則を適用する |
| 8 | Aurora Serverless | 2 | コンピュート容量を自動的にスケーリングする |
| 9 | BatchGetItemの制限 | 3 | 100 |
| 10 | バッチ操作 | 1 | 1 |
| 11 | プロビジョニングとオンデマンド容量の比較 | 4 | 断続的で予測しにくい負荷で、未使用のプロビジョニング容量を減らしたい場合 |
| 12 | S3パフォーマンスの最適化 | 2 | 論理的なプレフィックスを使用する。ランダム化は必要ない |
| 13 | RDSバックアップ戦略 | 3 | ポイントインタイムリカバリを備えた自動バックアップ |
| 14 | Redis と Memcached の違い | 1 | Redisはより多くのデータ構造と操作をサポートしています |
| 15 | Global Secondary Index | 4 | 主キー属性以外でクエリを実行可能 |
| 16 | S3ライフサイクル管理 | 2 | ストレージクラス間でオブジェクトを自動的に移行 |
| 17 | Amazon Auroraでの読み取りスケーリング | 3 | 最大15の読み取りレプリカをサポート |
| 18 | RDSの暗号化 | 1 | 静的データと通信中のデータを暗号化する |
| 19 | DynamoDBストリームの目的 | 4 | イベント駆動型アーキテクチャ用にアイテムレベルの変更をキャプチャする |
| 20 | 大規模なファイル転送 | 2 | 大規模なファイルにはマルチパートアップロードを使用する |
| 21 | ストレージコスト分析 | 3 | アクセスパターンに基づいてストレージクラスを混合する |
| 22 | 一貫性モデル | 1 | 1秒あたり100回の読み取り |
| 23 | Auroraのフェイルオーバーメカニズム | 4 | フェイルオーバー優先度のティアに基づく自動昇格 |
| 24 | S3の強一貫性 | 2 | オブジェクトの書き込み後の読み取りと一覧取得で強い整合性 |
| 25 | 生存期間 (TTL) | 3 | ベストエフォート方式のタイミングでバックグラウンド削除 |
| 26 | スケーリングの挙動 | 1 | スケーリング速度は現在の容量と構成済み容量に依存する |

### quiz-master-modern-html5

Source SHA-256: 9320d673f59fafb3da0b9c01736b3b54a103301210b176a3e5c5c78e771b7b74

| Question | Title | Correct option | Answer |
|---:|---|---:|---|
| 1 | `<ul>`の役割 | 1 | 順序なしリスト |
| 2 | `<dd>`の使い方 | 4 | 説明リスト内の用語に対応する説明、定義、または値 |
| 3 | `<figure>`/`<figcaption>`の使い方 | 2 | 自己完結したコンテンツとそのキャプションをまとめる |
| 4 | `<article>`の使い方 | 2 | 独立したコンテンツセクション |
| 5 | `<fieldset>`/`<legend>` の使い方 | 1 | フォーム要素をタイトルの下にグループ化する |
| 6 | `<meter>`要素の目的 | 2 | 範囲内の数値を表す |
| 7 | `<source>`の使い方 | 2 | 利用可能なメディアファイル形式を宣言する |
| 8 | `<hgroup>`の使い方 | 4 | 見出しとそのサブタイトルをグループ化する |
| 9 | `<menu>`要素の使い方 | 2 | コマンドやツールバーコントロールを一覧表示する |
| 10 | `<details>`と`<summary>`の役割 | 1 | ネイティブの折りたたみ可能コンテンツ |
| 11 | `<dialog>`の目的 | 2 | モーダルまたはポップアップを宣言する |
| 12 | `<time>`の使い方 | 1 | 日付と時刻を表すため |
| 13 | ARIA属性の目的 | 2 | アクセシビリティの向上 |
| 14 | `role`属性の使用 | 2 | 要素の目的を説明するため |
