# Translation Candidate
- Slug: llm-generative-ui-landscape
- Locale: ja
- Model: qwen/qwen3.5-9b
- Target: src/content/posts/2026-05-06--llm-generative-ui-landscape/ja/index.mdx
- Validation: rejected: direct AI SDK translation failed
- Runtime seconds: 222.14
- Input tokens: unknown
- Output tokens: unknown
- Thinking tokens: unknown
- Cached input tokens: unknown
- Cache write tokens: unknown
- Estimated cost: unknown
- Pricing source: unknown
- Note: Command failed: bun run i18n:translate:chunked -- --slug llm-generative-ui-landscape --locale ja --model qwen/qwen3.5-9b --chunk 6p --run-id 2026-05-13T18-15-57-947Z-61322 --run-lock-path /Users/dan/code/oss/dans-blog/.git/codex-i18n-translation-run.json --quiz-concurrency 24 (code 1)
## Raw Output

````mdx
---
title: LLM生成型UIの概観
subTitle: ''
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
チャットはトレーニングホイールでした。

最初の世代のLLMアプリは、主にテキストボックスを製品に貼り付けたような見た目でした。モデルは散文を返し、フロントエンドはマークダウンをレンダリングしました。ユーザーがアクションを取る必要があると、アシスタントはユーザーがどこか別の場所でクリックすべきボタンを説明するだけでした。

これはデモには十分でしたが、これがあらゆる進化の方向ではありません。

次の重要なステップは**ジェネレーティブUI**です。モデルは単にテキストで応答するだけでなく、ユーザーが今必要なインターフェースを決定するのを助けます。場合によってはツールを呼び出して事前に構築されたカードをレンダリングすることを意味します。場合によっては既知のワークフロー コンポーネントに最新のデータを詰め込むことを意味します。場合によっては一時的なダッシュボード、フォーム、比較表、チャート、インタラクティブ ワイジェットを構成することを意味します。

残念ながら、「ジェネレーティブUI」というフレーズは、朝食前には5つの異なる意味を持つようになりました。

人々はこれを使って説明しています：

- 開発者が定義したReactコンポーネントからモデルが選択する  
- フロントエンドがネイティブコンポーネントにレンダリングするJSON仕様  
- MCPツールから返されたiframeアプリ  
- ツール呼び出しをサポートするチャットUIライブラリ  
- バックエンドとフロントエンド間で状態をストリーミングするエージェントプロトコル  
- v0、Lovable、Bolt、Cursorなどのデザインタイムコードジェネレータ  
- ランタイムでHTML、SVG、Canvas、またはReactを実際に書き出すモデル  

これらは関連していますが、同じレイヤーではありません。これらを混同すると、すべてのアーキテクチャ議論が混乱に陥ります。  

これは、私が初めて現在のスタックを比較したときに持っていきたかったマップです。  

![LLMジェネレーティブUIランドスケープのレイヤードマップ](../landscape-map.webp)  

## 核となる誤解  

最大の間違いは、「ジェネレーティブUI」を1つの技術選択として扱うこと。

問題を4つのレイヤーに分けるのが適切です：  

1. **製品シェル**: ユーザーが直接操作するインターフェース。チャット、サイドバーのコパイロット、ダッシュボード、ワークフロー構築ツール、IDEパネル、ChatGPTアプリ、モバイル画面、サポートコンソールなどが該当します。  
2. **UI構成モデル**: モデルが利用可能な表現の文法。ツール呼び出し、JSON、A2UI、json-render、OpenUI Lang、Hashbrownコンポーネント選択、またはサンドボックスHTMLなどが該当します。  
3. **ランタイムとトランスポート**: エージェントとフロントエンド間でメッセージ、ツール呼び出し、状態差分、ユーザーアクション、UIアーティファクトを伝達する方法。AG-UI、MCP Apps、Apps SDK、A2A、SSE、WebSocket、または単純なHTTPなど、このレイヤーに属します。  
4. **エージェントとツールバックエンド**: LangGraph、Google ADK、CrewAI、Mastra、LlamaIndex、Pydantic AI、Agno、OpenAIエージェントSDK、カスタム関数、データベース、リトリーバル、そして依然として正確でなければならないすべての「地味な」ビジネスロジックが含まれます。  

