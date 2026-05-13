# Translation Candidate
- Slug: beware-the-single-purpose-people
- Locale: de
- Model: openrouter/openai/gpt-oss-120b:nitro
- Target: src/content/posts/2025-04-03--beware-the-single-purpose-people/de/index.mdx
- Validation: passed
- Runtime seconds: 5.82
- Input tokens: 7687
- Output tokens: 2876
- Thinking tokens: unknown
- Cached input tokens: 2944
- Cache write tokens: 0
- Estimated cost: $0.000817
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
language: English
title: Vorsichtvor den Einzweck‑Menschen
subTitle: 'So rein, dass es schmerzt'
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
Der `Single Responsibility Principle` ist eines dieser Konzepte, die so plausibel klingen, dass sie dein Urteilsvermögen leicht überlisten können.

Eine Aufgabe. Gut erledigen. Module fokussiert halten. Code einen Grund zum Ändern geben. Guter Rat.

Dann verwandelt jemand diesen Rat in ein Maßband und erklärt, dass jede Funktion mit mehr als fünf Zeilen ein Code‑Geruch sei.

<p class="inset">Das Problem ist nicht SRP. Das Problem ist, „klein“ als Ersatz für „kohäsiv“ zu behandeln.</p>

An diesem Punkt triffst du die Single‑Purpose People: Entwickler, die nicht falsch liegen, was Modularität angeht, aber nützliche Grenzen mit maximaler Fragmentierung verwechseln.

<figure class="inset-right">
  <figcaption>Gewalt in der Software‑Architektur</figcaption>
![Components, components everywhere](../software-patterns__the-dismembered-architecture.webp "Components, components everywhere")
</figure>

## I. Die nützliche Idee im Kern

> Einen einzigen Checkbox zu einem Formular hinzufügen sollte idealerweise nur eine Datei betreffen. Nicht 8 Dateien in 5 Verzeichnissen… Ich sehe dich an, React/Redux.

Wenn SRP mit Bedacht angewendet wird, hilft es. Code‑Einheiten, die sich auf eine einzige konzeptuelle Aufgabe konzentrieren, sind leichter zu verstehen. Tests können das Verhalten an einer sinnvollen Grenze anvisieren. Klare Module erleichtern das Ändern eines Systemteils, ohne den Rest der Anwendung mit hineinzuziehen.

Selbst die klassischen Unix‑Beispiele sind pragmatischer, als das Schlagwort vermuten lässt. `ls` listet Dateien, ja, aber es koordiniert Aufrufe wie `opendir`, `readdir`, `closedir` und `stat`. Die nützliche Einheit ist nicht die kleinste mögliche Operation. Die nützliche Einheit ist das kleinste kohärente Ding, das die Aufgabe löst.

<p class="inset">Die ursprüngliche Unix‑Philosophie drehte sich um *Komposition* und *Einfachheit*, **nicht darum**, alles auf eine einzige Funktion oder Datei zu reduzieren.</p>

Dieser Unterschied ist entscheidend. „Eine Verantwortung“ ist nicht dasselbe wie „eine Verhaltenszeile“.

## II. Over‑Abstraction: Wenn Einfachheit ins Chaos abdriftet

> Unser Architekt besteht darauf, dass jede Funktion mit mehr als 5 Zeilen ein „Code‑Geruch“ ist. Unser Code‑Base riecht jetzt leicht nach ratloser Verzweiflung.

Der Fehlermodus lässt sich leicht erkennen, nachdem er bereits deine Woche verschlechtert hat.

Der Code‑Base hat mehr Dateien, aber weniger Gestalt. Jeder Helfer hat einen Helfer. Jeder Begriff wurde über Ordner verteilt, die nach technischen Rollen statt nach Produktbedeutung benannt sind. Einen Checkbox‑Haken hinzuzufügen bedeutet, ein Component, einen Hook, einen Selector, eine Action, einen Reducer, eine Konstante, ein Test‑Fixture und einen Barrel‑Export zu berühren, der hauptsächlich existiert, um die Import‑Pfade unschuldig aussehen zu lassen.

<figure class="inset-left">
  <figcaption>Kein Ausweg für dieses unendliche Arbeitsmuster</figcaption>
![Komponenten, überall Komponenten](software-patterns__the-mc-escher-stack.webp "Das MC‑Escher‑Muster")
</figure>

Was hat all diese Reinheit eingebracht?

