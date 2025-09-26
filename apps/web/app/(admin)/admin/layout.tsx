import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { AdminSidebar } from '@/components/admin/sidebar';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const token = cookies().get('adminToken');
  if (!token) {
    redirect('/auth/login');
  }

  return (
    <div className="flex min-h-[80vh]">
      <AdminSidebar />
      <div className="flex-1 bg-slate-50 p-8 dark:bg-slate-900">{children}</div>
    </div>
  );
}
