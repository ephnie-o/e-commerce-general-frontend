/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  reactStrictMode: true,
  env: {
    NEXT_BASE_URL: process.env.NEXT_BASE_URL,
  }
};

export default nextConfig;
