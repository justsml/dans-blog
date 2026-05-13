# Translation Candidate
- Slug: honest-priorities
- Locale: de
- Model: openrouter/openai/gpt-oss-120b:nitro
- Target: src/content/posts/2024-10-23--honest-priorities/de/index.mdx
- Validation: passed
- Runtime seconds: 6.25
- Input tokens: 7208
- Output tokens: 1828
- Thinking tokens: unknown
- Cached input tokens: 1280
- Cache write tokens: 0
- Estimated cost: $0.000610
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
social_image: ../desktop-social.webp
title: Die Prioritätsfalle
subTitle: Ist Multiple Choice die beste Wahl?
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
## The `Priority` Dropdown Trap

<aside className="breakout">
💡 Wenn eine Organisation wächst, bekommt sie unvermeidlich ein immer größer werdendes Backlog. Irgendwann verlangt die Größe der Liste *Priorisierung*.
</aside>

## A Startup Story

Ohne Ausnahme werden Ihre Jira‑Admins eine Lösung parat haben: ein `Priority`‑Feld‑Dropdown! (Pro‑Tipp für Enterprise‑Entwickler: eventuell heißt es `Priority2` oder `P-level`.)

Komischerweise wählen 100 % der Unternehmen zwischen `P1, P2, P3, P4` oder `Low, Med, High, and Critical` – anscheinend gibt es keine anderen Optionen.

Eine fest kodierte Liste mit vier Einträgen? In Ordnung. Probieren wir das ein paar Wochen…

### 2 Tage später

In einer *für niemanden überraschenden* Wendung stellte die Organisation fest, dass ein Ticket eine neue, höhere Priorität erhalten hatte, was einen kleinen Hack nötig machte: `P0` oder `Critical Max+` hinzuzufügen!

### 3 Tage später

*Unser unerschrockener Chef hatte spannende Meetings & Entdeckungen auf der Konferenz!*

Irgendwie haben sie eine noch höhere Priorität als `P0` entdeckt!

Seitdem arbeitet das Team konzentriert daran, zu bestimmen, wie diese neue Priorität zu benennen ist.

Vielleicht `-1`? Nein, das ist zu verwirrend (`P-1` vs. `P1`). Okay, wie wäre es mit `P0.5`, nein?

<p className="breakout">In einem „inspirierten“ Moment erfand das Team eine höhere Priorität: das Doppel‑Null!<br />Heute bekannt als die `P00`‑Priorität.</p>

{/* *Endlich können wir alles in der Welt sauber in unser Prioritäten‑Dropdown einordnen! (…böses Lachen…)* */}

### Vor der Flut

Bevor es jemand merkt, erstickt Ihr Team bereits in `P00`‑Tickets!

<b>Wie können wir dieses alberne Spiel des Engineering‑Theaters vermeiden?</b>

## Was wäre, wenn Priorität keine Multiple‑Choice‑Auswahl wäre?

Wie könnten wir ein ständig wechselndes, flüssiges menschliches Konzept wie `Priority` besser abbilden?

- In der Praxis verschieben sich Prioritäten kontinuierlich, getrieben von neuen Informationen, Marktveränderungen und Unternehmenszielen.  
- Oft gibt es ein komplexes Zusammenspiel von Dringlichkeit, Wichtigkeit, Ressourcenverfügbarkeit und Kosten‑/Risiko‑Analyse, das ein einfacher Dropdown nicht erfassen kann – besonders über die Zeit hinweg (Ticket‑Verfall).  
- Verschiedene Stakeholder haben häufig widersprüchliche Vorstellungen davon, was eine hohe Priorität ausmacht, sodass ein „One‑Size‑Fits‑All“-Ansatz ungeeignet ist.

## Und jetzt?

Es gibt mehrere alternative Vorgehensweisen, die von geringem bis hohem Aufwand reichen:

- Um mehr Spielraum zu schaffen, wählen Sie einen „neutralen“ Ausgangswert, z. B. 100 oder 1 000. Sie können die Zahl jederzeit erhöhen oder senken.  
    - Oder beginnen Sie bei null, wobei höhere Zahlen eine höhere Priorität bedeuten.  
