# Translation Candidate
- Slug: just-add-more-engineers-fallacy
- Locale: de
- Model: openrouter/qwen/qwen3-32b:nitro
- Target: src/content/posts/2025-12-29--just-add-more-engineers-fallacy/de/index.mdx
- Validation: deferred
- Runtime seconds: 19.14
- Input tokens: 7804
- Output tokens: 8155
- Thinking tokens: unknown
- Cached input tokens: 1024
- Cache write tokens: 0
- Estimated cost: $0.002582
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
draft: true
hidden: true
publish: false
title: Der 'Einfach mehr Ingenieure hinzufügen'-Trugschluss
subTitle: >-
  Warum das Hinzufügen von Mitarbeitern zu einem verspäteten Projekt es noch
  weiter verzögert.
category: Code
subCategory: Engineering Management
date: '2025-12-29'
modified: '2025-12-29'
tags:
  - engineering-management
  - team-scaling
  - brooks-law
  - productivity
  - software-engineering
---
## n(n-1)/2

Das ist die Formel, die auf dem Arm jedes Engineering-Managers tätowiert sein sollte. Sie ist keine Lösung für Ihr Deadline-Problem. Sie ist der mathematische Beweis dafür, warum Ihre Lösung nicht funktionieren wird.

Sie waren schon in diesem Meeting. Dem, in dem jemand unweigerlich vorschlägt, „einfach mehr Entwickler hinzuzufügen“, um die Deadline zu schaffen. Die Tabelle macht es so einfach wie möglich: 2 Ingenieure × 3 Monate = 6 Ingenieurmonate Arbeit, also sollten 6 Ingenieure es in 1 Monat schaffen, oder? Der VP nickt zustimmend. Der PM aktualisiert den Zeitplan. Alle fühlen sich produktiv.

Außer die Mathematik funktioniert nicht so, und sie hat es nie getan.

## Was Ihnen niemand über Kommunikationskanäle sagt

Wenn Sie 5 Ingenieure in einem Team haben, können sie sich auf 10 verschiedene Weisen austauschen. Fügen Sie 5 weitere Ingenieure hinzu, und plötzlich müssen Sie 45 verschiedene Kommunikationskanäle verwalten. Das ist die Formel im Einsatz: n(n-1)/2, wobei n die Größe Ihres Teams ist.

Das ist keine kleine Unannehmlichkeit. Das ist der Unterschied zwischen „Wir besprechen das beim Mittagessen“ und „Ich buche ein Meeting mit den Stakeholdern.“ Sie haben nicht nur Ihre Teamkapazität verdoppelt. Sie haben die Overhead-Kosten, um alle auf dem gleichen Stand zu halten, mehr als vervierfacht.

Wenn Sie 20 Personen erreichen, verwalten Sie 190 verschiedene potenzielle Gespräche. Ihr Standup ist kein schneller Sync mehr. Ihre Architekturentscheidungen erfordern Konsensbildung. Ihre Merge-Konflikte werden zu archäologischen Ausgrabungen konkurrierender Visionen für das gleiche Feature.

Microsofts DevDiv-Team hat dies bereits 2008 untersucht, und die Erkenntnisse waren unangenehm klar: Koordinierungskosten zeigen sich überall. Wem gehört welches Modul? Wer muss an diesem Anruf teilnehmen? Warum ist dieser Merge-Konflikt in dieser Woche dreimal aufgetreten? Jede dieser Fragen repräsentiert echte Zeit, die Ihre Ingenieure nicht in die eigentliche Deadline investieren, die Sie erreichen wollen.

Schlimmer noch: Die Forschung in *Accelerate* von Forsgren, Humble und Kim zeigte, dass kleinere, autonomere Teams sich in Geschwindigkeit und Qualität konsequent besser als größere Teams schlagen. Die Koordinierungsteuer ist nicht nur real. Sie ist messbar, und sie ist kostspielig.

## Die dreimonatige Investition, die Sie nicht haben  

Aber sagen wir, Sie sind bereit, diese Koordinationskosten zu zahlen. Sie haben Budget, Sie haben die Genehmigung für Personal, und Sie sind bereit, Ressourcen an dieses Problem zu verschwenden. Großartig! Jetzt müssen Sie drei bis sechs Monate warten, bis diese Ressourcen Ihnen tatsächlich helfen.  

Ihre neuen Senior-Entwickler (und Sie stellen doch Senior-Entwickler ein, oder? Weil Junior-Entwickler noch mehr Zeit brauchen würden) verbringen ihre erste Woche damit, ihre Entwicklungsumgebung zum Laufen zu bringen. Danach müssen sie Ihre Architektur verstehen. Nicht nur „wir verwenden Microservices“, sondern *warum* Sie die Services so aufgeteilt haben. Nicht nur „wir verwenden Redis hier“, sondern was bei dem Zwischenfall vor zwei Jahren passiert ist, der Sie dazu brachte, Redis gegenüber der offensichtlichen Alternative zu wählen.  

