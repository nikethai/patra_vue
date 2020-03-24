export default {
  async login({ commit }, resp) {
    commit("addUser", resp.data);
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
