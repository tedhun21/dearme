/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "1337",
      },
      {
        protocol: "https",
        hostname: "dearme-sepia.vercel.app",
        port: "1337",
      },
    ],
  },
};

module.exports = nextConfig;
