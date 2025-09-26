'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { useState } from 'react';
import clsx from 'clsx';

const links = [
  { href: '/', label: 'Home' },
  { href: '/projects', label: 'Projects' },
  { href: '/blog', label: 'Blog' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' }
];

interface HeaderProps {
  siteName: string;
}

export function Header({ siteName }: HeaderProps) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/80 backdrop-blur dark:border-slate-800 dark:bg-slate-950/80">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <Link href="/" className="flex items-center space-x-2 text-lg font-semibold">
          <span>{siteName}</span>
        </Link>
        <nav className="hidden items-center space-x-6 md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={clsx('text-sm font-medium transition-colors hover:text-primary', {
                'text-primary': pathname === link.href
              })}
            >
              {link.label}
            </Link>
          ))}
          <Link href="/admin" className="text-sm font-medium text-primary">
            Admin
          </Link>
          <ThemeToggle />
        </nav>
        <button
          className="block rounded-md border border-slate-200 p-2 md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle navigation"
        >
          <span className="sr-only">Toggle navigation</span>
          <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
      {open && (
        <div className="border-t border-slate-200 bg-white px-4 py-3 dark:border-slate-800 dark:bg-slate-950 md:hidden">
          <div className="flex flex-col space-y-3">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={clsx('text-sm font-medium', {
                  'text-primary': pathname === link.href
                })}
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link href="/admin" className="text-sm font-medium text-primary" onClick={() => setOpen(false)}>
              Admin
            </Link>
            <ThemeToggle />
          </div>
        </div>
      )}
    </header>
  );
}
