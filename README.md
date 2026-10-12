# Velora Salon Studio

Luxury salon booking and atelier operations workspace built with Next.js, TypeScript, Tailwind CSS, Supabase, and Vitest.

## Features

- Editorial public salon site with services, gallery, team, booking, contact, and booking lookup routes.
- Supabase-backed services, staff, customers, appointments, payments, gallery, messages, and settings.
- Structured mock fallback when Supabase variables are absent, so local UI evaluation does not crash.
- Protected admin workspace with dashboard, appointments, services, staff, customers, analytics, messages, and settings views.
- Server-side validation for booking and contact submissions.

## Local setup

```bash
npm install
copy .env.example .env.local
npm run dev
```

Open `http://localhost:3000`.

## Supabase setup

1. Create a Supabase project.
2. Copy `.env.example` to `.env.local`.
3. Set `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`.
4. Set `SUPABASE_SERVICE_ROLE_KEY` only on the server. Never expose it with `NEXT_PUBLIC_`.
5. Run `supabase/schema.sql` in Supabase SQL Editor, then run `supabase/seed.sql`.

With Supabase variables absent, public reads use the structured Velora demo data. Writes return a safe demo response and do not claim database persistence.

## Admin access

Set `ADMIN_EMAIL`, `ADMIN_PASSWORD`, and a strong `NEXTAUTH_SECRET` in `.env.local`. A bcrypt password hash is recommended for production. Admin routes redirect unauthenticated visitors to `/admin/login`.

## Useful commands

```bash
npm run dev
npm run test
npm run typecheck
npm run lint
npm run build
```

## Routes

Public: `/`, `/services`, `/services/[slug]`, `/gallery`, `/team`, `/about`, `/offers`, `/reviews`, `/contact`, `/book`, `/booking/lookup`, `/booking/confirmation`.

APIs: `/api/services`, `/api/book`, `/api/bookings`, `/api/contact`, `/api/auth/[...nextauth]`.

Admin: `/admin`, `/admin/appointments`, `/admin/services`, `/admin/staff`, `/admin/customers`, `/admin/analytics`, `/admin/messages`, `/admin/settings`, `/admin/login`.

## Visual system

Public surfaces retain the Velora palette: bone `#F8F6F0`, ink `#1A1918`, warm stone `#E5E0D8`, and champagne `#B89A67`. Public layouts retain the fixed navbar, Lenis smooth scrolling, grain overlay, and `pt-28` to `pt-36` shell clearance. Admin uses a separate charcoal atelier shell.
