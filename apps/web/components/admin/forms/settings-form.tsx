'use client';

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const schema = z.object({
  siteName: z.string().min(2),
  heroTitle: z.string().min(5),
  heroSubtitle: z.string().min(10),
  theme: z.enum(['light', 'dark', 'system']),
  seoTitle: z.string().min(5),
  seoDescription: z.string().min(10),
  seoKeywords: z.string().optional(),
  twitter: z.string().optional(),
  github: z.string().optional(),
  linkedin: z.string().optional(),
  contactEmail: z.string().email('Enter a valid email')
});

export type SettingsFormValues = z.infer<typeof schema>;

export function SettingsForm({ initialValues }: { initialValues?: SettingsFormValues }) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<SettingsFormValues>({
    resolver: zodResolver(schema),
    defaultValues: initialValues
  });

  const onSubmit = handleSubmit(async (values) => {
    try {
      setError(null);
      await axios.put('/api/admin/settings', {
        siteName: values.siteName,
        heroTitle: values.heroTitle,
        heroSubtitle: values.heroSubtitle,
        theme: values.theme,
        seo: {
          title: values.seoTitle,
          description: values.seoDescription,
          keywords: values.seoKeywords?.split(',').map((k) => k.trim()).filter(Boolean) ?? []
        },
        social: {
          twitter: values.twitter,
          github: values.github,
          linkedin: values.linkedin
        },
        contactEmail: values.contactEmail
      });
      router.refresh();
    } catch (err) {
      setError('Unable to update settings');
    }
  });

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className="block text-sm font-medium">Site name</label>
          <input className="mt-1 w-full rounded-md border border-slate-200 px-3 py-2 dark:border-slate-700 dark:bg-slate-900" {...register('siteName')} />
          {errors.siteName && <p className="mt-1 text-xs text-red-500">{errors.siteName.message}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium">Theme</label>
          <select className="mt-1 w-full rounded-md border border-slate-200 px-3 py-2 dark:border-slate-700 dark:bg-slate-900" {...register('theme')}>
            <option value="light">Light</option>
            <option value="dark">Dark</option>
            <option value="system">System</option>
          </select>
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium">Hero title</label>
        <input className="mt-1 w-full rounded-md border border-slate-200 px-3 py-2 dark:border-slate-700 dark:bg-slate-900" {...register('heroTitle')} />
        {errors.heroTitle && <p className="mt-1 text-xs text-red-500">{errors.heroTitle.message}</p>}
      </div>
      <div>
        <label className="block text-sm font-medium">Hero subtitle</label>
        <textarea rows={3} className="mt-1 w-full rounded-md border border-slate-200 px-3 py-2 dark:border-slate-700 dark:bg-slate-900" {...register('heroSubtitle')} />
        {errors.heroSubtitle && <p className="mt-1 text-xs text-red-500">{errors.heroSubtitle.message}</p>}
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className="block text-sm font-medium">SEO title</label>
          <input className="mt-1 w-full rounded-md border border-slate-200 px-3 py-2 dark:border-slate-700 dark:bg-slate-900" {...register('seoTitle')} />
          {errors.seoTitle && <p className="mt-1 text-xs text-red-500">{errors.seoTitle.message}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium">SEO keywords</label>
          <input className="mt-1 w-full rounded-md border border-slate-200 px-3 py-2 dark:border-slate-700 dark:bg-slate-900" placeholder="keyword1, keyword2" {...register('seoKeywords')} />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium">SEO description</label>
        <textarea rows={3} className="mt-1 w-full rounded-md border border-slate-200 px-3 py-2 dark:border-slate-700 dark:bg-slate-900" {...register('seoDescription')} />
        {errors.seoDescription && <p className="mt-1 text-xs text-red-500">{errors.seoDescription.message}</p>}
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        <div>
          <label className="block text-sm font-medium">Twitter</label>
          <input className="mt-1 w-full rounded-md border border-slate-200 px-3 py-2 dark:border-slate-700 dark:bg-slate-900" {...register('twitter')} />
        </div>
        <div>
          <label className="block text-sm font-medium">GitHub</label>
          <input className="mt-1 w-full rounded-md border border-slate-200 px-3 py-2 dark:border-slate-700 dark:bg-slate-900" {...register('github')} />
        </div>
        <div>
          <label className="block text-sm font-medium">LinkedIn</label>
          <input className="mt-1 w-full rounded-md border border-slate-200 px-3 py-2 dark:border-slate-700 dark:bg-slate-900" {...register('linkedin')} />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium">Contact email</label>
        <input type="email" className="mt-1 w-full rounded-md border border-slate-200 px-3 py-2 dark:border-slate-700 dark:bg-slate-900" {...register('contactEmail')} />
        {errors.contactEmail && <p className="mt-1 text-xs text-red-500">{errors.contactEmail.message}</p>}
      </div>
      {error && <p className="text-sm text-red-500">{error}</p>}
      <button type="submit" className="btn-primary" disabled={isSubmitting}>
        {isSubmitting ? 'Saving…' : 'Save settings'}
      </button>
    </form>
  );
}
