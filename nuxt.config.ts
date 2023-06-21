import { fileURLToPath } from "url";
import { dirname, resolve, join } from "path";

const currentDir = dirname(fileURLToPath(import.meta.url));

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  // devtools: { enabled: true },

  app: {
    head: {
      title: "DuckDuckGo",
      meta: [{ name: "description", content: "Everything about - Nuxt-3" }],
      link: [
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/icon?family=Material+Icons",
        },
      ],
      noscript: [{ innerHTML: "This website requires JavaScript." }],
    },
  },

  css: [
    join(currentDir, "./assets/styles/_main.css"),
    join(currentDir, "./assets/styles/_global.css"),
  ],

  modules: ["@pinia/nuxt", "@nuxtjs/tailwindcss"],

  runtimeConfig: {
    public: {
      searchKey: process.env.NUXT_SEARCH_KEY,
      searchCtx: process.env.NUXT_SEARCH_CONTEXT,
    },
  },
});
