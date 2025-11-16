/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["fakestoreapi.com"],
    // remotePatterns: [
    //   {
    //     protocol: "https",
    //     hostname: "fakestoreapi.com",
    //     pathname: "/**",
    //   },
    // ],
  },
  productionBrowserSourceMaps: false,
  // turbopack: false,
};

export default nextConfig;
