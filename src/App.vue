<template>
  <v-app class="v-app">
    <v-app-bar
      app
      class="nav-bar"
      color="accent"
      dense
      disable-resize-watcher="true"
      disable-route-watcher
      flat
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title @click="getHome" class="patr">Patra</v-toolbar-title>
    </v-app-bar>
    <v-navigation-drawer app v-model="drawer">
      <TheNavbarUser />
    </v-navigation-drawer>
    <v-snackbar :timeout="timeoutSnack" :value="isSnackbar.status" @input="closeSnackr">
      {{isSnackbar.message}}
      <v-btn color="pink" text @click="closeSnackr">Close</v-btn>
    </v-snackbar>
    <v-content>
      <router-view />
    </v-content>
  </v-app>
</template>

<script>
import TheNavbarUser from "@/components/TheNavbarUser.vue";
import { mapGetters } from "vuex";

export default {
  components: {
    TheNavbarUser
  },
  data: () => ({
    drawer: false,
    timeoutSnack:2000,
  }),
  methods: {
    getHome() {
      this.$router.push({path: '/'})
    },
    closeSnackr(){
      this.$store.commit("closeSnackbar");
    }
  },
  mounted() {
    console.log(
      `%c ________________________________________
< moooooooooooooooooooooooooooooooooconcu >
 ----------------------------------------
        \\   ^__^
         \\  (oo)\\_______
            (__)\\       )\\/\\
                ||----w |
                ||     ||`,
      "font-family:monospace"
    );
  },
  computed: {
    ...mapGetters(["isSnackbar"])
  }
};
</script>

<style scoped>
.v-app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.nav-bar {
  margin-bottom: 30px;
  background: rgb(216, 228, 235);
  background: linear-gradient(
    90deg,
    rgba(216, 228, 235, 1) 8%,
    rgba(210, 215, 255, 1) 40%,
    rgba(0, 228, 255, 0.7847514005602241) 57%,
    rgba(0, 151, 255, 1) 77%
  );
}

.nav-bar a {
  font-weight: bold;
  color: #2c3e50;
  /* padding-left: 20px; */
}

.nav-bar a.router-link-exact-active {
  color: #42b983;
}

.patr {
  color: #42b983;
}
</style>
