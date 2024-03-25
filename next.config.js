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
        hostname: "dearme-gjn80cho8-jihunsong94.vercel.app",
        port: "1337",
      },
    ],
  },
};

module.exports = nextConfig;
