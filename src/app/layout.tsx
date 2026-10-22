import type { Metadata } from 'next';
import './globals.css';
import { site } from '@/data/site';
import { Footer } from '@/components/Footer';
import { Navbar } from '@/components/Navbar';

export const metadata: Metadata = {
  icons: { icon: '/logos/logo-club.png' },
  metadataBase: new URL('https://rckasthamandap.org.np'),
  title: { default: site.clubName, template: `%s | ${site.clubName}` },
  description: 'Serving Kathmandu with compassion, fellowship and purposeful action. Rotary International District 3292.',
  openGraph: { title: site.clubName, description: site.theme, type: 'website' }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" data-scroll-behavior="smooth"><body><Navbar /><main>{children}</main><Footer /></body></html>;
}
