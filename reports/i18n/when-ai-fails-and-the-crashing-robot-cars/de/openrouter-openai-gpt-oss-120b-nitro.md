# Translation Candidate
- Slug: when-ai-fails-and-the-crashing-robot-cars
- Locale: de
- Model: openrouter/openai/gpt-oss-120b:nitro
- Target: src/content/posts/2015-12-18--when-ai-fails-and-the-crashing-robot-cars/de/index.mdx
- Validation: passed
- Runtime seconds: 3.15
- Input tokens: 3115
- Output tokens: 951
- Thinking tokens: unknown
- Cached input tokens: 768
- Cache write tokens: 0
- Estimated cost: $0.000293
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
social_image: ../desktop-social.webp
title: WennKI versagt und die abstürzenden Roboterautos
subTitle: >-
  Googles selbstfahrende Autos verursachen doppelt so viele Unfälle wie
  menschliche Fahrer.
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
## Robotic Cars: More or Less Crashes?

Googles selbstfahrende Autos sind offenbar in doppelt so vielen Unfällen verwickelt wie von Menschen gesteuerte Fahrzeuge – wenn Sie denken, das sei nur fehlerhafte neue Technik, zu komplex von Anfang an – nun, Sie liegen zum Teil richtig. [Ein wichtiger Hinweis, den ich teilen sollte: Stand Dezember 2015 waren praktisch **alle Unfälle nicht die Schuld der Roboter.**](http://www.bloomberg.com/news/articles/2015-12-18/humans-are-slamming-into-driverless-cars-and-exposing-a-key-flaw)

Die Unfälle werden **von menschlichen Fahrern** verursacht, die mit robotischen Fahrern nicht vertraut sind. Darüber hinaus hat Google die Autos so programmiert, dass sie das Gesetz in absoluten Begriffen befolgen – niemals zu schnell fahren, Schwierigkeiten beim Einfädeln im dichten oder schnellen Autobahnverkehr.  
Das wirft eine Reihe rechtlicher und ethischer Fragen auf (bekannt als [the trolley problem](https://en.wikipedia.org/wiki/Trolley_problem)) –

- Ist es jemals in Ordnung:
  - einen Auffahrunfall zu vermeiden, wenn das bedeutet, an einer roten Ampel die Fußgängerzone zu überfahren **unter der Annahme, dass der Weg frei ist**?
  - auf dem Bürgersteig zu fahren, um einem Fahrrad auszuweichen, das die Fahrspur kreuzt? – ist es für KI akzeptabel, diese „Regeln der Straße“ zu verletzen?

Ich verstehe Googles Ansatz, besonders wenn es darum geht, die Haftung zu minimieren: immer den Regeln folgen – logisch folgt daraus, dass man nicht wirklich schuld sein kann, wenn man **immer** das Gesetz beachtet.

Es gäbe **massive Haftungsrisiken**, wenn ein Unfall wegen bewusst eingebauter „Flexibilität“ gegenüber den Gesetzen passieren würde.

### Lass die Zukunft nicht entgleiten

Die Zukunft wird trotzdem kommen, selbst wenn die Roboter wie Achtzigjährige fahren.

Vielleicht wäre eine einfache Zwischenlösung, für den Moment helle, rot blinkende LEDs (wie bei Schulbussen) zu verwenden, um menschliche Fahrer zu warnen, dass sie kurz davor stehen, einen unschuldigen Roboter von hinten zu treffen.

Ich wäre eher geneigt, ein Fahrzeug zu akzeptieren, das verschiedene Stufen der Beobachtung und Regelbefolgung kennt. Das kommt meiner Meinung nach dem menschlichen Fahrverhalten deutlich näher.

Stellen Sie sich ein 3‑stufiges System‑Perzeptionsmodell vor (Entscheidungs‑ und weitere Schichten aus Gründen der Übersicht weggelassen):

1.  Basis: folgt den Gesetzen mit nerviger Präzision  
2.  Lokal: flexible Anpassungen basierend auf dem aktuellen Verkehr – zum Beispiel das Einfädeln auf der Autobahn, wenn 10 MPH + nötig sind. Umgekehrt, wenn der Verkehr zu schnell ist, sollte das Auto intelligent genug sein, um zur Seite zu fahren und anderen Fahrern nicht zur Last zu fallen.  
3.  360: Berechnet jegliches potenzielle extreme Kollisionsrisiko bzw. Ausweichmaßnahmen – etwa das Fahren auf dem Seitenstreifen oder …

Dies würde wahrscheinlich einen geschickten Balanceakt erfordern – zum Beispiel erkennt Stufe 1 einen unmittelbar bevorstehenden Unfall, der sich nicht vermeiden lässt, wenn man strikt den Gesetzen folgt; dann würde sie sämtliche Prozessorleistung auf Stufe 3 umschalten – in der Hoffnung, einen kreativen Weg zu finden, Schaden zu verhindern.

Roboterautos stehen kurz davor, technisch intelligenter und schneller zu sein als jeder menschliche Fahrer. Akzeptieren Sie das. Begrüßen Sie es.

### References

1.  [http://nn.cs.utexas.edu/pages/research/neat-warning/](http://nn.cs.utexas.edu/pages/research/neat-warning/)
````
