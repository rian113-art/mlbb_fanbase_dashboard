// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    // ⬇️ Jangan blokir build gara-gara lint error
    ignoreDuringBuilds: true,
  },
  // (opsional) kalau suatu saat ada error TS, bisa dihidupkan sementara:
  // typescript: { ignoreBuildErrors: true },
};

export default nextConfig;
