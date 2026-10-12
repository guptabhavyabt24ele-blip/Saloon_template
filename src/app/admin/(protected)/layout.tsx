import { redirect } from 'next/navigation';
import { getAuthSession } from '@/lib/auth';
import { AdminShell } from '@/components/admin/admin-ui';

export const dynamic = 'force-dynamic';

export default async function ProtectedAdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getAuthSession();
  if (!session?.user || session.user.role !== 'SALON_OWNER') redirect('/admin/login');

  return <AdminShell>{children}</AdminShell>;
}
