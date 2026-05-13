# Translation Candidate
- Slug: upgrade-from-gatsby-to-astro
- Locale: de
- Model: openrouter/openai/gpt-oss-120b:nitro
- Target: src/content/posts/2024-08-22--upgrade-from-gatsby-to-astro/de/index.mdx
- Validation: deferred
- Runtime seconds: 6.05
- Input tokens: 9718
- Output tokens: 2840
- Thinking tokens: unknown
- Cached input tokens: 3968
- Cache write tokens: 0
- Estimated cost: $0.000890
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
social_image: ../desktop-social.webp
title: Erfahrungen beim Upgrade meines Blogs
subTitle: 'Astro, Tailwind,MDX, Pagefind und mehr!'
date: '2024-08-21'
modified: '2024-08-23'
category: Guides
tags:
  - astro
  - tailwind
  - mdx
  - pagefind
  - gatsby
cover: ../galaxy-contribution-mode.webp
cover_full_width: ../galaxy-contribution-banner.webp
cover_mobile: ../w300_galaxy-contribution-mode.webp
cover_icon: ../icon_galaxy-contribution-mode.webp
---
Kürzlich habe ich mich daran gemacht, meine über 8 Jahre alte Gatsby‑v1‑Seite zu aktualisieren.

Dieser Blog‑Beitrag teilt einige Erkenntnisse, die ich dabei gewonnen habe, sowie die interessanten Technologien, die ich ausprobiert habe.

## Inhaltsverzeichnis

