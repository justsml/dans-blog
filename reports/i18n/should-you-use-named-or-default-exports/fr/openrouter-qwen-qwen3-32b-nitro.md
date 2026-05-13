# Translation Candidate
- Slug: should-you-use-named-or-default-exports
- Locale: fr
- Model: openrouter/qwen/qwen3-32b:nitro
- Target: src/content/posts/2023-08-18--should-you-use-named-or-default-exports/fr/index.mdx
- Validation: passed
- Runtime seconds: 10.65
- Input tokens: 4120
- Output tokens: 4327
- Thinking tokens: unknown
- Cached input tokens: 512
- Cache write tokens: 0
- Estimated cost: $0.001368
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
social_image: ../desktop-social.webp
title: 'Exports ESM : nommés vs. par défaut ?'
subTitle: ''
date: '2023-08-10'
modified: '2024-08-01'
tags:
  - typescript
  - javascript
  - modules
category: Guides
subCategory: JavaScript
cover: ../austin-kirk-cHX_Eih2hkY-unsplash-cropped.webp
cover_mobile: ../w300_austin-kirk-cHX_Eih2hkY-unsplash-cropped.webp
cover_icon: ../icon_austin-kirk-cHX_Eih2hkY-unsplash-cropped.webp
---
## Doit-on utiliser les exports `named` ou `default` en JavaScript ?  

Il n'y a pas manqué d'articles fortement argumentés sur ce sujet.  

La majorité jugent le `default export` comme étant « terrible ». D'autres affirment que le `default` devrait l'emporter (par ex. le guide de style d'AirBnb).  

Ils attribuent souvent à tort des problèmes **entièrement temporaires** : bugs d'auto-import des IDE, capacités de *tree-shaking* d'un bundler particulier, ou même la simple possibilité de fautes de frappe lors de la nomination d'un import.  

Avons-nous oublié l'essence même de l'`export` ?  

**Le code est une communication. ✨**

> Nous envoyons un signal aux importateurs sur la façon d'utiliser quelque chose.  

### Alors, qu'est-ce que nous disons ?  

En général, il y a deux façons d'exporter des éléments en JavaScript moderne :  

- Un `export default` affirme clairement « C'EST **LA SEULE ET PRINCIPALE CHOSE** ». Il ajoute aussi : « les exports nommés n'ont qu'un rôle secondaire ».  
- Un `named export` signifie « C'EST BIEN **UNE CHOSE !** ». Il soulève aussi des questions : « Y a-t-il d'autres compagnons ? » Puis : « Sont-ils invités ou obligatoires ? »  

Bien sûr, vous pouvez combiner les deux, ou utiliser différentes approches selon les parties de votre base de code. [Voir plus d'exemples à la fin de l'article.](#summary)  

### Des arguments faibles, mec

Abordons quelques-uns des problèmes fréquents que les gens rencontrent.

- Arg #1 : Les exports nommés garantissent la cohérence des noms. [source](https://blog.neufund.org/why-we-have-banned-default-exports-and-you-should-do-the-same-d51fdc2cf2ad)
  - Non, ils ne le font pas. Cherchez-vous peut-être une règle de vérification (lint) ?
  - (Je déteste devoir vous le dire, mais attendez de découvrir ce que peuvent faire les variables !)

```tsx
// Vous pouvez utiliser des alias avec les deux !
import { Knife as Handle } from "./knife.js"; // 🔪
import { default as Handle } from "./knife.js"; // 🔪
import Handle from "./knife.js"; // 🔪
```

- Arg #2 : Utilisez `import * as soManyKnives from './kinves.js'` pour regrouper les exports nommés. (Aucun lien, l'auteur a retiré son argument.)
  - Fonctionnalité sympa. Pas le sujet principal.
  - Dites-moi maintenant, comment dois-je manipuler votre dispositif ? Aucune intention de l'auteur.

- Arg #3 : Les exports nommés offrent un meilleur support pour les imports ou renommages dans les IDE. [source](https://www.bundleapps.io/blog/use-named-exports-over-default-exports-in-javascript)

- Incorrect (depuis plus de 3 ans). Configurez/mettez à jour vos outils.
  - Le support existe depuis plus de 3 ans dans [VS Code](https://github.com/microsoft/vscode/pull/94480), IntelliJ, etc.
  - Cependant, certaines "bonnes pratiques" s'appliquent aux `default exports` pour optimiser l'expérience IDE et le réfactoring.
  - ✅ `export default function UserService() {}` - préférez toujours les fonctions nommées.
  - ❌ `export default function() { }` - les fonctions anonymes ne sont pas liées implicitement à leur nom de fichier. Si vous ne nommez pas l'objet, il devient difficile de demander à l'ordinateur de le modifier.
  - **Note :** Pour des raisons historiques, vous ne pouvez pas combiner `export default` avec une expression `const`.

    ```tsx
    export default const Knife = () => {...blade, ...handle}
    // ^ ❌ Non supporté ❌ ^
    // Ne peut pas exporter default const ...
    // ==========================

    // Cependant, une fois déclarée, vous pouvez exporter une variable const en tant que par défaut.
    const Knife = () => {...blade, ...handle}
    export default Knife;
    // ^ ✅ Valide

    // Pour compléter :
    export default class anyoneStillUseThese {}
    // ^ ✅ Valide également pour exporter une classe par défaut
    ```

<section className="scroll-x">
## Résumé

Il existe de nombreuses combinaisons d'export, chacune racontant une histoire différente :

| Par défaut (Exports) | Nommés (Exports) | Fonctions privées | Modèle                                                   | Signification                                                 |
| --------------------- | ---------------- | ----------------- | --------------------------------------------------------- | ------------------------------------------------------------- |
| ✅                   | ❌               | ❌               | Un seul export par défaut.                               | « Je présente UNE fonction à usage unique ! »                 |
| ❌                   | ✅               | ❌               | Un seul export nommé.                                    | « Ne me renommez pas, s'il vous plaît. »                     |
| ✅                   | ✅               | ✅               | Export par défaut + fonctions non exportées.             | « Voici une logique liée. Attendez-vous aussi un comportement orienté classe. » |
| ❌                   | ❌               | ✅               | Plusieurs exports nommés, nom de fichier générique.      | « Un ensemble disparate de choses liées, sans hiérarchie. »  |
| ✅                   | ✅               | ❌               | Un export nommé également exporté par défaut.            | « Vous ne pourrez pas vous tromper en m'important. »         |
</section>

**Une question à réfléchir :** Qu'exprime-t-on lorsque le nom du fichier correspond (ou non) à l'un de ses exports ? (Par exemple, un `utils.js` contenant de nombreuses fonctions.)

### Conclusion

Si le Code est Communication, `export` comme si tu y mettais toute ton âme. 💞  
Merci.
````
