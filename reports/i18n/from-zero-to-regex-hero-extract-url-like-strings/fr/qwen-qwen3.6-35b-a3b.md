# Translation Candidate
- Slug: from-zero-to-regex-hero-extract-url-like-strings
- Locale: fr
- Model: qwen/qwen3.6-35b-a3b
- Target: src/content/posts/2024-12-29--from-zero-to-regex-hero-extract-url-like-strings/fr/index.mdx
- Validation: deferred
- Runtime seconds: 160.49
- Input tokens: 10887
- Output tokens: 35577
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- Estimated cost: $0.000000
- Pricing source: unknown
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
title: De zéro à expert Regex
subTitle: >-
  Extraire et analyser des chaînes de type URL avec une seule expression
  régulière
category: Regex
subCategory: Data Extraction
date: '2024-12-29'
modified: '2025-01-06'
tags:
  - regex
  - url
  - data-extraction
  - data-processing
social_image: ../desktop-social.webp
cover_full_width: ../regex-url-parsing-wide.webp
cover_mobile: ../regex-url-parsing-square-200.webp
cover_icon: ../regex-url-parsing-square-200.webp
---
import { CodeTabs } from '../../../../components/CodeTabs';

**Table des matières**

- 🚀 [Introduction](#-introduction)
- 🔍 [Extraction des URLs depuis du texte brut](#-extracting-urls-from-text)
- 🛳️ [La regex de plus de 120 octets](#️-the-120-byte-regex)
- 🧩 [Décomposition étape par étape](#-breaking-it-down-step-by-step)
- 🛠️ [Exemple d'analyse](#-pa)
- ☑️ [Prochaines étapes](#-next-steps)
- 📝 [Résumé](#-summary)
- 📚 [Pour aller plus loin](#-further-learning)

**TL;DR :** Passez directement à la [regex de plus de 120 octets](#️-the-120-byte-regex).

## 🚀 Introduction

L'extraction d'URLs depuis du texte brut peut parfois ressembler à une partie de whack-a-mole. La ponctuation, les parenthèses englobantes et les formats ambigus s'associent pour saboter vos efforts. Que vous développiez un web scraper, un analyseur de données ou une application de chat, l'extraction fiable des URLs est indispensable.

Dans cet article, nous abordons le problème de front avec une approche flexible en deux étapes. Notre objectif est de **capturer toutes les chaînes _potentielles_ de type URL en premier**, puis de traiter la validation dans une étape ultérieure.

> 💡 **Note :** Ce pattern ne sert pas à **_valider_** des URLs ! Il est délibérément permissif concernant la ponctuation et les erreurs de saisie.

## 🔍 Objectif : Extraire des URLs depuis du texte

Lors de l'extraction d'URLs depuis du texte brut, une approche en deux étapes fait ses preuves :

1. **Capturer tout ce qui ressemble à une URL** : Lancer un large filet pour saisir toutes les chaînes qui *pourraient* être des URLs. C'est là que notre "regex de plus de 120 octets" montre toute son utilité.
2. **Valider** : Une fois ces candidats capturés, utilisez des vérifications secondaires (par ex. résolution DNS, comparaison avec des domaines connus) pour écarter les entrées invalides.

### Visualiser le défi

Les termes `extract` et `parse` sont souvent employés de manière interchangeable, mais ils désignent des processus distincts. L'extraction d'URL consiste à identifier et à capturer des chaînes susceptibles d'être des URL au sein d'un texte plus large. Le parsing, en revanche, consiste à décomposer ces URL en leurs composants élémentaires.

Lorsque j'évoque le parsing ou les « parties d'une URL », je fais référence aux composants suivants :

<figure>
  <figcaption>Les 5 parties de toute URL</figcaption>
![Anatomie d'une URL, visualisée](../WhatUrlsAreMadeOf-ColorMatched.svg "Anatomie d'une URL, visualisée")
</figure>

<details class="inset breakout">
  <summary>Cliquez pour afficher une capture d'écran de la correspondance de sous-chaîne sur RegEx101.</summary>

  Avant d'entrer trop profondément dans la regex, utilisons un outil visuel pour évaluer la capacité de mon pattern à capturer un grand nombre de correspondances :

  <figure>
    <figcaption>Utilisation de [RegEx101.com](https://regex101.com/r/jO8bC4/69) pour visualiser les correspondances multi-lignes</figcaption>
    ![Aperçu des correspondances multi-lignes groupées](../RegEx101-Matches-Screenshot.webp "Aperçu des résultats multi-lignes groupés")
  </figure>
</details>

## La regex de plus de 120 octets

Voici une regex concise conçue pour extraire et analyser les URL en une seule passe. Elle prend en charge divers protocoles, domaines, chemins, ainsi que les sections optionnelles de requête et de fragment.

Ne vous inquiétez pas — nous allons l'analyser étape par étape !

```js title="Regex URL de plus de 120 octets" frame="code"
const urlRegex = /([-.a-z0-9]+:\/{1,3})([^-\/\.[\](|)\s?][^`\/\s\]?]+)([-_a-z0-9!@$%^&*()=+;/~\.]*)[?]?([^#\s`?]*)[#]?([^#\s'"`\.,!]*)/gi;
// Compatibility: ES5+

// Same pattern, split on newlines for readability:
([-.a-z0-9]+:\/{1,3})
([^-\/\.[\](|)\s?][^`\/\s\]?]+)
([-_a-z0-9!@$%^&*()=+;/~\.]*)
[?]?([^#\s`?]*)
[#]?([^#\s'"`\.,!]*)

```

<blockquote class="inset">Partagez les regex les plus délirantes que vous ayez rencontrées (ou rédigées) dans les <a href="#post-comments">commentaires ci-dessous !</a> 🚀</blockquote>

## 🧩 Décomposition étape par étape

Décortiquons la regex en ses composants pour comprendre son fonctionnement :

<h3>1. Protocole (Groupe 1) : <code>{`([-.a-z0-9]+:\/{1,3})`}</code></h3>

<ul>
  <li>**Objectif :** Capture la partie protocole de l'URL (ex. `http://`, `ftp://`, `custom-scheme://`).</li>
  <li>
    **Explication :**
    <ul>
      <li><code>[-.a-z0-9]+</code> : Correspond à une ou plusieurs lettres minuscules, chiffres, tirets ou points (courant dans les schémas de protocole).</li>
      <li><code>{`:\/{1,3}`}</code> : Correspond à un deux-points suivi de une à trois barres obliques (<code>:/</code>, <code>://</code> ou <code>:///</code>).</li>
    </ul>
  </li>
</ul>

<h3>2. Domaine (Groupe 2) : <code>{`([^-\/\.[\](|)\s?][^\`\/\s\]?]+)`}</code></h3>

<ul>
  <li>**Objectif :** Capture la partie domaine ou hôte de l'URL.</li>
  <li>
    **Explication :**
    <ul>
      <li><code>[^-\/\.[\](|)\s?]</code> : Correspond à tout caractère sauf les caractères spéciaux et espaces indiqués.</li>
      <li><code>[^`\/\s\]?]+</code> : Correspond à un ou plusieurs caractères sauf les backticks, barres obliques, espaces ou crochets fermants.</li>
    </ul>
  </li>
</ul>

<h3>3. Chemin (Groupe 3) : <code>{`([-_a-z0-9!@$%^&*()=+;/~\\.]*)`}</code></h3>

<ul>
  <li>**Objectif :** Correspond au composant chemin de l'URL.</li>
  <li>
    **Explication :**
    <ul>
      <li><code>[-_a-z0-9!@$%^&*()=+;/~\.]*</code> : Correspond à zéro ou plusieurs caractères sécurisés pour les URL, couramment rencontrés dans les chemins.</li>
    </ul>
  </li>
</ul>

<h3>4. Chaîne de requête (Groupe 4) : <code>[?]?([^#\s`?]*)</code></h3>

<ul>
  <li>**Objectif :** Correspond de manière optionnelle à une chaîne de requête, commençant par n'importe quel caractère <code>?</code>.</li>
  <li>
    **Explication :**
    <ul>
      <li><code>[?]?</code> : Correspond de manière optionnelle à un <code>?</code>. (Les crochets ne sont pas strictement nécessaires, mais ils améliorent légèrement la lisibilité par rapport au double <code>??</code> très concis. Ils créent aussi un parallèle visuel avec le groupe de correspondance suivant, similaire : <code>[#]?</code>.)</li>
      <li><code>([^#\s`?]*)</code> : Correspond à zéro ou plusieurs caractères qui ne sont ni un dièse, ni un espace, ni un accent grave, ni un point d'interrogation.</li>
    </ul>
  </li>
</ul>

<h3>5. Fragment (Groupe 5) : <code>[#]?([^#\s'"`\.,!]*)</code></h3>

<ul>
  <li>**Objectif :** Correspond de manière optionnelle à l'identifiant de fragment, commençant par un <code>#</code>.</li>
  <li>
    **Explication :**
    <ul>
      <li><code>[#]?</code> : Correspond de manière optionnelle à un <code>#</code>.</li>
      <li><code>([^#\s'"`\.,!]*)</code> : Correspond à zéro ou plusieurs caractères qui ne sont pas de la ponctuation interdite ou des espaces.</li>
    </ul>
  </li>
</ul>

<h2>🛠️ Exemple d'analyse</h2>

Voici comment exploiter cette regex monstrueuse avec un peu de JavaScript :

<CodeTabs client:only
 tabs={[
    "Code : Extraction d'URLs",
    "Résultats : URLs extraites",
    "Résultats : Composants d'URL",
  ]} >
```js title="extract-urls.js" frame="code"
const text = `
Check this out: https://example.com/path?query=123#section
And also (ftp://files.server.org/index).
Plus a weird one: custom-scheme://host/param;weird^stuff
`;

const urlRegex =
  /([-.a-z0-9]+:\/{1,3})([^-\/\.[\](|)\s?][^`\/\s\]?]+)([-_a-z0-9!@$%^&*()=+;/~\.]*)[?]?([^#\s`?]*)[#]?([^#\s'"`\.,!]*)/gi;

const matches = [
  ...text.matchAll(urlRegex),
].map((match) => match[0]);
console.log("Extracted URLs:", matches);

const parts = [
  ...text.matchAll(urlRegex),
].map((match) => match.slice(1));
console.log("Extracted Parts:", parts);
```

```json title="extracted-urls.json"
[
  "https://example.com/path?query=123#section",
  "ftp://files.server.org/index",
  "custom-scheme://host/param;weird^stuff"
]
```

```json title="urls-parts.json"
[
  [
    "https://",    // Protocol
    "example.com", // Domain
    "/path",       // Path
    "query=123",   // Query
    "section"      // Fragment
  ],
  [
    "ftp://",           // Protocol
    "files.server.org", // Domain
    "/index",           // Path
    "",                 // Query
    ""                  // Fragment
  ],
  [
    "custom-scheme://",   // Protocol
    "host",               // Domain
    "/param;weird^stuff", // Path
    "",                   // Query
    ""                    // Fragment
  ]
]
```

</CodeTabs>

## ☑️ Étapes suivantes

Selon votre cas d'usage, vous devrez peut-être affiner cette regex ou ajouter des étapes de validation et de post-traitement.

### Projets variés, besoins distincts

Les projets présentent des exigences et des enjeux de sécurité variés :

1. **Web Scraping** : Valider les URL pour garantir leur accessibilité et leur fiabilité.
2. **Traitement des données** : Extraire les URL de contenus générés par les utilisateurs tout en maintenant des contrôles de sécurité.
3. **Analyse de données** : Filtrer les doublons ou les liens non pertinents à des fins de recherche ou de marketing.
4. **Applications côté utilisateur** : Transformer automatiquement les URL en liens hypertextes dans les applications de chat ou les forums.

### Post-traitement et validation

Une fois les URL candidates récupérées, appliquez des vérifications supplémentaires :

- **Résolution DNS** : Vérifier que les noms de domaine résolvent correctement.
- **Contrôles de sécurité** : Utiliser des services pour vérifier la réputation des domaines et réduire les risques liés aux sites malveillants ou au phishing.
- **Règles spécifiques** : Appliquer des filtres propres au projet (ex. : TLD autorisés, longueur maximale d'URL).

## 📝 Résumé

L'extraction de données textuelles semi-structurées est probablement la partie la plus gratifiante de la maîtrise des regex.

Voici un résumé des points clés à retenir :

- **Utiliser un outil visuel pour rédiger, tester** & comprendre vos [expressions régulières.](https://regex101.com/r/jO8bC4/69)
- **Découper le problème en sous-parties** et les traiter séparément. À ce titre, les groupes de capture servent de jalons figuratifs pour structurer notre regex.
- **Privilégier des expressions de correspondance larges, éviter une conformité stricte aux spécifications** lors de l'ingestion de données.
- **Appliquer des étapes de validation** après l'extraction initiale est indispensable ; tenez toujours compte de la sécurité de votre projet et de ses contraintes spécifiques.

En suivant cette approche, vous pouvez extraire efficacement toute donnée textuelle semi-structurée, posant ainsi les bases d'un traitement et d'une validation ultérieurs.

## 📚 Pour aller plus loin

- N'hésitez pas à expérimenter avec la [démo en ligne sur RegEx101.com](https://regex101.com/r/jO8bC4/69) !
- La question d'origine sur StackOverflow, ainsi qu'[un lien vers ma réponse ici même](https://stackoverflow.com/a/34669019/369727).
- [Documentation MDN sur les expressions régulières](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions)
- [Techniques avancées de regex](https://www.regular-expressions.info/) : Explorez les lookaheads, lookbehinds et autres motifs avancés pour une correspondance plus précise.
- [RFC 3986 - Syntaxe générique des URI](https://datatracker.ietf.org/doc/html/rfc3986)
````
