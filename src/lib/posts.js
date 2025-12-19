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
      publishedAt
      coverImage {
        url
        altText
      }
      categories{
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