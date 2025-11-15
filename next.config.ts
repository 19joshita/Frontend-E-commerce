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
    // Use absolute path
    root: path.resolve(__dirname),
  },
};

export default nextConfig;
