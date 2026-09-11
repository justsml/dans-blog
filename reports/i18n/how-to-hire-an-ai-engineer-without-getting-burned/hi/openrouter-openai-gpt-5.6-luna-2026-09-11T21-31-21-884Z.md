# Translation Candidate
- Slug: how-to-hire-an-ai-engineer-without-getting-burned
- Locale: hi
- Model: openrouter/openai/gpt-5.6-luna
- Target: src/content/posts/2026-09-09--how-to-hire-an-ai-engineer-without-getting-burned/hi/index.mdx
- Validation: deferred
- Runtime seconds: 40.09
- Input tokens: 9132
- Output tokens: 3960
- Thinking tokens: unknown
- Cached input tokens: 4268
- Cache write tokens: 4849
- Estimated cost: $0.005810
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
title: बिना पछतावे AI इंजीनियर की भर्ती कैसे करें
subTitle: बार-बार दिखने वाले विवेक के आधार पर नियुक्ति करें
modified: '2026-09-11'
tags:
  - ai
  - hiring
  - leadership
  - engineering-management
  - evals
  - production
  - security
  - agents
category: Leadership
subCategory: Hiring
social_image: ../desktop-social.webp
cover_full_width: ../wide.webp
cover_mobile: ../square.webp
cover_icon: ../square.webp
cover_alt: >-
  तीन नारंगी भारों को सहारा देता एक छोटा स्टील पुल, जिसके नीचे मापने वाली जांच
  लगी है।
related:
  - llm-evals-are-broken
  - dont-fear-the-model-router
  - evidence-is-the-product
---
डेमो काम करता है। résumé प्रभावशाली है। इंटरव्यू से हर कोई उत्साहित होकर निकलता है।

फिर कोई पूछता है कि अगर सिस्टम एक ही रिफंड दो बार जारी कर दे तो क्या होगा।

चुप्पी एक महँगा जवाब है।

AI में भर्ती करना कठिन है क्योंकि काम का दिखाई देने वाला हिस्सा जल्दी पूरा हो जाता है। धाराप्रवाह पैराग्राफ़ में जवाब देने वाली चैट विंडो देखकर लगता है कि काम हो गया। लेकिन उससे यह पता नहीं चलता कि सिस्टम अनुमतियों का सम्मान करता है या नहीं, टाइमआउट के बाद टिकता है या नहीं, या हर टिकट पर उसकी लागत उस इंसान से ज़्यादा तो नहीं है जिसकी मदद के लिए उसे बनाया गया था।

आपको attention heads पर बहस जीतने की ज़रूरत नहीं है। आपको इतना प्रमाण चाहिए कि आप तय कर सकें कि अपनी ओर से वे फैसले किसे सौंपे जा सकते हैं।

<blockquote class="breakout">
  <p>डेमो के पीछे मौजूद निर्णय-क्षमता के आधार पर भर्ती करें। ऑफ़र देने से पहले उस निर्णय-क्षमता को दिखाई देने लायक बनाएं।</p>
</blockquote>

किसी प्रोडक्ट में AI शिप करने वाले इंजीनियर के लिए मैं यह प्रक्रिया अपनाऊँगा: अपेक्षित परिणाम लिखें, वास्तविक काम का एक हिस्सा खोलकर देखें, एक छोटे working session के लिए भुगतान करें, और जो वास्तव में देखा है उसी के आधार पर स्कोर दें। रिसर्च और इंफ्रास्ट्रक्चर भूमिकाओं के लिए अभ्यास अलग होने चाहिए। शुरुआत नौकरी से करें।

---

## résumé देखने से पहले नौकरी की भूमिका लिखें

“हमें एक AI इंजीनियर चाहिए” उतना ही उपयोगी है जितना “हमें पैसों के मामले में अच्छा कोई चाहिए।” अकाउंटेंट? CFO? या वह व्यक्ति जो संस्थापक से कहे कि अब और डोमेन खरीदना बंद करें?

तय करें कि आप किस समस्या की ज़िम्मेदारी किसी को सौंपने के लिए भर्ती कर रहे हैं।

