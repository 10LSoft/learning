import { describe, it } from '@jest/globals';

function sum(a, b) {
  return a + b;
}

describe('sum', () => {
  it('should sum 1 and 2 and return 3', () => {
    expect(sum(1, 2)).toBe(3);
  });
});
