# Translation Candidate
- Slug: you-may-not-need-axios
- Locale: it
- Model: openrouter/openai/gpt-oss-120b:nitro
- Target: src/content/posts/2018-11-15--you-may-not-need-axios/it/index.mdx
- Validation: rejected: direct AI SDK translation failed
- Runtime seconds: 12.27
- Input tokens: 13566
- Output tokens: 3409
- Thinking tokens: unknown
- Cached input tokens: 3328
- Cache write tokens: 0
- Estimated cost: $0.001143
- Pricing source: local-openrouter-estimate
- Note: Command failed: git add src/content/posts/2018-11-15--you-may-not-need-axios/it/index.mdx reports/i18n/you-may-not-need-axios/it
## Raw Output

````mdx
---
social_image: ../desktop-social.webp
title: Potresti non aver bisogno di Axios
subTitle: Fetch API al soccorso!
date: '2018-11-14'
modified: '2024-08-21'
tags:
  - programming
  - patterns
  - examples
  - nodejs
  - javascript
  - promises
  - axios
  - fetch
category: Guides
subCategory: fetch
cover: ../brock-dupont-575648-unsplash.webp
cover_mobile: ../w300_brock-dupont-575648-unsplash.webp
cover_icon: ../icon_brock-dupont-575648-unsplash.webp
---
import Gist from '../../../../../components/Gist/index.astro'

## Potresti non aver bisogno di Axios

