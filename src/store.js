import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

import actions from "../src/store/actions";
import mutations from "../src/store/mutations";
import getters from "../src/store/getters";

export default new Vuex.Store({
  state: {
    logged: {},
    userInfo:{},
    task: [],
    sheet:[],
    viewTask: {},
    loginDialog: false,
    registerDialog: false,
  },
  getters,
  actions,
  mutations
});
