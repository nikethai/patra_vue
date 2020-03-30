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
              <v-text-field
                label="Username"
                required
                v-model="username"
              ></v-text-field>
            </v-row>
            <v-row>
              <v-text-field
                label="Password"
                required
                v-model="password"
              ></v-text-field>
            </v-row>
          </v-container>
        </v-card-text>
        <span>
          Don't have an account?
          <v-btn @click="registerIsPressed()" color="warning" small
            >Register!</v-btn
          >
        </span>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="loginIsPressed()" color="error" depressed
            >Cancel
          </v-btn>
          <v-btn @click="dialog = logg()" color="primary" depressed
            >Login
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>
<script>
import { mapActions, mapGetters } from "vuex";

export default {
  data: () => ({
    username: "",
    password: "",
    errors: []
  }),
  methods: {
    ...mapActions(["setLoginDialog", "setRegisterDialog", "login"]),
    registerIsPressed() {
      this.setLoginDialog();
      this.setRegisterDialog();
    },
    loginIsPressed() {
      this.setLoginDialog();
    },
    logg() {
      if (this.username && this.password) {
        let data = {
          username: this.username,
          password: this.password
        };
        this.login(data);
      }

      this.errors = [];

      if (!this.username) {
        this.errors.push("Name required.");
      }
      if (!this.password) {
        this.errors.push("Password required.");
      }
    }
  },
  computed: {
    ...mapGetters(["isLoginPressed"])
  }
};
</script>
