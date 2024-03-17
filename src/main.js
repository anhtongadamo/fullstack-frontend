import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import { http } from "./plugins/axios";
import { Toast, options } from "./plugins/vue-toastify";

Vue.config.productionTip = false;

Vue.use(http);
Vue.use(Toast, options);

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
