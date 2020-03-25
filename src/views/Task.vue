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
          <v-card-title class="justify-center">{{getTaskView.name}}</v-card-title>
          <div class="overline mb-4">Status: {{getTaskView.isCompleted}}</div>
          <v-card-text>{{ getTaskView.desc }}</v-card-text>
          <v-divider></v-divider>
          <div v-if="getTaskView.comments && getTaskView.comments.length ">
            <v-container>
              <v-row class="mx-auto">
                <v-col cols="6">
                  <v-list-item-avatar>
                    <v-img src="https://randomuser.me/api/portraits/men/85.jpg" />
                  </v-list-item-avatar>
                </v-col>
                <v-col cols="3">
                    <v-list-item-title> Not Nam Nyan</v-list-item-title>
                </v-col>
              </v-row>
            </v-container>
          </div>
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
  name: "task",
  data() {
    return {};
  },
  components: {
    Todo,
    AddTodo
  },
  computed: {
    ...mapGetters(["getTaskView"])
  }
};
</script>

<style scoped></style>