| आपको जिस काम की ज़रूरत है | देखने लायक प्रमाण |
| --- | --- |
| रिसर्च या मॉडल डेवलपमेंट | प्रयोग, baselines, डेटा के चुनाव, और क्या काम नहीं किया इसका ईमानदार विवरण |
| AI application engineering | उपयोगी workflow, integrations, evaluation, और विफलताओं का प्रबंधन |
| AI infrastructure | deployment, capacity, monitoring, cost control, और लोड के दौरान recovery |
| Evaluation और quality | प्रतिनिधि test cases, बचाव योग्य scoring, और regressions का निदान |
| AI product engineering | user research, workflow design, adoption, और इस बात का प्रमाण कि feature से काम बेहतर हुआ |

एक व्यक्ति कई पंक्तियों का काम संभाल सकता है। पाँचों में समान गहराई की अपेक्षा करना ही वह तरीका है जिससे job description वेतन के साथ जुड़ी एक wish list बन जाती है।

इंटरव्यू शुरू करने से पहले पहले 90 दिनों का अपेक्षित परिणाम लिखें। उदाहरण के लिए:

> यह निर्धारित करना कि support-drafting assistant policy errors बढ़ाए बिना handling time कम करता है या नहीं। एक मापा हुआ pilot, human review path, और इसे expand, revise या stop करने की recommendation देना।

इससे उम्मीदवार को आपसे असहमति जताने के लिए कुछ मिलता है — और यही मकसद है। एक मजबूत उम्मीदवार पूछेगा कि handling time कैसे मापा जाता है, policy की ज़िम्मेदारी किसकी है, और क्या किसी ने जाँचा है कि मौजूदा मानव-उत्तर वास्तव में कितने अच्छे हैं। कमजोर उम्मीदवार कहेगा कि यह सुनने में exciting लगता है।

अगर आपकी टीम में कोई भी technical evidence का मूल्यांकन नहीं कर सकता, तो assessment के लिए किसी बाहरी practitioner को बुलाएँ — और पूछें कि क्या वे बाद में आपको implementation बेचने की उम्मीद रखते हैं। वरना उम्मीदवार अपना ही technical reference बन जाता है; मुद्रा बेहतर हो सकती है, पर यह फिर भी conflict of interest है।

## उनसे hood खोलने को कहें

एक प्रसिद्ध नियोक्ता आपको बताता है कि कोई व्यक्ति कहाँ काम कर चुका है। एक डेमो आपको बताता है कि किसी चीज़ ने एक बार, एक लैपटॉप पर, अच्छे मूड में काम किया। इनमें से कोई भी यह नहीं बताता कि आपकी टीम में यह व्यक्ति किस चीज़ की ज़िम्मेदारी उठा सकता है।

किसी एक ऐसे प्रोजेक्ट के बारे में पूछें, जिसे वे पूरी गहराई तक समझा सकें:

**"मुझे किसी ऐसी चीज़ के बारे में शुरू से अंत तक बताइए, जिसे आपने व्यक्तिगत रूप से शिप किया। आपकी ज़िम्मेदारी क्या थी, क्या टूटा, और evidence के आधार पर क्या बदला?"**

फिर किसी एक निर्णय को उसके पूरे arc में follow करें। पहला approach क्या था? उन्होंने क्या मापा? किस alternative को reject किया, और क्यों? किसी teammate ने क्या योगदान दिया? अब वे क्या अलग करते?

किसी artifact के लिए पूछें: किसी failed run का sanitized trace, eval report, design doc, test, या छोटा-सा code walkthrough। Trace बस उस रिकॉर्ड का नाम है कि system अपने answer तक पहुँचते समय क्या करता रहा — हर tool call, हर retry, हर चुपचाप निगली गई error। यह essay पढ़ने और वास्तविक काम देखने के बीच का फर्क है।

<p class="inset">
जो candidate किसी पूर्व employer का customer data देने से इनकार करता है, वह test पास कर रहा है, fail नहीं।
</p>

इसके बजाय reconstructed example लें, या नीचे दिया गया shared exercise इस्तेमाल करें। "Show me evidence" का मतलब कभी भी "किसी और के secrets लेकर आइए" नहीं होना चाहिए।

करियर के शुरुआती चरण में hire के लिए evidence छोटा होगा, और यह ठीक है। Expected scope और supervision को role के हिसाब से scale करें। आप understanding और ownership जाँच रहे हैं, प्रसिद्ध logos तक पहुँच नहीं।

## इंटरव्यू का समय लगाने लायक पाँच सवाल

ये investigation के prompts हैं, trivia नहीं। अगर answer याद कर लेना pass होने के लिए पर्याप्त है, तो सवाल बेकार है।

### 1. "आप कैसे पता लगाएंगे कि इस agent में सुधार हुआ है?"

