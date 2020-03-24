<template>
  <v-row justify="center">
    <v-dialog v-model="isRegisterPressed" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">Register</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="6" md="4">
                <v-text-field label="Legal first name*" required></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field label="Legal middle name"></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field
                  label="Legal last name*"
                  hint="example of persistent helper text"
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
                  type="password"
                  required
                ></v-text-field>
              </v-col>
            </v-row> </v-container
          >Have an account?
          <v-btn color="warning" @click="LoginPress()">Login</v-btn>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn depressed color="error" @click="CancelPress()">Cancel</v-btn>
          <v-btn depressed color="primary" @click="dialog = false">Login</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>
<script>
import { mapGetters } from "vuex";
import { mapActions } from "vuex";

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
