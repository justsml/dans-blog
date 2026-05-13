# Translation Candidate
- Slug: handling-international-numbers-and-currency
- Locale: it
- Model: openrouter/qwen/qwen3-32b:nitro
- Target: src/content/posts/2024-08-29--handling-international-numbers-and-currency/it/index.mdx
- Validation: deferred
- Runtime seconds: 15.05
- Input tokens: 6246
- Output tokens: 6513
- Thinking tokens: unknown
- Cached input tokens: 1024
- Cache write tokens: 0
- Estimated cost: $0.002063
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
social_image: ../desktop-social.webp
title: ''
subTitle: Denaro locale spiegato!
draft: false
date: '2024-08-28'
modified: '2024-09-03'
tags:
  - engineering
  - internationalization
  - localization
  - currency
  - numbers
category: HowTo
subCategory: Internationalization
cover_full_width: ../currency-banner-wide.webp
cover_mobile: ../currency-banner-pic__w200.webp
cover_icon: ../currency-banner-pic__w200.webp
---
- [Denaro: Localizzazione (L10n) e Internazionalizzazione (i18n)](#denaro-localizzazione-l10n-e-internazionalizzazione-i18n)  
- [Concetti chiave](#concetti-chiave)  
  - [Numeri sono Locali 🏘️](#numeri-sono-locali-️)  
  - [Valuta è Globale 🌎](#valuta-è-globale-️)  
  - [Quando Conta il Locale](#quando-Conta-il-locale)  
- [Una Soluzione](#una-soluzione)  
- [Passi Successivi](#passi-successivi)  

## Denaro: Localizzazione (L10n) e Internazionalizzazione (i18n)  

Non sono solo per dominare una partita a Scrabble, _localizzazione_ e _internazionalizzazione_ si riferiscono al processo di rendere un prodotto **che si senta a casa in un paese diverso**.  

<p class="breakout quote">Mostrare una valuta nel formato locale errato è un chiaro segnale: non hai fatto alcuno sforzo.<br/>Se non sei in grado di formattare un prezzo, come potresti gestire la spedizione?</p>  

L'Internazionalizzazione è un argomento vasto, che copre tutto, dalla traduzione del testo al formattaggio delle date. In questo post ci concentreremo su un particolare sottotema: **il formattaggio di numeri e valuta**.  

Esploriamo il formattaggio tra 3 paesi della zona Euro, USA e India:

- `€1,234,567.89` Irlanda 🇮🇪  
- `1.234.567,89 €` Germania 🇩🇪  
- `1 234 567,89 €` Francia 🇫🇷  
- `$1,234,567.89` USA 🇺🇸  
- `₹12,34,567.89` India 🇮🇳  

Caos! Giusto? Ci sono simboli, spazi e punteggiatura ovunque! È incredibile che l'UE riesca a concordare qualcosa! 😅  

## Concetti Critici  

Prima di passare alle soluzioni, cosa intendiamo con "Numeri sono Locali"?  

### I Numeri sono Locali 🏘️  

Ogni **locale** ([Country per ISO 3166](https://en.wikipedia.org/wiki/List_of_ISO_3166_country_codes)) definisce regole per formattare i numeri.

Le regole di formattazione dei numeri includono:

- Decimale: virgola, punto.
- Migliaia: virgola, punto, spazio.
- Posizione e spaziatura del simbolo della valuta.

### La Valuta è Globale 🌎

Una `valuta` indica un'unità specifica di denaro. (Vedi [ISO 4217](https://en.wikipedia.org/wiki/ISO_4217#Active_codes_(list_one)) per l'elenco.)

- Specifica un simbolo: `$`, `€`, `£`, `¥`. (Spesso riutilizzato.)
- Ha sempre un codice di tre lettere: `USD`, `EUR`, `GBP`, `JPY`.
- Può essere utilizzata/scambiata in "qualsiasi" paese. In teoria.
- La conversione tra valute richiede dati sui tassi di cambio.
- Il valore non cambia in base al locale.

### Quando Conta il Locale

La maggior parte degli API REST per e-commerce/pagamenti utilizza `price` + `currencyCode`. Perché non vengono utilizzati i locali?

I locali sono (tipicamente) impostati a livello di sistema operativo/dispositivo, e i browser li rendono disponibili tramite `navigator.language`. Poiché ogni tuo utente potrebbe avere un locale diverso, ha senso formattare numeri e valute lato client.

## Una Soluzione

Buone notizie! I linguaggi di programmazione moderni hanno supporto integrato per questo. In JavaScript, abbiamo la classe [`Intl`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl) e `Intl.NumberFormat`!

Proviamo con un esempio di codice:

```javascript
const number = 1_234_567.89;

/**
 * Formatta un numero in valuta locale.
 * @param {number} amount - L'importo da formattare.
 * @param {string} currency - Il codice valuta a 3 lettere.
 * @param {string} [locale] - La stringa del locale dell'utente.
 */
const formatMoney = (amount, currency, locale = navigator.language) =>
  new Intl.NumberFormat(locale, { currency, style: 'currency' })
    .format(amount);

console.log('🇩🇪 ' + formatMoney(number, 'EUR', 'de-DE'));
console.log('🇮🇪 ' + formatMoney(number, 'EUR', 'ga-IE'));
console.log('🇫🇷 ' + formatMoney(number, 'EUR', 'fr-FR'));
```

Se hai bisogno di operazioni più complesse, come calcolare tasse, applicare sconti o convertire tra valute, utilizza una libreria come [dinero.js](https://v2.dinerojs.com/).

## Passi successivi

A seconda delle tue esigenze specifiche, potresti voler esplorare concetti correlati:

- Migliori pratiche per il locale utente. Rileva e permetti sovrascritture. (ad esempio, un menu a discesa per il paese.)
- Memorizzazione di valori interi (memorizza i centesimi, non i dollari.)
- Calcoli monetari. (ad esempio, applicare uno sconto del `20%`, calcolare `subTotal + tasse`, ecc.)
- Tassi di cambio in tempo reale. (Per acquisti al dettaglio, scambi di valute/forex.)

<p class="breakout quote">Se desideri un articolo futuro su questi argomenti, fammi sapere!</p>

**JavaScript / TypeScript**

- [dinero.js](https://v2.dinerojs.com/) supporta operazioni monetarie, tassi di cambio, formattazione e analisi!

**Rust**

- [rusty_money](https://crates.io/crates/rusty_money) è la mia libreria preferita per Rust.

**Go**

- [currency](https://github.com/bojanz/currency) è la mia scelta attuale per Golang".
````
