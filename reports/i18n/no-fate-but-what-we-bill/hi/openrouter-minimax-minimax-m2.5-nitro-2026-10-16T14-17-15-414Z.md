# Translation Candidate
- Slug: no-fate-but-what-we-bill
- Locale: hi
- Model: openrouter/minimax/minimax-m2.5:nitro
- Target: src/content/posts/2026-10-14--no-fate-but-what-we-bill/hi/index.mdx
- Validation: deferred
- Runtime seconds: 89.14
- Input tokens: 10109
- Output tokens: 6148
- Thinking tokens: unknown
- Cached input tokens: 2235
- Cache write tokens: 0
- Estimated cost: $0.000000
- Pricing source: unknown
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
title: ''
subTitle: ''
category: Security
subCategory: AI Agents
tags:
  - ai-agents
  - security
  - threat-model
  - llm
  - agents
  - cloud
  - supply-chain
sourceHash: 17bcd9b90da0
---
"सुनो, और समझो। वो टर्मिनेटर वहाँ बाहर है। उससे सौदा नहीं हो सकता। उससे बात नहीं चल सकती। उसे दया, या पछतावा, या डर नहीं होता। और वो बिल्कुल नहीं रुकेगा, कभी नहीं, जब तक आप मर न जाओ।"

Kyle Reese, 1984 के दर्शकों को खतरे के स्वरूप के बारे में ब्रीफिंग देते हुए।

वह लाइन जो अच्छी तरह से प्रासंगिक रही वह मरने का आंकड़ा नहीं थी। वह "बिल्कुल नहीं रुकेगा" थी।
टर्मिनेटर कभी डरावना इसलिए नहीं था क्योंकि वह स्मार्ट था। वह डरावना इसलिए था क्योंकि वह तब भी काम करता रहता था जब बाकी सब विफल हो गया हो। endurance खतरा था।

फिर फ्रैंचाइज़ ने अपनी गलती ठीक कर ली। कोई तीन फ़िल्में एक रोबोट का डर मनाने में नहीं बिताता। Skynet असली खलनायक है: cores, factories, और time-displacement gear वाला एक distributed system। रोबोट एक API call है।

2026 में दोनों हिस्से आए, सबसे कम-सिनेमाई रूपों में। एजेंट्स जो बिना human babysitting के multi-hour tasks ले सकते हैं, एक ऐसे कर्व पर जो लगातार खड़ा होता जा रहा है। Orchestrators जो दर्जनों sub-agents में काम फैलाते हैं। और "बिल्कुल नहीं रुकेगा" अब "बिल्कुल बिलिंग नहीं रोकेगा" जैसा लगता है।

यह पोस्ट वही तर्क है जो मैं उन टीमों से बार-बार कहता हूं जिन्होंने conclude किया है कि agentic threat hype है: **कोई एक breakthrough नहीं आ रहा। दो साधारण, compounding कर्व्स एक-दूसरे से गुना हो रहे हैं — एक एजेंट कितना काम कर सकता है, और एक orchestrator कितने एजेंट्स को coordinate कर सकता है। किसी को sci-fi स्तर तक पहुंचने की ज़रूरत नहीं, क्योंकि attacker list price पर capability नहीं खरीदता। वे access चुराता है, और victim meter चुकाता है।**

## कर्व एक: endurance

