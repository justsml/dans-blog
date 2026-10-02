import prohibited from './prohibited-price-models.json';
const expensiveIds = new Set(prohibited.models.flatMap(m => [m.id, m.id.replace(/^~/, ''), m.id.split('/').at(-1)!]));
/** Historical catalogs may contain these models; new calls must never use them. */
export function assertAllowedModel(modelId: string, outputUsdPerToken?: number) {
  const id = modelId.replace(/^llm:\/\//, '').split('?')[0]!.replace(/^openrouter\//, '');
  const openAiProUltra = /^(?:~?openai\/.*|(?:gpt-|o\d).*)(?:\bpro\b|\bultra\b)/i.test(id);
  if (openAiProUltra || expensiveIds.has(id)
    || (outputUsdPerToken !== undefined && (!Number.isFinite(outputUsdPerToken) || outputUsdPerToken >= 0.00005))) {
    throw new Error(`Model prohibited by repository cost policy: ${modelId}`);
  }
}
