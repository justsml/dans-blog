# Translation Candidate
- Slug: honest-priorities
- Locale: ja
- Model: openrouter/qwen/qwen3-32b:nitro
- Target: src/content/posts/2024-10-23--honest-priorities/ja/index.mdx
- Validation: deferred
- Runtime seconds: 16.42
- Input tokens: 7550
- Output tokens: 6216
- Thinking tokens: unknown
- Cached input tokens: 1536
- Cache write tokens: 0
- Estimated cost: $0.002096
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
social_image: ../desktop-social.webp
title: ''
subTitle: ''
category: Thoughts
subCategory: Agile
date: '2024-10-23'
modified: '2024-10-24'
tags:
  - agile
  - leadership
  - priority
  - backlog
  - jira
cover: ../new-priority-city.webp
cover_full_width: ../new-priority-city.webp
cover_mobile: ../new-priority-city-w300.webp
cover_icon: ../new-priority-city-w200.webp
cover_credit: >-
  Photo by <a
  href="https://unsplash.com/@mroz?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Filip
  Mroz</a> on <a
  href="https://unsplash.com/photos/photo-of-tram-beside-waiting-station-during-nighttime-023T4jyCRqA?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Unsplash</a>
---
## `Priority`ドロップダウンの罠

<aside className="breakout">
💡 オーガニゼーションが成長すると、やがてバックログが膨れ上がります。リストのサイズが大きくなると、やがて優先順位付けが必要になります。
</aside>

## スタートアップの物語

間違いなく、あなたのJira管理者たちは解決策を持っています：`Priority`フィールドのドロップダウンをご覧ください！（企業開発者向けのプロヒント：`Priority2`や`P-level`と名付けられているかもしれません）

奇妙にも、100%の企業が`P1, P2, P3, P4`または`Low, Med, High, and Critical`のどちらかを選択します——なぜか他に選択肢が存在しないようです。

4つのオプションがハードコードされたリスト？構いません。数週間試してみましょう...

### 2日後

誰にも驚きのない展開として、組織は新しい、より高い優先度のチケットを発見し、小手先のハックを導入せざるを得なくなりました：`P0`、または`Critical Max+`を追加する！

### さらに3日後

*意気揚々とした上司が会議や発見で一杯だった！*

何とかして`P0`よりもさらに高い優先度を発見してしまった！

それ以来、チームはこの新しい優先度にどのようにラベルを付けるかを研究するために全力を尽くしています。

-1 はどうだ？ いや、いや。これはあまりにわかりにくい（`P-1` と `P1` との混同）。では `P0.5` なら？

<p className="breakout">インスピレーションに駆られた瞬間に、チームはさらに高い優先度としてダブルゼロを考案しました。<br />これ以降、`P00` 優先度と呼ばれるようになりました。</p>

{/* やっと、世界中のすべての物事を優先度ドロップダウンにすっきりとラベル付けできるようになった！（…悪の笑い…） */}

### 洪水前

誰も気づく暇がない間に、あなたのチームはなぜか `P00` チケットに溢れています！

<b>この馬鹿げたエンジニアリング・シアターのゲームからどのように抜け出せばよいのか？</b>

## 優先度が複数選択式でない場合

`Priority`という、常に変化する流動的な人間の概念をどのようにより正確に表現できるだろうか？

- 実世界では、新しい情報、市場の変化、組織の目標に基づいて、優先順位は常に変化し続ける。
- 緊急性、重要性、リソースの可用性、コスト/リスク分析の複雑な相互作用を、単純なドロップダウンでは特に時間の経過とともに捉えきれないことが多い。（チケットの腐敗。）
- 異なるステークホルダーは、高優先度とは何かについてしばしば矛盾した見解を持つため、万能なアプローチは不適切である。

## では、次に何をすべきか？

低コストから高コストまで、いくつかの代替案が検討に値する：

