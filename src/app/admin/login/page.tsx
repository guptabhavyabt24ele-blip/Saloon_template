'use client';

import { signIn } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { FormEvent, Suspense, useState } from 'react';

function AdminLoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') ?? '/admin';
  const [email, setEmail] = useState('admin@velora.example');
  const [password, setPassword] = useState('change-me-in-production');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError('');
    setIsSubmitting(true);

    const result = await signIn('credentials', {
      email,
      password,
      redirect: false
    });

    setIsSubmitting(false);

    if (result?.error) {
      setError('Invalid email or password.');
      return;
    }

    router.push(callbackUrl);
    router.refresh();
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-bone px-6">
      <div className="card-surface w-full max-w-md p-8">
        <p className="text-xs uppercase tracking-[0.25em] text-espresso">Salon access</p>
        <h1 className="mt-4 font-serif text-4xl text-ink">Admin login</h1>

        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          <div>
            <label className="mb-2 block text-sm text-espresso">Email</label>
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="admin@velora.example"
              className="w-full rounded-full border border-warm-stone bg-white/50 px-4 py-3 text-ink outline-none transition-colors focus:border-champagne focus:ring-1 focus:ring-champagne"
            />
          </div>
          <div>
            <label className="mb-2 block text-sm text-espresso">Password</label>
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="••••••••"
              className="w-full rounded-full border border-warm-stone bg-white/50 px-4 py-3 text-ink outline-none transition-colors focus:border-champagne focus:ring-1 focus:ring-champagne"
            />
          </div>

          {error ? (
            <p role="alert" className="border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>
          ) : null}

          <button type="submit" disabled={isSubmitting} className="btn-primary w-full disabled:cursor-not-allowed disabled:opacity-70">
            {isSubmitting ? 'Signing in...' : 'Sign in'}
          </button>
        </form>
      </div>
    </main>
  );
}

export default function AdminLoginPage() {
  return (
    <Suspense fallback={<main className="flex min-h-screen items-center justify-center bg-bone px-6"><div className="card-surface w-full max-w-md p-8"><p className="text-sm text-espresso">Loading admin access...</p></div></main>}>
      <AdminLoginForm />
    </Suspense>
  );
}
