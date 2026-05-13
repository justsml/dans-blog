# Translation Candidate
- Slug: you-might-not-need-algolia
- Locale: de
- Model: openrouter/openai/gpt-oss-120b:nitro
- Target: src/content/posts/2025-03-01--you-might-not-need-algolia/de/index.mdx
- Validation: deferred
- Runtime seconds: 3.14
- Input tokens: 6017
- Output tokens: 1539
- Thinking tokens: unknown
- Cached input tokens: 3584
- Cache write tokens: 0
- Estimated cost: $0.000512
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
title: Vielleicht benötigen Sie Algolia™ nicht
social_image: ../desktop-social.webp
subTitle: Statische Websites benötigen wahrscheinlich keine gehostete Suche
tags:
  - search
  - algolia
  - pagefind
  - cdn
date: '2025-03-01'
modified: '2025-03-05'
category: Search
cover_full_width: ../synth-wave-city-wide.webp
cover_mobile: ../synth-wave-city-200-square.webp
cover_icon: ../synth-wave-city-200-square.webp
cover_credit: Image by Dan Levy
---
Die meistenEntscheidungen für die Seitensuche werden zu spät getroffen.

Wenn jemand sagt „Wir sollten Algolia verwenden“, hat das Team meist die entscheidende Frage übersprungen: Welche Art von Inhalt wollen wir durchsuchen?

