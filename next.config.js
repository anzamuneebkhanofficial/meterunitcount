/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  assetPrefix: process.env.NODE_ENV === 'production' ? '/electricity-meter-checker' : '',
  basePath: process.env.NODE_ENV === 'production' ? '/electricity-meter-checker' : '',
}

module.exports = nextConfig
