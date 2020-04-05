<template>
  <v-container fluid>
    <v-row justify="center">
      <v-col cols="8">
        <div v-if="getUserInfo && Object.keys(getUserInfo).length > 0">
          <v-btn color="info" style="pointer-events: none" text
            >Welcome,{{ getUserInfo.name }}.</v-btn
          >
          <v-select
            :items="getUsrOrg"
            return-object
            item-text="name"
            @input="onSelectOrg"
            label="Select organization"
            dense
            solo
          ></v-select>
          <p class="title align-start d-flex"><v-icon>mdi-star</v-icon>STARED SHEETS</p>
          <p class="title align-start d-flex"><v-icon>mdi-factory</v-icon>ORGANIZATIONS SHEETS</p>
          <v-row :key="sheet.id" cols="12" md="4" v-for="sheet in allSheet">
            <v-container fluid>
              <v-card @click="doSomething(sheet)">
                <v-card-actions>
                  <p class="d-flex align-content-start success--text subtitle-1">{{ sheet.sheetName }}</p>
                </v-card-actions>
                <v-card-subtitle>
                  <v-progress-linear buffer-value="90"></v-progress-linear>
                </v-card-subtitle>
              </v-card>
            </v-container>
          </v-row>
        </div>
        <div v-else>
          <h3>Login to see your collaborators worksheets</h3>
          <v-btn @click="loginIsPressed()" color="warning">Login</v-btn>
          <h5>Don't have an account?</h5>
          <v-btn @click="regisIsPressed()" color="error" outlined
            >Register</v-btn
          >
        </div>
      </v-col>
    </v-row>
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
