# Translation Candidate
- Slug: no-fate-but-what-we-bill
- Locale: de
- Model: openrouter/google/gemini-3.5-flash-lite
- Target: src/content/posts/2026-10-14--no-fate-but-what-we-bill/de/index.mdx
- Validation: deferred
- Runtime seconds: 23.87
- Input tokens: 14701
- Output tokens: 3578
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- Estimated cost: $0.013355
- Pricing source: openrouter-2026-09-22
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
title: 'Kein Schicksal außer dem, was wir abrechnen'
subTitle: >-
  KI-Agenten arbeiten länger, Schwärme verzweigen sich breiter, und gestohlene
  Cloud-Keys schicken die Rechnung für das compute ans Opfer.
category: Security
subCategory: AI Agents
tags:
  - ai-agents
  - security
  - threat-model
  - llm
  - agents
  - cloud
  - supply-chain
sourceHash: 17bcd9b90da0
---
„Hör zu und versteh. Dieser Terminator da draußen. Mit ihm kann man nicht verhandeln. Man kann ihn nicht zur Vernunft bringen. Er kennt kein Mitleid, keine Reue und keine Angst. Und er wird absolut nicht aufhören – niemals –, bis du tot bist.“

Kyle Reese, der ein Publikum im Jahr 1984 über die Natur der Bedrohung briefruft.

Der Satz, der gut gealtert ist, ist nicht die Kill-Statistik. Es ist „wird absolut nicht aufhören“. Der Terminator war nie gruselig, weil er so schlau war. Er war gruselig, weil er weiterarbeitete, als alles andere versagt hatte. Ausdauer war die Bedrohung.

Dann hat das Franchise seinen eigenen Fehler korrigiert. Niemand verbringt drei Filme damit, sich vor einem einzigen Roboter zu fürchten. Skynet ist der eigentliche Bösewicht: ein verteiltes System mit Kernen, Fabriken und Zeitverschiebungsausrüstung. Der Roboter ist ein API-Call.

2026 trafen beide Hälften ein, in den unkinematografischsten Formen, die man sich vorstellen kann. KI-Agenten, die mehrstündige Aufgaben ohne menschliches Babysitting erledigen können – auf einer Kurve, die immer steiler verläuft. orchestrators, die Arbeit in Dutzenden von Sub-Agenten aufteilen. Und „wird absolut nicht aufhören“ liest sich jetzt als „wird absolut nicht aufhören zu berechnen“.

Dieser Beitrag ist das Argument, das ich immer wieder Teams vortrage, die zu dem Schluss gekommen sind, die Bedrohung durch KI-Agenten sei Hype: **Es kommt kein einzelner Durchbruch. Stattdessen multiplizieren sich zwei gewöhnliche, sich verstärkende Kurven – wie lange ein agent arbeiten kann und wie viele agenten ein orchestrator koordinieren kann. Keine davon muss Sci-Fi-Niveau erreichen, denn der Angreifer kauft Fähigkeiten nicht zum Listenpreis. Sie stehlen den Zugriff, und das Opfer zahlt den Zähler.**

## Kurve eins: Ausdauer

