import api from "../apis";
import axios from "axios";

const profileService = {
  get: async router => {
    const username = router.currentRoute.params.username;
    if (username) {
      let resp = await axios.get(api.profile.get.replace(":username", username));
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
