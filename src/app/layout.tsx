import './globals.css';
import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import { Navbar } from '@/components/navigation/navbar';
import { GrainOverlay } from '@/components/navigation/grain-overlay';
import { AppSessionProvider } from '@/components/providers/session-provider';
import { SmoothScrollProvider } from '@/components/providers/smooth-scroll-provider';
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
        <SmoothScrollProvider>
          <AppSessionProvider>
            <Navbar />
            <GrainOverlay />
            {children}
          </AppSessionProvider>
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
