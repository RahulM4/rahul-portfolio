import type { Metadata } from 'next';
import Link from 'next/link';
import { fetchPosts } from '@/lib/api';

export const revalidate = 60;

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Latest tutorials, engineering notes, and product learnings.',
  alternates: {
    canonical: `${siteUrl}/blog`
  }
};

export default async function BlogPage({ searchParams }: { searchParams: Record<string, string | string[] | undefined> }) {
  const query = Object.fromEntries(
    Object.entries(searchParams).map(([key, value]) => [key, Array.isArray(value) ? value[0] : value])
  );
  const { data: posts, pagination } = await fetchPosts({ ...query, status: 'published' });

  return (
    <div className="mx-auto max-w-4xl px-4 py-16">
      <h1 className="text-4xl font-bold">Blog</h1>
      <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
        Insights on development, design, and product building.
      </p>
      <div className="mt-10 space-y-10">
        {posts.map((post) => (
          <article key={post._id} className="space-y-3 rounded-xl border border-slate-200 p-6 shadow-sm dark:border-slate-800">
            <div className="text-xs uppercase text-slate-500">
              {new Date(post.createdAt).toLocaleDateString()}
            </div>
            <h2 className="text-2xl font-semibold">
              <Link href={`/blog/${post.slug}`}>{post.title}</Link>
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-300">{post.excerpt}</p>
            <Link href={`/blog/${post.slug}`} className="text-sm font-medium text-primary">
              Read article →
            </Link>
          </article>
        ))}
      </div>
      {pagination && pagination.total > pagination.pageSize && (
        <div className="mt-12 flex items-center justify-between text-sm">
          <span>
            Page {pagination.page} of {Math.ceil(pagination.total / pagination.pageSize)}
          </span>
        </div>
      )}
    </div>
  );
}
