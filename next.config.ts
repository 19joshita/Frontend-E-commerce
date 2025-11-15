import path from "path";

const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "fakestoreapi.com",
        pathname: "/**",
      },
    ],
  },
  productionBrowserSourceMaps: false, // prevents source map errors
  experimental: {}, // remove appDir or turbopack keys
  webpack: (config: any) => {
    // Ensure Turbopack is not used
    config.resolve.fallback = { ...config.resolve.fallback, fs: false };
    return config;
  },
};

export default nextConfig;
