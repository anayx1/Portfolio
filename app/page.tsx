import type { Metadata } from 'next';
import Portfolio from '@/components/portfolio';
import { profileStructuredData } from '@/lib/site';

export const metadata: Metadata = { alternates: { canonical: '/' } };

export default function Home() {
  return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(profileStructuredData).replace(/</g, '\\u003c') }} /><Portfolio /></>;
}
