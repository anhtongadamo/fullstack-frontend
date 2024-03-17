import Vue from "vue";
import Vuex from "vuex";

import bookingModule from "./booking";
import tourModule from "./tour";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    booking: bookingModule,
    tour: tourModule,
  },
});
