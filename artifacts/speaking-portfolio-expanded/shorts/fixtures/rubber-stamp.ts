// Deliberately wrong teaching implementation. No real authorization or user data.
// Fixture for the short "The Test Who Loved Me". Its former parent talk,
// Code Is Cheap. Judgment Is Expensive., was reworked on 7 September 2026.
import { strict as assert } from 'node:assert';
const user = { tenant: 'A', roles: ['admin'] };
const canEdit = (u: typeof user, _resourceTenant: string) => u.roles.includes('admin');
assert.equal(canEdit(user, 'A'), true);
console.log('PASS: tenant A admin can edit tenant A');
if (process.argv.includes('--holdout')) {
  assert.equal(canEdit(user, 'B'), false, 'Tenant A admin must not edit tenant B');
}
