import { fetchSkill } from '@/lib/api';
import { SkillForm, SkillFormValues } from '@/components/admin/forms/skill-form';

export default async function EditSkillPage({ params }: { params: { id: string } }) {
  const skill = await fetchSkill(params.id);
  const initial: SkillFormValues = {
    name: skill.name,
    level: skill.level,
    category: skill.category
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Edit Skill</h1>
        <p className="text-sm text-slate-600 dark:text-slate-300">Update your expertise level and categories.</p>
      </div>
      <SkillForm id={params.id} initialValues={initial} />
    </div>
  );
}
