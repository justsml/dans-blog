# Translation Candidate
- Slug: quiz-bash-in-the-shell
- Locale: hi
- Model: openrouter/qwen/qwen3-32b:nitro
- Target: src/content/posts/2024-11-20--quiz-bash-in-the-shell/hi/index.mdx
- Validation: rejected: direct AI SDK translation failed
- Runtime seconds: 276.02
- Input tokens: 14570
- Output tokens: 23929
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- Estimated cost: $0.006909
- Pricing source: local-openrouter-estimate
- Note: Command failed: git add src/content/posts/2024-11-20--quiz-bash-in-the-shell/hi/index.mdx reports/i18n/quiz-bash-in-the-shell/hi
## Raw Output

````mdx
---
unlisted: false
title: 'क्विज़: बैश एवं शेल महारत'
subTitle: क्या आप कंप्यूटर्स से बात कर सकते हैं? ठीक से?
label: Bash
category: Quiz
subCategory: Bash
date: '2024-11-20'
modified: '2024-11-21'
tags:
  - quiz
  - bash
  - scripting
  - shell
  - linux
  - beginner
  - intermediate
  - advanced
social_image: ../desktop-social.webp
cover_full_width: ../psychedelic-shell-wide.webp
cover_mobile: ../psychedelic-shell-square-200.webp
cover_icon: ../psychedelic-shell-square-200.webp
---
import Challenge from '../../../../../components/QuizUI/Challenge';
import QuizUI from '../../../../../components/QuizUI/QuizUI';

<p class="inset">इन 16 प्रश्नों के साथ अपनी बैश स्क्रिप्टिंग क्षमता का परीक्षण करें!</p>

चर, लूप, शर्तें, स्ट्रिंग ऑपरेशन, फ़ंक्शन और मूल-से-कठिन सिंटैक्स चूक को कवर कर रहा है।

अपनी शेल स्क्रिप्टिंग **क्षमता** को तेज करें (या साबित करें)!

<QuizUI>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={0}
  group="तैयारी"
  title="चर की घोषणा"
  options={[
    {text: '$name=Dan'},
    {text: 'name=Dan', isAnswer: true},
    {text: 'name =Dan'},
    {text: 'name == Dan'},
    {text: 'name : Dan'},
  ]}
>
  <slot name="question">
  <div className="question">
    बैश में चर कैसे परिभाषित किए जाते हैं?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    बैश में चर को `=` चिह्न के आसपास स्पेस के बिना घोषित किया जाता है। उदाहरण के लिए:
    ```bash
        name=Alice
    ```
    यह `"Alice"` मान को `name` चर में निर्धारित करता है।

    ध्यान दें: `$name` का उपयोग चर के मान को **संदर्भित** या पढ़ने के लिए किया जाता है।

    स्पेस जोड़ने से शेल इसे एक प्रोग्राम के रूप में निष्पादित करने की उम्मीद करता है, जो चर सेट करते समय आपकी बात नहीं है।

    अंत में, चर के नाम में स्पेस या डैश (`-`) नहीं हो सकते। इनके बजाय अंडरस्कोर (`_`) या camelCase का उपयोग करें।
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={1}
  group="ऊष्मा: पलायन"
  title="उद्धरणों का पलायन"
  options={[
    {text: 'echo \'It\'s 🔨 Time!\''},
    {text: 'echo \'It\\\'s 🔨 Time!\''},
    {text: 'echo \'It\'\\\'\'s 🔨 Time!\'', isAnswer: true},
    {text: 'echo \'It\'\'s 🔨 Time!\''},
    {text: 'Error'},
  ]}
>
  <slot name="question">
  <div className="question">
    _`It's 🔨 Time!` क्या प्रिंट करेगा?_
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    मैं जानता हूँ। यह भाग्य है कि कितनी जल्दी पलायन स्ट्रिंग्स को पार्स करने में कठिन बना देता है। अन्य भाषाओं को बैश स्ट्रिंग में पलायन करना सोचिए - इनमें उद्धरण, अपोस्ट्रोफ़ और `$` सिम्बोल होते हैं जो आपको बर्बाद कर देते हैं। 🫠

    एकल उद्धरण को एकल-उद्धरित स्ट्रिंग में पलायन करने की आवश्यकता होती है। बंद उद्धरण, पलायन उद्धरण, पुनः खोले गए उद्धरण क्रम (`'\''`) निम्नलिखित को आउटपुट करने की अनुमति देता है:
    ```plaintext
        It's 🔨 Time!
    ```
    इसके अन्य तरीके हैं, लेकिन यह सबसे आम है।
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={2}
  group="तैयारी: प्रसार"
  title="ईचो कमांड"
  options={[
    {text: 'कैट कैब'},
    {text: 'कैट सीबीटी', isAnswer: true},
    {text: 'सी बीटी'},
    {text: 'कैट'},
    {text: 'सीबीडी'},
    {text: 'त्रुटि'},
  ]}