レイヤーを分離すると、エコシステムははるかに明確になります。  

[AG-UI](https://github.com/ag-ui-protocol/ag-ui) は[A2UI](https://github.com/google/A2UI)の真の競争相手ではありません。AG-UIはエージェントとアプリケーションの相互作用を管理するイベントプロトコルです。一方、A2UIはエージェントが送信可能な宣言型UIフォーマットです。A2UIをAG-UIの上に配置することも、カスタムツールレンダリングコンポーネントをAG-UIに載せることも可能です。  

[json-render](https://github.com/vercel-labs/json-render) はチャット製品ではありません。これはコンポーネントカタログとレンダラーアーキテクチャです：モデルが利用可能なコンポーネントを定義し、モデルが有効なJSONツリーを出力し、そのツリーを安全にレンダリングします。  

[CopilotKit](https://github.com/CopilotKit/CopilotKit) は単なるチャットバブルではありません。これはエージェントネイティブアプリのためのフロントエンドスタックであり、チャットUI、ジェネレーティブUI、共有状態、フロントエンドツール、および人間介入ワークフローを含みます。

[OpenAI Apps SDK](https://developers.openai.com/apps-sdk) および [MCP Apps](https://github.com/MCP-UI-Org/mcp-ui) は「私のReactアプリを動的にする」ツールではありません。これらは、ChatGPTや他のMCP互換ホスト内でウィジェットをレンダリングするためのホスト統合モデルです。  

名前の混乱は分野が若いため起こりがちです。有用なのはレイヤーの概念です。  

## 制御のスペクトル  

ジェネレーティブUIは、**開発者の制御**と**エージェントの自由**のトレードオフです。  

制御が過剰すぎると、アシスタントはコマンドパレットが仮装しているように感じられます。自由が過剰すぎると、モデルは奇妙なレイアウト、曖昧なボタン、破損したビジュアル階層、不可能な状態、そして自信満々にニヤニヤしながらセキュリティ問題を生み始めます。  

ポイントは、ユーザーの問題を解決するのに必要な最小限の自由を選ぶことです。

![ツールレンダリングコンポーネントからオープンエンド生成HTMLへのスペクトル](../control-spectrum.webp)

私はこのスペクトルを次のように考えます：

**ツール→コンポーネントレンダリング** は最も安全なデフォルトです。モデルが `get_weather`、`search_products`、`compare_plans`、または `draft_invoice` を呼び出します。アプリはそのツールの結果を既存のコンポーネント（`WeatherCard`、`ProductGrid`、`PlanComparison`、`InvoiceReview`）にマッピングします。モデルがUIが有用なタイミングを決定します。開発者はレイアウト、スタイル、アクセシビリティ、ロードステート、空ステート、危険なアクションを依然として所有します。

これは[Vercel AI SDKのジェネレーティブUIガイド](https://ai-sdk.dev/docs/ai-sdk-ui/generative-user-interfaces)に記載されたパターンです：モデルがツールを呼び出し、ツールがデータを返し、UIが結果からコンポーネントをレンダリングします。これはCopilotKitやassistant-uiの多くの実装の背後にあるメンタルモデルでもあります。

**宣言的コンポーネントカタログ** はモデルにさらに多くの自由を与えます。1つのコンポーネントを選択するのではなく、モデルは許可されたパーツからツリーを構成します。カタログには `Metric`、`Table`、`Chart`、`FilterBar`、`ApprovalPanel`、`Timeline` などが含まれるかもしれません。モデルはダッシュボードやワークフローのステップを組み立てることができますが、任意のコードを実行することはできません。これは[A2UI](https://github.com/google/A2UI)、[json-render](https://github.com/vercel-labs/json-render)、[Hashbrown](https://github.com/liveloveapp/hashbrown)、[OpenUI](https://github.com/thesysdev/openui) が位置づけられる場所です。

**Iframeミニアプリ** はUIがコンポーネントツリー以上に豊かである必要がある場合、またはリモートのツールプロバイダーが体験を所有している場合に適しています。MCP AppsとOpenAI Apps SDKは、ツールが構造化データとウィジェットリソースを返すことを可能にし、ホストがiframeでレンダリングします。これは地図、ショッピングカート、予約フロー、チャート、外部製品の表示に強力です。これはホストアプリとウィジェットの間により厳しい境界をもたらします。

**オープンエンド生成** は遠端：エージェントがHTML、SVG、Canvas、WebGL、またはその他のコードライクなアーティファクトをサンドボックスに生成します。[OpenGenerativeUI](https://github.com/CopilotKit/OpenGenerativeUI) が現状で最も良い例です：エージェントはサンドボックスされたiframe内でアルゴリズムの可視化、3Dシーン、図表、シミュレーションを生成できます。これはワンオフの視覚的説明に最適です。企業の承認フローの起点としては私はここから始めません。

ここで重要な区別を名付けると役立ちます：**iframe HTML**（モデルがコードをサンドボックスに書き込む）対 **JSONカタログ**（モデルが構造化された仕様を出力し、レンダラがそれを事前に構築されたコンポーネントにマッピングする）。これらは関連しているように聞こえますが、リスクと複雑さのプロファイルが非常に異なります。iframe HTMLは最大限の表現力を提供しますが、iframe境界がセキュリティの作業を担います。JSONカタログではモデルに実行可能な自由がありません—事前に定義されたコンポーネントタイプにのみ参照できます。この分野のフレームワークの多くは明確にどちらかの立場に分類されます。

**サンドボックスを超えて**：最近のデモは第4のモードが形成されていることを示唆しています—LLMがコンポーネントカタログが許容する以上の直接性で視覚出力を制御し、ゲームライクまたは没入型の体験を駆動します。プロンプトから生成された探査可能な3Dワールド、ランタイムでのLLM指向のNPC行動、WebGPUによるブラウザ内モデル推論（[WebLLM](https://mlc.ai/web-llm/)）は初期の指標です。ここにはまだ生産的な作業に使える安定したフレームワークはありません。状況が変化した時点で、この方向性を専用の記事で扱います。

## 高水準コンポーネント対粒度細かいコンポーネント

これは最も重要な設計決定です。

カタログが過度に粒度細かい場合、モデルはフロントエンドエンジニアになる必要があります：

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

これは柔軟に見えるかもしれませんが、今度はモデルが間隔、階層、グループ化、空状態、ボタンラベル、エラーハンドリング、レスポンシブ挙動を決定しなければなりません。またプロンプトが大きくなり、出力が壊れやすくなるというデメリットもあります。

カタログが過度に高水準すぎるとモデルは捕らわれてしまいます：

```tsx
WeatherCard
StockCard
HotelCard
```

これは安全ではありますが、既知のシナリオでのみ動作します。モデルは比較マトリクスを作成できず、不足している入力を要求したり、ユーザーの質問が変化した際に情報アーキテクチャを調整したりできません。

実用的な中間領域は**ドメインレベルのコンポーネントと制約されたスロット**です：

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

これらのコンポーネントは製品の品位とビジネス上の制約をエンコードします。モデルは*何を表示すべきか*を決定できますが、すべてのCSSの選択は行いません。

たとえば、旅行代理店は`div`、`span`、`button`を必要としません。必要なのは：

- `TripSummary`
- `FlightOptionList`
- `HotelComparison`
- `TravelerForm`
- `PolicyNotice`
- `BookingConfirmation`

金融業のエージェントは汎用的なチャート作成環境を必要としません。必要なのは：

- `PortfolioSnapshot`
- `TransactionTable`
- `RiskBreakdown`
- `ScenarioComparison`
- `ApprovalGate`

カタログは製品そのもののように聞こえ、HTMLのようには聞こえないようにするべきです。

## 機能一覧

この表は意図的に主観的な視点を含んでいます。それぞれのプロジェクトを勝者独占型プラットフォームではなく、スタック内のツールとして扱っています。

| 技術 | レイヤー | 最適な用途 | UIモデル | ストリーミング/状態 | メモと例 |
| --- | --- | --- | --- | --- | --- |
| [AG-UI](https://github.com/ag-ui-protocol/ag-ui) | ランタイムプロトコル | エージェントバックエンドとフロントエンドアプリの接続 | メッセージ、ツール、状態、アクティビティ、割り込みのイベント | はい；イベントストリームと状態スナップショット/デルタ | エージェントとアプリ間の標準パイプが必要な場合に使用。MCPやA2Aを置き換えるのではなく補完します。 |
| [A2UI](https://github.com/google/A2UI) | 説明的UIプロトコル | クロスプラットフォーム、エージェント生成のネイティブUI | コンポーネント、データモデル、更新を記述するJSONペイロード | インクリメンタル更新向けに設計 | リモートエージェントや信頼境界で強力な選択肢。初期の公開プレビューですが、概念的にクリーンです。 |
| [json-render](https://github.com/vercel-labs/json-render) | コンポーネントカタログとレンダラ | モデルが承認済みコンポーネントを組み合わせる | 型付きカタログで制約されたJSONツリー | 進行中のレンダリングをサポート | React、Vue、Svelte、Solid、React Native、メール、PDF、Remotion、ターミナルなどに適しています。 |
| [CopilotKit](https://github.com/CopilotKit/CopilotKit) | プロダクトシェルとエージェントUIフレームワーク | アプリ内コパイロット、共有状態、フロントエンドツール、HITL | ツールレンダリング、AG-UI、A2UI、MCPアプリパターン | はい | エージェントネイティブアプリのスタックで最も幅広い選択肢の一つ。[generative-ui examples](https://github.com/CopilotKit/generative-ui)を参照。 |
| [OpenGenerativeUI](https://github.com/CopilotKit/OpenGenerativeUI) | オープンエンドUI生成のデモ | ビジュアル説明、図、シミュレーション、チャート | エージェントがHTML/SVG/CanvasをサンドボックスドIFRAMEに送出 | 進行中のビジュアルレンダリング | 固定コンポーネントカタログが制限的すぎる動的アーティファクトに最適。 |
| [MCP Apps / mcp-ui](https://github.com/MCP-UI-Org/mcp-ui) | ホスト/ウィジェット標準 | MCPを通じたインタラクティブUIをツールプロバイダが返す | ツールメタデータからリンクされたHTMLリソース | ホストブリッジとウィジェットアクション | UIがツールプロバイダに属する場合やIFRAME分離が必要な場合に最適。 |
| [OpenAI Apps SDK](https://developers.openai.com/apps-sdk) | ChatGPTアプリホスト統合 | カスタムChatGPTアプリウィジェットの構築 | MCPサーバーツールとIFRAME UIコンポーネント | ツール入力/結果、ウィジェット状態、フォローアップメッセージ | 新しいChatGPTアプリはMCP Appsフィールドと`ui/*`ブリッジを優先し、`window.openai`は互換性/拡張用に使用。 |
| [Vercel AI SDK UI](https://ai-sdk.dev/docs/ai-sdk-ui/generative-user-interfaces) | アプリSDKとチャット状態 | カスタムアプリチャット、ツール呼び出し、ストリーミングメッセージ | ツール結果をReactコンポーネントとしてレンダリング | はい；`useChat`とUIメッセージストリームを通じて | 既存のアプリを所有しローレベル制御が必要な場合に優れたベースライン。[AI Elements](https://elements.ai-sdk.dev/)と組み合わせてUIプリミティブを使用。 |
| [assistant-ui](https://github.com/assistant-ui/assistant-ui) | Reactチャットプリミティブ | カスタムレンダリングによるプロダクションチャットUX | 組み立て可能なチャットプリミティブ、ツール呼び出しレンダリング、JSONをコンポーネントに | はい | ポリッシュされたチャットエログノミクスが必要でバックエンドは自前で構築したい場合に強力。 |
| [LangGraph Generative UI](https://docs.langchain.com/langgraph-platform/generative-ui-react) | エージェントプラットフォーム統合 | グラフコードとUIコンポーネントのコロケーション | グラフが名前付きUIメッセージをReactコンポーネントでレンダリング | はい、カスタムストリームイベントを含む | LangGraph展開とグラフ所有のUIコンポーネントに自然なフィット。 |
| [Hashbrown](https://github.com/liveloveapp/hashbrown) | フロントエンドGenUIフレームワーク | コンポーネントとクライアントサイドツールを公開するReact/Angularアプリ | LLMが許可されたアプリコンポーネントを選択してレンダリング | ストリーミングパターンをサポート | チャットだけでなく製品表面に知能を直接埋め込む場合に適しています。 |
| [OpenUI](https://github.com/thesysdev/openui) | コンパクトUI言語とランタイム | JSONよりもトークン数が少ないストリーミングモデル生成UI | OpenUI言語とReactランタイム、コンポーネントライブラリ | トークンストリーミング向けに設計 | JSONの冗長性がボトルネックになる場合に興味深い選択肢。まだ若く、注目する価値があります。 |
| [Tambo](https://github.com/tambo-ai/tambo) | React生成UI SDK | コンポーネント選択、状態付きコンポーネント、クライアントサイドツール実行 | AIがコンポーネントを選択しクライアントツールと対話 | 状態志向 | 自動コンポーネントオーケストレーションに焦点を当てた人気のOSS Reactオプション。 |
| [llm-ui](https://llm-ui.com/) | 出力レンダラ | カスタムインラインコンポーネントによるスムーズなLLMテキスト出力 | モデル出力文字列をReactレンダリングに解析 | トークンレンダリングがスムーズ | テキストストリーム内に軽量カスタムコンポーネントを追加する場合に有用。フルエージェントUIプロトコルではありません。 |
| AI SDK RSC / React Server Components | 古いパターン/フレームワーク機能 | Next.jsでのサーバーレンダリングコンポーネントストリーム | モデル/ツールフローがサーバーレンダリングUIを返す | はい、ただしフレームワーク固有 | 2024年10月に開発が一時停止 ([Discussion #3251](https://github.com/vercel/ai/discussions/3251))；推奨されません。`useObject`またはjson-renderに移行してください。 |

## どの製品にどのツールを使用するか

これは実際にチームで使用する推奨マトリクスです。

**既存のSaaSアプリにアシスタントを追加しています。**

ツールからコンポーネントへのレンダリングから始めましょう。必要に応じて[assistant-ui](https://github.com/assistant-ui/assistant-ui)、[Vercel AI SDK UI](https://ai-sdk.dev/docs/ai-sdk-ui/generative-user-interfaces)、または[CopilotKit](https://github.com/CopilotKit/CopilotKit)を使用してください。カタログは最初は最小限に保ち、すでに信頼できるアプリコンポーネントをレンダリングします。

**共有状態が必要な真のインアプリコパイロットを構築しています。**

CopilotKitとAG-UIを組み合わせて検討してください。重要な機能は「チャット」ではなく、共有状態と双方向インタラクションです。エージェントは入力の要求、UIのレンダリング、状態の更新、承認のための一時停止が可能です。

**リモートエージェントが境界を越えてUIを送信する必要があります。**

A2UIまたはA2UIに類似した宣言型プロトコルを使用してください。目的は、リモートエージェントがUIをデータとして記述できる一方で、ホストがネイティブレンダリング、セキュリティ、スタイルの制御を維持することです。ライブエージェント/アプリのインタラクションが必要な場合は、AG-UIまたは環境が標準化するトランスポートで実行してください。

**ChatGPTやMCP互換ホスト内で構築しています。**

MCP AppsとApps SDKのパスを使用してください。OpenAIの現在のドキュメントでは、新規作業にはMCP Appsの`ui/*`ブリッジを推奨し、`window.openai`を互換性レイヤーおよびオプショナルな拡張表面として維持しています。また、データツールとレンダリングツールの分離も模倣してください。モデルがウィジェットをレンダリングする前に、まずデータを取得して論理的に処理させることを許可してください。

**独自のアプリでナチュラルランゲージのダッシュボード、レポート、またはフォームが必要です。**

json-render、Hashbrown、またはOpenUIを試してください。重要なのはコンポーネントのカタログです。`LineChart`、`DataTable`、`MetricGroup`、`FilterControl`、`InsightCallout`などのコンポーネントを公開すれば、モデルは任意のコードに近づかなくても有用なレポートインターフェースを構築できます。

**教育用、視覚的、またはカスタム性の高いアーティファクトが必要です。**

OpenGenerativeUIなどのオープンエンドなサンドボックスを使用してください。モデルにSVG、Canvas、WebGL、または独立したHTMLを生成させても、出力を信頼できないユーザー内容として扱います。サンドボックス化し、サイズを制限し、権限を削除し、特権アプリケーション状態から隔離してください。

**主に、インライン操作を含む見栄えの良いストリーミングマークダウンが必要です。**

過剰設計を避けましょう。llm-uiやassistant-uiツールのレンダリング機能で十分な場合もあります。

## 避けたい典型的な間違い

**ミス1: モデルに実行時に本番用Reactコードを生成させる**  

例外もありますが、製品UIでは通常これが悪いデフォルトです。実行時コード生成はセキュリティが難しい、テストが難しい、テーマ適用が難しい、アクセシビリティを保つのが難しいです。モデルが信頼されたコンポーネントから選べばタスクを完了できるなら、それを行いましょう。  

**ミス2: 設計プリミティブを製品プリミティブに置き換えない**  

モデルに`Row`、`Column`、`Text`、`Button`を提供すると、設計システムとして機能するよう求めることになります。その結果は平凡になります。より高レベルな製品名詞を与えるべきです。  

**ミス3: 有効なJSONが安全なUIを意味すると思い込む**  

ペイロードがスキーマ検証を通過していても、依然として操作的または危険な場合があります。ラベルに「請求書を表示」が表示されても、実際のアクションがアカウントをアーカイブするかもしれません。UI仕様は装飾ではなく行動として扱いましょう。重大なアクションにはポリシー検査、意味検証、そして人間による確認が必要です。

**ミス4: レンダリングツールにビジネスロジックを組み込む**  

レンダリングツールは表示専用でなければなりません。データツールは取得、計算、変更、検証を行うべきです。OpenAIのApps SDKドキュメントがこの分離を強調しているのは理由があります。すべてのデータツールがウィジェットを引き摺ってくると、モデルは提示する前に推論する余地を失ってしまいます。  

**ミス5: 新規性を最適化してタスク完了を無視する**  

目的は、すべての答えが雪だるまのようにユニークなインターフェースになることではありません。摩擦を減らすことです。ユーザーが4分も節約できる安定した、地味な承認パネルは、2度と信頼できない華やかな生成ダッシュボードよりもずっと価値があります。  

## 実用的なアーキテクチャ  

今日新しい製品を始めるなら、段階的アプローチを採用します。

1. **制御されたツールUIを最初に実装する。** 既知のツールを既知のコンポーネントにマッピングする。すべてのツール呼び出し、UIレンダリング、ユーザー行動をログする。  
2. **ドメインカタログを追加する。** パターンが繰り返し始めたら、`ComparisonTable`、`DecisionPanel`、`DataCollectionForm`、`Timeline`、その他の製品固有コンポーネントを公開する。  
3. **必要に応じてのみトランスポート標準化を追加する。** フロントエンドとバックエンドの両方を所有しているなら、単純なストリーミングで十分かもしれない。複数のエージェントフレームワークがあるならAG-UIを使用する。ツールが製品境界を越えるならMCPを使用する。エージェントが組織境界を越えるなら、A2AとA2UIの動向を注視する。  
4. **iframeウィジェットを使用して外部または複雑なインターフェースを区切る。** 地図、カート、予約フロー、サードパーティのミニアプリは境界の後ろに配置されるべきだ。  
5. **オープンエンドの生成はアーティファクトに限定する。** 図表、シミュレーション、一時的な説明、視覚的スクラッチパッドは最適な適用例だ。コアワークフローには不向きだ。  

アーキテクチャは最終的にこう見える：  

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

このループこそが真の製品だ。チャットボックスは単なる入力デバイスの一つに過ぎない。  

## 評価にはUIを含めるべきだ  

LLMチームは徐々にプロンプトとモデル出力の評価を学び始めている。ジェネレーティブUIはもう一つの評価対象を追加する：インターフェースそのものが誤りである可能性がある。  

最低限、生成されたUIのすべてについて以下のアーティファクトを保存する：

- プロンプトとツールコンテキスト  
- ツール呼び出しとツール結果  
- 生成されたUI仕様またはコンポーネント選択  
- レンダリングされたコンポーネント名とプロパティ  
- ユーザーに表示されるラベル  
- ボタン/フォームに付随するアクション  
- UIからモデルに見える状態更新  
- ユーザーアクション履歴  

その後、以下のようなチェックを実施する：  

- 破壊的アクションには必ず確認コンポーネントが必要  
- ボタンラベルはアクションのセマンティクスと一致しなければならない  
- レンダリング仕様は許可されたコンポーネントのみを参照できる  
- ユーザーに見える合計値はツール結果の合計値と一致しなければならない  
- フォームはタスクスコープ外のフィールドを要求してはならない  
- ウィジェットはモデルのみが必要なシークレットを受け取ってはならない  
- 非表示メタデータは表示ラベルと矛盾してはならない  

これは面倒に感じるかもしれない。しかし、これが本番環境での信頼性を構築する場所でもある。  

## 開始すべきリンク  

記事からコードに移行したい場合、以下のリンクが最良の出発点となる：

- [AG-UI リポジトリ](https://github.com/ag-ui-protocol/ag-ui) および [AG-UI ドキュメント](https://docs.ag-ui.com/introduction) はランタイムイベントモデルを参照してください。  
- [A2UI リポジトリ](https://github.com/google/A2UI) および [A2UI 仕様](https://a2ui.org/specification/v0.9-a2ui/) は宣言型エージェント-UIペイロードを参照してください。  
- [json-render リポジトリ](https://github.com/vercel-labs/json-render) および [json-render ドキュメント](https://json-render.dev/) はカタログ駆動型のJSON UI生成を参照してください。  
- [CopilotKit リポジトリ](https://github.com/CopilotKit/CopilotKit) および [generative-ui サンプル](https://github.com/CopilotKit/generative-ui) はAG-UI、A2UI、Open-JSON-UI、MCP Appsパターンを参照してください。  
- [OpenGenerativeUI](https://github.com/CopilotKit/OpenGenerativeUI) はサンドボックス化されたHTML/SVG/Canvas視覚アーティファクトを参照してください。  
- [MCP-UI / MCP Apps SDK](https://github.com/MCP-UI-Org/mcp-ui) はMCP経由のUIリソースを参照してください。  
- [OpenAI Apps SDK ドキュメント](https://developers.openai.com/apps-sdk) および [Apps SDK サンプル](https://github.com/openai/openai-apps-sdk-examples) はChatGPTアプリウィジェットを参照してください。  
- [Vercel AI SDK generative UIガイド](https://ai-sdk.dev/docs/ai-sdk-ui/generative-user-interfaces) および [AI Elements](https://elements.ai-sdk.dev/) はアプリ所有のチャット/ツールレンダリングを参照してください。  
- [assistant-ui](https://github.com/assistant-ui/assistant-ui) は組み合わせ可能なReactチャットプリミティブを参照してください。  
- [LangGraph generative UIドキュメント](https://docs.langchain.com/langgraph-platform/generative-ui-react) はグラフ生成UIコンポーネントを参照してください。  
- [Hashbrown](https://github.com/liveloveapp/hashbrown) はReact/Angularコンポーネント選択とクライアントサイドツールを参照してください。  
- [OpenUI](https://github.com/thesysdev/openui) はコンパクトでストリーミング最優先のモデル生成UIを参照してください。  
- [Tambo](https://github.com/tambo-ai/tambo) は状態保持コンポーネント付きのReact生成UIを参照してください。  
- [llm-ui](https://llm-ui.com/) はカスタムインラインコンポーネントでなめらかなテキストストリームを参照してください。  

## プロジェクトの安定性に関する注意  

この分野の主要なプロトコルはすべて1.0リリース前です。最終確認日：2026年5月8日。プラットフォーム選定前に最新のドキュメントを確認し、変更を予測してください。  

**Vercel AI SDK RSC** — 元の「Generative UI」ヘッドライン機能 — は2024年10月にアーキテクチャ的制約により開発が一時停止されました（[ディスカッション #3251](https://github.com/vercel/ai/discussions/3251)）。**json-render**（Vercel Labs）が代替として登場しました：カタログベース、フレームワーク非依存、RSCとの結合なし。2026年初頭のリリース以降、ウェブ開発者の関心を急速に獲得しています。その理由はDXです：json-renderは標準Reactプロジェクトで即座に動作しますが、A2UIのクロスプラットフォームスコープはセットアップの摩擦を生みます。  

**A2UI**（Google）は1.0未満で、マイナーバージョン間で破壊的変更があり、ロードマップのコミュニケーションも不連続です。その利点は真のクロスプラットフォーム対応（ウェブ、Flutter、SwiftUI）であり、json-renderはこれに対応していません。現在の純粋ウェブユースケースではjson-renderのツールカバレッジが優れており、クロスプラットフォームまたはリモートエージェントシナリオではA2UIの設計が適しています。仕様の統合は可能で、Vercelはjson-renderからA2UI互換出力の実験を行っています。  

**AG-UI**（CopilotKit）も1.0未満です。最も一般的な混乱は名前です：AG-UIはUIフレームワークではなく、トランスポートプロトコルです。エージェントとフロントエンド間のイベントフローを定義しますが、レンダリング内容は依然としてあなたの責任です。概念は堅実で広く採用されていますが、仕様はまだ進化中です。

## 私の見解

Generative UIは、慎重に設計された製品インターフェースを置き換えることはない。置き換えるのは、チャットの転記がAIの普遍的なインターフェースであるという怠惰な仮定である。

最高のシステムはモデルにフリースタイルで何でも行わせない。製品ネイティブな構成要素の小さな鋭いセット、信頼性の高いランタイム接続、明確なセキュリティ境界、そしてタスクにインターフェースを適応させるための十分な自由を提供する。

未来は「モデルがあなたのフロントエンドを書く」ことではない。

未来はもっとこうに近い：**あなたのフロントエンドはエージェントが演奏できる楽器になるが、その楽器が発する音をどう決めるかは依然としてあなた次第である。**
````
