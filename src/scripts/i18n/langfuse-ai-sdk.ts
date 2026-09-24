import { LangfuseVercelAiSdkIntegration } from "@langfuse/vercel-ai-sdk";
import { trace } from "@opentelemetry/api";
import type {
  LanguageModelCallEndEvent,
  LanguageModelCallStartEvent,
} from "ai";
import { sdkAccounting } from "./cost-accounting.ts";
/** Enrich the integration's existing generation, never create a second billed span. */
export class CostAwareLangfuseIntegration extends LangfuseVercelAiSdkIntegration {
  override onLanguageModelCallStart(event: LanguageModelCallStartEvent) {
    super.onLanguageModelCallStart(event);
    super.executeLanguageModelCall({
      callId: event.callId,
      execute: () => {
        trace
          .getActiveSpan()
          ?.setAttributes({
            "langfuse.observation.metadata.costKnown": false,
            "langfuse.observation.metadata.costBasis":
              "unknown-until-provider-response",
          });
        return Promise.resolve();
      },
    });
  }
  override onLanguageModelCallEnd(event: LanguageModelCallEndEvent) {
    const accounting = sdkAccounting(event);
    // The official integration owns this call's context, including streaming calls.
    super.executeLanguageModelCall({
      callId: event.callId,
      execute: () => {
        const span = trace.getActiveSpan();
        span?.setAttribute(
          "langfuse.observation.usage_details",
          JSON.stringify(accounting.usageDetails),
        );
        if (accounting.costDetails)
          span?.setAttribute(
            "langfuse.observation.cost_details",
            JSON.stringify(accounting.costDetails),
          );
        for (const [key, value] of Object.entries(accounting.metadata))
          span?.setAttribute(
            "langfuse.observation.metadata." + key,
            String(value),
          );
        return Promise.resolve();
      },
    });
    super.onLanguageModelCallEnd(event);
  }
}
