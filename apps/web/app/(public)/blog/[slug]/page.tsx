import { fetchPost } from '@/lib/api';
import { notFound } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import rehypeSlug from 'rehype-slug';
import Link from 'next/link';
import Image from 'next/image';
import { extractHeadings } from '@/lib/markdown';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

interface BlogPostPageProps {
  params: { slug: string };
}

export const revalidate = 120;

export async function generateMetadata({ params }: BlogPostPageProps) {
  const post = await fetchPost(params.slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: post.coverImage ? [post.coverImage] : undefined
    },
    alternates: {
      canonical: `${siteUrl}/blog/${post.slug}`
    }
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const post = await fetchPost(params.slug).catch(() => null);
  if (!post) {
    notFound();
  }

  const toc = extractHeadings(post.content);

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-16 lg:flex-row">
      <aside className="lg:w-1/4">
        <div className="sticky top-24 hidden rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm dark:border-slate-800 dark:bg-slate-900 lg:block">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">On this page</h2>
          <ul className="mt-4 space-y-2">
            {toc.map((item) => (
              <li key={item.slug} style={{ paddingLeft: (item.depth - 2) * 12 }}>
                <a href={`#${item.slug}`} className="text-slate-600 hover:text-primary dark:text-slate-300">
                  {item.title}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </aside>
      <article className="mx-auto w-full max-w-3xl">
        <Link href="/blog" className="text-sm text-primary">
          ← Back to blog
        </Link>
        <h1 className="mt-4 text-4xl font-bold">{post.title}</h1>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
          {new Date(post.createdAt).toLocaleDateString()} • {post.tags.join(', ')}
        </p>
        {post.coverImage && (
          <div className="relative mt-8 h-80 w-full overflow-hidden rounded-xl">
            <Image src={post.coverImage} alt={post.title} fill className="object-cover" />
          </div>
        )}
        <div className="mt-8 prose max-w-none dark:prose-invert">
          <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeSlug, rehypeHighlight]}>
            {post.content}
          </ReactMarkdown>
        </div>
      </article>
    </div>
  );
}
