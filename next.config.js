/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
    formats: ['image/webp', 'image/avif']
  },
  assetPrefix: process.env.GITHUB_PAGES ? '/electricity-meter-checker' : '',
  basePath: process.env.GITHUB_PAGES ? '/electricity-meter-checker' : '',
  experimental: {
    optimizePackageImports: ['react']
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production'
  }
}

export default nextConfig
