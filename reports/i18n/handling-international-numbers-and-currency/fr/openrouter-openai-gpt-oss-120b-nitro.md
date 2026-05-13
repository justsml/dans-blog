# Translation Candidate
- Slug: handling-international-numbers-and-currency
- Locale: fr
- Model: openrouter/openai/gpt-oss-120b:nitro
- Target: src/content/posts/2024-08-29--handling-international-numbers-and-currency/fr/index.mdx
- Validation: passed
- Runtime seconds: 8.52
- Input tokens: 6118
- Output tokens: 1867
- Thinking tokens: unknown
- Cached input tokens: 1280
- Cache write tokens: 0
- Estimated cost: $0.000575
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
social_image: ../desktop-social.webp
title: Comprendre les nombres et devises internationaux
subTitle: Argent local expliqué !
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
- [Argent : Localisation (L10n) et Internationalisation (i18n)](#money-localization-l10n-and-internationalization-i18n)
- [Concepts critiques](#critical-concepts)
  - [Les nombres sont locaux 🏘️](#numbers-are-local-️)
  - [La monnaie est globale 🌎](#currency-is-global-️)
  - [Quand la locale compte](#when-locale-matters)
- [Une solution](#a-solution)
- [Prochaines étapes](#next-steps)

## Argent : Localisation (L10n) et Internationalisation (i18n)

Ce ne sont pas seulement des mots pour dominer une partie de Scrabble, la _localisation_ et l'_internationalisation_ désignent le processus qui rend un produit **à l’aise dans un autre pays**.

<p class="breakout quote">Afficher une devise dans le mauvais format local est un indice évident : vous n’avez fourni aucun effort.<br/>Si vous ne pouvez pas formater un prix, comment pourriez‑vous gérer la livraison ?</p>

L’internationalisation est un sujet vaste, couvrant tout, de la traduction de texte au formatage des dates. Dans cet article, nous nous concentrerons sur un sous‑domaine particulier, **le formatage des nombres et des devises**.

Examinons le formatage dans trois pays de la zone euro, aux États‑Unis et en Inde :

- `€1,234,567.89` Irlande 🇮🇪  
- `1.234.567,89 €` Allemagne 🇩🇪  
- `1 234 567,89 €` France 🇫🇷  
- `$1,234,567.89` États‑Unis 🇺🇸  
- `₹12,34,567.89` Inde 🇮🇳  

Chaos ! N’est‑ce pas le cas ? Il y a des symboles, des espaces et de la ponctuation partout ! C’est incroyable de voir à quel point l’UE peut s’entendre sur quoi que ce soit ! 😅  

## Concepts critiques  

Avant de plonger dans les solutions, que veut‑on dire par « Les nombres sont locaux » ?  

### Les nombres sont locaux 🏘️  

Chaque locale ([Country per ISO 3166](https://en.wikipedia.org/wiki/List_of_ISO_3166_country_codes)) définit des règles de formatage des nombres.

Les règles de formatage des nombres comprennent :

- Décimal : virgule, point.
- Milliers : virgule, point, espace.
- Position et espacement du symbole monétaire.

### La monnaie est globale 🌎

Une `currency` désigne une unité monétaire spécifique. (Voir [ISO 4217](https://en.wikipedia.org/wiki/ISO_4217#Active_codes_(list_one)) pour la liste.)

- Définit un symbole : `$`, `€`, `£`, `¥`. (Souvent réutilisé.)
- Possède toujours un code à 3 lettres : `USD`, `EUR`, `GBP`, `JPY`.
- Peut être utilisée/échangée dans « n’importe quel » pays. En théorie.
- Convertir d’une monnaie à l’autre nécessite des données de taux de change.
- Sa valeur ne varie pas selon la locale.

### Quand la locale compte​

La plupart des API REST de commerce électronique/paiement manipulent `price` + `currencyCode`. Pourquoi aucune locale ?

Les locales sont (généralement) définies au niveau du système d’exploitation ou de l’appareil, et les navigateurs les exposent via `navigator.language`. Étant donné que chacun de vos utilisateurs peut avoir une locale différente, il n’est logique de formater les nombres et les devises que côté client.

## Une solution

Bonne nouvelle ! Les langages de programmation modernes intègrent ce support. En JavaScript, on dispose de la classe [`Intl`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl) et de `Intl.NumberFormat` !

Voyons un exemple de code :

```javascript
const number = 1_234_567.89;

/**
 * Formate un nombre en devise locale.
 * @param {number} amount - Le montant à formater.
 * @param {string} currency - Le code devise à 3 lettres.
 * @param {string} [locale] - La chaîne de locale de l'utilisateur.
 */
const formatMoney = (amount, currency, locale = navigator.language) =>
  new Intl.NumberFormat(locale, { currency, style: 'currency' })
    .format(amount);

console.log('🇩🇪 ' + formatMoney(number, 'EUR', 'de-DE'));
console.log('🇮🇪 ' + formatMoney(number, 'EUR', 'ga-IE'));
console.log('🇫🇷 ' + formatMoney(number, 'EUR', 'fr-FR'));
```

Si vous devez réaliser des opérations plus complexes, comme calculer des taxes, appliquer des remises ou convertir entre devises, il est recommandé d’utiliser une bibliothèque telle que [dinero.js](https://v2.dinerojs.com/).

## Prochaines étapes

Selon vos besoins spécifiques, vous pourriez vouloir explorer des concepts connexes :

- Bonnes pratiques avec la locale utilisateur. Détecter + permettre des surcharges. (par ex. un menu déroulant de pays.)
- Persister des entiers complets (stockez les centimes, pas les dollars.)
- Calculs monétaires. (par ex. appliquer un coupon de `20 % de réduction`, calculer `subTotal + taxes`, etc.)
- Taux de change en temps réel. (Pour les achats au détail, échanges forex/devises.)

<p class="breakout quote">Faites‑moi savoir si vous souhaitez voir un futur article sur ces sujets !</p>

{/* ## Recommendations

Some libraries can help with these tasks: */}

**JavaScript / TypeScript**

- [dinero.js](https://v2.dinerojs.com/) prend en charge les opérations monétaires, les taux de change, le formatage et l'analyse !

**Rust**

- [rusty_money](https://crates.io/crates/rusty_money) est ma bibliothèque Rust préférée.

**Go**

- [currency](https://github.com/bojanz/currency) est mon choix actuel pour Golang.
````
