/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "assets.coincap.io",
        port: "",
      },
    ],
  },
};

module.exports = nextConfig;
