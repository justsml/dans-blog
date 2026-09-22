import { describe, expect, test } from 'bun:test';
import { accuracy, catalogCost, knownSum } from './judge-benchmark-report.ts';
describe('judge benchmark accounting', () => {
  test('unknown spend is not free, but provider zero is retained', () => {
    expect(knownSum([0, 0])).toBe(0);
    expect(knownSum([1, undefined])).toBeNull();
    expect(knownSum([])).toBeNull();
  });
  test('failures stay in accuracy denominator', () => {
    expect(accuracy([
      { phase:'x',fixture:'a',model:'m',split:'calibration',expectedReady:false,ok:true,result:{publishReady:false} },
      { phase:'x',fixture:'b',model:'m',split:'calibration',expectedReady:true,ok:false },
    ])).toEqual({correct:1,total:2});
  });
  test('catalog cost includes cache discounts without duplicating reasoning', () => {
    expect(catalogCost({inputTokens:1000,outputTokens:200,cacheReadTokens:500}, {prompt:'0.000001',input_cache_read:'0.0000001',completion:'0.000005'})).toBeCloseTo(0.00155);
  });
});

import { scoreTranslation } from './core/score.ts';
import { resolvePromptProfile } from '../i18n-agent/prompt-profiles.ts';
test('production scoring omits temperature for both Luna generations', async () => {
  for (const model of ['openrouter/openai/gpt-6-luna', 'llm://openrouter/openai/gpt-6-luna?reasoning_effort=medium', 'openrouter/openai/gpt-5.6-luna']) {
    let captured: any;
    await expect(scoreTranslation({ model, locale:'es', sourceContents:'Hello', targetContents:'Hola', generateText:(async (options: any) => { captured = options; throw new Error('offline capture'); }) as any })).rejects.toThrow('offline capture');
    expect(captured.temperature).toBeUndefined();
  }
});
test('calibrated Luna profile is scoped to article judges', () => {
  const profile = resolvePromptProfile({kind:'judge',locale:'ja',model:'openrouter/openai/gpt-6-luna',contentKind:'article'});
  expect(profile?.id).toBe('judge-article-gpt-6-luna-site-conventions');
  expect(profile?.appendCachedContext).toContain('their omission is correct');
  expect(resolvePromptProfile({kind:'judge',locale:'ja',model:'openrouter/openai/gpt-6-luna',contentKind:'quiz'})).toBeUndefined();
});
test('production fallback cost does not double-count reasoning tokens', async () => {
  const result = await scoreTranslation({ model:'openrouter/openai/gpt-6-luna',locale:'es',sourceContents:'Hello',targetContents:'Hola',generateText:(async () => ({
    text: JSON.stringify({scores:{readability:100,technicalAccuracy:100,coherence:100,relevance:100,translationQuality:100,mdxPreservation:100,culturalAdaptation:100,languagePurity:100},suggestions:[],publishReady:true}),
    usage:{inputTokens:1000,outputTokens:200,totalTokens:1200},
    providerMetadata:{openrouter:{usage:{completion_tokens_details:{reasoning_tokens:100}}}},finishReason:'stop',
  })) as any });
  expect(result.telemetry.reasoningTokens).toBe(100);
  expect(result.cost.totalUsd).toBeCloseTo(0.0002, 8);
});

import { benchmarkReasoningEffort } from './judge-benchmark.ts';
import { comparisonCohort } from './judge-benchmark-report.ts';
test('lowest reasoning respects mandatory thinking and supported settings', () => {
  expect(benchmarkReasoningEffort('lowest', {reasoning:{supported_efforts:['high','low','none']}})).toBe('none');
  expect(benchmarkReasoningEffort('lowest', {reasoning:{mandatory:true,supported_efforts:['high','low','none']}})).toBe('low');
  expect(benchmarkReasoningEffort('lowest', {reasoning:{supported_efforts:['low','minimal']}})).toBe('minimal');
  expect(() => benchmarkReasoningEffort('lowest', {})).toThrow('Cannot determine');
  expect(benchmarkReasoningEffort('medium', {})).toBe('medium');
});
test('supplemental phases join their named comparison without overwriting evidence', () => {
  const row = {phase:'gpt6-baseline',cohort:'baseline',fixture:'es-clean',model:'openai/gpt-6-sol',split:'calibration',ok:true};
  expect(comparisonCohort(row)).toBe('baseline');
  expect(comparisonCohort({...row,cohort:undefined})).toBe('gpt6-baseline');
});
test('Astra and Sol scoring omit temperature at minimum reasoning', async () => {
  for (const [model, effort] of [['astra','low'], ['sol','none']]) {
    let captured: any;
    await expect(scoreTranslation({model:`llm://openrouter/openai/gpt-6-${model}?reasoning_effort=${effort}`,locale:'es',sourceContents:'Hello',targetContents:'Hola',generateText:(async (options:any)=>{captured=options;throw new Error('offline capture');}) as any})).rejects.toThrow('offline capture');
    expect(captured.temperature).toBeUndefined();
    expect(captured.providerOptions.openrouter.reasoning.effort).toBe(effort);
  }
});
test('catalog estimate applies cache-write premium to written input tokens', () => {
  expect(catalogCost({inputTokens:3234,outputTokens:471,cacheReadTokens:0,cacheWriteTokens:3231}, {prompt:'0.000002',completion:'0.00001',input_cache_write:'0.0000025'})).toBeCloseTo(0.0127935, 9);
});
import { defaultBenchmarkEffort } from './judge-benchmark.ts';
test('new Astra and Sol benchmark presets keep minimum reasoning by default', () => {
  expect(defaultBenchmarkEffort('openai/gpt-6-astra')).toBe('lowest');
  expect(defaultBenchmarkEffort('openai/gpt-6-sol')).toBe('lowest');
  expect(defaultBenchmarkEffort('openai/gpt-6-luna')).toBe('low');
});
test('judge output budget defaults to 16k and respects an explicit smaller cap', async () => {
  for (const [model, expected] of [['openrouter/openai/gpt-6-sol',16000],['llm://openrouter/openai/gpt-6-sol?max_tokens=8000',8000]] as const) {
    let captured: any;
    await expect(scoreTranslation({model,locale:'es',sourceContents:'Hello',targetContents:'Hola',generateText:(async (options:any)=>{captured=options;throw new Error('offline capture');}) as any})).rejects.toThrow('offline capture');
    expect(captured.maxOutputTokens).toBe(expected);
  }
});
