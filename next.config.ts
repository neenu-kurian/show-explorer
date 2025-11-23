import type { NextConfig } from "next";

const nextConfig: NextConfig = {
   images: {
    domains: ['static.tvmaze.com'], 
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'static.tvmaze.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
