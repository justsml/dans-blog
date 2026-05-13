# Translation Candidate
- Slug: ai-sdk-math-tool
- Locale: ja
- Model: openrouter/openai/gpt-oss-120b:nitro
- Target: src/content/posts/2026-01-06--ai-sdk-math-tool/ja/index.mdx
- Validation: rejected: direct AI SDK translation failed
- Runtime seconds: 3.12
- Input tokens: 7534
- Output tokens: 2795
- Thinking tokens: unknown
- Cached input tokens: 3328
- Cache write tokens: 0
- Estimated cost: $0.000797
- Pricing source: local-openrouter-estimate
- Note: Command failed: git add src/content/posts/2026-01-06--ai-sdk-math-tool/ja/index.mdx reports/i18n/ai-sdk-math-tool/ja
## Raw Output

````mdx
---
title: LLMに数学をさせるのはやめよう
subTitle: 彼らは下手です。解決策は次の通りです。
date: '2026-01-06'
modified: '2026-01-07'
tags:
  - ai
  - ai-sdk
  - typescript
  - math
  - tools
  - patterns
category: AI
subCategory: Engineering
social_image: ../desktop-social.webp
cover_full_width: ../wide.webp
cover_mobile: ../square.webp
cover_icon: ../square.webp
---
言語モデルって変ですよね。量子力学を説明したり、詩を書いたり、TypeScript のデバッグまでできるのに、18472 × 9347 を計算させようとすると、数千単位でずれた答えを自信満々で返す可能性が高いんです。

これにはしばらく戸惑っていましたが、実際に何を求めているのかに気づいたときに納得しました。パターンマッチングエンジンに電卓の役割を期待しているわけです。これは、体操選手に「残高」を理解しているからといって家計簿のバランスを取らせようとするようなものです。

実際、LLM は計算をしているわけではありません。GPT や Claude に「2 + 2 は何？」と聞くと、彼らは「4」というトークンが「2 + 2 =」の後に最も出現しやすいと予測しているだけです。ほとんどの場合、訓練データにそのパターンが存在するのでうまくいきますが、単純な四則演算を超えて多段階の計算や、訓練時にあまり見られなかった数値を扱うと、実質的にサイコロを振っているようなものです。

最近、トップクラスのモデルを使って住宅ローンの支払い額を計算するコードをレビューしたときに、この問題に直面しました。モデルは自信満々に答えましたが、月額で 400 ドルもずれていました。これは実務上致命的なエラーです。

たとえモデルが推論能力（GPT‑5 が改善を示すと言われています）を向上させても、依然として行っているのは高度なパターンマッチングであり、シンボリック計算ではありません。創造的な作業や自然言語タスクにおいては、この確率的性質が魔法のように機能しますが、数学に関してはそうでもありません。

## 実際に解決できるのは何か？

答えは、より賢いモデルを待つことではありません。モデルに適切なツールを与えることです。

非AIシステムを構築するときにこの問題をどう解決するか考えてみてください。独自の数学ロジックを書き起こすことはせず、ライブラリを利用します。この原則がここでも当てはまりますが、今度は LLM にそのライブラリを **いつ** そして **どのように** 使うかを教えるわけです。

最新の AI SDK が提供するツール呼び出し機能を使えば、モデルに呼び出せる構造化関数を渡すことができます。LLM に数学を知っているふりをさせるのではなく、実際に計算を行うもの、すなわちシンボリック数学エンジンを提供するわけです。

