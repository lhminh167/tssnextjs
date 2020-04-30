require('dotenv').config();
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true"
});
const withOffline = require("next-offline");

const nextConfig = {
  poweredByHeader: false,
  distDir: "_next",
  generateBuildId: async () => {
    if (process.env.BUILD_ID) {
      return process.env.BUILD_ID;
    } else {
      return `${new Date().getTime()}`;
    }
  },
  env: {
    API_URL: process.env.API_URL,
    STRIPE_API_KEY: process.env.STRIPE_API_KEY,
    CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
    CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
    SITE_URL: process.env.SITE_URL,
    SITE_NAME: process.env.SITE_NAME,
  },

  webpack(config) {
    return config;
  }
};

module.exports = withOffline(withBundleAnalyzer(nextConfig));
