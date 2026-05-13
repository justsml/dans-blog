# Translation Candidate
- Slug: beware-the-single-purpose-people
- Locale: de
- Model: openrouter/qwen/qwen3-32b:nitro
- Target: src/content/posts/2025-04-03--beware-the-single-purpose-people/de/index.mdx
- Validation: passed
- Runtime seconds: 18.39
- Input tokens: 7541
- Output tokens: 7695
- Thinking tokens: unknown
- Cached input tokens: 1536
- Cache write tokens: 0
- Estimated cost: $0.002450
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
language: English
title: Vorsicht vor Einzelzweck-Menschen
subTitle: 'So rein, dass es wehtut'
category: Code
subCategory: Best Practices
date: '2025-04-14'
modified: '2025-04-15'
tags:
  - software-development
  - code-organization
  - maintainability
  - testing
  - dogma
  - pragmatism
social_image: ../desktop-social.webp
cover_full_width: ../endless-little-boxes.webp
cover_mobile: ../endless-little-boxes-square-200.webp
cover_icon: ../endless-little-boxes-square-200.webp
---
Der `Single Responsibility Principle` ist eine dieser Ideen, die so sinnvoll klingt, dass sie Ihre Kritik umgehen kann.  

Machen Sie nur eine Sache. Machen Sie es gut. Halten Sie Module fokussiert. Geben Sie dem Code einen Grund zur Änderung. Guter Rat.  

Dann wandelt jemand den Rat in ein Maßband um und beginnt zu behaupten, dass jede Funktion mit mehr als fünf Zeilen ein Codegeruch ist.  

<p class="inset">Das Problem ist nicht SRP. Das Problem besteht darin, „klein“ als Ersatz für „kohärent“ zu behandeln.</p>  

An diesem Punkt haben Sie die Einzelzweck-Leute getroffen: Entwickler, die nicht falsch sind, was Modularität angeht, aber nützliche Grenzen mit maximaler Fragmentierung verwechseln.  

<figure class="inset-right">  
  <figcaption>Gewalt in der Softwarearchitektur</figcaption>  
![Komponenten, überall Komponenten](../software-patterns__the-dismembered-architecture.webp "Komponenten, überall Komponenten")  
</figure>

## I. Die nützliche Idee darunter

> Das Hinzufügen eines einzelnen Kontrollkästchens zu einem Formular sollte idealerweise nur eine Datei beeinflussen. Nicht 8 Dateien über 5 Verzeichnisse... Ich schaue dir zu, React/Redux.

Wenn SRP mit Urteilsvermögen angewandt wird, hilft es. Code-Einheiten, die sich auf eine einzige konzeptionelle Aufgabe konzentrieren, sind einfacher zu verstehen. Tests können das Verhalten an einer sinnvollen Grenze abdecken. Klare Module machen es einfacher, einen Teil des Systems zu ändern, ohne den Rest der Anwendung mitzuziehen.

Selbst die klassischen Unix-Beispiele sind pragmatischer als das Spruchband suggeriert. `ls` listet Dateien auf, ja, aber es koordiniert auch Aufrufe wie `opendir`, `readdir`, `closedir` und `stat`. Die nützliche Einheit ist nicht die kleinste mögliche Operation. Die nützliche Einheit ist die kleinstmögliche kohärente Sache, die die Aufgabe löst.

<p class="inset">Die ursprüngliche Unix-Philosophie war *Zusammensetzung* und *Einfachheit* gewidmet, **nicht der Reduktion aller Dinge** auf eine einzige Funktion oder Datei.</p>

Diese Unterscheidung ist wichtig. „Eine Verantwortung“ ist nicht dasselbe wie „eine Zeile Verhalten“.

## II. Überabstraktion: Wenn Einfachheit zur Chaos wird

> Unser Architekt besteht darauf, dass jede Funktion länger als 5 Zeilen ein „Code-Schlechtgeruch“ ist. Unser Codebasis riecht jetzt leicht nach hilfloser Verzweiflung.

Der Fehlermodus ist leicht zu erkennen, nachdem er bereits deinen Tag verschlechtert hat.

Der Codebasis hat mehr Dateien, aber weniger Struktur. Jeder Helper hat einen Helper. Jeder Begriff wurde in Ordner aufgeteilt, die nach technischen Rollen benannt sind, statt nach Produktbedeutung. Das Hinzufügen eines Kontrollkästchens erfordert das Bearbeiten eines Komponenten, eines Hooks, eines Selectors, einer Aktion, eines Reducers, einer Konstanten, einer Testfixture und eines Barrel-Exports, der hauptsächlich existiert, um die Importpfade nicht verdächtig aussehen zu lassen.