- Implementieren Sie ein multidimensionales Priorisierungssystem, das Faktoren wie Business‑Value, Dringlichkeit und erforderlichen Aufwand berücksichtigt. (Erzeugen Sie einen `composite`‑Score, um Sortieren und Filtern zu vereinfachen.)  
- Nutzen Sie eine dynamische Priorisierungsmethode, etwa die [MoSCoW‑Technik](https://en.wikipedia.org/wiki/MoSCoW_method) (Must have, Should have, Could have, Won’t have), die regelmäßige Neubewertungen erlaubt. (Siehe auch das [Kano‑Modell](https://en.wikipedia.org/wiki/Kano_model).)

## Zusammenfassung

So viel wird auf die Priorität gesetzt, obwohl sie schnell an Aussagekraft verliert. Gestern noch `CRITICAL`‑Tickets sind kaum noch im nächsten Quartal `CRITICAL`.

Im Laufe der Zeit werden ältere, hochpriorisierte Tickets resistent gegen Aufräumen und Wartung. Wer will schon die `Priority` eines bereits als ***essentiell*** deklarierten Tickets senken? Und das Löschen dieser angeblich irrelevanten Tickets… (Ach du meine Güte! Denken Sie an den Backlog!)

Ich habe bei mehreren Unternehmen die Verwechslung von `Severity` & `Priority` beobachtet. `Severity` beschreibt ***Dringlichkeit*** (oder Zeitkritikalität).

`Priority ≠ Severity`. Es kann sinnvoll sein, 3‑5 Schweregrade zu definieren (häufig zur Einhaltung von Service‑Level‑Agreements).

Die Dringlichkeitsstufen helfen, `keine Kundenauswirkung` von einem `teilweisen/vollständigen Serviceausfall` zu kommunizieren.

## Ein Hinweis zur Vorsicht

Das Einführen eines unbegrenzten Prioritätsfeldes erfordert etwas Planung und Disziplin!

Wenn Sie mit Front‑End‑Entwicklung vertraut sind, haben Sie vielleicht schon einen `z-index`‑Krieg erlebt.

Im Wesentlichen erlaubt `z-index` Designern, **beliebige** positive Ganzzahlen zu setzen, um sicherzustellen, dass ihre Widgets „über“ anderen Inhalten mit niedrigerem `z-index` angezeigt werden.

Schon ein kleiner Komponenten‑Update kann eine Änderung des `z-index` an ihrem `<Dialog />` bewirken – und das Widget plötzlich unsichtbar machen. Solche Situationen können schnell unübersichtlich werden, wenn Drittanbieter‑Komponenten, Feature‑Arbeit und Beiträge anderer Teams versuchen, sich gegenseitig im `z-index` zu übertrumpfen.

Früher war `z-index` auf etwa 32 000 begrenzt. Kürzlich habe ich jedoch ein Snippet gesehen, das einen Milliarden‑`z-index: 1000000000` verwendet!

Inflation muss `z-index` stark treffen.

## Diskussion

- Ist das ein lohnenswertes Gedankenexperiment?
- Ist die Vorstellung einer ständig wachsenden Priorität erschreckend? Angst erzeugend?
- Ist es unvermeidlich, dass dieser Ansatz irgendwann die Grenzen eines 64‑Bit‑Integers überschreitet?
- Können andere Felder (jenseits von `Severity` oder `Urgency`) zu dieser Diskussion beitragen?
- Wie viel Schuld trägt Jira? Oder wie viel Anerkennung?

Wir könnten ins Internet schreien: „Wer wird all diese `P00`‑Tickets säubern?“

Oder Sie werden ***real*** mit Ihrem Backlog.

- Akzeptieren Sie, dass 90 % Ihrer 1.000 Tickets nie erledigt werden. Das ist in Ordnung.
- Archivieren Sie Tickets, die seit Monaten unbeachtet sind. Jede ursprüngliche Priorität/Urgency ist dann nicht mehr relevant. Archivierte Vorgänge lassen sich in der Regel wiederherstellen.
- Wenn ein Issue zurückkommt, ist das okay; es hat einfach seine Priorität erhöht.
- Anhand meiner Erfahrung habe ich keinerlei Schaden durch das Wegwerfen älterer, unvollständiger Tickets festgestellt.
- Das endlose Anhängen an ein Backlog‑als‑Datenbank verpasst die Chance, Ihr Team und Ihre Organisation auf das Wesentliche zu fokussieren. (Dinge, die vor uns liegen. Während Backlogs per Definition nach hinten blicken.)
- Ein tiefes Backlog endet wie ein Bizzaro‑Trophäenraum, der das Zeug feiert, das Sie niemals ausliefern werden.
````
