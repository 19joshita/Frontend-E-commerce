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
  productionBrowserSourceMaps: false, // prevents source map crashes
};

export default nextConfig;
