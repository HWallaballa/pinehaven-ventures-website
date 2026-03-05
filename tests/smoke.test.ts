import { describe, it, expect } from 'vitest';

describe('smoke test', () => {
  it('validates the test setup works', () => {
    expect(1 + 1).toBe(2);
  });

  it('can import from src via path alias', async () => {
    const stripeProducts = await import('@/lib/stripe-products');
    expect(stripeProducts).toBeDefined();
  });
});
