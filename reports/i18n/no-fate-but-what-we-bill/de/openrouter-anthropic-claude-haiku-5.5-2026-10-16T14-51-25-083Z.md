# Translation Candidate
- Slug: no-fate-but-what-we-bill
- Locale: de
- Model: openrouter/anthropic/claude-haiku-5.5
- Target: src/content/posts/2026-10-14--no-fate-but-what-we-bill/de/index.mdx
- Validation: deferred
- Runtime seconds: 31.72
- Input tokens: 22962
- Output tokens: 7200
- Thinking tokens: unknown
- Cached input tokens: 9504
- Cache write tokens: 6142
- Estimated cost: $0.005194
- Pricing source: openrouter-2026-10-16
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
title: 'Kein Schicksal außer dem, was wir abrechnen'
subTitle: >-
  Agenten arbeiten länger, Schwärme breiten sich weiter aus, und gestohlene
  Cloud-Schlüssel schicken die Rechnung für die Compute-Ressourcen an das Opfer.
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
"Hör zu, und versteh es. Dieser Terminator ist da draußen. Mit ihm kann man nicht verhandeln. Mit ihm kann man nicht vernünftig reden. Er kennt kein Mitleid, keine Reue und keine Angst. Und er hört absolut nicht auf, niemals, bis du tot bist."

Kyle Reese, der 1984 das Publikum über die Gestalt der Bedrohung briefte.

Der Satz, der gut gealtert ist, ist nicht die Zahl der Tötungen. Es ist „absolut nicht aufhören“. Der Terminator war nie gruselig, weil er schlau war. Er war gruselig, weil er weiterarbeitete, nachdem alles andere gescheitert war. Ausdauer war die Bedrohung.

Dann hat die Filmreihe ihren eigenen Fehler korrigiert. Niemand verbringt drei Filme damit, sich vor einem einzelnen Roboter zu fürchten. Skynet ist der eigentliche Bösewicht: ein verteiltes System mit Kernen, Fabriken und Zeitverschiebungstechnik. Der Roboter ist ein API-Aufruf.

Im Jahr 2026 sind beide Hälften eingetroffen, in den unfilmischsten Formen, die man sich vorstellen kann. Agenten, die mehrstündige Aufgaben ohne menschliche Aufsicht erledigen, auf einer Kurve, die immer steiler wird. Orchestratoren, die Arbeit im Dutzend an Sub-Agenten verteilen. Und „absolut nicht aufhören“ liest sich jetzt als „absolut nicht aufhören abzurechnen“.

Dieser Beitrag ist das Argument, das ich immer wieder Teams vortrage, die zu dem Schluss gekommen sind, die agentische Bedrohung sei Hype: **Es kommt kein einzelner Durchbruch. Stattdessen multiplizieren sich zwei gewöhnliche, sich verstärkende Kurven: wie lange ein Agent arbeiten kann und wie viele Agenten ein Orchestrator koordinieren kann. Beide müssen nicht in Sci-Fi-Bereiche vordringen, denn der Angreifer kauft keine Capability zum Listenpreis. Er stiehlt Zugang, und das Opfer bezahlt den Zähler.**

## Kurve eins: Ausdauer

