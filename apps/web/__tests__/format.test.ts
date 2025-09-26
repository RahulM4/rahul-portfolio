import { formatDate } from '@/lib/format';

describe('formatDate', () => {
  it('formats string date', () => {
    expect(formatDate('2024-05-01T00:00:00.000Z')).toBe('May 1, 2024');
  });

  it('formats Date instance', () => {
    expect(formatDate(new Date('2023-01-15'))).toBe('Jan 15, 2023');
  });
});