<p class="breakout call-to-action">Questo **non è un attacco** a [Axios](https://www.npmjs.com/package/axios). <br />

Piuttosto, è **un sostegno per l'API `fetch`, che è diventata davvero capace.** 🦄</p>

### Panoramica

Questo articolo raccoglie gli snippet di codice “mancanti” per `fetch` e i casi d'uso più comuni che avrei voluto fossero più facili da trovare.

- [Panoramica](#overview)
- [Confronto delle funzionalità](#feature-comparison)
- [Ricette con fetch](#fetch-recipes)
  - [Ottenere JSON da un URL](#get-json-from-a-url)
  - [Header personalizzati](#custom-headers)
  - [Gestione degli errori HTTP](#http-error-handling)
  - [Esempio CORS](#cors-example)
  - [Invio di JSON](#posting-json)
  - [Invio di un `<form>` HTML](#posting-an-html-form)
  - [Dati codificati come form](#form-encoded-data)
  - [Caricamento di un file](#uploading-a-file)
  - [Caricamento di più file](#uploading-multiple-files)
  - [Timeout](#timeouts)
  - [Helper per il progresso del download](#download-progress-helper)
  - [Helper di retry ricorsivo](#recursive-retry-helper)
  - [Gestione dei redirect HTTP](#handling-http-redirects)
  - [Annullare una richiesta fetch](#canceling-a-fetch-request) ✨new✨
- [Compatibilità](#compatibility)

> Il tuo caso d'uso non è elencato? [Fammi sapere ✉️](../contact/)

<br />

### Confronto delle funzionalità

|                                                 | fetch    | axios    | request |
|-------------------------------------------------|:--------:|:--------:|:-------:|
| Intercettare richiesta e risposta               |✅        |✅         |✅       |
| Trasformare dati di richiesta e risposta        |✅        |✅         |✅       |
| Annullare richieste                             |✅        |✅         |❌       |
| Trasformazioni automatiche per dati JSON       |helper manuali |✅         |✅       |
| Supporto client per protezione XSRF             |✅        |✅         |✅       |
| Progresso                                       |✅        |✅         |✅       |
| Streaming                                       |✅        |✅         |✅       |
| Redirect                                        |✅        |✅         |✅       |

<br /><br />

Quando ho iniziato a scrivere questo articolo (fine 2018, aggiornato 2024) immaginavo di chiudere con una tabella di caselle di spunta miste. Certo, esistono casi d'uso particolari che giustificano l'uso di [`axios`](https://www.npmjs.com/package/axios), [`request`](https://www.npmjs.com/package/request), [`r2`](https://www.npmjs.com/package/r2), [`superagent`](https://www.npmjs.com/package/superagent), [`got`](https://www.npmjs.com/package/got) e così via.

Beh, come si è scoperto, **ho sopravvalutato la necessità di librerie HTTP di terze parti**.

Nonostante utilizzi `fetch` da diversi anni (anche per compiti non banali: upload di file e gestione di errori/ritentativi) continuavo a nutrire idee sbagliate sulle capacità e sui limiti di `fetch`.

Il `fetch` nativo non analizza automaticamente le risposte JSON né serializza i corpi delle richieste JSON. Bisogna chiamare `response.json()` al ritorno e `JSON.stringify()` all'invio. Axios vince ancora su questo aspetto di ergonomia; la difesa di `fetch` è che un piccolo helper colma facilmente la lacuna.

Bene, diamo un’occhiata a cosa può fare `fetch`…

## Ricette con Fetch

### Ottenere JSON da un URL

<Gist path='justsml/de941bd61cc86e30beedbb8a3a646f81'></Gist>

### Header personalizzati

<Gist path='justsml/fca7cd72ec1ebc07d994eac13a665ddf' />

### Gestione degli errori HTTP

<Gist path='justsml/81919a72897ebc503c6b34a556a9bde2' />

### Esempio CORS

Il CORS viene verificato principalmente sul server – quindi assicurati che la configurazione sia corretta lato server.

L’opzione `credentials` controlla se i cookie vengono inclusi automaticamente.

<Gist path='../justsml/3ddd9ed8705f48cdf45d313d1e57aa2a' />

### Invio di JSON

<Gist path='../justsml/13915347d6c8413c73f4bd7240c68e51' />

### Invio di un `<form>` HTML

<Gist path='../justsml/ef2e356bec0ef7c6e528d84a5f75ba7e' />

### Dati codificati come form

Per inviare dati con un **Content‑Type** `application/x-www-form-urlencoded` utilizziamo `URLSearchParams` per codificare i valori come una stringa di query.

Ad esempio, `new URLSearchParams({a: 1, b: 2})` produce `a=1&b=2`.

<Gist path='../justsml/716c4534ef4afb22f65d4fc4367c7136' />

### Caricamento di un file

<Gist path='../justsml/301f22aa37df565ba3051bd5f95b4df1' />

### Caricamento di più file

Imposta un elemento di upload file con l’attributo `multiple`:

<Gist path='../justsml/37836357041d8ca4d1b32e12638cb0ba' />

Poi usalo in qualcosa del genere:

<Gist path='../justsml/d17f50c36a5ddb70f584c0aa6de94237' />

### Timeout

Ecco un timeout generico per Promise, implementato con il pattern della “Partial Application”. Funziona con qualsiasi interfaccia Promise. Non inserire troppi lavori nella catena di promise fornita: continuerà a girare e eventuali errori possono generare perdite di memoria a lungo termine.

<Gist path='../justsml/f93b2ef6457b3e52eb995831b67cab85' />

E un esempio più complesso, che utilizza un flag di tracciamento `__timeout` così da poter **intercettare qualsiasi operazione costosa**.

<Gist path='../justsml/5e492db8997a4f7e22e61b7486cbf273' />

### Helper per il Progresso del Download

Il progresso di upload è attualmente un po' instabile al di fuori di Chrome.

La tecnica del Progress Handler mostrata qui sotto **evita di avvolgere** la chiamata `fetch` in una closure. 👍

`progressHelper` espone la seguente interfaccia (il codice sorgente è disponibile più sotto)

<Gist path='../justsml/db5ccc55ffb93c75e04e014d1f553cfb' />

Vediamo un esempio d'uso:

<Gist path='../justsml/9bec219590ff50688972c1caff67c14b' />

Un downloader di immagini riutilizzabile potrebbe avere l’aspetto di `getBlob()`:

<Gist path='../justsml/bef2dd7e630eb7642beb3e2be29489b2' />

A proposito, un `Blob` è un Binary Large Object.

È fondamentale scegliere UNA delle 2 modalità d'uso qui sotto (sono equivalenti dal punto di vista funzionale):

<Gist path='../justsml/6ad9e37a96ad1f3a75ca509038510a5b' />

La mia preferenza è `Option #1`. Tuttavia, il design del tuo ambito potrebbe costringerti a usare `Option #2`.

Infine, ecco l’ultima parte di questa ricetta, il nostro `progressHelper`:

##### Fonte: Progress Helper

<Gist path='../justsml/a8ffd810fc7e5a5295dfc898302ddbfc' />

_credit:_ Un ringraziamento speciale ad Anthum Chris e al suo [fantastico PoC Progress+Fetch mostrato qui](https://github.com/AnthumChris/fetch-progress-indicators)

### Helper per il Retry Ricorsivo

<Gist path='justsml/7e52521a0af50fa590be57d5b4593120' />

### Gestione dei reindirizzamenti HTTP

<Gist path='justsml/3dd0a799ada8da7cd15943ff254266de' />

### Annullare una richiesta fetch

<Gist path='justsml/7f257ac3de3c7792db8485588c54e938' />

### Compatibilità

A partire dal 2022, l'API `fetch` è [ampiamente supportata](https://caniuse.com/#feat=fetch) in tutti i browser moderni e nelle versioni più recenti di NodeJS v18+.

Se devi supportare IE, puoi [polyfillare fetch](https://github.com/github/fetch#browser-support) con il pacchetto `github/fetch` (mantenuto da un team eccellente su GitHub). È possibile tornare indietro fino a [IE8](https://github.com/camsong/fetch-ie8) — _i risultati possono variare_.

Le versioni precedenti di NodeJS possono sfruttare l'API `fetch` tramite il pacchetto [`node-fetch`](https://www.npmjs.com/package/node-fetch):

```sh
npm install node-fetch
```

_Dopo polyfill + node-fetch: compatibilità al 99,99%_ ✅

> Per favore [twitta a me](https://x.com/justsml) se hai altri _casi d'uso_ che ti piacerebbe vedere. ❤️
````
