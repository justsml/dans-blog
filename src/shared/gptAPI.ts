import type {
  PredictionResult,
  StreamablePromise,
  ChatHistoryLike,
  LLMPredictionOpts,
} from "@lmstudio/sdk";
import lmStudio from "@lmstudio/sdk";

const {LMS_HOST} = process.env;

const client = new lmStudio.LMStudioClient({
  baseUrl: `ws://${LMS_HOST ?? '192.168.0.87:1234'}`,
});

const model = await loadModel('mistral-7b-instruct-v0.3'); // 'llama-3.2-1b-instruct'); // openhermes-2.5-mistral-7b'); // lmstudio-community/meta-llama-3-8b-instruct

// console.log("loaded", loaded);
// Choose first for now
// Load a model

export const getPrediction = (
  text: string | ChatHistoryLike,
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

function loadModel(path: string = "lmstudio-community/Meta-Llama-3-8B-Instruct-GGUF") {
  return client.llm.load(
    path,
    {
      config: {
        contextLength: 10240,
        keepModelInMemory: true,
        evalBatchSize: 512,
      },
      // @ts-expect-error
      noHup: true,
    },
  );
}

function getLoadedModel(path: string) {
  return client.llm.get(path);
}