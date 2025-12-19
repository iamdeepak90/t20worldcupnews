import Image from "next/image";
import cricket from "@/images/cricket.webp";

export default function Home() {
  return (
<>
<main className="container">
  <section className="hero">
    <div className="hero-grid">
      <div className="hero-copy">
        <span className="badge">Featured</span>
        <h1 style={{margin: '10px 0 8px', fontSize: '2rem', lineHeight: '1.15'}}>A clean, minimal news layout in black, white &amp; grey.</h1>
        <p className="meta" style={{margin: '0 0 12px'}}>By Editorial Desk · Dec 19, 2025 · 6 min read</p>
        <p style={{margin: '0 0 14px'}}>
          This starter includes a home page, a listing page with sidebar, and a post details page—styled with Noticia Text and custom CSS.
        </p>
        <div style={{display: 'flex', gap: '10px', flexWrap: 'wrap'}}>
          <a className="btn" href="post.html">Read story</a>
          <a className="btn btn-outline" href="listing.html">Browse latest</a>
        </div>
      </div>
      <div className="hero-media">
        <Image src={cricket} alt="cricket" />
      </div>
    </div>
  </section>
  <div className="section-head">
    <h2 className="section-title">Top Categories</h2>
    <a className="small-link" href="listing.html">View all</a>
  </div>
  <section className="grid-3">
    <a className="card card-hover category-card" href="listing.html#category=world">
      <Image src={cricket} alt="cricket" className="thumb" />
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '10px', marginBottom: '6px'}}>
        <span className="badge">World</span><span className="meta">12 posts</span>
      </div>
      <div style={{fontWeight: 700, marginBottom: '4px'}}>Headlines that matter</div>
      <div className="meta">Global coverage with a calm, readable layout.</div>
    </a>
    <a className="card card-hover category-card" href="listing.html#category=tech">
      <Image src={cricket} alt="cricket" className="thumb" />
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '10px', marginBottom: '6px'}}>
        <span className="badge">Tech</span><span className="meta">9 posts</span>
      </div>
      <div style={{fontWeight: 700, marginBottom: '4px'}}>Products &amp; platforms</div>
      <div className="meta">Clean cards, clear typography, no distractions.</div>
    </a>
    <a className="card card-hover category-card" href="listing.html#category=business">
      <Image src={cricket} alt="cricket" className="thumb" />
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '10px', marginBottom: '6px'}}>
        <span className="badge">Business</span><span className="meta">7 posts</span>
      </div>
      <div style={{fontWeight: 700, marginBottom: '4px'}}>Markets &amp; money</div>
      <div className="meta">A minimal tone for daily business reads.</div>
    </a>
  </section>
  <div className="section-head">
    <h2 className="section-title">Latest</h2>
    <a className="small-link" href="listing.html">See more</a>
  </div>
  <section className="latest-grid">
    <a className="card card-hover latest-card" href="post.html">
      <span className="badge">World</span>
      <div style={{marginTop: '8px', fontWeight: 700}}>A short headline that wraps neatly</div>
      <div className="meta" style={{marginTop: '6px'}}>Dec 19, 2025 · 4 min read</div>
    </a>
    <a className="card card-hover latest-card" href="post.html">
      <span className="badge">Tech</span>
      <div style={{marginTop: '8px', fontWeight: 700}}>Minimal design trends for modern news</div>
      <div className="meta" style={{marginTop: '6px'}}>Dec 18, 2025 · 5 min read</div>
    </a>
    <a className="card card-hover latest-card" href="post.html">
      <span className="badge">Business</span>
      <div style={{marginTop: '8px', fontWeight: 700}}>Weekly briefing in a clean layout</div>
      <div className="meta" style={{marginTop: '6px'}}>Dec 17, 2025 · 6 min read</div>
    </a>
  </section>
</main>
<footer className="site-footer">
  <div className="container footer-row">
    <div>© <span id="year" /> Minimal News</div>
    <div className="footer-links">
      <a href="listing.html">Latest</a>
      <a href="listing.html#category=world">World</a>
      <a href="listing.html#category=tech">Tech</a>
      <a href="listing.html#category=business">Business</a>
    </div>
  </div>
</footer>

</>
  );
}
