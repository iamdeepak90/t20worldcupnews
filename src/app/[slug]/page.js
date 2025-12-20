import { notFound } from 'next/navigation';
import { getPostBySlug, getAllPostSlugs } from '@/lib/posts';

// Generate static params for all posts
export async function generateStaticParams() {
  const posts = await getAllPostSlugs();
  
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

// Generate metadata for SEO
export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const post = await getPostBySlug(resolvedParams.slug);
  
  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  return {
    title: post.title,
    description: post.excerpt || post.content.html.substring(0, 160).replace(/<[^>]*>/g, ''),
    openGraph: {
      title: post.title,
      images: post.coverImage ? [post.coverImage.url] : [],
    },
  };
}

// Page component
export default async function BlogPost({ params }) {
  const resolvedParams = await params;
  const post = await getPostBySlug(resolvedParams.slug, {
    next: { revalidate: 3600 }
  });

  if (!post) {
    notFound();
  }

  return (
    <article className="max-w-4xl mx-auto px-4 py-8">
      {post.coverImage && (
        <img 
          src={post.coverImage.url} 
          alt={post.coverImage.altText || post.title}
          className="w-full h-96 object-cover rounded-lg mb-8"
        />
      )}
      
      <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
      
      <div className="flex items-center gap-4 text-gray-600 mb-8">
        {post.author && <span>By {post.author.name}</span>}
        {post.publishedAt && (
          <time dateTime={post.publishedAt}>
            {new Date(post.publishedAt).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'short',
              day: 'numeric'
            })}
          </time>
        )}
      </div>

      {post.categories && post.categories.length > 0 && (
        <div className="flex gap-2 mb-6">
          {post.categories.map((category) => (
            <a
              key={category.slug}
              href={`/category/${category.slug}`}
              className="px-3 py-1 bg-gray-200 rounded-full text-sm hover:bg-gray-300"
            >
              {category.name}
            </a>
          ))}
        </div>
      )}

      <div 
        className="prose prose-lg max-w-none"
        dangerouslySetInnerHTML={{ __html: post.content.html }}
      />
    </article>
  );
}