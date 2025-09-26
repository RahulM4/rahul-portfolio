'use client';

import useSWR from 'swr';
import axios from 'axios';

interface MessageItem {
  _id: string;
  name: string;
  email: string;
  message: string;
  status: 'new' | 'read';
  createdAt: string;
}

export function MessagesPanel() {
  const { data, mutate } = useSWR<{ data: MessageItem[] }>('/api/admin/messages', async (url) => {
    const response = await axios.get(url);
    return response.data;
  });

  const messages = data?.data ?? [];

  const handleMarkRead = async (id: string) => {
    await axios.patch(`/api/admin/messages/${id}`);
    mutate();
  };

  return (
    <div className="space-y-4">
      {messages.map((message) => (
        <article key={message._id} className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-950">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-semibold">{message.name}</h3>
              <a href={`mailto:${message.email}`} className="text-sm text-primary">
                {message.email}
              </a>
            </div>
            <span className="text-xs uppercase tracking-wide text-slate-500">
              {new Date(message.createdAt).toLocaleString()}
            </span>
          </div>
          <p className="mt-4 text-sm text-slate-600 dark:text-slate-300">{message.message}</p>
          {message.status === 'new' ? (
            <button onClick={() => handleMarkRead(message._id)} className="btn-primary mt-4">
              Mark as read
            </button>
          ) : (
            <span className="mt-4 inline-flex rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
              Read
            </span>
          )}
        </article>
      ))}
      {messages.length === 0 && <p className="text-sm text-slate-500">No messages yet.</p>}
    </div>
  );
}