-   **Dateisystem‑Splitter:** Quellverzeichnisse, die zu alptraumhaften Landschaften aus unzähligen winzigen Dateien aufblühen, oft mit einer einzigen, tragisch einsamen Funktion. Die Navigation wird zu einer Höhlenexpedition.
-   **Abhängigkeits‑Verwicklungen:** Ein Netz aus Importen und Exporten so dicht, dass das Verfolgen der Ausführung ein großes Whiteboard und mehr Geduld erfordert, als das Feature verdient. Dateien, die exakt einmal importiert werden, sitzen dort und tun so, als seien sie wiederverwendbar.
-   **Test‑Tücke:** Tests werden spröde, hyper‑spezifische Wächter, die winzige Implementierungsdetails schützen. Ändert man eine Funktionssignatur? Beobachte, wie Dutzende Tests wie antike Keramik zerbröckeln. Die Test‑Suite verwandelt sich von einem Sicherheitsnetz in ein Minenfeld.
-   **Geschwindigkeit verschwindet:** Einfache Änderungen mutieren zu mehr‑Datei‑Modifikations‑Sagas. Neue Entwickler einzuarbeiten bedeutet Wochen damit zu verbringen, ihnen Karten und Kompasse zu geben, nur um zu finden, wo die `UserProfile`‑Komponente *tatsächlich* diese Woche lebt. Der Fortschritt verlangsamt sich zu einem geologischen Kriechen unter dem schieren Gewicht dieser „Organisation“.

Ich habe in den Abgrund von Codebasen geschaut, in denen ein geradliniges 100‑Zeilen‑Feature über 15 + Dateien hinweg vivisektiert wurde, jede ein „reines“ kleines Engelchen, das vielleicht ein oder zwei Funktionen enthält. Der kognitive Explosionsradius, den man aufbringen muss, um dieses Chaos im Kopf zu behalten, negierte jeden theoretischen Gewinn durch die Trennung völlig. Es war nicht einfacher; es war einfach nur zerstreut.

## III. Der Preis der Perfektion: Auswirkungen auf Entwickler*innen

> Wir verbringen mehr Zeit damit, Dateistruktur und Benennungs‑Konventionen zu diskutieren, als tatsächlich Features zu liefern. Ist das agil?

<figure class="inset-left">
  <figcaption>So unordentlich, dass es an Kunst grenzt</figcaption>
![So messy it borders on art](../software-patterns__the-rube-goldberg-architecture.webp "The Rube Goldberg Pattern")
</figure>

Diese pathologische Fragmentierung ist nicht nur ein ästhetisches Problem. Sie verändert, wie Entwickler*innen ihre Aufmerksamkeit einsetzen:

**Der Produktivitätsverlust:** Vergessen Sie technische Schulden; das ist organisatorische Schuld, die durch zwanghafte Verzeichnisverschachtelung entsteht. Jede noch so kleine Anpassung wird zu einer archäologischen Ausgrabung durch Schichten von Abstraktion. Zeit verschwindet im schwarzen Loch von `cd ..` und `grep`.

**Die Teststeuer:** Anstatt Vertrauen zu schaffen, wird die Test‑Suite zur Reibungsquelle. Stunden schmelzen dahin, weil Tests nach trivialen Refactorings kaputt gehen – Tests, die zu eng an den mikroskopischen Details hängen, die sie eigentlich verifizieren sollten.

**Die kognitive Belastung:** Das menschliche Gehirn hat eine harte Grenze, wie viele lose Informationsstücke es gleichzeitig jonglieren kann. Entwickler*innen zu zwingen, den Programmfluss aus einem Dutzend verstreuter Dateien zusammenzusetzen, behindert das Verständnis aktiv und macht sichere Änderungen schwieriger.

## IV. Pragmatismus annehmen: Eine praktische Alternative

> Ich habe vorgeschlagen, zwei zusammengehörige Funktionen in dieselbe Datei zu packen. Der Raum reagierte, als hätte ich vorgeschlagen, das Staging zu löschen.  
> — Ein sich erholender puristischer Leser

Der Ausweg besteht nicht darin, SRP aufzugeben. Die Lösung liegt darin, es auf der richtigen Bedeutungsebene anzuwenden.

Hier ein Beispiel aus der Praxis:

