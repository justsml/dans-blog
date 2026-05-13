# Translation Candidate
- Slug: from-zero-to-regex-hero-extract-url-like-strings
- Locale: fr
- Model: openrouter/openai/gpt-oss-120b:nitro
- Target: src/content/posts/2024-12-29--from-zero-to-regex-hero-extract-url-like-strings/fr/index.mdx
- Validation: passed
- Runtime seconds: 3.55
- Input tokens: 10501
- Output tokens: 3701
- Thinking tokens: unknown
- Cached input tokens: 5504
- Cache write tokens: 0
- Estimated cost: $0.001076
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
title: De zéro à héros du regex
subTitle: >-
  Extraire & analyser les chaînes de type URL avec une seule expression
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

**Table of Contents**

- 🚀 [Introduction](#-introduction)
- 🔍 [Extraction d'URL depuis le texte](#-extracting-urls-from-text)
- 🛳️ [L'expression régulière de 120 + octets](#️-the-120-byte-regex)
- 🧩 [Décomposition pas à pas](#-breaking-it-down-step-by-step)
- 🛠️ [Exemple d'analyse](#-pa)
- ☑️ [Prochaines étapes](#-next-steps)
- 📝 [Résumé](#-summary)
- 📚 [Approfondissements](#-further-learning)

**TL;DR :** Passez directement à la [expression régulière de 120 + octets](#️-the-120-byte-regex).

## 🚀 Introduction

Extraire des URL d'un texte brut peut parfois ressembler à une partie fastidieuse de « whack‑a‑mole ». La ponctuation, les parenthèses et les formats ambigus conspirent tous à contrecarrer vos tentatives. Que vous construisiez un scraper web, un analyseur de données ou une application de messagerie, extraire les URL avec précision est indispensable.

Dans cet article, nous abordons le problème de front avec une approche flexible en deux étapes. Notre objectif est de **capturer d'abord toutes les chaînes _potentiellement_ ressemblant à des URL** puis de gérer la validation dans un processus ultérieur.

> 💡 **Note :** Ce motif n’est pas destiné à **_valider_** des URL ! Il est volontairement permissif concernant la ponctuation et les fautes d’orthographe.

## 🔍 Objectif : Extraire des URL du texte

Lors de l’extraction d’URL à partir d’un texte brut, une approche en deux étapes s’avère efficace :

1. **Capturer tout ce qui ressemble à une URL** : Jetez un large filet pour récupérer toutes les chaînes qui *pourraient* être des URL. C’est ici que notre « regex de 120 + octets » brille.
2. **Valider** : Une fois ces candidats capturés, appliquez des vérifications secondaires (par exemple, résolution DNS, comparaison avec des domaines connus) pour éliminer les entrées invalides.

### Visualiser le défi

Les termes `extract` et `parse` sont souvent employés comme synonymes, mais ils désignent des processus distincts. Extraire des URL consiste à identifier et à capturer les chaînes susceptibles d’être des URL dans un texte plus vaste. Le parsing, en revanche, consiste à décomposer ces URL en leurs composants constitutifs.

Lorsque je parle de parsing ou de « parts d’URL », je fais référence aux éléments suivants :

<figure>
  <figcaption>Les 5 parties de toutes les URL</figcaption>
![URL anatomy, visualized](../WhatUrlsAreMadeOf-ColorMatched.svg "URL anatomy, visualized")
</figure>

<details class="inset breakout">
  <summary>Cliquez pour voir une capture d’écran du matching de sous‑chaînes de RegEx101.</summary>

  Avant d’aller plus loin dans l’expression régulière, utilisons un outil visuel pour vérifier à quel point mon motif capture de nombreux correspondances :

  <figure>
    <figcaption>Utilisation de [RegEx101.com](https://regex101.com/r/jO8bC4/69) pour visualiser les correspondances multi‑lignes</figcaption>
    ![Preview 'bulk' multi-line matches](../RegEx101-Matches-Screenshot.webp "Preview 'bulk' multi-line results")
  </figure>
</details>

## L’expression régulière de 120 + octets

Voici une expression régulière concise conçue pour extraire et analyser les URL en une seule passe. Elle prend en charge divers protocoles, domaines, chemins et sections optionnelles de requête/fragment.

Ne vousinquiétez pas — nous allons décortiquer tout cela étape par étape !

```js title="120+ Byte URL Regex" frame="code"
const urlRegex = /([-.a-z0-9]+:\/{1,3})([^-\/\.[\](|)\s?][^`\/\s\]?]+)([-_a-z0-9!@$%^&*()=+;/~\.]*)[?]?([^#\s`?]*)[#]?([^#\s'"`\.,!]*)/gi;
// Compatibility: ES5+

// Même motif, découpé sur plusieurs lignes pour plus de lisibilité :
([-.a-z0-9]+:\/{1,3})
([^-\/\.[\](|)\s?][^`\/\s\]?]+)
([-_a-z0-9!@$%^&*()=+;/~\.]*)
[?]?([^#\s`?]*)
[#]?([^#\s'"`\.,!]*)

```

<blockquote class="inset">Partagez les expressions régulières les plus folles que vous avez rencontrées (ou que vous avez créées) dans les <a href="#post-comments">commentaires ci‑dessous</a> ! 🚀</blockquote>

## 🧩 Découpage détaillé, étape par étape

Décomposons l’expression régulière en ses composants pour comprendre son fonctionnement :

<h3>1. Protocole (Groupe 1) : <code>{`([-.a-z0-9]+:\/{1,3})`}</code></h3>

<ul>
  <li>**Objectif :** Correspond à la partie protocole de l’URL (par exemple `http://`, `ftp://`, `custom-scheme://`).</li>
  <li>
    **Explication :**
    <ul>
      <li><code>[-.a-z0-9]+</code> : Correspond à une ou plusieurs lettres minuscules, chiffres, tirets ou points (courants dans les schémas de protocole).</li>
      <li><code>{`:\/{1,3}`}</code> : Correspond à deux‑points suivi d’une à trois barres obliques (<code>:/</code>, <code>://</code> ou <code>:///</code>).</li>
    </ul>
  </li>
</ul>

<h3>2. Domaine (Groupe 2) : <code>{`([^-\/\.[\](|)\s?][^\`\/\s\]?]+)`}</code></h3>

<ul>
  <li>**Objectif :** Capture la partie domaine ou hôte de l’URL.</li>
  <li>
    **Explication :**
    <ul>
      <li><code>[^-\/\.[\](|)\s?]</code> : Correspond à tout caractère sauf les caractères spéciaux spécifiés et les espaces.</li>
      <li><code>[^`\/\s\]?]+</code> : Correspond à une ou plusieurs occurrences de caractères autres que les backticks, barres obliques, espaces ou crochets fermants.</li>
    </ul>
  </li>
</ul>

<h3>3. Chemin (Groupe 3) : <code>{`([-_a-z0-9!@$%^&*()=+;/~\\.]*)`}</code></h3>

<ul>
  <li>**Objectif :** Correspond au composant chemin de l’URL.</li>
  <li>
    **Explication :**
    <ul>
      <li><code>[-_a-z0-9!@$%^&*()=+;/~\.]*</code> : Correspond à zéro ou plusieurs caractères sûrs pour les URL, couramment rencontrés dans les chemins.</li>
    </ul>
  </li>
</ul>

<h3>4. Query (Groupe 4) : <code>[?]?([^#\s`?]*)</code></h3>

<ul>
  <li>**Objectif :** Correspond de façon optionnelle à une chaîne de requête, débutant par n’importe quel caractère <code>?</code>.</li>
  <li>
    **Explication :**
    <ul>
      <li><code>[?]?</code> : Correspond de façon optionnelle à un <code>?</code>. (Les crochets ne sont pas strictement nécessaires, mais ils sont légèrement plus clairs que le double <code>??</code> ultra concis. Ils offrent aussi une symétrie visuelle avec le groupe suivant <code>[#]?</code>.)</li>
      <li><code>([^#\s`?]*)</code> : Correspond à zéro ou plusieurs caractères qui ne sont pas un dièse, un espace, un backtick ou un point d’interrogation.</li>
    </ul>
  </li>
</ul>

<h3>5. Fragment (Groupe 5) : <code>[#]?([^#\s'"`\.,!]*)</code></h3>

<ul>
  <li>**Objectif :** Correspond de façon optionnelle à l’identifiant de fragment commençant par un <code>#</code>.</li>
  <li>
    **Explication :**
    <ul>
      <li><code>[#]?</code> : Correspond de façon optionnelle à un <code>#</code>.</li>
      <li><code>([^#\s'"`\.,!]*)</code> : Correspond à zéro ou plusieurs caractères qui ne sont pas une ponctuation interdite ou un espace.</li>
    </ul>
  </li>
</ul>

## 🛠️ Exemple d’analyse

Voici comment mettre en pratique ce regex monstrueux, avec un peu de JavaScript :

<CodeTabs client:only
 tabs={[
    "Code : Extraction d’URL",
    "Résultats : URL extraites",
    "Résultats : Parties d’URL",
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

Selon votre cas d’usage, il peut être nécessaire d’affiner ce regex ou d’ajouter des étapes de validation et de post‑traitement supplémentaires.

### Projets différents, besoins différents

Les projets ont des exigences variées et des préoccupations de sécurité :

1. **Web Scraping** : valider les URL pour s’assurer qu’elles sont accessibles et fiables.  
2. **Traitement de données** : extraire les URL du contenu généré par les utilisateurs tout en garantissant la sécurité.  
3. **Analyse de données** : filtrer les doublons ou les liens non pertinents pour la recherche ou le marketing.  
4. **Applications orientées utilisateur** : transformer automatiquement les URL en hyperliens dans les chats ou les forums.  

### Post‑traitement et validation  

Après avoir collecté les URL potentielles, appliquez des contrôles supplémentaires :  

- **Recherche DNS** : vérifier que les domaines se résolvent.  
- **Contrôles de sécurité** : utiliser des services pour détecter les sites malveillants ou de phishing.  
- **Règles personnalisées** : appliquer des filtres propres au projet (par ex. TLD autorisés, longueur maximale d’URL).  

## 📝 Résumé  

Extraire des chaînes semi‑structurées peut bien être la partie la plus gratifiante de la maîtrise des expressions régulières.

Voici un récapitulatif des points clés :

- **Utilisez un outil visuel pour écrire, tester** & comprendre vos [modèles Regex](https://regex101.com/r/jO8bC4/69).  
- **Décomposez le problème en parties** et résolvez chaque partie séparément. En quelque sorte, les groupes de capture nous offrent des « marqueurs de piste » figuratifs pour notre regex.  
- **Préférez des expressions « lâches »**, évitez de vous conformer strictement à la spécification lors de l’ingestion de données.  
- **Appliquez des étapes de validation** après l’extraction initiale — c’est indispensable ; tenez toujours compte des exigences de sécurité et des besoins spécifiques de votre projet.

En suivant ces étapes, vous pouvez extraire efficacement n’importe quelle chaîne semi‑structurée, posant ainsi les bases d’un traitement et d’une validation ultérieurs.

## 📚 Apprentissage complémentaire

- N’oubliez pas de jouer avec une [démo en direct sur RegEx101.com](https://regex101.com/r/jO8bC4/69) !  
- Question originale sur StackOverflow, et un [lien vers ma réponse ici](https://stackoverflow.com/a/34669019/369727).  
- [Documentation MDN sur les expressions régulières](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions)  
- [Techniques avancées de regex](https://www.regular-expressions.info/) : explorez les lookaheads, lookbehinds et autres motifs avancés pour un appariement plus précis.  
- [RFC 3986 – Syntaxe générique d’URI](https://datatracker.ietf.org/doc/html/rfc3986)
````
