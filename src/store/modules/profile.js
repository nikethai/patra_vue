import profileService from "@/api/services/profile";
import router from "@/router";

const state = {
  username: "",
  full_name: "",
  email: "",
  photo_url: ""
};

const actions = {
  //TODO view if this profile is public
  async fetchProfile({ commit }) {
    let profile = await profileService.get(router);
    commit("setProfile", profile);
  }
};

const mutations = {
  setProfile(state, info) {
    state.username = info.username;
    state.full_name = info.name;
    state.email = info.email;
    state.photo_url = info.photo_url;
  }
};

export default {
  namespaced: true,
  state,
  actions,
  mutations
};
