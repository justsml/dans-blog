# Translation Candidate
- Slug: upgrade-from-gatsby-to-astro
- Locale: it
- Model: qwen/qwen3.6-35b-a3b
- Target: src/content/posts/2024-08-22--upgrade-from-gatsby-to-astro/it/index.mdx
- Validation: deferred
- Runtime seconds: 111.02
- Input tokens: 6637
- Output tokens: 24169
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- Estimated cost: $0.025165
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
social_image: ../desktop-social.webp
title: Lessoni apprese aggiornando il mio blog
subTitle: 'Astro, Tailwind, MDX, Pagefind e molto altro!'
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
Di recente ho avviato l'aggiornamento del mio sito Gatsby v1, datato oltre 8 anni.

In questo post condivido alcune lezioni apprese durante il processo e le tecnologie interessanti che ho esplorato.

## Indice

- [Requisiti del progetto](#project-requirements)
- [Scelta dello stack tecnologico](#choosing-my-right-technology-stack)
- [Astro: Curva di apprendimento e funzionalità chiave](#astro-learning-curve-and-key-features)
- [CSS moderno: Wow](#modern-css-wow)
- [Ricerca: Pagefind](#search-pagefind)
- [Commenti: Utterances](#comments-utterances)
- [Tailwind: Rimpianti](#tailwind-regrets)
- [Conclusioni](#conclusion)

## Requisiti del progetto

Prima di iniziare l'aggiornamento, ho definito una serie di requisiti:

Dato che il mio blog registra un numero di visite giornaliere estremamente variabile, ritengo che un sito pre-generato staticamente offra le prestazioni desiderate senza introdurre complessità aggiuntive.

Inoltre, dovevo mantenere i contenuti e le funzionalità esistenti del sito, tra cui:

- Evidenziazione della sintassi
- Commenti
- Ricerca nel sito
- Componenti React preesistenti: Quiz UI, embed di Gist
- Modulo di contatto
- Immagini responsive
- Tempo di caricamento < 1s
- Compatibilità browser: 2018+
- Deploy automatizzati e basati su PR

## Scelta dello stack tecnologico

Nel corso degli anni ho lavorato con numerosi strumenti per siti statici, da Jekyll, Hugo, Slate a Gatsby. E con molti framework front-end: Ember, Knockout, Angular, Vue e, naturalmente, React.

Avevo esattamente troppe opzioni, che alla fine ho ristretto a **Remix**, **Next.js** e **Astro**.

Potrei scrivere un’intera serie di post sul mio processo di valutazione, ma lo riporto qui in sintesi:

<p class="breakout">Ho scelto [Astro](https://astro.build) per la velocità con cui potevo _fare cose concrete_.</p>

Il design della loro API è sorprendentemente semplice. Rappresenta un [ottimo equilibrio tra flessibilità e solide opinioni di design.](https://docs.astro.build/en/concepts/why-astro/)

Mi rassicurava il fatto che Astro non mostrasse alcuna preferenza evidente per un cloud provider specifico né un’agenda framework-driven.

Astro non è stata l’unica tecnologia utilizzata, ecco un riepilogo completo dello stack:

- [Astro](https://astro.build): Un generatore di siti statici moderno.
- [ShadcnUI](https://ui.shadcn.com): Una collezione di componenti riutilizzabili.
- [Tailwind CSS](https://tailwindcss.com): Un framework CSS utility-first.
- [MDX](https://mdxjs.com): Contenuti Markdown + componenti inline.
- [Pagefind](https://pagefind.app): Libreria di ricerca per siti statica, veloce e offline. Non serve Algolia!
- [Utterances](https://utteranc.es): Sistema di commenti basato sugli issue di GitHub.
- [Netlify](https://www.netlify.com): Deploy automatizzati, modulo di contatto con captcha.

## Astro: Curva di apprendimento e funzionalità chiave

<p class="breakout quote">Astro è rapidamente diventato il pilastro del mio upgrade.</p>

Ecco alcune funzionalità chiave che ho trovato particolarmente utili:

- File `.astro`: A prima vista, i componenti Astro possono sembrare simili ai JSX di React, ma sono fondamentalmente diversi e perseguono obiettivi differenti. (Vedi tabella di confronto sotto.)
- Basato sui propri [tool di build](https://github.com/withastro/compiler) in Go e su Vite: funziona e basta. Gestisce in modo trasparente ESM/CJS, TypeScript, bundling del codice, stili, immagini, ecc.
- [Nessun bias verso framework specifici](https://docs.astro.build/en/guides/framework-components/#official-ui-framework-integrations) o [bias verso il cloud.](https://docs.astro.build/en/guides/deploy/) (*Tossisce* Next.js, OpenNext)
- Rendering [statico vs. ibrido](https://docs.astro.build/en/basics/rendering-modes/): Astro offre [flessibilità per il targeting della maggior parte delle piattaforme cloud](https://docs.astro.build/en/guides/deploy/): AWS, GCP, Firebase, Netlify, Vercel, Cloudflare Pages, Azure, Fly.io e molte altre.
- Content collections: L'API [`getCollection`](https://docs.astro.build/en/reference/api-reference/#getcollection) semplifica la gestione dei file di contenuto come fonte dati.
- Routing basato sui file: Il sistema di routing di Astro, combinato con `getStaticPaths`, rende la generazione delle pagine un'operazione semplice.
- SEO: [Astro non si mette di mezzo](https://github.com/justsml/dans-blog/blob/010c5cb58bb327adb8c8fff608594daa612ad9d5/src/components/BaseHead.astro#L43-L63) e genera solo una quantità minima di ~~detriti~~ boilerplate (`astro-island`) quando necessario.

Alcuni aspetti sono risultati un po' sorprendenti, come lo styling del markup iniettato da Astro e il comportamento di `display:contents`.

```tsx

<style>astro-island,astro-slot,astro-static-slot{display:contents}</style>

```

### Confronto tra `.astro` e Client Components

I componenti Astro sono essenzialmente template HTML dotati di un pattern potente per componenti e props. Possono recuperare dati in fase di build, accedere a risorse backend e mantenere nascerte determinate informazioni sensibili.

Il modo migliore per comprendere i componenti `.astro` di Astro è confrontarli con i componenti lato client. (React, Vue, Svelte, ecc.)

<section className="scroll-x">
| Cosa devi fare?                                                            | Componente `.astro`    | Componente Client    |
| -------------------------------------------------------------------------- | ---------------------- | -------------------- |
| Generare HTML con un pattern template+componente potente                   | ✅                     | ❌                   |
| Recupero dati in fase di build                                             | ✅                     | ❌                   |
| Accesso diretto a risorse backend                                          | ✅                     | ❌                   |
| Mantenere nascoste informazioni sensibili (token di accesso, API key, ecc.)| ✅                     | ❌                   |
| Ridurre il JavaScript lato client                                          | ✅                     | ❌                   |
| Utilizzare componenti Client (React, Vue, Svelte, ecc.)                    | ✅                     | ✅                   |
| Aggiungere interattività e listener di eventi (`onClick()`, `onChange()`, ecc.) | ❌                  | ✅                   |
| Utilizzare State e Lifecycle Effects (`useState()`, `useReducer()`, `useEffect()`, ecc.) | ❌ | ✅                   |
| Utilizzare API esclusivamente browser                                     | ❌                     | ✅                   |
| Utilizzare hook personalizzati che dipendono da state, effects o API solo browser | ❌                  | ✅                   |
</section>

## CSS Moderno: Wow

Tornando allo sviluppo frontend, sono rimasto entusiasta dei progressi nel CSS nativo:

- Variabili CSS: Disponibili da un po', e ormai piuttosto stabili tra i browser dal 202\*.
- Anidamento (Nesting): Finalmente nello standard, senza la sintassi goffa delle versioni precedenti. Ora è simile a Less o SCSS.
- Nuovi selettori: [`:is()`, `:where()` e `:has()`](https://www.youtube.com/watch?v=3ncFpP8GP4g) offrono un targeting degli elementi più preciso.
- Unità moderne come `ch`, `vw` e funzioni come `clamp()` garantiscono un controllo migliore su layout e tipografia.
- Definire gli spazi in modo più naturale con gli attributi `-inline` e `-block`. Impostare padding o margin su uno solo degli assi (orizzontale o verticale). Invece di `margin: 0 1rem 0 1rem` → `margin-inline: 1rem`.
- Layout avanzati: Rileggere CSS Grid. Cavolo, c'è un sacco di roba lì dentro. Può sembrare scoraggiante data l'infinità di modi per usarlo. Tieni presente che ti basta capire 1 o 2 approcci per cavartela. Dai un'occhiata a queste ottime risorse che mi hanno aiutato a fare magia con la griglia: [Video di Kevin Powell: Impara CSS Grid in modo semplice](https://www.youtube.com/watch?v=rg7Fvvl3taU), [Responsive senza media queries](https://ardilamorin.com/responsive-no-media-queries/), [Dieci layout moderni in una riga di CSS](https://web.dev/articles/one-line-layouts).

## Ricerca: Pagefind

Implementare una **ricerca nel sito** senza servizi di terze parti o hosting di database sembrava una sfida divertente. Dopotutto, non è che abbia 10.000 post da indicizzare (per ora).

Navigando tra le [community integrations di Astro](https://astro.build/integrations/?search=find) mi sono imbattuto in uno strumento fantastico che avrei voluto conoscere prima: [Pagefind](https://pagefind.app/).

<p class="breakout quote">Pochi strumenti risolvono un problema con la stessa efficacia con cui Pagefind risolve la ricerca locale sul sito.</p>

La semplicità di implementazione di Pagefind è un piacere. Si integra con QUALSIASI contenuto di un sito statico e puoi scegliere se usare un'interfaccia predefinita o costruire tutto da zero se preferisci.

Ha risolto in modo pulito tutto ciò che volevo. Ci sono voluti solo minuti per l'integrazione e gran parte del lavoro si è ridotto ad aggiungere un tag `<div id="search"></div>` e qualche regola di stile!

## Commenti: Utterances

Purtroppo ho dovuto dire addio a Disqus e ai commenti che avevo accumulato negli anni.

Volevo un controllo e una visibilità migliori sugli script di terze parti del mio sito.

Inoltre, doveva essere semplice e manutenibile.

Questo mi ha portato a scegliere il fantastico servizio [Utterances](https://utteranc.es/). Il suo sistema di commenti basato sugli issue di GitHub si allinea bene con il mio pubblico. Inoltre, è semplice da configurare e gratuito.

## Tailwind: Rimpianti

C'è un solo componente tecnologico di cui mi pento sempre di più di utilizzare: Tailwind.

Col tempo, si fa sentire la differenza di costo tra scrittura e manutenzione. Scrivere con Tailwind è rapidissimo, ma una volta che il codice diventa sufficientemente complesso, leggerlo ed estenderlo può diventare un'operazione noiosa.

## Conclusioni

L'aggiornamento del mio vecchio sito Gatsby v1 a uno stack moderno centrato su Astro è stata un'esperienza molto piacevole. Lo consiglio al 10/10.

Se stai valutando l'aggiornamento di un sito legacy o la creazione di un nuovo sito statico (o ibrido), ti consiglio vivamente di prendere in considerazione Astro. La curva di apprendimento può essere ripida in alcuni momenti, ma i vantaggi in termini di prestazioni, esperienza di sviluppo e longevità del progetto valgono ampiamente lo sforzo.
````
