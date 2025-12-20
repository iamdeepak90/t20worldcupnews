import { notFound } from "next/navigation";
import { getPostBySlug, getAllPostSlugs, GetAllCategory, getLatestPosts } from "@/lib/queries";
import { formatDate, readTime } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import Sidebar from "@/components/Sidebar";

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
      title: "Post Not Found",
    };
  }

  return {
    title: post.title,
    description:
      post.excerpt,
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
    next: { revalidate: 3600 },
  });
  if (!post) {
    notFound();
  }
  const posts = await getLatestPosts(3);

  return (
    <main className="container">
      <div className="layout">
        <article>
          {post.categories.map((cat) => (
            <span key={cat.name} className="badge">{cat.name}</span>
          ))}
          <h1 
            style={{
              fontSize: "2rem",
              lineHeight: "1.15",
              margin: "10px 0 6px",
            }}
          >
            {post.title}
          </h1>
          <p
            className="meta"
            style={{
              margin: "0 0 12px",
            }}
          >
            By {post.author?.name} | {formatDate(post.date)} | {readTime(post.content.html)}
          </p>
          {post.coverImage && (
            <img
              src={post.coverImage.url}
              alt={post.coverImage.alt || post.title}
              className="post-hero"
            />
          )}
          <div
            style={{
              height: "12px",
            }}
          />
          <div
            className="card article-card"
            dangerouslySetInnerHTML={{ __html: post.content.html }}
          />


          <div className="section-head">
              <h3 className="section-title">Related Posts</h3>
            </div>
            <section className="grid-3 mb-1">
          
              {posts.map((post) => (
                <Link key={post.slug} className="card card-hover category-card" href={`/${post.slug}`}>
                  <Image src={post.coverImage.url} width={350} height={220} alt="cricket" className="thumb" />
                  <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '10px', marginBottom: '6px'}}>
                    <span className="meta">{formatDate(post.date)}</span>
                  </div>
                  <div style={{fontWeight: 700, marginBottom: '4px'}}>{post.title}</div>
                </Link>
              ))}
          
            </section>
        </article>
        
        <Sidebar />
      </div>
    </main>
  );
}
