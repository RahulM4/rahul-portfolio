import type { Metadata } from 'next';
import { fetchExperiences, fetchSkills, fetchSettings } from '@/lib/api';

export const revalidate = 120;

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

export const metadata: Metadata = {
  title: 'About',
  description: 'Learn about my background, experience, and core skillset.',
  alternates: {
    canonical: `${siteUrl}/about`
  }
};

export default async function AboutPage() {
  const [settings, experiences, skills] = await Promise.all([
    fetchSettings(),
    fetchExperiences(),
    fetchSkills()
  ]);

  return (
    <div className="mx-auto max-w-4xl px-4 py-16">
      <h1 className="text-4xl font-bold">About</h1>
      <p className="mt-4 text-lg text-slate-600 dark:text-slate-300">{settings.seo.description}</p>
      <section className="mt-12">
        <h2 className="text-2xl font-semibold">Biography</h2>
        <p className="mt-4 text-sm leading-7 text-slate-600 dark:text-slate-300">
          {settings.heroSubtitle} I collaborate with ambitious founders and teams to ship delightful products, with an emphasis on DX, accessibility, and performance.
        </p>
      </section>
      <section className="mt-12">
        <h2 className="text-2xl font-semibold">Experience Timeline</h2>
        <div className="mt-6 space-y-6">
          {experiences.map((experience) => (
            <article key={experience._id} className="rounded-xl border border-slate-200 p-6 dark:border-slate-800">
              <div className="flex flex-wrap items-baseline justify-between gap-2 text-sm text-slate-500">
                <span className="font-semibold text-slate-900 dark:text-slate-100">{experience.role}</span>
                <span>
                  {new Date(experience.startDate).toLocaleDateString()} –{' '}
                  {experience.endDate ? new Date(experience.endDate).toLocaleDateString() : 'Present'}
                </span>
              </div>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">{experience.company}</p>
              <p className="mt-4 text-sm text-slate-600 dark:text-slate-300">{experience.description}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="mt-12">
        <h2 className="text-2xl font-semibold">Skills</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 md:grid-cols-3">
          {skills.map((skill) => (
            <div key={skill._id} className="rounded-lg border border-slate-200 p-4 dark:border-slate-800">
              <h3 className="text-lg font-semibold">{skill.name}</h3>
              <p className="text-sm text-slate-500">{skill.category}</p>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{skill.level}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
