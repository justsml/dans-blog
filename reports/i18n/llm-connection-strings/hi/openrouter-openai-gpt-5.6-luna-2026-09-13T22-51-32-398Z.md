# Translation Candidate
- Slug: llm-connection-strings
- Locale: hi
- Model: openrouter/openai/gpt-5.6-luna
- Target: src/content/posts/2026-01-30--llm-connection-strings/hi/index.mdx
- Validation: deferred
- Runtime seconds: 13.02
- Input tokens: 3655
- Output tokens: 1542
- Thinking tokens: unknown
- Cached input tokens: 1061
- Cache write tokens: 2588
- Estimated cost: $0.002390
- Pricing source: openrouter-2026-09-13
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
title: 'अब llm:// कनेक्शन स्ट्रिंग्स का समय है'
subTitle: '`llm://` URLs के साथ मॉडल और प्रोवाइडर कॉन्फ़िगरेशन को सरल बनाएं'
modified: '2026-06-30'
tags:
  - ai
  - llm
  - api
  - developer-experience
  - standards
category: AI
social_image: ../desktop-social.webp
cover_full_width: ../hero-wide.webp
cover_mobile: ../square-200.webp
cover_icon: ../square-200.webp
sourceHash: 88892a247d5c
---
<blockquote class="inset">
**अपडेट:** इस लेख से [`llm://` URI स्कीम पर एक Internet-Draft](https://datatracker.ietf.org/doc/draft-levy-llm-uri-scheme/) और सहायक [`llm-strings` npm पैकेज](https://www.npmjs.com/package/llm-strings) तैयार हुए। इसका implementation [GitHub पर भी उपलब्ध है](https://github.com/justsml/llm-strings)।
</blockquote>

क्या आपको वे पुराने बुरे दिन याद हैं, जब किसी database से कनेक्ट होने का मतलब था environment variables के एक बेतरतीब ढेर को संभालना?

वह नाज़ुक configuration का एक मीनार था। `DB_HOST`, `DB_PORT`, `DB_USER`, `DB_PASSWORD`, `DB_NAME`... या रुकिए, क्या वह `DB_USERNAME` था? `DB_PASS` या `DB_PWD`? इस बार `PG_*` prefixes चाहिए क्या? और timeout setting आखिर जाती कहाँ है?

यह ताश के पत्तों का एक नाज़ुक घर था, जो सिर्फ इसलिए आपका production build गिराने के लिए तैयार रहता था क्योंकि आपने `HOST` को uppercase लिखना भूल गए।

फिर किसी ने शानदार विचार दिया: बस एक URL इस्तेमाल करो¹:

```bash
postgres://user:pass@host:5432/dbname
```

एक string। आपकी ज़रूरत की हर चीज़। हर जगह parse की जा सकने वाली। Portable। क्या मैं कहूँ... खूबसूरत?

तो फिर हम LLMs के साथ ऐसा बर्ताव क्यों कर रहे हैं जैसे अभी 1999 चल रहा हो?

## Env Var का विस्फोट

अभी मेरी `.env` फ़ाइल छोड़ी हुई API keys के कब्रिस्तान जैसी दिखती है। `OPENAI_API_KEY`, `ANTHROPIC_API_KEY`, `MISTRAL_API_KEY`, `GROQ_API_KEY`। और Azure की बात तो मत ही कीजिए—सिर्फ़ "hello" कहने के लिए आपको एक endpoint, deployment name, API version और key चाहिए।

यह सिर्फ़ बदसूरत नहीं है; यह friction है। जब भी मैं model बदलना या किसी नए provider को आज़माना चाहता हूँ, मुझे initialization code फिर से लिखना पड़ता है, provider-विशिष्ट parameter names के documentation ढूँढने पड़ते हैं और environment config में तीन और lines जोड़नी पड़ती हैं।

अगर हम बस... ~~चुरा~~ DB URL वाला विचार उधार ले लें तो?

## LLM Connection Strings का परिचय

कल्पना कीजिए कि आपका पूरा model interface एक ही line से configure हो जाए:

```bash
llm://api.openai.com/gpt-5.2?reasoning_effort=none&temp=0.7&max_tokens=1500
llm://api.z.ai/glm-4.7?top_p=0.9&cache=true
```

---

<br />

### LLM Connection String की संरचना

![LLM connection string के हिस्से](../inline-url-diagram-dark.svg)

Scheme `llm://` है। Host provider का API base URL है। Path model name है। और query parameters वे सभी runtime options संभालते हैं, जो आम तौर पर आपके code को अव्यवस्थित कर देते हैं।

## प्रमाणीकरण चाहिए? बढ़िया, इसे जोड़ दें।

`postgres://` की तरह, हम प्रमाणीकरण को सीधे इसमें शामिल कर सकते हैं:

```bash
llm://app-name:sk-proj-123456@api.openai.com/gpt-5.2?reasoning_effort=none&temp=0.7
```

*नोट: हाँ, अगर आप इन्हें सार्वजनिक लॉग में पेस्ट कर रहे हैं, तो URL में credentials डालना सुरक्षा जोखिम हो सकता है। लेकिन आधुनिक logging services इन patterns को scrub करने में काफ़ी अच्छी हैं। और सच कहें तो, क्या आप अपनी `.env` फ़ाइल के साथ इससे बेहतर व्यवहार कर रहे हैं? जाँचें, sanitize करें और सावधानी से इस्तेमाल करें।*

## Resiliency? बिल्कुल, क्यों नहीं।

कई database libraries कई hosts निर्दिष्ट करके round-robin failover support करती हैं। हमारे AI agents को भी वही reliability क्यों नहीं मिलनी चाहिए?

```bash
llms://primary.gpt,backup.gpt/gpt-6?temp=0.9
```

`llms://` में मौजूद `s` कोई typo नहीं है। यह plural है। अगर `primary.gpt` अटक जाता है, तो client अपने-आप `backup.gpt` पर retry करता है। किसी complex router logic की ज़रूरत नहीं।

<blockquote class="inset">आपके **auth** से लेकर **endpoint** और **hyperparameters** तक—सब कुछ एक ही string में।</blockquote>

## वैकल्पिक formats

मैं `llm://` से शादी नहीं कर रहा। असल standard की तुलना में specific scheme कम मायने रखती है।

मैं ऐसी दुनिया की कल्पना कर सकता हूँ जहाँ brevity के लिए provider-specific schemes इस्तेमाल हों, लेकिन standard structure बरकरार रहे:

```bash
ollama://localhost:11434/llama3
vercel://anthropic/sonnet-4.5?temp=0.8&web_search={"maxUses":3}
bedrock://us-west-2.aws/anthropic/sonnet-4.5?temp=0.8&cacheControl=ephemeral
```

Exact syntax चाहे जो हो, core benefits से इनकार नहीं किया जा सकता:

1.  **Portability:** अपनी पूरी config को local script से cloud worker तक copy-paste करें।
2.  **CLI Friendly:** अपनी scripts को एक ही argument पास करें। `my-agent --model "llm://..."` के सामने `my-agent --model gpt-4 --temp 0.7 --key $KEY --host ...` काफ़ी पुराना तरीका लगता है।
3.  **Language Agnostic:** हर programming language में एक robust URL parser होता है। Validation, parsing और sanitization हमें मुफ्त में मिल जाते हैं।

<blockquote class="ai-response inset">Database की दुनिया को यह समझने में दशकों लग गए।<br /><b>अच्छी खबर यह है कि AI timelines में यह बस लगभग आधा vibe-year पहले की बात है।</b></blockquote>

## निष्कर्ष

हमें किसी और complex configuration standard या नई YAML-based manifest file की ज़रूरत नहीं है। हमें बस उस tool का इस्तेमाल करना है, जो पिछले 30 सालों से बाकी internet के लिए काम कर रहा है।

पहिए को फिर से ईजाद करना बंद करें और अपने LLM connections को वही सम्मान देना शुरू करें, जो हम अपने databases को देते हैं। आपकी `.env` फ़ाइल—और आपकी sanity—आपको धन्यवाद देंगी।

![एक बिखरा हुआ env var drawer](../hero-concept-8-drawers.webp)

{/* ¹ हाँ, मुझे पता है कि `URI`, `URL` से ज़्यादा सही शब्द है। अगर आप इतने pedantic हैं कि इस distinction की सच में परवाह करते हैं, तो बाहर जाकर थोड़ी घास छू आइए। */}
````
