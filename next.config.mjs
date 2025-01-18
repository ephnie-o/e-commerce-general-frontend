/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    env: {
    NEXT_BASE_URL: process.env.NEXT_BASE_URL,
  },
};

export default nextConfig;
