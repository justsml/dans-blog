# Translation Candidate
- Slug: ai-sdk-math-tool
- Locale: ja
- Model: openrouter/openai/gpt-oss-120b:nitro
- Target: src/content/posts/2026-01-06--ai-sdk-math-tool/ja/index.mdx
- Validation: rejected: direct AI SDK translation failed
- Runtime seconds: 2.60
- Input tokens: 5856
- Output tokens: 2669
- Thinking tokens: unknown
- Cached input tokens: 1536
- Cache write tokens: 0
- Estimated cost: $0.000709
- Pricing source: local-openrouter-estimate
- Note: Command failed: bun run i18n:translate:chunked -- --slug ai-sdk-math-tool --locale ja --model openrouter/openai/gpt-oss-120b:nitro --chunk 10p --run-id 2026-05-13T22-14-14-769Z-60050 --run-lock-path /Users/dan/code/oss/dans-blog/.git/codex-i18n-translation-run.json --quiz-concurrency 24 (code 1)
## Raw Output

````mdx
---
title: LLMに数学をやらせるのをやめよう
subTitle: 彼らはこれに苦手です。以下の方法で修正できます。
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
言語モデルの不思議な点は何かわかりますか？量子力学を説明できたり、詩を書いたり、あなたのTypeScriptをデバッグしたりできますが、18472を9347で掛けるようになると、数千単位で誤った結果を自信たっぷりに返す確率が高くなります。

かつて私はこれを不思議に思っていましたが、彼らに実際に求めていることを理解した途端、謎が解けました。パターンマッチングエンジンに電卓をさせているのです。これは「バランス」の概念を理解する体操選手に通帳を管理させることと同じようなものです。

重要なのは、LLMはなにも計算していないということです。GPTやClaudeに「2 + 2は？」と尋ねても、彼らは加算をしていません。単に「2 + 2 =」の後に「4」というトークンが最も出やすいと予測しているだけです。このようなパターンはトレーニングデータに存在するため、多くの場合うまく機能します。しかし単純な算術を越えて複数ステップの計算やトレーニングデータにあまり含まれていない数値を扱うと、実質的にサイコロを振っているようなものです。

最近、モルゲージの支払いを計算するコードをレビューしていた際、トップクラスのモデルが誤って答えを導き出した経験があります。モデルは完全な自信を持って答えました。しかし毎月400ドルの誤差がありました。これは重大なエラーです。

モデルが推論能力を高めているとされる今でも（GPT-5は改善しているとされています）、依然として洗練されたパターンマッチングを行っているだけであり、記号計算は行っていません。創造的な作業や自然言語タスクでは、この確率論的な性質がまさに魔法のようなものです。しかし数学ではそうではありません。

## これは実際にどうやって解決されるのか？

この問題の解決策は、より賢いモデルを待つことではありません。モデルに適切なツールを与えることです。

非AIシステムでこの問題を解決する方法を考えてみましょう。カスタムの数学ロジックを書くのではなく、ライブラリに頼るでしょう。ここでも同じ原則が適用されます。違いは、今度はLLMがいつどのようにそのライブラリを使うかを学ばせることです。

現代のAI SDKにおけるツールコール機能は、モデルが構造化された関数を呼び出すことを可能にします。LLMに数学を理解しているふりをさせることではなく、実際に数学を処理するもの——記号数学エンジン——を提供するのです。

