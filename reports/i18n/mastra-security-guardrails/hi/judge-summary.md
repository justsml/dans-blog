# Translation Judge Summary

- Slug: mastra-security-guardrails
- Locale: hi
- Judge model: openrouter/google/gemini-3-flash-preview
- Second judge model: not run
- Escalation judge model: not run
- Max candidate commits per judge call: 3
- Fix pass limit: 2
- Selected commit hint: judge selected
- Validation: passed
- Validation scope: local
- Confidence: high (0.872)
- Confidence signals: no high/medium issues; single judge
- High/medium/low issue counts: 0/0/0

## Primary Judge Telemetry
- Runtime seconds: 9.26
- Input tokens: 6568
- Output tokens: 1352
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.007340
- Estimated cost: $0.007340

## Pre-Publish Rescore Telemetry
### Pass 1
- Runtime seconds: 2.36
- Input tokens: 10269
- Output tokens: 264
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.005927
- Estimated cost: $0.005927

## Judge Suggestions
1. Pass 1: applied high priority suggestion. Match: "Models trained on internet data have seen some things. Without filtering, they can occasionally produce responses that would make your PR team nervous. The [`ModerationProcessor..." Replacement: "इंटरनेट डेटा पर प्रशिक्षित मॉडलों ने बहुत कुछ देखा है। बिना फ़िल्टरिंग के, वे कभी-कभी ऐसी प्रतिक्रियाएँ दे सकते हैं जो आपकी PR टीम को परेशान कर सकती हैं। [`ModerationProcessor`]..." Reason: This entire section was left in English. Note: Applied exact replacement to selected MDX.
2. Pass 1: applied high priority suggestion. Match: "The interesting part is that you define which categories matter for your use case. A creative writing tool might allow more expressive content than a customer service bot. The t..." Replacement: "दिलचस्प बात यह है कि आप परिभाषित करते हैं कि आपके उपयोग के मामले (use case) के लिए कौन सी श्रेणियां मायने रखती हैं। एक रचनात्मक लेखन उपकरण ग्राहक सेवा बॉट की तुलना में अधिक अभिव..." Reason: This paragraph was left in English. Note: Applied exact replacement to selected MDX.
3. Pass 1: applied high priority suggestion. Match: "When a processor uses the `block` strategy, Mastra aborts generation and exposes the event as tripwire metadata. With `generate()`, check the result object:" Replacement: "जब कोई प्रोसेसर `block` रणनीति का उपयोग करता है, तो Mastra जनरेशन को रोक देता है और इवेंट को ट्रिपवायर मेटाडेटा के रूप में उजागर करता है। `generate()` के साथ, परिणाम ऑब्जेक्ट की..." Reason: This paragraph was left in English. Note: Applied exact replacement to selected MDX.
4. Pass 1: applied high priority suggestion. Match: "For streaming calls, listen for `tripwire` chunks on `fullStream`. This pattern lets you handle security events however makes sense for your application. You might log them for ..." Replacement: "स्ट्रीमिंग कॉल के लिए, `fullStream` पर `tripwire` चंक्स को सुनें। यह पैटर्न आपको सुरक्षा घटनाओं को उस तरह से संभालने देता है जो आपके एप्लिकेशन के लिए सही हो। आप उन्हें विश्लेषण ..." Reason: This paragraph was left in English. Note: Applied exact replacement to selected MDX.
5. Pass 1: applied high priority suggestion. Match: "Processors catch a lot, but they're not magic. A determined attacker with enough time can probably find a prompt that slips through. Models occasionally hallucinate in ways that..." Replacement: "प्रोसेसर बहुत कुछ पकड़ते हैं, लेकिन वे जादू नहीं हैं। पर्याप्त समय वाला एक दृढ़ हमलावर शायद ऐसा प्रॉम्प्ट ढूंढ सकता है जो बच निकले। मॉडल कभी-कभी ऐसे तरीकों से मतिभ्रम (hallucina..." Reason: This paragraph was left in English. Note: Applied exact replacement to selected MDX.
6. Pass 1: applied high priority suggestion. Match: "The value isn't perfect protection. It's having a systematic way to handle the common issues that will definitely come up in production. You can tune the sensitivity as you lear..." Replacement: "इसका मूल्य पूर्ण सुरक्षा नहीं है। यह उन सामान्य समस्याओं को संभालने का एक व्यवस्थित तरीका है जो निश्चित रूप से प्रोडक्शन में आएंगी। जैसे-जैसे आप सीखते हैं कि आपके उपयोगकर्ता वास..." Reason: This paragraph was left in English. Note: Applied exact replacement to selected MDX.
7. Pass 1: applied high priority suggestion. Match: "Most security problems in production AI aren't sophisticated attacks. They're people copying and pasting data they shouldn't, or discovering through trial and error that the bot..." Replacement: "प्रोडक्शन AI में अधिकांश सुरक्षा समस्याएं परिष्कृत हमले नहीं हैं। वे लोग हैं जो डेटा कॉपी और पेस्ट कर रहे हैं जो उन्हें नहीं करना चाहिए, या परीक्षण और त्रुटि के माध्यम से खोज रह..." Reason: This paragraph was left in English. Note: Applied exact replacement to selected MDX.

## Candidates
- current src/content/posts/2026-01-03--mastra-security-guardrails/hi/index.mdx
- 6fb193478654892168da1982bf4b01a1e5835f7c i18n candidate(hi): mastra-security-guardrails via openrouter/deepseek/deepseek-v4-flash
