# Translation Candidate
- Slug: quiz-bash-in-the-shell
- Locale: hi
- Model: deepseek/deepseek-v4-flash
- Target: src/content/posts/2024-11-20--quiz-bash-in-the-shell/hi/index.mdx
- Validation: deferred
- Runtime seconds: 408.50
- Input tokens: 14775
- Output tokens: 36444
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- Estimated cost: $0.012273
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
unlisted: false
title: 'प्रश्नोत्तरी: Bash और शेल निपुणता'
subTitle: 'क्या आप कंप्यूटर से बात कर सकते हैं? मतलब, अच्छे से?'
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
---
import Challenge from '../../../../components/QuizUI/Challenge';
import QuizUI from '../../../../components/QuizUI/QuizUI';

<p class="inset">इन 16 प्रश्नों के साथ अपने Bash स्क्रिप्टिंग कौशल का परीक्षण करें!</p>

इसमें चर, लूप, शर्तें, स्ट्रिंग मैनिपुलेशन, फंक्शन और बुनियादी से लेकर पेचीदा सिंटैक्स गॉचास शामिल हैं।

अपने शेल स्क्रिप्टिंग **कौशल** को निखारें (या साबित करें)!

<QuizUI>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={0}
  group="वार्मअप"
  title="चर घोषणा"
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
    Bash में चर कैसे परिभाषित किए जाते हैं?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Bash में चरों को `=` चिह्न के आसपास रिक्त स्थान के बिना घोषित किया जाता है। उदाहरण के लिए:
    ```bash
        name=Alice
    ```
    यह `\\"Alice\\"` मान को `name` चर में निर्दिष्ट करता है।

    नोट: `$name` का उपयोग किसी चर के मान को **संदर्भित** या पढ़ने के लिए किया जाता है।

    रिक्त स्थान जोड़ने से शेल कमांड को एक प्रोग्राम के रूप में व्याख्या करता है, जो चर सेट करते समय आप नहीं चाहते हैं।

    साथ ही, Bash केस-सेंसिटिव है, इसलिए `name`, `NAME` और `Name` अलग-अलग चर हैं।

    अंत में, चरों के नामों में रिक्त स्थान या डैश (`-`) नहीं हो सकते। इसके बजाय अंडरस्कोर (`_`) या camelCase का उपयोग करें।
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={1}
  group="वार्मअप: एस्केपिंग"
  title="उद्धरणों को एस्केप करना"
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
    _क्या प्रिंट करेगा `It's 🔨 Time!`?_
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    मुझे पता है। यह जंगली है कि कितनी जल्दी एस्केपिंग स्ट्रिंग्स को पार्स करना मुश्किल बना देती है। Bash स्ट्रिंग्स में अन्य भाषाओं को एस्केप करने की कल्पना करें - उन सभी कोट्स, एपॉस्ट्रॉफी और `$` प्रतीकों के साथ जो आपको गड़बड़ कर देते हैं। 🫠

    सिंगल कोट्स को सिंगल-कोटेड स्ट्रिंग्स के अंदर एस्केप करने की आवश्यकता होती है। क्लोज़-कोट, एस्केप्ड-कोट, रीओपन-कोट अनुक्रम (`'\''`) आउटपुट की अनुमति देता है:
    ```plaintext
        It's 🔨 Time!
    ```
    इसे संभालने के अन्य तरीके भी हैं, लेकिन यह सबसे सामान्य है।
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={2}
  group="वार्मअप: विस्तार"
  title="echo कमांड"
  options={[
    {text: 'cat cab'},
    {text: 'cat cbt', isAnswer: true},
    {text: 'ca bt'},
    {text: 'cat'},
    {text: 'cbd'},
    {text: 'Error'},
  ]}
