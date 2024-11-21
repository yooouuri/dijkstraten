// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  future: {
    compatibilityVersion: 4,
  },
  compatibilityDate: '2024-04-03',
  experimental: {
    typedPages: true,
  },
  devtools: {
    enabled: true,
  },
  nitro: {
    preset: 'cloudflare-pages',
  },
  modules: [
    'nitro-cloudflare-dev',
    '@nuxt/ui',
  ],
})
