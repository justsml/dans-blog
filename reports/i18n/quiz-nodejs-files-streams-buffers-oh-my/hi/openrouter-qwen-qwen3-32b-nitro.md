# Translation Candidate
- Slug: quiz-nodejs-files-streams-buffers-oh-my
- Locale: hi
- Model: openrouter/qwen/qwen3-32b:nitro
- Target: src/content/posts/2024-11-15--quiz-nodejs-files-streams-buffers-oh-my/hi/index.mdx
- Validation: deferred
- Runtime seconds: 134.31
- Input tokens: 13193
- Output tokens: 18799
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- Estimated cost: $0.005567
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
unlisted: false
title: 'क्विज़: NodeJS I/O महारत'
subTitle: 'अपने ज्ञान का परीक्षण करें: फ़ाइलें, स'
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
```mdx
import Challenge from '../../../../../components/QuizUI/Challenge';
import QuizUI from '../../../../../components/QuizUI/QuizUI';

<p class="inset">क्या आप नोडजीएस आई/ओ की दुनिया में डुबने के लिए तैयार हैं? 🌊</p>

यह क्विज़ आपके नोड के आई/ओ ऑपरेशन की समझ का परीक्षण करेगा - बेसिक फ़ाइल सिस्टम ऑपरेशन से लेकर एडवांस्ड स्ट्रीमिंग कांसेप्ट्स तक। हम बफर्स, एन्कोडिंग, और डेटा को एफिशिएंट रूप से हैंडल करने के बेस्ट प्रैक्टिस को कवर करेंगे।

आइए देखते हैं कि आप अपने स्ट्रीम्स और बफर्स के बीच कितना अच्छा हैं! 🚀
```

<QuizUI>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={0}
  group="ऊष्मा प्रारंभ: बफर"
  title="बफर आवंटन"
  options={[
    {text: 'आकार 5 के बफर को शून्यों के साथ बनाता है', isAnswer: true},
    {text: 'आकार 5 के बफर को यादृच्छिक डेटा के साथ बनाता है'},
    {text: 'एक त्रुटि फेंकता है'},
    {text: 'एक खाली बफर बनाता है'},
  ]}
