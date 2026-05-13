# Translation Candidate
- Slug: quiz-nodejs-files-streams-buffers-oh-my
- Locale: ja
- Model: openrouter/openai/gpt-oss-120b:nitro
- Target: src/content/posts/2024-11-15--quiz-nodejs-files-streams-buffers-oh-my/ja/index.mdx
- Validation: rejected: direct AI SDK translation failed
- Runtime seconds: 15.88
- Input tokens: 14607
- Output tokens: 10178
- Thinking tokens: unknown
- Cached input tokens: 6272
- Cache write tokens: 0
- Estimated cost: $0.002402
- Pricing source: local-openrouter-estimate
- Note: Command failed: git add src/content/posts/2024-11-15--quiz-nodejs-files-streams-buffers-oh-my/ja/index.mdx reports/i18n/quiz-nodejs-files-streams-buffers-oh-my/ja
## Raw Output

````mdx
---
unlisted: false
title: 'クイズ: NodeJS I/O マスター'
subTitle: ファイル・ストリーム・バッファの知識をテスト
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

import Challengefrom '../../../../components/QuizUI/Challenge';
import QuizUI from '../../../../../components/QuizUI/QuizUI';

<p class="inset">NodeJS の I/O の世界へ飛び込む準備はできましたか？ 🌊</p>

このクイズでは、基本的なファイルシステム操作から高度なストリーミング概念まで、Node の I/O 操作に関する理解度を測ります。バッファ、エンコーディング、そしてデータを効率的に扱うベストプラクティスを取り上げます。

ストリームとバッファ、どちらが得意か見てみましょう！ 🚀

<QuizUI>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={0}
  group="ウォームアップ: バッファ"
  title="バッファ割り当て"
  options={[
    {text: 'サイズ5のバッファをゼロで作成する', isAnswer: true},
    {text: 'サイズ5のバッファをランダムデータで作成する'},
    {text: 'エラーをスローする'},
    {text: '空のバッファを作成する'},
  ]}
