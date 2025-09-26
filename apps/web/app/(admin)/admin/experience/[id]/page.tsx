import { fetchExperiences } from '@/lib/api';
import { ExperienceForm, ExperienceFormValues } from '@/components/admin/forms/experience-form';

export default async function EditExperiencePage({ params }: { params: { id: string } }) {
  const experiences = await fetchExperiences();
  const experience = experiences.find((item) => item._id === params.id);

  const initial: ExperienceFormValues | undefined = experience
    ? {
        role: experience.role,
        company: experience.company,
        description: experience.description,
        startDate: experience.startDate.slice(0, 10),
        endDate: experience.endDate ? experience.endDate.slice(0, 10) : undefined
      }
    : undefined;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Edit Experience</h1>
        <p className="text-sm text-slate-600 dark:text-slate-300">Adjust your timeline entry.</p>
      </div>
      <ExperienceForm id={params.id} initialValues={initial} />
    </div>
  );
}
