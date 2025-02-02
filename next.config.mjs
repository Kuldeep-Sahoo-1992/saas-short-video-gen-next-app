/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: "/saas-short-video-gen-next-app",

  images: {
    domains: [
      "cdn.lucidpic.com",
      "images.media.io",
      "easy-peasy.ai",
      "img.freepik.com",
      "api.easy-peasy.ai",
    ],
  },
};

export default nextConfig;
