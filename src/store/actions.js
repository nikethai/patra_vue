import axios from 'axios'
import qs from 'querystring'
import {qsHelp} from '@/util/qsHelper'

export default {
  async fetchLogged({ commit }) {
    if (localStorage.getItem("user_info") != null) {
      // use key name to retrieve the corresponding value
      let value = localStorage.getItem("user_info");
      let objValue = JSON.parse(value);

      // console.log the iteration key and value
      console.log("Value: " + objValue.currMemberId);
      commit("addUser", objValue);
    }
  },
  async logout({ commit }) {
    if (localStorage.getItem("jwt") != null) {
      localStorage.removeItem("jwt");
    }
    if (localStorage.getItem("user_info") != null) {
      localStorage.removeItem("user_info");
    }
    if (localStorage.getItem("mem_info") != null) {
      localStorage.removeItem("mem_info");
    }
    commit("removeUser");
    commit("removeUserInfo");
  },
  async fetchTask({ commit }, sheet_id) {
    axios
      .get(`${process.env.VUE_APP_API_URL}/api/v0/sheets/${sheet_id}/tasks`)
      .then(res => {
        commit("setTask", res.data);
      })
      .catch(e => console.log(e));
    // commit("addTask");
  },
  async fetchSheet({ commit }, orgID) {
    axios
      .get(`${process.env.VUE_APP_API_URL}/api/v0/sheets/byOrg/${orgID}`)
      .then(res => {
        commit("addSheet", res.data);
      })
      .catch(e => console.log(e));
    // commit("addTask");
  },
  // async getUserToAssign({ commit }, orgID) {},
  async getMemActions({ commit, state }) {
    const tsk = state.viewTask;

    // let memarr = [];
    let assi = tsk.assignee;
    let params = {};
    if (assi != null && Object.keys(assi).length > 0) {
      params = { memberIDs: [...assi] };
    }
    if (params != null && Object.keys(params).length > 0) {
      axios
        .get(
          `${process.env.VUE_APP_API_URL}/api/v0/members/?${qsHelp(params)}`
        )
        .then(res => {
          commit("addMem", res.data);
        })
        .catch(e => console.log(e));
    }
    // commit("addMem", mem);
  },
  async setMems({ commit }, newMem) {
    if (newMem != null){
      commit("addMem",newMem);
    }
  },
  async setSnackbar({commit},content){
    commit("setSnackbar",content);
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
  }
};
