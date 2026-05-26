/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // ใช้ internal proxy /api/image จึงไม่ต้องระบุ remotePatterns
    unoptimized: true,
  },
};

export default nextConfig;
