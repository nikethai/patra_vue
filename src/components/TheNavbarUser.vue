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
    <v-list-item @click="logout_click()">
      <v-list-item-icon>
        <v-icon>mdi-logout</v-icon>
      </v-list-item-icon>
      <v-list-item-content>
        <v-list-item-title>Logout</v-list-item-title>
      </v-list-item-content>
    </v-list-item>
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

export default {
  name: "TheNavbarUser",
  data: () => ({
    item: [
      { icon: "mdi-home-circle", name: "Home", link: "/" },
      { icon: "mdi-information", name: "About", link: "/About" },
      { icon: "mdi-account-circle", name: "User", link: "/Users" },
      { icon: "mdi-virus", name: "Corona", link: "/Corona" },
      { icon: "mdi-calendar-check", name: "Task", link: "/Task" }
    ]
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
      this.$router.push("users");
    },
    logout_click() {
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
