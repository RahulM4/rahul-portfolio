import { NextResponse } from 'next/server';
import { fetchPosts, fetchProjects } from '@/lib/api';

export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  const [{ data: projects }, { data: posts }] = await Promise.all([fetchProjects({ status: 'published' }), fetchPosts({ status: 'published' })]);

  const urls = [
    '',
    'projects',
    'blog',
    'about',
    'contact',
    ...projects.map((project) => `projects/${project.slug}`),
    ...posts.map((post) => `blog/${post.slug}`)
  ];

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map((url) => `  <url><loc>${baseUrl}/${url}</loc></url>`)
  .join('\n')}
</urlset>`;

  return new NextResponse(body, {
    headers: {
      'Content-Type': 'application/xml'
    }
  });
}
