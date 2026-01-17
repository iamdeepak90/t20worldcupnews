const SITE_URL = 'https://t20worldcupnews.com';
const SITE_NAME = 'T20 World Cup News';
const LOGO_URL = `${SITE_URL}/logo.webp`;

/**
 * Extract FAQ questions and answers from HTML content
 * Optimized with single regex pass
 */
export function extractFAQFromHTML(htmlContent) {
  if (!htmlContent) return [];

  const faqs = [];
  
  // Match FAQ section - more flexible pattern
  const faqMatch = htmlContent.match(/<h2[^>]*>(?:Frequently Asked Questions|FAQ).*?<\/h2>(.*?)(?=<h2|<footer|$)/is);
  
  if (!faqMatch) return faqs;
  
  const faqSection = faqMatch[1];
  
  // Extract Q&A pairs with improved regex
  const regex = /<h3[^>]*>(.*?)<\/h3>\s*<p[^>]*>(.*?)<\/p>/gs;
  let match;
  
  while ((match = regex.exec(faqSection)) !== null) {
    const question = match[1].replace(/<[^>]+>/g, '').trim();
    const answer = match[2].replace(/<[^>]+>/g, '').trim();
    
    if (question && answer) {
      faqs.push({ question, answer });
    }
  }
  
  return faqs;
}

/**
 * Generate FAQ Schema
 */
export function generateFAQSchema(faqs) {
  if (!faqs || faqs.length === 0) return null;

  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

/**
 * Organization Schema - This will be included in every page's @graph
 */
export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${SITE_URL}/#organization`,
    name: SITE_NAME,
    url: SITE_URL,
    logo: {
      '@type': 'ImageObject',
      '@id': `${SITE_URL}/#logo`,
      url: LOGO_URL,
      contentUrl: LOGO_URL,
      width: 600,
      height: 600,
      caption: SITE_NAME,
    },
    sameAs: [
      'https://twitter.com/DeepakWin8',
      'https://www.linkedin.com/in/mail2dk'
    ],
  };
}

/**
 * WebSite Schema - For homepage
 */
export function generateWebsiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    url: SITE_URL,
    name: SITE_NAME,
    description: 'Your front-row seat to T20 World Cup 2026. Get the full schedule (Fixtures PDF), live ball-by-ball scores and coverage of India vs Pakistan from Colombo.',
    publisher: {
      '@id': `${SITE_URL}/#organization`,
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${SITE_URL}/search?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };
}

/**
 * Enhanced NewsArticle Schema
 */
export function generateNewsArticleSchema(post) {
  if (!post) return null;

  const imageUrl = post.coverImage?.url;
  const imageW = post.coverImage?.width;
  const imageH = post.coverImage?.height;
  const articleUrl = `${SITE_URL}/${post.slug}`;
  
  const publishDate = post.date ? new Date(post.date).toISOString() : new Date().toISOString();
  const modifiedDate = post.updatedAt ? new Date(post.updatedAt).toISOString() : publishDate;

  return {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    '@id': articleUrl,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': articleUrl,
    },
    headline: post.title,
    description: post.excerpt || post.title,
    ...(imageUrl && {
      image: {
        '@type': 'ImageObject',
        url: imageUrl,
        width: imageW,
        height: imageH,
      }
    }),

    datePublished: publishDate,
    dateModified: modifiedDate,

    author: {
      '@type': 'Person',
      name: post.author?.name || 'Deepak M.',
      url: SITE_URL,
      ...(post.author?.jobTitle && { jobTitle: post.author.jobTitle }),
    },
    
    publisher: {
      '@type': 'Organization',
      '@id': `${SITE_URL}/#organization`,
      name: SITE_NAME,
      logo: {
        '@type': 'ImageObject',
        url: LOGO_URL,
        width: 600,
        height: 600,
      },
    },
    
    ...(post.categories?.[0]?.name && { articleSection: post.categories[0].name }),
    ...(post.categories?.length > 0 && { 
      keywords: post.categories.map(cat => cat.name).join(', ') 
    }),
    
    inLanguage: 'en-US',
  };
}

/**
 * BreadcrumbList Schema
 */
export function generateBreadcrumbSchema(breadcrumbs) {
  if (!breadcrumbs || breadcrumbs.length === 0) return null;

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.name,
      item: crumb.url === '/' ? SITE_URL : `${SITE_URL}${crumb.url.startsWith('/') ? '' : '/'}${crumb.url}`,
    })),
  };
}

/**
 * Generate CollectionPage Schema for Category/Archive Pages
 */
