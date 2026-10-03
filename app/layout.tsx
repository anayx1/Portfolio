import type { Metadata } from 'next';
import localFont from 'next/font/local';
import { isSearchIndexable, siteDescription, siteOrigin, siteTitle, siteUrl } from '@/lib/site';
import './globals.css';

const spaceGrotesk = localFont({
  src: '../public/fonts/space-grotesk.woff2',
  variable: '--font-space-grotesk',
  weight: '400 700',
  display: 'swap',
  adjustFontFallback: false,
});
const dmSans = localFont({
  src: '../public/fonts/dm-sans.woff2',
  variable: '--font-dm-sans',
  weight: '400 700',
  display: 'swap',
  adjustFontFallback: false,
});

export const metadata: Metadata = {
  metadataBase: new URL(siteOrigin),
  title: siteTitle,
  description: siteDescription,
  applicationName: 'Anay Tiwari Portfolio',
  authors: [{ name: 'Anay Tiwari', url: siteUrl }],
  creator: 'Anay Tiwari',
  robots: { index: isSearchIndexable, follow: true },
  verification: { google: process.env.GOOGLE_SITE_VERIFICATION || undefined },
  icons: { icon: '/favicon.svg', shortcut: '/favicon.svg' },
  openGraph: {
    title: siteTitle,
    description: siteDescription,
    url: siteOrigin,
    siteName: 'Anay Tiwari',
    locale: 'en_IN',
    type: 'website',
    images: [{ url: '/images/hero-sculpture.webp', width: 1254, height: 1254, alt: 'Chrome and orange sculpture from Anay Tiwari’s portfolio' }],
  },
  twitter: { card: 'summary_large_image', title: siteTitle, description: siteDescription, images: ['/images/hero-sculpture.webp'] },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" className={`${spaceGrotesk.variable} ${dmSans.variable}`} suppressHydrationWarning><body>{children}</body></html>;
}
