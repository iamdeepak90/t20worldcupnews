/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  images: {
    domains: ['ap-south-1.graphassets.com'],
    minimumCacheTTL: 31536000
  },
  experimental: {
    inlineCss: true,
    cssChunking: true
  }
};

export default nextConfig;
