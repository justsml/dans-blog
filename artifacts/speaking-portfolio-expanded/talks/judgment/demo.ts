// Deliberately wrong teaching implementation. No real authorization or user data.
import { strict as assert } from 'node:assert';
const user = { tenant: 'A', roles: ['admin'] };
const canEdit = (u: typeof user, _resourceTenant: string) => u.roles.includes('admin');
assert.equal(canEdit(user, 'A'), true);
console.log('PASS: tenant A admin can edit tenant A');
if (process.argv.includes('--holdout')) {
  assert.equal(canEdit(user, 'B'), false, 'Tenant A admin must not edit tenant B');
}
