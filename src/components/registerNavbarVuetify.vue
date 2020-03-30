<template>
  <v-row justify="center">
    <v-dialog max-width="600px" persistent v-model="isRegisterPressed">
      <v-card>
        <v-card-title>
          <span class="headline">Register</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" md="4" sm="6">
                <v-text-field label="Legal first name*" required></v-text-field>
              </v-col>
              <v-col cols="12" md="4" sm="6">
                <v-text-field label="Legal middle name"></v-text-field>
              </v-col>
              <v-col cols="12" md="4" sm="6">
                <v-text-field
                  hint="example of persistent helper text"
                  label="Legal last name*"
                  persistent-hint
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field label="Email*" required></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  label="Password*"
                  required
                  type="password"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
          Have an account?
          <v-btn @click="LoginPress()" color="warning">Login</v-btn>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="CancelPress()" color="error" depressed>Cancel</v-btn>
          <v-btn @click="dialog = false" color="primary" depressed>Login</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>
<script>
import { mapActions, mapGetters } from "vuex";

export default {
  data: () => ({
    dialog: false
  }),
  methods: {
    ...mapActions(["setRegisterDialog"]),
    ...mapActions(["setLoginDialog"]),
    CancelPress() {
      this.setRegisterDialog();
    },
    LoginPress() {
      this.setLoginDialog();
      this.setRegisterDialog();
    }
  },
  computed: {
    ...mapGetters(["isRegisterPressed"])
  }
};
</script>
