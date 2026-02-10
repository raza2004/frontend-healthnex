import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    MONGODB_URI: process.env.MONGODB_URI,
    INFERMEDICA_APP_ID: process.env.INFERMEDICA_APP_ID,
    INFERMEDICA_APP_KEY: process.env.INFERMEDICA_APP_KEY,
    OPENAI_API_KEY: process.env.OPENAI_API_KEY,
  },
};

module.exports = nextConfig;

