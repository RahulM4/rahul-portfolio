import type { Metadata } from 'next';
import Link from 'next/link';
import { fetchProjects } from '@/lib/api';

export const revalidate = 60;

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

export const metadata: Metadata = {
  title: 'Projects',
  description: 'Browse featured case studies and detailed project write-ups.',
  alternates: {
    canonical: `${siteUrl}/projects`
  }
};

export default async function ProjectsPage({ searchParams }: { searchParams: Record<string, string | string[] | undefined> }) {
  const query = Object.fromEntries(
    Object.entries(searchParams).map(([key, value]) => [key, Array.isArray(value) ? value[0] : value])
  );
  const { data: projects } = await fetchProjects({ ...query, status: 'published' });

  return (
    <div className="mx-auto max-w-6xl px-4 py-16">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Projects</h1>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
            Explore client and personal work. Filter by tech, status, or keyword.
          </p>
        </div>
        <Link href="/contact" className="btn-primary">
          Start a Project
        </Link>
      </div>
      <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <article key={project._id} className="rounded-xl border border-slate-200 p-6 shadow-sm transition hover:-translate-y-1 dark:border-slate-800">
            <div className="flex items-center justify-between text-xs uppercase tracking-wide text-slate-500">
              <span>{new Date(project.createdAt).toLocaleDateString()}</span>
              <span>{project.tech.join(', ')}</span>
            </div>
            <h2 className="mt-3 text-xl font-semibold">{project.title}</h2>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{project.summary}</p>
            <div className="mt-4 flex gap-4">
              {project.repoUrl && (
                <a href={project.repoUrl} className="text-sm text-primary" target="_blank" rel="noopener noreferrer">
                  Repo
                </a>
              )}
              {project.demoUrl && (
                <a href={project.demoUrl} className="text-sm text-primary" target="_blank" rel="noopener noreferrer">
                  Demo
                </a>
              )}
            </div>
            <Link href={`/projects/${project.slug}`} className="mt-6 inline-flex text-sm font-medium text-primary">
              Project details →
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
}
