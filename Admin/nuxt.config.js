export default {
  // Target (https://go.nuxtjs.dev/config-target)
  target: 'server',

  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: 'Admin',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [
  ],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
  ],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    '@nuxtjs/vuetify'
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    '@nuxt/http'
  ],

  vuetify: {
    customVariables: ["~/assets/variables.scss"],
    optionsPath: "./vuetify.options.js"
  },

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
    extend(config, ctx) {
       if (ctx.isDev) {
         config.devtool = ctx.isClient ? 'source-map' : 'inline-source-map'
       }
    }
  },

  http: {
    proxy: true,
    //debug: true
  },

  proxy: {
    '/api/flyers/fetcher': {
      target: "http://flyersfetcher:3005",
      pathRewrite: { '^/api/': '' }
    },
    '/api/flyers': {
      target: "http://flyers:3004",
      pathRewrite: { '^/api/': '' }
    },
    '/api/recipes/fetcher': {
      target: "http://recipesfetcher:3003",
      pathRewrite: { '^/api/': '' }
    },
    '/api/recipes': {
      target: "http://recipes:3002",
      pathRewrite: { '^/api/': '' }
    }
  }
}
