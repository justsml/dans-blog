# Translation Candidate
- Slug: quiz-nodejs-files-streams-buffers-oh-my
- Locale: hi
- Model: openrouter/openai/gpt-oss-120b:nitro
- Target: src/content/posts/2024-11-15--quiz-nodejs-files-streams-buffers-oh-my/hi/index.mdx
- Validation: deferred
- Runtime seconds: 21.35
- Input tokens: 14215
- Output tokens: 9983
- Thinking tokens: unknown
- Cached input tokens: 3584
- Cache write tokens: 0
- Estimated cost: $0.002351
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
unlisted: false
title: 'क्विज़: NodeJS I/O महारत'
subTitle: 'फ़ाइलों, स्ट्रीम्स और बफ़र्स पर अपनी समझ आज़माएँ'
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

<p class="inset">NodeJS I/O की दुनिया में गोता लगाने के लिए तैयार हैं? 🌊</p>

यह क्विज़ आपके Node के I/O ऑपरेशन्स की समझ को परखेगा, बुनियादी फ़ाइल सिस्टम कार्यों से लेकर उन्नत स्ट्रीमिंग अवधारणाओं तक। हम बफ़र्स, एन्कोडिंग और डेटा को कुशलता से संभालने के सर्वोत्तम अभ्यासों को कवर करेंगे।

आइए देखें कि आप अपने बफ़र्स की तुलना में स्ट्रीम्स को कितनी अच्छी तरह जानते हैं! 🚀

<QuizUI>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={0}
  group="वार्म‑अप: बफ़र"
  title="बफ़र आवंटन"
  options={[
    {text: '5 आकार का बफ़र शून्य मानों के साथ बनाता है', isAnswer: true},
    {text: '5 आकार का बफ़र यादृच्छिक डेटा के साथ बनाता है'},
    {text: 'एक त्रुटि फेंकता है'},
    {text: 'एक खाली बफ़र बनाता है'},
  ]}
