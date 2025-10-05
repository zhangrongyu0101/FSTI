// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      baseURL: "/ChatbotPage/",
    },
    app: {
      baseURL: "/ChatbotPage/",
    },
  },

  app: {
    // baseURL: "/ChatbotPage/",
    head: {
      title: "法律助手第三版",
    },
  },

  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  modules: ["@element-plus/nuxt"],

  css: ["~/assets/css/main.css"],
  vite: {
    plugins: [tailwindcss()],
  },

  sourcemap: {
    client: "hidden",
    server: "hidden",
  },
});
