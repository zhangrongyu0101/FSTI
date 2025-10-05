// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  app: {
    baseURL: "/ChatbotPage/",
    head: {
      title: "法律助手第二版",
    },
  },

  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  modules: ["@element-plus/nuxt"],

  ssr: false, // 尝试修复静态资源加载不正常的问题

  css: ["~/assets/css/main.css"],
  vite: {
    plugins: [tailwindcss()],
  },

  sourcemap: {
    client: "hidden",
    server: "hidden",
  },
});
