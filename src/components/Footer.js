import "@/app/globals.css";

export default function Footer(){
  return (
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
  )
}