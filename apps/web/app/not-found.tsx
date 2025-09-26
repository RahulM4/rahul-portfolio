import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-3xl flex-col items-center justify-center px-4 text-center">
      <h1 className="text-5xl font-bold">404</h1>
      <p className="mt-4 text-sm text-slate-600 dark:text-slate-300">We couldn&apos;t find the page you were looking for.</p>
      <Link href="/" className="btn-primary mt-6">
        Go home
      </Link>
    </div>
  );
}
