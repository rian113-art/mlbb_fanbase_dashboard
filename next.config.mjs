/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // ⬇️ Jangan blokir build gara-gara lint error
    ignoreDuringBuilds: true,
  },
  // Kalau nanti mau memaksa lolos meski error TS (opsional):
  // typescript: { ignoreBuildErrors: true },
};

export default nextConfig;
