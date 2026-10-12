import './globals.css';
import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import { AppShell } from '@/components/providers/app-shell';
import { salonConfig } from '@/lib/salon-config';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-serif' });

export const metadata: Metadata = {
  title: `${salonConfig.name} | Luxury hair and beauty studio`,
  description: 'Premium salon booking experience with styling, color, grooming, and bridal artistry.',
  metadataBase: new URL('http://localhost:3000')
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${playfair.variable} bg-bone text-ink antialiased`}>
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
