import Image from "next/image";
import cricket from "@/images/cricket.webp";
import { getLatestPosts } from "@/lib/posts";

export default async function Home() {
const posts = await getLatestPosts(3);

return (
<>
<main className="container">
  <section className="hero">
    <div className="hero-grid">
      <div className="hero-copy">
        {posts[0].categories.map((cat) => (
          <span key={cat.name} className="badge">{cat.name}</span>
        ))}
        <h1 style={{margin: '10px 0 8px', fontSize: '2rem', lineHeight: '1.15'}}>{posts[0].title}</h1>
        <p className="meta" style={{margin: '0 0 12px'}}>By Editorial Desk · Dec 19, 2025 · 6 min read</p>
        <p style={{margin: '0 0 14px'}}>{posts[0].excerpt}</p>
        <div style={{display: 'flex', gap: '10px', flexWrap: 'wrap'}}>
          <a className="btn" href="post.html">Read this News ↗</a>
        </div>
      </div>
      <div className="hero-media">
        <Image
          src={posts[0].coverImage.url} 
          width={500}
          height={350}
          alt="cricket"
          priority
          fetchPriority="high"
        />
      </div>
    </div>
  </section>

  <div className="section-head">
    <h2 className="section-title">Top Categories</h2>
    <a className="small-link" href="listing.html">View all</a>
  </div>
  <section className="grid-3">

    {posts.map((post) => (
      <a key={post.slug} className="card card-hover category-card" href="#">
        <Image src={post.coverImage.url} width={350} height={220} alt="cricket" className="thumb" />
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '10px', marginBottom: '6px'}}>
          {post.categories.map((cat) => (
            <span key={cat.name} className="badge">{cat.name}</span>
          ))}
          <span className="meta">Dec 17, 2025</span>
        </div>
        <div style={{fontWeight: 700, marginBottom: '4px'}}>{post.title}</div>
      </a>
    ))}

  </section>
</main>
</>
  );
}