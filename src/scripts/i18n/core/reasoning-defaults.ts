import catalog from './reasoning-capabilities.json';
export type ReasoningCapability = { mandatory?: boolean; supported_efforts?: string[] | null };
/** OpenRouter optional thinking can be disabled even without an effort selector. */
export function lowestReasoningEffort(model: { reasoning?: ReasoningCapability | null }) {
  if (model.reasoning == null || model.reasoning.mandatory === false) return 'none';
  const supported = model.reasoning.supported_efforts;
  const order = ['none', 'minimal', 'low', 'medium', 'high', 'xhigh', 'max'];
  const selected = order.find(e => !(e === 'none' && model.reasoning?.mandatory) && (supported === null || supported?.includes(e)));
  if (!selected) throw new Error('Cannot determine minimum reasoning effort from catalog metadata; specify an explicit effort');
  return selected;
}
export function defaultReasoningEffort(modelId: string) {
  // Routing shortcuts preserve the base model capabilities. Exact catalog variants win.
  const lookupId = modelId.replace(/:(nitro|floor)$/, "");
  const models = catalog.models as Record<string, ReasoningCapability | null>;
  const key = modelId in models ? modelId : lookupId;
  if (!(key in models)) throw new Error(`No reasoning capabilities for ${modelId}; refresh reasoning-capabilities.json or specify an explicit effort`);
  return lowestReasoningEffort({reasoning: models[key]});
}
