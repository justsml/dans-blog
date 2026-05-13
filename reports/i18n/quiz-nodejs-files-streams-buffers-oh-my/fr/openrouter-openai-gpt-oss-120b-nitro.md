# Translation Candidate
- Slug: quiz-nodejs-files-streams-buffers-oh-my
- Locale: fr
- Model: openrouter/openai/gpt-oss-120b:nitro
- Target: src/content/posts/2024-11-15--quiz-nodejs-files-streams-buffers-oh-my/fr/index.mdx
- Validation: passed
- Runtime seconds: 24.59
- Input tokens: 14303
- Output tokens: 8830
- Thinking tokens: unknown
- Cached input tokens: 5120
- Cache write tokens: 0
- Estimated cost: $0.002147
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
unlisted: false
title: "Quiz\_: Maîtrise de l’E/S Node.js"
subTitle: 'Testez vos connaissances des fichiers, flux et tampons'
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

<p class="inset">Prêt à plonger dans l’univers du I/O NodeJS ? 🌊</p>

Ce quiz évaluera votre maîtrise des opérations d’I/O de Node, des tâches de base du système de fichiers aux concepts avancés de streaming. Nous aborderons les buffers, les encodages et les bonnes pratiques pour manipuler les données de façon efficace.

Voyons à quel point vous distinguez vos streams de vos buffers ! 🚀

<QuizUI>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={0}
  group="Échauffement : Buffers"
  title="Allocation de Buffer"
  options={[
    {text: 'Crée un Buffer de taille 5 rempli de zéros', isAnswer: true},
    {text: 'Crée un Buffer de taille 5 avec des données aléatoires'},
    {text: 'Lance une erreur'},
    {text: 'Crée un Buffer vide'},
  ]}
>
  <slot name="question">
  <div className="question">
    Que fait ce code ?
    ```js
    const buf = Buffer.alloc(5);
    console.log(buf);
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    `Buffer.alloc(size)` crée un nouveau Buffer de la taille spécifiée rempli de zéros.
    Le résultat sera : `<Buffer 00 00 00 00 00>`

    Si vous voulez créer un Buffer avec des données aléatoires, utilisez `Buffer.allocUnsafe(5)`.

    [En savoir plus sur l’allocation de Buffer](https://nodejs.org/api/buffer.html#static-method-bufferalloc)
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={1}
  group="Échauffement : Buffers"
  title="Conversion de Buffer en Chaîne"
  options={[
    {text: 'A', isAnswer: true},
    {text: '65'},
    {text: '[Object object]'},
    {text: 'Undefined'},
    {text: 'Binary data'},
  ]}
>
  <slot name="question">
  <div className="question">
    Que va-t‑il afficher ?
    ```js
    const buf = Buffer.from([65]);
    console.log(buf.toString());
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Les nombres dans le tableau représentent des codes ASCII :

    - 65 : 'A'

    `toString()` convertit ces octets en leur représentation chaîne en utilisant l’encodage UTF‑8 par défaut.

    [En savoir plus sur l’encodage des Buffers](https://nodejs.org/api/buffer.html#buffers-and-character-encodings)
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={2}
  group="Échauffement : Système de fichiers"
  title="Opérations de fichiers asynchrones"
  options={[
    {text: 'Affiche le contenu du fichier puis "Done"'},
    {text: 'Affiche "Done" puis le contenu du fichier', isAnswer: true},
    {text: 'Affiche uniquement le contenu du fichier'},
    {text: 'Lance une erreur'},
  ]}
>
  <slot name="question">
  <div className="question">
    Quel est l'ordre de sortie ?
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
    Comme `readFile` est asynchrone, le code continue de s'exécuter pendant que le fichier est lu.
    Par conséquent, "Done" sera affiché avant le contenu du fichier.

    Pour attendre que le fichier soit lu d'abord, vous pouvez utiliser la version basée sur les Promises :
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
  title="Lecture de fichiers synchrones"
  options={[
    {text: 'Renvoie un Buffer', isAnswer: true},
    {text: 'Renvoie une chaîne'},
    {text: 'Renvoie undefined'},
    {text: 'Renvoie une Promise'},
  ]}
>
  <slot name="question">
  <div className="question">
    Que renvoie `fs.readFileSync()` par défaut ?
    ```js
    import fs from 'fs';
    const content = fs.readFileSync('test.txt');
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    `fs.readFileSync()` renvoie un Buffer par défaut lorsqu'aucun encodage n'est spécifié. Si vous voulez une chaîne, vous devez soit :
    1. Spécifier un encodage : `fs.readFileSync('test.txt', 'utf8')`
    2. Convertir le Buffer : `content.toString()`

    [En savoir plus sur fs.readFileSync dans la documentation Node.js](https://nodejs.org/api/fs.html#fsreadfilesyncpath-options)
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
    Quel ensemble d'événements est couramment utilisé avec les flux Readable ?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Les flux Readable émettent plusieurs événements importants :
    - 'data' : lorsque des données sont disponibles à la lecture
    - 'end' : lorsqu'il n'y a plus de données à lire
    - 'error' : lorsqu'une erreur se produit
    - 'close' : lorsque le flux et la ressource sous-jacente sont fermés
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
  title="Piping de flux"
  options={[
    {text: 'Copie le fichier avec compression'},
    {text: 'Copie le fichier sans mise en mémoire tampon', isAnswer: true},
    {text: 'Charge le fichier entier en mémoire'},
    {text: 'Crée un lien symbolique'},
  ]}
>
  <slot name="question">
  <div className="question">
    Que fait ce code ?
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
    `pipe()` connecte un flux lisible à un flux inscriptible, gérant automatiquement la pression arrière et copiant les données par morceaux sans charger le fichier entier en mémoire.

    C’est efficace en mémoire pour les gros fichiers comparé à `fs.readFile()` suivi de `fs.writeFile()`.

    [En savoir plus sur pipe()](https://nodejs.org/api/stream.html#readablepipedestination-options)
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={6}
  group="Système de fichiers"
  title="Opérations de répertoires"
  options={[
    {text: 'Crée des répertoires imbriqués si nécessaire', isAnswer: true},
    {text: 'Crée uniquement le dernier répertoire'},
    {text: 'Lance une erreur'},
    {text: 'Crée des liens symboliques'},
  ]}
>
  <slot name="question">
  <div className="question">
    Que fait l'option recursive ?
    ```js
    import fs from 'fs';
    fs.mkdirSync('./a/b/c', { recursive: true });
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    L'option `recursive: true` crée les répertoires parents s'ils n'existent pas.
    Sans cette option, tenter de créer './a/b/c' lancerait une erreur si './a' ou './a/b' n'existent pas.

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
    {text: 'BONJOUR LE MONDE', isAnswer: true},
    {text: 'Erreur'},
    {text: 'indéfini'},
  ]}
