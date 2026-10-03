import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    qualities: [90],
    deviceSizes: [480, 640, 768, 960, 1200, 1536, 1920],
    imageSizes: [256, 384],
  },
};

export default nextConfig;