私はこれに **[AI SDK v5 と v6](https://ai-sdk.vercel.ai/)** を使用し、CortexJS Compute Engine と組み合わせています。SDK がオーケストレーションとツールルーティングを担当し、CortexJS が基本的な四則演算から微積分までを処理します。関心領域の分離が意外にすっきりしています。

```bash
bun add ai @ai-sdk/anthropic @cortex-js/compute-engine zod
```

## Math ツールの構築

実装は思ったほど複雑ではありません。構築するのは、LLM の自然言語理解と実際の数式計算をつなぐブリッジです。

```typescript
import { generateText, stepCountIs, tool } from 'ai';
import { ComputeEngine } from '@cortex-js/compute-engine';
import { z } from 'zod';

// Initialize the engine once
const ce = new ComputeEngine();

const mathTool = tool({
  description: 'Evaluate mathematical expressions and solve equations with guaranteed accuracy. MUST be used for all mathematical operations to verify correctness - do not attempt mental math. Supports arithmetic, algebra, calculus, and complex operations. Can process multiple expressions at once.',
  parameters: z.object({
    expressions: z.array(z.string()).describe(
      'Array of mathematical expressions in LaTeX or plain notation, e.g. ["2 + 2", "\\frac{x^2 + 1}{x - 1}", "\\int x^2 dx"]'
    ),
  }),
  execute: async ({ expressions }) => {
    // Process all expressions in parallel (or detailed batch)
    return expressions.map(expression => {
      try {
        const result = ce.parse(expression).evaluate();
        return {
          expression,
          result: result.toString(),
          latex: result.latex,
        };
      } catch (error) {
        return { 
          expression,
          error: (error as Error).message 
        };
      }
    });
  },
});
```

この実装で留意すべき点は次の通りです。

- **description が重要**  
  「MUST be used」という強い表現は攻撃的に見えるかもしれませんが、モデルにツール使用のタイミングを明示することで、たまにしか動かない状態から信頼できる挙動へと変わります。ツールレベルのプロンプトエンジニアリングと考えてください。

- **配列 `expressions` によるバッチ処理**  
  各モデル呼び出しにはレイテンシが伴います。連立方程式を解く、あるいは複数ステップの計算を行う場合に個別に処理するとユーザー体験が著しく低下します。バッチ化すれば 1 回の往復で 10 問を解くことが可能です。

- **`eval()` ではなくシンボリックエンジンを使用**  
  `eval()` の使用は絶対に避けてください。シンボリックエンジンは数式の意図を解析し、LaTeX 形式の入力や微分・積分にも対応します。単なる数値計算ではなく、本格的な数学処理が可能です。

- **エラーハンドリングは式単位でスコープ**  
  1 つの計算が失敗しても、他の式はそのまま処理し続けます。失敗した式だけエラーメッセージを返すことで、モデルは「何が成功し、何が失敗したか」を把握でき、次のステップで自己修正しやすくなります。

## 実装に活かす

それでは、通常の生モデルが幻覚を起こしやすいケースを投げてみましょう。

```typescript
import { anthropic } from '@ai-sdk/anthropic';

const { text } = await generateText({
  model: anthropic('claude-sonnet-4-5'),
  prompt: 'Calculate 18472 × 9347, divide by 127, then take the square root of the result.',
  tools: { mathTool },
  stopWhen: stepCountIs(5), // Allow up to five model/tool steps
});

console.log(text);
```

モデルは数式を認識し、精度が必要だと判断するとツールを呼び出し、正確な結果を取得してから自然言語で説明します。各コンポーネントが得意なことに専念します。

## 基本的な算術を超えて

シンボリックエンジンを使用しているため、単純な電卓ツールでは対処できないケースも処理できます。

代数方程式を解きたいですか？ 「Solve these equations: 3x + 7 = 22 and 2y - 5 = 13」のように指示すれば問題なく動作します。

微積分が必要ですか？ 「Find the derivative of x^3 + 2x^2 and evaluate it at x = 2」のように入力すれば、別のツール呼び出しとして処理されます。

LaTeX のサポートは、特に教育向けアプリを構築する場合に有用です。エンジンは LaTeX 入力をそのまま理解し、レンダリング用にフォーマットされた結果を返すので、追加のパース処理は不要です。

## 大局的視点

このパターンは単なる数学に留まらないと考えます。実際に行っているのは、LLM の限界を認識しつつ、その強みを活かすことです。LLM は意図の把握、自然言語の解析、ワークフローの調整に優れていますが、電卓やデータベース、ファイルシステムの代替にはなりません。

LLM に決定論的な処理をさせようとすればするほど、その本質に逆らうことになります。ところが、自然言語理解を行わせた上で、決定論的な部分を専門ツールに委ねると、事態は一変します。

数学ツールは単なる一例です。同じ原則が日付操作、金融計算、画像処理、データベースクエリ… 精度が創造性より重要になるあらゆる領域に適用できます。モデルにユーザーの意図を理解させ、実際の計算や処理はその仕事に最適化されたコンポーネントに任せるのです。

これは AI を用いたシステム構築の考え方の転換です。「モデルはこれをできるか？」ではなく「モデルはこれをオーケストレーションできるか？」という視点です。表現のわずかな違いが、信頼性に大きな差をもたらします。

## リソース

- [Vercel AI SDK ドキュメント](https://sdk.vercel.ai/docs)
- [CortexJS 計算エンジン](https://cortexjs.io/compute-engine/)
- [ツール呼び出しガイド](https://sdk.vercel.ai/docs/ai-sdk-core/tools-and-tool-calling)
- [AI SDK サンプルリポジトリ](https://github.com/vercel/ai/tree/main/examples)
````
