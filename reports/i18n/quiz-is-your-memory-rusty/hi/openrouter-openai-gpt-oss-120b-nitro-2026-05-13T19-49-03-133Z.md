# Translation Candidate
- Slug: quiz-is-your-memory-rusty
- Locale: hi
- Model: openrouter/openai/gpt-oss-120b:nitro
- Target: src/content/posts/2024-12-28--quiz-is-your-memory-rusty/hi/index.mdx
- Validation: deferred
- Runtime seconds: 28.57
- Input tokens: 20143
- Output tokens: 22235
- Thinking tokens: unknown
- Cached input tokens: 6528
- Cache write tokens: 0
- Estimated cost: $0.004788
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
unlisted: false
draft: false
title: 'प्रश्नोत्तरी: आवश्यक रस्ट मेमोरी प्रबंधन'
subTitle: "(Borrow) खुद को चेक करो, खुद को बर्बाद करने से पहले! \U0001F980"
label: 'Memory, man'
category: Quiz
subCategory: Rust
date: '2024-12-28'
modified: '2024-12-29'
social_image: ../mobile.webp
tags:
  - quiz
  - rust
  - memory-management
  - ownership
  - borrowing
  - lifetimes
  - intermediate
  - advanced
redirects:
  - /quiz/rust/memory/
cover_full_width: ../fade-to-clouds-wide.webp
cover_mobile: ../fade-to-clouds-square-200.webp
cover_icon: ../fade-to-clouds-square-200.webp
---
import Challenge from '../../../../components/QuizUI/Challenge';

importChallenge from '../../../../components/QuizUI/Challenge';
import QuizUI from '../../../../components/QuizUI/QuizUI';

<p class="inset">क्या आप अपने Rust मेमोरी‑मैनेजमेंट कौशल को परखना चाहते हैं? 🦀</p>

यह क्विज़ Rust के ownership सिस्टम, borrowing नियम, lifetimes, और smart pointers की आपकी समझ को चुनौती देगा।

**ध्यान दें:** प्रश्नों को लगभग 50‑कॉलम चौड़ाई में फॉर्मेट किया गया है ताकि सभी डिवाइस पर पढ़ने में आसानी रहे। (सुधार के सुझाव हमेशा स्वागत हैं!)

चाहे आप एक अनुभवी Rustacean हों या अभी‑ही मेमोरी मैनेजमेंट सीख रहे हों, यह क्विज़ आपके ज्ञान को मजबूत करने में मदद करेगा। **चलिए शुरू करते हैं!** 🦀

<QuizUI>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={0}
  group="स्वामित्व"
  title="बेसिक मूव सेमांटिक्स"
  options={[
    {text: 'नमस्ते, !', hint: 'सोचें कि \'philosopher\' को मूव करने के बाद क्या होता है'},
    {text: 'नमस्ते, ज़ेनो ऑफ़ सिटियम!', hint: 'एक बार मान मूव हो जाने पर, क्या हम अभी भी इसका उपयोग कर सकते हैं?'},
    {text: 'नमस्ते, ज़ेनो ऑफ़ एलेआ!', hint: 'स्ट्रिंग में \'Citium\' है, \'Elea\' नहीं'},
    {text: 'नमस्ते, मार्कस ऑरेलियस', hint: 'जाँचें कि यह स्ट्रिंग सामग्री से मेल खाता है या नहीं'},
    {text: 'कम्पाइलेशन एरर: मूव के बाद वैल्यू उधार ली गई', isAnswer: true},
    {text: 'रनटाइम एरर: नल पॉइंटर एक्सेप्शन', hint: 'Rust इन समस्याओं को कम्पाइल टाइम पर पकड़ लेता है'},
  ]}
>
  <slot name="question">
  <div className="question">
    जब आप इस कोड को चलाते हैं तो क्या होता है? आउटपुट या एरर का अनुमान लगाएँ:
    ```rust
          fn main() {
              let philosopher =
                  String::from("Zeno of Citium");
              let greeting = philosopher;

              println!("Hello, {}!", philosopher);
          }
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    यह कोड Rust के स्वामित्व नियमों के कारण कम्पाइल नहीं होता। जब हम `philosopher` को `greeting` को असाइन करते हैं, तो String की स्वामित्व `greeting` को मूव हो जाता है। इस मूव के बाद, `philosopher` अब वैध नहीं रहता।

    यहाँ इसे ठीक करने के तीन तरीके हैं:

    1. स्ट्रिंग को क्लोन करें (एक नई कॉपी बनाता है):
    ```rust
          let greeting = philosopher.clone();
    ```
    2. रेफ़रेंस का उपयोग करें (वैल्यू उधार लेता है):
    ```rust
          let greeting = &philosopher;
    ```
    3. स्ट्रिंग स्लाइस का उपयोग करें (स्ट्रिंग का हिस्सा उधार लेता है):
    ```rust
          let greeting = &philosopher[..];
    ```
    प्रत्येक समाधान के अलग उपयोग केस और प्रदर्शन प्रभाव होते हैं। क्लोनिंग महंगा है लेकिन स्वामित्व देता है, जबकि रेफ़रेंसेज़ सस्ते हैं लेकिन लाइफ़टाइम प्रतिबंध होते हैं।
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={1}
  group="स्वामित्व"
  title="फ़ंक्शनों के साथ मूव सेमैंटिक्स"
  options={[
    {text: 'दोनों पंक्तियों को प्रिंट करता है', hint: '\'wisdom\' को फ़ंक्शन को पास करने के बाद क्या होता है, इस पर विचार करें'},
    {text: 'केवल पहली पंक्ति को प्रिंट करता है', hint: 'कोड रनटाइम तक पहुँचने से पहले ही कंपाइल नहीं होगा'},
    {text: 'कम्पाइलेशन त्रुटि', isAnswer: true},
    {text: 'रनटाइम त्रुटि', hint: 'Rust के स्वामित्व नियम कंपाइल टाइम पर लागू होते हैं'},
  ]}
>
  <slot name="question">
  <div className="question">
    जब आप इस कोड को चलाते हैं तो क्या होता है? स्वामित्व स्थानांतरण के बारे में सोचें:
    ```rust
          fn take_knowledge(knowledge: String) {
              println!("Knowledge: {}", knowledge);
          }

          fn main() {
              let wisdom = String::from("know thyself");
              take_knowledge(wisdom);
              // What happens to our wisdom?
              println!("Do you {}", wisdom);
          }
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    कोड कम्पाइल नहीं हो पाता क्योंकि `wisdom` का स्वामित्व `take_knowledge` को स्थानांतरित हो गया है और इसलिए बाद में इसका उपयोग नहीं किया जा सकता।

    इस समस्या को ठीक करने के तीन तरीके हैं:

    1. रेफ़रेंस द्वारा पास करें (मान को उधार लें):
    ```rust
          fn borrow_it(text: &String) {
              println!("Inside: {}", text);
          }
          borrow_it(&wisdom);  // Now wisdom can be used after
    ```
    2. मान को क्लोन करें (एक नई कॉपी बनाएं):
    ```rust
          take_knowledge(wisdom.clone());  // Original wisdom remains valid
    ```
    3. फ़ंक्शन से स्वामित्व वापस करें:
    ```rust
          fn take_and_return(text: String) -> String {
              println!("Inside: {}", text);
              text  // Return ownership back
          }
          let wisdom = take_and_return(wisdom);  // Reassign returned ownership
    ```
    हर तरीका अलग उपयोग मामलों के लिए है:
    - रेफ़रेंस: सबसे कुशल, लेकिन लाइफ़टाइम प्रबंधन की जरूरत होती है
    - क्लोनिंग: सरल लेकिन संभावित रूप से महंगा
    - स्वामित्व लौटाना: मानों को बदलने के लिए उपयोगी

    सर्वोत्तम अभ्यास: जब तक आपको स्वामित्व स्थानांतरण की जरूरत न हो, रेफ़रेंस का उपयोग करें।
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={2}
  group="उधारी"
  title="परिवर्तनीय संदर्भ"
  options={[
    {text: 'सफलतापूर्वक संकलित होता है', hint: 'क्या हम एक ही समय में कई परिवर्तनीय संदर्भ रख सकते हैं?'},
    {text: 'त्रुटि: `wisdom` को एक से अधिक बार परिवर्तनीय रूप में उधार नहीं ले सकते', isAnswer: true},
    {text: 'त्रुटि: लाइफ़टाइम निर्दिष्टकर्ता गायब है', hint: 'यहाँ समस्या लाइफ़टाइम्स की नहीं है'},
    {text: 'रनटाइम पैनिक', hint: 'रस्ट इन समस्याओं को संकलन समय पर पकड़ लेता है'},
  ]}
