import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
    distDir: ".next",

    env: {
        NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000',
        GITHUB_TOKEN: process.env.GITHUB_TOKEN,
        MAILGUN_FROM: process.env.MAILGUN_FROM,
        MAILGUN_API_KEY: process.env.MAILGUN_API_KEY,
        MAILGUN_DOMAIN: process.env.MAILGUN_DOMAIN,

        OAUTH_CLIENT_ID:  process.env.OAUTH_CLIENT_ID,
        OAUTH_CLIENT_SECRET: process.env.OAUTH_CLIENT_SECRET,
        OAUTH_REFRESH_TOKEN: process.env.OAUTH_REFRESH_TOKEN,
        TEST_EMAIL: process.env.TEST_EMAIL,
    }
};

export default nextConfig;
