# Translation Candidate
- Slug: from-zero-to-regex-hero-extract-url-like-strings
- Locale: fr
- Model: deepseek/deepseek-v4-flash
- Target: src/content/posts/2024-12-29--from-zero-to-regex-hero-extract-url-like-strings/fr/index.mdx
- Validation: deferred
- Runtime seconds: 84.38
- Input tokens: 10490
- Output tokens: 12730
- Thinking tokens: unknown
- Cached input tokens: 1536
- Cache write tokens: 0
- Estimated cost: $0.004822
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
title: De zéro à héros des regex
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
import { CodeTabs } from '../../../../../components/CodeTabs';

**Table des matières**

- 🚀 [Introduction](#-introduction)
- 🔍 [Extraction d'URLs à partir de texte](#-extracting-urls-from-text)
- 🛳️ [L'expression régulière de 120+ octets](#️-the-120-byte-regex)
- 🧩 [Décomposition étape par étape](#-breaking-it-down-step-by-step)
- 🛠️ [Exemple d'analyse](#-pa)
- ☑️ [Prochaines étapes](#-next-steps)
- 📝 [Résumé](#-summary)
- 📚 [Pour aller plus loin](#-further-learning)

**TL;DR :** Passez directement à [l'expression régulière de 120+ octets](#️-the-120-byte-regex).

## 🚀 Introduction

Extraire des URL à partir de texte brut peut parfois ressembler à un jeu fastidieux de tape-taupe. La ponctuation, les parenthèses et le formatage ambigu conspirent pour frustrer vos efforts. Que vous construisiez un scraper web, un analyseur de données ou une application de chat, extraire précisément les URL est essentiel.

Dans cet article, nous abordons le problème de front avec une approche flexible en deux étapes. Notre objectif est de **capturer d'abord toutes les chaînes _potentiellement_ similaires à des URL**, puis de gérer la validation dans un processus ultérieur.

> 💡 **Remarque :** Ce motif n'est pas destiné à **_valider_** des URL ! Il est intentionnellement permissif avec la ponctuation et les fautes d'orthographe.

## 🔍 Objectif : Extraire des URL à partir de texte

Lors de l'extraction d'URL à partir de texte brut, une approche en deux étapes est efficace :

1. **Capturer tout ce qui ressemble à une URL** : Jetez un filet large pour attraper toutes les chaînes qui *pourraient* être des URL. C'est là que notre « regex de 120+ octets » brille.
2. **Valider** : Une fois ces candidates capturées, utilisez des vérifications secondaires (par exemple, résolution DNS, comparaison avec des domaines connus) pour éliminer les entrées invalides.

### Visualiser le défi

Les termes `extract` et `parse` sont souvent utilisés de manière interchangeable, mais ils désignent des processus distincts. Extraire des URL consiste à identifier et capturer des URL potentielles dans un corpus de texte plus large. Analyser (parser), en revanche, consiste à décomposer ces URL en leurs parties constitutives.

Quand je mentionne l'analyse (parsing) ou les « parties d'URL », je fais référence aux composants suivants :

<figure>
  <figcaption>Les 5 parties de toutes les URL</figcaption>
![Anatomie d'une URL, visualisée](../WhatUrlsAreMadeOf-ColorMatched.svg "Anatomie d'une URL, visualisée")
</figure>

<details class="inset breakout">
  <summary>Cliquez pour voir une capture d'écran de la correspondance de sous-chaînes de RegEx101.</summary>

  Avant d'entrer trop dans les détails de l'expression régulière, utilisons un outil visuel pour voir à quel point mon motif capture de nombreuses correspondances :

  <figure>
    <figcaption>Utilisation de [RegEx101.com](https://regex101.com/r/jO8bC4/69) pour visualiser les correspondances multi-lignes</figcaption>
    ![Aperçu des correspondances multi-lignes « en bloc »](../RegEx101-Matches-Screenshot.webp "Aperçu des résultats multi-lignes « en bloc »")
  </figure>
</details>

## L'expression régulière de 120+ octets

Ci-dessous se trouve une expression régulière concise conçue pour extraire et analyser les URL en une seule fois. Elle prend en charge divers protocoles, domaines, chemins et sections optionnelles de requête/fragment.

Ne vous inquiétez pas — nous allons le décomposer étape par étape !

```js title="120+ Byte URL Regex" frame="code"
const urlRegex = /([-.a-z0-9]+:\/{1,3})([^-\/\.[\](|)\s?][^`\/\s\]?]+)([-_a-z0-9!@$%^&*()=+;/~\.]*)[?]?([^#\s`?]*)[#]?([^#\s'"`\.,!]*)/gi;
// Compatibility: ES5+

// Same pattern, split on newlines for readability:
([-.a-z0-9]+:\/{1,3})
([^-\/\.[\](|)\s?][^`\/\s\]?]+)
([-_a-z0-9!@$%^&*()=+;/~\.]*)
[?]?([^#\s`?]*)
[#]?([^#\s'"`\.,!]*)

```

<blockquote class="inset">Partagez les expressions régulières les plus folles que vous avez rencontrées (ou écrites) dans les <a href="#post-comments">commentaires ci-dessous !</a> 🚀</blockquote>

## 🧩 Décomposition étape par étape

Décortiquons l'expression régulière en ses composants pour comprendre son fonctionnement :

<h3>1. Protocole (Groupe 1) : <code>{`([-.a-z0-9]+:\/{1,3})`}</code></h3>

<ul>
  <li>**Objectif :** Correspond à la partie Protocole de l'URL (par ex., `http://`, `ftp://`, `custom-scheme://`).</li>
  <li>
    **Explication :**
    <ul>
      <li><code>[-.a-z0-9]+</code> : Correspond à une ou plusieurs lettres minuscules, chiffres, traits d'union ou points (courants dans les schémas de protocole).</li>
      <li><code>{`:\/{1,3}`}</code> : Correspond à un deux-points suivi d'un à trois slashs (<code>:/</code>, <code>://</code> ou <code>:///</code>).</li>
    </ul>
  </li>
</ul>

<h3>2. Domaine (Groupe 2) : <code>{`([^-\/\.[\](|)\s?][^\`\/\s\]?]+)`}</code></h3>

<ul>
  <li>**Objectif :** Capture la partie domaine ou hôte de l'URL.</li>
  <li>
    **Explication :**
    <ul>
      <li><code>[^-\/\.[\](|)\s?]</code> : Correspond à tout caractère sauf les caractères spéciaux spécifiés et les espaces.</li>
      <li><code>[^`\/\s\]?]+</code> : Correspond à un ou plusieurs caractères sauf les backticks, slashs, espaces ou crochets fermants.</li>
    </ul>
  </li>
</ul>

<h3>3. Chemin (Groupe 3) : <code>{`([-_a-z0-9!@$%^&*()=+;/~\\.]*)`}</code></h3>

<ul>
  <li>**Objectif :** Correspond au composant chemin de l'URL.</li>
  <li>
    **Explication :**
    <ul>
      <li><code>[-_a-z0-9!@$%^&*()=+;/~\.]*</code> : Correspond à zéro ou plusieurs caractères sûrs pour les URL, couramment trouvés dans les chemins.</li>
    </ul>
  </li>
</ul>

<h3>4. Requête (Groupe 4) : <code>[?]?([^#\s`?]*)</code></h3>

<ul>
  <li>**Objectif :** Correspond optionnellement à une chaîne de requête, commençant par n'importe quel caractère <code>?</code>.</li>
  <li>
    **Explication :**
    <ul>
      <li><code>[?]?</code> : Correspond optionnellement à un <code>?</code>. (Les crochets ne sont pas strictement nécessaires, mais ils sont légèrement plus clairs que le double <code>??</code> très concis. Cela fournit également un parallèle visuel avec le groupe de correspondance suivant (similaire) <code>[#]?</code>.)</li>
      <li><code>([^#\s`?]*)</code> : Correspond à zéro ou plusieurs caractères qui ne sont ni un dièse, un espace blanc, un backtick, ni un point d'interrogation.</li>
    </ul>
  </li>
</ul>

<h3>5. Fragment (Groupe 5) : <code>[#]?([^#\s'"`\.,!]*)</code></h3>

<ul>
  <li>**Objectif :** Correspond optionnellement à l'identifiant de fragment commençant par un <code>#</code>.</li>
  <li>
    **Explication :**
    <ul>
      <li><code>[#]?</code> : Correspond optionnellement à un <code>#</code>.</li>
      <li><code>([^#\s'"`\.,!]*)</code> : Correspond à zéro ou plusieurs caractères qui ne sont ni une ponctuation interdite ni un espace blanc.</li>
    </ul>
  </li>
</ul>

## 🛠️ Exemple d'analyse

Voici comment mettre ce regex monstre à l'œuvre, avec un peu de JavaScript :

<CodeTabs client:only
 tabs={[
    "Code : Extraire les URL",
    "Résultats : URL extraites",
    "Résultats : Parties d'URL",
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

## ☑️ Prochaines étapes

Selon votre cas d'usage, vous devrez peut-être affiner ce regex ou ajouter davantage d'étapes de validation et de post-traitement.

### Projets différents, besoins différents

Les projets ont des exigences et des préoccupations de sécurité variées :

1. **Web Scraping** : Validez les URL pour vérifier qu'elles sont accessibles et fiables.
2. **Traitement de données** : Extrayez les URL de contenu généré par les utilisateurs tout en garantissant la sécurité.
3. **Analyse de données** : Filtrez les doublons ou les liens non pertinents à des fins de recherche ou de marketing.
4. **Applications utilisateur** : Créez automatiquement des hyperliens vers les URL dans les applications de chat ou les forums.

### Post-traitement et validation

Après avoir collecté les URL potentielles, appliquez des vérifications supplémentaires :

- **Recherche DNS** : Vérifiez que les domaines résolvent.
- **Vérifications de sécurité** : Utilisez des services pour détecter les sites malveillants ou de phishing.
- **Règles personnalisées** : Appliquez des filtres spécifiques au projet (par exemple, TLD autorisés, longueur maximale d'URL).

## 📝 Résumé

Extraire des données textuelles semi-structurées est peut-être la partie la plus gratifiante de la maîtrise des regex.

Voici un récapitulatif des points clés :

- **Utilisez un outil visuel pour écrire, tester** et comprendre vos [expressions régulières.](https://regex101.com/r/jO8bC4/69)
- **Décomposez le problème en parties** et résolvez chaque partie séparément. Dans un sens, les groupes de capture nous fournissent des « balises de piste » figuratives pour notre regex.
- **Utilisez des expressions de correspondance « lâches », évitez la conformité stricte aux spécifications** lors de l'ingestion de données.
- **Appliquer des étapes de validation** après l'extraction initiale est essentiel – tenez toujours compte de la sécurité et des besoins spécifiques de votre projet.

En suivant ces étapes, vous pouvez extraire efficacement n'importe quelle donnée textuelle semi-structurée, posant ainsi les bases d'un traitement et d'une validation ultérieurs.

## 📚 Pour aller plus loin

- N'oubliez pas de jouer avec une [démo en direct sur RegEx101.com](https://regex101.com/r/jO8bC4/69) !
- Question originale sur StackOverflow, et un [lien vers ma réponse ici même](https://stackoverflow.com/a/34669019/369727).
- [Documentation MDN sur les expressions régulières](https://developer.mozilla.org/fr/docs/Web/JavaScript/Guide/Regular_Expressions)
- [Techniques avancées de regex](https://www.regular-expressions.info/) : Explorez les lookaheads, lookbehinds et autres motifs avancés pour une correspondance plus précise.
- [RFC 3986 – Syntaxe générique des URI](https://datatracker.ietf.org/doc/html/rfc3986)
````
