import { PostForm, PostFormValues } from '@/components/admin/forms/post-form';

const apiUrl = process.env.API_URL || 'http://localhost:4000';

async function getPost(id: string) {
  const response = await fetch(`${apiUrl}/posts/${id}`, { next: { revalidate: 0 } });
  if (!response.ok) {
    return null;
  }
  const { data } = await response.json();
  const payload: PostFormValues = {
    title: data.title,
    slug: data.slug,
    excerpt: data.excerpt,
    content: data.content,
    tags: data.tags.join(', '),
    coverImage: data.coverImage,
    status: data.status
  };
  return payload;
}

export default async function EditPostPage({ params }: { params: { id: string } }) {
  const post = await getPost(params.id);
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Edit Post</h1>
        <p className="text-sm text-slate-600 dark:text-slate-300">Update content, tags, and publishing state.</p>
      </div>
      <PostForm id={params.id} initialValues={post ?? undefined} />
    </div>
  );
}
