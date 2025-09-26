import { extractHeadings } from '@/lib/markdown';

describe('extractHeadings', () => {
  it('returns headings with depth and slug', () => {
    const markdown = '## Intro\nText\n### Details\nMore text';
    expect(extractHeadings(markdown)).toEqual([
      { depth: 2, title: 'Intro', slug: 'intro' },
      { depth: 3, title: 'Details', slug: 'details' }
    ]);
  });
});
