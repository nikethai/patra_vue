<template>
  <v-row justify="center">
    <v-dialog max-width="600px" persistent v-model="isRegisterPressed">
      <v-card>
        <v-card-title>
          <span class="headline">Register</span>
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
                <v-text-field v-model="name" :rules="[rules.required]" label="Full name*"></v-text-field>
                <v-text-field v-model="username" :rules="[rules.required]" label="User name*"></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field v-model="email" :rules="[rules.required,rules.email]" label="Email*"></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="password"
                  :rules="[rules.required,rules.counter]"
                  :append-icon="passShow ? 'mdi-eye' : 'mdi-eye-off'"
                  label="Password*"
                  counter
                  :type="passShow ? 'text' : 'password'"
                  hint="Minimum 8 characters"
                  @click:append="passShow =! passShow"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>Have an account?
          <v-btn @click="LoginPress()" color="warning">Login</v-btn>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="CancelPress()" color="error" depressed>Cancel</v-btn>
          <v-btn @click="registerPress()" color="primary" depressed>Register</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import helper from "@/util/fetchHelper.js";

export default {
  data: () => ({
    dialog: false,
    snackbar: false,
    passShow: false,
    email: "",
    name: "",
    password: "",
    username: "",
    rules: {
      required: value => !!value || "Required.",
      counter: value => value.length >= 8 || "Min 8 characters",
      email: value => {
        const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return pattern.test(value) || "Invalid e-mail.";
      }
    },
    errors: []
  }),
  methods: {
    ...mapActions(["setRegisterDialog", "setLoginDialog"]),
    CancelPress() {
      this.setRegisterDialog();
    },
    LoginPress() {
      this.setLoginDialog();
      this.setRegisterDialog();
    },
    async registerPress() {
      this.errors = [];
      if (
        this.username != null &&
        this.password != null &&
        this.email != null &&
        this.name != null
      ) {
        let data = {
          email: this.email,
          name: this.name,
          password: this.password,
          username: this.username
        };
        console.log(data);
        let regisResp = await helper.registerHelp(data);
        if (regisResp.status === 200) {
          this.snackbar = true;
          this.LoginPress();
        } else {
          this.errors.push("An error occurred. Please try again.");
        }
      } else {
        this.errors.push("There are an error occurred. Field can not be empty");
      }
    }
  },
  computed: {
    ...mapGetters(["isRegisterPressed"])
  }
};
</script>
