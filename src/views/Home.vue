<template>
  <v-container fluid>
    <v-row justify="center">
      <v-col cols="8">
        <div v-if="getUserInfo && Object.keys(getUserInfo).length > 0">
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
          <v-dialog v-if="select.length" max-width="600px" v-model="addDialog">
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
                      <v-text-field
                        v-model="sheetName"
                        :rules="[rules.required]"
                        label="Sheet Name"
                      ></v-text-field>
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
                <v-btn @click="onAddSheet()" color="primary" depressed>Create</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-btn v-if="allSheet.length" class="mx-0" fab dark small color="red">
            <v-icon @click="isDelete = !isDelete" dark>mdi-minus</v-icon>
          </v-btn>
          <p class="title align-start d-flex">
            <v-icon>mdi-star</v-icon>STARED SHEETS
          </p>
          <p class="title align-start d-flex">
            <v-icon>mdi-factory</v-icon>ORGANIZATIONS SHEETS
          </p>
          <span v-if="!isDelete">
            <v-row :key="sheet.id" cols="12" md="4" v-for="sheet in allSheet">
              <v-container fluid>
                <v-card @click="doSomething(sheet)">
                  <v-card-actions>
                    <p
                      class="d-flex align-content-start success--text subtitle-1"
                    >{{ sheet.sheetName }}</p>
                  </v-card-actions>
                  <v-card-subtitle>
                    <p
                      class="d-flex align-content-start info--text subtitle-2"
                    >{{sheet.sheetDescription}}</p>
                    <v-progress-linear buffer-value="90"></v-progress-linear>
                  </v-card-subtitle>
                </v-card>
              </v-container>
            </v-row>
          </span>
          <span v-else>
            <v-row :key="sheet.id" cols="12" md="4" v-for="sheet in allSheet">
              <v-container fluid>
                <v-card color="red lighten-3" @click.stop="openDeleteDialog(sheet)">
                  <v-card-actions>
                    <p
                      class="d-flex align-content-start success--text subtitle-1"
                    >{{ sheet.sheetName }}</p>
                  </v-card-actions>
                  <v-card-subtitle>
                    <p
                      class="d-flex align-content-start info--text subtitle-2"
                    >{{sheet.sheetDescription}}</p>
                    <v-progress-linear buffer-value="90"></v-progress-linear>
                  </v-card-subtitle>
                </v-card>
              </v-container>
            </v-row>
            <v-dialog v-model="deleteDialog" persistent max-width="290">
              <v-card>
                <v-card-title>Delete this sheet?</v-card-title>
                <v-card-subtitle>
                  <b>This action cannot be reverted!</b>
                </v-card-subtitle>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="green darken-1" text @click="deleteDialog = false">No</v-btn>
                  <v-btn color="red darken-1" text @click="deleteTask()">Yes</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </span>
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
                      <base-button type="neutral">
                        <img slot="icon" src="img/icons/google.svg" />
                        <g-signin-button
                          :params="googleSignInParams"
                          @success="onSignInSuccess"
                          @error="onSignInError"
                        >Google</g-signin-button>
                      </base-button>
                    </div>
                  </template>
                  <template>
                    <div class="text-center text-muted mb-4">
                      <small>Or sign in with credentials</small>
                    </div>
                    <div class="text-center">
                      <base-button type="primary" @click="loginIsPressed()" class="my-4">Sign In</base-button>
                    </div>
                    <v-card-subtitle>
                      <v-row no-gutters>
                        <v-col cols="12">
                          <a @click="regisIsPressed()" class="text-light-blue">
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
  components: { BaseButton },
  data() {
    return {
      usrOrg: [],
      select: "",
      errors: [],
      sheetName: "",
      sheetDesc: "",
      addDialog: false,
      isDelete: false,
      deleteDialog: false,
      deleteSheetId: "",
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
      this.$store.dispatch("getTask", {});
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
    },
    openDeleteDialog(sheet) {
      this.deleteSheetId = sheet.sheetId;
      this.deleteDialog = true;
    },
    async deleteTask() {
      let jwt = localStorage.getItem("jwt");

      if (
        this.deleteSheetId != null &&
        this.deleteSheetId.length &&
        jwt != null
      ) {
        let delSheetResp = await helper.deleteSheetHelp(
          this.deleteSheetId,
          jwt
        );
        if (delSheetResp.status === 200) {
          this.$store.dispatch("setSnackbar", {
            status: true,
            message: "Delete Successfully!"
          });
          this.deleteDialog = false;
          this.fetch_sh();
        } else {
          console.log(delSheetResp);
          this.$store.dispatch("setSnackbar", {
            status: true,
            message: "Delete Failed!"
          });
        }
      }
    },
    async onAddSheet() {
      let jwt = localStorage.getItem("jwt");
      if (
        this.select != null &&
        this.sheetName.length &&
        this.sheetDesc.length &&
        jwt != null
      ) {
        let addSheetResp = await helper.addSheetHelp(
          this.select,
          this.sheetName,
          this.sheetDesc,
          jwt
        );
        if (addSheetResp.status === 200) {
          this.$store.dispatch("setSnackbar", {
            status: true,
            message: "Add Successfully!"
          });
          this.addDialog = false;
          this.sheetName = "";
          this.sheetDesc = "";
          this.fetch_sh();
        } else {
          console.log(addSheetResp);
          this.$store.dispatch("setSnackbar", {
            status: true,
            message: "Add Failed!"
          });
        }
      }
    }
  },
  computed: {
    ...mapGetters(["allSheet", "getUserInfo"])
  },
  mounted() {
    this.getUsrOrg();
  },
  watch: {
    getUserInfo: function() {
      this.getUsrOrg();
    }
  }
};
</script>

<style scoped>
</style>
