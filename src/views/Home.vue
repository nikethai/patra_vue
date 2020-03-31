<template>
  <v-container fluid>
    <div v-if="Object.keys(getUserInfo).length > 0">
      <v-btn color="info" style="pointer-events: none" text>
        Welcome,{{ getUserInfo.name }}, this is your Checklist
      </v-btn>
      <v-row>
        <v-col :key="sheet.id" cols="12" md="4" v-for="sheet in allSheet">
          <v-card @click="doSomething(sheet.sheetId)">
            <v-btn color="success" text>{{ sheet.sheetName }}</v-btn>
          </v-card>
        </v-col>
      </v-row>
    </div>
    <div v-else>
      <h3>Welcome to PATRA, you must login to see your checklist</h3>
      <v-btn @click="loginIsPressed()" color="warning">Login</v-btn>
      <h5>Don't have an account?</h5>
      <v-btn @click="regisIsPressed()" color="error" outlined>Register</v-btn>
    </div>
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "Home",
  data() {
    return {};
  },
  methods: {
    ...mapActions(["fetchSheet", "setRegisterDialog", "setLoginDialog"]),
    doSomething(id) {
      this.$router.push({ path: `/task/${id}` });
    },
    loginIsPressed() {
      this.setLoginDialog();
    },
    regisIsPressed() {
      this.setRegisterDialog();
    },
    fetch_sh() {
      // let info = localStorage.getItem("user_info");
      let memInfo = localStorage.getItem("mem_info");
      // if (info != null) {
      // info = JSON.parse(info);
      if (memInfo != null) {
        memInfo = JSON.parse(memInfo);
        this.fetchSheet(memInfo.orgId);
        // this.fetchSheet("5e78ed4a8af9f46f8f6bb6de");
        // }
      }
    }
  },
  mounted() {
    this.fetch_sh();
  },
  computed: {
    ...mapGetters(["allSheet", "getUserInfo"])
  },
  watch: {
    getUserInfo: function() {
      this.fetch_sh();
    },
    allSheet: function() {
      this.fetch_sh();
    }
  }
};
</script>

<style scoped></style>
