import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ["mssql", "@azure/identity", "@azure/communication-email"],
  transpilePackages: ["@azure/msal-browser", "@azure/msal-react"],
  async rewrites() {
    return [
      {
        source: "/favicon.ico",
        destination: "/icon",
      },
    ];
  },
  images: {
    loader: "custom",
    loaderFile: "./frontend/lib/cloudinary.ts",
    qualities: [75, 90, 95],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 2560, 3840],
    imageSizes: [256, 384, 512, 640, 750, 828, 1080, 1200],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/dpcnwntmv/image/upload/**",
      },
      {
        protocol: "https",
        hostname: "placehold.co",
      },
    ],
  },
};

export default nextConfig;
