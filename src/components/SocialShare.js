"use client";

import React, { useEffect, useMemo, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
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
        Icon: FacebookIcon,
      },
      {
        key: "x",
        label: "Twitter / X",
        href: `https://twitter.com/intent/tweet?url=${enc(u)}${t ? `&text=${enc(t)}` : ""}`,
        Icon: XIcon,
      },
      {
        key: "linkedin",
        label: "LinkedIn",
        href: `https://www.linkedin.com/sharing/share-offsite/?url=${enc(u)}`,
        Icon: LinkedInIcon,
      },
      {
        key: "reddit",
        label: "Reddit",
        href: `https://www.reddit.com/submit?url=${enc(u)}${t ? `&title=${enc(t)}` : ""}`,
        Icon: RedditIcon,
      },
      {
        key: "pinterest",
        label: "Pinterest",
        href:
          `https://pinterest.com/pin/create/button/?url=${enc(u)}` +
          (t ? `&description=${enc(t)}` : "") +
          (pinterestMedia ? `&media=${enc(pinterestMedia)}` : ""),
        Icon: PinterestIcon,
      },
      {
        key: "whatsapp",
        label: "WhatsApp",
        href: `https://wa.me/?text=${enc(t ? `${t} ${u}` : u)}`,
        Icon: WhatsAppIcon,
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
            className={styles.btn}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Share on ${label}`}
            title={tooltips ? label : undefined}
          >
            <Icon className={styles.icon} />
          </a>
        ))}
      </div>
    </aside>
  );
});

/** Inline SVG icons (fast, no network) */

function FacebookIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M13.5 22v-8h2.7l.4-3H13.5V9.2c0-.9.2-1.5 1.6-1.5H16.8V5.1c-.3 0-1.4-.1-2.7-.1-2.7 0-4.6 1.6-4.6 4.7V11H7v3h2.5v8h4z" />
    </svg>
  );
}

function XIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18.9 2H22l-6.8 7.8L23 22h-6.8l-5.3-7-6.1 7H2l7.3-8.4L1.8 2H8.8l4.8 6.3L18.9 2zm-1.2 18h1.7L7.9 4H6.1l11.6 16z" />
    </svg>
  );
}

function LinkedInIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM0.5 8H4.5v14H0.5V8zM8 8h3.8v1.9h.1c.5-1 1.9-2.1 4-2.1 4.3 0 5.1 2.8 5.1 6.5V22h-4V15c0-1.7 0-3.9-2.4-3.9s-2.8 1.8-2.8 3.8V22H8V8z" />
    </svg>
  );
}

function RedditIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M24 12c0-1.7-1.3-3.1-3-3.3-.7-3-3.4-5.2-6.7-5.2-.5 0-1 .1-1.5.2L12 1l-4 1 1 4c-2.6.8-4.5 2.8-5.1 5.5C2.2 11 1 12.4 1 14c0 1.4 1 2.7 2.4 3.1C4.6 19.9 8 22 12 22s7.4-2.1 8.6-4.9c1.4-.4 2.4-1.7 2.4-3.1zM7.7 13.5c-.7 0-1.2-.6-1.2-1.2S7 11 7.7 11s1.2.6 1.2 1.2-.5 1.3-1.2 1.3zm7.3 5.2c-1 .7-2.1 1-3 1s-2-.3-3-1c-.2-.2-.3-.5-.1-.8s.5-.3.8-.1c.8.6 1.6.8 2.3.8s1.5-.2 2.3-.8c.3-.2.6-.1.8.1.2.3.1.6-.1.8zm1.3-5.2c-.7 0-1.2-.6-1.2-1.2S15.7 11 16.3 11s1.2.6 1.2 1.2-.5 1.3-1.2 1.3z" />
    </svg>
  );
}

function PinterestIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12.2 1C6.8 1 3 4.6 3 9.6c0 3 1.7 5.7 4.3 6.7-.1-.6-.2-1.6 0-2.3l1.3-5.4s-.3-.6-.3-1.6c0-1.5.9-2.6 2-2.6.9 0 1.4.7 1.4 1.6 0 1-.6 2.5-1 3.9-.3 1.2.6 2.1 1.8 2.1 2.1 0 3.7-2.2 3.7-5.4 0-2.8-2-4.8-4.9-4.8-3.3 0-5.3 2.5-5.3 5.1 0 1 .4 2.1 1 2.7.1.1.1.2.1.4l-.1 1c0 .3-.2.4-.5.3-1.7-.8-2.8-3.1-2.8-5 0-4.1 3-7.9 8.6-7.9 4.5 0 8 3.2 8 7.5 0 4.5-2.8 8.1-6.8 8.1-1.3 0-2.6-.7-3-1.5l-.8 3c-.3 1.1-1 2.4-1.5 3.2 1.1.3 2.2.5 3.5.5 5.3 0 9.2-3.6 9.2-8.6C21.4 4.6 17.6 1 12.2 1z" />
    </svg>
  );
}

function WhatsAppIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.5 3.5A11.6 11.6 0 0 0 12 0C5.4 0 .1 5.3.1 11.9c0 2.1.6 4.2 1.7 6L0 24l6.3-1.7a11.8 11.8 0 0 0 5.7 1.5h0c6.6 0 11.9-5.3 11.9-11.9 0-3.2-1.2-6.2-3.4-8.4zM12 21.8h0c-1.9 0-3.7-.5-5.4-1.5l-.4-.2-3.7 1 1-3.6-.2-.4a9.8 9.8 0 0 1-1.6-5.2C1.7 6.4 6.4 1.7 12 1.7c2.6 0 5 .9 6.8 2.8a9.6 9.6 0 0 1 2.8 6.8c0 5.6-4.6 10.5-9.6 10.5zm5.6-7.8c-.3-.1-1.8-.9-2-.9-.3-.1-.5-.1-.7.1-.2.3-.8.9-1 1.1-.2.2-.4.2-.7.1-.3-.1-1.3-.5-2.5-1.6-.9-.8-1.6-1.8-1.8-2.1-.2-.3 0-.5.1-.7l.5-.6c.2-.2.2-.4.3-.6.1-.2 0-.4 0-.6 0-.1-.7-1.7-1-2.3-.3-.6-.6-.5-.7-.5h-.6c-.2 0-.6.1-.9.4-.3.3-1.2 1.1-1.2 2.7s1.2 3.2 1.4 3.4c.2.2 2.4 3.7 5.9 5.2.8.3 1.4.5 1.9.6.8.3 1.6.2 2.2.1.7-.1 1.8-.7 2.1-1.4.3-.7.3-1.3.2-1.4-.1-.1-.3-.2-.6-.3z" />
    </svg>
  );
}