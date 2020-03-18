<template>
  <v-row align-content-sm justify="center">
    <v-dialog
      v-model="isUserInfoPressed"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
    >
      <v-card>
        <v-toolbar dark color="primary">
          <v-btn icon dark @click="closeDialog()">
            <v-icon>mdi-close</v-icon>
          </v-btn>

          <v-toolbar-title>User</v-toolbar-title>

          <v-spacer></v-spacer>
        </v-toolbar>

        <v-list nav style="text-align: left" two-line subheader>
          <v-list-item>
            <v-list-item-title>John Legend</v-list-item-title>
          </v-list-item>

          <v-divider></v-divider>

          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>Photo</v-list-item-title>
            </v-list-item-content>
            <v-list-item-avatar>
              <v-img src="https://randomuser.me/api/portraits/men/85.jpg" />
            </v-list-item-avatar>
            <v-list-item-action>
              <v-btn outline color="grey" dark>Change</v-btn>
            </v-list-item-action>
          </v-list-item>

          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>Password</v-list-item-title>
            </v-list-item-content>
            <v-list-item-action>
              <v-btn color="error" text>Reset Password?</v-btn>
            </v-list-item-action>
          </v-list-item>

          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>Email</v-list-item-title>
              
            </v-list-item-content>
            <v-btn style="pointer-events: none" text large >ABC@gmail.com</v-btn>
          </v-list-item>

          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>Full Name</v-list-item-title>

              <v-list-item-subtitle>TBD</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>

          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>Last Name</v-list-item-title>

              <v-list-item-subtitle>TBD</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import { mapGetters } from "vuex";
import { mapActions } from "vuex";
export default {
  data() {
    return {
      notifications: false,
      sound: true,
      widgets: false
    };
  },
  computed: {
    ...mapGetters(["isUserInfoPressed"])
  },
  methods: {
    ...mapActions(["setUserInfo"]),
    closeDialog() {
      this.setUserInfo();
    }
  }
};
</script>

<style scoped>
.infoAlign {
  text-align: left;
}
</style>>