>
  <slot name="question">
  <div className="question">
    कई परिवर्तनीय संदर्भों से क्या होता है?
    ```rust
          fn main() {
              let mut wisdom = String::from("He who laughs at");
              let ref1 = &mut wisdom;  // First mutable borrow
              let ref2 = &mut wisdom;  // Second mutable borrow
              ref1.push_str(" himself never runs");
              ref2.push_str(" out of things to laugh at.");
          }
    ```
    रस्ट के परिवर्तनीय संदर्भों के नियमों के बारे में सोचें।
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    यह कोड रस्ट के मूल उधारी नियमों का उल्लंघन करता है:
    - एक समय में केवल ONE परिवर्तनीय संदर्भ
    - या किसी भी संख्या में अपरिवर्तनीय संदर्भ
    - संदर्भ अपने स्रोत से अधिक समय तक नहीं रह सकते

    कोड को ठीक करने का तरीका:

    1. क्रमिक स्कोपिंग का उपयोग करें:
    ```rust
          let mut wisdom = String::from("He who laughs at");
          {
              let ref1 = &mut wisdom;
              ref1.push_str(" himself never runs");
          }  // ref1 goes out of scope
          let ref2 = &mut wisdom;  // Now this is valid
          ref2.push_str(" out of things to laugh at.");
    ```
    2. या एक ही उधार में स्ट्रिंग को संशोधित करें:
    ```rust
          let mut wisdom = String::from("He who laughs at");
          let ref1 = &mut wisdom;
          ref1.push_str(" himself never runs out of things to laugh at.");
    ```
    ये नियम संकलन समय पर डेटा रेस को रोकते हैं, जिससे रस्ट डिफ़ॉल्ट रूप से थ्रेड‑सेफ़ बनता है।

    सामान्य गलती: कई परिवर्तनीय संदर्भों का उपयोग करके क्लोनिंग से बचने या
    एक ही मान के विभिन्न भागों को एक साथ संशोधित करने की कोशिश करना।
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={3}
  group="लाइफ़टाइम एलिशन"
  title="अप्रत्यक्ष लाइफ़टाइम्स"
  options={[
    {text: 'सफलतापूर्वक संकलित होता है', isAnswer: true},
    {text: 'त्रुटि: लाइफ़टाइम निर्दिष्टकर्ता गायब है', hint: 'लाइफ़टाइम एलिशन नियमों को याद रखें - वे मदद के लिए हैं!'},
    {text: 'त्रुटि: स्पष्ट लाइफ़टाइम आवश्यक है', hint: 'कम्पाइलर इसे स्वचालित रूप से समझ सकता है'},
    {text: 'त्रुटि: लाइफ़टाइम असंगतता', hint: 'यहाँ लाइफ़टाइम पूरी तरह मेल खाते हैं'},
  ]}
