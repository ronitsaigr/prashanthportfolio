import { describe, expect, it } from 'vitest';
import { formatINR } from '../src/lib/money';
describe('INR display', () => {
  it('uses Indian digit grouping', () => expect(formatINR(20000000)).toBe('₹2,00,000'));
  it('keeps paise', () => expect(formatINR(12345)).toBe('₹123.45'));
  it('rejects fractional paise', () => expect(() => formatINR(1.5)).toThrow());
});