Success को job की भाषा में define किए जाने की बात सुनें: सही ढंग से resolve किए गए tickets, ऐसे drafts जिन्हें agent वास्तव में भेजता है, और ऐसी escalations जिन्हें होने की ज़रूरत नहीं पड़ी। फिर पूछें कि average score किन failures को छिपा देगा, और वे नए version की तुलना किससे करेंगे।

अच्छा answer measurement को inspectable बनाता है। उनसे वहीं तीन test cases sketch करने को कहें और पूछें कि तय कौन करेगा कि प्रत्येक pass हुआ या नहीं। अगर answers को कोई model grade करता है, तो पूछें कि वे grader को कैसे check करते हैं। ["It scored 94%" कोई measurement नहीं है, अगर वही run मंगलवार को 82% score करे।](/auto-tune-your-llm-judge)

Anthropic की [guide to agent evaluations](https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents) वह distinction स्पष्ट करती है, जिसे आपके interview में होना चाहिए: agent ने क्या किया, उसका record और outcome एक ही चीज़ नहीं हैं। किसी agent का यह report करना कि "I issued the refund" एक sentence है, refund नहीं।

### 2. "Refund submit करने के बाद tool timeout हो गया। अब क्या?"

"Retry" गलत reflex है। पैसा शायद पहले ही जा चुका हो।

सुनें कि क्या वे action लेने से पहले transaction का status check करेंगे, क्या उनके पास idempotency key होगी ताकि दूसरा attempt पहले वाले पर ही land करे, और क्या state सचमुच unknown होने पर escalation path होगा। पूछें कि failure किसे दिखाई देता है और उसके बाद काम कैसे resume होता है। Vocabulary से कम फर्क पड़ता है; असली सवाल यह है कि क्या उनका design एक गलती के लिए customer से दो बार charge कर सकता है।

### 3. "यह system क्या पढ़, बदल और खर्च कर सकता है?"

सीमा स्पष्ट करने को कहें: यह कौन-से records पढ़ सकता है, कौन-सी कार्रवाइयाँ कर सकता है, कहाँ human approval ज़रूरी है, और ऐसा क्या रोकता है कि कोई loop पूरी रात आपके credit card पर खर्च न करता रहे।

फिर पूछें कि वह सीमा लागू कहाँ होती है। Model को सावधान रहने का निर्देश देने वाला prompt policy text से बनी firewall है — intent मौजूद है, enforcement नहीं। उनसे boundary का diagram बनाने और उसे पार करने की कोशिश करने वाला test प्रस्तावित करने को कहें।

इस दौरान data exposure भी शामिल करें: model provider के पास क्या जाता है, logs में क्या लिखा जाता है, और वे logs कौन पढ़ सकता है। “We log everything” एक compliance conversation का इंतज़ार करता हुआ वाक्य है।

### 4. "आप LLM के बिना कौन-सा हिस्सा बनाएँगे?"

एक सक्षम engineer अपने ही proposal के किसी हिस्से से AI हटा सकता है। Eligibility rules, arithmetic और permission checks के boring implementations होते हैं, जो कभी hallucinate नहीं करते। किसी frustrated customer का आशय समझना वैसा काम नहीं है।

पूछें कि इस खास workflow में model आपको क्या देता है और extra failure surface को सही ठहराने के लिए कौन-सा evidence चाहिए। अगर diagram का हर box एक agent मांगता है, तो छोटा diagram माँगें।

### 5. "किस approach को आपने छोड़ दिया?"

उस observation पर ध्यान दें जिसने उनका मन बदला। Users को chat नहीं, search चाहिए थी। महँगे model ने कुल handling cost घटा दी। Feature ship करने लायक नहीं था और उन्होंने यह बात साफ़ कह दी।

एक candid negative result, polished success story से बेहतर होता है, क्योंकि success story शायद ही कभी decision rule सामने लाती है। पूछें कि उन्होंने क्या करना बंद किया और बंद करने में कितना समय लगा।

## एक छोटे working session के लिए भुगतान करें

Synthetic data पर सीमित दायरे वाला, paid exercise इस्तेमाल करें। Brief और scoring criteria पहले ही भेज दें — आप judgment के लिए hiring कर रहे हैं, किसी को अचानक घेर लेने की क्षमता के लिए नहीं। लोगों को वे tools इस्तेमाल करने दें जिन्हें वे job पर इस्तेमाल करेंगे, AI समेत, और फिर उनसे जो output आया है उसे explain और verify करने को कहें।