>
  <slot name="question">
  <div className="question">
    क्या यह कोड संकलित होगा? यदि हाँ, क्यों? यदि नहीं, क्या गलत है?
    ```rust
          fn first_word(s: &str) -> &str {  // No explicit lifetimes?
              match s.find(' ') {
                  Some(pos) => &s[0..pos],
                  None => s,
              }
          }

          fn main() {
              let name = String::from("Seneca the Younger");
              let first = first_word(&name);
              println!("Hello, {}", first);
          }
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    यह कोड Rust के लाइफ़टाइम एलिशन नियमों के धन्यवाद से सफलतापूर्वक संकलित होता है।
    ये नियम कंपाइलर को सामान्य पैटर्न में लाइफ़टाइम स्वचालित रूप से अनुमानित करने देते हैं।

    तीन लाइफ़टाइम एलिशन नियम हैं:
    1. प्रत्येक पैरामीटर को अपना लाइफ़टाइम पैरामीटर मिलता है
    2. यदि ठीक एक इनपुट लाइफ़टाइम पैरामीटर है, तो वह लाइफ़टाइम सभी आउटपुट लाइफ़टाइम पैरामीटरों को सौंपा जाता है
    3. यदि कई इनपुट लाइफ़टाइम पैरामीटर हैं, लेकिन उनमें से एक &self या &mut self है, तो self का लाइफ़टाइम सभी आउटपुट लाइफ़टाइम पैरामीटरों को सौंपा जाता है

    यह फ़ंक्शन इसके बराबर है:
    ```rust
          fn first_word<'a>(s: &'a str) -> &'a str {
              // ... same implementation
          }
    ```
    एलिशन जहाँ काम करता है, ऐसे सामान्य पैटर्न:
    ```rust
          // These don't need explicit lifetimes
          fn get_str(s: &str) -> &str { s }
          fn get_first(s: &str) -> &str { &s[0..1] }

          // These would need explicit lifetimes
          fn longest<'a>(x: &'a str, y: &'a str) -> &'a str {
              if x.len() > y.len() { x } else { y }
          }
    ```
    सर्वोत्तम अभ्यास: जब संभव हो तो एलिशन को आपके लिए काम करने दें, लेकिन समझें कब स्पष्ट लाइफ़टाइम की आवश्यकता होती है।
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={4}
  group="स्मार्ट पॉइंटर्स"
  title="बॉक्स स्मार्ट पॉइंटर"
  options={[
  ]}
>
  <slot name="question">
  <div className="question">
    इस पुनरावर्ती प्रकार परिभाषा में क्या गड़बड़ है?
    ```rust
          #[derive(Debug)]
          enum CatList {
              Cons(i32, CatList),  // Recursive without indirection
              Nil,
          }

          fn main() {
              let catlist = CatList::Cons(1,
                  CatList::Cons(2,
                      CatList::Cons(3,
                          CatList::Nil)));
          }
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    यह कोड फ़ेल हो जाता है क्योंकि कंपाइलर कंपाइल टाइम पर `CatList` का आकार निर्धारित नहीं कर पाता। प्रकार की पुनरावर्ती प्रकृति का मतलब है कि यह अनंत बड़ा हो सकता है!

    इसे `Box<T>` का उपयोग करके कैसे ठीक करें:
    ```rust
          #[derive(Debug)]
          enum CatList {
              Cons(i32, Box<CatList>),  // Box provides a fixed-size pointer
              Nil,
          }

          fn main() {
              let catlist = CatList::Cons(1,
                  Box::new(CatList::Cons(2,
                      Box::new(CatList::Cons(3,
                          Box::new(CatList::Nil))))));
          }
    ```
    क्यों `Box<T>` काम करता है:
    1. बॉक्स एक निश्चित आकार का पॉइंटर प्रदान करता है (आमतौर पर 64‑बिट सिस्टम पर 8 बाइट)
    2. वास्तविक डेटा हीप पर संग्रहीत होता है
    3. कंपाइलर अब ठीक‑ठीक जानता है कि कितना स्थान आवंटित करना है

    `Box<T>` के सामान्य उपयोग केस:
    - पुनरावर्ती डेटा संरचनाएँ (लिंक्ड लिस्ट, ट्री)
    - बड़े डेटा को हीप‑एलोकेटेड सुनिश्चित करना
    - ट्रेट ऑब्जेक्ट्स जब डायनामिक डिस्पैच चाहिए

    सर्वोत्तम अभ्यास: `Box<T>` का उपयोग तब करें जब आपको:
    - पुनरावर्ती प्रकार चाहिए
    - हीप एलोकेशन सुनिश्चित करनी हो
    - बड़े डेटा को कॉपी किए बिना मूव करना हो
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={5}
  group="रेफ़रेंस काउंटिंग"
  title="Rc स्मार्ट पॉइंटर"
  options={[
  ]}
>
  <slot name="question">
  <div className="question">
    यह कोड क्या प्रिंट करेगा? ध्यान से गिनें!
    ```rust
          use std::rc::Rc;

          fn main() {
              let text = Rc::new(String::from("Meditations"));  // Count: 1
              let marcus = Rc::clone(&text);    // What happens here?
              let aurelius = Rc::clone(&text);  // And here?
              println!(
                  "Reference count: {}",
                  Rc::strong_count(&text)
              );
          }
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    चलो देखें कि Rc कैसे काम करता है:

    1. `Rc::new()` से प्रारंभिक निर्माण: काउंट = 1
    2. `marcus` के लिए पहला क्लोन: काउंट = 2
    3. `aurelius` के लिए दूसरा क्लोन: काउंट = 3

    महत्वपूर्ण Rc विशेषताएँ:
    ```rust
          use std::rc::Rc;
      
          fn demonstrate_rc() {
              let original = Rc::new(String::from("Shared"));
              println!("Count after creation: {}", Rc::strong_count(&original)); // 1
          
              {
                  let copy = Rc::clone(&original);
                  println!("Count inside scope: {}", Rc::strong_count(&original)); // 2
              } // copy is dropped here
          
              println!("Count after scope: {}", Rc::strong_count(&original)); // 1
          }
    ```
    मुख्य बिंदु:
    - `Rc::clone()` सस्ता है - यह केवल काउंटर बढ़ाता है
    - `Rc` केवल सिंगल-थ्रेडेड स्थितियों के लिए है
    - जब अंतिम रेफ़रेंस ड्रॉप हो जाता है, डेटा साफ़ हो जाता है
    - रेफ़रेंस साइकिल रोकने के लिए `Weak` रेफ़रेंसेज़ का उपयोग करें

    सर्वोत्तम प्रथाएँ:
    - जब आपको साझा स्वामित्व चाहिए तो `Rc` का उपयोग करें
    - थ्रेड‑सेफ़ स्थितियों के लिए `Arc` पर विचार करें
    - रेफ़रेंस साइकिल बनाने से बचें
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={6}
  group="लाइफ़टाइम्स"
  title="स्ट्रक्ट लाइफ़टाइम्स"
  options={[
    {text: 'सफलतापूर्वक संकलित होता है', hint: 'संदर्भों वाले स्ट्रक्ट्स को लाइफ़टाइम एनोटेशन की आवश्यकता होती है'},
    {text: 'त्रुटि: लाइफ़टाइम निर्दिष्टकर्ता गायब है', isAnswer: true},
    {text: 'त्रुटि: लाइफ़टाइम असंगति', hint: 'हमने अभी तक कोई लाइफ़टाइम निर्दिष्ट नहीं किया है'},
    {text: 'त्रुटि: अमान्य संदर्भ', hint: 'संदर्भ वैध हैं, लेकिन कुछ और गायब है'},
  ]}
>
  <slot name="question">
  <div className="question">
    क्या यह स्ट्रक्ट परिभाषा संकलित होगी? क्यों या क्यों नहीं?
    ```rust
          struct Philosopher {
              name: &str,    // Reference without lifetime
              quote: &str,   // Another reference without lifetime
          }

          fn main() {
              let phil = Philosopher {
                  name: "Seneca",
                  quote: "Luck happens when preparation meets opportunity",
              };
          }
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    कोड विफल हो जाता है क्योंकि संदर्भों वाले स्ट्रक्ट्स को लाइफ़टाइम निर्दिष्ट करना पड़ता है। इसे ठीक करने का तरीका यहाँ है:
    ```rust
          // Single lifetime parameter
          struct Philosopher<'a> {
              name: &'a str,
              quote: &'a str,
          }

          // Or different lifetimes if needed
          struct PhilosopherFlex<'n, 'q> {
              name: &'n str,
              quote: &'q str,
          }
    ```
    आम पैटर्न:
    ```rust
          // Own the data instead
          struct PhilosopherOwned {
              name: String,
              quote: String,
          }

          // Mixed ownership
          struct PhilosopherMixed<'a> {
              name: String,      // Owned
              quote: &'a str,    // Borrowed
          }
    ```
    सर्वोत्तम प्रथाएँ:
    1. जब आपको डेटा अनिश्चितकाल तक संग्रहीत करना हो तो स्वामित्व वाले प्रकार (String) का उपयोग करें
    2. जब स्ट्रक्ट का लाइफ़टाइम डेटा से स्पष्ट रूप से छोटा हो तो संदर्भों का उपयोग करें
    3. जब संदर्भ विभिन्न लाइफ़टाइम रख सकते हैं तो कई लाइफ़टाइम पैरामीटर पर विचार करें
    4. जटिल संरचनाओं में लाइफ़टाइम संबंधों का दस्तावेज़ रखें
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={7}
  group="लाइफ़टाइम्स"
  title="लाइफ़टाइम एनोटेशन"
  options={[
    {text: 'परिणाम: Seneca the Younger', hint: 'कोड कंपाइल नहीं होगा जिससे कोई आउटपुट नहीं मिलेगा'},
    {text: 'त्रुटि: लाइफ़टाइम स्पेसिफायर गायब', isAnswer: true},
    {text: 'त्रुटि: स्थानीय वेरिएबल का रेफ़रेंस वापस नहीं किया जा सकता', hint: 'रेफ़रेंस इनपुट पैरामीटर का है, स्थानीय वेरिएबल का नहीं'},
    {text: 'त्रुटि: लाइफ़टाइम मिसमैच', hint: 'हमने अभी तक लाइफ़टाइम नहीं बताए हैं, इसलिए मिसमैच हुआ है'},
  ]}
