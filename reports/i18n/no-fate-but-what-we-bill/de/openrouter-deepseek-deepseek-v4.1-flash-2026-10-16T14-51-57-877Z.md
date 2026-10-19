# Translation Candidate
- Slug: no-fate-but-what-we-bill
- Locale: de
- Model: openrouter/deepseek/deepseek-v4.1-flash
- Target: src/content/posts/2026-10-14--no-fate-but-what-we-bill/de/index.mdx
- Validation: deferred
- Runtime seconds: 40.87
- Input tokens: 14117
- Output tokens: 15664
- Thinking tokens: unknown
- Cached input tokens: 6912
- Cache write tokens: 0
- Estimated cost: $0.021000
- Pricing source: openrouter-2026-10-16
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
title: 'Kein Schicksal außer dem, was wir abrechnen'
subTitle: ''
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
"Hör zu und verstehe. Dieser Terminator ist da draußen. Mit ihm kann man nicht verhandeln. Man kann nicht mit ihm reden. Es empfindet kein Mitleid, keine Reue, keine Angst. Und es wird absolut nicht aufhören, niemals, bis du tot bist."

Kyle Reese, der 1984 ein Publikum über die Gestalt der Bedrohung informiert.

Die Zeile, die gut gealtert ist, ist nicht die Kill-Zahl. Es ist „absolut nicht aufhören“. Der Terminator war nie beängstigend, weil er klug war. Er war beängstigend, weil er weiterarbeitete, nachdem alles andere versagt hatte. Ausdauer war die Bedrohung.

Dann korrigierte das Franchise seinen eigenen Fehler. Niemand verbringt drei Filme damit, sich vor einem Roboter zu fürchten. Skynet ist der eigentliche Bösewicht: ein verteiltes System mit Kernen, Fabriken und Zeitverschiebungsausrüstung. Der Roboter ist ein API-Aufruf.

Im Jahr 2026 kamen beide Hälften an, in den unkreativsten Formen, die man sich vorstellen kann. Agenten, die mehrstündige Aufgaben ohne menschliche Aufsicht bewältigen können, auf einer Kurve, die immer steiler wird. Orchestratoren, die Arbeit dutzendweise an Sub-Agenten verteilen. Und „absolut nicht aufhören“ liest sich jetzt als „absolut nicht aufhören abzurechnen“.

Dieser Beitrag ist das Argument, das ich Teams immer wieder vortrage, die zu dem Schluss gekommen sind, dass die agentische Bedrohung Hype ist: **Es kommt kein einzelner Durchbruch. Stattdessen multiplizieren sich zwei gewöhnliche, sich verstärkende Kurven — wie lange ein Agent arbeiten kann und wie viele Agenten ein Orchestrator koordinieren kann. Keine von beiden muss Sci-Fi-Niveau erreichen, denn der Angreifer kauft Fähigkeiten nicht zum Listenpreis. Er stiehlt Zugang, und das Opfer zahlt den Zähler.**

## Erste Kurve: Ausdauer

