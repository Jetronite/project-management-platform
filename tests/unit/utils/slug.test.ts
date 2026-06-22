import { describe, it, expect } from 'vitest';
import { generateSlug } from '../../../src/utils/slug';

describe('Slug Utilities', () => {
  it('should convert standard text to a slug', () => {
    expect(generateSlug('Acme Corporation')).toBe('acme-corporation');
  });

  it('should handle special characters and accents', () => {
    expect(generateSlug(' Café & Restaurant  ')).toBe('cafe-restaurant'); // Simplified handling strips special chars, keeps spaces
  });

  it('should convert everything to lowercase', () => {
    expect(generateSlug('TESTING Slugs')).toBe('testing-slugs');
  });
});