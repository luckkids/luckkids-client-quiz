import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://api-luckkids.kro.kr/api/:path*',
      },
    ];
  },
};

export default nextConfig;
