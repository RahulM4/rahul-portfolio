'use client';

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { ImageUploader } from '@/components/admin/image-uploader';

const urlOrLocal = z
  .string()
  .min(1)
  .refine((value) => value.startsWith('http') || value.startsWith('/uploads/'), {
    message: 'Enter an absolute URL or uploaded path'
  });

const schema = z.object({
  title: z.string().min(3),
  slug: z.string().min(3),
  summary: z.string().min(10),
  content: z.string().min(20),
  tech: z.string().min(2),
  repoUrl: z.string().url().optional().or(z.literal('')).optional(),
  demoUrl: z.string().url().optional().or(z.literal('')).optional(),
  coverImage: urlOrLocal.optional().or(z.literal('')).optional(),
  status: z.enum(['draft', 'published']),
  featured: z.union([z.boolean(), z.string()]).optional()
});

export type ProjectFormValues = z.infer<typeof schema>;

export function ProjectForm({ initialValues, id }: { initialValues?: ProjectFormValues; id?: string }) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    watch
  } = useForm<ProjectFormValues>({
    resolver: zodResolver(schema),
    defaultValues: initialValues ?? { status: 'draft', featured: false }
  });

  const coverImage = watch('coverImage');

  const onSubmit = handleSubmit(async (values) => {
    const payload = {
      ...values,
      coverImage: values.coverImage || undefined,
      repoUrl: values.repoUrl || undefined,
      demoUrl: values.demoUrl || undefined,
      tech: values.tech.split(',').map((t) => t.trim()),
      featured: values.featured === true || values.featured === 'true' || values.featured === 'on'
    };
    try {
      setError(null);
      if (id) {
        await axios.put(`/api/admin/projects/${id}`, payload);
      } else {
        await axios.post('/api/admin/projects', payload);
      }
      router.push('/admin/projects');
      router.refresh();
    } catch (err) {
      setError('Unable to save project');
    }
  });

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className="block text-sm font-medium">Title</label>
          <input className="mt-1 w-full rounded-md border border-slate-200 px-3 py-2 dark:border-slate-700 dark:bg-slate-900" {...register('title')} />
          {errors.title && <p className="mt-1 text-xs text-red-500">{errors.title.message}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium">Slug</label>
          <input className="mt-1 w-full rounded-md border border-slate-200 px-3 py-2 dark:border-slate-700 dark:bg-slate-900" {...register('slug')} />
          {errors.slug && <p className="mt-1 text-xs text-red-500">{errors.slug.message}</p>}
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium">Summary</label>
        <textarea rows={3} className="mt-1 w-full rounded-md border border-slate-200 px-3 py-2 dark:border-slate-700 dark:bg-slate-900" {...register('summary')} />
        {errors.summary && <p className="mt-1 text-xs text-red-500">{errors.summary.message}</p>}
      </div>
      <div>
        <label className="block text-sm font-medium">Content (Markdown)</label>
        <textarea rows={8} className="mt-1 w-full rounded-md border border-slate-200 px-3 py-2 font-mono text-sm dark:border-slate-700 dark:bg-slate-900" {...register('content')} />
        {errors.content && <p className="mt-1 text-xs text-red-500">{errors.content.message}</p>}
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className="block text-sm font-medium">Tech (comma separated)</label>
          <input className="mt-1 w-full rounded-md border border-slate-200 px-3 py-2 dark:border-slate-700 dark:bg-slate-900" {...register('tech')} />
          {errors.tech && <p className="mt-1 text-xs text-red-500">{errors.tech.message}</p>}
        </div>
        <div className="space-y-2">
          <ImageUploader
            label="Cover image"
            onUploaded={(url) => {
              setValue('coverImage', url, { shouldDirty: true });
            }}
          />
          <input
            className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-900"
            placeholder="https://... or /uploads/..."
            {...register('coverImage')}
          />
          {coverImage && (
            <img src={coverImage} alt="Cover preview" className="mt-2 h-32 w-full rounded-md object-cover" />
          )}
          {errors.coverImage && <p className="mt-1 text-xs text-red-500">{errors.coverImage.message}</p>}
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className="block text-sm font-medium">Repository URL</label>
          <input className="mt-1 w-full rounded-md border border-slate-200 px-3 py-2 dark:border-slate-700 dark:bg-slate-900" {...register('repoUrl')} />
        </div>
        <div>
          <label className="block text-sm font-medium">Demo URL</label>
          <input className="mt-1 w-full rounded-md border border-slate-200 px-3 py-2 dark:border-slate-700 dark:bg-slate-900" {...register('demoUrl')} />
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        <div>
          <label className="block text-sm font-medium">Status</label>
          <select className="mt-1 w-full rounded-md border border-slate-200 px-3 py-2 dark:border-slate-700 dark:bg-slate-900" {...register('status')}>
            <option value="draft">Draft</option>
            <option value="published">Published</option>
          </select>
        </div>
        <div className="flex items-center gap-2 pt-6">
          <input type="checkbox" {...register('featured')} className="h-4 w-4" />
          <span className="text-sm">Featured</span>
        </div>
      </div>
      {error && <p className="text-sm text-red-500">{error}</p>}
      <button type="submit" className="btn-primary" disabled={isSubmitting}>
        {isSubmitting ? 'Saving…' : 'Save project'}
      </button>
    </form>
  );
}
