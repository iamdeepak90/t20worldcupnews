import { notFound } from "next/navigation";
import { getPostBySlug, getAllPostSlugs, getLatestPosts } from "@/lib/queries";
import { formatDate, readTime } from "@/lib/utils";
import { generateBlogPostSchema, SchemaScript } from "@/lib/schema";
import Image from "next/image";
import Link from "next/link";
import Sidebar from "@/components/Sidebar";

export async function generateStaticParams() {
  const posts = await getAllPostSlugs();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const post = await getPostBySlug(resolvedParams.slug);

  if (!post) {
    return { title: "Post Not Found" };
  }

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      images: post.coverImage ? [post.coverImage.url] : [],
    },
  };
}

export default async function BlogPost({ params }) {
  const resolvedParams = await params;
  const post = await getPostBySlug(resolvedParams.slug, {
    next: { revalidate: 3600 },
  });

  if (!post) notFound();

  const schemas = generateBlogPostSchema(post);

  const posts = await getLatestPosts(3);

  return (
<>
    <SchemaScript schema={schemas} />

    <main className="container">
      <div className="layout">
        <article>
          <div className="badge-row">
            {post.categories.map((cat) => (
              <span key={cat.name} className="badge">
                {cat.name}
              </span>
            ))}
          </div>

          <h1 className="hero-title">{post.title}</h1>

          <p className="meta hero-meta">
            By {post.author?.name} | {formatDate(post.date)} |{" "}
            {readTime(post.content.html)}
          </p>

          {post.coverImage && (
            <Image
              src={post.coverImage.url}
              alt={post.coverImage.alt || post.title}
              className="post-hero"
              width={750}
              height={400}
              placeholder="blur"
              blurDataURL={`/_next/image?url=${post.coverImage.url}&w=16&q=1`}
            />
          )}

          <div className="spacer-12" />

          <div
            className="card article-card"
            dangerouslySetInnerHTML={{ __html: post.content.html }}
          />

          <div className="section-head">
            <h3 className="section-title">Related Posts</h3>
          </div>

          <section className="grid-3 mb-1">
            {posts.map((p) => (
              <Link
                key={p.slug}
                className="card card-hover category-card"
                href={`/${p.slug}`}
              >
                <Image
                  src={p.coverImage.url}
                  width={350}
                  height={220}
                  alt="cricket"
                  className="thumb"
                />

                <div className="row-end card-topline">
                  <span className="meta">{formatDate(p.date)}</span>
                </div>

                <div className="card-title">{p.title}</div>
              </Link>
            ))}
          </section>
        </article>

        <Sidebar />
      </div>
    </main>
</>
  );
}