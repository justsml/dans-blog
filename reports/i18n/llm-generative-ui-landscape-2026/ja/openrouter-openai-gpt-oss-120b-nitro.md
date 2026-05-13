# Translation Candidate
- Slug: llm-generative-ui-landscape-2026
- Locale: ja
- Model: openrouter/openai/gpt-oss-120b:nitro
- Target: src/content/posts/2026-05-10--llm-generative-ui-landscape-2026/ja/index.mdx
- Validation: passed
- Runtime seconds: 21.20
- Input tokens: 62185
- Output tokens: 15161
- Thinking tokens: unknown
- Cached input tokens: 26112
- Cache write tokens: 0
- Estimated cost: $0.005154
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
title: LLMGenUI Landscape v2
subTitle: ツールからコンポーネントへのレンダリングからオープンエンド生成まで、各手法とその複雑さが正当化されるタイミングを示すマップ。
date: '2026-05-10'
modified: '2026-05-10'
tags:
  - ai
  - llm
  - generative-ui
  - agents
  - frontend
  - protocols
  - react
  - ag-ui
  - a2ui
  - copilotkit
  - json-render
  - mcp
category: AI
subCategory: Frontend
draft: true
unlisted: true
hidden: true
publish: false
popularity: 0.9
---
「Generative UI」は、発言者によって少なくとも5つの異なる意味を持ちます。

- モデルツール呼び出しから生成された製品カードを埋め込むチャットインターフェース  
- フロントエンドがコンポーネントツリーとして描画するランタイム JSON 仕様  
- MCP ツールがホストアプリに返すサンドボックス化された iframe（チケット予約、ホテル予約、マップ描画、チェックアウトウィジェットなど）  
- エージェント状態をフロントエンドにストリーミングするイベントプロトコル  
- v0、Lovable、Bolt：設計時に React を生成する AI ツール  

これらは関連概念ですが、スタックの異なる層に位置し、リスクプロファイル、実装コスト、適切なユースケースがそれぞれ異なります。これらを混同すると、あらゆるアーキテクチャ議論が混乱します。

スタックのどこを対象にするか決めるときに欲しいマップです。

---

## Generative UI がそうでないもの

定義に入る前に、次の3点は脇に置いておく：

**設計時コード生成** — v0、Lovable、Bolt、Cursor などが React コンポーネントを組み立てて生成するツール。これらは開発者がコードをレビューし、コミットする形でコードを生成する。AI は開発フェーズで動作し、ユーザー側から見ると出荷されるものはすべて静的になる。このカテゴリのツールは有用だが、**ランタイムでの「Generative UI」** が指すものではない。

**AI 補助型フォーム自動入力** — コンテキストからフィールドの値を埋めるモデル。インターフェースの構造は固定されたままで、変わるのはコンテンツだけだ。このパターンは実用的だが、Generative UI とは言えない。

**AI がページに生の HTML を書き込む** — モデルが `<div>` や `<button>` といった文字列を出力し、`innerHTML` や `dangerouslySetInnerHTML` を通して注入する。この手法は *技術的には* ランタイムでの Generative UI であるが、同時に最も危険な形でもある。現在この領域で成熟したフレームワークが回避しようとしている対象そのものだ。生の AI 生成マークアップは XSS のリスク、アクセシビリティ属性の欠如、スタイルの不整合、そして構造の幻覚を招く。この記事の残りでは、これよりも安全な実装方法について論じる。

---

## 実装上の定義

ランタイムでの Generative UI とは、**モデルが会話やタスクの状態に応じて、ユーザーに表示するインターフェースコンポーネントまたはコンポーネント構成を決定すること**を指します。

文字列ではなく、インターフェースです。

最も単純な例として、フライト予約アシスタントが `search_flights` ツールを呼び出すケースを考えます。単にテキスト（「3 件のオプションがあります…」）を返すのではなく、選択可能なフライト、座席クラス切替、そして「予約」ボタンを備えた `<FlightResultsCard>` コンポーネントを描画します。モデルはこの構造化されたカードが適切な応答であると判断しました。カードの外観や「予約」ボタンの動作は開発者が定義しています。

より複雑なケース：金融分析エージェントがポートフォリオに関する質問を受け取り、`MetricGroup` で主要指標を示し、`RiskBreakdown` チャート、`ScenarioComparison` テーブル、そして `PolicyNotice` を組み合わせた応答を構成するとします。モデルは事前承認済みコンポーネントのカタログからそのレイアウトを組み立てました。各コンポーネントはすべて開発者が定義しています。モデルはどのコンポーネントを使用するか、そしてそこに入れるデータを選択しました。

両方とも Generative UI です。モデルに与えられる構成自由度が異なるため、生成できる出力のリッチさと、失敗が起こり得る複雑さの両方が変わります。

## 三つのパターン

全体の領域は、出力文法が異なる三つのパターンにまとめられます。

![左側がツール呼び出しのみ（最も安全）、中央がコンポーネントカタログ、右側がオープンエンド生成（最も表現力が高い）を示すスペクトラム図](../output-grammar-spectrum.svg)

