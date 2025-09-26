'use client';

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const schema = z.object({
  name: z.string().min(2),
  level: z.string().min(2),
  category: z.string().min(2)
});

export type SkillFormValues = z.infer<typeof schema>;

export function SkillForm({ initialValues, id }: { initialValues?: SkillFormValues; id?: string }) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<SkillFormValues>({
    resolver: zodResolver(schema),
    defaultValues: initialValues
  });

  const onSubmit = handleSubmit(async (values) => {
    try {
      setError(null);
      if (id) {
        await axios.put(`/api/admin/skills/${id}`, values);
      } else {
        await axios.post('/api/admin/skills', values);
      }
      router.push('/admin/skills');
      router.refresh();
    } catch (err) {
      setError('Unable to save skill');
    }
  });

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium">Name</label>
        <input className="mt-1 w-full rounded-md border border-slate-200 px-3 py-2 dark:border-slate-700 dark:bg-slate-900" {...register('name')} />
        {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name.message}</p>}
      </div>
      <div>
        <label className="block text-sm font-medium">Level</label>
        <input className="mt-1 w-full rounded-md border border-slate-200 px-3 py-2 dark:border-slate-700 dark:bg-slate-900" {...register('level')} />
        {errors.level && <p className="mt-1 text-xs text-red-500">{errors.level.message}</p>}
      </div>
      <div>
        <label className="block text-sm font-medium">Category</label>
        <input className="mt-1 w-full rounded-md border border-slate-200 px-3 py-2 dark:border-slate-700 dark:bg-slate-900" {...register('category')} />
        {errors.category && <p className="mt-1 text-xs text-red-500">{errors.category.message}</p>}
      </div>
      {error && <p className="text-sm text-red-500">{error}</p>}
      <button type="submit" className="btn-primary" disabled={isSubmitting}>
        {isSubmitting ? 'Saving…' : 'Save skill'}
      </button>
    </form>
  );
}
