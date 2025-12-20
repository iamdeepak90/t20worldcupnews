import { GetAllCategory } from "@/lib/queries";
import Link from "next/link";
import Image from "next/image";
import ad300x600 from '@/images/300x600.webp';

export default async function Sidebar(){
  const cats = await GetAllCategory();
  return (
<aside>
  <div
    className="sidebar-box"
    style={{
      marginBottom: "12px",
    }}
  >
    <h3>Categories</h3>
    <div className="sidebar-tags">
      {cats.map((cat) => (
        <Link key={cat.id} className="badge" href={`/category/${cat.slug}`}>{cat.name}</Link>
      ))}
    </div>
  </div>
  <div className="sidebar-box" style={{
      marginBottom: "12px",
    }}>
    <Image src={ad300x600} alt="AD Code" />
  </div>
  <div className="sidebar-box">
    <h3>Recent</h3>

    <a className="recent-item" href="post.html">
      <img
        alt=""
        src="https://picsum.photos/seed/post-recent-1/180/140"
      />
      <div>
        <div className="meta">Dec 19, 2025</div>
        <div className="title">A short recent headline</div>
      </div>
    </a>
    <a className="recent-item" href="post.html">
      <img
        alt=""
        src="https://picsum.photos/seed/post-recent-2/180/140"
      />
      <div>
        <div className="meta">Dec 18, 2025</div>
        <div className="title">Another clean headline</div>
      </div>
    </a>
    <a className="recent-item" href="post.html">
      <img
        alt=""
        src="https://picsum.photos/seed/post-recent-3/180/140"
      />
      <div>
        <div className="meta">Dec 17, 2025</div>
        <div className="title">Minimal layout, readable</div>
      </div>
    </a>
  </div>
</aside>
  )
}