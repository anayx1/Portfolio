import type { MetadataRoute } from 'next';
import { isSearchIndexable, siteOrigin } from '@/lib/site';

export default function sitemap(): MetadataRoute.Sitemap {
  // All sections share one page. Redirects and fragment URLs aren't separate pages.
  return isSearchIndexable ? [{ url: `${siteOrigin}/` }] : [];
}
