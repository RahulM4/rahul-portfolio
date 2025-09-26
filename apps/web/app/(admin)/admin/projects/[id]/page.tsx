import { ProjectForm, ProjectFormValues } from '@/components/admin/forms/project-form';

const apiUrl = process.env.API_URL || 'http://localhost:4000';

async function getProject(id: string) {
  const response = await fetch(`${apiUrl}/projects/${id}`, { next: { revalidate: 0 } });
  if (!response.ok) {
    return null;
  }
  const { data } = await response.json();
  const payload: ProjectFormValues = {
    title: data.title,
    slug: data.slug,
    summary: data.summary,
    content: data.content,
    tech: data.tech.join(', '),
    repoUrl: data.repoUrl,
    demoUrl: data.demoUrl,
    coverImage: data.coverImage,
    status: data.status,
    featured: data.featured ?? false
  };
  return payload;
}

export default async function EditProjectPage({ params }: { params: { id: string } }) {
  const project = await getProject(params.id);
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Edit Project</h1>
        <p className="text-sm text-slate-600 dark:text-slate-300">Update details and publish changes.</p>
      </div>
      <ProjectForm id={params.id} initialValues={project ?? undefined} />
    </div>
  );
}
