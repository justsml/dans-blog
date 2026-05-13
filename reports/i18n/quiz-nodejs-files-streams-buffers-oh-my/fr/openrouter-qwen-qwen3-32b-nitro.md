# Translation Candidate
- Slug: quiz-nodejs-files-streams-buffers-oh-my
- Locale: fr
- Model: openrouter/qwen/qwen3-32b:nitro
- Target: src/content/posts/2024-11-15--quiz-nodejs-files-streams-buffers-oh-my/fr/index.mdx
- Validation: passed
- Runtime seconds: 40.85
- Input tokens: 13117
- Output tokens: 11873
- Thinking tokens: unknown
- Cached input tokens: 512
- Cache write tokens: 0
- Estimated cost: $0.003899
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
unlisted: false
title: 'Quiz : Maîtrise des E/S NodeJS'
subTitle: 'Testez vos connaissances sur les fichiers, les flux et les tampons'
label: NodeJS
social_image: ../desktop-social.webp
category: Quiz
subCategory: NodeJS
date: '2024-11-15'
modified: '2024-11-15'
tags:
  - quiz
  - nodejs
  - io
  - streams
  - buffers
  - filesystem
  - intermediate
cover_full_width: ../data-streaming-wide.webp
cover_mobile: ../data-streaming-square.webp
cover_icon: ../data-streaming-square.webp
---
import Challenge from '../../../../../components/QuizUI/Challenge';
import QuizUI from '../../../../../components/QuizUI/QuizUI';

<p class="inset">Prêt à plonger dans le monde des opérations d'entrée/sortie NodeJS ? 🌊</p>

Ce quiz évaluera votre compréhension des opérations d'IO de Node, des opérations de base sur le système de fichiers aux concepts avancés de flux. Nous aborderons les tampons, l'encodage et les bonnes pratiques pour manipuler les données de manière efficace.

Voyons à quel point vous maîtrisez les flux et les tampons ! 🚀

<QuizUI>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={0}
  group="Échauffement : Tampons"
  title="Allocation de tampon"
  options={[
    {text: 'Crée un tampon de taille 5 rempli de zéros', isAnswer: true},
    {text: 'Crée un tampon de taille 5 avec des données aléatoires'},
    {text: 'Lève une erreur'},
    {text: 'Crée un tampon vide'},
  ]}
>
  <slot name="question">
  <div className="question">
    Quel est l'effet de ce code ?
    ```js
    const buf = Buffer.alloc(5);
    console.log(buf);
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    `Buffer.alloc(size)` crée un nouveau tampon de la taille spécifiée rempli de zéros.
    La sortie sera : `<Buffer 00 00 00 00 00>`

    Pour créer un tampon avec des données aléatoires, utilisez `Buffer.allocUnsafe(5)`.

    [En savoir plus sur l'allocation de tampons](https://nodejs.org/api/buffer.html#static-method-bufferalloc)
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={1}
  group="Échauffement : Tampons"
  title="Conversion d'un tampon en chaîne"
  options={[
    {text: 'A', isAnswer: true, hint: 'Le tampon contient le code ASCII 65.'},
    {text: '65', hint: 'C\'est le code ASCII pour \'A\', mais le tampon est converti en chaîne.'},
    {text: '[Object object]', hint: 'Cela se produirait si vous affichiez l\'objet tampon directement.'},
    {text: 'Undefined', hint: 'La méthode toString() retourne une valeur.'},
    {text: 'Binary data', hint: 'La méthode toString() convertit les octets en caractères.'},
  ]}
>
  <slot name="question">
  <div className="question">
    Qu'affichera-t-il ?
    ```js
    const buf = Buffer.from([65]);
    console.log(buf.toString());
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Les nombres dans le tableau représentent des codes ASCII :
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={2}
  group="Échauffement : Système de fichiers"
  title="Opérations asynchrones sur les fichiers"
  options={[
    {text: 'Affiche le contenu du fichier puis \'Done\''},
    {text: 'Affiche \'Done\' puis le contenu du fichier', isAnswer: true},
    {text: 'Affiche uniquement le contenu du fichier'},
    {text: 'Lève une erreur'},
  ]}
