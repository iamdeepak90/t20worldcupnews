import { getPostsByCategory } from '@/lib/posts';

export default async function CategoryPage({ params }) {
  const resolvedParams = await params;
  const posts = await getPostsByCategory(resolvedParams.slug, 20, {
    next: { revalidate: 3600 }
  });

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Category: {resolvedParams.slug}</h1>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post) => (
          <a 
            key={post.id} 
            href={`/${post.slug}`}
            className="block group"
          >
            {post.coverImage && (
              <img 
                src={post.coverImage.url} 
                alt={post.coverImage.altText || post.title}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
            )}
            <h2 className="text-xl font-semibold group-hover:text-blue-600">
              {post.title}
            </h2>
            {post.excerpt && (
              <p className="text-gray-600 mt-2">{post.excerpt}</p>
            )}
          </a>
        ))}
      </div>
    </div>
  );
}