Application engineer के लिए 90-minute session का एक उदाहरण:

> आपको एक support assistant विरासत में मिलता है जो replies का draft बनाता है और refunds प्रस्तावित करता है। यहाँ बारह synthetic tickets, एक छोटा policy document और चार recorded runs हैं। एक answer ऐसी policy का हवाला देता है जिसे हमने March में retire कर दिया था। एक refund request timeout हो जाती है। एक ticket किसी दूसरे customer की information माँगता है। सुझाव दें कि क्या हमें pilot का विस्तार करना चाहिए, और एक छोटा improvement या test दिखाएँ।

Objective स्पष्ट करने के लिए पंद्रह मिनट, गहराई से जाँचने के लिए पैंतालीस मिनट और recommendation समझाने के लिए तीस मिनट दें। उन्हें prepared environment दें, ताकि exercise छिपे तौर पर `npm install` का test न बन जाए। Access needs का ध्यान रखें और सभी candidates के लिए conditions equivalent रखें।

आप देख रहे हैं कि वे कौन-से सवाल पूछते हैं, कौन-सा evidence खोलते हैं और सबसे पहले किस risk को पकड़ते हैं। क्या वे समझते हैं कि बारह tickets reliability स्थापित नहीं कर सकते? क्या वे यह दावा किए बिना कि system अब ठीक है, एक narrow fix ship कर सकते हैं? क्या वे बता सकते हैं कि अगले हफ़्ते क्या होना चाहिए?

जो candidate duplicate refund के लिए failing test जोड़ता है, शायद उसने आपको उस candidate से ज़्यादा बता दिया हो जिसने एक खूबसूरत chat interface ship किया।

