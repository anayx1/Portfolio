# Search setup for Anay Tiwari

The production URL defaults to `https://anay.vercel.app`. The homepage includes its canonical URL, profile structured data, a descriptive title, and social metadata. `/robots.txt` allows production crawling and points to `/sitemap.xml`. Vercel previews and development builds are excluded from indexing.

After deploying this version to Vercel:

1. Add `https://anay.vercel.app/` as a URL-prefix property in [Google Search Console](https://search.google.com/search-console).
2. Choose the HTML tag verification method. Copy only the token from the tag's `content` attribute into the Vercel environment variable `GOOGLE_SITE_VERIFICATION`, then redeploy and complete verification.
3. Submit `https://anay.vercel.app/sitemap.xml` in Search Console's Sitemaps page.
4. Inspect `https://anay.vercel.app/` with URL Inspection, run the live test, and request indexing.
5. Add the portfolio URL to your LinkedIn profile's website field so visitors can find the same portfolio from your existing public profile.

If you switch domains, set `SITE_URL` to the new public origin before rebuilding. This updates the canonical URL, sitemap, social URLs, and structured data together. Keep the production deployment public so Google can fetch it.

Google decides whether and when to index and rank a page. Hidden keywords and a keywords meta tag don't improve this setup. [Google's indexing guidance](https://developers.google.com/search/docs/crawling-indexing/ask-google-to-recrawl) explains the remaining indexing process.
