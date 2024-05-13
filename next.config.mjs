/** @type {import('next').NextConfig} */
const nextConfig = {

  reactStrictMode: false,

  images: {
    remotePatterns: [
      {
        protocol: "https", // or http
        hostname: "res.cloudinary.com",
      },
      {
        protocol: "https", // or http
        hostname: "lh3.googleusercontent.com",
      },
      {
        protocol: "https", // or http
        hostname: "m.media-amazon.com",
      },
      {
        protocol: "https", // or http
        hostname: "firebasestorage.googleapis.com",
      },
    ],
  }

};

export default nextConfig;
