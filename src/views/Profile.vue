<template>
  <v-container fluid>
    <v-tabs background-color="blue lighten-3" centered dark v-model="tab">
      <v-tab>Profile</v-tab>
      <v-tab>Organizations</v-tab>
      <v-tabs-items v-model="tab">
        <v-tab-item>
          <v-card flat>
            <v-row align-center class="mx-auto grey lighten-4">
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
                  <v-btn color="grey" dark outlined>Change</v-btn>
                </v-list-item-action>
              </v-col>
              <v-col cols="12" md="6">
                <v-list-item-content>
                  <v-list-item-title>Password</v-list-item-title>
                </v-list-item-content>
              </v-col>
              <v-col cols="12" md="6">
                <v-btn color="error" outlined text>Reset Password?</v-btn>
              </v-col>
              <v-col cols="12" md="6">
                <v-list-item-content>
                  <v-list-item-title>Email</v-list-item-title>
                </v-list-item-content>
              </v-col>
              <v-col cols="12" md="6">
                <v-btn
                  color="purple lighten-3"
                  large
                  outlined
                  style="pointer-events: none"
                  text
                  >{{ email }}
                </v-btn>
              </v-col>
              <v-col cols="12" md="6">
                <v-list-item-content>
                  <v-list-item-title>Full Name</v-list-item-title>

                  <v-list-item-subtitle>{{ full_name }}</v-list-item-subtitle>
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
import { mapActions, mapState } from "vuex";

export default {
  name: "profile",
  data() {
    return {
      selected: "",
      tab: null
    };
  },
  computed: mapState("profile", [
    "username",
    "full_name",
    "email",
    "photo_url"
  ]),
  methods: {
    ...mapActions("profile", ["fetchProfile"])
  },
  beforeMount() {
    this.fetchProfile();
  }
};
</script>

<style scoped>
img {
  max-width: 100%;
  height: auto;
  margin-left: auto;
}
</style>
