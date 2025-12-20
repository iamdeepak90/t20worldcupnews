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
  experimental: {
    inlineCss: true
  },
};

export default nextConfig;
