import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    logged: [],
    task: [{
      id: 1,
      name: "Nam nyan",
      isCompleted: false,
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    },
    { id: 2, name: "Tus Tus", isCompleted: true },
    { id: 3, name: "Thong always Wong", isCompleted: false }
    ],
    viewTask: {}
  },
  getters: {
    allUsers: state => state.logged,
    allTask: state => state.task,
    getTaskView: state => state.viewTask
  },
  actions: {
    async login({ commit }, resp) {
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
    },
    async addTask({ commit }, newTask) {
      commit('addTask', newTask);
    },
    async editTask({ commit }, updateTask) {

    },
    async markCompleted({ commit }, task) {
      commit('markCompleted', task);
    },
    async delTask({ commit }, delItem) {
      commit('deleteTask', delItem);
    },
    async getTask({ commit }, task) {
      commit('getTask', task);
    },
  },
  mutations: {
    addUser: (state, data) => (state.logged.push(data)),
    setUser: (state, logged) => (state.logged = logged),
    addTask: (state, newTask) => (state.task.push(newTask)),
    deleteTask: (state, delItem) => {
      let task = state.task;
      task.splice(task.findIndex(i => i.id == delItem), 1);
    },
    markCompleted: (state, task) => (task.isCompleted = !task.isCompleted),
    getTask: (state, task) => (state.viewTask = task)
  }

});
