import { fetchLatestPosts, fetchFeaturedProjects, fetchSkills, fetchSettings } from '@/lib/api';

export const revalidate = 0;

export default async function AdminDashboard() {
  const [settings, projects, posts, skills] = await Promise.all([
    fetchSettings(),
    fetchFeaturedProjects(),
    fetchLatestPosts(),
    fetchSkills()
  ]);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
          Manage content, track drafts, and review messages.
        </p>
      </div>
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-950">
          <h3 className="text-sm font-medium text-slate-500">Site name</h3>
          <p className="mt-2 text-2xl font-semibold">{settings.siteName}</p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-950">
          <h3 className="text-sm font-medium text-slate-500">Projects</h3>
          <p className="mt-2 text-2xl font-semibold">{projects.length}</p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-950">
          <h3 className="text-sm font-medium text-slate-500">Blog posts</h3>
          <p className="mt-2 text-2xl font-semibold">{posts.length}</p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-950">
          <h3 className="text-sm font-medium text-slate-500">Skills tracked</h3>
          <p className="mt-2 text-2xl font-semibold">{skills.length}</p>
        </div>
      </div>
    </div>
  );
}