>
  <slot name="question">
  <div className="question">
    Quel est l'ordre des sorties ?
    ```js
    import fs from 'fs';
    fs.readFile('test.txt', 'utf8', (err, data) => {
      console.log(data);
    });
    console.log('Done');
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Puisque `readFile` est asynchrone, le code continue d'exécuter pendant que le fichier est lu.
    Par conséquent, 'Done' sera affiché avant le contenu du fichier.

    Pour attendre la lecture du fichier en premier, vous pouvez utiliser la version basée sur les Promises :
    ```js
    import { promises as fs } from 'fs';
    
    async function read() {
      const data = await fs.readFile('test.txt', 'utf8');
      console.log(data);
      console.log('Done');
    }
    ```
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={3}
  group="Bases du système de fichiers"
  title="Lecture de fichiers de manière synchrone"
  options={[
    {text: 'Renvoie un Buffer', isAnswer: true},
    {text: 'Renvoie une chaîne'},
    {text: 'Renvoie undefined'},
    {text: 'Renvoie une Promise'},
  ]}
>
  <slot name="question">
  <div className="question">
    Quel type de valeur `fs.readFileSync()` renvoie-t-il par défaut ?
    ```js
    import fs from 'fs';
    const content = fs.readFileSync('test.txt');
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    `fs.readFileSync()` renvoie un Buffer par défaut lorsque aucune encodage n'est spécifié. Pour obtenir une chaîne, vous devez soit:
    1. Spécifier une encodage: `fs.readFileSync('test.txt', 'utf8')`
    2. Convertir le Buffer: `content.toString()`

    [En savoir plus sur fs.readFileSync dans les docs Node.js](https://nodejs.org/api/fs.html#fsreadfilesyncpath-options)
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={4}
  group="Flux"
  title="Événements de flux"
  options={[
    {text: '\'data\', \'end\', \'error\', \'close\'', isAnswer: true},
    {text: '\'finish\', \'drain\', \'pipe\''},
    {text: '\'read\', \'write\', \'end\''},
    {text: '\'open\', \'close\', \'data\''},
  ]}
>
  <slot name="question">
  <div className="question">
    Quel ensemble d'événements est couramment utilisé avec les flux Lire ?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Les flux Lire émettent plusieurs événements importants :
    - 'data' : Quand des données sont disponibles pour être lues
    - 'end' : Quand il n'y a plus de données à lire
    - 'error' : Quand une erreur se produit
    - 'close' : Quand le flux et la ressource sous-jacente sont fermés
    ```js
    const readable = fs.createReadStream('file.txt');
    readable.on('data', chunk => console.log(chunk));
    readable.on('end', () => console.log('Done!'));
    ```
    [En savoir plus sur les événements de flux](https://nodejs.org/api/stream.html#class-streamreadable)
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={5}
  group="Flux"
  title="Redirection de flux"
  options={[
    {text: 'Copie le fichier avec compression'},
    {text: 'Copie le fichier sans tampon mémoire', isAnswer: true},
    {text: 'Charge l\'intégralité du fichier en mémoire'},
    {text: 'Crée un lien symbolique'},
  ]}
>
  <slot name="question">
  <div className="question">
    Qu'est-ce que ce code fait ?
    ```js
    import fs from 'fs';
    const readable = fs.createReadStream('source.txt');
    const writable = fs.createWriteStream('dest.txt');
    readable.pipe(writable);
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    `pipe()` relie un flux en lecture à un flux en écriture, gérant automatiquement la rétroaction de pression et copiant les données par morceaux sans charger l'intégralité du fichier en mémoire.

    Cela est plus efficace en mémoire pour les gros fichiers comparé à `fs.readFile()` suivi de `fs.writeFile()`.

    [En savoir plus sur pipe()](https://nodejs.org/api/stream.html#readablepipedestination-options)
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={6}
  group="Système de fichiers"
  title="Opérations sur les répertoires"
  options={[
    {text: 'Crée des répertoires imbriqués si nécessaire', isAnswer: true},
    {text: 'Crée uniquement le dernier répertoire'},
    {text: 'Lève une erreur'},
    {text: 'Crée des liens symboliques'},
  ]}
>
  <slot name="question">
  <div className="question">
    Quel est l'effet de l'option recursive ?
    ```js
    import fs from 'fs';
    fs.mkdirSync('./a/b/c', { recursive: true });
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    L'option `recursive: true` crée les répertoires parents s'ils n'existent pas.
    Sans cette option, essayer de créer './a/b/c' lèverait une erreur si './a' ou './a/b' n'existent pas.

    C'est similaire à la commande shell `mkdir -p`.

    [En savoir plus sur mkdir](https://nodejs.org/api/fs.html#fsmkdirsyncpath-options)
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={7}
  group="Flux"
  title="Flux de transformation"
  options={[
    {text: 'bonjour le monde'},
    {text: 'HELLO WORLD', isAnswer: true},
    {text: 'Erreur'},
    {text: 'indéfini'},
  ]}
>
  <slot name="question">
  <div className="question">
    Quelle sera la sortie de ce code ?
    ```js
    import { Transform } from 'stream';
    const upperCase = new Transform({
      transform(chunk, encoding, callback) {
        callback(null, chunk.toString().toUpperCase());
      }
    });
    process.stdin
      .pipe(upperCase)
      .pipe(process.stdout);
    // Input: "hello world"
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Les flux de transformation modifient les données lors de leur passage. Ici, chaque morceau est :
    1. Converti en chaîne de caractères
    2. Transformé en majuscules
    3. Transmis vers stdout

    Cela crée un pipeline qui convertit toutes les entrées en majuscules.

    [En savoir plus sur les flux de transformation](https://nodejs.org/api/stream.html#class-streamtransform)
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={8}
  group="Système de fichiers"
  title="Surveillance des fichiers"
  options={[
    {text: 'Une fois par modification de fichier'},
    {text: 'Pas garanti ; peut se déclencher plusieurs fois', isAnswer: true},
    {text: 'Jamais'},
    {text: 'Uniquement lors de la suppression d\'un fichier'},
  ]}
>
  <slot name="question">
  <div className="question">
    Combien de fois `fs.watch()` est-il garanti de se déclencher lorsqu'un fichier est modifié ?
    ```js
    import fs from 'fs';
    fs.watch('test.txt', (eventType, filename) => {
      console.log(`${filename} was changed`);
    });
    // Then modify test.txt once
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    `fs.watch()` n'est pas garanti de se déclencher exactement une fois par modification logique d'un fichier. Il se déclenche souvent plusieurs fois car de nombreux éditeurs de texte :
    1. Sauvegardent dans un fichier temporaire
    2. Le renomment vers le fichier cible

    Pour une surveillance plus fiable, envisagez d'utiliser :
    - Le package `chokidar`
    - Le débouncing du callback
    - `fs.watchFile()` (bien qu'il soit moins efficace)

    [En savoir plus sur fs.watch()](https://nodejs.org/api/fs.html#fswatchfilename-options-listener)
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={9}
  group="Buffers"
  title="Comparaison des Buffers"
  options={[
    {text: 'vrai'},
    {text: 'faux', isAnswer: true},
    {text: 'indéfini'},
    {text: 'Erreur'},
  ]}
>
  <slot name="question">
  <div className="question">
    Quelle est la sortie ?
    ```js
    const buf1 = Buffer.from('Hello');
    const buf2 = Buffer.from('Hello');
    console.log(buf1 === buf2);
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Les Buffers sont comparés par référence, pas par valeur. Même s'ils contiennent les mêmes données, ce sont des objets différents.

    Pour comparer le contenu d'un Buffer, utilisez :
    ```js
    buf1.equals(buf2)  // true
    // or
    Buffer.compare(buf1, buf2) === 0  // true
    ```
    [En savoir plus sur la comparaison des Buffers](https://nodejs.org/api/buffer.html#bufequalsotherbuffer)
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={10}
  group="Flux"
  title="Rétroaction des flux"
  options={[
    {text: 'Préviens la surcharge mémoire', isAnswer: true},
    {text: 'Accélère la lecture'},
    {text: 'Compresse les données'},
    {text: 'Chiffre les données'},
  ]}
>
  <slot name="question">
  <div className="question">
    Quel est le principal objectif de la rétroaction des flux ?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    La rétroaction est un mécanisme qui empêche la surcharge mémoire en mettant en pause la lecture lorsque l'extrémité d'écriture ne peut pas suivre.

    Exemple de rétroaction manuelle :
    ```js
    readable.on('data', (chunk) => {
      const canContinue = writable.write(chunk);
      if (!canContinue) {
        readable.pause();
        writable.once('drain', () => readable.resume());
      }
    });
    ```
    `pipe()` gère cela automatiquement !

    [En savoir plus sur la rétroaction](https://nodejs.org/en/learn/modules/backpressuring-in-streams#backpressuring-in-streams)
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={11}
  group="Système de fichiers"
  title="Liens symboliques"
  options={[
    {text: 'Crée un lien dur'},
    {text: 'Crée une copie'},
    {text: 'Crée un lien symbolique', isAnswer: true},
    {text: 'Déplace le fichier'},
  ]}
>
  <slot name="question">
  <div className="question">
    Qu'est-ce que ce code fait ?
    ```js
    import fs from 'fs';
    fs.symlinkSync('target.txt', 'link.txt');
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    `symlinkSync` crée un lien symbolique (comme un raccourci) vers le fichier cible.

    Différences clés par rapport aux liens durs :
    - Peut lier des répertoires
    - Peut traverser des systèmes de fichiers
    - Se casse si la cible est supprimée

    Pour créer un lien dur à la place :
    ```js
    fs.linkSync('target.txt', 'hardlink.txt');
    ```
    En savoir plus sur les liens symboliques (https://nodejs.org/api/fs.html#fssymlinksync-target-path-type)
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={12}
  group="Flux"
  title="Modes des flux"
  options={[
    {text: 'Mode binaire uniquement'},
    {text: 'Mode objet uniquement'},
    {text: 'Les deux modes', isAnswer: true},
    {text: 'Aucun des deux modes'},
    {text: 'Modes entrée et sortie'},
    {text: 'Modes lecture et écriture'},
  ]}
>
  <slot name="question">
  <div className="question">
    Quels modes les flux Node.js peuvent-ils utiliser ?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Les flux peuvent fonctionner en :
    1. Mode binaire (par défaut) : pour les tampons et les chaînes
    2. Mode objet : pour toute valeur JavaScript

    Exemple de mode objet :
    ```js
    import { Transform } from 'stream';
    const objectStream = new Transform({
      objectMode: true,
      transform(chunk, encoding, callback) {
        callback(null, { value: chunk });
      }
    });
    ```
    [En savoir plus sur les modes de flux](https://nodejs.org/api/stream.html#object-mode)
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={13}
  group="Système de fichiers"
  title="Descripteurs de fichiers"
  options={[
    {text: 'Un nombre', isAnswer: true},
    {text: 'Une chaîne'},
    {text: 'Un objet'},
    {text: 'Un tampon'},
  ]}
>
  <slot name="question">
  <div className="question">
    Quel type est le paramètre `fd` dans cette fonction de rappel ?
    ```js
    import fs from 'fs';
    fs.open('test.txt', 'r', (err, fd) => {
      console.log(typeof fd);
    });
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Les descripteurs de fichiers sont des nombres qui identifient de manière unique les fichiers ouverts dans le système d'exploitation.

    Les trois premiers descripteurs sont réservés :
    - 0 : stdin
    - 1 : stdout
    - 2 : stderr

    N'oubliez jamais de fermer les descripteurs de fichiers :
    ```js
    fs.close(fd, (err) => {
      if (err) throw err;
    });
    ```
    [En savoir plus sur les descripteurs de fichiers](https://nodejs.org/api/fs.html#file-descriptors)
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={14}
  group="Encodage"
  title="Encodage des tampons"
  options={[
    {text: '3'},
    {text: '4'},
    {text: '6'},
    {text: '8'},
    {text: '10', isAnswer: true},
  ]}
>
  <slot name="question">
  <div className="question">
    Combien d'octets cette chaîne occupe-t-elle en UTF-8 ?
    ```js
    const str = "Hello 🌍";
    const buf = Buffer.from(str);
    console.log(buf.length);
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    En UTF-8 :
    - Les caractères ASCII (comme 'Hello ') prennent 1 octet chacun
    - L'emoji de la Terre 🌍 prend 4 octets

    Donc : 5 (Hello) + 1 (espace) + 4 (🌍) = 10 octets

    Pour voir les octets :
    ```js
    console.log(buf);  // <Buffer 48 65 6c 6c 6f 20 f0 9f 8c 8d>
    ```
    [En savoir plus sur l'encodage UTF-8](https://nodejs.org/api/buffer.html#buffers-and-character-encodings)
  </div>
  </slot>
</Challenge>

</QuizUI>

J'espère que vous avez apprécié tester vos connaissances sur les opérations d'entrée/sortie NodeJS ! Envie d'en savoir plus ? Consultez ma [collection de quiz](../challenges/) pour plus de défis !
````
