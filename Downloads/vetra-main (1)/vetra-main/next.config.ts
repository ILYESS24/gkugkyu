import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: false,
  },
  // Exclude Open WebUI Svelte files from compilation
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '$lib': false,
    };
    return config;
  },
};

export default nextConfig;