- **Auf Kohäsion, nicht auf Atome, setzen:** Gruppieren Sie Dinge, die *gemeinsam geändert werden* und konzeptionell *zueinander gehören*. Ein Modul kann mehrere zusammenhängende Aspekte der Benutzer‑Authentifizierung behandeln. Das ist in Ordnung. Es ist wahrscheinlich *besser* als sechs separate Dateien, von denen jede nur eine Funktion zum Login‑Status enthält.
- **Verwandte zusammenhalten:** Teilen Sie zusammengehörigen Code nur dann auf, wenn ein eindeutig offensichtlicher, greifbarer Nutzen entsteht – etwa echte Wiederverwendbarkeit *in der Praxis*, nicht in einem hypothetischen Zukunftsszenario, das nie eintritt. Nähe erleichtert das Verständnis.
- **Die Realität entscheiden lassen:** Organisieren Sie nach den tatsächlichen Features und Workflows Ihrer Anwendung, nicht nach einem abstrakten Ideal funktionaler Reinheit³. Macht diese Struktur es einfacher oder schwerer, `Feature X` zu verstehen und zu ändern?
- **Den Mensch im Blick behalten:** Denken Sie an den armen Entwickler. Welche Struktur reduziert das mentale Jonglieren, das nötig ist, um am Code zu arbeiten? Optimieren Sie für menschliches Verständnis.
- **Testen, was zählt:** Schreiben Sie Tests, die das Verhalten an einer sinnvollen Grenze verifizieren, nicht Tests, die bis ins kleinste Detail an die interne Verdrahtung jeder winzigen Funktion gekoppelt sind. Ziel ist Vertrauen, nicht nur ein hohes Coverage‑Prozent‑Theater.

<p class="inset">Das Ziel ist nicht theoretische Perfektion, die einer Doktorarbeit würdig wäre; es geht darum, Code zu schaffen, den Ihre Kolleg*innen (und Ihr zukünftiges Ich) navigieren, verstehen und ändern können, ohne das Gebäude niederbrennen zu wollen.</p>

Manchmal bedeutet das, dass eine Datei 200 Zeilen lang ist statt 50. Manchmal übernimmt eine Funktion das Abrufen von Daten *und* deren leichte Transformation. Manchmal hat eine Klasse zwei Verantwortlichkeiten, die so eng gekoppelt sind, dass sie zusammenleben sollten. Wenn das Gesamtsystem dadurch leichter zu handhaben ist, ist das wahrscheinlich die richtige Entscheidung.

Bleiben Sie beharrlich fokussiert auf die praktischen Fragen:
- Kann jemand Neues sich zurechtfinden?
- Können wir `X` ändern, ohne das unverwandte `Y` zu brechen?
- Zeigt dieser Test tatsächlich, ob das Feature funktioniert?
- Liefern wir Mehrwert oder schichten nur Ordner um?

## V. Fazit: Kohäsiven und wartbaren Code fördern

Das Single‑Responsibility‑Prinzip ist ein nützliches Werkzeug. Es ist kein Befehl, den gesamten Code‑Base in atomaren Staub zu zerkleinern. Wie jedes Werkzeug hängt sein Wert vom Urteil der Person ab, die es einsetzt.

Wenn Sie also den „Single‑Purpose‑People“ begegnen, die bereit sind, jeden Funktionsaufruf anzugreifen, der mehr als drei Zeilen umfasst, atmen Sie tief durch. Denken Sie an das 12‑Datei‑Kästchen.

Unsere Aufgabe ist nicht, theoretisch makellose Schneeflocken‑Funktionen zu konstruieren. Unsere Aufgabe ist, Software zu bauen, die funktioniert, Probleme löst und den nächsten Entwickler nicht bestraft, der sie berühren muss.

Bleiben Sie pragmatisch. Konzentrieren Sie sich auf Ergebnisse. Lassen Sie nicht zu, dass das Streben nach perfekter Reinheit zum Feind wartbaren Codes wird. Ihr Verstand und die Geschwindigkeit Ihres Teams hängen davon ab.

¹ Die Ironie dabei ist, dass das Erreichen *tatsächlicher* Einzelaufgaben auf den tiefsten Ebenen enorme Komplexität erfordert, die knapp unter der Oberfläche verborgen bleibt.

² Hier geht es um konzeptuelle Reinheit: die Vorstellung, dass eine Funktion logisch nur „eine Sache“ tun sollte. Verwechseln Sie das nicht mit dem Konzept einer „reinen Funktion“ aus der funktionalen Programmierung, die keine Seiteneffekte hat – das ist ein anderer, wenn auch manchmal verwandter Gedanke.
````
