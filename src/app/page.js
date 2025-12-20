import Image from "next/image";
import { getLatestPosts, getPageBySlug } from "@/lib/queries";
import { formatDate } from "@/lib/utils";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import homeimg from "@/images/icc-t20-world-cup-2026-live.webp";

export const metadata = buildMetadata({
  title: "ICC T20 World Cup 2026 Live Score Updates, Highlights & Latest News",
  description: "Stay updated with the latest news, fixtures, and highlights of the ICC T20 World Cup 2026. Get all the essential information and stay ahead in the tournament countdown!",
  url: "https://t20worldcupnews.com",
  image: homeimg.src,
});

export default async function Home() {
  const posts = await getLatestPosts(3);
  const page = await getPageBySlug('home');

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
          <Link href={`/${posts[0].slug}`} className="btn">Read more ↗</Link>
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
    <h3 className="section-title">Recent Posts</h3>
  </div>
  <section className="grid-3 mb-1">

    {posts.map((post) => (
      <Link key={post.slug} className="card card-hover category-card" href={`/${post.slug}`}>
        <Image src={post.coverImage.url} width={350} height={220} alt="cricket" className="thumb" />
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '10px', marginBottom: '6px'}}>
          {post.categories.map((cat) => (
            <span key={cat.name} className="badge">{cat.name}</span>
          ))}
          <span className="meta">{formatDate(post.date)}</span>
        </div>
        <div style={{fontWeight: 700, marginBottom: '4px'}}>{post.title}</div>
      </Link>
    ))}

  </section>


    <div className="card article-card">
      <h1>{page.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: page.content.html }}/>
    </div>

</main>
</>
  );
}