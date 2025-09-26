import Link from 'next/link';
import { fetchFeaturedProjects, fetchLatestPosts, fetchSettings, fetchSkills } from '@/lib/api';
import Image from 'next/image';

export const revalidate = 60;

export default async function HomePage() {
  const [settings, projects, posts, skills] = await Promise.all([
    fetchSettings(),
    fetchFeaturedProjects(),
    fetchLatestPosts(),
    fetchSkills()
  ]);

  return (
    <div>
      <section className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 py-20 text-white">
        <div className="mx-auto max-w-6xl px-4 text-center">
          <h1 className="text-4xl font-bold md:text-5xl">{settings.heroTitle}</h1>
          <p className="mt-4 text-lg text-slate-200 md:text-xl">{settings.heroSubtitle}</p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link href="/projects" className="btn-primary">
              View Projects
            </Link>
            <Link href="/contact" className="inline-flex items-center rounded-md border border-white px-4 py-2 font-semibold">
              Hire Me
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold">Featured Projects</h2>
          <Link href="/projects" className="text-sm font-medium text-primary">
            View all
          </Link>
        </div>
        <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <article key={project._id} className="overflow-hidden rounded-xl border border-slate-200 shadow-sm transition hover:-translate-y-1 dark:border-slate-800">
              {project.coverImage && (
                <div className="relative h-48 w-full">
                  <Image src={project.coverImage} alt={project.title} fill className="object-cover" />
                </div>
              )}
              <div className="p-6">
                <h3 className="text-lg font-semibold">{project.title}</h3>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{project.summary}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {project.tech.slice(0, 3).map((tech) => (
                    <span key={tech} className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium dark:bg-slate-800">
                      {tech}
                    </span>
                  ))}
                </div>
                <Link href={`/projects/${project.slug}`} className="mt-6 inline-flex text-sm font-medium text-primary">
                  View project →
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-slate-50 py-16 dark:bg-slate-900">
        <div className="mx-auto max-w-6xl px-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold">Latest Blog Posts</h2>
            <Link href="/blog" className="text-sm font-medium text-primary">
              View all
            </Link>
          </div>
          <div className="mt-8 grid gap-8 md:grid-cols-3">
            {posts.map((post) => (
              <article key={post._id} className="rounded-xl border border-slate-200 p-6 shadow-sm transition hover:-translate-y-1 dark:border-slate-800">
                <h3 className="text-lg font-semibold">{post.title}</h3>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{post.excerpt}</p>
                <Link href={`/blog/${post.slug}`} className="mt-6 inline-flex text-sm font-medium text-primary">
                  Read more →
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16">
        <h2 className="text-2xl font-semibold">Skills Overview</h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {skills.map((skill) => (
            <div key={skill._id} className="rounded-lg border border-slate-200 p-4 shadow-sm dark:border-slate-800">
              <h3 className="text-lg font-semibold">{skill.name}</h3>
              <p className="text-sm text-slate-600 dark:text-slate-300">{skill.level}</p>
              <p className="mt-2 text-xs uppercase tracking-wide text-slate-500">{skill.category}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
