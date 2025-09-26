import type { Metadata } from 'next';
import { ContactForm } from '@/components/contact-form';
import { fetchSettings } from '@/lib/api';

export const revalidate = 60;

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Send a project inquiry or say hello via the contact form.',
  alternates: {
    canonical: `${siteUrl}/contact`
  }
};

export default async function ContactPage() {
  const settings = await fetchSettings();

  return (
    <div className="mx-auto max-w-3xl px-4 py-16">
      <h1 className="text-4xl font-bold">Contact</h1>
      <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">
        Fill out the form and I&apos;ll respond within 24 hours. Alternatively, email me at{' '}
        <a href={`mailto:${settings.contactEmail}`} className="text-primary">
          {settings.contactEmail}
        </a>
      </p>
      <div className="mt-10 rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <ContactForm />
      </div>
    </div>
  );
}
