import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
    env: {
        NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000',
        GITHUB_TOKEN: process.env.GITHUB_TOKEN,
    },
};

export default nextConfig;
