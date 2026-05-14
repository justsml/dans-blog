import * as ai from "ai";
import { initLogger, wrapAISDK } from "braintrust";

export const BRAINTRUST_PROJECT_NAME = "danlevy.net";

const apiKey = process.env.BRAINTRUST_API_KEY;
const instrumentedAi = apiKey == null || apiKey === ""
  ? ai
  : (() => {
    initLogger({
      projectName: BRAINTRUST_PROJECT_NAME,
      apiKey,
      asyncFlush: false,
    });
    return wrapAISDK(ai);
  })();

export const generateText = instrumentedAi.generateText;
