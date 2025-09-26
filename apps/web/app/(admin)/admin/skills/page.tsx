import { fetchSkillsAdmin } from '@/lib/api';
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

export default async function AdminSkillsPage({ searchParams }: PageProps) {
  const params = toStringRecord(searchParams);
  const { data: skills, pagination } = await fetchSkillsAdmin(params);
  const page = Number(params.page);
  const totalPages = pagination ? Math.ceil(pagination.total / pagination.pageSize) : 1;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Skills</h1>
          <p className="text-sm text-slate-600 dark:text-slate-300">Manage displayed skill badges.</p>
        </div>
        <Link href="/admin/skills/new" className="btn-primary">
          New skill
        </Link>
      </div>
      <form className="flex flex-wrap items-end gap-3" method="get">
        <div>
          <label className="block text-xs font-semibold uppercase text-slate-500">Category</label>
          <input
            type="text"
            name="category"
            defaultValue={params.category ?? ''}
            className="mt-1 w-full rounded-md border border-slate-200 px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-900"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold uppercase text-slate-500">Search</label>
          <input
            type="text"
            name="search"
            defaultValue={params.search ?? ''}
            placeholder="Skill name"
            className="mt-1 w-full rounded-md border border-slate-200 px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-900"
          />
        </div>
        <input type="hidden" name="limit" value={params.limit} />
        <button type="submit" className="btn-primary">
          Filter
        </button>
      </form>
      <DataTable
        data={skills.map((skill) => ({
          name: skill.name,
          level: skill.level,
          category: skill.category,
          actions: (
            <div className="flex gap-2 text-sm">
              <Link href={`/admin/skills/${skill._id}`}>Edit</Link>
            </div>
          )
        }))}
        columns={[
          { key: 'name', header: 'Name' },
          { key: 'level', header: 'Level' },
          { key: 'category', header: 'Category' },
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
              href={`/admin/skills?${buildQuery(params, { page: String(Math.max(page - 1, 1)) })}`}
              className="rounded-md border border-slate-200 px-3 py-1 dark:border-slate-700"
            >
              Previous
            </Link>
            <Link
              href={`/admin/skills?${buildQuery(params, { page: String(Math.min(page + 1, totalPages)) })}`}
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