>
  <slot name="question">
  <div className="question">
    このコードは何をしますか？
    ```js
        const buf = Buffer.alloc(5);
        console.log(buf);
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    `Buffer.alloc(size)` は、指定サイズでゼロで埋められた新しい Buffer を作成します。
    出力は: `<Buffer 00 00 00 00 00>`

    ランダムデータの Buffer を作成したい場合は `Buffer.allocUnsafe(5)` を使用します。

    [バッファ割り当ての詳細はこちら](https://nodejs.org/api/buffer.html#static-method-bufferalloc)
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={1}
  group="ウォームアップ: バッファ"
  title="バッファから文字列への変換"
  options={[
    {text: 'A', isAnswer: true},
    {text: '65'},
    {text: '[Object object]'},
    {text: '未定義'},
    {text: 'バイナリデータ'},
  ]}
>
  <slot name="question">
  <div className="question">
    これが出力するのは何ですか？
    ```js
        const buf = Buffer.from([65]);
        console.log(buf.toString());
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    配列の数値は ASCII コードを表しています:

    - 65: 'A'

    `toString()` はデフォルトで UTF-8 エンコーディングを使用し、これらのバイトを文字列に変換します。

    [バッファのエンコーディングについて詳しく見る](https://nodejs.org/api/buffer.html#buffers-and-character-encodings)
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={2}
  group="ウォームアップ: ファイルシステム"
  title="非同期ファイル操作"
  options={[
    {text: 'ファイル内容を出力してから「Done」を表示'},
    {text: '「Done」を表示してからファイル内容を出力', isAnswer: true},
    {text: 'ファイル内容だけを出力'},
    {text: 'エラーがスローされる'},
  ]}
>
  <slot name="question">
  <div className="question">
    出力順序は？
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
    `readFile` は非同期なので、ファイルを読み込んでいる間にコードは実行され続けます。
    したがって、"Done" がファイル内容より先に出力されます。
    ファイルの読み込みが完了するまで待ちたい場合は、Promise 版を使うと良いでしょう：
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
  group="ファイルシステムの基本"
  title="ファイルを同期的に読み込む"
  options={[
    {text: 'Buffer を返す', isAnswer: true},
    {text: '文字列を返す'},
    {text: 'undefined を返す'},
    {text: 'Promise を返す'},
  ]}
>
  <slot name="question">
  <div className="question">
    `fs.readFileSync()` はデフォルトで何を返しますか？
    ```js
        import fs from 'fs';
        const content = fs.readFileSync('test.txt');
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    `fs.readFileSync()` はエンコーディングを指定しない場合、デフォルトで Buffer を返します。文字列が欲しい場合は、次のいずれかが必要です：
    1. エンコーディングを指定する: `fs.readFileSync('test.txt', 'utf8')`
    2. Buffer を変換する: `content.toString()`

    [Node.js ドキュメントで fs.readFileSync の詳細を見る](https://nodejs.org/api/fs.html#fsreadfilesyncpath-options)
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={4}
  group="ストリーム"
  title="ストリームイベント"
  options={[
    {text: '\'data\', \'end\', \'error\', \'close\'', isAnswer: true},
    {text: '\'finish\', \'drain\', \'pipe\''},
    {text: '\'read\', \'write\', \'end\''},
    {text: '\'open\', \'close\', \'data\''},
  ]}
>
  <slot name="question">
  <div className="question">
    Readable ストリームで一般的に使用されるイベントのセットはどれですか？
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Readable ストリームは重要なイベントをいくつか発行します:
    - 'data': データが読み取れるとき
    - 'end': これ以上データがなくなったとき
    - 'error': エラーが発生したとき
    - 'close': ストリームと基になるリソースが閉じたとき
    ```js
        const readable = fs.createReadStream('file.txt');
        readable.on('data', chunk => console.log(chunk));
        readable.on('end', () => console.log('Done!'));
    ```
    [ストリームイベントの詳細はこちら](https://nodejs.org/api/stream.html#class-streamreadable)
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={5}
  group="ストリーム"
  title="ストリーム パイプ"
  options={[
    {text: '圧縮してファイルをコピーする'},
    {text: 'メモリバッファリングせずにファイルをコピーする', isAnswer: true},
    {text: 'ファイル全体をメモリに読み込む'},
    {text: 'シンボリックリンクを作成する'},
  ]}
>
  <slot name="question">
  <div className="question">
    このコードは何をしますか？
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
    `pipe()` は readable ストリームを writable ストリームに接続し、バックプレッシャーを自動で管理し、データをチャンク単位でコピーします。ファイル全体をメモリに読み込むことはありません。

    これは `fs.readFile()` の後に `fs.writeFile()` を使うより、大きなファイルに対してメモリ効率が良いです。

    [pipe() の詳細はこちら](https://nodejs.org/api/stream.html#readablepipedestination-options)
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={6}
  group="ファイルシステム"
  title="ディレクトリ操作"
  options={[
    {text: '必要に応じてネストされたディレクトリを作成する', isAnswer: true},
    {text: '最後のディレクトリだけを作成する'},
    {text: 'エラーを投げる'},
    {text: 'シンボリックリンクを作成する'},
  ]}
>
  <slot name="question">
  <div className="question">
    recursive オプションは何をするのか？
    ```js
        import fs from 'fs';
        fs.mkdirSync('./a/b/c', { recursive: true });
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    `recursive: true` オプションは、存在しない場合に親ディレクトリを作成します。
    このオプションがないと、'./a/b/c' を作成しようとしても、'./a' や './a/b' が存在しなければエラーになります。

    これはシェルコマンド `mkdir -p` と同様です。

    [mkdir の詳細はこちら](https://nodejs.org/api/fs.html#fsmkdirsyncpath-options)
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={7}
  group="ストリーム"
  title="変換ストリーム"
  options={[
    {text: 'こんにちは世界'},
    {text: 'HELLO WORLD', isAnswer: true},
    {text: 'エラー'},
    {text: '未定義'},
  ]}
>
  <slot name="question">
  <div className="question">
    このコードは何を出力しますか？
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
    Transform ストリームはデータが通過する際に変更します。ここでは各チャンクは：
    1. 文字列に変換され
    2. 大文字に変換され
    3. stdout に渡されます

    これにより、すべての入力を大文字に変換するパイプラインが作られます。

    [Transform ストリームの詳細はこちら](https://nodejs.org/api/stream.html#class-streamtransform)
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={8}
  group="ファイルシステム"
  title="ファイル監視"
  options={[
    {text: 'ファイル変更ごとに1回'},
    {text: '保証されません；複数回発火することがあります', isAnswer: true},
    {text: '発火しない'},
    {text: 'ファイル削除時のみ'},
  ]}
>
  <slot name="question">
  <div className="question">
    ファイルが変更されたとき、`fs.watch()` が発火する回数は保証されていますか？
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
    `fs.watch()` は論理的なファイル変更ごとに正確に1回だけ発火する保証はありません。多くのテキストエディタが以下のように動作するため、複数回発火することがよくあります：
    1. 一時ファイルに保存する
    2. それを対象ファイルにリネームする

    より信頼できる監視を行うには、次を検討してください：
    - `chokidar` パッケージ
    - コールバックのデバウンス
    - `fs.watchFile()` の使用（ただし効率は低い）

    [fs.watch() の詳細はこちら](https://nodejs.org/api/fs.html#fswatchfilename-options-listener)
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={9}
  group="バッファ"
  title="バッファ比較"
  options={[
    {text: 'true'},
    {text: 'false', isAnswer: true},
    {text: 'undefined'},
    {text: 'Error'},
  ]}
>
  <slot name="question">
  <div className="question">
    出力は何ですか？
    ```js
        const buf1 = Buffer.from('Hello');
        const buf2 = Buffer.from('Hello');
        console.log(buf1 === buf2);
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    バッファは値ではなく参照で比較されます。同じデータを含んでいても、別々のオブジェクトです。

    バッファの内容を比較するには、次を使用します:
    ```js
        buf1.equals(buf2)  // true
        // or
        Buffer.compare(buf1, buf2) === 0  // true
    ```
    [バッファ比較の詳細を読む](https://nodejs.org/api/buffer.html#bufequalsotherbuffer)
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={10}
  group="ストリーム"
  title="ストリームのバックプレッシャー"
  options={[
    {text: 'メモリオーバーフローを防止する', isAnswer: true},
    {text: '読み取り速度を上げる'},
    {text: 'データを圧縮する'},
    {text: 'データを暗号化する'},
  ]}
>
  <slot name="question">
  <div className="question">
    ストリームのバックプレッシャーの主な目的は何ですか？
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    バックプレッシャーは、書き込み側が追いつかないときに読み取りを一時停止し、メモリオーバーフローを防止する仕組みです。

    手動バックプレッシャーの例:
    ```js
        readable.on('data', (chunk) => {
          const canContinue = writable.write(chunk);
          if (!canContinue) {
            readable.pause();
            writable.once('drain', () => readable.resume());
          }
        });
    ```
    `pipe()` はこれを自動的に処理します！

    [バックプレッシャーについて詳しく読む](https://nodejs.org/en/learn/modules/backpressuring-in-streams#backpressuring-in-streams)
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={11}
  group="ファイルシステム"
  title="シンボリックリンク"
  options={[
    {text: 'ハードリンクを作成する'},
    {text: 'コピーを作成する'},
    {text: 'シンボリックリンクを作成する', isAnswer: true},
    {text: 'ファイルを移動する'},
  ]}
>
  <slot name="question">
  <div className="question">
    このコードは何をしますか？
    ```js
        import fs from 'fs';
        fs.symlinkSync('target.txt', 'link.txt');
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    `symlinkSync` は対象ファイルへのシンボリックリンク（ショートカットのようなもの）を作成します。

    ハードリンクとの主な違い:
    - ディレクトリにもリンクできる
    - ファイルシステムを跨げる
    - 対象が削除されると壊れる

    代わりにハードリンクを作成するには:
    ```js
        fs.linkSync('target.txt', 'hardlink.txt');
    ```
    [シンボリックリンクの詳細を見る](https://nodejs.org/api/fs.html#fssymlinksync-target-path-type)
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={12}
  group="ストリーム"
  title="ストリームモード"
  options={[
    {text: 'バイナリモードのみ'},
    {text: 'オブジェクトモードのみ'},
    {text: '両方のモード', isAnswer: true},
    {text: 'どちらのモードでもない'},
    {text: '入力と出力のモード'},
    {text: '読み取りと書き込みのモード'},
  ]}
>
  <slot name="question">
  <div className="question">
    Node.js のストリームはどのモードで動作できますか？
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    ストリームは以下のモードで動作できます:
    1. バイナリモード（デフォルト）：バッファや文字列用
    2. オブジェクトモード：任意の JavaScript 値用

    オブジェクトモードの例:
    ```js
        import { Transform } from 'stream';
        const objectStream = new Transform({
          objectMode: true,
          transform(chunk, encoding, callback) {
            callback(null, { value: chunk });
          }
        });
    ```
    [ストリームモードの詳細はこちら](https://nodejs.org/api/stream.html#object-mode)
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={13}
  group="ファイルシステム"
  title="ファイルディスクリプタ"
  options={[
    {text: '数値', isAnswer: true},
    {text: '文字列'},
    {text: 'オブジェクト'},
    {text: 'バッファ'},
  ]}
>
  <slot name="question">
  <div className="question">
    このコールバックの `fd` パラメータの型は何ですか？
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
    ファイルディスクリプタは、オペレーティングシステムで開かれたファイルを一意に識別する数値です。

    最初の 3 つのファイルディスクリプタは予約されています:
    - 0: stdin
    - 1: stdout
    - 2: stderr

    ファイルディスクリプタは必ず閉じることを忘れずに:
    ```js
        fs.close(fd, (err) => {
          if (err) throw err;
        });
    ```
    [ファイルディスクリプタについて詳しく学ぶ](https://nodejs.org/api/fs.html#file-descriptors)
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={14}
  group="エンコーディング"
  title="バッファ エンコーディング"
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
    この文字列は UTF-8 で何バイトになりますか？
    ```js
        const str = "Hello 🌍";
        const buf = Buffer.from(str);
        console.log(buf.length);
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    UTF-8 では:
    - ASCII 文字（例: 'Hello '）は 1 バイトずつ
    - 地球の絵文字 🌍 は 4 バイト

    したがって: 5 (Hello) + 1 (space) + 4 (🌍) = 10 バイト

    バイトを確認するには:
    ```js
        console.log(buf);  // <Buffer 48 65 6c 6c 6f 20 f0 9f 8c 8d>
    ```
    [UTF-8 エンコーディングの詳細を見る](https://nodejs.org/api/buffer.html#buffers-and-character-encodings)
  </div>
  </slot>
</Challenge>

</QuizUI>

NodeJS IO の知識をテストして楽しんでくれたら嬉しいです！もっと欲しいですか？[クイズコレクション](../challenges/)でさらに挑戦してください！
````
