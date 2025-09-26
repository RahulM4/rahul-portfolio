import { fetchProject } from '@/lib/api';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import rehypeSlug from 'rehype-slug';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

interface ProjectPageProps {
  params: { slug: string };
}

export const revalidate = 120;

export async function generateMetadata({ params }: ProjectPageProps) {
  const project = await fetchProject(params.slug);
  if (!project) return {};
  return {
    title: project.title,
    description: project.summary,
    openGraph: {
      title: project.title,
      description: project.summary,
      images: project.coverImage ? [project.coverImage] : undefined
    },
    alternates: {
      canonical: `${siteUrl}/projects/${project.slug}`
    }
  };
}

export default async function ProjectDetailPage({ params }: ProjectPageProps) {
  const project = await fetchProject(params.slug).catch(() => null);
  if (!project) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-16">
      <Link href="/projects" className="text-sm text-primary">
        ← Back to projects
      </Link>
      <h1 className="mt-4 text-4xl font-bold">{project.title}</h1>
      <p className="mt-3 text-lg text-slate-600 dark:text-slate-300">{project.summary}</p>
      {project.coverImage && (
        <div className="relative mt-8 h-80 w-full overflow-hidden rounded-xl">
          <Image src={project.coverImage} alt={project.title} fill className="object-cover" />
        </div>
      )}
      <div className="mt-8 flex flex-wrap gap-3">
        {project.tech.map((tech) => (
          <span key={tech} className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold dark:bg-slate-800">
            {tech}
          </span>
        ))}
      </div>
      <div className="mt-8 prose max-w-none dark:prose-invert">
        <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeSlug, rehypeHighlight]}>
          {project.content}
        </ReactMarkdown>
      </div>
      <div className="mt-8 flex gap-4">
        {project.repoUrl && (
          <a href={project.repoUrl} className="btn-primary" target="_blank" rel="noopener noreferrer">
            View Repo
          </a>
        )}
        {project.demoUrl && (
          <a href={project.demoUrl} className="inline-flex items-center rounded-md border border-slate-200 px-4 py-2 font-semibold dark:border-slate-700" target="_blank" rel="noopener noreferrer">
            Live Demo
          </a>
        )}
      </div>
    </div>
  );
}
