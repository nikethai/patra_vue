import api from "../apis";
import axios from "axios";

const profileService = {
  get: async router => {
    const username = router.currentRoute.params.username;
    let jwt = localStorage.getItem("jwt");
    let config = {};
    if (jwt != null) {
      config = {
        headers: {
          'Authorization': `Bearer ${jwt}`
        }
      }
    }
    if (username && config) {
      let resp = await axios.get(api.profile.get.replace(":username", username),config);
      return resp.data;
    } else {
      let localUsername = await localStorage.getItem("username");
      if (localUsername) {
        router.push({ name: "profile", params: localUsername });
      } else {
        router.push({ name: "home" });
      }
    }
  }
};

export default profileService;
