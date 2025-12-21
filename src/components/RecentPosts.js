import { getLatestPosts } from "@/lib/queries";
import { formatDate } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";

export default async function RecentPosts(){
  const posts = await getLatestPosts(5);
  return (
  <div className="sidebar-box">
    <h3>Recent Posts</h3>
    {posts.map((post) => (
      <Link key={post.slug} className="recent-item" href={`/${post.slug}`}>
        <Image
            src={post.coverImage.url}
            width={100}
            height={100}
            alt={post.coverImage.altText}
          />
        <div>
          <div className="title">{post.title}</div>
          <div className="meta">{formatDate(post.date)}</div>
        </div>
      </Link>
    ))}
  </div>
  )
}