Falls die Antwort „HTML‑Seiten, die wir bereits bauen“ lautet, sollte **[Pagefind](https://pagefind.app/)** das Erste sein, das Sie ausprobieren. Nicht weil Algolia schlecht ist – Algolia löst viele schwierige Probleme sehr gut. Aber wenn sich Ihr Suchindex bei jedem Site‑Deploy ändert, kann ein gehosteter Suchdienst nur ein unnötiges Infrastruktur‑Kostüm sein.

<p class="inset">Verwenden Sie Pagefind, wenn Ihr durchsuchbarer Inhalt zur Build‑Zeit erzeugt wird. Greifen Sie zu Algolia, wenn die Suche Live‑Writes, Geschäftsregeln, benutzerspezifische Ranglisten oder betriebliche Garantien verarbeiten muss, die ein statischer Build nicht bieten kann.</p>

Diese Regel gilt für mehr Websites, als man erwarten würde: Blogs, Dokumentation, Marketing‑Seiten, interne Handbücher, Produkt‑Guides, Kurskataloge und überraschend viele „Apps“, die hauptsächlich Seiten veröffentlichen.

## Die Form des Problems

Algolia stellt Ihnen ein externes Suchsystem bereit. Sie erstellen Datensätze, schieben sie in einen Index, konfigurieren das Ranking, binden eine UI ein und halten das System synchron zu Ihrer Quelle der Wahrheit.

Pagefind betrachtet das HTML, das Sie bereits ausgeliefert haben, und erzeugt daneben einen statischen Suchindex.

Diese Unterscheidung klingt zunächst unspektakulär – bis Sie die Integration pflegen müssen.

Mit Algolia hat Ihre Site eine zweite Kopie Ihres Inhalts. Jetzt müssen Sie Fragen beantworten wie:

- Ist die Bereitstellung abgeschlossen, aber das Index‑Update fehlgeschlagen?
- Welche Felder sind kanonisch: die CMS‑Felder, die gerenderte Seite oder der Such‑Datensatz?
- Wer ist für Ranking‑Anpassungen verantwortlich, wenn sie nicht mehr zur Seite passen?
- Was passiert, wenn sich herausstellt, dass das kostenlose Kontingent nicht dem tatsächlichen Traffic‑Muster entspricht?

Manchmal sind diese Fragen gerechtfertigt. Für einen Marktplatz, ein Support‑Portal oder einen großen E‑Commerce‑Katalog schon. Für eine statische Dokumentations‑Website hingegen sind sie oft selbstverschuldete Komplexität.

## Pagefind funktioniert, weil es das zusätzliche System ablehnt

Der Trick von Pagefind ist kein Zauber. Es ist Geschmack.

Es wartet, bis Ihre Seiten existieren, indexiert das fertige HTML und erzeugt eine Sammlung statischer Assets, die Sie auf demselben CDN wie den Rest Ihrer Site bereitstellen können. Der Browser lädt nur die Teile herunter, die er benötigt. Es gibt keinen Such‑Server, den man warm halten muss, keine Crawling‑Quote, die man überwachen muss, und keine Webhook‑Pipeline, die sich merken muss, was sich geändert hat.

Damit ist das Fehlermuster viel leichter zu verstehen:

- Wenn die Seite bereitgestellt wurde, stammt der indizierte Inhalt von dieser Seite.
- Wenn die Seite nicht bereitgestellt wurde, können Nutzer sie ohnehin nicht sehen.
- Wenn die Suche falsche Ergebnisse liefert, liegt das Problem meist im gerenderten Markup oder in der Pagefind‑Konfiguration, nicht in einem entfernten Synchronisations‑Job.

Genau deshalb mag ich Pagefind für Content‑Sites. Der Index folgt dem Artefakt.

## Wie die Einrichtung tatsächlich aussieht

Für eine reine statische Site ist der Workflow angenehm schlicht:

- **CLI**: Durchsucht die HTML‑Dateien Ihrer Site, erzeugt einen Index und stellt ihn innerhalb weniger Minuten als globale CDN‑Assets bereit.  
- **Static Site Generators**: Nutzen Sie die PageFind‑Plugins für Astro oder Hugo, um den Indexierungsprozess zu automatisieren.  
- **Custom Solutions**: Verwenden Sie die PageFind‑API, um maßgeschneiderte Sucherlebnisse zu bauen, die exakt Ihren Anforderungen entsprechen.  

<figure>
  <figcaption>Indexierung meiner Site mit dem PageFind‑CLI</figcaption>
  ![Indexing my site with PageFind](../PageFind-Cleaner-better-15fps-720p2.webp "Indexing my site with PageFind")
</figure>

Der [Getting Started](https://pagefind.app/docs/)‑Leitfaden reicht aus, um loszulegen. Der bessere Test ist operativ: Können Sie den Index im CI neu bauen, das Ergebnis deployen und jedes Suchmissverständnis durch Inspektion des gerenderten HTML erklären?

## Wo Algolia noch Vorteile hat

Pagefind ist kein winziger Algolia, der sich als Trenchcoat tarnt. Es ist eine andere Antwort.

Setzen Sie Algolia, OpenSearch, Postgres‑Suche oder ein anderes Live‑System ein, wenn Ihr Suchindex unabhängig von einem Site‑Deploy geändert werden muss.

Dazu gehören:

- Bestandszahlen, die alle paar Minuten wechseln  
- Benutzer‑spezifische Berechtigungen oder private Ergebnisse  
- Benutzerdefinierte Ranglisten, gesteuert durch Umsatz, Frische, Beliebtheit oder Experimente  
- Föderierte Suche über Systeme, die nicht zu einer statischen Site zusammengeführt werden  
- Analytik‑ und Betriebsunterstützung, die ein Unternehmen von einem verwalteten Anbieter erwartet  

Das sind reale Anforderungen. Zu behaupten, Pagefind könne sie erledigen, weil es schnell ist, wäre die andere Art von Vendor‑Blog‑Stimme.

## Die Entscheidung, die ich treffe

Stellen Sie zunächst eine Frage:

> Kann der Suchindex aus derselben statischen Ausgabe, die die Nutzer gerade betrachten, neu aufgebaut werden?

Falls ja, beginnen Sie mit Pagefind. Sie erhalten standardmäßig private Suche, CDN‑freundliche Assets und ein Service‑Konto weniger, das konfiguriert werden muss.

Falls nein, benennen Sie den Grund, warum der Index dynamisch sein muss: Inventar, Berechtigungen, Personalisierung, Analytik, Ranking oder Schreib‑Frequenz. Anschließend wählen Sie die Datenbank oder den Suchdienst, der diese Aufgabe explizit übernimmt.

Algolia ist hier nicht der Bösewicht. Der eigentliche Bösewicht ist das Hinzufügen eines zweiten Systems, bevor nachgewiesen wurde, dass das erste Artefakt nicht ausreicht.
````
