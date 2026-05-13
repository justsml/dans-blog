# Translation Candidate
- Slug: handling-international-numbers-and-currency
- Locale: it
- Model: openrouter/openai/gpt-oss-120b:nitro
- Target: src/content/posts/2024-08-29--handling-international-numbers-and-currency/it/index.mdx
- Validation: rejected: direct AI SDK translation failed
- Runtime seconds: 3.59
- Input tokens: 6260
- Output tokens: 1887
- Thinking tokens: unknown
- Cached input tokens: 2944
- Cache write tokens: 0
- Estimated cost: $0.000584
- Pricing source: local-openrouter-estimate
- Note: Command failed: git add src/content/posts/2024-08-29--handling-international-numbers-and-currency/it/index.mdx reports/i18n/handling-international-numbers-and-currency/it
## Raw Output

````mdx
---
social_image: ../desktop-social.webp
title: Comprendere numeri e valute internazionali
subTitle: Denaro localizzato spiegato!
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
- [Denaro: Localizzazione (L10n) e Internazionalizzazione (i18n)](#money-localization-l10n-and-internationalization-i18n)
- [Concetti critici](#critical-concepts)
  - [I numeri sono locali 🏘️](#numbers-are-local-️)
  - [La valuta è globale 🌎](#currency-is-global-️)
  - [Quando la locale conta](#when-locale-matters)
- [Una soluzione](#a-solution)
- [Passi successivi](#next-steps)

## Denaro: Localizzazione (L10n) e Internazionalizzazione (i18n)

Non servono solo a dominare una partita a Scarabeo, _localizzazione_ e _internazionalizzazione_ indicano il processo di far sentire un prodotto **a casa in un paese diverso**.

<p class="breakout quote">Mostrare una valuta nel formato locale sbagliato è un segno evidente di negligenza: non hai fatto alcuno sforzo.<br/>Se non riesci a formattare un prezzo, come potresti gestire la spedizione?</p>

L'internazionalizzazione è un argomento vasto, che copre tutto, dalla traduzione del testo alla formattazione delle date. In questo post ci concentreremo su un sotto‑argomento specifico, **la formattazione di numeri e valute**.

Esaminiamo la formattazione tra 3 paesi dell'Eurozona, gli USA e l'India:

- `€1,234,567.89` Ireland 🇮🇪
- `1.234.567,89 €` Germany 🇩🇪
- `1 234 567,89 €` France 🇫🇷
- `$1,234,567.89` USA 🇺🇸
- `₹12,34,567.89` India 🇮🇳

Caos! Giusto? Ci sono simboli, spazi e punteggiatura sparsi ovunque! È incredibile come l'UE riesca a mettersi d'accordo su qualcosa! 😅

## Concetti critici

Prima di passare alle soluzioni, cosa intendiamo con “Numbers are Local”?

### Numbers are Local 🏘️

Ogni locale ([Country per ISO 3166](https://en.wikipedia.org/wiki/List_of_ISO_3166_country_codes)) definisce le regole per la formattazione dei numeri.

Le regole di formattazione dei numeri includono:

- Decimale: virgola, punto.
- Migliaia: virgola, punto, spazio.
- Posizione del simbolo di valuta e spaziatura.

### Currency is Global 🌎

Una `currency` indica un'unità specifica di denaro. (Vedi [ISO 4217](https://en.wikipedia.org/wiki/ISO_4217#Active_codes_(list_one)) per l'elenco.)

- Specifica un simbolo: `$`, `€`, `£`, `¥`. (Spesso riutilizzato.)
- Ha sempre un codice a 3 lettere: `USD`, `EUR`, `GBP`, `JPY`.
- Può essere usata/scambiata in “qualsiasi” paese. In teoria.
- Convertire tra valute richiede dati sul tasso di cambio.
- Il valore non varia in base al locale.

### When Locale Matters

La maggior parte delle API REST per e‑commerce/pagamenti gestisce `price` + `currencyCode`. Perché nessun locale?

I locale sono (tipicamente) impostati a livello di OS/dispositivo, e i browser li espongono tramite `navigator.language`. Poiché ciascuno dei tuoi utenti potrebbe avere un locale diverso, ha senso formattare numeri e valute sul client.

## Una soluzione

Ok, buona notizia! I linguaggi di programmazione moderni includono supporto nativo per questo. In JavaScript troviamo la classe [`Intl`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl) e `Intl.NumberFormat`!

Diamo un’occhiata a qualche riga di codice:

```javascript
const number = 1_234_567.89;

/**
 * Format a number in local currency.
 * @param {number} amount - The amount to format.
 * @param {string} currency - The 3-letter currency code.
 * @param {string} [locale] - The users locale string.
 */
const formatMoney = (amount, currency, locale = navigator.language) =>
  new Intl.NumberFormat(locale, { currency, style: 'currency' })
    .format(amount);

console.log('🇩🇪 ' + formatMoney(number, 'EUR', 'de-DE'));
console.log('🇮🇪 ' + formatMoney(number, 'EUR', 'ga-IE'));
console.log('🇫🇷 ' + formatMoney(number, 'EUR', 'fr-FR'));
```

Se devi fare operazioni più complesse, come calcolare tasse, applicare sconti o convertire tra valute, conviene usare una libreria come [dinero.js](https://v2.dinerojs.com/).

## Prossimi passi

A seconda delle tue esigenze specifiche, potresti voler approfondire i concetti correlati:

- Best practice con la locale dell'utente. Rilevamento + possibilità di sovrascrittura (ad es. un menu a tendina per il paese).
- Persistenza di interi completi (memorizza i centesimi, non i dollari).
- Operazioni monetarie. (ad es. applicare un coupon del `20%`, calcolare `subTotal + taxes`, ecc.)
- Tassi di cambio in tempo reale. (Per acquisti al dettaglio, scambi forex/valuta.)

<p class="breakout quote">Fammi sapere se vuoi vedere un futuro articolo su questi argomenti!</p>

{/* ## Recommendations

Some libraries can help with these tasks: */}

**JavaScript / TypeScript**

- [dinero.js](https://v2.dinerojs.com/) supporta operazioni monetarie, tassi di cambio, formattazione e parsing!

**Rust**

- [rusty_money](https://crates.io/crates/rusty_money) è la mia libreria Rust di riferimento.

**Go**

- [currency](https://github.com/bojanz/currency) è la mia scelta attuale per Golang.
````
