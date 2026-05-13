# Translation Candidate
- Slug: handling-international-numbers-and-currency
- Locale: fr
- Model: qwen/qwen3.6-35b-a3b
- Target: src/content/posts/2024-08-29--handling-international-numbers-and-currency/fr/index.mdx
- Validation: deferred
- Runtime seconds: 94.32
- Input tokens: 6303
- Output tokens: 19775
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- Estimated cost: $0.000000
- Pricing source: unknown
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
social_image: ../desktop-social.webp
title: Comprendre les nombres et devises internationaux
subTitle: La monnaie localisée expliquée !
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
- [Monnaie : Localisation (L10n) et Internationalisation (i18n)](#money-localization-l10n-and-internationalization-i18n)
- [Concepts clés](#critical-concepts)
  - [Les nombres sont locaux 🏘️](#numbers-are-local-️)
  - [La devise est globale 🌎](#currency-is-global-️)
  - [Quand la localisation compte](#when-locale-matters)
- [Une solution](#a-solution)
- [Prochaines étapes](#next-steps)

## Monnaie : Localisation (L10n) et Internationalisation (i18n)

Elles ne servent pas qu'à remporter une partie de Scrabble. La _localisation_ et l'_internationalisation_ désignent le processus consistant à rendre un produit **comme chez lui dans un autre pays.**

<p class="breakout quote">Afficher une devise dans un format local erroné est un indice flagrant : vous n'avez fourni aucun effort.<br/>Si vous ne savez pas formater un prix, comment pourriez-vous gérer la livraison ?</p>

L'internationalisation est un vaste sujet, couvrant tout, de la traduction de texte au formatage des dates. Cet article se concentrera sur un sous-ensemble précis : **le formatage des nombres et des devises.**

Analysons les différences de formatage entre trois pays de la zone euro, les États-Unis et l'Inde :

- `€1,234,567.89` Irlande 🇮🇪
- `1.234.567,89 €` Allemagne 🇩🇪
- `1 234 567,89 €` France 🇫🇷
- `$1,234,567.89` États-Unis 🇺🇸
- `₹12,34,567.89` Inde 🇮🇳

Le chaos ! N'est-ce pas ? Symboles, espaces et ponctuation qui se baladent partout ! C'est incroyable comment l'UE arrive à se mettre d'accord sur quoi que ce soit ! 😅

## Concepts clés

Avant de plonger dans les solutions, que signifie exactement « Les nombres sont locaux » ?

### Les nombres sont locaux 🏘️

Chaque locale ([pays selon la norme ISO 3166](https://en.wikipedia.org/wiki/List_of_ISO_3166_country_codes)) définit ses propres règles de formatage des nombres.

Les règles de formatage des nombres incluent :

- Décimales : virgule, point.
- Séparateurs de milliers : virgule, point, espace.
- Position et espacement du symbole monétaire.

### La devise est globale 🌎

Une `currency` désigne une unité monétaire spécifique. (Voir [ISO 4217](https://en.wikipedia.org/wiki/ISO_4217#Active_codes_(list_one)) pour la liste.)

- Spécifie un symbole : `$`, `€`, `£`, `¥`. (Souvent réutilisés.)
- Possède toujours un code à 3 lettres : `USD`, `EUR`, `GBP`, `JPY`.
- Peut être utilisée/échangée dans "n'importe quel" pays. En théorie.
- La conversion entre devises nécessite des données de taux de change.
- Sa valeur ne change pas en fonction de la locale.

### Quand la locale compte

La plupart des API REST e-commerce ou de paiement exposent `price` + `currencyCode`. Pourquoi aucune mention des locales ?

Les paramètres de locale sont généralement configurés au niveau du système d'exploitation ou de l'appareil. Les navigateurs les exposent via `navigator.language`. Comme chaque utilisateur peut utiliser une locale différente, le formatage des nombres et des devises doit être traité côté client.

## Une solution

Bonne nouvelle ! Les langages de programmation modernes intègrent nativement ce support. En JavaScript, on dispose de la classe [`Intl`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl) et de `Intl.NumberFormat` !

Examinons le code :

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

Pour des opérations plus complexes — calcul de taxes, application de remises, conversion entre devises — il est préférable de recourir à une bibliothèque dédiée comme [dinero.js](https://v2.dinerojs.com/).

## Étapes suivantes

En fonction de vos besoins, explorez les concepts connexes :

- Gestion de la locale utilisateur. Détection + autorisation des overrides. (ex. : un menu déroulant de sélection de pays.)
- Persistance des entiers (stockez les centimes, pas les dollars.)
- Calculs monétaires. (ex. : application d'un coupon `20% off`, calcul de `subTotal + taxes`, etc.)
- Taux de change en temps réel. (Pour les achats en détail, les opérations de change.)

<p class="breakout quote">Faites-moi savoir si vous souhaitez un futur article sur ces sujets !</p>

{/* ## Recommandations

Certaines bibliothèques peuvent vous aider sur ces points :

**JavaScript / TypeScript**

- [dinero.js](https://v2.dinerojs.com/) gère les calculs monétaires, les taux de change, le formatage et le parsing !

**Rust**

- [rusty_money](https://crates.io/crates/rusty_money) est ma bibliothèque Rust de prédilection.

**Go**

- [currency](https://github.com/bojanz/currency) est mon choix actuel pour Go.
 */}
````
