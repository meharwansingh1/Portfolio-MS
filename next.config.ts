import type { NextConfig } from "next";

// On GitHub Pages a project site lives under /<repo-name>; the deploy workflow sets this.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || ""

const nextConfig: NextConfig = {
  // plain static files, so any static host (GitHub Pages included) can serve the site
  output: "export",
  trailingSlash: true,
  basePath,
  images: { unoptimized: true },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
