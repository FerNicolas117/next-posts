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
  },

  env: {
    NEXT_PUBLIC_FIREBASE_API_KEY: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    NEXT_PUBLIC_FIREBASE_APP_ID: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
    // Agrega otras variables de entorno aquí si las necesitas
  },

};

export default nextConfig;
