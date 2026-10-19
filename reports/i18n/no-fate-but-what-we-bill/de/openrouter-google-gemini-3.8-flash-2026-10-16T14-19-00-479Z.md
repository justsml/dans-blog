# Translation Candidate
- Slug: no-fate-but-what-we-bill
- Locale: de
- Model: openrouter/google/gemini-3.8-flash
- Target: src/content/posts/2026-10-14--no-fate-but-what-we-bill/de/index.mdx
- Validation: deferred
- Runtime seconds: 45.39
- Input tokens: 12648
- Output tokens: 4892
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- Estimated cost: $0.027831
- Pricing source: openrouter-2026-09-22
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
title: 'Kein Schicksal außer dem, was wir abrechnen'
subTitle: >-
  Agents laufen immer länger, Schwärme fächern immer weiter auf und gestohlene
  Cloud-Keys wälzen die Compute-Rechnung auf das Opfer ab.
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
„Hör zu und begreife. Dieser Terminator ist da draußen. Man kann nicht mit ihm verhandeln. Man kann nicht mit ihm reden. Er fühlt weder Mitleid noch Reue noch Furcht. Und er wird nicht eher aufhören, niemals, bis du tot bist.“

Kyle Reese klärt 1984 sein Publikum über die Gestalt der Bedrohung auf.

Die Zeile, die gut gealtert ist, ist nicht der Bodycount. Es ist: „wird nicht eher aufhören.“ Der Terminator war nie deshalb gruselig, weil er klug war. Er war gruselig, weil er einfach weitergemacht hat, nachdem alles andere versagt hatte. Ausdauer war die Bedrohung.

Später hat das Franchise seinen eigenen Fehler korrigiert. Niemand fürchtet sich drei Filme lang vor einem einzelnen Roboter. Skynet ist der eigentliche Bösewicht: ein verteiltes System mit Rechenzentren, Fabriken und Zeitverschiebungsausrüstung. Der Roboter ist nur ein API-Aufruf.

2026 sind beide Hälften eingetroffen, in der am wenigsten filmreifen Form, die man sich vorstellen kann: Agenten, die mehrstündige Aufgaben ohne menschliches Babysitting erledigen können – auf einer Kurve, die immer steiler wird. Orchestratoren, die Arbeit dutzendweise an Sub-Agenten auffächern. Und „wird nicht eher aufhören“ bedeutet heute: „wird nicht eher aufhören abzurechnen.“

Dieser Beitrag ist das Argument, das ich immer wieder Teams vorhalte, die die agentische Bedrohung für reinen Hype halten: **Es steht kein einzelner Durchbruch bevor. Stattdessen multiplizieren sich zwei ganz gewöhnliche, exponentiell wachsende Kurven: wie lange ein agent arbeiten kann, und wie viele Agenten ein orchestrator koordinieren kann. Keine von beiden muss Science-Fiction-Niveau erreichen, denn der Angreifer kauft Fähigkeiten nicht zum Listenpreis. Er stiehlt den Zugriff, und das Opfer bezahlt den Zähler.**

## Erste Kurve: Ausdauer

