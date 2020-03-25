<template>
  <v-row justify="center">
    <v-dialog v-model="isLoginPressed" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">Login</span>
        </v-card-title>
        <p v-if="errors.length">
          <b>Please correct the following error(s):</b>
          <ul>
            <b-alert show variant="danger">
              <li v-for="error in errors" :key="error">{{ error }}</li>
            </b-alert>
          </ul>
        </p>
        
        <v-card-text>
          <v-container>
            <v-row>
              <v-text-field v-model="username" label="Username" required></v-text-field>
            </v-row>
            <v-row>
              <v-text-field v-model="password" label="Password" required></v-text-field>
            </v-row>
          </v-container>
        </v-card-text>
        <span>
          Don't have an account?
          <v-btn small color="warning" @click="registerIsPressed()">Register!</v-btn>
        </span>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn depressed color="error" @click="loginIsPressed()">Cancel</v-btn>
          <v-btn depressed color="primary" @click="dialog = logg()">Login</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>
<script>
import { mapActions } from "vuex";
import { mapGetters } from "vuex";
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
