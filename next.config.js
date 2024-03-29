/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "media.licdn.com",
      "lh3.googleusercontent.com",
      "res.cloudinary.com",
      "santi-twitter-dev.s3.ap-south-1.amazonaws.com",
    ],
  },
};

module.exports = nextConfig;
