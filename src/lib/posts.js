import { fetchHygraph } from "./hygraph";

const LATEST_POSTS_QUERY = `
  query LatestPosts($limit: Int!) {
    posts(
      orderBy: publishedAt_DESC
      first: $limit
    ) {
      title
      slug
      excerpt
      date
      coverImage {
        url
        altText
      }
      categories{
        name
      }
      author{
        name
      }
    }
  }
`;

export async function getLatestPosts(limit = 5, options = {}) {
  const data = await fetchHygraph(
    LATEST_POSTS_QUERY,
    { limit },
    options
  );

  return data.posts;
}


// Get single post by slug
const POST_BY_SLUG_QUERY = `
  query GetPost($slug: String!) {
    post(where: { slug: $slug }) {
      id
      title
      slug
      content {
        html
      }
      excerpt
      coverImage {
        url
        altText
      }
      author {
        name
      }
      categories {
        name
        slug
      }
      publishedAt
    }
  }
`;

export async function getPostBySlug(slug, options = {}) {
  const data = await fetchHygraph(
    POST_BY_SLUG_QUERY,
    { slug },
    options
  );

  return data.post;
}

// Get posts by category slug
const POSTS_BY_CATEGORY_QUERY = `
  query PostsByCategory($categorySlug: String!, $limit: Int) {
    posts(
      where: { categories_some: { slug: $categorySlug } }
      orderBy: publishedAt_DESC
      first: $limit
    ) {
      id
      title
      slug
      excerpt
      publishedAt
      coverImage {
        url
        altText
      }
      categories {
        name
        slug
      }
      author {
        name
      }
    }
  }
`;

export async function getPostsByCategory(categorySlug, limit = 10, options = {}) {
  const data = await fetchHygraph(
    POSTS_BY_CATEGORY_QUERY,
    { categorySlug, limit },
    options
  );

  return data.posts;
}

// Get all post slugs (for generateStaticParams)
const ALL_POST_SLUGS_QUERY = `
  query GetAllPostSlugs {
    posts {
      slug
    }
  }
`;

export async function getAllPostSlugs(options = {}) {
  const data = await fetchHygraph(ALL_POST_SLUGS_QUERY, {}, options);
  return data.posts || [];
}