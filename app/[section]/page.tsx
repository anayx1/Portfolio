import { permanentRedirect, notFound } from 'next/navigation';
const sections: Record<string, string> = { about: 'about', projects: 'projects', shopifyProjects: 'projects', experience: 'experience', contact: 'contact' };
export default async function LegacySection({ params }: { params: Promise<{ section: string }> }) {
  const { section } = await params;
  if (!sections[section]) notFound();
  permanentRedirect('/#' + sections[section]);
}