>
  <slot name="question">
  <div className="question">
    Quel sera le résultat ?
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
    Les flux de transformation modifient les données au passage. Ici, chaque morceau est :
    1. Converti en chaîne
    2. Transformé en majuscules
    3. Envoyé vers stdout

    Cela crée un pipeline qui convertit toutes les entrées en majuscules.

    [En savoir plus sur les flux de transformation](https://nodejs.org/api/stream.html#class-streamtransform)
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={8}
  group="Système de fichiers"
  title="Surveillance de fichiers"
  options={[
    {text: 'Une fois par modification de fichier'},
    {text: 'Pas garanti ; peut se déclencher plusieurs fois', isAnswer: true},
    {text: 'Jamais'},
    {text: 'Uniquement lors de la suppression du fichier'},
  ]}
>
  <slot name="question">
  <div className="question">
    Combien de fois `fs.watch()` est‑il garanti de se déclencher lorsqu’un fichier est modifié ?
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
    `fs.watch()` n’est pas garanti de se déclencher exactement une fois par modification logique du fichier. Il se déclenche souvent plusieurs fois parce que de nombreux éditeurs de texte :
    1. Enregistrent dans un fichier temporaire
    2. Le renomment en fichier cible

    Pour une surveillance plus fiable, envisagez d’utiliser :
    - Le package `chokidar`
    - Un debounce du rappel
    - `fs.watchFile()` (bien que moins efficace)

    [En savoir plus sur fs.watch()](https://nodejs.org/api/fs.html#fswatchfilename-options-listener)
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={9}
  group="Buffers"
  title="Comparaison de Buffer"
  options={[
    {text: 'true'},
    {text: 'false', isAnswer: true},
    {text: 'undefined'},
    {text: 'Error'},
  ]}
>
  <slot name="question">
  <div className="question">
    Quelle est la sortie ?
    ```js
    const buf1 = Buffer.from('Hello');
    const buf2 = Buffer.from('Hello');
    console.log(buf1 === buf2);
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Les buffers sont comparés par référence, pas par valeur. Même s'ils contiennent les mêmes données, ce sont des objets différents.

    Pour comparer le contenu des buffers, utilisez :
    ```js
    buf1.equals(buf2)  // true
    // or
    Buffer.compare(buf1, buf2) === 0  // true
    ```
    [En savoir plus sur la comparaison de Buffer](https://nodejs.org/api/buffer.html#bufequalsotherbuffer)
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={10}
  group="Flux"
  title="Rétropression des flux"
  options={[
    {text: 'Empêche le débordement de mémoire', isAnswer: true},
    {text: 'Augmente la vitesse de lecture'},
    {text: 'Compresse les données'},
    {text: 'Crypte les données'},
  ]}
>
  <slot name="question">
  <div className="question">
    Quel est le but principal de la rétropression des flux ?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    La rétropression est un mécanisme qui empêche le débordement de mémoire en suspendant la lecture lorsque l'extrémité d'écriture ne peut pas suivre.

    Exemple de rétropression manuelle :
    ```js
    readable.on('data', (chunk) => {
      const canContinue = writable.write(chunk);
      if (!canContinue) {
        readable.pause();
        writable.once('drain', () => readable.resume());
      }
    });
    ```
    `pipe()` gère cela automatiquement!

    [En savoir plus sur la rétropression](https://nodejs.org/en/learn/modules/backpressuring-in-streams#backpressuring-in-streams)
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={11}
  group="Système de fichiers"
  title="Liens symboliques"
  options={[
    {text: 'Crée un lien physique'},
    {text: 'Crée une copie'},
    {text: 'Crée un lien symbolique', isAnswer: true},
    {text: 'Déplace le fichier'},
  ]}
>
  <slot name="question">
  <div className="question">
    Que fait ce code ?
    ```js
    import fs from 'fs';
    fs.symlinkSync('target.txt', 'link.txt');
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    `symlinkSync` crée un lien symbolique (comme un raccourci) vers le fichier cible.

    Principales différences avec les liens physiques :
    - Peut lier des répertoires
    - Peut traverser des systèmes de fichiers
    - Se rompt si la cible est supprimée

    Pour créer un lien physique à la place :
    ```js
    fs.linkSync('target.txt', 'hardlink.txt');
    ```
    [En savoir plus sur les liens symboliques](https://nodejs.org/api/fs.html#fssymlinksync-target-path-type)
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={12}
  group="Flux"
  title="Modes de flux"
  options={[
    {text: 'Mode binaire uniquement'},
    {text: 'Mode objet uniquement'},
    {text: 'Les deux modes', isAnswer: true},
    {text: 'Aucun mode'},
    {text: 'Modes d\'entrée et de sortie'},
    {text: 'Modes de lecture et d\'écriture'},
  ]}
>
  <slot name="question">
  <div className="question">
    Dans quels modes les flux Node.js peuvent-ils fonctionner ?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Les flux peuvent fonctionner en :
    1. Mode binaire (par défaut) : pour les tampons et les chaînes
    2. Mode objet : pour toute valeur JavaScript

    Exemple de mode objet :
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
    Quel type est le paramètre `fd` dans ce rappel ?
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
    Les descripteurs de fichiers sont des nombres qui identifient de façon unique les fichiers ouverts dans le système d'exploitation.

    Les trois premiers descripteurs sont réservés :
    - 0 : stdin
    - 1 : stdout
    - 2 : stderr

    N'oubliez jamais de fermer les descripteurs de fichiers :
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
  title="Encodage de Buffer"
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
    Combien d’octets cette chaîne occupera-t-elle en UTF-8 ?
    ```js
    const str = "Hello 🌍";
    const buf = Buffer.from(str);
    console.log(buf.length);
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    En UTF-8 :
    - Les caractères ASCII (comme 'Hello ') prennent 1 octet chacun
    - L’emoji terre 🌍 prend 4 octets

    Donc : 5 (Hello) + 1 (espace) + 4 (🌍) = 10 octets

    Pour voir les octets :
    ```js
    console.log(buf);  // <Buffer 48 65 6c 6c 6f 20 f0 9f 8c 8d>
    ```
    [En savoir plus sur l’encodage UTF-8](https://nodejs.org/api/buffer.html#buffers-and-character-encodings)
  </div>
  </slot>
</Challenge>

</QuizUI>

J’espère que vous avez apprécié tester vos connaissances Node JS IO ! Vous en voulez plus ? Consultez ma [Collection de Quiz]../challenges/ pour d’autres défis !
````
