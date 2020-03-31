import Vue from "vue";
import Vuex from "vuex";
import actions from "../src/store/actions";
import mutations from "../src/store/mutations";
import getters from "../src/store/getters";
import profile from "./store/modules/profile";

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== "production";

export default new Vuex.Store({
  modules: {
    profile
  },
  strict: debug,
  state: {
    logged: {},
    userInfo:{},
    snackbar: {status: false,message: ''},
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