_Every generative UI decision is a point on this spectrum. Start left._

### Pattern 1: Tool-to-component rendering

モデルは名前付きツールを呼び出します。アプリケーションはツール名からコンポーネントへのマップを保持しています。ツール呼び出しがコンポーネントのレンダリングをトリガーします。

```tsx
// The model calls: { name: "show_flight_results", args: { flights: [...] } }

useCopilotAction({
  name: "show_flight_results",
  render: ({ args }) => <FlightResultsCard flights={args.flights} />,
});
```

これは最も安全なパターンです。レイアウトがモデルから生成されることはありません。モデルは *いつ* コンポーネントを表示するか、*どのデータ* で埋めるかを決定します。コンポーネントのコード、ビジュアルデザイン、アクセシビリティ実装、そしてレンダリングロジックのすべてのエッジケースは開発者が所有したままです。

Vercel AI SDK の `useChat` における `tool` ハンドラがこの方式を実装しています。assistant‑ui のツールレンダリングも同様です。CopilotKit の「Static Generative UI」もこのパターンです。信頼性の高い本番環境のコパイロット UI の多くは、ここで説明した手法を採用しています。

**適用シーン**: 表示したい対象が開発時に把握できる場合。予約確認、検索結果、アカウントサマリー、承認ウィジェットなど。シナリオを列挙できるなら、このパターンで網羅できます。

### パターン 2: コンポーネントカタログ構成

モデルは、開発者が定義したカタログのコンポーネントを参照する型付き JSON ツリーを出力します。フロントエンド側にツリーを走査し、各コンポーネントをインスタンス化するレンダラがあります。

```json
[
  { "type": "metric_group", "metrics": [
    { "label": "MRR", "value": "$82,400", "delta": "+12%" },
    { "label": "Churn", "value": "2.1%", "delta": "-0.4%" }
  ]},
  { "type": "line_chart", "title": "30-day growth", "data_ref": "mrr_series" },
  { "type": "insight_callout", "text": "Expansion revenue driving the delta — avg seat count up 18%." }
]
```

このレイアウトはモデルが組み立てました。`MetricGroup`、`LineChart`、`InsightCallout` がそれぞれ生成されますが、各コンポーネント型が何を意味し、どのプロパティを受け取り、どのように描画されるかは開発者が定義しています。モデルが `{ "type": "custom_untested_thing" }` のような未定義の型を出力しようとした場合、スキーマ検証で捕捉され、レンダラはそれを無視するか拒否します。

このパターンは `json-render`、`A2UI`、`Hashbrown`、`OpenUI`、そして `Tambo` の背後にあるものです。主なエンジニアリング作業は **カタログ設計** であり、どのコンポーネント型を用意するか、そのスキーマはどうなるか、そしてモデルに許可する組み合わせと禁止する組み合わせを決めることです。

**適用が妥当なケース**: 表示したい内容の構造が、データやユーザーのリクエストに応じて正当かつ動的に変化する場合。数値の中で注目すべきポイントに応じてダッシュボードが変わるケース。コンテキストに応じて異なるセクションを示すレポート。エージェントがどのステップにいるかに応じて変化するワークフローパネル。

### パターン 3: オープンエンド生成

モデルが HTML、SVG、Canvas、または WebGL を生成し、厳格な Content Security Policy が設定されたサンドボックス化された iframe 内で描画されます。

固定されたコンポーネントカタログでは対応できないケース、たとえばアルゴリズムの可視化、アーキテクチャ図、アドホックなチャート、生成アート、教育用シミュレーションなどに適しています。ここでのセキュリティは iframe の境界が担っており、これを取り除くと本文冒頭で指摘した生の HTML 注入問題に戻ります。

`CopilotKit/OpenGenerativeUI` はこのパターンの現在最良のリファレンス実装です。サンドボックスはスクリプトを除去し、メッセージのやり取りを制限し、生成されたアーティファクトをアプリケーションの特権状態から切り離します。

**適用条件**：任意のビジュアル出力が本当に必要な場合—例として、説明用の一回限りの図、動的シミュレーション、クリエイティブなアーティファクト。取引系 UI には使用しないこと。チェックアウト確認画面など、サンドボックス化された iframe が不要なケースです。

### 3 つのパターンを超えて：LLM がピクセルを直接制御する

現在浮上している第 4 の方向性があり、既存のパターンにはきれいに収まりません。LLM が **没入型でゲームのような体験** を実現するために、サンドボックス化された iframe よりも直接的にビジュアル出力を制御します。

生成 UI における正統な区別は **iframe HTML と JSON カタログ** です。

- **iframe HTML** — モデルが HTML、SVG、Canvas、または WebGL を記述し、隔離されたサンドボックスで描画します。表現の自由度は最大ですが、セキュリティは完全に iframe の境界に依存します。例: Anthropic Artifacts、OpenGenerativeUI。
- **JSON カタログ** — モデルが開発者が定義したコンポーネントカタログに制約された構造化ペイロードを出力します。レンダラはその仕様から信頼できる事前構築コンポーネントをインスタンス化します。モデルは *何を* 表示するかを決め、実装側が *どのように* 描画するかを決めます。例: json-render、A2UI。

