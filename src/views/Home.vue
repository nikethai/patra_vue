<template>
  <v-container fluid>
    <div v-if=" getUserInfo && Object.keys(getUserInfo).length > 0">
      <v-btn color="info" style="pointer-events: none" text>Welcome,{{ getUserInfo.name }}.</v-btn>
      <v-select
        :items="usrOrg"
        return-object
        item-text="name"
        @input="onSelectOrg"
        label="Select the organize where you want to get your sheet"
        dense
        solo
      ></v-select>

      <v-dialog v-if="allSheet.length" max-width="600px" v-model="addDialog">
        <template v-slot:activator="{ on }">
          <v-btn v-on="on" class="mx-0" fab small dark color="indigo">
            <v-icon dark>mdi-plus</v-icon>
          </v-btn>
        </template>
        <v-card>
          <v-card-title>
            <span class="headline">Add Sheet</span>
          </v-card-title>
          <div v-if="errors.length">
            <b>Please correct the following error(s):</b>
            <ul>
              <b-alert show variant="danger">
                <li :key="error" v-for="error in errors">{{ error }}</li>
              </b-alert>
            </ul>
          </div>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12">
                  <v-text-field v-model="sheetName" :rules="[rules.required]" label="Sheet Name"></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    v-model="sheetDesc"
                    :rules="[rules.required]"
                    label="Sheet Description"
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn @click="addDialog = false" color="error" depressed>Cancel</v-btn>
            <v-btn @click="addDialog = false" color="primary" depressed>Create</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-btn v-if="allSheet.length" class="mx-0" fab dark small color="red">
        <v-icon dark>mdi-minus</v-icon>
      </v-btn>
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
      <g-signin-button
        :params="googleSignInParams"
        @success="onSignInSuccess"
        @error="onSignInError"
      >Sign in with Google</g-signin-button>
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
      select: "",
      errors: [],
      sheetName: "",
      sheetDesc: "",
      addDialog: false,
      rules: {
        required: value => !!value || "Required."
      },
      googleSignInParams: {
        client_id:
          "265164074357-8f2qcit939i1dqomo5gvq4uq31h3b7fi.apps.googleusercontent.com"
      }
    };
  },
  methods: {
    ...mapActions([
      "fetchSheet",
      "setRegisterDialog",
      "setLoginDialog",
      "fetchLogged",
      "setSnackbar"
    ]),
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
        localStorage.setItem("select_org", this.select);
        this.fetchSheet(this.select);
      }
      // this.fetchSheet("5e78ed4a8af9f46f8f6bb6de");
      // }
    },
    onSelectOrg(value) {
      this.select = value.orgId;
      this.fetch_sh();
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
      if (getUsrOrgResp && getUsrOrgResp.status === 200) {
        this.usrOrg = [...getUsrOrgResp.data];
      }
    },
    async onSignInSuccess(googleUser) {
      // `googleUser` is the GoogleUser object that represents the just-signed-in user.
      // See https://developers.google.com/identity/sign-in/web/reference#users
      const resp = googleUser.getAuthResponse();
      let userInfoResp;
      if (resp != null) {
        let token = resp.id_token;
        if (token.length) {
          let data = {
            googleIdToken: token
          };
          let googleLoginResp = await helper.googleLoginHelp(data);
          if (googleLoginResp.status === 200) {
            let jwt = googleLoginResp.headers.authorization;
            // let jwt = localStorage.getItem("jwt");
            userInfoResp = await helper.userInfoHelp(jwt);
            if (userInfoResp.status === 200) {
              localStorage.setItem("jwt", jwt);
              localStorage.setItem(
                "user_info",
                JSON.stringify(userInfoResp.data)
              );
              this.fetchLogged();
              this.setSnackbar({
                status: true,
                message: "Login Successfully!"
              });
            }
          }
        } else {
          this.setSnackbar({
            status: true,
            message: "Login Failed!"
          });
        }
      }
    },
    onSignInError(error) {
      // `error` contains any error occurred.
      console.log("OH NOES", error);
    }
  },
  mounted() {
    // this.fetch_sh();
  },
  computed: {
    ...mapGetters(["allSheet", "getUserInfo"])
  },
  watch: {
    getUserInfo: function() {
      this.getUsrOrg();
    }
  }
};
</script>

<style scoped
>
.g-signin-button {
  /* This is where you control how the button looks. Be creative! */
  display: inline-block;
  padding: 4px 8px;
  border-radius: 3px;
  background-color: #3c82f7;
  color: #fff;
  box-shadow: 0 3px 0 #0f69ff;
}
</style>