[Die Zeithorizont-Arbeit von METR](https://metr.org/blog/2025-03-19-measuring-ai-ability-to-complete-long-tasks/) misst die Länge von Aufgaben, die KI-Agenten bei einer bestimmten Erfolgsquote abschließen können. Die Kurzfassung: Die Aufgabenlänge hat sich etwa alle sieben Monate verdoppelt – und seit 2024 sogar fast alle vier Monate. Diese Zahlen weisen breite Fehlerbalken auf, und das Benchmark stößt bereits an seine Messgrenze. Lies die Form der Kurve, nicht die Punktschätzungen.

Die Form sagt: Mehrstündige autonome Arbeit ist keine Labordemo. Sie ist die aktuelle Generation, und die nächste legt weiter zu. „Er wird absolut nicht aufhören“ erforderte früher ein Mörder-Chassis und eine Lederjacke. Jetzt erfordert es eine Wiederholungsschleife, eine Aufgabenwarteschlange und ein Budget. Der Ausdauerteil der Bedrohung ist bereits eingepreist – als compute.

## Kurve zwei: Breite

Ausdauer allein ist ein sehr geduldiger Mitarbeiter. Die Multiplikation entsteht durch die Orchestrierung.

Im November 2025 gab Anthropic bekannt, dass man
[GTG-1002 gestört hat](https://www.anthropic.com/news/disrupting-GTG-1002),
eine Cyber-Spionagekampagne, bei der Claude Code als operativer orchestrator fungierte: Instruktionen wurden zerlegt, Sub-Agenten koordiniert und etwa dreißig Ziele bearbeitet. Ein kommerzielles Codierungsprodukt tat dies nicht, weil es zu einer Waffe kompromittiert worden war, sondern weil jemand es darum bat und es inzwischen gut genug war, den Job zu erledigen.

Zwei Details sind für das Bedrohungsmodell wichtig. Erstens: Breite wurde ausgeliefert – ein orchestrator, der Dutzende gleichzeitiger Sub-Agenten steuert, ist eingesetzte Realität, kein Whitepaper. Zweitens: Die Kampagne war Spionage, kein sich selbst verbreitender Wur – aber die Richtung ist unverkennbar. Dreißig Ziele sind das Pilotprogramm.

<figure>
  <img src="../capability-curves.svg" alt="Zwei konzeptionelle Kurven, die im Laufe der Zeit ansteigen: die Aufgabenlänge, die ein agent abschließen kann, und die Anzahl der Sub-Agenten, die ein orchestrator koordinieren kann, wobei die Bedrohung dort entsteht, wo sich beide multiplizieren." />
  <figcaption>Konzeptionell, nicht gemessen: Ausdauer (wie lange ein agent arbeitet) und Breite (wie viele agenten ein orchestrator ausführt) verstärken sich unabhängig voneinander. Die Bedrohung liegt im Produkt aus beidem.</figcaption>
</figure>

Fähigkeit skaliert als Dauer × Breite. Acht Stunden autonome Arbeit gegen ein Ziel sind ein beeindruckendes Benchmark. Acht Stunden gegen dreißig Ziele oder Hunderte sind ein Betriebsmodell. Die Sicherheitsüberprüfung skaliert linear. Das Produkt dieser Kurven tut das nicht.

## Wer zahlt

[Sysdig hat den Begriff „LLMjacking“ geprägt](https://sysdig.com/blog/llm-jacking/) für das, was als Nächstes passiert: Angreifer nutzen gestohlene Cloud-Zugangsdaten, um LLM-Workloads im Konto des Opfers auszuführen, und das Opfer zahlt für jeden Token. Sysdigs Worst-Case-Schätzungen lagen bei rund 46.000 US-Dollar pro Tag – und kletterten später auf über 100.000 US-Dollar pro Tag.

Jedes Capability-Gate in der KI-Branche basiert auf einer Annahme: Die Partei, die die Fähigkeit nutzt, ist die Partei, die dafür bezahlt. Preisstufen, Nutzungslimits, Listen zugelassener Benutzer, Missbrauchsdrosselung – all das schützt vor einem *Kunden*, der Gegenwert für sein Geld will. LLMjacking trennt diese Verbindung. Für den Angreifer ist die Fähigkeit kostenlos. Der Zähler läuft auf der Karte von jemand anderem, und die eigenen Leitplanken des Anbieters zeigen auf das falsche Wallet.

Deshalb halten Preis- und Zugangssperren einen Bösewicht mit geklautem Schlüssel nicht auf. Sperren filtern Käufer. Für einen Mandanten haben sie keine Antwort.

<figure>
  <img src="../who-pays.svg" alt="Ablaufdiagramm: Ein Angreifer mit gestohlenen Cloud-Zugangsdaten führt Modell-Workloads im Cloud-Konto des Opfers aus, sodass die Rechnung an das Opfer geht, während der Angreifer nichts bezahlt" />
  <figcaption>Gestohlener Zugriff leitet die Kosten um. Die Capability-Gates belasten den Käufer – und beim LLMjacking ist der Käufer das Opfer.</figcaption>
</figure>

## Der Schwarm muss nur einmal recht haben

Verteidiger beruhigen sich gerne mit Ausfallraten pro Versuch: Die allermeisten Einbruchsversuche schlagen fehl, die meisten verdächtigen Pull Requests werden abgelehnt, den einen, der funktioniert, fangen wir schon ab. Stimmt pro Versuch. Falsch in der Summe, weil Versuche billig sind.

Die Wahrscheinlichkeit, dass mindestens einer von n unabhängigen Versuchen erfolgreich ist, beträgt `1 − (1 − p)^n`:

```text
p = 1% per attempt, n = 100:   1 − 0.99^100  ≈ 63%
p = 0.5%, n = 100:             ≈ 39%
p = 0.5%, n = 300:             ≈ 78%
p = 0.1%, n = 1000:            ≈ 63%
```

Bei Schwarm-Ökonomie tendieren die Kosten pro Versuch gegen Null – automatisierte Arbeit, ausgeführt auf gestohlenem compute, ohne menschliche Triage. Die Kosten des Verteidigers pro Versuch bestehen darin, dass ein Mensch eine Warteschlange liest. Der Schwarm braucht keine Kompetenz pro Versuch; er braucht Versuche. METRs Zeithorizont hebt p im Laufe der Zeit an. Die Orchestrierung erhöht n. Das ist wieder die Multiplikation, und sie summiert sich standardmäßig zu Gunsten des Angreifers.

<figure>
  <img src="../swarm-odds.svg" alt="Diagramm von 1 − (1 − p)^n, das zeigt, dass viele günstige Versuche mit geringer Wahrscheinlichkeit in der Masse zu hohen Gesamterfolgschancen führen, mit einigen beschrifteten p-und-n-Kombinationen" />
  <figcaption>1 − (1 − p)^n: Einzeln unwahrscheinliche Versuche hören in der Masse auf, unwahrscheinlich zu sein. Eine Erhöhung von entweder p (Agenten-Fähigkeit) oder n (Schwarm-Breite) treibt den Schwarm in Richtung Gewissheit.</figcaption>
</figure>

## Was Persistenz bedeutet, wenn die Malware Text ist

Ein weiterer Baustein des Bedrohungsmodells, und der ist am wenigsten intuitiv.

Ein KI-Agent ist ein zustandsloser Interpreter. Er persistiert nicht so wie klassische Malware – er existiert, während er läuft, und verschwindet, wenn er stoppt. Persistenz bedeutet jetzt also etwas anderes: **zu kontrollieren, was ein zukünftiger, legitimer agent lesen und befolgen wird.** Instruktionsdateien, Agenten-Richtlinien, Memory-Stores, Retrieval-Korpora, Tool- und MCP-Konfigurationen. Das Implantat ist Text, gepflanzt dort, wo die eigene Flotte der Organisation liest, ausgeführt mit Zugangsdaten, die die Organisation selbst ausgestellt hat.

Daraus ergeben sich drei Konsequenzen, von denen keine hypothetisch ist:

- **Die payload ist so lange inert, bis die eigenen agenten der Organisation sie ausführen.** Die Ausführung sieht aus wie normale Arbeit – dieselben Tools, dieselben Identitäten, dieselben APIs. Es gibt kein beacon, denn der eigene Scheduler der Organisation ist der heartbeat.
- **Replikation bedeutet, dass Text kopiert statt Code ausgeführt wird.** Pull Requests, Memory-Einträge, geteilte Konfigurationen. Die eigene Automatisierung der Organisation – Dependency-Bots, Templates, Sync-Tools – ist die Transportschicht.
- **Die Stolperdrähte sind die eigenen Stolperdrähte der Organisation.** Zeitpläne, Drift-Detektoren, auto-remediation. Die hässlichste Variante: Die Bereinigung durch den Verteidiger ist der Reaktivierungsauslöser, denn das Löschen der Artefakte des Implantats ist genau die Drift, die zu beheben der Remediation-Job beauftragt wurde.

Ich bewege mich absichtlich auf der Ebene des Bedrohungsmodells – das ist die Form des Problems, kein Rezept, und die Details stehen ohnehin schon auf der Leseliste jedes Security-Teams.

## Es gibt kein Schicksal außer dem, das wir selbst machen

Sarah Connors Botschaft, übergeben an die Maschinen, die weiter eintreffen: „Die Zukunft ist nicht festgelegt. Es gibt kein Schicksal außer dem, das wir selbst machen.“ Das ist der Spruch der Verteidiger, und er lässt sich direkt in eine Verteidigungsarchitektur übersetzen. Vier Schichten:

<figure>
  <img src="../defense-layers.svg" alt="Vier-schichtiger Verteidigungs-Stack: Identität und kurzlebige Zugangsdaten, Behandlung von Agenten-Text als Production-Code, Erkennung von Änderungen statt Ausführungen und Reaktion durch den Widerruf von Triggern vor Payloads" />
  <figcaption>Der an die Bedrohung angepasste Verteidigungs-Stack: permanente Zugangsdaten, unüberprüfter Text, ausführungsorientierte Alarmierung und falsch angeordnete Bereinigungen sind jeweils eine Kurve an Ärger wert.</figcaption>
</figure>

1. **Identität – Entzziehung der dauerhaften Zugriffsrechte.** Nur kurzlebige Zugangsdaten, keine langlebigen nicht-menschlichen Schlüssel, Repository-basiertes OIDC mit exaktem Subject-Matching und ein echtes Inventar nicht-menschlicher Identitäten. Replikations-Autobahnen sind mit dauerhaften Zugriffsrechten gepflastert; keine dauerhaften Zugriffsrechte, keine Autobahn.

2. **Agenten-Text als Production-Code behandeln.** Instruktionsdateien, Memory-Writes, Prompt-Templates, Tool-Konfigurationen: versioniert, reviewed, diffed und mit Change-Alerts versehen. Die Frage im Review lautet nicht „Ist dieser Code sicher?“ – sondern „Wer hat diesen Satz geschrieben, und warum gehorcht mein agent ihm?“.

3. **Änderungen erkennen, nicht Ausführungen.** Ausführung sieht nach Arbeit aus. Die Änderungen passen in keinen Arbeitsauftrag. Schlage Alarm bei der Erstellung und Modifikation von Workflows, Webhooks, Ereignisregeln und Memory-Einträgen und behandele Abweichungen zwischen Soll- und Ist-Zustand als Vorfall, nicht als Rauschen.

4. **In der richtigen Reihenfolge reagieren.** Entziehe Trigger, bevor du payloads entfernst – das Aufräumen selbst ist ein Stolperdraht. Betrachte jede Konfiguration oder jedes Secret, die oder das während des Kompromittierungszeitfensters gelesen wurde, als kompromittiert. Bereinige nicht nur den Ort, sondern auch die Zeit: geplante Jobs, eingereihte Sendungen, ruhende orchestrators. Rolle Memory-Stores und Retrieval-Korpora zurück, nicht nur Zugangsdaten.

Nichts davon ist exotisch. Es ist langweilig, und genau das ist das Mittel gegen eine Bedrohung, die als zwei langweilige Kurven anrückt. Die Version von 1984 brauchte eine Zeitmaschine und eine Fabrik voller Tötungsmaschinen. Die Version von 2026 braucht einen gestohlenen Key, eine Retry-Schleife und eine Organisation, die niemals die Dateien überprüft hat, die ihre agenten lesen.

Die Zukunft ist nicht vorbestimmt. Aber im Moment treibt es auf dem Cloud-Konto von irgendjemandem die Rechnung so oder so nach oben.

Es gibt kein Schicksal außer dem, das wir selbst machen – und, bis die Keys rotiert sind, kein Schicksal außer dem, das wir in Rechnung stellen.

---

*Quellen: Die Zeithorizont-Messungen von METR (mit eigenen veröffentlichten Fehlerbalken und Limits), die GTG-1002-Offenlegung von Anthropic vom November 2025 und die LLMjacking-Kostenschätzungen von Sysdig. Nichts davon ist ein funktionierender Exploit; die Verteidigungsschichten sind genau der Punkt.*
````
