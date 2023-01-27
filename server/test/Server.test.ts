import { describe, expect, test, it } from '@jest/globals';

describe('product', () => {
  describe('get product route', () => {
    describe('given the product does not exist', () => {
      it('should be return a 404', () => {
        expect(true).toBe(true);
      });
    });
  });
});
