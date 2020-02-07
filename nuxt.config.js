module.exports = {
  mode: "universal",
  /*
   ** Headers of the page
   */
  head: {
    title: process.env.npm_package_name || "",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        content: process.env.npm_package_description || ""
      }
    ],
    link: [
      { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
      { rel: "shortcut icon", type: "image/x-icon", href: "/favicon.ico" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css?family=Nunito&display=swap"
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/icon?family=Material+Icons"
      }
    ]
  },
  serverMiddleware: ["~/api/portfolio", "~/api/auth", "~/api/contact-form"],
  server: {
    host: "0.0.0.0",
    port: process.env.PORT
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: "#1470a6", failedColor: "#f25252", height: "5px" },
  /*
   ** Global CSS
   */
  css: [],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [],
  /*
   ** Nuxt.js modules
   */
  modules: ["nuxt-polyfill", "@nuxtjs/axios", "@nuxtjs/auth"],
  axios: {
    credentials: true
  },
  auth: {
    strategies: {
      local: {
        endpoints: {
          login: {
            url: "/api/auth/login",
            method: "post",
            propertyName: "token"
          },
          logout: { url: "/api/auth/logout", method: "post" },
          user: false
        }
      }
    },
    redirect: {
      login: "/admin/login",
      logout: "/admin",
      user: "/admin",
      home: "/admin"
    }
  },
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {
      if (ctx.isDev) {
        config.devtool = ctx.isClient ? "source-map" : "inline-source-map";
      }
    }
  },

  polyfill: {
    features: [
      {
        require: "smoothscroll-polyfill",

        // Detection found in source: https://github.com/iamdustan/smoothscroll/blob/master/src/smoothscroll.js
        detect: () =>
          "scrollBehavior" in document.documentElement.style &&
          window.__forceSmoothScrollPolyfill__ !== true,

        // Optional install function called client side after the package is required:
        install: smoothscroll => smoothscroll.polyfill()
      }
    ]
  }
};