Währenddessen zahlen Ihr bestehendes Team die Betreuungssteuer. Jede Frage ist legitim und notwendig: „Warum haben wir den Auth-Flow so strukturiert?“ „Wer ist für den Billing-Service zuständig?“ „Ist dieser TODO aus 2019 immer noch relevant?“ Jede dieser Fragen zieht jemanden aus seiner Arbeit heraus. Forschung von Gloria Mark an der UC Irvine zeigte, dass es durchschnittlich 23 Minuten dauert, bis man nach einer Unterbrechung zu einer Aufgabe zurückkehrt. Wenn Ihre fünf neuen Entwickler täglich fünf Fragen stellen, verbrennen Sie Stunden konzentrierten Arbeitszeits der Leute, die eigentlich die Deadline erreichen sollen.  

Camille Fournier schreibt in *The Manager's Path*, dass es einem Senior-Entwickler 3–6 Monate dauert, um in einem komplexen Codebase voll produktiv zu werden. Das gilt, wenn alles gut läuft. Das gilt, wenn Ihre Dokumentation aktuell ist, Ihr tribal knowledge zugänglich ist und Ihr Domain nicht besonders seltsam ist. Die meisten Codebases erfüllen diese Kriterien nicht.  

Der dritte Monat ist besonders gefährlich. Ihre neuen Entwickler sind jetzt selbstsicher. Sie schreiben Code! Sie sind produktiv! Außer sie wissen nichts über den seltsamen Edge-Case im Zahlungsfluss, oder den Legacy-Modul, den Sie heimlich migrieren, oder den Zwischenfall, der allen beibrachte, warum wir nie, niemals an Freitagen deployen. Ein Teil ihres Codes wird Refactoring benötigen. Einige Teile könnten Incidents verursachen. Alles braucht eine gründliche Prüfung durch dieselben Leute, die eigentlich die Deadline erreichen sollen.  

## Die unbequeme Kontinuität von Brooks' Gesetz  

Fred Brooks schrieb 1975 darüber. *The Mythical Man-Month* fasste eine einfache Wahrheit zusammen: „Menschen hinzuzufügen, um ein Softwareprojekt zu beschleunigen, macht es später.“ Das Buch basierte auf seiner Erfahrung mit IBMs OS/360-Projekt und enthielt jenes berühmte Gleichnis: Eine Frau kann in neun Monaten ein Baby machen, aber neun Frauen können kein Baby in einem Monat machen.  

Fünf Jahrzehnte später haben wir bessere Tools. Unsere CI/CD-Pipelines reduzieren einige Integrationskosten. Moderne Pull-Request-Workflows erkennen Probleme früher. Eine 2019er-Studie in *IEEE Transactions on Software Engineering* fand heraus, dass starke CI/CD-Praktiken die Integrationskosten um bis zu 40 % reduzieren können. Asynchrone Kommunikationswerkzeuge erlauben uns, über Zeitzonen hinweg zu koordinieren. Gut gestaltete Microservices können interne Team-Abhängigkeiten reduzieren.  

Aber die Menschen haben sich nicht verbessert. Wir brauchen immer noch Kontext. Wir brauchen immer noch zu verstehen, warum Entscheidungen so getroffen wurden, nicht nur, was. O(n²) ist Mathematik, nicht Meinung. Sie können die Konstanten in dieser Gleichung optimieren, aber nicht die fundamentale Wachstumsrate. Domänenexpertise braucht nach wie vor Zeit, sich aufzubauen, egal, wie gut Ihre Onboarding-Dokumentation ist.

Die Technologie ändert sich. Die Mathematik bleibt gleich.

## Amazon wusste das in den frühen 2000er-Jahren

Jeff Bezos etablierte bei Amazon die „two-pizza-Team“-Regel: Wenn ein Team nicht mit zwei Pizzen gefüttert werden kann, ist es zu groß. Das ideale Teamgröße erwies sich als 5-8 Personen. Das ging nicht um Pizza-Budgets oder Quirkiness. Kleinere Teams treffen Entscheidungen schneller, weil es weniger Stakeholder gibt. Sie kommunizieren effizienter, weil es weniger Kommunikationswege gibt. Sie bauen bessere Systeme, weil die Verantwortung klarer ist.

In *Team Topologies* zitieren Matthew Skelton und Manuel Pais Forschungsergebnisse, die zeigen, dass Teams mit 7-9 Personen die optimale Balance zwischen Fähigkeiten und Koordination erreichen. Jenseits dieser Schwelle zahlen Sie exponentiell mehr für Koordinationskosten, während die Ausbeute abnimmt. Die Mathematik holt Sie ein, egal ob Sie sie anerkennen oder nicht.

## Was tatsächlich funktioniert

