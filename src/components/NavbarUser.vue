<template>
  <div id="loggedinDiv" v-if="Object.keys(getUserInfo).length > 0">
    <v-list-item @click="getUser()" class="px-2">
      <v-list-item-avatar>
        <v-img src="https://randomuser.me/api/portraits/men/85.jpg"></v-img>
      </v-list-item-avatar>

      <v-list-item-title>John Leider</v-list-item-title>
    </v-list-item>

    <v-divider></v-divider>
    <v-list dense nav>
      <v-list-item v-for="link in item" :key="link.name" :to="link.link" link>
        <v-list-item-icon>
          <v-icon>{{ link.icon }}</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>{{ link.name }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
    <v-divider></v-divider>
    <v-list-item @click="loggout()">
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
    <loginNavbarVuetify />
    <registerNavbarVuetify />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { mapActions } from "vuex";
// import loginNavbar from "@/components/loginNavbar.vue";
import loginNavbarVuetify from "@/components/loginNavbarVuetify.vue";
// import registerNavbar from "@/components/registerNavbar.vue";
import registerNavbarVuetify from "@/components/registerNavbarVuetify.vue";

export default {
  name: "NavbarUser",
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
    // loginNavbar,
    loginNavbarVuetify,
    registerNavbarVuetify,
    // registerNavbar
  },
  methods: {
    ...mapActions(["fetchLogged"]),
    ...mapActions(["setLoginDialog","logout"]),
    doSomething() {
      this.setLoginDialog();
    },
    getUser() {
      this.$router.push('users')
    },
    loggout(){
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

<style scope></style>
