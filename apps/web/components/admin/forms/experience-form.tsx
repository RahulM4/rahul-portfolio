'use client';

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const schema = z.object({
  role: z.string().min(2),
  company: z.string().min(2),
  description: z.string().min(10),
  startDate: z.string(),
  endDate: z.string().optional()
});

export type ExperienceFormValues = z.infer<typeof schema>;

export function ExperienceForm({ initialValues, id }: { initialValues?: ExperienceFormValues; id?: string }) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<ExperienceFormValues>({
    resolver: zodResolver(schema),
    defaultValues: initialValues
  });

  const onSubmit = handleSubmit(async (values) => {
    try {
      setError(null);
      if (id) {
        await axios.put(`/api/admin/experience/${id}`, values);
      } else {
        await axios.post('/api/admin/experience', values);
      }
      router.push('/admin/experience');
      router.refresh();
    } catch (err) {
      setError('Unable to save experience');
    }
  });

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className="block text-sm font-medium">Role</label>
          <input className="mt-1 w-full rounded-md border border-slate-200 px-3 py-2 dark:border-slate-700 dark:bg-slate-900" {...register('role')} />
          {errors.role && <p className="mt-1 text-xs text-red-500">{errors.role.message}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium">Company</label>
          <input className="mt-1 w-full rounded-md border border-slate-200 px-3 py-2 dark:border-slate-700 dark:bg-slate-900" {...register('company')} />
          {errors.company && <p className="mt-1 text-xs text-red-500">{errors.company.message}</p>}
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium">Description</label>
        <textarea rows={4} className="mt-1 w-full rounded-md border border-slate-200 px-3 py-2 dark:border-slate-700 dark:bg-slate-900" {...register('description')} />
        {errors.description && <p className="mt-1 text-xs text-red-500">{errors.description.message}</p>}
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className="block text-sm font-medium">Start Date</label>
          <input type="date" className="mt-1 w-full rounded-md border border-slate-200 px-3 py-2 dark:border-slate-700 dark:bg-slate-900" {...register('startDate')} />
        </div>
        <div>
          <label className="block text-sm font-medium">End Date</label>
          <input type="date" className="mt-1 w-full rounded-md border border-slate-200 px-3 py-2 dark:border-slate-700 dark:bg-slate-900" {...register('endDate')} />
        </div>
      </div>
      {error && <p className="text-sm text-red-500">{error}</p>}
      <button type="submit" className="btn-primary" disabled={isSubmitting}>
        {isSubmitting ? 'Saving…' : 'Save experience'}
      </button>
    </form>
  );
}
