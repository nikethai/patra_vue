module.exports = {
  publicPath: process.env.NODE_ENV === "production" ? "patra_vue" : "/",
  configureWebpack: {
    devtool: "source-map"
  },
  transpileDependencies: ["vuetify"],
  pwa: {
    workboxPluginMode: "GenerateSW",
    workboxOptions: {
      navigateFallback: "/index.html",
      runtimeCaching: [
        {
          urlPattern: new RegExp("^"),
          handler: "networkFirst",
          options: {
            networkTimeoutSeconds: 20,
            cacheName: "api-cache",
            cacheableResponse: {
              statuses: [0, 200]
            }
          }
        }
      ]
    }
  }
};
