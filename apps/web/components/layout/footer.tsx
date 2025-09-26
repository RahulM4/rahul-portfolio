import Link from 'next/link';

interface FooterProps {
  siteName: string;
  social?: {
    twitter?: string;
    github?: string;
    linkedin?: string;
  };
}

export function Footer({ siteName, social }: FooterProps) {
  return (
    <footer className="border-t border-slate-200 bg-slate-50 py-6 text-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-4 text-center md:flex-row md:text-left">
        <p>&copy; {new Date().getFullYear()} {siteName}. All rights reserved.</p>
        <div className="flex items-center space-x-4">
          {social?.twitter && (
            <a href={social.twitter} target="_blank" rel="noopener noreferrer">
              Twitter
            </a>
          )}
          {social?.github && (
            <a href={social.github} target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
          )}
          {social?.linkedin && (
            <a href={social.linkedin} target="_blank" rel="noopener noreferrer">
              LinkedIn
            </a>
          )}
          <Link href="/sitemap.xml">Sitemap</Link>
          <Link href="/rss.xml">RSS</Link>
        </div>
      </div>
    </footer>
  );
}
