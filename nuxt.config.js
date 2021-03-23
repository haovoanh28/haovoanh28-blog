export default {
  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: "Tech Blog",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        content:
          "Đây là website được dùng để chia sẻ kiến thức và ghi lại những gì mình thích"
      },
      { name: "author", content: "haovoanh28 - Võ Anh Hào" },
      {
        name: "keywords",
        content:
          "haovoanh28, haovoanh28@gmail.com, Võ Anh Hào, Vo Anh Hao, Hao Vo"
      },
      {
        name: "google-site-verification",
        content: "t_lRNuZAkV-XqmJdaF2IPa9odR8cjUyGCpUEqw1LVf0"
      },
      {
        name: "google-site-verification",
        content: "AqGOuuSwsqzM7955GhqQcq38X1L0ejGF6F4ShEexMTE"
      }
    ],
    link: [
      {
        rel: "canonical",
        href: "https://haovoanh28.herokuapp.com/"
      },
      { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
      { rel: "preconnect", href: "https://fonts.gstatic.com" },
      {
        href:
          "https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@400;600;700&display=swap",
        rel: "stylesheet"
      }
    ]
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
    ["nuxt-canonical", { baseUrl: "https://haovoanh28.herokuapp.com" }],
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
              "faTrashAlt",
              "faCaretUp",
              "faGamepad",
              "faMusic",
              "faLaptopCode",
              "faMicrochip",
              "faQuestion",
              "faSpinner"
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
      "~/libs/styles/scss/_variables.scss",
      "~/libs/styles/scss/_keyframes.scss"
    ]
  },
  vue: {
    config: {
      productionTip: false,
      devtools: true
    }
  },

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
    splitChunks: {
      layouts: true,
      pages: true,
      commons: true
    }
  }
};
