import tailwindcss from "@tailwindcss/vite";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  app: {
    // Override with NUXT_APP_BASE_URL=/hesoyam/ for project Pages without a custom domain.
    pageTransition: { name: 'fadeInUp', mode: 'out-in' },
  },
  nitro: {
    prerender: {
      crawlLinks: true,
    },
  },

  vite: {
    plugins: [
      tailwindcss(),
    ],
  },

  // '@aezakmiproject/hesoyam/nuxt' is the published design system module; the
  // shadcn module only serves the leftover Card and Sidebar surfaces that
  // Hesoyam does not ship.
  modules: ['@aezakmiproject/hesoyam/nuxt', '@nuxt/fonts', 'shadcn-nuxt', '@nuxtjs/i18n'],
  fonts: {
    families: [
      { name: 'Geologica', weights: ['100 900'], styles: ['normal'] },
      { name: 'Geist Mono', weights: [400, 500], styles: ['normal'] },
    ],
  },
  shadcn: {
    prefix: '',
    componentDir: '@/components/ui',
  },

  i18n: {
    defaultLocale: 'en',
    strategy: 'no_prefix',
    locales: [
      { code: 'en', language: 'en-US', name: 'English', file: 'en.json' },
      { code: 'ru', language: 'ru-RU', name: 'Русский', file: 'ru.json' },
    ],
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_locale',
      fallbackLocale: 'en',
    },
  },
})