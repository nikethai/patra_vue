import Vue from "vue";
import Vuex from "vuex";
import actions from "../src/store/actions";
import mutations from "../src/store/mutations";
import getters from "../src/store/getters";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    logged: {},
    userInfo:{},
    mem:[],
    task: [],
    sheet: [],
    viewTask: {},
    loginDialog: false,
    registerDialog: false,
  },
  getters,
  actions,
  mutations
});