<figure class="inset-left">
  <figcaption>Kein Entkommen aus diesem unendlichen Arbeitsmuster</figcaption>
![Komponenten, Komponenten überall](../software-patterns__the-mc-escher-stack.webp "Der MC Escher Muster")
</figure>

Was hat all diese Reinheit gekostet?

-   **Dateisystem-Schrapnell:** Quellverzeichnisse, die in Albtraumlanschaften aus unzähligen winzigen Dateien ausbrechen, oft mit nur einer tragisch einsamen Funktion. Die Navigation wird zur Höhlenforschung.  
-   **Abhängigkeitsverwirrspiel:** Ein Netz aus Imports und Exports so dicht, dass das Nachverfolgen der Ausführung einen großen Whiteboard und mehr Geduld erfordert, als das Feature es verdient. Dateien, die exakt einmal importiert werden, sitzen da und täuschen vor, wiederverwendbar zu sein.  
-   **Testbetrug:** Tests werden zu brüchigen, hyper-spezifischen Wächtern, die minimale Implementungsdetails bewachen. Ändert man eine Funktions-signatur? Beobachte, wie dutzende Tests zerbrechen wie antikes Porzellan. Der Test-Suite verwandelt sich von einem Sicherheitsnetz in ein Minenfeld.  
-   **Geschwindigkeit verschwunden:** Einfache Änderungen metastasieren zu epischen Multi-Datei-Modifikationsgeschichten. Neuanwärter werden Wochen damit verbringen, Karten und Kompass zu erhalten, um herauszufinden, wo sich die `UserProfile`-Komponente *dieser Woche* tatsächlich befindet. Vorwärtsbewegung verlangsamt sich zu einem geologischen Kriechen unter dem reinen Gewicht dieser „Organisation“.  

Ich habe mich in Codebases gestürzt, in denen ein geradliniges 100-Zeilen-Feature lebendig zerteilt wurde auf 15+ Dateien, jede ein „reines“ kleines Engelchen mit vielleicht einer oder zwei Funktionen. Die kognitive Sprengkraft, das Chaos in seinem Kopf behalten zu müssen, negierte jeden theorietheoretischen Gewinn aus der Trennung. Es war nicht einfacher; es war nur verstreut.  

## III. Der Tribut der Perfektion: Auswirkungen auf Entwickler  

> Wir verbringen mehr Zeit damit, über Dateistruktur und Namenskonventionen zu diskutieren, als tatsächlich Features zu liefern. Ist das Agile?  

<figure class="inset-left">
  <figcaption>So chaotisch, dass es fast wie Kunst wirkt</figcaption>
![So chaotisch, dass es fast wie Kunst wirkt](../software-patterns__the-rube-goldberg-architecture.webp "Das Rube Goldberg Muster")
</figure>  

Diese pathologische Fragmentierung ist nicht nur ein ästhetisches Problem. Sie verändert, wie Entwickler ihre Aufmerksamkeit aufteilen:

**Die Produktivitätsverschleppung:** Vergesst technische Schulden; dies ist eine organisatorische Schuldenlast, die durch zwanghafte Verzeichnisverschachtung entsteht. Jede kleine Anpassung wird zu einer archäologischen Grabung durch Schichten der Abstraktion. Zeit verschwindet im Schwarzen Loch von `cd ..` und `grep`.

**Die Teststeuer:** Anstatt Vertrauen zu schenken, wird das Testpaket zur Reibungsquelle. Stunden vergehen mit dem Beheben von Tests, die durch triviale Refactorings zerstört wurden, Tests, die zu eng an die mikroskopischen Details gebunden waren, die sie eigentlich überprüfen sollten.

**Die kognitive Belastung:** Es gibt eine harte Grenze für die Anzahl voneinander losgelösten Informationsstücken, die ein menschliches Gehirn gleichzeitig bewältigen kann. Zwangsweise die Programmabläufe aus einer Dutzend zerstreuter Dateien zusammensetzen, behindert aktiv das Verständnis und macht mutige Änderungen schwerer.

## IV. Pragmatismus betreten: Eine praktische Alternative

> Ich schlug vor, zwei verwandte Funktionen in dieselbe Datei zu packen. Die Reaktion des Raums war, als hätte ich vorgeschlagen, die Staging-Umgebung zu löschen.
> — Ein sich von Purismus erholender Leser

Der Ausweg besteht nicht darin, das SRP aufzugeben. Die Antwort ist, es auf der richtigen Bedeutungsebene anzuwenden.

