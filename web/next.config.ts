import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // отключаем оптимизацию Next для локального Directus
    unoptimized: true,

    // разрешаем загрузку изображений из Directus
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "8055",
        pathname: "/assets/**",
      },
      {
        protocol: "http",
        hostname: "127.0.0.1",
        port: "8055",
        pathname: "/assets/**",
      },
    ],
  },

  // чтобы React Strict Mode не ломал dev-рендер
  reactStrictMode: true,
};

export default nextConfig;
