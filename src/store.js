import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

import actions from "../src/store/actions";
import mutations from "../src/store/mutations";
import getters from "../src/store/getters";

export default new Vuex.Store({
  state: {
    logged: [],
    task: [],
    task_i: [
      {
        id: 1,
        name: "Nam nyan",
        isCompleted: false,
        desc:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        comments: [
          {id:1, content: "DMCS"},
          {id:2, content: "Devil May Cry Superaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"},
        ]
      },
      { id: 2, name: "Tus Tus", isCompleted: true, desc: '',comments:[]},
      { id: 3, name: "Thong always Wong", isCompleted: false,desc:'',comments:[] }
    ],
    viewTask: {},
    loginDialog: false,
    registerDialog: false,
  },
  getters,
  actions,
  mutations
});
