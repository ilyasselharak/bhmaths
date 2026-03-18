/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // Disable Vercel image optimization to avoid bandwidth/invocation charges.
    // Images are served directly from their source URLs.
    unoptimized: true,
  },
  async headers() {
    return [
      {
        // Cache all public (non-auth) pages at Vercel's CDN edge for 1 hour,
        // serve stale while revalidating for up to 24 hours.
        source: '/((?!profile|dashboard|admin|login|register|api).*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, s-maxage=3600, stale-while-revalidate=86400',
          },
        ],
      },
    ];
  },
}

module.exports = nextConfig
