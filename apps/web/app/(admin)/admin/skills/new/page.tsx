import { SkillForm } from '@/components/admin/forms/skill-form';

export default function NewSkillPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Create Skill</h1>
        <p className="text-sm text-slate-600 dark:text-slate-300">Add a new skill to your profile.</p>
      </div>
      <SkillForm />
    </div>
  );
}
