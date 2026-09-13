# Translation Candidate
- Slug: dont-fear-the-model-router
- Locale: hi
- Model: openrouter/deepseek/deepseek-v4-flash
- Target: src/content/posts/2026-07-03--dont-fear-the-model-router/hi/index.mdx
- Validation: deferred
- Runtime seconds: 145.27
- Input tokens: 11833
- Output tokens: 18010
- Thinking tokens: unknown
- Cached input tokens: 4096
- Cache write tokens: 0
- Estimated cost: $0.002045
- Pricing source: openrouter-2026-09-13
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
title: मॉडल राउटर से न डरें
subTitle: आत्मविश्वास के साथ सर्वोत्तम मॉडल तक का मार्ग।
modified: '2026-09-04'
tags:
  - ai
  - llm
  - agents
  - mastra
  - evals
  - model-routing
  - testing
  - observability
  - production
category: AI
subCategory: AI Infrastructure
cover_full_width: ../wide.webp
cover_mobile: ../square.webp
cover_icon: ../square.webp
related:
  - llm-routing-mastra-ai
  - llm-evals-are-broken
  - mastra-workflows-memory
sourceHash: 9599850328a0
---
[अपने मॉडल से शादी न करें](../llm-routing-mastra-ai) ने आसान तर्क दिया था: हर काम एक ही मॉडल को भेजना बंद करें, सिर्फ इसलिए कि उसने पिछली बाजी जीती थी।

सस्ते काम के लिए सस्ता मॉडल इस्तेमाल करें। मुश्किल काम के लिए मजबूत मॉडल। रूटिंग लेयर को इतना लचीला रखें कि प्रदाता बदलने पर आपका कोडबेस किसी एक का मंदिर न बन जाए।

वह सही था। लेकिन अधूरा भी था।

जैसे ही आप एक राउटर जोड़ते हैं, आपके सिस्टम में एक नया व्यवहार आ जाता है जिसका परीक्षण करना ज़रूरी है। सवाल "कौन सा मॉडल सबसे अच्छा है?" नहीं रह जाता, बल्कि यह हो जाता है "क्या सिस्टम ने सही रूट चुना, सही टूल्स का इस्तेमाल किया, सही साक्ष्य रखा, और सही समय पर रुका?"

अगर आप वह नहीं मापते, तो आपका मॉडल राउटर सिर्फ अंदाज़ और एक डिस्पैच टेबल है।

<p class="inset">
राउटर जवाब नहीं है। राउटर एक पर्िकल्पना है कक आपके सिस्टम को कै से व्यवहार करना चाहिए।
</p>