>
  <slot name="question">
  <div className="question">
    यह फ़ंक्शन जो दो स्ट्रिंग स्लाइस में से लंबा लौटाता है, क्या करता है?
    ```rust
          fn longest(text1: &str, text2: &str) -> &str {
              if text1.len() > text2.len() {
                  text1    // Returning a reference, but which lifetime?
              } else {
                  text2    // Could be this reference instead
              }
          }

          fn main() {
              println!("{}", longest(
                  "Seneca the Younger",
                  "Marcus Aurelius"
              ));
          }
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    यह कोड फेल हो जाता है क्योंकि कंपाइलर इनपुट और आउटपुट लाइफ़टाइम के बीच संबंध निर्धारित नहीं कर पाता। यहाँ कारण और इसे कैसे ठीक करें:
    ```rust
          // Correct version with explicit lifetime annotation
          fn longest<'a>(text1: &'a str, text2: &'a str) -> &'a str {
              if text1.len() > text2.len() {
                  text1
              } else {
                  text2
              }
          }

          // Alternative with different lifetimes
          fn longest_flex<'a, 'b>(text1: &'a str, text2: &'b str) -> &'a str {
              if text1.len() > text2.len() {
                  text1
              } else {
                  text2.to_string().as_str() // Won't compile! Shows why we need same lifetime
              }
          }
    ```
    यहाँ लाइफ़टाइम की आवश्यकता क्यों है:
    1. कई इनपुट रेफ़रेंसेज़ के अलग-अलग लाइफ़टाइम हो सकते हैं
    2. रिटर्न वैल्यू दोनों इनपुट्स जितना समय जीवित रहना चाहिए
    3. कंपाइलर को इन संबंधों की जाँच करनी होती है

    सामान्य पैटर्न:
    ```rust
          // Single input reference - elision works
          fn first_word(s: &str) -> &str { /* ... */ }

          // Multiple references, same lifetime needed
          fn compare_str<'a>(s1: &'a str, s2: &'a str) -> &'a str { /* ... */ }

          // Different lifetimes possible
          fn combine<'a, 'b>(s1: &'a str, s2: &'b str) -> String { /* ... */ }
    ```
    सर्वोत्तम प्रैक्टिस:
    1. जब संभव हो तो लाइफ़टाइम एलिशन को काम करने दें
    2. जब संबंध स्पष्ट होने चाहिए तो स्पष्ट लाइफ़टाइम का उपयोग करें
    3. लाइफ़टाइम जटिलता से बचने के लिए ओन्डेड टाइप्स लौटाने पर विचार करें
    4. जटिल लाइफ़टाइम संबंधों को दस्तावेज़ करें
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={8}
  group="RefCells"
  title="RefCell व्यवहार"
  options={[
    {text: 'प्रिंट करता है: 42', hint: 'क्या हम एक साथ दो म्यूटेबल उधार ले सकते हैं?'},
    {text: 'रनटाइम पैनिक: RefCell पहले ही उधार लिया गया', isAnswer: true},
    {text: 'कम्पाइल त्रुटि', hint: 'RefCell जांच को रनटाइम पर ले जाता है'},
    {text: 'रनटाइम पैनिक: अलग संदेश', hint: 'त्रुटि विशेष रूप से उधार लेने का उल्लेख करती है'},
  ]}
>
  <slot name="question">
  <div className="question">
    जब यह कोड चलता है तो क्या होता है?
    ```rust
          use std::cell::RefCell;

          fn main() {
              let data = RefCell::new(42);
              let _borrow1 = data.borrow_mut();  // First mutable borrow
              let _borrow2 = data.borrow_mut();  // Second mutable borrow
              println!("Value: {}", _borrow2);
          }
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    RefCell आंतरिक परिवर्तनशीलता प्रदान करता है लेकिन फिर भी रनटाइम पर Rust के उधार नियमों को लागू करता है:
    ```rust
          use std::cell::RefCell;

          fn demonstrate_refcell() {
              let data = RefCell::new(42);
          
              // Correct way to use RefCell
              {
                  let mut first = data.borrow_mut();
                  *first += 1;
              } // first is dropped here
          
              // Now we can borrow again
              let second = data.borrow_mut();
          
              // Or multiple immutable borrows
              let read1 = data.borrow();
              let read2 = data.borrow(); // This is OK
          }
    ```
    Key concepts:
    1. RefCell जांच को रनटाइम पर ले जाता है
    2. नियम उल्लंघन होने पर पैनिक हो सकते हैं
    3. आंतरिक परिवर्तनशीलता पैटर्न के लिए उपयोगी

    Common use cases:
    - परीक्षणों में मॉक ऑब्जेक्ट्स
    - स्वयं-संदर्भित संरचनाओं को लागू करना
    - जब आपको साझा संदर्भ के पीछे डेटा को बदलना हो

    Best practices:
    1. संभव हो तो कंपाइल‑टाइम उधार को प्राथमिकता दें
    2. RefCell उधार को संकीर्ण स्कोप में रखें
    3. उधार को स्पष्ट रूप से समाप्त करने के लिए drop() का उपयोग करने पर विचार करें
    4. जब आपको आंतरिक परिवर्तनशीलता चाहिए तब RefCell का उपयोग करें
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={9}
  group="परिवर्तनीयता"
  title="Cell बनाम RefCell"
  options={[
    {text: 'प्रिंट करता है: 42, 43', isAnswer: true},
    {text: 'प्रिंट करता है: 43, 43', hint: 'Cell::get() कॉल के समय का मान लौटाता है'},
    {text: 'संकलन त्रुटि', hint: 'Cell इस विशेष उपयोग केस के लिए बनाया गया है'},
    {text: 'रनटाइम पैनिक', hint: 'Copy प्रकारों के लिए Cell ऑपरेशन हमेशा सुरक्षित होते हैं'},
  ]}
