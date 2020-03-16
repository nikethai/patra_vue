<template>
  <div id="loggedinDiv" v-if="allUsers.length>0">
    <div v-for="usr in allUsers" :key="usr.id">{{usr.username}}</div>
  </div>
  <div v-else>
    <loginNavbar />
    <registerNavbar/>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { mapActions } from "vuex";
import loginNavbar from "@/components/loginNavbar.vue";
import registerNavbar from "@/components/registerNavbar.vue";

export default {
  name: "NavbarUser",
  components: {
    loginNavbar,
    registerNavbar
  },
  methods: {
    ...mapActions(["fetchLogged"])
  },
  mounted: function() {
    this.fetchLogged();
  },
  computed: {
    ...mapGetters(["allUsers"])
  }
};
</script>

<style>
</style>