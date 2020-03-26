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
            <v-btn @click="getTas()" color="success">GetTask</v-btn>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="md-8" md>
        <v-card class="mx-auto" shaped>
          <v-card-title class="justify-center">{{getTaskView.name}}</v-card-title>
          <div class="overline mb-4">Status: {{getTaskView.isCompleted}}</div>
          <v-card-text>{{ getTaskView.desc }}</v-card-text>
          <v-divider></v-divider>
          <div class="container" v-if="getTaskView.comments && getTaskView.comments.length ">
            <v-row class="mx-auto grey lighten-5">
              <v-col cols="3"></v-col>
              <v-col cols="6" style="text-align: left">
                <v-row no-gutters>
                  <v-list-item-avatar>
                    <v-img src="https://randomuser.me/api/portraits/men/85.jpg" />
                  </v-list-item-avatar>
                  <v-list-item-content>
                    <v-list-item-title>{{getTaskView.name}}</v-list-item-title>
                  </v-list-item-content>
                </v-row>

                <v-row no-gutters class="blue lighten-3">{{getTaskView.comments[1].content}}</v-row>
              </v-col>
              <v-col cols="3"></v-col>
            </v-row>
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
import { mapActions } from "vuex";
export default {
  name: "task",
  data() {
    return {};
  },
  components: {
    Todo,
    AddTodo
  },
  methods: {
    ...mapActions(["fetchTask"]),
    getTas() {
      this.fetchTask();
    }
  },
  computed: {
    ...mapGetters(["getTaskView"])
  }
};
</script>

<style scoped></style>