>
  <slot name="question">
  <div className="question">
    यह कोड क्या प्रिंट करेगा?
    ```rust
          use std::cell::Cell;

          fn main() {
              let life = Cell::new(42);
              let meaning = &life;        // Shared reference
              println!("{}", life.get()); // What prints here?
              meaning.set(43);            // Mutation through shared ref
              println!("{}", life.get()); // And here?
          }
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Cell और RefCell आंतरिक परिवर्तनीयता के लिए अलग-अलग उद्देश्यों को पूरा करते हैं:
    ```rust
          use std::cell::{Cell, RefCell};

          // Cell for Copy types
          struct Counter {
              count: Cell<i32>,
          }

          impl Counter {
              fn increment(&self) {
                  self.count.set(self.count.get() + 1);
              }
          }

          // RefCell for non-Copy types
          struct Logger {
              messages: RefCell<Vec<String>>,
          }

          impl Logger {
              fn log(&self, msg: &str) {
                  self.messages.borrow_mut().push(msg.to_string());
              }
          }
    ```
    मुख्य अंतर:
    1. Cell:
    - Copy प्रकारों के साथ सबसे अच्छा काम करता है
    - कोई borrowing API नहीं
    - हमेशा मानों को कॉपी या मूव करता है

    2. RefCell:
    - किसी भी प्रकार के साथ काम करता है
    - borrowing API उपलब्ध है
    - रनटाइम उधार जांच

    सर्वोत्तम प्रथाएँ:
    1. सरल Copy प्रकारों (संख्या, bool, आदि) के लिए Cell का उपयोग करें
    2. जब आपको सामग्री को उधार लेना हो तो RefCell का उपयोग करें
    3. Cell/RefCell के माध्यम से परिवर्तन को न्यूनतम रखें
    4. दस्तावेज़ करें कि आंतरिक परिवर्तनीयता क्यों आवश्यक है
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={10}
  group="रेफ़रेंस काउंटिंग"
  title="Rc को समझना"
  options={[
    {text: 'Rc का उपयोग एकल-थ्रेडेड वातावरण में किया जाता है', isAnswer: true},
    {text: 'Rc का उपयोग बहु-थ्रेडेड वातावरण में किया जाता है', hint: 'थ्रेड सुरक्षा के बारे में सोचें - Rc में कोई समन्वयन नहीं है'},
    {text: 'Rc केवल अपरिवर्तनीय डेटा के लिए उपयोग किया जाता है', hint: 'Rc को आंतरिक परिवर्तनशीलता के साथ जोड़ा जा सकता है'},
    {text: 'Rc केवल परिवर्तनशील डेटा के लिए उपयोग किया जाता है', hint: 'Rc परिवर्तनशील और अपरिवर्तनीय दोनों डेटा के साथ काम करता है'},
    {text: 'Rc रिमोट कंट्रोल के लिए है', hint: 'यद्यपि चतुर है, यह कोई प्रोग्रामिंग अवधारणा नहीं है!'},
  ]}
>
  <slot name="question">
  <div className="question">
    Rust में आपको कब Rc (रेफ़रेंस काउंटिंग) का उपयोग करना चाहिए?

    इस उदाहरण पर विचार करें:
    ```rust
          use std::rc::Rc;

          struct SharedConfig {
              name: String,
              value: i32,
          }

          fn main() {
              let config = Rc::new(SharedConfig {
                  name: "settings".to_string(),
                  value: 42,
              });
          
              let config2 = Rc::clone(&config);
              // Both config and config2 share ownership
          }
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Rc (रेफ़रेंस काउंटिंग) को एकल-थ्रेडेड परिदृश्यों के लिए डिज़ाइन किया गया है जहाँ आपको साझा स्वामित्व की आवश्यकता होती है.

    सामान्य उपयोग मामलों:
    ```rust
          use std::rc::Rc;
          use std::cell::RefCell;

          // Shared ownership in data structures
          struct Node {
              next: Option<Rc<Node>>,
              value: i32,
          }

          // Combining with interior mutability
          struct SharedState {
              data: Rc<RefCell<Vec<String>>>,
          }

          // Multiple owners of same data
          let original = Rc::new(vec![1, 2, 3]);
          let clone1 = Rc::clone(&original);
          let clone2 = Rc::clone(&original);
    ```
    मुख्य बिंदु:
    1. तब Rc का उपयोग करें जब:
    - आपके कोड के कई भागों को स्वामित्व चाहिए
    - आप जानते हैं कि साझा करना एकल-थ्रेडेड है
    - जीवनकाल स्थैतिक रूप से निर्धारित नहीं किया जा सकता

    2. तब Arc का उपयोग करें जब:
    - आपको थ्रेड-सेफ़ साझा करना चाहिए
    - कई थ्रेड्स को स्वामित्व चाहिए

    3. Rc की सीमाएँ:
    - थ्रेड-सेफ़ नहीं
    - थोड़ा रनटाइम ओवरहेड
    - रेफ़रेंस साइकिल को स्वचालित रूप से तोड़ नहीं सकता

    सर्वोत्तम प्रथाएँ:
    1. संभव हो तो अद्वितीय स्वामित्व को प्राथमिकता दें
    2. एकल-थ्रेडेड साझा स्वामित्व के लिए Rc का उपयोग करें
    3. बहु-थ्रेडेड परिदृश्यों के लिए Arc का उपयोग करें
    4. रेफ़रेंस साइकिल को रोकने के लिए Weak के साथ संयोजन करें
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={11}
  group="RefCell"
  title="RefCell औरथ्रेडिंग"
  options={[
    {text: 'RefCell का उपयोग mutable borrow के लिए किया जाता है, जबकि Rw का immutable के लिए', hint: 'दोनों प्रकार mutable और immutable borrow को सपोर्ट करते हैं'},
    {text: 'Rw का उपयोग mutable borrow के लिए किया जाता है, RefCell का immutable के लिए', hint: 'दोनों दोनों प्रकार के borrow को सपोर्ट करते हैं'},
    {text: 'RefCell और Rw एक ही उद्देश्य के लिए उपयोग होते हैं', hint: 'थ्रेड सुरक्षा के बारे में सोचें'},
    {text: 'RefCell केवल single-threaded वातावरण में उपयोग होता है', isAnswer: true},
    {text: 'Rw केवल multi-threaded वातावरण में उपयोग होता है', hint: 'हालांकि आमतौर पर थ्रेड्स के लिए उपयोग किया जाता है, यह मुख्य अंतर नहीं है'},
  ]}
