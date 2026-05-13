# Translation Candidate
- Slug: handling-international-numbers-and-currency
- Locale: de
- Model: qwen/qwen3.5-9b
- Target: src/content/posts/2024-08-29--handling-international-numbers-and-currency/de/index.mdx
- Validation: rejected: direct AI SDK translation failed
- Runtime seconds: 216.04
- Input tokens: unknown
- Output tokens: unknown
- Thinking tokens: unknown
- Cached input tokens: unknown
- Cache write tokens: unknown
- Estimated cost: unknown
- Pricing source: unknown
- Note: Command failed: bun run i18n:translate:chunked -- --slug handling-international-numbers-and-currency --locale de --model qwen/qwen3.5-9b --chunk 6p --run-id 2026-05-13T18-15-57-947Z-61322 --run-lock-path /Users/dan/code/oss/dans-blog/.git/codex-i18n-translation-run.json --quiz-concurrency 24 (code 1)
## Raw Output

````mdx
---
social_image: ../desktop-social.webp
title: Internationale Zahlen und Währungen verstehen
subTitle: Lokale Währungen – einfach erklärt!
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
- [Kernkonzepte](#critical-concepts)
  - [Zahlen sind lokal 🏘️](#numbers-are-local-️)
  - [Währungen sind global 🌎](#currency-is-global-️)
  - [Wann das Locale zählt](#when-locale-matters)
- [Eine Lösung](#a-solution)
- [Nächste Schritte](#next-steps)

## Geld: Lokalisierung (L10n) und Internationalisierung (i18n)

Sie sind nicht nur nützlich, um beim Scrabble zu glänzen. _Lokalisierung_ und _Internationalisierung_ beschreiben den Prozess, ein Produkt so anzupassen, dass es sich **in einem anderen Land wie zu Hause anfühlt.**

<p class="breakout quote">Eine Währung im falschen lokalen Format anzuzeigen, ist ein klares Indiz: Es wurde kein Aufwand betrieben.<br/>Wenn du einen Preis nicht korrekt formatieren kannst, wie willst du dann den Versand abwickeln?</p>

Internationalisierung ist ein breites Feld und reicht von der Textübersetzung bis zur Datumsformatierung. In diesem Beitrag fokussieren wir uns auf einen spezifischen Teilbereich: **die Formatierung von Zahlen und Währungen.**

Wir vergleichen die Formatierung an drei Eurozone-Staaten, den USA und Indien:

- `€1,234,567.89` Irland 🇮🇪
- `1.234.567,89 €` Deutschland 🇩🇪
- `1 234 567,89 €` Frankreich 🇫🇷
- `$1,234,567.89` USA 🇺🇸
- `₹12,34,567.89` Indien 🇮🇳

Chaos! Oder? Symbole, Leerzeichen und Trennzeichen wirbeln nur so durcheinander! Es ist schon erstaunlich, wie die EU sich überhaupt auf etwas einigen kann! 😅

## Kernkonzepte

Bevor wir uns die Lösungen ansehen: Was genau verstehen wir unter „Zahlen sind lokal“?

### Zahlen sind lokal 🏘️

Jede Locale ([Ländercodes nach ISO 3166](https://en.wikipedia.org/wiki/List_of_ISO_3166_country_codes)) definiert Regeln für die Formatierung von Zahlen.

Zu den Regeln der Zahlenformatierung gehören:

- Dezimaltrennzeichen: Komma, Punkt.
- Tausendertrennzeichen: Komma, Punkt, Leerzeichen.
- Position und Abstand des Währungssymbols.

### Währung ist global 🌎

Eine `currency` bezeichnet eine spezifische Geldeinheit. (Siehe [ISO 4217](https://en.wikipedia.org/wiki/ISO_4217#Active_codes_(list_one)) für eine vollständige Liste.)

- Definiert ein Symbol: `$`, `€`, `£`, `¥`. (Oft mehrfach verwendet.)
- Besitzt immer einen dreistelligen Code: `USD`, `EUR`, `GBP`, `JPY`.
- Kann (theoretisch) in „jedem“ Land verwendet oder getauscht werden.
- Die Umrechnung zwischen Währungen erfordert Wechselkursdaten.
- Der Wert ändert sich nicht in Abhängigkeit von der Locale.

### Wann die Locale eine Rolle spielt

Die meisten E-Commerce- und Zahlungs-APIs arbeiten mit `price` + `currencyCode`. Warum keine Locales?

Locales werden typischerweise auf OS-/Geräteebene festgelegt, und Browser stellen sie über `navigator.language` bereit. Da jeder Ihrer Nutzer eine andere Locale haben kann, ist es sinnvoll, Zahlen und Währungen clientseitig zu formatieren.

## Eine Lösung

Gute Neuigkeiten! Moderne Programmiersprachen bieten dafür native Unterstützung. In JavaScript stehen uns die [`Intl`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl)-Klasse und `Intl.NumberFormat` zur Verfügung!

Ein kurzer Blick auf den Code:

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

Für komplexere Aufgaben wie Steuerberechnungen, Rabattanwendungen oder Währungsumrechnungen sollten Sie auf eine Bibliothek wie [dinero.js](https://v2.dinerojs.com/) zurückgreifen.

## Nächste Schritte

Je nach Ihrem konkreten Use-Case sollten Sie folgende verwandte Themen vertiefen:

- Best Practices für User-Locales. Erkennung + Override-Möglichkeit (z. B. Länder-Auswahl).
- Persistenz ganzer Zahlen (Cent-Beträge statt Dollar-Beträge speichern).
- Finanzmathematik. (z. B. Anwenden eines `20 % Rabatt`-Gutscheins, Berechnen von `subTotal + taxes` usw.).
- Live-Wechselkurse. (Für Einzelhandel, Forex-/Währungsumrechnungen).

<p class="breakout quote">Geben Sie Bescheid, falls Sie einen Folgeartikel zu diesen Themen wünschen!</p>

{/* ## Empfehlungen

Einige Bibliotheken unterstützen Sie bei diesen Aufgaben:

**JavaScript / TypeScript**

- [dinero.js](https://v2.dinerojs.com/) unterstützt Finanzmathematik, Wechselkurse, Formatierung und Parsing!

**Rust**

- [rusty_money](https://crates.io/crates/rusty_money) ist meine bevorzugte Rust-Bibliothek.

**Go**

- [currency](https://github.com/bojanz/currency) ist meine aktuelle Wahl für Golang.
 */}
````
