import type {
  PredictionResult,
  StreamablePromise,
  ChatHistoryLike,
  LLMPredictionOpts,
  ChatHistoryData,
} from "@lmstudio/sdk";
import lmStudio from "@lmstudio/sdk";

const {LMS_HOST, CHAT_API_MODEL} = process.env;

const client = new lmStudio.LMStudioClient({
  baseUrl: `ws://${LMS_HOST ?? '127.0.0.1:1234'}`,
});

const model = await loadModel(CHAT_API_MODEL ?? 'mistral-7b-instruct-v0.3'); // 'llama-3.2-1b-instruct'); // openhermes-2.5-mistral-7b'); // lmstudio-community/meta-llama-3-8b-instruct

// console.log("loaded", loaded);
// Choose first for now
// Load a model

export const getPrediction = (
  text: ChatHistoryData['messages'],
  opts?: LLMPredictionOpts,
): StreamablePromise<string, PredictionResult> => {
  // console.log("getPrediction", model.getModelInfo());
  return typeof text === "string"
    ? model.complete(text, opts)
    : model.respond(text, opts);
};

// // Stream the response
// for await (const text of prediction) {
//   process.stdout.write(text);
// }

async function loadModel(path: string = "lmstudio-community/Meta-Llama-3-8B-Instruct-GGUF"): Promise<any> {
  const loaded = await client.llm.listLoaded();

  const currentModel = loaded.filter((m) => m.path === path)?.[0];
  
  return currentModel ? getLoadedModel(model) : client.llm.load(
    path,
    {
      config: {
        keepModelInMemory: true,
        contextLength: 18000,
        evalBatchSize: 512,
        tryMmap: true,
      }
      // config: { gpuOffload: {
      //   mainGpu: 1,
      //   ratio: 0.5,
      //   tensorSplit: [1, 1, 1],
      // } },
    },
  );
}

function getLoadedModel(path: string) {
  return client.llm.get(path);
}