[METRs Arbeit zum Zeithorizont](https://metr.org/blog/2025-03-19-measuring-ai-ability-to-complete-long-tasks/) misst, wie lange Aufgaben sind, die Agenten bei einer gegebenen Erfolgsrate abschließen können. Die Kurzfassung: Die Aufgabenlänge verdoppelt sich ungefähr alle sieben Monate, seit 2024 sogar eher alle vier. Diese Zahlen haben breite Fehlerbalken, und der Benchmark stößt bereits an seine Messgrenze. Lies die Form der Kurve, nicht die Punktschätzungen.

Die Form sagt: Mehrstündige autonome Arbeit ist keine Labordemo. Sie ist die aktuelle Generation, und die nächste baut darauf auf. „Er hört absolut nicht auf“ erforderte früher ein Mordchassis und eine Lederjacke. Heute erfordert es eine Retry-Schleife, eine Warteschlange von Aufgaben und ein Budget. Der Ausdauer-Teil der Bedrohung ist bereits eingepreist, und zwar als Compute.

## Kurve zwei: Breite

Ausdauer allein ist ein sehr geduldiger Mitarbeiter. Die Multiplikation kommt von der Orchestrierung.

Im November 2025 gab Anthropic bekannt, [GTG-1002 gestört zu haben](https://www.anthropic.com/news/disrupting-GTG-1002), eine Cyberspionage-Kampagne, bei der Claude Code als operativer Orchestrator agierte: Anweisungen zerlegen, Sub-Agenten koordinieren und über rund dreißig Ziele hinweg arbeiten. Ein kommerzielles Coding-Produkt hat das nicht getan, weil es zu einer Waffe gemacht wurde, sondern weil jemand es gebeten hatte, die Aufgabe zu erledigen, und es nun gut genug dafür war.

Für das Bedrohungsmodell sind zwei Details entscheidend. Erstens: Breite ist bereits ausgeliefert. Ein Orchestrator, der Dutzende gleichzeitige Sub-Agenten hält, ist eine eingesetzte Realität und kein Papiermodell. Zweitens: Die Kampagne war Spionage, kein sich selbst verbreitender Wurm, aber die Richtung ist unübersehbar. Dreißig Ziele sind das Pilotprojekt.

<figure>
  <img src="../capability-curves.svg" alt="Zwei konzeptionelle Kurven steigen über die Zeit: die Aufgabenlänge, die ein Agent abschließen kann, und die Anzahl der Sub-Agenten, die ein Orchestrator koordinieren kann; die Bedrohung entsteht dort, wo sich beide multiplizieren" />
  <figcaption>Konzeptionell, nicht gemessen: Ausdauer (wie lange ein Agent arbeitet) und Breite (wie viele Agenten ein Orchestrator betreibt) verstärken sich unabhängig voneinander. Die Bedrohung liegt im Produkt aus beiden.</figcaption>
</figure>

Capability skaliert als Dauer × Breite. Acht Stunden autonome Arbeit gegen ein Ziel sind ein beeindruckender Benchmark. Acht Stunden gegen dreißig Ziele oder Hunderte sind ein Betriebsmodell. Sicherheitsprüfungen skalieren linear. Das Produkt dieser Kurven tut es nicht.

## Wer zahlt

[Sysdig hat „LLMjacking“ geprägt](https://sysdig.com/blog/llm-jacking/) für das, was als Nächstes passiert: Angreifer nutzen gestohlene Cloud-Zugangsdaten, um LLM-Workloads im Konto des Opfers laufen zu lassen, und das Opfer bezahlt jedes Token. Sysdigs Worst-Case-Schätzungen lagen bei etwa 46.000 Dollar pro Tag und stiegen später auf über 100.000 Dollar pro Tag.

Jedes Capability-Gate in der KI-Industrie beruht auf einer Annahme: Wer die Capability nutzt, bezahlt auch dafür. Preisstufen, Nutzungsobergrenzen, Listen genehmigter Nutzer, Missbrauchsdrosselung, all das schützt gegen einen *Kunden*, der für sein Geld Gegenwert will. LLMjacking kappt diese Verbindung. Für den Angreifer ist die Capability kostenlos. Der Zähler läuft auf der Karte eines anderen, und die eigenen Leitplanken des Anbieters zeigen auf das falsche Portemonnaie.

That's why price and access gates don't stop one bad actor with a stolen key. Gates filter buyers. They have no answer for a tenant.

<figure>
  <img src="../who-pays.svg" alt="Flussdiagramm: Ein Angreifer mit gestohlenen Cloud-Zugangsdaten betreibt Modell-Workloads im Cloud-Konto des Opfers, sodass die Rechnung beim Opfer landet, während der Angreifer nichts bezahlt" />
  <figcaption>Gestohlener Zugriff leitet die Belastung um. Die Capability-Gates berechnen den Käufer – und bei LLMjacking ist der Käufer das Opfer.</figcaption>
</figure>

## Der Schwarm muss nur einmal richtig liegen

Verteidiger trösten sich mit Fehlerraten pro Versuch: Die meisten Einbruchsversuche scheitern, die meisten verdächtigen PRs werden abgelehnt, und den einen, der funktioniert, fangen wir schon. Pro Versuch stimmt das. In der Summe stimmt es nicht, weil Versuche billig sind.

Die Wahrscheinlichkeit, dass mindestens einer von n unabhängigen Versuchen erfolgreich ist, beträgt `1 − (1 − p)^n`:

```text
p = 1% per attempt, n = 100:   1 − 0.99^100  ≈ 63%
p = 0.5%, n = 100:             ≈ 39%
p = 0.5%, n = 300:             ≈ 78%
p = 0.1%, n = 1000:            ≈ 63%
```

Bei Schwarm-Ökonomie liegen die Kosten pro Versuch nahezu bei null – automatisierte Arbeit, auf gestohlener Compute ausgeführt, von niemandem gesichtet. Die Kosten eines Verteidigers pro Versuch sind eine Person, die eine Warteschlange liest. Der Schwarm braucht keine Capability pro Versuch; er braucht Versuche. METRs Kurve hebt p über die Zeit. Orchestrierung hebt n. Das ist wieder die Multiplikation, und sie arbeitet standardmäßig zugunsten des Angreifers.

<figure>
  <img src="../swarm-odds.svg" alt="Diagramm von 1 − (1 − p)^n: Viele günstige Versuche mit geringer Einzelwahrscheinlichkeit summieren sich zu hohen Gesamterfolgschancen, mit einigen beschrifteten p-und-n-Kombinationen" />
  <figcaption>1 − (1 − p)^n: Einzeln unwahrscheinliche Versuche werden im Massenbetrieb nicht mehr unwahrscheinlich. Ein höheres p (Agenten-Capability) oder ein höheres n (Schwarm-Breite) bringt den Schwarm näher an die Gewissheit.</figcaption>
</figure>

## Was Persistenz bedeutet, wenn die Malware Text ist

Noch ein Teil des Bedrohungsmodells, und der ist am wenigsten intuitiv.

Ein KI-Agent ist ein zustandsloser Interpreter. Er persistiert nicht so, wie Malware es tut – er existiert, während er läuft, und verschwindet, wenn er stoppt. Persistenz bedeutet daher heute etwas anderes: **die Kontrolle darüber, was ein künftiger, legitimer Agent liest und befolgt.** Instruktionsdateien, Agent-Richtlinien, Memory-Stores, Retrieval-Korpora, Tool- und MCP-Konfigurationen. Das Implantat ist Text, platziert dort, wo die eigene Flotte der Organisation ihn liest, und ausgeführt mit Zugangsdaten, die die Organisation selbst ausgestellt hat.

Daraus folgen drei Konsequenzen, keine davon hypothetisch:

- **Die Payload ist inert, bis die eigenen Agenten der Organisation sie ausführen.** Die Ausführung sieht aus wie normale Arbeit – gleiche Tools, gleiche Identitäten, gleiche APIs. Es gibt kein Beacon, weil der eigene Scheduler der Organisation das Heartbeat ist.
- **Replikation bedeutet, dass Text kopiert wird, nicht dass Code ausgeführt wird.** Pull Requests, Memory-Einträge, geteilte Konfigurationen. Die eigene Automatisierung der Organisation – Dependency-Bots, Templates, Sync-Tooling – ist die Transportschicht.
- **Die Stolperdrähte sind die eigenen Stolperdrähte der Organisation.** Zeitpläne, Drift-Detektoren, Auto-Remediation. Die gemeinste Form: Die Aufräumarbeit des Verteidigers ist der Reaktivierungs-Trigger, denn das Löschen der Artefakte des Implantats ist genau die Drift, die der Remediation-Job beheben sollte.

Ich bleibe absichtlich auf der Flughöhe des Bedrohungsmodells – das ist die Form des Problems, kein Rezept, und die Details stehen ohnehin auf der Leseliste jedes Security-Teams.

## Kein Schicksal außer dem, das wir machen

Sarah Connors Botschaft an die Maschinen, die immer wieder auftauchen: „Die Zukunft ist nicht festgelegt. Es gibt kein Schicksal außer dem, das wir machen.“ Das ist die Zeile der Verteidiger, und sie lässt sich direkt in eine Verteidigungsarchitektur übersetzen. Vier Schichten:

<figure>
  <img src="../defense-layers.svg" alt="Vierschichtiger Verteidigungsstapel: Identität und kurzlebige Zugangsdaten, Agenten-Text wie Produktionscode behandeln, Edits statt Ausführungen erkennen, und mit dem Widerruf von Triggern vor den Payloads reagieren" />
  <figcaption>Der Verteidigungsstapel, abgebildet auf die Bedrohung: dauerhafte Zugriffsrechte, ungeprüfter Text, an Ausführung orientierte Alarmierung und falsch geordnete Aufräumarbeit sind jeweils eine Kurve voller Ärger.</figcaption>
</figure>

1. **Identität – dauerhafte Zugriffsrechte aushungern.** Nur kurzlebige Zugangsdaten, keine langlebigen nicht-menschlichen Schlüssel, Repository-basiertes OIDC mit exaktem Subject-Matching und ein echtes Inventar der nicht-menschlichen Identitäten. Replikationsautobahnen sind mit dauerhaften Zugriffsrechten gepflastert; ohne dauerhafte Zugriffsrechte keine Autobahn.

2. **Agenten-Text wie Produktionscode behandeln.** Instruktionsdateien, Memory-Schreibvorgänge, Prompt-Templates, Tool-Konfigurationen: versioniert, geprüft, diffbar und mit Änderungsalarmen versehen. Die Prüffrage lautet nicht „ist dieser Code sicher?“, sondern „wer hat diesen Satz geschrieben, und warum gehorcht mein Agent ihm?“

3. **Bearbeitungen erkennen, nicht Ausführungen.** Ausführung sieht nach Arbeit aus. Die Änderungen passen zu keinem Arbeitsauftrag. Alarmiere bei Erstellung und Änderung von Workflows, Webhooks, Event-Regeln und Memory-Einträgen, und behandle deklarierten vs. laufenden Drift als Vorfall, nicht als Rauschen.

4. **In der richtigen Reihenfolge reagieren.** Widerrufe Trigger, bevor du Payloads entfernst. Aufräumen ist selbst ein Stolperdraht. Betrachte jede Konfiguration oder jedes Secret, das während des Kompromittierungszeitfensters gelesen wurde, als kontaminiert. Räume Zeit genauso auf wie Speicherplatz: geplante Jobs, eingereihte Sendungen, schlafende Orchestrierungen. Setze Memory-Stores und Retrieval-Korpora zurück, nicht nur Zugangsdaten.

Nichts davon ist exotisch. Es ist langweilig, und genau das ist die passende Antwort auf eine Bedrohung, die mit zwei langweiligen Kurven heranrollt. Die 1984er-Version brauchte eine Zeitmaschine und eine Fabrik voller Tötungsmaschinen. Die 2026er-Version braucht einen gestohlenen Schlüssel, eine Retry-Schleife und eine Organisation, die nie die Dateien geprüft hat, die ihre Agenten lesen.

Die Zukunft ist nicht festgelegt. Aber gerade jetzt läuft sie auf irgendeinem Cloud-Konto, und zwar so oder so auf der Rechnung.

Kein Schicksal außer dem, das wir machen – und, bis die Schlüssel rotiert sind, kein Schicksal außer dem, das wir bezahlen.

---

*Quellen: METRs Zeithorizont-Messungen (mit deren eigenen veröffentlichten Fehlerbalken und Grenzen), Anthropics Offenlegung GTG-1002 vom November 2025 und Sysdigs Kostenschätzungen zu LLMjacking. Hier steht kein funktionierender Exploit; die Verteidigungsebenen sind der ganze Punkt.*
````
