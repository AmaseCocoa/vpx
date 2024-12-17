// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss', '@nuxt/image'],
  image: {
    format: ['avif', 'webp'],
    ipx: {
        maxAge: 2592000
    }
  },
  app: {
    head: {
      title: 'Cocoa Gallery',
      htmlAttrs: {
        lang: 'ja', prefix: 'og: https://ogp.me/ns#'
      },
      meta: [
        { property: 'og:type', content: 'website' },
        { property: 'og:site_name', content: 'Cocoa Gallery' },
        { property: 'og:image', content: 'https://static-assets.amase.xyz/icon.png', },
      ]
    }
  }
})