Also, was tun, wenn ein Projekt wirklich zu spät ist und das Deadline wirklich wichtig ist?

Sie reduzieren den Umfang. Ich weiß, dass das Unternehmen es nicht mögen wird. Aber wie Marty Cagan in *Inspired* schreibt: „Die Realität ist, dass mindestens die Hälfte unserer Ideen einfach nicht funktionieren wird.“ Starten Sie das Minimale machbare Produkt. Verschieben Sie die „nice-to-haves“. Launchen Sie ohne das Vanity-Metrics-Dashboard. Sie können in Version 2 iterieren.

Unnötige Meetings absagen. Genehmigungsprozesse vereinfachen. Ihrem Team echte, ungestörte Fokussierungszeit geben. Nein zu neuen Feature-Anfragen sagen. Das Toyota Production System hat den Begriff „Verschwendung beseitigen“, und manchmal ist der schnellste Weg voranzukommen, Dinge zu stoppen, die Sie verlangsamen.

Zeitboxen rigoros und schicken Sie das, was Sie haben. Als Facebook gestartet wurde, hieß es „Thefacebook“ und funktionierte nur an der Harvard-Universität. Als AWS S3 startete, hatte es nur wenige API-Aufrufe. Wie Paul Graham in *Hackers & Painters* schreibt: „Es ist besser, einige Nutzer wirklich zu begeistern, als viele Nutzer nur so-so zu beeindrucken.“ Starten Sie das Einfachste, das funktioniert.

Wenn Sie absolut unbedingt neue Leute einstellen müssen, dann für das nächste Projekt, nicht, um dieses zu retten. Akzeptieren Sie die 3-6-monatige Einarbeitungszeit. Investieren Sie in Paar-Programmierung und Mentoring. Dokumentieren Sie *warum* Entscheidungen getroffen wurden, nicht nur *was* getan wurde. Brooks' Gesetz hat eine Folgerung: Die Hinzufügung von Personen zu einem Projekt *früh* kann helfen, weil Sie die Einarbeitungskosten vor dem Deadline-Druck zahlen.

## Warum der Irrtum besteht  

Der "Einfach mehr Ingenieure hinzufügen"-Irrtum überlebt, weil er wie eine Handlung aussieht. Er zeigt Stakeholdern Dringlichkeit. Er wirkt beeindruckend in einer Tabelle. Er ist emotional befriedigend im Moment.  

Aber Softwareentwicklung ist keine Fließbandarbeit. Wir produzieren nicht Widgets, bei denen Verdopplung der Arbeiter die Ausgabe verdoppelt. Wir lösen vernetzte Probleme, bei denen Kontext, Kommunikation und Koordinationsaufwand reale Kosten sind, die quadratisch mit der Teamgröße skaliert.  

Die Mathematik ist klar: Fünf Personen haben 10 Kommunikationswege, zehn Personen haben 45, zwanzig Personen haben 190. Einarbeitung dauert Monate, nicht Wochen. Koordinationsaufwand ist eine Abgabe, die Sie für jede zusätzliche Person zahlen. Das sind keine Meinungen, mit denen man in Konferenzräumen diskutieren kann. Sie sind messbare Realitäten, die in Ihren Velocity-Charts auftauchen, egal ob Sie daran glauben oder nicht.  

Das nächste Mal, wenn jemand vorschlägt, mehr Ingenieure zu einem verspäteten Projekt hinzuzufügen, wissen Sie, was zu erwarten ist. Das Projekt wird nicht um Tage oder Wochen verspätet sein.  

Es wird um Monate verspätet sein. Und im Gegensatz zu den meisten Engineering-Problemen können Sie sich hier nicht durch Refaktorisierung aus der Sackgasse befreien.  

---

## Weitere Lektüre  

**Bücher:**  
- *The Mythical Man-Month* von Fred Brooks (1975)  
- *The Manager's Path* von Camille Fournier (2017)  
- *Accelerate* von Nicole Forsgren, Jez Humble und Gene Kim (2018)  
- *Team Topologies* von Matthew Skelton und Manuel Pais (2019)  
- *Inspired* von Marty Cagan (2017)  
- *Hackers & Painters* von Paul Graham (2004)  

**Artikel & Papers:**  
- "The Influence of Organizational Structure on Software Quality" (Microsoft Research, 2008)  
- "No Silver Bullet: Essence and Accidents of Software Engineering" von Fred Brooks (1986)  
- Gloria Marks Forschung zu Unterbrechungen und Aufmerksamkeit an der UC Irvine  
- Verschiedene Harvard Business Review Artikel zu Teamdynamik und Produktivität

**Moderne Ansätze:**  
- Will Larsons *Staff Engineer* Blog und Buch zur Technologie-Führung  
- Charity Majors (Honeycomb) zu Observabilität und Teamstruktur  
- Die State of DevOps Berichte von DORA
````
