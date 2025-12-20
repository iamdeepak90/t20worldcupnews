import Sidebar from '@/components/Sidebar';
import { getPostsByCategory } from '@/lib/queries';
import { formatDate } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';

export default async function CategoryPage({ params }) {
  const resolvedParams = await params;
  const posts = await getPostsByCategory(resolvedParams.slug, 20, {
    next: { revalidate: 3600 }
  });

  console.log(posts);

  return (
<main className="container">
  <div className="layout">
    <section>
      <div
        style={{
          alignItems: "baseline",
          display: "flex",
          flexWrap: "wrap",
          gap: "12px",
          justifyContent: "space-between",
        }}>
        <h1
          style={{
            fontSize: "1.7rem",
            letterSpacing: ".25px",
            margin: "0",
          }}>
          Category: {resolvedParams.slug.replace(/-/g, ' ').toUpperCase()}
        </h1>
      </div>
      
      {posts.map((post) => (
      <article key={post.id} className="card card-hover post-card">
        <div className="post-row">
          <div className="post-media">
            <Image src={post.coverImage.url} width={300} height={240} alt="cricket"/>
          </div>
          <div className="post-body">
            <div
              style={{
                alignItems: "center",
                display: "flex",
                flexWrap: "wrap",
                gap: "10px",
                justifyContent: "space-between",
              }}>
              {post.categories.map((cat) => (
                <span key={cat.name} className="badge">{cat.name}</span>
              ))}
              <span className="meta">{formatDate(post.date)}</span>
            </div>
            <div className="post-title">
              <Link href={`/${post.slug}`}>{post.title}</Link>
            </div>
            <p className="meta post-excerpt">{post.excerpt}</p>
            <Link href={`/${post.slug}`} className="small-link">Read more →</Link>
          </div>
        </div>
      </article>

      ))}
    </section>

    <Sidebar />
  </div>
</main>
  );
}