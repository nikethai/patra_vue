<template>
  <v-row justify="center">
    <v-dialog v-model="isLoginPressed" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">Login</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-text-field label="Username" required></v-text-field>
            </v-row>
            <v-row>
              <v-text-field label="Password" required></v-text-field>
            </v-row>
          </v-container>
        </v-card-text>
        <span>
          Don't have an account?
          <v-btn small color="warning" @click="registerIsPressed()">Register!</v-btn>
        </span>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn depressed color="error" @click="dialog = false">Cancel</v-btn>
          <v-btn depressed color="primary" @click="dialog = false">Login</v-btn>
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
    dialog: false
  }),
  methods: {
    ...mapActions(["setLoginDialog"]),
    ...mapActions(["setRegisterDialog"]),
    registerIsPressed() {
      this.setLoginDialog();
      this.setRegisterDialog();
    },
    loginIsPressed() {
      this.setLoginDialog();
    }
  },
  computed: {
    ...mapGetters(["isLoginPressed"])
  }
};
</script>