- より多くの余地と自由度を得るために、「中立的な」初期値を設定する。例えば100や1,000など。必要に応じて数値を増減できる。
    - あるいはゼロから始めて、数値が高くなるほど優先度が高くなる方式も選択可能。
- 事業価値、緊急性、必要な労力などの要素を考慮した多次元の優先順位付けシステムを実装する。（並び替えやフィルタリングを容易にするために`複合`スコアを生成する。）
- [MoSCoW技法](https://en.wikipedia.org/wiki/MoSCoW_method)（Must have, Should have, Could have, Won't have）などの動的優先順位付け方法を採用し、定期的な再評価を可能にする。（参考：[Kanoモデル](https://en.wikipedia.org/wiki/Kano_model)）

## 要約

Priority（優先度）に過度な依存を強いられるにもかかわらず、その価値は急速に劣化する。昨日の`CRITICAL`チケットが次の四半期でも`CRITICAL`チケットであるとは限らない。

時間が経つにつれ、古い高優先度のチケットはクリーンアップやメンテナンスに抵抗を示すようになる。いったい誰が、一度「***不可欠***」と宣言されたタスクのPriorityを下げる気があるだろうか？ ましてや、関係性のないチケットを削除するなんて…。（ガスプ！ バックログを想像してみましょう…）

複数の企業で`Severity`（緊急性）と`Priority`（優先度）を混同しているのを見たことがある。`Severity`は***緊急性***（時間依存性）を表す。

`Priority ≠ Severity`。3〜5段階のSeverityレベルを定義するのは理にかなっている（サービスレベル契約（SLA）の維持に用いられることが多い）。

緊急性のレベルは、「顧客への影響ゼロ」から「サービスの部分的/完全停止」まで、明確に伝える役割がある。

## 注意喚起  

無限に拡張可能なPriorityフィールドを導入するには、多少の計画と自制が必要です！  

フロントエンド開発に慣れている方は、`z-index`の戦争を経験したことがあるかもしれません。  

本質的に`z-index`は、デザイナーが*任意の*正の整数を設定して、自分のウィジェットが他の`z-index`が低いコンテンツの「上に表示される」ことを保証する仕組みです。  

たとえ小さなコンポーネントのアップデートでも、`<Dialog />`の`z-index`に変更を加えることで、突然表示されなくなることがあります。このような状況は、サードパーティのコンポーネントや機能開発、チームの貢献が互いに`z-index`を競い合おうとする中で、非常に混乱を招くことになります。  

かつて`z-index`は約32,000までしか許容されていませんでした。しかし最近、`z-index: 1000000000`という10億というスニペットを見かけました！

`z-index`にインフレが激しく襲いかかっているようだ。  

## 議論する  

- これは価値のある思考実験だろうか？  
- 限りなく増加する優先度のアイデアは恐ろしいか？不安を引き起こすか？  
- このアプローチが最終的に64ビット整数の制限を超えるのは避けられないだろうか？  
- `Severity`や`Urgency`以外のフィールドはこの議論に貢献できるだろうか？  
- Jiraにどれだけの責任があるだろうか？あるいは功績があるだろうか？  

インターネットに叫びたい気持ちも理解できる。「誰がこれらの`P00`チケットを片付けるんだ？」と。  

だが、バックログを***真剣に***向き合うべきだ。  

- 1000件のチケットのうち90%は決して完了しないことを受け入れよう。構わない。  
- 数か月間触れていないチケットをアーカイブしよう。初期の優先度や緊急性はもう適用されない。アーカイブされた課題は多くの場合復元できる。  
- 課題が再び現れたら、それは良いことだ。単に優先度が上がっただけだ。  
- 私の経験上、古い未完了のチケットを破棄しても何の害もなかった。  
- バックログをデータベースのように無限に追加し続けることは、チームや組織が本当に重要なものに集中する機会を失わせる。（未来に向かって進むべきものと、バックログは必然的に過去を振り返る。）  
- 深いバックログは「バジラーロトリー室」のようになり、決してリリースしないものを称えることになる。
````
