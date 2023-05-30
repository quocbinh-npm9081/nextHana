/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [
      "platform-lookaside.fbsbx.com",
      "avatars.githubusercontent.com",
      "tailwindui.com",
    ],
  },
};

module.exports = nextConfig;
