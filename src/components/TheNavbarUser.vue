<template>
  <div id="loggedinDiv" v-if="Object.keys(getUserInfo).length > 0">
    <v-list-item @click="getUser()" class="px-2">
      <v-list-item-avatar>
        <v-img src="https://randomuser.me/api/portraits/men/85.jpg"></v-img>
      </v-list-item-avatar>

      <v-list-item-title>{{getUserInfo.name}}</v-list-item-title>
    </v-list-item>

    <v-divider></v-divider>
    <v-list dense nav>
      <v-list-item :key="link.name" :to="link.link" link v-for="link in item">
        <v-list-item-icon>
          <v-icon>{{ link.icon }}</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>{{ link.name }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
    <v-divider></v-divider>

    <v-dialog v-model="logoutDialog" persistent max-width="290">
      <template v-slot:activator="{ on }">
        <v-btn color="error" text v-on="on">Logout</v-btn>
      </template>
      <v-card>
        <v-card-title>Do you want to logout?</v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="dialog = false">No</v-btn>
          <v-btn color="red darken-1" text @click="logout_click">Yes</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
  <div v-else>
    <v-list-item @click="doSomething()" class="px-2">
      <v-list-item-icon>
        <v-icon>mdi-login</v-icon>
      </v-list-item-icon>
      <v-list-item-content>
        <v-list-item-title>Login</v-list-item-title>
      </v-list-item-content>
    </v-list-item>
    <TheNavbarLogin />
    <TheNavbarRegister />
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import TheNavbarLogin from "@/components/TheNavbarLogin.vue";
import TheNavbarRegister from "@/components/TheNavbarRegister.vue";
import helper from "@/util/fetchHelper.js";

export default {
  name: "TheNavbarUser",
  data: () => ({
    item: [
      { icon: "mdi-home-circle", name: "Home", link: "/" },
      { icon: "mdi-bug", name: "Corona", link: "/Corona" },
    ],
    logoutDialog: false
  }),
  components: {
    TheNavbarLogin,
    TheNavbarRegister
  },
  methods: {
    ...mapActions(["fetchLogged"]),
    ...mapActions(["setLoginDialog", "logout"]),
    doSomething() {
      this.setLoginDialog();
    },
    getUser() {
      this.$router.push({ path: `/profile/${this.getUserInfo.username}` });
    },
    async logout_click() {
      let jwt = localStorage.getItem("jwt");
      if (jwt != null) {
        let logoutResp = await helper.logoutHelp(jwt);
        console.log(logoutResp);
      }
      this.logout();
      location.reload();
    }
  },
  mounted: function() {
    this.fetchLogged();
  },
  computed: {
    ...mapGetters(["getUserInfo"])
  }
};
</script>

<style scoped></style>
