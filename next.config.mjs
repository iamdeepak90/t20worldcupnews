/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  images: {
    domains: ['ap-south-1.graphassets.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.hygraph.com',
      },
      {
        protocol: 'https',
        hostname: 'media.graphassets.com',
      },
    ],
    minimumCacheTTL: 31536000,
  },

  compress: true,

  experimental: {
    inlineCss: true
  },
  
  async headers() {
    return [
      {
        source: '/:all*(svg|jpg|jpeg|png|webp|avif|gif|ico)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
          {
            key: 'Expires',
            value: new Date(Date.now() + 31536000000).toUTCString(), // 1 year
          },
        ],
      },
      {
        source: '/_next/image(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
          {
            key: 'Expires',
            value: new Date(Date.now() + 31536000000).toUTCString(),
          },
        ],
      },
      {
        source: '/_next/static(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
