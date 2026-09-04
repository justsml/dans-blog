# Translation Candidate
- Slug: mastra-mcp-tool-integrations
- Locale: ja
- Model: openrouter/deepseek/deepseek-v4-flash
- Target: src/content/posts/2026-01-04--mastra-mcp-tool-integrations/ja/index.mdx
- Validation: deferred
- Runtime seconds: 62.27
- Input tokens: 6591
- Output tokens: 7521
- Thinking tokens: unknown
- Cached input tokens: 3072
- Cache write tokens: 0
- Estimated cost: $0.002607
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
title: これなしではAIエージェントは無価値
subTitle: MCPがAIのUSB-Cである理由
modified: '2026-09-04'
tags:
  - ai
  - mcp
  - tools
  - integrations
  - mastra
  - salesforce
  - apis
category: AI
subCategory: Integration
social_image: ../desktop-social.webp
cover_full_width: ../wide.webp
cover_mobile: ../square.webp
cover_icon: ../square.webp
---
あなたはAIエージェントを構築した。おそらくそれは良いものだ。プロンプトは緻密で、モデルは速く、レスポンスは自然だ。

しかし、誰かがそれにSalesforceで顧客レコードを確認させたり、最新のJiraチケットを取得させたり、社内ドキュメントを検索させたりする。

そしてあなたの美しいエージェントは、ただ…できない。

これこそが、すべてのAIプラットフォームが直面する統合問題だ。エージェントには手が必要だ。実際のビジネスシステムに目を向ける必要がある。それがなければ、あなたは高価なチャットボットを動かしているに過ぎない。

従来の解決策？ 接続したいサービスごとにカスタムAPIラッパーを書くことだ。ドキュメントを読み、認証を処理し、レート制限に対応し、来月エンドポイントが変わらないことを祈る。そしてまた次のサービスでも同じことを繰り返す。そのまた次も。

Model Context Protocolはこの計算を完全に変える。

---

## MCPが実際に解決するもの

USB-C以前のUSBを考えてみてほしい。Mini-USB、Micro-USB、Apple独自コネクタ、そして特定のデバイスでしか使えないケーブルが詰まった引き出しがあった。USB-Cは単に新しいコネクタを追加しただけではない—あらゆるケーブルがあらゆるデバイスで使えるという標準を確立したのだ。

MCPはAIツール統合において同じことをしている。

エージェントをSalesforce、HubSpot、GitHub、その他のサービスに接続するためのカスタムコードを書く代わりに、プロトコルを一度実装する（または事前構築されたサーバーをダウンロードする）だけで、MCP互換のエージェントは即座にそれと通信できる。

プロトコルが通信層を処理する。ツールが何を行うか、どのデータが必要かを定義するだけでよい。

---

## 複数の統合のセットアップ

