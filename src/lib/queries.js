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
      date
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
      date
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
    posts(orderBy: updatedAt_DESC) {
      slug
      updatedAt
    }
  }
`;

export async function getAllPostSlugs(options = {}) {
  const data = await fetchHygraph(ALL_POST_SLUGS_QUERY, {}, options);
  return data.posts || [];
}


// Get all Categories
const ALL_CATEGORY_QUERY = `
  query GetAllCategory {
    categories {
      id
      name
      slug
    }
  }
`;

export async function GetAllCategory(options = {}) {
  const data = await fetchHygraph(ALL_CATEGORY_QUERY, {}, options);
  return data.categories || [];
}



const SEARCH_POSTS_QUERY = `
  query SearchPosts($searchTerm: String!) {
    posts(
      where: {
        _search: $searchTerm
      }
      first: 20
    ) {
      id
      title
      slug
      excerpt
      date
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
    }
  }
`;

export async function searchPosts(searchTerm, options = {}) {
  if (!searchTerm || searchTerm.trim().length < 2) {
    return [];
  }

  const data = await fetchHygraph(
    SEARCH_POSTS_QUERY,
    { searchTerm: searchTerm.trim() },
    options
  );

  return data.posts || [];
}




// Get single page by slug
const PAGE_BY_SLUG_QUERY = `
  query GetPage($slug: String!) {
    page(where: { slug: $slug }) {
      id
      title
      content {
        html
      }
    }
  }
`;

export async function getPageBySlug(slug, options = {}) {
  const data = await fetchHygraph(
    PAGE_BY_SLUG_QUERY,
    { slug },
    options
  );

  return data.page;
}



const RELATED_POSTS_QUERY = `
  query GetRelatedPostsMulti($slug: String!, $categorySlugs: [String!]!, $limit: Int!) {
    posts(
      where: {
        slug_not: $slug
        categories_some: { slug_in: $categorySlugs }
      }
      orderBy: publishedAt_DESC
      first: $limit
    ) {
      id
      title
      slug
      coverImage {
        url
        altText
      }
    }
  }
`;

export async function getRelatedPosts(currentSlug, categorySlugs, limit = 3, options = {}) {
  const data = await fetchHygraph(
    RELATED_POSTS_QUERY,
    { slug: currentSlug, categorySlugs, limit },
    options
  );

  return data.posts || [];
}