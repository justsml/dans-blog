# Translation Candidate
- Slug: when-ai-fails-and-the-crashing-robot-cars
- Locale: ja
- Model: openrouter/openai/gpt-oss-120b:nitro
- Target: src/content/posts/2015-12-18--when-ai-fails-and-the-crashing-robot-cars/ja/index.mdx
- Validation: passed
- Runtime seconds: 4.40
- Input tokens: 3570
- Output tokens: 1163
- Thinking tokens: unknown
- Cached input tokens: 1664
- Cache write tokens: 0
- Estimated cost: $0.000349
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
social_image: ../desktop-social.webp
title: AIが失敗したときと衝突するロボット車
subTitle: Google の自動運転車は人間ドライバーの 2 倍の事故率です。
date: '2015-12-18'
modified: '2024-07-30'
category: AI
subCategory: machine-learning
tags:
  - artificial-intelligence
  - ai
  - self-driving-cars
  - fails
cover: ../sandy-millar-749381-unsplash.webp
cover_mobile: ../w300_sandy-millar-749381-unsplash.webp
cover_icon: ../icon_sandy-millar-749381-unsplash.webp
---
## ロボティックカー：事故は増えるのか、減るのか？

Google の自動運転車は、人間ドライバーに比べて事故率が約 2 倍に上っているようだ――これが単なるバグだと考えるのは、最初からやりすぎだ――まあ、部分的には正しい。**重要な点を付け加えると、2015 年 12 月時点で実質 **すべての事故はロボット側の過失ではなかった** ことが判明している。**[Bloomberg 記事](http://www.bloomberg.com/news/articles/2015-12-18/humans-are-slamming-into-driverless-cars-and-exposing-a-key-flaw)

事故の **原因はロボットドライバーに慣れていない人間ドライバー** にある。さらに、Google は車両に「法律を絶対に守る」ようプログラムしている――速度超過は一切しないし、混雑した高速道路での合流が苦手だ。これが一連の法的・倫理的問題を呼び起こす（これは **[トロッコ問題](https://en.wikipedia.org/wiki/Trolley_problem)** と呼ばれる）—

- 次の場合は許容できるか：
  - 赤信号で歩道が空いていると **仮定** した上で、追突事故を回避するために通過することは？
  - 自転車が車線を横切ってくるのを避けるために歩道を走行することは？――AI が道路規則の「破り」を受け入れるべきか？

Google の姿勢は理解できる。特に責任を最小化しようとする際には「常に規則に従う」ことが合理的で、**常に** 法律を守っていれば過失が生じにくいという論理が成り立つ。

もし法律周辺に意図的に「柔軟性」を組み込んだ結果、事故が起きた場合の **巨額の賠償責任** は避けられないだろう。

### 未来を逃させるな

ロボットが八十代の老人のように運転しても、未来はやってくる。

当面の簡易的な対策としては、明るい赤色の点滅LED（スクールバスを思い浮かべて）を装着し、人間ドライバーに「無実のロボットに追突しようとしている」ことを警告するのが考えられる。

私は、遵守レベルとルール遵守度に階層を持つ車の方が、人的運転にずっと近いと感じる。

以下のような3層のシステム認識を想定する（意思決定層などは簡略化）:

1.  基本層: 法律を極めて正確に遵守する  
2.  ローカル層: 現在の交通状況に応じた柔軟な調整を行う ― たとえば高速道路で合流が必要で10 mph以上の加速が求められる場合など。逆に交通が過度に速い場合は、他のドライバーの迷惑にならないように路肩へ退避できる程度の知能を持たせる。  
3.  360層: すべての潜在的な極端な衝突リスク／回避策を算出する ― 肩部走行や…

このような実装は、スマートなバランス調整が必要になるだろう。たとえば、層 1 が法律に従っては回避できない差し迫った事故を検知した場合、すべてのプロセッサ資源を層 3 にシフトし、創造的な回避策を見出すことを期待する。

ロボット車は、技術的に人間のドライバーを上回る知能と速度を持ちつつある。受け入れろ。歓迎しろ。

### References

1.  [http://nn.cs.utexas.edu/pages/research/neat-warning/](http://nn.cs.utexas.edu/pages/research/neat-warning/)
````
