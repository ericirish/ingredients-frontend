import colors from 'vuetify/es5/util/colors'
import axios from 'axios'

const API_URL = process.env.API_URL || 'http://localhost:3030'

export default {
  target: 'static',
  env: {
    API_URL
  },
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Are They Woke',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Find out if a company is woke or not.' },
      { hid: 'og:site_name', name: 'og:site_name', content: 'Are They Woke?' },
      { hid: 'og:image', name: 'og:image', content: 'https://aretheywoke.com/ogimage.png' },
      { hid: 'og:description', name: 'og:description', content: 'Find out if a company is woke or not.' },
      { hid: 'og:title', property: 'og:title', content: 'Are They Woke?' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicons/favicon.ico' },
      { rel: 'apple-touch-icon-precomposed', href: '/favicons/apple-touch-icon-57x57.png' },
      { rel: 'apple-touch-icon-precomposed', href: '/favicons/apple-touch-icon-114x114.png' },
      { rel: 'apple-touch-icon-precomposed', href: '/favicons/apple-touch-icon-72x72.png' },
      { rel: 'apple-touch-icon-precomposed', href: '/favicons/apple-touch-icon-144x144.png' },
      { rel: 'apple-touch-icon-precomposed', href: '/favicons/apple-touch-icon-60x60.png' },
      { rel: 'apple-touch-icon-precomposed', href: '/favicons/apple-touch-icon-120x120.png' },
      { rel: 'apple-touch-icon-precomposed', href: '/favicons/apple-touch-icon-76x76.png' },
      { rel: 'apple-touch-icon-precomposed', href: '/favicons/apple-touch-icon-152x152.png' },
      { rel: 'icon', type: 'image/png', href: '/favicons/favicon-196x196.png' },
      { rel: 'icon', type: 'image/png', href: '/favicons/favicon-96x96.png' },
      { rel: 'icon', type: 'image/png', href: '/favicons/favicon-32x32.png' },
      { rel: 'icon', type: 'image/png', href: '/favicons/favicon-16x16.png' },
      { rel: 'icon', type: 'image/png', href: '/favicons/favicon-128.png' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/feathers-vuex',
    {
      src: '~/plugins/confirm', mode: 'client'
    }
  ],

  build: {
    transpile: ['feathers-vuex']
  },

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: {
    dirs: [
      '~/components',
      '~/components/company'
    ]
  },

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
    '@nuxtjs/composition-api/module',
    '@nuxtjs/google-fonts',
    '@nuxtjs/pwa'
  ],

  pwa: {
    workbox: false
  },

  googleFonts: {
    families: {
      Jost: {
        wght: [300, 400, 500, 600, 700]
      }
    },
    display: 'swap'
  },

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/dayjs',
    'nuxt-client-init-module',
    '@nuxtjs/google-gtag',
    'nuxt-health',
    '@nuxtjs/sitemap',
    '@codamic/nuxt-vuetify-snack-stack'
  ],

  health: {
    path: '/health-check'
  },

  'google-gtag': {
    id: 'G-X15K64HWJR'
  },

  dayjs: {
    defaultTimeZone: 'GMT',
    plugins: [
      'utc',
      'relativeTime',
      'timezone'
    ]
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {},

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    defaultAssets: {
      font: false
    },
    treeShake: true,
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: false,
      options: {
        customProperties: true
      },
      themes: {
        light: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3,
          background: '#f7f8f9'
        }
      }
    }
  },

  sitemap: {
    cacheTime: 1000 * 60 * 24,
    sitemaps: [
      {
        path: '/companies-sitemap.xml',
        routes: async () => {
          console.log('Generating Companies Sitemap')
          const { data: companySlugs } = await axios.get(`${API_URL}/slugs?type=companies`)

          console.log(`Got ${companySlugs.length} company slugs`)

          const returnArr = []

          for (const company of companySlugs) {
            const returnObj = {
              url: `/companies/${company.slug}`,
              lastmod: new Date(company.updatedAt)
            }
            returnArr.push(returnObj)
          }

          return returnArr
        }
      },
      {
        path: '/groups-sitemap.xml',
        routes: async () => {
          console.log('Generating Groups Sitemap')
          const { data: groupSlugs } = await axios.get(`${API_URL}/slugs?type=groups`)

          console.log(`Got ${groupSlugs.length} group slugs`)

          const returnArr = []

          for (const group of groupSlugs) {
            const returnObj = {
              url: `/groups/${group.slug}`,
              lastmod: group.updatedAt
            }
            returnArr.push(returnObj)
          }

          return returnArr
        }
      }
    ]
  }
}
