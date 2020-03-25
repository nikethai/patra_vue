import axios from 'axios'

export default {
  async login({ commit }, form) {
    console.log(form);
    axios
      .post(`${process.env.VUE_APP_API_URL_HERO}/api/login`, form)
      .then(res => {
        console.log(res);
        // localStorage.setItem("jwt", res.data.token);

        // if (localStorage.getItem("jwt") != null) {
        //   this.login(res);
        //   if (this.$route.params.nextUrl != null) {
        //     this.$router.push(this.$route.params.nextUrl);
        //   }
        //   else {
        //     this.$refs['modal'].hide()
        //     this.$router.push('/users');
        //   }
        // }

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
  async fetchTask({ commit }) {
    let task = {};
    axios
      .get(`${process.env.VUE_APP_API_URL_HERO}/api/v0/tasks/5e7a3c84e19304306d8df6e9`)
      .then(res => {
        task = res
      })
      .catch(e => console.log(e))
      console.log(task);
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