これらに加えて、最近のデモはモデルがコンポーネントを選択したりサンドボックス化された HTML を書いたりせず、キャンバスをより直接的に操作する第 3 のモードを示唆しています。単一画像から探索可能な 3D 環境を生成する [Tencent の HunyuanWorld](https://arxiv.org/abs/2502.01999) や、LLM がコンポーネントカタログを呼び出すのではなく、実行時にマップ、NPC、クエストを生成するゲームアーキテクチャなどは、モデルがフォームレンダラというよりゲームディレクターに近い将来像を示しています。WebGPU を用いたブラウザ内 LLM 推論（[WebLLM](https://mlc.ai/web-llm/)）も同様のフロンティアをローカルで押し進めています。

この領域は本当にエキサイティングで、まだ黎明期です。プロダクション向けに安定したフレームワークは現時点では存在しません。状況が変わったら、専用の記事でこのアプローチを詳しく取り上げます。

## フルエコシステム

![A four-layer diagram mapping every major generative UI tool: protocols (AG-UI, A2UI, MCP Apps) at the top, JavaScript app shells next (CopilotKit, Vercel AI SDK, assistant-ui, LangGraph), then JavaScript catalog tools (json-render, Hashbrown, OpenUI, Tambo), then Python tooling at the bottom (Gradio, Streamlit, LangChain, Haystack).](../full-stack-map.svg)

_四層構造。プロトコルがワイヤーフォーマットを定義し、アプリシェルが状態管理とレンダリングを担当する。カタログツールはモデルが生成できる範囲を制限し、Pythonツールはデータ・MLワークフロー向けの平行トラックとなる。_

## プロトコル: AG-UI と A2UI

AG-UI と A2UI はプロトコル層の主要な標準です。解決する課題が異なり、競合関係にはありません。

### AG-UI

**GitHub**: [ag-ui-protocol/ag-ui](https://github.com/ag-ui-protocol/ag-ui)

AG-UI は AI エージェントとフロントエンドアプリケーション間の通信を行うイベントベースのプロトコルです。約 16 種類のイベントタイプを定義しています：`TEXT_MESSAGE_START`、`TEXT_MESSAGE_CONTENT`、`TOOL_CALL_START`、`TOOL_CALL_END`、`STATE_SNAPSHOT`、`STATE_DELTA` など。トランスポートは自由です — SSE、WebSocket、Webhook すべてが利用可能です。フォーマットは意図的に緩く設計されており、広範な採用を可能にします。

AG-UI は UI の見た目を規定しません。エージェントが *フロントエンドと* どのように通信するかを定義します。React アプリが LangGraph エージェントに対して行うのと同じ方法で CrewAI エージェントにサブスクライブできる、フロントエンドコードを変更する必要のないワイヤープロトコル層と考えてください。

CopilotKit は LangGraph と CrewAI の取り組みから AG-UI を作り出しました。これまでに LangChain、Mastra、PydanticAI などが採用しています。Microsoft も AG-UI 統合ガイドを公開しています。マルチエージェントのフロントエンドを構築し、バックエンドフレームワークとフロントエンドコードを分離したい場合、AG-UI が解決策です。

**よくある誤解**: AG-UI は UI フレームワークではありません。何を描画すべきかは指示しません。エージェントが何かを発言した、ツールを呼び出した、あるいは共有状態を更新したという **事実** を伝えるだけです。実際に何を描画するかは依然として開発者の判断です。

### A2UI

**GitHub**: [google/A2UI](https://github.com/google/A2UI) · Spec: [a2ui.org](https://a2ui.org/)

A2UI は、エージェントが UI を表示したいときに送信する内容を定義した、Google の宣言的仕様です。AG‑UI が「エージェントはどのように通信するか？」に答えるのに対し、A2UI は「エージェントはコンポーネントレイアウトを記述するためにどの形式を使うか？」に答えます。

A2UI はフラットな JSONL 形式を採用しています。1 行につき 1 つのコンポーネント記述子があり、各行は ID、type、data を持ちます。フラットであることは意図的です。入れ子構造のツリーだと、モデルは全体構造を把握してからでなければストリーミングを開始できません。フラットなリストにすれば、モデルは「考えている」コンポーネントを順次出力できるため、フロントエンドはモデルがまだチャートを追加するかどうかを決めている最中でも、最初のメトリックカードの描画を開始できます。

```jsonl
{"id":"h1","type":"kpi_card","title":"MRR","value":"$82,400","delta":"+12%"}
{"id":"h2","type":"kpi_card","title":"Churn","value":"2.1%","delta":"-0.4%"}
{"id":"c1","type":"line_chart","title":"30-day MRR","data_ref":"mrr_series"}
{"id":"t1","type":"data_table","cols":["Month","MRR","Net New"],"data_ref":"monthly"}
```

A2UI はセキュリティを意識した設計です。仕様は実行可能なコードではなくデータ形式であり、コンポーネントカタログは開発者が事前に定義します。エージェントはそのカタログに含まれる型しか参照できません。未知の型名が渡された場合、A2UI レンダラはそれを無視します。

CopilotKit の「Open-JSON-UI」形式は A2UI と互換性があります。現在コンポーネントカタログ用の仕様形式を選ぶのであれば、最も幅広いクロスプラットフォームサポートを持つのは A2UI です。

**安定性に関する注意**: A2UI は 1.0 未満の段階です（2026 年 5 月 8 日時点で v0.9）。マイナーバージョン間で破壊的な仕様変更が行われており、Google のロードマップに関する情報は散発的です。また、一部のレンダラ（Lit、Flutter）は仕様更新に遅れが見られます。現在この仕様で開発する場合は、仕様のドリフトに備えて余裕を持って計画してください。純粋なウェブ向けユースケースでは、json-render の方がツールチェーンがより充実しているようです。A2UI の長期的な強みは、json-render が持たない Web、Flutter、SwiftUI、Android へのクロスプラットフォーム展開です。

### MCP Apps

**GitHub**: [modelcontextprotocol](https://github.com/modelcontextprotocol) · Related: [mcp-ui](https://github.com/MCP-UI-Org/mcp-ui)

MCP は LLM とツール・データを接続するプロトコルとして始まりました。Apps 拡張により、MCP ツールは単なるデータだけでなく、インタラクティブな UI アーティファクト（React コンポーネント、フォーム、ダッシュボード、マップ）を返すことができます。

セキュリティモデルは厳格であることが意図された設計です。すべてはサンドボックス化された iframe 内で実行され、権限は取り除かれ、テンプレートは事前に宣言されているためホストアプリがレビュー可能です。通信はすべて監査可能な JSON‑RPC で行われます。これはツールプロバイダーにとって適切なモデルです――Shopify の MCP サーバーがチェックアウトウィジェットを返したり、マッピングサービスが埋め込み可能なマップを返したりするケースです。ホストアプリはそのウィジェットのコードを所有したり信頼したりしません。

MCP Apps は UI が **ツールプロバイダー側に属する** 場合に適した選択肢です。UI が自アプリケーションのドメイン内に存在する場合は、パターン 1 または 2 を使用してください。

## JavaScript/TypeScript フレームワーク

### CopilotKit

**GitHub**: [CopilotKit/CopilotKit](https://github.com/CopilotKit/CopilotKit) · 例: [CopilotKit/generative-ui](https://github.com/CopilotKit/generative-ui)

CopilotKit はエージェントネイティブなフロントエンドアプリケーション向けに最も包括的なフレームワークです。エージェントバックエンドと AG‑UI 経由で接続し、双方向の会話状態を管理し、生成 UI コンポーネントをレンダリングし、エージェントとユーザーが同じデータを変更できるようにする共有状態の配管を提供します。

3 つのパターンモデルは CopilotKit の API にきれいにマッピングされます：
- `useCopilotAction` と `render` コールバック → パターン 1  
- A2UI/Open-JSON-UI のレンダリング → パターン 2  
- `OpenGenerativeUI` のサンドボックス化されたアーティファクト → パターン 3  

あまり語られない重要な CopilotKit の機能は **共有状態とヒューマン・イン・ザ・ループ** です。エージェントはアプリケーション状態を読み書きでき、ユーザーも同様に読み書きでき、変更は双方向に流れます。これが、Copilot スタイルの UI が単なるチャットボックスが製品に貼り付けられたものではなく、実際の協働として感じられる理由です。

### Vercel AI SDK

**GitHub**: [vercel/ai](https://github.com/vercel/ai) · **ドキュメント**: [ai-sdk.dev](https://ai-sdk.dev/)

Vercel AI SDK は AI アプリ向けの事実上の TypeScript ベースラインです。生成 UI に特化した場合は:

**`useObject`** はサーバーから生成される構造化 JSON オブジェクトをストリーミングします。Zod スキーマを定義すると、SDK が部分的な JSON を解析し、フィールドが到着するたびに再レンダリングをトリガーします。これは Next.js アプリでパターン 2 に到達する最もスムーズな手段です。

```tsx
const { object: dashboard } = useObject({
  api: "/api/generate-dashboard",
  schema: z.object({
    title: z.string(),
    metrics: z.array(z.object({ label: z.string(), value: z.number() })),
    insights: z.array(z.string()),
  }),
});
```

**`useChat` with tool handlers** → パターン 1。モデルがツールを呼び出し、ツール名をコンポーネントにマッピングします。

**AI Elements** ([elements.ai-sdk.dev](https://elements.ai-sdk.dev/)) は SDK と組み合わせて使用できる既製の UI プリミティブを提供します。

**混乱しやすい経緯に関する注記**：2024年10月、Vercel は [GitHub Discussion #3251](https://github.com/vercel/ai/discussions/3251) にて、SDK 3.0 の見出し機能として掲げられていた「Generative UI」機能である AI SDK RSC（React Server Components ストリーミングパターン）を「長年の制限がいくつかあり」近い将来の解決策が見込めないため、無期限で保留すると発表しました。RSC ストリーミングを前提に製品戦略を立てていたチームは突然の事態に直面しました。`generateObject` / `streamObject` API も SDK 6.0 で廃止されました。AI SDK RSC からの推奨移行先は上記の `useObject` パターン、あるいはカタログベース生成のための json‑render です。

### assistant‑ui

**GitHub**: [assistant-ui/assistant-ui](https://github.com/assistant-ui/assistant-ui)

assistant-ui は、プロダクション品質のチャットインターフェースを構築するための、組み合わせ可能な React プリミティブの集合です。メッセージバブル、ストリーミングトークン、コピー/編集/再生成アクション、思考中ステートなど、洗練されたチャット UX が必要で、バックエンドやツールの描画は自前で行いたい場合に最適な選択肢です。

任意のバックエンド（OpenAI、Anthropic、ローカルモデル、カスタムエンドポイント）と組み合わせても問題なく動作し、ツール呼び出しの描画は慣れ親しんだ slot/render prop モデルで処理します。

### json-render

**GitHub**: [vercel-labs/json-render](https://github.com/vercel-labs/json-render) · Docs: [json-render.dev](https://json-render.dev/)

json-render はパターン 2 を意見を持ったバッテリー同梱型のアプローチで具現化します。事前に構築されたコンポーネントカタログ（shadcn/ui コンポーネントと Zod スキーマ）、レンダラ、そしてスキーマでカタログにモデルを制約するタイトな生成ループが提供されます。

主な特徴:
- **マルチターゲットレンダリング**: 同一の JSON 仕様が React Web アプリ、React Native モバイルアプリ、PDF、HTML メール、あるいは Remotion ビデオへとレンダリング可能です。レポート作成に実際に役立ちます。
- **プログレッシブレンダリング**: モデルがストリーミングするたびにコンポーネントが表示され、全体の仕様が届くのを待つ必要がありません。
- **タイトなスキーマ制約**: カタログはモデルが有効だが未知のコンポーネントタイプを幻覚することを防ぐよう設計されています。

ダッシュボードやレポート生成機能を構築していて、独自のカタログ設計にかかるインフラ作業を省きたい場合、json‑render が Web アプリ向けの最速パスです。

**モメンタムについて**: json‑render は 2026 年初頭に Vercel Labs からリリースされ、標準的な React/Next.js プロジェクトで即座に利用できることから、Web 開発者の関心を急速に集めているようです。ただし、json‑render はまだ 1.0 未満で、json‑render と A2UI の関係は現在調整中です。Vercel は A2UI 互換の出力を試験しているため、将来的に統合される可能性があります。クロスプラットフォーム（ネイティブモバイル、複数フレームワーク）を視野に入れるなら、A2UI の方が長期的に有利です。

### Hashbrown

**GitHub**: [liveloveapp/hashbrown](https://github.com/liveloveapp/hashbrown)

Hashbrown は独自のアプローチを取ります。別途 AI 用インターフェース層を構築するのではなく、既存の React または Angular アプリに AI コンポーネント選択を直接埋め込みます。アプリのコンポーネントを LLM に公開し、LLM がどのコンポーネントを描画するかを決定し、クライアント側ツールを呼び出すこともできます。

これは「チャット」以外の製品 UI にインテリジェンスを組み込みたい場合に適したツールです。たとえば、レイアウトを動的に変える製品ページ、適切なオプションを提示する設定パネル、次のステップを提案するワークフローエディタなどです。

### OpenUI

**GitHub**: [thesysdev/openui](https://github.com/thesysdev/openui) · Docs: [openui.com](https://www.openui.com/)

OpenUI は JSON の代わりに、段階的レンダリングとトークン効率を意識して設計された行指向のコード風フォーマット（「OpenUI Lang」）を採用します。複雑なレイアウトに対しては、同等の JSON と比べてトークン数が約 67 % 少なくなると主張しています。

トレードオフはエコシステムの成熟度です — OpenUI は比較的新しく、ツールチェーンは JSON ベースのアプローチに比べて薄いです。しかし、トークンコストが重要な制約であり、頻繁に複雑なレイアウトを生成する場合、フォーマットの効率性は実際に効果があります。

### Tambo

**GitHub**: [tambo-ai/tambo](https://github.com/tambo-ai/tambo)

Tambo はステートフルなコンポーネント選択に焦点を当てています。AI がコンポーネントを選択し、クライアント側ツールを通じてそれらとやり取りできるため、会話全体でコンポーネントの状態を保持します。UI 要素が複数ターンにわたって持続するユースケースに適しています――ユーザーが調整し続けるフィルタコンポーネントに対し、AI がフィルタ済みデータの解析を継続するようなケースです。

---

## Python レイヤー

Python エコシステムは AI インターフェースに対して別のアプローチを取ります。これらのツールは ML モデルのデモ、データアプリケーション、社内ツール向けに最適化されており、エージェントがレイアウト構成を行う本番向けコンシューマアプリには向いていません。

これは批判ではありません。適切なユースケースにおいては、Gradio と Streamlit だけで十分です。

### Gradio

**GitHub**: [gradio-app/gradio](https://github.com/gradio-app/gradio) · PyPI: `gradio`

Gradio の核心的価値は、Python 関数を書くだけで Gradio がそれを Web UI にラップしてくれることです。`Interface` クラスは画像分類器で 3 行、`ChatInterface` はチャットボットで 10 行です。レイアウトを細かく制御したいときは `Blocks` が利用できます。

Gradio における「generative UI」は Python 開発者が定義し、モデルが決めるわけではありません。コンポーネントの表示・設定はモデルの出力に応じて動的に変化させられますが、コンポーネントカタログ自体は固定です――モデルにレイアウト構成を委ねることはありません。

Gradio は HuggingFace Spaces と機械学習デモエコシステムのデフォルトです。月間ダウンロード数は数百万件に上り、AI デモ全体の大部分を支えています。

**Gradio を選択すべきケース**: Python 開発者が ML モデルのデモ、研究プロトタイプ、または社内ツールを構築し、JavaScript に手を出したくない場合。

### Streamlit

**GitHub**: [streamlit/streamlit](https://github.com/streamlit/streamlit)

Streamlit のモデルはやや意見主導的です。Python スクリプトが各インタラクションごとにエンドツーエンドで実行されます。`st.chat_message()`、`st.dataframe()`、`st.plotly_chart()` を呼び出します。フレームワークがレイアウトを管理します。

全スクリプト再実行モデルは非効率に思えるかもしれませんが、会話履歴を蓄積する AI チャットボットに対しては意外に使いやすいです。スクリプト全体が再実行され、チャット履歴はセッションステートに保持され、出力は決定的です。Streamlit は現在、主要な LLM プロバイダー向けのファーストパーティサポートを提供しており、Snowflake Cortex ともネイティブに統合されています。

**Streamlit を選ぶべきケース**：Python で AI 搭載のデータアプリ、社内レポートツール、または機械学習を活用したダッシュボードを構築し、できるだけシンプルなデプロイ手段を求める場合。

### LangChain と Haystack

これらはバックエンドのオーケストレーションフレームワークであり、UI フレームワークではありません。構造化された出力を生成し、フロントエンドに渡す層として、正直な「generative UI」スタックマップに必ず登場します。

**LangChain** ([langchain-ai/langchain](https://github.com/langchain-ai/langchain))：任意の LLM に対して `.with_structured_output()` を呼び出すと、Pydantic で制約された JSON が生成されます。`@tool` デコレータに自動スキーマ生成を組み合わせるのが、モデルが呼び出せるツールを定義する最もクリーンな方法です。LangChain は構造化された結果を、使用しているフロントエンド層へそのまま渡します。

**Haystack** ([deepset-ai/haystack](https://github.com/deepset-ai/haystack))：モジュール化されたパイプラインアーキテクチャで、RAG のサポートが強力です。Hayhooks は Haystack パイプラインを HTTP エンドポイント（MCP 互換エンドポイントを含む）としてラップします。生成 UI が検索バックボーンを必要とする場合、Haystack のパイプラインアーキテクチャがそれをきれいに処理します。

いずれのフレームワークも UI 層を所有しているわけではありません。フロントエンド（パターン 1、2、または 3）がデータを受け取り、描画するためのデータを生成するだけです。

## Feature Reference

上記のカタログは指針として利用し、買い物リストとして捉えないでください。スタックは通常、各層で1つの選択肢に絞られます。

| 必要項目 | 開始地点 |
|------|------------|
| Agent-to-frontend event stream | [AG-UI](https://github.com/ag-ui-protocol/ag-ui) |
| Declarative UI payload crossing a trust boundary | [A2UI](https://github.com/google/A2UI) or [MCP Apps](https://github.com/MCP-UI-Org/mcp-ui) |
| App-owned chat/tool rendering | [Vercel AI SDK](https://github.com/vercel/ai), [assistant-ui](https://github.com/assistant-ui/assistant-ui), or [CopilotKit](https://github.com/CopilotKit/CopilotKit) |
| Catalog-composed dashboards, reports, and forms | [json-render](https://github.com/vercel-labs/json-render), [Hashbrown](https://github.com/liveloveapp/hashbrown), [OpenUI](https://github.com/thesysdev/openui), or [Tambo](https://github.com/tambo-ai/tambo) |
| Sandboxed visual artifacts | [OpenGenerativeUI](https://github.com/CopilotKit/OpenGenerativeUI) |
| Python demos and data apps | [Gradio](https://github.com/gradio-app/gradio) or [Streamlit](https://github.com/streamlit/streamlit) |

## エコシステムの速度と不安定な土壌

この領域は急速に変化しており、いくつかのプロジェクトはコードとともに混乱を招く情報を出しています。最終確認は2026年5月8日です；ここに記載されたプロジェクトステータスは時点情報として扱い、永続的な結論とはみなさないでください。

**Vercel AI SDK RSC** は SDK 3.0 のリリース時に旗艦的な Generative UI 機能として登場しました。Vercel は 2024 年10月に開発を一時停止しました（[Discussion #3251](https://github.com/vercel/ai/discussions/3251)）。理由は、React Server Components とのアーキテクチャ上の制限で、近い将来に解決策が見込めなかったためです。これを基盤に構築していたチームは当然ながらフラストレーションを抱きました。ドキュメントにはまだ掲載されていますが、推奨パスではなくなっています；代わりに `useObject` が推奨されています。

**json-render**（Vercel Labs）は新しい方向性です――カタログベースでフレームワークに依存しない代替手段であり、RSC との結合問題を回避します。現在は 1.0 未満ですが、React／Web 開発者の間で早期関心が高いようです。考えられる DX の理由は、json-render が標準的な React/Next.js プロジェクトですぐに利用できるのに対し、A2UI のクロスプラットフォーム範囲はセットアップの摩擦を増す点です。両方の仕様が成熟するにつれてどうなるかは正直まだ不透明です。Vercel は json-render で A2UI 互換性を試みており、収束の可能性を示唆しています。

**A2UI**（Google）はプレ‑1.0（最終確認時は v0.9）で、マイナーバージョン間で破壊的変更が入りやすく、ロードマップに関する Google の情報発信も一貫していません。json‑render がカバーできない、Web + Flutter + SwiftUI といったクロスプラットフォーム展開が必要な場合に適していますし、エンタープライズの裏付けもあります。純粋な Web プロジェクトに限ると、現在の開発体験はやや厳しいです。

**AG‑UI**（CopilotKit）もプレ‑1.0です。最も混乱しやすい点は、名前が UI フレームワークのように聞こえることです。実際には UI フレームワークではなく、トランスポートプロトコルです。AG‑UI はエージェントバックエンドとフロントエンド間のイベントフローを定義しますが、レスポンスとして何を描画するかは依然として開発者の判断です。この概念は堅牢で広く採用されていますが、プレ‑1.0 仕様のため、エッジケースはまだ調整中です。

実務上の結論：**ここに挙げた主要プレイヤーはすべてプレ‑1.0**です。API 変更を想定して設計してください。ツール‑to‑コンポーネント、カタログ構成、サンドボックス生成といったパターン自体は十分に安定しているので、上に乗って実装できます。具体的なプロトコル選択はまだ流動的です。

## コンポーネントカタログ設計：実際のエンジニアリング作業

パターン2で興味深い複雑さの大半はレンダラにあるのではなく、カタログにあります。

カタログは **スキーマとしてエンコードされた製品上の決定** です。次の質問に答えます：このドメインで意味のある UI オブジェクトは何か？ 「どの React コンポーネントが存在するか？」ではなく、「このコンテキストのユーザーが実際に見るべきもの、操作すべきものは何か？」です。

**粒度が細かすぎる失敗モード**：`Row`、`Column`、`Text`、`Button`、`Icon` を公開します。するとモデルはフロントエンドエンジニアになる必要があります。デザインシステムに合わない mediocre なレイアウトを生成し、空状態を見落とし、アクセシビリティの欠如したマークアップを出力し、カタログに出力を製品のビジュアル言語に制約する要素がないため、応答ごとにアプローチが変わります。

**粒度が粗すぎる失敗モード**：`WeatherCard`、`FlightCard`、`HotelCard` を公開します。ユーザーが事前に用意されたカードにマッピングできない要求をした場合、モデルは適応できずテキストにフォールバックします。

**有用な中間層**：スロットが制限されたドメインレベルのコンポーネント。

旅行アプリのカタログは次のようになるかもしれません：

```
TripSummary         — itinerary at a glance
FlightOptionList    — selectable flight options with pricing
HotelComparison     — side-by-side hotel cards
TravelerForm        — collect traveler details
PolicyNotice        — regulatory/fare rule callout
BookingConfirmation — final confirmation with action button
```

金融アプリのカタログは次のようになるでしょう：

```
PortfolioSnapshot   — key positions and P&L
TransactionTable    — filterable, paginated transactions
RiskBreakdown       — allocation and volatility metrics
ScenarioComparison  — side-by-side scenario modeling
ApprovalGate        — action requiring human confirmation
```

カタログは製品の語彙に相当します。UX の方針、アクセシビリティ要件、空状態の処理、危険な操作パターンといった情報がコンポーネントコードに組み込まれ、モデルはそれらの部品を組み立てるだけです。部品の見た目や許容される動作は依然として開発者が決定します。

**幻覚を抑えるスキーマ設計ルール**：

1. 列挙型の値は短く分かりやすく保つ。例: `"type": "bar_chart"` とし、 `"type": "data-visualization-bar-type-vertical"` のように長くしない。
2. 無効な構成を不可能にする。たとえば `PolicyNotice` がレイアウトの末尾にしか出現できない場合、任意の位置に配置できる要素と同じスキーマ階層に置かない。
3. 必須フィールドは積極的に使用する。オプションフィールドはモデルが省略する可能性があり、レンダラ側で `null` 対応が必要になる。
4. カタログを実際のプロンプトでテストしてからリリースする。生成された仕様を保存し、スキーマ違反、幻覚的なフィールド値、技術的には有効だが意味的に誤っている構成がないかチェックする。

## 共通の落とし穴

**罠: 有効なJSONを安全な振る舞いとみなすこと。** スキーマ検証は構造を確認するだけで、ボタンに付随するアクションがラベルと一致しているか、合計値が元データと整合しているか、あるいは UI コンポーネントがユーザーの期待と異なる動作をしていないかは判断できません。生成された UI 仕様はスキーマ検証だけでなく、意味的なレビューが必須です。最低限、破壊的な操作には確認用コンポーネントを必ず入れ、そのコンポーネントのラベルが実際にトリガーするアクションと合致しているかをテストすべきです。

**罠: 製品のプリミティブではなく設計のプリミティブを公開してしまうこと。** モデルに 16px と 20px のパディングどちらを使うかを判断させるのは、抽象化レベルが間違っているということです。ドメインコンポーネントは製品の趣向をエンコードすべきで、モデルはプレゼンテーションの細部を管理するのではなく、振る舞いを組み立てるべきです。

**罠: 静的 UI で十分なところで生成 UI を使うこと。** 表示したい構造が開発時点で把握できる場合――ほとんどの場合そうです――事前に構築されたコンポーネントを用いるパターン 1 の方が高速で安全かつ一貫性があります。生成 UI がその複雑さを正当化するのは、構造がデータやタスクコンテキストに応じて本当に変化する場合だけです。

**罠: アクセシビリティを省くこと。** LLM は WCAG 違反を妄想します。インタラクティブ要素に `role="region"` を付与したり、ラベルのないフォームを生成したり、WCAG AA に違反するコントラスト比を出したりします。コンポーネントライブラリ自体が完全にアクセシブルであっても、AI が組み立てたそのコンポーネントの組み合わせが自動的にアクセシブルになるわけではありません。コンポーネント単体だけでなく、全体のレンダリングパスをテストしてください。

**罠: プロトコルとフレームワークを同一視すること。** AG‑UI はフロントエンドフレームワークではありません。A2UI も React ライブラリではありません。これらはワイヤーフォーマットおよびイベントプロトコルです。実装には依然としてフロントエンドフレームワークが必要です。CopilotKit は AG‑UI と A2UI を実装します。json‑render は A2UI／Open‑JSON‑UI カタログパターンを実装します。これらは別層です。

---

## ユースケース別の推奨事項

**既存の SaaS アプリにコパイロットを追加する場合**: パターン 1（tool-to-component）から始めます。Vercel AI SDK の `useChat` または CopilotKit を使用し、上位 5〜10 のエージェントアクションを事前構築済みコンポーネントにマッピングします。まずそれをリリースし、計測した上で、ユーザーが実際にリッチな構成を求めていることが確認できた場合にのみカタログを拡張します。

**自然言語からのダッシュボード生成**: パターン 2 と json-render、またはカスタム A2UI カタログを使用します。チャート種別、メトリックカード、テーブルバリエーションをカバーする 8〜15 種類のコンポーネントタイプのカタログを定義し、スキーマをモデルに渡してレイアウトを構成させます。レンダラに到達する前に未知のタイプを検出するバリデーションを構築します。

**マルチエージェントフロントエンド**: CopilotKit と AG-UI を組み合わせます。イベントストリームがエージェントバックエンド間のリアルタイムストリーミングを処理し、共有状態がエージェント間のハンドオフを管理します。HITL パターンで承認ゲートを設けます。

**ChatGPT や他の MCP ホスト内で構築する場合**: MCP アプリを使用します。ツールはデータ取得と推論を行うデータツールとして定義し、ウィジェットを要求する別のレンダーツールを用意します。ビジネスロジックはウィジェットテンプレートに入れないようにします。

**ML モデルのデモやデータアプリ（Python チーム）**: デモには Gradio、HuggingFace Spaces を利用します。より複雑なインタラクションが必要なデータアプリには Streamlit を使用します。どちらも JavaScript は不要です。

**ビジュアルアーティファクト、シミュレーション、図**: パターン 3（OpenGenerativeUI または同等）を使用します。厳格な iframe CSP を設定し、出力をセキュリティ上は信頼できないユーザーコンテンツとして扱います。

フレームワークは急速に成熟しています。プロトコルの収束（ストリーミング向けの AG‑UI、カタログ仕様向けの A2UI／Open‑JSON‑UI）はまだ進行中ですが、形は十分に見えてきており、上に乗って構築できる段階です。

現在最も重要なエンジニアリング課題は、フレームワークの選択ではありません。まずカタログ設計です。モデルに何を言わせるかを決めることは、技術的スキルよりも製品側の明確さが求められます。次に意味的検証です。生成された UI が主張どおりに機能するかをテストする必要があり、単にスキーマ検証を通過すればよいというわけではありません。最後にアクセシビリティのギャップです。各コンポーネント、そしてコンポーネントのすべての組み合わせが、手書き UI に求めるアクセシビリティ基準を満たすようなカタログを構築することが求められます。

モデルは、与えた文法の範囲内で指示したことを実行します。文法は意図的に設計してください。
````
