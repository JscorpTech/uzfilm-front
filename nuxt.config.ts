// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    "@pinia/nuxt",
    "nuxt-swiper",
    "nuxt-simple-robots",
    "@nuxtjs/sitemap",
    "@nuxt/ui",
    "@nuxtjs/seo",
  ],
  build: {
    transpile: ["vue-toastification"],
  },
  css: ["@/assets/scss/main.scss"],
  app: {
    head: {
      charset: "utf-8",
      viewport: "width=device-width, initial-scale=1",
    },
  },
  ssr: true,
  site: {
    url: "https://pandatv.uz",
    name: "PandaTV.uz - kino va seriallar eng yaxshi sifatda.",
    description:
      "PandaTV.uz - har qanday didga mos keluvchi keng kontent tanloviga ega bo'lgan ko'ngilochar platforma.",
    defaultLocale: "uz",
  },
});
