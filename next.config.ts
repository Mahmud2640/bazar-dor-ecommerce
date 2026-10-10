import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // this rule makes Tailwind CSS work with Turbopack (it came with the starter project)
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
