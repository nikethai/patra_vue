<template>
  <v-container fluid>
    <v-btn color="info" text>CheckList</v-btn>
    <v-row>
      <v-col v-for="sheet in allSheet" :key="sheet.id" cols="12" md="4">
        <v-card @click="doSomething">
          <v-btn text color="success">{{sheet.name}}</v-btn>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import {mapGetters} from 'vuex'
import {mapActions} from 'vuex'

export default {
  name: "Home",
  data() {
    return {};
  },
  methods: {
    ...mapActions(["fetchSheet"]),
    doSomething() {
      this.$router.push({ path: `/task/${1}` });
    },
    fetch_sh(){
      let info = localStorage.getItem("user_info");
      if (info != null){
        info = JSON.parse(info);
        // this.fetchSheet(info.currMemberId);
        this.fetchSheet("5e78ed4a8af9f46f8f6bb6de");
      }
    }
  },
  mounted(){
    this.fetch_sh();
  },
  computed:{
    ...mapGetters(["allSheet"])
  }
};
</script>

<style scoped></style>
