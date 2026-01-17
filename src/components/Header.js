import Image from "next/image";
import logo from "@/images/t20logo.png";
import Link from "next/link";

export default async function Header() {
  return (
    <header className="site-header">
      <div className="container nav-row">
        <Link className="brand" href="/">
          <Image src={logo} alt="T20 World Cup News" width={165} />
        </Link>
        <input className="nav-toggle" type="checkbox" id="nav-toggle" />
        <label className="nav-toggle-btn" htmlFor="nav-toggle" aria-label="Toggle menu">☰</label>
        <div className="nav-right">
          <nav className="nav" aria-label="Primary">
            <Link className="nav-link" href="/t20-world-cup-schedule-list">Schedule</Link>
            <Link className="nav-link" href="/ticket-booking-online">Tickets</Link>
            <Link className="nav-link" href="/points-table-standings-nrr">Points Table</Link>

            <div className="nav-dropdown">
              <Link className="nav-link nav-dropdown-trigger" href="/category/teams">
                Teams <span className="dropdown-arrow"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"><path fill="currentColor" fillRule="evenodd" d="M4.43 8.512a.75.75 0 0 1 1.058-.081L12 14.012l6.512-5.581a.75.75 0 0 1 .976 1.138l-7 6a.75.75 0 0 1-.976 0l-7-6a.75.75 0 0 1-.081-1.057" clipRule="evenodd" /></svg></span>
              </Link>
              <div className="nav-dropdown-menu">
                <div className="dropdown-columns">
                  <div className="dropdown-column">
                    <Link href="/indian-squad-full-players-list" className="dropdown-item">India Squad</Link>
                    <Link href="/pakistan-squad" className="dropdown-item">Pakistan Squad</Link>
                    <Link href="/australia-squad" className="dropdown-item">Australia Squad</Link>
                    <Link href="/england-squad" className="dropdown-item">England Squad</Link>
                    <Link href="/south-africa-squad" className="dropdown-item">South Africa Squad</Link>
                  </div>
                  <div className="dropdown-column">
                    <Link href="/sri-lanka-squad" className="dropdown-item">Sri Lanka Squad</Link>
                    <Link href="/new-zealand-squad" className="dropdown-item">New Zealand Squad</Link>
                    <Link href="/west-indies-squad" className="dropdown-item">West Indies Squad</Link>
                    <Link href="/bangladesh-squad" className="dropdown-item">Bangladesh Squad</Link>
                    <Link href="/t20-world-cup-qualified-teams" className="dropdown-item">All Teams</Link>
                  </div>
                </div>
              </div>
            </div>

            <Link className="nav-link" href="/posts">Blog</Link>
            <Link className="nav-link" href="/category/news">News</Link>
          </nav>
          <form className="nav-search" action="/search" method="get" role="search">
            <input type="search" name="q" placeholder="Search news..." aria-label="Search news" />
            <button type="submit">Search</button>
          </form>
        </div>
      </div>
    </header>
  )
}