# Translation Candidate
- Slug: quiz-nodejs-files-streams-buffers-oh-my
- Locale: zh
- Model: openrouter/qwen/qwen3-32b:nitro
- Target: src/content/posts/2024-11-15--quiz-nodejs-files-streams-buffers-oh-my/zh/index.mdx
- Validation: deferred
- Runtime seconds: 42.24
- Input tokens: 14643
- Output tokens: 11658
- Thinking tokens: unknown
- Cached input tokens: 3584
- Cache write tokens: 0
- Estimated cost: $0.004790
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
unlisted: false
title: 测验：NodeJS I/O 精通
subTitle: 测试你的文件、流和缓冲区知识
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
import Challenge from '../../../../components/QuizUI/Challenge';
import QuizUI from '../../../../components/QuizUI/QuizUI';

<p class="inset">准备好深入NodeJS IO的世界了吗？🌊</p>

本测验将检验你对Node.js IO操作的理解，从基础的文件系统操作到高级的流概念。我们将涵盖缓冲区、编码以及高效处理数据的最佳实践。

让我们看看你对流和缓冲区的掌握程度如何！🚀

<QuizUI>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={0}
  group="热身：缓冲区"
  title="缓冲区分配"
  options={[
    {text: '创建一个大小为5、填充零的Buffer', isAnswer: true},
    {text: '创建一个大小为5、填充随机数据的Buffer'},
    {text: '抛出错误'},
    {text: '创建一个空Buffer'},
  ]}