Role में सभी के लिए वही core questions और वही rating criteria इस्तेमाल करें — यही U.S. Office of Personnel Management की [structured interview guidance](https://www.opm.gov/policy-data-oversight/assessment-and-selection/structured-interviews/) के पीछे की बुनियादी संरचना है, और इसका उद्देश्य है कि आपका panel candidates की तुलना vibes के आधार पर नहीं, बल्कि एक समान ढाँचे में करे। Exercise को वास्तविक job के करीब रखें। Work sample और free consulting के बीच की रेखा अधिकांश hiring managers की सोच से पतली है, और candidates उसे कमरे के उस पार से भी देख सकते हैं।

## Hiring scorecard

इसे interview doc में कॉपी करें। हर dimension के लिए आवश्यक स्तर पर **किसी से मिलने से पहले** सहमति बना लें, क्योंकि किसी को पसंद करने के बाद bar खिसक जाता है। हर interviewer debrief से पहले स्वतंत्र रूप से score दे और हर rating के साथ एक ठोस observation जोड़े।

**1 = कोई समर्थन नहीं या बुनियादी रूप से त्रुटिपूर्ण**, **2 = पर्याप्त मार्गदर्शन के साथ कामचलाऊ**, **3 = role के दायरे में sound**, **4 = sound judgment और demonstrated verification**। जब interview में कोई evidence न मिले, तो **N/O = not observed** का उपयोग करें। N/O एक ऐसा gap है जिसे जाकर भरना है, न कि ऐसा zero जिसे average में दबा दिया जाए।

| Dimension | Evidence that earns a 3 | Score / observed evidence |
| --- | --- | --- |
| Technical judgment | अनुपातिक design चुनता है और बताता है कि दूसरे विकल्प को क्यों खारिज किया | ___ / ___ |
| Product judgment | user outcome, baseline और रुकने का कारण परिभाषित करता है | ___ / ___ |
| Evaluation | प्रतिनिधि cases प्रस्तावित करता है और केवल fluent answers नहीं, outcomes की जाँच करता है | ___ / ___ |
| Production discipline | partial failure, recovery, monitoring, cost और latency को संभालता है | ___ / ___ |
| Security | sensitive data पहचानता है और लागू किए जा सकने वाले access तथा spending limits समझाता है | ___ / ___ |
| Communication | uncertainty को साफ़-साफ़ बताता है और decision-maker को उसका परिणाम समझाता है | ___ / ___ |
| Ownership | अपने काम को team के काम से अलग करता है और failures को resolution तक follow करता है | ___ / ___ |

यह decision aid है, job performance का validated predictor नहीं। इसे अपने role के अनुसार calibrate करें और यह भी देखें कि लोगों के join करने के बाद वास्तव में क्या होता है — वरना आप ऐसे judge को tune कर रहे हैं जिसे आपने कभी score ही नहीं किया।

जो व्यक्ति अकेले production का ownership संभालेगा, उसके लिए मैं हर essential dimension में sound evidence चाहता हूँ। Strong total को permissions या recovery की अनसुलझी कमजोरी पर पर्दा नहीं डालना चाहिए; बाद में bill भेजने वाली दो चीज़ें यही होती हैं। Developing engineer के लिए लिखें कि उसे किस support की ज़रूरत होगी और वह support कौन देगा।

Debrief को इन तीन वाक्यों के साथ बंद करें: **यह व्यक्ति क्या own कर सकता है? उसे किस support की ज़रूरत होगी? हमें अभी भी किस बात पर भरोसा नहीं है?** जो panel इनका जवाब नहीं दे सकता, वह executive presence पर चालीस मिनट की बातचीत करने वाला है।

## Red flags पर एक सवाल और ज़रूर पूछें

सावधान रहें जब candidate अपने योगदान को team के योगदान से अलग नहीं कर पाता, हर पुराने project को बिना किसी रुकावट की success बताता है, या measurement से जुड़े सवालों का जवाब adjectives में देता है। “Highly accurate” के साथ denominator भी चाहिए।

दूसरे संकेत भी हैं: problem समझे जाने से पहले ही design में agents आ जाते हैं; operating cost की कोई ceiling नहीं होती; failure recovery किसी दूसरी team की जिम्मेदारी होती है; security पूरी तरह prompt में रहती है।

कुछ भी निष्कर्ष निकालने से पहले एक concrete scenario के साथ एक बार probe करें। अपरिचित term का मतलब यह नहीं कि concept ही गायब है, और बहुत-से strong engineers ने ये ideas अलग नामों से सीखे होते हैं। जब कोई व्यक्ति answer के बीच में अपनी गलती पकड़ ले, तो उसका credit दें। विरोधाभासी evidence सामने आने के बाद update करने से इनकार करना disqualifying move है — सोचने के लिए एक शांत क्षण की ज़रूरत होना नहीं।

## Hire को लेकर पहले से चिंता है? पहले काम का audit करें

किसी AI project का संघर्ष करना यह साबित नहीं करता कि आपने गलत engineer hire किया है। Brief असंभव हो सकता था, data अनुपयोगी हो सकता था, या leadership ने किसी के quality मापने से पहले ही keynote में full autonomy का वादा कर दिया हो।

Rewrite शुरू कराने से पहले code, configuration, eval results और relevant logs को उचित access controls के तहत सुरक्षित रखें। फिर तय करें कि company के वास्तविक नियंत्रण में कौन-से accounts, services और API keys हैं — यहीं teams को पता चलता है कि पूरा pipeline एक व्यक्ति के personal billing account पर चल रहा है।

कुछ representative workflows पर independent read लें। क्या काम करता है? क्या fail होता है? कौन-से claims reproduce होते हैं? जब तक uncertain behavior की जाँच चल रही हो, risky actions को restrict करें और काम को keep, repair और replace में बाँटें।

Acceptance tests, named owners और decision date के साथ एक short recovery plan माँगें। “हमें नया framework चाहिए” जाँचने योग्य proposal है, diagnosis नहीं।

## Hire को roadmap को निराश करने की अनुमति दें

अगर आपकी company उस judgment को punish करती है जिसे चुनने में उसने अभी छह हफ्ते लगाए हैं, तो इनमें से कुछ भी काम नहीं करेगा।

जो engineer कहता है, “इस step पर human approval बना रहेगा,” या “pilot अभी expansion को justify नहीं करता,” उसे ऐसे leader की ज़रूरत होती है जो यह बात दूसरों के सामने भी सुन सके। Evidence के आधार पर hire करके फिर असुविधाजनक findings को दफना दें, तो आपने उन जवाबों को पैदा करने वाली एक महँगी machine बना ली है जिन्हें आप पहले से सुनना चाहते थे।

इसलिए अगले AI role के लिए: outcome लिखें, scorecard का इस्तेमाल करें, और देखें कि candidate किसी अधूरी या खामी वाली चीज़ में कितनी गहराई तक जाता है।

आपको ऐसा व्यक्ति चाहिए जो दिखा सके कि system तैयार क्यों है — और जिस दिन वह तैयार न हो, उस दिन यह बात खुले तौर पर बता भी दे।
````
