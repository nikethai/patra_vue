import Vue from "vue";
import BootstrapVue from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import Vuetify from "vuetify/lib";
import AsyncComputed from 'vue-async-computed';
import "./registerServiceWorker";

Vue.config.productionTip = false;
Vue.use(BootstrapVue);
Vue.use(Vuetify);
Vue.use(AsyncComputed);
Vue.component("v-alert", {});
Vue.component("v-app", {});

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount("#app");
