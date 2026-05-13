# Translation Candidate
- Slug: quiz-nodejs-files-streams-buffers-oh-my
- Locale: es
- Model: openrouter/openai/gpt-oss-120b:nitro
- Target: src/content/posts/2024-11-15--quiz-nodejs-files-streams-buffers-oh-my/es/index.mdx
- Validation: passed
- Runtime seconds: 27.85
- Input tokens: 14704
- Output tokens: 8815
- Thinking tokens: unknown
- Cached input tokens: 4864
- Cache write tokens: 0
- Estimated cost: $0.002160
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
unlisted: false
title: 'Quiz: Dominio de IO en NodeJS'
subTitle: 'Pon a prueba tus conocimientos sobre archivos, flujos y buffers'
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

<p class="inset">¿Listo para sumergirte en el mundo del IO de NodeJS? 🌊</p>

Este cuestionario pondrá a prueba tu comprensión de las operaciones de IO de Node, desde las tareas básicas del sistema de archivos hasta los conceptos avanzados de streaming. Cubriremos buffers, codificaciones y buenas prácticas para manejar datos de forma eficiente.

¡Veamos qué tan bien conoces tus streams frente a tus buffers! 🚀

<QuizUI>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={0}
  group="Calentamiento: Buffers"
  title="Asignación de Buffer"
  options={[
    {text: 'Crea un Buffer de tamaño 5 con ceros', isAnswer: true},
    {text: 'Crea un Buffer de tamaño 5 con datos aleatorios'},
    {text: 'Lanza un error'},
    {text: 'Crea un Buffer vacío'},
  ]}
