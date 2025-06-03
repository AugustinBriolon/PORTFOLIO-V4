/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
    ],
  },
  // webpack: (config, { isServer }) => {
  //   if (!isServer) {
  //     config.resolve.fallback = {
  //       ...(config.resolve.fallback || {}),
  //       fs: false,
  //       path: false,
  //     };
  //   }
  //   return config;
  // },
};

export default nextConfig;
