/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  async redirects() {
    return [
      // emotion root -> collections
      {
        source: '/:emotion(euphoria|anxiety|rage)',
        destination: '/collections/:emotion',
        permanent: true,
      },
      // volumes root -> collections
      {
        source: '/:emotion(euphoria|anxiety|rage)-vol-:num(\\d+)',
        destination: '/collections/:emotion-vol-:num',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
