import type { Metadata } from 'next';
import './globals.css';
import { Footer } from '@/components/Footer';
import { Navbar } from '@/components/Navbar';

export const metadata: Metadata = {
  metadataBase: new URL('https://rckasthamandap.org'),
  title: { default: 'Rotary Club of Kasthamandap', template: '%s | Rotary Club of Kasthamandap' },
  description: 'Serving Kathmandu with compassion, fellowship and purposeful action. Rotary International District 3292.',
  openGraph: { title: 'Rotary Club of Kasthamandap', description: 'Serve with Soul', type: 'website' }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body><Navbar /><main>{children}</main><Footer /></body></html>;
}