私はこれに[AI SDK v5およびv6](https://ai-sdk.vercel.ai/)とCortexJS Compute Engineを組み合わせて使用しています。SDKはオーケストレーションとツールルーティングを処理し、CortexJSは基本算術から微積分までをカバーします。これは驚くほど明確な関心の分離です。

```bash
bun add ai @ai-sdk/anthropic @cortex-js/compute-engine zod
```

## 数学ツールの構築

実装は予想よりも単純です。我々が構築しているのは、LLMの自然言語理解と実際の数学計算をつなぐ橋です。

```typescript
import { generateText, stepCountIs, tool } from 'ai';
import { ComputeEngine } from '@cortex-js/compute-engine';
import { z } from 'zod';

// エンジンを1回初期化
const ce = new ComputeEngine();

const mathTool = tool({
  description: '数学式の評価や方程式の解法を保証された精度で実行します。すべての数学演算で必ず使用する必要があります——暗算を試みないでください。算術、代数、微積分、複雑な演算をサポートします。複数の式を一度に処理可能です。',
  parameters: z.object({
    expressions: z.array(z.string()).describe(
      'LaTeXまたは通常表記の数式配列、例: ["2 + 2", "\\frac{x^2 + 1}{x - 1}", "\\int x^2 dx"]'
    ),
  }),
  execute: async ({ expressions }) => {
    // 並列処理（または詳細バッチ処理）
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

注目すべき点がいくつかあります:

**description** が重要な役割を果たしています。この「必ず使用する必要があります」という表現が攻撃的に思えるかもしれませんが、私の経験ではモデルにツールを使用するタイミングを明示的に伝えることが、たまに機能する状態から安定した動作へと差を生みます。これはツールレベルでのプロンプトエンジニアリングです。

**expressions** 配列によるバッチ処理の重要性は、予想よりも大きいです。モデル呼び出しには遅延が伴います。連立方程式の解法や多段階の数学処理を行う場合、個別に処理するとユーザー体験が著しく悪くなります。バッチ処理により1回の往復で10問を解くことができます。

**記号エンジン** の使用（`eval()` は使わないでください）により、単なる計算を超えた**数学的理解**が可能になります。エンジンは意図を解析し、LaTeXフォーマットを処理し、微分や積分にも対応します。我々は単なる計算を行っているのではなく、**数学** を行っているのです。

**エラー処理** は式ごとにスコープが限定されています。1つの計算が失敗しても、そのエラーを返しながら他の処理は継続されます。これによりモデルは成功した部分と失敗した部分を明確に把握し、次のステップで自己修正が可能になります。

## 実際の運用

Let's test it with a task that would typically cause a raw model to hallucinate:

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

The model identifies the mathematical operation, recognizes the need for precision, invokes the tool to obtain an accurate result, and then explains the process in natural language. Each component performs its optimal role.

## Beyond Basic Arithmetic

By leveraging a symbolic engine, this approach handles tasks that simple calculator tools cannot address.

Want to solve algebraic equations? "Solve these equations: 3x + 7 = 22 and 2y - 5 = 1:3" is straightforward.

Need calculus? "Find the derivative of x^3 + 2x^2 and evaluate it at x = 2" becomes a routine tool call.

LaTeXのサポートは、教育用アプリケーションを構築する場合に特に有用です。エンジンはLaTeX入力を本質的に理解し、レンダリング用にフォーマットされた結果を返却します。追加のパースは必要ありません。

## より広い文脈

このパターンは単なる数学の話にとどまりません。我々が本当にやるべきことは、LLMの限界を認めつつその強みを活用することです。LLMは意図の理解や自然言語の解析、ワークフローの調整において非常に優れていますが、計算機やデータベースやファイルシステムではありません。

LLMに決定論的なタスクを実行させようとすればするほど、その性質と戦うことになります。しかし自然言語理解を決定論的な部分を処理する専用ツールと組み合わせるとき、面白いことが起こります。

数学ツールはその1つの例です。同じ原理は日付操作、財務計算、画像処理、データベースクエリ…創造性よりも精度が重要なあらゆる場面に適用できます。モデルがユーザーが何を望んでいるかを理解し、実際に作業を専門的に設計されたツールに任せることで、信頼性が高まります。

AIを活用した構築の考え方を変える必要があります。重要なのは「モデルがこれを行うことができるか？」ではなく「モデルがこれの編成を行うことができるか？」です。表現のわずかな違いですが、信頼性の大きな差を生みます。

## リソース

- [Vercel AI SDK ドキュメント](https://sdk.vercel.ai/docs)
- [CortexJS Compute Engine](https://cortexjs.io/compute-engine/)
- [ツール呼び出しガイド](https://sdk.vercel.ai/docs/ai-sdk-core/tools-and-tool-calling)
- [AI SDK サンプルリポジトリ](https://github.com/vercel/ai/tree/main/examples)
````
