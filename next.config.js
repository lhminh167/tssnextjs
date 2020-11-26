require('dotenv').config();
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

    const isDev = process.env.NODE_ENV !== 'production';
    const shoudInstrument = config.module.rules.some(e => e.use && e.use.loader !== 'next-babel-loader');

    if (isDev && shoudInstrument)
      config.module.rules.push({
        test: /\.+(js|jsx|ts|tsx)$/,
        use: {
          loader: 'istanbul-instrumenter-loader',
          options: { esModules: true }
        },
        enforce: 'post',
        exclude: /node_modules|\.spec\.js$/,
      })

    return config;
  }
};

module.exports = withOffline(withBundleAnalyzer(nextConfig));
