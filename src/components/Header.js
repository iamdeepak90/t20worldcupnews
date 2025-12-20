import Image from "next/image";
import logo from "@/images/t20logo.png";
import Link from "next/link";
import { GetAllCategory } from "@/lib/queries";

export default async function Header(){
    const cats = await GetAllCategory();
  return (
<header className="site-header">
  <div className="container nav-row">
    <Link className="brand" href="/">
        <Image src={logo} alt="T20 World Cup News" width={165}/>
    </Link>
    <input className="nav-toggle" type="checkbox" id="nav-toggle" />
    <label className="nav-toggle-btn" htmlFor="nav-toggle" aria-label="Toggle menu">☰</label>
    <div className="nav-right">
      <nav className="nav" aria-label="Primary">
        {cats.map((cat) => (
            <Link key={cat.id} className="nav-link" href={`/category/${cat.slug}`}>{cat.name}</Link>
        ))}
      </nav>
      <form className="nav-search" action="search" method="get" role="search">
        <input type="search" name="q" placeholder="Search news..." aria-label="Search news" />
        <button type="submit">Search</button>
      </form>
    </div>
  </div>
</header>
  )
}