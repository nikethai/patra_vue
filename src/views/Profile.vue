<template>
  <v-container fluid>
    <v-tabs background-color="blue lighten-3" centered dark v-model="tab">
      <v-tab>Profile</v-tab>
      <v-tab>Organizations</v-tab>
      <v-tabs-items v-model="tab">
        <v-tab-item>
          <v-card flat>
            <v-row align-center class="mx-auto grey lighten-4">
              <v-col cols="12" md="6">
                <v-list-item-content>
                  <v-list-item-title>Photo</v-list-item-title>
                </v-list-item-content>
              </v-col>
              <v-col cols="12" md="6">
                <v-list-item-avatar>
                  <v-img src="https://randomuser.me/api/portraits/men/85.jpg" />
                </v-list-item-avatar>
                <v-list-item-action>
                  <v-btn color="grey" dark outlined>Change</v-btn>
                </v-list-item-action>
              </v-col>
              <v-col cols="12" md="6">
                <v-list-item-content>
                  <v-list-item-title>Password</v-list-item-title>
                </v-list-item-content>
              </v-col>
              <v-col cols="12" md="6">
                <v-btn color="error" outlined text>Reset Password?</v-btn>
              </v-col>
              <v-col cols="12" md="6">
                <v-list-item-content>
                  <v-list-item-title>Email</v-list-item-title>
                </v-list-item-content>
              </v-col>
              <v-col cols="12" md="6">
                <v-btn
                  color="purple lighten-3"
                  large
                  outlined
                  style="pointer-events: none"
                  text
                >{{ email }}</v-btn>
              </v-col>
              <v-col cols="12" md="6">
                <v-list-item-content>
                  <v-list-item-title>Full Name</v-list-item-title>
                </v-list-item-content>
              </v-col>
              <v-col cols="12" md="6">
                <v-btn
                  color="blue "
                  large
                  outlined
                  style="pointer-events: none"
                  text
                >{{ full_name }}</v-btn>
              </v-col>
            </v-row>
          </v-card>
        </v-tab-item>
        <v-tab-item>
          <v-card class="grey lighten-4">
            <v-card-title>
              <span class="headline">Your Departments</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-combobox
                  @input="onSelectedOrg"
                  :value="getUsrOrg"
                  outlined
                  dense
                  :items="getAllOrg"
                  item-text="name"
                  return-object
                  multiple
                  label="Select your department"
                ></v-combobox>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-btn color="accent">Join</v-btn>
            </v-card-actions>
          </v-card>
        </v-tab-item>
      </v-tabs-items>
    </v-tabs>
  </v-container>
</template>

<script>
import { mapActions, mapState } from "vuex";
import helper from "@/util/fetchHelper.js";

export default {
  name: "profile",
  data() {
    return {
      selected: "",
      tab: null
    };
  },
  asyncComputed: {
    ...mapState("profile", ["username", "full_name", "email", "photo_url"]),
    getSelectOrg: {
      get() {
        return "";
      },
      set(value) {
        console.log("select value: ", value);
      }
    },
    async getAllOrg() {
      let jwt = localStorage.getItem("jwt");
      let getOrgResp;
      if (jwt != null) {
        getOrgResp = await helper.getAllOrgHelp(jwt);
      }
      console.log(getOrgResp);

      return getOrgResp.data;
    },
    async getUsrOrg() {
      let user_info = localStorage.getItem("user_info");
      let jwt = localStorage.getItem("jwt");
      let username = "";
      let getOrgResp;
      if (user_info != null && jwt != null) {
        user_info = JSON.parse(user_info);
        username = user_info.username;
        getOrgResp = await helper.getUserOrgHelp(username, jwt);
      }
      console.log(getOrgResp);

      return getOrgResp.data;
    }
  },
  methods: {
    ...mapActions("profile", ["fetchProfile"]),

    onSelectedOrg(value) {
      console.log(value);
    }
  },
  beforeMount() {
    this.fetchProfile();
  }
};
</script>

<style scoped>
img {
  max-width: 100%;
  height: auto;
  margin-left: auto;
}
</style>