>
  <slot name="question">
  <div className="question">
    इस कोड के क्या कार्य हैं?
    ```js
        const buf = Buffer.alloc(5);
        console.log(buf);
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    `Buffer.alloc(size)` निर्दिष्ट आकार के नए बफर को शून्यों के साथ भरकर बनाता है।
    परिणाम इस प्रकार होगा: `<Buffer 00 00 00 00 00>`

    यदि आप यादृच्छिक डेटा के साथ बफर बनाना चाहते हैं, तो `Buffer.allocUnsafe(5)` का उपयोग करें।

    [बफर आवंटन के बारे में अधिक जानें](https://nodejs.org/api/buffer.html#static-method-bufferalloc)
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={1}
  group="तैयारी: बफर्स"
  title="बफर को स्ट्रिंग में परिवर्तित करना"
  options={[
    {text: 'A', isAnswer: true},
    {text: '65'},
    {text: '[Object object]'},
    {text: 'Undefined'},
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
    सरणी में संख्याएँ ASCII कोड का प्रतिनिधित्व करती हैं:

    - 65: 'A'

    `toString()` डिफ़ॉल्ट रूप से UTF-8 एन्कोडिंग का उपयोग करके इन बाइट्स को अपनी स्ट्रिंग प्रतिनिधि में परिवर्तित करता है।

    [बफर एन्कोडिंग के बारे में अधिक जानें](https://nodejs.org/api/buffer.html#buffers-and-character-encodings)
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={2}
  group="वार्मअप: फ़ाइल सिस्टम"
  title="एसिंक्रोनस फ़ाइल ऑपरेशन्स"
  options={[
    {text: 'फ़ाइल के सामग्री को प्रिंट करता है फिर \'Done\''},
    {text: '\'Done\' फिर फ़ाइल के सामग्री को प्रिंट करता है', isAnswer: true},
    {text: 'केवल फ़ाइल के सामग्री को प्रिंट करता है'},
    {text: 'एक त्रुटि उत्पन्न करता है'},
  ]}
>
  <slot name="question">
  <div className="question">
    आउटपुट का क्रम क्या है?
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
    चूंकि `readFile` असिंक्रोनस है, इसलिए फ़ाइल पढ़े जाने के दौरान कोड का निष्पादन जारी रहता है।
    इसलिए, "Done" फ़ाइल के सामग्री से पहले प्रिंट होगा।

    फ़ाइल को पहले पढ़े जाने के लिए, आप Promise-based वर्जन का उपयोग कर सकते हैं:
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
  title="फ़ाइलें सिंक्रोनस रूप से पढ़ना"
  options={[
    {text: 'एक बफ़र लौटाता है', isAnswer: true},
    {text: 'एक स्ट्रिंग लौटाता है'},
    {text: 'अपरिभाषित लौटाता है'},
    {text: 'एक प्रमिस लौटाता है'},
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
    `fs.readFileSync()` डिफ़ॉल्ट रूप से कोई एन्कोडिंग निर्दिष्ट नहीं किए जाने पर एक बफ़र लौटाता है। यदि आप एक स्ट्रिंग चाहते हैं, तो आपको या तो करना होगा:
    1. एन्कोडिंग निर्दिष्ट करें: `fs.readFileSync('test.txt', 'utf8')`
    2. बफ़र को परिवर्तित करें: `content.toString()`

    [fs.readFileSync के बारे में अधिक जानें नोड.जे.एस डॉक्स पर](https://nodejs.org/api/fs.html#fsreadfilesyncpath-options)
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={4}
  group="स्ट्रीम्स"
  title="स्ट्रीम घटनाएँ"
  options={[
    {text: '\'data\', \'end\', \'error\', \'close\'', isAnswer: true},
    {text: '\'finish\', \'drain\', \'pipe\''},
    {text: '\'read\', \'write\', \'end\''},
    {text: '\'open\', \'close\', \'data\''},
  ]}
>
  <slot name="question">
  <div className="question">
    रीडेबल स्ट्रीम्स के साथ आमतौर पर किस घटना सेट का उपयोग किया जाता है?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    रीडेबल स्ट्रीम्स कई महत्वपूर्ण घटनाएँ उत्सर्जित करते हैं:
    - 'data': जब डेटा पढ़ने के लिए उपलब्ध होता है
    - 'end': जब पढ़ने के लिए अधिक डेटा नहीं होता है
    - 'error': जब एक त्रुटि होती है
    - 'close': जब स्ट्रीम और आधारभूत संसाधन बंद हो जाते हैं
    ```js
        const readable = fs.createReadStream('file.txt');
        readable.on('data', chunk => console.log(chunk));
        readable.on('end', () => console.log('Done!'));
    ```
    [स्ट्रीम घटनाओं के बारे में अधिक जानें](https://nodejs.org/api/stream.html#class-streamreadable)
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={5}
  group="स्ट्रीम"
  title="स्ट्रीम पाइपिंग"
  options={[
    {text: 'फ़ाइल को संपीड़ित करके कॉपी करता है'},
    {text: 'मेमोरी बफ़रिंग के बिना फ़ाइल कॉपी करता है', isAnswer: true, hint: 'सही उत्तर: `pipe()` छोटे चंक्स में डेटा कॉपी करता है'},
    {text: 'पूरी फ़ाइल को मेमोरी में लोड करता है'},
    {text: 'एक सिम्बोलिक लिंक बनाता है'},
  ]}
>
  <slot name="question">
  <div className="question">
    इस कोड का क्या कार्य है?
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
    `pipe()` एक पढ़ने योग्य स्ट्रीम को लिखने योग्य स्ट्रीम से जोड़ता है, ऑटोमैटिक रूप से बैकप्रेशर को मैनेज करता है और पूरी फ़ाइल को मेमोरी में लोड किए बिना डेटा के चंक्स कॉपी करता है।

    बड़ी फ़ाइलों के लिए यह `fs.readFile()` और `fs.writeFile()` की तुलना में मेमोरी दक्ष होता है।

    [pipe() के बारे में अधिक जानें](https://nodejs.org/api/stream.html#readablepipedestination-options)
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={6}
  group="फाइल सिस्टम"
  title="निर्देशांक संचालन"
  options={[
    {text: 'आवश्यकता पड़ने पर एनेस्टेड निर्देशांक बनाता है', isAnswer: true},
    {text: 'केवल अंतिम निर्देशांक बनाता है'},
    {text: 'एक त्रुटि उत्पन्न करता है'},
    {text: 'सिम्बोलिक लिंक बनाता है'},
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
    `recursive: true` विकल्प अगर वे मौजूद नहीं हैं तो माता-पिता निर्देशांक बनाता है।
    इस विकल्प के बिना, './a/b/c' बनाने का प्रयास त्रुटि उत्पन्न करेगा अगर './a' या './a/b' मौजूद नहीं हैं।

    यह `mkdir -p` शेल कमांड के समान है।

    [mkdir के बारे में अधिक जानें](https://nodejs.org/api/fs.html#fsmkdirsyncpath-options)
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={7}
  group="स्ट्रीम"
  title="ट्रांसफॉर्म स्ट्रीम"
  options={[
    {text: 'hello world'},
    {text: 'HELLO WORLD', isAnswer: true},
    {text: 'Error'},
    {text: 'undefined'},
  ]}
>
  <slot name="question">
  <div className="question">
    इसका आउटपुट क्या होगा?
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
    ट्रांसफॉर्म स्ट्रीम डेटा को उसके द्वारा गुजरते समय संशोधित करते हैं। यहां, प्रत्येक चंक:
    1. स्ट्रिंग में बदला जाता है
    2. अपरकेस में बदला जाता है
    3. स्टैंडर्ड आउटपुट में पास किया जाता है

    यह सभी इनपुट को अपरकेस में बदलने वाला एक पाइपलाइन बनाता है।

    [ट्रांसफॉर्म स्ट्रीम के बारे में अधिक जानें](https://nodejs.org/api/stream.html#class-streamtransform)
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={8}
  group="फाइल सिस्टम"
  title="फाइल निगरानी"
  options={[
    {text: 'प्रति फाइल परिवर्तन एक बार'},
    {text: 'आश्वासित नहीं है; कई बार चल सकता है', isAnswer: true},
    {text: 'कभी नहीं'},
    {text: 'केवल फाइल हटाने पर'},
  ]}
>
  <slot name="question">
  <div className="question">
    जब कोई फाइल संशोधित होती है तो `fs.watch()` कितनी बार आश्वासित रूप से चलता है?
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
    `fs.watch()` को प्रत्येक तार्किक फाइल परिवर्तन पर ठीक एक बार चलने की गारंटी नहीं है। यह अक्सर कई बार चलता है क्योंकि कई टेक्स्ट एडिटर:
    1. अस्थायी फाइल में सहेजते हैं
    2. उसे लक्ष्य फाइल में नाम बदल देते हैं

    अधिक विश्वसनीय निगरानी के लिए इन पर विचार करें:
    - `chokidar` पैकेज
    - कॉलबैक को डीबाउंस करें
    - `fs.watchFile()` का उपयोग करें (हालांकि यह कम दक्ष है)

    [fs.watch() के बारे में अधिक जानें](https://nodejs.org/api/fs.html#fswatchfilename-options-listener)
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={9}
  group="बफर"
  title="बफर तुलना"
  options={[
    {text: 'true'},
    {text: 'false', isAnswer: true},
    {text: 'undefined'},
    {text: 'Error'},
  ]}
>
  <slot name="question">
  <div className="question">
    आउटपुट क्या है?
    ```js
        const buf1 = Buffer.from('Hello');
        const buf2 = Buffer.from('Hello');
        console.log(buf1 === buf2);
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    बफर संदर्भ द्वारा तुलना किया जाता है, मान नहीं। भले ही वे समान डेटा शामिल हैं, वे अलग-अलग ऑब्जेक्ट हैं।

    बफर सामग्री तुलना करने के लिए इस्तेमाल करें:
    ```js
        buf1.equals(buf2)  // true
        // or
        Buffer.compare(buf1, buf2) === 0  // true
    ```
    [बफर तुलना के बारे में अधिक जानें](https://nodejs.org/api/buffer.html#bufequalsotherbuffer)
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={10}
  group="स्ट्रीम"
  title="स्ट्रीम बैकप्रेशर"
  options={[
    {text: 'मेमोरी ओवरफ्लो को रोकता है', isAnswer: true},
    {text: 'पढ़ने की गति बढ़ाता है'},
    {text: 'डेटा को संपीड़ित करता है'},
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
    बैकप्रेशर एक तंत्र है जो मेमोरी ओवरफ्लो को रोकता है जब लिखने वाला छोर आगे नहीं बढ़ सकता, तो पढ़ने को रोककर।

    मैन्युअल बैकप्रेशर का उदाहरण:
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

    [बैकप्रेशर के बारे में अधिक जानें](https://nodejs.org/en/learn/modules/backpressuring-in-streams#backpressuring-in-streams)
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={11}
  group="फाइल सिस्टम"
  title="सिम्बोलिक लिंक"
  options={[
    {text: 'हार्ड लिंक बनाता है'},
    {text: 'एक कॉपी बनाता है'},
    {text: 'सिम्बोलिक लिंक बनाता है', isAnswer: true},
    {text: 'फ़ाइल को बदल जाता है'},
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
    `symlinkSync` लक्ष्य फ़ाइल के लिए एक सिम्बोलिक लिंक (जैसे शॉर्टकट) बनाता है।

    मुख्य अंतर हार्ड लिंक से:
    - डायरेक्टरी के लिंक कर सकते हैं
    - फ़ाइल सिस्टम के बीच फैल सकते हैं
    - यदि लक्ष्य हटा दिया जाता है तो तोड़ जाते हैं

    हार्ड लिंक बनाने के लिए:
    ```js
        fs.linkSync('target.txt', 'hardlink.txt');
    ```
    [सिम्बोलिक लिंक के बारे में अधिक जानें](https://nodejs.org/api/fs.html#fssymlinksync-target-path-type)
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={12}
  group="स्ट्रीम"
  title="स्ट्रीम मोड"
  options={[
    {text: 'केवल बाइनरी मोड'},
    {text: 'केवल ऑब्जेक्ट मोड'},
    {text: 'दोनों मोड', isAnswer: true},
    {text: 'कोई मोड नहीं'},
    {text: 'इनपुट और आउटपुट मोड'},
    {text: 'पढ़ने और लिखने के मोड'},
  ]}
>
  <slot name="question">
  <div className="question">
    नोड.जे.एस स्ट्रीम किन मोड में संचालित हो सकते हैं?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    स्ट्रीम इस प्रकार संचालित हो सकते हैं:
    1. बाइनरी मोड (डिफ़ॉल्ट): बफर और स्ट्रिंग के लिए
    2. ऑब्जेक्ट मोड: कोई भी जावास्क्रिप्ट मान

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
    [स्ट्रीम मोड के बारे में अधिक जानें](https://nodejs.org/api/stream.html#object-mode)
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={13}
  group="फाइल सिस्टम"
  title="फाइल डेस्क्रिप्टर्स"
  options={[
    {text: 'एक संख्या', isAnswer: true},
    {text: 'एक स्ट्रिंग'},
    {text: 'एक ऑब्जेक्ट'},
    {text: 'एक बफर'},
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
    फाइल डेस्क्रिप्टर्स ऐसी संख्याएँ होती हैं जो ऑपरेटिंग सिस्टम में खुली फाइलों को अद्वितीय रूप से पहचानती हैं।

    पहले तीन फाइल डेस्क्रिप्टर्स आरक्षित होते हैं:
    - 0: स्टैंडर्ड इनपुट (stdin)
    - 1: स्टैंडर्ड आउटपुट (stdout)
    - 2: स्टैंडर्ड त्रुटि (stderr)

    हमेशा फाइल डेस्क्रिप्टर्स को बंद करना याद रखें:
    ```js
        fs.close(fd, (err) => {
          if (err) throw err;
        });
    ```
    [फाइल डेस्क्रिप्टर्स के बारे में अधिक जानें](https://nodejs.org/api/fs.html#file-descriptors)
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={14}
  group="एन्कोडिंग"
  title="बफर एन्कोडिंग"
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
    UTF-8 में यह स्ट्रिंग कितने बाइट्स लेगी?
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
    - ASCII वर्ण (जैसे 'Hello ') प्रत्येक 1 बाइट लेते हैं
    - पृथ्वी एमोजी 🌍 4 बाइट लेता है

    इसलिए: 5 (Hello) + 1 (स्पेस) + 4 (🌍) = 10 बाइट्स n
    बाइट्स देखने के लिए:
    ```js
        console.log(buf);  // <Buffer 48 65 6c 6c 6f 20 f0 9f 8c 8d>
    ```
    [UTF-8 एन्कोडिंग के बारे में अधिक जानें](https://nodejs.org/api/buffer.html#buffers-and-character-encodings)
  </div>
  </slot>
</Challenge>

</QuizUI>

मुझे आशा है कि आपने अपने NodeJS IO ज्ञान का परीक्षण करके आनंद लिया होगा! अधिक चाहते हैं? अपने [क्विज़ संग्रह](/challenges/) को देखें अधिक चुनौतियों के लिए!
````
