require('dotenv').config();
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true"
});
const withOffline = require("next-offline");

const nextConfig = {
  env: {
    API_URL: process.env.API_URL,
    STRIPE_API_KEY: process.env.STRIPE_API_KEY
  },

  webpack(config) {
    return config;
  }
};

module.exports = withOffline(withBundleAnalyzer(nextConfig));
