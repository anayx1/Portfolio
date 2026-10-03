import type { MetadataRoute } from 'next';
import { isSearchIndexable, siteOrigin } from '@/lib/site';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', ...(isSearchIndexable ? { allow: '/' } : { disallow: '/' }) },
    ...(isSearchIndexable ? { sitemap: `${siteOrigin}/sitemap.xml` } : {}),
  };
}
