/** @type {import('next').NextConfig} */
const nextConfig = {
  // Security headers
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin'
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()'
          },
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self' https:;"
          }
        ]
      }
    ]
  },
  
  // Disable server-side source maps in production
  productionBrowserSourceMaps: false,
  
  // Enable compression
  compress: true,
  
  // Security: Disable powered by header
  poweredByHeader: false,
  
  // Security: Disable directory listing
  trailingSlash: false,
  
  // Security: Disable automatic static optimization for dynamic routes
  experimental: {
    // Disable potentially dangerous features
    scrollRestoration: false,
    // Enable modern features safely
    optimizeCss: true,
    optimizePackageImports: ['framer-motion']
  }
}

export default nextConfig
