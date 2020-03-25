<template>
  <v-container fluid>
    <v-btn color="info" text>CheckList</v-btn>
    <v-row>
      <v-col cols="12" md="4">
        <v-card @click="doSomething">
          <v-btn text color="success">Checklist1</v-btn>
        </v-card>
      </v-col>
      <v-col cols="12" md="4">
        <v-card>
          <v-btn text color="success">Checklist2</v-btn>
        </v-card>
      </v-col>
      <v-col cols="12" md="4">
        <v-card>
          <v-btn text color="success">Checklist3</v-btn>
        </v-card>
      </v-col>
      <v-col cols="12" md="4">
        <v-card>
          <v-btn text color="success">Checklist4</v-btn>
        </v-card>
      </v-col>
      <v-col cols="12" md="4">
        <v-card>
          <v-btn text color="success">Checklist5</v-btn>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'Home',
  data(){
    return{

    }
  },
  methods:{
    doSomething(){
      this.$router.push({path: `/task`})
    }
  }
};
</script>

<style scoped></style>
