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
  turbopack: {
    root: path.resolve(__dirname), // absolute path
  },
  productionBrowserSourceMaps: false, // prevent invalid source map errors
};

export default nextConfig;
