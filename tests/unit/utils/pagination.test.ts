import { describe, it, expect } from 'vitest';
import { getPaginationSettings, buildPaginatedResponse } from '../../../src/utils/pagination';

describe('Pagination Utilities', () => {
  it('should calculate take and skip correctly', () => {
    const settings = getPaginationSettings({ page: 2, limit: 15 });
    expect(settings.take).toBe(15);
    expect(settings.skip).toBe(15);
    expect(settings.page).toBe(2);
  });

  it('should enforce maximum limits', () => {
    const settings = getPaginationSettings({ page: 1, limit: 500 });
    expect(settings.take).toBe(100); // Defaults to max 100
  });

  it('should format paginated response', () => {
    const res = buildPaginatedResponse(['A', 'B'], 10, 1, 2);
    expect(res.meta.totalPages).toBe(5);
    expect(res.data).toEqual(['A', 'B']);
  });
});