export default {
  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: "nuxt-blog",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" }
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }]
  },
  loading: true,
  loading: {
    color: "#04ff00",
    height: "4px",
    continuous: true
  },
  env: {
    baseURL: process.env.VUE_APP_BASE_API_URL
  },
  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: ["~/libs/styles/css/reset.css", "~/libs/styles/scss/main.scss"],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
    "@/plugins/vuex-persist.client",
    "@/plugins/cookie-universial-nuxt",
    "@/plugins/vue-notification.client",
    "@/plugins/api",
    "@/plugins/vuelidate",
    "@/plugins/vue-content-placeholder"
  ],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    "@nuxtjs/axios",
    "@nuxtjs/style-resources",
    "cookie-universal-nuxt",
    "nuxt-i18n",
    [
      "nuxt-fontawesome",
      {
        imports: [
          {
            set: "@fortawesome/free-solid-svg-icons",
            icons: [
              "faEnvelope",
              "faSearch",
              "faUser",
              "faLock",
              "faUserCog",
              "faGlobeAsia",
              "faPager",
              "faThumbtack",
              "faImage",
              "faHome",
              "faHandLizard",
              "faCog",
              "faSignOutAlt",
              "faBars",
              "faIdCard",
              "faUserPlus",
              "faAt",
              "faCamera",
              "faEdit",
              "faTrashAlt"
            ]
          },
          {
            set: "@fortawesome/free-brands-svg-icons",
            icons: [
              "faGithubSquare",
              "faFacebookSquare",
              "faTwitterSquare",
              "faYoutubeSquare",
              "faAutoprefixer"
            ]
          }
        ]
      }
    ]
  ],
  i18n: {
    locales: ["en", "vi"],
    defaultLocale: "en",
    strategy: "no_prefix",
    detectBrowserLanguage: {
      useCookie: true
    },
    vueI18n: {
      fallbackLocale: "en",
      messages: {
        en: require("./lang/en.json"),
        vi: require("./lang/vi.json")
      }
    }
  },
  axios: {
    baseURL: "http://localhost:8080/api/v1"
  },
  styleResources: {
    scss: [
      "~/libs/styles/scss/_colors.scss",
      "~/libs/styles/scss/_mixins.scss",
      "~/libs/styles/scss/_variables.scss"
    ]
  },
  vue: {
    config: {
      productionTip: false,
      devtools: true
    }
  },

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {}
};
