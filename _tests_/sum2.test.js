const sum = require('../sum');
import { describe, expect, test } from '@jest/globals';

test('adds 1 + 2 to equal 3', () => {
  expect(sum(2, 2)).toBe(4);
});
