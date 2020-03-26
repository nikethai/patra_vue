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
          <v-card-title class="justify-center">{{getTaskView.taskName}}</v-card-title>
          <div class="overline mb-4">Status: {{getTaskView.isCompleted == 0}}</div>
          <v-card-text>{{ getTaskView.taskDetails }}</v-card-text>
          <v-divider></v-divider>
          <v-container v-if="getTaskView.comments && getTaskView.comments.length ">
            <h5>Comments</h5>
            <!-- <v-row class="mx-auto">
              <v-col cols="12" style="text-align: left">
                
              </v-col>
            </v-row>-->
            <v-flex class="d-flex flex-column" style="text-align: left">
              <v-card outlined>
                <v-row no-gutters>
                  <v-list-item-avatar>
                    <v-img src="https://randomuser.me/api/portraits/men/85.jpg" />
                  </v-list-item-avatar>
                  <v-list-item-content>
                    <v-list-item-title>{{getTaskView.comments[0].username}}</v-list-item-title>
                  </v-list-item-content>
                </v-row>

                <v-row no-gutters>
                  <v-container>
                    <p class="text-wrap">{{getTaskView.comments[0].comment}}</p>
                  </v-container>
                </v-row>
              </v-card>
            </v-flex>
          </v-container>
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
  mounted(){
    this.getTas();
  },
  computed: {
    ...mapGetters(["getTaskView"])
  }
};
</script>

<style scoped></style>