>
  <slot name="question">
  <div className="question">
    这段代码会做什么？
    ```js
        const buf = Buffer.alloc(5);
        console.log(buf);
    ```
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    `Buffer.alloc(size)` 会创建一个指定大小并填充零的新Buffer。
    输出结果将是：`<Buffer 00 00 00 00 00>`

    如果需要创建填充随机数据的Buffer，请使用 `Buffer.allocUnsafe(5)`。

    [了解更多关于Buffer分配的内容](https://nodejs.org/api/buffer.html#static-method-bufferalloc)
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={1}
  group="热身：缓冲区"
  title="缓冲区到字符串的转换"
  options={[
    {text: 'A', isAnswer: true},
    {text: '65'},
    {text: '[对象 对象]'},
    {text: '未定义'},
    {text: '二进制数据'},
  ]}
>
  <slot name="question">
  <div className="question">
    这将打印什么？
    ```js
        const buf = Buffer.from([65]);
        console.log(buf.toString());
    ```
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    数组中的数字代表ASCII码：

    - 65: 'A'

    `toString()` 默认使用UTF-8编码将这些字节转换为字符串表示形式。

    [了解更多关于Buffer编码的内容](https://nodejs.org/api/buffer.html#buffers-and-character-encodings)
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={2}
  group="热身：文件系统"
  title="异步文件操作"
  options={[
    {text: '先打印文件内容，然后打印\'Done\''},
    {text: '先打印\'Done\'，然后打印文件内容', isAnswer: true},
    {text: '仅打印文件内容'},
    {text: '抛出错误'},
  ]}
>
  <slot name="question">
  <div className="question">
    输出顺序是什么？
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
    由于`readFile`是异步操作，代码在文件读取过程中会继续执行。
    因此，'Done'会在文件内容之前打印。

    如果想要先等待文件读取完成，可以使用Promise版本：
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
  group="文件系统基础"
  title="同步读取文件"
  options={[
    {text: '返回一个 Buffer', isAnswer: true},
    {text: '返回一个字符串'},
    {text: '返回 undefined'},
    {text: '返回一个 Promise'},
  ]}
>
  <slot name="question">
  <div className="question">
    默认情况下，`fs.readFileSync()` 返回什么？
    ```js
        import fs from 'fs';
        const content = fs.readFileSync('test.txt');
    ```
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    `fs.readFileSync()` 在未指定编码时默认返回一个 Buffer。如果需要字符串，可以：
    1. 指定编码：`fs.readFileSync('test.txt', 'utf8')`
    2. 转换 Buffer：`content.toString()`

    [了解更多关于 fs.readFileSync 的信息请访问 Node.js 官方文档](https://nodejs.org/api/fs.html#fsreadfilesyncpath-options)
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={4}
  group="流"
  title="流事件"
  options={[
    {text: '\'data\', \'end\', \'error\', \'close\'', isAnswer: true},
    {text: '\'finish\', \'drain\', \'pipe\''},
    {text: '\'read\', \'write\', \'end\''},
    {text: '\'open\', \'close\', \'data\''},
  ]}
>
  <slot name="question">
  <div className="question">
    哪个事件集通常与可读流一起使用？
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    可读流会发出多个重要事件：
    - 'data'：当有数据可读时
    - 'end'：当没有更多数据可读时
    - 'error'：当发生错误时
    - 'close'：当流和底层资源关闭时
    ```js
        const readable = fs.createReadStream('file.txt');
        readable.on('data', chunk => console.log(chunk));
        readable.on('end', () => console.log('Done!'));
    ```
    [了解更多关于流事件的内容](https://nodejs.org/api/stream.html#class-streamreadable)
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={5}
  group="流"
  title="流管道"
  options={[
    {text: '复制文件并进行压缩'},
    {text: '复制文件而不使用内存缓冲', isAnswer: true},
    {text: '将整个文件加载到内存中'},
    {text: '创建符号链接'},
  ]}
>
  <slot name="question">
  <div className="question">
    这段代码的作用是什么？
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
    `pipe()` 将可读流连接到可写流，自动管理反压并以块为单位复制数据，而不会将整个文件加载到内存中。

    与 `fs.readFile()` 后跟 `fs.writeFile()` 相比，这对大文件更高效。

    [了解更多关于 pipe() 的信息](https://nodejs.org/api/stream.html#readablepipedestination-options)
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={6}
  group="文件系统"
  title="目录操作"
  options={[
    {text: '如果需要，创建嵌套目录', isAnswer: true},
    {text: '仅创建最后一个目录'},
    {text: '抛出错误'},
    {text: '创建符号链接'},
  ]}
>
  <slot name="question">
  <div className="question">
    递归选项的作用是什么？
    ```js
        import fs from 'fs';
        fs.mkdirSync('./a/b/c', { recursive: true });
    ```
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    `recursive: true` 选项会在父目录不存在时自动创建它们。
    如果不启用此选项，尝试创建 './a/b/c' 时若 './a' 或 './a/b' 不存在，会抛出错误。

    这与 shell 命令 `mkdir -p` 的行为类似。

    [了解更多关于mkdir的内容](https://nodejs.org/api/fs.html#fsmkdirsyncpath-options)
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={7}
  group="流"
  title="转换流"
  options={[
    {text: 'hello world'},
    {text: 'HELLO WORLD', isAnswer: true},
    {text: '错误'},
    {text: '未定义'},
  ]}
>
  <slot name="question">
  <div className="question">
    这将输出什么？
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
    转换流会在数据通过时对其进行修改。这里每个数据块会：
    1. 被转换为字符串
    2. 被转换为大写
    3. 传递给标准输出

    这创建了一个将所有输入转换为大写的管道。

    [了解更多关于转换流的内容](https://nodejs.org/api/stream.html#class-streamtransform)
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={8}
  group="文件系统"
  title="文件监视"
  options={[
    {text: '每次文件更改一次'},
    {text: '不保证；可能会多次触发', isAnswer: true},
    {text: '从不'},
    {text: '仅在文件删除时'},
  ]}
>
  <slot name="question">
  <div className="question">
    当文件被修改时，`fs.watch()` 保证会触发多少次？
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
    `fs.watch()` 不保证每次逻辑文件更改都会触发一次。它通常会触发多次，因为许多文本编辑器：
    1. 保存到临时文件
    2. 将其重命名为目标文件

    为了更可靠的监视，可以考虑使用：
    - `chokidar` 包
    - 对回调进行防抖处理
    - 使用 `fs.watchFile()`（尽管效率较低）

    [了解更多关于 fs.watch() 的信息](https://nodejs.org/api/fs.html#fswatchfilename-options-listener)
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={9}
  group="Buffers"
  title="Buffer比较"
  options={[
    {text: 'true'},
    {text: 'false', isAnswer: true},
    {text: 'undefined'},
    {text: 'Error'},
  ]}
>
  <slot name="question">
  <div className="question">
    输出是什么？
    ```js
        const buf1 = Buffer.from('Hello');
        const buf2 = Buffer.from('Hello');
        console.log(buf1 === buf2);
    ```
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    Buffer按引用比较而非值比较。即使包含相同数据，它们也是不同的对象。

    要比较Buffer内容，请使用：
    ```js
        buf1.equals(buf2)  // true
        // or
        Buffer.compare(buf1, buf2) === 0  // true
    ```
    [了解更多关于Buffer比较的内容](https://nodejs.org/api/buffer.html#bufequalsotherbuffer)
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={10}
  group="流"
  title="流的背压"
  options={[
    {text: '防止内存溢出', isAnswer: true},
    {text: '提高读取速度'},
    {text: '压缩数据'},
    {text: '加密数据'},
  ]}
>
  <slot name="question">
  <div className="question">
    流的背压主要目的是什么？
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    背压是一种通过暂停读取（当写入端无法及时处理时）来防止内存溢出的机制。

    手动背压示例：
    ```js
        readable.on('data', (chunk) => {
          const canContinue = writable.write(chunk);
          if (!canContinue) {
            readable.pause();
            writable.once('drain', () => readable.resume());
          }
        });
    ```
    `pipe()` 会自动处理背压！

    [了解更多关于背压的内容](https://nodejs.org/en/learn/modules/backpressuring-in-streams#backpressuring-in-streams)
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={11}
  group="文件系统"
  title="符号链接"
  options={[
    {text: '创建硬链接'},
    {text: '创建文件副本'},
    {text: '创建符号链接', isAnswer: true},
    {text: '移动文件'},
  ]}
>
  <slot name="question">
  <div className="question">
    这段代码的作用是什么？
    ```js
        import fs from 'fs';
        fs.symlinkSync('target.txt', 'link.txt');
    ```
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    `symlinkSync` 创建一个符号链接（类似快捷方式）指向目标文件。

    与硬链接的关键区别：
    - 可以链接目录
    - 可以跨文件系统
    - 目标文件删除后会失效

    要创建硬链接请使用：
    ```js
        fs.linkSync('target.txt', 'hardlink.txt');
    ```
    [深入学习符号链接](https://nodejs.org/api/fs.html#fssymlinksync-target-path-type)
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={12}
  group="流"
  title="流模式"
  options={[
    {text: '仅二进制模式'},
    {text: '仅对象模式'},
    {text: '两种模式', isAnswer: true},
    {text: '无模式'},
    {text: '输入和输出模式'},
    {text: '读写模式'},
  ]}
>
  <slot name="question">
  <div className="question">
    Node.js流可以运行在哪些模式下？
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    流可以运行在以下模式：
    1. 二进制模式（默认）：用于缓冲区和字符串
    2. 对象模式：用于任何JavaScript值

    对象模式示例：
    ```js
        import { Transform } from 'stream';
        const objectStream = new Transform({
          objectMode: true,
          transform(chunk, encoding, callback) {
            callback(null, { value: chunk });
          }
        });
    ```
    [了解更多流模式](https://nodejs.org/api/stream.html#object-mode)
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={13}
  group="文件系统"
  title="文件描述符"
  options={[
    {text: '一个数字', isAnswer: true},
    {text: '一个字符串'},
    {text: '一个对象'},
    {text: '一个缓冲区'},
  ]}
>
  <slot name="question">
  <div className="question">
    此回调中的 `fd` 参数是什么类型？
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
    文件描述符是数字，用于在操作系统中唯一标识打开的文件。

    前三个文件描述符是保留的：
    - 0: stdin
    - 1: stdout
    - 2: stderr

    始终记得关闭文件描述符：
    ```js
        fs.close(fd, (err) => {
          if (err) throw err;
        });
    ```
    [了解更多关于文件描述符的信息](https://nodejs.org/api/fs.html#file-descriptors)
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={14}
  group="编码"
  title="缓冲区编码"
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
    此字符串在 UTF-8 中将占用多少字节？
    ```js
        const str = "Hello 🌍";
        const buf = Buffer.from(str);
        console.log(buf.length);
    ```
  </div>
  </slot>

  <slot name='explanation'>
  <div className="explanation">
    在 UTF-8 中：
    - ASCII 字符（如 'Hello '）每个字符占用 1 字节
    - 地球表情符号 🌍 占用 4 字节

    所以：5（Hello）+ 1（空格）+ 4（🌍）= 10 字节

    要查看字节：
    ```js
        console.log(buf);  // <Buffer 48 65 6c 6c 6f 20 f0 9f 8c 8d>
    ```
    [了解更多关于 UTF-8 编码](https://nodejs.org/api/buffer.html#buffers-and-character-encodings)
  </div>
  </slot>
</Challenge>

</QuizUI>

希望你喜欢测试自己的 NodeJS IO 知识！想要更多挑战？查看我的[测验合集](../challenges/)获取更多练习！
````
