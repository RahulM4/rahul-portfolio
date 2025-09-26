export interface TocItem {
  depth: number;
  title: string;
  slug: string;
}

export function extractHeadings(markdown: string): TocItem[] {
  const headingRegex = /^(#{2,4})\s+(.*)$/gm;
  const headings: TocItem[] = [];
  let match: RegExpExecArray | null;
  while ((match = headingRegex.exec(markdown)) !== null) {
    const depth = match[1].length;
    const title = match[2].trim();
    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .trim()
      .replace(/\s+/g, '-');
    headings.push({ depth, title, slug });
  }
  return headings;
}
