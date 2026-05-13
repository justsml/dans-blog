# Translation Candidate
- Slug: handling-international-numbers-and-currency
- Locale: de
- Model: qwen/qwen3.6-plus
- Target: src/content/posts/2024-08-29--handling-international-numbers-and-currency/de/index.mdx
- Validation: rejected: direct AI SDK translation failed
- Runtime seconds: 240.11
- Input tokens: unknown
- Output tokens: unknown
- Thinking tokens: unknown
- Cached input tokens: unknown
- Cache write tokens: unknown
- Estimated cost: unknown
- Pricing source: unknown
- Note: Command failed after 240000ms: bun run i18n:translate:chunked -- --slug handling-international-numbers-and-currency --locale de --model qwen/qwen3.6-plus --chunk 6p --run-id 2026-05-13T18-15-57-947Z-61322 --run-lock-path /Users/dan/code/oss/dans-blog/.git/codex-i18n-translation-run.json --quiz-concurrency 24
## Raw Output

````mdx
---
social_image: ../desktop-social.webp
title: Internationale Zahlen & Währungen verstehen
subTitle: Lokalisiertes Geld erklärt!
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
- [Geld: Lokalisierung (L10n) und Internationalisierung (i18n)](#money-localization-l10n-and-internationalization-i18n)
- [Wichtige Konzepte](#critical-concepts)
  - [Zahlen sind lokal 🏘️](#numbers-are-local-️)
  - [Währung ist global 🌎](#currency-is-global-️)
  - [Wann das Gebietsschema wichtig ist](#when-locale-matters)
- [Eine Lösung](#a-solution)
- [Nächste Schritte](#next-steps)

## Geld: Lokalisierung (L10n) und Internationalisierung (i18n)

Sie dienen nicht nur dazu, beim Scrabble zu dominieren – _Lokalisierung_ und _Internationalisierung_ bezeichnen den Prozess, ein Produkt **in einem anderen Land heimisch wirken zu lassen.**

<p class="breakout quote">Eine Währung im falschen lokalen Format anzuzeigen, ist ein todsicherer Hinweis: Du hast dir keine Mühe gegeben.<br/>Wenn du keinen Preis formatieren kannst, wie willst du dann den Versand handhaben?</p>

Internationalisierung ist ein großes Thema, das von Textübersetzung bis zur Datumsformatierung reicht. In diesem Beitrag konzentrieren wir uns auf einen bestimmten Unterpunkt: **die Formatierung von Zahlen und Währungen.**

Lassen Sie uns die Formatierung zwischen drei Euro-Ländern, den USA und Indien erkunden:

- `€1,234,567.89` Irland 🇮🇪
- `1.234.567,89 €` Deutschland 🇩🇪
- `1 234 567,89 €` Frankreich 🇫🇷
- `$1,234,567.89` USA 🇺🇸
- `₹12,34,567.89` Indien 🇮🇳

Chaos, oder? Symbole, Leerzeichen und Satzzeichen fliegen wild durcheinander! Es ist erstaunlich, dass sich die EU auf irgendetwas einigen kann! 😅

## Kritische Konzepte

Bevor wir in die Lösungen eintauchen: Was meinen wir mit „Zahlen sind lokal“?

### Zahlen sind lokal 🏘️

Jedes Gebietsschema ([Länder nach ISO 3166](https://en.wikipedia.org/wiki/List_of_ISO_3166_country_codes)) definiert Regeln zur Formatierung von Zahlen.

Zu den Formatierungsregeln für Zahlen gehören:

- Dezimaltrennzeichen: Komma, Punkt.
- Tausendertrennzeichen: Komma, Punkt, Leerzeichen.
- Position und Abstand des Währungssymbols.

### Währung ist global 🌎

Eine `Währung` bezeichnet eine bestimmte Geldeinheit. (Siehe [ISO 4217](https://en.wikipedia.org/wiki/ISO_4217#Active_codes_(list_one)) für eine Liste.)

- Definiert ein Symbol: `$`, `€`, `£`, `¥`. (Wird oft wiederverwendet.)
- Hat immer einen 3-Buchstaben-Code: `USD`, `EUR`, `GBP`, `JPY`.
- Kann in „jedem“ Land verwendet/getauscht werden. Theoretisch.
- Die Umrechnung zwischen Währungen erfordert Wechselkursdaten.
- Der Wert ändert sich nicht basierend auf dem Gebietsschema.

### Wann das Gebietsschema wichtig ist

Die meisten E-Commerce-/Zahlungs-REST-APIs arbeiten mit `price` + `currencyCode`. Warum keine Gebietsschemata?

Gebietsschemata werden (typischerweise) auf Betriebssystem-/Geräteebene festgelegt, und Browser stellen sie über `navigator.language` bereit. Da jeder Ihrer Benutzer ein anderes Gebietsschema haben könnte, ist es nur sinnvoll, Zahlen und Währungen clientseitig zu formatieren.

## Eine Lösung

Ok, gute Nachrichten! Moderne Programmiersprachen haben eingebaute Unterstützung dafür. In JavaScript haben wir die [`Intl`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl) Klasse und `Intl.NumberFormat`!

Schauen wir uns etwas Code an:

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

Wenn Sie ausgefallenere Dinge tun müssen, wie Steuern berechnen, Rabatte anwenden oder zwischen Währungen umrechnen, sollten Sie eine Bibliothek wie [dinero.js](https://v2.dinerojs.com/) verwenden.

## Nächste Schritte

Je nach Ihren spezifischen Anforderungen könnten Sie verwandte Konzepte erkunden:

- Best Practices mit Benutzer-Locale. Erkennen + Überschreiben erlauben (z. B. ein Länder-Dropdown).
- Ganze Ganzzahlen speichern (Cents, nicht Dollar).
- Geldmathematik (z. B. einen `20% Rabatt`-Gutschein anwenden, `Zwischensumme + Steuern` berechnen usw.).
- Live-Wechselkurse (für Einzelhandelskäufe, Devisen-/Währungsumtausch).

<p class="breakout quote">Lassen Sie mich wissen, ob Sie einen zukünftigen Artikel zu diesen Themen sehen möchten!</p>

{/* ## Recommendations

Some libraries can help with these tasks:

**JavaScript / TypeScript**

- [dinero.js](https://v2.dinerojs.com/) unterstützt Geldmathematik, Wechselkurse, Formatierung und Parsing!

**Rust**

- [rusty_money](https://crates.io/crates/rusty_money) ist meine bevorzugte Rust-Bibliothek.

**Go**

- [currency](https://github.com/bojanz/currency) ist meine derzeitige Golang-Wahl.
 */
````
