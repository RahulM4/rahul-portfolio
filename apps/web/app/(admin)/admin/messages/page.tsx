import { MessagesPanel } from '@/components/admin/messages-panel';

export const revalidate = 0;

export default function AdminMessagesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Messages</h1>
        <p className="text-sm text-slate-600 dark:text-slate-300">Review contact form submissions.</p>
      </div>
      <MessagesPanel />
    </div>
  );
}
