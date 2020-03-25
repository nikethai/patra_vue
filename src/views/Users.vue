/* eslint-disable */
<template>
  <v-container fluid>
    <v-tabs centered v-model="tab" background-color="blue lighten-3" dark>
      <v-tab>Profile</v-tab>
      <v-tab>Organizations</v-tab>
      <v-tabs-items v-model="tab">
        <v-tab-item>
          <v-card flat>
            <v-row class="mx-auto grey lighten-4" align-center>
              <v-col cols="12" md="6">
                <v-list-item-content>
                  <v-list-item-title>Photo</v-list-item-title>
                </v-list-item-content>
              </v-col>
              <v-col cols="12" md="6">
                <v-list-item-avatar>
                  <v-img src="https://randomuser.me/api/portraits/men/85.jpg" />
                </v-list-item-avatar>
                <v-list-item-action>
                  <v-btn outlined color="grey" dark>Change</v-btn>
                </v-list-item-action>
              </v-col>
              <v-col cols="12" md="6">
                <v-list-item-content>
                  <v-list-item-title>Password</v-list-item-title>
                </v-list-item-content>
              </v-col>
              <v-col cols="12" md="6">
                <v-btn color="error" text outlined>Reset Password?</v-btn>
              </v-col>
              <v-col cols="12" md="6">
                <v-list-item-content>
                  <v-list-item-title>Email</v-list-item-title>
                </v-list-item-content>
              </v-col>
              <v-col cols="12" md="6">
                <v-btn style="pointer-events: none" outlined text color="purple lighten-3" large>ABC@gmail.com</v-btn>
              </v-col>
              <v-col cols="12" md="6">
                <v-list-item-content>
                  <v-list-item-title>Full Name</v-list-item-title>

                  <v-list-item-subtitle>TBD</v-list-item-subtitle>
                </v-list-item-content>
              </v-col>
            </v-row>
          </v-card>
        </v-tab-item>
        <v-tab-item>
          <v-card flat>
            <v-card-text>Lorem Patra Posstasium</v-card-text>
          </v-card>
        </v-tab-item>
      </v-tabs-items>
    </v-tabs>
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "users",
  data() {
    return {
      selected: "",
      tab: null
    };
  },
  computed: mapGetters(["allUsers"])
};
</script>
<style scoped>
img {
  max-width: 100%;
  height: auto;
  margin-left: auto;
}
</style>
