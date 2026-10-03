// Override SITE_URL if the portfolio moves to a custom domain.
export const siteUrl = new URL(process.env.SITE_URL || 'https://anay.vercel.app');
export const siteOrigin = siteUrl.origin;
export const siteTitle = 'Anay Tiwari | Full Stack Developer Portfolio';
export const siteDescription = 'Anay Tiwari is a full-stack developer in Gurugram, India. Explore his portfolio of React, Next.js, Node.js, websites, production applications, and applied AI projects.';
export const isSearchIndexable = process.env.VERCEL_ENV !== 'preview' && process.env.NODE_ENV !== 'development';

export const profileStructuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Person',
      '@id': `${siteOrigin}/#person`,
      name: 'Anay Tiwari',
      url: `${siteOrigin}/`,
      image: `${siteOrigin}/images/avatar.webp`,
      jobTitle: 'Full-stack Developer',
      description: 'Full-stack developer and creative engineer based in Gurugram, India.',
      homeLocation: { '@type': 'Place', name: 'Gurugram, Haryana, India' },
      sameAs: ['https://www.linkedin.com/in/anaytiwari/'],
      knowsAbout: ['React', 'Next.js', 'Node.js', 'MongoDB', 'Web Development', 'Applied AI'],
      mainEntityOfPage: { '@id': `${siteOrigin}/#profile` },
    },
    {
      '@type': 'WebSite',
      '@id': `${siteOrigin}/#website`,
      url: `${siteOrigin}/`,
      name: 'Anay Tiwari',
      description: siteDescription,
      inLanguage: 'en',
      publisher: { '@id': `${siteOrigin}/#person` },
    },
    {
      '@type': 'ProfilePage',
      '@id': `${siteOrigin}/#profile`,
      url: `${siteOrigin}/`,
      name: siteTitle,
      description: siteDescription,
      inLanguage: 'en',
      isPartOf: { '@id': `${siteOrigin}/#website` },
      mainEntity: { '@id': `${siteOrigin}/#person` },
    },
  ],
};
