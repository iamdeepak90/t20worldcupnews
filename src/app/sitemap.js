import { getAllPostSlugs } from '@/lib/queries';

export default async function sitemap() {
  const posts = await getAllPostSlugs();
  const SITE_URL = 'https://t20worldcupnews.com';

  // Generate sitemap entries for blog posts
  const postEntries = posts.map((post) => ({
    url: `${SITE_URL}/${post.slug}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'daily',
    priority: 0.8,
  }));

  // Static pages
  const staticPages = [
    /* {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${SITE_URL}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${SITE_URL}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    }, */
  ];

  return [...staticPages, ...postEntries];
}

export const revalidate = 3600;