>
  <slot name="question">
  <div className="question">
    यह कोड क्या करता है?
    ```js
        const buf = Buffer.alloc(5);
        console.log(buf);
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    `Buffer.alloc(size)` एक नया बफ़र बनाता है जिसका आकार निर्दिष्ट है और वह शून्य से भरा होता है।
    आउटपुट होगा: `<Buffer 00 00 00 00 00>`

    यदि आप यादृच्छिक डेटा वाला बफ़र बनाना चाहते हैं, तो `Buffer.allocUnsafe(5)` उपयोग करें।

    [बफ़र आवंटन के बारे में अधिक जानें](https://nodejs.org/api/buffer.html#static-method-bufferalloc)
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={1}
  group="वार्म‑अप: बफ़र्स"
  title="बफ़र से स्ट्रिंग रूपांतरण"
  options={[
    {text: 'A', isAnswer: true},
    {text: '65'},
    {text: '[Object object]'},
    {text: 'अपरिभाषित'},
    {text: 'बाइनरी डेटा'},
  ]}
>
  <slot name="question">
  <div className="question">
    यह क्या प्रिंट करेगा?
    ```js
        const buf = Buffer.from([65]);
        console.log(buf.toString());
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    एरे में मौजूद संख्याएँ ASCII कोड दर्शाती हैं:

    - 65: 'A'

    `toString()` इन बाइट्स को डिफ़ॉल्ट रूप से UTF-8 एन्कोडिंग का उपयोग करके उनकी स्ट्रिंग प्रतिनिधित्व में बदल देता है।

    [बफ़र एन्कोडिंग के बारे में और पढ़ें](https://nodejs.org/api/buffer.html#buffers-and-character-encodings)
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={2}
  group="वार्म‑अप: फ़ाइल सिस्टम"
  title="असिंक्रोनस फ़ाइल ऑपरेशन्स"
  options={[
    {text: 'फ़ाइल सामग्री प्रिंट करता है फिर "Done"'},
    {text: '"Done" प्रिंट करता है फिर फ़ाइल सामग्री', isAnswer: true},
    {text: 'केवल फ़ाइल सामग्री प्रिंट करता है'},
    {text: 'एक त्रुटि फेंकता है'},
  ]}
>
  <slot name="question">
  <div className="question">
    आउटपुट क्रम क्या है?
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
    चूँकि `readFile` असिंक्रोनस है, फ़ाइल पढ़े जाने के दौरान कोड निष्पादन जारी रहता है।
    इसलिए, "Done" फ़ाइल सामग्री से पहले प्रिंट होगा।

    फ़ाइल को पहले पढ़ने के लिए, आप प्रॉमिस‑आधारित संस्करण का उपयोग कर सकते हैं:
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
  group="फ़ाइल सिस्टम मूल बातें"
  title="फ़ाइलों को सिंक्रोनस रूप से पढ़ना"
  options={[
    {text: 'एक Buffer लौटाता है', isAnswer: true},
    {text: 'एक स्ट्रिंग लौटाता है'},
    {text: 'undefined लौटाता है'},
    {text: 'एक Promise लौटाता है'},
  ]}
>
  <slot name="question">
  <div className="question">
    डिफ़ॉल्ट रूप से `fs.readFileSync()` क्या लौटाता है?
    ```js
        import fs from 'fs';
        const content = fs.readFileSync('test.txt');
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    `fs.readFileSync()` डिफ़ॉल्ट रूप से एक Buffer लौटाता है जब कोई एन्कोडिंग निर्दिष्ट नहीं की गई हो। यदि आप स्ट्रिंग चाहते हैं, तो आपको या तो:
    1. एन्कोडिंग निर्दिष्ट करें: `fs.readFileSync('test.txt', 'utf8')`
    2. Buffer को बदलें: `content.toString()`

    [Node.js दस्तावेज़ में fs.readFileSync के बारे में और पढ़ें](https://nodejs.org/api/fs.html#fsreadfilesyncpath-options)
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={4}
  group="स्ट्रीम्स"
  title="स्ट्रीम इवेंट्स"
  options={[
    {text: '\'data\', \'end\', \'error\', \'close\'', isAnswer: true},
    {text: '\'finish\', \'drain\', \'pipe\''},
    {text: '\'read\', \'write\', \'end\''},
    {text: '\'open\', \'close\', \'data\''},
  ]}
>
  <slot name="question">
  <div className="question">
    कौन‑से इवेंट्स का सेट आमतौर पर Readable स्ट्रीम्स के साथ उपयोग किया जाता है?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Readable स्ट्रीम्स कई महत्वपूर्ण इवेंट्स उत्सर्जित करती हैं:
    - 'data': जब डेटा पढ़ने के लिए उपलब्ध हो
    - 'end': जब पढ़ने के लिए और डेटा न रहे
    - 'error': जब कोई त्रुटि उत्पन्न हो
    - 'close': जब स्ट्रीम और अंतर्निहित संसाधन बंद हो जाएँ
    ```js
        const readable = fs.createReadStream('file.txt');
        readable.on('data', chunk => console.log(chunk));
        readable.on('end', () => console.log('Done!'));
    ```
    [स्ट्रीम इवेंट्स के बारे में और जानें](https://nodejs.org/api/stream.html#class-streamreadable)
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={5}
  group="स्ट्रीम्स"
  title="स्ट्रीम पाइपिंग"
  options={[
    {text: 'फ़ाइल को संपीड़न के साथ कॉपी करता है'},
    {text: 'फ़ाइल को बिना मेमोरी बफ़रिंग के कॉपी करता है', isAnswer: true},
    {text: 'पूरी फ़ाइल को मेमोरी में लोड करता है'},
    {text: 'एक सिम्बॉलिक लिंक बनाता है'},
  ]}
>
  <slot name="question">
  <div className="question">
    यह कोड क्या करता है?
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
    `pipe()` एक readable stream को writable stream से जोड़ता है, स्वचालित रूप से बैकप्रेशर संभालता है और डेटा को चंक्स में कॉपी करता है बिना पूरी फ़ाइल को मेमोरी में लोड किए।

    यह बड़े फ़ाइलों के लिए `fs.readFile()` के बाद `fs.writeFile()` की तुलना में मेमोरी‑कुशल है।

    [pipe() के बारे में और जानें](https://nodejs.org/api/stream.html#readablepipedestination-options)
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={6}
  group="फ़ाइल सिस्टम"
  title="डायरेक्टरी संचालन"
  options={[
    {text: 'यदि आवश्यक हो तो नेस्टेड डायरेक्टरी बनाता है', isAnswer: true},
    {text: 'केवल अंतिम डायरेक्टरी बनाता है'},
    {text: 'एक त्रुटि फेंकता है'},
    {text: 'सिम्बॉलिक लिंक बनाता है'},
  ]}
>
  <slot name="question">
  <div className="question">
    रिकर्सिव विकल्प क्या करता है?
    ```js
        import fs from 'fs';
        fs.mkdirSync('./a/b/c', { recursive: true });
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    `recursive: true` विकल्प पैरेंट डायरेक्टरी बनाता है यदि वे मौजूद नहीं हैं.
    इस विकल्प के बिना, './a/b/c' बनाने की कोशिश करने पर यदि './a' या './a/b' मौजूद नहीं हैं तो त्रुटि फेंकी जाएगी.

    यह शेल कमांड `mkdir -p` के समान है.

    [mkdir के बारे में और जानें](https://nodejs.org/api/fs.html#fsmkdirsyncpath-options)
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={7}
  group="स्ट्रीम्स"
  title="ट्रांसफ़ॉर्म स्ट्रीम्स"
  options={[
    {text: 'हैलो वर्ल्ड'},
    {text: 'हैलो वर्ल्ड', isAnswer: true},
    {text: 'त्रुटि'},
    {text: 'अपरिभाषित'},
  ]}
>
  <slot name="question">
  <div className="question">
    यह क्या आउटपुट देगा?
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
    ट्रांसफ़ॉर्म स्ट्रीम्स डेटा को उसके गुजरते समय बदलते हैं। यहाँ, प्रत्येक चंक को:
    1. स्ट्रिंग में बदला जाता है
    2. अपर केस में परिवर्तित किया जाता है
    3. stdout को पास किया जाता है

    यह एक पाइपलाइन बनाता है जो सभी इनपुट को अपर केस में बदल देता है.

    [ट्रांसफ़ॉर्म स्ट्रीम्स के बारे में और पढ़ें](https://nodejs.org/api/stream.html#class-streamtransform)
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={8}
  group="फ़ाइल सिस्टम"
  title="फ़ाइल वॉचिंग"
  options={[
    {text: 'फ़ाइल परिवर्तन पर एक बार'},
    {text: 'गैर‑गारंटी; कई बार हो सकता है', isAnswer: true},
    {text: 'कभी नहीं'},
    {text: 'केवल फ़ाइल हटाने पर'},
  ]}
>
  <slot name="question">
  <div className="question">
    जब फ़ाइल संशोधित होती है तो `fs.watch()` कितनी बार फायर होना गारंटीकृत है?
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
    `fs.watch()` यह गारंटी नहीं देता कि वह प्रत्येक तार्किक फ़ाइल परिवर्तन पर ठीक एक बार फायर हो। यह अक्सर कई बार फायर होता है क्योंकि कई टेक्स्ट एडिटर:
    1. अस्थायी फ़ाइल में सहेजते हैं
    2. उसे लक्ष्य फ़ाइल के रूप में पुनःनामित करते हैं

    अधिक भरोसेमंद वॉचिंग के लिए, आप विचार कर सकते हैं:
    - `chokidar` पैकेज
    - कॉलबैक को डिबाउंस करना
    - `fs.watchFile()` का उपयोग (हालांकि यह कम कुशल है)

    [fs.watch() के बारे में और पढ़ें](https://nodejs.org/api/fs.html#fswatchfilename-options-listener)
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={9}
  group="बफ़र"
  title="बफ़र तुलना"
  options={[
    {text: 'true'},
    {text: 'false', isAnswer: true},
    {text: 'undefined'},
    {text: 'Error'},
  ]}
>
  <slot name="question">
  <div className="question">
    आउटपुट क्या होगा?
    ```js
        const buf1 = Buffer.from('Hello');
        const buf2 = Buffer.from('Hello');
        console.log(buf1 === buf2);
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    बफ़र को रेफ़रेंस द्वारा तुलना किया जाता है, मान द्वारा नहीं। भले ही उनमें समान डेटा हो, वे अलग-अलग ऑब्जेक्ट होते हैं।

    बफ़र की सामग्री की तुलना करने के लिए, उपयोग करें:
    ```js
        buf1.equals(buf2)  // true
        // or
        Buffer.compare(buf1, buf2) === 0  // true
    ```
    [बफ़र तुलना के बारे में अधिक जानें](https://nodejs.org/api/buffer.html#bufequalsotherbuffer)
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={10}
  group="स्ट्रीम्स"
  title="स्ट्रीम बैकप्रेशर"
  options={[
    {text: 'मेमोरी ओवरफ़्लो को रोकता है', isAnswer: true},
    {text: 'पढ़ने की गति बढ़ाता है'},
    {text: 'डेटा को संकुचित करता है'},
    {text: 'डेटा को एन्क्रिप्ट करता है'},
  ]}
>
  <slot name="question">
  <div className="question">
    स्ट्रीम बैकप्रेशर का मुख्य उद्देश्य क्या है?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    बैकप्रेशर एक तंत्र है जो मेमोरी ओवरफ़्लो को रोकता है, जब लिखने वाला भाग गति नहीं पकड़ पाता तो पढ़ना रोककर।

    मैनुअल बैकप्रेशर का उदाहरण:
    ```js
        readable.on('data', (chunk) => {
          const canContinue = writable.write(chunk);
          if (!canContinue) {
            readable.pause();
            writable.once('drain', () => readable.resume());
          }
        });
    ```
    `pipe()` इसे स्वचालित रूप से संभालता है!

    [बैकप्रेशर के बारे में और जानें](https://nodejs.org/en/learn/modules/backpressuring-in-streams#backpressuring-in-streams)
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={11}
  group="फ़ाइल सिस्टम"
  title="सिंबॉलिक लिंक"
  options={[
    {text: 'एक हार्ड लिंक बनाता है'},
    {text: 'एक कॉपी बनाता है'},
    {text: 'एक सिंबॉलिक लिंक बनाता है', isAnswer: true},
    {text: 'फ़ाइल को स्थानांतरित करता है'},
  ]}
>
  <slot name="question">
  <div className="question">
    यह कोड क्या करता है?
    ```js
        import fs from 'fs';
        fs.symlinkSync('target.txt', 'link.txt');
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    `symlinkSync` एक सिंबॉलिक लिंक (शॉर्टकट की तरह) लक्ष्य फ़ाइल के लिए बनाता है.

    हार्ड लिंक से मुख्य अंतर:
    - डायरेक्टरीज़ को लिंक कर सकता है
    - फ़ाइल सिस्टम्स के बीच लिंक कर सकता है
    - यदि लक्ष्य हटाया जाए तो टूट जाता है

    इसके बजाय हार्ड लिंक बनाने के लिए:
    ```js
        fs.linkSync('target.txt', 'hardlink.txt');
    ```
    [symlinks के बारे में और जानें](https://nodejs.org/api/fs.html#fssymlinksync-target-path-type)
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={12}
  group="स्ट्रीम्स"
  title="स्ट्रीम मोड"
  options={[
    {text: 'केवल बाइनरी मोड'},
    {text: 'केवल ऑब्जेक्ट मोड'},
    {text: 'दोनों मोड', isAnswer: true},
    {text: 'कोई भी मोड नहीं'},
    {text: 'इनपुट और आउटपुट मोड'},
    {text: 'रीड और राइट मोड'},
  ]}
>
  <slot name="question">
  <div className="question">
    Node.js स्ट्रीम्स किन मोड्स में काम कर सकते हैं?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    स्ट्रीम्स निम्न मोड्स में काम कर सकते हैं:
    1. बाइनरी मोड (डिफ़ॉल्ट): बफ़र्स और स्ट्रिंग्स के लिए
    2. ऑब्जेक्ट मोड: किसी भी जावास्क्रिप्ट वैल्यू के लिए

    ऑब्जेक्ट मोड का उदाहरण:
    ```js
        import { Transform } from 'stream';
        const objectStream = new Transform({
          objectMode: true,
          transform(chunk, encoding, callback) {
            callback(null, { value: chunk });
          }
        });
    ```
    [स्ट्रीम मोड्स के बारे में और जानें](https://nodejs.org/api/stream.html#object-mode)
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={13}
  group="फ़ाइल सिस्टम"
  title="फ़ाइल डिस्क्रिप्टर"
  options={[
    {text: 'एक संख्या', isAnswer: true},
    {text: 'एक स्ट्रिंग'},
    {text: 'एक ऑब्जेक्ट'},
    {text: 'एक बफ़र'},
  ]}
>
  <slot name="question">
  <div className="question">
    इस कॉलबैक में `fd` पैरामीटर का प्रकार क्या है?
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
    फ़ाइल डिस्क्रिप्टर संख्याएँ हैं जो ऑपरेटिंग सिस्टम में खुले फ़ाइलों को विशिष्ट रूप से पहचानती हैं.

    पहले तीन फ़ाइल डिस्क्रिप्टर आरक्षित होते हैं:
    - 0: stdin
    - 1: stdout
    - 2: stderr

    फ़ाइल डिस्क्रिप्टर को हमेशा बंद करना याद रखें:
    ```js
        fs.close(fd, (err) => {
          if (err) throw err;
        });
    ```
    [फ़ाइल डिस्क्रिप्टर के बारे में अधिक जानें](https://nodejs.org/api/fs.html#file-descriptors)
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={14}
  group="एन्कोडिंग"
  title="बफ़र एन्कोडिंग"
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
    इस स्ट्रिंग को UTF-8 में कितने बाइट्स लगेंगे?
    ```js
        const str = "Hello 🌍";
        const buf = Buffer.from(str);
        console.log(buf.length);
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    UTF-8 में:
    - ASCII अक्षर (जैसे 'Hello ') प्रत्येक 1 बाइट लेते हैं
    - पृथ्वी इमोजी 🌍 4 बाइट्स लेता है

    इसलिए: 5 (Hello) + 1 (space) + 4 (🌍) = 10 बाइट्स

    बाइट्स देखने के लिए:
    ```js
        console.log(buf);  // <Buffer 48 65 6c 6c 6f 20 f0 9f 8c 8d>
    ```
    [UTF-8 एन्कोडिंग के बारे में अधिक जानें](https://nodejs.org/api/buffer.html#buffers-and-character-encodings)
  </div>
  </slot>
</Challenge>

</QuizUI>

आशा है आपको अपना NodeJS I/O ज्ञान परखना मज़ेदार लगा! और चाहिए? अधिक चुनौतियों के लिए मेरी <a href="/challenges/">क्विज़ कलेक्शन</a> देखें!
````
