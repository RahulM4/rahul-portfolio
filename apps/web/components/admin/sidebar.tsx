'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import clsx from 'clsx';
import axios from 'axios';

const items = [
  { href: '/admin', label: 'Dashboard' },
  { href: '/admin/projects', label: 'Projects' },
  { href: '/admin/posts', label: 'Blog Posts' },
  { href: '/admin/skills', label: 'Skills' },
  { href: '/admin/experience', label: 'Experience' },
  { href: '/admin/settings', label: 'Settings' },
  { href: '/admin/messages', label: 'Messages' }
];

export function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    await axios.post('/api/auth/logout');
    router.push('/auth/login');
  };

  return (
    <aside className="hidden w-64 border-r border-slate-200 bg-white px-4 py-6 dark:border-slate-800 dark:bg-slate-950 md:flex md:flex-col md:justify-between">
      <div>
        <h2 className="px-3 text-lg font-semibold">CMS</h2>
        <nav className="mt-6 space-y-1">
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={clsx('block rounded-md px-3 py-2 text-sm font-medium hover:bg-slate-100 dark:hover:bg-slate-900', {
                'bg-slate-100 font-semibold dark:bg-slate-900': pathname === item.href
              })}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
      <button onClick={handleLogout} className="rounded-md border border-slate-200 px-3 py-2 text-sm font-medium hover:bg-slate-100 dark:border-slate-700 dark:hover:bg-slate-900">
        Sign out
      </button>
    </aside>
  );
}
