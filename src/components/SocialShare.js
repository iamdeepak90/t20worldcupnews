"use client";

import React, { useEffect, useMemo, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { XIcon, FacebookIcon, LinkedInIcon, RedditIcon, PinterestIcon, WhatsAppIcon } from '@/components/SocialIcons';
import styles from './SocialShare.module.css';

const SITE_URL = "https://t20worldcupnews.com";

function safeJoinUrl(origin, path) {
  const o = (origin || "").replace(/\/+$/, "");
  const p = path && path.startsWith("/") ? path : `/${path || ""}`;
  return `${o}${p}`;
}

function enc(v) {
  return encodeURIComponent(v || "");
}

export default React.memo(function SocialShare({
  title,
  pinterestMedia,
  tooltips = true,
}) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [origin, setOrigin] = useState(() => SITE_URL || "");

  useEffect(() => {
    if (!origin && typeof window !== "undefined") {
      setOrigin(window.location.origin);
    }
  }, [origin]);

  const pageUrl = useMemo(() => {
    if (!origin) return "";
    const qs = searchParams ? searchParams.toString() : "";
    const fullPath = qs ? `${pathname}?${qs}` : pathname;
    return safeJoinUrl(origin, fullPath);
  }, [origin, pathname, searchParams]);

  const pageTitle = useMemo(() => {
    if (title) return title;
    if (typeof document !== "undefined" && document.title) return document.title;
    return "";
  }, [title]);

  const links = useMemo(() => {
    const u = pageUrl;
    const t = pageTitle;

    if (!u) return null;

    return [
      {
        key: "facebook",
        label: "Facebook",
        href: `https://www.facebook.com/sharer/sharer.php?u=${enc(u)}`,
        Icon: FacebookIcon
      },
      {
        key: "x",
        label: "Twitter / X",
        href: `https://twitter.com/intent/tweet?url=${enc(u)}${t ? `&text=${enc(t)}` : ""}`,
        Icon: XIcon
      },
      {
        key: "linkedin",
        label: "LinkedIn",
        href: `https://www.linkedin.com/sharing/share-offsite/?url=${enc(u)}`,
        Icon: LinkedInIcon
      },
      {
        key: "reddit",
        label: "Reddit",
        href: `https://www.reddit.com/submit?url=${enc(u)}${t ? `&title=${enc(t)}` : ""}`,
        Icon: RedditIcon
      },
      {
        key: "pinterest",
        label: "Pinterest",
        href:
          `https://pinterest.com/pin/create/button/?url=${enc(u)}` +
          (t ? `&description=${enc(t)}` : "") +
          (pinterestMedia ? `&media=${enc(pinterestMedia)}` : ""),
        Icon: PinterestIcon
      },
      {
        key: "whatsapp",
        label: "WhatsApp",
        href: `https://wa.me/?text=${enc(t ? `${t} ${u}` : u)}`,
        Icon: WhatsAppIcon
      },
    ];
  }, [pageUrl, pageTitle, pinterestMedia]);

  // If you want it to render disabled buttons before URL is known, tell me.
  if (!links) return null;

  return (
    <aside className={styles.wrap} aria-label="Share">
      <div className={styles.stack}>
        {links.map(({ key, label, href, Icon }) => (
          <a
            key={key}
            className={`${styles.btn} ${styles[key + '-icon']}`}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Share on ${label}`}
            title={tooltips ? `Share on ${label}` : undefined}
          >
            <Icon />
          </a>
        ))}
      </div>
    </aside>
  );
});