In der Praxis sieht das so aus:

- **Fokus auf Kohäsion statt Atome:** Gruppieren Sie Dinge, die *gemeinsam ändern* und *konzeptionell zusammengehören*. Ein Modul kann mehrere verwandte Aspekte der Benutzerauthentifizierung abdecken. Das ist in Ordnung. Es ist wahrscheinlich *besser*, als sechs getrennte Dateien, die jeweils eine Funktion zum Login-Zustand enthalten.
- **Verwandte Code nicht trennen:** Trennen Sie verwandten Code nur, wenn ein *stark offensichtlicher, greifbarer Vorteil* besteht – wie echte Wiederverwendbarkeit *in der Praxis*, nicht in irgendeinem hypothetischen Zukunftsszenario, das nie eintritt. Nähe ist entscheidend für die Verständlichkeit.
- **Von der Realität angetrieben sein:** Organisieren Sie nach den tatsächlichen Features und Workflows Ihrer Anwendung, nicht nach einem abstrakten Ideal funktionaler Reinheit³. Machen diese Strukturen es einfacher oder schwieriger, `Feature X` zu verstehen und zu modifizieren?
- **Achtung auf die 'Meatware':** Denken Sie an den armen Entwickler. Welche Organisation minimiert die geistige Belastung, um mit dem Code arbeiten zu können? Optimieren Sie für menschliches Verständnis.
- **Testen, was zählt:** Schreiben Sie Tests, die das Verhalten an sinnvollen Grenzen überprüfen, nicht Tests, die eng an die interne Funktionsweise jedes winzigen Elements angeschraubt sind. Streben Sie Zuversichtlichkeit an, nicht nur Coverage-Showbiz.

<p class="inset">Das Ziel ist nicht theoretische Perfektion, die für eine Doktorarbeit taugt; es ist die Erstellung von Code, den Ihre Kollegen (und der zukünftige Sie) navigieren, verstehen und ändern können, ohne das Gebäude in Brand zu setzen.</p>

Manchmal bedeutet das, dass eine Datei 200 statt 50 Zeilen lang ist. Manchmal übernimmt eine Funktion das Abrufen von Daten *und* deren leichte Transformation. Manchmal hat eine Klasse zwei eng verwandte Verantwortlichkeiten, die zusammengehören. Wenn es das System insgesamt einfacher macht, ist das wahrscheinlich die richtige Entscheidung.

Bleiben Sie unerbittlich bei den praktischen Fragen:
- Kann jemand Neuem sich zurechtfinden?
- Können wir `X` ändern, ohne unabhängiges `Y` zu zerstören?
- Sagt mir dieser Test wirklich, ob das Feature funktioniert?
- Liefern wir Wert, oder drehen wir nur Ordner um?

## V. Schlussfolgerung: Fördern von kohärentem und wartbarem Code

Der Single Responsibility Principle ist ein nützliches Werkzeug. Er ist kein Befehl, Ihre Codebasis in atomaren Staub zu verwandeln. Wie jedes Werkzeug hängt sein Wert vom Urteilsvermögen der Person ab, die es anwendet.  

Wenn Sie also auf die Einzelaufgabefanatiker treffen, bereit, Krieg gegen jede Funktion zu führen, die sich traut, drei Zeilen zu überschreiten, atmen Sie tief durch. Denken Sie an das 12-Datei-Häkchen.  

Unsere Aufgabe besteht nicht darin, theoretisch makellose Schneeflockenfunktionen zu konstruieren. Unsere Aufgabe ist es, Software zu bauen, die funktioniert, Probleme löst und die die nächste Person, die sie berührt, nicht bestraft.  

Bleiben Sie pragmatisch. Fokussieren Sie sich auf Ergebnisse. Lassen Sie die Jagd nach perfekter Reinheit nicht zur Feindin wartbaren Codes werden. Ihre Gesundheit und die Geschwindigkeit Ihres Teams hängen davon ab.  

¹ Die Ironie besteht darin, dass die Erreichung einer tatsächlichen Einzelaufgabe auf der tiefsten Ebene eine enorme Komplexität erfordert, die direkt darunter versteckt ist.  

² Wir sprechen hier von konzeptioneller Reinheit: der Idee, dass eine Funktion logisch nur „eine Sache“ tun sollte. Verwechseln Sie dies nicht mit dem Konzept der „reinen Funktion“ aus der funktionalen Programmierung, das keine Nebenwirkungen hat – ein anderes, wenn auch manchmal verwandtes Konzept.
````
