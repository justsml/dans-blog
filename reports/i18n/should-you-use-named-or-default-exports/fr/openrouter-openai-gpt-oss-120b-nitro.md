# Translation Candidate
- Slug: should-you-use-named-or-default-exports
- Locale: fr
- Model: openrouter/openai/gpt-oss-120b:nitro
- Target: src/content/posts/2023-08-18--should-you-use-named-or-default-exports/fr/index.mdx
- Validation: passed
- Runtime seconds: 3.70
- Input tokens: 4314
- Output tokens: 1851
- Thinking tokens: unknown
- Cached input tokens: 2176
- Cache write tokens: 0
- Estimated cost: $0.000501
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
social_image: ../desktop-social.webp
title: 'Exports ESM : nommés vs. par défaut ?'
subTitle: Nommer ou ne pas nommer ?
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
## Shouldyou use `named` or `default` exports in JavaScript?

Il n’y a pas de pénurie d’articles virulents sur le sujet.

La majorité juge le `default export` comme « terrible ». D’autres soutiennent que le `default` doit l’emporter (p. ex. le guide de style AirBnb).

Ils blâment souvent des choses **entièrement temporaires** : bugs d’auto‑importation dans les IDE, les capacités de tree‑shaking d’un bundler particulier, ou la simple possibilité de fautes de frappe lors du nommage d’une importation.

Avons‑nous manqué le but même de l’`export` ?

**Le code est une communication. ✨**

> Nous envoyons un signal aux `import`eurs _sur la façon d’utiliser une chose._

### Alors, que disons‑nous ?

En gros, il existe 2 façons d’exporter des choses en JavaScript moderne :

- Un `export default` déclare fièrement « C’est **_LA CHOSE LA PLUS IMPORTANTE_** ». Aussi, « tous les exports nommés ne jouent qu’un rôle de soutien. »
- Un `export nommé` dit « c’est **_UNE CHOSE !_** » et soulève quelques questions : « il y a d’autres camarades ? » En suivi, « sont‑ils invités ou obligatoires ? »

Bien sûr, vous pouvez combiner les deux, ou employer des approches différentes selon les parties de votre base de code. [Voir plus d’exemples à la fin de l’article.](#summary)

### Arguments faibles, mec

Abordons quelques‑unes des « problèmes temporaires » que les développeurs rencontrent le plus souvent.

- Arg #1 : Les exportations nommées garantissent la cohérence des noms. [source](https://blog.neufund.org/why-we-have-banned-default-exports-and-you-should-do-the-same-d51fdc2cf2ad)
  - Non, ce n’est pas le cas. Vous cherchez peut‑être une règle de lint ?
  - (Je déteste vous le dire, mais attendez d’apprendre ce que les variables peuvent faire !)

```tsx
// Vous pouvez aliaser les deux !
import { Knife as Handle } from "./knife.js"; // 🔪
import { default as Handle } from "./knife.js"; // 🔪
import Handle from "./knife.js"; // 🔪
```

- Arg #2 : Utilisez `import * as soManyKnives from './kinves.js'` pour combiner les exportations nommées. (Lien absent, l’auteur a rétracté.)
  - Fonctionnalité intéressante. Ce n’est pas le sujet.
  - Maintenant dites‑moi, comment je tiens à nouveau votre engin ? Aucun intention d’auteur.

- Arg #3 : Les exportations nommées offrent un meilleur support IDE pour l’import ou le renommage. [source](https://www.bundleapps.io/blog/use-named-exports-over-default-exports-in-javascript)

- Incorrect (tout le reste). Configurez/mettez à jour vos outils.
  - Le support existe depuis plus de 3 ans dans [VS Code](https://github.com/microsoft/vscode/pull/94480), IntelliJ, etc.
  - Il existe néanmoins quelques « bonnes pratiques » à appliquer aux `export default` pour obtenir la meilleure expérience IDE & refactorisation.
  - ✅ `export default function UserService() {}` – privilégiez toujours les fonctions nommées.
  - ❌ `export default function() { }` – les fonctions anonymes ne sont pas implicitement liées à leur nom de fichier. Si vous ne nommez pas l’entité, il devient difficile de demander à l’ordinateur de la modifier.
  - **Note :** Pour des raisons historiques, vous ne pouvez pas combiner `export default` avec une expression `const`.

    ```tsx
    export default const Knife = () => {...blade, ...handle}
    // ^ ❌ Non supporté ❌ ^
    // Impossible d’exporter default const ....
    // ==========================

    // Cependant, une fois déclaré, vous pouvez exporter une variable const comme défaut.
    const Knife = () => {...blade, ...handle}
    export default Knife;
    // ^ ✅ Valide

    // Pour être complet :
    export default class anyoneStillUseThese {}
    // ^ ✅ Aussi valide d’exporter une classe comme défaut
    ```

<section className="scroll-x">
## Résumé

Il existe en réalité de nombreuses combinaisons d’exportation, chacune raconte une histoire différente :

| Default (Exports) | Named (Exports) | Private Fns | Pattern                                                   | Meaning                                                       |
| ----------------- | --------------- | ----------- | --------------------------------------------------------- | ------------------------------------------------------------- |
| ✅                | ❌              | ❌          | One default export.                                       | « Présenter UNE fonction avec un objectif unique ! »          |
| ❌                | ✅              | ❌          | One named export.                                         | « Veuillez ne pas me renommer. »                              |
| ✅                | ✅              | ✅          | Default export + multiple 'private' un‑exported functions | « Voici de la logique liée. Attendez‑vous aussi à un comportement de type classe. » |
| ❌                | ❌              | ✅          | Multiple named exports, generic file name.                | « Un sac de trucs vaguement liés, aucune hiérarchie implicite. » |
| ✅                | ✅              | ❌          | Single named export ALSO exported as default.             | « Vous ne pouvez pas vous tromper en m’import‑ant. »          |
</section>

**À méditer :** Que signale‑t‑on quand le nom du fichier correspond ou non à l’une de ses exportations ? (Par exemple, un `utils.js` contenant de nombreuses fonctions.)

### Conclusion

Si le code est une communication, `export` comme vous le pensez vraiment. 💞
````
