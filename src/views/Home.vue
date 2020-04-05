<template>
  <v-container fluid>
    <v-row justify="center">
      <v-col cols="8">
        <div v-if="getUserInfo && Object.keys(getUserInfo).length > 0">
          <v-btn color="info" style="pointer-events: none" text
            >Welcome,{{ getUserInfo.name }}.</v-btn
          >
          <v-select
            :items="usrOrg"
            return-object
            item-text="name"
            @input="onSelectOrg"
            label="Select the organize where you want to get your sheet"
            dense
            solo
          ></v-select>
          <v-btn class="mx-0" fab small dark color="indigo">
            <v-icon dark>mdi-plus</v-icon>
          </v-btn>
          <v-btn class="mx-0" fab dark small color="red">
            <v-icon dark>mdi-minus</v-icon>
          </v-btn>
          <p class="title align-start d-flex">
            <v-icon>mdi-star</v-icon>STARED SHEETS
          </p>
          <p class="title align-start d-flex">
            <v-icon>mdi-factory</v-icon>ORGANIZATIONS SHEETS
          </p>
          <v-row :key="sheet.id" cols="12" md="4" v-for="sheet in allSheet">
            <v-container fluid>
              <v-card @click="doSomething(sheet)">
                <v-card-actions>
                  <p
                    class="d-flex align-content-start success--text subtitle-1"
                  >
                    {{ sheet.sheetName }}
                  </p>
                </v-card-actions>
                <v-card-subtitle>
                  <v-progress-linear buffer-value="90"></v-progress-linear>
                </v-card-subtitle>
              </v-card>
            </v-container>
          </v-row>
        </div>
        <div v-else>
          <h3>Sign in to see your collaborators worksheets</h3>
          <div class="container pt-lg-md">
            <div class="row justify-content-center">
              <div class="col-lg-5">
                <v-card
                  type="secondary"
                  shadow
                  header-classes="bg-white pb-5"
                  body-classes="px-lg-5 py-lg-5"
                  class="border-0 pa-2"
                >
                  <template>
                    <div class="text-muted text-center mb-3">
                      <small>Sign in with</small>
                    </div>
                    <div class="btn-wrapper text-center">
                      <base-button type="neutral" outline>
                        <img slot="icon" src="img/icons/github.svg" />
                        Github
                      </base-button>
                      <base-button type="neutral">
                        <img slot="icon" src="img/icons/google.svg" />
                        Google
                      </base-button>
                    </div>
                  </template>
                  <template>
                    <div class="text-center text-muted mb-4">
                      <small>Or sign in with credentials</small>
                    </div>
                    <form role="form">
                      <base-input
                        alternative
                        class="mb-3"
                        placeholder="Username or email"
                        addon-left-icon="mdi-account"
                      >
                      </base-input>
                      <base-input
                        alternative
                        type="password"
                        placeholder="Password"
                        addon-left-icon="mdi-lock"
                      >
                      </base-input>
                      <base-checkbox>
                        Remember me
                      </base-checkbox>
                      <div class="text-center">
                        <base-button type="primary" class="my-4"
                          >Sign In</base-button
                        >
                      </div>
                    </form>
                    <v-card-subtitle>
                      <v-row no-gutters>
                        <v-col cols="6">
                          <a href="#" class="text-light-blue">
                            <small>Forgot password?</small>
                          </a>
                        </v-col>
                        <v-col cols="6">
                          <a href="#" class="text-light-blue">
                            <small>Register</small>
                          </a>
                        </v-col>
                      </v-row>
                    </v-card-subtitle>
                  </template>
                </v-card>
              </div>
            </div>
          </div>
          <g-signin-button
            :params="googleSignInParams"
            @success="onSignInSuccess"
            @error="onSignInError"
            >Sign in with Google</g-signin-button
          >
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import helper from "@/util/fetchHelper.js";
import BaseButton from "../components/BaseButton";
import BaseCheckbox from "../components/BaseCheckbox";
import BaseInput from "../components/BaseInput";

export default {
  name: "Home",
  components: { BaseInput, BaseCheckbox, BaseButton },
  data() {
    return {
      usrOrg: [],
      select: "",
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
      if (this.select != null && this.select.length) {
        localStorage.setItem("select_org", this.select);
        this.fetchSheet(this.select);
      }
    },
    onSelectOrg(value) {
      this.select = value.orgId;
      this.fetch_sh();
    },
    async getUsrOrg() {
      let user_info = await localStorage.getItem("user_info");
      let jwt = await localStorage.getItem("jwt");
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
        console.log("token: ", token);

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

<style scoped>
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