>
  <slot name="question">
  <div className="question">
    ¿Qué hace este código?
    ```js
    const buf = Buffer.alloc(5);
    console.log(buf);
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    `Buffer.alloc(size)` crea un nuevo Buffer del tamaño especificado relleno de ceros.
    La salida será: `<Buffer 00 00 00 00 00>`

    Si deseas crear un Buffer con datos aleatorios, usa `Buffer.allocUnsafe(5)`.

    [Aprende más sobre la asignación de Buffer](https://nodejs.org/api/buffer.html#static-method-bufferalloc)
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={1}
  group="Calentamiento: Buffers"
  title="Conversión de Buffer a Cadena"
  options={[
    {text: 'A', isAnswer: true},
    {text: '65'},
    {text: '[Object object]'},
    {text: 'Indefinido'},
    {text: 'Datos binarios'},
  ]}
>
  <slot name="question">
  <div className="question">
    ¿Qué imprimirá esto?
    ```js
    const buf = Buffer.from([65]);
    console.log(buf.toString());
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Los números en el arreglo representan códigos ASCII:

    - 65: 'A'

    `toString()` convierte estos bytes a su representación en cadena usando codificación UTF-8 por defecto.

    [Aprende más sobre la codificación de Buffer](https://nodejs.org/api/buffer.html#buffers-and-character-encodings)
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={2}
  group="Calentamiento: Sistema de Archivos"
  title="Operaciones de Archivo Asíncronas"
  options={[
    {text: 'Imprime el contenido del archivo y luego "Done"'},
    {text: 'Imprime "Done" y luego el contenido del archivo', isAnswer: true},
    {text: 'Solo imprime el contenido del archivo'},
    {text: 'Lanza un error'},
  ]}
>
  <slot name="question">
  <div className="question">
    ¿Cuál es el orden de salida?
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
    Como `readFile` es asíncrono, el código sigue ejecutándose mientras se lee el archivo.
    Por lo tanto, "Done" se imprimirá antes del contenido del archivo.

    Para esperar a que el archivo se lea primero, podrías usar la versión basada en Promesas:
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
  group="Conceptos básicos del sistema de archivos"
  title="Leyendo archivos de forma sincrónica"
  options={[
    {text: 'Devuelve un Buffer', isAnswer: true},
    {text: 'Devuelve una cadena'},
    {text: 'Devuelve undefined'},
    {text: 'Devuelve una Promesa'},
  ]}
>
  <slot name="question">
  <div className="question">
    ¿Qué devuelve `fs.readFileSync()` por defecto?
    ```js
    import fs from 'fs';
    const content = fs.readFileSync('test.txt');
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    `fs.readFileSync()` devuelve un Buffer por defecto cuando no se especifica una codificación. Si quieres una cadena, debes:
    1. Especificar una codificación: `fs.readFileSync('test.txt', 'utf8')`
    2. Convertir el Buffer: `content.toString()`

    [Aprende más sobre fs.readFileSync en la documentación de Node.js](https://nodejs.org/api/fs.html#fsreadfilesyncpath-options)
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={4}
  group="Flujos"
  title="Eventos de Stream"
  options={[
    {text: '\'data\', \'end\', \'error\', \'close\'', isAnswer: true},
    {text: '\'finish\', \'drain\', \'pipe\''},
    {text: '\'read\', \'write\', \'end\''},
    {text: '\'open\', \'close\', \'data\''},
  ]}
>
  <slot name="question">
  <div className="question">
    ¿Qué conjunto de eventos se usa comúnmente con los streams legibles?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Los streams legibles emiten varios eventos importantes:
    - 'data': Cuando hay datos disponibles para leer
    - 'end': Cuando no hay más datos que leer
    - 'error': Cuando ocurre un error
    - 'close': Cuando el stream y el recurso subyacente se han cerrado
    ```js
    const readable = fs.createReadStream('file.txt');
    readable.on('data', chunk => console.log(chunk));
    readable.on('end', () => console.log('Done!'));
    ```
    [Aprende más sobre los eventos de Stream](https://nodejs.org/api/stream.html#class-streamreadable)
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={5}
  group="Streams"
  title="Encadenamiento de Streams"
  options={[
    {text: 'Copia el archivo con compresión'},
    {text: 'Copia el archivo sin almacenamiento en memoria', isAnswer: true},
    {text: 'Carga todo el archivo en memoria'},
    {text: 'Crea un enlace simbólico'},
  ]}
>
  <slot name="question">
  <div className="question">
    ¿Qué hace este código?
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
    `pipe()` conecta un stream legible a un stream escribible, gestionando automáticamente la presión inversa y copiando los datos en fragmentos sin cargar todo el archivo en memoria.

    Esto es eficiente en memoria para archivos grandes en comparación con `fs.readFile()` seguido de `fs.writeFile()`.

    [Aprende más sobre pipe()](https://nodejs.org/api/stream.html#readablepipedestination-options)
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={6}
  group="Sistema de Archivos"
  title="Operaciones de Directorio"
  options={[
    {text: 'Crea directorios anidados si es necesario', isAnswer: true},
    {text: 'Crea solo el último directorio'},
    {text: 'Lanza un error'},
    {text: 'Crea enlaces simbólicos'},
  ]}
>
  <slot name="question">
  <div className="question">
    ¿Qué hace la opción recursive?
    ```js
    import fs from 'fs';
    fs.mkdirSync('./a/b/c', { recursive: true });
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    La opción `recursive: true` crea los directorios padre si no existen.
    Sin esta opción, intentar crear './a/b/c' lanzaría un error si './a' o './a/b' no existen.

    Es similar al comando de shell `mkdir -p`.

    [Aprende más sobre mkdir](https://nodejs.org/api/fs.html#fsmkdirsyncpath-options)
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={7}
  group="Flujos"
  title="Flujos de Transformación"
  options={[
    {text: 'hola mundo'},
    {text: 'HOLA MUNDO', isAnswer: true},
    {text: 'Error'},
    {text: 'indefinido'},
  ]}
>
  <slot name="question">
  <div className="question">
    ¿Qué mostrará esto?
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
    Los flujos de transformación modifican los datos mientras los atraviesan. Aquí, cada fragmento se:
    1. Convierte a una cadena
    2. Transforma a mayúsculas
    3. Se envía a stdout

    Esto crea una canalización que convierte toda la entrada a mayúsculas.

    [Aprende más sobre los flujos Transform](https://nodejs.org/api/stream.html#class-streamtransform)
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={8}
  group="Sistema de Archivos"
  title="Observación de Archivos"
  options={[
    {text: 'Una vez por cambio de archivo'},
    {text: 'No garantizado; puede dispararse múltiples veces', isAnswer: true},
    {text: 'Nunca'},
    {text: 'Solo al eliminar el archivo'},
  ]}
>
  <slot name="question">
  <div className="question">
    ¿Cuántas veces se garantiza que `fs.watch()` se dispare cuando se modifica un archivo?
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
    `fs.watch()` no garantiza dispararse exactamente una vez por cada cambio lógico de archivo. A menudo se dispara varias veces porque muchos editores de texto:
    1. Guardan en un archivo temporal
    2. Lo renombran al archivo objetivo

    Para una observación más fiable, considera usar:
    - El paquete `chokidar`
    - Aplicar *debounce* al callback
    - Usar `fs.watchFile()` (aunque es menos eficiente)

    [Aprende más sobre fs.watch()](https://nodejs.org/api/fs.html#fswatchfilename-options-listener)
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={9}
  group="Buffers"
  title="Comparación de Buffers"
  options={[
    {text: 'true'},
    {text: 'false', isAnswer: true},
    {text: 'undefined'},
    {text: 'Error'},
  ]}
>
  <slot name="question">
  <div className="question">
    ¿Cuál es la salida?
    ```js
    const buf1 = Buffer.from('Hello');
    const buf2 = Buffer.from('Hello');
    console.log(buf1 === buf2);
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Los buffers se comparan por referencia, no por valor. Aunque contengan los mismos datos, son objetos diferentes.

    Para comparar el contenido de los buffers, use:
    ```js
    buf1.equals(buf2)  // true
    // or
    Buffer.compare(buf1, buf2) === 0  // true
    ```
    [Aprende más sobre la comparación de Buffers](https://nodejs.org/api/buffer.html#bufequalsotherbuffer)
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={10}
  group="Flujos"
  title="Backpressure en streams"
  options={[
    {text: 'Previene desbordamiento de memoria', isAnswer: true},
    {text: 'Aumenta la velocidad de lectura'},
    {text: 'Comprime datos'},
    {text: 'Encripta datos'},
  ]}
>
  <slot name="question">
  <div className="question">
    ¿Cuál es el propósito principal del backpressure en streams?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    El backpressure es un mecanismo que previene el desbordamiento de memoria pausando la lectura cuando el extremo de escritura no puede seguir el ritmo.

    Ejemplo de backpressure manual:
    ```js
    readable.on('data', (chunk) => {
      const canContinue = writable.write(chunk);
      if (!canContinue) {
        readable.pause();
        writable.once('drain', () => readable.resume());
      }
    });
    ```
    `pipe()` maneja esto automáticamente!

    [Aprende más sobre el backpressure](https://nodejs.org/en/learn/modules/backpressuring-in-streams#backpressuring-in-streams)
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={11}
  group="Sistema de archivos"
  title="Enlaces simbólicos"
  options={[
    {text: 'Crea un enlace duro'},
    {text: 'Crea una copia'},
    {text: 'Crea un enlace simbólico', isAnswer: true},
    {text: 'Mueve el archivo'},
  ]}
>
  <slot name="question">
  <div className="question">
    ¿Qué hace este código?
    ```js
    import fs from 'fs';
    fs.symlinkSync('target.txt', 'link.txt');
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    `symlinkSync` crea un enlace simbólico (como un acceso directo) al archivo objetivo.

    Diferencias clave con los enlaces duros:
    - Puede enlazar a directorios
    - Puede abarcar sistemas de archivos
    - Se rompe si el objetivo se elimina

    Para crear un enlace duro en su lugar:
    ```js
    fs.linkSync('target.txt', 'hardlink.txt');
    ```
    [Aprende más sobre los enlaces simbólicos](https://nodejs.org/api/fs.html#fssymlinksync-target-path-type)
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={12}
  group="Flujos"
  title="Modos de Stream"
  options={[
    {text: 'Solo modo binario'},
    {text: 'Solo modo objeto'},
    {text: 'Ambos modos', isAnswer: true},
    {text: 'Ningún modo'},
    {text: 'Modos de entrada y salida'},
    {text: 'Modos de lectura y escritura'},
  ]}
>
  <slot name="question">
  <div className="question">
    ¿En qué modos pueden operar los streams de Node.js?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Los streams pueden operar en:
    1. Modo binario (por defecto): para buffers y cadenas
    2. Modo objeto: para cualquier valor de JavaScript

    Ejemplo de modo objeto:
    ```js
    import { Transform } from 'stream';
    const objectStream = new Transform({
      objectMode: true,
      transform(chunk, encoding, callback) {
        callback(null, { value: chunk });
      }
    });
    ```
    [Aprende más sobre los modos de stream](https://nodejs.org/api/stream.html#object-mode)
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={13}
  group="Sistema de Archivos"
  title="Descriptores de Archivo"
  options={[
    {text: 'Un número', isAnswer: true},
    {text: 'Una cadena'},
    {text: 'Un objeto'},
    {text: 'Un búfer'},
  ]}
>
  <slot name="question">
  <div className="question">
    ¿Qué tipo es el parámetro `fd` en esta devolución de llamada?
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
    Los descriptores de archivo son números que identifican de forma única los archivos abiertos en el sistema operativo.

    Los tres primeros descriptores están reservados:
    - 0: stdin
    - 1: stdout
    - 2: stderr

    Recuerda siempre cerrar los descriptores de archivo:
    ```js
    fs.close(fd, (err) => {
      if (err) throw err;
    });
    ```
    [Aprende más sobre los descriptores de archivo](https://nodejs.org/api/fs.html#file-descriptors)
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={14}
  group="Codificación"
  title="Codificación de Buffer"
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
    ¿Cuántos bytes ocupará esta cadena en UTF-8?
    ```js
    const str = "Hello 🌍";
    const buf = Buffer.from(str);
    console.log(buf.length);
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    En UTF-8:
    - Los caracteres ASCII (como 'Hello ') ocupan 1 byte cada uno
    - El emoji de la tierra 🌍 ocupa 4 bytes

    Entonces: 5 (Hello) + 1 (espacio) + 4 (🌍) = 10 bytes

    Para ver los bytes:
    ```js
    console.log(buf);  // <Buffer 48 65 6c 6c 6f 20 f0 9f 8c 8d>
    ```
    [Aprende más sobre la codificación UTF-8](https://nodejs.org/api/buffer.html#buffers-and-character-encodings)
  </div>
  </slot>
</Challenge>

</QuizUI>

¡Espero que hayas disfrutado poniendo a prueba tus conocimientos de NodeJS IO! ¿Quieres más? Consulta mi <a href="../challenges/">Colección de quizzes</a> para nuevos desafíos.
````
