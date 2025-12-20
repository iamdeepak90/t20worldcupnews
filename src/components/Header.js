import Image from "next/image";
import logo from "@/images/t20logo1.png";
import Link from "next/link";

export default function Header(){
  return (
<header className="site-header">
  <div className="container nav-row">
    <Link className="brand" href="/">
        <Image src={logo} alt="T20 World Cup News" width={180} />
    </Link>
    <input className="nav-toggle" type="checkbox" id="nav-toggle" />
    <label className="nav-toggle-btn" htmlFor="nav-toggle" aria-label="Toggle menu">☰</label>
    <div className="nav-right">
      <nav className="nav" aria-label="Primary">
        <a className="nav-link active" href="index.html">Home</a>
        <a className="nav-link" href="listing.html">Latest</a>
        <a className="nav-link" href="listing.html#category=world">World</a>
        <a className="nav-link" href="listing.html#category=tech">Tech</a>
        <a className="nav-link" href="listing.html#category=business">Business</a>
      </nav>
      <form className="nav-search" action="listing.html" method="get" role="search">
        <input type="search" name="q" placeholder="Search news..." aria-label="Search news" />
        <button type="submit">Search</button>
      </form>
    </div>
  </div>
</header>
  )
}