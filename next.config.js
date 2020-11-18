require('dotenv').config();
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true'
});
const withOffline = require('next-offline');
const withPreact = require('next-plugin-preact')

const nextConfig = {

  workboxOpts: {
    swDest: process.env.NEXT_EXPORT
      ? 'service-worker.js'
      : 'static/service-worker.js',
    runtimeCaching: [
      {
        urlPattern: /^https?.*/,
        handler: 'NetworkFirst',
        options: {
          cacheName: 'offlineCache',
          expiration: {
            maxEntries: 200,
          },
        },
      },
    ],
  },


  async rewrites() {
    return [
      {
        source: '/service-worker.js',
        destination: '/.next/static/service-worker.js',
      },
      {
        source: '/sitemap.xml',
        destination: '/api/sitemap'
      },
    ]
  },

  catchAllRouting: true,
  modern: true,

  // unuseful code
  generateBuildId: async () => {
    if (process.env.BUILD_ID) {
      return process.env.BUILD_ID;
    } else {
      return `${new Date().getTime()}`;
    }
  },

  experimental: {
    optimizeFonts: true,
    optimizeImages: true
  },




  //unuseful code
  env: {
    API_URL: process.env.API_URL,
    STRIPE_API_KEY: process.env.STRIPE_API_KEY,
    CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
    CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
    SITE_URL: process.env.SITE_URL,
    SITE_NAME: process.env.SITE_NAME,
    ENV: process.env.NODE_ENV,
    IS_LOCAL: process.env.IS_LOCAL,
  },

  webpack(config) {
    return config;
  }
};

module.exports = withPreact(withOffline(withBundleAnalyzer(nextConfig)));
