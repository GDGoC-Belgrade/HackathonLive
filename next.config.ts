import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Placeholder mentor photos used by the Sprint 1 mock data
    remotePatterns: [{ protocol: "https", hostname: "i.pravatar.cc" }],
  },
};

export default nextConfig;
