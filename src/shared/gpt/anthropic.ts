import Anthropic from "@anthropic-ai/sdk";
import { APIPromise, RequestOptions } from "@anthropic-ai/sdk/core.mjs";
import { MessageParam, RawMessageStreamEvent } from "@anthropic-ai/sdk/resources/messages.mjs";
import { ChatHistory, ChatHistoryLike, ChatMessageData } from "@lmstudio/sdk";
import { makeLogs } from "../../components/LogHelper.ts";
import { Stream } from "@anthropic-ai/sdk/streaming.mjs";
const log = makeLogs("anthropic");


export const anthropicApi: AnthropicApi = {
  _client: undefined,

  getPrediction: async (
    messages: Array<ChatMessageData>,
    opts?: RequestOptions,
  ) => {
    if (!anthropicApi._client) {
      log("Initializing Anthropic client");
      anthropicApi._client = new Anthropic({ timeout: 30_000, maxRetries: 1 });

    }
    return await anthropicApi._client.messages.create(
      {
        max_tokens: 8192,
        messages: convertFromSystemRoles(messages),
        model: "claude-3-5-sonnet-20241022",
        stream: true,
        temperature: 0.1,
      },
      opts,
    );
  },
};


export const convertFromSystemRoles = (messParams: ChatMessageData[]):  MessageParam[] => {
  return messParams.map((mess) => {
    if (mess.role === "system") {
      return {
        ...mess,
        role: "user",
      } as MessageParam;
    }
    return mess as MessageParam;
  });
}


// for await (const messageStreamEvent of stream) {
//   console.log(messageStreamEvent.type);
// }

type AnthropicApi = {
  _client: Anthropic | undefined;
  getPrediction: (
    messages: Array<ChatMessageData>,
    opts?: RequestOptions,
  ) => Promise<Stream<RawMessageStreamEvent>>;
};
