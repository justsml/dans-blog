# Translation Candidate
- Slug: honest-priorities
- Locale: de
- Model: openrouter/qwen/qwen3-32b:nitro
- Target: src/content/posts/2024-10-23--honest-priorities/de/index.mdx
- Validation: passed
- Runtime seconds: 19.63
- Input tokens: 6677
- Output tokens: 6303
- Thinking tokens: unknown
- Cached input tokens: 2048
- Cache write tokens: 0
- Estimated cost: $0.002047
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
social_image: ../desktop-social.webp
title: Die Prioritätenfalle
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
## Der `Priority`-Dropdown-Haken

<aside className="breakout">
💡 Wächst ein Unternehmen, wird zwangsläufig ein wachsendes Backlog entstehen. Schließlich wird die Größe der Liste *Priorisierung erzwingen*.
</aside>

## Eine Start-up-Geschichte

Ohne Ausnahme wird der Jira-Admin eine Lösung parat haben: Seht her, ein `Priority`-Dropdown-Feld! (Pro-Tipp für Enterprise-Entwickler: eventuell als `Priority2` oder `P-level` benannt.)

Erstaunlicherweise wählen 100 % aller Unternehmen entweder `P1, P2, P3, P4` oder `Low, Med, High, und Critical` – scheinbar gibt es keine anderen Optionen.

Eine hartcodierte Liste mit vier Optionen? Okay. Probieren wir es ein paar Wochen lang aus...

### 2 Tage später  

In einer *überraschenderweise für niemanden* überraschenden Wendung entdeckte die Organisation ein Ticket mit einer neuen, höheren Priorität, was einen kleinen Hack erforderte: Hinzufügen von `P0`, oder `Critical Max+`!  

### 3 weitere Tage  

*Unser mutiger Chef hatte einige spannende Meetings & Entdeckungen auf der Konferenz!*  

Einige haben irgendwie ein noch höheres Prioritätsniveau als `P0` entdeckt!  

Seither forscht das Team in den Köpfen versunken, wie man dieses neue Priority-Level bezeichnen könnte.

Vielleicht `-1`? Nein, nein. Das ist zu verwirrend (`P-1` vs. `P1`). Okay, wie wäre es mit `P0.5`, nein?  

<p className="breakout">In einem „inspirierten“ Moment erfand das Team eine höhere Priorität: die doppelte Null!<br />Nun bekannt als die `P00`-Priorität.</p>  

{/* *Schließlich können wir alles in der Welt sauber in unser Prioritäten-Auswahlfeld einordnen! (…böses Lachen…)* */}  

### Vor der Flut  

Bevor jemand es sich versieht, ertrinkt das Team irgendwie in `P00`-Tickets!  

<b>Wie können wir dieses lächerliche Spiel des Engineering Theater vermeiden?</b>

## Was wäre, wenn Priorität keine Multiple-Choice wäre?

Wie könnten wir ein ständig wechselndes, flüssiges Konzept wie `Priorität` besser darstellen?

- In der realen Welt ändern und entwickeln sich Prioritäten ständig anhand neuer Informationen, Marktwandel und organisatorischer Ziele.
- Oft gibt es eine komplexe Wechselwirkung zwischen Dringlichkeit, Wichtigkeit, Ressourcenverfügbarkeit und Kosten/Risiko-Analyse, die ein einfaches Auswahlfeld nicht erfassen kann, besonders im Laufe der Zeit. (Ticket-Verrottung.)
- Verschiedene Stakeholder haben oft widersprüchliche Auffassungen davon, was eine hohe Priorität ausmacht, weshalb ein "einfacher-Größe-fits-all-Ansatz" ungeeignet ist.

## Was als Nächstes?

Es gibt mehrere alternative Ansätze, die es wert sind, untersucht zu werden – von geringem bis hohem Aufwand:

- Um mehr Flexibilität und Spielraum zu bieten, wählen Sie einen „neutralen“ Startwert, z. B. 100 oder 1.000. Sie können die Zahl immer erhöhen oder verringern.
    - Oder beginnen Sie mit Null, wobei höhere Zahlen höhere Priorität haben.
