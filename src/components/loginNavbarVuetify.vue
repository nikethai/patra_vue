<template>
  <v-row justify="center">
    <v-dialog max-width="600px" persistent v-model="isLoginPressed">
      <v-card>
        <v-card-title>
          <span class="headline">Login</span>
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
              <v-text-field label="Username" :rules="[rules.required]" v-model="username"></v-text-field>
            </v-row>
            <v-row>
              <v-text-field
                v-model="password"
                :rules="[rules.required,rules.min]"
                :append-icon="passShow ? 'mdi-eye' : 'mdi-eye-off'"
                label="Password*"
                :type="passShow ? 'text' : 'password'"
                @click:append="passShow =! passShow"
              ></v-text-field>
            </v-row>
          </v-container>
        </v-card-text>
        <span>
          Don't have an account?
          <v-btn @click="registerIsPressed()" color="warning" small>Register!</v-btn>
        </span>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="loginIsPressed()" color="error" depressed>Cancel</v-btn>
          <v-btn @click="dialog = logg()" color="primary" depressed>Login</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>
<script>
import helper from "@/util/fetchHelper.js";
import { mapActions, mapGetters } from "vuex";

export default {
  data: () => ({
    username: "",
    password: "",
    passShow: false,
    rules: {
      required: value => !!value || "Required.",
      min: value => value.length >= 8 || "Min 8 characters"
    },
    errors: []
  }),
  methods: {
    ...mapActions([
      "setLoginDialog",
      "setRegisterDialog",
      "login",
      "fetchLogged",
      "fetchSheet",
      "setSnackbar"
    ]),
    registerIsPressed() {
      this.setLoginDialog();
      this.setRegisterDialog();
    },
    loginIsPressed() {
      this.setLoginDialog();
    },
    async logg() {
      this.errors = [];
      if (this.username && this.password) {
        let userInfoResp;
        let memInfoResp;
        let data = {
          username: this.username,
          password: this.password
        };
        let loginResp = await helper.loginHelp(data);
        console.log(loginResp);
        if (loginResp.status === 200) {
          localStorage.setItem("jwt", loginResp.headers.authorization);
          let jwt = localStorage.getItem("jwt");
          userInfoResp = await helper.userInfoHelp(jwt);
          if (userInfoResp.status === 200) {
            localStorage.setItem(
              "user_info",
              JSON.stringify(userInfoResp.data)
            );
            memInfoResp = await helper.memInfoHelp(
              userInfoResp.data.currMemberId
            );
            if (memInfoResp.status === 200) {
              localStorage.setItem(
                "mem_info",
                JSON.stringify(memInfoResp.data)
              );
              this.fetchLogged();
              this.setLoginDialog();
              this.setSnackbar({
                status: true,
                message: "Login Successfully!"
              });
            } else {
              this.errors.push("Can not get info!");
            }
          } else {
            this.errors.push("Can not get user info!");
          }
        } else {
          this.errors.push(
            "Login failed! Please check your username and password"
          );
        }
        this.username = "";
        this.password = "";
      }
    }
  },
  computed: {
    ...mapGetters(["isLoginPressed"])
  }
};
</script>
