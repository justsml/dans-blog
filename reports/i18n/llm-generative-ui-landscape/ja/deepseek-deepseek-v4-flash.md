# Translation Candidate
- Slug: llm-generative-ui-landscape
- Locale: ja
- Model: deepseek/deepseek-v4-flash
- Target: src/content/posts/2026-05-06--llm-generative-ui-landscape/ja/index.mdx
- Validation: rejected: direct AI SDK translation failed
- Runtime seconds: 240.01
- Input tokens: unknown
- Output tokens: unknown
- Thinking tokens: unknown
- Cached input tokens: unknown
- Cache write tokens: unknown
- Estimated cost: unknown
- Pricing source: unknown
- Note: Command failed after 240000ms: bun run i18n:translate:chunked -- --slug llm-generative-ui-landscape --locale ja --model deepseek/deepseek-v4-flash --chunk 6p --quiz-concurrency 24
## Raw Output

````mdx
---
title: LLM生成UIの全体像
subTitle: ツール→コンポーネントのレンダリングからオープンエンド生成まで、手法と複雑さが妥当になるタイミングを示すマップ。
date: '2026-05-06'
modified: '2026-05-06'
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
social_image: ../desktop-social.webp
cover_full_width: ../wide.webp
cover_mobile: ../square.webp
cover_icon: ../square.webp
---
Chat はトレーニングホイールだった。

LLM アプリの最初の世代は、ほとんどが製品にくっつけたテキストボックスのような形態だった。モデルは文章を返し、フロントエンドは Markdown をレンダリングした。ユーザーが何かアクションを起こす必要がある場合、アシスタントは「ここにあるボタンをクリックしてください」と説明した。

デモとしては問題なかったが、これが最終形ではない。

次に有用になるステップは **generative UI** だ。モデルは単にテキストで答えるだけでなく、ユーザーが今必要とするインターフェースを決定する手助けをする。場合によってはツールを呼び出して事前に作られたカードを表示することもある。既知のワークフローコンポーネントに新しいデータを埋め込むこともある。あるいは、一時的なダッシュボード、フォーム、比較表、チャート、インタラクティブウィジェットを構成することもある。

残念ながら、「generative UI」は朝食前に五つの異なる意味になるフレーズの一つになってしまった。

人々はそれを次のように使う：

- 開発者が定義した React コンポーネントからモデルが選択する方式  
- フロントエンドがネイティブコンポーネントに変換する JSON 仕様  
- MCP ツールから返される iframe アプリ  
- ツール呼び出しをサポートするチャット UI ライブラリ  
- バックエンドとフロントエンド間で状態をストリーミングするエージェントプロトコル  
- v0、Lovable、Bolt、Cursor などの設計時コードジェネレータ  
- ランタイムで HTML、SVG、Canvas、または React を文字通り生成するモデル  

これらは関連しているが、同じ層ではない。曖昧に混同すると、あらゆるアーキテクチャ議論が意味不明なスープになる。

これは、現在のスタックを比較し始めたときに欲しかったマップだ。

![LLM ジェネレーティブ UI の層構造マップ](../landscape-map.webp)

## コアな誤解

最大の間違いは「generative UI」を単一の技術選択として扱うことだ。

問題を 4 つの層に分割した方が分かりやすい。

1. **Product shell**: ユーザーが直接触れる部分。チャット、サイドバーのコパイロット、ダッシュボード、ワークフロービルダー、IDE パネル、ChatGPT アプリ、モバイル画面、あるいはサポートコンソールなどが該当する。
2. **UI composition model**: モデルが利用できる文法。ツール呼び出し、JSON、A2UI、json‑render、OpenUI Lang、Hashbrown コンポーネント選択、サンドボックス化された HTML などがある。
3. **Runtime and transport**: エージェントとフロントエンド間でメッセージ、ツール呼び出し、状態差分、ユーザーアクション、UI アーティファクトがどのようにやり取りされるか。AG‑UI、MCP Apps、Apps SDK、A2A、SSE、WebSockets、従来の HTTP などがここに位置する。
4. **Agent and tool backend**: LangGraph、Google ADK、CrewAI、Mastra、LlamaIndex、Pydantic AI、Agno、OpenAI Agents SDK、カスタム関数、データベース、検索、そして正しく動作しなければならないすべてのビジネスロジック。

