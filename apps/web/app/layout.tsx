import type { Metadata } from 'next';
import './globals.css';
import 'highlight.js/styles/github-dark.css';
import { Providers } from '@/components/providers';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { fetchSettings } from '@/lib/api';

export const metadata: Metadata = {
  title: {
    default: 'Portfolio CMS',
    template: '%s | Portfolio CMS'
  },
  description: 'Personal portfolio with blog and admin CMS.',
  applicationName: 'Portfolio CMS',
  icons: {
    icon: '/favicon.svg'
  }
};

export default async function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const settings = await fetchSettings();

  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-white antialiased dark:bg-slate-950">
        <Providers>
          <div className="flex min-h-screen flex-col">
            <Header siteName={settings.siteName} />
            <main className="flex-1">{children}</main>
            <Footer siteName={settings.siteName} social={settings.social} />
          </div>
        </Providers>
      </body>
    </html>
  );
}
