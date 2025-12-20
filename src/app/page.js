import Image from "next/image";
import { getLatestPosts } from "@/lib/posts";
import { formatDate } from "@/lib/utils";
import Link from "next/link";

export default async function Home() {
const posts = await getLatestPosts(3);
console.log(posts);
return (
<>
<main className="container">
  <section className="hero">
    <div className="hero-grid">
      <div className="hero-copy">
        {posts[0].categories.map((cat) => (
          <span key={cat.name} className="badge">{cat.name}</span>
        ))}
        <h2 style={{margin: '10px 0 8px', fontSize: '2rem', lineHeight: '1.15'}}>{posts[0].title}</h2>
        <p className="meta" style={{margin: '0 0 12px'}}>By {posts[0].author.name} | {formatDate(posts[0].date)}</p>
        <p style={{margin: '0 0 14px'}}>{posts[0].excerpt}</p>
        <div style={{display: 'flex', gap: '10px', flexWrap: 'wrap'}}>
          <Link href={`/${posts[0].slug}`} className="btn">Read full News ↗</Link>
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
    <h3 className="section-title">Top Categories</h3>
    <a className="small-link" href="listing.html">View all</a>
  </div>
  <section className="grid-3 mb-1">

    {posts.map((post) => (
      <a key={post.slug} className="card card-hover category-card" href="#">
        <Image src={post.coverImage.url} width={350} height={220} alt="cricket" className="thumb" />
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '10px', marginBottom: '6px'}}>
          {post.categories.map((cat) => (
            <span key={cat.name} className="badge">{cat.name}</span>
          ))}
          <span className="meta">{formatDate(post.date)}</span>
        </div>
        <div style={{fontWeight: 700, marginBottom: '4px'}}>{post.title}</div>
      </a>
    ))}

  </section>


    <div className="card article-card">
      <h1>T20 World Cup 2026 Schedules are available now</h1>
  <p
    style={{
      fontSize: "1.15rem",
      marginTop: "0",
    }}>
    This is a clean post page using black, white, and grey tones with Noticia
    Text and fully custom CSS.
  </p>
  <p>
    Keep paragraphs short and readable. Use consistent spacing and avoid strong
    colors so the content remains the focus. Add images sparingly and prefer
    neutral contrast.
  </p>
  <h2
    style={{
      fontSize: "1.2rem",
      margin: "16px 0 8px",
    }}>
    Subheading
  </h2>
  <p>
    You can structure the article with a few subheads, quotes, or bullet lists.
    The sidebar stays calm: search, categories, and recent posts.
  </p>
  <blockquote>
    <p
      style={{
        margin: "0",
      }}>
      “Minimalism isn’t empty—it’s deliberate.”
    </p>
  </blockquote>
  <h3
    style={{
      fontSize: "1.05rem",
      margin: "16px 0 8px",
    }}>
    Quick points
  </h3>
  <ul
    style={{
      margin: "0",
      paddingLeft: "18px",
    }}>
    <li>Custom CSS only (no Bootstrap)</li>
    <li>Inline critical CSS for above-the-fold</li>
    <li>Small radius (3–4px) and neutral palette</li>
  </ul>
  <p
    style={{
      fontSize: "1.15rem",
      marginTop: "0",
    }}>
    This is a clean post page using black, white, and grey tones with Noticia
    Text and fully custom CSS.
  </p>
  <p>
    Keep paragraphs short and readable. Use consistent spacing and avoid strong
    colors so the content remains the focus. Add images sparingly and prefer
    neutral contrast.
  </p>
</div>



</main>
</>
  );
}