<template>
  <v-container fluid>
    <div v-if=" getUserInfo && Object.keys(getUserInfo).length > 0">
      <v-btn color="info" style="pointer-events: none" text>Welcome,{{ getUserInfo.name }}.</v-btn>
      <v-select
        :items="getUsrOrg"
        return-object
        item-text="name"
        @input="onSelectOrg"
        label="Select the organize where you want to get your sheet"
        dense
        solo
      ></v-select>
      <v-row>
        <v-col :key="sheet.id" cols="12" md="4" v-for="sheet in allSheet">
          <v-card @click="doSomething(sheet)">
            <v-btn color="success" text>{{ sheet.sheetName }}</v-btn>
          </v-card>
        </v-col>
      </v-row>
    </div>
    <div v-else>
      <h3>Welcome to PATRA, you must login to see your checklist</h3>
      <v-btn @click="loginIsPressed()" color="warning">Login</v-btn>
      <h5>Don't have an account?</h5>
      <v-btn @click="regisIsPressed()" color="error" outlined>Register</v-btn>
    </div>
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import helper from "@/util/fetchHelper.js";

export default {
  name: "Home",
  data() {
    return {
      usrOrg: [],
      select: ""
    };
  },
  methods: {
    ...mapActions(["fetchSheet", "setRegisterDialog", "setLoginDialog"]),
    doSomething(sheet) {
      let id = sheet.sheetId;
      localStorage.setItem("sheet_name", sheet.sheetName);
      this.$router.push({ path: `/task/${id}` });
    },
    loginIsPressed() {
      this.setLoginDialog();
    },
    regisIsPressed() {
      this.setRegisterDialog();
    },
    fetch_sh() {
      // let info = localStorage.getItem("user_info");
      if (this.select != null && this.select.length) {
        this.fetchSheet(this.select);
      }
      // this.fetchSheet("5e78ed4a8af9f46f8f6bb6de");
      // }
    },
    onSelectOrg(value) {
      this.select = value.orgId;
      this.fetch_sh();
    }
  },
  mounted() {
    // this.fetch_sh();
  },
  asyncComputed: {
    ...mapGetters(["allSheet", "getUserInfo"]),
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
  watch: {
    // getUserInfo: function() {
    //   this.fetch_sh();
    // }
  }
};
</script>

<style scoped></style>
