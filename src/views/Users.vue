/* eslint-disable */
<template>
  <v-container fluid>
    <v-tab>
      
    </v-tab>
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "users",
  data() {
    return {
      selected: ""
    };
  },
  computed: mapGetters(["allUsers"])
};
</script>
<style scoped>
img {
  max-width: 100%;
  height: auto;
  margin-left: auto;
}
</style>
