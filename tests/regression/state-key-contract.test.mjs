import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const stateSource = readFileSync('js/core/state.js', 'utf8');

test('state paths block prototype-polluting key segments', () => {
  assert.match(
    stateSource,
    /const BLOCKED_STATE_KEYS = new Set\(\['__proto__', 'constructor', 'prototype'\]\)/,
    'Expected state paths to reject prototype-polluting segments.',
  );
  assert.match(stateSource, /BLOCKED_STATE_KEYS\.has\(part\)/);
});

test('state setters reject missing nested paths before assignment', () => {
  assert.match(
    stateSource,
    /const STATE_SETTERS = new Map/,
    'Expected writable state paths to be allowlisted.',
  );
  assert.match(stateSource, /\['timer\.duration', \(data, value\) => \{ data\.timer\.duration = value; \}\]/);
  assert.doesNotMatch(
    stateSource,
    /obj\[keys\[keys\.length - 1\]\] = value/,
    'Expected state writes to avoid recursively assigning through dynamic property chains.',
  );
});
