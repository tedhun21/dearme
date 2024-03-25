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
        hostname: "port-0-dearme-api-32updzt2alpuq8w3u.sel4.cloudtype.app",
        port: "1337",
      },
    ],
    unoptimize: true,
  },
};

module.exports = nextConfig;
