<template>
  <v-container fluid>
    <v-btn color="info" text>CheckList</v-btn>
    <v-row>
      <v-col v-for="sheet in allSheet" :key="sheet.id" cols="12" md="4">
        <v-card @click="doSomething(sheet.sheetId)">
          <v-btn text color="success">{{sheet.sheetName}}</v-btn>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";
import { mapActions } from "vuex";

export default {
  name: "Home",
  data() {
    return {};
  },
  methods: {
    ...mapActions(["fetchSheet"]),
    doSomething(id) {
      this.$router.push({ path: `/task/${id}` });
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
    ...mapGetters(["allSheet"])
  }
};
</script>

<style scoped></style>
