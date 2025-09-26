import { fetchSettings } from '@/lib/api';
import { SettingsForm, SettingsFormValues } from '@/components/admin/forms/settings-form';

export const revalidate = 0;

export default async function AdminSettingsPage() {
  const settings = await fetchSettings();
  const initial: SettingsFormValues = {
    siteName: settings.siteName,
    heroTitle: settings.heroTitle,
    heroSubtitle: settings.heroSubtitle,
    theme: settings.theme,
    seoTitle: settings.seo.title,
    seoDescription: settings.seo.description,
    seoKeywords: settings.seo.keywords.join(', '),
    twitter: settings.social?.twitter,
    github: settings.social?.github,
    linkedin: settings.social?.linkedin,
    contactEmail: settings.contactEmail ?? ''
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Site Settings</h1>
        <p className="text-sm text-slate-600 dark:text-slate-300">Control site-wide content and branding.</p>
      </div>
      <SettingsForm initialValues={initial} />
    </div>
  );
}
