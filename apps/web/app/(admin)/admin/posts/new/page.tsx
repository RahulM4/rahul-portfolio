import { PostForm } from '@/components/admin/forms/post-form';

export default function NewPostPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Create Post</h1>
        <p className="text-sm text-slate-600 dark:text-slate-300">Write a new post with Markdown and publish instantly.</p>
      </div>
      <PostForm />
    </div>
  );
}
