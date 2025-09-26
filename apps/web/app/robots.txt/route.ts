import { NextResponse } from 'next/server';

export function GET() {
  return new NextResponse(
    `User-agent: *\nAllow: /\nSitemap: ${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/sitemap.xml\n`,
    {
      headers: {
        'Content-Type': 'text/plain'
      }
    }
  );
}
