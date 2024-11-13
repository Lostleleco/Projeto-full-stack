import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['files.stripe.com'], // Use 'domains' em vez de 'remotePatterns'
  },
};

export default nextConfig;