export function generateCollectionPageSchema(category, posts) {
  if (!category) return null;

  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    '@id': `${SITE_URL}/category/${category.slug}`,
    url: `${SITE_URL}/category/${category.slug}`,
    name: `${category.name} - T20 World Cup 2026`,
    description: category.seoOverride?.description || category.description || `Latest ${category.name} news and updates`,
    inLanguage: 'en-US',
    isPartOf: {
      '@id': `${SITE_URL}/#website`,
    },
    ...(posts && posts.length > 0 && {
      mainEntity: {
        '@type': 'ItemList',
        itemListElement: posts.slice(0, 10).map((post, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          url: `${SITE_URL}/${post.slug}`,
          name: post.title,
        })),
      }
    }),
  };
}

/**
 * Generate SportsEvent Schema for Match Coverage
 */
export function generateSportsEventSchema(match) {
  if (!match) return null;

  return {
    '@context': 'https://schema.org',
    '@type': 'SportsEvent',
    '@id': match.url,
    name: `${match.team1} vs ${match.team2} - T20 World Cup 2026`,
    description: match.description,
    startDate: match.date,
    sport: 'Cricket',
    ...(match.venue && {
      location: {
        '@type': 'Place',
        name: match.venue,
        ...(match.city || match.country) && {
          address: {
            '@type': 'PostalAddress',
            ...(match.city && { addressLocality: match.city }),
            ...(match.country && { addressCountry: match.country }),
          }
        },
      }
    }),
    competitor: [
      {
        '@type': 'SportsTeam',
        name: match.team1,
      },
      {
        '@type': 'SportsTeam',
        name: match.team2,
      },
    ],
    organizer: {
      '@type': 'Organization',
      name: 'International Cricket Council (ICC)',
      url: 'https://www.icc-cricket.com',
    },
  };
}

/**
 * Generate Combined Schema for Blog Post using @graph
 * Organization schema is ALWAYS included first
 */
export function generateBlogPostSchema(post) {
  const schemas = [];

  // ALWAYS add Organization schema first on every page
  schemas.push(generateOrganizationSchema());

  // Build proper breadcrumb hierarchy
  const breadcrumbs = [
    { name: 'Home', url: '/' },
    { name: post.title, url: post.slug },
  ];

  // NewsArticle Schema (Main content)
  const articleSchema = generateNewsArticleSchema(post);
  if (articleSchema) schemas.push(articleSchema);

  // BreadcrumbList Schema
  const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbs);
  if (breadcrumbSchema) schemas.push(breadcrumbSchema);

  // FAQ Schema (if exists in content)
  if (post.content?.html) {
    const faqs = extractFAQFromHTML(post.content.html);
    if (faqs.length > 0) {
      const faqSchema = generateFAQSchema(faqs);
      if (faqSchema) schemas.push(faqSchema);
    }
  }

  // SportsEvent Schema (if match data exists)
  if (post.match) {
    const eventSchema = generateSportsEventSchema(post.match);
    if (eventSchema) schemas.push(eventSchema);
  }

  return {
    '@context': 'https://schema.org',
    '@graph': schemas,
  };
}

/**
 * Generate Combined Schema for Homepage
 * Organization schema is ALWAYS included first
 */
export function generateHomepageSchema(html) {
  const schemas = [];

  // ALWAYS add Organization schema first on every page
  schemas.push(generateOrganizationSchema());

  // Website Schema
  const websiteSchema = generateWebsiteSchema();
  if (websiteSchema) schemas.push(websiteSchema);

  // FAQ Schema (if exists)
  if (html) {
    const faqs = extractFAQFromHTML(html);
    if (faqs.length > 0) {
      const faqSchema = generateFAQSchema(faqs);
      if (faqSchema) schemas.push(faqSchema);
    }
  }

  return {
    '@context': 'https://schema.org',
    '@graph': schemas,
  };
}

/**
 * Generate Combined Schema for Category Page
 * Organization schema is ALWAYS included first
 */
export function generateCategoryPageSchema(category, posts) {
  const schemas = [];

  // ALWAYS add Organization schema first on every page
  schemas.push(generateOrganizationSchema());

  // CollectionPage Schema
  const collectionSchema = generateCollectionPageSchema(category, posts);
  if (collectionSchema) schemas.push(collectionSchema);

  // Breadcrumb Schema
  const breadcrumbs = [
    { name: 'Home', url: '/' },
    { name: category.name, url: `/category/${category.slug}` },
  ];
  const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbs);
  if (breadcrumbSchema) schemas.push(breadcrumbSchema);

  return {
    '@context': 'https://schema.org',
    '@graph': schemas,
  };
}

/**
 * Render Schema as JSON-LD script tag
 */
export function SchemaScript({ schema }) {
  if (!schema) return null;

  try {
    const schemaString = JSON.stringify(schema);
    
    return (
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: schemaString,
        }}
      />
    );
  } catch (error) {
    console.error('Error generating schema:', error);
    return null;
  }
}