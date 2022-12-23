/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  async redirects() {
    return [
      {
        source: '/',
        destination: '/car-rent',
        permanent: true,
      },
    ];
  },
  images: {
    domains: ['res.cloudinary.com'],
  },
};

module.exports = nextConfig;
