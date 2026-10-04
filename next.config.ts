import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  // The parent folder has its own package-lock.json, so pin the root
  // explicitly instead of letting Turbopack guess it.
  turbopack: { root: path.resolve(process.cwd()) },
  serverExternalPackages: ["mongoose"],
  env: {
    MONGODB_URI: process.env.MONGODB_URI,
    INFERMEDICA_APP_ID: process.env.INFERMEDICA_APP_ID,
    INFERMEDICA_APP_KEY: process.env.INFERMEDICA_APP_KEY,
    OPENAI_API_KEY: process.env.OPENAI_API_KEY,
  },
};

module.exports = nextConfig;