[METR के time-horizon कार्य](https://metr.org/blog/2025-03-19-measuring-ai-ability-to-complete-long-tasks/) agents द्वारा पूरे किए जा सकने वाले tasks की लंबाई को दिए गए success rate पर मापता है। संक्षेप में: task length हर लगभग सात महीने में दोगुनी हो रही है — और 2024 से हर चार महीने के करीब। उन आंकड़ों में भारी error bars हैं और benchmark पहले से ही अपनी measurement limit पर दबाव में है। कर्व का shape देखें, point estimates नहीं।

Shape कहती है: multi-hour autonomous work कोई lab demo नहीं है। यह current generation है, और अगला लगातार compound करता रहता है। "बिल्कुल नहीं रुकेगा" के लिए पहले murder chassis और leather jacket चाहिए थे। अब इसके लिए retry loop, कार्यों की queue, और budget चाहिए। खतरे का endurance हिस्सा पहले से ही compute के रूप में price में शामिल है।

## कर्व दो: breadth

अकेला endurance एक बहुत धैर्यवान employee है। गुणन orchestration से आता है।

नवंबर 2025 में, Anthropic ने [GTG-1002 को disrupt करने](https://www.anthropic.com/news/disrupting-GTG-1002) का खुलासा किया, एक cyber-espionage campaign जिसमें Claude Code operational orchestrator के रूप में कार्य कर रहा था: instructions को decompose करना, sub-agents को coordinate करना, और लगभग तीस टार्गेट्स पर काम करना। एक commercial coding product ने यह इसलिए नहीं किया क्योंकि इसे किसी हथियार में compromise किया गया था, बल्कि इसलिए कि किसीने इसे वह काम करने के लिए कहा और यह अब उसे करने लायक हो गया था।

threat model के लिए दो details मायने रखती हैं। पहला, breadth ship हो गया: दर्जनों concurrent sub-agents को hold करने वाला एक orchestrator deployed reality है, कोई paper नहीं। दूसरा, campaign espionage था, कोई self-spreading worm नहीं — लेकिन दिशा स्पष्ट है। तीस टार्गेट्स pilot program है।

<figure>
  <img src="../assets/images/capability-curves.svg" alt="Two conceptual curves rising over time: task length one agent can complete, and number of sub-agents one orchestrator can coordinate, with the threat emerging where the two multiply" />
  <figcaption>Conceptual, not measured: endurance (how long one agent works) and breadth (how many agents one orchestrator runs) compound independently. The threat lives in the product of the two.</figcaption>
</figure>

Capability duration × breadth के रूप में scale होती है। एक टार्गेट के खिलाफ आठ घंटे का autonomous work एक प्रभावशाली benchmark है। तीस या सैकड़ों टार्गेट्स के खिलाफ आठ घंटा एक operating model है। सुरक्षा समीक्षा linearly scale होती है। उन curves के product के बराबर नहीं।

## कौन चुकाता है

[Sysdig ने "LLMjacking"](https://sysdig.com/blog/llm-jacking/) गढ़ा जो आगे होता है: attackers victim's account के अंदर LLM workloads चलाने के लिए stolen cloud credentials का उपयोग करते हैं, और victim हर token के लिए भुगतान करता है। Sysdig के worst-case estimates लगभग $46k प्रति दिन थे — बाद में $100k प्रति दिन से ऊपर चढ़ते हुए।

AI उद्योग में हर capability gate एक assumption पर बना है: capability का उपयोग करने वाला party वही है जो उसके लिए भुगतान करती है। Price tiers, usage caps, approved-user lists, abuse throttling — यह सब *customer* के खिलाफ defense करता है जो पैसे के लिए value चाहता है। LLMjacking उस link को तोड़ देता है। attacker के लिए capability मुफ्त है। meter किसी और के card पर चल रहा है, और provider के अपने guardrails गलत wallet की ओर इशारा कर रहे हैं।

यही वजह है कि price और access gates किसी एक बुरे actor को stolen key के साथ नहीं रोक पाते। Gates खरीदारों को फ़िल्टर करते हैं। उनके पास tenant के लिए कोई जवाब नहीं है।

<figure>
  <img src=".././who-pays.svg" alt="Flow diagram: an attacker with stolen cloud credentials runs model workloads inside the victim's cloud account, so the invoice routes to the victim while the attacker pays nothing" />
  <figcaption>Stolen access charge को रीरूट कर देता है। Capability gates buyer को चार्ज करते हैं — और LLMjacking में, buyer वही है जो victim है।</figcaption>
</figure>

## Swarm को बस एक बार सही निकलना है

Defenders खुद को per-attempt failure rates से तसल्ली देते हैं: अधिकांश intrusion attempts विफल होती हैं, अधिकांश संदिग्ध PRs अस्वीकृत हो जाती हैं, हम उस एक को पकड़ लेंगे जो काम करेगी। Per attempt सही है। Aggregate में गलत, क्योंकि attempts सस्ती हैं।

यह कि n independent attempts में से कम से कम एक सफल हो, इसकी probability है `1 − (1 − p)^n`:

```text
p = 1% per attempt, n = 100:   1 − 0.99^100  ≈ 63%
p = 0.5%, n = 100:             ≈ 39%
p = 0.5%, n = 300:             ≈ 78%
p = 0.1%, n = 1000:            ≈ 63%
```

Swarm economics पर per-attempt cost लगभग शून्य है — automated work, stolen compute पर execute, किसी human द्वारा triage नहीं। Defender का per-attempt cost एक person है जो queue पढ़ रहा है। Swarm को per attempt capability की ज़रूरत नहीं; उसे attempts चाहिए। METR का curve समय के साथ p बढ़ाता है। Orchestration n बढ़ाता है। यह फिर से वही गुणन है, और यह default रूप से attacker के पक्ष में compound होता है।

<figure>
  <img src=".././swarm-odds.svg" alt="Chart of 1 − (1 − p)^n showing that many cheap low-probability attempts sum to high overall success odds, with a few labeled p-and-n combinations" />
  <figcaption>1 − (1 − p)^n: अलग-अलग असंभावित attempts बल्क में असंभावित नहीं रहते। या तो p (agent capability) या n (swarm breadth) बढ़ाने से swarm certainty की ओर बढ़ती है।</figcaption>
</figure>

## जब malware text हो तो persistence का क्या मतलब है

Threat model का एक और टुकड़ा, और यह सबसे कम intuitive है।

एक AI agent एक stateless interpreter है। यह उस तरह persist नहीं करता जैसे malware करता है — यह तब तक मौजूद रहता है जब तक यह चल रहा है और जब रुकता है तब गायब हो जाता है। तो persistence का मतलब अब कुछ और है: **भविष्य के legitimate agent को क्या पढ़ना और मानना है, यह नियंत्रित करना।** Instruction files, agent guidelines, memory stores, retrieval corpora, tool और MCP configs। Implant text है, वहां plant किया गया जहां org का अपना fleet पढ़ता है, org की ही जारी किए गए credentials के साथ execute होता है।

तीन परिणाम follow होते हैं, कोई भी hypothetical नहीं:

- **Payload तब तक inert है जब तक org के own agents उसे run नहीं करते।** Execution normal work जैसा दिखता है — same tools, same identities, same APIs। कोई beacon नहीं है, क्योंकि org का own scheduler ही heartbeat है।
- **Replication का मतलब है text copied होना, code executed होना नहीं।** Pull requests, memory entries, shared configs। Org का own automation — dependency bots, templates, sync tooling — वही transport layer है।
- **Tripwires org की अपनी tripwires हैं।** Schedules, drift detectors, auto-remediation। सबसे nasty shape: defender का cleanup ही re-activation trigger है, क्योंकि implant के artifacts को delete करना exactly वह drift है जिसे remediate करने के लिए remediation job hire की गई थी।

मैं जानबूझकर threat-model altitude पर रह रहा हूं — यह problem का shape है, recipe नहीं, और details पहले से ही हर security team की reading list पर हैं।

## कोई fate नहीं जो हम न बनाएं

Sarah Connor's message, machines को पास किया गया जो आते रहते हैं: "The future's not set. There's no fate but what we make." यह defenders का line है, और यह सीधे defense architecture में convert होता है। चार layers:

<figure>
  <img src=".././defense-layers.svg" alt="Four-layer defense stack: identity and short-lived credentials, treat agent text as production code, detect edits rather than executions, and respond by revoking triggers before payloads" />
  <figcaption>Defense stack threat से मैप किया गया: standing credentials, unreviewed text, execution-shaped alerting, और cleanup-ordered wrong — प्रत्येक एक curve का trouble है।</figcaption>
</figure>

1. **Identity — standing access को भूखा रखो।** केवल short-lived credentials, कोई long-lived non-human keys नहीं, exact subject matching के साथ per-repo OIDC, और non-human identities की real inventory। Replication highways standing access से पिची होती हैं; कोई standing access नहीं, कोई highway नहीं।

2. **Agent text को production code की तरह treat करो।** Instruction files, memory writes, prompt templates, tool configs: versioned, reviewed, diffed, और change-alerted। Review question यह नहीं है कि "क्या यह code सुरक्षित है" — यह है "इस sentence को किसने लिखा, और मेरा agent इसका पालन क्यों करता है।"

3. **Edits detect करो, executions नहीं।** Execution काम की तरह दिखता है। Edits किसी work order में फिट नहीं बैठते। Workflows, webhooks, event rules, और memory entries के creation और modification पर alert करो, और declared vs. running drift को incident मानो, noise नहीं।

4. **सही क्रम में respond करो।** Payloads हटाने से पहले triggers revoke करो — cleanup खुद एक tripwire है। Compromise window के दौरान पढ़े गए किसी भी config या secret को tainted मानो। Space के साथ-साथ time को भी purge करो: scheduled jobs, queued sends, dormant orchestrations। Credentials ही नहीं, memory और corpora को भी roll back करो।

इसमें से कुछ भी exotic नहीं है। यह boring है, और यही वजह है कि यह threat — दो boring curves के रूप में आ रहा है — इसके मुताबिक है। 1984 का version time machine और हत्या-मशीनों की फैक्ट्री चाहता था। 2026 का version चाहता है एक चोरी की key, एक retry loop, और एक organization जिसने कभी उन files review नहीं की जो उसके agents पढ़ते हैं।

भविष्य तय नहीं है। लेकिन अभी, किसी के cloud account पर, भविष्य किसी भी तरह से tab बढ़ा रहा है।

No fate but what we make — और, जब तक keys rotate नहीं होतीं, no fate but what we bill.

---

*Sources: METR के time-horizon measurements (अपने published error bars और limits के साथ), Anthropic का November 2025 GTG-1002 disclosure, और Sysdig के LLMjacking cost estimates। यहां कुछ भी working exploit नहीं है; defense layers ही पूरी बात हैं।*
````
