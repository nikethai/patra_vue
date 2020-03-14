<template>
  <div id="app">
    <div id="nav">
      <b-navbar>
        <b-navbar-brand>IQ30</b-navbar-brand>
        <b-nav>
          <router-link to="/About">About</router-link>
          <router-link to="/">Home</router-link>
          <router-link to="/Users">Users</router-link>
        </b-nav>
        <b-navbar-nav class="ml-auto">
          <loginNavbar />
        </b-navbar-nav>
      </b-navbar>
    </div>
    <router-view />
  </div>
</template>

<script>
import loginNavbar from "@/components/loginNavbar.vue";
import { mapActions } from "vuex";

export default {
  components: {
    loginNavbar
  },
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
  background: rgb(216, 228, 235);
  background: linear-gradient(
    90deg,
    rgba(216, 228, 235, 1) 8%,
    rgba(210, 215, 255, 1) 40%,
    rgba(0, 228, 255, 0.7847514005602241) 57%,
    rgba(0, 151, 255, 1) 77%
  );
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
  padding-left: 20px;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
