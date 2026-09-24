import {test,expect} from 'bun:test';
import {normalizeSeverity} from './severity.ts';
import {assessmentSchema,dimensions,meetsQualityGate} from './protocol.ts';
test('legacy severity migration is explicit, nonmutating, and preserves the blocking threshold',()=>{
 const old={ready:true,ratings:dimensions.map(d=>({dimension:d,score:4,confidence:0.9,rationale:'ok',quote:''})),unresolved:[{severity:1,claim:'polish',quote:'',requiresReference:false}],summary:'ok'};
 const migrated=assessmentSchema.parse(normalizeSeverity(old,'0-4'));
 expect(migrated.unresolved[0]!.severity).toBe(2);expect(old.unresolved[0]!.severity).toBe(1);
 expect(meetsQualityGate([migrated,migrated],true,false)).toBe(true);
 const blocked=assessmentSchema.parse(normalizeSeverity({...old,unresolved:[{...old.unresolved[0]!,severity:2}]},'0-4'));
 expect(blocked.unresolved[0]!.severity).toBe(3);expect(meetsQualityGate([blocked,blocked],true,false)).toBe(false);
 expect(normalizeSeverity(migrated,'1-5')).toEqual(migrated);
 expect(()=>assessmentSchema.parse({...old,unresolved:[{...old.unresolved[0]!,severity:0}]})).toThrow();
});
