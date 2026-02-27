import type { MetadataRoute } from 'next';
import { getAllNeighborhoods } from '@/lib/data/neighborhoods';
import { getAllArticles } from '@/lib/data/articles';

const BASE_URL = 'https://lincolnpropertyintelligence.com';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/neighborhoods`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/market-intelligence`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/market-intelligence/january-2026`,
      lastModified: new Date('2026-02-28'),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/sell-your-home`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/sell-your-home/seller-readiness-score`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/invest-in-lincoln`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/invest-in-lincoln/investment-calculator`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/ask-a-realtor`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
  ];

  // Dynamic neighborhood pages
  const neighborhoods = await getAllNeighborhoods();
  const neighborhoodPages: MetadataRoute.Sitemap = neighborhoods.map(
    (neighborhood) => ({
      url: `${BASE_URL}/neighborhoods/${neighborhood.slug}`,
      lastModified: new Date(neighborhood.market.lastUpdated),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    })
  );

  // Dynamic article pages
  const articles = await getAllArticles();
  const articlePages: MetadataRoute.Sitemap = articles.map((article) => ({
    url: `${BASE_URL}/ask-a-realtor/${article.frontmatter.slug}`,
    lastModified: new Date(
      article.frontmatter.updatedAt || article.frontmatter.publishedAt
    ),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  return [...staticPages, ...neighborhoodPages, ...articlePages];
}
