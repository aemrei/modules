/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  eslint: {
    dirs: ["src"],
  },
  env: {},
  i18n: {
    locales: ["en"],
    defaultLocale: "en",
  },
  async rewrites() {
    return [
      {
        source: "/api/_/:path*",
        destination: `/api/:path*`,
      },
    ];
  },
};

module.exports = nextConfig;