>
  <slot name="question">
  <div className="question">
    Rust में RefCell और RwLock के बीच मुख्य अंतर क्या है?

    इन उदाहरणों पर विचार करें:
    ```rust
          use std::cell::RefCell;
          use std::sync::RwLock;

          // Example 1
          let data = RefCell::new(vec![1, 2, 3]);
          let borrowed = data.borrow_mut();

          // Example 2
          let shared = RwLock::new(vec![1, 2, 3]);
          let locked = shared.write().unwrap();
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    RefCell और RwLock समान उद्देश्यों को पूरा करते हैं लेकिन अलग संदर्भों में:
    ```rust
          // Single-threaded scenario with RefCell
          use std::cell::RefCell;
      
          struct SingleThreaded {
              data: RefCell<Vec<i32>>,
          }

          impl SingleThreaded {
              fn modify(&self) {
                  self.data.borrow_mut().push(42);
              }
          }

          // Multi-threaded scenario with RwLock
          use std::sync::RwLock;
      
          struct ThreadSafe {
              data: RwLock<Vec<i32>>,
          }

          impl ThreadSafe {
              fn modify(&self) {
                  self.data.write().unwrap().push(42);
              }
          }
    ```
    मुख्य अंतर:
    1. RefCell:
    - केवल single-threaded
    - कोई synchronization ओवरहेड नहीं
    - borrowing उल्लंघन पर panic करता है

    2. RwLock:
    - थ्रेड-सुरक्षित
    - synchronization ओवरहेड होता है
    - panic करने के बजाय थ्रेड्स को ब्लॉक कर सकता है

    सर्वोत्तम प्रथाएँ:
    1. single-threaded इंटीरियर म्यूटेबिलिटी के लिए RefCell का उपयोग करें
    2. जब थ्रेड सुरक्षा की जरूरत हो तो RwLock का उपयोग करें
    3. सरल थ्रेड-सुरक्षित म्यूटेबिलिटी के लिए Mutex पर विचार करें
    4. थ्रेड सुरक्षा आवश्यकताओं को स्पष्ट रूप से दस्तावेज़ करें
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={12}
  group="स्मार्ट पॉइंटर्स"
  title="Arc और Mutex"
  options={[
    {text: 'प्रिंट करता है: 42', hint: 'कोड कभी प्रिंट स्टेटमेंट तक नहीं पहुँचेगा'},
    {text: 'प्रिंट करता है: 43', hint: 'कोड प्रिंट करने से पहले फँस जाएगा'},
    {text: 'कम्पाइलेशन त्रुटि', hint: 'कोड सिंटैक्स के हिसाब से सही है'},
    {text: 'रनटाइम पैनिक', hint: 'यह पैनिक से भी बुरा है'},
    {text: 'डेडलॉक', isAnswer: true},
  ]}
>
  <slot name="question">
  <div className="question">
    जब यह कोड चलता है तो क्या होता है?
    ```rust
          use std::sync::{Arc, Mutex};

          fn main() {
              let lock = Arc::new(Mutex::new(42));
              let lock2 = Arc::clone(&lock);
          
              let _guard1 = lock.lock().unwrap();   // First lock
              let _guard2 = lock2.lock().unwrap();  // Second lock attempt
          
              println!("Value: {}", _guard2);
          }
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    यह कोड एक क्लासिक डेडलॉक परिदृश्य दिखाता है। इसे ठीक करने का तरीका यहाँ है:
    ```rust
          use std::sync::{Arc, Mutex};

          // Correct way - Release lock before acquiring it again
          fn safe_mutex() {
              let lock = Arc::new(Mutex::new(42));
          
              {
                  let mut data = lock.lock().unwrap();
                  *data += 1;
              } // Lock is released here
          
              // Now we can acquire it again
              let data2 = lock.lock().unwrap();
              println!("Value: {}", data2);
          }

          // Using multiple mutexes safely
          fn multiple_mutexes() {
              let lock1 = Arc::new(Mutex::new(42));
              let lock2 = Arc::new(Mutex::new(43));
          
              // Always acquire locks in the same order
              let guard1 = lock1.lock().unwrap();
              let guard2 = lock2.lock().unwrap();
          }
    ```
    डेडलॉक रोकने के लिए सर्वोत्तम प्रथाएँ:
    1. महत्वपूर्ण सेक्शन को छोटा रखें
    2. स्कोप का उपयोग करके लॉक तुरंत रिलीज़ करें
    3. कई लॉक को एक सुसंगत क्रम में प्राप्त करें
    4. बेहतर प्रदर्शन के लिए parking_lot::Mutex का उपयोग करें
    5. रीड-हेवी वर्कलोड के लिए RwLock उपयोग करने पर विचार करें

    सामान्य पैटर्न:
    ```rust
          // Thread-safe counter
          struct Counter {
              count: Arc<Mutex<i32>>,
          }

          impl Counter {
              fn increment(&self) {
                  let mut count = self.count.lock().unwrap();
                  *count += 1;
              } // Lock automatically released here
          }
    ```
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={13}
  group="स्मार्ट पॉइंटर्स"
  title="कमजोर संदर्भ"
  options={[
  ]}