層を分けて考えると、エコシステムはずっと直感的になる。

[AG‑UI](https://github.com/ag-ui-protocol/ag-ui) は [A2UI](https://github.com/google/A2UI) の競合ではない。AG‑UI はエージェントとアプリケーション間のイベントプロトコルであり、A2UI はエージェントが送信できる宣言的 UI 形式だ。A2UI を AG‑UI 上に乗せることも、カスタムツールで描画したコンポーネントを AG‑UI 上に置くこともできる。

[json‑render](https://github.com/vercel-labs/json-render) はチャット製品ではない。これはコンポーネントカタログとレンダラアーキテクチャであり、モデルが使用できるコンポーネントを定義し、モデルが有効な JSON ツリーを出力し、そのツリーを安全にレンダリングする仕組みだ。

[CopilotKit](https://github.com/CopilotKit/CopilotKit) は単なるチャットバブルではない。エージェントネイティブアプリ向けのフロントエンドスタックであり、チャット UI、ジェネレーティブ UI、共有状態、フロントエンドツール、ヒューマン・イン・ザ・ループフローを提供する。

[OpenAI Apps SDK](https://developers.openai.com/apps-sdk) と [MCP Apps](https://github.com/MCP-UI-Org/mcp-ui) は「React アプリを動的にする」ツールではない。これらは ChatGPT や他の MCP 互換ホスト内でウィジェットを描画するためのホスト統合モデルである。

名前が紛らわしいのは、領域がまだ新しいからだ。層構造こそが有用性を保ち続ける部分である。

## コントロールスペクトラム

ジェネレーティブ UI は **開発者の制御** と **エージェントの自由度** のトレードオフである。

制御しすぎると、アシスタントはコスチュームを着たコマンドパレットのようになる。自由度を上げすぎると、モデルが奇妙なレイアウトや曖昧なボタン、壊れた視覚階層、実現不可能な状態、そして自信満々の笑みを浮かべたままのセキュリティ問題を作り出す。

コツは、ユーザー課題を解決するために必要最小限の自由度を選ぶことだ。

![A spectrum from tool-rendered components to open-ended generated HTML](../control-spectrum.webp)

I think about the spectrum like this:

**Tool-to-component rendering** は最も安全なデフォルトです。モデルは `get_weather`、`search_products`、`compare_plans`、または `draft_invoice` を呼び出します。アプリはそのツール結果を既に所有しているコンポーネントにマッピングします：`WeatherCard`、`ProductGrid`、`PlanComparison`、`InvoiceReview`。モデルは *UI が有用になるタイミング* を決定します。レイアウト、スタイリング、アクセシビリティ、ローディング状態、空状態、危険なアクションは依然として開発者が管理します。

このパターンは [Vercel AI SDK の generative UI ガイド](https://ai-sdk.dev/docs/ai-sdk-ui/generative-user-interfaces) に記載されています。モデルがツールを呼び出し、ツールがデータを返し、UI が結果からコンポーネントを描画します。多くの CopilotKit や assistant‑ui 実装のメンタルモデルでも同様です。

**Declarative component catalogs** はモデルに余地を与えます。単一のコンポーネントを選択する代わりに、モデルは許可された部品からツリーを構成します。カタログには `Metric`、`Table`、`Chart`、`FilterBar`、`ApprovalPanel`、`Timeline` などが含まれるかもしれません。モデルはダッシュボードやワークフローステップを組み立てられますが、任意のコードを実行することはできません。ここに [A2UI](https://github.com/google/A2UI)、[json-render](https://github.com/vercel-labs/json-render)、[Hashbrown](https://github.com/liveloveapp/hashbrown)、[OpenUI](https://github.com/thesysdev/openui) が位置します。

**Iframe mini-apps** は UI がコンポーネントツリー以上にリッチである必要がある場合、またはリモートツールプロバイダーが体験全体を所有する場合に有効です。MCP Apps と OpenAI Apps SDK は、ツールが構造化データに加えてウィジェットリソースを返し、ホストがそれを iframe 内で描画できるようにします。これは地図、ショッピングカート、予約フロー、チャート、外部製品サーフェスに対して強力です。また、ホストアプリとウィジェット間により硬い境界を作り出します。

**Open-ended generation** は最も先端の形態で、エージェントが HTML、SVG、Canvas、WebGL、あるいはその他のコードに近いアーティファクトをサンドボックス内に出力します。現在のベスト例は [OpenGenerativeUI](https://github.com/CopilotKit/OpenGenerativeUI) です。エージェントはサンドボックス化された iframe 内でアルゴリズムの可視化、3D シーン、図、シミュレーションを生成できます。これは単発のビジュアル説明には非常に有用ですが、エンタープライズ向けの承認フローの出発点としては適切ではありません。

ここで重要な区別に名前を付けておくと整理しやすいです：**iframe HTML**（モデルがサンドボックスにコードを書き込む） と **JSON カタログ**（モデルが構造化された仕様を出力し、レンダラが事前に用意したコンポーネントへマッピングする）。表面的には似ているように見えますが、リスクと複雑性のプロファイルは大きく異なります。iframe HTML は表現力が最大で、セキュリティは iframe の境界が担います。JSON カタログはモデルに実行可能な自由度を与えず、事前に定義したコンポーネントタイプへの参照に限定されます。この領域のフレームワークは、ほぼ確実にどちらか一方に属しています。

**Beyond the sandbox**：ごく最近のデモは、第四のモードが形成されつつあることを示唆しています。LLM がゲーム的あるいは没入型体験を駆動し、コンポーネントカタログが許容する以上に直接的にビジュアル出力を制御します。プロンプトから探索可能な 3D ワールドを生成したり、ランタイムで LLM が NPC の挙動を指示したり、WebGPU を介したブラウザ内推論（[WebLLM](https://mlc.ai/web-llm/)）を行うプロジェクトが初期の指標です。現時点では、これらを本番環境で構築するための安定したフレームワークは存在しません。状況が変わったら、専用の記事でこの方向性を取り上げます。

## High-Level Components vs Granular Components

これが最も重要な設計判断です。

カタログが過度に細分化されると、モデルはフロントエンドエンジニアになる必要があります。

```tsx
Container
Row
Column
Text
Button
Icon
Spacer
Divider
```

柔軟に見えますが、これでモデルは間隔、階層、グルーピング、空状態、ボタンラベル、エラー処理、レスポンシブ動作を決めなければなりません。プロンプトも大きくなり、出力が壊れやすくなります。

カタログが高レベルすぎると、モデルは次のように閉じ込められます:

```tsx
WeatherCard
StockCard
HotelCard
```

安全ですが、既知のシナリオでしか機能しません。モデルは比較マトリックスを作成したり、欠落した入力を求めたり、ユーザーの質問が変化したときに情報アーキテクチャを適応させることができません。

実用的な中間は **制約されたスロットを持つドメインレベルのコンポーネント** です:

```tsx
SearchResults
ComparisonTable
MetricGroup
EditablePlan
ApprovalRequest
Timeline
DataCollectionForm
CheckoutReview
```

これらのコンポーネントは製品のテイストとビジネス上の制約をエンコードします。モデルは *何を表示すべきか* を決められますが、すべての CSS 決定までを委ねるわけではありません。

たとえば、旅行代理店は `div`、`span`、`button` を必要としません。必要なのは次のようなものです:

- `TripSummary`
- `FlightOptionList`
- `HotelComparison`
- `TravelerForm`
- `PolicyNotice`
- `BookingConfirmation`

金融エージェントは汎用的なチャート描画プレイグラウンドを必要としません。必要なのは次のようなものです。

- `PortfolioSnapshot`
- `TransactionTable`
- `RiskBreakdown`
- `ScenarioComparison`
- `ApprovalGate`

カタログは製品のトーンに合わせるべきであり、HTML のような表現にすべきではありません。

## Feature Table

この表は意図的に主観的です。各プロジェクトをスタック内のツールとして扱い、勝者総取りのプラットフォームとして評価しません。

| テクノロジー | レイヤー | 最適な適用先 | UI モデル | ストリーミング / 状態 | 備考と例 |
| --- | --- | --- | --- | --- | --- |
| [AG-UI](https://github.com/ag-ui-protocol/ag-ui) | ランタイムプロトコル | エージェントバックエンドとフロントエンドアプリの接続 | メッセージ、ツール、状態、アクティビティ、割り込み用イベント | あり; イベントストリーム＋状態スナップショット/デルタ | 標準的なエージェント‑to‑アプリパイプが必要なときに使用。MCP や A2A を置き換えるのではなく補完する。 |
| [A2UI](https://github.com/google/A2UI) | 宣言的 UI プロトコル | クロスプラットフォーム、エージェント生成ネイティブ UI | コンポーネント、データモデル、更新を記述した JSON ペイロード | 増分更新向けに設計 | リモートエージェントや信頼境界で強力な選択肢。パブリックプレビュー段階だが概念はクリーン。 |
| [json-render](https://github.com/vercel-labs/json-render) | コンポーネントカタログとレンダラ | 承認済みコンポーネントをモデルに組み立たせる | 型付けカタログで制約された JSON ツリー | プログレッシブレンダリングをサポート | React, Vue, Svelte, Solid, React Native, email, PDF, Remotion, ターミナルなど幅広く利用可能。 |
| [CopilotKit](https://github.com/CopilotKit/CopilotKit) | プロダクトシェルとエージェント UI フレームワーク | アプリ内コパイロット、共有状態、フロントエンドツール、HITL | ツールレンダリング、AG-UI、A2UI、MCP Apps パターン | あり | 「ビルドエージェント‑ネイティブアプリ」スタックの中でも最も広範。[generative-ui examples](https://github.com/CopilotKit/generative-ui) を参照。 |
| [OpenGenerativeUI](https://github.com/CopilotKit/OpenGenerativeUI) | オープンエンド UI 生成デモ | ビジュアル説明、図、シミュレーション、チャート | エージェントが HTML / SVG / Canvas をサンドボックス化された iframe に出力 | プログレッシブなビジュアルレンダリング | 固定コンポーネントカタログが制限になる動的アーティファクトに適用。 |
| [MCP Apps / mcp-ui](https://github.com/MCP-UI-Org/mcp-ui) | ホスト/ウィジェット標準 | ツールプロバイダーが MCP 経由でインタラクティブ UI を返す | ツールメタデータからリンクされた HTML リソース | ホストブリッジとウィジェットアクション | UI がツールプロバイダー所有、または iframe 分離が必要なケースに最適。 |
| [OpenAI Apps SDK](https://developers.openai.com/apps-sdk) | ChatGPT アプリホスト統合 | カスタム ChatGPT アプリウィジェットの構築 | MCP サーバーツール＋iframe UI コンポーネント | ツール入力/結果、ウィジェット状態、フォローアップメッセージ | 新規 ChatGPT アプリは MCP Apps フィールドと `ui/*` ブリッジ、互換性/拡張のために `window.openai` を利用すべき。 |
| [Vercel AI SDK UI](https://ai-sdk.dev/docs/ai-sdk-ui/generative-user-interfaces) | アプリ SDK とチャット状態 | カスタムアプリチャット、ツール呼び出し、ストリーミングメッセージ部品 | ツール結果を React コンポーネントとしてレンダリング | あり, `useChat` と UI メッセージストリーム経由 | すでにアプリを所有し、低レベル制御を求める場合の優れたベースライン。[AI Elements](https://elements.ai-sdk.dev/) と組み合わせて UI プリミティブを利用可。 |
| [assistant-ui](https://github.com/assistant-ui/assistant-ui) | React チャットプリミティブ | カスタムレンダリングが可能な本番チャット UX | 組み合わせ可能なチャットプリミティブ、ツール呼び出しレンダリング、JSON をコンポーネント化 | あり | バックエンドは自前で持ちつつ、洗練されたチャット体験が必要な場合に強力。 |
| [LangGraph Generative UI](https://docs.langchain.com/langgraph-platform/generative-ui-react) | エージェントプラットフォーム統合 | グラフコードと UI コンポーネントの同居 | グラフが名前付き UI メッセージを発行し、React コンポーネントで描画 | あり、カスタムストリームイベント含む | LangGraph デプロイやグラフ所有 UI コンポーネントに自然に適合。 |
| [Hashbrown](https://github.com/liveloveapp/hashbrown) | フロントエンド GenUI フレームワーク | コンポーネントとクライアントサイドツールを公開する React/Angular アプリ | LLM が許可されたアプリコンポーネントを選択・レンダリング | ストリーミングパターンをサポート | チャットに留まらず、製品サーフェスに直接インテリジェンスを埋め込むのに適している。 |
| [OpenUI](https://github.com/thesysdev/openui) | コンパクト UI 言語とランタイム | JSON よりトークン数が少ないストリーミング可能なモデル生成 UI | OpenUI 言語 + React ランタイム + コンポーネントライブラリ | トークンストリーミング向けに設計 | JSON の冗長性がボトルネックになる場合に興味深い。まだ若いが注視すべき。 |
| [Tambo](https://github.com/tambo-ai/tambo) | React ジェネレーティブ UI SDK | コンポーネント選択、状態フルコンポーネント、クライアントサイドツール実行 | AI がコンポーネントを選択しクライアントツールと相互作用 | 状態指向 | 自動コンポーネントオーケストレーションに焦点を当てた人気 OSS React オプション。 |
| [llm-ui](https://llm-ui.com/) | 出力レンダラ | カスタムインラインコンポーネントで LLM テキスト出力を滑らかに | モデル出力文字列を React 描画に変換 | スムーズなトークン描画 | テキストストリーム内の軽量カスタムコンポーネントに有用。フルエージェント UI プロトコルではない。 |
| AI SDK RSC / React Server Components | 旧パターン / フレームワーク機能 | Next.js におけるサーバーレンダリングコンポーネントストリーム | モデル/ツールフローがサーバーレンダリング UI を返す | あり、ただしフレームワーク特化 | 2024 年 10 月に開発が停止 ([Discussion #3251](https://github.com/vercel/ai/discussions/3251))。推奨経路ではなく、`useObject` または json-render へ移行すべき。 |

## どのプロダクトに何を使うべきか

実際にチームで使うことを想定した推奨マトリックスです。

**既存 SaaS アプリにアシスタントを追加する場合。**

まずはツール‑to‑コンポーネントレンダリングから始めます。エージェント状態やフロントエンドツール統合の必要度に応じて、[Vercel AI SDK UI](https://ai-sdk.dev/docs/ai-sdk-ui/generative-user-interfaces)、[assistant-ui](https://github.com/assistant-ui/assistant-ui)、または [CopilotKit](https://github.com/CopilotKit/CopilotKit) を選択してください。最初はカタログを極小に保ち、既に信頼できるプロダクトコンポーネントだけをレンダリングします。

**共有状態が必要な本格的なアプリ内コパイロットを構築する場合。**

CopilotKit と AG‑UI を注意深く見ると、重要な機能は「チャット」ではなく、共有状態と双方向インタラクションです。エージェントは入力を要求し、UI を描画し、状態を更新し、承認のために一時停止できます。

**リモートエージェントが境界越しに UI を送信する必要がある場合。**

A2UI または A2UI に類似した宣言的プロトコルを使用します。リモートエージェントが UI をデータとして記述できる一方で、ホスト側がネイティブなレンダリング、セキュリティ、スタイルを管理できることがポイントです。エージェントとアプリ間でライブな相互作用が必要な場合は、AG‑UI や環境が標準化している任意のトランスポート上で実行します。

**ChatGPT や MCP 互換ホスト内で構築する場合。**

MCP Apps と Apps SDK のパスを利用します。OpenAI の最新ドキュメントでは、`ui/*` ブリッジを新規作業の推奨としている一方で、互換性層として `window.openai` を残し、オプションの拡張サーフェスとして提供しています。また、データツールとレンダーツールを分離する方式を踏襲し、モデルがウィジェットを描画する前にデータを取得・推論させます。

**自分のアプリで自然言語によるダッシュボード、レポート、フォームを実現したい場合。**

json‑render、Hashbrown、OpenUI を試してみてください。重要なのはカタログです。`LineChart`、`DataTable`、`MetricGroup`、`FilterControl`、`InsightCallout` を公開すれば、モデルは任意のコードに触れずに有用なレポート画面を組み立てられます。

**教育用、ビジュアル重視、または高度にカスタマイズされた成果物が必要な場合。**

OpenGenerativeUI のようなオープンエンドのサンドボックスを使用します。モデルに SVG、Canvas、WebGL、あるいは自己完結型 HTML を書かせますが、出力は信頼できないユーザーコンテンツとして扱い、サンドボックス化し、サイズを制限し、権限を剥奪し、特権アプリ状態から隔離します。

**主に、少数のインライン機能を備えた整形済みストリーミング Markdown が欲しい場合。**

過剰に構築しないことです。`llm-ui` や `assistant-ui` のツールレンダリングで十分なことがあります。

## 私が避けるべきミス


**Mistake 1: Letting the model write production React at runtime.**  
例外はありますが、製品 UI においては通常これが誤ったデフォルトです。ランタイムでのコード生成は、セキュリティ確保が難しく、テストが困難で、テーマ適用が難しく、アクセシビリティを維持するのも大変です。モデルが信頼できるコンポーネントから選択して仕事を完了できるのであれば、そちらを選ばせてください。

**Mistake 2: Exposing design primitives instead of product primitives.**  
モデルに `Row`、`Column`、`Text`、`Button` といった設計プリミティブを与えると、モデルはあなたのデザインシステムになろうとします。結果は平均的なものにしかなりません。より上位レベルの製品名詞を提供してください。

**Mistake 3: Thinking valid JSON means safe UI.**  
ペイロードがスキーマ検証を通過したとしても、操作的に危険なものになることがあります。ラベルが「請求書を見る」と表示されても、実際のアクションがアカウントをアーカイブすることもあり得ます。UI 仕様は装飾ではなく振る舞いとして扱い、ポリシー検証、意味論的チェック、重要なアクションに対する人間の確認が必要です。

**Mistake 4: ビジネスロジックをレンダーツールに詰め込むこと。**

レンダーツールは UI を描画すべきです。データツールは取得、計算、変換、検証を行うべきです。OpenAI の Apps SDK ドキュメントがこの分離を強調しているのは、すべてのデータツールがウィジェットを引きずってくると、モデルが提示前に推論できる余地が失われるためです。

**Mistake 5: タスク完了よりも新規性を最優先にすること。**

目的はすべての回答を「スノーフレーク」インターフェースにすることではありません。目的は摩擦を減らすことです。ユーザーの作業時間を 4 分短縮する、安定した退屈な承認パネルは、二度と信頼できない華やかな生成ダッシュボードよりも優れています。

## 実践的なアーキテクチャ

もし今日新しいプロダクトを立ち上げるなら、段階的アプローチを取ります:

1.  **まず制御されたツール UI をリリースする。** 既知のツールを既知のコンポーネントにマッピングし、すべてのツール呼び出し、UI レンダリング、ユーザーアクションを記録する。  
2.  **ドメインカタログを追加する。** パターンが繰り返されるようになったら、`ComparisonTable`、`DecisionPanel`、`DataCollectionForm`、`Timeline` など、プロダクト固有のコンポーネントを公開する。  
3.  **必要になったときだけトランスポートの標準化を導入する。** フロントエンドとバックエンドの両方を自前で持っている場合は、シンプルなストリーミングで十分なこともある。エージェントフレームワークが複数ある場合は AG‑UI を使う。ツールがプロダクト境界を越える場合は MCP を採用する。エージェントが組織境界を越える場合は A2A と A2UI に注意する。  
4.  **外部または複雑な UI には iframe ウィジェットを利用する。** 地図、カート、予約フロー、サードパーティのミニアプリは境界の背後に置くべきだ。  
5.  **オープンエンドな生成はアーティファクトに限定する。** 図表、シミュレーション、臨時の説明資料、ビジュアルなスクラッチパッドは適材だが、コアワークフローには不向きである。

アーキテクチャは次のようになる:

```txt
User intent
  -> agent runtime
  -> tool/data calls
  -> structured result
  -> UI decision
  -> trusted component, declarative spec, or sandboxed widget
  -> user action
  -> state/event stream back to the agent
```

このループが実際のプロダクトである。チャットボックスは単なる入力デバイスの一例に過ぎない。

## 評価に UI を含めるべき

LLM チームはプロンプトやモデル出力の評価手法を徐々に学んでいる。Generative UI は別の評価対象を追加する――インターフェース自体が誤っている可能性がある。

最低限、生成された UI ごとに以下のアーティファクトを保存する:

- プロンプトとツールコンテキスト  
- ツール呼び出しとツール結果  
- 生成された UI 仕様またはコンポーネント選択  
- レンダリングされたコンポーネント名とプロップ  
- ユーザーに見えるラベル  
- ボタン／フォームに紐付くアクション  
- UI からモデルが参照できる状態更新  
- ユーザーアクション履歴  

次にチェックリストを作成します:

- 破壊的なアクションはすべて確認コンポーネントを必須とする  
- ボタンラベルはアクションの意味と一致させる  
- レンダリング仕様は許可されたコンポーネントのみ参照できる  
- ユーザーに見える合計はツール結果の合計と一致させる  
- フォームはタスク範囲外のフィールドを要求してはならない  
- ウィジェットはモデルだけが必要とするシークレットを受け取ってはならない  
- 隠しメタデータは表示ラベルと矛盾してはならない  

面倒に思えるかもしれませんが、ここが本番環境での信頼性を確保するポイントです。

## 最初に参照すべきリンク

記事から実装へ移行したい場合、以下のリポジトリが最適な出発点です。

- [AG-UI リポジトリ](https://github.com/ag-ui-protocol/ag-ui) と [AG-UI ドキュメント](https://docs.ag-ui.com/introduction) – ランタイムイベントモデル用  
- [A2UI リポジトリ](https://github.com/google/A2UI) と [A2UI 仕様](https://a2ui.org/specification/v0.9-a2ui/) – 宣言的エージェント‑to‑UI ペイロード用  
- [json-render リポジトリ](https://github.com/vercel-labs/json-render) と [json-render ドキュメント](https://json-render.dev/) – カタログ駆動 JSON UI 生成用  
- [CopilotKit リポジトリ](https://github.com/CopilotKit/CopilotKit) と [generative‑ui サンプル](https://github.com/CopilotKit/generative-ui) – AG-UI、A2UI、Open‑JSON‑UI、MCP Apps パターンの実装例  
- [OpenGenerativeUI](https://github.com/CopilotKit/OpenGenerativeUI) – サンドボックス化された HTML／SVG／Canvas ビジュアルアーティファクト用  
- [MCP-UI / MCP Apps SDK](https://github.com/MCP-UI-Org/mcp-ui) – MCP 上の UI リソース用  
- [OpenAI Apps SDK ドキュメント](https://developers.openai.com/apps-sdk) と [Apps SDK サンプル](https://github.com/openai/openai-apps-sdk-examples) – ChatGPT アプリウィジェット用  
- [Vercel AI SDK generative UI ガイド](https://ai-sdk.dev/docs/ai-sdk-ui/generative-user-interfaces) と [AI Elements](https://elements.ai-sdk.dev/) – アプリ所有のチャット／ツール描画用  
- [assistant‑ui](https://github.com/assistant-ui/assistant-ui) – 組み合わせ可能な React チャットプリミティブ用  
- [LangGraph generative UI ドキュメント](https://docs.langchain.com/langgraph-platform/generative-ui-react) – グラフが出力する UI コンポーネント用  
- [Hashbrown](https://github.com/liveloveapp/hashbrown) – React／Angular コンポーネント選択とクライアント側ツール用  
- [OpenUI](https://github.com/thesysdev/openui) – コンパクトでストリーミング優先のモデル生成 UI 用  
- [Tambo](https://github.com/tambo-ai/tambo) – 状態保持コンポーネントを持つ React generative UI 用  
- [llm‑ui](https://llm-ui.com/) – カスタムインラインコンポーネントで滑らかなテキストストリームを実現  

## プロジェクトの安定性に関する注意

この領域の主要プロトコルはすべて 1.0 未満です。最終確認は 2026 年 5 月 8 日時点で行っており、変更が起こり得ることを前提に、プラットフォームを選定する前に最新ドキュメントを必ず確認してください。

**Vercel AI SDK RSC** — 当初の「Generative UI」ヘッドライン機能 — は 2024 年 10 月に開発が一時停止されました（[Discussion #3251](https://github.com/vercel/ai/discussions/3251)）。アーキテクチャ上の制限が近い将来に解決できないためです。**json‑render**（Vercel Labs）は代替方向として登場し、カタログベース・フレームワーク非依存・RSC 結合なしを実現しています。2026 年初頭のリリース以降、ウェブ開発者の関心を急速に集めているようです。主な理由は開発者体験（DX）で、json‑render は標準的な React プロジェクトですぐに使える一方、A2UI はクロスプラットフォーム対応が前提のためセットアップの摩擦が大きくなります。

**A2UI**（Google）も 1.0 未満で、マイナーバージョン間で破壊的変更が入りやすく、ロードマップの情報提供が一貫していません。その利点は、Web、Flutter、SwiftUI といった真のクロスプラットフォーム対応が可能な点で、json‑render がカバーしない領域です。純粋に Web だけを対象とする現在のユースケースでは、json‑render の方がツールチェーンが充実しています。クロスプラットフォームやリモートエージェントシナリオでは、A2UI の設計がより適しています。両仕様の収束は技術的に可能で、Vercel は json‑render から A2UI 互換出力を試験的に生成しています。

**AG‑UI**（CopilotKit）も 1.0 未満です。最も混乱しやすい点は名前です。AG‑UI はトランスポートプロトコルであり、UI フレームワークではありません。エージェントとフロントエンド間のイベントフロー *どうやって* 行うかを定義しますが、実際に何を描画するかは開発者の裁量です。概念自体は堅牢で広く採用されていますが、仕様はまだ進化中です。

## My Take

Generative UI は、慎重に設計されたプロダクトインターフェースに取って代わるものではありません。AI の汎用インターフェースとしてチャット履歴を前提とする甘い仮定を置き換えるだけです。

最良のシステムは、モデルにすべてを即興させるのではなく、狭く鋭いプロダクト固有のビルディングブロックを少数提供し、信頼できるランタイム接続を確保し、明確なセキュリティ境界を設け、タスクに応じてインターフェースを調整できる程度の自由度を与えます。

未来は「モデルがフロントエンドを書き換える」ことではありません。

未来に近いのは、**フロントエンドがエージェントの演奏できる楽器になるが、楽器が出す音は自分で許可した範囲に限定する**、という形です。
````
