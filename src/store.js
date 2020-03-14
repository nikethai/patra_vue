import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    logged: []
  },
  getters: {
    allUsers: state => state.logged
  },
  actions: {
    async login({ commit },resp) {
      commit('addUser', resp.data);
    },
    async fetchLogged({ commit }) {
      if (localStorage.getItem("jwt") != null) {
        for (var i = 0; i < localStorage.key('jwt').length; i++) {
          // use key name to retrieve the corresponding value
          let value = localStorage.getItem('jwt');

          // console.log the iteration key and value
          console.log('Value: ' + value);
          commit('setUser', value);

        }
      }
    }
  },
  mutations: {
    addUser: (state, data) => (state.logged.push(data)),
    setUser: (state, logged) => (state.logged = logged)
  }

});
