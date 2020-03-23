/* eslint-disable */
<template>
  <v-container fluid grid-list-md>

    <v-row>
      <v-col cols="md-4" md>
        <v-card class="mx-auto" shaped>
          <v-card-title class="justify-center">Checklist1</v-card-title>
          <v-card-text>
            <AddTodo />
            <Todo />
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="md-8" md>
        <v-card class="mx-auto" shaped>
          <v-card-title class="justify-center">Hello</v-card-title>
          <v-card-text>{{getTaskView.desc}}</v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
// @ is an alias to /src
import Todo from "@/components/Todo.vue";
import AddTodo from "@/components/AddTodo.vue";
import { mapGetters } from "vuex";
export default {
  name: "home",
  components: {
    Todo,
    AddTodo
  },
  computed: {
    ...mapGetters(["getTaskView"])
  }
};
</script>

<style scoped>
</style>