[METRs Arbeit zum Zeithorizont](https://metr.org/blog/2025-03-19-measuring-ai-ability-to-complete-long-tasks/) misst die Dauer von Aufgaben, die Agenten mit einer bestimmten Erfolgsquote bewältigen können. Die Kurzfassung: Die Aufgabenlänge verdoppelt sich etwa alle sieben Monate – seit 2024 sogar eher alle vier Monate. Diese Zahlen haben breite Fehlerbalken, und der Benchmark stößt bereits an seine Messgrenzen. Lies den Verlauf der Kurve, nicht die Punktschätzungen.

Der Verlauf zeigt: Mehrstündige autonome Arbeit ist keine Labordemo. Es ist die aktuelle Generation, und die nächste legt exponentiell nach. „Er wird nicht eher aufhören“ verlangte früher nach einem Tötungschassis und einer Lederjacke. Heute braucht es eine Retry-Schleife, eine Aufgabenwarteschlange und ein Budget. Der Ausdauer-Teil der Bedrohung ist bereits eingepreist – als compute.

## Zweite Kurve: Breite

Ausdauer allein ist nur ein sehr geduldiger Mitarbeiter. Die Multiplikation entsteht durch Orchestrierung.

Im November 2025 legte Anthropic die [Unterbrechung von GTG-1002](https://www.anthropic.com/news/disrupting-GTG-1002) offen: eine Cyber-Spionagekampagne, bei der Claude Code als operativer orchestrator agierte – indem er Anweisungen zerlegte, Sub-Agenten koordinierte und etwa dreißig Ziele bearbeitete. Ein kommerzielles Coding-Produkt tat dies nicht, weil es zu einer Waffe manipuliert worden wäre, sondern weil jemand es darum bat und es inzwischen gut genug war, den Job zu erledigen.

Zwei Details sind für das Bedrohungsmodell entscheidend. Erstens: Die Breite ist bereits Realität. Ein orchestrator, der Dutzende parallele Sub-Agenten steuert, ist gelebte Praxis, kein Paper. Zweitens: Die Kampagne war Spionage, kein sich selbst verbreitender Wurm – aber die Stoßrichtung ist unmissverständlich. Dreißig Ziele sind das Pilotprojekt.

<figure>
  <img src="../capability-curves.svg" alt="Zwei konzeptionelle Kurven, die im Laufe der Zeit ansteigen: die Aufgabenlänge, die ein Agent bewältigen kann, und die Anzahl der Sub-Agenten, die ein Orchestrator koordinieren kann, wobei die Bedrohung dort entsteht, wo sich beide multiplizieren" />
  <figcaption>Konzeptionell, nicht gemessen: Ausdauer (wie lange ein agent arbeitet) und Breite (wie viele Agenten ein orchestrator betreibt) wachsen unabhängig voneinander. Die Bedrohung liegt im Produkt aus beidem.</figcaption>
</figure>

Fähigkeit skaliert als Dauer × Breite. Acht Stunden autonome Arbeit gegen ein einziges Ziel sind ein beeindruckender Benchmark. Acht Stunden gegen dreißig Ziele oder Hunderte sind ein Betriebsmodell. Sicherheitsüberprüfungen skalieren linear. Das Produkt dieser Kurven tut das nicht.

## Wer zahlt

[Sysdig prägte den Begriff „LLMjacking“](https://sysdig.com/blog/llm-jacking/) für das, was als Nächstes passiert: Angreifer nutzen gestohlene Cloud-Zugangsdaten, um LLM-Workloads im Konto des Opfers auszuführen – und das Opfer bezahlt für jedes Token. Sysdigs Worst-Case-Schätzungen lagen bei rund 46.000 US-Dollar pro Tag – und kletterten später auf über 100.000 US-Dollar pro Tag.

Jedes Capability-Gate in der KI-Branche basiert auf einer einzigen Annahme: Die Partei, die die Fähigkeit nutzt, ist auch die Partei, die dafür bezahlt. Preisstufen, Nutzungslimits, Listen freigegebener Nutzer, Missbrauchsdrosselung – all das verteidigt gegen einen *Kunden*, der Gegenwert für sein Geld will. LLMjacking kappt diese Verbindung. Für den Angreifer ist die Fähigkeit kostenlos. Der Zähler läuft auf der Kreditkarte eines Fremden, und die Leitplanken des Anbieters zielen auf das falsche Portemonnaie.

Genau deshalb halten Preis- und Zugangsschranken keinen einzigen Angreifer mit einem gestohlenen Key auf.
Gates filtern Käufer. Gegen einen Untermieter haben sie keine Handhabe.

<figure>
  <img src="../who-pays.svg" alt="Ablaufdiagramm: Ein Angreifer mit gestohlenen Cloud-Zugangsdaten führt Modell-Workloads im Cloud-Konto des Opfers aus, sodass die Rechnung beim Opfer landet, während der Angreifer nichts bezahlt" />
  <figcaption>Gestohlener Zugriff leitet die Kosten um. Die Capability-Gates belasten den Käufer – und beim LLMjacking ist der Käufer das Opfer.</figcaption>
</figure>

## Der Schwarm muss nur ein einziges Mal recht haben

Verteidiger wiegen sich mit Fehlerraten pro Versuch in falscher Sicherheit: Die meisten Einbruchsversuche scheitern, die meisten verdächtigen PRs werden abgelehnt, den einen funktionierenden würden wir schon erwischen. Betrachtet man einzelne Versuche, stimmt das. In der Summe ist es falsch, denn Versuche sind billig.

Die Wahrscheinlichkeit, dass mindestens einer von n unabhängigen Versuchen gelingt, beträgt `1 − (1 − p)^n`:

```text
p = 1% pro Versuch, n = 100:   1 − 0.99^100  ≈ 63%
p = 0.5%, n = 100:             ≈ 39%
p = 0.5%, n = 300:             ≈ 78%
p = 0.1%, n = 1000:            ≈ 63%
```

Unter den wirtschaftlichen Bedingungen eines Schwarms liegen die Kosten pro Versuch bei nahezu null – automatisierte Arbeit, ausgeführt auf gestohlenem Compute, von keinem Menschen gesichtet. Die Kosten des Verteidigers pro Versuch entsprechen einer realen Person, die eine Queue abarbeitet. Der Schwarm braucht keine enormen Fähigkeiten pro Versuch; er braucht einfach nur Versuche. METRs Kurve hebt p über die Zeit an. Orchestrierung skaliert n. Das ist wieder die Multiplikation, und sie potenziert sich standardmäßig zugunsten des Angreifers.

<figure>
  <img src="../swarm-odds.svg" alt="Diagramm von 1 − (1 − p)^n, das zeigt, dass viele billige Versuche mit geringer Wahrscheinlichkeit in der Summe hohe Gesamterfolgschancen ergeben, mit einigen markierten p- und n-Kombinationen" />
  <figcaption>1 − (1 − p)^n: Einzeln unwahrscheinliche Versuche sind in Masse nicht mehr unwahrscheinlich. Erhöht man entweder p (Agenten-Fähigkeiten) oder n (Schwarm-Breite), bewegt sich der Schwarm in Richtung Gewissheit.</figcaption>
</figure>

## Was Persistenz bedeutet, wenn die Malware aus Text besteht

Ein weiteres Puzzlestück des Bedrohungsmodells, und es ist das am wenigsten intuitive.

Ein KI-Agent ist ein zustandsloser Interpreter. Er persistiert nicht so wie klassische Malware – er existiert, während er läuft, und verflüchtigt sich, sobald er stoppt. Persistenz bedeutet heute also etwas anderes: **zu kontrollieren, was ein legitimer zukünftiger Agent lesen und befolgen wird.** Instruktionsdateien, Agenten-Richtlinien, Memory-Stores, Retrieval-Korpora, Tool- und MCP-Konfigurationen. Das Implantat ist Text, platziert dort, wo die eigene Flotte des Unternehmens liest, und ausgeführt mit Zugangsdaten, die das Unternehmen selbst ausgestellt hat.

Daraus folgen drei Konsequenzen, keine davon hypothetisch:

- **Die Payload ist inert, bis die eigenen Agenten der Organisation sie ausführen.** Die Ausführung sieht wie normale Arbeit aus – dieselben Tools, dieselben Identitäten, dieselben APIs. Es gibt keinen Beacon, weil der organisationseigene Scheduler der Heartbeat ist.
- **Replikation bedeutet, Text kopiert zu bekommen, nicht Code auszuführen.** Pull Requests, Memory-Einträge, geteilte Konfigurationen. Die eigene Automatisierung der Organisation – Dependency-Bots, Templates, Sync-Tools – dient als Transportschicht.
- **Die Stolperdrähte sind die organisationseigenen Stolperdrähte.** Schedules, Drift-Detektoren, Auto-Remediation. Die bösartigste Variante: Das Aufräumen durch den Verteidiger wird zum Reaktivierungs-Trigger, weil das Löschen der Artefakte des Implantats genau der Drift ist, den der Remediation-Job beseitigen soll.

Ich bleibe hier bewusst auf der Flughöhe des Bedrohungsmodells – das ist das Profil des Problems, keine Anleitung, und die Details stehen ohnehin längst auf der Leseliste jedes Security-Teams.

## Kein Schicksal außer dem, was wir selbst bestimmen

Sarah Connors Botschaft an die Maschinen, die immer wieder eintreffen: „Die Zukunft ist nicht vorbestimmt. Es gibt kein Schicksal außer dem, was wir selbst bestimmen.“ Das ist das Motto der Verteidiger, und es lässt sich direkt in eine Verteidigungsarchitektur übersetzen. Vier Schichten:

<figure>
  <img src="../defense-layers.svg" alt="Vierschichtiger Defense-Stack: Identität und kurzlebige Zugangsdaten, Agenten-Text wie Produktivcode behandeln, Edits statt Ausführungen erkennen und reagieren, indem Trigger vor Payloads widerrufen werden" />
  <figcaption>Der Defense-Stack abgebildet auf die Bedrohung: Dauerhafte Zugriffsrechte, ungeprüfter Text, auf Ausführung fixiertes Alerting und eine falsche Cleanup-Reihenfolge bedeuten jeweils eine eigene Kurve voller Probleme.</figcaption>
</figure>

1. **Identität – dauerhafte Zugriffsrechte aushungern.** Ausschließlich kurzlebige Zugangsdaten, keine langlebigen nicht-menschlichen Keys, Repository-basiertes OIDC mit exaktem Subject-Matching und ein echtes Inventar nicht-menschlicher Identitäten. Replikationsautobahnen sind mit dauerhaften Zugriffsrechten gepflastert; keine dauerhaften Zugriffsrechte, keine Autobahn.

2. **Agenten-Text wie Produktivcode behandeln.** Instruktionsdateien, Memory-Schreibvorgänge, Prompt-Templates, Tool-Konfigurationen: versioniert, gereviewt, per Diff geprüft und mit Change-Alerts versehen. Die Frage im Review lautet nicht: „Ist dieser Code sicher?“ – sondern: „Wer hat diesen Satz geschrieben und warum gehorcht mein Agent ihm?“

3. **Edits erkennen, nicht nur Ausführungen.** Ausführung sieht wie normale Arbeit aus. Die Edits passen zu keinem Arbeitsauftrag. Schlage Alarm bei der Erstellung und Änderung von Workflows, Webhooks, Event-Rules und Memory-Einträgen – und behandle Drift zwischen Deklaration und Laufzeit als Incident, nicht als Rauschen.

4. **In der richtigen Reihenfolge reagieren.** Widerrufe Trigger, bevor du Payloads entfernst – das Aufräumen selbst ist ein Stolperdraht. Behandle jede Konfiguration und jedes Secret, das während des Kompromittierungszeitfensters gelesen wurde, als kompromittiert. Bereinige die Zeitdimension genauso wie den Raum: geplante Jobs, Übertragungen in Warteschlangen, schlummernde Orchestrierungen. Setze Memory-Stores und Korpora zurück, nicht nur Zugangsdaten.

Nichts davon ist exotisch. Es ist stinklangweilig – und genau die passende Antwort auf eine Bedrohung, die über zwei langweilige Kurven auf uns zukommt. Die Version von 1984 brauchte eine Zeitmaschine und eine Fabrik voller Tötungsmaschinen. Die Version von 2026 braucht einen gestohlenen Key, eine Retry-Schleife und eine einzige Organisation, die nie geprüft hat, welche Dateien ihre Agenten eigentlich lesen.

Die Zukunft ist nicht vorbestimmt. Aber genau jetzt, auf dem Cloud-Account von irgendjemandem, lässt die Zukunft die Rechnung so oder so weiterlaufen.

Kein Schicksal außer dem, was wir selbst bestimmen – und solange die Keys nicht rotiert sind: kein Schicksal außer dem, was wir abrechnen.

---

*Quellen: Die Zeithorizont-Messungen von METR (mit den jeweils veröffentlichten Fehlergrenzen und Einschränkungen), Anthropics GTG-1002-Veröffentlichung vom November 2025 und Sysdigs Kostenschätzungen zu LLMjacking. Nichts davon ist ein funktionsfähiger Exploit; es geht hier einzig und allein um die Verteidigungsschichten.*
````
