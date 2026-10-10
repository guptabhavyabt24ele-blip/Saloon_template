# saloon_template

A premium salon booking and management website built with Next.js, TypeScript, Tailwind CSS, Prisma, and Vitest.

This repository contains a polished salon landing page, appointment booking flow, demo data, and a salon-owner dashboard foundation.

## Features included

- Premium public salon website with homepage, services, gallery, team, about, contact, offers, and reviews
- Appointment booking flow with scheduling logic and overlap protection
- Admin dashboard for salon operations and management overview
- Prisma schema for salons, staff, customers, services, appointments, and payments
- Demo seed data for a fictional salon brand
- Virtual try-on prototype page for hairstyle previews
- Environment-based configuration for local development

## Local setup

```bash
cd "C:\Users\Lenovo\AppData\Roaming\Code\User\globalStorage\github.remotehub\4b79873068f35b504215ae931a3a08d1\changestore\vscode-vfs-github\guptabhavyabt24ele-blip\velora-salon"
npm install
copy .env.example .env.local
npm run db:generate
npm run db:push
npm run db:seed
npm run dev
```

## Required environment variables

Use `.env.local` with at least:

```bash
NEXT_PUBLIC_APP_URL=http://localhost:3000
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/velora_salon?schema=public"
ADMIN_EMAIL=admin@velora.example
ADMIN_PASSWORD=change-me-in-production
NEXTAUTH_SECRET=replace-with-strong-secret
```

## Database notes

The project uses PostgreSQL via Prisma. For local development, create a Postgres database and point `DATABASE_URL` at it before running the Prisma commands.

## Useful commands

```bash
npm run dev
npm run test
npm run typecheck
npm run build
npm run lint
npm run db:generate
npm run db:push
npm run db:migrate
npm run db:seed
```

## Demo admin access

Demo credentials are stored in `.env.example` and are intended for local development only. Change them before deployment.

## Demo content

The app ships with a fictional salon demo named VELORA and sample services, gallery content, staff profiles, and appointment data.

## Current limitations

- Real payment, email, SMS, and WhatsApp integrations are not configured by default.
- Authentication is scaffolding for local demonstration and should be expanded for production use.
- A production-grade multi-tenant access layer and advanced CRM automation can be layered on top of this foundation.
- The virtual try-on experience is a browser-first prototype and does not perform real AI hair segmentation without an external provider.

## Production readiness

This project is suitable as a polished local demo and a strong foundation for a real salon SaaS product, but it still needs production configuration for authentication, payments, email, notification channels, and managed PostgreSQL hosting.