मास्टरा के पास उस परिकल्पना को परीक्षण योग्य बनाने के साधन हैं: [scorers](https://mastra.ai/docs/evals/overview), [`runEvals`](https://mastra.ai/reference/evals/run-evals), [datasets](https://mastra.ai/docs/evals/datasets/overview) और [experience](https://mastra.ai/docs/evals/datasets/running-exeiments)। नाम सुनने में मूल्यांकन बुनियादी ढांचे जैसे लगते हैं, और वैसे ही हैं। असली मूल्य इससे सरल है: वे एजेंट के व्यवहार को इतना दृश्यमान बना देते हैं कक उस पर बहस की जा सके।

## हम क्या पर्क्षण कर रहे हैं?

पिछले पोस्ट के राउटर में तीन विशिष्ट रूट हैं:

| रूट | वहाँ क्या जाना चाहिए | क्या खराब रूट होगा |
|---|---|---|
| `code` | कार्यान्वयन, रीफैक्टरिंग, डिबगिंग, कोड समीक्षा | लंबे संदर्भ वाला सारांश, साधारण वर्गीकरण |
| `long-context` | गड़बड़ दस्तावेज, प्रतिलेख, नीति संश्लेषण, कई फ़ाइलें | छोटा यांत्रिक फ़ॉर्मेटिंग |
| `general` | वर्गीकरण, फ़ॉर्मेटिंग, सरल प्रश्नोत्तर, उबाऊ निष्कर्षण | कठिन कोड या साक्ष्य-भारी विश्लेषण |

वह तालिका एक शुरुआत है। यह मूल्यांकन नहीं है।

एक मूल्यांकन के लिए उदाहरण और स्कोरर चाहिए:

| टुकड़ा | काम |
|---|---|
| डेटासेट आइटम | "यह एक प्रतिनिधि अनुरोध है।" |
| ग्राउंड ट्रुथ | "यह वह रूट या व्यवहार है जिसकी हमें उम्मीद थी।" |
| स्कोरर | "यह हम तय करते हैं कि आउटपुट पास हुआ या नहीं।" |
| प्रयोग | "यह वह रन है जिसकी हम भविष्य के रनों से तुलना कर सकते हैं।" |

महत्वपूर्ण कदम व्यवहार का परीक्षण करना है, न कि सिर्फ गद्य की गुणवत्ता का।

एक मॉडल गलत विशेषज्ञ चुनने के बाद भी खूबसूरत जवाब लिख सकता है। एक सुरक्षा एजेंट साक्ष्य संरक्षित किए बिना भी प्रशंसनीय रिपोर्ट दे सकता है। एक सहायता एजेंट रिफंड नीति की जांच छोड़ते हुए भी सहानुभूतिपूर्ण लग सकता है। पैराग्राफ दिखता है। बग्स ट्रेजेक्टरी में रहते हैं।

राउटर के लिए, मैं चार आयामों से शुरू करता हूं:

| आयाम | सवाल | उदाहरण स्कोरर |
|---|---|---|
| गुणवत्ता | क्या इसने सही रूट चुना और उपयोगी परिणाम दिया? | रूट सटीकता, उत्तर पूर्णता, निष्ठा |
| लागत | क्या इसने बोरिंग काम के लिए प्रीमियम मॉडल से परहेज किया? | चयनित रूट लागत वर्ग, टोकन बजट |
| गति | क्या यह उत्पाद के लेटेंसी बजट के अंदर खत्म हुआ? | रनटाइम या टइमआउट सकरर |
| अन्य | क्या इसने सुरक्षा, गोपनीयता और अवलोकन क्षमता की बाधाओं का पालन किया? | टूल अनुमति सूची, साक्ष्य संरक्षण, अस्वीकार व्यवहार |

वह अंतिम पंक्ति मायने रखती है। "अन्य" वह जगह है जहां प्रोडक्शन के सबक रहते हैं।

वह अंतिम पंक्ति मायने रखती है। "अन्य" वह जगह है जहां प्रोडक्शन के सबक रहते हैं।

## राउटर निर्णय को स्कोर करने योग्य बनाएं

अगर राउटर केवल अंतिम उत्तर देता है, तो आप निर्णय के बारे में अंदाजा लगा रहे हैं। आप आउटपुट को स्कोर कर सकते हैं, लेकिन यह नहीं बता सकते कि रूट सही था या नहीं।

इसलिए रूटिंग स्टेप को एक छोटा संरचित कॉन्ट्रैक्ट दें:

```typescript
type RouterDecision = {
  route: "code" | "long-context" | "general";
  confidence: number;
  reason: string;
};
```

उपयों को यह JSON कभी देखने की जरूरत नहीं है। यह एक आंतररिक सटेप, वर्कफ़्लो हैंडऑफ, या ट्रेस स्पैन हो सकता है। स्कोरर को केवल इस तक पहुंच की आवश्यकता है।

यहाँ एक जानबूझकर छोटा Mastra एजेंट है जो सिर्फ एक रूट चुनने के अलावा कुछ नहीं करता:

```typescript
// src/mastra/agents/router-decision-agent.ts
import { Agent } from "@mastra/core/agent";

export const routerDecisionAgent = new Agent({
  id: "router-decision-agent",
  name: "Router Decision Agent",
  instructions: `Choose the best specialist route for the user request.

Return ONLY JSON:
{
  "route": "code" | "long-context" | "general",
  "confidence": number,
  "reason": string
}

Routing rules:
- code: implementation, refactoring, debugging, code review, APIs, tests
- long-context: large documents, transcripts, policy synthesis, many files
- general: classification, formatting, extraction, simple Q&A

Do not answer the user request. Only choose the route.`,
  model: process.env.ROUTER_MODEL ?? "openai/gpt-5-mini",
});
```

हाँ, यह थोड़ा कृत्रिम है। अच्छा है। इवैल्स उबाऊ सीमों को पुरस्कृत करते हैं।

निर्णय स्पष्ट होने पर, आप डाउनस्ट्रीम विशेषज्ञ चलने से पहले रूट का परीक्षण कर सकते हैं। राउटर की विफलताएं चयनित मॉडल, उसके प्रॉंप्ट, उसके टूल्स, या अंतिम-उत्तर स्कोरर की विफलताओं में छिपना बंद कर देती हैं।

## एक स्कोरर लिखें जो उबाऊ विफलता को पकड़े

Mastra का [`createScorer`](https://mastra.ai/reference/evals/create-scorer) सादे JavaScript फंक्शन, LLM जज प्रॉंप्ट, या दोनों स्वीकार करता है। जब भी विफलता निर्धारक हो, फंक्शन से शुरू करें। वे सस्ते, तेज़ और कम रहस्यमय होते हैं।

रूट सटीकता को जज मॉडल की आवश्यकता नहीं है। उसे JSON पार्स करने और एक फ़ील्ड की तुलना करने की आवश्यकता है।

```typescript
// src/mastra/scorers/route-accuracy.ts
import { createScorer } from "@mastra/core/evals";

type Route = "code" | "long-context" | "general";
type RouteGroundTruth = {
  route: Route;
  mustMention?: string[];
};

function textFromAgentOutput(output: Array<{ content?: unknown }>) {
  const content = output[0]?.content;
  return typeof content === "string" ? content : JSON.stringify(content ?? "");
}

function parseDecision(output: Array<{ content?: unknown }>) {
  try {
    return JSON.parse(textFromAgentOutput(output)) as {
      route?: string;
      confidence?: number;
      reason?: string;
    };
  } catch {
    return {};
  }
}

export const validRouterJsonScorer = createScorer({
  id: "valid-router-json",
  description: "Checks that the router emits a valid decision object.",
  type: "agent",
})
  .generateScore(({ run }) => {
    const decision = parseDecision(run.output);
    const validRoute = ["code", "long-context", "general"].includes(
      decision.route ?? "",
    );
    const validConfidence =
      typeof decision.confidence === "number" &&
      decision.confidence >= 0 &&
      decision.confidence <= 1;

    return validRoute && validConfidence && decision.reason ? 1 : 0;
  })
  .generateReason(({ score }) =>
    score === 1 ? "Valid router decision." : "Router output was not valid JSON.",
  );

export const routeAccuracyScorer = createScorer({
  id: "route-accuracy",
  description: "Checks whether the selected route matches ground truth.",
  type: "agent",
})
  .generateScore(({ run }) => {
    const expected = run.groundTruth as RouteGroundTruth;
    const decision = parseDecision(run.output);
    return decision.route === expected.route ? 1 : 0;
  })
  .generateReason(({ run, score }) => {
    const expected = run.groundTruth as RouteGroundTruth;
    const decision = parseDecision(run.output);

    return score === 1
      ? `Selected expected route: ${expected.route}.`
      : `Expected ${expected.route}, got ${decision.route ?? "nothing"}.`;
  });
```

वह स्कोरर ग्लैमरस नहीं है। यही बात है।

अगर राउटर एक छोटे से परीक्षण सेट पर लगातार मान्य JSON उत्पन्न नहीं कर सकता और स्पष्ट विशेषज्ञ नहीं चुन सकता, तो उसे प्रोडक्शन ट्रैफिक के लिए भरोसेमंद मानने का कोई कारण नहीं है। आपको एक दार्शनिक-मॉडल-ग्रेडिंग ऑन्टोलॉजी की आवश्यकता नहीं है। आपको एक स्मोक अलार्म चाहिए जिसमें बैटरी हो।

## पहले छोटा इवैल लूप चलाएं

[`runEvals`](https://mastra.ai/reference/evals/run-evals) तेज़ लूप है। इसे एक लक्ष्य, टेस्ट केस, स्कोरर और समवर्ती सीमा दें। यह डेटा के विरुद्ध लक्ष्य चलाता है और समग्र स्कोर लौटाता है।

```typescript
// src/mastra/evals/router.eval.ts
import { runEvals } from "@mastra/core/evals";
import { routerDecisionAgent } from "../agents/router-decision-agent";
import {
  routeAccuracyScorer,
  validRouterJsonScorer,
} from "../scorers/route-accuracy";

const routingCases = [
  {
    input: "Refactor this React component to remove duplicated state.",
    groundTruth: { route: "code" },
  },
  {
    input: "Summarize these 14 interview transcripts and find recurring objections.",
    groundTruth: { route: "long-context" },
  },
  {
    input: "Classify this ticket as billing, technical, account, or other.",
    groundTruth: { route: "general" },
  },
  {
    input: "Debug a failing Playwright test that only breaks in CI.",
    groundTruth: { route: "code" },
  },
  {
    input: "Extract the renewal date and contract value from this short paragraph.",
    groundTruth: { route: "general" },
  },
];

const result = await runEvals({
  target: routerDecisionAgent,
  data: routingCases,
  scorers: [validRouterJsonScorer, routeAccuracyScorer],
  targetOptions: {
    modelSettings: { temperature: 0 },
  },
  concurrency: 3,
});

console.log(result.scores);
console.log(result.summary.totalItems);

if (result.scores["valid-router-json"] < 1) {
  throw new Error("Router emitted invalid decision JSON.");
}

if (result.scores["route-accuracy"] < 0.9) {
  throw new Error("Router route accuracy fell below 90%.");
}
```

यह वह लूप है जो आप प्रॉम्प्ट बदलने, रूट जोड़ने, या सस्ता राउटर मॉडल आजमाने पर चलाते हैं।

यह एक परिपक्व सिस्टम के लिए पर्याप्त नहीं है। यह सबसे शर्मनाक प्रतिगमन को रोकने के लिए पर्याप्त है: "हमने राउटर प्रॉम्प्ट बदल दिया और यह प्रीमियम कोड मॉडल को वर्गीकरण कार्य भेजने लगा।"

अक्षों को अलग रखें। रूट सटीकता और अंतिम उत्तर गुणवत्ता अलग-अलग स्कोर हैं। JSON वैधता, अनुमत टूल और ट्रेसेबिलिटी को अपनी अलग जांच मिलती है। उन्हें एक 'गुणवत्ता' संख्या में न डालें। औसत वह जगह है जहां उपयोगी विफलताएं रिटायर होने जाती हैं।

## एलएलएम जज को केवल वहीं जोड़ें जहां वह अपनी उपयोगिता सिद्ध करे

कुछ रूटिंग वैध रूप से अस्पष्ट होती है:

```text
Read these logs and tell me why the deploy failed.
```

क्या यह `code` है क्योंकि यह डीबगिंग है? `long-context` क्योंकि इसमें लॉग हैं? `general` क्योंकि उपयोगकर्ता ने सारांश मांगा? सही रूट उपलब्ध टूल और आपके उत्पाद के वादे पर निर्भर करता है।

यह वह जगह है जहां एलएलएम जज मदद करता है, लेकिन केवल एक सख्त रूब्रिक के साथ। मास्ट्रा स्कोरर फंक्शन स्टेप्स और प्रॉम्प्ट-ऑब्जेक्ट स्टेप्स को मिक्स कर सकते हैं। संरचना के लिए फंक्शन का उपयोग करें, फिर उस हिस्से के लिए जज का उपयोग करें जिसे वास्तव में निर्णय की आवश्यकता है।

```typescript
// src/mastra/scorers/route-reasonableness.ts
import { createScorer } from "@mastra/core/evals";
import { z } from "zod";

export const routeReasonablenessScorer = createScorer({
  id: "route-reasonableness",
  description: "Judges whether the route explanation matches the request.",
  type: "agent",
  judge: {
    model: process.env.JUDGE_MODEL ?? "openai/gpt-5-mini",
    instructions: "You are a strict evaluator for model-routing decisions.",
  },
})
  .analyze({
    description: "Evaluate the router's decision rationale.",
    outputSchema: z.object({
      score: z.number().min(0).max(1),
      rationale: z.string(),
    }),
    createPrompt: ({ run }) => `
User request:
${JSON.stringify(run.input)}

Router output:
${JSON.stringify(run.output)}

Score from 0 to 1.

1.0 = route is clearly appropriate and the reason cites the right task signals
0.5 = route is defensible but underspecified or ambiguous
0.0 = route is wrong, unsupported, or the reason is unrelated

Return JSON with { "score": number, "rationale": string }.
`,
  })
  .generateScore(({ results }) => results.analyzeStepResult.score)
  .generateReason(({ results }) => results.analyzeStepResult.rationale);
```

यह स्कोरर पैसे खर्च करता है क्योंकि यह एक जज मॉडल को कॉल करता है। यह ठीक है जब निर्णय इसके लायक हो।

इसे यह जांचने के लिए उपयोग न करें कि JSON पार्स होता है या नहीं।

## अच्छे मामलों को डेटासेट में शामिल करें

शुरुआत में हार्ड-कोडेड eval ऐरे ठीक हैं। अंततः आपके उदाहरण उत्पाद संपत्ति बन जाते हैं: असफल ग्राहक टिकट, अजीब सहायता वार्तालाप, प्रॉम्प्ट इंजेक्शन का प्रयास, वह अनुरोध जो पिछले गुरुवार तक सही रूट हो रहा था।

वे एक डेटासेट में होने चाहिए।

मास्ट्रा डेटासेट परीक्षण मामलों के संस्करणित संग्रह हैं। हर म्यूटेशन एक नया संस्करण बनाता है, ताकि आप उस सटीक केस सेट के खिलाफ एक प्रयोग फिर से चला सकें जो आपके मॉडल निर्णय लेने के समय मौजूद था।

डेटासेट को स्थायित्व की आवश्यकता होती है, इसलिए पहले स्टोरेज कॉन्फ़िगर करें:

```typescript
// src/mastra/index.ts
import { Mastra } from "@mastra/core";
import { LibSQLStore } from "@mastra/libsql";
import { routerDecisionAgent } from "./agents/router-decision-agent";
import {
  routeAccuracyScorer,
  validRouterJsonScorer,
} from "./scorers/route-accuracy";

export const mastra = new Mastra({
  storage: new LibSQLStore({
    id: "router-evals",
    url: "file:./mastra.db",
  }),
  agents: {
    routerDecisionAgent,
  },
  scorers: {
    validRouterJson: validRouterJsonScorer,
    routeAccuracy: routeAccuracyScorer,
  },
});
```

फिर डेटासेट बनाएं और केस जोड़ें:

```typescript
// src/mastra/evals/create-router-dataset.ts
import { z } from "zod";
import { mastra } from "../index";

const dataset = await mastra.datasets.create({
  name: "router-decisions-v1",
  description: "Representative model-router decisions for CI and experiments.",
  inputSchema: z.string(),
  groundTruthSchema: z.object({
    route: z.enum(["code", "long-context", "general"]),
    source: z.string().optional(),
  }),
});

await dataset.addItems({
  items: [
    {
      input: "Refactor this React component to remove duplicated state.",
      groundTruth: { route: "code", source: "synthetic:happy-path" },
    },
    {
      input: "Summarize these 14 interview transcripts and find recurring objections.",
      groundTruth: { route: "long-context", source: "synthetic:happy-path" },
    },
    {
      input: "Classify this ticket as billing, technical, account, or other.",
      groundTruth: { route: "general", source: "synthetic:happy-path" },
    },
  ],
});
```

एक बार जब आपके पास डेटासेट हो, तो eval केस डिस्पोजेबल स्क्रिप्ट डेटा नहीं रह जाते। उनके पास आईडी, संस्करण, इतिहास और प्रयोग परिणाम होते हैं।

तब eval "प्रॉम्प्ट के लिए टेस्ट फ़ाइल" जैसा महसूस होना बंद कर देते हैं और उत्पाद स्मृति जैसा महसूस होने लगते हैं।

## राउटर पर प्रयोग चलाएं

डेटासेट तैयार होने पर, [`dataset.startExperiment()`](https://mastra.ai/reference/datasets/startExperiment) इसे एक पंजीकृत एजेंट, वर्कफ़्लो या स्कोरर के खिलाफ चलाता है।

```typescript
// src/mastra/evals/run-router-experiment.ts
import { mastra } from "../index";

const dataset = await mastra.datasets.get({ id: process.env.ROUTER_DATASET_ID! });

const summary = await dataset.startExperiment({
  name: "router-gpt-5-mini-baseline",
  description: "Baseline router decision run before adding security route.",
  targetType: "agent",
  targetId: "router-decision-agent",
  scorers: ["validRouterJson", "routeAccuracy"],
  metadata: {
    routerModel: process.env.ROUTER_MODEL ?? "openai/gpt-5-mini",
    promptVersion: "router-2026-07-03",
  },
  maxConcurrency: 5,
  itemTimeout: 30_000,
  maxRetries: 1,
});

console.log(`${summary.succeededCount}/${summary.totalItems} items succeeded`);

for (const item of summary.results) {
  const scores = Object.fromEntries(
    item.scores.map((score) => [score.scorerId, score.score]),
  );

  console.log(item.itemId, item.output, scores);
}
```

अब बातचीत बदल जाती है।

"नया राउटर बेहतर लगता है" कहने के बजाय, आप कह सकते हैं:

- पुराने राउटर ने रूट सटीकता पर `0.94` स्कोर किया।
- नए राउटर ने `0.98` स्कोर किया।
- इसने लंबे संदर्भ वाले रूटिंग में सुधार किया।
- इसने दो कोड-रिव्यू मामलों में गिरावट लाई।
- इसने प्रीमियम-मॉडल हैंडऑफ़ को 18% तक कम किया।
- इसने 300ms राउटर लेटेंसी जोड़ी।

यह एक इंजीनियरिंग चर्चा है। टेबल पर ट्रेडऑफ़ हैं, और आप तय कर सकते हैं कि यह ट्रेड करने लायक है या नहीं।

## लाइव व्यवहार को स्कोर करें, लेकिन इसे ग्राउंड ट्रुथ समझने की भूल न करें

Mastra एजेंटों और वर्कफ़्लो स्टेप्स पर सीधे स्कोरर भी अटैच कर सकता है। लाइव स्कोरर एसिंक्रोनस रूप से चलते हैं, परिणामों को आपके कॉन्फ़िगर किए गए डेटाबेस में स्टोर करते हैं, और सैंपलिंग सपोर्ट करते हैं ताकि आप हर प्रोडक्शन रिस्पॉन्स को स्कोर न करें जब तक कि आपका ऐसा इरादा न हो।

उपयोगी। लेकिन यह एक अलग काम है।

```typescript
import { Agent } from "@mastra/core/agent";
import { validRouterJsonScorer } from "../scorers/route-accuracy";

export const routerDecisionAgent = new Agent({
  id: "router-decision-agent",
  instructions: "Choose the best specialist route...",
  model: process.env.ROUTER_MODEL ?? "openai/gpt-5-mini",
  scorers: {
    validRouterJson: {
      scorer: validRouterJsonScorer,
      sampling: { type: "ratio", rate: 1 },
    },
  },
});
```

लाइव स्कोरिंग आपको बताती है कि राउटर अभी भी वैध निर्णय उत्सर्जित कर रहा है। यह खराब फ़ॉर्मेट वाले आउटपुट, विषाक्त सामग्री, निषिद्ध टूल कॉल, गायब एविडेंस मार्कर, और संदेहास्पद रूप से कम कॉन्फिडेंस को पकड़ता है।

यह आमतौर पर रूट सटीकता नहीं बता सकता, क्योंकि प्रोडक्शन ट्रैिफिक अपने साथ ग्ाउंड ट्रुथ लेकर नहीं आता।

लाइव स्कोरिंग निगरानी है। डेटासेट प्रयोग नियंत्रित परीक्षण हैं। आपको दोनों चाहिए। वे अलग-अलग सवालों के जवाब देते हैं।

## रूट सटीकता के बाद क्या मापें

रूट सटीकता पहला पायदान है। यह बताता है कि अनुरोध अपेक्षित विशेषज्ञ तक पहुंच गया। यह कुछ नहीं कहता कि क्या विशेषज्ञ ने अच्छा काम किया।

एक बार जब राउटर बुनियादी बातें पास कर ले, तो सिस्टम को परतों में स्कोर करें:

| परत | क्या स्कोर करें | क्यों मायने रखता है |
|---|---|---|
| राउटर निर्णय | चयनित रूट, कॉन्फिडेंस, कारण | गलत वर्गीकरण और खराब एस्केलेशन नियमों को पकड़ता है |
| ट्रैजेक्टरी | अपेक्षित टूल या एजेंट अनुक्रम | "सही जवाब, गलत रास्ता" व्यवहार को पकड़ता है |
| विशेषज्ञ आउटपुट | शुद्धता, विश्वसनीयता, उपयोगिता | सही रूटिंग के बाद निम्न-गुणवत्ता वाले काम को पकड़ता है |
| लािगत और विलंबता | मॉडल चयन, टोकन, रनटाइम | महंगी या धीमी जीत को पकड़ता है |
| सुरक्षा और दायरा | अनुमत उपकरण, इनकाार सीमाएँ, साक्ष्य | उत्पाद-जोखिम विफलताओं को पकड़ता है |

`runEvals` एजेंट-स्तरीय, वर्कफ़्लो-स्तरीय, स्टेप-स्तरीय और ट्रैजेक्टरी स्कोरर कॉन्फ़िगुरेशन का समर्थन करता है, ताकि आपको यह दिखावा न करना पड़े कि अंतिि उत्तर ही एकमात्र आर्टिफैक्ट है।

वर्कफ़्लो के लिए आकार कुछ इस प्रकार है:

```typescript
const result = await runEvals({
  target: supportWorkflow,
  data: supportCases,
  scorers: {
    workflow: [finalAnswerQualityScorer],
    steps: {
      "route-request": [routeAccuracyScorer],
      "check-policy": [policyGroundingScore],
    },
    trajectory: [expectedPathScorer],
  },
});
```

यह मानसििक मॉडल है जो मैं प्रोडक्शन में एजेंटों के लिए चाहता हूँ:

निर्णय को स्कोर करें। पथ को स्कोर करें। उत्तर को स्कोर करें।

यदि आप केवल उत्तर को स्कोर करते हैं, तो मॉडल संयोगवश पास कर सकता है।

## राउटर क समय के साथ और उबाऊ होन चाहिे

समय के साथ राउटर को और उबाऊ होना चाहिए

पहला राउटिंग प्रॉम्प्ट आमतौर पर निर्णय-कॉल का एक पैराग्राफ होता है। प्रोटोटाइप के लिए ठीक है।

जैसे-जैसे मूल्यांकन आपको चीज़ें सिखाते हैं, राउटर के कुछ हिस्से कम जादुई होने चाहिए:

- स्पष्ट शाब्दिक मामले नियतात्मक नियम बन जाते हैं।
- जोखिम भरे कार्यों के लिए स्पष्ट अनुमोदन या वर्कफ़्लो शाखा चाहिए।
- अस्पष्ट कार्यों को अनुमान लगाने के बजाय स्पष्टीकरण देने वाला प्रश्न पूछना चाहिए।
- महंगे रूट्स के लिए उच्च आत्मविश्वास या दूसरा सिग्नल चाहिए।
- ज्ञात विफलता मामले डेटासेट आइटम बन जाते हैं।

लक्ष्य राउटर को हमेशा के लिए "स्मार्ट" बनाना नहीं है। लक्ष्य सिस्टम को तर्क करने में आसान बनाना है।

कभी इसका मतलब बेहतर मॉडल होता है। कभी बेहतर प्रॉम्प्ट। कभी वर्कफ़्लो स्टेप, स्कोरर, हार्ड कैप, या एक उबाऊ `if` स्टेटमेंट जो आपको महीने में चार हज़ार बचाता है।

यही व्यवहार मापने का पूरा मुद्दा है। आप स्वाद के आधार पर बहस करना बंद कर देते हैं और सबूत के आधार पर बहस करना शुरू करते हैं।

## एक व्यावहारिक शुरुआती चेकलिस्ट

यदि आप आज मास्ट्रा राउटर बना रहे हैं, तो यहाँ से शुरू करें:

1. राउटिंग निर्णय को संरचित बनाएं, भले ही उपयोगकर्ता इसे कभी न देखें।
2. मान्य JSON, अपेक्षित रूट और निषिद्ध रूट के लिए नियतात्मक स्कोरर लिखें।
3. राउटर प्रॉम्प्ट या मॉडल बदलने से पहले 10 से 20 मामलों के साथ `runEvals` का उपयोग करें।
4. वास्तविक विफलताओं को एक संस्करणित डेटासेट में बढ़ावा दें।
5. सार्थक प्रॉम्प्ट, मॉडल, रूट या वर्कफ़्लो बदलावों के लिए डेटासेट प्रयोग चलाएं।
6. सस्ते प्रोडक्शन इन्वेरिएंट्स के लिए लाइव स्कोरर जोड़ें।
7. प्रयोगों की तुलना औसत स्कोर से नहीं, प्रत एक रूट करें।

औसत स्कोर विफलता क्लस्टर से कम मायने रखता है।

यदि हर रिग्रेशन लॉन्ग-कॉन्टेक्स्ट पॉलिसी सिंथेसिस में है, तो आपके पास "बदतर राउटर" नहीं है। आपके पास एक रूट बाउंड्री समस्या है। यदि हर विफल मामला एक विशिष्ट टूल का उपयोग करता है, तो आपके पास टूल कॉन्ट्रैक्ट समस्या है। यदि हर सस्ता मॉडल एक ही दो अस्पष्ट मामलों में विफल होता है, तो आपको एस्केलेशन लॉजिक चाहिए, कोई महंगा डिफ़ॉल्ट नहीं।

यहीं पर मूल्यांकन उपयोगी हो जाते हैं। वे कोई समारोह नहीं हैं, या एक डैशबोर्ड जो सभी को अस्थायी रूप से वयस्क महसूस कराता है। वे आपको दिखाते हैं कि सिस्टम का कौन सा हिस्सा विफल हो रहा है, ताकि आप पूरी चीज़ के बजाय उस हिस्से को ठीक कर सकें।

## संसाधन

- [मास्ट्रा स्कोरर अवलोकन](https://mastra.ai/docs/evals/overview)
- [मास्ट्रा `createScorer` संदर्भ](https://mastra.ai/reference/evals/create-scorer)
- [मास्ट्रा `runEvals` संदर्भ](https://mastra.ai/reference/evals/run-evals)
- [मास्ट्रा डेटासेट अवलोकन](https://mastra.ai/docs/evals/datasets/overview)
- [मास्ट्रा डेटासेट प्रयोग](https://mastra.ai/docs/evals/datasets/running-experiments)
- [अपने मॉडल से शादी न करें](../llm-routing-mastra-ai)
- [बुराइयों से लड़ें एवल्स के साथ!](../llm-evals-are-broken)
````