[METRs Zeithorizont-Arbeit](https://metr.org/blog/2025-03-19-measuring-ai-ability-to-complete-long-tasks/) misst die Länge von Aufgaben, die Agenten mit einer gegebenen Erfolgsrate abschließen können. Die Kurzfassung: Die Aufgabenlänge hat sich etwa alle sieben Monate verdoppelt — und seit 2024 eher alle vier Monate. Diese Zahlen haben breite Fehlerbalken, und der Benchmark stößt bereits an seine Messgrenze. Lies die Form der Kurve, nicht die Punktschätzungen.

Die Form sagt: Mehrstündige autonome Arbeit ist keine Labordemo. Sie ist die aktuelle Generation, und die nächste verstärkt sich weiter. „Es wird absolut nicht aufhören“ erforderte früher ein Mord-Chassis und eine Lederjacke. Jetzt erfordert es eine Retry-Schleife, eine Aufgabenwarteschlange und ein Budget. Der Ausdauer-Teil der Bedrohung ist bereits eingepreist — als compute.

## Zweite Kurve: Breite

Ausdauer allein ist ein sehr geduldiger Angestellter. Die Vervielfachung kommt durch Orchestrierung.

Im November 2025 gab Anthropic die [Störung von GTG-1002](https://www.anthropic.com/news/disrupting-GTG-1002) bekannt, eine Cyber-Spionage-Kampagne, in der Claude Code als operativer Orchestrator fungierte: Instruktionen zerlegen, Sub-Agenten koordinieren und über etwa dreißig Ziele hinweg arbeiten. Ein kommerzielles Coding-Produkt tat dies nicht, weil es zur Waffe kompromittiert wurde, sondern weil jemand es bat, die Aufgabe zu erledigen, und es jetzt gut genug dafür war.

Zwei Details sind für das Bedrohungsmodell wichtig. Erstens: Die Breite wurde geliefert: Ein Orchestrator, der Dutzende gleichzeitige Sub-Agenten hält, ist eingesetzte Realität, kein Papier. Zweitens: Die Kampagne war Spionage, kein selbstverbreitender Wurm — aber die Bewegungsrichtung ist unverkennbar. Dreißig Ziele sind das Pilotprogramm.

<figure>
  <img src="../capability-curves.svg" alt="Zwei konzeptionelle Kurven, die über die Zeit ansteigen: Aufgabenlänge, die ein Agent abschließen kann, und Anzahl der Sub-Agenten, die ein Orchestrator koordinieren kann, wobei die Bedrohung dort entsteht, wo sich die beiden multiplizieren" />
  <figcaption>Konzeptionell, nicht gemessen: Ausdauer (wie lange ein Agent arbeitet) und Breite (wie viele Agenten ein Orchestrator ausführt) verstärken sich unabhängig voneinander. Die Bedrohung liegt im Produkt der beiden.</figcaption>
</figure>

Fähigkeit skaliert als Dauer × Breite. Acht Stunden autonome Arbeit gegen ein Ziel sind ein beeindruckender Benchmark. Acht Stunden gegen dreißig Ziele oder Hunderte sind ein Betriebsmodell. Sicherheitsüberprüfung skaliert linear. Das Produkt dieser Kurven nicht.

## Wer zahlt

[Sysdig prägte „LLMjacking“](https://sysdig.com/blog/llm-jacking/) für das, was als Nächstes passiert: Angreifer nutzen gestohlene Cloud-Zugangsdaten, um LLM-Workloads im Konto des Opfers auszuführen, und das Opfer zahlt für jedes Token. Sysdigs Worst-Case-Schätzungen lagen bei etwa 46.000 US-Dollar pro Tag — später stiegen sie auf über 100.000 US-Dollar pro Tag.

Jedes Capability-Gate in der KI-Industrie basiert auf einer Annahme: Die Partei, die die Fähigkeit nutzt, ist die Partei, die dafür zahlt. Preisstufen, Nutzungslimits, Listen genehmigter Benutzer, Missbrauchsdrosselung — all das verteidigt gegen einen *Kunden*, der Gegenwert für sein Geld will. LLMjacking durchtrennt diese Verbindung. Für den Angreifer ist die Fähigkeit kostenlos. Der Zähler läuft auf jemandes anderer Karte, und die eigenen Guardrails des Anbieters zeigen auf die falsche Geldbörse.

Deshalb stoppen Preis- und Zugangsschranken keinen einzelnen Böswilligen mit einem gestohlenen Schlüssel. Gates filtern Käufer. Für einen Tenant haben sie keine Antwort.

<figure>
  <img src="../who-pays.svg" alt="Flussdiagramm: Ein Angreifer mit gestohlenen Cloud-Zugangsdaten führt Modell-Workloads im Cloud-Konto des Opfers aus, sodass die Rechnung an das Opfer geht, während der Angreifer nichts zahlt" />
  <figcaption>Gestohlener Zugang leitet die Abrechnung um. Die Capability-Gates belasten den Käufer — und beim LLMjacking ist der Käufer das Opfer.</figcaption>
</figure>

## Der Schwarm muss nur einmal richtig liegen

Verteidiger trösten sich mit Fehlerraten pro Versuch: Die meisten Eindringversuche scheitern, die meisten verdächtigen PRs werden abgelehnt, wir würden den einen erwischen, der funktioniert. Pro Versuch stimmt das. In der Summe ist es falsch, denn Versuche sind billig.

Die Wahrscheinlichkeit, dass mindestens einer von n unabhängigen Versuchen gelingt, ist `1 − (1 − p)^n`:

```text
p = 1% per attempt, n = 100:   1 − 0.99^100  ≈ 63%
p = 0.5%, n = 100:             ≈ 39%
p = 0.5%, n = 300:             ≈ 78%
p = 0.1%, n = 1000:            ≈ 63%
```

Bei Schwarm-Ökonomie sind die Kosten pro Versuch ungefähr null — automatisierte Arbeit, ausgeführt auf gestohlenem compute, triagiert von keinem Menschen. Die Kosten des Verteidigers pro Versuch sind eine Person, die eine Queue liest. Der Schwarm braucht keine Fähigkeit pro Versuch; er braucht Versuche. METRs Kurve hebt p über die Zeit. Orchestrierung hebt n. Das ist wieder die Multiplikation, und sie verstärkt sich standardmäßig zugunsten des Angreifers.

<figure>
  <img src="../swarm-odds.svg" alt="Diagramm von 1 − (1 − p)^n, das zeigt, dass viele billige Versuche mit niedriger Wahrscheinlichkeit in der Summe zu hohen Gesamterfolgschancen führen, mit einigen beschrifteten p-und-n-Kombinationen" />
  <figcaption>1 − (1 − p)^n: Einzeln unwahrscheinliche Versuche hören in der Masse auf, unwahrscheinlich zu sein. Erhöht man entweder p (Agent-Fähigkeit) oder n (Schwarm-Breite), bewegt sich der Schwarm in Richtung Gewissheit.</figcaption>
</figure>

## Was Persistenz bedeutet, wenn die Malware Text ist

Noch ein Stück des Bedrohungsmodells, und es ist das am wenigsten intuitive.

Ein KI-Agent ist ein zustandsloser Interpreter. Er persistiert nicht so wie Malware — er existiert, während er läuft, und verschwindet, wenn er stoppt. Persistenz bedeutet jetzt also etwas anderes: **kontrollieren, was ein zukünftiger legitimer agent lesen und befolgen wird.** Instruktionsdateien, Agent-Richtlinien, Memory-Stores, Retrieval-Korpora, Tool- und MCP-Konfigurationen. Das Implantat ist Text, platziert dort, wo die eigene Flotte der Organisation liest, ausgeführt mit Zugangsdaten, die die Organisation selbst ausgegeben hat.

Drei Konsequenzen folgen, keine davon hypothetisch:

- **Der payload ist inert, bis die eigenen Agenten der Organisation ihn ausführen.** Ausführung sieht wie normale Arbeit aus — dieselben Tools, dieselben Identitäten, dieselben APIs. Es gibt keinen beacon, denn der eigene Scheduler der Organisation ist der heartbeat.
- **Replikation bedeutet, Text kopiert zu bekommen, nicht Code ausgeführt.** Pull Requests, Memory-Einträge, geteilte Konfigurationen. Die eigene Automatisierung der Organisation — Dependency-Bots, Templates, Sync-Tooling — ist die Transportschicht.
- **Die Stolperdrähte sind die eigenen Stolperdrähte der Organisation.** Zeitpläne, Drift-Detektoren, auto-remediation. Die garstigste Form: Die Aufräumarbeit des Verteidigers ist der Reaktivierungsauslöser, denn das Löschen der Artefakte des Implantats ist genau der Drift, den der Remediation-Job beauftragt war zu beheben.

Ich bleibe bewusst auf Höhe des Bedrohungsmodells — das ist die Form des Problems, kein Rezept, und die Details stehen ohnehin auf jeder Leseliste eines Security-Teams.

## Kein Schicksal außer dem, das wir machen

Sarah Connors Botschaft, weitergereicht an die Maschinen, die immer wieder auftauchen: „Die Zukunft steht nicht fest. Es gibt kein Schicksal außer dem, das wir machen." Das ist die Linie der Verteidiger, und sie übersetzt sich direkt in eine Verteidigungsarchitektur. Vier Schichten:

<figure>
  <img src="../defense-layers.svg" alt="Vierschichtiger Verteidigungs-Stack: Identität und kurzlebige Zugangsdaten, Agent-Text als Produktionscode behandeln, Bearbeitungen statt Ausführungen erkennen und reagieren, indem Auslöser vor payloads widerrufen werden" />
  <figcaption>Der Verteidigungs-Stack auf die Bedrohung abgebildet: dauerhafte Zugangsdaten, ungeprüfter Text, ausführungsförmige Alarmierung und falsch geordnete Aufräumarbeit sind jeweils eine Kurve voller Ärger.</figcaption>
</figure>

1. **Identität — nimm der dauerhaften Zugriffsrechte die Nahrung.** Nur kurzlebige Zugangsdaten, keine langlebigen nicht-menschlichen Schlüssel, Repository-basiertes OIDC mit exaktem Subject-Matching und ein echtes Inventar nicht-menschlicher Identitäten. Replikations-Autobahnen sind mit dauerhaften Zugriffsrechten gepflastert; keine dauerhaften Zugriffsrechte, keine Autobahn.

2. **Behandle Agent-Text als Produktionscode.** Instruktionsdateien, Memory-Schreibvorgänge, Prompt-Templates, Tool-Konfigurationen: versioniert, reviewt, gediffed und bei Änderungen alarmiert. Die Review-Frage lautet nicht „ist dieser Code sicher" — sondern „wer hat diesen Satz geschrieben, und warum befolgt mein agent ihn."

3. **Erkenne Änderungen, nicht Ausführungen.** Ausführung sieht nach Arbeit aus. Die Änderungen passen zu keinem Arbeitsauftrag. Alarmiere bei der Erstellung und Änderung von Workflows, Webhooks, Ereignisregeln und Memory-Einträgen, und behandle Drift zwischen deklariertem und laufendem Zustand als Vorfall, nicht als Rauschen.

4. **Reagiere in der richtigen Reihenfolge.** Widerrufe Trigger, bevor du Payloads entfernst — Aufräumen ist selbst ein Stolperdraht. Behandle jede Konfiguration oder jedes Secret, das während des Kompromittierungszeitfensters gelesen wurde, als kontaminiert. Bereinige Zeit ebenso wie Raum: geplante Jobs, in der Warteschlange befindliche Sendungen, ruhende Orchestrierungen. Setze Memory und Korpora zurück, nicht nur Zugangsdaten.

Nichts davon ist exotisch. Es ist langweilig, und genau das passt zu einer Bedrohung, die als zwei langweilige Kurven daherkommt. Die Version von 1984 brauchte eine Zeitmaschine und eine Fabrik von Tötungsmaschinen. Die Version von 2026 braucht einen gestohlenen Schlüssel, eine Retry-Schleife und eine Organisation, die nie die Dateien überprüft hat, die ihre Agenten lesen.

Die Zukunft ist nicht festgelegt. Aber genau jetzt, auf dem Cloud-Konto von irgendjemandem, läuft die Zukunft so oder so auf eine Rechnung zu.

Kein Schicksal außer dem, das wir machen — und bis die Schlüssel rotiert sind, kein Schicksal außer dem, was wir abrechnen.

---

*Quellen: METRs Zeithorizont-Messungen (mit ihren eigenen veröffentlichten Fehlerbalken und Grenzen), Anthropics GTG-1002-Offenlegung vom November 2025 und Sysdigs LLMjacking-Kostenschätzungen. Nichts hier ist ein funktionierender Exploit; die Verteidigungsschichten sind der ganze Punkt.*
````
