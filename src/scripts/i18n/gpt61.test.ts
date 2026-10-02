import { expect, test } from 'bun:test';
import { resolveLlmConfig } from './core/model-config.ts';
import { scoreTranslation } from './core/score.ts';
import { estimateTokenCost } from './translation-costs.ts';
import { accountUsage } from './cost-accounting.ts';
import { assertAllowedModel } from './model-policy.ts';
import { cliCommand } from './negotiation/cli-transport.ts';

test('GPT-6.1 Sol defaults to low with direct and gateway routing preserved', () => {
  for (const source of ['openai/gpt-6.1-sol','llm://openai/gpt-6.1-sol','openrouter/openai/gpt-6.1-sol','llm://openrouter/openai/gpt-6.1-sol?temp=0']) {
    const c=resolveLlmConfig(source,{temperature:0.2});
    expect(c.reasoningEffort).toBe('low');
    expect(c.temperature).toBeUndefined();
    expect(c.provider).toBe(source.includes('openrouter')?'openrouter':'openai');
  }
});
test('production scoring uses low and omits sampling settings', async () => {
  let captured:any;
  await expect(scoreTranslation({model:'openrouter/openai/gpt-6.1-sol',locale:'ja',sourceContents:'Hello',targetContents:'こんにちは',generateText:(async (options:any)=>{captured=options;throw Error('capture');}) as any})).rejects.toThrow('capture');
  expect(captured.providerOptions.openrouter.reasoning.effort).toBe('low');
  expect(captured.temperature).toBeUndefined();
});
test('GPT-6.1 cache pricing and long-context tier are accounted without repeated reasoning', () => {
  expect(estimateTokenCost('openai/gpt-6.1-sol',1000,200,500).totalUsd).toBeCloseTo(0.00305,8);
  expect(estimateTokenCost('gpt-6.1-sol',1000,200,500).totalUsd).toBeCloseTo(0.00305,8);
  expect(accountUsage('openrouter/openai/gpt-6.1-sol',{input:300000,output:1000,cached:100000,reasoning:500}).costDetails?.total).toBeCloseTo(0.835,8);
});
test('paid and CLI routes reject prohibited variants', () => {
  expect(()=>assertAllowedModel('openai/gpt-6.1-sol-pro')).toThrow('prohibited');
  expect(()=>resolveLlmConfig('llm://openrouter/openai/gpt-6.1-sol-pro')).toThrow('prohibited');
  expect(()=>resolveLlmConfig('llm://openai/gpt-6-astra')).toThrow('prohibited');
  expect(()=>assertAllowedModel('gpt-6-astra')).toThrow('prohibited');
  expect(()=>assertAllowedModel('anthropic/claude-fable-5.1')).toThrow('prohibited');
  expect(()=>assertAllowedModel('openai/o3-pro')).toThrow('prohibited');
  expect(()=>assertAllowedModel('~openai/gpt-astra-latest')).toThrow('prohibited');
  expect(()=>assertAllowedModel('example/model',0.00005)).toThrow('prohibited');
  expect(()=>cliCommand('codex',{model:'openai/gpt-6.1-sol-pro',effort:'low'},'/tmp/example',{})).toThrow('prohibited');
  expect(()=>assertAllowedModel('openai/gpt-6.1-sol',0.00001)).not.toThrow();
});
