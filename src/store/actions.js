import axios from 'axios'
import qs from 'querystring'

export default {
  async login({ commit }, form) {
    let config = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    };
    console.log(qs.stringify(form));
    axios
      .post(`${process.env.VUE_APP_API_URL}/api/login`, qs.stringify(form), config)
      .then(res => {
        // console.log(res.headers.authorization);
        localStorage.setItem("jwt", res.headers.authorization);

        if (localStorage.getItem("jwt") != null) {
          // axios.get(`${process.env.VUE_APP_API_URL}/api/v0/users`)
        }

      })
      .catch(e => console.log(e)); //eslint-disable-line no-console
    // commit("addUser", resp.data);
  },
  async fetchLogged({ commit }) {
    if (localStorage.getItem("jwt") != null) {
      for (var i = 0; i < localStorage.key("jwt").length; i++) {
        // use key name to retrieve the corresponding value
        let value = localStorage.getItem("jwt");

        // console.log the iteration key and value
        console.log("Value: " + value);
        commit("setUser", value);
      }
    }
  },
  async logout({ commit }) {
    if (localStorage.getItem("jwt") != null) {
      for (var i = 0; i < localStorage.key("jwt").length; i++) {
        // use key name to retrieve the corresponding value
        localStorage.removeItem("jwt");
        commit("removeUser");
      }
    }
  },
  async fetchTask({ commit }) {
    console.log('hello')
    let task = {};
    axios
      .get(`${process.env.VUE_APP_API_URL}/api/v0/tasks/5e7a3c84e19304306d8df6e9`)
      .then(res => {
        commit("addTask",res.data)
        console.log(res)
      })
      .catch(e => console.log(e))
    // commit("addTask");
  },
  async addTask({ commit }, newTask) {
    commit("addTask", newTask);
  },
  // async editTask({ commit }, updateTask) {},
  async delTask({ commit }, delItem) {
    commit("deleteTask", delItem);
  },
  async getTask({ commit }, task) {
    commit("getTask", task);
  },
  async setLoginDialog({ commit }) {
    commit("setLoginDialog");
  },
  async setRegisterDialog({ commit }) {
    commit("setRegisterDialog");
  },
};
