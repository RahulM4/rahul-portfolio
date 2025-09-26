import { fetchExperiences } from '@/lib/api';
import Link from 'next/link';
import { DataTable } from '@/components/admin/data-table';

export const revalidate = 0;

export default async function AdminExperiencePage() {
  const experiences = await fetchExperiences();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Experience</h1>
          <p className="text-sm text-slate-600 dark:text-slate-300">Maintain your professional timeline.</p>
        </div>
        <Link href="/admin/experience/new" className="btn-primary">
          Add role
        </Link>
      </div>
      <DataTable
        data={experiences.map((experience) => ({
          role: experience.role,
          company: experience.company,
          from: new Date(experience.startDate).toLocaleDateString(),
          to: experience.endDate ? new Date(experience.endDate).toLocaleDateString() : 'Present',
          actions: (
            <div className="flex gap-2 text-sm">
              <Link href={`/admin/experience/${experience._id}`}>Edit</Link>
            </div>
          )
        }))}
        columns={[
          { key: 'role', header: 'Role' },
          { key: 'company', header: 'Company' },
          { key: 'from', header: 'From' },
          { key: 'to', header: 'To' },
          { key: 'actions', header: 'Actions' }
        ]}
      />
    </div>
  );
}