>
  <slot name="question">
  <div className="question">
    इस कमांड का आउटपुट क्या होगा?
    ```bash
        echo c{a,b}t
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    कमाऊन द्वारा `{}` ब्रेस प्रसार अपने स्ट्रिंग संदर्भ के कई संस्करण उत्पन्न करता है, प्रत्येक कमा-अलग किए गए मान या पैटर्न के लिए एक (या अधिक)।

    यहाँ, `c{a,b}t` निम्नलिखित में फैलता है:
    ```plaintext
        cat cbt
    ```
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={3}
  group="चर"
  title="प्रतिस्थापन अक्षर"
  options={[
    {text: 'कीमत: $$100'},
    {text: 'कीमत: $100'},
    {text: 'कीमत: 100'},
    {text: 'कीमत: 00', isAnswer: true},
    {text: 'कीमत:'},
    {text: 'त्रुटि'},
  ]}
>
  <slot name="question">
  <div className="question">
    अब, यह क्या प्रिंट करेगा?
    ```bash
        price="$100"
        echo "Cost: $price"
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    अंकित चरों का विशेष अर्थ होता है। इस मामले में, `$1` एक विशेष चर है जो स्क्रिप्ट या फंक्शन में पास किए गए पहले आर्गुमेंट को रखता है।

    चूंकि हम एक REPL में स्क्रिप्ट चला रहे हैं, इसमें कोई आर्गुमेंट नहीं हैं, इसलिए `$1` खाली है। शेष टेक्स्ट `00` ऐसे ही प्रिंट हो जाता है।

    एक लिटरल `$` चिह्न दिखाने के लिए, सिंगल कोट्स का उपयोग करें, या बैकस्लैश (`\`) से इसे एस्केप करें:
    ```bash
        price="\$100"
        echo "Cost: $price"
    ```
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={4}
  group="उपस्थिति को बदलें"
  title="उपस्थिति को बदलें"
  options={[
    {text: 'मियाऊ मियाऊ'},
    {text: 'मियाऊ मियाऊ'},
    {text: 'बार्क मियाऊ', isAnswer: true},
    {text: 'बार्क बार्क'},
    {text: 'त्रुटि'},
  ]}
>
  <slot name="question">
  <div className="question">
    यहाँ क्या हो रहा है?
    ```bash
        str="Bark bark"
        echo ${str/bark/meow}
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    सिंटैक्स `${var/pattern/replacement}` में `pattern` की पहली उपस्थिति को `replacement` से बदल दिया जाता है। यहाँ आउटपुट है:
    ```plaintext
        Bark meow
    ```
    यह केस-सेंसिटिव होता है। अगर `bark` और `Bark` दोनों को हैंडल करना हो, तो `${var/[Bb]ark/Bark}` जैसा पैटर्न या बदलाव से पहले स्ट्रिंग नॉर्मलाइज करें।

    सभी उपस्थितियों को बदलने के लिए `${var//pattern/replacement}` का उपयोग करें।

    स्ट्रिंग के शुरूआत में उपस्थिति को बदलने के लिए `${var/#pattern/replacement}` का उपयोग करें।

    स्ट्रिंग के अंत में उपस्थिति को बदलने के लिए `${var/%pattern/replacement}` का उपयोग करें।
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={5}
  group="स्ट्रिंग लंबाई"
  title="स्ट्रिंग लंबाई"
  options={[
    {text: '$#username'},
    {text: '#$username'},
    {text: '${#username}', isAnswer: true},
    {text: '${username#}'},
    {text: 'echo $username | wc -c'},
  ]}
>
  <slot name="question">
  <div className="question">
    बैश में एक वैरिएबल की लंबाई प्राप्त करने का कौन सा तरीका सही है?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    सिंटैक्स `${#username}` आपको `username` की लंबाई देता है।

    उदाहरण के लिए:
    ```bash
        username="@justsml"
        echo ${#username} # => 8
    ```
    `wc` काम कर सकता है लेकिन यह बैश का हिस्सा नहीं है।

    `wc` एक प्राचीन कमांड है जो Posix (और AT&T यूनिक्स दिनों) से आया है। यह "शब्द गिनती" का छोटा रूप है और यह एक फ़ाइल या इनपुट स्ट्रीम में पंक्तियों, शब्दों और वर्णों की गिनती कर सकता है।

    क्या कोई पढ़ रहा है ये? कभी-कभी ऐसे जोक्स भी होते हैं कि `wc` का मतलब "वॉटर क्लॉसेट" होता है।
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={6}
  group="शर्तीय बयान"
  title="मूल यदि-अन्यथा"
  options={[
    {text: 'फ़ाइल मौजूद है'},
    {text: 'फ़ाइल मौजूद नहीं है, एक टेस्ट विश्लेषण के बाद', isAnswer: true},
    {text: 'केवल त्रुटि'},
    {text: 'डबल ब्रैकेट्स की कमी'},
    {text: 'कुछ नहीं'},
  ]}
>
  <slot name="question">
  <div className="question">
    यदि फ़ाइल `cats.txt` मौजूद है तो यह स्क्रिप्ट क्या आउटपुट देती है?
    ```bash
        if [ -e cats.txt]; then
          echo "File exists"
        else
          echo "File does not exist"
        fi
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    क्या आपने बंद ब्रैकेट से पहले लुप्त अंतराल को पकड़ लिया?

    बैश यहां बहुत संवेदनशील है: ब्रैकेट अभिव्यक्तियों में अंतराल आवश्यक हैं।

    लुप्त अंतराल के कारण `[` कमांड को कोई बंद `]` नहीं मिलता, बैश एक विश्लेषण प्रिंट करता है, टेस्ट को विफल मानता है और `else` शाखा पर जाता है।

    सही सिंटैक्स है:
    ```bash
        if [ -e example.txt ]; then
          echo "File exists"
        else
          echo "File does not exist"
        fi
    ```
    नोट: शर्तीय अभिव्यक्तियों के लिए डबल ब्रैकेट्स `[[ ]]` का उपयोग करना **अनुशंसित** है। [बैश एफएक्यू को देखें।](https://mywiki.wooledge.org/BashFAQ/031)
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={7}
  group="शर्तें"
  title="स्ट्रिंग तुलना"
  options={[
    {text: 'एक ही बिल्ली'},
    {text: 'अलग बिल्लियाँ, एक परीक्षण सिंटैक्स त्रुटि के बाद', isAnswer: true},
    {text: 'जाल्गो'},
    {text: 'केवल त्रुटि'},
  ]}
>
  <slot name="question">
  <div className="question">
    हम बैश में स्ट्रिंग कैसे तुलना कर सकते हैं?
    ```bash
        cat1="Rosie"
        cat2="Sunflower"
        if [ "$cat1" === "$cat2" ]; then
          echo "Same cat"
        else
          echo "Different cats"
        fi
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    एक और परीक्षण सिंटैक्स त्रुटि!

    क्या आपने अमान्य `===` ऑपरेटर देखा?

    शायद आपने जावास्क्रिप्ट के बारे में सोचा हो...

    `[ ... ]` के साथ, बैश एक विवरण रिपोर्ट करता है और शर्त असत्य होती है, इसलिए `else` शाखा `Different cats` प्रिंट करती है। बैश में, बराबरता तुलना के लिए `=` या `==` का उपयोग करें।
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={8}
  group="फंक्शन्स"
  title="फंक्शन घोषणा"
  options={[
    {text: 'हैलो', isAnswer: true},
    {text: 'डैन'},
    {text: 'हैलो डैन'},
    {text: 'ग्रीट'},
    {text: 'त्रुटि'},
    {text: 'सिंटैक्स त्रुटि'},
  ]}
>
  <slot name="question">
  <div className="question">
    इस स्क्रिप्ट का आउटपुट क्या होगा?
    ```bash
        function greet () {
          echo "$1"
        }
        greet Hi Dan
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    बैश में फंक्शन आर्ग्यूमेंट्स स्वीकार कर सकते हैं। `$1` चर फंक्शन में दिए गए पहले आर्ग्यूमेंट को रखता है।

    ध्यान रहे, `$0` स्क्रिप्ट नाम है, `$1` पहला आर्ग्यूमेंट है, `$2` दूसरा आर्ग्यूमेंट है, आदि। **अंतर आर्ग्यूमेंट्स के लिए अंतर होते हैं।** इसलिए, `greet हैलो डैन` कमांड में `"हैलो"` पहला आर्ग्यूमेंट होगा। `"हैलो डैन"` को एकल आर्ग्यूमेंट के रूप में पास करने के लिए इसे कोट करना होगा: `greet "हैलो डैन"`।
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={9}
  group="संयोजन"
  title="पाइप का उपयोग"
  options={[
  ]}
>
  <slot name="question">
  <div className="question">
    कौन सा ऑपरेटर एक कमांड के आउटपुट को अगले कमांड के इनपुट से जोड़ता है?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    पाइप ऑपरेटर `|` एक कमांड के आउटपुट को दूसरे कमांड के इनपुट से जोड़ता है। उदाहरण के लिए:
    ```bash
        echo "Mr. Levy 👨🏻‍🔬" | wc -m
        # => 14
    ```
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={10}
  group="अंकगणित"
  title="मूलभूत अंकगणित"
  options={[
    {text: 'ईचो 2 + 2'},
    {text: 'ईचो ${2 + 2}'},
    {text: 'ईचो %(2 + 2)'},
    {text: 'ईचो $(( 2 + 2 ))', isAnswer: true},
    {text: 'त्रुटि'},
  ]}
>
  <slot name="question">
  <div className="question">
    बैश में गणित कैसे काम करता है?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    बैश में पूर्णांक गणना के लिए `(( ))` सिंटैक्स का उपयोग किया जाता है।

    इसका उपयोग सरल गणनाओं के लिए किया जा सकता है:
    ```bash
        ((result = 2 + 2))
        echo $result # => 4
    ```
    या शर्तों के लिए भी:
    ```bash
        if (( 2 > 1 )); then
          echo "2 is greater than 1"
        fi
    ```
    फ्लोटिंग-पॉइंट अंकगणित के लिए [`bc`](https://www.gnu.org/software/bc/manual/html_mono/bc.html) या [`awk`](https://www.gnu.org/software/gawk/manual/gawk.html) का उपयोग करने की ओर जाएं।
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={11}
  group="गुणा"
  title="मूलभूत अंकगणित"
  options={[
    {text: 'echo 10 * 0.5'},
    {text: 'echo (10 * 0.5)'},
    {text: 'echo ${ 10 * 0.5 }'},
    {text: 'echo %( 1:0 * 0.5 )'},
    {text: 'echo $(( 10 * 0.5 ))'},
    {text: 'echo \'10 * 0.5\' | bc', isAnswer: true},
    {text: 'Error'},
  ]}
>
  <slot name="question">
  <div className="question">
    इनमें से कौन सा 10 और 0.5 को गुणा करता है और 5 प्रिंट करता है?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    सिंटैक्स `(( ))` केवल **पूर्णांक** अंकगणित करता है। आप जानते हैं, फ्लोटिंग पॉइंट के बिना पूर्ण संख्याएँ!

    बैश (संभवतः अस्पष्ट रूप से) में **बिल्ट-इन** फ्लोटिंग-पॉइंट अंकगणित का समर्थन नहीं है।

    सबसे आम समाधान GNU उपयोगिताओं [`bc`](https://www.gnu.org/software/bc/manual/html_mono/bc.html) या [`awk`](https://www.gnu.org/software/gawk/manual/gawk.html) का उपयोग करना है।
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={12}
  group="स्ट्रिंग प्रबंधन"
  title="उप-स्ट्रिंग निकालना"
  options={[
    {text: 'बैड कैट'},
    {text: 'बैड कैट, गुड कैट:9'},
    {text: 'गुड कैट', isAnswer: true},
    {text: 'त्रुटि'},
  ]}
>
  <slot name="question">
  <div className="question">
    इस स्क्रिप्ट में ``:`` क्या करता है?
    ```bash
        rosie="Bad cat, good cat"
        echo ${rosie:9}
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    ``${var:offset}`` सिंटैक्स `offset` से शुरू होने वाला उप-स्ट्रिंग निकालता है। यहाँ, आउटपुट है:
    ```plaintext
        good cat
    ```
    किसी विशिष्ट लंबाई का उप-स्ट्रिंग निकालने के लिए, ``${var:offset:length}`` का उपयोग करें।

    स्ट्रिंग के अंत से निकालने के लिए, ``${var: -offset}`` का उपयोग करें। (ध्यान दें कि `-` से पहले अवकाश है!)
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={13}
  group="लूप"
  title="बैश में लूप"
  options={[
    {text: 'do'},
    {text: 'each', isAnswer: true},
    {text: 'for'},
    {text: 'until'},
    {text: 'while'},
  ]}
>
  <slot name="question">
  <div className="question">
    बैश में लूपिंग के लिए कुंजी शब्द नहीं है ❌ क्या है?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    `each` बैश में लूप कुंजी शब्द नहीं है। मुख्य लूप कुंजी शब्द `for`, `while`, और `until` हैं।

    `do` तकनीकी रूप से लूप कुंजी शब्द नहीं है, लेकिन यह लूप सिंटैक्स का महत्वपूर्ण हिस्सा है।
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={14}
  group="अजीबो-गरीब बातें"
  title="कमांड प्रतिस्थापन"
  options={[
    {text: '\'ls -l\''},
    {text: '% ls -l'},
    {text: '$ ls -l'},
    {text: '$(ls -l)', isAnswer: true},
    {text: '${ls -l}'},
  ]}
>
  <slot name="question">
  <div className="question">
    कौन सा विकल्प कमांड `ls -l` को निष्पादित करेगा और आउटपुट लौटाएगा?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    `$(ls -l)` सिंटैक्स **बर्तन** में समाहित कमांड को निष्पादित करता है और आउटपुट को प्रतिस्थापित करता है। उदाहरण के लिए:
    ```bash
        echo "Today is $(date +%F)"
        # => Today is 2029-12-31
    ```
    पहला विकल्प एकल उद्धरण `'` का उपयोग करता है, **बैकटिक्स नहीं।** यह विस्तार को रोकता है, इसलिए `'$(date +%F)'` सरलता से साहित्यिक स्ट्रिंग `$(date +%F)` प्रिंट करेगा।

    हालांकि बैकटिक्स (`` `ls -l` ``) कमांड निष्पादन के लिए अभी भी समर्थित हैं, लेकिन यह अब कुछ संदर्भों में एंटी-पैटर्न बन गया है। अधिकांश लोग `$(command)` का उपयोग करने की सिफारिश करते हैं जो अलग-अलग शेल और संस्करणों के साथ बेहतर पठनीयता और संगतता प्रदान करता है।

    घुमावदार ब्रेस `{}` चर विस्तार के लिए उपयोग किए जाते हैं, न कि कमांड प्रतिस्थापन के लिए।

    `%` चिह्न कमांड प्रतिस्थापन के लिए उपयोग नहीं किया जाता है।
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={15}
  group="मानक इन/आउट"
  title="डिफ़ॉल्ट मान"
  options={[
  ]}
>
  <slot name="question">
  <div className="question">
    कौन सा ऑपरेटर मानक आउटपुट में त्रुटि आउटपुट को जोड़ने के लिए उपयोग किया जाता है?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    `2>&1` ऑपरेटर मानक त्रुटि (फ़ाइल डेस्क्रिप्टर 2) को मानक आउटपुट (फ़ाइल डेस्क्रिप्टर 1) में रीडायरेक्ट करता है। यह मानक आउटपुट स्ट्रीम में त्रुटि संदेश को कैप्चर करने के लिए उपयोगी होता है।

    `1>&2` ऑपरेटर मानक आउटपुट को मानक त्रुटि में रीडायरेक्ट करता है, हालांकि प्रश्न मानक त्रुटि को मानक आउटपुट में रीडायरेक्ट करने के बारे में पूछ रहा था।

    अंतर्निहित कार्यविधि के बारे में अधिक जानकारी के लिए [ग्रेग के शानदार रीडायरेक्शन एफएक्यू](https://mywiki.wooledge.org/BashFAQ/055) देखें।

    इसके अलावा, रेडिट यूजर [u/OneTurnMore](https://www.reddit.com/user/OneTurnMore/) का धन्यवाद करते हैं जिन्होंने कॉपी सुधार के लिए सुझाव दिया।
  </div>
  </slot>
</Challenge>

</QuizUI>

<p className="inset">क्या मेरा बैश क्विज़ आपको बेहद घबरा दिया?</p>

टिप्पणियों में बताएं!

### आगे पढ़ें

अपने बैश कौशल बढ़ाएं नीचे दिए गए संसाधनों के साथ:

- [बैश गाइड](https://www.gnu.org/software/bash/manual/bash.html)
- [बैश एफएक्यू](http://mywiki.wooledge.org/BashFAQ)
- [शेलचेक](https://www.shellcheck.net/)
- [बैश अकादमी](https://guide.bash.academy/)
- [बैश स्क्रिप्टिंग ट्यूटोरियल](https://ryanstutorials.net/bash-scripting-tutorial/)
- [बैश रेफरेंस मैनुअल](https://www.gnu.org/software/bash/manual/bash.html)
- [बैश हैकर्स विकि](http://wiki.bash-hackers.org/)
- [बैश गाइड फॉर बिगिनर्स](http://tldp.org/LDP/Bash-Beginners-Guide/html/index.html)
- [बैश रेफरेंस कार्ड](http://www.tldp.org/LDP/Bash-Beginners-Guide/html/Bash-Beginners-Guide.html)
````
