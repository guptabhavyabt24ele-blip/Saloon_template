'use client';

import { usePathname } from 'next/navigation';
import { Navbar } from '@/components/navigation/navbar';
import { GrainOverlay } from '@/components/navigation/grain-overlay';
import { AppSessionProvider } from '@/components/providers/session-provider';
import { SmoothScrollProvider } from '@/components/providers/smooth-scroll-provider';

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname === '/admin' || pathname.startsWith('/admin/');

  if (isAdmin) {
    return <AppSessionProvider>{children}</AppSessionProvider>;
  }

  return (
    <SmoothScrollProvider>
      <AppSessionProvider>
        <Navbar />
        <GrainOverlay />
        {children}
      </AppSessionProvider>
    </SmoothScrollProvider>
  );
}