Mastraは[`MCPClient`](https://mastra.ai/docs/mcp/overview)を通じてネイティブのMCPサポートを提供している。ローカルツール（子プロセスとして実行）とリモートサービス（独自のインフラ上で実行）の両方を接続できる。

以下は、地図、天気、ローカルのWikipedia検索を接続する代表的なセットアップである。

```typescript
// src/mastra/mcp/index.ts
import { MCPClient } from '@mastra/mcp';

export const mcpClient = new MCPClient({
  id: 'navigation-mcp',
  servers: {
    // Local tool (Stdio)
    wikipedia: {
      command: 'npx',
      args: ['-y', 'wikipedia-mcp'],
    },
    // Maps & Navigation (Remote/HTTP)
    googleMaps: {
      url: new URL(process.env.GOOGLE_MAPS_MCP_URL!),
      requestInit: {
        headers: {
          Authorization: `Bearer ${process.env.GOOGLE_MAPS_API_KEY}`,
        },
      },
    },
    // Weather Service Integration
    weather: {
      url: new URL(process.env.WEATHER_MCP_URL!),
      requestInit: {
        headers: {
          'X-API-Key': process.env.WEATHER_API_KEY!,
        },
      },
    },
  },
});
```

クライアントは接続ライフサイクルを管理し、ローカルツールのプロセス生成を処理し、リモートサーバーのHTTP接続を維持する。ソケットやstdioに直接触れる必要はない。

---

## エージェントへのツール接続

MCPクライアントを構成したら、そのツールをエージェントに渡すのは単純です：

```typescript
// src/mastra/agents/navigation-agent.ts
import { Agent } from '@mastra/core/agent';
import { mcpClient } from '../mcp';

export const navigationDirectionsAgent = new Agent({
  id: 'navigation-directions-agent',
  name: 'Navigation & Directions Assistant',
  instructions: `You are a helpful navigation assistant that provides route planning and travel advice.
    - Always confirm the start and destination locations
    - Use Google Maps tools to find optimal routes
    - Check weather conditions along the route
    - Provide estimated travel times and suggest alternatives if weather is poor
    - Include relevant details like traffic, road conditions, and points of interest
    - Keep responses clear and actionable`,
  model: 'openai/gpt-5.5',
  tools: await mcpClient.listTools(), // <--- これが魔法の一行
});
```

ユーザーが「サンフランシスコからレイクタホまでのベストルートは？ 天気は心配したほうがいい？」と尋ねたら。

エージェントは利用可能なツール定義を読み取り、Google Mapsのルーティングツールと天気予報ツールにアクセスできることを認識し、適切なパラメータでそれらを実行し、最適ルートと沿線の現在の天候状況を回答として返す。

Google Maps APIのコードも、気象サービスの統合コードも、一行も書いていない。

---

## ユーザーごとの認証

ここでありがちなセキュリティ上のミスがある。資格情報をハードコードしてしまうことだ。

環境変数にひとつGoogle Maps APIキーを入れておしまい、にすると、すべてのユーザーが同じクォータとレート制限を共有することになる。さらに深刻なのは、ユーザー設定（保存済みの場所やお気に入りルートなど）を保存するサービスを使っている場合、全員が同じデータを見ることになる。デモであれば問題ない。本番では責任問題になる。

Mastraはこれを、ユーザー固有の資格情報でMCPクライアントを動的に生成し、リクエスト時にそのツールセットを渡すことでサポートする。トークンの安全な保存、リフレッシュ、どのユーザーにどのサービスを接続させるかの判断といった、通常のSaaS基盤は依然として自分で持つ必要がある。

```typescript
async function handleUserRequest(userPrompt: string, userCredentials: UserCreds) {
  // このユーザー専用のクライアントを作成
  const userMcp = new MCPClient({
    id: `maps-${userCredentials.userId}`,
    servers: {
      googleMaps: {
        url: new URL(process.env.GOOGLE_MAPS_MCP_URL!),
        requestInit: {
          headers: {
            // ユーザー固有のAPIキーまたはトークン
            Authorization: `Bearer ${userCredentials.mapsApiKey}`,
            'X-User-ID': userCredentials.userId,
          },
        },
      },
    },
  });

  try {
    const agent = mastra.getAgent('navigationDirectionsAgent');
    
    // 実行時にツールを注入
    const response = await agent.generate(userPrompt, {
      toolsets: await userMcp.listToolsets(),
    });

    return response;
  } finally {
    await userMcp.disconnect();
  }
}
```

各ユーザーは独自のAPIクォータと設定を持った、分離されたツールセットを得る。ユーザーAの保存場所はプライベートに保たれ、ユーザーBのルート履歴は別物として扱われる。これが実際のマルチテナントSaaSエージェントの動かし方だ。

---

## 複合ツールの構築

複数のMCPツールをひとつの操作に結合したい場合もある。例えば、リアルタイムの交通状況と沿線の天候条件の両方を考慮してルートを計画したいとする。

MCPツールをカスタムツール定義でラップできる：

```typescript
import { createTool } from '@mastra/core/tools';
import { z } from 'zod';

type DirectionsResult = {
  waypoints: Array<{ latitude: number; longitude: number }>;
  [key: string]: unknown;
};

type ForecastResult = {
  alerts?: unknown[];
  severe?: boolean;
};

export const smartRouteTool = createTool({
  id: 'smart-route-planner',
  description: 'Plans optimal route considering traffic and weather conditions',
  inputSchema: z.object({
    origin: z.string(),
    destination: z.string(),
  }),
  outputSchema: z.object({
    route: z.record(z.string(), z.unknown()),
    weatherAlerts: z.array(z.unknown()),
    recommendation: z.string(),
  }),
  execute: async ({ origin, destination }, executionContext) => {
    const tools = await mcpClient.listTools();

    // 1. Google Mapsから基本ルートを取得
    const routeData = await tools.googleMaps_getDirections.execute(
      { origin, destination },
      executionContext,
    ) as DirectionsResult;

    // 2. ルート沿線の天気を確認
    const weatherData = await tools.weather_getForecast.execute(
      { coordinates: routeData.waypoints },
      executionContext,
    ) as ForecastResult;

    // 3. 天気警告付きの拡張ルートを返す
    return {
      route: routeData,
      weatherAlerts: weatherData.alerts ?? [],
      recommendation: weatherData.severe
        ? 'Consider delaying trip'
        : 'Safe to travel',
    };
  },
});
```

現状のMastraのツールは、最初に検証済みの入力を受け取り、次に実行コンテキストを受け取る。このコンテキストを発見されたMCPツールに渡すことで、リクエストスコープの状態、トレーシング、キャンセルが保持される。上記の名前や結果型はあくまで例示の契約であり、実際に接続するMCPサーバーがアドバタイズする名前とスキーマを使用すること。

これにより、MCPプロトコルに重たい処理を任せつつ、ツール同士の正確な相互作用を細粒度で制御できる。

## 承認はツール境界で行う

MCPによりツールの接続は容易になる。しかし、すべてのツールを摩擦なく実行できるわけではない。

Mastraの`MCPClient`では、サーバーレベルで承認を要求できる。そのサーバーのすべてのツールに対して、または呼び出しごとに動的に指定可能だ。

```typescript
export const githubMcp = new MCPClient({
  id: 'github-mcp',
  servers: {
    github: {
      url: new URL(process.env.GITHUB_MCP_URL!),
      requireToolApproval: ({ toolName, annotations }) => {
        if (annotations?.readOnlyHint) return false;
        if (toolName.includes('delete_')) return true;
        return annotations?.destructiveHint ?? true;
      },
    },
  },
});
```

その承認は依然としてアプリケーションポリシーとして扱うべきであり、魔法の呪文ではない。MCPツールアノテーションは信頼できるサーバーからの有益なヒントであり、それ自体がセキュリティ境界を構成するものではない。サードパーティサーバーについては、デフォルトを安全に保ち、エージェントが重要なものを変更する前に確認を求めるようにする。

## この先の展望

AIエージェントが通信する必要のあるすべてのサービスに対してカスタムAPIクライアントを書くのは、持続可能ではなかった。スケーラビリティに乏しく、頻繁に壊れ、プラットフォームを特定の実装に縛り付ける。

MCPですべての統合の課題が解決されるわけではない。認証は依然として複雑であり、レート制限も重要だし、すべてのサービスにMCPサーバーがあるわけでもない。しかし、エージェントプラットフォームの構築を大幅に苦痛の少ないものにする基盤を確立する。

外部サービスとの連携が必要なAIシステムを設計しているなら、MCPを理解することはおそらく時間を費やす価値がある。

### 参考資料

- [Mastra MCP Documentation](https://mastra.ai/docs/mcp/overview)
- [MCP Registry](https://registry.modelcontextprotocol.io)
- [Klavis AI (Enterprise MCP)](https://klavis.ai)
- [Mastra GitHub Repository](https://github.com/mastra-ai/mastra)

## シリーズを読む

1. [LLMルーティング](../llm-routing-mastra-ai)
2. [セキュリティとガードレール](../mastra-security-guardrails)
3. **MCP & ツール統合** (本記事)
4. [ワークフローとメモリ](../mastra-workflows-memory)
````
