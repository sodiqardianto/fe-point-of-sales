/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "docs.material-tailwind.com",
        port: "",
        pathname: "/img/**",
      },
    ],
  },
};

export default nextConfig;
