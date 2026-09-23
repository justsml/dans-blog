import {test,expect} from 'bun:test';
import {cliCommand,cliAnswer} from './cli-transport.ts';
test('CLI routes preserve exact models and effort without shell interpolation or permission bypass',()=>{
 const actor={model:'openai/gpt-6-sol',effort:'high'};
 const command=cliCommand('codex',actor,'/tmp/example',{});
 expect(command).toContain('gpt-6-sol');expect(command).toContain('read-only');
 expect(command).toContain('model_reasoning_effort="high"');
 expect(command.join(' ')).not.toContain('bypass');
 expect(cliCommand('opencode',actor,'/tmp/example',{})).toContain('openrouter/openai/gpt-6-sol');
 expect(cliCommand('claude',{model:'anthropic/claude-opus-5.5',effort:'high'},'/tmp/example',{})).toContain('claude-opus-5-5');
});
test('CLI output parsing fails closed on errors and missing final answers',()=>{
 expect(cliAnswer('claude',JSON.stringify({structured_output:{ok:true}}))).toBe('{"ok":true}');
 expect(()=>cliAnswer('claude','{"is_error":true,"result":"no"}')).toThrow();
 expect(()=>cliAnswer('codex','events')).toThrow();
 expect(cliAnswer('codex','events','{"ok":true}')).toBe('{"ok":true}');
 expect(cliAnswer('opencode','{"type":"text","part":{"text":"{}"}}')).toBe('{}');
 expect(()=>cliAnswer('opencode','{"type":"error"}')).toThrow();
});
