import { fetchProjects } from '@/lib/api';
import Link from 'next/link';
import { DataTable } from '@/components/admin/data-table';

interface PageProps {
  searchParams: Record<string, string | string[] | undefined>;
}

export const revalidate = 0;

function toStringRecord(searchParams: PageProps['searchParams']) {
  const params: Record<string, string> = {};
  for (const [key, value] of Object.entries(searchParams)) {
    if (Array.isArray(value)) {
      params[key] = value[0];
    } else if (value) {
      params[key] = value;
    }
  }
  if (!params.limit) {
    params.limit = '10';
  }
  if (!params.page) {
    params.page = '1';
  }
  return params;
}

function buildQuery(params: Record<string, string>, overrides: Record<string, string>) {
  const query = new URLSearchParams({ ...params, ...overrides });
  return query.toString();
}

export default async function AdminProjectsPage({ searchParams }: PageProps) {
  const params = toStringRecord(searchParams);
  const { data: projects, pagination } = await fetchProjects(params);
  const page = Number(params.page);
  const totalPages = pagination ? Math.ceil(pagination.total / pagination.pageSize) : 1;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold">Projects</h1>
          <p className="text-sm text-slate-600 dark:text-slate-300">Manage projects, drafts, and publishing.</p>
        </div>
        <Link href="/admin/projects/new" className="btn-primary">
          New project
        </Link>
      </div>
      <form className="flex flex-wrap items-end gap-3" method="get">
        <div>
          <label className="block text-xs font-semibold uppercase text-slate-500">Search</label>
          <input
            type="text"
            name="search"
            defaultValue={params.search ?? ''}
            placeholder="Title or summary"
            className="mt-1 w-full rounded-md border border-slate-200 px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-900"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold uppercase text-slate-500">Status</label>
          <select
            name="status"
            defaultValue={params.status ?? ''}
            className="mt-1 w-full rounded-md border border-slate-200 px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-900"
          >
            <option value="">All</option>
            <option value="draft">Draft</option>
            <option value="published">Published</option>
          </select>
        </div>
        <div>
          <label className="block text-xs font-semibold uppercase text-slate-500">Tech</label>
          <input
            type="text"
            name="tech"
            defaultValue={params.tech ?? ''}
            placeholder="React"
            className="mt-1 w-full rounded-md border border-slate-200 px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-900"
          />
        </div>
        <input type="hidden" name="limit" value={params.limit} />
        <button type="submit" className="btn-primary">
          Filter
        </button>
      </form>
      <DataTable
        data={projects.map((project) => ({
          title: project.title,
          status: project.status,
          created: new Date(project.createdAt).toLocaleDateString(),
          actions: (
            <div className="flex gap-2 text-sm">
              <Link href={`/admin/projects/${project._id}`}>Edit</Link>
              <Link href={`/projects/${project.slug}`} className="text-primary" target="_blank" rel="noopener noreferrer">
                View
              </Link>
            </div>
          )
        }))}
        columns={[
          { key: 'title', header: 'Title' },
          { key: 'status', header: 'Status' },
          { key: 'created', header: 'Created' },
          { key: 'actions', header: 'Actions' }
        ]}
      />
      {pagination && pagination.total > pagination.pageSize && (
        <div className="flex items-center justify-between text-sm text-slate-600 dark:text-slate-300">
          <span>
            Page {page} of {totalPages}
          </span>
          <div className="flex gap-2">
            <Link
              href={`/admin/projects?${buildQuery(params, { page: String(Math.max(page - 1, 1)) })}`}
              className="rounded-md border border-slate-200 px-3 py-1 dark:border-slate-700"
            >
              Previous
            </Link>
            <Link
              href={`/admin/projects?${buildQuery(params, { page: String(Math.min(page + 1, totalPages)) })}`}
              className="rounded-md border border-slate-200 px-3 py-1 dark:border-slate-700"
            >
              Next
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