>
  <slot name="question">
  <div className="question">
    जब आप कमजोर संदर्भों के साथ यह कोड चलाते हैं तो क्या होता है?
    ```rust
          use std::rc::{Rc, Weak};

          fn main() {
              let data = Rc::new(String::from("Wisdom"));
              let weak = Rc::downgrade(&data);  // Create weak reference
              drop(data);                       // Drop strong reference
          
              println!("Value: {:?}", weak.upgrade());
          }
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    कमजोर संदर्भ अपने लक्ष्य की डीलोकेशन को रोकते नहीं हैं। यहाँ एक विस्तृत उदाहरण है:
    ```rust
          use std::rc::{Rc, Weak};
          use std::cell::RefCell;

          // Parent-child tree structure avoiding reference cycles
          struct Node {
              next: Option<Rc<Node>>,
              parent: RefCell<Weak<Node>>,  // Weak to prevent cycles
              value: i32,
          }

          impl Node {
              fn new(value: i32) -> Rc<Node> {
                  Rc::new(Node {
                      next: None,
                      parent: RefCell::new(Weak::new()),
                      value,
                  })
              }

              fn set_parent(&self, parent: &Rc<Node>) {
                  *self.parent.borrow_mut() = Rc::downgrade(parent);
              }

              fn get_parent(&self) -> Option<Rc<Node>> {
                  self.parent.borrow().upgrade()
              }
          }
    ```
    Common use cases:
    1. Cache-like structures where entries can be cleared
    2. Tree structures with parent references
    3. Observer patterns where subjects can be dropped
    4. Breaking reference cycles in complex data structures

    Best practices:
    1. Use Weak references for optional relationships
    2. Check upgrade() results before using
    3. Document ownership relationships clearly
    4. Consider alternatives like indices for simpler cases
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={14}
  group="मेमोरी पैटर्न"
  title="RAII पैटर्न"
  options={[
    {text: 'संसाधन स्कोप के बाद मुक्त हो जाता है', isAnswer: true, hint: 'फ़ाइल फ़ील्ड की अपनी Drop इम्प्लीमेंटेशन है।'},
    {text: 'संसाधन लीक होते हैं', hint: 'रैपर की कोई कस्टम Drop नहीं है, लेकिन उसके फ़ील्ड अभी भी ड्रॉप हो जाते हैं।'},
    {text: 'कम्पाइल त्रुटि', hint: 'कोड सफलतापूर्वक कम्पाइल हो जाता है'},
    {text: 'रनटाइम त्रुटि', hint: 'समस्या संसाधन सफ़ाई से संबंधित है।'},
  ]}
>
  <slot name="question">
  <div className="question">
    इस RAII उदाहरण में फ़ाइल हैंडल के साथ क्या होता है?
    ```rust
          use std::fs::File;
      
          struct FileWrapper {
              file: File,
          }
      
          fn main() {
              let file = File::create("test.txt").unwrap();
              let wrapper = FileWrapper { file };
              // ... use wrapper ...
              // No Drop implementation
          }
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Rust में RAII सुनिश्चित करता है कि संसाधनों का सही प्रबंधन हो। इस उदाहरण में, `FileWrapper` को फ़ाइल हैंडल को बंद करने के लिए कस्टम `Drop` इम्प्लीमेंटेशन की आवश्यकता नहीं है: जब रैपर स्कोप से बाहर जाता है, तो उसका `File` फ़ील्ड स्वतः ड्रॉप हो जाता है।

    आप केवल तब `Drop` इम्प्लीमेंट करते हैं जब रैपर स्वयं अपने फ़ील्ड्स को ड्रॉप करने के अलावा अतिरिक्त सफ़ाई व्यवहार रखता हो:
    ```rust
          use std::fs::File;
          use std::io::{self, Write};

          struct FileWrapper {
              file: File,
              path: String,
          }

          impl FileWrapper {
              fn new(path: &str) -> io::Result<FileWrapper> {
                  Ok(FileWrapper {
                      file: File::create(path)?,
                      path: path.to_string(),
                  })
              }

              fn write(&mut self, content: &str) -> io::Result<()> {
                  self.file.write_all(content.as_bytes())
              }
          }

          impl Drop for FileWrapper {
              fn drop(&mut self) {
                  // Ensure file is properly closed
                  // Could also do cleanup like deletion
                  println!("Closing file: {}", self.path);
              }
          }
    ```
    RAII पैटर्न:
    1. कंस्ट्रक्टर संसाधन प्राप्त करता है
    2. मेथड्स सुरक्षित रूप से संसाधनों का उपयोग करते हैं
    3. फ़ील्ड्स स्वचालित रूप से ड्रॉप हो जाते हैं जब मालिक स्कोप से बाहर जाता है
    4. कस्टम Drop आवश्यक होने पर अतिरिक्त सफ़ाई जोड़ता है
    5. त्रुटि प्रसार के लिए `?` का उपयोग करें

    सर्वोत्तम प्रथाएँ:
    1. जब मानक लाइब्रेरी Drop इम्प्लीमेंटेशन पहले से संसाधन को मॉडल करता है, तो उस पर भरोसा करें
    2. संसाधन प्रबंधन को सरल और स्पष्ट रखें
    3. संभव हो तो मानक लाइब्रेरी प्रकारों का उपयोग करें
    4. सफ़ाई व्यवहार का दस्तावेज़ीकरण करें
    5. स्कोप्ड ऑपरेशन्स के लिए गार्ड पैटर्न पर विचार करें
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={15}
  group="डिज़ाइन पैटर्न"
  title="कॉपी बनाम क्लोन"
  options={[
    {text: 'कम्पाइल त्रुटि', hint: 'डिराइव एट्रिब्यूट सही ढंग से उपयोग किया गया है'},
    {text: 'डीप कॉपी बनाई गई', isAnswer: true},
    {text: 'शैलो कॉपी बनाई गई', hint: 'क्लोन स्ट्रिंग फ़ील्ड्स की डीप कॉपी बनाता है'},
    {text: 'मूव सेमेंटिक्स लागू हुआ', hint: 'क्लोन स्पष्ट रूप से नई कॉपी बनाता है'},
  ]}
