// lib/seo.js - SIMPLE UNIFIED SEO FUNCTION
// One function for ALL pages - No complexity, just works

const SITE_URL = 'https://t20worldcupnews.com';
const SITE_NAME = 'T20 World Cup News';
const TWITTER_HANDLE = '@DeepakWin8';

/**
 * Generate metadata for any page type
 * 
 * @param {Object} config
 * @param {string} config.title - Page title
 * @param {string} config.description - Page description
 * @param {string} config.url - Page URL (relative or absolute)
 * @param {string} [config.image] - Image URL (relative or absolute)
 * @param {string} [config.type] - Open Graph type: 'website' or 'article' (default: 'website')
 * @param {boolean} [config.noIndex] - Prevent indexing (default: false)
 * @returns {Object} Next.js metadata object
 */
export function generateSEO({
  title,
  description,
  url,
  image,
  type = 'website',
  noIndex = false,
} = {}) {
  // Convert relative URLs to absolute
  const absoluteUrl = url?.startsWith('http') ? url : `${SITE_URL}${url || ''}`;
  const absoluteImage = image?.startsWith('http') 
    ? image 
    : `${SITE_URL}${image}`;

  return {
    title: title || SITE_NAME,
    description: description,

    alternates: {
      canonical: absoluteUrl,
    },

    robots: {
      index: !noIndex,
      follow: !noIndex,
      googleBot: {
        index: !noIndex,
        follow: !noIndex,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },

    openGraph: {
      type,
      url: absoluteUrl,
      title: title || SITE_NAME,
      description: description,
      siteName: SITE_NAME,
      locale: 'en_US',
      images: [
        {
          url: absoluteImage,
          secureUrl: absoluteImage,
          width: 730,
          height: 383,
          alt: title || SITE_NAME,
          type: 'image/webp',
        },
      ],
    },

    twitter: {
      card: 'summary_large_image',
      site: TWITTER_HANDLE,
      creator: TWITTER_HANDLE,
      title: title || SITE_NAME,
      description: description,
      images: {
        url: absoluteImage,
        alt: title || SITE_NAME,
      },
    },
  };
}