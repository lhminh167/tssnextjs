const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true'
});
const withOffline = require('next-offline');

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

  webpack(config) {
    return config;
  }
};

module.exports = withOffline(withBundleAnalyzer(nextConfig));
