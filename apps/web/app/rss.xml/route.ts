import { NextResponse } from 'next/server';
import { fetchPosts } from '@/lib/api';

export const revalidate = 300;

export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  const { data: posts } = await fetchPosts({ status: 'published', limit: 50 });

  const rssItems = posts
    .map((post) => `
      <item>
        <title><![CDATA[${post.title}]]></title>
        <link>${baseUrl}/blog/${post.slug}</link>
        <guid>${post._id}</guid>
        <pubDate>${new Date(post.createdAt).toUTCString()}</pubDate>
        <description><![CDATA[${post.excerpt}]]></description>
      </item>
    `)
    .join('');

  const body = `<?xml version="1.0" encoding="UTF-8"?>
  <rss version="2.0">
    <channel>
      <title>Portfolio CMS Blog</title>
      <link>${baseUrl}</link>
      <description>Latest posts from the portfolio CMS.</description>
      ${rssItems}
    </channel>
  </rss>`;

  return new NextResponse(body, {
    headers: {
      'Content-Type': 'application/rss+xml'
    }
  });
}