- Implementieren Sie ein multidimensionales Priorisierungssystem, das Faktoren wie Geschäftsbedeutung, Dringlichkeit und erforderlichen Aufwand berücksichtigt. (Erstellen Sie einen `composite`-Wert, um Sortieren und Filtern zu erleichtern.)
- Verwenden Sie eine dynamische Priorisierungs-Methode, z. B. die [MoSCoW-Methode](https://en.wikipedia.org/wiki/MoSCoW_method) (Muss haben, Soll haben, Könnte haben, Wird nicht haben), die regelmäßige Neubewertungen ermöglicht. (Siehe auch das [Kano-Modell](https://en.wikipedia.org/wiki/Kano_model).)

## Zusammenfassung

Zu viel Gewicht wird der Priorität beigemessen, obwohl sie sich rasch veraltet. Gestern noch als `CRITICAL` eingestufte Tickets sind vermutlich nicht die `CRITICAL`-Tickets des nächsten Quartals.

Im Laufe der Zeit werden ältere hochpriorisierte Tickets widerstandsfähig gegenüber Bereinigung und Wartung. Schließlich möchte niemand die `Priorität` von etwas senken, das einst als ***unbedingt notwendig*** deklariert wurde. Schon gar nicht die irrelevanten Tickets löschen… (Gasp! Denken Sie an den Backlog!)

Ich habe mehrere Unternehmen dabei beobachtet, wie sie `Severity` und `Priority` verwechseln. `Severity` beschreibt ***Dringlichkeit*** (oder Zeitkritisches).

`Priorität ≠ Schweregrad`. Es kann Sinn machen, 3–5 Schweregradstufen zu definieren (häufig verwendet, um Service-Level-Verträge einzuhalten).

Die Dringlichkeitsstufen helfen dabei, von `keinem Kundenimpact` bis zu `Teil-/vollständigem Dienstausfall` zu kommunizieren.

## Ein Wort der Warnung  

Ein unbeschränktes Prioritätsfeld einzusetzen, erfordert etwas Planung und Disziplin!  

Wenn Sie sich mit Frontend-Entwicklung auskennen, haben Sie wahrscheinlich bereits einen `z-Index-Krieg` erlebt.  

Im Prinzip erlaubt `z-index` es, *beliebige* positive Zahlen zu setzen, um sicherzustellen, dass Widgets sich über anderen Inhalten mit niedrigerem `z-index` darstellen.  

Selbst eine kleine Komponentenaktualisierung könnte eine Änderung am `z-index` ihres `<Dialog />`-Elements mit sich bringen – und plötzlich unsichtbar machen. Solche Situationen können chaotisch werden, wenn Drittanbieter-Komponenten, Feature-Entwicklungen und andere Teambeiträge versuchen, sich gegenseitig zu übertreffen.  

`Z-index` war einst auf ~32.000 begrenzt. Doch kürzlich habe ich ein Snippet mit einem z-Index von einer Milliarde gesehen: `z-index: 1000000000`!

Inflation trifft `z-index` schwer.

## Diskutieren

- Ist dies ein wertvolles Gedankenexperiment?
- Ist die Idee einer immer weiter ansteigenden Priorität schrecklich? Angst erregend?
- Ist es unvermeidlich, dass sich dieser Ansatz schließlich die 64-Bit-Grenzen überschreitet?
- Können andere Felder (jenseits von `Severity` oder `Urgency`) zu diesem Gespräch beitragen?
- Wie viel Schuld trifft Jira? Oder wie viel Anerkennung?

Wir könnten ins Internet schreien: „Wer wird all diese `P00`-Tickets aufräumen?“

Oder, Sie können ***echt*** mit Ihrem Backlog umgehen.

- Akzeptieren Sie, dass 90 % Ihrer 1.000 Tickets niemals abgeschlossen werden. Es ist in Ordnung.
- Archivieren Sie Tickets, die seit Monaten nicht berührt wurden. Jede ursprüngliche Priorität/Dringlichkeit ist nicht mehr relevant. Schließlich können archivierte Probleme oft wiederhergestellt werden.
- Wenn ein Problem zurückkehrt, ist das cool; es hat einfach seine Priorität erhöht.
- Anhand meiner Erfahrung habe ich null Schaden davon gesehen, ältere und unvollständige Tickets zu entsorgen.
- Endlos an ein Backlog als Datenbank anzuhängen, verpasst die Gelegenheit, Ihr Team und Ihre Organisation auf das zu fokussieren, was zählt. (Dinge, die vor uns liegen. Während Backlogs inhärent nach hinten schauen.)
- Ein tiefes Backlog endet wie ein Bizzaro-Trophäensaal, der die Scheiße ehrt, die du nie lieferst.
````
