import { getAllPostSlugs } from '@/lib/queries';

const SITE_URL = 'https://t20worldcupnews.com';

export default async function sitemap() {
  // Fetch all post slugs from Hygraph
  const posts = await getAllPostSlugs();

  // Generate sitemap entries for blog posts
  const postEntries = posts.map((post) => ({
    url: `${SITE_URL}/${post.slug}`,
    lastModified: post.updatedAt ? new Date(post.updatedAt) : new Date(),
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