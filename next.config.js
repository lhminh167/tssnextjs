/** @type {import('next').NextConfig} */
const webpack = require("webpack");
const { parsed: env } = require("dotenv").config({
  path: `./.env.${process.env.ENVIRONMENT}`,
});

module.exports = {
  reactStrictMode: true,
  typescript: {
    ignoreBuildErrors: true,
  },
  output: "standalone",
  webpack(config) {
    console.log("Environment: ", process.env.ENVIRONMENT);
    config.plugins.push(new webpack.EnvironmentPlugin(env));
    return config;
  },
};
