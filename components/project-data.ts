export type PortfolioProject = {
  id: string; name: string; label: string; category: 'Product' | 'Website';
  image: string; color: string; url?: string; tags: string[];
  description: string; details: string[];
};
export const projects: PortfolioProject[] = [
  {
    id: 'dli', name: 'Design Library of India', label: 'Fabric discovery, with intelligence.', category: 'Product',
    image: '/images/dli-cover.webp', color: '#ba492e',
    tags: ['Next.js', 'Node.js', 'Qdrant', 'CLIP', 'OpenRouter', 'Razorpay', 'Shiprocket'],
    description: 'A governed, multi-tenant B2B platform connecting textile and garment exporters with design discovery, sample ordering, and logistics.',
    details: ['Image-to-image vector search with Qdrant and CLIP ViT-L/14 embeddings, served through a Python FastAPI microservice.', 'An OpenRouter LLM pipeline with a custom prompt layer for generating design mockups from cloth swatches and uploads.', 'Approval-gated onboarding, full tenant isolation, Razorpay payments, and Shiprocket logistics across the order lifecycle.'],
  },
  {
    id: 'mantra', name: 'MantraPOS', label: 'From the first order to the last table.', category: 'Product',
    image: '/images/mantrapos-cover.webp', color: '#ed8b56', url: 'https://www.mantrapos.com/', tags: ['Next.js', 'Django', 'AWS'],
    description: 'A restaurant POS system running daily across counter, kitchen, and admin workflows.',
    details: ['QR-based customer ordering and Kitchen Order Ticket flows bring service and kitchen operations together.', 'A real-time admin dashboard tracks sales, orders, item performance, and menu analytics.', 'Built with Next.js and Django, and shipped to AWS.'],
  },
  {
    id: 'vikava', name: 'Vikava Labs', label: 'Big ideas. A clear way forward.', category: 'Website', image: '/images/vikava-cover.webp', color: '#ff5a36', url: 'https://vikavalabs.com/', tags: ['Brand website', 'Responsive development'],
    description: 'A digital home for a founder-first business-building ecosystem spanning strategy, design, sourcing, marketing, and commerce.',
    details: ['Website development for a business-building platform focused on clarity, governance, and accountable execution.', 'Explore the live website for its services, founder community, and brand story.'],
  },
  {
    id: 'mimaansa', name: 'Mimaansa', label: 'Indian roots. Global connections.', category: 'Website', image: '/images/mimaansa-cover.webp', color: '#ae7550', url: 'https://www.mimaansa.com/', tags: ['Brand website', 'Responsive development'],
    description: 'A sourcing and export website connecting global buyers with Indian apparel, home furnishings, fabrics, and lifestyle products.',
    details: ['Website development for an India-based agency with an emphasis on ethical sourcing and thoughtful partnerships.', 'The experience introduces product categories, sourcing services, and the journey from consultation to delivery.'],
  },
  {
    id: 'sheemit', name: 'Sheemit Agro Fresh', label: 'A fresh perspective on the harvest.', category: 'Website', image: '/images/sheemit-cover.webp', color: '#71875f', url: 'https://www.sheemitagro.com/', tags: ['Brand website', 'Responsive development'],
    description: 'A fresh web presence for a premium fruit importer connecting global farms with Indian markets.', details: ['Website development for Sheemit Agro Fresh and its B2B fruit distribution offering.', 'The experience introduces the brand, premium fruit varieties, sourcing process, and quality standards.'],
  },
  {
    id: 'byg', name: 'BYG Events', label: 'Moments worth making a fuss about.', category: 'Website', image: '/images/byg-cover.webp', color: '#7e2438', url: 'https://byg-pli1.vercel.app/', tags: ['Brand website', 'Responsive development'],
    description: 'An expressive website for purposeful weddings, private parties, and celebrations.', details: ['Website development for an events brand rooted in cultural sensitivity, thoughtful planning, and meaningful celebrations.', 'Explore weddings, ceremonies, special occasions, and corporate events on the live website.'],
  },
  {
    id: 'kleanfix', name: 'Kleanfix', label: 'Clean systems. Clear thinking.', category: 'Website', image: '/images/kleanfix-cover.webp', color: '#668a91', url: 'https://kleanfix.vercel.app/', tags: ['Brand website', 'Responsive development'],
    description: 'A structured web experience for cleaning chemistry, manufacturing, and OEM execution.', details: ['Website development for a cleaning and hygiene systems business.', 'The website connects product discovery with industries, manufacturing, private-label requirements, and export capabilities.'],
  },
  {
    id: 'nirvaana', name: 'Nirvaana Hills', label: 'A little closer to a slower life.', category: 'Website', image: '/images/nirvaana-cover.webp', color: '#788064', url: 'https://nirvaana-hill.vercel.app/', tags: ['Property website', 'Responsive development'],
    description: 'A nature-led digital experience for a farmland community in the Aravalli foothills.', details: ['Website development for Nirvaana Hills, introducing its landscape, lifestyle, and community.', 'The experience guides visitors through amenities, location, brochures, and site-visit enquiries.'],
  },
];
