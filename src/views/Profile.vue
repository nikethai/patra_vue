<template>
  <v-container fluid>
    <v-tabs background-color="blue lighten-3" centered dark v-model="tab">
      <v-tab>Profile</v-tab>
      <v-tab>Organizations</v-tab>
      <v-tabs-items v-model="tab">
        <v-tab-item>
          <v-card flat>
            <v-row justify="center" class="pt-5">
              <v-col cols="4">
                <v-row justify="center">
                  <v-avatar size="128px">
                    <v-img src="https://randomuser.me/api/portraits/men/85.jpg"/>
                  </v-avatar>
                </v-row>
                <v-row justify="center" class="headline">
                  {{ full_name }}
                </v-row>
                <v-row justify="center" class="subtitle-1">
                  @{{ username }}
                </v-row>
              </v-col>
              <v-col cols="6" class="">
                <v-row>
                  <v-text-field label="Email" :value="email" class="title"></v-text-field>
                </v-row>
                <v-row>
                  <b-button>
                    Change email address
                  </b-button>
                </v-row>
                <v-row>
                  <b-button>
                    Change password
                  </b-button>
                </v-row>
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
              <v-list class="grey lighten-4" v-if="usrOrg" disabled>
                <v-list-item v-for="org in usrOrg" :key="org.orgId">
                  <v-list-item-content>
                    <v-list-item-title v-text="org.name"></v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
              <div v-if="errors.length">
                <b>Error(s) occurred:</b>
                <ul>
                  <b-alert show variant="danger">
                    <li :key="error" v-for="error in errors">{{ error }}</li>
                  </b-alert>
                </ul>
              </div>
              <v-container>
                <v-combobox
                  @input="onSelectedOrg"
                  outlined
                  dense
                  :items="getAllOrg"
                  item-text="name"
                  return-object
                  label="Select the department you want to join"
                ></v-combobox>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-btn @click="onJoinButtonPressed" color="accent">Join</v-btn>
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
      tab: null,
      errors: [],
      usrOrg: []
    };
  },
  asyncComputed: {
    ...mapState("profile", ["username", "full_name", "email", "photo_url"]),
    getSelectOrg: {
      get() {
        return "";
      },
      set(value) {
        console.log("called value: ", value);
      }
    },
    async getAllOrg() {
      let jwt = localStorage.getItem("jwt");
      let getOrgResp;
      if (jwt != null) {
        getOrgResp = await helper.getAllOrgHelp(jwt);
      }
      console.log(getOrgResp);
      if (getOrgResp.status === 200) {
        return getOrgResp.data;
      }
      return [];
    },
    async getUsrOrg() {
      let user_info = localStorage.getItem("user_info");
      let jwt = localStorage.getItem("jwt");
      let username = "";
      let getUsrOrgResp;
      if (user_info != null && jwt != null) {
        user_info = JSON.parse(user_info);
        username = user_info.username;
        getUsrOrgResp = await helper.getUserOrgHelp(username, jwt);
      }
      console.log("get usr org ", getUsrOrgResp);
      if (getUsrOrgResp.status === 200) {
        this.usrOrg = [...getUsrOrgResp.data];
      }
      return this.usrOrg;
    }
  },
  methods: {
    ...mapActions("profile", ["fetchProfile"]),

    onSelectedOrg(value) {
      console.log(value);
      this.selected = value;
    },
    async onJoinButtonPressed() {
      let jwt = localStorage.getItem("jwt");
      let userInfo = localStorage.getItem("user_info");
      let joinResp;
      if (
        this.selected != null &&
        this.selected.orgId.length &&
        jwt != null &&
        userInfo != null
      ) {
        userInfo = JSON.parse(userInfo);
        joinResp = await helper.addUserToOrgHelp(
          this.selected.orgId,
          userInfo.username,
          jwt
        );
        if (joinResp.status === 200) {
          this.$store.dispatch("setSnackbar", {
            status: true,
            message: "Successfully Joined!"
          });
        } else if (joinResp.status === 500) {
          this.errors.push("You are already in this org");
        }
      }
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
