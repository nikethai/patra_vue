<template>
  <v-flex
    v-if="isEmpArr(allTask[getTaskViewByIndex].comments)"
    class="d-flex flex-column"
    style="text-align: left"
  >
    <v-card v-for="cmt in allTask[getTaskViewByIndex].comments" :key="cmt.id" class="pa-1 mb-2">
      <v-row no-gutters>
        <v-card-text>
          <v-avatar>
            <v-img  contain src="https://randomuser.me/api/portraits/men/85.jpg" max-height="30px" max-width="30px"/>
          </v-avatar>
          <span>{{ cmt.username }}</span>
        </v-card-text>
      </v-row>
      <v-row no-gutters>
        <v-container>
          <span v-html="cmt.comment"></span>
          <p class="text-wrap"></p>
        </v-container>
      </v-row>
    </v-card>
  </v-flex>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "comments",
  data() {
    return {};
  },
  methods: {
    isEmpArr(arr) {
      return Array.isArray(arr) && arr.length;
    }
  },
  computed: {
    ...mapGetters(["getTaskView", "getTaskViewByIndex","allTask"])
  }
};
</script>

<style>
</style>