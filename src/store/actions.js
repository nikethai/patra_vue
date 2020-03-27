import axios from 'axios'
import qs from 'querystring'

export default {
  async login({ commit }, form) {
    let config_urlencode = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    };
    console.log(qs.stringify(form));
    axios
      .post(`${process.env.VUE_APP_API_URL}/api/login`, qs.stringify(form), config_urlencode)
      .then(res => {
        // console.log(res.headers.authorization);
        localStorage.setItem("jwt", res.headers.authorization);
        let jwt = localStorage.getItem("jwt");

        if (jwt != null) {
          axios
            .get(`${process.env.VUE_APP_API_URL}/api/v0/users`, {
              headers: {
                'Authorization': `Bearer ${jwt}`
              }
            })
            .then(res => {
              console.log('User data: ', res);
              localStorage.setItem('user_info', JSON.stringify(res.data));
            })
            .catch(e => console.log(e));//eslint-disable
        }

      })
      .catch(e => console.log(e)); //eslint-disable-line no-console
    // commit("addUser", resp.data);
  },
  async fetchLogged({ commit }) {
    if (localStorage.getItem("user_info") != null) {

      // use key name to retrieve the corresponding value
      let value = localStorage.getItem("user_info");

      // console.log the iteration key and value
      console.log("Value: "+ JSON.parse(value));
      commit("addUser", JSON.parse(value));

    }
  },
  async logout({ commit }) {
    if (localStorage.getItem("jwt") != null) {
      localStorage.removeItem("jwt");
    }
    if (localStorage.getItem("user_info") != null) {
      localStorage.removeItem("user_info");
    }
    commit("removeUser");
    commit("removeUserInfo");
  },
  async fetchTask({ commit },sheet_id) {
    axios
      .get(`${process.env.VUE_APP_API_URL}/api/v0/sheets/${sheet_id}/tasks`)
      .then(res => {
        commit("setTask", res.data)
      })
      .catch(e => console.log(e))//eslint-disable
    // commit("addTask");
  },
  async fetchSheet({ commit },orgID) {
    console.log('hello sheet')
    axios
      .get(`${process.env.VUE_APP_API_URL}/http://localhost:8081/api/v0/sheets/byOrg/${orgID}`)
      .then(res => {
        commit("addSheet", res.data)
      })
      .catch(e => console.log(e))//eslint-disable
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