>
  <slot name="question">
  <div className="question">
    यह कमांड क्या आउटपुट देगा?
    ```bash
        echo c{a,b}t
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    `{}` ब्रेस विस्तार अपने स्ट्रिंग संदर्भ के कई संस्करण उत्पन्न करता है, प्रत्येक अल्पविराम-पृथक मान या पैटर्न के लिए एक (या अधिक)।

    यहाँ, `c{a,b}t` विस्तारित होता है:
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
  title="एस्केपिंग कैरेक्टर्स"
  options={[
    {text: 'Cost: $$100'},
    {text: 'Cost: $100'},
    {text: 'Cost: 100'},
    {text: 'Cost: 00', isAnswer: true},
    {text: 'Cost:'},
    {text: 'Error'},
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
    नंबर वाले वेरिएबल्स का विशेष अर्थ होता है। इस मामले में, `$1` एक विशेष वेरिएबल है जो स्क्रिप्ट या फंक्शन को दिए गए पहले आर्गुमेंट को रखता है।

    चूंकि हम REPL में स्क्रिप्ट चला रहे हैं, कोई आर्गुमेंट नहीं है, इसलिए `$1` खाली है। बाकी टेक्स्ट `00` ज्यों का त्यों प्रिंट होता है।

    एक लिटरल `$` कैरेक्टर प्रिंट करने के लिए, सिंगल कोट्स का उपयोग करें, या इसे बैकस्लैश (`\`) से एस्केप करें:
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
  group="सबस्ट्रिंग्स को बदलना"
  title="सबस्ट्रिंग बदलें"
  options={[
    {text: 'meow meow'},
    {text: 'Meow meow'},
    {text: 'Bark meow', isAnswer: true},
    {text: 'Bark bark'},
    {text: 'Error'},
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
    `${var/pattern/replacement}` सिंटैक्स `pattern` की पहली घटना को `replacement` से बदलता है। यहाँ आउटपुट है:
    ```plaintext
        Bark meow
    ```
    यह केस-सेंसिटिव है। `bark` और `Bark` दोनों को संभालने के लिए, `${var/[Bb]ark/Bark}` जैसे पैटर्न का उपयोग करें या प्रतिस्थापन से पहले स्ट्रिंग को सामान्य करें।

    सभी घटनाओं को बदलने के लिए, `${var//pattern/replacement}` का उपयोग करें।

    स्ट्रिंग की शुरुआत से बदलने के लिए, `${var/#pattern/replacement}` का उपयोग करें।

    स्ट्रिंग के अंत से बदलने के लिए, `${var/%pattern/replacement}` का उपयोग करें।
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={5}
  group="स्ट्रिंग की लंबाई"
  title="स्ट्रिंग की लंबाई"
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
    Bash में किसी वेरिएबल की लंबाई कैसे प्राप्त करें?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    `${#username}` सिंटैक्स `username` की लंबाई लौटाता है।

    उदाहरण के लिए:
    ```bash
        username="@justsml"
        echo ${#username} # => 8
    ```
    जबकि `wc` काम करेगा, यह तकनीकी रूप से Bash का हिस्सा नहीं है।

    `wc` उपयोगिता एक पुराना इनसाइड जोक है जो "वॉटर क्लोज़ेट" या शौचालय का संदर्भ देता है।
    मज़ाक कर रहा हूँ! क्या कोई इसे पढ़ता है?

    वास्तव में `wc` Posix (और AT&T Unix के दिनों) का एक प्राचीन कमांड है। यह "वर्ड काउंट" का संक्षिप्त रूप है और यह किसी फ़ाइल या इनपुट स्ट्रीम में लाइनों, शब्दों और अक्षरों की गिनती कर सकता है।
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={6}
  group="शर्तें"
  title="बुनियादी If-Else"
  options={[
    {text: 'फ़ाइल मौजूद है'},
    {text: 'फ़ाइल मौजूद नहीं है, एक परीक्षण निदान के बाद', isAnswer: true},
    {text: 'केवल त्रुटि'},
    {text: 'डबल ब्रैकेट गायब हैं'},
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
    क्या आपने समापन ब्रैकेट से पहले गायब स्पेस को पकड़ा?

    Bash यहाँ काफी संवेदनशील है: ब्रैकेट एक्सप्रेशन के अंदर स्पेस आवश्यक हैं।

    क्योंकि गायब स्पेस के कारण `[` कमांड को कोई समापन `]` नहीं दिखता, Bash एक निदान प्रिंट करता है, परीक्षण को विफल मानता है, और `else` शाखा पर जारी रहता है।

    सही सिंटैक्स है:
    ```bash
        if [ -e example.txt ]; then
          echo "File exists"
        else
          echo "File does not exist"
        fi
    ```
    नोट: डबल ब्रैकेट `[[ ]]` को सशर्त अभिव्यक्तियों के लिए **अनुशंसित** किया जाता है। [BashFAQ देखें।](https://mywiki.wooledge.org/BashFAQ/031)
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={7}
  group="सशर्त"
  title="स्ट्रिंग तुलना"
  options={[
    {text: 'एक ही बिल्ली'},
    {text: 'अलग-अलग बिल्लियाँ, एक परीक्षण सिंटैक्स त्रुटि के बाद', isAnswer: true},
    {text: 'ज़ाल्गो'},
    {text: 'केवल त्रुटि'},
  ]}
>
  <slot name="question">
  <div className="question">
    Bash में स्ट्रिंग्स की तुलना कैसे करें?
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

    क्या आपने अमान्य `===` ऑपरेटर को पकड़ा?

    शायद आप JavaScript के बारे में सोच रहे थे...

    `[ ... ]` के साथ, Bash एक डायग्नोस्टिक रिपोर्ट करता है और शर्त गलत होती है, इसलिए `else` शाखा `Different cats` प्रिंट करती है। Bash में, समानता तुलना के लिए `=` या `==` का उपयोग करें।
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={8}
  group="फ़ंक्शन"
  title="फ़ंक्शन घोषणा"
  options={[
    {text: 'Hi', isAnswer: true},
    {text: 'Dan'},
    {text: 'Hi Dan'},
    {text: 'greet'},
    {text: 'Error'},
    {text: 'Syntax Error'},
  ]}
>
  <slot name="question">
  <div className="question">
    यह स्क्रिप्ट क्या आउटपुट देगी?
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
    Bash में फ़ंक्शन आर्गुमेंट स्वीकार कर सकते हैं। `$1` वेरिएबल फ़ंक्शन को दिए गए पहले आर्गुमेंट को रखता है।

    याद रखें, `$0` स्क्रिप्ट का नाम है, `$1` पहला आर्गुमेंट, `$2` दूसरा, इत्यादि। **स्पेस आर्गुमेंट को अलग करते हैं।** इसलिए, `greet Hi Dan` `"Hi"` को पहले आर्गुमेंट के रूप में पास करता है। `"Hi Dan"` को एक ही आर्गुमेंट के रूप में पास करने के लिए, आपको इसे कोट करना होगा: `greet "Hi Dan"`.
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={9}
  group="संयोजन"
  title="पाइपिंग का उपयोग"
  options={[
  ]}
>
  <slot name="question">
  <div className="question">
    कौन सा ऑपरेटर एक कमांड के **आउटपुट** को अगले कमांड के **इनपुट** से जोड़ता है?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    `|` पाइप ऑपरेटर एक कमांड के आउटपुट को दूसरे के इनपुट से जोड़ता है। उदाहरण के लिए:
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
  title="मूल अंकगणित"
  options={[
    {text: 'echo 2 + 2'},
    {text: 'echo ${2 + 2}'},
    {text: 'echo %(2 + 2)'},
    {text: 'echo $(( 2 + 2 ))', isAnswer: true},
    {text: 'त्रुटि'},
  ]}
>
  <slot name="question">
  <div className="question">
    Bash में गणित कैसे काम करता है?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    `(( ))` सिंटैक्स Bash में पूर्णांक गणित करता है।

    इसका उपयोग सरल गणनाओं के लिए किया जा सकता है:
    ```bash
        ((result = 2 + 2))
        echo $result # => 4
    ```
    या शर्त अभिव्यक्तियों के लिए:
    ```bash
        if (( 2 > 1 )); then
          echo "2 is greater than 1"
        fi
    ```
    फ्लोटिंग-पॉइंट अंकगणित के लिए, [`bc`](https://www.gnu.org/software/bc/manual/html_mono/bc.html) या [`awk`](https://www.gnu.org/software/gawk/manual/gawk.html) का उपयोग करने पर विचार करें।
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={11}
  group="गुणा"
  title="मूल अंकगणित"
  options={[
    {text: 'echo 10 * 0.5'},
    {text: 'echo (10 * 0.5)'},
    {text: 'echo ${ 10 * 0.5 }'},
    {text: 'echo %( 10 * 0.5 )'},
    {text: 'echo $(( 10 * 0.5 ))'},
    {text: 'echo \'10 * 0.5\' | bc', isAnswer: true},
    {text: 'Error'},
  ]}
>
  <slot name="question">
  <div className="question">
    इनमें से कौन सा 10 और 0.5 को सही ढंग से गुणा करके 5 प्रिंट करता है?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    `(( ))` सिंटैक्स केवल **पूर्णांक** अंकगणित करता है। यानी पूर्ण संख्याएँ, बिना किसी दशमलव के!

    बैश (शायद आश्चर्यजनक रूप से) में फ़्लोटिंग-पॉइंट अंकगणित के लिए **अंतर्निहित** समर्थन नहीं है।

    सबसे सामान्य समाधान GNU उपयोगिताओं [`bc`](https://www.gnu.org/software/bc/manual/html_mono/bc.html) या [`awk`](https://www.gnu.org/software/gawk/manual/gawk.html) का उपयोग करना है।
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={12}
  group="स्ट्रिंग मैनिपुलेशन"
  title="सबस्ट्रिंग निकालना"
  options={[
    {text: 'बुरी बिल्ली'},
    {text: 'बुरी बिल्ली, अच्छी बिल्ली:9'},
    {text: 'अच्छी बिल्ली', isAnswer: true},
    {text: 'त्रुटि'},
  ]}
>
  <slot name="question">
  <div className="question">
    इस स्क्रिप्ट में `:` क्या करता है?
    ```bash
        rosie="Bad cat, good cat"
        echo ${rosie:9}
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    `${var:offset}` सिंटैक्स `offset` से शुरू होने वाला एक सबस्ट्रिंग निकालता है। यहाँ, आउटपुट है:
    ```plaintext
        good cat
    ```
    एक विशिष्ट लंबाई का सबस्ट्रिंग निकालने के लिए, `${var:offset:length}` का उपयोग करें।

    स्ट्रिंग के अंत से निकालने के लिए, `${var: -offset}` का उपयोग करें। (`-` से पहले स्पेस पर ध्यान दें!)
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={13}
  group="लूप्स"
  title="बैश में लूप्स"
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
    बैश में लूपिंग के लिए कौन सा कीवर्ड नहीं है ❌?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    `each` बैश में लूप कीवर्ड नहीं है। मुख्य लूप कीवर्ड `for`, `while`, और `until` हैं।

    जबकि `do` तकनीकी रूप से लूप कीवर्ड नहीं है, यह लूप सिंटैक्स का एक महत्वपूर्ण हिस्सा है।
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={14}
  group="गॉचाज़"
  title="कमांड सब्स्टीट्यूशन"
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
    `$(ls -l)` सिंटैक्स **कोष्ठक** के अंदर कमांड को निष्पादित करता है और आउटपुट को प्रतिस्थापित करता है। उदाहरण के लिए:
    ```bash
        echo "Today is $(date +%F)"
        # => Today is 2029-12-31
    ```
    पहला विकल्प सिंगल कोट्स `'` का उपयोग करता है, **बैकटिक्स का नहीं।** यह विस्तार को रोकता है, इसलिए `'$(date +%F)'` केवल शाब्दिक स्ट्रिंग `$(date +%F)` प्रिंट करेगा।

    हालांकि कमांड निष्पादन के लिए बैकटिक्स (`` `ls -l` ``) का उपयोग अभी भी समर्थित है, हाल ही में यह कुछ हद तक एक एंटी-पैटर्न बन गया है (कुछ संदर्भों में)। अधिकांश बेहतर पठनीयता और विभिन्न शेल्स और संस्करणों के साथ संगति के लिए `$(command)` का उपयोग करने की सलाह देते हैं।

    कर्ली ब्रेसेस `${}` का उपयोग वेरिएबल विस्तार के लिए किया जाता है, कमांड सब्स्टीट्यूशन के लिए नहीं।

    `%` कैरेक्टर का उपयोग कमांड सब्स्टीट्यूशन के लिए नहीं किया जाता है।
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={15}
  group="मानक इनपुट/आउटपुट"
  title="डिफ़ॉल्ट मान"
  options={[
  ]}
>
  <slot name="question">
  <div className="question">
    त्रुटि आउटपुट को मानक आउटपुट में संयोजित करने के लिए किस ऑपरेटर का उपयोग किया जाता है?
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    `2>&1` ऑपरेटर मानक त्रुटि (फ़ाइल डिस्क्रिप्टर 2) को मानक आउटपुट (फ़ाइल डिस्क्रिप्टर 1) पर रीडायरेक्ट करता है। यह त्रुटि संदेशों को सामान्य आउटपुट के साथ एक ही आउटपुट स्ट्रीम में कैप्चर करने के लिए उपयोगी है।

    `1>&2` ऑपरेटर मानक आउटपुट को मानक त्रुटि पर रीडायरेक्ट करता है, हालांकि, प्रश्न पूछा गया था कि मानक त्रुटि को मानक आउटपुट पर कैसे रीडायरेक्ट किया जाए।

    अधिक जानने के लिए कि अंदर क्या हो रहा है, [ग्रेग का उत्कृष्ट रीडायरेक्शन FAQ](https://mywiki.wooledge.org/BashFAQ/055) देखें।

    साथ ही, सुझाए गए कॉपी सुधारों के लिए Reddit उपयोगकर्ता [u/OneTurnMore](https://www.reddit.com/user/OneTurnMore/) का धन्यवाद।
  </div>
  </slot>
</Challenge>

</QuizUI>

<p className="inset">क्या मेरी बैश क्विज़ ने आपको बुरी तरह तोड़ दिया?</p>

नीचे टिप्पणियों में मुझे बताएं!

### आगे पढ़ें

निम्नलिखित संसाधनों से अपने बैश कौशल को निखारें:

- [बैश गाइड](https://www.gnu.org/software/bash/manual/bash.html)
- [बैश FAQ](http://mywiki.wooledge.org/BashFAQ)
- [शेलचेक](https://www.shellcheck.net/)
- [बैश अकादमी](https://guide.bash.academy/)
- [बैश स्क्रिप्टिंग ट्यूटोरियल](https://ryanstutorials.net/bash-scripting-tutorial/)
- [बैश संदर्भ मैनुअल](https://www.gnu.org/software/bash/manual/bash.html)
- [बैश हैकर्स विकी](http://wiki.bash-hackers.org/)
- [शुरुआती के लिए बैश गाइड](http://tldp.org/LDP/Bash-Beginners-Guide/html/index.html)
- [बैश संदर्भ कार्ड](http://www.tldp.org/LDP/Bash-Beginners-Guide/html/Bash-Beginners-Guide.html)
````
