import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-stone-100 px-6">
      <div className="max-w-md text-center">
        <p className="text-xs uppercase tracking-[0.35em] text-neutral-500">404</p>
        <h1 className="mt-4 font-serif text-5xl text-neutral-900">Page not found</h1>
        <p className="mt-4 text-neutral-600">The page you requested is no longer available or may have moved.</p>
        <Link href="/" className="btn-primary mt-8">Return home</Link>
      </div>
    </main>
  );
}