>
  <slot name="question">
  <div className="question">
    जब हम इस Philosophy स्ट्रक्ट को क्लोन करते हैं तो क्या होता है?
    ```rust
          #[derive(Clone)]
          struct Philosophy {
              school: String,
              founder: String,
          }

          fn main() {
              let stoicism = Philosophy {
                  school: String::from("Stoicism"),
                  founder: String::from("Zeno of Citium")
              };
              let new_school = stoicism.clone();
              println!("{} - {}", 
                  stoicism.school, new_school.school);
          }
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    आइए Copy बनाम Clone को विस्तार से समझें:
    ```rust
          // Types that can be Copy
          #[derive(Copy, Clone)]
          struct Point {
              x: i32,
              y: i32,
          }

          // Types that can only be Clone
          #[derive(Clone)]
          struct ComplexData {
              name: String,    // String can't be Copy
              points: Vec<i32> // Vec can't be Copy
          }

          // Manual implementation example
          #[derive(Debug)]
          struct Custom {
              data: Vec<i32>,
              identifier: u32,
          }

          impl Clone for Custom {
              fn clone(&self) -> Self {
                  Custom {
                      data: self.data.clone(),
                      identifier: self.identifier,  // Copy type
                  }
              }
          }
    ```
    मुख्य अंतर:
    1. Copy:
    - अप्रत्यक्ष, बिटवाइज़ कॉपी
    - Copy-सुरक्षित होना चाहिए (हीप आवंटन नहीं)
    - आमतौर पर छोटे, केवल स्टैक प्रकारों के लिए

    2. Clone:
    - स्पष्ट, संभावित डीप कॉपी
    - हीप आवंटन को संभाल सकता है
    - अधिक लचीला लेकिन संभावित रूप से महंगा

    सर्वश्रेष्ठ प्रथाएँ:
    1. छोटे, केवल स्टैक प्रकारों के लिए Copy लागू करें
    2. स्वामित्व वाले संसाधनों वाले प्रकारों के लिए Clone का उपयोग करें
    3. Clone के प्रदर्शन प्रभावों को दस्तावेज़ करें
    4. अनुकूलन के लिए कस्टम Clone कार्यान्वयन पर विचार करें
    5. स्वचालित डिराइवेशन के साथ सावधान रहें
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={16}
  group="सर्वश्रेष्ठ प्रथाएँ"
  title="मेमोरी अनुकूलन"
  options={[
    {text: '16 बाइट्स', hint: 'संरेखण आवश्यकताओं पर विचार करें'},
    {text: '24 बाइट्स'},
    {text: '32 बाइट्स', isAnswer: true, hint: 'String एकल पॉइंटर से बड़ी है।'},
    {text: 'प्लेटफ़ॉर्म पर निर्भर करता है', hint: 'हमने 64-बिट सिस्टम निर्दिष्ट किया है।'},
  ]}
>
  <slot name="question">
  <div className="question">
    एक सामान्य वर्तमान 64-बिट Rust लक्ष्य पर, इस struct का आकार क्या है?
    ```rust
          struct Metadata {
              id: u32,        // How many bytes?
              name: String,   // How many bytes?
              active: bool    // How many bytes + padding?
          }
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    आइए struct मेमोरी लेआउट और अनुकूलन को तोड़ें:
    ```rust
          // Typical current 64-bit Rust layout: 32 bytes
          struct Metadata {
              id: u32,       // 4 bytes
              name: String,  // 24 bytes on 64-bit systems
              active: bool   // 1 byte + padding/alignment
          }

          // Reordering fields may reduce padding for repr(C) structs,
          // but default Rust layout is not a stable ABI guarantee.
          struct OptimizedMetadata {
              name: String,   // 24 bytes
              id: u32,       // 4 bytes
              active: bool    // 1 byte + 3 padding
          }

          // Further optimization with packing
          #[repr(packed)]
          struct PackedMetadata {
              id: u32,
              active: bool,
              name: String,
          }
    ```
    मेमोरी लेआउट विचार:
    1. संरेखण आवश्यकताएँ:
    - u32: 4-बाइट संरेखण
    - String: 8-बाइट संरेखण और सामान्य 64-बिट लक्ष्यों पर 24-बाइट आकार
    - bool: 1-बाइट संरेखण

    2. फ़ील्ड क्रम रणनीतियाँ:
    - समान आकार के फ़ील्ड को समूहित करें
    - बड़े संरेखण को पहले रखें
    - कैश लाइन अनुकूलन पर विचार करें

    सर्वश्रेष्ठ प्रथाएँ:
    1. FFI या स्थिर लेआउट धारणाओं के लिए, उपयुक्त `repr(...)` का उपयोग करें
    2. उपयुक्त पूर्णांक आकारों का उपयोग करें
    3. वैकल्पिक फ़ील्ड के लिए Option उपयोग करने पर विचार करें
    4. आकार‑संकटग्रस्त structs को `std::mem::size_of` से मापें
    5. #[repr(packed)] को सावधानी से उपयोग करें - यह प्रदर्शन को प्रभावित कर सकता है
  </div>
  </slot>
</Challenge>

<Challenge
  client:visible={{rootMargin: "150px"}}
  index={17}
  group="उन्नत पैटर्न"
  title="शून्य-लागत अभिव्यक्तियाँ"
  options={[
    {text: 'इटररेटर से रनटाइम ओवरहेड', hint: 'Rust इटररेटर शून्य-लागत अभिव्यक्तियाँ हैं'},
    {text: 'कच्चे लूप के समान प्रदर्शन', isAnswer: true},
    {text: 'धीमा लेकिन अधिक पठनीय', hint: 'अभिव्यक्ति रनटाइम प्रदर्शन को प्रभावित नहीं करती'},
    {text: 'ऑप्टिमाइज़ेशन स्तर पर निर्भर करता है', hint: 'अभिव्यक्ति संकलन समय पर हटा दी जाती है'},
  ]}
>
  <slot name="question">
  <div className="question">
    इन दो कार्यान्वयनों के प्रदर्शन की तुलना कैसे होती है?
    ```rust
          // Implementation A: Iterator
          fn sum_iterator(v: &[i32]) -> i32 {
              v.iter().fold(0, |acc, &x| acc + x)
          }

          // Implementation B: Raw loop
          fn sum_loop(v: &[i32]) -> i32 {
              let mut sum = 0;
              for i in 0..v.len() {
                  sum += v[i];
              }
              sum
          }
    ```
  </div>
  </slot>
  <slot name='explanation'>
  <div className="explanation">
    Rust की शून्य-लागत अभिव्यक्तियाँ समान कुशल कोड में संकलित होती हैं:
    ```rust
          use std::ops::Range;

          // High-level abstraction
          trait ZeroCost {
              fn process(&self) -> u32;
          }

          impl ZeroCost for Range<u32> {
              fn process(&self) -> u32 {
                  self.fold(0, |acc, x| acc + x)
              }
          }

          // Compiles to essentially the same code as:
          fn manual_process(range: Range<u32>) -> u32 {
              let mut sum = 0;
              let mut i = range.start;
              while i < range.end {
                  sum += i;
                  i += 1;
              }
              sum
          }

          // Even more abstractions, still zero-cost
          fn complex_processing<T>(data: &[T]) -> u32 
          where T: AsRef<str> {
              data.iter()
                  .map(|s| s.as_ref().len())
                  .filter(|&n| n > 3)
                  .fold(0, |acc, n| acc + n as u32)
          }
    ```
    मुख्य सिद्धांत:
    1. जो आप उपयोग नहीं करते, उसके लिए आप भुगतान नहीं करते
    2. जो आप उपयोग करते हैं, उसे आप बेहतर हाथ से नहीं लिख सकते

    सर्वश्रेष्ठ प्रथाएँ:
    1. उच्च-स्तरीय अभिव्यक्तियों का स्वतंत्र रूप से उपयोग करें
    2. कंपाइलर के अनुकूलन पर भरोसा रखें
    3. अनुकूलन से पहले प्रोफ़ाइल करें
    4. पहले पठनीयता पर ध्यान दें
    5. इटररेटर और क्लोज़र का बिना डर उपयोग करें
  </div>
  </slot>
</Challenge>

</QuizUI>

धन्यवाद, क्विज़ लेने के लिए! यदि आपको अपना Rust ज्ञान परखना पसंद आया, तो मेरे अन्य [प्रोग्रामिंग चुनौतियों](/challenges/) को देखें! 🧠  

**क्या आप अपने Rust कौशल को अगले स्तर पर ले जाना चाहते हैं?** नीचे कुछ अनुशंसित संसाधन दिए गए हैं:

- [Rust Book - Chapter 4: Ownership](https://doc.rust-lang.org/book/ch04-00-understanding-ownership.html)
- [Rust By Example - Memory Management](https://doc.rust-lang.org/rust-by-example/scope.html)
- [Rust Reference - Memory Model](https://doc.rust-lang.org/reference/memory-model.html)
````