- [Projektanforderungen](#project-requirements)
- [Auswahl des richtigen Technologie‑Stacks](#choosing-my-right-technology-stack)
- [Astro: Lernkurve und Kernfeatures](#astro-learning-curve-and-key-features)
- [Modernes CSS: Wow](#modern-css-wow)
- [Suche: Pagefind](#search-pagefind)
- [Kommentare: Utterances](#comments-utterances)
- [Tailwind: Bedauern](#tailwind-regrets)
- [Fazit](#conclusion)

## Projektanforderungen

Bevor ich mit dem Upgrade begann, habe ich eine Reihe von Anforderungen definiert:

Da mein Blog täglich stark schwankende Besucherzahlen hat, wollte ich eine statisch vorgerenderte Seite, die die gewünschte Performance liefert, ohne zusätzliche Komplexität.

Außerdem musste ich den bestehenden Inhalt und die Funktionen der Seite erhalten, darunter:

- Code‑Highlighting
- Kommentare
- Seitensuche
- Vorhandene React‑Komponenten: Quiz‑UI, Gist‑Einbettungen
- Kontaktformular
- Responsive Bilder
- Ladezeit unter einer Sekunde
- Browser‑Kompatibilität: 2018+
- Automatisierte + PR‑basierte Deployments

## Auswahl des richtigen Technologie‑Stacks

Im Laufe der Jahre habe ich mit vielen Static‑Site‑Tools gearbeitet, von Jekyll, Hugo, Slate bis hin zu Gatsby. Ebenso mit zahlreichen Front‑End‑Frameworks: Ember, Knockout, Angular, Vue und natürlich React.

Damit standen mir exakt zu viele Optionen zur Verfügung, die ich letztlich auf **Remix**, **Next.js** und **Astro** eingrenzte.

Ich könnte eine ganze Blog‑Serie über meinen Evaluationsprozess schreiben, aber ich fasse es hier zusammen:

<p class="breakout">Ich habe [Astro](https://astro.build) gewählt, weil ich damit _schnell sinnvolle Dinge erledigen_ konnte.</p>

Das API‑Design ist erfrischend simpel. Es bietet ein [gutes Gleichgewicht zwischen Flexibilität und durchdachten Design‑Entscheidungen.](https://docs.astro.build/en/concepts/why-astro/)

Es war beruhigend, dass Astro keinerlei offensichtliche Cloud‑Voreingenommenheit oder Framework‑Agenda aufweist.

Astro war nicht die einzige Technologie, die ich eingesetzt habe; hier ein vollständiger Überblick über den Stack:

- [Astro](https://astro.build): Ein moderner Static‑Site‑Generator.
- [ShadcnUI](https://ui.shadcn.com): Eine Sammlung wiederverwendbarer Komponenten.
- [Tailwind CSS](https://tailwindcss.com): Ein Utility‑First‑CSS‑Framework.
- [MDX](https://mdxjs.com): Markdown‑Inhalte + inline Komponenten.
- [Pagefind](https://pagefind.app): Schnelle, statische & offline Site‑Suche. Keine Algolia nötig!
- [Utterances](https://utteranc.es): Kommentarsystem basierend auf GitHub‑Issues.
- [Netlify](https://www.netlify.com): Automatisierte Deployments, Kontaktformular mit Captcha.

## Astro: Lernkurve und Kernfunktionen

<p class="breakout quote">Astro wurde schnell zum Grundpfeiler meines Upgrades.</p>

Hier sind einige Schlüssel‑Features, die ich besonders nützlich fand:

- `.astro`‑Dateien: Auf den ersten Blick ähneln Astro‑Komponenten React‑JSX‑Komponenten, doch sie unterscheiden sich grundlegend und verfolgen andere Ziele. (Siehe Vergleichstabelle unten.)
- Angetrieben von eigenen Golang‑[Build‑Tools](https://github.com/withastro/compiler) und Vite: Es funktioniert einfach. Handhabt nahtlos ESM/CJS, TypeScript, Code‑Bundling, Styles, Bilder usw.
- [Kein Framework‑Bias](https://docs.astro.build/en/guides/framework-components/#official-ui-framework-integrations) und kein [Cloud‑Bias](https://docs.astro.build/en/guides/deploy/) (*Hust* Next.js, OpenNext)
- [Static vs. hybrid](https://docs.astro.build/en/basics/rendering-modes/) Rendering: Astro bietet [Flexibilität für die meisten Cloud‑Plattformen](https://docs.astro.build/en/guides/deploy/): AWS, GCP, Firebase, Netlify, Vercel, Cloudflare Pages, Azure, Fly.io und viele weitere.
- Content‑Collections: Die [`getCollection`](https://docs.astro.build/en/reference/api-reference/#getcollection)‑API vereinfacht die Arbeit mit Inhaltsdateien als Datenquelle.
- File‑basiertes Routing: Astros dateibasiertes Routing‑System in Kombination mit `getStaticPaths` macht das Generieren von Seiten zum Kinderspiel.
- SEO: [Astro steht dir nicht im Weg](https://github.com/justsml/dans-blog/blob/010c5cb58bb327adb8c8fff608594daa612ad9d5/src/components/BaseHead.astro#L43-L63) und gibt nur dann minimalen Boiler‑Code (`astro-island`) aus, wenn er wirklich nötig ist.

Einige Dinge überraschten mich etwas, etwa das Styling um Astros injiziertes Markup und die Wirkung von `display:contents`.

```tsx
```

<style>astro-island,astro-slot,astro-static-slot{display:contents}</style>

```

### Vergleich von `.astro`‑Dateien und Client‑Komponenten

Astro‑Komponenten sind im Wesentlichen HTML‑Templates mit einem leistungsstarken Komponenten‑ und Props‑Muster. Sie können Daten zur Build‑Zeit holen, auf Backend‑Ressourcen zugreifen und bestimmte sensible Informationen verborgen halten.

Der einfachste Weg, Astro‑`.astro`‑Komponenten zu verstehen, ist der Vergleich mit client‑seitigen Komponenten (React, Vue, Svelte usw.).

<section className="scroll-x">
| Was muss erledigt werden?                                                            | `.astro`‑Komponente    | Client‑Komponente    |
| ------------------------------------------------------------------------------------ | ---------------------- | -------------------- |
| HTML mit starkem Template‑+‑Komponenten‑Muster erzeugen                              | ✅ | ❌ |
| Daten zur Build‑Zeit holen                                                          | ✅ | ❌ |
| Direkt auf Backend‑Ressourcen zugreifen                                             | ✅ | ❌ |
| Sensitive Informationen verbergen (Access‑Tokens, API‑Keys usw.)                     | ✅ | ❌ |
| Client‑seitiges JavaScript reduzieren                                                | ✅ | ❌ |
| Client‑Komponenten nutzen (React, Vue, Svelte usw.)                                 | ✅ | ✅ |
| Interaktivität und Event‑Listener hinzufügen (`onClick()`, `onChange()` usw.)       | ❌ | ✅ |
| State‑ und Lifecycle‑Effekte verwenden (`useState()`, `useReducer()`, `useEffect()` usw.) | ❌ | ✅ |
| Nur‑Browser‑APIs verwenden                                                          | ❌ | ✅ |
| Custom‑Hooks, die von State, Effects oder nur‑Browser‑APIs abhängen                 | ❌ | ✅ |
</section>

## Modernes CSS: Wow

Zurück zum Frontend‑Entwickeln war ich von den Fortschritten im nativen CSS begeistert:

- CSS‑Variablen: Seit einiger Zeit verfügbar und in den meisten Browsern seit 202* stabil.
- Nesting: Endlich im Standard und ohne die früher umständliche Syntax. Jetzt ähnelt es Less oder SCSS.
- Neue Selektoren: [`:is()`, `:where()` und `:has()`](https://www.youtube.com/watch?v=3ncFpP8GP4g) ermöglichen präzisere Zielsetzung von Elementen.
- Moderne Einheiten wie `ch`, `vw` und Funktionen wie `clamp()` bieten bessere Kontrolle über Layouts und Typografie.
- Abstand natürlicher setzen mit den Attributen `-inline` und `-block`. Padding oder Margin entweder horizontal oder vertikal festlegen. Statt `margin: 0 1rem 0 1rem` → `margin-inline: 1rem`.
- Fortgeschrittene Layouts: CSS‑Grid neu entdecken. Wow, da steckt eine Menge Kram drin. Es kann überwältigend sein, weil es scheinbar unendlich viele Anwendungsmöglichkeiten gibt. Wichtig ist, dass man sich mit ein‑ oder zwei Methoden zufriedengeben kann. Diese großartigen Ressourcen haben mir geholfen, Tricks mit Grid zu meistern: [Kevin Powells Video: Learn CSS Grid the easy way](https://www.youtube.com/watch?v=rg7Fvvl3taU), [Responsive w/o media queries](https://ardilamorin.com/responsive-no-media-queries/), [Ten modern layouts in one line of CSS](https://web.dev/articles/one-line-layouts).

## Search: Pagefind

Eine **Seitensuche** zu implementieren, ohne Drittanbieter‑Dienste oder Datenbank‑Hosting, schien eine spaßige Herausforderung zu sein. Schließlich habe ich noch nicht 10 000 Beiträge zu indexieren (noch nicht).

Beim Durchstöbern der [Astro‑Community‑Integrationen](https://astro.build/integrations/?search=find) bin ich auf ein fantastisches Tool gestoßen, das ich gerne früher gekannt hätte: [Pagefind](https://pagefind.app/).

<p class="breakout quote">Nur wenige Werkzeuge lösen ein Problem so gut, wie Pagefind die lokale Seitensuche löst.</p>

Die Implementierung von Pagefind ist überraschend einfach – ein echter Genuss. Es lässt sich in **jedem** statischen Seiteninhalt integrieren, und Sie können entscheiden, ob Sie die Standard‑UI verwenden oder eine komplett eigene Oberfläche bauen wollen.

Damit war sofort alles abgedeckt, was ich brauchte. Die Integration dauerte nur wenige Minuten, und der meiste Aufwand bestand darin, ein `<div id="search"></div>`‑Tag einzufügen und etwas Styling hinzuzufügen!

## Kommentare: Utterances

Leider musste ich mich von Disqus und den über Jahre angesammelten Kommentaren verabschieden.

Ich wollte mehr Kontrolle und Transparenz über die Drittanbieter‑Skripte auf meiner Seite.

Außerdem muss es einfach und wartbar bleiben.

Das brachte mich dazu, den fantastischen [Utterances](https://utteranc.es/)-Dienst zu wählen. Sein auf GitHub‑Issues basierendes Kommentarsystem passt gut zu meinem Publikum. Außerdem ist er leicht einzurichten und kostenlos.

## Tailwind: Bedauern

Es gibt nur ein Stück Technologie, das ich zunehmend bereue zu verwenden: Tailwind.

Im Laufe der Zeit spüre ich den Kostenunterschied zwischen Schreiben und Pflegen. Tailwind lässt sich sehr schnell schreiben, aber sobald es komplex genug wird, kann es mühsam zu lesen und zu erweitern sein.

## Fazit

Mein altes Gatsby‑v1‑Projekt auf einen modernen Stack rund um Astro zu migrieren war ein spaßiges Erlebnis. 10/10 würde ich es weiterempfehlen.

Wenn Sie ein altes Projekt aktualisieren oder eine neue statische (oder hybride) Website bauen wollen, sollten Sie sich Astro unbedingt ansehen. Der Lernaufwand kann gelegentlich hoch sein, aber die Vorteile in puncto Performance, Entwickler‑Erlebnis und Zukunftssicherheit des Projekts rechtfertigen den Aufwand voll und ganz.
````
